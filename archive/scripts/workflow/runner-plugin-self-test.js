// In-memory structural Plugin API double. It cannot authenticate or contact Figma,
// and does not claim to simulate Figma layout or pixels.
const assert = require('assert/strict');
const { program } = require('./runner/plugin');
const { collect, audit } = require('./runner/audit');
const fileKey = 'fdCQVFdvOByaOYIJYag0d6';
const all = new Map(); let serial = 0;
class Node {
  constructor(type, name, width = 550, height = 600) {
    Object.assign(this, { id: `fixture-${++serial}`, key: `key-${serial}`, type, name, width, height, children: [], fills: [], strokes: [], componentPropertyDefinitions: {}, componentPropertyReferences: {}, x: 0, y: 0 }); all.set(this.id, this);
  }
  appendChild(n) { n.parent = this; this.children.push(n); }
  resize(w, h) { this.width = w; this.height = h; }
  setBoundVariable(field, variable) { this[field] = variable.valuesByMode.mode; }
  createInstance() {
    const clone = (n, root = false) => {
      const x = new Node(root ? 'INSTANCE' : n.type, n.name, n.width, n.height);
      x.componentPropertyDefinitions = structuredClone(n.componentPropertyDefinitions);
      x.componentPropertyReferences = structuredClone(n.componentPropertyReferences);
      x.main = n; n.children.forEach(c => x.appendChild(clone(c))); return x;
    };
    return clone(this, true);
  }
  async getMainComponentAsync() { return this.main; }
  setProperties(values) {
    this.values = values;
    const walk = n => [n, ...n.children.flatMap(walk)];
    for (const n of walk(this)) {
      const prop = n.componentPropertyReferences.mainComponent;
      if (prop && values[prop]) { n.main = all.get(values[prop]); n.width = n.main.width; n.height = n.main.height; }
    }
  }
}
const page = new Node('PAGE', 'Templates');
const add = (type, name, w, h) => { const n = new Node(type, name, w, h); page.appendChild(n); return n; };
const parent = add('SECTION', 'Fixture section', 3600, 5000);
const shell = add('COMPONENT', 'Floating', 550, 600);
shell.componentPropertyDefinitions = { 'Body#1': { type: 'INSTANCE_SWAP', defaultValue: 'old' }, 'Title#1': { type: 'TEXT', defaultValue: 'Title' } };
const body = new Node('FRAME', 'Body', 518, 100); shell.appendChild(body);
const bodySlot = new Node('INSTANCE', 'Body content', 518, 100); body.appendChild(bodySlot); bodySlot.componentPropertyReferences = { mainComponent: 'Body#1' };
const content = add('COMPONENT', 'Content', 518, 752);
const row = add('COMPONENT', 'Change log/Row', 480, 48); row.componentPropertyDefinitions = { 'What#1': { type: 'TEXT' } };
const comparison = add('COMPONENT', 'Rebuild comparison', 1708, 1290);
for (const role of ['Reference', 'Rebuild', 'Change log']) {
  comparison.componentPropertyDefinitions[role] = { type: 'INSTANCE_SWAP', defaultValue: 'old' };
  const col = new Node('FRAME', role + ' column'); comparison.appendChild(col);
  const slot = new Node('INSTANCE', role + ' content'); col.appendChild(slot); slot.componentPropertyReferences = { mainComponent: role };
}
const variables = {
  space: { id: 'variable-space', name: 'space/16', resolvedType: 'FLOAT', valuesByMode: { mode: 16 } },
  paper: { id: 'variable-paper', name: 'color/background/paper', resolvedType: 'COLOR', valuesByMode: { mode: { r: 1, g: 1, b: 1, a: 1 } } }
};
const figma = { fileKey, root: { children: [page] }, getNodeByIdAsync: async id => all.get(id),
  createImage: () => ({ hash: 'fixture-image-hash' }),
  createComponent: () => new Node('COMPONENT', 'new'), createRectangle: () => new Node('RECTANGLE', 'new'),
  loadFontAsync: async () => {}, variables: { importVariableByKeyAsync: async key => variables[key], setBoundVariableForPaint: (paint, field, v) => ({ ...paint, boundVariables: { [field]: { id: v.id } } }) } };
