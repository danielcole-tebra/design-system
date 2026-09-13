// apply-library-todos-read.js — records batch libraryTodos_readOnly_2026_09_03. Backup first. Additive. No flag resolved.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-03-pre-library-todos-read.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s.libraryTodos_readOnly_2026_09_03) throw new Error('batch entry already exists');
const DIR = 'figma-export/library-todos-read-2026-09-03/';
const BATCH = 'libraryTodos_readOnly_2026_09_03';
const READ = '2026-09-03 read-only library batch (' + BATCH + ')';

s.libraryTodos_readOnly_2026_09_03 = {
  _status: 'DONE. Read-only. Code and library values read for LIBRARY-TODOS items 1, 5, 7, 8, 11, 12; nothing changed in any Figma file; no flag resolved.',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only. Transient instances 980:147, 980:5323 (created and removed inside one script each) and 986:2, 986:8 (created for get_screenshot, removed in the next call; page findAll for the TRANSIENT name marker returned nothing).',
  _repo: 'C:/Code/web-app-v2 packages/design-system/src; MUI 5.15.12 per yarn.lock line 10912 (sources unzipped from .yarn/cache, repo is yarn PnP with no node_modules).',
  date: '2026-09-03',
  report: DIR + 'report.md',
  fileIdentity: {
    pagesRead: ['Cover 118:250', 'Foundations 145:2', 'Reference 259:2879', 'Actions 259:2873', 'Inputs 259:2874', 'Data display 259:2875', 'Feedback 259:2876', 'Surfaces & navigation 259:2877', 'Icons & illustrations 259:2878', 'Compositions 446:2', 'Layouts 489:2'],
    finding: 'figmaBuild.pages._order is stale: lists Tokens (now Foundations), omits Compositions and Layouts, places Reference last. Component pages match, so the file is the library. Not changed.'
  },
  codeReads: {
    A1_typography: {
      file: 'ds/typography/typography.ts',
      variants: { h4: '1rem/1.5rem/700 (16/24)', h5: '0.875rem/1.25rem/700 (14/20)', subtitle2: '0.75rem/1rem/700 (12/16)', body1: '1rem/1.5rem/400', body2: '0.875rem/1.25rem/400', caption: '0.75rem/1rem/400', button: '1rem/1.5rem/400, textTransform capitalize (line 65)' },
      letterSpacing: 'None defined anywhere in the file. INFERRED from MUI createTypography.js:78 deepmerge: MUI defaults survive per variant — button 0.02857em, caption 0.03333em, body1 0.00938em, body2 0.01071em, h4 0.00735em, h5 0em, subtitle2 0.00714em.',
      inflation: 'Sizes are literal rem strings, not pxToRem, so rule 4 inflation does not apply to them.'
    },
    A2_tab: { decidedBy: '@mui/material Tab/Tab.js:46 spreads theme.typography.button; TabOverrides.tsx sets hover background only; TabsOverrides.tsx sets indicatorColor only.', resolves: 'Akkurat LL, 16px, line height 24px, weight 400, capitalize, letter spacing 0.02857em (inferred). Padding 12px 16px, minHeight 48.' },
    A3_smallRestingLabel: { source: '@mui/material InputLabel/InputLabel.js:97 (outlined medium translate(14px, 16px)) and :100 (small translate(14px, 9px)); TextFieldOverrides.tsx touches only the Select caret.', boxCentreOffset: 'small +1 (9 + 12 vs 20), medium 0 (16 + 12 vs 28)', rule4Inflated: '18.29 and 10.29 — reported as asked, but the values are literal px with no pxToRem on the path, so the inflation does not apply. Item 1 says small needs 8; code says 9.' },
    A4_spacing: { themeSpacingOverride: 'none (ds/theme/theme.ts)', tebraSpaceGrep: 0 },
    A5_buttonCase: { ButtonOverrides: 'no textTransform', typography: 'button.textTransform capitalize (typography.ts:65)', mui: 'Button/Button.js:69 spreads theme.typography.button', renders: '"Save & Add To Note" under CSS capitalize' },
    A6_storybook: 'Unreachable: localhost:6006 returns nothing; PnP unplug missing (npveCloseout_storybookUnreachable). No yarn install run in a read-only batch. Screenshots skipped, no derivation substituted.'
  },
  libraryReads: {
    B1_textFieldSmall: {
      set: '121:350, 20 variants, 10 size=small',
      restingLabel: 'Label / resting absolute y 16, h 24 in the 40-tall Input on all ten (130:140, 159, 178, 197, 216, 235, 254, 273, 292, 311); medium 121:230 same y 16 / h 24 in 56. Box centre +8 on all ten; glyph centre +8.32 on the four with the label visible (render bounds).',
      labelSlot: '56 tall on the four hidden slots (Default/Hover/Disabled/Error × Empty), 40 tall on the six visible ones. Refines npveProblemsBuild_textFieldSmallLabelSlotHeight: the 56 is only ever hidden.',
      pixels: '130:140 1x: outline rows 0 and 39, glyph ink rows 22-34, centre 28.5 vs input centre 20.',
      screenshots: [DIR + 'b1-textfield-small-empty-130-140-1x.png', DIR + 'b1-textfield-small-empty-130-140-3x-marked.png'],
      verdict: 'DISAGREE with code (+1 small, 0 medium).'
    },
    B2_tabLabel: {
      variants: '201:3, 201:5, 201:7, 201:10; 90x48, padding 12/16, Label 37x20 at y 14',
      bindings: 'fills only (color/text/secondary or color/primary/main). Family, size, line height, weight literal: Akkurat LL Regular 16 / 20px, letter spacing 0%, textCase ORIGINAL, no text style.',
      pixels: '201:3 1x: label ink rows 18-30, cols 27-61.',
      screenshots: [DIR + 'b2-tab-201-3-1x.png', DIR + 'b2-tab-201-3-3x.png'],
      verdict: 'DISAGREE on line height (code 24) and case (code capitalize); item 5 proposed lineHeight/body2 (20), which is the library literal, not the code value.'
    },
    B3_iconButtonGlyph: {
      location: 'Group 573:3583 is inside COMPONENT 575:17 Icon/FavoritesOutlined (24x24), not inside Icon button 170:77. Icon button variants hold one child, Icon instance-swap slot Icon#170:0 (default Icon/DownCaret 76:5).',
      bounds: 'Group 573:3583 x 2, y 2, 20.000025 x 19.125002; sole child Vector 573:3584 same bounds, 1 fill, 0 strokes.',
      rendered: 'Transient instance of 170:5 swapped to 575:17: Group render 20.000025 x 19.125002 at (10,10) in 40x40; Vector render 20 x 19.125; ink 20x20 (rows and cols 10-29). Default DownCaret vector 20.000013 x 11.026 at (2, 6.487), also fractional.',
      screenshots: [DIR + 'b3-iconbutton-favoritesoutlined-transient-1x.png', DIR + 'b3-iconbutton-favoritesoutlined-transient-3x.png'],
      verdict: 'DISAGREE with item 12 on node and fix: standingBatchRules.8 exempts GROUP/VECTOR bounds as intrinsic geometry, and any wrapper would live in the icon component.'
    },
    B4_variables: {
      typography: '17 variables: family/base Akkurat LL; weight regular 400, bold 700; size caption 12, chip 13, body2 14, buttonLarge 15, body1 16, h3 20, h2 24, h1 32; lineHeight caption 16, body2 20, body1 24, h1 48, h2 36, h3 32. No h4/h5/subtitle2, no letter spacing. codeSyntax for lineHeight/h2 and h3 reads --tebra-line-height-* (others --tebra-font-line-height-*).',
      dimensionSpace: 'space/0,2,3,4,5,6,7,8,9,11,12,13,14,16,17,18,19,23,24,40 (value = name, scopes WIDTH_HEIGHT+GAP). codeSyntax var(--tebra-space-N) on 19 of 20 (space/40 has none). No space/32. Descriptions on space/0, 18, 40 only.',
      verdict: 'Code has no spacing scale of its own and 0 uses of tebra-space; the code syntax claims a CSS variable that does not exist.'
    },
    B5_buttonLabelCase: {
      census: 'textCase TITLE on 72 of 72 Button variants.',
      transient: '986:8 of 78:14 with Label "Save & Add to Note": 176x38, text 142x24, renders "Save & Add To Note" (capital T seen in pixels).',
      screenshots: [DIR + 'b5-button-contained-primary-save-add-to-note-transient-1x.png', DIR + 'b5-button-contained-primary-save-add-to-note-transient-3x.png'],
      verdict: 'AGREE with code capitalize, by CSS semantics; Storybook not available to confirm in a browser.'
    }
  },
  rules: {
    '1_instancePaintVerification': 'n/a, no new variants',
    '2_unboundPaintAudit': 'not run, no paints changed',
    '3_referenceCounts': 'n/a, no clone',
    '4_skipInvisibleFalse': 'set at the top of every walk',
    '5_opacityLast': 'no paint touched',
    '6_enumerateDontRecall': 'variants, variables and text nodes enumerated from the file',
    '7_fileIdentityFirst': 'pages read; component pages match; _order stale (fileIdentity.finding)',
    '8_roundWithRecord': 'only fractional value met is intrinsic GROUP/VECTOR geometry (573:3583, 76:4), exempt by the rule text',
    '9_boundPaintAlpha': 'no paint touched',
    '10_cloneDropsPropertyRefs': 'n/a'
  },
  screenshots: ['b1-textfield-small-empty-130-140-1x.png', 'b1-textfield-small-empty-130-140-3x-marked.png', 'b2-tab-201-3-1x.png', 'b2-tab-201-3-3x.png', 'b3-iconbutton-favoritesoutlined-transient-1x.png', 'b3-iconbutton-favoritesoutlined-transient-3x.png', 'b5-button-contained-primary-save-add-to-note-transient-1x.png', 'b5-button-contained-primary-save-add-to-note-transient-3x.png'].map(f => DIR + f)
};

