const fs = require('fs');
const all = JSON.parse(fs.readFileSync('table-scan.json', 'utf8')).filter(r => !r.story && !r.test);
const uf = a => new Set(a.map(r => r.file)).size;
const hasP = (r, p) => new RegExp('(?:^|[\\s{])' + p + '(?:\\s*=|(?=[\\s/>]))').test(r.props);
function litVal(r, p) {
  const m = r.props.match(new RegExp('(?:^|[\\s{])' + p + '\\s*=\\s*("([^"]*)"|\'([^\']*)\')'));
  return m ? (m[2] !== undefined ? m[2] : m[3]) : null;
}
const byTag = t => all.filter(r => r.tag === t);
const files = t => new Set(byTag(t).map(r => r.file));

const tableF = files('Table'), cellF = files('TableCell'), rowF = files('TableRow'),
  headF = files('TableHead'), bodyF = files('TableBody'), contF = files('TableContainer');

console.log('=== the composition proper ===');
['Table', 'TableContainer', 'TableHead', 'TableBody', 'TableRow', 'TableCell', 'TableSortLabel'].forEach(t => {
  const r = byTag(t);
  console.log('  ' + t.padEnd(16) + String(r.length).padStart(4) + ' el / ' + String(uf(r)).padStart(3) + ' files');
});

console.log('\n=== cells and rows outside a <Table> ===');
const cellNoTable = [...cellF].filter(f => !tableF.has(f));
const rowNoTable = [...rowF].filter(f => !tableF.has(f));
console.log('  files with TableCell but no <Table>: ' + cellNoTable.length);
console.log('  files with TableRow  but no <Table>: ' + rowNoTable.length);
cellNoTable.slice(0, 14).forEach(f => console.log('    ' + f));

console.log('\n=== does a <Table> always sit in a TableContainer? ===');
console.log('  <Table> files: ' + tableF.size + ' | TableContainer files: ' + contF.size);
console.log('  <Table> WITHOUT a TableContainer in the same file: ' + [...tableF].filter(f => !contF.has(f)).length);
[...tableF].filter(f => !contF.has(f)).forEach(f => console.log('    ' + f));

console.log('\n=== head / body presence, per <Table> file ===');
console.log('  Table files with a TableHead: ' + [...tableF].filter(f => headF.has(f)).length + ' of ' + tableF.size);
console.log('  Table files with a TableBody: ' + [...tableF].filter(f => bodyF.has(f)).length + ' of ' + tableF.size);

console.log('\n=== props ===');
for (const [tag, props] of [
  ['Table', ['size', 'stickyHeader', 'sx', 'aria-label', 'padding']],
  ['TableCell', ['align', 'padding', 'size', 'colSpan', 'component', 'scope', 'sortDirection', 'width', 'sx']],
  ['TableRow', ['hover', 'selected', 'onClick', 'sx', 'key']],
  ['TableContainer', ['component', 'sx']]
]) {
  console.log('  --- <' + tag + '> ---');
  const rows = byTag(tag);
  props.forEach(p => {
    const m = rows.filter(r => hasP(r, p));
    if (!m.length) return;
    const v = {}; m.forEach(r => { const x = litVal(r, p); v[x || '{expr}'] = (v[x || '{expr}'] || 0) + 1; });
    console.log('    ' + p.padEnd(14) + String(m.length).padStart(4) + ' el / ' + String(uf(m)).padStart(3) + ' files  ' + JSON.stringify(v));
  });
}

console.log('\n=== what a TableCell holds ===');
const t = {};
byTag('TableCell').forEach(r => { (String(r.body || '').match(/<([A-Z][A-Za-z0-9_.]*)/g) || []).map(x => x.slice(1)).forEach(n => t[n] = (t[n] || 0) + 1); });
Object.entries(t).sort((a, b) => b[1] - a[1]).slice(0, 16).forEach(([k, v]) => console.log('  ' + String(v).padStart(4) + '  <' + k + '>'));
const plain = byTag('TableCell').filter(r => !/[<]/.test(String(r.body || '')));
console.log('  cells whose body is plain text/expression: ' + plain.length + ' of ' + byTag('TableCell').length);

console.log('\n=== the DataGrid comparison ===');
console.log('  (TablePagination prod files: ' + uf(byTag('TablePagination')) + ', TableFooter prod files: ' + uf(byTag('TableFooter')) + ')');
