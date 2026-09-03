/**
 * Tokens page generator — Tebra design system, Figma file YX2n4YLrEpBXNbcc73T6dw
 * ---------------------------------------------------------------------------
 * The Tokens page is a GENERATED, read-only rendering of the three variable
 * collections. It is not hand-edited: this file is the generator, and running
 * it end to end reproduces the page from whatever the collections currently hold.
 *
 * HOW TO RUN
 *   Four separate `use_figma` calls, in order — STEP 1, 2, 3, 4 below. Each is a
 *   self-contained script (helpers are duplicated on purpose; `use_figma` calls do
 *   not share scope). Splitting keeps each call inside the atomicity window: a
 *   failure leaves the page partially rebuilt but every step is idempotent from
 *   STEP 1 onward, so just re-run from the top.
 *
 * WHAT IS DERIVED vs WHAT IS AUTHORED
 *   Derived from the file, every run: every variable name, value, alpha, code
 *   syntax, group membership, ordering, count in each section header, the text
 *   style ramp and each style's bound token list.
 *   Authored constants (below): the group display order, the two "(no palette)"
 *   group captions, the brand alias map, and the section blurbs.
 *
 * THE RED LANGUAGE — this is the point of the page, do not "clean it up"
 *   A group whose name contains "(no palette)" renders with an error-red caption,
 *   red card strokes, "no palette entry" where a brand alias would sit, and a raw
 *   literal where every other token shows var(--...). A dimension token with no
 *   code syntax renders "no code syntax set" in the same red. Red = this value has
 *   no home in the palette / no CSS variable to point at.
 *
 * ALPHA
 *   Any alpha lives in the variable's stored rgba, never as paint-level opacity —
 *   paint opacity does not survive appendChild/resize/combineAsVariants and never
 *   reaches instances. `paintOf()` copies the variable's own alpha onto the paint
 *   and binds in the same step, because setBoundVariableForPaint returns a NEW
 *   paint and leaves the raw colour exactly as passed.
 *
 * Last run 2026-08-03 — 116 variables across 3 collections (67 colour / 17
 * typography / 32 dimension), 691 nodes, 569 paints, 0 unbound, 0 fractional.
 */

/* ===========================================================================
 * SHARED HELPERS — paste into each step
 * ======================================================================== */

const HELPERS = `
const VIDS = {
  textPrimary:   'VariableID:74:36',
  textSecondary: 'VariableID:74:37',
  textDisabled:  'VariableID:74:38',
  errorMain:     'VariableID:74:20',   // the red tell
  grey400:       'VariableID:74:32',   // card + swatch stroke
  primaryMain:   'VariableID:74:3',    // spacing bars, radius/border demo strokes
  primary100:    'VariableID:74:7',    // radius demo fill
  coreMain:      'VariableID:74:15',   // component-size rules
  bgPaper:       'VariableID:74:39'    // page background
};
const V = {};
for (const k in VIDS) V[k] = await figma.variables.getVariableByIdAsync(VIDS[k]);

function valOf(v) { return v.valuesByMode[Object.keys(v.valuesByMode)[0]]; }

// Resolved colour AND binding in one paint. Order matters — see header note.
function paintOf(v) {
  const val = valOf(v);
  let p = { type: 'SOLID', color: { r: val.r, g: val.g, b: val.b }, opacity: val.a === undefined ? 1 : val.a };
  return figma.variables.setBoundVariableForPaint(p, 'color', v);
}

function mkText(chars, style, size, lh, fillVar) {
  const t = figma.createText();
  t.name = 'Label';                                  // never name a TEXT node "Text"
  t.fontName = { family: 'Akkurat LL', style: style };
  t.characters = chars;
  t.fontSize = size;
  t.lineHeight = { unit: 'PIXELS', value: lh };
  t.letterSpacing = { unit: 'PERCENT', value: 0 };
  t.fills = [paintOf(fillVar)];
  return t;
}

function hexOf(c) {
  return '#' + [c.r, c.g, c.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
}
`;

/* ===========================================================================
 * STEP 1 — clear the page frame, rebuild the header
 * Header counts come from the live collections, so they cannot drift.
 * ======================================================================== */

