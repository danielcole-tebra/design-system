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
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("0:1"));
const ids=["285:436","285:476"], tokens={"space":"VariableID:6016592c19254dd61e9de9e006459546eaece0bb/997:24","paper":"VariableID:f1e85cc976b10ea275c03f5d7f21a0dc12cdfee0/74:146","primary":"VariableID:5c8867e0b6f174db9f69096580158df26e39baae/74:135","secondary":"VariableID:0d503f1eb6c6f3e923310b2ad6e621cc940b6543/74:139"}, styles={"h4":"S:888b271ed38cdcfb86c35f9de8bff5ac9b81e8e3,116:51","body1":"S:c87aec6a94a2e25a8a25446f8d61716cb25abe73,116:83","body2":"S:cdb9fe68e6b5274b6e42be16d13bb3fb7834dccb,116:94"};
const panels=await Promise.all(ids.map(id=>figma.getNodeByIdAsync(id)));
const assertions=[]; const add=(name,actual,expected)=>assertions.push({name,actual,expected});
function visible(n){for(let p=n;p&&p.type!=="PAGE";p=p.parent)if(p.visible===false)return false;return true;}
function clipped(n){const b=n.absoluteBoundingBox;if(!b)return false;for(let p=n.parent;p&&p.type!=="PAGE";p=p.parent){if("clipsContent" in p&&p.clipsContent){const a=p.absoluteBoundingBox;if(a&&(b.x<a.x-.1||b.y<a.y-.1||b.x+b.width>a.x+a.width+.1||b.y+b.height>a.y+a.height+.1))return true;}}return false;}
const controls=[];
for(let i=0;i<panels.length;i++){
const p=panels[i], prefix=i===0?"Results":"Empty";const nodes=p.findAll(()=>true);
add(prefix+" width",p.width,550);add(prefix+" content-height",p.layoutSizingVertical,"HUG");
add(prefix+" height",p.height,i===0?309:188);
add(prefix+" state",p.componentProperties.State.value,prefix);
add(prefix+" padding",[p.paddingTop,p.paddingRight,p.paddingBottom,p.paddingLeft],[16,16,16,16]);
add(prefix+" gap",p.itemSpacing,16);
add(prefix+" spacing bindings",["paddingTop","paddingRight","paddingBottom","paddingLeft","itemSpacing"].map(k=>p.boundVariables[k]?.id??null),Array(5).fill(tokens.space));
add(prefix+" paper binding",p.fills[0].boundVariables.color.id,tokens.paper);
const texts=nodes.filter(n=>n.type==="TEXT"&&visible(n)&&n.fills.some(f=>f.visible!==false&&(f.opacity===undefined||f.opacity>0)));
const expected=i===0?["Find a patient","Search patients","Morgan","2 patients found","Morgan Lee","Patient ID: 10482","Morgan Patel","Patient ID: 10517"]:["Find a patient","Search patients","ZZZ","No patients found","Try a different name or patient ID."];
add(prefix+" visible copy",texts.map(n=>n.characters).sort(),expected.sort());
add(prefix+" fonts",[...new Set(texts.map(n=>n.fontName.family))],["Akkurat LL"]);
add(prefix+" clipped visible text",texts.filter(clipped).map(n=>n.characters),[]);
add(prefix+" reactions",nodes.reduce((s,n)=>s+("reactions" in n?n.reactions.length:0),0),0);
add(prefix+" image fills",nodes.filter(n=>"fills" in n&&Array.isArray(n.fills)&&n.fills.some(f=>f.type==="IMAGE")).length,0);
add(prefix+" editable text count",texts.length,expected.length);
const heading=texts.find(t=>t.characters==="Find a patient");add(prefix+" heading style",heading.textStyleId,styles.h4);
for(const t of texts.filter(t=>["2 patients found","Try a different name or patient ID.","No patients found"].includes(t.characters))){
add(prefix+" "+t.characters+" style",t.textStyleId,t.characters==="No patients found"?styles.body1:styles.body2);
add(prefix+" "+t.characters+" fill",t.fills[0].boundVariables.color.id,t.characters==="No patients found"?tokens.primary:tokens.secondary);}
const field=nodes.find(n=>n.type==="INSTANCE"&&n.name==="Text field");controls.push(field);
add(prefix+" field width",field.width,518);add(prefix+" field height",field.height,40);
add(prefix+" field axes",["size","State","Value","Fill"].map(k=>field.componentProperties[k].value),["small","Default","Filled","None"]);
add(prefix+" field flags",["Show helper#123:33","required#123:44","select#123:55","multiline#123:66"].map(k=>field.componentProperties[k].value),[false,false,false,false]);
const rows=nodes.filter(n=>n.type==="INSTANCE"&&n.name==="List/Item");
add(prefix+" row count",rows.length,i===0?2:0);
for(let j=0;j<rows.length;j++){const r=rows[j];controls.push(r);add(prefix+" row "+j+" width",r.width,518);add(prefix+" row "+j+" axes",[r.componentProperties.Lines.value,r.componentProperties.State.value,r.componentProperties["Show icon#174:9"].value],["Two","Default",false]);}
const dividers=nodes.filter(n=>n.type==="INSTANCE"&&n.name==="Divider");controls.push(...dividers);add(prefix+" dividers",dividers.length,i===0?1:0);
for(const d of dividers)add(prefix+" divider width",d.width,518);
}
const family=await figma.getNodeByIdAsync("285:370");
add("Family states",family.children.map(n=>n.name).sort(),["State=Empty","State=Results"]);
const review=await figma.getNodeByIdAsync("285:435");
add("Review horizontal",review.layoutMode,"HORIZONTAL");add("Review state instances",review.children.map(n=>n.type),["INSTANCE","INSTANCE"]);
add("Review widths",review.children.map(n=>n.width),[550,550]);
return await auditEvidence(controls,assertions);

