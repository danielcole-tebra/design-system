// Opens the approved Edit Problem spacing correction before Figma mutation.
const fs = require('fs');

const P = './design-system-schema.json';
const BACKUP = './design-system-schema.backup-2026-09-04-pre-npve-problem-edit-spacing-correction.json';
const ID = 'npveRebuild_problemEditSpacingCorrection_2026-09-04';

if (!fs.existsSync(BACKUP)) fs.copyFileSync(P, BACKUP);
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s[ID]) throw new Error(`${ID} already exists`);

const gate = s['npveRebuild_problemEdit_2026-09-04'];
if (!gate || !String(gate._status).startsWith('DONE')) {
  throw new Error('Edit Problem build gate is not complete');
}

s[ID] = {
  _status: 'IN PROGRESS. Recorded before Figma mutation.',
  date: '2026-09-04',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only; no library mutation',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only; Clin_Problems-Edit 4536:27605 remains frozen evidence',
  report: 'figma-export/npve-problem-edit-spacing-correction-2026-09-04/report.md',
  recordGate: 'npveRebuild_problemEdit_2026-09-04 recorded DONE — passed',
  approvedScope: 'Correct the clipped Type Chips and normalize the Edit Problem body to the agreed 16px major-row rhythm while preserving the frozen reference.',
  sourceFacts: {
    bodyTop: 'The source places the first outlined field 16px below the header divider, but its floating label protrudes 8px upward, leaving only 8px of visible clearance.',
    statusType: 'The source uses an irregular 54px Status/Type construction and 29px pills; the first rebuild copied the compact relationship into a 56px clipping frame.',
    rowRhythm: 'Major form rows otherwise follow a 16px vertical rhythm.'
  },
  plannedChanges: [
    'Add an 8px internal top inset to Problem edit body so the floating label has 16px visible clearance inside the Sidesheet body, whose shell padding remains 16px.',
    'Resize Status and type to a fixed 64px base-8 row and vertically center its 40px Status field.',
    'Resize Type to 64px and center the 60px label-plus-gap-plus-Chips stack so both 32px Chips render fully.',
    'Update the existing Type choices change-log row to document the source-to-canonical spacing correction.',
    'Export and inspect the corrected body and comparison.'
  ],
  preserve: 'Source image, shared library, Sidesheet shell geometry and global padding, component links and properties, all other Problem edit controls, footer actions, comparison structure, defaults, tokens, paints, and opacity.',
  stopCondition: 'Stop on file/page/node identity mismatch, changed component link, unexpected instance override, detached content, paint or alpha drift, shell mutation, non-integer authored geometry, or any change outside the four approved target nodes.',
  targetNodes: ['316:3412', '316:3434', '316:3456', '318:3953'],
  findingsAtStart: {
    DEFECT: 'The 56px Type parent clips the last 4px of its 60px content stack.',
    SOURCE_DEVIATION: 'The reference uses a 54px mixed row and leaves only 8px visible clearance above the first floating label.'
  },
  standingBatchRules: {
    '1_instancePaintVerification': 'Pending.',
    '2_unboundPaintAudit': 'No paint mutation planned.',
    '3_referenceCounts': 'Pending.',
    '4_skipInvisibleFalse': 'Required on every traversal.',
    '5_opacityLast': 'No opacity change planned.',
    '6_enumerateDontRecall': 'Exact target nodes and current geometry enumerated live before mutation.',
    '7_fileIdentityFirst': 'Target file fdCQVFdvOByaOYIJYag0d6 and Templates page 3:2 verified.',
    '8_roundWithRecord': 'All authored geometry must be whole-pixel and recorded.',
    '9_boundPaintAlpha': 'No bound paint alpha may be changed.',
    '10_cloneDropsPropertyRefs': 'No clone or detach is authorized.'
  },
  screenshots: [],
  figmaMutations: []
};

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote', ID, 'and backup', BACKUP, 'flags', Array.isArray(s.flags) ? s.flags.length : 'n/a');
