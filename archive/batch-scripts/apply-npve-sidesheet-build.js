// apply-npve-sidesheet-build.js — records batch npveRebuild_sidesheet_build_2026-09-02 (first write batch in the NPVE Rebuild target).
// Backup first. GAP/DEFECT findings also go to flags[]. Step 1 correction was applied separately by apply-npve-sidesheet-correction.js.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-02-pre-npve-sidesheet-build.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s.npveRebuild_sidesheet_build_2026_09_02) throw new Error('batch entry already exists');
const DIR = 'figma-export/npve-sidesheet-build-2026-09-02/';

s.npveRebuild_sidesheet_build_2026_09_02 = {
  _status: 'BUILT. Stopped after step 6. Local component Sidesheet and its SCAFFOLDING Slot on a new page Templates in the target; four instances placed; nothing else built. Source and library untouched.',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6 (NPVE Rebuild), page Templates 3:2',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only; components and variables imported by key',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only; 4618:4930 screenshotted for step 6',
  date: '2026-09-02',
  step0_libraryEnabled: 'Confirmed: teamLibrary lists Design System Rebuild collections Tebra/Color, Tebra/Dimension, Tebra/Typography in the target. Target had one page ("Page 1") before this batch.',
  step1_recordCorrection: 'Applied by apply-npve-sidesheet-correction.js (backup design-system-schema.backup-2026-09-02-pre-sidesheet-correction.json): flag npveSidesheet_noOutlinedButton and the "Footer buttons" mapping row carry a superseded field; flag buttonSchemaEntryStale added. Nothing deleted.',
  step2_coralButton: { variant: 'variant=contained, color=secondary, size=medium, State=Default', libraryNode: '78:50', libraryKey: '10411b4a9ac5791fa685a657af60c8c5c6b68a0f', targetInstance: '3:397 at (-800, 0) on Templates, named "Step 2 check — coral Button"', rendered: '86x38, fill #FF8D6E@1.00 bound color/secondary/main, stroke #FF8D6E@1.00 bound color/secondary/main, label #004852 bound color/secondary/contrastText', screenshot: DIR + 'step2-coral-button-78-50-instance.png' },
  step3_build: {
    page: 'Templates 3:2 (created)',
    slot: { id: '4:13', name: 'Slot', size: '518x200', spec: 'VERTICAL auto-layout, centred, fill none, stroke 1px INSIDE dashPattern [6,4] bound color/grey/500, description marks it SCAFFOLDING. Label 4:14 "SCAFFOLDING: body slot" Akkurat LL Bold 12/16 letterSpacing 0.5, FILL width centred; fill bound color/text/secondary, fontFamily bound font/family/base, lineHeight bound font/lineHeight/caption, fontSize bound font/size/caption.' },
    sidesheet: {
      id: '6:65', name: 'Sidesheet', position: '(700, 0)', size: '550x600 fixed',
      root: 'VERTICAL, p0, g0 (gap bound space/0), clipsContent. Fill bound color/background/paper. Stroke bound color/divider, 1px INSIDE, LEFT EDGE ONLY (top/right/bottom 0), copied from Drawer 749:230 anchor=right persistent which reads strokeLeftWeight 1 and the other three 0.',
      header: { id: '6:66', height: 56, computedPx: '8 + 40 (Icon button medium) + 8 = 56, matches Drawer Header 749:231', spec: 'HORIZONTAL, FILL width, HUG height, padding 8/8/8/16 bound space/8 and space/16, gap 8 bound space/8, items centred. Children: Back 6:67 = Icon button 170:77 (color=default, size=medium, State=Default) with Icon swap Icon/ArrowLeft 575:3, hidden by default; Title 6:73 TEXT Akkurat LL Bold 20/32, FILL width, fill bound color/text/primary, fontFamily font/family/base, fontSize font/size/h3, lineHeight font/lineHeight/h3, fontWeight font/weight/bold; Close 6:74 = Icon button 170:77 with Icon swap Icon/Close (MUI) 106:4.' },
      headerDivider: '6:78 = Divider 171:31 orientation=horizontal, FILL width, fill bound color/divider (rendered 550x1)',
      body: { id: '6:79', spec: 'VERTICAL, FILL both axes, clipsContent, fills none, padding 8/16/8/16 bound space/8 and space/16, gap 16 bound space/16. Child Body slot 6:80 = Slot instance, FILL width (518).', height: '488 with footer on, 543 with footer off (600 − 56 − 1 − 55)' },
      footer: { id: '6:82', height: 55, computedPx: '1 (Divider) + 8 + 38 (Button contained medium) + 8 = 55', spec: 'VERTICAL wrapper FILL/HUG: Footer divider 6:83 (Divider, FILL) then Actions 6:84 HORIZONTAL FILL/HUG, padding 8 all and gap 8 bound space/8, primary axis MAX (right-aligned), items centred. Secondary action 6:85 = Button variant=text color=primary size=medium (78:122) label "Cancel", 68x36; Tertiary action 6:93 = Button variant=contained color=primary size=medium (78:14) label "Save & Add to Note", 176x38, hidden by default; Primary action 6:101 = Button variant=contained color=secondary size=medium (78:50) label "Save", 70x38.' },
      properties: { 'Title#6:0': 'TEXT default "Title" → Title.characters', 'Show back#6:1': 'BOOLEAN false → Back.visible', 'Show footer#6:2': 'BOOLEAN true → Footer.visible', 'Show secondary action#6:3': 'BOOLEAN true → Secondary action.visible', 'Show tertiary action#6:4': 'BOOLEAN false → Tertiary action.visible', 'Body#6:5': 'INSTANCE_SWAP default Slot 4:13', 'Primary action#6:6': 'INSTANCE_SWAP default 78:50 import', 'Secondary action#6:7': 'INSTANCE_SWAP default 78:122 import', 'Tertiary action#6:8': 'INSTANCE_SWAP default 78:14 import' },
      importedFromLibrary: { 'Icon button color=default,size=medium,State=Default': 'c417c9bd… (170:5)', 'Icon/Close (MUI)': 'cd53dbda… (106:4)', 'Icon/ArrowLeft': '411b9cc5… (575:3)', 'Divider orientation=horizontal': '0143de7b… (171:29)', 'Button text/primary/medium/Default': '84c8d392… (78:122)', 'Button contained/primary/medium/Default': '820871c5… (78:14)', 'Button contained/secondary/medium/Default': '10411b4a… (78:50)', variables: 'color/background/paper, color/divider, color/text/primary, color/text/secondary, color/grey/500, space/0, space/8, space/16, font/family/base, font/size/h3, font/lineHeight/h3, font/weight/bold, font/lineHeight/caption, font/size/caption' },
      unbound: ['Slot label letterSpacing 0.5px: no letter-spacing variable exists in Tebra/Typography.'],
      description: 'Component description written on 6:65 and on Slot 4:13.'
    }
  },
  step4_instances: [
    { id: '6:109', name: 'Sidesheet — Defaults', at: '(0, 800)', screenshot: DIR + 'step4-instance-1-defaults-6-109.png', rendered: 'root fill #FFFFFF bound color/background/paper, stroke #D6D6D6 bound color/divider edges [0,0,0,1]; Header 550x56; Title #000000 bound color/text/primary Akkurat LL Bold 20/32; Header divider 550x1 bound color/divider; Body 550x488; Footer 550x55; Cancel label #004852 bound color/primary/main; Save fill #FF8D6E bound color/secondary/main.' },
    { id: '6:144', name: 'Sidesheet — Show back on', at: '(700, 800)', screenshot: DIR + 'step4-instance-2-show-back-6-144.png', rendered: 'as Defaults plus Back 40x40 visible; Title width 430.' },
    { id: '6:179', name: 'Sidesheet — Show tertiary action on', at: '(1400, 800)', screenshot: DIR + 'step4-instance-3-show-tertiary-6-179.png', rendered: 'as Defaults plus Tertiary action 176x38 visible: fill #FFFFFF bound color/common/white, stroke #B3C6C4 bound color/core/main, label #004852 bound color/core/contrastText.' },
    { id: '6:214', name: 'Sidesheet — Show footer off', at: '(2100, 800)', screenshot: DIR + 'step4-instance-4-show-footer-off-6-214.png', rendered: 'Footer hidden; Body grows to 550x543.' }
  ],
  step5_standingBatchRules: {
    '1_instancePaintVerification': 'PASS. Paints read on instances 6:109/6:144/6:179/6:214 and on the master agree; every solid paint is bound and reads opacity 1.00.',
    '2_unboundPaintAudit': 'PASS. Walk of every top-level node on Templates (183 nodes, skipInvisibleInstanceChildren=false): 0 unbound visible solid paints.',
    '3_referenceCounts': 'PASS. Master carries 8 own references (Title characters; Back, Footer visibility; Secondary/Tertiary visibility+mainComponent; Primary and Body mainComponent) plus the imported Button/Icon button references; each instance reports 18 referencing nodes, same as the master. No clone was made.',
    '4_skipInvisibleFalse': 'PASS. Set at the top of every script.',
    '5_opacityLast': 'PASS. No paint-level opacity anywhere (0 paints under 1.0).',
    '6_enumerateDontRecall': 'PASS. Audit enumerated page.children and findAll, not a remembered list.',
    '7_fileIdentityFirst': 'PASS. Every call passed the key explicitly. Target identity: page list was ["Page 1"] before the batch, ["Page 1","Templates"] after; the library was only ever read.',
    '8_roundWithRecord': 'PASS after one fix. The only authored fractional value was the Slot label at x 183.5 (odd text width centred); the label is now FILL width, text-centred, x 0. Remaining fractional values are vector paths inside library icon instances (13.33, 16.5258, 3.25), intrinsic geometry and exempt.',
    '9_boundPaintAlpha': 'PASS. No bound paint had its opacity touched; all read 1.00 as their variables store.',
    '10_cloneDropsPropertyRefs': 'N/A, no variant clone. References verified by reading rendered characters ("Cancel", "Save", "Save & Add to Note") and visibility on instances after toggling.'
  },
  step6_comparison: {
    source: '4618:4930 Page=Clin_Problems-Recent at 1x: ' + DIR + 'step6-source-4618-4930-Clin_Problems-Recent.png',
    target: '6:179 Sidesheet — Show tertiary action on',
    composite: DIR + 'step6-comparison-source-4618-4930-vs-target-6-179.png',
    differences: [
      'Header 64 tall in source vs 56 in target (Drawer Header geometry, as instructed).',
      'Title #545454 in source vs color/text/primary (#000000) in target.',
      'Close: source bare 24px icon-pack glyph; target 40x40 Icon button with Icon/Close (MUI), visibly larger X.',
      'Footer 60 tall in source vs 55 in target; source buttons 36 tall, target 38 (library contained medium).',
      'Tertiary label renders "Save & Add To Note" in target: the library Button Label applies textCase TITLE, so "to" becomes "To". Source reads "Save & Add to Note".',
      'Back control (seen on 6:144): library Icon/ArrowLeft is a return-arrow glyph; source uses a chevron-left in a tinted #E9EFEE circle.',
      'Body content not compared, per instruction.'
    ]
  },
  processFindings: [
    'importComponentByKeyAsync / importVariableByKeyAsync results are not retained by the file until used: components and variables imported in one use_figma call and not instantiated/bound in that call returned null by id in the next call. Fix applied: import and bind in the same script. Silent failure mode: setBoundVariableForPaint with a null variable returns an unbound paint without throwing.',
    'Assigning componentPropertyReferences replaces the whole object: setting {visible} then {mainComponent} on the same node drops the visibility reference. Fix applied: assign both keys together. Found because instance 6:179 did not show the tertiary button on first read.',
    'Library Drawer Header 749:231 pairs its Icon button with Icon/CloseOutlined 76:11, not Icon/Close (MUI) 106:4. The instruction named 106:4 and it was used; recorded as a divergence from the library exemplar.'
  ],
  screenshots: ['step2-coral-button-78-50-instance.png', 'step3-sidesheet-master-6-65.png', 'step4-instance-1-defaults-6-109.png', 'step4-instance-2-show-back-6-144.png', 'step4-instance-3-show-tertiary-6-179.png', 'step4-instance-4-show-footer-off-6-214.png', 'step6-source-4618-4930-Clin_Problems-Recent.png', 'step6-comparison-source-4618-4930-vs-target-6-179.png'].map(f => DIR + f),
  publishStep: 'None. The target is a consumer file; Sidesheet is a local component there. No library publish is involved.'
};

