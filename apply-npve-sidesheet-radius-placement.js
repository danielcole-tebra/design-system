// Records the start of the NPVE-local Sidesheet radius and placement batch.
const fs = require('fs');

const schemaPath = './design-system-schema.json';
const backupPath = './design-system-schema.backup-2026-09-04-pre-npve-sidesheet-radius-placement.json';
const recordKey = 'npveRebuild_sidesheetRadiusPlacement_2026-09-04';
const previousKey = 'npveRebuild_sidesheetOutlineFooterGlobal_2026-09-04';
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

if (schema[recordKey]) throw new Error(`${recordKey} already exists`);
if (!String(schema[previousKey]?._status || '').startsWith('DONE')) {
  throw new Error(`${previousKey} is not recorded DONE`);
}

fs.copyFileSync(schemaPath, backupPath);
schema[recordKey] = {
  _status: 'IN PROGRESS — adding an approved NPVE-local radius token and Sidesheet placement variants.',
  date: '2026-09-04',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only; library page inventory does not match the canonical schema and is not touched in this batch',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only; Sidesheetv3 129:6647 and all 54 variants used as radius evidence',
  report: 'figma-export/npve-sidesheet-radius-placement-2026-09-04/report.md',
  recordGate: `${previousKey} recorded DONE — passed`,
  userDecision: 'Create the missing token locally in NPVE Rebuild rather than changing the currently out-of-sync design-system library.',
  scope: 'Create local NPVE/Dimension radius/md=8 with CORNER_RADIUS scope; convert Sidesheet 6:65 into a three-value Figma-only Placement axis while preserving 6:65 as Floating; use 8/8/8/8 floating, 8/0/0/8 docked right, and 0/8/8/0 docked left. Preserve all existing properties/defaults, live links, geometry, content, outline, footer, source/library files, Cards, Paper, Dialog, and generic Drawer.',
  evidenceBefore: {
    source: 'All 54 Sidesheetv3 variants use 8px on all four corners; Problems 545:5239 and Medication 545:5557 match.',
    target: 'Sidesheet 6:65 and its authored instances use 0px on all four corners.',
    library: 'Published radius variables are radius/sm=4, radius/chipSmall=12, radius/chip=16, and radius/pill=24; radius/md=8 is absent.',
    code: 'MUI Drawer remains square and no production radius/md token exists. The new token is an NPVE-only design decision, not a code claim.',
    baseline: '6:65 is a non-variant component with 12 component-property definitions, 58 reference nodes / 70 reference entries, and 14 authored instances. Prior full-page enumeration found 21 rendered occurrences including nested comparison content.'
  },
  intendedApi: {
    set: 'Sidesheet component set with Placement=Floating, Docked right, Docked left.',
    default: 'Existing 6:65 becomes Placement=Floating, preserving every existing instance link.',
    existingProperties: 'All 12 existing properties and defaults remain unchanged on the set.',
    token: 'NPVE/Dimension radius/md = 8, Default mode, CORNER_RADIUS scope, no WEB syntax because no code token exists.'
  },
  stopCondition: 'Stop on file identity mismatch, duplicate local token, lost or detached instance, changed existing property/default, fewer than 70 reference entries per variant, unbound nonzero corner, fractional authored geometry, unrelated node change, or a render that does not show the correct floating/docked corners.',
  flagsAdded: []
};

fs.writeFileSync(schemaPath, `${JSON.stringify(schema, null, 1)}\n`);
console.log(`started ${recordKey}`);
