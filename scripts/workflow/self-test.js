const assert = require('assert');
const { jsonDigest, manifestRiskPayload, matchesAny, withoutKey } = require('./lib');

const item = {
  id: 'example', expectedRecordId: 'record',
  risk: { tier: 'low', reasons: ['pattern following'] },
  oversight: ['comparison'], stopCondition: 'stop',
  allowedFiles: ['figma-export/example/**', 'design-system-schema.json'],
  requiredEvidence: { report: 'figma-export/example/report.md', comparisonRender: 'figma-export/example/comparison.png' }
};
const locked = jsonDigest(manifestRiskPayload(item));
item.risk.tier = 'high';
assert.notStrictEqual(jsonDigest(manifestRiskPayload(item)), locked, 'risk changes must invalidate the planner lock');
assert(matchesAny('figma-export/example/report.md', ['figma-export/example/**']));
assert(!matchesAny('unrelated.md', ['figma-export/example/**']));
const schema = { flags: [], record: { _status: 'IN PROGRESS' }, other: { stable: true } };
const outside = jsonDigest(withoutKey(schema, 'record'));
schema.record._status = 'DONE';
assert.strictEqual(jsonDigest(withoutKey(schema, 'record')), outside, 'owned record changes must be allowed');
schema.other.stable = false;
assert.notStrictEqual(jsonDigest(withoutKey(schema, 'record')), outside, 'outside-record changes must be detected');
console.log('self-test PASS risk lock, allowlist, and outside-record concurrency guard');
