// Read/copy only the function needed. No dependencies or automatic Figma writes.
// Figma: paste the selected function(s) into use_figma; do not require a local path.

function summarizeMatches(matches, limit = 5) {
  if (!Array.isArray(matches) || !Number.isInteger(limit) || limit < 1 || limit > 20) {
    throw new Error('Expected an asset array and limit 1..20');
  }
  // Caller adapts the current search response to {name, key, type, libraryKey}.
  // Never guess its schema or silently omit an asset with missing identity.
  const candidates = matches.map(asset => {
    if (!asset || typeof asset.name !== 'string' || !asset.name.trim() ||
        typeof asset.key !== 'string' || !asset.key.trim()) {
      throw new Error('Search adapter must supply each asset name and published key');
    }
    return Object.fromEntries(['name', 'key', 'type', 'libraryKey'].filter(
      field => asset[field] !== undefined
    ).map(field => [field, asset[field]]));
  });
  return { total: candidates.length, shown: Math.min(limit, candidates.length),
    omitted: Math.max(0, candidates.length - limit), candidates: candidates.slice(0, limit) };
}

async function importComponentsForBuild(api, manifest, build) {
  if (!Array.isArray(manifest) || typeof build !== 'function') {
    throw new Error('Expected manifest and same-call build callback');
  }
  const aliases = new Set();
  // Validate the whole manifest BEFORE any import, which is itself a write.
  for (const item of manifest) {
    if (!item || typeof item.alias !== 'string' || !item.alias.trim() ||
        typeof item.key !== 'string' || !item.key.trim() ||
        !['COMPONENT', 'COMPONENT_SET'].includes(item.type) || aliases.has(item.alias)) {
      throw new Error('Each import needs a unique alias, published key and valid type');
    }
    aliases.add(item.alias);
  }
  const assets = Object.create(null);
  const imported = new Map();
  for (const item of manifest) {
    const cacheKey = item.type + ':' + item.key;
    if (!imported.has(cacheKey)) {
      const node = item.type === 'COMPONENT'
        ? await api.importComponentByKeyAsync(item.key)
        : await api.importComponentSetByKeyAsync(item.key);
      if (!node || node.type !== item.type) throw new Error('Import returned wrong type: ' + item.alias);
      imported.set(cacheKey, node);
    }
    assets[item.alias] = imported.get(cacheKey);
  }
  // Objects stay in this call; no cross-call getNodeByIdAsync on imported IDs.
  // No automatic retry: imports/build may have partly mutated the canvas.
  return await build(assets);
}

function snapshotControl(node) {
  if (!node || typeof node.type !== 'string') throw new Error('Expected a live node');
  // Structural/token scope only. Copy, visibility, size, clipping and visual output
  // still require independent checks. Do not use this as an all-purpose PASS.
  const fields = ['layoutMode', 'paddingTop', 'paddingRight', 'paddingBottom',
    'paddingLeft', 'itemSpacing', 'counterAxisSpacing', 'primaryAxisAlignItems',
    'counterAxisAlignItems', 'fills', 'strokes', 'strokeWeight', 'strokeAlign',
    'cornerRadius', 'topLeftRadius', 'topRightRadius', 'bottomLeftRadius',
    'bottomRightRadius', 'boundVariables', 'fontName', 'fontSize', 'fontWeight',
    'lineHeight', 'letterSpacing', 'textStyleId', 'fillStyleId', 'strokeStyleId'];
  const values = {};
  for (const field of fields) {
    if (field in node) {
      const value = node[field]; // A failed getter must fail, never disappear.
      if (value !== undefined) values[field] = value;
    }
  }
  const snapshot = { type: node.type, name: node.name, values,
    children: 'children' in node ? node.children.map(snapshotControl) : [] };
  return JSON.parse(JSON.stringify(snapshot, (_key, value) =>
    typeof value === 'symbol' ? { mixedValue: true } : value));
}

