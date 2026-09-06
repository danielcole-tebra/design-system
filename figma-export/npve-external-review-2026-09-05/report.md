# NPVE external sidesheet work — peer review (read-only), 2026-09-05

Schema record: `npveRebuild_externalReview_2026-09-05`. Backup: `design-system-schema.backup-2026-09-05-pre-npve-external-review.json`.
Target `fdCQVFdvOByaOYIJYag0d6` read only; library `YX2n4YLrEpBXNbcc73T6dw` and source `zVsuhYehoSLLq880qRBFkq` read only. `figma.skipInvisibleInstanceChildren = false` on every walk. File identity verified: Cover 0:1, Templates 3:2, Screens 27:2, Archive 126:2.

Scope reviewed: everything added or changed in the target after commit `cd092d9` (row-structure batch, record `npveRebuild_rowStructure_2026-09-04`). Enumerated from the artifact (page walks), not from the records; the records were then checked against the enumeration.

## Headline

All twenty batches since the row-structure batch have a dated schema record, an apply script, a backup and a report folder. The record gate chain is unbroken (each record names the previous one as passed). Two review-only folders (`npve-flowsheets-list-2026-09-05`, `npve-next-candidate-audit-2026-09-05`) hold screenshots with no report.md and no record; they are mentioned only inside the Hospitalizations record. Two record claims are inaccurate (see §1.3).

No subscription split, no duplicated masters, no detached instances, no hidden dead layers, zero unbound solid paints in the authored product content. The screens consume the shared Sidesheet, Change log/Row and Rebuild comparison. Verdict per screen: nine screens meet the standard with numbered repairs; no rebuilds. Three unmarked stand-ins and one contradicted DEFECT are the substantive rule-5 findings. Details below.

## Step 1 — Scope and records

### 1.1 Batches since cd092d9 (schema order)

| # | Record | Date | Kind | Report folder | Record present |
|---|---|---|---|---|---|
| 1 | npveRebuild_medicationSummaryRow_2026-09-04 | 09-04 | build (Templates) | npve-medication-summary-row-2026-09-04 | yes |
| 2 | npveRebuild_medicationListBody_2026-09-04 | 09-04 | build | npve-medication-list-body-2026-09-04 | yes |
| 3 | npveRebuild_medicationSurfaceCorrection_2026-09-04 | 09-04 | correction | npve-medication-surface-correction-2026-09-04 | yes |
| 4 | npveRebuild_medicationListSidesheet_2026-09-04 | 09-04 | build (Screens) | npve-medication-list-sidesheet-2026-09-04 | yes |
| 5 | npveRebuild_medicationListHeightCorrection_2026-09-04 | 09-04 | correction | npve-medication-list-height-correction-2026-09-04 | yes |
| 6 | npveRebuild_sidesheetOutlineFooterGlobal_2026-09-04 | 09-04 | global shell edit | npve-sidesheet-outline-footer-global-2026-09-04 | yes |
| 7 | npveRebuild_sidesheetRadiusPlacement_2026-09-04 | 09-04 | global shell edit | npve-sidesheet-radius-placement-2026-09-04 | yes |
| 8 | npveRebuild_sidesheetHeaderInsetAudit_2026-09-04 | 09-04 | read-only audit | npve-sidesheet-header-inset-audit-2026-09-04 | yes |
| 9 | npveRebuild_sidesheetHeaderPaddingGlobal_2026-09-04 | 09-04 | global shell edit | npve-sidesheet-header-padding-global-2026-09-04 | yes |
| 10 | npveRebuild_sidesheetBase8SpacingAudit_2026-09-04 | 09-04 | read-only audit | npve-sidesheet-base8-spacing-audit-2026-09-04 | yes |
| 11 | npveRebuild_problemsLowOversightBatch_2026-09-04 | 09-04 | build | npve-problems-low-oversight-batch-2026-09-04 | yes |
| 12 | npveRebuild_problemEdit_2026-09-04 | 09-04 | build | npve-problem-edit-2026-09-04 | yes |
| 13 | npveRebuild_problemEditSpacingCorrection_2026-09-04 | 09-04 | correction | npve-problem-edit-spacing-correction-2026-09-04 | yes |
| 14 | npveRebuild_procedureHistory_2026-09-04 | 09-04 | build | npve-procedure-history-2026-09-04 | yes |
| 15 | npveRebuild_familyHistory_2026-09-05 | 09-05 | build | npve-family-history-2026-09-05 | yes |
| 16 | npveRebuild_allergiesList_2026-09-05 | 09-05 | build | npve-allergies-list-2026-09-05 | yes |
| 17 | npveRebuild_allergiesComparisonHeightCorrection_2026-09-05 | 09-05 | correction | npve-allergies-comparison-height-correction-2026-09-05 | yes |
| 18 | npveRebuild_externalCareHospitalizations_2026-09-05 | 09-05 | build | npve-external-care-hospitalizations-2026-09-05 | yes |
| 19 | npveRebuild_externalCareFacilityStay_2026-09-05 | 09-05 | build | npve-external-care-facility-stay-2026-09-05 | yes |
| — | (none) | 09-05 | read-only look at Flowsheets 939:9228 | npve-flowsheets-list-2026-09-05 (1 png, no report) | **no** |
| — | (none) | 09-05 | read-only candidate audit (9 png) | npve-next-candidate-audit-2026-09-05 (no report) | **no** |

