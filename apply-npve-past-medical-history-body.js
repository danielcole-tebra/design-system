// Records the bounded PMHx body/sidesheet pilot before any target mutation.
const fs = require('fs');

const P = './design-system-schema.json';
const BACKUP = './design-system-schema.backup-2026-09-08-pre-npve-past-medical-history-body.json';
const ID = 'npveRebuild_pastMedicalHistoryBody_2026-09-08';
const PREVIOUS = 'npveRebuild_pastMedicalHistorySection_2026-09-08';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s[ID]) throw new Error(`${ID} already exists`);
if (!String(s[PREVIOUS]?._status || '').startsWith('DONE')) throw new Error(`Record gate failed: ${PREVIOUS} is not DONE`);
if (!fs.existsSync(BACKUP)) fs.copyFileSync(P, BACKUP);

s[ID] = {
  _status: 'IN PROGRESS — operator-approved medium-risk pilot item; target not yet mutated.',
  date: '2026-09-08',
  workstream: 'NPVE Rebuild / Sidesheets',
  manifestItem: 'pilot-pmhx-body-sheet',
  risk: { tier: 'medium', assignedBy: 'Cole (operator)', oversight: 'Dedicated full-sheet comparison and operator review before later work.' },
  report: 'figma-export/npve-past-medical-history-body-2026-09-08/report.md',
  recordGate: `${PREVIOUS} recorded DONE — passed`,
  source: { file: 'zVsuhYehoSLLq880qRBFkq', page: '21:321', node: '129:9205 Page=Clin_PMHx', policy: 'read only; frozen export in this batch' },
  target: { file: 'fdCQVFdvOByaOYIJYag0d6', templatesPage: '3:2', screensPage: '27:2' },
  scope: 'Build one reusable 518px Past Medical History body from approved section instances and the published multiline Text field; append only its key to the shared Sidesheet Body content preferred values; create one content-driven live sheet and one full comparison.',
  sourceFacts: [
    'The source sheet is 550x600 with a 518x354 body containing HEAD/Trauma, EYES/Blindness+Cataracts, CUSTOM ITEMS/Add custom item, and a Comments field.',
    'Source sections are separated by 16px; source heading-to-row spacing is 0px and source rows are 32px.',
    'The source Comments field is 518x110 inside a 118px wrapper and shows Comments go here.',
    'The source footer labels are Save & Add to Note and Save.'
  ],
  systemMapping: {
    conditionRow: '518:5797 Past medical history condition row',
    section: '534:5805 Past medical history section',
    textField: '7c3c99bb9a9392d6571c0557b41d142b8987b566 Text field; small/default/filled with multiline=true',
    sidesheet: '6:65 Sidesheet Placement=Floating',
    comparison: '35:332 Rebuild comparison',
    changeLogRow: '18:103 Change log row'
  },
  lockedGeometry: {
    body: '518x388; three live section instances + published 518x88 multiline Text field; 16px between body children',
    sections: 'one-row groups 518x70 through a nested visibility override; Eyes remains approved 518x112',
    sheet: '550x564 content-driven; Header 72 + divider 1 + Body region 420 (16+388+16) + Footer 71'
  },
  sourceBackedDifferences: [
    'Legacy 32px rows become approved 42px touch-target rows.',
    'Heading-to-row spacing becomes the approved 8px tight relationship.',
    'Header/body/footer geometry follows the canonical NPVE Sidesheet contract instead of the legacy fixed 600px scaffold.',
    'Comments uses the published small multiline Text field at 88px instead of the detached 110px source field.'
  ],
  plan: [
    'Create and validate one 518px body component before touching the shared Sidesheet.',
    'Append only the new body key to Body content preferred values; preserve the default and every shared geometry value.',
    'Create one live content-driven Sidesheet with source labels and one frozen reference/rebuild/change comparison.',
    'Run all standing rules, save evidence, finalize the record, and stop for operator review.'
  ],
  stopCondition: 'Stop on dependency mismatch, missing published mapping, shared default or geometry change, inability to keep the footer immediately after content, or any deterministic or visual failure.',
  findings: { GAP: 0, DEFECT: 0, DECISION: 0 },
  flagsBefore: s.flags.length,
  flagsAfter: s.flags.length,
  flagsAdded: [],
  figmaMutations: [],
  createdNodes: {},
  verification: {}
};

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('recorded', ID, 'flags', s.flags.length, 'backup', BACKUP);
