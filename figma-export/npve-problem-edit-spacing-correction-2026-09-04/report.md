# NPVE Edit Problem spacing correction

Date: 2026-09-04  
Target: NPVE Rebuild `fdCQVFdvOByaOYIJYag0d6`  
Templates page: `3:2`  
Source evidence: `zVsuhYehoSLLq880qRBFkq` / `4536:27605` (read only)

## Outcome

Corrected the clipped Acute and Chronic Chips and normalized the Edit Problem body to the agreed vertical rhythm. The source reference remains frozen evidence; its spacing deviations are documented in the comparison instead of being silently copied.

## Changes

- `316:3412` Problem edit body: added 8px internal top inset. Combined with the Sidesheet body's existing 16px top padding and the field label's -8px float, the visible divider-to-label clearance is now 16px.
- `316:3434` Status and type: 518x56 → 518x64; Status is vertically centered at y=12.
- `316:3456` Type: 162x56 → 162x64; the 60px label + 8px gap + 32px Chips stack is centered, with Chips at y=30 and bottom at y=62.
- Major body rows remain 16px apart: first field → Status/Type → Dates → Comments.
- `318:3953` change-log row now records `8 px visible top / 54 px row → 16 px visible top / 64 px row` and explains the canonical 16px rhythm.

## Source interpretation

The reference has two inconsistencies that should not become reusable geometry:

- Its first floating label has only 8px visible clearance from the header divider.
- Its Status/Type construction uses an irregular 54px height with 29px pills.

The rebuild preserves the content and relationships while translating those measurements to base-8 values.

## Validation

- Sidesheet remains 550x600 and linked to master `6:65`.
- Sidesheet body shell remains unchanged at 16px top and 16px side padding.
- Body master and live Body content both resolve to 518x304 with 8px top inset and 16px item spacing.
- Live major-row gaps are all exactly 16px.
- Visible divider-to-first-floating-label clearance is exactly 16px.
- Type choices bottom at y=62 inside a 64px Type frame; neither Chip is clipped.
- Body master and live body expose 64 paint entries with exact normalized parity.
- All nested reusable controls remain live instances; no detach or clone occurred.
- No paint, alpha, token, property default, source image, footer, or global shell mutation occurred.
- Fractional geometry is limited to inherited vector paths inside subscribed icons; all authored correction geometry is integer.

## Artifacts

- `before-comparison.png`
- `after-body.png`
- `after-comparison.png`

## Findings

- Resolved: the local 56px clipping frame introduced in the first Edit Problem rebuild.
- No new GAP, DEFECT, or DECISION flag was opened.

