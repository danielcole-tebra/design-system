# Final builder execution changes

Implemented the three requested changes before one final fresh-context build. No additional tuning will follow that build in this task.

1. `search.cjs` provides a complete search runner: it calls the supplied tool, retains the raw result, and returns automatically bounded candidate pages. It uses the current observed component/variable/style schemas, reports unknown schemas explicitly, and selects exact retained keys without retyping. `auditEvidence` combines the structural audit and measured actual/expected assertions into one automatically compacted return envelope; checked/failed/omitted totals survive compaction. `bundle.cjs` emits self-contained search, audit or inspection functions so agents need not reconstruct wrappers.
2. AGENTS.md explicitly forbids deleting self-created inspection/scratch instances. Imported masters can supply definitions; required inspection instances remain in a named Inspection area outside the review section. `retainInspectionInstance` provides this behavior without removal or cleanup logic.
3. The document reader now defaults to 16,000 characters, adjustable from 1,000 to 24,000 to fit output capacity. Complete required skills may be read in one adequately budgeted call; tiny pagination is no longer mandatory. The section index and exact continuation offsets remain.

Validation: `node --test tools/builder/helpers.test.cjs tools/builder/io.test.cjs tools/builder/search.test.cjs` passed all 24 tests. Coverage includes compacting a 1,000-failure audit, preserving failure totals, retaining inspection instances, exact larger document reads, all supported search asset types, malformed schemas, retained-result paging and independently executable bundles.

A read-only Figma search verified the response schema for Text field, paper and h4 (session b8e16ecd-e4cd-4343-8ad6-826655914107). The wrapper processed that captured real response into 3,650 characters: 12 candidates shown from 32 retained matches, with counts and exact keys. No Figma nodes were created, changed or deleted in this implementation batch. No screenshot applies.

The separate final build will test integration. These local checks do not claim a measured speed improvement. SDE, component values and the four-file startup package remain unchanged in scope.
