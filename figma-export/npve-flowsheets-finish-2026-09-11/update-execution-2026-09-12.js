// Records the 2026-09-12 resume attempt's source-read failure in the portable checkpoint (execution.json).
// The earlier unresolved entry stays: it is still true. Nothing is cleared without evidence.
const fs = require('fs');
const path = require('path');
const B = 'figma-export/npve-flowsheets-finish-2026-09-11';
const S = `${B}/source-read-2026-09-12`;
const file = path.resolve(__dirname, '../..', B, 'execution.json');
const x = JSON.parse(fs.readFileSync(file, 'utf8'));
const already = x.unresolved.some((u) => u.operation && u.operation.startsWith('Resume source readback'));
if (already) throw new Error('execution.json already carries the 2026-09-12 entry');
x.unresolved.push({
  operation: 'Resume source readback through the runner read program, 2026-09-12',
  error: 'in get_variantProperties: Component set for node has existing errors',
  fileKey: 'zVsuhYehoSLLq880qRBFkq',
  nodeIds: ['129:6647', '939:9228', '867:7460', '909:12649'],
  mutationLanded: false,
  evidence: `${S}/error.json`,
  diagnostic: `${S}/diagnostic.json`,
  classification: 'The source-gate treatment (record workflow_flowsheetsResume_2026-09-12) reads every variant\'s variantProperties inside its catch for componentPropertyDefinitions. On set 129:6647 that getter throws for all 55 children and variantGroupProperties throws on the set, so the read program throws before returning and no unreadable-at-source control can be evidenced. Names, keys, page, geometry and visibility remain readable.',
  nextDifferentApproach: 'Planner/operator decision: amend the treatment (scripts/workflow/runner/plugin.js and source-definitions.js, a workflow batch outside this item\'s allowed files) so a set whose variantProperties also throw is accepted on the evidence Figma still gives, with both errors quoted and the used variant identified by id and key, or repair the source externally. No name-derived properties, no source change, no ad hoc writes.'
});
x.nextAction = 'Planner/operator review of the second source-gate failure (variantProperties unreadable on every child of 129:6647). The runner cannot read the manifest source until the treatment is amended or the source is repaired; do not derive variant properties from names, change the source, substitute the source, replay creations or replace runner operations with ad hoc writes.';
fs.writeFileSync(file, JSON.stringify(x, null, 2) + '\n');
console.log('execution.json unresolved entries:', x.unresolved.length);
