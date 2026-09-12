// Opens the workflow_exampleBatch_2026-09-12 record. Usage: node apply-workflow-example-batch-2026-09-12.js
// Fill every TODO(...) before running: apply() refuses a body that still carries one.
const { apply } = require('./scripts/schema/record-scripts');

const id = 'workflow_exampleBatch_2026-09-12';
const result = apply({
  id,
  previous: ["workflow_recordScripts_2026-09-12"],
  workstream: 'workflow',
  date: '2026-09-12',
  createdBy: 'TODO(executor: model and harness, or the person)',
  body: {
    _status: 'IN PROGRESS — TODO(one line: what this batch builds or changes)',
    date: '2026-09-12',
    workstream: 'TODO(workstream label, e.g. Workflow / session economy or NPVE Rebuild / Sidesheets)',
    executor: 'TODO(executor: model and harness, or the person)',
    risk: {
      tier: 'TODO(low | medium | high | human-decision, assigned by the planner or operator, never by the executor)',
      assignedBy: 'TODO(who assigned the tier and where)',
      operatorQuote: 'TODO(the operator\'s commissioning statement, verbatim)'
    },
    planAsProposed: 'TODO(the plan as proposed, with the record that proposed it)',
    scope: [
      'TODO(one line per deliverable or file)'
    ],
    report: 'figma-export/workflow-example-batch-2026-09-12/report.md',
    canvasChecks: 'TODO(what is verified on the canvas, or: Not applicable: repository-only)',
    figmaMutations: [],
    flagsAdded: [],
    stopCondition: 'TODO(what stops the batch)',
    nextAction: 'TODO(the next step after this record opens)'
  }
});
console.log(`opened ${result.file} (${result.bytes} bytes, headroom ${result.headroom})`);
