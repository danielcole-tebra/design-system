// Opens the npveRebuild_demoPlanInventory_2026-09-12 record. Usage: node apply-npve-rebuild-demo-plan-inventory-2026-09-12.js
// Fill every TODO(...) before running: apply() refuses a body that still carries one.
const { apply } = require('./scripts/schema/record-scripts');

const id = 'npveRebuild_demoPlanInventory_2026-09-12';
const result = apply({
  id,
  previous: ["npveRebuild_flowsheetsFinish_2026-09-11"],
  workstream: 'npve',
  date: '2026-09-12',
  createdBy: 'demo',
  body: {
    _status: 'IN PROGRESS — TODO(one line: what this batch builds or changes)',
    date: '2026-09-12',
    batchKind: 'figma',
    plan: 'figma-export/workflow-plan-inventory-2026-09-12/scaffold-demo/evidence/plan.md',
    inventory: 'figma-export/workflow-plan-inventory-2026-09-12/scaffold-demo/evidence/inventory.json',
    workstream: 'TODO(workstream label, e.g. Workflow / session economy or NPVE Rebuild / Sidesheets)',
    executor: 'demo',
    risk: {
      tier: 'TODO(low | medium | high | human-decision, assigned by the planner or operator, never by the executor)',
      assignedBy: 'TODO(who assigned the tier and where)',
      operatorQuote: 'TODO(the operator\'s commissioning statement, verbatim)'
    },
    planAsProposed: 'TODO(the plan as proposed, with the record that proposed it)',
    scope: [
      'TODO(one line per deliverable or file)'
    ],
    report: 'figma-export/workflow-plan-inventory-2026-09-12/scaffold-demo/evidence/report.md',
    canvasChecks: 'TODO(what is verified on the canvas, and the comparison render that shows it)',
    figmaMutations: [],
    flagsAdded: [],
    stopCondition: 'TODO(what stops the batch)',
    nextAction: 'TODO(the next step after this record opens)'
  }
});
console.log(`opened ${result.file} (${result.bytes} bytes, headroom ${result.headroom})`);
