// apply-npve-label-drift-underline.js — records batch npveRebuild_labelDriftAndUnderline_2026-09-03. Backup first. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-03-pre-label-drift-underline.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s.npveRebuild_labelDriftAndUnderline_2026_09_03) throw new Error('batch entry already exists');
const DIR = 'figma-export/npve-label-drift-underline-2026-09-03/';
const BATCH = 'npveRebuild_labelDriftAndUnderline_2026-09-03';

s.npveRebuild_labelDriftAndUnderline_2026_09_03 = {
  _status: 'DONE through step 5. Label drift measured in the library and on 40:252 (not fixed; library work). Tab underline moved back under the indicator, touching, per the decision to match CSS. Change log rows amended. LIBRARY-TODOS items 1 and 3 updated.',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6: Templates 3:2 (Problems picker body 26:221 > Tabs strip 51:307 > Tab underline 51:308); Screens 27:2 change log rows 52:410 (in 27:222) and 52:416 (in 40:454). Screens 27:6 and 40:252 read only.',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only: Text field 121:350 size=small masters on Inputs; Reference, Compositions and Layouts searched for instances',
  _repo: 'C:/Code/web-app-v2 not needed this batch',
  date: '2026-09-03',
  step1_labelDrift: {
    method: 'absoluteBoundingBox and absoluteRenderBounds reads with skipInvisibleInstanceChildren = false; 1x screenshot row reads with PIL (dark-pixel rows across the label).',
    libraryMaster_130_140: {
      variant: 'size=small, State=Default, Value=Empty (300x60 including helper row)',
      input: 'Input 130:141 y 32 to 72, 40 tall, centre 52; HORIZONTAL, counter CENTER, padding 8/8',
      restingLabelFrame: 'Label / resting, ABSOLUTE, y 16 in the input, 24 tall (rows 48 to 72, its bottom on the input bottom)',
      labelText: 'Label 130:155 "TextField Label" 16/24: box y 48 to 72 (centre 60, +8 from input centre); render bounds y 54.4 to 66.2 (glyph centre 60.3, +8.3)',
      valueText: 'Value 130:148 in Text frame y 40 to 64: centre offset 0 (typed text is centred correctly)',
      labelSlot: 'Label slot 130:144 95x56 inside Outline (y 32 to 88), the flag npveProblemsBuild_textFieldSmallLabelSlotHeight defect; it holds only the 12/16 Gap sizer at the top and does not position the resting label',
      pixels1x: 'step1-library-textfield-small-empty-130-140.png: outline rows 0 and 39; label glyph rows 22 to 33 (x-height and caps), so the glyphs sit 22 rows below the top edge and 6 above the bottom. Plainly visible.'
    },
    libraryInstance: 'No on-canvas instance of size=small Value=Empty exists in the library (Inputs page has masters only; Reference, Compositions, Layouts searched). The only small instance, 883:2105 on Compositions (Select + Menu, size=small Value=Filled), carries the same Label / resting frame at y 16, hidden by the Filled variant. Instance-level evidence therefore comes from the target.',
    target_40_252: {
      field: 'Search field I40:252;6:80;26:222, size=small State=Default Value=Empty, 630,1133 518x40',
      input: 'Input I40:252;6:80;26:222;130:141 y 1133 to 1173, centre 1153',
      labelText: 'Label I40:252;6:80;26:222;130:155 "Search for problem or ICD-10" 16/24: box y 1149 to 1173 (centre 1161, +8); render bounds y 1155.3 to 1170.5 (glyph centre 1162.9, +9.9 with the descenders of p and comma)',
      pixels1x: 'step4-screen-40-252.png: outline rows 73 and 112 (screen-relative), glyph rows 95 to 106 with descenders to 109; the text sits 22 rows below the top edge and 6 above the bottom. Crop step1-target-searchfield-40-252-crop.png.',
      rebuildIntroduced: false
    },
    verdict: 'CAUSE IS NOT THE LABEL SLOT. The resting label is 8px low because the Label / resting frame is absolutely positioned at y 16 inside the 40-tall small input, the inset that centres a 24-tall label in the 56-tall medium input ((56-24)/2 = 16); the small inset should be 8 ((40-24)/2). The 56-tall Label slot (flag npveProblemsBuild_textFieldSmallLabelSlotHeight) is a separate defect in the outline part and does not move the label. Reported, not reconciled: the label-slot flag stays at low with a cross-reference; the drift gets its own DEFECT flag at medium because it is plainly visible at 1x in the library file itself.',
    screenshots: [DIR + 'step1-library-textfield-small-empty-130-140.png', DIR + 'step1-library-textfield-small-empty-130-140-3x.png', DIR + 'step1-target-searchfield-40-252-crop.png', DIR + 'step1-target-searchfield-40-252-crop-3x.png']
  },
  step2_briefing: 'LIBRARY-TODOS.md item 1: drift added as a visible symptom with the measured offset and both node ids; evidence list extended with the new flag. Item 3: geometry sentence now says divider under the indicator, touching.',
  step3_underlineMove: {
    decision: 'Match the product: MUI indicator at bottom: 0 sits above the border row, so the divider goes directly under the strip, touching, no overlap.',
    mechanism: 'Tab underline 51:308 returned to flow: layoutPositioning AUTO, constraints MIN/MIN, appended as the last child of Tabs strip 51:307, layoutSizingHorizontal FILL, height 1. Gap still bound to space/0. This is structurally the cleanup layout; the difference is that it is now the recorded, deliberate geometry.',
    geometry: 'Strip HUG 49 (tabs 48 + divider 1); body 518x385. Master reads: indicator abs y 1802 to 1804, divider 1804 to 1805, strip 1756 to 1805. Body 48 references, 4 definitions intact.',
    flag: 'npveTabUnderline_overlapIsDecisionNotCss resolved: matched CSS rendering.'
  },
  step4_render: {
    '27:6': 'strip 189 to 238 (49), tabs bottom 237, indicator 235 to 237, divider 237 to 238 AUTO FILL #D6D6D6 bound color/divider, body 518x385',
    '40:252': 'strip 1189 to 1238 (49), indicator 1235 to 1237 (102 wide), divider 1237 to 1238, body 518x385',
    pixels1x: 'step4-screen-27-6.png x 16 to 533: rows 175 and 176 = 90 teal + 428 white; row 177 = 518 grey; row 178 = 518 white. 40:252: rows 175 and 176 = 102 teal + 416 white; row 177 = 518 grey. Teal on top, grey row directly beneath, continuous, no seam.',
    crops: [DIR + 'step4-crop-strip-27-6.png', DIR + 'step4-crop-strip-27-6-3x.png', DIR + 'step4-crop-strip-40-252.png', DIR + 'step4-crop-strip-40-252-3x.png'],
    lookedAt: 'Yes, the 3x crop.',
    diffVsTabUnderlineFix: 'Both screens: bbox (16,176,534,440). Row 176 goes from grey/teal back to white/teal, row 177 from white to grey; rows 178 to 440 are the content below the strip moved down 1px (residual after the shift test: 1 anti-aliasing pixel at 203,202). The only change is the one-row shift.',
    diffVsCleanupStep5: 'Both screens pixel-identical to npve-cleanup-2026-09-03/step5 (diff bbox None), as expected since the geometry is the cleanup layout.',
    rules: {
      '1_instancePaintVerification': 'PASS. Divider #D6D6D6 bound color/divider opacity 1, indicator #004852 bound color/primary/main, read on both screen instances.',
      '2_unboundPaintAudit': 'Templates 18 top-level, 457 nodes, 174 visible solid paints, 0 unbound, 1 image. Screens 6 top-level, 479 nodes, 226 visible solid paints, 0 unbound, 2 images. Unchanged.',
      '5_opacityLast': 'PASS. 0 unbound paints below opacity 1 on either page.',
      '8_roundWithRecord': 'PASS for this batch (divider 0,48 518x1; strip 518x49). Pre-existing library-side: Icon button glyph Group 19.125 tall, 5 on Templates and 4 on Screens.',
      '9_boundPaintAlpha': 'PASS. Bound alpha only on the Text field outline parts at 0.23 (12 Templates, 8 Screens).'
    }
  },
  step5_changeLogs: {
    rows: { '52:410': 'in 27:222 (log 941 tall, row 77)', '52:416': 'in 40:454 (log 1041 tall, row 77)' },
    text: 'Tab underline | Full-width line under the tabs → restored, sitting just under the teal | MUI draws this. Library tabs are missing it. Marked',
    method: 'setProperties on the Row instance text properties What#18:0, From to#18:1, Why#18:2 after loading Akkurat LL Regular; read back from componentProperties and the text nodes.',
    screenshots: [DIR + 'step5-changelog-27-222.png', DIR + 'step5-changelog-40-454.png', DIR + 'step5-comparison-36-258.png', DIR + 'step5-comparison-40-534.png']
  },
  screenshots: ['step1-library-textfield-small-empty-130-140.png', 'step1-library-textfield-small-empty-130-140-3x.png', 'step1-target-searchfield-40-252-crop.png', 'step1-target-searchfield-40-252-crop-3x.png', 'step4-screen-27-6.png', 'step4-screen-40-252.png', 'step4-crop-strip-27-6.png', 'step4-crop-strip-27-6-3x.png', 'step4-crop-strip-40-252.png', 'step4-crop-strip-40-252-3x.png', 'step5-changelog-27-222.png', 'step5-changelog-40-454.png', 'step5-comparison-36-258.png', 'step5-comparison-40-534.png'].map(f => DIR + f)
};

