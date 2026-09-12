// Opens record workflow_sessionEconomy_2026-09-12: standing rule 16 (one batch per session, bounded startup
// reads) adopted from the read-only token audit of the five Claude Code sessions 2026-09-06 to 2026-09-09.
// Repository-only: no Figma read or write.
const { openRecord } = require('./scripts/schema/lib');
console.log(openRecord({
  id: 'workflow_sessionEconomy_2026-09-12', previous: 'workflow_npveRunner_2026-09-11',
  workstream: 'workflow', date: '2026-09-12', createdBy: 'Claude Fable 5.1 (Claude Code desktop)', script: 'apply-workflow-session-economy-2026-09-12.js',
  body: {
    _status: 'IN PROGRESS — standing rule 16 (session economy) from the token audit; repository-only.',
    date: '2026-09-12', workstream: 'Workflow / session economy', executor: 'Claude Fable 5.1 (Claude Code desktop)',
    risk: { tier: 'low', assignedBy: 'Proposed by the executor in chat before execution as repository-only work (batch A of five); accepted by the operator.', operatorQuote: "OK let's do batch A" },
    planAsProposed: "Batch A. Session hygiene rule. No code. Add a standing rule to workflow/rules.json so it lands in the contract: one batch per session, the turn ends at each milestone gate and waits for the operator, independent reads go in one call, and tooling files named in the contract are never cat'd.",
    scope: [
      'Add standingRules.16 to workflow/rules.json (canonical text) so it folds into the generated contract',
      'Add the rule-16 pointer line to CLAUDE.md (same form as rules 14 and 15) and a one-batch-per-session bullet to OPERATORS.md',
      'Save the token audit and its parsing scripts as batch evidence',
      'Regenerate the contract, run the validator, finalize, commit'
    ],
    notAdopted: {
      turnEndAtMilestones: 'Left out. It conflicts with workflow/execution-policy.md ("a milestone is an internal checkpoint, not a new record or permission boundary") and OPERATORS.md ("internal milestones do not require you to say continue"), both adopted 2026-09-10. Changing that is an operator decision; the rest of batch A does not depend on it.'
    },
    audit: {
      evidence: 'figma-export/workflow-session-economy-2026-09-12/token-audit.md',
      sessions: ['84ff42db (2026-09-09)', 'fde5980a (2026-09-08/09)', '9740bfa7 (2026-09-08)', '6a891562 (2026-09-06)', 'e7e2148b (2026-09-06)'],
      totals: { toolCalls: 536, apiCalls: 317, inputTokens: 79632957, cacheReadTokens: 77183028, cacheWriteTokens: 2440783, outputTokens: 690537, images: 59 },
      fixedBaseTokensPerCall: '50,476 to 53,747 (about 21% of all input tokens across the five sessions)',
      finalWindowTokens: { '84ff42db': 469390, fde5980a: 458566, '9740bfa7': 517447, '6a891562': 268033, e7e2148b: 102268 },
      preTaskResultBytes: { '84ff42db': 178112, fde5980a: 154153, '9740bfa7': 249800, '6a891562': 26421, e7e2148b: 50775 },
      leanSetBytes: { minimum: 100276, asReadInPractice: 273383 },
      windowGrowthShares: { modelOutputRetained: '43–48%', toolResultText: '24–30%', harnessInjected: '20–23%', images: '2%', operatorPrompts: '2–3%' },
      figmaReads: 'no node 0:0 reads in 28 sessions; no whole-file walks; page-scoped walks 5/19/17/12/0 per session',
      frozenFiles: 'HANDOFF.md and CHAT-HANDOFF.md not read in any of the five sessions (last read 2026-09-02)'
    },
    deferred: ['Batch B: detach unused connectors and the Warp plugin (app-side, operator action)', 'Batch C: cap and dedupe the contract and runner packet; measure actual pre-task reads from transcripts', 'Batch D: templated record scripts and shared Figma helpers', 'Batch E: durable plan.md and inventory.json per batch'],
    report: 'figma-export/workflow-session-economy-2026-09-12/report.md',
    canvasChecks: 'Not applicable: instruction and record changes only; no Figma read or write.',
    figmaMutations: [], flagsAdded: [],
    stopCondition: 'Repository-only. No change to risk ownership, additive-only rules, DONE records, or the execution policy text.'
  }
}));
