# Phase 8 — split the monolithic schema into append-only records

Batch: `schemasplit_phase8_2026-09-08` · Record: `records/workflow/2026-09-08/schemasplit_phase8_2026-09-08.json` (the first record written into the new structure) · Executor: Claude (Anthropic claude-fable-5-1) · Repo writes only; no Figma reads or writes.

Status: DONE with one decision open (backup policy, step 5). Every step proved equivalence before the next; no stop condition fired.

## Outcome

`design-system-schema.json` (1,418,713 bytes, 105 top-level keys) is now generated from an append-only record store. Nothing was dropped or rewritten: every record and flag is stored verbatim with key order preserved, and the aggregate regenerated from the store is byte-identical to the pre-split original.

| Step | Result | Evidence |
|---|---|---|
| 1 Snapshot | Tag `schema-split-baseline-2026-09-08` at 3f9c01f; full backup `design-system-schema.backup-2026-09-08-pre-schema-split.json` (sha256 ec02a430…); counts and both indexes recorded | `baseline-counts.json` |
| 2 Structure | 13 foundation sections, 91 records, 227 + 58 flags migrated | commit da613e4 |
| 3 Aggregate | Regenerated aggregate byte-identical (`cmp` identical); 91/91 records and 285/285 flags identical; all count deltas 0 | `reconciliation.json` |
| 4 Tooling | Record gate, contract, freshness, validate-record, batch guards and apply-script convention read the store; validator suite PASS; dry-run write/read cycle PASS | commit ae9e6b2, `validator-suite.log`, `dry-run-store-cycle.log`, `validator-suite-final.log` |
| 5 Backup policy | Surfaced with three options and a recommendation; not changed; this batch backed up the old way | record `step5_backupPolicy` |
| 6 Docs | Contract (with the concurrency line), CLAUDE.md, AGENTS.md, OPERATORS.md, workflow/README.md, rules.json, check-catalog.json, meta pointer | commit 3 |
| 7 Commits | Three commits named per the plan's "Workflow: adopt append-only records" | below |

## Reconciliation counts

| Measure | Before (3f9c01f) | After step 3 | Delta | After batch close |
|---|---|---|---|---|
| Top-level aggregate keys | 105 | 105 | 0 | 106 (+ this record) |
| Foundation sections | 14 (13 files + flags) | 14 | 0 | 14 (meta gains a `register` pointer) |
| Records | 91 | 91 | 0 | 92 |
| Flags total | 285 | 285 | 0 | 285 |
| Flags active | 227 | 227 | 0 | 227 |
| Flags resolved | 58 | 58 | 0 | 58 |
| Aggregate bytes | 1,418,713 | 1,418,713 | 0 | 1,431,212 (record + pointer) |
| Byte-identical to original | — | yes | — | differs only by the record and the pointer |

Records by workstream folder: `records/npve` 61, `records/library` 25, `records/workflow` 5 (+1 for this record).

## Structure

```
foundation/<section>.json      13 sections; layout.json lists the 14 aggregate foundation keys in order
records/<ws>/<date>/<id>.json  one envelope per record: format, id, sequence, date, workstream, migration, record (verbatim)
flags/active.json              227 entries {sequence, flag}
flags/resolved.json             58 entries {sequence, flag}
indexes/record-index.json      generated: every record with path, status, content sha256; flag ids by status
indexes/current-state.json     generated: latest record, record gate state, per-workstream latest, aggregate digest
design-system-schema.json      generated aggregate (scripts/schema/build-aggregate.js)
```

Workstream folder rule: `npveRebuild_*` and `leanPilot_*` → npve; `libraryTodos_*` and every pre-NPVE library batch → library; `workflowRefactor_*`, `postPilot_*`, `docsOperatorsGuide_*`, `schemasplit_*` → workflow. Date rule: the record's `date` field, else the date in its id, else its position. One record needed the position rule and carries the only migration note: `navComponentsOnCompositionsPage` (no date anywhere), dated 2026-08-31 from the record before it.

Content identity: a record's identity is the sha256 of its compact JSON with key order preserved; the same for a flag. The envelope around each record and the `sequence` on each flag entry are the only additions structure forced.

## Flag classification

Flags never had a uniform status field (8 of 285 carry `status`). The split uses one recorded rule, stored in both flag files and in the index:

> resolved when `status` starts with CLOSED, RESOLVED, SUPERSEDED or RETRACTED, or `resolution` (not starting REOPENED), `resolvedBy`, `resolved`, `superseded`, `addressedBy` or a `withdrawn_*` field is present, or `handling` starts with Resolved / contains RESOLVED; a `status` starting with REOPENED forces active.

| Trigger | Resolved flags |
|---|---|
| `resolution` field | 24 (including the two "Marked 2026-09-05: GAP marker …" entries, which record the marker as the resolution) |
| `handling` Resolved/RESOLVED | 25 |
| `superseded` | 8 |
| `status` CLOSED/RESOLVED/SUPERSEDED/RETRACTED | 6 |
| `withdrawn_2026_09_06` | 2 |
| `addressedBy`, `resolved` | 1 each |

Several flags match more than one trigger; 58 distinct. Kept active on purpose: `coverInventoryStale` (status REOPENED 2026-08-04 despite a `resolution` field), the eight `npveWorkflows_*` flags that carry only a `decision_2026_09_06` pointer, and every flag whose handling says "Reported, not resolved". The classification is a projection; no flag was edited. Per-flag results are in `baseline-counts.json` (`flagIndex[].classification`, `classifiedBy`) and `reconciliation.json`.

## Tooling (step 4)

