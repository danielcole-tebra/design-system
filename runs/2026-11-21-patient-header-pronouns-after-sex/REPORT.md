# Patient header · Pronouns immediately after sex

Moved lower-row pronouns directly after sex, before DOB, across all four header variants. Preserved 72 px height and optional visibility; source values and meaning unchanged.

[Review section](https://www.figma.com/design/ipK5Vwmpqieg8WeHhiCMJz?node-id=2-88) · File: ipK5Vwmpqieg8WeHhiCMJz

## Timing

Start: 2026-11-22T01:33:41Z. Ready to construct: 2026-11-22T01:34:47.386Z. Construction returned: 2026-11-22T01:34:48.644Z. First image: 2026-11-22T01:35:15.042Z. Verified: 2026-11-22T01:35:36.634Z.

Preparation/discovery: 66.386s; construction: 1.258s; verification after construction: 47.99s. First image elapsed: 94.042s; verified elapsed: 115.634s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- 164 measured assertions passed across twenty affected examples, including four pronouns-hidden instances.
- Visible reading order is Female, (she/her), separator, DOB/phone/MRN. Hidden reading order is Female, separator, DOB/phone/MRN.
- Lower sample row measures 522 px and fits inside identity at 900 and 1184 px. All header instances remain 72 px with no visible text overflow.
- Sex is an independently editable TEXT property; original demographic values were split at the first separator without loss. Pronoun text and boolean controls preserved.
- Akkurat LL retained. Published Retry Link snapshot matches with no differences. Existing allergy/cache/identity content inspected in full-view screenshots.
- Full review, 900 px checks, hidden-pronoun checks and header crop viewed.

## Findings and recovery

- DECISION — Daniel, 2026-11-21 requested pronouns immediately after sex, superseding the earlier after-MRN position.
- Added four Sex text nodes. Reused/moved original separators and pronoun groups; no nodes deleted. Existing Demographics property now holds DOB/phone/MRN; migration used each live instance's prior value.
- This is a presentation change. It does not resolve the broader source sex/gender field meaning question or long-content/missing-field contract. No published library, original Proposals, code or prototype wiring changed.

## Observable effort

Counts through verification: figmaCalls=3; otherCalls=unavailable; searches=0; technicalRetries=0; canvasCorrections=0; clarificationStops=0; tokens=unavailable.

## Reading

- Previously loaded Figma use/generate-design skills; current Efficient execution/API checks and Page patterns.
- Live four-variant lower-row structure, component properties and twenty affected instance values.
- Plugin API editComponentProperty definition for the existing demographic default migration; current review register.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [agreed-states.png](agreed-states.png)
- [900px-check.png](900px-check.png)
- [pronouns-hidden.png](pronouns-hidden.png)
- [header.png](header.png)

One fixed-build run; not evidence of a general speedup.
