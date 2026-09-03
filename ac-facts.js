const fs = require('fs');
const rows = JSON.parse(fs.readFileSync('autocomplete-scan.json', 'utf8')).filter(r => !r.story && !r.test);
const uf = a => new Set(a.map(r => r.file)).size;
const hasP = (r, p) => new RegExp('(?:^|[\\s{])' + p + '(?:\\s*=|(?=[\\s/>]))').test(r.props);
function litVal(r, p) {
  const m = r.props.match(new RegExp('(?:^|[\\s{])' + p + '\\s*=\\s*("([^"]*)"|\'([^\']*)\')'));
  return m ? (m[2] !== undefined ? m[2] : m[3]) : null;
}
console.log('TOTAL prod: ' + rows.length + ' elements / ' + uf(rows) + ' files');

console.log('\n--- size ---');
const sized = rows.filter(r => hasP(r, 'size'));
console.log('  set size: ' + sized.length + ' el / ' + uf(sized) + ' files');
const sv = {};
sized.forEach(r => { const v = litVal(r, 'size') || '{expr}'; sv[v] = (sv[v] || 0) + 1; });
console.log('  values: ' + JSON.stringify(sv));
console.log('  UNSET (theme default medium): ' + (rows.length - sized.length) + ' el');

console.log('\n--- noOptionsText (theme default = "No results found") ---');
const nots = rows.filter(r => hasP(r, 'noOptionsText'));
console.log('  set: ' + nots.length + ' el / ' + uf(nots) + ' files -> every one overrides the theme default');
const nv = {};
nots.forEach(r => { const v = litVal(r, 'noOptionsText') || '{expr}'; nv[v] = (nv[v] || 0) + 1; });
Object.entries(nv).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log('    ' + v + '  "' + k + '"'));
const lits = Object.keys(nv).filter(k => k !== '{expr}');
console.log('  distinct literal strings: ' + lits.length);
console.log('  Title Case: ' + lits.filter(s => /^([A-Z][a-z]*\s?)+$/.test(s.replace(/\.$/, ''))).length +
  ' | sentence case: ' + lits.filter(s => /^[A-Z][a-z]+\s[a-z]/.test(s)).length +
  ' | ends with period: ' + lits.filter(s => /\.$/.test(s)).length);

console.log('\n--- selection mode ---');
const multi = rows.filter(r => hasP(r, 'multiple'));
const single = rows.filter(r => !hasP(r, 'multiple'));
console.log('  multiple: ' + multi.length + ' el / ' + uf(multi) + ' files');
console.log('  single:   ' + single.length + ' el / ' + uf(single) + ' files');

console.log('\n--- other axes ---');
['loading', 'disabled', 'open', 'forcePopupIcon', 'freeSolo', 'groupBy', 'disablePortal', 'autoHighlight', 'fullWidth', 'sx'].forEach(p => {
  const m = rows.filter(r => hasP(r, p));
  console.log('  ' + p.padEnd(16) + m.length + ' el / ' + uf(m) + ' files');
});
