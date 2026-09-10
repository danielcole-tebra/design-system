const { openRecord } = require('./scripts/schema/lib');

openRecord({
  id: 'workflow_npveQueueRefresh_2026-09-10',
  previous: 'workflow_appearanceReview_2026-09-10',
  workstream: 'workflow',
  date: '2026-09-10',
  createdBy: 'Codex',
  script: 'apply-workflow-npve-queue-refresh.js',
  body: {
    _status: 'IN PROGRESS — scoped remaining sidesheets and proposed the next atomic queue',
    date: '2026-09-10',
    operatorAuthorization: "Ok we've been making changes to the way the repo works to allow other models to interact with the repo. Let's do a test and queue up some more work here to make sure our established workflow is going well.",
    scope: 'Read-only source audit and planner-owned queue proposal; no Figma mutation and no risk approval inferred.',
    figmaReads: [
      { fileKey: 'zVsuhYehoSLLq880qRBFkq', nodeId: '129:7340', purpose: 'Patient Summary base state' },
      { fileKey: 'zVsuhYehoSLLq880qRBFkq', nodeId: '2459:10180', purpose: 'Patient Summary feedback error/entry state' },
      { fileKey: 'zVsuhYehoSLLq880qRBFkq', nodeId: '2466:10562', purpose: 'Patient Summary feedback success state' },
      { fileKey: 'zVsuhYehoSLLq880qRBFkq', nodeId: '939:9228', purpose: 'Flowsheets base-state complexity check' },
      { fileKey: 'zVsuhYehoSLLq880qRBFkq', nodeId: '129:7614', purpose: 'Psychotherapy Note editor-pattern complexity check' }
    ],
    figmaMutations: [],
    proposedItems: [
      'npve-patient-summary-content',
      'npve-patient-summary-feedback',
      'npve-patient-summary-body-sheet'
    ],
    deferredCandidates: [
      'Flowsheets — separate compact list, graph, add, and edit items after a deeper pattern audit',
      'Psychotherapy Note — human decision required for the new rich-text editor toolbar before a build item is queued'
    ],
    report: 'figma-export/workflow-npve-queue-refresh-2026-09-10/report.md'
  }
});
