// apply-npve-repair1.js — records npveRebuild_externalRestructure_2026-09-03_retro (retroactive) and
// npveRebuild_repair1_2026-09-04 (this batch). Target writes made in Figma before this script. Backup first. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-04-pre-npve-repair1.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const RETRO = 'npveRebuild_externalRestructure_2026-09-03_retro';
const D = 'npveRebuild_repair1_2026-09-04';
if (s[RETRO] || s[D]) throw new Error('record already exists');
const AUDIT = 'npveRebuild_audit_2026_09_03';
const flagsBefore = s.flags.length;

s[RETRO] = {
  _status: 'RETROACTIVE. Written 2026-09-04 by the repair batch to record target work that an external session did on 2026-09-03 without a record, script, report, flag or commit. Evidence is the read-only audit ' + AUDIT + ' and figma-export/npve-audit-2026-09-03/report.md; nothing here is asserted beyond what that audit enumerated from the file.',
  date: '2026-09-03',
  recordedOn: '2026-09-04',
  attribution: 'External session (not this assistant, not recorded). Consumer node sessions 74–78 and 88–172 in fdCQVFdvOByaOYIJYag0d6; the last recorded batch (libraryTodos_write2_2026_09_03) still read 27:6 on Screens.',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6',
  evidence: { audit: AUDIT, report: 'figma-export/npve-audit-2026-09-03/report.md', screenshots: 'figma-export/npve-audit-2026-09-03/*.png' },
  changes: [
    { what: 'Pages reorganised into numbered sections', where: 'Templates 3:2 (126:2020 01 · Sidesheet shell, 126:2021 02 · Problems picker, 153:1185 03 · Problems management, 126:2022 04 · Change log utilities, 126:2023 05 · Rebuild comparison); Screens 27:2 (126:2024 01 · Current comparisons, 156:2427 02 · Problems management, 160:3168 03 · Problems management comparisons)' },
    { what: 'Archive page created with four sections', where: 'Archive 126:2 (126:2025 01 · Gap and defect markers, 126:2026 02 · Detached comparison history, 126:2027 03 · Template checks and legacy, 142:996 04 · Recovery checks)' },
    { what: 'Problems picker body promoted to a variant set', where: '94:812, Active tab = Recent 26:221 / All 94:639 / Favorites 94:652; three Tabs instances per variant with two hidden carried over from the boolean design' },
    { what: 'Problem row promoted to a variant set', where: '107:485, Favorite × Action, variants 107:414, 107:425, 107:437, 107:448, 107:460, 107:473; former 26:208 renamed _Legacy/Problem row — pre-variant API' },
    { what: 'Problem summary row created', where: '153:1186, props Name/Code/Status; no nested instance, controls drawn as vectors (audit flag npveAudit_problemSummaryRowDrawnControls)' },
    { what: 'Problems list body created', where: '156:2426, State = Closed 155:1559 / Open 156:1294; uses Button 155:1191 (a second subscription copy), Text field, Checkbox, Problem summary row, Divider, Menu + Menu/Item' },
    { what: 'Rebuild comparison master rebuilt as an instance-swap shell', where: '35:332 with INSTANCE_SWAP slots Reference/Rebuild/Change log content and twelve _Rebuild comparison/<Reference|Rebuild|Change log>/Problems · <Recent|Favorites|Main|Status menu> sub-components 114:777, 114:779, 114:880, 114:897, 114:899, 114:994, 160:1323, 160:1325, 160:1327, 160:1607, 160:1847, 160:1924; hidden __Legacy placeholder frames kept in each column' },
    { what: 'Comparison instances placed on Screens', where: '116:498 Recent, 116:1338 Favorites, 160:3169 Main, 160:3680 Status menu; Sidesheet instances 156:2428 Closed, 156:2707 Open' },
    { what: 'Source exports', where: 'Recent 2x (same hash as legacy); Favorites re-exported at 1x and captioned "refreshed 2026-09-03"; Main and Status menu 1x' },
    { what: 'Markers moved from Screens to Archive 01', where: '27:295, 27:306, 33:236, 52:428' },
    { what: 'Legacy comparisons detached into Archive 02', where: '36:258 and 40:534, holding the verified screens 27:6 and 40:252 inside Rebuilt screen frames 36:264 / 40:540' },
    { what: '_Legacy renames', where: '4:13 _Legacy/Sidesheet body placeholder, 26:208 _Legacy/Problem row — pre-variant API; check instances and a stray change-log row parked in Archive 03' },
    { what: 'Recovery checks section', where: '142:996 holding 130:1185, an un-swapped instance of 35:332; purpose unrecorded' },
    { what: 'Library updates accepted', where: 'Session-77 subscription nodes Text field 77:697, Tabs 77:650, Tabs/Tab 77:639, Icon button 77:1104; space/* bindings moved to the 997-series ids; Button 3:105 left stale and duplicated by 155:1191' }
  ],
  auditFlagsAddressed: {
    npveAudit_unrecordedRestructure: 'this record',
    npveAudit_buttonImportSplit: 'resolved in ' + D + ' step 1',
    npveAudit_iconButtonOrphanImport: 'noted; rename impossible (' + D + ')',
    npveAudit_spaceRefsTwoVersions: 'resolved with the Button split (' + D + ')',
    npveAudit_problemSummaryRowDrawnControls: 'open, repair batch 2',
    npveAudit_problemsListBodyUnboundWhite: 'open, repair batch 2',
    npveAudit_referenceExportsNot2x: 'open, decision',
    npveAudit_comparisonNowInstanceSwap: 'open, decision',
    npveAudit_markersInArchive: 'open, decision',
    npveAudit_recoveryCheckUnexplained: 'open, README states it',
    npveAudit_screensTriplicated: 'renames stopped on the pixel check (' + D + ' step 2)',
    npveAudit_pickerBodyDeadTabs: 'open',
    npveAudit_textFieldHiddenPlaceholderCopy: 'open, library'
  }
};

