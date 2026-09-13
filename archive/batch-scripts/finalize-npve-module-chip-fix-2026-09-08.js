// Finalizes npveRebuild_moduleChipFix_2026-09-08 after measurement, verification, the one change-log row,
// deterministic checks and the executor's crop-compare. The record was opened by apply-npve-module-chip-fix-2026-09-08.js
// (backup taken there). No Figma writes.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_moduleChipFix_2026-09-08';
const DIR = 'figma-export/npve-module-chip-fix-2026-09-08';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const r = s[ID];
if (!r || !String(r._status || '').startsWith('IN PROGRESS')) throw new Error(`${ID} is not IN PROGRESS`);
const evidence = JSON.parse(fs.readFileSync(`${DIR}/audit-module-chip-fix.json`, 'utf8'));

r._status = 'DONE. Superseding module chip fix prompt re-run under the lean workflow: source chip re-measured; ink family, close scale, variant anatomy and strip order verified already in place from npveRebuild_moduleChipFix_2026-09-06; one change-log row added for the unlogged chip-fill token delta; crop-compare at 1x and ten rules pass. The prompt\'s uniform space/16 internal-gap step stopped as a decision because it reverses npveRebuild_moduleChipRelationshipSpacing_2026-09-06 (identity gap space/8); no master was mutated.';
r.perItemConfirmation = 'start-batch --confirm quoting the operator\'s Step 3 paragraph of the post-pilot close prompt (2026-09-08); tier medium proposed by Claude, unapproved as a tier';
r.step1_sourceMeasurement = evidence.sourceMeasurement;
r.step2_verificationAgainstPrompt = {
  inkFamily: 'PASS already — selected icon, label and close fills bound color/primary/main (#004852 = the source icon ink); Problems included, so the toolbar batch\'s text/primary override is gone.',
  close: 'PASS already — Icon/Close (MUI) 16x16, glyph 9.33px, ink color/primary/main; source is an 8x8 stroked X in a 24px control.',
  internalGaps: 'DECISION — prompt says space/16 between all three elements; live master has identity (icon + label) at space/8 and identity → close at space/16 per npveRebuild_moduleChipRelationshipSpacing_2026-09-06 (commit f1536ad, Daniel Cole, 2026-09-06 15:14). Not changed; stopped for the operator.',
  variantAnatomy: 'PASS already — selected = icon + label + close; unselected = label only with icon and close hidden.',
  stripOrder: 'PASS already — Modules · Note(yes) · Problems(yes) · AI Summary · Vitals · Care Team · Labs/Studies · Allergies · Timeline.',
  chipFillDelta: 'ADDED — source #DFEAEC has no token (nearest color/primary/100 #CBDDE0); stroke #8CB2B6 is exactly color/primary/200; now logged.'
};
r.step3_strip = { id: '426:4214', size: '1397x40', order: evidence.checks.componentIdentity.details, mutation: 'none required' };
r.step4_comparison = {
  comparison: '434:7474 sole Rebuild comparison/Page placement on Screens section 15, now 2005x2252',
  changeLogRows: 19,
  rowsVerbatim: [
    'Chip spacing | Uniform 16px gaps → icon + label 8px; close 16px | Groups module identity; separates the close action  (as amended 2026-09-06; the prompt\'s verbatim row "Chip spacing | Tight 8px gaps → 16px | Small elements in one control need room" is withheld pending the decision)',
    'Chip inks | Black icon, black close → one teal family | Matches the source\'s single ink  (verbatim, unchanged)',
    'Chip fill | Pale teal typed in by hand → nearest library teal | No token matches the mockup tint; the edge colour is a token  (new, 593:6712)'
  ],
  cropCompare: 'Source strip 4841:17097 at 1x over the placed rebuild strip cropped from 434:7474 at (48,1302); 2x enlargement of the left 700px inspected.'
};
r.findings = { GAP: 0, DEFECT: 0, DECISION: 1 };
r.decisionsForOperator = [
  'Internal chip gaps: the superseding prompt (2026-09-06 16:48) asks for space/16 between icon, label and close as a deliberate improvement; the later relationship-spacing batch (npveRebuild_moduleChipRelationshipSpacing_2026-09-06, commit f1536ad) set icon → label to space/8 and identity → close to space/16, and amended the change-log row. Options: (a) keep space/8 identity + space/16 close as recorded (no Figma change; recommended — it is the later decision and matches the source\'s 8px icon → label); (b) return to uniform space/16 and restore the verbatim row "Chip spacing | Tight 8px gaps → 16px | Small elements in one control need room" (one master edit plus one row amendment, a small follow-up batch).'
];
r.flagsAfter = s.flags.length;
r.flagsAdded = [];
r.figmaMutations = [
  'Templates 434:4749 (rows of _Rebuild comparison/Page/Change log/Encounter shell 434:4745): appended Change log/Row 593:6712 "Chip fill | Pale teal typed in by hand → nearest library teal | No token matches the mockup tint; the edge colour is a token"; helper 480x2063 → 480x2160; the placed comparison 434:7474 inherits (2005x2155 → 2005x2252).',
  'No master, strip, instance, token or comparison slot was changed. Source and library read only.'
];
r.createdNodes = evidence.createdNodes;
r.corrections = [];
r.verification = {
  fileIdentity: 'PASS — 0:1 Cover, 3:2 Templates, 27:2 Screens, 126:2 Archive.',
  pageWalk: 'PASS — all four pages walked with skipInvisibleInstanceChildren=false: Cover 8, Templates 9516, Screens 4564, Archive 1782 nodes.',
  unboundPaints: 'PASS — Cover 1, Templates 41, Screens 42, Archive 12; unchanged; nothing new.',
  fractionalGeometry: 'PASS — zero authored fractions outside instances on every page.',
  chipSetApi: 'PASS — Label, Icon, Show close (default true), selected (default yes); selected master references Icon/Label/Close; unselected references Icon/Label with Close unlinked.',
  referenceCounts: 'PASS — 8 selected-variant and 24 unselected-variant references, 3 strip instances on Templates; one page comparison on Screens.',
  renderedInks: 'PASS — placed Note and Problems: icon, label and close #004852 color/primary/main; fill color/primary/100; unselected labels color/text/secondary.',
  pixelDiff: 'PASS — placed strip versus the master at 1x: 0 pixels with a channel delta above 24 after the row edit.',
  changeLog: 'PASS — 19 rows; the new row renders in the placed comparison.',
  archiveCheck: 'PASS — no node with an id at or above 593 on Archive.',
  sourceAndLibrary: 'PASS — no writes to zVsuhYehoSLLq880qRBFkq or YX2n4YLrEpBXNbcc73T6dw.'
};
r.standingBatchRules = {
  '1_instancePaintVerification': 'PASS — rendered paints read on every placed chip inside comparison 434:7474 and compared with the masters: selected inks, fill and stroke bound to the same tokens; unselected labels text/secondary.',
  '2_unboundPaintAudit': 'PASS — every node on every page walked; counts unchanged.',
  '3_referenceCounts': 'PASS — set property definitions, master references, variant reference counts, strip instances and change-log rows counted live after the edit.',
  '4_skipInvisibleFalse': 'PASS — figma.skipInvisibleInstanceChildren was false for every audit walk.',
  '5_opacityLast': 'PASS — no paint-level opacity authored.',
  '6_enumerateDontRecall': 'PASS — source chips, library colours (76 variables), set API, strip order, rows and Archive ids enumerated from the live files.',
  '7_fileIdentityFirst': 'PASS — target key passed explicitly on every call; four-page inventory verified before any read informed a decision.',
  '8_roundWithRecord': 'PASS — no fractional authored geometry; the new row is integer-sized.',
  '9_boundPaintAlpha': 'PASS — no paint or alpha change.',
  '10_cloneDropsPropertyRefs': 'PASS — one Change log/Row instance cloned (not a variant); its What/From to/Why properties verified rendered.'
};
r.screenshots = [
  `${DIR}/source-module-strip-4841-17097-1x.png`,
  `${DIR}/master-module-strip-426-4214-1x.png`,
  `${DIR}/placed-module-strip-from-comparison-1x.png`,
  `${DIR}/comparison-module-strip-reference-vs-rebuild.png`,
  `${DIR}/crop-compare-source-vs-rebuild-strip-left-2x.png`,
  `${DIR}/pixel-diff-master-vs-placed-strip-1x.png`,
  `${DIR}/comparison-encounter-434-7474-1x.png`,
  `${DIR}/comparison-encounter-434-7474-1x-after.png`,
  `${DIR}/changelog-tail-chip-rows-1x.png`
];
r.counts = { GAP: 0, DEFECT: 0, DECISION: 1, changeLogRows: 19, variants: 2, stripChips: 8, newMarkers: 0 };
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('finalized', ID, '| flags', s.flags.length);
