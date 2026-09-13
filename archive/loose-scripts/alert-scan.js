const fs = require('fs'), path = require('path');
const BS = String.fromCharCode(92); // backslash, avoids heredoc escaping issues
const exts = new Set(['.tsx', '.ts', '.jsx', '.js']);
const root = process.argv[2] || '.';
const files = [];
(function walk(d) {
  let ents; try { ents = fs.readdirSync(d, { withFileTypes: true }); } catch (e) { return; }
  for (const e of ents) {
    if (['node_modules', '.git', 'dist', 'build', '.next', 'coverage', 'storybook-static'].includes(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (exts.has(path.extname(e.name))) files.push(p);
  }
})(root);

// Extract the opening tag starting at index i (pointing at '<'), tolerating nested {} and strings.
function openTag(s, i) {
  let depth = 0, j = i + 1, inS = null;
  while (j < s.length) {
    const c = s[j];
    if (inS) {
      if (c === BS) { j += 2; continue; }
      if (c === inS) inS = null;
      j++; continue;
    }
    if (c === '"' || c === "'" || c === '`') { inS = c; j++; continue; }
    if (c === '{') depth++;
    else if (c === '}') depth--;
    else if (c === '>' && depth === 0) return { tag: s.slice(i, j + 1), end: j };
    j++;
  }
  return null;
}

function elementBody(s, startEnd) {
  // naive: nearest closing </Alert>; Alerts are not nested in practice
  const close = s.indexOf('</Alert>', startEnd);
  return close === -1 ? '' : s.slice(startEnd + 1, close);
}

const res = [];
for (const f of files) {
  let s; try { s = fs.readFileSync(f, 'utf8'); } catch (e) { continue; }
  const re = /<Alert(?=[\s/>])/g; let m;
  while ((m = re.exec(s))) {
    const ot = openTag(s, m.index); if (!ot) continue;
    const tag = ot.tag;
    const selfClosing = /\/>\s*$/.test(tag);
    const body = selfClosing ? '' : elementBody(s, ot.end);
    // isolate the action= prop value (balanced braces)
    let actionVal = null;
    const ai = tag.search(/[\s{]action\s*=/);
    if (ai !== -1) {
      const braceStart = tag.indexOf('{', ai);
      if (braceStart !== -1) {
        let d = 0, k = braceStart;
        for (; k < tag.length; k++) {
          if (tag[k] === '{') d++;
          else if (tag[k] === '}') { d--; if (d === 0) { k++; break; } }
        }
        actionVal = tag.slice(braceStart, k);
      }
    }
    res.push({
      file: f.replace(/\\/g, '/'),
      hasAction: ai !== -1,
      actionVal,
      hasOnClose: /[\s{]onClose\s*=/.test(tag),
      severity: (tag.match(/severity\s*=\s*["']([a-zA-Z]+)["']/) || [])[1] || (/severity\s*=\s*\{/.test(tag) ? '{dynamic}' : null),
      variant: (tag.match(/variant\s*=\s*["']([a-zA-Z]+)["']/) || [])[1] || (/variant\s*=\s*\{/.test(tag) ? '{dynamic}' : null),
      hasTitleChild: /<AlertTitle[\s/>]/.test(body),
      tag: tag.replace(/\s+/g, ' '),
      body: body.slice(0, 600)
    });
  }
}
fs.writeFileSync('alerts.json', JSON.stringify(res, null, 1));

const uf = a => new Set(a.map(r => r.file)).size;
console.log('scanned source files:', files.length);
console.log('Alert ELEMENTS:', res.length);
console.log('Alert FILES:', uf(res));
console.log('action= -> files:', uf(res.filter(r => r.hasAction)), 'elements:', res.filter(r => r.hasAction).length);
console.log('onClose= -> files:', uf(res.filter(r => r.hasOnClose)), 'elements:', res.filter(r => r.hasOnClose).length);
console.log('BOTH on one element:', res.filter(r => r.hasAction && r.hasOnClose).length);
res.filter(r => r.hasAction && r.hasOnClose).forEach(r => console.log('   BOTH:', r.file));
console.log('AlertTitle child -> files:', uf(res.filter(r => r.hasTitleChild)), 'elements:', res.filter(r => r.hasTitleChild).length);
console.log('AlertTitle + action:', res.filter(r => r.hasTitleChild && r.hasAction).length);