function compareControlSnapshots(actual, expected, limit = 10) {
  if (!Number.isInteger(limit) || limit < 1 || limit > 100) throw new Error('Limit must be 1..100');
  function validate(node) {
    if (!node || typeof node.type !== 'string' || typeof node.name !== 'string' ||
        !node.values || typeof node.values !== 'object' || Array.isArray(node.values) ||
        !Array.isArray(node.children)) throw new Error('Incomplete control snapshot');
    node.children.forEach(validate);
  }
  validate(actual);
  validate(expected);
  if (actual.type !== 'INSTANCE' || expected.type !== 'COMPONENT') {
    throw new Error('Compare an INSTANCE with its actual main COMPONENT');
  }
  const differences = [];
  let count = 0;
  function record(path, left, right) {
    count++;
    if (differences.length < limit) differences.push({ path, actual: left, expected: right });
  }
  function walk(left, right, path) {
    if (path === '/type' || path === '/name') return; // Root identity only.
    if (Object.is(left, right)) return;
    if (Array.isArray(left) && Array.isArray(right)) {
      if (left.length !== right.length) record(path + '/length', left.length, right.length);
      for (let i = 0; i < Math.min(left.length, right.length); i++) walk(left[i], right[i], path + '/' + i);
    } else if (left && right && typeof left === 'object' && typeof right === 'object' &&
               !Array.isArray(left) && !Array.isArray(right)) {
      const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
      for (const key of keys) walk(left[key], right[key], path + '/' + key.replace(/~/g, '~0').replace(/\//g, '~1'));
    } else record(path, left, right);
  }
  walk(actual, expected, '');
  return { scope: 'structure-and-token-snapshot', passed: count === 0,
    differenceCount: count, differences, omitted: count - differences.length };
}

// Paste this function WITH snapshotControl and compareControlSnapshots into Figma.
// Full trees stay inside the call. This is structural/token evidence, not visual QA.
async function auditControls(instances) {
  if (!Array.isArray(instances) || instances.length < 1 || instances.length > 20) {
    throw new Error('Audit 1..20 explicit instances per call');
  }
  const checks = [], differences = [];
  const seen = new Set();
  const identity = value => {
    if (typeof value !== 'string' || !value || value.length > 128) throw new Error('Invalid node identity');
    return value;
  };
  const preview = value => {
    const text = JSON.stringify(value) ?? '[undefined]';
    return { text: text.slice(0, 160), truncated: text.length > 160 };
  };
  for (const instance of instances) {
    if (!instance || instance.type !== 'INSTANCE') throw new Error('Expected a live INSTANCE');
    const id = identity(instance.id);
    if (seen.has(id)) throw new Error('Duplicate audit instance');
    seen.add(id);
    const main = await instance.getMainComponentAsync();
    if (!main) throw new Error('Main component unavailable: ' + id);
    const mainId = identity(main.id);
    const result = compareControlSnapshots(snapshotControl(instance), snapshotControl(main), 5);
    checks.push({ id, mainId, passed: result.passed, differenceCount: result.differenceCount });
    for (const diff of result.differences) {
      if (differences.length === 5) break;
      differences.push({ id, path: diff.path.slice(0, 200), pathTruncated: diff.path.length > 200,
        actual: preview(diff.actual), expected: preview(diff.expected) });
    }
  }
  const differenceCount = checks.reduce((sum, check) => sum + check.differenceCount, 0);
  const output = { scope: 'structure-and-token-snapshot', checked: checks.length,
    passed: checks.every(check => check.passed), checks, differenceCount,
    differences, omittedDifferences: differenceCount - differences.length };
  // <=36KB UTF-8 even for non-ASCII text, below the observed 48KB tool limit.
  if (JSON.stringify(output).length > 12000) throw new Error('Narrow the audit scope before returning evidence');
  return output;
}

// Complete return envelope: pass measured assertions, never append full metadata.
async function auditEvidence(instances, assertions) {
  if (!Array.isArray(assertions) || assertions.length < 1 || assertions.length > 1000) throw new Error('Supply 1..1000 measured assertions');
  function stable(value) {
    if (value === null || typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
    if (typeof value === 'number' && Number.isFinite(value)) return JSON.stringify(value);
    if (Array.isArray(value)) return '[' + value.map(stable).join(',') + ']';
    if (value && Object.getPrototypeOf(value) === Object.prototype) return '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + stable(value[key])).join(',') + '}';
    throw new Error('Assertions must use finite JSON values');
  }
  const preview = value => {
    const text = value === undefined ? '[unavailable]' : stable(value);
    return { text: text.slice(0,160), truncated: text.length > 160 };
  };
  const checks = [], failures = [], names = new Set();
  for (const check of assertions) {
    if (typeof check?.name !== 'string' || !check.name || check.name.length > 160 || names.has(check.name) ||
        !Object.prototype.hasOwnProperty.call(check, 'actual') || !Object.prototype.hasOwnProperty.call(check, 'expected')) throw new Error('Each assertion needs a unique name, actual and expected');
    names.add(check.name);
    const expected = stable(check.expected);
    const passed = check.actual !== undefined && stable(check.actual) === expected;
    checks.push({ name: check.name, passed });
    if (!passed && failures.length < 5) failures.push({ name: check.name, actual: preview(check.actual), expected: preview(check.expected) });
  }
  const failed = checks.filter(check => !check.passed).length;
  const structure = await auditControls(instances);
  const checkPreview = checks.slice(0,30);
  const output = { scope: 'structure-and-measured-assertions; screenshots checked separately',
    passed: structure.passed && failed === 0, structure,
    assertions: { checked: checks.length, failed, checks: checkPreview, omittedChecks: checks.length - checkPreview.length, failures, omittedFailures: failed - failures.length } };
  // Compact automatically. Counts and overall failure cannot be lost to pruning.
  while (JSON.stringify(output).length > 12000) {
    if (checkPreview.length) { checkPreview.pop(); output.assertions.omittedChecks++; }
    else if (failures.length) { failures.pop(); output.assertions.omittedFailures++; }
    else if (structure.differences.length) { structure.differences.pop(); structure.omittedDifferences++; }
    else throw new Error('Identity-only audit exceeded envelope budget');
  }
  return output;
}

// Master definitions need no probe. If an actual instance is required, retain it.
function retainInspectionInstance(component, area) {
  if (component?.type !== 'COMPONENT' || !['FRAME','SECTION'].includes(area?.type) ||
      typeof area.name !== 'string' || !area.name.startsWith('Inspection · ')) throw new Error('Supply a component and named Inspection · RUN area');
  const instance = component.createInstance();
  area.appendChild(instance);
  return instance; // No remove(), even on later read failures.
}

if (typeof module !== 'undefined') {
  module.exports = { summarizeMatches, importComponentsForBuild, snapshotControl, compareControlSnapshots, auditControls, auditEvidence, retainInspectionInstance };
}
