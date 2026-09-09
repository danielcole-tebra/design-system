# NPVE target tidy — 2026-09-08

Batch: `npveTidy_2026-09-08` · Record: `records/npve/2026-09-08/npveTidy_2026-09-08.json` · Target: `fdCQVFdvOByaOYIJYag0d6` (pages 0:1 Cover, 3:2 Templates, 27:2 Screens, 126:2 Archive) · Executor: Claude (Anthropic claude-fable-5-1) · Trigger: Daniel reports empty-looking boards/sections.

Status: DONE with one decision open (vacant Screens numbers) and one stray flagged, not touched. Nothing deleted. No master, instance, token or comparison content edited.

## Step 1 — Diagnosis

Every section and top-level frame on all four pages was enumerated live with `skipInvisibleInstanceChildren = false` (49 top-level nodes: Cover 1, Templates 21, Screens 21, Archive 6 + README). Each empty, near-empty or misbehaving one:

| Where | What it is | Why it looks empty / wrong | Record that explains it | Tidy |
|---|---|---|---|---|
| Screens 250:3518 `04 · Medication list — …moved to Archive 05` | section 1800x900, 0 children | emptied organizer: its standalone Sidesheet moved to Archive 05 on 2026-09-05 | npveRebuild_extReviewRepairs_2026-09-05 | moved to Archive 07 as a slim labelled bar |
| Screens 309:4529 `06 · Problems states — …moved to Archive 05` | section 1800x900, 0 children | emptied organizer: two standalone Sidesheets moved to Archive 05 | same | moved to Archive 07 as a slim labelled bar |
| Screens 156:2427 `02 · Problems management markers — …` | section 1800x900, two markers at x 1300 | near-empty by design: markers stay beside where the screens were | same (markers stay) | kept, not touched |
| Archive 126:2025 `01 · Gap and defect markers` | section 1040x1320, 0 children | intentionally empty archive container: the four markers returned to Screens 01 on 2026-09-04 | npveRebuild_repair2_2026-09-04 ("archive01: empty, kept") | kept; one-line label; 1320 → 120 tall |
| Archive 185:3 `README — Archive` | frame at y −320, 720 tall | sat over section 01 (bottom 400 > 0) since the restructure | npveRebuild_repair1_2026-09-04 (README created) | moved to y −820 |
| Screens 446:9236 `15 · Social History` | duplicate number 15 (429:6859 is also 15); Screens had no 16; Templates has 16 · Social History | numbering slip when the batch created its Screens section | npveRebuild_socialHistory_2026-09-06 | renamed `16 · Social History`; reordered under 15 |
| Templates 126:2023 vs 219:2067 | `05 · Rebuild comparison` (bottom 12861) overlapped `06 · Medications` (top 12560) by 301 | Medication list helpers added to 05 on 2026-09-04 pushed it past 06 | npveRebuild_medicationListSidesheet_2026-09-04 | sections 06–21 shifted down 500 |
| Templates 424:4085 `15 · Encounter page shell` | width 6300; change-log helper 434:4745 reaches x 6580 | helper placed without widening the section | npveRebuild_encounterShell_2026-09-06 | widened to 6660 |
| Templates 488:8725 `Module chip` loose FRAME | 116x40 detached frame with teal fill, inner frame and Icon/Close instance at (485,1524) beside the chip set | **UNKNOWN** — no record or flag cites it; id sits between the toolbar batch (473:) and the PMHx pilot (518:) | none | flagged `npveTidy_looseModuleChipFrameUnexplained`; not touched |
| Archive 202:3450 `_Legacy loose dividers — …` | 3188x100 frame at (700,1180) inside Archive 03 (1200 wide): overflowed by 2688 into the 02/04 column | archived unchanged at its original width | npveRebuild_rowStructure_2026-09-04 | moved unchanged into new Archive 08 |
| Screens 415:7207, 446:9236, 581:11116, 586:11764 | sections 1536 tall holding 808/882/1116/962-tall comparisons | height copied from the 1290-tall comparison template; lower half empty | creation batches; cosmetic | trimmed to content + 126 |
| Everything else (Cover 1:5; Templates 01–04, 06–14, 16–21; Screens 01, 03, 05, 07–13, 17–19; Archive 02–06) | populated, in bounds | n/a | n/a | not touched |

Screens 17 · Past Medical History · Condition row looks tall for a 74px row; that height belongs to the Rebuild comparison master (1708x1294), not to the section. Noted, not touched.

## Step 2 — Tidy

