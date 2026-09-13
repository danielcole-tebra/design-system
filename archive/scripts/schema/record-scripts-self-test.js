// Dry run of scripts/schema/record-scripts.js against a scratch copy of the store. Never touches the real store.
// Usage: node scripts/schema/record-scripts-self-test.js [scratchDir]
const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const REAL_ROOT = path.resolve(__dirname, '..', '..');
const scratch = process.argv[2] ? path.resolve(process.argv[2]) : fs.mkdtempSync(path.join(os.tmpdir(), 'tebra-record-scripts-'));
for (const dir of ['foundation', 'records', 'flags', 'indexes']) fs.cpSync(path.join(REAL_ROOT, dir), path.join(scratch, dir), { recursive: true });
fs.copyFileSync(path.join(REAL_ROOT, 'design-system-schema.json'), path.join(scratch, 'design-system-schema.json'));

process.env.TEBRA_STORE_ROOT = scratch;
const lib = require('./lib');
const rs = require('./record-scripts');
const log = [];
const say = (line) => { log.push(line); console.log(line); };
say(`scratch store at ${scratch}`);

const id = 'dryRun_recordScripts_2026-09-12';
const date = '2026-09-12';
const before = lib.generate();
const previous = [...before.store.records].reverse().find((env) => lib.isDone(env.record)).id;
const count = () => lib.readRecordIndex().counts.records;
const status = () => lib.readRecordIndex().records.find((r) => r.id === id)?.status;
const ceiling = rs.recordCeiling();
assert.ok(ceiling.bytes > 0 && ceiling.appliesFrom <= date, 'catalog ceiling read');
say(`previous DONE record ${previous}; record ceiling ${ceiling.bytes} bytes from ${ceiling.appliesFrom}`);

const good = {
  _status: 'IN PROGRESS — dry run of the templated record scripts',
  date, workstream: 'Workflow / self-test',
  risk: { tier: 'low', operatorQuote: 'dry run' },
  scope: ['exercise apply, checkpoint and close'],
  report: 'workflow/README.md',
  stopCondition: 'scratch store only',
  nextAction: 'checkpoint, then close'
};
// The plan beside the report (record workflow_planInventory_2026-09-12): required at apply, complete at close.
const planFile = path.join(scratch, 'plan.md');
const planWith = (items, kind = 'repository') => fs.writeFileSync(planFile, `# ${id} plan\n\nRecord: ${id}\nKind: ${kind}\n\n## Phases\n\n${items.join('\n')}\n`);
planWith(['- [ ] exercise apply', '- [ ] close']);
good.batchKind = 'repository';
good.plan = planFile;
const open = (body, extra = {}) => rs.apply({ id, previous, workstream: 'workflow', date, createdBy: 'self-test', script: 'scripts/schema/record-scripts-self-test.js', body, ...extra });

// 1. apply refuses an incomplete or unquoted body, a placeholder and a wrong tier, and writes nothing
assert.throws(() => open({ _status: 'IN PROGRESS' }), /missing date, workstream, risk, scope, report, stopCondition, nextAction/);
assert.throws(() => open({ ...good, _status: 'DONE — no' }), /_status must start with "IN PROGRESS"/);
assert.throws(() => open({ ...good, risk: { tier: 'low' } }), /no operator statement quoted verbatim .*rule 11/);
assert.throws(() => open({ ...good, risk: { tier: 'critical', operatorQuote: 'x' } }), /risk.tier must be one of/);
assert.throws(() => open({ ...good, scope: ['TODO(fill in)'] }), /TODO placeholder left at body.scope\[0\]/);
assert.throws(() => rs.apply({ id, previous, date, body: good }), /createdBy/);
assert.strictEqual(count(), before.recordIndex.counts.records, 'nothing written by the refused applies');
say('apply: incomplete body, missing quote, bad tier, TODO placeholder and missing executor refused; nothing written');

// 1b. apply requires the declared kind and the planner's plan beside the report
assert.throws(() => open({ ...good, batchKind: undefined }), /batchKind must be declared by the planner \(figma or repository\)/);
assert.throws(() => open({ ...good, batchKind: 'canvas' }), /batchKind must be figma or repository/);
assert.throws(() => open({ ...good, plan: path.join(scratch, 'nowhere', 'plan.md') }), /plan\.md is missing: the planner writes the phase checklist before the record opens/);
planWith(['- [ ] TODO(fill)']);
assert.throws(() => open(good), /TODO left at line 8/);
planWith(['- [ ] exercise apply', '- [ ] close'], 'figma');
assert.throws(() => open(good), /Kind: figma disagrees with batchKind repository/);
planWith(['- [ ] exercise apply', '- [ ] close']);
fs.writeFileSync(path.join(scratch, 'inventory.json'), '{}');
assert.throws(() => open({ ...good, inventory: path.join(scratch, 'inventory.json') }), /inventory\.json exists, but the batch is repository-only/);
fs.unlinkSync(path.join(scratch, 'inventory.json'));
assert.strictEqual(count(), before.recordIndex.counts.records, 'nothing written by the plan and kind refusals');
say('apply: undeclared or wrong batchKind, a missing plan, a TODO or wrong kind in the plan, and a repository inventory refused; nothing written');

