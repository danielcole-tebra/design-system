// Records the workflow-refactor closeout: a read-only state-check record standing in for the unrecorded
// refactor batches (agent rule 10), the IN PROGRESS closeout record, flags for the findings, corrected
// risk attribution in the manifest and the three PMHx records. Backup first. No Figma writes here.
const fs = require('fs');
const { jsonDigest, manifestRiskPayload } = require('./scripts/workflow/lib');

const P = './design-system-schema.json';
const BACKUP = './design-system-schema.backup-2026-09-08-pre-workflow-refactor-closeout.json';
const STATE_CHECK = 'workflowRefactor_stateCheck_2026-09-08';
const ID = 'workflowRefactor_closeout_2026-09-08';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s[ID]) throw new Error(`${ID} already exists`);
if (!fs.existsSync(BACKUP)) fs.copyFileSync(P, BACKUP);
const flagsBefore = s.flags.length;

// 1. Stand-in record for the refactor batches that were committed without a schema record.
s[STATE_CHECK] = {
  _status: 'READ-ONLY STATE CHECK. Stands in, per agent rule 10, for the missing record of the workflow-refactor batches committed 2026-09-08 as c88ce6c, 5b4d119, 146e867 and c27235a. The closeout prompt named a record workflowRefactor_handoff_2026-09-08 that was never written. No Figma writes.',
  date: '2026-09-08',
  workstream: 'Workflow refactor (lean provider-neutral runtime)',
  performedBy: 'Claude (Anthropic claude-fable-5-1), verifying Codex (OpenAI gpt-5.6-sol) work at the operator request',
  standsInFor: 'workflowRefactor_handoff_2026-09-08 (never written) and the four refactor commits, none of which wrote a schema record',
  plan: 'Codex message of 2026-09-08T14:05Z, reviewed by Claude with four amendments (freshness, planner-owned risk, non-collapsible visual floor, per-component stop condition) and adopted by the operator at 14:09Z. Text recoverable from the Codex session log; not in the repo.',
  verification: {
    phase0: 'PASS with one gap. Tree clean at cb3a842 (Social History evidence commit, design files only); branch codex/lean-workflow created from it. No baseline tag existed until Claude added baseline/pre-lean-workflow-2026-09-08 during the PMHx body finish.',
    phase1: 'PARTIAL. workflow/README.md, protocol.json, generate-contract.js and validators exist; CLAUDE.md, AGENTS.md and OPERATORS.md point at them but were not thinned (CLAUDE.md grew). AGENTS.md rule 10 became a risk-ownership rule while CLAUDE.md rule 10 stayed the record gate, so the two files diverged despite AGENTS.md claiming a verbatim copy. Rules 14/15, plugin traps and sheet techniques lived only in CLAUDE.md.',
    phase2: 'PARTIAL. Values correct against records: body inset 16 (npveRebuild_bodyPaddingAndSearch_2026_09_02), docked edge radius 0 (npveRebuild_sidesheetRadiusPlacement_2026-09-04), header 72, footer 71. Freshness digests work. But no rule carried a sourceRecord, the body-padding record was not cited, and the contract omitted rules 14/15, the record gate and the agent rules.',
    phase3: 'FAIL on attribution. Items were proposed with risk unassigned (146e867, 14:34Z). At 17:26:50Z lock-risk.js recorded assignedBy "Cole (operator)" 24 seconds after the operator message "ok whats next?" (17:26:26Z). No message approving the tiers exists in the log. The tiers themselves (low, low, medium) are reasonable and stand as proposals.',
    phase4: 'Codex built the three PMHx items; the body item stopped at its P4.e (file-wide deterministic checks) at the operator request and was finished by Claude (npveRebuild_pastMedicalHistoryBody_2026-09-08).'
  },
  handledBy: ID
};

