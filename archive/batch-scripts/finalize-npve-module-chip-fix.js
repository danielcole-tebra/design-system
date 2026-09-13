// finalize-npve-module-chip-fix.js — close the recorded Module chip correction.
const fs = require('fs');

const P = './design-system-schema.json';
const D = 'npveRebuild_moduleChipFix_2026-09-06';
const F = 'figma-export/npve-module-chip-fix-2026-09-06/';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const r = s[D];
if (!r || !String(r._status || '').startsWith('IN PROGRESS.')) {
  throw new Error(`${D} is not IN PROGRESS`);
}

r._status = 'DONE. Module chip masters corrected from Daniel\'s crop review: selected chips use icon + label + compact close in one color/primary/main ink family with space/16 gaps; unselected chips are label-only grey pills at 40px. The Module strip is reconciled to the nine-item order with Note and Problems selected. The placed encounter comparison inherits the master. Two change-log rows added, page-order snapshot refreshed, screenshots and 1x pixel diff recorded. No new GAP or DEFECT marker. No stop condition triggered.';
r.step2_masterCorrection = {
  componentSet: '426:4213 Module chip; 2 variants; Label TEXT, Icon INSTANCE_SWAP, Show close BOOLEAN default true, selected VARIANT.',
  selected: '426:4199 selected=yes, 128x40. Icon 24 + label + Icon/Close (MUI) instance 16; two 16px gaps bound space/16. Icon, label and close fills bound color/primary/main #004852.',
  close: 'Library Icon/Close (MUI) key cd53dbdaaf9f53529296291884eb0905ec98ee38, resized 24→16; glyph 14→9.33, near the measured source 8x8 mark. No drawn glyph.',
  unselected: '426:4206 selected=no, label only; icon hidden, close hidden and unlinked; minHeight 40; sample 56x40; gap token retained.',
  apiRepair: 'Shared Show close default first collapsed to false when the unselected close was hidden; final API links the Boolean only to the selected close and sets the component-set default true. Existing selected strip instances explicitly true; unselected explicitly false.'
};
r.step3_strip = {
  id: '426:4214',
  size: '1397x40',
  order: 'Modules · Note · Problems · AI Summary · Vitals · Care Team · Labs/Studies · Allergies · Timeline',
  selected: 'Chip 1 Note 128x40; Chip 2 Problems 158x40; icon/label/close visible; Show close true.',
  unselected: 'AI Summary 103, Vitals 61, Care Team 93, Labs/Studies 112, Allergies 81, Timeline 80; all 40 high; label only; Show close false.',
  glyphHandling: 'Problems keeps the closest existing library glyph and the standing GAP marker/candidates 31–32; hidden unselected glyph swaps remain editable but do not render.'
};
r.step4_comparison = {
  comparison: '434:7474 sole Rebuild comparison/Page placement on Screens section 15.',
  placedStrip: 'I434:7474;434:4866;434:4394;429:4199; live structure and component properties equal the Module strip master.',
  changeLog: '434:4749 Rows now 17 instances, 448x1869; helper 434:4745 480x1926; comparison master 434:4858 remains 2005x2154.',
  rows: [
    'Chip spacing | Tight 8px gaps → 16px | Small elements in one control need room',
    'Chip inks | Black icon, black close → one teal family | Matches the source\'s single ink'
  ],
  rowIds: ['481:10192', '481:10198']
};
r.step5_verification = {
  templates: 'Section 424:4085: 1,549 nodes, 0 unbound local solid paints, 0 fractional authored geometry on edited roots.',
  screens: 'Section 429:6859: 517 nodes, 0 unbound local solid paints, one comparison instance.',
  instancePaints: 'Placed Note and Problems: fill color/primary/100, stroke color/primary/200; icon, label and close color/primary/main; all opacity 1.',
  pixelDiff: 'Direct live 1x Module strip master versus the strip inside the placed comparison: 1 differing anti-aliased edge pixel, max channel delta 13.',
  references: 'Templates section 15 contains 8 selected-variant and 24 unselected-variant references across masters/instances, 3 Module strip instances, 32 Module chip instances. The scoped Screens section has one comparison placement.',
  screenshots: [
    F + 'comparison-module-strip-reference-vs-rebuild.png',
    F + 'master-module-chip-set-426-4213-1x.png',
    F + 'rebuild-module-strip-426-4214-1x.png',
    F + 'placed-module-strip-from-comparison-1x.png',
    F + 'placed-module-strip-from-comparison-1x-white.png',
    F + 'pixel-diff-master-vs-placed-strip-1x.png',
    F + 'source-module-strip-4841-17097-1x.png'
  ]
};
r.standingBatchRules = {
  '1_instancePaintVerification': 'PASS — selected fills and teal icon/label/close bindings rendered through the placed comparison.',
  '2_unboundPaintAudit': 'PASS — Templates section 15 and Screens section 15 have 0 unbound local solid paints.',
  '3_referenceCounts': 'PASS — counts enumerated live; no clone.',
  '4_skipInvisibleFalse': 'PASS — set on every walk.',
  '5_opacityLast': 'PASS — no paint opacity authored.',
  '6_enumerateDontRecall': 'PASS — nodes, properties, tokens, rows and source order read live.',
  '7_fileIdentityFirst': 'PASS — keys explicit; target pages Cover 0:1 / Templates 3:2 / Screens 27:2 / Archive 126:2; schema library page order refreshed.',
  '8_roundWithRecord': 'PASS — 0 fractional authored geometry; minHeight 40 is a deliberate base-8 literal.',
  '9_boundPaintAlpha': 'PASS — no bound paint alpha changed.',
  '10_cloneDropsPropertyRefs': 'PASS — no component clone; live component properties and rendered text agree.'
};
r.counts = { GAP: 5, DEFECT: 0, changeLogRows: 17, variants: 2, stripChips: 8, newMarkers: 0 };
r.flagsAdded = [];
r.flagsAfter = s.flags.length;
r.screenshots = F;

for (const f of s.flags) {
  if (f.id === 'npveEncounter_libraryPageOrderStale') {
    f.resolution = `Resolved 2026-09-06 in ${D}: figmaBuild.pages._order refreshed to the verified live eleven-page library order.`;
  }
  if (f.id === 'npveEncounter_moduleChipGlyphsMissing') {
    f.note_2026_09_06_moduleChipFix = 'The unselected Module chip variant is now label-only, so its stand-in glyphs do not render. Problems remains selected with the closest library glyph; candidate 31 remains open.';
  }
  if (f.id === 'npveEncounter_navIconsShipWhiteGlyphs') {
    f.note_2026_09_06_moduleChipFix = 'Selected Module chip icon overrides now bind color/primary/main; unselected chip icons are hidden. The underlying library white-glyph defect remains open as candidate 32.';
  }
}

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('finalized', D, '; flags', r.flagsBefore, '->', r.flagsAfter);
