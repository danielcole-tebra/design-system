> HISTORICAL REFERENCE — 2026-10-31: start with AGENTS.md and its three active references. This file is retained as dated evidence; its old instructions, open counts and unresolved SDE work are not the active builder workflow. Read only for a specific unresolved lookup. The original is preserved in archive/builder-docs-2026-10-31/.

# The Tebra Design System

Root knowledge file. Everything here is transcribed from source and stated as fact with the file
that proves it. Nothing was measured in a browser.

**Source of truth:** `packages/design-system` inside the `web-app-v2` monorepo, published as
`@kareo-engineering/design-system` (version 0.18.3 at time of writing). All paths below are relative
to the monorepo root. A read-only checkout is conventionally at `C:\Code\web-app-v2`.

**Substrate:** `@mui/material` 5.15.12, resolved from `yarn.lock` for the `>= 5` peer range. The
monorepo has no `node_modules`; MUI source is read from `.yarn/cache` —
`@mui-material-npm-5.15.12-07f50ebff6-adee362d83.zip`, entries under `node_modules/@mui/material/`.
MUI X lives in separate archives (`@mui-x-data-grid-*`, `@mui-x-tree-view-*`).

---

# 1. Architecture

## 1.1 There are almost no Tebra components

`Button`, `Chip`, `Autocomplete`, `Switch`, `Table` and nearly everything else are imported directly
from `@mui/material`. The design system is a **theme**, not a component library. Its entire visual
surface is `styleOverrides` and `defaultProps` layered onto MUI's own `styled()` output.

The operative consequence: **reading "the component" always means reading the override file AND the
MUI substrate it rides, then resolving which one wins.** An override file existing is not evidence
that a component is themed; several exist and change nothing (§3.16, §5.7).

The genuine Tebra-authored React components are few and live outside `src/overrides`:

| Component | Path |
|---|---|
| `ReadMore` / `EllipsisText` | `packages/design-system/src/components/ReadMore/` |
| Six feedback messages | `packages/design-system/src/components/Feedback/` |
| Seven illustrations | `packages/design-system/src/components/illustrations/` |
| Icon set | `packages/design-system/src/components/icons/` |

## 1.2 The theme is three keys wide

`packages/design-system/src/theme/theme.ts`:

```ts
const theme = createTheme({
  palette: palette,          // ../palette  → paletteValues.ts
  typography: typography,    // ../typography → typography.ts
  components: { ...overrides }, // ../overrides → index.ts
});
```

`createTheme` receives **only those three keys**. Everything else is MUI's default and is therefore
substrate, not design:

- **`spacing`** — never passed, so the multiplier is MUI's default **8**. There is no Tebra spacing
  file. A bare number in an `sx` prop on a spacing-keyed property is a multiple of 8, not pixels
  (`@mui/system/esm/spacing.js:43` lists the padding keys; `createTheme/createSpacing.js` supplies
  the default). This produces real bugs — see §3.29.
- **`shape`** — never passed, so `shape.borderRadius` is **4**. Every Paper-derived surface (Menu,
  Snackbar, Alert, the Autocomplete listbox, Dialog) is radius 4 for this reason, not by decision.
- **`shadows`** — never passed, so all 25 elevation steps are MUI's own (§2.6).
- **`breakpoints`**, **`transitions`**, **`zIndex`**, **`mixins`** — all MUI defaults.
- **`palette.mode`** — unset, so it is `'light'`. **There is no dark theme.** Do not invent one.

## 1.3 Module augmentation constrains the public API

Also in `theme.ts`, and it is load-bearing — it decides which props exist at all:

- `Palette.core` is added as a full `PaletteColor`. **`core` is a Tebra-only palette slot** with no
  MUI equivalent; MUI components never reference it, so it surfaces only where a Tebra override
  names it.
- `PaletteColor` gains optional `100` and `200` keys, used throughout as light tints.
- **`ButtonPropsColorOverrides`**: `primary`, `secondary`, `inherit`, `error` are `true`;
  `success`, `info`, `warning` are `false`. So a Button has **four** colours, not seven. A comment
  on the block records that `inherit` exists for `ReadMore`'s button.
- **`ButtonGroupPropsColorOverrides`**: only `primary` and `secondary` are `true`.
- **`SvgIconPropsSizeOverrides`**: adds `xxsmall`, `xsmall`, `smaller` to MUI's
  `small | medium | large`.

## 1.4 The override set

`packages/design-system/src/overrides/index.ts` imports 37 override modules and spreads them into
one object. The registered MUI keys:

`MuiAccordion` · `MuiAccordionSummary` · `MuiAlert` · `MuiCssBaseline` · `MuiAutocomplete` ·
`MuiAvatar` · `MuiBadge` · `MuiButtonGroup` · `MuiButton` · `MuiCardActionArea` · `MuiCardActions` ·
`MuiCard` · `MuiCheckbox` · `MuiChip` · `MuiDataGrid` · `MuiDialog` · `MuiIconButton` ·
`MuiListItemButton` · `MuiList` · `MuiListItem` · `MuiMenuItem` · `MuiMobileStepper` ·
`MuiPagination` · **`MuiRadioButton`** · `MuiSnackbarContent` · `MuiSnackbar` · `MuiStepIcon` ·
`MuiSvgIcon` · `MuiSwitch` · `MuiTable` · `MuiTableRow` · `MuiTableCell` · `MuiTablePagination` ·
`MuiTab` · `MuiTabs` · `MuiTextField` · `MuiToggleButton` · `MuiTreeItem` · `MuiTreeView`

**`MuiRadioButton` is not a valid MUI component key** — MUI's is `MuiRadio`. `RadioButtonOverrides.ts`
has therefore never executed. It is the only invalid key in the set (`MuiDataGrid`, `MuiTreeItem`
and `MuiTreeView` are valid in `@mui/x-data-grid-pro` and `@mui/x-tree-view` respectively, verified
against those packages' own `name:` strings).

**Conspicuously absent** — no file registers any of these, so the surfaces are pure substrate:
`MuiTooltip`, `MuiPaper`, `MuiDrawer`, `MuiDivider`, `MuiLink`, `MuiOutlinedInput`, `MuiInputBase`,
`MuiInputLabel`, `MuiFormControl`, `MuiSelect`, `MuiMenu`, `MuiPopover`, `MuiCardHeader`,
`MuiCardContent`, `MuiCardMedia`, `MuiStepConnector`, `MuiStepLabel`, `MuiCircularProgress`,
`MuiToolbar`, `MuiAppBar`.

## 1.5 Cascade resolution

MUI's base `styled()` runs first; theme `styleOverrides` are appended after and usually win. Two
things break that rule of thumb, and both matter in practice:

1. **CSS specificity still applies.** A base rule with higher specificity beats a later theme rule
   of lower specificity. Doubled/quadrupled selectors (`&&`, `&&&&`) are used in this codebase
   specifically to win those fights (§3.25, §1.7).
2. **`overridesResolver` array order decides between two overrides.** When two theme entries touch
   the same property, read the component's `overridesResolver` to see which is applied last. MUI's
   Chip resolver puts `styles[colorX]` after the variant styles, which is why Tebra's per-colour
   Chip backgrounds beat MUI's `outlined → transparent` rule (§3.9).

## 1.6 `defaultProps` vs `styleOverrides`

A `defaultProps`-only override means **the visual surface is pure substrate** and the theme only
changed which props arrive. Files that are `defaultProps`-only: `CardOverrides`, `CardActionAreaOverrides`,
`DialogOverrides`, `ListOverrides`, `ListItemButtonOverrides`, `BadgeOverrides`,
`AccordionSummaryOverrides`, `TabsOverrides`, `TextFieldOverrides`, `SnackbarOverrides`,
`TreeViewOverrides`, `TablePaginationOverrides`, `RadioButtonOverrides` (dead).

## 1.7 The global focus treatment and where it actually applies

`packages/design-system/src/overrides/CssBaselineOverrides.ts` is the whole of it:

```ts
MuiCssBaseline: { styleOverrides: (theme) => ({
  "*:focus-visible":            { outline: `3px solid ${theme.palette.primary.main}` },
  "*:focus:not(:focus-visible)": { outline: "none" },
}) }
```

The rule reaches every focusable element, but **it only lands on nodes that do not reset it**, and
MUI's form controls reset it. Read it as a mechanism, not as a universal outcome.

`InputBase` sets `"&:focus": { outline: 0 }` on the inner `<input>`
(`@mui/material/InputBase/InputBase.js`). Emotion emits that as a class rule, `.css-hash:focus`,
specificity **0,2,0**, which beats a global `*:focus-visible` at **0,1,0**. `OutlinedInput` then
paints focus on its own element instead:
`&.Mui-focused .notchedOutline → { borderColor: palette[color].main, borderWidth: 2 }`.

So on **every `OutlinedInput`-based control** — `TextField`, `<TextField select>`, and any trigger
built on one — focus renders as the **notched outline at 2px in `primary.main`, with the field's 4px
radius intact, and no ring.** Not the two together. Verified against MUI 5.15.12 source and against
the library's own focused frames (`Text field.png` row 3 and the Select in
`REFERENCE — Select + Menu composition`), which draw the notch alone.

Where nothing resets it, the rule does apply and gives a **3px solid `#004852` outline**: buttons,
links, segments, tabs. Components that author a focus visual of their own are listed in §4.5 — note
that the form-control reset above is a different mechanism and is not in that list.

**This only applies where `<CssBaseline />` is mounted.** It is mounted in exactly two places in the
monorepo:

- `packages/hooks/src/ThemeProvider/ThemeProvider.tsx:12` — which wraps
  `MuiThemeProvider theme={designSystemTheme}` and is itself wrapped by
  `packages/hooks/src/TebraProvider/TebraProvider.tsx`, the standard app shell. `<TebraProvider>` is
  mounted in 20 files, 13 of them micro-frontend entry points (`*/src/root.component.tsx`,
  `App.tsx`, `tebra-*.tsx`); the rest are error-boundary pages and nested providers.
- `packages/composition-ui/src/root.component.tsx:36`.

So in the product the rule is effectively global. **In Storybook it is not** — see §1.9.

Two components deliberately defeat it: `NavIconButton` (§1.8) and, indirectly, `MuiButton`, whose
`defaultProps` disable all ripples with the comment *"okay because there's an outline on focus"*.

## 1.8 The second theme: cobranding

`packages/design-system/src/cobranding/` builds a **separate MUI theme** used only by the primary
navigation chrome.

```
navigation-ui/src/root.component.tsx:37        mounts CobrandedApp
navigation-ui/src/components/CobrandedApp.tsx  wraps App in ThemeProvider theme={partnerTheme}
navigation-ui/src/context/CobrandingContext.tsx defaults to createPartnerTheme("tebra")
```

`createPartnerTheme(partnerId)` (`src/cobranding/createPartnerTheme.ts`) ends with:

```ts
return createTheme(defaultTebraTheme, partnerThemeOverrides);
```

Six base palettes exist in `src/cobranding/baseThemes.ts`: `tebraDefault`, `blueDark`, `blueLight`,
`grayLight`, `green`, `orange`. `tebraDefault` is:

