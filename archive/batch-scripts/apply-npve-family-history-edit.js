// Opens record npveRebuild_familyHistoryEdit_2026-09-09: Family History · Edit Family Member form
// (sidesheet), manifest item npve-family-history-edit (medium tier, approved by the operator 2026-09-10).
// Reuses the Allergies edit pattern (npveRebuild_allergiesEdit_2026-09-09) and its verified mappings.
// Closed by finalize-npve-family-history-edit.js.
const fs = require('fs');
const store = require('./scripts/schema/lib');

const ID = 'npveRebuild_familyHistoryEdit_2026-09-09';
const PREVIOUS = 'npveRebuild_allergiesEdit_2026-09-09';
const DIR = 'figma-export/npve-family-history-edit-2026-09-09';
fs.mkdirSync(DIR, { recursive: true });

const body = {
  _status: 'IN PROGRESS — opened at batch start: operator approval recorded; preflight, build, comparison and report pending.',
  date: '2026-09-09',
  workstream: 'NPVE Rebuild / Sidesheets',
  executor: 'GitHub Copilot (Z.ai GLM)',
  trigger: 'Operator accepted the Allergies comparison and approved this item at medium risk within the planned scope, with routine corrections delegated to the executor.',
  recordGate: `${PREVIOUS} recorded DONE in indexes/record-index.json — passed; validate-workflow PASS before reading`,
  manifestItem: 'npve-family-history-edit (medium tier; approval unapproved in the manifest, per-item operator confirmation quoted verbatim and recorded by start-batch.js)',
  report: `${DIR}/report.md`,
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only — node 129:12486 (Page=Clin_FHX-Editing, 550x685, variant of Sidesheetv3 129:6647); touched only for the frozen 2x reference export',
  fileIdentity: 'pending — verified at the first Figma call of the build (pages 0:1 Cover, 3:2 Templates, 27:2 Screens, 126:2 Archive; figma.skipInvisibleInstanceChildren = false for every walk)',
  planning: {
    proposal: 'figma-export/npve-planning-2026-09-09/proposal.md (planner scoped read; source facts, mapping and expected dimensions live there and in the manifest item)',
    sourceFacts: [
      '550x685: NoteHeader 65 (back 32x32 tinted #E9EFEE at 16,16; title "Edit Family History" Bold; close glyph 24 direct child), Main Wrap 620 with the form card 518x520 at y 16 (8 + 8) inside a 16px side inset, footer row 518x60 at y 552 with only Cancel (text 72) and Save (outlined 66) — no Save & Add to Note, and Save is outlined rather than primary; gap 21.',
      'Card padding 16 (rows 486): "Edit Family Member" Bold 16 + trash 24; Relationship caption + Autocomplete Select Field 486x40 with caret ("Father"); Status caption + two Radio Option 24px in a 40px row (Living checked, Deceased) with Age caption + 80x40 field ("65") at x 214; Medical Conditions caption + Add condition input 418x36 + Add outlined 60x36, then rows 486x40 (Diabetes, Hypertension) each with a red X 24; Comments 486x110 focused with placeholder.',
      'Same Form surface card as Allergies edit.'
    ]
  },
  decisions: [
    {
      id: 'tierApproval_medium',
      what: 'Medium tier approved within the planned scope; routine corrections delegated to the executor.',
      operator: 'Daniel (operator), 2026-09-10, verbatim: "I approve the Family History edit batch at medium risk, within the planned scope. Continue through the completed comparison and show me the screenshots. Handle routine factual corrections and execution repairs without further approval; ask only if a new design decision arises."',
      recordedBy: 'start-batch.js per-item confirmation (manifest approval status was unapproved at start).'
    },
    {
      id: 'captionPlacement_A_floatingLabel',
      what: 'Caption placement A — library floating label, captions dropped, one change-log row per form.',
      operator: 'Daniel (operator), decision-prompt answer 2026-09-09, verbatim: "A — Library floating label, captions dropped, one change-log row per form (recommended: what the library ships, what runs 2-3 did)".',
      settles: 'Recorded in npveRebuild_allergiesEdit_2026-09-09; applies to this item per the manifest plannerNotes.'
    }
  ],
  scope: 'Build one reusable 518px Family History edit form and body reusing the compositions the Allergies edit establishes (autocomplete placement, radio row, list-row GAP wrapper, add-entry row): Edit Family Member header with trash Icon button; Relationship Autocomplete/Field size=small Value=Filled ("Father"); Status radio group (Living checked, Deceased) beside an Age Text field 80 wide ("65"); Medical Conditions add-entry row (Text field + outlined Add) above two outlined rows (Diabetes, Hypertension) with trailing error Icon button; Comments medium multiline resting; footer Cancel / Save through the shell. Reuse from the Codex Family History batch (npveRebuild_familyHistory_2026-09-05): its Templates section 10 stays the home of the display body; the edit body is a sibling section, and nothing in 346:3080-346:3365 is edited. Append the body to the shared Sidesheet Body content; one placed sheet with Show back on; frozen 2x reference; change log; comparison; markers for the end adornment and the back-control DEFECT.',
  systemMapping: {
    header: 'Sidesheet 6:65 Placement=Floating, Show back=true (Icon button + Icon/LeftCaret), Title "Edit Family History", Close as published',
    trash: 'Icon button 77:1109 color=default size=small with Icon/TrashOutlined (Allergies edit precedent)',
    relationship: 'Autocomplete/Field size=small State=Default Value=Filled, Value text "Father", floating label per caption decision A, 486 wide',
    status: 'the Allergies edit radio row (Form control label ×2, Control → Radio), Living checked; Age: Text field size=small Value=Filled "65", 80 wide, in the same row, gap 16',
    conditions: 'add row (Text field size=small Value=Empty placeholder "Add condition" + Button contained/primary size=small "Add") above two end-adornment GAP wrappers (Text field Value=Filled "Diabetes"/"Hypertension" + Icon button color=error size=small with Icon/Close)',
    comments: 'Text field 77:698 size=medium multiline=true Value=Empty, 104 tall resting per npve.fieldStates',
    footer: 'shell Footer, Show tertiary action off, Show secondary action on: Cancel (text) / Save — the source draws Save OUTLINED; build as the source shows and log it as a finding',
    formSurface: 'NPVE/Color Form surface VariableID:387:3434 (#EEF7F9, 1px color/divider, radius 8), 16px inset bound npve.sidesheet.body.inset, rows 486 wide, rhythm bound space/16'
  },
  approvedDifferences: [
    'Shell regions: source header 64/65 and footer 60 become the canonical 72 and 71; the fixed source height becomes content-driven (npve.sidesheet.height).',
    'Template padding: the form card uses the shared 16px inset on all sides, so rows are 486 wide even where the source draws 16px/486 (this source already matches).',
    'Base-8 rhythm: 16px between rows, 8px only for tight relationships (npve.spacing.verticalDefault, npve.spacing.tightRelationship).',
    'Capitalized labels: button labels render in the library title case (npve.buttonLabels).',
    'Resting field states: the focused Comments field renders resting at 104 tall (library medium multiline) instead of focused at 110.',
    'Touch targets: radio rows built on Radio + Form control label are 42px tall where the source draws 24px radios in a 40px row (npve.touchTargets).',
    'Library sizes: the 36px "Add" pill and the 36px add-entry input become the library small Button (30) and small Text field (40).',
    'Caption placement A: floating labels, source captions dropped, one change-log row per form.'
  ],
  backControlDelta: 'Source draws a 32x32 square tinted #E9EFEE with a left caret; the shell Show back control (6:67) is the library Icon button color=default size=medium, 40x40, no fill, Icon/LeftCaret. Recorded DEFECT verdict (npveRebuild_sidesheet_inventory_2026_09_02, "Back control (edit pages)"). Plan: shell as published, one change-log row, one DEFECT marker beside the comparison.',
  expectedFinding: 'Source footer inconsistency: Save is outlined here (button 129:12800, Type=Default, white fill, 1px #8CA7A2) and primary on every other edit sheet (Allergies 129:7949, Facility Stay 648:1735, Hospitalizations 129:8516, Procedures 129:8773 — all Primary). Report, do not resolve: build as drawn, one change-log row, one flag for Daniel (flag npveFamilyHistory_sourceSaveOutlined already appended 2026-09-09).',
  stopConditions: [
    'Stop before mutation on identity mismatch (file keys or page ids), on a control with no published mapping and no recorded GAP pattern, on any shared default or geometry change, or on a new design decision beyond the recorded outlined-Save finding.',
    'The source file is never written; the library file is never written.',
    'Additive only: nothing deleted; superseded content archived, never removed.',
    'Nothing from the Codex Family History batch (346:3080-346:3365) is edited.'
  ],
  findings: { GAP: 1, DEFECT: 1, DECISION: 0, PROCESS: 0, note: 'End-adornment GAP reused; back-control DEFECT reused. No new library convention.' },
  flagsBefore: { active: 229, resolved: 58, total: 287 },
  flagsAfter: null,
  flagsAdded: [],
  figmaMutations: []
};

const index = store.readRecordIndex();
const file = index.records.some((entry) => entry.id === ID)
  ? store.finalizeRecord(ID, (record) => record)
  : store.openRecord({ id: ID, previous: PREVIOUS, workstream: 'npve', date: '2026-09-09', createdBy: body.executor, script: 'apply-npve-family-history-edit.js', body });
console.log('recorded', ID, 'at', file);