# Button 79:2 top row — read-only check, 2026-09-02

Library YX2n4YLrEpBXNbcc73T6dw, page Actions (259:2873), set `Button` 79:2, 1954×634, 72 children. Read with `page.loadAsync()` and `getVariableByIdAsync`; no writes, no schema record (per instruction). Screenshot: `lib-79-2-Button-set.png` (1954px, 1x), looked at: the top row is nine white pills with a thin grey-green stroke, three widths, the middle of each trio tinted, the last of each trio paler.

## 1. The nine top-row variants

All nine are `variant=contained, color=primary`. Every paint is bound. Stroke weight 1, align INSIDE, corner radius 24, on all nine. Label is Akkurat LL text, bound as noted.

| Node | Variant string as stored | w×h | Fill | Stroke | Label fill |
|---|---|---|---|---|---|
| 78:14 | variant=contained, color=primary, size=medium, State=Default | 86×38 | #FFFFFF @1.00 bound color/common/white | #B3C6C4 @1.00 bound color/core/main | #004852 bound color/core/contrastText |
| 78:18 | variant=contained, color=primary, size=medium, State=Hover | 86×38 | #CBDDE0 @1.00 bound color/action/hover | #B3C6C4 @1.00 bound color/core/main | #004852 bound color/core/contrastText |
| 78:22 | variant=contained, color=primary, size=medium, State=Disabled | 86×38 | #FFFFFF @1.00 bound color/common/white | #CBDDE0 @1.00 bound color/primary/100 | #8CB2B6 bound color/primary/200 |
| 78:2 | variant=contained, color=primary, size=small, State=Default | 68×30 | #FFFFFF @1.00 bound color/common/white | #B3C6C4 @1.00 bound color/core/main | #004852 bound color/core/contrastText |
| 78:6 | variant=contained, color=primary, size=small, State=Hover | 68×30 | #CBDDE0 @1.00 bound color/action/hover | #B3C6C4 @1.00 bound color/core/main | #004852 bound color/core/contrastText |
| 78:10 | variant=contained, color=primary, size=small, State=Disabled | 68×30 | #FFFFFF @1.00 bound color/common/white | #CBDDE0 @1.00 bound color/primary/100 | #8CB2B6 bound color/primary/200 |
| 78:26 | variant=contained, color=primary, size=large, State=Default | 95×42 | #FFFFFF @1.00 bound color/common/white | #B3C6C4 @1.00 bound color/core/main | #004852 bound color/core/contrastText |
| 78:30 | variant=contained, color=primary, size=large, State=Hover | 95×42 | #CBDDE0 @1.00 bound color/action/hover | #B3C6C4 @1.00 bound color/core/main | #004852 bound color/core/contrastText |
| 78:34 | variant=contained, color=primary, size=large, State=Disabled | 95×42 | #FFFFFF @1.00 bound color/common/white | #CBDDE0 @1.00 bound color/primary/100 | #8CB2B6 bound color/primary/200 |

For comparison, the second row (`color=secondary`) is the orange pill: fill and stroke #FF8D6E bound color/secondary/main, hover #FFAF95 color/secondary/light, disabled #FFE9E3 color/secondary/100. The `variant=text` rows have no fill and no stroke; hover fill #CBDDE0 bound color/primary/100.

## 2. Variant property list of 79:2, read from the set node today

`componentPropertyDefinitions` read without error.

| Property | Type | Default | Values |
|---|---|---|---|
| variant | VARIANT | contained | contained, text |
| color | VARIANT | primary | primary, secondary, error, inherit |
| size | VARIANT | medium | medium, small, large |
| State | VARIANT | Default | Default, Hover, Disabled |
| Label#83:165 | TEXT | "Button" | |
| Start icon#83:220 | BOOLEAN | false | |
| End icon#83:275 | BOOLEAN | false | |
| Start icon swap#83:331 | INSTANCE_SWAP | 76:8 (Icon/PlusOutlined) | |
| End icon swap#83:386 | INSTANCE_SWAP | 76:5 (Icon/DownCaret) | |

Children counted on the set: 72 = 2 × 4 × 3 × 3. The schema `figmaBuild.components.Button` entry still says 54 variants and lists the axes as `Variant, Color, Size, State` in Sentence case; the set today has 72 and lowercase code-cased axis names. The set node is what renders, so the set node is trusted; the schema entry is stale (written before the `inherit` colour and the naming migration).

## 3. "outlined" in packages/design-system

- `src/overrides/ButtonOverrides.ts`: no match.
- `src/theme/theme.ts`, `src/theme/index.ts`: no match.
- `src/stories/Button/Button.stories.tsx`: lines 3, 6, 7, 83, 88, 100, 176, 183. All are icon component names (`CloseOutlinedIcon`, `PlusOutlinedIcon`, `TrashOutlinedIcon`); no `variant="outlined"` anywhere in the story.
- `src/cobranding/createPartnerTheme.ts` line 179: `MuiOutlinedInput: {` — the input component, not Button.
- Other package hits are icon files, `ChipOverrides.ts`, `AutocompleteOverrides.tsx`, `Drawer.example.tsx`, `Paper.stories.tsx`, `Card.stories.tsx` and DataGrid stories; none concerns Button.

What ButtonOverrides.ts does define, lines 40 to 53:

```ts
containedPrimary: ({ theme }) => ({
  color: theme.palette.core.contrastText,
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.core.main}`,
  "&:hover, &:active": { color: theme.palette.core.contrastText, backgroundColor: theme.palette.action.hover, border: `1px solid ${theme.palette.core.main}` },
  "&.Mui-disabled": { color: theme.palette.primary[200], backgroundColor: theme.palette.common.white, border: `1px solid ${theme.palette.primary[100]}` },
}),
```

So the white pill with the 1px core.main stroke is the code's `variant="contained" color="primary"`, and the Figma top row binds exactly those tokens (common/white, core/main, core/contrastText, action/hover, primary/100, primary/200). The default `variant` in `defaultProps` is `contained`.

## Disagreement with the sidesheet batch

The sidesheet inventory (`npveRebuild_sidesheet_inventory_2026_09_02`) and flag `npveSidesheet_noOutlinedButton` said the source's outlined pill buttons ("Save & Add to Note", "Create New Flowsheet", "Add …") have no library variant. Today's read shows they do: the library's `variant=contained, color=primary` renders as that white outlined pill, by design, and matches `containedPrimary` in code. The earlier batch judged from the variant *name* "contained" and from the Dialog instance's orange button (which is `color=secondary`), and did not read the top row. Today's read is the one to trust: it is a rendered-paint read with bindings, verified against the screenshot and against the override file. Consequences for the earlier record, not yet corrected there:

- Mapping row "Footer buttons": the outlined middle button maps to Button 79:2 `variant=contained, color=primary`; the orange Save maps to `variant=contained, color=secondary`; Cancel to `variant=text, color=primary`. The GAP on that row should be a DSR mapping. The only residual difference is height: kit 36 vs library 38 medium (30 small, 42 large).
- The 518-wide "Add …" rows and the 425/510 full-width buttons still have no fullWidth axis; that GAP stands.
- Flag `npveSidesheet_noOutlinedButton` is wrong as worded and should be superseded when the schema is next written. Its `webAppV2BugListCandidate: true` should become false: nothing is missing in code.
- The template proposal's third footer slot no longer needs an outlined variant.

Not changed here because this batch is report-only.
