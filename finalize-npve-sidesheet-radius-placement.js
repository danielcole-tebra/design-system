// Finalizes the approved NPVE-local Sidesheet radius and placement batch.
const fs = require('fs');

const schemaPath = './design-system-schema.json';
const recordKey = 'npveRebuild_sidesheetRadiusPlacement_2026-09-04';
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const record = schema[recordKey];

if (!String(record?._status || '').startsWith('IN PROGRESS')) {
  throw new Error(`${recordKey} is not IN PROGRESS`);
}

const flags = schema.flags;
if (!Array.isArray(flags)) throw new Error('schema.flags is not an array');

const additions = [
  {
    id: 'npveSidesheet_radiusMdMissingFromLibrary',
    severity: 'medium',
    kind: 'GAP',
    discoveredDuring: recordKey,
    summary: 'The current shared design-system library has no canonical 8px radius token for the NPVE Sidesheet treatment.',
    where: 'Design System Rebuild radius variables and NPVE Rebuild Sidesheet',
    detail: 'Published radius variables are radius/sm=4, radius/chipSmall=12, radius/chip=16, and radius/pill=24. The source Sidesheet family consistently uses 8px, while the code Drawer remains square and has no radius/md token.',
    handling: 'Tracked as an intentional NPVE-local exception. NPVE/Dimension radius/md=8 is scoped to CORNER_RADIUS and has no WEB code syntax. Promote only after the shared library registry is reconciled.'
  },
  {
    id: 'npveSidesheet_squareAgainstSource',
    severity: 'medium',
    kind: 'DEFECT',
    discoveredDuring: recordKey,
    summary: 'The rebuilt floating Sidesheet was square although every source Sidesheetv3 variant uses an 8px radius.',
    where: 'NPVE Rebuild Sidesheet 6:65 and its live instances',
    detail: 'Before: 0/0/0/0. After: Floating uses 8/8/8/8; Docked right uses 8/0/0/8; Docked left uses 0/8/8/0. Every nonzero corner is bound to the NPVE-local radius/md variable.',
    handling: 'Resolved in this batch. Existing instances remain attached to 6:65 as Placement=Floating; edge-docked treatments are explicit variants.'
  }
];

for (const flag of additions) {
  if (flags.some((existing) => existing.id === flag.id)) {
    throw new Error(`flag already exists: ${flag.id}`);
  }
  flags.push(flag);
}

