// Self-test of scripts/schema/new-record-scripts.js: the apply/finalize pair, plan.md and the inventory walk script
// land in a scratch folder with the placeholders the gates refuse (record workflow_planInventory_2026-09-12).
// Nothing is written to the repository and no record is opened.
const assert = require('assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { parseArgs, planTemplate, scaffold, slugFor } = require('./new-record-scripts');
const { checkOpenBody } = require('./record-scripts');
const { parsePlan, validatePlan } = require('../workflow/batch-files');
const { FILES } = require('../figma/helpers');
const { double, run } = require('../figma/double');

const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'tebra-scaffold-'));
const say = (line) => console.log(line);
const read = (file) => fs.readFileSync(file, 'utf8');
const date = '2026-09-12';

(async () => {
  // 1. a Figma batch: four files, the record body declares kind, plan and inventory, the plan carries the phases with TODOs
  const out = path.join(scratch, 'root');
  const evidence = path.join(scratch, 'figma-export', 'dry-run-figma');
  const fig = scaffold({ id: 'npveRebuild_dryRunScaffold_2026-09-12', previous: 'prev_a,prev_b', date, out, evidence, by: 'self-test' });
  assert.deepEqual([fig.kind, fig.workstream, fig.slug, fig.target.fileKey, fig.files.length], ['figma', 'npve', 'npve-rebuild-dry-run-scaffold-2026-09-12', FILES.npveTarget, 4]);
  const [applyFile, finalizeFile, planFile, walkFile] = fig.files.map((f) => path.resolve(path.resolve(__dirname, '..', '..'), f));
  const apply = read(applyFile);
  assert.match(apply, /batchKind: 'figma',\n\s+plan: '.*dry-run-figma\/plan\.md',\n\s+inventory: '.*dry-run-figma\/inventory\.json',/);
  assert.match(apply, /canvasChecks: 'TODO\(what is verified on the canvas/);
  assert.match(apply, /previous: \["prev_a","prev_b"\]/);
  const finalize = read(finalizeFile);
  assert.match(finalize, /figmaCalls: 'TODO\(number\)',\n\s+figmaMutations: 'TODO\(number\)'/);
  const plan = parsePlan(read(planFile));
  assert.deepEqual([plan.record, plan.kind, plan.items.length, plan.items.every((i) => i.state === 'open')], ['npveRebuild_dryRunScaffold_2026-09-12', 'figma', 8, true]);
  assert.ok(plan.items.some((i) => /Inventory walk: first read-only walk of fdCQVFdvOByaOYIJYag0d6/.test(i.text)));
  assert.ok(plan.items.some((i) => /Re-verify before the first write/.test(i.text)));
  assert.match(validatePlan({ file: planFile, recordId: fig.id, kind: 'figma' }).join('; '), /TODO left at line/);
  const walk = read(walkFile);
  assert.match(walk, /F\.guardFile\("fdCQVFdvOByaOYIJYag0d6", \["0:1 Cover"/);
  const result = await run(walk, double().figma);
  assert.deepEqual([result.inventory.fileKey, result.inventory.pages.length, result.inventory.skipInvisibleInstanceChildren], [FILES.npveTarget, 4, false]);
  say('figma scaffold: apply/finalize pair, plan.md with eight open phases and the TODO the gate refuses, walk script that runs against the target guard');

  // 2. a repository batch: three files, no inventory, canvas checks not applicable, five phases
  const evidence2 = path.join(scratch, 'figma-export', 'dry-run-repo');
  const repo = scaffold({ id: 'workflow_dryRunScaffold_2026-09-12', previous: 'prev', date, out, evidence: evidence2 });
  assert.deepEqual([repo.kind, repo.target, repo.files.length], ['repository', null, 3]);
  const apply2 = read(path.resolve(path.resolve(__dirname, '..', '..'), repo.files[0]));
  assert.match(apply2, /batchKind: 'repository',\n\s+plan: /);
  assert.doesNotMatch(apply2, /inventory:/);
  assert.match(apply2, /canvasChecks: 'Not applicable: repository-only batch'/);
  assert.match(apply2, /createdBy: 'TODO\(executor/);
  const plan2 = parsePlan(read(path.join(evidence2, 'plan.md')));
  assert.deepEqual([plan2.kind, plan2.items.length], ['repository', 5]);
  assert.ok(!fs.existsSync(path.join(evidence2, 'inventory-walk.figma.js')), 'no walk script for a repository batch');
  say('repository scaffold: pair and plan.md only; canvas checks not applicable; no walk script');

  // 3. refusals: overwrite of any of the files, a bad kind, missing arguments; slugs and args
  assert.throws(() => scaffold({ id: 'workflow_dryRunScaffold_2026-09-12', previous: 'prev', date, out, evidence: evidence2 }), /apply-workflow-dry-run-scaffold-2026-09-12\.js already exists; not overwriting/);
  assert.throws(() => scaffold({ id: 'workflow_other_2026-09-12', previous: 'prev', date, out: path.join(scratch, 'other'), evidence: evidence2 }), /plan\.md already exists; not overwriting/);
  assert.throws(() => scaffold({ id: 'x_y_2026-09-12', previous: 'p', date, kind: 'canvas', out, evidence: path.join(scratch, 'e3') }), /--kind must be figma or repository/);
  assert.throws(() => scaffold({ id: 'x', previous: 'p', date: '12-09-2026', out }), /--date must be YYYY-MM-DD/);
  assert.throws(() => scaffold({ id: 'x', date }), /--previous is required/);
  assert.equal(slugFor('workflow_planInventory_2026-09-12'), 'workflow-plan-inventory-2026-09-12');
  assert.deepEqual(parseArgs(['--id', 'a', '--kind', 'figma']), { id: 'a', kind: 'figma' });
  assert.throws(() => parseArgs(['id']), /Unexpected argument id/);
  const explicit = scaffold({ id: 'workflow_explicit_2026-09-12', previous: 'p', date, kind: 'figma', target: 'library', out: path.join(scratch, 'explicit'), evidence: path.join(scratch, 'e4') });
  assert.deepEqual([explicit.kind, explicit.target], ['figma', { fileKey: FILES.library, pages: null }]);
  assert.match(read(path.join(scratch, 'e4', 'inventory-walk.figma.js')), /F\.guardFile\("YX2n4YLrEpBXNbcc73T6dw", null\)/);
  say('refusals: no overwrite of the pair or the plan; kind, date and previous checked; explicit kind and target honoured');

  // 4. the unfilled plan template and record body are exactly what the gates refuse
  const template = planTemplate({ id: 'r_x_2026-09-12', kind: 'repository', evidence: 'figma-export/x', slug: 'x' });
  assert.match(template, /^# r_x_2026-09-12 plan\n\nRecord: r_x_2026-09-12\nKind: repository\nEvidence: figma-export\/x\nStop condition: TODO/);
  const body = { _status: 'IN PROGRESS — x', date, workstream: 'w', risk: { tier: 'low', operatorQuote: 'q' }, scope: ['TODO(one line per deliverable or file)'], report: 'r', stopCondition: 's', nextAction: 'n' };
  assert.match(checkOpenBody(body).join('; '), /TODO placeholder left at body\.scope\[0\]/);
  say('templates: the plan and the body carry TODO markers until the planner fills them');
  say('self-test PASS scaffold: figma and repository pairs, plan.md, walk script, refusals, templates');
})().catch((error) => { console.error(error.stack || error); process.exit(1); });
