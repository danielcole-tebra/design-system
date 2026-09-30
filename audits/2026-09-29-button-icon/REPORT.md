# Glyph picks and Button-icon, 2026-09-29

File `fdCQVFdvOByaOYIJYag0d6` (writes, additive only); library `YX2n4YLrEpBXNbcc73T6dw` and source `zVsuhYehoSLLq880qRBFkq` read only. `figma.skipInvisibleInstanceChildren = false` on every script. Nothing deleted, and Button-icon is placed nowhere but its own proof frame. Parts 0 to 3 done; one small tie in the Rounded radius is noted in Part 3, not a blocker.

Rulings recorded in FLAGS.md as DECISION lines: Undo/Redo/FormatItalic stand (closes npveEncounterShell_undoRedoItalicShapeDiffers); the six glyph picks (closes npveEncounterShell_glyphsNoClearMuiMatch); Button-icon as a local library-candidate component. The MUI icons GAP line lists the six new glyphs.

## 0. Glyph picks
Six icons built in `32 · Local icons` `938:25769` by the icon recipe, paths unedited from `@mui/icons-material` 5.15.12: `Icon/MUI/PersonOutline` 951:14940, `LockOutlined` 951:14943, `OpenInFull` 951:14946, `MonitorHeartOutlined` 951:14949 (two vectors), `ScienceOutlined` 951:14953, `HealthAndSafetyOutlined` 951:14956.
Swapped in (Button and Icon button recolour them; ink read back):
- Assigned To pill start icon `I468:5595;78:15` in Note toolbar 468:5582: Icon/UserOutlined to PersonOutline.
- Note card 424:4362: badge `I424:4364;170:30` Icon/Lock to LockOutlined; expand `I424:4379;170:6` Icon/DownCaret to OpenInFull.
- Module strip 426:4214 hidden chip glyphs (checked by label): Vitals `I465:5473;426:4207` to MonitorHeartOutlined, Labs/Studies `I465:5492;426:4207` to ScienceOutlined, Allergies `I465:5505;426:4207` to HealthAndSafetyOutlined. They stay hidden.
Screenshots: `after-part0-note-card-424-4362.png` (header now shows the outlined lock and the OpenInFull arrows; toolbar shows the person glyph), `after-part0-note-toolbar-468-5582.png`, `after-part0-section-32-local-icons-938-25769.png`, `after-part0-module-strip-426-4214.png`. The hidden chip glyphs cannot be seen in a render.

## 1. Reference: the library outlined Button (read-only)
Outlined Button is `Button variant=contained, color=primary` (set 79:2; TEBRA-DESIGN-SYSTEM.md 3.1 traps). Read on the nine size and state variants (78:14 and eight siblings):
| | Default | Hover | Disabled |
|---|---|---|---|
| Fill | `color/common/white` | `color/action/hover` | `color/common/white` |
| Border | 1px INSIDE, `color/core/main` | same | `color/primary/100` |
| Label | `color/core/contrastText` | same | `color/primary/200` |
- Border width is a literal 1 on every variant, not bound to `border/hairline` (which exists). Radius binds `radius/pill` (24), which clamps to a pill.
- Heights: small 30, medium 38, large 42 (padding `space/5|7|9` over a 20 / 24 / 24 line; label 14 / 16 / 15). Widths 68, 86, 95.
- Hover changes the fill only; ring and label do not change. Disabled changes ring and label, fill stays white. There is no Focus visible variant (the set is Default, Hover, Disabled); the 3px global focus ring is not modelled.
- Radius tokens in the library (Tebra/Dimension): `radius/sm` 4, `radius/chipSmall` 12, `radius/chip` 16, `radius/pill` 24.
- Also read on Icon button: medium 40 with a 24 glyph, small 34 with an 18 glyph, padding 8, no ring, no large size.
Screenshots: instances of the library Button at each size and state are in `after-part3-proof-button-icon-vs-library-952-23894.png` (left three of each row).

## 2. Source inventory (read-only)
Three distinct ringed icon-only appearances, all in the source. Crops at 4x in `compare-button-icon-vs-library-vs-source-4x.png`.
| # | Appearance | Where (nodes) | Glyph | Outer size | Ring and shape |
|---|---|---|---|---|---|
| A | Add control | Problems picker Recent 4618:4930 (`4618:5049`, `4618:5070`, `4618:5091`); docked picker in Rec_Ready 4841:18039 (`4841:21615`, `21643`, `21671`) | plus, 8 x 8 drawn vector | 24 | circle r16, 1px INSIDE `#D6D6D6`, fill `#FFFFFF` |
| B | Row actions | Problems list rows in 4841:18039, three rows (`I4841:18062;545:5778`, `;4539:28204`, `;4539:28215` edit; `;4536:27582`, `;4539:28206`, `;4539:28217` add to note) | Edit_light pencil (24), Add Note clipboard with plus (24) | 40 | circle r32, 1px INSIDE `#8CA7A2`, no fill |
| C | Vitals add note | 3551:14940, `3551:14952`, `14956`, `14960`, `14964`; alert variant 3569:22412 and four more | Add Note clipboard (24) | 32 | circle r32, 1px INSIDE `#8CA7A2`, no fill |
Every one is a circle. Rings A and B/C differ in colour and fill.
**The green filled check occupies the same slot as the ringed plus.** In the picker's first row the plus ring `4841:21559` is hidden and the visible `check_circle` `4841:21587` (24 x 24, vector `#1D6B45`, no ring) sits at the same position (1372, 281) as the ringed plus in the rows below at (1372, 337). Not built.
The Problems row's status dropdown, star and close controls carry no ring.

