// Fills verification, standing-rule results, screenshots and amendments into workflowRefactor_closeout_2026-09-08,
// resolves the batch's flags, and annotates the three PMHx records. Reads the executor's visual observations from
// figma-export/workflow-refactor-closeout-2026-09-08/visual-observations.json (written after looking at the renders).
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'workflowRefactor_closeout_2026-09-08';
const DIR = 'figma-export/workflow-refactor-closeout-2026-09-08';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const r = s[ID];
if (!r || !String(r._status || '').startsWith('DONE')) throw new Error(`${ID} must be DONE (run finalize-workflow-refactor-closeout.js first)`);
const visual = JSON.parse(fs.readFileSync(`./${DIR}/visual-observations.json`, 'utf8'));
if (!visual.inspectedByExecutor || !Array.isArray(visual.observations) || !visual.observations.length) throw new Error('visual observations missing');

r.verification = {
  fileIdentity: 'PASS — 0:1 Cover, 3:2 Templates, 27:2 Screens, 126:2 Archive.',
  pageWalk: 'PASS — all four pages walked with skipInvisibleInstanceChildren=false after the mutations: Cover 8, Templates 8547, Screens 4046, Archive 1782 nodes (Templates −241 and Archive +254 versus the PMHx body audit: four proofs moved out, two rows added, one section created).',
  unboundPaints: 'PASS — Cover 1, Templates 37 (unchanged), Screens 38 (unchanged), Archive 12 (+2: the new organizer section fill and stroke, the established exception).',
  fractionalGeometry: 'PASS — zero authored fractions outside published instances on every page.',
  references2x: 'PASS — 558:6085 image 1164x1232 in a 582x616 rectangle at (−16, 0) FILL; 518:5826 image 1036x64 in 518x32; 537:5841 image 1036x168 in 518x84. Rectangle size, position and scale mode unchanged; only the image hash changed.',
  captions: 'PASS — the three Source captions read "…, exported 2026-09-08 at 2x"; comparison instances keep their sizes (1708x1294, 1708x328, 1708x692).',
  changeLogRows: 'PASS — 560:6172 holds six Change log/Row 18:103 instances (was four); the two new rows carry three componentPropertyReferences each and their four rendered solid paints match the master with zero mismatches; the sub-component grew 385 → 555 and the comparison Change log column 413 → 583.',
  proofs: 'PASS — 518:5798, 534:5834, 552:5930, 555:10031 moved to Archive section 570:10455 with sizes and main components unchanged (534:5805, 546:5871, 6:65); renamed PROOF — <batch> · <what>; Archive README 185:5 grew 1904 → 2516 characters and its frame 480 → 600.',
  organizers: 'PASS — Templates organizers 17, 18 and 19 now hold only masters and the three comparison sub-components each.',
  contract: 'PASS — generate-contract.js v2 verified all 24 cited records exist; validate-workflow PASS; self-test PASS including the approval-flip lock check; manifest PASS with all three tiers reported UNAPPROVED.',
  visual: `PASS — ${visual.observations.length} observations recorded by the executor after inspecting every touched render; see visualReview.`
};
r.visualReview = visual;
r.standingBatchRules = {
  '1_instancePaintVerification': 'PASS — the two new Change log/Row instances were read as rendered: four solid paints each, zero colour, alpha or binding mismatches against master 18:103; the moved proofs keep their bound fills.',
  '2_unboundPaintAudit': 'PASS — every top-level node on every page walked; the only new unbound paints are the Archive section 570:10455 fill and stroke.',
  '3_referenceCounts': 'PASS — new rows carry 3 componentPropertyReferences each; Sidesheet preferred values remain 13; comparison slots remain 16 each; one comparison per PMHx item on Screens.',
  '4_skipInvisibleFalse': 'PASS — set before every audit walk.',
  '5_opacityLast': 'PASS — no paint-level opacity touched.',
  '6_enumerateDontRecall': 'PASS — organizers, Archive sections, references, rows and proofs enumerated from the live file; Facility Stay and PMHx measurements taken from the session logs, not from earlier reports.',
  '7_fileIdentityFirst': 'PASS — target key passed explicitly on every call; four-page inventory re-read after the mutations; source file opened read-only for three exports and one geometry read without a page change.',
  '8_roundWithRecord': 'PASS — new section at (1240, 5613) 2440x720; proofs at integer positions; no fractional authored geometry.',
  '9_boundPaintAlpha': 'PASS — no bound paint changed.',
  '10_cloneDropsPropertyRefs': 'PASS — no variant cloned; new rows are createInstance() from 18:103 and their text references were counted and rendered values read back.'
};
r.screenshots = [
  `${DIR}/comparison-pmhx-body-561-9877.png`,
  `${DIR}/comparison-pmhx-row-521-7835.png`,
  `${DIR}/comparison-pmhx-section-537-9915.png`,
  `${DIR}/changelog-pmhx-560-6172.png`,
  `${DIR}/reference-pmhx-body-558-6084.png`,
  `${DIR}/reference-pmhx-row-518-5825.png`,
  `${DIR}/reference-pmhx-section-537-5840.png`,
  `${DIR}/archive-06-pilot-proofs-570-10455.png`,
  `${DIR}/archive-readme-185-3.png`,
  `${DIR}/source-pmhx-129-9205-2x.png`,
  `${DIR}/source-pmhx-row-129-9306-2x.png`,
  `${DIR}/source-pmhx-section-129-9315-2x.png`
];
r.measurement = {
  file: 'workflow/metrics.json (version 2)',
  pilotRun: '1 of 3',
  baseline: 'npveRebuild_externalCareFacilityStay_2026-09-05 (Codex, 2026-09-05T17:01–17:28Z): 14 turns, 92 tool calls, 35 Figma calls, 7 screenshots, 1,032,558 startup bytes, peak 214,005 input tokens, 6 correction messages, 1 design decision.',
  pilot: 'PMHx row + section + body: 141 turns (Codex 43 + Claude finish 98), 272 tool calls, 84 Figma calls, 23 screenshots, 55,219 startup bytes, 13 recorded correction cycles, 4 decisions raised at finish.',
  reading: 'Context loaded fell 94.7%. Tool calls and turns rose because one sheet became three gated items with three comparisons, three records, three commits and a hand-over. The lean startup set itself grew from 55,219 to 78,903 bytes in this batch because the contract now carries the rule text; still a 94.3% reduction.'
};
r.flagsAfter = s.flags.length;

