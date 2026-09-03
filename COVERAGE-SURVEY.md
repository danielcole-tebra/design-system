# Coverage survey

Survey pass, 2026-08-19. **Nothing was built.** Three independent enumerations, each taken from its
own artefact and none derived from another, at design-system 0.19.7.

**Storybook is reachable** at `https://fictional-adventure-rre6vjv.pages.github.io/master/` and its
index was read directly (`index.json`, 141 entries). This is the first survey that could see it.
Several things were deferred because nobody could look at them, and §4 re-checks each one.

---

## 1. The three enumerations

### Code — `packages/design-system` at 0.19.7

The design system **exports almost nothing and themes a great deal.** Two different populations:

| | Count |
|---|---:|
| MUI component keys themed by `overrides/` | **39** |
| Tebra components exported from the barrels | **8 entries** (`DataGridFilter`, `Feedback`, `ReadMore`, `TrialFeatureGate`, `avatars`, `icons`, `illustrations`, `marketingIcons`) |
| Tebra components present but **not exported** | **2** (`ListItemDelete`, `ListItemDeleteIcon`) |
| Icon components | **67** |
| Marketing icon components | **9** |
| Typography variants defined | **10** |

The 39 themed keys: `MuiAccordion`, `MuiAccordionSummary`, `MuiAlert`, `MuiAutocomplete`, `MuiAvatar`,
`MuiBadge`, `MuiButton`, `MuiButtonGroup`, `MuiCard`, `MuiCardActionArea`, `MuiCardActions`,
`MuiCheckbox`, `MuiChip`, `MuiCssBaseline`, `MuiDataGrid`, `MuiDialog`, `MuiIconButton`, `MuiList`,
`MuiListItem`, `MuiListItemButton`, `MuiMenuItem`, `MuiMobileStepper`, `MuiPagination`,
**`MuiRadioButton`**, `MuiSnackbar`, `MuiSnackbarContent`, `MuiStepIcon`, `MuiSvgIcon`, `MuiSwitch`,
`MuiTab`, `MuiTable`, `MuiTableCell`, `MuiTablePagination`, `MuiTableRow`, `MuiTabs`, `MuiTextField`,
`MuiToggleButton`, **`MuiTreeItem`**, **`MuiTreeView`**.

**39, not the 34 the record carries.** `MuiTreeItem` and `MuiTreeView` are among them, which matters
for §4.

### Storybook — the hosted build

**141 entries across 50 groups.** Every group, with story and doc counts:

`alert` 3 · `avatar` 4 · `badge` 2 · `chip` 9+1 · `data-grid` 6+1 · `divider` 4 · `icon` 2 ·
`iconbutton` 3 · `list` 3 · `pagination` 1+1 · `pagination/controlled` 1 · `pagination/variations` 1 ·
`readmore` 4+1 · `table` 4 · `tablepagination` 3+1 · `togglebutton` 3 · `tooltip` 1 · **`treeview` 3** ·
**`typography` 1** · `dialog` 5+1 · `feedback messages` 2 · `feedback error messages` 4 · `progress` 1 ·
`snackbar` 2 · `illustrations` 5 · `autocomplete` 7+1 · `button` 2 · `buttongroup` 2 · `checkbox` 3+1 ·
`radio` 1 · `radiogroup` 3 · `switch` 1 · `textfield` 3 · **`layout` 1** · `navigation (Tabs)` 1 ·
`drawer` 3 · `link` 1 · `stepper desktop` 2 · `stepper mobile` 2 · `accordion` 3 · `card` 2 · `paper` 2 ·
**`trial feature gate` 5** · **`popover` 2** · **`portal` 1** · `introduction` doc ·
**`patterns/drop chip` 1** · **`patterns/prepopulate form fields` 1** · **`patterns/task bar` 4+1** ·
`system/color/tebra palette` 1.

### Figma — the rebuild file, counted today

| | Count |
|---|---:|
| Component sets | **34** carrying **444** variants |
| Single components, not icons | **13** |
| Icon masters | **41** |
| Illustration masters | **7** |
| Text styles | **10** |
| Effect styles | **7** |
| Variables | **120** across Color 71, Typography 17, Dimension 32 |

