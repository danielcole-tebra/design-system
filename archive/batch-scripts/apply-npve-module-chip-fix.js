// apply-npve-module-chip-fix.js — open the Module chip correction batch.
// Additive and resumable. The pre-batch backup is preserved if already present.
const fs = require('fs');

const P = './design-system-schema.json';
const B = './design-system-schema.backup-2026-09-06-pre-npve-module-chip-fix.json';
const D = 'npveRebuild_moduleChipFix_2026-09-06';
const GATE = 'npveRebuild_encounterToolbar_2026-09-06';
const F = 'figma-export/npve-module-chip-fix-2026-09-06/';

if (!fs.existsSync(B)) fs.copyFileSync(P, B);
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s[D]) throw new Error(`${D} already exists`);
if (!s[GATE] || !String(s[GATE]._status || '').startsWith('DONE.')) {
  throw new Error(`${GATE} is not recorded as DONE`);
}

const priorOrder = [...s.figmaBuild.pages._order];
const liveLibraryOrder = [
  'Cover',
  'Foundations',
  'Reference',
  'Actions',
  'Inputs',
  'Data display',
  'Feedback',
  'Surfaces & navigation',
  'Icons & illustrations',
  'Compositions',
  'Layouts'
];
s.figmaBuild.pages._order = liveLibraryOrder;

s[D] = {
  _status: 'IN PROGRESS. Source and current target anatomy measured; no Figma mutation yet.',
  date: '2026-09-06',
  workstream: 'NPVE Rebuild / Encounter page',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only (Module strip 4841:17077)',
  report: F + 'report.md',
  recordGate: `${GATE} recorded — passed`,
  stopCondition: 'Stop if the placed encounter comparison does not inherit the master correction cleanly, if a required token or source glyph cannot be verified, or if any new drawn stand-in is required.',
  supersedes: 'Daniel crop review supersedes the earlier unrecorded moduleChipFix draft.',
  step1_sourceMeasurement: {
    selectedNote: '120x40, radius 8, padding 12 horizontal / 8 vertical, 24px icon slot, 14/18 bold label, 24px close control; 8px edge gaps.',
    icon: 'Source Note icon vector 15x19 inside 24px slot; fill #004852, matching color/primary/main.',
    label: 'Source Note label #000000; Problems label #004852. Rebuild standardizes the selected label/icon/close to one source teal family per Daniel review.',
    close: 'Source close ink #000000, two 8x8 stroked paths inside a 24px control, 1.5px stroke.',
    deliberateImprovement: 'Internal element gaps become bound space/16 despite the measured 8px source gaps; small elements in one control need room.'
  },
  schemaPageOrderRefresh: {
    before: priorOrder,
    after: liveLibraryOrder,
    reason: 'Refresh the library page-order snapshot so standing rule 7 can pass against the live library.'
  },
  flagsBefore: s.flags.length
};

for (const f of s.flags) {
  if (f.id === 'npveEncounter_libraryPageOrderStale') {
    f.note_2026_09_06_moduleChipFix = `Resolved in ${D}: figmaBuild.pages._order refreshed to the verified live library order.`;
  }
}

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('opened', D, '; page order', priorOrder.length, '->', liveLibraryOrder.length);
