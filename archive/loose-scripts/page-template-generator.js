/**
 * Page template generator — Tebra design system, Figma file YX2n4YLrEpBXNbcc73T6dw
 * ---------------------------------------------------------------------------
 * Builds two page-template exemplars on their own page, following the
 * conventions the Table exemplars page already established:
 *
 *   1 Page with header
 *   2 Page with header and side rail
 *
 * A third — rail collapsed — is NOT built. The rail has no collapsed state in
 * the library or in the layout recipes; see PAGE-TEMPLATES.md §3. Do not add
 * one here without a product capture and a ruling.
 *
 * REWRITTEN 2026-08-17 against the live file. The first draft was authored
 * blind and got three things wrong, all corrected here:
 *   - It called figma.loadAllPagesAsync(). use_figma does not support it.
 *     Pages load incrementally; one setCurrentPageAsync per call, and
 *     cross-page component lookup goes through getNodeByIdAsync on a known id.
 *   - It targeted the Reference page. The file already has a Table exemplars
 *     page (446:2) with a settled layout convention, and exemplars belong in
 *     that shape on a page of their own.
 *   - Its caption metrics were invented. The real ones are read off the table
 *     set and reproduced below.
 *
 * CONVENTION, read from Table exemplars (446:2) — do not drift from it
 *   Page > one root FRAME, VERTICAL, itemSpacing 40, padding 64.
 *   Per exemplar: FRAME "N Title", HORIZONTAL, itemSpacing 40, holding
 *     "N Title example"   — the artefact
 *     "N Title (caption)" — 400 wide, VERTICAL, itemSpacing 16
 *   Caption title  Akkurat LL Bold 20/32,    fill color/primary/main
 *   Field frame    VERTICAL, itemSpacing 4, named for the field
 *   Field label    Akkurat LL Bold 12/16,    fill color/text/primary
 *   Field body     Akkurat LL Regular 14/20, fill color/text/secondary
 *
 * WHAT IS AN INSTANCE AND WHAT IS NOT
 *   Instances: Nav/Bar (279:92), Divider (171:31, Orientation=Vertical).
 *   Authored frames: the page frame, the body row, the rail region, the
 *   content region, the placeholders, the captions. Forced, not a shortcut —
 *   the library has no Layout, no Portal, no rail, no app shell and no page
 *   frame component. coverageSweep: Layout = "Box/Grid documentation, no
 *   component surface"; Portal = "No visual surface". The one rail-shaped node
 *   is Drawer (187:3), 320 x 560, documented usage variant="persistent"
 *   anchor="right". Not repurposed here.
 *
 * WHAT IS BOUND AND WHAT IS TYPED
 *   Bound: every paint, the 16 insets (space/16), the caption and exemplar
 *   gaps (space/16, space/40), the red block padding (space/12), its radius
 *   (radius/sm) and every hairline (border/hairline).
 *   Typed as literals, no variable exists to bind: 1440, 256, 1184, 896, and
 *   the root frame's 64 padding. Each carries a LOG_* comment naming its entry
 *   in PAGE-TEMPLATES.md §4.
 *
 * TWO MARKERS, AND THEY ARE LOAD-BEARING
 *   Both exemplars carry a red "DOES NOT RESOLVE" block under the caption, in
 *   the same red language the Tokens page uses:
 *     1. The rail is not an instance. There is no rail component to instance.
 *        Closed by building a rail component, never by tidying this frame.
 *     2. The 896 body height has no source. It is 112 x 8, chosen so nothing
 *        came out fractional, standing in for a number that does not exist.
 *        Repeated in the page frame's NAME so it survives a duplicate.
 *   STEP 5 asserts both are still present. Do not delete a red block to make a
 *   frame look finished.
 *
 * NO EXPORTS. The reference kit is frozen at 103 files. Nothing here calls
 * exportAsync, and no node is added to any published page — this page is new
 * and joins Tokens and Reference on the publish exclusion list.
 *
 * HOW TO RUN
 *   Five use_figma calls, in order. Each is self-contained (helpers duplicated
 *   on purpose; calls do not share scope). STEP 1 is destructive only of its
 *   own page and is idempotent: it clears the page it finds or creates.
 */

