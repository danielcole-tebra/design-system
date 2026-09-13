# Flowsheets resume tooling F: a supported source-gate treatment and resume-batch.js

Repository-only batch, 2026-09-12, no Figma call. Record `workflow_flowsheetsResume_2026-09-12` (records/workflow/2026-09-12/), opened by `apply-workflow-flowsheets-resume-2026-09-12.js`, closed by `finalize-workflow-flowsheets-resume-2026-09-12.js`, both scaffolded by `node scripts/schema/new-record-scripts.js` with this batch's `plan.md`. Risk low, assigned by the operator in the commissioning message ("Batch F: Flowsheets resume tooling. Repository-only, risk low, one record, one commit. Lean start."). The executor did not change the tier.

Before this record opened, the stopped Flowsheets state was committed on its own as `5be9df8`, exactly as asked: the IN PROGRESS record `npveRebuild_flowsheetsFinish_2026-09-11`, `apply-npve-flowsheets-finish.js`, `figma-export/npve-flowsheets-finish-2026-09-11/`, the blocker flag in `flags/active.json` and the stopped item in `workflow/manifest.json`. Nothing else. Beyond that commit the Flowsheets batch was not touched.

## Outcome

Both deliverables are in place, each with a self-test, and the checks are catalogued and named in the rules.

1. **Source-gate treatment for a read-only source set Figma cannot read.** `scripts/workflow/source-definitions.js` states the evidence the gate accepts when `componentPropertyDefinitions` throws on the owning set (the Flowsheets case: set `129:6647` in `zVsuhYehoSLLq880qRBFkq` answers "in get_componentPropertyDefinitions: Component set has existing errors"): the exact Figma error quoted, the set's identity (id, name, type, parent, page) and geometry, every variant child's name and `variantProperties`, and the used variant matched by those properties, uniquely. `validate-execution.js` accepts a control marked `definitions: "unreadable at source"` only under those checks, only for the manifest item's read-only source file, with a flag in the register naming the set; a component that does read its definitions is refused with the marker, and the library component the rebuild uses is verified exactly as today. The runner's read program quotes the error and reads the set instead of failing the read, its plan validation accepts that record on a source read only, a mutation stops on an unreadable target set, and the live readback comparison is exact on the quoted error and the variant list. No edit to the source, no substitute source, no skipped check.
2. **`resume-batch.js`.** `node scripts/workflow/resume-batch.js <item-id> <executor> --confirm="<operator go-ahead>"` resumes a stopped item in a fresh session. It requires the item and its run stopped, the record IN PROGRESS, `execution.json` valid at ready, the planner's risk lock unchanged, dependencies complete, no record that left IN PROGRESS changed since the start, and the quoted go-ahead; it refuses anything else and writes nothing until every check passes. Then it checkpoints the record through `record-scripts.js` quoting the operator, sets the run active with the store fingerprint and the pre-existing-files baseline refreshed and the resume appended (listing what other batches appended since the start), returns the item to `queued` (what an active run's item shows today: `start-batch.js` leaves it there, only stop and finish change it) with its stop kept on the item's resume history, and regenerates the contract. The batch-files gate runs at open and its line is reported; a record dated before 2026-09-12 is noted, not refused.

## What changed

