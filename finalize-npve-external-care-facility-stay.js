// Finalizes the verified External Care History — Facility Stay rebuild batch.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_externalCareFacilityStay_2026-09-05';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const batch = s[ID];
if (!batch || !String(batch._status).startsWith('IN PROGRESS')) {
  throw new Error(`${ID} is not ready to finalize`);
}

const defect = s.flags.find((entry) => entry.id === 'npveExternalCareFacilityStay_sourceClipsForm');
if (defect) {
  defect.resolution = 'RESOLVED IN REBUILD 2026-09-05 — the shared Sidesheet body is content-driven, so Discharge to, Comments, and the footer all remain visible.';
}

batch._status = 'DONE. External Care History — Facility Stay form, body, shared Sidesheet composition, local form-surface token, frozen reference, change log, GAP marker, and sole comparison instance built and verified.';
batch.spacingPolicy = 'Canonical base 8: 16px card padding and major vertical gaps; 8px within radio groups and between the paired date controls. The 72/71px shared shell regions retain 16px action/header padding plus 1px dividers.';
batch.figmaMutations = [
  'Created NPVE/Color and the local Form surface COLOR variable at #EEF7F9 with FRAME_FILL and SHAPE_FILL scopes; no platform code syntax and no shared-library mutation.',
  'Created one reusable Facility Stay form and one Facility Stay-selected body using live library controls.',
  'Added the Facility Stay body as a preferred value of Sidesheet Body content#279:5 without changing the default.',
  'Created one content-driven shared Sidesheet instance, frozen reference, transparent rebuild helper, change-log helper, and reused GAP marker.',
  'Added the three Facility Stay helpers to the existing Rebuild comparison swaps without changing their defaults.',
  'Created one Templates section and one Screens comparison section. The comparison instance alone disables clipping on its Rebuild preview so the 853px sheet remains visible; the comparison master was not changed.',
  'Source zVsuhYehoSLLq880qRBFkq and library YX2n4YLrEpBXNbcc73T6dw remained read only.'
];
batch.createdNodes = {
  templatesSection: '388:3433',
  formSurfaceCollection: 'VariableCollectionId:387:3433',
  formSurfaceVariable: 'VariableID:387:3434',
  facilityStayForm: '389:3469',
  facilityStayBody: '391:3567',
  rebuildHelper: '392:3672',
  sidesheetInstance: '392:3673',
  referenceHelper: '392:4091',
  referenceImage: '392:4092',
  changeLogHelper: '392:4093',
  screensSection: '393:7688',
  comparisonInstance: '393:7689',
  reusedGapMarker: '394:5611'
};
batch.verification = {
  visual: 'PASS — form, rebuilt Sidesheet, and full reference-versus-rebuild comparison inspected at native resolution.',
  shell: 'PASS — 550x853 content-driven Sidesheet; 72px header, 677px body content inside a 709px body region, and 71px footer immediately after the active body.',
  completeForm: 'PASS — Facility Type, Facility Name, Admission Date, Discharge Date, Related to problem, Prior Event, Discharge to, and Comments are all visible; the source clipping defect is not reproduced.',
  spacing: 'PASS — form padding 16; all major row gaps 16; radio label-to-options gaps 8; date-pair gap 8.',
  reuse: 'PASS — 5 live Text field instances, 7 live Form control label instances backed by Radio, 2 Calendar instances, 2 Tab instances, 1 Icon button with TrashOutlined, shared Sidesheet, and shared footer Buttons retained.',
  tokens: 'PASS — Form surface resolves to #EEF7F9 from local VariableID:387:3434; every input surface resolves to bound paper white; Sidesheet body picker includes the new body key.',
  renderedPaints: 'PASS — #EEF7F9 and paper-white bindings survive from masters through the body and the sole comparison instance; opacity is 1.',
  geometry: 'PASS — owned frames, components, instances, sections, and reference rectangle use whole-pixel geometry; no owned fractional layout values.',
  fonts: 'PASS — Akkurat LL throughout the created scope; no free-standing or design-system-governed font mismatches.',
  reference: 'PASS — frozen 1100x1184 source PNG placed at 550x592 with image hash 3948121be91cee111b12e1b5c353431d40466701.',
  singlePlacement: 'PASS — reference, rebuild, and change-log helpers each have exactly one instance on Screens; exactly one Facility Stay comparison exists.',
  propertyReferences: 'N/A — no component variant was cloned or combined; tab state changed by swapping live Tab variants.',
  unboundPaintAudit: 'PASS WITH EXPECTED DOCUMENTATION EXCEPTIONS — all four pages and every top-level node were walked. In the new scope, owned unbound paints are only the two Figma Section canvas fills/strokes and the frozen reference IMAGE fill. New product components have no owned unbound paint.',
  sourceAndLibrary: 'PASS — no writes to zVsuhYehoSLLq880qRBFkq or YX2n4YLrEpBXNbcc73T6dw.',
  screenshots: [
    'figma-export/npve-external-care-facility-stay-2026-09-05/source-reference-2x-648-1603.png',
    'figma-export/npve-external-care-facility-stay-2026-09-05/rebuild-form-final-389-3469.png',
    'figma-export/npve-external-care-facility-stay-2026-09-05/rebuild-sidesheet-392-3672.png',
    'figma-export/npve-external-care-facility-stay-2026-09-05/comparison-393-7689.png'
  ]
};
batch.findings = { GAP: 1, DEFECT: 1, DECISION: 1 };
batch.existingGapReused = ['npveProblemEdit_textFieldNoEndAdornment'];
batch.flagsAfter = s.flags.length;
batch.nextBatch = 'Return to the bounded candidate queue and select the next source only after its own audit and pre-write plan.';

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('finalized', ID, 'flags', s.flags.length);
