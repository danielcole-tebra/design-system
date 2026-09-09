const { validateContract } = require('./validate-contract');
const { validateManifest } = require('./validate-manifest');
const checks = require('../../workflow/check-catalog.json');

const contract = validateContract();
const manifest = validateManifest();
if (checks.visual?.comparisonRender == null) throw new Error('Visual comparison floor is missing from check catalog');
console.log(`workflow PASS contract=${contract.integrity.contractSha256.slice(0, 12)} items=${manifest.items.length} deterministic=${Object.keys(checks.deterministic).length} visual=${Object.keys(checks.visual).length}`);