/* ===========================================================================
 * SHARED HELPERS — paste into each step
 * ======================================================================== */

const HELPERS = `
const PAGE_NAME = 'Page template exemplars';
const ROOT_NAME = 'Page template exemplars';

// Discovered on the live file 2026-08-17. Ids, not names: name matching across
// pages needs every page loaded, which use_figma does not allow.
const NAV_BAR_ID  = '279:92';   // COMPONENT,     1440 x 65
const DIVIDER_ID  = '171:31';   // COMPONENT_SET, Orientation=Horizontal|Vertical

// Resolved BY NAME, not by hardcoded id. Ids were verified for 12 of these on
// 2026-08-17 but space/40 was not, and a guessed VariableID is exactly the kind
// of invented value this whole exercise exists to prevent.
const WANT = ['color/primary/main','color/text/primary','color/text/secondary','color/error/main',
  'color/grey/500','color/background/paper','color/background/default',
  'space/12','space/16','space/24','space/40','border/hairline','radius/sm'];
const V = {};
async function loadVars() {
  const all = await figma.variables.getLocalVariablesAsync();
  const missing = [];
  for (const n of WANT) {
    const v = all.find(x => x.name === n);
    if (v) V[n] = v; else missing.push(n);
  }
  return missing;
}

function valOf(v) { return v.valuesByMode[Object.keys(v.valuesByMode)[0]]; }

// Resolved colour AND binding in one paint. setBoundVariableForPaint returns a
// NEW paint and leaves the raw colour as passed, so alpha is copied first.
function paintOf(name) {
  const v = V[name];
  const val = valOf(v);
  const p = { type: 'SOLID', color: { r: val.r, g: val.g, b: val.b }, opacity: val.a === undefined ? 1 : val.a };
  return figma.variables.setBoundVariableForPaint(p, 'color', v);
}

function bindPad(frame, name) {
  for (const k of ['paddingTop','paddingRight','paddingBottom','paddingLeft']) frame.setBoundVariable(k, V[name]);
}
function bindHairline(node) {
  for (const k of ['strokeTopWeight','strokeBottomWeight','strokeLeftWeight','strokeRightWeight']) node.setBoundVariable(k, V['border/hairline']);
}

function mkFrame(name, mode) {
  const f = figma.createFrame();
  f.name = name;
  f.layoutMode = mode;
  f.itemSpacing = 0;
  f.paddingTop = f.paddingRight = f.paddingBottom = f.paddingLeft = 0;
  f.fills = [];
  f.clipsContent = true;
  return f;
}

// Metrics read off Table exemplars (446:2). Text nodes are named for their own
// content there, so the same is done here.
function mkText(chars, style, size, lh, fillName) {
  const t = figma.createText();
  t.fontName = { family: 'Akkurat LL', style: style };
  t.characters = chars;
  t.name = chars.slice(0, 60);
  t.fontSize = size;
  t.lineHeight = { unit: 'PIXELS', value: lh };
  t.letterSpacing = { unit: 'PERCENT', value: 0 };
  t.fills = [paintOf(fillName)];
  t.textAutoResize = 'HEIGHT';        // set after characters; FILL alone collapses a wrapping TEXT
  return t;
}

// A visibly-provisional region. Authored, not an instance — the library has no
// placeholder or skeleton component. The 8/8 dash is documentation decoration
// and is the one authored number with no page meaning (LOG L-07); dashPattern
// is not a bindable Figma field, so it could not be bound even to space/8.
function mkPlaceholder(label) {
  const p = mkFrame('Placeholder — region is empty by design', 'VERTICAL');
  p.primaryAxisAlignItems = 'CENTER';
  p.counterAxisAlignItems = 'CENTER';
  p.strokes = [paintOf('color/grey/500')];
  bindHairline(p);
  p.dashPattern = [8, 8];
  return p;
}

// Caption — four fields, plain designer-facing language, 400 column.
// Omit a field with nothing to say by passing null.
function fillCaption(c, title, fields) {
  const t = mkText(title, 'Bold', 20, 32, 'color/primary/main');
  c.appendChild(t);
  t.layoutSizingHorizontal = 'FILL';
  for (const f of fields) {
    if (!f || !f[1]) continue;
    const blk = mkFrame(f[0], 'VERTICAL');
    blk.clipsContent = false;
    blk.itemSpacing = 4;
    c.appendChild(blk);
    blk.layoutSizingHorizontal = 'FILL';
    blk.primaryAxisSizingMode = 'AUTO';
    const lab = mkText(f[0], 'Bold', 12, 16, 'color/text/primary');
    blk.appendChild(lab);
    lab.layoutSizingHorizontal = 'FILL';
    const body = mkText(f[1], 'Regular', 14, 20, 'color/text/secondary');
    blk.appendChild(body);
    body.layoutSizingHorizontal = 'FILL';
  }
  return c;
}

// THE RED LANGUAGE — carried over from the Tokens page, and it means the same
// thing here: red = this value has no home. On the Tokens page that was "no
// palette entry / no code syntax"; here it is "no component to instance / no
// source for this number". Do not tone it down and do not let a later pass
// silently satisfy a red block by inventing what it says is missing. A red
// block disappears when the library or the recipes gain the missing thing,
// never because someone made the frame look finished.
const RED_TITLE = 'DOES NOT RESOLVE — read before copying this template';
function mkFindings() {
  const f = mkFrame(RED_TITLE, 'VERTICAL');
  f.clipsContent = false;
  f.setBoundVariable('itemSpacing', V['space/12']);
  f.strokes = [paintOf('color/error/main')];
  bindHairline(f);
  f.setBoundVariable('topLeftRadius', V['radius/sm']);
  f.setBoundVariable('topRightRadius', V['radius/sm']);
  f.setBoundVariable('bottomLeftRadius', V['radius/sm']);
  f.setBoundVariable('bottomRightRadius', V['radius/sm']);
  bindPad(f, 'space/12');
  return f;
}
function fillFindings(f, items) {
  const h = mkText(RED_TITLE, 'Bold', 12, 16, 'color/error/main');
  f.appendChild(h);
  h.layoutSizingHorizontal = 'FILL';
  for (const it of items) {
    const blk = mkFrame(it[0], 'VERTICAL');
    blk.clipsContent = false;
    blk.itemSpacing = 4;
    f.appendChild(blk);
    blk.layoutSizingHorizontal = 'FILL';
    blk.primaryAxisSizingMode = 'AUTO';
    const lab = mkText(it[0], 'Bold', 12, 16, 'color/error/main');
    blk.appendChild(lab);
    lab.layoutSizingHorizontal = 'FILL';
    const body = mkText(it[1], 'Regular', 14, 20, 'color/error/main');
    blk.appendChild(body);
    body.layoutSizingHorizontal = 'FILL';
  }
  return f;
}

const FINDING_NO_RAIL_COMPONENT = ['The rail is not an instance',
  'Every other element here is a component instance. The rail is not: it is an authored frame with a Divider instance for its right edge. There is no rail, side-nav, app-shell or page-frame component in this library to instance — Layout is recorded as "Box/Grid documentation, no component surface" and Portal as "No visual surface". The nearest node is Drawer at 320 wide, whose documented usage is right-anchored persistent, so it is not that either. This is the finding, not a defect in this frame. Building a rail component would close it. Making this frame tidier would not.'];

const FINDING_UNSOURCED_HEIGHT = ['The 896 body height has no source',
  'Not a token, not a recipe value, not measured. Nothing in the layout recipes grounds a viewport height at all — the dashboard files it as decided-and-flagged and the facesheet retires it as a column-flex pattern rather than settling a number. 896 is 112 x 8, chosen only so no frame came out fractional. It is a placeholder for a number that does not exist. If you copy this template, replace it; do not cite it.'];
`;

