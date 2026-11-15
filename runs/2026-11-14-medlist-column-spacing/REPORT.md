# Medlist · More room for supply and pharmacy details

Rebalanced the row-test grid and reduced horizontal cell gutters to8 px. Supply and pharmacy gain usable width, so duration, pharmacy names and phone numbers each remain on one line in all four supplied medications.

[Review section](https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=47-1675) · File: yh2F6OUgdI6K0risLtKLEQ

## Timing

Start: 2026-11-15T01:53:35Z. Ready to construct: 2026-11-15T01:54:02Z. Construction returned: 2026-11-15T01:55:15Z. First image: 2026-11-15T01:55:51Z. Verified: 2026-11-15T01:56:02Z.

Preparation/discovery: 27s; construction: 73s; verification after construction: 47s. First image elapsed: 136s; verified elapsed: 147s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- All eight live samples and both local variants updated; same1216 px total width.
- Shared column widths44/360/112/136/208/80/276. Horizontal padding16→8 px on content cells. Supply usable width68→120 px; order/pharmacy160→192 px. Medication usable width remains344 px.
- Reused native Table/Cell variant=head,padding=none (keyb5c365fef9cf5ba36ed69877c05fb8c178e60ea5) inside token-bound8 px header wrappers. All three header bands match row boundaries and remain52 px high.
- Nine native control/header comparisons and86 assertions passed. Duration, pharmacy name and phone each render on one16 px line in all four expanded samples and after all four expansion transitions.
- Visible text, font sizes, line heights and disclosure reactions are unchanged across all eight specimens. No truncation or hidden data introduced; full medication names and source/compound markers remain visible on the first line.
- Actions stay at row-relative x948/1052/1164 and center y29 in both states. Date and quantity remain visible before expansion.
- Collapsed rows59 px; expanded Alprazolam/Acetaminophen/Hydrocortisone103 px and Melatonin99 px. No visible row/header clipping. Full board and extra expanded-case screenshots viewed.
- Working screen and Comparison B unchanged; previous row set and header retained as archives.

## Findings and recovery

- DECISION · Owner Daniel; scope row test spacing; status requested adjustment applied2026-11-14. Repeated horizontal padding was consuming width needed by supply values. Reallocation preserves overall table width, controls and content.
- Native no-padding header variant supports this composition without overriding published component internals. Ordinary wrappers provide the shared8 px gutter.
- Previous definitions archived at68:2509; prior header at68:2606. Existing hidden/unused nodes preserved.
- Verification covers the four supplied medication examples at1216 px width. Arbitrarily longer pharmacy names or narrower viewports are not asserted to fit on one line. Longer prescription directions intentionally wrap within Medication.
- Stored wiring and programmatic variant transitions checked; no presentation playback or new menu behavior claimed.

## Observable effort

Counts through verification: figmaCalls=5; otherCalls=unavailable; searches=0; technicalRetries=0; canvasCorrections=0; clarificationStops=0; tokens=unavailable.

## Reading

- Current study ledger and live column widths/visible content across eight instances.
- Consuming-file Table/Cell definitions and supported normal/none/checkbox variants; LIBRARY.md API checks and previously loaded Figma skills.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [column-spacing.png](column-spacing.png)
- [expanded-cases.png](expanded-cases.png)

One fixed-build run; not evidence of a general speedup.
