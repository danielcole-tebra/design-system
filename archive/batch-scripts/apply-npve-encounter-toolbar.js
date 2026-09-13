// apply-npve-encounter-toolbar.js — records npveRebuild_encounterToolbar_2026-09-06. Backup taken before the batch; re-copied only if missing. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
const B = './design-system-schema.backup-2026-09-06-pre-npve-encounter-toolbar.json';
if (!fs.existsSync(B)) fs.copyFileSync(P, B);
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const D = 'npveRebuild_encounterToolbar_2026-09-06';
if (s[D]) throw new Error('record already exists');
const flagsBefore = s.flags.length;
const F = 'figma-export/npve-encounter-toolbar-2026-09-06/';

s[D] = {
  _status: 'DONE. Two shell corrections (Note card footer Sign control now a Button contained/secondary with an End icon DownCaret, the Split button hidden and marked superseded; Module strip now carries all nine source modules with five new selected=no chips exposed as swaps) and the toolbar row built as a local Note toolbar component in the Note card\'s Toolbar slot, per source 3456:11505 with the 4841:17077 state placed. Transcription status built minimal as a local piece and marked as the audit\'s invention row 15. One shared GAP marker for the toolbar glyph gaps. Change log at fifteen rows. No stop condition triggered.',
  date: '2026-09-06',
  workstream: 'NPVE Rebuild / Encounter page',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only (components, variables and the h5 text style imported by key inside the script that used them)',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only (3456:11505 toolbar row and 4841:17077 toolbar state and module strip read)',
  report: F + 'report.md',
  recordGate: 'npveRebuild_encounterShell_2026-09-06 recorded — passed',
  stopCondition: 'Stop if any region needs a drawn stand-in beyond the module chips. Nothing was drawn: the Transcription status piece is a library radio glyph and a styled text in an auto-layout frame.',
  readFirst: 'CLAUDE.md; npveRebuild_encounterShell_2026-09-06; Workflows audit conventions rows 12–17 (pill dropdown buttons, mic pill, Start Transcribing pill, transcription status states, Print pill, Sign split button).',
  step1_corrections: {
    footer: {
      noteCard: '424:4362',
      newSign: '464:5852 Button variant=contained color=secondary size=medium, Label "Sign", Start icon off, End icon on, End icon swap Icon/DownCaret (import key 9014d342…); 91x38; fill and stroke bound color/secondary/main #FF8D6E (rendered on the placed instance)',
      supersededSplitButton: '424:4417 hidden and renamed "SUPERSEDED 2026-09-06 — Sign (Split button); replaced by the Button beside it; listed for manual removal". Not deleted (rule 1). Its nested segments could not be un-exposed (Figma: only primary instances expose); they are hidden with the parent.',
      spacer: '424:4402 Spacer changed FIXED 10 → FILL so Charge Capture / Save & Close / Sign / More sit at the right edge as in the source (the shell batch had left them beside Confidential). Header spacer 424:4370 has the same FIXED 10 and is left for the next batch (flag).',
      changeLogRow: 'Footer row amended honestly: single salmon button with a caret, not a split button.',
      libraryFlagKept: 'npveEncounter_splitButtonLabelNotAProperty stays OPEN as a library finding.'
    },
    moduleStrip: {
      id: '426:4214',
      chipsAdded: [
        'Chip 4 465:5473 Vitals — Icon/Clinical (vitals glyph gap; the library glyph ships white, fill bound color/text/primary on the chip)',
        'Chip 5 465:5481 Care Team — Icon/UserGroupFilled (covers)',
        'Chip 6 465:5492 Labs/Studies — Icon/Reports (lab glyph gap; ships white, fill bound color/text/primary on the chip)',
        'Chip 7 465:5505 Allergies — Icon/AttentionOutlined (allergy glyph gap)',
        'Chip 8 465:5517 Timeline — Icon/Calendar (timeline glyph gap)'
      ],
      sourceOrder: 'Modules · Note · Problems · AI Summary · Vitals · Care Team · Labs/Studies · Allergies · Timeline (4841:17077 Modules_HFlex; the six unselected chips carry no close glyph in the source)',
      showClose: 'Chip 3 AI Summary Show close true → false to match the source; chips 4–8 built with Show close false',
      chip2GlyphFix: 'Chip 2 Problems (Icon/Clinical) rendered a white glyph on the pale teal chip since the shell batch; its vector fill is now bound color/text/primary like chips 4 and 6',
      exposure: 'All five new chips exposed (isExposedInstance true) and given INSTANCE_SWAP properties Chip 4#465:0 … Chip 8#465:4; eight of eight chips exposable, no property limit reached',
      widths: 'Modules 122, chips 120/150/135/93/125/144/113/112; strip 1397x40 (source chips 127/85/117/136/105/104)',
      referenceEntries: 35
    }
  },
  step2_toolbar: {
    noteToolbar: {
      id: '468:5582', name: 'Note toolbar', size: '799x42 fixed width, hug height', layout: 'HORIZONTAL gap bound space/8, centre aligned; Left group 468:5583 FILL gap space/16; Right group 468:5584 HUG gap space/8 MAX aligned (source: two 352 FILL halves; HUG on the right avoids the 395.5 half-pixel split of 791)',
      pills: [
        'Template pill 468:5585 Button contained/primary medium, Label "Template: SOAP", Start icon Icon/List (source list_alt), End icon Icon/DownCaret; 200x38 (source 193x42)',
        'Assigned To pill 468:5595 Label "Assigned To", Start icon Icon/UserOutlined (source person_heart), End icon DownCaret; 171x38 (source 168x42)',
        'Date pill 468:5604 Label "Date", Start icon Icon/Calendar (covers), End icon DownCaret; 118x38; boolean Show date#468:0 default false (off in the 4841 state)',
        'Mic device pill 468:5613 Label "", Start icon Icon/Telehealth (GAP: no mic glyph), End icon DownCaret; 82x38 (source 78x40)',
        'Print pill 468:5622 Label "Print", Start icon Icon/PrintOutlined (covers), no caret; 95x38 (source 90x42); boolean Show print#468:1 default false'
      ],
      statusSlot: 'Transcription status slot 468:5612 (auto-layout, hug) holding instance 469:5832 of Transcription status/Start; INSTANCE_SWAP property Transcription status#469:1 default 469:5827, exposed',
      properties: ['Show date#468:0', 'Show print#468:1', 'Transcription status#469:1', 'five exposed pill instances (Label, icons editable through the Button properties)'],
      referenceEntries: 19,
      deltas: 'Library wins: 38 tall vs 42 (40 on the mic pill); stroke color/primary/main vs the mockup #8CA7A2; Akkurat 14 label per the Button medium size vs the mockup Regular 14; the 3456 filled states (SOAP:Modified, Dr. Steven Strange, Appointment) are Label edits on the exposed pills, not variants'
    },
    transcriptionStatus: {
      id: '469:5827', name: 'Transcription status/Start (INVENTION: audit row 15, no library inline status toggle)', size: '167x42 (source 167x42)', layout: 'HORIZONTAL gap space/8, padding left/right space/8, centre aligned, no fill',
      parts: 'Radio dot = Icon/RadioChecked (MUI) 24 with its vector fill bound color/primary/light #417E86 (source radio_button_checked #417E86); Label "Start Transcribing" h5 (Akkurat LL Bold 14/20, imported style key 2ede1d5b…) fill bound color/primary/light; TEXT property Label',
      otherStates: 'Not built this batch: italic "Transcription in Progress" with Pause / Finish pills, hidden "Ready to Record" salmon strip, and the 3456 "Start Transcribing" pill state (record_voice_over glyph — transcribe glyph gap, candidate 28). They join as further Transcription status/<state> components swapped into the slot.',
      referenceEntries: 1
    },
    noteCardWiring: 'Toolbar slot 424:4388 renamed "Toolbar"; holds Toolbar content instance 469:9852 (FILL, 799x42, centred in the 58 slot); Note card property Toolbar content#469:2 INSTANCE_SWAP default 468:5582, exposed; Show toolbar#424:4 reference on the slot verified unchanged before and after. Note card reference entries 32 → 47.',
    glyphGaps: 'One shared GAP marker 473:9782 "GAP marker — Toolbar glyphs" on Screens at (2120, 2230), cloned from 429:6887 with the example swapped to the Transcription status piece; cites candidates 27 (mic), 28 (transcribe), 29 (person-heart), 30 (template-list). Module chips marker 429:6878 Difference text extended with the five chips, candidate 31 (vitals, lab, allergy, timeline glyphs) and candidate 32 (Icon/Clinical and Icon/Reports ship white glyphs).'
  },
  step3_comparison: {
    instance: '434:7474 sole placement, 2005x2154 unchanged (the Screens column is the taller one); toolbar shows through the Page/Encounter → Note card → Toolbar content chain (I434:7474;434:4866;434:4394;429:4542;469:9852)',
    section: '429:6859 grown 2600x2500 → 2600x3200 to hold the fifth marker (bottom 2712)',
    changeLogHelper: '434:4745: Content card 434:4746 set to hug height (was fixed 1198; the rows overflowed after the additions); now 480x1772 with 15 Change log/Row instances, reference entries 45',
    changeLogRows: {
      amended: [
        'Module chips | Drawn chips → local chips, marked; all nine modules present in the mockup order | The library chip cannot be 40 tall with a close; marked as a gap. Vitals, Labs/Studies, Allergies and Timeline wear stand-in glyphs',
        'Toolbar | Template, Assigned To and recording pills → library pills for Template and Assigned To, a Start Transcribing status, and a mic pill | Shared button; 38 tall instead of 42 and a teal outline instead of the mockup grey-green; Date and Print pills built but switched off in this state',
        'Footer | Drawn buttons and a checkbox → library buttons and checkbox; Sign is a single salmon button with a caret | The mockup Sign control is one button with a caret, not a split button; the more button shows a horizontal ellipsis'
      ],
      added: [
        'Toolbar glyphs | Material list, person-heart and mic glyphs → library list, outlined user and telehealth glyphs | The library has no template-list, person-heart or mic glyph; marked as one gap',
        'Start Transcribing | Drawn radio dot with bold teal text → library radio glyph with bold teal text, kept as a small local piece | Nothing in the library expresses an inline status toggle; marked as an invention',
        'Mic pill | Mic glyph with a caret, 78 wide → library pill with a stand-in glyph and a caret, 82 wide | Shared button; the glyph is a gap'
      ],
      rowIds: { toolbarGlyphs: '470:5718', startTranscribing: '470:5724', micPill: '470:5730' }
    },
    regionCompares: {
      moduleStrip: 'source (16,193) 1397x40 vs rebuild (16,169): same nine modules and order; chip widths differ by the glyph and label widths; fills primary/100 vs #DFEAEC as recorded',
      noteToolbar: 'source (582,314) 831x58 vs rebuild (582,290): same composition left to right — Template, Assigned To, status, mic pill; pills 38 tall vs 42, teal outline vs grey-green, glyph stand-ins',
      noteFooter: 'source (582,927) 831x70 vs rebuild 831x74: Confidential left, buttons right in both; Sign single button with caret in both; bold label in the mockup vs the library Button label; kebab vertical vs horizontal',
      files: ['region-module-strip-source-over-rebuild.png', 'region-note-toolbar-source-over-rebuild.png', 'region-note-footer-source-over-rebuild.png']
    },
    pixelDiffs: 'Placed comparison (rebuild page origin 32,1133) vs master renders composited on white: Note card 0 of 621 588 px differ; Module strip 0 of 55 880. The standalone Note toolbar render carries the Templates section backdrop behind its transparent frame, so it was diffed through the Note card crop (which contains it) rather than alone.'
  },
  step5_verification: {
    renders: ['master-note-card-424-4362-1x.png', 'master-module-strip-426-4214.png', 'master-note-toolbar-468-5582.png', 'master-transcription-status-469-5827.png', 'comparison-encounter-shell-434-7474-1x.png', 'screens-section-15-429-6859.png', 'templates-section-15-424-4085-at3150.png', 'gap-marker-toolbar-glyphs-473-9782.png', 'gap-marker-module-chips-429-6878.png', 'crop-comparison-note-header-toolbar.png', 'crop-comparison-change-log-column.png'],
    fixesAfterFirstLook: ['Module chips: Icon/Clinical and Icon/Reports rendered invisible (white glyph) on the unselected chips → fills bound text/primary; Labs/Studies swapped from Icon/Survey (a chat bubble) to Icon/Reports; Timeline from Icon/Reports to Icon/Calendar', 'Note toolbar: two FILL groups split 791 into 395.5 halves → right group HUG (534 / 257)', 'Transcription status label: created at the default 12 → h5 style imported and applied (14/20 bold)', 'Change log Content card fixed 1198 tall with 1715 of rows → hug', 'Footer Spacer FIXED 10 → FILL (source buttons are right-aligned)'],
    audits: { templatesSection15: '1 524 nodes walked, 0 unbound paints, 0 fractional dimensions on the edited masters (vector path bounds excluded per rule 8)', screensSection15: '504 nodes walked, 0 unbound paints, 0 detached comparisons, 16 Sidesheet occurrences and 16 comparisons on Screens (Social History added one concurrently)' },
    referenceCounts: { 'Note card': 47, 'Module strip': 35, 'Module chip': 6, 'Note toolbar': 19, 'Transcription status/Start': 1, 'Page/Encounter': 157, 'Rebuild comparison/Page': 208, 'Change log helper': 45 },
    rule10Check: 'Placed Template pill: property value "Template: SOAP" and rendered characters "Template: SOAP" agree; exposed'
  },
  standingBatchRules: {
    '1_instancePaintVerification': 'PASS — rendered on the placed page: Sign fill/stroke #FF8D6E op1 bound color/secondary/main; Chip 6 stroke #D6D6D6 bound color/divider, no fill; status text #417E86 bound color/primary/light, styled h5 14; radio glyph #417E86 bound color/primary/light',
    '2_unboundPaintAudit': 'PASS — 0 unbound in Templates 15 (1 524 nodes) and Screens 15 (504 nodes)',
    '3_referenceCounts': 'PASS — counts above; Note card 32 → 47, Module strip 17 → 35, toolbar 19, status 1, comparison master 208, change log helper 45',
    '4_skipInvisibleFalse': 'PASS — set on every walk',
    '5_opacityLast': 'PASS — no paint-level opacity set',
    '6_enumerateDontRecall': 'PASS — chips, toolbar and rows enumerated from the file',
    '7_fileIdentityFirst': 'PASS with a finding — target identity confirmed against the shell record\'s node ids; library reads used YX2n4YLrEpBXNbcc73T6dw explicitly. The library page list (Cover, Foundations, Reference, Actions, Inputs, Data display, Feedback, Surfaces & navigation, Icons & illustrations, Compositions, Layouts) no longer matches figmaBuild.pages._order (Cover, Tokens, …, Reference) — flag',
    '8_roundWithRecord': 'PASS — half-pixel group split removed; hidden Date/Print pills re-laid so no stale fractional x remains',
    '9_boundPaintAlpha': 'PASS — no bound paint opacity touched',
    '10_cloneDropsPropertyRefs': 'PASS — the only clone is the GAP marker frame (no property refs); the change-log rows are createInstance, not clones; rendered-vs-property check on the placed Template pill agrees'
  },
  libraryTodoCandidates: {
    27: 'Icon: mic glyph (toolbar mic device pill; Icon/Telehealth stands in)',
    28: 'Icon: transcribe / record_voice_over glyph (Start Transcribing pill state; not placed this batch)',
    29: 'Icon: person-heart glyph (Assigned To pill; Icon/UserOutlined stands in)',
    30: 'Icon: template-list / list_alt glyph (Template pill; Icon/List stands in — may be judged close enough)',
    31: 'Icons: vitals, lab tube, allergy shield and timeline glyphs for the module chips (Icon/Clinical, Icon/Reports, Icon/AttentionOutlined, Icon/Calendar stand in)',
    32: 'Icon/Clinical and Icon/Reports ship with white glyphs bound color/common/white (nav icons); unusable on light surfaces without a fill override'
  },
  counts: { GAP: 5, DEFECT: 0, rows: 15, newMasters: 2, chipsAdded: 5, chipsExposed: '8 of 8' },
  screenshots: F
};

