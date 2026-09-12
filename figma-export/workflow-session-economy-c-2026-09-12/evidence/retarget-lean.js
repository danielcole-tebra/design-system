// The lean set becomes a reported target in the catalog; the component ceilings keep the hard stops.
const fs = require('fs');
const file = 'C:/Code/design system/workflow/check-catalog.json';
const text = fs.readFileSync(file, 'utf8');
const anchor = '    "leanSet": 128000,\n';
if (text.split(anchor).length !== 2) throw new Error('leanSet anchor not found exactly once');
const replacement = [
  '    "leanSet": {',
  '      "target": 128000,',
  '      "onBreach": "report on the validator line as leanOverTarget; the components above carry the hard stops, because the largest latest record may be an immutable DONE record"',
  '    },',
  ''
].join('\n');
fs.writeFileSync(file, text.replace(anchor, replacement));
const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
if (catalog.byteCeilings.leanSet.target !== 128000) throw new Error('retarget failed');
console.log('lean set is now a reported target of 128000');
