// In-memory Plugin API double for the Figma helper self-tests (records workflow_recordScripts_2026-09-12 and
// workflow_planInventory_2026-09-12). It cannot contact Figma and does not claim to simulate layout or pixels; it
// carries the plugin-API traps the helpers guard against: a null variable returns an unbound paint, a wrong
// property name is ignored, text needs fonts, and a node is found by id whatever page it sits on.
const { FILES, NPVE_TARGET_PAGES } = require('./helpers');

let serial = 0;
const all = new Map(); // every node the double creates, including instances, so readback finds them by id
class Node {
  constructor(type, name, width = 100, height = 40) {
    Object.assign(this, { id: `${++serial}:${serial}`, type, name, width, height, x: 0, y: 0, parent: null, children: [], fills: [], strokes: [], boundVariables: {}, visible: true });
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
  const d = { fontsLoaded: new Set(), currentPage: null, nodes, loadedPages: [] };
  d.figma = {
    fileKey,
    skipInvisibleInstanceChildren: true,
    root: {
      children: pages.map((p) => {
        const [id, ...name] = p.split(' ');
        const n = new Node('PAGE', name.join(' '));
        n.id = id;
        n.loadAsync = async () => { d.loadedPages.push(id); }; // dynamic-page mode: children are available after loadAsync
        nodes.set(id, n);
        return n;
      })
    },
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

// Runs a composed use_figma script against a double, the way Figma evaluates the text.
const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;
const run = (script, figma) => new AsyncFunction('figma', script)(figma);

module.exports = { AsyncFunction, Node, Text, double, run };
