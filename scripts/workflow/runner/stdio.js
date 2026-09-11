const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { ROOT, readJson } = require('../lib');
const { repositoryRunner, local, save, need } = require('./core');

// File-backed bridge for clients whose tools cannot be called from Node directly.
// stdout contains small requests; full code is on disk. stdin contains only paths
// to complete, already-unwrapped JSON replies saved by the client.
async function execute(planFile) {
  const plan = readJson(planFile);
  need(plan.itemId, 'Live plan requires selected itemId');
  const item = readJson('workflow/manifest.json').items.find(i => i.id === plan.itemId);
  need(item, 'Unknown selected item');
  const lines = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });
  const iterator = lines[Symbol.asyncIterator](); let sequence = 0;
  async function call(kind, request) {
    const file = path.posix.join(path.posix.dirname(item.requiredEvidence.report), 'runner', plan.id, `transport-${++sequence}.json`);
    save(ROOT, file, { kind, fileKey: request.fileKey, code: request.code });
    process.stdout.write(JSON.stringify({ protocol: 'tebra.npve-tool-request', sequence, kind, fileKey: request.fileKey, requestFile: file,
      immediatelyBeforeDispatch: kind === 'mutation' ? ['node', 'scripts/workflow/check-batch.js', plan.itemId] : null,
      reply: 'Save the complete unwrapped JSON return to a new repo-relative evidence file, then send one JSON line: {"sequence":N,"replyFile":"..."}. Never retry or parallelize.' }) + '\n');
    const next = await iterator.next();
    need(!next.done, 'Tool bridge ended with uncertain outcome');
    const response = JSON.parse(next.value);
    need(response.sequence === sequence && response.replyFile, 'Tool bridge reply identity mismatch');
    return JSON.parse(fs.readFileSync(local(ROOT, response.replyFile), 'utf8'));
  }
  try {
    const runner = repositoryRunner({ read: r => call('read', r), mutate: r => call('mutation', r) }, plan.itemId);
    const result = await runner.step(plan);
    process.stdout.write(JSON.stringify({ protocol: 'tebra.npve-tool-result', ...result }) + '\n');
  } finally { lines.close(); }
}
module.exports = { execute };
