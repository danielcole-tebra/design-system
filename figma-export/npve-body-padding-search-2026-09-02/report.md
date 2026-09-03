# Body padding and search field — 2026-09-03

Batch `npveRebuild_bodyPaddingAndSearch_2026-09-02` (keyed as the prompt named it; run on 2026-09-03). Target `fdCQVFdvOByaOYIJYag0d6`: writes on Templates `3:2` (Sidesheet 6:65 Body, two Part A check instances) and Screens `27:2` (marker 27:295, two change log rows). Library and repo read only. Record written by `apply-npve-body-padding-search.js` after backup `design-system-schema.backup-2026-09-03-pre-npve-body-padding-search.json`. Flags now 184 (3 added, 1 amended).

## Part A

### 1. Text field 121:350 with an empty Label

Two size=small instances placed off-canvas on Templates (kept): 45:255 Value=Empty at (-800, 700) and 45:277 Value=Filled with Value text "Diabetes" at (-800, 800), both Label "" and Show helper off.

| Instance | Instance size | Input | Label slot | Outline parts | Closes cleanly |
|---|---|---|---|---|---|
| 45:255 Empty | 300×40 | 40 (p8/14/8/14) | hidden | Cap left 0–9, Body right from x 9 (291 wide), top stroke 1 on both | **Yes**: continuous top edge, no notch, no gap |
| 45:277 Filled | 300×48 (floating frame still adds 8 above) | 40 | visible, 10×40, bottom stroke only | Cap left 0–9, Body right from x 19 | **No**: 10px break in the top edge at x 9–19 |

The Empty variant's resting label is the field's only placeholder-like text, so an empty Label renders a blank box. Screenshots `partA-textfield-small-empty-nolabel-45-255.png` (closed grey rounded box, no text) and `partA-textfield-small-filled-nolabel-45-277.png` ("Diabetes" with a short gap near the top-left corner), looked at.

### 2. Library padding evidence

Library node 186:2 is a RECTANGLE named "Elevation / 24", not the Dialog. The Dialog set is 747:185; its content region is Content 186:7 on the sm variant. Read on masters (padding is structural); Dialog has 14 on-canvas instances, Drawer, Card and Paper have none and were not instantiated.

| Component | Region | Padding | Bound |
|---|---|---|---|
| Dialog 747:185 (all 12 variants) | Title | 16/24/16/24 | top and bottom space/16; sides unbound |
| | Content | 20/24/20/24, gap 8 | all unbound |
| | Actions | 8 all sides, gap 8 | space/8; gap unbound |
| Drawer 749:239 (all 4 variants) | root | 0 | unbound |
| | Header | 8/8/8/16 | space/8, space/16 |
| | List/Item ×4 | 8/16/8/16 | bound |
| | body | none exists | |
| Card 176:59 | Content | 16/16/24/16, gap 8 | space/16 and space/24; gap unbound |
| | Header (hidden) | 16 all, gap 16 | space/16 |
| Paper 171:27 | root | 0 | unbound; no padding region |

### 3. Code

- `overrides/DialogOverrides.ts`: only `maxWidth: "sm"`. `overrides/CardOverrides.ts`: defaultProps only. No DrawerOverrides or PaperOverrides file exists.
- MUI 5.14.11 defaults (from `.yarn/cache`): DialogContent `padding: '20px 24px'` (`16px 24px` with dividers); DialogTitle `16px 24px`; DialogActions 8; CardContent 16 with paddingBottom 24; Drawer and Paper set no padding.
- No shared drawer or sidesheet body wrapper exists. Per screen: the design-system Drawer story `Drawer.example.tsx` uses `Box padding={2}` (16px, width 288); CalendarEventDrawer `Box p:3` (24px) and `px:2`; AppointmentDrawerForm header `p:2`, body `px:2 pt:2`; ModuleEditDrawer `PaperProps.sx.p: 3` (24px); VisitReasonEditDrawer and MessageRoutingPage drawers `p: 0`; OutboundFaxDrawer uses DialogContent (20/24).

