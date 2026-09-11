# Flowsheets — read-only audit, 2026-09-11

## Outcome

The source has four distinct states. Propose the two list-row variants as the first bounded build, after an operator decision on icon mappings and the recorded touch-target disagreement. No Figma nodes, library assets, source page selection, or shared masters were changed. The proposed item is `npve-flowsheets-measure-row`, status proposed, risk human-decision; this audit's authorization does not authorize construction.

Authorization: “Ok lets start flowsheets work”, accepting the preceding read-only audit proposal. Previous NPVE record `npveRebuild_patientSummaryBody_2026-09-10` was DONE; record gate clear. This batch opened `npveRebuild_flowsheetsAudit_2026-09-11` through `openRecord` before the scoped audit. No previous approval was reused.

## Source and visual review

Fresh source page inventory matched `npve-patient-summary-body-2026-09-10/source.json` (18 pages); target matched the four canonical pages; library matched all eleven canonical pages. Explicit file keys on every call. Source reads used node lookup without switching its page or selection. Library/target page loads were sequential.

| State | Source node | Component size | Saved PNG |
|---|---|---|---|
| List | 939:9228 | 550 × 360 | source-list.png |
| Expanded graph | 861:7047 | 550 × 630 | source-graph.png |
| Add readings | 867:7460 | 550 × 2404 | source-add.png |
| Edit readings | 909:12649 | 550 × 2388 | source-edit.png |

All four belong to source component set `129:6647 Sidesheetv3`. All four saved images were inspected. PNG export bounds can differ from component geometry: source-add.png is 550 × 2399. The evidence keeps the measured component dimensions separately; no height was inferred from the image.

The list shows Mental Health, Create New Flowsheet, MEASURE / LATEST / UPDATED / ACTIONS, two rows and Add to Note. PHQ-9 shows 15 and 2/1/26. GAD-7 shows 12, 15% with a double-up-chevron, and 2 days ago. Each row carries note-add, monitoring, edit, and plus actions. Row containers are 548 × 64; their inner rows are 516 × 32. GAD-7 inserts an extra trend block, shifting Updated relative to PHQ-9 and the common header. Column alignment therefore needs an explicit disposition when composing the list, rather than silently copying the misalignment.

The graph state expands beneath PHQ-9. It shows five period options (1mo, 3mo, 6MO, 1YR, ALL), 1YR visually selected, a purple curve, 0/50/100 axis labels, and JAN → DEC → NOV → OCT → SEPT → AUG → JUL → JUN. These are source drawings, not a verified dataset, scoring rule, or functioning graph implementation. No clinical interpretation or recalculation was performed.

Add/Edit each show nine question groups with four response options, a date field, a selected response and inline graph on the first question, the GAD-7 row and a Save action with a caret. They differ in heading (Add New Readings / Edit Past Readings) and subheader height. Source readbacks found only close reactions across these scoped states; they do not establish graph filtering, scoring, saving, or the Save menu's contents. Do not invent those behaviors or extra states.

## Fresh component mapping evidence

`library-icons.json` contains all 101 enumerated icon-page component/set identities. `library-actions.json` contains native owning-set property definitions and every Default Button/Icon button variant. `library-row-icons.json` includes exact standalone definitions, keys and dimensions. These are readbacks, not imported assets or proof of rendered instance behavior.

| Requirement | Current mapping or finding |
|---|---|
| Row action host | Icon button set 170:77, key 7ebea5d7ce6ecfdaef84d177efa64196f654717d. Exact axes color=default/primary/error; size=medium/small; State=Default/Hover/Focus visible/Disabled; Icon#170:0 swap. |
| Medium/default host | Variant 170:5, key c417c9bd187d428a763cd7763de09f7f258a73b6, measured 40 × 40. Small/default 170:17 is 34 × 34. |
| Plus | Icon/PlusOutlined 76:8, key 925d1c32ce73e949f4f67701add8eb5be3ed342f, 24 × 24. |
| Note-add | Icon/AddPaymentNote 575:2 exists, key 9fe47d27ed040f1d0e988074b7ea7ba27afcebef. A clipboard-plus glyph from code, not an exact match for the source document-plus-circle. Candidate substitution only. |
| Edit | Icon/EditOutlined 575:13 exists, key ae295bfd62904c894356ffb63fa20fe2ef03b060. Code draws document-plus-pencil; source is a standalone pencil. Candidate substitution only. |
| Monitoring | No matching master in the inspected icon inventory. Do not redraw or replace silently. |
| Double-up trend | No matching master in the inspected inventory. Icon/UpCaret 575:37 is a single caret and is not an approved replacement. |
| White bordered button | Button set 79:2 supports variant=contained/text, not outlined. Contained/primary is the existing white bordered treatment; exact definitions saved. Full list use needs fresh composition review. |
| Chart | No chart master in enumerated Data display families; authenticated Chart search returned only unrelated components. No chart implementation found in the scoped design-system source search. This establishes a mapping gap, not proof that no chart exists anywhere. |