The 13 singles: `Link`, `List`, `Table pagination`, `Tooltip`, `Circular progress`, `Dialog`, `Drawer`,
`Menu`, `Tabs`, `Stepper`, `Nav/Bar`, `Nav/Dropdown`, `Nav/Logo`.

---

## 2. The comparison table

Sorted so the gaps come first. **Exported** means exported from a design-system barrel; a themed MUI
component is marked *themed* because it is reachable through the theme without being exported.

### A. In code and Storybook, not in Figma — the answer to the question asked

| Component | Exported | Stories | In Figma | In kit |
|---|---|---:|---|---|
| **TreeView** | themed, 2 keys (`MuiTreeView`, `MuiTreeItem`) | **3** | **no** | no |
| **TrialFeatureGate** | **yes** | **5** | **no** | no |
| **marketingIcons** | **yes**, 9 icons | **1** (Marketing Icon List) | **no** | no |
| **Popover** | no override, no export | **2** | **no** | no |
| **Portal** | no override, no export | **1** | **no** | no |
| **Layout** | no override, no export | **1** | **no** | no |
| **TaskBar** | no export, story only | **4** + doc | **no** | no |
| **Drop Chip** (pattern) | no export | 1 | no | no |
| **Prepopulate Form Fields** (pattern) | no export | 1 | no | no |
| `CardActionArea` | themed | via Card | inside `Card`, not separate | — |
| `CardActions` | themed | via Card | inside `Card`, not separate | — |
| **41 icons** | **yes** | 1 (Utility Icon List) | **no** | no |

### B. In Figma, not in code

| Component | In Figma | Where it actually comes from |
|---|---|---|
| `Nav/Bar`, `Nav/Dropdown`, `Nav/Logo`, `Nav/Icon button`, `Nav/Menu item`, `Nav/Search` | **6 components** | `navigation-ui` under `createPartnerTheme`, **not `packages/design-system`**. The file's own component description says no part of this surface is canonical design-system truth |
| `Icon/Engage`, `Icon/Payments`, `Icon/Platform`, `Icon/Reports` | **4 icons** | Not in `components/icons`. Sourced from the navigation config |
| 11 `Icon/… (MUI)` glyphs | **11 icons** | `@mui/material` internals, transcribed deliberately |
| `Menu` | 1 single | `MuiMenuItem` is themed; **`MuiMenu` is not, and there is no Menu story** |

### C. Exported but no story — ambiguous membership

| Component | Exported | Stories | In Figma |
|---|---|---:|---|
| `DataGridFilter/FilterButton` | yes | **0** | no |
| `DataGridFilter/FilterGroupDrawer` | yes | **0** | no |
| `DataGridFilter/FilterLimitExplainer` | yes | **0** | no |
| `DataGridFilter/RefineFiltersMessage` | yes | **0** | no |

Four exported components with no story at all. Per the file's rule that stories declare membership,
these are exported code whose membership of the system is undeclared. `FilterGroupDrawer` is also the
component carrying defect A-1 from the action row pass.

### D. Story but no export — also membership

| Component | Stories | Themed | In Figma |
|---|---:|---|---|
| `Divider` | 4 | no override | **yes**, 2 variants |
| `Tooltip` | 1 | no override | **yes** |
| `Link` | 1 | no override | **yes** |
| `Circular progress` | 1 | no override | **yes** |
| `Paper` | 2 | no override | **yes**, 12 variants |
| `Popover` | 2 | no override | no |
| `Portal` | 1 | no override | no |
| `Layout` | 1 | no override | no |
| `TaskBar` | 4 + doc | no override | no |
| `Tebra Palette` | 1 | n/a, a swatch sheet | as the Tokens page |
| `Introduction` | doc only | n/a | as the Cover |

Five of these — Divider, Tooltip, Link, Circular progress, Paper — are **in Figma and in the kit with
neither an export nor a theme override behind them.** They are pure MUI, present in the system only
because a story says so. That is the rule working as intended, and worth knowing when someone asks
what the Tebra layer actually contains.

