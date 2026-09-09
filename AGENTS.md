# AGENTS.md

This repo is the docs, schema, scripts, and exports for the Tebra design system Figma rebuild: a component library rebuilt in Figma from the code in `C:\Code\web-app-v2\packages\design-system`, plus screen rebuilds that consume it. Figma files: Design System Rebuild library `YX2n4YLrEpBXNbcc73T6dw`; Proposals `zKT34LQogNjz3Z07fY4VQB` (consumes the library, never defines it); NPVE Rebuild target `fdCQVFdvOByaOYIJYag0d6`; NPVE source NDE-2026 `zVsuhYehoSLLq880qRBFkq` (read-only, never written); Tebra Working UI Kit `ZPf0sJy83aPyrHjCVHomya` (deprecated, read-only reference). `CLAUDE.md` in the repo root is the canonical instruction file and holds the full standing rules, precedence, and plugin traps; read it first. `design-system-schema.json` in the repo root is the sole register of decisions, flags, batch rules, and batch records. This file exists because Codex and other tools read `AGENTS.md` by convention. It points at the same canonical rule text as `CLAUDE.md` and adds nothing. Where the two differ, `CLAUDE.md` wins. OPERATORS.md in this root describes the operator seat.

## Rules for any agent working in these files

Any agent — Claude, Codex, or other — editing the Figma files or this repo follows the same loop. Work that skips it gets audited and may be superseded.

The eleven rules are canonical in `workflow/rules.json` → agentRules and appear in every generated `workflow/npve-contract.generated.json`; CLAUDE.md points to the same text. Their titles: 1 Read before touching; 2 Audit before building; 3 One batch at a time; 4 Additive only; 5 No invention; 6 Verify in pixels; 7 Record every batch; 8 Report per rule 13; 9 Stop on disagreement; 10 Record gate; 11 Risk is planner/operator-owned.

For NPVE work: run `node scripts/workflow/validate-workflow.js`, then read the contract, the selected manifest item, and its last record. Read the full schema only when routed there. The schema remains the authority; the contract is a freshness-checked projection; chat history is not the record.