/* ===========================================================================
 * STEP 1 — page + root frame. Idempotent: clears the page it finds or creates.
 * ======================================================================== */

const STEP_1_PAGE = `
${HELPERS}
await figma.loadFontAsync({ family: 'Akkurat LL', style: 'Regular' });
await figma.loadFontAsync({ family: 'Akkurat LL', style: 'Bold' });
const missing = await loadVars();
if (missing.length) throw new Error('missing variables: ' + missing.join(', '));

let page = figma.root.children.find(p => p.name === PAGE_NAME);
const created = !page;
if (!page) page = figma.createPage();
page.name = PAGE_NAME;
await figma.setCurrentPageAsync(page);          // the one page switch in this call
for (const ch of page.children.slice()) ch.remove();

const root = mkFrame(ROOT_NAME, 'VERTICAL');
root.setBoundVariable('itemSpacing', V['space/40']);
// LOG L-21 — the 64 root padding has no token. space/ tops out at 40. This is
// the Table exemplars page's own value, matched deliberately.
root.paddingTop = root.paddingRight = root.paddingBottom = root.paddingLeft = 64;
root.fills = [paintOf('color/background/paper')];
page.appendChild(root);
root.x = 0; root.y = 0;
root.primaryAxisSizingMode = 'AUTO';
root.counterAxisSizingMode = 'AUTO';

return { createdNodeIds: [root.id], pageId: page.id, pageCreated: created, rootName: root.name };
`;

