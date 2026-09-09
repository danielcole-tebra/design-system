const { validateContract } = require('./validate-contract');
const { validateManifest } = require('./validate-manifest');
const { validateSplit } = require('../schema/validate-split');
const checks = require('../../workflow/check-catalog.json');

// Order matters: the store must be consistent and fresh before the contract's digests mean anything.
const split = validateSplit();
const contract = validateContract();
const manifest = validateManifest();
if (checks.visual?.comparisonRender == null) throw new Error('Visual comparison floor is missing from check catalog');
console.log(`workflow PASS store=${split.generated.recordIndex.counts.records}r/${split.generated.recordIndex.flags.active}+${split.generated.recordIndex.flags.resolved}f contract=${contract.integrity.contractSha256.slice(0, 12)} items=${manifest.items.length} deterministic=${Object.keys(checks.deterministic).length} visual=${Object.keys(checks.visual).length}${split.inProgress.length ? ` inProgress=${split.inProgress.join(',')}` : ''}`);
