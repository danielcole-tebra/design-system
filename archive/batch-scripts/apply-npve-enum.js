// apply-npve-enum.js — records the read-only enumeration of the NPVE rebuild SOURCE file
// (zVsuhYehoSLLq880qRBFkq, "NDE-2026") as batch npveRebuild_enum_2026-09-02, with a backup first.
// Data file: figma-export/npve-enum-2026-09-02/enum-data.json (built by the scratchpad classify step).
// Per CLAUDE.md Recording: findings go to BOTH the dated record and flags[].
const fs = require('fs');
const P = './design-system-schema.json';
const DATA = './figma-export/npve-enum-2026-09-02/enum-data.json';
const BACKUP = './design-system-schema.backup-2026-09-02-pre-npve-enum.json';

fs.copyFileSync(P, BACKUP);
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const d = JSON.parse(fs.readFileSync(DATA, 'utf8'));
const names = d.otherNames;

if (s['npveRebuild_enum_2026-09-02']) throw new Error('batch entry already exists; refusing to overwrite');

// ---- classify the "other" remote keys into name-pattern groups (observation only, no library identity claimed)
function group(prefix) {
  const [n, parent] = names[prefix] || ['?', null];
  if (/^(Interface, Essential|Health, Medicine|Arrows, Diagrams|Content, Edit|School, Learning|Science|Weather, Climate|User|Payments, Finance|Travel|Phones|Navigation, Maps|Shopping, Ecommerce|Support, Help, Question|Cursor)\//.test(n)) return 'categorisedIconPack';
  if (n === 'Style=Outlined' || n === 'Style=Filled') return 'materialStyleIcons';
  if (['Check-Circle','SectionMgmt','Modules','Note','Bullet','ThumbsUp','ThumbsDown','GreyscaleCheck','PatientCard','TD','Balance','Alerts','Allergies','Restricted','Checkmark','Breadcrumbs','Breadcrumb Buttons','Checkbox','Autocomplete Select Field','Badge','nav / payments','Divider'].includes(parent) || /^(Sidesheetv3|Modules\/|Canvas Tools|TemplateMgmt|Report Drawer|FilterBar-Demo|ConfigAndData)/.test(n)) return 'namesMatchingLocalOrProductComponents';
  return 'kitStyleNamesNotInCurrentKitCanvas';
}
const otherGroups = {};
for (const [p, c] of Object.entries(d.otherPrefixes)) {
  const g = group(p); otherGroups[g] = otherGroups[g] || { instances: 0, keyCount: 0, examples: [] };
  otherGroups[g].instances += c; otherGroups[g].keyCount++;
  if (otherGroups[g].examples.length < 12) otherGroups[g].examples.push((names[p][1] ? names[p][1] + ' / ' : '') + names[p][0]);
}

const pages = d.pages.map(p => ({
  id: p.id, name: p.name, topLevelCount: p.topLevelCount,
  screenshot: p.frames.length ? `figma-export/npve-enum-2026-09-02/${p.screenshot}` : null,
  frames: p.frames.map(f => ({
    name: f.name, id: f.id, type: f.type, x: f.x, y: f.y, w: f.w, h: f.h,
    isSection: f.type === 'SECTION', parentSection: f.parentSection, visible: f.visible,
    instances: { total: f.instances, designSystemRebuild: f.rebuild, tebraWorkingUiKit: f.kit, otherRemote: f.other, local: f.local, missingMain: f.missingMain }
  }))
}));

const totals = { instances: 0, designSystemRebuild: 0, tebraWorkingUiKit: 0, otherRemote: 0, local: 0 };
for (const p of d.pages) for (const f of p.frames) { totals.instances += f.instances; totals.designSystemRebuild += f.rebuild; totals.tebraWorkingUiKit += f.kit; totals.otherRemote += f.other; totals.local += f.local; }

const nameHits = []; const dupes = []; const textHits = [];
for (const p of d.pages) {
  for (const h of p.nameHits) nameHits.push({ page: p.name, pageId: p.id, ...h });
  for (const x of p.dupes) dupes.push({ page: p.name, pageId: p.id, ...x });
  for (const t of (p.text || [])) textHits.push({ page: p.name, string: t[0], count: t[1], insideRemoteInstances: t[2], frames: t[3], authoredTextIds: t[4] });
}

s['npveRebuild_enum_2026-09-02'] = {
  _status: 'READ-ONLY ENUMERATION COMPLETE. Stopped after step 5 as instructed. No writes of any kind to the source file; the target file was not opened.',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq (NDE-2026) — read only',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6 (NPVE Rebuild) — not touched in this batch',
  date: '2026-09-02',
  fileIdentityCheck: 'Source page list (18 pages, first page "Cover", second "-----DESIGNS-----") does not match figmaBuild.pages._order, so this is confirmed NOT the library. The two library files were opened read-only for key inventories only.',
  method: {
    walk: 'Per page, PageNode.loadAsync() then page.children. setCurrentPageAsync was deliberately NOT used so the user\'s current-page view state was never changed. figma.skipInvisibleInstanceChildren=false set at the top of every script (runtime flag, not file data).',
    instanceProvenance: 'Every INSTANCE under each top-level node (nested instances included) resolved to its main component. remote=false counted as local. remote=true keys matched by their first 8 hex chars against key inventories of Design System Rebuild (657 components/sets across 11 pages) and Tebra Working UI Kit ZPf0sJy83aPyrHjCVHomya (1674 across 12 pages). Zero prefix overlap between the two inventories.',
    inventoryCaveat: 'Both inventories are of components ON CANVAS today. A published component that has since been deleted from a library canvas would classify here as "other remote", not as that library.',
    textScan: 'TEXT nodes under each top-level node tested against /old|v\\d+|archived?|deprecated|wip|draft|do not use|legacy|obsolete|19xx|20xx|d/d/yy/. Hits inside remote instances (node ids starting "I") are library placeholder copy, not text authored in this file, and are marked insideRemoteInstances.',
    screenshots: 'get_screenshot on each page id, 1600px long edge, saved under figma-export/npve-enum-2026-09-02/. Every image was opened and looked at.'
  },
  screenshotsLookedAt: 'Yes. Notable in pixels: Workflows is a tall column of black-backdrop section boards (Sidesheet View, General Workflow x2, Prototype, Med List, Signed Note, New Create Flow, Mark As Error, Select Appointment Date, Recording/Transcription Live); Error States is a grid of 1429px encounter screens each with a modal; NeuNeu holds a "Menus / IA" board plus new-shell screens with a dark left rail; Neu holds older shell screens with a light rail and a colour swatch column; Sandbox has a "Megamenu" board; Maps is an all-text "Object Map"; Research Framework is a timeline table.',
  enabledTeamLibrariesWithVariables: ['Design System Rebuild :: Tebra/Color', 'Design System Rebuild :: Tebra/Dimension', 'Design System Rebuild :: Tebra/Typography'],
  pageCount: 18,
  emptySeparatorPages: ['-----DESIGNS----- (10:15)', '-----COMPONENTS----- (21:320)', '-----ARCHIVE----- (105:1425)', '-----RESEARCH------ (4211:15272)'],
  sectionsFound: 0,
  pages,
  provenanceSummary: {
    totals,
    reading: 'Of 22,337 instances, 598 (2.7%) resolve to Design System Rebuild, 10,766 (48.2%) to the deprecated Tebra Working UI Kit, 9,629 (43.1%) to remote components in NEITHER inventory, 1,344 (6.0%) to local components. Rebuild usage is concentrated on NeuNeu (Icon/* and Button variants) and the NeuNeu SideRail/NavStack area; nearly every other screen is kit-built.',
    otherRemoteGroups: otherGroups,
    otherRemoteObservation: 'Four name patterns among the 207 "other" keys: (1) a categorised icon pack ("Interface, Essential/…", "Health, Medicine/…"); (2) Material-style "Style=Outlined" icons (calendar_today, expand_more, add); (3) components whose parent-set names match component sets that exist LOCALLY on this file\'s ⚙️ Components page (SectionMgmt, Check-Circle, Modules, Sidesheetv3, TemplateMgmt) — consistent with this file being a duplicate of, or consuming, an earlier NDE file; (4) kit-style names (close, plus, security, "Icon Button/Default/Small/…", "_icon button template", Badge, Divider) whose keys are not in the kit canvas today. Which files these come from is NOT determined here; the plugin API exposes no library file key for a remote component. Reported, not resolved.'
  },
  staleness: {
    _rule: 'Evidence only. Nothing here decides which frames are current.',
    pageNames: nameHits.filter(h => h.kind === 'page'),
    frameAndNodeNames: nameHits.filter(h => h.kind !== 'page'),
    nearDuplicates: dupes,
    visibleText: textHits,
    textReading: 'Nearly all date strings are sample patient data (DOB 08/01/1994, lab dates 5/25/25–7/18/25) repeated through the kit\'s note template; those inside remote instances are library defaults. Authored-in-file items of note: "2026 // Charts" on the Cover; "Status: Signed Final … Signed: 03/03/2026" and "04/24/26 11:46 AM" on Workflows; "DRAFT • 08/09/2025" and "Dates: 08/09/2025" on ⚙️ Components frame "8" (968:14874); "Draft" text on Neu 2147:7397 and Components 129:7490/129:7542; "Archived" on NeuNeu Autocomplete frame 4797:20527; "February 2021"/"March 2021" on Error States E-06; "February 31, 2026" (a non-existent date) on Misc 4250:15000; "Encounter - Aug 21 2026" throughout NeuNeu; a rectangle named "Screenshot 2026-05-05 at 9.44.35 AM 1" on Workflows.'
  },
  caveats: [
    'Sections: none exist in the source; every top-level node is a FRAME, COMPONENT, COMPONENT_SET, INSTANCE, GROUP, TEXT, RECTANGLE or SLICE.',
    'Instance counts include instances nested inside instances (an icon inside a button counts as its own instance).',
    'Two large kit component sets on ⚙️ Components dominate counts: Sidesheetv3 (129:6647) alone holds 4,722 instances.',
    'Elements inside frames were not inventoried and nothing was mapped to library components, per instruction.'
  ]
};

// ---- flags[] (findings only, per CLAUDE.md Recording)
const D = 'npveRebuild_enum_2026-09-02 (read-only source enumeration)';
const F = [];
F.push({ id: 'npveSource_pageNameV2', severity: 'info', discoveredDuring: D, summary: 'Source page "V2:AI Patient Summary" (3813:14586) carries a version token in its name.', where: 'NDE-2026 zVsuhYehoSLLq880qRBFkq, page 3813:14586', detail: 'One 1440x900 frame "AI Note - Vew Patient Details (All Cards)" 3813:15084, 109 instances, all remote, none from Design System Rebuild. "Vew" is as-named.', webAppV2BugListCandidate: false, handling: 'Reported as staleness evidence; not interpreted.' });
F.push({ id: 'npveSource_archiveSeparatorPage', severity: 'info', discoveredDuring: D, summary: 'Page "-----ARCHIVE-----" (105:1425) exists as an empty separator; the six pages that follow it (NeuNeu, Neu, Sandbox, Misc, NoFolder Navigation, Folder Navigation) sit under it in page order.', where: 'NDE-2026, page order positions 9-15', detail: 'The separator holds 0 nodes. Whether the pages after it are archived is a page-order convention only; nothing in node data says so.', webAppV2BugListCandidate: false, handling: 'Reported, not decided.' });
F.push({ id: 'npveSource_neuNeuNeuNaming', severity: 'info', discoveredDuring: D, summary: 'Pages "Neu" (1424:8259) and "NeuNeu" (4740:14057) are named as successive generations; Neu also holds component set "SIDENAV-FUTURE" (2230:8575) and NeuNeu holds frame "With Legacy Nav" (4745:17168).', where: 'NDE-2026 pages 4740:14057 and 1424:8259', detail: 'NeuNeu is the only page with material Design System Rebuild usage (Icon/*, Button, Text field keys). Neu screens are 1280x768/1156x768/1308x768 with 0 Rebuild instances.', webAppV2BugListCandidate: false, handling: 'Reported as naming evidence; no decision on currency.' });
F.push({ id: 'npveSource_screenshotRectangleDated', severity: 'low', discoveredDuring: D, summary: 'Workflows holds a top-level RECTANGLE named "Screenshot 2026-05-05 at 9.44.35 AM 1" (3806:13143, 1458x106).', where: 'NDE-2026, page 105:1426', detail: 'A pasted bitmap at page level next to frame "Frame 758532132" (3810:13146, 758x116).', webAppV2BugListCandidate: false, handling: 'Reported.' });
F.push({ id: 'npveSource_nearDuplicateFrames', severity: 'low', discoveredDuring: D, summary: 'Same-name and same-size top-level frames recur on six pages: Error States has six frames named "Transcription service disconnected" and eleven at 1429x766; Workflows has three "Rec_Ready" and nine at 1429x1013; NeuNeu has six "Sidesheetv3"; Neu has three "CONTAINER", two "SidePanelExpand1", two "SidePanelDpand2"; Sandbox has two "Main", two "Active AI Note", four "MegaMenu2", two "MegaMenu3"; NoFolder Navigation has two "Main".', where: 'NDE-2026; node ids in npveRebuild_enum_2026-09-02.staleness.nearDuplicates', detail: 'Two of the Error States duplicates (4508:23664 and 4508:24088) share the exact position 16,3244 and differ by one instance, so one fully covers the other on canvas. Sandbox Main 112:4336 and 112:4605 have identical instance signatures.', webAppV2BugListCandidate: false, handling: 'Listed with ids; which is current is not decided here.' });
F.push({ id: 'npveSource_draftAndArchivedLabels', severity: 'info', discoveredDuring: D, summary: 'Authored text containing "Draft"/"DRAFT"/"Archived"/"Signed Final" with dates appears on ⚙️ Components (968:15022 "DRAFT • 08/09/2025"; 129:7490, 129:7542 "Draft"), Neu (2147:7397 "Draft"), NeuNeu (4797:20527 "Archived") and Workflows (2175:9406 "Status: Signed Final … 03/03/2026").', where: 'NDE-2026; ids listed', detail: 'These read as product copy inside mockups rather than canvas annotations, but the instruction was to list any matching visible label. "Save as Draft" (kit button default) appears 100+ times inside remote instances and is not authored here.', webAppV2BugListCandidate: false, handling: 'Reported.' });
F.push({ id: 'npveSource_impossibleDateInMock', severity: 'info', discoveredDuring: D, summary: 'Misc frame "Appointment Selection" (4250:15022) lists "February 31, 2026" (4250:15000).', where: 'NDE-2026, page 4250:14678', detail: 'Sample copy; noted because dated strings were in scope.', webAppV2BugListCandidate: false, handling: 'Reported.' });
F.push({ id: 'npveSource_libraryProvenanceSplit', severity: 'high', discoveredDuring: D, summary: 'Only 598 of 22,337 instances in the source (2.7%) come from Design System Rebuild; 10,766 come from the deprecated Tebra Working UI Kit and 9,629 from remote components in neither library inventory.', where: 'NDE-2026, all pages; per-frame counts in npveRebuild_enum_2026-09-02.pages', detail: 'The 9,629 "other" instances span 207 component keys in four name patterns (icon pack, Material-style icons, sets whose names match this file\'s own local sets, kit-style names absent from the kit canvas). The plugin API cannot name the owning library file. Both library inventories are of on-canvas components only, so deleted-but-published components would land in "other".', webAppV2BugListCandidate: false, handling: 'Reported for the rebuild plan; no mapping attempted, per instruction.' });
F.push({ id: 'npveSource_fullyCoveredFrame', severity: 'low', discoveredDuring: D, summary: 'Error States frames 4508:23664 and 4508:24088 are both 1429x766 at exactly (16, 3244); the later one sits on top and hides the earlier one completely.', where: 'NDE-2026, page 1050:8411', detail: 'Instance counts 166 vs 165 with otherwise identical signatures.', webAppV2BugListCandidate: false, handling: 'Reported.' });
for (const f of F) { if (s.flags.some(x => x.id === f.id)) throw new Error('flag id collision ' + f.id); s.flags.push(f); }

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote batch npveRebuild_enum_2026-09-02; flags added:', F.length, '; flags total:', s.flags.length, '; backup:', BACKUP);
