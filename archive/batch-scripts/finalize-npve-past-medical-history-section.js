// Finalizes the bounded PMHx section pilot after deterministic and visual validation.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_pastMedicalHistorySection_2026-09-08';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const r = s[ID];
if (!r || !String(r._status || '').startsWith('IN PROGRESS')) throw new Error(`${ID} is not IN PROGRESS`);

r._status = 'DONE. Low-risk PMHx section pilot built and validated; stopped before the body item for operator review.';
r.outcome = [
  'Created a 518x112 Past medical history section component with Heading text and two live approved condition rows.',
  'Applied the canonical 8px heading-to-list relationship and kept condition-row touch targets contiguous.',
  'Created frozen reference, live rebuild, plain-language change-log helpers, and one sole shared-master comparison on Screens.',
  'Shared component APIs, tokens, and the approved condition-row master were not modified.'
];
r.findings = { GAP: 0, DEFECT: 0, DECISION: 0 };
r.sourceBackedDifferences = [
  'Heading gap 0px → 8px per the existing NPVE tight-relationship rule.',
  'Legacy 32px rows → approved 42px condition-row instances with live touch targets.'
];
r.corrections = [
  'Initial render exposed organizer grey behind a transparent heading area; section fill was changed to the approved row paper binding before helpers were created.'
];
r.figmaMutations = [
  'Templates: created organizer section 534:5804 and Past medical history section component 534:5805.',
  'Templates: created proof 534:5834 and helpers 537:5840, 537:5842, 537:5864.',
  'Screens: created organizer section 537:9914 and sole comparison instance 537:9915 from shared master 35:332.',
  'Applied an instance-level clipsContent override to the compact comparison; no shared-master mutation.'
];
r.createdNodes = {
  templatesSection: '534:5804',
  sectionComponent: '534:5805',
  proofInstance: '534:5834',
  referenceHelper: '537:5840',
  rebuildHelper: '537:5842',
  changeHelper: '537:5864',
  screensSection: '537:9914',
  comparison: '537:9915'
};
r.verification = {
  fileIdentity: 'PASS — 0:1 Cover, 3:2 Templates, 27:2 Screens, 126:2 Archive.',
  componentApi: 'PASS — Heading plus nested approved row Condition and Comment properties.',
  renderedState: 'PASS — EYES, Blindness/Empty, and Cataracts/Filled render from stored properties.',
  instancePaints: 'PASS — ten solid paints, zero master/proof mismatches.',
  comparison: 'PASS — inspected comparison.png; source-backed differences are isolated and recorded.'
};
r.standingBatchRules = {
  '1_instancePaintVerification': 'PASS — the new section was placed and ten rendered solid paints matched its master.',
  '2_unboundPaintAudit': 'PASS — every node on all four pages was walked; only established organizer paints are unbound in the new subtrees.',
  '3_referenceCounts': 'PASS — the section master contains five expected componentPropertyReferences.',
  '4_skipInvisibleFalse': 'PASS — figma.skipInvisibleInstanceChildren was false for the consolidated audit.',
  '5_opacityLast': 'PASS — no paint-level opacity was authored or remediated.',
  '6_enumerateDontRecall': 'PASS — the audit enumerated current live page trees and current section descendants.',
  '7_fileIdentityFirst': 'PASS — target file key and exact four-page inventory were verified before evidence was accepted.',
  '8_roundWithRecord': 'PASS — no fractional authored geometry; all new layout values are integers.',
  '9_boundPaintAlpha': 'PASS — the approved paper and text bindings were preserved; no bound alpha was overwritten.',
  '10_cloneDropsPropertyRefs': 'PASS — no component variant was cloned; nested row and heading references were counted and rendered values verified.'
};
r.screenshots = [
  'figma-export/npve-past-medical-history-section-2026-09-08/source-section-129-9315.png',
  'figma-export/npve-past-medical-history-section-2026-09-08/proof.png',
  'figma-export/npve-past-medical-history-section-2026-09-08/comparison.png'
];
r.flagsAfter = s.flags.length;
r.flagsAdded = [];

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('finalized', ID, 'flags', s.flags.length);
