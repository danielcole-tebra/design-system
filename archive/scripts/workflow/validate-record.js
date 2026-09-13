const { readStoreRecord } = require('./lib');
const { validateManifest } = require('./validate-manifest');

function validateRecord(itemId) {
  const manifest = validateManifest();
  const item = manifest.items.find((candidate) => candidate.id === itemId);
  if (!item) throw new Error(`Unknown manifest item: ${itemId}`);
  // Records are read from the store (records/<ws>/<date>/<id>.json), never from the generated aggregate.
  const { store, env, record } = readStoreRecord(item.expectedRecordId);
  const errors = [];
  if (!record) errors.push(`record ${item.expectedRecordId} is missing from the store`);
  if (record && !String(record._status || record.status).startsWith('DONE')) errors.push('record is not DONE');
  if (record && record.report !== item.requiredEvidence.report) errors.push('record report path does not match manifest');
  const rules = record?.standingBatchRules || {};
  const canonicalRules = Object.keys(store.foundation.standingBatchRules).filter((key) => /^\d+_/.test(key));
  for (const key of canonicalRules) {
    if (!String(rules[key] || '').startsWith('PASS')) errors.push(`standing rule missing or failed: ${key}`);
  }
  if (canonicalRules.length !== 10) errors.push(`canonical standing-rule count is ${canonicalRules.length}, expected 10`);
  if (!Array.isArray(record?.screenshots) || !record.screenshots.includes(item.requiredEvidence.comparisonRender)) errors.push('record does not cite the manifest comparison render');
  if (errors.length) throw new Error(`Record validation failed for ${itemId}:\n- ${errors.join('\n- ')}`);
  return { record, path: env.file };
}

if (require.main === module) {
  const itemId = process.argv[2];
  if (!itemId) throw new Error('Usage: node scripts/workflow/validate-record.js <item-id>');
  const { path } = validateRecord(itemId);
  console.log(`record PASS ${itemId} (${path})`);
}

module.exports = { validateRecord };
