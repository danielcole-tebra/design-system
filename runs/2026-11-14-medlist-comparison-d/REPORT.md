# Medlist · Comparison D makes medication management primary

Added a separate D option beside unchanged C. Existing prescribing/add/import actions move to the page title; reconciliation becomes a compact supporting row. C's ten medication rows, data and disclosure states are unchanged in D.

[Review section](https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=77-4771) · File: yh2F6OUgdI6K0risLtKLEQ

## Timing

Start: 2026-11-15T03:47:49.517Z. Ready to construct: 2026-11-15T03:49:00.786Z. Construction returned: 2026-11-15T03:49:19.666Z. First image: 2026-11-15T03:49:31.748Z. Verified: 2026-11-15T03:51:35.992Z.

Preparation/discovery: 71.269s; construction: 18.88s; verification after construction: 136.326s. First image elapsed: 102.231s; verified elapsed: 226.475s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- Eight native control comparisons and28 measured assertions passed.
- All ten D rows exactly match C's component properties, main components, visible text, dimensions and stored disclosure reactions. Same first and issue rows open.
- Prescribe medications retains the published contained/secondary coral button. Import and Add to med list retain their native outlined appearance. All three now sit beside Medications.
- Filters remain scoped to the list. Reconciliation retains progress, Mark all as reviewed and Complete reconciliation in a47 px row instead of123 px section; large heading and instructional paragraph are hidden in D.
- D is1440×1184, versus unchanged C1440×1260. A/B/C and original working screen snapshots match before construction, including text, geometry, visibility and reactions.
- D has1581 editable descendants:407 instances,498 frames,186 vectors,489 text nodes,1 rectangle. Zero image fills; counts include retained hidden prior compositions.
- Full D screenshot, comparison-board screenshot and C/D crop inspected. No overlap after relocating retained archived examples outside the widened board.
- Native floating labels extend outside their immediate field wrapper by design; both controls pass native structural checks and render correctly. No component internals modified.

## Findings and recovery

- DECISION · Owner Daniel; scope Comparison D only; status requested option applied2026-11-14. Prioritizes general medication management and prescribing while reducing reconciliation prominence. C remains the previous hierarchy for comparison.
- Reuses existing library controls and token-bound layout/text. Compact utility row is an explicitly proposed composition; not a new library component or claim of shipping behavior.
- Original toolbar/reconciliation instances are retained hidden inside D. Their previous instructions remain in those preserved layers and C. No new reconciliation mode or interaction behavior introduced.
- Moved retained archive screen52:2451, its README52:2510 and row masters52:2511/56:3026 outside the expanded board to prevent overlap. Contents unchanged; source instance appearance unchanged.
- Initial preflight snapshot attempted findAll on a rectangle and failed before mutation. Added a child-capability guard and safely retried. Initial bounds assertion treated native floating labels as clipping; corrected expected native geometry after visual and structural verification.

## Observable effort

Counts through verification: figmaCalls=10; otherCalls=unavailable; searches=0; technicalRetries=1; canvasCorrections=1; clarificationStops=0; tokens=unavailable.

## Reading

- Previously loaded Figma use/generate-design skills; LIBRARY.md Efficient execution, API checks and Button; COMPOSITIONS.md Actions and section labels and Comparison and verification.
- Live C title, toolbar, reconciliation hierarchy, native controls, spacing bindings and existing row instances.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [comparison-d.png](comparison-d.png)
- [comparison-board.png](comparison-board.png)
- [comparison-c-d.png](comparison-c-d.png)

One fixed-build run; not evidence of a general speedup.
