// apply-npve-allergies-list.js — opens the bounded Allergies list Sidesheet rebuild batch.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_allergiesList_2026-09-05';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));

if (s[ID]) throw new Error(`${ID} already exists`);
const previous = s['npveRebuild_familyHistory_2026-09-05'];
if (!previous || !String(previous._status).startsWith('DONE')) {
  throw new Error('Record gate failed: Family History is not recorded DONE');
}

s[ID] = {
  _status: 'IN PROGRESS. Allergies list source audited; target mutation not started.',
  date: '2026-09-05',
  workstream: 'NPVE Rebuild / Sidesheets',
  report: 'figma-export/npve-allergies-list-2026-09-05/report.md',
  recordGate: 'npveRebuild_familyHistory_2026-09-05 recorded DONE — passed',
  source: {
    file: 'zVsuhYehoSLLq880qRBFkq',
    page: '21:321',
    node: '129:7726 Page=Clin_Allergies',
    policy: 'read only; frozen 2x export in this batch'
  },
  target: {
    file: 'fdCQVFdvOByaOYIJYag0d6',
    templatesPage: '3:2',
    screensPage: '27:2',
    sharedSidesheet: '279:2446',
    floatingVariant: '6:65'
  },
  scope: 'Create one reusable allergy severity selector, one reusable allergy card, and one Allergies list body; compose one live Sidesheet placement; create one reference-versus-rebuild comparison and plain-language change log. Append only the new body/helper keys to existing preferred-value lists. Preserve shared defaults and geometry, source, library, prior screens, and global tokens.',
  buildPlan: [
    'Create a local severity selector matching the rendered Mild dropdown.',
    'Create an allergy card with editable allergy, onset, reaction, and comments content using live Chip instances where compatible.',
    'Create a body with live Tabs/Tab instances, a live contained-primary Button, and one live allergy-card instance.',
    'Compose a content-driven live Sidesheet with the footer following active content.',
    'Create frozen reference, rebuild, and Change log helpers; place the sole comparison instance on Screens.'
  ],
  spacingPolicy: 'Canonical base 8: 16px outer/body/card padding and major vertical gaps; 8px between related metadata rows and label/value pairs. Source 12px card inset and irregular 10px row gaps are normalized and recorded.',
  reuseBaseline: {
    library: 'Design System Rebuild is the sole subscribed library',
    button: 'cfb726c79b456d52901243b7c33839efd0780a93',
    tabs: 'a320b57564d4296861667f677b5c807ebf1cfc1e',
    tab: 'b6b654fda71111add23a2637c0e3588004abb661',
    chip: '1c8149de35a3b84dbc41a7e5d726020dfb865db4',
    sidesheet: '279:2446',
    rebuildComparison: '35:332',
    changeLogRow: '18:103'
  },
  stopCondition: 'Stop before target mutation if a required dependency is absent or the source introduces an unresolved design decision. Otherwise stop after structural, paint, whole-pixel, live-instance, and screenshot verification plus report and schema closeout.',
  discoveries: [
    'Allergies 129:7726 is visible, compact, and has a stable 550x656 render with Active and Inactive tabs.',
    'The rendered card shows the Mild selector but not the source tree\'s overlapping edit and delete instances, so the rebuild follows rendered evidence.',
    'The source uses a 64px header, 12px card inset, and irregular 10px metadata gaps; the rebuild follows the approved canonical Sidesheet and base-8 rules.'
  ],
  figmaMutations: [],
  createdNodes: {},
  verification: {},
  findings: { GAP: 0, DEFECT: 0, DECISION: 0 },
  flagsAdded: [],
  nextBatch: 'Not started.'
};

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('opened', ID, 'flags', Array.isArray(s.flags) ? s.flags.length : 'n/a');
