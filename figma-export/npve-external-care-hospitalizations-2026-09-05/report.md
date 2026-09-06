# NPVE rebuild — External Care History · Hospitalizations

Status: DONE  
Date: 2026-09-05

## Outcome

Built the Hospitalizations view as a reusable Sidesheet body and composed it through the shared `Sidesheet` component. The rebuilt sheet is 550 × 383 and closes around its active content instead of preserving the source frame's unused 600 px height.

## Source

- File: `zVsuhYehoSLLq880qRBFkq`
- Node: `129:8316` (`Page=Clin_ExternalCare-Hospitalizations`)
- Capture: frozen 2× PNG, 1100 × 1200
- Policy: source file remained read only

## Created in NPVE Rebuild

- Templates section `370:3340` — `12 · External care history`
- Event card component `370:3341`
- Hospitalizations body component `370:3353`
- Transparent rebuild helper `371:3359`
- Shared Sidesheet instance `371:3360`
- Frozen reference helper `373:3403`
- Change-log helper `378:3403`
- Screens section `378:5612` — `12 · External care history comparison`
- Sole comparison instance `378:5613`

## Reuse and normalization

- Reused published Tabs/Tab, Divider, Button, PlusOutlined, Chip, and footer Button components.
- Added the new body to the shared `Body content` preferred values without changing the default.
- Used 16 px between major body elements, 16 px card padding, and 8 px between related card metadata.
- Used the shared 72 px header and 71 px footer; the 1 px difference is the divider, not inconsistent padding.
- Used the local NPVE `radius/md` token and existing paper, divider, hairline, text, spacing, and typography variables.

## Verification

- Visual comparison: PASS
- Content-driven shell height: PASS
- Full sheet outline: PASS
- Live component lineage: PASS
- Sole comparison placement: PASS
- Whole-pixel owned geometry: PASS
- Akkurat LL / no mixed fonts: PASS
- Source and library read-only policy: PASS
- New GAP / DEFECT / DECISION flags: 0

The only fractional geometry found is inside the approved PlusOutlined vector path; all owned frames, components, and layout values are whole pixels.

## Evidence

- `source-129-8316-2x.png`
- `body-370-3353.png`
- `rebuild-371-3359.png`
- `comparison-378-5613.png`

## Next candidate

External Care History · Facility Stay is the natural adjacent batch, but it requires a fresh source audit and plan before any write.
