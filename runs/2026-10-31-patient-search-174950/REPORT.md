# Slim patient search benchmark · run-174950

Built and verified one isolated Results/Empty patient-search family and side-by-side instances. No remaining build issues; stopped after this section for Daniel's read.

[Review section](https://www.figma.com/design/zKT34LQogNjz3Z07fY4VQB?node-id=281-343) · File: zKT34LQogNjz3Z07fY4VQB

## Timing

Start: 2026-10-31T17:49:50Z. Ready to construct: 2026-10-31T17:52:43Z. Construction returned: 2026-10-31T17:52:49Z. First image: 2026-10-31T17:53:13Z. Verified: 2026-10-31T17:55:54Z.

Preparation/discovery: 173s; construction: 6s; verification after construction: 185s. First image elapsed: 203s; verified elapsed: 364s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- Both 550px content-height paper panels; 16px bound padding/gaps; 518px content width.
- Small outlined Filled/Paper library fields with exact labels/values; two Two-line List/Item rows with hidden icons; library Divider.
- h4/body1/body2 styles and primary/secondary/paper/space tokens verified; Akkurat LL throughout visible text.
- auditControls passed 10 instances against actual main components with zero structural/token differences; internals preserved.
- No clipped visible text, raster UI nodes or reactions. Results, Empty and assembled section screenshots downloaded and visually inspected.

## Findings and recovery

- No remaining GAP, DEFECT or DECISION blocking this brief.
- Two output truncations occurred (tool discovery and asset search); retained search recovered without repeated query.
- Three technical recovery/retry sequences: audit envelope compaction, missing local Results image recovery, Empty screenshot timeout retry. Zero canvas corrective passes; comparator unchanged; no cross-call import failure.
- Helpers used: bounded read.cjs, createComponentWithVariants, snapshotControl, compareControlSnapshots, auditControls, file-based record.cjs. Full audit trees remained inside Figma.
- 20 active-package sections read (counting rule in record.json); 3 mandatory skills read in full. Initial Code Connect glob found no matching TextField/List/Divider files.
- Counts are actual underlying tool invocations through verified checkpoint; functions orchestration/wait wrappers excluded. Search count includes 1 asset batch (11 queries), 3 local rg searches and 3 tool-metadata searches.
- Exact token usage unavailable. One fixed-build repeat; no general speedup claim. No extra reporting commit planned.

## Observable effort

Counts through verified checkpoint (2026-10-31T17:55:54Z); underlying calls only: figmaCalls=14; otherCalls=75; searches=7; technicalRetries=3; canvasCorrections=0; clarificationStops=0; tokens=unavailable.

## Reading

- AGENTS.md in C:/Code/design-system, before git pull; clean master, starting commit recorded.
- LIBRARY.md: Efficient execution; Token mappings; Typography; Text field; Other controls and surfaces; API checks by operation.
- COMPOSITIONS.md: Scope and reuse; Rhythm; Rows and cards; Search and other adornments; Edit forms on paper.
- OPEN-ISSUES.md current whole file: consumer-capabilities, text-field-adornments, token-map-unverified relevant; no historical lookup.
- Installed figma-use, figma-generate-design and figma-generate-library skills read in full via bounded pages.
- API index and working-with-design-systems overview; targeted gotchas text-edit recipe, variable bindings, text-style application, instance usage and API type signatures; component-creation index.
- Helper source/template: createComponentWithVariants.js; helpers.cjs snapshot/comparison/audit functions; record.example.json and record.cjs. LOG.md last 3 lines only for append context.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [section.png](section.png)
- [results.png](results.png)
- [empty.png](empty.png)

One fixed-build run; not evidence of a general speedup.
