# Medlist · Group row actions and overflow

Updated both disclosure proposal variants so primary action, Details and overflow form one group with bound 8 px gaps. Review, selection and action controls now share a vertical centerline. Applied to all eight live specimens; no working-screen changes.

[Review section](https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=34-1391) · File: yh2F6OUgdI6K0risLtKLEQ

## Timing

Start: 2026-11-14T21:58:13Z. Ready to construct: 2026-11-14T21:59:23Z. Construction returned: 2026-11-14T21:59:42Z. First image: 2026-11-14T21:59:55Z. Verified: 2026-11-14T22:00:41Z.

Preparation/discovery: 70s; construction: 19s; verification after construction: 59s. First image elapsed: 102s; verified elapsed: 148s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- Affected scope enumerated live: two local masters and eight instances.
- Default Details-to-overflow control gap reduced from 95 to 8 px. All eight examples now have 8 px between primary action, Details and overflow.
- 74 measured assertions passed: group width, visible column widths, row heights, shared review/action centers, native 34 × 34 overflow size, no visible overflow and unchanged disclosure destinations.
- Five native controls match their imported masters with zero structural/token differences. Overflow retains the original working-row Icon button structure and contextual color exactly.
- All eight specimens preserve visible text, heights and reactions. Native control masters were not changed.
- Full updated proposal screenshot viewed; longest View issue + Hide details combination fits.

## Findings and recovery

- The 248 px Actions plus separate 40 px Overflow columns caused the separation. Combined allocation is now one 288 px Actions group. Former empty overflow wrappers are retained hidden and named superseded.
- A standalone glyph comparison exposed five contextual color differences: the glyph inside Icon button uses its existing grey color instead of standalone primary color. No color was changed; exact equality with the original working Icon button is verified. The initial diagnostic audit is retained in evidence.
- Proposal spacing updated per Daniel's feedback. Working screen 2:1811 and full-page comparison copy 23:881 remain unchanged; no nodes deleted.
- Stored disclosure destinations verified after structural changes. No new prototype playback claim.

## Observable effort

Counts through verification: figmaCalls=5; otherCalls=unavailable; searches=0; technicalRetries=0; canvasCorrections=0; clarificationStops=0; tokens=unavailable.

## Reading

- Live disclosure masters, all eight consumers and board notes.
- LIBRARY.md Efficient execution/API checks; COMPOSITIONS.md Rows and cards; previously loaded Figma use/generate-design/generate-library skills.
- Current disclosure state ledger and audit wrapper.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [action-spacing.png](action-spacing.png)

One fixed-build run; not evidence of a general speedup.