const STEP_1 = `
figma.skipInvisibleInstanceChildren = false;
const page = figma.root.children.find(p => p.name === 'Tokens');
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: 'Akkurat LL', style: 'Regular' });
await figma.loadFontAsync({ family: 'Akkurat LL', style: 'Bold' });
${HELPERS}
// <DATE> below is the ONLY hand-substituted value in the whole generator:
// replace it with the run date before executing (scripts cannot call Date).
const cols = await figma.variables.getLocalVariableCollectionsAsync();
let total = 0;
for (const c of cols) total += c.variableIds.length;

const root = await figma.getNodeByIdAsync('145:3');      // the "Tokens" page frame
for (const ch of root.children.slice()) ch.remove();
root.layoutMode = 'VERTICAL';
root.primaryAxisSizingMode = 'AUTO';
root.counterAxisSizingMode = 'FIXED';
root.itemSpacing = 40;
root.paddingTop = root.paddingRight = root.paddingBottom = root.paddingLeft = 64;
root.clipsContent = true;
root.fills = [paintOf(V.bgPaper)];
root.resize(1400, root.height);

const header = figma.createFrame();
header.name = 'Header';
header.layoutMode = 'VERTICAL';
header.itemSpacing = 8;
header.fills = [];
root.appendChild(header);
header.layoutSizingHorizontal = 'FILL';
header.primaryAxisSizingMode = 'AUTO';

header.appendChild(mkText('Design tokens', 'Bold', 32, 48, V.textPrimary));
const body =
  'GENERATED BY SCRIPT from this file\\u2019s variables \\u2014 do not hand-edit. Regenerate whenever the variable ' +
  'collections change; the generator reads the collections live, so it never drifts from them.\\n' +
  'Regenerated <DATE> \\u00b7 ' + total + ' variables across ' + cols.length + ' collections \\u00b7 swatches and bars ' +
  'are BOUND to their variables, so this page updates itself when a value changes.';
const t2 = mkText(body, 'Regular', 14, 22, V.textSecondary);
t2.textAutoResize = 'HEIGHT';                            // FILL alone collapses a wrapping TEXT
header.appendChild(t2);
t2.layoutSizingHorizontal = 'FILL';

return { removed: true, total: total, createdNodeIds: [header.id] };
`;

/* ===========================================================================
 * STEP 2 — Tebra/Color
 * Group = second path segment ("color/<group>/<leaf>"); single-segment names
 * like color/divider are their own group. Cards sort alphabetically by full
 * variable name inside each group; groups follow GROUP_ORDER, and anything not
 * listed there lands at the end and is REPORTED in `unplacedGroups` rather than
 * dropped.
 * ======================================================================== */

