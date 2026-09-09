// Append-only record store for the design-system register (Phase 8, record schemasplit_phase8_2026-09-08).
//
// Layout
//   foundation/<key>.json            one file per non-record top-level section (meta, tokens, components, ...)
//   foundation/layout.json           ordered list of foundation keys; "flags" is served from flags/
//   records/<ws>/<date>/<id>.json    one envelope per batch record, immutable once its status leaves IN PROGRESS
//   flags/active.json, flags/resolved.json  the flag register split by status; entries keep their aggregate sequence
//   indexes/record-index.json, indexes/current-state.json  generated, never hand-edited
//   design-system-schema.json        generated legacy aggregate, byte-for-byte what the monolith would have been
//
// Everything that reads the register goes through loadStore(); everything that writes goes through
// openRecord / finalizeRecord / appendFlags / resolveFlag, each of which regenerates the aggregate and indexes.
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

// TEBRA_STORE_ROOT lets the self-test run the write/read cycle against a scratch copy of the store.
const ROOT = process.env.TEBRA_STORE_ROOT ? path.resolve(process.env.TEBRA_STORE_ROOT) : path.resolve(__dirname, '..', '..');
const PATHS = {
  foundationDir: 'foundation',
  layout: 'foundation/layout.json',
  recordsDir: 'records',
  flagsActive: 'flags/active.json',
  flagsResolved: 'flags/resolved.json',
  recordIndex: 'indexes/record-index.json',
  currentState: 'indexes/current-state.json',
  aggregate: 'design-system-schema.json'
};
const RECORD_FORMAT = 'tebra.design-record';
const FLAGS_FORMAT = 'tebra.design-flags';
const INDEX_FORMAT = 'tebra.design-record-index';
const STATE_FORMAT = 'tebra.design-current-state';

const abs = (file) => path.resolve(ROOT, file);
const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
const canonical = (value) => JSON.stringify(value); // key order preserved; this is the record's content identity
const contentSha = (value) => sha256(canonical(value));
const readJson = (file) => JSON.parse(fs.readFileSync(abs(file), 'utf8'));
const exists = (file) => fs.existsSync(abs(file));
function writeText(file, text) {
  fs.mkdirSync(path.dirname(abs(file)), { recursive: true });
  fs.writeFileSync(abs(file), text);
}
const writeJson = (file, value) => writeText(file, `${JSON.stringify(value, null, 1)}\n`);
// The legacy aggregate was always written with JSON.stringify(schema, null, 1) and no trailing newline.
const serializeAggregate = (aggregate) => JSON.stringify(aggregate, null, 1);

// --- classification -------------------------------------------------------------------------------------

