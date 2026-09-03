// What production actually puts inside the Autocomplete open surface.
const fs = require('fs');
const rows = JSON.parse(fs.readFileSync('autocomplete-scan.json', 'utf8')).filter(r => !r.story && !r.test);
const uf = a => new Set(a.map(r => r.file)).size;

// pull a prop's full brace-balanced expression out of the raw tag
function expr(raw, p) {
  const i = raw.search(new RegExp('(?:^|[\\s{])' + p + '\\s*=\\s*\\{'));
  if (i === -1) return null;
  const b = raw.indexOf('{', i);
  let d = 0, k = b;
  for (; k < raw.length; k++) {
    if (raw[k] === '{') d++;
    else if (raw[k] === '}') { d--; if (d === 0) { k++; break; } }
  }
  return raw.slice(b, k);
}
const elems = v => (v.match(/<([A-Z][A-Za-z0-9_.]*)/g) || []).map(t => t.slice(1));

console.log('=== renderOption: what an option row is built from ===');
const ro = rows.map(r => ({ r, e: expr(r.raw, 'renderOption') })).filter(x => x.e);
console.log('elements with renderOption:', ro.length, '| files:', uf(ro.map(x => x.r)));
const tally = {};
ro.forEach(x => new Set(elems(x.e)).forEach(n => tally[n] = (tally[n] || 0) + 1));
Object.entries(tally).sort((a, b) => b[1] - a[1]).slice(0, 22)
  .forEach(([k, v]) => console.log('  ' + String(v).padStart(3) + '  <' + k + '>'));
const roCheckbox = ro.filter(x => /<Checkbox/.test(x.e));
console.log('  -> renderOption containing a Checkbox:', roCheckbox.length, 'elements /', uf(roCheckbox.map(x => x.r)), 'files');
const roPlain = ro.filter(x => elems(x.e).length === 0);
console.log('  -> renderOption with NO component (plain li/text):', roPlain.length);

console.log('\n=== renderTags: how selected values render ===');
const rt = rows.map(r => ({ r, e: expr(r.raw, 'renderTags') })).filter(x => x.e);
console.log('elements with renderTags:', rt.length, '| files:', uf(rt.map(x => x.r)));
const t2 = {};
rt.forEach(x => new Set(elems(x.e)).forEach(n => t2[n] = (t2[n] || 0) + 1));
Object.entries(t2).sort((a, b) => b[1] - a[1]).slice(0, 15).forEach(([k, v]) => console.log('  ' + String(v).padStart(3) + '  <' + k + '>'));

console.log('\n=== multiple + how tags are handled ===');
const hasP = (r, p) => new RegExp('(?:^|[\\s{])' + p + '(?:\\s*=|(?=[\\s/>]))').test(r.props);
const multi = rows.filter(r => hasP(r, 'multiple'));
console.log('multiple:', multi.length, 'elements /', uf(multi), 'files');
console.log('  multiple + renderTags:', multi.filter(r => expr(r.raw, 'renderTags')).length);
console.log('  multiple + default Chip tags (no renderTags):', multi.filter(r => !expr(r.raw, 'renderTags')).length);
console.log('  multiple + disableCloseOnSelect:', multi.filter(r => hasP(r, 'disableCloseOnSelect')).length);
console.log('  multiple + limitTags:', multi.filter(r => hasP(r, 'limitTags')).length);
const limitVals = {};
rows.forEach(r => { const e = expr(r.raw, 'limitTags'); if (e) limitVals[e] = (limitVals[e] || 0) + 1; });
console.log('  limitTags values:', JSON.stringify(limitVals));
console.log('  single-select (no multiple):', rows.length - multi.length, 'elements');
console.log('  single-select WITH a checkbox in renderOption:',
  rows.filter(r => !hasP(r, 'multiple') && /<Checkbox/.test(expr(r.raw, 'renderOption') || '')).length);

console.log('\n=== the open surface: Paper / Listbox / popper ===');
['PaperComponent', 'ListboxComponent', 'slotProps', 'componentsProps', 'disablePortal', 'open', 'popupIcon', 'forcePopupIcon'].forEach(p => {
  const m = rows.filter(r => hasP(r, p));
  if (m.length) console.log('  ' + p + ': ' + m.length + ' el / ' + uf(m) + ' files');
});
rows.filter(r => expr(r.raw, 'PaperComponent')).forEach(r =>
  console.log('    PaperComponent -> ' + r.file + ':' + r.line + '  ' + expr(r.raw, 'PaperComponent')));
rows.filter(r => expr(r.raw, 'ListboxComponent')).forEach(r =>
  console.log('    ListboxComponent -> ' + r.file + ':' + r.line + '  ' + expr(r.raw, 'ListboxComponent')));

console.log('\n=== renderInput: what the closed field is ===');
const ri = rows.map(r => ({ r, e: expr(r.raw, 'renderInput') })).filter(x => x.e);
const t3 = {};
ri.forEach(x => new Set(elems(x.e)).forEach(n => t3[n] = (t3[n] || 0) + 1));
Object.entries(t3).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([k, v]) => console.log('  ' + String(v).padStart(3) + '  <' + k + '>'));

console.log('\n=== groupBy (grouped option lists) ===');
rows.filter(r => hasP(r, 'groupBy')).forEach(r => console.log('  ' + r.file + ':' + r.line));
