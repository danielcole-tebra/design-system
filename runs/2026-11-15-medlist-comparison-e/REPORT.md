# Medlist · Comparison E with clearer labels and quieter routine statuses

Added E based on unchanged D. Filled/Pending fill use body2 Regular with color/text/secondary; issue styles remain unchanged. Date/source becomes Prescribed / modified and Order/pharmacy becomes Order status, following original A01 meanings.

[Review section](https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=85-6255) · File: yh2F6OUgdI6K0risLtKLEQ

## Timing

Start: 2026-11-15T14:22:52.561Z. Ready to construct: 2026-11-15T14:24:10.475Z. Construction returned: 2026-11-15T14:24:20.745Z. First image: 2026-11-15T14:24:50.127Z. Verified: 2026-11-15T14:26:17.455Z.

Preparation/discovery: 77.914s; construction: 10.27s; verification after construction: 116.71s. First image elapsed: 117.566s; verified elapsed: 204.894s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- Eight native control/header comparisons and127 assertions passed.
- Original source A01 headings verified live: Last prescribed / modified and Order status; all ten source row date types read Prescribed.
- Eight routine statuses now use body2 Regular14/20 and color/text/secondary #545454. Send failed and Patient info required retain exact original bold/error styles. Medication names remain bold.
- All ten rows retain exact D properties, visible copy, heights and disclosure reactions. Status overrides survive expansion/collapse roundtrips; no row clipping.
- Final date heading Prescribed / modified is96×40 inside the existing112×52 column; table grid and overall1440×1184 screen dimensions unchanged.
- A/B/C/D and working screen snapshots match before construction. Archive examples moved outside widened board; contents retained.
- E includes1582 editable descendants:407 instances,498 frames,186 vectors,490 text nodes,1 rectangle; zero image-filled nodes. Counts include preserved hidden prior compositions.
- Final E and full comparison-board screenshots inspected; revised date heading fits and routine/issue emphasis is distinct.

## Findings and recovery

- DECISION · Owner Daniel; scope Comparison E only; status requested iteration applied2026-11-15. This is a separate visual hierarchy alternative, awaiting preference; no data, filtering, sorting, review-mode, persistence or prescribing behavior change.
- Ordinary token-bound heading text uses existing h5 Bold14/20 and primary ink. The existing imported Table/Cell label retains a20 px text box and did not accommodate this multi-line label. Its E instance is preserved hidden, with no published internals changed. Shortened wording preserves original date meaning.
- Initial full date heading wrapped to three lines and clipped. Final Prescribed / modified plus explicit existing20 px line-height binding fits two lines. Verified visually after correction.
- Rows remain linked to local set47:1540. Routine-status styles are scoped instance overrides in E, not modifications to shared row masters or the source library.
- Stored reactions and programmatic variant transitions checked; presentation playback not claimed.

## Observable effort

Counts through verification: figmaCalls=11; otherCalls=unavailable; searches=0; technicalRetries=0; canvasCorrections=1; clarificationStops=0; tokens=unavailable.

## Reading

- Previously loaded Figma use/generate-design skills; LIBRARY.md index, Efficient execution, API checks and Typography; COMPOSITIONS.md Rows and cards.
- Live original A01 headings/date types; D native header instances, local status text, body2 style and secondary token.
- OPEN-ISSUES.md existing table-head-line-height entry.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [comparison-e.png](comparison-e.png)
- [comparison-board.png](comparison-board.png)

One fixed-build run; not evidence of a general speedup.
