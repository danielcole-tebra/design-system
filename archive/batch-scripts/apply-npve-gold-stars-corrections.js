// apply-npve-gold-stars-corrections.js — records batch npveRebuild_goldStarsAndCorrections_2026-09-03. Backup first. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-03-pre-gold-stars-corrections.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s.npveRebuild_goldStarsAndCorrections_2026_09_03) throw new Error('batch entry already exists');
const DIR = 'figma-export/npve-gold-stars-corrections-2026-09-03/';
const BATCH = 'npveRebuild_goldStarsAndCorrections_2026-09-03';

s.npveRebuild_goldStarsAndCorrections_2026_09_03 = {
  _status: 'DONE through step 5. Four Favorites stars rebound to color/warning/dark; colours marker 27:306 corrected to two real gaps; change log rows amended and a Star colour row appended; LIBRARY-TODOS item 10 reframed as a generic pick-from-a-list row and item 6 brought current.',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6 Screens 27:2: 40:252 star glyphs (instance overrides), marker 27:306 texts 27:310 and 27:311, change log rows 40:506, 27:268 and new 70:483 in 40:454. Templates untouched.',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only: variable keys and values read; color/warning/dark imported by key in the binding script',
  _repo: 'C:/Code/web-app-v2 not needed this batch',
  date: '2026-09-03',
  step1_goldStars: {
    variable: 'color/warning/dark key c7b6e6f8145265bb911f98a5a2f0d9e3c2fccf78, value #F2BA2A alpha 1, scopes FRAME_FILL SHAPE_FILL STROKE_COLOR; verified by name and hex in-script before binding (throws on mismatch). Imported as VariableID:c7b6e6f8…/74:91 in the target.',
    before: 'All four Vector 200:3 glyphs inside Icon/FavoritesFilled bound color/grey/600 #545454 (imported id 7df34eda…/74:127).',
    after: ['I40:252;6:80;26:261;26:209;170:6;200:3', 'I40:252;6:80;26:272;26:209;170:6;200:3', 'I40:252;6:80;26:282;26:209;170:6;200:3', 'I40:252;6:80;26:292;26:209;170:6;200:3'].map(id => id + ' → #F2BA2A bound color/warning/dark, opacity 1, visible'),
    method: 'setBoundVariableForPaint on each fill, array reassigned, paint read back after binding (plugin trap: a null variable returns an unbound paint without throwing).',
    scope: 'Instance overrides on 40:252 only. Problem row master 26:208 and body master 26:221 untouched; 27:6 carries outlined stars (no FavoritesFilled vector) and is unchanged.',
    rendered: 'step4-screen-40-252.png: the four star regions are the only differing pixels against the label-drift batch shot, and they contain exact #F2BA2A pixels. Crop step4-crop-stars-40-252-3x.png looked at: four gold stars.'
  },
  step2_marker: {
    id: '27:306', name: 'GAP marker — Colours without a token', chip: 'GAP kept',
    fix: 'Fix lives in the library: no token for the selected-check green #1D6B45 or the icon-stroke grey #323232.',
    difference: 'Two source colours have no token: selected check #1D6B45 → color/success/dark #2B865A (nearest); icon strokes #323232 → library component paints. Already tokened: star gold #F2BA2A = color/warning/dark, tab teal #417E86 = color/primary/light, light grey #9A9A9A = color/grey/500, red #B51A2C = color/error/dark. Marks the first Problem row trailing action.',
    geometry: 'Marker 400 wide at (-450, 267); height 288 → 360 (Difference 144 → 192). A first, longer wording reached 408 and would have overlapped the Add button marker 33:236 at y 628; tightened so the bottom is 627. Paints untouched (convention bindings intact).',
    screenshot: DIR + 'step2-marker-colours-27-306.png'
  },
  step3_changeLogs: {
    '40:454': { amended: { '40:506': 'Colours without a token | Selected green and one icon grey → nearest library token, marked | Library. Only these two have no token' }, appended: { '70:483': 'Star colour | Grey → gold | The gold token existed all along. Grey was our error, corrected' }, rows: 13, height: '1041 → 1138', method: 'Row 52:422 cloned, appended to Rows 40:457, FILL width, properties set; mainComponent 18:103 confirmed (still a Change log/Row instance).' },
    '27:222': { amended: { '27:268': 'Colours without a token | Selected green and one icon grey → nearest library token, marked | Library. Only these two have no token' }, rows: 12, height: 941, note: 'Row 33:253 "Star colour | Black → library grey | Library icon default" left as is: the Recent stars are outlined and the source draws them black.' },
    screenshots: [DIR + 'step3-changelog-40-454.png', DIR + 'step4-comparison-36-258.png', DIR + 'step4-comparison-40-534.png']
  },
  step4_render: {
    screenshots: [DIR + 'step4-screen-27-6.png', DIR + 'step4-screen-40-252.png', DIR + 'step4-crop-stars-40-252-3x.png', DIR + 'step4-comparison-36-258.png', DIR + 'step4-comparison-40-534.png'],
    diffVsLabelDrift: '27:6 pixel-identical to npve-label-drift-underline-2026-09-03/step4-screen-27-6.png (diff bbox None). 40:252 diff bbox (42,252,62,440), 952 px in four 20x20 bands at rows 252-271, 308-327, 364-383, 420-439, x 42-61: the four star glyphs and nothing else; 708 of those pixels are exact #F2BA2A.',
    comparisons: '36:258 1708x1033 unchanged in size; 40:534 grew 1133 → 1230 with the appended row (HORIZONTAL auto-layout hugs the log).',
    rules: {
      '1_instancePaintVerification': 'PASS. The four glyphs read #F2BA2A bound color/warning/dark on the 40:252 instances after the array reassignment; 27:6 has no FavoritesFilled vector.',
      '2_unboundPaintAudit': 'Templates 18 top-level, 457 nodes, 174 visible solid paints, 0 unbound, 1 image (unchanged). Screens 6 top-level, 485 nodes, 230 visible solid paints (226 + 4 from the appended row), 0 unbound, 2 images.',
      '5_opacityLast': 'PASS. 0 unbound paints below opacity 1 on either page.',
      '8_roundWithRecord': 'PASS for this batch (marker 400x360 at -450,267; row 448x97). Pre-existing library-side Icon button glyph Group 19.125 tall, 5 on Templates and 4 on Screens.',
      '9_boundPaintAlpha': 'PASS. Bound alpha only on the Text field outline parts at 0.23 (12 Templates, 8 Screens).',
      propertyReferences: 'Templates: body 26:221 48 references / 4 definitions, Problem row 26:208 6 / 4, Sidesheet 6:65 18, all unchanged. Screens: 27:6 carries 66 references, 40:252 65 (first recorded).'
    }
  },
  step5_briefing: 'LIBRARY-TODOS item 10 rewritten: no generic pick-from-a-list row in the library; Problem row 26:208 is the working reference to generalise; problems, medications and allergies consume the same shape; Favorites screen added as a second consumer. Item 6 brought current (stars now bound warning/dark, marker corrected). Flag npveProblemsRecent_listItemNoTrailingSlot text updated to the reframed request.',
  screenshots: ['step2-marker-colours-27-306.png', 'step3-changelog-40-454.png', 'step4-screen-27-6.png', 'step4-screen-40-252.png', 'step4-crop-stars-40-252-3x.png', 'step4-comparison-36-258.png', 'step4-comparison-40-534.png'].map(f => DIR + f)
};

