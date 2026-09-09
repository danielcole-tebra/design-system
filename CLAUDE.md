# CLAUDE.md

Auto-loaded. Read this, then the files it names. Nothing else in this folder is standing instruction.

## What this folder is

Docs, schema, scripts, and exports for the Tebra design system Figma rebuild. Source lives in `C:\Code\web-app-v2\packages\design-system`. This folder holds no source.

OPERATORS.md describes the person's side of this loop; agents should assume an operator is holding it.

## Lean startup for NPVE work

For an NPVE batch, do not reread the full schema by default. Run `node scripts/workflow/validate-workflow.js`, then read `workflow/npve-contract.generated.json`, the selected item in `workflow/manifest.json`, and the last record named by that item (its file path is in `indexes/record-index.json`; the last record per workstream is in `indexes/current-state.json`). The generated contract is a projection, not a second authority: its source digests make the validator fail whenever the schema or standing instructions change. Open the full schema only when validation fails, the selected work exposes a conflict, a convention is being changed, or historical evidence is genuinely required. The contract folds in `workflow/rules.json`: the agent rules, the record gate, standing rules 14 and 15, the sheet and comparison techniques, the proof convention, and every NPVE value with the record that decided it. Sections that live only in this file are declared canonical by name inside the contract.

Risk is assigned by the planner or operator before execution. The executor may not lower its own risk or remove oversight. Every component still requires a comparison render inspected by the executor and shown to the operator; deterministic validation never replaces the pixel look.

## Where truth lives

Precedence, when sources disagree:

1. Code in `packages/design-system` is authority on values (hex, px, radii, tokens, prop names).
2. Storybook is authority on render. Where layout depends on flex, intrinsic size, or anything the browser resolves, a screenshot outranks a derivation.
3. Production is evidence of behavior, never authority on values.
4. Figma is derived. Where Figma diverges from code, Figma is wrong.

The register is the append-only record store (record schemasplit_phase8_2026-09-08): `records/<workstream>/<date>/<recordId>.json` holds one immutable file per batch record; `flags/active.json` and `flags/resolved.json` hold the flag register split by status; `foundation/<section>.json` holds decisions, tokens, components, the standing batch rules and the other non-record sections. `indexes/record-index.json` and `indexes/current-state.json` are generated and never hand-edited. `design-system-schema.json` is the legacy aggregate, generated from the store by `scripts/schema/build-aggregate.js`; read it for compatibility, never write it. Archived audits are never cited. Method is `TEBRA-DESIGN-SYSTEM.md` §6. Kit authority is the rule in `REFERENCE-KIT.md`.

## Superseded

`HANDOFF.md` and `CHAT-HANDOFF.md` are frozen at 2026-08-19. Read them for history only. Where either disagrees with the schema, the schema wins. Known stale points: variant value casing, batch rule count, flag count, kit certification state, alpha rule wording, Storybook reachability.

`C:\Code\tebra-rebuild\TEBRA-DESIGN-SYSTEM.md` is an older copy. The in-repo file is canonical.

## Figma files

- Design System Rebuild (library): `YX2n4YLrEpBXNbcc73T6dw`
- Proposals: `zKT34LQogNjz3Z07fY4VQB`. Consumes the library, never defines it.
- Tebra Working UI Kit: deprecated, read-only reference.

Pass the file key explicitly on every call. Never rely on the last-used file.

## Standing rules

