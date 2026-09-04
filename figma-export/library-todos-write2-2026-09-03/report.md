# Library to-dos write batch 2 of 2, 2026-09-03

Batch id `libraryTodos_write2_2026_09_03`. Library `YX2n4YLrEpBXNbcc73T6dw`, variables only; no component master touched. Target `fdCQVFdvOByaOYIJYag0d6` read only (rule 8 re-run on Screens). Nothing deleted, nothing renamed. No screenshots: variable-only writes, and the instantiation clause applies to component edits only.

## Write 1. Tebra/Dimension

Decision recorded: the scale is multiples of 8 with 4 as the half step, so 0, 4, 8, 16, 24, 32, 40 are scale values and every other space/* is a component size token.

| Variable | Value | Description after | codeSyntax after |
|---|---|---|---|
| space/0 | 0 | unchanged (Checkbox Flush=Left zero inset note) | {} (was var(--tebra-space-0)) |
| space/2 | 2 | Component size token, not scale: origin unrecorded | {} |
| space/3 | 3 | Component size token, not scale: origin unrecorded | {} |
| space/4 | 4 | unchanged (empty) | {} |
| space/5 | 5 | Component size token, not scale: origin unrecorded | {} |
| space/6 | 6 | Component size token, not scale: origin unrecorded | {} |
| space/7 | 7 | Component size token, not scale: origin unrecorded | {} |
| space/8 | 8 | unchanged (empty) | {} |
| space/9 | 9 | Component size token, not scale: origin unrecorded | {} |
| space/11 | 11 | Component size token, not scale: origin unrecorded | {} |
| space/12 | 12 | Component size token, not scale: needed by Autocomplete (Value=Multiple vertical padding: MUI root padding 9 + chip margin 3) | {} |
| space/13 | 13 | Component size token, not scale: origin unrecorded | {} |
| space/14 | 14 | Component size token, not scale: origin unrecorded | {} |
| space/16 | 16 | unchanged (empty) | {} |
| space/17 | 17 | Component size token, not scale: origin unrecorded | {} |
| space/18 | 18 | Component size token, not scale: needed by Checkbox Flush=Left (derived 42 MUI SwitchBase target minus 24 SvgIcon medium; the 9px taken off the aligned side added to the opposite side so the click target stays 42) | {} |
| space/19 | 19 | Component size token, not scale: origin unrecorded | {} |
| space/23 | 23 | Component size token, not scale: origin unrecorded | {} |
| space/24 | 24 | unchanged (empty) | {} |
| **space/32** (new, VariableID:997:2) | 32 | Scale step. Decision 2026-09-03 (Daniel): the space scale is multiples of 8 with 4 as the half step. | {} |
| space/40 | 40 | unchanged (theme.spacing(5) note) | {} (had none) |

Origins: space/12 from `figmaVariablePlan` (addedDuringBuild note); space/18 from the variable's own earlier description, kept after the prefix. Twelve have no recorded origin anywhere in the schema (plan entries carry no note; batch records never cite them): space/2, 3, 5, 6, 7, 9, 11, 13, 14, 17, 19, 23. space/24 is a scale value and its plan note (Autocomplete grouped-option indent) was left alone.

codeSyntax `WEB` removed from all 19 variables that carried it (`removeVariableCodeSyntax('WEB')`); read back `{}` on all 21. Scopes WIDTH_HEIGHT + GAP on all 21, space/32 copied from space/16. Dimension collection 34 → 35 variables.

## Write 2. Tebra/Typography

Added, FLOAT, mode Default, scopes copied from font/size/body1 (FONT_SIZE) and font/lineHeight/body1 (LINE_HEIGHT), description "typography.ts <variant> (weight 700 in code)":

| Variable | id | Value | codeSyntax WEB |
|---|---|---|---|
| font/size/h4 | VariableID:996:2 | 16 | var(--tebra-font-size-h4) |
| font/lineHeight/h4 | VariableID:996:3 | 24 | var(--tebra-font-line-height-h4) |
| font/size/h5 | VariableID:996:4 | 14 | var(--tebra-font-size-h5) |
| font/lineHeight/h5 | VariableID:996:5 | 20 | var(--tebra-font-line-height-h5) |
| font/size/subtitle2 | VariableID:996:6 | 12 | var(--tebra-font-size-subtitle2) |
| font/lineHeight/subtitle2 | VariableID:996:7 | 16 | var(--tebra-font-line-height-subtitle2) |

Source `ds/typography/typography.ts:31-45`. font/weight/bold (VariableID:74:52, 700) already existed and was not added. Collection 17 → 23. The line-height code syntax uses the corrected `--tebra-font-line-height-*` pattern; the existing h2 and h3 line heights still carry `--tebra-line-height-*` in the library. They were not changed, because the write list asks only for the schema annotation (5b). It is a one-line fix if wanted.

## Write 3. Decision, no write

No letter-spacing variable. Code authors none; Button and Tab render letter-spacing normal (write 1 step 0). The 0.5px on chip and slot labels is a source-file value until Chip is render-checked. Recorded in the batch record and on `npveBuild_slotLetterSpacingUnbound`.

## Write 4. Rule 8 audit script

Finding first: the repo had no standing rule 8 audit script. Every previous rule 8 walk was written inline in that batch's `use_figma` script, and those inline walks listed GROUP and VECTOR bounds as hits even though `standingBatchRules.8_roundWithRecord` exempts them. There was nothing to edit, so the walk now exists as `rule8-audit.figma.js` at the repo root: a `use_figma` body with a header dated 2026-09-03 explaining the change, VECTOR and GROUP counted under `exempt` and not listed as hits, and an `INCLUDE_EXEMPT` toggle for comparison.

Re-run on the target's Screens page 27:2 only: 6 top-level nodes, 485 nodes walked, **0 hits**, 39 exempt. The four 573:3583 Groups (rows 26:261, 26:272, 26:282, 26:292 under 27:6, 20.000025 × 19.125002) are in the exempt bucket, not in hits. The other exempt entries are all VECTOR: Icon/DownCaret 76:4 (16.67 × 9.19), 76:7 (20 × 19.994), 200:34 (11.026 × 20), 76:10 (19.99998 × 20) and siblings.

## Write 5. Schema corrections (dated annotations, originals untouched)

- (a) `figmaBuild.pages._order_2026_09_03` added with the file's eleven pages and ids; `_order` left as written with a note that rule 7 checks should use the dated list.
- (b) `figmaVariablePlan.collections[1].annotation_2026_09_03`: h2 and h3 line-height codeSyntax lack the "font-" segment; correct pattern stated; the plan has no entries for those two (added to the library after the plan). A parallel annotation on `collections[2]` records the space/* codeSyntax removal.
- (c) `npveBuild_buttonLabelTitleCase.detailAnnotation_2026_09_03`: the "MUI's default is uppercase" sentence is wrong, with a pointer to write 1 step 0.

## Write 6. Flags

- Resolved: `npveBuild_buttonLabelTitleCase` (handling "Resolved; kept for the record.", superseded "RESOLVED 2026-09-03 by libraryTodos_write2_2026_09_03: … render-confirmed … no write needed").
- Annotated, left open: `npveBuild_slotLetterSpacingUnbound` (render evidence, Chip unchecked), `npveComparison_noSpace32Token` (token added, target rebind pending), `npveChangelog_noH4Token` (token added, target rebind pending).
- Also annotated: `libraryRead_spaceCodeSyntaxNamesMissingCssVar` (space half fixed), `libraryRead_letterSpacingInheritsMuiDefaults` (decision), `libraryRead_iconGlyphGroupIsIntrinsicGeometry` (walk side settled), `libraryRead_pagesOrderStale` (annotated).

## Verify

- All 21 space/* read back: name, value, description, codeSyntax as tabled above.
- All six new typography variables read back with the values, scopes and codeSyntax tabled above; the 17 pre-existing ones unchanged.
- Write 1's masters re-read: 130:140 and 130:159 variant 300×60, Input 300×40, Label / resting y 9 h 24, Label slot 95×40; 201:3 90×48, Label 37×20 at y 14, 16/20 TITLE with the five bindings. No component master changed.

## Standing rules

1, 2, 3, 5, 9, 10 not applicable (variables only). 4 set on every walk. 6 collections enumerated before and after. 7 library pages read earlier today; the target walk addressed Screens by name and id. 8 target Screens 0 hits; all variable values integers. 14 and 15 not applicable.

## Publishing

Manual. The new variables reach Proposals and the NPVE target only after a library publish; the target can then rebind its literal 32s on 35:332 and the Change log title 18:110 to h4.

## Files

- `report.md` (this file). No screenshots.
- Repo: `rule8-audit.figma.js` (new), `apply-library-todos-write2.js`, backup `design-system-schema.backup-2026-09-03-pre-library-todos-write2.json`.
