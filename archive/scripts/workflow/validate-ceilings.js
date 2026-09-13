// Byte ceilings on the files a session reads at startup (record workflow_sessionEconomyC_2026-09-12).
// The ceilings live in workflow/check-catalog.json → byteCeilings so they are versioned with the other checks.
// Files and records are measured on disk; a manifest item is measured as its pretty-printed JSON (indent 2),
// the size a scoped projection returns. The lean set is sized at its worst case so the validator line shows
// what the largest possible lean start costs, not what one item happens to cost.
const fs = require('fs');
const path = require('path');
const { ROOT, readJson } = require('./lib');

const CATALOG = 'workflow/check-catalog.json';
const size = (file) => fs.statSync(path.resolve(ROOT, file)).size;
const itemBytes = (item) => Buffer.byteLength(JSON.stringify(item, null, 2));

function ceilings() {
  const c = readJson(CATALOG).byteCeilings;
  if (!c) throw new Error(`${CATALOG} lacks byteCeilings`);
  return c;
}

// Standing rule 16's lean set: CLAUDE.md, the generated contract, the selected manifest item,
// indexes/current-state.json and the last record it names. Sized with the largest item and the largest
// latest-record-per-workstream; the validator line itself is not counted.
function leanSet(manifest = readJson('workflow/manifest.json'), state = readJson('indexes/current-state.json')) {
  const items = manifest.items.map((item) => ({ id: item.id, bytes: itemBytes(item) })).sort((a, b) => b.bytes - a.bytes);
  const latest = Object.entries(state.byWorkstream)
    .map(([workstream, value]) => ({ workstream, id: value.latest.id, path: value.latest.path, bytes: size(value.latest.path) }))
    .sort((a, b) => b.bytes - a.bytes);
  const parts = {
    'CLAUDE.md': size('CLAUDE.md'),
    'workflow/npve-contract.generated.json': size('workflow/npve-contract.generated.json'),
    [`manifest item ${items[0].id}`]: items[0].bytes,
    'indexes/current-state.json': size('indexes/current-state.json'),
    [`record ${latest[0].id}`]: latest[0].bytes
  };
  return { parts, bytes: Object.values(parts).reduce((sum, bytes) => sum + bytes, 0), items, latest };
}

function validateCeilings({ manifest, recordIndex } = {}) {
  const c = ceilings();
  const errors = [];
  const doneOverCeiling = [];
  const over = (what, bytes, ceiling) => `${what}: ${bytes} bytes exceeds the ceiling of ${ceiling}`;
  for (const [file, ceiling] of Object.entries(c.files)) {
    const bytes = size(file);
    if (bytes > ceiling) errors.push(over(file, bytes, ceiling));
  }
  const lean = leanSet(manifest);
  for (const item of lean.items) if (item.bytes > c.manifestItem) errors.push(over(`manifest item ${item.id}`, item.bytes, c.manifestItem));
  // The lean set is a target, reported on the validator line: its largest component may be an immutable DONE
  // record, so a hard stop here could block every later session. The components above carry the hard stops.
  const leanOverTarget = lean.bytes > c.leanSet.target;
  // Records dated on or after the adoption date: an IN PROGRESS record can still be trimmed, so it fails;
  // a DONE record is immutable, so it is reported on the validator line and cited by the next record.
  const index = recordIndex || readJson('indexes/record-index.json');
  for (const entry of index.records) {
    if (entry.date < c.record.appliesFrom) continue;
    const bytes = size(entry.path);
    if (bytes <= c.record.bytes) continue;
    if (entry.status.startsWith('IN PROGRESS')) errors.push(over(`record ${entry.id} (IN PROGRESS)`, bytes, c.record.bytes));
    else doneOverCeiling.push({ id: entry.id, bytes });
  }
  if (errors.length) throw new Error(`Byte ceilings failed:\n- ${errors.join('\n- ')}\nRemedy: ${c.remedy}`);
  return { ceilings: c, lean, leanOverTarget, doneOverCeiling };
}

// The suffix the validator line carries: lean=<bytes>/<target>, then any reported breaches.
function summary(result) {
  const done = result.doneOverCeiling.length ? ` doneOverCeiling=${result.doneOverCeiling.map((r) => r.id).join(',')}` : '';
  return `lean=${result.lean.bytes}/${result.ceilings.leanSet.target}${result.leanOverTarget ? ' leanOverTarget' : ''}${done}`;
}

if (require.main === module) {
  const result = validateCeilings();
  console.log(`ceilings PASS ${summary(result)}`);
  for (const [part, bytes] of Object.entries(result.lean.parts)) console.log(`  ${String(bytes).padStart(7)} ${part}`);
}

module.exports = { ceilings, itemBytes, leanSet, summary, validateCeilings };
