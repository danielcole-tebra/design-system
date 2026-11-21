# Patient header · Initial failure without prior allergy information

Added the approved no-prior-information failure example and allergy-only Retry recovery contract. Both failure contexts share the existing 72 px presentation. Next discussion is server-cached allergy data.

[Review section](https://www.figma.com/design/ipK5Vwmpqieg8WeHhiCMJz?node-id=8-126) · File: ipK5Vwmpqieg8WeHhiCMJz

## Timing

Start: 2026-11-21T18:57:18Z. Ready to construct: 2026-11-21T18:58:07.529Z. Construction returned: 2026-11-21T18:58:08.732Z. First image: 2026-11-21T18:58:55.885Z. Verified: 2026-11-21T18:59:09.874Z.

Preparation/discovery: 49.529s; construction: 1.203s; verification after construction: 61.142s. First image elapsed: 97.885s; verified elapsed: 111.874s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- 92 measured assertions pass across seven 1184 px review instances and four 900 px inspection instances.
- All header instances remain 72 px, with exact expected visible content, Akkurat LL, preserved identity/balance and no visible text overflow.
- Both new initial-failure examples have an empty hidden allergy-information property; neither asserts no known allergies.
- New nested Retry Link matches the actual published master, with no structural/token differences.
- Recovery annotation states allergy-only Retry, replacement loading, returned content after success and return to failure on another error.
- Full review and inspection screenshots viewed. Review consists of 47 frames, 60 text nodes and 16 instances; no image-filled nodes.

## Findings and recovery

- DECISION — Daniel, 2026-11-21 approved initial failure + Retry and the basic recovery workflow, resolving the previously pending no-prior-information case.
- Reused failure component, renamed local presentation value from Refresh failed to Failed; existing refresh examples preserve their context labels. No new duplicate failure variant, no nodes deleted.
- Retry remains static; no live request or played-through prototype claimed. Cached-response presentation, duplicate in-flight requests, View All and conflicting flags remain open.
- Verification retry: direct numeric indexing of a query result returned undefined. Read the live nested Retry ID and used that verified ID; no canvas correction was needed.
- Pinned source confirms special cached response status 299 and Tebra-Cache-Date, data/date warning and possible-outdated tooltip. This is not current-production evidence; cached-state design remains pending.

## Observable effort

Counts through verification: figmaCalls=5; otherCalls=unavailable; searches=0; technicalRetries=1; canvasCorrections=0; clarificationStops=0; tokens=unavailable.

## Reading

- Previously loaded Figma use/generate-design skills; current LIBRARY.md Efficient execution/API checks and COMPOSITIONS.md Page patterns.
- Live affected component definitions, review/inspection structure, newly created initial-failure subtree and published Link main.
- Pinned local source: Allergies.tsx, useAllergiesQuery.ts, Error/CachedDataWarning.tsx, types/header.ts and cache constants.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [agreed-states.png](agreed-states.png)
- [900px-check.png](900px-check.png)

One fixed-build run; not evidence of a general speedup.
