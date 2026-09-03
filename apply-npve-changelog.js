// apply-npve-changelog.js — records batch npveRebuild_changelog_2026-09-02. Backup first. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-02-pre-npve-changelog.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s.npveRebuild_changelog_2026_09_02) throw new Error('batch entry already exists');
const DIR = 'figma-export/npve-changelog-2026-09-02/';
const ROWS = [
  ['Header', '64 tall, grey title → 56 tall, black title', 'Library Drawer header'],
  ['Close button', 'Bare 24px icon → 40px icon button', 'Library'],
  ['Back button', 'Chevron in a tinted circle → icon button with chevron', 'Library'],
  ['Sheet border', '1px on all sides → left edge only', 'Library Drawer'],
  ['Footer', '60 tall, 36px buttons → hugs its buttons, 38px', 'Library buttons set the height'],
  ['Middle button', 'Hand-drawn outlined pill → Button contained primary', 'Library. Same look, now a real component'],
  ['Button labels', '"Save & Add to Note" → "Save & Add To Note"', 'Code capitalizes button labels'],
  ['Hidden layers', 'Breadcrumbs, tab sets, button templates → not carried', 'Cleanup. Dead layers in the source'],
  ['Body', 'Drawn per screen → slot, each screen supplies its own', "Template can't hold content, screens do"]
];
s.npveRebuild_changelog_2026_09_02 = {
  _status: 'DONE through step 4. Change log/Row 18:103 and Change log 18:109 built on Templates; nine-row change log placed at (1300, 0) as 18:135. One GAP: the placed change log is a detached frame, not an instance, because Figma instances cannot take appended children (rule 6, no slot API). Rule 14 added to CLAUDE.md.',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6 (NPVE Rebuild), page Templates 3:2',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only (Divider 171:29 and 15 variables imported by key)',
  date: '2026-09-02',
  step1_components: {
    'Change log/Row': {
      id: '18:103', position: { x: 0, y: 300 }, size: '448×37 (hug height)', naming: 'Figma-only, Sentence case, sub-component path with /',
      structure: 'root VERTICAL gap 0 (space/0), no fill → Cells HORIZONTAL fill-width, padding 8/0/8/0 (space/8, space/0), gap 12 (space/12), top-aligned (counterAxisAlignItems MIN) → What TEXT fixed 120 | From to TEXT FILL (184 in a 448 row) | Why TEXT fixed 120; then Row divider = Divider orientation=horizontal instance, FILL width.',
      text: 'All three cells Akkurat LL Regular 14/20, bound font/family/base, font/size/body2, font/lineHeight/body2, font/weight/regular; textAutoResize HEIGHT so long text wraps. What and From to fill bound color/text/primary (#000000); Why bound color/text/secondary (#545454).',
      properties: { 'What#18:0': 'TEXT, default "What" → What.characters', 'From to#18:1': 'TEXT, default "From → to" → From to.characters', 'Why#18:2': 'TEXT, default "Why" → Why.characters' },
      unbound: 'letterSpacing 0% on each cell (no letter-spacing variable in the library; same as the Slot label).'
    },
    'Change log': {
      id: '18:109', position: { x: 0, y: 420 }, size: '480×94 with one row (hug height)',
      root: 'VERTICAL, width 480 fixed, height hug, padding 16 all sides bound space/16, gap 0 bound space/0, fill #FFFFFF bound color/background/paper, stroke 1 INSIDE all sides #D6D6D6 bound color/divider, radius 0.',
      children: 'Title TEXT (FILL width) → Title divider (Divider orientation=horizontal, FILL) → Rows FRAME VERTICAL FILL width, hug, gap 0 bound space/0, holding one Change log/Row instance I18:113 at FILL width.',
      title: 'Akkurat LL Bold 16/24 "Changes: Sidesheet", bound font/family/base, font/size/body1 (16), font/lineHeight/body1 (24), font/weight/bold, fill color/text/primary. No h4 token exists in the Typography collection (sizes: caption 12, chip 13, body2 14, buttonLarge 15, body1 16, h3 20, h2 24, h1 32), so body1 + bold is the nearest heading binding at 16px. Recorded as a flag.',
      properties: { 'Title#18:3': 'TEXT, default "Changes: Sidesheet" → Title.characters' },
      description: 'Set on both components (rule 14 purpose, cell widths, "holds one Row by default").'
    }
  },
  step2_placement: {
    id: '18:135', name: 'Change log — Sidesheet (detached: instances cannot host added rows)', type: 'FRAME', position: { x: 1300, y: 0 }, size: '480×630',
    method: 'Change log instance created at (1300, 0), first row set to the Header row via setProperties. appendChild of a second Change log/Row into the instance Rows frame threw: "in appendChild: Cannot move node. New parent is an instance or is inside of an instance". Fallback in the same script: detachInstance() on the placed instance (root becomes a plain FRAME keeping every binding), then eight further Change log/Row instances appended to Rows at FILL width. The master 18:109 is untouched and still holds one row.',
    rows: ROWS.map(r => ({ what: r[0], fromTo: r[1], why: r[2] })),
    rowIds: ['18:139', '18:145', '18:151', '18:157', '18:163', '18:169', '18:175', '18:181', '18:187'],
    textExact: 'Nine rows set verbatim from the batch prompt, including the arrow character and the quotation marks on the Button labels row.',
    screenshot: DIR + 'step2-changelog-sidesheet-18-135.png',
    lookedAt: 'Yes. 480×630 at 1x. Title bold black, thin grey rule below, nine rows separated by dividers, third column grey. Every wrap is at a word boundary; nothing clips or overlaps; no cell exceeds three lines.',
    wrapReport: {
      widths: { what: 120, fromTo: 184, why: 120, gap: 12, rowInner: 448 },
      fromToLines: { '2 lines': 7, '3 lines': 2 }, whyLines: { '1 line': 3, '2 lines': 3, '3 lines': 3 },
      singleWordLastLines: ['Sheet border From to: "only"', 'Hidden layers From to: "carried"', 'Body From to: "own"', 'Middle button Why: "component"'],
      judgement: 'No bad wraps. The From to cell at 184 wide is the constraint: widening the component to 560 would give it 264 and cut most rows to two lines. Not changed; reported per the prompt.'
    }
  },
  step3_claudeMd: 'Rule 14 added after rule 13 as written in the prompt.',
  step4_rules: {
    scope: 'Change log/Row 18:103, Change log 18:109, placed frame 18:135 (root plus every descendant, skipInvisibleInstanceChildren=false).',
    '1_instancePaintVerification': 'PASS. Placed frame and the nested Row instances read the same paints as the masters: root fill #FFFFFF color/background/paper, root stroke #D6D6D6 color/divider, Title #000000 color/text/primary, What and From to #000000 color/text/primary, Why #545454 color/text/secondary, dividers bound as imported.',
    '2_unboundPaintAudit': 'PASS. Visible solid paints: Row 4, Change log 8, placed 40; 0 unbound in each.',
    '5_opacityLast': 'PASS. 0 paints with opacity below 1.',
    '9_boundPaintAlpha': 'PASS. No bound paint opacity touched; all read 1.00.',
    fractionalGeometry: 'None on any node in the three trees (rule 4).'
  },
  imports: { divider: 'orientation=horizontal key 0143de7b… (Divider 171:31)', variables: 'color/background/paper, color/divider, color/text/primary, color/text/secondary, space/0, space/8, space/12, space/16, font/family/base, font/size/body1, font/lineHeight/body1, font/size/body2, font/lineHeight/body2, font/weight/bold, font/weight/regular' },
  screenshots: ['step1-row-master-18-103.png', 'step1-changelog-master-18-109.png', 'step2-changelog-sidesheet-18-135.png'].map(f => DIR + f)
};
s.flags.push(
  { id: 'npveChangelog_placedLogIsDetached', severity: 'medium', discoveredDuring: 'npveRebuild_changelog_2026-09-02', summary: 'The prompt says rows are added on the Change log instance by duplicating; Figma instances cannot take appended children and there is no slot API, so the placed change log 18:135 is a detached frame holding nine Change log/Row instances. Row styling propagates from Change log/Row; container changes on Change log 18:109 will not reach placed copies.', where: 'fdCQVFdvOByaOYIJYag0d6 Templates 3:2, 18:135', detail: 'Error text: "in appendChild: Cannot move node. New parent is an instance or is inside of an instance". Options for a decision: keep detached frames per rebuilt screen (current), or give Change log a fixed number of rows with Show row N booleans so instances stay instances.', webAppV2BugListCandidate: false, handling: 'Reported. Needs a decision before the next rebuilt frame gets its change log.' },
  { id: 'npveChangelog_noH4Token', severity: 'low', discoveredDuring: 'npveRebuild_changelog_2026-09-02', summary: 'No h4 typography token in the library; the Change log title binds font/size/body1 (16) and font/lineHeight/body1 (24) with font/weight/bold as the nearest heading tokens.', where: 'YX2n4YLrEpBXNbcc73T6dw Typography collection; target 18:110', detail: 'Sizes available: caption 12, chip 13, body2 14, buttonLarge 15, body1 16, h3 20, h2 24, h1 32. Code typography.ts defines h4; the library has no variable for it.', webAppV2BugListCandidate: false, handling: 'Reported. Title stays on body1 + bold until an h4 token exists.' }
);
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote npveRebuild_changelog_2026_09_02; flags', s.flags.length);
