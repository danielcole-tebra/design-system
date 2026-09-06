// Records the bounded pre-write audit for External Care History — Facility Stay.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_externalCareFacilityStay_2026-09-05';
const PREVIOUS = 'npveRebuild_externalCareHospitalizations_2026-09-05';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));

if (s[ID]) throw new Error(`${ID} already exists`);
const previous = s[PREVIOUS];
if (!previous || !String(previous._status).startsWith('DONE')) {
  throw new Error('Record gate failed: External Care Hospitalizations is not recorded DONE');
}

const flags = [
  {
    id: 'npveExternalCareFacilityStay_sourceClipsForm',
    severity: 'high',
    kind: 'DEFECT',
    discoveredDuring: ID,
    summary: 'The Facility Stay source fixes its body at 468px while the form card is 556px, so the footer clips the lower form content.',
    where: 'NPVE source zVsuhYehoSLLq880qRBFkq 648:1603; Summary_Wrap 648:1639; form card 648:1658; footer 648:1728',
    detail: 'The card begins at source y=124 and is clipped at the footer boundary y=532. The visible source render cuts off the Discharge to group and completely hides the Comments control even though both exist in the card structure.',
    handling: 'Do not reproduce the clipping. The established shared Sidesheet rule makes the body content-driven and places the footer after the complete active form.'
  },
  {
    id: 'npveExternalCareFacilityStay_formSurfaceToken',
    severity: 'medium',
    kind: 'DECISION',
    discoveredDuring: ID,
    summary: 'The repeated NPVE edit-form surface uses #EEF7F9, but the published design-system library has no matching token.',
    where: 'Source form card 648:1658 and five other edit Sidesheets; NPVE Rebuild target before Facility Stay mutation',
    detail: 'The nearest existing palette value is color/core/100 #E9EFEE, while Card/Paper uses color/background/paper #FFFFFF. Neither is the source value, and selecting either silently would be a design decision.',
    handling: 'Await operator choice: create an NPVE-local form-surface token at #EEF7F9 (recommended), normalize to paper white, or deliberately approximate with core/100.'
  }
];

for (const flag of flags) {
  if (!s.flags.some(existing => existing.id === flag.id)) s.flags.push(flag);
}

s[ID] = {
  _status: 'DISCOVERY COMPLETE — AWAITING OPERATOR DECISION. No target Figma mutation performed.',
  date: '2026-09-05',
  workstream: 'NPVE Rebuild / Sidesheets',
  report: 'figma-export/npve-external-care-facility-stay-2026-09-05/report.md',
  recordGate: `${PREVIOUS} recorded DONE — passed`,
  source: {
    file: 'zVsuhYehoSLLq880qRBFkq',
    page: '21:321 ⚙️ Components',
    node: '648:1603 Page=Clin_ExternalCareFS',
    policy: 'read only'
  },
  target: {
    file: 'fdCQVFdvOByaOYIJYag0d6',
    templatesPage: '3:2',
    screensPage: '27:2',
    externalCareSection: '370:3340',
    sharedSidesheet: '279:2446',
    floatingVariant: '6:65'
  },
  scope: 'Audit the Facility Stay source, identify reusable library controls and unresolved decisions, and stop before any Figma mutation if the source introduces a new design choice.',
  sourceFacts: [
    'The 550x592 source is an Edit Event form, not a simple list-state sibling of Hospitalizations.',
    'It contains Facility Type radios, Facility Name, Admission and Discharge dates, Related to problem select, Prior Event radios, Discharge to radios, Comments, a Trash action, and Cancel / Save & Add to Note / Save.',
    'The 556px card overflows the 468px fixed body; the footer clips the lower form by 88px.',
    'The form card uses #EEF7F9 with a 1px #D6D6D6 outline and 8px radius.'
  ],
  reuseBaseline: {
    textField: '7c3c99bb9a9392d6571c0557b41d142b8987b566',
    radio: '32c00a5301fd57fa3619ec850941d3ad37bf2e8d',
    formControlLabel: '77cfa2d6c7b4601fc5a311028da35f42fc8f3ebb',
    iconButton: '7ebea5d7ce6ecfdaef84d177efa64196f654717d',
    trashIcon: '44218ece645a8de41f00e4eef1edadfb429ad38b',
    calendarIcon: '4b107655a1c634462518b1d88aec458f78e8d9b4',
    dateFieldGap: 'Existing npveProblemEdit_textFieldNoEndAdornment applies. Use the established named GAP wrapper around live Text field and Icon/Calendar instances; do not draw a field or icon.'
  },
  proposedBuild: [
    'Create one local Facility Stay edit-form component using live library controls and canonical 16px major spacing.',
    'Reuse the existing Hospitalizations/Facility Stay tabs with Facility Stay selected.',
    'Compose the full unclipped form into the shared content-driven Sidesheet with all three footer actions.',
    'Create a frozen 2x reference, transparent rebuild helper, plain-language change log, and sole comparison instance.',
    'Verify all standing batch rules and save native-resolution evidence.'
  ],
  stopCondition: 'Stopped before target mutation because the form-surface colour has no exact library token and choosing its treatment is a design decision.',
  findings: { GAP: 1, DEFECT: 1, DECISION: 1 },
  existingGapReused: ['npveProblemEdit_textFieldNoEndAdornment'],
  flagsAdded: flags.map(flag => flag.id),
  flagsBefore: 231,
  flagsAfter: s.flags.length,
  figmaMutations: [],
  createdNodes: {},
  verification: {
    targetIdentity: 'PASS — fdCQVFdvOByaOYIJYag0d6 has Cover, Templates 3:2, Screens 27:2, and Archive.',
    sourceIdentity: 'PASS — zVsuhYehoSLLq880qRBFkq page 21:321 is ⚙️ Components; source 648:1603 exists.',
    sourceScreenshot: 'figma-export/npve-external-care-facility-stay-2026-09-05/source-audit-648-1603.png',
    formScreenshot: 'figma-export/npve-external-care-facility-stay-2026-09-05/source-form-card-648-1658.png'
  },
  decisionNeeded: 'Choose the form-card surface: recommended NPVE-local form-surface token #EEF7F9; alternatively paper white or color/core/100 #E9EFEE.'
};

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('recorded', ID, 'flags', s.flags.length);
