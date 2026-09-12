// Self-test of scripts/figma/inventory.js: the walk script on the Plugin API double, save/load/select, the reverify
// script and the recorded result (record workflow_planInventory_2026-09-12). Scratch folder only.
const assert = require('assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const inv = require('./inventory');
const { FILES, NPVE_TARGET_PAGES, helpers } = require('./helpers');
const { double, run } = require('./double');
const { validateInventory } = require('../workflow/batch-files');

const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'tebra-inventory-'));
const dir = path.join(scratch, 'evidence');
const say = (line) => console.log(line);
const rejects = (fn, re) => assert.rejects(fn, re);
const file = path.join(dir, inv.FILE);

(async () => {
  // 1. the walk script runs on the double and returns the inventory shape; target names resolve
  assert.deepEqual(inv.target('npve'), { fileKey: FILES.npveTarget, pages: NPVE_TARGET_PAGES });
  assert.deepEqual(inv.target('library'), { fileKey: FILES.library, pages: null });
  assert.deepEqual(inv.target('ABC123'), { fileKey: 'ABC123', pages: null });
  const d = double();
  const F = helpers(d.figma, {});
  const row = F.frame(d.section, { name: 'Row', width: 518 });
  const script = inv.walkScript({ depth: 2 });
  assert.match(script, /F\.guardFile\("fdCQVFdvOByaOYIJYag0d6", \["0:1 Cover"/);
  const result = await run(script, d.figma);
  assert.deepEqual([result.inventory.fileKey, result.inventory.nodes.length, result.inventory.walk.depth], [FILES.npveTarget, 2, 2]);
  await rejects(() => run(inv.walkScript({ fileKey: FILES.library }), d.figma), /File identity mismatch/);
  say('walk: the script guards the target and returns pages and nodes with parent and page');

  // 2. save once from the raw result; load validates; a malformed result is refused; a second save is refused
  assert.throws(() => inv.fromWalk({ nodes: [] }), /walk result lacks fileKey/);
  const saved = inv.save(dir, result, { capturedBy: 'self-test', script: 'walk.figma.js' });
  assert.ok(saved.endsWith('inventory.json') && fs.existsSync(file));
  const loaded = inv.load(dir);
  assert.deepEqual([loaded.format, loaded.version, loaded.fileKey, loaded.capturedBy, loaded.walks.length, loaded.reverifications], ['tebra.design-page-inventory', 1, FILES.npveTarget, 'self-test', 1, []]);
  assert.match(loaded.authority, /not evidence/);
  assert.deepEqual(loaded.nodes.map((n) => [n.name, n.type, n.parent, n.page]), [['29 · Section', 'SECTION', '3:2', '3:2'], ['Row', 'FRAME', d.section.id, '3:2']]);
  assert.deepEqual(validateInventory({ file, fileKey: FILES.npveTarget }), []);
  assert.throws(() => inv.save(dir, result), /already exists; the first walk is saved once/);
  say('save/load: the first walk saved once with authority, walks and an empty reverification list; passes the gate check');

  // 3. select chooses candidates by page, type, name, parent and ids; expectations carry id, name, type, parent
  assert.deepEqual(inv.select(loaded, { type: 'FRAME' }).map((n) => n.id), [row.id]);
  assert.deepEqual(inv.select(loaded, { name: 'section' }).map((n) => n.name), ['29 · Section']);
  assert.deepEqual(inv.select(loaded, { name: /^Row$/, page: '3:2' }).length, 1);
  assert.deepEqual(inv.select(loaded, { parent: d.section.id }).map((n) => n.name), ['Row']);
  assert.deepEqual(inv.select(loaded, { ids: [row.id, 'nope'] }).length, 1);
  assert.deepEqual(inv.select(loaded, { page: '0:1' }), []);
  assert.deepEqual(inv.expectations(loaded, [row.id]), [{ id: row.id, name: 'Row', type: 'FRAME', parent: d.section.id }]);
  assert.throws(() => inv.expectations(loaded, ['9:9']), /9:9 is not in the inventory; walk it before mutating it/);
  say('select: candidates by page, type, name, parent and id; expectations from the inventory only');

  // 4. the reverify script re-reads the nodes in Figma; the clean result is recorded; drift fails the script and is recorded as such
  const expectations = inv.expectations(loaded, [row.id, d.section.id]);
  assert.throws(() => inv.reverifyScript({ nodes: expectations }), /fileKey is required/);
  const rv = inv.reverifyScript({ fileKey: FILES.npveTarget, pages: NPVE_TARGET_PAGES, nodes: expectations });
  const clean = await run(rv, d.figma);
  assert.deepEqual([clean.reverification.verified.length, clean.reverification.mismatched, clean.reverification.missing], [2, [], []]);
  const entry = inv.recordReverification(dir, clean, { script: 'reverify.figma.js' });
  assert.deepEqual([entry.verified.length, entry.script], [2, 'reverify.figma.js']);
  assert.deepEqual(validateInventory({ file, requireReverification: true }), []);
  row.name = 'Renamed';
  await rejects(() => run(rv, d.figma), /Inventory drift: 0 missing, 1 mismatched/);
  const soft = await run(inv.reverifyScript({ fileKey: FILES.npveTarget, nodes: expectations, body: 'return { reverification: F.reverified };' }).replace('await F.reverify(', 'await F.reverify.call(F, '), d.figma).catch((e) => e);
  assert.match(String(soft.message || soft), /Inventory drift/, 'the composed script cannot be softened by the body');
  inv.recordReverification(dir, { verified: [], mismatched: [{ id: row.id, drift: ['name'] }], missing: [] });
  assert.match(validateInventory({ file, requireReverification: true })[0], /latest reverification .* found 1 mismatched/);
  assert.throws(() => inv.recordReverification(dir, { verified: [] }), /lacks mismatched\[\]/);
  say('reverify: clean readback recorded and accepted; a renamed node fails the script before any write and, once recorded, blocks the gate');

  // 5. a later walk merges by id and keeps the first on record; a walk of another file is refused
  row.name = 'Row';
  const later = await run(inv.walkScript({ pageIds: ['3:2'], depth: 3 }), d.figma);
  const merged = inv.addWalk(dir, later, { script: 'walk-2.figma.js' });
  assert.deepEqual([merged.walks.length, merged.walks[1].pageIds, merged.nodes.length], [2, ['3:2'], 2]);
  assert.throws(() => inv.addWalk(dir, { ...later, inventory: { ...later.inventory, fileKey: 'X' } }), /walk is of X, the inventory is of/);
  say('addWalk: later walks merge by id and append to walks; another file is refused');

  // 6. the CLI writes the walk and reverify scripts beside the inventory and records a result file
  const dir2 = path.join(scratch, 'cli');
  assert.match(inv.cli(['walk', dir2, '--target', 'npve', '--depth', '1']), /wrote .*inventory-walk\.figma\.js \(\d+ characters\) for fdCQVFdvOByaOYIJYag0d6/);
  const walkText = fs.readFileSync(path.join(dir2, inv.WALK_SCRIPT), 'utf8');
  assert.match(walkText, /F\.inventory\(null, 1\)/);
  const d2 = double();
  const out = await run(walkText, d2.figma);
  const resultFile = path.join(dir2, 'walk-result.json');
  fs.writeFileSync(resultFile, JSON.stringify(out));
  assert.match(inv.cli(['save', dir2, resultFile, '--by', 'cli']), /saved .*inventory\.json: 4 pages, 1 nodes of fdCQVFdvOByaOYIJYag0d6/);
  assert.match(inv.cli(['select', dir2, '--type', 'SECTION']), /SECTION\t3:2\t3:2\t29 · Section/);
  assert.equal(inv.cli(['select', dir2, '--type', 'TEXT']), '(no candidates)');
  assert.match(inv.cli(['reverify', dir2, d2.section.id]), /wrote .*inventory-reverify\.figma\.js .*; run it with use_figma before the first write/);
  const rvOut = await run(fs.readFileSync(path.join(dir2, inv.REVERIFY_SCRIPT), 'utf8'), d2.figma);
  const rvFile = path.join(dir2, 'reverify-result.json');
  fs.writeFileSync(rvFile, JSON.stringify(rvOut));
  assert.match(inv.cli(['record', dir2, rvFile]), /recorded reverification at .*: 1 verified, 0 mismatched, 0 missing/);
  assert.throws(() => inv.cli(['reverify', dir2]), /needs a comma-separated list/);
  assert.throws(() => inv.cli(['nope', dir2]), /unknown command nope/);
  say('cli: walk, save, select, reverify and record round-trip through files');
  say('self-test PASS figma inventory: walk script, save/load/select, reverify script and recorded results, later walks, CLI');
})().catch((error) => { console.error(error.stack || error); process.exit(1); });
