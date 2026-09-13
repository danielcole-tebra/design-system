// apply-npve-ext-review-repairs.js — records npveRebuild_extReviewRepairs_2026-09-05. Backup was taken before the batch
// (design-system-schema.backup-2026-09-05-pre-npve-ext-review-repairs.json); the script re-copies only if it is missing. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
const B = './design-system-schema.backup-2026-09-05-pre-npve-ext-review-repairs.json';
if (!fs.existsSync(B)) fs.copyFileSync(P, B);
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const D = 'npveRebuild_extReviewRepairs_2026-09-05';
const REV = 'npveRebuild_externalReview_2026-09-05';
if (s[D]) throw new Error('record already exists');
const flagsBefore = s.flags.length;
const F = 'figma-export/npve-ext-review-repairs-2026-09-05/';

s[D] = {
  _status: 'DONE. All seven review decisions applied: ring override removed and the ringed-buttons DEFECT marker extended; two GAP markers placed for the kept stand-ins; Family history and Allergies references at 1:1 with the Reference column unclipped; six change-log helpers on the Change log pattern and all 61 rows rewritten in plain language plus two typo rows; five standalone screens pixel-diffed (corner pixels only) and moved to Archive 05; Allergy severity selector at integer positions; two records annotated; CLAUDE.md gained "Sheet and comparison techniques"; LIBRARY-TODOS items 16 and 17. Ten standing rules run on all four pages. Tree committed.',
  date: '2026-09-05',
  workstream: 'NPVE Rebuild / Sidesheets',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only (not opened)',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only (not opened; verbatim strings from ' + REV + ')',
  report: F + 'report.md',
  recordGate: REV + ' recorded — passed',
  stopCondition: 'Stop if any standalone screen differs from its comparison twin beyond corner anti-aliasing, if a Sidesheet variant loses reference entries, or if a master edit changes a placed instance outside the intended region. None triggered.',
  operatorDecisions_2026_09_05: {
    ringOverride: 'Removed; the bare-glyph ruling (DEFECT marker 189:615) stands for every screen.',
    standIns: 'Allergy severity selector and Procedure history metadata are kept and marked with GAP markers per the convention.',
    scaledReferences: 'Family history and Allergies references re-clipped: 1:1 at 550x656 with the Reference column clip off, not fitted at 91.5%.',
    changeLogs: 'Unified on the Change log pattern and rewritten without jargon.',
    typoFixes: 'The two source-typo corrections are kept and logged as rows; the source frames are flagged.',
    standaloneScreens: 'The three external and the two pre-rule-15 standalone screens are archived, renamed _Superseded — see comparison.',
    records: 'The Allergies and Procedures records are annotated; their geometry and GAP claims are corrected by this batch.'
  },
  step1_ring: {
    node: '346:3083 Add condition to note (library Icon button instance inside Family history condition row 346:3080)',
    change: 'strokes [] — the master carries none; the override that drew the ring is gone',
    placementsChecked: ['I346:3099;346:3083', 'I346:3106;346:3083', 'I346:3123;346:3099;346:3083', 'I346:3123;346:3106;346:3083', 'I346:3149;6:80;346:3123;346:3099;346:3083', 'I346:3149;6:80;346:3123;346:3106;346:3083'],
    marker: '189:615 DEFECT marker — Ringed icon buttons: Difference text extended to name the Family history condition rows and the 2026-09-05 removal',
    pixels: F + 'step1-family-member-card-346-3089-after.png, ' + F + 'after-comparison-family-history-346-5993.png'
  },
  step2_gapMarkers: {
    dropdownChip: { id: '404:7061', name: 'GAP marker — Dropdown chip', section: '356:6235 (widened 1868 → 2268)', at: '(1868, 120)', covers: 'Allergy severity selector 352:3206' },
    chipBoldPrefix: { id: '404:7070', name: 'GAP marker — Chip with bold prefix', section: '339:6480 (widened 1868 → 2268)', at: '(1868, 120)', covers: 'Procedure history metadata 337:3881' },
    method: 'clone of GAP marker 394:5611 (convention treatment intact: grey/300 fill, grey/500 dashed border, GAP chip), texts replaced',
    descriptions: 'stand-in note appended to the descriptions of 352:3206 and 337:3881',
    libraryTodos: 'LIBRARY-TODOS.md items 16 (Chip has no dropdown style) and 17 (Chip cannot carry a bold prefix); item 15 already existed (Text field end adornment), so the new items took the next numbers'
  },
  step3_references: {
    helpers: { '346:3146': '550x600 → 550x656; rectangle 346:3147 550x656 FILL (image 1100x1312 at 1:1)', '356:6190': '550x600 → 550x656; rectangle 356:6191 550x656 FILL' },
    instances: { '346:5993': 'Reference column I346:5993;35:333 clipsContent false; name suffixed "(reference 656 tall at 1:1, Reference column clip off)"', '356:6236': 'Reference column I356:6236;35:333 clipsContent false; same suffix' },
    captions: 'unchanged (single-line pattern; the note went to the comparison name)',
    pixels: F + 'after-comparison-family-history-346-5993.png, ' + F + 'after-comparison-allergies-356-6236.png — source footer now visible, title sizes match the rebuild'
  },
  step4_changeLogs: {
    conformed: { '346:3365': 'Content 405:3878', '356:6192': 'Content 405:3918', '378:3403': 'Content 405:3958', '392:4093': 'Content 405:3998', '318:3928': 'Content 405:4038' },
    method: 'clone of the conforming Content card 254:1896 (paper fill, divider stroke, padding 16 bound space/16, Title bound h4-equivalent, Title divider, Rows 448); the clone\'s placeholder rows (30) were removed before the helper\'s own Row instances were moved in and set to FILL; helper fills cleared and padding zeroed',
    proceduresTitle: '339:6407 "Procedures/Surgical History" → "Changes: Procedures/Surgical History"',
    rowsRewritten: 61,
    rowsAdded: { '405:4078': 'Problem code | M540.50 → M54.50 | Source typo, corrected (in 318:3928)', '405:4084': 'Discharge label | "Discahrge to" → "Discharge to" | Source typo, corrected (in 392:4093)' },
    rowsVerbatim: 'listed in the report',
    pixels: 'after-comparison-*.png for all nine comparisons'
  },
  step6_archive: {
    pixelDiff: { method: 'PIL difference of the standalone 1x render against the (614,60) crop of its comparison render', results: { medication: '40 px > 16 of 210100, all at the four corners', empty: '40 of 330000, corners', browse: '48 of 330000, corners', closed: '40 of 330000, corners', open: '40 of 330000, corners' }, verdict: 'identical apart from corner anti-aliasing against the grey backdrop; no stop' },
    section: '407:5492 "05 · Superseded standalone screens (moved from Screens 2026-09-05)" on Archive at (1240, 4513) 3200x900',
    moved: { '250:3519': '_Superseded — see comparison · Sidesheet — Medication list (comparison 254:3707)', '309:4531': '_Superseded — see comparison · Sidesheet — Problems list · Empty (comparison 309:5711)', '309:4772': '_Superseded — see comparison · Sidesheet — Problems picker · Browse (comparison 309:6116)', '156:2428': '_Superseded — see comparison · Sidesheet — Problems list · Closed (comparison 160:3169)', '156:2707': '_Superseded — see comparison · Sidesheet — Problems list · Open (comparison 160:3680)' },
    screensSectionsRenamed: { '156:2427': '02 · Problems management markers — standalone screens moved to Archive 05 on 2026-09-05; see 03 · Problems management comparisons (markers 189:615, 197:3416 stay)', '250:3518': '04 · Medication list — standalone screen moved to Archive 05 on 2026-09-05; see 05 · Medication list comparisons (empty)', '309:4529': '06 · Problems states — standalone screens moved to Archive 05 on 2026-09-05; see 07 · Problems states comparisons (empty)' },
    readme: '185:5 Body gained a paragraph for Archive 05',
    links: 'all five remain live instances of 6:65'
  },
  step7_selector: {
    node: '352:3206 Allergy severity selector',
    change: 'primaryAxisSizingMode FIXED 70 → AUTO (hug) 73; padding 8/8 bound unchanged; Label x 6.5 → 8, DownCaret x 47.5 → 49',
    placements: { '354:3209': '73 wide, x 8 / 49', 'I355:5934;354:3209': '73 wide, x 8 / 49' },
    recordAnnotations: ['npveRebuild_allergiesList_2026-09-05.reviewAnnotation_2026_09_05', 'npveRebuild_procedureHistory_2026-09-04.reviewAnnotation_2026_09_05']
  },
  step8_claudeMd: {
    subsection: '### Sheet and comparison techniques, inserted after rule 15 under Standing rules (CRLF preserved)',
    text: [
      'Adopted 2026-09-05 from the external sidesheet batches (record npveRebuild_extReviewRepairs_2026-09-05).',
      'Sheets are as tall as their content. The Sidesheet master stays 550 by 600. A placed sheet grows or shrinks to fit its body, and the footer sits right under the last row. Never pad a short sheet to 600 or pin its footer to the bottom.',
      'Helpers under a short sheet are transparent. When a rebuilt sheet is shorter than the comparison slot, the Rebuild sub-component carries no fill, so only the sheet shows white. Nothing false extends below it.',
      'Tall content overflows the slot; the slot does not shrink it. When a reference or a rebuilt sheet is taller than the 600 slot, keep it at 1:1 and switch clipping off on that column of the placed comparison instance. Never scale a reference to fit.',
      'New bodies join the shell through its Body content list. Append the new body component to the Sidesheet\'s Body content preferred values and leave the default alone. Do not fork the shell.',
      'A new state is a new variant of the body it belongs to. Add State=Empty to the existing body set rather than creating a second set or a loose frame.',
      'Values the library lacks may live in a local NPVE collection. Name the collection NPVE/<kind>, record the operator\'s decision in the schema, claim no code syntax, and add the value to the library to-do list. Never write it into the library from a consuming file.'
    ]
  },
  standingBatchRules: {
    '1_instancePaintVerification': 'PASS — no new paint authored; edited masters (346:3080 row, 352:3206 selector, five change-log helpers, two reference helpers) re-rendered through their placed instances on Screens and inspected.',
    '2_unboundPaintAudit': 'PASS with the known cover exception — Templates 5567 nodes 0 unbound; Screens 2616 nodes 0; Archive 1528 nodes 0; Cover 8 nodes 1 (1:5 cover frame #010000, pre-existing flag npveProblemsBuild_coverPageUnboundFill). Section chrome excluded by recorded direction.',
    '3_referenceCounts': 'PASS — Sidesheet variants 58 nodes / 70 entries each; Problem summary row 6; Medication summary row 7; Change log/Row 3; Rebuild comparison 112 entries. No clone of a component.',
    '4_skipInvisibleFalse': 'PASS — set on every walk.',
    '5_opacityLast': 'PASS — opacity untouched.',
    '6_enumerateDontRecall': 'PASS — rows, placements, sections and instances enumerated from the file before each edit.',
    '7_fileIdentityFirst': 'PASS — keys explicit; Cover 0:1 / Templates 3:2 / Screens 27:2 / Archive 126:2.',
    '8_roundWithRecord': 'PASS — 0 fractional authored FRAME/COMPONENT/RECTANGLE/INSTANCE/TEXT geometry on Templates and Screens after the selector fix.',
    '9_boundPaintAlpha': 'PASS — untouched.',
    '10_cloneDropsPropertyRefs': 'PASS — the only clones were a GAP marker frame (no property references) and the Content card frame (no property references); the moved Row instances keep their three text properties.'
  },
  counts: { GAP: 2, DEFECT: 0, decisions: 7, rowsRewritten: 61, rowsAdded: 2, screensArchived: 5 },
  screenshots: fs.readdirSync('./' + F).filter(f => f.endsWith('.png')).map(f => F + f)
};

