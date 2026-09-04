// apply-npve-repair2.js — records npveRebuild_repair2_2026-09-04. Target writes made in Figma before this script. Backup first. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-04-pre-npve-repair2.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const D = 'npveRebuild_repair2_2026-09-04';
if (s[D]) throw new Error('record already exists');
const flagsBefore = s.flags.length;

s[D] = {
  _status: 'DONE. All eight steps complete; no stop condition triggered. Problem summary row rebuilt on library Icon buttons and Icon/DownCaret with zero raw hex; Problems list body whites bound; change logs rewritten; markers back on Screens plus one new DEFECT marker; three references re-exported at 2x; Archive screens renamed _Superseded; CLAUDE.md rules 14/15 rewritten; LIBRARY-TODOS item 13 added.',
  date: '2026-09-04',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6 (writes listed per step)',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only (imports by key; two icon screenshots)',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only (download_assets at 2x for 4618:5137, 545:5239, 4494:3240; loadAsync name read)',
  report: 'figma-export/npve-repair2-2026-09-04/report.md',
  stopCondition: 'Live-instance diff showing change outside the edited controls, or a reference failing to land at 2x. Neither triggered.',
  step1_supersededRenames: {
    decision: 'DECISION 2026-09-04 (Daniel): the 5/6 anti-aliased edge pixels between the archived screens and the comparison copies (npveRepair1_screenPairEdgePixels) are rendering noise.',
    renamed: { '27:6': '_Superseded — see Screens — Clin_Problems-Recent', '40:252': '_Superseded — see Screens — Clin_Problems-Favorites' },
    readme: '185:5 section 02 line rewritten: renames done, reason stated; pending clause removed.'
  },
  step2_problemSummaryRow: {
    master: '153:1186',
    glyphs: { edit: 'Icon/EditOutlined 575:13 key ae295bfd…', note: 'Icon/AddPaymentNote 575:2 key 9fe47d27… (clipboard with plus; alternative Icon/Document 575:11 is a plain sheet)', caret: 'Icon/DownCaret 76:5 key 9014d342…, instance rescaled 0.5 → 12x12, vector 10x5.5' },
    created: { '190:11': 'Edit problem — Icon button 77:1104 color=default size=medium State=Default, Icon → EditOutlined', '190:12': 'Add to note — same, Icon → AddPaymentNote', '190:18': 'Status caret — Icon/DownCaret instance, vector fill color/success/main', '190:23': 'Archive 03 › _Legacy hand-drawn — Problem summary row controls (moved out of 153:1186 on 2026-09-04)' },
    moved: { '170:1607': 'Edit problem (drawn) → 190:23', '170:1611': 'Add to note (drawn) → 190:23', '170:1592': 'Status dropdown (drawn caret) → 190:23' },
    legacyPaintsBound: 'ring strokes → color/core/dark; pencil stroke and cap → color/primary/main; note vector → color/primary/light; caret fill → color/success/main; caret stroke → color/common/black; hidden frame fills → color/background/paper. 0 unbound on the legacy frame.',
    statusText: '170:1591 bound font/family/base, font/size/body2 14, font/lineHeight/body2 20, font/weight/bold; fill color/success/main. Box 17 → 20 tall, y 23 → 20 in the 40-tall control.',
    actionsFill: '153:1190 → color/background/paper',
    rawHex: 'All nine unbound paints removed from the master (walk 0). Every hex was an exact token: #3FA266 success/main, #8CA7A2 core/dark, #417E86 primary/light, #004852 primary/main, #9A9A9A grey/500. No nearest match needed; GAP marker 27:306 Difference text gained the mapping paragraph.',
    statusColourSwitch: 'No Status variant axis. Per-instance fill override on the Status text and the caret vector: master success/main; placed rows 172:3134, 3185 (ACTIVE) keep success/main; 172:3151, 3168, 3202, 3219 (RESOLVED, MARKED AS ERROR) carry color/grey/500. Overrides were raw hex before, bound now on all six, word and caret.',
    references: { master: '5 on findAll (3 own Name/Code/Status + 2 nested Icon-slot refs)', problemsListBody: '30 / 41 (was 24 / 35; +6 = 3 rows × 2 Icon buttons per variant)' },
    marker: { id: '189:615', name: 'DEFECT marker — Ringed icon buttons', where: 'Screens 02 · Problems management at (1300,120); section widened 1300 → 1800', clonedFrom: '33:236', example: 'Icon button + Icon/EditOutlined', unbound: 0 },
    pixels: { '156:2428': 'bbox (24,203)-(526,389); columns 24–169 (status word + caret) and 438–525 (action buttons) only', '156:2707': 'bbox (24,203)-(526,389); columns 24–87, 160–166 and 438–525 only (menu overlay covers the rest)', verdict: 'only the controls changed' },
    rule1: 'transient instance (created/removed in-script) reads paper, success/main ×2, text/primary, text/secondary, paper, grey/600 ×2 — all bound; live RESOLVED row reads grey/500 on word and caret.'
  },
  step3_listBodyAndPicker: {
    boundToPaper: ['155:1560','155:1591','155:1605','155:2546','155:2563','155:2580','156:1254','156:1261','156:1295','156:1298','156:1299','156:1302','156:1305','156:1306','156:1311','156:1316'],
    renamed: ['39:355','39:369','94:643','94:644','94:655','94:656'].map(id => id + ' → _Legacy hidden — <previous name>'),
    refs: 'picker 36×3 unchanged'
  },
  step4_changeLogs: {
    method: 'setProperties on Change log/Row instances (TEXT props What#18:0, From to#18:1, Why#18:2) in sub-components 160:1847 (Main) and 160:1924 (Status menu); Screens instances follow.',
    rows: {
      Controls: ['160:1853','160:1930','Controls | Drawn circles and glyphs → library buttons | Library. The circled style has no library button yet. Marked'],
      Density: ['160:1855','160:1932','why: Library. Rows, tabs and buttons are all taller'],
      Shell: ['160:1852','160:1929','why: One shared panel shell for every screen'],
      StatusMenu: ['160:1933','why: The open menu is now a state of the screen, not a loose layer'],
      Rows: ['160:1854','160:1931','why: Same row everywhere. Name, code and actions stay consistent']
    }
  },
  step5_markers: {
    moved: { '27:295': 'Screens 01 (1868,120)', '27:306': 'Screens 01 (1868,592), 552 tall after the appended paragraph', '33:236': 'Screens 01 (1868,1184)', '52:428': 'Screens 01 (1868,1512)' },
    section01: 'widened 1868 → 2400; first placement overlapped after 27:306 grew, re-stacked with 40px gaps in the same batch',
    archive01: 'empty, kept; README line rewritten'
  },
  step6_references: {
    exports: { '4618:5137': '1100x1200 → 114:898 FIT', '545:5239': '1100x1034 → 160:1324 FILL', '4494:3240': '1100x1020 → 160:1326 FILL' },
    readBack: 'getImageByHash().getSizeAsync() ratio 2.000 on all three; one fill each; hashes e2becad1, 00903244, 08c01b8e',
    captions: { '116:1338': 'Source: zVsuhYehoSLLq880qRBFkq 4618:5137, exported 2026-09-04', '160:3169': 'Source: zVsuhYehoSLLq880qRBFkq 545:5239, exported 2026-09-04', '160:3680': 'Source: zVsuhYehoSLLq880qRBFkq 4494:3240, exported 2026-09-04', '116:498': 'unchanged, exported 2026-09-02' },
    files: ['step6-source-4618-5137-favorites-2x.png','step6-source-545-5239-main-2x.png','step6-source-4494-3240-statusmenu-2x.png'].map(f => 'figma-export/npve-repair2-2026-09-04/' + f)
  },
  step7_claudeMd: { backup: 'figma-export/npve-repair2-2026-09-04/CLAUDE.md.before-2026-09-04', rules: '14 and 15 rewritten for the instance-swap comparison shell; text in the report.' },
  step8_libraryTodos: 'figma-export/library-todos/LIBRARY-TODOS.md item 13: Text field masters ship hidden placeholder text (130:149, 130:168, 20 in set 121:350).',
  rules: { '1': 'transient + live read', '2': 'Cover 1 (pre-existing), Templates 0, Screens 0, Archive 0', '3': 'Sidesheet 62; Problem row 4×6; picker 36×3; list body 30/41; summary row 5; comparison 104; Change log 4', '5': 'none', '8': '0 hits, exempt 0/303/145/69', '9': 'none' },
  markers: '2 GAP, 3 DEFECT, all on Screens beside the screens they mark.',
  screenshots: fs.readdirSync('./figma-export/npve-repair2-2026-09-04').filter(f => f.endsWith('.png')).map(f => 'figma-export/npve-repair2-2026-09-04/' + f),
  decisionsOpen: ['Status variant axis on Problem summary row vs per-instance overrides', 'Icon/AddPaymentNote vs Icon/Document as the add-to-note glyph', 'Icon button 6:7 rename impossible; leave for Figma', 'LIBRARY-TODOS items 2 and 13']
};

