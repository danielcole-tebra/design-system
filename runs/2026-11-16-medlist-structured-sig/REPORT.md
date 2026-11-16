# Medlist structured sig comparison

Added a separate Medication / Dose / Route / Timing / Start / Stop / Actions comparison. Prescriber/source, narrative sig, last activity and order status are in Details. Details uses native text Button; primary row actions stay outlined. Separate reconciliation retained. Awaiting Daniel's review.

[Review section](https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=145-22172) · File: yh2F6OUgdI6K0risLtKLEQ

## Timing

Start: 2026-11-16T16:20:46Z. Ready to construct: 2026-11-16T16:23:16Z. Construction returned: 2026-11-16T16:24:10.580Z. First image: 2026-11-16T16:24:38Z. Verified: 2026-11-16T16:26:18Z.

Preparation/discovery: 150s; construction: 54.58s; verification after construction: 127.42s. First image elapsed: 232s; verified elapsed: 332s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- Native editable 1440×1112 list/review/completed screens;1216 table width;340/96/104/216/92/92/276 column widths. Review reserves44 px from Medication. All ten collapsed rows59 px versus81 in preceding trial.
- Six local row variants instantiated and rendered. Ten retained inspection rows verified across four disclosure/review states: text and boolean properties, status, contextual actions, structured fields, missing-date markers and effective disclosure visibility preserved.
- 692 of693 initial checks passed. The one failure was reconciliation header overflow: targeted correction reduced the visible Medication heading from340 to296; subsequent live widths/overflow checks passed. All54 visible stored destinations resolve.
- Thirteen native control structure/token comparisons and five final measured assertions passed. Table visible fonts are Akkurat LL; no image fills in the three screens.
- Normal/review context, compound expanded details, reported-source/send-failed details and all six variant screenshots inspected. Corrected review screenshot inspected after the header fix.
- Prior five-column screen and master set unchanged at construction; no library, drawer, original F or running comparison edits.

## Findings and recovery

- DECISION — Owner/decider Daniel. Scope new structured-sig comparison only. Status requested trial built, awaiting visual review, evidence2026-11-16. Supersedes narrative directions and prescriber column in this trial; does not declare replacement of previous handoff.
- Dose, route and timing are display splits of supplied directions; dose keeps administration units (1 tablet,1 capsule,Thin layer) rather than calculating ingredient mass. Topical represents the supplied cream application. Full original directions, including indications/application instructions, remain in Details.
- Start and Stop are unavailable in supplied fixtures and show em dashes. Prescribed dates are retained as labeled activity in Details, never inferred to be start dates; duration alone is not used to calculate stop dates.
- Order status moved into Details to fit requested columns; Resend and View issue remain visible. Existing order-status filter remains. Patient-reported Melatonin fixture still has a prescriber and failed order; its ambiguous semantics are preserved.
- Inherited ten-of12 pagination, completion fixture without validation/persistence, local patient-header provenance and Nav/Search Inter placeholder remain unchanged. Stored wiring verified, presentation playback not claimed.
- One construction attempt rolled back because the result exceeded48KB; retried successfully with a lossless segment dictionary for the created-node ledger. One visual correction fixed the review heading selection; prior screenshots retained.
- Timing starts at the first recorded clock checkpoint after initial skill/context preparation. Expected sibling component source remains unavailable from prior discovery; no fresh code audit claimed.

## Observable effort

Counts through final visual and native verification: figmaCalls=unavailable; otherCalls=unavailable; searches=unavailable; technicalRetries=1; canvasCorrections=1; clarificationStops=0; tokens=unavailable.

## Reading

- figma-use and figma-generate-design skills; relevant API/gotchas/design-system references retained from prior work; missing skill excerpt retrieved separately.
- LIBRARY Efficient execution, Button and API checks; COMPOSITIONS Rows and cards / Actions and section labels. Existing52 px header reused; prior linked header limitations unchanged.
- Current live five-column screen, six-variant set, imported Button definition and text variant. Existing library and whole-view discovery reused; native text Button key c2d3c143e41e4fad5573c43415253176f3d57272 selected.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [list.png](list.png)
- [review-corrected.png](review-corrected.png)
- [expanded.png](expanded.png)
- [reported.png](reported.png)
- [variants.png](variants.png)
- [review.png](review.png)

One fixed-build run; not evidence of a general speedup.
