# Lean pilot, runs 2 and 3 — report

Record `leanPilot_run2-3_2026-09-08` (backup `design-system-schema.backup-2026-09-08-pre-lean-pilot-run2-3.json`).

Status: DONE for both items. Item 1, `pilot2-hospitalizations-edit` (medium, approved by Daniel: "I approve pilot2-hospitalizations-edit as medium, go ahead"), closed in record `leanPilot_run2-3_2026-09-08` and commit 900385c. Item 2, `pilot2-procedures-edit` (medium, approved: "I approve pilot2-procedures-edit as medium, go ahead"), was re-pointed at its own record `leanPilot_run3_2026-09-08` (backup `design-system-schema.backup-2026-09-08-pre-lean-pilot-run3.json`, opened by `apply-lean-pilot-run3.js`) because item 1's finish gate had closed the shared record; it is built and closed below. Both comparisons await operator review.

## Gates

- Contract freshness: `validate-workflow` PASS before reading; rules.json, CLAUDE.md, AGENTS.md, OPERATORS.md digests match.
- Record gate: `workflowRefactor_tierApproval_2026-09-08` DONE.
- Risk: tier medium locked with the operator's quote; `start-batch` at 2026-09-09T00:43:52Z; `check-batch` PASS before the first mutation and again before finalize.
- Stop condition: not triggered. File identity matched; every control had a published mapping or a recorded GAP pattern; no shared default or geometry changed; no new design decision was needed (the Status pill colour #D4E0DD is the library's `color/core/light`).

## Step 0 (2026-09-08, read-only survey, unchanged)

Source `Sidesheetv3` 129:6647 holds 55 variants. Thirteen source sheets already have rebuild records. Of the visible, unbuilt, 550-wide sheets:

| Candidate | Source | Shape | Verdict |
|---|---|---|---|
| Hospitalizations edit | 129:8401, 550×606 | Edit Event form: tabs, Facility Name, Admission/Discharge dates, Related to problem, Procedure Code, Status chip, Comments | Item 1, built in this batch |
| Procedures edit | 129:8651, 550×498 | Edit Event form: Procedure Code, Status chip, Related to problem, Facility Name, Comments | Item 2, awaiting approval |
| Allergies edit | 129:7826, 550×673 | Allergen autocomplete, Severity selector, Status radios, Reaction chips + Add, Comments | Next in queue |
| Family History edit | 129:12486, 550×685 | Relationship autocomplete, Status radios, Age, Conditions chips + Add, Comments | Next in queue |
| Flowsheets | 939:9228 | Table with measure/latest/updated/actions columns | Rejected: table shape |
| Psychotherapy Note | 129:7614 | Rich-text toolbar | Rejected: no library toolbar pattern |
| Vitals family | six variants, 441 wide | Charts, hand-drawn shapes | Rejected: different width and shape |

## Item 1 — External Care History · Hospitalizations edit

### Source facts (129:8401, read only)

| Region | Source | Notes |
|---|---|---|
| Sheet | 550×606 | header 64, footer 60, fixed height |
| Tabs | y 72, 28px pills | Hospitalizations selected (#004852), Facility Stay (#9A9A9A) |
| Form card | 518×414 at y 124 | #EEF7F9, 1px #D6D6D6, radius 8, 16px padding and rhythm |
| Edit Event row | 486×24 | Bold 16 + trash glyph |
| Facility Name | 486×40 | text field |
| Dates | 239×40 + 239×40, 8 apart | calendar glyph inside each field |
| Related to problem | 486×40 | caret (select) |
| Procedure Code + Status | 385×40 + 85×32, 16 apart | Status pill #D4E0DD, Bold 14, caret |
| Comments | 486×110 | focused state, floating label, placeholder "Comments go here" |
| Footer | Cancel / Save & Add to Note / Save | text / outlined / primary |

`#D4E0DD` is `core.light` in `paletteValues.ts` ("core 3"); the library publishes it as `color/core/light`.

### System mapping

| Source control | Library part | Node |
|---|---|---|
| Tabs | Tabs/Tab selected=yes 77:642, selected=no 77:640, Divider | 580:10622 (clone of the Facility Stay strip 391:3568) |
| Edit Event header | text + Icon button 77:1109 with Icon/TrashOutlined 389:3433 | 580:6018 (clone of 389:3470) |
| Facility Name, Related to problem (select), Procedure Code | Text field 77:708 small | 580:6021, 580:6043, 580:6060 |
| Admission / Discharge dates | Text field 77:708 + Icon/Calendar 316:3409 in the recorded GAP wrapper | 580:6036 (clone of 389:3543) |
| Status pill | Hospitalization status selector 580:6013, local, clone of the Allergy severity selector 352:3206; fill bound `color/core/light`; GAP stand-in | 580:6081 |
| Comments | Text field 77:698 medium, multiline | 580:6085 (clone of 389:3707) |
| Form card surface | NPVE/Color Form surface #EEF7F9, `color/divider` stroke, `radius/md` | 580:6017 |
| Shell | Sidesheet 6:65 Floating, Body content = 580:10621 | 581:6217 |

### Geometry

| Node | Size | Composition |
|---|---|---|
| Status selector 580:6013 | 90×32 | hug; label Regular 16 + DownCaret 16 |
| Form 580:6017 | 518×410 | 16 padding; 34 + 40 + 40 + 40 + 40 + 104 with five 16px gaps |
| Procedure row 580:6059 | 486×40 | field 380 (fill) + 16 + selector 90, centred |
| Body 580:10621 | 518×475 | tab strip 49 + 16 + form 410 |
| Sheet 581:6217 | 550×651 | header 72 + divider 1 + body region 507 (16 + 475 + 16) + footer 71 |
| Reference 581:6630 | 550×606 | 2x export 1100×1212 at 1:1, FIT |
| Change log 581:10997 | 480×1024 | eleven rows |
| Comparison 581:11117 | 1708×1116 | Reference and Rebuild columns clip off |

### Change log rows (581:10997)

| What | From → to | Why |
|---|---|---|
| Source capture | Live drawing → flat picture, taken 2026-09-08 at 2x | The left side is a snapshot and will not change with the source |
| Shell regions | Header 64, footer 60 → 72 and 71 | Shared header and footer with hairlines |
| Sheet height | Fixed at 606 → grows with the form, 651 | Sheets are as tall as their content |
| Tabs | Small pills, 28 tall → library tabs, 48 tall with a hairline | Shared control, same as the Hospitalizations list |
| Tabs to form | 20 → 16 | Shared spacing |
| Form surface | Pale blue typed in by hand → the named local colour | One colour for every edit form here, kept out of the library |
| Date controls | Calendar inside the field → field with a calendar beside it | The library field has no icon slot yet; marked as a gap |
| Status chip | Bold 14 pill, 85 wide → regular 16 pill, 90 wide, in the library's core colour | The library chip has no caret; same stand-in as the allergy severity, marked as a gap |
| Comments field | Focused in the mockup, 110 tall → resting, 104 tall | We build default states; the library's medium multiline field is 104 |
| Footer labels | Save & Add to Note → Save & Add To Note | Code capitalises button labels |
| Controls | Drawn → library | Tabs, fields, icon button and footer buttons are shared parts |

### Figma mutations

Templates section 20 (580:6012, at 0/39960, 1842×2400): status selector 580:6013; form 580:6017; body 580:10621; Rebuild helper 581:6216 (sheet 581:6217); Reference helper 581:6630 (image 581:6631, hash eb453180…); Change log helper 581:10997. Sidesheet 279:2446 Body content preferred values 13 → 14. Rebuild comparison 35:332 slot preferred values 16 → 17 each.

Screens section 20 (581:11116, at 0/35292, 2268×1536): sole comparison 581:11117; GAP markers 581:11754 (Text field end adornment, reused) and 581:11761 (Dropdown chip, reused, Difference text rewritten for this screen).

No node outside the batch was moved, renamed, resized, deleted or restyled. No proofs were created, so nothing was archived. Source and library were read only.

### Corrections during the build

1. The status selector hugs to 90px where the source pill is 85, so the fixed Procedure row overran by 5px; Procedure Code now fills the row (380).
2. The cloned Facility Stay sheet kept a fixed 853px height after the body swap; a hug attempt did not take because the shell's Body region fills the sheet, so the sheet was sized explicitly to 651, as the PMHx sheet was.
3. The cloned change-log Content frame was fixed at 1198px; set to hug (1024 for eleven rows).

### Verification

| Check | Result |
|---|---|
| File identity | PASS — 0:1 Cover, 3:2 Templates, 27:2 Screens, 126:2 Archive |
| Page walk (skipInvisibleInstanceChildren=false) | PASS — Cover 8, Templates 9115, Screens 4341, Archive 1782 nodes |
| Unbound solid paints | PASS — Cover 1, Templates 39, Screens 40, Archive 12; only the two organizer sections are new |
| Fractional authored geometry | PASS — 0 on every page |
| Shared API | PASS — Sidesheet default 26:221, 13 properties, three 550×600 variants unchanged; preferred values 14; comparison slots 17 |
| Master vs instance paints | PASS — selector 3, form 58, body 62 paints; 0 mismatches |
| Component identity | PASS — see system mapping; Archive holds no id ≥ 580 |
| Property references | PASS — tab, field, selector, footer and change-log text rendered as stored |
| Reference | PASS — 1100×1212 upload, top rows free of the set outline; reference column vs 1x source: 0 thresholded pixels |
| Comparison | PASS — inspected at 1x; rebuild column vs standalone sheet: 76 anti-aliasing pixels |
| Single placement | PASS — each helper, body, form and selector placed once, inside 581:11117 |
| Ten standing batch rules | PASS — see the schema record |

### Visual observations (executor)

- Reference and rebuild carry the same content in the same order, from the header to the three-button footer.
- The rebuild is 45px taller than the source (651 vs 606) from the 72/71 shell, 48px tabs and the 16px tab-to-form gap; nothing is clipped.
- The Status pill matches the source colour through `color/core/light` and uses the precedent's Regular 16 label at 90 wide.
- Dates use the recorded GAP wrapper with the calendar beside the field.
- Comments renders resting (grey outline, in-field label) where the source is focused (teal outline, floating label, placeholder).
- Footer renders "Save & Add To Note" from the stored sentence-case label.

## Item 2 — Procedures/Surgical History · Edit Event

Record `leanPilot_run3_2026-09-08`. Batch guard started on schema digest f1d5b2a7e7ff; `check-batch` PASS before mutation. Stop condition not triggered: identity matched, every control had a mapping from item 1, no shared default or geometry changed, no new decision.

### Source facts (129:8651, read only)

| Region | Source | Notes |
|---|---|---|
| Sheet | 550×498 | header 64, footer 60, fixed height, no tab strip |
| Form card | 518×358 at y 72 | 8px below the header; #EEF7F9, 1px #D6D6D6, radius 8, 16px rhythm |
| Edit Event row | 486×24 | Bold 16 + trash glyph |
| Procedure Code + Status | 385×40 + 85×32, 16 apart | Status pill #D4E0DD, Bold 14, caret |
| Related to problem | 486×40 | caret (select) |
| Facility Name | 486×40 | text field |
| Comments | 486×110 | focused state, floating label, placeholder "Comments go here" |
| Footer | Cancel / Save & Add to Note / Save | text / outlined / primary |

### System mapping

| Source control | Library part | Node |
|---|---|---|
| Edit Event header | text + Icon button 77:1109 with Icon/TrashOutlined | 586:6415 (clone of 580:6018) |
| Procedure Code + Status | Text field 77:708 at fill width + Hospitalization status selector 580:6013 | 586:6418 (clone of 580:6059), selector instance 586:6420 |
| Related to problem (select), Facility Name | Text field 77:708 | 586:6421, 586:6437 |
| Comments | Text field 77:698 medium, multiline | 586:6452 |
| Form card surface | NPVE/Color Form surface, `color/divider` stroke, `radius/md` | 586:6414 |
| Shell | Sidesheet 6:65 Floating, Body content = 586:6467, Title Procedures/Surgical History | 586:6560 |

### Geometry

| Node | Size | Composition |
|---|---|---|
| Form 586:6414 | 518×354 | 16 padding; 34 + 40 + 40 + 40 + 104 with four 16px gaps |
| Body 586:6467 | 518×354 | one form instance, no fill |
| Sheet 586:6560 | 550×530 | header 72 + divider 1 + body region 386 (16 + 354 + 16) + footer 71 |
| Reference 586:6984 | 550×498 | 2x export 1100×996 at 1:1, FIT |
| Change log 586:11705 | 480×870 | nine rows |
| Comparison 586:11765 | 1708×962 | both contents shorter than the slot; clipping on; Rebuild helper transparent |

### Change log rows (586:11705)

| What | From → to | Why |
|---|---|---|
| Source capture | Live drawing → flat picture, taken 2026-09-08 at 2x | The left side is a snapshot and will not change with the source |
| Shell regions | Header 64, footer 60 → 72 and 71 | Shared header and footer with hairlines |
| Sheet height | Fixed at 498 → grows with the form, 530 | Sheets are as tall as their content |
| Body inset | 8 above the form → 16 | Shared body padding on every side |
| Form surface | Pale blue typed in by hand → the named local colour | One colour for every edit form here, kept out of the library |
| Status chip | Bold 14 pill, 85 wide → regular 16 pill, 90 wide, in the library's core colour | The library chip has no caret; same stand-in as the allergy severity, marked as a gap |
| Comments field | Focused in the mockup, 110 tall → resting, 104 tall | We build default states; the library's medium multiline field is 104 |
| Footer labels | Save & Add to Note → Save & Add To Note | Code capitalises button labels |
| Controls | Drawn → library | Fields, icon button and footer buttons are shared parts |

### Figma mutations

Templates section 21 (586:6413, at 0/42560, 1842×2400): form 586:6414; body 586:6467; Rebuild helper 586:6559 (sheet 586:6560); Reference helper 586:6984 (image 586:6985, hash bb92db28…); Change log helper 586:11705 (clone of the nine-row Facility Stay log). Sidesheet Body content preferred values 14 → 15. Comparison slot preferred values 17 → 18 each.

Screens section 21 (586:11764, at 0/37028, 2268×1536): sole comparison 586:11765; GAP marker 586:12264 (Dropdown chip, reused, Difference text rewritten).

No node outside the batch was touched. No proofs were created. Source and library read only. Zero corrections during the build.

### Verification

| Check | Result |
|---|---|
| File identity | PASS — four pages as expected |
| Page walk (skipInvisibleInstanceChildren=false) | PASS — Cover 8, Templates 9504, Screens 4558, Archive 1782 nodes |
| Unbound solid paints | PASS — Cover 1, Templates 41, Screens 42, Archive 12; only the two organizer sections are new |
| Fractional authored geometry | PASS — 0 on every page |
| Shared API | PASS — Sidesheet default, properties and variants unchanged; preferred values 15; comparison slots 18 |
| Master vs instance paints | PASS — form 40, body 40, selector 3 paints; 0 mismatches |
| Component identity | PASS — see mapping; Archive holds no id ≥ 586 |
| Property references | PASS — field, selector, footer and change-log text rendered as stored |
| Reference | PASS — 1100×996 upload, top rows clean; reference column vs 1x source: 0 thresholded pixels |
| Comparison | PASS — inspected at 1x; rebuild column vs standalone sheet: 78 anti-aliasing pixels; backdrop visible below both contents |
| Single placement | PASS — each helper, body and form placed once, inside 586:11765 |
| Ten standing batch rules | PASS — see the schema record |

### Visual observations (executor)

- Same content in the same order in both columns, from the header to the three-button footer; neither has a tab strip.
- The rebuild is 32px taller than the source (530 vs 498) from the 72/71 shell and the 16px body inset; nothing is clipped and nothing false shows below either content.
- The Status pill and Comments field read as in item 1; both differences are logged.
- Footer renders "Save & Add To Note" from the stored sentence-case label.

## Evidence

Item 2:

- `source-procedures-edit-129-8651.png` — 1x source capture, 550×498.
- `source-procedures-edit-129-8651-2x.png` — 2x export placed as the frozen reference, 1100×996.
- `body-procedures-586-6467.png` — body master, 518×354.
- `rebuild-sidesheet-procedures-586-6559.png` — placed sheet, 550×530.
- `changelog-procedures-586-11705.png` — change log, 480×870.
- `comparison-procedures-edit.png` — comparison 586:11765 at 1x, 1708×962.
- `crop-reference-column-procedures.png`, `crop-rebuild-column-procedures.png` — PIL crops used for the diffs.
- `audit-procedures-edit.json` — deterministic evidence for `validate-evidence`.

Item 1:

- `source-hospitalizations-edit-129-8401.png` — 1x source capture, 550×606.
- `source-hospitalizations-edit-129-8401-2x.png` — 2x export placed as the frozen reference, 1100×1212.
- `form-580-6017.png` — form master, 518×410.
- `body-580-10621.png` — body master, 518×475.
- `rebuild-sidesheet-581-6216.png` — placed sheet, 550×651.
- `changelog-581-10997.png` — change log, 480×1024.
- `comparison-hospitalizations-edit.png` — comparison 581:11117 at 1x, 1708×1116.
- `crop-reference-column.png`, `crop-rebuild-column.png` — PIL crops used for the diffs.
- `audit-hospitalizations-edit.json` — deterministic evidence for `validate-evidence`.

## Findings

Item 1: GAP 2 (both existing patterns reused: `npveProblemEdit_textFieldNoEndAdornment`, `npveExtReview_allergySeveritySelectorUnmarked`). Item 2: GAP 1 (the dropdown-chip pattern reused). DEFECT 0. DECISION 0. No new flag in either item.

## Measurement

Pilot runs 2 and 3 are written to `workflow/metrics.json` against the Facility Stay baseline. Run 2: context loaded 71,944 bytes versus 1,032,558; 22 Figma calls versus 35; 6 screenshots versus 7; 63 tool calls versus 92; 3 recorded correction cycles versus 6; 0 design decisions stopped for versus 1. Run 3: 13 Figma calls, 5 screenshots, 35 tool calls, 0 corrections, 0 decisions, with the run 2 pattern and status selector reused directly.

## What happens next

Operator reviews `comparison-hospitalizations-edit.png` (581:11117) and `comparison-procedures-edit.png` (586:11765) on Screens. Next in the queue after both are accepted: Allergies edit (129:7826) and Family History edit (129:12486), which add autocomplete, radios and chip lists to the same form pattern.
