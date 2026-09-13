// Closes the Edit Problem spacing correction after structural and visual validation.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_problemEditSpacingCorrection_2026-09-04';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const r = s[ID];

if (!r || !String(r._status).startsWith('IN PROGRESS')) {
  throw new Error(`${ID} is missing or not open`);
}

const required = [
  './figma-export/npve-problem-edit-spacing-correction-2026-09-04/report.md',
  './figma-export/npve-problem-edit-spacing-correction-2026-09-04/before-comparison.png',
  './figma-export/npve-problem-edit-spacing-correction-2026-09-04/after-body.png',
  './figma-export/npve-problem-edit-spacing-correction-2026-09-04/after-comparison.png'
];
for (const file of required) if (!fs.existsSync(file)) throw new Error(`Missing artifact: ${file}`);
if (!Array.isArray(s.flags) || s.flags.length !== 230) throw new Error('Unexpected flags[] change');

Object.assign(r, {
  _status: 'DONE. Edit Problem vertical rhythm is normalized and the clipped Type Chips are corrected and verified in the live Sidesheet.',
  figmaMutations: [
    'Added 8px top inset to Problem edit body 316:3412, producing 16px visible clearance above the first floating label without changing the global Sidesheet body padding.',
    'Resized Status and type 316:3434 from 56px to 64px and centered the 40px Status field.',
    'Resized Type 316:3456 from 56px to 64px and centered its 60px content stack so both 32px Chips render fully.',
    'Updated Change log row 318:3953 to document the source spacing deviation and the canonical correction.'
  ],
  verification: {
    fileIdentity: 'PASS — target file fdCQVFdvOByaOYIJYag0d6, Templates page 3:2, and all four approved node identities matched.',
    shell: 'PASS — live Sidesheet remains 550x600, linked to 6:65, with its body shell still at 16px top and side padding.',
    verticalRhythm: 'PASS — visible top clearance is 16px; every major row gap is 16px.',
    clipping: 'PASS — Type choices occupy y=30..62 inside a 64px frame; Acute and Chronic are complete.',
    propagation: 'PASS — live Body content inherited 518x304, 8px top inset, 16px gaps, and the 64px Status/Type row.',
    components: 'PASS — all nested Text field, Chip, and Calendar controls retain main-component links.',
    paints: 'PASS — body master and live body each expose 64 normalized visible paint entries with exact parity.',
    geometry: 'PASS — all authored correction geometry is integer; fractional values are limited to inherited vector paths.',
    preserve: 'PASS — source, library, global shell, footer, defaults, tokens, paints, and opacity were not mutated.',
    visual: 'PASS — corrected body and full comparison screenshots were rendered and inspected.'
  },
  standingBatchRules: {
    '1_instancePaintVerification': 'PASS — 64 normalized body-master entries equal 64 live-instance entries exactly.',
    '2_unboundPaintAudit': 'PASS — no paint mutation occurred.',
    '3_referenceCounts': 'PASS — all existing component links resolve.',
    '4_skipInvisibleFalse': 'PASS — figma.skipInvisibleInstanceChildren=false on every audit traversal.',
    '5_opacityLast': 'PASS — opacity was not changed.',
    '6_enumerateDontRecall': 'PASS — exact current geometry, links, shell padding, and comparison properties were enumerated live.',
    '7_fileIdentityFirst': 'PASS — file, page, and node identities were verified before mutation.',
    '8_roundWithRecord': 'PASS — all authored correction geometry is whole-pixel and recorded.',
    '9_boundPaintAlpha': 'PASS — no bound paint alpha was changed.',
    '10_cloneDropsPropertyRefs': 'PASS — no clone or detach occurred.'
  },
  screenshots: [
    'figma-export/npve-problem-edit-spacing-correction-2026-09-04/before-comparison.png',
    'figma-export/npve-problem-edit-spacing-correction-2026-09-04/after-body.png',
    'figma-export/npve-problem-edit-spacing-correction-2026-09-04/after-comparison.png'
  ],
  findings: { GAP: 0, DEFECT: 0, DECISION: 0, resolved: 1 },
  flagsAdded: [],
  flagsBefore: 230,
  flagsAfter: 230,
  recoveryNotes: [
    'The original defect came from a 60px content stack being placed inside a fixed 56px clipping frame.',
    'The correction remained limited to the body master and one comparison annotation; the inherited screen updated through its existing component link.'
  ],
  nextBatch: 'Not started — await operator review of the corrected comparison.'
});

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('finalized', ID, 'flags', s.flags.length);