LIBRARY-TODOS.md gained item 15 (Text field end-adornment slot), matching flag `npveProblemEdit_textFieldNoEndAdornment`. Flags 221 → 233 across the batches; every `flagsAdded` id exists in `flags[]`.

### 1.2 What exists in the file (enumerated)

Templates page, new sections and masters:

| Section | Masters / helpers | Source frame |
|---|---|---|
| 01 · Sidesheet shell 126:2020 (widened 2730→3230) | Sidesheet set 279:2446 = Placement=Floating 6:65, Docked right 279:2416, Docked left 279:2431; examples 279:2613, 279:2711 | Sidesheetv3 129:6647 (radius evidence) |
| 02 · Problems picker 126:2021 | Problems browse body 304:2910 (wraps live Active tab=All) | Clin_Problems2-Edit 129:10016 |
| 03 · Problems management 153:1185 | Problems list body 156:2426 gained State=Empty 304:2883 | Page54 4704:17095 |
| 05 · Rebuild comparison 126:2023 | Reference/Rebuild/Change log · Medication list 253:1838, 253:1840, 254:1895 | Clin_MedList 545:5557 |
| 06 · Medications 219:2067 | Medication summary row 219:2068; Medication list body 236:1758; Medication list footer action 248:1827; previews 224:1730, 238:1806 | 545:5557 rows 545:5573/5589 |
| 07 · Problems state comparison helpers 309:4528 | six helpers for Empty (309:4999/5001/5243) and Browse (309:5356/5358/5586) | 4704:17095, 129:10016 |
| 08 · Problem editing 316:3411 | Problem edit body 316:3412; Mark as error action 318:3643; footer actions 320:3849; helpers 318:3652/3654/3928 | Clin_Problems-Edit 4536:27605 |
| 09 · Procedures & surgical history 337:3880 | metadata 337:3881; event row 337:3884; body 337:3899; helpers 339:6233/6235/6405 | Clin_ProSH 648:3473 |
| 10 · Family history 346:3079 | condition row 346:3080; member card 346:3089; body 346:3113; helpers 346:3146/3148/3365 | Clin_FHx 129:7950 |
| 11 · Allergies list 352:3205 | severity selector 352:3206; Allergy card 354:3206; body 355:3217; helpers 356:6190/3248/6192 | Clin_Allergies 129:7726 |
| 12 · External care history 370:3340 | event card 370:3341; hospitalizations body 370:3353; helpers 371:3359/373:3403/378:3403 | Clin_ExternalCare-Hospitalizations 129:8316 |
| 13 · External care history · Facility Stay 388:3433 | facility stay form 389:3469; body 391:3567; helpers 392:3672/4091/4093 | Clin_ExternalCareFS 648:1603 |

