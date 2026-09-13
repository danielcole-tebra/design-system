// finalize-npve-medication-list-body.js — closes the pre-recorded batch after Figma validation. Additive update only.
const fs = require('fs');
const P = './design-system-schema.json';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const D = 'npveRebuild_medicationListBody_2026-09-04';
const r = s[D];
if (!r) throw new Error('start record is missing');
if (!String(r._status).startsWith('IN PROGRESS')) throw new Error('record is not open');
const flagsBefore = s.flags.length;
Object.assign(r, {
  _status: 'DONE. Medication list body 236:1758 created in Templates 06 with one live preview instance; source and library read only; screenshots and audits complete; no stop condition triggered.',
  section: { id: '219:2067', name: '06 · Medications', x: 0, y: 12560, width: 1842, height: 900, chrome: '#E4E4E4 exact per user direction' },
  master: {
    id: '236:1758', size: '518x206', gap: '8px bound to space/8',
    structure: 'Published Button 211x38 at y0 + Active medication row 518x76 at y46 + Discontinued medication row 518x76 at y130',
    ownProperties: [],
    exposedNestedInstances: ['237:1764 Add New Medication', '238:1760 Active medication', '238:1778 Discontinued medication'],
    propertyReferences: 19,
    paints: '20 visible solid paints; 0 unbound'
  },
  preview: { frame: '238:1806 Medication list body — preview 582x298', instance: '238:1809 Medication list body / Default 518x206' },
  sourceMeasures: { body: '545:5572 550x240', padding: '16px vertical / 20px horizontal', addAction: '4580:30529 185x42', active: '545:5573 510x71', discontinued: '545:5589 510x71', gap: 8 },
  decisions: [
    'The body component owns inner content only; the established fixed-width Sidesheet owns the canonical 16px inset.',
    'The exact published medium contained-primary Button pattern from Problems is reused with PlusOutlined instead of redrawing the 185x42 legacy action.',
    'Active and Discontinued are instances of approved Medication summary row 219:2068; the approved row was not edited.',
    'The 8px gap between Button, Active row, and Discontinued row is bound to space/8.',
    'No parent-level duplicate API was invented; all three meaningful nested instances are exposed.'
  ],
  verification: {
    identity: 'PASS Cover 0:1 / Templates 3:2 / Screens 27:2 / Archive 126:2',
    instancePaints: 'PASS master vs preview instance: 20/20 paint signatures exact; 0 unbound',
    references: 'PASS master 19 / preview 19; nested Active 7 / Discontinued 7; approved row 7 unchanged',
    font: 'PASS all body text Akkurat LL; 0 offenders',
    rule2: 'Cover 1 pre-existing unbound; Templates 0; Screens 0; Archive 0; section chrome excluded',
    rule8: '0 non-exempt fractional width/height hits; VECTOR/GROUP exempt counts 0 / 335 / 146 / 69'
  },
  rules: {
    '1': 'PASS. Master vs placed instance 20/20 visible solid paints exact; all bound.',
    '2': 'PASS with known cover exception. Cover 1 pre-existing; Templates 0; Screens 0; Archive 0; section chrome excluded.',
    '3': 'PASS. Body master and preview 19 refs; nested rows 7 each; approved row 7 unchanged.',
    '4': 'skipInvisibleInstanceChildren=false on every reference and global audit.',
    '5': 'No new paint-level opacity authored.',
    '6': 'Names, dependencies, pages, and source measures enumerated from the files.',
    '7': 'Every Figma call passed explicit file keys; identity verified before writes.',
    '8': '0 non-exempt hits; exempt 0 / 335 / 146 / 69.',
    '9': 'No bound paint alpha changed.',
    '10': 'No component or variant clone.'
  },
  recovery: 'Two atomic Figma rejections changed nothing: guarded remote-main parent read; append-before-expose ordering. One false reference hold was resolved by the required hidden-child traversal. The local gate key was corrected before the schema start record was written.',
  screenshots: fs.readdirSync('./figma-export/npve-medication-list-body-2026-09-04').filter(f => f.endsWith('.png')).map(f => 'figma-export/npve-medication-list-body-2026-09-04/' + f),
  flagsAdded: [], flagsBefore, flagsAfter: s.flags.length
});
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('finalized', D, '; flags', flagsBefore, '->', s.flags.length);
