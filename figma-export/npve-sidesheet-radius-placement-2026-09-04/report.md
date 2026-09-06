# NPVE Sidesheet radius and placement — 2026-09-04

## Outcome

The approved NPVE-local radius treatment is complete. `Sidesheet` is now a three-variant component set with explicit `Floating`, `Docked right`, and `Docked left` placement states.

The change is intentionally local to NPVE Rebuild. The shared design-system library remains read-only because its current page registry does not match the canonical repository schema, and production code does not yet define `radius/md`.

## Token

- Collection: `NPVE/Dimension`
- Variable: `radius/md`
- Value: `8`
- Scope: `CORNER_RADIUS`
- Stable key: `90d6487ce9be2aa9a84f2adb82c1d5bd90f3ae24`
- Code syntax: none; this is a documented NPVE exception, not a production-code claim

## Component API

- Component set: `Sidesheet` `279:2446`
- `Placement=Floating` `6:65`: `8 / 8 / 8 / 8`
- `Placement=Docked right` `279:2416`: `8 / 0 / 0 / 8`
- `Placement=Docked left` `279:2431`: `0 / 8 / 8 / 0`

Corner order is top-left, top-right, bottom-right, bottom-left. Every nonzero corner is bound to the local token. The dock edge remains square.

`Placement` is the only new property and defaults to `Floating`. The original 12 properties and defaults—including `Body content`, footer actions, visibility controls, and title—are unchanged.

## Preserved

- Existing component identity `6:65` remains the Floating default.
- Fourteen actual existing instances remain live and attached to `6:65`.
- All variants remain `550×600` with unchanged header, body, footer, outline, and padding.
- Each variant has `58` reference-bearing nodes / `70` reference entries when hidden instance children are included.
- Source and shared-library files were not modified.
- Cards, Paper, Dialog, and generic Drawer were not modified.

## Documentation layout

The Templates section `01 · Sidesheet shell` expanded from `2730×1500` to `3230×1500` so the three masters and two validation instances fit with canonical `80px` gaps. Existing examples remain at their prior coordinates.

Added examples:

- `Sidesheet — Docked right` `279:2613`
- `Sidesheet — Docked left` `279:2711`

## Verification

- Exact target file and page identities passed before mutation.
- Structural metadata confirms the three variants at `550×600`, spaced `80px` apart.
- Token readback confirms local ownership, value `8`, `CORNER_RADIUS` scope, and empty code syntax.
- All nonzero radii are bound to `radius/md`; dock-edge corners are explicitly `0`.
- All 12 existing property definitions and defaults are unchanged.
- Deep reference audit with `skipInvisibleInstanceChildren=false` reports `70` entries on every variant: `20 visible`, `23 mainComponent`, and `27 characters`.
- Existing instances render their body/footer overrides; each docked variant has a live validation instance.
- All new or changed authored geometry is whole-pixel.
- No paint, opacity, or paint binding changed.
- Final renders were visually inspected for rounded floating corners and square dock edges.

## Recovery notes

Four guarded checks rejected atomically and made no Figma changes: a stale cross-session variable ID, a virtual instance included in an early count, a node-versus-link assertion, and a default traversal that skipped hidden instance children. The successful batch resolves the token by stable key/name, distinguishes actual from virtual instances, counts links correctly, and uses the repository-standard deep traversal.

## Evidence

- `before-master-6-65.png` — exact pre-radius baseline reused from the immediately preceding verified global Sidesheet batch
- `after-sidesheet-placement-variants.png`
- `reference-problems-sidesheet.png`
- `rebuild-problems-sidesheet.png`
- `comparison-reference-rebuild.png`

## Schema

Record: `npveRebuild_sidesheetRadiusPlacement_2026-09-04`

Flags recorded:

- `npveSidesheet_radiusMdMissingFromLibrary` — GAP, intentionally localized
- `npveSidesheet_squareAgainstSource` — DEFECT, resolved
