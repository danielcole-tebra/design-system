// Post-pilot close: records the merge of codex/lean-workflow into master, the step-1 tier-approval check on
// leanPilot_run3_2026-09-08, and Daniel's acceptance of both runs 2-3 comparisons (written to both pilot
// records as operatorReview). Backup first. No Figma writes.
const fs = require('fs');
const { execFileSync } = require('child_process');

const P = './design-system-schema.json';
const BACKUP = './design-system-schema.backup-2026-09-08-pre-post-pilot-merge.json';
const ID = 'postPilot_merge_2026-09-08';
const RUN23 = 'leanPilot_run2-3_2026-09-08';
const RUN3 = 'leanPilot_run3_2026-09-08';
const DIR = 'figma-export/post-pilot-merge-2026-09-08';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s[ID]) throw new Error(`${ID} already exists`);
for (const id of [RUN23, RUN3]) if (!String(s[id]._status || '').startsWith('DONE')) throw new Error(`Record gate failed: ${id} is not DONE`);
if (!fs.existsSync(BACKUP)) fs.copyFileSync(P, BACKUP);

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const mergeCommit = git('rev-parse', '--short', 'HEAD');
const mergeParents = git('log', '-1', '--format=%p', 'HEAD');
const branch = git('branch', '--show-current');
if (branch !== 'master') throw new Error(`expected master, on ${branch}`);
if (!git('log', '-1', '--format=%s', 'HEAD').startsWith('Merge codex/lean-workflow')) throw new Error('HEAD is not the merge commit');

const acceptance = {
  date: '2026-09-08',
  by: 'Daniel (operator)',
  quote: 'comparisons look good',
  relayedIn: 'the post-pilot close prompt of 2026-09-08 (session message 2026-09-09T03:13Z): "Daniel has accepted both comparisons, quote his \\"comparisons look good\\" with today\'s date in the record"',
  covers: ['pilot2-hospitalizations-edit comparison 581:11117', 'pilot2-procedures-edit comparison 586:11765']
};
s[RUN23].operatorReview = acceptance;
s[RUN3].operatorReview = acceptance;

s[ID] = {
  _status: 'DONE. codex/lean-workflow merged into master with a merge commit; schema, metrics and Figma state agree post-merge; item 2 tier approval verified present in its record (no gate bypass); Daniel\'s acceptance of both runs 2-3 comparisons written to both pilot records.',
  date: '2026-09-08',
  workstream: 'Workflow / lean pilot close',
  executor: 'Claude (Anthropic claude-fable-5-1)',
  recordGate: `${RUN23} and ${RUN3} recorded DONE — passed`,
  report: `${DIR}/report.md`,
  step1_tierApprovalCheck: {
    question: 'Does record leanPilot_run3_2026-09-08 contain Daniel\'s quoted approval words as the gate requires?',
    result: 'PRESENT — no gate bypass.',
    quoteInRecord: s[RUN3].risk.approval.quote,
    approvedAt: s[RUN3].risk.approval.approvedAt,
    approvedBy: s[RUN3].risk.approval.approvedBy,
    alsoInManifest: 'workflow/manifest.json pilot2-procedures-edit risk.approval carries the same quote with lock ' + JSON.parse(fs.readFileSync('./workflow/manifest.json', 'utf8')).items.find((i) => i.id === 'pilot2-procedures-edit').risk.lock.slice(0, 12) + '…',
    item1ForReference: { quote: s[RUN23].risk.approval.quote, approvedAt: s[RUN23].risk.approval.approvedAt },
    operatorAcceptance: acceptance
  },
  step2_merge: {
    note: 'The repository has no branch named main; its default branch is master (main was the name used in the prompt and in the session gitStatus header). Merged into master.',
    from: 'codex/lean-workflow at c20cd6b (13 commits ahead of master, 0 behind; merge-base cb3a842 = tag baseline/pre-lean-workflow-2026-09-08)',
    mergeCommit,
    mergeParents,
    strategy: 'git merge --no-ff so the merge is a single reportable commit',
    treeClean: true,
    postMergeAgreement: {
      schema: 'records leanPilot_run2-3_2026-09-08, leanPilot_run3_2026-09-08, workflowRefactor_closeout_2026-09-08 and npveRebuild_pastMedicalHistoryBody_2026-09-08 present and DONE on master',
      metrics: 'workflow/metrics.json holds the Facility Stay baseline and pilot runs 1, 2, 3',
      manifest: 'five items, all complete',
      contract: 'validate-workflow PASS on master after the merge (see report for the digest)',
      figma: 'fdCQVFdvOByaOYIJYag0d6 pages 0:1/3:2/27:2/126:2; comparisons 521:7835, 537:9915, 561:9877, 581:11117, 586:11765 and 434:7474 present at their recorded sizes; Sidesheet Body content preferred values 15; comparison slots 18 each'
    }
  },
  findings: { GAP: 0, DEFECT: 0, DECISION: 0, PROCESS: 0 },
  flagsBefore: s.flags.length,
  flagsAfter: s.flags.length,
  flagsAdded: [],
  figmaMutations: []
};
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('recorded', ID, '| merge', mergeCommit, mergeParents, '| backup', BACKUP);
