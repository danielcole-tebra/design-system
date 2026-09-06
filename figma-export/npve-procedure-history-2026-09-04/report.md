# NPVE Procedures/Surgical History rebuild

Date: 2026-09-04  
Target: NPVE Rebuild `fdCQVFdvOByaOYIJYag0d6`  
Source evidence: `zVsuhYehoSLLq880qRBFkq` / `Page=Clin_ProSH` `648:3473` (read only)

## Outcome

Built the next low-oversight Sidesheet as a component-based Procedures/Surgical History comparison. The source, shared library, prior screens, Sidesheet geometry, and all existing defaults remain unchanged.

## Components

- `337:3881` — `Procedure history metadata`, 76×24 default, with separate editable Prefix and Value text properties.
- `337:3884` — `Procedure history event row`, 518×120, with 16px padding, an 8px title-to-metadata gap, and wrapped 8px badge gaps.
- `337:3899` — `Procedure history body`, 518×174, with the approved live Button pattern, one live event-row instance, and a 16px major gap.
- `339:6236` — sole live `Sidesheet` instance inside the rebuild helper, 550×350.

## Source-to-rebuild decisions

- Header/body/footer: 64 / 178 / 60 → 72 / 206 / 71, using the shared Sidesheet shell.
- Event-card padding: 12px → 16px to follow the canonical base-8 vertical rhythm.
- Metadata: bespoke 22px pills → reusable 24px metadata badges. Bold prefixes and regular values remain distinct and editable.
- Add-action-to-card gap: 16px → 16px; the source relationship is preserved.
- Footer: 8px vertical padding and irregular 21px gaps → the shared 16px vertical padding and 8px action spacing.
- Total height: 302px → 350px. The live placement is content-driven so the footer follows active content.

## Comparison structure

- `339:6233` — frozen reference helper with a fresh 1100×604 source export placed at 0.5 scaling.
- `339:6235` — rebuild helper containing the sole live Sidesheet.
- `339:6405` — change-log helper composed from six live `Change log/Row` instances.
- `339:6481` — live `Rebuild comparison` instance on Screens inside `09 · Procedures & surgical history comparison` (`339:6480`).
- The new body and three comparison helpers were appended only to preferred-value lists; all component defaults remain unchanged.

## Validation

- File/page identity: PASS — Templates `3:2`, Screens `27:2`, source `648:3473`.
- Geometry: PASS — Header 72, Body 206 with 16px padding, Body content 174, Footer 71, total 350.
- Spacing: PASS — card padding 16; title/badge and wrapped badge gaps 8; add-action/card gap 16.
- Content: PASS — all four metadata badges render, including the wrapped date; prefix spacing is preserved with a nonbreaking inline space.
- Footer: PASS — Cancel, Save & Add to Note, and Save are visible live Button instances; Footer Actions retain 16px top/bottom padding.
- Components: PASS — 54 instances in the new Templates section and 46 within the comparison section all resolve to live main components.
- Defaults: PASS — Sidesheet Body content remains `26:221`; comparison defaults remain `114:777`, `114:779`, and `114:880`.
- Paints: PASS — no unbound visible solid paint in the new component/rebuild/change-log content. Source image and E4E4E4 section chrome remain the documented exceptions.
- Geometry audit: PASS — no fractional authored FRAME, COMPONENT, RECTANGLE, or SECTION dimension.
- Visual: PASS — final metadata, event row, body, rebuilt sheet, and comparison screenshots were rendered and inspected.

## Recovery notes

- Two read-only discovery calls used invalid convenience assumptions (`node.parents` and component-property definitions on a variant). Both calls were atomic and changed nothing.
- The first event-row render exposed a fixed 24px metadata container clipping the wrapped date. It was corrected to vertical hug before any sheet/comparison approval.

## Artifacts

- `source-procedure-history-648-3473-2x.png`
- `component-metadata-337-3881.png`
- `component-event-row-337-3884.png`
- `component-body-337-3899.png`
- `rebuild-procedure-history-339-6235.png`
- `comparison-procedure-history-339-6481.png`
