const { openRecord, appendFlags } = require('./scripts/schema/lib');
const flag = {
  id: 'npveEditForms_fieldSurfaceInheritance_2026-09-10',
  status: 'OPEN — composition surface mismatch; per-consumer repair evidence required',
  finding: 'Reviewed Allergies and Family History rebuilds show the pale teal card through fields; operator requires white fields. Family History reused Allergies; the isolated model test reused Family History.',
  operatorQuote: 'The rebuild should contain white fields, they should not match the background. The same as the reference.',
  specification: 'workflow/appearance/npve-edit-forms.md',
  targetFileKey: 'fdCQVFdvOByaOYIJYag0d6',
  consumers: [
    { record: 'npveRebuild_allergiesEdit_2026-09-09', nodeId: '634:6808', role: 'precedent', status: 'Needs repair verification; DONE record remains immutable' },
    { record: 'npveRebuild_familyHistoryEdit_2026-09-09', nodeId: '636:3', role: 'production derivative', status: 'Operator requested builder correction; latest correction not verified by this workflow batch' },
    { nodeId: '642:7557', role: 'isolated model test derivative', status: 'Not for production; do not reuse as a surface precedent; repair or retain with warning' }
  ],
  handling: 'Resolve per consumer with fresh screenshot and supported implementation evidence. A repaired Family History screenshot does not clear Allergies. No shared-library or canvas changes authorized by this repository-only batch.',
  evidence: ['figma-export/npve-family-history-edit-2026-09-09/form-636-3-v2.png', 'figma-export/model-test-2026-09-10/before-form-636-3.png'],
  scopeLimit: 'Known derivatives only; not an exhaustive inventory or a conclusion about all library inputs.'
};
openRecord({ id: 'workflow_appearanceReview_2026-09-10', previous: 'workflow_executionReliability_2026-09-10', workstream: 'workflow', date: '2026-09-10', createdBy: 'Codex', script: 'apply-appearance-review.js', body: {
  _status: 'IN PROGRESS — repository-only appearance and reuse safeguards', date: '2026-09-10',
  operatorAuthorization: 'Ok do that',
  scope: 'Reusable appearance specification, whole-form review evidence, inherited-defect tracking; preserve active builder work.',
  flags: [flag], figmaMutations: [], report: 'figma-export/workflow-appearance-review-2026-09-10/report.md'
} });
appendFlags([flag]);
