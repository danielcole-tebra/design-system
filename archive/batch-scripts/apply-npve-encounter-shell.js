// apply-npve-encounter-shell.js — records npveRebuild_encounterShell_2026-09-06. Backup taken before the batch; re-copied only if missing. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
const B = './design-system-schema.backup-2026-09-06-pre-npve-encounter-shell.json';
if (!fs.existsSync(B)) fs.copyFileSync(P, B);
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const D = 'npveRebuild_encounterShell_2026-09-06';
if (s[D]) throw new Error('record already exists');
const flagsBefore = s.flags.length;
const F = 'figma-export/npve-encounter-shell-2026-09-06/';

s[D] = {
  _status: 'DONE. Encounter page shell skeleton built on Templates section 15 from library parts (Page/Encounter with SCAFFOLDING nav, grey/300 body band, Patient header at the Proposals v1 design, Module strip with GAP-marked chips, MainWrap with the Sidesheet Problems list in the 550 left slot and the Note card shell in the right slot); Rebuild comparison/Page stacked master created; sole comparison placed on Screens section 15 against 4841:17077 with a 2x reference; four GAP markers; twelve-row change log. Toolbar and note body deliberately empty. No stop condition triggered.',
  date: '2026-09-06',
  workstream: 'NPVE Rebuild / Encounter page',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only (variables and components imported by key in-script)',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only (2x export of 4841:17077 through download_assets)',
  _proposalsFile: 'zKT34LQogNjz3Z07fY4VQB read only (Patient header set 12:773 read for geometry and bindings; nothing instanced across files)',
  report: F + 'report.md',
  recordGate: 'npveRebuild_workflowsAudit_2026-09-05 recorded — passed',
  stopCondition: 'Stop if any region needs a drawn stand-in beyond the module chips. One 8px status dot was drawn (recorded, marked); judged inside the rule, not a stop.',
  operatorDecisions_2026_09_06: {
    scope: '4841 pair is the structural reference; toolbar content comes from 3456:11505; recording family = future toolbar variants; boards = history.',
    patientHeader: 'The Proposals v1 design; the divergence from the source two-row card is deliberate and logged.',
    dockedPanels: 'Square corners; 483 logged as a second width.',
    pageComparisons: 'Stacked master (Rebuild comparison/Page).',
    pageBackground: 'Nearest token with a GAP marker.',
    nav: 'GAP placeholder pending the nav family home; LIBRARY-TODOS item 19 added.'
  },
  step1_pageComparisonMaster: {
    id: '434:4858', name: 'Rebuild comparison/Page', size: '2005x2154 hug', layout: 'HORIZONTAL padding/gap bound space/32, fill color/grey/300, clip off; Screens column (Reference above Rebuild, gap 32) + Change log column',
    properties: ['Source caption#434:0', 'Rebuild caption#434:1', 'Change log caption#434:2', 'Reference content#434:3', 'Rebuild content#434:4', 'Change log content#434:5'],
    helpers: { reference: '434:4391 _Rebuild comparison/Page/Reference/Encounter shell (rect 434:4392 1429x1013, image hash 339dd57a8977a7029c9e7cb2ab8d389b614d8592, FILL, 2x export placed at 1x)', rebuild: '434:4393 _Rebuild comparison/Page/Rebuild/Encounter shell (sole Page/Encounter instance 434:4394, transparent)', changeLog: '434:4745 _Rebuild comparison/Page/Change log/Encounter shell (Content card 434:4746 cloned from 254:1896; 12 Change log/Row instances)' },
    referenceEntries: 181
  },
  step2_shell: {
    section: '424:4085 15 · Encounter page shell (Templates, y 31916, 6300x2600)',
    pageEncounter: { id: '429:4161', size: '1429x989 (source 1013; the designed header is 24 shorter)', properties: ['Left slot#429:0 (default Sidesheet 6:65)', 'Right slot#429:1 (default Note card)', 'Patient header#429:2', 'Module strip#429:3'], exposedInstances: ['Patient header', 'Module strip', 'Left slot — Sidesheet', 'Right slot — Note card'], referenceEntries: 139 },
    nav: 'SCAFFOLDING — Nav placeholder 1429x65, fill bound color/primary/main (#004852, exact match to the source bar and to Nav/Bar\'s own fill), dashed hairline bound color/primary/200, label in contrastText. GAP marker 429:6869.',
    bodyBand: 'fill bound color/grey/300 #F6F6F6 as the nearest token for the mockup #FBF9F8 (delta +5/+3/+2 R/G/B); alternatives paper #FFFFFF (+4/+6/+7) and background/default #E8E5DF (far). GAP marker 429:6860.',
    patientHeader: { id: '426:4165', size: '900x72 master (minWidth 900), FILL in the page (1397)', parts: 'Avatar Content=Letter "SS" with the PH-11 letter fill override (grey/900); Identity: Preferred name h3 bold grey/900, Pronouns body2 text/secondary, Restriction wrap (h5 bold error/dark, boolean), Line 2 legal name group (boolean) • Sex • DOB (Age) • Phone • MRN in body2 text/secondary with • in text/disabled; Safety: Icon/AttentionFilled 16 + Severe label/allergens h5 error/dark + Link "View all (13)"; Balance row body2', properties: 13, referenceEntries: 15, content: 'name, pronouns, Restricted, legal name, DOB, age and phone from the source; Sex "Male", MRN, allergens and balance are proposal sample content (the source has no such fields); the source insurer line has no slot', literals: 'paddingTop/paddingBottom 10 (proposal value; Tebra/Dimension has no space/10)', libraryLacks: 'nothing the proposal uses; every part imported (Avatar, Icon/AttentionFilled, Link) and every colour and type value bound' },
    moduleStrip: { id: '426:4214', size: '1397x40', modulesPill: 'library Button contained/primary, Label "Modules", Start icon Icon/Menu, End icon Icon/PlusOutlined (delta: source is a white r8 pill with a widgets glyph, 144x40; ours 122x38 pill)', chipSet: '426:4213 Module chip selected=yes (426:4199, primary/100 fill, primary/200 stroke, radius/md) / selected=no (426:4206, no fill, divider stroke, radius/pill); properties Label, Icon (swap), Show close', chips: 'Chip 1 Note (Icon/Document), Chip 2 Problems (Icon/Clinical), Chip 3 AI Summary unselected (Icon/Lightbulb); exposed as swaps Chip 1/2/3#426:22–24', marker: '429:6878' },
    mainWrap: 'HORIZONTAL gap space/16: LeftCol 550 fixed holding Sidesheet Placement=Floating with Body content = Problems list body State=Closed 155:1559, Title Problems, primary disabled secondary, tertiary "Add Active Problems to Note" (nested label override as on 160:3169); RightCol FILL (831) holding the Note card',
    noteCard: { id: '424:4362', size: '831x748 fixed, paper fill, divider hairline, radius/md', header: '64: Icon button primary + Icon/Lock (shield stand-in, GAP), Title h3 bold text/secondary, spacer, Auto-saved (drawn 8px dot bound success/main + body2 text), Icon button default glyph (expand stand-in, GAP), Icon button + Icon/CloseOutlined', toolbar: '58, empty this batch (Show toolbar boolean)', body: 'FILL, padding space/16, Body content swap defaulting to SCAFFOLDING — Note body placeholder 424:4360 (799x120 dashed grey/500, radius/md)', footer: '74: Form control label + Checkbox checked "Confidential"; Button contained/primary "Charge Capture", "Save & Close"; Split button Size=Medium (color/secondary/main, nested label overridden to "Sign", leading plus hidden); Icon button + Icon/EllipsisFilled (glyph delta: horizontal for the source vertical kebab)', properties: ['Title#424:0', 'Status text#424:1', 'Body content#424:2', 'Show footer#424:3', 'Show toolbar#424:4'], referenceEntries: 32, marker: '429:6887 (shield, expand, drawn status dot)' }
  },
  step3_comparison: { section: '429:6859 15 · Encounter page shell comparison (Screens, y 26738, 2600x2500)', instance: '434:7474 Page comparison — Encounter page shell, 2005x2154, sole placement', caption: 'Source: zVsuhYehoSLLq880qRBFkq 4841:17077, exported 2026-09-06', markers: ['429:6860 Page background colour', '429:6869 Nav placeholder', '429:6878 Module chips', '429:6887 Note header glyphs'] },
  step4_changeLogRows: [
    'Patient header | Big two-row card with the insurer line → the newer designed header band (name, restriction, details, allergies, balance) | Deliberate: the proposal design replaces the mockup band',
    'Nav bar | Teal bar with app icons and search → teal placeholder bar, dashed | The library nav parts have no settled home yet; marked as a gap',
    'Module chips | Drawn chips → local chips, marked | The library chip cannot be 40 tall with a close; marked as a gap',
    'Modules button | White square-cornered pill with a grid glyph → library pill with menu and plus glyphs | Shared button; the glyph differs',
    'Page background | Warm off-white typed in by hand → nearest library grey | No token matches; marked as a gap and flagged to product',
    'Left column | Problems panel drawn in the mockup → our rebuilt Problems sheet | Same panel, already rebuilt; 600 tall instead of 517',
    'Note title badge | Shield with a lock → lock in a round button | The library has no shield glyph; marked as a gap',
    'Expand button | Expand arrows → plain round button | The library has no expand glyph; marked as a gap',
    'Toolbar | Template, Assigned To and recording pills → empty strip | Next batch',
    'Note body | Grey editor card with sections → empty placeholder | Next batch',
    'Footer | Drawn buttons and a checkbox → library buttons, split button and checkbox | Shared parts; the more button shows a horizontal ellipsis',
    'Page height | 1013 tall → 989 tall | The designed header is 24 shorter than the mockup band'
  ],
  step5_verification: {
    regionCompare: 'source-over-rebuild crops for nav, patient header, module strip, left column, note header, note footer (region-*.png); deltas listed in the report',
    pixelFixes: ['Badge variant=dot anchors to a child corner and sat 4px off the text line → replaced by a drawn 8px dot (recorded, marked)', 'Split button carried a leading plus glyph → hidden; caret kept; nested label "New Note" → "Sign"', 'two centred labels at x 164.5 / y 22.5 → 164 / 22 by fixing the text box'],
    audits: { templatesSection15: '1126 nodes, 0 unbound solid paints outside remote instances, 0 fractional after the label fix, 0 hidden non-boolean layers, 0 loose stacks', screensSection15: '396 nodes, 0 unbound, 0 fractional after the fix', archive: '1528 nodes, 0 unbound', cover: '8 nodes, 1 unbound (1:5, pre-existing flag)', literals: 'Patient header padding 10 (no token); Module chip set container chrome 24' },
    referenceCounts: { 'Note card 424:4362': 32, 'Patient header 426:4165': 15, 'Module chip 426:4213': 6, 'Module strip 426:4214': 17, 'Page/Encounter 429:4161': 139, 'Rebuild comparison/Page 434:4858': 181, 'Sidesheet variants': '70 each, unchanged', 'Problem summary row': '6, unchanged' },
    screens: '15 Sidesheet occurrences and 15 comparisons on Screens; no detached instance; Sidesheet Body content preferred values 11 (unchanged by this batch)'
  },
  unrecordedWorkFound: 'Templates 412:3888 and Screens 415:7207 "14 · Health Status/Observations" (external batch, ids 412–415, helpers named "Rebuild helper · …" / "Reference helper · …") exist with no schema record. Not touched; this workstream\'s gate is the Workflows audit, which is recorded. Flagged.',
  standingBatchRules: {
    '1_instancePaintVerification': 'PASS — every new master rendered through its placed instance (shell → comparison → Screens); paints bound at master and instance.',
    '2_unboundPaintAudit': 'PASS with the known cover exception — Templates section 15 and Screens section 15 walked node by node; Archive and Cover walked; 0 new unbound; section chrome #E4E4E4 by recorded direction.',
    '3_referenceCounts': 'PASS — counts above; Module chip variants built fresh, no clone; Sidesheet 70 per variant unchanged.',
    '4_skipInvisibleFalse': 'PASS — set on every walk.',
    '5_opacityLast': 'PASS — no paint opacity authored.',
    '6_enumerateDontRecall': 'PASS — section extents, keys, and property names read from the files before each write.',
    '7_fileIdentityFirst': 'PASS — keys explicit; pages Cover 0:1 / Templates 3:2 / Screens 27:2 / Archive 126:2.',
    '8_roundWithRecord': 'PASS — 0 fractional authored geometry after the label fix; patient header padding 10 recorded as a literal.',
    '9_boundPaintAlpha': 'PASS — untouched.',
    '10_cloneDropsPropertyRefs': 'PASS — clones limited to the GAP marker frame and the Content card frame (no property references); moved nothing.'
  },
  counts: { GAP: 4, DEFECT: 0, rows: 12, newMasters: 8 },
  screenshots: fs.readdirSync('./' + F).filter(f => f.endsWith('.png')).map(f => F + f)
};

