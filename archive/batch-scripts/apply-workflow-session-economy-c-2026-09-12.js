// Opens the Batch C record (session economy: runner packet cap, byte ceilings, measure-startup.js).
// Usage: node apply-workflow-session-economy-c-2026-09-12.js
const { openRecord } = require('./scripts/schema/lib');

const id = 'workflow_sessionEconomyC_2026-09-12';
const file = openRecord({
  id,
  previous: ['workflow_sessionEconomy_2026-09-12'],
  workstream: 'workflow',
  date: '2026-09-12',
  createdBy: 'Claude Fable 5.1 (Claude Code desktop)',
  script: 'apply-workflow-session-economy-c-2026-09-12.js',
  body: {
    _status: 'IN PROGRESS — Batch C: runner packet deduped to references (version 2), byte ceilings in the validator, measure-startup.js.',
    date: '2026-09-12',
    workstream: 'Workflow / session economy',
    executor: 'Claude Fable 5.1 (Claude Code desktop)',
    risk: {
      tier: 'low',
      assignedBy: 'Repository-only tooling work, the third of the five batches deferred by workflow_sessionEconomy_2026-09-12 (batch A ran at tier low, accepted by the operator); commissioned by the operator in chat at session start. The executor did not change the tier.',
      operatorQuote: 'Batch C: cap the runner packet, add validator byte ceilings, add measure-startup.js. Lean start.'
    },
    planAsProposed: 'Batch C (nextAction of workflow_sessionEconomy_2026-09-12): drop rules and flags from the runner packet, add byte ceilings to the validator, add scripts/workflow/measure-startup.js reporting actual pre-task result bytes from the session transcript.',
    scope: [
      'scripts/workflow/runner/handoff.js: packet version 2 replaces the verbatim rules, npveRules, flags and CLAUDE.md copies with path-and-digest references; generation fails above the packet ceiling',
      'workflow/check-catalog.json: byteCeilings section and the byteCeilings deterministic check; scripts/workflow/validate-ceilings.js enforces them; validate-workflow.js prints the lean-set bytes',
      'scripts/workflow/measure-startup.js: calls and result bytes before the first task action, from the session transcript',
      'CLAUDE.md: one sentence naming measure-startup.js and the ceilings in the lean startup section; workflow/runner.md and workflow/README.md updated for the version 2 packet and the ceilings',
      'Regenerate the contract, run the self-tests and the validator, finalize, commit'
    ],
    report: 'figma-export/workflow-session-economy-c-2026-09-12/report.md',
    canvasChecks: 'Not applicable: tooling and record changes only; no Figma read or write.',
    figmaMutations: [],
    flagsAdded: [],
    stopCondition: 'Repository-only. No change to risk ownership, additive-only rules, DONE records, the store API (scripts/schema/lib.js) or the execution policy text.',
    nextAction: 'Implement, test, measure, finalize.'
  }
});
console.log(`opened ${file}`);
