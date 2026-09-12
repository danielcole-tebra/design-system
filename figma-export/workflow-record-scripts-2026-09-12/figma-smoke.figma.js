const F = (function helpers(figma, options) {
  options = options || {};
  figma.skipInvisibleInstanceChildren = false;
  const readOnly = new Set(options.readOnly || []);
  const F = {
    created: [],
    fail(message) { throw new Error(message); },
    pages() { return figma.root.children.map((n) => n.id + ' ' + n.name); },
    // File identity first, then the page set (id and name) when one is given; both from a prior read, never assumed.
    guardFile(fileKey, pages) {
      if (figma.fileKey !== fileKey) F.fail('File identity mismatch: expected ' + fileKey + ', open file is ' + figma.fileKey);
      if (pages && JSON.stringify(F.pages()) !== JSON.stringify(pages)) F.fail('Page identity mismatch: ' + JSON.stringify(F.pages()));
      return figma.fileKey;
    },
    writable() { if (readOnly.has(figma.fileKey)) F.fail('Writes prohibited in read-only file ' + figma.fileKey); },
    async node(id, expect) {
      const n = await figma.getNodeByIdAsync(id);
      if (!n) F.fail('Missing node ' + id);
      for (const [k, v] of Object.entries(expect || {})) {
        if (n[k] !== v) F.fail('Drift at ' + id + '.' + k + ': expected ' + JSON.stringify(v) + ', found ' + JSON.stringify(n[k]));
      }
      return n;
    },
    async page(id, expect) {
      const p = await F.node(id, Object.assign({ type: 'PAGE' }, expect || {}));
      await figma.setCurrentPageAsync(p);
      return p;
    },
    async fonts(list) { for (const font of list) await figma.loadFontAsync(font); return list; },
    async imports(kind, keys, load) {
      const out = {};
      for (const [name, key] of Object.entries(keys)) {
        let value = null;
        let error = '';
        try { value = await load(key); } catch (e) { error = ': ' + (e && e.message ? e.message : String(e)); }
        if (!value) F.fail('Cannot import ' + kind + ' ' + name + ' (' + key + ')' + (error || ': null'));
        out[name] = value;
      }
      return out;
    },
    components(keys) { return F.imports('component', keys, (k) => figma.importComponentByKeyAsync(k)); },
    variables(keys) { return F.imports('variable', keys, (k) => figma.variables.importVariableByKeyAsync(k)); },
    styles(keys) { return F.imports('style', keys, (k) => figma.importStyleByKeyAsync(k)); },
    // A solid paint bound to a color variable, read back: setBoundVariableForPaint returns an unbound paint for null.
    paint(variable, rgb) {
      if (!variable) F.fail('paint: variable is null');
      const p = figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: rgb || { r: 0, g: 0, b: 0 } }, 'color', variable);
      const bound = p && p.boundVariables && p.boundVariables.color;
      if (!bound || bound.id !== variable.id) F.fail('paint: ' + variable.name + ' did not bind (unbound paint returned)');
      return p;
    },
    bind(node, field, variable) {
      if (!variable) F.fail('bind ' + field + ': variable is null');
      node.setBoundVariable(field, variable);
      const bound = node.boundVariables && node.boundVariables[field];
      if (!bound || bound.id !== variable.id) F.fail('bind ' + field + ' on ' + node.name + ' did not take');
      return node;
    },
    track(node) { F.created.push(node.id); return node; },
    // Auto-layout frame or component appended to its parent immediately; fixed width, hugging the primary axis.
    frame(parent, o) {
      F.writable();
      const n = o.component ? figma.createComponent() : figma.createFrame();
      parent.appendChild(n);
      F.track(n);
      n.name = o.name;
      n.layoutMode = o.direction || 'VERTICAL';
      n.primaryAxisSizingMode = o.primary || 'AUTO';
      n.counterAxisSizingMode = o.counter || 'FIXED';
      n.resize(o.width, o.height || 40);
      n.fills = o.fills || [];
      n.strokes = o.strokes || [];
      n.clipsContent = o.clip === true;
      if (o.spacing != null) n.itemSpacing = o.spacing;
      if (o.padding != null) { n.paddingTop = o.padding; n.paddingBottom = o.padding; n.paddingLeft = o.padding; n.paddingRight = o.padding; }
      if (o.x != null) n.x = o.x;
      if (o.y != null) n.y = o.y;
      return n;
    },
    // Text with an imported style; fonts must already be loaded (F.fonts) or the characters do not take.
    async text(parent, o) {
      F.writable();
      const t = figma.createText();
      parent.appendChild(t);
      F.track(t);
      t.name = o.name || o.characters;
      if (o.style) await t.setTextStyleIdAsync(o.style.id);
      t.characters = o.characters;
      if (t.characters !== o.characters) F.fail('text ' + t.name + ': characters did not take (font loaded?)');
      if (o.width) t.resize(o.width, t.height);
      t.textAutoResize = o.autoResize || 'HEIGHT';
      if (o.fill) t.fills = [o.fill];
      return t;
    },
    instance(component, parent, o) {
      F.writable();
      o = o || {};
      const i = component.createInstance();
      parent.appendChild(i);
      F.track(i);
      if (o.name) i.name = o.name;
      if (o.properties) F.props(i, o.properties);
      if (o.width != null || o.height != null) i.resize(o.width != null ? o.width : i.width, o.height != null ? o.height : i.height);
      return i;
    },
    // setProperties by exact exposed names, then read back: a wrong name is ignored by Figma, not refused.
    props(instance, values) {
      instance.setProperties(values);
      const actual = instance.componentProperties || {};
      for (const [k, v] of Object.entries(values)) {
        const got = actual[k] ? actual[k].value : undefined;
        if (got !== v) F.fail('property ' + k + ' on ' + instance.name + ': expected ' + JSON.stringify(v) + ', read back ' + JSON.stringify(got));
      }
      return instance;
    },
    integer(node) {
      if (!Number.isInteger(node.width) || !Number.isInteger(node.height)) F.fail('Fractional geometry on ' + node.name + ': ' + node.width + 'x' + node.height);
      return node;
    },
    snapshot(n) {
      const s = { id: n.id, name: n.name, type: n.type, parentId: n.parent ? n.parent.id : null };
      for (const k of ['key', 'x', 'y', 'width', 'height']) if (k in n) s[k] = n[k];
      if (n.boundVariables) {
        s.boundVariables = Object.fromEntries(Object.entries(n.boundVariables).map(([k, v]) => [k, Array.isArray(v) ? v.map((a) => a.id) : (v && v.id)]));
      }
      return s;
    },
    async readback(ids) {
      const out = [];
      for (const id of ids || F.created) out.push(F.snapshot(await F.node(id)));
      return out;
    }
  };
  return F;
})(figma, {"readOnly":["zVsuhYehoSLLq880qRBFkq"]});
F.guardFile("fdCQVFdvOByaOYIJYag0d6", ["0:1 Cover","3:2 Templates","27:2 Screens","126:2 Archive"]);
const parent = await F.node("730:8618", {"name":"29 · Flowsheets forms without graphs","type":"SECTION"});
const lib = await F.components({"cell":"b5c365fef9cf5ba36ed69877c05fb8c178e60ea5"});
const vars = await F.variables({"paper":"f1e85cc976b10ea275c03f5d7f21a0dc12cdfee0","s8":"183d5d946d268e8bd37735b8b0dc95111c46eddd"});
const styles = await F.styles({"h4":"888b271ed38cdcfb86c35f9de8bff5ac9b81e8e3"});
// Read-only smoke run of the shared helpers: no page change, no creation, no mutation.
const paint = F.paint(vars.paper, { r: 1, g: 1, b: 1 });
const owner = lib.cell.parent && lib.cell.parent.type === 'COMPONENT_SET' ? lib.cell.parent : lib.cell;
return {
  fileKey: figma.fileKey,
  pages: F.pages(),
  parent: F.snapshot(parent),
  cell: { name: lib.cell.name, key: lib.cell.key, type: lib.cell.type, width: lib.cell.width, height: lib.cell.height, owner: owner.type, properties: Object.keys(owner.componentPropertyDefinitions) },
  vars: Object.fromEntries(Object.entries(vars).map(([k, v]) => [k, { name: v.name, id: v.id, resolvedType: v.resolvedType }])),
  styles: { h4: { name: styles.h4.name, id: styles.h4.id, type: styles.h4.type } },
  paint: { type: paint.type, boundTo: paint.boundVariables.color.id, matchesVariable: paint.boundVariables.color.id === vars.paper.id },
  readback: await F.readback(['730:8618', '3:2']),
  created: F.created,
  skipInvisibleInstanceChildren: figma.skipInvisibleInstanceChildren
};
return { created: F.created, readback: await F.readback() };