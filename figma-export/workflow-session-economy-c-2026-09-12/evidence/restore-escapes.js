// Restore the JSON \u escapes on the proofArchive line that JSON.stringify wrote as literal characters,
// so the catalog diff is additions only.
const fs = require('fs');
const file = 'C:/Code/design system/workflow/check-catalog.json';
const text = fs.readFileSync(file, 'utf8');
const bs = String.fromCharCode(92);
const literal = 'PROOF \u2014 <batch> \u00b7 <what>';
const escaped = `PROOF ${bs}u2014 <batch> ${bs}u00b7 <what>`;
if (text.split(literal).length !== 2) throw new Error('proofArchive anchor not found exactly once');
fs.writeFileSync(file, text.replace(literal, escaped));
JSON.parse(fs.readFileSync(file, 'utf8'));
console.log('restored escapes on the proofArchive line');