/* ===========================================================================
 * STEP 2 — Exemplar 1. Page with header.
 * Header plus one empty content region. Shows the header in place, the content
 * region's width and gutters, and where content begins.
 * ======================================================================== */

const STEP_2_HEADER = `
${HELPERS}
await figma.loadFontAsync({ family: 'Akkurat LL', style: 'Regular' });
await figma.loadFontAsync({ family: 'Akkurat LL', style: 'Bold' });
await loadVars();
const page = figma.root.children.find(p => p.name === PAGE_NAME);
await figma.setCurrentPageAsync(page);
const root = page.children.find(n => n.name === ROOT_NAME);

const TITLE = '1 Page with header';
const old = root.children.find(n => n.name === TITLE);
if (old) old.remove();                                   // idempotent

const PAGE_W = 1440;   // LOG L-01 — no token. Dashboard recipe / Nav/Bar at 1x.
const BODY_H = 896;    // LOG L-06 — no source at all. 112 x 8 so nothing is
                       // fractional. Frame total 961 = 65 + 896.
const INSET  = 16;     // space/16, bound below

const wrap = mkFrame(TITLE, 'HORIZONTAL');
wrap.clipsContent = false;
wrap.counterAxisAlignItems = 'MIN';
wrap.setBoundVariable('itemSpacing', V['space/40']);
root.appendChild(wrap);
wrap.primaryAxisSizingMode = 'AUTO';
wrap.counterAxisSizingMode = 'AUTO';

const example = mkFrame(TITLE + ' example', 'VERTICAL');
wrap.appendChild(example);
example.primaryAxisSizingMode = 'AUTO';
example.counterAxisSizingMode = 'AUTO';

// LOG L-06 lives in the frame NAME so it survives a duplicate.
const frame = mkFrame('Page — 1440 wide · height 896 UNSOURCED', 'VERTICAL');
frame.fills = [paintOf('color/background/default')];
example.appendChild(frame);
frame.resize(PAGE_W, 1);
frame.layoutSizingHorizontal = 'FIXED';
frame.primaryAxisSizingMode = 'AUTO';

// --- header: the one component that carries the whole bar --------------------
const navBar = await figma.getNodeByIdAsync(NAV_BAR_ID);
const bar = navBar.createInstance();
frame.appendChild(bar);
bar.layoutSizingHorizontal = 'FILL';                     // holds 1440; height stays 65

// --- content region ----------------------------------------------------------
const content = mkFrame('Content region', 'VERTICAL');
content.fills = [paintOf('color/background/default')];
bindPad(content, 'space/16');   // dashboard recipe, measured-from-product. The
                                // facesheet recipe gives 24 for its content
                                // region; the two disagree and neither is
                                // overwritten. See PAGE-TEMPLATES.md §5.1.
frame.appendChild(content);
content.resize(PAGE_W, BODY_H);            // resize BEFORE FILL — resize() on a
content.layoutSizingVertical = 'FIXED';    // FILL-sized child is rejected
content.layoutSizingHorizontal = 'FILL';

const ph = mkPlaceholder();
content.appendChild(ph);
ph.layoutSizingHorizontal = 'FILL';
ph.layoutSizingVertical = 'FILL';
// Label computed from the geometry that actually rendered, so it cannot drift.
const phLabel = mkText(
  'Content region — empty by design · ' + ph.width + ' × ' + ph.height +
  ' · starts at x ' + INSET + ', y ' + Math.round(bar.height) +
  ' · the ' + ph.height + ' derives from the unsourced 896',
  'Regular', 14, 20, 'color/text/secondary');
ph.appendChild(phLabel);
// FILL + CENTRE after append. textAutoResize 'HEIGHT' alone leaves the TEXT at
// its natural single-line width, which overflows any narrow region and is then
// clipped by the placeholder. Invisible at 1408 and 1152, fatal at 223.
phLabel.textAlignHorizontal = 'CENTER';
phLabel.layoutSizingHorizontal = 'FILL';

return {
  createdNodeIds: [wrap.id, frame.id, bar.id, content.id, ph.id],
  pageFrame: [frame.width, frame.height],
  barInstance: [bar.width, bar.height],
  content: [content.width, content.height],
  placeholder: [ph.width, ph.height],
  contentRegionChildren: content.children.length
};
`;

