// amend-npve-allergies-edit-save-attribution.js — operator-directed correction of the expectedFinding in
// npveRebuild_allergiesEdit_2026-09-09 (2026-09-09). Live node reads of all five edit-sheet sources showed the
// Allergies footer Save is Type=Primary (129:7949), matching Facility Stay 648:1735, Hospitalizations 129:8516 and
// Procedures 129:8773; the outlined Save (Type=Default) is in the Family History source 129:12486 (129:12800) and is
// that item's expectedFinding. The current evidence supports misattribution in the original wording; historical
// source changes were not investigated and are neither claimed nor ruled out. The record is still IN PROGRESS, so
// finalizeRecord may rewrite it (records freeze once DONE); the original wording is preserved verbatim in
// expectedFindingSuperseded_2026_09_09 and in git (commit ef2952f). The Allergies manifest stopCondition clause
// "beyond the recorded outlined-Save finding" is stale for the same reason but is frozen by the active run's
// plannerRiskSha256 (finish gate fails on planner-owned changes after start); it is corrected by the operator or
// planner after the run closes. Additive: appends flag npveFamilyHistory_sourceSaveOutlined, changes nothing else.
const store = require('./scripts/schema/lib');

const ID = 'npveRebuild_allergiesEdit_2026-09-09';
const FLAG_ID = 'npveFamilyHistory_sourceSaveOutlined';

// 1) Amend the owned IN PROGRESS record.
store.finalizeRecord(ID, (record) => {
  record.expectedFindingSuperseded_2026_09_09 = {
    originalVerbatim: record.expectedFinding,
    correctedBy: 'Operator-directed amendment 2026-09-09 (amend-npve-allergies-edit-save-attribution.js) after live node reads of all five edit-sheet sources in zVsuhYehoSLLq880qRBFkq.',
    verdict: 'The current evidence supports misattribution: the outlined-Save observation belongs to the Family History source 129:12486, not to this Allergies source. Historical source changes were not investigated.',
    evidence: 'Allergies 129:7949 Primary; Facility Stay 648:1735 Primary; Hospitalizations 129:8516 Primary; Procedures 129:8773 Primary; Family History 129:12800 Type=Default (white fill, 1px #8CA7A2). All Button set 26:2112, 66x36.',
    manifestNote: 'The Allergies manifest stopCondition clause "beyond the recorded outlined-Save finding" is stale for the same reason and is corrected by the operator or planner after this run closes (the finish gate freezes planner-owned fields mid-run).'
  };
  record.expectedFinding = 'No Allergies footer inconsistency: Save is Type=Primary here (button 129:7949, variant 26:2165, coral pill), the same as Facility Stay 648:1735, Hospitalizations 129:8516 and Procedures 129:8773. The outlined Save belongs to the Family History source 129:12486 (button 129:12800, Type=Default) and is that item\'s expectedFinding. The current evidence supports misattribution in the original wording (kept verbatim in expectedFindingSuperseded_2026_09_09); historical source changes were not investigated and are neither claimed nor ruled out. Build the Allergies footer as drawn (Cancel / Save & Add to Note outlined / Save primary) with no Save-inconsistency change-log row.';
  record.stopConditions = record.stopConditions.map((s) => s.replace(
    ', or on a new design decision beyond the recorded outlined-Save finding.',
    ', or on a new design decision.'
  ));
  record.resumeProcedure = record.resumeProcedure.replace(
    '9) appendFlags for the outlined-Save footer finding (report, do not resolve), then commit the record, aggregate, indexes, contract, manifest and evidence together.',
    '9) Flag npveFamilyHistory_sourceSaveOutlined was appended by the 2026-09-09 attribution amendment (see expectedFindingSuperseded_2026_09_09); commit the record, aggregate, indexes, contract, manifest and evidence together.'
  );
  record.findings.DECISION = 1;
  const added = record.flagsAdded.includes(FLAG_ID) ? record.flagsAdded : [...record.flagsAdded, FLAG_ID];
  record.flagsAdded = added;
  return record;
});

// 2) Append the flag (idempotent: skip when already present).
const loaded = store.loadStore();
const exists = store.mergedFlags(loaded).some((f) => f.id === FLAG_ID);
if (!exists) {
  store.appendFlags([{
    id: FLAG_ID,
    severity: 'low',
    kind: 'DECISION',
    discoveredDuring: ID,
    webAppV2BugListCandidate: false,
    summary: 'The Family History edit source 129:12486 (Clin_FHX-Editing) draws footer Save as outlined (button 129:12800, Type=Default, white fill, 1px #8CA7A2, 66x36) where Allergies 129:7949, Facility Stay 648:1735, Hospitalizations 129:8516 and Procedures 129:8773 all use Type=Primary (coral #FF8D6E pill). First surfaced in figma-export/npve-planning-2026-09-09/proposal.md; record npveRebuild_allergiesEdit_2026-09-09 originally misattributed it to Allergies and was amended 2026-09-09.',
    where: 'NPVE source zVsuhYehoSLLq880qRBFkq 129:12486 › footer button 129:12800',
    detail: 'The current evidence supports misattribution of the original record wording to the Allergies source; live reads 2026-09-09 show every other edit-sheet Save as Type=Primary. Historical source changes were not investigated.',
    handling: 'Report, do not resolve. Build the Family History footer as drawn with one change-log row; decision for Daniel at the npve-family-history-edit batch (as-drawn vs align to primary).'
  }]);
}

// 3) Record the post-amendment flag counts and verify the store regenerates clean.
store.finalizeRecord(ID, (record) => {
  const index = store.readRecordIndex();
  record.flagsAfter = {
    active: index.flags.active,
    resolved: index.flags.resolved,
    total: index.flags.active + index.flags.resolved
  };
  return record;
});
const generated = store.generate();
console.log('amended', ID, '; flag', FLAG_ID, 'appended; flags', generated.currentState.flags.active, 'active /', generated.currentState.flags.resolved, 'resolved');
