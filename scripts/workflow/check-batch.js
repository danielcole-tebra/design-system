const fs = require('fs');
const path = require('path');
const { ROOT, fileDigest, jsonDigest, manifestRiskPayload, readJson } = require('./lib');
const { validateContract } = require('./validate-contract');
const { validateManifest } = require('./validate-manifest');

const [itemId] = process.argv.slice(2);
if (!itemId) throw new Error('Usage: node scripts/workflow/check-batch.js <item-id>');
const runPath = `.workflow-runs/${itemId}.json`;
if (!fs.existsSync(path.resolve(ROOT, runPath))) throw new Error(`No active run: ${itemId}`);
const run = readJson(runPath);
validateContract();
const manifest = validateManifest();
const item = manifest.items.find((candidate) => candidate.id === itemId);
if (!item) throw new Error(`Manifest item disappeared: ${itemId}`);
if (jsonDigest(manifestRiskPayload(item)) !== run.plannerRiskSha256) throw new Error('Planner-owned risk/scope fields changed after batch start');
const current = fileDigest('design-system-schema.json');
if (current !== run.schemaSha256) throw new Error(`Concurrent schema change detected: started ${run.schemaSha256}, current ${current}`);
console.log(`batch guard PASS ${itemId} ${current.slice(0, 12)}`);