### 4. space/* variables

space/0 = 0, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19, 23, 24, 40. Twenty values, FLOAT, scopes WIDTH_HEIGHT and GAP. No 1, 10, 15, 20 or 32.

### 5. Verdict

**Absent from both.** Code has no drawer or sidesheet body padding rule and product bodies vary between 0, 16 and 24 per screen; the library Drawer has no body region. The nearest evidence is 16 (Drawer story, Card content, Dialog title vertical). Step 6 therefore used the prompt's default, 16 bound space/16, as a recorded decision.

## Part B

### 6. Template padding

Sidesheet 6:65 › Body 6:79: paddingTop/Right/Bottom/Left 16, each bound space/16 (was 8/16/8/16). Gap 16 space/16 unchanged. All six instances read 16/16/16/16 bound. Body stays 488 tall; picker content 384 + 32 = 416, no overflow.

### 7. Search fields: left as built

Not applied on either screen. On 27:6 (Value=Filled, "Diabetes") an empty Label leaves the 10px outline break. On 40:252 (Value=Empty) an empty Label renders cleanly but deletes the resting label, the only placeholder text the library field has, leaving a blank box instead of "Search for problem or ICD-10". Neither produces a placeholder-style field without a notch. Findings `npveSearch_emptyLabelBreaksFilledOutline` (DEFECT) and `npveSearch_noPlaceholderInTextField` (GAP).

### 8. Marker 27:295

Fix line: "Fix lives in the library: Text field 121:350 needs a search input pattern, not just a start adornment slot — no floating label, placeholder text, leading magnifier, 40 tall — matching ProblemSearchField.tsx and DataGridColumnFilter.tsx." Difference line keeps "Source 4618:4971 …" and adds the no-placeholder and empty-label findings. Marker now 400×432. Screenshot `step8-gap-marker-27-295.png`, looked at.

### 9. Change log rows

Body padding row amended verbatim on 27:222 (row 27:262) and 40:454 (row 40:500): "Body padding | 16 all round, gap 12 → 16 all round, gap 16 | Template sets it. Source and template now agree".

### 10. Re-screenshots, distances, rules

Screenshots `step10-screen-27-6.png`, `step10-screen-40-252.png`, `step10-comparison-36-258.png` (1708×956), `step10-comparison-40-534.png` (1708×959), looked at: both search fields now sit clear of the header rule; the comparisons re-flowed to the taller change logs; nothing clips.

| Screen | Divider bottom → search box | → outline top | → notch label top |
|---|---|---|---|
| 27:6 | 16 (was 8) | 16 | 8 (was 0) |
| 40:252 | 16 | 16 | no floating label |

The search field no longer touches the divider. On 27:6 the nearest ink is the notch label at 8px; the outline is at 16.

Rules 1 to 10: Body padding 16/16/16/16 bound on all six instances; master vs Defaults paints identical. Templates 173 visible solid paints, 0 unbound, 1 image; Screens 202, 0 unbound, 2 images. Sidesheet 18 references / 9 definitions, Problem row 6 / 4, body 48 / 4; 27:6 renders title, search value and section title from properties. 0 unbound paints below opacity 1; 0 fractional geometry; bound alpha only on the Text field outline (0.23), untouched. Rule 10 not applicable.

## Flags

Added `npveSearch_emptyLabelBreaksFilledOutline` DEFECT (low), `npveSearch_noPlaceholderInTextField` GAP (medium), `npveBody_paddingNotAuthoritative` DECISION (low). Amended `npveProblemsRecent_bodyPaddingConflict`.

## Files

- `C:\Code\design system\figma-export\npve-body-padding-search-2026-09-02\` (7 PNGs, this report)
- `C:\Code\design system\apply-npve-body-padding-search.js`
- `C:\Code\design system\design-system-schema.backup-2026-09-03-pre-npve-body-padding-search.json`
