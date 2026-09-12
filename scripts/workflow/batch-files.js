// Durable per-batch plan and page inventory (record workflow_planInventory_2026-09-12).
//
// Every batch keeps two files beside its report in figma-export/<batch>/:
//   plan.md         the planner's phase checklist, written before the record opens and kept current through the
//                   batch. Required for every batch. A phase is `- [ ]` open, `- [x]` done, or `- [-] …: why` dropped.
//   inventory.json  a Figma batch's page inventory, saved on the first read-only walk (scripts/figma/inventory.js).
//                   Later checks read it to choose what to look at; the nodes a script will mutate are re-verified
//                   in Figma by id, name, type and parent before the first write (F.reverify in scripts/figma/helpers.js)
//                   and the result is recorded in the file. The inventory is a dated candidate list, never evidence
//                   (standing rule 3). Absent for a repository-only batch.
//
// validateBatchFiles runs at open (apply, start-batch), at checkpoint, before a mutation (check-batch), at close
// (close, the runner closeout) and at finish (finish-batch). It applies to records dated on or after
// workflow/check-catalog.json → batchFiles.appliesFrom; an older batch is noted, not refused.
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..');
const CATALOG = 'workflow/check-catalog.json';
const KINDS = ['figma', 'repository'];
const STAGES = ['open', 'checkpoint', 'mutation', 'close', 'finish'];
const INVENTORY_FORMAT = 'tebra.design-page-inventory';
const INVENTORY_VERSION = 1;
const AUTHORITY = 'A dated candidate list from a read-only walk; not evidence. Re-verify every node a script will mutate by id, name, type and parent in Figma before the first write (standing rule 3).';
const CHECKBOX = /^\s*[-*]\s+\[( |x|X|-)\]\s+(.*\S)\s*$/;
const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;

const resolve = (file) => path.resolve(REPO, file);

// The catalog is read from the repository even when a self-test points the store elsewhere; an override is for tests.
function policy(override) {
  const defaults = { plan: 'plan.md', inventory: 'inventory.json' };
  if (override) return { appliesFrom: '0000-00-00', ...defaults, ...override };
  const catalog = JSON.parse(fs.readFileSync(path.join(REPO, CATALOG), 'utf8'));
  const b = catalog.batchFiles;
  if (!b || !b.appliesFrom) throw new Error(`${CATALOG} lacks batchFiles.appliesFrom`);
  return { ...defaults, ...b };
}

const posix = (file) => String(file).split(path.sep).join('/');

// The evidence folder is the report's folder: the record's report, or the manifest item's required report.
function evidenceDir({ record, item } = {}) {
  const report = (record && typeof record.report === 'string' && record.report) || (item && item.requiredEvidence && item.requiredEvidence.report);
  return report ? path.posix.dirname(posix(report)) : null;
}
function planPath(ctx, p) {
  if (ctx.record && typeof ctx.record.plan === 'string' && ctx.record.plan) return ctx.record.plan;
  const dir = evidenceDir(ctx);
  return dir ? `${dir}/${p.plan}` : null;
}
function inventoryPath(ctx, p) {
  if (ctx.record && typeof ctx.record.inventory === 'string' && ctx.record.inventory) return ctx.record.inventory;
  const dir = evidenceDir(ctx);
  return dir ? `${dir}/${p.inventory}` : null;
}

const hasMutations = (record) => !!(record && ((Array.isArray(record.figmaMutations) && record.figmaMutations.length) || (record.validation && Number(record.validation.figmaMutations) > 0)));

// The batch kind: declared by the planner as record.batchKind; otherwise a manifest item with a target file, or a
// record listing Figma mutations, is a Figma batch. A declaration that contradicts either is an error, not a guess.
function batchKind({ record, item } = {}) {
  const declared = record ? record.batchKind : undefined;
  const errors = [];
  if (declared !== undefined && !KINDS.includes(declared)) errors.push(`batchKind must be ${KINDS.join(' or ')} (got ${JSON.stringify(declared)})`);
  const targets = !!(item && item.target && item.target.fileKey);
  const mutations = hasMutations(record);
  const kind = KINDS.includes(declared) ? declared : (targets || mutations ? 'figma' : 'repository');
  if (declared === 'repository' && targets) errors.push('batchKind repository, but the manifest item targets a Figma file');
  if (declared === 'repository' && mutations) errors.push('batchKind repository, but the record lists Figma mutations');
  return { kind, declared, inferred: !KINDS.includes(declared), errors };
}

