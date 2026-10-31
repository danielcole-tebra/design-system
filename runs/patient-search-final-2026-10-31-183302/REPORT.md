# Final wrapper benchmark · Patient search · run-183302

Built a new isolated family with Results and Empty static states and one instance of each. All 57 measured assertions and five library structure/token comparisons pass; all three screenshots inspected. One fixed-build repeat, not evidence of a general speedup.

[Review section](https://www.figma.com/design/zKT34LQogNjz3Z07fY4VQB?node-id=285-434) · File: zKT34LQogNjz3Z07fY4VQB

## Timing

Start: 2026-10-31T18:33:02Z. Ready to construct: 2026-10-31T18:34:35Z. Construction returned: 2026-10-31T18:35:08Z. First image: 2026-10-31T18:35:15Z. Verified: 2026-10-31T18:36:45Z.

Preparation/discovery: 93s; construction: 33s; verification after construction: 97s. First image elapsed: 133s; verified elapsed: 223s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- Both panels 550 px wide; Results 309 px and Empty 188 px content height.
- Paper fill and 16 px padding/gaps bound to verified published tokens.
- Small outlined filled Text field with exact label/value, no helper/select/required/multiline.
- Two two-line List/Item instances with icons hidden, 518 px width, unchanged internals; library Divider 518 px.
- Exact rendered text, h4/body1/body2 styles and semantic text fills; Akkurat LL fonts.
- No clipped rendered text, reactions or image fills. Semantic review hierarchy: 65 descendants (11 INSTANCE, 27 TEXT, 23 FRAME, 4 VECTOR).
- Viewed section.png, results.png and empty.png; no overlap, clipped labels or placeholder content.
- Original sections inspected only for top-level names/bounds; additive build; source library and Composition System not edited.

## Findings and recovery

- No remaining build GAP or DEFECT. No clarification stops or user-input wait.
- One run-local assertion correction: library Text field includes a visible=true Gap sizer text with empty fills. Initial text assertions counted it; corrected rendered-text filtering excludes unpainted text. Shared comparator/wrappers unchanged. No canvas correction.
- Output truncation occurred in five preparation responses: broad tool metadata, combined mandatory skills, design skill response, Plugin API index, combined gotchas/component reference. Targeted continuation reads recovered required content. No Figma search or audit transport truncation occurred; wrappers intentionally bounded previews.
- Search wrapper retained all 94 candidates across 11 intents; initial preview showed 33 and omitted 61. Three retained-result page reads retrieved needed typography keys; no search rerun. Audit bounded preview omits 27 passing assertion rows, with all totals/failures retained.
- No cross-call import failure, no tool-error retry, no extra reporting commit. No inspection instances were necessary or created. One audit rerun after assertion correction.
- Required helper usage: read.cjs (adjustable reads), bundle.cjs createSearchRunner and auditEvidence, installed createComponentWithVariants helper, record.cjs saved-file writer. No helper, wrapper or shared-document tuning.
- Code Connect file-name search for TextField/List/Divider under sibling web-app-v2/packages/design-system returned no matches. Canonical composition guidance reused for rhythm and contiguous reusable rows; no suitable whole-view library composite. Nav/Search inspected as the strongest whole-view search candidate and rejected for this purpose.
- Exact runtime token usage unavailable. No historical implementation/report lookup; only LOG.md tail of four lines read to append.

## Observable effort

Counts through verified checkpoint (inclusive); leaf tool invocations only; functions.exec orchestration and in-memory tool-schema filtering excluded: figmaCalls=13; otherCalls=58; searches=1; technicalRetries=0; canvasCorrections=0; clarificationStops=0; tokens=unavailable.

## Reading

- AGENTS.md complete; starting master commit 0932c8f3920046a0b4c30e6414579b420f48dc33; pull already up to date; initial working tree clean.
- LIBRARY.md: Efficient execution, Token mappings, Typography, Text field, Other controls and surfaces, API checks by operation.
- COMPOSITIONS.md: Scope and reuse, Rhythm, Rows and cards, Search and other adornments.
- OPEN-ISSUES.md: consumer-capabilities, text-field-adornments, token-map-unverified.
- 14 active-package units counted: AGENTS as one, six LIBRARY sections, four COMPOSITIONS sections, three issue rows; three reference indexes separately.
- Three mandatory complete skills: figma-use, figma-generate-design, figma-generate-library. Scoped references: Plugin API index/types, wwds, gotchas, component-creation; installed variant helper.
- LOG.md last four lines only for append context.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [section.png](section.png)
- [results.png](results.png)
- [empty.png](empty.png)

One fixed-build run; not evidence of a general speedup.
