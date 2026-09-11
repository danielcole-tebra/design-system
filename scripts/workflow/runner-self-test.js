const assert = require('assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { createRunner, sharedDiff, appendPreferred, usage, local } = require('./runner/core');
const { program, script } = require('./runner/plugin');
const { jsonDigest, manifestRiskPayload, ROOT, readJson } = require('./lib');
const { validateExecutionData } = require('./validate-execution');

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'tebra-runner-test-'));
let cases = 0;
function test(name, fn) { fn(); cases++; }
async function rejects(name, fn, pattern) { await assert.rejects(fn, pattern); cases++; }
const pages = ['0:1 Cover', '3:2 Templates', '27:2 Screens', '126:2 Archive'];
const fileKey = 'fdCQVFdvOByaOYIJYag0d6';
const definitions = { 'Body#1': { type: 'INSTANCE_SWAP', defaultValue: 'old-body', preferredValues: [{ type: 'COMPONENT', key: 'old-key' }] } };
const identities = [
  { id: 'mock-master', key: 'mock-master-key', name: 'Sidesheet', type: 'COMPONENT', parentId: '3:2', width: 550, height: 600, definitions },
  { id: 'mock-body', key: 'mock-body-key', name: 'Body', type: 'COMPONENT', parentId: '3:2', width: 518, height: 800, definitions: {} }
];
const plan = { id: 'append-body', fileKey, milestone: 'Comparisons', requiresVisual: ['Default', 'Error/Entry', 'Success'], appearanceEvidence: 'batch/appearance.md',
  reads: [{ fileKey: 'zVsuhYehoSLLq880qRBFkq', pages: ['mock-source Source'], nodes: [{ id: 'mock-source-node', name: 'Patient Summary', type: 'FRAME', parentId: 'mock-source', width: 550, height: 894 }] }, { fileKey, pages, nodes: identities }],
  operation: { kind: 'preferred', master: 'mock-master', additions: { 'Body#1': [{ id: 'mock-body', key: 'mock-body-key', type: 'COMPONENT' }] } } };
const item = { id: 'mock-item', expectedRecordId: 'mock-record', status: 'queued', dependsOn: ['content', 'feedback'], source: { fileKey: plan.reads[0].fileKey, nodeId: 'mock-source-node' }, target: { fileKey },
  risk: { tier: 'medium', approval: { status: 'unapproved' } }, requiredEvidence: { report: 'batch/report.md', comparisonRender: 'batch/render.png' } };
const record = { _status: 'IN PROGRESS', operatorContinuationQuote: 'fixture approval only' };
const run = { version: 3, status: 'active', itemId: item.id, expectedRecordId: item.expectedRecordId, perItemConfirmation: { quote: record.operatorContinuationQuote }, plannerRiskSha256: jsonDigest(manifestRiskPayload(item)) };
const checkpoint = { format: 'tebra.design-execution', version: 2, itemId: item.id, recordId: item.expectedRecordId,
  preflight: { targetFileKey: fileKey, identityEvidence: 'batch/read.json', toolEvidence: 'batch/read.json', tools: ['offline-fixture-tool'], controls: [{ name: 'Sidesheet', component: 'mock-master', properties: {}, evidence: 'batch/read.json' }] },
  appearance: { specification: 'batch/appearance.md' }, corrections: [], unresolved: [], nextAction: 'Append after three fixture visual reviews',
  milestones: ['Default', 'Error/Entry', 'Success'].map(name => ({ name, status: 'verified', nodeIds: ['fixture-only'], render: 'batch/render.png', inspected: true })).concat([{ name: 'Comparisons', status: 'pending' }]) };
