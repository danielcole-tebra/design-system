// Records the operator's approval of the risk classes and of the three PMHx tiers as proposed, and adds the
// fourth class (human-decision) to the runtime. Repo writes only; no Figma file opened.
const fs = require('fs');

const P = './design-system-schema.json';
const BACKUP = './design-system-schema.backup-2026-09-08-pre-workflow-tier-approval.json';
const ID = 'workflowRefactor_tierApproval_2026-09-08';
const PREVIOUS = 'workflowRefactor_closeout_2026-09-08';
const QUOTE = 'I approve the risk tiers as proposed: low, medium, high, human-decision, with the definitions in the manifest.';

const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s[ID]) throw new Error(`${ID} already exists`);
if (!String(s[PREVIOUS]._status || '').startsWith('DONE')) throw new Error(`Record gate failed: ${PREVIOUS} is not DONE`);
if (!fs.existsSync(BACKUP)) fs.copyFileSync(P, BACKUP);

// protocol.json: the fourth class and the approval
const pp = 'workflow/protocol.json';
const protocol = JSON.parse(fs.readFileSync(pp, 'utf8'));
protocol.risk['human-decision'] = 'Multiple defensible design choices remain. The item cannot start; the executor presents the options with a recommendation and stops for the operator, who re-tiers it as low, medium, or high.';
protocol.minimumOversight['human-decision'] = ['operator decision before the item can be queued'];
protocol.riskApproval = { by: 'Daniel (operator)', at: '2026-09-08', quote: QUOTE, record: ID, note: 'The definitions live in this file; the manifest points here.' };
fs.writeFileSync(pp, JSON.stringify(protocol, null, 2) + '\n');

// manifest: point at the definitions
const mp = 'workflow/manifest.json';
const manifest = JSON.parse(fs.readFileSync(mp, 'utf8'));
manifest.riskClasses = `low, medium, high, human-decision — defined in workflow/protocol.json → risk; approved by the operator 2026-09-08 (record ${ID})`;
fs.writeFileSync(mp, JSON.stringify(manifest, null, 2) + '\n');

// validate-manifest.js: accept human-decision, never let it run
const vp = 'scripts/workflow/validate-manifest.js';
let v = fs.readFileSync(vp, 'utf8');
const vOld = "if (!['low', 'medium', 'high'].includes(risk.tier)) errors.push(`${item.id}: invalid risk tier`);";
if (!v.includes(vOld)) throw new Error('validate-manifest anchor missing');
v = v.replace(vOld, "if (!['low', 'medium', 'high', 'human-decision'].includes(risk.tier)) errors.push(`${item.id}: invalid risk tier`);\n    if (risk.tier === 'human-decision' && !['proposed', 'stopped'].includes(item.status)) errors.push(`${item.id}: a human-decision item cannot be queued, active, or complete; the operator decides first`);");
fs.writeFileSync(vp, v);

// start-batch.js: refuse to start a human-decision item
const sp = 'scripts/workflow/start-batch.js';
let sb = fs.readFileSync(sp, 'utf8');
const sOld = "if (item.status !== 'queued') throw new Error(`${itemId} is ${item.status}, not queued`);";
if (!sb.includes(sOld)) throw new Error('start-batch anchor missing');
sb = sb.replace(sOld, sOld + "\nif (item.risk.tier === 'human-decision') throw new Error(`${itemId} is a human-decision item: present the options to the operator and stop; it starts only after the operator re-tiers it`);");
fs.writeFileSync(sp, sb);

