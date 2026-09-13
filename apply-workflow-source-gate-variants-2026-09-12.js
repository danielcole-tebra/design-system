// Opens the workflow_sourceGateVariants_2026-09-12 record. Usage: node apply-workflow-source-gate-variants-2026-09-12.js
// Fill every TODO(...) before running: apply() refuses a body that still carries one.
const { apply } = require('./scripts/schema/record-scripts');

const id = 'workflow_sourceGateVariants_2026-09-12';
const result = apply({
  id,
  previous: ["workflow_flowsheetsResume_2026-09-12"],
  workstream: 'workflow',
  date: '2026-09-12',
  createdBy: 'Claude Code (Claude Fable 5.1)',
  body: {
    _status: 'IN PROGRESS — TODO(one line: what this batch builds or changes)',
    date: '2026-09-12',
    batchKind: 'repository',
    plan: 'figma-export/workflow-source-gate-variants-2026-09-12/plan.md',
    workstream: 'TODO(workstream label, e.g. Workflow / session economy or NPVE Rebuild / Sidesheets)',
    executor: 'Claude Code (Claude Fable 5.1)',
    risk: {
      tier: 'TODO(low | medium | high | human-decision, assigned by the planner or operator, never by the executor)',
      assignedBy: 'TODO(who assigned the tier and where)',
      operatorQuote: 'TODO(the operator\'s commissioning statement, verbatim)'
    },
    planAsProposed: 'TODO(the plan as proposed, with the record that proposed it)',
    scope: [
      'TODO(one line per deliverable or file)'
    ],
    report: 'figma-export/workflow-source-gate-variants-2026-09-12/report.md',
    canvasChecks: 'Not applicable: repository-only batch',
    figmaMutations: [],
    flagsAdded: [],
    stopCondition: 'TODO(what stops the batch)',
    nextAction: 'TODO(the next step after this record opens)'
  }
});
console.log(`opened ${result.file} (${result.bytes} bytes, headroom ${result.headroom})`);
