// Records the read-only NPVE Sidesheet header inset audit.
const fs = require('fs');

const schemaPath = './design-system-schema.json';
const backupPath = './design-system-schema.backup-2026-09-04-pre-npve-sidesheet-header-inset-audit.json';
const recordKey = 'npveRebuild_sidesheetHeaderInsetAudit_2026-09-04';
const previousKey = 'npveRebuild_sidesheetRadiusPlacement_2026-09-04';
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

if (schema[recordKey]) throw new Error(`${recordKey} already exists`);
if (!String(schema[previousKey]?._status || '').startsWith('DONE')) {
  throw new Error(`${previousKey} is not recorded DONE`);
}
if (!Array.isArray(schema.flags)) throw new Error('schema.flags is not an array');

const flag = {
  id: 'npveSidesheet_headerTitleInsetConflict',
  severity: 'medium',
  kind: 'DEFECT',
  discoveredDuring: recordKey,
  summary: 'The rebuilt Sidesheet title has 12px top/bottom clearance while the source Problems header has 16px.',
  where: 'NPVE Rebuild Sidesheet Header 6:66 and source Problems Header 545:5503',
  detail: 'Rebuild: 56px header, 32px title line at y=12, 8px container padding around a 40px Icon button. Source: 64px header, 32px title line at y=16, 16px padding around a bare 24px close icon. The current design-system library Drawer Header 749:231 matches the 56px rebuild, and Drawer.example.tsx uses Box m={1}; source and library/code therefore disagree.',
  handling: 'For decision. Recommended NPVE-local construction: fixed 64px Header with the current 40px touch targets centered, preserving the 8px padding tokens and producing 16px visual title clearance. Do not set vertical padding to 16px directly because that would make the header 72px.'
};
if (schema.flags.some((existing) => existing.id === flag.id)) {
  throw new Error(`flag already exists: ${flag.id}`);
}

fs.copyFileSync(schemaPath, backupPath);
schema.flags.push(flag);
schema[recordKey] = {
  _status: 'READ-ONLY AUDIT COMPLETE. Measured 12px rebuild title clearance versus 16px source clearance; global correction is proposed but not applied.',
  date: '2026-09-04',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6 read only in this batch',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only; Drawer Header 749:231 measured',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only; Problems Header 545:5503 measured',
  _codeSource: 'C:/Code/web-app-v2/packages/design-system/src/stories/Drawer/Drawer.example.tsx lines 263-276',
  report: 'figma-export/npve-sidesheet-header-inset-audit-2026-09-04/report.md',
  recordGate: `${previousKey} recorded DONE — passed`,
  userObservation: 'Problems appears to have 12px rather than the intended 16px space above and below the title.',
  stopCondition: 'Stop before mutation because the source 64px/16px title inset conflicts with the code/library 56px/12px title inset, and because setting paddingTop/paddingBottom to 16 would create a 72px header with the existing 40px Icon buttons.',
  measurements: {
    target: 'Header 6:66 is 550×56, HORIZONTAL/HUG, padding 8/8/8/16, title 6:73 is 32px high at y=12, giving 12px top and bottom; Back and Close are 40×40 at y=8.',
    renderedProblems: '156:2428 and 156:2707 reproduce Header 56 and Problems title y=12 / h32.',
    sourceProblems: 'Header 545:5503 is 550×64, padding 16 on all sides, title 545:5504 is 32px high at y=16, giving 16px top and bottom; close icon is a bare 24×24 glyph at y=20.',
    libraryDrawer: 'Header 749:231 is 320×56, padding 8/8/8/16; title is 32px high at y=12 and published medium Icon button is 40×40 at y=8.',
    codeDrawer: 'Drawer.example.tsx uses Box m={1} (8px) and IconButton size="small". It supports the 8px Drawer spacing intent but does not reproduce the source Problems geometry exactly.'
  },
  proposedGlobalChange: {
    header: 'Set every Sidesheet variant Header to fixed 64px with centered cross-axis alignment. Keep horizontal padding 16/8, vertical padding tokens at 8, and the current 40px Back/Close touch targets. Result: title y=16, icon buttons y=12.',
    fixedSheets: 'Keep root at 550×600. Divider moves y56→64; Body moves y57→65 and shrinks 472→464; Footer remains y529 h71. Footer-hidden Body shrinks 543→535.',
    medication: 'Grow 250:3519, 253:1840, and 253:1841 from 550×366 to 550×374 so Body remains 238px; Footer moves y295→303. The comparison frame remains governed by its taller change log.',
    api: 'No component property, variant, text, icon, paint, radius, outline, or footer change.',
    rationale: 'This reaches the user-observed 16px title clearance without creating a 72px header or reducing the 40px interaction targets.'
  },
  affectedPopulation: {
    variants: 3,
    actualInstances: 16,
    Floating: 14,
    'Docked right': 1,
    'Docked left': 1
  },
  standingBatchRules: {
    '1_instancePaintVerification': 'N/A — read-only audit; no variant or paint created.',
    '2_unboundPaintAudit': 'N/A — no paint or binding changed.',
    '3_referenceCounts': 'N/A — no clone or component edit; previous batch remains the verified 70-reference baseline.',
    '4_skipInvisibleFalse': 'PASS — figma.skipInvisibleInstanceChildren=false on every audit walk.',
    '5_opacityLast': 'PASS — opacity was not touched.',
    '6_enumerateDontRecall': 'PASS — all three variants and 16 actual instances were enumerated from the current artifact.',
    '7_fileIdentityFirst': 'PASS — target pages and master IDs were verified before inspection.',
    '8_roundWithRecord': 'PASS — no geometry changed; all proposed values are whole-pixel.',
    '9_boundPaintAlpha': 'PASS — no paint alpha was touched.',
    '10_cloneDropsPropertyRefs': 'N/A — no clone was made.'
  },
  screenshots: [
    'figma-export/npve-sidesheet-header-inset-audit-2026-09-04/source-header-545-5503.png',
    'figma-export/npve-sidesheet-header-inset-audit-2026-09-04/rebuild-problems-156-2428.png',
    'figma-export/npve-sidesheet-header-inset-audit-2026-09-04/rebuild-header-156-2428.png',
    'figma-export/npve-sidesheet-header-inset-audit-2026-09-04/reference-vs-rebuild-header.png'
  ],
  findings: { GAP: 0, DEFECT: 1, resolved: 0, forDecision: 1 },
  flagsAdded: [flag.id],
  flagsBefore: 226,
  flagsAfter: 227,
  figmaMutations: []
};

fs.writeFileSync(schemaPath, `${JSON.stringify(schema, null, 1)}\n`);
console.log(`recorded ${recordKey}; flags 226 -> 227`);
