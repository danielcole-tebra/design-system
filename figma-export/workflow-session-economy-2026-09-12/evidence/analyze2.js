const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/coled/.claude/projects/C--Code-design-system/';
const CURRENT = 'd1a3f48f-24e5-41da-9c49-eac11935ec0a';
function shortName(n) { return n.replace(/^mcp__[0-9a-f-]{36}__/, 'figma:').replace(/^mcp__figma__/, 'figma:').replace(/^mcp__Figma__/, 'figma:'); }
function lastTs(f) {
  const s = fs.readFileSync(dir + f, 'utf8'); let last = null;
  for (const l of s.split('\n')) { const m = l.match(/"timestamp":"([^"]+)"/); if (m) last = m[1]; }
  return last;
}
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsonl') && !f.startsWith(CURRENT))
  .map(f => ({ f, last: lastTs(f), size: fs.statSync(dir + f).size }))
  .sort((a, b) => (b.last || '').localeCompare(a.last || ''));
console.log('ALL SESSIONS by last activity:');
for (const x of files) console.log(`  ${x.last}  ${String(x.size).padStart(9)}  ${x.f}`);
const pick = files.slice(0, 5);

function pngDims(b64) {
  try { const buf = Buffer.from(b64.slice(0, 64), 'base64'); if (buf.toString('ascii', 1, 4) !== 'PNG') return null; return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) }; } catch { return null; }
}
function imgTokens(d) {
  if (!d) return 1600;
  let { w, h } = d; const maxEdge = 1568; const maxPx = 1.15e6;
  const s = Math.min(1, maxEdge / Math.max(w, h), Math.sqrt(maxPx / (w * h)));
  return Math.round((w * s) * (h * s) / 750);
}
function inputSummary(n, input) {
  if (!input) return '';
  if (n === 'Read') return input.file_path + (input.offset ? ` @${input.offset}+${input.limit || ''}` : '');
  if (n === 'Bash' || n === 'PowerShell') return (input.description || '') + ' || ' + (input.command || '').slice(0, 200).replace(/\n/g, ' ');
  if (n === 'Grep') return `pattern=${input.pattern} path=${input.path || ''}`;
  if (n === 'Glob') return `${input.pattern} ${input.path || ''}`;
  if (n === 'Skill') return input.skill;
  if (n.startsWith('figma:')) return input.code ? 'code: ' + input.code.slice(0, 120).replace(/\s+/g, ' ') : JSON.stringify(input).slice(0, 160);
  return JSON.stringify(input).slice(0, 140);
}
const fileReadRe = /(?:cat|sed -n [^ ]+|head[^|;]*|tail[^|;]*|Get-Content|type|node -e[^;]*require\(|wc -c)\s+["']?([A-Za-z0-9_./\\:-]+\.(?:md|json|js|txt|png))/g;

const out = [];
for (const { f, size } of pick) {
  const lines = fs.readFileSync(dir + f, 'utf8').split('\n').filter(Boolean);
  const S = { file: f, bytes: size, first: null, last: null, turns: [], calls: [], results: {}, images: [], persisted: 0, persistedReads: 0, scriptRuns: [], metaCalls: [], startReads: [], firstTask: null, prompts: [] };
  const useById = {}; const seen = new Set(); let idx = 0; let firstTask = false;
  for (const l of lines) {
    let o; try { o = JSON.parse(l); } catch { continue; }
    if (o.timestamp) { if (!S.first) S.first = o.timestamp; S.last = o.timestamp; }
    if (o.type === 'user' && typeof o.message?.content === 'string') S.prompts.push(o.message.content.slice(0, 120).replace(/\n/g, ' '));
    if (o.type === 'assistant' && o.message) {
      if (o.message.usage && o.message.id && !seen.has(o.message.id)) {
        seen.add(o.message.id); const u = o.message.usage;
        S.turns.push({ ctx: (u.input_tokens || 0) + (u.cache_creation_input_tokens || 0) + (u.cache_read_input_tokens || 0), create: u.cache_creation_input_tokens || 0, out: u.output_tokens || 0 });
      }
      for (const b of (Array.isArray(o.message.content) ? o.message.content : [])) {
        if (b.type !== 'tool_use') continue;
        const n = shortName(b.name); idx++;
        const c = { i: idx, id: b.id, name: n, summ: inputSummary(n, b.input), chars: 0, img: 0, imgTok: 0 };
        useById[b.id] = c; S.calls.push(c);
        if (/get_metadata|get_design_context|get_screenshot/.test(n)) S.metaCalls.push({ name: n, input: JSON.stringify(b.input) });
        const cmd = (b.input?.command || '') + ' ' + (b.input?.file_path || '');
        if (/apply-[\w-]*\.js|finalize-[\w-]*\.js|rule8-audit|build-aggregate|validate-workflow|milestone\.js/.test(cmd)) S.scriptRuns.push(c);
        const isTask = ['Write', 'Edit', 'MultiEdit', 'figma:use_figma', 'figma:create_new_file', 'figma:upload_assets', 'Agent'].includes(n) || /node\s+\S*(apply|finalize)-|git\s+commit/.test(b.input?.command || '');
        if (!firstTask) {
          if (n === 'Read') S.startReads.push({ i: idx, via: 'Read', file: b.input.file_path, id: b.id });
          else if (n === 'Bash' || n === 'PowerShell') { let m; const cmd2 = b.input.command || ''; const seenF = new Set(); while ((m = fileReadRe.exec(cmd2))) { if (!seenF.has(m[1])) { seenF.add(m[1]); S.startReads.push({ i: idx, via: 'Bash', file: m[1], id: b.id }); } } }
          if (isTask) { firstTask = true; S.firstTask = c; }
        }
      }
    }
    if (o.type === 'user' && Array.isArray(o.message?.content)) {
      for (const b of o.message.content) {
        if (b.type !== 'tool_result') continue;
        const c = useById[b.tool_use_id]; if (!c) continue;
        const cont = b.content;
        if (typeof cont === 'string') c.chars += cont.length;
        else if (Array.isArray(cont)) for (const x of cont) {
          if (x.type === 'text') c.chars += (x.text || '').length;
          else if (x.type === 'image') { c.img++; const d = pngDims(x.source?.data || ''); const t = imgTokens(d); c.imgTok += t; S.images.push({ call: c.i, name: c.name, summ: c.summ.slice(0, 90), dims: d, b64: (x.source?.data || '').length, tokens: t }); }
        }
        if (/Output too large \(/.test(typeof cont === 'string' ? cont : JSON.stringify(cont))) S.persisted++;
        if (c.name === 'Read' && /tool-results/.test(c.summ)) S.persistedReads++;
      }
    }
  }
  S.totalChars = S.calls.reduce((a, c) => a + c.chars, 0);
  S.totalImgTok = S.images.reduce((a, x) => a + x.tokens, 0);
  out.push(S);
}
fs.writeFileSync(path.join(__dirname, 'analysis2.json'), JSON.stringify(out, null, 1));
for (const S of out) {
  console.log('='.repeat(100));
  console.log(`SESSION ${S.file} first=${S.first} last=${S.last} calls=${S.calls.length}`);
  console.log(`  prompts: ${S.prompts.slice(0, 3).map(p => JSON.stringify(p)).join(' | ')}`);
  const t = S.turns; const ctxs = t.map(x => x.ctx);
  console.log(`  turns=${t.length} firstTurnCtx=${ctxs[0]} maxCtx=${Math.max(...ctxs)} lastCtx=${ctxs[ctxs.length - 1]} avgCtx=${Math.round(ctxs.reduce((a, b) => a + b, 0) / t.length)} sumCreate=${t.reduce((a, x) => a + x.create, 0)} sumOut=${t.reduce((a, x) => a + x.out, 0)} sumCtx=${ctxs.reduce((a, b) => a + b, 0)}`);
  console.log(`  textResultChars=${S.totalChars} (~${Math.round(S.totalChars / 4)} tok)  images=${S.images.length} imgTokens~${S.totalImgTok}  persistedOutputs=${S.persisted} persistedReads=${S.persistedReads}`);
  console.log(`  FIRST TASK ACTION: #${S.firstTask?.i} ${S.firstTask?.name} :: ${S.firstTask?.summ.slice(0, 120)}`);
  console.log('  FILES READ BEFORE FIRST TASK ACTION:');
  for (const r of S.startReads) { const c = S.calls.find(x => x.id === r.id); console.log(`    #${r.i} ${r.via.padEnd(4)} ${String(c?.chars || '').padStart(7)} ${r.file}`); }
  console.log('  FIRST 12 CALLS:');
  for (const c of S.calls.slice(0, 12)) console.log(`    #${c.i} ${String(c.chars).padStart(7)}ch ${c.img ? c.img + 'img/' + c.imgTok + 'tok' : ''} ${c.name} :: ${c.summ.slice(0, 150)}`);
  console.log('  SCRIPT RUNS:');
  for (const c of S.scriptRuns) console.log(`    #${c.i} ${String(c.chars).padStart(7)}ch ${c.name} :: ${c.summ.slice(0, 160)}`);
  console.log('  META/SCREENSHOT CALLS with 0:0 or no nodeId:');
  for (const m of S.metaCalls) if (/0:0|"nodeId":""|^(?!.*nodeId)/.test(m.input)) console.log(`    ${m.name} ${m.input.slice(0, 120)}`);
  console.log('  IMAGES:');
  for (const x of S.images) console.log(`    #${x.call} ${x.dims ? x.dims.w + 'x' + x.dims.h : '?'} b64=${x.b64} ~${x.tokens}tok ${x.name} :: ${x.summ}`);
}
