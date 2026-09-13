// apply-npve-medication-summary-row.js — opens the recorded batch before Figma mutation. Backup first. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
const BACKUP = './design-system-schema.backup-2026-09-04-pre-npve-medication-summary-row.json';
if (!fs.existsSync(BACKUP)) fs.copyFileSync(P, BACKUP);
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const D = 'npveRebuild_medicationSummaryRow_2026-09-04';
if (s[D]) throw new Error('record already exists');
s[D] = {
  _status: 'IN PROGRESS. Recorded before Figma mutation.',
  date: '2026-09-04',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only; Clin_MedList 545:5557',
  report: 'figma-export/npve-medication-summary-row-2026-09-04/report.md',
  recordGate: 'npveRebuild_rowStructure_2026-09-04 recorded — passed',
  scope: 'Create one local Medication summary row component and two preview instances on Templates; no sidesheet assembly in this batch.',
  plannedProperties: ['Status', 'Name', 'Dose', 'Indication', 'Show divider'],
  approvedGeometry: {
    width: 518,
    gridHeight: 76,
    padding: '12px vertical / 8px horizontal',
    internalGaps: '8px status-to-details; 8px within the medication line',
    note: '76px is the base-8 target derived from the source 71px item; source and computed deltas are recorded in the final batch closeout.'
  },
  dependencies: ['published Icon/DownCaret', 'published Chip small outlined/default', 'published Icon button primary/medium', 'published Icon/AddPaymentNote', 'published Divider', 'published variables'],
  stopCondition: 'Stop on file-identity mismatch, unexpected existing Medication summary row, missing library dependency, dropped reference count, or unrelated placed-instance diff.',
  screenshotsPlanned: ['source active row', 'source discontinued row', 'rebuilt Active and Discontinued preview frame']
};
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote', D, 'and backup', BACKUP);