function workstreamFor(id) {
  if (/^(npveRebuild_|leanPilot_)/.test(id)) return 'npve';
  if (/^libraryTodos_/.test(id)) return 'library';
  if (/^(workflowRefactor_|postPilot_|docsOperatorsGuide_|schemasplit_|workflow_)/.test(id)) return 'workflow';
  return 'library';
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
function dateFor(id, record, previousDate) {
  if (typeof record.date === 'string' && DATE_RE.test(record.date)) return { date: record.date, source: 'record.date' };
  if (typeof record._date === 'string' && DATE_RE.test(record._date)) return { date: record._date, source: 'record._date' };
  const m = id.match(/(\d{4})[-_](\d{2})[-_](\d{2})/);
  if (m) return { date: `${m[1]}-${m[2]}-${m[3]}`, source: 'id' };
  if (previousDate) return { date: previousDate, source: 'position (date of the preceding record in the aggregate)' };
  throw new Error(`Cannot date record ${id}`);
}

// A flag is resolved when the register says so in any of the ways it has said so since 2026-08-01.
// The rule is a projection: it decides which file a flag lives in and never edits the flag.
const FLAG_CLASSIFIER = 'resolved when status starts with CLOSED|RESOLVED|SUPERSEDED|RETRACTED, or resolution (not starting REOPENED), resolvedBy, resolved, superseded, addressedBy or a withdrawn_* field is present, or handling starts with Resolved / contains RESOLVED; a status starting with REOPENED forces active';
function flagResolution(flag) {
  const status = typeof flag.status === 'string' ? flag.status : '';
  if (/^REOPENED/.test(status)) return { resolved: false, by: 'status REOPENED' };
  const by = [];
  if (/^(CLOSED|RESOLVED|SUPERSEDED|RETRACTED)/.test(status)) by.push('status');
  if (flag.resolution !== undefined && !/^REOPENED/.test(String(flag.resolution))) by.push('resolution');
  if (flag.resolvedBy) by.push('resolvedBy');
  if (flag.resolved) by.push('resolved');
  if (flag.superseded) by.push('superseded');
  if (flag.addressedBy) by.push('addressedBy');
  if (Object.keys(flag).some((key) => key.startsWith('withdrawn'))) by.push('withdrawn');
  if (typeof flag.handling === 'string' && /^Resolved|\bRESOLVED\b/.test(flag.handling)) by.push('handling');
  return { resolved: by.length > 0, by: by.join(',') || null };
}

const recordStatus = (record) => String(record._status || record.status || '');
const isInProgress = (record) => recordStatus(record).startsWith('IN PROGRESS');
const isDone = (record) => recordStatus(record).startsWith('DONE');
const recordPath = (env) => `${PATHS.recordsDir}/${env.workstream}/${env.date}/${env.id}.json`;

// --- loading -----------------------------------------------------------------------------------------------

function listRecordFiles() {
  const out = [];
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith('.json')) out.push(path.relative(ROOT, full).replaceAll('\\', '/'));
    }
  };
  walk(abs(PATHS.recordsDir));
  return out;
}

function readFlagsFile(file, status) {
  const doc = readJson(file);
  if (doc.format !== FLAGS_FORMAT || doc.version !== 1) throw new Error(`${file}: unsupported flags format`);
  if (doc.status !== status) throw new Error(`${file}: status field is ${doc.status}, expected ${status}`);
  if (!Array.isArray(doc.entries)) throw new Error(`${file}: entries missing`);
  return doc;
}

function loadStore() {
  const errors = [];
  const layout = readJson(PATHS.layout);
  if (!Array.isArray(layout.order) || !layout.order.includes('flags')) errors.push('foundation/layout.json must list the foundation keys in order, including flags');
  const foundation = {};
  for (const key of layout.order) {
    if (key === 'flags') continue;
    const file = `${PATHS.foundationDir}/${key}.json`;
    if (!exists(file)) { errors.push(`missing foundation file ${file}`); continue; }
    foundation[key] = readJson(file);
  }
  const records = [];
  const ids = new Set();
  const sequences = new Set();
  for (const file of listRecordFiles()) {
    const env = readJson(file);
    if (env.format !== RECORD_FORMAT || env.version !== 1) { errors.push(`${file}: unsupported record format`); continue; }
    for (const field of ['id', 'sequence', 'date', 'workstream', 'record']) if (env[field] === undefined) errors.push(`${file}: missing ${field}`);
    if (recordPath(env) !== file) errors.push(`${file}: envelope says it belongs at ${recordPath(env)}`);
    if (ids.has(env.id)) errors.push(`duplicate record id ${env.id}`);
    if (sequences.has(env.sequence)) errors.push(`duplicate record sequence ${env.sequence} (${env.id})`);
    ids.add(env.id); sequences.add(env.sequence);
    if (layout.order.includes(env.id)) errors.push(`${env.id} is both a foundation key and a record`);
    records.push({ ...env, file, recordSha256: contentSha(env.record), fileSha256: sha256(fs.readFileSync(abs(file))) });
  }
  records.sort((a, b) => a.sequence - b.sequence);
  const active = readFlagsFile(PATHS.flagsActive, 'active');
  const resolved = readFlagsFile(PATHS.flagsResolved, 'resolved');
  const flagSeq = new Set();
  const flagIds = new Set();
  for (const [status, doc] of [['active', active], ['resolved', resolved]]) {
    for (const entry of doc.entries) {
      if (typeof entry.sequence !== 'number' || !entry.flag || typeof entry.flag !== 'object') errors.push(`flags/${status}.json: malformed entry ${JSON.stringify(entry).slice(0, 80)}`);
      if (flagSeq.has(entry.sequence)) errors.push(`duplicate flag sequence ${entry.sequence}`);
      if (flagIds.has(entry.flag?.id)) errors.push(`duplicate flag id ${entry.flag?.id}`);
      flagSeq.add(entry.sequence); flagIds.add(entry.flag?.id);
    }
  }
  if (errors.length) throw new Error(`Record store is inconsistent:\n- ${errors.join('\n- ')}`);
  return { layout, foundation, records, flags: { active, resolved } };
}