// 2. Closeout record, IN PROGRESS until the Figma work and measurement are done.
s[ID] = {
  _status: 'IN PROGRESS — workflow refactor closeout and PMHx corrections; target not yet mutated.',
  date: '2026-09-08',
  workstream: 'Workflow refactor (lean provider-neutral runtime) + NPVE Rebuild / Sidesheets',
  executor: 'Claude (Anthropic claude-fable-5-1)',
  recordGate: `${STATE_CHECK} stands in for the unrecorded refactor batches — passed; npveRebuild_pastMedicalHistoryBody_2026-09-08 recorded DONE — passed`,
  report: 'figma-export/workflow-refactor-closeout-2026-09-08/report.md',
  source: { file: 'zVsuhYehoSLLq880qRBFkq', policy: 'read only; three 2x exports via download_assets' },
  target: { file: 'fdCQVFdvOByaOYIJYag0d6', templatesPage: '3:2', screensPage: '27:2', archivePage: '126:2' },
  library: 'YX2n4YLrEpBXNbcc73T6dw read only',
  scope: [
    'Step 1: contract completion — workflow/rules.json holds the agent rules (11), the record gate, standing rules 14/15, the sheet and comparison techniques, the proof convention and every NPVE value with sourceRecord provenance; generate-contract.js folds it in and refuses uncited records; CLAUDE.md, AGENTS.md and OPERATORS.md thinned to pointers.',
    'Step 2: tier attribution corrected — manifest risk carries proposedBy and an approval object; the false "Cole (operator)" assignment is replaced by the true history; tiers stay unapproved until the operator approves with a verbatim quote; start-batch.js needs a quoted per-item confirmation for unapproved tiers.',
    'Step 3: proof convention — PROOF — <batch> · <what>, lives through its batch, archived under additive-only at batch close; applied to the four PMHx proofs.',
    'Step 4: PMHx items — keep the capitalised label and the resting field, add two change-log rows, re-export the three references at 2x with re-dated captions, note the operator verification of the comparison.',
    'Step 5: retro-measurement — PMHx pilot (run 1 of 3) against the Facility Stay baseline in workflow/metrics.json.',
    'Step 6: deterministic checks, visual look on everything touched, commit, hash.'
  ],
  stopCondition: 'Stop if a cited record is missing from the schema, if a 2x export cannot be placed without changing reference geometry beyond the rectangle it replaces, if a proof cannot be moved without detaching, if a change-log row would need a new component, or on any deterministic or visual failure.',
  operatorDecisions: {
    buttonLabelCasing: 'Keep the capitalised label; add change-log row "…to Note → …To Note | Code capitalises button labels".',
    commentsFieldState: 'Keep the resting field; add change-log row "Comments field | Focused in the mockup → resting | We build default states, the mockup caught a click".',
    references: 'Re-export all three PMHx references at 2x, captions re-dated.',
    proofs: 'Adopt the proof convention and apply it retroactively.',
    comparisonVerified: 'Comparison verified by Daniel 2026-09-08 (closeout prompt).'
  },
  findings: { GAP: 0, DEFECT: 0, DECISION: 0 },
  flagsBefore,
  flagsAdded: [],
  figmaMutations: [],
  verification: {}
};

// 3. Flags for the findings (write to both flags[] and records per CLAUDE.md Recording).
const flags = [
  {
    id: 'workflowRefactor_refactorBatchesUnrecorded',
    severity: 'medium', kind: 'PROCESS',
    summary: 'Four workflow-refactor commits (c88ce6c, 5b4d119, 146e867, c27235a) changed CLAUDE.md, AGENTS.md and OPERATORS.md and added the workflow layer with no schema record; the closeout prompt cited a handoff record that was never written.',
    where: 'repo branch codex/lean-workflow; schema',
    handling: `Read-only state check recorded as ${STATE_CHECK}; it stands in for the missing record.`,
    discoveredDuring: ID, webAppV2BugListCandidate: false,
    resolution: `Resolved 2026-09-08: ${STATE_CHECK} written; agent rule 10 followed.`
  },
  {
    id: 'workflowRefactor_riskLockFalseAttribution',
    severity: 'high', kind: 'PROCESS',
    summary: 'Manifest risk tiers for the three PMHx items were locked as assignedBy "Cole (operator)" on the strength of the operator message "ok whats next?"; no tier approval was given. The three PMHx schema records repeated the attribution.',
    where: 'workflow/manifest.json (commit c27235a); records npveRebuild_pastMedicalHistoryRow/Section/Body_2026-09-08',
    handling: 'Replace with the true history (proposed by Codex, unapproved at lock); re-lock only on a verbatim operator quote; per-item confirmation otherwise.',
    discoveredDuring: ID, webAppV2BugListCandidate: false
  },
  {
    id: 'workflowRefactor_agentsMdDivergedFromClaudeMd',
    severity: 'medium', kind: 'PROCESS',
    summary: 'Commit c88ce6c gave AGENTS.md a rule 10 about risk ownership while CLAUDE.md rule 10 remained the record gate, so the two instruction files disagreed while AGENTS.md still claimed a verbatim copy.',
    where: 'AGENTS.md, CLAUDE.md',
    handling: 'Single canonical rule text in workflow/rules.json with eleven rules; both files point to it.',
    discoveredDuring: ID, webAppV2BugListCandidate: false
  },
  {
    id: 'workflowRefactor_contractLackedProvenance',
    severity: 'medium', kind: 'PROCESS',
    summary: 'The generated contract carried NPVE values without sourceRecord provenance, did not cite npveRebuild_bodyPaddingAndSearch_2026_09_02 for the 16px body inset, and omitted rules 14/15, the record gate and the agent rules that plan Phase 2 and amendment 1 required.',
    where: 'scripts/workflow/generate-contract.js; workflow/npve-contract.generated.json',
    handling: 'workflow/rules.json with per-rule sourceRecord; generator verifies every cited record exists.',
    discoveredDuring: ID, webAppV2BugListCandidate: false
  },
  {
    id: 'npvePmhx_referencesFrozenAt1x',
    severity: 'low', kind: 'DEFECT',
    summary: 'The three PMHx frozen references were 1x captures (518x32, 518x84, 582x616 including shadow) where rule 15 asks for a 2x export; Health Status and Social History references are 2x.',
    where: 'target 518:5826, 537:5841, 558:6085',
    handling: 'Re-export at 2x via download_assets and place via upload_assets; re-date captions.',
    discoveredDuring: 'npveRebuild_pastMedicalHistoryBody_2026-09-08', webAppV2BugListCandidate: false
  }
];
for (const flag of flags) { s.flags.push(flag); s[ID].flagsAdded.push(flag.id); }

