// Records the bounded pre-write plan for Health Status/Observations.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_healthStatusObservations_2026-09-05';
const PREVIOUS = 'npveRebuild_extReviewRepairs_2026-09-05';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));

if (s[ID]) throw new Error(`${ID} already exists`);
const previous = s[PREVIOUS];
if (!previous || !String(previous._status).startsWith('DONE')) {
  throw new Error('Record gate failed: external review repairs are not recorded DONE');
}

s[ID] = {
  _status: 'IN PROGRESS — source and target audited; bounded pre-write plan recorded before target mutation.',
  date: '2026-09-05',
  workstream: 'NPVE Rebuild / Sidesheets',
  report: 'figma-export/npve-health-status-observations-2026-09-05/report.md',
  recordGate: `${PREVIOUS} recorded DONE — passed`,
  source: {
    file: 'zVsuhYehoSLLq880qRBFkq',
    page: '21:321 ⚙️ Components',
    node: '129:8130 Page=Clin_HealthStatus',
    policy: 'read only; frozen 2x export in this batch'
  },
  target: {
    file: 'fdCQVFdvOByaOYIJYag0d6',
    templatesPage: '3:2',
    screensPage: '27:2',
    sharedSidesheet: '279:2446',
    floatingVariant: '6:65',
    rebuildComparison: '35:332',
    changeLogRow: '18:103'
  },
  scope: 'Create one reusable Health Status/Observations body from live library Text field instances; compose one content-driven shared Sidesheet with the source two-action footer; create one frozen 2x reference, one transparent rebuild helper, one conforming plain-language change log, and one sole comparison instance.',
  sourceFacts: [
    'The source is 550x600 with a 64px header, a fixed 476px body, and a 60px footer.',
    'Health Status contains three 518x40 populated selects: Disability Status / Not disabled; Cognitive/Mental Status / Normal cognitive functioning; Functional Status / Independent in activities.',
    'Functional Observations contains one 518x40 empty select labelled Add observation.',
    'The source uses 12px between Health Status fields, 24px between the two content sections, and leaves 229px of unused body height before the footer.',
    'The footer contains Save & Add to Note and Save; no Cancel action.'
  ],
  buildPlan: [
    'Create one 518px-wide Health Status/Observations body with bound Akkurat LL headings and four live small select Text field instances.',
    'Use 16px within sections, preserve the source 24px section separation, and let the body hug its complete content.',
    'Append the body to Sidesheet Body content preferred values without changing its default; compose a two-action 550px floating sheet whose footer follows the content.',
    'Create a frozen 2x source reference, transparent rebuild helper, conforming Change log helper, and sole comparison instance on Screens.',
    'Export and inspect the body, rebuilt Sidesheet, and comparison; run all ten standing batch rules.'
  ],
  spacingPolicy: 'Canonical base 8: 16px Sidesheet body inset and within-section vertical gaps; 24px between the two source content sections; no fixed empty body space.',
  reuseBaseline: {
    textField: 'Existing live small select instance 316:3413, backed by the published Text field component set.',
    sidesheet: '279:2446 with 6:65 Placement=Floating',
    comparison: '35:332',
    changeLogPattern: 'Clone the conforming Facility Stay helper structure 392:4093; retain its Content/Rows pattern and hide unused cloned rows rather than deleting nodes.'
  },
  preserve: 'Source and library files, shared Sidesheet and comparison geometry/defaults, all prior screens and helpers, existing tokens, and every unrelated target node.',
  stopCondition: 'Stop before target mutation on identity mismatch, missing live Text field/Sidesheet/comparison dependencies, a new unexpressible source pattern, or an unresolved design decision. Otherwise stop after one body/Sidesheet/reference/change-log/comparison set passes structural, paint, font, whole-pixel, single-placement, and screenshot verification and is recorded.',
  findings: { GAP: 0, DEFECT: 0, DECISION: 0 },
  flagsAdded: [],
  flagsBefore: s.flags.length,
  flagsAfter: s.flags.length,
  figmaMutations: [],
  createdNodes: {},
  verification: {}
};

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('recorded', ID, 'flags', s.flags.length);
