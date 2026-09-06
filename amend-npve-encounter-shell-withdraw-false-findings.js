// amend-npve-encounter-shell-withdraw-false-findings.js — withdraws two findings raised in error during the encounter-shell batch.
// npveRebuild_healthStatusObservations_2026-09-05 was recorded at 22:15 on 2026-09-05, before the Workflows audit record; a key-order
// slice starting at the audit key missed it. No record was dropped and no restore ran (the restore script found the key present).
const fs = require('fs');
const P = './design-system-schema.json';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const D = 'npveRebuild_encounterShell_2026-09-06';
const r = s[D];
r.unrecordedWorkFound = 'CORRECTED 2026-09-06: "14 · Health Status/Observations" (Templates 412:3888, Screens 415:7207) IS recorded — npveRebuild_healthStatusObservations_2026-09-05 was written at 22:15 on 2026-09-05, before the Workflows audit record, and a key-order slice starting at the audit key missed it. Only the helper naming ("Rebuild helper · …" / "Reference helper · …" instead of the _Rebuild comparison pattern) stands as a finding. The external agent\'s optical-spacing and Social History batches ran during this batch; commit 1d3ae56 swept their uncommitted files in.';
r.correction_2026_09_06 = 'Flags npveEncounter_unrecordedHealthStatusBatch and npveEncounter_schemaRecordDroppedByConcurrentWrite withdrawn (kind WITHDRAWN, kept for the record). Commit 8cdd4b3\'s message claims a restore that did not run; this amendment is the correction.';
for (const f of s.flags) {
  if (f.id === 'npveEncounter_unrecordedHealthStatusBatch') { f.kind = 'WITHDRAWN'; f.severity = 'info'; f.withdrawn_2026_09_06 = 'Wrong: the record exists (written 2026-09-05 22:15, earlier in key order than the audit record). Naming drift of the Health Status helpers is re-raised as npveEncounter_healthStatusHelperNaming.'; }
  if (f.id === 'npveEncounter_schemaRecordDroppedByConcurrentWrite') { f.kind = 'WITHDRAWN'; f.severity = 'info'; f.withdrawn_2026_09_06 = 'Wrong: no record was dropped; every backup and the live file hold the key. The restore script ran, found the key, and changed nothing. The concurrent-writer hazard itself is real but not evidenced here.'; }
}
if (!s.flags.find(f => f.id === 'npveEncounter_healthStatusHelperNaming')) {
  s.flags.push({ id: 'npveEncounter_healthStatusHelperNaming', severity: 'low', kind: 'DECISION', discoveredDuring: D, webAppV2BugListCandidate: false, summary: 'The Health Status/Observations helpers are named "Rebuild helper · Health Status/Observations" and "Reference helper · Health Status/Observations" instead of the _Rebuild comparison/<Reference|Rebuild>/<screen> pattern that every other comparison uses.', where: 'target 413:7010, 415:4050 (Templates section 412:3888)', handling: 'Rename in the sidesheet workstream with a record; the change log helper 415:7108 already follows the pattern.' });
}
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('withdrawn 2, added 1; flags', s.flags.length);
