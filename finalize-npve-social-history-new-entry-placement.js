// Finalizes the intentional Social History New Entry placement batch from the latest schema state.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_socialHistoryNewEntryPlacement_2026-09-06';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const r = s[ID];

if (!r || !String(r._status).startsWith('IN PROGRESS')) {
  throw new Error(`${ID} is missing or not IN PROGRESS`);
}

r._status = 'DONE — intentional New Entry hierarchy change, live change-log row, fresh screenshots, and ten standing rules complete.';
r.findings = { GAP: 0, DEFECT: 0, DECISION: 0 };
r.flagsAfter = s.flags.length;
r.decisionApplied = 'New Entry now follows the SUBSTANCE/DRUG USE heading at the existing 16px auto-layout gap; the frozen source remains unchanged.';
r.figmaMutations = [
  'Changed 441:5063 primary-axis alignment from SPACE_BETWEEN to MIN; the existing 16px item spacing now places 441:5065 at x=175, immediately after the 159px heading.',
  'Added one live Change log/Row instance 454:5522 to 446:5475 describing Far right → 16px after heading; no prior change-log row was removed or overwritten.',
  'No shared master, preferred-value list, default, source capture, token, field, footer, or unrelated node changed.'
];
r.createdNodes = {
  changeLogRow: '454:5522 Change log/Row — New Entry placement'
};
r.verification = {
  identity: 'PASS — fdCQVFdvOByaOYIJYag0d6; Cover 0:1, Templates 3:2, Screens 27:2, Archive 126:2.',
  placement: 'PASS — heading x=0 width=159; New Entry x=175 width=89; measured gap 16px.',
  geometry: 'PASS — body remains 518x614; rebuild helper and live Sidesheet remain 550x790; comparison remains 1708x882.',
  componentIdentity: 'PASS — New Entry remains one live instance of published Button 155:1193 / key 8fc8f57f80196e40aff7b3b1116226ea0a925120.',
  changeLog: 'PASS — seven visible live Change log/Row instances and three pre-existing hidden spare rows; new row retains all three text properties.',
  preferredValues: 'PASS — Sidesheet Body content remains 12 preferred values with default 26:221; comparison helper lists remain 15 each with defaults 114:777, 114:779, and 114:880.',
  paints: 'PASS — batch body, live sheet, change log, and comparison contain zero unbound solid paints. Whole-page design-node audit remains zero on Templates, Screens, and Archive; Cover retains known exception 1:5. Figma Section organizer fills/strokes are excluded under the existing audit convention.',
  wholePixels: 'PASS — the changed header, heading, button, and new row use whole-pixel authored geometry. One 183.5px rendered label position inside the unchanged published full-width footer Button is intrinsic centering, not batch-authored geometry.',
  fonts: 'PASS — the free-standing body text remains Akkurat LL with font family, size, line-height, weight, and color variable bindings.',
  visual: 'PASS — body, live Sidesheet, and 1708x882 comparison screenshots inspected; no clipping, overlap, or unexpected height change.'
};
r.outcome = 'Moved New Entry from the far edge of the 518px section header to 16px after SUBSTANCE/DRUG USE. The action now reads as part of the section while remaining a published Button instance; the source reference and all sheet geometry are unchanged.';
r.standingBatchRules = {
  '1_instancePaintVerification': 'PASS — body, live Sidesheet instance, and placed comparison rendered after the edit; no paint or effective alpha changed.',
  '2_unboundPaintAudit': 'PASS with known Cover exception — zero unbound solid paints on design nodes in Templates, Screens, and Archive; Cover 1:5 remains known. Figma Section organizer chrome is excluded under the established audit convention.',
  '3_referenceCounts': 'PASS — Body content preferred values remain 12; comparison preferred values remain 15 each; helper placements remain one each.',
  '4_skipInvisibleFalse': 'PASS — set before every audit walk; three hidden spare change-log rows were included.',
  '5_opacityLast': 'PASS — no opacity changed.',
  '6_enumerateDontRecall': 'PASS — target nodes, alignment, gap, button identity, shared defaults, helper counts, and current renders were read from the live file before and after the write.',
  '7_fileIdentityFirst': 'PASS — explicit target key and exact four-page inventory verified before mutation.',
  '8_roundWithRecord': 'PASS — no fractional authored geometry introduced; unchanged intrinsic centering inside a published footer Button remains outside authored geometry.',
  '9_boundPaintAlpha': 'PASS — no fill, stroke, binding, or alpha changed.',
  '10_cloneDropsPropertyRefs': 'PASS — new live Change log/Row instance 454:5522 retains What, From to, and Why text properties and renders their new values.'
};
r.screenshots = [
  'figma-export/npve-social-history-new-entry-placement-2026-09-06/body-social-history.png',
  'figma-export/npve-social-history-new-entry-placement-2026-09-06/rebuild-social-history.png',
  'figma-export/npve-social-history-new-entry-placement-2026-09-06/comparison-social-history.png'
];

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('finalized', ID, 'flags', s.flags.length);
