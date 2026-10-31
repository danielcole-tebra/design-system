# Builder execution improvements — 2026-10-31

Implemented the operational improvements identified in the patient-search build benchmark. The active package remains AGENTS.md plus LIBRARY.md, COMPOSITIONS.md and OPEN-ISSUES.md. Optional executable helpers are outside the startup reading path.

## Changes

- AGENTS.md and LIBRARY.md now require bounded reads/search output, retaining full search results for later inspection instead of rerunning successful searches after output truncation.
- Remote components are imported and used within the same construction call, using verified published keys and returned objects. No cross-call imported-node lookup or automatic replay of a partially completed write.
- Optional helpers summarize normalized search results, deduplicate imports within a call and compare scoped structure/token snapshots. The comparator ignores only the expected root INSTANCE/COMPONENT and root-name differences. Descendant structure, padding and binding differences remain findings. Content, visibility, dimensions, clipping, reactions and rendered pixels require separate checks.
- Evidence is returned with construction where possible. Passing checks and unchanged screenshots need not be repeated; required state and assembly verification remains.
- One concise report and LOG entry precede one named-path commit/push. Actual completion timing belongs in the final chat, avoiding a timestamp-only second commit or unnecessary artifact copies.

## Validation and limits

`node --test tools/builder/helpers.test.cjs`: 8 tests passed, 0 failed. Coverage includes bounded output with omission counts, same-call import reuse, manifest validation before mutation, no automatic retries, expected root identity differences, real descendant/token/padding regressions, malformed snapshots and unreadable fields, and the explicit separation of structural checks from content/visibility checks.

The tests use local fixtures and a simulated import API. No Figma calls or canvas changes were made in this batch. These are implementation and workflow checks, not a live integration result or measured speedup. A subsequent equivalent build is needed to measure the effect against the earlier 174-second first-image / 237-second verification baseline.

Design rulings, SDE status and component values were not changed. No screenshot applies to this documentation/tooling batch. Exact model token usage is unavailable.
