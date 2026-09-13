// Self-test of scripts/workflow/batch-files.js on a scratch evidence folder (record workflow_planInventory_2026-09-12).
// Never touches the repository's records or evidence folders.
const assert = require('assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const bf = require('./batch-files');

const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'tebra-batch-files-'));
const dir = (name) => { const d = path.join(scratch, name); fs.mkdirSync(d, { recursive: true }); return d; };
const write = (file, text) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, typeof text === 'string' ? text : `${JSON.stringify(text, null, 2)}\n`); return file; };
const say = (line) => console.log(line);
const id = 'dryRun_batchFiles_2026-09-12';
const at = '2026-09-12T10:00:00.000Z';
const plan = (items, { record = id, kind = 'repository', extra = '' } = {}) => `# ${record} plan\n\nRecord: ${record}\nKind: ${kind}\n${extra}\n## Phases\n\n${items.join('\n')}\n`;
const inventory = (over = {}) => ({
  format: bf.INVENTORY_FORMAT, version: bf.INVENTORY_VERSION, fileKey: 'FILEKEY', capturedAt: at, skipInvisibleInstanceChildren: false, authority: bf.AUTHORITY,
  pages: [{ id: '3:2', name: 'Templates' }],
  nodes: [{ id: '10:1', name: 'Section', type: 'SECTION', parent: '3:2', page: '3:2' }],
  reverifications: [],
  ...over
});
const clean = { at, verified: [{ id: '10:1' }], mismatched: [], missing: [] };
const includes = (errors, re, label) => assert.ok(errors.some((e) => re.test(e)), `${label || re}: ${JSON.stringify(errors)}`);

