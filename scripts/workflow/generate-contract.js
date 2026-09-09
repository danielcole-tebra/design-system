const fs = require('fs');
const path = require('path');
const { ROOT, fileDigest, jsonDigest, readJson, writeJson } = require('./lib');

const schema = readJson('design-system-schema.json');
const rules = readJson('workflow/rules.json');
const selectedConventionIds = [
  'npveRebuild_sidesheetOutlineFooterGlobal_2026-09-04',
  'npveRebuild_sidesheetRadiusPlacement_2026-09-04',
  'npveRebuild_sidesheetHeaderPaddingGlobal_2026-09-04',
  'npveRebuild_bodyPaddingAndSearch_2026_09_02',
  'npveRebuild_sidesheetBase8SpacingAudit_2026-09-04',
  'npveRebuild_problemEditSpacingCorrection_2026-09-04',
  'npveRebuild_healthStatusObservationsOpticalSpacing_2026-09-06',
  'npveRebuild_socialHistoryNewEntryPlacement_2026-09-06',
  'npveRebuild_noteHeaderLayout_2026-09-08',
  'workflowRefactor_closeout_2026-09-08'
];

function compactRecord(id, record) {
  if (!record) return { id, missing: true };
  return {
    id,
    status: record._status || record.status || null,
    date: record.date || null,
    outcome: record.outcome || record.summary || record.decisionApplied || null,
    geometry: record.geometry || null,
    decision: record.decisionApplied || record.decision || null,
    report: record.report || null,
    target: record.target || null
  };
}

// Every sourceRecord named in rules.json must exist in the schema, or the contract is citing nothing.
const citedIds = new Set();
JSON.stringify(rules, (key, value) => {
  if (key === 'sourceRecord') (Array.isArray(value) ? value : [value]).forEach((id) => citedIds.add(id));
  return value;
});
const missingCitations = [...citedIds].filter((id) => !schema[id]);
if (missingCitations.length) throw new Error(`rules.json cites records missing from the schema: ${missingCitations.join(', ')}`);

const npveKeys = Object.keys(schema).filter((key) => key.startsWith('npveRebuild_') || key.startsWith('workflowRefactor_'));
const recentRecords = npveKeys.slice(-12).map((id) => compactRecord(id, schema[id]));
const openNpveFlags = schema.flags.filter((flag) => {
  const text = JSON.stringify(flag);
  const npve = /npve|workflowRefactor/i.test(text);
  const closed = /"(?:status|severity|_status)"\s*:\s*"(?:CLOSED|RESOLVED|DONE)/i.test(text) || Boolean(flag.resolution);
  return npve && !closed;
}).slice(-20).map((flag) => ({
  id: flag.id || flag.name || null,
  severity: flag.severity || flag.status || null,
  summary: flag.summary || flag.detail || flag.issue || null,
  discoveredDuring: flag.discoveredDuring || null
}));

const values = Object.fromEntries(rules.npve.values.map((rule) => [rule.id, rule.value]));

const contract = {
  format: 'tebra.design-workflow-contract',
  version: 2,
  generatedAt: new Date().toISOString(),
  source: {
    schema: { path: 'design-system-schema.json', sha256: fileDigest('design-system-schema.json') },
    instructions: [
      { path: 'workflow/rules.json', sha256: fileDigest('workflow/rules.json') },
      { path: 'CLAUDE.md', sha256: fileDigest('CLAUDE.md') },
      { path: 'AGENTS.md', sha256: fileDigest('AGENTS.md') },
      { path: 'OPERATORS.md', sha256: fileDigest('OPERATORS.md') }
    ],
    generator: 'scripts/workflow/generate-contract.js',
    generatorVersion: 2,
    citedRecordsPresent: citedIds.size
  },
  authority: {
    order: ['code', 'Storybook render', 'published Figma library', 'source design reference'],
    principle: 'Facts follow evidence. Design decisions stop for the human operator.',
    files: {
      code: 'C:/Code/web-app-v2/packages/design-system',
      library: { fileKey: 'YX2n4YLrEpBXNbcc73T6dw', access: 'read-only unless the batch is explicitly library work' },
      target: { fileKey: 'fdCQVFdvOByaOYIJYag0d6', pages: ['0:1 Cover', '3:2 Templates', '27:2 Screens', '126:2 Archive'] },
      source: { fileKey: 'zVsuhYehoSLLq880qRBFkq', access: 'read-only' },
      deprecatedLibrary: { fileKey: 'ZPf0sJy83aPyrHjCVHomya', access: 'read-only reference' }
    }
  },
  canonicalClaudeMdSections: rules.canonicalClaudeMdSections,
  agentRules: rules.agentRules,
  recordGate: rules.recordGate,
  standingRules: rules.standingRules,
  sheetAndComparisonTechniques: rules.sheetAndComparisonTechniques,
  proofConvention: rules.proofConvention,
  operatingLoop: [
    'Validate this contract before reading it as current truth.',
    'Record gate: confirm the previous batch in the workstream has a schema record; if not, refuse and run a read-only state check whose record stands in.',
    'Use the manifest item selected by the planner; the executor may not change its risk class. An unapproved tier needs per-item operator confirmation, quoted verbatim.',
    'Verify file identity and current live state before writes.',
    'Declare one bounded batch and stop condition.',
    'Create the IN PROGRESS schema record before Figma mutation, regenerate this contract, then start the batch guard.',
    'Mutate sequentially; stop on the first component failure before touching the next item.',
    'Run deterministic checks and inspect at least one comparison render per component.',
    'Save the comparison render and full report; show the render to the operator.',
    'Archive the batch proofs per proofConvention, finalize the schema record, regenerate this contract, pass the finish gate, and commit with an explicit allowlist.'
  ],
  nonNegotiables: {
    additiveOnly: true,
    noInvention: true,
    sourceReadOnly: true,
    libraryDefinesConsumersReuse: true,
    oneComponentAtATimeInsidePilot: true,
    riskPlannerOwned: 'Tiers are approved by the operator with a verbatim quote; executors never assign or lower them.',
    operatorVisualReviewFloor: 'Every component produces a comparison render inspected by the executor and presented to the operator.',
    allStandingRulesRequired: true
  },
  standingBatchRules: schema.standingBatchRules,
  npve: {
    values,
    rules: rules.npve.values,
    conventions: selectedConventionIds.map((id) => compactRecord(id, schema[id])),
    recentRecords,
    openFlags: openNpveFlags,
    openFlagCountInProjection: openNpveFlags.length
  }
};

contract.integrity = { contractSha256: jsonDigest(contract) };
writeJson('workflow/npve-contract.generated.json', contract);
console.log(`generated workflow/npve-contract.generated.json (${fs.statSync(path.join(ROOT, 'workflow/npve-contract.generated.json')).size} bytes; ${citedIds.size} cited records verified)`);
