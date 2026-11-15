# Medlist · Single-line disclosure proposal

Created a separate single-line row proposal. Full directions move into expanded Details; medication name, inline compound/source markers, status, review and grouped actions stay visible.

[Review section](https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=47-1675) · File: yh2F6OUgdI6K0risLtKLEQ

## Timing

Start: 2026-11-15T01:03:47Z. Ready to construct: 2026-11-15T01:04:10Z. Construction returned: 2026-11-15T01:04:50Z. First image: 2026-11-15T01:04:59Z. Verified: 2026-11-15T01:06:12Z.

Preparation/discovery: 23s; construction: 40s; verification after construction: 82s. First image elapsed: 72s; verified elapsed: 145s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- Five native control master checks and 98 measured assertions passed.
- All four collapsed examples are one line and 59 px high; all four expanded examples are 191 px. Native control dimensions determine minimum row height.
- All eight examples preserve prior content, with directions hidden only when collapsed. Four programmatic variant roundtrips preserve summary content and reveal the exact directions.
- Primary action, Details and overflow retain 8 px gaps. Medication text, status and controls share the vertical centerline. No visible overflow at the tested 1216 px width.
- Expanded text equals previous expanded text for all four medications. Disclosure destinations point to the new variants.
- Corrected final proposal screenshot viewed; compound/source markers remain inline. Working screen and earlier studies untouched.

## Findings and recovery

- DECISION · Daniel requested this single-line exploration, owner Daniel, scope medlist rows, evidence 2026-11-14; status proposal, not applied to working list or full-screen comparison.
- Initial screenshot and audit exposed inherited stretch sizing on medication names. Removed stretch on four local text nodes; final screenshot and all assertions pass. No library internals changed.
- 59 px row includes the native 42 px checkbox, 8 px top/bottom padding and 1 px divider. It is primarily a reduction in visible information; the previous basic row was 61 px.
- Stored CHANGE_TO wiring and programmatic roundtrips verified. Presentation playback and other product actions not claimed.
- Only current 1216 px row width and four supplied medication cases verified; responsive behavior for arbitrary longer medication names remains outside this proposal.

## Observable effort

Counts through verification: figmaCalls=7; otherCalls=unavailable; searches=0; technicalRetries=0; canvasCorrections=1; clarificationStops=0; tokens=unavailable.

## Reading

- Live current disclosure set, board, eight samples and available canvas space.
- LIBRARY.md Efficient execution and API checks; COMPOSITIONS.md Rows and cards; Figma use/generate-design/generate-library skills previously loaded.
- Current medlist register, prior disclosure build/state and action-spacing audit helper.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [single-line.png](single-line.png)

One fixed-build run; not evidence of a general speedup.
