// Records the bounded pre-write plan for the Health Status empty-field optical spacing correction.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_healthStatusObservationsOpticalSpacing_2026-09-06';
const PREVIOUS = 'npveRebuild_healthStatusObservations_2026-09-05';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));

if (s[ID]) throw new Error(`${ID} already exists`);
const previous = s[PREVIOUS];
if (!previous || !String(previous._status).startsWith('DONE')) {
  throw new Error('Record gate failed: Health Status/Observations build is not recorded DONE');
}

s[ID] = {
  _status: 'IN PROGRESS — rendered spacing measured; bounded optical correction recorded before Figma mutation.',
  date: '2026-09-06',
  workstream: 'NPVE Rebuild / Sidesheets',
  report: 'figma-export/npve-health-status-optical-spacing-2026-09-06/report.md',
  recordGate: `${PREVIOUS} recorded DONE — passed`,
  trigger: 'Operator observed that Functional Observations reads farther from its dropdown than Health Status reads from its labeled dropdowns.',
  measuredCause: {
    health: 'Health heading render ends at y=30054.225; the first filled field floating label begins at y=30071.313. The field render extends 8px above its 40px instance box.',
    observations: 'Functional Observations heading render ends at y=30270.225; the empty field border begins at y=30292 and its placeholder begins at y=30307.416. The empty field has no floating label above the border.',
    conclusion: 'The shared 16px frame gap is geometrically equal but not optically equal. The empty field needs the next smaller base-8 step.'
  },
  scope: 'Change only Functional Observations heading-to-empty-field spacing from 16px to bound space/8; reduce the dependent section, body, sheet, and rebuild-helper heights by 8px; update the existing change log, comparison, screenshots, report, and record.',
  preserve: 'Health Status 16px field rhythm; 24px section separation; 16px Sidesheet body padding; all labels, values, fields, shell defaults, source reference, prior screens, and all unrelated nodes.',
  plannedGeometry: {
    functionalObservations: '518x80 → 518x72; itemSpacing 16 → 8, bound to space/8.',
    body: '518x296 → 518x288.',
    sheetAndHelper: '550x472 → 550x464.',
    shellStack: '72 header + 1 divider + 320 body region + 71 footer = 464.'
  },
  stopCondition: 'Stop after one targeted base-8 spacing correction, dependent height updates, plain-language change-log update, live comparison screenshots, pixel verification, all ten standing rules, and final record. Stop immediately on any unexpected dependency, clipping, or unrelated instance change.',
  findings: { GAP: 0, DEFECT: 0, DECISION: 0 },
  flagsAdded: [],
  flagsBefore: s.flags.length,
  flagsAfter: s.flags.length,
  figmaMutations: [],
  verification: {}
};

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('recorded', ID, 'flags', s.flags.length);