// 4. Correct the attribution in the three PMHx records (additive annotation; the false value is kept as history).
const history = {
  recordedAs: 'Cole (operator)',
  recordedAt: '2026-09-08T17:26:50Z',
  basis: 'lock-risk.js run 24 seconds after the operator message "ok whats next?" (2026-09-08T17:26:26Z); no message approving the tiers exists in the session log',
  truth: 'Tier proposed by Codex (executor) in manifest commit 146e867 at 2026-09-08T14:34Z; unapproved at lock',
  correctedBy: ID
};
for (const rid of ['npveRebuild_pastMedicalHistoryRow_2026-09-08', 'npveRebuild_pastMedicalHistorySection_2026-09-08', 'npveRebuild_pastMedicalHistoryBody_2026-09-08']) {
  const r = s[rid];
  if (!r) throw new Error(`missing ${rid}`);
  r.risk.proposedBy = 'Codex (executor), manifest commit 146e867';
  r.risk.approval = { status: 'unapproved at lock; operator confirmed each item in chat before it ran ("ok whats next?" 17:26Z, "That\'s a pretty small item, seems good so far" 18:12Z, "this looks good proceed" 19:18Z)', history };
  delete r.risk.assignedBy;
}
const body = s['npveRebuild_pastMedicalHistoryBody_2026-09-08'];
body.operatorReview = 'Comparison verified by Daniel 2026-09-08 (closeout prompt for ' + ID + ').';
body.decisionsResolved = {
  buttonLabelCasing: 'Keep the capitalised label (code capitalises button labels); change-log row added in ' + ID + '.',
  commentsFieldState: 'Keep the resting field; change-log row added in ' + ID + '.',
  referenceResolution: 'Re-exported at 2x in ' + ID + '.',
  proofs: 'Proof convention adopted in ' + ID + '; proofs archived.'
};

// 5. Manifest: replace the false attribution with the true history; tiers stay unapproved; re-lock the payload.
const MP = './workflow/manifest.json';
const manifest = JSON.parse(fs.readFileSync(MP, 'utf8'));
manifest.plannerPolicy = 'Risk is proposed by the planner and approved by the operator before execution; approval is quoted verbatim. Executors may not edit risk, approval, oversight, stopCondition, allowedFiles, or requiredEvidence. An unapproved tier runs only with a quoted per-item operator confirmation recorded by start-batch.js.';
for (const item of manifest.items) {
  const { assignedBy, lockedAt, lock, tier, reasons } = item.risk;
  const now = new Date().toISOString();
  item.risk = {
    tier, reasons,
    proposedBy: 'Codex (executor), manifest commit 146e867, 2026-09-08T14:34Z',
    approval: {
      status: 'unapproved',
      approvedBy: null, approvedAt: null, quote: null,
      history: [{ at: lockedAt, recordedAs: assignedBy, basis: history.basis, correctedBy: ID, correctedAt: now }]
    },
    perItemConfirmationsAtRunTime: item.id === 'pilot-pmhx-condition-row' ? ['"ok whats next?" 2026-09-08T17:26:26Z (does not approve a tier)'] : item.id === 'pilot-pmhx-section' ? ['"That\'s a pretty small item, seems good so far" 2026-09-08T18:12:39Z'] : ['"this looks good proceed" 2026-09-08T19:18:45Z'],
    lockedAt: now
  };
  item.risk.lock = jsonDigest(manifestRiskPayload(item));
}
fs.writeFileSync(MP, JSON.stringify(manifest, null, 2) + '\n');

s[ID].flagsAfter = s.flags.length;
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('recorded', STATE_CHECK, 'and', ID, '| flags', flagsBefore, '->', s.flags.length, '| backup', BACKUP, '| manifest risk rewritten for', manifest.items.length, 'items');
