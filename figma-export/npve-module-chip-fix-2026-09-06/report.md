# NPVE Module chip master correction — 2026-09-06

## Outcome

The `Module chip` component set (`426:4213`) and `Module strip` (`426:4214`) are corrected in the NPVE Rebuild target. The source and library remained read only. The sole encounter comparison (`434:7474`) inherits the master correction.

## Source measurement before editing

- Source strip: `zVsuhYehoSLLq880qRBFkq` `4841:17097`, 1397×40.
- Selected Note chip: 120×40, radius 8, 12px horizontal / 8px vertical padding, 8px internal gaps.
- Icon: 24px slot; visible vector 15×19; `#004852`, matching `color/primary/main`.
- Label: Akkurat LL Bold 14/18; the Note label measures `#000000`, while the Problems label measures `#004852`.
- Close: 24px control containing two 8×8 stroked paths, `#000000`, 1.5px stroke.
- Daniel's crop-review direction intentionally supersedes the mixed raw inks: selected icon, label, and close use one teal family.

## Changes

- Selected master `426:4199`: icon + label + close; `itemSpacing` bound to `space/16`; all three inks bound to `color/primary/main` (`#004852`).
- Close: swapped to the library `Icon/Close (MUI)` and resized to a compact 16×16 instance; its visible glyph is about 9.33×9.33, close to the source's 8×8 mark, without drawing a replacement.
- Unselected master `426:4206`: label only; icon hidden; close hidden and unlinked from the Boolean; 40px minimum height preserves the source height; `itemSpacing` remains bound to `space/16` for API consistency.
- Component API: `Show close` defaults true and affects only the selected variant. Label and Icon swap properties remain intact.
- Strip order: Modules · Note · Problems · AI Summary · Vitals · Care Team · Labs/Studies · Allergies · Timeline. Note and Problems are selected; the remaining six are label-only grey pills.
- The schema library page-order snapshot was refreshed to the verified live order: Cover, Foundations, Reference, Actions, Inputs, Data display, Feedback, Surfaces & navigation, Icons & illustrations, Compositions, Layouts.

## Comparison log

The stale Module chips row now describes the corrected local set and label-only unselected anatomy. Two rows were added verbatim:

- `Chip spacing | Tight 8px gaps → 16px | Small elements in one control need room`
- `Chip inks | Black icon, black close → one teal family | Matches the source's single ink`

The second row preserves the approved change-log wording. The source measurement above records the raw exception: the source Note icon is teal while its label and close are black.

## Validation

- Target identity: Cover `0:1`, Templates `3:2`, Screens `27:2`, Archive `126:2`.
- Templates section 15: 1,549 nodes walked with invisible instance children included; 0 unbound local solid paints; 0 fractional authored geometry on edited roots (vector/group bounds excluded).
- Screens section 15: 517 nodes walked; 0 unbound local solid paints; one live `Rebuild comparison/Page` instance.
- Selected master: 128×40; 24px icon, 14px label, 16px close; 16px gaps bound to `space/16`.
- Unselected master: 56×40 for the Note sample; hidden icon/close; label-only rendering.
- Strip master: 1397×40. Selected widths 128 / 158; unselected widths 103 / 61 / 93 / 112 / 81 / 80.
- Placed strip structure and properties equal the master. Direct 1× master-versus-placed PNG diff: one anti-aliased edge pixel, maximum channel delta 13.
- Change log: 17 rows; row stack 448×1869; helper 480×1926; comparison master remains 2005×2154.
- No new GAP or DEFECT marker was needed. Existing glyph candidates 31–32 remain the correct home for the Problems stand-in and white-glyph library defect.

## Standing rules

1. PASS — selected chip fill/stroke and icon/label/close bindings verified through the placed comparison.
2. PASS — 0 unbound local paints in the edited Templates and Screens sections.
3. PASS — set, strip, comparison, and row counts were read live; no clone was used.
4. PASS — `skipInvisibleInstanceChildren = false` on every walk.
5. PASS — no paint opacity authored.
6. PASS — nodes, property keys, tokens, and source order enumerated live.
7. PASS — target keys and four page IDs verified; library page-order snapshot refreshed.
8. PASS — 0 fractional authored geometry; 40px minimum height is an intentional base-8 literal.
9. PASS — no bound-paint alpha changed.
10. PASS — no component clone; text/property rendering verified through live instances.

## Evidence

- `comparison-module-strip-reference-vs-rebuild.png`
- `master-module-chip-set-426-4213-1x.png`
- `rebuild-module-strip-426-4214-1x.png`
- `placed-module-strip-from-comparison-1x.png`
- `pixel-diff-master-vs-placed-strip-1x.png`
