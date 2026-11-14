# Medlist native rebuild · Current medications · Batch 1

Created the new Tebra-owned Design file and first Current medications screen (1440 × 1833), connected to Design System Rebuild. Five reusable local component families, with four order-status variants and exposed nested controls. Static review batch; remaining flows await Daniel's visual read per AGENTS.md.

[Review section](https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=2-1811) · File: yh2F6OUgdI6K0risLtKLEQ

## Timing

Start: 2026-11-14T17:50:32Z. Ready to construct: 2026-11-14T17:56:19Z. Construction returned: 2026-11-14T17:59:25Z. First image: 2026-11-14T17:59:34Z. Verified: 2026-11-14T18:05:08Z.

Preparation/discovery: 347s; construction: 186s; verification after construction: 343s. First image elapsed: 542s; verified elapsed: 876s. Actual input wait: 8.973s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- Viewed final 1440 × 1833 full-screen render, local-component render and retained inspection area.
- 16 live native controls matched their masters: 0 structure/token differences after correction.
- 22 measured assertions passed, including 1216 table width, 40 px fields, 48 px tabs, 30 px actions, 52 px pagination, visibility and canonical failed-status ink.
- All visible text in each of the ten medication rows matched the corresponding source row (order-independent text comparison).
- Four local status variants are instantiated and visible; long medication names, compound and patient-reported metadata checked in context.
- No unexpected geometry overflow. Two native floating labels intentionally extend above their input frame.
- No stored prototype reactions; no played-through prototype claimed.

## Findings and recovery

- Nonblocking: native Text field still lacks adornment slots. This composition uses the native field without a leading icon; no scaffold introduced.
- Current native Table/Cell heading formatting retained. The existing table-head-line-height question remains unresolved; this batch does not establish shipping code line-height.
- Native Chip small label rendered at 12/18; preserved as published. Documented intended code label size is 13. Nav/Search retains its published Inter typography.
- Resolved during verification: four refill values and acetaminophen pharmacy/phone restored to source copy.
- Resolved during verification: redundant icon-swap writes changed contextual icon ink. Resetting overrides did not restore the consumed rendering. Fresh native controls using their default plus/caret, without swap writes, passed all comparisons. Superseded controls preserved in Inspection · Medlist native · 2026-11-14 · Superseded icon swaps.
- Body2 clinical details and wider native controls produce a taller screen (1833 vs source 1631). Patient context is 135 high versus source 142. Density and hierarchy are proposals for Daniel's review, not global SDE rulings.
- Library source, eRx Concepts and SDE files were not modified. Local components remain project-owned, not published library assets.

## Observable effort

Counts through verification: figmaCalls=unavailable; otherCalls=unavailable; searches=1; technicalRetries=unavailable; canvasCorrections=unavailable; clarificationStops=1; tokens=unavailable.

## Reading

- AGENTS.md; LIBRARY.md Efficient execution, API checks, Token mappings, Typography, Button, Icon button, Chip, Text field, Other controls; COMPOSITIONS.md Rhythm, Rows and cards, Actions and section labels, Search and other adornments, Page patterns; linked OPEN-ISSUES.md entries.
- Figma use, create-new-file, generate-design and generate-library skills and relevant API/component references.
- Live source A01 row text and selected Design System Rebuild definitions; prior current-medications comparison evidence.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [current-medications.png](current-medications.png)
- [local-components.png](local-components.png)
- [inspection-retained.png](inspection-retained.png)
- [first-screen.png](first-screen.png)

One fixed-build run; not evidence of a general speedup.
