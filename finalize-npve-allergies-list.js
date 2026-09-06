// finalize-npve-allergies-list.js — closes the Allergies list Sidesheet rebuild after verification.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_allergiesList_2026-09-05';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const r = s[ID];

if (!r || !String(r._status).startsWith('IN PROGRESS')) {
  throw new Error(`${ID} is missing or not open`);
}

const required = [
  './figma-export/npve-allergies-list-2026-09-05/report.md',
  './figma-export/npve-allergies-list-2026-09-05/source-allergies-129-7726-2x.png',
  './figma-export/npve-allergies-list-2026-09-05/component-severity-352-3206.png',
  './figma-export/npve-allergies-list-2026-09-05/component-allergy-card-354-3206.png',
  './figma-export/npve-allergies-list-2026-09-05/component-allergies-body-355-3217.png',
  './figma-export/npve-allergies-list-2026-09-05/rebuild-allergies-356-3248.png',
  './figma-export/npve-allergies-list-2026-09-05/comparison-allergies-356-6236-final.png'
];
for (const file of required) if (!fs.existsSync(file)) throw new Error(`Missing artifact: ${file}`);

Object.assign(r, {
  _status: 'DONE. Allergies severity selector, card, body, live Sidesheet, comparison, and evidence are built and verified.',
  figmaMutations: [
    'Created Allergy severity selector 352:3206 at 70x32 with editable label, token-bound success surface, and live DownCaret.',
    'Created Allergy card 354:3206 at 518x152 with 16px token-bound padding, 8px metadata rhythm, live Chip instances, and live severity selector.',
    'Created Allergies list body 355:3217 at 518x271 with live Tabs/Tab, Button, Divider, and Allergy card instances.',
    'Added the Allergies list body key to Sidesheet Body content preferred values; default 26:221 and shared geometry remain unchanged.',
    'Created reference 356:6190, rebuild 356:3248, and Change log 356:6192 helpers; appended their keys to Rebuild comparison preferred values without changing defaults.',
    'Uploaded the fresh 2x source export to 356:6191 with image hash 24478b58ffa700bbefa25d1e8ab265648e4bf8cc and fitted it into the canonical 550x600 reference slot.',
    'Created Screens section 356:6235 and sole comparison instance 356:6236.',
    'Cleared six default white fills from authored structural wrappers after the final paint audit.'
  ],
  createdNodes: {
    templatesSection: '352:3205',
    severitySelector: '352:3206',
    severityLabel: '352:3207',
    severityCaret: '352:3208',
    allergyCard: '354:3206',
    allergyDetails: '354:3207',
    allergyTitle: '354:3208',
    severityInstance: '354:3209',
    onsetRow: '354:5912',
    reactionRow: '354:5919',
    commentsRow: '354:5929',
    body: '355:3217',
    tabsStrip: '355:3218',
    activeTab: '355:3220',
    inactiveTab: '355:3223',
    createButton: '355:5925',
    cardInstance: '355:5934',
    reference: '356:6190',
    referenceImage: '356:6191',
    rebuild: '356:3248',
    sidesheet: '356:3249',
    footerAction: 'I356:3249;6:93',
    changeLog: '356:6192',
    changeLogRows: ['356:6193','356:6199','356:6205','356:6211','356:6217','356:6223','356:6229'],
    screensSection: '356:6235',
    comparison: '356:6236'
  },
  verification: {
    fileIdentity: 'PASS — target Templates 3:2 and Screens 27:2; source 129:7726 read live and remained unchanged.',
    sourceImage: 'PASS — fresh 1100x1312 export retained at 2x and fitted proportionally in a 550x600 helper.',
    geometry: 'PASS — selector 70x32; card 518x152; body 518x271; live Sidesheet 550x447; all authored geometry whole-pixel.',
    spacing: 'PASS — card padding 16; major body/card gaps 16; related metadata gaps 8; Sidesheet body padding 16.',
    footer: 'PASS — Add Section to Note is visible as a live Button and follows the active body content.',
    components: 'PASS — 80 live instances in the Templates section and zero broken main-component references; no detach occurred.',
    defaults: 'PASS — Sidesheet Body content default 26:221; Rebuild comparison defaults 114:777 / 114:779 / 114:880.',
    paints: 'PASS — zero unbound authored product-content solid paints; #E4E4E4 Section chrome and frozen image are documented exceptions.',
    typography: 'PASS — all authored text uses Akkurat LL with token-bound family, size, line height, and color.',
    placeholders: 'PASS — zero active placeholders.',
    visual: 'PASS — component, rebuilt Sidesheet, full source, and final comparison renders were inspected.'
  },
  standingBatchRules: {
    '1_instancePaintVerification': 'PASS — live card, body, Sidesheet, and comparison instances were rendered and inspected.',
    '2_unboundPaintAudit': 'PASS — no unbound authored product-content solid paint remains.',
    '3_referenceCounts': 'PASS — all nested controls, local components, helper slots, and comparison links resolve.',
    '4_skipInvisibleFalse': 'PASS — figma.skipInvisibleInstanceChildren=false on final audit traversals.',
    '5_opacityLast': 'PASS — opacity was not changed.',
    '6_enumerateDontRecall': 'PASS — source geometry, target APIs, dependencies, tokens, and final structure were enumerated live.',
    '7_fileIdentityFirst': 'PASS — exact file, page, source, and target identities were verified before mutation.',
    '8_roundWithRecord': 'PASS — all authored containers have whole-pixel geometry.',
    '9_boundPaintAlpha': 'PASS — no bound paint alpha was changed.',
    '10_cloneDropsPropertyRefs': 'PASS — no component or helper clone was used; every link was created and read back.'
  },
  screenshots: required.slice(1).map(file => file.replace('./','')),
  findings: { GAP: 0, DEFECT: 0, DECISION: 0, resolvedDuringBuild: 5 },
  flagsAdded: [],
  flagsAfter: Array.isArray(s.flags) ? s.flags.length : 230,
  recoveryNotes: [
    'Three rejected calls were atomic and changed no canvas state: non-async audit helper, unsupported nested property promotion, and one mistyped token ID caught by a dependency guard.',
    'The first live Sidesheet render exposed an overly broad Button lookup; the body action was restored and the footer was resolved through the Footer to Actions hierarchy.',
    'The final paint audit found six default white fills on structural auto-layout wrappers; they were cleared and the audit passed on rerun.'
  ],
  nextBatch: 'Not started — continue the approved low-oversight Sidesheet sequence after operator review.'
});

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('finalized', ID, 'flags', Array.isArray(s.flags) ? s.flags.length : 'n/a');