### E. In code, not exported, no story, not in Figma

| Component | Note |
|---|---|
| `ListItemDelete` | Directory exists, **not exported from any barrel**, no story, not in Figma |
| `ListItemDeleteIcon` | Same |

---

## 3. Primitives

### Typography

**The type system is 10 named variants and it is fully present in Figma as text styles.**

| Variant | Size / line height | Weight |
|---|---|---|
| `h1` | 32 / 48 | Bold |
| `h2` | 24 / 36 | Bold |
| `h3` | 20 / 32 | Bold |
| `h4` | 16 / 24 | Bold |
| `h5` | 14 / 20 | Bold |
| `subtitle2` | 12 / 16 | Bold |
| `body1` | 16 / 24 | Regular |
| `body2` | 14 / 20 | Regular |
| `button` | 16 / 24 | Regular |
| `caption` | 12 / 16 | Regular |

Code defines exactly these 10 and Figma carries exactly these 10, as **text styles**, plus 17
variables in a `Tebra/Typography` collection. So Typography is not a gap in the way the deferred list
implies — **it was delivered, as styles rather than as components.**

**What is missing is what Tebra never defined.** MUI's ramp also has `subtitle1`, `h6` and `overline`.
Tebra defines none of them, so any component reaching for one gets MUI's un-themed default. Neither
code nor Figma covers them. Whether that matters depends on whether anything uses them, which this
survey did not check.

**`typography.fontSize: 16` is the root of the `pxToRemInflation` flag**, measured twice during the
DataGrid pass. Recorded here because it belongs to the type system, not to any one component.

### Icons — the largest single gap on this board

| | Count |
|---|---:|
| Icon components in code | **67** |
| Icon masters in the kit | **41** |
| — of which are MUI internal glyphs | **11** |
| — of which are Tebra icons | **30** |
| **Tebra icons in code and not in the kit** | **41** |

The 41 missing, in full:

`AINoteAssist`, `AddPaymentNote`, `ArrowLeft`, `AttentionOutlined`, `ChatFilled`, `ChatOutlined`,
`CheckmarkFilled`, `CheckmarkOutlined`, `CustomOutlined`, `Delete`, `Document`, `DragAndDrop`,
`EditOutlined`, `Error`, `EyeIconClosed`, `EyeIconOpen`, `FavoritesOutlined`, `Idea`, `InfoOutlined`,
`Lightbulb`, `Lock`, `Menu`, `Phone`, `PracticeGrowth`, `PrintFilled`, `PrintOutlined`,
`QuestionOutlined`, `RadioChecked`, `Refresh`, `Search`, `Survey`, `Telehealth`, `Terminal`,
`TrashFilled`, `Unlock`, `Unsorted`, `UpCaret`, `UserFilled`, `UserOutlined`, `WarningOutlined`,
`WileyTreatmentPlanner`.

**Four of these have already blocked completed work**, which is the strongest argument in this
document that the gap is not academic:

| Icon | Blocked |
|---|---|
| `Lock` / `Unlock` | The patient header proposal, PH-5. Restriction had to go text-only |
| `Refresh` | The action row pass, A-5. The error retry slot |
| `CheckmarkFilled` | The DataGrid board. The processed status renders an empty slot |
| `Unsorted` | The DataGrid board. The sort indicator renders an empty slot |

**Also 9 marketing icons in code and 0 in the kit.**

### Spacing, radius, border, size

32 variables in `Tebra/Dimension`, all present: `space/` 2–9, 11–14, 16, 17, 19, 23, 24, 40 (20
values), `radius/` chip, chipSmall, pill, sm (4), `border/` focusVisible, hairline, inputFocused (3),
`size/` button/minWidth, icon/inButton, icon/medium, icon/small, input/endReserve, input/medium,
input/small (7). **No gap found.**

The `space/` scale is not a continuous ramp — it skips 10, 15, 18, 20, 21, 22 and everything between
24 and 40. Values are added when a component needs one. That is why DataGrid's 10px cell inset and
52px row have no token: nothing has needed them yet.

