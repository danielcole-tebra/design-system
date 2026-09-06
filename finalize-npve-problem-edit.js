// finalize-npve-problem-edit.js — closes the Problems Edit batch after visual and structural validation.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_problemEdit_2026-09-04';
const FLAG = 'npveProblemEdit_textFieldNoEndAdornment';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const r = s[ID];

if (!r || !String(r._status).startsWith('IN PROGRESS')) {
  throw new Error(`${ID} is missing or not open`);
}

const required = [
  './figma-export/npve-problem-edit-2026-09-04/report.md',
  './figma-export/npve-problem-edit-2026-09-04/source-problem-edit-4536-27605-2x.png',
  './figma-export/npve-problem-edit-2026-09-04/component-problem-edit-body-316-3412-2x.png',
  './figma-export/npve-problem-edit-2026-09-04/rebuild-problem-edit-318-3655-2x.png',
  './figma-export/npve-problem-edit-2026-09-04/comparison-problem-edit-318-6740.png'
];
for (const file of required) if (!fs.existsSync(file)) throw new Error(`Missing artifact: ${file}`);

if (!Array.isArray(s.flags)) throw new Error('schema flags[] missing');
if (!s.flags.some((f) => f.id === FLAG)) {
  s.flags.push({
    id: FLAG,
    severity: 'medium',
    kind: 'GAP',
    discoveredDuring: ID,
    webAppV2BugListCandidate: false,
    summary: 'The published Text field component has no end-adornment instance-swap slot, so the Edit Problem date fields cannot place Icon/Calendar inside the field through the component API.',
    where: 'Design System Rebuild Text field; NPVE Problem edit body 316:3412; GAP marker 324:4934',
    detail: 'Source 4536:27605 places a 24px calendar glyph inside each 40px date field. The target preserves attachment by composing each date as an explicitly named GAP wrapper around a live small Text field and live Icon/Calendar instance. No generic Date picker or drawn stand-in was introduced.',
    handling: 'Reported, not resolved. Library follow-up is item 15 in figma-export/library-todos/LIBRARY-TODOS.md: add an optional end-adornment instance-swap slot to Text field, default hidden, with Icon/Calendar curated.'
  });
}

Object.assign(r, {
  _status: 'DONE. Edit Problem Sidesheet, comparison, change log, and GAP marker are built and verified; the sole screen remains a live Sidesheet instance.',
  figmaMutations: [
    'Created Problem edit body 316:3412 from five live Text field, two Chip, and two Icon/Calendar instances.',
    'Created Problem edit / Mark as error action 318:3643 and Problem edit footer actions 320:3849 from live Button instances.',
    'Appended Problem edit body and footer actions to existing Sidesheet preferred values; defaults remain 26:221 and 248:1827.',
    'Created reference 318:3652, rebuild 318:3654, and change log 318:3928 helpers and appended them to Rebuild comparison preferred values; defaults unchanged.',
    'Uploaded the fresh 2x source export to 318:3653 with image hash a62362f2274f16a7c8e302871915a5fbf4acc71d.',
    'Created comparison section 318:6739, live comparison instance 318:6740, and GAP marker 324:4934.',
    'Copied the established E4E4E4 section treatment and normalized the footer spacer to whole-pixel geometry.'
  ],
  createdNodes: {
    templatesSection: '316:3411',
    body: '316:3412',
    markErrorAction: '318:3643',
    footerActions: '320:3849',
    reference: '318:3652',
    referenceImage: '318:3653',
    rebuild: '318:3654',
    sidesheet: '318:3655',
    changeLog: '318:3928',
    screensSection: '318:6739',
    comparison: '318:6740',
    gapMarker: '324:4934'
  },
  verification: {
    fileIdentity: 'PASS — target pages Cover 0:1, Templates 3:2, Screens 27:2, Archive 126:2; source 4536:27605 read live.',
    sourceImage: 'PASS — fresh 1100x916 export placed at 0.5 scaling factor; hash a62362f2274f16a7c8e302871915a5fbf4acc71d.',
    components: 'PASS — body and footer use live subscribed components; no detached instance on Templates or Screens.',
    comments: 'PASS — nested live Comments field is medium multiline, 518x104 with a 104px outline; fixed sample rows are empty.',
    paints: 'PASS — body master and live nested instance each expose 35 visible paint entries with identical normalized signatures.',
    defaults: 'PASS — Sidesheet Body content 26:221 and Full-width action 248:1827; comparison 114:777 / 114:779 / 114:880.',
    geometry: 'PASS — no fractional authored geometry in either new section; section separation is 200px.',
    organization: 'PASS — both new work areas use the established E4E4E4 section fill.',
    existingUnchanged: 'PASS — prior Sidesheet values and geometry remained unchanged; existing instances inherited only additive preferred-value lists.',
    visual: 'PASS — body, live 2x Sidesheet, and full comparison rendered and inspected after every correction.'
  },
  standingBatchRules: {
    '1_instancePaintVerification': 'PASS — 35 visible master paint entries equal 35 live-instance entries exactly.',
    '2_unboundPaintAudit': 'PASS with documented canvas exception — no local component surface paint; only copied E4E4E4 section fills and 10% section outlines are unbound.',
    '3_referenceCounts': 'PASS — every new component and comparison link resolves; all new nested controls remain live instances.',
    '4_skipInvisibleFalse': 'PASS — figma.skipInvisibleInstanceChildren=false on every audit walk.',
    '5_opacityLast': 'PASS — opacity was not changed.',
    '6_enumerateDontRecall': 'PASS — source, target, library subscription, component APIs, footer structure, and final instances were enumerated live.',
    '7_fileIdentityFirst': 'PASS — exact file, page, source node, and target master identities were verified before mutation.',
    '8_roundWithRecord': 'PASS — half-pixel footer spacer was caught and corrected; final authored geometry is integer.',
    '9_boundPaintAlpha': 'PASS — no bound paint alpha was changed.',
    '10_cloneDropsPropertyRefs': 'PASS — only the established GAP frame was cloned; no component clone was used. All new component links were created and read back.'
  },
  screenshots: [
    'figma-export/npve-problem-edit-2026-09-04/source-problem-edit-4536-27605-2x.png',
    'figma-export/npve-problem-edit-2026-09-04/component-problem-edit-body-316-3412-2x.png',
    'figma-export/npve-problem-edit-2026-09-04/rebuild-problem-edit-318-3655-2x.png',
    'figma-export/npve-problem-edit-2026-09-04/comparison-problem-edit-318-6740.png'
  ],
  findings: {
    GAP: 1,
    DEFECT: 0,
    DECISION: 0,
    existingDefectEncountered: 'npveAudit_textFieldHiddenPlaceholderCopy'
  },
  flagsAdded: [FLAG],
  flagsBefore: 229,
  flagsAfter: s.flags.length,
  recoveryNotes: [
    'Visual QA corrected inherited status styling on Type, clipped date labels, collapsed Comments outline, default Button labels, right-packed footer actions, a half-pixel spacer, and default-white work areas before completion.',
    'No Figma call failed or partially committed. All corrections stayed inside nodes created by this batch or additive preferred-value lists.'
  ],
  nextBatch: 'Not started — select the next remaining sidesheet reference only after operator review of this comparison.'
});

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('finalized', ID, 'flags', s.flags.length);
