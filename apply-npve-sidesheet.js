// apply-npve-sidesheet.js — records the read-only inventory of Sidesheetv3 (129:6647, NDE-2026)
// as batch npveRebuild_sidesheet_inventory_2026-09-02, with a backup first. GAP/DEFECT findings also go to flags[].
// Data: figma-export/npve-sidesheet-2026-09-02/inventory-data.js; key-prefix inventories from the enum batch data file.
const fs = require('fs');
const P = './design-system-schema.json';
const BACKUP = './design-system-schema.backup-2026-09-02-pre-npve-sidesheet.json';
const D = require('./figma-export/npve-sidesheet-2026-09-02/inventory-data.js');
const libs = JSON.parse(fs.readFileSync('./figma-export/npve-enum-2026-09-02/enum-data.json', 'utf8')).libraryKeyPrefixes;

fs.copyFileSync(P, BACKUP);
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s.npveRebuild_sidesheet_inventory_2026_09_02) throw new Error('batch entry already exists');

const REB = new Set(libs.rebuild.split(',')), KIT = new Set([...libs.kitA.split(','), ...libs.kitB.split(',')]);
function cls(p) { if (p.startsWith('L')) return 'Local'; if (REB.has(p)) return 'DSR'; if (KIT.has(p)) return 'Kit'; return 'Other'; }

// per-child provenance + set-wide component roll-up
const totals = { instances: 0, DSR: 0, Kit: 0, Other: 0, Local: 0 };
const byComponent = {};
const children = D.children.map(c => {
  const [name, id, x, y, w, h, vis, layout, kids, fam] = c;
  const counts = { instances: 0, DSR: 0, Kit: 0, Other: 0, Local: 0 };
  for (const kv of (D.inst[id] || '').split(',').filter(Boolean)) {
    const i = kv.lastIndexOf(':'); const p = kv.slice(0, i), n = Number(kv.slice(i + 1));
    const k = cls(p); counts.instances += n; counts[k] += n; totals.instances += n; totals[k] += n;
    const key = k + ' | ' + (D.names[p] || p); byComponent[key] = (byComponent[key] || 0) + n;
  }
  return { name, id, x, y, w, h, visible: !!vis, rootLayout: layout, directChildren: kids, family: fam, provenance: counts, structure: D.structure[id] };
});
const componentRollup = Object.entries(byComponent).sort((a, b) => b[1] - a[1]).map(([k, v]) => ({ component: k, instances: v }));

