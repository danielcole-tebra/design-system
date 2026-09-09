const fs = require('fs');
const path = require('path');
const {
  ROOT, changedFiles, jsonDigest, manifestRiskPayload, matchesAny, readJson, withoutKey, writeJson
} = require('./lib');
const { validateContract } = require('./validate-contract');
const { validateEvidence } = require('./validate-evidence');
const { validateManifest } = require('./validate-manifest');
const { validateRecord } = require('./validate-record');

const [itemId] = process.argv.slice(2);
if (!itemId) throw new Error('Usage: node scripts/workflow/finish-batch.js <item-id>');
validateContract();
const manifest = validateManifest();
const item = manifest.items.find((candidate) => candidate.id === itemId);
if (!item) throw new Error(`Unknown manifest item: ${itemId}`);
const runPath = `.workflow-runs/${itemId}.json`;
if (!fs.existsSync(path.resolve(ROOT, runPath))) throw new Error(`No active run: ${itemId}`);
const run = readJson(runPath);
const errors = [];

try { validateEvidence(itemId); } catch (error) { errors.push(error.message); }
try { validateRecord(itemId); } catch (error) { errors.push(error.message); }

if (jsonDigest(manifestRiskPayload(item)) !== run.plannerRiskSha256) errors.push('planner-owned risk/scope fields changed after start');
const schema = readJson('design-system-schema.json');
if (jsonDigest(withoutKey(schema, item.expectedRecordId)) !== run.outsideRecordSha256) errors.push('schema changed outside the owned batch record');
const record = schema[item.expectedRecordId];
if (!record || !String(record._status || record.status).startsWith('DONE')) errors.push('owned schema record is not DONE');
for (const evidence of [item.requiredEvidence.report, item.requiredEvidence.comparisonRender]) {
  if (!fs.existsSync(path.resolve(ROOT, evidence))) errors.push(`missing evidence: ${evidence}`);
}
const outsideAllowlist = changedFiles().filter((file) => !matchesAny(file, item.allowedFiles));
if (outsideAllowlist.length) errors.push(`working tree has files outside allowlist: ${outsideAllowlist.join(', ')}`);
if (errors.length) throw new Error(`Finish gate failed:\n- ${errors.join('\n- ')}`);

item.status = 'complete';
item.completedAt = new Date().toISOString();
writeJson('workflow/manifest.json', manifest);
run.status = 'complete';
run.completedAt = item.completedAt;
writeJson(runPath, run);
console.log(`finish gate PASS ${itemId}; comparison and report present; outside-record schema unchanged`);
