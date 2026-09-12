// Opens the Batch D record (templated record scripts with the ceiling hard stop, schema self-test gate by inclusion,
// shared Figma helpers). The first batch opened through the templated helper it delivers.
// Usage: node apply-workflow-record-scripts-2026-09-12.js
const { apply } = require('./scripts/schema/record-scripts');

const id = 'workflow_recordScripts_2026-09-12';
const evidence = 'figma-export/workflow-record-scripts-2026-09-12';
const result = apply({
  id,
  previous: ['workflow_sessionEconomyC_2026-09-12'],
  workstream: 'workflow',
  date: '2026-09-12',
  createdBy: 'Claude Fable 5.1 (Claude Code desktop)',
  body: {
    _status: 'IN PROGRESS — Batch D: templated apply/checkpoint/close record helpers with the record-ceiling hard stop before finalize, schema self-test gate assertions by inclusion, shared Figma helpers.',
    date: '2026-09-12',
    workstream: 'Workflow / session economy',
    executor: 'Claude Fable 5.1 (Claude Code desktop)',
    risk: {
      tier: 'low',
      assignedBy: 'Repository-only tooling work, the fourth of the five batches deferred by workflow_sessionEconomy_2026-09-12 (batches A and C ran at tier low, accepted by the operator); commissioned by the operator in chat at session start. The executor did not change the tier.',
      operatorQuote: 'Batch D: templated apply/finalize record helpers with the record-ceiling hard stop before finalize, fix the schema self-test gate assertion to inclusion, shared Figma helpers. Lean start.'
    },
    planAsProposed: 'Batch D (nextAction of workflow_sessionEconomyC_2026-09-12): templated record scripts and shared Figma helpers; the finalize template enforces the record ceiling before the record becomes immutable. Decision 2 of that record (the hard stop goes to Batch D) is confirmed by the operator quote above.',
    scope: [
      'scripts/schema/record-scripts.js (new): apply, checkpoint, close and preflight over openRecord/finalizeRecord; every write measures the record file against byteCeilings.record and refuses over it before the store writes; apply requires the batch keys and a quoted operator statement; close requires outcome, validation, an existing report and an unchanged risk tier',
      'scripts/schema/new-record-scripts.js (new): scaffolds an apply/finalize pair from the templates; its unfilled placeholder markers are refused by apply and close',
      'scripts/schema/self-test.js: the dry run opens after the latest DONE record and asserts the gate by inclusion, so it passes while a batch elsewhere is IN PROGRESS',
      'scripts/figma/helpers.js (new): shared Plugin API helpers shipped as text and composed into use_figma scripts (identity guards, page, fonts, keyed imports, paint/bind readbacks, creators with readback, read-only source, size limit)',
      'scripts/workflow/runner/closeout.js: the same ceiling check before its finalizeRecord',
      'Self-tests for the record helpers and the Figma helpers; a deterministic check in check-catalog.json; rules.json agent rule 7 and standing rule 16 name the helpers; CLAUDE.md Recording and workflow/README.md; regenerate the contract; finalize through close(); commit'
    ],
    report: `${evidence}/report.md`,
    canvasChecks: 'Not applicable for the record tooling. The Figma helpers get a read-only smoke run against the NPVE target file if the Figma tools answer this session; no mutation, no page change.',
    figmaMutations: [],
    flagsAdded: [],
    stopCondition: 'Repository-only, plus read-only use_figma calls at most. No change to risk ownership, additive-only rules, DONE records, the semantics of openRecord/finalizeRecord in scripts/schema/lib.js, or the execution policy text.',
    nextAction: 'Implement, test, measure, finalize through close(), commit.'
  }
});
console.log(`opened ${result.file} (${result.bytes} bytes, headroom ${result.headroom})`);
