# Label drift measurement and tab underline under the indicator — 2026-09-03

Batch `npveRebuild_labelDriftAndUnderline_2026-09-03`. Target `fdCQVFdvOByaOYIJYag0d6`: Problems picker body 26:221 › Tabs strip 51:307 › Tab underline 51:308 on Templates; change log rows 52:410 (in 27:222) and 52:416 (in 40:454) on Screens. Screens 27:6 and 40:252 read only. Library `YX2n4YLrEpBXNbcc73T6dw` read only: Text field 121:350 size=small masters on Inputs; Reference, Compositions and Layouts searched for instances. Record written by `apply-npve-label-drift-underline.js` after backup `design-system-schema.backup-2026-09-03-pre-label-drift-underline.json`. Flags now 187 (1 added, 1 resolved).

## Step 1. Text drift in the small text field

Reads with `skipInvisibleInstanceChildren = false`; box = absoluteBoundingBox, glyphs = absoluteRenderBounds.

| Read | Library master 130:140 (size=small, State=Default, Value=Empty) | Target 40:252 search field I40:252;6:80;26:222 |
|---|---|---|
| Input box | 130:141, y 32 to 72, 40 tall, centre 52 | I…;130:141, y 1133 to 1173, centre 1153 |
| Resting label frame | Label / resting, ABSOLUTE, y 16 in the input, 24 tall, rows 48 to 72 | same, y 16, rows 1149 to 1173 |
| Label text box | 130:155 "TextField Label" 16/24, y 48 to 72, centre 60 | I…;130:155 "Search for problem or ICD-10", y 1149 to 1173, centre 1161 |
| Label glyph bounds | y 54.4 to 66.2, centre 60.3 | y 1155.3 to 1170.5, centre 1162.9 |
| Offset of text box centre from input centre | **+8** | **+8** |
| Offset of glyph centre from input centre | **+8.3** | **+9.9** (descenders of p and the comma) |
| Typed Value text (Text frame at y 8) | centre offset 0 | centre offset 0 |
| Label slot (outline part) | 130:144, 95×56 in a 40 input | I…;130:144, 95×56 |

1x pixels. Library master `step1-library-textfield-small-empty-130-140.png`: outline rows 0 and 39, label glyph rows 22 to 33, so the glyphs sit 22 rows under the top edge and 6 above the bottom. Target `step4-screen-40-252.png`: outline rows 73 and 112 (screen-relative), glyph rows 95 to 106 with descenders to 109, again 22 rows below the top and 6 above the bottom. Crops `step1-library-textfield-small-empty-130-140-3x.png` and `step1-target-searchfield-40-252-crop-3x.png`, looked at: the text sits visibly in the lower half of the box in both.

**Library instance.** None exists: the Inputs page holds masters only, and Reference, Compositions and Layouts have no size=small Value=Empty instance. The one small instance in the library, 883:2105 on Compositions (Select + Menu, size=small Value=Filled), carries the same Label / resting frame at y 16, hidden by its Filled variant. The target instance stands in for instance-level evidence.

**Cause. The 56-tall Label slot is not it.** The resting label is 8px low because the Label / resting frame is absolutely positioned at y 16 inside the 40-tall small input. That is the inset that centres a 24-tall label in the 56-tall medium input, (56 − 24) / 2 = 16; small needs (40 − 24) / 2 = 8. The Label slot flagged in `npveProblemsBuild_textFieldSmallLabelSlotHeight` lives in the Outline part, holds only the 12/16 notch Gap sizer at its top, and does not position the resting label. Typed value text is centred correctly, so only the resting placeholder-like label drifts. The drift is in the library file itself and was not introduced by the rebuild.

**Flags (reported, not reconciled).** The prompt asked to upgrade the label-slot flag if the drift is plainly visible. It is plainly visible, but it is a different defect, so the label-slot flag keeps its severity with a cross-reference and the drift gets its own flag: `npveLabelDrift_smallRestingLabelInsetIsMedium` (DEFECT, medium), where 130:140 to 130:311, Input 130:141, Label 130:155, target I40:252;6:80;26:222;130:155. Nothing changed in the library or on the screens.

## Step 2. Briefing update

`figma-export/library-todos/LIBRARY-TODOS.md` item 1 gained a "Visible symptom" paragraph with the offset, both node ids and the cause, the fix line gained "set the small resting-label inset to 8 on all ten size=small variants", and the evidence list gained the new flag, the master ids and the crop paths. Item 3's geometry sentence now reads divider under the indicator, touching, decided 2026-09-03.