| File | Change |
|---|---|
| scripts/workflow/source-definitions.js | new: `MARKER`, `ERROR_RE`, `sameProperties`, `unreadableErrors`, `matchVariant`, `unreadableNodeErrors`, `flagNamesSet`, `unreadableControlErrors` |
| scripts/workflow/validate-execution.js | a control with `definitions: "unreadable at source"` goes through `unreadableControlErrors`; every other control is checked exactly as before |
| scripts/workflow/runner/plugin.js | `snap` catches the definitions read on a source set and saves `definitionsUnreadable` (error, set with page and geometry, variants) plus the variant's `variantProperties`; a mutation fails on an unreadable target node before the identity comparison; `validatePlan` accepts `definitionsUnreadable` on a source read only, with the exact key and the shared checks |
| scripts/workflow/resume-batch.js | new: `resumeBatch(options, deps)`, `summary`, CLI; `ACTIVE_ITEM_STATUS = 'queued'` |
| scripts/workflow/validate-manifest.js | `validateManifestData(manifest)` exported beside `validateManifest()` so the resume self-test can validate a scratch manifest |
| scripts/workflow/source-definitions-self-test.js | new, 59 cases (below) |
| scripts/workflow/resume-batch-self-test.js | new, 17 cases on a scratch store and scratch workflow root (below) |
| scripts/schema/record-scripts.js | both self-tests added to `DEFAULT_SELF_TESTS` (thirteen) |
| workflow/check-catalog.json | `deterministic.sourceDefinitions`, `deterministic.batchResume` (23 deterministic checks) |
| workflow/rules.json | standing rule 16 and agent rule 9 name the resume command and cite this record; rule 9's note names the catalogued treatment |
| workflow/README.md | step 8 (resuming), three commands, the "read-only source set Figma cannot read" paragraph under component evidence |
| workflow/runner.md | step 2 and the configuration reference name `definitionsUnreadable` |
| CLAUDE.md | rule 16 brief names the resume command (13,297 bytes, ceiling 16,000) |
| OPERATORS.md | one-batch-per-session bullet names `resume-batch.js` and the operator's quoted go-ahead |
| workflow/npve-contract.generated.json | regenerated (32 cited records verified) |
| apply-/finalize-workflow-flowsheets-resume-2026-09-12.js | this batch's pair, scaffolded |
| records/workflow/2026-09-12/workflow_flowsheetsResume_2026-09-12.json | new record: 5,871 bytes at open |
| indexes/, design-system-schema.json | regenerated by apply, the stop checkpoint and close |
| figma-export/workflow-flowsheets-resume-2026-09-12/ | plan.md, this report, checkpoint-stop.js, startup-this-session.json, startup-batch-f-reads.json |

## The source gate, before and after

| Where | Before | Now |
|---|---|---|
| runner read program (`snap`) | `owner.componentPropertyDefinitions` threw and the read failed; the Flowsheets preflight stopped here | the throw is caught on the read; `definitionsUnreadable` carries the exact error, `set { id, name, type, parentId, page { id, name }, width, height }` and `variants [{ id, name, variantProperties }]`; a COMPONENT variant also carries its `variantProperties` |
| runner mutation | same read, same throw | any node with `definitionsUnreadable` in the target file fails the call before the identity comparison: "Definitions unreadable on <id> in the target file" |
| `validatePlan` | every COMPONENT/COMPONENT_SET needs `key` and `definitions` | on a read whose `fileKey` is not the plan's target, a node may carry `definitionsUnreadable` instead, with `key`, and it must pass `unreadableNodeErrors` (a COMPONENT belongs to the set and its properties equal the listed variant's; a COMPONENT_SET is the set itself); the target's mapped nodes still need `definitions` |
| `verifyReadback` | every expected key equal to the live value | unchanged, so the quoted error text and the variant list must match Figma exactly on every fresh read |
| `validate-execution.js` control | the snapshot component must carry `componentPropertyDefinitions` and every property must exist there | a control marked `definitions: "unreadable at source"` must name `fileKey` equal to the item's read-only source (never the target), quote `error` equal to the snapshot's, carry `properties` equal to exactly one variant's `variantProperties` (the mapped variant, not the set), and name a `flag` in the register that names the set; a snapshot component with readable definitions is refused with the marker; an unmarked control is checked as before |

Control entry shape, for the resumed Flowsheets session to write from a fresh read:

```json
{ "name": "Page=Clin_Flowsheets", "component": "939:9228", "fileKey": "zVsuhYehoSLLq880qRBFkq",
  "definitions": "unreadable at source",
  "error": "in get_componentPropertyDefinitions: Component set has existing errors",
  "flag": "npveFlowsheets_sourceDefinitionBlocker_2026-09-11",
  "properties": { "Page": "Clin_Flowsheets" }, "evidence": "figma-export/npve-flowsheets-finish-2026-09-11/source-set.json" }
```

The evidence file is a fresh readback saved as `{ "components": [...] }` whose entry for `939:9228` is the read program's `snap` output (id, name, type, parentId, key, width, height, `variantProperties`, `definitionsUnreadable`). The existing flag names the set as "set129:6647", which the register check matches by id.

## resume-batch.js

Order of checks, all before any write: usage; quoted go-ahead; contract fresh; manifest valid and the item `stopped` (not `human-decision`); dependencies complete; run present, version 3, `stopped`, belonging to the item; planner risk lock unchanged; record IN PROGRESS in the store; `execution.json` valid at ready; batch-files gate at open; store comparison against the run's fingerprint (a record that left IN PROGRESS changed or disappeared refuses; an open record checkpointed by its owner, a foundation section or a flag changed is listed under `changedSinceStart`; appends are listed under `appendedSinceStart`).