/* ===========================================================================
 * STEP 3 — Exemplar 1 caption + red block.
 * ======================================================================== */

const STEP_3_CAPTION_1 = `
${HELPERS}
await figma.loadFontAsync({ family: 'Akkurat LL', style: 'Regular' });
await figma.loadFontAsync({ family: 'Akkurat LL', style: 'Bold' });
await loadVars();
const page = figma.root.children.find(p => p.name === PAGE_NAME);
await figma.setCurrentPageAsync(page);
const root = page.children.find(n => n.name === ROOT_NAME);
const TITLE = '1 Page with header';
const wrap = root.children.find(n => n.name === TITLE);
const oldCap = wrap.children.find(n => n.name === TITLE + ' (caption)');
if (oldCap) oldCap.remove();

const col = mkFrame(TITLE + ' (caption)', 'VERTICAL');
col.clipsContent = false;
col.setBoundVariable('itemSpacing', V['space/24']);
wrap.appendChild(col);
col.resize(400, 1);
col.layoutSizingHorizontal = 'FIXED';
col.primaryAxisSizingMode = 'AUTO';

const cap = mkFrame('Caption', 'VERTICAL');
cap.clipsContent = false;
cap.setBoundVariable('itemSpacing', V['space/16']);
col.appendChild(cap);
cap.layoutSizingHorizontal = 'FILL';
cap.primaryAxisSizingMode = 'AUTO';
fillCaption(cap, TITLE, [
  ['Shows', 'The header in place at the top of a 1440 page, and where content starts underneath it. The bar is 65 tall and runs edge to edge; the content region below it is the full 1440 wide with a 16 inset, so the first line of content sits 16 in from the page edge and 16 down from the bar.'],
  ['Use when', 'Laying out any full-width screen that has no side rail: a list page, a form page, a single-column report.'],
  ['Not this when', 'The screen has a permanent side region — use template 2, which changes the content width. Also not below 1100, where the bar becomes a different composition: logo, the six nav slots and the practice name all disappear and a menu button replaces them.'],
  ['Source', 'Bar and its contents are the Nav/Bar component, certified. Page width 1440, bar height 65 and the 16 inset are from the design agent\\u2019s dashboard recipe. The page height is from nothing — no viewport height exists in the recipes — and is marked rather than presented as a value.']
]);

const red = mkFindings();
col.appendChild(red);
red.layoutSizingHorizontal = 'FILL';
red.primaryAxisSizingMode = 'AUTO';
fillFindings(red, [FINDING_UNSOURCED_HEIGHT]);

return { createdNodeIds: [col.id, cap.id, red.id], captionWidth: col.width, redBlocks: 1 };
`;

