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

figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('1396:6797'));
const ids=["1396:6845","1396:7930","1396:9019","1396:10107","1396:11196","1396:12288"];
const screens=await Promise.all(ids.map(id=>figma.getNodeByIdAsync(id)));
const chipIds=["1396:11180","1396:11186","1396:12269","1396:12275","1396:12279"];
const controls=await Promise.all(chipIds.map(id=>figma.getNodeByIdAsync(id)));
for(const id of ['1396:6802','1396:6809','1396:6820','1396:6831']){
 const m=await figma.getNodeByIdAsync(id);
 const selected=m.children.find(n=>n.type==='INSTANCE'&&n.componentProperties.State.value!=='Default')||m.children.find(n=>n.type==='INSTANCE');
 controls.push(selected);
}
const assertions=[{name:'Six requested screen states',actual:screens.length,expected:6}];
function effective(n){let p=n;while(p&&p.type!=='PAGE'){if(p.visible===false)return false;p=p.parent;}return true;}
for(const s of screens){
 assertions.push({name:s.name+' width',actual:s.width,expected:1493});
 const content=s.findAllWithCriteria({types:['FRAME']}).find(n=>n.name==='Shortcut study · note content');
 const fonts=[...new Set(content.findAllWithCriteria({types:['TEXT']}).filter(effective).flatMap(n=>n.getStyledTextSegments(['fontName']).map(t=>t.fontName.family)))];
 assertions.push({name:s.name+' authored content font',actual:fonts,expected:['Akkurat LL']});
 assertions.push({name:s.name+' insertion caret',actual:s.findAllWithCriteria({types:['RECTANGLE']}).filter(n=>n.name==='Insertion caret').length,expected:1});
 const menu=s.children.find(n=>n.type==='INSTANCE'&&n.name.startsWith('SCAFFOLDING · '));
 if(menu){const e=s.children.find(n=>n.name==='11/13 · Note editor viewport'),a=menu.absoluteBoundingBox,b=e.absoluteBoundingBox;
 assertions.push({name:s.name+' menu fits editor',actual:a.x>=b.x&&a.y>=b.y&&a.x+a.width<=b.x+b.width&&a.y+a.height<=b.y+b.height,expected:true});}
}
for(const [index,expected] of [[3,2],[4,3]]){
 const s=screens[index];const c=s.findAllWithCriteria({types:['FRAME']}).find(n=>n.name==='Shortcut study · note content');
 assertions.push({name:s.name+' chip count',actual:c.findAllWithCriteria({types:['INSTANCE']}).filter(n=>chipIds.includes(n.id)).length,expected});
}
return await auditEvidence(controls,assertions);
