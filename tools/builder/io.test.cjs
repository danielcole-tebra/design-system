const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { readPage } = require('./read.cjs');
const { renderRecord, recordBatch } = require('./record.cjs');

const record = () => ({ schemaVersion: 1, title: 'Fixture build', date: '2026-10-31',
  fileKey: 'fixture', reviewUrl: 'https://www.figma.com/design/fixture', summary: 'Verified fixture states.',
  timing: { start: '2026-10-31T17:00:00Z', ready: '2026-10-31T17:01:00Z', built: '2026-10-31T17:02:00Z',
    firstImage: '2026-10-31T17:02:10Z', verified: '2026-10-31T17:03:00Z', inputWaitSeconds: 0 },
  verified: ['Actual properties read; screenshots inspected.'], findings: [], reads: ['AGENTS.md'],
  effort: { through: 'verification', figmaCalls: 12, otherCalls: 10, searches: 1, technicalRetries: 0,
    canvasCorrections: 0, clarificationStops: 0, tokens: null }, screenshots: ['section.png'], evidence: { checked: 5 } });

test('reader reconstructs long lines and Unicode exactly across bounded pages', () => {
  const text = '# Title\n' + 'a'.repeat(5991) + '😀' + 'b'.repeat(12000);
  let offset = 0, output = '';
  do {
    const page = readPage(text, { offset });
    assert.ok(page.text.length <= 6000);
    output += page.text;
    offset = page.nextOffset;
  } while (offset !== null);
  assert.equal(output, text);
});

test('reader selects exact section including subsections, ignores fenced headings and rejects ambiguity', () => {
  const text = '# Root\n## One\nhello\n```md\n## Fake\n```\n### Child\nyes\n## Two\nbye\n';
  assert.equal(readPage(text, { section: 'One' }).text, '## One\nhello\n```md\n## Fake\n```\n### Child\nyes\n');
  assert.ok(!readPage(text, { index: true }).text.includes('Fake'));
  assert.throws(() => readPage(text, { section: 'Missing' }));
  assert.throws(() => readPage('## Same\n## Same\n', { section: 'Same' }));
  assert.throws(() => readPage(text, { offset: -1 }));
});

test('report computes stage timings and refuses missing or unordered checkpoints and invented counts', () => {
  const value = record();
  const report = renderRecord(value);
  assert.match(report, /Preparation\/discovery: 60s; construction: 60s/);
  assert.match(report, /First image elapsed: 130s; verified elapsed: 180s/);
  assert.match(report, /tokens=unavailable/);
  value.timing.ready = '2026-10-31T16:59:00Z';
  assert.throws(() => renderRecord(value), /order/);
  value.timing = record().timing; delete value.effort.figmaCalls;
  assert.throws(() => renderRecord(value), /Count or null/);
});

function fixture(t) {
  const tempParent = fs.realpathSync(os.tmpdir());
  const root = fs.mkdtempSync(path.join(tempParent, 'tebra-builder-test-'));
  t.after(() => {
    const target = fs.realpathSync(root);
    if (path.dirname(target) !== tempParent || !path.basename(target).startsWith('tebra-builder-test-')) {
      throw new Error('Cleanup target escaped the test temp directory');
    }
    fs.rmSync(target, { recursive: true, force: true });
  });
  const folder = path.join(root, 'runs', 'fixture'); fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(root, 'LOG.md'), '# History\n');
  const input = path.join(folder, 'record.json');
  fs.writeFileSync(input, JSON.stringify(record()));
  fs.writeFileSync(path.join(folder, 'section.png'), 'fixture placeholder');
  return { root, folder, input };
}

test('writer reads large evidence from disk and retries without duplicating LOG or changing evidence', t => {
  const { root, folder, input } = fixture(t);
  const value = record(); value.evidence.largeFixture = 'x'.repeat(200000);
  const original = JSON.stringify(value); fs.writeFileSync(input, original);
  assert.equal(recordBatch(root, input).alreadyLogged, false);
  assert.equal(recordBatch(root, input).alreadyLogged, true);
  assert.equal(fs.readFileSync(input, 'utf8'), original);
  assert.equal(fs.readFileSync(path.join(root, 'LOG.md'), 'utf8').match(/builder-run:/g).length, 1);
  assert.ok(fs.statSync(path.join(folder, 'REPORT.md')).size < 4000);
  value.summary = 'Changed'; fs.writeFileSync(input, JSON.stringify(value));
  assert.throws(() => recordBatch(root, input), /differs/);
});

test('writer rejects outside input and missing/traversing screenshots before changing report or LOG', t => {
  const { root, folder, input } = fixture(t);
  const outside = path.join(root, 'record.json'); fs.copyFileSync(input, outside);
  assert.throws(() => recordBatch(root, outside), /inside/);
  fs.unlinkSync(path.join(folder, 'section.png'));
  assert.throws(() => recordBatch(root, input));
  assert.equal(fs.existsSync(path.join(folder, 'REPORT.md')), false);
  assert.equal(fs.readFileSync(path.join(root, 'LOG.md'), 'utf8'), '# History\n');
  const value = record(); value.screenshots = ['../outside.png']; fs.writeFileSync(input, JSON.stringify(value));
  assert.throws(() => recordBatch(root, input), /local PNG/);
});
