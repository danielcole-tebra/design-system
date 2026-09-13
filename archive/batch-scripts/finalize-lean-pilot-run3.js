// Finalizes leanPilot_run3_2026-09-08 (pilot2-procedures-edit) after the Figma build, deterministic checks and the
// executor's visual inspection. The record was opened by apply-lean-pilot-run3.js (backup taken there). No Figma writes.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'leanPilot_run3_2026-09-08';
const DIR = 'figma-export/lean-pilot-run2-3-2026-09-08';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const r = s[ID];
if (!r || !String(r._status || '').startsWith('IN PROGRESS')) throw new Error(`${ID} is not IN PROGRESS`);
const evidence = JSON.parse(fs.readFileSync(`${DIR}/audit-procedures-edit.json`, 'utf8'));

r._status = 'DONE. pilot2-procedures-edit (medium, approved by Daniel) built, validated and inspected; the combined lean pilot runs 2 and 3 are complete and stop for operator review.';
r.recordGate = `${r.recordGate}; batch guard started 2026-09-09 (schema digest f1d5b2a7e7ff) and check-batch PASS before mutation`;
r.sourceFacts = [
  'The source is 550x498: header 64, form card 518x358 at y 72 (8px below the header; #EEF7F9, 1px #D6D6D6, radius 8, 16px padding and rhythm), footer 60. No tab strip.',
  'Card rows: Edit Event (Bold 16) with a trash glyph; Procedure Code 385x40 with a Status pill 85x32 (#D4E0DD, Bold 14, caret) 16px after it; Related to problem 486x40 with a caret; Facility Name 486x40; Comments 486x110 in the focused state with a floating label and the placeholder Comments go here.',
  'Footer labels: Cancel (text), Save & Add to Note (outlined), Save (primary).'
];
r.systemMapping = {
  textField: '77:708 Text field size=small (Procedure Code, Related to problem select=true, Facility Name) and 77:698 size=medium multiline=true (Comments)',
  iconButton: '77:1109 Icon button color=default size=small with Icon#170:0 = 389:3433 Icon/TrashOutlined',
  statusChip: '580:6013 Hospitalization status selector reused from run 2 (fill bound library color/core/light); GAP stand-in per npveExtReview_allergySeveritySelectorUnmarked',
  formSurface: 'NPVE/Color Form surface VariableID:387:3434 (#EEF7F9)',
  sidesheet: '6:65 Sidesheet Placement=Floating; comparison 35:332; change-log row 18:103',
  pattern: 'Rows cloned from the run 2 form 580:6017 (header 580:6018, Procedure row 580:6059, Related 580:6043, Facility Name 580:6021, Comments 580:6085)'
};
r.lockedGeometry = {
  form: '518x354: 16px padding and gap bound space/16; header 34, Procedure 40 (field 380 fill + 16 + selector 90), Related 40, Facility Name 40, Comments 104',
  body: '518x354: one form instance, no fill',
  sheet: '550x530 content-driven: Header 72 + divider 1 + Body region 386 (16 + 354 + 16) + Footer 71',
  reference: '550x498 at 1:1 holding the 1100x996 export',
  changeLog: '480x870, nine rows',
  comparison: '1708x962 on Screens; both contents shorter than the 600 slot, clipping left on, Rebuild helper transparent'
};
r.sourceBackedDifferences = [
  'Shell regions 64/60 become 72/71 and the fixed 498 sheet becomes content-driven at 530.',
  'The 8px inset above the card becomes the shared 16px body inset.',
  'The Status pill keeps its colour through color/core/light but uses the library Regular 16 label at 90 wide; Procedure Code fills the remainder at 380.',
  'Comments renders resting at 104 tall instead of focused at 110.',
  'Footer labels render in TITLE case from the stored sentence-case labels.'
];
r.plan = [
  'Preflight: contract validated, record opened with backup, batch guard started, file identity verified, section 09 (Procedures history) and section 20 (run 2) read, source read and exported at 2x.',
  'Build: section 21, form, body; Sidesheet preferred value; rebuild, reference and change-log helpers; comparison preferred values; Screens section 21, comparison, reused Dropdown chip GAP marker.',
  'Evidence: four-page audit, master/instance paint checks, renders saved and inspected, evidence JSON, report.',
  'Close: record finalized, contract regenerated, finish gate, one commit.'
];
r.findings = { GAP: 1, DEFECT: 0, DECISION: 0, note: 'The one GAP is the existing dropdown-chip pattern reused; marker cloned beside the comparison. No new flag.' };
r.existingGapsReused = ['npveExtReview_allergySeveritySelectorUnmarked'];
r.flagsAfter = s.flags.length;
r.flagsAdded = [];
r.figmaMutations = [
  'Templates: created organizer section 586:6413 "21 · Procedures & surgical history · Edit Event" at (0, 42560) 1842x2400.',
  'Templates: created form component 586:6414 (Form surface fill, color/divider stroke, radius/md, space/16 padding and gap) from clones of the run 2 form rows: header, Procedure row (field + status selector instance 586:6420), Related to problem, Facility Name, Comments.',
  'Templates: created body component 586:6467 (space/16 gap, no fill) holding form instance 586:6468.',
  'Templates: appended 586:6467 to Sidesheet 279:2446 Body content preferred values (14 → 15); default and geometry unchanged.',
  'Templates: cloned Rebuild helper 581:6216 → 586:6559 with sheet 586:6560 (Body content 586:6467, Title Procedures/Surgical History, resized 550x530); cloned Reference helper 581:6630 → 586:6984 with rectangle 586:6985 at 550x498 and the 2x export uploaded (hash bb92db28…); cloned the nine-row Facility Stay change-log helper 392:4093 → 586:11705 with title and rows rewritten, Content set to hug.',
  'Templates: appended the three helpers to Rebuild comparison 35:332 slot preferred values (17 → 18 each).',
  'Screens: created organizer section 586:11764 "21 · Procedures & surgical history · Edit Event comparison" at (0, 37028) 2268x1536; placed sole comparison 586:11765 with slots swapped and captions set; cloned GAP marker 581:11761 → 586:12264 (Difference text rewritten for this screen).',
  'No node outside this batch was moved, renamed, resized, deleted or restyled. No proofs were created, so nothing was archived.'
];
r.createdNodes = evidence.createdNodes;
r.corrections = [];
r.verification = {
  fileIdentity: 'PASS — 0:1 Cover, 3:2 Templates, 27:2 Screens, 126:2 Archive.',
  pageWalk: 'PASS — all four pages walked with skipInvisibleInstanceChildren=false: Cover 8, Templates 9504, Screens 4558, Archive 1782 nodes.',
  unboundPaints: 'PASS — Cover 1, Templates 41, Screens 42, Archive 12; the only new unbound paints are the two organizer sections’ fill and stroke.',
  fractionalGeometry: 'PASS — zero authored fractions outside instances on every page.',
  sharedApi: 'PASS — Sidesheet preferred values 15, default 26:221, 13 properties, three variants 550x600 unchanged; comparison slots 18 preferred values each.',
  geometry: 'PASS — form 518x354, body 518x354, sheet 550x530 = 72 + 1 + 386 + 71 with the footer at y 459; Rebuild helper has no fill; reference 550x498.',
  componentIdentity: 'PASS — fields resolve to 77:708 / 77:698, icon button to 77:1109 with TrashOutlined, selector to 580:6013, sheet to 6:65, comparison to 35:332, rows to 18:103.',
  instancePaints: 'PASS — form 40, body 40, selector 3 visible solid paints compared master-to-instance; zero mismatches.',
  reference: 'PASS — 2x export 1100x996 uploaded to 586:6985 (hash bb92db28530bbf1f5afd18ceac374d0162fd0a91), FIT; top rows free of the component-set outline; reference column matches the 1x source capture exactly.',
  comparison: 'PASS — inspected comparison-procedures-edit.png at 1x; Rebuild column matches the standalone sheet within 78 anti-aliasing pixels; the backdrop shows below both contents.',
  singlePlacement: 'PASS — each helper, the body and the form have exactly one placement on Screens, inside 586:11765; the reused status selector has one placement per edit-form comparison.',
  archiveCheck: 'PASS — no node with an id at or above 586 on Archive.',
  sourceAndLibrary: 'PASS — no writes to zVsuhYehoSLLq880qRBFkq or YX2n4YLrEpBXNbcc73T6dw; source current page untouched.'
};
r.standingBatchRules = {
  '1_instancePaintVerification': 'PASS — the live instances of the form (586:6468), the body (inside sheet 586:6560) and the reused status selector (586:6420) were read and their rendered solid paints compared with the masters: 40 + 40 + 3 paints, zero mismatches.',
  '2_unboundPaintAudit': 'PASS — every node on every page was walked; only the two organizer sections add unbound paints.',
  '3_referenceCounts': 'PASS — Sidesheet preferred values 15; comparison slots 18 each; one Procedures edit comparison on Screens; no property definitions were created or cloned.',
  '4_skipInvisibleFalse': 'PASS — figma.skipInvisibleInstanceChildren was false for every audit walk.',
  '5_opacityLast': 'PASS — no paint-level opacity was authored or remediated.',
  '6_enumerateDontRecall': 'PASS — page trees, section extents, preferred values, slot contents and Archive ids were enumerated from the live file.',
  '7_fileIdentityFirst': 'PASS — target key passed explicitly on every call; four-page inventory verified before any read informed a decision.',
  '8_roundWithRecord': 'PASS — no fractional authored geometry; all new layout values are integers.',
  '9_boundPaintAlpha': 'PASS — bound fills and strokes were preserved through clones; nothing rebound.',
  '10_cloneDropsPropertyRefs': 'PASS — no variant was cloned; field, selector, footer and change-log text was verified rendered against stored properties.'
};
r.screenshots = [
  `${DIR}/source-procedures-edit-129-8651.png`,
  `${DIR}/source-procedures-edit-129-8651-2x.png`,
  `${DIR}/body-procedures-586-6467.png`,
  `${DIR}/rebuild-sidesheet-procedures-586-6559.png`,
  `${DIR}/changelog-procedures-586-11705.png`,
  `${DIR}/comparison-procedures-edit.png`,
  `${DIR}/crop-reference-column-procedures.png`,
  `${DIR}/crop-rebuild-column-procedures.png`
];
r.outcome = [
  'Created Procedure history edit form 586:6414 (518x354) and body 586:6467 from the run 2 pattern, reusing the status selector; all controls are live library instances or the recorded GAP stand-in.',
  'Appended the body to the shared Sidesheet Body content preferred values (14 → 15); default, 13 properties and 550x600 variant geometry unchanged.',
  'Placed one content-driven sheet at 550x530 (header 72, divider 1, body region 386, footer 71) with the source title and footer labels.',
  'Created the three _Rebuild comparison sub-components and the sole comparison 586:11765 on Screens with the reused Dropdown chip GAP marker; comparison slots now hold 18 preferred values each.',
  'Zero corrections during the build; runs 2 and 3 complete, awaiting operator review of both comparisons.'
];
r.decisionsForOperator = [];
r.executors = { build: 'Claude (Anthropic claude-fable-5-1), single session from the approval', finish: 'Claude (Anthropic claude-fable-5-1)' };
fs.writeFileSync(P, JSON.stringify(s, null, 1));

