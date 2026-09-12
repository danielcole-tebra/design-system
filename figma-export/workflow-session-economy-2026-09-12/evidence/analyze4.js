const fs = require('fs');
const dir = 'C:/Users/coled/.claude/projects/C--Code-design-system/';
const pick = ['84ff42db-f72d-4b15-ac9b-2299cb2b9cf2', 'fde5980a-df80-4486-85ce-a558b580b1c7', '9740bfa7-7f22-400e-9dc2-a32e1b3d485e', '6a891562-d141-4507-9e4f-ce2d691d15a7', 'e7e2148b-ba71-4076-92fa-a9c3bdbcb6de'];
const a2 = JSON.parse(fs.readFileSync(__dirname + '/analysis2.json', 'utf8'));
for (const id of pick) {
  const lines = fs.readFileSync(dir + id + '.jsonl', 'utf8').split('\n').filter(Boolean);
  const att = {}; let attChars = 0; let thinkingSig = 0, thinkingWithText = 0, redacted = 0;
  const lineTypes = {};
  for (const l of lines) {
    let o; try { o = JSON.parse(l); } catch { continue; }
    lineTypes[o.type] = (lineTypes[o.type] || 0) + 1;
    if (o.type === 'attachment' && o.attachment) { const t = o.attachment.type; att[t] = (att[t] || 0) + 1; attChars += JSON.stringify(o.attachment).length; }
    if (o.type === 'assistant' && Array.isArray(o.message?.content)) for (const b of o.message.content) { if (b.type === 'thinking') { if ((b.thinking || '').length > 0) thinkingWithText++; else thinkingSig++; } if (b.type === 'redacted_thinking') redacted++; }
  }
  const S = a2.find(x => x.file.startsWith(id));
  const pre = S.calls.filter(c => S.firstTask && c.i < S.firstTask.i);
  const preChars = pre.reduce((a, c) => a + c.chars, 0);
  const topText = [...S.calls].sort((a, b) => b.chars - a.chars).slice(0, 10);
  console.log('='.repeat(90));
  console.log(`SESSION ${id.slice(0, 8)} lineTypes=${JSON.stringify(lineTypes)}`);
  console.log(`  attachments: ${JSON.stringify(att)} totalChars=${attChars}`);
  console.log(`  thinking blocks: withText=${thinkingWithText} signatureOnly=${thinkingSig} redacted=${redacted}`);
  console.log(`  PRE-TASK: ${pre.length} calls, ${preChars} result chars (~${Math.round(preChars / 4)} tok) before first task action #${S.firstTask?.i}`);
  console.log('  TOP 10 TEXT RESULTS:');
  for (const c of topText) console.log(`    ${String(c.chars).padStart(7)} ${c.name} :: ${c.summ.slice(0, 150)}`);
  console.log('  Persisted re-reads (Read of tool-results/*.txt): ' + S.calls.filter(c => c.name === 'Read' && /tool-results/.test(c.summ)).map(c => c.chars).join(', '));
}
