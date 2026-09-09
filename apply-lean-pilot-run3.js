// Opens record leanPilot_run3_2026-09-08 for pilot2-procedures-edit (lean pilot run 3, item 2 of the combined
// runs 2-3 batch, re-pointed at its own record when item 1 closed). Backup first. No Figma writes.
const fs = require('fs');
const P = './design-system-schema.json';
const BACKUP = './design-system-schema.backup-2026-09-08-pre-lean-pilot-run3.json';
const ID = 'leanPilot_run3_2026-09-08';
const PREVIOUS = 'leanPilot_run2-3_2026-09-08';
const DIR = 'figma-export/lean-pilot-run2-3-2026-09-08';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s[ID]) throw new Error(`${ID} already exists`);
if (!String(s[PREVIOUS]._status || '').startsWith('DONE')) throw new Error(`Record gate failed: ${PREVIOUS} is not DONE`);
if (!fs.existsSync(BACKUP)) fs.copyFileSync(P, BACKUP);
const m = JSON.parse(fs.readFileSync('./workflow/manifest.json', 'utf8'));
const item = m.items.find((i) => i.id === 'pilot2-procedures-edit');
if (!item || item.risk.approval.status !== 'approved') throw new Error('pilot2-procedures-edit tier is not approved');
s[ID] = {
  _status: 'IN PROGRESS — pilot2-procedures-edit (medium, approved) opened; preflight and build to follow. Target not yet mutated.',
  date: '2026-09-09',
  workstream: 'NPVE Rebuild / Sidesheets — lean pilot run 3 (item 2 of the combined runs 2-3 batch)',
  manifestItem: 'pilot2-procedures-edit',
  executor: 'Claude (Anthropic claude-fable-5-1)',
  risk: { tier: 'medium', oversight: item.oversight.join('; '), proposedBy: item.risk.proposedBy, approval: item.risk.approval },
  recordGate: `${PREVIOUS} recorded DONE — passed; contract freshness validated (validate-workflow PASS) before reading`,
  report: `${DIR}/report.md`,
  source: { file: 'zVsuhYehoSLLq880qRBFkq', node: '129:8651 Page=ClinProSH_Edit', policy: 'read only; one 2x export via download_assets' },
  target: { file: 'fdCQVFdvOByaOYIJYag0d6', templatesPage: '3:2', screensPage: '27:2' },
  library: 'YX2n4YLrEpBXNbcc73T6dw read only',
  scope: item.scope,
  stopCondition: item.stopCondition,
  findings: { GAP: 0, DEFECT: 0, DECISION: 0 },
  flagsBefore: s.flags.length,
  flagsAfter: s.flags.length,
  flagsAdded: [],
  figmaMutations: []
};
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('recorded', ID, '| backup', BACKUP);
