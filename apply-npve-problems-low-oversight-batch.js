// apply-npve-problems-low-oversight-batch.js — opens the approved two-screen Problems batch before Figma mutation.
const fs = require('fs');

const P = './design-system-schema.json';
const BACKUP = './design-system-schema.backup-2026-09-04-pre-npve-problems-low-oversight-batch.json';
const ID = 'npveRebuild_problemsLowOversightBatch_2026-09-04';

if (!fs.existsSync(BACKUP)) fs.copyFileSync(P, BACKUP);
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s[ID]) throw new Error(`${ID} already exists`);

const gate = s['npveRebuild_sidesheetBase8SpacingAudit_2026-09-04'];
if (!gate || !String(gate._status).startsWith('READ-ONLY AUDIT COMPLETE')) {
  throw new Error('Sidesheet base-8 audit gate is not complete');
}

s[ID] = {
  _status: 'IN PROGRESS. Recorded before Figma mutation.',
  date: '2026-09-04',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only; Page54 4704:17095 and Clin_Problems2-Edit 129:10016',
  report: 'figma-export/npve-problems-low-oversight-batch-2026-09-04/report.md',
  recordGate: 'npveRebuild_sidesheetBase8SpacingAudit_2026-09-04 recorded READ-ONLY AUDIT COMPLETE — passed',
  approvedScope: 'Build the next low-oversight Problems batch: empty state and browse/search. Use the locked Sidesheet shell, existing Problems list body, Problems picker body, Problem row, Rebuild comparison, and Change log patterns.',
  sourceFacts: {
    empty: '4704:17095, 550x517. Problems; Create New Problem; Status; checked No known problems; no visible rows; Add Active Problems to Note plus disabled Save.',
    browse: '129:10016, 550x600 at root opacity 0.4. Add Problem to Chart; empty search placeholder; All active; Common Problems; four existing problem rows; Save & Add to Note plus Save.'
  },
  plannedChanges: [
    'Add State=Empty to Problems list body 156:2426 without changing Closed/Open or the default.',
    'Create a standalone Problems browse body composed from a live Active tab=All picker instance with only search-value and section-title overrides.',
    'Add the browse body to the existing Sidesheet Body content preferred values without changing its default.',
    'Create standalone screens and reference/rebuild/change-log helpers using the established comparison system.',
    'Create fresh 2x source exports and final reference/rebuild screenshots for the report.'
  ],
  preserve: 'Source and shared-library files, Sidesheet shell geometry, published defaults, existing screens, existing picker variants, row spacing decisions, tokens, icon swaps, and component links.',
  stopCondition: 'Stop on file/page/component identity mismatch, duplicate semantic component or screen names, a required shell/global change, a new visual decision, changed existing default, dropped property references, detached content, paint/alpha drift, or unexpected existing-instance diff.',
  standingBatchRules: {
    '1_instancePaintVerification': 'Pending.',
    '2_unboundPaintAudit': 'Pending.',
    '3_referenceCounts': 'Pending.',
    '4_skipInvisibleFalse': 'Required on every traversal.',
    '5_opacityLast': 'Browse screen opacity will be applied last and verified against the source root 0.4.',
    '6_enumerateDontRecall': 'Live source and target inventories completed before mutation.',
    '7_fileIdentityFirst': 'Target page IDs and source node IDs verified before mutation.',
    '8_roundWithRecord': 'All authored geometry must be whole-pixel and recorded.',
    '9_boundPaintAlpha': 'No bound paint alpha may be changed.',
    '10_cloneDropsPropertyRefs': 'Any clone must have its property-reference population compared before and after.'
  },
  screenshots: [
    'figma-export/npve-problems-low-oversight-batch-2026-09-04/source-empty-4704-17095-2x.png',
    'figma-export/npve-problems-low-oversight-batch-2026-09-04/source-browse-129-10016-2x.png'
  ],
  figmaMutations: []
};

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote', ID, 'and backup', BACKUP, 'flags', Array.isArray(s.flags) ? s.flags.length : 'n/a');
