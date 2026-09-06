// Finalizes the approved global NPVE Sidesheet header-padding batch.
const fs = require('fs');

const schemaPath = './design-system-schema.json';
const recordKey = 'npveRebuild_sidesheetHeaderPaddingGlobal_2026-09-04';
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const record = schema[recordKey];

if (!String(record?._status || '').startsWith('IN PROGRESS')) {
  throw new Error(`${recordKey} is not IN PROGRESS`);
}

const flag = schema.flags.find((item) => item.id === 'npveSidesheet_headerTitleInsetConflict');
if (!flag) throw new Error('npveSidesheet_headerTitleInsetConflict not found');
flag.handling = 'Resolved by user decision in npveRebuild_sidesheetHeaderPaddingGlobal_2026-09-04. NPVE prioritizes genuine canonical 16px vertical padding; the resulting 72px Header is intentionally taller than the 64px source and the 56px library Drawer Header.';
flag.resolution = 'All three Sidesheet Headers now bind paddingTop and paddingBottom to space/16 and render at 72px with the published 40px Icon button touch targets.';

Object.assign(record, {
  _status: 'DONE. All NPVE Sidesheet Headers use token-bound 16px vertical padding and resolve to 72px; fixed sheets remain 600px and Medication bodies are preserved at 382px total height.',
  changed: {
    headers: '6:66, 279:2417, and 279:2432 changed from 550×56 with 8/8/8/16 padding to 550×72 with 16/8/16/16 padding. Top and bottom bind to published space/16.',
    fixedFlow: 'Divider y56→72; Body y57→73 and h472→456; Footer remains y529 h71. Footer-hidden Body h543→527.',
    medication: '250:3519, 253:1840, and 253:1841 changed 550×366→550×382. Body remains y73 h238; Footer moves y295→311 and remains h71.',
    changeLogs: 'Rows 160:1852, 160:1929, 254:1900, 254:1906, and 254:1924 now describe the 72px Header, 382px Medication shell, and Footer y311.'
  },
  affectedPopulation: {
    variants: 3,
    actualInstances: 16,
    Floating: 14,
    'Docked right': 1,
    'Docked left': 1,
    propagation: 'Every actual instance remains attached to its original Placement variant and inherits the 72px Header.'
  },
  preserved: {
    api: 'All 12 existing component properties/defaults plus the Placement axis are unchanged.',
    references: 'Each variant remains at 58 reference nodes / 70 reference entries.',
    interaction: 'Back and Close remain published medium 40×40 Icon button instances; no icon was swapped or redrawn.',
    style: 'Typography, text position within the 40px content row, paints, opacity, radius, four-sided outline, Body padding, and Footer padding remain token-bound and otherwise unchanged.',
    fixedSize: 'All fixed Sidesheets remain 550×600; only flexible Body height absorbs the 16px Header increase.',
    bodyContent: 'Medication active Body remains 238px; no row or action content changed.',
    externalFiles: 'Source and shared-library files remained read-only.'
  },
  verification: {
    fileIdentity: 'PASS — Cover 0:1, Templates 3:2, Screens 27:2, Archive 126:2.',
    token: 'PASS — paddingTop and paddingBottom on all three Headers resolve to published space/16 key 6016592c19254dd61e9de9e006459546eaece0bb.',
    masters: 'PASS — every Header is 72px with 16/8/16/16 padding; Title y20 h32; visible Close y16 h40; Divider y72; Body y73 h456; Footer y529 h71.',
    visibleBack: 'PASS — Show back example 6:144 renders its 40px Back control at y16. Hidden Back master coordinates are ignored because Figma does not reflow invisible auto-layout children.',
    api: 'PASS — all existing property types/defaults and Placement=Floating default are unchanged.',
    references: 'PASS — all three variants retain 70 reference entries with skipInvisibleInstanceChildren=false.',
    instances: 'PASS — 16 actual instances enumerated: 14 Floating, one Docked right, one Docked left; none detached or retargeted.',
    medication: 'PASS — screen and comparison content are 550×382 with Body y73 h238 and Footer y311 h71.',
    changeLogs: 'PASS — all five row property values read back with the new geometry.',
    paints: 'PASS — before/after visible solid-paint signatures match on all variants and the resized Medication screen; no alpha or binding changed.',
    integerGeometry: 'PASS — no fractional authored x, y, width, or height on the changed masters, instances, or rows.',
    visual: 'PASS — Problems closed, Problems status menu open, Medication, and source-versus-rebuild header renders were inspected.'
  },
  standingBatchRules: {
    '1_instancePaintVerification': 'PASS — master and live-instance paint signatures remain unchanged; resized Medication screen matches before.',
    '2_unboundPaintAudit': 'PASS by invariance — no paint, opacity, or paint binding was added or edited.',
    '3_referenceCounts': 'PASS — each variant remains 58 reference nodes / 70 reference entries.',
    '4_skipInvisibleFalse': 'PASS — figma.skipInvisibleInstanceChildren=false on every audit walk.',
    '5_opacityLast': 'PASS — opacity was not touched.',
    '6_enumerateDontRecall': 'PASS — pages, variants, 16 actual instances, affected Medication nodes, and Change log rows were enumerated from the file.',
    '7_fileIdentityFirst': 'PASS — target key and exact page identities were verified before mutation.',
    '8_roundWithRecord': 'PASS — all changed authored geometry is whole-pixel.',
    '9_boundPaintAlpha': 'PASS — no paint alpha was touched.',
    '10_cloneDropsPropertyRefs': 'N/A — no component or instance clone was made.'
  },
  screenshots: [
    'figma-export/npve-sidesheet-header-padding-global-2026-09-04/before-reference-vs-rebuild-header.png',
    'figma-export/npve-sidesheet-header-padding-global-2026-09-04/before-problems-156-2428.png',
    'figma-export/npve-sidesheet-header-padding-global-2026-09-04/before-medication-250-3519.png',
    'figma-export/npve-sidesheet-header-padding-global-2026-09-04/reference-header-545-5503.png',
    'figma-export/npve-sidesheet-header-padding-global-2026-09-04/after-header-156-2428.png',
    'figma-export/npve-sidesheet-header-padding-global-2026-09-04/reference-vs-rebuild-header-after.png',
    'figma-export/npve-sidesheet-header-padding-global-2026-09-04/after-problems-closed-156-2428.png',
    'figma-export/npve-sidesheet-header-padding-global-2026-09-04/after-problems-open-156-2707.png',
    'figma-export/npve-sidesheet-header-padding-global-2026-09-04/after-medication-250-3519.png'
  ],
  recoveryNotes: [
    'One atomic write rejected because its assertion expected the hidden Back layer to reflow. Figma preserves coordinates for invisible auto-layout children. No change was made by the rejected call; the corrected batch verified the visible Back state on instance 6:144.'
  ],
  findings: { GAP: 0, DEFECT: 1, resolved: 1 },
  flagsAdded: [],
  flagsBefore: 227,
  flagsAfter: 227,
  nextBatch: 'Not started.'
});

