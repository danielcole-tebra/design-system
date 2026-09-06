# NPVE medication list body — 2026-09-04

Status: complete. Batch recorded before Figma mutation; no stop condition triggered.

## Scope

Created one local `Medication list body` component on the NPVE Rebuild Templates page. It composes the published add-action Button with two live instances of the approved `Medication summary row`. The source and design-system library remained read-only. The Sidesheet shell and footer are intentionally outside this batch.

Target: `fdCQVFdvOByaOYIJYag0d6` · Templates `3:2` · `06 · Medications` `219:2067`.

Master: `Medication list body` `236:1758`. Documentation preview: `Medication list body — preview` `238:1806`; placed body instance `238:1809`.

## Source-to-rebuild geometry

| Measure | Source `545:5572` | Rebuild `236:1758` | Decision |
| --- | ---: | ---: | --- |
| Full body region | 550×240 | 518×206 component | The reusable component represents inner content. The canonical Sidesheet adds 16px on all sides, producing a 550×238 region. |
| Outer padding | 16px V / 20px H | Owned by shell: 16px | Uses the established fixed-width Sidesheet contract and canonical base-8 spacing. |
| Add action | 185×42 | 211×38 | Uses the same published medium contained-primary Button and PlusOutlined end icon as the trusted Problems action. |
| Active row | 510×71 | 518×76 | Uses the approved Medication summary row unchanged. |
| Discontinued row | 510×71 | 518×76 | Uses the approved Medication summary row unchanged; action and divider are hidden by instance overrides. |
| Vertical gaps | 8px | 8px | Bound to published `space/8`. |

The rebuild component is exactly 518×206. Its children are: Add New Medication at `(0,0)` 211×38, Active medication at `(0,46)` 518×76, and Discontinued medication at `(0,130)` 518×76.

## Component API

- The body has no duplicate parent-level properties. Its three meaningful nested instances are exposed: `Add New Medication`, `Active medication`, and `Discontinued medication`.
- The Button exposes its published label, icon visibility/swap, style, size, color, and state controls.
- Each medication row exposes its approved Status, Name, Dose, Divider, Indication Chip, and icon controls.
- Active defaults to Losartan · 50mg · Hypertension with add-to-note and divider visible.
- Discontinued defaults to Sertraline · 100mg · Depression with add-to-note and divider hidden; status text and caret use bound `color/grey/500` overrides.

## Published and local dependencies

- Local `Medication summary row` `219:2068`
- Published Button variant key `820871c5281ccd91813587a508771cc439f38b93`
- Published `Icon/PlusOutlined` through the Button end-icon slot
- Published `space/8` key `183d5d946d268e8bd37735b8b0dc95111c46eddd`
- Existing published typography, colors, Chip, Divider, caret, and Icon button dependencies inherited through the approved row

## Deliberate visual differences

- The component uses the fixed Sidesheet's established 16px inner inset rather than the source's 20px horizontal padding.
- The add action uses the published medium Button. Its width and type size differ from the legacy source button rather than recreating a one-off control.
- All previously approved Medication row differences remain: published bare Icon button instead of the legacy outlined circle, published chevron instead of the filled triangle, bound grey/300 row surface instead of the source's unbound `#F3F3F3`, and the published 24px Chip instead of the source's 22px badge.

## Verification

1. Component geometry is 518×206 with a bound 8px item gap; placed instance is also 518×206.
2. Master vs placed instance: 20/20 visible solid-paint signatures match exactly by relative path, RGB, opacity, and variable ID. Both have zero unbound visible solid paints.
3. Property references: body master 19 and placed instance 19. Both nested medication rows retain seven references with `skipInvisibleInstanceChildren=false`; the approved row master remains seven.
4. Product-font assertion: every rendered text segment in the body uses Akkurat LL; zero offenders.
5. Global unbound-paint audit outside instances: Cover 1 pre-existing (`1:5`); Templates 0; Screens 0; Archive 0. Section chrome excluded: 0 / 11 / 6 / 8 paint counts.
6. Rule 8: zero non-exempt fractional width/height hits on all pages. Fractional VECTOR/GROUP intrinsic-bound exemptions: 0 / 335 / 146 / 69.
7. No component or variant was cloned; the source and library were not mutated.

## Recovery notes

- One read-only inspection rejected because a remote main component had no parent; the guarded read succeeded and changed nothing.
- One write rejected because `isExposedInstance` was set before the new instance was appended to a component. The call was atomic; the corrected order appended first and then exposed the instance.
- An initial reference counter omitted hidden instance children and reported a false drop. The required deep traversal proved both nested rows retained all seven references before work continued.
- The repo batch gate initially used an unquoted hyphenated JSON key and stopped before changing the schema. The key access was corrected, then the recorded batch opened successfully.

## Evidence

- `source-body-545-5572.png`
- `rebuilt-body-236-1758.png`
- `rebuilt-instance-238-1809.png`
- `rebuilt-preview-238-1806.png`
- `reference-vs-rebuilt.png`

