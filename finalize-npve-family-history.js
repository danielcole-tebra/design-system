// finalize-npve-family-history.js — closes the bounded Family History Sidesheet rebuild after visual and structural validation.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_familyHistory_2026-09-05';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const r = s[ID];

if (!r || !String(r._status).startsWith('IN PROGRESS')) {
  throw new Error(`${ID} is missing or not open`);
}

const required = [
  './figma-export/npve-family-history-2026-09-05/report.md',
  './figma-export/npve-family-history-2026-09-05/source-family-history-129-7950-2x.png',
  './figma-export/npve-family-history-2026-09-05/component-condition-row-346-3080.png',
  './figma-export/npve-family-history-2026-09-05/component-member-card-346-3089.png',
  './figma-export/npve-family-history-2026-09-05/component-family-history-body-346-3113.png',
  './figma-export/npve-family-history-2026-09-05/rebuild-family-history-346-3148.png',
  './figma-export/npve-family-history-2026-09-05/comparison-family-history-346-5993-final.png'
];
for (const file of required) if (!fs.existsSync(file)) throw new Error(`Missing artifact: ${file}`);

Object.assign(r, {
  _status: 'DONE. Family History condition row, member card, body, live Sidesheet, comparison, and evidence are built and verified.',
  figmaMutations: [
    'Created Family history condition row 346:3080 at 486x40 with editable condition text, optional token-bound highlight, and live AddPaymentNote Icon button.',
    'Created Family history member card 346:3089 at 518x184 with 16px token-bound padding, editable Relationship and Age, live EditOutlined Icon button, and two live condition-row instances.',
    'Created Family history body 346:3113 at 518x238 with a live approved Button and member-card instance separated by 16px.',
    'Added the Family history body key to Sidesheet Body content preferred values; default 26:221 and all shared geometry remain unchanged.',
    'Created reference 346:3146, rebuild 346:3148, and Change log 346:3365 helpers; appended their keys to Rebuild comparison preferred values without changing defaults.',
    'Uploaded the fresh 2x source export to 346:3147 with image hash 379f8398952ac7885297a25099807aee5563476d and fitted it into the canonical 550x600 reference slot.',
    'Created Screens section 346:5992 and sole comparison instance 346:5993.',
    'Added a token-bound outline to reusable add-to-note action 346:3083 after the first pixel check exposed the missing source ring.'
  ],
  createdNodes: {
    templatesSection: '346:3079',
    conditionRow: '346:3080',
    conditionHighlight: '346:3081',
    conditionLabel: '346:3082',
    conditionAction: '346:3083',
    memberCard: '346:3089',
    memberHeader: '346:3090',
    relationshipText: '346:3092',
    ageText: '346:3093',
    editAction: '346:3094',
    condition1: '346:3099',
    condition2: '346:3106',
    body: '346:3113',
    createButton: '346:3114',
    memberCardInstance: '346:3123',
    reference: '346:3146',
    referenceImage: '346:3147',
    rebuild: '346:3148',
    sidesheet: '346:3149',
    footerAction: 'I346:3149;6:93',
    changeLog: '346:3365',
    changeLogRows: ['346:3366','346:3372','346:3378','346:3384','346:3390','348:3237','348:3243'],
    screensSection: '346:5992',
    comparison: '346:5993'
  },
  verification: {
    fileIdentity: 'PASS — target Templates 3:2 and Screens 27:2; source 129:7950 read live and remained unchanged.',
    sourceImage: 'PASS — fresh 1100x1312 export retained at 2x and fitted proportionally in a 550x600 helper so the source footer remains visible.',
    geometry: 'PASS — row 486x40; card 518x184; body 518x238; live Sidesheet 550x414; Header 72, Body 270, Footer 71.',
    spacing: 'PASS — card padding 16; major body/card gaps 16; related label/control gaps 8; Sidesheet body padding 16.',
    footer: 'PASS — Add All As New Section is visible as a live Button and begins at y343 immediately after active body content.',
    components: 'PASS — every instance in the new Templates and Screens sections resolves to a main component; no detach occurred.',
    defaults: 'PASS — Sidesheet Body content default 26:221; Rebuild comparison defaults 114:777 / 114:779 / 114:880.',
    paints: 'PASS — zero unbound product-content solid paints; #E4E4E4 Section chrome, Section outline, and frozen image are documented exceptions.',
    geometryAudit: 'PASS — zero fractional authored FRAME, COMPONENT, RECTANGLE, or SECTION dimensions or positions.',
    typography: 'PASS — all authored text uses Akkurat LL with family, size, and line-height bindings.',
    visual: 'PASS — component, rebuilt Sidesheet, full source, and final comparison renders were inspected.'
  },
  standingBatchRules: {
    '1_instancePaintVerification': 'PASS — live row, card, body, Sidesheet, and comparison instances were rendered and inspected.',
    '2_unboundPaintAudit': 'PASS — no unbound product-content solid paint; only recorded Section chrome and source-image exceptions.',
    '3_referenceCounts': 'PASS — all new nested controls, local components, helper slots, and comparison links resolve.',
    '4_skipInvisibleFalse': 'PASS — figma.skipInvisibleInstanceChildren=false on every audit traversal.',
    '5_opacityLast': 'PASS — opacity was not changed.',
    '6_enumerateDontRecall': 'PASS — source geometry, target APIs, dependencies, tokens, and final structure were enumerated live.',
    '7_fileIdentityFirst': 'PASS — exact file, page, source, and target identities were verified before mutation.',
    '8_roundWithRecord': 'PASS — all authored containers have whole-pixel geometry.',
    '9_boundPaintAlpha': 'PASS — no bound paint alpha was changed.',
    '10_cloneDropsPropertyRefs': 'PASS — no component or helper clone was used; every link was created and read back.'
  },
  screenshots: required.slice(1).map(file => file.replace('./','')),
  findings: { GAP: 0, DEFECT: 0, DECISION: 0, resolvedDuringBuild: 2 },
  flagsAdded: [],
  flagsAfter: Array.isArray(s.flags) ? s.flags.length : 230,
  recoveryNotes: [
    'Four rejected calls were atomic and changed no canvas state: missing connector description, component.loadAsync misuse, absolute positioning before append, and an invalid numeric fontStyle binding.',
    'The first comparison render exposed a missing add-to-note ring; action 346:3083 received the source-faithful token-bound outline.',
    'The first Screens audit exposed the 656px source helper being clipped by the canonical 600px comparison slot; the frozen export was fitted proportionally without changing product geometry.'
  ],
  nextBatch: 'Not started — await operator review of the Family History comparison before continuing the low-oversight sequence.'
});

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('finalized', ID, 'flags', Array.isArray(s.flags) ? s.flags.length : 'n/a');
