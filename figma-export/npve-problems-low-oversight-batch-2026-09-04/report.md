# NPVE Problems low-oversight batch — 2026-09-04

## Outcome

Built and validated two additional Problems Sidesheets in `fdCQVFdvOByaOYIJYag0d6`:

- Problems list · Empty, from source `4704:17095`
- Problems picker · Browse, from source `129:10016`

Both screens remain live instances of the shared `Sidesheet` component. The source and shared-library files remained read only.

## Component changes

- Added `State=Empty` (`304:2883`) to `Problems list body` (`156:2426`).
  - Closed remains the default.
  - The new variant keeps the source toolbar, uses the checked library checkbox, hides the second filter and status rows, and hugs to 90px.
  - The clone retains the Closed variant's 35 referenced nodes / 37 property-reference entries.
- Added standalone `Problems browse body` (`304:2910`).
  - It contains a live `Active tab=All` instance (`94:639`).
  - Only the search state (`Value=Empty`) and section title (`Common Problems`) are overridden.
  - It is added to the Sidesheet `Body content` preferred values; the default remains `Active tab=Recent` (`26:221`).
- Extended the `Rebuild comparison` preferred values with the two new reference, rebuild, and change-log helpers. All comparison defaults remain unchanged.

## Screens and organization

- Templates section `07 · Problems state comparison helpers` (`309:4528`) at y=13660, 200px below the prior section.
- Screens section `06 · Problems states` (`309:4529`):
  - `Sidesheet — Problems list · Empty` (`309:4531`)
  - `Sidesheet — Problems picker · Browse` (`309:4772`)
- Screens section `07 · Problems states comparisons` (`309:4530`):
  - `Rebuild comparison — Problems list · Empty` (`309:5711`)
  - `Rebuild comparison — Problems picker · Browse` (`309:6116`)

Every new Sidesheet is 550×600 and remains linked to `Placement=Floating` (`6:65`). The Browse source component is authored at 40% opacity; that opacity is preserved only on the two Browse screen instances, not on the reusable body.

## Comparison decisions

The rebuilds use the established canonical shell and library-first rules:

- Sidesheet header/footer: 72px / 71px on the base-8 system, rather than the legacy 64px / 76px or 60px source values.
- Body inset and vertical stack: canonical 16px.
- Search: shared library Text field. The existing missing leading-search-adornment gap remains; no magnifier was redrawn.
- Tabs: shared 48px library tabs, rather than the legacy compact 28px tabs.
- Problem rows: shared `Problem row` component.
- Add controls: shared library icon buttons. The existing ringed-plus gap remains; no one-off ring was drawn.
- Browse footer: only `Save & Add To Note` and `Save`; the inherited Cancel action was removed after visual QA.

No unresolved row-spacing decision from `npveRebuild_sidesheetBase8SpacingAudit_2026-09-04` was changed in this batch.

## Verification

- File/page identity: PASS — Cover `0:1`, Templates `3:2`, Screens `27:2`, Archive `126:2`.
- Source exports: PASS — fresh PNG exports at 2×; target reference fills report scalingFactor 0.5 with image hashes `48fe4f1e…` and `9ae7d408…`.
- Empty variant API: PASS — State options Closed / Open / Empty; default Closed.
- Sidesheet API: PASS — Body content default remains `26:221`; Browse added only as a preferred value.
- Comparison API: PASS — reference/rebuild/change-log defaults remain `114:777` / `114:779` / `114:880`.
- Instance integrity: PASS — no detached instances on Screens.
- Existing-screen invariance: PASS — eight pre-existing screen/comparison instances kept their names, parents, geometry, opacity, and actual component-property values.
- Geometry: PASS — no fractional authored x/y/width/height in either new Screens section. Fractional values under Templates are inherited library glyph geometry or centered library text.
- Paints: PASS — no local solid paints were added to either body. The only unbound solid paints in the new helper section are the copied `#E4E4E4` section backdrop and its existing section-outline convention.
- Visual QA: PASS — both standalone screens and both complete comparison frames were rendered and inspected. Browse was rerendered after removing the inherited Cancel action.

## Screenshots

- `source-empty-4704-17095-2x.png`
- `source-browse-129-10016-2x.png`
- `component-empty-304-2883.png`
- `component-browse-304-2910.png`
- `standalone-empty-309-4531.png`
- `standalone-browse-309-4772.png`
- `comparison-empty-309-5711.png`
- `comparison-browse-309-6116.png`

## Recovery notes

- One read-only source inventory attempted to read `visible` from a Page; corrected with node-type narrowing. No mutation.
- One atomic body-construction attempt used a clone-only reference assertion on a wrapper composition; corrected to validate its live All-variant instance. No mutation.
- Figma cloned `State=Empty` to the page rather than into the set. Post-write validation caught it immediately; the intact component was inserted into `Problems list body` and the State API was reverified.
- Three atomic screen-composition attempts aborted before commit because of an unavailable paint-clone helper, exact float comparison on 40% opacity, and an invariance signature that included intentionally extended preferred-value lists. Each assertion was narrowed to the relevant runtime behavior before the successful call.