Object.assign(record, {
  _status: 'DONE. NPVE-local radius/md=8 is applied to a three-value Sidesheet Placement axis; all existing instances and component-property references are preserved.',
  changed: {
    token: 'Created NPVE/Dimension radius/md=8 in Default mode with CORNER_RADIUS scope. The variable key is 90d6487ce9be2aa9a84f2adb82c1d5bd90f3ae24; codeSyntax remains empty because no production token exists.',
    componentSet: 'Converted Sidesheet 6:65 into Placement=Floating inside Sidesheet component set 279:2446. Added Docked right 279:2416 and Docked left 279:2431.',
    radii: 'Floating 8/8/8/8; Docked right 8/0/0/8; Docked left 0/8/8/0, ordered top-left/top-right/bottom-right/bottom-left.',
    validationInstances: 'Added Sidesheet — Docked right 279:2613 and Sidesheet — Docked left 279:2711.',
    documentationLayout: 'Expanded section 126:2020 from 2730×1500 to 3230×1500 to fit the component set and two docked examples with 80px gaps. Existing examples remain in place.'
  },
  preserved: {
    existingDefault: '6:65 remains the default Floating component, so existing instances do not detach or retarget.',
    componentApi: 'All 12 pre-existing properties and defaults are unchanged; Placement is the only new property.',
    geometry: 'Every variant remains 550×600. Existing content, header, body, footer, outline, and padding are unchanged.',
    population: '14 actual live instances remain on Floating. A fifteenth preflight result was a virtual rendered occurrence inside another comparison instance, not a separate authored placement.',
    files: 'Source and shared-library files remained read-only. Cards, Paper, Dialog, and generic Drawer were not changed.'
  },
  verification: {
    pageIdentity: 'PASS — Cover 0:1, Templates 3:2, Screens 27:2, Archive 126:2.',
    structure: 'PASS — set 279:2446 is 1810×600 at 80,120 with three 550×600 variants spaced 80px apart; docked examples are at 1970,120 and 2600,120.',
    token: 'PASS — local radius/md exists in NPVE/Dimension, resolves to 8, is scoped to CORNER_RADIUS, and has no code syntax.',
    radiusBindings: 'PASS — every nonzero authored corner is bound to radius/md; dock-edge corners are explicitly 0.',
    api: 'PASS — 12 existing properties/defaults are preserved and Placement defaults to Floating.',
    cloneSafety: 'PASS — skipInvisibleInstanceChildren=false yields 58 reference nodes and 70 reference entries on each variant: 20 visible, 23 mainComponent, and 27 characters.',
    instances: 'PASS — existing instances remain attached to 6:65 and render their Body/Footer visibility overrides; each docked variant has one authored validation instance.',
    geometry: 'PASS — all new or changed authored geometry is whole-pixel.',
    paints: 'PASS — no paint or alpha changed; inherited fill, outline, and existing variable bindings remain intact.',
    visual: 'PASS — the component-set render and a source-versus-rebuild Problems comparison were inspected. Floating corners are visibly rounded and docked edge corners are square.'
  },
  standingBatchRules: {
    '1_instancePaintVerification': 'PASS — no paint changed; master and authored instances retain their existing bound fills and strokes.',
    '2_unboundPaintAudit': 'PASS by invariance — no paint, opacity, or paint binding was added or edited; the immediately preceding global batch completed the full-page audit.',
    '3_referenceCounts': 'PASS — all three variants have 58 reference nodes / 70 reference entries with hidden instance children included.',
    '4_skipInvisibleFalse': 'PASS — final deep reference audit set figma.skipInvisibleInstanceChildren=false.',
    '5_opacityLast': 'PASS — opacity was not touched.',
    '6_enumerateDontRecall': 'PASS — pages, variants, properties, variables, and instances were enumerated from the file.',
    '7_fileIdentityFirst': 'PASS — target key and exact page identities were verified before mutation.',
    '8_roundWithRecord': 'PASS — component set, variants, examples, and section use whole-pixel authored geometry.',
    '9_boundPaintAlpha': 'PASS — no paint alpha was touched.',
    '10_cloneDropsPropertyRefs': 'PASS — property references were reapplied after cloning and verified at 70 entries per variant plus rendered child-state reads.'
  },
  screenshots: [
    'figma-export/npve-sidesheet-radius-placement-2026-09-04/before-master-6-65.png',
    'figma-export/npve-sidesheet-radius-placement-2026-09-04/after-sidesheet-placement-variants.png',
    'figma-export/npve-sidesheet-radius-placement-2026-09-04/reference-problems-sidesheet.png',
    'figma-export/npve-sidesheet-radius-placement-2026-09-04/rebuild-problems-sidesheet.png',
    'figma-export/npve-sidesheet-radius-placement-2026-09-04/comparison-reference-rebuild.png'
  ],
  recoveryNotes: [
    'A cross-session runtime variable ID lookup rejected atomically; the successful script resolved the variable by stable key/name.',
    'The authored-instance preflight changed from 14 to 15 because getInstancesAsync included one virtual rendered instance inside a comparison component. The batch preserves all actual placements and records 14 actual Floating instances after conversion.',
    'An assertion initially counted 8 nodes carrying 12 Sidesheet-owned links; it was corrected to protect the 12 links.',
    'A default traversal reported only 12 references. The repository-standard deep traversal with skipInvisibleInstanceChildren=false reproduced 58 nodes / 70 entries on every variant.'
  ],
  flagsAdded: additions.map(({ id }) => id),
  flagsBefore: 224,
  flagsAfter: 226,
  nextBatch: 'Not started — radius/md remains local until the shared design-system library registry is reconciled.'
});

schema['npveRebuild_sidesheetOutlineFooterGlobal_2026-09-04'].radiusPlacementAnnotation_2026_09_04 = 'Sidesheet 6:65 is now Placement=Floating inside component set 279:2446. Its four-sided outline, 71px footer, and 16px vertical footer-action padding are unchanged; Docked right and Docked left variants add only corner treatment.';

fs.writeFileSync(schemaPath, `${JSON.stringify(schema, null, 1)}\n`);
console.log(`finalized ${recordKey}; flags ${record.flagsBefore} -> ${record.flagsAfter}`);
