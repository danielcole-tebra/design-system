// Checkpoints the IN PROGRESS record after the 2026-09-12 resume attempt stopped at the source read.
// Uses record-scripts checkpoint: status stays IN PROGRESS, the record ceiling is measured, aggregate and indexes regenerate.
const fs = require('fs');
const path = require('path');
const { checkpoint } = require('../../scripts/schema/record-scripts');
const B = 'figma-export/npve-flowsheets-finish-2026-09-11';
const S = `${B}/source-read-2026-09-12`;
const accounting = fs.readFileSync(path.resolve(__dirname, '../..', S, 'startup-accounting.txt'), 'utf8');
const m = accounting.match(/before the first task action: ([\d,]+) calls, ([\d,]+) result bytes \(([\d,]+) chars\), (\d+) images, (\d+) persisted results/);
const num = (s) => Number(String(s).replace(/,/g, ''));
const firstTask = (accounting.match(/first task action: ([^\n]+)/) || [])[1] || 'not detected';
const result = checkpoint('npveRebuild_flowsheetsFinish_2026-09-11', (record) => ({
  ...record,
  _status: 'IN PROGRESS — STOPPED again 2026-09-12 at the source read: the runner read program cannot read set 129:6647 (variantProperties throws on every child); radio answers and form interiors remain verified',
  nextAction: 'Planner/operator: amend the source-gate treatment (workflow batch) so a set whose variantProperties also throw is accepted on the evidence Figma still gives, or repair the source externally; then resume in a fresh session through resume-batch.js with the operator\'s go-ahead quoted. Do not derive variant properties from names, change the source, substitute the source, replay creations or replace runner operations with ad hoc writes.',
  findings: [...(record.findings || []), {
    id: 'npveFlowsheets_sourceVariantPropertiesUnreadable_2026-09-12',
    severity: 'high',
    kind: 'WORKFLOW BLOCKER',
    summary: 'Source set 129:6647 also rejects variantProperties on all 55 children and variantGroupProperties on the set; the source-gate treatment reads variantProperties inside its catch, so the runner read program throws before returning. Second stop, same item.',
    status: 'OPEN',
    discoveredDuring: 'npveRebuild_flowsheetsFinish_2026-09-11 (resume attempt 2026-09-12)',
    report: `${B}/report.md`,
    evidence: `${S}/error.json`
  }],
  resumeAttempt_2026_09_12: {
    executor: 'Claude Code, Claude Fable 5.1, fresh session 2026-09-12',
    startupAccounting: {
      tool: 'scripts/workflow/measure-startup.js',
      saved: `${S}/startup-accounting.txt`,
      callsBeforeFirstTaskAction: m ? num(m[1]) : null,
      resultBytesBeforeFirstTaskAction: m ? num(m[2]) : null,
      persistedResults: m ? Number(m[5]) : null,
      firstTaskAction: firstTask,
      leanSet: '128,376 bytes against the 128,000 target, reported as leanOverTarget on the validator line'
    },
    step1_sourceRead: {
      program: 'scripts/workflow/runner/plugin.js read program (the read program scripts/workflow/source-definitions.js delegates to), compiled with node scripts/workflow/npve-runner.js compile',
      plan: `${S}/plan.json`,
      script: `${S}/script.js`,
      outcome: 'threw before returning; no readback saved; no mutation',
      error: 'in get_variantProperties: Component set for node has existing errors',
      figmaDebugUUID: '0711a620-8236-462e-9e29-d9d86f8d907f',
      errorEvidence: `${S}/error.json`,
      diagnostic: `${S}/diagnostic.json`,
      diagnosticSummary: 'Read-only: set 129:6647 Sidesheetv3 on page 21:321 ⚙️ Components, 18040×2415, 55 children. componentPropertyDefinitions → "in get_componentPropertyDefinitions: Component set has existing errors"; variantGroupProperties → "in get_variantGroupProperties: Component set has existing errors"; variantProperties throws on 55 of 55 children. Ids, names, keys, sizes, visibility readable; 939:9228, 867:7460 and 909:12649 match the 2026-09-11 blocker evidence.',
      sourceControlWritten: false,
      unresolvedCleared: false,
      flagAdded: 'npveFlowsheets_sourceVariantPropertiesUnreadable_2026-09-12 (the 2026-09-11 flag npveFlowsheets_sourceDefinitionBlocker_2026-09-11 already names the set and stays open)'
    },
    step2_resume: {
      attempted: false,
      reason: 'The prompt\'s go-ahead slot carried an unfilled placeholder rather than an operator sentence, and execution.json is not valid at ready (two unresolved entries), so resume-batch.js would refuse. It was not run, so no placeholder was recorded as an operator quote.'
    },
    step3_finish: {
      attempted: false,
      reason: 'The runner cannot execute any step for this item while its read of the manifest source throws.'
    },
    operatorDecisionsRecorded: [
      { subject: 'resume-batch refuses on a changed DONE record and reports changes to other open records, foundation sections, or flags', operatorQuote: 'agree on both' },
      { subject: 'Lean set 376 bytes over target is accepted as a reported condition; no trim, no retune', operatorQuote: 'agree on both' }
    ],
    toolingFilesOpened: {
      reason: 'The prompt named scripts/workflow/source-definitions.js as the read program; it delegates to the runner, whose dispatch shape and evidence rules the contract does not carry; the flag and checkpoint call shapes were projected from scripts/schema/lib.js and record-scripts.js exports.',
      files: ['scripts/workflow/source-definitions.js', 'scripts/workflow/runner/plugin.js', 'scripts/workflow/validate-execution.js', 'scripts/workflow/npve-runner.js', 'scripts/workflow/runner/core.js', 'scripts/workflow/runner/stdio.js', 'scripts/workflow/runner/evidence.js', 'scripts/schema/record-scripts.js (exports and three function heads)', 'scripts/schema/lib.js (exports and appendFlags)']
    },
    gapCount: 'unchanged; no new GAP',
    defectCount: 'unchanged; no new DEFECT',
    figmaMutations: 'none; two read-only calls against the read-only source, no page or selection change'
  }
}));
console.log(JSON.stringify(result, null, 2));
