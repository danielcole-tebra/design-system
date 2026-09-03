# DataGrid discovery

Discovery pass, 2026-08-19. **Nothing was built.** Enumerated from source in `C:\Code\web-app-v2` at
design-system 0.19.7, not from the Table pass or any previous report.

**Storybook is reachable, and this pass measured it.** Not locally — there is still no `node_modules`
and no `storybook-static` in the checkout, and `localhost:6006` refuses connection. It is **hosted**:

    https://fictional-adventure-rre6vjv.pages.github.io/master/

Measured 2026-08-19 through the browser, reading `getComputedStyle` and `getBoundingClientRect` off
the live preview iframe. **Everything in §2, §4, §5 and §8 marked _measured_ below was read from the
render, not transcribed.** Storybook is authority on render, so where a measured value and a
transcribed one disagree, the measured one wins and the disagreement is recorded.

**What is still pinned:** anything the stories do not exercise. All six stories are `DataGridPro`
**v6**, so nothing here observes the v7 Premium surfaces, and no story pins a column, so **DG-1 is
still inferred from class names rather than seen**. Product-side values remain source-transcribed.

One reading artefact to discount: computed border widths came back as `0.501253px` for borders
authored at `1px`, while heights came back at full scale (`51.997` for 52). The colours and which
slot carries a border are reliable; the sub-pixel width is a capture artefact and `1px` from source
is kept as the authored value.

The Tebra layer here is 65 lines of CSS. Everything else on this surface is MUI X.

---

## 1. Version fork

**25 files render a grid.** The brief's count is confirmed exactly, but only once styled wrappers are
counted: two files render through `styled(DataGrid…)` aliases (`StyledDataGrid` in `documents-ui`,
`StripedDataGrid` in `worklist-ui/GridWrapper`) and a tag-name grep alone finds 23.

| Package | Render sites | Version |
|---|---:|---|
| `@mui/x-data-grid` (community) | **1** | `^6.12.1` |
| `@mui/x-data-grid-pro` | **14** | `^6.5.0`, `^6.9.0`, `^6.19.6` |
| `@mui/x-data-grid-premium` | **10** | `^7.13.0`, `^7.27.2`, `^7.28.3` |

**Ten of twenty-five are Premium v7. Confirmed.** 88 files import a grid package in total; the other
63 import types, hooks and utilities without rendering anything.

The design system itself depends on **`@mui/x-data-grid-pro ^6.19.6`**, and every one of its six
story files imports `DataGridPro`. So the library is authored against v6 Pro while 10 of the 25
product surfaces run v7 Premium.

### What differs that matters for a Figma artifact

**The visible surface is not the same across the fork, and there is evidence in the codebase rather
than in the changelog.** v7 restructured the header and pinned-column DOM. Two concrete traces:

1. `DataGridOverrides.ts` styles a slot called **`pinnedColumns`**. That slot and its
   `.MuiDataGrid-pinnedColumns` class are v6. v7 replaced them with per-cell
   `.MuiDataGrid-cell--pinnedLeft` / `--pinnedRight` classes. **The override cannot be reaching the
   10 v7 surfaces.**
2. `documents-ui/StyledDataGrid.tsx`, a v7 Premium file, re-states the header ground
   (`.MuiDataGrid-columnHeaders, .MuiDataGrid-pinnedColumnHeaders` → `core.light`) and styles
   `.MuiDataGrid-row--borderBottom` and `.MuiDataGrid-cell--pinnedRight`, all v7-only classes. It is
   doing locally what the theme is supposed to do globally, which is what you would expect if the
   theme no longer reaches it.

Sorting, filtering, the column menu, checkbox selection, the toolbar and the footer are structurally
the same across v6 and v7, and the numeric defaults below are unchanged between them. **What differs
is the class and slot names the Tebra layer hooks into, not what a user sees.**

**Which to build to: v6 Pro**, on three grounds. It is what the design system depends on, what all
six stories are written against, and what 14 of 25 product surfaces run. The caveat is that the
Figma artifact would then depict a surface whose *styling contract* is already broken on 10 of 25
product instances, so the choice should be recorded as "build the library's version, not the
majority's". This is a disagreement, not a resolution: **the library says v6 Pro, the newest and
largest product surfaces say v7 Premium, and the two are not reconciled anywhere.**

---

## 2. What the overrides do

`DataGridOverrides.ts`, 65 lines, one component key (`MuiDataGrid`), eight styled slots. Every MUI
default in the right-hand column is **pinned**.

