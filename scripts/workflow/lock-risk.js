const { jsonDigest, manifestRiskPayload, readJson, writeJson } = require('./lib');

const [itemId, planner] = process.argv.slice(2);
if (!itemId || !planner) throw new Error('Usage: node scripts/workflow/lock-risk.js <item-id> <planner-or-operator>');

const manifest = readJson('workflow/manifest.json');
const item = manifest.items.find((candidate) => candidate.id === itemId);
if (!item) throw new Error(`Unknown manifest item: ${itemId}`);
if (!['queued', 'stopped'].includes(item.status)) throw new Error(`${itemId} must be queued or stopped before risk is locked`);

item.risk.assignedBy = planner;
item.risk.lockedAt = new Date().toISOString();
item.risk.lock = jsonDigest(manifestRiskPayload(item));
writeJson('workflow/manifest.json', manifest);
console.log(`risk locked ${itemId} ${item.risk.tier} by ${planner}`);
