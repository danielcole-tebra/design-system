const fs = require('fs');
const dir = 'C:/Users/coled/.claude/projects/C--Code-design-system/';
const CURRENT = 'd1a3f48f-24e5-41da-9c49-eac11935ec0a';
const FIVE = ['84ff42db-f72d-4b15-ac9b-2299cb2b9cf2', 'fde5980a-df80-4486-85ce-a558b580b1c7', '9740bfa7-7f22-400e-9dc2-a32e1b3d485e', '6a891562-d141-4507-9e4f-ce2d691d15a7', 'e7e2148b-ba71-4076-92fa-a9c3bdbcb6de'];
function shortName(n) { return n.replace(/^mcp__[0-9a-f-]{36}__/, 'figma:').replace(/^mcp__figma__/, 'figma:').replace(/^mcp__Figma__/, 'figma:'); }
function resChars(c) { if (typeof c === 'string') return c.length; if (!Array.isArray(c)) return 0; let t = 0; for (const b of c) { if (b.type === 'text') t += (b.text || '').length; else if (b.type === 'image') t += 0; } return t; }
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsonl') && !f.startsWith(CURRENT));
const rule8Runs = [], applyRuns = [], zeroZero = [], handoff = [];
const walkSummary = {};
for (const f of files) {
  const id = f.replace('.jsonl', '');
  const lines = fs.readFileSync(dir + f, 'utf8').split('\n').filter(Boolean);
  const useById = {};
  const W = { skipFalse: 0, skipFalseChars: 0, pageWalk: 0, pageWalkChars: 0, rootWalk: 0, rootWalkChars: 0, pagesList: 0, useFigma: 0, useFigmaChars: 0, maxUseFigma: 0 };
  for (const l of lines) {
    let o; try { o = JSON.parse(l); } catch { continue; }
    const ts = o.timestamp || '';
    if (o.type === 'assistant' && Array.isArray(o.message?.content)) for (const b of o.message.content) {
      if (b.type !== 'tool_use') continue;
      const n = shortName(b.name); const js = JSON.stringify(b.input || {}); const code = b.input?.code || ''; const cmd = b.input?.command || '';
      const rec = { id, ts, n, js, code, cmd, chars: null };
      useById[b.id] = rec;
      if (n === 'figma:use_figma' && /exemptCount|frac\(n\.width\)|roundWithRecord|rule ?8/i.test(code)) rule8Runs.push(rec);
      if (/node\s+["']?\.?\/?(apply|finalize|propose)-[\w.-]+\.js/.test(cmd) || /rule8-audit/.test(cmd)) applyRuns.push(rec);
      if (/(^|[^\d.])0:0([^\d]|$)/.test(js)) zeroZero.push(rec);
      if (/HANDOFF\.md/.test(js)) handoff.push(rec);
      if (FIVE.includes(id) && n === 'figma:use_figma') {
        W.useFigma++;
        rec.isSkipFalse = /skipInvisibleInstanceChildren\s*=\s*false/.test(code);
        rec.isPageWalk = /(page|p|t|tpl|scr|pg|node|root)\.findAll\(|\.findAll\(\)|findAllWithCriteria|const visit = |visit\(c\)/.test(code) && !/figma\.root\.findAll/.test(code);
        rec.isRootWalk = /figma\.root\.findAll|figma\.root\.findOne|for \(const p(age|g)? of figma\.root\.children\)[^]*findAll/.test(code);
        rec.isPagesList = /figma\.root\.children\.map/.test(code);
      }
    }
    if (o.type === 'user' && Array.isArray(o.message?.content)) for (const b of o.message.content) {
      if (b.type !== 'tool_result') continue; const r = useById[b.tool_use_id]; if (!r) continue; r.chars = resChars(b.content);
      if (FIVE.includes(id) && r.n === 'figma:use_figma') {
        W.useFigmaChars += r.chars; W.maxUseFigma = Math.max(W.maxUseFigma, r.chars);
        if (r.isSkipFalse) { W.skipFalse++; W.skipFalseChars += r.chars; }
        if (r.isPageWalk) { W.pageWalk++; W.pageWalkChars += r.chars; }
        if (r.isRootWalk) { W.rootWalk++; W.rootWalkChars += r.chars; }
        if (r.isPagesList) W.pagesList++;
      }
    }
  }
  if (FIVE.includes(id)) walkSummary[id.slice(0, 8)] = W;
}
const byTs = (a, b) => (a.ts || '').localeCompare(b.ts || '');
console.log('=== RULE 8 WALK RUNS (use_figma with rule8 signature) across all sessions ===');
for (const r of rule8Runs.sort(byTs)) console.log(`  ${r.ts} ${r.id.slice(0, 8)} result=${r.chars} :: ${r.code.replace(/\s+/g, ' ').slice(0, 110)}`);
console.log('\n=== APPLY/FINALIZE/PROPOSE SCRIPT RUNS via Bash (last 40) ===');
for (const r of applyRuns.sort(byTs).slice(-40)) { const m = r.cmd.match(/(apply|finalize|propose)-[\w.-]+\.js/g); console.log(`  ${r.ts} ${r.id.slice(0, 8)} result=${r.chars} :: ${[...new Set(m || [])].join(', ')}`); }
console.log('\n=== TOOL INPUTS CONTAINING 0:0 across all sessions ===');
for (const r of zeroZero.sort(byTs)) console.log(`  ${r.ts} ${r.id.slice(0, 8)} ${r.n} result=${r.chars} :: ${r.js.slice(0, 120)}`);
console.log('\n=== HANDOFF.md in tool inputs across all sessions ===');
for (const r of handoff.sort(byTs)) console.log(`  ${r.ts} ${r.id.slice(0, 8)} ${r.n} result=${r.chars} :: ${r.js.slice(0, 120)}`);
console.log('\n=== FIGMA WALK SUMMARY (five sessions) ===');
console.log(JSON.stringify(walkSummary, null, 1));
