# Patient header · Replace allergy content in place

Updated fetching/refreshing and failed-refresh feedback to replace the existing allergy summary. All states remain 72 px; identity and balance stay visible. Daniel's clarification supersedes prior-content retention.

[Review section](https://www.figma.com/design/ipK5Vwmpqieg8WeHhiCMJz?node-id=2-88) · File: ipK5Vwmpqieg8WeHhiCMJz

## Timing

Start: 2026-11-21T18:49:39.838Z. Ready to construct: 2026-11-21T18:50:19.307Z. Construction returned: 2026-11-21T18:50:21.572Z. First image: 2026-11-21T18:50:46.261Z. Verified: 2026-11-21T18:50:50.472Z.

Preparation/discovery: 39.469s; construction: 2.265s; verification after construction: 28.9s. First image elapsed: 66.423s; verified elapsed: 70.634s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- 83 measured assertions passed across six review and three inspection instances.
- 1184 px review widths and 900 px inspection widths; all headers 72 px tall.
- Effective visibility: loading replaces prior content; failed refresh shows failure message plus Retry; superseded extra rows hidden.
- Identity and balance visible, all visible text within header bounds, Akkurat LL retained.
- Moved Retry remains a published Link instance with zero structural/token differences and no invented prototype destination.
- Review has 40 frames, 50 text nodes, 13 instances and no image fills; full review and 900 px screenshots inspected.

## Findings and recovery

- DECISION — Daniel, 2026-11-21: replace allergy content during fetching/refreshing, without another section; failed refresh uses failure message + Retry. Supersedes earlier retained-content display and 96 px request-state layout.
- No nodes deleted. Existing extra status rows and prior-information text retained hidden; README added to inspection area. Existing current-state examples and approved avatar contrast override preserved.
- New loading/error wording is draft presentation. No-prior-data failure and detailed recovery remain pending; no live query behavior or prototype playthrough claimed.

## Observable effort

Counts through verification: figmaCalls=3; otherCalls=unavailable; searches=0; technicalRetries=0; canvasCorrections=0; clarificationStops=0; tokens=unavailable.

## Reading

- Figma use/generate-design skill guidance and previously loaded relevant references.
- LIBRARY.md Efficient execution and API checks; COMPOSITIONS.md Page patterns; current PATIENT-HEADER-REVIEW.md.
- Live affected variants, review/inspection instances and published Retry main component.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [agreed-states.png](agreed-states.png)
- [900px-check.png](900px-check.png)

One fixed-build run; not evidence of a general speedup.
