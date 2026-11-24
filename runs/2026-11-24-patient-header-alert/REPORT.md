# Patient alert alongside cached allergies at 900 px

Optional published warning Chip added beside patient name across four local header variants. The requested 900 × 72 stress example preserves the full long name, collapsed Patient alert trigger, demographics, cached allergies and balance. Separate full-message disclosure preview is static.

[Review section](https://www.figma.com/design/ipK5Vwmpqieg8WeHhiCMJz?node-id=21-716) · File: ipK5Vwmpqieg8WeHhiCMJz

## Timing

Start: 2026-11-24T19:47:10.768Z. Ready to construct: 2026-11-24T19:49:20.250Z. Construction returned: 2026-11-24T19:49:27.498Z. First image: 2026-11-24T19:49:45.107Z. Verified: 2026-11-24T19:50:11.163Z.

Preparation/discovery: 129.482s; construction: 7.248s; verification after construction: 43.665s. First image elapsed: 154.339s; verified elapsed: 180.395s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- 165 measured assertions passed across 24 existing/new header examples.
- Four visible patient-alert Chip instances match the published component structure/tokens with zero differences.
- 900 × 72 header: name 446 px + 8 px gap + 86 px chip = 540 px within 586 px name row; 46 px remaining.
- All 20 prior instances retain their widths, 72 px height and hidden alert by default.
- Akkurat LL typography, demographic fit, column separation, cache copy and full alert message verified.
- Review, combined states and existing agreed-state screenshots viewed. Editable layers; no raster in review.

## Findings and recovery

- Scope: Daniel's approved 2026-11-24 compact patient-alert proposal; no library/product code/original Proposals modifications.
- Full message is a separate static disclosure preview. Click, keyboard, Escape and outside-click behavior are specified, not wired or played through.
- The narrow label-only fallback is authored in Figma. Automatic width-dependent preview collapse and wider inline message truncation are not implemented.
- This particular 42-character long name fits without truncation. Still-longer names, long allergy summaries and widths below 900 remain unverified.
- Alert-message cache provenance is separate from the displayed allergy cache date; this example does not claim patient-header data is cached.
- No nodes deleted. Existing approved avatar contrast override retained; new fictional patient's initials changed to AM.

## Observable effort

Counts through verification: figmaCalls=unavailable; otherCalls=unavailable; searches=1; technicalRetries=0; canvasCorrections=0; clarificationStops=0; tokens=unavailable.

## Reading

- LIBRARY.md: Efficient execution, Chip, API checks by operation, Token mappings
- COMPOSITIONS.md: Page patterns
- OPEN-ISSUES.md: primary-chip-visible-hover (not applicable to warning)
- PATIENT-HEADER-REVIEW.md and current screenshot
- No Chip Code Connect file found in pinned design-system snapshot.
- Published Chip consuming-file definitions and live header scope

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [review.png](review.png)
- [combined-states.png](combined-states.png)
- [existing-states.png](existing-states.png)

One fixed-build run; not evidence of a general speedup.
