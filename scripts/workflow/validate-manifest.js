const { jsonDigest, manifestRiskPayload, readJson } = require('./lib');

function validateManifest() {
  const manifest = readJson('workflow/manifest.json');
  const errors = [];
  const ids = new Set();
  if (manifest.format !== 'tebra.design-work-manifest' || manifest.version !== 1) errors.push('unsupported manifest format/version');
  for (const item of manifest.items) {
    if (!item.id || ids.has(item.id)) errors.push(`missing or duplicate item id: ${item.id}`);
    ids.add(item.id);
    if (!['queued', 'active', 'complete', 'stopped'].includes(item.status)) errors.push(`${item.id}: invalid status`);
    if (!['low', 'medium', 'high'].includes(item.risk?.tier)) errors.push(`${item.id}: invalid risk tier`);
    if (!item.risk?.assignedBy || !item.risk?.lockedAt || !item.risk?.lock) errors.push(`${item.id}: risk is not planner-locked`);
    if (item.risk?.lock && item.risk.lock !== jsonDigest(manifestRiskPayload(item))) errors.push(`${item.id}: planner risk lock is stale`);
    if (!item.expectedRecordId || !item.stopCondition) errors.push(`${item.id}: missing record id or stop condition`);
    if (!Array.isArray(item.allowedFiles) || !item.allowedFiles.length) errors.push(`${item.id}: no file allowlist`);
    if (!item.requiredEvidence?.comparisonRender || !item.requiredEvidence?.report) errors.push(`${item.id}: visual/report evidence is required`);
  }
  if (errors.length) throw new Error(`Manifest validation failed:\n- ${errors.join('\n- ')}`);
  return manifest;
}

if (require.main === module) {
  const manifest = validateManifest();
  console.log(`manifest PASS ${manifest.items.length} item(s)`);
}

module.exports = { validateManifest };
