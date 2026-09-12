# workflow_planInventory_2026-09-12 plan

Record: workflow_planInventory_2026-09-12
Kind: repository
Evidence: figma-export/workflow-plan-inventory-2026-09-12
Stop condition: Repository-only; no Figma call. No change to risk ownership, additive-only rules, DONE records, the store API in scripts/schema/lib.js, or the execution policy text.

The planner writes this checklist before the record opens and keeps it current through the batch. A phase is checked (`[x]`) when its evidence exists; a dropped phase is marked `[-]` with the reason after a colon. The gates refuse an unfilled placeholder at open and an open phase at close.

## Phases

- [x] Lean start: validator line, contract, manifest item and last record read by scoped projection; the calls and bytes before the first task action noted for the report
- [x] Batch-files module: scripts/workflow/batch-files.js validates plan.md and inventory.json per stage (open, checkpoint, mutation, close, finish) and resolves the batch kind from the planner's declaration, the manifest target or the listed mutations
- [x] Gates wired: apply, checkpoint and close in scripts/schema/record-scripts.js, start-batch, check-batch, finish-batch and the runner closeout call the module for records dated on or after 2026-09-12
- [x] Inventory tooling: F.inventory (bounded read-only walk) and F.reverify (id, name, type, parent read back before the first write, creators refuse until it passed) in scripts/figma/helpers.js; scripts/figma/inventory.js walk, save, select, reverify and record
- [x] Scaffold: scripts/schema/new-record-scripts.js writes plan.md, declares batchKind, plan and inventory in the apply body, and writes the inventory walk script for a Figma batch
- [x] Self-tests and the validator pass: batch-files, inventory, scaffold, the extended record-scripts and helpers tests, and the existing suite; the validator line shows 21 deterministic checks
- [x] Documentation: check-catalog.json (planChecklist, pageInventory, batchFiles), rules.json notes on agent rules 2 and 3 and standing rule 16, CLAUDE.md Recording, workflow/README.md; contract regenerated against the open record
- [x] Report written to figma-export/workflow-plan-inventory-2026-09-12/report.md with the startup accounting
- [x] Record closed through finalize-workflow-plan-inventory-2026-09-12.js and committed with the regenerated indexes
