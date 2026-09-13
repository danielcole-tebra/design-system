// Step 2 of the schema split: one-time migration of the monolith into foundation/, records/, flags/.
// Usage: node scripts/schema/migrate-split.js <baseline-schema.json> <baseline-counts.json> <sourceCommit>
// Refuses to run twice. Record and flag content is written verbatim (key order preserved); the envelope
// around each record and the sequence on each flag entry are the only additions structure forces.
const fs = require('fs');
const path = require('path');
const { PATHS, RECORD_FORMAT, FLAGS_FORMAT, FLAG_CLASSIFIER, abs, contentSha, exists, flagResolution, recordPath, writeJson } = require('./lib');

const [input, baselinePath, sourceCommit] = process.argv.slice(2);
if (!input || !baselinePath || !sourceCommit) throw new Error('Usage: node scripts/schema/migrate-split.js <schema.json> <baseline-counts.json> <sourceCommit>');
if (exists(PATHS.recordsDir) || exists(PATHS.layout) || exists(PATHS.flagsActive)) throw new Error('records/, foundation/ or flags/ already exist; the migration runs once');

const schema = JSON.parse(fs.readFileSync(input, 'utf8'));
const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
const migratedOn = '2026-09-08';
const migration = { from: `${path.basename(input)} @ ${sourceCommit}`, migratedOn, record: 'schemasplit_phase8_2026-09-08' };

// foundation
writeJson(PATHS.layout, { format: 'tebra.design-foundation-layout', version: 1, note: 'Ordered top-level keys of the aggregate that are not batch records. flags is served from flags/active.json + flags/resolved.json. Hand-maintained; changes only when a foundation section is added, with a record.', order: baseline.foundationKeys });
for (const key of baseline.foundationKeys) {
  if (key === 'flags') continue;
  writeJson(`${PATHS.foundationDir}/${key}.json`, schema[key]);
}

// records
let written = 0;
for (const entry of baseline.recordIndex) {
  const record = schema[entry.id];
  if (contentSha(record) !== entry.sha256) throw new Error(`${entry.id}: content differs from the baseline index`);
  const env = {
    format: RECORD_FORMAT, version: 1, id: entry.id, sequence: entry.sequence, date: entry.date, workstream: entry.workstream,
    migration: { ...migration, dateSource: entry.dateSource, contentSha256: entry.sha256 }
  };
  if (entry.dateSource.startsWith('position')) env.migration.note = 'The record carries no date and its id has none; dated from its position in the aggregate (it follows codeDefectRegister2026_08_31).';
  env.record = record;
  const file = recordPath(env);
  if (exists(file)) throw new Error(`${file} exists`);
  writeJson(file, env);
  written += 1;
}

// flags
const active = { format: FLAGS_FORMAT, version: 1, status: 'active', classifier: FLAG_CLASSIFIER, migration, entries: [] };
const resolved = { format: FLAGS_FORMAT, version: 1, status: 'resolved', classifier: FLAG_CLASSIFIER, migration, entries: [] };
schema.flags.forEach((flag, sequence) => {
  const expected = baseline.flagIndex[sequence];
  if (expected.id !== flag.id || expected.sha256 !== contentSha(flag)) throw new Error(`flag ${sequence} differs from the baseline index`);
  (flagResolution(flag).resolved ? resolved : active).entries.push({ sequence, flag });
});
writeJson(PATHS.flagsActive, active);
writeJson(PATHS.flagsResolved, resolved);
console.log(`migrated ${baseline.foundationKeys.length - 1} foundation files, ${written} records, ${active.entries.length} active + ${resolved.entries.length} resolved flags`);
