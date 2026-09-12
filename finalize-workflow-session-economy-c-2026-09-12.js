// Closes the Batch C record. Runs the validator and the self-tests first so the recorded evidence is measured.
// Usage: node finalize-workflow-session-economy-c-2026-09-12.js
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { finalizeRecord } = require('./scripts/schema/lib');

const id = 'workflow_sessionEconomyC_2026-09-12';
const evidence = 'figma-export/workflow-session-economy-c-2026-09-12';
const run = (script) => execFileSync('node', [script], { cwd: __dirname, encoding: 'utf8' }).trim().split(/\r?\n/);
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(__dirname, file), 'utf8'));

const validator = run('scripts/workflow/validate-workflow.js').at(-1);
const ceilings = run('scripts/workflow/validate-ceilings.js')[0];
const selfTests = ['scripts/workflow/self-test.js', 'scripts/workflow/runner-self-test.js', 'scripts/workflow/execution-self-test.js', 'scripts/workflow/runner-plugin-self-test.js', 'scripts/workflow/target-identity-self-test.js']
  .map((script) => { run(script); return `${script}: exit 0`; });
const packet = readJson(`${evidence}/packet-v2/context-measurement.json`);
const startup = readJson(`${evidence}/startup-this-session.json`);
const audited = ['84ff42db', 'fde5980a', '9740bfa7', '6a891562', 'e7e2148b'].map((session) => {
  const s = readJson(`${evidence}/evidence/startup-${session}.json`);
  return { session, calls: s.beforeFirstTaskAction.calls, resultChars: s.beforeFirstTaskAction.resultChars, resultBytes: s.beforeFirstTaskAction.resultBytes };
});

