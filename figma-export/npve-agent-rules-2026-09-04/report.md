# npveRebuild_agentRules_2026-09-04 — report

Documentation batch. Repo writes only; no Figma file opened or written.

## Read first

| Item | State |
| --- | --- |
| CLAUDE.md | Read. |
| npveRebuild_audit_2026_09_03 | Read. 13 flags, five open decisions; flag `npveAudit_unrecordedRestructure` is the external-session failure. |
| Repair batch 1 retro record | Not present. No `npveRebuild_repair1*` record in the schema; `figma-export/npve-repair1-2026-09-04/` holds eight screenshots and no `report.md`. Treated as not yet run. |

## Stop condition

Two repo files (CLAUDE.md edited, AGENTS.md created), one schema record, one cross-reference line on one existing flag. Met.

## Files written

| File | Change |
| --- | --- |
| CLAUDE.md | New H2 "Rules for any agent working in these files" between "Known plugin API traps" and "Recording". Lead sentence plus nine rules, text as given in the prompt. CRLF line endings preserved. |
| AGENTS.md | New, repo root. One context paragraph (project, five Figma file keys, where CLAUDE.md and the schema live, CLAUDE.md canonical and wins on conflict), then the same section verbatim. |
| design-system-schema.json | Record `npveRebuild_agentRules_2026-09-04`; flag `npveAudit_unrecordedRestructure` gained `addressedBy` and one sentence appended to `handling`. Flags 206 → 206. |
| design-system-schema.backup-2026-09-04-pre-npve-agent-rules.json | Backup taken before the write. |
| apply-npve-agent-rules.js | The apply script. Re-running throws "record already exists". |

## Verification

Section body diffed three ways after CRLF normalisation: prompt text vs CLAUDE.md, prompt text vs AGENTS.md. Both identical. The apply script re-checks that the AGENTS.md section appears verbatim in CLAUDE.md and throws otherwise.

Heading order in CLAUDE.md after the edit: What this folder is, Where truth lives, Superseded, Figma files, Standing rules, Known plugin API traps, Rules for any agent working in these files, Recording, Publishing.

## Flag cross-reference

`npveAudit_unrecordedRestructure` (high, DEFECT) now carries:

- `addressedBy`: the process failure is covered by the new section (rules 1, 2, 7); the retroactive record for sessions 74–78 and 88–172 is still owed.
- `handling`: original text plus "Process gap addressed 2026-09-04 by npveRebuild_agentRules_2026-09-04 (see addressedBy); the record itself is still owed."

## Standing rules, markers, screenshots

Not applicable. No Figma node read or written, so the ten standingBatchRules and rules 14/15 had nothing to walk. GAP 0, DEFECT 0 added. No screenshots.

## Decisions needed

None from this batch. The five audit decisions remain open in `npveRebuild_audit_2026_09_03.decisionsNeeded`.

## Schema record summary

`npveRebuild_agentRules_2026-09-04`: status DONE, date 2026-09-04, report path, readFirst (repair1 retro absent), stopCondition, filesWritten, sectionText (full section stored), verification, flagUpdated, flagsAdded [], flagsBefore 206, flagsAfter 206.

## New text as written

### CLAUDE.md and AGENTS.md shared section

## Rules for any agent working in these files

Any agent — Claude, Codex, or other — editing the Figma files or this repo follows the same loop. Work that skips it gets audited and may be superseded.

1. Read before touching: this file, then design-system-schema.json for current state. The schema is the record; chat history and your own memory are not.
2. Audit before building: when the current state is uncertain, run a read-only inventory first and report it. Never build onto an unverified state.
3. One batch at a time, with a stop condition stated up front. A batch that grows past its stop condition becomes two batches.
4. Additive only. Nothing is deleted, and nothing is moved, renamed, or superseded without a record saying so. Archives get a README.
5. No invention. If the library and code lack a pattern, mark it (GAP/DEFECT per the convention) and build with what exists. Recreating a source drawing by hand and calling it a component is a false record, which is worse than the gap.
6. Verify in pixels. Screenshot what you built and look at it. Property readbacks are claims; renders are evidence. After editing a component, re-screenshot its live instances and diff.
7. Record every batch: a dated schema record via an apply-*.js script, backup first, findings to flags[]. A batch without a record did not happen and will be treated as suspect.
8. Report per rule 13: full report to disk, short reply, no tables in chat. Change logs in the file are written in plain graphic-design language, not system jargon.
9. When sources disagree or a decision is needed, stop and report. Precedence (code > Storybook render > library > source) resolves facts, not design decisions.

### AGENTS.md context paragraph

This repo is the docs, schema, scripts, and exports for the Tebra design system Figma rebuild: a component library rebuilt in Figma from the code in `C:\Code\web-app-v2\packages\design-system`, plus screen rebuilds that consume it. Figma files: Design System Rebuild library `YX2n4YLrEpBXNbcc73T6dw`; Proposals `zKT34LQogNjz3Z07fY4VQB` (consumes the library, never defines it); NPVE Rebuild target `fdCQVFdvOByaOYIJYag0d6`; NPVE source NDE-2026 `zVsuhYehoSLLq880qRBFkq` (read-only, never written); Tebra Working UI Kit `ZPf0sJy83aPyrHjCVHomya` (deprecated, read-only reference). `CLAUDE.md` in the repo root is the canonical instruction file and holds the full standing rules, precedence, and plugin traps; read it first. `design-system-schema.json` in the repo root is the sole register of decisions, flags, batch rules, and batch records. This file exists because Codex and other tools read `AGENTS.md` by convention; it repeats one section of `CLAUDE.md` verbatim and adds nothing. Where the two differ, `CLAUDE.md` wins.
