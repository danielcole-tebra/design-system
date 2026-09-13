const { openRecord } = require('./scripts/schema/lib');
openRecord({
  id: 'workflow_npveRunner_2026-09-11', previous: 'workflow_creditResetObservation_2026-09-10',
  workstream: 'workflow', date: '2026-09-11', createdBy: 'Codex', script: 'apply-workflow-npve-runner.js',
  body: { _status: 'IN PROGRESS — repository-only reusable NPVE runner',
    scope: 'Reusable established NPVE assembly, evidence, handoff, usage and closeout tooling; no Figma calls or design batches.',
    operatorQuote: 'Proceed autonomously with reversible repository work. Do not create another task or delegate to subagents.',
    report: 'figma-export/workflow-npve-runner-2026-09-11/report.md',
    canvasChecks: 'Not applicable: repository tooling only; no Figma mutation, publication or new design batch.',
    stopCondition: 'Do not change approval/risk policy, DONE records, shared defaults or design decisions.' }
});
