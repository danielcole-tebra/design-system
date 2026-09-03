# Problems picker — corrections, 2026-09-02

Batch `npveRebuild_problemsRecent_corrections_2026-09-02` (name chosen here; the prompt was cut before naming it). Target `fdCQVFdvOByaOYIJYag0d6`, writes on Screens `27:2` only. Library read only, imports by key in-script. Source not opened. Record written by `apply-npve-problems-recent-corrections.js` after backup `design-system-schema.backup-2026-09-02-pre-npve-problems-recent-corrections.json`. Flags now 176 (1 added, 1 updated).

**Step 4 not built.** The prompt ended at "Build a local component Rebuild comparison on Templates. Horizontal, gap 32, padding 32, hug both axes, fill bound to". The fill token and the contents were never received.

## Step 1. Gate: masters versus screen

Screenshots `step1-body-master-26-221.png` (518×392) and `step1-problem-row-master-26-208.png` (518×56), looked at: on both masters the code sits immediately after the name with the trailing glyph at the right edge, the same as on screen 27:6.

| Row | Master / body master / screen | Name x | Code x | Trailing x |
|---|---|---|---|---|
| Diabetes Mellitus | all three identical | 72 | 219 | 462 |
| Asthma | body master = screen | 72 | 146 | 462 |
| Chronic Obstructive Pulmonary Disease | body master = screen | 72 | 383 | 462 |
| Osteoarthritis | body master = screen | 72 | 193 | 462 |

Name HUG, gap to Code 16, Text frame 374 FILL, height 56 everywhere. No difference; proceeded.

## Step 2. DEFECT marker

`33:236` "DEFECT marker — Add button ring" on Screens at (-450, 540), under the two GAP markers, 400×288. Convention followed: VERTICAL g12 p16 r4, 1px dashed [6,4], fill color/grey/300, stroke color/grey/500; chip color/grey/400 with "DEFECT" in color/grey/900 Bold 12/16 letter spacing 0.5 (caption tokens); fix line color/grey/600, difference line color/text/primary, both body1 tokens. Example first: Icon button 170:5 with Icon/PlusOutlined, glyph #545454 bound color/grey/600, identical to the screen rows' trailing action. Fix line: "Fix lives in the library: Icon button 170:77 has no outlined or ringed variant." Difference line names the source ring (24px, white fill, 1px #D6D6D6, radius 16) and says it marks the trailing action of the three unselected rows. Screenshot `step2-defect-marker-add-button-33-236.png`, looked at. Chip letter spacing stays unbound (no variable).

## Step 3. Change log 27:222

Row 27:244 rewritten from "Star and plus" to **Star icon | Bare glyph → icon button | Library. Glyph gains a tap target**. New row 33:247 inserted after it: **Add button | Plus in a grey ring → plain plus glyph | Library has no ringed icon button. Marked**. New row 33:253 appended: **Star colour | Black → library grey | Library icon default**. Ten rows now, 480×747. Screenshot `step3-changelog-27-222.png`, looked at: wraps at word boundaries, no clipping.

## Rules

Screens after the writes: 108 visible solid paints, 0 unbound, 0 unbound below opacity 1, 0 fractional geometry on non-vector nodes; bound alpha only on the Text field outline (0.23, untouched). Rule 1: marker example glyph reads #545454 color/grey/600, equal to the screen's Asthma trailing glyph. Rule 3: the new rows render their property text. Rules 4, 6, 7 observed; rule 10 not applicable.

## Flags

Added `npveProblemsCorrections_iconButtonNoRingedVariant` DEFECT (medium). Updated `npveProblemsRecent_bareIconControls` handling.

## Files

- `C:\Code\design system\figma-export\npve-problems-recent-corrections-2026-09-02\` (4 PNGs, this report)
- `C:\Code\design system\apply-npve-problems-recent-corrections.js`
- `C:\Code\design system\design-system-schema.backup-2026-09-02-pre-npve-problems-recent-corrections.json`
