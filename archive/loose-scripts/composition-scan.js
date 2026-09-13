// Balanced-brace JSX element scanner with import-source resolution.
// Usage: node composition-scan.js <Tag1,Tag2,...> [outfile]
const fs = require('fs'), path = require('path');
const BS = String.fromCharCode(92);
const ROOT = 'C:/Code/web-app-v2/packages';
const exts = new Set(['.tsx', '.ts', '.jsx', '.js']);
const SKIP = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'coverage', 'storybook-static', 'lib', 'es']);
const slash = s => s.split(BS).join('/');
const LT = String.fromCharCode(60); // '<' — TSX generic type args

const files = [];
(function walk(d) {
  let ents; try { ents = fs.readdirSync(d, { withFileTypes: true }); } catch (e) { return; }
  for (const e of ents) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (exts.has(path.extname(e.name))) files.push(p);
  }
})(ROOT);

// --- skip a TSX generic type argument list: <Autocomplete<PatientSummaryObj> ... >
// Returns the index just past the closing '>' of the generic, or the input index if none.
function skipGeneric(s, j) {
  if (s[j] !== '<') return j;
  let depth = 0, k = j;
  while (k < s.length) {
    const c = s[k];
    if (c === '<') depth++;
    else if (c === '>') { depth--; if (depth === 0) return k + 1; }
    else if (c === '{' || c === '}' || c === ';') return j; // not a generic after all
    k++;
  }
  return j;
}

// --- opening tag extraction: tolerate nested {}, strings, template literals
function openTag(s, i, nameLen) {
  let depth = 0, j = i + 1, inS = null;
  if (nameLen) j = skipGeneric(s, i + 1 + nameLen);
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

// --- body extraction honouring same-tag nesting
function bodyOf(s, tagName, startEnd) {
  const esc = tagName.split('.').join('[.]');
  const openRe = new RegExp('<' + esc + '(?=[\\s/>' + LT + '])', 'g');
  const closeTok = '</' + tagName + '>';
  let depth = 1, k = startEnd + 1;
  while (k < s.length) {
    const nc = s.indexOf(closeTok, k);
    if (nc === -1) return { body: '', end: -1 };
    openRe.lastIndex = k;
    let no = -1, m;
    while ((m = openRe.exec(s))) {
      if (m.index >= nc) break;
      const ot = openTag(s, m.index, tagName.length);
      if (ot && !/\/>\s*$/.test(ot.tag)) { no = m.index; }
      break;
    }
    if (no !== -1 && no < nc) { depth++; k = no + tagName.length + 1; continue; }
    depth--;
    if (depth === 0) return { body: s.slice(startEnd + 1, nc), end: nc };
    k = nc + closeTok.length;
  }
  return { body: '', end: -1 };
}

// --- top-level props only: blank out every {...} so nested-element props cannot leak
function topLevelProps(tag) {
  let out = '', depth = 0, inS = null;
  for (let i = 0; i < tag.length; i++) {
    const c = tag[i];
    if (inS) { if (c === inS) inS = null; out += depth === 0 ? c : ' '; continue; }
    if (depth === 0 && (c === '"' || c === "'")) { inS = c; out += c; continue; }
    if (c === '{') { depth++; out += ' '; continue; }
    if (c === '}') { depth--; out += ' '; continue; }
    out += depth === 0 ? c : ' ';
  }
  return out;
}

// --- imports: local name -> module specifier
function imports(s) {
  const map = {};
  const re = /import\s+([^'"]*?)\s*from\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(s))) {
    const clause = m[1], src = m[2];
    const named = clause.match(/\{([\s\S]*?)\}/);
    if (named) named[1].split(',').forEach(part => {
      const t = part.trim(); if (!t) return;
      const as = t.split(/\s+as\s+/);
      map[(as[1] || as[0]).trim()] = src;
    });
    const def = clause.replace(/\{[\s\S]*?\}/, '').replace(/^\s*,|,\s*$/g, '').trim();
    if (def && !def.startsWith('*')) map[def] = src;
    const ns = clause.match(/\*\s+as\s+(\w+)/);
    if (ns) map[ns[1]] = src;
  }
  return map;
}

const isStory = f => /[\\/]stories[\\/]/.test(slash(f)) || /\.stories\.|\.example\.|\.pattern\./.test(f);
const isTest = f => /\.test\.|\.spec\.|__tests__/.test(f);
const pkgOf = f => (slash(f).match(/packages\/([^/]+)\//) || [])[1] || '?';

const TAGS = (process.argv[2] || '').split(',').map(t => t.trim()).filter(Boolean);
const out = [];
let scanned = 0;
for (const f of files) {
  let s; try { s = fs.readFileSync(f, 'utf8'); } catch (e) { continue; }
  scanned++;
  let imp = null;
  for (const tag of TAGS) {
    const esc = tag.split('.').join('[.]');
    const re = new RegExp('<' + esc + '(?=[\\s/>' + LT + '])', 'g');
    let m;
    while ((m = re.exec(s))) {
      const ot = openTag(s, m.index, tag.length); if (!ot) continue;
      if (imp === null) imp = imports(s);
      const selfClosing = /\/>\s*$/.test(ot.tag);
      const b = selfClosing ? { body: '' } : bodyOf(s, tag, ot.end);
      out.push({
        file: slash(f).replace('C:/Code/web-app-v2/packages/', ''),
        pkg: pkgOf(f), tag, from: imp[tag.split('.')[0]] || '(local/undeclared)',
        story: isStory(f), test: isTest(f), selfClosing,
        line: s.slice(0, m.index).split('\n').length,
        raw: ot.tag.replace(/\s+/g, ' '),
        props: topLevelProps(ot.tag).replace(/\s+/g, ' '),
        body: (b.body || '').slice(0, 2000)
      });
    }
  }
}
const outfile = process.argv[3] || 'scan-out.json';
fs.writeFileSync(outfile, JSON.stringify(out, null, 1));
console.log('source files scanned:', scanned);
const prod = out.filter(r => !r.story && !r.test);
const uf = a => new Set(a.map(r => r.file)).size;
for (const tag of TAGS) {
  const all = out.filter(r => r.tag === tag), p = prod.filter(r => r.tag === tag);
  console.log(`${tag.padEnd(26)} PROD files ${String(uf(p)).padStart(4)} / elements ${String(p.length).padStart(4)}   |  incl stories+tests: ${uf(all)} / ${all.length}`);
}
console.log('\n--- import sources (production only) ---');
const bySrc = {};
prod.forEach(r => { const k = r.tag + '  <- ' + r.from; bySrc[k] = (bySrc[k] || 0) + 1; });
Object.entries(bySrc).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${String(v).padStart(4)}  ${k}`));
