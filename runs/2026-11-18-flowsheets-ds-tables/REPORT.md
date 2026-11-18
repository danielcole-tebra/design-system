# No Editing · DS tables

Updated the [No Editing page](https://www.figma.com/design/IgfgyXsw7FSxQQugnG5gtc/Flowsheets-27?node-id=2074-2019), page2074:8246. Converted14 main tables and3 embedded chart data tables to158 reusable local row instances containing912 linked DS Table/Cell instances:145 head and767 body cells. Values remain editable through native cell Text properties. Original rows and inspection work are retained hidden; nothing deleted. Prototype page2190:3121 was outside scope.

Consumer limitation: published Table/Row set2b1681d7546c476b9f51db3c9db3d52420b06f45 has four fixed180 px nested cells and only a State property. Published Table/Headings/Flowsheets also has four fixed cells. These cannot express the source's variable6–11-column widths through exposed properties. The screen therefore uses local SCAFFOLDING row components with direct linked Table/Cell head/body instances (set b8942ef23ec9caa891d54b1ba66bbcc46fe666f4), plus source checkboxes, sparklines, flags and selection overlays. These are local compositions, not published DS Table/Row instances. Library masters unchanged; composition awaits visual review.

Preserved source values, captions, red clinical flags, green statuses, provenance badges, source geometry and overlays. Source text formatting is retained in the cell labels. The legend is an ordinary source composition, not a data row. A failed fixed-row pilot and a width inspection component are retained hidden. The successful build script records the initial legend conversion; final state restores source2074:3110 and hides2201:3036.

Verification:17 table blocks;912/912 cells resolve to the published DS Table/Cell set; no missing source text or vertical cell text overflow. Inspected every affected full-frame context, including desktop/drawer tables, lab selection, provenance, compact/expanded chart mini-tables, detail and history views. Four representative PNGs saved here. The source layouts remain native editable nodes; no complete-UI image was inserted. Stored data checks do not claim interactive prototype playback.

Evidence: build.js, embedded-tables.js, badge-fix.js, verify.js, record.json, compact-charts.png, provenance.png, selected-labs.png, cardiometabolic.png. Not a benchmark: start/first-review timestamps and total task duration were not captured.

Repository boundary: pre-existing unpublished Problems shortcut commit is unrelated and must remain local. Only this table-conversion batch is intended for publication.
