// Records the read-only NPVE Sidesheet base-8 spacing audit.
const fs = require('fs');

const schemaPath = './design-system-schema.json';
const backupPath = './design-system-schema.backup-2026-09-04-pre-npve-sidesheet-base8-spacing-audit.json';
const recordKey = 'npveRebuild_sidesheetBase8SpacingAudit_2026-09-04';
const previousKey = 'npveRebuild_sidesheetHeaderPaddingGlobal_2026-09-04';
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

if (schema[recordKey]) throw new Error(`${recordKey} already exists`);
if (!String(schema[previousKey]?._status || '').startsWith('DONE')) {
  throw new Error(`${previousKey} is not recorded DONE`);
}
if (!Array.isArray(schema.flags)) throw new Error('schema.flags is not an array');

const flags = [
  {
    id: 'npveSidesheet_problemSummaryRowNonBase8Spacing',
    severity: 'medium',
    kind: 'DECISION',
    discoveredDuring: recordKey,
    summary: 'Problem summary row uses 19px vertical padding and a 3px status-label-to-caret gap, outside a strict base-8 spacing rule.',
    where: 'NPVE Rebuild Problem summary row 153:1186; Status control 170:1590',
    detail: 'Both values were deliberate fidelity choices in npveRebuild_rowStructure_2026-09-04: 19px produces an 88px divider pitch around a 50px content block, and 3px produces a 4px visual caret gap because the chevron vector is inset by 1px.',
    handling: 'For decision. Strict base-8 recommendation: bind vertical padding to space/16 and Status control itemSpacing to space/8, accepting row height 88px -> 82px and a wider caret gap.'
  },
  {
    id: 'npveSidesheet_medicationSummaryRowNonBase8Spacing',
    severity: 'medium',
    kind: 'DECISION',
    discoveredDuring: recordKey,
    summary: 'Medication summary row uses 12px vertical padding and a 4px status-label-to-caret gap, outside a strict base-8 spacing rule.',
    where: 'NPVE Rebuild Medication summary row 219:2068; Status control 219:2070',
    detail: 'The original medication row batch called 12px a base-8 target because it produced a 76px row, but 12 is not divisible by 8. The status-control gap is bound to space/4. These values also differ from the Problem summary row values, producing the visible inconsistency noted in this audit.',
    handling: 'For decision. Strict base-8 recommendation: bind vertical padding to space/16 and Status control itemSpacing to space/8, accepting row height 76px -> 84px and a wider caret gap.'
  }
];

for (const flag of flags) {
  if (schema.flags.some((existing) => existing.id === flag.id)) {
    throw new Error(`flag already exists: ${flag.id}`);
  }
}

