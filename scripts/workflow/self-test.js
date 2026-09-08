const assert = require('assert');
const { jsonDigest, manifestRiskPayload, matchesAny, withoutKey } = require('./lib');

const item = {
  id: 'example', expectedRecordId: 'record',
  risk: {
    tier: 'low', reasons: ['pattern following'], proposedBy: 'planner',
    approval: { status: 'unapproved', approvedBy: null, approvedAt: null, quote: null, history: [] },
    lockedAt: '2026-01-01T00:00:00.000Z'
  },
  oversight: ['comparison'], stopCondition: 'stop',
  allowedFiles: ['figma-export/example/**', 'design-system-schema.json'],
  requiredEvidence: { report: 'figma-export/example/report.md', comparisonRender: 'figma-export/example/comparison.png' }
};
const locked = jsonDigest(manifestRiskPayload(item));
item.risk.tier = 'high';
assert.notStrictEqual(jsonDigest(manifestRiskPayload(item)), locked, 'risk changes must invalidate the planner lock');
item.risk.tier = 'low';
item.risk.approval.status = 'approved';
assert.notStrictEqual(jsonDigest(manifestRiskPayload(item)), locked, 'flipping approval status must invalidate the lock');
item.risk.approval.status = 'unapproved';
assert.strictEqual(jsonDigest(manifestRiskPayload(item)), locked, 'restoring the payload restores the lock');
assert(matchesAny('figma-export/example/report.md', ['figma-export/example/**']));
assert(!matchesAny('unrelated.md', ['figma-export/example/**']));
const schema = { flags: [], record: { _status: 'IN PROGRESS' }, other: { stable: true } };
const outside = jsonDigest(withoutKey(schema, 'record'));
schema.record._status = 'DONE';
assert.strictEqual(jsonDigest(withoutKey(schema, 'record')), outside, 'owned record changes must be allowed');
schema.other.stable = false;
assert.notStrictEqual(jsonDigest(withoutKey(schema, 'record')), outside, 'outside-record changes must be detected');
console.log('self-test PASS risk lock (tier and approval), allowlist, and outside-record concurrency guard');