const flags = [
  { id: 'npveEncounter_unrecordedHealthStatusBatch', severity: 'medium', kind: 'DECISION', summary: 'A "14 · Health Status/Observations" section exists on Templates (412:3888) and Screens (415:7207) with a body, helpers and a comparison, and no schema record; its helpers are named "Rebuild helper · …" / "Reference helper · …" instead of the _Rebuild comparison pattern.', where: 'target 412:3889, 413:7010, 415:4050, 415:7108, 415:7208', handling: 'Rule 7/10: the next sidesheet batch must refuse until this one is recorded; naming to be aligned in that record.' },
  { id: 'npveEncounter_patientHeaderPadding10NoToken', severity: 'low', kind: 'GAP', summary: 'The Patient header (proposal geometry) needs 10px vertical padding; Tebra/Dimension has no space/10, so the value is a literal.', where: 'target 426:4165', handling: 'Library to-do: add space/10 or restate the proposal at 8/12; recorded as a literal until then.' },
  { id: 'npveEncounter_splitButtonLabelNotAProperty', severity: 'low', kind: 'DEFECT', summary: 'Library Split button exposes only Size and State; its label ("New Note") and leading plus are fixed nested content, so consumers override nested text and hide the plus by instance override.', where: 'library 627:161; target 424:4417', handling: 'Library to-do: Label text property and a Start icon boolean on Split button.' },
  { id: 'npveEncounter_badgeDotCannotSitInline', severity: 'low', kind: 'GAP', summary: 'Badge variant=dot anchors an 8px dot to the top-right of a 24px child; an inline status dot before text is not expressible, so the note header carries a drawn 8px ellipse bound to color/success/main.', where: 'target Note card 424:4362 › Auto-saved; marker 429:6887', handling: 'Library to-do: a standalone status dot (Badge without child) or a status-text pattern.' },
  { id: 'npveEncounter_iconButtonDefaultGlyphAsExpand', severity: 'info', kind: 'GAP', summary: 'With no expand glyph, the note header expand control is an Icon button showing its default glyph (a caret).', where: 'target 424:4362 › Expand; marker 429:6887', handling: 'Resolved by LIBRARY-TODOS candidate 22 (Icon/Expand).' },
  { id: 'npveEncounter_modulesPillGlyphDelta', severity: 'info', kind: 'DECISION', summary: 'The Modules pill uses Icon/Menu and Icon/PlusOutlined on a library Button (pill, 122x38); the source is a white r8 144x40 pill with a Material widgets glyph.', where: 'target 426:4214 › Modules', handling: 'Reported; no library action unless a grid/widgets glyph is wanted.' }
];
for (const f of flags) { f.discoveredDuring = D; f.webAppV2BugListCandidate = false; s.flags.push(f); }
for (const f of s.flags) if (f.id === 'npveWorkflows_moduleChipNoLibraryPattern' || f.id === 'npveWorkflows_navFamilyHomeBlocksShell' || f.id === 'npveWorkflows_pageCanvasColourNoToken' || f.id === 'npveWorkflows_shieldLockGlyphMissing' || f.id === 'npveWorkflows_expandGlyphMissing' || f.id === 'npveWorkflows_patientHeaderNotInLibrary' || f.id === 'npveWorkflows_comparisonLayoutFor1429' || f.id === 'npveWorkflows_rightDockedPanelConvention') { f.decision_2026_09_06 = 'See ' + D + '.operatorDecisions_2026_09_06; marked or applied in that batch.'; }
s[D].flagsAdded = flags.map(f => f.id);
s[D].flagsBefore = flagsBefore;
s[D].flagsAfter = s.flags.length;
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote', D, '; flags', flagsBefore, '->', s.flags.length);
