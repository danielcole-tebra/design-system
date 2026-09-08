const fs = require('fs');
const path = require('path');
const { ROOT, fileDigest, jsonDigest, manifestRiskPayload, readJson, withoutKey, writeJson } = require('./lib');
const { validateContract } = require('./validate-contract');
const { validateManifest } = require('./validate-manifest');

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
  riskApproval: approval.status || 'unapproved',
  perItemConfirmation,
  schemaSha256: fileDigest('design-system-schema.json'),
  outsideRecordSha256: jsonDigest(withoutKey(schema, item.expectedRecordId)),
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
console.log(`batch started ${itemId}; guard ${run.schemaSha256.slice(0, 12)}; risk ${item.risk.tier} (${run.riskApproval}${perItemConfirmation ? ', per-item confirmation recorded' : ''})`);
