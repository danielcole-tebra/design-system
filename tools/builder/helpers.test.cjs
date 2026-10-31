const test = require('node:test');
const assert = require('node:assert/strict');
const { summarizeMatches, importComponentsForBuild, snapshotControl, compareControlSnapshots, auditControls, auditEvidence, retainInspectionInstance } = require('./helpers.cjs');

const master = () => ({ type: 'COMPONENT', name: 'Library row', layoutMode: 'VERTICAL',
  paddingLeft: 16, itemSpacing: 8, fills: [], boundVariables: { paddingLeft: { id: 'space16' } },
  children: [{ type: 'TEXT', name: 'Label', characters: 'Placeholder', visible: true,
    fontName: { family: 'Akkurat LL', style: 'Regular' }, fontSize: 16,
    fills: [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }],
    boundVariables: { fontSize: { id: 'body1' } } }] });
const instance = () => ({ ...structuredClone(master()), type: 'INSTANCE', name: 'Morgan Lee', width: 518 });

test('bounded search retains keys and discloses omissions, including empty results', () => {
  const assets = Array.from({ length: 12 }, (_, i) => ({ name: 'Row ' + i, key: 'key' + i,
    libraryKey: 'library', hugeDescription: 'x'.repeat(10000) }));
  const summary = summarizeMatches(assets, 3);
  assert.equal(summary.omitted, 9);
  assert.equal(summary.candidates[2].key, 'key2');
  assert.ok(JSON.stringify(summary).length < 500);
  assert.equal(summarizeMatches([]).total, 0);
  assert.throws(() => summarizeMatches([{ name: 'Missing key' }]));
  assert.throws(() => summarizeMatches(assets, 0));
});

test('imports objects and uses them in the same callback; deduplicates only within that call', async () => {
  let imports = 0;
  const api = { importComponentByKeyAsync: async key => ({ type: 'COMPONENT', key, serial: ++imports }),
    importComponentSetByKeyAsync: async key => ({ type: 'COMPONENT_SET', key, serial: ++imports }),
    getNodeByIdAsync: () => { throw new Error('Cross-call lookup must not be used'); } };
  const manifest = [{ alias: 'field', key: 'field-key', type: 'COMPONENT' },
    { alias: 'anotherField', key: 'field-key', type: 'COMPONENT' },
    { alias: 'rows', key: 'row-set-key', type: 'COMPONENT_SET' }];
  await importComponentsForBuild(api, manifest, async assets => {
    assert.equal(assets.field, assets.anotherField);
    assert.equal(assets.rows.type, 'COMPONENT_SET');
    assert.equal(imports, 2);
  });
  await importComponentsForBuild(api, manifest, () => {});
  assert.equal(imports, 4); // A new call never trusts last call's imports.
});

test('invalid manifest fails before mutation and failed imports are never blindly retried', async () => {
  let imports = 0;
  const api = { importComponentByKeyAsync: async () => { imports++; throw new Error('partial failure'); } };
  await assert.rejects(importComponentsForBuild(api, [
    { alias: 'a', key: 'key', type: 'COMPONENT' }, { alias: 'a', key: 'key2', type: 'COMPONENT' }
  ], () => {}));
  assert.equal(imports, 0);
  await assert.rejects(importComponentsForBuild(api, [{ alias: 'a', key: 'key', type: 'COMPONENT' }], () => {}), /partial failure/);
  assert.equal(imports, 1);
});

test('expected root identity difference passes without mutating source snapshots', () => {
  const actual = snapshotControl(instance());
  const expected = snapshotControl(master());
  const before = JSON.stringify([actual, expected]);
  assert.equal(compareControlSnapshots(actual, expected).passed, true);
  assert.equal(JSON.stringify([actual, expected]), before);
});

test('padding, token, nested type/name and missing child regressions still fail', () => {
  for (const change of [
    n => { n.paddingLeft = 8; },
    n => { n.children[0].boundVariables.fontSize.id = 'wrong-token'; },
    n => { n.children[0].type = 'FRAME'; },
    n => { n.children[0].name = 'Wrong label'; },
    n => { n.children = []; }
  ]) {
    const actual = instance(); change(actual);
    assert.equal(compareControlSnapshots(snapshotControl(actual), snapshotControl(master())).passed, false);
  }
});

test('difference output is bounded but total remains complete', () => {
  const actual = instance(); actual.paddingLeft = 9; actual.itemSpacing = 3;
  actual.children[0].fontSize = 14;
  const result = compareControlSnapshots(snapshotControl(actual), snapshotControl(master()), 1);
  assert.equal(result.differences.length, 1);
  assert.equal(result.differenceCount, 3);
  assert.equal(result.omitted, 2);
});