// lock-risk.js: --retroactive for complete items
const lp = 'scripts/workflow/lock-risk.js';
let l = fs.readFileSync(lp, 'utf8');
const l1 = "const [itemId, approver, ...quoteParts] = process.argv.slice(2);";
const l2 = "if (!['proposed', 'queued', 'stopped'].includes(item.status)) throw new Error(`${itemId} must be proposed, queued, or stopped before risk is locked`);";
const l3 = "item.status = 'queued';";
for (const a of [l1, l2, l3]) if (!l.includes(a)) throw new Error('lock-risk anchor missing: ' + a.slice(0, 40));
l = l.replace(l1, "const retroactive = process.argv.includes('--retroactive');\nconst [itemId, approver, ...quoteParts] = process.argv.slice(2).filter((arg) => arg !== '--retroactive');");
l = l.replace(l2, "if (!retroactive && !['proposed', 'queued', 'stopped'].includes(item.status)) throw new Error(`${itemId} must be proposed, queued, or stopped before risk is locked (pass --retroactive to record an operator approval on a complete item)`);\nif (retroactive && item.status !== 'complete') throw new Error(`--retroactive is only for complete items; ${itemId} is ${item.status}`);");
l = l.replace(l3, "if (retroactive) item.risk.approval.retroactive = true; else item.status = 'queued';");
fs.writeFileSync(lp, l);

// rules.json: rule 11 names the four classes
const rp = 'workflow/rules.json';
const rules = JSON.parse(fs.readFileSync(rp, 'utf8'));
const rule11 = rules.agentRules.rules.find((x) => x.n === 11);
rule11.text = "Risk is planner/operator-owned, never executor-owned. Classes are low, medium, high and human-decision as defined in workflow/protocol.json. A manifest tier counts as approved only when the operator's approval is quoted verbatim in the manifest and the record; an unapproved tier lets an item proceed only with per-item operator confirmation, also quoted; a human-decision item does not start until the operator decides. Deterministic gates may compress checks, but every component still gets a comparison render inspected by the executor and shown to the operator.";
rule11.sourceRecord = ['workflowRefactor_closeout_2026-09-08', ID];
fs.writeFileSync(rp, JSON.stringify(rules, null, 2) + '\n');

// schema record and annotations
s[ID] = {
  _status: 'DONE. Documentation batch. Operator approval of the four risk classes and of the three PMHx tiers recorded verbatim; human-decision added to protocol.json; retroactive locks written for the three complete items. No Figma file opened or written.',
  date: '2026-09-08',
  workstream: 'Workflow refactor (lean provider-neutral runtime)',
  executor: 'Claude (Anthropic claude-fable-5-1)',
  recordGate: `${PREVIOUS} recorded DONE — passed`,
  report: 'figma-export/workflow-tier-approval-2026-09-08/report.md',
  operatorApproval: { by: 'Daniel (operator)', at: '2026-09-08', quote: QUOTE, channel: 'chat reply to the closeout report' },
  interpretation: 'The quote approves the four risk classes and the tiers as proposed for the three PMHx items (low, low, medium). It says "definitions in the manifest"; the definitions live in workflow/protocol.json and the manifest now points there. The fourth class, human-decision, was in the 2026-09-08 plan but absent from protocol.json until this record.',
  scope: [
    'workflow/protocol.json: human-decision class and oversight added; approval quoted.',
    'workflow/manifest.json: riskClasses pointer; the three items locked with the quote through lock-risk.js --retroactive.',
    'validate-manifest.js accepts human-decision and refuses to let such an item be queued, active, or complete; start-batch.js refuses to start one; lock-risk.js gains --retroactive for complete items.',
    'workflow/rules.json rule 11 names the four classes; contract regenerated.'
  ],
  stopCondition: 'Repo writes only; stop if any validator fails after the locks.',
  findings: { GAP: 0, DEFECT: 0, DECISION: 0 },
  flagsBefore: s.flags.length,
  flagsAfter: s.flags.length,
  flagsAdded: [],
  figmaMutations: []
};
s[PREVIOUS].tierApproval.status = `approved 2026-09-08 — see ${ID}`;
for (const rid of ['npveRebuild_pastMedicalHistoryRow_2026-09-08', 'npveRebuild_pastMedicalHistorySection_2026-09-08', 'npveRebuild_pastMedicalHistoryBody_2026-09-08']) {
  s[rid].risk.approval.status = `approved retroactively 2026-09-08 by Daniel (operator): "${QUOTE}" — record ${ID}`;
}
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('recorded', ID, '| backup', BACKUP, '| protocol, manifest, validators, lock-risk, rules updated');