schema['npveRebuild_sidesheetHeaderInsetAudit_2026-09-04'].resolution_2026_09_04 = 'Approved and applied as a genuine 16px padding treatment. Header resolves to 72px, intentionally taller than both source and library Drawer.';
schema['npveRebuild_sidesheetOutlineFooterGlobal_2026-09-04'].headerPaddingAnnotation_2026_09_04 = 'Superseded for Header geometry by npveRebuild_sidesheetHeaderPaddingGlobal_2026-09-04: Header is now 72px with 16px top/bottom padding. Fixed Footer remains y529 h71; flexible Body is now y73 h456.';
schema['npveRebuild_sidesheetRadiusPlacement_2026-09-04'].headerPaddingAnnotation_2026_09_04 = 'All three Placement variants now use a 72px Header with token-bound 16px vertical padding. Radius and Placement behavior are unchanged.';
const medicationAnnotation = 'Superseded for total height by npveRebuild_sidesheetHeaderPaddingGlobal_2026-09-04: content-driven Medication placements are now 550×382 so the approved Body remains 238px under the new 72px Header; Footer is y311 h71.';
schema['npveRebuild_medicationListHeightCorrection_2026-09-04'].headerPaddingAnnotation_2026_09_04 = medicationAnnotation;
schema['npveRebuild_medicationListSidesheet_2026-09-04'].headerPaddingAnnotation_2026_09_04 = medicationAnnotation;
schema['npveRebuild_sidesheet_build_2026_09_02'].headerPaddingAnnotation_2026_09_04 = 'The earlier 56px Header specification is superseded by npveRebuild_sidesheetHeaderPaddingGlobal_2026-09-04. NPVE now uses genuine 16px top/bottom padding around the published medium Icon buttons, producing a 72px Header.';

fs.writeFileSync(schemaPath, `${JSON.stringify(schema, null, 1)}\n`);
console.log(`finalized ${recordKey}; flags remain 227`);
