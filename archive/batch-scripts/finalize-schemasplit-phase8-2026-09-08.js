// Finalizes schemasplit_phase8_2026-09-08 after steps 4-7. The record was opened by
// apply-schemasplit-phase8-2026-09-08.js as the first file in records/; this closes it through finalizeRecord
// (only an IN PROGRESS record can be rewritten) and regenerates the aggregate and indexes. No Figma writes.
const fs = require('fs');
const { execFileSync } = require('child_process');
const store = require('./scripts/schema/lib');

const ID = 'schemasplit_phase8_2026-09-08';
const DIR = 'figma-export/schema-split-phase8-2026-09-08';
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).trim();
const commitFor = (subject) => git('log', '--format=%h', '-1', `--grep=${subject}`, '--fixed-strings');
const commit1 = commitFor('adopt append-only records (1/3)');
const commit2 = commitFor('adopt append-only records (2/3)');
if (!commit1 || !commit2) throw new Error('commits 1/3 and 2/3 must exist before finalizing');
const validatorLog = fs.readFileSync(`${DIR}/validator-suite.log`, 'utf8');
const dryRunLog = fs.readFileSync(`${DIR}/dry-run-store-cycle.log`, 'utf8');
if (!/workflow PASS/.test(validatorLog) || !/self-test PASS store write\/read cycle/.test(dryRunLog)) throw new Error('step 4 evidence does not show PASS; the batch stops');