| # | Slot | Property set | Value | Authored or derived | MUI default |
|---|---|---|---|---|---|
| 1 | `root` `.minimal` descendant | header background | `background.paper` `#FFFFFF` | derived, token | no `.minimal` concept exists |
| 2 | `root` `.minimal` descendant | header `borderBottom` | `1px solid grey[600]` `#545454` | derived, token. **A 1px rule in body-text grey** | header border is `withBorderColor`, a light grey |
| 3 | `root` `.striped` descendant | odd row background | `action.selected` `#F0EEE8` | derived, token, **used against its name** | no striping concept exists |
| 4 | `root` `.striped` descendant | odd row hover | `action.hover` `#CBDDE0` | derived, token | — |
| 5 | `root` `.striped` descendant | cell `borderBottom` | `0px` | **authored** | 1px solid |
| 6 | `root` detail-panel-expanded cell | `borderBottom` | `0px` | **authored** | 1px solid |
| 7 | `columnHeader` | `backgroundColor` | `core.light` `#D4E0DD` | derived, token | transparent, inherits paper |
| 8 | `columnHeaderTitle` | `fontWeight` | **`700`, a raw number** | **authored** | inherits `body2`, weight 400 |
| 9 | `pinnedColumns` | `backgroundColor` | `background.paper` | derived, token | paper. **v6-only slot, see §1** |
| 10 | `row` | `&.Mui-selected` background | `primary[200]` `#8CB2B6` | derived, token | `action.selected` at 8% |
| 11 | `row` | `&.Mui-selected.odd` background | `primary[200]` | derived, duplicate of 10 | — |
| 12 | `row` | hover / active background | `action.hover` `#CBDDE0` | derived, token | `action.hover` at 4% |
| 13 | `cell` | `borderBottom` | `1px solid divider` `#D6D6D6` | derived, token | 1px solid `withBorderColor` |
| 14 | `detailPanel` | background | `background.paper` | derived, token | paper |
| 15 | `detailPanel` | `borderBottom` | `1px solid grey[400]` `#D6D6D6` | derived, token | none |
| 16 | `withBorderColor` | `borderColor` | `grey[400]` `#D6D6D6` | derived, token | `divider` |

**Two tokens resolve to the same colour.** `divider` and `grey[400]` are both `#D6D6D6`, and the file
uses `divider` for the cell rule (13) and `grey[400]` for the global border colour (16) and the
detail panel rule (15). One value, three references, two names. Reported, not resolved.

**`action.selected` is used for striping, not selection.** Selection is `primary[200]`. So the token
named for selection paints every other unselected row, and the selected row uses a palette entry with
no selection semantics. Legible as a defect rather than a choice.

### What it does not override, and the Table asymmetry

Compare `TableOverrides.ts`, 33 lines, three component keys:

| Property | Table | DataGrid |
|---|---|---|
| Header ground | `core.light` on `MuiTableRow.head` | `core.light` on `columnHeader` — **they agree** |
| Header type | `fontSize` **and** `fontWeight` from `theme.typography.h5` | **`fontWeight: 700` hardcoded, no size at all** |
| Row ground | `background.paper` on every row | **not set** |
| Row hover | not set | `action.hover` |
| Row selected | not set | `primary[200]` |
| Cell border | left to MUI | `1px solid divider` |
| Striping | none | two class contracts, `.striped` and `.minimal` |

**The sharp asymmetry is the header type.** Table binds its header to a typography token, so a change
to `h5` moves the table. DataGrid hardcodes the weight and never sets the size, so its header text
size is whatever MUI's `body2` gives it and its weight cannot move with the ramp. Both land on bold,
by two different mechanisms, and only one of them is connected to the type system.

**DataGrid also invents two class contracts the library does not export.** `.striped` and `.minimal`
are strings a consumer must know to type. `.striped` additionally requires the consumer to pass
`getRowClassName` returning `even`/`odd`, because the CSS targets `.odd` and nothing in the theme
produces that class. **A two-part contract, documented only inside a story.**

---

## 3. Stories

Six story files plus one shared hook and one mocks directory, 1291 lines.

| File | Demonstrates | Props it sets |
|---|---|---|
| `DataGrid.stories.tsx` | The canonical grid. Pharmacy list, 8 columns | `checkboxSelection`, `disableRowSelectionOnClick`, `pagination`, `pageSizeOptions [5,10,15,20]`, `initialState.pagination`, `getRowClassName` even/odd, `slots.columnMenu` custom, `className` selectable between `striped` / `minimal` / `default` |
| `DataGridStyles.stories.tsx` | The three grounds side by side: Default, Striped, Minimal | `checkboxSelection`, `disableRowSelectionOnClick`, `hideFooter`, `getRowClassName` on the striped one only |
| `examples/DataGridExpandableRows` | Detail panel per row | adds `getDetailPanelContent` |
| `examples/DataGridFilters` | Filters and buttons around the grid | adds `autoHeight` |
| `examples/DataGridOverflowFiltersOverlay` | More Filters drawer as an overlay | same as canonical |
| `examples/DataGridOverflowFiltersOverlayScrunch` | More Filters drawer squeezing the grid | same as canonical |

