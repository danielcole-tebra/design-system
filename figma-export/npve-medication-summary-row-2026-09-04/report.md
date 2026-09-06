# NPVE medication summary row — 2026-09-04

Status: complete. Batch recorded before Figma mutation; no stop condition triggered.

## Scope

Created one local `Medication summary row` component on the NPVE Rebuild Templates page, using published library primitives and variables, plus Active and Discontinued preview instances. Source and library remained read-only.

Target: `fdCQVFdvOByaOYIJYag0d6` · Templates `3:2` · `06 · Medications` `219:2067`.

Master: `Medication summary row` `219:2068`. Preview frame: `Medication summary row — states` `224:1730`.

## Source-to-rebuild geometry

| Measure | Source | Rebuild | Decision |
| --- | ---: | ---: | --- |
| Row width | 510 | 518 | Uses the established 16px-per-side sidesheet body inset (`550 - 32`). |
| Row height | 71 | 76 | Base-8 target from `12 + 20 + 8 + 24 + 12`. |
| Row padding | 12px V / 4px H | 12px V / 8px H | 8px is the canonical horizontal spacing step. |
| Status label → caret | 4 | 4 | Bound to `space/4`. |
| Status → medication line | 8 | 8 | Bound to `space/8`. |
| Name → dose → indication | 8 | 8 | Bound to `space/8`; the ICD-like medication dose remains immediately beside the name. |
| Indication chip | 22 high | 24 high | Uses the published small outlined/default Chip rather than drawing a local badge. |

The component root is exactly 518×76. Details are 462×52 at (8,12); Status control is 61×20; Medication line is 229×24; Actions are 40×40 at (470,18); Divider is absolute at (0,75), 518×1.

## Component API

- Own properties: `Status`, `Name`, `Dose`, `Show divider`.
- `Indication` uses the exposed published Chip instance and its `Label` property; Chip variants and delete visibility remain library-owned.
- Seven component-property references remain on the master and both previews: Status, Name, Dose, Chip Label, Chip Delete icon, Icon button Icon swap, and Divider visibility.
- Active preview `224:1733`: Losartan · 50mg · Hypertension · action shown · divider shown.
- Discontinued preview `224:1754`: Sertraline · 100mg · Depression · action hidden · divider hidden. Status text and caret use the existing grey/500 instance-override convention.

## Published dependencies

- `Icon/DownCaret` key `9014d3426e8bc55a4b28ef279f584134ae32f06f`
- Small outlined/default `Chip` key `e5db0e4b69da285f4e36a3278a38d84208cf2617`
- Primary/medium/default `Icon button` key `8a04b23efcc25cedea82a8ebd5d1750add74c9ca`
- `Icon/AddPaymentNote` key `9fe47d27ed040f1d0e988074b7ea7ba27afcebef`
- Horizontal `Divider` key `0143de7b0529ee6fed9d0c163eeab7571480bc67`
- Component surface `color/grey/300`; section chrome remains the requested exact `#E4E4E4` because no exact published variable exists.

## Deliberate visual differences

- The source action is a hand-drawn 40px outlined circle. The rebuild uses the published Icon button with AddPaymentNote, which is a bare glyph. This is the already-recorded library gap covered by `npveAudit_problemSummaryRowDrawnControls` / `npveProblemsCorrections_iconButtonNoRingedVariant`; no local ring was invented.
- The source status caret is a filled triangle. The rebuild uses the published chevron (`npveMgmt_statusCaretGlyphGap`).
- The source row fill is unbound `#F3F3F3`; the rebuild uses bound `color/grey/300` (`#F6F6F6`).
- The source badge is 22px high; the published small Chip is 24px high.

## Standing-rule verification

1. Master vs Active instance: ten rendered solid-paint signatures match exactly, including bound-variable keys and opacity; zero unbound paints.
2. Every top-level node on every page was walked outside instances with `skipInvisibleInstanceChildren=false`. Unbound paints: Cover 1 pre-existing (`1:5`); Templates 0; Screens 0; Archive 0. Section chrome excluded by the established rule (0 / 11 / 6 / 8 paint counts).
3. Property references: Medication master 7, Active 7, Discontinued 7. Trusted Problem summary row remained 6 → 6.
4. `skipInvisibleInstanceChildren=false` on every audit.
5. No paint-level opacity was authored.
6. Names, dependencies, pages, and flags were enumerated from the file rather than recalled.
7. Every Figma call passed explicit file keys; identity was verified as Cover / Templates / Screens / Archive before writes.
8. Full rule-8 walks found zero fractional authored dimensions on all four pages; VECTOR/GROUP intrinsic bounds were excluded (0 / 315 / 146 / 69).
9. No bound paint alpha was changed.
10. No component or variant was cloned; property references were enumerated after creation.

Two rejected scripts were atomic and left no file changes: one attempted to clear component-property references on a clone before it was a symbol sublayer; one targeted `fontStyle` instead of the trusted row's actual `fontWeight` binding field. Both were corrected before a successful mutation.

## Evidence

- `source-active-545-5573.png`
- `source-discontinued-545-5589.png`
- `rebuilt-states-224-1730.png`
- `reference-vs-rebuilt.png`
- `trusted-problem-summary-row.png` (validation capture only)
