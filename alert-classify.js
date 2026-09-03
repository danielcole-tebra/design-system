const fs = require('fs');
const res = JSON.parse(fs.readFileSync(process.argv[2] || 'alerts.json', 'utf8'));

// Read a prop off the Alert's OWN tag only: blank out every {...} expression first,
// so props belonging to nested elements (action={<Button variant="text"/>}) cannot leak.
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
for (const r of res) {
  const t = topLevelProps(r.tag);
  r.severity = (t.match(/severity\s*=\s*["']([a-zA-Z]+)["']/) || [])[1] || (/severity\s*=\s*\s/.test(t) && /severity\s*=/.test(r.tag) ? '{dynamic}' : (/severity\s*=/.test(r.tag) ? '{dynamic}' : null));
  r.variant = (t.match(/variant\s*=\s*["']([a-zA-Z]+)["']/) || [])[1] || (/variant\s*=/.test(r.tag) ? '{dynamic}' : null);
}

const WRAPPERS = /^(Box|Stack|Fragment|React|Typography|Grid|Container|Div|Span|Tooltip|Portal)$/;
function elems(v) { return (v.match(/<([A-Z][A-Za-z0-9_.]*)/g) || []).map(t => t.slice(1)); }
function interactiveElems(v) { return elems(v).filter(n => !WRAPPERS.test(n)); }

function classify(v) {
  const names = elems(v);
  const has = n => names.includes(n);
  const isClose = /Close/i.test(v) || /aria-label\s*=\s*["']close/i.test(v);
  if ((has('IconButton') || names.some(n => /Close/i.test(n))) && isClose) return 'close icon button (hand-rolled)';
  if (has('Button') || has('LoadingButton')) return 'text button';
  if (has('Link') || names.some(n => /Link/i.test(n))) return 'link';
  if (has('IconButton')) return 'icon button (non-close)';
  if (names.length === 0) return 'expression / no JSX';
  return 'other custom component';
}

const withAction = res.filter(r => r.hasAction && r.actionVal);
const detail = withAction.map(r => ({
  file: r.file, cls: classify(r.actionVal), n: interactiveElems(r.actionVal).length,
  severity: r.severity, variant: r.variant,
  sizeSmall: /size\s*=\s*["']small["']/.test(r.actionVal),
  textVariant: /variant\s*=\s*["']text["']/.test(r.actionVal),
  names: elems(r.actionVal).join(','),
  label: (r.actionVal.match(/>\s*([A-Za-z][A-Za-z 'â€™]{1,30}?)\s*</) || [])[1]
}));

const fcount = pred => new Set(detail.filter(pred).map(d => d.file)).size;
console.log('=== ACTION SHAPES ===');
const b = {}; detail.forEach(d => b[d.cls] = (b[d.cls] || 0) + 1);
Object.entries(b).sort((a, c) => c[1] - a[1]).forEach(([k, v]) =>
  console.log(`  ${String(v).padStart(3)} el / ${String(fcount(d => d.cls === k)).padStart(3)} files  ${k}`));

console.log('\n=== INTERACTIVE ELEMENTS PER SLOT ===');
const ic = {}; detail.forEach(d => ic[d.n] = (ic[d.n] || 0) + 1);
Object.entries(ic).sort().forEach(([k, v]) => console.log(`  ${k}: ${v} elements`));

const tb = detail.filter(d => d.cls === 'text button');
console.log('\n=== TEXT BUTTON ===');
console.log('  total', tb.length, '| size=small', tb.filter(d => d.sizeSmall).length, '| variant=text', tb.filter(d => d.textVariant).length);
const L = {}; tb.forEach(d => { if (d.label) L[d.label.trim()] = (L[d.label.trim()] || 0) + 1; });
console.log('  labels:', Object.entries(L).sort((a, c) => c[1] - a[1]).map(([k, v]) => `${k}(${v})`).join(', '));

console.log('\n=== ACTION-BEARING: variant / severity ===');
const sv = {}; detail.forEach(d => { const k = `${d.variant || 'standard (default)'} / ${d.severity || 'info (default)'}`; sv[k] = (sv[k] || 0) + 1; });
Object.entries(sv).sort((a, c) => c[1] - a[1]).forEach(([k, v]) => console.log(`  ${String(v).padStart(3)}  ${k}`));

console.log('\n=== ALL Alerts: variant ===');
const av = {}; res.forEach(r => { const k = r.variant || 'standard (default)'; av[k] = (av[k] || 0) + 1; });
Object.entries(av).sort((a, c) => c[1] - a[1]).forEach(([k, v]) => console.log(`  ${String(v).padStart(3)}  ${k}`));
console.log('\n=== ALL Alerts: severity ===');
const as = {}; res.forEach(r => { const k = r.severity || 'info (default)'; as[k] = (as[k] || 0) + 1; });
Object.entries(as).sort((a, c) => c[1] - a[1]).forEach(([k, v]) => console.log(`  ${String(v).padStart(3)}  ${k}`));

console.log('\noutlined WITH action:', detail.filter(d => d.variant === 'outlined').length);
console.log('outlined total elements:', res.filter(r => r.variant === 'outlined').length);
console.log('\n=== AlertTitle files ===');
res.filter(r => r.hasTitleChild).forEach(r => console.log('  ', r.file, '| variant:', r.variant || 'standard(default)', '| severity:', r.severity || 'info(default)', '| action:', r.hasAction));
fs.writeFileSync('alert-detail.json', JSON.stringify(detail, null, 1));