## 3. Build
Section `33 · Button-icon` `952:14934` (Templates, y 80400) holds the set `Button-icon` `952:14989` (key b8c8f942…, description says LOCAL, LIBRARY CANDIDATE) and the PROOF frame `952:23894`.
- **Properties:** `variant` = outlined (only value), `size` = medium | small | large, `State` = Default | Hover | Disabled (the library's own names), `Shape` = Rounded | Circle, `Icon` instance swap, default `Icon/MUI/Add`, with all 22 Icon/MUI components as preferred values. 18 variants; the top-left variant is medium, Default, Rounded, so that is the default.
- **Sizes:** square at 30 / 38 / 42, from padding `space/6|7|9` around the glyph, with the border outside the layout box (`strokesIncludedInLayout` off), which is how the Button gets its 30 / 38 / 42. Glyph 24 (bound `size/icon/medium`) at medium and large, 18 at small as the Icon button sizes it.
- **Tokens, read back on the variants:** fill `color/common/white` (Hover `color/action/hover`); ring `color/core/main` (Disabled `color/primary/100`), weight bound to `border/hairline`, INSIDE; glyph ink `color/core/contrastText` (Disabled `color/primary/200`); Rounded radius `radius/sm`; Circle radius `radius/pill`. Padding bound to `space/6`, `space/7`, `space/9`.
- **Rounded radius: `radius/sm` (4).** "Closest to a softly rounded square": 4 and `radius/chipSmall` (12) are equally near 8. I took `radius/sm`, the corner the system uses for its soft rectangles (Menu, Alert, Dialog, Paper). Switching to 12 is one binding if wanted.
- **GAPs (flagged, nothing invented):** the 18 small glyph has no size token (size/icon/small is 20), so it is a literal; the library Icon button has no large size, so large reuses 24; the outlined Button does not bind the hairline token (Button-icon does); no Focus visible state exists to copy. One line in FLAGS.md.
- **Icon swap:** setting the Icon property on an instance swaps the glyph and keeps the token ink (checked with ListAlt, then back to Add).
- **Proof:** every variant instantiated in `PROOF · Button-icon beside library outlined Button 2026-09-29`, on paper, one row per size, library Default / Hover / Disabled then Rounded ×3 then Circle ×3. Screenshots: `after-part3-proof-button-icon-vs-library-952-23894.png`, `after-part3-button-icon-set-952-14989.png` (the masters). Same-scale composite against the library Button and the source crops: `compare-button-icon-vs-library-vs-source-4x.png`.
- Reading the comparison: the Button-icon ring is the library's `core/main` grey-green, a little lighter than the source's `#8CA7A2` ring, and its plus is the library ink `#004852` where the source's picker plus is black and the row glyphs are teal `#417E86`. Those follow from the ruling that the appearance comes from the library Button.

## NPVE sites Button-icon should replace (for the swap batch)
| Site | Node | Source ring |
|---|---|---|
| Problem summary row › Edit problem | `190:12` (row 153:1186) | B, 40 |
| Problem summary row › Add to note | `190:18` | B, 40 |
| Medication summary row › Add to note | `223:1725` (row 219:2068) | B, 40 |
| Family history condition row › Add condition to note | `346:3083` (row 346:3080) | not verified |
| Family history member card › Edit family member | `346:3094` (card 346:3089) | not verified |
| Problem row set 107:485 › Trailing action, Action=Add | `107:419` (Favorite=Off), `107:453` (Favorite=On) | A, 24 (target is 40) |
| Problem row › Trailing action, Action=Selected | `107:430`, `107:465` | not ringed: the green check, leave |
| Flowsheets Measure row set 686:8437 › Action area note / chart / edit / add | `684:8274`, `684:8280`, `684:8285`, `684:8291`; `685:8309`, `685:8315`, `685:8320`, `685:8326` | not verified |
| Vitals/Row 829:12510 › Action slot (empty, stands in for Add note) | `829:12509`; GAP card `825:12492` | C, 32 |
Comparison instances inherit from these masters. Sizes to settle in the swap batch: the target's Icon buttons are 40, so B maps to medium (38) or a resize; A is 24 in the source; C is 32.
Not replacement sites: the edit-form Delete / Remove buttons (34, no ring in the source), Close, Note card badge / expand / more, Comment, Rating and Dismiss buttons.
