# Tab underline fix — correction to the cleanup batch — 2026-09-03

Batch `npveRebuild_tabUnderlineFix_2026-09-03`. Target `fdCQVFdvOByaOYIJYag0d6`, writes only there: Problems picker body 26:221 › Tabs strip 51:307 › Tab underline 51:308 on Templates. Screens 27:6 and 40:252 read only; they update through the body instance. Library read only (variable collections enumerated for the briefing). Record written by `apply-npve-tab-underline-fix.js` after backup `design-system-schema.backup-2026-09-03-pre-tab-underline-fix.json`. Flags now 186 (1 added). The cleanup record `npveRebuild_cleanup_2026_09_03` is amended with `_correction_2026_09_03`.

Trigger: Daniel's screenshot of the file shows the divider roughly 2px below the indicator. The cleanup report claimed the indicator and the divider shared a pixel row.

## Step 1. Measurements before any edit

Absolute bounding boxes, `skipInvisibleInstanceChildren = false`.

| Node | 27:6 | 40:252 |
|---|---|---|
| Tabs instance (visible) | Filter tabs, 630,189 282×48, bottom **237** | Filter tabs — Favorites active, 630,1189 282×48, bottom **1237** |
| Indicator (90×2 / 102×2, #004852 bound color/primary/main) | top **235**, bottom **237** | top **1235**, bottom **1237** |
| Tab underline (518×1, #D6D6D6 bound color/divider) | top **237**, bottom **238** | top **1237**, bottom **1238** |
| Tabs strip | 189 to 238, **49** tall | 1189 to 1238, 49 tall |
| Body | 518×385 | 518×385 |

1x pixels, `step1-before-screen-27-6.png`, column through the active tab: rows 175 and 176 teal (0,72,82), row 177 grey (214,214,214) across the full width, row 178 white. Same on 40:252. Both shots are pixel-identical to the cleanup step 5 shots.

**Verdict.** The cleanup claim was wrong as worded. The indicator's bottom edge and the divider's top edge shared a *coordinate* (237), which is stacking: the divider had its own row directly below the two teal rows. It was not inside the indicator. At 1x there is no white seam between teal and grey, so the 2px gap in Daniel's screenshot was not reproduced here; the zoom of that screenshot is unknown and the screenshot tool does not render at non-integer zoom.

## Step 2. Target geometry

MUI `@mui/material` 5.14.11 Tabs: root minHeight 48, indicator height 2, `position: absolute; bottom: 0`. Target set by the prompt: the divider's 1px row falls inside the indicator's 2px rows so the teal covers it where active.

**Finding, reported not reconciled (rule 11).** In CSS an absolutely positioned child with `bottom: 0` sits at the bottom of the padding box, above a `border-bottom`. So MUI's own render with `borderBottom` on Tabs (MessageRoutingLayout.tsx:58-63, SubscriptionManagementPage.tsx:143-152) or on a wrapping Box (MonographTabs.tsx:45-46) is *touching*: teal rows, then a grey row below. The overlap built here is a design decision from the prompt. Visible difference: under the active tab the product shows a grey row beneath the teal; the rebuild shows none. Recorded as flag `npveTabUnderline_overlapIsDecisionNotCss` (DECISION, low).

## Step 3. Fix in body master 26:221

**Mechanism: absolute positioning.** Tab underline 51:308 inside Tabs strip 51:307: `layoutSizingHorizontal = FIXED`, `layoutPositioning = ABSOLUTE`, constraints horizontal STRETCH / vertical MAX, resized 518×1, x 0, **y 47**, moved to child index 0 so the three Tabs instances draw over it. The strip keeps its gap bound to space/0; a negative gap would have needed an unbound literal, and the API has no negative space token. No fractional positions.

Geometry after: strip HUG **48** (was 49), tabs rows 0 to 48, indicator rows 46 to 48, divider row 47 to 48. Body 518×**384** (was 385); Section title and Rows move up 1px, back to their pre-underline positions. Master reads: indicator abs y 1802 to 1804, divider 1803 to 1804, strip 1756 to 1804. Divider fill #D6D6D6 bound color/divider, opacity 1. Body still 48 property references and 4 definitions; the three Tabs visibility references (Active All/Recent/Favorites) intact; Tab underline carries none.

## Step 4. Render

| Node | 27:6 | 40:252 |
|---|---|---|
| Tabs strip | 189 to 237, 48 tall, divider at child index 0 | 1189 to 1237, 48 tall |
| Indicator | 235 to 237 | 1235 to 1237 |
| Tab underline | **236 to 237**, ABSOLUTE, STRETCH/MAX | **1236 to 1237** |
| Body | 630,133 518×384 | 518×384 |

1x pixels, `step4-screen-27-6.png`, x 16 to 533: row 175 = 90 teal + 428 white; row 176 = 90 teal + 428 grey, 0 other; row 177 = 518 white. On 40:252 row 176 = 102 teal + 416 grey. So the grey line is continuous across the strip, the teal sits in the same row, and there is no light seam. Crops: `step4-crop-strip-27-6.png`, `step4-crop-strip-27-6-3x.png`, `step4-crop-strip-40-252.png`, `step4-crop-strip-40-252-3x.png`. Looked at both 3x crops.

## Step 5. Diff and rules

- **Against cleanup step 5** (27:6): bbox (16,176,534,440). Row 176 goes from white/teal to grey/teal. Rows 177 to 439 are the content below the strip shifted up 1px; comparing cleanup rows 178 to 440 with new rows 177 to 439 leaves one anti-aliasing pixel at (203,202). 40:252 the same pattern, 100 differing rows.
- **Against cleanup step 3** (the pre-underline state): 27:6 bbox (16,176,534,177), 428 px, which is exactly the grey row outside the 90px indicator. 40:252: 416 px, the grey row outside the 102px indicator. Nothing else on either screen differs. The only change is the underline row.
- Comparisons `step5-comparison-36-258.png` (1708×1033) and `step5-comparison-40-534.png` (1708×1133) re-shot at 1x. The cleanup step 6 shots were 1024 wide, so no pixel diff was run on them.

Rules run: 1 PASS (divider color/divider, indicator color/primary/main read on both screen instances). 2: Templates 18 top-level, 457 nodes, 174 visible solid paints, 0 unbound, 1 image; Screens 6 top-level, 479 nodes, 226 visible solid paints, 0 unbound, 2 images; unchanged from cleanup. 5 PASS (0 unbound paints below opacity 1). 8 PASS for this batch's nodes (divider 0,47 518×1; strip 518×48); pre-existing and library-side: the Icon button glyph Group 573:3583 measures 19.125 tall inside every Problem row (5 on Templates, 4 on Screens), untouched. 9 PASS (bound alpha only on the Text field outline parts at 0.23, 12 on Templates, 8 on Screens).

## Step 6. Library briefing

Written to `figma-export/library-todos/LIBRARY-TODOS.md`. It lists every open NPVE library item with the wrong, the fix, and evidence paths, and records two source-vs-token findings surfaced by enumerating the library's variable collections (the star gold already has a token; three of the six "unresolved" colours already have tokens).

## Schema record summary

- `npveRebuild_tabUnderlineFix_2026_09_03` added: measurements, target, mechanism, render reads, diffs, rules.
- `npveRebuild_cleanup_2026_09_03` amended: `_correction_2026_09_03`, plus `correction` notes on step4_tabUnderline and step5_render. Nothing removed.
- Flag `npveCleanup_tabsNoBottomRule` detail extended with the overlap geometry the pattern needs.
- Flag `npveTabUnderline_overlapIsDecisionNotCss` added (DECISION, low).

## Files

- `C:\Code\design system\figma-export\npve-tab-underline-fix-2026-09-03\` (10 PNGs, this report)
- `C:\Code\design system\figma-export\library-todos\LIBRARY-TODOS.md`
- `C:\Code\design system\apply-npve-tab-underline-fix.js`
- `C:\Code\design system\design-system-schema.backup-2026-09-03-pre-tab-underline-fix.json`