function write(file, data) { fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true }); fs.writeFileSync(path.join(root, file), typeof data === 'string' || Buffer.isBuffer(data) ? data : JSON.stringify(data)); }
write('batch/read.json', { components: [{ id: 'mock-master', componentPropertyDefinitions: definitions }] });
write('batch/appearance.md', 'SYNTHETIC FIXTURE. No real visual review or operator approval.');
write('batch/render.png', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64'));
write('batch/execution.json', checkpoint);
const deps = item.dependsOn.map(id => ({ id, status: 'complete' }));
const clone = v => structuredClone(v);
function setup({ changeContext = () => {}, readChange = () => {}, mutateError = false } = {}) {
  const ctx = { item: clone(item), record: clone(record), run: clone(run), execution: clone(checkpoint), dependencies: clone(deps) };
  changeContext(ctx);
  const events = [];
  const adapter = {
    read: async req => { events.push(`read:${req.fileKey}`); const response = { complete: true, nonce: req.nonce, fileKey: req.fileKey, pages: req.pages, nodes: clone(req.nodes) }; readChange(response); return response; },
    mutate: async request => {
      events.push('mutate'); if (mutateError) throw new Error('Disconnected fixture write');
      const native = new Map(identities.map(i => [i.id, { ...clone(i), parent: { id: i.parentId }, componentPropertyDefinitions: clone(i.definitions), editComponentProperty(name, value) { this.componentPropertyDefinitions[name] = { ...this.componentPropertyDefinitions[name], ...value }; } }]));
      const figma = { fileKey, root: { children: pages.map(s => ({ id: s.split(' ')[0], name: s.slice(s.indexOf(' ') + 1) })) }, getNodeByIdAsync: async id => native.get(id) };
      const AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;
      return new AsyncFunction('figma', request.code)(figma);
    }
  };
  return { runner: createRunner({ root, adapter, context: () => ctx, guard: () => events.push('check-batch') }), events, ctx };
}
async function main() {
  test('append deduplicates without removing or reordering', () => assert.deepEqual(appendPreferred(definitions['Body#1'].preferredValues, [{ type: 'COMPONENT', key: 'old-key' }]), definitions['Body#1'].preferredValues));
  const before = { width: 550, height: 600, definitions: clone(definitions) };
  const after = clone(before); after.definitions['Body#1'].preferredValues.push({ type: 'COMPONENT', key: 'new' });
  test('shared append succeeds', () => sharedDiff(before, after, { 'Body#1': [{ type: 'COMPONENT', key: 'new' }] }));
  test('changed shared defaults fails', () => { const a = clone(after); a.definitions['Body#1'].defaultValue = 'new'; assert.throws(() => sharedDiff(before, a), /Shared defaults/); });
  test('changed shared geometry fails', () => { const a = clone(before); a.height++; assert.throws(() => sharedDiff(before, a), /Shared defaults/); });
  test('non-additive preferred values fails', () => { const a = clone(before); a.definitions['Body#1'].preferredValues = []; assert.throws(() => sharedDiff(before, a), /non-additive/); });
  test('unavailable usage stays null', () => { const r = usage([]); assert.equal(r.cachedInput, null); assert.equal(r.output, null); assert.equal(r.credits, null); });
  const row = { kind: 'response', runId: 'r', responseId: '1', source: 'fixture', cachedInput: 12, uncachedInput: 3, output: 4 };
  test('usage deduplicates', () => { const r = usage([row, row]); assert.equal(r.cachedInput, 12); assert.equal(r.responses, 1); });
  test('partial usage not silently zero', () => assert.equal(usage([row, { ...row, responseId: '2', cachedInput: null }]).cachedInput, null));
  test('conflicting duplicates fail', () => assert.throws(() => usage([row, { ...row, output: 5 }]), /Conflicting/));
  test('cumulative usage fails', () => assert.throws(() => usage([{ ...row, kind: 'cumulative' }]), /cumulative/));
  test('path escape fails', () => assert.throws(() => local(root, '../escape'), /escapes/));
  test('compile is inert', () => { assert(script(plan).includes('preferred')); assert.equal(typeof program, 'function'); });
  await rejects('missing approval', () => setup({ changeContext: c => { c.run.perItemConfirmation = null; } }).runner.step(plan), /Missing exact/);
  await rejects('approval quote mismatch', () => setup({ changeContext: c => { c.record.operatorContinuationQuote = 'different'; } }).runner.step(plan), /quote absent/);
  await rejects('stale identity', () => setup({ readChange: r => { r.nodes[0].name = 'wrong'; } }).runner.step({ ...plan, id: 'stale' }), /Stale identity/);
  await rejects('live shared default drift blocks before write', () => setup({ readChange: r => { if (r.fileKey === fileKey) r.nodes[0].definitions['Body#1'].defaultValue = 'changed'; } }).runner.step({ ...plan, id: 'default-drift' }), /Stale identity/);
  await rejects('truncated readback', () => setup({ readChange: r => { r.complete = false; } }).runner.step({ ...plan, id: 'truncated' }), /truncated/);
  await rejects('stale nonce', () => setup({ readChange: r => { r.nonce = 'old'; } }).runner.step({ ...plan, id: 'old' }), /Stale/);
  await rejects('visual state blocks progression even if omitted from plan', () => setup({ changeContext: c => { c.execution.milestones[1].status = 'pending'; } }).runner.step({ ...plan, requiresVisual: [] }), /Unverified visual/);
  await rejects('source writes fail', () => setup().runner.step({ ...plan, fileKey: item.source.fileKey }), /Source\/library/);
  await rejects('library writes fail', () => setup().runner.step({ ...plan, fileKey: 'YX2n4YLrEpBXNbcc73T6dw' }), /Source\/library/);
  await rejects('dependency blocks', () => setup({ changeContext: c => { c.dependencies[0].status = 'queued'; } }).runner.step(plan), /Incomplete dependencies/);
  await rejects('old run blocks', () => setup({ changeContext: c => { c.run.version = 2; } }).runner.step(plan), /version-3/);
  const good = setup(); const receipt = await good.runner.step(plan); cases++;
  assert.deepEqual(good.events.slice(-2), ['check-batch', 'mutate']);
  assert(!receipt.identities[0].definitions); // Full definition readback stays on disk.
  assert(fs.statSync(path.join(root, receipt.evidence)).size > JSON.stringify(receipt).length);
  await rejects('blind replay blocked', () => good.runner.step(plan), /already attempted/);
  const bad = setup({ mutateError: true });
  await rejects('uncertain write checkpoints failure', () => bad.runner.step({ ...plan, id: 'disconnect' }), /Disconnected/);
  test('failure survives process handoff', () => {
    const saved = JSON.parse(fs.readFileSync(path.join(root, 'batch/execution.json')));
    assert.throws(() => validateExecutionData(saved, item, { root }), /unresolved execution/);
  });
  // Real Patient Summary evidence: check all shared defaults and exact additive lists.
  const base = 'figma-export/npve-patient-summary-body-2026-09-10/';
  const comparisons = readJson(base + 'comparisons.json'), final = readJson(base + 'final-read.json');
  for (const name of ['shell', 'comparison']) {
    const old = { definitions: comparisons.before[name] }, now = { definitions: final.shared[name] }, additions = {};
    for (const [prop, d] of Object.entries(old.definitions)) if (d.preferredValues) additions[prop] = now.definitions[prop].preferredValues.slice(d.preferredValues.length);
    test(`Patient Summary ${name} real historical shared diff`, () => sharedDiff(old, now, additions));
  }
  test('Patient Summary all-page paints unchanged', () => {
    const baseline = readJson(base + 'shell-preflight.json').baseline;
    for (const p of final.pages) assert.deepEqual(p.unbound, baseline.find(b => b.id === p.id).unbound);
  });
  const summary = { passed: true, cases, fixtureOnly: true, liveFigmaCalls: 0,
    successfulDryRun: { states: ['Default', 'Error/Entry', 'Success'], operation: 'guarded additive preferred-value update in mock Plugin API', events: good.events, fullReadbackSaved: true },
    historicalEvidence: 'Patient Summary actual all-page unbound paints and shared property additions checked; no historical visual assertions promoted to fresh review.' };
  console.log(JSON.stringify(summary, null, 2));
  if (process.argv[2]) {
    fs.writeFileSync(local(ROOT, process.argv[2]), JSON.stringify(summary, null, 2) + '\n');
    const dir = path.posix.dirname(process.argv[2]);
    fs.writeFileSync(local(ROOT, `${dir}/dry-run-plan.json`), JSON.stringify({ ...plan, fixtureNotice: 'SYNTHETIC ONLY. No live IDs, approval or visual evidence.' }, null, 2) + '\n');
    fs.copyFileSync(path.join(root, receipt.evidence), local(ROOT, `${dir}/dry-run-readback.json`));
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => {
  const resolved = path.resolve(root);
  if (path.dirname(resolved) !== path.resolve(os.tmpdir()) || !path.basename(resolved).startsWith('tebra-runner-test-')) throw new Error('Unsafe test cleanup');
  fs.rmSync(resolved, { recursive: true });
});