/* ===========================================================================
 * STEP 4 — Exemplar 2. Page with header and side rail.
 * Rail at its one state. Shows rail width, the gap to content (there is none —
 * the seam is the rail's own 1px rule), and how content width changes.
 * ======================================================================== */

const STEP_4_RAIL = `
${HELPERS}
await figma.loadFontAsync({ family: 'Akkurat LL', style: 'Regular' });
await figma.loadFontAsync({ family: 'Akkurat LL', style: 'Bold' });
await loadVars();
const page = figma.root.children.find(p => p.name === PAGE_NAME);
await figma.setCurrentPageAsync(page);
const root = page.children.find(n => n.name === ROOT_NAME);

const TITLE = '2 Page with header and side rail';
const old = root.children.find(n => n.name === TITLE);
if (old) old.remove();                                   // idempotent

const PAGE_W = 1440;   // LOG L-01
const RAIL_W = 256;    // LOG L-03 — no token. R1, ruled closed 2026-08-14
                       // against a product capture measuring 264.
const BODY_H = 896;    // LOG L-06
const INSET  = 16;

const wrap = mkFrame(TITLE, 'HORIZONTAL');
wrap.clipsContent = false;
wrap.counterAxisAlignItems = 'MIN';
wrap.setBoundVariable('itemSpacing', V['space/40']);
root.appendChild(wrap);
wrap.primaryAxisSizingMode = 'AUTO';
wrap.counterAxisSizingMode = 'AUTO';

const example = mkFrame(TITLE + ' example', 'VERTICAL');
wrap.appendChild(example);
example.primaryAxisSizingMode = 'AUTO';
example.counterAxisSizingMode = 'AUTO';

const frame = mkFrame('Page — 1440 wide · height 896 UNSOURCED', 'VERTICAL');
frame.fills = [paintOf('color/background/default')];
example.appendChild(frame);
frame.resize(PAGE_W, 1);
frame.layoutSizingHorizontal = 'FIXED';
frame.primaryAxisSizingMode = 'AUTO';

const navBar = await figma.getNodeByIdAsync(NAV_BAR_ID);
const bar = navBar.createInstance();
frame.appendChild(bar);
bar.layoutSizingHorizontal = 'FILL';

// --- body row: rail then content, itemSpacing 0 ------------------------------
// The zero is the finding, not an omission. D1: Material's 24 page margin is
// not used, regions are flush, and the seam is a 1px rule.
const body = mkFrame('Body', 'HORIZONTAL');
frame.appendChild(body);
body.resize(PAGE_W, BODY_H);
body.layoutSizingVertical = 'FIXED';
body.layoutSizingHorizontal = 'FILL';

// --- rail: a permanent region. Authored — there is no rail component ---------
const rail = mkFrame('Side rail — 256 (authored frame, not an instance)', 'HORIZONTAL');
body.appendChild(rail);
rail.resize(RAIL_W, BODY_H);
rail.layoutSizingHorizontal = 'FIXED';
rail.layoutSizingVertical = 'FILL';

const railBody = mkFrame('Rail region', 'VERTICAL');
railBody.fills = [paintOf('color/background/paper')];
bindPad(railBody, 'space/16');
rail.appendChild(railBody);
railBody.layoutSizingVertical = 'FILL';

// --- the seam: a real Divider instance, not a 1px authored rectangle ---------
const dividerSet = await figma.getNodeByIdAsync(DIVIDER_ID);
const vertical = dividerSet.children.find(c => /vertical/i.test(c.name));
const rule = vertical.createInstance();
rule.name = 'Divider — rail edge';
rail.appendChild(rule);
rule.layoutSizingVertical = 'FILL';

// The rule sits INSIDE the 256, per R2's stated convention and the product's
// own 191+1=192 composition. R1's 224+32 derivation leaves no pixel for it, so
// this costs that derivation 1px — recorded, not resolved. See §5.2.
// Width is measured rather than assumed, so the arithmetic cannot silently drift.
railBody.resize(RAIL_W - rule.width, BODY_H);
railBody.layoutSizingHorizontal = 'FIXED';

const railPh = mkPlaceholder();
railBody.appendChild(railPh);
railPh.layoutSizingHorizontal = 'FILL';
railPh.layoutSizingVertical = 'FILL';
const railLabel = mkText(
  'Rail region — empty by design · ' + railPh.width + ' × ' + railPh.height +
  ' · an authored frame, not an instance',
  'Regular', 14, 20, 'color/text/secondary');
railPh.appendChild(railLabel);
railLabel.textAlignHorizontal = 'CENTER';
railLabel.layoutSizingHorizontal = 'FILL';   // see STEP 2 — wraps into 223 instead of clipping

// --- content region: what is left, and it flexes -----------------------------
const content = mkFrame('Content region', 'VERTICAL');
content.fills = [paintOf('color/background/default')];
bindPad(content, 'space/16');
body.appendChild(content);
content.layoutSizingHorizontal = 'FILL';
content.layoutSizingVertical = 'FILL';

const ph = mkPlaceholder();
content.appendChild(ph);
ph.layoutSizingHorizontal = 'FILL';
ph.layoutSizingVertical = 'FILL';
const phLabel = mkText(
  'Content region — empty by design · ' + ph.width + ' × ' + ph.height +
  ' · starts at x ' + (RAIL_W + INSET) + ', y ' + Math.round(bar.height) +
  ' · the ' + ph.height + ' derives from the unsourced 896',
  'Regular', 14, 20, 'color/text/secondary');
ph.appendChild(phLabel);
phLabel.textAlignHorizontal = 'CENTER';
phLabel.layoutSizingHorizontal = 'FILL';

return {
  createdNodeIds: [wrap.id, frame.id, bar.id, body.id, rail.id, railBody.id, rule.id, content.id],
  pageFrame: [frame.width, frame.height],
  rail: [rail.width, rail.height],
  railBody: [railBody.width, railBody.height],
  dividerWidth: rule.width,
  railMathCloses: railBody.width + rule.width === rail.width,
  content: [content.width, content.height],
  railPlusContent: rail.width + content.width,
  gapBetweenRailAndContent: body.itemSpacing,
  railRegionIsInstance: railBody.type === 'INSTANCE'
};
`;

