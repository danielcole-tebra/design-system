const { fileDigest, jsonDigest, readJson } = require('./lib');

function validateContract() {
  const contract = readJson('workflow/npve-contract.generated.json');
  const errors = [];
  if (contract.format !== 'tebra.design-workflow-contract' || ![1, 2].includes(contract.version)) errors.push('unsupported contract format/version');
  if (contract.source.schema.sha256 !== fileDigest(contract.source.schema.path)) errors.push('schema digest is stale');
  for (const source of contract.source.instructions) {
    if (source.sha256 !== fileDigest(source.path)) errors.push(`${source.path} digest is stale`);
  }
  const copy = structuredClone(contract);
  const expected = copy.integrity?.contractSha256;
  delete copy.integrity;
  if (expected !== jsonDigest(copy)) errors.push('contract integrity digest is invalid');
  if (errors.length) throw new Error(`Contract validation failed:\n- ${errors.join('\n- ')}\nRun: node scripts/workflow/generate-contract.js`);
  return contract;
}

if (require.main === module) {
  const contract = validateContract();
  console.log(`contract PASS ${contract.source.schema.sha256.slice(0, 12)} ${contract.generatedAt}`);
}

module.exports = { validateContract };
