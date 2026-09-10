const assert = require('assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { validateExecutionData, executionPath } = require('./validate-execution');
const { fileState, unchangedBaseline } = require('./workspace-baseline');

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'tebra-execution-test-'));
const item = { id: 'allergies', expectedRecordId: 'record', target: { fileKey: 'target' }, requiredEvidence: { report: 'batch/report.md', comparisonRender: 'batch/comparison.png' } };
fs.mkdirSync(path.join(root, 'batch'));
fs.writeFileSync(path.join(root, 'batch/readback.json'), JSON.stringify({ components: [{ key: 'published-small', id: '78:2', componentPropertyDefinitions: {
  size: { type: 'VARIANT', variantOptions: ['small', 'medium'] },
  variant: { type: 'VARIANT', variantOptions: ['contained', 'text'] },
  'Label#83:165': { type: 'TEXT' }, 'Show helper#123:33': { type: 'BOOLEAN' }
} }] }));
// Actual 1x1 PNG; production validation checks the signature, not pixel content.
fs.writeFileSync(path.join(root, 'batch/comparison.png'), Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64'));
fs.writeFileSync(path.join(root, 'batch/not-image.png'), 'Tool returned success, but this is not a screenshot.');
const ready = {
  format: 'tebra.design-execution', version: 1, itemId: item.id, recordId: item.expectedRecordId,
  preflight: { targetFileKey: 'target', identityEvidence: 'batch/readback.json', tools: ['actual_write_tool'], toolEvidence: 'batch/readback.json', controls: [{ name: 'Add', component: 'published-small', properties: { size: 'small' }, evidence: 'batch/readback.json' }] },
  corrections: [], milestones: [{ name: 'Comparison', status: 'pending', nodeIds: [], render: null, inspected: false }], unresolved: [], nextAction: 'Build the verified form'
};
const finished = structuredClone(ready);
finished.milestones[0] = { name: 'Comparison', status: 'verified', nodeIds: ['1:2'], render: 'batch/comparison.png', inspected: true };
finished.nextAction = 'Show the comparison and close the batch';
let cases = 0;
function accepts(data, stage) { validateExecutionData(data, item, { root, stage }); cases++; }
function rejects(base, mutate, pattern, stage = 'finish') {
  const data = structuredClone(base); mutate(data);
  assert.throws(() => validateExecutionData(data, item, { root, stage }), pattern); cases++;
}
try {
  assert.equal(executionPath(item), 'batch/execution.json');
  accepts(ready, 'ready');
  accepts(finished, 'finish');
  accepts(finished, 'ready'); // Resuming verified work is valid; it must not be rebuilt.
  const visual = structuredClone(finished);
  visual.version = 2;
  visual.appearance = { specification: 'batch/readback.json', review: {
    render: 'batch/comparison.png', inspected: true,
    areas: { surfaces: 'White fields on teal card', borders: 'Field outlines visible', content: 'Expected labels present', states: 'Living selected', layout: 'No clipped rows', actions: 'Save white bordered' },
    differences: [{ observation: 'Floating labels replace captions', disposition: 'approved', evidence: 'Recorded caption decision A' }]
  } };
  accepts(visual, 'finish');
  const visualReady = structuredClone(visual); visualReady.appearance.review = null;
  accepts(visualReady, 'ready');
  rejects(visual, d => { delete d.appearance; }, /appearance specification/);
  rejects(visual, d => { d.appearance.specification = 'missing.md'; }, /missing or empty/);
  rejects(visual, d => { d.appearance.review = null; }, /whole-form review/);
  rejects(visual, d => { delete d.appearance.review.areas.surfaces; }, /surfaces observation/);
  rejects(visual, d => { d.appearance.review.render = 'batch/not-image.png'; }, /not a PNG/);
  rejects(visual, d => { d.appearance.review.differences[0].disposition = 'unresolved'; }, /corrected\/approved/);
  rejects(visual, d => { d.appearance.review.differences[0].evidence = ''; }, /evidence/);
  rejects(ready, () => {}, /not verified/);
  rejects(finished, d => { d.preflight.targetFileKey = 'wrong-file'; }, /identity mismatch/);
  rejects(finished, d => { d.recordId = 'other-record'; }, /record mismatch/);
  rejects(finished, d => { d.preflight.controls = []; }, /control mappings/);
  rejects(finished, d => { d.preflight.controls[0].component = ''; }, /component identity/);
  rejects(finished, d => { d.preflight.controls[0].component = 'wrong-library'; }, /identity\/definitions absent/);
  rejects(finished, d => { d.preflight.controls[0].properties.variant = 'outlined'; }, /unavailable variant/);
  rejects(finished, d => { d.preflight.controls[0].properties.Label = 'Add'; }, /unknown property/);
  rejects(finished, d => { d.preflight.controls[0].properties['Show helper#123:33'] = 'false'; }, /must be boolean/);
  rejects(finished, d => { d.preflight.controls[0].evidence = 'missing.json'; }, /missing or empty/);
  rejects(finished, d => { d.preflight.controls[0].evidence = '../outside.json'; }, /repo-relative/);
  rejects(finished, d => { d.preflight.tools = []; }, /tool names/);
  rejects(finished, d => { d.unresolved = ['Disconnected write: may have created the field; read-back required']; }, /unresolved execution/, 'ready');
  rejects(finished, d => { d.unresolved = ['Button still renders its default label']; }, /unresolved execution/);
  rejects(finished, d => { d.milestones[0].inspected = false; }, /not inspected/);
  rejects(finished, d => { d.milestones[0].nodeIds = []; }, /actual node IDs/);
  rejects(finished, d => { d.milestones[0].render = 'batch/not-image.png'; }, /not a PNG/);
  rejects(finished, d => { d.milestones.push({ name: 'Footer', status: 'pending' }); }, /not verified/);
  rejects(finished, d => { d.milestones.push(structuredClone(d.milestones[0])); }, /duplicate name/);
  rejects(finished, d => { d.nextAction = ''; }, /next action/);
  // A resolved failure is allowed after evidence-supported correction, without changing approved scope.
  const repaired = structuredClone(finished);
  repaired.corrections.push('Read-back confirmed the field existed; appended that ID instead of creating a duplicate.');
  accepts(repaired, 'finish');
  fs.writeFileSync(path.join(root, 'unrelated.md'), 'User work present before start');
  const baseline = { 'unrelated.md': fileState('unrelated.md', root) };
  assert(unchangedBaseline('unrelated.md', baseline, root)); cases++;
  fs.writeFileSync(path.join(root, 'unrelated.md'), 'Changed during the batch');
  assert(!unchangedBaseline('unrelated.md', baseline, root)); cases++;
  assert(!unchangedBaseline('new-unrelated.md', baseline, root)); cases++;
  assert(!unchangedBaseline('unrelated.md', undefined, root)); cases++; // Historical runs do not get a fabricated baseline.
  assert.throws(() => fileState('../outside', root), /inside the repository/); cases++;
  console.log(`execution self-test PASS ${cases} readiness, recovery, evidence and completion scenarios`);
} finally {
  const temporaryRoot = path.resolve(os.tmpdir());
  const resolved = path.resolve(root);
  if (path.dirname(resolved) !== temporaryRoot || !path.basename(resolved).startsWith('tebra-execution-test-')) throw new Error('Refusing cleanup outside this test directory');
  fs.rmSync(resolved, { recursive: true });
}
