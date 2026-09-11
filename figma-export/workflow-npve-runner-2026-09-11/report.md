# Reusable NPVE workflow runner

Repository-only implementation from reference commit `50c680e`. No Figma calls, library publication, design batch, extra task or subagent. No historical Patient Summary files or DONE records were changed. GAP/DEFECT counts: not applicable to this tooling work; no new design findings.

## Delivered

- `scripts/workflow/npve-runner.js`: deterministic handoff, freshness, compilation, audit and usage CLI; opt-in file-backed execution bridge.
- `scripts/workflow/runner/core.js`: existing version-3 run/record/risk/checkpoint gates, fresh source/target readback verification, sequential dispatch, immediate check-batch, immutable attempts, persistent unresolved failures, compact receipts, additive property comparison and observed usage aggregation.
- `scripts/workflow/runner/plugin.js`: configuration-driven live-body/shell assembly, dedicated reference/change helpers, comparisons, additive preferred menus and guarded frozen-reference image insertion. Revalidates target pages, component keys, dimensions, defaults and hierarchy in the mutation call. Imports and uses tokens in the same call; no deletes or library writes.
- `runner/audit.js`, `runner/evidence.js`, `runner/closeout.js`: all-page/instance read-only collection, deterministic differences, incomplete-by-design report/evidence drafts, and existing finalize/contract/finish integration. Behavioral property checks and visual review remain executor work.
- `runner/handoff.js`, `runner/stdio.js`: source-digested task packet and transport bridge using existing authenticated tools, with no provider SDK, editor dependency or authentication service.
- Operator instructions: `workflow/runner.md`. Generated completed precedent: `handoff.json`. Synthetic executable-plan shape: `dry-run-plan.json`; full mock return: `dry-run-readback.json`; dry-run results: `dry-run.json`.

## Authority and approval

The selected Patient Summary item is complete. Its medium risk tier remains **unapproved**; the recorded per-item quote is exactly “then proceed to the next step”. The packet preserves the manifest status, locked risk, record quote, dependency state, relevant full flags, rules, mappings and checkpoint without treating that quote as permission for new work. Saved IDs are explicitly historical, and fresh execution requires new live evidence.

This tooling work is recorded in `records/workflow/2026-09-11/workflow_npveRunner_2026-09-11.json`, opened through `apply-workflow-npve-runner.js` and closed through `finalize-workflow-npve-runner.js`. Canvas checks, screenshots, visual milestones, start-batch and finish-batch are not applicable to this repository-only record. No mock checkpoint was inserted into the real workflow to satisfy those gates. Future design closeout uses the existing finish gate through the runner.

## Measurements

Initial existing measurement: **1,564,702 legacy bytes / 157,420 lean bytes**, 89.9% reduction. This is the existing whole-workflow measurement, not the new task-specific result.

New equivalent-information measurement: **133,174 bytes before / 113,847 bytes after**, **14.51% reduction**, comparing pretty and compact JSON that parse to exactly the same canonical payload. See `context-measurement.json` for its digest and method. The broader source bundle contains additional unrelated information and is reported separately; its size is not used as the equivalent-information baseline. All required policy text remains present, including conservative inclusion of relevant active findings. The generator reads only selected/dependency record files, not unrelated historical records or the full aggregate.

Baseline Patient Summary observed prefix: 32 responses, 2,875,648 cached input, 107,265 uncached input and 24,260 output tokens. Source: the unchanged historical `measurements.json`; it excludes subsequent closeout/final output. Ending credits and valid interval cost were unavailable. New live-run token, credit, latency, response-count and tool-call savings remain **unmeasured**. Reduced program regeneration and smaller model-facing readbacks are anticipated benefits, not measured runtime claims. Byte counts are not token conversions.

The usage utility consumes normalized per-response observations, deduplicates run/response IDs, rejects cumulative or conflicting counters, separates cached/uncached/output totals, and propagates unknown values as null. Incomplete totals have explicitly named observed subtotals. Credits and prices remain null rather than inferred.

## Validation

`dry-run.json` records 30 successful offline cases, including a guarded preferred-menu update after three synthetic reviewed states. Its event sequence ends with `check-batch` immediately followed by mutation dispatch. The complete mock result is saved; compact output excludes the large property definitions. Meaningful failures include stale node identity, changed shared default, changed shared geometry, removed preferred values, missing or mismatched approval, incomplete dependency, old run version, source/library write attempts, stale nonce, truncated readback, unverified visual prerequisite even when omitted from the plan, duplicate replay, unavailable usage and uncertain write recovery.

Structural Plugin API tests exercise shell/body assembly, token-bound comparison helpers, dedicated comparison slots, missing-token and ambiguous-hierarchy stops, reference-image restrictions, and all-page/instance audit collection. This is an in-memory double, **not** Figma layout or pixel simulation. No live rendering behavior is certified by these tests.

Existing checks: workflow self-test; execution self-test (38 cases); target identity self-test; workflow validation; store validation; schema write/read self-test in a separate scratch store; whitespace check. Final transcript is saved in `validation.txt`. The schema self-test runs after this tooling record becomes DONE because it requires the latest record to be DONE. The historical Patient Summary shared API and all-page paint snapshots are also compared locally, without elevating old visual review to fresh proof.

## Practical limits

The runner automates established bounded operations, not every possible Figma operation. Unsupported variant conversion/proof movement remains in the existing recorded and guarded workflow. Configurations still require model judgment for copy, hierarchy, design choices, tokens and scope. Every required state and final whole-form comparison must be inspected and shown; no utility supplies approval or visual passes. A dishonest adapter can bypass a local guard, and no local validator can independently prove pixels or current remote state.

The file bridge emits a fresh guard command for the client to run immediately before dispatch, in addition to the runner's guard, because a terminal/tool handoff can delay execution. Tool replies must be complete, unwrapped JSON; credentials and signed URLs do not belong in evidence. Failed mutations persist in the execution checkpoint; no automatic retries. These are visible integration requirements, not claims of an already-qualified live provider integration.