| `NavigationPalette` key | Value | Palette home |
|---|---|---|
| `primary` | `#004852` | growth 1 |
| `primaryLight` | `#417E86` | growth 2 |
| `primaryDark` | `#003840` | **none** |
| `navIconHoverBackground` | `#195b63` | **none** |
| `navText` | `#ffffff` | common.white |
| `submenuBackground` | `#195b63` | **none** |
| `submenuText` | `#ffffff` | common.white |
| `submenuItemHoverBackground` | `#417E86` | growth 2 |
| `searchInputBackground` | `#002328` | **none** |
| `searchInputText` | `#ffffff` | common.white |
| `searchResultsBackground` | `#195b63` | **none** |

`#195b63`, `#002328` and `#003840` return zero matches in `src/palette/paletteValues.ts`.

### The destructive deep-merge

`createTheme(base, overrides)` deep-merges. **`deepmerge` cannot merge two functions — the later one
replaces the earlier outright.** Both sides write `styleOverrides.root` as a function, so:

- `createPartnerTheme`'s `MuiIconButton.root` **replaces** `IconButtonOverrides.ts`'s root. The nav
  loses canonical `color: grey[600]`, the `&:hover, &:active → action.hover` rule, and
  `&:disabled → grey[500]`.
- `createPartnerTheme`'s `MuiMenuItem.root` **replaces** `MenuItemOverrides.ts`'s root. The nav loses
  the canonical focus-visible treatment (white ground, 3px `primary.main` border, radius 4) and the
  `Mui-selected` rules entirely.

Sibling keys survive normally: `sizeSmall`, `colorPrimary`, `colorError` are plain objects and merge.
That asymmetry is what makes the replacement easy to miss — and the file's own docstring claims the
opposite ("all standard component overrides … are preserved").

The partner theme also **remaps four palette roots** for everything beneath it:
`text.primary → navText` (white), `background.paper → submenuBackground`,
`action.hover → navIconHoverBackground`, `divider → submenuText` (white). Anything reasoning about
nav colour from the canonical palette will be wrong.

`MuiToolbar` is registered **only** in the partner theme — there is no `MuiToolbar` or `MuiAppBar`
override in `src/overrides` at all.

**Practical rule:** the nav is governed by its own theme. Reading `Navigation.tsx` +
`NavIconButton.tsx` alone yields a convincing contrast defect (white glyph on `action.hover`, which
is `#CBDDE0` in the canonical palette, ≈1.4:1) that **does not exist** — the partner theme remaps
`action.hover` to `#195b63`, giving ≈7.7:1. "The theme is the component" applies one level further
out here.

## 1.9 What Storybook is and is not evidence of

`packages/design-system/src/stories/` — one folder per component. It is the **only** declaration of
which variant axes are considered part of the design system. Use it for structure.

**Storybook is evidence of:**
- Which props are treated as axes (`argTypes.options`).
- Which value is the intended default (`Story.args`).
- Explicit variation matrices where they exist (`stories/Checkbox/Checkbox.config.ts`).

**Storybook is not evidence of:**
- **Rendered truth.** `StorybookDecorator` is `<ThemeProvider theme={theme}><Story /></ThemeProvider>`
  and mounts **no `<CssBaseline />`**. The global focus outline does not exist in Storybook. Before
  version 0.11.0 (2024-02-06, per `CHANGELOG`) the decorator did not load the Tebra theme at all and
  Storybook rendered stock Material.
- **Geometry.** Story wrappers are scaffolding. Every Autocomplete story wraps in `Box width={300}`;
  `ReadMore` stories wrap in a 700px Box; `MobileStepper`'s 400px is a story `Box maxWidth`.
- **Correctness.** Several stories contradict the components they document (§5).
- **Completeness.** `argTypes` entries sometimes exist purely to *hide* controls — Divider's
  `argTypes` for `component`/`orientation`/`flexItem` are all `table: { disable: true }`. Read the
  body, not the key names.
- **Product usage.** A prop a story never exercises can still be used heavily downstream, and vice
  versa (§5.9).

**Storybook titles are not a taxonomy.** `Components/Data Display` is a catch-all holding
Icon button, Toggle button, Read more, Divider, Typography and the icon catalogue. Link is filed
under `Components/Navigation`, Dialog under `Components/Feedback`.

---

# 2. Tokens

## 2.1 The palette and its brand aliases

`packages/design-system/src/palette/paletteValues.ts`. Every value below is a literal in that file;
the alias names are its own trailing comments.

**Growth (teal) — the primary brand ramp**

| Token | Hex | Alias |
|---|---|---|
| `primary.light` | `#417E86` | growth 2 |
| `primary.main` | `#004852` | growth 1 |
| `primary.dark` | `#004852` | growth 1 |
| `primary.200` | `#8CB2B6` | growth 3 |
| `primary.100` | `#CBDDE0` | growth 4 |
| `primary.contrastText` | `#FFFFFF` | |

**`primary.dark` is identical to `primary.main`.** Every MUI rule that darkens on interaction by
reaching for `palette[color].dark` therefore produces no visible change on primary (§3.9).

**Vitality (coral) — secondary**

| Token | Hex | Alias |
|---|---|---|
| `secondary.light` | `#FFAF95` | vitality 2 |
| `secondary.main` | `#FF8D6E` | vitality 1 |
| `secondary.dark` | `#DC785D` | vitality 0 |
| `secondary.200` | `#FFCFBF` | vitality 3 |
| `secondary.100` | `#FFE9E3` | vitality 4 — source comment: *"used for disabled"* |
| `secondary.contrastText` | `#004852` | growth 1 |

**Core — a Tebra-only palette slot** (no MUI equivalent; see §1.3)

| Token | Hex | Alias |
|---|---|---|
| `core.light` | `#D4E0DD` | core 3 |
| `core.main` | `#B3C6C4` | core 2 |
| `core.dark` | `#8CA7A2` | core 1 |
| `core.100` | `#E9EFEE` | core 4 |
| `core.contrastText` | `#004852` | growth 1 |

**Status**

| Token | Hex | Alias | |
|---|---|---|---|
| `error.light` | `#FBCBD1` | siren | |
| `error.main` | `#D83B4D` | first aid | |
| `error.dark` | `#B51A2C` | remedy | |
| `warning.light` | `#FCDE73` | energize | |
| `warning.main` | `#FCDE73` | energize | **identical to light** |
| `warning.dark` | `#F2BA2A` | neuron | |
| `success.light` | `#6FC691` | restore | |
| `success.main` | `#3FA266` | cyto | |
| `success.dark` | `#2B865A` | vigor | |
| `info.light` | `#067889` | practice | |
| `info.main` | `#4678CC` | circadian | |
| `info.dark` | `#004852` | growth 1 | **same value as `primary.main`** |
| `error/warning/success/info.contrastText` | `#FFFFFF` | | |

**Synapse (greys)** — `grey` defines **300, 400, 500, 600, 900 and `contrastText` only.**

| Token | Hex | Alias |
|---|---|---|
| `grey.300` | `#F6F6F6` | synapse 5 |
| `grey.400` | `#D6D6D6` | synapse 4 |
| `grey.500` | `#9A9A9A` | synapse 3 |
| `grey.600` | `#545454` | synapse 2 |
| `grey.900` | `#2B2B2B` | synapse 1 |

`createPalette` **deep-merges this partial ramp onto MUI's full default grey**, so `grey[50]`,
`100`, `200`, `700`, `800`, `A100…A700` all survive as MUI's own values. Anything reading
`grey[700]` gets MUI's `#616161` — a grey with no Tebra provenance at all (§3.14).

**Text, background, divider**

| Token | Value | Alias |
|---|---|---|
| `text.primary` | `#000000` | |
| `text.secondary` | `#545454` | synapse 2 |
| `text.disabled` | `#9A9A9A` | synapse 3 |
| `text.hint` | `#545454` | synapse 2 — **non-standard MUI key**, a Tebra addition |
| `background.paper` | `#FFFFFF` | |
| `background.default` | `#E8E5DF` | backbone 3 |
| `divider` | `#D6D6D6` | synapse 4 |

The "backbone" ramp is incomplete in the palette: `backbone 2` (`#F0EEE8`) appears only as
`action.selected`, `backbone 3` only as `background.default`, and no `backbone 1` is defined.

## 2.2 The action tokens — the single most consequential decision

```ts
action: {
  active:   "#004852",            // growth 1
  hover:    "#CBDDE0",            // growth 4
  selected: "#F0EEE8",            // backbone 2
  disabled: "rgba(0, 0, 0, 0.5)",
  focus:    "#004852",            // growth 1
}
```

Against MUI's defaults (`@mui/material/styles/createPalette.js`, the `light` block):

| Key | MUI default | Tebra | Effect |
|---|---|---|---|
| `active` | `rgba(0,0,0,0.54)` | `#004852` opaque | |
| `hover` | `rgba(0,0,0,0.04)` | `#CBDDE0` **opaque** | every MUI rule expecting a 4% black tint now paints solid light teal |
| `selected` | `rgba(0,0,0,0.08)` | `#F0EEE8` **opaque** | same, for selection grounds |
| `disabled` | `rgba(0,0,0,0.26)` | `rgba(0,0,0,0.5)` | every substrate disabled rule is ~2× darker |
| `focus` | `rgba(0,0,0,0.12)` | `#004852` opaque | |

**Tebra replaced three tokens that MUI's own component sources use as translucent tints with opaque
colours.** MUI components that read `palette.action.hover` / `.selected` directly now paint a solid
ground — `ListItemButton`, `MenuItem`, `PaginationItem`, `TableRow`, `TreeItem` all do this. This is
the root cause of several component-level oddities and is the first thing to check when a hover or
selection reads heavier than expected.

The **opacity companions are not overridden** and keep MUI's values: `hoverOpacity 0.04`,
`selectedOpacity 0.08`, `focusOpacity 0.12`, `disabledOpacity 0.38`, `activatedOpacity 0.12`,
`disabledBackground rgba(0,0,0,0.12)`. So any MUI rule of the form `alpha(action.selected,
selectedOpacity + hoverOpacity)` now computes **12% of an opaque cream**, which is near-invisible —
that is exactly the default Chip's clickable hover (§3.9).

## 2.3 Computed values with no palette home

These are produced by MUI's own arithmetic at runtime and exist nowhere in `paletteValues.ts`. They
are real rendered colours.

| Value | Origin |
|---|---|
| `rgba(97,97,97,0.92)` | `alpha(grey[700], 0.92)` — MUI Tooltip background; `grey[700]` is MUI's `#616161` |
| `rgba(0,0,0,0.87)` | `getContrastText(warning.main)` — filled warning Alert text. `#FCDE73` scores ≈1.3 against white, below MUI's `contrastThreshold` of 3, so the function returns **MUI's internal `light.text.primary`**, not Tebra's `#000` |
| `rgba(0,72,82,0.08)` | `alpha(primary.main, selectedOpacity)` — selected `TableRow` / `ListItemButton` / `MenuItem` |
| `rgba(0,72,82,0.04)` | `alpha(primary.main, hoverOpacity)` — the ripple-hover circle shared by Checkbox, Radio and Switch |
| `rgba(240,238,232,0.12)` | `alpha(action.selected, selectedOpacity + hoverOpacity)` — default Chip clickable hover |
| `alpha([color].main, 0.7)` for secondary / error / info / success / warning | MUI Chip outlined-coloured border |
| `alpha([color].main, 0.04)` for secondary / warning | MUI Chip outlined clickable hover |
| `rgba(0,0,0,0.5)` | MUI `Backdrop` default scrim, rendered at runtime by `Modal` |
| `rgba(0,0,0,0.23)` | `OutlinedInput`'s resting notched-outline colour — the input layer is entirely unthemed (§3.4) |

