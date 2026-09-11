return await (async function collect(figma, config) {
  figma.skipInvisibleInstanceChildren = false;
  if (figma.fileKey !== config.fileKey) throw new Error('Audit file mismatch');
  if (JSON.stringify(figma.root.children.map(p => `${p.id} ${p.name}`)) !== JSON.stringify(config.pages)) throw new Error('Audit page inventory mismatch');
  const pages = [], fractional = [], pairs = [], shared = [];
  const walk = n => [n, ...(n.children || []).flatMap(walk)];
  const paints = n => walk(n).map(x => ({ fills: Array.isArray(x.fills) ? x.fills : null, strokes: Array.isArray(x.strokes) ? x.strokes : null }));
  const refs = n => walk(n).slice(1).reduce((s, x) => s + Object.keys(x.componentPropertyReferences || {}).length, 0);
  for (const p of figma.root.children) {
    const unbound = [];
    for (const n of walk(p)) for (const field of ['fills', 'strokes']) {
      if (Array.isArray(n[field])) for (const paint of n[field]) if (paint.type === 'SOLID' && !paint.boundVariables?.color) unbound.push({ id: n.id, field });
    }
    pages.push({ id: p.id, name: p.name, unbound });
  }
  for (const id of config.authoredRoots) {
    const root = await figma.getNodeByIdAsync(id); if (!root) throw new Error(`Missing authored root ${id}`);
    for (const n of walk(root)) {
      let inherited = false; for (let x = n; x && x.type !== 'PAGE'; x = x.parent) if (x.type === 'INSTANCE') inherited = true;
      if (inherited || ['VECTOR', 'GROUP', 'BOOLEAN_OPERATION', 'ELLIPSE', 'LINE'].includes(n.type)) continue;
      for (const key of ['x', 'y', 'width', 'height']) if (key in n && Math.abs(n[key] - Math.round(n[key])) > .001) fractional.push({ id: n.id, key, value: n[key] });
    }
  }
  for (const pair of config.pairs) {
    const master = await figma.getNodeByIdAsync(pair.master), instance = await figma.getNodeByIdAsync(pair.instance);
    if (!master || instance?.type !== 'INSTANCE') throw new Error('Missing master/live instance');
    pairs.push({ master: master.id, instance: instance.id, instanceMain: (await instance.getMainComponentAsync()).id,
      masterPaints: paints(master), instancePaints: paints(instance), masterDescendantReferences: refs(master), instanceDescendantReferences: refs(instance) });
  }
  for (const id of config.shared) {
    const n = await figma.getNodeByIdAsync(id); if (!n) throw new Error(`Missing shared ${id}`);
    shared.push({ id, definitions: n.componentPropertyDefinitions, width: n.width, height: n.height,
      variants: n.type === 'COMPONENT_SET' ? n.children.map(c => ({ id: c.id, width: c.width, height: c.height })) : [] });
  }
  return { complete: true, fileKey: figma.fileKey, pages, fractional, pairs, shared };
})(figma, {"fileKey":"fdCQVFdvOByaOYIJYag0d6","pages":["0:1 Cover","3:2 Templates","27:2 Screens","126:2 Archive"],"authoredRoots":["684:8265","687:13026","692:2392"],"pairs":[{"master":"684:8266","instance":"684:8297"},{"master":"685:8297","instance":"685:8332"},{"master":"684:8266","instance":"I691:611;114:1139;684:8297"},{"master":"685:8297","instance":"I691:929;114:1139;685:8332"}],"shared":["35:332","18:103"]});