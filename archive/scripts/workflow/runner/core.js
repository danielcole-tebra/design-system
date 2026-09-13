const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');
const { execFileSync } = require('child_process');
const { ROOT, jsonDigest, readJson, manifestRiskPayload } = require('../lib');
const { validateExecutionData, executionPath } = require('../validate-execution');
const { validateTargetIdentity } = require('../target-identity');

function need(ok, message) { if (!ok) throw new Error(message); }
function equal(a, b, message) { need(jsonDigest(a) === jsonDigest(b), message); }
function local(root, file) {
  need(typeof file === 'string' && !path.isAbsolute(file), 'Expected repository-relative path');
  const full = path.resolve(root, file), rel = path.relative(root, full);
  need(rel && rel !== '..' && !rel.startsWith(`..${path.sep}`) && !path.isAbsolute(rel), 'Path escapes repository');
  // Evidence must not follow a symlink/junction out of the repository.
  let parent = full;
  while (!fs.existsSync(parent)) parent = path.dirname(parent);
  const realRel = path.relative(fs.realpathSync(root), fs.realpathSync(parent));
  need(realRel !== '..' && !realRel.startsWith(`..${path.sep}`) && !path.isAbsolute(realRel), 'Evidence symlink escapes repository');
  return full;
}
function save(root, file, value) {
  const full = local(root, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
  return { evidence: file, sha256: jsonDigest(value), bytes: fs.statSync(full).size };
}
function appendPreferred(before, additions) {
  need(Array.isArray(before) && Array.isArray(additions), 'Preferred values must be arrays');
  for (const p of [...before, ...additions]) need(['COMPONENT', 'COMPONENT_SET'].includes(p.type) && typeof p.key === 'string' && p.key, 'Invalid preferred value');
  const result = structuredClone(before);
  for (const p of additions) if (!result.some(x => x.type === p.type && x.key === p.key)) result.push(structuredClone(p));
  return result;
}
function sharedDiff(before, after, additions = {}) {
  const expected = structuredClone(before);
  for (const [name, values] of Object.entries(additions)) {
    need(expected.definitions[name]?.type === 'INSTANCE_SWAP', `Unknown swap property ${name}`);
    expected.definitions[name].preferredValues = appendPreferred(expected.definitions[name].preferredValues || [], values);
  }
  equal(expected, after, 'Shared defaults/geometry changed or non-additive preferred values');
  return { properties: Object.keys(before.definitions).length, additions: Object.keys(additions).length, differences: [] };
}
function usage(rows) {
  need(Array.isArray(rows), 'Usage must be per-response observations');
  const unique = new Map();
  for (const r of rows) {
    need(r.responseId && r.runId && r.source && r.kind === 'response', 'Usage needs run/response identity, source and kind=response; cumulative counters rejected');
    const key = JSON.stringify([r.runId, r.responseId]);
    if (unique.has(key)) equal(unique.get(key), r, 'Conflicting duplicate usage');
    unique.set(key, r);
    for (const k of ['cachedInput', 'uncachedInput', 'output']) need(r[k] === null || (Number.isSafeInteger(r[k]) && r[k] >= 0), `Unavailable ${k} must be null`);
  }
  const values = [...unique.values()];
  const result = { responses: values.length, coverage: 'Only supplied per-response observations; not necessarily a complete run', credits: null, price: null };
  for (const k of ['cachedInput', 'uncachedInput', 'output']) {
    result[k] = values.length && values.every(r => r[k] !== null) ? values.reduce((s, r) => s + r[k], 0) : null;
    result[`${k}ObservedSubtotal`] = values.filter(r => r[k] !== null).reduce((s, r) => s + r[k], 0);
    result[`${k}UnavailableResponses`] = values.filter(r => r[k] === null).length;
  }
  return result;
}
function approval(item, run, record) {
  need(run.version === 3 && run.status === 'active' && run.itemId === item.id && run.expectedRecordId === item.expectedRecordId, 'Requires active version-3 run');
  need(item.status !== 'complete' && item.risk.tier !== 'human-decision', 'Completed or human-decision item cannot execute');
  equal(run.plannerRiskSha256, jsonDigest(manifestRiskPayload(item)), 'Planner risk lock changed');
  const quote = item.risk.approval?.status === 'approved' ? item.risk.approval.quote : run.perItemConfirmation?.quote;
  need(typeof quote === 'string' && quote.trim(), 'Missing exact operator approval');
  // Accept only exact string leaves in the authoritative record, never substring matching.
  const contains = v => v === quote || (v && typeof v === 'object' && Object.values(v).some(contains));
  need(contains(record), 'Exact approval quote absent from record');
  need(String(record._status || record.status).startsWith('IN PROGRESS'), 'Record is not IN PROGRESS');
  return quote;
}
function visualGate(execution, names, item, root) {
  validateExecutionData(execution, item, { root });
  for (const name of names) {
    const m = execution.milestones.find(x => x.name === name);
    need(m?.status === 'verified' && m.inspected === true, `Unverified visual milestone: ${name}`);
  }
}
function verifyReadback(request, response) {
  need(response?.complete === true && response.nonce === request.nonce, 'Stale or truncated readback');
  equal(response.fileKey, request.fileKey, 'File identity mismatch');
  equal(response.pages, request.pages, 'Page identity mismatch');
  need(Array.isArray(response.nodes), 'Missing node identities');
  for (const expected of request.nodes) {
    const actual = response.nodes.find(x => x.id === expected.id);
    need(actual, `Missing node ${expected.id}`);
    for (const [key, value] of Object.entries(expected)) equal(actual[key], value, `Stale identity/mapping ${expected.id}.${key}`);
  }
}
// The adapter bridges existing authenticated tools. It receives explicit file keys and
// scripts, saves full replies, and MUST NOT cache a read, retry a write or batch uploads.
// No provider, model, editor or authentication code belongs here.
function createRunner({ adapter, root = ROOT, context, guard } = {}) {
  need(adapter && typeof adapter.read === 'function' && typeof adapter.mutate === 'function', 'Authenticated tool adapter required');
  let busy = false;
  return {
    async step(plan) {
      need(!busy, 'Figma calls must be sequential'); busy = true;
      let intentPath, current, mutationStarted = false;
      try {
        const { item, run, record, execution, dependencies } = context();
        current = { item, execution };
        approval(item, run, record);
        need((item.dependsOn || []).every(id => dependencies.some(d => d.id === id && d.status === 'complete')), 'Incomplete dependencies');
        need(plan.fileKey === 'fdCQVFdvOByaOYIJYag0d6' && plan.fileKey === item.target.fileKey, 'Source/library writes prohibited');
        need(Array.isArray(plan.requiresVisual), 'Declare visual dependencies');
        const milestoneIndex = execution.milestones.findIndex(m => m.name === plan.milestone);
        need(milestoneIndex >= 0 && execution.milestones[milestoneIndex].status === 'pending', 'Select a pending checkpoint milestone');
        visualGate(execution, [...execution.milestones.slice(0, milestoneIndex).map(m => m.name), ...plan.requiresVisual], item, root);
        need(fs.existsSync(local(root, plan.appearanceEvidence)), 'Missing reviewed appearance/configuration evidence');
        need(plan.id && /^[a-z0-9-]+$/.test(plan.id), 'Invalid step id');
        const base = path.posix.join(path.posix.dirname(item.requiredEvidence.report), 'runner', plan.id);
        intentPath = `${base}/intent.json`;
        need(!fs.existsSync(local(root, intentPath)), 'Step already attempted: read back and resolve; never replay blindly');
        need(Array.isArray(plan.reads) && plan.reads.length >= 2, 'Fresh source and target reads required');
        need(plan.reads.some(r => r.fileKey === item.source.fileKey && r.nodes.some(n => n.id === item.source.nodeId)), 'Missing source identity');
        need(plan.reads.some(r => r.fileKey === item.target.fileKey), 'Missing target identity');
        const { script, validatePlan } = require('./plugin');
        validatePlan(plan);
        for (let i = 0; i < plan.reads.length; i++) {
          const request = { ...plan.reads[i], nonce: randomUUID() };
          need(request.pages?.length && request.nodes?.length, 'Missing exact page/node inventory');
          const response = await adapter.read({ ...request, code: script({ kind: 'read', ...request }) });
          save(root, `${base}/read-${i}.json`, response);
          verifyReadback(request, response);
          if (request.fileKey === item.target.fileKey) validateTargetIdentity(item.target, response);
        }
        // A durable attempt marker blocks automatic replay even after process loss.
        save(root, intentPath, { plan, status: 'attempted; outcome requires readback', at: new Date().toISOString() });
        // No remote call intervenes between the repository guard and the mutation.
        await guard(item.id);
        mutationStarted = true;
        const result = await adapter.mutate({ fileKey: plan.fileKey, code: script(plan), operation: plan.operation });
        const receipt = save(root, `${base}/result.json`, result);
        need(result?.complete === true, 'Mutation outcome uncertain/truncated: read affected nodes before recovery');
        return { ...receipt, step: plan.id, identities: (result.identities || []).map(({ id, key, name, type, width, height }) => ({ id, key, name, type, width, height })), counts: result.counts || {}, differences: result.differences || [], next: 'Save PNG, inspect and show required state; update execution.json from actual evidence.' };
      } catch (error) {
        if (mutationStarted) {
          // Fail closed across process/model changes. Only evidence-based resolution
          // by the executor may remove this failure from the portable checkpoint.
          const full = local(root, executionPath(current.item));
          const checkpoint = JSON.parse(fs.readFileSync(full, 'utf8'));
          checkpoint.unresolved.push({ step: plan.id, error: error.message, intent: intentPath, outcome: 'uncertain; read affected IDs and parent children before retry' });
          checkpoint.nextAction = `Diagnose ${plan.id} from live readback; do not replay creation.`;
          fs.writeFileSync(full, JSON.stringify(checkpoint, null, 2) + '\n');
        }
        throw error;
      } finally { busy = false; }
    }
  };
}
function repositoryContext(id) {
  const item = readJson('workflow/manifest.json').items.find(i => i.id === id);
  need(item, 'Unknown item');
  const index = readJson('indexes/record-index.json').records.find(r => r.id === item.expectedRecordId);
  need(index, 'Missing authoritative record');
  return { item, run: readJson(`.workflow-runs/${id}.json`), record: readJson(index.path).record,
    execution: readJson(executionPath(item)), dependencies: readJson('workflow/manifest.json').items };
}
function repositoryRunner(adapter, id) {
  return createRunner({ adapter, context: () => repositoryContext(id), guard: item => execFileSync(process.execPath, ['scripts/workflow/check-batch.js', item], { cwd: ROOT, stdio: 'pipe' }) });
}
module.exports = { need, equal, local, save, appendPreferred, sharedDiff, usage, approval, visualGate, verifyReadback, createRunner, repositoryRunner };
