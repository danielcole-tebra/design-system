// apply-npve-pause.js — records npveRebuild_pause_2026-09-03. Record only, no Figma writes. Backup first. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-03-pre-npve-pause.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s.npveRebuild_pause_2026_09_03) throw new Error('record already exists');

s.npveRebuild_pause_2026_09_03 = {
  _status: 'PAUSED. NPVE screen rebuild stopped after three artefacts, all base complete and verified in pixels. Library work takes priority next. THIS RECORD IS THE RESUME POINT.',
  date: '2026-09-03',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6 (no writes this record)',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw (no writes this record)',
  _sourceFile: 'NDE-2026 zVsuhYehoSLLq880qRBFkq, read only',
  built: [
    { name: 'Sidesheet template', where: 'Templates 3:2 › Sidesheet 6:65 (local component, SCAFFOLDING Slot 4:13)', state: 'base complete, verified' },
    { name: 'Clin_Problems-Recent', where: 'Screens 27:2 › 27:6; comparison 36:258; change log 27:222 (12 rows)', state: 'base complete, verified' },
    { name: 'Clin_Problems-Favorites', where: 'Screens 27:2 › 40:252; comparison 40:534; change log 40:454 (13 rows)', state: 'base complete, verified' }
  ],
  sharedMasters: 'Templates: Problems picker body 26:221 (48 references, 4 definitions), Problem row 26:208 (6 references, 4 definitions), Sidesheet 6:65 (18 references).',
  markersOnScreens: ['27:295 GAP — Search field', '27:306 GAP — Colours without a token (two real gaps)', '33:236 DEFECT — Add button ring', '52:428 DEFECT — Tabs bottom rule'],
  lastBatches: ['npveRebuild_cleanup_2026_09_03', 'npveRebuild_tabUnderlineFix_2026_09_03', 'npveRebuild_labelDriftAndUnderline_2026_09_03', 'npveRebuild_goldStarsAndCorrections_2026_09_03'],
  next: {
    priority: 'Library work, driven by figma-export/library-todos/LIBRARY-TODOS.md (12 items, written 2026-09-03).',
    resume: [
      '1. Accept library updates on the two built screens (27:6, 40:252) and the shared masters in fdCQVFdvOByaOYIJYag0d6; publishing and accept-updates are manual (CLAUDE.md Publishing).',
      '2. Verify in pixels: re-screenshot both screens at 1x, diff against npve-gold-stars-corrections-2026-09-03/step4-screen-27-6.png and step4-screen-40-252.png, run all ten standingBatchRules, re-check the four markers against the library state and resolve any whose library fix landed.',
      '3. Read Clin_Problems-Main 545:5239 in NDE-2026 (read only): inventory batch per TEBRA-DESIGN-SYSTEM.md §6 before any build.'
    ],
    lastScreenBaselines: ['figma-export/npve-gold-stars-corrections-2026-09-03/step4-screen-27-6.png', 'figma-export/npve-gold-stars-corrections-2026-09-03/step4-screen-40-252.png']
  },
  flagsAtPause: s.flags.length
};
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote npveRebuild_pause_2026_09_03; flags', s.flags.length);
