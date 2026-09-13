// Records the combined lean-pilot batch (runs 2 and 3) at its Step 0 stop: two sidesheet-body items selected and
// proposed in the manifest with unapproved tiers, awaiting the operator's per-item confirmation. Backup first.
// No Figma writes.
const fs = require('fs');

const P = './design-system-schema.json';
const BACKUP = './design-system-schema.backup-2026-09-08-pre-lean-pilot-run2-3.json';
const ID = 'leanPilot_run2-3_2026-09-08';
const PREVIOUS = 'workflowRefactor_tierApproval_2026-09-08';
const DIR = 'figma-export/lean-pilot-run2-3-2026-09-08';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s[ID]) throw new Error(`${ID} already exists`);
if (!String(s[PREVIOUS]._status || '').startsWith('DONE')) throw new Error(`Record gate failed: ${PREVIOUS} is not DONE`);
if (!fs.existsSync(BACKUP)) fs.copyFileSync(P, BACKUP);

const items = [
  {
    id: 'pilot2-hospitalizations-edit',
    title: 'External Care History · Hospitalizations edit form',
    status: 'proposed',
    dependsOn: [],
    source: { fileKey: 'zVsuhYehoSLLq880qRBFkq', nodeId: '129:8401', label: 'Page=Clin_ExternalCare-HEdit', access: 'read-only' },
    target: { fileKey: 'fdCQVFdvOByaOYIJYag0d6', templatesPageId: '3:2', screensPageId: '27:2', name: 'Hospitalizations edit' },
    expectedRecordId: ID,
    scope: 'Build one reusable 518px Hospitalizations edit body on the approved Facility Stay edit-form pattern (Form surface token, 16px rhythm, published Text field, Tabs, Chip, Button, Icon button/TrashOutlined, the existing date-field GAP wrapper, and the Allergy severity selector precedent for the Status chip); append it to the shared Sidesheet Body content; one content-driven sheet, one frozen 2x reference, one plain-language change log, one comparison.',
    risk: {
      tier: 'medium',
      reasons: ['New content built inside the established shell', 'Appends a preferred value to the shared Sidesheet API', 'Reuses the Facility Stay form pattern and two recorded GAP patterns; no unresolved design decision found in the read-only survey'],
      proposedBy: 'Claude (planner proposal), Step 0 of the combined lean pilot, 2026-09-08',
      approval: { status: 'unapproved', approvedBy: null, approvedAt: null, quote: null, history: [] }
    },
    oversight: ['Dedicated reference/rebuild/change comparison inspected by the executor and shown to the operator', 'Deterministic validation immediately after the mutation; failure stops the batch before item 2'],
    stopCondition: 'Stop before mutation on identity mismatch, a control with no published mapping and no recorded GAP pattern, any shared default or geometry change, or a new design decision. Stop the batch on any deterministic or visual failure before item 2 mutates.',
    allowedFiles: ['design-system-schema.json', 'design-system-schema.backup-2026-09-08-pre-lean-pilot-run2-3.json', 'apply-lean-pilot-run2-3.js', 'finalize-lean-pilot-run2-3.js', `${DIR}/**`, 'workflow/npve-contract.generated.json', 'workflow/manifest.json', 'workflow/metrics.json'],
    requiredEvidence: { audit: `${DIR}/audit-hospitalizations-edit.json`, report: `${DIR}/report.md`, comparisonRender: `${DIR}/comparison-hospitalizations-edit.png` }
  },
  {
    id: 'pilot2-procedures-edit',
    title: 'Procedures/Surgical History · Edit Event form',
    status: 'proposed',
    dependsOn: ['pilot2-hospitalizations-edit'],
    source: { fileKey: 'zVsuhYehoSLLq880qRBFkq', nodeId: '129:8651', label: 'Page=ClinProSH_Edit', access: 'read-only' },
    target: { fileKey: 'fdCQVFdvOByaOYIJYag0d6', templatesPageId: '3:2', screensPageId: '27:2', name: 'Procedures edit' },
    expectedRecordId: ID,
    scope: 'Build one reusable 518px Procedures edit body on the same edit-form pattern (Procedure Code field, Status chip via the severity-selector precedent, Related to problem, Facility Name, Comments); append it to the shared Sidesheet Body content; one content-driven sheet, one frozen 2x reference, one plain-language change log, one comparison.',
    risk: {
      tier: 'medium',
      reasons: ['New content built inside the established shell', 'Appends a preferred value to the shared Sidesheet API', 'Same control set as item 1 minus tabs and dates; the Status chip needs the recorded GAP pattern, not a new decision'],
      proposedBy: 'Claude (planner proposal), Step 0 of the combined lean pilot, 2026-09-08',
      approval: { status: 'unapproved', approvedBy: null, approvedAt: null, quote: null, history: [] }
    },
    oversight: ['Dedicated reference/rebuild/change comparison inspected by the executor and shown to the operator', 'Runs only after item 1 passes deterministic validation'],
    stopCondition: 'Same as item 1; additionally, do not start if item 1 failed validation.',
    allowedFiles: ['design-system-schema.json', 'design-system-schema.backup-2026-09-08-pre-lean-pilot-run2-3.json', 'apply-lean-pilot-run2-3.js', 'finalize-lean-pilot-run2-3.js', `${DIR}/**`, 'workflow/npve-contract.generated.json', 'workflow/manifest.json', 'workflow/metrics.json'],
    requiredEvidence: { audit: `${DIR}/audit-procedures-edit.json`, report: `${DIR}/report.md`, comparisonRender: `${DIR}/comparison-procedures-edit.png` }
  }
];

