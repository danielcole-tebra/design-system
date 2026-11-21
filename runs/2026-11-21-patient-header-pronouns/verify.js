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
function visible(n){for(let p=n;p&&p.type!=="PAGE";p=p.parent){if("visible"in p&&!p.visible)return false;}return true;}
const cases=[{"id":"2:95","width":1184,"show":true},{"id":"2:110","width":1184,"show":true},{"id":"2:125","width":1184,"show":true},{"id":"2:140","width":1184,"show":true},{"id":"2:155","width":1184,"show":true},{"id":"2:172","width":1184,"show":true},{"id":"8:128","width":1184,"show":true},{"id":"11:177","width":1184,"show":true},{"id":"2:194","width":900,"show":true},{"id":"2:207","width":900,"show":true},{"id":"6:112","width":900,"show":true},{"id":"8:146","width":900,"show":true},{"id":"11:192","width":900,"show":true},{"id":"11:206","width":900,"show":true},{"id":"11:220","width":900,"show":true},{"id":"11:234","width":900,"show":true},{"id":"15:238","width":900,"show":false},{"id":"15:254","width":900,"show":false},{"id":"15:272","width":900,"show":false},{"id":"15:292","width":900,"show":false}];
const a=[];
for(const{id,width,show}of cases){
const n=await figma.getNodeByIdAsync(id),texts=n.query("TEXT").filter(visible),root=n.absoluteBoundingBox;
const pronouns=texts.filter(t=>t.name==="Pronouns").map(t=>({text:t.characters,y:t.absoluteBoundingBox.y}));
const demo=texts.filter(t=>t.name==="Demographics").map(t=>({text:t.characters,y:t.absoluteBoundingBox.y}));
const identity=n.query("FRAME").filter(f=>f.name==="Identity").map(f=>f.absoluteBoundingBox);
const lower=n.query("FRAME").filter(f=>f.name==="Demographics and pronouns").map(f=>f.absoluteBoundingBox);
a.push({name:id+" size",actual:[n.width,n.height],expected:[width,72]},
{name:id+" pronouns lower baseline",actual:pronouns,expected:show?[{text:"(she/her)",y:demo[0].y}]:[]},
{name:id+" optional separator",actual:texts.filter(t=>t.name==="Pronoun separator").map(t=>t.characters),expected:show?["•"]:[]},
{name:id+" lower row fits identity",actual:lower.every(r=>r.x>=identity[0].x-.5&&r.x+r.width<=identity[0].x+identity[0].width+.5),expected:true},
{name:id+" top row has only patient name",actual:n.query("FRAME").filter(f=>f.name==="Patient name row").map(f=>f.children.map(t=>t.name)),expected:[["Patient name"]]},
{name:id+" content fits header",actual:texts.filter(t=>{const b=t.absoluteBoundingBox;return b.x<root.x-.5||b.y<root.y-.5||b.x+b.width>root.x+root.width+.5||b.y+b.height>root.y+root.height+.5;}).map(t=>t.id),expected:[]},
{name:id+" demography preserved",actual:demo.map(x=>x.text),expected:["Female  •  26 Aug 2002 (23 y/o)  •  (555) 555-2025  •  MRN: 08262025-01"]},
{name:id+" font",actual:[...new Set(texts.map(t=>t.fontName.family))],expected:["Akkurat LL"]});
}
for(const id of ["2:50","2:63","2:78","11:168"]){
const n=await figma.getNodeByIdAsync(id);
a.push({name:id+" preserved controls",actual:n.componentPropertyReferences,expected:{characters:"Pronouns#2:4",visible:"Show pronouns#2:8"}});
}
await (await figma.getNodeByIdAsync("2:88")).screenshot({scale:1});
await (await figma.getNodeByIdAsync("2:192")).screenshot({scale:1});
await (await figma.getNodeByIdAsync("15:236")).screenshot({scale:1});
await (await figma.getNodeByIdAsync("11:177")).screenshot({scale:1});
return await auditEvidence([await figma.getNodeByIdAsync("2:86")],a);
