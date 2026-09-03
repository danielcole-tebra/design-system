const fs = require('fs');
const all = JSON.parse(fs.readFileSync('select-scan.json', 'utf8')).filter(r => !r.story && !r.test);
const uf = a => new Set(a.map(r => r.file)).size;
const hasP = (r, p) => new RegExp('(?:^|[\\s{])' + p + '(?:\\s*=|(?=[\\s/>]))').test(r.props);
function litVal(r, p) {
  const m = r.props.match(new RegExp('(?:^|[\\s{])' + p + '\\s*=\\s*("([^"]*)"|\'([^\']*)\')'));
  return m ? (m[2] !== undefined ? m[2] : m[3]) : null;
}
function expr(raw, p) {
  const i = raw.search(new RegExp('(?:^|[\\s{])' + p + '\\s*=\\s*\\{'));
  if (i === -1) return null;
  const b = raw.indexOf('{', i);
  let d = 0, k = b;
  for (; k < raw.length; k++) { if (raw[k] === '{') d++; else if (raw[k] === '}') { d--; if (d === 0) { k++; break; } } }
  return raw.slice(b, k);
}
const elems = v => (v.match(/<([A-Z][A-Za-z0-9_.]*)/g) || []).map(t => t.slice(1));

const sel = all.filter(r => r.tag === 'Select');
const tf = all.filter(r => r.tag === 'TextField');
const tfSel = tf.filter(r => hasP(r, 'select'));
const menu = all.filter(r => r.tag === 'Menu');
const mi = all.filter(r => r.tag === 'MenuItem');

console.log('=== THE TWO WAYS TO DRAW A SELECT ===');
console.log('  <Select>            ' + sel.length + ' el / ' + uf(sel) + ' files');
console.log('  <TextField select>  ' + tfSel.length + ' el / ' + uf(tfSel) + ' files');
console.log('  combined distinct files: ' + new Set([...sel, ...tfSel].map(r => r.file)).size);
console.log('  (all TextField, for scale: ' + tf.length + ' el / ' + uf(tf) + ' files)');
console.log('\n=== THE ANCHORED MENU (a different thing) ===');
console.log('  <Menu>      ' + menu.length + ' el / ' + uf(menu) + ' files');
console.log('  <MenuItem>  ' + mi.length + ' el / ' + uf(mi) + ' files');
const menuFiles = new Set(menu.map(r => r.file));
const selFiles = new Set([...sel, ...tfSel].map(r => r.file));
console.log('  files with BOTH a Select and a Menu: ' + [...menuFiles].filter(f => selFiles.has(f)).length);
const miInSel = mi.filter(r => selFiles.has(r.file));
const miInMenu = mi.filter(r => menuFiles.has(r.file));
console.log('  MenuItem in Select-bearing files: ' + miInSel.length + ' el / ' + uf(miInSel) + ' files');
console.log('  MenuItem in Menu-bearing files:   ' + miInMenu.length + ' el / ' + uf(miInMenu) + ' files');
console.log('  MenuItem in files with NEITHER:    ' + mi.filter(r => !selFiles.has(r.file) && !menuFiles.has(r.file)).length);

console.log('\n=== Select props ===');
['multiple', 'native', 'renderValue', 'displayEmpty', 'size', 'variant', 'MenuProps', 'label', 'labelId', 'value', 'onChange', 'disabled', 'error', 'fullWidth', 'IconComponent', 'defaultValue', 'sx', 'readOnly', 'inputProps', 'open'].forEach(p => {
  const m = sel.filter(r => hasP(r, p));
  if (m.length) console.log('  ' + p.padEnd(14) + m.length + ' el / ' + uf(m) + ' files');
});
for (const p of ['size', 'variant']) {
  const v = {}; sel.forEach(r => { const x = litVal(r, p); if (x) v[x] = (v[x] || 0) + 1; });
  if (Object.keys(v).length) console.log('  ' + p + ' values: ' + JSON.stringify(v));
}

console.log('\n=== TextField select props ===');
['size', 'variant', 'SelectProps', 'label', 'fullWidth', 'disabled', 'error', 'required', 'helperText'].forEach(p => {
  const m = tfSel.filter(r => hasP(r, p));
  if (m.length) console.log('  ' + p.padEnd(14) + m.length + ' el / ' + uf(m) + ' files');
});
for (const p of ['size', 'variant']) {
  const v = {}; tfSel.forEach(r => { const x = litVal(r, p); if (x) v[x] = (v[x] || 0) + 1; });
  if (Object.keys(v).length) console.log('  ' + p + ' values: ' + JSON.stringify(v));
}

console.log('\n=== Menu props ===');
['anchorEl', 'open', 'onClose', 'anchorOrigin', 'transformOrigin', 'PaperProps', 'slotProps', 'MenuListProps', 'keepMounted', 'elevation', 'sx'].forEach(p => {
  const m = menu.filter(r => hasP(r, p));
  if (m.length) console.log('  ' + p.padEnd(16) + m.length + ' el / ' + uf(m) + ' files');
});

console.log('\n=== what is inside a MenuItem ===');
const t = {};
mi.forEach(r => { if (r.body) new Set(elems(r.body)).forEach(n => t[n] = (t[n] || 0) + 1); });
Object.entries(t).sort((a, b) => b[1] - a[1]).slice(0, 16).forEach(([k, v]) => console.log('  ' + String(v).padStart(4) + '  <' + k + '>'));
const plain = mi.filter(r => r.body && elems(r.body).length === 0);
console.log('  MenuItems whose body has no component (plain text/expr): ' + plain.length + ' of ' + mi.length);

console.log('\n=== ListSubheader (group headings in menus) ===');
const ls = all.filter(r => r.tag === 'ListSubheader');
console.log('  ' + ls.length + ' el / ' + uf(ls) + ' files');
ls.forEach(r => console.log('    ' + r.file + ':' + r.line));