### Confirmed: five stories share `useStatuses`, and it is icon plus Typography with no Chip

`DataGrid.stories` and all four `examples/` stories import it. Unchanged at 0.19.7. Four statuses,
each an icon with `htmlColor` plus `<Typography variant="body2" ml={1}>`:

| Status | Icon | Colour |
|---|---|---|
| Processed | `CheckmarkFilledIcon` | `success.dark` |
| Submitted to Biller | `EllipsisFilledIcon` | `grey[600]` |
| Needs Revision | `InfoFilledIcon` | `error.main` |
| Not found in PM | `WarningFilledIcon` | `warning.dark` |

`htmlColor` bypasses the theme's icon colour handling and paints the SVG directly. `ml={1}` is the
only spacing. **No Chip anywhere**, which matches the Table pass.

### What else the stories are consistent about

- **All six set `disableRowSelectionOnClick`. All six set `checkboxSelection`.** No exceptions.
- **Five of six set `getRowClassName` even/odd**, the second half of the striping contract.
- **None sets `rowHeight`, `columnHeaderHeight` or `density`.** The library never states a height.
- **None sets `loading`.** The library never shows a loading grid.
- The canonical story replaces the column menu with one that nulls `columnMenuSortItem`,
  `columnMenuFilterItem` and `columnMenuColumnsItem` — **it keeps the menu and empties it.**
- Row actions are `GridActionsCellItem` with `showInMenu`, three items, in a `type: "actions"` column
  of `width: 80`.

The `.mdx` carries authored guidance that exists nowhere else: filters and whole-set actions above
the grid, checkbox-dependent buttons below it, caret indicators consistent with Accordion for
expandable rows, never links to expand, and two named More Filters patterns (Overlay when the user
need not see data and filters at once, Scrunch when they must). **Per the file's own rule this counts
as system.** None of it is expressed in code.

---

## 4. Geometry

**DataGrid authors a height. This is the sharpest difference from Table and it should be stated
plainly.**

Table's body row resolved to **53 at medium** as a *consequence*: no height is authored anywhere, the
cell's vertical padding drives it. DataGrid's row height is a **number, supplied as a prop**, default
**52** (pinned). Nothing about the content affects it. Two components in one library, one
padding-driven and one number-driven, landing **one pixel apart**.

| Property | Value | Source | Notes |
|---|---|---|---|
| Row height | **52** | MUI prop default, **measured** | `min-height` and `max-height` both exactly `52px`. No token at 52. 6.5 × 8, **off the 8 grid by 4**. Nearest space tokens are `space/13` = 13 and `space/24` = 24; neither is near |
| Column header height | **56** | MUI prop default, **measured** | 7 × 8, on the grid. No token at 56 |
| Cell padding | `0px 10px` | MUI default, **measured** | on a data cell. The kit has no 10; **nearest is `space/9` = 9, off by 1**. The checkbox cell is `0px` with no horizontal padding, a separate case |
| Header padding | `0px 10px` | MUI default, **measured** | matches the cell exactly |
| Header ground | `#D4E0DD` `core.light` | **override, measured** | the override reaches the render |
| Row ground | **transparent** on even rows | nothing sets it, **measured** | confirms the Table asymmetry: Table paints every row `paper`, DataGrid paints none |
| Striped odd row | `#F0EEE8` `action.selected` | **override, measured** | |
| Selected row | `#8CB2B6` `primary[200]` | **override, measured** | |
| Row separator | `1px solid divider` `#D6D6D6` | **override, slot `cell`, measured** | measured `rgb(214,214,214)`. **Zeroed to none under `.striped`, confirmed** — the striped ground has no row rule at all |
| Global border colour | `grey[400]` `#D6D6D6` | **override, slot `withBorderColor`** | same colour, different token |
| Column separator | `visibility: hidden` until hover, doubles as the resize handle | MUI default, **measured** | `showColumnVerticalBorder` is set by **0 of 25** files |
| Header type | `14px / 700`, Akkurat LL | **measured** | lands on the same 14/bold as Table's `h5`, by a different route. See the §2 asymmetry |
| Density factors | compact 0.7, standard 1, comfortable 1.3 | MUI default, **pinned** | no story exercises density; root carried `--densityStandard` |

### The three grounds, measured side by side

From `DataGridStyles.stories.tsx`, all three rendered at once:

| Ground | Header background | Header rule | Cell rule | Odd row |
|---|---|---|---|---|
| Default | `#D4E0DD` | none | `1px #D6D6D6` | — |
| Striped | `#D4E0DD` | none | **none** | `#F0EEE8` |
| Minimal | **`#FFFFFF`** | **`1px #545454`** | `1px #D6D6D6` | — |

