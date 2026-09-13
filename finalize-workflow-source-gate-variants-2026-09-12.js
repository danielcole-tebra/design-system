// Closes the workflow_sourceGateVariants_2026-09-12 record. Usage: node finalize-workflow-source-gate-variants-2026-09-12.js
// preflight() runs the validator, the ceilings and the self-tests first so the recorded evidence is measured;
// close() refuses a record over the ceiling before it becomes immutable, and a changed risk tier.
const { close, preflight } = require('./scripts/schema/record-scripts');

const id = 'workflow_sourceGateVariants_2026-09-12';
const evidence = 'figma-export/workflow-source-gate-variants-2026-09-12';
const validation = preflight();

const result = close(id, (record) => ({
  ...record,
  _status: 'DONE — TODO(one line: what is now in place)',
  outcome: 'TODO(what changed, in plain language, for the operator)',
  implementation: [
    'TODO(one line per file: what it does now)'
  ],
  validation: {
    ...validation,
    canvas: 'N/A — no Figma read or write',
    screenshots: 'N/A — repository-only batch; nothing rendered',
    figmaCalls: 0,
    figmaMutations: 0,
    existingDoneRecordsEdited: 0
  },
  startupAccounting: {
    measuredBy: 'scripts/workflow/measure-startup.js, output in ' + evidence + '/startup-this-session.json',
    callsBeforeFirstTaskAction: 'TODO(number)',
    resultBytesBeforeFirstTaskAction: 'TODO(number)',
    note: 'TODO(what the pre-task calls read, by scoped projection)'
  },
  findings: { GAP: 0, DEFECT: 0, DECISION: 0 },
  decisionsForOperator: [],
  deferred: [],
  nextAction: 'TODO(the next batch, in a fresh session)'
}));
console.log(`finalized ${result.file} (${result.bytes} bytes, headroom ${result.headroom}); ${result.status}`);
