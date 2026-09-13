// apply-npve-mgmt-fidelity.js — records npveRebuild_mgmtFidelity_2026-09-04 (read-only fidelity verification). Backup first. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-04-pre-npve-mgmt-fidelity.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const D = 'npveRebuild_mgmtFidelity_2026-09-04';
if (s[D]) throw new Error('record already exists');
const flagsBefore = s.flags.length;

s[D] = {
  _status: 'DONE, read-only. Both Problems management screens itemised against their sources region by region. Verdict: neither is fidelity-complete as repaired; eleven numbered proposals (six master fixes, four decisions, change-log rows). No Figma write.',
  date: '2026-09-04',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only (545:5239 Page=Clin_Problems-Main 550x517, 4494:3240 Clin_Problems-Drop 550x510; loadAsync only)',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6 read only (masters 160:1327 › 160:1328 State=Closed, 160:1607 › 160:1608 State=Open)',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only (Form control label 140:15 exists; carets are chevrons only; Icon button color default/primary/error; Checkbox Flush None/Left; Menu/Item 36 tall)',
  report: 'figma-export/npve-mgmt-fidelity-2026-09-04/report.md',
  readFirst: ['CLAUDE.md rules 14/15 (2026-09-04 wording)', 'npveRebuild_repair2_2026-09-04', 'npveRebuild_audit_2026_09_03', 'npveRebuild_problemsRecent_inventory_2026_09_02.step6_siblings.main_545_5239 — sketch confirmed node for node'],
  step1_itemisation: {
    main_545_5239: { nodes: 163, root: '550x517 V, fill #FFFFFF U, stroke #D6D6D6 U 1 inside, r8', header: '545:5503 550x64 H p16 g16; title Bold 20/32 #545454; bare 24 close glyph', body: 'MainWrap 545:5517 550x377 V p16/20/16/20 g8', toolbar: '4667:3326 510x42 SPACE_BETWEEN: kit button Size=Small 185x42 p0/15 g5 r24 white, stroke #8CA7A2, label 14/18 #004852, plus 16 #000000; kit Autocomplete Select 274x40 with visible Field 107x40 p8/8/8/16 stroke #545454 r4, "Status" 16/20 #545454, caret 12.15x6.7 #000000', checkboxes: '4667:13143 510x42 SPACE_BETWEEN: two LIBRARY Form control label State=Default (190x42, 241x42): Control 42 p9, glyph at x9, label 16/24 at x42', rows: 'Item 510x71 H p12/4/12/4 g8 r16; status Bold 14/auto SMALL_CAPS_FORCED (#3FA266 active, #9A9A9A others) + filled-triangle caret 8.81x4.4; name Regular 18/auto (#000000 row1, #545454 rows 2-3); code 14/18 #545454; rings 40 stroke #8CA7A2 r32 with EditIcon (pencil #004852) and Add Note (#417E86); kit Divider between rows; pitch 87', footer: '545:5541 550x76 H p20 g12 MAX/CENTER, top stroke #D6D6D6: kit Button Default 243x36 white stroke #8CA7A2 "Add Active Problems to Note" 16/20 #004852; kit Button Primary Disabled 66x36 #FFE9E3 "Save" 16/20 #8CB2B6', hidden: 'button Left Icon/Divider/Right Icon frames; select Chips, Clear Button, Assistive Text, Label; per-row diversity_4 24x24 frame at (24,60)' },
    drop_4494_3240: { nodes: 164, sameAsMain: 'header, toolbar, footer node for node', differences: 'checkbox row 190x42 with ONE Form control label; rows: active Low back pain (no code) / active Hypertension one-line 64-tall row / resolved Depression (no code, #000000); Autocomplete menu 344x132 at (20,217) 3 items 44 tall p12/16 label 16/20, r3, 3 shadows, items 4-5 hidden; cursor image 23x30 at (72,200)' },
    fullListings: 'in figma-export/npve-mgmt-fidelity-2026-09-04/report.md step 1 (summary) and the use_figma outputs of this batch (163 + 164 rows)'
  },
  step2_regions: {
    classes: 'LW library-wins / FM fidelity miss / RA rebuild addition',
    sheet: 'LW: 517/510 → 600, stroke all sides r8 → left only r0; 43px blank under row 3',
    header: 'LW (Sidesheet): 64 → 56; title #545454 → text/primary; bare close 24 → Icon button 40 grey/600',
    bodyPadding: 'sides 20 → 16 LW; top 16 → 32 RA (Problems list body adds paddingTop 16 on top of the template 16)',
    createButton: 'LW, no row: 185x42 p0/15 label 14/18 stroke #8CA7A2 plus #000000 → Button contained primary 211x38 p7/17 label 16/24 TITLE stroke #B3C6C4 plus #004852',
    statusSelect: 'component LW (Text field as select); width 107 → 154 RA; outline #545454 → substrate/inputOutline; caret 12x7 black → 17x9 grey/600; text 16/20 → 16/24',
    checkboxes: 'FM: source uses library Form control label (glyph x9, gap 9); rebuild hand-builds Checkbox Flush=Left + loose text (glyph x0, gap 18)',
    rowGeometry: 'LW: 510x71 p12/4 pitch 87 → 518x72 p0/8 pitch 73 (rebuild denser)',
    statusWord: 'FM (type): SMALL_CAPS_FORCED lowercase 14/auto → typed capitals 14/20',
    statusCaret: 'LW + GAP: filled triangle 8.81x4.4 → DownCaret chevron 10x5.5; library has no filled caret',
    names: 'FM (colour): rows 2-3 #545454 in source, text/primary in rebuild',
    codes: 'match',
    actions: 'ring LW (marker 189:615); glyph colour #004852/#417E86 → grey/600 not covered; Icon button color=primary would restore #004852',
    footer: 'LW: 76 p20 g12 → 56 (divider + 55 p8 g8); buttons 36 → 38; label 16/20 → 16/24 TITLE ("to" → "To", known DEFECT); content, set and disabled state match',
    statusMenu_checkboxes: 'RA: source Drop has one label, rebuild two',
    statusMenu_rows: 'FM/decision: source rows Low back pain / Hypertension (one-line) / Depression, no codes; rebuild reuses Main rows',
    statusMenu_menu: 'items 44 → 36 LW; menu fixed 344x144 with 108 content → 36px blank strip FM; x 20 → 16 template; sits under the ACTIVE caret in both'
  },
  step3_content: { matches: ['Problems', 'Create New Problem', 'Status', 'No known problems', 'Only show active problems (Main)', 'Low back pain M54.50', 'Depression, unspecified F32.A', 'Generalized anxiety disorder F41.1', 'Active / Resolved / Mark as Error', 'Save disabled'], mismatches: ['Drop: rebuild adds "Only show active problems"', 'Drop: all three rows differ (source Low back pain / Hypertension / Depression, no codes)', 'footer "Add Active Problems to Note" renders "To" (TITLE, npveBuild_buttonLabelTitleCase)', 'status words: small caps in source, capitals typed in rebuild'] },
  step4_changeLogs: { right: ['Shell', 'Controls', 'Rows', 'Status menu'], wrong: ['Density — direction inverted for these screens: legacy pitch 87 → 73, button 42 → 38, footer 76 → 56, no tabs; why-text carried from the picker log'], missing: ['Create button kit → library Button', 'Status select kit → Text field (and width once decided)', 'footer label case', 'status caret triangle → chevron (+ GAP marker)', 'action glyph colour teal → grey', 'menu items 44 → 36 (Status menu log)'], notYet: 'no rows for the fidelity misses until fixed or ruled', hiddenRows: '8 picker rows placed hidden in each log (clone residue), not counted' },
  step5_footer: 'Source 76 = 20 + 36 + 20, gap 12: outlined default "Add Active Problems to Note" 243x36 + disabled primary "Save" 66x36 (#FFE9E3 / #8CB2B6), no Cancel. Rebuild: Cancel hidden, contained primary 249x38 same label (TITLE), contained secondary Disabled 70x38 same colours bound. Content matches; geometry LW (template 56, Button 38). Question closed.',
  step6_comparisons: { screenshots: ['figma-export/npve-mgmt-fidelity-2026-09-04/step6-comparison-main-160-3169-1x.png', 'figma-export/npve-mgmt-fidelity-2026-09-04/step6-comparison-status-menu-160-3680-1x.png'], references: { '160:1324': '550x517, image 1100x1034 (2x), hash 00903244', '160:1326': '550x510, image 1100x1020 (2x), hash 08c01b8e' }, captions: { '160:3169': 'Source: zVsuhYehoSLLq880qRBFkq 545:5239, exported 2026-09-04', '160:3680': 'Source: zVsuhYehoSLLq880qRBFkq 4494:3240, exported 2026-09-04' } },
  step7_verdict: {
    _proposal: true,
    main: 'NOT fidelity-complete as repaired',
    statusMenu: 'NOT fidelity-complete as repaired',
    fixes: [
      { n: 1, what: 'Checkbox row → two library Form control label instances (140:15)', where: 'Problems list body, both variants', kind: 'fix in sub-component master' },
      { n: 2, what: 'Dim non-active problem names to color/text/secondary (source #545454)', where: 'Problem summary row placements or a Status variant axis', kind: 'fix in master / decision (npveRepair2_statusColourByOverride)' },
      { n: 3, what: 'Status word: SMALL_CAPS_FORCED lowercase vs typed capitals', where: 'Problem summary row 170:1591', kind: 'decision, then fix in master' },
      { n: 4, what: 'Remove the extra paddingTop 16 on Problems list body variants', where: '155:1559, 156:1294', kind: 'fix in sub-component master' },
      { n: 5, what: 'Status filter width 154 vs source 107', where: '160:4896, 160:4918', kind: 'decision' },
      { n: 6, what: 'Action glyph colour: Icon button color=primary for #004852', where: 'Problem summary row 190:11, 190:12', kind: 'decision, then fix in master' },
      { n: 7, what: 'Status caret: chevron + GAP marker, or add a filled caret icon to the library', where: 'Problem summary row 190:18; library', kind: 'decision (library) + marker' },
      { n: 8, what: 'Change logs: rewrite Density; add rows for Create button, Status select, label case, caret, glyph colour', where: '160:1847, 160:1924', kind: 'change log rows' },
      { n: 9, what: 'Menu box fixed 144 with 108 content: hug or 108, drop hidden 4th item', where: '156:1321', kind: 'fix in sub-component master' },
      { n: 10, what: 'Open-state content: mirror the Drop source (one checkbox, code-less rows incl. Hypertension) or keep Main + menu', where: '156:1294', kind: 'decision, then fix in master' },
      { n: 11, what: 'Status menu log row: menu items 44 → 36', where: '160:1924', kind: 'change log row' }
    ]
  },
  screenshots: fs.readdirSync('./figma-export/npve-mgmt-fidelity-2026-09-04').filter(f => f.endsWith('.png')).map(f => 'figma-export/npve-mgmt-fidelity-2026-09-04/' + f)
};