## Step 3. Tab underline under the indicator

Decision: match the product. MUI's indicator at `bottom: 0` sits above the border row, so the divider goes directly under the strip, touching.

**Mechanism.** Tab underline 51:308 returned to flow: `layoutPositioning = AUTO`, constraints MIN/MIN, appended as the last child of Tabs strip 51:307, `layoutSizingHorizontal = FILL`, height 1. Gap still bound to space/0. Structurally this is the cleanup layout; the difference is that it is now the recorded, deliberate geometry. Strip HUG 49 (tabs 48 + divider 1), body 518×385. Master reads: indicator abs y 1802 to 1804, divider 1804 to 1805, strip 1756 to 1805. Body 48 references and 4 definitions intact. Flag `npveTabUnderline_overlapIsDecisionNotCss` resolved: matched CSS rendering.

## Step 4. Render, diff, rules

| Node | 27:6 | 40:252 |
|---|---|---|
| Tabs strip | 189 to 238, 49 tall, divider at index 3 | 1189 to 1238, 49 tall |
| Indicator | 235 to 237, #004852 bound color/primary/main | 1235 to 1237 (102 wide) |
| Tab underline | **237 to 238**, AUTO, FILL, #D6D6D6 bound color/divider, opacity 1 | **1237 to 1238** |
| Body | 518×385 | 518×385 |

1x pixels, x 16 to 533. 27:6: rows 175 and 176 = 90 teal + 428 white; row 177 = 518 grey; row 178 = 518 white. 40:252: rows 175 and 176 = 102 teal + 416 white; row 177 = 518 grey. Teal on top, grey row directly beneath, continuous, no seam. Crops `step4-crop-strip-27-6.png`, `step4-crop-strip-27-6-3x.png`, `step4-crop-strip-40-252.png`, `step4-crop-strip-40-252-3x.png`; looked at the 3x crop.

- **Against tab-underline-fix step 4:** both screens bbox (16,176,534,440). Row 176 goes from grey/teal back to white/teal, row 177 from white to grey, rows 178 to 440 are the content moved down 1px (shift test residual: 1 anti-aliasing pixel at 203,202). The only change is the one-row shift.
- **Against cleanup step 5:** both screens pixel-identical (diff bbox None), as expected.

Rules: 1 PASS (divider and indicator paints read bound on both screen instances). 2: Templates 18 top-level, 457 nodes, 174 visible solid paints, 0 unbound, 1 image; Screens 6 top-level, 479 nodes, 226 visible solid paints, 0 unbound, 2 images; unchanged. 5 PASS (0 unbound below opacity 1). 8 PASS for this batch (divider 0,48 518×1; strip 518×49); pre-existing library-side Icon button glyph Group at 19.125 tall, 5 on Templates and 4 on Screens. 9 PASS (bound alpha only on the Text field outline parts at 0.23, 12 on Templates, 8 on Screens).

## Step 5. Change log rows

Rows 52:410 (Change log 27:222, 941 tall, row 77) and 52:416 (Change log 40:454, 1041 tall, row 77) set through the Row instance text properties after loading Akkurat LL Regular, read back from the properties and the text nodes:

Tab underline | Full-width line under the tabs → restored, sitting just under the teal | MUI draws this. Library tabs are missing it. Marked

Screenshots `step5-changelog-27-222.png`, `step5-changelog-40-454.png`, and the comparisons `step5-comparison-36-258.png` (1708×1033) and `step5-comparison-40-534.png` (1708×1133).

## Schema record summary

- `npveRebuild_labelDriftAndUnderline_2026_09_03` added: measurements, cause verdict, mechanism, render reads, diffs, rules, change log rows.
- Flag `npveLabelDrift_smallRestingLabelInsetIsMedium` added (DEFECT, medium).
- Flag `npveTabUnderline_overlapIsDecisionNotCss` resolved: matched CSS rendering.
- Flag `npveProblemsBuild_textFieldSmallLabelSlotHeight` detail extended: ruled out as the drift cause; severity unchanged.

## Files

- `C:\Code\design system\figma-export\npve-label-drift-underline-2026-09-03\` (14 PNGs, this report)
- `C:\Code\design system\figma-export\library-todos\LIBRARY-TODOS.md`
- `C:\Code\design system\apply-npve-label-drift-underline.js`
- `C:\Code\design system\design-system-schema.backup-2026-09-03-pre-label-drift-underline.json`
