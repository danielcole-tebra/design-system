// Dry run of scripts/workflow/resume-batch.js against a scratch store and a scratch workflow root (record
// workflow_flowsheetsResume_2026-09-12). Never touches the real store, manifest, runs or contract.
// Usage: node scripts/workflow/resume-batch-self-test.js [scratchDir]
const assert = require('assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const REAL_ROOT = path.resolve(__dirname, '..', '..');
const scratch = process.argv[2] ? path.resolve(process.argv[2]) : fs.mkdtempSync(path.join(os.tmpdir(), 'tebra-resume-'));
for (const dir of ['foundation', 'records', 'flags', 'indexes']) fs.cpSync(path.join(REAL_ROOT, dir), path.join(scratch, dir), { recursive: true });
fs.copyFileSync(path.join(REAL_ROOT, 'design-system-schema.json'), path.join(scratch, 'design-system-schema.json'));

process.env.TEBRA_STORE_ROOT = scratch;
const lib = require('../schema/lib');
const rs = require('../schema/record-scripts');
const { jsonDigest, manifestRiskPayload } = require('./lib');
const { validateManifestData } = require('./validate-manifest');
const { ACTIVE_ITEM_STATUS, resumeBatch, summary } = require('./resume-batch');

const log = [];
const say = (line) => { log.push(line); console.log(line); };
say(`scratch store and workflow root at ${scratch}`);
let cases = 0;
const write = (file, value) => { const full = path.join(scratch, file); fs.mkdirSync(path.dirname(full), { recursive: true }); fs.writeFileSync(full, typeof value === 'string' || Buffer.isBuffer(value) ? value : `${JSON.stringify(value, null, 2)}\n`); };
const read = (file) => JSON.parse(fs.readFileSync(path.join(scratch, file), 'utf8'));
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64');
const NOW = '2026-09-13T09:00:00.000Z';
let changedList = [];
const deps = { root: scratch, now: () => NOW, contract: () => {}, changed: () => changedList, regenerateContract: false };
const QUOTE = 'Yes, pick the Flowsheets batch back up.';

// --- records: one stopped before the batch-files gate applies, one dated after it -----------------------------------
const previous = [...lib.generate().store.records].reverse().find((env) => lib.isDone(env.record)).id;
const body = (status, extra = {}) => ({ _status: status, workstream: 'Workflow / self-test', risk: { tier: 'low', operatorQuote: 'dry run' }, scope: ['exercise resume-batch'], report: 'batch/report.md', stopCondition: 'scratch only', nextAction: 'resume', ...extra });
const OLD = 'dryRun_resumeOld_2026-09-11';
rs.apply({ id: OLD, previous, workstream: 'workflow', date: '2026-09-11', createdBy: 'self-test', body: body('IN PROGRESS — dry run', { date: '2026-09-11' }) });
rs.checkpoint(OLD, (r) => ({ ...r, _status: 'IN PROGRESS — STOPPED at a fixture gate' }));
const NEW = 'dryRun_resumeNew_2026-09-12';
const newPlan = path.join(scratch, 'batch-new', 'plan.md');
// A manifest item targets a Figma file, so a gated (2026-09-12 or later) resume is a Figma batch; at open its plan is
// required and its inventory is not yet (that comes before the first write).
const planWith = (items) => write('batch-new/plan.md', `# ${NEW} plan\n\nRecord: ${NEW}\nKind: figma\n\n## Phases\n\n${items.join('\n')}\n`);
planWith(['- [x] open', '- [ ] finish']);
rs.apply({ id: NEW, previous, workstream: 'workflow', date: '2026-09-12', createdBy: 'self-test', body: body('IN PROGRESS — STOPPED, gated by plan.md', { date: '2026-09-12', batchKind: 'figma', plan: newPlan, inventory: path.join(scratch, 'batch-new', 'inventory.json'), report: 'batch-new/report.md' }) });
const DONE = 'dryRun_resumeDone_2026-09-11';
rs.apply({ id: DONE, previous, workstream: 'workflow', date: '2026-09-11', createdBy: 'self-test', body: body('IN PROGRESS — will close', { date: '2026-09-11', report: 'workflow/README.md' }) });
rs.close(DONE, (r) => ({ ...r, _status: 'DONE — closed before resume', outcome: 'x', validation: { selfTest: 'this run' } }));
say(`records opened: ${OLD} (stopped, before the gate date), ${NEW} (stopped, gated), ${DONE} (DONE)`);

// --- manifest items, runs and checkpoints ---------------------------------------------------------------------------
function item(id, recordId, dir, extra = {}) {
  const it = { id, title: id, workstream: 'self-test', status: 'stopped', dependsOn: ['dry-dep'], source: { fileKey: 'S', nodeId: '1:1', access: 'read-only' }, target: { fileKey: 'T' }, expectedRecordId: recordId, scope: 'x', risk: { tier: 'low', reasons: ['fixture'], proposedBy: 'fixture', approval: { status: 'approved', approvedBy: 'fixture', approvedAt: NOW, quote: 'go', history: [] }, lockedAt: NOW }, oversight: ['fixture'], stopCondition: 'fixture', allowedFiles: [`${dir}/**`], requiredEvidence: { audit: `${dir}/audit.json`, report: `${dir}/report.md`, comparisonRender: `${dir}/comparison.png` }, stoppedAt: '2026-09-11T22:00:00.000Z', stopReason: 'fixture gate', ...extra };
  it.risk.lock = jsonDigest(manifestRiskPayload(it));
  return it;
}
const dep = item('dry-dep', DONE, 'batch-dep', { status: 'complete', dependsOn: [] }); delete dep.stoppedAt; delete dep.stopReason;
const manifest = { format: 'tebra.design-work-manifest', version: 1, items: [dep, item('dry-resume', OLD, 'batch'), item('dry-resume-new', NEW, 'batch-new'), item('dry-resume-done', DONE, 'batch-done')] };
write('workflow/manifest.json', manifest);
// Each run's guard excludes its own record, as start-batch takes it; captured once, before the appends below.
const startFingerprints = {};
function run(it) {
  return { format: 'tebra.design-work-run', version: 3, status: 'stopped', itemId: it.id, expectedRecordId: it.expectedRecordId, executor: 'fixture', preexistingFiles: {}, storeFingerprint: startFingerprints[it.id], plannerRiskSha256: jsonDigest(manifestRiskPayload(it)), allowedFiles: it.allowedFiles, requiredEvidence: it.requiredEvidence, stoppedAt: '2026-09-11T22:00:00.000Z', stopReason: 'fixture gate' };
}
function evidence(it, dir) {
  write(`${dir}/readback.json`, { components: [{ id: 'lib-1', key: 'lib', componentPropertyDefinitions: { size: { type: 'VARIANT', variantOptions: ['small'] } } }] });
  write(`${dir}/comparison.png`, PNG);
  write(`${dir}/execution.json`, { format: 'tebra.design-execution', version: 1, itemId: it.id, recordId: it.expectedRecordId, preflight: { targetFileKey: 'T', identityEvidence: `${dir}/readback.json`, tools: ['fixture_tool'], toolEvidence: `${dir}/readback.json`, controls: [{ name: 'Button', component: 'lib', properties: { size: 'small' }, evidence: `${dir}/readback.json` }] }, corrections: [], milestones: [{ name: 'Sheets', status: 'pending', nodeIds: [], render: null, inspected: false }], unresolved: [], nextAction: 'Assemble the sheets' });
}
for (const [id, dir] of [['dry-resume', 'batch'], ['dry-resume-new', 'batch-new'], ['dry-resume-done', 'batch-done']]) {
  const it = manifest.items.find((candidate) => candidate.id === id);
  startFingerprints[id] = lib.fingerprint(lib.loadStore(), it.expectedRecordId);
  write(`.workflow-runs/${id}.json`, run(it));
  evidence(it, dir);
}
// While the batch was stopped, other batches appended a record and a flag; the working tree gained an unrelated edit.
lib.appendFlags([{ id: 'dryRun_resumeFlag', severity: 'note', summary: 'appended while the batch was stopped' }]);
const OTHER = 'dryRun_resumeOther_2026-09-11';
rs.apply({ id: OTHER, previous, workstream: 'workflow', date: '2026-09-11', createdBy: 'self-test', body: body('IN PROGRESS — another batch', { date: '2026-09-11', report: 'workflow/README.md' }) });
rs.close(OTHER, (r) => ({ ...r, _status: 'DONE — another batch closed', outcome: 'x', validation: { selfTest: 'this run' } }));
write('unrelated.md', 'operator work present before the resume');
changedList = ['unrelated.md', 'batch/execution.json'];
say(`while stopped: flag dryRun_resumeFlag and record ${OTHER} appended; unrelated.md dirty`);

// --- refusals write nothing --------------------------------------------------------------------------------------------
const snapshot = () => JSON.stringify([read('workflow/manifest.json'), read('.workflow-runs/dry-resume.json'), lib.readRecordIndex().records.find((r) => r.id === OLD).status]);
const before = snapshot();
const refuse = (pattern, mutate = () => {}, restore = () => {}, options = {}) => {
  mutate();
  try { assert.throws(() => resumeBatch({ itemId: 'dry-resume', executor: 'self-test', quote: QUOTE, ...options }, deps), pattern); } finally { restore(); }
  assert.equal(snapshot(), before, `refusal ${pattern} wrote nothing`);
  cases++;
};
const withManifest = (mutate) => { const m = read('workflow/manifest.json'); mutate(m); write('workflow/manifest.json', m); };
const withRun = (mutate) => { const r = read('.workflow-runs/dry-resume.json'); mutate(r); write('.workflow-runs/dry-resume.json', r); };
const withExecution = (mutate) => { const e = read('batch/execution.json'); mutate(e); write('batch/execution.json', e); };
refuse(/pass --confirm=/, () => {}, () => {}, { quote: '   ' });
refuse(/Usage:/, () => {}, () => {}, { executor: '' });
refuse(/dry-resume is queued, not stopped/, () => withManifest((m) => { m.items[1].status = 'queued'; }), () => write('workflow/manifest.json', manifest));
refuse(/is active, not stopped/, () => withRun((r) => { r.status = 'active'; }), () => write('.workflow-runs/dry-resume.json', run(manifest.items[1])));
refuse(/predates the version-3 run format/, () => withRun((r) => { r.version = 2; delete r.storeFingerprint; }), () => write('.workflow-runs/dry-resume.json', run(manifest.items[1])));
refuse(/does not belong to dry-resume/, () => withRun((r) => { r.expectedRecordId = 'other'; }), () => write('.workflow-runs/dry-resume.json', run(manifest.items[1])));
refuse(/Planner-owned risk\/scope fields changed/, () => withManifest((m) => { m.items[1].stopCondition = 'changed by the executor'; m.items[1].risk.lock = jsonDigest(manifestRiskPayload(m.items[1])); }), () => write('workflow/manifest.json', manifest));
refuse(/Dependency gate failed: dry-dep is not complete/, () => withManifest((m) => { m.items[0].status = 'queued'; }), () => write('workflow/manifest.json', manifest));
refuse(/Execution evidence failed \(ready\)/, () => withExecution((e) => { e.unresolved = ['Disconnected write; read back required']; }), () => evidence(manifest.items[1], 'batch'));
refuse(/No run to resume/, () => fs.renameSync(path.join(scratch, '.workflow-runs/dry-resume.json'), path.join(scratch, '.workflow-runs/away.json')), () => fs.renameSync(path.join(scratch, '.workflow-runs/away.json'), path.join(scratch, '.workflow-runs/dry-resume.json')));
assert.throws(() => resumeBatch({ itemId: 'nope', executor: 'self-test', quote: QUOTE }, deps), /Unknown manifest item/); cases++;
assert.throws(() => resumeBatch({ itemId: 'dry-resume-done', executor: 'self-test', quote: QUOTE }, deps), /Record gate failed: dryRun_resumeDone_2026-09-11 must exist under records\/ and be IN PROGRESS/); cases++;
assert.ok(lib.readRecordIndex().records.find((r) => r.id === DONE).status.startsWith('DONE'), 'the DONE record stayed DONE');
withRun((r) => { r.storeFingerprint = { ...startFingerprints['dry-resume'], records: { ...startFingerprints['dry-resume'].records, [DONE]: 'not-what-it-is-now' } }; });
refuse(/Immutable records changed since the batch started:\n- record dryRun_resumeDone_2026-09-11 changed/, () => {}, () => write('.workflow-runs/dry-resume.json', run(manifest.items[1])));
fs.unlinkSync(newPlan);
assert.throws(() => resumeBatch({ itemId: 'dry-resume-new', executor: 'self-test', quote: QUOTE }, deps), /Batch files gate failed at resume:\n- .*plan\.md is missing/); cases++;
assert.equal(read('.workflow-runs/dry-resume-new.json').status, 'stopped', 'the gated item stayed stopped');
planWith(['- [x] open', '- [ ] finish']);
say(`refusals (${cases}): missing quote or executor, item or run not stopped, old run, run/item mismatch, changed risk lock, incomplete dependency, execution not ready, missing run, unknown item, record not IN PROGRESS, changed immutable record, batch-files gate; nothing written`);

// --- the resume ----------------------------------------------------------------------------------------------------------
const result = resumeBatch({ itemId: 'dry-resume', executor: 'self-test', quote: `  ${QUOTE}  `, provider: 'fixture', model: 'fixture-model' }, deps);
const line = summary(result);
cases++;
assert.equal(result.at, NOW);
assert.equal(result.files.applies, false);
assert.match(result.files.notes[0], /not required for a record dated 2026-09-11/);
assert.deepEqual(result.appendedSinceStart, { records: [OTHER], flags: ['dryRun_resumeFlag'] });
assert.deepEqual(result.changedSinceStart, []);
assert.deepEqual(result.preexistingFiles, ['unrelated.md']);
assert.match(line, /^batch resumed dry-resume; record records\/workflow\/2026-09-11\/dryRun_resumeOld_2026-09-11\.json checkpointed RESUMED \(was IN PROGRESS — STOPPED at a fixture gate\); run active since 2026-09-13T09:00:00\.000Z \(stopped 2026-09-11T22:00:00\.000Z: fixture gate\); guard refreshed [0-9a-f]{12} over \d+ records \+ \d+ flags; appended since start: record dryRun_resumeOther_2026-09-11, flag dryRun_resumeFlag; baseline 1 pre-existing file\(s\); batch files plan and inventory not required for a record dated 2026-09-11 \(before 2026-09-12\)$/);
const resumedRun = read('.workflow-runs/dry-resume.json');
assert.equal(resumedRun.status, 'active');
assert.equal(resumedRun.resumedAt, NOW);
assert.equal(resumedRun.stoppedAt, undefined);
assert.equal(resumedRun.stopReason, undefined);
assert.equal(resumedRun.resumes.length, 1);
assert.deepEqual(resumedRun.resumes[0].confirmation, { quote: QUOTE, recordedAt: NOW, recordedBy: 'self-test' });
assert.deepEqual(resumedRun.resumes[0].provenance, { provider: 'fixture', model: 'fixture-model', reasoning: null });
assert.equal(resumedRun.resumes[0].stoppedAt, '2026-09-11T22:00:00.000Z');
assert.equal(resumedRun.resumes[0].stopReason, 'fixture gate');
assert.deepEqual(resumedRun.resumes[0].appendedSinceStart, { records: [OTHER], flags: ['dryRun_resumeFlag'] });
assert.equal(resumedRun.resumes[0].recordCheckpoint, `records/workflow/2026-09-11/${OLD}.json`);
assert.ok(resumedRun.storeFingerprint.records[OTHER] && resumedRun.storeFingerprint.flags.dryRun_resumeFlag, 'fingerprint refreshed to include the appends');
assert.equal(resumedRun.storeFingerprint.records[OLD], undefined, 'the owned record stays outside its own guard');
assert.deepEqual(Object.keys(resumedRun.preexistingFiles), ['unrelated.md']);
assert.match(resumedRun.preexistingFiles['unrelated.md'], /^[0-9a-f]{64}$/);
assert.equal(resumedRun.schemaSha256.length, 64);
assert.deepEqual(lib.compareFingerprint(resumedRun.storeFingerprint, lib.loadStore(), OLD), { errors: [], additions: { records: [], flags: [] } }, 'the refreshed guard is clean now');
const resumedManifest = validateManifestData(read('workflow/manifest.json'));
const resumedItem = resumedManifest.items.find((candidate) => candidate.id === 'dry-resume');
assert.equal(resumedItem.status, ACTIVE_ITEM_STATUS);
assert.equal(ACTIVE_ITEM_STATUS, 'queued', 'what an active run shows today');
assert.equal(resumedItem.stoppedAt, undefined);
assert.deepEqual(resumedItem.resumes, [{ at: NOW, executor: 'self-test', quote: QUOTE, stoppedAt: '2026-09-11T22:00:00.000Z', stopReason: 'fixture gate' }]);
assert.equal(resumedItem.risk.lock, jsonDigest(manifestRiskPayload(resumedItem)), 'the planner lock survives the resume');
const resumedRecord = lib.findRecord(lib.loadStore(), OLD).record;
assert.equal(resumedRecord._status, 'IN PROGRESS — RESUMED 2026-09-13 (STOPPED at a fixture gate)');
assert.equal(resumedRecord.resumes.length, 1);
assert.equal(resumedRecord.resumes[0].operatorResumeQuote, QUOTE);
assert.equal(resumedRecord.resumes[0].run, '.workflow-runs/dry-resume.json');
assert.equal(resumedRecord.resumes[0].executionNextAction, 'Assemble the sheets');
assert.deepEqual(resumedRecord.resumes[0].appendedSinceStart, { records: [OTHER], flags: ['dryRun_resumeFlag'] });
assert.equal(lib.checkFreshness().length, 0, 'generated files fresh after the checkpoint');
say('resumed dry-resume: run active with the resume, refreshed guard (appends listed) and baseline; item queued with its stop on the resume history; record checkpointed RESUMED quoting the operator; batch-files gate noted (record dated before the gate)');
say(`  ${line}`);
assert.throws(() => resumeBatch({ itemId: 'dry-resume', executor: 'self-test', quote: QUOTE }, deps), /dry-resume is queued, not stopped/); cases++;

// A record dated on or after the gate date resumes only with its plan in order, and the line says so. The first
// resume checkpointed the other batch's IN PROGRESS record: its owner's business, reported and not refused.
const gated = resumeBatch({ itemId: 'dry-resume-new', executor: 'self-test', quote: QUOTE }, deps);
cases++;
assert.deepEqual(gated.changedSinceStart, [`record ${OLD} changed during the batch (records are immutable)`]);
assert.match(summary(gated), /; changed since start: record dryRun_resumeOld_2026-09-11 changed/);
assert.equal(gated.files.applies, true);
assert.match(summary(gated), /batch files kind=figma plan=.*batch-new[\\/]plan\.md inventory=.*batch-new[\\/]inventory\.json$/);
assert.ok(!fs.existsSync(path.join(scratch, 'batch-new', 'inventory.json')), 'the inventory is not required at open; it precedes the first write');
assert.equal(lib.findRecord(lib.loadStore(), NEW).record._status, 'IN PROGRESS — RESUMED 2026-09-13 (STOPPED, gated by plan.md)');
say('resumed dry-resume-new: the batch-files gate applied and reported kind and plan');

// --- the real repository was not touched -------------------------------------------------------------------------------------
const realIndex = JSON.parse(fs.readFileSync(path.join(REAL_ROOT, 'indexes/record-index.json'), 'utf8'));
assert.ok(!realIndex.records.some((r) => [OLD, NEW, DONE, OTHER].includes(r.id)), 'real index has no dry-run record');
assert.ok(!fs.existsSync(path.join(REAL_ROOT, '.workflow-runs/dry-resume.json')), 'real runs untouched');
assert.ok(!JSON.parse(fs.readFileSync(path.join(REAL_ROOT, 'workflow/manifest.json'), 'utf8')).items.some((i) => i.id === 'dry-resume'), 'real manifest untouched');
say(`resume-batch self-test PASS ${cases} cases; real store, manifest and runs untouched`);
fs.writeFileSync(path.join(scratch, 'resume-batch-self-test.log'), `${log.join('\n')}\n`);