Row height is **52 in all three**. The grounds differ only in fills and rules, never in geometry.

### What product does to the numbers

**9 of 25 set `rowHeight`, and they do not agree with each other or with the default:**

| Value | Files |
|---:|---|
| 34 | `InteractionDataGrid`, `SearchDataGrid`, `AlternativeMedications` |
| 38 | `PharmacySearchDataGrid` |
| 40 | `FavoritesDataGrid`, `PatientDxDataGrid` |
| 64 | `CaseReportTable`, `WorklistStyleDataGrid` |
| 80 | `OrderSummaryDataGrid` |

**Five distinct heights, none of them 52, none of them equal to Table's 53.** `34` and `38` are odd
numbers off the 8 grid by 2 and 6; `80` is 10 × 8. Nothing is snapped here — the values are recorded
as found.

**6 of 25 set `columnHeaderHeight`**, all in `ordering-system`, each matching that file's own
`rowHeight` (34, 34, 34, 38, 40, 40) rather than MUI's 56. So those grids have square-ish header and
body rows, which no other surface does.

**5 of 25 set `density`** — `compact` hardcoded in `NotesDataGrid` and `ProcedureDetailDataGrid`,
and user-controlled through store state in the three `documents-ui` grids. **3 of 25 set
`autoHeight`.** `headerHeight`, the deprecated v5 name, is set by none.

---

## 5. Header

| Control | Default | Product |
|---|---|---|
| Sort indicators | on, `asc / desc / null` | **0 of 25** set `sortingOrder` or `disableColumnSorting`. Every grid sorts, nobody configures it |
| Column menu | on | **18 of 25 set `disableColumnMenu`** — deleted outright |
| Filter controls | on, via the menu and the filter panel | **9 of 25 set `disableColumnFilter`** |
| Column selector | on, via the menu | **7 of 25 set `disableColumnSelector`** |
| Resize handles | on in Pro and Premium | **4 of 25 set `disableColumnResize`** |
| Column pinning | on in Pro and Premium | **3 of 25 set `pinnedColumns`** |
| Header pinned when body scrolls | **yes, structurally — measured.** `.MuiDataGrid-columnHeaders` is a **sibling** of `.MuiDataGrid-virtualScroller`, not a descendant, so it cannot scroll with the body | not configurable, nobody touches it |

**The header is the clearest disagreement between library and product.** The library's canonical
story keeps the column menu and empties it of sort, filter and columns. Product deletes the whole
menu in 18 of 25. Both end up with no menu items; one leaves a button that opens an empty menu and
the other removes the button. **Two answers to the same question, and the library's is the rarer.**

Sorting is the one header affordance that is universally on and universally unconfigured, so it is
the only one a Figma artifact can depict without choosing a side.

---

## 6. Toolbar and footer

**Toolbar: 5 of 25.** All five build their own through `GridToolbarContainer` rather than using MUI's
`GridToolbar`. `documents-ui/DocumentsDataGridToolbar.tsx` sets `sx={{ p: 0 }}` on the container,
zeroing MUI's padding, and is the fullest example. No story shows a toolbar at all — the `.mdx`
instead says to put filters and whole-set actions **above** the grid, outside it. **So the library's
documented position is that the toolbar is not where controls go, and 5 of 25 files use one anyway.**

**Footer: 14 of 25 set `hideFooter`** and remove it entirely. Of the rest:

| Footer element | Product |
|---|---|
| Pagination | `pagination` in 13 of 25, `paginationMode` in 11 of 25 (server-side) |
| Row count | `hideFooterRowCount` in 1 of 25 |
| Selection count | `hideFooterSelectedRowCount` in **4 of 25** |
| Custom footer slot | 13 of 25 reference a footer slot or component |

`worklist-ui` ships its own `ClientPaginationFooter`. So the majority position is "no footer", and
among those that keep one, the most commonly suppressed part is the **selection count** — which is
notable because 9 of 25 enable checkbox selection, so a third of the grids that let you select rows
hide the count of what you selected.

---

## 7. States

**DataGrid has its own loading treatment and product overwhelmingly uses it. This is the opposite of
Table.**

