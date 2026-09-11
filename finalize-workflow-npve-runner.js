const { finalizeRecord } = require('./scripts/schema/lib');
const { readJson } = require('./scripts/workflow/lib');
const measurement = readJson('figma-export/workflow-npve-runner-2026-09-11/context-measurement.json');
const dryRun = readJson('figma-export/workflow-npve-runner-2026-09-11/dry-run.json');
finalizeRecord('workflow_npveRunner_2026-09-11', record => ({ ...record,
  _status: 'DONE — provider-neutral NPVE runner utilities and offline evidence delivered; repository-only work',
  outcome: 'Existing record/risk/version-3/checkpoint gates reused; reusable local modules, Plugin API programs and a file-backed authenticated-tool bridge; no live Figma calls.',
  implementation: ['scripts/workflow/npve-runner.js', 'scripts/workflow/runner/', 'workflow/runner.md'],
  example: 'figma-export/workflow-npve-runner-2026-09-11/handoff.json',
  measurement: { beforeBytes: measurement.beforeBytes, afterBytes: measurement.afterBytes, reductionPercent: measurement.reductionPercent,
    method: measurement.method, measuredRuntimeSavings: null, measuredTokenSavings: null, measuredCreditSavings: null },
  validation: { runnerCases: dryRun.cases, structuralPluginTests: 'PASS — shell, helpers, comparison, token and hierarchy failures, all-page audit; offline double, no pixel simulation',
    existingChecks: 'PASS — workflow self-test, execution self-test (38), target identity self-test, validate-workflow, validate-split and diff whitespace checks. Store write/read self-test is run after this record becomes DONE because it requires the latest record DONE.',
    figmaCalls: 0, existingDoneRecordsEdited: 0 },
  canvasChecks: 'NOT APPLICABLE — repository tooling only. No fake mappings, screenshots, approvals or workflow runs created for this tooling record; synthetic data lives only in tests/evidence labeled dry-run.',
  nextAction: 'Operator may use these utilities on a separately authorized NPVE item; completed Patient Summary remains historical. First live use still needs authenticated-tool discovery, fresh mappings, guarded mutations and visual review.'
}));
