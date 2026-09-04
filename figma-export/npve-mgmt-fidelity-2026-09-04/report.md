# NPVE rebuild — Problems management screens, fidelity verification, 2026-09-04

Batch id `npveRebuild_mgmtFidelity_2026-09-04`. Source `zVsuhYehoSLLq880qRBFkq` read only (`loadAsync`, no page switch, two 1x screenshots). Target `fdCQVFdvOByaOYIJYag0d6` read only (no node touched; only the schema record is written). Library `YX2n4YLrEpBXNbcc73T6dw` read only (one component and property read). `figma.skipInvisibleInstanceChildren = false` on every walk. Stop after step 7: this batch proposes, it does not fix.

Read first: CLAUDE.md rules 14 and 15 as rewritten on 2026-09-04, `npveRebuild_repair2_2026-09-04`, `npveRebuild_audit_2026_09_03`, and `npveRebuild_problemsRecent_inventory_2026_09_02.step6_siblings.main_545_5239` (the sketch said: 3 root children, header 64 p16 g16, MainWrap 377 V p16/20/16/20 g8, toolbar 510×42 with kit button and kit select, checkbox row with two DSR Form control labels, three Item rows 510×71 with dividers, footer 76 p20 g12 with kit Button 243×36 and a disabled 66×36 — all confirmed below).

Screenshots (this folder, PNG, 1x):

- `step1-source-main-545-5239-1x.png` 550×517, `step1-source-drop-4494-3240-1x.png` 550×510 — the sources
- `step2-rebuild-main-160-1327-1x.png`, `step2-rebuild-status-menu-160-1607-1x.png` 550×600 — the Rebuild sub-component masters (rule 15)
- `step2-region-<header|toolbar|checkboxes|row1|row2|row3|footer>-source-over-rebuild.png` — source region above, rebuild region below
- `step2-region-menu-source.png`, `step2-region-menu-rebuild.png`
- `step6-comparison-main-160-3169-1x.png`, `step6-comparison-status-menu-160-3680-1x.png` 1708×1290

## Step 1 — Source itemisation

Format as the picker inventory: depth · name · id · type · w×h@x,y · layout (direction, padding T/R/B/L, gap, primary/counter align) · sizing H/V · text (family style size/lineHeight, style flag, case, characters) · paint (F fill / S stroke, hex@opacity, U unbound / B bound, stroke weight and align, radius, fx). Full leaf listings (163 nodes for Main, 164 for Drop) are in the schema record `step1_itemisation`; the visible structure is summarised here, hidden layers listed separately.

### 545:5239 Page=Clin_Problems-Main, COMPONENT 550×517, V, fill #FFFFFF U, stroke #D6D6D6 U 1 inside all sides, r8

