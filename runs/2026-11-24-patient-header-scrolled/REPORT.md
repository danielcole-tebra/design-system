# 48 px scrolled patient header at 900 px

Added a separate local 48 px scrolled header family and 900 px comparison with the 72 px full header. Long name, optional patient alert and cached allergies remain visible; avatar, demographics and balance are retained hidden in the scrolled family.

[Review section](https://www.figma.com/design/ipK5Vwmpqieg8WeHhiCMJz?node-id=24-755) · File: ipK5Vwmpqieg8WeHhiCMJz

## Timing

Start: 2026-11-24T20:42:37.291Z. Ready to construct: 2026-11-24T20:44:01.711Z. Construction returned: 2026-11-24T20:44:31.549Z. First image: 2026-11-24T20:44:43.775Z. Verified: 2026-11-24T20:45:16.759Z.

Preparation/discovery: 84.42s; construction: 29.838s; verification after construction: 45.21s. First image elapsed: 126.484s; verified elapsed: 159.468s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- 108 measured assertions passed; four visible published Chip instances match structure and tokens with zero differences.
- All four scrolled variants instantiated: Current, Fetching, Failed, Cached; a fifth sample verifies alert absence.
- Each scrolled instance is 900 × 48. The 43-character name remains untruncated at 20/32; cached summary remains 210 × 36.
- Name row 642 px: 446 px name + 8 px gap + 86 px alert = 540 px, leaving 102 px.
- Cache summary vertically centered with computed 6 px clearance above/below; space/0 vertical padding token resolves to zero.
- Hidden avatar/demographics/balance, visible text bounds, font, name/alert property references, and cache text verified.
- 24 prior header instances retain their original dimensions; 900 × 72 expanded comparison verified.
- Comparison and state screenshots viewed. Editable content, no complete-UI raster or stored reactions.

## Findings and recovery

- Daniel approved this 48 px scrolled exploration on 2026-11-24; the full 72 px header remains available.
- Static comparison only. Scroll activation after the full header leaves view, restoring on return, reserved page space and popover/keyboard behavior are specified, not wired or played through.
- Cloned the existing complete local component set, retained hidden nodes, and restored 33 composition-level property-reference nodes. Published internals were not modified.
- First build rejected a property-reference write to an instance sublayer. Tool reported safe retry; inspection found no retained clone. Corrected to skip nested-instance internals and rebuilt successfully.
- A screenshot-save attempt encountered a reset Node kernel; comparison image was rewritten from the complete returned bytes.
- Wider alert previews, very long names/allergies, sub-900 layouts and full-page sticky behavior remain outside this fit check.

## Observable effort

Counts through verification: figmaCalls=unavailable; otherCalls=unavailable; searches=1; technicalRetries=2; canvasCorrections=0; clarificationStops=0; tokens=unavailable.

## Reading

- Reused loaded figma-use and figma-generate-design skills; read figma-generate-library and component creation guidance.
- LIBRARY.md Efficient execution and API checks by operation; COMPOSITIONS.md Page patterns.
- Prior patient-alert ledger/build and live original component/instance scope.
- Reused verified Tebra assets; scoped search resolved space/0.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [comparison.png](comparison.png)
- [states.png](states.png)

One fixed-build run; not evidence of a general speedup.
