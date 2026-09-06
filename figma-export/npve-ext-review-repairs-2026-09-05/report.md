# NPVE external review repairs — 2026-09-05

Schema record: `npveRebuild_extReviewRepairs_2026-09-05`. Backup: `design-system-schema.backup-2026-09-05-pre-npve-ext-review-repairs.json` (taken before any write). Apply script: `apply-npve-ext-review-repairs.js`.
Target `fdCQVFdvOByaOYIJYag0d6` written; library and source not opened. Keys explicit on every call; `figma.skipInvisibleInstanceChildren = false` on every walk. Record gate: `npveRebuild_externalReview_2026-09-05` present — passed.

Stop condition: a standalone screen differing from its comparison twin beyond corner anti-aliasing, a Sidesheet variant losing reference entries, or a master edit changing a placed instance outside its region. None triggered.

## Decisions recorded (Daniel, 2026-09-05)

1. Ring override removed; the bare-glyph ruling stands everywhere.
2. Stand-ins kept and marked.
3. Scaled references re-clipped at 1:1.
4. Change logs unified and de-jargoned.
5. Typo fixes kept and logged.
6. Standalone screens archived.
7. Overclaiming records annotated.

## Step 1 — Family history ring

| Node | Before | After |
|---|---|---|
| 346:3083 Add condition to note (library Icon button instance in Family history condition row 346:3080) | strokes: 1 bound override (the ring) | strokes: none, same as the master |
| Placements I346:3099;346:3083, I346:3106;346:3083, I346:3123;…, I346:3149;6:80;… (6) | ring | plain glyph |
| DEFECT marker 189:615 Ringed icon buttons | marks Problems rows | also names the Family history condition rows and the 2026-09-05 removal |

Pixels: `step1-family-member-card-346-3089-after.png`, `after-comparison-family-history-346-5993.png`, `step1-defect-marker-ringed-189-615-after.png`.

## Step 2 — GAP markers

| Marker | Id | Placed | Covers |
|---|---|---|---|
| GAP marker — Dropdown chip | 404:7061 | section 356:6235 at (1868, 120); section widened 1868 → 2268 | Allergy severity selector 352:3206 |
| GAP marker — Chip with bold prefix | 404:7070 | section 339:6480 at (1868, 120); section widened 1868 → 2268 | Procedure history metadata 337:3881 |

Both are clones of GAP marker 394:5611 with the Fix and Difference texts replaced, so the convention treatment (grey/300 fill, grey/500 dashed border, GAP chip) is intact. The two stand-in masters carry a description note pointing at their marker. LIBRARY-TODOS.md gained items 16 and 17 with evidence paths (item 15, Text field end adornment, already existed from the external batches, so the new items took the next numbers).

Pixels: `step2-gap-marker-dropdown-chip-404-7061.png`, `step2-gap-marker-chip-bold-prefix-404-7070.png`.

## Step 3 — References at 1:1

| Helper | Rectangle | Before | After | Comparison instance |
|---|---|---|---|---|
| 346:3146 Reference/Family history | 346:3147 | 550×600, FIT of a 1100×1312 export (0.915) | 550×656, FILL (1:1) | 346:5993: Reference column clip off; name suffixed "(reference 656 tall at 1:1, Reference column clip off)" |
| 356:6190 Reference/Allergies list | 356:6191 | 550×600, FIT (0.915) | 550×656, FILL (1:1) | 356:6236: same |

Captions unchanged (the pattern has one line; the note went into the comparison name). The nested swap-slot instance keeps its 600 height, as it does for the Facility Stay rebuild; with the column unclipped the whole 656 reference shows.

Pixels: `after-comparison-family-history-346-5993.png`, `after-comparison-allergies-356-6236.png` — the source footer is now visible and the source title renders the same size as the rebuild's.

## Step 4 — Change logs

Helpers brought onto the Change log pattern (Content card: paper fill, divider stroke, padding 16 bound space/16, Title, Title divider, Rows 448 with Row instances at FILL):

| Helper | Content card | Rows moved | Title |
|---|---|---|---|
| 346:3365 Family history | 405:3878 | 7 | Changes: Family history |
| 356:6192 Allergies list | 405:3918 | 7 | Changes: Allergies list |
| 378:3403 Hospitalizations | 405:3958 | 6 | Changes: External Care History · Hospitalizations |
| 392:4093 Facility Stay | 405:3998 | 8 | Changes: External Care History · Facility Stay |
| 318:3928 Problems · Edit | 405:4038 | 7 | Changes: Problems edit |
| 339:6405 Procedures | (already on the pattern) | — | title prefixed: Changes: Procedures/Surgical History |

