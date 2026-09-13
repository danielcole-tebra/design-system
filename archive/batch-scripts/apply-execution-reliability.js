const { openRecord } = require('./scripts/schema/lib');
openRecord({
  id: 'workflow_executionReliability_2026-09-10', previous: 'backupPolicyB_2026-09-08',
  workstream: 'workflow', date: '2026-09-10', createdBy: 'Codex', script: 'apply-execution-reliability.js',
  body: {
    _status: 'IN PROGRESS — repository execution safeguards after the Allergies recovery.',
    date: '2026-09-10', workstream: 'Workflow reliability across models and harnesses', executor: 'Codex',
    operatorAuthorization: "Ok, let's have a good think about what we can do to insure something like that doesn't happen again and enshrine that in the repo for other models/harnesses.",
    priorVisualReview: { record: 'npveRebuild_allergiesEdit_2026-09-09', operatorQuote: 'Looks good. Is there any way we could have avoided the failures with the other models?', verdict: 'Operator accepted the Allergies comparison; earlier immutable record remains unchanged.' },
    scope: ['Canonical execution policy and plain-language communication', 'Portable instruction entry points and single-session operator workflow', 'Small evidence checkpoint at start and finish of future runs', 'Regression tests and generated contract freshness'],
    report: 'figma-export/workflow-execution-reliability-2026-09-10/report.md',
    figmaMutations: [], flagsAdded: [],
    stopCondition: 'Repository changes only; keep risk ownership, additive-only rules and final visual checks intact.'
  }
});
