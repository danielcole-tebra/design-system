# NPVE Sidesheet global header padding — 2026-09-04

## Outcome

The global Header correction is complete. Every NPVE `Sidesheet` placement now uses genuine `16px` top and bottom padding bound to published `space/16`.

Because the Header retains its published medium `40px` Back and Close touch targets, it now resolves to `72px`. This is intentionally taller than the `64px` source and the `56px` design-system Drawer Header. The user explicitly chose canonical base-8 container padding over matching the reference height.

## Header geometry

- Header: `550×56 → 550×72`
- Padding: `8 / 8 / 8 / 16 → 16 / 8 / 16 / 16`
- Title: remains `32px` high; `y12 → y20`
- Visible Back/Close touch targets: remain `40×40`; `y8 → y16`
- Header divider: `y56 → y72`
- Top and bottom padding bind to `space/16` key `6016592c19254dd61e9de9e006459546eaece0bb`

No typography, icon, color, radius, outline, property, or footer styling changed.

## Fixed Sidesheets

The three component variants remain `550×600`:

- Body: `y57 h472 → y73 h456`
- Footer: remains `y529 h71`
- Footer-hidden Body: `h543 → h527`

The flexible Body absorbs the `16px` Header increase. This keeps the global sheet size stable, as required.

## Content-driven Medication Sidesheet

To preserve its approved `238px` active Body, the content-driven Medication sheet grows by the same `16px`:

- Screen `250:3519`: `550×366 → 550×382`
- Comparison component `253:1840`: `550×366 → 550×382`
- Nested Sidesheet content `253:1841`: `550×366 → 550×382`
- Body: remains `y73 h238`
- Footer: `y295 → y311`, remains `71px`

The comparison container does not need to grow because its Change log remains taller than the rebuilt content.

## Change logs

Updated five `Change log/Row` instances so the canvas documentation matches the live geometry:

- Problems shell rows `160:1852` and `160:1929`
- Medication shell row `254:1900`
- Medication Header row `254:1906`
- Medication Footer row `254:1924`

## Preserved

- Component set `279:2446` and all three variant IDs
- All 12 existing component properties/defaults and `Placement=Floating`
- `58` reference-bearing nodes / `70` reference entries on every variant
- Fourteen Floating, one Docked right, and one Docked left actual instance
- Published medium Icon button instances and icon swaps
- Body and Footer padding, paints, alpha, radius, and four-sided outline
- Source and shared-library files remained read-only

## Verification

- Exact target file and four page identities passed before mutation.
- All three Headers read `72px` with `16 / 8 / 16 / 16` padding and the correct token bindings.
- The visible Back state was verified on `6:144`; Close controls render at `y16` on all inspected screens.
- Problems closed and open remain `550×600`, Body `y73 h456`, Footer `y529 h71`.
- Medication screen and comparison are `550×382`, Body `y73 h238`, Footer `y311 h71`.
- All 16 actual instances remain attached to their original placement variants.
- Before/after paint signatures match; no opacity or bound alpha changed.
- No fractional authored geometry was introduced.
- Problems closed, Problems status menu open, Medication, and source-versus-rebuild Header renders were visually inspected.

## Recovery note

One guarded write rejected atomically because it expected the hidden Back layer to reflow. Invisible auto-layout children retain their previous coordinates in Figma. The corrected batch validates the visible Back instance instead; the rejected call made no changes.

## Evidence

Before:

- `before-reference-vs-rebuild-header.png`
- `before-problems-156-2428.png`
- `before-medication-250-3519.png`

After:

- `reference-vs-rebuild-header-after.png`
- `after-header-156-2428.png`
- `after-problems-closed-156-2428.png`
- `after-problems-open-156-2707.png`
- `after-medication-250-3519.png`

## Schema

Record: `npveRebuild_sidesheetHeaderPaddingGlobal_2026-09-04`

Resolved finding: `npveSidesheet_headerTitleInsetConflict`

Batch classification: `GAP 0`, `DEFECT 1`, resolved `1`.
