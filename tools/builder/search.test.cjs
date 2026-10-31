const test = require('node:test');
const assert = require('node:assert/strict');
const { createSearchRunner } = require('./search.cjs');
const { execFileSync } = require('node:child_process');
const vm = require('node:vm');
const path = require('node:path');

function fixture(raw) {
  const cache = new Map(); let calls = 0;
  return { cache, calls: () => calls,
    runner: createSearchRunner(async () => { calls++; return raw; }, (key, value) => cache.set(key, value), key => cache.get(key)) };
}
const component = i => ({ name: 'Field ' + i, assetType: 'component_set', componentSetKey: 'published-' + i,
  libraryKey: 'library', description: 'unused'.repeat(20000) });

test('search retains full result, emits bounded keys, pages and selects without new tool calls', async () => {
  const payload = { results: [{ entity: 'component', query: 'Text field', components: Array.from({ length: 12 }, (_, i) => component(i)) }] };
  const raw = { content: [{ type: 'text', text: JSON.stringify(payload) }] };
  const { runner, cache, calls } = fixture(raw);
  const output = await runner.search({ fileKey: 'file', queries: [{ entity: 'component', query: 'Text field' }] }, 'assets');
  assert.equal(output.status, 'ok'); assert.equal(output.results[0].shown, 5); assert.equal(output.results[0].omitted, 7);
  assert.ok(JSON.stringify(output).length < 1500);
  assert.equal(cache.get('assets').raw, raw);
  assert.equal(runner.page('assets', { queryIndex: 0, offset: 5 }).results[0].candidates[0].key, 'published-5');
  assert.equal(runner.select('assets', 0, 11).key, 'published-11');
  assert.equal(calls(), 1);
  await assert.rejects(runner.search({ fileKey: 'file', queries: [] }, 'assets'));
});

test('wrapper maps observed standalone component, variable and style key fields; empty results stay explicit', async () => {
  const payload = { results: [
    { entity: 'component', query: 'Divider', components: [{ name: 'Divider', assetType: 'component', componentKey: 'component-key', libraryKey: 'library' }] },
    { entity: 'variable', query: 'paper', variables: [{ name: 'paper', key: 'variable-key', libraryKey: 'library' }] },
    { entity: 'style', query: 'h4', styles: [{ name: 'h4', key: 'style-key', libraryKey: 'library' }] },
    { entity: 'style', query: 'missing', styles: [] }
  ] };
  const { runner } = fixture({ structuredContent: payload });
  const output = await runner.search({ fileKey: 'file', queries: payload.results.map(({ entity, query }) => ({ entity, query })) }, 'mixed');
  assert.deepEqual(output.results.slice(0,3).map(g => g.candidates[0].key), ['component-key','variable-key','style-key']);
  assert.equal(output.results[3].total, 0);
});

test('unknown/error schemas retain raw data and do not claim no matches', async () => {
  for (const raw of [{ isError: true, content: [] }, { content: [{ type: 'text', text: 'not JSON' }] },
    { results: [{ entity: 'component', query: 'Field', unexpectedAssets: [] }] }]) {
    const { runner, cache } = fixture(raw);
    const result = await runner.search({ fileKey: 'file', queries: [{ entity: 'component', query: 'Field' }] }, 'unknown');
    assert.equal(result.status, 'needs-inspection'); assert.equal('results' in result, false);
    assert.equal(cache.get('unknown').raw, raw);
    assert.ok(JSON.stringify(result).length < 600);
  }
});

test('large search batches auto-compact the entire envelope, preserving all query counts', async () => {
  const payload = { results: Array.from({ length: 20 }, (_, i) => ({ entity: 'component', query: 'Field ' + i,
    components: Array.from({ length: 8 }, (_, j) => ({ ...component(j), name: 'n'.repeat(500) })) })) };
  const { runner } = fixture(payload);
  const result = await runner.search({ fileKey: 'file', queries: payload.results.map(({ entity, query }) => ({ entity, query })) }, 'large');
  assert.equal(result.status, 'ok'); assert.equal(result.results.length, 20);
  assert.ok(JSON.stringify(result).length <= 12000);
  assert.ok(result.results.every(g => g.total === 8 && g.shown + g.omitted === 8));
});

test('emitted search/audit/inspection bundles are self-contained executable functions', () => {
  for (const [bundle, name] of [['search','createSearchRunner'], ['audit','auditEvidence'], ['inspection','retainInspectionInstance']]) {
    const source = execFileSync(process.execPath, [path.join(__dirname, 'bundle.cjs'), bundle], { encoding: 'utf8' });
    const context = {}; vm.createContext(context); vm.runInContext(source, context);
    assert.equal(typeof context[name], 'function');
  }
});
