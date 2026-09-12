// In-memory Plugin API double for scripts/figma/helpers.js. It cannot contact Figma and does not claim to
// simulate layout or pixels; it checks the helpers' guards, imports, readbacks and composition, including the
// plugin-API traps: a null variable returns an unbound paint, a wrong property name is ignored, text needs fonts.
const assert = require('assert/strict');
const { FILES, FONTS, LIMIT, NPVE_TARGET_PAGES, compose, helpers, prelude } = require('./helpers');

let serial = 0;
const all = new Map(); // every node the double creates, including instances, so readback finds them by id
class Node {
  constructor(type, name, width = 100, height = 40) {
    Object.assign(this, { id: `${++serial}:${serial}`, type, name, width, height, x: 0, y: 0, parent: null, children: [], fills: [], strokes: [], boundVariables: {} });
    all.set(this.id, this);
    if (['COMPONENT', 'COMPONENT_SET'].includes(type)) { this.key = `key-${serial}`; this.componentPropertyDefinitions = {}; }
  }
  appendChild(n) { n.parent = this; this.children.push(n); }
  resize(w, h) { this.width = w; this.height = h; }
  setBoundVariable(field, variable) { if (variable) this.boundVariables[field] = { type: 'VARIABLE_ALIAS', id: variable.id }; }
  createInstance() {
    const i = new Node('INSTANCE', this.name, this.width, this.height);
    i.componentProperties = Object.fromEntries(Object.entries(this.componentPropertyDefinitions).map(([k, d]) => [k, { type: d.type, value: d.defaultValue }]));
    i.setProperties = (values) => { for (const [k, v] of Object.entries(values)) if (i.componentProperties[k]) i.componentProperties[k].value = v; }; // a wrong name is ignored, as in Figma
    return i;
  }
}
class Text extends Node {
  constructor(double) { super('TEXT', 'Text', 100, 24); this.double = double; this._characters = ''; }
  get characters() { return this._characters; }
  set characters(v) { if (!this.double.fontsLoaded.size) throw new Error('font not loaded'); this._characters = v; }
  async setTextStyleIdAsync(id) { this.textStyleId = id; }
}

function double({ fileKey = FILES.npveTarget, pages = NPVE_TARGET_PAGES } = {}) {
  const nodes = all;
  const add = (n) => n;
  const d = { fontsLoaded: new Set(), currentPage: null, nodes };
  d.figma = {
    fileKey,
    skipInvisibleInstanceChildren: true,
    root: { children: pages.map((p) => { const [id, ...name] = p.split(' '); const n = new Node('PAGE', name.join(' ')); n.id = id; nodes.set(id, n); return n; }) },
    getNodeByIdAsync: async (id) => nodes.get(id) || null,
    setCurrentPageAsync: async (p) => { d.currentPage = p; },
    loadFontAsync: async (font) => { d.fontsLoaded.add(`${font.family}/${font.style}`); },
    importComponentByKeyAsync: async (key) => d.components[key] || null,
    importStyleByKeyAsync: async (key) => d.styles[key] || null,
    variables: {
      importVariableByKeyAsync: async (key) => d.vars[key] || null,
      setBoundVariableForPaint: (paint, field, variable) => (variable && d.vars[variable.key] ? { ...paint, boundVariables: { [field]: { type: 'VARIABLE_ALIAS', id: variable.id } } } : { ...paint }) // null or foreign variable: unbound, no throw
    },
    createFrame: () => add(new Node('FRAME', 'Frame')),
    createComponent: () => add(new Node('COMPONENT', 'Component')),
    createText: () => add(new Text(d))
  };
  d.section = add(new Node('SECTION', '29 · Section', 2000, 2000));
  d.figma.root.children[Math.min(1, pages.length - 1)].appendChild(d.section);
  const cell = add(new Node('COMPONENT', 'Table/Cell', 80, 20));
  cell.componentPropertyDefinitions = { 'Text#190:0': { type: 'TEXT', defaultValue: 'Cell' } };
  d.components = { cellKey: cell };
  d.vars = { paperKey: { id: 'VariableID:1', key: 'paperKey', name: 'color/background/paper' }, s8Key: { id: 'VariableID:2', key: 's8Key', name: 'spacing/8' } };
  d.styles = { h4Key: { id: 'S:h4', key: 'h4Key', name: 'Heading/H4' } };
  return d;
}

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
  const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;
  const result = await new AsyncFunction('figma', script)(d.figma);
  assert.equal(result.created.length, 3);
  assert.deepEqual(result.readback.map((n) => [n.type, n.parentId]), [['FRAME', 'SECTION'], ['TEXT', result.created[0]], ['INSTANCE', result.created[0]]]);
  assert.equal(d.currentPage.id, '3:2');
  const own = compose({ ...opts, body: 'return { pages: F.pages() };' });
  assert.deepEqual(await new AsyncFunction('figma', own)(double().figma), { pages: NPVE_TARGET_PAGES });
  const guarded = compose({ fileKey: FILES.npveSource, body: "F.frame(figma.root.children[0], { name: 'x', width: 10 });" });
  await rejects(() => new AsyncFunction('figma', guarded)(double({ fileKey: FILES.npveSource, pages: NPVE_TARGET_PAGES }).figma), /Writes prohibited/);
  say(`compose: prelude in order, ${script.length} characters for the three-node body (limit ${LIMIT}), default and own returns, source file read-only`);
  say('self-test PASS figma helpers: guards, imports, paint/bind readback, text, instances, read-only source, composition');
})().catch((error) => { console.error(error.stack || error); process.exit(1); });