Local variables added: `NPVE/Dimension · radius/md = 8` (CORNER_RADIUS, no code syntax; operator decision recorded) and `NPVE/Color · Form surface = #EEF7F9` (FRAME_FILL, SHAPE_FILL; operator decision recorded).

Screens page, new sections:

| Section | Placement | Notes |
|---|---|---|
| 04 · Medication list 250:3518 | standalone Sidesheet 250:3519 (550×382) | duplicate of the comparison content |
| 05 · Medication list comparisons 254:3706 | comparison 254:3707 | |
| 06 · Problems states 309:4529 | standalone 309:4531 Empty, 309:4772 Browse | duplicates of the comparison content |
| 07 · Problems states comparisons 309:4530 | comparisons 309:5711, 309:6116 | |
| 08 · Problem editing comparison 318:6739 | comparison 318:6740; GAP marker 324:4934 | sole placement |
| 09 · Procedures comparison 339:6480 | comparison 339:6481 | sole placement |
| 10 · Family history comparison 346:5992 | comparison 346:5993 | sole placement |
| 11 · Allergies list comparison 356:6235 | comparison 356:6236 | sole placement |
| 12 · External care history comparison 378:5612 | comparison 378:5613 | sole placement |
| 13 · Facility Stay comparison 393:7688 | comparison 393:7689; GAP marker 394:5611 (clone of 324:4934) | sole placement |

Archive page: unchanged since the row-structure batch (no new entries).

### 1.3 Record accuracy

- `npveRebuild_allergiesList_2026-09-05` claims "all authored geometry whole-pixel". The severity selector 352:3206 (FIXED 70 wide, centring 57 of content) places its Label at x 6.5 and its DownCaret at x 47.5, in the master and in all three live instances. Inaccurate.
- `npveRebuild_allergiesList_2026-09-05` and `npveRebuild_procedureHistory_2026-09-04` report GAP 0. Each built a local stand-in for something the library cannot express (§3, findings 2 and 3). The gap exists whether or not it was counted.
- `npveRebuild_familyHistory_2026-09-05` records "added a token-bound outline to reusable add-to-note action 346:3083 after the first pixel check exposed the missing source ring". Accurate as a description, but it records the invention as a fix rather than as a contradiction of DEFECT marker 189:615 (§3, finding 1).
- Everything else spot-checked against the file (ids, sizes, property defaults, preferred values, placement counts, caption dates) matched.

## Step 2 — Reuse

| Check | Result |
|---|---|
| Sidesheet shell | All 18 Sidesheet occurrences on Screens and all 20 on Templates resolve to set 279:2446 (6:65 Floating is the default; existing instances kept their links). New bodies were appended to the `Body content` preferred values (10 entries); defaults unchanged (26:221). |
| Problem summary row 153:1186 | Unchanged, 18 uses per page, still 518×88 with Show divider. Not consumed by the new screens; Medications built a parallel `Medication summary row` 219:2068 with the same anatomy (status control · line · trailing action · row-owned absolute Divider with `Show divider`). Reasonable given different fields, but LIBRARY-TODOS item 10 anticipates one generic row serving Problems, Medications and Allergies. Recorded as a decision, not a defect. |
| Change log/Row 18:103 | Every change-log row on Screens (111) and Templates (124) is a live instance of 18:103. |
| _Rebuild comparison sub-component pattern | Every comparison is a live instance of 35:332 with its three swaps set to `_Rebuild comparison/Reference|Rebuild|Change log/<screen>` sub-components; each helper has exactly one instance on Screens. Preferred values grew to 13 per swap. |
| Duplicated masters | None. 67 local masters, no repeated names. |
| Re-imported library components / subscription split | None. 27 remote component names, one key per name on both pages. The `Button` incident has no equivalent. |
| Detached instances | None on Screens or Templates. |

Minor reuse notes: the Hospitalizations/Facility Stay tab strip is built twice (370:3354 and 391:3568) instead of once; the Allergies strip 355:3218 is a third copy of the same tabs-on-divider construction. Each is the documented pattern (Tabs over a Divider, gap 0, 49 tall), so this is duplication, not deviation.

