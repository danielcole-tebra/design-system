# Lean design-workflow runtime

This directory is the compact, provider-neutral entry point for NPVE rebuild batches. It reduces repeated reading without weakening the operator loop.

## Files

- `rules.json` — canonical text of the agent rules, the record gate, standing rules 14 and 15, the sheet and comparison techniques, the proof convention, and every NPVE value with the schema record that decided it. CLAUDE.md and AGENTS.md point here; the contract folds it in and digest-checks it.
- `npve-contract.generated.json` — the executor's reading: rules.json plus the schema's ten standing batch rules, recent records, and open flags. A projection, never a second authority.
- `manifest.json` — planner-owned work queue. Risk tiers carry who proposed them and whether the operator approved them, with the operator's words quoted.
- `protocol.json`, `check-catalog.json`, `evidence-template.json`, `metrics.json` — roles and tiers, the deterministic-vs-visual check split, the evidence packet shape, and pilot measurements.

The register itself lives outside this directory as the append-only record store (record schemasplit_phase8_2026-09-08): `records/<workstream>/<date>/<recordId>.json` (immutable batch records), `flags/active.json` + `flags/resolved.json`, `foundation/<section>.json`, and the generated `indexes/record-index.json` + `indexes/current-state.json`. `design-system-schema.json` is generated from it by `scripts/schema/build-aggregate.js`. Concurrent batches write separate record files and never touch shared files except the generated indexes, which regenerate at commit.

## Start here

1. Run `node scripts/workflow/validate-workflow.js`.
2. Read `workflow/npve-contract.generated.json` and the selected item in `workflow/manifest.json`.
3. Read the last completed record named by the work item: find its path in `indexes/record-index.json` (or `indexes/current-state.json` for the last record per workstream) and read that file. Open the full aggregate only when validation fails, a conflict appears, or the item explicitly requires historical context.
4. Record gate: the apply-*.js script calls `openRecord` in `scripts/schema/lib.js`, which refuses to create the item's `IN PROGRESS` record file while the previous record in the workstream is not DONE in `indexes/record-index.json`. If the previous batch has no record at all, stop and write a read-only state-check record instead.
5. Create the item's `IN PROGRESS` record file (openRecord regenerates the aggregate and indexes), regenerate the contract, and run `start-batch.js`. An unapproved tier needs `--confirm="<the operator's exact words for this item>"`.
6. Run `check-batch.js` immediately before each Figma mutation and before finalizing the record.
7. After finalizing (a finalize-*.js script calling `finalizeRecord`; only an IN PROGRESS record can be rewritten), archive the batch proofs per the proof convention, regenerate the contract, and run `finish-batch.js`. Commit the record file together with the regenerated `design-system-schema.json`, `indexes/` and contract.

## Commands

```text
node scripts/schema/build-aggregate.js [--check]
node scripts/schema/validate-split.js
node scripts/schema/self-test.js [scratchDir]
node scripts/workflow/generate-contract.js
node scripts/workflow/validate-workflow.js
node scripts/workflow/lock-risk.js <item-id> <approver> "<verbatim operator approval>"
node scripts/workflow/start-batch.js <item-id> <executor> [provider] [model] [reasoning] [--confirm="<operator quote>"]
node scripts/workflow/check-batch.js <item-id>
node scripts/workflow/finish-batch.js <item-id>
node scripts/workflow/stop-batch.js <item-id> <reason>
node scripts/workflow/measure-context.js
```

Risk classification is planner/operator-owned. A tier is approved only when the operator's approval is quoted verbatim in the manifest; `lock-risk.js` refuses to run without the quote. The lock covers the tier, reasons, proposer, approval, oversight, stop condition, file allowlist, required evidence, and expected record. The executor cannot change those fields without invalidating the run.

The visual floor is not compressible: every component gets its own comparison render, the executor inspects it, and the operator sees it before the next medium/high-risk item or at the agreed low-risk checkpoint.

Provider and model names are optional provenance only. Any Anthropic, OpenAI, open-weight, or future model can follow this protocol if it has the capability tier required by the work item.