const MP = './workflow/manifest.json';
const manifest = JSON.parse(fs.readFileSync(MP, 'utf8'));
for (const item of items) { if (manifest.items.some((i) => i.id === item.id)) throw new Error(`manifest already has ${item.id}`); manifest.items.push(item); }
fs.writeFileSync(MP, JSON.stringify(manifest, null, 2) + '\n');

s[ID] = {
  _status: 'IN PROGRESS — stopped at Step 0 awaiting the operator\'s per-item confirmation of two proposed medium-risk items; target not yet mutated.',
  date: '2026-09-08',
  workstream: 'NPVE Rebuild / Sidesheets — lean pilot runs 2 and 3 (combined, Phase 7 shape)',
  executor: 'Claude (Anthropic claude-fable-5-1)',
  recordGate: `${PREVIOUS} recorded DONE — passed; contract freshness validated (validate-workflow PASS) before reading`,
  report: `${DIR}/report.md`,
  step0: {
    authorization: 'The batch prompt carried no tier approval, so the executor selected two items, proposed their classes, and stopped.',
    surveyed: 'Source Sidesheetv3 129:6647 (55 variants) read against the thirteen rebuilt source nodes in existing npveRebuild records. Visible, unbuilt, 550-wide, sidesheet-body-shaped candidates: Hospitalizations edit 129:8401, Allergies edit 129:7826, Family History edit 129:12486, Procedures edit 129:8651, Flowsheets 939:9228 (table-shaped, rejected), Psychotherapy Note 129:7614 (rich-text toolbar, rejected), Vitals family (441 wide, chart shapes, rejected).',
    selected: [
      'pilot2-hospitalizations-edit — 129:8401 Page=Clin_ExternalCare-HEdit, 550x606; proposed medium.',
      'pilot2-procedures-edit — 129:8651 Page=ClinProSH_Edit, 550x498; proposed medium.'
    ],
    why: 'Both are Edit Event forms on the Facility Stay pattern already approved (Form surface token, 16px rhythm, date-field GAP wrapper, 42px Form control label rows). Their controls map to published Text field, Tabs, Chip, Button, Icon button and icons; the one control without a library mapping, the Status dropdown chip, follows the recorded Allergy severity selector precedent with a GAP marker. Matched scope against the Facility Stay baseline for the measurement.',
    nextInQueue: 'Allergies edit 129:7826 and Family History edit 129:12486 (autocomplete, radios, chips) are the next ready items after these two.'
  },
  manifestItems: items.map((i) => i.id),
  source: { file: 'zVsuhYehoSLLq880qRBFkq', policy: 'read only; two 2x exports via download_assets when the build starts' },
  target: { file: 'fdCQVFdvOByaOYIJYag0d6', templatesPage: '3:2', screensPage: '27:2' },
  library: 'YX2n4YLrEpBXNbcc73T6dw read only',
  stopCondition: 'Stop at Step 0 until the operator confirms each item. During the build: stop before item 2 mutates on any deterministic or visual failure in item 1.',
  findings: { GAP: 0, DEFECT: 0, DECISION: 0 },
  flagsBefore: s.flags.length,
  flagsAfter: s.flags.length,
  flagsAdded: [],
  figmaMutations: []
};
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('recorded', ID, '| backup', BACKUP, '| manifest items', manifest.items.length);