## Step 3 — Standards pass

Walk per section (Templates, all new sections plus the Sidesheet set), nodes not owned by remote library instances:

| Section | Nodes | Unbound solid paints | Fractional | Hidden (non-boolean) | Loose stacks | Notes |
|---|---|---|---|---|---|---|
| 06 Medications + Med helpers | 291 | 0 | 0 | 0 | 0 | Name/Dose 18px unbound size, auto line height (same as Problem summary row, inherited pattern) |
| 07 Problems helpers, browse body, 08 Problem editing | 975 | 0 | 0 | 0 | 0 | Problem edit body: paddingTop 8, gap 16, and the Status/Type/Dates gaps are literal (unbound) |
| 09 Procedures, 10 Family history | 322 | 0 | 0 | 0 | 0 | 346:3083 Icon button carries a stroke override (ring); FH text binds size/lh but not weight |
| 11 Allergies, 12 External care | 350 | 0 | **8** (352:3207 x 6.5, 352:3208 x 47.5, ×4 placements) | 0 | 0 | severity selector fills chipSuccessBackground, radius bound radius/chip |
| 13 Facility Stay, Sidesheet set + docked examples | 1262 | 0 | 0 | 0 (9 boolean-controlled slots) | 2 (the two named GAP wrappers, layoutMode NONE) | Header 72 padding bound space/16; outline 1/1/1/1 bound border/hairline; radii bound radius/md |

