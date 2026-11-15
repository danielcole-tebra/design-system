# Medlist · Comparison C with single-line disclosure rows

Removed timeline access from the current row study and added Comparison C beside A and B. C uses the existing page shell with ten single-line rows; first and issue rows start expanded beneath matching headers.

[Review section](https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=73-3815) · File: yh2F6OUgdI6K0risLtKLEQ

## Timing

Start: 2026-11-15T02:40:04.834Z. Ready to construct: 2026-11-15T02:41:23.109Z. Construction returned: 2026-11-15T02:41:46.424Z. First image: 2026-11-15T02:41:56.456Z. Verified: 2026-11-15T02:42:57.470Z.

Preparation/discovery: 78.275s; construction: 23.315s; verification after construction: 71.046s. First image elapsed: 111.622s; verified elapsed: 172.636s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- Ten native component comparisons and 166 measured assertions passed.
- All ten medications preserve the exact complete B text in expanded state, plus the disclosure action; date and quantity remain visible when collapsed. All ten variant roundtrips preserve copy.
- Shared 1216 px table grid 44/360/112/136/208/80/276. Fixed action x positions 948/1052/1164. Collapsed rows 59 px; displayed expanded rows 103 px.
- Duration, pharmacy and phone each fit one 16 px line across all ten expanded cases. No measured row/header overflows; visible row text uses Akkurat LL.
- Timeline label/caret hidden in both local variants, all eight existing specimens, and all ten C rows. Preserved nodes rather than deleting.
- C is 1440×1260; A and B positions and dimensions match before. Working screen remains 1440×1766 on original page. B remains 1440×1428.
- Three screenshots inspected: C screen, full comparison board, current row study.
- Editable C screen has1490 descendants including391 instances,464 frames,177 vectors,457 text nodes,1 rectangle; zero image fills. Counts include preserved hidden prior table.
- Details CHANGE_TO destination47:1577 and Hide details destination47:1541 verified. Presentation playback not performed.

## Findings and recovery

- DECISION · Owner Daniel; scope current single-line row study and new Comparison C; status applied2026-11-14. Hide timeline label and caret for now; supersedes previous timeline placement under Actions in this version only.
- Comparison C reuses B's existing shell and current row set47:1540. This does not approve or change previously documented shell differences. C starts with Alprazolam and Acetaminophen details open to illustrate mixed states.
- C's local row instances remain linked to the original-page row set; its page shell is a separate copy. Maintain A, B and C as distinct comparisons. Old cloned table nodes remain hidden within C; no deletions.
- Benchmark clock begins after initial skill/git preparation. Reported phase elapsed is tracked construction-batch time, not a claim covering unrecorded initial preparation.

## Observable effort

Counts through verification: figmaCalls=10; otherCalls=unavailable; searches=0; technicalRetries=0; canvasCorrections=0; clarificationStops=0; tokens=unavailable.

## Reading

- LIBRARY.md Efficient execution and API checks; COMPOSITIONS.md Rows and cards and Comparison and verification.
- Figma use/generate-design skills; existing row study, B shell/table content, native header/control definitions and prior audit helper.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [comparison-c.png](comparison-c.png)
- [comparison-board.png](comparison-board.png)
- [row-study.png](row-study.png)

One fixed-build run; not evidence of a general speedup.
