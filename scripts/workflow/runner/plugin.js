// A small serializable Plugin API program for the proven NPVE patterns.
// No imports persist between calls. No selection/page changes occur on reads.
async function program(figma, p) {
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
    if (['COMPONENT', 'COMPONENT_SET'].includes(owner.type)) out.definitions = owner.componentPropertyDefinitions;
    return out;
  };
  const nodes = [];
  // Reverify inside the mutation call as well: saved IDs and a prior read are not proof.
  for (const expected of request.nodes) {
    const actual = snap(await get(expected.id)); nodes.push(actual);
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
}

function validatePlan(plan) {
  const { need } = require('./core');
  const op = plan.operation;
  need(op && ['shell', 'helpers', 'comparison', 'preferred', 'reference-image'].includes(op.kind), 'Unsupported operation');
  need(typeof plan.appearanceEvidence === 'string' && plan.appearanceEvidence, 'Reviewed appearance/configuration evidence required');
  const target = plan.reads.find(r => r.fileKey === plan.fileKey);
  need(target?.nodes?.length, 'Target mappings required');
  for (const read of plan.reads) for (const n of read.nodes || []) {
    need(n.id && n.name && n.type && n.parentId, 'Every source/target/component requires explicit name, type and parent identity');
    if (!['PAGE', 'DOCUMENT'].includes(n.type)) need(Number.isFinite(n.width) && Number.isFinite(n.height), 'Every geometry-bearing identity requires fresh dimensions');
    if (['COMPONENT', 'COMPONENT_SET'].includes(n.type)) need(n.key && n.definitions, 'Every component needs exact key and owning-set definitions');
  }
  const mapped = id => {
    const n = target.nodes.find(n => n.id === id);
    need(n?.name && n.type && n.parentId, `Explicit identity/hierarchy required: ${id}`);
    if (['COMPONENT', 'COMPONENT_SET'].includes(n.type)) need(n.key && n.definitions, `Exact key/definitions required: ${id}`);
    if ('width' in n) need(Number.isFinite(n.width) && Number.isFinite(n.height), 'Invalid mapped geometry');
    return n;
  };
  const ints = keys => { for (const k of keys) need(Number.isInteger(op[k]), `Integer ${k} required`); };
  if (['shell', 'helpers', 'comparison'].includes(op.kind)) {
    const parent = mapped(op.parent); need(['SECTION', 'PAGE', 'FRAME'].includes(parent.type), 'Cannot append children to an instance');
    ints(['x', 'y']);
  }
  if (op.kind === 'shell') {
    const shell = mapped(op.shell); need(shell.type === 'COMPONENT', 'Shell must be component variant');
    need(shell.definitions[op.bodyProperty]?.type === 'INSTANCE_SWAP', 'Missing exact Body swap property');
    need(op.blocks?.length && op.bodyLayer && op.bodyName && op.helperName && op.properties, 'Incomplete shell configuration');
    op.blocks.forEach(b => mapped(b.component)); ints(['width', 'bodyWidth', 'helperX']);
    need(op.width === 550 && op.bodyWidth === 518 && op.spacing?.value === 16 && op.spacing.key && op.spacing.name, 'Only established 550/518/16 shell pattern supported');
  }
  if (op.kind === 'helpers') {
    mapped(op.row); ints(['width', 'height', 'logWidth', 'logX']);
    need(op.rows?.length && op.referenceName?.startsWith('_Rebuild comparison/Reference/') && op.changeName?.startsWith('_Rebuild comparison/Change log/') && op.imageName, 'Dedicated reference/change helpers required');
    need(op.paper?.key && op.paper.name && op.paper.valuesByMode && op.spacing?.key && op.spacing.name, 'Verified paper and spacing tokens required');
  }
  if (op.kind === 'comparison') {
    mapped(op.master);
    need(op.slots?.length === 3 && new Set(op.slots.map(s => s.role)).size === 3, 'Three dedicated comparison slots required');
    for (const role of ['Reference', 'Rebuild', 'Change log']) {
      const s = op.slots.find(s => s.role === role);
      need(s?.column && s.name && s.property && op.properties[s.property] === s.helper, `Missing exact ${role} swap`);
      mapped(s.helper);
    }
    need(new Set(op.slots.map(s => s.helper)).size === 3, 'Comparison helpers must be distinct');
  }
  if (op.kind === 'preferred') {
    mapped(op.master); need(Object.keys(op.additions || {}).length, 'Missing preferred additions');
    for (const values of Object.values(op.additions)) for (const v of values) {
      const n = mapped(v.id); need(n.key === v.key && n.type === v.type, 'Preferred value does not match mapping');
    }
  }
  if (op.kind === 'reference-image') {
    const n = mapped(op.rectangle);
    need(n.type === 'RECTANGLE' && op.source?.fileKey === 'zVsuhYehoSLLq880qRBFkq' && op.source.scale === 2 && op.source.exportedAt, 'Only frozen 2x source references may be rasterized');
    need(plan.reads.some(r => r.fileKey === op.source.fileKey && r.nodes.some(x => x.id === op.source.nodeId && x.width === n.width && x.height === n.height)), 'Reference must retain source size at 1:1');
    need(Array.isArray(op.png) && op.png.every(x => Number.isInteger(x) && x >= 0 && x <= 255) && op.png.slice(0,8).join() === '137,80,78,71,13,10,26,10', 'Complete PNG bytes required');
    const bytes = Buffer.from(op.png);
    need(bytes.length >= 33 && bytes.toString('ascii', 12, 16) === 'IHDR' && bytes.readUInt32BE(16) === n.width * 2 && bytes.readUInt32BE(20) === n.height * 2, 'Reference PNG must be a 2x export');
  }
}
function script(plan) {
  if (plan.kind !== 'read') validatePlan(plan);
  return `return await (${program.toString()})(figma, ${JSON.stringify(plan)});`;
}
module.exports = { program, script, validatePlan };
