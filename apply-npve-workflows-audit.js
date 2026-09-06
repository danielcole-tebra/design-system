// apply-npve-workflows-audit.js — records npveRebuild_workflowsAudit_2026-09-05 (read-only source audit). Backup taken before the batch; re-copied only if missing. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
const B = './design-system-schema.backup-2026-09-05-pre-npve-workflows-audit.json';
if (!fs.existsSync(B)) fs.copyFileSync(P, B);
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const D = 'npveRebuild_workflowsAudit_2026-09-05';
if (s[D]) throw new Error('record already exists');
const flagsBefore = s.flags.length;
const F = 'figma-export/npve-workflows-audit-2026-09-05/';

s[D] = {
  _status: 'READ-ONLY AUDIT COMPLETE. Stopped after step 5 as instructed. 26 top-level nodes mapped with refreshed provenance, dated text and cluster evidence; page anatomy decomposed from 4841:18039; 36-row conventions catalog (18 covers, 12 gaps, 5 inventions, 1 decision); sidesheet linkage (45 placements, two page conventions); rebuild-shape proposal with six decisions. No Figma writes; target not opened.',
  date: '2026-09-05',
  workstream: 'NPVE Rebuild / Encounter page',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq page Workflows 105:1426 read only (loadAsync, page never switched)',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only (key inventory 145 sets; nearest-component geometry); Kit ZPf0sJy83aPyrHjCVHomya read only (key inventory 327 sets)',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6 not opened',
  report: F + 'report.md',
  recordGate: 'npveRebuild_extReviewRepairs_2026-09-05 recorded — passed',
  readFirst: ['CLAUDE.md incl. Sheet and comparison techniques', 'npveRebuild_enum_2026-09-02 (Workflows section)', 'LIBRARY-TODOS.md items 1–17', 'PATIENT-HEADER-DISCOVERY.md, PROPOSAL-PATIENT-HEADER-V1.md, PAGE-TEMPLATES.md', 'schema navComponentsOnCompositionsPage, beigeSurfaceInvestigation2026_08_31, insightCardAffordances2026_09_01'],
  stopCondition: 'Stop after step 5. No build. Triggered as planned.',
  step1_map: {
    topLevel: 26,
    provenance: { instances: 7843, kit: 3806, otherRemote: 3304, local: 709, designSystemRebuild: 24, kitPct: 48.5, otherPct: 42.1, localPct: 9.0, dsrPct: 0.31 },
    otherRemoteIs: 'an icon pack (plus 689, Interface, Essential/Delete, Disabled 270, Health, Medicine/* 250 each, close 213) plus an older Tebra library (_icon button template, Icon Button/Default/Small, TemplateMgmt, Edit_light)',
    dsrUseOnlyIn: ['4715:26647 (6)', '4841:17077 (6)', '4841:18039 (9)', '4841:21245 (3)'],
    clusters: {
      pair2922: { members: ['3943:12393', '4317:11594'], evidence: 'same content, same max authored id 4730; 3943:12393 adds annotation components (Note sticky ×2, Bullet ×2) and a 1496-tall inner frame vs 1348; pixel diff 21.5% confined to rows 497–1996 (shift). Neither newer.' },
      nine1429x1013: { members: ['3124:12369', '4841:17077', '4841:18039', '3159:20067', '4296:17197', '4275:15285', '4294:15013', '3159:21282', '4439:16310'], evidence: 'vs 4841:17077: 5.5–5.6% differ (left column + toolbar) for the old-shell members; 4841:18039 11.6% (overlay); Replace_Section_Modal 91.9% (scrim). Recording family members differ from each other by 0.46% (toolbar strip only).' },
      recReadyTrio: { members: ['3124:12369', '4841:17077', '4841:18039'], evidence: '4841:18039 = 4841:17077 + Add Problem overlay 550x948 at x878 + Module Dropdown at x-437; both on the 550-wide Problems-Main shell. 3124:12369 is the 450-wide FHx shell but carries the latest toolbar edits (id prefix 4907: "SOAP", "Otto Octavius", Print).' },
      latestEdited: '3456:11505 Mark As Error_Ready (id prefix 5090): Print, Date pill, SOAP:Modified, Dr. Steven Strange; twin 2745:10131 inside board 3943:13029'
    },
    datedText: 'mock patient DOB 08/01/1994 everywhere; Kit placeholders 1/23/24, 1/27/25; mockup dates to 04/24/26 (addendum) and 5/1/26 (appointment menu); screenshot rectangle named 2026-05-05; DoS 3/26/26 row',
    artefacts: ['899:7657 Module Dropdown hidden loose instance', '3534:17621 loose 24px glyph', '3806:13143 pasted screenshot', '3810:13146 document row', 'two 280-tall board labels', '4841:21245 loose sheet']
  },
  step2_anatomy: {
    bestEvidence: '4841:18039 (clean twin 4841:17077)',
    regions: {
      nav: 'Kit Primary Nav 1429x65 #004852; repeats in all 27 encounter frames (1413 wide on two older board screens)',
      body: '1429x948 VERTICAL padding 16 fill #FBF9F8 (no token)',
      patientHeader: '1397x96 white #D6D6D6 r8 padding 20; identical size and text set in all 27',
      moduleStrip: 'Modules_HFlex local instance 1397x40; three generations (Modules_Left 48, Modules_HFlex frame 64 icon-only, instance 40)',
      mainWrap: '1397x748 H gap 16; LeftCol 450/550/691 (sheet), RightCol 931/831/1397/691',
      noteCard: 'NoteWrapper 831x748 white #D6D6D6 r8: NoteHeader 65 / toolbar 58 / NoteBody 555 / Footer 70',
      pageFooter: 'none on any frame',
      overlays: 'right-docked 550x948 at x878 (square corners, no scrim); AI Note Results 483x948; Edit Problem 550x789; Kit Dialog + scrim'
    },
    candidateShells: ['page frame + backdrop', 'nav bar', 'patient header', 'module strip', 'note card shell with slots', 'two-column MainWrap with left sheet slot']
  },
  step3_catalog: {
    rows: 36,
    libraryCovers: 18, coversWithDelta: 9, libraryGap: 12, inventionInSource: 5, decision: 1,
    newTodoCandidates: { 18: 'Module chip (40 tall, r8, icon+label+close; unselected pill r24)', 19: 'Grouped menu with subheaders (Module Dropdown, appointment date menu)', 20: 'Module card shell with header/toolbar/body/footer slots (Note card)', 21: 'Icon/ShieldLock', 22: 'Icon/Expand', 23: 'Editor toolbar pattern + undo/redo/H1/align/numbered-list glyphs', 24: 'Link chip colour #8657AC / #F0EBF5 (extends TODO 6)', 25: 'Segmented chip (medication/order chips)', 26: 'Menu with inline field and two-line items (TemplateMgmt)' },
    existingTodosCrossReferenced: [2, 3, 6, 9, 14, 16, 17],
    buttonAxisNote: 'Library Button 79:2 has 72 variants, variant = contained | text only; the source white teal-outlined pills map to variant=contained, color=primary (Tebra override renders white with teal outline). Records saying "variant=outlined" describe that variant loosely.',
    inventions: ['auto-saved dot + text', 'transcription status states (radio-dot text, italic in-progress, salmon Ready to Record strip)', 'editor section chrome (grey card, drag handle, Link to Section triangle dropdown)', 'signed-note status block, ORIGINAL label, addendum line', '• separators']
  },
  step4_linkage: {
    placements: 45,
    byVariant: { 'Page=Clin_FHx': 30, 'Page=Clin_Problems-Main': 3, 'Clin_Problems-Edit': 1, 'Page=Clin_MedList': 2, 'Page=Clin_FHX-Editing': 1, summaryLoose: 1, detachedOverlayFrame: 1 },
    hiddenDuplicates: '10 Clin_FHx instances hidden at y672 inside board 3943:12395 and 3943:12402 LeftCols',
    conventions: { inlineLeftColumn: 'sheet is MainWrap LeftCol 450 (older) or 550 (4841 pair); hidden in the recording family so the note spans 1397; white r8 #D6D6D6 card = our Placement=Floating', rightDockedOverlay: 'flush right, full body height, white, square corners, no scrim, no push; widths 550 and 483; our Docked right has 8/0/0/8 corners' },
    noDimBackdrop: true
  },
  step5_proposal: {
    shellOrder: ['Page/Encounter frame + backdrop', 'Nav/Bar (after the nav home decision; GAP placeholder until then)', 'Patient header (source 1397x96 vs Proposals v1 900x72 — decision)', 'Module strip (GAP-marked chips)', 'Note card shell with Header/Toolbar/Body/Footer slots', 'MainWrap with left sheet slot taking existing Sidesheet bodies'],
    inScope: ['4841:17077', '4841:18039', '3456:11505', '3943:12404 (Med List board screen)'],
    history: ['2922 pair', 'General Workflow strip 3943:12395', 'Rec_* family until transcription states are wanted'],
    comparisonSizing: 'DECISION — 1708-wide master with 550 slots cannot hold two 1429 frames; options: stacked page master, 0.5x references (breaks the 1:1 rule), widened slots',
    firstBatch: 'Encounter page shell skeleton on a new Templates section: page frame, backdrop, nav (per decision), patient header (per decision), module strip + GAP marker, MainWrap with Sidesheet Problems Main in the left slot, note card shell with empty body and footer row, one comparison vs 4841:17077. No toolbar, sections or transcription states.'
  },
  decisionsNeeded: ['Nav family home', 'Patient header source vs proposal', 'Right-docked panel corners and 483 width', 'Comparison layout for 1429 references', 'Page canvas colour #FBF9F8', 'Scope: 4841 pair vs later-edited 3124:12369 / 3456:11505; recording family in or out'],
  standingBatchRules: { '1': 'N/A', '2': 'N/A (source not audited for bindings)', '3': 'N/A', '4': 'PASS — false on every walk; hidden duplicates found because of it', '5': 'PASS untouched', '6': 'PASS — enumerated from the page', '7': 'PASS — keys explicit; page identity by 26-child count and ids', '8': 'N/A', '9': 'PASS untouched', '10': 'N/A' },
  figmaMutations: [],
  screenshots: fs.readdirSync('./' + F).filter(f => f.endsWith('.png')).map(f => F + f)
};