### Elevation

7 effect styles, `Elevation / 1, 2, 3, 4, 6, 8, 24`. MUI ships 25 levels; Tebra carries the 7 that
are used. **No gap found**, though the set is a subset by design and that is worth stating.

---

## 4. The deferred list, re-checked

| Deferred item | Reason given | Does the reason still hold? |
|---|---|---|
| **TreeView** | "licensed MUI X package", grouped with DataGrid | **No. The reason is wrong.** `@mui/x-tree-view ^6.17.0` is a **direct dependency of the design system** and is the **free** MUI X package, not a licensed one. It is themed by two override keys, it has **3 stories**, and its override supplies `DownCaretIcon` and `RightCaretIcon` as its expand and collapse glyphs — both already in the kit. Nothing blocks it |
| **Typography** | "already delivered as the 10 text styles" | **Holds.** 10 in code, 10 in Figma, verified both ways today. The only uncovered part is `subtitle1`, `h6` and `overline`, which Tebra never defined |
| **Icon catalogue** | "a catalogue view rather than a component" | **Half holds.** The *catalogue view* is indeed a view. But the underlying gap is 41 missing icon masters, which are components, and four of them have already blocked delivered work |
| **Portal** | "no visual surface" | **Holds, checked against the story.** `components-utils-portal` has one story, "Popover Portal In List", which demonstrates a Popover rendering through a Portal. The portal contributes no pixels of its own; what you see is the Popover |
| **Layout** | "no visual surface" | **Does not hold.** `components-layout` has a story called "Layout Example", and a layout example necessarily renders a visible arrangement. The disposition was made without seeing it. What it is worth building is a separate question this survey does not answer |
| **Popover** | "its paper path Menu already covers" | **Partly holds, and is now checkable.** Popover has 2 stories of its own. Whether its paper is identical to Menu's is a claim that can now be measured against the render and has not been |
| **ListItemDelete** | "exported with neither override nor story" | **Understated.** It is not exported at all, from any barrel. So it is not merely undeclared, it is unreachable by a consumer |
| **DataGrid** | licensed MUI X | Correct, and **now built** anyway, against the free-to-read Pro v6 stories |
| **marketingIcons** | "referenced by no override or story" | **No. The reason is false.** There is a story: `components-data-display-icon` renders both a "Utility Icon List" and a **"Marketing Icon List"**. Per the file's own rule that stories declare membership, marketingIcons is a member |

**Two deferral reasons are factually wrong** (TreeView, marketingIcons), **one is wrong on inspection**
(Layout), and **one understates the situation** (ListItemDelete). Four of nine. That is the cost of
dispositioning a list while the render was invisible.

---

## 5. In Storybook and nowhere in the record

Everything with a story that no inventory document lists as a component.

| Story group | What it is | Product files using it |
|---|---|---:|
| **`patterns/task-bar`** 4 stories + doc | A bottom action bar pattern, assembled from Button and Paper. `stories/TaskBar/` only — no component, no export | grep for a TaskBar component: **0**. The pattern is composed inline where used |
| **`patterns/drop-chip`** 1 story | A Chip used as a drop target | 0 as a named component |
| **`patterns/prepopulate-form-fields`** 1 story | A form-filling pattern | 0 as a named component |
| **`components-layout`** 1 story | A page layout example | 0 as a named export |
| **`components-utils-portal`** 1 story | Popover rendered through a Portal | 0 |
| **`system-color-tebra-palette`** 1 story | The palette swatch sheet | n/a, it is documentation |
| **`example-introduction`** doc | The Storybook front page | n/a |
| **`components-feedback-messages-errormessages`** 4 stories | Browser incompatibility, Forbidden, Internal server error, Not found | Present in Figma as `Feedback message` (12 variants) |

The first three are the ones the record already calls "patterns, listed not built", so they are known.
**`components-layout` is the one genuinely absent from every inventory**: it is not in the component
list, not in the pattern list, and its deferral reason says it has no visual surface, which its own
story contradicts.

