const fs = require('fs');
const path = require('path');
const { ROOT, fileDigest, jsonDigest, readJson, store, writeJson } = require('./lib');

// The register is the append-only store; the aggregate is generated from it and must be fresh before it is
// projected into the contract. A stale aggregate means someone wrote a record without rebuilding.
const stale = store.checkFreshness();
if (stale.length) throw new Error(`Generated files are stale (${stale.join(', ')}); run node scripts/schema/build-aggregate.js first`);
const loaded = store.loadStore();
const schema = store.buildAggregate(loaded);
const recordIndex = readJson(store.PATHS.recordIndex);
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
  const entry = recordIndex.records.find((candidate) => candidate.id === id);
  return {
    id,
    path: entry ? entry.path : null,
    status: record._status || record.status || null,
    date: record.date || null,
    outcome: record.outcome || record.summary || record.decisionApplied || null,
    geometry: record.geometry || null,
    decision: record.decisionApplied || record.decision || null,
    report: record.report || null,
    target: record.target || null
  };
}

// Every sourceRecord named in rules.json must exist in the store, or the contract is citing nothing.
const citedIds = new Set();
JSON.stringify(rules, (key, value) => {
  if (key === 'sourceRecord') (Array.isArray(value) ? value : [value]).forEach((id) => citedIds.add(id));
  return value;
});
const missingCitations = [...citedIds].filter((id) => !schema[id]);
if (missingCitations.length) throw new Error(`rules.json cites records missing from the store: ${missingCitations.join(', ')}`);

const npveKeys = recordIndex.records.filter((entry) => entry.workstream === 'npve' || entry.workstream === 'workflow').map((entry) => entry.id);
const recentRecords = npveKeys.slice(-12).map((id) => compactRecord(id, schema[id]));
const openNpveFlags = loaded.flags.active.entries.map((entry) => entry.flag).filter((flag) => /npve|workflowRefactor/i.test(JSON.stringify(flag))).slice(-20).map((flag) => ({
  id: flag.id || flag.name || null,
  severity: flag.severity || flag.status || null,
  summary: flag.summary || flag.detail || flag.issue || null,
  discoveredDuring: flag.discoveredDuring || null
}));

const values = Object.fromEntries(rules.npve.values.map((rule) => [rule.id, rule.value]));
const currentState = readJson(store.PATHS.currentState);

