// Local deterministic CLI only. Live calls use repositoryRunner(adapter, itemId).
const fs = require('fs');
const path = require('path');
const { ROOT, readJson } = require('./lib');
const { local, usage } = require('./runner/core');
const [command, input, output] = process.argv.slice(2);
let result;
if (command === 'execute') {
  require('./runner/stdio').execute(input).catch(error => { console.error(error.message); process.exitCode = 1; });
} else if (command === 'handoff') result = require('./runner/handoff').generate(input, output);
else if (command === 'verify-handoff') result = require('./runner/handoff').verify(input);
else if (command === 'usage') result = usage(readJson(input));
else if (command === 'audit') result = require('./runner/audit').audit(readJson(input));
else if (command === 'compile') {
  const code = require('./runner/plugin').script(readJson(input));
  const full = local(ROOT, output); fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, code, { flag: 'wx' });
  result = { script: output, bytes: Buffer.byteLength(code), executed: false, notice: 'Compilation grants no approval. Use the guarded adapter; never send a compiled mutation directly.' };
} else throw new Error('Usage: npve-runner.js handoff <item-id> <out-dir> | verify-handoff <file> | usage <observations.json> | audit <input.json> | compile <plan.json> <out.js>');
if (result !== undefined) console.log(JSON.stringify(result, null, 2));
