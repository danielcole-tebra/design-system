# Risk tier approval — report

Status: DONE. Record `workflowRefactor_tierApproval_2026-09-08` (backup `design-system-schema.backup-2026-09-08-pre-workflow-tier-approval.json`). Repo writes only; no Figma file opened.

## The approval

Daniel (operator), 2026-09-08, in chat: "I approve the risk tiers as proposed: low, medium, high, human-decision, with the definitions in the manifest."

Read as approving the four risk classes and the tiers proposed for the three PMHx items (row low, section low, body medium). Recorded verbatim in the schema record, in `workflow/protocol.json`, and on each manifest item.

## Two facts the wording did not match

1. The definitions live in `workflow/protocol.json`, not the manifest. The manifest now carries a `riskClasses` pointer to that file.
2. The runtime defined only three classes. The fourth, human-decision, was in the 2026-09-08 plan and is now in `protocol.json`: multiple defensible design choices remain; the item cannot start; the executor presents options with a recommendation and stops for the operator.

## Changes

- `workflow/protocol.json`: human-decision class and oversight; the approval quoted.
- `workflow/manifest.json`: riskClasses pointer; all three items `approval.status: approved`, `retroactive: true`, `approvedBy: Daniel (operator)`, quote verbatim; locks recomputed.
- `scripts/workflow/lock-risk.js`: `--retroactive` records an operator approval on a complete item without changing its status.
- `scripts/workflow/validate-manifest.js`: accepts human-decision and refuses to let such an item be queued, active, or complete.
- `scripts/workflow/start-batch.js`: refuses to start a human-decision item.
- `workflow/rules.json` rule 11 names the four classes; contract regenerated.
- Records: closeout `tierApproval.status` updated; the three PMHx records' `risk.approval.status` updated.

## Validation

Manifest, self-test, contract and workflow validators pass; output in the commit.

GAP 0. DEFECT 0. DECISION 0.
