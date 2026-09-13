# npveRebuild_demoPlanInventory_2026-09-12 plan

Record: npveRebuild_demoPlanInventory_2026-09-12
Kind: figma
Evidence: figma-export/workflow-plan-inventory-2026-09-12/scaffold-demo/evidence
Stop condition: TODO(what stops the batch, in one line)

The planner writes this checklist before the record opens and keeps it current through the batch. A phase is checked (`[x]`) when its evidence exists; a dropped phase is marked `[-]` with the reason after a colon. The gates refuse an unfilled placeholder at open and an open phase at close. The inventory is a candidate list, never evidence: the nodes a script mutates are re-verified in Figma first (standing rule 3).

## Phases

- [ ] Lean start: validator line, contract, manifest item and last record read by scoped projection; the calls and bytes before the first task action noted for the report
- [ ] Inventory walk: first read-only walk of fdCQVFdvOByaOYIJYag0d6 saved to figma-export/workflow-plan-inventory-2026-09-12/scaffold-demo/evidence/inventory.json (inventory-walk.figma.js, then node scripts/figma/inventory.js save) before any write
- [ ] Mappings: the components, variants, exposed properties and dimensions of the next milestone verified against the library; execution.json saved
- [ ] Re-verify before the first write: the nodes to mutate read back by id, name, type and parent (node scripts/figma/inventory.js reverify, then record); the latest reverification clean
- [ ] TODO(milestone 1: what becomes visible, and the saved render that shows it)
- [ ] Comparison render inspected by the executor and shown to the operator; the ten standing batch rules run
- [ ] Report written to figma-export/workflow-plan-inventory-2026-09-12/scaffold-demo/evidence/report.md with the startup accounting
- [ ] Record closed through finalize-npve-rebuild-demo-plan-inventory-2026-09-12.js and committed with the regenerated indexes