const STEP_2 = `
figma.skipInvisibleInstanceChildren = false;
const page = figma.root.children.find(p => p.name === 'Tokens');
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: 'Akkurat LL', style: 'Regular' });
await figma.loadFontAsync({ family: 'Akkurat LL', style: 'Bold' });
${HELPERS}

// Brand aliases transcribed from the trailing comments in paletteValues.ts and
// keyed BY LITERAL, not by token name — that is how secondary/contrastText and
// core/contrastText (uncommented in source, both #004852) resolve to "Growth 1".
// A literal with no comment renders with no alias, which is correct: 6 of the 47
// palette-group colours have none.
const ALIASES = {
  '#D6D6D6': 'Synapse 4',  '#417E86': 'Growth 2',   '#004852': 'Growth 1',   '#8CB2B6': 'Growth 3',
  '#CBDDE0': 'Growth 4',   '#FFAF95': 'Vitality 2', '#FF8D6E': 'Vitality 1', '#DC785D': 'Vitality 0',
  '#FFCFBF': 'Vitality 3', '#FFE9E3': 'Vitality 4 (disabled)',               '#D4E0DD': 'Core 3',
  '#B3C6C4': 'Core 2',     '#8CA7A2': 'Core 1',     '#E9EFEE': 'Core 4',     '#FBCBD1': 'Siren',
  '#D83B4D': 'First aid',  '#B51A2C': 'Remedy',     '#FCDE73': 'Energize',   '#F2BA2A': 'Neuron',
  '#6FC691': 'Restore',    '#3FA266': 'Cyto',       '#2B865A': 'Vigor',      '#067889': 'Practice',
  '#4678CC': 'Circadian',  '#F6F6F6': 'Synapse 5',  '#9A9A9A': 'Synapse 3',  '#545454': 'Synapse 2',
  '#2B2B2B': 'Synapse 1',  '#E8E5DF': 'Backbone 3', '#F0EEE8': 'Backbone 2'
};

const GROUP_ORDER = ['primary','secondary','error','warning','info','success','core','grey','text',
  'background','action','common','divider','substrate','hardcoded (no palette)','computed (no palette)'];

const GROUP_LABEL = {
  'hardcoded (no palette)': 'hardcoded (no palette) \\u2014 orphan literals with no palette entry: ChipOverrides.ts, the illustration SVGs, one user-agent default, and the primary-nav hexes whose only source is createPartnerTheme in src/cobranding \\u2014 a theme the nav renders under and the design system does not own',
  'computed (no palette)':  'computed (no palette) \\u2014 derived at runtime by MUI; alpha stored in the variable so it survives instancing'
};

const cols = await figma.variables.getLocalVariableCollectionsAsync();
const colorCol = cols.find(c => c.name === 'Tebra/Color');
const all = await figma.variables.getLocalVariablesAsync();
const colorVars = all.filter(v => v.variableCollectionId === colorCol.id);

const groups = {};
for (const v of colorVars) {
  const parts = v.name.split('/');
  const group = parts[1];
  const leaf = parts.length === 2 ? parts[1] : parts.slice(2).join('/');
  (groups[group] = groups[group] || []).push({ v: v, leaf: leaf });
}
const ordered = GROUP_ORDER.filter(g => groups[g]);
const extra = Object.keys(groups).filter(g => GROUP_ORDER.indexOf(g) < 0).sort();

const section = figma.createFrame();
section.name = 'Tebra/Color';
section.layoutMode = 'VERTICAL';
section.itemSpacing = 24;
section.fills = [];
const root = await figma.getNodeByIdAsync('145:3');
root.appendChild(section);
section.layoutSizingHorizontal = 'FILL';
section.primaryAxisSizingMode = 'AUTO';
section.appendChild(mkText('Tebra/Color \\u00b7 ' + colorVars.length + ' variables \\u00b7 mode: ' + colorCol.modes[0].name, 'Bold', 20, 32, V.textPrimary));

for (const g of ordered.concat(extra)) {
  const red = g.indexOf('(no palette)') >= 0;

  const gf = figma.createFrame();
  gf.name = g;
  gf.layoutMode = 'VERTICAL';
  gf.itemSpacing = 10;
  gf.fills = [];
  section.appendChild(gf);
  gf.layoutSizingHorizontal = 'FILL';
  gf.primaryAxisSizingMode = 'AUTO';
  // Caption must WRAP: the root frame clipsContent, so a single-line caption longer
  // than 1272px is silently truncated. Bit us when the nav hexes were added.
  const gcap = mkText(GROUP_LABEL[g] || g, 'Bold', 14, 20, red ? V.errorMain : V.textSecondary);
  gcap.textAutoResize = 'HEIGHT';
  gf.appendChild(gcap);
  gcap.layoutSizingHorizontal = 'FILL';

  const wrap = figma.createFrame();          // 3 cards per row at 1272 wide
  wrap.name = 'Swatches';
  wrap.layoutMode = 'HORIZONTAL';
  wrap.layoutWrap = 'WRAP';
  wrap.itemSpacing = 12;
  wrap.counterAxisSpacing = 12;
  wrap.fills = [];
  gf.appendChild(wrap);
  wrap.layoutSizingHorizontal = 'FILL';
  wrap.counterAxisSizingMode = 'AUTO';

  const items = groups[g].slice().sort((a, b) => a.v.name < b.v.name ? -1 : a.v.name > b.v.name ? 1 : 0);
  for (const it of items) {
    const v = it.v, val = valOf(v), hex = hexOf(val), alpha = val.a === undefined ? 1 : val.a;

    const card = figma.createFrame();
    card.name = v.name;
    card.layoutMode = 'HORIZONTAL';
    card.itemSpacing = 12;
    card.paddingTop = card.paddingRight = card.paddingBottom = card.paddingLeft = 8;
    card.counterAxisAlignItems = 'CENTER';
    card.cornerRadius = 4;
    card.fills = [];
    card.strokes = [paintOf(red ? V.errorMain : V.grey400)];
    card.strokeWeight = 1;
    wrap.appendChild(card);
    card.resize(330, 60);

    const sw = figma.createFrame();
    sw.name = 'Swatch';
    sw.cornerRadius = 4;
    sw.fills = [paintOf(v)];                 // the swatch IS the variable
    sw.strokes = [paintOf(V.grey400)];
    sw.strokeWeight = 1;
    card.appendChild(sw);
    sw.resize(40, 40);
    sw.layoutSizingHorizontal = 'FIXED';
    sw.layoutSizingVertical = 'FIXED';

    const info = figma.createFrame();
    info.name = 'Info';
    info.layoutMode = 'VERTICAL';
    info.itemSpacing = 1;
    info.fills = [];
    card.appendChild(info);
    info.layoutSizingHorizontal = 'FILL';
    info.primaryAxisSizingMode = 'AUTO';

    const alias = red ? 'no palette entry' : (ALIASES[hex] || null);
    const line2 = hex + (alpha < 1 ? ' / ' + Math.round(alpha * 100) + '%' : '') + (alias ? '  \\u00b7  ' + alias : '');
    const cs = (v.codeSyntax && v.codeSyntax.WEB) ? v.codeSyntax.WEB : hex;   // no var() to point at -> the literal
    const csIsVar = cs.indexOf('var(') === 0;

    info.appendChild(mkText(red ? it.leaf : v.name, 'Bold', 12, 16, V.textPrimary));
    info.appendChild(mkText(line2, 'Regular', 11, 15, V.textSecondary));
    info.appendChild(mkText(cs, 'Regular', 10, 14, csIsVar ? V.textDisabled : V.errorMain));
  }
}
return { cards: colorVars.length, unplacedGroups: extra, createdNodeIds: [section.id] };
`;

