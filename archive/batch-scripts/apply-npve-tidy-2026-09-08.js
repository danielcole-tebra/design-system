// Opens record npveTidy_2026-09-08: housekeeping tidy of the NPVE target after Daniel reported empty-looking
// boards/sections. Diagnosis first (read-only enumeration of every section and top-level frame on all four
// pages), then tidy under additive-only: archive and rename, never delete. Closed by finalize-npve-tidy-2026-09-08.js.
const fs = require('fs');
const store = require('./scripts/schema/lib');

const ID = 'npveTidy_2026-09-08';
const PREVIOUS = 'npveRebuild_moduleChipFix_2026-09-08';
const DIR = 'figma-export/npve-tidy-2026-09-08';
fs.mkdirSync(DIR, { recursive: true });

const diagnosis = [
  { where: 'Screens 250:3518', name: '04 · Medication list — standalone screen moved to Archive 05 on 2026-09-05; see 05 · Medication list comparisons', what: 'section, 1800x900, 0 children', why: 'emptied organizer: its one standalone Sidesheet moved to Archive 05', record: 'npveRebuild_extReviewRepairs_2026-09-05 (screensSectionsRenamed, marked "(empty)")', plan: 'move to Archive 07 · Emptied organizers as a slim labelled bar; README line' },
  { where: 'Screens 309:4529', name: '06 · Problems states — standalone screens moved to Archive 05 on 2026-09-05; see 07 · Problems states comparisons', what: 'section, 1800x900, 0 children', why: 'emptied organizer: its two standalone Sidesheets moved to Archive 05', record: 'npveRebuild_extReviewRepairs_2026-09-05', plan: 'same as 04' },
  { where: 'Screens 156:2427', name: '02 · Problems management markers — standalone screens moved to Archive 05 on 2026-09-05; see 03 · Problems management comparisons', what: 'section, 1800x900, 2 markers only (189:615, 197:3416 at x 1300)', why: 'near-empty by design: the markers stay beside where the screens were', record: 'npveRebuild_extReviewRepairs_2026-09-05 (markers stay)', plan: 'keep; not touched' },
  { where: 'Archive 126:2025', name: '01 · Gap and defect markers', what: 'section, 1040x1320, 0 children', why: 'intentionally empty archive container: the four markers went back to Screens 01 on 2026-09-04', record: 'npveRebuild_repair2_2026-09-04 (archive01: empty, kept; README line rewritten)', plan: 'one-line label: rename with the reason and shrink to a 120px bar; README paragraph' },
  { where: 'Screens 446:9236', name: '15 · Social History', what: 'section numbered 15 while 429:6859 is also 15 · Encounter page shell comparison; Templates has 16 · Social History; Screens has no 16', why: 'numbering slip when the Social History batch created its Screens section', record: 'npveRebuild_socialHistory_2026-09-06 (createdNodes: templatesSection "16 · Social History", screensSection "15 · Social History")', plan: 'rename to 16 · Social History and reorder on the canvas so 15 sits above 16' },
  { where: 'Templates 126:2023 / 219:2067', name: '05 · Rebuild comparison overlaps 06 · Medications', what: 'section 05 (y 5517, h 7344, bottom 12861) overlaps section 06 (top 12560) by 301px; the Medication list change-log helper 254:1895 reaches page y 12745', why: 'the Medication list helpers were added to 05 on 2026-09-04 and 05 grew past the top of 06', record: 'npveRebuild_medicationListSidesheet_2026-09-04 (helpers 253:1838, 253:1840, 254:1895 in 05)', plan: 'shift sections 06-21 down by 500 so 06 starts 200 below 05' },
  { where: 'Templates 424:4085', name: '15 · Encounter page shell', what: 'section width 6300; the change-log helper 434:4745 reaches x 6580', why: 'helper placed at x 6100 without widening the section', record: 'npveRebuild_encounterShell_2026-09-06', plan: 'widen the section to 6660' },
  { where: 'Templates 488:8725', name: 'Module chip (loose FRAME beside the Module chip set 426:4213)', what: 'detached 116x40 frame with a teal fill, an inner frame and an Icon/Close instance, at (485,1524) in section 15', why: 'UNKNOWN — no record or flag cites node 488:8725; its id falls between the toolbar batch (473:) and the PMHx pilot (518:), i.e. around the module chip batches of 2026-09-06', record: 'none', plan: 'FLAG, not touched (unexplained)' },
  { where: 'Archive 202:3450', name: '_Legacy loose dividers — Problems list body (moved out of 156:2426 on 2026-09-04)', what: '3188x100 frame at (700,1180) inside Archive 03 (1200 wide): overflows the section by 2688px into the column of 02/04', why: 'archived unchanged at its original width', record: 'npveRebuild_rowStructure_2026-09-04 (step3_containers.movedToArchive)', plan: 'move unchanged into a new Archive section 08 · Legacy oversize sized to hold it; README line' },
  { where: 'Screens 415:7207, 446:9236, 581:11116, 586:11764', name: '14 · Health Status/Observations, 16 · Social History, 20, 21', what: 'sections 1536 tall holding 808/882/1116/962-tall comparisons: the lower half of each board is empty', why: 'section height copied from the 1290-tall comparison template', record: 'creation batches; cosmetic', plan: 'resize to content + 246 (120 top, 126 bottom, the same margins the 1290-tall boards use)' },
  { where: 'Cover 1:5, Templates 01-04, 06-14, 16-21, Screens 01, 03, 05, 07-13, 17-19, Archive 02-06', name: 'every other section and top-level frame', what: 'populated; content inside bounds', why: 'n/a', record: 'n/a', plan: 'not touched' }
];

const body = {
  _status: 'IN PROGRESS — diagnosis done (read-only enumeration of Cover, Templates, Screens, Archive); tidy pending.',
  date: '2026-09-08',
  workstream: 'NPVE Rebuild / housekeeping',
  executor: 'Claude (Anthropic claude-fable-5-1)',
  trigger: 'Daniel reports empty-looking boards/sections in the NPVE target.',
  recordGate: `${PREVIOUS} recorded DONE in indexes/record-index.json — passed; validate-workflow PASS before reading`,
  report: `${DIR}/report.md`,
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq not read',
  fileIdentity: 'PASS — 0:1 Cover, 3:2 Templates, 27:2 Screens, 126:2 Archive; figma.skipInvisibleInstanceChildren = false for every walk',
  stopConditions: ['anything whose emptiness is unexplained is flagged, not touched', 'no node is deleted; moves and renames are recorded', 'no master, instance, token or comparison content is edited'],
  step1_diagnosis: { inventory: 'Cover 1 frame; Templates 21 sections; Screens 21 sections; Archive 6 sections + README frame — 49 top-level nodes', findings: diagnosis },
  findings: { GAP: 0, DEFECT: 0, DECISION: 0, PROCESS: 0, FLAGGED_UNEXPLAINED: 1 },
  flagsBefore: { active: 227, resolved: 58, total: 285 },
  flagsAfter: null,
  flagsAdded: [],
  figmaMutations: []
};

const file = store.openRecord({ id: ID, previous: PREVIOUS, workstream: 'npve', date: '2026-09-08', createdBy: body.executor, script: 'apply-npve-tidy-2026-09-08.js', body });
console.log('recorded', ID, 'at', file);
