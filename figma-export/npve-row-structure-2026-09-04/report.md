# NPVE rebuild — Problem summary row internal structure, 2026-09-04

Batch id `npveRebuild_rowStructure_2026-09-04`. Target `fdCQVFdvOByaOYIJYag0d6` written. Library `YX2n4YLrEpBXNbcc73T6dw` read only (space/19 imported by key; Divider main resolved from an existing instance). Source `zVsuhYehoSLLq880qRBFkq` not opened: the measurements come from the leaf itemisation recorded by `npveRebuild_mgmtFidelity_2026-09-04` and its 1x capture. `figma.skipInvisibleInstanceChildren = false` on every script. References read after every master edit. All placed instances pixel-diffed after.

Record gate (agent rule 10): `npveRebuild_mgmtFidelityBuild_2026-09-04` has its record. Passed.

Stop condition stated up front: a reference count dropping on the row or the list body, or a placed-instance diff outside the rows region. Neither triggered.

Screenshots (this folder, PNG, 1x unless stated):

- `source-main-545-5239-1x.png` — the source; `before-rebuild-main-160-1327-1x.png`, `before-rebuild-status-menu-160-1607-1x.png` — the fidelity build's after-captures, used as baselines
- `after-rebuild-main-160-1327-1x.png`, `after-rebuild-status-menu-160-1607-1x.png` — masters after
- `after-screen-closed-156-2428-1x.png`, `after-screen-open-156-2707-1x.png` — placed screens after
- `after-comparison-main-160-3169-1x.png`, `after-comparison-status-menu-160-3680-1x.png` — comparisons after
- `step2-problem-summary-row-153-1186-1x.png` — the row master, 518 × 88
- `step4-row2-source-vs-rebuild-2x.png` — row 2, divider to divider, source beside rebuild at 2x

## Step 1 — Source row measured (545:5518, the ACTIVE row; 545:5534 row 2 for divider-to-divider)

