// Opens record npveRebuild_moduleChipFix_2026-09-08 and its manifest item for the re-run of the superseding
// module chip fix prompt (2026-09-06 16:48 crop review) under the lean workflow. Backup first. No Figma writes.
const fs = require('fs');
const { jsonDigest, manifestRiskPayload } = require('./scripts/workflow/lib');

const P = './design-system-schema.json';
const BACKUP = './design-system-schema.backup-2026-09-08-pre-npve-module-chip-fix.json';
const ID = 'npveRebuild_moduleChipFix_2026-09-08';
const PREVIOUS = 'npveRebuild_noteHeaderLayout_2026-09-08';
const DIR = 'figma-export/npve-module-chip-fix-2026-09-08';
const ITEM = 'npve-module-chip-fix-2026-09-08';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s[ID]) throw new Error(`${ID} already exists`);
if (!String(s[PREVIOUS]._status || '').startsWith('DONE')) throw new Error(`Record gate failed: ${PREVIOUS} is not DONE`);
if (!fs.existsSync(BACKUP)) fs.copyFileSync(P, BACKUP);

const MP = './workflow/manifest.json';
const m = JSON.parse(fs.readFileSync(MP, 'utf8'));
if (m.items.some((i) => i.id === ITEM)) throw new Error(`manifest already has ${ITEM}`);
const item = {
  id: ITEM,
  title: 'Encounter page · Module chip masters — re-run of the superseding crop-review prompt',
  workstream: 'NPVE Rebuild / Encounter page',
  status: 'queued',
  dependsOn: [],
  source: { fileKey: 'zVsuhYehoSLLq880qRBFkq', nodeId: '4841:17077', label: 'Rec_Ready; Module strip 4841:17097', access: 'read-only' },
  target: { fileKey: 'fdCQVFdvOByaOYIJYag0d6', templatesPageId: '3:2', screensPageId: '27:2', name: 'Module chip 426:4213, Module strip 426:4214, encounter comparison 434:7474' },
  expectedRecordId: ID,
  scope: 'Run the 2026-09-06 16:48 superseding module chip fix prompt as written: measure the source chip (icon ink, close size, gaps); one teal ink family bound to the matching token; small thin close; space/16 internal gaps recorded as the operator\'s deliberate improvement; variant anatomy enforced; strip re-placed in source order; crop-compare at 1x; change-log rows verbatim; all ten rules.',
  risk: {
    tier: 'medium',
    reasons: ['Touches a reusable local master (Module chip set) with live strip and comparison instances', 'Follows a recorded convention with bounded impact', 'One step of the prompt (uniform space/16 internal gaps) reverses a later recorded decision (npveRebuild_moduleChipRelationshipSpacing_2026-09-06, identity gap space/8); that step is treated as a human decision inside the item and stops for the operator instead of mutating'],
    proposedBy: 'Claude (planner proposal), post-pilot close batch, 2026-09-08',
    approval: { status: 'unapproved', approvedBy: null, approvedAt: null, quote: null, history: [] }
  },
  oversight: ['Executor crop-compare of the strip at 1x shown to the operator', 'Deterministic validation after any mutation; pixel-diff of the placed comparison after any master edit'],
  stopCondition: 'Stop before any master mutation that reverses a recorded operator decision (the space/8 identity gap) and present it as a decision. Stop on identity mismatch, a token that cannot be verified, or any drawn stand-in.',
  allowedFiles: ['design-system-schema.json', BACKUP.slice(2), 'apply-npve-module-chip-fix-2026-09-08.js', 'finalize-npve-module-chip-fix-2026-09-08.js', `${DIR}/**`, 'workflow/npve-contract.generated.json', 'workflow/manifest.json'],
  requiredEvidence: { audit: `${DIR}/audit-module-chip-fix.json`, report: `${DIR}/report.md`, comparisonRender: `${DIR}/comparison-module-strip-reference-vs-rebuild.png` }
};
item.risk.lockedAt = new Date().toISOString();
item.risk.lock = jsonDigest(manifestRiskPayload(item));
m.items.push(item);
fs.writeFileSync(MP, JSON.stringify(m, null, 2) + '\n');

s[ID] = {
  _status: 'IN PROGRESS — re-run of the superseding module chip fix prompt opened under the lean workflow; source measured, target not yet mutated.',
  date: '2026-09-08',
  workstream: 'NPVE Rebuild / Encounter page',
  manifestItem: ITEM,
  executor: 'Claude (Anthropic claude-fable-5-1)',
  supersedingPrompt: 'Chat record 2026-09-06T16:48Z: "Module chip masters correction — Daniel\'s crop review, superseding the earlier moduleChipFix draft" (steps: measure source chip; one ink family bound to the matching token; close rebuilt to source scale; internal gaps space/16 as a deliberate improvement; variant anatomy; strip re-placed in source order; crop-compare at 1x; two verbatim change-log rows; ten rules). First executed as npveRebuild_moduleChipFix_2026-09-06; its uniform-gap detail was then superseded by npveRebuild_moduleChipRelationshipSpacing_2026-09-06.',
  recordGate: `${PREVIOUS} recorded DONE — passed; contract validated (validate-workflow PASS) before reading`,
  report: `${DIR}/report.md`,
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only (Rec_Ready 4841:17077, Module strip 4841:17097)',
  stopCondition: item.stopCondition,
  findings: { GAP: 0, DEFECT: 0, DECISION: 0 },
  flagsBefore: s.flags.length,
  flagsAfter: s.flags.length,
  flagsAdded: [],
  figmaMutations: []
};
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('recorded', ID, '| manifest item', ITEM, 'queued (unapproved; start with --confirm) | backup', BACKUP);
