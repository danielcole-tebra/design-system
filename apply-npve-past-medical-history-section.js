// Records the bounded PMHx section pilot before any target mutation.
const fs = require('fs');

const P = './design-system-schema.json';
const BACKUP = './design-system-schema.backup-2026-09-08-pre-npve-past-medical-history-section.json';
const ID = 'npveRebuild_pastMedicalHistorySection_2026-09-08';
const PREVIOUS = 'npveRebuild_pastMedicalHistoryRow_2026-09-08';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s[ID]) throw new Error(`${ID} already exists`);
if (!String(s[PREVIOUS]?._status || '').startsWith('DONE')) throw new Error(`Record gate failed: ${PREVIOUS} is not DONE`);
if (!fs.existsSync(BACKUP)) fs.copyFileSync(P, BACKUP);

s[ID] = {
  _status: 'IN PROGRESS — operator-approved low-risk pilot item; target not yet mutated.',
  date: '2026-09-08',
  workstream: 'NPVE Rebuild / Sidesheets',
  manifestItem: 'pilot-pmhx-section',
  risk: { tier: 'low', assignedBy: 'Cole (operator)', oversight: 'Dedicated comparison and operator review before the body item.' },
  report: 'figma-export/npve-past-medical-history-section-2026-09-08/report.md',
  recordGate: `${PREVIOUS} recorded DONE — passed`,
  source: { file: 'zVsuhYehoSLLq880qRBFkq', page: '21:321', node: '129:9315 Eyes section', policy: 'read only; frozen export in this batch' },
  target: { file: 'fdCQVFdvOByaOYIJYag0d6', templatesPage: '3:2', screensPage: '27:2' },
  scope: 'Build one reusable Past Medical History section from a bound heading and live instances of the approved condition row; create one dedicated comparison and change log. No body or sidesheet work in this batch.',
  sourceFacts: [
    'The exact source group is 518x84: 20px EYES heading followed by two contiguous 32px legacy rows, Blindness and Cataracts.',
    'The source heading is uppercase, bold 14/20, and teal; Cataracts shows the filled comment state.',
    'The source has 0px between heading and rows; canonical NPVE composition applies an 8px tight relationship.',
    'The approved target row variants are 518x42 and expose Condition plus Comment=Empty/Filled.'
  ],
  dependencies: {
    conditionRow: '518:5797',
    headingStyleDonor: '441:5061',
    comparison: '35:332',
    changeLogRow: '18:103',
    divider: 'e1a369ce1b663c8e203a59c18f522108c62c8e6e'
  },
  plan: [
    'Create one 518px vertical auto-layout component with an editable uppercase heading and two live condition-row instances.',
    'Use 8px between the heading and row list; keep list rows contiguous because each row owns its 42px touch target.',
    'Create frozen reference, live rebuild, and plain-language change-log helpers and one sole comparison on Screens.',
    'Run all ten standing rules, save audit/report/comparison evidence, and stop for operator review.'
  ],
  stopCondition: 'Stop before mutation on source or target identity mismatch, missing approved row dependency, inability to preserve the 8px heading relationship and contiguous touch-target rows, or any new design decision. Stop after any failed structural or visual validation before the body item.',
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
