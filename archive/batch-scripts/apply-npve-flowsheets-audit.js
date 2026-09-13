const {openRecord} = require('./scripts/schema/lib');
openRecord({id:'npveRebuild_flowsheetsAudit_2026-09-11',previous:'npveRebuild_patientSummaryBody_2026-09-10',workstream:'npve',date:'2026-09-11',createdBy:'Codex',script:'apply-npve-flowsheets-audit.js',body:{
  _status:'IN PROGRESS — read-only Flowsheets state and mapping audit',
  operatorAuthorization:'Ok lets start flowsheets work',
  authorizationContext:'Acceptance of the proposed read-only Flowsheets audit; no build approval inferred.',
  scope:'Inspect source Flowsheets states, relevant code and authenticated library mappings; save evidence and propose one bounded build item. No Figma mutation.',
  stopCondition:'Do not construct UI. Missing graph patterns or ambiguous behavior become findings and a proposed operator decision.',
  report:'figma-export/npve-flowsheets-audit-2026-09-11/report.md',
  figmaMutations:[],
  nextAction:'Read source subtree and related visible states after verifying source/target/library identity.'
}});
