const F = (function helpers(figma, options) {
  options = options || {};
  figma.skipInvisibleInstanceChildren = false;
  const readOnly = new Set(options.readOnly || []);
  const F = {
    created: [],
    reverified: null,
    fail(message) { throw new Error(message); },
    pages() { return figma.root.children.map((n) => n.id + ' ' + n.name); },
    // File identity first, then the page set (id and name) when one is given; both from a prior read, never assumed.
    guardFile(fileKey, pages) {
      if (figma.fileKey !== fileKey) F.fail('File identity mismatch: expected ' + fileKey + ', open file is ' + figma.fileKey);
      if (pages && JSON.stringify(F.pages()) !== JSON.stringify(pages)) F.fail('Page identity mismatch: ' + JSON.stringify(F.pages()));
      return figma.fileKey;
    },
    writable() {
      if (readOnly.has(figma.fileKey)) F.fail('Writes prohibited in read-only file ' + figma.fileKey);
      if (options.requireReverify && (!F.reverified || F.reverified.missing.length || F.reverified.mismatched.length)) F.fail('Writes refused before the inventory nodes are re-verified by id, name, type and parent (standing rule 3)');
    },
    // Re-verify nodes a script will mutate against what the inventory expected: id, name, type and parent id, read
    // back in Figma now. Fails before any write on a missing or drifted node unless o.soft; the result is returned
    // for the batch to record in inventory.json.
    async reverify(expected, o) {
      const result = { verified: [], mismatched: [], missing: [] };
      for (const e of expected || []) {
        if (!e || !e.id) F.fail('reverify: every expectation needs an id');
        const n = await figma.getNodeByIdAsync(e.id);
        if (!n) { result.missing.push({ id: e.id, expected: e }); continue; }
        const found = { id: n.id, name: n.name, type: n.type, parent: n.parent ? n.parent.id : null };
        const drift = ['name', 'type', 'parent'].filter((k) => e[k] !== undefined && e[k] !== found[k]);
        if (drift.length) result.mismatched.push({ id: e.id, drift: drift, expected: e, found: found });
        else result.verified.push(found);
      }
      F.reverified = result;
      if (!(o && o.soft) && (result.missing.length || result.mismatched.length)) {
        const detail = result.mismatched.map((m) => m.id + ' ' + m.drift.join('/')).concat(result.missing.map((m) => m.id + ' missing'));
        F.fail('Inventory drift: ' + result.missing.length + ' missing, ' + result.mismatched.length + ' mismatched (' + detail.join(', ') + '); walk again before writing');
      }
      return result;
    },
    // Read-only page inventory to a bounded depth: id, name, type, parent and page per node. A read, never a claim;
    // pages are loaded first because a non-current page has no children until loadAsync in dynamic-page mode.
    async inventory(pageIds, depth) {
      depth = depth == null ? 2 : depth;
      const pages = figma.root.children.filter((p) => !pageIds || pageIds.indexOf(p.id) >= 0);
      if (pageIds && pages.length !== pageIds.length) F.fail('Unknown page id in ' + JSON.stringify(pageIds) + '; pages are ' + JSON.stringify(F.pages()));
      const nodes = [];
      const walk = (n, pageId, level) => {
        for (const c of n.children || []) {
          nodes.push({ id: c.id, name: c.name, type: c.type, parent: n.id, page: pageId, depth: level, visible: c.visible !== false });
          if (level < depth) walk(c, pageId, level + 1);
        }
      };
      for (const p of pages) { if (typeof p.loadAsync === 'function') await p.loadAsync(); walk(p, p.id, 1); }
      return {
        fileKey: figma.fileKey, capturedAt: new Date().toISOString(), skipInvisibleInstanceChildren: figma.skipInvisibleInstanceChildren,
        pages: pages.map((p) => ({ id: p.id, name: p.name, children: (p.children || []).length })),
        nodes: nodes, walk: { pageIds: pageIds || null, depth: depth, count: nodes.length }
      };
    },
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
})(figma, {"readOnly":["zVsuhYehoSLLq880qRBFkq"],"requireReverify":false});
F.guardFile("fdCQVFdvOByaOYIJYag0d6", ["0:1 Cover","3:2 Templates","27:2 Screens","126:2 Archive"]);
return { inventory: await F.inventory(null, 2) };
return { created: F.created, readback: await F.readback() };
