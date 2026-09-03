// Generic prop/shape analyser over a composition-scan.js output file.
// Usage: node comp-analyze.js <scan.json> <Tag> <prop1,prop2,...>
const fs = require('fs');
const rows = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
  .filter(r => !r.story && !r.test)
  .filter(r => !process.argv[3] || r.tag === process.argv[3]);
const uf = a => new Set(a.map(r => r.file)).size;

// A prop is present if it appears at top level of the tag as `name=` or as a bare boolean.
function hasProp(r, p) {
  const re = new RegExp('(?:^|[\\s{])' + p + '(?:\\s*=|(?=[\\s/>]))');
  return re.test(r.props);
}
function propVal(r, p) {
  // r.props has every {...} expression blanked out, so nested-element props cannot leak in.
  const m = r.props.match(new RegExp('(?:^|[\\s{])' + p + '\\s*=\\s*("([^"]*)"|\'([^\']*)\'|\\{)'));
  if (!m) return hasProp(r, p) ? '(bare true)' : null;
  if (m[2] !== undefined) return m[2];
  if (m[3] !== undefined) return m[3];
  return '{expr}';
}

const PROPS = (process.argv[4] || '').split(',').map(s => s.trim()).filter(Boolean);
console.log('PROD elements:', rows.length, '| files:', uf(rows));

console.log('\n=== prop presence (elements / files) ===');
PROPS.map(p => { const m = rows.filter(r => hasProp(r, p)); return [p, m.length, uf(m)]; })
  .sort((a, b) => b[1] - a[1])
  .forEach(([p, e, f]) => console.log('  ' + String(e).padStart(4) + ' el / ' + String(f).padStart(3) + ' files  ' + p));

console.log('\n=== literal values, where the prop is a string/enum ===');
for (const p of PROPS) {
  const vals = {};
  rows.forEach(r => { const v = propVal(r, p); if (v && v !== '{expr}' && v !== '(bare true)') vals[v] = (vals[v] || 0) + 1; });
  const e = Object.entries(vals).sort((a, b) => b[1] - a[1]);
  if (e.length) console.log('  ' + p + ': ' + e.map(([k, v]) => k + '(' + v + ')').join(', '));
}

console.log('\n=== per-package spread ===');
const pk = {};
rows.forEach(r => pk[r.pkg] = (pk[r.pkg] || 0) + 1);
Object.entries(pk).sort((a, b) => b[1] - a[1]).slice(0, 15).forEach(([k, v]) => console.log('  ' + String(v).padStart(4) + '  ' + k));
module.exports = { rows, hasProp, propVal, uf };
