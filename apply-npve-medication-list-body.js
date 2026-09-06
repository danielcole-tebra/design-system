// apply-npve-medication-list-body.js — opens the recorded batch before Figma mutation. Backup first. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
const BACKUP = './design-system-schema.backup-2026-09-04-pre-npve-medication-list-body.json';
if (!fs.existsSync(BACKUP)) fs.copyFileSync(P, BACKUP);
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const D = 'npveRebuild_medicationListBody_2026-09-04';
if (s[D]) throw new Error('record already exists');
if (!s['npveRebuild_medicationSummaryRow_2026-09-04'] || !String(s['npveRebuild_medicationSummaryRow_2026-09-04']._status).startsWith('DONE')) {
  throw new Error('Medication summary row gate is not complete');
}
s[D] = {
  _status: 'IN PROGRESS. Recorded before Figma mutation.',
  date: '2026-09-04',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only; Clin_MedList MainWrap 545:5572',
  report: 'figma-export/npve-medication-list-body-2026-09-04/report.md',
  recordGate: 'npveRebuild_medicationSummaryRow_2026-09-04 recorded DONE — passed',
  scope: 'Create one local Medication list body component and one preview instance on Templates; compose the published add-action Button with two instances of the approved Medication summary row. No sidesheet shell or footer assembly in this batch.',
  approvedGeometry: {
    width: 518,
    height: 206,
    gap: 8,
    structure: 'Published 38px add-action Button + Active row 76px + Discontinued row 76px; 8px between each item.',
    note: 'The enclosing Sidesheet owns outer padding. Source MainWrap 545:5572 is 550x240 with 16/20 padding; the local body follows the established 518px inner width and canonical base-8 spacing.'
  },
  dependencies: [
    'local Medication summary row 219:2068',
    'published Button variant=contained, color=primary, size=medium, State=Default key 820871c5281ccd91813587a508771cc439f38b93',
    'published Icon/PlusOutlined through the Button end-icon slot',
    'published spacing and component-surface variables already used by the approved row'
  ],
  plannedApi: ['Expose the Add New Medication Button instance', 'Expose the Active row instance', 'Expose the Discontinued row instance'],
  stopCondition: 'Stop on file-identity mismatch, duplicate Medication list body, missing trusted dependency, approved row mutation, dropped reference count, or unrelated placed-instance diff.',
  screenshotsPlanned: ['source MainWrap 545:5572', 'rebuilt Medication list body preview', 'reference-vs-rebuilt comparison']
};
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote', D, 'and backup', BACKUP);
