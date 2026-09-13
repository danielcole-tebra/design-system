// Closes the workflow_flowsheetsResume_2026-09-12 record. Usage: node finalize-workflow-flowsheets-resume-2026-09-12.js
// preflight() runs the validator, the ceilings and the self-tests first so the recorded evidence is measured;
// close() refuses a record over the ceiling before it becomes immutable, a changed risk tier, an open plan phase.
const { close, preflight } = require('./scripts/schema/record-scripts');

const id = 'workflow_flowsheetsResume_2026-09-12';
const evidence = 'figma-export/workflow-flowsheets-resume-2026-09-12';
const startup = require(`./${evidence}/startup-this-session.json`);
const batchF = require(`./${evidence}/startup-batch-f-reads.json`);
const validation = preflight();

const result = close(id, (record) => {
  const { done, remaining, stoppedAt, stopReason, ...kept } = record;
  return {
    ...kept,
    _status: 'DONE — a supported source-gate treatment for a read-only source set Figma cannot read (exact error, set identity and geometry, every variant, matched variant, marked control, flag), and resume-batch.js for a stopped item under the operator\'s quoted go-ahead; both with self-tests; repository-only, no Figma call.',
    outcome: 'The stopped Flowsheets state was committed alone first (5be9df8). Then: scripts/workflow/source-definitions.js states what the gate accepts when componentPropertyDefinitions throws on a read-only source set, validate-execution.js accepts a control marked "unreadable at source" only under those checks and only for the item\'s source file, the runner\'s read program quotes the exact error and reads the set, page, geometry and variants instead of failing, its plan validation accepts that record on a source read only, a mutation stops on an unreadable target set, and the live readback comparison is exact; the library component is verified exactly as before. scripts/workflow/resume-batch.js resumes a stopped item under the operator\'s quoted go-ahead, refusing anything else and writing nothing until every check passes; it checkpoints the record quoting the operator, sets the run active with a refreshed guard and baseline listing the appends since the start, returns the item to queued (what an active run shows today), reports the batch-files gate and regenerates the contract. Two self-tests (59 and 17 cases) join the thirteen preflight runs; the catalog, rules 16 and 9, the README, runner.md, CLAUDE.md and OPERATORS.md name the command and the treatment.',
    stopAndResume: {
      stoppedAt: stoppedAt || '2026-09-12',
      stopReason: stopReason || 'Operator asked to come to a stopping point',
      checkpoint: `${evidence}/checkpoint-stop.js`,
      resumedIn: 'the same session, at the operator\'s word',
      operatorResumeQuote: 'resume the work',
      note: 'Standing rule 16 says a stopped batch resumes in a fresh session; the operator chose to continue here. Recorded, no decision needed.'
    },
    implementation: [
      'scripts/workflow/source-definitions.js (new): MARKER, ERROR_RE, sameProperties, unreadableErrors, matchVariant, unreadableNodeErrors, flagNamesSet, unreadableControlErrors',
      'scripts/workflow/validate-execution.js: a control with definitions "unreadable at source" goes through unreadableControlErrors; every other control exactly as before',
      'scripts/workflow/runner/plugin.js: snap catches the definitions read and saves definitionsUnreadable (error, set with page and geometry, variants) and the variant\'s variantProperties; a mutation fails on an unreadable target node; validatePlan accepts definitionsUnreadable on a source read only',
      'scripts/workflow/resume-batch.js (new): resumeBatch(options, deps), summary, CLI; ACTIVE_ITEM_STATUS = queued; scripts/workflow/validate-manifest.js exports validateManifestData',
      'scripts/workflow/source-definitions-self-test.js (59 cases) and scripts/workflow/resume-batch-self-test.js (17 cases, scratch store and root); both in DEFAULT_SELF_TESTS of scripts/schema/record-scripts.js',
      'workflow/check-catalog.json: deterministic sourceDefinitions and batchResume (23 checks); workflow/rules.json: standing rule 16 and agent rule 9 name the resume command; workflow/README.md step 8, commands and component evidence; workflow/runner.md; CLAUDE.md rule 16 brief; OPERATORS.md; contract regenerated',
      `${evidence}/: plan.md, report.md, checkpoint-stop.js, startup-this-session.json, startup-batch-f-reads.json`
    ],
    sourceGate: {
      accepts: 'exact Figma error quoted (must name componentPropertyDefinitions); set id, name, type COMPONENT_SET, parentId, page { id, name }, width, height; every variant id, name, variantProperties; the used variant matched uniquely by properties and equal to the mapped component; control fileKey equal to the item\'s read-only source and never the target; flag in the register naming the set by id',
      refuses: 'the marker on the target or library file; a snapshot component that reads its definitions; a different error text; properties of another variant or of none; the set mapped instead of the variant; a missing or unknown flag or one not naming the set; an unmarked control without definitions, as before',
      liveUse: 'none this session; the read program ran on an in-memory double whose set throws the recorded error text. First live use is the Flowsheets resume, which reads the source fresh'
    },
    resumeCommand: {
      usage: 'node scripts/workflow/resume-batch.js <item-id> <executor> [provider] [model] [reasoning] --confirm="<operator go-ahead>"',
      requires: 'item and run stopped; record IN PROGRESS; execution.json valid at ready; risk lock unchanged; dependencies complete; no record that left IN PROGRESS changed since the start; quoted go-ahead',
      writes: 'record checkpoint (RESUMED, resumes[] quoting the operator) → run (active, refreshed storeFingerprint, schemaSha256 and preexistingFiles, resumes[] with the stop and the appends) → item (queued, resumes[] with the stop) → generate-contract',
      reports: 'the batch-files gate at open: refused for a record dated on or after 2026-09-12 with a plan problem, noted before it',
      flowsheets: 'refuses today: execution.json still carries the unresolved preflight failure. The resumed session reads the source fresh with the new program, rewrites the source control with the marker, clears the unresolved entry on that evidence, then runs the command with the operator\'s words'
    },
    validation: {
      ...validation,
      canvas: 'N/A — no Figma read or write; the read program ran only on the in-memory double',
      screenshots: 'N/A — repository-only batch; nothing rendered',
      batchFilesCli: `node scripts/workflow/batch-files.js ${id} open: PASS kind=repository plan=${evidence}/plan.md`,
      figmaCalls: 0,
      figmaMutations: 0,
      existingDoneRecordsEdited: 0
    },
    startupAccounting: {
      measuredBy: `scripts/workflow/measure-startup.js, output in ${evidence}/startup-this-session.json; the calls before this batch's first write in ${evidence}/startup-batch-f-reads.json`,
      callsBeforeFirstTaskAction: startup.beforeFirstTaskAction.calls,
      resultBytesBeforeFirstTaskAction: startup.beforeFirstTaskAction.resultBytes,
      firstTaskAction: startup.firstTaskAction,
      callsBeforeFirstBatchFWrite: batchF.callsBeforeFirstBatchFWrite,
      resultBytesBeforeFirstBatchFWrite: batchF.resultBytesBeforeFirstBatchFWrite,
      note: 'By the tool\'s definition the first task action was the Flowsheets commit the operator asked for first (call 4): 3 calls before it. This batch\'s first write was call 35: 34 calls, 444,048 bytes, of which calls 1 to 4 (20,760) were the lean start and that commit, and calls 5 to 34 (423,288) the tooling the approved work changes, named in the report per rule 16: the batch scripts, the runner, the validators, the store library, the record scripts, the scaffold, the self-tests, rules.json in full (edited), the Batch E pair, plan, record and report as the template, the Flowsheets execution, blocker, run and record. Over the target because the tooling reads were the work, as in Batches D and E; the report names three avoidable costs.'
    },
    findings: { GAP: 0, DEFECT: 0, DECISION: 3 },
    decisionsForOperator: [
      'Resumed in the same session at the operator\'s word ("resume the work") after a STOPPED checkpoint; rule 16 says a fresh session. Recorded, no decision needed.',
      'resume-batch refuses when a record that has left IN PROGRESS changed or disappeared while stopped, and only reports a change to another batch\'s open record, a foundation section or a flag; check-batch still refuses any record change inside the run window. Confirm the split, or ask that the resume refuse on any change.',
      'After a resume the item shows queued, what an active run\'s item shows today. Showing active for a running item would change start-batch as well; a planner decision.'
    ],
    deferred: [],
    carryOver: 'The Flowsheets batch is stopped exactly as committed in 5be9df8. The weekly milestone tag is due by 2026-09-18.',
    standingBatchRules: 'N/A for this repository-only workflow batch; the ten Figma rules are unchanged and still required for design batches.',
    nextAction: 'Fresh session, the Flowsheets finish batch: read the source set fresh with the new read program, rewrite the source control marked "unreadable at source" with the exact error, the flag and the matched variant, clear the unresolved entry on that evidence, then node scripts/workflow/resume-batch.js npve-flowsheets-finish <executor> --confirm="<operator go-ahead>" and continue through check-batch before each mutation.'
  };
});
console.log(`finalized ${result.file} (${result.bytes} bytes, headroom ${result.headroom}); ${result.status}`);