/* ===========================================================================
 * STEP 3 — Tebra/Typography
 * Rows come from the text styles, in the order getLocalTextStylesAsync returns
 * them. Each row's token list is the style's OWN boundVariables, so the shared
 * roles (h4/body1, h5/body2, subtitle2/caption) show the sharing rather than
 * being asserted in prose. The blurb is authored; the counts are not.
 * ======================================================================== */

const STEP_3 = `
figma.skipInvisibleInstanceChildren = false;
const page = figma.root.children.find(p => p.name === 'Tokens');
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: 'Akkurat LL', style: 'Regular' });
await figma.loadFontAsync({ family: 'Akkurat LL', style: 'Bold' });
${HELPERS}
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const typoCol = cols.find(c => c.name === 'Tebra/Typography');
const styles = await figma.getLocalTextStylesAsync();

const section = figma.createFrame();
section.name = 'Tebra/Typography';
section.layoutMode = 'VERTICAL';
section.itemSpacing = 20;
section.fills = [];
const root = await figma.getNodeByIdAsync('145:3');
root.appendChild(section);
section.layoutSizingHorizontal = 'FILL';
section.primaryAxisSizingMode = 'AUTO';

section.appendChild(mkText('Tebra/Typography \\u00b7 ' + typoCol.variableIds.length + ' variables \\u00b7 ' + styles.length + ' text styles', 'Bold', 20, 32, V.textPrimary));
const note = mkText('Three roles share a token because typography.ts gives them identical literals: h4 and body1 both bind font/size/body1 + font/lineHeight/body1 (16/24); h5 and body2 both bind font/size/body2 + font/lineHeight/body2 (14/20); subtitle2 and caption both bind font/size/caption + font/lineHeight/caption (12/16). One variable per distinct value, one style per role \\u2014 the styles differ by weight, not by token.', 'Regular', 13, 20, V.textSecondary);
note.textAutoResize = 'HEIGHT';
section.appendChild(note);
note.layoutSizingHorizontal = 'FILL';

for (const s of styles) {
  const row = figma.createFrame();
  row.name = s.name;
  row.layoutMode = 'HORIZONTAL';
  row.itemSpacing = 24;
  row.paddingTop = 12;
  row.paddingBottom = 12;
  row.counterAxisAlignItems = 'CENTER';
  row.fills = [];
  section.appendChild(row);
  row.layoutSizingHorizontal = 'FILL';
  row.counterAxisSizingMode = 'AUTO';

  const meta = figma.createFrame();
  meta.name = 'Meta';
  meta.layoutMode = 'VERTICAL';
  meta.itemSpacing = 2;
  meta.fills = [];
  row.appendChild(meta);
  meta.resize(260, meta.height);
  meta.layoutSizingHorizontal = 'FIXED';
  meta.primaryAxisSizingMode = 'AUTO';

  const lhTxt = s.lineHeight && s.lineHeight.unit === 'PIXELS' ? s.lineHeight.value : '\\u2014';
  meta.appendChild(mkText(s.name, 'Bold', 13, 18, V.textPrimary));
  meta.appendChild(mkText(s.fontSize + ' / ' + lhTxt + '  \\u00b7  ' + s.fontName.style, 'Regular', 11, 15, V.textSecondary));
  const bvNames = [];
  const bv = s.boundVariables || {};
  for (const k of Object.keys(bv)) {
    const vv = await figma.variables.getVariableByIdAsync(bv[k].id);
    bvNames.push(vv ? vv.name : k + ' (unbound)');
  }
  meta.appendChild(mkText(bvNames.join('\\n'), 'Regular', 10, 14, V.textDisabled));

  const spec = figma.createText();
  spec.name = 'Label';
  spec.fontName = { family: 'Akkurat LL', style: s.fontName.style };
  spec.characters = s.textCase === 'TITLE' ? 'Capitalized Button Label' : 'The quick brown fox';
  spec.fills = [paintOf(V.textPrimary)];
  row.appendChild(spec);
  await spec.setTextStyleIdAsync(s.id);       // apply AFTER characters
}
return { rows: styles.length, createdNodeIds: [section.id] };
`;

