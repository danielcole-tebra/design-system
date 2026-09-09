// Step 1 of the schema split: record the monolith's counts and indexes as the reconciliation targets.
// Usage: node scripts/schema/snapshot-baseline.js <schema.json> <out.json>
const fs = require('fs');
const path = require('path');
const { contentSha, flagResolution, sha256, workstreamFor, dateFor } = require('./lib');

const FOUNDATION_KEYS = ['meta', 'provenance', 'decisions', 'pxToRemHazard', 'tokens', 'figmaVariablePlan', 'components', 'flags', 'openDecisionsFromCanonicalPage', 'namingFreeze', 'standingBatchRules', 'coverageSweep', 'overlayRecipe', 'figmaBuild'];

const [input, output] = process.argv.slice(2);
if (!input || !output) throw new Error('Usage: node scripts/schema/snapshot-baseline.js <schema.json> <out.json>');
const raw = fs.readFileSync(input, 'utf8');
const schema = JSON.parse(raw);
const keys = Object.keys(schema);
const foundation = keys.slice(0, FOUNDATION_KEYS.length);
if (JSON.stringify(foundation) !== JSON.stringify(FOUNDATION_KEYS)) throw new Error(`The first ${FOUNDATION_KEYS.length} keys are not the expected foundation keys: ${foundation.join(', ')}`);
const recordKeys = keys.slice(FOUNDATION_KEYS.length);

let previousDate = null;
const records = recordKeys.map((id, i) => {
  const record = schema[id];
  const dated = dateFor(id, record, previousDate);
  previousDate = dated.date;
  return { sequence: i, id, date: dated.date, dateSource: dated.source, workstream: workstreamFor(id), status: String(record._status || record.status || '').slice(0, 80), sha256: contentSha(record) };
});
const byRawStatus = {};
const byClass = { active: 0, resolved: 0 };
const flags = schema.flags.map((flag, i) => {
  const raw = flag.status === undefined ? '(no status field)' : String(flag.status);
  byRawStatus[raw] = (byRawStatus[raw] || 0) + 1;
  const cls = flagResolution(flag);
  byClass[cls.resolved ? 'resolved' : 'active'] += 1;
  return { sequence: i, id: flag.id, severity: flag.severity, classification: cls.resolved ? 'resolved' : 'active', classifiedBy: cls.by, sha256: contentSha(flag) };
});
const byWorkstream = {};
for (const r of records) byWorkstream[r.workstream] = (byWorkstream[r.workstream] || 0) + 1;

const baseline = {
  format: 'tebra.design-schema-baseline',
  version: 1,
  source: { path: path.basename(input), bytes: Buffer.byteLength(raw), sha256: sha256(raw), topLevelKeys: keys.length },
  counts: { foundationSections: FOUNDATION_KEYS.length, records: records.length, recordsByWorkstream: byWorkstream, flags: flags.length, flagsByClassification: byClass, flagsByRawStatusField: byRawStatus, standingBatchRules: Object.keys(schema.standingBatchRules).filter((k) => /^\d+_/.test(k)).length },
  foundationKeys: FOUNDATION_KEYS,
  recordIndex: records,
  flagIndex: flags
};
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify(baseline, null, 1)}\n`);
console.log(JSON.stringify({ topLevelKeys: keys.length, records: records.length, flags: flags.length, flagsByClassification: byClass, sha256: baseline.source.sha256.slice(0, 12) }));
