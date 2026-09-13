const fs = require('fs');
const all = JSON.parse(fs.readFileSync('bg-scan.json', 'utf8')).filter(r => !r.story && !r.test);
const uf = a => new Set(a.map(r => r.file)).size;
const hasP = (r, p) => new RegExp('(?:^|[\\s{])' + p + '(?:\\s*=|(?=[\\s/>]))').test(r.props);
function litVal(r, p) {
  const m = r.props.match(new RegExp('(?:^|[\\s{])' + p + '\\s*=\\s*("([^"]*)"|\'([^\']*)\')'));
  return m ? (m[2] !== undefined ? m[2] : m[3]) : null;
}
const bg = all.filter(r => r.tag === 'ButtonGroup');
console.log('ButtonGroup: ' + bg.length + ' el / ' + uf(bg) + ' files');

console.log('\n=== props on ButtonGroup ===');
['variant', 'size', 'color', 'orientation', 'disableElevation', 'fullWidth', 'disabled', 'sx', 'aria-label', 'ref', 'className'].forEach(p => {
  const m = bg.filter(r => hasP(r, p));
  if (m.length) {
    const v = {}; m.forEach(r => { const x = litVal(r, p); v[x || '{expr}'] = (v[x || '{expr}'] || 0) + 1; });
    console.log('  ' + p.padEnd(18) + String(m.length).padStart(3) + ' el / ' + String(uf(m)).padStart(2) + ' files   ' + JSON.stringify(v));
  }
});
const unset = p => bg.filter(r => !hasP(r, p)).length;
console.log('  -- unset: variant ' + unset('variant') + ', size ' + unset('size') + ', color ' + unset('color') + ', orientation ' + unset('orientation'));

console.log('\n=== how many children per group ===');
const counts = {};
let mapped = 0;
bg.forEach(r => {
  const b = r.body || '';
  if (/\.map\s*\(/.test(b)) { mapped++; return; }
  const n = (b.match(/<Button(?=[\s/>])/g) || []).length;
  counts[n] = (counts[n] || 0) + 1;
});
console.log('  built with .map(): ' + mapped);
Object.keys(counts).map(Number).sort((a, b) => a - b).forEach(k => console.log('  ' + k + ' literal Button children: ' + counts[k] + ' groups'));

console.log('\n=== what sits inside the group ===');
const t = {};
bg.forEach(r => { const b = r.body || ''; (b.match(/<([A-Z][A-Za-z0-9_.]*)/g) || []).map(x => x.slice(1)).forEach(n => { t[n] = (t[n] || 0) + 1; }); });
Object.entries(t).sort((a, b) => b[1] - a[1]).slice(0, 14).forEach(([k, v]) => console.log('  ' + String(v).padStart(3) + '  <' + k + '>'));

console.log('\n=== per-child props (are children individually varied?) ===');
let childVariant = 0, childColor = 0, childDisabled = 0, childSelectedish = 0, childStartIcon = 0;
bg.forEach(r => {
  const b = r.body || '';
  if (/<Button[^>]*variant\s*=/.test(b)) childVariant++;
  if (/<Button[^>]*color\s*=/.test(b)) childColor++;
  if (/<Button[^>]*disabled/.test(b)) childDisabled++;
  if (/<Button[^>]*(startIcon|endIcon)/.test(b)) childStartIcon++;
  if (/aria-pressed|selected|isActive|active/.test(b)) childSelectedish++;
});
console.log('  groups whose child Buttons set variant: ' + childVariant);
console.log('  groups whose child Buttons set color:   ' + childColor);
console.log('  groups with a disabled child:           ' + childDisabled);
console.log('  groups with an icon on a child:         ' + childStartIcon);
console.log('  groups showing selection state:         ' + childSelectedish);

console.log('\n=== files ===');
bg.forEach(r => console.log('  ' + r.file + ':' + r.line + '   ' + r.props.trim().slice(0, 110)));
