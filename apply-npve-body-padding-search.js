// apply-npve-body-padding-search.js — records batch npveRebuild_bodyPaddingAndSearch_2026-09-02. Backup first. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-03-pre-npve-body-padding-search.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s.npveRebuild_bodyPaddingAndSearch_2026_09_02) throw new Error('batch entry already exists');
const DIR = 'figma-export/npve-body-padding-search-2026-09-02/';
const BATCH = 'npveRebuild_bodyPaddingAndSearch_2026-09-02';

s.npveRebuild_bodyPaddingAndSearch_2026_09_02 = {
  _status: 'DONE through step 10 (run 2026-09-03; record keyed as the prompt named it). Sidesheet template Body padding set to 16 all sides bound space/16; search fields left as built (empty Label is not clean on the Filled variant and blanks the placeholder on the Empty variant); GAP marker 27:295 rewritten; Body padding row amended on both change logs; both screens re-shot; ten rules run.',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6: Templates 3:2 (6:65 Body 6:79; two Part A check instances) and Screens 27:2 (marker 27:295, change log rows 27:262 and 40:500)',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only',
  _repo: 'C:/Code/web-app-v2 read only',
  date: '2026-09-03',
  partA: {
    a1_emptyLabel: {
      instances: { empty: 'Templates 45:255 (-800, 700): size=small State=Default Value=Empty, Label "", Show helper off', filled: 'Templates 45:277 (-800, 800): size=small State=Default Value=Filled, Label "", Value text "Diabetes"' },
      empty: 'Instance 300x40, Input 40 (p8/14/8/14). Label slot hidden; Cap left 9x40 (top 1) and Body right 291x40 at x 9 (top 1) meet, so the top outline is continuous. Resting label visible at width 0 with empty text; Value empty. RENDERS CLEANLY: closed rounded outline, no notch, no text at all — the resting label is the field\'s only placeholder, so an empty Label yields a blank box.',
      filled: 'Instance 300x48 (the hidden-label floating frame still adds 8 above), Input 40. Label slot VISIBLE 10x40 at x 9 with bottom stroke only; Cap left 0-9, Body right from x 19. A 10px break remains in the top outline at x 9-19. NOT CLEAN.',
      screenshots: [DIR + 'partA-textfield-small-empty-nolabel-45-255.png', DIR + 'partA-textfield-small-filled-nolabel-45-277.png'],
      lookedAt: 'Yes. Empty: a closed grey rounded box. Filled: "Diabetes" in a box whose top edge has a short gap near the left corner.'
    },
    a2_libraryPadding: {
      note: '186:2 in the library is a RECTANGLE named "Elevation / 24", not the Dialog; the Dialog set is 747:185 and its content region is Content 186:7 (sm variant). Read on masters; Dialog also has 14 on-canvas instances (Compositions 787:1457 …); Drawer, Card and Paper have none and were not instantiated because padding is structural and identical on instances.',
      dialog: 'Root 0. Title 16(space/16)/24(unbound)/16(space/16)/24(unbound) gap 8(U). Content 20(U)/24(U)/20(U)/24(U) gap 8(U). Actions 8 space/8 all sides. Same on all 12 variants.',
      drawer: 'Root 0 (unbound). Header 8/8/8/16 bound space/8 and space/16, gap 8(U). Divider. Four List/Item 8/16/8/16 bound. No body region and no body padding.',
      card: 'Root 0. Header 16 all sides bound space/16 gap 16 (hidden). Content 16(space/16)/16(space/16)/24(space/24)/16(space/16) gap 8(U).',
      paper: 'Root 0 (unbound), single Label child; no padding region.'
    },
    a3_code: {
      'overrides/DialogOverrides.ts': 'MuiDialog.defaultProps.maxWidth = "sm". No padding.',
      'overrides/DrawerOverrides.ts': 'Does not exist.',
      'overrides/CardOverrides.ts': 'MuiCard.defaultProps variant elevation, square false, raised false. No padding.',
      'overrides/PaperOverrides.ts': 'Does not exist.',
      muiDefaults: 'From .yarn/cache @mui/material 5.14.11: DialogContent padding "20px 24px" ("16px 24px" with dividers); DialogTitle "16px 24px"; DialogActions 8; CardContent 16 with paddingBottom 24; Drawer and Paper set no padding.',
      productBodies: 'No shared drawer or sidesheet body wrapper exists. Per screen: design-system stories/Drawer/Drawer.example.tsx Box padding={2} (16px, width 288); appointment-workflow-ui CalendarEventDrawer Box p:3 (24px) and px:2; AppointmentDrawerForm header Box p:2 (16px), body px:2 pt:2; composition-ui ModuleEditDrawer PaperProps p:3 (24px); admin-ui VisitReasonEditDrawer p:0; MessageRoutingPage drawer p:0; documents-ui OutboundFaxDrawer uses DialogContent (20/24).'
    },
    a4_spaceVariables: 'space/0=0, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19, 23, 24, 40 (twenty values; no 1, 10, 15, 20, 32). All FLOAT, scopes WIDTH_HEIGHT and GAP.',
    a5_verdict: 'ABSENT FROM BOTH. Code has no drawer or sidesheet body padding rule (MUI Drawer sets none; product bodies vary 0, 16 and 24 per screen; the design-system Drawer story uses 16). The library Drawer has no body region; Dialog Content is 20/24 unbound and Card Content 16/16/24/16 bound. Nothing authoritative exists for a sidesheet body, so step 6 used the prompt\'s default 16 bound space/16.'
  },
  partB: {
    step6: 'Sidesheet 6:65 › Body 6:79: paddingTop/Right/Bottom/Left 16, each bound space/16 (was 8/16/8/16). itemSpacing 16 space/16 unchanged. Propagated to all six instances (6:109, 6:144, 6:179, 6:214, 27:6, 40:252): each reads 16/16/16/16 bound. Body stays 488 tall; picker content 384 + 32 = 416, no overflow.',
    step7: 'NOT APPLIED, both fields left as built. 27:6 is Value=Filled ("Diabetes"): an empty Label leaves a 10px break in the top outline (Part A, 45:277). 40:252 is Value=Empty: an empty Label renders cleanly but removes the resting label, which is the only placeholder text the library Text field has, leaving a blank box instead of "Search for problem or ICD-10". Neither yields a placeholder-style field without a notch.',
    step8: 'Marker 27:295 Fix line now: "Fix lives in the library: Text field 121:350 needs a search input pattern, not just a start adornment slot — no floating label, placeholder text, leading magnifier, 40 tall — matching ProblemSearchField.tsx and DataGridColumnFilter.tsx." Difference line keeps the citation "Source 4618:4971 …" and adds the no-placeholder and empty-label findings. Marker now 400x432.',
    step9: 'Body padding row amended verbatim on 27:222 (row 27:262) and 40:454 (row 40:500): "Body padding | 16 all round, gap 12 → 16 all round, gap 16 | Template sets it. Source and template now agree".',
    step10: {
      distances: { '27:6': 'divider bottom → search field box 16, → outline top 16 (was 8), → notch label top 8 (was 0)', '40:252': 'divider bottom → search field box 16, → outline top 16; no floating label' },
      touchesDivider: 'No longer. The nearest ink on 27:6 is the notch label at 8 below the divider; the outline is at 16.',
      screenshots: ['step10-screen-27-6.png', 'step10-screen-40-252.png', 'step10-comparison-36-258.png', 'step10-comparison-40-534.png', 'step8-gap-marker-27-295.png'].map(f => DIR + f)
    }
  },
  rules: {
    '1_instancePaintVerification': 'PASS. Body padding reads 16/16/16/16 bound on all six Sidesheet instances (6:109, 6:144, 6:179, 6:214, 27:6, 40:252); paints on master vs Defaults instance identical (the only signature difference is the root node name).',
    '2_unboundPaintAudit': 'Templates: 18 top-level nodes, 173 visible solid paints, 0 unbound, 1 image. Screens: 5 top-level nodes, 202 visible solid paints, 0 unbound, 2 images. Cover unchanged (pre-existing flag).',
    '3_referenceCounts': 'PASS. Sidesheet 18 references / 9 definitions; Problem row 6 / 4; Problems picker body 48 / 4. 27:6 renders Title, search value and section title from properties.',
    '4_skipInvisibleFalse': 'Set on every script.',
    '5_opacityLast': 'PASS. 0 unbound paints below opacity 1.',
    '6_enumerateDontRecall': 'Audit walked every top-level node from the file.',
    '7_fileIdentityFirst': 'Keys passed explicitly; target pages read: Cover 0:1, Templates 3:2, Screens 27:2.',
    '8_roundWithRecord': 'PASS. 0 fractional geometry on non-vector nodes.',
    '9_boundPaintAlpha': 'PASS. Bound alpha only on the Text field outline parts (0.23); untouched.',
    '10_cloneDropsPropertyRefs': 'Not applicable; references re-verified.'
  },
  screenshots: ['partA-textfield-small-empty-nolabel-45-255.png', 'partA-textfield-small-filled-nolabel-45-277.png', 'step10-screen-27-6.png', 'step10-screen-40-252.png', 'step10-comparison-36-258.png', 'step10-comparison-40-534.png', 'step8-gap-marker-27-295.png'].map(f => DIR + f)
};
s.flags.push(
  { id: 'npveSearch_emptyLabelBreaksFilledOutline', severity: 'low', kind: 'DEFECT', discoveredDuring: BATCH, summary: 'Library Text field size=small Value=Filled with an empty Label keeps a 10px Label slot in the outline, leaving a break in the top edge; the Empty variant hides the slot and closes cleanly.', where: 'YX2n4YLrEpBXNbcc73T6dw Text field 121:350; target check 45:277 vs 45:255', detail: 'Label slot 10x40 visible with Gap sizer at width 0 and 5px padding each side. A code TextField with no label renders a closed outline.', webAppV2BugListCandidate: false, handling: 'Reported for a library batch.' },
  { id: 'npveSearch_noPlaceholderInTextField', severity: 'medium', kind: 'GAP', discoveredDuring: BATCH, summary: 'The library Text field has no placeholder text: the resting label is the only placeholder-like text, so a label-less field shows nothing. Code TextField supports placeholder independently of label (ProblemSearchField.tsx, DataGridColumnFilter.tsx).', where: 'YX2n4YLrEpBXNbcc73T6dw Text field 121:350', detail: 'Together with the missing start adornment this is why the marker now asks for a search input pattern rather than a slot.', webAppV2BugListCandidate: false, handling: 'Reported; marker 27:295 rewritten.' },
  { id: 'npveBody_paddingNotAuthoritative', severity: 'low', kind: 'DECISION', discoveredDuring: BATCH, summary: 'No authoritative sidesheet body padding exists in code or the library; the template uses 16 all sides bound space/16 by decision (prompt default).', where: 'target Sidesheet 6:65 › Body 6:79', detail: 'Evidence: MUI Drawer none; product drawer bodies 0/16/24; Drawer story 16; Dialog Content 20/24; Card Content 16/16/24/16.', webAppV2BugListCandidate: false, handling: 'Recorded.' }
);
const old = s.flags.find(f => f.id === 'npveProblemsRecent_bodyPaddingConflict'); if (old) old.superseded = (old.superseded || '') + ' Amended 2026-09-03 by npveRebuild_bodyPaddingAndSearch: template padding changed to 16 all sides, so source and template now agree on padding; gap remains 16 vs source 12.';
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote npveRebuild_bodyPaddingAndSearch_2026_09_02; flags', s.flags.length);