// Metrics: pilot run 3.
const METP = './workflow/metrics.json';
const met = JSON.parse(fs.readFileSync(METP, 'utf8'));
const m = JSON.parse(fs.readFileSync('./workflow/manifest.json', 'utf8'));
const sz = (f) => fs.statSync(f).size;
const itemBytes = Buffer.byteLength(JSON.stringify(m.items.find((i) => i.id === 'pilot2-procedures-edit'), null, 2));
const recordBytes = Buffer.byteLength(JSON.stringify(JSON.parse(fs.readFileSync('./design-system-schema.backup-2026-09-08-pre-lean-pilot-run3.json', 'utf8'))['leanPilot_run2-3_2026-09-08'] || {}, null, 1));
const contextLoaded = sz('./CLAUDE.md') + sz('./workflow/npve-contract.generated.json') + itemBytes + recordBytes;
if (!met.pilotRuns.some((p) => p.run === 3)) {
  met.pilotRuns.push({
    run: 3,
    of: 3,
    workstream: 'Procedures/Surgical History · Edit Event form (item 2 of the combined runs 2-3 batch)',
    contextLoadedBytes: contextLoaded,
    contextLoadedNote: 'Same lean set as run 2 (CLAUDE.md + generated contract + manifest item + last record); the executor continued in the run 2 session, so the contract and precedent nodes were already in context and were not re-read.',
    items: [
      {
        itemId: 'pilot2-procedures-edit',
        risk: 'medium (approved by Daniel before start)',
        executor: 'Claude (Anthropic claude-fable-5-1)',
        modelTurns: 14,
        toolCalls: 35,
        figmaCalls: 13,
        useFigmaReads: 6,
        useFigmaWrites: 5,
        screenshots: 5,
        shellCommands: 9,
        elapsedMinutes: 25,
        recordedCorrectionCycles: 0,
        operatorMessages: 1,
        operatorDecisions: 0,
        result: 'passed deterministic and visual review by the executor; comparison pending operator review',
        countingNote: 'Counted by the executor from its own session at finalize, from the approval message to the commit, parallel calls counted individually. Not instrumented.'
      }
    ],
    againstBaseline: {
      note: 'Smaller scope than the Facility Stay baseline (five rows, no tabs or dates) but the same deliverable set; the run 2 pattern and status selector were reused directly.',
      contextLoaded: `1,032,558 bytes → ${contextLoaded.toLocaleString('en-US')} bytes (−${(100 - (contextLoaded / 1032558) * 100).toFixed(1)}%)`,
      figmaCalls: '35 → 13',
      screenshots: '7 → 5',
      toolCallsTotal: '92 → 35',
      modelTurns: '14 → 14',
      corrections: '6 → 0 recorded cycles',
      designDecisionsStoppedFor: '1 → 0',
      successCriterion50PercentReduction: 'met for context loaded, tool calls and Figma calls'
    }
  });
}
fs.writeFileSync(METP, JSON.stringify(met, null, 2) + '\n');
console.log('finalized', ID, '| flags', s.flags.length, '| contextLoadedBytes', contextLoaded);