s[D] = {
  _status: 'DONE except step 2, which stopped on its stated condition: the archived screens and the comparison copies differ by 5 and 6 anti-aliased edge pixels at 1x (max channel delta 16, same-node control 0), so no "_Superseded" rename was made. Button split healed (66 instances on the current subscription, old node gone), README written, retro record written, rules re-run.',
  date: '2026-09-04',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6 (writes: Sidesheet master footer swaps 6:85/6:93/6:101, Coral check 3:397, Primary action property on 160:1328/160:1608/156:2428/156:2707, README 185:3/185:4/185:5, transient 184:3947 created and removed)',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only (import-by-key to confirm the current subscription; variable imports for the README)',
  _sourceFile: 'not opened',
  report: 'figma-export/npve-repair1-2026-09-04/report.md',
  step1_buttonSplit: {
    direction: 'importComponentSetByKeyAsync(Button key) → 155:1191; (Icon button key) → 77:1104. The current subscription is the newer copy; the 58 instances on 3:105 moved (the prompt\'s "8 instances" was the other copy).',
    swaps: { '6:85': '3:136 → 155:1222', '6:93': '3:106 → 155:1192', '6:101': '3:118 → 155:1204', '3:397': '3:118 → 155:1204' },
    propertyFixes: { '160:1328': 'Primary action#6:6 3:120 → 155:1206', '160:1608': 'same', '156:2428': 'same', '156:2707': 'same' },
    swapDefaultsAfter: { 'Primary action#6:6': '155:1204', 'Secondary action#6:7': '155:1222', 'Tertiary action#6:8': '155:1192' },
    referencesAfter: { '6:85': { visible: 'Show secondary action#6:3', mainComponent: 'Secondary action#6:7' }, '6:93': { visible: 'Show tertiary action#6:4', mainComponent: 'Tertiary action#6:8' }, '6:101': { mainComponent: 'Primary action#6:6' }, sidesheetTotal: '62 before, 62 after' },
    countsBefore: { 'Button 3:105': 58, 'Button 155:1191': 8, 'Icon button 6:7': 0, 'Icon button 77:1104': 182 },
    countsAfter: { 'Button 3:105': '0, node gone (getNodeByIdAsync null; Figma dropped the unused subscription, nothing deleted by this batch)', 'Button 155:1191': 66, 'Icon button 6:7': 0, 'Icon button 77:1104': 182 },
    orphanRename: '6:7.name throws "Cannot write to internal and read-only node"; remote subscription nodes cannot be renamed. No other orphan can be enumerated from inside the file.',
    pixels: '27:6 before vs after swap: diff bbox None. Rule 1 transient 184:3947 of 155:1191 contained primary: 86x38, pad 7/17/7/17, white fill / core/main stroke / core/contrastText label, all bound, opacity 1, space refs 997-series, label TITLE (known).'
  },
  step2_duplicates: {
    method: 'get_screenshot 1x of 27:6, 40:252, 116:498, 116:1338 before any write; Rebuild column cropped at (614,60) 550x600; ImageChops.difference.',
    results: { '27:6 vs 116:498': '5 px, max delta 16, at (143,155) (379,371) (409,373) (140,380) (203,380)', '40:252 vs 116:1338': '6 px, max delta 16, same five plus (53,253) delta 13 on the star edge', control: '27:6 captured twice: 0 px' },
    positions: '27:6 abs (1934,180), comparison copy abs (694,180); 40:252 (1934,1393), copy (694,1590); search field at (16,73) and row 1 at (16,234) in all four.',
    outcome: 'STOPPED. Renames not made. Decision: accept as rasterisation and rename in batch 2, or investigate.'
  },
  step3_retro: RETRO,
  step4_readme: { id: '185:3', size: '1040x360 at (0,-320) on Archive', bindings: 'padding space/24 (997:33), gap space/8 (997:15), fill color/background/paper, stroke color/divider @ border/hairline; title body1 bold, body body2 regular, fills color/text/primary; font/family/base bound on both', screenshot: 'figma-export/npve-repair1-2026-09-04/step4-archive-readme-185-3-1x.png', note: 'States the step-2 renames as pending.' },
  step5_rules: {
    '1': 'transient instance read and removed (step 1)',
    '2': 'unbound outside instances: Cover 1 (pre-existing), Templates 25 (Problem summary row 9 + Problems list body 16, known-open for batch 2), Screens 0, Archive 0; section chrome excluded 10/6/8',
    '3': 'Sidesheet 62; Problem row 4x6; picker 36x3; list body 24/35; summary row 3; comparison 104; Change log 4',
    '5': 'no opacity touched', '8': '0 hits, exempt 0/277/117/68', '9': 'no alpha touched'
  },
  screenshots: ['step2-archive-27-6-1x.png', 'step2-archive-40-252-1x.png', 'step2-comparison-116-498-1x.png', 'step2-comparison-116-1338-1x.png', 'step2-crop-116-498-rebuild-1x.png', 'step2-crop-116-1338-rebuild-1x.png', 'step2-crop-116-498-rebuild-1x-diff.png', 'step2-crop-116-1338-rebuild-1x-diff.png', 'step2-control-27-6-second-capture-1x.png', 'step1-after-swap-archive-27-6-1x.png', 'step1-after-swap-sidesheet-master-6-65-1x.png', 'step1-after-swap-sidesheet-open-156-2707-1x.png', 'step4-archive-readme-185-3-1x.png'].map(f => 'figma-export/npve-repair1-2026-09-04/' + f),
  decisionsNeeded: ['Accept the 5-pixel edge difference and rename the Archive screens in batch 2, or investigate first.', 'Icon button 6:7 cannot be renamed; leave for Figma to collect.']
};

