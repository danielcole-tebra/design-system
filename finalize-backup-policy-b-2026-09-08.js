// Finalizes backupPolicyB_2026-09-08 after the rule text, tooling and docs changed. The first milestone tag is
// created after the commit that carries this record (a tag must point at a committed tree). No Figma writes.
const store = require('./scripts/schema/lib');

const ID = 'backupPolicyB_2026-09-08';
store.finalizeRecord(ID, (r, loaded) => {
  r._status = 'DONE. Backup policy B adopted on the operator\'s decision: the backup is the immutable, committed record files plus milestone tags at each workstream close or weekly, whichever comes first. Agent rule 7 amended, milestone tooling and weekly check added, docs updated; the last old-style backup was taken before the change. The first milestone tag follows the commit carrying this record.';
  r.changes = {
    rules: 'workflow/rules.json agentRules 7 text and note (sourceRecord adds this record); recordGate untouched',
    tooling: 'scripts/schema/milestone.js (create a milestone/<date>-<slug> annotated tag on a clean validated tree; --status); scripts/schema/validate-split.js fails when the latest milestone is missing or older than seven days (skipMilestone only while creating one); workflow/check-catalog.json gains the milestone check',
    contract: 'recordStore.backupPolicy line and the final operating-loop step (milestone at workstream close or weekly)',
    docs: 'CLAUDE.md Recording, OPERATORS.md commit line, workflow/README.md commands',
    applyScriptConvention: 'apply-*.js no longer copies the aggregate; openRecord is the first write. Historical backup files remain untouched.'
  };
  r.firstMilestone = 'milestone/2026-09-08-backup-policy-b-adopted, created on the commit carrying this record (workflow workstream close for the schema split and policy batches); hash in the report';
  r.findings = { GAP: 0, DEFECT: 0, DECISION: 0, PROCESS: 0 };
  r.flagsAfter = { active: loaded.flags.active.entries.length, resolved: loaded.flags.resolved.entries.length, total: loaded.flags.active.entries.length + loaded.flags.resolved.entries.length };
  r.screenshots = [];
  r.screenshotsNote = 'Repo-only batch; no render to inspect.';
  return r;
});
console.log('finalized', ID);
