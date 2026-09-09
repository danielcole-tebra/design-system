// Step 3 of the schema split: prove the aggregate generated from the store equals the pre-split original.
// Usage: node scripts/schema/reconcile-aggregate.js <original-schema.json> <baseline-counts.json> <out.json>
// Exit 1 on any mismatch: byte inequality, a missing or changed record or flag, or a non-zero count delta.
const fs = require('fs');
const path = require('path');
const { contentSha, flagResolution, generate, sha256 } = require('./lib');

const [original, baselinePath, output] = process.argv.slice(2);
if (!original || !baselinePath || !output) throw new Error('Usage: node scripts/schema/reconcile-aggregate.js <original.json> <baseline-counts.json> <out.json>');
const originalText = fs.readFileSync(original, 'utf8');
const originalSchema = JSON.parse(originalText);
const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
const { aggregateText, aggregate, store } = generate();

const problems = [];
const originalKeys = Object.keys(originalSchema);
const generatedKeys = Object.keys(aggregate);
if (JSON.stringify(originalKeys) !== JSON.stringify(generatedKeys)) problems.push('top-level key order differs');

const foundationKeys = baseline.foundationKeys;
const recordAccounting = [];
for (const id of originalKeys.filter((key) => !foundationKeys.includes(key))) {
  const before = contentSha(originalSchema[id]);
  const after = aggregate[id] === undefined ? null : contentSha(aggregate[id]);
  const env = store.records.find((r) => r.id === id);
  if (after !== before) problems.push(`record ${id}: ${after ? 'content differs' : 'missing from the store'}`);
  recordAccounting.push({ id, sha256Before: before, sha256After: after, identical: after === before, file: env ? env.file : null });
}
for (const id of generatedKeys.filter((key) => !foundationKeys.includes(key) && originalSchema[key] === undefined)) problems.push(`record ${id}: present in the store but not in the original`);
for (const key of foundationKeys) {
  if (key === 'flags') continue;
  if (contentSha(originalSchema[key]) !== contentSha(aggregate[key])) problems.push(`foundation ${key}: content differs`);
}

const flagAccounting = [];
const byClassBefore = { active: 0, resolved: 0 };
originalSchema.flags.forEach((flag, i) => {
  const before = contentSha(flag);
  const afterFlag = aggregate.flags[i];
  const after = afterFlag ? contentSha(afterFlag) : null;
  const cls = flagResolution(flag).resolved ? 'resolved' : 'active';
  byClassBefore[cls] += 1;
  const inActive = store.flags.active.entries.some((e) => e.sequence === i && e.flag.id === flag.id);
  const inResolved = store.flags.resolved.entries.some((e) => e.sequence === i && e.flag.id === flag.id);
  if (after !== before || afterFlag.id !== flag.id) problems.push(`flag ${i} ${flag.id}: ${after ? 'content or position differs' : 'missing'}`);
  if ((cls === 'active') !== inActive || (cls === 'resolved') !== inResolved) problems.push(`flag ${flag.id}: filed under the wrong status`);
  flagAccounting.push({ sequence: i, id: flag.id, classification: cls, identical: after === before, file: inActive ? 'flags/active.json' : inResolved ? 'flags/resolved.json' : null });
});
if (aggregate.flags.length !== originalSchema.flags.length) problems.push('flag count differs');

const counts = {
  topLevelKeys: { before: originalKeys.length, after: generatedKeys.length },
  records: { before: originalKeys.length - foundationKeys.length, after: store.records.length },
  flags: { before: originalSchema.flags.length, after: aggregate.flags.length },
  flagsActive: { before: byClassBefore.active, after: store.flags.active.entries.length },
  flagsResolved: { before: byClassBefore.resolved, after: store.flags.resolved.entries.length },
  bytes: { before: Buffer.byteLength(originalText), after: Buffer.byteLength(aggregateText) }
};
const deltas = Object.fromEntries(Object.entries(counts).map(([k, v]) => [k, v.after - v.before]));
for (const [k, d] of Object.entries(deltas)) if (d !== 0) problems.push(`count delta ${k}: ${d}`);
if (JSON.stringify(counts.records.before) !== JSON.stringify(baseline.counts.records)) problems.push('record count does not match the step-1 baseline');
if (originalSchema.flags.length !== baseline.counts.flags) problems.push('flag count does not match the step-1 baseline');

const byteIdentical = aggregateText === originalText;
if (!byteIdentical) problems.push('generated aggregate is not byte-identical to the original');

const result = {
  format: 'tebra.design-schema-reconciliation',
  version: 1,
  original: { path: path.basename(original), sha256: sha256(originalText) },
  generated: { sha256: sha256(aggregateText) },
  byteIdentical,
  counts,
  deltas,
  result: problems.length ? 'MISMATCH' : 'PASS',
  problems,
  records: { accounted: recordAccounting.length, identical: recordAccounting.filter((r) => r.identical).length, entries: recordAccounting },
  flags: { accounted: flagAccounting.length, identical: flagAccounting.filter((f) => f.identical).length, entries: flagAccounting }
};
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify(result, null, 1)}\n`);
console.log(JSON.stringify({ result: result.result, byteIdentical, counts: Object.fromEntries(Object.entries(counts).map(([k, v]) => [k, `${v.before}->${v.after}`])), problems }));
if (problems.length) process.exitCode = 1;
