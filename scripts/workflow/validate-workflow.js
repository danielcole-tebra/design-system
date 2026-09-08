const { validateContract } = require('./validate-contract');
const { validateManifest } = require('./validate-manifest');

const contract = validateContract();
const manifest = validateManifest();
console.log(`workflow PASS contract=${contract.integrity.contractSha256.slice(0, 12)} items=${manifest.items.length}`);
