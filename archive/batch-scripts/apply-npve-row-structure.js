// apply-npve-row-structure.js — records npveRebuild_rowStructure_2026-09-04. Backup first. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-04-pre-npve-row-structure.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const D = 'npveRebuild_rowStructure_2026-09-04';
if (s[D]) throw new Error('record already exists');
const flagsBefore = s.flags.length;
s[D] = {
  _status: 'DONE. Problem summary row restructured on the source model: centred contents, 19/19 padding to an 88 row (source 87), status-to-name gap 8, row-owned Divider instance with a Show divider boolean; list containers at gap 0 with loose dividers archived; last rows without a divider like the source. Change-log row on both logs. No stop condition triggered.',
  date: '2026-09-04',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only (space/19 import)',
  _sourceFile: 'not opened; measurements from npveRebuild_mgmtFidelity_2026-09-04 itemisation',
  report: 'figma-export/npve-row-structure-2026-09-04/report.md',
  recordGate: 'npveRebuild_mgmtFidelityBuild_2026-09-04 recorded — passed',
  stopCondition: 'dropped reference count or placed-instance diff outside the rows region — neither triggered',
  step1_sourceMeasures: { itemHeight: 71, dividerToDivider: 87, block: '47 = status 17 + gap 8 + name 22', blockMargins: '12 / 12 (centred)', statusToNameGap: 8, buttonsCentre: '35.5 = row centre 35.5', insets: '24 / 24 from the sheet edge', dividerToRowCentre: 43.5, gridTarget: 88, padding: '(88 - 50) / 2 = 19 → space/19' },
  step2_master: { root: '153:1186 H, paddingTop/Bottom bound space/19 (997:28), left/right space/8, gap space/8, SPACE_BETWEEN/CENTER, counter-axis AUTO → 518x88', leftBlock: '170:1589 V g8 HUG 414x50 at y19; status control 170:1590 HUG 60x20 (was FIXED 40)', rightBlock: '153:1190 HUG 88x40 at y24, centred by the root', divider: { id: '202:3', kind: 'library Divider instance, ABSOLUTE, constraints STRETCH/MAX, 518x1 at (0,87)', property: 'Show divider#202:0 BOOLEAN default true → visible', why: 'the source draws no divider under its last row; only a node can be switched off by a boolean; a bottom stroke cannot. Absolute so it takes no layout space; keeps color/divider binding; stretches with the row.' }, centres: { block: 44, row: 44, buttons: 44 }, refs: '5 → 6', rule1: 'transients divider on/off 518x88, all paints bound (+ color/divider when on)' },
  step3_containers: { movedToArchive: { container: '202:3450 _Legacy loose dividers — Problems list body (moved out of 156:2426 on 2026-09-04), Archive 03 at (700,1180)', nodes: ['155:2562','155:2579','155:2596','156:1310','156:1315','156:1320'] }, groups: 'Status groups and Problem — … groups at gap 0; each group 88; Status groups 264; variants 317 → 362', lastRows: { '172:3168': 'Show divider false', '172:3219': 'Show divider false' }, refs: 'Closed 34 → 37, Open 45 → 48' },
  step4_pixels: { row2: { dividerToDivider: 'source 87, rebuild 88', textInkCentreVsRowCentre: 'source 45.0 vs 43.5 (1.5 low); rebuild 46.5 vs 44 (2.5 low); 1px apart', buttons: 'source 43.0, rebuild 42.5 vs centres 43.5 / 44', dividersOnSheet: 'source 259/346, rebuild 258/346' }, masterDiff: 'before vs after bbox (16,188)-(534,415) rows only; y<171 None; footer None', placedVsMaster: '(519,88)-(520,89) border pixels', sideBySide: 'figma-export/npve-row-structure-2026-09-04/step4-row2-source-vs-rebuild-2x.png' },
  step5_changeLog: { row: 'Row structure | Loose stack near a line → one centred row that owns its divider | The row centres its own contents', main: '160:1862 (last hidden clone row reused; 1 hidden left)', statusMenu: '202:3433 new Change log/Row instance' },
  rules: { '1': 'row on/off, Closed, Open transients — all bound, none left', '2': 'Cover 1 pre-existing, Templates 0, Screens 0, Archive 0', '3': 'Sidesheet 62; Problem row 4x6; picker 36x3; list body 37/48; summary row 6; comparison 104; Change log 4', '4': 'set', '5': 'none', '6': 'enumerated', '7': 'keys explicit', '8': '0 hits, exempt 0/303/146/69', '9': 'none', '10': 'no clone' },
  markers: '3 GAP, 3 DEFECT unchanged',
  screenshots: fs.readdirSync('./figma-export/npve-row-structure-2026-09-04').filter(f => f.endsWith('.png')).map(f => 'figma-export/npve-row-structure-2026-09-04/' + f)
};
s.flags.push({ discoveredDuring: D, webAppV2BugListCandidate: false, handling: 'Reported. Information only; within the 2px tolerance.', id: 'npveRow_inkCentreOffset', severity: 'info', kind: 'DECISION', summary: 'With the status line at the bound 20px body2 line-height (source 17 auto), the text-ink block of a row sits 2.5px below the row centre in the rebuild against 1.5px in the source; the box centres are exact (44/44/44).', where: 'target 153:1186; source 545:5518', detail: 'A 19/20 split of the padding would move the ink 0.5px; a 17px line-height would match the source but unbind body2. Left as built.' });
s[D].flagsAdded = ['npveRow_inkCentreOffset']; s[D].flagsBefore = flagsBefore; s[D].flagsAfter = s.flags.length;
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote', D, '; flags', flagsBefore, '->', s.flags.length);
