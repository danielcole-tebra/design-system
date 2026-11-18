# Flowsheets prototype — first pass

[Open Flowsheets · Prototype](https://www.figma.com/design/IgfgyXsw7FSxQQugnG5gtc/Flowsheets-27?node-id=2190-3122) in Flowsheets27. Page2190:3121.

Created ten visible1120 ×1042 stages using native editable clones of the user-linked Phase1 No Editing designs. Existing source pages and library masters preserved. Reused linked DS selectors, segmented controls, checkboxes and icons, existing text/token bindings, and source chart vectors. No complete-UI raster layers. All text uses Akkurat LL.

The main flow covers table↔compact chart, Expand/Collapse All, and blood-pressure138/86 detail from table, compact chart and expanded chart. Close returns to the originating view. Two separate history examples preserve the source's distinct clinical snapshots: corrected128/86 vs original138/86, and excluded138/86 with a dash in the table. Each has its own flow starting point. Added a cloned DS close control to the excluded-history card.

All ten screens visually inspected.23 stored navigation links resolve within the prototype page.32 measured assertions pass for dimensions, font, native UI and destinations. Four of six native control comparisons match exactly. The two selected segmented controls retain the source's bound action.selected fill override; the published segment has no selected axis. No new styling exception introduced. Raw audit evidence and complete IDs are in record.json.

Remaining first-pass limits: date controls, flowsheet selector, row selection/filtering, other measures, source error states and the outer Close are not wired. No editing, live data or persistence. No played-through prototype claim. This is ready for review before expanding scope.

Recovery: clone fonts loaded explicitly after safe rollback; follow-up source clones resolved from the new page; chart cards corrected to opaque source-bound paper and prior hover tooltip hidden. Source paint bindings were preserved when a handle-based update rendered black. The final corrected images are authoritative.

Evidence: build.js, context.js, visual-fix.js, paint-fix.js, verify.js, record.json and four representative PNGs. All ten screens inspected inline. Not a benchmark; checkpoint times not captured.

Repository scope: pre-existing unpublished Problems shortcut work was present before this task. Only this Flowsheets run is intended for publication; that prior work remains local.

