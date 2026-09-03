// apply-npve-problems-recent-corrections.js — records batch npveRebuild_problemsRecent_corrections_2026-09-02 (steps 1-3; step 4 not received). Backup first. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-02-pre-npve-problems-recent-corrections.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s.npveRebuild_problemsRecent_corrections_2026_09_02) throw new Error('batch entry already exists');
const DIR = 'figma-export/npve-problems-recent-corrections-2026-09-02/';
const BATCH = 'npveRebuild_problemsRecent_corrections_2026-09-02';

s.npveRebuild_problemsRecent_corrections_2026_09_02 = {
  _status: 'STEPS 1-3 DONE. Step 4 (local component "Rebuild comparison" on Templates) NOT BUILT: the batch prompt arrived truncated after "fill bound to", so the fill binding and the contents were never received. Record name chosen by the batch because the prompt was cut before naming it.',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6: writes on Screens 27:2 only (one marker, two change log rows, one row edited)',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only (Icon button, Icon/PlusOutlined and 16 variables imported by key in-script)',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq not opened',
  date: '2026-09-02',
  step1_gate: {
    screenshots: [DIR + 'step1-body-master-26-221.png', DIR + 'step1-problem-row-master-26-208.png'],
    lookedAt: 'Yes. Body master 518x392: search field, tabs, title, four rows with the code immediately after the name and the trailing glyph at the right edge. Row master 518x56: star, "Diabetes Mellitus", "E10.9" beside it, plus at the right.',
    read: 'Problem row master 26:208, the four rows in body master 26:221 and the four rows in screen 27:6 all read identically: Name at x 72 (HUG), Code at name end + 16, Text frame 374 FILL, Trailing action at x 462, height 56. Per row: Diabetes Mellitus code x 219; Asthma 146; Chronic Obstructive Pulmonary Disease 383; Osteoarthritis 193.',
    verdict: 'Masters and screen agree: Name and Code are adjacent. Proceeded to step 2.'
  },
  step2_marker: {
    id: '33:236', name: 'DEFECT marker — Add button ring', page: 'Screens', at: '(-450, 540) below the two GAP markers', size: '400x288',
    convention: 'defectMarkerConvention2026_08_28: VERTICAL g12 p16 r4, 1px dashed [6,4], fill color/grey/300, stroke color/grey/500; chip color/grey/400 r4 p3/8 label "DEFECT" color/grey/900 Bold 12/16 ls 0.5 (caption tokens); fix line color/grey/600 body1 tokens; difference line color/text/primary body1 tokens; example first.',
    example: 'Icon button 170:5 with Icon/PlusOutlined 76:8, glyph #545454 bound color/grey/600, identical to the screen rows\' trailing action (rule 1 read on the Asthma row).',
    fix: 'Fix lives in the library: Icon button 170:77 has no outlined or ringed variant.',
    difference: 'Source draws the plus inside a 24px grey ring (white fill, 1px #D6D6D6 stroke, radius 16). The library Icon button renders the plus as a bare glyph, so the add affordance is lost. Marks the trailing action of the three unselected Problem rows.',
    screenshot: DIR + 'step2-defect-marker-add-button-33-236.png',
    unbound: 'Chip label letterSpacing 0.5px (no letter-spacing variable).'
  },
  step3_changeLog: {
    id: '27:222', size: '480x747 (was 613)',
    edited: { '27:244': 'Star and plus → "Star icon | Bare glyph → icon button | Library. Glyph gains a tap target"' },
    inserted: { '33:247': 'after 27:244: "Add button | Plus in a grey ring → plain plus glyph | Library has no ringed icon button. Marked"' },
    appended: { '33:253': '"Star colour | Black → library grey | Library icon default"' },
    order: ['Filter tabs', 'Search field', 'Problem rows', 'Star icon', 'Add button', 'Row background', 'Hidden layers', 'Body padding', 'Colours without a token', 'Star colour'],
    screenshot: DIR + 'step3-changelog-27-222.png'
  },
  step4_rebuildComparison: 'NOT BUILT. Prompt text ended at: "Build a local component Rebuild comparison on Templates. Horizontal, gap 32, padding 32, hug both axes, fill bound to". Needs the fill token and the contents (what sits in each column, how the source is represented) before building.',
  rules: {
    '1': 'PASS. Marker example glyph #545454 color/grey/600 = screen trailing glyph on the Asthma row.',
    '2': 'Screens: 108 visible solid paints, 0 unbound (five top-level nodes walked).',
    '3': 'Change log rows: new instances render their What / From to / Why text from the properties (read back).',
    '4': 'skipInvisibleInstanceChildren = false on every script.',
    '5': 'PASS. 0 unbound paints below opacity 1.',
    '6': 'Top-level nodes enumerated from the page.',
    '7': 'File key passed on every call.',
    '8': 'PASS. 0 fractional geometry on non-vector nodes.',
    '9': 'PASS. Only the Text field outline parts carry bound alpha 0.23; untouched.',
    '10': 'Not applicable.'
  },
  screenshots: ['step1-body-master-26-221.png', 'step1-problem-row-master-26-208.png', 'step2-defect-marker-add-button-33-236.png', 'step3-changelog-27-222.png'].map(f => DIR + f)
};
s.flags.push(
  { id: 'npveProblemsCorrections_iconButtonNoRingedVariant', severity: 'medium', kind: 'DEFECT', discoveredDuring: BATCH, summary: 'Source add control is a plus inside a 24px grey ring (white fill, 1px #D6D6D6, radius 16); library Icon button 170:77 has no outlined or ringed variant, so the rebuilt plus is a bare glyph and the affordance is lost.', where: 'source 4618:5049 / 5070 / 5091; target Problem row 26:208 Trailing action; marker 33:236 on Screens', detail: 'Supersedes the "bare controls" part of npveProblemsRecent_bareIconControls for the add button specifically. Code: MUI IconButton has no outlined variant either; a ringed add button would need a product-level style or a new library variant.', webAppV2BugListCandidate: false, handling: 'Marked DEFECT on Screens; fix lives in the library.' }
);
const b = s.flags.find(f => f.id === 'npveProblemsRecent_bareIconControls'); if (b) b.handling = 'Built 2026-09-02 as Icon buttons (star, plus, check). The add button ring is marked DEFECT separately (npveProblemsCorrections_iconButtonNoRingedVariant, marker 33:236).';
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote npveRebuild_problemsRecent_corrections_2026_09_02; flags', s.flags.length);
