# Medlist · Individual row density review

Created an isolated before/after row study on the original working page. Compact proposal reduces the first row from 143 to 81 px while retaining all visible source text and unchanged column widths. Working screen and running full-page comparison remain unchanged pending row review.

[Review section](https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=28-882) · File: yh2F6OUgdI6K0risLtKLEQ

## Timing

Start: 2026-11-14T21:04:46Z. Ready to construct: 2026-11-14T21:06:56Z. Construction returned: 2026-11-14T21:07:22Z. First image: 2026-11-14T21:07:49Z. Verified: 2026-11-14T21:08:33Z.

Preparation/discovery: 130s; construction: 26s; verification after construction: 71s. First image elapsed: 183s; verified elapsed: 227s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- Live first row inspected: 16 px cell inset, 8 px related gaps, and 34 px timeline control below directions explain much of the 143 px height.
- Original A01 row 11198:3315 is 105 px, with 4 px gaps and 12/16 secondary text including directions.
- 38 measured assertions passed across four samples: exact visible text, unchanged source heights, fixed column widths, primary/secondary typography, timeline placement, no visible overflow and no prototype reactions.
- Four native checkbox/switch/button/chip structural/token comparisons passed with zero differences.
- Full row-review screenshot inspected at natural size. First row 81 px; compound 109 px; patient-reported/send-failed 101 px; patient-info-required 81 px. All text retained.
- Working screen remains on original page 0:1; comparison copy not refreshed because working design is unchanged.

## Findings and recovery

- PROPOSAL / DECISION, owned by Daniel, scope medlist row density, status not approved or applied. Local master 28:837; study 28:882. Native library remains unchanged.
- 8 px vertical inset, 4 px related gaps, 12/16 secondary metadata. Medication names/directions remain 14/20. Existing timeline control moved beside actions. No content removed; no expanded-details flow invented.
- Further content reduction requires deciding whether pharmacy phone and prescribing-source details belong in a defined expanded row. This study leaves them visible.
- Initial property-reference repair tried to write nested instance sublayers. Tool returned safeToRetryWithoutCanvasRead=true; corrected to remap only row-owned references and stop traversal at native instances.
- Changing Actions from vertical to horizontal initially made the width hug. Corrected the local master to fixed 156 px before visual review; four sample widths verified. No existing nodes deleted.

## Observable effort

Counts through verification: figmaCalls=9; otherCalls=unavailable; searches=0; technicalRetries=1; canvasCorrections=1; clarificationStops=0; tokens=unavailable.

## Reading

- LIBRARY.md Efficient execution, Other controls and surfaces, Typography, API checks; COMPOSITIONS.md Rows and cards, Comparison and verification; linked table-head-line-height issue, not used to alter headers.
- Figma generate-library skill, component-creation guidance and validation helper; previously loaded figma-use and generate-design guidance.
- Live original A01 row and working row/master/properties; existing native controls, caption style and spacing variables.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [row-review.png](row-review.png)

One fixed-build run; not evidence of a general speedup.
