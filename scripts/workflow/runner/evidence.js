const { need } = require('./core');
// Draft only. Deterministic facts and model judgments are deliberately separate.
function evidenceDraft(item, audit, fileIdentity, paths) {
  need(audit.deterministicPass === true, 'Fix deterministic failures before generating evidence');
  need(paths.length && paths.every(p => typeof p === 'string'), 'Full readback paths required');
  return { format: 'tebra.design-batch-evidence', version: 1, itemId: item.id,
    fileIdentity, auditConfiguration: { skipInvisibleInstanceChildren: false },
    checks: Object.fromEntries(['unboundPaints', 'fractionalAuthoredGeometry', 'referenceCounts', 'componentIdentity', 'propertyReferences'].map(name => [name, { pass: name !== 'propertyReferences', evidence: paths,
      ...(name === 'propertyReferences' ? { required: 'Verify exposed properties actually render on live instances; equal reference counts alone do not prove behavior.' } : {}) }])),
    visualReview: { comparisonRender: item.requiredEvidence.comparisonRender, inspectedByExecutor: false, observations: [] },
    toolCalls: { figmaRead: null, figmaWrite: null, screenshot: null, correctionCycles: null },
    draft: 'Visual observations, complete ten-rule evidence, actual call counts and operator presentation must be supplied from evidence; this draft cannot pass finish.' };
}
function reportDraft(item, { identities = [], evidence = [], measurements = null } = {}) {
  return `# ${item.title}\n\nDRAFT — executor review and closeout pending.\n\n${item.scope}\n\nRisk: ${item.risk.tier}; tier approval: ${item.risk.approval.status}. Exact approval remains in the manifest and authoritative record.\n\n## Identities\n\n${identities.map(n => `- ${n.name}: ${n.id}${n.key ? ` (key ${n.key})` : ''}`).join('\n')}\n\n## Evidence\n\n${evidence.map(file => `- ${file}`).join('\n')}\n\n## Required executor completion\n\nRecord all ten standing checks and inspect each required live state and whole-form comparison. Cite actual source/rebuild/change PNGs, observed differences and dispositions, GAP/DEFECT counts, operator presentation, and proof disposition. Do not infer any of these from this draft.\n\n## Observed usage\n\n${measurements ? JSON.stringify(measurements, null, 2) : 'Unavailable; no credits, prices or token conversions inferred.'}\n`;
}
module.exports = { evidenceDraft, reportDraft };
