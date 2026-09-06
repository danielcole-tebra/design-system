# NPVE Family History Sidesheet — rebuild report

Batch: `npveRebuild_familyHistory_2026-09-05`  
Date: 2026-09-05  
Target: NPVE Rebuild `fdCQVFdvOByaOYIJYag0d6`  
Source evidence: NDE-2026 `zVsuhYehoSLLq880qRBFkq`, `Page=Clin_FHx` `129:7950` (read only)  
Library: Design System Rebuild `YX2n4YLrEpBXNbcc73T6dw` (read only)

## Outcome

The Family History reference is rebuilt as reusable local composition and a live instance of the shared NPVE Sidesheet. The batch created one condition-row component, one family-member-card component, one body component, one content-driven Sidesheet placement, three comparison helpers, and one comparison instance. The source and library files were not mutated. Shared Sidesheet and comparison defaults are unchanged.

## Scope and stop condition

The batch was limited to one visible Family History state. It stopped after the new components, live Sidesheet, frozen source, comparison, screenshot review, and structural audits passed. Editing, inactive, and additional-family-member states were not built.

`Clin_THx` `129:10364` was inspected first and rejected as the next low-oversight candidate because it is hidden and contains placeholder-heavy field internals. No node in that source was changed.

## Created and mutated nodes

| Role | Node |
|---|---|
| Templates section | `346:3079` — `10 · Family history` |
| Condition-row component | `346:3080` — `Family history condition row` |
| Member-card component | `346:3089` — `Family history member card` |
| Body component | `346:3113` — `Family history body` |
| Frozen reference helper | `346:3146` |
| Frozen image rectangle | `346:3147`, image hash `379f8398952ac7885297a25099807aee5563476d` |
| Rebuild helper | `346:3148` |
| Live Sidesheet | `346:3149` |
| Change-log helper | `346:3365` |
| Screens section | `346:5992` — `10 · Family history comparison` |
| Sole comparison instance | `346:5993` |
| Existing API updated additively | Sidesheet `279:2446`; Rebuild comparison `35:332` |

## Component construction

| Component | Geometry | API | Reuse |
|---|---:|---|---|
| Family history condition row | 486×40 | `Condition`, `Show highlight` | live library Icon button with `Icon/AddPaymentNote` |
| Family history member card | 518×184 | `Relationship`, `Age` | live Icon button with `Icon/EditOutlined`; two condition-row instances |
| Family history body | 518×238 | local body swap component | live published Button plus member-card instance |
| Family History Sidesheet | 550×414 | existing Sidesheet API | `Placement=Floating`, body swap, one tertiary footer action |

## Source-to-rebuild changes

The same seven rows appear in the on-canvas Change log.

| What | From → to | Why |
|---|---|---|
| Structure | Loose source layers → reusable member card and condition rows | Keeps repeated content editable and consistent. |
| Card padding | 12px → 16px | Uses the approved base-8 spacing standard. |
| Actions | Source-drawn icons → library Edit and Add-to-note controls | Uses the correct shared icons and 40px touch targets. |
| Footer position | Fixed empty area → follows the active content | The sheet encloses its working content without a large dead zone. |
| Hidden overlap | Covered toggle layer → omitted | The rebuild follows what the rendered reference actually shows. |
| Header | 65px source header → 72px shared header | Preserves the approved 16px top and bottom header padding. |
| Create action | 230×42 source template → 262×38 published Button | Uses the canonical library Button rather than copying local source geometry. |

## Geometry and spacing verification

- Condition row: 486×40.
- Member card: 518×184; 16px padding on all sides; 16px between header and condition rows.
- Body: 518×238; 16px between Create action and card.
- Live Sidesheet: 550×414.
- Header: y0, 72px; divider: y72, 1px; Body: y73, 270px; Footer: y343, 71px.
- Body content resolves to 518×238 inside the Sidesheet's 16px body padding.
- Footer follows content; there is no fixed empty-content spacer.
- All authored Frame, Component, Rectangle, and Section dimensions and positions are whole-pixel.

## Component and API verification

- Every new and nested instance resolves to a main component; broken instance count: 0.
- Condition rows remain live instances in the member card.
- The member card remains a live instance in the body.
- The body remains the live `Body content` swap in the Sidesheet.
- `Body content` default remains `26:221`; preferred-value count increased additively to 7.
- Rebuild comparison defaults remain `114:777`, `114:779`, and `114:880`; each preferred-value list increased additively to 10.
- Screens contains exactly one `10 · Family history comparison` section and one comparison instance.

## Paint and typography verification

- All authored product-content solid fills and strokes are variable-bound.
- The add-to-note ring is bound to the same outline token used by the contained-primary Button.
- The only unbound solid paints are the deliberate `#E4E4E4` Section chrome and Figma's default translucent Section outline.
- The frozen source uses an IMAGE fill and is a documented comparison exception.
- All three authored text nodes use Akkurat LL; family, size, and line-height are bound.
- Source reference is preserved at 2× (1100×1312) and fitted proportionally into the canonical 550×600 comparison slot so its footer is not clipped.

## Visual verification

Reviewed after construction, after the action-ring correction, and after fitting the reference to the comparison slot. Final render shows the complete source footer, the content-driven rebuild footer, correct member/age pairing, two condition rows, semantically correct Edit and Add-to-note assets, and readable Change log rows.

Screenshots:

- `source-family-history-129-7950-2x.png`
- `component-condition-row-346-3080.png`
- `component-member-card-346-3089.png`
- `component-family-history-body-346-3113.png`
- `rebuild-family-history-346-3148.png`
- `comparison-family-history-346-5993-final.png`

## Standing batch rules

1. Instance paint verification — PASS; the live card, rows, body, Sidesheet, and comparison were inspected.
2. Unbound paint audit — PASS; zero authored product-content unbound solids, with Section chrome and frozen image documented.
3. Reference counts — PASS; all nested and comparison instances resolve.
4. `skipInvisibleInstanceChildren=false` — PASS on every audit traversal.
5. Opacity last — PASS; no opacity was changed.
6. Enumerate, do not recall — PASS; source, library search results, target APIs, and final structure were read live.
7. File identity first — PASS; exact source, target, Templates, and Screens identities were checked before mutation.
8. Round with record — PASS; zero fractional authored container geometry.
9. Bound-paint alpha — PASS; no bound-paint opacity was altered.
10. Clone property references — PASS; no component/helper clone was used.

## Findings

- GAP: 0
- DEFECT: 0
- DECISION: 0
- Resolved during build: 2 — the missing add-to-note outline and the clipped comparison reference footer.

## Recovery notes

Four rejected calls were atomic and changed no canvas state: missing connector `description`, calling `loadAsync` on a component instead of its page, setting absolute positioning before append, and binding a numeric token to `fontStyle`. Each was corrected before the next write. No orphan cleanup was required.

## Repo state

The schema record, backup, apply/finalize scripts, report, and screenshots are present locally. No commit was created.
