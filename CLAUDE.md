# CLAUDE.md

Auto-loaded. Read this, then the files it names. Nothing else in this folder is standing instruction.

## What this folder is

Docs, schema, scripts, and exports for the Tebra design system Figma rebuild. Source lives in `C:\Code\web-app-v2\packages\design-system`. This folder holds no source.

OPERATORS.md describes the person's side of this loop; agents should assume an operator is holding it.

## Lean startup for NPVE work

For an NPVE batch, do not reread the full schema by default. Run `node scripts/workflow/validate-workflow.js`, then read `workflow/npve-contract.generated.json`, the selected item in `workflow/manifest.json`, and the last record named by that item. The generated contract is a projection, not a second authority: its source digests make the validator fail whenever the schema or standing instructions change. Open the full schema only when validation fails, the selected work exposes a conflict, a convention is being changed, or historical evidence is genuinely required.

Risk is assigned by the planner or operator before execution. The executor may not lower its own risk or remove oversight. Every component still requires a comparison render inspected by the executor and shown to the operator; deterministic validation never replaces the pixel look.

## Where truth lives

Precedence, when sources disagree:

1. Code in `packages/design-system` is authority on values (hex, px, radii, tokens, prop names).
2. Storybook is authority on render. Where layout depends on flex, intrinsic size, or anything the browser resolves, a screenshot outranks a derivation.
3. Production is evidence of behavior, never authority on values.
4. Figma is derived. Where Figma diverges from code, Figma is wrong.

`design-system-schema.json` is the sole register of decisions, flags, batch rules, and batch records. Archived audits are never cited. Method is `TEBRA-DESIGN-SYSTEM.md` §6. Kit authority is the rule in `REFERENCE-KIT.md`.

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
14. Every rebuilt frame has a Change log beside it, on its right, listing what changed from the source, from → to, and why in one line, in plain graphic-design language. Rows come from the batch prompt. The change log lives once, as a `_Rebuild comparison/Change log/<screen>` sub-component on Templates holding Change log/Row instances; Row stays a component so styling propagates. The schema remains the record; the change log is its plain-language view.
15. Every rebuilt frame sits in a Rebuild comparison on Screens: an instance of the Rebuild comparison master whose three content slots are swapped per screen to `_Rebuild comparison/Reference|Rebuild|Change log/<screen>` sub-components, left to right on a grey backdrop. Each screen and its change log exist exactly once, inside those sub-components; the comparison instance is the only placement, and a fix goes to the sub-component, never to a copy. The reference is a flat export at 2x captioned with its source node id and export date, and does not update when the source changes. The grey backdrop is a deliberate exception to rule 10.

### Sheet and comparison techniques

Adopted 2026-09-05 from the external sidesheet batches (record npveRebuild_extReviewRepairs_2026-09-05).

- **Sheets are as tall as their content.** The Sidesheet master stays 550 by 600. A placed sheet grows or shrinks to fit its body, and the footer sits right under the last row. Never pad a short sheet to 600 or pin its footer to the bottom.
- **Helpers under a short sheet are transparent.** When a rebuilt sheet is shorter than the comparison slot, the Rebuild sub-component carries no fill, so only the sheet shows white. Nothing false extends below it.
- **Tall content overflows the slot; the slot does not shrink it.** When a reference or a rebuilt sheet is taller than the 600 slot, keep it at 1:1 and switch clipping off on that column of the placed comparison instance. Never scale a reference to fit.
- **New bodies join the shell through its Body content list.** Append the new body component to the Sidesheet's Body content preferred values and leave the default alone. Do not fork the shell.
- **A new state is a new variant of the body it belongs to.** Add State=Empty to the existing body set rather than creating a second set or a loose frame.
- **Values the library lacks may live in a local NPVE collection.** Name the collection NPVE/<kind>, record the operator's decision in the schema, claim no code syntax, and add the value to the library to-do list. Never write it into the library from a consuming file.

## Known plugin API traps

- `importComponentByKeyAsync` and `importVariableByKeyAsync` results do not persist between `use_figma` calls. Import and use in the same script.
- `setBoundVariableForPaint` with a null variable returns an unbound paint without throwing. Read the paint back after binding.
- Assigning `componentPropertyReferences` replaces the whole object. Set every key in one assignment.

## Rules for any agent working in these files

Any agent — Claude, Codex, or other — editing the Figma files or this repo follows the same loop. Work that skips it gets audited and may be superseded.

1. Read before touching: this file, then use the validated compact workflow for NPVE work. For other workstreams, or when the compact workflow routes you there, read design-system-schema.json. The schema remains the authoritative record; chat history and your own memory are not.
2. Audit before building: when the current state is uncertain, run a read-only inventory first and report it. Never build onto an unverified state.
3. One batch at a time, with a stop condition stated up front. A batch that grows past its stop condition becomes two batches.
4. Additive only. Nothing is deleted, and nothing is moved, renamed, or superseded without a record saying so. Archives get a README.
5. No invention. If the library and code lack a pattern, mark it (GAP/DEFECT per the convention) and build with what exists. Recreating a source drawing by hand and calling it a component is a false record, which is worse than the gap.
6. Verify in pixels. Screenshot what you built and look at it. Property readbacks are claims; renders are evidence. After editing a component, re-screenshot its live instances and diff.
7. Record every batch: a dated schema record via an apply-*.js script, backup first, findings to flags[]. A batch without a record did not happen and will be treated as suspect.
8. Report per rule 13: full report to disk, short reply, no tables in chat. Change logs in the file are written in plain graphic-design language, not system jargon.
9. When sources disagree or a decision is needed, stop and report. Precedence (code > Storybook render > library > source) resolves facts, not design decisions.
10. Record gate. Before starting any batch, check that the previous batch in this workstream has a schema record. If it does not, refuse the batch and run a read-only state check instead; its record stands in for the missing one.

## Recording

Every batch writes a dated record to the schema through an `apply-*.js` script, with a backup first. Open: `flags[]` stopped at 2026-08-04 and later findings went into dated records only. Until that is resolved, write new findings to both.

## Publishing

The plugin API cannot publish a library or accept updates. Both are manual. New components land on publish; edits to existing components require accept updates in the consuming file.