// 2. the ceiling stops apply before the store writes; a record dated before appliesFrom is exempt
const bulk = 'x'.repeat(ceiling.bytes);
assert.throws(() => open({ ...good, scope: [bulk] }), rs.RecordCeilingError);
assert.throws(() => open({ ...good, scope: [bulk] }), new RegExp(`Record ceiling: ${id} would be \\d+ bytes at apply, over the ceiling of ${ceiling.bytes}; nothing was written`));
assert.throws(() => open({ ...good, scope: ['small'] }, { ceiling: { bytes: 100 } }), /over the ceiling of 100/);
assert.strictEqual(count(), before.recordIndex.counts.records, 'nothing written by the over-ceiling applies');
assert.strictEqual(rs.checkRecordCeiling({ id, date: '2026-09-01', envelope: { record: { scope: bulk } }, stage: 'test' }).applies, false, 'records before appliesFrom are exempt');
say(`apply: a ${ceiling.bytes + 1}+ byte record refused before openRecord; exemption before ${ceiling.appliesFrom} kept`);

// 3. apply opens the record with defaults and returns the measured bytes
const opened = open(good);
assert.strictEqual(opened.file, `records/workflow/${date}/${id}.json`);
assert.strictEqual(count(), before.recordIndex.counts.records + 1);
assert.ok(status().startsWith('IN PROGRESS'));
assert.ok(opened.bytes > 0 && opened.bytes <= ceiling.bytes && opened.headroom === ceiling.bytes - opened.bytes);
const stored = lib.findRecord(lib.loadStore(), id);
assert.deepStrictEqual([stored.record.figmaMutations, stored.record.flagsAdded, stored.created.script], [[], [], 'scripts/schema/record-scripts-self-test.js']);
assert.strictEqual(Buffer.byteLength(fs.readFileSync(path.join(scratch, opened.file))), opened.bytes, 'measured bytes equal the file on disk');
assert.throws(() => open(good), /already exists/);
say(`apply: opened ${opened.file} at ${opened.bytes} bytes (headroom ${opened.headroom}); defaults filled; duplicate refused`);

// 4. checkpoint keeps the record IN PROGRESS and measures it
assert.throws(() => rs.checkpoint(id, (r) => ({ ...r, _status: 'DONE — early' })), /status must stay IN PROGRESS/);
assert.throws(() => rs.checkpoint(id, (r) => ({ ...r, notes: bulk })), rs.RecordCeilingError);
assert.throws(() => rs.checkpoint(id, (r) => ({ ...r, notes: 'TODO later' })), /TODO placeholder/);
assert.ok(status().startsWith('IN PROGRESS — dry run of the templated'), 'refused checkpoints changed nothing');
const cp = rs.checkpoint(id, (r) => ({ ...r, _status: 'IN PROGRESS — STOPPED at a gate', stoppedAt: 'gate' }));
assert.strictEqual(status(), 'IN PROGRESS — STOPPED at a gate');
assert.strictEqual(cp.stage, 'checkpoint');
say('checkpoint: DONE, over-ceiling and TODO bodies refused unchanged; a stop is recorded IN PROGRESS');

// 5. close: the hard stop before finalize leaves the record IN PROGRESS so it can be trimmed
const done = (r) => ({ ...r, _status: 'DONE — dry run', outcome: 'exercised', validation: { selfTest: 'this run' } });
assert.throws(() => rs.close(id, (r) => ({ ...r, outcome: 'x', validation: 'y' })), /final status must match/);
assert.throws(() => rs.close(id, (r) => ({ ...r, _status: 'DONE — no evidence' })), /missing outcome, validation/);
assert.throws(() => rs.close(id, (r) => ({ ...done(r), risk: { tier: 'medium', operatorQuote: 'dry run' } })), /risk.tier changed from low to medium/);
assert.throws(() => rs.close(id, (r) => ({ ...done(r), report: 'figma-export/does-not-exist/report.md' })), /report .* does not exist/);
assert.throws(() => rs.close(id, (r) => ({ ...done(r), outcome: 'TODO' })), /TODO placeholder/);
assert.throws(() => rs.close(id, (r) => ({ ...done(r), evidence: bulk })), new RegExp(`Record ceiling: ${id} would be \\d+ bytes at close, over the ceiling of ${ceiling.bytes}; nothing was written`));
assert.throws(() => rs.close(id, (r) => ({ ...done(r) }), { ceiling: { bytes: 10 } }), /over the ceiling of 10/);
assert.throws(() => rs.close(id, done), /2 phase\(s\) still open at close/);
planWith(['- [x] exercise apply', '- [-] close']);
assert.throws(() => rs.close(id, done), /a dropped phase says why after a colon/);
assert.strictEqual(status(), 'IN PROGRESS — STOPPED at a gate', 'every refused close left the record IN PROGRESS and unchanged');
planWith(['- [x] exercise apply', '- [-] close: closed by this test']);
say('close: wrong status, missing outcome/validation, tier change, missing report, TODO, over-ceiling, open plan phase and unreasoned drop refused; record still IN PROGRESS');

