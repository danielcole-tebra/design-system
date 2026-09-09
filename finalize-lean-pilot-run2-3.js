// Finalizes leanPilot_run2-3_2026-09-08 for item 1 (pilot2-hospitalizations-edit) after the Figma build,
// deterministic checks and the executor's visual inspection. Item 2 (pilot2-procedures-edit) was not
// started: its tier is still unapproved, and per the medium-tier oversight rule the operator reviews
// item 1 before the next item. Because the record must be DONE for item 1's finish gate while item 2 still
// needs an IN PROGRESS record of its own, item 2 is re-pointed at a new record id in the manifest.
// The schema record was created by apply-lean-pilot-run2-3.js (backup taken there). No Figma writes here.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'leanPilot_run2-3_2026-09-08';
const DIR = 'figma-export/lean-pilot-run2-3-2026-09-08';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const r = s[ID];
if (!r || !String(r._status || '').startsWith('IN PROGRESS')) throw new Error(`${ID} is not IN PROGRESS`);
const evidence = JSON.parse(fs.readFileSync(`${DIR}/audit-hospitalizations-edit.json`, 'utf8'));

r._status = 'DONE. Item 1 (pilot2-hospitalizations-edit, medium, approved by Daniel) built, validated and inspected; stopped for operator review before item 2. Item 2 (pilot2-procedures-edit) not started: tier unapproved, re-pointed at record leanPilot_run3_2026-09-08.';
r.manifestItem = 'pilot2-hospitalizations-edit';
r.risk = {
  tier: 'medium',
  oversight: 'Dedicated reference/rebuild/change comparison inspected by the executor and shown to the operator; deterministic validation immediately after the mutation.',
  proposedBy: 'Claude (planner proposal), Step 0 of the combined lean pilot, 2026-09-08',
  approval: { status: 'approved', approvedBy: 'Daniel (operator)', approvedAt: '2026-09-09T00:38:11.672Z', quote: 'I approve pilot2-hospitalizations-edit as medium, go ahead' }
};
r.recordGate = `${r.recordGate}; batch guard started 2026-09-09T00:43:52Z (schema digest d3e3c4be65f6) and check-batch PASS before mutation`;
r.source = { file: 'zVsuhYehoSLLq880qRBFkq', page: '21:321', node: '129:8401 Page=Clin_ExternalCare-HEdit', policy: 'read only; frozen 2x export in this batch (download_assets, scale 2, 60,914 bytes)' };
r.library = 'YX2n4YLrEpBXNbcc73T6dw read only; color/core/light imported by key into the consuming file for one binding';
r.scope = 'Item 1: one reusable 518px Hospitalizations edit body on the approved Facility Stay edit-form pattern; appended to the shared Sidesheet Body content; one content-driven sheet, one frozen 2x reference, one plain-language change log, one comparison, two reused GAP markers.';
r.sourceFacts = [
  'The source is 550x606: header 64, tab strip at y 72 (28px pills, Hospitalizations selected #004852, Facility Stay #9A9A9A), form card 518x414 at y 124 (#EEF7F9, 1px #D6D6D6, radius 8), footer 60.',
  'Card rows at 16px rhythm: Edit Event (Bold 16) with a trash glyph; Facility Name 486x40; Admission Date and Discharge Date 239x40 each with a calendar glyph inside the field, 8px apart; Related to problem 486x40 with a caret; Procedure Code 385x40 with a Status pill 85x32 (#D4E0DD, Bold 14, caret) 16px after it; Comments 486x110 in the focused state with a floating label and the placeholder Comments go here.',
  'Footer labels: Cancel (text), Save & Add to Note (outlined), Save (primary).',
  '#D4E0DD is the code palette core.light (paletteValues.ts "core 3"); the library publishes it as color/core/light.'
];
r.systemMapping = {
  textField: '77:708 Text field size=small (Facility Name, Admission Date, Discharge Date, Related to problem select=true, Procedure Code) and 77:698 size=medium multiline=true (Comments)',
  iconButton: '77:1109 Icon button color=default size=small with Icon#170:0 = 389:3433 Icon/TrashOutlined',
  calendar: '316:3409 Icon/Calendar beside each date field inside the recorded GAP wrapper (npveProblemEdit_textFieldNoEndAdornment)',
  tabs: '77:642 Tabs/Tab selected=yes and 77:640 selected=no over Divider, cloned from the Facility Stay tab strip 391:3568',
  statusChip: '580:6013 Hospitalization status selector, a clone of the Allergy severity selector 352:3206 with its fill rebound to library color/core/light; GAP stand-in per npveExtReview_allergySeveritySelectorUnmarked (Dropdown chip, LIBRARY-TODOS item 16)',
  formSurface: 'NPVE/Color Form surface VariableID:387:3434 (#EEF7F9), the Facility Stay operator decision',
  sidesheet: '6:65 Sidesheet Placement=Floating; comparison 35:332; change-log row 18:103'
};
r.lockedGeometry = {
  statusSelector: '90x32 hug; label Regular 16, DownCaret 16',
  form: '518x410: 16px padding and gap bound space/16; header 34, Facility Name 40, Dates 40, Related 40, Procedure 40 (field 380 fill + 16 + selector 90), Comments 104',
  body: '518x475: tab strip 49 + 16 + form instance 410',
  sheet: '550x651 content-driven: Header 72 + divider 1 + Body region 507 (16 + 475 + 16) + Footer 71',
  reference: '550x606 at 1:1 holding the 1100x1212 export',
  changeLog: '480x1024, eleven rows',
  comparison: '1708x1116 on Screens; Reference and Rebuild columns have clipping off so the 606 and 651 tall contents show at 1:1'
};
r.sourceBackedDifferences = [
  'Shell regions 64/60 become the canonical 72/71 and the fixed 606 sheet becomes content-driven at 651.',
  'The 28px source tab pills become the 48px library Tabs with a hairline, as in the Hospitalizations list; the tab-to-form gap goes from 20 to 16.',
  'Calendar glyphs move from inside the field to beside it (recorded GAP wrapper).',
  'The Status pill keeps its colour through color/core/light but uses the library Regular 16 label at 90 wide (precedent typography); Procedure Code fills the remainder at 380.',
  'Comments renders resting at 104 tall (library medium multiline) instead of focused at 110.',
  'Footer labels render in TITLE case from the stored sentence-case labels.'
];
r.plan = [
  'Step 1 preflight: contract validated, file identity verified, Facility Stay pattern and precedent nodes read, source read and exported at 2x, library token located.',
  'Step 2 build: section, status selector, form, body; shared Sidesheet preferred value; rebuild, reference and change-log helpers; comparison preferred values; Screens section, comparison instance, two reused GAP markers.',
  'Step 3: not run (item 2 awaits the operator).',
  'Step 4 evidence: four-page audit, master/instance paint checks, renders saved and inspected, evidence JSON, report.',
  'Step 5: record finalized, contract regenerated, finish gate, one commit.'
];
r.findings = { GAP: 2, DEFECT: 0, DECISION: 0, note: 'Both GAPs are existing recorded patterns reused (date-field end adornment; dropdown chip); markers cloned beside the comparison. No new flag.' };
r.existingGapsReused = ['npveProblemEdit_textFieldNoEndAdornment', 'npveExtReview_allergySeveritySelectorUnmarked'];
r.flagsAfter = s.flags.length;
r.flagsAdded = [];
r.figmaMutations = [
  'Templates: created organizer section 580:6012 "20 · External care history · Hospitalizations edit" at (0, 39960) 1842x2400.',
  'Templates: cloned Allergy severity selector 352:3206 → 580:6013 Hospitalization status selector; fill rebound to library color/core/light; Label default Status; description written.',
  'Templates: created form component 580:6017 (Form surface fill, color/divider stroke, radius/md, space/16 padding and gap) from clones of the Facility Stay header 389:3470, Facility Name 389:3502, Dates 389:3543, Related to problem 389:3632 and Comments 389:3707, plus a new Procedure row 580:6059 (Text field clone at fill width + selector instance 580:6081).',
  'Templates: created body component 580:10621 (space/16 gap, no fill) from a clone of the Facility Stay tab strip 391:3568 with tab variants swapped (Hospitalizations selected) and form instance 580:10633.',
  'Templates: appended 580:10621 to Sidesheet 279:2446 Body content preferred values (13 → 14); default and geometry unchanged.',
  'Templates: cloned Rebuild helper 392:3672 → 581:6216, sheet 581:6217 Body content swapped to 580:10621 and resized to 550x651; cloned Reference helper 392:4091 → 581:6630 with rectangle 581:6631 at 550x606 and the 2x export uploaded (hash eb453180…); cloned Change log helper 392:4093 → 581:10997 with title and eleven rows (two rows added by cloning a row instance), Content set to hug.',
  'Templates: appended the three helpers to Rebuild comparison 35:332 slot preferred values (16 → 17 each).',
  'Screens: created organizer section 581:11116 "20 · External care history · Hospitalizations edit comparison" at (0, 35292) 2268x1536; placed sole comparison 581:11117 with slots swapped, captions set, Reference and Rebuild column clipping off; cloned GAP markers 394:5611 → 581:11754 and 404:7061 → 581:11761 (Difference text rewritten for this screen).',
  'No node outside this batch was moved, renamed, resized, deleted or restyled. No proofs were created, so nothing was archived.'
];
r.createdNodes = evidence.createdNodes;
r.corrections = evidence.corrections;
r.verification = {
  fileIdentity: 'PASS — 0:1 Cover, 3:2 Templates, 27:2 Screens, 126:2 Archive.',
  pageWalk: 'PASS — all four pages walked with skipInvisibleInstanceChildren=false: Cover 8, Templates 9115, Screens 4341, Archive 1782 nodes.',
  unboundPaints: 'PASS — Cover 1, Templates 39, Screens 40, Archive 12; the only new unbound paints are the two organizer sections’ fill and stroke.',
  fractionalGeometry: 'PASS — zero authored fractions outside instances on every page.',
  sharedApi: 'PASS — Sidesheet preferred values 14, default 26:221, 13 properties, three variants 550x600 unchanged; comparison slots 17 preferred values each.',
  geometry: 'PASS — form 518x410, body 518x475, sheet 550x651 = 72 + 1 + 507 + 71 with the footer at y 580; Rebuild helper has no fill; reference 550x606.',
  componentIdentity: 'PASS — fields resolve to 77:708 / 77:698, icon button to 77:1109 with TrashOutlined, calendars to 316:3409, tabs to 77:642 / 77:640, sheet to 6:65, comparison to 35:332, rows to 18:103.',
  instancePaints: 'PASS — selector 3, form 58, body 62 visible solid paints compared master-to-instance; zero mismatches.',
  reference: 'PASS — 2x export 1100x1212 uploaded to 581:6631 (hash eb453180654dfb5918ad6b37eb9c2d2209136e29), FIT; top rows free of the component-set outline; reference column matches the 1x source capture exactly.',
  comparison: 'PASS — inspected comparison-hospitalizations-edit.png at 1x; Rebuild column matches the standalone sheet within 76 anti-aliasing pixels.',
  singlePlacement: 'PASS — each helper, the body, the form and the selector have exactly one placement on Screens, all inside 581:11117.',
  archiveCheck: 'PASS — no node with an id at or above 580 on Archive.',
  sourceAndLibrary: 'PASS — no writes to zVsuhYehoSLLq880qRBFkq or YX2n4YLrEpBXNbcc73T6dw; source current page untouched.'
};
r.standingBatchRules = {
  '1_instancePaintVerification': 'PASS — the live instances of the status selector (580:6081), the form (580:10633) and the body (inside sheet 581:6217) were read and their rendered solid paints compared with the masters: 3 + 58 + 62 paints, zero mismatches.',
  '2_unboundPaintAudit': 'PASS — every node on every page was walked; only the two organizer sections add unbound paints.',
  '3_referenceCounts': 'PASS — selector Label reference intact after the clone; Sidesheet preferred values 14; comparison slots 17 each; one Hospitalizations edit comparison on Screens.',
  '4_skipInvisibleFalse': 'PASS — figma.skipInvisibleInstanceChildren was false for every audit walk.',
  '5_opacityLast': 'PASS — no paint-level opacity was authored or remediated.',
  '6_enumerateDontRecall': 'PASS — page trees, section extents, preferred values, slot contents, library variables and Archive ids were enumerated from the live file.',
  '7_fileIdentityFirst': 'PASS — target key passed explicitly on every call; four-page inventory verified before any read informed a decision.',
  '8_roundWithRecord': 'PASS — no fractional authored geometry; all new layout values are integers.',
  '9_boundPaintAlpha': 'PASS — bound fills and strokes were preserved through clones; the one rebinding (selector fill to color/core/light) read back at opacity 1 with the variable id.',
  '10_cloneDropsPropertyRefs': 'PASS — no variant was cloned; the standalone selector clone kept its property definition and the label reference; tab, field, selector, footer and change-log text was verified rendered against stored properties.'
};
r.screenshots = [
  `${DIR}/source-hospitalizations-edit-129-8401.png`,
  `${DIR}/source-hospitalizations-edit-129-8401-2x.png`,
  `${DIR}/form-580-6017.png`,
  `${DIR}/body-580-10621.png`,
  `${DIR}/rebuild-sidesheet-581-6216.png`,
  `${DIR}/changelog-581-10997.png`,
  `${DIR}/comparison-hospitalizations-edit.png`,
  `${DIR}/crop-reference-column.png`,
  `${DIR}/crop-rebuild-column.png`
];
r.outcome = [
  'Created Hospitalization status selector 580:6013, Hospitalizations edit form 580:6017 (518x410) and body 580:10621 (518x475) on the Facility Stay pattern; all controls are live library instances or recorded GAP stand-ins.',
  'Appended the body to the shared Sidesheet Body content preferred values (13 → 14); default, 13 properties and 550x600 variant geometry unchanged.',
  'Placed one content-driven sheet at 550x651 (header 72, divider 1, body region 507, footer 71) with the source footer labels.',
  'Created the three _Rebuild comparison sub-components and the sole comparison 581:11117 on Screens with two reused GAP markers; comparison slots now hold 17 preferred values each.',
  'Item 2 (Procedures edit) not started; awaiting the operator’s tier approval and review of this comparison.'
];
r.decisionsForOperator = [];
r.executors = { build: 'Claude (Anthropic claude-fable-5-1), single session from the approval at 2026-09-09T00:38Z', finish: 'Claude (Anthropic claude-fable-5-1)' };
r.item2 = { id: 'pilot2-procedures-edit', status: 'proposed, unapproved, not started', recordId: 'leanPilot_run3_2026-09-08 (assigned in the manifest by this finalize so the record gate can open it separately)' };
fs.writeFileSync(P, JSON.stringify(s, null, 1));