/* ===========================================================================
 * STEP 5 — Exemplar 2 caption + red block, then verify.
 * ======================================================================== */

const STEP_5_CAPTION_2 = `
${HELPERS}
await figma.loadFontAsync({ family: 'Akkurat LL', style: 'Regular' });
await figma.loadFontAsync({ family: 'Akkurat LL', style: 'Bold' });
await loadVars();
const page = figma.root.children.find(p => p.name === PAGE_NAME);
await figma.setCurrentPageAsync(page);
const root = page.children.find(n => n.name === ROOT_NAME);
const TITLE = '2 Page with header and side rail';
const wrap = root.children.find(n => n.name === TITLE);
const oldCap = wrap.children.find(n => n.name === TITLE + ' (caption)');
if (oldCap) oldCap.remove();

const col = mkFrame(TITLE + ' (caption)', 'VERTICAL');
col.clipsContent = false;
col.setBoundVariable('itemSpacing', V['space/24']);
wrap.appendChild(col);
col.resize(400, 1);
col.layoutSizingHorizontal = 'FIXED';
col.primaryAxisSizingMode = 'AUTO';

const cap = mkFrame('Caption', 'VERTICAL');
cap.clipsContent = false;
cap.setBoundVariable('itemSpacing', V['space/16']);
col.appendChild(cap);
cap.layoutSizingHorizontal = 'FILL';
cap.primaryAxisSizingMode = 'AUTO';
fillCaption(cap, TITLE, [
  ['Shows', 'The same header with a permanent side rail on the left. The rail is 256 wide including its own 1px right rule, there is no gap between rail and content, and the content region drops from 1440 to 1184.'],
  ['Use when', 'The screen has a region that is always present and never scrolls away with the content: a date picker, a filter set, a section list.'],
  ['Not this when', 'The region can be dismissed, or overlays the content — that is a Drawer, and the Drawer in this library is the right-anchored persistent one, not this. Also not when the rail holds a sub-navigation list: that rail is 144 in the facesheet recipe, a different number derived a different way.'],
  ['Source', 'Nav/Bar and Divider are components. The 256 is the design agent\\u2019s R1, derived from the widest fixed content the rail holds and ruled closed on 2026-08-14 against a product capture measuring 264. The content width is not a recipe value; it is what is left at 1440.']
]);

const red = mkFindings();
col.appendChild(red);
red.layoutSizingHorizontal = 'FILL';
red.primaryAxisSizingMode = 'AUTO';
fillFindings(red, [FINDING_NO_RAIL_COMPONENT, FINDING_UNSOURCED_HEIGHT]);

return { createdNodeIds: [col.id, cap.id, red.id], captionWidth: col.width, redBlocks: 2 };
`;