// --- generation ----------------------------------------------------------------------------------------------

function mergedFlags(store) {
  return [...store.flags.active.entries, ...store.flags.resolved.entries].sort((a, b) => a.sequence - b.sequence).map((entry) => entry.flag);
}

function buildAggregate(store) {
  const aggregate = {};
  for (const key of store.layout.order) aggregate[key] = key === 'flags' ? mergedFlags(store) : store.foundation[key];
  for (const env of store.records) {
    if (aggregate[env.id] !== undefined) throw new Error(`record ${env.id} collides with an existing aggregate key`);
    aggregate[env.id] = env.record;
  }
  return aggregate;
}

function buildRecordIndex(store) {
  return {
    format: INDEX_FORMAT,
    version: 1,
    generatedBy: 'scripts/schema/build-aggregate.js (never hand-edited)',
    foundation: store.layout.order.map((key) => (key === 'flags' ? { key, path: 'flags/active.json + flags/resolved.json' } : { key, path: `${PATHS.foundationDir}/${key}.json`, sha256: contentSha(store.foundation[key]) })),
    records: store.records.map((env) => ({
      id: env.id,
      sequence: env.sequence,
      date: env.date,
      workstream: env.workstream,
      path: env.file,
      status: recordStatus(env.record).slice(0, 120),
      recordSha256: env.recordSha256,
      fileSha256: env.fileSha256
    })),
    flags: {
      classifier: FLAG_CLASSIFIER,
      active: store.flags.active.entries.length,
      resolved: store.flags.resolved.entries.length,
      total: store.flags.active.entries.length + store.flags.resolved.entries.length,
      nextSequence: Math.max(-1, ...store.flags.active.entries.map((e) => e.sequence), ...store.flags.resolved.entries.map((e) => e.sequence)) + 1,
      activeIds: store.flags.active.entries.map((entry) => entry.flag.id),
      resolvedIds: store.flags.resolved.entries.map((entry) => entry.flag.id)
    },
    counts: { foundation: store.layout.order.length, records: store.records.length, aggregateTopLevelKeys: store.layout.order.length + store.records.length, nextRecordSequence: Math.max(-1, ...store.records.map((r) => r.sequence)) + 1 }
  };
}

function buildCurrentState(store, aggregateText) {
  const byWorkstream = {};
  for (const env of store.records) {
    const ws = byWorkstream[env.workstream] || (byWorkstream[env.workstream] = { count: 0, latest: null });
    ws.count += 1;
    ws.latest = { id: env.id, date: env.date, path: env.file, status: recordStatus(env.record).slice(0, 160) };
  }
  const last = store.records.at(-1);
  const inProgress = store.records.filter((env) => isInProgress(env.record)).map((env) => env.id);
  const standingRules = Object.keys(store.foundation.standingBatchRules || {}).filter((key) => /^\d+_/.test(key));
  return {
    format: STATE_FORMAT,
    version: 1,
    generatedBy: 'scripts/schema/build-aggregate.js (never hand-edited)',
    latestRecord: last ? { id: last.id, date: last.date, workstream: last.workstream, path: last.file, status: recordStatus(last.record).slice(0, 160) } : null,
    recordGate: { inProgress, clear: inProgress.length === 0, rule: 'a new record may open only while the previous record in its workstream is DONE; the apply script checks this index' },
    byWorkstream,
    flags: { active: store.flags.active.entries.length, resolved: store.flags.resolved.entries.length },
    standingBatchRules: standingRules.length,
    aggregate: { path: PATHS.aggregate, sha256: sha256(aggregateText), bytes: Buffer.byteLength(aggregateText) }
  };
}