const flags = [
  { id: 'npveWorkflows_moduleChipNoLibraryPattern', severity: 'medium', kind: 'GAP', summary: 'The encounter page module strip uses 40-tall r8 closable chips (icon + label + close, #DFEAEC / #8CB2B6 when selected) and r24 grey pills when not; the library Chip is 32 tall r16 and Toggle button is 48 r4, so neither expresses a module chip.', where: 'source Modules_HFlex local instance 4841:18059 and its chips; three generations across the page', handling: 'LIBRARY-TODOS candidate 18. Rebuild with a GAP-marked local strip until the library decides.' },
  { id: 'npveWorkflows_noteCardShellNoLibraryPattern', severity: 'medium', kind: 'GAP', summary: 'The note card (831x748, white, #D6D6D6, r8) has header, toolbar, body and footer bands; library Card (r4, header/media/actions) and Paper have no toolbar or footer slots.', where: 'source NoteWrapper 4841:18065 and Note_Module in every encounter frame', handling: 'LIBRARY-TODOS candidate 20. Build as a local shell with slots, the sidesheet way.' },
  { id: 'npveWorkflows_editorToolbarNoPattern', severity: 'medium', kind: 'GAP', summary: 'The rich-text toolbar (undo, redo, H1, bold, italic, underline, align left, numbered list with hairline separators) is drawn from raw Material Symbol vectors; the library has FormatBold/Italic/Underline and list glyphs but no undo, redo, H1, align or numbered-list glyph and no toolbar composition.', where: 'source TollbarWrap 4841:18131 in every note', handling: 'LIBRARY-TODOS candidate 23 (icons + Toggle button / Button group composition).' },
  { id: 'npveWorkflows_shieldLockGlyphMissing', severity: 'low', kind: 'GAP', summary: 'The note title carries a 40px shield-lock badge (Material shield_lock, #417E86); the library has Icon/Lock and Icon/Unlock but no shield glyph.', where: 'source ShieldSet local component inside NoteHeader 4841:18067', handling: 'LIBRARY-TODOS candidate 21 Icon/ShieldLock.' },
  { id: 'npveWorkflows_expandGlyphMissing', severity: 'low', kind: 'GAP', summary: 'The note header expand control uses Material expand_content; the library has no expand glyph (the Kit has one).', where: 'source I4841:18067;1742:8444', handling: 'LIBRARY-TODOS candidate 22 Icon/Expand.' },
  { id: 'npveWorkflows_groupedMenuNoSubheader', severity: 'low', kind: 'GAP', summary: 'The Module Dropdown (Clinical / Billing headers, 392x480) and the appointment date menu (SELECT APPOINTMENT DATE caption) need menu subheaders; library Menu has four item slots and no subheader.', where: 'source 899:7657 (hidden), 4841:18351 at x-437; date menu in 3456:11505', handling: 'LIBRARY-TODOS candidate 19.' },
  { id: 'npveWorkflows_linkChipColourNoToken', severity: 'low', kind: 'GAP', summary: 'Editor link chips "(FHx) Diabetes (Father)" use #F0EBF5 fill and #8657AC stroke at r4; Chip has no purple colour or r4 outlined form and neither value has a token.', where: 'source 4841:18217, 4841:18233 and every section', handling: 'LIBRARY-TODOS candidate 24; extends TODO 6 colours without a token.' },
  { id: 'npveWorkflows_segmentedChipNoPattern', severity: 'low', kind: 'GAP', summary: 'Medication and order chips on the Med List board are multi-segment ("Start · Sertraline · 50mg · PO · QD · Approve ×"); Chip has a single label.', where: 'source board 3943:12402 screens 558:4260 and 3943:12404', handling: 'LIBRARY-TODOS candidate 25.' },
  { id: 'npveWorkflows_templateMenuInlineField', severity: 'low', kind: 'GAP', summary: 'The Template dropdown panel combines a Save-as text field with a two-line item list; library Menu/Item is one line and Menu has no field slot.', where: 'source TemplateMgmt (other remote) hidden in every note; visible on boards 3943:12393 and 4317:11594', handling: 'LIBRARY-TODOS candidate 26.' },
  { id: 'npveWorkflows_patientHeaderNotInLibrary', severity: 'medium', kind: 'DECISION', summary: 'The patient header band (1397x96, two rows, Restricted text button) repeats identically on all 27 encounter frames; the library has none, the Proposals file holds a v1 composition at 900x72 (built 2026-08-19).', where: 'source 4841:18042; proposals zKT34LQogNjz3Z07fY4VQB page Patient header; PROPOSAL-PATIENT-HEADER-V1.md', handling: 'Decision for Daniel: rebuild at source geometry or adopt the proposal geometry.' },
  { id: 'npveWorkflows_navFamilyHomeBlocksShell', severity: 'medium', kind: 'DECISION', summary: 'The top nav on every encounter frame is a Kit Primary Nav; the library Nav/Bar family exists but its home is unresolved (navComponentsOnCompositionsPage OPEN), so a library-consuming page shell cannot start with it.', where: 'library Nav/Bar 279:92 on Compositions; source 4841:18040', handling: 'Decision for Daniel: settle the Nav family home or accept a GAP-marked placeholder in the first shell batch.' },
  { id: 'npveWorkflows_rightDockedPanelConvention', severity: 'medium', kind: 'DECISION', summary: 'Sheets sit on the page two ways: inline as the 450/550-wide left column, and as right-docked full-height overlays (550 and 483 wide, square corners, no scrim). Our Sidesheet Placement=Docked right has 8/0/0/8 corners and one width.', where: 'source 4841:21482 (550x948 at x878), 4291:14915 (483x948), 4715:28696', handling: 'Decision for Daniel: corner treatment and the 483 width before the overlay states are rebuilt.' },
  { id: 'npveWorkflows_comparisonLayoutFor1429', severity: 'medium', kind: 'DECISION', summary: 'The Rebuild comparison master (1708 wide, 550 slots) cannot hold a 1429-wide reference beside a 1429-wide rebuild with a change log.', where: 'target 35:332', handling: 'Decision for Daniel: stacked page master, 0.5x references (breaks the 1:1 rule of 2026-09-05), or widened slots.' },
  { id: 'npveWorkflows_pageCanvasColourNoToken', severity: 'low', kind: 'DECISION', summary: 'The encounter page body is #FBF9F8 on every frame; the library has no such token and the coded default canvas is beige #E8E5DF (beigeSurfaceInvestigation2026_08_31).', where: 'source Body 4841:18041', handling: 'Decision for Daniel: bind to paper, to the beige default, or add an NPVE-local token per the 2026-09-05 rule.' },
  { id: 'npveWorkflows_moduleDropdownOffCanvas', severity: 'info', kind: 'DECISION', summary: 'Module Dropdown instances are parked at x -437 outside four encounter frames and one hidden loose instance sits at page level; mockup artefacts, not a page convention.', where: 'source 4841:18351, 3124:12669, 4841:17389, 3456:11655, 899:7657', handling: 'Reported. Exclude from scope.' }
];
for (const f of flags) { f.discoveredDuring = D; f.webAppV2BugListCandidate = false; s.flags.push(f); }
s[D].flagsAdded = flags.map(f => f.id);
s[D].flagsBefore = flagsBefore;
s[D].flagsAfter = s.flags.length;
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote', D, '; flags', flagsBefore, '->', s.flags.length);
