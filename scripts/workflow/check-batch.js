const fs = require('fs');
const path = require('path');
const { ROOT, jsonDigest, manifestRiskPayload, readJson, store } = require('./lib');
const { validateContract } = require('./validate-contract');
const { validateManifest } = require('./validate-manifest');
const { validateExecution } = require('./validate-execution');
const { describe, validateBatchFiles } = require('./batch-files');

const [itemId] = process.argv.slice(2);
if (!itemId) throw new Error('Usage: node scripts/workflow/check-batch.js <item-id>');
const runPath = `.workflow-runs/${itemId}.json`;
if (!fs.existsSync(path.resolve(ROOT, runPath))) throw new Error(`No active run: ${itemId}`);
const run = readJson(runPath);
if (!run.storeFingerprint) throw new Error(`${runPath} predates the record store split; finish or stop it with the tooling that started it`);
validateContract();
const manifest = validateManifest();
const item = manifest.items.find((candidate) => candidate.id === itemId);
if (!item) throw new Error(`Manifest item disappeared: ${itemId}`);
if (jsonDigest(manifestRiskPayload(item)) !== run.plannerRiskSha256) throw new Error('Planner-owned risk/scope fields changed after batch start');
if (run.version >= 3) validateExecution(item, 'ready');
// Concurrency guard over the store: nothing the batch does not own may change. Separate record files appended
// by another batch are additions, not violations, and are reported.
const loaded = store.loadStore();
const { errors, additions } = store.compareFingerprint(run.storeFingerprint, loaded, item.expectedRecordId);
if (errors.length) throw new Error(`Concurrent store change detected:\n- ${errors.join('\n- ')}`);
const owned = store.findRecord(loaded, item.expectedRecordId);
if (!owned) throw new Error(`Owned record ${item.expectedRecordId} is missing from the store`);
// Plan and inventory before a write: the nodes to mutate must have been re-verified in Figma by id, name, type and
// parent since the inventory was walked (record workflow_planInventory_2026-09-12).
const files = validateBatchFiles({ record: owned.record, recordId: item.expectedRecordId, item, date: owned.date, stage: 'mutation' });
if (files.errors.length) throw new Error(`Batch files gate failed before mutation:\n- ${files.errors.join('\n- ')}`);
const appended = [...additions.records.map((id) => `record ${id}`), ...additions.flags.map((id) => `flag ${id}`)];
console.log(`batch guard PASS ${itemId} foundation ${run.storeFingerprint.foundation.slice(0, 12)}; ${Object.keys(run.storeFingerprint.records).length} records and ${Object.keys(run.storeFingerprint.flags).length} flags unchanged${appended.length ? `; concurrent appends by other batches: ${appended.join(', ')}` : ''}; batch files ${describe(files)}`);