| Region | Node | Geometry · layout | Content · paint |
|---|---|---|---|
| Header | 545:5503 | 550×64 H p16 g16 MIN/CENTER; stroke #D6D6D6 bottom 1 | "Problems" 545:5504 Akkurat LL Bold 20/32 (style) #545454 U, 478×32 FILL; close 545:5516 kit Interface, Essential/Delete 24×24 bare glyph, two 8×8 paths stroke #000000 1.5 |
| Body | MainWrap 545:5517 | 550×377 V p16/20/16/20 g8 MIN/MIN | no fill |
| Toolbar | 4667:3326 | 510×42 H g8 SPACE_BETWEEN/CENTER | kit `_button template` Size=Small 4536:27572 185×42 p0/15 g5 r24, fill #FFFFFF, stroke #8CA7A2 1; label "Create New Problem" Regular 14/18 (style) #004852; Right Icon plus 16 (vector 13.33 fill **#000000**); Left Icon hidden. Kit Autocomplete Select Field 4667:4954 274×40 whose visible Field is 107×40 at x 167, H p8/8/8/16, fill #FFFFFF, stroke #545454 1, r4; text "Status" Regular 16/20 (style) #545454; Caret Button 25×25 with caret 12.15×6.7 #000000; Clear Button, Chips, Assistive text and floating Label hidden |
| Checkbox row | 4667:13143 | 510×42 H g8 SPACE_BETWEEN/CENTER | two **library** Form control label State=Default instances 4667:13134 190×42 and 4809:16479 241×42: Control 42×42 p9 r21 › Glyph Icon/CheckboxUnchecked 24 › vector 18×18 #545454 **B**; Label Regular 16/24 #000000 **B** "No known problems" / "Only show active problems" |
| Row 1 | Item1 545:5518 | 510×71 H p12/4/12/4 g8 MIN/CENTER r16 | details 545:5774 406×47 V g8 FILL: status frame H g4 › "active" 545:5520 Bold 14/auto **SMALL_CAPS_FORCED** #3FA266 42×17 + caret vector 8.81×4.4 #3FA266 (filled triangle); name row 4494:4961 H g8 BASELINE › "Low back pain" Regular 18/auto #000000, "M54.50" Regular 14/18 (style) #545454. Actions: ring 545:5778 40×40 stroke #8CA7A2 1 r32 › EditIcon 4536:27590 (local kit) › Edit_light 24: rect 13×13 stroke #004852 1, 6×6 fill #004852; ring 4536:27582 40×40 p8 stroke #8CA7A2 r32 › Add Note 24 › vector 19×19.06 #417E86 |
| Divider | 545:5525 | 510×0 kit Divider Color=Light | line stroke #D6D6D6 1 |
| Row 2 | Item3 545:5534 | 510×71 H p12/4/12/4 g8 **SPACE_BETWEEN**/CENTER r16 | details 247×47 HUG: "resolved" Bold 14/auto small caps #9A9A9A + caret #9A9A9A; "Depression, unspecified" Regular 18/auto **#545454**; "F32.A" 14/18 #545454. Actions in a wrapper 4539:28213 88×40 g8: same ring+edit, ring+note |
| Divider | 4494:4958 | as above | |
| Row 3 | Item3 4494:4951 | 510×71 H p12/4/12/4 g8 MIN/CENTER r16 | "marked as error" small caps #9A9A9A + caret; "Generalized anxiety disorder" Regular 18/auto **#545454**; "F41.1" 14/18 #545454; same two rings |
| Footer | 545:5541 | 550×76 H p20 g12 MAX/CENTER; stroke #D6D6D6 top 1 | kit Button Type=Default 4694:13151 243×36: template Size=Medium p0/15 g5 r24 fill #FFFFFF stroke #8CA7A2 1, label "Add Active Problems to Note" Regular 16/20 (style) #004852; kit Button Type=Primary State=Disabled 4694:13152 66×36 fill #FFE9E3 r24, label "Save" 16/20 #8CB2B6 |

Row pitch: rows at y 116, 203, 290 → **87** (71 row + 8 gap + 0 divider + 8 gap).