const pages = [`${page.id} Templates`];
const snapshot = n => ({ id: n.id, name: n.name, type: n.type, parentId: n.parent.id, key: n.key, width: n.width, height: n.height, definitions: ['COMPONENT', 'COMPONENT_SET'].includes(n.type) ? n.componentPropertyDefinitions : undefined });
function plan(operation, nodes) { return { fileKey, reads: [{ fileKey, pages, nodes: nodes.map(snapshot) }], operation, fonts: [] }; }
async function main() {
  const build = await program(figma, plan({ kind: 'shell', parent: parent.id, shell: shell.id, properties: { 'Title#1': 'Patient Summary' }, bodyProperty: 'Body#1', bodyLayer: 'Body', blocks: [{ component: content.id, properties: {} }], bodyName: 'State=Default', helperName: '_Rebuild comparison/Rebuild/Fixture', bodyWidth: 518, width: 550, x: 0, y: 0, helperX: 600, spacing: { key: 'space', name: 'space/16', value: 16 } }, [parent, shell, content]));
  assert(build.complete); assert.equal(build.identities.length, 3); assert.equal(shell.width, 550); assert.equal(shell.height, 600);
  const rebuild = all.get(build.identities[1].id);
  const helperPlan = plan({ kind: 'helpers', parent: parent.id, row: row.id, rows: [{ 'What#1': 'Fixture change' }], referenceName: '_Rebuild comparison/Reference/Fixture', changeName: '_Rebuild comparison/Change log/Fixture', imageName: 'Frozen source fixture · 2026-09-11 · 2x', width: 550, height: 894, logWidth: 480, x: 1200, y: 0, logX: 1800, spacing: { key: 'space', name: 'space/16' }, paper: { key: 'paper', name: 'color/background/paper', valuesByMode: variables.paper.valuesByMode } }, [parent, row]);
  const helpers = await program(figma, helperPlan); assert.equal(helpers.identities.length, 3);
  const ref = all.get(helpers.identities[0].id), change = all.get(helpers.identities[2].id);
  assert.equal(change.paddingLeft, 16); assert(change.fills[0].boundVariables.color);
  const rectangle = all.get(helpers.identities[1].id);
  const imagePlan = plan({ kind: 'reference-image', rectangle: rectangle.id, referenceName: ref.name, png: [0] }, [rectangle]);
  assert((await program(figma, imagePlan)).complete); // Byte/2x validation is in validatePlan before transport.
  await assert.rejects(() => program(figma, imagePlan), /empty frozen-reference/);
  const slots = ['Reference', 'Rebuild', 'Change log'].map((role, i) => ({ role, column: role + ' column', name: role + ' content', property: role, helper: [ref, rebuild, change][i].id }));
  const compared = await program(figma, plan({ kind: 'comparison', parent: parent.id, master: comparison.id, name: 'Fixture comparison', properties: Object.fromEntries(slots.map(s => [s.property, s.helper])), x: 0, y: 1600, slots }, [parent, comparison, ref, rebuild, change]));
  assert(compared.complete); assert.equal(comparison.height, 1290);
  const originalCount = all.size;
  variables.space = null;
  await assert.rejects(() => program(figma, helperPlan), /token/); assert.equal(all.size, originalCount);
  variables.space = { id: 'space', name: 'space/16', resolvedType: 'FLOAT', valuesByMode: { mode: 16 } };
  const duplicate = new Node('FRAME', 'Body'); shell.appendChild(duplicate);
  await assert.rejects(() => program(figma, plan({ kind: 'shell', parent: parent.id, shell: shell.id, properties: {}, bodyLayer: 'Body' }, [parent, shell])), /Ambiguous hierarchy/);
  const instance = content.createInstance(); parent.appendChild(instance);
  const evidence = await collect(figma, { fileKey, pages, authoredRoots: [parent.id], pairs: [{ master: content.id, instance: instance.id }], shared: [shell.id] });
  const result = audit({ beforePages: evidence.pages, afterPages: evidence.pages, pairs: evidence.pairs, fractional: evidence.fractional, shared: [{ before: evidence.shared[0], after: evidence.shared[0], additions: {} }] });
  assert(result.deterministicPass); assert.equal(figma.skipInvisibleInstanceChildren, false);
  console.log('runner Plugin API structural self-test PASS shell, helpers, comparison, tokens, ambiguous hierarchy, all-page audit; no live Figma calls or pixel simulation');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
