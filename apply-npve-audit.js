// apply-npve-audit.js — records npveRebuild_audit_2026_09_03. Read-only audit of all target work since the pause record.
// Record and flags only, no Figma writes. Backup first. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-03-pre-npve-audit.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s.npveRebuild_audit_2026_09_03) throw new Error('record already exists');
const D = 'npveRebuild_audit_2026_09_03';
const flagsBefore = s.flags.length;

s[D] = {
  _status: 'DONE. Read-only audit of every target change since npveRebuild_pause_2026_09_03. No Figma node created, moved or edited in any file; pages loaded with loadAsync only. Writes: this record, 13 flags, figma-export/npve-audit-2026-09-03/report.md, eight screenshots.',
  date: '2026-09-03',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6 read only',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only (variable ids, Text field 130:140/130:159, Icon button 170:77, Icon/FavoritesOutlined 575:17, component keys)',
  _sourceFile: 'not opened',
  report: 'figma-export/npve-audit-2026-09-03/report.md',
  fileIdentity: {
    pages: ['Cover 0:1', 'Templates 3:2', 'Screens 27:2', 'Archive 126:2'],
    localVariables: 0,
    nodesWalked: { Cover: 8, Templates: 2284, Screens: 1163, Archive: 872 },
    ownNodeSessions: '1 → 172; sessions 74–78 and 88+ post-date the pause; no own node in session 997'
  },
  step1_records: {
    recordsSincePause: ['libraryTodos_readOnly_2026_09_03', 'libraryTodos_write1_2026_09_03', 'libraryTodos_write2_2026_09_03'],
    flagsSincePause: '6, all discoveredDuring libraryTodos_readOnly_2026_09_03',
    finding: 'No record, apply script, report folder, flag or commit exists for: page restructure into sections and the Archive page; Problems picker body → variant set 94:812; Problem row → variant set 107:485; Problem summary row 153:1186; Problems list body 156:2426; Rebuild comparison 35:332 → instance-swap shell with twelve _Rebuild comparison/* sub-components; comparison instances 116:498, 116:1338, 160:3169, 160:3680; Sidesheet instances 156:2428, 156:2707; markers moved to Archive; legacy comparisons detached into Archive; _Legacy renames of 4:13 and 26:208; Recovery checks 142:996.',
    write2Evidence: 'libraryTodos_write2 rule 8 re-run read Screens 27:2 with 6 top-level nodes and rows under 27:6, so 27:6 was still on Screens after the last record.',
    recoveryChecks: '142:996 holds one node, 130:1185, an instance of 35:332 at master defaults (Problems · Recent content, caption "4618:4930, exported 2026-09-02"). No note or differing text. Nothing on disk mentions Recovery (grep 0 hits). What it recovered from is unrecorded. Section stroke white 10% vs black 10% elsewhere.'
  },
  step2_splitBrain: {
    promptIds: 'VariableID 10:104, 75:689, 18:101, 75:690 do not resolve with or without the key prefix; the Plugin API cannot enumerate a consumer file\'s subscription table, only bound ids.',
    boundIdForm: 'VariableID:<library key>/<suffix>; suffix is not the library variable id (library space/8 = 74:78; consumer binds …/74:297 and …/997:15).',
    suffixSessions: { '74': 'all colour, typography, radius, border, size/button refs, plus four old space refs', '116': 'font/lineHeight/h3 only', '997': 'every current space/* ref; matches the library session that edited all space/* and created space/32 (VariableID:997:2) in write2' },
    doubleBoundKeys: { 'space/8': ['74:297', '997:15'], 'space/6': ['74:289', '997:12'], 'space/7': ['74:293', '997:14'], 'space/17': ['74:321', '997:26'] },
    singleBoundSpace: 'space/0, 3, 4, 5, 9, 12, 14, 16, 18 bind under 997 only; the prompt\'s space/16 and space/12 duplicates are not visible in bindings.',
    whereOldRefsLive: 'Only inside instances of Button 3:105 (padding space/17, space/7; gap space/8; per-variant space/6) and in the master of orphaned Icon button 6:7 (space/8 × 4). In Sidesheet 6:65 the 15 old refs are the footer Buttons 6:85, 6:93, 6:101.',
    components: {
      button: { key: 'cfb726c79b456d52901243b7c33839efd0780a93', library: '79:2', copies: { '3:105': 'old, 74-series refs, 72 variants', '155:1191': 'new, 997 refs, 72 variants' } },
      iconButton: { key: '7ebea5d7ce6ecfdaef84d177efa64196f654717d', library: '170:77', copies: { '6:7': 'old, 74-series refs, 0 instances', '77:1104': 'new, 997 refs' } }
    },
    why: 'Same key on both copies: not a republish under new ids and not a rename. The consumer holds two subscription versions of one component. Session-77 nodes (Text field 77:697, Tabs 77:650, Tabs/Tab 77:639, Icon button 77:1104) are instanced by session-26 nodes, the signature of an accept-updates pass that re-created reference nodes; Button was not in write1 so 3:105 stayed stale, and the session-155 Problems management build pulled a fresh Button that Figma could not dedupe against it. Inference from ids; no log confirms it.',
    instanceCounts: {
      'Button 3:105': { Templates: 30, Screens: 18, Archive: 10, total: 58, who: 'every Sidesheet footer (Cancel, Save & Add to Note, Save): master, 4 template instances, 6 Rebuild sub-components, 5 comparison instances, 2 Screens Sidesheets, 2 legacy screens, Coral check 3:397' },
      'Button 155:1191': { Templates: 4, Screens: 4, Archive: 0, total: 8, who: 'Create New Problem in Problems list body and its placements' },
      'Icon button 6:7': { total: 0 },
      'Icon button 77:1104': { Templates: 120, Screens: 28, Archive: 34, total: 182 }
    },
    legacyVsNew: 'NO clean split: the new Problems management screens carry both Button copies at once (3 × 3:105 in the footer, 1 × 155:1191 in the toolbar). Legacy screens carry 3:105 only.',
    nextUpdate: 'A Button republish + accept updates should re-point all 58 on key; until then importComponentByKeyAsync returns 155:1191 and swaps between copies read as different components. No render divergence today.'
  },
  step3_publishState: {
    textFieldSmall: 'Resting label y 9, hidden Label slot 40 on 27:6 (I27:6;6:80;26:222), 40:252 (I40:252;6:80;94:653) and on all six Screens frames; library masters 130:140/130:159 read the same. Write1 fix landed on old and new screens alike.',
    tabLabel: 'TITLE on the archived screens (step3-legacy-screen-27-6-1x.png).',
    iconButtonGlyph: 'No fixed value exists: the library was not changed (read batch ruled 573:3583 exempt). Library 575:17 still 20.000025 × 19.125002; every target swap reads the same. Icon child 24 × 24 at (8,8) in 40 × 40 everywhere.',
    ordering: 'Accepted components are session-77 nodes; sets 94:812, 107:485, shell 114–116, Problems management 152–172 all instance them. Updates were accepted before the new screens and before the Button duplication (session 155).'
  },
  step4_newComponents: {
    problemSummaryRow_153_1186: {
      props: ['Name#153:0', 'Code#153:1', 'Status#170:0'], refs: 3, nodes: 16, nestedInstances: 0,
      drawn: 'Edit problem 170:1607 and Add to note 170:1611 are 40 × 40 frames holding VECTOR "Touch target" rings (39 × 39 at 0.5,0.5, stroke #8CA7A2 1px), pencil vectors (#004852) and note vector (#417E86). Not Icon button instances; the ring convention (plain button + DEFECT marker) is not followed.',
      unboundPaints: 9, rawHex: ['#8CA7A2', '#3FA266', '#417E86', '#004852', '#000000', '#FFFFFF'],
      statusText: '170:1591 Akkurat LL Bold 14, lineHeight AUTO, fill #3FA266 unbound, no typography bindings — the only text in the target with none.',
      changeLogClaim: 'Problems list change log row "Hand-drawn controls → published library instances" is not true for these two controls.',
      rule8: '0 non-exempt hits'
    },
    problemsListBody_156_2426: {
      variants: ['155:1559 State=Closed', '156:1294 State=Open'], refs: [24, 35],
      nested: 'Button 155:1191, Text field 77:697 (Status filter 154 × 40), Checkbox 155:1491 × 2, Problem summary row 153:1186 × 3, Divider 6:62 × 3, Menu 156:1283 + Menu/Item 156:1268 × 4 on State=Open (keys match library Menu 749:323 and Menu/Item 152:15).',
      statusMenu: 'Uses the imported library Menu and Menu/Item.',
      unboundPaints: '16 inner frames fill #FFFFFF unbound (Toolbar, Filters, No known problems, Only show active problems, Status groups, Problem — Active/Resolved/Marked as error, both variants); variant roots bind paper.',
      hiddenCommentText: 'Only inside Text field instances at library nodes 130:149/130:168 ("Multiline rows", hidden). Library-inherited; 20 such texts in library set 121:350.'
    },
    problemRow_107_485: { variants: 6, refs: '4 on each', nested: 'Icon button 77:1104 × 2 per variant (Trailing action hidden on Action=None)', unbound: 0, fractional: 0, verdict: 'clean' },
    problemsPickerBody_94_812: { variants: ['26:221 Recent', '94:639 All', '94:652 Favorites'], refs: '36 on each', unbound: 0, fractional: 0, note: 'Each variant still carries three Tabs instances with two hidden (6 dead Tabs across the set), redundant with the variant axis.' },
    rebuildComparison_35_332: {
      shape: 'COMPONENT 1708 × 1290, gap/padding 32 literal, fill color/grey/300 bound; props: three TEXT captions + three INSTANCE_SWAP slots; refs 104; each column keeps a hidden __Legacy placeholder frame.',
      subComponents: 12,
      referenceImages: { '114:777 Recent': '1100 × 1200 px in 550 × 600 (2x), hash = legacy 36:261', '114:897 Favorites': '550 × 600 px (1x), caption "4618:5137, refreshed 2026-09-03"', '160:1323 Main': '550 × 517 px (1x) FILL, 83 px blank', '160:1325 Status menu': '550 × 510 px (1x) FILL, 90 px blank, cursor in export' },
      ruleTension: 'Rules 14/15 say placed change log and comparison are detached frames; the restructure makes them instances with per-screen content sub-components. Unrecorded convention change.'
    }
  },
  step5_duplication: {
    finding: 'Screens inside 116:498 and 116:1338 are separate instance trees, not references. componentProperties, 31 text characters and hidden-node lists are identical to 27:6 / 40:252. Recent content now exists at 27:6 (Archive), 114:780 (Templates master) and via instancing at 116:498 and 130:1185; Favorites at 40:252 and 114:900. Corrections must go to the Templates sub-component masters; Archive copies will not follow.'
  },
  standingRules: {
    '1': 'not run (no placement); rendered paints read on existing placements instead',
    '2': 'all pages: target-authored unbound = 27, all on Problems management components; section chrome and the pre-existing cover fill excluded',
    '3': 'Problem row 4×6, picker 36×3, list body 24/35 (Menu internals), summary row 3, comparison 104 — none dropped',
    '4': 'set on every walk', '5': 'no writes', '6': 'enumerated from the file', '7': 'keys explicit on all 14 calls',
    '8': 'all pages 0 hits; exempt 277/117/68/0', '9': 'no writes', '10': 'see 3'
  },
  markers: 'Unchanged: 2 GAP (27:295, 27:306), 2 DEFECT (33:236, 52:428), all in Archive 126:2025, none beside a screen.',
  decisionsNeeded: [
    'Keep the instance-swap comparison shell or return to detached frames (rules 14/15); record either way.',
    'Problem summary row rings: keep drawn + DEFECT marker, or plain Icon buttons + marker.',
    'May GAP/DEFECT markers live in Archive, or must they sit beside the frames they mark (rule 9).',
    'Re-export Favorites, Main and Status menu references at 2x, or amend rule 15.',
    'Leave the Button split until the next Button publish, or re-point now.'
  ],
  screenshots: ['page-templates-3-2.png', 'page-screens-27-2.png', 'page-archive-126-2.png', 'step3-legacy-screen-27-6-1x.png', 'step4-problem-summary-row-153-1186-1x.png', 'step4-problems-list-body-156-2426-1x.png', 'step5-comparison-recent-116-498-1x.png', 'step5-comparison-status-menu-160-3680-1x.png'].map(f => 'figma-export/npve-audit-2026-09-03/' + f)
};

