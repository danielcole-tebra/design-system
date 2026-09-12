const fs = require('fs');
const dir = 'C:/Users/coled/.claude/projects/C--Code-design-system/';
const pick = ['84ff42db-f72d-4b15-ac9b-2299cb2b9cf2', 'fde5980a-df80-4486-85ce-a558b580b1c7', '9740bfa7-7f22-400e-9dc2-a32e1b3d485e'];
function pngDims(b64) { try { const buf = Buffer.from(b64.slice(0, 64), 'base64'); if (buf.toString('ascii', 1, 4) !== 'PNG') return null; return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) }; } catch { return null; } }
function imgTokens(d) { if (!d) return 1600; let { w, h } = d; const s = Math.min(1, 1568 / Math.max(w, h), Math.sqrt(1.15e6 / (w * h))); return Math.round((w * s) * (h * s) / 750); }
for (const id of pick) {
  const lines = fs.readFileSync(dir + id + '.jsonl', 'utf8').split('\n').filter(Boolean);
  // Build sequence of API calls: each assistant message id = one call. Between calls: tool results + user text.
  const calls = []; let cur = null; const seen = new Set(); let pending = { resChars: 0, imgTok: 0, userChars: 0 };
  for (const l of lines) {
    let o; try { o = JSON.parse(l); } catch { continue; }
    if (o.type === 'assistant' && o.message?.usage && o.message.id) {
      if (!seen.has(o.message.id)) {
        seen.add(o.message.id); const u = o.message.usage;
        cur = { ctx: (u.input_tokens || 0) + (u.cache_creation_input_tokens || 0) + (u.cache_read_input_tokens || 0), create: u.cache_creation_input_tokens || 0, out: u.output_tokens || 0, textChars: 0, thinkChars: 0, inputChars: 0, before: pending };
        calls.push(cur); pending = { resChars: 0, imgTok: 0, userChars: 0 };
      }
      for (const b of (o.message.content || [])) { if (b.type === 'text') cur.textChars += (b.text || '').length; else if (b.type === 'thinking') cur.thinkChars += (b.thinking || '').length; else if (b.type === 'tool_use') cur.inputChars += JSON.stringify(b.input || {}).length; }
    }
    if (o.type === 'user' && o.message) {
      const c = o.message.content;
      if (typeof c === 'string') pending.userChars += c.length;
      else if (Array.isArray(c)) for (const b of c) { if (b.type === 'text') pending.userChars += (b.text || '').length; else if (b.type === 'tool_result') { const cc = b.content; if (typeof cc === 'string') pending.resChars += cc.length; else if (Array.isArray(cc)) for (const x of cc) { if (x.type === 'text') pending.resChars += (x.text || '').length; else if (x.type === 'image') pending.imgTok += imgTokens(pngDims(x.source?.data || '')); } } }
    }
  }
  // For consecutive calls i-1 -> i where ctx grows (no compaction), delta = ctx_i - ctx_{i-1}.
  // Model A (thinking retained): delta ≈ out_{i-1} + res/K + img + user/K.  Model B (thinking dropped): delta ≈ (text+input)_{i-1}/K + res/K + img + user/K.
  let n = 0, sumDelta = 0, sumOutPrev = 0, sumVisPrev = 0, sumRes = 0, sumImg = 0, sumUser = 0;
  const rows = [];
  for (let i = 1; i < calls.length; i++) {
    const a = calls[i - 1], b = calls[i]; if (!a.ctx || !b.ctx) continue; const d = b.ctx - a.ctx; if (d <= 0) continue;
    n++; sumDelta += d; sumOutPrev += a.out; sumVisPrev += (a.textChars + a.inputChars); sumRes += b.before.resChars; sumImg += b.before.imgTok; sumUser += b.before.userChars;
    rows.push({ d, outPrev: a.out, visPrev: a.textChars + a.inputChars, thinkPrev: a.thinkChars, res: b.before.resChars, img: b.before.imgTok, user: b.before.userChars });
  }
  console.log('='.repeat(90));
  console.log(`SESSION ${id.slice(0, 8)} calls=${calls.length} growthSteps=${n}`);
  console.log(`  sum delta ctx = ${sumDelta}`);
  console.log(`  sum prev output tokens (incl. thinking) = ${sumOutPrev}; sum prev visible chars (text+tool input) = ${sumVisPrev} (~${Math.round(sumVisPrev / 3.5)} tok @3.5)`);
  console.log(`  sum result chars = ${sumRes} (~${Math.round(sumRes / 3.5)} tok @3.5); img tok = ${sumImg}; user chars = ${sumUser} (~${Math.round(sumUser / 3.5)})`);
  const modelA = sumOutPrev + sumRes / 3.5 + sumImg + sumUser / 3.5;
  const modelB = sumVisPrev / 3.5 + sumRes / 3.5 + sumImg + sumUser / 3.5;
  console.log(`  Model A (thinking retained) predicts ${Math.round(modelA)} ; Model B (thinking dropped) predicts ${Math.round(modelB)} ; observed ${sumDelta}`);
  // Steps where the previous call had big thinking but tiny visible output and tiny result: pure thinking test
  const pure = rows.filter(r => r.res < 500 && r.user < 200 && r.img === 0 && r.visPrev < 800);
  if (pure.length) { const sd = pure.reduce((a, r) => a + r.d, 0), so = pure.reduce((a, r) => a + r.outPrev, 0), sv = pure.reduce((a, r) => a + r.visPrev, 0); console.log(`  PURE steps (tiny result, tiny visible output): n=${pure.length} sumDelta=${sd} sumPrevOut=${so} sumPrevVisChars=${sv}`); for (const r of pure.slice(0, 8)) console.log('     ' + JSON.stringify(r)); }
}