/* ===========================================================================
 * STEP 4 — Tebra/Dimension
 * Four subsections keyed off the first path segment (space / radius / border /
 * size), each sorted by VALUE ascending, each demo geometry BOUND to its
 * variable: bar width, corner radius (all four corners), the four stroke side
 * weights, rule height. Anything with an unrecognised prefix is reported in
 * `unplaced` rather than dropped silently.
 * ======================================================================== */

const STEP_4 = `
figma.skipInvisibleInstanceChildren = false;
const page = figma.root.children.find(p => p.name === 'Tokens');
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: 'Akkurat LL', style: 'Regular' });
await figma.loadFontAsync({ family: 'Akkurat LL', style: 'Bold' });
${HELPERS}

function mkMeta(v) {
  const m = figma.createFrame();
  m.name = 'Meta';
  m.layoutMode = 'VERTICAL';
  m.itemSpacing = 0;
  m.fills = [];
  m.appendChild(mkText(v.name + '  \\u00b7  ' + valOf(v) + 'px', 'Regular', 12, 16, V.textPrimary));
  const cs = (v.codeSyntax && v.codeSyntax.WEB) ? v.codeSyntax.WEB : null;
  m.appendChild(mkText(cs || 'no code syntax set', 'Regular', 10, 14, cs ? V.textDisabled : V.errorMain));
  m.primaryAxisSizingMode = 'AUTO';
  m.counterAxisSizingMode = 'AUTO';
  return m;
}
function mkSub(title) {
  const f = figma.createFrame();
  f.name = title;
  f.layoutMode = 'VERTICAL';
  f.itemSpacing = 6;
  f.fills = [];
  return f;
}

const cols = await figma.variables.getLocalVariableCollectionsAsync();
const dimCol = cols.find(c => c.name === 'Tebra/Dimension');
const all = await figma.variables.getLocalVariablesAsync();
const dims = all.filter(v => v.variableCollectionId === dimCol.id);
const byPrefix = { space: [], radius: [], border: [], size: [] };
const unplaced = [];
for (const v of dims) {
  const p = v.name.split('/')[0];
  if (byPrefix[p]) byPrefix[p].push(v); else unplaced.push(v.name);
}
for (const k in byPrefix) byPrefix[k].sort((a, b) => valOf(a) - valOf(b));

const section = figma.createFrame();
section.name = 'Tebra/Dimension';
section.layoutMode = 'VERTICAL';
section.itemSpacing = 24;
section.fills = [];
const root = await figma.getNodeByIdAsync('145:3');
root.appendChild(section);
section.layoutSizingHorizontal = 'FILL';
section.primaryAxisSizingMode = 'AUTO';
section.appendChild(mkText('Tebra/Dimension \\u00b7 ' + dims.length + ' variables \\u00b7 rendered at actual size', 'Bold', 20, 32, V.textPrimary));

// --- Spacing: bar WIDTH is the value ---------------------------------------
const spTitle = 'Spacing \\u2014 bar width is the token value, bound to the variable';
const sp = mkSub(spTitle);
section.appendChild(sp);
sp.layoutSizingHorizontal = 'FILL';
sp.primaryAxisSizingMode = 'AUTO';
sp.appendChild(mkText(spTitle, 'Bold', 13, 18, V.textSecondary));
for (const v of byPrefix.space) {
  const row = figma.createFrame();
  row.name = v.name;
  row.layoutMode = 'HORIZONTAL';
  row.itemSpacing = 16;
  row.counterAxisAlignItems = 'CENTER';
  row.fills = [];
  sp.appendChild(row);
  row.layoutSizingHorizontal = 'FILL';
  row.counterAxisSizingMode = 'AUTO';
  const bar = figma.createFrame();
  bar.name = 'Bar';
  bar.fills = [paintOf(V.primaryMain)];
  row.appendChild(bar);
  bar.resize(valOf(v), 20);
  bar.setBoundVariable('width', v);
  row.appendChild(mkMeta(v));
}

// --- Radius: all four corners bound ----------------------------------------
const raTitle = 'Radius \\u2014 corner demo, cornerRadius bound to the variable';
const ra = mkSub(raTitle);
section.appendChild(ra);
ra.layoutSizingHorizontal = 'FILL';
ra.primaryAxisSizingMode = 'AUTO';
ra.appendChild(mkText(raTitle, 'Bold', 13, 18, V.textSecondary));
const radii = figma.createFrame();
radii.name = 'Radii';
radii.layoutMode = 'HORIZONTAL';
radii.itemSpacing = 24;
radii.fills = [];
ra.appendChild(radii);
radii.layoutSizingHorizontal = 'FILL';
radii.counterAxisSizingMode = 'AUTO';
for (const v of byPrefix.radius) {
  const tile = figma.createFrame();
  tile.name = v.name;
  tile.layoutMode = 'VERTICAL';
  tile.itemSpacing = 6;
  tile.fills = [];
  radii.appendChild(tile);
  tile.primaryAxisSizingMode = 'AUTO';
  tile.counterAxisSizingMode = 'AUTO';
  const corner = figma.createFrame();
  corner.name = 'Corner';
  corner.fills = [paintOf(V.primary100)];
  corner.strokes = [paintOf(V.primaryMain)];
  corner.strokeWeight = 1;
  tile.appendChild(corner);
  corner.resize(72, 56);
  for (const k of ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius']) corner.setBoundVariable(k, v);
  tile.appendChild(mkMeta(v));
}

// --- Border width: the four side weights bound ------------------------------
const boTitle = 'Border width \\u2014 stroke weight bound to the variable';
const bo = mkSub(boTitle);
section.appendChild(bo);
bo.layoutSizingHorizontal = 'FILL';
bo.primaryAxisSizingMode = 'AUTO';
bo.appendChild(mkText(boTitle, 'Bold', 13, 18, V.textSecondary));
const borders = figma.createFrame();
borders.name = 'Borders';
borders.layoutMode = 'HORIZONTAL';
borders.itemSpacing = 24;
borders.fills = [];
bo.appendChild(borders);
borders.layoutSizingHorizontal = 'FILL';
borders.counterAxisSizingMode = 'AUTO';
for (const v of byPrefix.border) {
  const tile = figma.createFrame();
  tile.name = v.name;
  tile.layoutMode = 'VERTICAL';
  tile.itemSpacing = 6;
  tile.fills = [];
  borders.appendChild(tile);
  tile.primaryAxisSizingMode = 'AUTO';
  tile.counterAxisSizingMode = 'AUTO';
  const st = figma.createFrame();
  st.name = 'Stroke';
  st.fills = [];
  st.strokes = [paintOf(V.primaryMain)];
  st.strokeWeight = valOf(v);
  tile.appendChild(st);
  st.resize(120, 40);
  for (const k of ['strokeTopWeight','strokeBottomWeight','strokeLeftWeight','strokeRightWeight']) st.setBoundVariable(k, v);
  tile.appendChild(mkMeta(v));
}

// --- Component sizes: rule HEIGHT is the value ------------------------------
const szTitle = 'Component sizes \\u2014 rule height is the token value, bound to the variable';
const sz = mkSub(szTitle);
section.appendChild(sz);
sz.layoutSizingHorizontal = 'FILL';
sz.primaryAxisSizingMode = 'AUTO';
sz.appendChild(mkText(szTitle, 'Bold', 13, 18, V.textSecondary));
for (const v of byPrefix.size) {
  const row = figma.createFrame();
  row.name = v.name;
  row.layoutMode = 'HORIZONTAL';
  row.itemSpacing = 16;
  row.counterAxisAlignItems = 'CENTER';
  row.fills = [];
  sz.appendChild(row);
  row.layoutSizingHorizontal = 'FILL';
  row.counterAxisSizingMode = 'AUTO';
  const rule = figma.createFrame();
  rule.name = 'Rule';
  rule.fills = [paintOf(V.coreMain)];
  row.appendChild(rule);
  rule.resize(160, valOf(v));
  rule.setBoundVariable('height', v);
  row.appendChild(mkMeta(v));
}

return { counts: { space: byPrefix.space.length, radius: byPrefix.radius.length, border: byPrefix.border.length, size: byPrefix.size.length }, unplaced: unplaced, createdNodeIds: [section.id] };
`;

