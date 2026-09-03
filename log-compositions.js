const fs = require('fs');
const P = 'design-system-schema.json';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));

const common = {
  _batch: 'fourCompositions2026_08_31',
  method: 'Production counted with a balanced-brace JSX scanner (composition-scan.js) over 5,399 source files under C:/Code/web-app-v2/packages, excluding node_modules, stories, examples, patterns and tests. Import source resolved per file so same-named non-design-system tags cannot be miscounted.',
  scannerFixes: 'Two real scanner faults found and fixed before any count was trusted. (a) TSX generic call sites — <Autocomplete<PatientSummaryObj> — were rejected by the tag lookahead AND would have been truncated at the generic closing angle bracket, losing every prop. (b) An earlier prop reader matched against the whole raw tag, so nested props leaked into the parent: size="small" read 73 for Autocomplete when the true top-level count is 52. Both are the failure mode the build prompt warned had already occurred twice.'
};

s.autocompleteOpenState2026_08_31 = {
  ...common,
  frame: '371:780, Compositions / Inputs',
  production: { files: 88, elements: 106, auditSaid: 58, whyDifferent: 'The audit used line-based grep, which misses <Autocomplete when its props start on the next line, and misses TSX generic call sites entirely.' },
  varies: {
    selectionMode: 'single 70 elements / 60 files; multiple 36 / 31. 31 of the 36 multiples also set disableCloseOnSelect.',
    checkboxIsMultiOnly: '13 elements / 8 files put a Checkbox in renderOption; zero single-select does.',
    size: 'DEAD SPLIT — 53 elements set size (52 to small, 1 computed), 53 set nothing and take the medium theme default. AutocompleteOverrides sets ChipProps, noOptionsText and popupIcon, and no size. No winner picked.',
    optionRow: 'renderOption on 58 elements / 52 files. Box 19, Checkbox 13, Typography 12, ListItem 6, ListItemText 5, 8 plain-text, ~12 bespoke local components. No dominant shape.',
    tags: 'multiple + renderTags 22, multiple with default Chip tags 14. limitTags on 8 elements / 5 files with values 1,2,3,6 — no consensus.',
    surface: 'PaperComponent replaced in 4 files, ListboxComponent in 2, disablePortal on 8 elements / 4 files. The default surface holds nearly everywhere.',
    emptyText: 'noOptionsText set on 25 elements / 24 files — every one overrides the theme default "No results found". Nine distinct literal strings: 4 Title Case, 4 sentence case, 3 ending in a full stop.'
  },
  gaps: [
    'Autocomplete/Option carries a hardcoded Icon/CheckboxUnchecked in ALL FIVE State variants and no checked glyph anywhere, so Checkbox=true + State=Selected renders a selected row with an empty box. A selected multi-select option cannot be drawn. Used by 13 elements across 8 files.',
    'Autocomplete/Option exposes one TEXT property (Label), so an option row holds exactly one string — no second line, avatar, trailing chip. 52 files customise the row.',
    'The popup surface cannot be a Paper instance: a Figma instance cannot host the option rows. Reproduced by hand (white bound to color/common/white, radius 4, shared elevation style).',
    'No empty-list surface and no loading state. loading is set on 27 elements / 27 files; noOptionsText on 25 / 24.',
    'Grouped only indents the row and draws NO group heading — while AutocompleteOverrides styles a groupLabel slot and assigns it text.primary, proving the heading exists in code. 6 files group.'
  ],
  defects: [],
  instanceRatio: { allNodes: '18.9%', excludingAnnotationText: '35.1%', nodes: 143, instances: 27 },
  keptFromPriorFrame: 'The long provenance note kept verbatim — it separates SOURCE-VERIFIED (option height 36, listbox 8px padding, field 56, DownCaret) from DRAWN-FOR-CONTEXT (popper offset, paper elevation) from OPEN (popup indicator rotation). Its core claim was re-verified this pass: ListOverrides sets MuiList.defaultProps.disablePadding = true globally, and the Autocomplete listbox is not a MuiList. The closed/open examples were kept and reparented under Anatomy.',
  replaced: 'The generic header ("Varies — Examples"). Eight sections added.',
  fixed: 'An unbound white fill on the original listbox frame, per standingBatchRules 2. Frame now carries 0 unbound non-text paints.'
};

