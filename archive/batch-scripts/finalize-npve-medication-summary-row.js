// finalize-npve-medication-summary-row.js — closes the pre-recorded batch after Figma validation. Additive update only.
const fs = require('fs');
const P = './design-system-schema.json';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const D = 'npveRebuild_medicationSummaryRow_2026-09-04';
const r = s[D];
if (!r) throw new Error('start record is missing');
if (!String(r._status).startsWith('IN PROGRESS')) throw new Error('record is not open');
const flagsBefore = s.flags.length;
Object.assign(r, {
  _status: 'DONE. Medication summary row 219:2068 created in Templates 06 with Active and Discontinued live preview instances; source and library read only; screenshots and audits complete; no stop condition triggered.',
  section: { id: '219:2067', name: '06 · Medications', x: 0, y: 12560, width: 1842, height: 900, chrome: '#E4E4E4 exact per user direction; no exact published variable exists' },
  master: {
    id: '219:2068', size: '518x76', padding: '12 / 8 / 12 / 8',
    structure: 'Details 462x52 (Status control 61x20 g4; Medication line 229x24 g8) + Actions 40x40 + absolute Divider 518x1 at y75',
    ownProperties: ['Status#223:0', 'Name#223:1', 'Dose#223:2', 'Show divider#223:3'],
    indication: 'Published Chip instance 222:1999 exposed; Label#156:0 carries the indication text.',
    propertyReferences: 7,
    paints: '10 visible solid paints; 0 unbound'
  },
  previews: {
    frame: '224:1730 Medication summary row — states 582x296',
    active: '224:1733 Losartan / 50mg / Hypertension; action and divider visible',
    discontinued: '224:1754 Sertraline / 100mg / Depression; action and divider hidden; status/caret grey/500 overrides'
  },
  sourceMeasures: { active: '545:5573 510x71', discontinued: '545:5589 510x71', padding: '12px vertical / 4px horizontal', statusGap: 4, statusToLineGap: 8, action: '40px drawn outlined circle', indicationBadgeHeight: 22 },
  decisions: [
    'Row uses 518px established sheet-body width and 76px base-8 height instead of source 510x71.',
    'Status-to-caret corrected to canonical half-step space/4 after visual QA.',
    'Source #F3F3F3 row fill maps to bound color/grey/300 #F6F6F6.',
    'Source 22px badge maps to the published 24px small outlined/default Chip.',
    'Published Icon button and DownCaret are used without inventing the source ring or filled triangle.'
  ],
  existingFlagsApplied: ['npveAudit_problemSummaryRowDrawnControls', 'npveProblemsCorrections_iconButtonNoRingedVariant', 'npveMgmt_statusCaretGlyphGap', 'npveRepair2_statusColourByOverride'],
  verification: {
    identity: 'PASS Cover 0:1 / Templates 3:2 / Screens 27:2 / Archive 126:2',
    instancePaints: 'PASS master vs Active: 10/10 paint signatures match by path, RGB, opacity, and variable key',
    renderedContent: 'PASS Active and Discontinued render Status, Name, Dose, and nested Chip Label values; divider/action visibility matches the preview intent',
    trustedBaseline: 'Problem summary row 153:1186 stayed 518x88 with 6 references before and after',
    rule2: 'Cover 1 pre-existing unbound; Templates 0; Screens 0; Archive 0; section chrome excluded',
    rule8: '0 authored fractional hits on all pages; VECTOR/GROUP exempt counts 0 / 315 / 146 / 69'
  },
  rules: {
    '1': 'PASS. Master vs Active placed instance 10/10 paints match; all bound.',
    '2': 'PASS with known cover exception. Cover 1 pre-existing; Templates 0; Screens 0; Archive 0; section chrome excluded.',
    '3': 'PASS. Medication master/Active/Discontinued 7 refs each; Problem summary row 6 unchanged.',
    '4': 'set on every audit', '5': 'none authored', '6': 'enumerated', '7': 'explicit keys and verified identity',
    '8': '0 hits; exempt 0/315/146/69', '9': 'none touched', '10': 'no clone'
  },
  recovery: 'Two atomic tool rejections left no changes: componentPropertyReferences on a non-symbol sublayer; FLOAT fontWeight variable sent to fontStyle. Corrected before successful calls.',
  screenshots: fs.readdirSync('./figma-export/npve-medication-summary-row-2026-09-04').filter(f => f.endsWith('.png')).map(f => 'figma-export/npve-medication-summary-row-2026-09-04/' + f),
  flagsAdded: [], flagsBefore, flagsAfter: s.flags.length
});
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('finalized', D, '; flags', flagsBefore, '->', s.flags.length);