## 2.4 Hardcoded orphans

Literals typed directly into source, matching no palette entry:

| Value | Where | Note |
|---|---|---|
| `#C3E7C0` | `overrides/ChipOverrides.ts` `colorSuccess.backgroundColor` | the success chip's fill |
| `#FD919F` | `overrides/ChipOverrides.ts` `colorError` clickable `:hover/:active` | |
| `#004952` | all seven SVGs in `src/components/illustrations/` — 405 of 490 colour usages | **one step off** `primary.main` `#004852` in the green channel (`0x49` vs `0x48`). A grep for `004852` across that directory returns zero files: no illustration ever uses the palette teal |
| `#F8F3EB` | `src/components/illustrations/NothingToSeeHereIllustration.svg`, a single fill | nearest neighbours are `action.selected #F0EEE8` and `background.default #E8E5DF`; it is neither |
| `#0000EE` | not authored — the browser default anchor colour | reached because `ForbiddenErrorMessage.tsx` links with a raw `<a>` and nothing in the package styles anchors (§3.24) |
| `#195b63`, `#002328`, `#003840` | `src/cobranding/baseThemes.ts` `tebraDefault` | nav-only (§1.8) |
| `#f7f4eb` | `navigation-ui/src/components/Navigation/TebraLogo.tsx`, a `<style>` block `.a{fill:#f7f4eb;}` | one step off `#F8F3EB`; **not** `currentColor`, so the wordmark cannot follow a partner theme |
| `black` | `overrides/AccordionSummaryOverrides.tsx` `htmlColor="black"` | `htmlColor` bypasses the palette; the keyword happens to equal `text.primary` today |

## 2.5 Typography

`packages/design-system/src/typography/typography.ts`.

```ts
export const fontSize = 16;
export const fonts = ['"Akkurat LL"', '"Helvetica - Neue"', "Helvetica", "Arial"];
```

`fontSize: 16` and `htmlFontSize: 16` are both set.

**The ramp — authored as `rem` literals, so it renders exactly:**

| Variant | Size | Line height | Weight |
|---|---|---|---|
| `h1` | 32px (`2rem`) | 48px | 700 |
| `h2` | 24px (`1.5rem`) | 36px | 700 |
| `h3` | 20px (`1.25rem`) | 32px | 700 |
| `h4` | 16px (`1rem`) | 24px | 700 |
| `h5` | 14px (`0.875rem`) | 20px | 700 |
| `subtitle2` | 12px (`0.75rem`) | 16px | 700 |
| `body1` | 16px | 24px | 400 |
| `body2` | 14px | 20px | 400 |
| `caption` | 12px | 16px | 400 |
| `button` | 16px | 24px | 400, `textTransform: capitalize` |

`button`'s `capitalize` is a Tebra override; MUI's default is `uppercase`.

Because `fontFamily` differs from MUI's default stack, **MUI skips its automatic `letterSpacing`
computation** — every variant is `letterSpacing: normal` (0).

### The missing variants

The ramp defines **no `h6`, no `subtitle1`, and no `overline`.** Anything asking for them falls
through to MUI's own values. This is not theoretical: **`DialogTitle` renders
`Typography variant="h6"`**, so every dialog title in the product is typeset off-ramp — MUI's `h6` is
`pxToRem(20)` at `fontWeightMedium` 500.

### The `pxToRem` coefficient inflation

MUI computes `coef = typography.fontSize / 14`, then `pxToRem(size) = size / htmlFontSize * coef`
(`@mui/material/styles/createTypography.js`). With `fontSize: 16`:

```
coef = 16 / 14 = 1.1428571428571428
```

**Every `pxToRem()` call — in the Tebra theme and inside MUI's own component sources — renders
14.29% larger than the number it encodes.**

| Call | Encodes | Renders | Where |
|---|---|---|---|
| `pxToRem(16)` | 16 | 18.29px | `ButtonOverrides` `iconSize{Small,Medium,Large}` |
| `pxToRem(20)` | 20 | 22.86px | MUI `SvgIcon` `fontSizeSmall` |
| `pxToRem(24)` | 24 | 27.43px | MUI `SvgIcon` `fontSizeMedium` |
| `pxToRem(35)` | 35 | **40** | MUI `SvgIcon` `fontSizeLarge` — lands on a round number by coincidence |
| `pxToRem(13)` | 13 | 14.86px | MUI `Chip` root `fontSize` |
| `pxToRem(14)` | 14 | **16** | MUI `ListSubheader` — the Autocomplete group label |
| `pxToRem(11)` | 11 | 12.57px | MUI `Tooltip` |

**The ramp itself is immune** — it is authored as `rem` string literals, not `pxToRem()` calls, so
`h1` really is 32px. Only `pxToRem()` call sites inflate.

**`SvgIconOverrides.ts` contains the smoking gun.** Its `fontSizeSmall / Medium / Large` are
`1.4285714285714284rem`, `1.7142857142857142rem` and `2.5rem` — **exact restatements of MUI's own
already-inflated `pxToRem(20|24|35)`**, i.e. values read out of a browser and pasted back. All three
are no-ops. Only `fontSizeXxsmall` (`0.75rem` = 12px), `fontSizeXsmall` (`1rem` = 16px) and
`fontSizeSmaller` (`1.25rem` = 20px) are genuine Tebra additions, and they are authored on a clean
16px base that ignores the coefficient entirely. **One file, two unit systems.**

### The font has no Medium

Akkurat LL ships **Thin, Light, Regular and Bold. There is no Medium (500) face.** The ramp assigns
only 400 and 700, so it maps losslessly. But three substrate surfaces ask for `fontWeightMedium`
(500) and all three ship Regular: MUI's `ListSubheader` default (the Autocomplete group label),
MUI's `Tooltip`, and MUI's `h6` (reached via `DialogTitle`). Never read a 500 weight anywhere in
this system as a design decision.

## 2.6 Elevation

`createTheme` is never passed `shadows`, so all 25 steps are MUI's defaults verbatim
(`@mui/material/styles/shadows.js`). Nothing in the theme reviews or overrides any of them.

**Only seven steps are reachable by anything in the library:**

| Step | Reached by |
|---|---|
| 0 | nav dropdown paper (partner theme) |
| 1 | `Paper` default; the Autocomplete listbox; `Card` default |
| 2 | `Paper` story variant |
| 3 | named directly by `AlertOverrides.filled` → `theme.shadows[3]` |
| 4 | `Paper` story variant |
| 6 | `SnackbarContent` |
| 8 | `Popover` default, which `Menu` inherits |
| 24 | `Dialog` |

MUI's step 16 (`Drawer`'s temporary variant) is **not** reachable — the only Drawer usage is
`variant="persistent"`, which is a docked drawer and gets a 1px divider border instead of elevation.

## 2.7 Spacing and radius

- **Spacing base 8**, MUI substrate (§1.2).
- **`shape.borderRadius` 4**, MUI substrate. Menu, Snackbar, Alert, Dialog, the Autocomplete listbox,
  `MenuItem`'s focus-visible box.
- **Button radius 24** — Tebra, `ButtonOverrides.ts`. It exceeds half the height at every size, so
  CSS clamps it to `height/2` and it renders as a pill (15 / 19 / 21).
- **Chip radius 16** — MUI substrate, computed as `32/2`.
- **Border widths:** 1px hairline (Tebra adds it to contained Buttons; MUI uses it for the notched
  outline), 2px focused input outline (substrate), **3px focus-visible ring** (Tebra, global, §1.7).

---

# 3. Component truth table

`Layer` is one of **themed** (Tebra authors the surface), **substrate** (MUI's own, surfacing because
nothing overrides it), or **mixed**.

## 3.1 Button — mixed

`overrides/ButtonOverrides.ts`. Four colours only (`primary`, `secondary`, `error`, `inherit`), from
the `theme.ts` augmentation.