Method: the conforming Content card 254:1896 was cloned into each helper; the clone's placeholder rows (30 in total, created seconds earlier) were removed, the helper's own Row instances were moved into the clone's Rows frame and set to FILL, the helper's fill was cleared and its padding zeroed. No pre-existing node was deleted; every row keeps its identity.

### Rows rewritten (verbatim, What | From → to | Why)

Medication list (254:1895)
- Shell | Fixed 600 tall sheet → sheet as tall as its content | The footer sits right under the last row
- Header | 64 tall → 72 tall | 16 above and below the title, the shared header
- Body | Rows drawn one by one → one reusable row, used twice | Edit once and every row follows
- Surface | Grey rows → white rows | Reviewed on screen: the rows are white
- Footer | Footer pinned to the bottom → footer follows the last row | Shared footer, 16 above and below the button
- Spacing | 20 side inset → 16 | The shared sheet inset

Problems · Empty (309:5243)
- Shell | 64 header and 76 footer → 72 header and 71 footer | The shared sheet
- Empty state | A separate drawing → the same list body with nothing in it | One list, one more state
- No known problems | Drawn checkbox → library checkbox, checked | Keeps the checked look and the full tap target
- Hidden content | Second filter and problem rows → hidden | Matches the empty source
- Controls | Drawn button and dropdown → library button and dropdown | Same controls as every other sheet
- Body inset | 20 sides, 16 top and bottom → 16 all round | The shared sheet inset

Problems · Browse (309:5586)
- Source state | Faded to 40% → faded to 40% on this screen only | Keeps the source look without dimming the reusable parts
- Shell | 64 header and 60 footer → 72 header and 71 footer | The shared sheet
- Search field | Teal field with a magnifier → library text field | The library field has no leading icon yet; marked as a gap
- Filter tabs | 28 tall bold tabs → 48 tall library tabs | Shared tabs and tap targets
- Problem rows | Rows drawn one by one → the shared Problem row | Names, codes, stars and buttons stay consistent
- Add actions | Plus in a ring → plain library icon button | The library has no ringed button; marked as a defect
- Body spacing | 12 between blocks → 16 | Shared spacing
- Footer actions | Drawn buttons → library buttons | Shared button looks and capitalisation

Problems · Edit (318:3928)
- Sheet frame | 458 tall → 600 tall | Same height as the other Problems sheets
- Header | 64 → 72 | Shared header
- Body inset | 20 sides → 16 | Shared inset
- Form controls | Drawn fields → library text fields | Fields stay linked to the library
- Body spacing | 8 above the first field, 54 tall status row → 16 above, 64 tall row | 16 between major elements
- Date controls | Calendar inside the field → field with a calendar beside it | The library field has no icon slot yet; marked as a gap
- Footer | 76 tall, 20 inset → 71 tall, 16 inset | Shared footer and buttons
- Problem code | M540.50 → M54.50 | Source typo, corrected *(new, 405:4078)*

Procedures (339:6405)
- Sheet structure | Header 64, body 178, footer 60 → header 72, body 206, footer 71 | Shared header and footer; the body is as tall as its content
- Card padding | 12 → 16 | Shared spacing
- Metadata | Drawn 22 tall pills → reusable 24 tall badges | Keeps the bold prefix; the library chip cannot, marked as a gap
- Major body gap | 16 → 16 | Kept as the source
- Footer actions | 8 above and below, 21 between → 16 above and below, shared gaps | Shared footer and buttons
- Overall height | 302 → 350 | The footer follows the content inside the shared sheet

Family history (346:3365)
- Structure | Loose layers → one member card holding condition rows | Edit once and everything follows
- Card padding | 12 → 16 | Shared spacing
- Actions | Drawn icons → library edit and add-to-note buttons | Shared icons and 40 tap targets; the ring is a library gap, marked
- Footer position | Large empty area → footer follows the content | No dead space under the card
- Hidden overlap | A toggle hidden under the button → left out | Built from what the source shows
- Header | 65 → 72 | Shared header
- Create action | Drawn 230 by 42 button → library button, 262 by 38 | Shared button

