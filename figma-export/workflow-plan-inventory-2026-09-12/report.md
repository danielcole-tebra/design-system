# Plan and inventory E: durable plan.md and inventory.json per batch

Repository-only batch, 2026-09-12, no Figma call. Record `workflow_planInventory_2026-09-12` (records/workflow/2026-09-12/), opened by `apply-workflow-plan-inventory-2026-09-12.js`, closed by `finalize-workflow-plan-inventory-2026-09-12.js`, both scaffolded by `node scripts/schema/new-record-scripts.js` together with this batch's own `plan.md`. Risk low: the last of the batches deferred by `workflow_sessionEconomy_2026-09-12`, commissioned by the operator at session start ("Batch E: durable plan.md and inventory.json per batch. The planner writes its phase checklist to figma-export/<batch>/plan.md, required for every batch by the finish gate. A Figma batch saves its page inventory to figma-export/<batch>/inventory.json on the first walk; later checks read that file to choose what to look at and re-verify the nodes they will mutate by id, name, type and parent before the first write, never treating the file as evidence (rule 3). inventory.json is required by the finish gate for Figma batches and absent for repository-only ones. Add both to the scaffold, with self-tests. Lean start."). The executor did not change the tier.

## Outcome

All three deliverables are in place and validated. This record is the first opened against its own `plan.md`; the gate refused the first attempt because the scaffold's explanatory sentence contained the word TODO, which is the template bug described under findings, fixed before the record opened.

1. **plan.md, required by every gate.** `scripts/workflow/batch-files.js` reads the planner's phase checklist beside the report. `apply` and `start-batch.js` refuse to open or start without it, or with an unfilled placeholder; `checkpoint` keeps it parseable; `close`, the runner closeout and `finish-batch.js` refuse an open phase. A phase is `- [ ]` open, `- [x]` done, or `- [-] …: why` dropped.
2. **inventory.json for Figma batches, absent for repository-only ones.** `F.inventory` in `scripts/figma/helpers.js` walks the target pages read-only to a bounded depth; `scripts/figma/inventory.js` saves the first walk once, lets a later check `select` candidates by page, type, name, parent or id, builds the `reverify` script for the nodes a body will mutate, and records the readback. `F.reverify` reads each node back by id, name, type and parent before the body runs and fails on drift; every creator refuses to write until that check passed. `check-batch.js` refuses a mutation until the latest recorded reverification is clean; `close` and `finish` require it once the record lists mutations. A repository batch with an inventory is refused. The file states its own authority: a dated candidate list, never evidence.
3. **Scaffold and self-tests.** `new-record-scripts.js` takes `--kind figma|repository` (default by workstream) and `--target`, writes `plan.md` from a phase template beside the apply/finalize pair, declares `batchKind`, `plan` and `inventory` in the apply body, and writes `inventory-walk.figma.js` for a Figma batch. Three new self-tests and two extended ones cover the gate per stage, the inventory round trip on the Plugin API double, the scaffold, and the record helpers; `preflight` runs them.

## What changed

