// Closes the Medication List content-height correction after pixel validation.
const fs = require('fs');

const schemaPath = './design-system-schema.json';
const recordKey = 'npveRebuild_medicationListHeightCorrection_2026-09-04';
const priorKey = 'npveRebuild_medicationListSidesheet_2026-09-04';
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const record = schema[recordKey];

if (!record || !String(record._status).startsWith('IN PROGRESS')) {
  throw new Error(`${recordKey} is not open`);
}

const flag = {
  id: 'npveMedicationList_footerFixedGap',
  severity: 'medium',
  kind: 'DEFECT',
  discoveredDuring: recordKey,
  summary: 'The Medication List rebuild pinned its footer to the bottom of a 600px instance, leaving a large inactive gap below the final medication row.',
  where: 'fdCQVFdvOByaOYIJYag0d6 Screens 250:3519 and comparison helper 253:1840',
  detail: 'The shared Sidesheet master remains 550x600, but this content-driven instance now resolves to 550x351: Header 56 + divider 1 + body padding 16 + Medication list body 206 + body padding 16 + Footer 56.',
  handling: 'Resolved in the same batch. The footer now begins at y295 and directly encloses the active region; existing Problems instances remain unchanged at 550x600.'
};

if (!schema.flags.some((entry) => entry.id === flag.id)) schema.flags.push(flag);

Object.assign(record, {
  _status: 'DONE. Medication List footer now follows the active body at y295; the corrected instance is 550x351 and the comparison has been updated.',
  changed: {
    standalone: '250:3519 resized from 550x600 to 550x351; Body is 238px and Footer is 56px at y295.',
    referenceHelper: '253:1838 resized from 550x600 to the source export height 550x380 and its artificial white extension was removed.',
    rebuildHelper: '253:1840 and nested Sidesheet 253:1841 resized from 550x600 to 550x351; artificial white extension removed from the helper.',
    changeLog: 'Shell and Footer rows now describe content-driven height and the footer following active content.'
  },
  verification: {
    pixels: 'PASS — comparison-after.png visually confirms the footer immediately follows the medication rows with canonical 16px body padding.',
    geometry: 'PASS — standalone 250:3519 is 550x351; Body y57 h238; Footer y295 h56.',
    identity: 'PASS — standalone and comparison content remain live instances of Sidesheet 6:65; Medication list body remains 236:1758.',
    sharedMaster: 'PASS — Sidesheet 6:65 remains unchanged at 550x600.',
    backwardCompatibility: 'PASS — Problems Closed 156:2428 and Open 156:2707 remain unchanged at 550x600 with Footer y544 h56.',
    integerGeometry: 'PASS — all changed dimensions are whole pixels.'
  },
  screenshots: [
    'figma-export/npve-medication-list-height-correction-2026-09-04/comparison-before.png',
    'figma-export/npve-medication-list-height-correction-2026-09-04/standalone-after.png',
    'figma-export/npve-medication-list-height-correction-2026-09-04/comparison-after.png'
  ],
  flagsAdded: [flag.id],
  flagsAfter: schema.flags.length
});

schema[priorKey].supersededGeometryBy = `${recordKey}: the 550x600 Medication List presentation height was incorrect; the shared master stays 550x600, while the Medication List instance and rebuild helper are content-driven at 550x351.`;

fs.writeFileSync(schemaPath, `${JSON.stringify(schema, null, 1)}\n`);
console.log(`finalized ${recordKey}; flags=${schema.flags.length}`);
