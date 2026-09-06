// Finalizes the approved global Sidesheet outline and footer-padding batch.
const fs = require('fs');

const schemaPath = './design-system-schema.json';
const recordKey = 'npveRebuild_sidesheetOutlineFooterGlobal_2026-09-04';
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const record = schema[recordKey];

if (!String(record?._status || '').startsWith('IN PROGRESS')) {
  throw new Error(`${recordKey} is not IN PROGRESS`);
}

const flags = schema.flags;
if (!Array.isArray(flags)) throw new Error('schema.flags is not an array');

const additions = [
  {
    id: 'npveSidesheet_outlineOnlyLeft',
    severity: 'medium',
    kind: 'DEFECT',
    discoveredDuring: recordKey,
    summary: 'The shared Sidesheet authored only its left outline edge, so every live instance omitted the top, right, and bottom sheet boundary.',
    where: 'NPVE Rebuild Sidesheet master 6:65 and 21 live instances across Templates, Screens, and Archive',
    detail: 'Before: top/right/bottom/left weights 0/0/0/1. Both source sidesheets 545:5239 and 545:5557 use 1/1/1/1. After: all four weights are 1px INSIDE, bound to border/hairline; the stroke paint remains bound to color/divider.',
    handling: 'Resolved in the same batch at the shared master. All 21 live instances inherit the four-sided outline.'
  },
  {
    id: 'npveSidesheet_footerActionHalfPixel',
    severity: 'medium',
    kind: 'DEFECT',
    discoveredDuring: recordKey,
    summary: 'A 38px footer action was vertically centered in a fixed 55px Actions frame with 8px padding, placing it at a non-canonical y=8.5.',
    where: 'NPVE Rebuild Sidesheet Footer Actions 6:84 and all footer-visible instances',
    detail: 'DrawerFooter in web-app-v2 uses padding={2}, which resolves to 16px. Actions now hugs to 70px with 16px top/bottom and 8px left/right; Footer is 71px including its 1px divider.',
    handling: 'Resolved in the same batch. Top and bottom padding are bound to space/16, and footer action containers use whole-pixel geometry.'
  }
];

for (const flag of additions) {
  if (flags.some((existing) => existing.id === flag.id)) {
    throw new Error(`flag already exists: ${flag.id}`);
  }
  flags.push(flag);
}

