// Opens the bounded External Care History — Hospitalizations Sidesheet rebuild batch.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_externalCareHospitalizations_2026-09-05';
const PREVIOUS = 'npveRebuild_allergiesComparisonHeightCorrection_2026-09-05';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));

if (s[ID]) throw new Error(`${ID} already exists`);
const previous = s[PREVIOUS];
if (!previous || !String(previous._status).startsWith('DONE')) {
  throw new Error('Record gate failed: Allergies comparison correction is not recorded DONE');
}

s[ID] = {
  _status: 'IN PROGRESS. External Care History — Hospitalizations discovery complete; target mutation not started.',
  date: '2026-09-05',
  workstream: 'NPVE Rebuild / Sidesheets',
  report: 'figma-export/npve-external-care-hospitalizations-2026-09-05/report.md',
  recordGate: `${PREVIOUS} recorded DONE — passed`,
  source: {
    file: 'zVsuhYehoSLLq880qRBFkq',
    page: '21:321',
    node: '129:8316 Page=Clin_ExternalCare-Hospitalizations',
    policy: 'read only; frozen source export in this batch'
  },
  target: {
    file: 'fdCQVFdvOByaOYIJYag0d6',
    templatesPage: '3:2',
    screensPage: '27:2',
    sharedSidesheet: '279:2446',
    floatingVariant: '6:65',
    rebuildComparison: '35:332',
    changeLogRow: '18:103'
  },
  scope: 'Create one reusable External care event card and one Hospitalizations body; compose one live shared Sidesheet with the existing two-action footer; create one frozen reference, one transparent rebuild helper, one Change log helper, and one sole comparison instance. Preserve source, library, global tokens, shared masters/defaults, and every prior screen.',
  buildPlan: [
    'Create an External care event card with editable facility name and two live small outlined Chip instances.',
    'Create a Hospitalizations body with live Tabs/Tab, Divider, contained-primary Button with PlusOutlined, and event-card instances.',
    'Compose a content-driven Floating Sidesheet titled External Care History, showing Save & Add to Note and Save.',
    'Create transparent rebuild helper plus frozen reference and Change log helpers, then place the sole comparison on Screens.',
    'Export and inspect component, body, Sidesheet, and comparison renders; run all standing batch rules.'
  ],
  spacingPolicy: 'Canonical base 8: 16px body and card padding and 16px major vertical gaps; 8px between related card title and metadata and between Chips. Source 12px card padding, 12px body gap, and compact 28px tabs are normalized and recorded.',
  reuseBaseline: {
    codeConnect: 'No *.figma.* mappings exist for the required controls.',
    library: 'Design System Rebuild is the sole subscribed library.',
    button: '820871c5281ccd91813587a508771cc439f38b93',
    selectedTab: 'eea2fd71083e80e919a40226f98850fac8090508',
    unselectedTab: 'b5fadfbc89f4a8ab6a18606ab7228d0dd2b42d2e',
    divider: '0143de7b0529ee6fed9d0c163eeab7571480bc67',
    chip: 'e5db0e4b69da285f4e36a3278a38d84208cf2617',
    cardFinding: 'Published Card dfc9b7d6ef4ab82cce27c1aa11cc1ba31f0825a5 has no arbitrary-content or content-swap property; use a source-specific local component, matching the established Allergies and Family History pattern.'
  },
  discoveries: [
    'Source 129:8316 is a visible 550x600 screen with a 64px header, compact two-tab strip, Create New Event action, one 518x74 event card, and a 60px two-action footer.',
    'The source card is 12px padded with a 16/20 title and two 12/16 metadata pills. The rebuild uses 16px padding, canonical 16/24 body typography, and live 24px small Chip instances.',
    'Flowsheets 939:9228 was audited but deferred because its four-action row introduces an unresolved chart/action-icon mapping. External Care Hospitalizations has no such unresolved dependency.',
    'The product font is Akkurat LL, matching both source and existing target components.'
  ],
  stopCondition: 'Stop before target mutation if a required dependency is absent or if exact source evidence introduces a new design decision. Otherwise stop after one component/body/Sidesheet/comparison set passes structural, paint, whole-pixel, font, live-instance, and screenshot verification and is recorded.',
  figmaMutations: [],
  createdNodes: {},
  verification: {},
  findings: { GAP: 0, DEFECT: 0, DECISION: 0 },
  flagsAdded: [],
  nextBatch: 'Not started.'
};

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('opened', ID, 'flags', Array.isArray(s.flags) ? s.flags.length : 'n/a');

