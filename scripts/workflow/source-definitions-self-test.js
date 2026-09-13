// Self-test of the source-gate treatment for a read-only source set whose definitions Figma cannot read (record
// workflow_flowsheetsResume_2026-09-12): the shared checks, validate-execution's marked control, the runner's read
// program on an in-memory double whose set throws, the live readback comparison, and plan validation. No Figma call.
const assert = require('assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const sd = require('./source-definitions');
const { validateExecutionData } = require('./validate-execution');
const { program, validatePlan } = require('./runner/plugin');
const { verifyReadback } = require('./runner/core');

const EXACT = 'in get_componentPropertyDefinitions: Component set has existing errors';
const SOURCE = 'zVsuhYehoSLLq880qRBFkq';
const TARGET = 'fdCQVFdvOByaOYIJYag0d6';
let cases = 0;
const ok = (fn) => { fn(); cases++; };
const throws = (fn, pattern) => { assert.throws(fn, pattern); cases++; };
const clone = (v) => structuredClone(v);

// --- the unreadable record as the read program saves it ---------------------------------------------------------
const unreadable = {
  error: EXACT,
  set: { id: '129:6647', name: 'Sidesheetv3', type: 'COMPONENT_SET', parentId: '21:321', page: { id: '21:321', name: '⚙️ Components' }, width: 2400, height: 3200 },
  variants: [
    { id: '939:9228', name: 'Page=Clin_Flowsheets', variantProperties: { Page: 'Clin_Flowsheets' } },
    { id: '867:7460', name: 'Page=Clin_Flowsheets-AddNew', variantProperties: { Page: 'Clin_Flowsheets-AddNew' } },
    { id: '909:12649', name: 'Page=Clin_Flowsheets-Edit', variantProperties: { Page: 'Clin_Flowsheets-Edit' } }
  ]
};
const variantNode = { id: '939:9228', name: 'Page=Clin_Flowsheets', type: 'COMPONENT', parentId: '129:6647', key: 'k-list', width: 550, height: 360, variantProperties: { Page: 'Clin_Flowsheets' }, definitionsUnreadable: unreadable };
const setNode = { id: '129:6647', name: 'Sidesheetv3', type: 'COMPONENT_SET', parentId: '21:321', key: 'k-set', width: 2400, height: 3200, definitionsUnreadable: unreadable };

ok(() => assert.deepEqual(sd.unreadableErrors(unreadable), []));
const broken = (mutate, pattern) => { const u = clone(unreadable); mutate(u); const errors = sd.unreadableErrors(u); assert.ok(errors.some((e) => pattern.test(e)), `${pattern} in ${JSON.stringify(errors)}`); cases++; };
broken((u) => { u.error = ''; }, /exact Figma error must be quoted/);
broken((u) => { u.error = 'Network failure'; }, /componentPropertyDefinitions failure, not another error/);
broken((u) => { delete u.set; }, /set identity missing/);
broken((u) => { u.set.type = 'COMPONENT'; }, /set type must be COMPONENT_SET/);
broken((u) => { delete u.set.page; }, /set page/);
broken((u) => { delete u.set.parentId; }, /set parentId missing/);
broken((u) => { u.set.width = 'wide'; }, /set geometry/);
broken((u) => { u.variants = []; }, /every variant child/);
broken((u) => { delete u.variants[1].variantProperties; }, /variant 867:7460 lacks variantProperties/);
broken((u) => { u.variants.push(clone(u.variants[0])); }, /listed twice/);
ok(() => assert.deepEqual(sd.unreadableErrors(null), ['definitionsUnreadable: missing the unreadable-definitions record (exact error, set identity and geometry, variants)']));

ok(() => assert.equal(sd.matchVariant(unreadable, { Page: 'Clin_Flowsheets-Edit' }).variant.id, '909:12649'));
ok(() => assert.match(sd.matchVariant(unreadable, { Page: 'Nope' }).errors[0], /no variant of 129:6647 carries/));
ok(() => assert.match(sd.matchVariant(unreadable, {}).errors[0], /properties must name/));
ok(() => { const u = clone(unreadable); u.variants[1].variantProperties = { Page: 'Clin_Flowsheets' }; assert.match(sd.matchVariant(u, { Page: 'Clin_Flowsheets' }).errors[0], /2 variants .* the match must be unique/); });
ok(() => assert.ok(sd.sameProperties({ a: '1', b: '2' }, { b: '2', a: '1' }) && !sd.sameProperties({ a: '1' }, { a: '1', b: '2' })));

ok(() => assert.deepEqual(sd.unreadableNodeErrors(variantNode), []));
ok(() => assert.deepEqual(sd.unreadableNodeErrors(setNode), []));
ok(() => assert.match(sd.unreadableNodeErrors({ ...variantNode, definitions: {} })[0], /both definitions and definitionsUnreadable/));
ok(() => assert.match(sd.unreadableNodeErrors({ ...variantNode, componentPropertyDefinitions: {} })[0], /definitions are readable/));
ok(() => assert.match(sd.unreadableNodeErrors({ ...variantNode, parentId: '1:1' })[0], /must belong to the unreadable set/));
ok(() => assert.match(sd.unreadableNodeErrors({ ...variantNode, id: '9:9' })[0], /not among the set's read variants/));
ok(() => assert.match(sd.unreadableNodeErrors({ ...variantNode, variantProperties: { Page: 'Other' } })[0], /disagree with the set's variant list/));
ok(() => assert.match(sd.unreadableNodeErrors({ ...setNode, id: '1:1' })[0], /must be the unreadable set itself/));
ok(() => assert.match(sd.unreadableNodeErrors({ ...variantNode, type: 'FRAME' })[0], /only a COMPONENT variant or its COMPONENT_SET/));

// --- validate-execution: the marked control ---------------------------------------------------------------------
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'tebra-source-definitions-'));
try {
  fs.mkdirSync(path.join(root, 'batch'));
  fs.mkdirSync(path.join(root, 'flags'));
  const flags = (summary) => fs.writeFileSync(path.join(root, 'flags/active.json'), JSON.stringify({ format: 'tebra.design-flags', version: 1, status: 'active', entries: [{ sequence: 0, flag: { id: 'fixtureBlocker', severity: 'high', summary } }] }));
  flags('Read-only source Sidesheetv3 set 129:6647 rejects componentPropertyDefinitions');
  const snapshot = { components: [
    { id: 'lib-button', key: 'lib-key', name: 'Button', type: 'COMPONENT', parentId: '3:2', width: 100, height: 42, componentPropertyDefinitions: { size: { type: 'VARIANT', variantOptions: ['small', 'medium'] } } },
    clone(variantNode), clone(setNode)
  ] };
  fs.writeFileSync(path.join(root, 'batch/readback.json'), JSON.stringify(snapshot));
  const item = { id: 'flowsheets', expectedRecordId: 'record', source: { fileKey: SOURCE, nodeId: '939:9228', access: 'read-only' }, target: { fileKey: TARGET }, requiredEvidence: { report: 'batch/report.md', comparisonRender: 'batch/comparison.png' } };
  const marked = { name: 'Page=Clin_Flowsheets', component: '939:9228', fileKey: SOURCE, definitions: sd.MARKER, error: EXACT, flag: 'fixtureBlocker', properties: { Page: 'Clin_Flowsheets' }, evidence: 'batch/readback.json' };
  const library = { name: 'Button', component: 'lib-key', properties: { size: 'small' }, evidence: 'batch/readback.json' };
  const ready = {
    format: 'tebra.design-execution', version: 1, itemId: item.id, recordId: item.expectedRecordId,
    preflight: { targetFileKey: TARGET, identityEvidence: 'batch/readback.json', tools: ['fixture_tool'], toolEvidence: 'batch/readback.json', controls: [library, marked] },
    corrections: [], milestones: [{ name: 'Sheets', status: 'pending', nodeIds: [], render: null, inspected: false }], unresolved: [], nextAction: 'Assemble the sheets'
  };
  const accepts = (data) => { validateExecutionData(data, item, { root, stage: 'ready' }); cases++; };
  const rejects = (mutate, pattern, it = item) => { const data = clone(ready); mutate(data); assert.throws(() => validateExecutionData(data, it, { root, stage: 'ready' }), pattern); cases++; };
  accepts(ready);
  rejects((d) => { d.preflight.controls[1].fileKey = TARGET; }, /target file's components must read their definitions/);
  rejects((d) => { delete d.preflight.controls[1].fileKey; }, /read-only source zVsuhYehoSLLq880qRBFkq only/);
  rejects((d) => { d.preflight.controls[1].error = 'Component set has existing errors'; }, /must quote the exact Figma error/);
  rejects((d) => { d.preflight.controls[1].properties = { Page: 'Clin_Flowsheets-Edit' }; }, /match variant 909:12649, not the mapped 939:9228/);
  rejects((d) => { d.preflight.controls[1].properties = { Page: 'Missing' }; }, /no variant of 129:6647 carries/);
  rejects((d) => { d.preflight.controls[1].properties = {}; }, /properties must name the used variant/);
  rejects((d) => { delete d.preflight.controls[1].flag; }, /a flag naming the unreadable set is required/);
  rejects((d) => { d.preflight.controls[1].flag = 'noSuchFlag'; }, /not in the flag register/);
  rejects((d) => { d.preflight.controls[1].component = '129:6647'; d.preflight.controls[1].name = 'Sidesheetv3'; }, /map the variant the batch uses, not the set/);
  rejects((d) => { d.preflight.controls[1].component = 'nowhere'; }, /component identity absent/);
  rejects((d) => { delete d.preflight.controls[1].definitions; }, /identity\/definitions absent/); // an unmarked control is checked exactly as before
  rejects((d) => { d.preflight.controls[0].definitions = sd.MARKER; d.preflight.controls[0].fileKey = SOURCE; }, /definitions are readable/); // the marker never waives readable definitions
  rejects((d) => { d.preflight.controls[0].properties.size = 'large'; }, /unavailable variant/); // the library control is verified exactly as today
  rejects((d) => { d.preflight.controls[1].fileKey = 'other'; }, /needs a read-only source on the manifest item/, { ...item, source: undefined });
  flags('a flag about something else');
  rejects(() => {}, /does not name the set 129:6647/);
  flags('set 129:6647');
  const readable = clone(snapshot); readable.components[1].componentPropertyDefinitions = {};
  fs.writeFileSync(path.join(root, 'batch/readback.json'), JSON.stringify(readable));
  rejects(() => {}, /definitions are readable/);
  const noVariants = clone(snapshot); noVariants.components[1].definitionsUnreadable.variants = [];
  fs.writeFileSync(path.join(root, 'batch/readback.json'), JSON.stringify(noVariants));
  rejects(() => {}, /every variant child/);
  const noGeometry = clone(snapshot); delete noGeometry.components[1].width;
  fs.writeFileSync(path.join(root, 'batch/readback.json'), JSON.stringify(noGeometry));
  rejects(() => {}, /lacks geometry/);
} finally {
  const resolved = path.resolve(root);
  if (path.dirname(resolved) !== path.resolve(os.tmpdir()) || !path.basename(resolved).startsWith('tebra-source-definitions-')) throw new Error('Refusing cleanup outside this test directory');
  fs.rmSync(resolved, { recursive: true });
}

// --- the runner's read program on a double whose set throws ------------------------------------------------------
const all = new Map();
class Node {
  constructor(props) { Object.assign(this, { children: [], parent: null }, props); all.set(this.id, this); }
  appendChild(child) { child.parent = this; this.children.push(child); }
}
const throwing = (node, message) => Object.defineProperty(node, 'componentPropertyDefinitions', { get() { throw new Error(message); } });
const page = new Node({ id: '21:321', name: '⚙️ Components', type: 'PAGE' });
const set = new Node({ id: '129:6647', name: 'Sidesheetv3', type: 'COMPONENT_SET', key: 'k-set', width: 2400, height: 3200 });
throwing(set, EXACT);
page.appendChild(set);
const list = new Node({ id: '939:9228', name: 'Page=Clin_Flowsheets', type: 'COMPONENT', key: 'k-list', width: 550, height: 360, variantProperties: { Page: 'Clin_Flowsheets' } });
const add = new Node({ id: '867:7460', name: 'Page=Clin_Flowsheets-AddNew', type: 'COMPONENT', key: 'k-add', width: 550, height: 2404, variantProperties: { Page: 'Clin_Flowsheets-AddNew' } });
set.appendChild(list); set.appendChild(add);
const readableSet = new Node({ id: '5:1', name: 'Readable', type: 'COMPONENT_SET', key: 'k-readable', width: 10, height: 10, componentPropertyDefinitions: { State: { type: 'VARIANT', variantOptions: ['Default'] } } });
page.appendChild(readableSet);
const readableVariant = new Node({ id: '5:2', name: 'State=Default', type: 'COMPONENT', key: 'k-rv', width: 10, height: 10, variantProperties: { State: 'Default' } });
readableSet.appendChild(readableVariant);
const figma = { fileKey: SOURCE, root: { children: [page] }, getNodeByIdAsync: async (id) => all.get(id) };
const pages = ['21:321 ⚙️ Components'];

async function main() {
  const request = { kind: 'read', fileKey: SOURCE, nonce: 'n-1', pages, nodes: [{ id: '939:9228' }, { id: '129:6647' }, { id: '5:2' }] };
  const result = await program(figma, request);
  ok(() => {
    assert.equal(result.complete, true);
    const [variant, owner, readableOne] = result.nodes;
    assert.equal(variant.definitions, undefined);
    assert.equal(variant.definitionsUnreadable.error, EXACT);
    assert.deepEqual(variant.definitionsUnreadable.set, { id: '129:6647', name: 'Sidesheetv3', type: 'COMPONENT_SET', parentId: '21:321', page: { id: '21:321', name: '⚙️ Components' }, width: 2400, height: 3200 });
    assert.deepEqual(variant.definitionsUnreadable.variants.map((v) => v.id), ['939:9228', '867:7460']);
    assert.deepEqual(variant.variantProperties, { Page: 'Clin_Flowsheets' });
    assert.deepEqual(sd.unreadableNodeErrors(variant), []);
    assert.deepEqual(owner.definitionsUnreadable, variant.definitionsUnreadable);
    assert.deepEqual(sd.unreadableNodeErrors(owner), []);
    assert.deepEqual(readableOne.definitions, { State: { type: 'VARIANT', variantOptions: ['Default'] } }); // a readable set is read exactly as before
    assert.equal(readableOne.definitionsUnreadable, undefined);
  });
  // The plan's expected nodes are the saved readback; the live comparison is exact.
  const expected = { ...request, nodes: clone(result.nodes) };
  ok(() => verifyReadback(expected, result));
  const drifted = (mutate, pattern) => { const e = clone(expected); mutate(e.nodes[0]); assert.throws(() => verifyReadback(e, result), pattern); cases++; };
  drifted((n) => { n.definitionsUnreadable.error = 'in get_componentPropertyDefinitions: something else'; }, /Stale identity\/mapping 939:9228\.definitionsUnreadable/);
  drifted((n) => { n.definitionsUnreadable.variants.pop(); }, /Stale identity\/mapping 939:9228\.definitionsUnreadable/);
  drifted((n) => { n.variantProperties = { Page: 'Other' }; }, /Stale identity\/mapping 939:9228\.variantProperties/);
  // The same live read stops on a stale identity, as before.
  await assert.rejects(() => program(figma, { ...request, nodes: [{ id: '939:9228', name: 'renamed' }] }), /Stale identity\/mapping 939:9228\.name/); cases++;
  // A mutation never proceeds on an unreadable target set.
  const targetPage = new Node({ id: '3:2', name: 'Templates', type: 'PAGE' });
  const badTarget = new Node({ id: '7:1', name: 'Broken master', type: 'COMPONENT', key: 'k-broken', width: 550, height: 600 });
  throwing(badTarget, EXACT);
  targetPage.appendChild(badTarget);
  const targetFigma = { fileKey: TARGET, root: { children: [targetPage] }, getNodeByIdAsync: async (id) => all.get(id) };
  const mutation = { fileKey: TARGET, reads: [{ fileKey: TARGET, pages: ['3:2 Templates'], nodes: [{ id: '7:1' }] }], operation: { kind: 'preferred', master: '7:1', additions: {} } };
  await assert.rejects(() => program(targetFigma, mutation), /Definitions unreadable on 7:1 in the target file: in get_componentPropertyDefinitions/); cases++;

  // --- plan validation: a source read may carry the record; the target may not --------------------------------
  const definitions = { 'Body#1': { type: 'INSTANCE_SWAP', defaultValue: 'old', preferredValues: [] } };
  const targetNodes = [
    { id: 'master', key: 'master-key', name: 'Sidesheet', type: 'COMPONENT', parentId: '3:2', width: 550, height: 600, definitions },
    { id: 'body', key: 'body-key', name: 'Body', type: 'COMPONENT', parentId: '3:2', width: 518, height: 800, definitions: {} }
  ];
  const plan = {
    id: 'append-body', fileKey: TARGET, milestone: 'Comparisons', requiresVisual: [], appearanceEvidence: 'batch/appearance.md',
    reads: [{ fileKey: SOURCE, pages, nodes: [clone(result.nodes[0])] }, { fileKey: TARGET, pages: ['3:2 Templates'], nodes: targetNodes }],
    operation: { kind: 'preferred', master: 'master', additions: { 'Body#1': [{ id: 'body', key: 'body-key', type: 'COMPONENT' }] } }
  };
  ok(() => validatePlan(plan));
  const invalid = (mutate, pattern) => { const p = clone(plan); mutate(p); assert.throws(() => validatePlan(p), pattern); cases++; };
  invalid((p) => { p.reads[1].nodes[0] = { ...clone(result.nodes[0]), parentId: '3:2' }; }, /target file's components must read their definitions/);
  invalid((p) => { p.reads[0].nodes[0].definitions = {}; }, /carries both definitions and definitionsUnreadable/);
  invalid((p) => { delete p.reads[0].nodes[0].definitionsUnreadable; }, /exact key and owning-set definitions/);
  invalid((p) => { p.reads[0].nodes[0].definitionsUnreadable.variants = []; }, /every variant child/);
  invalid((p) => { delete p.reads[0].nodes[0].key; }, /Exact key required: 939:9228/);
  invalid((p) => { p.reads[0].nodes[0].variantProperties = { Page: 'Other' }; }, /disagree with the set's variant list/);
  console.log(`source-definitions self-test PASS ${cases} cases: shared checks, marked control in validate-execution (source only, exact error, matched variant, flag, library exactly as before), read program on a throwing set, exact live comparison, target refusal, plan validation; no live Figma calls`);
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