Object.assign(record, {
  _status: 'DONE. Shared Sidesheet outline is four-sided and token-bound; Footer Actions use canonical 16px vertical padding. All 21 live instances were validated.',
  changed: {
    masterOutline: '6:65 top/right/bottom/left changed 0/0/0/1 → 1/1/1/1. All four weights are bound to border/hairline; INSIDE alignment and color/divider paint binding are preserved.',
    footerActions: '6:84 changed from fixed 550x55 with 8px vertical padding to HUG 550x70 with 16px top/bottom and 8px left/right. Top and bottom padding are bound to space/16.',
    footer: '6:82 now resolves to 550x71: 1px Divider + 70px Actions.',
    fixedMaster: '6:65 remains 550x600. Body is y57 h472 and Footer is y529 h71.',
    medicationCompatibility: '250:3519, 253:1840, and 253:1841 changed 550x351 → 550x366 so the existing Body y57 h238 and Footer start y295 remain unchanged.',
    medicationChangeLog: 'I254:1900;18:106 and I254:1924;18:106 now say 550x366 content-driven rebuild; corresponding Footer rows now say 71px footer with 16px vertical padding.'
  },
  affectedPopulation: {
    total: 21,
    Templates: 10,
    Screens: 8,
    Archive: 3,
    propagation: 'Every live instance inherits the master outline and footer-action padding; no instance was detached or replaced.'
  },
  verification: {
    pageIdentity: 'PASS — Cover 0:1, Templates 3:2, Screens 27:2, Archive 126:2.',
    componentIdentity: 'PASS — Sidesheet master remains 6:65; all 21 placements remain instances of 6:65.',
    api: 'PASS — all 12 component-property keys and defaults are unchanged; master reference count remains 70.',
    outline: 'PASS — master and all 21 instances read 1/1/1/1, INSIDE, with four border/hairline weight bindings and color/divider paint binding.',
    footer: 'PASS — Actions is 70px high with 16px top/bottom and 8px left/right; Footer is 71px including Divider.',
    fixedSheets: 'PASS — fixed Sidesheets remain 550x600; Body y57 h472; Footer y529 h71.',
    medication: 'PASS — standalone and comparison rebuild are 550x366; Body y57 h238; Footer y295 h71.',
    problems: 'PASS — 156:2428 and 156:2707 remain 550x600 and inherit the corrected shell.',
    paints: 'PASS — full-page audits found only intentional unbound section/cover chrome; no changed component content gained an unbound visible solid paint.',
    integerGeometry: 'PASS — no non-exempt fractional authored container dimension remains. Intrinsic centered text at x=183.5 is exempt.',
    visual: 'PASS — after renders show all four sheet edges and canonical footer breathing room on the master, Problems screens, Medication standalone, and Medication comparison.'
  },
  standingBatchRules: {
    '1_instancePaintVerification': 'PASS — master and live instances agree; changed outline paint remains color/divider.',
    '2_unboundPaintAudit': 'PASS — Cover, Templates, Screens, and Archive audited. Only intentional section/cover chrome is unbound.',
    '3_referenceCounts': 'PASS — master reference count remains 70; instances remain live.',
    '4_skipInvisibleFalse': 'PASS — used for structural and paint audits.',
    '5_opacityLast': 'PASS — no paint opacity was changed.',
    '6_enumerateDontRecall': 'PASS — all four pages and 21 instances were enumerated.',
    '7_fileIdentityFirst': 'PASS — target key and exact page identities verified before mutation.',
    '8_roundWithRecord': 'PASS — changed authored geometry is whole-pixel; intrinsic centered text is exempt.',
    '9_boundPaintAlpha': 'PASS — no bound paint alpha was touched.',
    '10_cloneDropsPropertyRefs': 'N/A — no component or instance clone was made.'
  },
  screenshots: [
    'figma-export/npve-sidesheet-outline-footer-global-2026-09-04/before-master-6-65.png',
    'figma-export/npve-sidesheet-outline-footer-global-2026-09-04/before-problems-section-156-2427.png',
    'figma-export/npve-sidesheet-outline-footer-global-2026-09-04/before-medication-250-3519.png',
    'figma-export/npve-sidesheet-outline-footer-global-2026-09-04/after-master-6-65.png',
    'figma-export/npve-sidesheet-outline-footer-global-2026-09-04/after-problems-section-156-2427.png',
    'figma-export/npve-sidesheet-outline-footer-global-2026-09-04/after-medication-250-3519.png',
    'figma-export/npve-sidesheet-outline-footer-global-2026-09-04/after-medication-comparison-254-3707.png'
  ],
  flagsAdded: additions.map(({ id }) => id),
  flagsBefore: 222,
  flagsAfter: 224,
  nextBatch: 'Not started — content-height architecture and migration remains a separate, higher-risk global batch.'
});

const annotation = 'Superseded in part by npveRebuild_sidesheetOutlineFooterGlobal_2026-09-04: canonical Footer changed 56px → 71px. Medication content-driven placements therefore changed 550x351 → 550x366 while Body y57 h238 and Footer start y295 remained unchanged.';
schema['npveRebuild_medicationListHeightCorrection_2026-09-04'].footerPaddingAnnotation_2026_09_04 = annotation;
schema['npveRebuild_medicationListSidesheet_2026-09-04'].footerPaddingAnnotation_2026_09_04 = annotation;
const priorFlag = flags.find((flag) => flag.id === 'npveMedicationList_footerFixedGap');
if (!priorFlag) throw new Error('npveMedicationList_footerFixedGap not found');
priorFlag.footerPaddingAnnotation_2026_09_04 = annotation;
schema['npveRebuild_sidesheet_build_2026_09_02'].outlineAnnotation_2026_09_04 = 'The earlier Drawer-derived left-edge-only outline decision is superseded by npveRebuild_sidesheetOutlineFooterGlobal_2026-09-04. The shared Sidesheet now uses the user-approved source-faithful four-sided 1px outline.';

fs.writeFileSync(schemaPath, `${JSON.stringify(schema, null, 1)}\n`);
console.log(`finalized ${recordKey}; flags ${record.flagsBefore} -> ${record.flagsAfter}`);