const F = (id, kind, severity, summary, where, detail, handling) => ({ discoveredDuring: D, webAppV2BugListCandidate: false, handling, id, severity, kind, summary, where, detail });
s.flags.push(
  F('npveRepair1_orphanImportCannotBeRenamed', 'GAP', 'info', 'Remote subscription nodes cannot be renamed from the Plugin API ("Cannot write to internal and read-only node"), so the "_Orphaned import" label cannot be applied to Icon button 6:7; the Plugin API also cannot enumerate the file\'s subscription list.', 'target; 6:7', 'Button 3:105 vanished on its own once its instance count reached zero (getNodeByIdAsync null). 6:7 has had zero instances since the audit and is still present.', 'Reported. Leave for Figma to collect.'),
  F('npveRepair1_screenPairEdgePixels', 'DECISION', 'medium', 'Archived screens 27:6 / 40:252 and the comparison copies differ by 5 and 6 anti-aliased edge pixels at 1x (max channel delta 16) at identical coordinates in both pairs; same-node control diff is 0. Step-2 renames stopped on the stated condition.', 'target Archive 02 vs Screens 01', 'Both members of each pair sit at integer absolute positions with identical child offsets; properties, texts and hidden lists were already identical (audit). Diff masks in figma-export/npve-repair1-2026-09-04/.', 'Reported. Decision: accept and rename in batch 2, or investigate.')
);
const note = (id, text) => { const f = s.flags.find(x => x.id === id); if (!f) throw new Error('flag missing ' + id); f.handling = (f.handling || '') + ' ' + text; };
note('npveAudit_unrecordedRestructure', '2026-09-04: retroactive record ' + RETRO + ' written by ' + D + '.');
note('npveAudit_buttonImportSplit', '2026-09-04: RESOLVED by ' + D + ' step 1 — all 66 Button instances on 155:1191; 3:105 gone.');
note('npveAudit_spaceRefsTwoVersions', '2026-09-04: RESOLVED with the Button split (' + D + '); no 74-series space ref remains outside orphan 6:7.');
note('npveAudit_iconButtonOrphanImport', '2026-09-04: rename impossible from the Plugin API (' + D + '); left for Figma to collect.');
note('npveAudit_screensTriplicated', '2026-09-04: rename stopped on the pixel check (' + D + ' step 2); README on Archive states the pending state.');
s[D].flagsAdded = ['npveRepair1_orphanImportCannotBeRenamed', 'npveRepair1_screenPairEdgePixels'];
s[D].flagsAnnotated = ['npveAudit_unrecordedRestructure', 'npveAudit_buttonImportSplit', 'npveAudit_spaceRefsTwoVersions', 'npveAudit_iconButtonOrphanImport', 'npveAudit_screensTriplicated'];
s[D].flagsBefore = flagsBefore; s[D].flagsAfter = s.flags.length;
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote', RETRO, 'and', D, '; flags', flagsBefore, '->', s.flags.length);
