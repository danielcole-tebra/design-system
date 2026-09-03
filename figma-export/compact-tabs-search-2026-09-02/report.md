# Compact tabs — read-only search, 2026-09-02

Question: does a compact tab pattern (about 28 tall, bold 14 label, underline on the active cell) exist anywhere. Files read: library `YX2n4YLrEpBXNbcc73T6dw`, source `zVsuhYehoSLLq880qRBFkq` (NDE-2026, 18 pages), kit `ZPf0sJy83aPyrHjCVHomya` (12 pages), and the whole `C:\Code\web-app-v2` checkout. All Figma reads used `loadAsync` with `skipInvisibleInstanceChildren = false`. No writes, no schema record.

## 1. Library

### Tabs/Tab 201:13 (COMPONENT_SET, page Surfaces & navigation)

Properties: `Label#201:0` TEXT default "Tab 1"; `selected` = no | yes; `State` = Default | Hover. Four variants, all 90×48, HORIZONTAL p12/16/12/16 g0, centred both axes, AUTO/AUTO sizing. Label Akkurat LL Regular 16/20, HUG, letter spacing 0, textCase ORIGINAL; family, size, line height and weight all **unbound**; fill bound.

| Variant | id | Root fill | Label fill | Indicator |
|---|---|---|---|---|
| selected=no, State=Default | 201:3 | none | #545454 bound color/text/secondary | none |
| selected=no, State=Hover | 201:5 | #CBDDE0 bound color/action/hover | #545454 bound color/text/secondary | none |
| selected=yes, State=Default | 201:7 | none | #004852 bound color/primary/main | 90×2 rectangle, absolute at (0, 46), #004852 bound color/primary/main |
| selected=yes, State=Hover | 201:10 | #CBDDE0 bound color/action/hover | #004852 bound color/primary/main | as above |

### Tabs 201:14 (COMPONENT, single)

270×48, HORIZONTAL p0 g0, AUTO/AUTO, no fill, stroke weights read 1 on all sides but no stroke paint. Three children: Tab 1 201:15 and Tab 2 201:17 (selected=no, Default), Tab 3 201:19 (selected=yes, Default), each 90×48 at HUG. Description on the node says it mirrors `stories/Tabs/Tabs.stories.tsx` (three tabs, third selected), minHeight 48, and that TabsOverrides contributes nothing visible.

On-canvas instances: **none**. The only Tabs/Tab instances in the library are the three inside the Tabs master. Paints above are master reads.

### Other library components matching tab / segment / toggle / filter / switcher

| Component | id | Page | Variants | Axes | Rendered heights | Label |
|---|---|---|---|---|---|---|
| Button group/Segment | 160:996 | Actions | 54 | color primary/secondary; size small/medium/large; State Default/Hover/Disabled; Position First/Middle/Last | 30, 38, 42 | Akkurat LL Regular 14/20 (small), 16/24 (medium, instance 886:2102) |
| Toggle button | 202:95 | Inputs | 18 | size medium/small/large; selected no/yes; State Default/Hover/Disabled | 36, 48, 67 | icon only, no label |
| Tabs/Tab | 201:13 | Surfaces & navigation | 4 | above | 48 | Regular 16/20 |
| Tabs | 201:14 | Surfaces & navigation | 1 | | 48 | Regular 16/20 |
| Table/Cell, Table/Row, Table pagination | 190:21, 190:49, 191:85 | Data display | | | 52, 20 | name matches "tab" only as a substring of "table"; not tabs |

**Nothing in the library is at or near 28 tall with a bold 14 label.** The nearest by height is Button group/Segment size=small at 30 tall, Regular 14/20, white pill with a #B3C6C4 border: a bordered button group, not an underlined tab. Chip 156:171 was not in the name search; its small size renders 24 tall per earlier batches and is a pill, not a tab.

## 2. Kit (deprecated, evidence only)

Name search over 12 pages, excluding table/tablet names.