const file = finalizeRecord(id, (record) => ({
  ...record,
  _status: `DONE — runner packet version 2 references rules, flags and CLAUDE.md instead of copying them (${packet.packetBytes} bytes for the stopped Flowsheets item against 128,480 at version 1); byte ceilings in workflow/check-catalog.json enforced by validate-ceilings.js and shown on the validator line; measure-startup.js reproduces the audit's five pre-task counts; repository-only.`,
  outcome: 'The three Batch C deliverables are in place. The runner packet no longer carries the contract rule sections, the NPVE rules, the selected flag entries or CLAUDE.md; it references them by path with the digests already in its sources, so the reader uses the digest-checked contract it holds from the lean start. The validator enforces byte ceilings on the startup files and prints the worst-case lean set against its ceiling on every run. measure-startup.js reads the session transcript and reports the calls and result bytes before the first task action, the number standing rule 16 requires in every report.',
  implementation: [
    'scripts/workflow/runner/handoff.js: packet version 2; references {rules, npveRules, flags (ids), instructions}; generation fails above byteCeilings.runnerPacket; verify() reports the packet version',
    'scripts/workflow/validate-ceilings.js (new): ceilings(), leanSet(), validateCeilings(); CLI prints the lean-set parts',
    'scripts/workflow/validate-workflow.js: runs validateCeilings and prints lean=<bytes>/<ceiling> and doneOverCeiling=<ids> on the PASS line',
    'scripts/workflow/measure-startup.js (new): --session, --all, --json, --out; the audit\'s first-task-action definition',
    'workflow/check-catalog.json: byteCeilings section; deterministic.byteCeilings (18 deterministic checks)',
    'CLAUDE.md: one sentence in the lean startup section naming the ceilings and measure-startup.js',
    'workflow/runner.md and workflow/README.md: packet version 2 contents and the ceilings',
    'workflow/npve-contract.generated.json: regenerated (CLAUDE.md digest and store digests)',
    `${evidence}/: report.md, startup-this-session.json, packet-v2/ (handoff.json, context-measurement.json), evidence/ (five audited sessions, all-sessions listing, edit-docs.js)`
  ],
  ceilings: {
    source: 'workflow/check-catalog.json → byteCeilings',
    files: { 'CLAUDE.md': 16000, 'workflow/npve-contract.generated.json': 100000, 'indexes/current-state.json': 4000 },
    manifestItem: 16000,
    record: { bytes: 32000, appliesFrom: '2026-09-12', inProgress: 'fail', done: 'report on the validator line' },
    runnerPacket: 64000,
    leanSet: 128000,
    measuredAtAdoption: { 'CLAUDE.md': 11974, contract: 76019, largestManifestItem: 'npve-family-history-edit 13,057', currentState: 1981, largestLatestRecord: 'npveRebuild_flowsheetsFinish_2026-09-11 8,302', leanSet: 111333, recordsSince2026_09_08: 'max 21,313 (npveRebuild_allergiesEdit_2026-09-09), median 7,723' },
    rationale: 'Each ceiling sits 25 to 50 percent above the largest current value, so a breach means bulk moved into a startup file rather than normal growth. A DONE record cannot be repaired, so it is reported; the hard stop before a record becomes immutable belongs in Batch D\'s templated finalize helper, since the store API was out of scope here.'
  },
  packet: {
    item: 'npve-flowsheets-finish (stopped; generated from the working tree, whose manifest.json and flags/active.json carry that batch\'s uncommitted changes)',
    version1Bytes: 128480,
    version2Bytes: packet.packetBytes,
    ceilingBytes: packet.packetCeilingBytes,
    prettyVersusCompact: { beforeBytes: packet.beforeBytes, afterBytes: packet.afterBytes, reductionPercent: packet.reductionPercent },
    dropped: ['rules 32,510 bytes (twelve contract sections)', 'flags 36,242 (full entries)', 'claudeInstructions 11,289', 'npveRules 5,179', 'flagsSelection 205'],
    kept: 'controls 18,918; selectedRecord 7,651; checkpoint 6,409; item 3,885; references 3,049 (51 flag ids); dependencies 1,924; appearance 1,560; sources 1,310; exactApproval, nextAction, evidencePolicy, use',
    verify: 'verify-handoff on the version 2 packet: freshLocalSources true, packetVersion 2'
  },
  measureStartup: {
    definition: 'First task action = first Write, Edit, MultiEdit, NotebookEdit, use_figma, create_new_file, upload_assets, generate_figma_design or Agent call, or a shell command running an apply-/finalize- script or git commit (the token audit\'s definition).',
    reproducesAudit: audited,
    auditCharsForComparison: { '84ff42db': 178112, fde5980a: 154153, '9740bfa7': 249800, '6a891562': 26421, e7e2148b: 50775 },
    thisSession: startup.beforeFirstTaskAction
  },
  validation: {
    workflowBeforeFinalize: validator,
    ceilingsBeforeFinalize: ceilings,
    selfTests,
    schemaSelfTest: 'Fails while this record is IN PROGRESS: the dry run opens a record after the latest workflow record and the gate refuses. Re-run after finalize; result in the report.',
    canvas: 'N/A — no Figma read or write',
    screenshots: 'N/A — tooling and record changes only',
    figmaCalls: 0,
    existingDoneRecordsEdited: 0
  },
  startupAccounting: {
    callsBeforeFirstTaskAction: startup.beforeFirstTaskAction.calls,
    resultBytesBeforeFirstTaskAction: startup.beforeFirstTaskAction.resultBytes,
    firstTaskAction: startup.firstTaskAction,
    measuredBy: 'scripts/workflow/measure-startup.js (this batch), output in startup-this-session.json',
    note: 'Calls 1 and 2 (32,598 bytes) were the lean set by projection: validator line, memory note, current-state, rule 16 and the contract key sizes, the manifest item list, the batch A record. Calls 3 to 8 (65,762 bytes) opened the tooling the approved work changes, named per rule 16: runner/handoff.js, validate-workflow.js, validate-contract.js, workflow/lib.js, measure-context.js, the openRecord/finalizeRecord lines and export list of scripts/schema/lib.js, the runner self-test greps, check-catalog.json, self-test.js, the token-audit parsers analyze2/3/4.js, two sections of token-audit.md, the head of the batch A report, generate-contract.js sources, runner.md and README.md greps, the transcript record shape and current file sizes. One over-batched call (call 3) was truncated and cost a partial re-read in call 5; the manifest projection in call 2 printed every item\'s risk block and could have been a fifth the size.'
  },
  findings: { GAP: 0, DEFECT: 0, DECISION: 3 },
  decisionsForOperator: [
    'Ceiling values: set by the executor as tooling parameters with 25 to 50 percent headroom over the largest current file (see ceilings.measuredAtAdoption). Retuning is a catalog edit with a record.',
    'DONE records over the record ceiling are reported on the validator line, not failed, because they are immutable. The hard stop before finalize needs either the store API or Batch D\'s templated finalize helper; confirm it goes to Batch D.',
    'Carry-over: the stopped Flowsheets batch (2026-09-11) still holds untracked files and uncommitted edits to flags/active.json and manifest.json; preserved, not committed. This commit\'s regenerated indexes and contract digest that working tree, so a fresh clone fails validation until those files are committed (same as batch A).'
  ],
  deferred: [
    'Batch D: templated record scripts (apply/finalize helpers that check the record ceiling before writing) and shared Figma helpers',
    'Batch E: durable plan.md and inventory.json per batch'
  ],
  standingBatchRules: 'N/A for this repository-only workflow batch; the ten Figma rules are unchanged and still required for design batches.',
  nextAction: 'Batch D in a fresh session: templated record scripts and shared Figma helpers; the finalize template enforces the record ceiling before the record becomes immutable.'
}));
console.log(`finalized ${file}`);
