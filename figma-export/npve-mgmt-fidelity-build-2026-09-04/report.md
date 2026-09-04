# NPVE rebuild — Problems management screens, fidelity build and closeout, 2026-09-04

Batch id `npveRebuild_mgmtFidelityBuild_2026-09-04`. Target `fdCQVFdvOByaOYIJYag0d6` written. Library `YX2n4YLrEpBXNbcc73T6dw` read only (imports by key: Form control label, Icon/DownCaret, space/0, space/3, color/text/secondary). Source `zVsuhYehoSLLq880qRBFkq` read only (one text read on 545:5520). `figma.skipInvisibleInstanceChildren = false` on every script. Every import bound in the script that imported it. References read after every master edit. All placed instances pixel-diffed after the master changes.

Record gate (agent rule 10): the previous batch in this workstream, `npveRebuild_mgmtFidelity_2026-09-04`, has its record. Passed.

Stop condition stated up front: a placed-instance diff showing change outside the regions steps 1–3 touched, or a reference count dropping on any edited master. Neither triggered.

**Addendum note.** The prompt cites "the caret-alignment addendum measurements". No addendum exists in the fidelity report, the schema, or the repo (grep for "addendum" finds only the 2026-08-03 icon notes). The alignment was taken from the fidelity read's own itemisation instead: source caret vector 8.81 × 4.4 at y 6.3 in a 17-tall status box, centre 8.5 = box centre; rebuild caret centre 34 against a text-box centre of 30, 4 px low. Source horizontal gap 4 with the vector flush to its frame.

Screenshots (this folder, PNG, 1x unless stated):

- `before-rebuild-main-160-1327-1x.png`, `before-rebuild-status-menu-160-1607-1x.png` — the fidelity read's captures, used as baselines; `source-main-545-5239-1x.png`
- `after-rebuild-main-160-1327-1x.png`, `after-rebuild-status-menu-160-1607-1x.png` — the masters after
- `after-screen-closed-156-2428-1x.png`, `after-screen-open-156-2707-1x.png` — placed screens after
- `after-comparison-main-160-3169-1x.png`, `after-comparison-status-menu-160-3680-1x.png` — comparisons after (1708 × 1290)
- `diff-main-160-1327.png`, `diff-status-menu-160-1607.png` — raw diff masks; `diff-shifted-body-main.png`, `diff-shifted-body-status.png` — body diff after correcting the 16 px shift
- `step2-problem-summary-row-153-1186-1x.png` — the row master
- `step4-gap-marker-dropdown-caret-197-3416-1x.png` — the new GAP marker
- `check-status-word-source-4x.png`, `check-status-word-rebuild-4x.png`, `check-status-caret-source-4x.png`, `check-status-caret-rebuild-4x.png`, `check-checkbox-source-3x.png`, `check-checkbox-rebuild-3x.png`, `check-toolbar-before-over-after-3x.png` — region checks

## Decisions recorded (Daniel, 2026-09-04)

1. Status words match the source: small caps via text case, not typed capitals.
2. Status select width matches the source snapped to the 8 grid: 104.
3. Edit and note controls use Icon button color=primary (teal), matching the source.
4. The dropdown caret should be MUI's default ArrowDropDown filled triangle; the library lacks it, so the chevron stays with a GAP marker and is swapped when Icon/ArrowDropDown ships.
5. The rebuild is faithful to scaffolding, not to stale source content: the Open state keeps Main's current content with the menu open.

## Step 1 — Checkbox rows

Both Filters frames (155:1591 Closed, 156:1298 Open) now hold two **library Form control label** instances (set key `77cfa2d6…`, variant State=Default), inserted at the same indices with the Label property set: 197:3289 / 197:3297 (Closed), 197:3302 / 197:3307 (Open). Read back: 190 × 42 and 241 × 42, glyph at x 9, label at x 42, second instance at x 277 under SPACE_BETWEEN — the source's 190/241 at 0/269 inside 510 becomes 0/277 inside the template's 518. The four hand-built frames (156:1254, 156:1261, 156:1299, 156:1302) were moved, not deleted, to Archive 03 › `_Legacy hand-built — Problems list body checkbox rows (moved out of 156:2426 on 2026-09-04)` 197:3288. `check-checkbox-source-3x.png` against `check-checkbox-rebuild-3x.png`: box and label positions match.