---

## 6. Sizing the gap

Rough cost only. **No build order is proposed; that is a decision, not a survey finding.**

### Could be built in one pass

| Item | Why it is small |
|---|---|
| **TreeView** | 2 override keys, 3 stories, expand and collapse glyphs already in the kit. A set with an expanded and collapsed item, a nested level and a selected state. Comparable to `List/Item` |
| **Popover** | 2 stories, no override. Its paper is likely `Paper`, already built at 12 variants. Possibly a single component |
| **TrialFeatureGate** | 5 stories, one exported component, states are Trial / Trial right start / Trial without CTA / Paid / Loading. A 5-variant set |
| **marketingIcons** | 9 icons, mechanical once the SVGs are to hand |
| **`CardActionArea` / `CardActions`** | Two themed keys currently living inside `Card`. Either promote or record deliberately |

### Needs its own discovery first

| Item | What is unknown |
|---|---|
| **The 41 missing icons** | Mechanically simple per icon, but 41 of them, and the selection question is real: the kit deliberately holds 30 Tebra icons plus 11 MUI glyphs, so someone chose a subset once. Whether the answer is "all 67" or "the ones product uses" is a decision needing usage counts |
| **Layout** | Its disposition is contradicted by its own story. What it is has to be established before it can be sized |
| **TaskBar** | 4 stories and a doc, no component. Whether it is a component, a pattern or a composition is exactly the `FacesheetTotals` question already open in the ledger |
| **DataGridFilter**, 4 components | Exported with zero stories. Membership is undeclared, and one of them carries defect A-1 |
| **Typography `subtitle1` / `h6` / `overline`** | Not defined by Tebra at all. Needs a usage sweep before anyone decides whether the gap matters |

### Blocked on something else

| Item | Blocked on |
|---|---|
| **DataGrid v7 Premium surfaces** | A running product build. DG-1 is still inferred from class names. The library's Storybook is v6 and cannot settle it |
| **`ListItemDelete`** | A decision, not a discovery. It is unexported, unstoried and unbuilt. Whether it is system at all is the open question |

**Nothing on this list is blocked on Storybook any more.** That was the blocker for most of the
deferred list and it is gone.

---

## 7. Defects, flagged and not fixed

| # | Where | What |
|---|---|---|
| **CS-1** | `overrides/RadioButtonOverrides.ts` | The key is **`MuiRadioButton`**, which is not an MUI component name. The real key is `MuiRadio`, so this override block reaches nothing. Already recorded as a known drift item on the Cover; confirmed still present at 0.19.7 |
| **CS-2** | `components/index.ts` | `ListItemDelete` and `ListItemDeleteIcon` exist as directories and are exported from **no barrel**. Unreachable code |
| **CS-3** | The record | The deferred list gives **factually wrong reasons** for TreeView (called licensed; it is a free direct dependency) and marketingIcons (called unstoried; it has a story) |
| **CS-4** | Kit vs code | **41 of 67 icons are missing from the kit**, and four of them have already blocked delivered work on three separate boards |
| **CS-5** | Figma | Four icons — `Engage`, `Payments`, `Platform`, `Reports` — exist in Figma with **no matching code icon**. They are real product assets, but they entered the kit from the navigation config rather than from the design system, so nothing in `packages/design-system` governs them |

## 8. Disagreements, reported not resolved

| Question | The record says | The live artefacts say |
|---|---|---|
| Themed MUI keys | 34 | **39**, counted from `overrides/` today |
| TreeView | deferred, licensed MUI X | **free package, direct dependency, themed, 3 stories** |
| marketingIcons | "referenced by no override or story" | **has a story** |
| Layout | "no visual surface" | **has a story called Layout Example** |
| ListItemDelete | "exported with neither" | **not exported at all** |
| Typography | deferred | **delivered**, 10 in code and 10 in Figma |
| Icon catalogue | "a catalogue view rather than a component" | the view is a view; **the 41 missing masters are components** |

Where the record and the live file disagree, the live file wins and the record is flagged above. None
of these has been corrected in the record by this pass.
