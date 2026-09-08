# Lean design-workflow runtime

This directory is the compact, provider-neutral entry point for NPVE rebuild batches. It reduces repeated reading without weakening the operator loop.

## Start here

1. Run `node scripts/workflow/validate-workflow.js`.
2. Read `workflow/npve-contract.generated.json` and the selected item in `workflow/manifest.json`.
3. Read the last completed record named by the work item. Open the full schema only when validation fails, a conflict appears, or the item explicitly requires historical context.
4. Create the item's `IN PROGRESS` schema record, regenerate the contract, and run `start-batch.js`.
5. Run `check-batch.js` immediately before each Figma mutation and before finalizing the record.
6. After finalizing, regenerate the contract and run `finish-batch.js`.

## Commands

```text
node scripts/workflow/generate-contract.js
node scripts/workflow/validate-workflow.js
node scripts/workflow/lock-risk.js <item-id> <planner-or-operator>
node scripts/workflow/start-batch.js <item-id> <executor> [provider] [model] [reasoning]
node scripts/workflow/check-batch.js <item-id>
node scripts/workflow/finish-batch.js <item-id>
node scripts/workflow/stop-batch.js <item-id> <reason>
```

Risk classification is planner/operator-owned. The lock covers the tier, reasons, oversight, stop condition, file allowlist, required evidence, and expected record. The executor cannot change those fields without invalidating the run.

The visual floor is not compressible: every component gets its own comparison render, the executor inspects it, and the operator sees it before the next medium/high-risk item or at the agreed low-risk checkpoint.

Provider and model names are optional provenance only. Any Anthropic, OpenAI, open-weight, or future model can follow this protocol if it has the capability tier required by the work item.
