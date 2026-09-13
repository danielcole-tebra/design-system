// Finalizes the bounded Health Status/Observations rebuild record after Figma verification.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_healthStatusObservations_2026-09-05';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const r = s[ID];

if (!r || !String(r._status).startsWith('IN PROGRESS')) {
  throw new Error(`${ID} is missing or is not in progress`);
}

r._status = 'DONE — reusable body, shared Sidesheet, frozen reference, conforming change log, sole comparison, screenshots, and ten standing rules complete.';
r.outcome = 'Built Health Status/Observations as a reusable Sidesheet body and one live shared-shell screen. The rebuild preserves all source labels and values, changes the source 12px field gaps to the agreed 16px base-8 rhythm, keeps 24px between content sections, and removes 128px of unused sheet height so the footer follows the final field.';
r.figmaMutations = [
  'Appended Health status/observations body 412:3889 to Body content#279:5 preferred values on Sidesheet 279:2446; default and shared geometry unchanged.',
  'Appended reference helper 415:4050, rebuild helper 413:7010, and change-log helper 415:7108 to the three preferred-value lists on Rebuild comparison 35:332; defaults and shared geometry unchanged.',
  'Added Templates section 412:3888 and Screens section 415:7207; no prior content moved, renamed, deleted, or overwritten.'
];
r.createdNodes = {
  templatesSection: '412:3888 14 · Health Status/Observations',
  body: '412:3889 Health status/observations body (component key 7369c5ea35b04599ba8710b383c205a0fe432b61)',
  bodySections: ['412:3890 Health Status', '412:3955 Functional Observations'],
  textFields: [
    '412:3892 Disability Status',
    '412:3913 Cognitive/Mental Status',
    '412:3934 Functional Status',
    '412:3957 Add observation'
  ],
  rebuildHelper: '413:7010 Rebuild helper · Health Status/Observations (component key d8aa077578a50fe3feaf3ff8db9ff62c41ee8815)',
  sidesheet: '413:7011 Health Status/Observations',
  referenceHelper: '415:4050 Reference helper · Health Status/Observations (component key 08edd3685d8db7d09199eb748a24ca86a64841a1)',
  sourceImage: '415:4051 Source capture · 129:8130 · 2026-09-05',
  changeLog: '415:7108 _Rebuild comparison/Change log/Health Status/Observations (component key e824475988fdddffb6b6314af0e36e86844dd4b5)',
  screensSection: '415:7207 14 · Health Status/Observations',
  comparison: '415:7208 Health Status/Observations · Reference / Rebuild / Changes'
};
r.geometry = {
  source: '550x600: header 64, body 476, footer 60.',
  body: '518x296: Health Status 192, 24px section gap, Functional Observations 80.',
  rebuild: '550x472: header 72, header divider 1, body region 328, footer 71.',
  comparison: '1708x711; source remains 550x600 at 1:1, rebuild remains 550x472, change log 480x619.'
};
r.reuse = {
  fields: 'Four live remote Text field variants: three size=small / State=Default / Value=Filled and one size=small / State=Default / Value=Empty; all select=true.',
  shell: 'One live instance of shared Sidesheet Floating 6:65; Body content swaps to 412:3889; footer shows tertiary and primary actions only.',
  comparison: 'One live instance of Rebuild comparison 35:332; each new helper has exactly one placement, inside 415:7208.',
  changeLog: 'Clone of the conforming Content/Title/Divider/Rows pattern. Six visible live Change log/Row instances; unused cloned rows hidden, not deleted.'
};
r.visualReview = {
  result: 'PASS — source and rebuild inspected side by side at 1708x711.',
  observed: [
    'All four labels, all three populated values, the empty Add observation field, both headings, close control, and both footer actions are visible and uncut.',
    'The footer sits immediately below the content region; the source-only blank area is not reproduced.',
    'Source remains a frozen 2x raster displayed at its native 550x600 canvas dimensions; it is not scaled to fit the rebuild.',
    'Rebuild and reference helpers are transparent, so no false white panel continues below the shorter rebuild.'
  ]
};
r.verification = {
  identity: 'PASS — fdCQVFdvOByaOYIJYag0d6; Cover 0:1, Templates 3:2, Screens 27:2, Archive 126:2.',
  sourcePolicy: 'PASS — zVsuhYehoSLLq880qRBFkq was read and exported only; no source or library write occurred.',
  spacing: 'PASS — body and both groups bind space/24 and space/16 respectively; shell body supplies 16px top/bottom/side inset.',
  instances: 'PASS — four field masters are remote published Text field variants; sheet main component is 6:65; comparison main component is 35:332.',
  preferredValues: 'PASS — Sidesheet Body content now has 11 entries; each comparison helper list has 14; all defaults unchanged.',
  placement: 'PASS — each of the three helpers has exactly one instance and it is inside sole comparison 415:7208.',
  paints: 'PASS — Templates 5847 nodes / 0 unbound solid paints; Screens 2817 / 0; Archive 1528 / 0; Cover retains its one pre-existing flagged unbound fill on 1:5.',
  geometry: 'PASS — all batch-authored and visible geometry is on whole pixels. The only fractional result is x=183.5 on the pre-existing hidden full-width-action label inside the shared shell; it was not authored, exposed, or changed by this batch.',
  fonts: 'PASS — new headings use loaded Akkurat LL Bold with bound family, size, line-height, weight, and text colour.',
  propertyReferences: 'PASS — new body and helper components expose no accidental properties; live field and Change log/Row instance properties remain intact.'
};
r.standingBatchRules = {
  '1_instancePaintVerification': 'PASS — body, live sheet, and placed comparison all rendered and were inspected.',
  '2_unboundPaintAudit': 'PASS with known Cover exception — Templates, Screens, and Archive have zero; Cover 1:5 remains the pre-existing flagged exception.',
  '3_referenceCounts': 'PASS — Body content preferred values 11; comparison preferred values 14 each; each helper placed once.',
  '4_skipInvisibleFalse': 'PASS — set for the full verification walk.',
  '5_opacityLast': 'PASS — opacity was not changed.',
  '6_enumerateDontRecall': 'PASS — source geometry, live field properties, shell API, comparison API, and change-log structure were enumerated before writes.',
  '7_fileIdentityFirst': 'PASS — target key and four exact page IDs were verified before mutation.',
  '8_roundWithRecord': 'PASS — batch-authored and visible geometry is integral; the one fractional hidden descendant is pre-existing shared-shell content and is recorded above.',
  '9_boundPaintAlpha': 'PASS — no bound paint alpha was altered.',
  '10_cloneDropsPropertyRefs': 'PASS — cloned change-log helper has no exposed component properties; six live Row instances retain their three text properties.'
};
r.screenshots = [
  'figma-export/npve-health-status-observations-2026-09-05/source-health-status-129-8130-2x.png',
  'figma-export/npve-health-status-observations-2026-09-05/body-health-status-observations.png',
  'figma-export/npve-health-status-observations-2026-09-05/rebuild-health-status-observations.png',
  'figma-export/npve-health-status-observations-2026-09-05/comparison-health-status-observations.png'
];
r.flagsAdded = [];
r.flagsAfter = s.flags.length;

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('finalized', ID, 'flags', s.flags.length);