| Component | id | Variants | Heights | Label |
|---|---|---|---|---|
| Tab | 4470:14980 | 9 (Background False/True; State Active/Inactive/Focused/Hover-Click/Disabled) | 56 | Akkurat LL Regular 16/24 #004852 |
| Tab Set | 4476:14852 | 1 | 56 | Regular 16/24 #004852 |
| _tab template | 437:2302 | 1 | 56 | Regular 16/24 |
| _tab indicator | 2834:9549 | 1 | 2 | none |
| Toggle Button | 4103:11268 | 6 (Size Medium/Small; Exclusive; Multi) | 36, 48 | icon only |
| _toggle button template | 4101:10933 | 2 | 36, 48 | icon only |
| Chip - Input (Filter) | 4614:17435 | 4 (Hover; Error; Size Default/Small) | 24, 32 | Regular 14/18 #004852 |
| DataGrid/ActionBar/IconButtons/Filter | 22739:57885 | 12 | 36, 40 | Bold 12 badge |
| Side Sheet - Filters | 6681:120247 | 12 | 780 | title Bold 20/32 |
| filter (icon) | 5728:88973 | 1 | 24 | none |

**No compact tab in the kit.** The kit tab is 56 tall, Regular 16/24, taller than MUI's 48.

## 3. Source (NDE-2026, 18 pages, 64,848 container nodes scanned)

Two passes: (a) nodes named tab / tabs / tab set / segment / toggle / filter / switcher / selector; (b) a heuristic for hand-drawn rows: horizontal auto-layout, 2 to 8 cells each holding one short text, with one cell marked by a bottom stroke or a different fill. Nodes inside instances were skipped. The heuristic under-counts nested constructs (the Problems-Recent bar puts its stroke on an inner wrapper and was found by the earlier batch, not by the heuristic) and over-counts label/link pairs. Groups below are the tab-like ones; false positives are listed at the end.

### Compact underline tabs: 28 tall, Akkurat LL Bold 14/200% (= 28), #9A9A9A inactive, #004852 active, 2px #417E86 underline — hand-drawn

| Where | Node | Size | Cells | Instance? |
|---|---|---|---|---|
| NeuNeu › Sidesheetv3 | 4946:17270 "Tabs" | 518×28, H g4 | Demographics (active) / Additional Info / Contact Info / Care Team | hand-drawn FRAME |
| NeuNeu › Sidesheetv3 | 5034:19792 "Tabs" | 518×28 | same, Contact Info active | hand-drawn |
| NeuNeu › Sidesheetv3 | 5034:19806 "Tabs" | 518×28 | same, Additional Info active | hand-drawn |
| NeuNeu › Sidesheetv3 | 5034:19860 "Tabs" | 518×28 | same family | hand-drawn |
| ⚙️ Components › Sidesheetv3 › Page=Clin_Problems-Recent | 4618:4975 / 4618:4976 | 518×28 bar with 1px #D6D6D6 bottom rule; cells 34/63/78×28, inner V p0/8 | All / Recent (active) / Favorites | hand-drawn |
| ⚙️ Components › Sidesheetv3 › Page=Clin_Problems-Favorites | 4618:5182 | as above, Favorites active | | hand-drawn |
| ⚙️ Components › Sidesheetv3 › Page=Clin_ExternalCare-Hospitalizations | 129:8364 "Tabs" (and hidden 129:8354) | 40-tall wrapper H p4/0/8/0 g8 holding a 518×28 row with 1px #D6D6D6 rule | Hospitalizations (active) / Facility Stay | hand-drawn |
| ⚙️ Components › Sidesheetv3 › Page=Clin_ExternalCare-HEdit | 129:8439 "Tabs" | as 129:8364 | | hand-drawn |

Count: **9 visible constructs plus 1 hidden**, all inside Sidesheetv3 frames, all hand-drawn frames, none an instance of anything. Screenshots: `src-tabs-4946-17270.png`, `src-tabs-5034-19792.png`, `src-tabs-129-8364.png`, `src-tabs-4618-4975.png`. Looked at: bold labels, teal active label with a 2px teal-grey underline sitting on a hairline rule.

### Other tab-like groups in the source

