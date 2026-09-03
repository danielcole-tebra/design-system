// apply-npve-sidesheet-correction.js — Step 1 of npveRebuild_sidesheet_build_2026-09-02. Additive only.
// Marks flag npveSidesheet_noOutlinedButton and the "Footer buttons" mapping row as superseded by the 2026-09-02 Button re-read,
// and adds a finding that figmaBuild.components.Button is stale. Nothing deleted.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-02-pre-sidesheet-correction.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const SUP = 'SUPERSEDED 2026-09-02 by the Button 79:2 re-read (figma-export/button-outlined-check-2026-09-02/report.md): the white pill with a 1px core.main stroke IS Button variant=contained, color=primary (78:14 medium, 78:2 small, 78:26 large), bound to color/common/white and color/core/main, matching containedPrimary in ButtonOverrides.ts. The outlined footer button therefore maps to the library; only the fullWidth axis and the 36-vs-38 height difference remain.';
const f = s.flags.find(x => x.id === 'npveSidesheet_noOutlinedButton'); if (!f) throw new Error('flag missing');
f.superseded = SUP; f.webAppV2BugListCandidate = false; f.handling = 'Superseded, see superseded field. Kept for the record.';
const b = s.npveRebuild_sidesheet_inventory_2026_09_02; const row = b.mapping.find(m => m.region.startsWith('Footer buttons')); if (!row) throw new Error('row missing');
row.superseded = SUP; row.verdictCorrected = 'DSR: text→variant=text color=primary (78:122); outlined→variant=contained color=primary (78:14); coral→variant=contained color=secondary (78:50).';
b.templateProposal.correction2026_09_02 = 'The third footer slot does not need an outlined variant; it is contained/primary.';
s.flags.push({ id: 'buttonSchemaEntryStale', severity: 'low', discoveredDuring: 'button-outlined-check-2026-09-02 (read-only)', summary: 'figmaBuild.components.Button says 54 variants with Sentence-case axes Variant/Color/Size/State; the set 79:2 read on 2026-09-02 has 72 variants (2 variant x 4 color x 3 size x 3 State) with lowercase code-cased axes variant/color/size/State.', where: 'design-system-schema.json figmaBuild.components.Button; library Button 79:2', detail: 'The inherit colour and the naming migration (namingConventionMigration2026_08_26b) post-date the entry. Left in place; corrected reading recorded here.', webAppV2BugListCandidate: false, handling: 'Reported. Update the entry in a schema-maintenance batch.' });
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('correction applied; flags', s.flags.length);
