// Opens the bounded Allergies comparison-wrapper height correction batch.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_allergiesComparisonHeightCorrection_2026-09-05';
const PREVIOUS = 'npveRebuild_allergiesList_2026-09-05';
const FLAG = 'npveAllergiesComparison_fixedRebuildWrapperHeight';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));

if (s[ID]) throw new Error(`${ID} already exists`);
const previous = s[PREVIOUS];
if (!previous || !String(previous._status).startsWith('DONE')) {
  throw new Error('Record gate failed: Allergies list batch is not recorded DONE');
}

if (!Array.isArray(s.flags)) s.flags = [];
if (!s.flags.some((flag) => flag.id === FLAG)) {
  s.flags.push({
    id: FLAG,
    severity: 'low',
    kind: 'DEFECT',
    discoveredDuring: ID,
    summary: 'The Allergies comparison kept its Rebuild content wrapper at the canonical 600px slot height after swapping in a 447px content-driven Sidesheet, leaving 153px of false white sheet below the live component.',
    where: 'NPVE Rebuild comparison 356:6236; nested Rebuild content I356:6236;114:1139; live Allergies Sidesheet I356:6236;114:1139;356:3249',
    detail: 'The live Sidesheet and its helper component were both 550x447. Only the nested helper instance retained a 550x600 size override and white fill.',
    handling: 'Resolve locally by making the unique rebuild helper surface transparent so the shorter live Sidesheet owns the visible white surface. Preserve the shared Rebuild comparison master and all source/reference geometry.'
  });
}

s[ID] = {
  _status: 'IN PROGRESS. Read-only audit complete; target correction not started.',
  date: '2026-09-05',
  workstream: 'NPVE Rebuild / Sidesheets',
  report: 'figma-export/npve-allergies-comparison-height-correction-2026-09-05/report.md',
  recordGate: `${PREVIOUS} recorded DONE — passed`,
  scope: 'Correct only the unique Allergies rebuild helper surface so the visible white sheet ends with the 447px live Sidesheet even though the shared comparison swap slot retains its canonical 600px geometry. Preserve the shared comparison master, frozen reference, change log, Sidesheet component, body, tokens, and all other comparisons.',
  stopCondition: 'Stop after the unique helper surface, component links, whole-pixel geometry, paints, and final comparison render are verified. Stop immediately if the fix requires a shared master change or changes the Sidesheet itself.',
  audit: {
    comparison: '356:6236 at 1708x1290',
    rebuildColumn: 'I356:6236;35:336 at 550x628',
    rebuildContentWrapper: 'I356:6236;114:1139 at 550x600 with white fill',
    liveSidesheet: 'I356:6236;114:1139;356:3249 at 550x447',
    rootCause: 'Figma preserves the canonical 600px swap-slot geometry after inserting the 447px helper; the helper\'s white surface therefore extended 153px beyond the child Sidesheet.'
  },
  figmaMutations: [],
  verification: {},
  findings: { GAP: 0, DEFECT: 1, DECISION: 0 },
  flagsAdded: [FLAG],
  nextBatch: 'Not started.'
};

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('opened', ID, 'flags', s.flags.length);
