const fs = require('fs');

const schemaPath = './design-system-schema.json';
const recordId = 'npveRebuild_noteHeaderLayout_2026-09-08';
const gateId = 'npveRebuild_moduleChipRelationshipSpacing_2026-09-06';

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

if (!schema[gateId] || !String(schema[gateId]._status).startsWith('DONE')) {
  throw new Error(`${gateId} is missing or is not DONE`);
}

if (schema[recordId]) {
  throw new Error(`${recordId} already exists`);
}

const priorFlag = schema.flags.find(
  (flag) => flag.id === 'npveEncounter_footerSpacerWasFixed'
);

if (!priorFlag) {
  throw new Error('npveEncounter_footerSpacerWasFixed flag is missing');
}

priorFlag.handling =
  'Resolved 2026-09-08: the Note header now uses semantic left/right groups with SPACE_BETWEEN; the former fixed spacer is hidden and marked superseded.';
priorFlag.note_2026_09_08_noteHeaderLayout =
  'Resolved in npveRebuild_noteHeaderLayout_2026-09-08. Header identity uses space/8; status and actions use space/16; action buttons use space/8; outer padding is space/16.';
priorFlag.resolution =
  'Resolved 2026-09-08 in npveRebuild_noteHeaderLayout_2026-09-08.';

