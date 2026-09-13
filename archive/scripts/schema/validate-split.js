// Validates the append-only record store: structure, freshness of the generated files, and immutability of
// records against the last committed index. Usage: node scripts/schema/validate-split.js
const { PATHS, checkFreshness, generate, gitShow, isInProgress, loadStore } = require('./lib');

function validateSplit({ skipMilestone = false } = {}) {
  const store = loadStore(); // throws on structural inconsistency
  const generated = generate(store);
  const errors = [];
  const stale = checkFreshness(generated);
  if (stale.length) errors.push(`generated files are stale: ${stale.join(', ')} (run node scripts/schema/build-aggregate.js)`);

  // Immutability: any record that was not IN PROGRESS in the committed index must be unchanged now.
  const committedText = gitShow('HEAD', PATHS.recordIndex);
  let immutabilityChecked = 0;
  if (committedText) {
    const committed = JSON.parse(committedText);
    const now = new Map(generated.recordIndex.records.map((entry) => [entry.id, entry]));
    for (const entry of committed.records) {
      const current = now.get(entry.id);
      if (!current) { errors.push(`record ${entry.id} is in the committed index but missing from the store (records are never deleted)`); continue; }
      if (entry.status.startsWith('IN PROGRESS')) continue;
      immutabilityChecked += 1;
      if (current.recordSha256 !== entry.recordSha256) errors.push(`record ${entry.id} changed after it was committed as ${entry.status.slice(0, 30)} (records are immutable once written)`);
    }
    const committedFlagIds = new Set([...committed.flags.activeIds, ...committed.flags.resolvedIds]);
    const currentFlagIds = new Set([...generated.recordIndex.flags.activeIds, ...generated.recordIndex.flags.resolvedIds]);
    for (const id of committedFlagIds) if (!currentFlagIds.has(id)) errors.push(`flag ${id} is in the committed index but missing from the store (flags are never deleted)`);
    if (generated.recordIndex.records.length < committed.records.length) errors.push('record count went down');
  }
  // Backup policy B (record backupPolicyB_2026-09-08): a milestone tag must exist and be at most a week old.
  let milestone = null;
  if (!skipMilestone) {
    milestone = require('./milestone').milestoneStatus();
    if (milestone.overdue) errors.push(`milestone overdue: ${milestone.reason}; run node scripts/schema/milestone.js "<reason>" on a clean, committed tree`);
  }
  const inProgress = store.records.filter((env) => isInProgress(env.record)).map((env) => env.id);
  if (errors.length) throw new Error(`Record store validation failed:\n- ${errors.join('\n- ')}`);
  return { store, generated, immutabilityChecked, inProgress, milestone, committedIndexPresent: Boolean(committedText) };
}

if (require.main === module) {
  const result = validateSplit();
  const { recordIndex, currentState } = result.generated;
  console.log(`store PASS records=${recordIndex.counts.records} flags=${recordIndex.flags.active}+${recordIndex.flags.resolved} aggregate=${currentState.aggregate.sha256.slice(0, 12)} fresh immutable=${result.immutabilityChecked}${result.committedIndexPresent ? '' : ' (no committed index yet)'}${result.inProgress.length ? ` inProgress=${result.inProgress.join(',')}` : ''}${result.milestone?.latest ? ` milestone=${result.milestone.latest.name} (${result.milestone.ageDays}d)` : ''}`);
}

module.exports = { validateSplit };
