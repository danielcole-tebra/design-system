// Opens the workflow_planInventory_2026-09-12 record. Usage: node apply-workflow-plan-inventory-2026-09-12.js
// Scaffolded by scripts/schema/new-record-scripts.js; apply() refuses a body or a plan that still carries a TODO.
const { apply } = require('./scripts/schema/record-scripts');

const id = 'workflow_planInventory_2026-09-12';
const evidence = 'figma-export/workflow-plan-inventory-2026-09-12';
const result = apply({
  id,
  previous: ['workflow_recordScripts_2026-09-12'],
  workstream: 'workflow',
  date: '2026-09-12',
  createdBy: 'Claude Fable 5.1 (Claude Code desktop)',
  body: {
    _status: 'IN PROGRESS — durable plan.md and inventory.json per batch: the planner\'s phase checklist required by every gate, a Figma batch\'s page inventory with reverification before the first write, both in the scaffold, with self-tests',
    date: '2026-09-12',
    batchKind: 'repository',
    plan: `${evidence}/plan.md`,
    workstream: 'Workflow / session economy',
    executor: 'Claude Fable 5.1 (Claude Code desktop)',
    risk: {
      tier: 'low',
      assignedBy: 'Repository-only tooling work, the last of the batches deferred by workflow_sessionEconomy_2026-09-12 (batches A, C and D ran at tier low, accepted by the operator); commissioned by the operator in chat at session start. The executor did not change the tier.',
      operatorQuote: 'Batch E: durable plan.md and inventory.json per batch. The planner writes its phase checklist to figma-export/<batch>/plan.md, required for every batch by the finish gate. A Figma batch saves its page inventory to figma-export/<batch>/inventory.json on the first walk; later checks read that file to choose what to look at and re-verify the nodes they will mutate by id, name, type and parent before the first write, never treating the file as evidence (rule 3). inventory.json is required by the finish gate for Figma batches and absent for repository-only ones. Add both to the scaffold, with self-tests. Lean start.'
    },
    planAsProposed: 'Batch E (nextAction of workflow_recordScripts_2026-09-12 and the deferred item of that record): durable plan.md and inventory.json per batch, in the scaffold, with self-tests.',
    scope: [
      'scripts/workflow/batch-files.js (new): validatePlan, validateInventory, batchKind and validateBatchFiles per stage (open, checkpoint, mutation, close, finish); applies to records dated on or after workflow/check-catalog.json → batchFiles.appliesFrom (2026-09-12)',
      'scripts/schema/record-scripts.js: apply requires batchKind and the plan beside the report; checkpoint keeps the plan parseable; close requires every phase done or dropped and, for a Figma batch, inventory.json with a clean latest reverification once mutations are listed; a repository batch refuses an inventory',
      'scripts/workflow/start-batch.js, check-batch.js, finish-batch.js and runner/closeout.js: the same gate at open, before a mutation, at close and at finish',
      'scripts/figma/helpers.js: F.inventory (bounded read-only walk, pages loaded first) and F.reverify (id, name, type, parent read back; strict mode fails before any write); creators refuse until a composed script\'s reverify passed; compose({ reverify }) puts it in the prelude',
      'scripts/figma/inventory.js (new): walkScript, save (first walk saved once), addWalk, load, select, expectations, reverifyScript, recordReverification and a CLI (walk, save, select, reverify, record)',
      'scripts/schema/new-record-scripts.js: --kind and --target; writes plan.md from a phase template beside the apply/finalize pair and, for a Figma batch, inventory-walk.figma.js; the apply body declares batchKind, plan and inventory',
      'scripts/figma/double.js (new): the Plugin API double shared by the Figma self-tests; scripts/workflow/batch-files-self-test.js, scripts/figma/inventory-self-test.js and scripts/schema/scaffold-self-test.js (new); scripts/schema/record-scripts-self-test.js and scripts/figma/helpers-self-test.js extended; preflight runs the three new self-tests',
      'workflow/check-catalog.json: deterministic planChecklist and pageInventory (21 checks) and the batchFiles policy; workflow/rules.json notes on agent rules 2 and 3 and standing rule 16; CLAUDE.md Recording; workflow/README.md; contract regenerated; report; finalize through close(); commit'
    ],
    report: `${evidence}/report.md`,
    canvasChecks: 'Not applicable: repository-only batch',
    figmaMutations: [],
    flagsAdded: [],
    stopCondition: 'Repository-only; no Figma call. No change to risk ownership, additive-only rules, DONE records, the store API in scripts/schema/lib.js, or the execution policy text. Records dated before 2026-09-12, including the stopped Flowsheets batch, are noted by the gate, not refused.',
    nextAction: 'Design work resumes in a fresh session: the stopped Flowsheets finish batch (npveRebuild_flowsheetsFinish_2026-09-11, exempt by date but free to adopt a plan.md) or the next planner-selected NPVE item, which opens through the scaffold, saves its first walk as inventory.json and re-verifies the nodes it will mutate before its first write.'
  }
});
console.log(`opened ${result.file} (${result.bytes} bytes, headroom ${result.headroom})`);
