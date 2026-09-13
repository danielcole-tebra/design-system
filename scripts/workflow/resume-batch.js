// Resumes a stopped work item in a fresh session (standing rule 16; record workflow_flowsheetsResume_2026-09-12).
//
// Usage: node scripts/workflow/resume-batch.js <item-id> <executor> [provider] [model] [reasoning] --confirm="<the operator's verbatim go-ahead>"
//
// Refuses unless the manifest item and its run are both stopped, the item's record is IN PROGRESS, execution.json is
// valid at ready (so an unresolved failure or an unverified mapping stops the resume), the planner's risk lock is
// unchanged, every dependency is complete, no immutable record changed since the batch started, and the operator's
// go-ahead is quoted. Nothing is written until every check has passed. Then, in this order:
//   1. the record is checkpointed through scripts/schema/record-scripts.js quoting the operator (RESUMED, still
//      IN PROGRESS; the ceiling, placeholder and batch-files checks apply);
//   2. the run goes active with the store fingerprint and the pre-existing-files baseline refreshed and the resume
//      appended, listing what other batches appended since the start; the stop stays on the resume entry;
//   3. the item returns to the status an active run shows today (queued: start-batch leaves it there, only
//      stop-batch and finish-batch change it), its stop kept on the item's resume history;
//   4. the contract is regenerated, because the checkpoint changed the store.
// The batch-files gate runs at open and its line is reported; a record dated before workflow/check-catalog.json →
// batchFiles.appliesFrom is noted, not refused.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const { GENERATED_FILES, ROOT, changedFiles, jsonDigest, manifestRiskPayload, matchesAny, store } = require('./lib');
const { fileState } = require('./workspace-baseline');
const { validateContract } = require('./validate-contract');
const { validateManifestData } = require('./validate-manifest');
const { executionPath, validateExecutionData } = require('./validate-execution');
const { describe, validateBatchFiles } = require('./batch-files');
const { checkpoint } = require('../schema/record-scripts');

const USAGE = 'Usage: node scripts/workflow/resume-batch.js <item-id> <executor> [provider] [model] [reasoning] --confirm="<the operator\'s verbatim go-ahead>"';
// What an active run's item shows today: start-batch leaves a queued item queued; only stop-batch and finish-batch change it.
const ACTIVE_ITEM_STATUS = 'queued';