Section chrome (#E4E4E4 fills and outlines on Figma Sections) is unbound by the recorded operator direction and was excluded, as in every prior record.

Text: Akkurat LL throughout; family bound everywhere; case ORIGINAL except status labels (SMALL_CAPS_FORCED, same as Problem summary row). Button labels render Title Case ("Save & Add To Note", "Mark As Error") from the library label's textCase; that is flag `npveBuild_buttonLabelTitleCase`, not new.

Invention vs marked gap (rule 5):

1. **Family history add-to-note ring** 346:3083. A library Icon button instance with a 1px bound stroke override reproduces the source's 40px ring. The library has no ringed variant; the established handling (DEFECT marker 189:615, flag `npveProblemsCorrections_iconButtonNoRingedVariant`, Medication list 219:2068 and Problems rows) keeps the bare glyph and marks the defect. Family history alone draws the ring. Contradicts the convention and is inconsistent within the same week's work.
2. **Allergy severity selector** 352:3206. A local pill (chipSuccessBackground fill, radius/chip, editable label, DownCaret) standing in for the source's green "Mild ▾" dropdown. The library Chip (156:171) has color=success but no caret slot; nothing in the library expresses a dropdown chip. A stand-in without a GAP marker. Also: source label Bold 14, rebuild Regular 16 (style drift, unlogged).
3. **Procedure history metadata badge** 337:3881. A local outlined pill (bound fills/strokes, radius 12) imitating a small Chip so that "CPT: 27427" can carry a bold prefix. The batch plan said "published small outlined default Chips"; Chip's single Label cannot mix weights, so a local badge was drawn instead. A stand-in without a GAP marker.
4. Named GAP wrappers around Text field + Icon/Calendar (Problem edit, Facility Stay): correctly marked (324:4934, 394:5611). Meets the convention.
5. `NPVE/Color · Form surface` and `NPVE/Dimension · radius/md`: local tokens with recorded operator decisions. Meets the convention.

Containers own their alignment: yes throughout. Rows are auto-layout with CENTER counter-axis; dividers are row-owned (Medication row, absolute Divider with Show divider) or in-flow (tab strips); the only absolute children are the row divider, the two Calendar icons inside their GAP wrappers, and the Family history row Highlight (a boolean-controlled, token-bound band behind the row, matching the source's highlighted condition row).

## Step 4 — Fidelity spot-check

Fresh 1x renders of every source frame are in this folder as `source-*.png`; comparison renders as `comparison-*.png`.

| Screen | Content verbatim | Structure | Divergences (classified) |
|---|---|---|---|
| Medication list | yes | yes | caret chevron vs triangle (library-wins, marker 197:3416); bare add-to-note glyph vs ring (library-wins, marker 189:615); header 72 / footer 71 (decision); 16px inset (decision) |
| Problems · Empty | yes | yes | shell geometry (decision) |
| Problems · Browse | yes | yes | search field without magnifier (library-wins, marker 27:295); 48px tabs (library-wins, recorded); 40% opacity carried at screen level (fidelity) |
| Problems · Edit | **no**: source "Low back pain M540.50" → rebuild "M54.50" | yes | silent correction (unruled, unlogged); "Type" label Regular 14 → Bold 14 (unlogged); Chronic chip primary-main vs source teal (library-wins); calendar glyph (library-wins, GAP marked) |
| Procedures | yes | yes | metadata badge is a local stand-in (finding 3); grey date pill in source rendered as the same badge (ok) |
| Family history | yes | yes | ring drawn (finding 1); pencil vs EditOutlined (library-wins: library has no plain pencil); highlight band reproduced (ok) |
| Allergies | yes | yes | severity selector stand-in (finding 2); "Mild" weight/size drift (unlogged) |
| Hospitalizations | yes | yes | 48px tabs (library-wins) |
| Facility Stay | **no**: source "Discahrge to" → rebuild "Discharge to" | yes, plus the source's clipped Discharge/Comments restored (flagged high, decision recorded) | silent typo correction (unruled, unlogged); trash 24px glyph → 34px small Icon button (library-wins) |

Rule 11 says report, don't resolve. The two text corrections are probably right, but neither the change log nor the record says the source text was changed.

## Step 5 — Comparisons and change logs (rules 14/15)

| Comparison | Reference | Caption | Reference scale | Change log |
|---|---|---|---|---|
| 254:3707 Medication list | 253:1839, 550×380, FILL | `Source: zVsuhYehoSLLq880qRBFkq 545:5557, exported 2026-09-04` | 1:1 | Content wrapper, title "Changes: Medication list", 6 rows |
| 309:5711 Problems · Empty | 309:5000, 550×517, FILL | … 4704:17095, exported 2026-09-04 | 1:1 | title "Changes: Problems empty state", 6 rows |
| 309:6116 Problems · Browse | 309:5357, 550×600, FILL | … 129:10016, exported 2026-09-04 | 1:1 | title "Changes: Problems browse", 8 rows |
| 318:6740 Problems · Edit | 318:3653, 550×458, FILL | … 4536:27605, exported 2026-09-04 | 1:1 | **no title, no title divider**; rows padded 16 directly in the helper; 7 rows |
| 339:6481 Procedures | 339:6234, 550×302, FIT | … 648:3473, exported 2026-09-04 | 1:1 | title "Procedures/Surgical History" (no "Changes:" prefix); 6 rows |
| 346:5993 Family history | 346:3147, 550×600, FIT of a 550×656 frame | … 129:7950, exported 2026-09-05 | **0.915** | **bare rows 480 wide, no title, white fill on the helper**; 7 rows |
| 356:6236 Allergies | 356:6191, 550×600, FIT of a 550×656 frame | … 129:7726, exported 2026-09-05 | **0.915** | bare rows, no title, no fill; 7 rows |
| 378:5613 Hospitalizations | 373:3404, 550×600, FILL | … 129:8316, exported 2026-09-05 | 1:1 | bare rows, no title, no fill; 6 rows |
| 393:7689 Facility Stay | 392:4092, 550×592, FIT | … 648:1603, exported 2026-09-05 | 1:1 | bare rows, no title, no fill; 8 rows; the instance disables clipping on its Rebuild column so the 853px sheet shows |

All references are 2x exports placed at 1x dimensions with node id and date in the caption. The Family history and Allergies references are fitted into the 600px slot at 91.5%, so those two pairs are not measurable side by side (the source title visibly renders smaller than the rebuild's). The Facility Stay batch already found the fix for the rebuild column (clip off on the instance); the same applies to the reference column.

Screens exist exactly once inside sub-components for Edit, Procedures, Family history, Allergies, Hospitalizations and Facility Stay. Medication list, Problems · Empty and Problems · Browse also exist as standalone Sidesheet instances (sections 04 and 06), the same pattern our own Problems · Closed/Open screens (section 02, 156:2428/2707) already had before rule 15 was rewritten.

Change-log language (rule 14, agent rule 8). Rows are real 18:103 instances with What / From → to / Why filled. Language is mixed. Plain rows exist ("Matches the source empty state", "Keeps every repeated piece editable and consistent"), but many rows are system jargon: "550×600 fixed rebuild → 550×382 content-driven rebuild", "Footer pinned at y544 → footer follows body at y311", "Grey interpretation → background/paper", "One-off frame → Problems list body · Empty", "One state in the existing body API", "Raw #EEF7F9 → NPVE/Form surface", "Source date field → Text Field + Calendar GAP", "Live frame → frozen 2× PNG", "Source-local → library". Two rows per log (Hospitalizations, Facility Stay) describe the comparison mechanism rather than a change to the screen.

Comparison instance names drifted from "Rebuild comparison — <screen>" to "<screen> · Reference vs rebuild" from Family history onward. Reference rectangle names vary ("Source 545:5557 · 550x380", "Frozen source · 2× PNG", "Frozen source 129:7950 · 2x · 2026-09-05"). Five local masters have empty descriptions (304:2910, 346:3080, 346:3113, 389:3469, 391:3567).

## Step 6 — Verdicts (proposal)

Classification: **M** fix-in-master, **L** log row (change-log rewrite), **D** decision for Daniel.

| Screen | Verdict | Repairs |
|---|---|---|
| Sidesheet shell globals (outline, footer 71, header 72, Placement axis, radius/md) | meets standard as built | none; decisions recorded at the time |
| Medication list | meets, with repairs | 1 D standalone duplicate 250:3519 (archive or record the exception, together with 156:2428/2707); 2 L jargon rows (Shell, Surface, Footer, Body); 3 D naming: shell-level Full-width action slot defaults to the screen-named "Medication list footer action" 248:1827, which rides hidden into every Sidesheet |
| Problems · Empty | meets, with repairs | 1 D standalone duplicate 309:4531; 2 L jargon rows (Shell, Empty state) |
| Problems · Browse | meets, with repairs | 1 D standalone duplicate 309:4772; 2 L jargon rows (Source state, Shell) |
| Problems · Edit | meets, with repairs | 1 M change log helper 318:3928 to the Change log pattern (title, divider, Content wrapper); 2 D/L ICD text "M540.50" → "M54.50": keep the correction and log it, or restore verbatim; 3 L "Type" label weight; 4 M bind paddingTop/gaps in 316:3412, 316:3434, 316:3456, 316:3458, 316:3475 |
| Procedures | meets, with repairs | 1 D metadata badge 337:3881: add a GAP marker ("Chip cannot carry a bold prefix") beside 339:6481, or swap to library Chips at one weight and log it; 2 M change log title to "Changes: Procedures/Surgical History" |
| Family history | meets, with repairs | 1 D/M ring override on 346:3083: remove the stroke override so the row matches Medication/Problems and the existing DEFECT marker, or record a reversal of that decision for all screens; 2 M reference helper 346:3146 at 550×656 with clipping off on the instance's Reference column (the Facility Stay trick); 3 M change log helper 346:3365 to the Change log pattern (remove the helper fill) |
| Allergies | meets, with repairs | 1 D severity selector 352:3206: GAP marker ("no dropdown chip in the library") beside 356:6236, keep the stand-in as SCAFFOLDING-labelled or replace with Chip color=success + logged caret gap; 2 M integer geometry (selector 72 wide, or HUG with padding 8); 3 L "Mild" weight/size; 4 M reference helper 356:6190 at 550×656, clip off; 5 M change log helper to the pattern |
| Hospitalizations | meets, with repairs | 1 M change log helper 378:3403 to the pattern; 2 L mechanism rows (Source capture) |
| Facility Stay | meets, with repairs | 1 L "Discahrge to" → "Discharge to" logged as a correction; 2 M change log helper 392:4093 to the pattern; 3 L mechanism row (Source capture) |
| Records | — | 1 read-only record for the two unrecorded audit folders; 2 annotate allergiesList rule-8 claim and the GAP 0 counts |

No screen needs a rebuild.

### What the external agent did better (adopt)

- **Content-driven sheet height.** The shell master stays 550×600; a placed sheet grows or shrinks to its body and the footer follows the content. Cleaner than fixed-height placements with dead space. Adopt as the placement rule.
- **Transparent rebuild helper.** When the sheet is shorter than the 600px comparison slot, the helper drops its fill so the sheet owns the white surface. Adopt; it also motivates a `HUG` comparison slot in a later master batch.
- **Clip-off override on the comparison instance** to show a sheet taller than the slot (Facility Stay). Adopt for tall references too (fixes the 91.5% scaling).
- **Body components as preferred values on the shell's Body content swap**, with the default untouched. Adopt as the way new screens join the shell.
- **Variant added to an existing body set** (Problems list body · State=Empty) instead of a new master.
- **Local NPVE collections** (`NPVE/Dimension`, `NPVE/Color`) for values the library lacks, with the operator decision in the record and no code syntax claimed. Adopt as the pattern for consumer-file-only tokens, and keep them on the library to-do list.
- **Global shell corrections with population counts** (outline, footer, header) and before/after renders for every affected placement.
- **Restoring content the source clips** and flagging the source defect at high severity rather than reproducing the clip.

## Standing batch rules (this review)

1 instancePaintVerification: N/A, read-only; live comparison instances rendered and inspected. 2 unboundPaintAudit: walked every new section on Templates and every Sidesheet occurrence on Screens; 0 unbound in authored content; section chrome excluded by recorded direction. 3 referenceCounts: N/A, no clone; all comparison and body links resolve. 4 skipInvisibleFalse: set on every walk. 5 opacityLast: untouched. 6 enumerateDontRecall: page walks, not records. 7 fileIdentityFirst: keys explicit on every call; page ids verified. 8 roundWithRecord: 8 fractional hits found (Allergy severity selector), recorded. 9 boundPaintAlpha: untouched. 10 cloneDropsPropertyRefs: N/A. Rules 14/15: checked per screen above.

## Counts

- New GAP markers by the external agent: 1 (324:4934) plus 1 clone (394:5611). New DEFECT markers: 0.
- Unmarked stand-ins found by this review: 2 (Allergy severity selector, Procedure metadata badge). Contradicted DEFECT: 1 (Family history ring).
- Flags added by this review: 14 (`npveExtReview_*`).

## Screenshots (this folder)

comparison-medication-list-254-3707-1x.png, comparison-problems-empty-309-5711-1x.png, comparison-problems-browse-309-6116-1x.png, comparison-problems-edit-318-6740-1x.png, comparison-procedures-339-6481-1x.png, comparison-family-history-346-5993-1x.png, comparison-allergies-356-6236-1x.png, comparison-hospitalizations-378-5613-1x.png, comparison-facility-stay-393-7689-1x.png, sidesheet-set-279-2446-1x.png, standalone-medication-list-250-3519-1x.png, master-family-member-card-346-3089-1x.png, master-allergy-card-354-3206-1x.png, master-procedure-event-row-337-3884-1x.png, preview-medication-row-states-224-1730-1x.png, source-medication-list-545-5557-1x.png, source-problems-empty-4704-17095-1x.png, source-problems-browse-129-10016-1x.png, source-problem-edit-4536-27605-1x.png, source-procedures-648-3473-1x.png, source-family-history-129-7950-1x.png, source-allergies-129-7726-1x.png, source-hospitalizations-129-8316-1x.png, source-facility-stay-648-1603-1x.png.

Source renders are 1x because get_screenshot returns natural size; the 2x exports in each batch folder remain the frozen references.
