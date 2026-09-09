const { jsonDigest, manifestRiskPayload, readJson, writeJson } = require('./lib');

// Usage: node scripts/workflow/lock-risk.js <item-id> <approver> "<verbatim operator approval>"
// The approver is the operator (or a planner the operator has named); the quote is the operator's own words.
// An executor may never run this on its own behalf. Without a quote the tier stays unapproved.
const retroactive = process.argv.includes('--retroactive');
const [itemId, approver, ...quoteParts] = process.argv.slice(2).filter((arg) => arg !== '--retroactive');
const quote = quoteParts.join(' ').trim();
if (!itemId || !approver || !quote) throw new Error('Usage: node scripts/workflow/lock-risk.js <item-id> <approver> "<verbatim operator approval quote>"');

const manifest = readJson('workflow/manifest.json');
const item = manifest.items.find((candidate) => candidate.id === itemId);
if (!item) throw new Error(`Unknown manifest item: ${itemId}`);
if (!retroactive && !['proposed', 'queued', 'stopped'].includes(item.status)) throw new Error(`${itemId} must be proposed, queued, or stopped before risk is locked (pass --retroactive to record an operator approval on a complete item)`);
if (retroactive && item.status !== 'complete') throw new Error(`--retroactive is only for complete items; ${itemId} is ${item.status}`);
if (!item.risk?.proposedBy) throw new Error(`${itemId}: risk.proposedBy must name who proposed the tier before it can be approved`);

const now = new Date().toISOString();
const previous = item.risk.approval || {};
item.risk.approval = {
  status: 'approved',
  approvedBy: approver,
  approvedAt: now,
  quote,
  history: previous.history || []
};
delete item.risk.assignedBy;
item.risk.lockedAt = now;
if (retroactive) item.risk.approval.retroactive = true; else item.status = 'queued';
item.risk.lock = jsonDigest(manifestRiskPayload(item));
writeJson('workflow/manifest.json', manifest);
console.log(`risk locked ${itemId} ${item.risk.tier}; approved by ${approver}: "${quote}"`);
