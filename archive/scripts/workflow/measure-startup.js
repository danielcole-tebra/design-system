// Startup accounting for standing rule 16 (record workflow_sessionEconomyC_2026-09-12).
// Reads a Claude Code transcript (~/.claude/projects/<repository-slug>/<session>.jsonl) and reports how many
// tool calls and how many result bytes preceded the first task action, for the batch report.
//
// Usage: node scripts/workflow/measure-startup.js [--session <id-prefix>|<path>] [--all] [--json] [--out <file>]
//   default          the most recently modified transcript of this repository (the running session, inside it)
//   --session X      the transcript whose file name starts with X, or a path to a .jsonl file
//   --all            one line per transcript in the repository's transcript folder, newest first
//   --json           print the JSON result instead of the summary
//   --out <file>     also write the JSON result to <file> (repository-relative)
//
// First task action, as the token audit defined it (figma-export/workflow-session-economy-2026-09-12/token-audit.md):
// the first Write, Edit, MultiEdit, NotebookEdit, use_figma, create_new_file, upload_assets, generate_figma_design
// or Agent call, or a shell command that runs an apply-/finalize- script or git commit. Bytes are the UTF-8 bytes
// of the text results the model saw; chars are given too because the audit counted chars. A session with no task
// action yet counts every call so far as pre-task.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { ROOT } = require('./lib');
const { ceilings, leanSet } = require('./validate-ceilings');

