# Slim patient search benchmark · run-174404

Built and visually verified one isolated two-state local patient-search family and side-by-side instances. No remaining build issues; stopped for Daniel's read.

[Review section](https://www.figma.com/design/zKT34LQogNjz3Z07fY4VQB?node-id=277-252) · File: zKT34LQogNjz3Z07fY4VQB

## Timing

Start: 2026-10-31T17:44:04Z. Ready to construct: 2026-10-31T17:46:15Z. Construction returned: 2026-10-31T17:46:45Z. First image: 2026-10-31T17:46:55Z. Verified: 2026-10-31T17:48:01Z.

Preparation/discovery: 131s; construction: 30s; verification after construction: 76s. First image elapsed: 171s; verified elapsed: 237s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- New Benchmark/Patient search/run-174404 family has exactly State=Results and State=Empty; both instantiated. Section 277:252, family 277:251, review 277:253. Existing sections preserved.
- Panels are 550px wide, content-height (Results 309px; Empty 188px), with white color/background/paper and space/16 bound to each inset and major gap.
- Five published controls audited with unchanged snapshotControl, compareControlSnapshots and auditControls: all pass, zero differences. Fields small/Default/Filled/Fill=None, 518x40. Rows Lines=Two/Default, 518x72, Show icon=false; horizontal divider 518x1.
- Required fictional copy and visible states checked. Text styles h4/body1/body2 use Akkurat LL; role colors bound to primary/secondary. No font substitution, clipping, images, prototype reactions or added controls.
- Looked at section.png, results.png and empty.png. Labels and all required copy are visible with expected spacing; no corrective canvas pass.
- Only Proposals received writes. Published asset discovery imports used temporary instances, which were removed. No earlier benchmark family/section inspected beyond names and bounds; no SDE or Visit Companion lookup.

## Findings and recovery

- Search/read truncation occurred once: a full retained search result was mistakenly printed and output truncated. Recovered selected keys from the stored complete result without another search. Bounded document MORE pagination is not counted as truncation.
- Technical retry 1: body2 style key was mistyped in construction. Import failed with safeToRetryWithoutCanvasRead=true. Corrected to the exact retained key and retried successfully.
- Technical retry 2: first read-only audit envelope exceeded the self-imposed 12,000-character guard and failed with safeToRetryWithoutCanvasRead=true. Reduced redundant returned text metadata, kept comparator unchanged, reran successfully. No full snapshot tree returned.
- No cross-call import failure, comparator correction, canvas corrective pass, clarification stop or user-input wait. No extra reporting commit planned; prepare evidence/report/log together and commit/push once.
- Helper usage: bounded read.cjs; copied snapshotControl, compareControlSnapshots and auditControls; adapted installed createComponentWithVariants fresh-state construction/grid pattern; file-based record.cjs. Helpers themselves did not fail; the enclosing audit-envelope guard did.
- Whole-view search found Nav/Search and Nav/Bar, unsuitable for the brief. Canonical rhythm and reusable-row recipes applied; no applicable published whole-panel composition selected. Code Connect filename search under sibling design-system package returned no matching files.
- Panel spacing follows the explicit 16px brief. Component internal integer geometry retained. Free text uses explicit-rem h4/body1/body2 values (no pxToRem inflation); no authored rounding introduced.
- One fixed-build repeat only; no conclusion about a general speedup. Exact model token use unavailable.

## Observable effort

Counts through verified checkpoint, leaf tool invocations only (functions.exec orchestration/store/formatting excluded): figmaCalls=14; otherCalls=59; searches=4; technicalRetries=2; canvasCorrections=0; clarificationStops=0; tokens=unavailable.

## Reading

- Active package: AGENTS.md; LIBRARY.md Efficient execution, Token mappings, Typography, Text field, Other controls and surfaces, API checks by operation; COMPOSITIONS.md Scope and reuse, Rhythm, Rows and cards, Search and other adornments; OPEN-ISSUES.md targeted consumer-capabilities, text-field-adornments and token-map-unverified rows. 14 relevant sections/entries counting AGENTS.md as one.
- Three installed skills fully paginated: figma-use, figma-generate-library, figma-generate-design. References: Plugin API index first bounded page and targeted typings symbols, working-with-design-systems/wwds.md, gotchas canonical text-edit recipe, component-creation Variant Matrix. Indexes used to select relevant reference content.
- Helper source/template: tools/builder/helpers.cjs, record.example.json; installed createComponentWithVariants.js. record.cjs inspected after verification for recording. LOG.md tail 2 lines only for append; no older benchmark reports or logs read.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [section.png](section.png)
- [results.png](results.png)
- [empty.png](empty.png)

One fixed-build run; not evidence of a general speedup.
