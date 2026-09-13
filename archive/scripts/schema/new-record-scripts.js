// Scaffolds a batch's apply-*.js, finalize-*.js and plan.md from the templated record helpers (records
// workflow_recordScripts_2026-09-12 and workflow_planInventory_2026-09-12). The pair calls
// scripts/schema/record-scripts.js: apply() opens the IN PROGRESS record, close() finalizes it, and both refuse a
// record over byteCeilings.record before anything is written. Placeholders are marked TODO(...) and apply()/close()
// refuse a body or a plan that still carries one, so an unfilled scaffold cannot open or close a record.
//
// plan.md is the planner's phase checklist, written to the evidence folder and required by every gate from open to
// finish. A Figma batch (--kind figma) also gets inventory-walk.figma.js, the read-only walk whose result is saved as
// inventory.json by scripts/figma/inventory.js; a repository-only batch keeps no inventory.
//
// Usage: node scripts/schema/new-record-scripts.js --id <recordId> --previous <recordId[,recordId]> --date YYYY-MM-DD
//          [--kind figma|repository] [--target npve|library|proposals|<fileKey>] [--workstream workflow|npve|library|…]
//          [--slug <file-slug>] [--evidence figma-export/<batch>] [--by "<executor>"] [--out <dir>]
// --kind defaults to repository for the workflow workstream and figma otherwise. Writes apply-<slug>.js and
// finalize-<slug>.js into --out (default: the repository root) and plan.md (plus the walk script) into --evidence;
// refuses to overwrite any of them.
const fs = require('fs');
const path = require('path');
const lib = require('./lib');
const { KINDS } = require('../workflow/batch-files');
const inventory = require('../figma/inventory');

const REPO = path.resolve(__dirname, '..', '..');

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) throw new Error(`Unexpected argument ${arg}`);
    out[arg.slice(2)] = argv[i + 1];
    i += 1;
  }
  return out;
}

// workflow_recordScripts_2026-09-12 → workflow-record-scripts-2026-09-12
function slugFor(id) {
  return id.split('_').map((part) => part.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()).join('-');
}

const q = (value) => JSON.stringify(value).replace(/^"|"$/g, "'");

function applyTemplate({ id, previous, workstream, date, slug, evidence, by, kind }) {
  return `// Opens the ${id} record. Usage: node apply-${slug}.js
// Fill every TODO(...) before running: apply() refuses a body that still carries one.
const { apply } = require('./scripts/schema/record-scripts');

const id = ${q(id)};
const result = apply({
  id,
  previous: ${JSON.stringify(previous)},
  workstream: ${q(workstream)},
  date: ${q(date)},
  createdBy: ${q(by)},
  body: {
    _status: 'IN PROGRESS — TODO(one line: what this batch builds or changes)',
    date: ${q(date)},
    batchKind: ${q(kind)},
    plan: ${q(`${evidence}/plan.md`)},${kind === 'figma' ? `
    inventory: ${q(`${evidence}/inventory.json`)},` : ''}
    workstream: 'TODO(workstream label, e.g. Workflow / session economy or NPVE Rebuild / Sidesheets)',
    executor: ${q(by)},
    risk: {
      tier: 'TODO(low | medium | high | human-decision, assigned by the planner or operator, never by the executor)',
      assignedBy: 'TODO(who assigned the tier and where)',
      operatorQuote: 'TODO(the operator\\'s commissioning statement, verbatim)'
    },
    planAsProposed: 'TODO(the plan as proposed, with the record that proposed it)',
    scope: [
      'TODO(one line per deliverable or file)'
    ],
    report: ${q(`${evidence}/report.md`)},
    canvasChecks: ${kind === 'figma' ? "'TODO(what is verified on the canvas, and the comparison render that shows it)'" : "'Not applicable: repository-only batch'"},
    figmaMutations: [],
    flagsAdded: [],
    stopCondition: 'TODO(what stops the batch)',
    nextAction: 'TODO(the next step after this record opens)'
  }
});
console.log(\`opened \${result.file} (\${result.bytes} bytes, headroom \${result.headroom})\`);
`;
}

function finalizeTemplate({ id, slug, evidence, kind }) {
  return `// Closes the ${id} record. Usage: node finalize-${slug}.js
// preflight() runs the validator, the ceilings and the self-tests first so the recorded evidence is measured;
// close() refuses a record over the ceiling before it becomes immutable, and a changed risk tier.
const { close, preflight } = require('./scripts/schema/record-scripts');

const id = ${q(id)};
const evidence = ${q(evidence)};
const validation = preflight();

const result = close(id, (record) => ({
  ...record,
  _status: 'DONE — TODO(one line: what is now in place)',
  outcome: 'TODO(what changed, in plain language, for the operator)',
  implementation: [
    'TODO(one line per file: what it does now)'
  ],
  validation: {
    ...validation,
    canvas: ${kind === 'figma' ? "'TODO(the comparison render and audit files, and the inventory reverification before the first write)'" : "'N/A — no Figma read or write'"},
    screenshots: ${kind === 'figma' ? "'TODO(the PNG files under ' + evidence + ')'" : "'N/A — repository-only batch; nothing rendered'"},
    figmaCalls: ${kind === 'figma' ? "'TODO(number)'" : '0'},
    figmaMutations: ${kind === 'figma' ? "'TODO(number)'" : '0'},
    existingDoneRecordsEdited: 0
  },
  startupAccounting: {
    measuredBy: 'scripts/workflow/measure-startup.js, output in ' + evidence + '/startup-this-session.json',
    callsBeforeFirstTaskAction: 'TODO(number)',
    resultBytesBeforeFirstTaskAction: 'TODO(number)',
    note: 'TODO(what the pre-task calls read, by scoped projection)'
  },
  findings: { GAP: 0, DEFECT: 0, DECISION: 0 },
  decisionsForOperator: [],
  deferred: [],
  nextAction: 'TODO(the next batch, in a fresh session)'
}));
console.log(\`finalized \${result.file} (\${result.bytes} bytes, headroom \${result.headroom}); \${result.status}\`);
`;
}

