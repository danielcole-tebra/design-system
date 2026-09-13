// Records the operator-approved Facility Stay form-surface decision before target writes.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_externalCareFacilityStay_2026-09-05';
const FLAG_ID = 'npveExternalCareFacilityStay_formSurfaceToken';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));

const batch = s[ID];
if (!batch) throw new Error(`${ID} is missing`);
if (!String(batch._status).startsWith('DISCOVERY COMPLETE')) {
  throw new Error(`${ID} is not at the decision gate`);
}

const flag = s.flags.find((entry) => entry.id === FLAG_ID);
if (!flag) throw new Error(`${FLAG_ID} is missing`);

flag.handling = 'Operator approved the recommended local exception. Create an NPVE-local COLOR variable named Form surface at #EEF7F9, scoped to FRAME_FILL and SHAPE_FILL, and bind the Facility Stay edit card to it. Do not add the colour to the shared library.';
flag.resolution = 'APPROVED 2026-09-05 — exact source colour retained as an NPVE-local token. Build may proceed.';

batch._status = 'IN PROGRESS — operator-approved form-surface decision recorded before target mutation.';
batch.scope = 'Build the complete Facility Stay edit form additively in NPVE Rebuild using live library controls, the approved local form-surface token, the shared content-driven Sidesheet, a frozen 2x reference, a change log, and one comparison instance.';
batch.operatorDecision = {
  date: '2026-09-05',
  decision: 'Create an NPVE-local form-surface token at #EEF7F9.',
  rationale: 'Preserves the repeated NPVE edit-form surface exactly without silently approximating it or adding an app-specific colour to the shared design-system library.',
  implementation: 'Local collection NPVE/Color; variable Form surface; COLOR; value #EEF7F9; scopes FRAME_FILL and SHAPE_FILL; no platform code syntax.'
};
batch.stopCondition = 'CLEARED — operator approved the exact NPVE-local form-surface token. Continue with the bounded Facility Stay build.';
batch.decisionNeeded = null;

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('amended', ID, 'status', batch._status);
