// Page inventory for a Figma batch (record workflow_planInventory_2026-09-12).
//
// A Figma batch saves its page inventory to figma-export/<batch>/inventory.json on the first read-only walk. Later
// checks read that file to choose what to look at, and the nodes a script will mutate are re-verified in Figma by
// id, name, type and parent before the first write. The file is a dated candidate list, never evidence (standing
// rule 3); the readback in Figma is the check, and its result is recorded here.
//
//   walkScript(o)                      the use_figma script for the first walk (F.inventory over the target pages)
//   save(dir, result, meta)            writes inventory.json once from the walk's result; addWalk merges a later walk
//   load(dir) / select(inv, criteria)  what a later check looks at: nodes by page, type, name, parent or id
//   expectations(inv, ids)             { id, name, type, parent } for the nodes a script will mutate
//   reverifyScript(o)                  the use_figma script that re-verifies them and refuses writes on drift
//   recordReverification(dir, result)  appends the readback to inventory.json; the gates require the latest to be clean
//
// CLI: node scripts/figma/inventory.js walk <evidence-dir> [--target npve|library|proposals|<fileKey>] [--depth n] [--pages id,id]
//      node scripts/figma/inventory.js save <evidence-dir> <walk-result.json> [--by "<who>"] [--script <name>]
//      node scripts/figma/inventory.js select <evidence-dir> [--page id] [--type T] [--name text] [--parent id]
//      node scripts/figma/inventory.js reverify <evidence-dir> <id,id,…>
//      node scripts/figma/inventory.js record <evidence-dir> <reverify-result.json> [--script <name>]
const fs = require('fs');
const path = require('path');
const { FILES, NPVE_TARGET_PAGES, compose } = require('./helpers');
const { AUTHORITY, INVENTORY_FORMAT, INVENTORY_VERSION, REPO, validateInventory } = require('../workflow/batch-files');

const FILE = 'inventory.json';
const WALK_SCRIPT = 'inventory-walk.figma.js';
const REVERIFY_SCRIPT = 'inventory-reverify.figma.js';

const resolve = (dir, name) => path.resolve(REPO, dir, name);
const relative = (abs) => path.relative(REPO, abs).split(path.sep).join('/');
const readJson = (abs) => JSON.parse(fs.readFileSync(abs, 'utf8'));
const writeJson = (abs, value) => { fs.mkdirSync(path.dirname(abs), { recursive: true }); fs.writeFileSync(abs, `${JSON.stringify(value, null, 2)}\n`); };

// The target by name or key; the NPVE target carries its verified page set as the guard value.
function target(name) {
  if (!name || name === 'npve' || name === FILES.npveTarget) return { fileKey: FILES.npveTarget, pages: NPVE_TARGET_PAGES };
  if (FILES[name]) return { fileKey: FILES[name], pages: null };
  return { fileKey: name, pages: null };
}

function walkScript({ fileKey = FILES.npveTarget, pages = fileKey === FILES.npveTarget ? NPVE_TARGET_PAGES : null, pageIds = null, depth = 2, readOnly } = {}) {
  return compose({ fileKey, pages, readOnly, body: `return { inventory: await F.inventory(${JSON.stringify(pageIds)}, ${depth}) };` });
}

// The file shape from a walk's result (the use_figma return, or its inventory field).
function fromWalk(result, { batch, capturedBy, script } = {}) {
  const walk = result && result.inventory ? result.inventory : result;
  for (const key of ['fileKey', 'capturedAt', 'pages', 'nodes']) if (!walk || walk[key] === undefined) throw new Error(`walk result lacks ${key}; save the return of ${WALK_SCRIPT} as it came back`);
  return {
    format: INVENTORY_FORMAT,
    version: INVENTORY_VERSION,
    batch: batch || null,
    fileKey: walk.fileKey,
    capturedAt: walk.capturedAt,
    capturedBy: capturedBy || null,
    skipInvisibleInstanceChildren: walk.skipInvisibleInstanceChildren,
    authority: AUTHORITY,
    pages: walk.pages.map((p) => ({ id: p.id, name: p.name, children: p.children })),
    nodes: walk.nodes.map((n) => ({ id: n.id, name: n.name, type: n.type, parent: n.parent, page: n.page, depth: n.depth, visible: n.visible })),
    walks: [{ capturedAt: walk.capturedAt, script: script || WALK_SCRIPT, pageIds: walk.walk ? walk.walk.pageIds : null, depth: walk.walk ? walk.walk.depth : null, count: walk.nodes.length }],
    reverifications: []
  };
}

function check(inventory, file) {
  const errors = validateInventory({ file });
  if (errors.length) throw new Error(errors.join('; '));
  return inventory;
}

// The first walk is saved once; a later walk in the same batch goes through addWalk so the first stays on record.
function save(dir, result, meta = {}) {
  const abs = resolve(dir, FILE);
  if (fs.existsSync(abs)) throw new Error(`${relative(abs)} already exists; the first walk is saved once, use addWalk for a later walk`);
  const inventory = fromWalk(result, { batch: dir.split(path.sep).join('/'), ...meta });
  writeJson(abs, inventory);
  check(inventory, relative(abs));
  return relative(abs);
}

function load(dir) {
  const abs = resolve(dir, FILE);
  if (!fs.existsSync(abs)) throw new Error(`${relative(abs)} is missing; save the first walk first`);
  return check(readJson(abs), relative(abs));
}