// Resolve this batch's flags.
const resolutions = {
  workflowRefactor_riskLockFalseAttribution: `Resolved 2026-09-08 in ${ID}: manifest risk carries proposedBy and approval{status: unapproved, history}; PMHx records annotated; tiers await a quoted operator approval.`,
  workflowRefactor_agentsMdDivergedFromClaudeMd: `Resolved 2026-09-08 in ${ID}: workflow/rules.json holds eleven rules; CLAUDE.md and AGENTS.md point to it.`,
  workflowRefactor_contractLackedProvenance: `Resolved 2026-09-08 in ${ID}: every rule in rules.json cites its sourceRecord; the generator refuses uncited records; body inset cites npveRebuild_bodyPaddingAndSearch_2026_09_02.`,
  npvePmhx_referencesFrozenAt1x: `Resolved 2026-09-08 in ${ID}: 2x exports placed on 518:5826, 537:5841, 558:6085; captions re-dated.`
};
for (const flag of s.flags) if (resolutions[flag.id] && !flag.resolution) flag.resolution = resolutions[flag.id];

// Annotate the PMHx records.
const amend = (rid, note) => { const rec = s[rid]; if (!rec) throw new Error(`missing ${rid}`); rec.amendment_2026_09_08_closeout = note; };
amend('npveRebuild_pastMedicalHistoryRow_2026-09-08', `Reference 518:5826 re-exported at 2x (1036x64) and caption re-dated; proof 518:5798 renamed PROOF — npve-past-medical-history-row-2026-09-08 · condition row states and archived to 570:10455. Record ${ID}.`);
amend('npveRebuild_pastMedicalHistorySection_2026-09-08', `Reference 537:5841 re-exported at 2x (1036x168) and caption re-dated; proof 534:5834 renamed PROOF — npve-past-medical-history-section-2026-09-08 · EYES section and archived to 570:10455. Record ${ID}.`);
amend('npveRebuild_pastMedicalHistoryBody_2026-09-08', `Reference 558:6085 re-exported at 2x (1164x1232) and caption re-dated; change log 560:6172 gained the Button label and Comments field state rows; proofs 552:5930 and 555:10031 renamed PROOF — … and archived to 570:10455; comparison verified by Daniel 2026-09-08. Record ${ID}.`);
const body = s['npveRebuild_pastMedicalHistoryBody_2026-09-08'];
body.screenshots = [...(body.screenshots || []), 'figma-export/npve-past-medical-history-body-2026-09-08/source-sidesheet-129-9205-2x.png', 'figma-export/npve-past-medical-history-body-2026-09-08/comparison-before-closeout-2026-09-08.png'];

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('evidence recorded on', ID, '| flags', s.flags.length, '| resolved', Object.keys(resolutions).length);
