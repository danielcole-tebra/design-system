# Bounded builder evidence and recording tools

Implemented after the fresh-context patient-search repeat reached verification in 194 seconds but took another 147 seconds to finish pushing. That run encountered an oversized Figma audit response, a Windows command-length failure and truncated reference reads.

- `auditControls` runs the existing structural/token comparisons inside Figma and returns IDs, per-instance results, total differences and at most five previews. No full trees leave the call. The whole returned audit is capped at 12,000 serialized characters; failures and omitted differences remain explicit. Other verification requirements remain unchanged.
- `read.cjs` produces current heading indexes and exact section reads, with 6,000-character pages and explicit continuation offsets. It can read mandatory skills completely without dumping several full documents in one response.
- `record.cjs` reads a saved `record.json`, generates a concise report with stage timings, and appends one retry-safe LOG entry. Existing differing reports/entries and invalid paths/checkpoints are rejected. Evidence stays in the input record; it is not embedded in a command line or copied into the prose report. `record.example.json` supplies the schema.
- Updated the existing active instructions rather than adding another startup document. No design values, SDE decisions or Figma nodes changed in this implementation batch.

Validation: 15 local tests pass, including a 500-difference audit under 4 KB, large file-based evidence, duplicate-log prevention, path bounds, incomplete evidence rejection, exact paginated reconstruction and computed stage timing. These are local fixture tests, not a live integration result. Two equivalent fresh-context builds are the next validation step; they retain the original three-image and verification requirements.

No screenshot applies to this tooling/documentation batch. Exact model token usage is unavailable.
