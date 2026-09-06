# NPVE Medication List Sidesheet — 2026-09-04

## Outcome

The Medication List is now a live instance of the canonical `Sidesheet` master and has a complete reference/rebuild comparison screen.

## Source and target

- Source: `zVsuhYehoSLLq880qRBFkq`, `Page=Clin_MedList` (`545:5557`), read only
- Target: `fdCQVFdvOByaOYIJYag0d6`
- Legacy source geometry: `550×380` with `64px` header and `76px` footer
- Canonical target geometry: `550×600` with `56px` header and `56px` footer
- Product typography: Akkurat LL

## Created and changed

- `248:1827` — `Medication list footer action`, a `534×38` local wrapper around the published Button
- `6:65` — Sidesheet API extended with:
  - `Show primary action#252:0` (default `true`)
  - `Show full-width action#252:1` (default `false`)
  - `Full-width action#252:2` (curated to `248:1827`)
  - Medication list body added to `Body content#6:5` preferred values
- `250:3518` — Screens section `04 · Medication list`
- `250:3519` — live `Sidesheet — Medication list`
- `253:1838` — source-reference comparison component
- `253:1840` — live rebuild comparison component
- `254:1895` — structured Medication List change log
- `254:3706` — Screens section `05 · Medication list comparisons`
- `254:3707` — live `Rebuild comparison — Medication list`

## Footer geometry

The shell Actions row keeps its existing `8px` padding. The new wrapper is `534px` wide and carries bound `8px` left/right padding. Its published Button fills the remaining `518px`, producing a total `16px` inset from the Sidesheet edge.

## Validation

- Medication sheet: `550×600`, main component `6:65`
- Medication body: main component `236:1758`
- Full-width footer action: `534×38`, visible; ordinary primary action hidden
- Comparison: `1708×1290`, all three content swaps resolved
- Medication summary row references: `7`
- Medication list body references: `19`
- Medication Sidesheet references: `53`
- Comparison references: `77`
- Problems Closed and Open remain `550×600`, retain their original body swaps, and keep the new full-width slot hidden by default
- Fonts: Akkurat LL only
- Unbound non-instance solid paints on changed content: `0`
- Fractional authored dimensions outside VECTOR/GROUP exemptions: `0`

## Evidence

- `source-sidesheet-545-5557.png`
- `rebuilt-sidesheet-250-3519.png`
- `medication-list-section-250-3518.png`
- `comparison-screen-254-3707.png`
- `reference-vs-rebuilt.png`

The draft screenshot is retained as recovery evidence for the rejected narrow-slot approach; the Figma mutation that attempted to resize that nested swap was atomic and changed nothing.