s.selectAndMenu2026_08_31 = {
  ...common,
  frame: '154:11, Compositions / Inputs',
  production: {
    select: '76 elements / 54 files', textFieldSelect: '24 elements / 20 files', combinedFiles: 74,
    anchoredMenu: '27 elements / 26 files', menuItem: '230 elements / 112 files', auditSaid: 53
  },
  auditCorrection: 'The audit records "Menu published with no properties — a static picture". That is STALE. Menu (749:323) carries four INSTANCE_SWAP item slots, three visibility booleans and an elevation axis, added by propertySurfaceRepair2026_08_26.',
  headlineFinding: 'The frame name bundles two surfaces production keeps apart. Of the 74 files carrying a select and the 26 carrying an anchored Menu, EXACTLY ONE contains both. A Select menu is a value picker; an anchored Menu holds commands. This explains the Inputs-versus-Surfaces coin flip recorded in libraryRestructure2026_08_26c — it is not one composition. Recorded, NOT resolved.',
  varies: {
    twoCodePaths: 'Select and TextField-select both render one drawn control; Figma models both with Text field + select. No distinction needed.',
    size: '45 of 100 set size and EVERY one sets small; 55 take the medium default. Production disagrees about whether to set it, never about what to set it to.',
    itemProduction: '82 of the 127 select and menu elements build items with .map() over data, so the count is unknowable at authoring time. Of those written literally, 6 hold five to eight items.'
  },
  gaps: [
    'Menu caps at 4 items (four slots, three Show booleans). 82 of 127 elements are mapped/unbounded and 6 literal ones already exceed four.',
    'Menu/Item is label-only. 57 of 230 MenuItem elements need more: leading ListItemIcon 24 el / 12 files, two-line ListItemText 27 / 15, Checkbox 8 / 5, CircularProgress 5 / 2.',
    'No group heading. ListSubheader in 8 elements / 8 files; Menu has no subheader slot and no way to interleave one between items.',
    'Text field has no variant axis — every variant is outlined. 5 Select elements set a variant, 4 explicitly to standard, which cannot be drawn.'
  ],
  stateCoverageIsComplete: 'Menu/Item carries all six states and production uses disabled on 31 elements / 18 files and selected on 2. Content coverage is the problem, not state coverage.',
  instanceRatio: { allNodes: '17.1%', excludingAnnotationText: '34.9%', nodes: 129, instances: 22 },
  verification: 'Per standingBatchRules 10, all 11 menu item labels were verified by reading rendered characters, not property values. All matched.',
  unverifiable: 'The preserved anchoring note asserts Menu.js sets anchorOrigin {bottom,left} and transformOrigin {top,left}. It could NOT be re-verified — node_modules is absent — so it stands as a prior pass claim, not one this pass confirmed.'
};

s.buttonGroupSegmentRow2026_08_31 = {
  ...common,
  frame: '161:110, Compositions / Actions',
  production: { files: 20, elements: 23, auditSaid: 20, agreement: 'EXACT — the only composition in this batch where the audit count matched.' },
  positionAxis: 'Position was ALREADY demonstrated correctly in the prior frame — all five groups ran First, Middle, Last in order. What was missing was any explanation of why the axis exists. Verified from source: ButtonGroupOverrides styles "&:not(:last-of-type)" on groupedContainedPrimary and groupedContainedSecondary to set the shared border and suppress the right edge. Figma cannot evaluate a sibling selector, so Position carries that as a hand-set variant. A correct-versus-wrong pair was added (three segments all set to First visibly doubles the joins), deliberately OUTSIDE a dashed panel because it is an assembly mistake, not a library fault; the frame legend says so.',
  threeJobs: {
    viewOrPresetSwitcher: '7 files, one segment active',
    splitButton: '7 files — and a separate Split button component (627:161, 8 variants) is published for exactly this, so these should not be assembled from segments',
    ribbonToolbar: '4 groups in composition-ui EditorRibbon, icon-only formatting controls',
    plainActionPair: 'the remainder',
    segmentCount: '14 of 19 countable groups hold exactly 2, 3 hold 3, 1 holds 4. No cap problem.'
  },
  themeFinding: 'ButtonGroupOverrides.defaultProps is { variant: "contained", color: "secondary" }, INVERTING MUI\'s outlined/primary defaults. Then 12 of 23 elements explicitly set color="primary", overriding the library default back toward MUI\'s. The default the library chose is the minority outcome. orientation is never set — all 23 horizontal.',
  gaps: [
    'No selected or pressed State — the axis is Default/Hover/Disabled. The most common job the component does is the one it cannot draw. 7 files need it.',
    'No variant axis; all 54 variants are the contained appearance. 4 elements set variant="outlined", which ButtonGroupOverrides ALSO does not style — every styleOverrides key it defines is contained-specific (groupedContainedPrimary, groupedContainedSecondary, groupedContainedHorizontal, contained), so those files render MUI stock outlined with no Tebra styling. SAME SHAPE as the outlined-Alert finding in the alert composition.'
  ],
  convergenceWorthRecording: 'How production draws a selected segment is NOT scattered. 6 files add a conditional leading CheckIcon and 6 apply an inline sx. Two of those styles — documents-ui/DocumentsViewSwitcher and appointment-workflow-ui/ApplicationNav — are defined independently in different packages and are character-for-character identical: backgroundColor primary.main, color "#ffffff" (a hardcoded hex, not a token). Two teams reached the same answer separately and neither had anywhere shared to put it. RECORDED, NOT PROMOTED TO GUIDANCE.',
  instanceRatio: { allNodes: '21.6%', excludingAnnotationText: '41.7%', nodes: 116, instances: 25 },
  keptFromPriorFrame: 'All five colour/size/disabled permutation groups, and the Position assembly note. Their "default per ButtonGroupOverrides defaultProps" annotation was verified correct.'
};

