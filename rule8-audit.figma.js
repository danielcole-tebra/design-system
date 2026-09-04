// rule8-audit.figma.js — standing rule 8 (roundWithRecord) walk for use_figma. Paste the body into use_figma with the
// target file key; set PAGE_NAME first. Returns every node whose width or height is not an integer.
//
// 2026-09-03 (libraryTodos_write2_2026_09_03): first standalone copy of the walk. Until this batch the rule 8 walk was
// written inline inside each batch's use_figma script and reported GROUP/VECTOR bounds as hits, although the rule text
// (standingBatchRules.8_roundWithRecord) exempts them: "VECTOR and GROUP bounds are the union of their path data, are not
// authored, and are not rounded." This script honours that exemption. Exempt nodes are counted under `exempt` and are not
// listed as hits; set INCLUDE_EXEMPT = true to see them (for comparison only). Rounding of authored fractions is still a
// design decision to record, never an automatic fix; the script only reads.
//
// Exempt node types: VECTOR, GROUP. Hits are reported with id, name, type, page-relative x/y, w/h, and the nearest
// non-instance ancestor so a hit inside an instance can be traced to its library master.

const PAGE_NAME = 'Screens';
const INCLUDE_EXEMPT = false;
const EXEMPT = new Set(['VECTOR', 'GROUP']);

figma.skipInvisibleInstanceChildren = false;
const page = figma.root.children.find(p => p.name === PAGE_NAME);
if (!page) throw new Error('no page named ' + PAGE_NAME);
await figma.setCurrentPageAsync(page);
const frac = n => Math.abs(n - Math.round(n)) > 1e-6;
const hits = [], exemptHits = [];
let walked = 0;
const owner = n => { let p = n.parent; while (p && p.type === 'INSTANCE') p = p.parent; return p ? p.name + ' ' + p.id : null; };
const visit = n => {
  walked++;
  if ('width' in n && (frac(n.width) || frac(n.height))) {
    const rec = { id: n.id, name: n.name, type: n.type, w: n.width, h: n.height, owner: owner(n) };
    if (EXEMPT.has(n.type)) exemptHits.push(rec); else hits.push(rec);
  }
  if ('children' in n) for (const c of n.children) visit(c);
};
for (const c of page.children) visit(c);
return { page: page.name + ' ' + page.id, walked, hits, exemptCount: exemptHits.length, exempt: INCLUDE_EXEMPT ? exemptHits : exemptHits.slice(0, 12).map(h => h.id + ' ' + h.name + ' ' + h.type + ' ' + h.w + 'x' + h.h) };
