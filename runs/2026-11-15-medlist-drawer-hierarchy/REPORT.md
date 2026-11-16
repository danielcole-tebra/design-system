# Medlist · Drawer hierarchy and divisions

Refined G's shared medication drawer into a shaded medication summary, divided prescription facts and a separate pharmacy section. Larger medication/directions typography and aligned label/value rows make the information hierarchy explicit. All11 placed drawers updated; ready for Daniel's visual review.

[Review section](https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=104-8366) · File: yh2F6OUgdI6K0risLtKLEQ

## Timing

Start: 2026-11-16T04:16:50.000Z. Ready to construct: 2026-11-16T04:18:53.000Z. Construction returned: 2026-11-16T04:19:43.000Z. First image: 2026-11-16T04:19:47.000Z. Verified: 2026-11-16T04:20:32.000Z.

Preparation/discovery: 123s; construction: 50s; verification after construction: 49s. First image elapsed: 177s; verified elapsed: 222s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- Five native component structure/token comparisons and220 measured assertions pass with zero differences/failures. All11 actual placed drawers enumerated from the live consuming page.
- All medication data, status/source/compound markers, visible action labels and close reactions are preserved. Only the redundant Supply section heading is hidden; supply facts are grouped within Prescription. Its previous heading/wrapper is retained.
- Summary uses bound grey.300 with24 px vertical and16 px horizontal inset. Medication name uses h3 Bold20/32 and directions body1 Regular16/24. Prescription and Pharmacy section headings use h4 Bold16/24; facts use body2 Regular14/20 with muted labels.
- Five fact rows use518 total width,148 label,16 gap and354 value. Prescription provenance and supply facts have an internal divider; full-width dividers separate summary, prescription and pharmacy. No visible clipping; all drawer text Akkurat LL.
- Shell remains550×1156, header72, clipped vertical body1012 at y73, footer71 at y1085. Modal backdrop, footer controls, table/filter layout and reconciliation mode are unchanged.
- Open context, compound and patient-reported/send-failed screenshots saved and viewed. New hierarchy works with both optional marker states and the longest supplied medication name/directions.
- Shared local master104:7574 now has70 editable descendants:19 frames,26 texts,13 instances,7 vectors and5 rectangles; zero image-filled nodes. Five new layout/divider nodes; affected-ID ledger in state.json. Source SDE, original medication studies and library untouched.

## Findings and recovery

- DECISION · Owner Daniel · Scope G drawer body only ·2026-11-15 · Requested clearer hierarchy/divisions implemented, visual acceptance pending. This revises the earlier equal-weight stack of Identity, Directions, Prescription, Supply and Pharmacy; it preserves the latest Alpha shell behavior and the confirmed reconciliation semantics.
- The body uses three visible groups: medication summary, prescription facts and pharmacy. Directions are inside the summary; supply facts are inside Prescription. Native controls remain unchanged. This is a project-local composition revision, not a new published component or global SDE rule.
- Two construction attempts returned safeToRetryWithoutCanvasRead=true with edits uncommitted. The Pharmacy name lookup had selected a hidden nested status text instead of the section, producing a negative insertion index. Replaced it with the exact section ID104:7619; the successful build passed all checks. One initial read also exceeded the response limit and was narrowed without mutation.
- The expected sibling design-system source path remains absent. Existing imported controls, styles and bound tokens supplied all required assets; no new library gap is established. Stored reactions were checked; no presentation playback or new clinical action behavior is claimed.
- One coherent batch complete; stop for Daniel's visual read before further design changes. Timing begins at the observed preparation clock; successful push/completion is reported in final chat.

## Observable effort

Counts through verification: figmaCalls=unavailable; otherCalls=unavailable; searches=0; technicalRetries=3; canvasCorrections=0; clarificationStops=0; tokens=unavailable.

## Reading

- AGENTS.md; LIBRARY Efficient execution, API checks, Token mappings and Typography; COMPOSITIONS Sidesheet/body, Rhythm and Rows; current Medlist SPEC and previous Alpha/source evidence.
- Figma use and generate-design skills; API index, design-system guidance, relevant gotchas and child insertion typings. Live drawer master/11-instance inventory, existing styles and pre-change content/reaction snapshot.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [open.png](open.png)
- [compound.png](compound.png)
- [reported.png](reported.png)

One fixed-build run; not evidence of a general speedup.
