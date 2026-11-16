# Medlist five-column outpatient trial

Added a separate five-column trial to the latest non-drawer page: medication and directions, prescriber/source, labeled last activity, order status and actions. Supply/pharmacy expand inline; reconciliation uses a separate mode. Original F and drawer preserved. Awaiting Daniel's visual review.

[Review section](https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=137-25480) · File: yh2F6OUgdI6K0risLtKLEQ

## Timing

Start: 2026-11-16T15:47:12Z. Ready to construct: 2026-11-16T15:51:03Z. Construction returned: 2026-11-16T15:52:20.404Z. First image: 2026-11-16T15:52:34Z. Verified: 2026-11-16T15:58:12Z.

Preparation/discovery: 231s; construction: 77.404s; verification after construction: 351.596s. First image elapsed: 322s; verified elapsed: 660s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- All three screens are editable 1440×1332 compositions; five-column grid 420/160/160/200/276 at table width1216. Review mode reserves44 px from Medication for native checkboxes.
- Instantiated all six new local variants and retained ten content-roundtrip specimens. 296 assertions passed; all54 visible stored reaction targets resolve. No visible table overflow; table fonts Akkurat LL.
- Eleven affected native control comparisons passed with zero structure/token differences; seven measured audit assertions passed.
- Viewed normal, reconciliation, completed, expanded-detail and six-variant screenshots. Viewed isolated review-mode source row after binding source text across all six variants.
- Source F screen and row set were unchanged at construction. No library, drawer or comparison edits.

## Findings and recovery

- DECISION — Daniel owns trial preference; scope latest non-drawer page; status built for review, evidence2026-11-16. This trial locally supersedes hidden directions/always-visible quantity/review choices; it does not replace the prior F handoff.
- Preserved supplied Melatonin fixture containing Patient-reported supplement, named prescriber, Prescribed date and Send failed. Its source/order semantics need a product data decision; no inferred correction. Ten of12 medications are supplied; pagination remains a fixture.
- Stored prototype wiring is verified, not played-through presentation, backend persistence or validation. Complete navigates to a completed fixture without a defined threshold. Existing Edit/Resend/View issue/overflow and pagination flows remain outside this layout trial.
- Inherited Nav/Search Inter placeholder and local patient-header provenance remain documented limitations; no new library defect established. Expected sibling component source was unavailable, so no fresh source-code audit is claimed.
- Fixed duplicated pharmacy heading and bound source-note text consistently across six local variants. Initial captures retained; final detail and source-row captures show corrected content.
- Technical recovery: one broad read failed; a duplicate flow-start rejection and oversized response caused two rolled-back construction attempts. Used deduplicated starts and lossless compressed created-ID ledger. No destructive cleanup.
- Timing begins at the first recorded clock checkpoint after initial context/skill preparation, not at message arrival. Total measured interval is reported in final chat.

## Observable effort

Counts through visual verification and artifact recording: figmaCalls=unavailable; otherCalls=unavailable; searches=unavailable; technicalRetries=3; canvasCorrections=2; clarificationStops=0; tokens=unavailable.

## Reading

- AGENTS.md; LIBRARY Efficient execution/API checks/Button/Other controls; COMPOSITIONS Rows/cards and Actions/labels; linked table-header OPEN-ISSUES.
- figma-use and figma-generate-design skills in full; relevant API reference and text-edit gotcha; whole-view library search and consuming-file native properties.
- Latest non-drawer source, original row definitions and current screen register. Source evidence saved in source.json.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [list-verified.png](list-verified.png)
- [review-verified.png](review-verified.png)
- [review-source.png](review-source.png)
- [completed.png](completed.png)
- [details-final.png](details-final.png)
- [variants-final.png](variants-final.png)
- [list.png](list.png)
- [review.png](review.png)
- [details.png](details.png)
- [variants.png](variants.png)
- [review-final.png](review-final.png)

One fixed-build run; not evidence of a general speedup.