// The planner's phase checklist. Every gate from open to finish reads it: a TODO blocks apply, an open phase blocks close.
function planTemplate({ id, kind, evidence, slug, target }) {
  const figma = kind === 'figma';
  const phases = [
    '- [ ] Lean start: validator line, contract, manifest item and last record read by scoped projection; the calls and bytes before the first task action noted for the report',
    ...(figma ? [
      `- [ ] Inventory walk: first read-only walk of ${target.fileKey} saved to ${evidence}/inventory.json (inventory-walk.figma.js, then node scripts/figma/inventory.js save) before any write`,
      '- [ ] Mappings: the components, variants, exposed properties and dimensions of the next milestone verified against the library; execution.json saved',
      '- [ ] Re-verify before the first write: the nodes to mutate read back by id, name, type and parent (node scripts/figma/inventory.js reverify, then record); the latest reverification clean',
      '- [ ] TODO(milestone 1: what becomes visible, and the saved render that shows it)',
      '- [ ] Comparison render inspected by the executor and shown to the operator; the ten standing batch rules run'
    ] : [
      '- [ ] TODO(deliverable 1: the file and what it does when the phase is done)',
      '- [ ] Self-tests and the validator pass'
    ]),
    `- [ ] Report written to ${evidence}/report.md with the startup accounting`,
    `- [ ] Record closed through finalize-${slug}.js and committed with the regenerated indexes`
  ];
  return `# ${id} plan

Record: ${id}
Kind: ${kind}
Evidence: ${evidence}
Stop condition: TODO(what stops the batch, in one line)

The planner writes this checklist before the record opens and keeps it current through the batch. A phase is checked (\`[x]\`) when its evidence exists; a dropped phase is marked \`[-]\` with the reason after a colon. The gates refuse an unfilled placeholder at open and an open phase at close.${figma ? ' The inventory is a candidate list, never evidence: the nodes a script mutates are re-verified in Figma first (standing rule 3).' : ''}

## Phases

${phases.join('\n')}
`;
}

function scaffold(args) {
  for (const key of ['id', 'previous', 'date']) if (!args[key]) throw new Error(`--${key} is required`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(args.date)) throw new Error('--date must be YYYY-MM-DD');
  const workstream = args.workstream || lib.workstreamFor(args.id);
  const kind = args.kind || (workstream === 'workflow' ? 'repository' : 'figma');
  if (!KINDS.includes(kind)) throw new Error(`--kind must be ${KINDS.join(' or ')}`);
  const spec = {
    id: args.id,
    previous: args.previous.split(',').map((s) => s.trim()).filter(Boolean),
    workstream,
    kind,
    date: args.date,
    slug: args.slug || slugFor(args.id),
    by: args.by || 'TODO(executor: model and harness, or the person)'
  };
  spec.evidence = args.evidence || `figma-export/${spec.slug}`;
  spec.target = kind === 'figma' ? inventory.target(args.target) : null;
  const outDir = path.resolve(REPO, args.out || '.');
  const evidenceDir = path.resolve(REPO, spec.evidence);
  const files = [
    [path.join(outDir, `apply-${spec.slug}.js`), applyTemplate(spec)],
    [path.join(outDir, `finalize-${spec.slug}.js`), finalizeTemplate(spec)],
    [path.join(evidenceDir, 'plan.md'), planTemplate(spec)]
  ];
  if (kind === 'figma') files.push([path.join(evidenceDir, inventory.WALK_SCRIPT), `${inventory.walkScript({ fileKey: spec.target.fileKey, pages: spec.target.pages })}\n`]);
  for (const [file] of files) if (fs.existsSync(file)) throw new Error(`${path.relative(REPO, file)} already exists; not overwriting`);
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(evidenceDir, { recursive: true });
  for (const [file, text] of files) fs.writeFileSync(file, text, { flag: 'wx' });
  return { ...spec, outDir, files: files.map(([file]) => path.relative(REPO, file).split(path.sep).join('/')) };
}

if (require.main === module) {
  const result = scaffold(parseArgs(process.argv.slice(2)));
  console.log(`scaffolded ${result.files.join(', ')} for ${result.id} (${result.kind} batch; previous ${result.previous.join(', ')}; evidence ${result.evidence})`);
  console.log(`Next: write the phase checklist in ${result.evidence}/plan.md and fill every TODO(...) in the apply script, run it to open the record${result.kind === 'figma' ? `, run ${inventory.WALK_SCRIPT} with use_figma and save its result (node scripts/figma/inventory.js save), re-verify the nodes to mutate before the first write` : ''}, do the batch, write the report, fill the finalize script, run it, commit the record with the regenerated indexes.`);
}

module.exports = { applyTemplate, finalizeTemplate, parseArgs, planTemplate, scaffold, slugFor };