Hidden layers (Main): button Left Icon frames and their plus glyphs, button Divider frames (10×32 at x 1380, white line), footer Right Icon caret frames; select Chips (two Chip - Input "Item 1"/"Item 2"), Clear Button, Assistive Text, floating Label; per row a `diversity_4_24dp_E3E3E3_FILL0_wght` 24×24 frame (vector 19×18.5 #004852) at (24,60). None affects the render.

### 4494:3240 Clin_Problems-Drop, COMPONENT 550×510, same root paint

Header, toolbar and footer are node-for-node the same as Main (ids 4494:3241 …, 4667:4996, 4536:27595, 4667:5014, 4494:3273, 4695:13195, 4695:13196). Differences:

| Region | Node | Difference from Main |
|---|---|---|
| Checkbox row | 4667:13144 | **190×42, one Form control label only** ("No known problems"); "Only show active problems" absent |
| Row 1 | Item1 4494:3246 | "active" + "Low back pain" — **no code text** |
| Row 2 | Item2 4494:3258 | **64 tall**, details 4580:30518 406×22 **H** g8 CENTER: status "active" and name "**Hypertension**" on one line; no code; rings at y 12 |
| Row 3 | Item3 4494:3266 | "resolved" + "**Depression**" (#000000, no code) |
| Menu | Autocomplete 4494:4932 | kit Autocomplete Multi-select=None 344×132 at (20,217), fill #FFFFFF r3, 3 drop shadows; three items 344×44 H p12/16 g10, labels Regular 16/20 (style) #000000 "Active", "Resolved", "Mark as Error"; items 4 and 5 hidden ("Item 4", "Item 5") |
| Cursor | image 31 4494:4949 | 23×30 IMAGE at (72,200), the hand cursor baked into the source component |

Hidden (Drop): as Main plus the two hidden menu items.

## Step 2 — Region-by-region comparison

Rebuild read from the sub-component masters 160:1327 (Main → Sidesheet instance 160:1328, Body content = Problems list body State=Closed) and 160:1607 (Status menu → 160:1608, State=Open). Classification: **LW** library-wins (expected, should have a change-log row), **FM** fidelity miss (source content or structure dropped or altered, no ruling), **RA** rebuild addition (present in the rebuild, absent in the source, no ruling).

| Region | Source | Rebuild | Difference in numbers | Class |
|---|---|---|---|---|
| Sheet | 550×517 / 510, stroke all sides, r8 | 550×600 Sidesheet, stroke left only, r0 | +83 / +90 tall (template fixed 600); 43 px of empty body below row 3 in Main | LW (template) |
| Header | 64 tall, p16 g16; title Bold 20/32 **#545454**; bare 24 close glyph | 56 tall, p8/8/8/16 g8; title Bold 20/32 **#000000** text/primary; Icon button 40 with CloseOutlined 20 grey/600; hidden Back | −8 tall; title colour #545454 → #000000; close 24 bare → 40 button, glyph 20 grey | LW (Sidesheet; rows exist in the Sidesheet log, the management log's Shell row covers the shell) |
| Body padding | p16/20/16/20 g8 | Body p16 all + Body content **p16/0/0/0** g8 → effective top **32**, sides 16 | sides 20 → 16 (LW template); top 16 → 32: the Problems list body variant adds its own 16 on top of the template's 16, so the toolbar sits 32 under the header rule instead of 16 | sides LW; **top RA** |
| Toolbar · Create New Problem | kit small button 185×42 p0/15 g5, label 14/18, stroke #8CA7A2, plus glyph #000000 | library Button contained primary 211×38 p7/17 g8, label 16/24 TITLE, stroke core/main #B3C6C4, end-icon PlusOutlined core/contrastText #004852 | 42 → 38 tall (−4), 185 → 211 wide (+26), type 14/18 → 16/24, stroke #8CA7A2 → #B3C6C4, plus #000000 → #004852 | LW (Button) — **no change-log row** |
| Toolbar · Status dropdown | kit select, visible field 107×40, p8/8/8/16, stroke #545454 1, text "Status" 16/20 #545454, caret 12.15×6.7 #000000 | Text field size=small Value=Empty **154×40**, p8/14, outline substrate/inputOutline (#000000 @0.23), resting label "Status" 16/24 text/secondary, Select caret 16.67×9.19 grey/600 | width 107 → 154 (+47); outline #545454 → 23 % black; text 16/20 → 16/24; caret 12×7 black → 17×9 grey | component LW (Text field as select); **width RA** (nothing forces 154) — no row |
| Checkbox row | two **library Form control label** instances: Control 42 p9 (glyph at x 9), Label at x 42 → glyph-to-label gap 9 | hand-built: frame › Checkbox **Flush=Left** (p9/18/9/0, glyph at x 0) + loose Label text at x 42 → glyph-to-label gap **18**, glyph 9 px further left | the library has Form control label (140:15, State=Default/Disabled) and the source used it; the rebuild dropped it for a Flush=Left Checkbox + text, moving the box 9 px left and doubling the gap | **FM** |
| Row geometry | Item 510×71 p12/4/12/4 g8; pitch **87** (8 + divider + 8) | Problem summary row 518×72 p0/8/0/8 g8; row + 1 px Divider in a 73 frame; pitch **73** | pitch −14 per row; row padding 12/4 → 0/8; the rebuild is **denser**, not looser | LW (row component) — the Density row says the opposite, see step 4 |
| Status word | "active" Bold 14/auto, **SMALL_CAPS_FORCED**, 17 tall | "ACTIVE" typed in capitals, Bold 14/20 | small caps of lowercase letters render shorter than full capitals; the rebuild's word is visibly larger (row1 crop); 17 → 20 box | **FM** (type) |
| Status caret | filled triangle vector 8.81×4.4 | Icon/DownCaret chevron at 0.5 → 10×5.5 | glyph shape differs (▾ vs ⌄); the library has only chevron carets (Down/Up/Left/Right) | LW with a **GAP** to mark — no row, no marker |
| Name | Regular 18/auto; row 1 #000000, rows 2–3 **#545454** | Regular 18/auto text/primary on all three | non-active problem names dimmed in the source; rebuild black on all | **FM** (colour) |
| Code | Regular 14/18 #545454 | Regular 14/18 text/secondary | none | match |
| Actions | 40 rings stroke #8CA7A2; pencil #004852, note glyph #417E86, own 24 glyphs | Icon button color=default 40, glyphs EditOutlined / AddPaymentNote **grey/600 #545454** | ring dropped (ruled, DEFECT marker 189:615); glyph colour teal → grey; glyph drawings differ (library icons) | ring LW (row exists); **glyph colour** not covered — Icon button color=**primary** would give #004852 |
| Divider | 510 wide, 0-tall line, #D6D6D6 | 518×1 Divider, color/divider | +8 wide, +1 tall | LW |
| Footer | 76 tall p20 g12; buttons 243×36 / 66×36, label 16/20, stroke #8CA7A2 | 56 tall (1 divider + 55 p8 g8); 249×38 / 70×38, label 16/24 **TITLE**, stroke #B3C6C4 | −20 tall; buttons +2 tall, +6/+4 wide; "to" → "To" | LW (template + Button); title case is the known DEFECT `npveBuild_buttonLabelTitleCase`, no row here |
| Empty space | none (sheet hugs at 517) | 43 px blank between row 3 and the footer | fixed 600 template | LW (template) |
| **Status menu screen** — checkbox row | **one** label (No known problems) | two labels | "Only show active problems" present in the rebuild, absent in this source | **RA** |
| Status menu — rows | Low back pain (no code) / active **Hypertension** (one-line row, 64 tall) / resolved **Depression** (no code) | Main's rows: Low back pain M54.50 / Depression, unspecified F32.A / Generalized anxiety disorder F41.1 | the Open state reuses Main's content; the source's rows are a different sample (see step 3) | **FM** or decision: which content the Open state should carry |
| Status menu — menu | 344×132 at (20,217), 3 items **44** tall p12/16, label 16/20; r3; 3 shadows | Menu elevation=8 **344×144** at (16,154 in Body content = 227 in the sheet), 3 items **36** tall p6/16, label 16/24, plus a hidden 4th item; r4; 3 shadows | items 44 → 36 (LW, Menu/Item is 36 by design); menu box fixed at 144 with 108 of visible content → **36 px blank strip** under "Mark as Error" (visible in the render); x 20 → 16 (template); vertical position sits under the ACTIVE caret in both | items LW; **blank strip FM** (fix: hug or 108) |
| Status menu — cursor | hand-cursor image baked into the source | none | cleanup | not a divergence |

## Step 3 — Content check

| Item | Source | Rebuild | Verdict |
|---|---|---|---|
| Title | Problems | Problems | match |
| Toolbar button | Create New Problem | Create New Problem | match |
| Select text | Status | Status | match |
| Checkbox labels (Main) | No known problems · Only show active problems | same | match |
| Checkbox labels (Drop) | No known problems | No known problems · Only show active problems | **rebuild adds one** |
| Row 1 (Main) | active · Low back pain · M54.50 | ACTIVE · Low back pain · M54.50 | match (case: small caps vs capitals, step 2) |
| Row 2 (Main) | resolved · Depression, unspecified · F32.A | RESOLVED · Depression, unspecified · F32.A | match |
| Row 3 (Main) | marked as error · Generalized anxiety disorder · F41.1 | MARKED AS ERROR · Generalized anxiety disorder · F41.1 | match |
| Rows (Drop) | active · Low back pain / active · Hypertension / resolved · Depression (no codes) | Main's three rows with codes | **mismatch, all three rows** |
| Menu items | Active · Resolved · Mark as Error | Active · Resolved · Mark as Error | match |
| Footer | Add Active Problems to Note · Save (disabled) | Add Active Problems To Note · Save (disabled) | "to" → "To" by TITLE case (known DEFECT); disabled state matches (#FFE9E3 fill, #8CB2B6 label) |

## Step 4 — Change-log completeness

Both logs carry the same four visible rows (Shell, Controls, Rows, Density); the Status menu log adds a fifth. Eight further rows are placed hidden (picker rows carried in by the clone: Add button, Row background, Hidden layers, Body padding, Colours without a token, Star colour, a second Density, Tab underline) — they are invisible and not counted.

Rows that are right: **Shell** (header 64 → 56, footer 76 → 56, side padding 20 → 16, title colour, close button); **Controls** (rings → library buttons, marked); **Rows** (one-off rows → Problem summary row); **Status menu** (overlay → State=Open).

Rows that are wrong: **Density** — "Tighter legacy spacing → tokenized library spacing / Library. Rows, tabs and buttons are all taller". On these screens the legacy spacing is looser (row pitch 87 → 73), the toolbar button is shorter (42 → 38), the footer is shorter (76 → 56) and there are no tabs. The why-text was carried over from the picker log, where it was true.

Rows missing (library-wins divergences with no row): Create New Problem kit button → library Button (42 → 38, 14/18 → 16/24, stroke and glyph colour); Status select → library Text field (outline, caret, label type; width 107 → 154 pending a decision); footer button label case ("to" → "To"); status caret triangle → chevron (needs a GAP marker too); action glyph colour teal → grey; menu items 44 → 36 (Status menu log). Rows for the fidelity misses (checkbox construction, dimmed names, small caps, menu blank strip, Open-state content, extra top padding) should not be written until each is fixed or ruled.

## Step 5 — The footer

The source's 76 is 20 top padding + 36 button + 20 bottom padding, gap 12 between two buttons: an outlined default "Add Active Problems to Note" 243×36 and a disabled primary "Save" 66×36 (fill #FFE9E3, label #8CB2B6). No Cancel. The rebuilt footer holds exactly that set: Secondary action (Cancel) hidden, Tertiary = contained primary "Add Active Problems to Note" 249×38, Primary = contained secondary State=Disabled "Save" 70×38 with the same two colours bound (secondary/100, primary/200). Content, button set and disabled state match; the only label difference is the TITLE-case "To". Geometry is library-wins: 76 → 56 tall (template p8 g8 + 1 divider), buttons 36 → 38. The question the original plan left open is answered: nothing in the source's 76 is content the rebuild lacks.

## Step 6 — Comparisons

`step6-comparison-main-160-3169-1x.png` and `step6-comparison-status-menu-160-3680-1x.png` captured at 1x (1708×1290). Read back on the Reference rectangles: 160:1324 550×517 holds a 1100×1034 image (hash 00903244), 160:1326 550×510 holds 1100×1020 (08c01b8e) — both the 2x re-exports from repair 2. Captions read "Source: zVsuhYehoSLLq880qRBFkq 545:5239, exported 2026-09-04" and "… 4494:3240, exported 2026-09-04". Looked at: the reference, rebuild and change log columns render as described; the rebuild's menu shows the blank strip; the Status menu reference shows the hand cursor.

## Step 7 — Verdict (proposal)

Neither screen is fidelity-complete as repaired. Structure and honesty are settled; six fidelity items and one content decision remain.

**Problems list · Main (160:1327 / Problems list body State=Closed)**

1. Checkbox row: rebuild with two library Form control label instances (140:15) instead of Flush=Left Checkbox + loose text; restores glyph at x 9 and the 9 px gap. — fix in sub-component master (Problems list body, both variants)
2. Non-active problem names: bind Name fill to color/text/secondary on the Resolved and Marked-as-error rows (source #545454). Needs a Status-dependent override or a Status variant axis on Problem summary row (already flagged `npveRepair2_statusColourByOverride`). — fix in master or decision (variant axis)
3. Status word: source is lowercase with SMALL_CAPS_FORCED, rebuild is typed capitals. Either set textCase SMALL_CAPS_FORCED on the Status text and keep the property lowercase, or rule that capitals stay. — decision from Daniel, then fix in master
4. Body top padding: remove the 16 paddingTop on the Problems list body variants (the template already pads 16) so the toolbar sits 16 under the header rule as in the source. — fix in sub-component master
5. Status filter width 154 vs source 107: keep or match. — decision from Daniel
6. Action glyph colour: source pencil is #004852; Icon button color=primary gives that; note glyph #417E86 has no Icon button colour (primary is nearest). — decision, then fix in master
7. Status caret: library has no filled-triangle caret; keep the chevron and add a GAP marker, or add Icon/ArrowDropDown to the library. — decision (library) + marker
8. Change log: rewrite the Density row for these screens; add rows for the Create button, the Status select, the label case, the caret and the glyph colour. — change log rows

**Problems list · Status menu (160:1607 / State=Open)**

9. Menu box: 344×144 fixed with 108 of content leaves a 36 px blank strip under "Mark as Error"; set the Menu instance to hug (or 108) and drop the hidden fourth item. — fix in sub-component master
10. Open-state content: the source Drop screen shows one checkbox, three code-less rows (Low back pain / Hypertension one-line / Depression). The rebuild reuses Main's rows and both checkboxes. Decide whether the Open state must mirror its own source sample or is Main + menu. — decision from Daniel; if mirror, fix in master and the reference caption stays
11. Items 1, 2, 3, 4, 6, 7 apply here too through the shared masters; change-log row for menu items 44 → 36. — change log row

## Counts

- Markers: 2 GAP, 3 DEFECT, unchanged (no writes).
- Flags: 211 → 219; eight new (checkbox construction, dimmed names, small caps, top padding, status filter width, menu blank strip, Open-state content, caret glyph gap).
