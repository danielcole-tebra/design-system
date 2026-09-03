// apply-npve-changelog-rule14.js — resolves flag npveChangelog_placedLogIsDetached per the rule 14 amendment, 2026-09-02. Backup first. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-02-pre-rule14-amendment.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const f = s.flags.find(x => x.id === 'npveChangelog_placedLogIsDetached');
if (!f) throw new Error('flag not found');
f.superseded = 'RESOLVED 2026-09-02 by decision: CLAUDE.md rule 14 amended. The placed change log is a detached frame containing Change log/Row instances; Row stays a component so styling propagates.';
f.handling = 'Resolved by rule 14 amendment (CLAUDE.md, 2026-09-02). Kept for the record.';
const r = s.npveRebuild_changelog_2026_09_02;
r.amendment_2026_09_02 = 'Rule 14 replaced in CLAUDE.md to state the detached-frame convention. Flag npveChangelog_placedLogIsDetached resolved. No Figma writes.';
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('resolved npveChangelog_placedLogIsDetached; flags', s.flags.length);
