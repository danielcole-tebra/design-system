const fs = require('fs');
const all = JSON.parse(fs.readFileSync('select-scan.json', 'utf8')).filter(r => !r.story && !r.test);
const uf = a => new Set(a.map(r => r.file)).size;
const hasP = (r, p) => new RegExp('(?:^|[\\s{])' + p + '(?:\\s*=|(?=[\\s/>]))').test(r.props);

const sel = all.filter(r => r.tag === 'Select');
const tfSel = all.filter(r => r.tag === 'TextField' && hasP(r, 'select'));
const menu = all.filter(r => r.tag === 'Menu');
const dropdowns = [...sel, ...tfSel];

// body was captured up to 2000 chars; count literal <MenuItem and detect .map(
function analyse(rows, label) {
  let mapped = 0, literalOnly = 0, none = 0;
  const literalCounts = {};
  rows.forEach(r => {
    const b = r.body || '';
    const lits = (b.match(/<MenuItem(?=[\s/>])/g) || []).length;
    const isMapped = /\.map\s*\(/.test(b);
    if (isMapped) mapped++;
    else if (lits > 0) { literalOnly++; literalCounts[lits] = (literalCounts[lits] || 0) + 1; }
    else none++;
  });
  console.log('\n=== ' + label + ' (' + rows.length + ' elements) ===');
  console.log('  items come from .map() over data : ' + mapped + '  (' + (mapped / rows.length * 100).toFixed(0) + '%)');
  console.log('  items written out literally      : ' + literalOnly);
  console.log('  no MenuItem in captured body     : ' + none + '  (body truncated at 2000 chars, or items live in a variable)');
  const ks = Object.keys(literalCounts).map(Number).sort((a, b) => a - b);
  if (ks.length) {
    console.log('  literal item counts: ' + ks.map(k => k + ' item' + (k > 1 ? 's' : '') + ' x' + literalCounts[k]).join(', '));
    const over4 = ks.filter(k => k > 4).reduce((s, k) => s + literalCounts[k], 0);
    const upto4 = ks.filter(k => k <= 4).reduce((s, k) => s + literalCounts[k], 0);
    console.log('  -> literal menus that fit Figma cap of 4: ' + upto4 + ' | exceed it: ' + over4);
  }
  return { mapped, literalOnly, none };
}
analyse(dropdowns, 'Select + TextField-select: how options are produced');
analyse(menu, 'Anchored Menu: how items are produced');

console.log('\n=== the Figma Menu cap of 4, against everything countable ===');
const allBodies = [...dropdowns, ...menu];
const mappedTotal = allBodies.filter(r => /\.map\s*\(/.test(r.body || '')).length;
console.log('  elements whose items are mapped (count unbounded at author time): ' + mappedTotal + ' of ' + allBodies.length);

console.log('\n=== MenuItem features the Figma Menu/Item cannot express ===');
const mi = all.filter(r => r.tag === 'MenuItem');
const feat = {
  'ListItemIcon (leading icon)': /<ListItemIcon(?=[\s/>])/,
  'ListItemText (two-line / primary+secondary)': /<ListItemText(?=[\s/>])/,
  'Checkbox (multi-select menu)': /<Checkbox(?=[\s/>])/,
  'CircularProgress (busy row)': /<CircularProgress(?=[\s/>])/,
  'Typography (styled label)': /<Typography(?=[\s/>])/
};
for (const [name, re] of Object.entries(feat)) {
  const m = mi.filter(r => re.test(r.body || ''));
  console.log('  ' + String(m.length).padStart(3) + ' el / ' + String(uf(m)).padStart(3) + ' files  ' + name);
}
const disabled = mi.filter(r => hasP(r, 'disabled'));
const selected = mi.filter(r => hasP(r, 'selected'));
console.log('  ' + String(disabled.length).padStart(3) + ' el / ' + String(uf(disabled)).padStart(3) + ' files  disabled prop  (component HAS this state)');
console.log('  ' + String(selected.length).padStart(3) + ' el / ' + String(uf(selected)).padStart(3) + ' files  selected prop  (component HAS this state)');
