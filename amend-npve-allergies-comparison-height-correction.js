// Records the verified correction strategy after Figma rejected a nested swap-slot resize.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_allergiesComparisonHeightCorrection_2026-09-05';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const r = s[ID];
if (!r || !String(r._status).startsWith('IN PROGRESS')) throw new Error(`${ID} is not open`);

r.scope = 'Correct only the unique Allergies rebuild helper surface so the visible white sheet ends with the 447px live Sidesheet even though the shared comparison swap slot retains its canonical 600px geometry. Preserve the shared comparison master, frozen reference, change log, Sidesheet component, body, tokens, and all other comparisons.';
r.stopCondition = 'Stop after the unique helper surface, component links, whole-pixel geometry, paints, and final comparison render are verified. Stop immediately if the fix requires a shared master change or changes the Sidesheet itself.';
r.audit.rootCause = 'Figma preserves the canonical 600px swap-slot geometry after inserting the 447px helper; the helper\'s white surface therefore extended 153px beyond the child Sidesheet.';
r.strategyAmendment = 'A direct nested-instance resize did not persist because the shared comparison component owns that slot geometry. Use the unique helper surface as the correction point: remove its paper fill and let the unchanged Sidesheet own the visible white surface.';
const flag = Array.isArray(s.flags) ? s.flags.find((item) => item.id === 'npveAllergiesComparison_fixedRebuildWrapperHeight') : null;
if (flag) flag.handling = 'Resolve locally by making the unique rebuild helper surface transparent so the shorter live Sidesheet owns the visible white surface. Preserve the shared Rebuild comparison master and all source/reference geometry.';

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('amended', ID);