| State | Comes from | Product |
|---|---|---|
| **Loading** | **The grid.** MUI renders a progress indicator over the viewport from the `loading` prop | **15 of 25 pass `loading`.** Only **2 of 25** hand-roll anything (`MergeToolDataGrid`, `SearchDataGrid` reference `CircularProgress` / `Skeleton`). 10 of 25 never show a loading state at all |
| **Empty** | The grid, via `noRowsOverlay` | 3 of 25 replace it. `documents-ui/NoRowsOverlay.tsx` is the only real one, and it branches: "All Columns Are Hidden" with instructions, or a bare "No results found." |
| **No results after filter** | The grid has a **separate** `noResultsOverlay` slot for exactly this | **0 of 25 set it.** Nobody distinguishes "there is no data" from "your filter matched nothing". The one custom overlay above collapses both into "No results found." |
| **Error** | **Nothing.** The grid has no error state | 12 of 25 mention `error`, all of it handled outside the grid |
| **Selected row** | The grid, styled by the override to `primary[200]` | 10 of 25 track `rowSelectionModel` |

**The Table pass found seven loading treatments across eleven files and no reference surface.
DataGrid found one treatment used by 15 files.** The difference is that MUI gives DataGrid a
loading prop and gives Table nothing, so the component with a built-in answer got a consistent
product, and the component without one got seven inventions. That is the strongest evidence in either
pass that the inconsistency is caused by the absence of an affordance rather than by carelessness.

**The `noResultsOverlay` gap is the defect-shaped finding here.** The slot exists, it is free, it
distinguishes two states a user genuinely confuses, and zero of 25 use it.

---

## 8. Selection and row actions

**Checkbox selection: 9 of 25** enable it, against **6 of 6 stories**. The library shows it on every
single surface; product uses it on just over a third. `disableRowSelectionOnClick` is set by 15 of 25
and by all six stories — the one prop library and product agree on.

The header checkbox is MUI's own and **0 of 25 customise it**. Its behaviour is now **measured, and it
is correct**: with 0 selected it is empty; with 1 of the 10 visible rows selected it carries
`MuiCheckbox-indeterminate` and the dash glyph; with all 10 visible rows selected it is **still
indeterminate**, because the dataset is 20 rows across 2 pages and ten of twenty is genuinely "some";
clicking the header checkbox itself selects **all 20 across both pages** and it becomes a tick.

Recorded because it nearly became a false finding: a first probe read the DOM property
`input.indeterminate`, which MUI never sets, and made 1-of-10 and 10-of-10 look identical. MUI
signals the state through `data-indeterminate` and a class instead. **Tri-state works; there is no
defect here.**

### The checkbox measures 27.4286, not 24

The row checkbox icon renders at **`27.4286px`**, against the **24** the Table set settled on. This is
not a new defect and not a contradiction. `SvgIconOverrides.ts` encodes
`fontSizeMedium: "1.7142857142857142rem"`, which is 24/14, against `htmlFontSize: 16` — so
24 × 16/14 = 27.4286 exactly.

That is schema flag **`pxToRemInflation`**, which already predicts it in words: "SvgIcon small/medium
encode 20/24 and render at 22.857/27.429." **This pass is the first time that flag has been measured
rather than derived.** Under decision 2 the handling is settled: Figma binds the intended integer
**24** and records computedPx **27.4286** beside it. Both numbers are correct, for different
questions.

### Row actions: three different answers, and the grid agrees with neither of the others

| Source | Row action mechanism |
|---|---|
| **The library's story** | `GridActionsCellItem` with `showInMenu`, in a `type: "actions"` column of width 80 |
| **The Table set** | 24px checkbox and **`LinearEllipsis`** |
| **Product grids** | **`IconButton` with MUI's `MoreVertIcon`**, in bespoke menu components |

**`GridActionsCellItem` is used by 0 of 25. `type: "actions"` is used by 0 of 25. `showInMenu` is used
by 0 of 25.** The mechanism the canonical story demonstrates is used by nothing in the product.

**`LinearEllipsis` and `EllipsisFilled` are used by 0 of 25** grid files, so the Table set's settled
row-action icon does not appear on any grid.

Instead, 6 of 25 use `IconButton`, and `documents-ui/DocumentRowActionsMenu.tsx` imports
**`MoreVertIcon` from `@mui/icons-material`** — an icon that is not in the kit's 41-icon catalogue at
all, when the catalogue contains both `Icon/EllipsisFilled` and `Icon/LinearEllipsis`. Flagged as a
defect rather than a choice: an off-catalogue icon where two catalogue icons exist for the purpose.

---

## 9. Where product and library disagree