Allergies (356:6192)
- Structure | Loose layers → severity pill, card and list | Edit once and everything follows
- Card padding | 12 → 16 | Shared spacing
- Metadata rhythm | 9 to 10 between detail rows → 8 | Related details sit closer together
- Header | 64 → 72 | Shared header
- Footer position | Large empty area → footer follows the content | No dead space under the card
- Create action | Drawn 175 by 42 button → library button | Shared button, same label and plus
- Hidden overlap | Edit and delete hidden under the card → left out | Built from what the source shows

Hospitalizations (378:3403)
- Shell height | 600 → 383 | The sheet closes around its content
- Body rhythm | 8 to 12 between blocks → 16 | Shared spacing
- Event card padding | 12 → 16 | Shared spacing
- Shell regions | Header 64, footer 60 → 72 and 71 | Shared header and footer with hairlines
- Controls | Drawn → library | Tabs, button, plus, chips, hairlines and footer buttons are shared parts
- Source capture | Live drawing → flat picture, taken 2026-09-05 | The left side is a snapshot and will not change with the source

Facility Stay (392:4093)
- Form visibility | Bottom of the form cut off by a fixed body → whole form shown | Shows Discharge to and Comments instead of copying the cut-off
- Form surface | Pale blue typed in by hand → a named local colour | One colour for every edit form here, kept out of the library
- Vertical rhythm | 12 to 16 → 16 between blocks, 8 within a group | Shared spacing
- Radio controls | Small drawn circles → library radios, 42 tall | Same choices, shared control and tap target
- Date controls | Calendar inside the field → field with a calendar beside it | The library field has no icon slot yet; marked as a gap
- Shell regions | Header 64, footer 60 → 72 and 71 | Shared header and footer with hairlines
- Controls | Drawn → library | Tabs, fields, radios, labels, icon button and footer buttons are shared parts
- Source capture | Live drawing → flat picture, taken 2026-09-05 | The left side is a snapshot and will not change with the source
- Discharge label | "Discahrge to" → "Discharge to" | Source typo, corrected *(new, 405:4084)*

61 rows rewritten, 2 added. Pixels: `after-comparison-*.png` (all nine).

## Step 5 — Typo flags

`npveSource_problemsEditIcdTypo` (source I4537:28000;3408:8553;289:80) and `npveSource_externalCareFacilityStayDischargeTypo` (source 648:1686), both DEFECT, low, handling "reported to the source owner".

## Step 6 — Standalone screens archived

Pixel diff first (PIL difference of the standalone 1x render against the (614, 60) crop of its comparison render, threshold 16):

| Pair | Standalone | Twin | Differing pixels | Location |
|---|---|---|---|---|
| Medication list | 250:3519 | 254:3707 | 40 of 210 100 | four corners only |
| Problems · Empty | 309:4531 | 309:5711 | 40 of 330 000 | corners |
| Problems · Browse | 309:4772 | 309:6116 | 48 of 330 000 | corners |
| Problems · Closed | 156:2428 | 160:3169 | 40 of 330 000 | corners |
| Problems · Open | 156:2707 | 160:3680 | 40 of 330 000 | corners |

Corner pixels differ because the standalone renders against the section colour and the twin against the grey backdrop. Identical otherwise; no stop.

Moved to a new Archive section 407:5492 "05 · Superseded standalone screens (moved from Screens 2026-09-05)" at (1240, 4513), 3200×900, each renamed "_Superseded — see comparison · <original name> (comparison <id>)". All five remain live instances of 6:65. The Archive README body 185:5 gained a paragraph. The emptied Screens sections were renamed to point at their comparisons: 156:2427 (markers 189:615 and 197:3416 stay), 250:3518 (empty), 309:4529 (empty).

Pixels: `step6-standalone-*.png`, `step6-comparison-*.png`, `step6-diff-*.png`, `step6-archive-section-407-5492.png`, `step6-archive-readme-185-3-after.png`.

## Step 7 — Selector geometry and record annotations

352:3206 Allergy severity selector: FIXED 70 → HUG 73 (padding 8/8 bound unchanged). Label x 6.5 → 8; DownCaret x 47.5 → 49; the same on 354:3209 and I355:5934;354:3209. Pixels: `step7-severity-selector-352-3206-after.png`, `step7-allergy-card-354-3206-after.png`.

Annotated: `npveRebuild_allergiesList_2026-09-05.reviewAnnotation_2026_09_05` (geometry and GAP claims), `npveRebuild_procedureHistory_2026-09-04.reviewAnnotation_2026_09_05` (GAP claim), `npveRebuild_familyHistory_2026-09-05.reviewAnnotation_2026_09_05` (ring removal). All cross-reference the review record.

## Step 8 — CLAUDE.md, as written