| File | Change |
|---|---|
| scripts/workflow/batch-files.js | new: `parsePlan`, `validatePlan`, `validateInventory`, `batchKind`, `validateBatchFiles` (stages open, checkpoint, mutation, close, finish), `assertBatchFiles`, `describe`; CLI `node scripts/workflow/batch-files.js <record-id \| item-id> [stage]` |
| scripts/schema/record-scripts.js | `apply` runs the gate at open (batchKind declared, plan present and placeholder-free); `checkpoint` and `close` run it after the ceiling check; report path resolved with `path.resolve`; three self-tests added to `DEFAULT_SELF_TESTS` |
| scripts/workflow/start-batch.js, check-batch.js, finish-batch.js | the gate at open, before a mutation and at finish; the PASS lines report kind, plan and inventory |
| scripts/workflow/runner/closeout.js | the gate at close inside its `finalizeRecord` mutate, after the ceiling check |
| scripts/figma/helpers.js | `F.inventory(pageIds, depth)`, `F.reverify(expected, { soft })`, `F.reverified`; `writable()` refuses until a composed script's reverify passed; `prelude`/`compose` accept `reverify` |
| scripts/figma/inventory.js | new: `walkScript`, `fromWalk`, `save`, `addWalk`, `load`, `select`, `expectations`, `reverifyScript`, `recordReverification`, `target`; CLI `walk \| save \| select \| reverify \| record` |
| scripts/figma/double.js | new: the in-memory Plugin API double moved out of helpers-self-test.js so the inventory and scaffold self-tests can run composed scripts; pages carry `loadAsync` |
| scripts/schema/new-record-scripts.js | `--kind`, `--target`; `planTemplate`; writes plan.md and the walk script; apply body declares `batchKind`, `plan`, `inventory`; finalize template carries `figmaMutations` |
| scripts/workflow/batch-files-self-test.js | new: plan parsing and validation, inventory validation, kind resolution, the gate per stage (five stages) |
| scripts/figma/inventory-self-test.js | new: walk script on the double, save/load/select, reverify script and recorded results, later walks, CLI round trip (six stages) |
| scripts/schema/scaffold-self-test.js | new: figma and repository pairs, plan.md, walk script run on the double, refusals, templates (four stages) |
| scripts/schema/record-scripts-self-test.js | stage 1b (kind and plan at apply), stage 5 (open phase and unreasoned drop at close), stage 6b (a Figma record: inventory at close, clean reverification once mutations are listed) |
| scripts/figma/helpers-self-test.js | uses double.js; stages 9 to 11 (inventory walk, reverify, composition with reverify and the write guard) |
| workflow/check-catalog.json | `deterministic.planChecklist`, `deterministic.pageInventory` (21 deterministic checks); `batchFiles` policy (appliesFrom 2026-09-12, kinds, gates, scaffold) |
| workflow/rules.json | notes on agent rules 2 and 3; standing rule 16 states the new body keys and the scaffold's plan.md; source records extended |
| CLAUDE.md | Recording: one sentence on plan.md, inventory.json and the scaffold (13,101 bytes, ceiling 16,000) |
| workflow/README.md | steps 4, 5 and 7; six commands added or extended |
| workflow/npve-contract.generated.json | regenerated (rules, CLAUDE.md and store digests; 31 cited records verified) |
| apply-/finalize-workflow-plan-inventory-2026-09-12.js | this batch's pair, scaffolded |
| records/workflow/2026-09-12/workflow_planInventory_2026-09-12.json | new record: 4,929 bytes at open, 14,427 bytes DONE (headroom 17,573 under the 32,000 ceiling) |
| indexes/, design-system-schema.json | regenerated by apply and close |
| figma-export/workflow-plan-inventory-2026-09-12/ | plan.md, this report, startup-this-session.json, scaffold-demo/ (a Figma-kind scaffold with a synthetic inventory round trip on the double; see its README) |

## The gates

| Stage | Where | plan.md | inventory.json (Figma batch) | Repository batch |
|---|---|---|---|---|
| open | `apply`; `start-batch.js` | present, names the record, at least one phase, no placeholder; `batchKind` declared | not required yet (the first walk follows the open) | inventory.json must not exist |
| checkpoint | `checkpoint` | still parseable, no placeholder | not checked | same |
| mutation | `check-batch.js` | as at open | present, valid, latest recorded reverification clean | same |
| close | `close`; runner closeout | every phase `[x]` or `[-] …: why` | present and valid; latest reverification clean once the record lists mutations (`figmaMutations` or `validation.figmaMutations`) | same |
| finish | `finish-batch.js` | as at close | as at close; `fileKey` must equal the manifest item's target | same |

The gate applies to records dated on or after `batchFiles.appliesFrom` (2026-09-12), the same mechanism as the record ceiling; an older record is noted on the PASS line, not refused, so the stopped Flowsheets batch (dated 2026-09-11) can still resume and close. In `checkpoint` and `close` the ceiling check runs first, so an over-ceiling body reports the ceiling whatever the plan says.

**Batch kind.** `record.batchKind` is the planner's declaration. Without one, a manifest item with `target.fileKey`, or a record listing Figma mutations, is a Figma batch; anything else is repository-only. A declaration that contradicts the target or the mutations is refused rather than guessed.

## plan.md

```
# <recordId> plan

Record: <recordId>
Kind: figma | repository
Evidence: figma-export/<batch>
Stop condition: <one line>

## Phases

- [ ] open phase
- [x] done phase
- [-] dropped phase: why
```

