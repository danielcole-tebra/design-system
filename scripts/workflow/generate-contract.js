const fs = require('fs');
const path = require('path');
const { ROOT, fileDigest, jsonDigest, readJson, writeJson } = require('./lib');

const schema = readJson('design-system-schema.json');
const selectedConventionIds = [
  'npveRebuild_sidesheetOutlineFooterGlobal_2026-09-04',
  'npveRebuild_sidesheetRadiusPlacement_2026-09-04',
  'npveRebuild_sidesheetHeaderPaddingGlobal_2026-09-04',
  'npveRebuild_sidesheetBase8SpacingAudit_2026-09-04',
  'npveRebuild_problemEditSpacingCorrection_2026-09-04',
  'npveRebuild_healthStatusObservationsOpticalSpacing_2026-09-06',
  'npveRebuild_socialHistoryNewEntryPlacement_2026-09-06',
  'npveRebuild_noteHeaderLayout_2026-09-08'
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

const npveKeys = Object.keys(schema).filter((key) => key.startsWith('npveRebuild_'));
const recentRecords = npveKeys.slice(-12).map((id) => compactRecord(id, schema[id]));
const openNpveFlags = schema.flags.filter((flag) => {
  const text = JSON.stringify(flag);
  const npve = /npve/i.test(text);
  const closed = /"(?:status|severity|_status)"\s*:\s*"(?:CLOSED|RESOLVED|DONE)/i.test(text) || Boolean(flag.resolution);
  return npve && !closed;
}).slice(-20).map((flag) => ({
  id: flag.id || flag.name || null,
  severity: flag.severity || flag.status || null,
  summary: flag.summary || flag.detail || flag.issue || null,
  discoveredDuring: flag.discoveredDuring || null
}));

const contract = {
  format: 'tebra.design-workflow-contract',
  version: 1,
  generatedAt: new Date().toISOString(),
  source: {
    schema: { path: 'design-system-schema.json', sha256: fileDigest('design-system-schema.json') },
    instructions: [
      { path: 'CLAUDE.md', sha256: fileDigest('CLAUDE.md') },
      { path: 'AGENTS.md', sha256: fileDigest('AGENTS.md') },
      { path: 'OPERATORS.md', sha256: fileDigest('OPERATORS.md') }
    ],
    generator: 'scripts/workflow/generate-contract.js',
    generatorVersion: 1
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
  operatingLoop: [
    'Validate this contract before reading it as current truth.',
    'Use the manifest item selected by the planner; the executor may not change its risk class.',
    'Verify file identity and current live state before writes.',
    'Declare one bounded batch and stop condition.',
    'Create the IN PROGRESS schema record before Figma mutation, regenerate this contract, then start the batch guard.',
    'Mutate sequentially; stop on the first component failure before touching the next item.',
    'Run deterministic checks and inspect at least one comparison render per component.',
    'Save the comparison render and full report; show the render to the operator.',
    'Finalize the schema record, regenerate this contract, pass the finish gate, and commit with an explicit allowlist.'
  ],
  nonNegotiables: {
    additiveOnly: true,
    noInvention: true,
    sourceReadOnly: true,
    libraryDefinesConsumersReuse: true,
    oneComponentAtATimeInsidePilot: true,
    operatorVisualReviewFloor: 'Every component produces a comparison render inspected by the executor and presented to the operator.',
    allStandingRulesRequired: true
  },
  standingBatchRules: schema.standingBatchRules,
  npve: {
    spacing: {
      base: 8,
      verticalDefault: 16,
      semanticGroup: 24,
      tightRelationship: 8,
      note: 'Use 8px only for intentionally tight relationships; normal vertical separation is 16px.'
    },
    sidesheet: {
      width: 550,
      shellHeaderHeight: 72,
      shellFooterHeight: 71,
      bodyHorizontalInset: 16,
      bodyVerticalInset: 16,
      floatingRadius: 8,
      dockedEdgeRadius: 0,
      height: 'content-driven; footer immediately follows active content'
    },
    conventions: selectedConventionIds.map((id) => compactRecord(id, schema[id])),
    recentRecords,
    openFlags: openNpveFlags,
    openFlagCountInProjection: openNpveFlags.length
  }
};

contract.integrity = { contractSha256: jsonDigest(contract) };
writeJson('workflow/npve-contract.generated.json', contract);
console.log(`generated workflow/npve-contract.generated.json (${fs.statSync(path.join(ROOT, 'workflow/npve-contract.generated.json')).size} bytes)`);
