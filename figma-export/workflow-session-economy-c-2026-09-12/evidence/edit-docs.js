// Batch C doc and catalog edits: exact single-anchor replacements, EOL and indent preserved.
const fs = require('fs');
const path = require('path');
const ROOT = 'C:/Code/design system';

function replaceOnce(file, anchor, replacement) {
  const full = path.join(ROOT, file);
  const text = fs.readFileSync(full, 'utf8');
  const count = text.split(anchor).length - 1;
  if (count !== 1) throw new Error(`${file}: anchor found ${count} times: ${anchor.slice(0, 60)}`);
  fs.writeFileSync(full, text.replace(anchor, replacement));
  console.log(`edited ${file}`);
}

// CLAUDE.md: name the measurement tool and the ceilings in the lean startup section.
replaceOnce('CLAUDE.md',
  'Sections that live only in this file are declared canonical by name inside the contract.',
  'Sections that live only in this file are declared canonical by name inside the contract. The validator line shows the lean set\'s bytes against its ceiling (`workflow/check-catalog.json` → byteCeilings, record workflow_sessionEconomyC_2026-09-12); at batch close, `node scripts/workflow/measure-startup.js` reports the calls and result bytes that preceded the first task action, for the report\'s startup accounting.');

// workflow/runner.md: packet version 2 contents and the packet ceiling.
replaceOnce('workflow/runner.md',
  'It contains the selected record, exact approval evidence, dependencies, canonical rules, active findings, appearance specification and checkpoint.',
  'It contains the selected record, exact approval evidence, dependencies, appearance specification, checkpoint and controls; since version 2 (2026-09-12) the canonical rules, the NPVE rules, the selected active findings and CLAUDE.md are referenced by path and digest under `references` and read from those files, never copied.');
replaceOnce('workflow/runner.md',
  'It measures bytes, not tokens or credits.',
  'It measures bytes, not tokens or credits. Since packet version 2 the compact packet must stay under the `runnerPacket` ceiling in `workflow/check-catalog.json` → byteCeilings; generation fails above it.');

// workflow/README.md: the catalog now carries the ceilings.
replaceOnce('workflow/README.md',
  'the deterministic-vs-visual check split, the evidence packet shape, and pilot measurements.',
  'the deterministic-vs-visual check split, the byte ceilings on the startup files (enforced by `validate-ceilings.js`; `measure-startup.js` reports a session\'s pre-task reads from its transcript), the evidence packet shape, and pilot measurements.');

// workflow/check-catalog.json: byteCeilings section and the deterministic check, indent and EOL preserved.
const catalogFile = path.join(ROOT, 'workflow/check-catalog.json');
const raw = fs.readFileSync(catalogFile, 'utf8');
const eol = raw.includes('\r\n') ? '\r\n' : '\n';
const indent = (raw.match(/\n([ \t]+)"/) || [null, '  '])[1];
const catalog = JSON.parse(raw);
if (catalog.byteCeilings) throw new Error('byteCeilings already present');
const next = {
  format: catalog.format,
  version: catalog.version,
  deterministic: {
    ...catalog.deterministic,
    byteCeilings: 'Startup files stay under the byte ceilings in byteCeilings: CLAUDE.md, the contract, every manifest item, current-state and the worst-case lean set; a record dated on or after the adoption date stays under the record ceiling (IN PROGRESS fails, DONE is reported on the validator line); the runner packet is checked when it is generated.'
  },
  visual: catalog.visual,
  byteCeilings: {
    adopted: '2026-09-12, record workflow_sessionEconomyC_2026-09-12',
    unit: 'UTF-8 bytes: files and records on disk; a manifest item as its pretty-printed JSON at indent 2, the size a scoped projection returns',
    files: {
      'CLAUDE.md': 16000,
      'workflow/npve-contract.generated.json': 100000,
      'indexes/current-state.json': 4000
    },
    manifestItem: 16000,
    record: { bytes: 32000, appliesFrom: '2026-09-12', inProgress: 'fail', done: 'report on the validator line; the next record cites the breach' },
    runnerPacket: 64000,
    leanSet: 128000,
    leanSetDefinition: 'CLAUDE.md + the generated contract + the largest manifest item + indexes/current-state.json + the largest of the latest record per workstream; the validator line itself is not counted',
    remedy: 'Move bulk out of the file: evidence to figma-export/<batch>/, enumerations to a cited file, prose to the report. A DONE record is immutable; its breach is reported, not repaired.'
  },
  policy: catalog.policy
};
for (const key of Object.keys(catalog)) if (!(key in next)) throw new Error(`catalog key dropped: ${key}`);
fs.writeFileSync(catalogFile, JSON.stringify(next, null, indent).replace(/\n/g, eol) + (raw.endsWith(eol) ? eol : ''));
console.log(`edited workflow/check-catalog.json (indent ${JSON.stringify(indent)}, eol ${JSON.stringify(eol)})`);