const mapping = [
  { region: 'Container (paper, 550 or 441 wide, #FFFFFF, 1px #D6D6D6 all sides, no shadow)', source: 'variant root frame', dsr: 'Drawer 749:239, variant anchor=right, variant=persistent 749:230', verdict: 'DEFECT', note: 'Library Drawer is 320 wide with a single-edge stroke (persistent) or a shadow (temporary); source is 550/441 with a full 1px border. Width is an instance override; edge treatment is not.' },
  { region: 'Body slot (free content under the header)', source: 'Main Wrap / Summary_Wrap / MainWrap / BODY', dsr: 'none', verdict: 'GAP', note: 'Drawer 749:239 ships four fixed List/Item children and no slot; an instance cannot host arbitrary children (CLAUDE.md rule 6). The body must be a sibling frame or SCAFFOLDING.' },
  { region: 'Header bar (64 tall, p16, title Akkurat LL Bold 20/32 #545454, bottom rule)', source: 'Breadcrumbs / Header / HEADER / NoteHeader', dsr: 'Drawer Header 749:231 + Divider 749:234 (inside 749:230)', verdict: 'DEFECT', note: 'Library header is 56 tall, p8/8/8/16 g8, title #000000 (bound text primary). Source is 64 tall, p16, title #545454, gap 16 (fractional 16.022 on 30 children). Dialog Title 186:5 is Regular weight and p16/24, further away.' },
  { region: 'Close control', source: 'Interface, Essential/Delete, Disabled 24x24 icon, no hit area (all 54)', dsr: 'Icon button 170:77 (color=default, size=medium) with Icon/CloseOutlined 76:11 or Icon/Close (MUI) 106:4', verdict: 'DEFECT', note: 'Source renders a bare 24px icon-pack glyph; library renders a 40x40 button. The Drawer header already carries this pairing.' },
  { region: 'Back control (edit pages)', source: 'Breadcrumb Buttons 32x32 fill #E9EFEE (129:7826, 129:12486; hidden on 4 others)', dsr: 'Icon button 170:77 with Icon/ArrowLeft 575:3', verdict: 'DEFECT', note: 'Source has a tinted 32px square; library icon button has no fill.' },
  { region: 'Header divider', source: 'bottom stroke #D6D6D6 on the header frame (32 children)', dsr: 'Divider 171:31 (Orientation=Horizontal)', verdict: 'DSR', note: 'Same 1px #D6D6D6; library binds it, source does not.' },
  { region: 'Footer action row (60 tall, p8, gap 21, top rule, right-aligned)', source: 'Frame 758531478 / FOOTER (39 children); Footer 76 tall p20 g12 (5 Problems children)', dsr: 'none as a component; Dialog Actions 186:9 (54 tall, p8 g8, no rule) is the nearest pattern', verdict: 'GAP', note: 'No footer/actions component exists outside Dialog, and Dialog Actions is not separable. Two footer heights and two paddings coexist in the source.' },
  { region: 'Footer buttons: Cancel / Save & Add to Note / Save', source: 'kit Text Button 72, kit Button outlined 171, kit Button Primary 66 (36 tall)', dsr: 'Button 79:2 variant=text; Button 79:2 variant=contained color=primary', verdict: 'GAP', note: 'The outlined middle button ("Save & Add to Note", "Create New Flowsheet", "Add Active Problems to Note", 518-wide "Add …" rows) has no library variant: Button 79:2 offers contained and text only, and ButtonOverrides.ts has no outlined rule. Dialog instance 787:1457 renders contained at 94x38 where the kit renders 36.' },
  { region: 'Full-width footer button (Vitals 425, Med List 510)', source: 'kit Button Full Width=True / _button template', dsr: 'Button 79:2 resized', verdict: 'GAP', note: 'No fullWidth axis on the library Button; MUI has one.' },
  { region: 'Contextual alert', source: 'kit Contextual Alert 534x40 (Warning/Error/Info)', dsr: 'Alert 165:57', verdict: 'DSR (paint not compared this batch)', note: 'Library Alert paint was not read against the kit alert in this batch.' },
  { region: 'Text fields', source: 'kit Text Field - Desktop / - Tablet + Mobile, plus 9 detached _input field templates', dsr: 'Text field 121:350', verdict: 'DSR', note: '' },
  { region: 'Autocomplete / select', source: 'kit Autocomplete Select Field, Autocomplete dropdown, Dropdown - Open', dsr: 'Autocomplete/Field 86:95, Autocomplete/Option 88:175, Autocomplete/Tag 103:100', verdict: 'DSR', note: '' },
  { region: 'Chips (status, filter)', source: 'kit Chip - Status, Chip - Input (Filter)', dsr: 'Chip 156:171', verdict: 'DSR', note: '' },
  { region: 'Hand-drawn badges (22 tall pills #D0ECF1/#83CDD9, #F7F7F7/#DEDEDE)', source: 'Frame "Badge" on Page49, Labs, Documents', dsr: 'Chip 156:171 size=small', verdict: 'DEFECT', note: 'Library Badge 208:955 is the MUI count badge, not a label pill. Chip is the nearest and renders at a different height.' },
  { region: 'Checkbox / radio rows', source: 'kit Checkbox, Radio Option; 15 DSR Form control label + Checkbox on the Problems children', dsr: 'Checkbox 136:47, Radio 137:31, Form control label 140:15', verdict: 'DSR', note: 'The Problems children already use the library.' },
  { region: 'Segmented control / tabs (hidden scaffold)', source: 'kit Tab Set; hand-drawn Selector and Tabs frames (#F0F0F0 / #ECECEC grounds)', dsr: 'Tabs 201:14 with Tabs/Tab 201:13; Button group/Segment 160:996 or Toggle button 202:95 for the segmented style', verdict: 'DSR', note: 'Hidden in every child; not part of the visible template.' },
  { region: 'Flowsheet sub-header band (#F5F5F5, 74 tall, field + outlined button)', source: 'SUBHEADER / 2NDROW', dsr: 'none', verdict: 'GAP', note: 'Composition-level pattern, no component.' },
  { region: 'Flowsheet column header row (#D4E0DD, Bold 14/18)', source: 'Frame 758532067', dsr: 'Table/Row 190:49 header, Table/Cell 190:21', verdict: 'DSR (paint not compared this batch)', note: '' },
  { region: 'Data grid (CareCoordination)', source: 'kit Data Grid 502x396', dsr: 'none', verdict: 'GAP', note: 'The library has Table/Row and Table/Cell only; DataGrid is a separate mechanism (CLAUDE.md rule 7).' },
  { region: 'Section heading (Bold 16/24 #545454)', source: 'text nodes', dsr: 'text style only', verdict: 'GAP', note: 'No heading component; typography variables exist.' },
  { region: 'Rich text summary (16/150%)', source: 'mixed-style TEXT nodes', dsr: 'text style only', verdict: 'GAP', note: '' },
  { region: 'Form card (#EEF7F9, stroke #D6D6D6, p12/p16)', source: 'Frame 758531490 on six edit children', dsr: 'Card 176:59 / Paper 171:27', verdict: 'DEFECT', note: 'Source fill is a tint; library Card/Paper fill was not read this batch, but the library paper is color/background/paper (white) by convention.' },
  { region: 'Row action icon buttons (40x40 outlined circle, stroke #8CA7A2)', source: 'hand-drawn frames on Problems, Vitals, Med List', dsr: 'Icon button 170:77 with Icon/EditOutlined 575:13 / Icon/AddPaymentNote 575:2', verdict: 'DEFECT', note: 'Library icon button has no outline ring.' },
  { region: 'List dividers', source: 'kit Divider/Color=Light', dsr: 'Divider 171:31', verdict: 'DSR', note: '' },
  { region: 'Thumbs feedback', source: 'kit ThumbsUp / ThumbsDown', dsr: 'Icon button 170:77 with Icon/ThumbUpOutlined (MUI) 919:4 / ThumbDownOutlined 919:7', verdict: 'DSR', note: '' },
  { region: 'Rich-text toolbar (PsychotherapyNote)', source: 'hand-drawn 32x32 buttons with icon-pack glyphs', dsr: 'Icon button 170:77 with Icon/FormatBold 200:19, FormatItalic 200:22, FormatUnderline 200:26, Icon/List 200:7', verdict: 'GAP', note: 'Strikethrough, undo and redo have no library icon.' },
  { region: 'Icon-pack glyphs with a library equivalent', source: 'trash, pen, lock, search, calendar, caret up/down, plus, close, check, arrow-left, ellipsis, chat, star, print, drag, sort, info/warning/attention', dsr: 'Icon/TrashOutlined 76:14, Icon/EditOutlined 575:13, Icon/Lock 575:21, Icon/Search 575:30, Icon/Calendar 200:32, Icon/UpCaret 575:37, Icon/DownCaret 76:5, Icon/PlusOutlined 76:8, Icon/CloseOutlined 76:11, Icon/CheckmarkFilled 575:7, Icon/ArrowLeft 575:3, Icon/LinearEllipsis 109:4, Icon/ChatOutlined 575:6, Icon/FavoritesOutlined 575:17, Icon/PrintOutlined 575:26, Icon/DragAndDrop 575:12, Icon/Unsorted 575:36, Icon/InfoFilled 164:10, Icon/WarningFilled 164:13, Icon/AttentionFilled 164:7', verdict: 'DSR', note: 'Glyph shapes differ between icon packs; match is by meaning.' },
  { region: 'Icon-pack glyphs with no library equivalent', source: 'Syringe, virus, Flag, Send, Mail, Strike, Photo, Clip, Chart Square, lab-tube, prescription, bandage, heartbeat, crutches, airplane, bulb, brain_02, hospital, dots, Notes, User group, Ticket, Status menu, medical-cross-refresh, undo/redo arrows, open_in_new, diversity', dsr: 'none', verdict: 'GAP', note: 'Mostly on the two hidden Index children and the toolbar.' },
  { region: 'Chart config and sparklines', source: 'local ConfigAndData-Line component, BarLineChart frames', dsr: 'none', verdict: 'GAP', note: '' }
];