// Append a dated read line to each named flag. Nothing resolved.
const notes = {
  npveLabelDrift_smallRestingLabelInsetIsMedium: 'Confirmed on all ten size=small masters: Label / resting y 16, h 24, box +8, glyph +8.32. Code (MUI InputLabel.js:100) rests small at translate y 9, box centre +1, so the target is 9 not 8 if the label keeps its 24 line box.',
  npveProblemsBuild_textFieldSmallLabelSlotHeight: 'The 56-tall slot exists only on the four variants where it is hidden (Value=Empty, not focused); the six visible slots are 40. Not visible at any zoom.',
  npveProblemsRecent_textFieldNoStartAdornment: 'Code path re-read: MUI OutlinedInput notches when startAdornment is present (OutlinedInput.js:170). Library still has no slot.',
  npveSearch_noPlaceholderInTextField: 'Still true; no placeholder property on 121:350.',
  npveSearch_emptyLabelBreaksFilledOutline: 'Visible Label slot on Filled variants is 95x40 with the Gap sizer; unchanged.',
  npveProblemsBuild_searchLabelCopy: 'No change; depends on the search input pattern decision.',
  npveProblemsBuild_tabLabelTypeUnbound: 'Literal values confirmed on 201:3/5/7/10 (Akkurat LL Regular 16/20, ORIGINAL). Code Tab resolves to typography.button 16/24 capitalize (Tab.js:46), so the pairing to bind is font/size/body1 + font/lineHeight/body1, not lineHeight/body2, and the case differs.',
  npveComparison_noSpace32Token: 'Confirmed: 20 space/* variables, no 32. Code has no spacing override and 0 uses of the tebra-space CSS variable the code syntax names.',
  npveChangelog_noH4Token: 'Confirmed: no h4/h5/subtitle2 size or line height; code h4 16/24 700, h5 14/20 700, subtitle2 12/16 700.',
  npveBuild_slotLetterSpacingUnbound: 'typography.ts defines no letterSpacing; MUI defaults survive the deepmerge (button 0.02857em, caption 0.03333em; inferred from createTypography.js:78). Library has no letter-spacing variable.',
  npveBuild_buttonLabelTitleCase: 'TITLE on 72/72 variants; instance renders "Save & Add To Note". Code renders the same under typography.button textTransform capitalize (typography.ts:65, Button.js:69); the earlier detail that MUI uppercase applies was wrong. Agree by CSS semantics; Storybook unreachable.'
};
for (const [id, note] of Object.entries(notes)) {
  const f = s.flags.find(x => x.id === id);
  if (!f) throw new Error('missing flag ' + id);
  f.detail += ' ' + READ + ': ' + note;
}

