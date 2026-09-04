# NPVE rebuild — repair batch 2 of 2: screen repairs and closeout, 2026-09-04

Batch id `npveRebuild_repair2_2026-09-04`. Target `fdCQVFdvOByaOYIJYag0d6` written. Library `YX2n4YLrEpBXNbcc73T6dw` read only (component and variable imports by key, two 24 px icon screenshots). Source `zVsuhYehoSLLq880qRBFkq` read only (three `download_assets` exports at 2x, one loadAsync name read, no page switch). `figma.skipInvisibleInstanceChildren = false` on every script. Every import bound in the script that imported it. References read after every component edit. Live instances pixel-diffed after the master edit.

Stop condition stated up front: a master edit whose live-instance diff shows change outside the edited controls, or a reference export that fails to land at 2x. Neither triggered.

Screenshots (this folder, PNG, 1x unless stated):

- `step2-before-closed-156-2428-1x.png`, `step2-before-open-156-2707-1x.png` — the two management screens before any write
- `step2-after-closed-156-2428-1x.png`, `step2-after-open-156-2707-1x.png` — after; `step2-diff-closed-156-2428.png`, `step2-diff-open-156-2707.png` — binary diff masks
- `step2-after-problem-summary-row-153-1186-1x.png` (+ `-2x-view.png`, upscaled for reading) — the rebuilt master
- `step2-defect-marker-ringed-189-615-1x.png` — the new DEFECT marker
- `library-icon-addpaymentnote-575-2.png`, `library-icon-document-575-11.png` (+ `-8x.png`) — the two note-glyph candidates
- `step6-source-4618-5137-favorites-2x.png` 1100 × 1200, `step6-source-545-5239-main-2x.png` 1100 × 1034, `step6-source-4494-3240-statusmenu-2x.png` 1100 × 1020 — the re-exported references
- `step6-comparison-status-menu-160-3680-1x.png` — comparison after re-export and change-log rewrite
- `page-screens-27-2-before-relay.png`, `page-screens-27-2.png`, `page-archive-126-2.png`
- `CLAUDE.md.before-2026-09-04` — the rules file before step 7

## Step 1 — Repair1 step 2 finished

Decision recorded: the 5- and 6-pixel anti-aliased edge differences from repair 1 are accepted as rendering noise (same-node control was 0, positions integer, overrides identical). Renamed: 27:6 → `_Superseded — see Screens — Clin_Problems-Recent`, 40:252 → `_Superseded — see Screens — Clin_Problems-Favorites` (the screen identity kept after the prefix so the Archive frame is still findable). README body 185:5 rewritten: section 02 line now says the screens *are* named and why; the pending clause is gone.

## Step 2 — Problem summary row 153:1186

**Glyph choice.** The library has two note/document icons: Icon/AddPaymentNote 575:2 (clipboard with a plus and lines) and Icon/Document 575:11 (plain sheet). The source glyph is a document with an add badge, so **Icon/AddPaymentNote** was used; Document is the alternative if the payment connotation of the name matters. Edit uses **Icon/EditOutlined** 575:13.

**What was built** (all in one script, imports by key, Icon button resolves to 77:1104):

| Node | Before | After |
|---|---|---|
| Actions 153:1190 | fill #FFFFFF unbound; children 170:1607 Edit problem, 170:1611 Add to note (drawn frames) | fill color/background/paper; children 190:11 "Edit problem" and 190:12 "Add to note", Icon button color=default size=medium State=Default with Icon swapped to EditOutlined / AddPaymentNote, 40 × 40 each |
| Status control 170:1590 | Status text + 170:1592 drawn caret 9 × 5, 62 wide | Status text + 190:18 "Status caret" Icon/DownCaret instance rescaled 0.5 to 12 × 12 (vector 10 × 5.5), bottom-aligned as before, 65 wide |
| Status text 170:1591 | Akkurat LL Bold 14, line height AUTO (17 tall), fill #3FA266 unbound, no type bindings | bound font/family/base, font/size/body2 (14), font/lineHeight/body2 (20), font/weight/bold; fill color/success/main |
| Drawn nodes 170:1607, 170:1611, 170:1592 | inside the master | moved (not deleted) to Archive 03 › `_Legacy hand-drawn — Problem summary row controls (moved out of 153:1186 on 2026-09-04)` 190:23; every paint on them bound to its exact token: ring stroke → color/core/dark, pencil → color/primary/main, note glyph → color/primary/light, caret fill → color/success/main, caret stroke → color/common/black, hidden frame fills → paper |

