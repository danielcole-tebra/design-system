// Templated apply / checkpoint / close for batch records (record workflow_recordScripts_2026-09-12).
//
// Thin wrappers over openRecord and finalizeRecord in ./lib that carry what every batch script repeated by hand:
//   apply(spec)             opens the IN PROGRESS record once the body has the keys a batch record needs (status,
//                           date, workstream, risk with a quoted operator statement, scope, report, stop condition,
//                           next action) and no TODO placeholder
//   checkpoint(id, mutate)  rewrites an IN PROGRESS record that stays IN PROGRESS (mid-batch state, a stop)
//   close(id, mutate)       finalizes: the status must leave IN PROGRESS for a terminal one (DONE), outcome and
//                           validation must be present, the report must exist, and risk.tier may not change
//                           (rule 11: risk is planner/operator-owned)
//   preflight(options)      runs the validator, the ceilings and the self-tests so the close body cites measured evidence
//
// Every write measures the record file the store would produce against workflow/check-catalog.json →
// byteCeilings.record and refuses to write over it. The stop sits before the write, while the record can still be
// trimmed: a DONE record is immutable, so validate-ceilings.js can only report a breach there. As in
// validate-ceilings.js the ceiling applies to records dated on or after byteCeilings.record.appliesFrom.
//
// From a batch script (scripts/schema/new-record-scripts.js scaffolds the pair):
//   const { apply } = require('./scripts/schema/record-scripts');
//   apply({ id, previous, workstream, date, createdBy, body: { _status: 'IN PROGRESS — …', … } });
//   const { close, preflight } = require('./scripts/schema/record-scripts');
//   close(id, (record) => ({ ...record, _status: 'DONE — …', outcome, validation: preflight() }));
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const lib = require('./lib');

// The catalog and the evidence live in the repository even when TEBRA_STORE_ROOT points a self-test at a scratch store.
const REPO = path.resolve(__dirname, '..', '..');
const CATALOG = 'workflow/check-catalog.json';
const TIERS = ['low', 'medium', 'high', 'human-decision'];
const OPEN_KEYS = ['_status', 'date', 'workstream', 'risk', 'scope', 'report', 'stopCondition', 'nextAction'];
const CLOSE_KEYS = ['outcome', 'validation'];
const QUOTE_PATHS = ['risk.operatorQuote', 'risk.approval.quote', 'operatorContinuationQuote'];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const DEFAULT_SELF_TESTS = [
  'scripts/schema/self-test.js',
  'scripts/schema/record-scripts-self-test.js',
  'scripts/figma/helpers-self-test.js',
  'scripts/workflow/self-test.js',
  'scripts/workflow/runner-self-test.js',
  'scripts/workflow/execution-self-test.js',
  'scripts/workflow/runner-plugin-self-test.js',
  'scripts/workflow/target-identity-self-test.js'
];

class RecordCeilingError extends Error {}

function recordCeiling(override) {
  if (override) return { bytes: override.bytes, appliesFrom: override.appliesFrom || '0000-00-00', remedy: override.remedy || '' };
  const catalog = JSON.parse(fs.readFileSync(path.join(REPO, CATALOG), 'utf8'));
  const c = catalog.byteCeilings;
  if (!c || !c.record || !c.record.bytes) throw new Error(`${CATALOG} lacks byteCeilings.record`);
  return { bytes: c.record.bytes, appliesFrom: c.record.appliesFrom, remedy: c.remedy };
}

// The bytes the store writes: lib.writeJson serializes at indent 1 with a trailing newline.
const recordBytes = (envelope) => Buffer.byteLength(`${JSON.stringify(envelope, null, 1)}\n`);

// The hard stop. Throws before anything is written when the record dated on or after appliesFrom would exceed the ceiling.
function checkRecordCeiling({ id, date, envelope, stage, ceiling }) {
  const c = recordCeiling(ceiling);
  const bytes = recordBytes(envelope);
  const applies = String(date) >= c.appliesFrom;
  if (applies && bytes > c.bytes) {
    throw new RecordCeilingError(`Record ceiling: ${id} would be ${bytes} bytes at ${stage}, over the ceiling of ${c.bytes}; nothing was written. ${c.remedy}`.trim());
  }
  return { bytes, ceiling: c.bytes, applies, headroom: c.bytes - bytes };
}

