# Medlist · Progressive disclosure row study

Built an isolated review-first disclosure study with collapsed and expanded local row variants. Daniel selected prioritizing medication review and issue detection. Full directions, source/compound labels, status, review and contextual action remain visible; prescribing, supply, pharmacy and timeline access are disclosed inline. Working screen and full-page comparison remain unchanged.

[Review section](https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=34-1391) · File: yh2F6OUgdI6K0risLtKLEQ

## Timing

Start: 2026-11-14T21:34:08Z. Ready to construct: 2026-11-14T21:36:48Z. Construction returned: 2026-11-14T21:37:32Z. First image: 2026-11-14T21:37:47Z. Verified: 2026-11-14T21:39:59Z.

Preparation/discovery: 160s; construction: 44s; verification after construction: 147s. First image elapsed: 219s; verified elapsed: 351s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- Two new local disclosure variants instantiated and rendered; six specimens on review board plus two retained expanded inspection specimens.
- 43 measured assertions passed: all source text recoverable, full directions and issue status visible, supporting phone hidden by default, fixed summary columns, Akkurat 14/20 primary text, no visible overflow and valid disclosure destinations.
- Six native controls compared to their actual imported masters with zero structural/token differences (checkbox, switch, action, chip and both disclosure buttons).
- Four programmatic Collapsed → Expanded → Collapsed roundtrips preserved source data, status and primary action. This verifies variant-state behavior, not a played-through prototype.
- First row is 61 px collapsed / 157 expanded. Compound 89 / 185; patient-reported 81 / 177; patient-info-required 61 / 157.
- Final screenshot inspected. Board contains 144 text, 91 frame, 108 instance and 48 vector descendants; zero raster nodes.
- Working screen remains on original page 0:1 at 1440 × 1766.

## Findings and recovery

- DECISION: Daniel chose review current medications and spot issues; disclose prescribing and pharmacy details. Proposal is not applied to full working list.
- Details/Hide details use explicit CHANGE_TO actions between variants. Checkbox, review and contextual actions remain separate. Native Edit/Resend/View issue and overflow/timeline retain their original static scope.
- Prototype click-through in presentation view was not performed; no claim of complete behavior for other actions or keyboard/ARIA semantics.
- Two safe-to-retry tool errors: clearing property references before component parenting; then stale property suffixes after combining variants. Corrected parenting and resolved actual instance keys.
- Visual/structural fixes: captions inherited hidden visibility; review wrapper changed width on axis conversion; alternate local status variants retained old text width. Corrected only new proposal scope, with no library or working-screen changes.
- Original A01 baseline and existing comparison copy are unchanged. No nodes deleted. Inspection specimens retained.

## Observable effort

Counts through verification: figmaCalls=14; otherCalls=unavailable; searches=0; technicalRetries=2; canvasCorrections=2; clarificationStops=0; tokens=unavailable.

## Reading

- Previously loaded Figma use/generate-design/generate-library skills; component variant/reaction API references and variant helper.
- LIBRARY.md Button and API checks; COMPOSITIONS.md Actions and section labels.
- Live compact row master, source samples, native button properties, local status and review control APIs.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [disclosure-review.png](disclosure-review.png)
- [before-fix.png](before-fix.png)

One fixed-build run; not evidence of a general speedup.
