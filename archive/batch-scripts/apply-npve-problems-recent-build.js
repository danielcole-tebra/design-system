// apply-npve-problems-recent-build.js — records batch npveRebuild_problemsRecent_build_2026-09-02. Backup first. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-02-pre-npve-problems-recent-build.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s.npveRebuild_problemsRecent_build_2026_09_02) throw new Error('batch entry already exists');
const DIR = 'figma-export/npve-problems-recent-build-2026-09-02/';
const BATCH = 'npveRebuild_problemsRecent_build_2026-09-02';

s.npveRebuild_problemsRecent_build_2026_09_02 = {
  _status: 'BUILT. Stopped after step 8. First screen: Clin_Problems-Recent as a Sidesheet instance on new target page Screens 27:2, body swapped to local component Problems picker body. Favorites and Main not built. Source and library untouched; every library instance imported by key in the same script as its use.',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6 (NPVE Rebuild): pages Cover 0:1, Templates 3:2, Screens 27:2 (created)',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only; 4618:4930 screenshotted for step 8',
  date: '2026-09-02',
  step1_reads: {
    a_textField: {
      definitions: { 'Label#123:0': 'TEXT "TextField Label"', 'Value text#123:11': 'TEXT "Default Value"', 'Helper text#123:22': 'TEXT', 'Show helper#123:33': 'BOOLEAN true', 'required#123:44': 'BOOLEAN false', 'select#123:55': 'BOOLEAN false', 'multiline#123:66': 'BOOLEAN false', size: 'medium | small', State: 'Default | Hover | Focused | Disabled | Error', Value: 'Empty | Filled' },
      variants: '20 = 2 sizes x 5 states x 2 values. medium 300x75 (Input 56 + gap 3 + Helper 16); small 300x60 (Input 40 + 3 + 16).',
      instances: { small: 'Templates 25:564 at (-800, 200), size=small State=Default Value=Empty, key 542540ea…', medium: 'Templates 25:586 at (-800, 400), size=medium State=Default Value=Empty, key ee985b01…' },
      renderedInputHeight: { small: 40, medium: 56 },
      inputLayout: { small: 'H p8/14/8/14, radius 4, no fill', medium: 'H p16/14/16/14, radius 4, no fill' },
      outline: 'Three stroke parts (Cap left, Label slot, Body right), each #000000@0.23 bound color/substrate/inputOutline, 1px on the outer sides. Alpha lives in the variable (rule 9): paint.opacity reads 0.23 on the bound paint and was not touched.',
      valueText: 'Akkurat LL Regular 16/24 #000000 bound color/text/primary; resting label Regular 16/24 color/text/secondary; helper Regular 12/16 color/text/secondary.',
      observation: 'On the small variant the Label slot part measures 95x56 inside a 40-tall Input (medium: 95x56 in 56). Its bottom stroke sits below the input box. Not visible in the 1x screenshot; recorded, not remediated (library is read only).',
      screenshots: [DIR + 'step1-textfield-small-25-564.png', DIR + 'step1-textfield-medium-25-586.png']
    },
    b_leadingAdornment: 'NONE EXISTS. Text field 121:350 has no adornment property (list above). Autocomplete/Field 86:95 has Label, Value text, Clear icon (BOOLEAN) and size/State/Value axes: its only icons are the trailing Icon/Close (MUI), Icon/DownCaret and tag delete icons. Menu 749:323 is four Menu/Item swaps. Name search for search / adornment / input returns only the glyphs Icon/Search 575:30 and Icon/SearchOutlined (MUI) 312:4 and the composition set Nav/Search 294:147 (page Primary nav — partner theme, 400x65, State Default/Hover): a partner-theme nav search whose magnifier is a TRAILING adornment drawn as a loose glyph beside a placeholder text, not a reusable input with a leading slot.',
    c_code: {
      'src/overrides/TextFieldOverrides.tsx': 'Only MuiTextField.defaultProps.SelectProps.IconComponent = grey DownCaret (select caret). No height, no adornment, no size override.',
      productSearchFields: [
        'treatment-plan-ui ProblemSearchField.tsx:102-124: <TextField size="small" placeholder="Search problems..." InputProps.startAdornment = <InputAdornment position="start"><SearchIcon fontSize="small"/></InputAdornment>> inside an Autocomplete. A leading magnifier in a small (40px) outlined field — the direct code analogue of the source search field.',
        'documents-ui DataGridColumnFilter.tsx:161-166: <OutlinedInput size="small" placeholder="Search" startAdornment={<Search color="primary" sx={{ mr: 1 }}/>}>.',
        'messages-ui PatientGroupsSearchGroup.tsx:32-44: <TextField size="small" label="Search This Group"> with the magnifier as an END adornment.',
        'navigation-ui PatientSearch.tsx: Autocomplete + TextField size small, magnifier as END adornment (documented on Nav/Search 294:147).'
      ],
      height: 'MUI outlined size="small" input renders 40px (23px line + 8.5px padding top and bottom; recorded as computedPx on Nav/Search). No product override changes it. So the product renders a 40-tall search field with a leading icon, and the library Text field size=small matches the height but cannot place the icon.',
      otherHits: '14 files pair a Search icon with InputAdornment/startAdornment (list in report).'
    },
    branch: 'No library component models a leading search adornment → Text field size=small (input 40, closest to 40) with no glyph, GAP marker beside the field. No magnifier drawn.'
  },
  step2_sidesheet: {
    page: 'Screens 27:2 (created)', instance: '27:6 "Screen — Clin_Problems-Recent" at (0, 0), 550x600, main Sidesheet 6:65',
    properties: { 'Title#6:0': 'Add Problem to Chart', 'Show back#6:1': false, 'Show footer#6:2': true, 'Show secondary action#6:3': true, 'Show tertiary action#6:4': true, 'Body#6:5': '26:221 Problems picker body' },
    tertiaryLabel: 'Label#83:165 set to "Save & Add to Note"; the library Button renders textCase TITLE, so the sheet shows "Save & Add To Note" (176x38). Left as the library produces it.'
  },
  step3_components: {
    problemRow: {
      id: '26:208', page: 'Templates (0, 1600)', size: '518x56 hug height',
      layout: 'HORIZONTAL, padding 8/16/8/16 bound space/8 and space/16, gap 16 bound space/16, items centred, no fill.',
      children: 'Favorite = Icon button 170:5 (color=default, size=medium) with Icon swap Icon/FavoritesOutlined 575:17, glyph #545454 bound color/grey/600 (library default); Text = HORIZONTAL FILL-width frame gap 16 bound space/16 holding Name TEXT (HUG, Regular 16/24 bound font/family/base, font/size/body1, font/lineHeight/body1, font/weight/regular, fill color/text/primary) and Code TEXT (HUG, Regular 14/20 bound font/size/body2, font/lineHeight/body2, font/weight/regular, fill color/text/secondary); Trailing action = Icon button 170:5 with Icon/PlusOutlined 76:8, glyph bound color/grey/600.',
      textWrapperDecision: 'The first build had Name at FILL directly in the row, which pushed the code to the right edge beside the trailing action. Name and Code were then grouped in the Text frame (Name HUG) so the code reads beside the name as in the source. Property references survived the move (verified: Name.characters→Name#26:0, Code.characters→Code#26:1, Trailing action.mainComponent→Trailing action#26:2, both nested Icon swaps intact).',
      properties: { 'Name#26:0': 'TEXT default "Diabetes Mellitus"', 'Code#26:1': 'TEXT default "E10.9"', 'Trailing action#26:2': 'INSTANCE_SWAP default Icon button 170:5, preferred value Icon button' },
      heightNote: '56 = 8 + 40 (Icon button medium) + 8. Source rows were 48 with bare 24px glyphs.'
    },
    problemsPickerBody: {
      id: '26:221', page: 'Templates (0, 1700)', size: '518x384 hug height',
      layout: 'VERTICAL, padding 0 bound space/0, gap 16 bound space/16, no fill.',
      children: [
        'Search field 26:222 = Text field size=small State=Default Value=Filled (key 679a3842…), FILL width 518x40; Label "Search for problem or ICD-10" (the placeholder text of the Favorites sibling 4618:5180, since a Filled text field must carry a label in the notch), Value text "Diabetes", Show helper false. Rendered: input 40, value #000000 color/text/primary, floating label shown, outline #000000@0.23 color/substrate/inputOutline.',
        'Filter tabs 26:244 = Tabs 201:14 (key a320b575…), 282x48 hug; nested Tab 1/2/3 labels All / Recent / Favorites, selected=yes on Recent.',
        'Section title 26:259 TEXT "Recent Problems" FILL width, Bold 16/24 bound font/family/base, font/size/body1, font/lineHeight/body1, font/weight/bold, fill color/text/primary.',
        'Rows 26:260 = VERTICAL FILL-width frame, gap 0 bound space/0, holding four Problem row instances 26:261 Diabetes Mellitus E10.9 (Trailing action nested Icon swapped to Icon/CheckCircle (MUI) 200:41, glyph fill rebound to color/success/dark), 26:272 Asthma J45.909, 26:282 Chronic Obstructive Pulmonary Disease J45.909, 26:292 Osteoarthritis M17.11.'
      ],
      rowsGroupingDecision: 'The prompt lists the four rows as body children under gap 16. They were grouped in a Rows frame with gap 0 so the list reads as one MUI List (no gap between ListItems); the 16 gap applies between field, tabs, title and the list.',
      selectedGreen: 'Source #1D6B45. Library greens: color/success/main #3FA266 (distance 72.6) and color/success/dark #2B865A (distance 37.0). Nearest = color/success/dark, bound on the check glyph. GAP marker placed.'
    },
    tabsInstanceRead: {
      first: 'First real Tabs instance read; the library has no on-canvas Tabs instance.',
      rendered: 'Tabs 282x48. Tab 1 "All" selected=no 90x48, label Akkurat LL Regular 16/20 #545454 bound color/text/secondary, no indicator; Tab 2 "Recent" selected=yes 90x48, label Regular 16/20 #004852 bound color/primary/main, Indicator 90x2 #004852 bound color/primary/main; Tab 3 "Favorites" selected=no 102x48 (hug grows with the label), Regular 16/20 color/text/secondary. Root fills none on all three.',
      labelSize: 'Regular 16/20 on the instance, matching the master. Type tokens on the label are unbound in the library (library finding, not remediated).'
    },
    notCarried: ['Tab Set Meta (hidden kit nav scaffold)', 'hidden row 1 Hypertension', 'hidden per-row Close, Delete, bin, Arrow, Done-Check affordances', 'white r8 row fill']
  },
  step4_swap: 'Body#6:5 set to 26:221. Template body 6:79 padding 8/16/8/16 governs; not overridden. Body content instance I27:6;6:80 renders 518x384 inside the 488-tall body.',
  step5_render: {
    screenshot: DIR + 'step5-screen-27-6.png',
    lookedAt: 'Yes. 550x600 at 1x: bold title with the 40px close button; 40-tall search field with floating label "Search for problem or ICD-10" and value "Diabetes"; three 48-tall text tabs with Recent underlined in teal; "Recent Problems" heading; four 56-tall rows with star icon buttons, name, grey code beside the name, and a trailing action (green filled check on Diabetes Mellitus, plus glyph on the others); empty space below the list; footer Cancel / Save & Add To Note / coral Save.',
    regions: { Header: 56, 'Header divider': 1, Body: 488, Footer: 55, total: 600 },
    bodyContent: { 'Search field': 40, 'Filter tabs': 48, 'Section title': 24, Rows: 224, gaps: '3 x 16 = 48', total: 384 },
    overflow: 'None. 384 content + 8 + 8 padding = 400 < 488; 88px slack.'
  },
  step6_standingBatchRules: {
    '1_instancePaintVerification': 'PASS. Problem row master 26:208 vs body-master instance 26:272 vs screen instance: 0 paint differences. Problems picker body master 26:221 vs screen body I27:6;6:80: 0 differences. Screen sample reads: outline #000000@0.23 color/substrate/inputOutline, value #000000 color/text/primary, indicator #004852 color/primary/main, title and names #000000 color/text/primary, codes #545454 color/text/secondary, check glyph #2B865A color/success/dark.',
    '2_unboundPaintAudit': 'Templates: 160 visible solid paints, 0 unbound. Screens: 93 visible solid paints, 0 unbound. Cover 0:1 (the target\'s pre-existing first page): 1 visible solid paint, UNBOUND (#010000 fill on Frame 1 1:5). Pre-existing, not created by any batch, not touched (rule 1, additive); recorded as a finding.',
    '3_referenceCounts': 'PASS. Problem row: 5 references (2 nested Icon swaps, Name, Code, Trailing action). Problems picker body master: 34 references across nested instances (Text field 11, Tabs 3, 4 rows x 5). Rendered check: the four screen rows read Diabetes Mellitus | E10.9 (Icon/CheckCircle (MUI)), Asthma | J45.909, Chronic Obstructive Pulmonary Disease | J45.909, Osteoarthritis | M17.11 (Icon/PlusOutlined) against their property values.',
    '4_skipInvisibleFalse': 'Set at the top of every script.',
    '5_opacityLast': 'PASS. 0 unbound paints below opacity 1 on Templates and Screens.',
    '6_enumerateDontRecall': 'Audit walked every top-level node on every target page from the file, not from prior lists.',
    '7_fileIdentityFirst': 'Every call passed its file key explicitly. Target page inventory read from the file: Cover 0:1, Templates 3:2, Screens 27:2. (The rule\'s library page-list check is not applicable to the target; the library was read by key only.)',
    '8_roundWithRecord': 'PASS. 0 fractional x/y/width/height on non-vector nodes across Templates and Screens (audit before and after the row restructure).',
    '9_boundPaintAlpha': 'PASS. The only bound paints with alpha are the Text field outline parts at 0.23 (color/substrate/inputOutline); left untouched.',
    '10_cloneDropsPropertyRefs': 'Not applicable: no variant clone. References were verified after moving Name and Code into the Text frame (rule 3).'
  },
  step7_changeLog: {
    id: '27:222', name: 'Change log — Problems picker (detached: instances cannot host added rows)', at: '(650, 0)', size: '480x613', title: 'Changes: Problems picker',
    rows: ['Filter tabs | 28 tall, bold 14 → 48 tall, regular 16 | Library. Compact tabs exist nowhere else', 'Search field | 40 tall, teal border, magnifier → library text field | Library. No search glyph slot exists yet', 'Problem rows | Hand-drawn → Problem row component | Consistency. Same row, one component', 'Star and plus | Bare glyphs → icon buttons | Library. Glyphs gain a tap target', 'Row background | White with rounded corners → none | Cleanup. Invisible on a white sheet', 'Hidden layers | Tab set, delete and arrow affordances → not carried | Cleanup. Dead layers in the source', 'Body padding | 16 all round, gap 12 → template padding | Template sets it', 'Colours without a token | Selected green and others → nearest library token, marked | Library. No token exists for these'],
    rowIds: ['27:226', '27:232', '27:238', '27:244', '27:250', '27:256', '27:262', '27:268'],
    screenshot: DIR + 'step7-changelog-27-222.png', lookedAt: 'Yes; eight rows, all wraps at word boundaries.'
  },
  gapMarkers: {
    convention: 'defectMarkerConvention2026_08_28: VERTICAL g12 p16 r4, 1px dashed [6,4], fill color/grey/300, stroke color/grey/500; chip fill color/grey/400 r4 p3/8 with label color/grey/900 Bold 12/16 letterSpacing 0.5 (caption tokens); fix line color/grey/600 body1 tokens; difference line color/text/primary body1 tokens. Example first, then chip + fix line, then difference. Placed on Screens to the left of the screen.',
    markers: [
      { id: '27:295', name: 'GAP marker — Search field', at: '(-450, 0)', size: '400x240', example: 'Text field size=small instance with the same label and value as the screen', fix: 'Fix lives in the library: Text field 121:350 needs a start adornment slot.', marks: 'Search field 26:222 in the screen', screenshot: DIR + 'step1-gap-marker-search-27-295.png' },
      { id: '27:306', name: 'GAP marker — Colours without a token', at: '(-450, 220)', size: '400x288', example: 'Icon button with Icon/CheckCircle (MUI), glyph bound color/success/dark', fix: 'Fix lives in the library: no token for the source greens and greys.', marks: 'first Problem row trailing action; also lists #417E86, #9A9A9A, #004852 (search border), #323232', screenshot: DIR + 'step3-gap-marker-colours-27-306.png' }
    ],
    unbound: 'Chip label letterSpacing 0.5px unbound (no letter-spacing variable), as on the Slot label.'
  },
  step8_comparison: { file: DIR + 'step8-comparison-source-4618-4930-vs-target-27-6.png', source: DIR + 'step8-source-4618-4930.png', composed: 'PIL, 1220x680, source left, target right, both 1x, labelled.', lookedAt: 'Yes. Same content and order; target header 56 vs 64, search field with notch label instead of teal border and magnifier, tabs 48 vs 28, rows 56 vs 48 with 40px icon buttons, codes beside names, footer buttons 38 vs 36 with "Save & Add To Note".' },
  screenshots: ['step1-textfield-small-25-564.png', 'step1-textfield-medium-25-586.png', 'step3-problem-row-master-26-208.png', 'step3-body-master-26-221.png', 'step5-screen-27-6.png', 'step7-changelog-27-222.png', 'step1-gap-marker-search-27-295.png', 'step3-gap-marker-colours-27-306.png', 'step8-source-4618-4930.png', 'step8-comparison-source-4618-4930-vs-target-27-6.png'].map(f => DIR + f)
};