const matrix = {
  _reading: 'Rows are structural axes (a region present or absent, or a different width). Anything not listed varies by content only: title text, body content, item count, alert text, which buttons are shown.',
  axes: {
    width: { '550': 48, '441 (Vitals)': 6 },
    headerLayer: { 'Breadcrumbs (title in wrapper, close in a right-aligned frame)': 41, 'Header (title fills, close direct; Problems/Med List)': 5, 'HEADER (Flowsheets 939:9228, 861:7047)': 2, 'NoteHeader 65 tall gap 8 (129:7950, 129:12486)': 2, 'Breadcrumbs with title in Frame 758531830 (Vitals)': 6 },
    headerBottomRule: { present: 32, absent: 22 },
    backButtonVisible: { yes: ['129:7826', '129:12486'], hiddenInstancePresent: ['129:10016', '4618:4930', '4618:5137', '129:8130'] },
    hiddenNavScaffold: { 'Frame 758531776 + Frame 758531780 + Frame 758531486 + Tabs': 38, 'Frame 143725286 only': 6, none: 10 },
    subHeaderBand: ['939:9228', '861:7047', '867:7460', '909:12649'],
    toolbar: ['129:7614'],
    bodyPadding: { 'p8/8/8/8': ['129:7340', '4079:15495', '2459:10180', '2466:10562', '129:7431', '129:7467', '129:7494', '129:7546', '129:7580', '129:7614'], 'p8/16/8/16': 'most Clinical and all Vitals (30)', 'p0/16/8/16': ['129:7726', '129:7826'], 'p16/20/16/20': ['545:5239', '4704:17095', '4494:3240', '4536:27605', '545:5557'], 'p16/16/16/16': ['129:10016', '4618:4930', '4618:5137'], 'p0/8/8/8': ['129:6648', '129:6995'], 'p0/1/0/1': ['939:9228', '861:7047', '867:7460', '909:12649'] },
    bodyGap: { 8: 8, 12: 22, 16: 17, 24: 3, 0: 4 },
    bodyHeightMode: { 'fixed 476 (root 600)': 27, hug: 27 },
    footer: { 'Frame 758531478 / FOOTER 60 tall p8 g21 top-level': 33, 'Frame 758531478 60 tall INSIDE the body (518 wide)': ['129:7364', '129:7726', '129:7826', '129:7950', '129:12486'], 'Footer 76 tall p20 g12 (Problems)': ['545:5239', '4704:17095', '4494:3240', '4536:27605', '545:5557'], none: ['129:6648', '129:6995', '129:7340', '4079:15495', '2459:10180', '2466:10562', '129:7431', '129:7467', '129:7494', '129:7546', '129:7580', '129:7614'] },
    footerButtonPattern: { 'Cancel + Save & Add to Note + Save (72,171,66)': 9, 'Save & Add to Note + Save (171,66)': 17, 'single full-width': ['129:10481', '3569:22346', '3557:15328', '3496:15197', '3501:15528', '545:5557'], 'single outlined/primary': ['939:9228', '861:7047', '867:7460', '909:12649', '129:7726', '129:7950'], 'two (243,66)': ['545:5239', '4704:17095', '4494:3240'], 'three with leading destructive text button': ['4536:27605'], 'three (72,66,127)': ['3496:14449'], 'four (205,80,67,119)': ['129:8774'], 'three inside body (132,105,69)': ['129:7364'], 'DSR text button + two (68,171,66)': ['4618:4930'] },
    rootOverlayOutsideFlow: ['4494:3240 (Autocomplete dropdown 344x132 + image rectangle 23x30)'],
    contentOverflowsFixedBody: ['648:1603', '3496:15197', '3501:15528']
  },
  contentOnlyPairs: [
    ['129:8517', '648:1603', 'form card present vs empty MainWrap'],
    ['129:10016', '4618:4930', '4618:5137', 'search results vs recent vs favourites; star glyph'],
    ['545:5239', '4704:17095', 'items shown vs hidden (empty state)'],
    ['129:10481', '3569:22346', '3557:15328', 'alert shown; quick-entry field expanded'],
    ['939:9228', '861:7047', 'chart band hidden vs shown'],
    ['867:7460', '909:12649', 'sub-header 74 vs 58 tall only'],
    ['129:8774', '129:8843', 'view vs edit form'],
    ['129:9205', '129:9392', 'comment field open'],
    ['129:8316', '129:8401', '129:8517', '648:1603', '129:8651', '648:3473', 'External Care / Procedures view vs edit'],
    ['129:7546', '129:7580', 'identical structure; variant names and title texts are swapped'],
    ['129:6648', '129:6995', 'tile widths 167 vs 255']
  ]
};

