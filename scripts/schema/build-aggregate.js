// Regenerates design-system-schema.json (legacy aggregate) and indexes/ from foundation/, records/, flags/.
// Usage: node scripts/schema/build-aggregate.js [--check]   (--check reports staleness without writing)
const { PATHS, checkFreshness, generate, writeGenerated } = require('./lib');

const check = process.argv.includes('--check');
const generated = generate();
const stale = checkFreshness(generated);
if (check) {
  if (stale.length) { console.error(`stale: ${stale.join(', ')}`); process.exitCode = 1; }
  else console.log('generated files are fresh');
} else {
  writeGenerated(generated);
  console.log(`wrote ${PATHS.aggregate} (${generated.currentState.aggregate.bytes} bytes, ${generated.currentState.aggregate.sha256.slice(0, 12)}), ${PATHS.recordIndex} (${generated.recordIndex.counts.records} records), ${PATHS.currentState}${stale.length ? ` — refreshed ${stale.join(', ')}` : ' — unchanged'}`);
}