/* ===========================================================================
 * STEP 5 (not optional) — verify, then LOOK at it
 * Walks every node on the page: 0 unbound SOLID paints, 0 fractional authored
 * dimensions, every Bar/Rule/Corner/Stroke actually bound. Then screenshot the
 * two "(no palette)" groups and the dimension demos and read them by eye —
 * several real defects were caught that way first and confirmed numerically
 * afterwards, never the reverse.
 * ======================================================================== */

const STEP_5_VERIFY = `
figma.skipInvisibleInstanceChildren = false;
const page = figma.root.children.find(p => p.name === 'Tokens');
await figma.setCurrentPageAsync(page);
const unbound = [], fractional = [], missingBind = [];
let nodes = 0, paints = 0;
function walk(n, path) {
  nodes++;
  const p = path + '/' + n.name;
  if (Array.isArray(n.fills))   for (const f of n.fills)   if (f.type === 'SOLID') { paints++; if (!(f.boundVariables && f.boundVariables.color)) unbound.push(p + ' [fill]'); }
  if (Array.isArray(n.strokes)) for (const f of n.strokes) if (f.type === 'SOLID') { paints++; if (!(f.boundVariables && f.boundVariables.color)) unbound.push(p + ' [stroke]'); }
  if (n.type !== 'TEXT' && n.type !== 'VECTOR' && (n.width % 1 !== 0 || n.height % 1 !== 0)) fractional.push(p + ' ' + n.width + 'x' + n.height);
  if (n.name === 'Bar'    && !(n.boundVariables && n.boundVariables.width))            missingBind.push(p + ' width');
  if (n.name === 'Rule'   && !(n.boundVariables && n.boundVariables.height))           missingBind.push(p + ' height');
  if (n.name === 'Corner' && !(n.boundVariables && n.boundVariables.topLeftRadius))    missingBind.push(p + ' radius');
  if (n.name === 'Stroke' && !(n.boundVariables && n.boundVariables.strokeTopWeight))  missingBind.push(p + ' strokeWeight');
  if (n.children) for (const c of n.children) walk(c, p);
}
for (const c of page.children) walk(c, '');
return { nodes: nodes, paints: paints, unboundPaints: unbound, fractionalDims: fractional, missingBindings: missingBind };
`;

module.exports = { HELPERS, STEP_1, STEP_2, STEP_3, STEP_4, STEP_5_VERIFY };
