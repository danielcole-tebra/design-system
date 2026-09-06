// Records the start of the Medication List content-height correction batch.
const fs = require('fs');

const schemaPath = './design-system-schema.json';
const backupPath = './design-system-schema.backup-2026-09-04-pre-npve-medication-list-height-correction.json';
const recordKey = 'npveRebuild_medicationListHeightCorrection_2026-09-04';
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

if (schema[recordKey]) throw new Error(`${recordKey} already exists`);
if (!String(schema['npveRebuild_medicationListSidesheet_2026-09-04']?._status || '').startsWith('DONE')) {
  throw new Error('Previous Medication List Sidesheet batch is not recorded DONE');
}

fs.copyFileSync(schemaPath, backupPath);
schema[recordKey] = {
  _status: 'IN PROGRESS — correcting the Medication List rebuild so the footer follows active content rather than a fixed 600px presentation height.',
  date: '2026-09-04',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only; Page=Clin_MedList 545:5557',
  report: 'figma-export/npve-medication-list-height-correction-2026-09-04/report.md',
  recordGate: 'npveRebuild_medicationListSidesheet_2026-09-04 recorded DONE — passed',
  scope: 'Correct only the Medication List standalone screen, its rebuild comparison helper, its reference helper, and its plain-language change log. Do not change the shared Sidesheet master or existing Problems screens.',
  userDecision: 'The footer encloses the active content; it is not pinned a fixed distance below its nearest content.',
  evidenceBefore: {
    medicationListBody: '236:1758 is 518x206.',
    sidesheetInstance: '250:3519 is 550x600; Body 487; swapped Body content is incorrectly stretched to 385; Footer begins at y544.',
    rebuildHelper: '253:1840 and nested Sidesheet 253:1841 are both 550x600.',
    sourceHelper: '253:1838 is 550x600 although its source export is 550x380.'
  },
  intendedGeometry: 'Header 56 + 1px divider + body padding 16 + 206px active content + body padding 16 + footer 56 = 351px total.',
  stopCondition: 'Stop on inability to restore the swapped body to its intrinsic 206px height, any shared-master mutation, any existing Problems-screen mutation, or unrelated diff.',
  flagsAdded: []
};

fs.writeFileSync(schemaPath, `${JSON.stringify(schema, null, 1)}\n`);
console.log(`started ${recordKey}`);
