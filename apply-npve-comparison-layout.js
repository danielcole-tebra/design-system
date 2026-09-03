// apply-npve-comparison-layout.js — records batch npveRebuild_comparisonLayout_2026-09-02 (steps 4-7). Backup first. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-02-pre-npve-comparison-layout.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s.npveRebuild_comparisonLayout_2026_09_02) throw new Error('batch entry already exists');
const DIR = 'figma-export/npve-comparison-layout-2026-09-02/';
const BATCH = 'npveRebuild_comparisonLayout_2026-09-02';

s.npveRebuild_comparisonLayout_2026_09_02 = {
  _status: 'DONE through step 7. Local component Rebuild comparison on Templates; detached copy on Screens holding the 2x source export, screen 27:6 and change log 27:222. Rule 15 added to CLAUDE.md. Favorites not built.',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6: Templates 3:2 (component 35:332) and Screens 27:2 (frame 36:258)',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only (variables imported by key in-script)',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only: 4618:4930 exported as PNG at 2x through download_assets (exportAsync in the plugin API was also tried and gave the same 61 KB image).',
  date: '2026-09-02',
  step4_component: {
    id: '35:332', name: 'Rebuild comparison', page: 'Templates (0, 2200)', size: '1708x692 hug',
    root: 'HORIZONTAL, padding 32 all sides, gap 32, hug both axes, items top-aligned (counterAxisAlignItems MIN), fill #F6F6F6 bound color/grey/300.',
    rule10Exception: 'DELIBERATE EXCEPTION to CLAUDE.md rule 10 (backdrops bind color/background/paper): two white sheets on a paper backdrop are indistinguishable, so the comparison backdrop is color/grey/300. Recorded here and in rule 15.',
    columns: [
      'Reference: VERTICAL gap 8 bound space/8, hug, no fill. Source caption TEXT default "Source: <file key> <node id>, exported <date>"; Source export RECTANGLE 550x600 with an IMAGE fill, scaleMode FIT, placeholder 2x2 grey PNG in the master.',
      'Rebuild: VERTICAL gap 8, hug. Rebuild caption TEXT default "Rebuild"; Rebuilt screen FRAME 550x600 no fill, a placeholder that becomes the auto-layout wrapper for the live screen in placed copies.',
      'Change log: VERTICAL gap 8, hug. Change log caption TEXT default "Changes"; Change log frame FRAME 480x200 no fill, placeholder wrapper for the detached change log.'
    ],
    captions: 'Akkurat LL Regular 14/20 bound font/family/base, font/size/body2, font/lineHeight/body2, font/weight/regular, fill color/text/secondary.',
    properties: { 'Source caption#35:0': 'TEXT', 'Rebuild caption#35:1': 'TEXT', 'Change log caption#35:2': 'TEXT' },
    description: 'Written on the component: the reference is a flat image export and does not update when the source changes; re-export to refresh; grey backdrop is the rule 10 exception; placed copies are detached (rule 6).',
    unbindable: [
      'Root padding 32 and gap 32: no space/32 variable exists in Tebra/Dimension (space/0, 4, 8, 12, 16 found). Left as literal 32. Finding.',
      'The reference IMAGE fill cannot bind a variable by nature. Finding (by design).'
    ]
  },
  step5_placement: {
    id: '36:258', name: 'Rebuild comparison — Problems picker (detached: instances cannot host children)', page: 'Screens', at: '(0, 0)', size: '1708x839',
    method: 'Instance of 35:332 created with the three captions set, then detachInstance(). The Rebuilt screen and Change log frame placeholders were switched to VERTICAL hug auto-layout and the live nodes appended into them (screen 27:6 and change log 27:222 moved from the page into the columns; nothing deleted). The reference rectangle 36:261 was resized to 550x600 and its image set through upload_assets (POST of the 2x PNG, scaleMode FIT).',
    sourceExport: { file: DIR + 'step5-source-export-4618-4930-2x.png', pixels: '1100x1200 RGBA', bytes: 61274, imageHash: '5bbc19ec0546eac60fe09b8d6ed5be09f665589a', fill: 'IMAGE FIT on 36:261 at 550x600 (1x dimensions)' },
    captions: { source: 'Source: zVsuhYehoSLLq880qRBFkq 4618:4930, exported 2026-09-02', rebuild: 'Rebuild', changeLog: 'Changes' },
    columns: { Reference: '550x628 at (32, 32)', Rebuild: '550x628 at (614, 32)', 'Change log': '480x775 at (1196, 32)' },
    captionAlignment: 'All three captions at absolute y 32, height 20; content starts at y 28 inside each column.',
    clipping: 'No node extends outside the frame bounds (checked every descendant bounding box).',
    markers: 'GAP markers 27:295, 27:306 and DEFECT marker 33:236 left at (-450, 0/220/540), outside the comparison.',
    screenshot: DIR + 'step5-rebuild-comparison-36-258.png',
    lookedAt: 'Yes (1024x503 render of 1708x839). Two white sheets read as separate cards on the grey ground; the source on the left with its teal search field and compact tabs, the rebuild on the right; the change log as a third white card; the three grey captions sit on one line above their contents.'
  },
  step6_claudeMd: 'Rule 15 added after rule 14 in Standing rules, as written in the prompt.',
  step7_rules: {
    '1_instancePaintVerification': 'PASS. Rebuild comparison master 35:332 vs detached copy 36:258: caption fills identical (color/text/secondary); root fill bound color/grey/300 on both (the copy is renamed, so the key differs by name only). Screen 27:6 after the move: 20 solid paints, 0 unbound, same bindings as before.',
    '2_unboundPaintAudit': 'Templates: 16 top-level nodes, 164 visible solid paints, 0 unbound, 1 image paint (placeholder). Screens: 4 top-level nodes, 112 visible solid paints, 0 unbound, 1 image paint (the export).',
    '5_opacityLast': 'PASS. 0 unbound paints below opacity 1.',
    '8_roundWithRecord': 'PASS. 0 fractional geometry on non-vector nodes on both pages.',
    '9_boundPaintAlpha': 'PASS. Bound alpha only on the Text field outline parts (0.23); untouched.'
  },
  transport: 'figma.clientStorage is not supported in use_figma; base64 chunks over the 20 KB output cap were possible but expensive. download_assets (2x export URL) plus upload_assets (single-use POST URL targeting the rectangle) moved the 61 KB image without transcription. Recorded for the next screen.',
  screenshots: ['step5-source-export-4618-4930-2x.png', 'step5-rebuild-comparison-36-258.png'].map(f => DIR + f)
};
s.flags.push(
  { id: 'npveComparison_noSpace32Token', severity: 'low', kind: 'GAP', discoveredDuring: BATCH, summary: 'No space/32 variable exists in Tebra/Dimension, so the Rebuild comparison root padding and gap of 32 are literal values.', where: 'target 35:332; library Dimension collection', detail: 'space/0, 4, 8, 12, 16 exist. Either add space/32 to the library or accept literal 32 on Figma-only chrome.', webAppV2BugListCandidate: false, handling: 'Reported.' },
  { id: 'npveComparison_imageFillUnbindable', severity: 'low', kind: 'GAP', discoveredDuring: BATCH, summary: 'The reference rectangle carries an IMAGE fill (the 2x source export), which cannot bind a variable. By design; recorded because the batch rule is "anything unbindable is a finding".', where: 'target 35:332 Source export; 36:261', detail: 'Master holds a 2x2 grey placeholder PNG; placed copies hold the export.', webAppV2BugListCandidate: false, handling: 'Accepted; no action.' }
);
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote npveRebuild_comparisonLayout_2026_09_02; flags', s.flags.length);