// 1. plan parsing and validation
const p1 = path.join(dir('plan'), 'plan.md');
includes(bf.validatePlan({ file: p1, recordId: id }), /plan\.md is missing: the planner writes/);
write(p1, '');
let errors = bf.validatePlan({ file: p1, recordId: id });
includes(errors, /no "# " title line/); includes(errors, /no "Record:/); includes(errors, /no phase checklist items/);
write(p1, plan(['- [ ] one', '- [ ] TODO(two)'], { record: 'other' }));
errors = bf.validatePlan({ file: p1, recordId: id, kind: 'figma' });
includes(errors, /Record: other does not name dryRun/); includes(errors, /TODO left at line 9/); includes(errors, /Kind: repository disagrees with batchKind figma/);
write(p1, plan(['- [ ] one', '* [X] two', '- [-] three', '- [-] four: not needed']));
const parsed = bf.parsePlan(fs.readFileSync(p1, 'utf8'));
assert.deepEqual(parsed.items.map((i) => [i.line, i.state]), [[8, 'open'], [9, 'done'], [10, 'dropped'], [11, 'dropped']]);
assert.deepEqual([parsed.title, parsed.record, parsed.kind], [`${id} plan`, id, 'repository']);
errors = bf.validatePlan({ file: p1, recordId: id, terminal: true });
includes(errors, /:10: a dropped phase says why after a colon/); includes(errors, /1 phase\(s\) still open at close \(line 8\)/);
assert.deepEqual(bf.validatePlan({ file: p1, recordId: id }).length, 1, 'open phases are fine before close');
write(p1, plan(['- [x] one', '- [-] two: dropped by the test']));
assert.deepEqual(bf.validatePlan({ file: p1, recordId: id, kind: 'repository', terminal: true }), []);
say('plan: missing, empty, wrong record, TODO, kind mismatch, dropped without reason and open-at-close refused; done and dropped-with-reason pass');

// 2. inventory validation
const i1 = path.join(dir('inv'), 'inventory.json');
includes(bf.validateInventory({ file: i1 }), /inventory\.json is missing: save the first read-only page walk/);
write(i1, '{ not json');
includes(bf.validateInventory({ file: i1 }), /Unexpected token|JSON/);
write(i1, inventory());
assert.deepEqual(bf.validateInventory({ file: i1, fileKey: 'FILEKEY' }), []);
write(i1, inventory({ format: 'x', fileKey: '', capturedAt: 'yesterday', skipInvisibleInstanceChildren: true, authority: 'trust me', pages: [{ id: '3:2' }], nodes: [{ id: '10:1', name: 'n', type: 'FRAME', parent: '3:2', page: '9:9' }, { id: '10:2' }], reverifications: [{ at }] }));
errors = bf.validateInventory({ file: i1 });
for (const re of [/format must be/, /fileKey missing/, /capturedAt must be an ISO timestamp/, /skipInvisibleInstanceChildren=false/, /not evidence/, /every page needs an id and a name/, /2 node\(s\) lack id, name, type, parent or a listed page/, /every reverification needs at, verified/]) includes(errors, re);
write(i1, inventory({ fileKey: 'OTHER' }));
includes(bf.validateInventory({ file: i1, fileKey: 'FILEKEY' }), /fileKey OTHER is not the batch target FILEKEY/);
write(i1, inventory());
includes(bf.validateInventory({ file: i1, requireReverification: true }), /no reverification recorded/);
write(i1, inventory({ reverifications: [clean, { ...clean, mismatched: [{ id: '10:1' }] }] }));
includes(bf.validateInventory({ file: i1, requireReverification: true }), /latest reverification .* found 1 mismatched and 0 missing/);
write(i1, inventory({ reverifications: [{ ...clean, verified: [] }] }));
includes(bf.validateInventory({ file: i1, requireReverification: true }), /verified no nodes/);
write(i1, inventory({ reverifications: [{ ...clean, missing: [{ id: '1' }] }, clean] }));
assert.deepEqual(bf.validateInventory({ file: i1, requireReverification: true }), [], 'the latest reverification is the one that counts');
say('inventory: missing, malformed, wrong target, every field, and the latest reverification checked');

// 3. batch kind: declared, inferred from the item target or the record mutations, and contradictions
assert.deepEqual(bf.batchKind({ record: { batchKind: 'figma' } }), { kind: 'figma', declared: 'figma', inferred: false, errors: [] });
assert.equal(bf.batchKind({ record: {} }).kind, 'repository');
assert.equal(bf.batchKind({ record: {}, item: { target: { fileKey: 'F' } } }).kind, 'figma');
assert.equal(bf.batchKind({ record: { figmaMutations: [{ evidence: 'x' }] } }).kind, 'figma');
assert.equal(bf.batchKind({ record: { validation: { figmaMutations: 3 } } }).kind, 'figma');
assert.ok(bf.batchKind({ record: { batchKind: 'canvas' } }).errors[0].startsWith('batchKind must be figma or repository'));
includes(bf.batchKind({ record: { batchKind: 'repository' }, item: { target: { fileKey: 'F' } } }).errors, /manifest item targets a Figma file/);
includes(bf.batchKind({ record: { batchKind: 'repository', figmaMutations: [{}] } }).errors, /record lists Figma mutations/);
say('kind: declared wins; a target file or listed mutations imply figma; a contradicting declaration is refused');

// 4. the gate per stage, with paths derived from the report or declared on the record
const ev = dir('evidence');
const report = path.join(ev, 'report.md');
const base = { report, batchKind: 'repository', date: '2026-09-12' };
let r = bf.validateBatchFiles({ record: { ...base, date: '2026-09-11' }, recordId: id, stage: 'open' });
assert.deepEqual([r.applies, r.errors], [false, []]); assert.match(r.notes[0], /not required for a record dated 2026-09-11 \(before 2026-09-12\)/);
r = bf.validateBatchFiles({ record: { ...base, date: '2026-09-11' }, recordId: id, date: '2026-09-12', stage: 'open' });
assert.equal(r.applies, true, 'an explicit date wins over the body date');
assert.throws(() => bf.validateBatchFiles({ record: base, stage: 'later' }), /unknown stage later/);
r = bf.validateBatchFiles({ record: { report }, recordId: id, date: '2026-09-12', stage: 'open', policy: { appliesFrom: '2026-09-12' } });
includes(r.errors, /batchKind must be declared by the planner/); includes(r.errors, /plan\.md is missing/);
assert.equal(r.plan, `${ev.split(path.sep).join('/')}/plan.md`, 'plan derived beside the report');
write(path.join(ev, 'plan.md'), plan(['- [ ] build']));
r = bf.validateBatchFiles({ record: base, recordId: id, stage: 'open' });
assert.deepEqual([r.errors, r.kind, r.inferred, r.inventory], [[], 'repository', false, null]);
assert.deepEqual(bf.validateBatchFiles({ record: { ...base, batchKind: undefined }, recordId: id, stage: 'mutation' }).errors, [], 'kind may be inferred after open');
write(path.join(ev, 'inventory.json'), inventory());
includes(bf.validateBatchFiles({ record: base, recordId: id, stage: 'open' }).errors, /inventory\.json exists, but the batch is repository-only/);
fs.unlinkSync(path.join(ev, 'inventory.json'));
const elsewhere = write(path.join(dir('elsewhere'), 'my-plan.md'), plan(['- [x] done']));
assert.deepEqual(bf.validateBatchFiles({ record: { ...base, plan: elsewhere }, recordId: id, stage: 'close' }).errors, [], 'record.plan names the plan file');
includes(bf.validateBatchFiles({ record: base, recordId: id, stage: 'close' }).errors, /still open at close/);
say('gate: exempt before appliesFrom; batchKind and plan required at open; a repository batch refuses an inventory; close needs every phase resolved');

// 5. a Figma batch: inventory not needed at open, required with a clean reverification before a mutation and at close after mutations
const fig = { report, batchKind: 'figma', date: '2026-09-12' };
write(path.join(ev, 'plan.md'), plan(['- [x] build'], { kind: 'figma' }));
r = bf.validateBatchFiles({ record: fig, recordId: id, stage: 'open' });
assert.deepEqual([r.errors, r.kind, r.inventory.endsWith('inventory.json')], [[], 'figma', true]);
includes(bf.validateBatchFiles({ record: fig, recordId: id, stage: 'mutation' }).errors, /inventory\.json is missing/);
write(path.join(ev, 'inventory.json'), inventory());
includes(bf.validateBatchFiles({ record: fig, recordId: id, stage: 'mutation' }).errors, /no reverification recorded/);
assert.deepEqual(bf.validateBatchFiles({ record: fig, recordId: id, stage: 'close' }).errors, [], 'a read-only Figma batch closes without a reverification');
includes(bf.validateBatchFiles({ record: { ...fig, figmaMutations: [{ evidence: 'x' }] }, recordId: id, stage: 'close' }).errors, /no reverification recorded/);
write(path.join(ev, 'inventory.json'), inventory({ reverifications: [clean] }));
assert.deepEqual(bf.validateBatchFiles({ record: fig, recordId: id, stage: 'mutation' }).errors, []);
assert.deepEqual(bf.validateBatchFiles({ record: { ...fig, validation: { figmaMutations: 2 } }, recordId: id, stage: 'finish' }).errors, []);
const item = { target: { fileKey: 'OTHER' }, requiredEvidence: { report } };
includes(bf.validateBatchFiles({ record: fig, recordId: id, item, stage: 'finish' }).errors, /fileKey FILEKEY is not the batch target OTHER/);
r = bf.validateBatchFiles({ record: { plan: path.join(ev, 'plan.md'), inventory: path.join(ev, 'inventory.json') }, recordId: id, item: { ...item, target: { fileKey: 'FILEKEY' } }, date: '2026-09-12', stage: 'finish' });
assert.deepEqual([r.errors, r.kind, r.inferred], [[], 'figma', true], 'a manifest item with a target is a Figma batch; declared paths win');
fs.unlinkSync(path.join(ev, 'inventory.json'));
assert.throws(() => bf.assertBatchFiles({ record: { ...fig, figmaMutations: [{}] }, recordId: id, stage: 'close' }), /Batch files gate \(close\) failed:\n- .*inventory\.json is missing/);
write(path.join(ev, 'inventory.json'), inventory({ reverifications: [clean] }));
assert.match(bf.describe(r), /^kind=figma \(inferred\) plan=.*plan\.md inventory=.*inventory\.json$/);
assert.match(bf.describe(bf.validateBatchFiles({ record: { ...base, date: '2026-09-01' }, stage: 'open' })), /not required/);
say('figma: inventory optional at open, required before a mutation with a clean reverification, and at close once mutations are listed; target file key checked');
say('self-test PASS batch files: plan checklist, page inventory, batch kind, gate per stage');