const flags = [
  { id: 'npveEncounter_toolbarGlyphsMissing', severity: 'medium', kind: 'GAP', summary: 'The toolbar needs mic, transcribe, person-heart and template-list glyphs the library lacks; Icon/Telehealth, Icon/UserOutlined and Icon/List stand in, the transcribe pill state is unbuilt.', where: 'target Note toolbar 468:5582; GAP marker 473:9782', handling: 'LIBRARY-TODOS candidates 27–30.' },
  { id: 'npveEncounter_transcriptionStatusInvention', severity: 'medium', kind: 'GAP', summary: 'Nothing in the library expresses an inline status toggle (radio dot + bold teal label); built minimal as a local Transcription status/Start piece from Icon/RadioChecked (MUI) and an h5 text, per audit invention row 15.', where: 'target 469:5827; toolbar slot 468:5612', handling: 'Product/design decision whether this becomes a library pattern; further states join as swap variants.' },
  { id: 'npveEncounter_moduleChipGlyphsMissing', severity: 'low', kind: 'GAP', summary: 'No vitals, lab, allergy or timeline glyph in the library; the five new module chips use Icon/Clinical, Icon/UserGroupFilled, Icon/Reports, Icon/AttentionOutlined and Icon/Calendar.', where: 'target Module strip 426:4214 chips 465:5473–5517; marker 429:6878', handling: 'LIBRARY-TODOS candidate 31.' },
  { id: 'npveEncounter_navIconsShipWhiteGlyphs', severity: 'medium', kind: 'DEFECT', summary: 'Icon/Clinical and Icon/Reports carry a vector fill bound color/common/white, so they vanish on light surfaces; the shell batch\'s Problems chip had shown a white glyph on pale teal. Chips 2, 4 and 6 now bind the glyph fill to color/text/primary as an instance override.', where: 'library Icon/Clinical 6c4a7b4d…, Icon/Reports db42927d…; target chips 426:4239, 465:5473, 465:5492', handling: 'LIBRARY-TODOS candidate 32: decide whether nav icons should carry a neutral fill like the rest of the set.' },
  { id: 'npveEncounter_toolbarPillHeightDelta', severity: 'low', kind: 'INFO', summary: 'Toolbar pills are the library Button medium (38 tall, primary stroke, Akkurat 14) where the mockup draws 42-tall pills with a #8CA7A2 stroke; library wins, logged in the change log.', where: 'target 468:5582', handling: 'None; recorded.' },
  { id: 'npveEncounter_footerSpacerWasFixed', severity: 'low', kind: 'DEFECT', summary: 'The shell batch\'s footer Spacer was FIXED 10 wide, so the buttons sat beside Confidential instead of at the right edge as in the source; corrected to FILL. The header Spacer 424:4370 has the same defect and is left for the next batch.', where: 'target Note card 424:4402 (fixed), 424:4370 (open)', handling: 'Fix the header spacer with the note body batch.' },
  { id: 'npveEncounter_splitButtonSuperseded', severity: 'low', kind: 'DECISION', summary: 'The Split button instance 424:4417 in the Note card footer is hidden and renamed SUPERSEDED rather than deleted (rule 1); its nested segments cannot be un-exposed by the API.', where: 'target 424:4417', handling: 'Manual removal pass.' },
  { id: 'npveEncounter_libraryPageOrderStale', severity: 'low', kind: 'DECISION', summary: 'figmaBuild.pages._order lists Cover, Tokens, …, Reference; the library now has Cover, Foundations, Reference, Actions, Inputs, Data display, Feedback, Surfaces & navigation, Icons & illustrations, Compositions, Layouts. Rule 7\'s identity check cannot pass as written.', where: 'schema figmaBuild.pages._order; library YX2n4YLrEpBXNbcc73T6dw', handling: 'Update _order with a record, or decide the check keys on page ids.' }
];
for (const f of flags) { f.discoveredDuring = D; f.webAppV2BugListCandidate = false; s.flags.push(f); }
for (const f of s.flags) if (f.id === 'npveEncounter_splitButtonLabelNotAProperty') { f.note_2026_09_06 = 'Still OPEN as a library finding. The Note card no longer uses the Split button (' + D + '); the source Sign control is a single button with a caret.'; }
s[D].flagsAdded = flags.map(f => f.id);
s[D].flagsBefore = flagsBefore;
s[D].flagsAfter = s.flags.length;
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote', D, '; flags', flagsBefore, '->', s.flags.length);
