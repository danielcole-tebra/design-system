const fs = require('fs');
const path = require('path');
const {
  GENERATED_FILES, ROOT, changedFiles, jsonDigest, manifestRiskPayload, matchesAny, readJson, store, writeJson
} = require('./lib');
const { validateContract } = require('./validate-contract');
const { validateEvidence } = require('./validate-evidence');
const { validateManifest } = require('./validate-manifest');
const { validateRecord } = require('./validate-record');
const { validateSplit } = require('../schema/validate-split');
const { validateExecution } = require('./validate-execution');
const { unchangedBaseline } = require('./workspace-baseline');

const [itemId] = process.argv.slice(2);
if (!itemId) throw new Error('Usage: node scripts/workflow/finish-batch.js <item-id>');
validateContract();
const manifest = validateManifest();
const item = manifest.items.find((candidate) => candidate.id === itemId);
if (!item) throw new Error(`Unknown manifest item: ${itemId}`);
const runPath = `.workflow-runs/${itemId}.json`;
if (!fs.existsSync(path.resolve(ROOT, runPath))) throw new Error(`No active run: ${itemId}`);
const run = readJson(runPath);
if (!run.storeFingerprint) throw new Error(`${runPath} predates the record store split`);
const errors = [];
if (run.version >= 3) {
  try { validateExecution(item, 'finish'); } catch (error) { errors.push(error.message); }
}

try { validateEvidence(itemId); } catch (error) { errors.push(error.message); }
try { validateRecord(itemId); } catch (error) { errors.push(error.message); }
try { validateSplit(); } catch (error) { errors.push(error.message); }

if (jsonDigest(manifestRiskPayload(item)) !== run.plannerRiskSha256) errors.push('planner-owned risk/scope fields changed after start');
const loaded = store.loadStore();
const guard = store.compareFingerprint(run.storeFingerprint, loaded, item.expectedRecordId);
errors.push(...guard.errors);
const owned = store.findRecord(loaded, item.expectedRecordId);
if (!owned || !store.isDone(owned.record)) errors.push('owned record is not DONE');
for (const evidence of [item.requiredEvidence.report, item.requiredEvidence.comparisonRender]) {
  if (!fs.existsSync(path.resolve(ROOT, evidence))) errors.push(`missing evidence: ${evidence}`);
}
// The owned record file, the flag stores and the generated files are always allowed; everything else must be on the allowlist.
const implicitlyAllowed = [...GENERATED_FILES, store.PATHS.flagsActive, store.PATHS.flagsResolved, ...(owned ? [owned.file] : [])];
const outsideAllowlist = changedFiles().filter((file) => !implicitlyAllowed.includes(file) && !matchesAny(file, item.allowedFiles) && !(run.version >= 3 && unchangedBaseline(file, run.preexistingFiles)));
if (outsideAllowlist.length) errors.push(`working tree has files outside allowlist: ${outsideAllowlist.join(', ')}`);
// Also catch a pre-existing edit that was reverted/deleted and disappeared from git status.
if (run.version >= 3) for (const file of Object.keys(run.preexistingFiles || {})) {
  if (!unchangedBaseline(file, run.preexistingFiles)) errors.push(`pre-existing unrelated file changed: ${file}`);
}
if (errors.length) throw new Error(`Finish gate failed:\n- ${errors.join('\n- ')}`);

item.status = 'complete';
item.completedAt = new Date().toISOString();
writeJson('workflow/manifest.json', manifest);
run.status = 'complete';
run.completedAt = item.completedAt;
writeJson(runPath, run);
const appended = [...guard.additions.records.map((id) => `record ${id}`), ...guard.additions.flags.map((id) => `flag ${id}`)];
console.log(`finish gate PASS ${itemId}; record ${owned.file} DONE; comparison and report present; store outside the owned record unchanged${appended.length ? ` (concurrent appends: ${appended.join(', ')})` : ''}`);
