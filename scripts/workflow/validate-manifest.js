const { jsonDigest, manifestRiskPayload, readJson } = require('./lib');

function validateManifest() {
  const manifest = readJson('workflow/manifest.json');
  const errors = [];
  const ids = new Set();
  if (manifest.format !== 'tebra.design-work-manifest' || manifest.version !== 1) errors.push('unsupported manifest format/version');
  for (const item of manifest.items) {
    if (!item.id || ids.has(item.id)) errors.push(`missing or duplicate item id: ${item.id}`);
    ids.add(item.id);
    if (!['proposed', 'queued', 'active', 'complete', 'stopped'].includes(item.status)) errors.push(`${item.id}: invalid status`);
    const risk = item.risk || {};
    if (!['low', 'medium', 'high'].includes(risk.tier)) errors.push(`${item.id}: invalid risk tier`);
    if (item.status !== 'proposed') {
      if (!risk.lock || !risk.lockedAt) errors.push(`${item.id}: risk is not locked`);
      if (!risk.proposedBy) errors.push(`${item.id}: risk has no proposer`);
      const approval = risk.approval;
      if (!approval || !['approved', 'unapproved'].includes(approval.status)) errors.push(`${item.id}: risk approval status must be approved or unapproved`);
      if (approval && approval.status === 'approved' && (!approval.approvedBy || !approval.approvedAt || !String(approval.quote || '').trim())) errors.push(`${item.id}: approved tier lacks approver, time, or verbatim quote`);
      if (risk.assignedBy !== undefined) errors.push(`${item.id}: legacy assignedBy field present; attribution belongs in risk.approval`);
    }
    if (risk.lock && risk.lock !== jsonDigest(manifestRiskPayload(item))) errors.push(`${item.id}: planner risk lock is stale`);
    if (!item.expectedRecordId || !item.stopCondition) errors.push(`${item.id}: missing record id or stop condition`);
    if (!Array.isArray(item.allowedFiles) || !item.allowedFiles.length) errors.push(`${item.id}: no file allowlist`);
    if (!item.requiredEvidence?.comparisonRender || !item.requiredEvidence?.report) errors.push(`${item.id}: visual/report evidence is required`);
    for (const dependency of item.dependsOn || []) {
      if (!manifest.items.some((candidate) => candidate.id === dependency)) errors.push(`${item.id}: unknown dependency ${dependency}`);
    }
  }
  if (errors.length) throw new Error(`Manifest validation failed:\n- ${errors.join('\n- ')}`);
  return manifest;
}

if (require.main === module) {
  const manifest = validateManifest();
  const unapproved = manifest.items.filter((item) => item.status !== 'proposed' && item.risk?.approval?.status !== 'approved').map((item) => item.id);
  console.log(`manifest PASS ${manifest.items.length} item(s)${unapproved.length ? `; tiers UNAPPROVED on ${unapproved.join(', ')}` : ''}`);
}

module.exports = { validateManifest };
