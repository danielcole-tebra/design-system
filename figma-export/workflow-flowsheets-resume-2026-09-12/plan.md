# workflow_flowsheetsResume_2026-09-12 plan

Record: workflow_flowsheetsResume_2026-09-12
Kind: repository
Evidence: figma-export/workflow-flowsheets-resume-2026-09-12
Stop condition: Repository-only; no Figma call. The Flowsheets batch is not touched beyond its own stopped-state commit: no edit to the source, no substitute source in the manifest, no skipped check, no change to risk ownership, DONE records, the store API in scripts/schema/lib.js or the execution policy text.

The planner writes this checklist before the record opens and keeps it current through the batch. A phase is checked (`[x]`) when its evidence exists; a dropped phase is marked `[-]` with the reason after a colon. The gates refuse an unfilled placeholder at open and an open phase at close.

## Phases

- [x] Lean start: validator line, contract, manifest item and last record read by scoped projection; the calls and bytes before the first task action noted for the report
- [x] Flowsheets stopped state committed on its own: the IN PROGRESS record, apply script, evidence folder and the pending flags and manifest edits, nothing else
- [x] Source-gate treatment: scripts/workflow/source-definitions.js validates a read-only source set whose definitions Figma cannot read (exact error quoted, set identity and geometry, every variant's name and variantProperties, the used variant matched by those properties, the control marked "definitions unreadable at source", a flag naming the set); validate-execution.js accepts the marked control only under those checks and verifies target and library components exactly as before
- [x] Runner: the read program in runner/plugin.js quotes the exact error and reads the set, page, geometry and variants when componentPropertyDefinitions throws on a source read; validatePlan accepts that record on a source read only; a mutation refuses an unreadable target set; verifyReadback compares the quoted error and variants exactly
- [x] Resume: scripts/workflow/resume-batch.js <item-id> <executor> --confirm="<operator go-ahead>" requires the item and run stopped, the record IN PROGRESS, execution.json valid at ready and the quoted go-ahead; sets the run active and the item queued, refreshes the store fingerprint and the pre-existing-files baseline listing the appends since the start, appends the resume to the run, checkpoints the record through record-scripts quoting the operator, runs the batch-files gate at open and reports, regenerates the contract
- [x] Self-tests: scripts/workflow/source-definitions-self-test.js and scripts/workflow/resume-batch-self-test.js pass, both in DEFAULT_SELF_TESTS; the existing suite and the validator pass
- [x] Documentation: check-catalog.json gains sourceDefinitions and batchResume; rules.json standing rule 16 and agent rule 9 name the resume command; workflow/README.md, workflow/runner.md, CLAUDE.md rule 16 brief and OPERATORS.md name it; contract regenerated against the open record
- [x] Report written to figma-export/workflow-flowsheets-resume-2026-09-12/report.md with the startup accounting
- [x] Record closed through finalize-workflow-flowsheets-resume-2026-09-12.js and committed with the regenerated indexes