const flagsBefore = schema.flags.length;
fs.copyFileSync(schemaPath, backupPath);
schema.flags.push(...flags);
schema[recordKey] = {
  _status: 'READ-ONLY AUDIT COMPLETE. Sidesheet shell and body stacks are base-8 compliant; four NPVE-owned row values require a policy decision. No Figma mutation.',
  date: '2026-09-04',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6 read only in this batch',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw not opened; ownership resolved from published component metadata in the target',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq not opened; prior recorded source measurements used only to explain why the exceptions exist',
  report: 'figma-export/npve-sidesheet-base8-spacing-audit-2026-09-04/report.md',
  recordGate: `${previousKey} recorded DONE — passed`,
  auditRule: 'Every non-zero authored padding and auto-layout itemSpacing value must be divisible by 8. Strokes, radii, typography metrics, node dimensions, and imported library internals are classified separately.',
  stopCondition: 'Stop before mutation because the four local exceptions were deliberate source-fidelity decisions and normalizing them changes rendered row heights and caret spacing.',
  scope: {
    sidesheetComponentSet: '279:2446',
    variants: ['6:65', '279:2416', '279:2431'],
    liveInstances: 16,
    localDependencyRoots: 10,
    renderedLayoutNodesChecked: 788,
    localCompliantLayoutNodes: 58
  },
  localFindings: [
    { node: '153:1186', name: 'Problem summary row', property: 'paddingTop/paddingBottom', value: 19, proposed: 16 },
    { node: '170:1590', name: 'Problem summary row / Status control', property: 'itemSpacing', value: 3, proposed: 8 },
    { node: '219:2068', name: 'Medication summary row', property: 'paddingTop/paddingBottom', value: 12, proposed: 16 },
    { node: '219:2070', name: 'Medication summary row / Status control', property: 'itemSpacing', value: 4, proposed: 8 }
  ],
  cleanLocalRegions: [
    'Sidesheet shell: Header, Body, Footer, and Actions across Floating, Docked right, and Docked left',
    'Problems picker body and Problem row',
    'Problems list body containers and status groups',
    'Medication list body and Medication list footer action'
  ],
  libraryOwnedExceptions: {
    handling: 'Reported, not treated as NPVE defects. These values live inside published library components and must not be overridden in the Sidesheet consumer.',
    families: [
      'Button: 6px or 7px vertical and 17px horizontal padding',
      'Text field: 4px gap, 5px label padding, 14px input/helper padding',
      'Menu/Item: 6px vertical padding',
      'Checkbox/Form control: 9px control padding',
      'Tabs/Tab: 12px vertical padding',
      'Chip: 3px gap and 7px horizontal padding'
    ]
  },
  recommendation: {
    localBatch: 'Normalize both local row masters to 16px vertical padding and 8px status-control gaps; let row height hug intrinsic content rather than preserving 88px and 76px targets.',
    expectedGeometry: 'Problem row 88px -> 82px; Medication row 76px -> 84px; Medication Sidesheet 382px -> 398px if its content-driven footer continues enclosing active content.',
    library: 'Do not change published Button, Text field, Menu, Checkbox, Tab, or Chip internals from the NPVE file. A strict all-components base-8 rule would require a separate library audit and product decision.'
  },
  standingBatchRules: {
    '1_instancePaintVerification': 'N/A — read-only geometry audit; no component or paint created.',
    '2_unboundPaintAudit': 'N/A — no paint or binding changed.',
    '3_referenceCounts': 'N/A — no clone or component edit.',
    '4_skipInvisibleFalse': 'PASS — figma.skipInvisibleInstanceChildren=false on every audit walk.',
    '5_opacityLast': 'PASS — opacity was not touched.',
    '6_enumerateDontRecall': 'PASS — 3 variants, 16 live instances, 10 local dependency roots, and 788 rendered layout nodes were enumerated from the current artifact.',
    '7_fileIdentityFirst': 'PASS — target file, Templates page, Sidesheet set, and master IDs were verified before inspection.',
    '8_roundWithRecord': 'PASS — no geometry changed; all observed values were recorded exactly.',
    '9_boundPaintAlpha': 'PASS — no paint alpha was touched.',
    '10_cloneDropsPropertyRefs': 'N/A — no clone was made.'
  },
  screenshots: [
    'figma-export/npve-sidesheet-base8-spacing-audit-2026-09-04/problems-list-closed.png',
    'figma-export/npve-sidesheet-base8-spacing-audit-2026-09-04/problems-picker-default.png',
    'figma-export/npve-sidesheet-base8-spacing-audit-2026-09-04/medication-list.png'
  ],
  findings: { GAP: 0, DEFECT: 0, DECISION: 2, localExceptionNodes: 4, localExceptionValues: 6 },
  flagsAdded: flags.map((flag) => flag.id),
  flagsBefore,
  flagsAfter: flagsBefore + flags.length,
  figmaMutations: []
};

fs.writeFileSync(schemaPath, `${JSON.stringify(schema, null, 1)}\n`);
console.log(`recorded ${recordKey}; flags ${flagsBefore} -> ${schema.flags.length}`);
