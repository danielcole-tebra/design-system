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
    _status: 'IN PROGRESS — source-gate treatment amended for a read-only source set whose variantProperties also throw: the runner read program records the refusal instead of failing, the gate accepts the used variant by id and key with both errors quoted, self-tests and one read-only live proof',
    date: '2026-09-12',
    batchKind: 'repository',
    plan: 'figma-export/workflow-source-gate-variants-2026-09-12/plan.md',
    workstream: 'Workflow / source gate',
    executor: 'Claude Code (Claude Fable 5.1)',
    risk: {
      tier: 'low',
      assignedBy: 'Proposed by the planner (Claude Code, 2026-09-12) in figma-export/workflow-source-gate-variants-2026-09-12/plan.md; approved by the operator in chat the same day',
      operatorQuote: 'yes on low risk, go ahead for flowsheets resume',
      commissionQuote: 'relax the tooling, plan the workflow batch'
    },
    planAsProposed: 'figma-export/workflow-source-gate-variants-2026-09-12/plan.md, planned 2026-09-12 after the Flowsheets resume attempt recorded in npveRebuild_flowsheetsFinish_2026-09-11 (resumeAttempt_2026_09_12) and flag npveFlowsheets_sourceVariantPropertiesUnreadable_2026-09-12',
    scope: [
      'scripts/workflow/runner/plugin.js: snap reads each child variantProperties in its own try inside the definitions catch, saving variantPropertiesError with the exact text plus id, name, key, width, height; the node own variantProperties likewise; mutations still stop on an unreadable target set',
      'scripts/workflow/source-definitions.js: a variants-unreadable set (every child refused, uniform) is accepted when the control names the used variant by variant { id, key } with properties {}, quotes both errors equal to the readback, and the match is unique and equal to the mapped component; readable sets and every existing refusal unchanged',
      'scripts/workflow/validate-execution.js: touched only if the control shape needs it',
      'scripts/workflow/source-definitions-self-test.js and scripts/workflow/runner-plugin-self-test.js: accept and refuse cases for the variants-unreadable set; existing cases pass',
      'One read-only live proof: the amended read program against zVsuhYehoSLLq880qRBFkq set 129:6647, reply saved in this batch evidence folder; the Flowsheets folder untouched',
      'workflow/check-catalog.json sourceDefinitions text, workflow/README.md read-only source paragraph, module header comment; contract regenerated',
      'Report with startup accounting and the exact control shape the Flowsheets resume session writes'
    ],
    report: 'figma-export/workflow-source-gate-variants-2026-09-12/report.md',
    canvasChecks: 'Not applicable: repository-only batch',
    figmaMutations: [],
    flagsAdded: [],
    stopCondition: 'Repository-only plus one read-only source call; stop if the amended read program still throws on the real set, if an existing self-test can pass only by weakening a check, or if the change would need an edit to a DONE record, the store API, the execution policy text or risk ownership; the Flowsheets batch files are not touched',
    nextAction: 'Amend the read program, then the gate, then the self-tests; run the full DEFAULT_SELF_TESTS and the validator; live proof; documentation; report; close'
  }
});
console.log(`opened ${result.file} (${result.bytes} bytes, headroom ${result.headroom})`);
