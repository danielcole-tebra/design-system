const fs = require('fs');
const path = require('path');
const { ROOT, readJson, fileDigest, jsonDigest } = require('../lib');
const { validateContract } = require('../validate-contract');
const { validateManifest } = require('../validate-manifest');
const { executionPath } = require('../validate-execution');
const { local, need } = require('./core');

function handoff(id) {
  validateContract();
  const manifest = validateManifest(), item = manifest.items.find(i => i.id === id);
  need(item, 'Unknown manifest item');
  const sources = new Set(['workflow/manifest.json', 'workflow/npve-contract.generated.json', 'indexes/record-index.json', 'flags/active.json', 'CLAUDE.md']);
  const read = file => { sources.add(file); return readJson(file); };
  const c = read('workflow/npve-contract.generated.json');
  const index = read('indexes/record-index.json');
  const record = recordId => {
    const entry = index.records.find(r => r.id === recordId);
    need(entry, `Record missing: ${recordId}`);
    return { path: entry.path, envelope: read(entry.path) };
  };
  const selectedRecord = record(item.expectedRecordId);
  const checkpointPath = executionPath(item);
  const checkpoint = fs.existsSync(path.resolve(ROOT, checkpointPath)) ? read(checkpointPath) : null;
  const controls = (checkpoint?.preflight.controls || []).map(control => {
    const snapshot = read(control.evidence);
    const actual = snapshot.components?.find(x => x.id === control.component || x.key === control.component);
    need(actual, `Historical mapping absent: ${control.name}`);
    return { ...control, recordedIdentity: actual, executionStatus: 'HISTORICAL ONLY — verify exact live identity, owning-set definitions and dimensions before use' };
  });
  const projectedFlags = new Set(c.npve.openFlags.map(f => f.id));
  // Conservative inclusion: all projected NPVE flags plus Patient Summary/shared-shell findings.
  // Keep full flag entries: some have no summary and carry per-consumer repair state.
  const flags = read('flags/active.json').entries.map(e => e.flag).filter(f => projectedFlags.has(f.id) || /patient.?summary|sidesheet|comparison|bound.?paint|field.?surface/i.test(JSON.stringify(f)));
  const rules = Object.fromEntries(['authority', 'recordStore', 'canonicalClaudeMdSections', 'agentRules', 'recordGate', 'standingRules', 'sheetAndComparisonTechniques', 'proofConvention', 'executionPolicy', 'operatingLoop', 'nonNegotiables', 'standingBatchRules'].map(k => [k, c[k]]));
  const payload = {
    format: 'tebra.npve-runner-handoff', version: 1,
    use: item.status === 'complete' ? 'Completed precedent; never restart or replay. New work needs its own selected item, recorded approval and IN PROGRESS record.' : 'Resume selected item through existing start/check/finish gates; this packet grants no approval.',
    item, selectedRecord,
    exactApproval: { tier: item.risk.approval, perItemConfirmations: item.perItemConfirmations || [], recordQuote: selectedRecord.envelope.record.operatorContinuationQuote || null },
    dependencies: (item.dependsOn || []).map(id => {
      const dependency = manifest.items.find(i => i.id === id);
      const saved = record(dependency.expectedRecordId), body = saved.envelope.record;
      return { id, status: dependency.status, scope: dependency.scope,
        risk: dependency.risk, perItemConfirmations: dependency.perItemConfirmations || [],
        record: { path: saved.path, id: saved.envelope.id, status: body._status || body.status,
          report: body.report, nextAction: body.nextAction,
          operatorEvidence: Object.fromEntries(Object.entries(body).filter(([key]) => /operator|approval|review/i.test(key))) } };
    }),
    rules, npveRules: c.npve.rules, flags,
    flagsSelection: 'All contract-projected NPVE flags plus active entries matching Patient Summary, sidesheet, comparison, bound paint or field surface. Review scope and inherited mappings; expand if another family is used.',
    claudeInstructions: fs.readFileSync(path.join(ROOT, 'CLAUDE.md'), 'utf8'),
    checkpoint: { path: checkpointPath, data: checkpoint }, controls,
    nextAction: item.status === 'complete' ? 'Read this completed example; do not execute it. For an authorized new item, generate its packet, discover authenticated tools and obtain fresh source/target/component readbacks.' : checkpoint?.nextAction || 'Open the scoped IN PROGRESS record and obtain fresh preflight evidence.',
    evidencePolicy: 'Save full replies to files; send only receipt path/hash, identities, counts, differences and failures to the model. Inspect every required PNG yourself and show the operator. Never infer visual approval from a file or validator.'
  };
  if (checkpoint?.appearance?.specification) payload.appearance = fs.readFileSync(path.join(ROOT, checkpoint.appearance.specification), 'utf8');
  if (checkpoint?.appearance?.specification) sources.add(checkpoint.appearance.specification);
  payload.sources = [...sources].sort().map(file => ({ file, sha256: fileDigest(file) }));
  return payload;
}
function generate(id, outputDir) {
  const packet = handoff(id);
  const compact = JSON.stringify(packet) + '\n', pretty = JSON.stringify(packet, null, 2) + '\n';
  // Apples-to-apples: exact same required payload, no omitted facts or token guesses.
  need(jsonDigest(JSON.parse(compact)) === jsonDigest(JSON.parse(pretty)), 'Context equivalence failure');
  const beforeBytes = Buffer.byteLength(pretty), afterBytes = Buffer.byteLength(compact);
  const measurement = { method: 'UTF-8 bytes of identical selected information: pretty JSON versus compact JSON. Both parse to the same canonical digest.',
    beforeBytes, afterBytes, reductionPercent: Number(((1 - afterBytes / beforeBytes) * 100).toFixed(2)),
    equivalentPayloadSha256: jsonDigest(packet),
    sourceBundleBytes: packet.sources.reduce((sum, x) => sum + fs.statSync(path.join(ROOT, x.file)).size, 0),
    sourceBundleNote: 'Broader files contain unrelated information; this is not the equivalent-information baseline.',
    tokensSaved: null, runtimeToolCallsSaved: null, creditsSaved: null,
    runtimeExpectation: 'Reusable programs and file-backed readbacks should reduce generation and model-facing output; no live execution comparison measured.' };
  const write = (file, text) => { const full = local(ROOT, `${outputDir}/${file}`); fs.mkdirSync(path.dirname(full), { recursive: true }); fs.writeFileSync(full, text); };
  write('handoff.json', compact); write('context-measurement.json', JSON.stringify(measurement, null, 2) + '\n');
  return { itemId: id, handoff: `${outputDir}/handoff.json`, ...measurement };
}
function verify(file) {
  const packet = readJson(file); validateContract();
  for (const source of packet.sources) need(fileDigest(source.file) === source.sha256, `Stale handoff: ${source.file}`);
  return { itemId: packet.item.id, freshLocalSources: true, liveMappingsVerified: false };
}
module.exports = { handoff, generate, verify };