store.finalizeRecord(ID, (r, loaded) => {
  r._status = 'DONE. Monolithic design-system-schema.json split into an append-only record store: 91 records migrated verbatim to records/<workstream>/<date>/<id>.json, 285 flags split 227 active / 58 resolved, 13 foundation sections to foundation/; the aggregate regenerated from the store is byte-identical to the pre-split original with zero count deltas; record gate, contract, freshness digests, validate-record and batch guards read the store; docs updated; backup policy surfaced for the operator, not changed. This record is the first written into the new structure.';
  r.step4_tooling = {
    commit: commit2,
    recordGate: 'openRecord in scripts/schema/lib.js refuses a new record file while the previous record in the workstream is not DONE in indexes/record-index.json; start-batch.js refuses while the item\'s own record file is not IN PROGRESS; finalizeRecord refuses any record whose status has left IN PROGRESS (immutability).',
    contract: 'generate-contract.js v3 refuses a stale aggregate, digests indexes/record-index.json, indexes/current-state.json, flags/active.json, flags/resolved.json and foundation/layout.json alongside the aggregate and instruction files, reads recent records from the index and open flags from flags/active.json, and carries a recordStore section with the concurrency line.',
    freshness: 'scripts/schema/validate-split.js: store structure, generated files equal what the store generates now (line endings normalised), every record committed as non-IN PROGRESS unchanged against HEAD indexes/record-index.json, no record or flag removed. validate-contract.js and validate-workflow.js run it first.',
    validateRecord: 'reads the record file through the store and the standing rules from foundation/standingBatchRules.json; all six completed manifest items re-validate (record and evidence PASS).',
    batchGuards: 'start-batch.js stores a per-record/per-flag fingerprint of everything the batch does not own; check-batch.js and finish-batch.js compare it: another batch\'s appended record file or flag is reported as an addition, any change to something present at start is a violation. The owned record file, the flag stores and the generated files are implicitly allowed by the finish allowlist.',
    applyScriptConvention: 'apply-*.js opens the record with openRecord (backup first while the backup rule stands); finalize-*.js closes it with finalizeRecord; new findings through appendFlags, resolutions through resolveFlag; every write regenerates design-system-schema.json and indexes/, which are committed with the record. Exemplar: apply-schemasplit-phase8-2026-09-08.js / finalize-schemasplit-phase8-2026-09-08.js.',
    lineEndings: '.gitattributes pins records/, flags/, foundation/, indexes/, design-system-schema.json, workflow/*.json and scripts/**/*.js to LF so content digests and freshness do not flip on checkout; the index carries content digests only.',
    validatorSuite: `${DIR}/validator-suite.log — validate-split PASS (91 records immutable against HEAD), validate-workflow PASS, workflow self-test PASS, validate-record + validate-evidence PASS for all six manifest items, build-aggregate --check fresh`,
    dryRun: `${DIR}/dry-run-store-cycle.log — on a scratch copy of the store: open (gate on the previous record), duplicate refused, second record refused while the first is IN PROGRESS, read back through the aggregate (last key, sequence 91) and the store, flag appended then resolved with sequence kept, fingerprint tolerates own appends and catches an edit to an older record, finalize IN PROGRESS→DONE once then refused as immutable, hand edit to the aggregate detected and repaired by rebuild`,
    legacyScripts: 'the 90 historical apply-/finalize-/amend- scripts still write the aggregate directly; they are history and must not be re-run. Their records were migrated; any new batch uses the store API.'
  };
  r.step5_backupPolicy = {
    status: 'SURFACED, NOT DECIDED — standing rule 7 (backup before every batch) stands; this batch took its full backup the old way.',
    question: 'Replace the per-batch full-schema backup (design-system-schema.backup-<date>-pre-<batch>.json, 1.4 MB each, 89 files today) with immutable records + git + generated-aggregate verification + milestone snapshots?',
    options: [
      { option: 'A — keep per-batch full backups (status quo)', tradeoffs: 'Zero policy change and the recovery path every past record describes. Cost: 1.4 MB per batch that grows with the register, 89 near-duplicate files already in the root, and the backup copies the generated aggregate rather than the store, so it no longer protects the thing that is edited.' },
      { option: 'B — immutable records + git + milestone snapshots (the plan\'s proposal)', tradeoffs: 'Recovery becomes git (every record file is committed and never rewritten; validate-split refuses a changed DONE record) plus a tagged snapshot at milestones (e.g. schema-split-baseline-2026-09-08) instead of a copy per batch. Cost: recovery depends on committing at batch close (OPERATORS.md already requires it); an uncommitted working tree has no backup until the record is committed; the standing rule 7 text and every apply script template change.' },
      { option: 'C — per-batch backup of the store instead of the aggregate (transitional)', tradeoffs: 'Keeps a backup per batch but of what is actually edited: a zip or a tagged commit of records/, flags/, foundation/ before each batch. Cost: still one artefact per batch; a tag is only useful if committed; a zip is not diffable.' }
    ],
    recommendation: 'B with a milestone tag at every commit that closes a batch (the finish gate could create it), after the operator confirms; until then A stands.',
    decisionOwner: 'Daniel (operator) — changes standing rule 7 and agent rule 7',
    whatChangesIfB: ['workflow/rules.json agentRules 7 and recordGate text', 'CLAUDE.md Recording section', 'the apply-*.js template (drop the copyFileSync step)', 'this decision recorded in its own record; no migrated record is edited']
  };
  r.step6_docs = {
    contract: 'workflow/npve-contract.generated.json v3: recordStore section (layout, concurrency line, howToRecord, readRecord), currentState projection, store digests.',
    concurrencyLine: 'Concurrent batches write separate record files and never touch shared files except the generated indexes, which regenerate at commit.',
    files: ['CLAUDE.md (Where truth lives, Lean startup, Recording)', 'AGENTS.md (register sentence, authority sentence)', 'OPERATORS.md ("The record store is the memory", commit line)', 'workflow/README.md (store paragraph, steps 3-5 and 7, commands)', 'workflow/rules.json (purpose, recordGate, agent rules 1 and 7 with sourceRecord ' + ID + ')', 'workflow/check-catalog.json (recordCompleteness, freshness, concurrency, citations, immutability)', 'foundation/meta.json register pointer (the pointer from the legacy aggregate to the store; the one foundation edit in this batch, made after step 3 proved equivalence)'],
    qualification: 'flags/active.json is the one shared file a batch may append to (appendFlags) besides the generated files; the guards treat an appended flag as an addition. Reported here rather than resolved: if the operator wants flags to be record-embedded and projected, that is a follow-up.'
  };
  r.step7_commits = {
    naming: 'per the plan\'s commit sequence item 5, "Workflow: adopt append-only records", in three parts',
    commit1: `${commit1} — (1/3) snapshot, migrate, prove the aggregate`,
    commit2: `${commit2} — (2/3) point the gates, contract, and validators at the store`,
    commit3: '(3/3) docs, contract line, Phase 8 record — the commit carrying this DONE record; hash reported in the chat reply and report',
    tag: 'schema-split-baseline-2026-09-08 at 3f9c01f'
  };
  r.reconciliation = {
    records: { before: 91, after: loaded.records.length, note: 'after includes this record' },
    flags: { before: { active: 227, resolved: 58, total: 285 }, after: { active: loaded.flags.active.entries.length, resolved: loaded.flags.resolved.entries.length, total: loaded.flags.active.entries.length + loaded.flags.resolved.entries.length } },
    diff: 'regenerated aggregate byte-identical to the pre-split original at step 3 (cmp identical; reconciliation.json PASS, all deltas 0); after step 3 the aggregate differs only by this record and the meta.register pointer, both deliberate'
  };
  r.decisionsForOperator = ['Backup policy (step 5): A keep per-batch full backups, B immutable records + git + milestone snapshots (recommended), or C per-batch backup of the store. Until decided, A stands and every apply script keeps copying the aggregate first.'];
  r.findings = { GAP: 0, DEFECT: 0, DECISION: 1, PROCESS: 0 };
  r.flagsAfter = { active: loaded.flags.active.entries.length, resolved: loaded.flags.resolved.entries.length, total: loaded.flags.active.entries.length + loaded.flags.resolved.entries.length };
  r.flagsAdded = [];
  r.screenshots = [];
  r.screenshotsNote = 'Repo-only batch; no Figma render exists to inspect. Evidence is the reconciliation JSON, the validator and dry-run logs, and the byte comparison.';
  r.figmaMutations = [];
  return r;
});
console.log('finalized', ID, '| commits', commit1, commit2, '| aggregate and indexes regenerated');
