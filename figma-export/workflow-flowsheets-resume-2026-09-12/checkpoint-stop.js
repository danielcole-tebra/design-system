// Checkpoints the workflow_flowsheetsResume_2026-09-12 record at the operator's stop ("come to a stopping point").
// The record stays IN PROGRESS; a fresh session resumes from this record, plan.md and the files named here.
const { checkpoint } = require('../../scripts/schema/record-scripts');
const id = 'workflow_flowsheetsResume_2026-09-12';
const result = checkpoint(id, (record) => ({
  ...record,
  _status: 'IN PROGRESS — STOPPED by the operator after the Flowsheets stopped-state commit and the first module; resumes in a fresh session',
  stoppedAt: '2026-09-12',
  stopReason: 'Operator asked to come to a stopping point',
  done: [
    'Commit 5be9df8: the stopped Flowsheets state alone (record, apply script, evidence folder, flag and manifest edits); nothing else',
    'Record scaffolded and opened through the templated scripts with plan.md (phases 1 and 2 checked)',
    'scripts/workflow/source-definitions.js written (MARKER, unreadableErrors, unreadableNodeErrors, matchVariant, flagNamesSet, unreadableControlErrors); loads; not yet wired or tested'
  ],
  remaining: [
    'validate-execution.js: accept a control marked "unreadable at source" only through unreadableControlErrors (source file only; target and library exactly as today)',
    'runner/plugin.js: read program quotes the exact error and reads set, page, geometry and variants on a source read; mutation refuses an unreadable target; validatePlan accepts the record on a source read only',
    'resume-batch.js (new) with validate-manifest.js exporting validateManifestData: item and run stopped, record IN PROGRESS, execution.json valid at ready, quoted go-ahead; run active with refreshed fingerprint and baseline listing appends since start; item back to queued (what an active run shows today); record checkpoint through record-scripts quoting the operator; batch-files gate at open reported; contract regenerated',
    'source-definitions-self-test.js and resume-batch-self-test.js (new), added to DEFAULT_SELF_TESTS in record-scripts.js',
    'check-catalog.json (sourceDefinitions, batchResume); rules.json standing rule 16 and agent rule 9; workflow/README.md, workflow/runner.md, CLAUDE.md rule 16 brief, OPERATORS.md; contract regenerated; report with startup accounting; finalize; one commit'
  ],
  nextAction: 'Fresh session: lean start, then continue from remaining[0]; the design for every remaining item is stated in remaining[] and plan.md, no re-reading of the tooling beyond the files being edited.'
}));
console.log(`checkpointed ${result.file} (${result.bytes} bytes, headroom ${result.headroom})`);
