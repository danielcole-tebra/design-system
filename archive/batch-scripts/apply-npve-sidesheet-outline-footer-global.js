// Records the start of the global Sidesheet outline and footer-padding batch.
const fs = require('fs');

const schemaPath = './design-system-schema.json';
const backupPath = './design-system-schema.backup-2026-09-04-pre-npve-sidesheet-outline-footer-global.json';
const recordKey = 'npveRebuild_sidesheetOutlineFooterGlobal_2026-09-04';
const previousKey = 'npveRebuild_medicationListHeightCorrection_2026-09-04';
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

if (schema[recordKey]) throw new Error(`${recordKey} already exists`);
if (!String(schema[previousKey]?._status || '').startsWith('DONE')) {
  throw new Error(`${previousKey} is not recorded DONE`);
}

fs.copyFileSync(schemaPath, backupPath);
schema[recordKey] = {
  _status: 'IN PROGRESS — applying the approved global Sidesheet outline and footer-action padding correction.',
  date: '2026-09-04',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only; existing imported variables only',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only; 545:5239 and 545:5557 used as outline evidence',
  report: 'figma-export/npve-sidesheet-outline-footer-global-2026-09-04/report.md',
  recordGate: `${previousKey} recorded DONE — passed`,
  scope: 'Edit shared Sidesheet 6:65 only for its four-sided outline and Footer Actions vertical padding. Preserve all component properties, width, root fixed-height behavior, body padding, horizontal footer padding, source/library content, and unrelated nodes. Increase the tight Medication List placements by 15px only to preserve their existing 238px body region after the footer grows.',
  evidenceBefore: {
    outline: 'Sidesheet 6:65 and all 21 live instances render top/right/bottom/left weights 0/0/0/1, despite both source sidesheets using 1/1/1/1.',
    footer: 'Footer Actions 6:84 is fixed 550x55 with 8px vertical padding; a 38px primary button is centered at y8.5.',
    code: 'Drawer.example.tsx:124-139 uses padding={2}; default MUI spacing resolves that to 16px.',
    variables: 'space/16 key 6016592c19254dd61e9de9e006459546eaece0bb; border/hairline key e437afaf91519b9a70c82751deb7099cf1576369; color/divider key ba1923abf373a9062e989ce3ac2068f54712d80b.'
  },
  intendedGeometry: {
    outline: '1px INSIDE on all four edges, all weights bound to border/hairline; color remains bound to color/divider.',
    actions: '550x70 with 16px top/bottom and existing 8px left/right; a 38px action sits at y16.',
    footer: '71px total = 1px divider + 70px Actions.',
    master: '550x600 remains fixed; Body changes from 487 to 472 and Footer moves from y544 to y529.',
    medicationCompatibility: 'Standalone 250:3519 and rebuild content 253:1841 change 550x351 to 550x366 so Body remains 238 and Footer remains at y295.'
  },
  affectedPopulation: '21 live instances: Templates 10, Screens 8, Archive 3.',
  stopCondition: 'Stop on component identity mismatch, lost component-property definitions or references, non-integer geometry, unbound outline/padding values, body-region shrink on Medication, unrelated diff, or a render that does not show all four edges and 16px footer padding.',
  flagsAdded: []
};

fs.writeFileSync(schemaPath, `${JSON.stringify(schema, null, 1)}\n`);
console.log(`started ${recordKey}`);
