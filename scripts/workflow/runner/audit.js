const { need, equal, sharedDiff } = require('./core');

// Compares full all-page and instance snapshots. Does not certify visual checks,
// approvals, missing tokens, or inferred text. Failures remain explicit.
function audit({ beforePages, afterPages, pairs, fractional, shared }) {
  need(Array.isArray(beforePages) && beforePages.length && Array.isArray(afterPages), 'All-page inventories required');
  equal(beforePages.map(x => x.id), afterPages.map(x => x.id), 'Page inventory changed');
  for (const page of afterPages) equal(page.unbound, beforePages.find(x => x.id === page.id).unbound, `Unbound paint difference on ${page.id}`);
  need(Array.isArray(fractional) && fractional.length === 0, 'Fractional authored geometry');
  need(Array.isArray(pairs) && pairs.length, 'Every new variant requires rendered-instance evidence');
  for (const pair of pairs) {
    need(pair.master === pair.instanceMain, 'Instance component identity mismatch');
    equal(pair.masterPaints, pair.instancePaints, 'Rendered paint mismatch');
    need(Array.isArray(pair.masterPaints) && pair.masterPaints.length, 'Missing rendered paints');
    // Root COMPONENT/INSTANCE type and the expected root swap reference are deliberately
    // excluded by the snapshot collector. Descendant references must still match exactly.
    need(Number.isInteger(pair.masterDescendantReferences) && pair.masterDescendantReferences >= 0, 'Missing reference counts');
    equal(pair.masterDescendantReferences, pair.instanceDescendantReferences, 'Descendant property references lost');
  }
  need(Array.isArray(shared) && shared.length, 'Shared baseline required');
  const sharedSummaries = shared.map(s => sharedDiff(s.before, s.after, s.additions));
  return { deterministicPass: true, pages: afterPages.length, variants: pairs.length, shared: sharedSummaries, differences: [], visualReview: 'REQUIRED — not evaluated by audit' };
}

// Read-only collection, serialized into an authenticated Plugin API read. Explicit
// expected variant IDs define scope; the walker still enumerates every actual page.
async function collect(figma, config) {
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
}
module.exports = { audit, collect, script: config => `return await (${collect.toString()})(figma, ${JSON.stringify(config)});` };