function generate(store = loadStore()) {
  const aggregate = buildAggregate(store);
  const aggregateText = serializeAggregate(aggregate);
  const recordIndex = buildRecordIndex(store);
  const currentState = buildCurrentState(store, aggregateText);
  return { store, aggregate, aggregateText, recordIndex, currentState };
}

function writeGenerated(generated = generate()) {
  writeText(PATHS.aggregate, generated.aggregateText);
  writeJson(PATHS.recordIndex, generated.recordIndex);
  writeJson(PATHS.currentState, generated.currentState);
  return generated;
}

// Freshness: the on-disk generated files must equal what the store generates now.
function checkFreshness(generated = generate()) {
  const stale = [];
  const same = (file, text) => exists(file) && fs.readFileSync(abs(file), 'utf8') === text;
  if (!same(PATHS.aggregate, generated.aggregateText)) stale.push(PATHS.aggregate);
  if (!same(PATHS.recordIndex, `${JSON.stringify(generated.recordIndex, null, 1)}\n`)) stale.push(PATHS.recordIndex);
  if (!same(PATHS.currentState, `${JSON.stringify(generated.currentState, null, 1)}\n`)) stale.push(PATHS.currentState);
  return stale;
}

// Fingerprint of everything a batch does not own. Records and flags are keyed so concurrent appends by
// another batch are visible as additions rather than as a changed shared blob.
function fingerprint(store, ownedRecordId = null) {
  const records = {};
  for (const env of store.records) if (env.id !== ownedRecordId) records[env.id] = env.recordSha256;
  const flags = {};
  for (const entry of mergedFlags(store)) flags[entry.id] = contentSha(entry);
  const foundation = contentSha(store.layout.order.filter((k) => k !== 'flags').map((k) => [k, store.foundation[k]]));
  return { foundation, records, flags };
}

// Compare a fingerprint taken at batch start with the store now. Additions are allowed (another batch
// appended its own record or flag); any change to something that existed at start is a violation, except
// flags the owned record lists in flagsResolved (resolution moves an entry from active to resolved).
function compareFingerprint(started, store, ownedRecordId = null) {
  const now = fingerprint(store, ownedRecordId);
  const errors = [];
  const additions = { records: [], flags: [] };
  if (started.foundation !== now.foundation) errors.push('a foundation section changed during the batch');
  for (const [id, sha] of Object.entries(started.records)) {
    if (now.records[id] === undefined) errors.push(`record ${id} disappeared during the batch`);
    else if (now.records[id] !== sha) errors.push(`record ${id} changed during the batch (records are immutable)`);
  }
  for (const id of Object.keys(now.records)) if (started.records[id] === undefined) additions.records.push(id);
  const owned = ownedRecordId ? store.records.find((env) => env.id === ownedRecordId) : null;
  const allowedFlagEdits = new Set(owned?.record?.flagsResolved || []);
  for (const [id, sha] of Object.entries(started.flags)) {
    if (now.flags[id] === undefined) errors.push(`flag ${id} disappeared during the batch`);
    else if (now.flags[id] !== sha && !allowedFlagEdits.has(id)) errors.push(`flag ${id} changed during the batch and is not listed in the owned record's flagsResolved`);
  }
  for (const id of Object.keys(now.flags)) if (started.flags[id] === undefined) additions.flags.push(id);
  return { errors, additions };
}

// --- writes ----------------------------------------------------------------------------------------------------

function readRecordIndex() {
  if (!exists(PATHS.recordIndex)) throw new Error(`${PATHS.recordIndex} is missing; run node scripts/schema/build-aggregate.js`);
  return readJson(PATHS.recordIndex);
}

function findRecord(store, id) {
  return store.records.find((env) => env.id === id) || null;
}

