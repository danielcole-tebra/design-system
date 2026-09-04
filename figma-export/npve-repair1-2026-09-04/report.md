# NPVE rebuild — repair batch 1 of 2: file integrity, 2026-09-04

Batch id `npveRebuild_repair1_2026-09-04`. Target `fdCQVFdvOByaOYIJYag0d6` written; library `YX2n4YLrEpBXNbcc73T6dw` read only (one `importComponentSetByKeyAsync` per Button/Icon button key to confirm which subscription is current, one `importVariableByKeyAsync` per README variable); source not opened. `figma.skipInvisibleInstanceChildren = false` on every script. Imports and bindings done in the same script every time. Property references read after every component edit.

Stop condition stated up front: any non-identical screen pair in step 2 stops the renames. **It triggered.** Step 2 renames were not made; everything else completed.

Screenshots (this folder, PNG, 1x):

- `step2-archive-27-6-1x.png`, `step2-archive-40-252-1x.png` — archived screens, before any write
- `step2-comparison-116-498-1x.png`, `step2-comparison-116-1338-1x.png` — comparison instances on Screens, before any write
- `step2-crop-116-498-rebuild-1x.png`, `step2-crop-116-1338-rebuild-1x.png` — the Rebuild column cropped at (614, 60) 550 × 600 from the two above
- `step2-crop-116-498-rebuild-1x-diff.png`, `step2-crop-116-1338-rebuild-1x-diff.png` — binary diff masks
- `step2-control-27-6-second-capture-1x.png` — same node captured twice (noise control)
- `step1-after-swap-archive-27-6-1x.png`, `step1-after-swap-sidesheet-master-6-65-1x.png`, `step1-after-swap-sidesheet-open-156-2707-1x.png` — after the Button swap
- `step4-archive-readme-185-3-1x.png` — the README

## Step 1 — Button split healed

**Direction.** `importComponentSetByKeyAsync` on the Button key `cfb726c7…` returns **155:1191**, and on the Icon button key `7ebea5d7…` returns **77:1104**. So the current subscription is the newer copy in both cases, and it is the **58 instances on 3:105** that had to move, not the 8 "Create New Problem" buttons the prompt named. All 72 variants of 3:105 mapped by name to a variant of 155:1191 (0 unmatched).

**What was written.**

| Node | Change | References after |
|---|---|---|
| 6:85 Secondary action (Sidesheet master footer) | swapComponent 3:136 → 155:1222 (variant=text, color=primary) | `visible: Show secondary action#6:3`, `mainComponent: Secondary action#6:7` — unchanged |
| 6:93 Tertiary action | swapComponent 3:106 → 155:1192 (contained primary) | `visible: Show tertiary action#6:4`, `mainComponent: Tertiary action#6:8` — unchanged |
| 6:101 Primary action | swapComponent 3:118 → 155:1204 (contained secondary) | `mainComponent: Primary action#6:6` — unchanged |
| Sidesheet swap-property defaults | followed the master swap on their own: Primary 155:1204, Secondary 155:1222, Tertiary 155:1192 | `editComponentProperty` had nothing left to change |
| 3:397 Check — Button · Coral (Archive) | swapComponent 3:118 → 155:1204 | direct instance, no refs |
| 160:1328, 160:1608 (Templates), 156:2428, 156:2707 (Screens) | these four Sidesheet instances held an explicit `Primary action = 3:120` (contained secondary, Disabled); set to 155:1206 | instance property, not a ref |

Every other nested footer button followed the master swap. Sidesheet 6:65 reference count 62 before and after (findAll over the whole tree).

**Counts.**

| Copy | Before (audit) | After |
|---|---|---|
| Button 3:105 (old) | 58 | 0 — and the node **no longer exists**: `getNodeByIdAsync("3:105")` returns null. Figma drops an unused remote subscription on its own; nothing was deleted by this batch |
| Button 155:1191 (current) | 8 | **66** (Templates 34, Screens 22, Archive 10) |
| Icon button 6:7 (old) | 0 | 0 — node still present |
| Icon button 77:1104 (current) | 182 | 182 |

**Orphan rename.** `6:7.name = "_Orphaned import — Icon button"` throws `Cannot write to internal and read-only node. Are you trying to modify a remote style or component?`. Remote subscription nodes cannot be renamed from the Plugin API, so the "_Orphaned import" label cannot be applied; 6:7 stays as a zero-instance subscription until Figma collects it the way it collected 3:105. Other zero-instance orphans: the Plugin API cannot enumerate the file's subscription list, so no other orphan can be found from inside the file; every main component reachable from an instance has, by definition, instances.

