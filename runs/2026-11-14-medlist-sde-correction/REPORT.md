# Medlist · SDE header correction and provenance review

Replaced the invented patient header with a faithful local mirror of the exact SDE Updated 11/13 reference. The source master is not cross-file importable. All 34 mirrored nodes match the compared source structure/presentation; the actual Jane Doe instance passed 21 measured assertions. Daniel requested leaving other authored compositions unchanged and documenting them for review; they are explicitly unapproved, not declared verified by the primitive audit.

[Review section](https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=2-1811) · File: yh2F6OUgdI6K0risLtKLEQ

## Timing

Start: 2026-11-14T18:26:41Z. Ready to construct: 2026-11-14T18:32:28.284Z. Construction returned: 2026-11-14T18:32:54Z. First image: 2026-11-14T18:33:13Z. Verified: 2026-11-14T18:39:32Z.

Preparation/discovery: 347.284s; construction: 25.716s; verification after construction: 398s. First image elapsed: 392s; verified elapsed: 771s. Actual input wait: 112.982s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- Exact source page 1319:4655, visible screen 1319:4656 and header I1319:4659;974:16288 inspected; source screen screenshot viewed.
- 34-node source/mirror comparison: zero differences in hierarchy, type, names, visible dimensions, layout, typography, paints and token bindings. Root identity and stale hidden geometry explicitly excluded.
- Actual patient header 1440 × 68 at y65: 21 measured assertions passed; no content beyond parent bounds and no reactions.
- Source-specific Avatar text ink, 14/20 Link typography and strokesIncludedInLayout=false copied and verified.
- Final SDE mirror and full medlist screenshots inspected. Header is editable native/text/layout structure, not an image.
- Full live screen inventory: 706 descendants, 203 instances, zero image-filled nodes and zero unresolved masters.
- Chart workspace remains 1440 × 1633; remaining first-batch compositions were documented, not redesigned.

## Findings and recovery

- Corrected: previous patient header was an authored composition, not a verified SDE reuse. Old instance and master retained and marked superseded.
- Source master key 06bddbc3ab5ce64fe2563d499652e204d6902115 could not be imported. Replacement is an explicitly labelled local mirror with native Avatar/Link/Attention descendants; it is not published or linked back to SDE.
- Remaining unapproved compositions: chart rail; title/copy; gutter and missing paper elevation; toolbar proportions; reconciliation layout; table columns/headings; row density and metadata typography; status icon removal/text presentation; timeline placement. Current authoritative details are in SPEC.md.
- Verified native control provenance is distinguished from unapproved composition. Four first-batch local families remain unapproved: toolbar, reconciliation, medication row, order/pharmacy.
- Phone, MRN and balance are dashes because A01 lacks explicit values. The old collect-payment action was not treated as evidence of a balance.
- The approved SDE header has no old action row or patient-alert count. No new arrangement was invented for those features; original context remains archived. Static View all does not claim a functional allergy flow.
- SDE source, Design System Rebuild and eRx Concepts were not modified. No SDE historical issue was reopened.

## Observable effort

Counts through verification: figmaCalls=unavailable; otherCalls=unavailable; searches=0; technicalRetries=unavailable; canvasCorrections=unavailable; clarificationStops=1; tokens=unavailable.

## Reading

- AGENTS.md; LIBRARY.md Efficient execution and API checks; COMPOSITIONS.md source provenance and page patterns.
- Previously loaded Figma use/generate-design/generate-library skills and current exact Plugin API references.
- Live SDE Updated 11/13 reference and source overrides, live A01 composition geometry, full live target component inventory.
- Previous medlist build scripts, comparison evidence and source row data.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [current-medications.png](current-medications.png)
- [sde-header-mirror.png](sde-header-mirror.png)
- [sde-reference.png](sde-reference.png)
- [mirror-before-fix.png](mirror-before-fix.png)
- [screen-before-fix.png](screen-before-fix.png)

One fixed-build run; not evidence of a general speedup.
