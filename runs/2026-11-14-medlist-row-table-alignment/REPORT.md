# Medlist · Table headers and aligned row actions

Updated the single-line row test with shared table headers and fixed-width action buttons so primary action, disclosure and overflow occupy identical positions across medication and disclosure states.

[Review section](https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=47-1675) · File: yh2F6OUgdI6K0risLtKLEQ

## Timing

Start: 2026-11-15T01:33:33Z. Ready to construct: 2026-11-15T01:34:17Z. Construction returned: 2026-11-15T01:35:00Z. First image: 2026-11-15T01:35:37Z. Verified: 2026-11-15T01:35:43Z.

Preparation/discovery: 44s; construction: 43s; verification after construction: 43s. First image elapsed: 124s; verified elapsed: 130s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- Enumerated both local variants and all eight live consumers on page0:1.
- Added three header bands using the existing native Table/Cell head instances and select-all control. Preserved published header geometry52 px; no new line-height interpretation.
- Header and row columns share widths44/548/192/144/288 and boundaries0/44/592/784/928.
- Primary action96 px, Details104 px, overflow34 px;8 px gaps. All eight specimens place their actions at row-relative x944/1048/1160, including Edit, Resend, View issue, Details and Hide Details.
- Reused verified library Icon/LinearEllipsis in both test variants.
- Ten native component comparisons and83 assertions passed. No visible overflow. Four programmatic expand/collapse roundtrips preserve content and exact action positions.
- All eight specimens retain previous visible text, heights and stored reactions. Collapsed59 px / expanded191 px. Working screen and Comparison B retain1766/1428 px heights.
- Full updated table study screenshot viewed, including headers and expanded states.

## Findings and recovery

- DECISION · Daniel,2026-11-14,scope single-line row test: show table headers and align actions consistently. Applied to proposal only; no full-screen layout change.
- Before update, content-sized primary buttons shifted Details and overflow by up to26 px across collapsed medications; disclosure text also shifted overflow on expansion. Fixed root instance widths resolve both while preserving native internals.
- Previous set retained at60:2301. New header IDs60:2380/60:2400/60:2417. Unused cloned header cells retained hidden, no nodes deleted.
- Only Details transitions are stored. Select-all, review, primary action and overflow popup behavior remain static in this study; no presentation playback claimed.
- Known table-head line-height question remains outside this scope: reused existing verified52 px header instances unchanged.

## Observable effort

Counts through verification: figmaCalls=6; otherCalls=unavailable; searches=0; technicalRetries=0; canvasCorrections=0; clarificationStops=0; tokens=unavailable.

## Reading

- Live row test variants, eight specimens, Comparison B native table header and vertical icon.
- LIBRARY.md Other controls and surfaces; COMPOSITIONS.md Rows and cards; linked OPEN-ISSUES table-head-line-height.
- Previously loaded Figma use/generate-design guidance and audit helper.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [row-table.png](row-table.png)

One fixed-build run; not evidence of a general speedup.
