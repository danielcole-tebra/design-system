# Medlist · Running comparison page

Created a running comparison page with the locked original A01 visual baseline at natural size beside the actual editable current medlist. Moved current frame 2:1811 intact so future edits appear directly in the comparison. Added source links, difference register and maintenance/history notes.

[Review section](https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=17-882) · File: yh2F6OUgdI6K0risLtKLEQ

## Timing

Start: 2026-11-14T18:44:37Z. Ready to construct: 2026-11-14T18:47:20Z. Construction returned: 2026-11-14T18:47:32Z. First image: 2026-11-14T18:48:09Z. Verified: 2026-11-14T18:48:15Z.

Preparation/discovery: 163s; construction: 12s; verification after construction: 43s. First image elapsed: 212s; verified elapsed: 218s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- Live source A01 11198:3155 located on eRx medlist page; source render inspected.
- Current 707-node scope fingerprint unchanged before/after moving: hash 250364556, serialized length 494204. Comparison includes geometry, visible flags, paint, bindings, text/font segments and reactions; root canvas location excluded.
- 12 measured checks passed: alignment, natural dimensions, 706 current descendants, baseline lock, image scope, documentation font family, no documentation overflow, no current prototype reactions.
- Full 3030 × 2590 comparison screenshot viewed. Original and current aligned at the top and kept at natural size; differing heights preserved.
- Working screen remains 203 instances and zero image fills. The only raster is the explicitly labelled frozen source reference. Source and SDE links read back.

## Findings and recovery

- Original is a frozen PNG visual reference, not an editable copy. Its source remains linked. The source frame is 1440 × 1631; exported visual bounds are 1446 × 1631 including shadow.
- Current screen stays node 2:1811 and now lives on comparison page 17:881. Existing node links still point to it. Components and prior evidence remain on page 0:1; no nodes deleted.
- Remaining authored layout differences remain unapproved. No product layout changes or source/library modifications were made.
- Reference image is documentation for the explicitly requested source comparison, not a raster replacement for the editable rebuild.
- Future builds edit the same right-hand frame, update affected difference rows and date, append history, and keep the original baseline fixed.

## Observable effort

Counts through verification: figmaCalls=9; otherCalls=unavailable; searches=0; technicalRetries=0; canvasCorrections=0; clarificationStops=0; tokens=unavailable.

## Reading

- LIBRARY.md Efficient execution and API checks by operation; COMPOSITIONS.md Comparison and verification.
- Figma use and generate-design skills; Plugin API index, design-system guidance and relevant gotchas.
- Current medlist provenance register and live original/current node inventories.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [comparison.png](comparison.png)
- [original-a01.png](original-a01.png)

One fixed-build run; not evidence of a general speedup.
