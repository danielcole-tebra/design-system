# Bounded builder evidence and recording tools

Implemented after the fresh-context patient-search repeat reached verification in 194 seconds but took another 147 seconds to finish pushing. That run encountered an oversized Figma audit response, a Windows command-length failure and truncated reference reads.

- `auditControls` runs the existing structural/token comparisons inside Figma and returns IDs, per-instance results, total differences and at most five previews. No full trees leave the call. The whole returned audit is capped at 12,000 serialized characters; failures and omitted differences remain explicit. Other verification requirements remain unchanged.
- `read.cjs` produces current heading indexes and exact section reads, with 6,000-character pages and explicit continuation offsets. It can read mandatory skills completely without dumping several full documents in one response.
- `record.cjs` reads a saved `record.json`, generates a concise report with stage timings, and appends one retry-safe LOG entry. Existing differing reports/entries and invalid paths/checkpoints are rejected. Evidence stays in the input record; it is not embedded in a command line or copied into the prose report. `record.example.json` supplies the schema.
- Updated the existing active instructions rather than adding another startup document. No design values, SDE decisions or Figma nodes changed in this implementation batch.

Validation: 15 local tests pass, including a 500-difference audit under 4 KB, large file-based evidence, duplicate-log prevention, path bounds, incomplete evidence rejection, exact paginated reconstruction and computed stage timing. These are local fixture tests, not a live integration result. Two equivalent fresh-context builds are the next validation step; they retain the original three-image and verification requirements.

No screenshot applies to this tooling/documentation batch. Exact model token usage is unavailable.

## Fresh-context validation results

Both repeats used the fixed patient-search brief, required Results/Empty/section images, published parts and unchanged tooling at 10c7dcc (the second starts after the first run's evidence commit). Neither was supplied earlier implementation or timing results. Successful-push timings below come from each completed chat; saved records end at verification as intended.

| Checkpoint | Before these tools | Repeat 1 | Repeat 2 |
|---|---:|---:|---:|
| First image | 158s | 171s | 203s |
| Verified | 194s | 237s | 364s |
| Verified to successful push | 147s | 73s | 107s |
| Total through push | 341s | 310s | 471s |

The recording interval was shorter in both repeats. Overall speed did not improve consistently. Repeat 1 included a mistyped style key and audit-envelope retry; repeat 2 included an audit-envelope retry, missing local image recovery and screenshot timeout/retry. Both still printed excessive search output, though retained results avoided another asset query. The small reader pages avoided mandatory-document truncation but added calls: repeats reported 59 and 75 non-Figma calls through verification. Counts have different reporting cutoffs from some earlier summaries; do not treat them as uniform total-run counts.

Both completed the visual requirements with zero reported canvas corrective passes. The structural/token helper passed the checked controls. The parent also inspected the review images/local crop evidence. The file-based record writer completed without the earlier Windows command-length failure or a timestamp-only follow-up commit.

**Workflow failures: both repeats deleted their own temporary inspection instances, contrary to AGENTS.md's additive-only rule.** Transcript calls explicitly used createInstance followed by remove during published-component discovery. No existing screen deletion was identified, but these are not complete workflow passes. The reports' statements that there were no remaining build issues concern the final panels, not compliance with this rule. Future discovery must read imported masters or retain inspection instances; a speed result does not excuse deletion.

The two other recurring limitations are unrestricted printing of retained search results and oversized evidence appended around the bounded audit. The helper's bounded summary works, but callers can still defeat it by constructing a large surrounding result. Further improvements should constrain those output paths instead of expanding the documentation.

- Baseline: [report](../2026-10-31-patient-search-173058/REPORT.txt), chat 01a19303-a60d-7e03-86a9-8163cad9f44e.
- Repeat 1: [report](../2026-10-31-patient-search-174404/REPORT.md), [Figma](https://www.figma.com/design/zKT34LQogNjz3Z07fY4VQB?node-id=277-252), chat 01a1930f-a07d-7833-a8ac-4e5ebeeafcdd, commit 85e2ac6.
- Repeat 2: [report](../2026-10-31-patient-search-174950/REPORT.md), [Figma](https://www.figma.com/design/zKT34LQogNjz3Z07fY4VQB?node-id=281-343), chat 01a19314-ecee-7622-b5c5-4f1e70671f5e, commit ae9bd9e.