s.tableAssembly2026_08_31 = {
  ...common,
  frame: '446:3, Compositions / Data display',
  production: {
    table: '21 elements / 21 files (audit said 15 — that figure matches TableContainer, which is 15 files)',
    tableRow: '62 elements / 32 files', tableCell: '164 elements / 34 files',
    tableHead: '19 / 19', tableBody: '20 / 20', tableContainer: '15 / 15', tableSortLabel: '3 elements / 2 files',
    tablePagination: '0 production files', tableFooter: '0 production files',
    distributedAssembly: '16 files use TableCell and 14 use TableRow with NO <Table> in the same file — rows and cells are split into their own component files, so a table is assembled across files. 6 of the 21 tables have no TableContainer.'
  },
  duplicateQuestionResolved: {
    verdict: 'SUPERSEDED, not duplicate and not complementary.',
    reasoning: '193:14 "Table assembly — composed table" is 51 descendants / 24 instances: one 4-column, 5-row table of placeholder "Cell value" text with an empty What-it-is line (already flagged in libraryRestructure2026_08_26c.compositionHeaders.emptyWhatItIs). 446:3 "Table assembly" is 1213 descendants / 312 instances across twelve numbered sections, and its section 1 "Default table" covers everything 193:14 shows, with real data. 193:14 contributes nothing 446:3 lacks.',
    actionTaken: 'NOTHING DELETED, per the build prompt. 193:14 was renamed to "Table assembly — composed table (SUPERSEDED by Table assembly 446:3)" and its What-it-is line rewritten to say so and to say do not build on it. 446:3 carries a Supersedes line in its header. Whether to remove 193:14 is left as a separate decision.'
  },
  gaps: [
    'ROW STATE AND REAL CONTENT ARE MUTUALLY EXCLUSIVE. Table/Row owns the only Hover and Selected appearance in the system but is four text cells of 180px with no way to change their number, widths or content; an instance cannot take children. Any other table must draw its rows from Table/Cell instances, and a drawn row has no State. The frame proves it: only section 5 of 12 uses Table/Row (5 instances) and 68 rows elsewhere are drawn. In production 87 of 164 cells hold a component rather than text — Typography 47, Box 37, Skeleton 20, IconButton 10, Checkbox 5, Button 5.',
    'Table/Cell exposes one property (Text), so a cell holds one string. Half of all production cells hold something else.',
    'No density axis. MUI sets density with size="small" on the Table; 15 of 21 production tables set it and every one sets small, while 6 take medium. Table/Cell has a padding axis but its values are MUI\'s padding prop (normal/none/checkbox), not density. Section 4 draws both densities by hand.'
  ],
  openQuestionRecorded: 'Table/Row Hover is a solid #CBDDE0 — exactly palette.action.hover, which is also primary[100] — while Selected is primary.main #004852 over white at 8% alpha. palette.action.selected is #F0EEE8, a warm cream that appears nowhere in the row, so the selected row is not drawn from the token named for it. Whether that is correct depends on MUI\'s own TableRow rule, which could not be read (node_modules absent). Recorded as an open question, NOT marked as a defect. The observable consequence is not in question: hovering a row signals harder than selecting it.',
  instanceRatio: { allNodes: '41.6%', excludingAnnotationText: '53.8%', nodes: 699, instances: 291, note: 'Highest of the batch — this frame was already the best-built reference in the file.' },
  deliberateDeviation: 'This frame was NOT reshaped to the 1632-wide template. It is 2368 wide with twelve sections already built to 2240, and its own Shows / Use when / Not this when / Source caption convention is accurate and richer than the template note. Reshaping would have destroyed good work. Template-level additions were made instead: header with counts and marker legend, an Anatomy section with parts legend, three GAP markers, and How to build one with an explicit Not established paragraph. The frame now carries BOTH conventions; unifying them is an open decision recorded in its closing paragraph.'
};

