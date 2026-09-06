// apply-npve-medication-list-sidesheet.js — opens the recorded full-sheet integration batch before Figma mutation.
const fs = require('fs');
const P = './design-system-schema.json';
const BACKUP = './design-system-schema.backup-2026-09-04-pre-npve-medication-list-sidesheet.json';
if (!fs.existsSync(BACKUP)) fs.copyFileSync(P, BACKUP);
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const D = 'npveRebuild_medicationListSidesheet_2026-09-04';
if (s[D]) throw new Error('record already exists');
if (!s['npveRebuild_medicationSurfaceCorrection_2026-09-04'] || !String(s['npveRebuild_medicationSurfaceCorrection_2026-09-04']._status).startsWith('DONE')) {
  throw new Error('Medication surface correction gate is not complete');
}
s[D] = {
  _status: 'IN PROGRESS. Recorded before Figma mutation.',
  date: '2026-09-04',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only; Page=Clin_MedList 545:5557',
  report: 'figma-export/npve-medication-list-sidesheet-2026-09-04/report.md',
  recordGate: 'npveRebuild_medicationSurfaceCorrection_2026-09-04 recorded DONE — passed',
  scope: 'Compose a canonical 550x600 Medication List Sidesheet from the existing Sidesheet master and Medication list body; add one narrow full-width footer-action wrapper; curate the two existing swap APIs; create standalone and comparison screens. Preserve existing Problems instances and all source/library content.',
  sourceGeometry: '545:5557 is 550x380 with Header 64, MainWrap 240, Footer 76',
  targetGeometry: 'Canonical Sidesheet 6:65 remains 550x600 with Header 56 and Footer 56; body inset remains 16px',
  dependencies: [
    'Sidesheet 6:65',
    'Medication list body 236:1758',
    'published Button variant=contained, color=primary, size=medium, State=Default 155:1192',
    'Rebuild comparison 35:332',
    'Change log/Row 18:103',
    'published variables and Divider'
  ],
  plannedApiChanges: [
    'Add Medication list body 236:1758 to Body content#6:5 preferred values',
    'Add a local Medication list footer action wrapper to Tertiary action#6:8 preferred values',
    'Keep every existing default value unchanged'
  ],
  plannedScreens: [
    '04 · Medication list with one live Sidesheet instance',
    '05 · Medication list comparisons with one live Rebuild comparison instance'
  ],
  stopCondition: 'Stop on identity mismatch, duplicate names, unexpected existing-screen mutation, dropped references, non-canonical shell geometry, unresolved library dependency, or unrelated diff.'
};
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote', D, 'and backup', BACKUP);