function addWalk(dir, result, meta = {}) {
  const inventory = load(dir);
  const next = fromWalk(result, meta);
  if (next.fileKey !== inventory.fileKey) throw new Error(`walk is of ${next.fileKey}, the inventory is of ${inventory.fileKey}`);
  const byId = new Map(inventory.nodes.map((n) => [n.id, n]));
  for (const n of next.nodes) byId.set(n.id, n);
  const pages = new Map(inventory.pages.map((p) => [p.id, p]));
  for (const p of next.pages) pages.set(p.id, p);
  inventory.nodes = [...byId.values()];
  inventory.pages = [...pages.values()];
  inventory.walks.push(next.walks[0]);
  writeJson(resolve(dir, FILE), inventory);
  return inventory;
}

// What a later check looks at. name: a case-insensitive substring or a RegExp. Returns candidates, not evidence.
function select(inventory, { page, type, name, parent, ids } = {}) {
  const wanted = ids ? new Set(ids) : null;
  return inventory.nodes.filter((n) => (!page || n.page === page)
    && (!type || n.type === type)
    && (!parent || n.parent === parent)
    && (!wanted || wanted.has(n.id))
    && (!name || (name instanceof RegExp ? name.test(n.name) : n.name.toLowerCase().includes(String(name).toLowerCase()))));
}

function expectations(inventory, ids) {
  return ids.map((id) => {
    const n = inventory.nodes.find((c) => c.id === id);
    if (!n) throw new Error(`${id} is not in the inventory; walk it before mutating it`);
    return { id: n.id, name: n.name, type: n.type, parent: n.parent };
  });
}

function reverifyScript({ fileKey, pages, nodes, readOnly, body } = {}) {
  if (!fileKey) throw new Error('reverifyScript: fileKey is required');
  return compose({ fileKey, pages, readOnly, reverify: nodes, body: body || 'return { reverification: F.reverified };' });
}

function recordReverification(dir, result, { script } = {}) {
  const inventory = load(dir);
  const r = result && result.reverification ? result.reverification : result;
  for (const key of ['verified', 'mismatched', 'missing']) if (!r || !Array.isArray(r[key])) throw new Error(`reverification result lacks ${key}[]; record the return of ${REVERIFY_SCRIPT} as it came back`);
  const entry = { at: new Date().toISOString(), script: script || REVERIFY_SCRIPT, verified: r.verified, mismatched: r.mismatched, missing: r.missing };
  inventory.reverifications.push(entry);
  writeJson(resolve(dir, FILE), inventory);
  return entry;
}

function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i].startsWith('--')) { flags[argv[i].slice(2)] = argv[i + 1]; i += 1; } else positional.push(argv[i]);
  }
  return { positional, flags };
}

function cli(argv) {
  const { positional: [command, dir, arg], flags } = parseArgs(argv);
  if (!command || !dir) throw new Error('Usage: node scripts/figma/inventory.js walk|save|select|reverify|record <evidence-dir> …');
  if (command === 'walk') {
    const t = target(flags.target);
    const script = walkScript({ ...t, pageIds: flags.pages ? flags.pages.split(',') : null, depth: flags.depth ? Number(flags.depth) : 2 });
    const abs = resolve(dir, WALK_SCRIPT);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, `${script}\n`);
    return `wrote ${relative(abs)} (${script.length} characters) for ${t.fileKey}; run it with use_figma and save the result as JSON, then: node scripts/figma/inventory.js save ${dir} <result.json>`;
  }
  if (command === 'save') {
    if (!arg) throw new Error('save needs the walk result JSON path');
    const file = save(dir, readJson(path.resolve(REPO, arg)), { capturedBy: flags.by, script: flags.script });
    const inventory = load(dir);
    return `saved ${file}: ${inventory.pages.length} pages, ${inventory.nodes.length} nodes of ${inventory.fileKey} captured ${inventory.capturedAt}`;
  }
  if (command === 'select') {
    const rows = select(load(dir), { page: flags.page, type: flags.type, name: flags.name, parent: flags.parent });
    return rows.map((n) => `${n.id}\t${n.type}\t${n.parent}\t${n.page}\t${n.name}`).join('\n') || '(no candidates)';
  }
  if (command === 'reverify') {
    if (!arg) throw new Error('reverify needs a comma-separated list of node ids');
    const inventory = load(dir);
    const t = target(inventory.fileKey);
    const script = reverifyScript({ fileKey: inventory.fileKey, pages: t.pages, nodes: expectations(inventory, arg.split(',')) });
    const abs = resolve(dir, REVERIFY_SCRIPT);
    fs.writeFileSync(abs, `${script}\n`);
    return `wrote ${relative(abs)} (${script.length} characters); run it with use_figma before the first write and record the result: node scripts/figma/inventory.js record ${dir} <result.json>`;
  }
  if (command === 'record') {
    if (!arg) throw new Error('record needs the reverify result JSON path');
    const entry = recordReverification(dir, readJson(path.resolve(REPO, arg)), { script: flags.script });
    return `recorded reverification at ${entry.at}: ${entry.verified.length} verified, ${entry.mismatched.length} mismatched, ${entry.missing.length} missing`;
  }
  throw new Error(`unknown command ${command}`);
}

if (require.main === module) console.log(cli(process.argv.slice(2)));

module.exports = { FILE, REVERIFY_SCRIPT, WALK_SCRIPT, addWalk, cli, expectations, fromWalk, load, recordReverification, reverifyScript, save, select, target, walkScript };
