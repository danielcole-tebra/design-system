# Backup policy B — immutable records, git, milestone tags

Batch: `backupPolicyB_2026-09-08` · Record: `records/workflow/2026-09-08/backupPolicyB_2026-09-08.json` · Executor: Claude (Anthropic claude-fable-5-1) · Repo writes only; no Figma reads or writes.

Status: DONE. Decides step 5 of `schemasplit_phase8_2026-09-08`.

## Operator decision (verbatim)

> Backup policy B: immutable records, git, and milestone tags — milestones at each workstream close or weekly, whichever comes first.

Daniel (operator), 2026-09-08, in the Phase 8 session after the schema-split report. Quoted in the record under `operatorDecision`.

## What changed

| Area | Change |
|---|---|
| Rule text | `workflow/rules.json` agent rule 7: no per-batch copy of the aggregate; the backup is the committed record files plus a milestone tag at each workstream close or weekly, whichever comes first. Note cites this record. Record gate untouched. |
| Tooling | `scripts/schema/milestone.js "<reason>"` creates an annotated `milestone/<date>-<slug>` tag on a clean, validated, committed tree; `--status` prints the latest milestone and its age. `scripts/schema/validate-split.js` fails when no milestone exists or the latest is older than seven days, so validate-workflow, finish-batch and the contract validator inherit the check. `workflow/check-catalog.json` gains `milestone` (17 deterministic checks). |
| Contract | `recordStore.backupPolicy` line; final operating-loop step names the milestone. |
| Docs | CLAUDE.md Recording, OPERATORS.md commit line ("the commit is the backup"), workflow/README.md commands. |
| Apply-script convention | `apply-*.js` no longer copies the aggregate; `openRecord` is the first write. |
| Last old-style backup | `design-system-schema.backup-2026-09-08-pre-backup-policy-b.json`, taken before the change because rule 7 as it stood required it. The 90 historical backup files stay as history (additive only). |

## Commits and tags

| Item | Value |
|---|---|
| Record commit | 5fccc84 — Workflow: adopt backup policy B — immutable records, git, milestone tags |
| First milestone | `milestone/2026-09-09-backup-policy-b-adopted` → 5fccc84 (workstream close for the schema-split and policy batches) |
| Follow-up commit | the commit adding this report and the local-date fix below |

Discrepancy, reported not resolved: the record's `firstMilestone` field names the tag `milestone/2026-09-08-…`, but the script used the UTC date and created `milestone/2026-09-09-…` (the batch ran late evening local time). The record is DONE and immutable, so it is not edited; this report and the follow-up commit carry the correction, and `milestone.js` now uses the local date so future tags match record dates.

## Validation

`validator-suite.log`: milestone status 0 days old; store PASS (93 records, 93 immutable against HEAD, milestone present); workflow PASS (contract ac6f8c36…, 17 deterministic checks); workflow self-test PASS; generated files fresh.

## Findings

GAP 0. DEFECT 0. DECISION 0. PROCESS 0. No flag added. No screenshots: repo-only batch.

## Schema record summary

`backupPolicyB_2026-09-08`: DONE; operatorDecision (quote, date, what it decides, which rule it changes); lastOldStyleBackup; policy (backup, milestones, enforcement, perBatchBackup); changes (rules, tooling, contract, docs, applyScriptConvention); firstMilestone; findings all zero; flags 227 + 58 unchanged; figmaMutations none. Opened by `apply-backup-policy-b-2026-09-08.js`, closed by `finalize-backup-policy-b-2026-09-08.js`.
