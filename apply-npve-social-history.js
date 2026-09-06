// Records the bounded pre-write plan for the NPVE Social History sidesheet rebuild.
const fs = require('fs');

const P = './design-system-schema.json';
const BACKUP = './design-system-schema.backup-2026-09-06-pre-npve-social-history.json';
const ID = 'npveRebuild_socialHistory_2026-09-06';
const PREVIOUS = 'npveRebuild_healthStatusObservationsOpticalSpacing_2026-09-06';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));

if (s[ID]) throw new Error(`${ID} already exists`);
const previous = s[PREVIOUS];
if (!previous || !String(previous._status).startsWith('DONE')) {
  throw new Error('Record gate failed: Health Status/Observations optical-spacing batch is not recorded DONE');
}
if (!fs.existsSync(BACKUP)) fs.copyFileSync(P, BACKUP);

s[ID] = {
  _status: 'IN PROGRESS — source, library, and target audited; bounded pre-write plan recorded before target mutation.',
  date: '2026-09-06',
  workstream: 'NPVE Rebuild / Sidesheets',
  report: 'figma-export/npve-social-history-2026-09-06/report.md',
  recordGate: `${PREVIOUS} recorded DONE — passed`,
  source: {
    file: 'zVsuhYehoSLLq880qRBFkq',
    node: '129:10181 Page=Clin_SHx',
    geometry: '550x778',
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
  sourceFacts: [
    'The source is 550x778 with a 64px header, 654px body, and 60px footer.',
    'The body contains five uppercase section headings, nine small fields, two inline unit labels, one New Entry button, and one multiline Comments field.',
    'Source body inset is 16px horizontally and 8px vertically; its section stack uses 24px between groups.',
    'The source footer contains Save & Add to Note and Save; no Cancel action.'
  ],
  reuseBaseline: {
    textField: 'Published Text field set 7c3c99bb9a9392d6571c0557b41d142b8987b566; small empty variant 77:708 / key 542540ea8fa199c81ea0128aea9c78a5cc8e8abf.',
    newEntryButton: 'Published Button set cfb726c79b456d52901243b7c33839efd0780a93; contained primary small default variant 155:1193 / key 8fc8f57f80196e40aff7b3b1116226ea0a925120.',
    sidesheet: 'Shared Sidesheet 279:2446, Floating variant 6:65.',
    comparison: 'Shared Rebuild comparison 35:332.',
    changeLogPattern: 'Clone current conforming Health Status/Observations helper 415:7108 and keep live Change log/Row instances.'
  },
  buildPlan: [
    'Create one 518px-wide Social history body component with five section groups and base-8 auto-layout.',
    'Use live published small Text field instances for all fields; enable select on choice fields and multiline on Comments.',
    'Use one live published small contained-primary Button instance for New Entry; use bound Akkurat LL text only for section headings and inline unit labels.',
    'Append the body to Sidesheet Body content preferred values without changing defaults; compose one content-driven 550px floating sheet with the source two-action footer.',
    'Create one frozen 2x source reference, one transparent rebuild helper, one conforming change log, and one sole comparison instance.',
    'Export and inspect the body, rebuilt sheet, and comparison; run all ten standing batch rules.'
  ],
  spacingPolicy: 'Canonical base 8: 16px shell inset and vertical element rhythm, 24px between semantic groups, 8px only for heading-to-control optical pairing where the heading has its own line box.',
  codeConnect: 'No .figma.ts/.figma.js mappings found under packages/design-system; reused the published Design System Rebuild assets discovered from the target subscription.',
  preserve: 'Source and library files, the shared Sidesheet and comparison defaults/geometry, all prior screens/helpers, section 15 Encounter page shell, existing variables, and every unrelated node.',
  stopCondition: 'Stop before or during target mutation if a published field/button cannot express the source in render, identity changes, a source pattern requires a hand-drawn control, or a design decision appears. Otherwise stop after one reusable body, one live shared-shell sheet, three helpers, one sole comparison, screenshots, ten standing-rule checks, report, and final record.',
  findings: { GAP: 0, DEFECT: 0, DECISION: 0 },
  flagsAdded: [],
  flagsBefore: s.flags.length,
  flagsAfter: s.flags.length,
  figmaMutations: [],
  createdNodes: {},
  verification: {}
};

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('recorded', ID, 'flags', s.flags.length, 'backup', BACKUP);