**Verified in pixels.** 27:6 captured before and after the swap: diff bbox None (identical). The Sidesheet master and the Problems list · Open screen were re-captured after the swap (`step1-after-swap-*`); the footer renders Cancel / Add Active Problems To Note / Save as before. Rule 1 transient instance of 155:1191 contained primary (184:3947, created and removed in one script): 86 × 38, padding 7/17/7/17, fill color/common/white, stroke color/core/main, label and icons color/core/contrastText, all bound, opacity 1, space refs on the 997 series, label TITLE (the known `npveBuild_buttonLabelTitleCase`).

## Step 2 — Screen duplicates: stopped

Pixel diff at 1x, archived screen against the Rebuild column cropped from the comparison instance (crop origin 614, 60 — the column's content offset read from the file):

| Pair | Differing pixels | Max channel delta | Where |
|---|---|---|---|
| 27:6 vs 116:498 Rebuild | 5 | 16 / 255 | (143,155), (379,371), (409,373), (140,380), (203,380) |
| 40:252 vs 116:1338 Rebuild | 6 | 16 / 255 | the same five coordinates plus (53,253) delta 13 on the gold star edge |
| Control: 27:6 captured twice | 0 | 0 | — |

The differing pixels are single anti-aliased edge pixels (white ↔ #EFF4F4, #DFDFDF ↔ #CFCFCF) at identical coordinates in both pairs; both members of each pair sit at integer absolute positions (27:6 at 1934,180; the comparison copy at 694,180) with identical search-field and row offsets, and the audit already showed identical properties, texts and hidden lists. The same node captured twice diffs to zero, so the difference is real rendering, not capture noise, and the stop condition as written ("any non-identical pair") is met. **No rename was made.** Decision needed: accept the 5-pixel edge difference as rasterisation and rename in batch 2, or investigate.

The README on Archive states the renames as pending, not done.

## Step 3 — Retroactive record

`npveRebuild_externalRestructure_2026-09-03_retro` written to the schema: the section reorganisation on all pages, the Archive page and its four sections, Problems picker body → set 94:812, Problem row → set 107:485, Problem summary row 153:1186, Problems list body 156:2426, the instance-swap comparison shell 35:332 with twelve sub-components, the four comparison instances and two Sidesheet instances on Screens, the marker moves, the legacy detachments, the `_Legacy` renames, the Recovery checks section. Attributed to an external session (consumer node sessions 74–78 and 88–172, no record, no script, no commit), with `npveRebuild_audit_2026_09_03` and its report as evidence. Lists the 13 audit flags it addresses and the state of each after this batch.

## Step 4 — Archive README

185:3 "README — Archive", 1040 × 360 at (0, −320) on Archive, above section 01. Vertical auto-layout, padding bound to space/24, gap space/8, fill color/background/paper, stroke color/divider at border/hairline. Title 185:4 Akkurat LL Bold bound to font/family/base, font/size/body1, font/lineHeight/body1, font/weight/bold; body 185:5 Akkurat LL Regular bound to family, size/body2, lineHeight/body2, weight/regular; both fills color/text/primary. Text: what the page holds section by section, that `_Legacy`, `_Superseded` and `_Orphaned import` items are kept not deleted, that the step-2 renames are pending, and the two record names. Render: `step4-archive-readme-185-3-1x.png`. Variables imported and bound in the same script; space/24 arrived as `997:33` (the 997 series, consistent with every other space binding in the file).

## Step 5 — Standing rules

1. Instance paint verification: transient 155:1191 instance placed, read, removed (above). No new variant was created this batch.
2. Unbound paint audit, every top-level node, every page, outside instances: Cover 1 (cover fill #010000, pre-existing), Templates 25 — all on Problems management: the 9 ring/status paints on Problem summary row and the 16 white frames in Problems list body, **known-open for batch 2** (`npveAudit_problemSummaryRowDrawnControls`, `npveAudit_problemsListBodyUnboundWhite`); Screens 0; Archive 0 (the README's fill, stroke and texts are all bound). Section chrome (#E4E4E4 fill, 10% stroke) excluded: 10 / 6 / 8.
3. Reference counts: Sidesheet 62; Problem row 4 × 6; Problems picker body 36 × 3; Problems list body 24 / 35; Problem summary row 3; Rebuild comparison 104; Change log 4. None dropped.
5. Opacity: no paint-level opacity touched.
8. Rule 8 walk: 0 hits on all four pages; exempt VECTOR/GROUP 0 / 277 / 117 / 68.
9. Bound paint alpha: no alpha touched.

## Counts

- Markers unchanged: 2 GAP, 2 DEFECT, all in Archive.
- Flags: 206 → 208 (two new: orphan rename impossible; step-2 stop). Four audit flags annotated resolved or partly resolved.

## Decisions needed

1. Step 2: accept the 5-pixel anti-aliasing difference and rename the Archive screens in batch 2, or investigate first.
2. Icon button 6:7 cannot be renamed; leave it for Figma to collect, or note it only in the schema (done).