Writes, in order: the record checkpoint (`_status: "IN PROGRESS — RESUMED <date> (<previous status>)"`, `resumes[]` with the operator's quote, the run path, the stop, the appends and the execution's next action); the run (`status: active`, `resumedAt`, refreshed `storeFingerprint`, `schemaSha256` and `preexistingFiles`, `resumes[]` with provenance, confirmation, the stop, the appends and the checkpoint path; top-level `stoppedAt`/`stopReason` removed); the manifest item (`status: queued`, `resumes[]` with the quote and the stop, `stoppedAt`/`stopReason` removed; the risk lock is untouched); `generate-contract.js`.

Applied to the Flowsheets item as it stands, the command refuses today: its `execution.json` still carries the unresolved preflight failure. The resumed session first obtains the fresh source readback with the new read program, rewrites the source control as above, clears the unresolved entry with that evidence, and only then runs resume-batch with the operator's words. That is the intended order; the tool does not lift a stop whose blocker has no treatment in the checkpoint.

## Self-tests

| Script | Covers |
|---|---|
| scripts/workflow/source-definitions-self-test.js (59 cases) | the shared checks field by field; `matchVariant` (match, none, empty, ambiguous); node checks (variant, set, both records, readable, wrong parent, unlisted, disagreeing properties, wrong set id, wrong type); `validate-execution` accepting the marked control and refusing the target file, a missing source, a different error text, the other variant's properties, unknown or empty properties, a missing or unknown flag, a flag that does not name the set, the set mapped instead of the variant, an unknown component, the marker on a readable component, readable definitions or missing variants or geometry in the snapshot; an unmarked control and the library control checked as before; the read program on a double whose set throws (exact error, set with page and geometry, both variants, a readable set beside it read as before); `verifyReadback` exact on the error, the variants and the properties; stale identity still refused; the mutation refusing an unreadable target; `validatePlan` accepting the record on a source read and refusing it on the target, both records, missing definitions, missing variants, missing key, disagreeing properties |
| scripts/workflow/resume-batch-self-test.js (17 cases) | on a scratch copy of the store and a scratch workflow root: fourteen refusals that write nothing (missing quote or executor, item or run not stopped, old run format, run/item mismatch, changed risk lock, incomplete dependency, execution not ready, missing run, unknown item, record not IN PROGRESS, a changed DONE record, the batch-files gate on a 2026-09-12 record without its plan); the resume of a record dated before the gate (run active with confirmation, provenance, the stop and the appends; fingerprint refreshed to include the record and flag appended while stopped, owned record excluded; baseline holding the one unrelated dirty file; item queued with the stop on its resume history and the lock intact; record RESUMED quoting the operator; generated files fresh; a second resume refused); the resume of a gated Figma-kind record reporting kind, plan and inventory path, with the other batch's checkpoint listed as changed and not refused; the real store, manifest and runs untouched |

All thirteen self-tests pass; `preflight` runs them again at close and records each exit.

## Validation

- `workflow PASS store=115r/236+60f contract=1dc98aaef689 items=15 deterministic=23 visual=3 lean=119683/128000 inProgress=npveRebuild_flowsheetsFinish_2026-09-11,workflow_flowsheetsResume_2026-09-12` after the contract regenerated against the open record; the close body carries the line measured by `preflight`.
- `ceilings PASS lean=119683/128000`; CLAUDE.md 13,297 of 16,000. Before close the largest latest record was the Flowsheets record (8,302 bytes); this record closed at 15,509 bytes (headroom 16,491 under the 32,000 ceiling) and became the largest, and the regenerated contract grew to 84,496 bytes with the new rule text and this record's outcome in its recent records.
- After close and the final contract regeneration: `workflow PASS store=115r/236+60f contract=eccaa0344b35 items=15 deterministic=23 visual=3 lean=128376/128000 leanOverTarget inProgress=npveRebuild_flowsheetsFinish_2026-09-11`. The lean set is 376 bytes over its target. The catalog makes that a reported condition, not a failure, because the largest component is an immutable DONE record; the hard stops (CLAUDE.md, the contract, every manifest item, current-state, the record ceiling) all pass. Finding 4 below.
- `node scripts/workflow/batch-files.js workflow_flowsheetsResume_2026-09-12 open` → `PASS kind=repository plan=figma-export/workflow-flowsheets-resume-2026-09-12/plan.md`.
- Canvas: N/A. No Figma call; the read program ran only on an in-memory double whose set throws the recorded error text.
- Screenshots: N/A, nothing rendered.