const F = (id, kind, severity, summary, where, detail, handling) => ({ discoveredDuring: D, webAppV2BugListCandidate: false, handling, id, severity, kind, summary, where, detail });
s.flags.push(
  F('npveMgmt_checkboxRowNotFormControlLabel', 'DEFECT', 'medium', 'Problems list body hand-builds the checkbox row (Checkbox Flush=Left + loose Label) although the source uses the library Form control label (140:15); glyph sits at x 0 instead of 9 and the glyph-to-label gap is 18 instead of 9.', 'target 156:1254, 156:1261, 156:1299, 156:1302; source 4667:13134, 4809:16479', 'Source Control 42 p9 › glyph 24 at x9, Label at x42. Rebuild Checkbox p9/18/9/0 › glyph at x0, Label at x42.', 'Reported. Proposal 1: rebuild with Form control label.'),
  F('npveMgmt_inactiveNamesNotDimmed', 'DEFECT', 'medium', 'Source dims the names of resolved and marked-as-error problems to #545454; the rebuild renders all three names in color/text/primary.', 'source 545:5538, 4494:4955; target Problem summary row placements 172:3151, 172:3168, 172:3202, 172:3219', 'Row 1 name #000000 in both. Needs a Status-dependent override or a Status variant axis (npveRepair2_statusColourByOverride).', 'Reported. Proposal 2.'),
  F('npveMgmt_statusWordSmallCaps', 'DECISION', 'low', 'Source status words are lowercase with textCase SMALL_CAPS_FORCED (Bold 14/auto, 17 tall); the rebuild types the words in capitals at 14/20, which renders larger glyphs.', 'source 545:5520, 545:5536, 4494:4953; target 170:1591', 'Figma supports SMALL_CAPS_FORCED on the Status text with a lowercase property value.', 'Reported. Proposal 3, decision.'),
  F('npveMgmt_bodyTopPaddingDoubled', 'DEFECT', 'low', 'Problems list body variants carry paddingTop 16 inside the Sidesheet Body that already pads 16, so the toolbar sits 32 under the header rule; the source sits it at 16.', 'target 155:1559, 156:1294 (paddingTop bound to space/16)', 'Source MainWrap p16/20/16/20; template Body p16.', 'Reported. Proposal 4.'),
  F('npveMgmt_statusFilterWidth', 'DECISION', 'low', 'The rebuilt Status select is 154 wide; the source field renders 107 wide. Nothing in the library forces 154.', 'target 160:4896, 160:4918; source 4667:4954 Field 107x40', 'Text field small has no fixed width.', 'Reported. Proposal 5, decision.'),
  F('npveMgmt_menuFixedHeightBlankStrip', 'DEFECT', 'medium', 'The open status Menu is a fixed 344x144 with three 36-tall items and a hidden fourth, leaving a 36px blank strip under "Mark as Error"; the source menu hugs its three 44-tall items (132).', 'target 156:1321; source 4494:4932', 'Menu/Item is 36 tall by library design; the box should hug (108).', 'Reported. Proposal 9.'),
  F('npveMgmt_openStateContentDiffers', 'DECISION', 'medium', 'The Status menu rebuild reuses the Main rows and both checkboxes; its source (Clin_Problems-Drop) shows one checkbox and three code-less rows: active Low back pain, active Hypertension on one line, resolved Depression.', 'source 4494:3240; target 156:1294', 'Content mismatch on every row and the checkbox row; whether the Open state must mirror its own source sample is a decision.', 'Reported. Proposal 10, decision.'),
  F('npveMgmt_statusCaretGlyphGap', 'GAP', 'low', 'Source status caret is a filled triangle (8.81x4.4); the library carets are chevrons only, so the rebuild shows a chevron. No marker records this.', 'library Icon/DownCaret 76:5; target 190:18; source 545:5521', 'Either add a filled caret icon to the library or mark the chevron as a GAP.', 'Reported. Proposal 7.')
);
s[D].flagsAdded = s.flags.slice(flagsBefore).map(f => f.id);
s[D].flagsBefore = flagsBefore; s[D].flagsAfter = s.flags.length;
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote', D, '; flags', flagsBefore, '->', s.flags.length);
