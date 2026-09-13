// apply-npve-external-review.js — records npveRebuild_externalReview_2026-09-05 (read-only peer review). Backup first. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-05-pre-npve-external-review.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const D = 'npveRebuild_externalReview_2026-09-05';
if (s[D]) throw new Error('record already exists');
const flagsBefore = s.flags.length;
const F = 'figma-export/npve-external-review-2026-09-05/';

s[D] = {
  _status: 'READ-ONLY REVIEW COMPLETE. Peer review of the external (Codex) sidesheet work since cd092d9. All 20 batches recorded and gated; two review-only folders unrecorded; two record claims inaccurate. No subscription split, no duplicate masters, no detached instances, zero unbound authored paints. Nine screens meet the standard with numbered repairs; no rebuild. Three rule-5 findings (two unmarked stand-ins, one contradicted DEFECT). No Figma mutation.',
  date: '2026-09-05',
  workstream: 'NPVE Rebuild / Sidesheets',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6 read only',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only (Chip 156:171 axes, Inputs sets, icon names)',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only (fresh 1x renders; verbatim text of 4536:27605, 648:1603, 129:7726, 129:7950)',
  report: F + 'report.md',
  recordGate: 'npveRebuild_externalCareFacilityStay_2026-09-05 recorded DONE — passed',
  scopeReviewed: 'Everything added or changed after commit cd092d9: Sidesheet set 279:2446 and its global edits; Templates sections 06–13 plus Medication helpers in 05, browse body 304:2910, Problems list body State=Empty 304:2883; Screens sections 04–13; local collections NPVE/Dimension and NPVE/Color.',
  step1_records: {
    batches: 20,
    recorded: 20,
    gateChain: 'unbroken; each record names the previous as passed',
    unrecordedFolders: ['figma-export/npve-flowsheets-list-2026-09-05 (1 png, no report.md)', 'figma-export/npve-next-candidate-audit-2026-09-05 (9 png, no report.md)'],
    inaccurateClaims: [
      'npveRebuild_allergiesList_2026-09-05 rule 8 "all authored geometry whole-pixel": severity selector 352:3206 Label x 6.5, DownCaret x 47.5 (master + 3 placements)',
      'npveRebuild_allergiesList_2026-09-05 and npveRebuild_procedureHistory_2026-09-04 report GAP 0 while each built a local stand-in for something the library cannot express'
    ],
    libraryTodos: 'item 15 added (Text field end adornment), matches flag npveProblemEdit_textFieldNoEndAdornment'
  },
  step2_reuse: {
    sidesheet: 'all 18 Screens and 20 Templates occurrences resolve to set 279:2446; Body content preferred values 10, default 26:221 unchanged',
    problemSummaryRow: '153:1186 unchanged (518x88, Show divider); not consumed; Medication summary row 219:2068 is a parallel master with the same anatomy (decision, see flag)',
    changeLogRow: 'every row is a live 18:103 instance (Screens 111, Templates 124)',
    comparison: 'every comparison is a live 35:332 instance; helpers have exactly one instance each; preferred values 13 per swap',
    duplicateMasters: 0, subscriptionSplit: 0, detached: 0,
    remoteComponentNames: 27,
    note: 'Hospitalizations/Facility Stay tab strip built twice (370:3354, 391:3568); Allergies strip a third copy of the tabs-on-divider pattern'
  },
  step3_standards: {
    unboundAuthoredPaints: 0,
    fractional: '8 hits, all the Allergy severity selector label/caret (352:3207 x 6.5, 352:3208 x 47.5) in master and placements',
    hiddenDeadLayers: 0,
    looseStacks: 'only the two named GAP wrappers in 389:3469 (layoutMode NONE around Text field + absolute Calendar)',
    unboundSpacing: 'Problem edit body 316:3412 paddingTop 8 and gap 16; 316:3434, 316:3456, 316:3458, 316:3475 gaps literal',
    inventionVsGap: {
      familyHistoryRing: '346:3083 Icon button with a bound 1px stroke override reproduces the ring the library lacks; contradicts DEFECT marker 189:615 and the bare-glyph handling used on Medication and Problems',
      allergySeveritySelector: '352:3206 local pill (chipSuccessBackground, radius/chip, DownCaret) for the source dropdown; library Chip has color=success but no caret slot; no GAP marker',
      procedureMetadataBadge: '337:3881 local outlined pill imitating a small Chip to carry a bold prefix; plan said published Chips; no GAP marker',
      markedCorrectly: ['324:4934 GAP Text field end adornment', '394:5611 GAP (clone) beside Facility Stay', 'NPVE/Color Form surface and NPVE/Dimension radius/md with operator decisions']
    },
    text: 'Akkurat LL throughout; family bound; status labels SMALL_CAPS_FORCED as in 153:1186; Title Case button labels are the existing npveBuild_buttonLabelTitleCase'
  },
  step4_fidelity: {
    verbatimMisses: ['Problems · Edit: source "Low back pain M540.50" → rebuild "M54.50" (silent correction, unlogged)', 'Facility Stay: source "Discahrge to" → rebuild "Discharge to" (silent correction, unlogged)'],
    unloggedStyleDrift: ['Problems · Edit "Type" label Regular 14 → Bold 14', 'Allergies "Mild" Bold 14 → Regular 16'],
    libraryWins: ['caret chevron vs triangle (marker 197:3416)', 'bare add-to-note glyph vs ring (marker 189:615)', 'search field without magnifier (27:295)', '48px tabs', 'Chronic chip primary main', 'EditOutlined for the source pencil (library has no plain pencil)', 'small Icon button for the 24px trash glyph'],
    decisions: ['72/71 header and footer', '16px body inset', 'content-driven height', 'Facility Stay clipped content restored (flag high)']
  },
  step5_comparisons: {
    captions: 'all nine carry "Source: <key> <node>, exported <date>" with dates matching the batch records',
    referenceScale: { oneToOne: ['254:3707', '309:5711', '309:6116', '318:6740', '339:6481', '378:5613', '393:7689'], scaled: { '346:5993': '346:3147 FIT of 550x656 into 550x600 = 0.915', '356:6236': '356:6191 FIT of 550x656 into 550x600 = 0.915' } },
    exactlyOnce: { sole: ['318:6740', '339:6481', '346:5993', '356:6236', '378:5613', '393:7689'], duplicated: ['250:3519 standalone + 254:3707', '309:4531 standalone + 309:5711', '309:4772 standalone + 309:6116', '(pre-existing, ours) 156:2428/156:2707 standalone + 160:3169/160:3680'] },
    changeLogPatterns: { withTitle: ['254:1895', '309:5243', '309:5586', '339:6405 (title lacks "Changes:" prefix)'], noTitlePadded: ['318:3928'], bareRows480: ['346:3365 (white fill on helper)', '356:6192', '378:3403', '392:4093'] },
    jargonExamples: ['550×600 fixed rebuild → 550×382 content-driven rebuild', 'Footer pinned at y544 → footer follows body at y311', 'Grey interpretation → background/paper', 'One state in the existing body API', 'Raw #EEF7F9 → NPVE/Form surface', 'Source date field → Text Field + Calendar GAP', 'Live frame → frozen 2× PNG'],
    namingDrift: 'comparison instances "Rebuild comparison — X" → "X · Reference vs rebuild" from Family history on; reference rectangles named three ways; five masters with empty descriptions (304:2910, 346:3080, 346:3113, 389:3469, 391:3567)'
  },
  step6_verdicts: {
    shellGlobals: 'meets standard as built',
    medicationList: 'meets; D standalone duplicate; L jargon rows; D Full-width slot default named for a screen (248:1827)',
    problemsEmpty: 'meets; D standalone duplicate; L jargon rows',
    problemsBrowse: 'meets; D standalone duplicate; L jargon rows',
    problemsEdit: 'meets; M change log to pattern; D/L ICD correction; L Type label; M bind spacing',
    procedures: 'meets; D metadata badge GAP marker or Chip; M change log title prefix',
    familyHistory: 'meets; D/M ring override; M reference at 550x656 clip off; M change log to pattern',
    allergies: 'meets; D severity selector GAP marker; M integer geometry; L Mild weight; M reference clip off; M change log to pattern',
    hospitalizations: 'meets; M change log to pattern; L mechanism rows',
    facilityStay: 'meets; L Discharge correction row; M change log to pattern; L mechanism row',
    rebuilds: 0,
    adopt: ['content-driven sheet height with the master fixed', 'transparent rebuild helper below a short sheet', 'clip-off override on the comparison instance for tall content (apply to tall references)', 'bodies appended to Body content preferred values, default untouched', 'variant added to an existing body set instead of a new master', 'local NPVE collections for consumer-only tokens with the decision recorded and no code syntax', 'global shell corrections with population counts and before/after renders', 'restore clipped source content and flag the source at high severity']
  },
  standingBatchRules: {
    '1_instancePaintVerification': 'N/A read-only; live comparison instances rendered and inspected',
    '2_unboundPaintAudit': 'PASS — all new Templates sections and every Sidesheet occurrence on Screens walked; 0 unbound authored; section chrome excluded by recorded direction',
    '3_referenceCounts': 'N/A no clone; all links resolve',
    '4_skipInvisibleFalse': 'PASS — set on every walk',
    '5_opacityLast': 'PASS — untouched',
    '6_enumerateDontRecall': 'PASS — page walks, records checked afterwards',
    '7_fileIdentityFirst': 'PASS — keys explicit; Cover 0:1 / Templates 3:2 / Screens 27:2 / Archive 126:2',
    '8_roundWithRecord': 'FOUND 8 — Allergy severity selector; recorded as flag',
    '9_boundPaintAlpha': 'PASS — untouched',
    '10_cloneDropsPropertyRefs': 'N/A'
  },
  counts: { newGapMarkersByExternal: 2, newDefectMarkersByExternal: 0, unmarkedStandIns: 2, contradictedDefect: 1, rebuilds: 0 },
  figmaMutations: [],
  screenshots: fs.readdirSync('./' + F).filter(f => f.endsWith('.png')).map(f => F + f)
};