function need(ok, message) { if (!ok) throw new Error(message); }
const readJson = (root, file) => JSON.parse(fs.readFileSync(path.resolve(root, file), 'utf8'));
function writeJson(root, file, value) {
  const target = path.resolve(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`);
}
const digest = (root, file) => crypto.createHash('sha256').update(fs.readFileSync(path.resolve(root, file))).digest('hex');

// deps: root (the workflow root; the store root is scripts/schema/lib.js's, the same directory outside a self-test),
// now, contract (validateContract), changed (changedFiles), regenerateContract.
function resumeBatch({ itemId, executor, quote, provider = null, model = null, reasoning = null }, deps = {}) {
  const { root = ROOT, now = () => new Date().toISOString(), contract = validateContract, changed = changedFiles, regenerateContract = true } = deps;
  need(itemId && executor, USAGE);
  const goAhead = typeof quote === 'string' ? quote.trim() : '';
  need(goAhead, `Resume gate failed: pass --confirm="<the operator's verbatim go-ahead for resuming ${itemId}>"`);
  contract();
  const manifest = validateManifestData(readJson(root, 'workflow/manifest.json'));
  const item = manifest.items.find((candidate) => candidate.id === itemId);
  need(item, `Unknown manifest item: ${itemId}`);
  need(item.status === 'stopped', `${itemId} is ${item.status}, not stopped; resume-batch resumes a stopped item only`);
  need(item.risk.tier !== 'human-decision', `${itemId} is a human-decision item: it resumes only after the operator re-tiers it`);
  for (const dependency of item.dependsOn || []) {
    const required = manifest.items.find((candidate) => candidate.id === dependency);
    need(required && required.status === 'complete', `Dependency gate failed: ${dependency} is not complete`);
  }
  const runPath = `.workflow-runs/${itemId}.json`;
  need(fs.existsSync(path.resolve(root, runPath)), `No run to resume: ${runPath} is missing (a stopped item keeps the run its stop-batch wrote)`);
  const run = readJson(root, runPath);
  need(run.version >= 3 && run.storeFingerprint, `${runPath} predates the version-3 run format and cannot be resumed`);
  need(run.status === 'stopped', `${runPath} is ${run.status}, not stopped`);
  need(run.itemId === itemId && run.expectedRecordId === item.expectedRecordId, `${runPath} does not belong to ${itemId} / ${item.expectedRecordId}`);
  need(jsonDigest(manifestRiskPayload(item)) === run.plannerRiskSha256, 'Planner-owned risk/scope fields changed since the batch started; resume refused');
  // Record gate: the item's own record is a store file and IN PROGRESS.
  const loaded = store.loadStore();
  const env = store.findRecord(loaded, item.expectedRecordId);
  need(env && store.isInProgress(env.record), `Record gate failed: ${item.expectedRecordId} must exist under records/ and be IN PROGRESS to resume`);
  // Portable checkpoint, valid at ready.
  const execution = validateExecutionData(readJson(root, executionPath(item)), item, { root, stage: 'ready' });
  // Batch files gate at open: refused for a record dated on or after appliesFrom, noted before it.
  const files = validateBatchFiles({ record: env.record, recordId: item.expectedRecordId, item, date: env.date, stage: 'open' });
  need(!files.errors.length, `Batch files gate failed at resume:\n- ${files.errors.join('\n- ')}`);
  // What the store did while the batch was stopped: other batches may append, and may checkpoint their own records
  // while those are IN PROGRESS; a record that has left IN PROGRESS, or one that disappeared, may not change.
  const guard = store.compareFingerprint(run.storeFingerprint, loaded, item.expectedRecordId);
  const recordChanges = guard.errors.filter((error) => {
    const m = /^record (\S+) (changed|disappeared)/.exec(error);
    if (!m) return false;
    if (m[2] === 'disappeared') return true;
    const other = store.findRecord(loaded, m[1]);
    return !(other && store.isInProgress(other.record));
  });
  need(!recordChanges.length, `Immutable records changed since the batch started:\n- ${recordChanges.join('\n- ')}`);

  const at = now();
  const stop = { stoppedAt: run.stoppedAt || item.stoppedAt || null, stopReason: run.stopReason || item.stopReason || null };
  const previousStatus = store.recordStatus(env.record);
  // 1. The record, through the templated checkpoint.
  const recordFile = checkpoint(item.expectedRecordId, (record) => ({
    ...record,
    _status: `IN PROGRESS — RESUMED ${at.slice(0, 10)} (${previousStatus.replace(/^IN PROGRESS\s*[—-]?\s*/, '')})`,
    resumes: [...(record.resumes || []), { at, executor, operatorResumeQuote: goAhead, run: runPath, ...stop, appendedSinceStart: guard.additions, changedSinceStart: guard.errors, executionNextAction: execution.nextAction }]
  })).file;
  // 2. The run: active, guard and baseline refreshed, the resume appended.
  const reloaded = store.loadStore();
  const excluded = [...GENERATED_FILES, store.PATHS.flagsActive, store.PATHS.flagsResolved, env.file];
  run.preexistingFiles = Object.fromEntries(changed().filter((file) => !excluded.includes(file) && !matchesAny(file, item.allowedFiles)).map((file) => [file, fileState(file, root)]));
  run.storeFingerprint = store.fingerprint(reloaded, item.expectedRecordId);
  run.schemaSha256 = digest(root, 'design-system-schema.json');
  run.status = 'active';
  run.resumedAt = at;
  run.resumes = [...(run.resumes || []), { at, executor, provenance: { provider, model, reasoning }, confirmation: { quote: goAhead, recordedAt: at, recordedBy: executor }, ...stop, appendedSinceStart: guard.additions, changedSinceStart: guard.errors, recordCheckpoint: recordFile }];
  delete run.stoppedAt;
  delete run.stopReason;
  writeJson(root, runPath, run);
  // 3. The item: back to the status an active run shows; the stop kept on its resume history.
  item.resumes = [...(item.resumes || []), { at, executor, quote: goAhead, ...stop }];
  item.status = ACTIVE_ITEM_STATUS;
  delete item.stoppedAt;
  delete item.stopReason;
  writeJson(root, 'workflow/manifest.json', manifest);
  // 4. The checkpoint changed the store, so the contract's digests are stale until regenerated.
  if (regenerateContract) execFileSync(process.execPath, ['scripts/workflow/generate-contract.js'], { cwd: root, stdio: 'pipe' });
  return {
    itemId, at, runPath, recordFile, previousStatus, stop, files,
    appendedSinceStart: guard.additions, changedSinceStart: guard.errors,
    fingerprint: run.storeFingerprint, preexistingFiles: Object.keys(run.preexistingFiles), contractRegenerated: regenerateContract
  };
}

function summary(r) {
  const appended = [...r.appendedSinceStart.records.map((id) => `record ${id}`), ...r.appendedSinceStart.flags.map((id) => `flag ${id}`)];
  return `batch resumed ${r.itemId}; record ${r.recordFile} checkpointed RESUMED (was ${r.previousStatus.slice(0, 80)}); run active since ${r.at} (stopped ${r.stop.stoppedAt}: ${r.stop.stopReason}); guard refreshed ${r.fingerprint.foundation.slice(0, 12)} over ${Object.keys(r.fingerprint.records).length} records + ${Object.keys(r.fingerprint.flags).length} flags; appended since start: ${appended.join(', ') || 'nothing'}${r.changedSinceStart.length ? `; changed since start: ${r.changedSinceStart.join('; ')}` : ''}; baseline ${r.preexistingFiles.length} pre-existing file(s); batch files ${describe(r.files)}${r.contractRegenerated ? '; contract regenerated' : ''}`;
}

if (require.main === module) {
  const raw = process.argv.slice(2);
  const confirmArg = raw.find((arg) => arg.startsWith('--confirm='));
  const positional = raw.filter((arg) => !arg.startsWith('--'));
  const [itemId, executor, provider = null, model = null, reasoning = null] = positional;
  const result = resumeBatch({ itemId, executor, provider, model, reasoning, quote: confirmArg ? confirmArg.slice('--confirm='.length) : '' });
  console.log(summary(result));
}

module.exports = { ACTIVE_ITEM_STATUS, USAGE, resumeBatch, summary };
