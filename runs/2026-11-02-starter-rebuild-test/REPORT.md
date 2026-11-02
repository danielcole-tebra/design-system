# Starter image to library: Empty and Filled test

Built a local reusable contact-details composition from the supplied image, with editable Empty/Filled instances at 640 and 400 px. Measured requirements and visual review pass; strict master-comparison differences are the exposed checkbox swaps documented below. Ready for Daniel's read; no additional Figma build batch started.

[Review section](https://www.figma.com/design/dZqYSxEj3scbmRP4IqJGLh?node-id=3-1630) · File: dZqYSxEj3scbmRP4IqJGLh

## Timing

Start: 2026-11-02T18:18:42Z. Ready to construct: 2026-11-02T18:23:40Z. Construction returned: 2026-11-02T18:24:21Z. First image: 2026-11-02T18:24:21Z. Verified: 2026-11-02T18:30:00Z.

Preparation/discovery: 298s; construction: 41s; verification after construction: 339s. First image elapsed: 339s; verified elapsed: 678s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- Layout: reusable local Empty/Filled masters and four review instances use auto layout. Card/header/form/name/action containers have bound spacing; the name row wraps at 400 px.
- Components/editability: each card includes five published Text field instances (one configured as select), a Form control label with published Checkbox, and two Buttons. Published internals were not edited or detached. Local composition masters are outside the review area.
- Typography: all visible text uses Akkurat LL. Authored title and supporting text use h2/body1 styles; documentation labels use body2. Published controls retain their original typography, which has empty textStyleId in some layers; the literal all-labels-use-text-styles checklist item is qualified, not falsely checked.
- Colors/spacing: paper, text, dividers, radius/sm=4, spacing 0/8/16/24 and Elevation / 1 are imported and applied. Divider uses the published STROKE_COLOR scope after a targeted correction. Existing alpha in bound component paints is preserved.
- Resizing/states: both Empty and Filled checked at actual 640×542 and 400×614 px. Name inputs are 296 px side by side at 640 and 368 px stacked at 400. All inputs are 56 px high. No visible overflow or clipping observed in the inspected renders.
- Content: exact title/description and five field labels retained. Filled values Alex, Morgan, alex.morgan@example.com, (202) 555-0148, Email and checked reminders verified; Empty values blank and checkbox unchecked. Actions retain stored Cancel and Save changes text; library capitalization renders Save Changes.
- Original preserved: uploaded PNG image hash 6eb3b938adae0de3eaf134715037deb1135d1058 matches the supplied asset. Reference node 3:2172 is outside the editable output. All four output cards contain zero IMAGE fills.
- Visual review: first-review.png and final-review.png inspected, plus original-reference.png. Four states are visible in the final review image.
- 250 measured assertions passed across the two width audits. 32 of 36 control snapshot comparisons match their actual master exactly; all four nested Checkbox instances pass independently. Four Form control label comparisons retain documented expected differences from supported Control INSTANCE_SWAP properties.
- Fresh-file preflight: no libraries were manually added initially; scoped discovery/imports succeeded from available-to-add Design System Rebuild. Akkurat Regular/Bold loaded and the current Text field exposes Fill=None|Paper.

## Findings and recovery

- Nonblocking Card capability limit: no exposed arbitrary form-content swap. A local composition with published controls and library foundations expresses the exercise; source library unchanged. Recorded in OPEN-ISSUES.md as card-form-content-slot, with this run as evidence.
- Strict snapshot outputs remain passed=false because they compare Form control label against its default unchecked child. The two Empty instances differ only in nested child name Checkbox versus Control after the exposed swap. The two Filled instances differ in checked glyph structure, color and binding versus unchecked defaults. Full review has zero omitted differences; actual nested checked/unchecked controls match their respective published masters. No comparator was relaxed.
- The first audit script assumed both nested children were named Control; Empty's exposed swap yielded Checkbox. One read-only audit error was corrected by selecting the direct nested INSTANCE. No canvas changes were caused by the error.
- Intentional visual standardization: generated blue rectangle becomes contained/secondary coral pill Save; Cancel is contained/primary with outlined appearance. Library floating labels and Akkurat replace the source's standalone labels/generic typography. The outer practice caption is excluded as instructed.
- Actions are static. No form persistence, validation, interactive dropdown menu, or played-through prototype is claimed. Actual Button reactions are empty.
- This is a functional MCP test, not an onboarding usability trial or benchmark. Original upload was through MCP; the designer's FigJam-to-Design clipboard path and new-user connection/setup remain untested. Daniel's review remains pending; FigJam's reference-ready wording can be updated after review.
- Timing starts at the first captured clock checkpoint after initial repository/reference reads. Built and firstImage use the same first clock observation after both returned, not exact event instrumentation. Timed interval is not presented as total end-to-end task duration.

## Observable effort

Counts through verification: figmaCalls=unavailable; otherCalls=unavailable; searches=2; technicalRetries=1; canvasCorrections=1; clarificationStops=0; tokens=unavailable.

## Reading

- AGENTS.md; FIRST-RUN.md and supplied PNG
- LIBRARY.md: Efficient execution, Token mappings, Typography, Button, Text field, Other controls and surfaces, API checks by operation
- COMPOSITIONS.md: Rhythm, Edit forms on paper, Actions and section labels, Rows and cards; OPEN-ISSUES consumer/token notes
- Local web-app-v2 source: typography.ts, ButtonOverrides.ts, TextFieldOverrides.tsx, CardOverrides.ts, CardActionsOverrides.ts, CheckboxOverrides.tsx; Code Connect file search found no mapping
- Figma skills: create-new-file, use, generate-design, generate-library and focused component creation/helper guidance

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [final-review.png](final-review.png)
- [original-reference.png](original-reference.png)
- [first-review.png](first-review.png)

One fixed-build run; not evidence of a general speedup.