const get = (object, dotted) => dotted.split('.').reduce((o, k) => (o == null ? undefined : o[k]), object);

function findPlaceholders(value, at = 'body', out = []) {
  if (typeof value === 'string') { if (/\bTODO\b/.test(value)) out.push(at); }
  else if (Array.isArray(value)) value.forEach((v, i) => findPlaceholders(v, `${at}[${i}]`, out));
  else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) findPlaceholders(v, `${at}.${k}`, out);
  return out;
}

const empty = (v) => v == null || v === '' || (Array.isArray(v) && v.length === 0);

function checkOpenBody(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return ['body must be an object'];
  const errors = [];
  const missing = OPEN_KEYS.filter((k) => empty(body[k]));
  if (missing.length) errors.push(`missing ${missing.join(', ')}`);
  if (!lib.isInProgress(body)) errors.push(`_status must start with "IN PROGRESS" (got ${JSON.stringify(lib.recordStatus(body).slice(0, 40))})`);
  if (body.date && !DATE_RE.test(String(body.date))) errors.push('date must be YYYY-MM-DD');
  if (body.risk && typeof body.risk === 'object') {
    if (!TIERS.includes(body.risk.tier)) errors.push(`risk.tier must be one of ${TIERS.join(', ')}`);
    const quoted = QUOTE_PATHS.some((p) => typeof get(body, p) === 'string' && get(body, p).trim());
    if (!quoted) errors.push(`no operator statement quoted verbatim at ${QUOTE_PATHS.join(' or ')} (rule 11)`);
  } else if (body.risk) errors.push('risk must be an object with a tier');
  const placeholders = findPlaceholders(body);
  if (placeholders.length) errors.push(`TODO placeholder left at ${placeholders.join(', ')}`);
  return errors;
}

function checkCloseBody(next, opened, { terminal, allowTierChange }) {
  const errors = [];
  const status = lib.recordStatus(next);
  if (lib.isInProgress(next) || !terminal.test(status)) errors.push(`final status must match ${terminal} (got ${JSON.stringify(status.slice(0, 40))}); use checkpoint() for a record that stays IN PROGRESS`);
  const missing = CLOSE_KEYS.filter((k) => empty(next[k]));
  if (missing.length) errors.push(`missing ${missing.join(', ')}`);
  const before = opened.risk && opened.risk.tier;
  const after = next.risk && next.risk.tier;
  if (!allowTierChange && before !== after) errors.push(`risk.tier changed from ${before} to ${after}; risk is planner/operator-owned (rule 11). Pass allowTierChange only with the operator's quoted decision in the record`);
  if (typeof next.report === 'string' && next.report && !fs.existsSync(path.join(REPO, next.report))) errors.push(`report ${next.report} does not exist; write the report before closing`);
  const placeholders = findPlaceholders(next);
  if (placeholders.length) errors.push(`TODO placeholder left at ${placeholders.join(', ')}`);
  return errors;
}

// The record path of the running script, for created.script.
function scriptName(explicit) {
  if (explicit) return explicit;
  const main = process.argv[1] ? path.relative(REPO, path.resolve(process.argv[1])) : '';
  return main && !main.startsWith('..') ? main.split(path.sep).join('/') : 'unknown';
}

// The envelope finalizeRecord would write for `record`: the stored envelope without the store's own fields.
function envelopeWith(store, id, record) {
  const env = lib.findRecord(store, id);
  if (!env) throw new Error(`${id} does not exist`);
  const { file, recordSha256, ...clean } = env;
  return { ...clean, record };
}