const templateProposal = {
  _status: 'PROPOSAL, NOT A FINDING. Nothing was built. Property names below are Figma-only affordances in Sentence case (CLAUDE.md rule 2); none mirrors a code prop because no sidesheet component exists in packages/design-system.',
  regions: [
    { name: 'Sheet', spec: 'VERTICAL, p0, g0, width 550 (Vitals variants would use 441), fill color/background/paper, stroke 1px color/grey/400 all sides. Built as a frame, not a Drawer instance, because the Drawer instance cannot host the body (rule 6).' },
    { name: 'Header', spec: 'HORIZONTAL, 64 tall, p16, g16, fill none, bottom Divider 171:31. Children: optional back Icon button 170:77 with Icon/ArrowLeft 575:3; Title Akkurat LL Bold 20/32 bound to text secondary (#545454 as drawn) filling; close Icon button 170:77 with Icon/CloseOutlined 76:11.' },
    { name: 'Sub-header', spec: 'Optional HORIZONTAL band, fill color/grey/300, bottom Divider; holds a Text field or Autocomplete/Field and one Button. Off by default.' },
    { name: 'Body', spec: 'VERTICAL, p8/16/8/16, g16, fill none, FILL height between Header and Footer, clipsContent (scroll area). Content is placed by the consumer; the template ships it empty.' },
    { name: 'Footer', spec: 'Optional HORIZONTAL, 60 tall, p8, g8, top Divider, right-aligned. Two Button 79:2 slots: variant=text (Cancel) and variant=contained color=primary (Save). A third outlined slot cannot be expressed until the library has an outlined Button.' }
  ],
  properties: [
    { name: 'Show back', type: 'BOOLEAN', default: false, toggles: 'back Icon button in Header' },
    { name: 'Show sub-header', type: 'BOOLEAN', default: false, toggles: 'Sub-header band' },
    { name: 'Show footer', type: 'BOOLEAN', default: true, toggles: 'Footer' },
    { name: 'Show secondary action', type: 'BOOLEAN', default: true, toggles: 'the text Button in Footer' },
    { name: 'Full-width action', type: 'BOOLEAN', default: false, toggles: 'single Button stretched across Footer (Vitals, Med List pattern); mutually exclusive with Show secondary action' },
    { name: 'Title', type: 'TEXT', default: 'Title', toggles: 'header title characters' },
    { name: 'Primary action', type: 'INSTANCE_SWAP', default: 'Button variant=contained color=primary', toggles: 'trailing footer button' },
    { name: 'Secondary action', type: 'INSTANCE_SWAP', default: 'Button variant=text color=primary', toggles: 'leading footer button' }
  ],
  coverage: 'Every one of the 54 children resolves to Sheet + Header + Body with at most Sub-header, Footer and back-button toggles; the two footer heights (60 and 76) and three body paddings collapse to one value each. What the template does not carry: the Flowsheets column header row, the PsychotherapyNote toolbar, the Patient Summary feedback row, and the hidden navigation scaffold, all of which are body content or dead layers.',
  decisionsForDaniel: ['Width: 550 vs the library Drawer 320 vs code drawerWidth (set per use in FilterGroupDrawer).', 'Title colour: source #545454 vs library Drawer header #000000.', 'Outlined Button variant: needed for the middle footer action on 26 children; absent from library and code overrides.', 'Footer height: 60 (39 children) vs 76 (5 Problems children).']
};

