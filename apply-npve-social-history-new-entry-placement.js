// Records the bounded pre-write plan for the intentional Social History New Entry placement change.
const fs = require('fs');

const P = './design-system-schema.json';
const BACKUP = './design-system-schema.backup-2026-09-06-pre-npve-social-history-new-entry-placement.json';
const ID = 'npveRebuild_socialHistoryNewEntryPlacement_2026-09-06';
const PREVIOUS = 'npveRebuild_socialHistory_2026-09-06';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));

if (s[ID]) throw new Error(`${ID} already exists`);
const previous = s[PREVIOUS];
if (!previous || !String(previous._status).startsWith('DONE')) {
  throw new Error('Record gate failed: Social History batch is not recorded DONE');
}
if (!fs.existsSync(BACKUP)) fs.copyFileSync(P, BACKUP);

s[ID] = {
  _status: 'IN PROGRESS — intentional New Entry placement decision recorded before target mutation.',
  date: '2026-09-06',
  workstream: 'NPVE Rebuild / Sidesheets',
  report: 'figma-export/npve-social-history-new-entry-placement-2026-09-06/report.md',
  recordGate: `${PREVIOUS} recorded DONE — passed`,
  decision: 'Keep the frozen source unchanged. In the rebuild, place New Entry immediately after the SUBSTANCE/DRUG USE heading with a 16px gap so the action reads as belonging to that section.',
  source: {
    file: 'zVsuhYehoSLLq880qRBFkq',
    node: '129:10181 Page=Clin_SHx',
    policy: 'read only; existing frozen 2x reference remains unchanged'
  },
  target: {
    file: 'fdCQVFdvOByaOYIJYag0d6',
    templatesPage: '3:2',
    screensPage: '27:2',
    body: '441:4994 Social history body',
    substanceHeader: '441:5063 Substance/drug use header',
    heading: '441:5064 SUBSTANCE/DRUG USE',
    newEntry: '441:5065 New Entry',
    changeLog: '446:5475 _Rebuild comparison/Change log/Social History',
    comparison: '446:9237 Social History · Reference / Rebuild / Changes'
  },
  preWriteAudit: [
    'The Social History batch is recorded DONE with GAP 0 and DEFECT 0.',
    'The 518px Substance/drug use header is horizontal auto-layout with 16px item spacing but uses SPACE_BETWEEN, placing the 89px New Entry button at x=429.',
    'The heading is 159px wide, so MIN alignment will place the button at x=175 and preserve the existing 16px base-8 gap.',
    'New Entry remains a live instance of the published small contained-primary Button; no component, token, shell, or source capture needs replacement.'
  ],
  plan: [
    'Change only 441:5063 primary-axis alignment from SPACE_BETWEEN to MIN; preserve its 16px item spacing and all child instances.',
    'Add one live Change log/Row instance describing Far right → 16px after heading and the hierarchy rationale.',
    'Verify body geometry, the live Sidesheet instance, the sole comparison, fonts, paint bindings, preferred-value counts, helper placement, whole-pixel authored geometry, and all ten standing batch rules.',
    'Save fresh body, rebuild, and comparison PNGs and finish this record and report.'
  ],
  preserve: 'Frozen source reference, shared Sidesheet and Rebuild comparison masters/defaults, all published component instances, existing Social History fields and spacing, every unrelated node, and all existing repo changes.',
  stopCondition: 'Stop if changing the existing header alignment alters sheet height, breaks component identity, clips content, creates fractional authored geometry, or exposes a new design decision. Otherwise stop after the targeted placement, change-log row, fresh screenshots, report, and DONE record.',
  findings: { GAP: 0, DEFECT: 0, DECISION: 1 },
  flagsAdded: [],
  flagsBefore: s.flags.length,
  flagsAfter: s.flags.length,
  figmaMutations: [],
  createdNodes: {},
  verification: {}
};

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('recorded', ID, 'flags', s.flags.length, 'backup', BACKUP);