const TASK_TOOLS = new Set(['Write', 'Edit', 'MultiEdit', 'NotebookEdit', 'use_figma', 'create_new_file', 'upload_assets', 'generate_figma_design', 'Agent']);
const TASK_COMMAND = /node\s+\S*(apply|finalize)-|git\s+commit/;
const FILE_TOKEN = /(?:^|[\s"'(=])((?:[A-Za-z]:)?[A-Za-z0-9_./\\-]+\.(?:md|json|js|txt|png|jsonl))(?=$|[\s"')\];|,])/g;

function transcriptDir() {
  return path.join(os.homedir(), '.claude', 'projects', ROOT.replace(/[^A-Za-z0-9]/g, '-'));
}

function transcripts() {
  const dir = transcriptDir();
  if (!fs.existsSync(dir)) throw new Error(`No transcript folder for this repository: ${dir}`);
  return fs.readdirSync(dir).filter((name) => name.endsWith('.jsonl'))
    .map((name) => ({ name, file: path.join(dir, name), mtime: fs.statSync(path.join(dir, name)).mtimeMs }))
    .sort((a, b) => b.mtime - a.mtime);
}

function pick(selector) {
  if (selector && /\.jsonl$/i.test(selector) && fs.existsSync(selector)) return { name: path.basename(selector), file: path.resolve(selector) };
  const all = transcripts();
  if (!all.length) throw new Error(`No transcripts in ${transcriptDir()}`);
  if (!selector) return all[0];
  const found = all.find((t) => t.name.startsWith(selector));
  if (!found) throw new Error(`No transcript starts with ${selector} in ${transcriptDir()}`);
  return found;
}

const shortName = (name) => (name.startsWith('mcp__') ? name.split('__').pop() : name);

function summary(name, input) {
  if (!input) return '';
  if (input.file_path) return String(input.file_path);
  if (input.command) return String(input.command).replace(/\s+/g, ' ').slice(0, 160);
  if (input.pattern) return `${input.pattern} ${input.path || input.glob || ''}`.trim();
  if (input.description) return String(input.description).slice(0, 120);
  if (input.prompt) return String(input.prompt).replace(/\s+/g, ' ').slice(0, 120);
  return JSON.stringify(input).slice(0, 160);
}

function filesIn(name, input) {
  if (!input) return [];
  if (name === 'Read' && input.file_path) return [String(input.file_path)];
  const command = input.command;
  if (!command) return [];
  const files = new Set();
  let match;
  FILE_TOKEN.lastIndex = 0;
  while ((match = FILE_TOKEN.exec(command))) files.add(match[1]);
  return [...files];
}

function analyze(transcript) {
  const lines = fs.readFileSync(transcript.file, 'utf8').split('\n').filter(Boolean);
  const calls = [];
  const byId = new Map();
  const seenUsage = new Set();
  const turns = [];
  const prompts = [];
  let firstTask = null;
  let first = null;
  let last = null;
  for (const line of lines) {
    let entry;
    try { entry = JSON.parse(line); } catch { continue; }
    if (entry.timestamp) { first = first || entry.timestamp; last = entry.timestamp; }
    if (entry.type === 'user' && typeof entry.message?.content === 'string') prompts.push(entry.message.content.replace(/\s+/g, ' ').slice(0, 100));
    if (entry.type === 'assistant' && entry.message) {
      const usage = entry.message.usage;
      if (usage && entry.message.id && !seenUsage.has(entry.message.id)) {
        seenUsage.add(entry.message.id);
        const context = (usage.input_tokens || 0) + (usage.cache_creation_input_tokens || 0) + (usage.cache_read_input_tokens || 0);
        if (context) turns.push(context);
      }
      for (const block of Array.isArray(entry.message.content) ? entry.message.content : []) {
        if (block.type !== 'tool_use') continue;
        const name = shortName(block.name || '');
        const call = { index: calls.length + 1, id: block.id, tool: name, summary: summary(name, block.input), files: filesIn(name, block.input), chars: 0, bytes: 0, images: 0, persisted: false };
        calls.push(call);
        byId.set(block.id, call);
        const shell = name === 'Bash' || name === 'PowerShell';
        if (!firstTask && (TASK_TOOLS.has(name) || (shell && TASK_COMMAND.test(block.input?.command || '')))) firstTask = call;
      }
    }
    if (entry.type === 'user' && Array.isArray(entry.message?.content)) {
      for (const block of entry.message.content) {
        if (block.type !== 'tool_result') continue;
        const call = byId.get(block.tool_use_id);
        if (!call) continue;
        const parts = typeof block.content === 'string' ? [{ type: 'text', text: block.content }] : Array.isArray(block.content) ? block.content : [];
        for (const part of parts) {
          if (part.type === 'text') {
            const text = part.text || '';
            call.chars += text.length;
            call.bytes += Buffer.byteLength(text);
            if (/Output too large \(/.test(text)) call.persisted = true;
          } else if (part.type === 'image') call.images += 1;
        }
      }
    }
  }
  const pre = firstTask ? calls.filter((call) => call.index < firstTask.index) : calls;
  const total = (list, key) => list.reduce((sum, call) => sum + call[key], 0);
  const files = [...new Set(pre.flatMap((call) => call.files))];
  return {
    session: transcript.name.replace(/\.jsonl$/, ''),
    transcript: transcript.file,
    first,
    last,
    firstPrompt: prompts[0] || null,
    firstTaskAction: firstTask ? { index: firstTask.index, tool: firstTask.tool, summary: firstTask.summary } : null,
    beforeFirstTaskAction: { calls: pre.length, resultBytes: total(pre, 'bytes'), resultChars: total(pre, 'chars'), images: total(pre, 'images'), persistedResults: pre.filter((call) => call.persisted).length },
    sessionSoFar: { calls: calls.length, resultBytes: total(calls, 'bytes'), resultChars: total(calls, 'chars'), images: total(calls, 'images') },
    apiContext: { firstTurn: turns[0] || null, latestTurn: turns.at(-1) || null, maxTurn: turns.length ? Math.max(...turns) : null, turns: turns.length },
    filesReadBeforeFirstTaskAction: files,
    largestResultsBeforeFirstTaskAction: [...pre].sort((a, b) => b.bytes - a.bytes).slice(0, 8).map((call) => ({ index: call.index, tool: call.tool, bytes: call.bytes, summary: call.summary.slice(0, 120) })),
    callsBeforeFirstTaskAction: pre.map((call) => ({ index: call.index, tool: call.tool, bytes: call.bytes, summary: call.summary.slice(0, 120) }))
  };
}

function withLeanSet(result) {
  try {
    const lean = leanSet();
    const target = ceilings().leanSet.target;
    result.leanSet = { bytes: lean.bytes, target, ratio: Number((result.beforeFirstTaskAction.resultBytes / lean.bytes).toFixed(2)) };
  } catch (error) {
    result.leanSet = { error: error.message };
  }
  return result;
}

function fmt(n) { return n == null ? 'n/a' : n.toLocaleString('en-US'); }

function printSummary(r) {
  const pre = r.beforeFirstTaskAction;
  console.log(`startup ${r.session.slice(0, 8)} (${r.transcript})`);
  console.log(`  before the first task action: ${pre.calls} calls, ${fmt(pre.resultBytes)} result bytes (${fmt(pre.resultChars)} chars), ${pre.images} images, ${pre.persistedResults} persisted results`);
  console.log(`  first task action: ${r.firstTaskAction ? `#${r.firstTaskAction.index} ${r.firstTaskAction.tool} :: ${r.firstTaskAction.summary}` : 'none yet (every call so far is pre-task)'}`);
  if (r.leanSet.bytes) console.log(`  lean set now: ${fmt(r.leanSet.bytes)} bytes (pre-task reads are ${r.leanSet.ratio}x the lean set), target ${fmt(r.leanSet.target)}`);
  console.log(`  API context: first turn ${fmt(r.apiContext.firstTurn)} tokens, latest ${fmt(r.apiContext.latestTurn)}, max ${fmt(r.apiContext.maxTurn)}, ${r.apiContext.turns} turns; session so far ${r.sessionSoFar.calls} calls, ${fmt(r.sessionSoFar.resultBytes)} result bytes, ${r.sessionSoFar.images} images`);
  console.log(`  files read before the first task action (${r.filesReadBeforeFirstTaskAction.length}): ${r.filesReadBeforeFirstTaskAction.slice(0, 40).join(', ')}${r.filesReadBeforeFirstTaskAction.length > 40 ? ', …' : ''}`);
  console.log('  largest results before the first task action:');
  for (const call of r.largestResultsBeforeFirstTaskAction) console.log(`    ${String(call.bytes).padStart(8)} #${call.index} ${call.tool} :: ${call.summary}`);
}

function main(argv) {
  const args = argv.slice(2);
  const flag = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
  const has = (name) => args.includes(name);
  if (has('--all')) {
    for (const transcript of transcripts()) {
      const r = analyze(transcript);
      const pre = r.beforeFirstTaskAction;
      const first = r.firstTaskAction ? `#${r.firstTaskAction.index} ${r.firstTaskAction.tool} :: ${r.firstTaskAction.summary.slice(0, 50)}` : 'none';
      console.log(`${r.session.slice(0, 8)} ${(r.first || '').slice(0, 10)} calls=${pre.calls}/${r.sessionSoFar.calls} preBytes=${pre.resultBytes} preChars=${pre.resultChars} first=${first} | ${(r.firstPrompt || '').slice(0, 60)}`);
    }
    return;
  }
  const result = withLeanSet(analyze(pick(flag('--session'))));
  const out = flag('--out');
  if (out) {
    const target = path.resolve(ROOT, out);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, `${JSON.stringify(result, null, 2)}\n`);
  }
  if (has('--json')) console.log(JSON.stringify(result, null, 2));
  else printSummary(result);
  if (out) console.log(`  written: ${out}`);
}

if (require.main === module) main(process.argv);

module.exports = { analyze, pick, transcriptDir, transcripts };