// Source-typo flags
const flags = [
  { id: 'npveSource_problemsEditIcdTypo', severity: 'low', kind: 'DEFECT', summary: 'NDE-2026 Clin_Problems-Edit shows "Low back pain M540.50"; the ICD-10 code is M54.50. The rebuild carries the corrected code and logs the correction.', where: 'source zVsuhYehoSLLq880qRBFkq I4537:28000;3408:8553;289:80; target Problem edit body text; change log row 405:4078', detail: 'Kept as a logged correction per the 2026-09-05 decision.', handling: 'Reported to the source owner; no target action.' },
  { id: 'npveSource_externalCareFacilityStayDischargeTypo', severity: 'low', kind: 'DEFECT', summary: 'NDE-2026 Clin_ExternalCareFS labels a radio group "Discahrge to". The rebuild carries "Discharge to" and logs the correction.', where: 'source zVsuhYehoSLLq880qRBFkq 648:1686; target 389:3691; change log row 405:4084', detail: 'Kept as a logged correction per the 2026-09-05 decision.', handling: 'Reported to the source owner; no target action.' }
];
for (const f of flags) { f.discoveredDuring = D; f.webAppV2BugListCandidate = false; s.flags.push(f); }

// Resolve the review flags this batch addressed
const resolved = {
  npveExtReview_familyHistoryRingOverride: 'Resolved 2026-09-05: stroke override removed on 346:3083; DEFECT marker 189:615 extended.',
  npveExtReview_allergySeveritySelectorUnmarked: 'Marked 2026-09-05: GAP marker 404:7061 beside 356:6236; stand-in kept; LIBRARY-TODOS item 16.',
  npveExtReview_procedureMetadataBadgeUnmarked: 'Marked 2026-09-05: GAP marker 404:7070 beside 339:6481; stand-in kept; LIBRARY-TODOS item 17.',
  npveExtReview_referenceScaledToSlot: 'Resolved 2026-09-05: helpers 550x656 FILL; Reference column clip off on 346:5993 and 356:6236.',
  npveExtReview_changeLogPatternDrift: 'Resolved 2026-09-05: five helpers conformed to the Content card pattern; Procedures title prefixed.',
  npveExtReview_changeLogJargon: 'Resolved 2026-09-05: 61 rows rewritten; verbatim list in the repairs report.',
  npveExtReview_silentTextCorrections: 'Resolved 2026-09-05: corrections kept, two log rows added, source frames flagged (npveSource_*).',
  npveExtReview_standaloneScreenDuplicates: 'Resolved 2026-09-05: five screens pixel-diffed and moved to Archive 05, renamed _Superseded — see comparison.',
  npveExtReview_severitySelectorFractional: 'Resolved 2026-09-05: selector hugs at 73 wide; label x 8, caret x 49.'
};
for (const f of s.flags) if (resolved[f.id]) { f.resolvedBy = D; f.resolution = resolved[f.id]; }

