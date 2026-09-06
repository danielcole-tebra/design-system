// Finalizes the Health Status/Observations optical-spacing correction after pixel verification.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_healthStatusObservationsOpticalSpacing_2026-09-06';
const ORIGINAL = 'npveRebuild_healthStatusObservations_2026-09-05';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const r = s[ID];

if (!r || !String(r._status).startsWith('IN PROGRESS')) {
  throw new Error(`${ID} is missing or is not in progress`);
}

r._status = 'DONE — Functional Observations optical gap corrected to bound space/8; dependent heights, change log, comparison, screenshots, and ten standing rules verified.';
r.outcome = 'Changed only the Functional Observations heading-to-empty-field gap from 16px to 8px. The Health Status labeled-field rhythm remains 16px and the section separation remains 24px. The body and live sheet are 8px shorter, with the footer still directly following content.';
r.figmaMutations = [
  '412:3955 Functional Observations: itemSpacing 16 → 8, rebound from space/16 to space/8; height 80 → 72.',
  '412:3889 Health status/observations body: height 296 → 288.',
  '413:7010 Rebuild helper and 413:7011 live Sidesheet: height 472 → 464.',
  '415:7108 Change log: overall height row updated; Health field spacing clarified; hidden Row 415:7119 reused, made visible, and placed after that row as Empty-field spacing 16 → 8.',
  'No Sidesheet or comparison defaults, preferred values, source reference, field instances, labels, values, or unrelated screens changed.'
];
r.finalGeometry = {
  healthStatus: '518x192, itemSpacing 16 bound space/16.',
  functionalObservations: '518x72, itemSpacing 8 bound space/8.',
  body: '518x288: Health Status 192 + section gap 24 + Functional Observations 72.',
  sheet: '550x464: header 72 + divider 1 + body region 320 + footer 71.',
  changeLog: '480x716 with seven visible live Change log/Row instances.',
  comparison: '1708x808.'
};
r.visualReview = {
  result: 'PASS — rebuilt sheet and full comparison inspected at native resolution.',
  finding: 'The empty dropdown no longer reads looser than the labeled group. It remains separated from the heading, with no collision or clipping.',
  measuredAfter: 'Functional Observations heading frame to field border = 8px; Health heading render to first floating-label render = 17.088px; the different measurements reflect the different label anatomy.'
};
r.verification = {
  identity: 'PASS — target fdCQVFdvOByaOYIJYag0d6; Cover 0:1, Templates 3:2, Screens 27:2, Archive 126:2.',
  token: 'PASS — 412:3955 itemSpacing resolves through space/8 key 183d5d946d268e8bd37735b8b0dc95111c46eddd.',
  content: 'PASS — all four remote Text field instances retain their source labels, values, select state, and small variants.',
  shell: 'PASS — 413:7011 remains a live instance of 6:65; footer begins at y=393 immediately after the 320px body region and ends at y=464.',
  comparison: 'PASS — 415:7208 remains a live instance of 35:332; reference, rebuild, and change helpers each have exactly one placement.',
  preferredValues: 'PASS — Body content remains 11 entries; comparison helper lists remain 14 each; no default changed.',
  paints: 'PASS — Templates 5847 nodes / 0 unbound solid paints; Screens 2817 / 0; Archive 1393 / 0; Cover retains its one pre-existing flagged exception on 1:5.',
  geometry: 'PASS for all authored and visible correction geometry. The two x=183.5 results are the same pre-existing hidden full-width-action label inherited by the shared shell and its comparison placement; untouched and invisible.',
  sourceAndLibrary: 'PASS — source and library were not written.'
};
r.standingBatchRules = {
  '1_instancePaintVerification': 'PASS — live rebuild helper and sole placed comparison were re-rendered and inspected.',
  '2_unboundPaintAudit': 'PASS with known Cover exception — Templates, Screens, and Archive zero; Cover 1:5 remains the recorded exception.',
  '3_referenceCounts': 'PASS — all three helpers remain single-placement; preferred-value counts unchanged.',
  '4_skipInvisibleFalse': 'PASS — set before the final audit walk.',
  '5_opacityLast': 'PASS — opacity untouched.',
  '6_enumerateDontRecall': 'PASS — current node geometry, render bounds, bindings, properties, and placements were read before and after the edit.',
  '7_fileIdentityFirst': 'PASS — explicit target key and exact page IDs verified.',
  '8_roundWithRecord': 'PASS — all authored and visible corrected geometry is integral; inherited hidden half-pixel text recorded above.',
  '9_boundPaintAlpha': 'PASS — no paint or alpha changed.',
  '10_cloneDropsPropertyRefs': 'PASS — no component was cloned; an existing hidden Change log/Row instance was reused and retains all three text properties.'
};
r.screenshots = [
  'figma-export/npve-health-status-optical-spacing-2026-09-06/body-after.png',
  'figma-export/npve-health-status-optical-spacing-2026-09-06/rebuild-after.png',
  'figma-export/npve-health-status-optical-spacing-2026-09-06/comparison-after.png'
];
r.flagsAdded = [];
r.flagsAfter = s.flags.length;

if (!s[ORIGINAL]) throw new Error(`${ORIGINAL} missing`);
s[ORIGINAL].followup_2026_09_06 = {
  record: ID,
  note: 'Functional Observations empty-field optical gap corrected 16 → 8. Current body is 518x288 and current sheet is 550x464; see the follow-up report and screenshots.'
};

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('finalized', ID, 'flags', s.flags.length);
