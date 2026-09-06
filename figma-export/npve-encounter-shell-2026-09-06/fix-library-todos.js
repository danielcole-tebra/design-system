// Replaces the corrupted items 18 and 19 in LIBRARY-TODOS.md (backticks expanded by the shell on the first write).
const fs = require('fs');
const P = 'figma-export/library-todos/LIBRARY-TODOS.md';
let t = fs.readFileSync(P, 'utf8');
const EOL = t.includes('\r\n') ? '\r\n' : '\n';
const start = t.indexOf('## 18. Module chip');
const end = t.indexOf('## Checked and left out');
if (start < 0 || end < 0 || end < start) throw new Error('anchors not found');
const items = [
  '## 18. Module chip',
  '',
  '**Wrong.** The encounter page module strip uses 40-tall chips with an icon, a label and a close (selected: pale teal fill, teal outline, 8 radius; unselected: outlined pill). The library Chip is 32 tall with a 16 radius and Toggle button is 48 tall with a 4 radius, so neither expresses a module chip.',
  '',
  '**Fix.** Decide whether a module chip (closable, icon-led, 40 tall) belongs on Chip as a size or as its own component; if the latter, publish it with selected and closable axes.',
  '',
  '**Evidence.**',
  '- Source: NPVE NDE-2026 Workflows `Modules_HFlex` local instance 4841:18059 and its chips (#DFEAEC fill, #8CB2B6 stroke, r8).',
  '- Target: local `Module chip` set 426:4213 (selected=yes/no) bound to primary/100, primary/200, divider and radius/md; GAP marker 429:6878 beside the Encounter page shell comparison on Screens.',
  '- Flags: `npveWorkflows_moduleChipNoLibraryPattern` (GAP, medium); built and marked 2026-09-06 by `npveRebuild_encounterShell_2026-09-06`.',
  '',
  '## 19. Settle the Nav family home',
  '',
  '**Wrong.** Nav/Bar, Nav/Icon button, Nav/Menu item, Nav/Dropdown, Nav/Logo and Nav/Search are defined inside a frame on the Compositions page that is labelled as a theme variant (schema `navComponentsOnCompositionsPage`, OPEN). Compositions are unpublished reference frames by decision, so a consuming file cannot build on the nav family with confidence.',
  '',
  '**Fix.** Decide where the Nav family lives (a Surfaces & navigation section or its own page) and whether it is published, then move it; then swap the NPVE nav placeholder for a Nav/Bar instance.',
  '',
  '**Evidence.**',
  '- Library: Nav/Bar 279:92 (1440x65, fill color/primary/main) and siblings on Compositions 446:2.',
  '- Target: SCAFFOLDING nav placeholder inside `Page/Encounter` 429:4161; GAP marker 429:6869 on Screens.',
  '- Flags: `npveWorkflows_navFamilyHomeBlocksShell` (DECISION, medium); decision 2026-09-06: placeholder pending the nav home.',
  ''
].join(EOL) + EOL;
t = t.slice(0, start) + items + t.slice(end);
fs.writeFileSync(P, t);
console.log('fixed items 18 and 19');