const contract = {
  format: 'tebra.design-workflow-contract',
  version: 3,
  generatedAt: new Date().toISOString(),
  source: {
    schema: { path: 'design-system-schema.json', sha256: fileDigest('design-system-schema.json'), note: 'generated aggregate; the register is the store below' },
    store: {
      recordIndex: { path: store.PATHS.recordIndex, sha256: fileDigest(store.PATHS.recordIndex) },
      currentState: { path: store.PATHS.currentState, sha256: fileDigest(store.PATHS.currentState) },
      flagsActive: { path: store.PATHS.flagsActive, sha256: fileDigest(store.PATHS.flagsActive) },
      flagsResolved: { path: store.PATHS.flagsResolved, sha256: fileDigest(store.PATHS.flagsResolved) },
      layout: { path: store.PATHS.layout, sha256: fileDigest(store.PATHS.layout) },
      records: recordIndex.counts.records,
      flags: { active: recordIndex.flags.active, resolved: recordIndex.flags.resolved }
    },
    instructions: [
      { path: 'workflow/rules.json', sha256: fileDigest('workflow/rules.json') },
      { path: 'CLAUDE.md', sha256: fileDigest('CLAUDE.md') },
      { path: 'AGENTS.md', sha256: fileDigest('AGENTS.md') },
      { path: 'OPERATORS.md', sha256: fileDigest('OPERATORS.md') },
      { path: rules.executionPolicy.path, sha256: fileDigest(rules.executionPolicy.path) },
      { path: '.github/copilot-instructions.md', sha256: fileDigest('.github/copilot-instructions.md') }
    ],
    generator: 'scripts/workflow/generate-contract.js',
    generatorVersion: 3,
    citedRecordsPresent: citedIds.size
  },
  recordStore: {
    layout: 'records/<workstream>/<date>/<recordId>.json (one file per batch record, immutable once its status leaves IN PROGRESS); flags/active.json and flags/resolved.json (the flag register split by status); foundation/<section>.json (meta, tokens, components, standing batch rules and the other non-record sections); indexes/record-index.json and indexes/current-state.json (generated, never hand-edited); design-system-schema.json (generated legacy aggregate).',
    concurrency: 'Concurrent batches write separate record files and never touch shared files except the generated indexes, which regenerate at commit.',
    backupPolicy: 'Policy B (record backupPolicyB_2026-09-08, operator decision quoted there): the backup is the immutable record files in git plus milestone tags (scripts/schema/milestone.js) at each workstream close or weekly, whichever comes first; validate-split fails when the latest milestone is older than seven days. No per-batch copy of the aggregate is taken any more; the 90 historical backup files stay as history.',
    howToRecord: 'An apply-*.js script opens the record with scripts/schema/lib.js openRecord (record gate: the previous record in the workstream must be DONE in indexes/record-index.json); a finalize-*.js script closes it with finalizeRecord; both regenerate the aggregate and indexes. New findings go to flags/active.json through appendFlags; a resolution moves an entry to flags/resolved.json through resolveFlag. Never edit a record file by hand, and never edit a DONE record.',
    readRecord: 'Find a record by id in indexes/record-index.json and read the file at its path. The last record of a workstream is in indexes/current-state.json byWorkstream.<ws>.latest.',
    sourceRecord: 'schemasplit_phase8_2026-09-08'
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
  executionPolicy: { ...rules.executionPolicy, text: fs.readFileSync(path.join(ROOT, rules.executionPolicy.path), 'utf8') },
  operatingLoop: [
    'Validate this contract before reading it as current truth.',
    'Record gate: confirm the previous batch in the workstream has a DONE record in indexes/record-index.json; if not, refuse and run a read-only state check whose record stands in.',
    'Use the manifest item selected by the planner; the executor may not change its risk class. An unapproved tier needs per-item operator confirmation, quoted verbatim.',
    'Verify file identity and current live state before writes.',
    'Declare one bounded batch and stop condition.',
    'Open the IN PROGRESS record as a new file under records/ (apply-*.js via openRecord) before Figma mutation, regenerate this contract, then start the batch guard.',
    'Verify the next milestone mappings and save execution.json before start. Mutate sequentially, verify visible milestones, and use bounded evidence-based recovery; stop the failed operation before extending dependent work.',
    'Run deterministic checks and inspect at least one comparison render per component.',
    'Save the comparison render and full report; show the render to the operator.',
    'Archive the batch proofs per proofConvention, finalize the record (finalize-*.js via finalizeRecord), regenerate this contract, pass the finish gate, and commit with an explicit allowlist. At a workstream close, or when a week has passed since the last milestone, create a milestone tag on the committed tree.'
  ],
  nonNegotiables: {
    additiveOnly: true,
    noInvention: true,
    sourceReadOnly: true,
    libraryDefinesConsumersReuse: true,
    oneComponentAtATimeInsidePilot: true,
    recordsImmutable: 'A record file is never edited once its status leaves IN PROGRESS; a later batch that must annotate an earlier record writes the annotation in its own record.',
    riskPlannerOwned: 'Tiers are approved by the operator with a verbatim quote; executors never assign or lower them.',
    operatorVisualReviewFloor: 'Every component produces a comparison render inspected by the executor and presented to the operator.',
    allStandingRulesRequired: true
  },
  standingBatchRules: schema.standingBatchRules,
  currentState: {
    latestRecord: currentState.latestRecord,
    recordGate: currentState.recordGate,
    byWorkstream: currentState.byWorkstream
  },
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
console.log(`generated workflow/npve-contract.generated.json (${fs.statSync(path.join(ROOT, 'workflow/npve-contract.generated.json')).size} bytes; ${citedIds.size} cited records verified; ${recordIndex.counts.records} records in the store)`);