schema[recordId] = {
  _status:
    'DONE. The shared Note card header now uses semantic identity, status/action, and action groups; related items use space/8, semantic groups use space/16, all outer padding is space/16, and the trailing controls remain anchored to the right edge. The card stays 831x748, the component API and sole placed comparison instance remain linked, and one plain-language change-log row was added.',
  date: '2026-09-08',
  workstream: 'NPVE Rebuild / Encounter page',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only',
  _sourceFile:
    'zVsuhYehoSLLq880qRBFkq read only (Encounter frame 4841:17077; Note module 4841:17104)',
  report: 'figma-export/npve-note-header-layout-2026-09-08/report.md',
  recordGate: `${gateId} recorded DONE — passed`,
  stopCondition:
    'Stop if the existing Title or Status text properties break, if the placed Note instance detaches, if the card changes from 831x748, if the toolbar/body/footer chain misaligns, or if a new icon stand-in is required.',
  operatorDecision:
    'Use the canonical base-8 system even when it makes the header taller than the source: 16px outer padding; 8px within related identity/action pairs; 16px between semantic groups.',
  sourceFacts: {
    geometry:
      'The source Note module is 831x748. Its header is 65px, with 12px vertical and 16px horizontal padding; the toolbar is 58px.',
    layout:
      'The source title group fills available width, so Auto-saved, Expand, and Close stay at the right edge.',
    icons:
      'The source uses shield-lock, expand, person-heart, template-list, and microphone glyphs that the published library does not fully provide.'
  },
  implemented: {
    master:
      'Note card 424:4362 remains 831x748. Header 424:4363 is 831x72 with SPACE_BETWEEN and space/16 on all four padding sides.',
    identity:
      'New Header identity 500:5745 contains the existing shield/lock control 424:4364 and Title 424:4369 at space/8.',
    trailing:
      'New Header status and actions 500:5747 contains existing Auto-saved 424:4371 and Header actions 500:5746 at space/16. Header actions contains existing Expand 424:4379 and Close 424:4383 at space/8.',
    superseded:
      'Former fixed Spacer 424:4370 is hidden and renamed SUPERSEDED 2026-09-08; it was not deleted.',
    downstream:
      'Header divider moved to y72, Toolbar to y73, and Body to y131. Body height reduced to 542 so Footer divider remains y673 and Footer remains y674; the overall card height is unchanged.',
    changeLog:
      'Added Change log/Row 505:5754 to the existing Encounter helper: Note header layout | Fixed 10px spacer and 12px vertical padding → semantic left/right groups with 16px padding | Keeps status and actions at the right edge; follows the approved base-8 spacing.'
  },
  tokens: {
    space8:
      'VariableID:183d5d946d268e8bd37735b8b0dc95111c46eddd/997:15; bound to Header identity and Header actions itemSpacing.',
    space16:
      'VariableID:6016592c19254dd61e9de9e006459546eaece0bb/997:24; bound to Header itemSpacing and all padding sides, plus Header status and actions itemSpacing.'
  },
  verification: {
    componentApi:
      'PASS — Title, Status text, Body content, Show footer, Show toolbar, and Toolbar content definitions are unchanged; Title and Status text references remain connected.',
    placement:
      'PASS — sole placed Note instance I434:7474;434:4866;434:4394;429:4542 remains linked to 424:4362 at 831x748 with all six properties intact.',
    geometry:
      'PASS — 27 authored nodes traversed; zero fractional authored x/y/width/height values.',
    paints:
      'PASS — 27 authored nodes traversed; zero unbound solid fills or strokes. Nested library instances were treated as instance boundaries.',
    pixels:
      'PASS — standalone Note master versus the Note crop from Page/Encounter differs at 78 of 621,588 pixels, confined to the four outer rounded-border/crop antialias edges; maximum channel delta 246.',
    visual:
      'PASS — reference and rebuild header/toolbar crops inspected side by side. The rebuilt status and action controls are right-aligned, no text is clipped, and the taller 16px header padding is intentional.',
    changeLog:
      'PASS — row 505:5754 is a live instance of Change log/Row 18:103; the helper grows to 480x2063 and the sole comparison grows to 2005x2155 without clipping.'
  },
  standingBatchRules: {
    '1_instancePaintVerification':
      'PASS — the master and its placed page instance were rendered after the edit.',
    '2_unboundPaintAudit':
      'PASS — zero unbound solid paints across the 27 authored Note card nodes.',
    '3_referenceCounts':
      'PASS — one placed Note instance in the sole Encounter comparison; one new change-log row; component property definitions unchanged.',
    '4_skipInvisibleFalse': 'PASS — set before every audit walk.',
    '5_opacityLast': 'PASS — no opacity changed.',
    '6_enumerateDontRecall':
      'PASS — source hierarchy, target hierarchy, imported variable IDs, component API, and comparison placement were read live.',
    '7_fileIdentityFirst':
      'PASS — target, source, and library file keys were explicit; source and library were read only.',
    '8_roundWithRecord':
      'PASS — schema backup preceded the Figma write; zero fractional authored geometry.',
    '9_boundPaintAlpha': 'PASS — no paint or alpha changed.',
    '10_cloneDropsPropertyRefs':
      'PASS — existing header nodes were reparented rather than cloned; Title and Status text property references survived.'
  },
  counts: {
    GAP: 5,
    DEFECT: 0,
    newMarkers: 0,
    newHeaderGroups: 3,
    changeLogRows: 18,
    placedNoteInstances: 1
  },
  flagsBefore: schema.flags.length,
  flagsAdded: [],
  flagsAfter: schema.flags.length,
  screenshots: [
    'figma-export/npve-note-header-layout-2026-09-08/comparison-note-header-toolbar.png',
    'figma-export/npve-note-header-layout-2026-09-08/source-note-header-toolbar.png',
    'figma-export/npve-note-header-layout-2026-09-08/rebuild-note-header-toolbar.png',
    'figma-export/npve-note-header-layout-2026-09-08/source-note-card-4841-17104.png',
    'figma-export/npve-note-header-layout-2026-09-08/rebuild-note-card-424-4362.png',
    'figma-export/npve-note-header-layout-2026-09-08/placed-note-card-from-page.png',
    'figma-export/npve-note-header-layout-2026-09-08/source-encounter-4841-17077.png',
    'figma-export/npve-note-header-layout-2026-09-08/rebuild-encounter-429-4161.png',
    'figma-export/npve-note-header-layout-2026-09-08/comparison-encounter-434-7474.png'
  ]
};

fs.writeFileSync(schemaPath, `${JSON.stringify(schema, null, 1)}\n`);
console.log('applied', recordId, 'flags', schema.flags.length);
