# NPVE cleanup batch, 2026-09-29

File `fdCQVFdvOByaOYIJYag0d6` (writes, additive only). Library not touched. `figma.skipInvisibleInstanceChildren = false` on every script. All four items done; nothing deleted. Pre-state is in `before.json` (restore recipes included); before and after screenshots and side-by-side composites are in this folder.

Read first: CLAUDE.md, PLUGIN-NOTES.md (icon recipe, traps 1, 2, 12), `audits/2026-09-29-file-cleanup/REPORT.md` Part 3, and the 2026-09-14 Vitals re-grid entries.

**Mapping used for item 3** (from the Vitals horizontal-gap entry): peers and default separation snap to 16 (12 → 16, 19 → 16); identity and tight pairs snap to 8 (4 → 8, 3 → 8); 10 → 8. Every changed value binds `space/8` or `space/16`.

## 1. Edit forms to white paper: done
Root fill bound to `color/background/paper` (resolved #FFFFFF written first, then bound) on `634:6808`, `636:3`, `586:6414`, `580:6017`, `389:3469`. Stroke (1) and radius (8) unchanged. `642:7557` (MODEL TEST) untouched. A scan of Templates for any paint still bound to Form surface finds only `642:7557`.
- Before/after: `before-form-*.png` and `after-form-*.png`, composites `compare-forms-1.png`, `compare-forms-2.png`.
- Instances read after the change (the five sheets that host them, so the paper reaches the sheet): `after-instance-sheet-*.png` (`634:11956`, `638:539`, `586:6560`, `581:6217`, `392:3673`), and the body `580:10621`. All 550 wide and unchanged in size.
- The fields were already bound to paper, so field and card are both white; the field edge now reads only from its outline.
- Docs: the Card line in `APPEARANCE-NPVE-EDIT-FORMS.md` now states the paper ruling with date. GAP npveAllergiesAudit_formSurfaceNoLibraryToken struck as superseded. My own DECISION npveCleanupAudit_editFormsOnFormSurface struck as ruled.

## 2. Selector carets: done, with one question (below)
Built `Icon/ArrowDropDown (MUI)` `938:25770` by the icon recipe: 24x24 component, vector from MUI path `M7 10l5 5 5-5z`, read back at (7, 10) 10x5, constraints SCALE/SCALE, fill bound `color/text/primary`, described as local. It sits in a new section `32 · Local icons` `938:25769` (Templates, y 80000) with a 24 and a 16 proof instance; `after-section-32-local-icons-938-25769.png`. Local to this file, never for the library.
Swapped with `swapComponent` (size, position and ink overrides survived; ink read back):
| Node | Unit | Slot | Ink |
|---|---|---|---|
| `190:23` | Problem summary row › Status control | 12 | color/success/main |
| `222:1995` | Medication summary row › Status control | 12 | color/success/main |
| `352:3208` | Allergy severity selector | 16 | color/text/primary |
| `580:6015` | Hospitalization status selector | 16 | color/text/primary |
`816:12440`, `816:12446`, `685:8303` untouched.
- Instances read: the Problems list body `156:2426` (all variants), Medication list body `236:1758`, Allergies list body `355:3217`, Hospitalizations edit body `580:10621`, and the two selector masters. `compare-selectors.png` (6x), `compare-rows.png`.
- **Design question, not resolved.** The two status carets sit in a 12 slot, so the triangle inks 5 x 2.5 (a half-pixel height). It reads as a small dot next to the status label (visible in `after-page-encounter-429-4161.png`). The selectors at 16 ink 6.67 x 3.33, the same as the accepted mobile precedent. I kept the existing slot sizes. Whether the status carets should go to a 16 slot (6.67 wide, closer to the source's roughly 8) is Daniel's call.
- Two layers are still named `DownCaret` (`352:3208`, `580:6015`) though they now hold ArrowDropDown. Not renamed.

## 3. Re-grid to the 8 scale: done, with consequences
| Node | Unit | Change | Size effect |
|---|---|---|---|
| `153:1186` | Problem summary row | pt/pb 19 → 16 | 88 → 82 tall |
| `170:1590` | Status control (Problem) | gap 3 → 8 | 60 → 65 wide |
| `219:2068` | Medication summary row | pt/pb 12 → 16 | 76 → 84 tall |
| `219:2070` | Status control (Medication) | gap 4 → 8 | 61 → 65 wide |
| `426:4165` | Patient header | pt/pb 10 → 8 | 72 → 68 tall |
| `426:4180` | DOB group | gap 4 → 8 | 125 → 129 |
| `426:4188` | Allergy row | gap 12 → 16 | 325 → 333 |
| `426:4191` | Severe group | gap 4 → 8 | 200 → 204 |
| `426:4196` | Balance row | gap 4 → 8 | 95 → 99 |
| `426:4199`, `426:4206` | Module chip variants | pl/pr 12 → 16 | 120 → 128, 56 → 64 wide |
| `426:4214` | Module strip | gap 12 → 16 | (strip stays 1397 x 40) |
- **Header no longer needs a 10**, so GAP npveEncounter_patientHeaderPadding10NoToken is closed. The Safety column grew 325 → 337 and the master still sums to 900 (16 + 40 + 16 + 459 + 16 + 337 + 16), no overflow. Line 2 was already clipped in the 900 master (632 of content in 459) and is clipped 4 further; in the 1397 page instance it fits.
- Heights follow the padding, as row heights did not in Vitals (which changed gaps only): the two rows, the header and the page moved. `Page/Encounter` 989 → 985; the header instance reads 1397 x 68, the Module strip and MainWrap sit 4 higher (y 100, 156). `after-page-encounter-429-4161.png` beside `before-page-encounter-429-4161.png`.
- Chips read wider and the strip still fits all nine modules in the page (`after-module-strip-426-4214.png`).
- **Two things to know, neither fixed.** (a) The absolute `Problem status menu` `156:1321` in Problems list `State=Open` did not move: it sat 17 below the first row's status label and now sits 20 below (still opens over the name, as before). (b) The header is now 68 where COMPOSITIONS.md names the Proposals "Patient header band 31:336" 900x72; this file's local header is no longer that size. Both are recorded as new findings.
- Skipped as instructed: Change log/Row and the marker card recipe.
- Docs: GAP npveEncounter_patientHeaderPadding10NoToken, DECISIONs npveSidesheet_problemSummaryRowNonBase8Spacing and npveSidesheet_medicationSummaryRowNonBase8Spacing, and my DEFECT npveCleanupAudit_offGridBuiltUnits struck as closed.

## 4. Marker colours: done
Only the specimen paints changed, to `color/grey/600` (#545454), bound; the nodes and everything else in the cards are as they were.
- `817:12493` (Templates 31): the up-delta glyph `I817:12494;816:12440;573:3649` and its value `I817:12494;816:12443` moved from color/error/dark. `compare-markers.png`.
- `27:306` (Screens 01): the check `I27:301;170:6;200:40` moved from color/success/dark.
- Readback: no saturated solid paint remains in either card. The marker text still names the source hexes (#B51A2C, #1D6B45) as prose; left.
- Docs: DEFECT npveCleanupAudit_markersNonGreyContent struck as closed.

## Page/Encounter whole
`after-page-encounter-429-4161.png` (1429 x 985) against `before-page-encounter-429-4161.png` (1429 x 989). Header, module strip, both Problems status carets and the row spacing are visible in context. The Screens 15 comparison instances follow the master; not separately re-screenshotted.

## New findings (FLAGS.md)
- Status caret at a 12 slot inks 5 x 2.5 (DECISION, above).
- Patient header 68 against the composition's 72 (DECISION).
- Status menu `156:1321` anchor is 3 lower relative to its label than before (DEFECT, small).
