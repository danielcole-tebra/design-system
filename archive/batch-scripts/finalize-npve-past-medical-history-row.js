// Finalizes the bounded PMHx condition-row pilot after deterministic and visual validation.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_pastMedicalHistoryRow_2026-09-08';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const r = s[ID];
if (!r || !String(r._status || '').startsWith('IN PROGRESS')) throw new Error(`${ID} is not IN PROGRESS`);

r._status = 'DONE. Low-risk pilot item built and validated; stopped before the section item for operator review.';
r.outcome = [
  'Created a two-variant Past medical history condition row component set at 518px content width.',
  'Used a 42px row to preserve the published Checkbox and Icon button touch targets; the source 32px height is recorded as an intentional difference.',
  'Created frozen reference, live rebuild, plain-language change-log helpers, and one sole shared-master comparison on Screens.',
  'Shared component APIs and the shared comparison master were not modified.'
];
r.findings = { GAP: 0, DEFECT: 0, DECISION: 1 };
r.decision = 'Source row 32px → rebuild row 42px so the published 42px Checkbox touch target is not shrunk. Visible glyph size and relationship remain source-faithful.';
r.figmaMutations = [
  'Templates: created organizer section 518:5771.',
  'Templates: created Past medical history condition row set 518:5797 with Empty 518:5772 and Filled 518:5785 variants.',
  'Templates: created state proof 518:5798 and helpers 518:5825, 518:5827, 518:5837.',
  'Screens: created organizer section 521:7834 and sole comparison instance 521:7835 from shared master 35:332.',
  'Applied an instance-level clipsContent override to the compact row comparison; no shared-master mutation.'
];
r.createdNodes = {
  templatesSection: '518:5771',
  rowComponentSet: '518:5797',
  emptyVariant: '518:5772',
  filledVariant: '518:5785',
  statesProof: '518:5798',
  referenceHelper: '518:5825',
  rebuildHelper: '518:5827',
  changeHelper: '518:5837',
  screensSection: '521:7834',
  comparison: '521:7835'
};
r.verification = {
  fileIdentity: 'PASS — 0:1 Cover, 3:2 Templates, 27:2 Screens, 126:2 Archive.',
  componentApi: 'PASS — Condition text plus Comment Empty/Filled variant axis.',
  renderedStates: 'PASS — Trauma/Empty and Cataracts/Filled render their stored values.',
  instancePaints: 'PASS — zero solid-paint mismatches for both master/proof pairs.',
  comparison: 'PASS — inspected comparison.png; source and rebuild visible relationships align.'
};
r.standingBatchRules = {
  '1_instancePaintVerification': 'PASS — both variants were placed and compared against their rendered proof instances; zero paint mismatches.',
  '2_unboundPaintAudit': 'PASS — every node on all four pages was walked; only established organizer paints are unbound in the new subtrees.',
  '3_referenceCounts': 'PASS — Empty and Filled each contain two componentPropertyReferences.',
  '4_skipInvisibleFalse': 'PASS — figma.skipInvisibleInstanceChildren was false for all-page and targeted audit walks.',
  '5_opacityLast': 'PASS — no paint-level opacity was authored or remediated.',
  '6_enumerateDontRecall': 'PASS — audits enumerated current live page trees and current variant descendants.',
  '7_fileIdentityFirst': 'PASS — target file key and exact four-page inventory were verified before final evidence was accepted.',
  '8_roundWithRecord': 'PASS — no fractional authored geometry; source 32px and rebuild 42px are recorded integers.',
  '9_boundPaintAlpha': 'PASS — bound paints were preserved from live approved nodes; no bound alpha was overwritten.',
  '10_cloneDropsPropertyRefs': 'PASS — variants were built independently; reference counts and rendered text/icon state were verified on instances.'
};
r.screenshots = [
  'figma-export/npve-past-medical-history-row-2026-09-08/source-row-129-9306.png',
  'figma-export/npve-past-medical-history-row-2026-09-08/states.png',
  'figma-export/npve-past-medical-history-row-2026-09-08/comparison.png'
];
r.flagsAfter = s.flags.length;
r.flagsAdded = [];

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('finalized', ID, 'flags', s.flags.length);