// New findings, to both flags[] and the record.
const newFlags = [
  { id: 'libraryRead_tabLabelLineHeightAndCase', severity: 'low', kind: 'DEFECT', summary: 'Tabs/Tab label renders 16/20 with textCase ORIGINAL; code Tab inherits typography.button 16/24 capitalize.', where: 'YX2n4YLrEpBXNbcc73T6dw 201:3, 201:5, 201:7, 201:10 Label; Tab.js:46, typography.ts:61-66', detail: 'Distinct from the unbound-type flag: even bound, the library literal 20 is not the code value. Line box 20 in a 48 frame with padding 12 leaves the label at y 14.' },
  { id: 'libraryRead_iconGlyphGroupIsIntrinsicGeometry', severity: 'info', kind: 'DECISION', summary: 'The 19.125-tall Group 573:3583 the rule 8 walks report lives in Icon/FavoritesOutlined 575:17, not Icon button 170:77, and rule 8 exempts GROUP/VECTOR bounds as intrinsic geometry.', where: 'YX2n4YLrEpBXNbcc73T6dw 575:17 › 573:3583 › 573:3584; Icon button Icon#170:0 swap', detail: 'Either the walks stop reporting exempt geometry or the icon gets an integer wrapper frame; LIBRARY-TODOS item 12 names the wrong component and a fix the rule text says is out of scope. Icon/DownCaret 76:4 (20 x 11.026) is the same case.' },
  { id: 'libraryRead_spaceCodeSyntaxNamesMissingCssVar', severity: 'low', kind: 'DEFECT', summary: '19 of 20 space/* variables carry codeSyntax var(--tebra-space-N); the repo has 0 occurrences of tebra-space and theme.ts has no spacing override.', where: 'YX2n4YLrEpBXNbcc73T6dw Tebra/Dimension; C:/Code/web-app-v2/packages', detail: 'space/40 has no code syntax. font/lineHeight/h2 and h3 code syntax also drops the font- segment the other line heights use.' },
  { id: 'libraryRead_letterSpacingInheritsMuiDefaults', severity: 'info', kind: 'DECISION', summary: 'typography.ts authors no letterSpacing, but MUI deepmerges its em defaults into every overridden variant, so rendered letter spacing is non-zero (button 0.02857em, caption 0.03333em). Inferred from createTypography.js:78, not rendered.', where: 'ds/typography/typography.ts; @mui/material styles/createTypography.js', detail: 'Bears on LIBRARY-TODOS item 8: there is no code value of 0.5px to bind; a letter-spacing token would have to encode the em defaults or be a Figma-only affordance.' },
  { id: 'libraryRead_smallRestingLabelCodeIs9', severity: 'info', kind: 'DECISION', summary: 'MUI rests the small outlined label at translate y 9 (InputLabel.js:100), not 8 as LIBRARY-TODOS item 1 states; box centre +1 against the 40 input. The translate is literal px, so rule 4 inflation does not apply.', where: '@mui/material InputLabel/InputLabel.js:97-100', detail: 'Medium 16 centres exactly. Library y 16 on small is +8 by box, +8.32 by glyph.' },
  { id: 'libraryRead_pagesOrderStale', severity: 'info', kind: 'DEFECT', summary: 'figmaBuild.pages._order lists Tokens and omits Compositions and Layouts; the file has Foundations, Compositions and Layouts.', where: 'design-system-schema.json figmaBuild.pages._order', detail: 'Rule 7 identity check passed on the component pages. Not changed.' }
];
for (const f of newFlags) {
  if (s.flags.find(x => x.id === f.id)) throw new Error('flag exists ' + f.id);
  s.flags.push(Object.assign({ discoveredDuring: BATCH, webAppV2BugListCandidate: false, handling: 'Reported. Read-only batch; decision needed.' }, f));
}
s.libraryTodos_readOnly_2026_09_03.newFlags = newFlags.map(f => f.id);
s.libraryTodos_readOnly_2026_09_03.flagsAnnotated = Object.keys(notes);

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote', BATCH, '; flags', s.flags.length, '; new', newFlags.length);
