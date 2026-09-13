// apply-npve-sidesheet-closeout.js — records batch npveRebuild_sidesheet_closeout_2026-09-02. Backup first. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-02-pre-npve-sidesheet-closeout.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s.npveRebuild_sidesheet_closeout_2026_09_02) throw new Error('batch entry already exists');
const DIR = 'figma-export/npve-sidesheet-closeout-2026-09-02/';

s.npveRebuild_sidesheet_closeout_2026_09_02 = {
  _status: 'BASE COMPLETE. Steps 1 and 4 pass. Step 2 (Storybook check) is open: Storybook unreachable this session; flag npveBuild_buttonLabelTitleCase left open with the code path recorded. Stopped after step 4; no sub-header, no screens.',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6 (NPVE Rebuild), page Templates 3:2, Sidesheet 6:65',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only (two icons imported by key)',
  date: '2026-09-02',
  templateStatus: 'base complete',
  step1_iconSwaps: {
    method: 'Icon/LeftCaret (key 42105eed…, target 14:103) and Icon/CloseOutlined (key 1fe139d4…, target 14:105) imported and set as the Icon swap value on Back 6:67 and Close 6:74 in the same script. No nodes created or deleted on the master.',
    before: { back: 'Icon/ArrowLeft (target 6:58)', close: 'Icon/Close (MUI) (target 6:56)' },
    after: { back: 'Icon/LeftCaret', close: 'Icon/CloseOutlined, now matching Drawer Header 749:231' },
    propagation: 'All four instances read Icon/LeftCaret on Back and Icon/CloseOutlined on Close. Visibility still driven by properties: 6:109 back off/footer on/tertiary off; 6:144 back ON; 6:179 tertiary ON; 6:214 footer OFF. Master references intact: Back visible←Show back, Footer visible←Show footer, Secondary visible+mainComponent, Tertiary visible+mainComponent, Primary mainComponent, Body slot mainComponent, Title characters.',
    unusedImports: 'Icon/ArrowLeft and Icon/Close (MUI) are no longer referenced by any node; they were not deleted (rule 1) and Figma may drop them as unused imports.'
  },
  step2_storybookCheck: {
    result: 'UNREACHABLE. Flag npveBuild_buttonLabelTitleCase left open.',
    attempts: ['yarn not on PATH (exit 127).', 'node .yarn/releases/yarn-4.17.1.cjs storybook --ci --no-open: exit 7, "Required unplugged package missing from disk: open@npm:8.4.2" — the PnP checkout needs yarn install, which would write into the read-only reference repo and was not run.', 'Chrome browser extension not connected, so a running Storybook could not have been screenshotted either.'],
    codePath: {
      'src/typography/typography.ts': 'button: { fontWeight: 400, fontSize: "1rem", lineHeight: "1.5rem", textTransform: "capitalize" } (line 61-66); theme.ts line 82 wires typography into the theme, and MUI Button applies theme.typography.button.',
      'src/cobranding/createPartnerTheme.ts': 'button: { … textTransform: "capitalize" as const } (line 30-35).',
      'src/overrides/ButtonOverrides.ts': 'no textTransform rule; no outlined rule.',
      reading: 'CSS text-transform: capitalize upper-cases the first letter of every word, so "Save & Add to Note" would render "Save & Add To Note" in code, which is what Figma textCase TITLE produces. This points to the library being correct and the flag being superseded, but the instruction requires a Storybook render as evidence, so the flag stays open.'
    },
    whatUnblocks: 'Run yarn install in web-app-v2 (writes .yarn/unplugged), start Storybook on 6006, connect the Chrome extension, open Components/Inputs/Button, set the label text and screenshot.'
  },
  step3_claudeMd: 'Section "Known plugin API traps" added after Standing rules with the three traps as written.',
  step4_rerun: {
    screenshots: ['step4-instance-1-defaults-6-109.png', 'step4-instance-2-show-back-6-144.png', 'step4-instance-3-show-tertiary-6-179.png', 'step4-instance-4-show-footer-off-6-214.png'].map(f => DIR + f),
    lookedAt: 'Yes: 6:144 shows the chevron back and the outlined close; 6:179 shows the outlined close and three footer buttons.',
    rules: {
      '1_instancePaintVerification': 'PASS. Master and four instances: root fill #FFFFFF@1 color/background/paper; root stroke #D6D6D6 color/divider; title #000000 color/text/primary; primary action #FF8D6E@1 color/secondary/main; its label #004852 color/secondary/contrastText. Identical on all five.',
      '2_unboundPaintAudit': 'PASS. 22 visible solid paints per node tree on master and each instance, 0 unbound.',
      '5_opacityLast': 'PASS. 0 paints with opacity below 1.',
      '9_boundPaintAlpha': 'PASS. No bound paint opacity touched; all read 1.00.'
    }
  },
  screenshots: ['step4-instance-1-defaults-6-109.png', 'step4-instance-2-show-back-6-144.png', 'step4-instance-3-show-tertiary-6-179.png', 'step4-instance-4-show-footer-off-6-214.png'].map(f => DIR + f)
};
const arrow = s.flags.find(f => f.id === 'npveBuild_arrowLeftGlyphIsReturnArrow'); if (arrow) { arrow.superseded = 'RESOLVED 2026-09-02 by npveRebuild_sidesheet_closeout_2026_09_02: Back now swaps Icon/LeftCaret 200:35.'; arrow.handling = 'Resolved by icon swap; kept for the record.'; }
const proc = s.flags.find(f => f.id === 'npveBuild_importedNodesDroppedBetweenCalls'); if (proc) { proc.handling = 'Recorded in CLAUDE.md "Known plugin API traps" 2026-09-02.'; }
s.flags.push({ id: 'npveCloseout_storybookUnreachable', severity: 'low', discoveredDuring: 'npveRebuild_sidesheet_closeout_2026-09-02', summary: 'Storybook could not be started from the reference checkout: yarn 4 PnP reports unplugged package open@8.4.2 missing, needing a yarn install; the Chrome extension was also not connected.', where: 'C:/Code/web-app-v2/packages/design-system, storybook dev -p 6006', detail: 'Blocks the Button label case verification (flag npveBuild_buttonLabelTitleCase). Code path typography.button.textTransform capitalize recorded in the batch.', webAppV2BugListCandidate: false, handling: 'Reported. Needs a decision on running yarn install in the reference repo.' });
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote npveRebuild_sidesheet_closeout_2026_09_02; flags', s.flags.length);
