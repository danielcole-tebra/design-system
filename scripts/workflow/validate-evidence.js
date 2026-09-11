const fs = require('fs');
const path = require('path');
const { ROOT, readJson } = require('./lib');
const { validateManifest } = require('./validate-manifest');
const { validateTargetIdentity } = require('./target-identity');

function validateEvidence(itemId) {
  const manifest = validateManifest();
  const item = manifest.items.find((candidate) => candidate.id === itemId);
  if (!item) throw new Error(`Unknown manifest item: ${itemId}`);
  const evidence = readJson(item.requiredEvidence.audit);
  const errors = [];
  if (evidence.format !== 'tebra.design-batch-evidence' || evidence.version !== 1) errors.push('unsupported evidence format/version');
  if (evidence.itemId !== itemId) errors.push('evidence itemId does not match manifest');
  try { validateTargetIdentity(item.target, evidence.fileIdentity); } catch (error) { errors.push(error.message); }
  if (evidence.auditConfiguration?.skipInvisibleInstanceChildren !== false) errors.push('audit did not record skipInvisibleInstanceChildren=false');
  for (const key of ['unboundPaints', 'fractionalAuthoredGeometry', 'referenceCounts', 'componentIdentity', 'propertyReferences']) {
    if (evidence.checks?.[key]?.pass !== true) errors.push(`${key} did not pass`);
  }
  if (evidence.visualReview?.comparisonRender !== item.requiredEvidence.comparisonRender) errors.push('comparison render path does not match manifest');
  if (evidence.visualReview?.inspectedByExecutor !== true) errors.push('executor visual inspection is missing');
  if (!Array.isArray(evidence.visualReview?.observations) || !evidence.visualReview.observations.length) errors.push('visual observations are missing');
  for (const artifact of [item.requiredEvidence.audit, item.requiredEvidence.report, item.requiredEvidence.comparisonRender]) {
    if (!fs.existsSync(path.resolve(ROOT, artifact))) errors.push(`missing artifact: ${artifact}`);
  }
  if (errors.length) throw new Error(`Evidence validation failed for ${itemId}:\n- ${errors.join('\n- ')}`);
  return evidence;
}

if (require.main === module) {
  const itemId = process.argv[2];
  if (!itemId) throw new Error('Usage: node scripts/workflow/validate-evidence.js <item-id>');
  const evidence = validateEvidence(itemId);
  console.log(`evidence PASS ${itemId} reads=${evidence.toolCalls.figmaRead} writes=${evidence.toolCalls.figmaWrite} screenshots=${evidence.toolCalls.screenshot} corrections=${evidence.toolCalls.correctionCycles}`);
}

module.exports = { validateEvidence };
