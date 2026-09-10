# Run cost tracking — 2026-09-10

Recorded the operator's approximate **179-credit** total for `npve-patient-summary-content` (build commit `d25641d`) in `workflow/metrics.json → costObservations`.

> I'd like to keep some count of the token cost of these runs, that last run cost about 179 credits all together

## Observed tokens

Provider: OpenAI. Model: gpt-6-astra. Reasoning: medium.

| Field | Tokens |
|---|---:|
| Uncached input | 164,040 |
| Cached input | 4,693,632 |
| Total input | 4,857,672 |
| Output | 22,556 |
| Of which reasoning output | 3,232 |
| Total input + output | 4,880,228 |

Summed `token_usage_record.payload.usage` once per unique response ID: **42 responses**, the startup and approved-build turns, with usage events from **21:19:48.555Z to 21:38:33.102Z**. Turn IDs and provenance are in `cost-observation.json`. This follow-up is excluded. Cached input is a subset of total input; reasoning output is a subset of output. Repeated context processed over successive responses contributes to the input total.

Credits are operator-reported and approximate. No token-to-credit or dollar conversion is inferred. This new evidence supplements the prior report's statement that bounded token totals were unavailable. The completed NPVE record and its original measurement snapshot remain unchanged.

## Future runs

Append a cost observation per completed run with provider/model/reasoning, token categories when available, credits and their source, measurement scope, and an approximate flag. Unknown values remain null. Use per-response usage rather than adding cumulative counters. Late cost reports get a new supplemental record.

## Verification and record

Repository-only work: no Figma calls, screenshots or canvas checks required. Workflow validation passed before edits. The collector rejects duplicate response IDs; token arithmetic was checked directly from the session log. A new workflow record is opened/finalized using the schema helpers; generated aggregate, indexes and contract are regenerated and validated.

Record: `records/workflow/2026-09-10/workflow_runCostTracking_2026-09-10.json`.
