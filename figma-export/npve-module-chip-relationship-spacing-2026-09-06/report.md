# NPVE Module chip relationship spacing — 2026-09-06

## Outcome

The selected `Module chip` master now expresses two different relationships:

- `Icon` → `Label`: `space/8`
- `Module identity` → `Close`: `space/16`

The icon and text therefore read as one module identity, while the close control reads as a separate action. The source and library files remained read only.

## Figma changes

- Added the `Module identity` auto-layout group (`489:5759`) inside selected master `426:4199`.
- Reparented the existing icon (`426:4200`) and label (`426:4203`) into that group; neither element was recreated.
- Bound the group gap to the verified `space/8` variable.
- Retained the selected master's outer gap bound to `space/16`.
- Preserved the `Label`, `Icon`, `Show close`, and `selected` component-property API.
- Preserved every existing `Module chip`, `Module strip`, and encounter-comparison instance; no instance was detached.
- Amended change-log row `481:10192` instead of adding a duplicate row.

## Resulting dimensions

- Selected master: `120×40`
- Selected Note chip: `120×40`
- Selected Problems chip: `150×40`
- Module strip master and placed strip: `1397×40`

The chip widths shrink by 8px because the icon-to-label relationship changed from 16px to 8px. The close remains 16px from the grouped identity content.

## Validation

- `space/8` resolved live from variable `VariableID:183d5d946d268e8bd37735b8b0dc95111c46eddd/997:15`.
- `space/16` remains bound on the selected master through `VariableID:6016592c19254dd61e9de9e006459546eaece0bb/997:24`.
- Note retained label `Note`, document icon, and visible close.
- Problems retained label `Problems`, clinical icon override, and visible close.
- Templates section still reports 8 selected references, 24 unselected references, 3 Module strip references, and 32 Module chip instances.
- Edited-root audit: 15 authored nodes, 0 unbound solid paints, 0 fractional authored geometry.
- Screens section contains one linked encounter comparison and one linked placed Module strip.
- Comparison change-log row expanded through its auto-layout chain without clipping.
- Typography remains `Akkurat LL Regular`.
- Direct 1× master-versus-placed pixel comparison: 1 differing anti-aliased pixel; maximum channel delta 13.
- No GAP or DEFECT marker was added.

## Evidence

- `comparison-module-chip-spacing-detail.png` — enlarged reference/rebuild spacing detail
- `comparison-module-strip-reference-vs-rebuild.png` — full reference/rebuild strip
- `master-module-chip-set-426-4213-1x.png` — corrected component set
- `rebuild-module-strip-426-4214-1x.png` — live strip master
- `placed-module-strip-from-comparison-1x.png` — live placed comparison instance
- `pixel-diff-master-vs-placed-strip-1x.png` — master/placement diff

## Intentional source difference

The source places the close action tightly beside the label. The rebuild intentionally uses 16px between the grouped module identity and the close control, per the agreed hierarchy. All other decisions from `npveRebuild_moduleChipFix_2026-09-06` remain active.
