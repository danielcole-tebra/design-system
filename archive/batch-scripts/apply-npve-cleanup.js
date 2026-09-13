// apply-npve-cleanup.js — records batch npveRebuild_cleanup_2026-09-03. Backup first. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-03-pre-npve-cleanup.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s.npveRebuild_cleanup_2026_09_03) throw new Error('batch entry already exists');
const DIR = 'figma-export/npve-cleanup-2026-09-03/';
const BATCH = 'npveRebuild_cleanup_2026-09-03';

s.npveRebuild_cleanup_2026_09_03 = {
  _status: 'DONE through step 8. Row master neutral, selection moved to the Recent screen instance; tab underline restored via a Tabs strip wrapper with a Divider; change logs appended; DEFECT marker for the missing Tabs rule placed. Sidesheet template untouched; Main not built.',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6: Templates 3:2 (Problems picker body 26:221) and Screens 27:2 (27:6 row 1, change logs 27:222 and 40:454, marker 52:428)',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only (Divider, Tabs, Icon/CheckCircle (MUI), Icon/PlusOutlined and variables imported by key in-script)',
  _repo: 'C:/Code/web-app-v2 read only',
  date: '2026-09-03',
  step1_finding: {
    muiTabs: '@mui/material 5.14.11 Tabs.js: root minHeight 48, TabsIndicator height 2; no border rule. MUI Tabs draws no line under the strip by itself.',
    theme: 'packages/design-system/src/overrides/TabsOverrides.tsx: only MuiTabs.defaultProps.indicatorColor = "primary". Nothing else.',
    product: [
      'admin-ui/src/components/MessageRouting/MessageRoutingLayout.tsx:58-63 — <Tabs sx={{ borderBottom: 1, borderColor: "divider", … }}> (rule on the Tabs element itself, per screen)',
      'payment-subscription-ui/src/pages/SubscriptionManagement/SubscriptionManagementPage.tsx:143-152 — <Tabs sx={{ borderBottom: 1, borderColor: "divider", … }}>',
      'ordering-system/src/components/Monograph/MonographSections/MonographTabs.tsx:45-46 — wrapper <Box borderBottom="1px solid" borderColor="core.light"> around <Tabs>',
      'Twelve other <Tabs> usages carry no rule (Dashboard, AppointmentCardV2, OfficeHoursList, SchedulesList, SchedulingResources, DashboardV2, MainContent, Tabs.stories, RecommendationsModal, ErxRequestsTabs, IcdBrowserDialog, AiSentimentAnalysisDialog, RevenueDashboardPage). The <Divider> elements in Dashboard.tsx:111, AppointmentCardV2.tsx:242/288, SchedulingResources.tsx:197 and IcdBrowserDialog.tsx:157 are not adjacent to the Tabs.'
    ],
    verdict: 'The rule comes from PER-SCREEN STYLING, never from the Tabs component or the theme: two screens put borderBottom on Tabs (the MUI docs pattern) and one wraps Tabs in a bordered Box. The library request is therefore a documented tabs-on-divider pattern, not a Tabs variant.',
    libraryTabs: 'Tabs 201:14 master: 0 strokes, 0 effects, 0 fills, three Tab instances 90x48; description says substrate root with no background. Tabs/Tab variants: 0 strokes; selected=yes carries Indicator 90x2 at y 46 bound color/primary/main. No bottom rule anywhere.'
  },
  step2_neutralRowMaster: {
    master: 'Problems picker body 26:221 › row 26:261 Trailing action: resetOverrides(), nested Icon confirmed Icon/PlusOutlined, glyph #545454 bound color/grey/600. All four master rows now read Icon/PlusOutlined color/grey/600.',
    screen27_6: 'Row I27:6;6:80;26:261 Trailing action: nested Icon swapped to Icon/CheckCircle (MUI) 200:41 (key 63efc309…), glyph fill bound color/success/dark #2B865A. Rows 2-4 unchanged (PlusOutlined, grey/600).',
    favorites40_252: 'Unaffected: row 1 reads Icon/PlusOutlined color/grey/600.',
    marker27_306: 'Difference line still says "Marks the first Problem row trailing action"; the node I27:6;6:80;26:261 exists and now carries the selection as an instance override. Unchanged.',
    references: 'Problem row 6, Problems picker body 48 after the edit (unchanged).',
    flag: 'npveFavorites_row1OverridesInBodyMaster resolved.'
  },
  step3_regression: { method: 'Screenshots 27:6 and 40:252 at 1x, PIL ImageChops.difference against npve-body-padding-search-2026-09-02/step10-screen-27-6.png and step10-screen-40-252.png.', result: 'BOTH IDENTICAL: diff bounding box None, 0 differing pixels, 550x600 each. Proceeded.', screenshots: [DIR + 'step3-screen-27-6.png', DIR + 'step3-screen-40-252.png'] },
  step4_tabUnderline: {
    structure: 'WRAPPER USED. The body gap of 16 would have put a sibling Divider 16px below the strip, so a new frame "Tabs strip" (VERTICAL, gap 0 bound space/0, padding 0, no fill, FILL width, HUG height) was inserted at the tabs position in 26:221 and the three Tabs instances (Filter tabs — All active, Filter tabs, Filter tabs — Favorites active) moved into it, followed by "Tab underline" = Divider orientation=horizontal instance (key 0143de7b…) at FILL width 518x1, fill #D6D6D6 bound color/divider.',
    geometry: 'Strip 49 tall = 48 tabs + 1 divider. Indicator bottom and divider top share the same y (touching, as MUI: the 2px indicator sits at the bottom of the 48 box and the 1px border below it). Body 518x385 (was 384). Body children now: Search field 40, Tabs strip 49, Section title 24, Rows 224.',
    references: 'Visibility references on the three Tabs instances survived the move (Active All#39:2, Active Recent#39:3, Active Favorites#39:4); body 48 references, 4 definitions.'
  },
  step5_render: {
    screenshots: [DIR + 'step5-screen-27-6.png', DIR + 'step5-screen-40-252.png'],
    lookedAt: 'Yes. Both screens show a full-width hairline under the tab strip with the teal indicator sitting on it; Recent active on 27:6, Favorites on 40:252.',
    diffVsStep3: 'PIL diff of step5 vs step3 on 27:6: differing rows 177-439 only (6733 px). Row 177 is the new divider (#D6D6D6 across x 16-534, white before). Rows 178-439 are the section title and rows shifted down by exactly 1px: comparing step3 rows 178-439 with step5 rows 179-440 leaves 1 pixel differing (max channel delta 16, anti-aliasing). Rows 0-176 and 440-599 identical (header, search field, tabs, footer). 40:252 the same (6088 px, rows 177-439). The only visible change is the rule; the 1px flow shift is what a borderBottom on MUI Tabs does to the content below it.',
    reads: { '27:6': 'strip 49, divider 518x1 color/divider, indicator bottom = divider top (y 237), active Recent, body content 385', '40:252': 'strip 49, divider 518x1 color/divider, indicator bottom = divider top (y 1237), active Favorites, body content 385' }
  },
  step6_changeLogs: { '27:222': { rows: 12, appended: { '52:410': 'Tab underline | Full-width line under the tabs → restored | MUI draws this. Library tabs are missing it. Marked' } }, '40:454': { rows: 12, appended: { '52:416': 'Tab underline | Full-width line under the tabs → restored | MUI draws this. Library tabs are missing it. Marked', '52:422': 'Footer | Two buttons in the source → Cancel kept | Deliberate. A panel you can\'t back out of is worse design' } }, note: 'Row text verbatim from the prompt. Step 1 shows the rule is per-screen sx / wrapper styling rather than MUI Tabs itself; the marker carries the precise wording.', screenshots: [DIR + 'step6-comparison-36-258.png', DIR + 'step6-comparison-40-534.png'] },
  step7_marker: { id: '52:428', name: 'DEFECT marker — Tabs bottom rule', at: '(-450, 860) under the three existing markers', size: '400x560', example: 'Tabs 201:14 instance as published (All / Recent selected / Favorites), no rule', fix: 'Fix lives in the library: a documented tabs-on-divider pattern (Tabs over a full-width Divider, gap 0), not a Tabs variant — MUI Tabs draws no rule and TabsOverrides.tsx adds none; the product adds it per screen.', difference: 'Cites MessageRoutingLayout.tsx:62-63, SubscriptionManagementPage.tsx:151-152, MonographTabs.tsx:45 and source 4618:4975; marks the Tabs strip in both screens.', convention: 'defectMarkerConvention2026_08_28 paints bound (grey/300, grey/500, grey/400, grey/900, grey/600, text/primary; caption and body1 tokens). Chip letterSpacing 0.5 unbound as before.', screenshot: DIR + 'step7-defect-marker-tabs-rule-52-428.png' },
  step8_rules: {
    '1_instancePaintVerification': 'PASS. Tabs strip and Tab underline read identically on 27:6 and 40:252: divider 518x1 #D6D6D6 color/divider; indicator bottom equals divider top on both; row 1 trailing reads CheckCircle color/success/dark on 27:6 and PlusOutlined color/grey/600 on 40:252 and on the master.',
    '2_unboundPaintAudit': 'Templates: 18 top-level nodes, 174 visible solid paints, 0 unbound, 1 image. Screens: 6 top-level nodes, 226 visible solid paints, 0 unbound, 2 images. Cover unchanged (pre-existing flag).',
    '3_referenceCounts': 'PASS. Sidesheet 18, Problem row 6, Problems picker body 48 references; body definitions Section title, Active All, Active Recent, Active Favorites intact after the strip move.',
    '4_skipInvisibleFalse': 'Set on every script.',
    '5_opacityLast': 'PASS. 0 unbound paints below opacity 1.',
    '6_enumerateDontRecall': 'Walked every top-level node from the file on both pages.',
    '7_fileIdentityFirst': 'Keys passed explicitly; target pages read Cover 0:1, Templates 3:2, Screens 27:2.',
    '8_roundWithRecord': 'PASS. 0 fractional geometry on non-vector nodes.',
    '9_boundPaintAlpha': 'PASS. Bound alpha only on the Text field outline parts (0.23); untouched.',
    '10_cloneDropsPropertyRefs': 'Not applicable; references re-verified after each edit.'
  },
  screenshots: ['step3-screen-27-6.png', 'step3-screen-40-252.png', 'step5-screen-27-6.png', 'step5-screen-40-252.png', 'step6-comparison-36-258.png', 'step6-comparison-40-534.png', 'step7-defect-marker-tabs-rule-52-428.png'].map(f => DIR + f)
};
const f = s.flags.find(x => x.id === 'npveFavorites_row1OverridesInBodyMaster'); if (f) { f.superseded = 'RESOLVED 2026-09-03 by npveRebuild_cleanup: master row 1 reset to PlusOutlined / color/grey/600; the selection lives on the Recent screen instance 27:6 only.'; f.handling = 'Resolved; kept for the record.'; }
s.flags.push(
  { id: 'npveCleanup_tabsNoBottomRule', severity: 'medium', kind: 'DEFECT', discoveredDuring: BATCH, summary: 'Library Tabs 201:14 renders no rule under the strip. MUI Tabs draws none either; the product adds a 1px divider per screen (borderBottom on Tabs in MessageRoutingLayout.tsx and SubscriptionManagementPage.tsx, a bordered wrapper in MonographTabs.tsx). The rebuild restores it with a Tabs strip wrapper and a Divider instance.', where: 'YX2n4YLrEpBXNbcc73T6dw Tabs 201:14; target 26:221 › Tabs strip; marker 52:428 on Screens', detail: 'Library ask: a documented tabs-on-divider pattern (Tabs over a full-width Divider, gap 0), not a Tabs variant. The change log rows say "MUI draws this" per the prompt; the precise finding is that per-screen styling draws it.', webAppV2BugListCandidate: false, handling: 'Marked DEFECT on Screens; fix lives in the library.' }
);
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote npveRebuild_cleanup_2026_09_03; flags', s.flags.length);