| # | Subject | Library | Product | Counts |
|---|---|---|---|---|
| 1 | Column menu | keep it, empty it | delete it | 18 of 25 delete |
| 2 | Row actions | `GridActionsCellItem` in an actions column | `IconButton` + `MoreVertIcon` in a bespoke menu | 0 of 25 use the library's |
| 3 | Checkbox selection | on in 6 of 6 stories | on in 9 of 25 | — |
| 4 | Status treatment | icon + `Typography body2`, `ml 1`, no Chip | not reproduced on any grid; `CheckmarkFilledIcon` appears in 2 worklist column files only | `useStatuses` is used by 0 product files |
| 5 | Row height | never stated | five different values, none 52 | 9 of 25 set it |
| 6 | Density | never stated | `compact` hardcoded twice, user-controlled three times | 5 of 25 |
| 7 | `.minimal` class | one of three documented grounds, shown in a story and the mdx | **used by 0 of 25** | dead contract |
| 8 | `.striped` class | the default in the canonical story's args | used by 6 of 25 | — |
| 9 | Toolbar | mdx says put controls above the grid, not in a toolbar | 5 of 25 build a toolbar | — |
| 10 | Header ground | set globally by the theme | re-stated locally by `StyledDataGrid` for v7 | 2 of 25 restate `core.light` |
| 11 | Hover / selected | set globally by the theme | re-stated locally with `!important` in `StyledDataGrid` | 4 of 25 restate `action.hover` |

**On (10) and (11), the per-instance restatement is not redundancy — it is the v7 fork showing
through.** `StyledDataGrid` restates exactly the properties whose theme slots no longer match v7's
DOM. Reported as evidence for §1, not as a product error.

**Raw hex in grid files**, where a token exists for the same value:

| Hex | Where | Token it duplicates |
|---|---|---|
| `#f0eee8` | a render site | `action.selected` `#F0EEE8` |
| `#d6d6d6` | a render site | `divider` / `grey[400]` `#D6D6D6` |
| `#fbf9f8` | `StyledDataGrid` even-row pinned cell | **no palette entry** |
| `#e3e6e6` | `StyledDataGrid` selected-hover pinned cell | **no palette entry** |

---

## 10. The boundary

### The 25 grid surfaces

| Surface | What it shows |
|---|---|
| `worklist-ui` `GridWrapper` | The shared shell behind every worklist |
| `worklist-ui` `PatientsWorklist/columns` | Patient roster, **20+ columns** incl. SSN, address, responsible party |
| `worklist-ui` `EncountersWorklist/columns` | Encounters, **18+ columns** incl. four diagnosis slots |
| `worklist-ui` `ProcedureDetailDataGrid` | Procedure lines under one encounter |
| `worklist-ui` `TransactionsTable` | Payout transactions: Date, Type, ID, Card, Charged, Fees |
| `clinical-notes-ui` `NotesDataGrid` | Notes list: Visit Date, Note Type, Status, Provider, Preview |
| `documents-ui` `DocumentsDataGrid` | Document library, user-configurable columns and density |
| `documents-ui` `FaxTransmissionsDataGrid` | Outbound fax log |
| `documents-ui` `MergeIssuesDataGrid` | Merge conflicts |
| `documents-ui` `MergeToolDataGrid` | Imported Data / Currently in Chart / Merge Preview |
| `patient-statements-ui` `ActivityTable` | Statement activity: Sent, Patient, $ Due, Delivery, Send Status |
| `payment-subscription-ui` `WorklistStyleDataGrid` | Subscribers, enrolment, actions-required views |
| `electronic-case-reporting-ui` `CaseReportTable` | Case reports: Status, Reportability, Provider, Received |
| `medications-ui` `ErxRequestsDataGrid` | eRx requests: Status, Details, Type, Fill Status |
| `medications-ui` `PendingOrdersDataGrid` | Queued orders by patient and assignee |
| `ordering-system` `OrderSummaryDataGrid` | Prescription cart: Medications, Qty, Refill, instructions |
| `ordering-system` `SuggestedMedsDataGrid` | Suggested meds with an Actions column |
| `ordering-system` `PharmacySearchDataGrid` | Pharmacy search results |
| `ordering-system` `SearchDataGrid` | ICD-10 search results |
| `ordering-system` `FavoritesDataGrid` | Favourite ICD-10 codes |
| `ordering-system` `PatientDxDataGrid` | Patient diagnoses |
| `ordering-system` `InteractionDataGrid` | Drug interactions by severity |
| `ordering-system` `AlternativeMedications` | Alternatives by copay tier |
| `ordering-system` `AgeLimits` / `QuantityLimits` / `StepMedications` | Formulary coverage factor tables |
| `patient-history-ui` `CustomItemsDialog` | Custom social-history items: Label, Used |

### The 21 Table surfaces

The brief says 20; the checkout has **21**.

