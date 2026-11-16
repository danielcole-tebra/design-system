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




figma.skipInvisibleInstanceChildren=false;const f=(n,s)=>n.findOne(c=>c.name===s),assertions=[],a=(name,actual,expected)=>assertions.push({name,actual,expected}),states=[{"id":"160:43414","panel":"160:43487","name":"Rx · Edit unchanged"},{"id":"160:43764","panel":"160:43837","name":"Rx · Edit quantity 60 · Keep existing"},{"id":"160:44114","panel":"160:44187","name":"Rx · Edit quantity 60 · Request cancellation"},{"id":"160:44465","panel":"160:44538","name":"Chart-only · Edit details"},{"id":"160:44800","panel":"160:44873","name":"Rx · Review · Keep existing"},{"id":"160:44940","panel":"160:45013","name":"Rx · Review acknowledged · Keep existing"},{"id":"160:45083","panel":"160:45156","name":"Rx · Review · Request cancellation"},{"id":"160:45224","panel":"160:45297","name":"Rx · Review acknowledged · Request cancellation"},{"id":"160:45368","panel":"160:45441","name":"Rx · Prototype result · Keep original"},{"id":"160:45507","panel":"160:45580","name":"Rx · Prototype result · Cancellation pending"},{"id":"160:45646","panel":"160:45719","name":"Chart-only · Details example"},{"id":"160:45780","panel":"160:45853","name":"Chart-only · Saved example"}],details=[{"overlay":"160:41804","drawer":"160:41806"},{"overlay":"160:41965","drawer":"160:41967"},{"overlay":"160:42126","drawer":"160:42128"},{"overlay":"160:42287","drawer":"160:42289"},{"overlay":"160:42448","drawer":"160:42450"},{"overlay":"160:42609","drawer":"160:42611"},{"overlay":"160:42770","drawer":"160:42772"},{"overlay":"160:42931","drawer":"160:42933"},{"overlay":"160:43092","drawer":"160:43094"},{"overlay":"160:43253","drawer":"160:43255"}],controls=[];
for(const [i,s]of states.entries()){const p=await figma.getNodeByIdAsync(s.panel);a('Panel '+i+' size',[p.width,p.height],[550,1112]);a('Panel '+i+' footer',f(p,'Footer').y+f(p,'Footer').height,1112);a('Panel '+i+' scroll',f(p,'Body').overflowDirection,'VERTICAL');for(const n of p.findAll(n=>n.type==='FRAME'&&['Supply inputs','Clinical attestation','Keep existing medication','Request cancellation of existing prescription'].includes(n.name))){a('Nonzero '+n.id,n.height>=40,true);a('Width '+n.id,n.width,518);} }
const e=await figma.getNodeByIdAsync(states[1].panel),r=await figma.getNodeByIdAsync(states[5].panel),u=await figma.getNodeByIdAsync(states[0].panel),ru=await figma.getNodeByIdAsync(states[4].panel),ce=await figma.getNodeByIdAsync(states[3].panel);
controls.push(f(e,'Quantity'),f(e,'Pharmacy'),f(e,'Patient instructions'),f(e,'Prescription change guidance'),f(e,'Keep existing medication').findOne(n=>n.type==='INSTANCE'),f(e,'Request cancellation of existing prescription').findOne(n=>n.type==='INSTANCE'),f(e,'Review new prescription'),f(u,'Review new prescription'),f(r,'Sign new prescription'),f(ru,'Sign new prescription'),f(r,'Clinical attestation').findOne(n=>n.type==='INSTANCE'),f(ru,'Clinical attestation').findOne(n=>n.type==='INSTANCE'),f(ce,'Save chart details'),f(e,'Cancel'));
a('Unchanged Review disabled',f(u,'Review new prescription').componentProperties.State.value,'Disabled');a('Unacknowledged Sign disabled',f(ru,'Sign new prescription').componentProperties.State.value,'Disabled');a('Acknowledged Sign enabled',f(r,'Sign new prescription').componentProperties.State.value,'Default');a('Chart refills 4',f(ce,'Refills').componentProperties['Value text#123:11'].value,'4');
const oldIds=['150:20873','150:20946','150:21019','150:21092','150:21165','150:21238','150:21311','150:21384','150:21457','150:21530'];
for(let i=0;i<details.length;i++){const n=await figma.getNodeByIdAsync(details[i].drawer),old=await figma.getNodeByIdAsync(oldIds[i]);const props=Object.fromEntries(Object.entries(n.componentProperties).map(([k,v])=>[k.split('#')[0],v.value]));for(const[k,v]of Object.entries(old.componentProperties))a('Content '+i+' '+k,props[k.split('#')[0]],v.value);a('Days supply label '+i,n.findAll(n=>n.type==='TEXT'&&n.characters==='Days supply').length,1);a('Details '+i+' size',[n.width,n.height],[550,1112]);}
for(const id of ['150:21601','150:26805','150:32015']){const screen=await figma.getNodeByIdAsync(id),rows=f(screen,'Medication table').children.filter(n=>n.visible&&n.type==='INSTANCE');for(let i=0;i<rows.length;i++)a('Open '+id+' '+i,f(rows[i],'Open medication').reactions[0].actions[0].destinationId,details[i].overlay);}
const roots=await Promise.all([...states.map(s=>s.id),...details.map(s=>s.overlay),...["160:45924","160:46017","160:46110"]].map(id=>figma.getNodeByIdAsync(id)));let wiring=0;for(const root of roots)for(const n of root.findAll(n=>n.reactions?.length)){let vis=true;for(let p=n;p&&p!==root;p=p.parent)if(!p.visible)vis=false;if(!vis)continue;for(const reaction of n.reactions)for(const action of reaction.actions||[]){if(action.destinationId){a('Destination '+n.id+' '+wiring,!!await figma.getNodeByIdAsync(action.destinationId),true);wiring++;}}}
return {audit:await auditEvidence(controls,assertions),wiring,verifiedAt:new Date().toISOString()};
