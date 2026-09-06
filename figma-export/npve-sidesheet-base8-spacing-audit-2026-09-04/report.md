# NPVE Sidesheet base-8 spacing audit — 2026-09-04

Status: read-only audit complete. No Figma node was changed.

## Outcome

The shared Sidesheet shell is clean. Header, Body, Footer, and Actions use only 0, 8, or 16px authored padding and gaps across Floating, Docked right, and Docked left.

The swappable bodies are mostly clean, but two local row components retain four non-base-8 decisions. These are the likely source of the visible inconsistency:

- Problem summary row `153:1186`: 19px top/bottom padding.
- Problem summary row Status control `170:1590`: 3px label-to-caret gap.
- Medication summary row `219:2068`: 12px top/bottom padding.
- Medication summary row Status control `219:2070`: 4px label-to-caret gap.

This is six non-compliant values on four nodes because each row has both top and bottom padding. The other 58 locally authored auto-layout nodes in the dependency closure pass the strict test.

## Audit rule and scope

Strict test: every non-zero authored padding or auto-layout `itemSpacing` value must be divisible by 8. Strokes, radii, typography metrics, fixed component dimensions, and intrinsic vector bounds are not spacing.

Inspected from the current target artifact with invisible instance children enabled:

- Sidesheet component set `279:2446`; variants `6:65`, `279:2416`, and `279:2431`.
- All 16 live Sidesheet instances.
- Ten local dependency roots: the three shell variants, Problems list body, Problems picker body, Medication list body, Problem row, Medication list footer action, Problem summary row, and Medication summary row.
- 788 rendered auto-layout nodes to catch instance-level overrides. No additional NPVE-owned exception appeared in placement.

## Why the values exist

They were deliberate fidelity choices, not accidental drift:

- `npveRebuild_rowStructure_2026-09-04` chose 19px around a 50px Problem details block to make the divider pitch exactly 88px; it chose 3px so an inset chevron has a 4px visual gap.
- `npveRebuild_medicationSummaryRow_2026-09-04` chose 12px around a 52px details block to produce a 76px row and retained the source's 4px caret gap. That report called 12px a “base-8 target,” but 12 is not divisible by 8.

The values are token-bound (`space/19`, `space/12`, `space/3`, and `space/4`), but token binding alone does not make them base-8.

## Published-library internals

A strict recursive scan also sees non-base-8 geometry inside published library instances: Button 6/7/17px, Text field 4/5/14px, Menu/Item 6px, Checkbox/Form control 9px, Tabs/Tab 12px, and Chip 3/7px.

Those values belong to the published library and largely reproduce MUI component geometry. They are not Sidesheet composition values and must not be overridden locally. Making every one of them divisible by 8 would be a separate library-level product decision with broad impact.

## Recommendation

If “base-8” is strict for NPVE-owned composition, run one local normalization batch:

1. Set both row masters to 16px top/bottom padding, bound to `space/16`.
2. Set both Status controls to an 8px gap, bound to `space/8`.
3. Let row height hug intrinsic content instead of preserving the prior 88px and 76px targets.
4. Re-capture the Problems and Medication comparisons and confirm the content-driven Medication footer still encloses the active area.

Expected geometry: Problem row 88px → 82px; Medication row 76px → 84px; the Medication Sidesheet grows from 382px to 398px. This intentionally trades some source fidelity for one consistent spacing rule, so the audit stops for a human decision.

## Evidence

- `problems-list-closed.png` — rendered screen `156:2428`.
- `problems-picker-default.png` — rendered shell example `6:109`.
- `medication-list.png` — rendered screen `250:3519`.

Schema record: `npveRebuild_sidesheetBase8SpacingAudit_2026-09-04`.
