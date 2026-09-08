const fs = require('fs');
const path = require('path');
const { ROOT, fileDigest, jsonDigest, manifestRiskPayload, readJson, withoutKey, writeJson } = require('./lib');
const { validateContract } = require('./validate-contract');
const { validateManifest } = require('./validate-manifest');

const [itemId, executor, provider = null, model = null, reasoning = null] = process.argv.slice(2);
if (!itemId || !executor) throw new Error('Usage: node scripts/workflow/start-batch.js <item-id> <executor> [provider] [model] [reasoning]');
validateContract();
const manifest = validateManifest();
const item = manifest.items.find((candidate) => candidate.id === itemId);
if (!item) throw new Error(`Unknown manifest item: ${itemId}`);
if (item.status !== 'queued') throw new Error(`${itemId} is ${item.status}, not queued`);

const schema = readJson('design-system-schema.json');
const record = schema[item.expectedRecordId];
if (!record || !String(record._status || record.status).startsWith('IN PROGRESS')) {
  throw new Error(`Record gate failed: ${item.expectedRecordId} must exist and be IN PROGRESS before batch start`);
}

const runPath = `.workflow-runs/${itemId}.json`;
if (fs.existsSync(path.resolve(ROOT, runPath))) throw new Error(`Active run already exists: ${runPath}`);
const run = {
  format: 'tebra.design-work-run',
  version: 1,
  itemId,
  expectedRecordId: item.expectedRecordId,
  startedAt: new Date().toISOString(),
  executor,
  provenance: { provider, model, reasoning },
  schemaSha256: fileDigest('design-system-schema.json'),
  outsideRecordSha256: jsonDigest(withoutKey(schema, item.expectedRecordId)),
  plannerRiskSha256: jsonDigest(manifestRiskPayload(item)),
  allowedFiles: item.allowedFiles,
  requiredEvidence: item.requiredEvidence,
  status: 'active'
};
writeJson(runPath, run);
console.log(`batch started ${itemId}; guard ${run.schemaSha256.slice(0, 12)}; risk ${item.risk.tier}`);