## Step 2 — Problem summary row master 153:1186

| Change | Before | After | Verified |
|---|---|---|---|
| Status text case | ORIGINAL, characters "ACTIVE" | `textCase = SMALL_CAPS_FORCED`, default value "active" (property edited, not retyped in the layer) | live row renders "active" as small caps; rendered ink height **8.44 px in both source and rebuild** (`absoluteRenderBounds`), ink bbox 8 px tall in both crops |
| Status width | 49 | 45 (box), 43.4 rendered | source 42 / 40.6 — the source carries **letterSpacing −4 %**, the rebuild 0 %; 6 letters × 14 × 4 % ≈ 3 px. Reported, not applied: code authors no letter-spacing and the 2026-09-03 decision is no letter-spacing variable |
| Status green | color/success/main #3FA266 | unchanged | source #3FA266, exact |
| Caret alignment | control MIN/MAX, gap 4 (space/4); caret centre 34 vs text centre 30 | control counter-axis CENTER, gap **3** bound to space/3; text box (0,10,45,20) centre **20**, caret instance (48,14,12,12), vector centre **20**; visual gap **4.0** px (the DownCaret vector sits 1 px inside its box) | integer positions on the instance; `check-status-caret-*-4x.png` |
| Action glyph colour | Icon button color=default, glyph grey/600 | **color=primary**, glyph color/primary/main #004852 on 190:12 and 190:18 | matches the source pencil #004852; the note glyph's source #417E86 has no Icon button colour (primary is nearest, decision 3) |
| Name on non-active rows | text/primary on all rows | master unchanged; placements 172:3151, 172:3168, 172:3202, 172:3219 override Name fill to **color/text/secondary #545454** | source rows 2–3 read #545454, which is text/secondary (also grey/600's value); text/secondary chosen as the semantic token |
| Status values on placements | "ACTIVE" / "RESOLVED" / "MARKED AS ERROR" | "active" / "resolved" / "marked as error" | source characters |

Master reference count 5 before and after (3 own + 2 nested Icon slots). Rule 1 transient instance of the master: paper ×2, success/main ×2, text/primary, text/secondary, primary/main ×2 — all bound.

Note on ids: repair 2's record listed the created ids in the wrong order. Correct: 190:11 is the Archive legacy frame, 190:12 Edit problem, 190:18 Add to note, 190:23 Status caret. Annotated in this record.

## Step 3 — Geometry

- Problems list body variants 155:1559 and 156:1294: paddingTop rebound from space/16 to **space/0** (997:34). Variant height 333 → 317; the toolbar now sits 16 under the header rule (template Body p16 alone), as in the source.
- Status filter 160:4896 / 160:4918: 154 → **104** wide (FIXED, 40 tall).
- Problem status menu 156:1321: vertical sizing FIXED 144 → **HUG**, now 344 × 108 (three 36-tall items; the hidden fourth item takes no space).
- Reference counts: Problems list body 34 / 45 (was 30 / 41: +4 = two Form control label instances × two refs each). Nothing dropped.

## Step 4 — GAP marker

197:3416 "GAP marker — Dropdown caret", cloned from the ringed-buttons marker (convention intact, 0 unbound), chip "GAP", example Icon button color=primary with Icon/DownCaret, placed in Screens 02 at (1300, 472) under the DEFECT marker. Fix: "Fix lives in the library: no Icon/ArrowDropDown (MUI's default Select caret)." Difference, verbatim: "Dropdown caret: MUI's default is a filled triangle (ArrowDropDown); the library has no such icon, so the chevron stands in. Fix lives in the library." Render: `step4-gap-marker-dropdown-caret-197-3416-1x.png`.

