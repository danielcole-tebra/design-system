// apply-npve-family-history.js — opens the bounded Family History Sidesheet rebuild batch.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_familyHistory_2026-09-05';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));

if (s[ID]) throw new Error(`${ID} already exists`);
const previous = s['npveRebuild_procedureHistory_2026-09-04'];
if (!previous || !String(previous._status).startsWith('DONE')) {
  throw new Error('Record gate failed: Procedures/Surgical History is not recorded DONE');
}

s[ID] = {
  _status: 'IN PROGRESS. Family History source audited; target mutation not started.',
  date: '2026-09-05',
  workstream: 'NPVE Rebuild / Sidesheets',
  report: 'figma-export/npve-family-history-2026-09-05/report.md',
  recordGate: 'npveRebuild_procedureHistory_2026_09_04 recorded DONE — passed',
  source: {
    file: 'zVsuhYehoSLLq880qRBFkq',
    page: '21:321',
    node: '129:7950 Page=Clin_FHx',
    policy: 'read only; frozen 2x export in this batch'
  },
  target: {
    file: 'fdCQVFdvOByaOYIJYag0d6',
    templatesPage: '3:2',
    screensPage: '27:2',
    sharedSidesheet: '279:2446',
    floatingVariant: '6:65'
  },
  scope: 'Create one reusable Family History condition row, one reusable family-member card, and one Family History body; compose one live Sidesheet placement; create one reference-versus-rebuild comparison and plain-language change log. Append only the new body/helper keys to existing preferred-value lists. Preserve shared defaults and geometry, source, library, prior screens, and global tokens.',
  buildPlan: [
    'Create condition row with editable label and a live library Icon button using the AddPaymentNote icon.',
    'Create family-member card with editable relationship and age, a live EditOutlined icon, and two live condition-row instances.',
    'Create body with a live contained-primary medium Button and one live family-member card instance.',
    'Compose a content-driven live Sidesheet with the footer following active content.',
    'Create frozen reference, rebuild, and Change log helpers; place the sole comparison instance on Screens.'
  ],
  spacingPolicy: 'Canonical base 8: 16px outer/body/card padding and major vertical gaps; 8px only between closely related text/control elements. Source 12px card padding is normalized to 16px and recorded in the Change log.',
  reuseBaseline: {
    library: 'Design System Rebuild is the sole subscribed library',
    button: 'cfb726c79b456d52901243b7c33839efd0780a93',
    iconButton: '7ebea5d7ce6ecfdaef84d177efa64196f654717d',
    editIcon: 'ae295bfd62904c894356ffb63fa20fe2ef03b060',
    addPaymentNoteIcon: '9fe47d27ed040f1d0e988074b7ea7ba27afcebef',
    sidesheet: '279:2446',
    rebuildComparison: '35:332',
    changeLogRow: '18:103'
  },
  stopCondition: 'Stop before target mutation if a required library dependency is absent or the source introduces an unresolved design decision. Otherwise stop after structural, paint, whole-pixel, live-instance, and screenshot verification plus report and schema closeout.',
  discoveries: [
    'Clin_THx was inspected but rejected as the next low-oversight candidate because it is hidden and contains placeholder-heavy field internals.',
    'Family History is visible, compact, and has a stable reference export. No unresolved design fork was found.',
    'The source contains an overlapping toggle layer under the Create button; the rendered reference shows only the Create button, so the rebuild follows the rendered evidence.'
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
