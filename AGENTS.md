# AGENTS.md

This repo is the docs, schema, scripts, and exports for the Tebra design system Figma rebuild: a component library rebuilt in Figma from the code in `C:\Code\web-app-v2\packages\design-system`, plus screen rebuilds that consume it. Figma files: Design System Rebuild library `YX2n4YLrEpBXNbcc73T6dw`; Proposals `zKT34LQogNjz3Z07fY4VQB` (consumes the library, never defines it); NPVE Rebuild target `fdCQVFdvOByaOYIJYag0d6`; NPVE source NDE-2026 `zVsuhYehoSLLq880qRBFkq` (read-only, never written); Tebra Working UI Kit `ZPf0sJy83aPyrHjCVHomya` (deprecated, read-only reference). `CLAUDE.md` in the repo root is the canonical instruction file and holds the full standing rules, precedence, and plugin traps; read it first. `design-system-schema.json` in the repo root is the sole register of decisions, flags, batch rules, and batch records. This file exists because Codex and other tools read `AGENTS.md` by convention; it repeats one section of `CLAUDE.md` verbatim and adds nothing. Where the two differ, `CLAUDE.md` wins. OPERATORS.md in this root describes the operator seat.

## Rules for any agent working in these files

Any agent — Claude, Codex, or other — editing the Figma files or this repo follows the same loop. Work that skips it gets audited and may be superseded.

1. Read before touching: this file. For NPVE work, run `node scripts/workflow/validate-workflow.js`, then read `workflow/npve-contract.generated.json`, the selected manifest item, and its last record. Read the full schema only when routed there by the compact workflow. The schema remains the authority; the generated contract is freshness-checked projection, and chat history is not the record.
2. Audit before building: when the current state is uncertain, run a read-only inventory first and report it. Never build onto an unverified state.
3. One batch at a time, with a stop condition stated up front. A batch that grows past its stop condition becomes two batches.
4. Additive only. Nothing is deleted, and nothing is moved, renamed, or superseded without a record saying so. Archives get a README.
5. No invention. If the library and code lack a pattern, mark it (GAP/DEFECT per the convention) and build with what exists. Recreating a source drawing by hand and calling it a component is a false record, which is worse than the gap.
6. Verify in pixels. Screenshot what you built and look at it. Property readbacks are claims; renders are evidence. After editing a component, re-screenshot its live instances and diff.
7. Record every batch: a dated schema record via an apply-*.js script, backup first, findings to flags[]. A batch without a record did not happen and will be treated as suspect.
8. Report per rule 13: full report to disk, short reply, no tables in chat. Change logs in the file are written in plain graphic-design language, not system jargon.
9. When sources disagree or a decision is needed, stop and report. Precedence (code > Storybook render > library > source) resolves facts, not design decisions.
10. Risk is planner/operator-owned, never executor-owned. Deterministic gates may compress checks, but every component still gets a comparison render inspected by the executor and shown to the operator.