| Page | Change | Nodes |
|---|---|---|
| Screens | Two zero-child organizers moved to Archive 07, renamed `_Emptied organizer — Screens 04 · Medication list …` / `… Screens 06 · Problems states …`, 1800x900 → 1800x120 | 250:3518, 309:4529 |
| Screens | `15 · Social History` → `16 · Social History`; Encounter shell comparison (15) placed above it | 446:9236, 429:6859 |
| Screens | Heights trimmed: 14 → 1054, 16 → 1128, 20 → 1362, 21 → 1208 | 415:7207, 446:9236, 581:11116, 586:11764 |
| Screens | Re-spaced: 05 and 07–21 moved up to close the vacated slots; every gap now 200 (was 200/682/982/80/80/374); page 38236 → 34942 tall | 16 sections |
| Templates | Sections 06–21 moved down 500; 05 no longer overlaps 06 (gap 199) | 16 sections |
| Templates | `15 · Encounter page shell` 6300 → 6660 wide | 424:4085 |
| Archive | `01 · Gap and defect markers` renamed with its reason; 1040x1320 → 1040x120 | 126:2025 |
| Archive | New `07 · Emptied organizers (moved from Screens 2026-09-08)` at (0,6533) 1960x480 | 597:11595 |
| Archive | New `08 · Legacy oversize — loose dividers frame moved unchanged from 03 on 2026-09-08 …` at (0,7213) 3348x260; dividers frame moved unchanged to (80,80); Archive 03 content now fits (right edge 1148) | 597:11596, 202:3450 |
| Archive | README: dated paragraph appended (01, 07, 08, the Screens rename, the vacant numbers); frame moved to y −820, clear of 01 | 185:5, 185:3 |

Final Screens order: `01 02 03 05 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21` — 19 sections, 0 empty, 21 top-level comparison instances.

## Step 3 — Proof

Page overviews after the tidy, saved in this folder: `page-cover-0-1-overview.png`, `page-templates-3-2-overview.png` (880x6000 of 6660x45460), `page-screens-27-2-overview.png` (447x6000 of 2600x34942, after the re-spacing), `page-archive-126-2-overview.png` (1607x3000 of 4440x8293), plus `inspect-screens-part1..3.png` and `inspect-templates-part1..3.png` crops.

Looked at: yes, every page and crop. Archive reads README top-left, 01 as a slim bar beneath, 03 in the left column, 02/04/05/06 in the right column, 07 as two labelled bars, 08 as the dividers strip; nothing overlaps. Screens is one column of nineteen boards at an even rhythm with no empty board and 15 above 16. Templates shows 05 and 06 separated and section 15 enclosing its change log. Cover unchanged.

Deterministic checks:

| Check | Result |
|---|---|
| Node counts | Cover 8 (same), Templates 9516 (same), Screens 4564 → 4562 (two organizers moved out), Archive 1782 → 1786 (two moved in, two new sections); total 15870 → 15872. Nothing deleted. |
| Unbound visible solid fills | Templates 21, Screens 19, Archive 10; no fill was edited (renames, moves, resizes, one text edit only) |
| Integer geometry | every section on Templates, Screens, Archive: integer x, y, w, h |
| Section overlaps | Templates 0, Screens 0, Archive 0 (README included) |
| Content in bounds | no child past its section on any page |
| Gaps | Screens {200}; Templates 05→06 199, others unchanged |
| File identity | fdCQVFdvOByaOYIJYag0d6, four pages as recorded; skipInvisibleInstanceChildren=false on every walk |

Ten standing batch rules: 2, 3, 4, 6, 7, 8 PASS; 1, 5, 9, 10 not applicable (no paint, no clone) and recorded as such.

## Decision for the operator

Screens numbers 04 and 06 are vacant now that their organizers live in Archive 07. Keep them vacant (recommended: renumbering 05–21 would break the Templates ↔ Screens parallel that holds from 09 to 21), or renumber in a follow-up batch.

## Findings

GAP 0. DEFECT 0. DECISION 1 (vacant numbers). One flag added: `npveTidy_looseModuleChipFrameUnexplained` (Templates 488:8725, unexplained stray, not touched; Daniel to say archive or keep). Flags 227 → 228 active, 58 resolved.

## Schema record summary

`npveTidy_2026-09-08`: DONE; step1_diagnosis (11 findings with why and record), step2_tidy (screens / templates / archive / notTouched), step3_verification (screenshots, lookedAt, deterministic), standingBatchRules, decisionsForOperator, flagsAdded, figmaMutations. Opened by `apply-npve-tidy-2026-09-08.js`, closed by `finalize-npve-tidy-2026-09-08.js`; one commit.