/* ===========================================================================
 * STEP 6 (not optional) — verify, then LOOK at it.
 * Walks the page: no fractional dimensions, no unbound SOLID paints, exactly
 * three instances, both markers intact, both regions holding only a
 * placeholder. Then screenshot and read it by eye — the rail seam and the
 * content start are the two things a number cannot confirm.
 * ======================================================================== */

const STEP_6_VERIFY = `
const PAGE_NAME = 'Page template exemplars';
const page = figma.root.children.find(p => p.name === PAGE_NAME);
await figma.setCurrentPageAsync(page);

const fractional = [], unbound = [], instances = [], regions = [], redBlocks = [];
let nodes = 0, paints = 0;

function walk(n, path) {
  nodes++;
  const p = path + '/' + n.name;
  if (Array.isArray(n.fills))   for (const f of n.fills)   if (f.type === 'SOLID') { paints++; if (!(f.boundVariables && f.boundVariables.color)) unbound.push(p + ' [fill]'); }
  if (Array.isArray(n.strokes)) for (const f of n.strokes) if (f.type === 'SOLID') { paints++; if (!(f.boundVariables && f.boundVariables.color)) unbound.push(p + ' [stroke]'); }
  if (n.type !== 'TEXT' && n.type !== 'VECTOR' && (n.width % 1 !== 0 || n.height % 1 !== 0)) fractional.push(p + ' ' + n.width + 'x' + n.height);
  if (n.type === 'INSTANCE') { instances.push({ of: n.name, w: n.width, h: n.height }); return; }  // don't descend into instances
  // Guard on FRAME: mkText names a TEXT node after its own content, so the red
  // block's heading TEXT also matches /^DOES NOT RESOLVE/ and has no children.
  if (n.type === 'FRAME' && n.children) {
    if (/^DOES NOT RESOLVE/.test(n.name)) redBlocks.push({ at: p, headings: n.children.filter(c => c.type === 'FRAME').map(c => c.name) });
    if (n.name === 'Content region' || n.name === 'Rail region') {
      regions.push({ region: n.name, size: [n.width, n.height], children: n.children.length,
                     onlyChildIsPlaceholder: n.children.length === 1 && /^Placeholder/.test(n.children[0].name) });
    }
  }
  if (n.children) for (const c of n.children) walk(c, p);
}
for (const c of page.children) walk(c, '');

const frames = page.query('FRAME[name*=UNSOURCED]');
const heightMarkerIntact = frames.length === 2 && frames.toArray().every(f => f.height === 961);

const root = page.children[0];
await root.screenshot({ scale: 0.5 });

return {
  nodes: nodes, paints: paints,
  fractionalDims: fractional,
  unboundPaints: unbound,
  instances: instances,                 // expect 3: Nav/Bar x2, Divider x1
  regions: regions,                     // every onlyChildIsPlaceholder must be true
  redBlocks: redBlocks,                 // expect 2 blocks, 3 headings total
  heightMarkerIntact: heightMarkerIntact
};
`;

module.exports = { HELPERS, STEP_1_PAGE, STEP_2_HEADER, STEP_3_CAPTION_1, STEP_4_RAIL, STEP_5_CAPTION_2, STEP_6_VERIFY };
