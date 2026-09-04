// apply-docs-operators-guide.js — records docsOperatorsGuide_2026-09-04. Documentation batch: OPERATORS.md created, record gate added to CLAUDE.md as agent rule 10, three-way cross-references.
// Repo writes only, no Figma writes. Backup first. Additive: one record, one flag (AGENTS.md verbatim claim now stale), nothing removed.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-04-pre-docs-operators-guide.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const D = 'docsOperatorsGuide_2026-09-04';
if (s[D]) throw new Error('record already exists');
const flagsBefore = s.flags.length;

const nl = t => t.replace(/\r\n/g, '\n');
const claude = nl(fs.readFileSync('./CLAUDE.md', 'utf8'));
const agents = nl(fs.readFileSync('./AGENTS.md', 'utf8'));
const operators = nl(fs.readFileSync('./OPERATORS.md', 'utf8'));
const rule10 = '10. Record gate. Before starting any batch, check that the previous batch in this workstream has a schema record. If it does not, refuse the batch and run a read-only state check instead; its record stands in for the missing one.';
const xrefClaude = "OPERATORS.md describes the person's side of this loop; agents should assume an operator is holding it.";
const xrefAgents = 'OPERATORS.md in this root describes the operator seat.';
for (const [ok, msg] of [
  [claude.includes(rule10), 'rule 10 missing in CLAUDE.md'],
  [claude.includes(xrefClaude), 'CLAUDE.md cross-reference missing'],
  [agents.includes(xrefAgents), 'AGENTS.md cross-reference missing'],
  [operators.startsWith("# Operator's guide — running the design system build loop"), 'OPERATORS.md title'],
  [operators.trim().endsWith("that's the warning, not the win."), 'OPERATORS.md ending'],
  [operators.includes('Ownership: [who decides design questions — fill in per project or team].'), 'ownership bracket']
]) if (!ok) throw new Error(msg);
const agentsSection = agents.slice(agents.indexOf('## Rules for any agent')).trim();
const claudeSectionVerbatim = claude.includes(agentsSection + '\n' + rule10);

s[D] = {
  _status: 'DONE. Documentation batch. Repo writes only: OPERATORS.md created; CLAUDE.md gained agent rule 10 (record gate) and one cross-reference line in its opening section; AGENTS.md gained one cross-reference sentence. Committed. No Figma file opened or written.',
  date: '2026-09-04',
  _targetFile: 'none (no Figma writes)',
  _libraryFile: 'none',
  _sourceFile: 'not opened',
  report: 'figma-export/docs-operators-guide-2026-09-04/report.md',
  readFirst: { claudeMd: 'read, including Rules for any agent working in these files (items 1–9)', record: 'npveRebuild_agentRules_2026-09-04 read' },
  recordGate: 'Previous batch in this workstream (npveRebuild_agentRules_2026-09-04) has a record. Gate passed.',
  stopCondition: 'One new file, two edited files, one record, one commit; stop.',
  filesWritten: {
    'OPERATORS.md': "New, repo root. Operator's guide text as supplied in the batch prompt. Markdown structure restored from the pasted plain text: H1 title, five H2 sections (Why this guide exists; The standing structure; The loop, from your seat; Which decisions are whose; What good looks like), bulleted lists with bold lead phrases under The standing structure (4) and The loop (6). Words unchanged. Ownership line left with its bracket for Daniel to fill. CRLF like the other root docs.",
    'CLAUDE.md': 'Item 10 appended to Rules for any agent working in these files (record gate). One line added to the opening section after the folder description: the OPERATORS.md cross-reference.',
    'AGENTS.md': 'One sentence appended to the context paragraph: the OPERATORS.md cross-reference. The rules section itself was not touched.'
  },
  additions: { claudeRule10: rule10, claudeOpening: xrefClaude, agentsContext: xrefAgents },
  verification: 'Apply script re-reads all three files and asserts each addition is present, the guide starts and ends on the prescribed lines, and the ownership bracket is intact. Section verbatim check CLAUDE.md vs AGENTS.md: ' + (claudeSectionVerbatim ? 'AGENTS.md section equals CLAUDE.md items 1–9; CLAUDE.md additionally has item 10.' : 'mismatch beyond item 10'),
  finding: 'AGENTS.md still states that it repeats the CLAUDE.md section verbatim, but after this batch CLAUDE.md has item 10 and AGENTS.md has items 1–9 only. The batch prompt scoped item 10 to CLAUDE.md and scoped the AGENTS.md change to one sentence, so AGENTS.md was left as instructed. Reported, not reconciled (rule 11). Decision: add item 10 to AGENTS.md, or reword its verbatim claim.',
  decisionsNeeded: ['AGENTS.md verbatim claim vs CLAUDE.md item 10: mirror the rule into AGENTS.md or reword the claim.'],
  flagsAdded: ['docsAgentsMdVerbatimClaimStale'],
  standingRules: 'Not applicable: no Figma node read or written. Rule 13 followed.',
  screenshots: [],
  commit: 'filled after commit; see report'
};

s.flags.push({
  discoveredDuring: D,
  webAppV2BugListCandidate: false,
  handling: 'Reported. Decision needed: mirror rule 10 into AGENTS.md or reword its verbatim claim.',
  id: 'docsAgentsMdVerbatimClaimStale',
  severity: 'low',
  kind: 'DEFECT',
  summary: 'AGENTS.md says it repeats the CLAUDE.md agent-rules section verbatim; CLAUDE.md now has item 10 (record gate) and AGENTS.md has items 1–9.',
  where: 'repo root: AGENTS.md context paragraph; CLAUDE.md "Rules for any agent working in these files"',
  detail: 'Introduced by docsOperatorsGuide_2026-09-04, which was scoped to add item 10 to CLAUDE.md only. Codex and other tools reading AGENTS.md will not see the record gate until it is mirrored.'
});
s[D].flagsBefore = flagsBefore;
s[D].flagsAfter = s.flags.length;
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote', D, 'flags', flagsBefore, '->', s.flags.length);
