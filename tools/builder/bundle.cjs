// Emit only the functions needed in the destination runtime; no Figma/file writes.
const helpers = require('./helpers.cjs');
const { createSearchRunner } = require('./search.cjs');
const bundles = {
  search: [createSearchRunner],
  audit: [helpers.snapshotControl, helpers.compareControlSnapshots, helpers.auditControls, helpers.auditEvidence],
  inspection: [helpers.retainInspectionInstance]
};
const selected = bundles[process.argv[2]];
if (!selected || process.argv.length !== 3) { console.error('Usage: node tools/builder/bundle.cjs search|audit|inspection'); process.exitCode = 1; }
else process.stdout.write(selected.map(fn => fn.toString()).join('\n\n') + '\n');
