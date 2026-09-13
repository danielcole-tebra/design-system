const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
// The register is the append-only store under records/, flags/, foundation/ (scripts/schema/lib.js).
// design-system-schema.json is generated from it; workflow scripts read records through the store.
const store = require('../schema/lib');

const ROOT = path.resolve(__dirname, '..', '..');

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.resolve(ROOT, file), 'utf8'));
}

function writeJson(file, value) {
  const target = path.resolve(ROOT, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`);
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  }
  return value;
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function fileDigest(file) {
  return sha256(fs.readFileSync(path.resolve(ROOT, file)));
}

function jsonDigest(value) {
  return sha256(JSON.stringify(stable(value)));
}

function withoutKey(value, key) {
  const copy = structuredClone(value);
  delete copy[key];
  return copy;
}

function manifestRiskPayload(item) {
  const { lock, ...riskWithoutLock } = item.risk || {};
  return {
    id: item.id,
    expectedRecordId: item.expectedRecordId,
    risk: riskWithoutLock,
    oversight: item.oversight,
    stopCondition: item.stopCondition,
    allowedFiles: item.allowedFiles,
    requiredEvidence: item.requiredEvidence
  };
}

function changedFiles() {
  const output = execFileSync('git', ['status', '--porcelain=v1', '-uall'], {
    cwd: ROOT,
    encoding: 'utf8'
  });
  return output.split(/\r?\n/).filter(Boolean).map((line) => {
    const raw = line.slice(3).trim();
    const renamed = raw.includes(' -> ') ? raw.split(' -> ').at(-1) : raw;
    return renamed.replace(/^"|"$/g, '').replaceAll('\\', '/');
  });
}

function globRegex(glob) {
  const escaped = glob.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^${escaped.replaceAll('**', '::DOUBLE::').replaceAll('*', '[^/]*').replaceAll('::DOUBLE::', '.*')}$`);
}

function matchesAny(file, globs) {
  return globs.some((glob) => globRegex(glob).test(file));
}

// Files every batch may touch because the store regenerates them at commit.
const GENERATED_FILES = ['design-system-schema.json', 'indexes/record-index.json', 'indexes/current-state.json', 'workflow/npve-contract.generated.json'];

// Read a batch record from the store (never from the aggregate). Returns { env, record } or null.
function readStoreRecord(id) {
  const loaded = store.loadStore();
  const env = store.findRecord(loaded, id);
  return env ? { store: loaded, env, record: env.record } : { store: loaded, env: null, record: null };
}

module.exports = {
  GENERATED_FILES,
  ROOT,
  changedFiles,
  fileDigest,
  jsonDigest,
  manifestRiskPayload,
  matchesAny,
  readJson,
  readStoreRecord,
  sha256,
  stable,
  store,
  withoutKey,
  writeJson
};
