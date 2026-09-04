# docsOperatorsGuide_2026-09-04 — report

Documentation batch. Repo writes only; no Figma file opened or written.

## Read first

| Item | State |
| --- | --- |
| CLAUDE.md | Read, including "Rules for any agent working in these files" items 1–9. |
| npveRebuild_agentRules_2026-09-04 | Read. Its readFirst said the repair1 retro record was absent; since then `npveRebuild_externalRestructure_2026-09-03_retro` and `npveRebuild_repair1_2026-09-04` (two flags) have landed in the schema, uncommitted. |

## Record gate

Previous batch in this workstream, `npveRebuild_agentRules_2026-09-04`, has a record. Gate passed.

## Stop condition

One new file, two edited files, one schema record, one commit. Met.

## Files written

| File | Change |
| --- | --- |
| OPERATORS.md | New, repo root. Guide text as supplied. Markdown structure restored from the pasted plain text: H1 title, five H2 sections, bulleted lists with bold lead phrases under The standing structure (4 items) and The loop, from your seat (6 items). Words unchanged. Ownership bracket left as written. CRLF like the other root docs. |
| CLAUDE.md | Item 10 (record gate) appended to the agent rules. One cross-reference line added to the opening section after the folder description. |
| AGENTS.md | One cross-reference sentence appended to the context paragraph. Rules section untouched. |
| design-system-schema.json | Record `docsOperatorsGuide_2026-09-04`; flag `docsAgentsMdVerbatimClaimStale`. Flags 208 → 209. |
| design-system-schema.backup-2026-09-04-pre-docs-operators-guide.json | Backup before the write. |
| apply-docs-operators-guide.js | The apply script. Asserts every addition is present and the guide's first and last lines match before writing. |

## CLAUDE.md additions as written

Opening section, new line after "This folder holds no source.":

    OPERATORS.md describes the person's side of this loop; agents should assume an operator is holding it.

Rules for any agent working in these files, new item:

    10. Record gate. Before starting any batch, check that the previous batch in this workstream has a schema record. If it does not, refuse the batch and run a read-only state check instead; its record stands in for the missing one.

AGENTS.md context paragraph, appended sentence:

    OPERATORS.md in this root describes the operator seat.

## Finding needing a decision

AGENTS.md states it repeats the CLAUDE.md agent-rules section verbatim. After this batch CLAUDE.md has item 10 and AGENTS.md has items 1–9. The prompt scoped item 10 to CLAUDE.md and the AGENTS.md change to one sentence, so AGENTS.md was left as instructed. Flagged as `docsAgentsMdVerbatimClaimStale` (low). Decision: mirror item 10 into AGENTS.md, or reword the claim. Tools that read only AGENTS.md do not see the record gate until then.

## Standing rules, markers, screenshots

Not applicable; no Figma node read or written. GAP 0, DEFECT 0 in Figma. No screenshots.

## Commit

Whole working tree committed as "Operator's guide, record gate, cross-references". It carries the uncommitted work of earlier batches: the audit, agent-rules, external-restructure retro, repair1 and library-todos write2 records with their scripts, backups and report folders, plus LIBRARY-TODOS.md edits. The hash is reported in chat and visible in git log.

## Schema record summary

`docsOperatorsGuide_2026-09-04`: status DONE, date 2026-09-04, recordGate passed, stopCondition, filesWritten, additions (three strings), verification, finding, decisionsNeeded (1), flagsAdded [docsAgentsMdVerbatimClaimStale], flagsBefore 208, flagsAfter 209, commit, alsoInCommit.
