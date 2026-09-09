const fs = require('fs');
const path = require('path');
const { ROOT, readJson } = require('./lib');

function size(file) { return fs.statSync(path.resolve(ROOT, file)).size; }
const manifest = readJson('workflow/manifest.json');
const legacyFiles = ['CLAUDE.md', 'AGENTS.md', 'OPERATORS.md', 'design-system-schema.json'];
const leanFiles = ['CLAUDE.md', 'workflow/README.md', 'workflow/protocol.json', 'workflow/manifest.json', 'workflow/npve-contract.generated.json'];
const legacyBytes = legacyFiles.reduce((sum, file) => sum + size(file), 0);
const leanBytes = leanFiles.reduce((sum, file) => sum + size(file), 0);
const reductionPercent = Number(((1 - leanBytes / legacyBytes) * 100).toFixed(1));
const result = { legacyBytes, leanBytes, reductionPercent, targetPercent: 50, targetMet: reductionPercent >= 50, manifestItems: manifest.items.length };
console.log(JSON.stringify(result, null, 2));
if (!result.targetMet) process.exitCode = 1;