Inserted under Standing rules after rule 15, CRLF preserved:

> ### Sheet and comparison techniques
>
> Adopted 2026-09-05 from the external sidesheet batches (record npveRebuild_extReviewRepairs_2026-09-05).
>
> - **Sheets are as tall as their content.** The Sidesheet master stays 550 by 600. A placed sheet grows or shrinks to fit its body, and the footer sits right under the last row. Never pad a short sheet to 600 or pin its footer to the bottom.
> - **Helpers under a short sheet are transparent.** When a rebuilt sheet is shorter than the comparison slot, the Rebuild sub-component carries no fill, so only the sheet shows white. Nothing false extends below it.
> - **Tall content overflows the slot; the slot does not shrink it.** When a reference or a rebuilt sheet is taller than the 600 slot, keep it at 1:1 and switch clipping off on that column of the placed comparison instance. Never scale a reference to fit.
> - **New bodies join the shell through its Body content list.** Append the new body component to the Sidesheet's Body content preferred values and leave the default alone. Do not fork the shell.
> - **A new state is a new variant of the body it belongs to.** Add State=Empty to the existing body set rather than creating a second set or a loose frame.
> - **Values the library lacks may live in a local NPVE collection.** Name the collection NPVE/<kind>, record the operator's decision in the schema, claim no code syntax, and add the value to the library to-do list. Never write it into the library from a consuming file.

## Step 9 — Standing batch rules, all pages

| Rule | Result |
|---|---|
| 1 instancePaintVerification | PASS. No new paint authored; every edited master re-rendered through its placed instance on Screens and inspected. |
| 2 unboundPaintAudit | PASS with the known cover exception. Templates 5 567 nodes, 0 unbound; Screens 2 616, 0; Archive 1 528, 0; Cover 8, 1 (1:5, pre-existing flag npveProblemsBuild_coverPageUnboundFill). Section chrome excluded by recorded direction. |
| 3 referenceCounts | PASS. Sidesheet variants 58 nodes / 70 entries each; Problem summary row 6; Medication summary row 7; Change log/Row 3; Rebuild comparison 112. |
| 4 skipInvisibleFalse | PASS. |
| 5 opacityLast | PASS, untouched. |
| 6 enumerateDontRecall | PASS. Rows, placements, sections and instances enumerated before each edit. |
| 7 fileIdentityFirst | PASS. Cover 0:1 / Templates 3:2 / Screens 27:2 / Archive 126:2. |
| 8 roundWithRecord | PASS. 0 fractional authored geometry on Templates and Screens after the selector fix. |
| 9 boundPaintAlpha | PASS, untouched. |
| 10 cloneDropsPropertyRefs | PASS. Only a marker frame and a Content card frame were cloned (no property references); moved Row instances keep their three properties. |

Screens now holds 13 Sidesheet occurrences (18 − 5 archived) and 13 comparisons; no detached instance.

## Counts

GAP markers added 2, DEFECT markers added 0 (one extended). Flags added 2 (`npveSource_*`), review flags resolved 9. Rows rewritten 61, added 2. Screens archived 5.

## Screenshots (this folder)

after-comparison-allergies-356-6236.png, after-comparison-facility-stay-393-7689.png, after-comparison-family-history-346-5993.png, after-comparison-hospitalizations-378-5613.png, after-comparison-medication-list-254-3707.png, after-comparison-problems-browse-309-6116.png, after-comparison-problems-edit-318-6740.png, after-comparison-problems-empty-309-5711.png, after-comparison-procedures-339-6481.png, step1-defect-marker-ringed-189-615-after.png, step1-family-member-card-346-3089-after.png, step2-gap-marker-chip-bold-prefix-404-7070.png, step2-gap-marker-dropdown-chip-404-7061.png, step6-archive-readme-185-3-after.png, step6-archive-section-407-5492.png, step6-comparison-browse-309-6116.png, step6-comparison-closed-160-3169.png, step6-comparison-empty-309-5711.png, step6-comparison-medication-254-3707.png, step6-comparison-open-160-3680.png, step6-diff-browse.png, step6-diff-closed.png, step6-diff-empty.png, step6-diff-medication.png, step6-diff-open.png, step6-standalone-browse-309-4772.png, step6-standalone-closed-156-2428.png, step6-standalone-empty-309-4531.png, step6-standalone-medication-250-3519.png, step6-standalone-open-156-2707.png, step7-allergy-card-354-3206-after.png, step7-severity-selector-352-3206-after.png.