const F = (id, kind, severity, summary, where, detail, handling) => ({ discoveredDuring: D, webAppV2BugListCandidate: false, handling, id, severity, kind, summary, where, detail });
const flags = [
  F('npveAudit_unrecordedRestructure', 'DEFECT', 'high', 'All target work after the pause record (page restructure, Archive, sets 94:812 and 107:485, Problem summary row 153:1186, Problems list body 156:2426, comparison shell 35:332 + 12 sub-components, four comparison instances, two Sidesheet instances, marker moves, Recovery checks) has no schema record, apply script, report, flag or commit.', 'fdCQVFdvOByaOYIJYag0d6, all pages; repo', 'libraryTodos_write2 read 27:6 still on Screens; own node sessions 74–78 and 88–172 are the unrecorded work. Report: figma-export/npve-audit-2026-09-03/report.md.', 'Reported. Needs a retroactive record from whoever did the work.'),
  F('npveAudit_buttonImportSplit', 'DEFECT', 'high', 'Two subscription copies of library Button (same key cfb726c7…): 3:105 with 74-series space refs holds 58 instances (every Sidesheet footer), 155:1191 with 997 refs holds 8 (Create New Problem). New Problems management screens carry both at once.', 'target Templates/Screens/Archive; Button 3:105, 155:1191', 'Same key, same 72 variants, same geometry; only the internal variable refs differ. Old refs: space/8 74:297, space/6 74:289, space/7 74:293, space/17 74:321. No render divergence today. importComponentByKeyAsync returns 155:1191.', 'Reported. Decision: wait for next Button publish or re-point now.'),
  F('npveAudit_iconButtonOrphanImport', 'DEFECT', 'info', 'Icon button 6:7 (old subscription copy, 74-series refs) has 0 instances; all 182 Icon button instances use 77:1104.', 'target; Icon button 6:7', 'Same key 7ebea5d7… as 77:1104 (library 170:77). Leftover of the accept-updates pass in session 77. Additive rule: leave, do not delete.', 'Reported.'),
  F('npveAudit_spaceRefsTwoVersions', 'DEFECT', 'medium', 'space/8, space/6, space/7, space/17 are bound under two ids each (74-series inside Button 3:105 and Icon button 6:7; 997-series everywhere else). All other space/* bind 997 only; colour/typography bind 74 only.', 'target bindings, all pages', 'Suffix 997 matches the library session of write2 (space/32 = VariableID:997:2), so the 997 ids are the post-write2 published versions. The prompt\'s ids 10:104, 75:689, 18:101, 75:690 do not resolve through the Plugin API.', 'Reported. Resolves with the Button split.'),
  F('npveAudit_problemSummaryRowDrawnControls', 'DEFECT', 'high', 'Problem summary row 153:1186 has no nested instance: the circled edit and add-to-note controls are hand-drawn VECTOR rings (39 × 39, stroke #8CA7A2) with drawn pencil (#004852) and note (#417E86) glyphs; 9 unbound paints; Status text #3FA266 with no typography bindings.', 'target Templates 03 › 153:1186; nodes 170:1591, 170:1592, 153:1190, 170:1608–1614', 'Project convention is plain Icon button + DEFECT marker (Add button ring). The Problems list change-log row "Hand-drawn controls → published library instances" is false for these controls. Renders in step4-problem-summary-row-153-1186-1x.png.', 'Reported. Decision needed on rings.'),
  F('npveAudit_problemsListBodyUnboundWhite', 'DEFECT', 'medium', 'Problems list body 156:2426: 16 inner frames fill #FFFFFF unbound across both variants; Problem summary row Actions 153:1190 likewise.', 'target Templates 03 › 155:1560, 155:1591, 155:1605, 155:2546, 155:2563, 155:2580, 156:1254, 156:1261, 156:1295, 156:1298, 156:1299, 156:1302, 156:1305, 156:1306, 156:1311, 156:1316, 153:1190', 'Variant roots bind color/background/paper; inner frames should bind paper or carry no fill.', 'Reported.'),
  F('npveAudit_referenceExportsNot2x', 'DEFECT', 'medium', 'Three of four source exports in the comparison shell are 1x images: Favorites 114:898 (550 × 600 px), Main 160:1324 (550 × 517), Status menu 160:1326 (550 × 510, cursor visible). Recent 114:778 is 2x (1100 × 1200).', 'target Templates 05 › _Rebuild comparison/Reference/*', 'Rule 15 requires 2x. Favorites caption reads "refreshed 2026-09-03" and its hash differs from the legacy export, against rule 15\'s "does not update".', 'Reported.'),
  F('npveAudit_comparisonNowInstanceSwap', 'DECISION', 'medium', 'Rebuild comparison 35:332 is now an instance-swap shell (three INSTANCE_SWAP slots, three captions) with per-screen sub-components; comparisons and change logs on Screens are instances, not the detached frames rules 14/15 describe. Hidden __Legacy placeholder frames remain in every column.', 'target Templates 05; Screens 116:498, 116:1338, 160:3169, 160:3680', 'Workable answer to rule 6 but an unrecorded convention change; screen content now lives in Templates sub-component masters. Master fixed at 1708 × 1290 leaves blank space under shorter change logs.', 'Reported. Decision needed.'),
  F('npveAudit_markersInArchive', 'DECISION', 'medium', 'The four GAP/DEFECT markers (27:295, 27:306, 33:236, 52:428) now sit in Archive 126:2025 and are beside no screen.', 'target Archive 01', 'Rule 9: GAP "stays marked in the frame". Marker content unchanged.', 'Reported. Decision needed.'),
  F('npveAudit_recoveryCheckUnexplained', 'DEFECT', 'info', 'Archive 04 · Recovery checks 142:996 holds one un-swapped instance of the comparison master (130:1185) and nothing explains what it recovered from; nothing on disk mentions it.', 'target Archive 142:996 › 130:1185', 'Identical props and captions to 116:498. Section stroke white 10% vs black elsewhere.', 'Reported.'),
  F('npveAudit_screensTriplicated', 'DECISION', 'low', 'Clin_Problems-Recent content exists at 27:6 (Archive), 114:780 (Templates master) and through instancing at 116:498 and 130:1185; Favorites at 40:252 and 114:900. Overrides are identical today; the Archive copies will not follow future edits.', 'target Archive 02, Templates 05', 'Read: componentProperties, 31 texts and hidden lists equal on every pair. Additive rule keeps the copies; they need a superseded label or README on the frames.', 'Reported.'),
  F('npveAudit_pickerBodyDeadTabs', 'DEFECT', 'low', 'Problems picker body set 94:812 keeps three Tabs instances per variant with two hidden (6 dead Tabs across the set) now that the variant axis selects the active tab.', 'target Templates 02 › 94:812; 39:355, 39:369, 94:643, 94:644, 94:655, 94:656', 'Carried over from the boolean-visibility design recorded in npveRebuild_goldStarsAndCorrections_2026_09_03.', 'Reported.'),
  F('npveAudit_textFieldHiddenPlaceholderCopy', 'DEFECT', 'info', 'Library Text field masters carry a hidden "Multiline rows" text "Second line of the comment / Third line of the comment" (20 in set 121:350, e.g. 130:149, 130:168); it rides into every target Text field instance.', 'library 121:350', 'Library-inherited, not target-authored. Found while searching the target for the phrase.', 'Reported to the library list.')
];
s.flags.push(...flags);
s[D].flagsAdded = flags.map(f => f.id);
s[D].flagsBefore = flagsBefore;
s[D].flagsAfter = s.flags.length;
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote', D, 'flags', flagsBefore, '->', s.flags.length);