The scaffold's template pre-fills the phases every batch shares (lean start, self-tests and validator, report, close and commit) and, for a Figma batch, the inventory walk, mappings, the re-verify before the first write, a milestone placeholder and the comparison render. `Record:` must name the record; `Kind:` must agree with `batchKind` when present; any line carrying the word TODO blocks `apply`; a dropped phase must say why after a colon.

## inventory.json

Shape (`tebra.design-page-inventory` version 1): `fileKey`, `capturedAt`, `capturedBy`, `skipInvisibleInstanceChildren` (must be `false`, standing batch rule 4), `authority` (must say the file is not evidence), `pages[] { id, name, children }`, `nodes[] { id, name, type, parent, page, depth, visible }`, `walks[]`, `reverifications[] { at, script, verified[], mismatched[], missing[] }`.

Lifecycle for a Figma batch, all from the evidence folder:

1. `node scripts/figma/inventory.js walk <dir> [--target npve] [--depth 2] [--pages …]` writes `inventory-walk.figma.js` (the scaffold already wrote one); run it with `use_figma`, save the return as JSON.
2. `node scripts/figma/inventory.js save <dir> <result.json>` writes `inventory.json` once; a later walk goes through `addWalk` so the first stays on record.
3. `node scripts/figma/inventory.js select <dir> --type … --name … --page …` lists candidates to look at.
4. `node scripts/figma/inventory.js reverify <dir> <id,id,…>` writes `inventory-reverify.figma.js`; run it with `use_figma` before the first write. The composed script re-reads each node by id and compares name, type and parent id; drift fails the script before its body runs, and the helpers' creators refuse to write in any script whose reverify did not pass.
5. `node scripts/figma/inventory.js record <dir> <result.json>` appends the readback. `check-batch.js` then lets the mutation through; `close` and `finish` require the latest entry to be clean.

A mutation script composes with `reverify: expectations` so the check and the write happen in the same call; `expectations` come from the inventory, the check from Figma.

## Self-tests

| Script | Covers |
|---|---|
| scripts/workflow/batch-files-self-test.js | plan parsing and every refusal; inventory validation field by field and the latest-reverification rule; kind declared, inferred and contradicted; the gate per stage for a repository and a Figma batch, derived and declared paths, exemption before appliesFrom |
| scripts/figma/inventory-self-test.js | walk script on the double with the target guard; save once, load, authority; select and expectations; reverify script clean and drifted, recorded and gated; addWalk; the five CLI commands through files |
| scripts/schema/scaffold-self-test.js | a Figma pair with plan.md (eight open phases, the placeholder the gate refuses) and a walk script that runs against the target guard; a repository pair; overwrite, kind, date and previous refusals; explicit kind and target |
| scripts/schema/record-scripts-self-test.js | apply refuses an undeclared or wrong kind, a missing plan, a placeholder or wrong kind in the plan, a repository inventory; close refuses an open phase and an unreasoned drop; a Figma record opens without an inventory, close needs it, and a clean latest reverification once mutations are listed |
| scripts/figma/helpers-self-test.js | inventory walk to a bounded depth with pages loaded first; reverify telling clean, renamed, re-parented and missing nodes apart in strict and soft mode; composition with reverify in the prelude, creators refusing until it passed, drift stopping the script before any write |

All eleven self-tests pass (`preflight` runs them again at close and records each exit).

## Validation

- `workflow PASS store=114r/236+60f contract=f460497cd12d items=15 deterministic=21 visual=3 lean=116834/128000 inProgress=npveRebuild_flowsheetsFinish_2026-09-11,workflow_planInventory_2026-09-12` (after the record opened and the contract regenerated; the close body carries the line measured by `preflight`).
- After close and the final contract regeneration: `workflow PASS store=114r/236+60f contract=3ead8e4fe88f items=15 deterministic=21 visual=3 lean=124068/128000 inProgress=npveRebuild_flowsheetsFinish_2026-09-11`. The lean set rose from 116,834 to 124,068 bytes because this DONE record (14,427 bytes) is now the largest latest record per workstream; 3,932 bytes of headroom remain under the 128,000 target, so the next workflow record should stay under about 18,000 bytes or move bulk to its report.
- `ceilings PASS`; CLAUDE.md 13,101 of 16,000 bytes.
- `close` refused the first finalize because the close body's outcome and first decision quoted the word the placeholder detector matches; reworded, then finalized on the second run with all eleven self-tests passing inside `preflight`.
- `node scripts/workflow/batch-files.js workflow_planInventory_2026-09-12 checkpoint` → `batch files PASS … kind=repository plan=figma-export/workflow-plan-inventory-2026-09-12/plan.md`.
- Canvas: N/A. No Figma call of any kind this session; the inventory tooling ran only on the in-memory double. Its first live use is the next design batch, which reads back per the execution policy.
- Screenshots: N/A, nothing rendered.

