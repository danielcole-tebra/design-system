// Records flag-count provenance after the encounter-shell batch completed concurrently.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_socialHistory_2026-09-06';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const r = s[ID];

if (!r || !String(r._status).startsWith('DONE')) {
  throw new Error(`${ID} is missing or is not DONE`);
}
const concurrent = s.flags.slice(r.flagsBefore).filter(
  (f) => f.discoveredDuring === 'npveRebuild_encounterShell_2026-09-06'
);
if (concurrent.length !== s.flags.length - r.flagsBefore) {
  throw new Error('Flag provenance is mixed; stop for manual reconciliation');
}

r.flagAccounting = {
  beforeThisBatch: r.flagsBefore,
  afterBothConcurrentBatches: s.flags.length,
  addedByThisBatch: 0,
  concurrentAdditions: concurrent.length,
  concurrentOwner: 'npveRebuild_encounterShell_2026-09-06',
  note: 'The encounter-shell batch added flags[264..271] while Social History was in progress. They are preserved but are not Social History findings.'
};
r.flagsAfter = s.flags.length;
r.flagsAdded = [];

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('reconciled', ID, r.flagAccounting);