test('unknown snapshots, detached roots and unreadable fields cannot produce a pass', () => {
  assert.throws(() => compareControlSnapshots({}, {}));
  const detached = instance(); detached.type = 'FRAME';
  assert.throws(() => compareControlSnapshots(snapshotControl(detached), snapshotControl(master())));
  assert.throws(() => snapshotControl({ type: 'TEXT', get fontName() { throw new Error('unsupported'); } }), /unsupported/);
});

test('mixed values survive serialization; content/visibility remain separate checks', () => {
  const actual = instance(); actual.children[0].characters = 'Morgan'; actual.children[0].visible = false;
  assert.equal(compareControlSnapshots(snapshotControl(actual), snapshotControl(master())).passed, true);
  actual.children[0].fontSize = Symbol('mixed');
  assert.deepEqual(snapshotControl(actual).children[0].values.fontSize, { mixedValue: true });
});

test('live audit keeps large trees inside the call and bounds failure details without losing counts', async () => {
  const controls = Array.from({ length: 5 }, (_, i) => {
    const source = master(); source.id = 'main' + i;
    source.children = Array.from({ length: 100 }, () => structuredClone(source.children[0]));
    const actual = structuredClone(source); actual.type = 'INSTANCE'; actual.id = 'instance' + i;
    actual.children.forEach(child => { child.fontSize = 15; });
    actual.getMainComponentAsync = async () => source;
    return actual;
  });
  const result = await auditControls(controls);
  assert.equal(result.checked, 5);
  assert.equal(result.passed, false);
  assert.equal(result.differenceCount, 500);
  assert.equal(result.differences.length, 5);
  assert.equal(result.omittedDifferences, 495);
  assert.ok(Buffer.byteLength(JSON.stringify(result), 'utf8') < 4000);
  assert.equal('children' in result, false);
});

test('audit passes valid controls, never empty, unavailable or duplicate evidence', async () => {
  const source = { ...master(), id: 'master' };
  const control = { ...instance(), id: 'control', getMainComponentAsync: async () => source };
  assert.equal((await auditControls([control])).passed, true);
  await assert.rejects(auditControls([]));
  await assert.rejects(auditControls([control, control]), /Duplicate/);
  await assert.rejects(auditControls([{ ...control, getMainComponentAsync: async () => null }]), /unavailable/);
});

test('complete audit compacts huge measurements automatically while preserving every failure count', async () => {
  const source = { ...master(), id: 'master' };
  const control = { ...instance(), id: 'control', getMainComponentAsync: async () => source };
  const checks = Array.from({ length: 1000 }, (_, i) => ({ name: 'Measured property ' + i + 'x'.repeat(100),
    actual: 'a'.repeat(30000), expected: 'b'.repeat(30000) }));
  const result = await auditEvidence([control], checks);
  assert.equal(result.passed, false);
  assert.equal(result.assertions.checked, 1000);
  assert.equal(result.assertions.failed, 1000);
  assert.equal(result.assertions.omittedFailures + result.assertions.failures.length, 1000);
  assert.equal(result.assertions.omittedChecks + result.assertions.checks.length, 1000);
  assert.ok(JSON.stringify(result).length <= 12000);
  assert.ok(result.assertions.failures[0].actual.truncated);
});

test('audit assertions compare actual values, reject invalid expectations and never treat unavailable values as passing', async () => {
  const source = { ...master(), id: 'master' };
  const control = { ...instance(), id: 'control', getMainComponentAsync: async () => source };
  assert.equal((await auditEvidence([control], [{ name: 'binding', actual: { a: 1, b: 2 }, expected: { b: 2, a: 1 } }])).passed, true);
  assert.equal((await auditEvidence([control], [{ name: 'width', actual: undefined, expected: 550 }])).passed, false);
  await assert.rejects(auditEvidence([control], [{ name: 'unknown', actual: undefined, expected: undefined }]));
  await assert.rejects(auditEvidence([control], []));
});

test('inspection instance is retained in a named area, with invalid destinations rejected before creation', () => {
  let created = 0;
  const instance = { id: 'probe', remove() { throw new Error('Deletion prohibited'); } };
  const component = { type: 'COMPONENT', createInstance() { created++; return instance; } };
  assert.throws(() => retainInspectionInstance(component, { type: 'FRAME', name: 'Scratch' }));
  assert.equal(created, 0);
  const children = [], area = { type: 'SECTION', name: 'Inspection · fixture', appendChild(node) { children.push(node); } };
  assert.equal(retainInspectionInstance(component, area), instance);
  assert.deepEqual(children, [instance]);
  assert.equal(created, 1);
});
