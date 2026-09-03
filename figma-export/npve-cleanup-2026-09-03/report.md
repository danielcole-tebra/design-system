# Cleanup — neutral row master, tab underline, change logs — 2026-09-03

Batch `npveRebuild_cleanup_2026-09-03`. Target `fdCQVFdvOByaOYIJYag0d6`: Problems picker body 26:221 on Templates; row 1 of 27:6, change logs 27:222 and 40:454, and a new marker on Screens. Library and repo read only; imports by key in-script. Sidesheet template untouched; Main not built. Record written by `apply-npve-cleanup.js` after backup `design-system-schema.backup-2026-09-03-pre-npve-cleanup.json`. Flags now 185 (1 added, 1 resolved).

## Step 1. Where the rule under a tab strip comes from

- **MUI Tabs draws none.** `@mui/material` 5.14.11 `Tabs/Tabs.js` styles the root with `minHeight: 48` and the indicator with `height: 2`; no border rule.
- **The theme adds none.** `packages/design-system/src/overrides/TabsOverrides.tsx` contains only `MuiTabs.defaultProps.indicatorColor = "primary"`.
- **Per-screen styling draws it**, in three of fifteen usages:
  - `admin-ui/src/components/MessageRouting/MessageRoutingLayout.tsx:58-63` — `<Tabs sx={{ borderBottom: 1, borderColor: "divider", … }}>`
  - `payment-subscription-ui/src/pages/SubscriptionManagement/SubscriptionManagementPage.tsx:143-152` — the same `borderBottom: 1, borderColor: "divider"` on Tabs
  - `ordering-system/src/components/Monograph/MonographSections/MonographTabs.tsx:45-46` — wrapper `<Box borderBottom="1px solid" borderColor="core.light">` around `<Tabs>`
- The other twelve usages (Dashboard, AppointmentCardV2, OfficeHoursList, SchedulesList, SchedulingResources, DashboardV2, MainContent, Tabs.stories, RecommendationsModal, ErxRequestsTabs, IcdBrowserDialog, AiSentimentAnalysisDialog, RevenueDashboardPage) carry no rule. The Dividers in Dashboard.tsx:111, AppointmentCardV2.tsx:242 and 288, SchedulingResources.tsx:197 and IcdBrowserDialog.tsx:157 are not adjacent to the Tabs.
- **Library Tabs 201:14**: 0 strokes, 0 effects, 0 fills, three Tab instances 90×48; Tabs/Tab variants 0 strokes, selected=yes carries the 90×2 indicator at y 46 bound color/primary/main. No bottom rule of its own.

Verdict: the rule is per-screen styling (the MUI docs pattern), not a Tabs feature. The library request is a documented tabs-on-divider pattern, not a Tabs variant. The verbatim change log rows say "MUI draws this"; the marker carries the precise wording.

## Step 2. Neutral row master

Master 26:221 › row 26:261 trailing action: `resetOverrides()`, nested Icon confirmed Icon/PlusOutlined, glyph #545454 bound color/grey/600. All four master rows read PlusOutlined / grey/600. On 27:6 only, row I27:6;6:80;26:261 trailing action swapped to Icon/CheckCircle (MUI) 200:41 with the glyph bound color/success/dark #2B865A; rows 2 to 4 unchanged. Favorites row 1 reads PlusOutlined / grey/600. Marker 27:306 still says "Marks the first Problem row trailing action" and that node exists with the selection as an instance override. References: Problem row 6, body 48, unchanged. Flag `npveFavorites_row1OverridesInBodyMaster` resolved.

## Step 3. Regression check

`step3-screen-27-6.png` and `step3-screen-40-252.png` diffed against `npve-body-padding-search-2026-09-02/step10-screen-*.png`: **both identical**, diff bounding box None, 0 differing pixels, 550×600. Proceeded.

## Step 4. Tab underline

**Structure used: wrapper.** The body's 16 gap would have put a sibling Divider 16px under the strip, so a new frame `Tabs strip` (VERTICAL, gap 0 bound space/0, padding 0, no fill, FILL width, HUG height) was inserted at the tabs position in 26:221; the three Tabs instances moved into it, followed by `Tab underline` = Divider orientation=horizontal (key 0143de7b…) at FILL width, 518×1, fill #D6D6D6 bound color/divider. Strip 49 tall. Indicator bottom and divider top share the same y: touching, as MUI's indicator at the bottom of the 48 box sits on the border below. Body 518×385 (was 384). The three visibility references (Active All/Recent/Favorites) survived the move; body 48 references, 4 definitions.

## Step 5. Render

`step5-screen-27-6.png`, `step5-screen-40-252.png`, looked at: a full-width hairline under the tab strip on both, with the teal indicator sitting on it; Recent active on 27:6, Favorites on 40:252. Reads: strip 49, divider 518×1 color/divider, indicator bottom = divider top on both screens.

Diff against step 3 (27:6): differing rows 177 to 439 only. Row 177 is the new divider (#D6D6D6 across x 16 to 534, white before). Rows 178 to 439 are the section title and rows shifted down by exactly 1px: comparing step 3 rows 178 to 439 with step 5 rows 179 to 440 leaves one anti-aliasing pixel (channel delta 16). Rows 0 to 176 and 440 to 599 identical. 40:252 the same pattern. The only visible change is the rule; the 1px shift of the content below is what a borderBottom on MUI Tabs also produces.

## Step 6. Change log rows

- 27:222, appended 52:410: Tab underline | Full-width line under the tabs → restored | MUI draws this. Library tabs are missing it. Marked (12 rows now)
- 40:454, appended 52:416 and 52:422: the same Tab underline row, and Footer | Two buttons in the source → Cancel kept | Deliberate. A panel you can't back out of is worse design (12 rows now)

Both comparisons re-shot with the updated logs: `step6-comparison-36-258.png` (1708×1033), `step6-comparison-40-534.png` (1708×1133), looked at.

## Step 7. DEFECT marker 52:428

"DEFECT marker — Tabs bottom rule" at (-450, 860) under the three existing markers, 400×560, per the convention (bound grey/300, grey/500, grey/400, grey/900, grey/600, text/primary; caption and body1 tokens). Example: a Tabs 201:14 instance as published. Fix line: a documented tabs-on-divider pattern (Tabs over a full-width Divider, gap 0), not a Tabs variant, since MUI Tabs draws no rule and TabsOverrides adds none. Difference line cites MessageRoutingLayout.tsx:62-63, SubscriptionManagementPage.tsx:151-152, MonographTabs.tsx:45 and source 4618:4975. Screenshot `step7-defect-marker-tabs-rule-52-428.png`. Chip letter spacing 0.5 unbound as before.

## Step 8. All ten rules

Rule 1 PASS (strip and divider read identically on both screens; row 1 trailing as intended on each). Rule 2: Templates 174 visible solid paints, 0 unbound, 1 image; Screens 226, 0 unbound, 2 images; Cover unchanged. Rule 3 PASS (Sidesheet 18, row 6, body 48 references; body definitions intact). Rules 4, 6, 7 observed. Rule 5 PASS. Rule 8 PASS (0 fractional). Rule 9 PASS (bound alpha only on the Text field outline). Rule 10 not applicable.

## Flags

Added `npveCleanup_tabsNoBottomRule` DEFECT (medium). Resolved `npveFavorites_row1OverridesInBodyMaster`.

## Files

- `C:\Code\design system\figma-export\npve-cleanup-2026-09-03\` (7 PNGs, this report)
- `C:\Code\design system\apply-npve-cleanup.js`
- `C:\Code\design system\design-system-schema.backup-2026-09-03-pre-npve-cleanup.json`