// Record gate + append. `previous` is the record (or records) that must be DONE first; `body` is the record content.
function openRecord({ id, previous = [], workstream = workstreamFor(id), date, body, createdBy, script }) {
  const store = loadStore();
  const stale = checkFreshness(generate(store));
  if (stale.length) throw new Error(`Generated files are stale (${stale.join(', ')}); run node scripts/schema/build-aggregate.js before opening a record`);
  const index = readRecordIndex();
  if (index.records.some((entry) => entry.id === id) || findRecord(store, id)) throw new Error(`${id} already exists`);
  if (store.layout.order.includes(id)) throw new Error(`${id} is a foundation key`);
  for (const prev of Array.isArray(previous) ? previous : [previous]) {
    const entry = index.records.find((candidate) => candidate.id === prev);
    if (!entry) throw new Error(`Record gate failed: previous record ${prev} is not in the index`);
    if (!entry.status.startsWith('DONE')) throw new Error(`Record gate failed: ${prev} is not DONE (${entry.status.slice(0, 60)})`);
  }
  if (!DATE_RE.test(date || '')) throw new Error('date must be YYYY-MM-DD');
  const env = {
    format: RECORD_FORMAT, version: 1, id, sequence: index.counts.nextRecordSequence, date, workstream,
    created: { by: createdBy, at: new Date().toISOString(), script },
    record: body
  };
  const file = recordPath(env);
  if (exists(file)) throw new Error(`${file} already exists`);
  writeJson(file, env);
  writeGenerated();
  return file;
}

// Only an IN PROGRESS record may be rewritten; once DONE (or any other terminal status) the file is frozen.
function finalizeRecord(id, mutate) {
  const store = loadStore();
  const env = findRecord(store, id);
  if (!env) throw new Error(`${id} does not exist`);
  if (!isInProgress(env.record)) throw new Error(`${id} is not IN PROGRESS (${recordStatus(env.record).slice(0, 60)}); records are immutable once written`);
  const next = mutate(structuredClone(env.record), store) || env.record;
  const { file, recordSha256, fileSha256, ...clean } = env;
  clean.record = next;
  writeJson(file, clean);
  writeGenerated();
  return file;
}

function appendFlags(flags) {
  const store = loadStore();
  const index = buildRecordIndex(store);
  let sequence = index.flags.nextSequence;
  const ids = new Set(mergedFlags(store).map((flag) => flag.id));
  for (const flag of flags) {
    if (!flag.id) throw new Error('flag needs an id');
    if (ids.has(flag.id)) throw new Error(`flag ${flag.id} already exists`);
    ids.add(flag.id);
    const target = flagResolution(flag).resolved ? store.flags.resolved : store.flags.active;
    target.entries.push({ sequence: sequence++, flag });
  }
  writeJson(PATHS.flagsActive, store.flags.active);
  writeJson(PATHS.flagsResolved, store.flags.resolved);
  writeGenerated();
  return flags.map((flag) => flag.id);
}

// Mark a flag resolved by adding fields; the entry moves from active.json to resolved.json keeping its sequence.
function resolveFlag(id, fields) {
  const store = loadStore();
  const at = store.flags.active.entries.findIndex((entry) => entry.flag.id === id);
  if (at < 0) throw new Error(`active flag ${id} not found`);
  const entry = store.flags.active.entries[at];
  Object.assign(entry.flag, fields);
  if (!flagResolution(entry.flag).resolved) throw new Error(`fields ${Object.keys(fields).join(',')} do not mark ${id} resolved under the classifier`);
  store.flags.active.entries.splice(at, 1);
  store.flags.resolved.entries.push(entry);
  store.flags.resolved.entries.sort((a, b) => a.sequence - b.sequence);
  writeJson(PATHS.flagsActive, store.flags.active);
  writeJson(PATHS.flagsResolved, store.flags.resolved);
  writeGenerated();
}

function gitShow(ref, file) {
  try { return execFileSync('git', ['show', `${ref}:${file}`], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }); } catch { return null; }
}

module.exports = {
  ROOT, PATHS, RECORD_FORMAT, FLAGS_FORMAT, INDEX_FORMAT, STATE_FORMAT, FLAG_CLASSIFIER,
  abs, appendFlags, buildAggregate, buildCurrentState, buildRecordIndex, canonical, checkFreshness, compareFingerprint,
  contentSha, dateFor, exists, finalizeRecord, findRecord, fingerprint, flagResolution, generate, gitShow, isDone, isInProgress,
  loadStore, mergedFlags, openRecord, readJson, readRecordIndex, recordPath, recordStatus, resolveFlag, serializeAggregate,
  sha256, workstreamFor, writeGenerated, writeJson, writeText
};
