// apply-npve-tab-underline-fix.js — records batch npveRebuild_tabUnderlineFix_2026-09-03 and amends the cleanup record. Backup first. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-03-pre-tab-underline-fix.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s.npveRebuild_tabUnderlineFix_2026_09_03) throw new Error('batch entry already exists');
const DIR = 'figma-export/npve-tab-underline-fix-2026-09-03/';
const BATCH = 'npveRebuild_tabUnderlineFix_2026-09-03';

s.npveRebuild_tabUnderlineFix_2026_09_03 = {
  _status: 'DONE through step 6. Correction to npveRebuild_cleanup_2026-09-03 step 4: the divider stacked after the tabs; it now overlaps them by 1px so its row falls inside the indicator. Library briefing written to figma-export/library-todos/LIBRARY-TODOS.md.',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6: Templates 3:2 (Problems picker body 26:221 > Tabs strip 51:307 > Tab underline 51:308). Screens read only; 27:6 and 40:252 update through the body instance.',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only (variable collections enumerated for the briefing)',
  _repo: 'C:/Code/web-app-v2 read only',
  date: '2026-09-03',
  trigger: "Daniel's screenshot of the file shows the divider about 2px below the indicator. The cleanup report claimed the indicator and divider shared a pixel row.",
  step1_measurements: {
    method: 'absoluteBoundingBox reads on 27:6 and 40:252 with skipInvisibleInstanceChildren = false, before any edit; 1x screenshot pixel rows read with PIL.',
    '27:6_before': { tabsInstance: 'Filter tabs 630,189 282x48, bottom 237', indicator: 'I27:6;6:80;26:244;201:17;201:9 y 235 to 237 (2 tall), #004852 bound color/primary/main', divider: 'I27:6;6:80;51:308 y 237 to 238 (1 tall), #D6D6D6 bound color/divider', strip: 'I27:6;6:80;51:307 y 189 to 238, 49 tall', body: '518x385' },
    '40:252_before': { tabsInstance: 'Filter tabs - Favorites active 630,1189 282x48, bottom 1237', indicator: 'y 1235 to 1237', divider: 'y 1237 to 1238', strip: '49 tall' },
    pixels1x: 'step1-before-screen-27-6.png rows 175 and 176 teal (0,72,82) under the active tab, row 177 grey (214,214,214) full width, row 178 white. Same on 40:252. Identical to cleanup step5 (diff bbox None).',
    verdict: "The cleanup claim was WRONG as worded: the indicator bottom and the divider top shared a y coordinate (237), which is stacking, not sharing a pixel row. The divider occupied its own row below the indicator. At 1x there is no white seam between them; the 2px gap in Daniel's screenshot could not be reproduced at 1x and its zoom is unknown."
  },
  step2_target: {
    mui: "@mui/material 5.14.11 Tabs: indicator height 2, position absolute, bottom 0 of a 48 root. Target set by the prompt: the divider's 1px row falls inside the indicator's 2px rows so the teal covers it where active.",
    cssNote: "FINDING, not reconciled: in CSS an absolutely positioned child with bottom:0 sits at the bottom of the padding box, above a border-bottom, so MUI's own render with borderBottom on Tabs or on a wrapping Box is touching (indicator rows above, border row below). The overlap built here is a design decision from the prompt, recorded as flag npveTabUnderline_overlapIsDecisionNotCss."
  },
  step3_fix: {
    mechanism: 'ABSOLUTE POSITIONING. Tab underline 51:308 in Tabs strip 51:307: layoutSizingHorizontal FIXED, layoutPositioning ABSOLUTE, constraints horizontal STRETCH / vertical MAX, resized 518x1, x 0, y 47, moved to child index 0 so the tabs draw over it. The strip keeps its gap bound to space/0 (a negative gap would have needed an unbound literal). No fractional positions.',
    geometry: 'Strip HUG now 48 (was 49): tabs rows 0 to 48, indicator rows 46 to 48, divider row 47 to 48. Body 518x384 (was 385); Section title and Rows move up 1px, back to their pre-underline positions.',
    masterReads: 'indicator abs y 1802 to 1804, divider abs y 1803 to 1804, strip 1756 to 1804. Divider fill still #D6D6D6 bound color/divider opacity 1.',
    references: 'Body 48 references, 4 definitions (Section title, Active All, Active Recent, Active Favorites); the three Tabs visibility references intact; Tab underline carries none.'
  },
  step4_render: {
    '27:6_after': 'strip 189 to 237 (48), tabs bottom 237, indicator 235 to 237, divider 236 to 237 ABSOLUTE STRETCH/MAX, divider child index 0, body 630,133 518x384',
    '40:252_after': 'strip 1189 to 1237 (48), indicator 1235 to 1237 (102 wide, Favorites), divider 1236 to 1237, body 518x384',
    pixels1x: 'step4-screen-27-6.png: row 175 teal 90 px + white 428; row 176 teal 90 px + grey 428, 0 other; row 177 white 518. Grey line continuous across x 16 to 533 with the teal sitting in the same row, no light seam. 40:252: row 176 teal 102 + grey 416.',
    crops: [DIR + 'step4-crop-strip-27-6.png', DIR + 'step4-crop-strip-27-6-3x.png', DIR + 'step4-crop-strip-40-252.png', DIR + 'step4-crop-strip-40-252-3x.png'],
    lookedAt: 'Yes, both 3x crops.'
  },
  step5_diff: {
    vsCleanupStep5: '27:6 diff bbox (16,176,534,440): row 176 changes from white/teal to grey/teal; rows 177 to 439 are the content shifted up 1px (cleanup rows 178 to 440 vs new rows 177 to 439 leave 1 anti-aliasing pixel at 203,202). 40:252 the same pattern (100 differing rows).',
    vsCleanupStep3: '27:6 diff against the pre-underline screenshot: bbox (16,176,534,177), 428 px = exactly the grey row outside the 90px indicator. 40:252: 416 px = the grey row outside the 102px indicator. Nothing else on either screen differs from the pre-underline state.',
    comparisons: 'step5-comparison-36-258.png (1708x1033) and step5-comparison-40-534.png (1708x1133) re-shot at 1x; the cleanup step6 shots were 1024 wide so no pixel diff was run.',
    rules: {
      '1_instancePaintVerification': 'PASS. Divider #D6D6D6 bound color/divider opacity 1 and indicator #004852 bound color/primary/main read on both screen instances, not on the master.',
      '2_unboundPaintAudit': 'Templates: 18 top-level, 457 nodes, 174 visible solid paints, 0 unbound, 1 image. Screens: 6 top-level, 479 nodes, 226 visible solid paints, 0 unbound, 2 images. Unchanged from cleanup.',
      '5_opacityLast': 'PASS. 0 unbound paints below opacity 1 on either page.',
      '8_roundWithRecord': "PASS for this batch's nodes (divider 0,47 518x1; strip 518x48). Pre-existing: the library Icon button glyph Group 573:3583 measures 19.125 tall inside every Problem row (5 on Templates, 4 on Screens); not touched, library-side.",
      '9_boundPaintAlpha': 'PASS. Bound alpha only on the Text field outline parts at 0.23 (12 on Templates, 8 on Screens); untouched.'
    }
  },
  step6_libraryBriefing: { path: 'figma-export/library-todos/LIBRARY-TODOS.md', note: 'One page listing every open NPVE library item with the wrong, the fix, and evidence paths. Input for the library work chat.' },
  screenshots: ['step1-before-screen-27-6.png', 'step1-before-screen-40-252.png', 'step4-screen-27-6.png', 'step4-screen-40-252.png', 'step4-crop-strip-27-6.png', 'step4-crop-strip-27-6-3x.png', 'step4-crop-strip-40-252.png', 'step4-crop-strip-40-252-3x.png', 'step5-comparison-36-258.png', 'step5-comparison-40-534.png'].map(f => DIR + f)
};