| Pattern | Height | Label | Count | Examples | Instance? |
|---|---|---|---|---|---|
| Segmented pill strip "Tabs" › "Frame 758531765": grey #ECECEC r24 track, white r16 active cell | 52 wrapper / 36 strip / 28 cells | Bold 14/20 #545454 | 41 wrappers (hidden scaffold in Sidesheetv3) + 43 strips | 4841:21508 (H), 4841:21509, 129:6682 | hand-drawn |
| "Selector" › "BgWrap": #F0F0F0 r24 track | 44 | Regular 14/20 #000000 | 41 | 4841:21497, 129:6670, 129:7017 | hand-drawn (hidden scaffold family) |
| Kit Tab Set instances (Conditions / Procedures / …) | 56 | Regular 16/24 | 54, mostly hidden | 4841:21496 (H), 129:6669 (H) | INSTANCE → kit Tab Set 6b8f024e |
| DSR Tabs/Tab instances on NeuNeu screens | 48 | Regular 14/20 #545454 (43) and Regular 16/20 (18) | 61 | 4803:1385, 4775:11176 | INSTANCE → Tabs/Tab main 4775:11144, key b5fadfbc = **Design System Rebuild**, axis names "Selected=No, State=Default" (pre-migration publish) |
| "Tabs" frames wrapping those instances | 48 | | 17 | 4803:1383 (1090×48, white, 1px #D6D6D6 rule), 4775:11175 | hand-drawn wrapper |
| Hand-drawn "Tab 1/2/3" cells | 36 | Regular 14/20 #004852, 2px #004852 bar | 12 | 4803:1048, 4803:1051 | hand-drawn |
| "Segmented Button" | 36 | Regular 16/24 #004852, #F0EEE8 active, #8CA7A2 border | 1 | 874:2344 | hand-drawn |
| Folder Navigation "Tabs": beige #F6F3EB active card vs white | 40 | Bold 14/20 / Regular 14/20 #000000 | 1 | 10:2555 | hand-drawn (browser-style tabs) |
| "Toggle" / "Toggle Button" frames | 40 / 48 | Bold 14/24, Bold 16/20–24 | 3 + 4 | 4291:14922 (H), 129:7382 | hand-drawn |
| "Modules Filter" | 36–48 | Regular 14/18, Bold 12/18 | 1 set 632:3504 + 17 instances + 17 frames | 1681:20443 | local COMPONENT_SET + instances |
| Chip - Input (Filter) hand copies | 28, 32 | Bold 14/20 | 6 | 129:7512 (28×83 pill, r20), 4779:13211 | hand-drawn detached chips, not tabs |

Heuristic false positives, not tabs: 79 title rows Bold 20/32 (112:5658 …), 82 rows Bold 14/18 (112:5897 …), 48 "TollbarWrap" Bold 14/24, 17 Bold 18/24 rows, 7 "Frame 758532129" Bold 14/18 (a "Refill request / Refill now" label-and-link row, screenshot `src-row-4778-11716.png`), and the assorted single-count rows.

Source verdict: the 28-tall bold-14 underline tab exists **only as hand-drawn frames**, in nine visible places, all inside Sidesheetv3 frames on two pages. Everywhere else the source uses either the kit's 56-tall tab, the library's 48-tall Tabs/Tab (from an older publish with 14/20 labels), a 36-tall hand-drawn tab, or a segmented pill strip.

## 4. Code (web-app-v2, node_modules and .yarn excluded)

61 files match Tabs, MuiTabs, TabsOverrides, ToggleButton or ButtonGroup.

Design system:

- `packages/design-system/src/overrides/TabsOverrides.tsx`: the whole file is `MuiTabs.defaultProps.indicatorColor = "primary"`. No styleOverrides, no height, no font.
- `packages/design-system/src/overrides/ToggleButtonOverrides.ts`: colour and border only (grey[600] text, grey[400] border, selected = text.primary on action.selected). No height.
- `packages/design-system/src/overrides/ButtonGroupOverrides.ts`: defaultProps contained/secondary; border colours per position; no height.
- `packages/design-system/src/typography/typography.ts`: no tab entry; h4 = 1rem / 700 / 1.5rem; h5 = 0.875rem.
- `packages/design-system/src/stories/Tabs/Tabs.stories.tsx`: three plain `<Tab label=… />`, no sx.

Product usages of `<Tabs>` (all plain MUI Tabs unless noted): accounts-receivable-ui Dashboard.tsx:143; admin-ui MessageRoutingLayout.tsx:58; appointment-workflow-ui AppointmentCardV2.tsx:197, OfficeHoursList.tsx:32, SchedulesList.tsx:32, SchedulingResources.tsx:157, DashboardV2.tsx:90; ar-dashboard-ui MainContent.tsx:18; documents-ui MergeIssues.tsx:152; facesheet-ui RecommendationsModal.tsx:405; medications-ui ErxRequestsTabs.tsx:57; payment-subscription-ui SubscriptionManagementPage.tsx:143.

Every `.MuiTab` selector in the repo, with the lines:

```
packages/medications-ui/src/components/ErxRequests/ErxRequestsTabs.tsx:63-68
  sx={{ minHeight: 50, "& .MuiTab-root": { minHeight: 50, py: 0 } }}
packages/admin-ui/src/components/MessageRouting/MessageRoutingLayout.tsx:61-68
  sx={{ borderBottom: 1, borderColor: "divider", mt: 2,
        "& .MuiTab-root:hover": { borderTopLeftRadius: 4, borderTopRightRadius: 4 } }}
packages/payment-subscription-ui/src/pages/SubscriptionManagement/SubscriptionManagementPage.tsx:150-156
  sx={{ borderBottom: 1, borderColor: "divider",
        "& .MuiTab-root": { minWidth: 180, paddingX: 3 } }}
```

The only height override on a tab anywhere is ErxRequestsTabs at **50px, taller** than the 48 default (to fit a count Chip as the end icon). SubscriptionManagementPage's `fontSize 0.875rem / fontWeight 700 / height 24` block (lines 57-60) styles a count badge inside a custom TabLabel, not the tab. ToggleButtonGroup and ButtonGroup usages (IntakeFormEditor, UserTypeToggle, DataGridSettings, MessageChannelToggle, EditorToolbar, calendar view switchers, ZoomButtonGroup, EditorRibbon, SplitButton) are bordered button groups, not underlined tabs; none sets a tab height.

**No product screen renders tabs shorter than MUI's 48px default.** No `minHeight` below 48, no `size` prop, no theme-level Tab override exists.

## 5. Verdict (evidence)

- **Code:** no compact tab. Tabs are MUI defaults at 48 with Regular 16 labels (typography.button is capitalised, not bold); one screen raises them to 50. Segmented controls are ButtonGroup / ToggleButtonGroup at button heights.
- **Library:** no compact tab. Tabs/Tab is 48 tall, Regular 16/20, matching code. Nearest by height is Button group/Segment small at 30, a bordered pill.
- **Kit:** no compact tab. Kit Tab is 56 tall, Regular 16/24.
- **Source:** the 28-tall Bold 14 underline tab exists in nine visible hand-drawn frames (plus one hidden), all inside Sidesheetv3 on the ⚙️ Components and NeuNeu pages, none an instance of any component. Elsewhere the same file uses the library's 48-tall Tabs/Tab (61 instances, older publish) and the kit's 56-tall Tab Set.

The compact tab pattern exists **in the source only, hand-drawn**. Nothing in code, the library or the kit renders it.

## Files

- `C:\Code\design system\figma-export\compact-tabs-search-2026-09-02\src-tabs-4946-17270.png` (518×28)
- `…\src-tabs-5034-19792.png` (518×28)
- `…\src-tabs-129-8364.png` (518×40)
- `…\src-tabs-4618-4975.png` (518×28, copied from the Problems-Recent batch)
- `…\src-tabs-10-2555.png` (361×40, Folder Navigation browser-style tabs, not compact)
- `…\src-row-4778-11716.png` (472×28, heuristic false positive)
- 129:7512 is hidden and rendered 1×1; not saved.