function parsePlan(text) {
  const lines = String(text).split(/\r?\n/);
  const first = (re) => lines.find((line) => re.test(line));
  const value = (line, prefix) => (line ? line.slice(prefix.length).replace(/`/g, '').trim().split(/\s+/)[0] : null);
  const title = (first(/^#\s+\S/) || '').replace(/^#\s+/, '').trim();
  const record = value(first(/^Record:\s*\S/), 'Record:');
  const kind = value(first(/^Kind:\s*\S/), 'Kind:');
  const items = [];
  lines.forEach((line, i) => {
    const m = CHECKBOX.exec(line);
    if (m) items.push({ line: i + 1, state: m[1] === ' ' ? 'open' : m[1] === '-' ? 'dropped' : 'done', text: m[2] });
  });
  const todos = lines.map((line, i) => (/\bTODO\b/.test(line) ? i + 1 : 0)).filter(Boolean);
  return { title, record, kind, items, todos };
}

// terminal: at close and finish every phase is done or dropped with a reason.
function validatePlan({ file, recordId, kind, terminal = false }) {
  if (!file) return ['no report path to locate plan.md beside'];
  if (!fs.existsSync(resolve(file))) return [`${file} is missing: the planner writes the phase checklist before the record opens`];
  const plan = parsePlan(fs.readFileSync(resolve(file), 'utf8'));
  const errors = [];
  if (!plan.title) errors.push(`${file}: no "# " title line`);
  if (!plan.record) errors.push(`${file}: no "Record: <recordId>" line`);
  else if (recordId && plan.record !== recordId) errors.push(`${file}: Record: ${plan.record} does not name ${recordId}`);
  if (kind && plan.kind && plan.kind !== kind) errors.push(`${file}: Kind: ${plan.kind} disagrees with batchKind ${kind}`);
  if (!plan.items.length) errors.push(`${file}: no phase checklist items (- [ ] …)`);
  if (plan.todos.length) errors.push(`${file}: TODO left at line ${plan.todos.join(', ')}`);
  for (const item of plan.items) if (item.state === 'dropped' && !/:\s*\S/.test(item.text)) errors.push(`${file}:${item.line}: a dropped phase says why after a colon`);
  if (terminal) {
    const open = plan.items.filter((item) => item.state === 'open');
    if (open.length) errors.push(`${file}: ${open.length} phase(s) still open at close (line ${open.map((item) => item.line).join(', ')}); check each ([x]) or drop it ([-] …: why)`);
  }
  return errors;
}

function readInventory(file) {
  return JSON.parse(fs.readFileSync(resolve(file), 'utf8'));
}

const isId = (v) => typeof v === 'string' && v.length > 0;

// fileKey: the batch target, when known. requireReverification: a write is imminent or has happened, so the latest
// recorded reverification of the nodes to mutate must exist and be clean.
function validateInventory({ file, fileKey, requireReverification = false }) {
  if (!file) return ['no report path to locate inventory.json beside'];
  if (!fs.existsSync(resolve(file))) return [`${file} is missing: save the first read-only page walk (scripts/figma/inventory.js) before the first write`];
  let inv;
  try { inv = readInventory(file); } catch (error) { return [`${file}: ${error.message}`]; }
  const errors = [];
  if (inv.format !== INVENTORY_FORMAT || inv.version !== INVENTORY_VERSION) errors.push(`${file}: format must be ${INVENTORY_FORMAT} version ${INVENTORY_VERSION}`);
  if (!isId(inv.fileKey)) errors.push(`${file}: fileKey missing`);
  else if (fileKey && inv.fileKey !== fileKey) errors.push(`${file}: fileKey ${inv.fileKey} is not the batch target ${fileKey}`);
  if (!ISO.test(String(inv.capturedAt || ''))) errors.push(`${file}: capturedAt must be an ISO timestamp`);
  if (inv.skipInvisibleInstanceChildren !== false) errors.push(`${file}: the walk did not record skipInvisibleInstanceChildren=false (standing batch rule 4)`);
  if (typeof inv.authority !== 'string' || !/not evidence/i.test(inv.authority)) errors.push(`${file}: authority must state the inventory is not evidence (standing rule 3)`);
  const pages = Array.isArray(inv.pages) ? inv.pages : [];
  if (!pages.length) errors.push(`${file}: pages must be a non-empty array of { id, name }`);
  const pageIds = new Set(pages.filter((p) => p && isId(p.id) && isId(p.name)).map((p) => p.id));
  if (pageIds.size !== pages.length) errors.push(`${file}: every page needs an id and a name`);
  const nodes = Array.isArray(inv.nodes) ? inv.nodes : null;
  if (!nodes) errors.push(`${file}: nodes must be an array`);
  else {
    const bad = nodes.filter((n) => !(n && isId(n.id) && typeof n.name === 'string' && isId(n.type) && (n.parent === null || isId(n.parent)) && pageIds.has(n.page)));
    if (bad.length) errors.push(`${file}: ${bad.length} node(s) lack id, name, type, parent or a listed page (first: ${JSON.stringify(bad[0] && bad[0].id)})`);
  }
  const revs = Array.isArray(inv.reverifications) ? inv.reverifications : null;
  if (!revs) errors.push(`${file}: reverifications must be an array (empty until the first re-verify)`);
  else {
    const shaped = (r) => r && ISO.test(String(r.at || '')) && ['verified', 'mismatched', 'missing'].every((k) => Array.isArray(r[k]));
    if (!revs.every(shaped)) errors.push(`${file}: every reverification needs at, verified[], mismatched[] and missing[]`);
    else if (requireReverification) {
      const last = revs[revs.length - 1];
      if (!last) errors.push(`${file}: no reverification recorded: re-verify the nodes to mutate by id, name, type and parent before the first write`);
      else if (last.mismatched.length || last.missing.length) errors.push(`${file}: the latest reverification (${last.at}) found ${last.mismatched.length} mismatched and ${last.missing.length} missing node(s); walk again and re-verify before writing`);
      else if (!last.verified.length) errors.push(`${file}: the latest reverification (${last.at}) verified no nodes`);
    }
  }
  return errors;
}

// { record, recordId, item, date, stage, policy } → { applies, kind, inferred, plan, inventory, errors, notes }
function validateBatchFiles({ record, recordId, item, date, stage = 'open', policy: override } = {}) {
  if (!STAGES.includes(stage)) throw new Error(`unknown stage ${stage}; use ${STAGES.join(', ')}`);
  const p = policy(override);
  const when = date || (record && record.date) || '';
  if (String(when) < p.appliesFrom) return { applies: false, kind: null, inferred: null, plan: null, inventory: null, errors: [], notes: [`plan and inventory not required for a record dated ${when || 'unknown'} (before ${p.appliesFrom})`] };
  const ctx = { record, item };
  const k = batchKind(ctx);
  const errors = [...k.errors];
  if (record && record.batchKind === undefined && ['open', 'checkpoint'].includes(stage)) errors.push(`batchKind must be declared by the planner (${KINDS.join(' or ')})`);
  const terminal = stage === 'close' || stage === 'finish';
  const plan = planPath(ctx, p);
  errors.push(...validatePlan({ file: plan, recordId, kind: k.kind, terminal }));
  const inventory = inventoryPath(ctx, p);
  if (k.kind === 'figma') {
    if (['mutation', 'close', 'finish'].includes(stage)) {
      const fileKey = item && item.target && item.target.fileKey;
      errors.push(...validateInventory({ file: inventory, fileKey, requireReverification: stage === 'mutation' || hasMutations(record) }));
    }
  } else if (inventory && fs.existsSync(resolve(inventory))) {
    errors.push(`${inventory} exists, but the batch is repository-only; a repository-only batch keeps no page inventory`);
  }
  return { applies: true, kind: k.kind, inferred: k.inferred, plan, inventory: k.kind === 'figma' ? inventory : null, errors, notes: [] };
}

function assertBatchFiles(ctx) {
  const result = validateBatchFiles(ctx);
  if (result.errors.length) throw new Error(`Batch files gate (${ctx.stage || 'open'}) failed:\n- ${result.errors.join('\n- ')}`);
  return result;
}

function describe(result) {
  if (!result.applies) return result.notes[0];
  return `kind=${result.kind}${result.inferred ? ' (inferred)' : ''} plan=${result.plan}${result.inventory ? ` inventory=${result.inventory}` : ''}`;
}

if (require.main === module) {
  // Usage: node scripts/workflow/batch-files.js <record-id | manifest item id> [open|checkpoint|mutation|close|finish]
  const [id, stage = 'open'] = process.argv.slice(2);
  if (!id) throw new Error('Usage: node scripts/workflow/batch-files.js <record-id | item-id> [open|checkpoint|mutation|close|finish]');
  const { readJson, readStoreRecord } = require('./lib');
  const manifest = readJson('workflow/manifest.json');
  const item = manifest.items.find((candidate) => candidate.id === id) || null;
  const recordId = item ? item.expectedRecordId : id;
  const { env, record } = readStoreRecord(recordId);
  if (!record) throw new Error(`${recordId} is not in the store`);
  const result = assertBatchFiles({ record, recordId, item, date: env.date, stage });
  console.log(`batch files PASS ${recordId} (${stage}) ${describe(result)}`);
}

module.exports = {
  AUTHORITY, INVENTORY_FORMAT, INVENTORY_VERSION, KINDS, REPO, STAGES,
  assertBatchFiles, batchKind, describe, evidenceDir, hasMutations, inventoryPath, parsePlan, planPath, policy,
  readInventory, validateBatchFiles, validateInventory, validatePlan
};
