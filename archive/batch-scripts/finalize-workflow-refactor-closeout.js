// Finalizes workflowRefactor_closeout_2026-09-08 after the Figma work, deterministic checks and visual inspection.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'workflowRefactor_closeout_2026-09-08';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const r = s[ID];
if (!r || !String(r._status || '').startsWith('IN PROGRESS')) throw new Error(`${ID} is not IN PROGRESS`);

r._status = 'DONE. Contract completed with provenance (workflow/rules.json), instruction files thinned to pointers, risk attribution corrected and tiers left unapproved pending a quoted operator approval, proof convention adopted and applied, PMHx change log extended by two rows, three references re-exported at 2x with re-dated captions, four proofs archived, pilot run 1 measured against the Facility Stay baseline, ten standing rules run.';
r.outcome = [
  'Step 1: workflow/rules.json holds the eleven agent rules, the record gate, standing rules 14 and 15, the sheet and comparison techniques, the proof convention and 24 NPVE values, each with sourceRecord provenance (24 cited records verified present by the generator). CLAUDE.md, AGENTS.md and OPERATORS.md now point at it; CLAUDE.md shrank from 10,593 to 8,443 bytes, AGENTS.md from 3,229 to 2,036.',
  'Step 2: manifest risk objects carry proposedBy (Codex, commit 146e867) and approval {status: unapproved, quote: null, history}. The false "Cole (operator)" assignment is kept as history with its basis. No approval arrived with this batch, so all three tiers stay unapproved; lock-risk.js now requires a verbatim quote and start-batch.js requires --confirm for unapproved tiers.',
  'Step 3: proof convention written to rules.json and the contract; the four PMHx proofs were renamed PROOF — <batch> · <what> and moved unchanged to Archive 06 · Pilot proofs (570:10455); the Archive README gained a paragraph.',
  'Step 4: change log 560:6172 gained rows "Button label | …to Note → …To Note | Code capitalises button labels" and "Comments field | Focused in the mockup → resting | We build default states, the mockup caught a click" (480x385 → 480x555). References 518:5826, 537:5841 and 558:6085 now hold 2x exports (1036x64, 1036x168, 1164x1232) placed by upload_assets with rectangle geometry unchanged; the three Source captions read "exported 2026-09-08 at 2x". Capitalised label and resting field kept.',
  'Step 5: workflow/metrics.json version 2 holds the Facility Stay baseline and pilot run 1 of 3 with the same counting method; context loaded fell 94.7%, tool calls and turns rose because one sheet became three gated items.',
  'Step 6: four-page audit, master/instance paint checks on the new rows, and renders of every touched node inspected; see verification.'
];
r.figmaMutations = [
  'Templates 560:6172: appended Change log/Row instances 570:10301 (Button label) and 570:10307 (Comments field state); sub-component 480x385 → 480x555.',
  'Templates 558:6085, 518:5826, 537:5841: image fills replaced with 2x exports via upload_assets (hashes c76aaaa4…, 402df846…, b79c76cf…); rectangle size, position and scale mode unchanged.',
  'Screens 521:7835, 537:9915, 561:9877: Source caption re-dated to "exported 2026-09-08 at 2x".',
  'Archive: created section 570:10455 "06 · Pilot proofs (archived at batch close, 2026-09-08)" at (1240, 5613) 2440x720; moved 518:5798, 534:5834, 552:5930, 555:10031 into it, renamed PROOF — <batch> · <what>, sizes and main components unchanged; README 185:5 gained a 06 paragraph.'
];
r.repoMutations = [
  'workflow/rules.json (new), scripts/workflow/generate-contract.js (v2, folds rules.json, verifies citations), validate-contract.js (accepts v2), validate-manifest.js (approval object), lock-risk.js (quote required), start-batch.js (--confirm for unapproved tiers), self-test.js, workflow/README.md, workflow/check-catalog.json (+3 deterministic checks), workflow/manifest.json (risk attribution), workflow/metrics.json (v2), CLAUDE.md, AGENTS.md, OPERATORS.md (pointers).'
];
r.tierApproval = {
  status: 'unapproved — no verbatim approval of the low/low/medium tiers arrived with this batch; the closeout prompt approves the PMHx decisions and verifies the comparison but does not approve the tiers.',
  toApprove: 'node scripts/workflow/lock-risk.js <item-id> "Daniel (operator)" "<his exact words>" for each item, or leave unapproved and confirm future items one at a time with start-batch.js --confirm.'
};
r.findings = { GAP: 0, DEFECT: 1, DECISION: 0, PROCESS: 4 };
r.verification = {};
r.standingBatchRules = {};
r.screenshots = [];
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('finalize stub applied; verification, standing rules and screenshots are filled by finalize-workflow-refactor-closeout-evidence.js');