// Manifest: re-point item 2 at its own record so it can be started after item 1 closes.
const MP = './workflow/manifest.json';
const m = JSON.parse(fs.readFileSync(MP, 'utf8'));
const it2 = m.items.find((i) => i.id === 'pilot2-procedures-edit');
if (!it2) throw new Error('pilot2-procedures-edit missing');
if (it2.status !== 'proposed' || it2.risk.lock) throw new Error('pilot2-procedures-edit is no longer a plain proposal; re-pointing would break its lock');
it2.expectedRecordId = 'leanPilot_run3_2026-09-08';
it2.allowedFiles = ['design-system-schema.json', 'design-system-schema.backup-2026-09-08-pre-lean-pilot-run3.json', 'apply-lean-pilot-run3.js', 'finalize-lean-pilot-run3.js', `${DIR}/**`, 'workflow/npve-contract.generated.json', 'workflow/manifest.json', 'workflow/metrics.json'];
it2.recordNote = 'Re-pointed from leanPilot_run2-3_2026-09-08 at item 1 finalize (2026-09-09): that record closed DONE with item 1 while this item was still unapproved.';
fs.writeFileSync(MP, JSON.stringify(m, null, 2) + '\n');

// Metrics: pilot run 2 (item 1 only), same fields as run 1 where the single-session method allows.
const METP = './workflow/metrics.json';
const met = JSON.parse(fs.readFileSync(METP, 'utf8'));
const sz = (f) => fs.statSync(f).size;
const itemBytes = Buffer.byteLength(JSON.stringify(m.items.find((i) => i.id === 'pilot2-hospitalizations-edit'), null, 2));
const recordBytes = Buffer.byteLength(JSON.stringify(JSON.parse(fs.readFileSync('./design-system-schema.backup-2026-09-08-pre-lean-pilot-run2-3.json', 'utf8'))['workflowRefactor_tierApproval_2026-09-08'] || {}, null, 1));
const contextLoaded = sz('./CLAUDE.md') + sz('./workflow/npve-contract.generated.json') + itemBytes + recordBytes;
if (!met.pilotRuns.some((p) => p.run === 2)) {
  met.pilotRuns.push({
    run: 2,
    of: 3,
    workstream: 'External Care History · Hospitalizations edit form (item 1 of the combined runs 2-3 batch; item 2 not started)',
    contextLoadedBytes: contextLoaded,
    contextLoadedNote: 'CLAUDE.md + generated contract + the selected manifest item + the last record named by it, per the lean startup. The executor also read, beyond the lean set, the Facility Stay record and report, the PMHx body record, the Allergies list record and two flags, the lean workflow scripts, and three memory notes; those are not counted.',
    items: [
      {
        itemId: 'pilot2-hospitalizations-edit',
        risk: 'medium (approved by Daniel before start)',
        executor: 'Claude (Anthropic claude-fable-5-1)',
        modelTurns: 30,
        toolCalls: 63,
        figmaCalls: 22,
        useFigmaReads: 11,
        useFigmaWrites: 9,
        screenshots: 6,
        shellCommands: 16,
        elapsedMinutes: 45,
        recordedCorrectionCycles: 3,
        operatorMessages: 1,
        operatorDecisions: 0,
        result: 'passed deterministic and visual review by the executor; comparison pending operator review',
        countingNote: 'Counted by the executor from its own session at finalize: every tool call from the approval message to the commit, including parallel calls individually; modelTurns are assistant messages. Not instrumented.'
      }
    ],
    againstBaseline: {
      note: 'Same scope class as the Facility Stay baseline (one edit-form body, sheet, reference, change log, comparison) built by one executor in one gated item with one approval message and no design decision stopped for.',
      contextLoaded: `1,032,558 bytes → ${contextLoaded.toLocaleString('en-US')} bytes (−${(100 - (contextLoaded / 1032558) * 100).toFixed(1)}%)`,
      figmaCalls: '35 → 22',
      screenshots: '7 → 6',
      toolCallsTotal: '92 → 63',
      modelTurns: '14 → 30 (Claude counts every tool step as a turn)',
      corrections: '6 → 3 recorded cycles',
      designDecisionsStoppedFor: '1 → 0',
      successCriterion50PercentReduction: 'met for context loaded; tool calls fell 32%, Figma calls 37%'
    }
  });
}
fs.writeFileSync(METP, JSON.stringify(met, null, 2) + '\n');
console.log('finalized', ID, '| flags', s.flags.length, '| contextLoadedBytes', contextLoaded, '| item 2 →', it2.expectedRecordId);