1. Additive only. Never delete Figma nodes or files. Mark superseded, archive with a README.
2. Naming. A property that mirrors a code prop uses code's exact name and values, lowercase. A Figma-only affordance uses Sentence case. Never lowercase a Figma-only affordance; it falsely claims a code prop exists. Sub-component paths use `/` with no spaces: `Icon/Name`, `Table/Cell`, `Nav/Bar`. Published names are locked.
3. Verify in pixels. Screenshot every batch and look at it before reporting. Instantiate every new variant and read rendered paint; master reads are not evidence. Enumerate from the artifact, never from a previous report, including this file.
4. No fractional dimensions in Figma. pxToRem inflation is 14.29% everywhere (coef 16/14) and affects geometry, not just type. Bind the intended integer, record `computedPx`.
5. Alpha lives in the variable's stored rgba for unbound paints. Never set a bound paint to opacity 1; it discards the alpha.
6. Instances cannot host children. Anything drawn to work around this is labeled SCAFFOLDING.
7. DataGrid and Table use different row-height mechanisms. DataGrid authors a height; Table derives it. They do not share rules.
8. Outlined is not transparent by default. Tebra chip overrides beat MUI's outlined rule except warning; outlined primary is white; OutlinedInput has no background. Check each component at the theme layer.
9. Defect markers follow `defectMarkerConvention2026_08_28` in the schema. DEFECT renders differently from what ships and goes in the register. GAP is something the component cannot express and stays marked in the frame. No red, yellow, orange, or green on markers.
10. Composition backdrops bind to `color/background/paper`. Beige is never a backdrop.
11. Report, don't resolve. A disagreement between sources is a finding. Never reconcile silently in either direction.
12. Run all ten `standingBatchRules` from the schema every batch. Set `figma.skipInvisibleInstanceChildren = false` before any audit walk.
13. Reporting. Every batch writes its full report to `figma-export/<batch>/report.md`, with all tables, mappings, screenshots referenced by filename, and the schema record summary. The chat reply is under 40 lines: outcome, findings needing a decision, GAP and DEFECT counts, and the absolute path to `report.md` and the screenshot folder. No tables in chat. Screenshots are saved as PNG in the batch folder, never only shown inline.
14. Change log convention. Canonical text: `workflow/rules.json` → standingRules.14, folded into the contract (records npveRebuild_changelog_2026_09_02, npveRebuild_repair2_2026-09-04). In brief: every rebuilt frame has a plain-language Change log on its right, held once as a `_Rebuild comparison/Change log/<screen>` sub-component of Change log/Row instances.
15. Rebuild comparison convention. Canonical text: `workflow/rules.json` → standingRules.15, folded into the contract (records npveRebuild_comparisonLayout_2026_09_02, npveRebuild_repair2_2026-09-04, npveRebuild_extReviewRepairs_2026-09-05). In brief: every rebuilt frame sits once, inside a Rebuild comparison instance on Screens whose slots swap to `_Rebuild comparison/Reference|Rebuild|Change log/<screen>`; the reference is a frozen 2x export captioned with node id and date; proofs follow the proof convention in the same file.

### Sheet and comparison techniques

Adopted 2026-09-05 from the external sidesheet batches (record npveRebuild_extReviewRepairs_2026-09-05). Canonical text: `workflow/rules.json` → sheetAndComparisonTechniques, folded into the contract. In brief: sheets are as tall as their content; helpers under a short sheet are transparent; tall content overflows the slot at 1:1 with clipping off; new bodies join the shell through its Body content list; a new state is a new variant; values the library lacks live in a local NPVE/<kind> collection with a record.

## Known plugin API traps

- `importComponentByKeyAsync` and `importVariableByKeyAsync` results do not persist between `use_figma` calls. Import and use in the same script.
- `setBoundVariableForPaint` with a null variable returns an unbound paint without throwing. Read the paint back after binding.
- Assigning `componentPropertyReferences` replaces the whole object. Set every key in one assignment.

## Rules for any agent working in these files

Any agent — Claude, Codex, or other — editing the Figma files or this repo follows the same loop. Work that skips it gets audited and may be superseded.

The eleven rules are canonical in `workflow/rules.json` → agentRules and appear in every generated contract; AGENTS.md points to the same text, so no rule exists only in one instruction file. Their titles: 1 Read before touching; 2 Audit before building; 3 One batch at a time; 4 Additive only; 5 No invention; 6 Verify in pixels; 7 Record every batch; 8 Report per rule 13; 9 Stop on disagreement; 10 Record gate; 11 Risk is planner/operator-owned. Rules 10 and 11 are also stated directly in the contract.

## Recording

Every batch writes a dated record as a new file under `records/<workstream>/<date>/` through an `apply-*.js` script that calls `openRecord` in `scripts/schema/lib.js` (the record gate reads `indexes/record-index.json`), and closes it with a `finalize-*.js` script that calls `finalizeRecord`; both regenerate the aggregate and the indexes, which are committed with the record. A record is immutable once its status leaves IN PROGRESS; a later batch that must annotate an earlier record writes the annotation in its own record. New findings go to `flags/active.json` through `appendFlags`; a resolution moves the entry to `flags/resolved.json` through `resolveFlag`. The full-schema backup before each batch still stands until the operator decides the backup-policy question raised in record schemasplit_phase8_2026-09-08. Open: `flags[]` stopped at 2026-08-04 and later findings went into dated records only. Until that is resolved, write new findings to both.

## Publishing

The plugin API cannot publish a library or accept updates. Both are manual. New components land on publish; edits to existing components require accept updates in the consuming file.
