// Appends the 2026-09-12 resume-attempt finding to the flag register (standing rule 11; CLAUDE.md "Recording").
const { appendFlags } = require('../../scripts/schema/lib');
const B = 'figma-export/npve-flowsheets-finish-2026-09-11';
const ids = appendFlags([{
  id: 'npveFlowsheets_sourceVariantPropertiesUnreadable_2026-09-12',
  severity: 'high',
  kind: 'WORKFLOW BLOCKER',
  status: 'OPEN',
  summary: 'Read-only source Sidesheetv3 set 129:6647 also rejects variantProperties on every one of its 55 children ("in get_variantProperties: Component set for node has existing errors") and variantGroupProperties on the set. The source-gate treatment of record workflow_flowsheetsResume_2026-09-12 reads each variant\'s variantProperties inside its catch for componentPropertyDefinitions, so the runner read program throws before returning and the "unreadable at source" control cannot be written. Flowsheets finish stays stopped.',
  where: 'NDE-2026 zVsuhYehoSLLq880qRBFkq, page 21:321 ⚙️ Components, set 129:6647 (18040×2415, 55 children); used variants 939:9228 Page=Clin_Flowsheets, 867:7460 Page=Clin_Flowsheets-AddNew, 909:12649 Page=Clin_Flowsheets-Edit',
  detail: 'Set getters: componentPropertyDefinitions → "in get_componentPropertyDefinitions: Component set has existing errors"; variantGroupProperties → "in get_variantGroupProperties: Component set has existing errors". Names, keys, geometry, visibility and page remain readable for the set and all children; the three used variants match the 2026-09-11 blocker evidence by id, name, key and size. Deriving properties from the variant name would be name matching, which the treatment forbids; amending the read program and validator is workflow tooling outside this batch\'s allowed files.',
  discoveredDuring: 'npveRebuild_flowsheetsFinish_2026-09-11 (resume attempt 2026-09-12, Claude Code)',
  report: `${B}/report.md`,
  evidence: `${B}/source-read-2026-09-12/error.json; ${B}/source-read-2026-09-12/diagnostic.json; ${B}/source-read-2026-09-12/plan.json; ${B}/source-read-2026-09-12/script.js`,
  webAppV2BugListCandidate: false,
  handling: 'Reported; planner/operator decision needed: amend the source-gate treatment in a workflow batch, or repair the source externally. Nothing to fix inside this item.'
}]);
console.log('appended flags:', ids.join(', '));
