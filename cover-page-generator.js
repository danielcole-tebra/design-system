/**
 * Cover page generator — Tebra design system, Figma file YX2n4YLrEpBXNbcc73T6dw
 * ---------------------------------------------------------------------------
 * The Cover page inventory is a GENERATED rendering of what the file actually
 * contains. It is not hand-edited: this file is the generator, and running it
 * reproduces the Cover from whatever the file currently holds.
 *
 * WHY THIS EXISTS
 *   The inventory went stale four times and was hand-fixed three of them. At the
 *   time of writing it claimed nine pages (there are 15), 116 variables (120),
 *   31 icon masters (41) and 105 schema flags (134), and it omitted the entire
 *   Primary nav section (six masters). Hand-fixing a derived list is the bug.
 *
 * HOW TO RUN
 *   One `use_figma` call. Paste SCRIPT below as `code`, with fileKey
 *   YX2n4YLrEpBXNbcc73T6dw. It is idempotent: it clears the Cover frame's
 *   children and rebuilds them, so re-running is always safe.
 *
 *   It does NOT touch the sibling frame "Known drift and decisions (restored)",
 *   which is authored content, not inventory.
 *
 * WHY ONE CALL AND NOT A PER-PAGE FAN-OUT
 *   `await page.loadAsync()` loads a page's children without making it current,
 *   so a single script can walk all 15 pages. This is the documented dynamic-page
 *   API and is NOT the forbidden `loadAllPagesAsync`. `figma.currentPage` is never
 *   reassigned, so the run leaves the editor where it found it.
 *
 * WHAT IS DERIVED vs WHAT IS AUTHORED
 *   Derived, every run: the page list and page count, every component set name and
 *   its variant count, every single-component name, icon and illustration counts,
 *   the per-page groupings, every total, the text style ramp, the effect style
 *   ramp, and the variable count per collection.
 *   Authored constants (AUTHORED below): the four prose blurbs, the page
 *   classification lists, and SCHEMA_FLAGS.
 *
 * THE ONE NUMBER THIS GENERATOR CANNOT DERIVE
 *   SCHEMA_FLAGS counts `flags` in design-system-schema.json, which lives on disk,
 *   not in Figma. Refresh it before a run with:
 *     python -c "import json;print(len(json.load(open('design-system-schema.json'))['flags']))"
 *   If that number and the constant disagree, the constant is wrong.
 *
 * THE RED LANGUAGE — the point of the page, do not "clean it up"
 *   A page the classification lists do not know renders red as unclassified. A
 *   library page carrying zero masters renders red. Red means: the file grew and
 *   nobody decided where the new thing belongs.
 *
 * Last run 2026-08-18 — 15 pages, 34 sets, 444 variants, 61 singles,
 * 505 component nodes, 120 variables, 10 text styles, 7 effect styles.
 */

const AUTHORED = {
  // Library pages, in Cover display order. A page here with no masters goes red.
  libraryPages: [
    'Cover', 'Tokens', 'Actions', 'Inputs', 'Data display', 'Feedback',
    'Surfaces & navigation', 'Icons & illustrations', 'Reference',
  ],
  // Pages that carry boards rather than masters. Matched exactly.
  boardPages: [
    'Table exemplars', 'Page template exemplars', 'Drawer exemplars',
    'Drawer in page exemplars', 'Action row exemplars',
    'Patient header, authored height (proposal)',
  ],
  // Pages that hold no masters by design, so zero is not a fault.
  emptyByDesign: ['Cover', 'Tokens', 'Reference'],

  schemaFlags: 134,

  sourceOfTruth:
    'Built from packages/design-system in the web-app-v2 checkout — the createTheme definition, ' +
    'paletteValues.ts, typography.ts, the component *Overrides files, and the Storybook story argTypes. ' +
    'Values are transcribed from source, never measured from a rendered component. Figma mirrors code: ' +
    'where the two disagree, the code is correct and the Figma is a bug. MUI v5.15.12 is the substrate ' +
    'for the design-system package; product packages resolve 5.13.3, 5.13.5 and 5.14.11 as well, so a ' +
    'value read from a product package is not automatically this substrate.',

  durableArtifact: (flags) =>
    'design-system-schema.json — per-component variant axes, resolved token values traced to source, ' +
    'the token-to-variable plan, and ' + flags + ' recorded flags covering every place code and design ' +
    'disagree. Read it before changing anything here.',

  notYetRebuilt:
    'Deferred, with the blocker for each recorded in coverageSweep: DataGrid (+ DataGridFilter) and ' +
    'TreeView / TreeItem, both licensed MUI X packages; Typography, already delivered as the text styles; ' +
    'the Icon catalogue, which is a catalogue view rather than a component; Portal and Layout, which have ' +
    'no visual surface; Popover, whose paper path Menu already covers; marketingIcons, referenced by no ' +
    'override or story; and ListItemDelete, exported with neither.\n\n' +
    'Patterns are listed, not built — Drop Chip, Prepopulate Form Fields, Task Bar, RadioGroup. Every part ' +
    'each one composes is already in the library.\n\n' +
    'The Canonical components page is no longer in this file; recover it from Figma version history if its ' +
    'static sticker sheets are still wanted. Its Known drift and decisions content is reproduced below and ' +
    'in design-system-schema.json.',

  deliberatelyNotHere:
    'Deliberately not here — the standing list of what is excluded and why (DataGrid, DatePicker, TreeView, ' +
    'product patterns, the five other cobranding themes, Scrollbars, Text Reveal and more) lives on the ' +
    'Reference page. Open “Deliberately not here — and why”. Schema: figmaBuild.deliberatelyNotHere.',

  boardsNote:
    'Board pages carry no masters. They are assembled from instances of the library above and add nothing ' +
    'to it, so nothing on them is published. A page marked proposal is a proposal about something that ' +
    'ships, not a proposal for a new component.',
};