The first multi-query search was server-clamped to one query; the five skipped terms were not treated as searched. The audit used the full icon-page inventory and a separate Chart search instead. Initial verbose source readback was tool-truncated and discarded as evidence; a compact complete visible hierarchy and separately scoped state readback replaced it. No writes failed or were retried.

## Code evidence and limits

- `C:/Code/web-app-v2/packages/design-system/src/overrides/IconButtonOverrides.ts`: small padding 0.5rem; root/default, primary, error and disabled paint rules. No 42px dimension authored here.
- `C:/Code/web-app-v2/packages/design-system/src/components/icons/AddPaymentNoteIcon.tsx`, `EditOutlinedIcon.tsx`, and `icons/index.ts`: exact available icon implementations/exports. Their shapes differ from the source artwork.
- Scoped case-insensitive chart/flowsheet search of design-system/src found no chart/Flowsheets implementation. Package-wide TypeScript search found beta-card/navigation references, including `appointment-workflow-ui/src/components/ClinicalFlowsheetsBetaCard.tsx`, rather than this questionnaire implementation. Search coverage is recorded, not a repository-wide absence claim.
- No Storybook render was obtained in this planning audit. Any build must verify the selected controls in code/Storybook and live instances; saved master readbacks do not satisfy the visual floor.

## Decisions and recommended next scope

1. **List-row icons:** choose exact code-backed library additions in a separate library batch, or explicitly approve substitutions/marked gaps. Recommendation: resolve exact monitoring/trend assets and the note/edit treatment before a row build. Do not fabricate missing glyphs in NPVE.
2. **Target size wording:** the NPVE contract says published Icon button targets are 42px; fresh masters are 34/40px. The cited PMHx decision specifically made its row 42px to preserve the Checkbox. Recommendation: preserve actual Icon button master geometry and record a planner/operator clarification that 42px was the checkbox-driven row minimum, if confirmed. This audit does not alter the rule or assign that decision.
3. **Later graph/questionnaire work:** identify the authoritative chart and questionnaire pattern before implementation; keep graph data, response interaction, date/menu behavior and layout alignment as explicit decisions. A frozen source reference is allowed; rasterized rebuilt graph/UI is not.

The proposed first build is one local 518px **Flowsheets measure row** component set with only the two visible variants: Basic (PHQ-9) and With trend (GAD-7). Preserve source copy, use live library controls and bound values, maintain measured control geometry, and provide a dedicated reference/rebuild/change comparison for both. Excludes shell, dropdown, chart, questionnaire, preferred-value changes, library writes and new behavior. No build record exists yet; normal startup/openRecord applies after decisions and per-item approval, then generate the runner handoff. The expected record is deliberately new and no completed record is a replay target.

Subsequent order: reviewed rows → list header/selector/body → full list sheet; independent chart/questionnaire decisions → their own bounded components and states. Those later items are not authorized or queued by this audit.

## Evidence and closeout

Saved JSON: source-list.json, source-states.json, target.json, library-icons.json, library-actions.json, library-row-icons.json, library-data-display.json, library-chart-search.json, audit.json, checkpoint.json, proposal.json, code-evidence.json. Saved PNGs: source-list.png, source-graph.png, source-add.png, source-edit.png. Operator presentation: operator-presentation.md.

Three new tracked GAP findings: row icon coverage, chart mapping, questionnaire behavior/pattern. One separate rule-disagreement finding: Icon button size. **New GAP groups: 3. New verified rendering DEFECTs: 0.** No canvas marker was created in a read-only audit. Findings are written both to this record and the active flag register.

All ten standing checks have explicit scoped results in audit.json: identity and enumeration performed, skipInvisible=false, mutation/instance checks N/A because no component was built or edited. A full-file paint audit was not claimed. Source screenshots are evidence of the audited source, not comparisons of rebuilt work.

Runner disposition: none of shell/helpers/comparison/preferred/reference-image operations applies to read-only planning. No runner mutation or start-batch was invoked, and no fabricated build execution checkpoint was created. checkpoint.json is an audit checkpoint only. Proposed-item handoff waits until its own record exists.

Cost: provider OpenAI; model/reasoning and measured token/credit counters unavailable to this run's tools are null. No estimates or token-to-credit conversion. An observation is appended to workflow/metrics.json.

Validation: workflow validator and context measurement passed at startup (89.9% byte reduction). Closeout runs workflow and split validators after finalization; final result saved in validation.txt. Bounded record/evidence/generated changes are committed together under backup policy B.
