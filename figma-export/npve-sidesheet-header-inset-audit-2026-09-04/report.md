# NPVE Sidesheet header inset audit — 2026-09-04

## Outcome

The observation is correct: the rebuilt `Problems` title has `12px` above and below its `32px` line box, while the source has `16px`.

No Figma node was changed in this batch. The audit stops because the source geometry conflicts with the code/library Drawer pattern, and because setting the current header's vertical padding directly to `16px` would not produce the requested result.

## Measurements

| Surface | Header | Title | Title clearance | Controls | Authored padding |
| --- | ---: | ---: | ---: | ---: | ---: |
| Source Problems `545:5503` | `550×64` | `32px` at `y=16` | `16 / 16` | bare `24px` close glyph | `16 / 16 / 16 / 16` |
| Rebuild Sidesheet `6:66` | `550×56` | `32px` at `y=12` | `12 / 12` | `40px` Back/Close Icon buttons | `8 / 8 / 8 / 16` |
| Library Drawer Header `749:231` | `320×56` | `32px` at `y=12` | `12 / 12` | `40px` Icon button | `8 / 8 / 8 / 16` |

The rebuild exactly matches the current library Drawer Header. The source is intentionally roomier.

The code-backed Drawer story uses `Box m={1}` around its header content (`Drawer.example.tsx`, lines 263–276), resolving to `8px`. Code/library and source therefore disagree; under the repo rules this is a decision, not an automatic reconciliation.

## Why `paddingTop=16` is not the fix

The current header hugs a `40px` Icon button. Setting top and bottom padding to `16px` would produce `16 + 40 + 16 = 72px`, and the `32px` title would sit with `20px` visual clearance—not the requested `16px`.

Switching to the published small Icon button does not solve it either: that variant is `34px`, so a canonical 64px header would place it at a non-token `15px` inset and would reduce the current touch target.

## Recommended NPVE-local correction

Set the Sidesheet Header to a fixed `64px` height, keep its current `8px` top/bottom padding tokens, center its contents on the cross axis, and retain the published medium `40px` Icon buttons.

Rendered result:

- title: `y=16`, `h=32`, so `16px` above and below
- Back/Close touch targets: `y=12`, `h=40`
- horizontal padding remains `16px` left and `8px` right
- no icon, typography, paint, property, radius, outline, or footer change

This is a fixed-height composition decision, not a claim that every child has 16px physical padding.

## Global impact

All three variants and 16 actual examples inherit the Header change.

For fixed `550×600` Sidesheets:

- Header: `56→64`
- Header divider: `y56→64`
- Body: `y57→65`, `h472→464`
- Footer: remains `y529`, `h71`
- Footer-hidden Body: `h543→535`

For the content-driven Medication list, preserve the approved `238px` active Body by increasing these nodes from `550×366` to `550×374`:

- `250:3519` Sidesheet — Medication list
- `253:1840` _Rebuild comparison/Rebuild/Medication list
- `253:1841` nested Sidesheet content

The Medication Footer moves `y295→303`. The overall comparison remains governed by its taller Change log and does not need to grow.

## Evidence

- `source-header-545-5503.png`
- `rebuild-problems-156-2428.png`
- `rebuild-header-156-2428.png`
- `reference-vs-rebuild-header.png`

## Schema

Record: `npveRebuild_sidesheetHeaderInsetAudit_2026-09-04`

Finding: `npveSidesheet_headerTitleInsetConflict` — DEFECT, for decision.
