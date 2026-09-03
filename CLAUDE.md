# CLAUDE.md

Auto-loaded. Read this, then the files it names. Nothing else in this folder is standing instruction.

## What this folder is

Docs, schema, scripts, and exports for the Tebra design system Figma rebuild. Source lives in `C:\Code\web-app-v2\packages\design-system`. This folder holds no source.

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
14. Every rebuilt frame in the target has a Change log beside it, on its right, listing what changed from the source, from → to, and why in one line. Rows come from the batch prompt. Because an instance cannot host children (rule 6), the placed change log is a detached frame containing Change log/Row instances; Row stays a component so styling propagates. The schema remains the record; the change log is its plain-language view.
15. Every rebuilt frame sits in a Rebuild comparison on Screens: source export, rebuild, change log, left to right on a grey backdrop. The source export is a flat image at 2x captioned with its node id and export date, and does not update when the source changes. Like the change log, the placed comparison is a detached frame because an instance cannot host children. The grey backdrop is a deliberate exception to rule 10.

## Known plugin API traps

- `importComponentByKeyAsync` and `importVariableByKeyAsync` results do not persist between `use_figma` calls. Import and use in the same script.
- `setBoundVariableForPaint` with a null variable returns an unbound paint without throwing. Read the paint back after binding.
- Assigning `componentPropertyReferences` replaces the whole object. Set every key in one assignment.

## Recording

Every batch writes a dated record to the schema through an `apply-*.js` script, with a backup first. Open: `flags[]` stopped at 2026-08-04 and later findings went into dated records only. Until that is resolved, write new findings to both.

## Publishing

The plugin API cannot publish a library or accept updates. Both are manual. New components land on publish; edits to existing components require accept updates in the consuming file.
