// Opens record backupPolicyB_2026-09-08: the operator's decision on the backup policy raised in
// schemasplit_phase8_2026-09-08 step 5. Takes the last old-style full backup first, because standing rule 7
// stands until this record changes it. Repo-only; no Figma writes. Closed by finalize-backup-policy-b-2026-09-08.js.
const fs = require('fs');
const store = require('./scripts/schema/lib');

const ID = 'backupPolicyB_2026-09-08';
const PREVIOUS = 'schemasplit_phase8_2026-09-08';
const DIR = 'figma-export/backup-policy-b-2026-09-08';
const BACKUP = 'design-system-schema.backup-2026-09-08-pre-backup-policy-b.json';
if (!fs.existsSync(BACKUP)) fs.copyFileSync('design-system-schema.json', BACKUP);
fs.mkdirSync(DIR, { recursive: true });

const decision = {
  by: 'Daniel (operator)',
  date: '2026-09-08',
  quote: 'Backup policy B: immutable records, git, and milestone tags — milestones at each workstream close or weekly, whichever comes first.',
  relayedIn: 'operator message in the Phase 8 session, 2026-09-08 (after the schemasplit report)',
  decides: 'schemasplit_phase8_2026-09-08.step5_backupPolicy option B',
  changesStandingRule: 'agent rule 7 (workflow/rules.json) and the CLAUDE.md Recording section; standing rules 1-15 in CLAUDE.md are untouched'
};

const body = {
  _status: 'IN PROGRESS — decision recorded; rule text, tooling, docs and the first milestone tag pending.',
  date: '2026-09-08',
  workstream: 'Workflow / backup policy',
  executor: 'Claude (Anthropic claude-fable-5-1)',
  recordGate: `${PREVIOUS} recorded DONE in indexes/record-index.json — passed`,
  report: `${DIR}/report.md`,
  operatorDecision: decision,
  lastOldStyleBackup: { path: BACKUP, sha256: store.sha256(fs.readFileSync(BACKUP)), note: 'taken because rule 7 as it stood required it; the last per-batch copy of the aggregate' },
  policy: {
    backup: 'The committed record files (immutable once DONE; validate-split refuses a changed DONE record and any removed record or flag) plus git history.',
    milestones: 'Annotated tags milestone/<YYYY-MM-DD>-<reason>, created by node scripts/schema/milestone.js "<reason>" on a clean, validated, committed tree, at each workstream close or weekly, whichever comes first.',
    enforcement: 'validate-split.js fails when no milestone tag exists or the latest is older than seven days; validate-workflow, finish-batch and the contract validator inherit the check. The remedy is one command on a committed tree.',
    perBatchBackup: 'No longer taken. The 90 historical design-system-schema.backup-*.json files stay as history (additive only).'
  },
  findings: { GAP: 0, DEFECT: 0, DECISION: 0, PROCESS: 0 },
  flagsBefore: { active: 227, resolved: 58, total: 285 },
  flagsAfter: null,
  flagsAdded: [],
  figmaMutations: []
};

const file = store.openRecord({ id: ID, previous: PREVIOUS, workstream: 'workflow', date: '2026-09-08', createdBy: body.executor, script: 'apply-backup-policy-b-2026-09-08.js', body });
console.log('recorded', ID, 'at', file, '| last old-style backup', BACKUP);