// 6. close finalizes once; the closed record is measured, DONE in the index and immutable
const closed = rs.close(id, (r) => { const next = done(r); delete next.risk; return next; });
assert.strictEqual(closed.stage, 'close');
assert.ok(closed.status.startsWith('DONE — dry run'));
const final = lib.findRecord(lib.loadStore(), id);
assert.deepStrictEqual(final.record.risk, good.risk, 'risk carried over when the close body omits it');
assert.strictEqual(Buffer.byteLength(fs.readFileSync(path.join(scratch, closed.file))), closed.bytes, 'measured bytes equal the DONE file');
assert.throws(() => rs.close(id, done), /immutable/);
assert.throws(() => rs.checkpoint(id, (r) => r), /immutable/);
assert.strictEqual(lib.checkFreshness().length, 0, 'generated files fresh after close');
assert.ok(!lib.generate().currentState.recordGate.inProgress.includes(id), 'gate no longer lists the closed record');
say(`close: finalized at ${closed.bytes} bytes; risk carried; second close and checkpoint refused as immutable`);

// 6b. a Figma batch: the inventory is not needed at open, is required at close, and needs a clean reverification once mutations are listed
const figId = 'dryRun_recordScriptsFigma_2026-09-12';
const figPlan = path.join(scratch, 'fig-plan.md');
const figInv = path.join(scratch, 'fig-inventory.json');
fs.writeFileSync(figPlan, `# ${figId} plan\n\nRecord: ${figId}\nKind: figma\n\n## Phases\n\n- [x] build\n`);
const figBody = { ...good, batchKind: 'figma', plan: figPlan, inventory: figInv, _status: 'IN PROGRESS — figma dry run' };
const figOpen = rs.apply({ id: figId, previous: [id], workstream: 'workflow', date, createdBy: 'self-test', body: figBody });
assert.ok(figOpen.file.endsWith(`${figId}.json`), 'a figma batch opens without an inventory');
const figDone = (r) => ({ ...r, _status: 'DONE — figma dry run', outcome: 'exercised', validation: { selfTest: 'this run' } });
assert.throws(() => rs.close(figId, figDone), /inventory\.json is missing: save the first read-only page walk/);
const inventory = (reverifications) => fs.writeFileSync(figInv, JSON.stringify({ format: 'tebra.design-page-inventory', version: 1, fileKey: 'F', capturedAt: '2026-09-12T10:00:00.000Z', skipInvisibleInstanceChildren: false, authority: 'not evidence', pages: [{ id: '3:2', name: 'Templates' }], nodes: [{ id: '1:1', name: 'n', type: 'FRAME', parent: '3:2', page: '3:2' }], reverifications }));
inventory([]);
rs.checkpoint(figId, (r) => ({ ...r, figmaMutations: [{ evidence: 'scratch' }] }));
assert.throws(() => rs.close(figId, figDone), /no reverification recorded/);
inventory([{ at: '2026-09-12T10:01:00.000Z', verified: [], mismatched: [{ id: '1:1', drift: ['name'] }], missing: [] }]);
assert.throws(() => rs.close(figId, figDone), /latest reverification .* found 1 mismatched/);
inventory([{ at: '2026-09-12T10:02:00.000Z', verified: [{ id: '1:1' }], mismatched: [], missing: [] }]);
assert.ok(rs.close(figId, figDone).status.startsWith('DONE'), 'a clean reverification lets the mutating figma batch close');
say('figma: opens without an inventory; close needs the inventory, and a clean latest reverification once mutations are listed');

// 7. the real store was not touched
const realIndex = JSON.parse(fs.readFileSync(path.join(REAL_ROOT, 'indexes/record-index.json'), 'utf8'));
assert.ok(!realIndex.records.some((r) => r.id === id || r.id === figId), 'real index has no dry-run record');
assert.ok(!fs.existsSync(path.join(REAL_ROOT, opened.file)), 'real store has no dry-run file');
say('self-test PASS record scripts: apply gates, plan and kind, ceiling, checkpoint, close hard stop before finalize, figma inventory gate, immutability, real store untouched');
fs.writeFileSync(path.join(scratch, 'record-scripts-self-test.log'), `${log.join('\n')}\n`);