## Startup accounting (standing rule 16)

Measured by `scripts/workflow/measure-startup.js` into `startup-this-session.json`: **22 calls and 225,038 result bytes** before the first task action (call 23, the Write of `scripts/workflow/batch-files.js`).

| Calls | Bytes | What |
|---|---|---|
| 1 to 6 | 105,282 | the lean set: the validator line; the contract (a `cat` that persisted to a tool-result file, then two page reads of that file: 2,197 + 64,009 + 18,801 bytes for a 76,948-byte contract); the manifest item list and the matched item by projection; the Batch D record |
| 7 to 22 | 119,756 | the tooling the approved work changes, named per rule 16: the scripts tree and sizes with an inventory grep; the scaffold, finish-batch, check-batch, start-batch, validate-evidence, validate-workflow and workflow lib in full; record-scripts.js, helpers.js and their two self-tests in full (all four edited); the catalog by projection; the execution template; closeout's finalize block; rules.json anchors; the previous report head, measure-startup's usage, README sections; the Flowsheets page-snapshot head and execution milestones |

Over the 128,000 lean target because the tooling reads were the work, as in Batch D (139,284 bytes). Two avoidable costs: reading the contract through `cat` plus a persisted file cost about 8,000 bytes more than a scoped `node -e` projection of the sections needed, and the manifest item regex matched the wrong item (module chip fix) before the Batch E work was recognised as a workflow batch without a manifest item.

## Findings and decisions for the operator

GAP 0, DEFECT 0, DECISION 4.

1. **Template bug caught by the gate.** The scaffold's plan template said "The gates refuse a TODO at open", and the placeholder detector matched that sentence, so the first `apply` of this record was refused. Reworded to "an unfilled placeholder" in the template and in this batch's plan; the scaffold self-test still expects the placeholder phase to be refused. No decision needed; recorded because the gate proved itself on its own batch.
2. **Gating by record date, not run version.** The gate applies to records dated on or after 2026-09-12, like the record ceiling, so the stopped Flowsheets batch (record dated 2026-09-11) resumes and closes without a plan or inventory; its gate lines say so. Confirm, or ask that the resumed batch adopt a `plan.md` before it continues.
3. **Kind for manifest items.** A manifest item with `target.fileKey` is a Figma batch. The manifest has no repository-only item today; if one appears, the planner declares `batchKind: repository` in the record and the item carries no target. Whether the manifest should carry an explicit kind field is a planner decision.
4. **Rule wording.** Agent rules 2 and 3 gained notes and standing rule 16 states the new body keys and the scaffold's plan.md, all citing this record; the canonical text is `workflow/rules.json`. Confirm or reword.

Carry-over, unchanged from Batches A, C and D: the stopped Flowsheets batch still holds untracked files and uncommitted edits to `flags/active.json` and `workflow/manifest.json`; preserved, not committed. This commit's regenerated indexes and contract digest that working tree.

## Evidence folder

- `plan.md` — this batch's phase checklist, every phase resolved at close
- `report.md` — this file
- `startup-this-session.json` — measure-startup output
- `scaffold-demo/` — `node scripts/schema/new-record-scripts.js --kind figma` for a demo record id: the apply/finalize pair (never run; their placeholders are what `apply` refuses), `evidence/plan.md` (eight phases), `evidence/inventory-walk.figma.js`, and a synthetic round trip on the Plugin API double saved as `inventory.json`, `inventory-reverify.figma.js` and the two `*.synthetic.json` results; `evidence/README.md` says so
