# Patient header · Pronouns in the lower demographics row

Moved pronouns after MRN in the lower demographics row across all four header variants. Preserved text/visibility controls and 72 px height; the separator hides with pronouns.

[Review section](https://www.figma.com/design/ipK5Vwmpqieg8WeHhiCMJz?node-id=2-88) · File: ipK5Vwmpqieg8WeHhiCMJz

## Timing

Start: 2026-11-21T20:18:19Z. Ready to construct: 2026-11-21T20:20:17.248Z. Construction returned: 2026-11-21T20:20:21.046Z. First image: 2026-11-21T20:20:55.456Z. Verified: 2026-11-21T20:21:22.526Z.

Preparation/discovery: 118.248s; construction: 3.798s; verification after construction: 61.48s. First image elapsed: 156.456s; verified elapsed: 183.526s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- 164 measured assertions passed across sixteen affected existing instances and four retained hidden-pronoun checks.
- All four variants show the patient name alone in the upper row. Visible pronouns align with the lower demographics row after MRN.
- Existing Pronouns text and Show pronouns boolean references preserved. When false, both pronouns and the added separator are effectively hidden.
- All headers remain 72 px; the 533 px sample lower row fits within the identity area at 900 and 1184 px. Demographic content and Akkurat LL preserved.
- Published Retry Link integrity check passes with zero structural/token differences. Header state content inspected in screenshots; no prototype wiring changed.
- Full review, existing 900 px checks, four hidden-pronoun examples and cropped header screenshot viewed.

## Findings and recovery

- DECISION — Daniel, 2026-11-21 requested pronouns in the lower row with MRN and other details, superseding prior name-row placement in this working file.
- All original pronoun and demographic nodes were moved, not deleted. Four lower-row containers and optional separator groups were added; inspection instances retained.
- This validates the selected sample at the two authored widths; it does not settle broader long-content overflow or missing-field contracts. Original Proposals and published library unchanged.

## Observable effort

Counts through verification: figmaCalls=3; otherCalls=unavailable; searches=0; technicalRetries=0; canvasCorrections=0; clarificationStops=0; tokens=unavailable.

## Reading

- Previously loaded Figma use/generate-design guidance; LIBRARY.md Efficient execution/API checks; COMPOSITIONS.md Page patterns.
- Live four-variant identity/pronoun/demographics nodes, existing consumer instances and component-property references.
- Current PATIENT-HEADER-REVIEW.md and cached-run ledger.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [agreed-states.png](agreed-states.png)
- [900px-check.png](900px-check.png)
- [pronouns-hidden.png](pronouns-hidden.png)
- [header.png](header.png)

One fixed-build run; not evidence of a general speedup.