const flags = [
  { id: 'npveExtReview_familyHistoryRingOverride', severity: 'medium', kind: 'DEFECT', summary: 'Family history add-to-note action draws the source ring through a stroke override on a library Icon button instance, contradicting DEFECT marker 189:615 and the bare-glyph handling used on Medication and Problems rows.', where: 'target 346:3083 (master) and its placements in 346:3089, 346:3113, 346:3148, 346:5993; source rings 648:3265, 648:3272', detail: 'Stroke SOLID bound, weight 1, radius 20 from the master. The library Icon button 170:77 has no ringed variant (flag npveProblemsCorrections_iconButtonNoRingedVariant). One screen now renders a ring the library cannot ship while the others render the bare glyph.', handling: 'Decision for Daniel: remove the override so all screens agree with the marker, or reverse the earlier decision for every screen and record it.' },
  { id: 'npveExtReview_allergySeveritySelectorUnmarked', severity: 'medium', kind: 'GAP', summary: 'The Allergies rebuild draws a local dropdown pill (Allergy severity selector 352:3206) for the source "Mild" control; the library has no dropdown chip and no GAP marker was placed.', where: 'target 352:3206; placements 354:3209, 355:5934, I356:3249;6:80;355:5934;354:3209; source I129:7816', detail: 'Fill bound color/hardcoded (no palette)/chipSuccessBackground, radius bound radius/chip, live DownCaret. Library Chip 156:171 offers color=success but only a Delete icon boolean, no caret. Source label is Akkurat LL Bold 14; rebuild Regular 16.', handling: 'Decision for Daniel: add a GAP marker beside 356:6236 and label the stand-in SCAFFOLDING, or use Chip color=success and log the missing caret. Library to-do: dropdown chip.' },
  { id: 'npveExtReview_procedureMetadataBadgeUnmarked', severity: 'medium', kind: 'GAP', summary: 'Procedure history metadata 337:3881 is a locally drawn outlined pill imitating a small Chip so that a bold prefix can precede the value; the plan said published Chips and no GAP marker was placed.', where: 'target 337:3881 and 337:3887/3890/3893/3896 inside 337:3884; source 648:3473 pills', detail: 'Fills, strokes and radius are bound; the shape is a Chip lookalike. Library Chip has a single Label and cannot mix weights.', handling: 'Decision for Daniel: GAP marker ("Chip cannot carry a bold prefix") beside 339:6481, or swap to Chip size=small variant=outlined at one weight and log the lost emphasis.' },
  { id: 'npveExtReview_referenceScaledToSlot', severity: 'medium', kind: 'DEFECT', summary: 'The Family history and Allergies references are 550x656 source frames fitted into the 550x600 reference slot, so both comparisons show the source at 91.5% against a 1:1 rebuild.', where: 'target 346:3147 (FIT), 356:6191 (FIT); comparisons 346:5993, 356:6236', detail: 'Rule 15 asks for a flat 2x export at 1x dimensions. The Facility Stay batch already disabled clipping on the comparison instance to show an 853px rebuild; the same override on the Reference column allows a 656px reference.', handling: 'Fix in master: resize the two reference helpers to 550x656, image FILL, and set clipsContent false on the Reference column of the two instances. Later: give the comparison master HUG slots.' },
  { id: 'npveExtReview_changeLogPatternDrift', severity: 'medium', kind: 'DEFECT', summary: 'The change-log sub-components use three different presentations: Content wrapper with title (Medication, Empty, Browse, Procedures), padded rows without a title (Edit), and bare 480px rows without title or padding (Family history with a white helper fill, Allergies, Hospitalizations, Facility Stay).', where: 'target 318:3928, 339:6405 (title without "Changes:" prefix), 346:3365, 356:6192, 378:3403, 392:4093; pattern 18:109 and 114:880', detail: 'Rows are live Change log/Row instances everywhere, so the register is intact; the card, title and divider drifted.', handling: 'Fix in master: rebuild the six helpers on the Change log pattern (Content 480 padded 16, Title "Changes: <screen>", Title divider, Rows 448). Additive: wrap, do not delete rows.' },
  { id: 'npveExtReview_changeLogJargon', severity: 'low', kind: 'DEFECT', summary: 'Many change-log rows are written in system jargon (node coordinates, token names, hex values, "content-driven", "API", "frozen 2× PNG") rather than plain graphic-design language.', where: 'rows in 254:1895, 309:5243, 309:5586, 318:3928, 392:4093, 378:3403 (examples in the report)', detail: 'Rule 14 and agent rule 8. Two rows per log on Hospitalizations and Facility Stay describe the comparison mechanism, not a change to the screen.', handling: 'Log rows: rewrite in place (same instances, new text). Drop the mechanism rows or move their content to the helper description.' },
  { id: 'npveExtReview_silentTextCorrections', severity: 'low', kind: 'DECISION', summary: 'Two source strings were corrected in the rebuild without a change-log row or record: Edit Problem "Low back pain M540.50" → "M54.50" and Facility Stay "Discahrge to" → "Discharge to".', where: 'target I318:3655 body text, 389:3691; source I4537:28000;3408:8553;289:80, 648:1686', detail: 'Rule 11: a disagreement with the source is a finding, not a silent reconciliation. Both corrections are probably right.', handling: 'Decision for Daniel: keep the corrections and add a log row to each, or restore verbatim and mark the source typo.' },
  { id: 'npveExtReview_unloggedTypeStyleDrift', severity: 'low', kind: 'DEFECT', summary: 'Two text styles changed against the source without a log row: Edit Problem "Type" label Regular 14 → Bold 14; Allergies "Mild" Bold 14 → Regular 16.', where: 'target 316:3457, 352:3207; source 4695:13230, I129:7816;16727:71253;3036:6096', detail: 'Neither is a library binding; both are authored choices.', handling: 'Log rows, or restore the source weight and size.' },
  { id: 'npveExtReview_standaloneScreenDuplicates', severity: 'medium', kind: 'DECISION', summary: 'Medication list, Problems · Empty and Problems · Browse exist twice on Screens: as standalone Sidesheet instances (sections 04, 06) and inside their comparison sub-components. Rule 15 as rewritten says each screen exists exactly once inside the sub-component.', where: 'target 250:3519, 309:4531, 309:4772; also pre-existing 156:2428, 156:2707 (section 02, built before the rewrite)', detail: 'The external agent followed the standalone pattern our own Problems management section already had, then moved to sole placement from Problem Edit onward.', handling: 'Decision for Daniel: archive sections 02, 04 and 06 with a README (additive, mark superseded), or record the standalone screens as the deliberate exception.' },
  { id: 'npveExtReview_severitySelectorFractional', severity: 'low', kind: 'DEFECT', summary: 'Allergy severity selector centres 57px of content in a fixed 70px frame, placing its label at x 6.5 and caret at x 47.5 in the master and every placement; the batch record claims whole-pixel geometry.', where: 'target 352:3207, 352:3208 and the same nodes under 354:3209, 355:5934, I356:3249', detail: 'Rule 4 / batch rule 8.', handling: 'Fix in master: width 72, or HUG with padding 8/8.' },
  { id: 'npveExtReview_problemEditUnboundSpacing', severity: 'low', kind: 'DEFECT', summary: 'Problem edit body carries literal (unbound) spacing: paddingTop 8 and gap 16 on 316:3412, gaps on 316:3434, 316:3456, 316:3458 and 316:3475; every other new body binds its padding and gaps.', where: 'target 316:3412 and children', detail: 'Values are correct; only the bindings are missing.', handling: 'Fix in master: bind to space/8 and space/16.' },
  { id: 'npveExtReview_fullWidthSlotDefaultName', severity: 'low', kind: 'DECISION', summary: 'The Sidesheet shell\'s Full-width action slot defaults to the screen-named "Medication list footer action" 248:1827, which rides hidden into every Sidesheet placement (22 on Templates, 17 on Screens).', where: 'target 279:2446 property Full-width action#279:11; 248:1827', detail: 'The wrapper is generic (a 534x38 frame around a published Button); only its name is screen-specific.', handling: 'Decision for Daniel: rename to a shell-level name (Figma-only affordance, Sentence case, e.g. "Sidesheet/Full-width action") with a record; local component, no published-name lock.' },
  { id: 'npveExtReview_parallelSummaryRows', severity: 'info', kind: 'DECISION', summary: 'Medication summary row 219:2068 is a second master with the same anatomy as Problem summary row 153:1186 (status control, text line, trailing action, row-owned absolute Divider with Show divider). LIBRARY-TODOS item 10 anticipates one generic pick-from-a-list row serving Problems, Medications and Allergies.', where: 'target 219:2068, 153:1186', detail: 'Not wrong now; both rows also carry the open non-base-8 decisions (flags npveSidesheet_problemSummaryRowNonBase8Spacing, npveSidesheet_medicationSummaryRowNonBase8Spacing).', handling: 'Reported. Fold into the library row generalisation batch.' },
  { id: 'npveExtReview_unrecordedAuditFolders', severity: 'low', kind: 'DECISION', summary: 'Two read-only audit folders hold screenshots with no report.md and no schema record: npve-flowsheets-list-2026-09-05 and npve-next-candidate-audit-2026-09-05.', where: 'figma-export/npve-flowsheets-list-2026-09-05, figma-export/npve-next-candidate-audit-2026-09-05', detail: 'Their outcome (Flowsheets deferred, Hospitalizations chosen) is mentioned only inside npveRebuild_externalCareHospitalizations_2026-09-05.discoveries.', handling: 'Write one read-only record naming both folders and the deferral reason; rule 7.' }
];
for (const f of flags) { f.discoveredDuring = D; f.webAppV2BugListCandidate = false; s.flags.push(f); }
s[D].flagsAdded = flags.map(f => f.id);
s[D].flagsBefore = flagsBefore;
s[D].flagsAfter = s.flags.length;
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote', D, '; flags', flagsBefore, '->', s.flags.length);