- `scripts/schema/lib.js` — the store: `loadStore`, `buildAggregate`, `openRecord` (record gate against the index; refuses duplicates and foundation keys; appends a file; regenerates), `finalizeRecord` (IN PROGRESS only; everything else is immutable), `appendFlags`, `resolveFlag`, `fingerprint` / `compareFingerprint`, `checkFreshness`.
- `scripts/schema/build-aggregate.js [--check]`, `validate-split.js`, `reconcile-aggregate.js`, `snapshot-baseline.js`, `migrate-split.js` (one-shot; refuses to run twice), `self-test.js` (dry run on a scratch copy).
- `scripts/workflow/*` — `generate-contract.js` v3 refuses a stale aggregate and digests the store; `validate-contract.js` checks store digests and freshness; `validate-workflow.js` runs `validate-split` first; `validate-record.js` reads the record file; `start-batch.js` fingerprints everything the batch does not own; `check-batch.js` and `finish-batch.js` compare it (an appended record file or flag from another batch is an addition, an edit to anything present at start is a violation); `finish-batch.js` implicitly allows the owned record file, the flag stores and the generated files.
- `.gitattributes` pins the store, the generated files, `workflow/*.json` and `scripts/**/*.js` to LF, closing the CRLF-checkout hazard that staled contract digests before.
- Legacy `apply-*/finalize-*/amend-*` scripts (90 files) still write the aggregate directly. They are history; re-running one would be caught by `validate-split` (stale aggregate, changed DONE record).

Validator suite on the final state (`validator-suite-final.log`): store PASS (92 records, 91 immutable against HEAD), workflow PASS, workflow self-test PASS, record + evidence PASS for all six manifest items, generated files fresh, measure-context 92.8% reduction (target met). Dry-run cycle (`dry-run-store-cycle.log`): open with gate, duplicate refused, second record refused while the first is IN PROGRESS, read back through aggregate and store, flag appended then resolved, fingerprint tolerates own appends and catches an edit to an older record, finalize once then refused as immutable, hand edit to the aggregate detected and repaired.

## Decision for the operator (step 5) — backup policy

Standing rule 7 (full-schema backup before every batch) stands. This batch took its backup the old way. The question, surfaced not decided:

| Option | Tradeoffs |
|---|---|
| A — keep per-batch full backups | No policy change; the recovery path every past record describes. Costs 1.4 MB per batch, 89 near-duplicate files already in the root, and the copy is of the generated aggregate, not of the store that is edited. |
| B — immutable records + git + milestone snapshots (recommended) | Recovery is git: every record file is committed and never rewritten, `validate-split` refuses a changed DONE record, and a tag marks each milestone. Costs: recovery depends on committing at batch close (OPERATORS.md already requires it); an uncommitted tree has no backup until committed; rule 7 text and the apply-script template change. |
| C — per-batch backup of the store (transitional) | Backs up what is edited (a tag or zip of records/, flags/, foundation/ before each batch). Still one artefact per batch; a tag only helps if committed; a zip is not diffable. |

Recommendation: B, with the finish gate creating a milestone tag at every batch-closing commit, after Daniel confirms. Until then A stands and every apply script keeps copying the aggregate first. If B, the changes are: rules.json agent rule 7 and record gate text, CLAUDE.md Recording, the apply template, all in a new record.

## Findings

- GAP 0. DEFECT 0. DECISION 1 (backup policy). PROCESS 0. No flag added.
- Reported, not resolved: `flags/active.json` is the one shared file a batch may append to besides the generated files. The contract line reads exactly as instructed ("never touch shared files except the generated indexes"); the guards treat an appended flag as an addition. If the operator wants flags record-embedded and projected instead, that is a follow-up.
- Reported: the manifest item `npve-module-chip-fix-2026-09-08` is complete with tier approval `unapproved`; it ran on a per-item confirmation. Unchanged by this batch.

## Docs changed (step 6)

CLAUDE.md (Where truth lives, Lean startup, Recording) · AGENTS.md (register and authority sentences) · OPERATORS.md ("The record store is the memory", commit line) · workflow/README.md (store paragraph with the concurrency line, steps 3–5 and 7, commands) · workflow/rules.json (purpose, recordGate, agent rules 1 and 7, each citing this record) · workflow/check-catalog.json (recordCompleteness, freshness, concurrency, citations, new immutability) · foundation/meta.json `register` pointer from the legacy aggregate to the store (the one foundation edit, made after step 3 proved equivalence) · contract v3 `recordStore` section: "Concurrent batches write separate record files and never touch shared files except the generated indexes, which regenerate at commit."

## Commits (step 7)

| Commit | Subject |
|---|---|
| da613e4 | Workflow: adopt append-only records (1/3) — snapshot, migrate, prove the aggregate |
| ae9e6b2 | Workflow: adopt append-only records (2/3) — point the gates, contract, and validators at the store |
| (the commit adding this report) | Workflow: adopt append-only records (3/3) — docs, contract line, Phase 8 record |

Tag: `schema-split-baseline-2026-09-08` → 3f9c01f.

## Evidence files

`baseline-counts.json`, `reconciliation.json`, `validator-suite.log`, `dry-run-store-cycle.log`, `validator-suite-final.log`, this report. No screenshots: a repo-only batch has no render to inspect.

## Schema record summary

`schemasplit_phase8_2026-09-08` (records/workflow/2026-09-08/): DONE; step1_snapshot, step2_structure, step3_reconciliation, step4_tooling, step5_backupPolicy (options A/B/C, recommendation B, owner Daniel), step6_docs, step7_commits, reconciliation, decisionsForOperator, findings GAP 0 / DEFECT 0 / DECISION 1, flagsBefore = flagsAfter = 227 active + 58 resolved, figmaMutations none. Opened by `apply-schemasplit-phase8-2026-09-08.js` (backup verified against the baseline tag), closed by `finalize-schemasplit-phase8-2026-09-08.js`.
