// apply-npve-problems-favorites.js — records batch npveRebuild_problemsFavorites_2026-09-02. Backup first. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-02-pre-npve-problems-favorites.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s.npveRebuild_problemsFavorites_2026_09_02) throw new Error('batch entry already exists');
const DIR = 'figma-export/npve-problems-favorites-2026-09-02/';
const BATCH = 'npveRebuild_problemsFavorites_2026-09-02';

s.npveRebuild_problemsFavorites_2026_09_02 = {
  _status: 'DONE through step 8. Second screen Clin_Problems-Favorites built as a Sidesheet instance with an overridden Problems picker body instance; both components extended additively; Problems picker screen 27:6 verified pixel-identical after the edits; Favorites comparison placed below the first. Main not built.',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6: Templates 3:2 (component edits), Screens 27:2 (new comparison 40:534)',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only (Tabs, Icon/FavoritesFilled, Icon/PlusOutlined and color/grey/600 imported by key in-script)',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only: 4618:5137 exported at 2x via download_assets',
  date: '2026-09-02',
  step1_reading: {
    tabsSetLevel: 'Tabs 201:14 (target import 26:199) exposes nothing: componentPropertyDefinitions {} and no instance properties on 26:244.',
    nestedTabs: 'Each Tabs/Tab child (Tab 1/2/3) carries selected (VARIANT no|yes), State (VARIANT) and Label#201:0 (TEXT). isExposedInstance exists on them (false).',
    liftable: 'NO. componentPropertyReferences accept only characters, visible and mainComponent, and nodes inside a nested instance carry no references from the parent component (probe on Tab 1: {}). A nested variant cannot become a parent property.',
    activeTabProperty: 'NOT EXPRESSIBLE as one property. Fallback built: three BOOLEAN properties Active All / Active Recent / Active Favorites on Problems picker body, each driving the visibility of its own Tabs instance (two added, hidden by default). Finding: two booleans can be on at once; the body cannot enforce exclusivity.',
    textField: 'Nested Text field 26:222 exposes Value text#123:11 and Label#123:0 (plus Helper text, Show helper, required, select, multiline and the three variant axes) on the instance. They cannot be lifted for the same reason. isExposedInstance = true was set on it so Value text and Label surface on body instances in the properties panel. Finding: exposure, not a lift.'
  },
  step2_extensions: {
    problemRow: { added: 'Star#39:0 INSTANCE_SWAP, default Icon button 170:5 (as built), preferred value Icon button; reference Favorite.mainComponent. Existing refs intact: 6 references after (was 5): Favorite, Icon (nested), Name, Code, Trailing action, Icon (nested).', size: '518x56 unchanged' },
    problemsPickerBody: { added: ['Section title#39:1 TEXT default "Recent Problems" → Section title.characters', 'Active All#39:2 BOOLEAN false → Filter tabs — All active 39:355 (new Tabs instance, selected=yes on All, hidden)', 'Active Recent#39:3 BOOLEAN true → Filter tabs 26:244 (existing, unchanged)', 'Active Favorites#39:4 BOOLEAN false → Filter tabs — Favorites active 39:369 (new, selected=yes on Favorites, hidden)', 'Search field 26:222 isExposedInstance = true'], refs: '48 references after (44 before + 3 visible + 1 characters); nested Text field, Tabs label and row references unchanged.', size: '518x384 unchanged; hidden Tabs instances take no layout space.', descriptions: 'Both component descriptions appended with the 2026-09-02 additions.' }
  },
  step3_regression: { method: 'Screenshot 27:6 at 1x after the edits, PIL ImageChops.difference against figma-export/npve-problems-recent-build-2026-09-02/step5-screen-27-6.png.', result: 'IDENTICAL. diff bounding box None (0 differing pixels) at 550x600. Instance properties on 27:6 read Section title "Recent Problems", Active Recent true, others false.', screenshot: DIR + 'step3-screen-27-6-after-edits.png' },
  step4_favorites: {
    screen: '40:252 "Screen — Clin_Problems-Favorites", Sidesheet 6:65 instance, 550x600; Title "Add Problem to Chart", Show back off, footer on, secondary on, tertiary on with label "Save & Add to Note" (renders "Save & Add To Note", library TITLE case); Body#6:5 = Problems picker body 26:221.',
    bodyOverrides: { 'Section title': 'Favorites', 'Active Recent': false, 'Active Favorites': true, search: 'nested Text field variant Value=Empty; resting label "Search for problem or ICD-10" shows as the placeholder; the Empty variant\'s Value node is empty text, so no typed value renders', stars: 'all four Favorite nested Icon swapped to Icon/FavoritesFilled 200:4 (key 0c091842…); glyph #545454 bound color/grey/600 (library default)', trailing: 'all four Trailing action nested Icon = Icon/PlusOutlined; row 1 needed resetOverrides plus a rebind of the glyph fill to color/grey/600 because the body master carries the CheckCircle swap and the success/dark fill as overrides on row 1' },
    starGlyph: 'Icon/FavoritesFilled 200:4 — the library HAS a filled favourites icon (FavoritesFilledIcon.tsx, default control of the ToggleButton story). No GAP; nothing drawn.',
    regions: { Header: 56, 'Header divider': 1, Body: 488, Footer: 55 }, bodyContent: 384,
    screenshot: DIR + 'step4-favorites-screen-40-252.png',
    lookedAt: 'Yes: title and close, empty search field showing the placeholder label at rest, tabs with Favorites underlined, "Favorites" heading, four rows with filled grey stars and plus glyphs, footer.'
  },
  step5_changeLog: { id: '40:454', title: 'Changes: Problems picker — Favorites', rows: 10, rowsVerbatim: ['Filter tabs | 28 tall, bold 14 → 48 tall, regular 16 | Library. Compact tabs exist nowhere else', 'Search field | 40 tall, teal border, magnifier → library text field | Library. Code has a search icon here, Figma doesn\'t model it yet', 'Problem rows | Hand-drawn → Problem row component | Consistency. Same row as Recent, one component', 'Star icon | Bare gold glyph → icon button | Library. Glyph gains a tap target', 'Add button | Plus in a grey ring → plain plus glyph | Library has no ringed icon button. Marked', 'Row background | White with rounded corners → none | Cleanup. Invisible on a white sheet', 'Hidden layers | Tab set, delete and arrow affordances → not carried | Cleanup. Dead layers in the source', 'Body padding | 16 all round, gap 12 → template padding | Template sets it', 'Colours without a token | Star gold and others → nearest library token, marked | Library. No token exists for these', 'Density | Tighter throughout → library heights | Library. Rows, tabs and buttons are all taller'] },
  step6_densityRow: { appendedTo: '27:222', rowId: '40:518', text: 'Density | Tighter throughout → library heights | Library. Rows, tabs and buttons are all taller', logNow: '11 rows, 480x824' },
  step7_comparison: {
    id: '40:534', name: 'Rebuild comparison — Problems picker Favorites (detached: instances cannot host children)', at: '(0, 1000)', size: '1708x919', gapBelowFirst: 84,
    sourceExport: { file: DIR + 'step7-source-export-4618-5137-2x.png', pixels: '1100x1200 RGBA', bytes: 62392, imageHash: 'e2becad17442b8f28cf6a77b5fec9c427ce7b07e', fill: 'IMAGE FIT on 40:537 at 550x600' },
    caption: 'Source: zVsuhYehoSLLq880qRBFkq 4618:5137, exported 2026-09-02',
    columns: { Reference: '550x628 @ (32, 32)', Rebuild: '550x628 @ (614, 32)', 'Change log': '480x855 @ (1196, 32)' },
    captionsY: 1032, outsideBounds: 0,
    screenshot: DIR + 'step8-rebuild-comparison-favorites-40-534.png'
  },
  step8_rules: {
    '1_instancePaintVerification': 'PASS. Problem row master 26:208 vs Favorites row 2: 0 differences (the star swap keeps the same bound grey). All four Favorites rows: star #545454 color/grey/600, trailing #545454 color/grey/600. Favorites tab: label #004852 color/primary/main, indicator #004852 color/primary/main visible.',
    '2_unboundPaintAudit': 'Templates: 16 top-level nodes, 164 visible solid paints, 0 unbound, 1 image paint. Screens: 5 top-level nodes, 202 visible solid paints, 0 unbound, 2 image paints. Cover: unchanged pre-existing unbound fill (flag npveProblemsBuild_coverPageUnboundFill).',
    '3_referenceCounts': 'PASS. Problem row 6 references (4 definitions), Problems picker body 48 references (4 definitions). Favorites body renders Section title "Favorites", only "Filter tabs — Favorites active" visible, rows Diabetes Mellitus | E10.9, Asthma | J45.909, Chronic Obstructive Pulmonary Disease | J45.909, Osteoarthritis | M17.11 from their property values.',
    '4_skipInvisibleFalse': 'Set on every script.',
    '5_opacityLast': 'PASS. 0 unbound paints below opacity 1.',
    '6_enumerateDontRecall': 'Audit walked every top-level node from the file on both pages.',
    '7_fileIdentityFirst': 'Keys passed explicitly; target pages read: Cover 0:1, Templates 3:2, Screens 27:2.',
    '8_roundWithRecord': 'PASS. 0 fractional geometry on non-vector nodes.',
    '9_boundPaintAlpha': 'PASS. Only the Text field outline parts carry bound alpha 0.23; untouched.',
    '10_cloneDropsPropertyRefs': 'Not applicable (no clone); references re-verified after every edit.'
  },
  screenshots: ['step3-screen-27-6-after-edits.png', 'step4-favorites-screen-40-252.png', 'step7-source-export-4618-5137-2x.png', 'step8-rebuild-comparison-favorites-40-534.png'].map(f => DIR + f)
};
s.flags.push(
  { id: 'npveFavorites_activeTabNotExpressible', severity: 'medium', kind: 'GAP', discoveredDuring: BATCH, summary: 'A single Active tab property cannot be expressed on Problems picker body: the nested Tabs/Tab selected variant cannot be lifted to a parent property. Fallback built: three Active booleans over three Tabs instances; exclusivity is not enforced.', where: 'target 26:221 (Active All#39:2, Active Recent#39:3, Active Favorites#39:4); library Tabs 201:14', detail: 'Tabs 201:14 exposes no property at the set level. A library-side fix would be an Active variant axis on Tabs itself.', webAppV2BugListCandidate: false, handling: 'Reported; fallback in place.' },
  { id: 'npveFavorites_searchPropsExposedNotLifted', severity: 'low', kind: 'GAP', discoveredDuring: BATCH, summary: 'The nested Text field exposes Value text and Label but they cannot be lifted to body properties; the instance was marked exposed (isExposedInstance) so they surface on body instances.', where: 'target 26:222 inside 26:221', detail: 'Plugin API limitation on nested TEXT properties, not a library defect.', webAppV2BugListCandidate: false, handling: 'Reported; exposure in place.' },
  { id: 'npveFavorites_row1OverridesInBodyMaster', severity: 'low', kind: 'DEFECT', discoveredDuring: BATCH, summary: 'Problems picker body master carries the selected-row overrides on row 1 (CheckCircle swap and success/dark glyph fill), so every new body instance starts with row 1 selected and needs resetOverrides plus a fill rebind to show a plain plus.', where: 'target 26:221 › 26:261', detail: 'Favorites needed a resetOverrides on the trailing action and a rebind of its glyph to color/grey/600. Cleaner: move the selected state onto the Recent screen instance instead of the master.', webAppV2BugListCandidate: false, handling: 'Reported. Decide whether to lift the selection override out of the master.' }
);
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote npveRebuild_problemsFavorites_2026_09_02; flags', s.flags.length);
