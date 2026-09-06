# NPVE rebuild — External Care History · Facility Stay

Status: DONE  
Date: 2026-09-05

## Outcome

The Facility Stay edit form is rebuilt in NPVE Rebuild and composed through the shared Sidesheet. The source, shared design-system library, existing Sidesheet defaults, and prior screens were not changed.

The rebuilt sheet is 550 × 853 and content-driven. It exposes the complete form and places the 71px footer immediately after the active body. This deliberately fixes the source's fixed-height clipping, which hides part of Discharge to and all of Comments in the 550 × 592 reference.

## Operator decision

The operator approved the recommended exact local exception before target writes:

- Collection: `NPVE/Color`
- Variable: `Form surface`
- Value: `#EEF7F9`
- Scopes: `FRAME_FILL`, `SHAPE_FILL`
- Platform code syntax: none

This preserves the repeated NPVE edit-form surface without adding an application-specific colour to the shared library. Input surfaces remain paper white, matching the source.

## Build

- Reusable form: `389:3469`, 518 × 612.
- Facility Stay body: `391:3567`, 518 × 677.
- Shared Sidesheet instance: `392:3673`, 550 × 853.
- Frozen reference helper: `392:4091`.
- Transparent rebuild helper: `392:3672`.
- Change-log helper: `392:4093`.
- Sole comparison: `393:7689` on Screens.
- Reused GAP marker: `394:5611`.

The form includes Facility Type, Facility Name, paired Admission and Discharge dates, Related to problem, Prior Event, Discharge to, Comments, and the delete action. The footer retains Cancel, Save & Add to Note, and Save.

## Reuse and GAP handling

The rebuild keeps live library instances for Text field, Form control label, Radio, Tab, Divider, Icon button, TrashOutlined, Calendar, Sidesheet, and footer Buttons.

The existing `npveProblemEdit_textFieldNoEndAdornment` GAP applies to the two date fields. Each date uses the established named wrapper around a live Text field plus a live Calendar instance. No field or icon was redrawn. The existing GAP marker was cloned into this comparison section for visibility.

## Spacing and geometry

- Form padding: 16px.
- Major row gaps: 16px throughout.
- Label-to-radio gaps: 8px.
- Date-pair gap: 8px.
- Shell: 72px header, 1px divider, 709px body region, 71px footer.
- Owned layout geometry: whole pixels only.

The library Form control label uses a 42px touch target, so the radio rows are taller than the compact source circles. This is recorded in the change log rather than hidden.

## Verification

- Visual: PASS at native resolution.
- Complete form: PASS; no source clipping reproduced.
- Token binding: PASS through master, nested body instance, and comparison instance.
- Input paper binding: PASS through rendered instances.
- Fonts: PASS; Akkurat LL with no mismatches.
- Live instances: PASS — 5 Text fields, 7 Form control labels backed by Radio, 2 Calendars, 2 Tabs, and the shared shell/footer.
- Single placement: PASS — one reference, one rebuild, one change log, and one comparison instance.
- Full-file paint inventory: PASS with expected documentation exceptions. Every top-level node on Cover, Templates, Screens, and Archive was walked. New owned unbound paints are only Figma Section canvas fills/strokes and the frozen reference image.
- Source and library: PASS; read only.

The standard comparison preview is 600px tall. This batch disables clipping only on the Facility Stay comparison instance's Rebuild column so the 853px sheet remains visible; the comparison master is unchanged.

## Findings

- Existing GAP reused: `npveProblemEdit_textFieldNoEndAdornment`.
- DEFECT resolved in rebuild: `npveExternalCareFacilityStay_sourceClipsForm`.
- DECISION resolved: `npveExternalCareFacilityStay_formSurfaceToken`.

## Evidence

- `source-reference-2x-648-1603.png` — frozen 1100 × 1184 source.
- `rebuild-form-final-389-3469.png` — reusable form.
- `rebuild-sidesheet-392-3672.png` — complete content-driven sheet.
- `comparison-393-7689.png` — native reference/rebuild/change-log comparison.
