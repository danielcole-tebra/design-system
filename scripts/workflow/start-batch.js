const fs = require('fs');
const path = require('path');
const { ROOT, GENERATED_FILES, changedFiles, matchesAny, fileDigest, jsonDigest, manifestRiskPayload, readStoreRecord, store, writeJson } = require('./lib');
const { fileState } = require('./workspace-baseline');
const { validateContract } = require('./validate-contract');
const { validateManifest } = require('./validate-manifest');
const { executionPath, validateExecution } = require('./validate-execution');
const { describe, validateBatchFiles } = require('./batch-files');

// Usage: node scripts/workflow/start-batch.js <item-id> <executor> [provider] [model] [reasoning] [--confirm="<verbatim operator confirmation>"]
// --confirm is required when the item's risk tier is not approved; it records the operator's per-item confirmation in the run.
const rawArgs = process.argv.slice(2);
const confirmArg = rawArgs.find((arg) => arg.startsWith('--confirm='));
const positional = rawArgs.filter((arg) => !arg.startsWith('--'));
const [itemId, executor, provider = null, model = null, reasoning = null] = positional;
if (!itemId || !executor) throw new Error('Usage: node scripts/workflow/start-batch.js <item-id> <executor> [provider] [model] [reasoning] [--confirm="<operator quote>"]');
validateContract();
const manifest = validateManifest();
const item = manifest.items.find((candidate) => candidate.id === itemId);
if (!item) throw new Error(`Unknown manifest item: ${itemId}`);
if (item.status !== 'queued') throw new Error(`${itemId} is ${item.status}, not queued`);
if (item.risk.tier === 'human-decision') throw new Error(`${itemId} is a human-decision item: present the options to the operator and stop; it starts only after the operator re-tiers it`);
for (const dependency of item.dependsOn || []) {
  const required = manifest.items.find((candidate) => candidate.id === dependency);
  if (!required || required.status !== 'complete') throw new Error(`Dependency gate failed: ${dependency} is not complete`);
}

const approval = item.risk.approval || {};
let perItemConfirmation = null;
if (approval.status !== 'approved') {
  const quote = confirmArg ? confirmArg.slice('--confirm='.length).trim() : '';
  if (!quote) throw new Error(`Risk gate failed: ${itemId} tier ${item.risk.tier} is not operator-approved. Pass --confirm="<verbatim operator message confirming this item>" or have the operator approve the tier with lock-risk.js.`);
  perItemConfirmation = { quote, recordedAt: new Date().toISOString(), recordedBy: executor };
}

// Record gate: the item's own record must exist as a file in the store and be IN PROGRESS.
const { store: loaded, env, record } = readStoreRecord(item.expectedRecordId);
if (!record || !String(record._status || record.status).startsWith('IN PROGRESS')) {
  throw new Error(`Record gate failed: ${item.expectedRecordId} must exist under records/ and be IN PROGRESS before batch start`);
}

// Plan gate: the planner's phase checklist sits beside the report before execution starts (record workflow_planInventory_2026-09-12).
const files = validateBatchFiles({ record, recordId: item.expectedRecordId, item, date: env.date, stage: 'open' });
if (files.errors.length) throw new Error(`Batch files gate failed at start:\n- ${files.errors.join('\n- ')}`);

const runPath = `.workflow-runs/${itemId}.json`;
if (fs.existsSync(path.resolve(ROOT, runPath))) throw new Error(`Active run already exists: ${runPath}`);
// New runs carry a portable preflight checkpoint. Historical runs remain version 2.
validateExecution(item, 'ready');
const run = {
  format: 'tebra.design-work-run',
  version: 3,
  executionEvidence: executionPath(item),
  // Preserve unrelated dirty files; unchanged baseline files are not batch changes at finish.
  preexistingFiles: Object.fromEntries(changedFiles().filter(file => ![...GENERATED_FILES, store.PATHS.flagsActive, store.PATHS.flagsResolved, env.file].includes(file) && !matchesAny(file, item.allowedFiles)).map(file => [file, fileState(file)])),
  itemId,
  expectedRecordId: item.expectedRecordId,
  recordPath: env.file,
  startedAt: new Date().toISOString(),
  executor,
  provenance: { provider, model, reasoning },
  riskApproval: approval.status || 'unapproved',
  perItemConfirmation,
  schemaSha256: fileDigest('design-system-schema.json'),
  // Everything the batch does not own: foundation, every other record, every flag. Concurrent appends by
  // other batches are allowed; any change to something present here is caught by check-batch and finish-batch.
  storeFingerprint: store.fingerprint(loaded, item.expectedRecordId),
  plannerRiskSha256: jsonDigest(manifestRiskPayload(item)),
  allowedFiles: item.allowedFiles,
  requiredEvidence: item.requiredEvidence,
  status: 'active'
};
writeJson(runPath, run);
if (perItemConfirmation) {
  item.perItemConfirmations = [...(item.perItemConfirmations || []), perItemConfirmation];
  writeJson('workflow/manifest.json', manifest);
}
console.log(`batch started ${itemId}; record ${env.file}; guard ${run.storeFingerprint.foundation.slice(0, 12)} over ${Object.keys(run.storeFingerprint.records).length} records + ${Object.keys(run.storeFingerprint.flags).length} flags; risk ${item.risk.tier} (${run.riskApproval}${perItemConfirmation ? ', per-item confirmation recorded' : ''}); batch files ${describe(files)}`);