s.npveRebuild_sidesheet_inventory_2026_09_02 = {
  _status: 'READ-ONLY INVENTORY COMPLETE. Stopped after step 7. Nothing built; no writes to source or library; target not opened.',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq (NDE-2026), page "⚙️ Components" 21:321, node 129:6647 "Sidesheetv3" COMPONENT_SET 18040x2415 at (-1888, -3940)',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read with loadAsync only',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6 not touched',
  date: '2026-09-02',
  method: {
    walk: 'page.loadAsync() then findAllWithCriteria; skipInvisibleInstanceChildren=false; no setCurrentPageAsync. Structure read to depth 3 below each variant without descending into instances; every INSTANCE at any depth resolved to its main component.',
    provenance: 'Same 8-hex key-prefix match as npveRebuild_enum_2026-09-02 against the on-canvas inventories of Design System Rebuild and Tebra Working UI Kit.',
    paints: 'Read from the rendered nodes under 129:6647 (hex + alpha + bound flag). Library Dialog paints read from instance 787:1457 on Compositions; library Drawer paints are master-level because no Drawer instance exists on any library page and this batch may not create one.',
    screenshots: '129:6647 whole at 4096px; every VISIBLE child at 1x (34 images). The 20 hidden children render as 1x1 blank PNGs through get_screenshot; Figma does not rasterise an invisible node and making one visible would be a write. Saved under figma-export/npve-sidesheet-2026-09-02/.'
  },
  setLevelFindings: {
    propertyDefinitionsUnreadable: D.set.propertyReadError,
    childCounts: { total: 54, visible: 34, hidden: 20, withPagePrefix: 51, withoutPagePrefix: ['4494:3240 Clin_Problems-Drop', '4536:27605 Clin_Problems-Edit', '2116:8944 Clin_Vitals2'] },
    overlaps: D.overlapGroups,
    overlapReading: D.overlapReading,
    fractionalGap: 'Header itemSpacing 16.022226333618164 on 30 children (every "Breadcrumbs" header from 129:7340 onward except the hidden Clinical ones). Fractional geometry per CLAUDE.md rule 4.',
    swappedVariants: '129:7546 is named Page=Labs/Studies but its title reads "Documents"; 129:7580 is named Page=Documents but its title reads "Labs/Studies". 129:9614 Page=Clin_PSHx carries the title "Past Medical History".',
    remoteSelfReference: '129:8774 contains an instance of a REMOTE Sidesheetv3 variant (key 7b78051e…, "Sidesheetv3/Page=Page=Interface, Essential, Property 2=Calendar, Sched"), so a copy of this set is published from another file and nested back inside it.',
    scaffoldWiderThanRoot: 'On the six 441-wide Vitals children the hidden Frame 758531780 (550x60) and Tabs (550x52) still measure 550, wider than their 441 parent.',
    overflow: 'Three children have body content taller than their fixed 476 body: 648:1603 (556), 3496:15197 (516), 3501:15528 (558).',
    rootOverlay: '4494:3240 holds an Autocomplete dropdown instance and an image rectangle at variant root level outside the auto-layout flow.'
  },
  children,
  provenanceTotals: totals,
  provenanceReading: 'Of ' + totals.instances + ' instances under 129:6647: DSR ' + totals.DSR + ', Kit ' + totals.Kit + ', Other ' + totals.Other + ', Local ' + totals.Local + '. The 15 DSR instances are all on the four Problems children (Form control label, Checkbox, Icon/CheckboxUnchecked, one Button variant=text with PlusOutlined and DownCaret). Enum batch counted 4722 for this node with the same method.',
  componentRollup,
  paintSummary: D.paintSummary,
  typeSummary: D.typeSummary,
  library: D.library,
  mapping,
  variationMatrix: matrix,
  templateProposal,
  caveats: ['Structure was read to depth 3 and instances were not entered, so regions nested deeper (e.g. individual form fields inside form cards) are summarised, not itemised.', 'Library candidate paints other than Dialog were not compared in pixels; those rows say so.', 'The variant property list of 129:6647 could not be read; the Page= axis is inferred from child names.']
};

