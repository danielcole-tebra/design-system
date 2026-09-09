const { fileDigest, jsonDigest, readJson, store } = require('./lib');

function validateContract() {
  const contract = readJson('workflow/npve-contract.generated.json');
  const errors = [];
  if (contract.format !== 'tebra.design-workflow-contract' || ![1, 2, 3].includes(contract.version)) errors.push('unsupported contract format/version');
  if (contract.version < 3) errors.push('contract predates the record store split (version < 3)');
  if (contract.source.schema.sha256 !== fileDigest(contract.source.schema.path)) errors.push('schema digest is stale');
  for (const key of ['recordIndex', 'currentState', 'flagsActive', 'flagsResolved', 'layout']) {
    const source = contract.source.store?.[key];
    if (!source) { errors.push(`contract lacks store digest for ${key}`); continue; }
    if (source.sha256 !== fileDigest(source.path)) errors.push(`${source.path} digest is stale`);
  }
  for (const source of contract.source.instructions) {
    if (source.sha256 !== fileDigest(source.path)) errors.push(`${source.path} digest is stale`);
  }
  // The aggregate and indexes must be what the store generates now; a stale aggregate would make every digest above meaningless.
  const stale = store.checkFreshness();
  if (stale.length) errors.push(`generated files are stale: ${stale.join(', ')} (run node scripts/schema/build-aggregate.js)`);
  const copy = structuredClone(contract);
  const expected = copy.integrity?.contractSha256;
  delete copy.integrity;
  if (expected !== jsonDigest(copy)) errors.push('contract integrity digest is invalid');
  if (errors.length) throw new Error(`Contract validation failed:\n- ${errors.join('\n- ')}\nRun: node scripts/schema/build-aggregate.js && node scripts/workflow/generate-contract.js`);
  return contract;
}

if (require.main === module) {
  const contract = validateContract();
  console.log(`contract PASS ${contract.source.schema.sha256.slice(0, 12)} ${contract.generatedAt}`);
}

module.exports = { validateContract };
