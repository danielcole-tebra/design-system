// finalize-npve-procedure-history.js — closes the bounded Procedures/Surgical History rebuild after visual and structural validation.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_procedureHistory_2026-09-04';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const r = s[ID];

if (!r || !String(r._status).startsWith('IN PROGRESS')) {
  throw new Error(`${ID} is missing or not open`);
}

const required = [
  './figma-export/npve-procedure-history-2026-09-04/report.md',
  './figma-export/npve-procedure-history-2026-09-04/source-procedure-history-648-3473-2x.png',
  './figma-export/npve-procedure-history-2026-09-04/component-metadata-337-3881.png',
  './figma-export/npve-procedure-history-2026-09-04/component-event-row-337-3884.png',
  './figma-export/npve-procedure-history-2026-09-04/component-body-337-3899.png',
  './figma-export/npve-procedure-history-2026-09-04/rebuild-procedure-history-339-6235.png',
  './figma-export/npve-procedure-history-2026-09-04/comparison-procedure-history-339-6481.png'
];
for (const file of required) if (!fs.existsSync(file)) throw new Error(`Missing artifact: ${file}`);

Object.assign(r, {
  _status: 'DONE. Procedures/Surgical History metadata, event row, body, live Sidesheet, comparison, and evidence are built and verified.',
  figmaMutations: [
    'Created Procedure history metadata 337:3881 with editable mixed-weight prefix/value text and bound surface, outline, radius, typography, and spacing tokens.',
    'Created Procedure history event row 337:3884 at 518x120 with 16px padding, 8px related-element gaps, and four live metadata instances.',
    'Created Procedure history body 337:3899 at 518x174 with a live approved Button and live event-row instance separated by 16px.',
    'Appended Procedure history body to the Sidesheet Body content preferred values; the default remains 26:221 and shell geometry is unchanged.',
    'Created reference 339:6233, rebuild 339:6235, and change-log 339:6405 helpers; appended them to Rebuild comparison preferred values without changing defaults.',
    'Uploaded the fresh 2x source export to 339:6234 with image hash 75a2f8fdc6d934555e1089ab7604999647e30a03.',
    'Created Screens section 339:6480 and sole comparison instance 339:6481.'
  ],
  createdNodes: {
    templatesSection: '337:3880',
    metadata: '337:3881',
    eventRow: '337:3884',
    body: '337:3899',
    reference: '339:6233',
    referenceImage: '339:6234',
    rebuild: '339:6235',
    sidesheet: '339:6236',
    changeLog: '339:6405',
    screensSection: '339:6480',
    comparison: '339:6481'
  },
  verification: {
    fileIdentity: 'PASS — target Templates 3:2 and Screens 27:2; source 648:3473 read live and remained unchanged.',
    sourceImage: 'PASS — fresh 1100x604 export placed at 0.5 scaling with hash 75a2f8fdc6d934555e1089ab7604999647e30a03.',
    geometry: 'PASS — live Sidesheet 550x350; Header 72, Body 206, Body content 174, Footer 71.',
    spacing: 'PASS — card padding 16; related metadata gaps 8; major body gap 16; Sidesheet body padding 16.',
    footer: 'PASS — Cancel, Save & Add to Note, and Save are visible live Button instances inside the 71px shared Footer.',
    components: 'PASS — every instance in the new Templates and Screens sections resolves to a main component; no detach occurred.',
    defaults: 'PASS — Sidesheet Body content default 26:221; Rebuild comparison defaults 114:777 / 114:779 / 114:880.',
    paints: 'PASS — zero unbound visible solid paints in new component, rebuild, or change-log content; source image and E4E4E4 section chrome are documented exceptions.',
    geometryAudit: 'PASS — zero fractional authored FRAME, COMPONENT, RECTANGLE, or SECTION dimensions.',
    visual: 'PASS — final component, rebuilt Sidesheet, and full comparison renders were inspected.'
  },
  standingBatchRules: {
    '1_instancePaintVerification': 'PASS — live body and row instances inherit their component surfaces and tokens.',
    '2_unboundPaintAudit': 'PASS — no unbound solid paint in authored content; only recorded canvas chrome and source image exceptions.',
    '3_referenceCounts': 'PASS — all new nested controls, body, sheet, helper, and comparison links resolve.',
    '4_skipInvisibleFalse': 'PASS — figma.skipInvisibleInstanceChildren=false on every audit traversal.',
    '5_opacityLast': 'PASS — opacity was not changed.',
    '6_enumerateDontRecall': 'PASS — source geometry, footer controls, target APIs, tokens, and helper structures were enumerated live.',
    '7_fileIdentityFirst': 'PASS — exact file, page, source, and target identities were verified before mutation.',
    '8_roundWithRecord': 'PASS — all authored containers have whole-pixel dimensions.',
    '9_boundPaintAlpha': 'PASS — no bound paint alpha was changed.',
    '10_cloneDropsPropertyRefs': 'PASS — no component or helper clone was used; every new link was created and read back.'
  },
  screenshots: required.slice(1).map((file) => file.replace('./', '')),
  findings: { GAP: 0, DEFECT: 0, DECISION: 0, resolvedDuringBuild: 1 },
  flagsAdded: [],
  flagsAfter: Array.isArray(s.flags) ? s.flags.length : 230,
  recoveryNotes: [
    'Two read-only discovery calls were rejected because of invalid convenience assumptions; both were atomic and changed nothing.',
    'The first event-row render exposed a fixed-height metadata wrapper clipping the wrapped date. It was changed to vertical hug before composition and final validation.'
  ],
  nextBatch: 'Not started — await operator review of the completed Procedures/Surgical History comparison before continuing the low-oversight sequence.'
});

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('finalized', ID, 'flags', Array.isArray(s.flags) ? s.flags.length : 'n/a');
