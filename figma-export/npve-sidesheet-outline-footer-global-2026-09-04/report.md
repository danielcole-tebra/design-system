# NPVE Sidesheet global outline and footer correction — 2026-09-04

## Outcome

The first approved global batch is complete. The shared `Sidesheet` master now has a complete four-sided outline, and its footer action area uses canonical `16px` top and bottom padding. The correction propagates through all 21 live instances.

This batch deliberately stops before the separate content-height architecture change.

## Findings resolved

- **DEFECT — incomplete sheet outline:** `Sidesheet` `6:65` authored top/right/bottom/left weights as `0/0/0/1`. Both source references use all four edges. The master now uses `1/1/1/1`, `INSIDE`, with every weight bound to `border/hairline`; its paint remains bound to `color/divider`.
- **DEFECT — fractional footer action placement:** `Actions` `6:84` was a fixed `55px` frame with `8px` vertical padding around a `38px` action, yielding `y=8.5`. It now hugs to `70px` with `16px` top/bottom padding bound to `space/16`. The containing Footer is `71px`, including its `1px` divider.

Batch classification: `GAP 0`, `DEFECT 2`, both resolved.

## Geometry

- Shared master `6:65`: remains fixed at `550×600`
- Fixed-height Body: `y=57`, `h=472`
- Fixed-height Footer: `y=529`, `h=71`
- Footer Actions: `550×70`; padding `16 / 8 / 16 / 8`
- Medication standalone `250:3519`: `550×351` → `550×366`
- Medication comparison helper/content `253:1840` and `253:1841`: `550×351` → `550×366`
- Medication Body remains `y=57`, `h=238`; Footer still begins at `y=295`

The Medication height increases by exactly `15px`, matching the Footer increase from `56px` to `71px`; its active body region does not change.

## Preserved

- All 12 Sidesheet component properties and defaults
- Master width and fixed root height behavior
- Body padding and Footer horizontal padding
- Published component identities and all live instance links
- Problems Sidesheets `156:2428` and `156:2707` at `550×600`
- Source and library files remained read-only

## Affected population

All 21 live `Sidesheet` instances inherit the correction: Templates `10`, Screens `8`, Archive `3`. No instance was detached or replaced.

## Verification

- Exact target file and four page identities verified before mutation.
- Master and all 21 instances read four `1px` outline edges and the correct variable bindings.
- Footer-visible instances read `16px` top/bottom and `8px` left/right action padding.
- Master component reference count remains `70`; all property keys are unchanged.
- Full-page visible-solid-paint audits found only intentional unbound section/cover chrome.
- Changed authored geometry is whole-pixel; the only fractional hit was intrinsic centered text and is exempt.
- After renders were visually inspected for the master, both Problems states, Medication standalone, and the Medication comparison.

## Screenshots

Before:

- `before-master-6-65.png`
- `before-problems-section-156-2427.png`
- `before-medication-250-3519.png`

After:

- `after-master-6-65.png`
- `after-problems-section-156-2427.png`
- `after-medication-250-3519.png`
- `after-medication-comparison-254-3707.png`

## Schema

Record: `npveRebuild_sidesheetOutlineFooterGlobal_2026-09-04`

Resolved flags:

- `npveSidesheet_outlineOnlyLeft`
- `npveSidesheet_footerActionHalfPixel`

The prior Medication `550×351` record is retained and annotated as superseded by the new `71px` global Footer; the current content-driven Medication height is `550×366`.
