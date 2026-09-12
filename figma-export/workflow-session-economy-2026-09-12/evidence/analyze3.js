const fs = require('fs');
const dir = 'C:/Users/coled/.claude/projects/C--Code-design-system/';
const pick = ['84ff42db-f72d-4b15-ac9b-2299cb2b9cf2', 'fde5980a-df80-4486-85ce-a558b580b1c7', '9740bfa7-7f22-400e-9dc2-a32e1b3d485e', '6a891562-d141-4507-9e4f-ce2d691d15a7', 'e7e2148b-ba71-4076-92fa-a9c3bdbcb6de'];
function shortName(n) { return n.replace(/^mcp__[0-9a-f-]{36}__/, 'figma:').replace(/^mcp__figma__/, 'figma:').replace(/^mcp__Figma__/, 'figma:'); }
function pngDims(b64) { try { const buf = Buffer.from(b64.slice(0, 64), 'base64'); if (buf.toString('ascii', 1, 4) !== 'PNG') return null; return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) }; } catch { return null; } }
function imgTokens(d) { if (!d) return 1600; let { w, h } = d; const s = Math.min(1, 1568 / Math.max(w, h), Math.sqrt(1.15e6 / (w * h))); return Math.round((w * s) * (h * s) / 750); }
const grand = { base: 0, toolResultText: 0, toolResultImg: 0, toolInput: 0, assistantText: 0, thinking: 0, userText: 0, userImg: 0, sysReminder: 0, turns: 0, sumCtx: 0, out: 0 };
for (const id of pick) {
  const lines = fs.readFileSync(dir + id + '.jsonl', 'utf8').split('\n').filter(Boolean);
  const S = { id, toolInputByName: {}, toolInputChars: 0, assistantText: 0, thinking: 0, userText: 0, userImgs: 0, userImgTok: 0, sysReminderChars: 0, toolResultText: 0, toolResultImgTok: 0, zeroZero: [], metaCalls: [], turns: 0, sumCtx: 0, firstCtx: null, out: 0, largestInputs: [] };
  const seen = new Set();
  for (const l of lines) {
    let o; try { o = JSON.parse(l); } catch { continue; }
    if (o.type === 'assistant' && o.message) {
      if (o.message.usage && o.message.id && !seen.has(o.message.id)) { seen.add(o.message.id); const u = o.message.usage; const ctx = (u.input_tokens || 0) + (u.cache_creation_input_tokens || 0) + (u.cache_read_input_tokens || 0); if (ctx) { S.turns++; S.sumCtx += ctx; if (S.firstCtx === null) S.firstCtx = ctx; } S.out += u.output_tokens || 0; }
      for (const b of (Array.isArray(o.message.content) ? o.message.content : [])) {
        if (b.type === 'text') S.assistantText += (b.text || '').length;
        else if (b.type === 'thinking') S.thinking += (b.thinking || '').length;
        else if (b.type === 'tool_use') {
          const n = shortName(b.name); const js = JSON.stringify(b.input || {}); S.toolInputChars += js.length; S.toolInputByName[n] = (S.toolInputByName[n] || 0) + js.length;
          S.largestInputs.push({ n, len: js.length, s: (b.input?.file_path || b.input?.description || (b.input?.code || '').slice(0, 80) || js.slice(0, 80)).toString().replace(/\n/g, ' ').slice(0, 100) });
          if (/(^|[^\d])0:0([^\d]|$)/.test(js)) S.zeroZero.push({ n, s: js.slice(0, 160) });
          if (/get_metadata|get_design_context/.test(n)) S.metaCalls.push({ n, s: js.slice(0, 140) });
        }
      }
    }
    if (o.type === 'user' && o.message) {
      const c = o.message.content;
      if (typeof c === 'string') { S.userText += c.length; if (/<system-reminder>/.test(c)) S.sysReminderChars += c.length; }
      else if (Array.isArray(c)) for (const b of c) {
        if (b.type === 'text') { S.userText += (b.text || '').length; if (/<system-reminder>/.test(b.text || '')) S.sysReminderChars += (b.text || '').length; }
        else if (b.type === 'image') { S.userImgs++; S.userImgTok += imgTokens(pngDims(b.source?.data || '')); }
        else if (b.type === 'tool_result') {
          const cont = b.content;
          if (typeof cont === 'string') S.toolResultText += cont.length;
          else if (Array.isArray(cont)) for (const x of cont) { if (x.type === 'text') S.toolResultText += (x.text || '').length; else if (x.type === 'image') S.toolResultImgTok += imgTokens(pngDims(x.source?.data || '')); }
        }
      }
    }
  }
  S.largestInputs.sort((a, b) => b.len - a.len);
  console.log('='.repeat(90));
  console.log(`SESSION ${id.slice(0, 8)} turns=${S.turns} firstCtx=${S.firstCtx} sumCtx=${S.sumCtx} outputTokens=${S.out}`);
  console.log(`  toolResultText=${S.toolResultText} (~${Math.round(S.toolResultText / 4)} tok)  toolResultImgTok~${S.toolResultImgTok}`);
  console.log(`  toolInput=${S.toolInputChars} (~${Math.round(S.toolInputChars / 4)} tok) by tool: ${Object.entries(S.toolInputByName).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + '=' + v).join(', ')}`);
  console.log(`  assistantText=${S.assistantText} (~${Math.round(S.assistantText / 4)} tok)  thinking=${S.thinking} (~${Math.round(S.thinking / 4)} tok)`);
  console.log(`  userText=${S.userText} (~${Math.round(S.userText / 4)} tok) of which system-reminder-bearing=${S.sysReminderChars}  userImages=${S.userImgs} (~${S.userImgTok} tok)`);
  console.log(`  0:0 in tool inputs: ${S.zeroZero.length}`); for (const z of S.zeroZero) console.log('     ' + z.n + ' ' + z.s);
  console.log(`  get_metadata/get_design_context calls: ${S.metaCalls.length}`); for (const z of S.metaCalls) console.log('     ' + z.n + ' ' + z.s);
  console.log('  LARGEST TOOL INPUTS:'); for (const x of S.largestInputs.slice(0, 8)) console.log(`     ${String(x.len).padStart(7)} ${x.n} :: ${x.s}`);
  grand.base += (S.firstCtx || 52000) * S.turns; grand.toolResultText += S.toolResultText; grand.toolResultImg += S.toolResultImgTok; grand.toolInput += S.toolInputChars; grand.assistantText += S.assistantText; grand.thinking += S.thinking; grand.userText += S.userText; grand.userImg += S.userImgTok; grand.sysReminder += S.sysReminderChars; grand.turns += S.turns; grand.sumCtx += S.sumCtx; grand.out += S.out;
}
console.log('='.repeat(90));
console.log('GRAND (5 sessions): ' + JSON.stringify(grand));
