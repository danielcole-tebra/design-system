// apply-npve-problem-edit.js — opens the approved Problems Edit batch before Figma mutation.
const fs = require('fs');

const P = './design-system-schema.json';
const BACKUP = './design-system-schema.backup-2026-09-04-pre-npve-problem-edit.json';
const ID = 'npveRebuild_problemEdit_2026-09-04';

if (!fs.existsSync(BACKUP)) fs.copyFileSync(P, BACKUP);
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s[ID]) throw new Error(`${ID} already exists`);

const gate = s['npveRebuild_problemsLowOversightBatch_2026-09-04'];
if (!gate || !String(gate._status).startsWith('DONE')) {
  throw new Error('Problems low-oversight batch gate is not complete');
}

s[ID] = {
  _status: 'IN PROGRESS. Recorded before Figma mutation.',
  date: '2026-09-04',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only; subscribed Design System Rebuild assets only',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only; Clin_Problems-Edit 4536:27605',
  report: 'figma-export/npve-problem-edit-2026-09-04/report.md',
  recordGate: 'npveRebuild_problemsLowOversightBatch_2026-09-04 recorded DONE — passed',
  approvedScope: 'Build the remaining Problems Edit reference as one component-based Sidesheet comparison using the locked shell and subscribed Text field, Chip, Button, Calendar icon, Rebuild comparison, and Change log patterns.',
  sourceFacts: {
    root: '4536:27605, 550x458. Header 64, body 318 with 16px vertical and 20px horizontal insets, footer 76.',
    body: 'Problem/ICD select; Status select plus Acute/Chronic type choices; Start and End date fields with calendar icons; multiline Comments.',
    footer: 'Mark as error on the left; Cancel and Save on the right.'
  },
  plannedChanges: [
    'Create one local Problem edit body component from live subscribed component instances; no source drawing is promoted as a component.',
    'Represent both date controls as documented local wrappers around live Text field and Calendar instances because the Text field API has no adornment slot.',
    'Append Problem edit body to the Sidesheet Body content preferred values without changing its default.',
    'Create one reference helper, one rebuild helper containing the sole live Sidesheet screen, one change-log helper, and one comparison instance.',
    'Export fresh source and final comparison PNGs and validate all standing batch rules.'
  ],
  preserve: 'Source and shared-library files, Sidesheet shell geometry and defaults, existing body defaults, existing Screens and comparison instances, tokens, component links, and all open row-spacing decisions.',
  stopCondition: 'Stop on file/page/component identity mismatch, duplicate semantic names, a required global shell change, a control that would require a hand-drawn fake, a new product decision, changed existing default, detached content, paint/alpha drift, or unexpected existing-instance diff.',
  knownGapAtStart: 'The subscribed Text field has no start or end adornment slot. Date fields may use only a clearly documented wrapper composed from live Text field and Calendar instances; no new generic Date picker is authorized.',
  standingBatchRules: {
    '1_instancePaintVerification': 'Pending.',
    '2_unboundPaintAudit': 'Pending.',
    '3_referenceCounts': 'Pending.',
    '4_skipInvisibleFalse': 'Required on every traversal.',
    '5_opacityLast': 'No opacity change planned.',
    '6_enumerateDontRecall': 'Source, target, library subscription, and reusable assets enumerated live before mutation.',
    '7_fileIdentityFirst': 'Target page IDs and source node ID verified before mutation.',
    '8_roundWithRecord': 'All authored geometry must be whole-pixel and recorded.',
    '9_boundPaintAlpha': 'No bound paint alpha may be changed.',
    '10_cloneDropsPropertyRefs': 'Any cloned component or helper must have its live nested instance links verified.'
  },
  screenshots: [
    'figma-export/npve-problem-edit-2026-09-04/source-problem-edit-4536-27605-2x.png'
  ],
  figmaMutations: []
};

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote', ID, 'and backup', BACKUP, 'flags', Array.isArray(s.flags) ? s.flags.length : 'n/a');