s.fourCompositions2026_08_31 = {
  _status: 'BUILT, NOT PUBLISHED. Compositions remain unpublished reference frames per libraryRestructure2026_08_26c.settledDecisionsApplied.compositionsAreReferenceFrames.',
  frames: ['371:780 Autocomplete open state', '154:11 Select + Menu', '161:110 Button group segment row', '446:3 Table assembly'],
  noComponentModified: 'Verified after the batch: 13 component sets re-read and matched on name, variant count and property count — Autocomplete/Field 30, Autocomplete/Option 5, Autocomplete/Tag 2, Text field 20, Checkbox 24, Menu 2, Menu/Item 6, Button group/Segment 54, Button 72, Split button 8, Table/Cell 6, Table/Row 3, Paper 12. Zero COMPONENT or COMPONENT_SET nodes exist inside any composition frame.',
  pageLayoutIntact: 'All seven Compositions-page section x/y positions are byte-identical to the start of the batch; sections grew in HEIGHT only. Zero section overlaps. Frames were repositioned only WITHIN their own section, preserving production-count order: Autocomplete (88 files) above Select + Menu (74) in Inputs; Button group segment row (20) above Selection / bulk action bar (14) in Actions. Data display frame positions were left exactly as hand-placed.',
  recurringAcrossCompositions: {
    oneTextPropertyPerRow: 'Autocomplete/Option, Menu/Item and Table/Cell each expose exactly one TEXT property, and in all three production overwhelmingly needs more — 52 of 88 Autocomplete files customise the option row, 57 of 230 MenuItems need icon/two-line/checkbox/spinner content, and 87 of 164 table cells hold a component. This is one component-layer problem showing up three times, not three composition problems.',
    instancesCannotHostChildren: 'The same Figma constraint forced scaffolding in three frames: the Autocomplete listbox cannot be a Paper instance, a Menu cannot exceed its four slots, and a Table/Row cannot take real cells. It is the single largest driver of drawn-rather-instanced nodes across the batch.',
    stateVersusContent: 'Table/Row and Button group/Segment share a shape: the component that owns the visual states cannot carry the content production needs, so the states go unused. Table/Row is used in 1 of 12 sections; Button group/Segment has no selected state at all.',
    outlinedIsUnstyled: 'ButtonGroupOverrides styles only contained keys, leaving 4 outlined groups with MUI stock appearance — the SAME shape as the alert composition\'s finding that AlertOverrides has no outlined rules. Worth treating as a theme-layer pattern rather than two isolated bugs.',
    productionOverridesTheThemeDefault: 'Three independent cases: 24 of 25 Autocomplete files override noOptionsText; 12 of 23 ButtonGroups override the library colour default back to MUI\'s; 53 of 106 Autocompletes decline the size the theme does not set. Where the theme takes a position, production frequently takes another.'
  },
  instanceRatioMethodNote: 'The build prompt cites dialog 87.5% and alert 92%. Those figures could NOT be reproduced by any measure applied here. Measured identically across all frames: all-authored-nodes gives Autocomplete 18.9%, Select+Menu 17.1%, Segment row 21.6%, Table 41.6%, against alert 11.6% and dialog 15.1%; excluding annotation text gives 35.1 / 34.9 / 41.7 / 53.8 against alert 21.3 and dialog 35.9; a UI-elements-only heuristic gives 55.1 for Autocomplete against alert 63.9 and dialog 60.9. On every consistent measure all four new frames sit at or above the two templates. The 87.5/92 baseline should be treated as unreliable until its method is recorded.',
  toolingBuilt: 'composition-scan.js (balanced-brace JSX scanner with import-source resolution and TSX generic handling) and comp-analyze.js, in C:/Code/design system. Reusable for the remaining compositions.',
  constraintHit: 'Node deletion was blocked by the harness for the whole batch, so every frame was brought up to template additively — mutating text in place and reparenting accurate content rather than removing anything. This suited the prompt\'s delete-nothing rule, and no content was lost; the only cost was one stray empty text node in the segment row, which was repurposed into a real note rather than removed.'
};

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('logged. top-level keys now:', Object.keys(s).length);
console.log(Object.keys(s).slice(-6).join('\n'));