| Measure | Value | From |
|---|---|---|
| Item height | 71 | Item1 510 × 71, H p12/4/12/4 g8 MIN/**CENTER** |
| Divider-to-divider | **87** | item 71 + MainWrap gap 8 + 0-tall Divider line + gap 8 (dividers at MainWrap y 195 and 282) |
| Status + name block | 47 tall | details 406 × 47 = status 17 + gap 8 + name line 22 |
| Block margins | 12 top, 12 bottom | details at y 12 in the 71 item — centred |
| Status-to-name gap | **8** | name line at y 25 = 17 + 8 |
| Buttons vs row centre | 35.5 = 35.5 | rings 40 tall at y 15.5 in 71 — on the row's centreline |
| Left / right inset from the sheet edge | 24 / 24 | MainWrap padding 20 + item padding 4 each side |
| Divider to row centre | 43.5 | 195 − (116 + 35.5) |

Grid target for divider-to-divider: **88**. The rebuild's block is 50 (status line 20 with the bound body2 line-height + 8 + 22), so the vertical padding is (88 − 50) / 2 = **19**, and space/19 exists in Tebra/Dimension as a component-size token. Buttons 40 tall centre at 24 + 20 = 44, an integer.

## Step 2 — Master 153:1186 restructured

| Part | Before | After |
|---|---|---|
| Root | H p0/8/0/8 g8 SPACE_BETWEEN/CENTER, counter-axis sizing FIXED, 518 × 72 | H, paddings top/bottom **19 bound to space/19** (997:28), left/right 8 (space/8 unchanged), gap 8, SPACE_BETWEEN/**CENTER**, counter-axis sizing AUTO → **518 × 88** |
| Left block "Problem details" 170:1589 | V g8, 414 × 70 at y 1 (the status control was a FIXED 40-tall box with 20 px of dead space above the word) | V g8 (space/8), **HUG → 414 × 50 at y 19**: status line 60 × 20 (word 45 + gap 3 + caret 12, unchanged from the fidelity build) over the name + code line 22 at y 28 |
| Right block "Actions" 153:1190 | 88 × 40 FIXED at y 16 | HUG/HUG 88 × 40, centred by the root at **y 24** |
| Divider | none in the row; a loose Divider instance after each row in the list | **Row divider 202:3**, an instance of the library Divider, `layoutPositioning ABSOLUTE`, constraints STRETCH / MAX, 518 × 1 at (0, 87), visibility bound to a new boolean property **Show divider#202:0** (default true) |

Centres after: block 19 + 25 = **44**, row 88 / 2 = **44**, buttons 24 + 20 = **44**. Reference count 5 → **6** (Status, Name, Code, Show divider on the row's own layers; two nested Icon slots). Rule 1 transient instances with the divider on and off: 518 × 88 both, divider visible/hidden as set, every paint bound (paper ×2, success/main ×2, text/primary, text/secondary, primary/main ×2, plus color/divider when on).

**Why an instance, not a stroke.** Both survive placement, but the source has no divider under its last row, and only a node can be switched off by a boolean property; a bottom stroke cannot. The Divider instance is absolutely positioned so it takes no layout space, keeps the library's colour binding, and stretches with the row.

## Step 3 — List containers (Problems list body 156:2426)

The six loose Divider instances (155:2562, 155:2579, 155:2596 on Closed; 156:1310, 156:1315, 156:1320 on Open) were moved, not deleted, to Archive 03 › `_Legacy loose dividers — Problems list body (moved out of 156:2426 on 2026-09-04)` 202:3450. Status groups and each `Problem — …` group now stack at gap 0; each group is 88 tall holding one row; Status groups 264; variants 317 → 362. The last row in each variant (172:3168 Closed, 172:3219 Open) has Show divider = false, matching the source, which draws no line under its third row. References: Closed 34 → 37, Open 45 → 48 (+1 per row for the new boolean). Nothing dropped.

## Step 4 — Pixels

Row 2 (bounded by dividers on both sides), source against rebuild at 1x, measured from the 1x captures (`step4-row2-source-vs-rebuild-2x.png` is the side-by-side):

| Measure | Source | Rebuild | Δ |
|---|---|---|---|
| Divider-to-divider | 87 | **88** | +1 (within 2) |
| Text-ink block (status word to name descender) | rows 25–65, centre 45.0 | rows 26–67, centre 46.5 | block centre 1.5 px below the row centre in the source (43.5), 2.5 px below in the rebuild (44) — 1 px apart |
| Button glyph ink | rows 23–63 (ring), centre 43.0 | rows 32–53 (glyph only), centre 42.5 | on the centreline in both |
| Divider position on the sheet | 259, 346 | 258, 346 | the two screens' dividers now sit within 1 px of the source's |

Masters before vs after: diff bbox (16, 188)–(534, 415), the rows region only; header, toolbar, checkbox row (y < 171) and footer (y ≥ 544) diff None on both screens. Placed screens vs masters: (519, 88)–(520, 89), two border edge pixels, as in every previous batch. Comparisons re-captured; captions and 2x references unchanged.

## Step 5 — Change log

Row written verbatim on both logs: **Row structure | Loose stack near a line → one centred row that owns its divider | The row centres its own contents** — on Main via the last hidden clone row 160:1862 (made visible; one hidden clone row remains), on Status menu via a new Change log/Row instance 202:3433 (no hidden rows were left). Rows frames 827 / 1001 inside the fixed 1198 content.

## Step 6 — Standing rules

1. Transient instances of the row (divider on, divider off), Problems list body State=Closed and State=Open placed, paints read, removed; every paint bound (Closed: paper ×13, common/white, core/main, core/contrastText ×3, inputOutline @0.23 ×2, text/primary ×4, grey/600, text/secondary ×10, success/main ×2, primary/main ×6, divider ×2, grey/500 ×4; Open the same plus the menu's paper and four text/primary). No transient left (page scan 0).
2. Unbound paints outside instances, every page: Cover 1 (pre-existing), Templates 0, Screens 0, Archive 0; section chrome excluded.
3. References: Sidesheet 62; Problem row 4 × 6; picker 36 × 3; Problems list body 37 / 48; Problem summary row 6; Rebuild comparison 104; Change log 4. None dropped.
4. `skipInvisibleInstanceChildren = false` everywhere. 5 and 9. No opacity or alpha touched. 6. Enumerated from the file before every write. 7. Keys explicit. 8. Rule 8 walk 0 hits, exempt 0 / 303 / 146 / 69. 10. No variant cloned.

## Counts

- Markers unchanged: 3 GAP, 3 DEFECT. Flags: one new (the residual 1 px centring offset from the 20-tall status line, information only).
- Commit hash in the chat reply.
