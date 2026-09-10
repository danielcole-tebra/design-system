# Appearance evidence

New checkpoints use execution version 2. Existing version 1 runs remain compatible; do not restart an active batch to adopt this format. For an active run, record the same observations in its existing report/corrections until it closes.

`appearance.specification` links a repo-relative nonempty file containing the reusable surface/border/state intent and its authority. Use the NPVE edit-form specification only when it applies; other compositions supply their own concise specification.

At finish, `appearance.review` contains:

- `render`: the final comparison PNG path, matching the manifest.
- `inspected`: true only after actually inspecting that image.
- `areas`: six brief observations under `surfaces`, `borders`, `content`, `states`, `layout`, and `actions`. State what is visible, not just “PASS.”
- `differences`: entries with `observation`, `disposition` (`corrected` or `approved`), and `evidence` identifying the correction render or supporting authority/decision. Use an empty array only when appropriate; disclose approved differences too.

Unresolved differences remain findings and cannot be disguised as approved. Existing risk/approval rules apply. The validator checks evidence completeness, not pixels or the truth of an approval claim. Do this once at the final whole-form comparison, not after every field edit.