function apply({ id, previous = [], workstream, date, createdBy, script, body, ceiling }) {
  if (!id) throw new Error('apply: id is required');
  if (!createdBy) throw new Error('apply: createdBy names the executor (model and harness, or the person)');
  if (!DATE_RE.test(String(date || ''))) throw new Error('apply: date must be YYYY-MM-DD');
  const errors = checkOpenBody(body);
  if (errors.length) throw new Error(`apply ${id}: ${errors.join('; ')}`);
  const record = { ...body };
  for (const [k, v] of Object.entries({ figmaMutations: [], flagsAdded: [] })) if (record[k] === undefined) record[k] = v;
  const ws = workstream || lib.workstreamFor(id);
  const index = lib.readRecordIndex();
  const provisional = {
    format: lib.RECORD_FORMAT, version: 1, id, sequence: index.counts.nextRecordSequence, date, workstream: ws,
    created: { by: createdBy, at: new Date().toISOString(), script: scriptName(script) },
    record
  };
  const measured = checkRecordCeiling({ id, date, envelope: provisional, stage: 'apply', ceiling });
  const file = lib.openRecord({ id, previous, workstream: ws, date, createdBy, script: provisional.created.script, body: record });
  return { file, stage: 'apply', ...measured };
}

function checkpoint(id, mutate, { ceiling } = {}) {
  let measured;
  const file = lib.finalizeRecord(id, (record, store) => {
    const next = mutate(record, store) || record;
    if (!lib.isInProgress(next)) throw new Error(`checkpoint ${id}: status must stay IN PROGRESS (got ${JSON.stringify(lib.recordStatus(next).slice(0, 40))}); use close() to finalize`);
    const placeholders = findPlaceholders(next);
    if (placeholders.length) throw new Error(`checkpoint ${id}: TODO placeholder left at ${placeholders.join(', ')}`);
    const env = envelopeWith(store, id, next);
    measured = checkRecordCeiling({ id, date: env.date, envelope: env, stage: 'checkpoint', ceiling });
    return next;
  });
  return { file, stage: 'checkpoint', ...measured };
}

function close(id, mutate, { ceiling, allowTierChange = false, terminal = /^DONE/ } = {}) {
  let measured;
  const file = lib.finalizeRecord(id, (record, store) => {
    const next = mutate(record, store) || record;
    if (next.risk === undefined && record.risk !== undefined) next.risk = record.risk;
    const errors = checkCloseBody(next, record, { terminal, allowTierChange });
    if (errors.length) throw new Error(`close ${id}: ${errors.join('; ')}`);
    const env = envelopeWith(store, id, next);
    measured = checkRecordCeiling({ id, date: env.date, envelope: env, stage: 'close', ceiling });
    return next;
  });
  const entry = lib.readRecordIndex().records.find((r) => r.id === id);
  if (!entry || entry.status.startsWith('IN PROGRESS')) throw new Error(`close ${id}: index does not show a terminal status after finalize`);
  return { file, stage: 'close', status: entry.status, ...measured };
}

// Measured evidence for the close body: the validator line, the ceilings line and each self-test's exit.
function preflight({ selfTests = DEFAULT_SELF_TESTS, validator = true, ceilings = true } = {}) {
  const run = (script) => execFileSync(process.execPath, [script], { cwd: REPO, encoding: 'utf8' }).trim().split(/\r?\n/);
  const out = {};
  if (validator) out.workflowBeforeFinalize = run('scripts/workflow/validate-workflow.js').at(-1);
  if (ceilings) out.ceilingsBeforeFinalize = run('scripts/workflow/validate-ceilings.js')[0];
  out.selfTests = selfTests.map((script) => { run(script); return `${script}: exit 0`; });
  return out;
}

module.exports = {
  CLOSE_KEYS, DEFAULT_SELF_TESTS, OPEN_KEYS, QUOTE_PATHS, REPO, RecordCeilingError, TIERS,
  apply, checkCloseBody, checkOpenBody, checkRecordCeiling, checkpoint, close, envelopeWith, findPlaceholders,
  preflight, recordBytes, recordCeiling, scriptName
};
