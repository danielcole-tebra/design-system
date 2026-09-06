// finalize-npve-medication-surface-correction.js — closes the recorded correction after validation.
const fs = require('fs');
const P = './design-system-schema.json';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const D = 'npveRebuild_medicationSurfaceCorrection_2026-09-04';
const r = s[D];
if (!r) throw new Error('start record is missing');
if (!String(r._status).startsWith('IN PROGRESS')) throw new Error('record is not open');
const flagsBefore = s.flags.length;
Object.assign(r, {
  _status: 'DONE. Medication summary row 219:2068 rebound to color/background/paper; all six existing instances inherited white; geometry, API, references, and unrelated content remained unchanged.',
  mutation: {
    master: '219:2068 Medication summary row',
    property: 'fills',
    before: 'color/grey/300 key 4dbef7c8fc453422675312ab6708eeda7e45476b',
    after: 'color/background/paper key f1e85cc976b10ea275c03f5d7f21a0dc12cdfee0'
  },
  verification: {
    propagation: 'PASS master plus six existing instances use paper at RGB 1/1/1',
    geometry: 'PASS all row nodes remain 518x76; body and body preview remain 518x206',
    api: 'PASS Status, Name, Dose, and Show divider definitions unchanged',
    references: 'PASS each row retains 7 references; body master and preview retain 19',
    font: 'PASS Akkurat LL only',
    rule2: 'Templates unbound non-instance paints are the six known #E4E4E4 section chrome nodes only',
    rule8: 'PASS zero non-exempt fractional authored dimensions on Templates'
  },
  decisions: [
    'User visual review overrides the earlier grey-row interpretation: medication rows are paper-white.',
    'The correction is applied at the row master so every current and future instance inherits the same token.',
    'No source, published library object, spacing, icon, or component property was changed.'
  ],
  screenshots: fs.readdirSync('./figma-export/npve-medication-surface-correction-2026-09-04').filter(f => f.endsWith('.png')).map(f => 'figma-export/npve-medication-surface-correction-2026-09-04/' + f),
  flagsAdded: [],
  flagsBefore,
  flagsAfter: s.flags.length
});
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('finalized', D, '; flags', flagsBefore, '->', s.flags.length);
