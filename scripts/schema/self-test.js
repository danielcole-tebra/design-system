// Dry-run record write/read cycle against a scratch copy of the store. Never touches the real store.
// Usage: node scripts/schema/self-test.js [scratchDir]
const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const REAL_ROOT = path.resolve(__dirname, '..', '..');
const scratch = process.argv[2] ? path.resolve(process.argv[2]) : fs.mkdtempSync(path.join(os.tmpdir(), 'tebra-store-'));
for (const dir of ['foundation', 'records', 'flags', 'indexes']) fs.cpSync(path.join(REAL_ROOT, dir), path.join(scratch, dir), { recursive: true });
fs.copyFileSync(path.join(REAL_ROOT, 'design-system-schema.json'), path.join(scratch, 'design-system-schema.json'));

process.env.TEBRA_STORE_ROOT = scratch;
const lib = require('./lib');
const log = [];
const say = (line) => { log.push(line); console.log(line); };
say(`scratch store at ${scratch}`);

const before = lib.generate();
say(`loaded ${before.recordIndex.counts.records} records, ${before.recordIndex.flags.active}+${before.recordIndex.flags.resolved} flags; fresh=${lib.checkFreshness(before).length === 0}`);
const previous = before.store.records.at(-1).id;
const started = lib.fingerprint(before.store, 'dryRun_record_2026-09-08');

// 1. open: gate on the previous record, append a new file, regenerate
const file = lib.openRecord({ id: 'dryRun_record_2026-09-08', previous, workstream: 'workflow', date: '2026-09-08', createdBy: 'self-test', script: 'scripts/schema/self-test.js', body: { _status: 'IN PROGRESS — dry run', date: '2026-09-08', workstream: 'Workflow / self-test' } });
assert.strictEqual(file, 'records/workflow/2026-09-08/dryRun_record_2026-09-08.json');
say(`opened ${file}`);
const afterOpen = lib.generate();
assert.strictEqual(afterOpen.recordIndex.counts.records, before.recordIndex.counts.records + 1, 'index gained one record');
assert.strictEqual(lib.checkFreshness(afterOpen).length, 0, 'generated files fresh after open');
assert.deepStrictEqual(afterOpen.currentState.recordGate.inProgress, ['dryRun_record_2026-09-08'], 'gate sees the open record');
assert.throws(() => lib.openRecord({ id: 'dryRun_record_2026-09-08', previous, date: '2026-09-08', body: {} }), /already exists/, 'duplicate id refused');
assert.throws(() => lib.openRecord({ id: 'dryRun_second_2026-09-08', previous: 'dryRun_record_2026-09-08', date: '2026-09-08', body: {} }), /Record gate failed/, 'gate refuses while previous is IN PROGRESS');
say('gate: duplicate refused; second record refused while the first is IN PROGRESS');

// 2. read back through the aggregate and through the store
const aggregate = JSON.parse(fs.readFileSync(path.join(scratch, 'design-system-schema.json'), 'utf8'));
assert.strictEqual(aggregate['dryRun_record_2026-09-08']._status, 'IN PROGRESS — dry run', 'aggregate carries the new record');
assert.strictEqual(Object.keys(aggregate).at(-1), 'dryRun_record_2026-09-08', 'new record is the last aggregate key');
const env = lib.findRecord(lib.loadStore(), 'dryRun_record_2026-09-08');
assert.strictEqual(env.sequence, before.recordIndex.counts.nextRecordSequence, 'sequence continues the aggregate order');
say(`read back: sequence ${env.sequence}, aggregate key order preserved`);

// 3. flags append + resolve
lib.appendFlags([{ id: 'dryRun_flag', severity: 'note', summary: 'dry run', handling: 'Reported.' }]);
let idx = lib.readRecordIndex();
assert.ok(idx.flags.activeIds.includes('dryRun_flag'), 'flag appended to active');
lib.resolveFlag('dryRun_flag', { resolution: 'Resolved in the dry run.' });
idx = lib.readRecordIndex();
assert.ok(idx.flags.resolvedIds.includes('dryRun_flag') && !idx.flags.activeIds.includes('dryRun_flag'), 'flag moved to resolved');
assert.strictEqual(idx.flags.total, before.recordIndex.flags.total + 1);
say('flags: appended to active.json, resolved into resolved.json, sequence kept');

// 4. concurrency fingerprint tolerates the batch's own appends and catches edits
let cmp = lib.compareFingerprint(started, lib.loadStore(), 'dryRun_record_2026-09-08');
assert.deepStrictEqual(cmp.errors, [], 'appends are not violations');
assert.deepStrictEqual(cmp.additions.flags, ['dryRun_flag']);
const victim = lib.loadStore().records[0];
const victimText = fs.readFileSync(path.join(scratch, victim.file), 'utf8');
fs.writeFileSync(path.join(scratch, victim.file), victimText.replace('"record": {', '"record": {\n  "_tampered": true,'));
cmp = lib.compareFingerprint(started, lib.loadStore(), 'dryRun_record_2026-09-08');
assert.ok(cmp.errors.some((e) => e.includes(victim.id) && e.includes('immutable')), 'edit to an old record is caught');
fs.writeFileSync(path.join(scratch, victim.file), victimText);
say('fingerprint: own appends tolerated; an edit to an older record is caught');

// 5. finalize once, then frozen
lib.finalizeRecord('dryRun_record_2026-09-08', (record) => { record._status = 'DONE. Dry run.'; return record; });
assert.throws(() => lib.finalizeRecord('dryRun_record_2026-09-08', (r) => r), /immutable/, 'DONE record cannot be rewritten');
assert.strictEqual(lib.generate().currentState.recordGate.clear, true, 'gate clear after finalize');
say('finalize: IN PROGRESS -> DONE once; second finalize refused as immutable');

// 6. freshness catches a hand edit to the aggregate
fs.appendFileSync(path.join(scratch, 'design-system-schema.json'), '\n');
assert.deepStrictEqual(lib.checkFreshness(), ['design-system-schema.json'], 'stale aggregate detected');
lib.writeGenerated();
assert.deepStrictEqual(lib.checkFreshness(), [], 'rebuild restores freshness');
say('freshness: hand edit to the aggregate detected and repaired by rebuild');

// 7. the real store was not touched
const realStatus = execFileSync('git', ['status', '--porcelain', '--', 'records', 'flags', 'indexes', 'design-system-schema.json'], { cwd: REAL_ROOT, encoding: 'utf8' });
say(`real store untouched by this run: ${realStatus.trim() === '' ? 'yes (clean)' : 'working tree already had changes; compare digests instead'}`);
say('self-test PASS store write/read cycle: open, gate, read back, flags, fingerprint, finalize, immutability, freshness');
fs.writeFileSync(path.join(scratch, 'self-test.log'), `${log.join('\n')}\n`);
