// Scaffolds a batch's apply-*.js and finalize-*.js from the templated record helpers (record workflow_recordScripts_2026-09-12).
// The pair calls scripts/schema/record-scripts.js: apply() opens the IN PROGRESS record, close() finalizes it, and
// both refuse a record over byteCeilings.record before anything is written. Placeholders are marked TODO(...) and
// apply()/close() refuse a body that still carries one, so an unfilled scaffold cannot open or close a record.
//
// Usage: node scripts/schema/new-record-scripts.js --id <recordId> --previous <recordId[,recordId]> --date YYYY-MM-DD
//          [--workstream workflow|npve|library|…] [--slug <file-slug>] [--evidence figma-export/<batch>] [--by "<executor>"] [--out <dir>]
// Writes apply-<slug>.js and finalize-<slug>.js into --out (default: the repository root); refuses to overwrite.
const fs = require('fs');
const path = require('path');
const lib = require('./lib');

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

function applyTemplate({ id, previous, workstream, date, slug, evidence, by }) {
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
    canvasChecks: 'TODO(what is verified on the canvas, or: Not applicable: repository-only)',
    figmaMutations: [],
    flagsAdded: [],
    stopCondition: 'TODO(what stops the batch)',
    nextAction: 'TODO(the next step after this record opens)'
  }
});
console.log(\`opened \${result.file} (\${result.bytes} bytes, headroom \${result.headroom})\`);
`;
}

function finalizeTemplate({ id, slug, evidence }) {
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
    canvas: 'TODO(N/A — no Figma read or write, or the comparison render and audit files)',
    screenshots: 'TODO(N/A, or the PNG files under ' + evidence + ')',
    figmaCalls: 0,
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

function scaffold(args) {
  for (const key of ['id', 'previous', 'date']) if (!args[key]) throw new Error(`--${key} is required`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(args.date)) throw new Error('--date must be YYYY-MM-DD');
  const spec = {
    id: args.id,
    previous: args.previous.split(',').map((s) => s.trim()).filter(Boolean),
    workstream: args.workstream || lib.workstreamFor(args.id),
    date: args.date,
    slug: args.slug || slugFor(args.id),
    by: args.by || 'TODO(executor: model and harness, or the person)'
  };
  spec.evidence = args.evidence || `figma-export/${spec.slug}`;
  const outDir = path.resolve(REPO, args.out || '.');
  fs.mkdirSync(outDir, { recursive: true });
  const files = [[`apply-${spec.slug}.js`, applyTemplate(spec)], [`finalize-${spec.slug}.js`, finalizeTemplate(spec)]];
  for (const [name] of files) if (fs.existsSync(path.join(outDir, name))) throw new Error(`${name} already exists in ${outDir}; not overwriting`);
  for (const [name, text] of files) fs.writeFileSync(path.join(outDir, name), text, { flag: 'wx' });
  return { ...spec, outDir, files: files.map(([name]) => path.relative(REPO, path.join(outDir, name)).split(path.sep).join('/')) };
}

if (require.main === module) {
  const result = scaffold(parseArgs(process.argv.slice(2)));
  console.log(`scaffolded ${result.files.join(' and ')} for ${result.id} (previous ${result.previous.join(', ')}; evidence ${result.evidence})`);
  console.log('Next: fill every TODO(...) in the apply script, run it to open the record, do the batch, write the report, fill the finalize script, run it, commit the record with the regenerated indexes.');
}

module.exports = { applyTemplate, finalizeTemplate, parseArgs, scaffold, slugFor };