- `defaultProps`: `variant: "contained"` (MUI's default is `"text"`), plus `disableRipple`,
  `disableTouchRipple`, `disableFocusRipple` all true.
- `root`: `borderRadius: 24`; `boxShadow: none` across rest/hover/active/focus/disabled.
- `sizeSmall`: spreads `theme.typography.body2` — 14/20 rather than button's 16/24.
- **Heights: contained 30 / 38 / 42, text 28 / 36 / 40** (small / medium / large). Contained is 2px
  taller at every size because Tebra adds a 1px border that stock MUI contained does not have.
- `size="large"` was never Tebra-specified: it inherits MUI's 15px font against Tebra's 24px
  line-height. Only `sizeSmall` is overridden.
- **`inherit` is not in the reference grid, by decision.** Four colours exist; the Figma variant set
  and `Button.png` show **three** — `primary`, `secondary`, `error`. `color="inherit"` takes its
  colour from whatever the ancestor carries, so it has no fixed appearance a variant can depict.
  It is deliberately unmodelled, not missing. Do not read the export as the colour count.

**Traps**

- **The hierarchy is inverted.** `containedPrimary` is `common.white` with a `core.main` border and
  `core.contrastText` label — a visually *outlined* button. `containedSecondary` is a filled
  `secondary.main` coral. The contained primary is the quieter of the two.
- **`text` collapses primary and secondary.** The generic `text` override hard-sets
  `color: primary.main`, and there is no `textSecondary` override, so `variant="text"` renders
  identically for `color="primary"` and `color="secondary"` — both `#004852`.
- **Icon margin pull.** Whenever a start or end icon is present, 4px comes off the outer edge (2px
  at small) — but **the padding rule is untouched; the pull is a negative margin on the icon slot.**
  `ButtonStartIcon` is `marginLeft: -4` / `marginRight: 8`, dropping to `marginLeft: -2` at small,
  and `ButtonEndIcon` mirrors it (`marginRight: -4` / `marginLeft: 8`, `-2` at small)
  (`@mui/material/Button/Button.js`). Grep `marginLeft`/`marginRight` in that file, not a padding
  rule, or the search returns nothing and the pull looks unimplemented. It is a property of the
  icon's presence, not of a variant.
- `iconSize{Small,Medium,Large}` all set the same `pxToRem(theme.typography.fontSize)` = encodes 16,
  renders 18.29px.

## 3.2 Button group / Segment — themed

`overrides/ButtonGroupOverrides.ts`.

- `defaultProps`: `variant: "contained"` **and** `color: "secondary"`. MUI's own defaults are
  `outlined` / `primary`, so both are changed.
- **No seam collapse.** MUI's `marginLeft: -1` seam trick is scoped to `variant === 'outlined'` only.
  Since every group here is contained, adjacent segments sit flush and the join is **two full 1px
  borders**. Tebra resolves the doubling per colour: primary sets `borderRightColor: transparent` on
  non-last segments; secondary sets it to `primary.main`.
- `contained` sets `transition: border 0ms` and `&:focus { zIndex: 2 }` on child buttons — the
  comment says it is to keep the global focus outline visible above a sibling. **That is direct
  evidence the global outline is expected on segments.**

**Trap:** a disabled primary *segment* gets a `core.main` `#B3C6C4` border, while a disabled
standalone contained-primary *Button* gets `primary[100]` `#CBDDE0`. Group styles resolve after the
button's own, so the same button looks different inside a group. Separately, a non-last primary
segment's hover binds `primary[100]` where a standalone Button's binds `action.hover` — identical
values today, but different tokens.

## 3.3 Icon button — themed

`overrides/IconButtonOverrides.ts`. Colours `default` (root), `primary`, `error`.

- root: `color: grey[600]`; hover/active background `action.hover`; disabled `grey[500]`.
- `colorPrimary`: `primary.main`, hover `action.hover`, disabled `primary[200]`.
- `colorError`: `error.main`, hover `error.light`, disabled `error.light`.
- `sizeSmall`: `padding: "0.5rem"` = 8px.

**Traps**

- **`sizeSmall` padding 8 equals medium's padding**, so small and medium differ only by icon size:
  boxes are **34px and 40px**, not MUI's 28/40. The touch target grows 6px and the two sizes stop
  being visually distinct at the box level.
- **Hover is a solid opaque ground** (`action.hover` = `#CBDDE0`), where Checkbox/Radio/Switch use a
  4% ripple tint. Same lineage, different model.

## 3.4 Text field / Outlined input — substrate, with one Tebra caret

`overrides/TextFieldOverrides.tsx` is `defaultProps` **only** — a `SelectProps.IconComponent`. There
is **no `MuiOutlinedInput`, `MuiInputBase`, `MuiInputLabel` or `MuiFormControl` override anywhere in
the system.** The entire input layer is raw MUI.

- **Heights 56 (medium) / 40 (small)**, substrate.
- **No background.** `OutlinedInput`'s root sets position, border-radius and border-colour rules and
  **declares no `backgroundColor`** — the control is transparent, and whatever sits behind it shows
  through the notch gap.
- Resting outline `rgba(0,0,0,0.23)`, MUI's own. Focused outline 2px.
- Disabled outline reads `action.disabled` = `rgba(0,0,0,0.5)`, roughly twice as dark as MUI intends.
- The floating-label notch is a real `fieldset` whose `legend` interrupts the top border.

### The Select caret does not rotate — the exact mechanism

`TextFieldOverrides.tsx` supplies:

```tsx
const GrayDownCaretIcon = styled(DownCaretIcon)(({ theme }) => ({
  color: theme.palette.grey[600],
  top: "calc(50% - 12px)",
  right: "4%",
  position: "absolute",
  pointerEvents: "none",
}));
// …
SelectProps: { IconComponent: () => <GrayDownCaretIcon fontSize="small" /> }
```

MUI renders the icon as
`<SelectIcon as={IconComponent} className={classes.icon} ownerState={ownerState} />`
(`@mui/material/Select/SelectInput.js`). The open-state rotation lives in `nativeSelectIconStyles`
(`@mui/material/NativeSelect/NativeSelectInput.js`) as
`...(ownerState.open && { transform: 'rotate(180deg)' })` — an **ownerState-driven emotion style
applied through the generated className**, not a standalone class rule.

`IconComponent` here is an arrow function that **accepts no props**. It therefore discards both
`className` and `ownerState`. Consequences, all following from the same cause:

1. **The caret never rotates when the select opens.** There is no visual difference between open and
   closed.
2. The base `nativeSelectIconStyles` positioning (`position: absolute; right: 0; top: calc(50% - .5em)`)
   never lands either — which is precisely why `GrayDownCaretIcon` has to declare its own.
3. **Its inset is a percentage.** `right: "4%"` means a 600px field puts the caret 24px from the edge
   where a 300px field puts it 12px. Autocomplete's equivalent indicator uses a fixed `right: 9`.
4. `top: calc(50% - 12px)` assumes a 24px icon, but `fontSize="small"` resolves to 20px intended /
   22.86px computed.

`TablePaginationOverrides.tsx` uses the identical props-dropping pattern with
`fontSize="xxsmall"` and `right: "0.4rem"`.

### Other Select divergences from a plain outlined TextField

`<TextField select>` is the only closed-choice control in this system — there is **no standalone
`<Select>` anywhere** (§5.6). Its rendered tree is `Select → Menu → Popover Paper → MenuList →
MenuItem`, so `Menu` and `MenuItem` are live surfaces even without a story.

## 3.5 Checkbox — themed

`overrides/CheckboxOverrides.tsx`. `defaultProps` supply `color: "primary"` and three **genuine
Tebra glyphs** (`CheckboxUncheckedIcon`, `CheckboxCheckedIcon`, `CheckboxIndeterminateIcon`).
`colorPrimary` sets disabled: `grey[400]` unchecked, `primary[100]` when checked or indeterminate.
Hover is MUI's ripple circle at `alpha(primary.main, 0.04)`.

`stories/Checkbox/Checkbox.config.ts` is an explicit variation matrix — the only one in the set.

## 3.6 Radio — substrate (its override is dead)

`overrides/RadioButtonOverrides.ts` registers under **`MuiRadioButton`, which is not a valid MUI
key** (MUI's is `MuiRadio`). The file has never executed. It contains only
`defaultProps: { disableRipple: true, disableFocusRipple: true }` — so Radio does not even get its
ripples disabled.

Radio therefore ships **raw MUI substrate**: MUI's own ring+dot glyphs (not Tebra's), and disabled
falling through to `&.Mui-disabled { color: action.disabled }` = `rgba(0,0,0,0.5)`.

**Trap:** Checkbox and Radio sit side by side in forms and disagree on disabled colour purely
because one key is valid and the other is not.

## 3.7 Switch — themed

`overrides/SwitchOverrides.ts`, valid `MuiSwitch` key, `styleOverrides.root` only — no
`defaultProps`, no size-specific rule.

Colours are fully Tebra: ON thumb `primary.light`, ON track `primary[200]` at `opacity: 1`
(overriding MUI's 0.5); OFF thumb `grey[400]`, OFF track `grey[500]` at `opacity: 1` (overriding
MUI's 0.38); disabled ON `primary[200]`/`primary[100]`, disabled OFF `grey[300]`/`grey[400]`.

Geometry is substrate: root 58×38 (34 + 12·2 by 14 + 12·2), track 34×14 radius 7, thumb 20,
`SwitchBase` 38×38, checked `translateX(20)`. Small: root 40×24, track 26×10, thumb 16,
`translateX(16)`.

Hover is the `SwitchBase` ripple at `alpha(action.active, 0.04)`; since `action.active` and
`primary.main` are the same `#004852`, checked and unchecked hover are the same colour.

**Size in practice:** `size` is decided entirely at the call site. All 13 `<Switch>` tags across 10
files in the monorepo omit it, so product renders `medium` everywhere.

## 3.8 Form control label — substrate

Only `labelPlacement="end"` (the default) is used anywhere. The label itself is not focusable; the
control slot carries the focus state.

## 3.9 Chip — mixed, and the richest source of traps

`overrides/ChipOverrides.ts`. `defaultProps: { size: "medium" }`. Tebra authors
`colorSuccess`, `colorInfo`, `colorWarning`, `colorError`, `deleteIcon`, `outlinedPrimary` and
`root`. **`primary`, `secondary`, `default` and all geometry are substrate.**

Geometry: height 32 (small 24), radius 16 (small 12), `fontSize: pxToRem(13)` → renders 14.86px,
`deleteIcon` margin `0 5px 0 -6px`.

| Colour | Filled | Outlined |
|---|---|---|
| `default` | substrate grey | substrate transparent |
| `primary` | substrate | **white fill + full-strength `primary.main` border** (`outlinedPrimary`) |
| `secondary` | substrate | substrate transparent, 70% border |
| `success` | `#C3E7C0` hardcoded | **`#C3E7C0` — not transparent** |
| `info` | `core.light` | **`core.light` — not transparent** |
| `error` | `error.light` | **`error.light` — not transparent** |
| `warning` | substrate `warning.main` | **transparent** — `colorWarning` sets only `color`, no background |

**Traps**

- **Outlined coloured chips are not transparent.** MUI's base `styled()` sets
  `variant outlined → backgroundColor: transparent`, but theme `styleOverrides` are appended after
  the base and `styles[colorX]` applies regardless of variant. Tebra's per-colour backgrounds
  therefore win. Warning is the exception, and only because its override omits a background.
- **A filled primary chip's clickable hover is invisible.** MUI's coloured-chip hover is
  `palette[color].dark`, and `primary.dark === primary.main`.
- **The default chip's clickable hover is a 12% ghost.** MUI computes
  `alpha(action.selected, 0.08 + 0.04)`. That formula assumes a translucent chip base, which is true
  in stock MUI. Tebra's `action.selected` is an opaque `#F0EEE8`, so 12% of it is almost
  imperceptible.
- **Hover *is* the clickable affordance.** MUI applies the hover treatment only to
  `.MuiChip-clickable`, i.e. only when `onClick` is present. There is no separate clickable prop to
  model.
- **The delete icon is full-strength `primary.main`.** `ChipOverrides.deleteIcon` sets it with no
  alpha, beating MUI's own `alpha(main, 0.7)` for outlined-coloured chips and `alpha(text.primary,
  0.26)` for filled ones. The glyph itself is **MUI's `Cancel` disc**, not a Tebra icon.
- `colorSuccess`/`colorInfo`/`colorError` each define their own `.MuiChip-clickable` hover;
  `colorWarning` does not, so warning falls through to MUI's `warning.dark` `#F2BA2A`.

**Product usage** (79 `<Chip>` tags outside the design-system stories): all seven colours are
reachable, but unevenly — `success` 13, `info` 11, `warning` 9, `primary` 9 authored; `error` has
**one** authored site and is otherwise reached through ternaries and status maps; `secondary` has
**two** sites in the whole monorepo; `default` is never written literally and arrives at 19 tags by
omission.

## 3.10 Paper — substrate

**There is no `MuiPaper` override.** Paper takes `shape.borderRadius` = **4**. Every Paper-derived
surface already in the system is 4 for that reason. `variant="outlined"` and `square` come from the
story.

## 3.11 Divider — substrate

No override. Every `Divider` in the stories is self-closing — no `textAlign`, no children.

## 3.12 Link — substrate

**No `MuiLink` override.** `primary.main` with `underline="always"` (MUI's default). MUI draws the
underline at `alpha(primary.main, 0.4)`, so the rule is visibly lighter than the glyphs.

## 3.13 Alert — themed

`overrides/AlertOverrides.tsx`.

- `defaultProps`: `severity: "info"`, plus an `iconMapping` for **error, info and warning only**.
- `filled`: `boxShadow: theme.shadows[3]`, and forces child buttons to `color: inherit`.
- `filledInfo`: `info.main`.
- `standardInfo` / `standardWarning` / `standardError`: **`background.paper` white ground + a 1px
  coloured border**, `color: text.primary`.

**Traps**

- **MUI's computed severity tints are unreachable.** MUI computes a standard tint as
  `lighten(palette[severity].light, 0.9)`. Tebra replaces standardInfo/Warning/Error with white +
  border. The only severity that would keep its computed tint is `success` — which has **no entry in
  `iconMapping`** and is not offered by the story's `severity` argType (`[error, info, warning]`).
  `outlined`, which is entirely computed, is likewise absent from the `variant` argType
  (`[filled, standard]`).
- **Warning uses two unrelated hues.** `standardWarning` sets its border and icon to
  `secondary.main` `#FF8D6E` — the **coral** brand colour, not `warning.main`. Filled warning has no
  Tebra override and takes MUI's `warning.main` `#FCDE73`, a **yellow**. The same severity reads
  coral inline and yellow as a banner.
- **Error and info render the same glyph.** `AttentionFilledIcon.tsx` and `InfoFilledIcon.tsx`
  contain byte-identical paths (a filled circle with an exclamation mark). The two severities differ
  only by colour.
- Filled warning's text is `getContrastText(#FCDE73)` = `rgba(0,0,0,0.87)`, MUI's internal
  `text.primary`, **not** Tebra's `#000` (§2.3).

## 3.14 Snackbar and Tooltip — the two dark surfaces

**`SnackbarContent` — themed.** `overrides/SnackbarContentOverrides.ts`:

```ts
backgroundColor: ownerState.type === "success" ? success.dark : info.dark
```

`#004852` teal, or `#2B865A` on success. **Not `grey[900]`.** `type` is a **custom prop read off
`ownerState`** — it is not a standard MUI `SnackbarContent` prop, so it only takes effect when a
consumer passes it. Text stays `#FFFFFF` because the base `styled()` derives colour from
`getContrastText` of MUI's own computed dark background and the override touches only the background.
`body2` (14/20), radius 4, padding 6/16, elevation 6.
`SnackbarOverrides.tsx` adds `defaultProps`: anchor bottom-right, slide-left transition.

**`Tooltip` — substrate.** **There is no `MuiTooltip` override.** MUI sets
`backgroundColor: alpha(grey[700], 0.92)`; `grey[700]` is not in the Tebra ramp, so it stays MUI's
`#616161` → **`rgba(97,97,97,0.92)`**, a grey with no Tebra provenance. Radius 4, padding 4/8,
`maxWidth` 300, `common.white` text, `pxToRem(11)` → 12.57px, `fontWeightMedium` 500 → ships Regular.
No arrow. Placement is runtime: 12 options defaulting to `bottom`, and placement moves the popper,
not the surface.

The two share only white text and a 4px radius. **There is no single dark-surface treatment in this
system** — one is branded, the other is whatever MUI shipped.

## 3.15 Table — mixed

`overrides/TableOverrides.ts` registers three keys:

- `MuiTable.root`: `borderBottom: none`.
- `MuiTableRow.root`: `background.paper`; `.head`: `core.light` `#D4E0DD`.
- `MuiTableCell.root`: head cells take `background: inherit`, `borderBottom: inherit`, and **`h5`'s
  font size and weight** (14px / 700).

Everything else — cell padding, body borders, hover, selected — is substrate. Selected rows are
`alpha(primary.main, 0.08)`; hovered rows are `action.hover`, which Tebra made opaque.

## 3.16 Tabs — substrate with one Tebra hover

- `overrides/TabOverrides.tsx` supplies **only** `&:hover, &:active → action.hover` `#CBDDE0`.
- `overrides/TabsOverrides.tsx` is `defaultProps: { indicatorColor: "primary" }` — **which is MUI's
  own default.** The file changes nothing.

Everything else is substrate: `minHeight` 48, the 2px `primary.main` indicator bar. Selection is
marked by the indicator alone; there is no selected ground.

## 3.17 Toggle button — mixed, with a dead selector

`overrides/ToggleButtonOverrides.ts`. Root: `color: grey[600]`, `border: 1px solid grey[400]`.

```ts
"&$disabled": { color: grey[400], backgroundColor: common.white },   // ← DEAD
"&.Mui-selected": { color: text.primary, backgroundColor: action.selected },
"&.Mui-selected.Mui-disabled": { color: grey[400], backgroundColor: common.white },
```

**`"&$disabled"` is JSS v4 ref syntax. Emotion never compiles it**, so the plain-disabled rule has
never applied — while `"&.Mui-selected.Mui-disabled"` two lines below works fine. A key-validity
check cannot catch this; **read every selector, not just every key.**

**Trap:** hovering a *selected* ToggleButton discards Tebra's `action.selected` and renders MUI's
computed `alpha(selectedColor, selectedOpacity + hoverOpacity)` = `rgba(0,0,0,0.12)` instead. Fixing
it requires the override to carry its own `selected:hover` rule, as `ChipOverrides` does for Chip.

Box sizes 36 / 48 / 67 as intended (38.86 / 51.43 / 72 rendered — the icons carry the `pxToRem`
inflation).

## 3.18 List, ListItem, ListItemButton — mixed

- `overrides/ListOverrides.ts`: `defaultProps: { disablePadding: true }` — **global.** Every `List`
  in the system has zero vertical padding, including `MenuList` inside a `Menu`.
- `overrides/ListItemOverrides.ts`: `&:hover, &:active → action.hover`; and a `container` rule
  killing the background on nested IconButton hover.
- `overrides/ListItemButtonOverrides.ts`: `defaultProps: { disableRipple: true }` only. Its hover and
  selected are MUI's — `action.hover` and `alpha(primary.main, 0.08)`.

**Trap:** because `MuiList` disables padding globally but the **Autocomplete listbox is a styled
`div`, not a `List`**, it keeps MUI's `padding: '8px 0'`. Two dropdown surfaces in the same system,
8px apart.

## 3.19 Menu and Menu item — mixed

**No `MuiMenu` and no `MuiPopover` override.** The Menu paper is `Popover`'s default **elevation 8**
and radius 4; its list padding is 0 from the global `MuiList` rule above.

`overrides/MenuItemOverrides.ts` supplies three rules:

```ts
"&.Mui-focusVisible": { backgroundColor: "white", border: `3px solid ${primary.main}`, borderRadius: 4 },
"&.Mui-selected":       { backgroundColor: action.selected },
"&.Mui-selected:hover": { backgroundColor: action.hover },
```

Note the focus-visible treatment **replaces** the ring look with a border rather than adding to it.
Geometry and the disabled state are substrate.

## 3.20 Autocomplete — mixed; the field layer is unthemed

`overrides/AutocompleteOverrides.tsx`.

- `defaultProps`: `ChipProps: { variant: "outlined", color: "primary" }` — so **tags take the
  `outlinedPrimary` path**, white fill with a teal border, and never touch the hardcoded
  `#C3E7C0`/`#FD919F`. Also `noOptionsText: "No results found"` and `popupIcon: <DownCaretIcon
  fontSize="small" />`.
- `groupLabel`: `color: text.primary`.
- `listbox`: option `Mui-focusVisible` gets the same white-ground / 3px-border / radius-4 treatment
  as `MenuItem`; `[aria-selected='true']` gets `action.selected`, held through `Mui-focused`.

**Traps**

- **`popupIcon` is overridden but `clearIcon` is not.** The clear affordance is **MUI's internal
  `Close` glyph**, whose path spans 5–19 of the 24 viewBox where Tebra's `CloseOutlined` spans 2–22
  — so the substituted glyph renders about 43% larger in the same box.
- **The real desktop option height is 36, not 48.** MUI sets `min-height: 48` then resets it to
  `auto` at the `sm` breakpoint. 36 = 6 padding + 24 line-height + 6. With a checkbox it is 54.
- **The end adornment is `position: absolute` with `translateY(-50%)`** in MUI. Indicator size can
  therefore never affect the field box; heights stay 56/40 whether or not the clear icon is present.
- **Multiple values wrap.** MUI sets `flexWrap: 'wrap'` on the `inputRoot`, so extra selections push
  onto new rows and the field grows. 56 is not a hard height in dense forms.
- The group label is `ListSubheader`, i.e. `pxToRem(14)` → **16px** at `fontWeightMedium` 500 →
  ships Regular.
- Tag heights 32 / 24.

## 3.21 Card — substrate + two defaults

- `overrides/CardOverrides.ts`: `defaultProps` only — `variant: "elevation"`, `square: false`,
  `raised: false`. Elevation 1.
- `overrides/CardActionsOverrides.ts`: `justifyContent: "flex-end"`. **MUI defaults to `flex-start`**,
  so right-aligned card actions are a Tebra decision.
- `overrides/CardActionAreaOverrides.ts`: **`defaultProps: { disabled: true }`.**

**Traps**

- **`CardActionArea` ships disabled globally.** The Card story wraps `CardMedia` and `CardContent` in
  a `CardActionArea`, so the markup expects an interactive card, but the theme disables it. Any
  consumer wanting a clickable card must pass `disabled={false}` explicitly.
- **`DialogActions` is right-aligned too, but by MUI, not by Tebra.** `DialogActions` ships
  `justifyContent: flex-end` in MUI 5.15.12. The two surfaces look alike for opposite reasons, and
  only one of them would follow a Tebra decision to change.
- **There is no `MuiCardHeader`, `MuiCardContent` or `MuiCardMedia` override anywhere.** Every
  card-header decision lives in per-site `sx`, and the sites disagree (§3.29).

## 3.22 Accordion — substrate + two rules

- `overrides/AccordionOverrides.ts`: `&.Mui-disabled { backgroundColor: background.paper }` only.
- `overrides/AccordionSummaryOverrides.tsx`: `defaultProps.expandIcon =
  <DownCaretIcon fontSize="small" htmlColor="black" />`.

Summary 48 collapsed / 64 expanded; the caret rotates 180°.

**Trap:** `htmlColor="black"` bypasses the palette entirely. The CSS keyword happens to equal
`text.primary` today, so it is not visually wrong — but it will not follow a palette change.

## 3.23 Dialog / Drawer — substrate

- `overrides/DialogOverrides.ts`: `defaultProps: { maxWidth: "sm" }` — **which is MUI's own default.**
  The file changes nothing. Elevation 24, radius 4.
- **No `MuiDrawer` override.** The only usage is `variant="persistent" anchor="right"`, which is the
  **docked** path: no scrim, no elevation, and a 1px divider border on the side facing content.
  MUI's default `variant="temporary"` at elevation 16 is never reached.
- The dialog scrim is `Backdrop`'s `rgba(0,0,0,0.5)`, rendered at runtime by `Modal`.

## 3.24 Feedback messages — Tebra components

`packages/design-system/src/components/Feedback/`. Six files: `NoResultsMessage.tsx`,
`NotFoundErrorMessage.tsx`, `ForbiddenErrorMessage.tsx`, `NothingToSeeHereMessage.tsx`,
`InternalServerErrorMessage.tsx`, `BrowserIncompatibilityErrorMessage.tsx`. Each is
`Box + Stack + Typography`, optionally wrapped in a `Paper` via `withContainer` (default `true`).

**They share one skeleton and disagree on nearly every measurement in it:**

| Property | Values across the six |
|---|---|
| Stack `marginTop` | 0 (NoResults, NotFound) · 16 (NothingToSeeHere) · 24 (Forbidden, InternalServerError, BrowserIncompatibility) |
| Stack `spacing` | 8 (NoResults, NothingToSeeHere) · 16 (the other four) |
| `h4 text.secondary` eyebrow | present in 3 (NotFound, Forbidden, InternalServerError), absent in 3 |
| Title `maxWidth` | `45ch` on 3 · unconstrained on 3 |
| Body `maxWidth` | `75ch` on all six |
| Action button | 2 of 6 |
| Padding spelling | `padding={5}` in one, `p={5}` in five |

**Traps**

- **`ForbiddenErrorMessage` links with a raw `<a>`** while its two siblings use MUI `<Link>`. There
  is no `MuiLink` override and `CssBaselineOverrides` styles no anchor, so the raw anchor falls to
  the user-agent default (conventionally `#0000EE`, solid underline) while its siblings render
  `primary.main` with a 40%-tinted underline. Same sentence pattern, two link treatments, in sibling
  files.
- **`NotFoundErrorMessage` renders `"submit a support caseor contact customer support"`.** The source
  closes `</Link>` at the end of one line and continues the sentence on the next; JSX strips
  newlines adjacent to a tag, so the runs concatenate. Both siblings insert an explicit `{" "}`; this
  one does not.
- **`InternalServerErrorMessage` ships `<Link>contact support</Link>` with no `href`**, directly below
  a `TODO` saying the link is missing. It renders full link styling but is not focusable or
  keyboard-reachable. Its `onRefreshClick` also builds a `URLSearchParams`, deletes `redirectUrl`,
  then discards it and calls `window.location.reload()` — the stripping has no effect.
- **`ch` units are not portable.** `1ch` is the advance width of "0" in the element's own computed
  font, so `45ch` at h2 24px and `75ch` at body1 16px are two different pixel values, both dependent
  on Akkurat LL metrics. Deriving them means reading a font metric, not a component value.

## 3.25 Read more — Tebra composition over a MUI text Button

`packages/design-system/src/components/ReadMore/ReadMore.tsx`, built on `EllipsisText`. Props are
`$`-prefixed (`$isInline`, `$maxLines`, `$maxCharacters`) to keep them off the DOM. Two clamp modes:
by lines (`-webkit-line-clamp`) and by characters (`substring(0,150) + "..."`).

**Trap: the label inverts colour on hover.** `StyledButton` asks for `color="inherit"`, and MUI sets
`color: inherit` in its base `styled()`. But `ButtonOverrides.text` sets `color: primary.main` and is
appended after the base at equal specificity, so **the theme wins at rest**. `StyledButton` then adds
`"&&:hover, &&:active { color: inherit }"`, whose doubled specificity wins it back. Net result: the
label rests at `#004852` and turns `text.primary` `#000` on hover, over the `primary[100]` `#CBDDE0`
hover ground the same theme rule supplies.

The toggle is 24px tall because `StyledButton` sets `padding: 0`, leaving the button line-height alone.

## 3.26 Pagination — substrate geometry, Tebra selection

`overrides/PaginationOverrides.ts` is the only thing Tebra changes, and it changes selection from a
pale wash to solid teal:

```ts
"& button.Mui-selected":       { backgroundColor: primary.dark, color: primary.contrastText },
"& button.Mui-selected:hover": { backgroundColor: darken(primary.dark, 0.3) },   // #003239
```

MUI's own selected `PaginationItem` is `action.selected` `#F0EEE8`. The circular shape
(`borderRadius = height/2`) is **not** overridden and survives. **The arrows are MUI's own
`NavigateBefore`/`NavigateNext` chevrons**, not Tebra's carets — `PaginationOverrides` sets no slots.

## 3.27 Table pagination — substrate + a Tebra caret

`overrides/TablePaginationOverrides.tsx` supplies only a `SelectProps.IconComponent`, using the same
props-dropping pattern as §3.4.

**Trap:** the rows-per-page control is a **`variant="standard"` Select** — no outline, no notch, no
56px box. It cannot reuse an outlined `<TextField select>`: doing so would impose an outline and more
than double the height inside a 52px toolbar.

## 3.28 Stepper — substrate + one Tebra colour

`overrides/StepIconOverrides.ts` changes exactly one thing: `&.Mui-completed → success.main #3FA266`.

**Traps**

- **A disabled step has no visual state.** In a linear Stepper every step after the active one is
  marked `.Mui-disabled`, but `StepLabelLabel` styles only `.Mui-active`, `.Mui-completed`,
  `.Mui-error` and `.Mui-alternativeLabel`; `StepLabelRoot`'s only disabled rule is
  `cursor: default`. `StepIcon`'s root colour (`text.disabled` `#9A9A9A`) covers the disabled case by
  falling through rather than by naming it. An upcoming step is pixel-identical to a plain inactive
  one.
- **The connector ignores its own state.** `StepConnector` adds `.Mui-active` and `.Mui-completed`
  classes to its line and then defines no styles for either; `StepConnectorLine`'s only colour is
  `grey[400]`. There is no `MuiStepConnector` override. A completed run of steps has no visual
  through-line.

**Mobile stepper — themed root and dot.** `overrides/MobileStepperOverrides.ts` sets
`root.background: background.paper` (MUI's base is `background.default`) and spreads
`typography.body1`; `dot: grey[400]` (base is `action.disabled`); and `dotActive: primary.main`,
**which restates MUI's own default and changes nothing.**

## 3.29 Card header band — not a design-system component

There is no theme entry for it (§3.21). The band is a **product convention** implemented per site in
`sx`, and the sites disagree. The buildable geometry, taken from the majority implementation, is a
**48px fixed-height band, `h2` (24/36, 700) in `primary.main` `#004852`, 16px horizontal padding,
title vertically centred** — *not* 16px padding plus hug, which renders 68px.

Five facesheet cards exist in **two live implementations** —
`clinical-system/src/components/Facesheet/Cards/*` and
`facesheet-ui/src/components/Card/FacesheetCard.tsx` — which disagree on the divider, the content
padding, and whether the header renders at all.

**Three verified bugs live here:**

1. **The header divider never renders.**
   `facesheet-ui/src/components/Card/FacesheetCard.tsx:217` and
   `facesheet-ui/src/components/Card/CardLayout.tsx:170` write
   `sx={{ borderBottom: "1px solid background.default", height: "3rem" }}`. In `sx`, a **full CSS
   shorthand string is passed through verbatim** — only standalone properties like `borderColor`
   resolve theme paths. `background.default` is not a valid CSS `<color>`, and an invalid value
   inside a shorthand invalidates the whole declaration, so `border-bottom` is dropped rather than
   falling back. Six of eight sites ship without a divider anyway.
2. **`paddingBottom: 16` resolves to 128px.** `facesheet-ui/.../FacesheetCard.tsx:227` writes
   `sx={{ paddingBottom: 16 }}`. `paddingBottom` is in `paddingKeys`
   (`@mui/system/esm/spacing.js:43`) so it routes through the spacing transform, and the spacing base
   is MUI's default 8 (§1.2): **16 × 8 = 128px.** Its clinical-system twin writes
   `sx={{ padding: "0 16px 16px 16px" }}` — a string, taken literally.
3. **`ImmunizationsCard`** (`clinical-system/.../Cards/ImmunizationsCard.tsx:70-71`) hardcodes
   `DRAWER_CARD_STYLE = { boxShadow: 'none' }` unconditionally while still gating its header on
   fullscreen layout, so in fullscreen it is the only facesheet card with no elevation and no
   min-height. Its six siblings branch on layout via `StyledCard` (`Facesheet.tsx:21-27`).

## 3.30 Primary navigation — a different theme (see §1.8)

Everything in the nav renders under `createPartnerTheme`, never under the design-system theme. Facts
that hold for `tebraDefault`:

- **The bar is 65px.** `Navigation.tsx`'s Toolbar sets `sx minHeight: 64`, which is a **floor, not a
  height**. `createPartnerTheme` sets `MuiIconButton.sizeLarge` to `65px × 65px`, and every top-level
  nav item and right-cluster utility is a `size="large"` IconButton, so a 65px child expands the
  flex Toolbar. Toolbar is `align-items: center`, so it **centres** its children rather than stacking
  their box heights — do not sum child paddings to derive the bar height.
- Ground `#004852`; icon-only `large` IconButtons at `borderRadius: 0` with white glyphs; hover ground
  `#195b63`; dropdown a square elevation-0 `#195b63` paper with `#417E86` item hover; divider **white**
  (the partner theme maps `palette.divider` to `submenuText`).
- **Six nav slots**, from `navigation-ui/src/config/navigation.config.ts`: Platform, Clinical,
  Billing, Engage, Tebra Payments, Analytics (whose glyph component is `ReportsIcon`). Mail and Help
  are right-cluster utilities, not slots. **There is no patients slot and no history slot** — patients
  are reached through the inline search.
- **The search magnifier is trailing.** `PatientSearch.tsx` puts `SearchOutlined` in an
  `InputAdornment position="end"`; there is no `startAdornment` in the component.
- **The "history" element is the Recent patients panel** inside the search dropdown, shown when the
  input is under two characters. `useRecentChartsQuery` is consumed only by `PatientSearch`.
- **There is no distinct Selected state.** `NavIconButton.tsx` computes
  `showActiveBackground = isActive || isButtonFocusedOrHovered`, where `isActive` means the popper
  menu is open. All three conditions produce the same `#195b63` ground. `NavItem` takes no active
  prop and there is no route matching in the bar.
- **The global focus ring is suppressed here.** `NavIconButton.tsx` sets `'&&&&': { outline: 'none' }`
  — quadrupled specificity, so it beats `CssBaselineOverrides` decisively. Keyboard focus in the nav
  is indicated only by a background change identical to hover.
- **The avatar's typical fill is an illustrated persona SVG**, not initials.
  `Navigation.tsx` renders `<Avatar src={userImageUrl}>{userInitials}</Avatar>`; on image error
  `getDefaultUserImage` returns `provider-tebra-bg.svg` or `staff-tebra-bg.svg` by role. Initials are
  the fallback.
  **Both of these are true and they do not agree, so hold both:** in the product the persona artwork
  is what a user normally sees, and in the Figma library and the reference kit the avatar shows the
  **initials fallback**. The personas are runtime assets served from outside
  `packages/design-system` — they are not in the icon set, not in the illustration set, and not
  exportable from the library — so there is no persona asset to ship in the kit and no image of one
  to check against. Build the initials fallback and treat a persona fill as a runtime substitution.
- **The billing slot can render three glyphs.** `billingMenuBuilder.ts` swaps in `BillingKmbIcon` or
  `BillingKmbAlertIcon` on KMB state; both use viewBox `0 0 27 22` and `BillingKmbIcon` bakes in a
  hardcoded `<circle fill="#004852">`.
- **The user avatar's click path renders nothing.** `Navigation.tsx:596-608` mounts
  `<Menu anchorEl={userMenuAnchor} open={...} />` **with no children**, on top of the real
  hover-driven `UserMenuContent` delivered through `NavIconButton`'s `menuContent` prop.
- **Four `console.log` calls ship in the render path** — three in `CobrandingContext.tsx`'s `useMemo`
  labelled "Debug", one in `Navigation.tsx`'s `onClickAwayListener`.
- **The breakpoint is a magic number.** `isDesktopNav` uses `useMediaQuery('(min-width:1100px)')`
  while `isSmUp` uses `theme.breakpoints.up('sm')`. 1100px matches no breakpoint in the theme.
- **The partner theme's nav-icon hover-colour rule is a no-op in five of six base themes.**
  `'&:hover svg': { color: submenuText }` swaps the glyph from `navText` to `submenuText`; in
  `tebraDefault`, `blueDark`, `blueLight`, `green` and `orange` both are `#ffffff`. Only `grayLight`
  differs (`navText #969696`). The visible hover feedback everywhere else is the background swap.

## 3.31 Avatar, Badge, Circular progress

- **Avatar — substrate.** `overrides/AvatarOverrides.ts` registers `MuiAvatar` with
  `defaultProps: {}` and `styleOverrides: {}`; every rule is commented out. Avatar has **no `size`
  prop** at all. 40px circle.
- **Badge — substrate.** `overrides/BadgeOverrides.ts` is `defaultProps: { color: "secondary" }` only.
  The badge overhangs its child by design: `translate(50%, -50%)` about the top-right corner.
- **Circular progress — substrate.** No override file. Its resting `strokeDasharray` is
  `'80px, 200px'` with `dashoffset: 0`, carrying the source comment *"Some default value that looks
  fine waiting for the animation to kicks in"*. 80 of the 126.920 circumference is 63.03% of the ring,
  starting at 3 o'clock. In the product it simultaneously rotates (1.4s linear) and cycles its
  dasharray (1.4s ease-in-out).

## 3.32 MUI X: DataGrid, TreeView, TreeItem — themed but licensed

- `overrides/DataGridOverrides.ts` is substantial: `columnHeader: core.light`,
  `columnHeaderTitle: fontWeight 700`, `row.Mui-selected: primary[200]`, plus `.minimal` and
  `.striped` class variants (striped odd rows use `action.selected`, hover `action.hover`).
- `overrides/TreeItemOverrides.ts`: content height `1.875rem`; hover `action.hover`; selected-not-hover
  `action.selected`; `group.marginLeft: 0`; icon `fontSize: 0.8rem`.
- `overrides/TreeViewOverrides.tsx`: `defaultProps` supplying `DownCaretIcon` / `RightCaretIcon`.

These live in `@mui/x-data-grid-pro` and `@mui/x-tree-view`, **licensed packages**, and the monorepo
pins them inconsistently across consumers.

## 3.33 Icons

`packages/design-system/src/components/icons/` holds **67** source files and
`components/marketingIcons/` holds **9**. **79 utility icons and 9 marketing icons ship in
the library and the reference kit**, updated 2026-08-19 when the icon gap was closed.

**Updated 2026-08-19.** This section previously said 41 ship and the other 25 are product glyphs with
no design-system surface. That was true of the kit as it stood on 2026-08-10 and is no longer true.
Two source files remain unshipped and both are source defects rather than choices: `AINoteAssist`,
265KB of traced path data at a 400 viewBox, and `WileyTreatmentPlanner`, whose `0 -960 960 960`
viewBox renders blank. See IC-1 and IC-2 in `ICON-BUILD.md`. One more, `RadioChecked`, was built and
then **withdrawn** — see below.

**The marking convention, and what it licenses you to do.** A name carrying **`(MUI)`** is a stock
Material path that ships because nothing Tebra-authored was wired in its place. It is
**substitutable**: another Material glyph of the same metrics can stand in, and swapping it is a code
fix, not a design change. A name with **no marking is Tebra-authored** and is **verbatim only** —
embed the shipped path, never redraw it, never substitute a Material lookalike. The marking is a
provenance claim about the *rendered* glyph, not about what exists in source: `RadioChecked` is
marked `(MUI)` even though `components/icons/RadioCheckedIcon.tsx` exists, because that file is
referenced by nothing and MUI's ring-and-dot is what renders (§3.6).

**`RadioChecked` is withdrawn from the kit, 2026-08-19.** It was imported during the icon build and
removed during recertification. Verified independently at 0.19.7: `RadioCheckedIcon.tsx` is exported
from the icons barrel at `index.ts:50` and **referenced by nothing else anywhere in `packages/`** — no
override, no story, no product file. MUI's ring-and-dot is what renders. Shipping both left two
components reducing to one name once the marking was stripped. The `(MUI)` entry stays; the Tebra one
does not.

**Tebra-authored, verbatim only (68).**
AddPaymentNote · ArrowLeft · AttentionFilled · AttentionOutlined · Billing · Calendar ·
ChatFilled · ChatOutlined · CheckboxChecked · CheckboxIndeterminate · CheckboxUnchecked ·
CheckmarkFilled · CheckmarkOutlined · Clinical · CloseOutlined · CustomOutlined · Delete ·
Document · DownCaret · DragAndDrop · EditOutlined · EllipsisFilled · Engage · Error ·
EyeIconClosed · EyeIconOpen · FavoritesFilled · FavoritesOutlined · FormatBold ·
FormatItalic · FormatUnderline · Idea · InfoFilled · InfoOutlined · LeftCaret · Lightbulb ·
LinearEllipsis · List · ListNestedCenter · ListNestedLeft · ListNestedRight · Lock · Menu ·
Payments · Phone · Platform · PlusOutlined · PracticeGrowth · PrintFilled · PrintOutlined ·
QuestionOutlined · Refresh · Reports · RightCaret · Search · Survey · Telehealth · Terminal ·
TrashFilled · TrashOutlined · Unlock · Unsorted · UpCaret · UserFilled · UserGroupFilled ·
UserOutlined · WarningFilled · WarningOutlined

**MUI, substitutable (11).**
Cancel (MUI) · CheckCircle (MUI) · Close (MUI) · HelpOutline (MUI) · MailOutline (MUI) ·
NavigateBefore (MUI) · NavigateNext (MUI) · Person (MUI) · RadioChecked (MUI) ·
RadioUnchecked (MUI) · SearchOutlined (MUI)

**Marketing icons (9).** Source `components/marketingIcons`, all multicolour.
Automation · Community · Ecosystem · ExceptionalCare · OnlineScheduling · OperatingSystem ·
PatientExperience · QualityVideo · Specialties

**Four Tebra-authored names have no file in `packages/design-system`** — Engage · Payments · Platform ·
Reports — and come from the navigation config. Billing and Clinical are in the code and are also
painted for the nav bar. All six render white.

## 3.34 Illustrations

`packages/design-system/src/components/illustrations/`, seven SVGs. They declare **only a `viewBox`,
no `width`/`height`**, so an outer `<svg>` stretches to whatever box it is given. All are drawn in
`#004952` (§2.4).

**All seven by name**, with the component each one serves (§3.24): `Access restricted` →
`ForbiddenErrorMessage` · `Almost there` → none · `Browser incompatibility` →
`BrowserIncompatibilityErrorMessage` · `Error` → `InternalServerErrorMessage` · `Not found` →
`NotFoundErrorMessage` **and** `NoResultsMessage` · `Nothing to see here` →
`NothingToSeeHereMessage` · `Waiting` → none. Two of these — `Access restricted` and `Error` — were
previously reachable in this file only through their consuming component, which left the asset with
no name to join on.

Coverage: `AlmostThere` and `Waiting` are exported and unused inside the design system (both consumed
downstream by `signin-ui` and `clinical-notes-ui`). `Waiting` and `BrowserIncompatibility` have no
story. **`NotFoundIllustration` serves both `NotFoundErrorMessage` and `NoResultsMessage`**, so a
"no results" state shows the 404 artwork.

---

# 4. System-level divergences

These are not defects to normalise. They are the system's actual shape, and any work that assumes a
single treatment will be wrong.

## 4.1 Five interactive-state treatments from one lineage

Every surface below descends from `ButtonBase`. Their hover grounds:

| Surface | Hover ground | Source |
|---|---|---|
| Button (text) | `primary[100]` `#CBDDE0` opaque | `ButtonOverrides.text` |
| Button (contained primary) | `action.hover` `#CBDDE0` opaque | `ButtonOverrides.containedPrimary` |
| Icon button | `action.hover` `#CBDDE0` opaque | `IconButtonOverrides.root` |
| List item | `action.hover` `#CBDDE0` opaque | `ListItemOverrides.root` |
| Tab | `action.hover` `#CBDDE0` opaque | `TabOverrides.root` |
| Menu item | `action.hover` `#CBDDE0` opaque | **MUI substrate** — no Tebra hover rule |
| Toggle button | `alpha(text.primary, 0.04)` = `rgba(0,0,0,0.04)` | **MUI substrate** |
| Pagination item | `action.hover` `#CBDDE0` opaque | **MUI substrate** |
| Chip (default) | `alpha(action.selected, 0.12)` — near-invisible | **MUI substrate** |
| Card action area | **none — ships `disabled: true`** | `CardActionAreaOverrides` |

Ten surfaces resolve to **five distinct treatments**: `primary[100]` opaque; `action.hover` opaque
(the majority); `alpha(text.primary, 0.04)`; `alpha(action.selected, 0.12)`; and none at all. Those
five reduce to **two underlying models** — an opaque teal ground and a translucent tint — and which
one a component gets is uncorrelated with whether Tebra authored the rule. Two Buttons reach the same
`#CBDDE0` through *different tokens* (`primary[100]` vs `action.hover`), which will diverge the moment
either token changes.

## 4.2 Three selection languages

| Language | Value | Surfaces |
|---|---|---|
| **Flat opaque wash** | `action.selected` `#F0EEE8` | Menu item, Autocomplete option, Toggle button — all Tebra-authored |
| **Computed 8% teal** | `alpha(primary.main, 0.08)` | Table row, List item button — MUI substrate |
| **Solid teal, white text** | `primary.dark` `#004852` + `primary.contrastText` | Pagination item — Tebra-authored, replacing MUI's `action.selected` |

**Tabs is a fourth model with no ground at all** — selection is marked solely by a 2px `primary.main`
indicator bar.

## 4.3 Two dark surfaces that agree on almost nothing

| | Snackbar | Tooltip |
|---|---|---|
| Ground | `#004852` teal (`#2B865A` on success) | `rgba(97,97,97,0.92)` grey |
| Provenance | Tebra override | pure MUI, from an undefined `grey[700]` |
| Type | `body2` 14/20, weight 400 | 11px encoded (12.57 rendered), weight 500 → ships Regular |
| Padding | 6/16 | 4/8 |
| Elevation | 6 | none |
| Radius | 4 | 4 |
| Text | `#FFFFFF` | `#FFFFFF` |

They share white text and a 4px radius. Nothing else.

## 4.4 Warning has two hues

`standardWarning` Alert borders and icons render **coral `#FF8D6E`** (`secondary.main`);
filled warning Alerts render **yellow `#FCDE73`** (`warning.main`). Same severity, two brand
families, decided by variant. `warning.light` and `warning.main` are also the same value, so the
"light" step does nothing.

## 4.5 Disabled greys and focus visuals

**Five disabled treatments** across sibling controls: Icon button `grey[500]`; Checkbox `grey[400]`
unchecked / `primary[100]` checked; Radio `action.disabled` `rgba(0,0,0,0.5)` (substrate, because its
override is dead); Toggle button selected-disabled `grey[400]` on white (its plain-disabled rule is
dead JSS); Text field outline `action.disabled`.

**Focus** is the one place the system *is* consistent — because it is centralised in
`CssBaselineOverrides` and almost nothing overrides it (§1.7). Only three surfaces define their own:
`MenuItem` and the Autocomplete option (white ground + 3px `primary.main` **border**, radius 4 —
replacing the ring rather than adding to it), and `NavIconButton`, which removes it entirely.

## 4.6 Four selectable row surfaces disagree

`ListItem` (Tebra hover, no selected), `ListItemButton` (substrate hover + substrate 8% selected),
`MenuItem` (substrate hover + Tebra flat selected), `TableRow` (substrate hover + substrate 8%
selected, Tebra grounds). A shared list-row treatment would be a code change across three override
files.

## 4.7 Duplicate implementations

Five facesheet cards exist twice, in `clinical-system` and `facesheet-ui`, and disagree on the
divider, the content padding, and whether the header renders (§3.29).

---

# 5. Where code and stories disagree

Storybook is the structural authority (§1.9) and is also, repeatedly, wrong about the components it
documents. Verify against the component before acting on a story.

1. **`ToggleButtonGroupVariations` iterates `sizes = ['large','default','small']`.** `'default'` is
   not a valid MUI ToggleButton size. It renders as medium.
2. **Three `ReadMore` stories pass `isInline` where the prop is `$isInline`**
   (`ReadMoreAlert.stories.tsx` args, `ReadMoreMaxCharacters.stories.tsx` args,
   `ReadMoreMaxLines.stories.tsx` argTypes). Story args are assigned as a plain property on the story
   function and are never type-checked against `ReadMoreProps`, so the unprefixed spelling compiles
   silently. With `$isInline` undefined, `EllipsisText` renders `display: -webkit-box` rather than
   inline, and the leading space before the button — gated on `($isInline || !isCollapsed)` — is
   skipped. **The inline behaviour these stories document never happens.**
3. **The TextField multiline stories are labelled backwards.** `InputBase` branches
   `if (rows) { inputProps = { minRows: rows, maxRows: rows } }` and both branches set
   `InputComponent = TextareaAutosize`. So `multiline` alone **auto-grows** and `rows={n}` **pins**
   the height. The story labels the no-rows example *"Default Fixed Height in Rows"* and the
   `rows='grow'` example *"Original Multiline Height Behavior"*. **`rows='grow'` has no implementation
   anywhere in the checkout** — a grep for `grow` across `packages/design-system` returns only the
   story itself, and the string is fed into `minRows`/`maxRows` height arithmetic.
4. **Alert's argTypes make MUI's computed tints unreachable** — `severity` offers only
   `[error, info, warning]` (no success) and `variant` only `[filled, standard]` (no outlined). §3.13.
5. **Illustration stories distort their own art.** `NotFoundIllustration` has a 524×440 viewBox
   (ratio 1.191); its story passes width 285 / height 184 (ratio 1.549). The SVGs declare no intrinsic
   size, so they stretch to the given box. The Feedback messages size the same art proportionally
   (NotFound at 337×283 = 64.3% of viewBox, ratio preserved).
6. **There is no Select story and no Menu story folder.** Standalone `<Select>` appears zero times in
   the monorepo; every dropdown is `<TextField select>`. `MenuItem` appears only as children, in
   `Drawer.example` (13), `TextField.stories` (7), `AccordionDetails.example` (7), `FormDialog.example`
   (5), `DropChip.pattern` (5), `Chip.stories` (3), `Prepopulate.pattern` (3). `<Menu>` appears twice,
   in `Button/Prepopulate.example.tsx:32` and `Chip/DropChip.pattern.stories.tsx:87` — both opening as
   `<Menu\n` (§6.2).
7. **Override files that restate MUI's own defaults**, i.e. exist but change nothing:
   `TabsOverrides` (`indicatorColor: "primary"`), `DialogOverrides` (`maxWidth: "sm"`),
   `MobileStepperOverrides.dotActive` (`primary.main`), and `SvgIconOverrides`'
   `fontSizeSmall/Medium/Large` (§2.5). `AvatarOverrides` is an empty shell. **An override file
   existing is not evidence a component is themed.**
8. **The Chip story declares no `size` argType**, yet `size="small"` is set at 39 of 79 product call
   sites and MUI supplies both geometries.
9. **The Switch story offers `size: ['medium','small']`**, but all 13 product call sites omit `size`,
   so `small` never renders outside Storybook.
10. **`StorybookDecorator` mounts no `<CssBaseline />`** (§1.9), so the global focus outline — the
    system's only focus treatment — is absent from every story.

---

# 6. Epistemics: working on this system

## 6.1 Source-derivation rules, and their exceptions

**Values come from source, never from a rendered component.** Measuring in a browser produces
fractional widths that encode the `pxToRem` inflation rather than the authored value, and it is how
`SvgIconOverrides`' three no-op restatements got written in the first place (§2.5). If you cannot
point at a file and a line, you do not have the value.

**Reading order when starting on a component.** Each step can invalidate the previous one:

1. Does `src/overrides/<Name>Overrides.ts(x)` exist at all? **Absence is itself the finding** —
   Tooltip, Paper, Drawer, Divider, Link, OutlinedInput and CardHeader have none.
2. **Is the key valid?** Validate against the installed package's component list. `MuiRadioButton` is
   registered and has never executed.
3. **Are the *selectors* valid?** A valid key is not enough. `ToggleButtonOverrides` uses `"&$disabled"`
   — JSS v4 ref syntax emotion never compiles — so its plain-disabled rule is dead while
   `"&.Mui-selected.Mui-disabled"` two lines below works. A key-validity sweep cannot catch this.
4. **Classify:** `styleOverrides`, `defaultProps`, or both (§1.6).
5. **Read the story** for structure — `argTypes` for axes, `args` for defaults, `*.config.ts` where it
   exists.
6. **Read the MUI substrate** for everything the override does not set.
7. **Resolve the cascade** — §1.5.

**Structure comes from stories; values come from overrides plus substrate.**

**The exceptions.** Some things must be built without story justification because they are reachable
and shipping: `Menu` and `MenuItem` (rendered by every `<TextField select>` despite having no story),
Text field's `size` axis, Chip's `size` axis. When you take such an exception, say so — do not let it
pass silently as if the story authorised it.

**Rounding.** Never carry a fractional dimension forward without recording the true value. Two cases:
(a) `pxToRem` inflation, where an intended integer exists — use the integer and record the computed
value; (b) authored-fractional sources with no intended integer (a `0.3` spacing multiplier, a
non-square viewBox in a square box) — round to the nearest integer, record the true value, and label
the rounding a decision rather than a transcription. **Intrinsic path geometry is out of scope** —
vector bounds are path unions, not authored values.

## 6.2 Greps that mislead

- **Multi-line JSX.** `grep "<Menu[ >]"` requires a space or `>` immediately after the tag name and
  therefore misses `<Menu\n`. It returns zero for a component that appears twice. **Always grep
  `"<ComponentName"` with no trailing character class.**
- **Context windows attribute props to the wrong element.** Grepping `<Chip` with `-A 8` and tallying
  `color=` in the window catches sibling elements' props and inflates every count. To attribute a
  prop to its own tag, scan forward from `<Tag` balancing `<`/`>` while skipping strings and `{…}`
  expressions.
- **Barrel files match everything.** `components/icons/index.ts` re-exports every icon, so a
  reference count for "is this icon used" must grep `src/overrides/` and `src/stories/` specifically.
- **Story titles collide with group headings.** Tabs' story is titled `Components/Navigation` — the
  same string as the Navigation group. A missing title in a title sweep does not mean a missing story;
  cross-check against the folder listing.
- **`argTypes` entries are not always option lists.** Divider's exist purely to *hide* controls
  (`table: { disable: true }`). Read the body, not the key names.
- **Dynamic values hide usage.** A prop set via a ternary, a status map, or `?? "default"` will not
  appear in a literal grep. Enumerate the dynamic sites and resolve what each can produce before
  claiming a value is unused.

## 6.3 Absence-of-evidence standards

A failed grep is not proof of absence. Before asserting that something does not exist, establish it
**positively** and from more than one angle. The standard that settled "is there a history slot in the
nav?" was five independent checks: (1) the config file declares exactly six items; (2) the hook that
consumes it merges those six ids and nothing else, with no fallthrough; (3) a monorepo-wide grep for
`AppBar` and `<Toolbar` returns exactly one file, so no second bar renders alongside; (4) no nav-item
registry or injection mechanism exists; (5) the only history-shaped data source is consumed by exactly
one component, where it renders somewhere else entirely.

Apply the same standard to "this component has no override", "this value appears nowhere", and "this
prop is never used". Name what you checked.

## 6.4 Rendered truth beats arithmetic on some surfaces

Most of this system yields to source-reading. **The navigation bar does not.** Its height was derived,
in sequence, as 64 (reading the Toolbar's `minHeight`), then 65 (adding the `sizeLarge` IconButton that
raises the floor), then 76.8 (summing the search wrapper's `p: 2` onto the 44.8px field), then back to
65. The 76.8 derivation was arithmetically sound and described something that never renders: it
treated a flex Toolbar with `align-items: center` as if it stacked child box heights, when in fact it
**centres** them.

The lesson generalises. Where layout depends on flex alignment, intrinsic content size, or anything
resolved by the browser's layout engine rather than by a declared value, **a screenshot of the running
product outranks a derivation.** Ask for one rather than extending the arithmetic. Where a value *is*
declared in source, source still wins.

## 6.5 Pixels over property readbacks

A property readback tells you what a node or object *claims*. It does not tell you what renders.
Several real defects in this system were caught by looking and confirmed numerically afterwards —
never the reverse: paints that read correct on a master and rendered black on an instance; a clipped
label; a solid halo where a tint was intended.

Two habits follow:

- **Verify at the level where the thing is consumed**, not where it is defined. Reading a definition
  proves the definition; only reading an instance proves the instance.
- **Widen and re-enumerate when something feels verified.** Every significant error in this system's
  documented history was caught that way: an audit that read definitions instead of instances; one
  that covered components but not the loose frames beside them; a "known affected" list built from a
  previous report rather than from the artefact. **Enumerate from the artefact, never from a previous
  report** — including this file.

## 6.6 Report disagreements; do not resolve them

When two components disagree, that is the finding. Four list-row surfaces with different selection
treatments, five interactive states, five disabled greys, two warning hues, six feedback messages that
share a skeleton and agree on nothing — normalising any of these silently would destroy the most
valuable output and would misrepresent what the code does. Build and describe what ships; record the
divergence; let a human decide whether to converge it.

The corollary holds for corrections. Review notes and prior documentation are both wrong sometimes.
Three claims that did not survive source-checking: "Snackbar is `grey[900]`" (it is teal), "Tooltip
has an override" (it does not), "the nav search magnifier is leading" (it is trailing). **Verify a
correction before acting on it, including a correction from this file.**

## 6.7 Enumeration tools that silently under-report

§6.5 says enumerate from the artefact. That only helps if the enumerator can see the whole artefact.

**Windows PowerShell cannot enumerate the reference kit.** Figma writes a slash in a node name as a
directory separator and keeps the spaces around it, so `Icon / DownCaret` became the directory
`Icon` **with a trailing space**. `Get-ChildItem -Recurse` throws `DirectoryNotFoundException` on
every such directory, **prints the error to stderr, and carries on** — returning a partial listing
with a zero exit path that looks like a complete one. On the kit as first exported it returned 35 of
99 PNGs and none of the 47 SVGs: **it saw about a third of the artefact and reported no failure that
a caller checking results rather than stderr would notice.** `find`, `git ls-files` and Node's `fs`
all handle the same paths correctly.

**The same trimming blocks deletion, not just enumeration.** Explorer and ordinary `Remove-Item` both
fail on these directories with "Could not find this item" — the shell trims the trailing space off
the path it was handed and then cannot find what it was pointed at. The escape is the `\\?\` prefix,
which passes the literal path through unnormalised: `Remove-Item -LiteralPath '\\?\C:\...\Icon '`.
A path a tool cannot enumerate is often one it cannot delete either; reach for `\\?\` before
concluding the directory is locked or already gone.

The node names have since been normalised so exports emit clean paths, which removes this particular
trap. The habit it teaches outlives the fix:

- **A listing that returns without error is not a complete listing.** Check the count against an
  independent source before trusting it — for this kit, `REFERENCE-KIT.md` carries the expected
  totals for exactly this purpose.
- **Prefer the enumerator that fails loudly.** A tool that skips what it cannot read is worse than
  one that stops, because the gap is invisible in the output.
- **Path assumptions are artefact facts.** Trailing spaces, non-ASCII, em dashes and `/` in names all
  reach disk from Figma. Test the enumerator against the weirdest name in the set, not the first one.