const uc = s.flags.find(x => x.id === 'npveProblemsRecent_unresolvedColours');
if (uc) { uc.detail += ' 2026-09-03 correction: only #1D6B45 and #323232 have no token. #F2BA2A = color/warning/dark, #417E86 = color/primary/light, #9A9A9A = color/grey/500, #B51A2C = color/error/dark, #C3E7C0 = color/hardcoded (no palette)/chipSuccessBackground. Marker 27:306 rewritten to say so; Favorites stars rebound to color/warning/dark.'; uc.handling += ' Marker corrected 2026-09-03 (npveRebuild_goldStarsAndCorrections).'; }
const li = s.flags.find(x => x.id === 'npveProblemsRecent_listItemNoTrailingSlot');
if (li) {
  li.summary = 'The library has no generic pick-from-a-list row: leading icon or control, primary text, inline secondary text, trailing action. List/Item 174:17 offers an Icon slot and stacked primary/secondary text only, so the source problem row cannot be one instance.';
  li.detail = 'Reframed 2026-09-03 (npveRebuild_goldStarsAndCorrections): not a List/Item patch. The NPVE Problem row 26:208 (leading Icon button, name, inline code, trailing Icon button; 518x48 p12/16 g16) is the working reference and should be generalised into the library as that row. Problems (Recent 27:6 and Favorites 40:252), medications and allergies are consumers of the same shape. Instance 499:6 read: Icon slot 56x24 with Icon swap, Primary 16/24 color/text/primary, Secondary 14/20 color/text/secondary on its own line.';
  li.handling = 'Open. Local Problem row composed in the target; library ask is the generic row.';
}
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote npveRebuild_goldStarsAndCorrections_2026_09_03; flags', s.flags.length);