/* ===========================================================================
 * SCRIPT — paste as `code` into one use_figma call
 * ======================================================================== */

const SCRIPT = String.raw`
const AUTHORED = ${JSON.stringify({
  libraryPages: AUTHORED.libraryPages,
  boardPages: AUTHORED.boardPages,
  emptyByDesign: AUTHORED.emptyByDesign,
  schemaFlags: AUTHORED.schemaFlags,
  sourceOfTruth: AUTHORED.sourceOfTruth,
  durableArtifact: AUTHORED.durableArtifact(AUTHORED.schemaFlags),
  notYetRebuilt: AUTHORED.notYetRebuilt,
  deliberatelyNotHere: AUTHORED.deliberatelyNotHere,
  boardsNote: AUTHORED.boardsNote,
}, null, 2)};

await figma.loadFontAsync({ family: 'Akkurat LL', style: 'Bold' });
await figma.loadFontAsync({ family: 'Akkurat LL', style: 'Regular' });

const VIDS = {
  textPrimary:   'VariableID:74:36',
  textSecondary: 'VariableID:74:37',
  errorMain:     'VariableID:74:20',
  bgDefault:     'VariableID:74:40',
};
const V = {};
for (const k in VIDS) V[k] = await figma.variables.getVariableByIdAsync(VIDS[k]);
const paintOf = (v, rgb) =>
  figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: rgb }, 'color', v);
const RGB = {
  textPrimary:   { r: 0, g: 0, b: 0 },
  textSecondary: { r: 0.32941, g: 0.32941, b: 0.32941 },
  errorMain:     { r: 0.84706, g: 0.23137, b: 0.30196 },
  bgDefault:     { r: 0.90980, g: 0.89804, b: 0.87451 },
};

/* ---- DERIVE ------------------------------------------------------------ */
const pages = [];
for (const p of figma.root.children) {
  await p.loadAsync();
  const sets = p.findAllWithCriteria({ types: ['COMPONENT_SET'] })
    .map(s => ({ name: s.name, variants: s.children.length }))
    .sort((a, b) => b.variants - a.variants || a.name.localeCompare(b.name));
  const singles = p.findAllWithCriteria({ types: ['COMPONENT'] })
    .filter(c => !c.parent || c.parent.type !== 'COMPONENT_SET')
    .map(c => c.name).sort();
  pages.push({ name: p.name, sets, singles });
}

const icons = pages.find(p => p.name === 'Icons & illustrations') || { singles: [] };
const iconCount = icons.singles.filter(n => /^Icon\//.test(n)).length;
const illusCount = icons.singles.filter(n => /^Illustration\//.test(n)).length;
const iconOther = icons.singles.length - iconCount - illusCount;

const totalSets     = pages.reduce((a, p) => a + p.sets.length, 0);
const totalVariants = pages.reduce((a, p) => a + p.sets.reduce((b, s) => b + s.variants, 0), 0);
const totalSingles  = pages.reduce((a, p) => a + p.singles.length, 0);
const composites    = totalSingles - icons.singles.length;
const totalNodes    = totalVariants + totalSingles;

const textStyles   = (await figma.getLocalTextStylesAsync()).map(s => s.name);
const effectStyles = (await figma.getLocalEffectStylesAsync()).map(s => s.name);
const collections  = await figma.variables.getLocalVariableCollectionsAsync();
const varTotal     = (await figma.variables.getLocalVariablesAsync()).length;

const unclassified = pages
  .map(p => p.name)
  .filter(n => !AUTHORED.libraryPages.includes(n) && !AUTHORED.boardPages.includes(n));
const emptyLibrary = pages.filter(p =>
  AUTHORED.libraryPages.includes(p.name) &&
  !AUTHORED.emptyByDesign.includes(p.name) &&
  p.sets.length === 0 && p.singles.length === 0).map(p => p.name);

/* ---- COMPOSE ----------------------------------------------------------- */
const line = p => {
  const parts = p.sets.map(s => s.name + ' ' + s.variants).concat(p.singles);
  return p.name + ' — ' + (parts.length ? parts.join(' · ') : 'no masters');
};
const libraryLines = AUTHORED.libraryPages
  .map(n => pages.find(p => p.name === n))
  .filter(p => p && (p.sets.length || p.singles.length))
  .map(p => p.name === 'Icons & illustrations'
    ? p.name + ' — ' + iconCount + ' icon masters · ' + illusCount + ' illustration masters' +
      (iconOther ? ' · ' + iconOther + ' unclassified' : '')
    : line(p));

const referencePage = pages.find(p => p.name === 'Reference');
const refFrames = referencePage
  ? (await (async () => { const rp = figma.root.children.find(x => x.name === 'Reference'); await rp.loadAsync(); return rp.children.filter(c => c.type === 'FRAME').length; })())
  : 0;

const boardsPresent = pages.filter(p => AUTHORED.boardPages.includes(p.name)).map(p => p.name);

const inventory = [
  pages.length + ' pages: ' + pages.map(p => p.name).join(' · ') + '.',
  '',
  'Library pages. Numbers are variant counts; a name without a number is a single component.',
  '',
  libraryLines.join('\n'),
  'Reference — ' + refFrames + ' frames, all excluded from publish',
  '',
  totalSets + ' component sets carrying ' + totalVariants + ' variants, ' + composites +
    ' single-component composites, and ' + icons.singles.length +
    ' icon and illustration masters — ' + totalNodes + ' component nodes in all.',
  'Text styles — ' + textStyles.length + ' (' + textStyles.join(', ') + ')',
  'Effect styles — ' + effectStyles.length + ' (' + effectStyles.join(', ') + ')',
  'Variables — ' + varTotal + ' across ' +
    collections.map(c => c.name + ' ' + c.variableIds.length).join(', '),
  '',
  'Board pages — ' + (boardsPresent.length ? boardsPresent.join(' · ') : 'none') + '.',
  AUTHORED.boardsNote,
].join('\n');

/* ---- REBUILD ----------------------------------------------------------- */
const cover = figma.root.children.find(p => p.name === 'Cover');
await cover.loadAsync();
const frame = cover.children.find(c => c.name === 'Cover' && c.type === 'FRAME');
for (const c of [...frame.children]) c.remove();

const mkText = (chars, style, size, lh, colorKey) => {
  const t = figma.createText();
  t.fontName = { family: 'Akkurat LL', style };
  t.characters = chars;
  t.fontSize = size;
  t.lineHeight = { unit: 'PIXELS', value: lh };
  t.textAutoResize = 'HEIGHT';
  t.fills = [paintOf(V[colorKey], RGB[colorKey])];
  frame.appendChild(t);
  t.layoutSizingHorizontal = 'FILL';
  return t;
};
const spacer = () => {
  const s = figma.createFrame();
  s.name = 'space';
  s.resize(1, 16);
  s.fills = [];
  frame.appendChild(s);
  s.layoutSizingHorizontal = 'FIXED';
  return s;
};
const section = (heading, body, colorKey) => {
  spacer();
  mkText(heading, 'Bold', 16, 24, 'textPrimary').name = heading;
  mkText(body, 'Regular', 16, 24, colorKey || 'textSecondary').name = heading + ' body';
};

mkText('Tebra Design System', 'Bold', 32, 48, 'textPrimary').name = 'Tebra Design System';
section('Source of truth', AUTHORED.sourceOfTruth);
section('Durable artifact', AUTHORED.durableArtifact);
section('Inventory', inventory);
if (unclassified.length || emptyLibrary.length) {
  const red = []
    .concat(unclassified.length ? ['Unclassified pages, decide where each belongs: ' + unclassified.join(' · ') + '.'] : [])
    .concat(emptyLibrary.length ? ['Library pages carrying no masters: ' + emptyLibrary.join(' · ') + '.'] : [])
    .join('\n');
  section('Needs a decision', red, 'errorMain');
}
section('Not yet rebuilt', AUTHORED.notYetRebuilt);
spacer();
mkText(AUTHORED.deliberatelyNotHere, 'Regular', 16, 24, 'textSecondary').name = 'Deliberately not here link';

return {
  mutatedNodeIds: [frame.id],
  derived: {
    pages: pages.length, totalSets, totalVariants, composites,
    iconMasters: icons.singles.length, iconCount, illusCount,
    totalComponentNodes: totalNodes,
    textStyles: textStyles.length, effectStyles: effectStyles.length, variables: varTotal,
  },
  flagged: { unclassified, emptyLibrary },
  currentPageUnchanged: figma.currentPage.name,
  frameHeight: frame.height,
};
`;

module.exports = { AUTHORED, SCRIPT };
