const fs = require('fs');
const lib = require('./scripts/schema/lib');

const ID = 'npveRebuild_familyHistoryEdit_2026-09-09';
const DIR = 'figma-export/npve-family-history-edit-2026-09-09';
const audit = JSON.parse(fs.readFileSync(`${DIR}/audit-family-history-edit.json`, 'utf8'));
const execution = JSON.parse(fs.readFileSync(`${DIR}/execution.json`, 'utf8'));
const assert = (ok, message) => { if (!ok) throw new Error(message); };

assert(audit.itemId === 'npve-family-history-edit', 'audit item mismatch');
assert(audit.pageAudit.length === 4 && audit.pageAudit.every(p => p.localFractional === 0), 'page geometry audit failed');
assert(audit.instanceAudit.length === 5 && audit.instanceAudit.every(p => p.equal), 'instance paint audit failed');
assert(Object.values(audit.checks).every(c => c.pass), 'audit check failed');
assert(execution.version === 2 && execution.appearance.review.inspected === true, 'appearance review incomplete');
for (const file of ['report.md', 'comparison-family-history-edit.png', 'form-636-3-final-white.png', 'reference-2x-129-12486.png']) {
  assert(fs.existsSync(`${DIR}/${file}`), `missing ${file}`);
}

lib.finalizeRecord(ID, record => {
  record._status = 'DONE — Family History edit built, cross-model handoff repaired, verified, and shown for operator review.';
  record.executor = 'GitHub Copilot (Z.ai GLM) build; Codex (OpenAI) closeout and repair';
  record.fileIdentity = 'PASS — target fdCQVFdvOByaOYIJYag0d6 with Cover 0:1, Templates 3:2, Screens 27:2, Archive 126:2; source and library read only.';
  record.createdNodes = audit.createdNodes;
  record.figmaMutations = [
    'Built reusable 518x468 Family History edit form and body, complete 550x644 shared Sidesheet, frozen reference, change log, and one comparison.',
    'Bound the six production field roots to color/background/paper while preserving the NPVE Form surface card.',
    'Renamed eight stale Allergies-derived layer names to Family History semantics.',
    'Appended the body and three helpers to shared preferred-value lists only; defaults and master geometry unchanged.'
  ];
  record.findings = { GAP: 1, DEFECT: 1, DECISION: 0, PROCESS: 0, note: 'Existing condition end-adornment GAP and back-control DEFECT reused. Source outlined-Save inconsistency remains reported.' };
  record.standingBatchRules = audit.standingBatchRules;
  record.verification = audit.checks;
  record.appearance = execution.appearance;
  record.screenshots = ['reference-2x-129-12486.png', 'form-636-3-final-white.png', 'comparison-family-history-edit.png'].map(f => `${DIR}/${f}`);
  record.report = `${DIR}/report.md`;
  record.outcome = 'Reusable 518x468 form/body and 550x644 Sidesheet, with white field surfaces, shared swap-menu access, frozen reference, marked GAP/DEFECT, and sole comparison on Screens section 23.';
  record.flagsAfter = lib.mergedFlags(lib.loadStore()).length;
  record.decisionsForOperator = ['Review the final comparison. The Family History source draws Save outlined while the other edit sheets draw it primary; the rebuild preserves the source-specific white bordered appearance and does not generalize it.'];
  return record;
});

console.log('Finalized', ID);