const f1 = s.flags.find(f => f.id === 'npveProblemsRecent_textFieldNoStartAdornment'); if (f1) f1.handling = 'Built around 2026-09-02 (npveRebuild_problemsRecent_build): Text field size=small with no glyph, GAP marker 27:295 on Screens. Still open in the library.';
const f2 = s.flags.find(f => f.id === 'npveProblemsRecent_searchFieldDiffersFromTextField'); if (f2) { f2.superseded = 'RESOLVED 2026-09-02 by npveRebuild_problemsRecent_build: size=small input height read at 40 on instance 25:564, equal to the source; the remaining difference (notch label, inputOutline colour) is logged in the change log.'; f2.handling = 'Resolved by the build decision; kept for the record.'; }
const f3 = s.flags.find(f => f.id === 'npveProblemsRecent_bodyPaddingConflict'); if (f3) { f3.superseded = 'RESOLVED 2026-09-02 by the build prompt: template padding governs (change log row "Body padding").'; f3.handling = 'Resolved; kept for the record.'; }
const f4 = s.flags.find(f => f.id === 'npveProblemsRecent_unresolvedColours'); if (f4) f4.handling = 'Built 2026-09-02 with nearest tokens: selected check → color/success/dark (#2B865A for #1D6B45); tab underline, inactive tab, search border and icon strokes replaced by library component paints. GAP marker 27:306 on Screens.';
s.flags.push(
  { id: 'npveProblemsBuild_textFieldSmallLabelSlotHeight', severity: 'low', kind: 'DEFECT', discoveredDuring: BATCH, summary: 'Library Text field size=small: the outline part "Label slot" measures 95x56 inside a 40-tall Input, so its bottom stroke sits 16px below the input box. Not visible at 1x because the bottom stroke overlaps the field bottom on medium only.', where: 'YX2n4YLrEpBXNbcc73T6dw Text field 121:350 size=small variants; read on target instance 25:564 (I25:564;130:141)', detail: 'Cap left 9x40 and Body right 291x40 are correct; only Label slot carries the medium height. Library is read only in this batch.', webAppV2BugListCandidate: false, handling: 'Reported for a library batch.' },
  { id: 'npveProblemsBuild_tabLabelTypeUnbound', severity: 'low', kind: 'DEFECT', discoveredDuring: BATCH, summary: 'Library Tabs/Tab 201:13 label binds its fill but none of family, size, line height or weight (read on the first real Tabs instance 26:244 and on the masters).', where: 'YX2n4YLrEpBXNbcc73T6dw 201:3 / 201:5 / 201:7 / 201:10', detail: 'Renders Akkurat LL Regular 16/20 correctly; the values are literal, not tokens.', webAppV2BugListCandidate: false, handling: 'Reported for a library batch.' },
  { id: 'npveProblemsBuild_coverPageUnboundFill', severity: 'low', kind: 'DEFECT', discoveredDuring: BATCH, summary: 'Target page Cover 0:1 carries one unbound fill (#010000 on Frame 1 1:5), pre-existing before any batch.', where: 'fdCQVFdvOByaOYIJYag0d6 Cover 0:1 › Frame 1 1:5', detail: 'Found by the rule 2 walk of every page. Not created by the rebuild; not touched.', webAppV2BugListCandidate: false, handling: 'Needs a decision: bind, mark, or leave the cover outside the audit scope.' },
  { id: 'npveProblemsBuild_strayChangelogRow', severity: 'low', kind: 'DEFECT', discoveredDuring: BATCH, summary: 'A stray Change log/Row instance 18:129 sat at (0, 0) on Templates: the changelog batch created it before appendChild into the instance threw, and the atomic-failure assumption did not cover a partially built script. Found by the rule 2 walk.', where: 'fdCQVFdvOByaOYIJYag0d6 Templates 3:2 › 18:129', detail: 'Renamed "STRAY — Change log/Row left by npveRebuild_changelog …" and moved to (-800, 600) beside the other checks. Not deleted (rule 1). Lesson: create the node only after the parent accepts children, or wrap create+append so a throw removes the orphan.', webAppV2BugListCandidate: false, handling: 'Marked; manual deletion pass.' },
  { id: 'npveProblemsBuild_searchLabelCopy', severity: 'low', kind: 'DECISION', discoveredDuring: BATCH, summary: 'The Filled Text field must show a notch label; the source search field has none. The label text "Search for problem or ICD-10" was taken from the Favorites sibling placeholder (4618:5180), not invented.', where: 'target 26:222 Label#123:0', detail: 'Alternative: Value=Empty with the same text as the resting label, dropping the typed "Diabetes".', webAppV2BugListCandidate: false, handling: 'Reported; change on request.' }
);
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote npveRebuild_problemsRecent_build_2026_09_02; flags', s.flags.length);
