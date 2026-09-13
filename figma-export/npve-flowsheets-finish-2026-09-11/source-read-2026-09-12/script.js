return await (async function program(figma, p) {
  figma.skipInvisibleInstanceChildren = false;
  const fail = message => { throw new Error(message); };
  const stable = v => Array.isArray(v) ? v.map(stable) : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map(k => [k, stable(v[k])])) : v;
  const eq = (a, b) => JSON.stringify(stable(a)) === JSON.stringify(stable(b));
  if (figma.fileKey !== p.fileKey) fail('File identity mismatch');
  const pages = figma.root.children.map(n => `${n.id} ${n.name}`);
  const request = p.kind === 'read' ? p : p.reads.find(r => r.fileKey === p.fileKey);
  if (!request || !eq(pages, request.pages)) fail('Page identity mismatch');
  const cache = new Map();
  const get = async id => {
    if (!cache.has(id)) cache.set(id, await figma.getNodeByIdAsync(id));
    const node = cache.get(id); if (!node) fail(`Missing node ${id}`); return node;
  };
  const snap = n => {
    const owner = n.type === 'COMPONENT' && n.parent?.type === 'COMPONENT_SET' ? n.parent : n;
    const out = { id: n.id, name: n.name, type: n.type, parentId: n.parent?.id };
    for (const k of ['key', 'width', 'height']) if (k in n) out[k] = n[k];
    if (['COMPONENT', 'COMPONENT_SET'].includes(owner.type)) {
      try { out.definitions = owner.componentPropertyDefinitions; }
      catch (error) {
        // A read-only source set Figma cannot read (record workflow_flowsheetsResume_2026-09-12): quote the exact error
        // and read the set's identity, page, geometry and every variant's name and properties instead of failing the
        // read. Only a source read may carry this; a mutation stops on it below.
        let page = owner.parent; while (page && page.type !== 'PAGE') page = page.parent;
        out.definitionsUnreadable = {
          error: String(error && error.message !== undefined ? error.message : error),
          set: { id: owner.id, name: owner.name, type: owner.type, parentId: owner.parent?.id, page: page ? { id: page.id, name: page.name } : null, width: owner.width, height: owner.height },
          variants: (owner.children || []).map(c => ({ id: c.id, name: c.name, variantProperties: c.variantProperties }))
        };
        if (n.type === 'COMPONENT') out.variantProperties = n.variantProperties;
      }
    }
    return out;
  };
  const nodes = [];
  // Reverify inside the mutation call as well: saved IDs and a prior read are not proof.
  for (const expected of request.nodes) {
    const actual = snap(await get(expected.id)); nodes.push(actual);
    if (p.kind !== 'read' && actual.definitionsUnreadable) fail(`Definitions unreadable on ${expected.id} in the target file: ${actual.definitionsUnreadable.error}`);
    for (const [k, v] of Object.entries(expected)) if (!eq(actual[k], v)) fail(`Stale identity/mapping ${expected.id}.${k}`);
  }
  if (p.kind === 'read') return { complete: true, nonce: p.nonce, fileKey: figma.fileKey, pages, nodes };
  if (p.fileKey !== 'fdCQVFdvOByaOYIJYag0d6') fail('Source/library writes prohibited');
  const op = p.operation;
  const child = (n, name) => {
    const matches = n.children?.filter(c => c.name === name) || [];
    if (matches.length !== 1) fail(`Ambiguous hierarchy: ${n.id}/${name}`);
    return matches[0];
  };
  const properties = (n, values) => {
    const defs = (n.parent?.type === 'COMPONENT_SET' ? n.parent : n).componentPropertyDefinitions;
    for (const [k, v] of Object.entries(values)) {
      const d = defs[k];
      if (!d || (d.type === 'VARIANT' && !d.variantOptions.includes(v)) ||
          (d.type === 'BOOLEAN' && typeof v !== 'boolean') ||
          (['TEXT', 'INSTANCE_SWAP'].includes(d.type) && typeof v !== 'string')) fail(`Unavailable property ${k}=${v}`);
    }
  };
  const fonts = async () => { for (const font of p.fonts || []) await figma.loadFontAsync(font); };
  const identities = [];
  const remember = n => { cache.set(n.id, n); identities.push(snap(n)); return n; };
  const component = (parent, name, width, x, y) => {
    const n = figma.createComponent(); parent.appendChild(n); remember(n);
    n.name = name; n.x = x; n.y = y; n.layoutMode = 'VERTICAL';
    n.resize(width, 100); n.primaryAxisSizingMode = 'AUTO'; n.counterAxisSizingMode = 'FIXED';
    n.fills = []; n.clipsContent = false; return n;
  };
  if (op.kind === 'shell') {
    const parent = await get(op.parent), master = await get(op.shell);
    properties(master, op.properties);
    const originalBody = child(master, op.bodyLayer);
    if (originalBody.children.length !== 1 || originalBody.children[0].type !== 'INSTANCE') fail('Ambiguous shell Body slot');
    const blocks = [];
    for (const block of op.blocks) { const n = await get(block.component); properties(n, block.properties); blocks.push([n, block]); }
    const space = await figma.variables.importVariableByKeyAsync(op.spacing.key);
    if (!space || space.name !== op.spacing.name || space.resolvedType !== 'FLOAT' || !Object.values(space.valuesByMode).every(v => v === op.spacing.value)) fail('Missing/mismatched spacing token');
    await fonts();
    const body = component(parent, op.bodyName, op.bodyWidth, op.x, op.y);
    body.setBoundVariable('itemSpacing', space);
    for (const [masterBlock, block] of blocks) {
      const n = masterBlock.createInstance(); body.appendChild(n); n.setProperties(block.properties);
      n.layoutSizingHorizontal = 'FILL'; n.layoutSizingVertical = 'HUG';
    }
    const helper = component(parent, op.helperName, op.width, op.helperX, op.y);
    const shell = master.createInstance(); helper.appendChild(shell); remember(shell);
    shell.setProperties({ ...op.properties, [op.bodyProperty]: body.id });
    const content = child(shell, op.bodyLayer);
    content.layoutSizingVertical = 'HUG'; content.children[0].layoutSizingVertical = 'HUG'; shell.layoutSizingVertical = 'HUG';
    if (shell.width !== op.width || content.children[0].width !== op.bodyWidth) fail('Unexpected shell geometry; read back before recovery');
  } else if (op.kind === 'helpers') {
    const parent = await get(op.parent), row = await get(op.row);
    for (const values of op.rows) properties(row, values);
    const paper = await figma.variables.importVariableByKeyAsync(op.paper.key);
    const space = await figma.variables.importVariableByKeyAsync(op.spacing.key);
    if (!paper || paper.name !== op.paper.name || paper.resolvedType !== 'COLOR' || !eq(paper.valuesByMode, op.paper.valuesByMode)) fail('Missing/mismatched paper token');
    if (!space || space.name !== op.spacing.name || space.resolvedType !== 'FLOAT' || !Object.values(space.valuesByMode).every(v => v === 16)) fail('Missing/mismatched spacing token');
    await fonts();
    const ref = component(parent, op.referenceName, op.width, op.x, op.y);
    ref.layoutMode = 'NONE'; ref.resize(op.width, op.height);
    const image = figma.createRectangle(); ref.appendChild(image); remember(image);
    image.name = op.imageName; image.resize(op.width, op.height); image.fills = [];
    const log = component(parent, op.changeName, op.logWidth, op.logX, op.y);
    log.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }, 'color', paper)];
    if (!log.fills[0].boundVariables?.color) fail('Paper binding failed');
    for (const side of ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight']) log.setBoundVariable(side, space);
    for (const values of op.rows) {
      const n = row.createInstance(); log.appendChild(n); n.setProperties(values);
      n.layoutSizingHorizontal = 'FILL'; n.layoutSizingVertical = 'HUG';
    }
  } else if (op.kind === 'comparison') {
    const parent = await get(op.parent), master = await get(op.master);
    properties(master, op.properties);
    for (const slot of op.slots) {
      const col = child(master, slot.column); const n = child(col, slot.name);
      if (n.type !== 'INSTANCE') fail('Comparison slot is not an instance');
      const helper = await get(slot.helper);
      if (helper.type !== 'COMPONENT') fail('Comparison needs dedicated component helper');
    }
    await fonts();
    const n = master.createInstance(); parent.appendChild(n); remember(n); n.name = op.name; n.x = op.x; n.y = op.y;
    n.setProperties(op.properties);
    for (const slot of op.slots) {
      const col = child(n, slot.column), content = child(col, slot.name), helper = await get(slot.helper);
      if ((await content.getMainComponentAsync()).id !== helper.id) fail('Comparison swap identity mismatch');
      col.clipsContent = false; content.clipsContent = false;
      content.resize(helper.width, helper.height); content.layoutSizingVertical = 'HUG'; col.layoutSizingVertical = 'HUG';
    }
    n.layoutSizingVertical = 'HUG';
  } else if (op.kind === 'preferred') {
    const master = await get(op.master), before = master.componentPropertyDefinitions;
    const size = [master.width, master.height];
    const updates = {};
    for (const [name, values] of Object.entries(op.additions)) {
      if (before[name]?.type !== 'INSTANCE_SWAP') fail(`Unknown swap property ${name}`);
      updates[name] = [...(before[name].preferredValues || [])];
      for (const value of values) {
        const n = await get(value.id);
        if (n.key !== value.key || n.type !== value.type) fail('Preferred component identity mismatch');
        if (!updates[name].some(x => x.key === value.key && x.type === value.type)) updates[name].push({ key: value.key, type: value.type });
      }
    }
    for (const [name, preferredValues] of Object.entries(updates)) master.editComponentProperty(name, { preferredValues });
    const expected = JSON.parse(JSON.stringify(before));
    for (const [name, values] of Object.entries(updates)) expected[name].preferredValues = values;
    if (!eq(expected, master.componentPropertyDefinitions) || !eq(size, [master.width, master.height])) fail('Shared defaults or geometry changed');
    return { complete: true, identities: [snap(master)], before, after: master.componentPropertyDefinitions, differences: [], counts: { updatedMenus: Object.keys(updates).length } };
  } else if (op.kind === 'reference-image') {
    const n = await get(op.rectangle);
    if (n.type !== 'RECTANGLE' || n.parent?.name !== op.referenceName || !op.referenceName.startsWith('_Rebuild comparison/Reference/') || n.fills.length) fail('Only empty frozen-reference rectangles accept images');
    const image = figma.createImage(new Uint8Array(op.png));
    n.fills = [{ type: 'IMAGE', imageHash: image.hash, scaleMode: 'FILL' }]; remember(n);
  } else fail(`Unsupported operation ${op.kind}`);
  // Return full created subtrees to evidence, not the model. Pixels still require inspection.
  const trees = [];
  for (const entry of identities) {
    const n = await get(entry.id);
    const walk = x => ({ ...snap(x), characters: x.type === 'TEXT' ? x.characters : undefined,
      fills: Array.isArray(x.fills) ? x.fills : undefined, references: x.componentPropertyReferences,
      children: x.children?.map(walk) });
    trees.push(walk(n));
  }
  return { complete: true, identities: identities.map(n => snap(cache.get(n.id))), trees, counts: { createdOrTouched: identities.length }, differences: [] };
})(figma, {"kind":"read","fileKey":"zVsuhYehoSLLq880qRBFkq","nonce":"f8802477-d28a-47af-bf4e-4accab923f5a","pages":["0:1 Cover","10:15 -----DESIGNS-----","105:1426 Workflows","1050:8411 Error States","3813:14586 V2:AI Patient Summary","21:320 -----COMPONENTS-----","21:321 ⚙️ Components","105:1425 -----ARCHIVE-----","5264:20606 Module Evolution","4740:14057 NeuNeu","1424:8259 Neu","112:4335 Sandbox","4250:14678 Misc","12:866 NoFolder Navigation","10:14 Folder Navigation","4211:15272 -----RESEARCH------","4211:15273 Maps","1236:3155 Research Framework"],"nodes":[{"id":"129:6647","name":"Sidesheetv3","type":"COMPONENT_SET"},{"id":"939:9228","name":"Page=Clin_Flowsheets","type":"COMPONENT","parentId":"129:6647","key":"8ac09a9476c741ba2858a49d9ad0a2ba780d9114"},{"id":"867:7460","name":"Page=Clin_Flowsheets-AddNew","type":"COMPONENT","parentId":"129:6647","key":"a80eb5a5b6ceee138335feda38f3ad03ebc31cb2"},{"id":"909:12649","name":"Page=Clin_Flowsheets-Edit","type":"COMPONENT","parentId":"129:6647","key":"351db2455ec8fa9db8509e913f6d41245e83128e"}]});