const B = 'npveRebuild_sidesheet_inventory_2026-09-02 (read-only source inventory)';
const F = [
  { id: 'npveSidesheet_noBodySlotInLibraryDrawer', severity: 'high', discoveredDuring: B, summary: 'GAP: the library Drawer 749:239 has no content slot; a sidesheet body cannot be hosted by a Drawer instance.', where: 'Design System Rebuild, Surfaces & navigation, Drawer 749:239 (variants 187:3, 749:212, 749:221, 749:230)', detail: 'All four variants hold a Header, a Divider and four List/Item instances. Instances cannot host children (CLAUDE.md rule 6). Every one of the 54 Sidesheetv3 children needs a free body under the header.', webAppV2BugListCandidate: false, handling: 'Reported. The template proposal builds the sheet as a frame and reuses Drawer parts (Icon button, Divider) rather than a Drawer instance.' },
  { id: 'npveSidesheet_headerDiffersFromDrawerHeader', severity: 'medium', discoveredDuring: B, summary: 'DEFECT: Drawer Header 749:231 renders 56 tall, p8/8/8/16 g8, title #000000; the source sidesheet header is 64 tall, p16, g16, title #545454.', where: 'Drawer 749:230 Header 749:231 vs Sidesheetv3 headers (e.g. 636:3565, 545:5503)', detail: 'Same type (Akkurat LL Bold 20/32) and same close-icon idea, different box and colour. Dialog Title 186:5 is Regular weight with p16/24, further away still.', webAppV2BugListCandidate: false, handling: 'Reported for decision: adopt the library header or add a sheet header.' },
  { id: 'npveSidesheet_noOutlinedButton', severity: 'high', discoveredDuring: B, summary: 'GAP: 26 sidesheet children use an outlined pill button (kit Button Type=Default / _button template) for the middle footer action and "Add …" rows; Button 79:2 has no outlined variant and ButtonOverrides.ts defines no outlined rule.', where: 'Button 79:2 (variant contained|text); overrides/ButtonOverrides.ts', detail: 'MUI base still accepts variant="outlined", so code may render it unstyled. Kit Button renders 36 tall; the library contained button reads 38 tall on instance 787:1457.', webAppV2BugListCandidate: true, handling: 'Reported. Decision needed before any footer can be rebuilt from the library.' },
  { id: 'npveSidesheet_noFooterActionsComponent', severity: 'medium', discoveredDuring: B, summary: 'GAP: no footer/action-row component exists outside Dialog; Dialog Actions 186:9 is not separable.', where: 'Dialog 747:185; Sidesheetv3 footers Frame 758531478 (60 tall p8 g21) and Footer (76 tall p20 g12)', detail: 'Two footer heights and two paddings coexist in the source. Dialog Actions is 54 tall p8 g8 with no top rule.', webAppV2BugListCandidate: false, handling: 'Reported; template proposes 60 tall p8 g8 with a Divider.' },
  { id: 'npveSidesheet_noFullWidthButtonAxis', severity: 'low', discoveredDuring: B, summary: 'GAP: six children stretch a single footer button to full width (kit Full Width=True); the library Button has no fullWidth axis.', where: 'Button 79:2; source 129:10481, 3569:22346, 3557:15328, 3496:15197, 3501:15528, 545:5557', detail: 'MUI Button has fullWidth. Resizing an instance is possible but undocumented.', webAppV2BugListCandidate: false, handling: 'Reported.' },
  { id: 'npveSidesheet_closeIsBareIconInSource', severity: 'low', discoveredDuring: B, summary: 'DEFECT: every source header closes with a bare 24px icon-pack glyph ("Interface, Essential/Delete, Disabled") with no hit area; the library pairs Icon button 170:77 with Icon/CloseOutlined 76:11 at 40x40.', where: 'all 54 children of 129:6647', detail: 'Rebuilding with the library changes the header geometry by 16px.', webAppV2BugListCandidate: false, handling: 'Reported.' },
  { id: 'npveSidesheet_drawerPaintMasterOnly', severity: 'low', discoveredDuring: B, summary: 'Library Drawer 749:239 has no on-canvas instance anywhere in the library, so its paints could only be read at master level this batch (rule 1 not yet satisfied for Drawer).', where: 'Design System Rebuild, all pages searched', detail: 'Dialog has 14 instances on Compositions and was verified on 787:1457. Drawer needs one instance placed in a later, write-permitted batch before any Drawer value is cited as evidence.', webAppV2BugListCandidate: false, handling: 'Reported; do not instantiate in a read-only batch.' },
  { id: 'npveSidesheet_sourceSetHasErrors', severity: 'info', discoveredDuring: B, summary: 'Source set 129:6647 reports "Component set has existing errors"; three children lack the Page= property prefix and two Labs/Documents variants have swapped titles.', where: 'NDE-2026 129:6647: 4494:3240, 4536:27605, 2116:8944; 129:7546 / 129:7580; 129:9614', detail: 'Also: 21 hidden children stacked on visible ones, header gap 16.022 on 30 children, a remote Sidesheetv3 variant nested inside 129:8774, root-level overlay nodes on 4494:3240, and three bodies overflowing their fixed height.', webAppV2BugListCandidate: false, handling: 'Reported as source evidence; nothing to fix in a read-only batch.' }
];
for (const f of F) { if (s.flags.some(x => x.id === f.id)) throw new Error('flag id collision ' + f.id); s.flags.push(f); }

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote npveRebuild_sidesheet_inventory_2026_09_02; children', children.length, 'totals', JSON.stringify(totals), 'flags +' + F.length, '=', s.flags.length, 'backup', BACKUP);
console.log('top components:', componentRollup.slice(0, 12).map(c => c.instances + ' ' + c.component).join(' | '));
