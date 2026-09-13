// apply-npve-agent-rules.js — records npveRebuild_agentRules_2026-09-04. Documentation batch: agent-rules section added to CLAUDE.md, AGENTS.md created.
// Repo writes only, no Figma writes. Backup first. Additive: one record, one cross-reference line on an existing audit flag, no flag removed.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-04-pre-npve-agent-rules.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const D = 'npveRebuild_agentRules_2026-09-04';
if (s[D]) throw new Error('record already exists');
const flagsBefore = s.flags.length;

const rulesText = fs.readFileSync('./AGENTS.md', 'utf8').replace(/\r\n/g, '\n');
const section = rulesText.slice(rulesText.indexOf('## Rules for any agent working in these files')).trim();
const claude = fs.readFileSync('./CLAUDE.md', 'utf8').replace(/\r\n/g, '\n');
if (!claude.includes(section)) throw new Error('CLAUDE.md section is not verbatim to AGENTS.md');

s[D] = {
  _status: 'DONE. Documentation batch. Repo writes only: CLAUDE.md gained the section "Rules for any agent working in these files" after Known plugin API traps; AGENTS.md created in the repo root with the same section verbatim plus one context paragraph. No Figma file opened or written.',
  date: '2026-09-04',
  _targetFile: 'none (no Figma writes)',
  _libraryFile: 'none',
  _sourceFile: 'not opened',
  report: 'figma-export/npve-agent-rules-2026-09-04/report.md',
  readFirst: {
    claudeMd: 'read',
    auditRecord: 'npveRebuild_audit_2026_09_03 read',
    repair1Retro: 'not present: no npveRebuild_repair1 record in the schema and figma-export/npve-repair1-2026-09-04/ holds eight screenshots and no report.md. Treated as not yet run.'
  },
  stopCondition: 'Two repo files edited/created and one schema record written; stop. No Figma writes, no other docs touched.',
  filesWritten: {
    'CLAUDE.md': 'New H2 "Rules for any agent working in these files" inserted between "Known plugin API traps" and "Recording". Nine numbered rules plus a lead sentence, text as given in the batch prompt. CRLF preserved.',
    'AGENTS.md': 'New file, repo root. One context paragraph (project, five Figma file keys, location of CLAUDE.md and the schema, CLAUDE.md is canonical and wins on conflict) followed by the same section verbatim. Written for tools that read AGENTS.md by convention (Codex and others).'
  },
  sectionText: section,
  verification: 'Section body diffed between CLAUDE.md, AGENTS.md and the prompt text after CRLF normalisation: identical. Heading order in CLAUDE.md: What this folder is, Where truth lives, Superseded, Figma files, Standing rules, Known plugin API traps, Rules for any agent working in these files, Recording, Publishing.',
  flagUpdated: {
    id: 'npveAudit_unrecordedRestructure',
    change: 'Added addressedBy cross-reference and one line to handling. Flag otherwise unchanged; the retroactive record it asks for is still owed.'
  },
  flagsAdded: [],
  standingRules: 'Not applicable: no Figma node read or written, so the ten standingBatchRules and rules 14/15 have nothing to walk. Rule 13 followed (report on disk, short reply).',
  decisionsNeeded: [],
  screenshots: []
};

const f = s.flags.find(x => x.id === 'npveAudit_unrecordedRestructure');
if (!f) throw new Error('flag npveAudit_unrecordedRestructure not found');
f.addressedBy = D + ': the process failure (an external session building with no record) is now covered by CLAUDE.md "Rules for any agent working in these files" and AGENTS.md; rules 1, 2 and 7 there are the binding answer. The retroactive record for sessions 74–78 and 88–172 remains owed.';
f.handling = f.handling + ' Process gap addressed 2026-09-04 by npveRebuild_agentRules_2026-09-04 (see addressedBy); the record itself is still owed.';

s[D].flagsBefore = flagsBefore;
s[D].flagsAfter = s.flags.length;
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote', D, 'flags', flagsBefore, '->', s.flags.length);