**Raw hex.** All nine unbound paints are gone from the master (walk: 0). None needed a nearest match — every hex was an exact library value: #3FA266 = color/success/main, #8CA7A2 = color/core/dark, #417E86 = color/primary/light, #004852 = color/primary/main, #9A9A9A = color/grey/500. The Colours-without-a-token GAP marker 27:306 gained a paragraph saying so.

**How status colour is switched.** The set has no Status variant axis. The colour is a per-instance fill override on the Status text and on the caret glyph: the master carries color/success/main; the six placed rows in Problems list body override it — ACTIVE rows keep success/main, RESOLVED and MARKED AS ERROR rows carry color/grey/500 (the mapping the GAP marker already documents for #9A9A9A). Before this batch those overrides were raw #3FA266 / #9A9A9A; they are now bound on all six (172:3134, 3151, 3168, 3185, 3202, 3219), text and caret both. A Status variant axis would be cleaner; not built, decision for a later batch.

**References.** Master 3 own (Name, Code, Status) plus 2 nested Icon-slot refs inside the two Icon buttons = 5 on the findAll count. Problems list body 30 / 41 (was 24 / 35: +6 from the three rows × two new Icon buttons per variant). Rule 3 satisfied: nothing dropped.

**DEFECT marker.** 189:615 "DEFECT marker — Ringed icon buttons" cloned from the Add button ring marker (same convention: grey/300 fill, grey/500 dashed border, grey chip, no semantic colour, 0 unbound), placed in Screens section 02 at (1300, 120) beside the two management screens (section widened 1300 → 1800). Example = Icon button with Icon/EditOutlined. Fix line unchanged ("Icon button 170:77 has no outlined or ringed variant"). Difference text: source rings, library bare glyph, same ruling as the Add button marker, marks the two actions on every Problem summary row.

**Pixel diff of the live screens** (before vs after, 1x, 550 × 600):

| Screen | Diff bbox | Differing columns |
|---|---|---|
| 156:2428 Closed | (24, 203) – (526, 389) | 24–169 (status word + caret) and 438–525 (the two action buttons) |
| 156:2707 Open | (24, 203) – (526, 389) | 24–87, 160–166 (status word + caret, partly under the open menu) and 438–525 |

Nothing outside the status control and the action buttons changed; rows, name, code, toolbar, filters and footer are pixel-identical. The status word sits 3 px higher than before because its box grew from 17 to 20 with the bound line height; that is inside the control.

Rule 1: transient instance of 153:1186 (created and removed in-script) reads every paint bound — paper, success/main ×2, text/primary, text/secondary, paper, grey/600 ×2 (the Icon button glyphs) — and a live RESOLVED row reads grey/500 on word and caret.

## Step 3 — Problems list body and picker set

16 frames bound to color/background/paper (155:1560, 1591, 1605, 2546, 2563, 2580; 156:1254, 1261, 1295, 1298, 1299, 1302, 1305, 1306, 1311, 1316), read back bound on all. Six hidden Tabs instances renamed with the `_Legacy hidden — ` prefix (39:355, 39:369, 94:643, 94:644, 94:655, 94:656), each confirmed invisible before renaming. Reference counts unchanged by this step (24 / 35 before step 2; 36 × 3 on the picker set).

## Step 4 — Change-log rows

Rows are Change log/Row instances with What / From to / Why as TEXT properties, so the rewrite went through `setProperties` on the sub-component masters 160:1847 (Main) and 160:1924 (Status menu); the Screens instances follow. Set verbatim:

| Row | What | From → to | Why |
|---|---|---|---|
| Controls (160:1853, 160:1930) | Controls | Drawn circles and glyphs → library buttons | Library. The circled style has no library button yet. Marked |
| Density (160:1855, 160:1932) | unchanged | unchanged | Library. Rows, tabs and buttons are all taller |
| Shell (160:1852, 160:1929) | unchanged | unchanged | One shared panel shell for every screen |
| Status menu (160:1933, status-menu log only) | unchanged | unchanged | The open menu is now a state of the screen, not a loose layer |
| Rows (160:1854, 160:1931) | unchanged | unchanged | Same row everywhere. Name, code and actions stay consistent |

Rendered in `step6-comparison-status-menu-160-3680-1x.png`.

## Step 5 — Markers back on Screens

All four moved from Archive 01 (now empty, kept) into Screens section 01 · Current comparisons, which was widened 1868 → 2400, stacked at x 1868 with 40 px gaps: Search field 27:295 y 120 (432 tall), Colours without a token 27:306 y 592 (552 tall after the appended paragraph), Add button ring 33:236 y 1184 (288), Tabs bottom rule 52:428 y 1512 (560, ends 2072 inside the 2900 section). A first placement overlapped after the colours marker grew and was re-stacked in the same batch (`page-screens-27-2-before-relay.png` shows the overlap, `page-screens-27-2.png` the final). All four relate to the picker screens, which is why they sit beside the picker comparisons; the new ringed-buttons marker sits beside the management screens in section 02. README section 01 line rewritten to say the section is empty since 2026-09-04 and why.

## Step 6 — References at 2x

The audit's three 1x references were Favorites, Main and Status menu (Recent was already 2x). `download_assets` from the source at scale 2, png: 4618:5137 → 1100 × 1200, 545:5239 → 1100 × 1034, 4494:3240 → 1100 × 1020. `upload_assets` with target node ids set them as fills: 114:898 FIT (kept), 160:1324 and 160:1326 FILL (kept). Read back through `getImageByHash().getSizeAsync()`: ratio 2.000 on all three, one fill each. Captions re-dated through the Source caption property: 116:1338 "…4618:5137, exported 2026-09-04" (was "refreshed 2026-09-03"), 160:3169 "…545:5239, exported 2026-09-04", 160:3680 "…4494:3240, exported 2026-09-04". Recent 116:498 untouched ("exported 2026-09-02"). The Status menu source export still carries the cursor glyph that is drawn in the source component itself.

## Step 7 — CLAUDE.md rules 14 and 15

Backup of the file before the edit: `CLAUDE.md.before-2026-09-04`. Rules as now written:

> 14. Every rebuilt frame has a Change log beside it, on its right, listing what changed from the source, from → to, and why in one line, in plain graphic-design language. Rows come from the batch prompt. The change log lives once, as a `_Rebuild comparison/Change log/<screen>` sub-component on Templates holding Change log/Row instances; Row stays a component so styling propagates. The schema remains the record; the change log is its plain-language view.

> 15. Every rebuilt frame sits in a Rebuild comparison on Screens: an instance of the Rebuild comparison master whose three content slots are swapped per screen to `_Rebuild comparison/Reference|Rebuild|Change log/<screen>` sub-components, left to right on a grey backdrop. Each screen and its change log exist exactly once, inside those sub-components; the comparison instance is the only placement, and a fix goes to the sub-component, never to a copy. The reference is a flat export at 2x captioned with its source node id and export date, and does not update when the source changes. The grey backdrop is a deliberate exception to rule 10.

## Step 8 — LIBRARY-TODOS.md

Item 13 added before "Checked and left out": Text field masters ship hidden placeholder text ("Multiline rows", 20 in set 121:350, e.g. 130:149 and 130:168), with the decision to make (real affordance with a property, or SCAFFOLDING label and emptied copy) and the audit evidence.

## Standing rules

1. Transient instance of the rebuilt master read and removed; live RESOLVED row read (above).
2. Unbound paints outside instances, every top-level node, every page: Cover 1 (pre-existing cover fill), Templates 0, Screens 0, Archive 0. Section chrome excluded (10 / 6 / 8). The audit's 25 known-open paints are all resolved.
3. References: Sidesheet 62; Problem row 4 × 6; picker body 36 × 3; Problems list body 30 / 41; Problem summary row 5; Rebuild comparison 104; Change log 4. Nothing dropped.
5 and 9. No opacity or alpha touched; every new paint bound with opacity 1 through `setBoundVariableForPaint`.
8. Rule 8 walk: 0 hits on all pages; exempt VECTOR/GROUP 0 / 303 / 145 / 69 (the two new Icon buttons and the caret add exempt vectors).

## Counts

- Markers: 2 GAP, 3 DEFECT (one new: Ringed icon buttons), all on Screens beside the screens they mark. Archive 01 empty.
- Flags: 208 → 210 (two new); nine audit flags annotated.

## Decisions left open

1. A Status variant axis on Problem summary row instead of per-instance colour overrides.
2. Icon/AddPaymentNote vs Icon/Document as the add-to-note glyph.
3. Icon button 6:7 still cannot be renamed; left for Figma to collect.
4. Library: LIBRARY-TODOS item 13 (hidden placeholder text) and the ringed Icon button question (item 2).