const B = 'npveRebuild_sidesheet_build_2026-09-02 (first target write batch)';
const F = [
  { id: 'npveBuild_noLibrarySidesheet', severity: 'medium', discoveredDuring: B, summary: 'GAP: no library sidesheet exists; the template is a LOCAL component in the target with a SCAFFOLDING body slot (Slot 4:13), because a Drawer instance cannot host body content.', where: 'NPVE Rebuild Templates page, Sidesheet 6:65, Slot 4:13', detail: 'Built from library parts (Icon button, Divider, Button, icons) and library variables; the container and regions are frames.', webAppV2BugListCandidate: false, handling: 'Reported. Promotion to the library is a separate decision.' },
  { id: 'npveBuild_headerGeometryDiffersFromSource', severity: 'low', discoveredDuring: B, summary: 'DEFECT vs source: template header is 56 tall with title color/text/primary and a 40px close button; source sidesheets are 64 tall with #545454 title and a bare 24px close glyph.', where: 'Sidesheet 6:65 Header 6:66 vs NDE-2026 129:6647 children', detail: 'Header copies Drawer Header 749:231 as instructed. Comparison image step6-comparison-source-4618-4930-vs-target-6-179.png.', webAppV2BugListCandidate: false, handling: 'Reported, not fixed; decision on which is right belongs to the screen batches.' },
  { id: 'npveBuild_footerGeometryDiffersFromSource', severity: 'low', discoveredDuring: B, summary: 'DEFECT vs source: template footer is 55 tall (divider + 8 + 38 + 8) with 38-tall library buttons; source footers are 60 tall with 36-tall kit buttons.', where: 'Sidesheet 6:65 Footer 6:82', detail: 'Library contained medium is 38 (1px inside stroke on a 36 box plus rounding, see Button re-read); kit medium is 36.', webAppV2BugListCandidate: false, handling: 'Reported.' },
  { id: 'npveBuild_buttonLabelTitleCase', severity: 'low', discoveredDuring: B, summary: 'DEFECT: library Button Label applies textCase TITLE, so "Save & Add to Note" renders "Save & Add To Note" on instance 6:179.', where: 'Button 79:2 Label text; observed on 6:179 Tertiary action', detail: 'ButtonOverrides.ts does not set textTransform, and MUI\'s default is uppercase; Title case in the Figma master matches neither. Verify against Storybook before treating as a library defect.', webAppV2BugListCandidate: false, handling: 'Reported for a library batch.' },
  { id: 'npveBuild_arrowLeftGlyphIsReturnArrow', severity: 'low', discoveredDuring: B, summary: 'DEFECT vs source: Icon/ArrowLeft 575:3 draws a curved return arrow; the source back control is a chevron-left in a tinted circle.', where: 'Sidesheet Back 6:67 on instance 6:144', detail: 'Library has Icon/LeftCaret 200:35 and Icon/NavigateBefore (MUI) 190:4 as chevron alternatives. Instruction named 575:3; used as instructed.', webAppV2BugListCandidate: false, handling: 'Reported; swap is a one-property change if decided.' },
  { id: 'npveBuild_importedNodesDroppedBetweenCalls', severity: 'medium', discoveredDuring: B, summary: 'Plugin API behaviour: components and variables imported by key are dropped from the file if not used in the same use_figma call; a later getNodeByIdAsync/getVariableByIdAsync returns null and setBoundVariableForPaint(null) silently produces an unbound paint.', where: 'NPVE Rebuild target, calls 1 to 3 of this batch', detail: 'Root fill and the title fontSize/lineHeight/fontWeight bindings were silently lost on the first build and had to be re-imported and rebound in one script. Instance reads caught it (rule 1).', webAppV2BugListCandidate: false, handling: 'Reported; add to figmaBuild.pluginApiNotes in a maintenance batch: import and use in the same script.' },
  { id: 'npveBuild_slotLetterSpacingUnbound', severity: 'info', discoveredDuring: B, summary: 'Slot label letterSpacing 0.5px is unbound; Tebra/Typography has no letter-spacing variable.', where: 'Slot 4:13 label 4:14', detail: 'Every other text and paint value on Sidesheet and Slot is bound.', webAppV2BugListCandidate: false, handling: 'Reported.' }
];
for (const f of F) { if (s.flags.some(x => x.id === f.id)) throw new Error('flag id collision ' + f.id); s.flags.push(f); }
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote npveRebuild_sidesheet_build_2026_09_02; flags +' + F.length + ' = ' + s.flags.length);
