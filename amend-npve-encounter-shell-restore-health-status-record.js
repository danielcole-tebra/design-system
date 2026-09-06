// amend-npve-encounter-shell-restore-health-status-record.js — restores npveRebuild_healthStatusObservations_2026-09-05, which the live
// schema lost between 07:11 and 07:20 on 2026-09-06 (present in every backup up to pre-npve-encounter-shell, absent after the social-history
// and encounter-shell applies ran). Re-inserted verbatim from the pre-npve-encounter-shell backup, in its original key position, with an
// annotation. Amends the encounter-shell flag to state the actual condition. Additive; nothing else changes.
const fs = require('fs');
const P = './design-system-schema.json';
const BK = './design-system-schema.backup-2026-09-06-pre-npve-encounter-shell.json';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const b = JSON.parse(fs.readFileSync(BK, 'utf8'));
const K = 'npveRebuild_healthStatusObservations_2026-09-05';
const before = Object.keys(s);
const bkKeys = Object.keys(b);
const missingFromLive = bkKeys.filter(k => !(k in s));
const newInLive = before.filter(k => !(k in b));
console.log('missing from live vs backup:', missingFromLive);
console.log('new in live vs backup:', newInLive);
if (!s[K] && b[K]) {
  const out = {};
  const anchor = 'npveRebuild_healthStatusObservationsOpticalSpacing_2026-09-06';
  for (const k of before) {
    if (k === anchor) { out[K] = b[K]; out[K].restored_2026_09_06 = 'Restored verbatim from ' + BK.slice(2) + ' by amend-npve-encounter-shell-restore-health-status-record.js after the live schema lost this key during concurrent writes on 2026-09-06 (present in the pre-optical-spacing, pre-social-history and pre-encounter-shell backups; absent after 07:20). See flag npveEncounter_schemaRecordDroppedByConcurrentWrite.'; }
    out[k] = s[k];
  }
  fs.writeFileSync(P, JSON.stringify(out, null, 1));
  console.log('restored', K, 'before', before.length, 'after', Object.keys(out).length);
} else {
  console.log('no restore needed: live has key =', !!s[K], '; backup has key =', !!b[K]);
}
// amend the flag and add the integrity finding
const s2 = JSON.parse(fs.readFileSync(P, 'utf8'));
const f = s2.flags.find(x => x.id === 'npveEncounter_unrecordedHealthStatusBatch');
if (f) {
  f.summary = 'A "14 · Health Status/Observations" section exists on Templates (412:3888) and Screens (415:7207); at this batch\'s first read no schema record was visible. The external agent\'s records arrived during the batch (optical spacing and Social History on 2026-09-06), and the base record npveRebuild_healthStatusObservations_2026-09-05 was then dropped from the live schema by a concurrent write and restored from backup. Its helpers are named "Rebuild helper · …" / "Reference helper · …" instead of the _Rebuild comparison pattern.';
  f.handling = 'Record restored (see npveEncounter_schemaRecordDroppedByConcurrentWrite). Helper naming to be aligned by the sidesheet workstream.';
}
if (!s2.flags.find(x => x.id === 'npveEncounter_schemaRecordDroppedByConcurrentWrite')) {
  s2.flags.push({ id: 'npveEncounter_schemaRecordDroppedByConcurrentWrite', severity: 'high', kind: 'DEFECT', discoveredDuring: 'npveRebuild_encounterShell_2026-09-06', webAppV2BugListCandidate: false, summary: 'Two agents wrote design-system-schema.json in the same hour (external sidesheet batches 06:57–07:12, encounter shell 07:20). The record npveRebuild_healthStatusObservations_2026-09-05 was present in every backup up to pre-npve-encounter-shell and absent from the live file afterwards; two later records cite it as their gate. Restored from backup.', where: 'design-system-schema.json; backups 2026-09-06-pre-health-status-optical-spacing, pre-npve-social-history, pre-npve-encounter-shell', detail: 'Each apply script reads, mutates and rewrites the whole file; a script that loaded before another\'s write and wrote after it discards that write. The encounter-shell commit 1d3ae56 captured the dropped state and also swept in the external agent\'s uncommitted files.', handling: 'Decision for Daniel: one writer at a time on the schema (serialize batches), or make apply scripts re-read immediately before writing and refuse when the key count went down. Verify the external agent\'s next run does not re-drop the restored key.' });
}
fs.writeFileSync(P, JSON.stringify(s2, null, 1));
console.log('flags now', s2.flags.length, '; keys', Object.keys(s2).length);
