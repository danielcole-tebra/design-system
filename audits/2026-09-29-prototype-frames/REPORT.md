# Encounter prototype frames, 2026-09-29

File `fdCQVFdvOByaOYIJYag0d6` (writes, additive). Library read only. New page **Encounter prototype** `1004:8207`. `figma.skipInvisibleInstanceChildren = false` on every script. Nothing deleted, nothing on Encounter shell changed (38 children before and after). No reactions added.

Read first: CLAUDE.md, PLUGIN-NOTES.md, `audits/2026-09-29-click-map/REPORT.md` (Part 3 and the frame tables).

## Row 1: the ten shell frames
Cloned from 943:14942 onto the new page in workflow order, one row at y 0, 80 gap (pitch 1509). Rebuilt frames only; the reference rectangles and labels were not copied. Same names as the originals.

| # | Frame | New node | From |
|---|---|---|---|
| 1 | Encounter · Ready | 1004:8208 | 978:4048 |
| 2 | Encounter · Ready · Add Problem | 1004:8210 | 943:14943 |
| 3 | Encounter · Started | 1004:8213 | 978:4565 |
| 4 | Encounter · Paused | 1004:8215 | 978:5177 |
| 5 | Encounter · Started · Problems open | 1004:8217 | 982:4584 |
| 6 | Encounter · Paused · Problems open | 1004:8219 | 982:5443 |
| 7 | Encounter · Processing | 1004:8221 | 978:5787 |
| 8 | Encounter · Ready · AI Note Results | 1004:8223 | 943:15819 |
| 9 | Encounter · Replace section | 1004:8226 | 978:6363 |
| 10 | Encounter · Closed | 1004:8231 | 978:7020 |

## Row 2: the ten new frames (y 1145)
Each is a 1429 x 985 frame holding a Page/Encounter 974:16938 instance, Layout = Note and Problems, toolbar Ready, as F02. Frames i and j are clones of the row 1 Add Problem frame.

| Frame | Node | Sheet used | How placed | Slot height | Selected chip |
|---|---|---|---|---|---|
| Encounter · Ready · Problems open | 1004:35117 | Problems list 155:1559 (the slot default) | slot as is | 600 (fixed) | Note, Problems |
| Encounter · Ready · Problems status menu | 1004:35634 | 160:1608 (body 156:1294 State=Open) | slot swap (properties) | 600 (fixed, matches the sheet) | Note, Problems |
| Encounter · Ready · Allergies | 1004:36294 | 356:3249 (body 355:3217) | slot swap (properties) | 447 (hug) | Note, Allergies |
| Encounter · Ready · Allergies edit | 1004:36888 | 634:11956 (body 634:6809) | slot swap (properties) | 644 (hug) | Note, Allergies |
| Encounter · Ready · Vitals | 1004:37585 | 851:13663 (body 846:13017) | slot swap (properties) | 528 (hug) | Note, Vitals |
| Encounter · Ready · Family History | 1004:38284 | 346:3149 (body 346:3113) | slot swap (properties) | 414 (hug) | Note only (see finding 1) |
| Encounter · Ready · Family History edit | 1004:38862 | 638:539 (body 638:2) | slot swap (properties) | 644 (hug) | Note only (see finding 1) |
| Encounter · Ready · Problem edit | 1004:39570 | 318:3655 (body 316:3412, Links = no) | slot swap (properties) | 600 (fixed, matches the sheet) | Note, Problems |
| Encounter · Ready · Add Problem Recent | 1004:40247 | picker body 26:221 in the docked sheet 1004:40249 | body swap on the docked sheet | left slot 600 (Problems); docked sheet 920 | Note, Problems |
| Encounter · Ready · Add Problem Favorites | 1004:41040 | picker body 94:652 in the docked sheet 1004:41042 | body swap on the docked sheet | left slot 600 (Problems); docked sheet 920 | Note, Problems |

Screenshots (1x, in this folder): `r2-a` to `r2-j`, and `page-encounter-prototype-1004-8207.png` (whole page, 4000 px wide, so downscaled to 27 percent; the per-frame shots are the evidence).

### How "slot swap" was done
The sheets to show are instances of Sidesheet 6:65, not components, so the Left slot's INSTANCE_SWAP (default 6:65) cannot point at them. The slot's own Sidesheet was reconfigured instead: every component property of the source sheet (Title, Body content, Show back, Show footer, the three action swaps and their Show flags) was copied onto the slot's Sidesheet, Placement left at Floating. The slot stays a Sidesheet, 550 wide, 8px corners, never detached. No SCAFFOLDING overlay was needed and no frame was skipped.

The footer buttons keep the source sheet's label as a text override that the property copy does not carry (the slot showed "Button"). Six labels were set back to the source text: Add Active Problems to Note (b), Add Section to Note (c), Cancel and Save & Add to Note (d), Add All As New Section (f), Cancel (g). After that a text diff of every visible string, source sheet against slot, reads identical for frames b to h.

### Slot height
Nested instances ignore `resize()` (trap 18, and it did here: 600 stayed 600). Setting the slot and its `Body` child to layout-sizing HUG on the nested instance works: heights read back 447, 644, 528, 414 and 644, each equal to the source sheet's own height. b and h keep the slot's 600, which equals their source sheets (160:1608 and 318:3655 are 600 tall), so they were left fixed. All heights are at or under 748.

### Chips
The open module's chip is set `selected = yes` with its ✕ shown; Problems is set `selected = no` with its ✕ hidden on the Allergies and Vitals frames. Setting the variant drops the chip's text overrides (trap 34), so Label and Icon were re-applied and read back (Allergies, Vitals, Problems). The Note chip stays selected on every frame.

## What renders wrong or differently, in plain words
1. **There is no Family History chip.** The Module strip has eight chips (Note, Problems, AI Summary, Vitals, Care Team, Labs/Studies, Allergies, Timeline). For the two Family History frames I turned Problems off and left only Note selected, so nothing looks selected for Family History. I did not invent a chip: a chip cannot be added inside a Page/Encounter instance and the label is not mine to relabel. Needs a ruling (FLAGS DECISION).
2. **Slots taller than their sheet leave empty space under them.** With the slot hugging, the Allergies, Vitals and Family History sheets end well above the Note card's bottom edge (447, 528, 414 against a 748 column). That is the layout, not a fault.
3. **Frame b's status menu covers the first row's title,** as it does in Problems list State=Open; that is the open DEFECT npveCleanupBatch_statusMenuAnchorDrift (offset 20, ruled to stay).
4. **Frames i and j:** the docked picker sits over the note exactly as in F02; the Recent and Favorites bodies render with their own section headings (Recent Problems, Favorites) and filled stars on Favorites. Correct.
5. Everything else I looked at, all ten new frames at 1x, matches F02's structure: nav, header, strip, toolbar (Ready, Start Transcribing, mic, no Print), editor, footer. No clipped text, no overlaps except item 3.