| Surface | What it shows |
|---|---|
| `admin-ui` `MessageRoutingTable` | Routing rules |
| `admin-ui` `IntakeTable` | Intake form list |
| `admin-ui` `UserRolesTable` | Permissions per role, in a modal |
| `admin-ui` `VisitReasonsListPage` | Visit reasons: Color, Procedure Codes |
| `appointment-workflow-ui` `HolidaysList` | Holiday, Date, Actions |
| `appointment-workflow-ui` `BreaksSection` | Name, Time, Recurrence |
| `appointment-workflow-ui` `TimeSlotsSection` | Color, Name, Time, Recurrence, Location |
| `appointment-workflow-ui` `TimeOffList` | Provider, Reason, Start, End |
| `appointment-workflow-ui` `ProcedureServicesTable` | Procedure lines on an appointment |
| `appointment-workflow-ui` `AvailabilityTable` | Appointment availability |
| `ar-dashboard-ui` `TopOutstandingBalances` | Dashboard widget, top N balances |
| `messages-ui` `AttachDocumentTable` | Document picker inside a dialog |
| `messages-ui` `PatientList` | Patient picker |
| `patient-engagement-ui` `OnlinePresenceProviderListings` | Site, Status, Site Link |
| `patient-engagement-ui` `ReputationDetails` | Reputation breakdown |
| `patient-engagement-ui` `ReviewSurveyDetails` | Survey responses |
| `patient-intake-admin-ui` `PatientIntakeTable` | Intake submissions |
| `patient-intake-admin-ui` `TemplateCard` | Template contents inside a card |
| `patient-intake-ui` `PharmacyList` | Pharmacy picker |
| `proof-of-timely-filing-ui` `Service` | Service lines |
| `worklist-ui` `AccessibleChartTable` | **The accessible text equivalent of a chart** |

### Is a rule visible?

**A rule is not visible. What is visible is a dependency boundary with four exceptions, and the
exceptions have a shape.**

| | Packages |
|---|---:|
| Declare a grid dependency | 13 (excluding `design-system`) |
| Use `Table` | 9 (excluding `design-system`) |
| **Both** | **4** — `messages-ui`, `patient-engagement-ui`, `proof-of-timely-filing-ui`, `worklist-ui` |
| **Table only, no grid dependency at all** | **5** — `admin-ui`, `appointment-workflow-ui`, `ar-dashboard-ui`, `patient-intake-admin-ui`, `patient-intake-ui` |

**Five of the nine Table-using packages could not have used a grid.** They have no grid dependency to
import. For those, the choice was made by the dependency list, which is the pass 2 finding confirmed
with more detail.

**The four packages that had a grid available and chose Table anyway are the interesting half**, and
what they chose it for is consistent: `AttachDocumentTable` and `PatientList` are pickers inside a
dialog; `OnlinePresenceProviderListings`, `ReputationDetails` and `ReviewSurveyDetails` are small
bounded lists on a settings-like page; `Service` is a fixed set of service lines;
`AccessibleChartTable` is explicitly the accessible text equivalent of a chart. **None of them is a
paginated, filterable, server-backed dataset.**

Against that, every grid surface is one of: a worklist, a search result, a log, or a formulary
lookup — and the two largest carry 18 and 20+ columns with user-configurable visibility, which Table
has no mechanism for.

So the data supports a description — **grids where the dataset is unbounded, server-paginated or
column-configurable; tables where the set is small, bounded and often inside a dialog** — but that
description is contradicted by nothing only because 5 of 9 Table packages never had the choice. **A
rule cannot be distinguished from a dependency accident on this evidence.** Reported, not written.

---

## 13. Built, 2026-08-19

Page `DataGrid exemplars` (563:2), to the `Table exemplars` board convention. 600 nodes, 47 instances,
**0 components created, 0 authored fractional dimensions, 0 unbound paints, 0 detached instances.**
Kit unchanged at 103. Built against **Pro v6**, which is what the design system depends on and what
all six stories render.

One marker block and seven sections: default grid, grid against table, header, selection, density
(deliberately empty), states, toolbar and footer.

### The brief's locked comparison did not survive measurement

The build was specified as "52 authored against 53 consequential". **Table does not measure 53.** Its
body rows measure **52.24** for the first and **52.4906** for the rest, and its header measures
**59.4142**. The 53 in the Table pass is not reproducible against the live render.

What replaced it is sharper, not weaker. Table's head cell line height measures **27.4286px** — the
identical inflated number as the checkbox icon, and for the identical reason. MUI sets that line
height through `pxToRem`, which the theme inflates by 16/14. So:

| | Header | Body row | How the number arises |
|---|---|---|---|
| **DataGrid** | **56 exactly** | **52 exactly** | given as a number, and therefore immune to the inflation |
| **Table** | **59.4142** | **52.4906** | produced from padding and line height, and therefore inherits it |

**That is the real difference between the two components**, and it is a better finding than one
pixel of row height: one authors its geometry and is unaffected by a theme defect, the other computes
its geometry and carries the defect into its header. Both are drawn on the board at the whole numbers
each intends, per standing rule 8, with the computed values recorded in the caption.