const F = (id, kind, severity, summary, where, detail, handling) => ({ discoveredDuring: D, webAppV2BugListCandidate: false, handling, id, severity, kind, summary, where, detail });
s.flags.push(
  F('npveRepair2_statusColourByOverride', 'DECISION', 'low', 'Problem summary row switches status colour by a per-instance fill override on the Status text and caret (success/main vs grey/500), not by a variant axis.', 'target 153:1186 and its six placements in 156:2426', 'Overrides are bound now. A Status variant (Active / Resolved / Marked as error) would make the colour part of the component API.', 'Reported. Decision for a later batch.'),
  F('npveRepair2_addToNoteGlyphChoice', 'DECISION', 'info', 'Add to note uses Icon/AddPaymentNote (clipboard with plus); the only other candidate is Icon/Document (plain sheet). The source glyph is a document with an add badge, which the library does not have exactly.', 'target 190:12; library 575:2, 575:11', 'Screenshots of both candidates in figma-export/npve-repair2-2026-09-04/.', 'Reported. Swap is a one-property change.')
);
const note = (id, text) => { const f = s.flags.find(x => x.id === id); if (!f) throw new Error('flag missing ' + id); f.handling = (f.handling || '') + ' ' + text; };
note('npveRepair1_screenPairEdgePixels', '2026-09-04: DECISION accepted as rendering noise; renames done in ' + D + ' step 1.');
note('npveAudit_screensTriplicated', '2026-09-04: RESOLVED — Archive screens renamed _Superseded — see Screens (' + D + ').');
note('npveAudit_problemSummaryRowDrawnControls', '2026-09-04: RESOLVED by ' + D + ' step 2 — library Icon buttons and Icon/DownCaret; drawn nodes moved to Archive 03 with paints bound; DEFECT marker 189:615 placed.');
note('npveAudit_problemsListBodyUnboundWhite', '2026-09-04: RESOLVED by ' + D + ' step 3 — 16 frames and Actions bound to color/background/paper.');
note('npveAudit_referenceExportsNot2x', '2026-09-04: RESOLVED by ' + D + ' step 6 — three references re-exported at 2x, captions re-dated.');
note('npveAudit_comparisonNowInstanceSwap', '2026-09-04: DECISION — kept; CLAUDE.md rules 14/15 rewritten (' + D + ' step 7).');
note('npveAudit_markersInArchive', '2026-09-04: RESOLVED — all four markers back on Screens beside the picker comparisons (' + D + ' step 5).');
note('npveAudit_pickerBodyDeadTabs', '2026-09-04: six hidden Tabs instances renamed _Legacy hidden — … (' + D + ' step 3); kept.');
note('npveAudit_textFieldHiddenPlaceholderCopy', '2026-09-04: LIBRARY-TODOS item 13 written (' + D + ' step 8).');
s[D].flagsAdded = ['npveRepair2_statusColourByOverride', 'npveRepair2_addToNoteGlyphChoice'];
s[D].flagsAnnotated = ['npveRepair1_screenPairEdgePixels','npveAudit_screensTriplicated','npveAudit_problemSummaryRowDrawnControls','npveAudit_problemsListBodyUnboundWhite','npveAudit_referenceExportsNot2x','npveAudit_comparisonNowInstanceSwap','npveAudit_markersInArchive','npveAudit_pickerBodyDeadTabs','npveAudit_textFieldHiddenPlaceholderCopy'];
s[D].flagsBefore = flagsBefore; s[D].flagsAfter = s.flags.length;
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote', D, '; flags', flagsBefore, '->', s.flags.length);
