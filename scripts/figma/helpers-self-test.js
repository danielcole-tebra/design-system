// Self-test of scripts/figma/helpers.js against the in-memory Plugin API double in ./double.js. It cannot contact
// Figma and does not claim to simulate layout or pixels; it checks the helpers' guards, imports, readbacks,
// inventory walk, reverification and composition, including the plugin-API traps: a null variable returns an
// unbound paint, a wrong property name is ignored, text needs fonts.
const assert = require('assert/strict');
const { FILES, FONTS, LIMIT, NPVE_TARGET_PAGES, compose, helpers, prelude } = require('./helpers');

const { double, run } = require('./double');

const rejects = async (fn, re, label) => { await assert.rejects(fn, re, label); };
const say = (line) => console.log(line);

(async () => {
  // 1. identity guards
  let d = double();
  let F = helpers(d.figma, { readOnly: [FILES.npveSource] });
  assert.equal(d.figma.skipInvisibleInstanceChildren, false, 'helpers turn skipInvisibleInstanceChildren off');
  assert.throws(() => F.guardFile(FILES.library, null), /File identity mismatch/);
  assert.throws(() => F.guardFile(FILES.npveTarget, ['0:1 Cover']), /Page identity mismatch/);
  assert.equal(F.guardFile(FILES.npveTarget, NPVE_TARGET_PAGES), FILES.npveTarget);
  say('guard: file and page identity checked');

  // 2. node lookup with drift checks; page sets the current page
  await rejects(() => F.node('9:9'), /Missing node 9:9/);
  await rejects(() => F.node(d.section.id, { name: 'other' }), /Drift at .*name/);
  assert.equal(await F.node(d.section.id, { name: '29 · Section', type: 'SECTION' }), d.section);
  await rejects(() => F.page(d.section.id), /Drift at .*type/);
  await F.page('3:2', { name: 'Templates' });
  assert.equal(d.currentPage.id, '3:2');
  say('node: missing and drifted nodes refused; page set');

  // 3. keyed imports fail by name and key; a null import never reaches the body
  await rejects(() => F.components({ cell: 'cellKey', nope: 'missingKey' }), /Cannot import component nope \(missingKey\)/);
  const lib = await F.components({ cell: 'cellKey' });
  const vars = await F.variables({ paper: 'paperKey', s8: 's8Key' });
  const styles = await F.styles({ h4: 'h4Key' });
  assert.equal(lib.cell.name, 'Table/Cell');
  await rejects(() => F.styles({ x: 'none' }), /Cannot import style x/);
  say('imports: components, variables and styles by key; a missing key fails by name');

  // 4. paint and bind read back; the null-variable trap fails instead of silently unbinding
  assert.throws(() => F.paint(null), /variable is null/);
  assert.throws(() => F.paint({ id: 'VariableID:99', key: 'foreign', name: 'foreign' }), /did not bind/);
  const paper = F.paint(vars.paper, { r: 1, g: 1, b: 1 });
  assert.equal(paper.boundVariables.color.id, 'VariableID:1');
  const frame = F.frame(d.section, { name: 'Row', width: 518, direction: 'HORIZONTAL', fills: [paper], spacing: 8, x: 32, y: 64 });
  assert.equal(frame.parent, d.section);
  assert.deepEqual([frame.layoutMode, frame.primaryAxisSizingMode, frame.counterAxisSizingMode, frame.width, frame.height, frame.x], ['HORIZONTAL', 'AUTO', 'FIXED', 518, 40, 32]);
  F.bind(frame, 'itemSpacing', vars.s8);
  assert.equal(frame.boundVariables.itemSpacing.id, 'VariableID:2');
  assert.throws(() => F.bind(frame, 'itemSpacing', null), /variable is null/);
  assert.ok(F.created.includes(frame.id), 'created nodes are tracked');
  say('paint/bind: bound and read back; null and foreign variables fail');

  // 5. text needs fonts; style and characters are read back
  await rejects(() => F.text(frame, { characters: 'Hello', style: styles.h4 }), /font not loaded/);
  await F.fonts(FONTS.akkurat);
  const text = await F.text(frame, { characters: 'Hello', style: styles.h4, width: 200, fill: paper });
  assert.deepEqual([text.characters, text.textStyleId, text.width, text.textAutoResize, text.fills.length], ['Hello', 'S:h4', 200, 'HEIGHT', 1]);
  say('text: refused before fonts load; style, width and fill applied after');

  // 6. instances: exact property names read back; a wrong name is caught, not ignored
  const cell = F.instance(lib.cell, frame, { name: 'Measure', properties: { 'Text#190:0': 'MEASURE' }, width: 80 });
  assert.equal(cell.componentProperties['Text#190:0'].value, 'MEASURE');
  assert.throws(() => F.props(cell, { 'Text#999:0': 'x' }), /property Text#999:0 on Measure.*read back undefined/);
  assert.throws(() => F.integer({ name: 'odd', width: 12.5, height: 20 }), /Fractional geometry/);
  const read = await F.readback();
  // The text refused before fonts loaded was appended first, so it stays tracked: a failed write may still have landed.
  assert.deepEqual(read.map((n) => n.type), ['FRAME', 'TEXT', 'TEXT', 'INSTANCE']);
  assert.equal(read[0].boundVariables.itemSpacing, 'VariableID:2');
  say('instance: properties by exact name read back; fractional geometry refused; readback snapshots bound variables');

  // 7. the read-only source refuses every creator
  d = double({ fileKey: FILES.npveSource, pages: ['0:1 Cover'] });
  F = helpers(d.figma, { readOnly: [FILES.npveSource] });
  assert.throws(() => F.frame(d.section, { name: 'x', width: 10 }), /Writes prohibited in read-only file/);
  await rejects(() => F.text(d.section, { characters: 'x' }), /Writes prohibited/);
  say('read-only: creators refused in the source file');

  // 8. composition: prelude order, default return, size limit, end to end on the double
  const opts = { fileKey: FILES.npveTarget, pages: NPVE_TARGET_PAGES, pageId: '3:2', pageName: 'Templates', fonts: FONTS.akkurat, parent: { id: 'SECTION', expect: { name: '29 · Section' } }, components: { cell: 'cellKey' }, variables: { paper: 'paperKey' }, styles: { h4: 'h4Key' } };
  const pre = prelude(opts).split('\n');
  assert.deepEqual(pre.map((l) => l.split(/[ (]/)[0] + (l.includes('F.') ? ' ' + l.match(/F\.(\w+)/)[1] : '')), ['F.guardFile guardFile', 'const page', 'await fonts', 'const node', 'const components', 'const variables', 'const styles']);
  assert.throws(() => compose({ body: 'x' }), /fileKey is required/);
  assert.throws(() => compose({ ...opts, body: 'x'.repeat(LIMIT) }), /over the use_figma limit/);
  d = double();
  d.section.id = 'SECTION'; d.nodes.set('SECTION', d.section);
  const script = compose({ ...opts, body: "const row = F.frame(parent, { name: 'Row', width: 518, fills: [F.paint(vars.paper)] });\nawait F.text(row, { characters: 'Hi', style: styles.h4 });\nF.instance(lib.cell, row, { properties: { 'Text#190:0': 'A' } });" });
  assert.ok(script.length < LIMIT && script.endsWith('return { created: F.created, readback: await F.readback() };'));
  const result = await run(script, d.figma);
  assert.equal(result.created.length, 3);
  assert.deepEqual(result.readback.map((n) => [n.type, n.parentId]), [['FRAME', 'SECTION'], ['TEXT', result.created[0]], ['INSTANCE', result.created[0]]]);
  assert.equal(d.currentPage.id, '3:2');
  const own = compose({ ...opts, body: 'return { pages: F.pages() };' });
  assert.deepEqual(await run(own, double().figma), { pages: NPVE_TARGET_PAGES });
  const guarded = compose({ fileKey: FILES.npveSource, body: "F.frame(figma.root.children[0], { name: 'x', width: 10 });" });
  await rejects(() => run(guarded, double({ fileKey: FILES.npveSource, pages: NPVE_TARGET_PAGES }).figma), /Writes prohibited/);
  say(`compose: prelude in order, ${script.length} characters for the three-node body (limit ${LIMIT}), default and own returns, source file read-only`);

  // 9. inventory walk: bounded depth, id/name/type/parent/page per node, pages loaded first, unknown page refused
  d = double();
  F = helpers(d.figma, {});
  const row = F.frame(d.section, { name: 'Row', width: 518 });
  F.frame(row, { name: 'Deep', width: 10 });
  const inv = await F.inventory(null, 2);
  assert.deepEqual([inv.fileKey, inv.skipInvisibleInstanceChildren, inv.pages.map((p) => p.id), inv.walk], [FILES.npveTarget, false, ['0:1', '3:2', '27:2', '126:2'], { pageIds: null, depth: 2, count: 2 }]);
  assert.deepEqual(inv.nodes.map((n) => [n.name, n.type, n.parent, n.page, n.depth]), [['29 · Section', 'SECTION', '3:2', '3:2', 1], ['Row', 'FRAME', d.section.id, '3:2', 2]]);
  assert.ok(/^\d{4}-\d{2}-\d{2}T/.test(inv.capturedAt) && d.loadedPages.length === 4, 'timestamped; every page loaded before its children were read');
  const one = await F.inventory(['3:2'], 3);
  assert.equal(one.nodes.length, 3, 'depth 3 reaches the nested frame');
  await rejects(() => F.inventory(['9:9'], 1), /Unknown page id/);
  say('inventory: walk to a bounded depth with parent and page per node; pages loaded first; unknown page refused');

  // 10. reverify: clean, drifted (name, parent) and missing nodes; soft mode records, strict mode fails before any write
  const expect = { id: row.id, name: 'Row', type: 'FRAME', parent: d.section.id };
  const clean = await F.reverify([expect, { id: d.section.id, name: '29 · Section', type: 'SECTION', parent: '3:2' }]);
  assert.deepEqual([clean.verified.length, clean.mismatched, clean.missing], [2, [], []]);
  row.name = 'Renamed';
  const soft = await F.reverify([expect, { id: '404:404', name: 'Gone' }], { soft: true });
  assert.deepEqual([soft.verified, soft.mismatched.map((m) => [m.id, m.drift, m.found.name]), soft.missing.map((m) => m.id)], [[], [[row.id, ['name'], 'Renamed']], ['404:404']]);
  await rejects(() => F.reverify([expect]), /Inventory drift: 0 missing, 1 mismatched \(.*name\); walk again before writing/);
  await rejects(() => F.reverify([{ name: 'no id' }]), /every expectation needs an id/);
  row.name = 'Row';
  const moved = F.frame(d.section, { name: 'Other', width: 10 });
  moved.appendChild(row);
  await rejects(() => F.reverify([expect]), /1 mismatched \(.*parent\)/);
  say('reverify: clean, renamed, re-parented and missing nodes told apart; strict mode fails, soft mode records');

  // 11. composition with reverify: the prelude re-verifies before the body, creators refuse until it passed, drift stops the script
  d = double();
  const target = F.frame(d.section, { name: 'Target', width: 100 });
  const expectations = [{ id: target.id, name: 'Target', type: 'FRAME', parent: d.section.id }];
  assert.throws(() => compose({ fileKey: FILES.npveTarget, reverify: [] }), /reverify must be a non-empty list/);
  const pre9 = prelude({ fileKey: FILES.npveTarget, pageId: '3:2', reverify: expectations, fonts: FONTS.akkurat }).split('\n');
  assert.deepEqual(pre9.map((l) => l.match(/F\.(\w+)/)[1]), ['guardFile', 'page', 'reverify', 'fonts']);
  const good = compose({ fileKey: FILES.npveTarget, pages: NPVE_TARGET_PAGES, reverify: expectations, body: "const t = await F.node(reverified.verified[0].id); F.frame(t, { name: 'Child', width: 10 }); return { created: F.created, reverified };" });
  const ok = await run(good, d.figma);
  assert.deepEqual([ok.created.length, ok.reverified.verified.length], [1, 1]);
  target.name = 'Drifted';
  await rejects(() => run(good, d.figma), /Inventory drift/);
  assert.equal(d.nodes.get(ok.created[0]).parent.children.length, 1, 'the drifted run created nothing');
  target.name = 'Target';
  const unverified = compose({ fileKey: FILES.npveTarget, pages: NPVE_TARGET_PAGES, reverify: expectations, body: "F.reverified = null; F.frame(figma.root.children[1], { name: 'x', width: 10 });" });
  await rejects(() => run(unverified, d.figma), /Writes refused before the inventory nodes are re-verified/);
  say('compose: reverify in the prelude before the body; creators refuse until it passed; drift stops the script before any write');
  say('self-test PASS figma helpers: guards, imports, paint/bind readback, text, instances, read-only source, composition, inventory, reverify');
})().catch((error) => { console.error(error.stack || error); process.exit(1); });