## Step 5 — Change logs

Density row rewritten on both logs: **Density | Looser legacy spacing → library row heights | Library. Rows and buttons sit closer than in the mockup**. The six common rows and the status-menu-only row were written verbatim onto the dead hidden picker rows (160:1856–1861 on Main; 160:1934–1940 on Status menu), which were then made visible, in prompt order after the existing rows. Main log now shows 10 rows (2 hidden clone rows remain, unused); Status menu log 12 rows (0 hidden). Rows frames 750 / 924 tall inside the fixed 1198 content. Rendered in the two `after-comparison-*` captures.

## Step 6 — LIBRARY-TODOS

Item 14 "Icon/ArrowDropDown is missing" added before "Checked and left out": MUI Select's default IconComponent, the source's filled-triangle caret on 545:5239, the new GAP marker, flag `npveMgmt_statusCaretGlyphGap`, decision 4.

## Step 7 — Pixels and rules

**Masters before vs after** (550 × 600, 1x). Raw diff bbox (16, 73)–(534, 406) on both: the whole body moved up 16 px with the padding fix, nothing above 73 or below 406 changed (header diff None; y 406–600 diff None on both). After correcting the shift, the body differs only in: toolbar right band x 380–513 (Status filter 154 → 104; the left 300 px of the toolbar are pixel-identical, max delta 0), the checkbox row (y 133–150), the status words and carets (y 188–216, 261–289, 334–362), the dimmed names on rows 2–3 (y 296–313, 370–386), the action glyphs (x 435–513), and on the Status menu screen the menu region (y 188–386). All are steps 1–3.

**Placed instances vs masters**: 156:2428 vs 160:1327 and 156:2707 vs 160:1607 differ only at (519, 88)–(520, 89), two edge pixels on the sheet's right border. The comparison instances 160:3169 / 160:3680 re-captured; captions unchanged ("exported 2026-09-04"), references unchanged (2x).

**Ten standing rules.**
1. Transient instances of Problem summary row, Problems list body State=Closed and State=Open placed, paints read, removed: every paint bound (row: 8 paints; Closed: 13 paper, white, core/main, core/contrastText ×3, inputOutline @0.23 ×3, text/primary ×5, grey/600, text/secondary ×12, success/main ×2, primary/main ×6, divider ×3, grey/500 ×4; Open the same plus 1 paper and 4 text/primary for the menu). Removal confirmed by null reads.
2. Unbound paints outside instances, every page: Cover 1 (pre-existing cover fill), Templates 0, Screens 0, Archive 0; section chrome 10 / 6 / 8 excluded.
3. Reference counts: Sidesheet 62; Problem row 4 × 6; picker 36 × 3; Problems list body 34 / 45; Problem summary row 5; Rebuild comparison 104; Change log 4. None dropped.
4. `skipInvisibleInstanceChildren = false` on every script.
5. No paint-level opacity touched; the substrate/inputOutline @0.23 reads are the variable's stored alpha (rule 9 state).
6. Enumerated from the file: hidden rows, Filters children and ids read before the writes.
7. Keys explicit on all calls; target pages Cover/Templates/Screens/Archive read first.
8. Rule 8 walk: 0 hits; exempt VECTOR/GROUP 0 / 303 / 146 / 69.
9. No alpha changed.
10. No variant cloned; reference counts above show nothing dropped.

**Open after this batch.** Status-word letter-spacing (source −4 %, rebuild 0 %, 3 px on a six-letter word): reported for a decision, not applied. Icon/ArrowDropDown: library item 14. Both management screens are otherwise fidelity-complete against the eleven proposals of the fidelity read.

## Counts

- Markers: 3 GAP (Search field, Colours without a token, Dropdown caret), 3 DEFECT. Flags: see the record (one new: letter-spacing; ten annotated).
- Commit: see the chat reply for the hash.
