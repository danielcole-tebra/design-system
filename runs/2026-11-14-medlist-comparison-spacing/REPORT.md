# Medlist · Comparison B spacing and overflow provenance

Updated Comparison B only with the compact row spacing and grouped actions across ten rows. All information remains visible; progressive disclosure is excluded. Verified the existing filled-circle overflow asset and documented its selection as under review.

[Review section](https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=23-881) · File: yh2F6OUgdI6K0risLtKLEQ

## Timing

Start: 2026-11-15T01:10:26Z. Ready to construct: 2026-11-15T01:11:31Z. Construction returned: 2026-11-15T01:12:21Z. First image: 2026-11-15T01:12:57Z. Verified: 2026-11-15T01:13:10Z.

Preparation/discovery: 65s; construction: 50s; verification after construction: 49s. First image elapsed: 151s; verified elapsed: 164s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- All ten live Comparison B rows use local spacing master 52:2511 based on the previously reviewed compact row 28:837.
- 125 measured assertions and four native control comparisons passed. Exact visible content equals the archived prior B for all ten medications.
- Vertical padding 8 px, related gaps 4 px, secondary metadata 12/16; names and full directions retain 14/20. Primary action, optional timeline and overflow share one 196 px column with 8 px gaps. Selection, review and action controls share a centerline.
- First row 143 → 81 px; row range 77–109 px. B screen 1766 → 1428 px high; rail resized to content height. Existing header and other compositions unchanged.
- No progressive disclosure nodes or interactions added. Full directions, date/source, supply and pharmacy details remain visible.
- All ten overflow controls match their pre-update structure, geometry, paints and bindings. Imported Icon/EllipsisFilled key 67478695fcdf236a2d455730901934c0c49eb9e6; small/default Icon button key e073fb6fa591240262a53206f29e6343d81ca5e3.
- Overflow button 34×34; icon slot 18×18; filled disc approximately 15×15; bound color/grey/600 is #545454. Imported master is a filled circle with horizontal dots knocked out.
- Full Comparison B and comparison-board screenshots viewed. No clipping or visible row overflow; visible row text uses Akkurat LL.
- Original A01 reference remains 1446×1631, working screen remains 1766 px high on its original page, prior disclosure studies unchanged. Before-B retained as archive52:2451.

## Findings and recovery

- DECISION · Owner Daniel; scope Comparison B row spacing; status applied as requested, evidence 2026-11-14. Latest request scopes this update to B, which now intentionally differs from the original-page working screen. Reconcile that divergence before a future copy refresh.
- DECISION · Owner Daniel; scope medlist overflow presentation; status under review, nonblocking. The filled-circle glyph and small/default variant were an authored selection, not verified original/SDE equivalence. Native size/color fidelity does not approve that choice. No glyph replacement, recoloring or resizing in this batch.
- Icon source description attributes the glyph to packages/design-system/src/components/icons/EllipsisFilledIcon.tsx. The expected sibling code directory is absent in this workspace, so this is verified imported-library provenance, not a fresh code audit.
- All old nodes preserved. Empty former overflow-column wrappers retained hidden; pre-update screen retained with an archive README. No library source modified.

## Observable effort

Counts through verification: figmaCalls=7; otherCalls=unavailable; searches=0; technicalRetries=0; canvasCorrections=0; clarificationStops=0; tokens=unavailable.

## Reading

- LIBRARY.md index, Efficient execution, Icon button and API checks; COMPOSITIONS.md Rows and cards.
- Figma use/generate-design skills and previously loaded generate-library guidance.
- Live Comparison B, compact row master, imported Icon button/EllipsisFilled, grey.600 variable and comparison notes; row-density report and build.
- Expected sibling code path checked; not present.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [comparison-b.png](comparison-b.png)
- [comparison-board.png](comparison-board.png)

One fixed-build run; not evidence of a general speedup.
