// apply-npve-medication-surface-correction.js — records the user-directed surface correction before Figma mutation.
const fs = require('fs');
const P = './design-system-schema.json';
const BACKUP = './design-system-schema.backup-2026-09-04-pre-npve-medication-surface-correction.json';
if (!fs.existsSync(BACKUP)) fs.copyFileSync(P, BACKUP);
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const D = 'npveRebuild_medicationSurfaceCorrection_2026-09-04';
if (s[D]) throw new Error('record already exists');
if (!s['npveRebuild_medicationListBody_2026-09-04'] || !String(s['npveRebuild_medicationListBody_2026-09-04']._status).startsWith('DONE')) {
  throw new Error('Medication list body gate is not complete');
}
s[D] = {
  _status: 'IN PROGRESS. Recorded before Figma mutation.',
  date: '2026-09-04',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only; Clin_MedList rows 545:5573 and 545:5589',
  report: 'figma-export/npve-medication-surface-correction-2026-09-04/report.md',
  recordGate: 'npveRebuild_medicationListBody_2026-09-04 recorded DONE — passed',
  scope: 'Change only Medication summary row 219:2068 from color/grey/300 to color/background/paper so all existing instances inherit the white source surface. Preserve geometry, component API, nested instances, and all unrelated nodes.',
  before: 'color/grey/300 key 4dbef7c8fc453422675312ab6708eeda7e45476b',
  after: 'color/background/paper key f1e85cc976b10ea275c03f5d7f21a0dc12cdfee0',
  expectedInstances: ['224:1733', '224:1754', '238:1760', '238:1778', 'I238:1809;238:1760', 'I238:1809;238:1778'],
  stopCondition: 'Stop on file-identity mismatch, missing master, unexpected instance count, dimension or component-property change, dropped references, or unrelated diff.',
  screenshotsPlanned: ['source MainWrap 545:5572', 'corrected row states 224:1730', 'corrected body preview 238:1806', 'reference-vs-rebuilt comparison']
};
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote', D, 'and backup', BACKUP);
