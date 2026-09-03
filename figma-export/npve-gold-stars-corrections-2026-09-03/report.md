# Gold stars, colours marker correction, briefing item 10 — 2026-09-03

Batch `npveRebuild_goldStarsAndCorrections_2026-09-03`. Target `fdCQVFdvOByaOYIJYag0d6`, Screens 27:2 only: star glyph overrides on 40:252, marker 27:306 texts, change log rows 40:506, 27:268 and the new 70:483 in 40:454. Templates untouched. Library `YX2n4YLrEpBXNbcc73T6dw` read only (variable keys and values read; color/warning/dark imported by key inside the binding script). Record written by `apply-npve-gold-stars-corrections.js` after backup `design-system-schema.backup-2026-09-03-pre-gold-stars-corrections.json`. Flags 187 (0 added; two amended).

## Step 1. Gold stars on 40:252

Variable verified before binding: `color/warning/dark`, key c7b6e6f8…, value #F2BA2A alpha 1, scopes FRAME_FILL, SHAPE_FILL, STROKE_COLOR. The script throws if name or hex differ. Imported into the target as VariableID:c7b6e6f8…/74:91.

| Glyph (Vector 200:3 in Icon/FavoritesFilled) | Before | After |
|---|---|---|
| I40:252;6:80;26:261;26:209;170:6;200:3 | #545454 color/grey/600 | #F2BA2A color/warning/dark |
| I40:252;6:80;26:272;26:209;170:6;200:3 | #545454 color/grey/600 | #F2BA2A color/warning/dark |
| I40:252;6:80;26:282;26:209;170:6;200:3 | #545454 color/grey/600 | #F2BA2A color/warning/dark |
| I40:252;6:80;26:292;26:209;170:6;200:3 | #545454 color/grey/600 | #F2BA2A color/warning/dark |

Bound with `setBoundVariableForPaint`, fill arrays reassigned, each paint read back (opacity 1, visible). These are instance overrides on 40:252 only. Problem row master 26:208 and body master 26:221 untouched. 27:6 has outlined stars and no FavoritesFilled vector, so it is unchanged.

Rendered: `step4-screen-40-252.png` differs from the label-drift batch shot only in four 20×20 regions at rows 252 to 271, 308 to 327, 364 to 383, 420 to 439, x 42 to 61, with 708 exact #F2BA2A pixels. `step4-crop-stars-40-252-3x.png` looked at: four gold stars.

## Step 2. Marker 27:306

GAP chip kept. Fix line: "Fix lives in the library: no token for the selected-check green #1D6B45 or the icon-stroke grey #323232." Difference: "Two source colours have no token: selected check #1D6B45 → color/success/dark #2B865A (nearest); icon strokes #323232 → library component paints. Already tokened: star gold #F2BA2A = color/warning/dark, tab teal #417E86 = color/primary/light, light grey #9A9A9A = color/grey/500, red #B51A2C = color/error/dark. Marks the first Problem row trailing action."

Marker height 288 → 360 (Difference text 144 → 192). A first, longer wording reached 408 and would have overlapped the Add button marker 33:236 at y 628; the text was tightened so the marker bottom is 627. Paints untouched. Screenshot `step2-marker-colours-27-306.png`.

## Step 3. Change log rows

- 40:454 (Favorites): row 40:506 amended to "Colours without a token | Selected green and one icon grey → nearest library token, marked | Library. Only these two have no token". Row 70:483 appended: "Star colour | Grey → gold | The gold token existed all along. Grey was our error, corrected". Made by cloning row 52:422, appending to Rows 40:457 at FILL width and setting the three text properties; mainComponent 18:103 confirmed, so it is still a Change log/Row instance. 13 rows, log 1041 → 1138 tall.
- 27:222 (Recent): row 27:268 amended to the same colours wording. 12 rows, 941 tall. Row 33:253 "Star colour | Black → library grey | Library icon default" left as is: Recent's stars are outlined and the source draws them black.

Screenshot `step3-changelog-40-454.png`.

## Step 4. Render, diff, rules

`step4-screen-27-6.png`: pixel-identical to the label-drift batch shot (diff bbox None). `step4-screen-40-252.png`: diff bbox (42,252,62,440), 952 px, all inside the four star bands listed above. The only change anywhere is the four star glyphs on Favorites.

Comparisons re-shot with the updated logs: `step4-comparison-36-258.png` 1708×1033, `step4-comparison-40-534.png` 1708×1230 (grew from 1133 with the appended row; the comparison hugs the log).

Rules. 1 PASS (four glyphs read #F2BA2A bound color/warning/dark on the screen instances). 2: Templates 18 top-level, 457 nodes, 174 visible solid paints, 0 unbound, 1 image, unchanged; Screens 6 top-level, 485 nodes, 230 visible solid paints (226 plus 4 from the appended row), 0 unbound, 2 images. 5 PASS (0 unbound below opacity 1). 8 PASS for this batch (marker 400×360 at −450,267; row 448×97); pre-existing library-side Icon button glyph Group at 19.125, 5 on Templates and 4 on Screens. 9 PASS (bound alpha only on the Text field outline parts at 0.23, 12 on Templates, 8 on Screens). Property references after the edits: body 26:221 48 references / 4 definitions, Problem row 26:208 6 / 4, Sidesheet 6:65 18, all unchanged; 27:6 carries 66 references and 40:252 65 (first recorded).

## Step 5. Briefing

`LIBRARY-TODOS.md` item 10 rewritten: the library has no generic pick-from-a-list row (leading icon or control, primary text, inline secondary text, trailing action); the NPVE Problem row 26:208 is the working reference to generalise; problems, medications and allergies consume the same shape; Favorites 40:252 added as a second consumer beside Recent 27:6; existing evidence paths kept. Item 6 brought current: stars now bound color/warning/dark, marker corrected. Flag `npveProblemsRecent_listItemNoTrailingSlot` summary, detail and handling rewritten to the reframed request.

## Schema record summary

- `npveRebuild_goldStarsAndCorrections_2026_09_03` added.
- Flag `npveProblemsRecent_unresolvedColours` detail extended with the 2026-09-03 correction (two real gaps).
- Flag `npveProblemsRecent_listItemNoTrailingSlot` text reframed.

## Files

- `C:\Code\design system\figma-export\npve-gold-stars-corrections-2026-09-03\` (7 PNGs, this report)
- `C:\Code\design system\figma-export\library-todos\LIBRARY-TODOS.md`
- `C:\Code\design system\apply-npve-gold-stars-corrections.js`
- `C:\Code\design system\design-system-schema.backup-2026-09-03-pre-gold-stars-corrections.json`