## Startup accounting (standing rule 16)

Measured by `scripts/workflow/measure-startup.js` into `startup-this-session.json`. By the tool's definition the first task action was call 4, the Flowsheets commit the operator asked for first: **3 calls and 20,662 result bytes** before it (the validator line and git status, the pending diffs and untracked list, the index check and staging). The tooling batch's own first write was call 35 (plan.md): **34 calls and 444,048 result bytes** before it, itemised in `startup-batch-f-reads.json`.

| Calls | Bytes | What |
|---|---|---|
| 1 to 4 | 20,760 | lean start and the first commit: validator line, the Flowsheets diffs and evidence listing, the index check, the commit |
| 5 to 34 | 423,288 | the tooling the approved work changes, named per rule 16: the scripts tree; stop-, start-, check- and finish-batch, workspace-baseline, the workflow lib, validate-execution, npve-runner and runner core, plugin and handoff, the Flowsheets execution, blocker, run and .gitignore; the check catalog, ceilings, contract validator and self-test aggregator; rules.json in full (edited); the workflow README, AGENTS, protocol and policy greps; the Batch E apply, finalize, plan, record and report as the template; batch-files, record-scripts and the store library; the scaffold, closeout, target identity and the small validators; the execution, plugin, runner, record-scripts and store self-tests; the contract generator; the Flowsheets record, controls, run tail and manifest header; runner.md; measure-startup |

Over the target by a wide margin, as in Batches D and E, because the tooling reads were the work. Three avoidable costs, in bytes: two outputs over the tool's size cap persisted to files and were read again (about 6,600 bytes of notices plus the re-reads); the store library, handoff, the runner self-test and the contract generator were read whole when the work needed a few functions (about 50,000 bytes); and the contract itself was not read, because rules.json, its source, was the file being edited. The record was opened after those reads and the stop checkpoint mid-batch cost one small call.

## Findings and decisions for the operator

GAP 0, DEFECT 0, DECISION 4 (the record, closed before the final contract regeneration, counts 3; the fourth surfaced on the validator line after close).

1. **Resumed in the same session.** The operator asked to come to a stopping point after the first module; the record was checkpointed STOPPED and the contract regenerated. The operator then said "resume the work", so the batch continued in this session rather than a fresh one. Rule 16 says a stopped batch resumes in a fresh session; the operator's word governs here and is quoted in the close body. No decision needed; recorded.
2. **What counts as a change since the start.** `resume-batch.js` refuses when a record that has left IN PROGRESS changed or disappeared while the batch was stopped, and only reports a change to another batch's open record, a foundation section or a flag. `check-batch.js` still refuses any record change during the run window. Confirm this split, or ask that the resume refuse on any change.
3. **Item status after a resume.** The item returns to `queued`, which is what an active run's item shows today. If the manifest should show `active` for a running item, that is a change to `start-batch.js` as well and a planner decision; the validator already allows the value.
4. **Lean set 376 bytes over target.** After close the validator line reads `lean=128376/128000 leanOverTarget`: this DONE record (15,509 bytes) is the largest latest record and the contract grew by about 1,500 bytes of rule text and recent-record projection. The record is immutable, so the overage stands until a later DONE record or a smaller contract shifts the set. The rule text was not trimmed to meet the number. Either accept the overage as reported, or ask a later batch to shorten the parenthetical detail in standing rule 16 (about 400 bytes) with a record saying so.

The Flowsheets batch itself: still stopped, exactly as committed in `5be9df8`. Its resume needs, in this order, a fresh source readback with the new read program, the rewritten source control and a cleared unresolved entry in its `execution.json`, then `node scripts/workflow/resume-batch.js npve-flowsheets-finish <executor> --confirm="<operator go-ahead>"` in a fresh session. The weekly milestone tag is due by 2026-09-18 (latest: 2026-09-11).

## Evidence folder

- `plan.md` — this batch's phase checklist, every phase resolved at close
- `report.md` — this file
- `checkpoint-stop.js` — the mid-batch stop checkpoint at the operator's request
- `startup-this-session.json` — measure-startup output (first task action: the Flowsheets commit)
- `startup-batch-f-reads.json` — the calls before this batch's first write, itemised
