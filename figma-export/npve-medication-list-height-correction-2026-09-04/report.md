# NPVE Medication List content-height correction — 2026-09-04

## Outcome

The Medication List footer now follows the active body instead of being pinned to the bottom of a 600px presentation frame.

The corrected rebuild is `550×351`:

- Header: `56px`
- Header divider: `1px`
- Body top padding: `16px`
- Medication list body: `206px`
- Body bottom padding: `16px`
- Footer: `56px`

The footer begins at `y=295`. The shared `Sidesheet` master remains `550×600`; this correction is limited to the Medication List instance and its comparison artifacts.

## Changed

- `250:3519` — standalone Medication List Sidesheet: `550×600` → `550×351`
- `253:1838` — source helper: `550×600` → `550×380`; removed the artificial white extension below the source export
- `253:1840` — rebuild helper: `550×600` → `550×351`; removed the artificial white extension
- `253:1841` — nested live Sidesheet: `550×600` → `550×351`
- `254:1895` — updated the Shell and Footer change-log rows

## Preserved

- `6:65` — shared Sidesheet master remains `550×600`
- `236:1758` — Medication list body remains `518×206`
- `156:2428` and `156:2707` — existing Problems Sidesheets remain `550×600`

## Verification

- `standalone-after.png` confirms the footer encloses the active body with canonical `16px` body padding.
- `comparison-after.png` confirms the source and rebuild no longer carry artificial white space below their sheets.
- All changed geometry uses whole pixels.
- The standalone and comparison rebuild remain live instances of `Sidesheet` `6:65`.

## Screenshots

- `comparison-before.png`
- `standalone-after.png`
- `comparison-after.png`

## Schema

Record: `npveRebuild_medicationListHeightCorrection_2026-09-04`

Resolved flag: `npveMedicationList_footerFixedGap`
