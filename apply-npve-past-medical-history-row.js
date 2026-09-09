// Records the bounded PMHx condition-row pilot before any target mutation.
const fs = require('fs');

const P = './design-system-schema.json';
const BACKUP = './design-system-schema.backup-2026-09-08-pre-npve-past-medical-history-row.json';
const ID = 'npveRebuild_pastMedicalHistoryRow_2026-09-08';
const PREVIOUS = 'npveRebuild_noteHeaderLayout_2026-09-08';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s[ID]) throw new Error(`${ID} already exists`);
if (!String(s[PREVIOUS]?._status || '').startsWith('DONE')) throw new Error(`Record gate failed: ${PREVIOUS} is not DONE`);
if (!fs.existsSync(BACKUP)) fs.copyFileSync(P, BACKUP);

s[ID] = {
  _status: 'IN PROGRESS — operator-approved low-risk pilot item; target not yet mutated.',
  date: '2026-09-08',
  workstream: 'NPVE Rebuild / Sidesheets',
  manifestItem: 'pilot-pmhx-condition-row',
  risk: { tier: 'low', assignedBy: 'Cole (operator)', oversight: 'Dedicated comparison and operator review before the section item.' },
  report: 'figma-export/npve-past-medical-history-row-2026-09-08/report.md',
  recordGate: `${PREVIOUS} recorded DONE — passed`,
  source: { file: 'zVsuhYehoSLLq880qRBFkq', page: '21:321', node: '129:9306 Trauma row', policy: 'read only; frozen export in this batch' },
  target: { file: 'fdCQVFdvOByaOYIJYag0d6', templatesPage: '3:2', screensPage: '27:2' },
  scope: 'Build one reusable Past Medical History condition row from published Checkbox, Icon button, ChatOutlined, and ChatFilled assets; create one dedicated comparison and change log. No section or body work in this batch.',
  sourceFacts: [
    'The source row is 518x32 with a 24px unchecked Checkbox, 404px label, and 24px comment glyph.',
    'The source visually shows outlined and filled comment states; the filled state appears on Cataracts.',
    'The source uses legacy components; the target must use only the subscribed Design System Rebuild library.'
  ],
  dependencies: {
    checkbox: 'df21c69feaab79790f6c571a45a4d2b7eaf976c7',
    iconButton: '7ebea5d7ce6ecfdaef84d177efa64196f654717d',
    chatOutlined: '6bc407c23e71eb80b9334cde47be426cba738941',
    chatFilled: 'd6feeb4017e9bebc5e3bf526f88c8b2e376be6c5',
    comparison: '35:332',
    changeLogRow: '18:103'
  },
  plan: [
    'Create one 518px local component with a live Checkbox, editable label, and live Icon button whose icon can swap between ChatOutlined and ChatFilled.',
    'Preserve published touch-target geometry; record the resulting row-height difference from the 32px source rather than shrinking controls.',
    'Create frozen reference, live rebuild, and plain-language change-log helpers and one sole comparison on Screens.',
    'Run all ten standing rules, save audit/report/comparison evidence, and stop for operator review.'
  ],
  stopCondition: 'Stop before mutation on source or target identity mismatch, missing published dependency, ambiguous comment state, or inability to preserve published touch targets without a clear recorded difference. Stop after any failed structural or visual validation before the next pilot item.',
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