// Annotate the overclaiming records
s['npveRebuild_allergiesList_2026-09-05'].reviewAnnotation_2026_09_05 = 'Corrected by ' + D + ' after ' + REV + ': the rule 8 claim "all authored geometry whole-pixel" was inaccurate (severity selector label x 6.5, caret x 47.5; now 8 / 49), and findings.GAP 0 omitted the Allergy severity selector stand-in (now GAP marker 404:7061).';
s['npveRebuild_procedureHistory_2026-09-04'].reviewAnnotation_2026_09_05 = 'Corrected by ' + D + ' after ' + REV + ': findings.GAP 0 omitted the Procedure history metadata stand-in built in place of the planned published Chips (now GAP marker 404:7070).';
s['npveRebuild_familyHistory_2026-09-05'].reviewAnnotation_2026_09_05 = 'Amended by ' + D + ': the token-bound outline added to 346:3083 contradicted DEFECT marker 189:615 and was removed; the bare-glyph ruling applies to every screen.';

s[D].flagsAdded = flags.map(f => f.id);
s[D].flagsResolved = Object.keys(resolved);
s[D].flagsBefore = flagsBefore;
s[D].flagsAfter = s.flags.length;
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote', D, '; flags', flagsBefore, '->', s.flags.length, '; resolved', Object.keys(resolved).length);