**A second measured instance of `pxToRemInflation`.** §8 recorded the first, on the checkbox. This is
the second, and it is in geometry rather than an icon, which is a wider blast radius than the flag's
own wording suggests.

### Three kit gaps found while building

`CheckmarkFilledIcon`, `UnsortedIcon` and `LockIcon` all exist in
`packages/design-system/src/components/icons` and **none of the three is in the kit's 41**. The kit is
a subset of the code icon set, which was not previously recorded. Consequences on this board: the
processed status has an empty dashed slot instead of a filled checkmark, and the sort indicator has an
empty dashed slot instead of an arrow. Neither was substituted.

This also settles a question left open by the patient header proposal: **PH-5's missing padlock is a
kit gap, not a code gap.** `LockIcon.tsx` exists.

### Deliberately not built

**Density.** The three multipliers were never exercised by any story, so they stay unmeasured. Section
5 exists as a caption with no artefact, saying so, rather than authoring three numbers that would look
measured.

**A toolbar.** No library story has one. The written guidance puts whole-set controls above the grid
rather than inside it, and five product files build one anyway. Recorded in the caption, not drawn.

### Still not settled

**DG-1 remains inferred.** All six stories are v6 and none pins a column, so nothing on this board
observes whether the `pinnedColumns` slot is dead in v7. The marker says so on canvas. It needs a
running product build.

---

## 11. Defects, flagged and not fixed

| # | Where | What |
|---|---|---|
| **DG-1** | `DataGridOverrides.ts:39` | The `pinnedColumns` slot is a **v6-only class**. 10 of 25 product surfaces run v7, where it cannot apply. `StyledDataGrid` re-states the same intent locally in v7 class names, which is the corroborating evidence |
| **DG-2** | `DataGridOverrides.ts:15` | `action.selected` paints **unselected** odd rows under `.striped`, while selection uses `primary[200]`. The token is used against its name |
| **DG-3** | `DataGridOverrides.ts:36` | `columnHeaderTitle` sets `fontWeight: 700` as a raw number and sets **no font size**, where `TableOverrides` binds both to `typography.h5`. The grid header cannot move with the type ramp |
| **DG-4** | `DataGridOverrides.ts` | `.striped` is a **two-part contract** — the class **and** a `getRowClassName` returning `even`/`odd`. Neither half is exported, typed or documented outside a story |
| **DG-5** | product, 0 of 25 | `noResultsOverlay` exists, is free, and distinguishes "no data" from "filter matched nothing". Nobody uses it; the one custom overlay collapses both into "No results found." |
| **DG-6** | `documents-ui/DocumentRowActionsMenu.tsx` | Row actions use `MoreVertIcon` from `@mui/icons-material`, **not in the 41-icon kit catalogue**, when `Icon/EllipsisFilled` and `Icon/LinearEllipsis` both exist |
| **DG-7** | `documents-ui/StyledDataGrid.tsx` | Two raw hexes with **no palette entry**: `#fbf9f8` and `#e3e6e6`. Two more (`#f0eee8`, `#d6d6d6`) duplicate existing tokens |
| **DG-8** | `DataGridOverrides.ts:10` | **Measured.** `.minimal` draws its header rule in `grey[600]` `rgb(84,84,84)` `#545454`, a **body-text grey**, where every other rule in the file measures `rgb(214,214,214)` `#D6D6D6`. Roughly four times the contrast of any other border, confirmed side by side against the other two grounds |
| **DG-9** | product, 0 of 25 | `.minimal` is a maintained, story-documented, mdx-documented ground that **no product surface uses** |
| **DG-10** | library vs product | The canonical story's row-action mechanism (`GridActionsCellItem`, `type: "actions"`, `showInMenu`) has **zero** product uptake |

## 12. Disagreements, reported not resolved

| Question | One source | The other |
|---|---|---|
| Which version | design-system depends on **Pro v6**, all six stories are v6 | **10 of 25** product surfaces, and the newest ones, are **Premium v7** |
| Row height | library states none | product states five, none of them MUI's 52 |
| Row height, across components | **Table 53**, padding-driven, not authored | **DataGrid 52**, a prop default, authored as a number |
| Column menu | keep and empty it | delete it, 18 of 25 |
| Checkbox selection | 6 of 6 stories | 9 of 25 files |
| Row actions | `GridActionsCellItem` (library) | `MoreVertIcon` + `IconButton` (product) | 
| Row actions, across components | `LinearEllipsis` (Table set) | `MoreVertIcon` (grid product) |
| Where controls live | mdx: above the grid, not in a toolbar | 5 of 25 build a toolbar |
| Cell rule colour | `divider` | `grey[400]`, same `#D6D6D6`, different name |
| Grid vs Table | a description fits the data | 5 of 9 Table packages had no grid dependency, so the description may be an artefact of the dependency list |