const r = s.flags.find(x => x.id === 'npveTabUnderline_overlapIsDecisionNotCss');
if (r) { r.superseded = 'RESOLVED 2026-09-03 by npveRebuild_labelDriftAndUnderline: matched CSS rendering. Divider returned to flow directly under the 48 tabs, touching the indicator, no overlap.'; r.handling = 'Resolved; kept for the record.'; }
const ls = s.flags.find(x => x.id === 'npveProblemsBuild_textFieldSmallLabelSlotHeight');
if (ls) ls.detail += ' 2026-09-03: measured as a candidate cause of the resting-label drift and ruled out; the slot holds only the notch Gap sizer. The drift is npveLabelDrift_smallRestingLabelInsetIsMedium. Severity unchanged (the slot itself is not visible at 1x).';
s.flags.push({
  id: 'npveLabelDrift_smallRestingLabelInsetIsMedium', severity: 'medium', kind: 'DEFECT', discoveredDuring: BATCH,
  summary: 'Library Text field size=small: the resting label sits 8px too low. The Label / resting frame is absolute at y 16 inside the 40-tall input, the inset that centres a 24-tall label in the 56-tall medium input; small needs 8. Label box centre +8, glyph centre +8.3 (master) and +9.9 (target, with descenders) below the input centre. Visible at 1x in the library file itself; not introduced by the rebuild.',
  where: 'YX2n4YLrEpBXNbcc73T6dw Text field 121:350, size=small variants 130:140 (Input 130:141, Label 130:155) and siblings 130:159 to 130:311; target 40:252 search field I40:252;6:80;26:222 (Label I40:252;6:80;26:222;130:155)',
  detail: 'Typed value text (Text frame at y 8) is centred correctly, so only the resting placeholder-like label drifts. No on-canvas small Empty instance exists in the library; the one small instance 883:2105 (Compositions, Value=Filled) carries the same hidden inset. Distinct from the 56-tall Label slot flag.',
  webAppV2BugListCandidate: false, handling: 'Reported for a library batch; nothing changed in the library or on the screens.'
});
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote npveRebuild_labelDriftAndUnderline_2026_09_03; flags', s.flags.length);
