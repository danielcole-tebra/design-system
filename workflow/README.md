# Lean design-workflow runtime

Reusable NPVE programs, compact handoffs and file-backed evidence: see [runner.md](runner.md). The runner reuses these gates, supports authenticated tools through a provider-neutral adapter, and never supplies approvals or visual passes. Start with `node scripts/workflow/npve-runner.js handoff <item-id> <evidence-folder>`; validate offline with `node scripts/workflow/runner-self-test.js`.

## Run cost tracking

At run close, append an observation to `workflow/metrics.json` → `costObservations`: provider, model, reasoning, measured input/cached-input/output tokens, and credit cost with its source and approximate flag. Follow `costTracking` in the same file. Sum per-response usage once per response ID within the completed run; never add cumulative counters or double-count cached/reasoning subsets. Record unavailable values as null. Keep credits separate from tokens; do not infer conversion rates. Late operator cost reports supplement the completed run through a new record without editing its DONE record.

This directory is the compact, provider-neutral entry point for NPVE rebuild batches. It reduces repeated reading without weakening the operator loop.

## Files

- `rules.json` — canonical text of the agent rules, the record gate, standing rules 14 and 15, the sheet and comparison techniques, the proof convention, and every NPVE value with the schema record that decided it. CLAUDE.md and AGENTS.md point here; the contract folds it in and digest-checks it.
- `npve-contract.generated.json` — the executor's reading: rules.json plus the schema's ten standing batch rules, recent records, and open flags. A projection, never a second authority.
- `manifest.json` — planner-owned work queue. Risk tiers carry who proposed them and whether the operator approved them, with the operator's words quoted.
- `protocol.json`, `check-catalog.json`, `evidence-template.json`, `metrics.json` — roles and tiers, the deterministic-vs-visual check split, the byte ceilings on the startup files (enforced by `validate-ceilings.js`; `measure-startup.js` reports a session's pre-task reads from its transcript), the evidence packet shape, and pilot measurements.
- `execution-policy.md` — canonical model/harness-neutral execution and communication rules, included in the contract. `execution-template.json` is the small per-batch checkpoint template; copy it into the report folder as `execution.json` and populate it from evidence.

The register itself lives outside this directory as the append-only record store (record schemasplit_phase8_2026-09-08): `records/<workstream>/<date>/<recordId>.json` (immutable batch records), `flags/active.json` + `flags/resolved.json`, `foundation/<section>.json`, and the generated `indexes/record-index.json` + `indexes/current-state.json`. `design-system-schema.json` is generated from it by `scripts/schema/build-aggregate.js`. Concurrent batches write separate record files and never touch shared files except the generated indexes, which regenerate at commit.

## Start here

1. Run `node scripts/workflow/validate-workflow.js`.
2. Read `workflow/npve-contract.generated.json` and the selected item in `workflow/manifest.json`.
3. Read the last completed record named by the work item: find its path in `indexes/record-index.json` (or `indexes/current-state.json` for the last record per workstream) and read that file. Open the full aggregate only when validation fails, a conflict appears, or the item explicitly requires historical context.
4. Record gate: the apply-*.js script calls `openRecord` in `scripts/schema/lib.js`, which refuses to create the item's `IN PROGRESS` record file while the previous record in the workstream is not DONE in `indexes/record-index.json`. If the previous batch has no record at all, stop and write a read-only state-check record instead. Since record workflow_recordScripts_2026-09-12 the apply script calls `apply` in `scripts/schema/record-scripts.js`, which checks the body, measures the record against the record ceiling and then calls `openRecord`; `node scripts/schema/new-record-scripts.js --id <recordId> --previous <recordId> --date <date> [--kind figma|repository]` scaffolds the apply/finalize pair and, since record workflow_planInventory_2026-09-12, the batch's `plan.md` (the planner's phase checklist beside the report; a TODO blocks `apply`, an open phase blocks `close`) and, for a Figma batch, `inventory-walk.figma.js`.
5. Create the item's `IN PROGRESS` record file (openRecord regenerates the aggregate and indexes), verify the actual tools, target identity and control mappings, and populate `execution.json` in its report folder. For a Figma batch, run the inventory walk first and save its result as `inventory.json` (`node scripts/figma/inventory.js save <evidence-dir> <result.json>`); before the first write, re-verify the nodes to mutate by id, name, type and parent (`reverify`, run the script, then `record`). `check-batch.js` refuses a mutation until the latest recorded reverification is clean; the inventory is a candidate list, never evidence. Evidence paths are repo-relative saved readbacks/notes, never credentials or expiring URLs. List the visible milestones appropriate to this item; the template's three milestones are an example, not mandatory anatomy. Regenerate the contract and run `start-batch.js`; new version-3 runs require this checkpoint. An unapproved tier needs `--confirm="<the operator's exact words for this item>"`.
6. Run `check-batch.js` immediately before each Figma mutation and before finalizing the record.
7. Update the checkpoint after each meaningful milestone or failure, not every tool call. Keep verified node IDs, an inspected PNG, unresolved errors and the next action. Validate execution at `finish` before finalizing the immutable record; `close` in `scripts/schema/record-scripts.js` refuses a record over the ceiling, a changed risk tier, a missing report, an open `plan.md` phase or a Figma batch without its `inventory.json` (with a clean reverification once mutations are listed) before the record becomes immutable; `finish-batch.js` repeats the plan and inventory check, and the runner closeout runs the same ceiling check. After finalizing, archive the batch proofs per the proof convention, regenerate the contract, and run `finish-batch.js`, which repeats the execution gate for new runs. Commit the record with the generated aggregate/indexes/contract and evidence. Old runs are not retroactively required to supply a checkpoint.

## Commands

```text
node scripts/schema/build-aggregate.js [--check]
node scripts/schema/validate-split.js
node scripts/schema/self-test.js [scratchDir]
node scripts/schema/record-scripts-self-test.js [scratchDir]
node scripts/schema/new-record-scripts.js --id <recordId> --previous <recordId[,recordId]> --date YYYY-MM-DD [--kind figma|repository] [--target npve|library|proposals|<fileKey>] [--workstream <ws>] [--slug <name>] [--evidence <dir>] [--by "<executor>"] [--out <dir>]
node scripts/schema/scaffold-self-test.js
node scripts/figma/inventory.js walk|save|select|reverify|record <evidence-dir> …
node scripts/figma/inventory-self-test.js
node scripts/workflow/batch-files.js <record-id | item-id> [open|checkpoint|mutation|close|finish]
node scripts/workflow/batch-files-self-test.js
node scripts/figma/helpers-self-test.js
node scripts/schema/milestone.js "<reason>" | --status
node scripts/workflow/generate-contract.js
node scripts/workflow/validate-workflow.js
node scripts/workflow/lock-risk.js <item-id> <approver> "<verbatim operator approval>"
node scripts/workflow/start-batch.js <item-id> <executor> [provider] [model] [reasoning] [--confirm="<operator quote>"]
node scripts/workflow/check-batch.js <item-id>
node scripts/workflow/validate-execution.js <item-id> [ready|finish]
node scripts/workflow/execution-self-test.js
node scripts/workflow/finish-batch.js <item-id>
node scripts/workflow/stop-batch.js <item-id> <reason>
node scripts/workflow/measure-context.js
```

Risk classification is planner/operator-owned. A tier is approved only when the operator's approval is quoted verbatim in the manifest; `lock-risk.js` refuses to run without the quote. The lock covers the tier, reasons, proposer, approval, oversight, stop condition, file allowlist, required evidence, and expected record. The executor cannot change those fields without invalidating the run.

The visual floor is not compressible: every component gets its own comparison render, the executor inspects it, and the operator sees it before the next medium/high-risk item or at the agreed low-risk checkpoint.

Provider and model names are optional provenance only. Any Anthropic, OpenAI, open-weight, or future model can follow this protocol if it has the capability tier required by the work item.

## Component evidence for the execution checkpoint

Each `preflight.controls` entry names its chosen component ID or published key, desired exact `properties`, and a repo-relative JSON `evidence` file. Save a scoped Figma readback as `{ "components": [...] }`. Each component entry contains its actual `id` and/or `key`, measured `width`/`height` when relevant, and native `componentPropertyDefinitions` (for a variant, read definitions from its owning set). Do not ask a variant node for standalone definitions. Several control entries may reuse one snapshot.

The validator matches the component identity, checks exact property names, checks variant values against `variantOptions`, and checks text/boolean/swap value types. It rejects the Allergies failure of requesting `variant=outlined` from a definition that offers only `contained` and `text`. It does not independently fetch Figma or prove that supplied snapshots are current; the executor must obtain and inspect them. Identity and tool evidence may be separate saved readbacks or concise notes. PNG validation checks file presence/signature, not visual correctness.
