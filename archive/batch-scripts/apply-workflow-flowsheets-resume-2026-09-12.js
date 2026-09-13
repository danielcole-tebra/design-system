// Opens the workflow_flowsheetsResume_2026-09-12 record. Usage: node apply-workflow-flowsheets-resume-2026-09-12.js
// Scaffolded by scripts/schema/new-record-scripts.js; apply() refuses a body or a plan that still carries a placeholder.
const { apply } = require('./scripts/schema/record-scripts');

const id = 'workflow_flowsheetsResume_2026-09-12';
const evidence = 'figma-export/workflow-flowsheets-resume-2026-09-12';
const result = apply({
  id,
  previous: ['workflow_planInventory_2026-09-12'],
  workstream: 'workflow',
  date: '2026-09-12',
  createdBy: 'Claude Fable 5.1 (Claude Code desktop)',
  body: {
    _status: 'IN PROGRESS — Flowsheets resume tooling: a supported source-gate treatment for a read-only source set whose definitions Figma cannot read, and resume-batch.js to resume a stopped item in a fresh session, both with self-tests',
    date: '2026-09-12',
    batchKind: 'repository',
    plan: `${evidence}/plan.md`,
    workstream: 'Workflow / session economy',
    executor: 'Claude Fable 5.1 (Claude Code desktop)',
    risk: {
      tier: 'low',
      assignedBy: 'The operator, in the commissioning message at session start ("Repository-only, risk low, one record, one commit"). The executor did not change the tier.',
      operatorQuote: 'Batch F: Flowsheets resume tooling. Repository-only, risk low, one record, one commit. Lean start.'
    },
    operatorCommission: {
      firstCommit: 'First, before anything else, commit the stopped Flowsheets state on its own: the untracked record records/npve/2026-09-11/npveRebuild_flowsheetsFinish_2026-09-11.json, apply-npve-flowsheets-finish.js, figma-export/npve-flowsheets-finish-2026-09-11/, and the pending edits to flags/active.json and workflow/manifest.json. Nothing else in that commit.',
      deliverable1: 'A supported source-gate treatment for a read-only source component set whose definitions Figma cannot read. When componentPropertyDefinitions on the owning set throws (the Flowsheets case: set 129:6647 in zVsuhYehoSLLq880qRBFkq answers "Component set has existing errors"), the runner preflight and validate-execution accept the mapping only when the exact Figma error is quoted, the set\'s identity (id, name, type, parent, page) and geometry are read, every variant child\'s name and variantProperties are read, and the variant the batch uses is matched by those properties. The control entry is marked "definitions unreadable at source" and a flag names the set. The library component the rebuild uses is verified exactly as today. No edit to the source, no substitute source in the manifest, no skipped check.',
      deliverable2: 'node scripts/workflow/resume-batch.js <item-id> <executor> --confirm="<my words>". Resumes a stopped item in a fresh session: requires the item and run stopped, the record IN PROGRESS, execution.json valid at ready, and my quoted go-ahead; refuses anything else. It sets the run active and the item back to the status an active run shows today, refreshes the store fingerprint and the pre-existing-files baseline (listing what was appended since the start), appends the resume to the run, and writes a checkpoint on the record through record-scripts quoting me. The batch-files gate runs at open and reports; records dated before 2026-09-12 are noted, not refused.',
      documentation: 'Rule 16, agent rule 9 and the README name the resume command; check-catalog gains the two checks. Beyond that first commit, the Flowsheets batch is not touched.'
    },
    planAsProposed: 'Batch F, commissioned by the operator at session start after Batch E (workflow_planInventory_2026-09-12) closed with the Flowsheets finish batch stopped at its source definition gate (flag npveFlowsheets_sourceDefinitionBlocker_2026-09-11, record npveRebuild_flowsheetsFinish_2026-09-11).',
    scope: [
      'Commit 5be9df8 (before this record opened): the stopped Flowsheets state alone — record npveRebuild_flowsheetsFinish_2026-09-11, apply-npve-flowsheets-finish.js, figma-export/npve-flowsheets-finish-2026-09-11/, flags/active.json (flag npveFlowsheets_sourceDefinitionBlocker_2026-09-11) and workflow/manifest.json (item npve-flowsheets-finish stopped)',
      'scripts/workflow/source-definitions.js (new): the shape and checks of a read-only source set whose definitions Figma cannot read; scripts/workflow/validate-execution.js accepts a control marked "definitions unreadable at source" only under those checks, never for the target or library file',
      'scripts/workflow/runner/plugin.js: the read program quotes the exact error and reads the set, page, geometry and variants instead of throwing on a source read; a mutation refuses an unreadable target set; validatePlan accepts the record on a source read only',
      'scripts/workflow/resume-batch.js (new) with scripts/workflow/validate-manifest.js exporting validateManifestData; resumes a stopped item under the operator\'s quoted go-ahead',
      'scripts/workflow/source-definitions-self-test.js and scripts/workflow/resume-batch-self-test.js (new), both in DEFAULT_SELF_TESTS of scripts/schema/record-scripts.js',
      'workflow/check-catalog.json: deterministic sourceDefinitions and batchResume (23 checks); workflow/rules.json: standing rule 16 and agent rule 9 name the resume command; workflow/README.md, workflow/runner.md, CLAUDE.md rule 16 brief and OPERATORS.md; contract regenerated; report; finalize through close(); one commit'
    ],
    report: `${evidence}/report.md`,
    canvasChecks: 'Not applicable: repository-only batch',
    figmaMutations: [],
    flagsAdded: [],
    stopCondition: 'Repository-only; no Figma call. The Flowsheets batch is not touched beyond its own stopped-state commit: no edit to the source, no substitute source in the manifest, no skipped check, no change to risk ownership, DONE records, the store API in scripts/schema/lib.js or the execution policy text.',
    nextAction: 'Build the two deliverables and their self-tests, document the checks and the resume command, regenerate the contract, write the report, close the record and commit.'
  }
});
console.log(`opened ${result.file} (${result.bytes} bytes, headroom ${result.headroom})`);