// Amend the cleanup record: the alignment claim was wrong.
const c = s.npveRebuild_cleanup_2026_09_03;
c._correction_2026_09_03 = 'Step 4 and step 5 claimed the indicator and divider "share the same y" / "indicator bottom = divider top". Measured 2026-09-03: indicator rows 235 to 237, divider row 237 to 238 on 27:6 - stacked, not overlapping; the divider had its own row below the teal. Corrected by npveRebuild_tabUnderlineFix_2026-09-03: divider absolute at strip row 47, inside the indicator rows.';
c.step4_tabUnderline.correction = 'WRONG as built: the divider stacked after the 48 tabs (strip 49). See _correction_2026_09_03.';
c.step5_render.correction = 'The "sitting on it" read was a stacked divider one row below the indicator, not a shared row. See _correction_2026_09_03.';

const f = s.flags.find(x => x.id === 'npveCleanup_tabsNoBottomRule');
if (f) f.detail += " Geometry for the pattern (2026-09-03): the divider must overlap the strip so its 1px row falls inside the indicator's 2px rows; stacking it after the strip leaves it one row below the teal.";
s.flags.push({
  id: 'npveTabUnderline_overlapIsDecisionNotCss', severity: 'low', kind: 'DECISION', discoveredDuring: BATCH,
  summary: "The rebuilt tab underline overlaps the indicator by 1px (divider row inside the 2px indicator) by prompt decision. In CSS, MUI's absolutely positioned indicator (bottom: 0) sits above a border-bottom, so the product renders indicator and rule touching, not overlapping.",
  where: 'target 26:221 > Tabs strip 51:307 > Tab underline 51:308 (ABSOLUTE, y 47); @mui/material 5.14.11 Tabs.js TabsIndicator; admin-ui MessageRoutingLayout.tsx:58-63',
  detail: 'Visible difference: under the active tab the product shows a grey row beneath the teal; the rebuild shows none. Reported, not reconciled.',
  webAppV2BugListCandidate: false, handling: 'Built as the prompt specified; recorded so the library pattern can choose.'
});
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote npveRebuild_tabUnderlineFix_2026_09_03; flags', s.flags.length);
