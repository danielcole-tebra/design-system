// Finalizes npveTidy_2026-09-08 after the tidy, the four page overviews and the deterministic checks.
// Opened by apply-npve-tidy-2026-09-08.js. No further Figma writes here.
const store = require('./scripts/schema/lib');

const ID = 'npveTidy_2026-09-08';
const DIR = 'figma-export/npve-tidy-2026-09-08';
store.finalizeRecord(ID, (r, loaded) => {
  r._status = 'DONE. Housekeeping tidy of fdCQVFdvOByaOYIJYag0d6 after Daniel reported empty-looking boards: every section and top-level frame on all four pages enumerated (49 nodes) and each empty or near-empty one explained against the records; two emptied Screens organizers and the oversize legacy dividers frame moved to new Archive sections 07 and 08 as labelled bars; Archive 01 kept and shrunk to a one-line bar; Screens 15 · Social History renamed 16 and reordered; four half-empty Screens boards trimmed; Templates 05/06 overlap and section 15 overflow cleared; Screens re-spaced at a uniform 200px rhythm; README paragraph added; one unexplained stray (Templates 488:8725) flagged and not touched. Nothing deleted; no master, instance, token or comparison content edited.';
  r.step2_tidy = {
    screens: {
      movedToArchive: { '250:3518': 'Screens 04 · Medication list (0 children) → Archive 07 · Emptied organizers, renamed _Emptied organizer — Screens 04 · Medication list …, 1800x900 → 1800x120 at (80,80)', '309:4529': 'Screens 06 · Problems states (0 children) → Archive 07, renamed _Emptied organizer — Screens 06 · Problems states …, 1800x900 → 1800x120 at (80,280)' },
      renamed: { '446:9236': '15 · Social History → 16 · Social History (matches Templates 16; Screens had two 15s and no 16)' },
      reordered: { '429:6859': '15 · Encounter page shell comparison moved above 16 · Social History' },
      heightsTrimmed: { '415:7207': '14 · Health Status/Observations 1536 → 1054', '446:9236': '16 · Social History 1536 → 1128', '581:11116': '20 · Hospitalizations edit comparison 1536 → 1362', '586:11764': '21 · Edit Event comparison 1536 → 1208', rule: 'content bottom + 126, the same bottom margin the 1290-tall boards carry' },
      respaced: 'sections 05 and 07-21 moved up to close the two vacated slots; every inter-section gap is now 200 (was 200/682/982/80/80/374); page height 38236 → 34942',
      finalOrder: '01 02 03 05 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 (19 sections, 0 empty, 21 top-level comparison instances)',
      vacantNumbers: '04 and 06 are left vacant on purpose: renumbering 05-21 would break the Templates ↔ Screens parallel that holds from 09 to 21'
    },
    templates: {
      shifted: 'sections 06-21 moved down 500 (06 · Medications 12560 → 13060 … 21 · Edit Event 42560 → 43060); 05 · Rebuild comparison no longer overlaps 06 (gap 199)',
      widened: { '424:4085': '15 · Encounter page shell 6300 → 6660 so the change-log helper 434:4745 (right edge 6580) sits inside' },
      notTouched: '488:8725 "Module chip" loose frame — unexplained, flagged (see flagsAdded)'
    },
    archive: {
      '126:2025': '01 · Gap and defect markers kept empty; renamed "01 · Gap and defect markers — empty since 2026-09-04; the four markers live on Screens 01 beside their comparisons (npveRebuild_repair2_2026-09-04)"; 1040x1320 → 1040x120',
      '597:11595': 'NEW section 07 · Emptied organizers (moved from Screens 2026-09-08) at (0,6533) 1960x480 holding the two Screens organizers',
      '597:11596': 'NEW section 08 · Legacy oversize — loose dividers frame moved unchanged from 03 on 2026-09-08 at (0,7213) 3348x260',
      '202:3450': '_Legacy loose dividers frame moved unchanged (3188x100) from Archive 03 (700,1180) to Archive 08 (80,80); Archive 03 content now fits its 1200 width (right edge 1148)',
      '185:3 / 185:5': 'README: dated paragraph appended (Tidy 2026-09-08 …) covering 01, 07, 08, the Screens rename and the vacant numbers; frame moved from y -320 to y -820 so it no longer sits over section 01 (it had overlapped 01 since the restructure)'
    },
    notTouched: ['Cover 1:5', 'Screens 02 (near-empty by design: two markers)', 'every comparison instance, master, helper, marker and token', 'Screens 17 board (1408 tall for a 74px row: the height belongs to the Rebuild comparison master, not the section)']
  };
  r.step3_verification = {
    screenshots: ['page-cover-0-1-overview.png', 'page-templates-3-2-overview.png (880x6000 of 6660x45460)', 'page-screens-27-2-overview.png (447x6000 of 2600x34942, after the re-spacing)', 'page-archive-126-2-overview.png (1607x3000 of 4440x8293)', 'inspect-*-part1..3.png crops'].map((f) => `${DIR}/${f}`),
    lookedAt: 'Yes, every page and every crop. Archive: README top-left, 01 as a slim bar under it, 03 left column, 02/04/05/06 right column, 07 two bars, 08 the dividers strip; nothing overlaps. Screens: nineteen boards in one column at an even rhythm, no empty board, 15 above 16. Templates: 05 and 06 separated, section 15 encloses its change log. Cover unchanged.',
    deterministic: {
      nodeCounts: 'Cover 8 (unchanged), Templates 9516 (unchanged), Screens 4564 → 4562 (the two organizers moved out), Archive 1782 → 1786 (+2 moved in, +2 new sections); total 15870 → 15872: nothing deleted',
      unboundSolidPaints: 'visible SOLID fills without a colour binding: Templates 21, Screens 19, Archive 10 — no fill was edited in this batch (renames, moves, resizes, one text edit only), so the counts are unchanged by construction',
      integerGeometry: 'every section on Templates, Screens and Archive has integer x, y, width, height',
      overlaps: 'Templates 0, Screens 0, Archive 0 (README included)',
      contentInBounds: 'no child extends past its section on any page',
      gaps: 'Screens: {200} only; Templates: 05→06 199, others unchanged',
      identity: 'fdCQVFdvOByaOYIJYag0d6; pages 0:1 Cover, 3:2 Templates, 27:2 Screens, 126:2 Archive; skipInvisibleInstanceChildren=false'
    }
  };
  r.standingBatchRules = {
    '1_instancePaintVerification': 'N/A — no instance or master paint touched; verified by node counts and the unchanged fill audit.',
    '2_unboundPaintAudit': 'PASS — every node on every page walked; counts recorded (Templates 21, Screens 19, Archive 10 by the visible-unbound-solid method).',
    '3_referenceCounts': 'PASS — 21 top-level comparison instances on Screens; 19 sections; Archive 9 top-level nodes.',
    '4_skipInvisibleFalse': 'PASS — set false for every walk.',
    '5_opacityLast': 'PASS — no paint touched.',
    '6_enumerateDontRecall': 'PASS — every section and frame enumerated live before any change; records searched for each finding.',
    '7_fileIdentityFirst': 'PASS — file key passed explicitly on every call; page inventory verified first.',
    '8_roundWithRecord': 'PASS — all authored positions and sizes are integers.',
    '9_boundPaintAlpha': 'PASS — no paint touched.',
    '10_cloneDropsPropertyRefs': 'PASS — nothing cloned.'
  };
  r.screenshots = r.step3_verification.screenshots;
  r.decisionsForOperator = ['Screens numbering: 04 and 06 are vacant after the move. Keep them vacant (recommended; preserves the Templates ↔ Screens parallel 09-21) or renumber 05-21 in a follow-up batch.'];
  r.findings = { GAP: 0, DEFECT: 0, DECISION: 1, PROCESS: 0, FLAGGED_UNEXPLAINED: 1 };
  r.flagsAdded = ['npveTidy_looseModuleChipFrameUnexplained'];
  r.flagsAfter = { active: loaded.flags.active.entries.length + 1, resolved: loaded.flags.resolved.entries.length, total: loaded.flags.active.entries.length + loaded.flags.resolved.entries.length + 1 };
  r.figmaMutations = [
    'Templates: 16 sections moved down 500; section 424:4085 widened 6300 → 6660.',
    'Screens: 446:9236 renamed; 429:6859 and 446:9236 swapped in order; four sections resized; 250:3518 and 309:4529 moved to Archive; 05 and 07-21 re-spaced.',
    'Archive: 126:2025 renamed and resized; sections 597:11595 and 597:11596 created; 202:3450 moved into 597:11596; README 185:5 text appended, 185:3 moved to y -820.',
    'No node deleted. Source and library not read or written.'
  ];
  return r;
});
store.appendFlags([{
  id: 'npveTidy_looseModuleChipFrameUnexplained',
  severity: 'low',
  kind: 'HOUSEKEEPING',
  summary: 'A loose FRAME named "Module chip" (488:8725, 116x40, teal fill, inner frame + Icon/Close instance) sits at (485,1524) in Templates 15 · Encounter page shell beside the Module chip set 426:4213; no record or flag cites it.',
  where: 'target Templates 424:4085, node 488:8725',
  detail: 'Its id falls between the encounter toolbar batch (473:) and the PMHx pilot (518:), so it dates from around the module chip batches of 2026-09-06, but neither npveRebuild_moduleChipFix_2026-09-06 nor npveRebuild_moduleChipRelationshipSpacing_2026-09-06 lists it. It is not a PROOF by name and not a placement under rule 15.',
  handling: 'Reported, not touched (npveTidy_2026-09-08: unexplained items are flagged, not moved). Decision for Daniel: archive it as a stray under Archive 03, or keep it if it was a deliberate measurement stand-in.',
  discoveredDuring: 'npveTidy_2026-09-08'
}]);
console.log('finalized', ID, '| flag appended');
