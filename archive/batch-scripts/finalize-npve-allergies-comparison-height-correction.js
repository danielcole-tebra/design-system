// Closes the Allergies comparison-wrapper height correction after visual verification.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_allergiesComparisonHeightCorrection_2026-09-05';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const r = s[ID];

if (!r || !String(r._status).startsWith('IN PROGRESS')) {
  throw new Error(`${ID} is missing or not open`);
}

const required = [
  './figma-export/npve-allergies-comparison-height-correction-2026-09-05/report.md',
  './figma-export/npve-allergies-comparison-height-correction-2026-09-05/comparison-allergies-356-6236-height-corrected.png'
];
for (const file of required) if (!fs.existsSync(file)) throw new Error(`Missing artifact: ${file}`);

Object.assign(r, {
  _status: 'DONE. The Allergies comparison now shows no false white extension below the live 447px Sidesheet, and the corrected render is verified.',
  figmaMutations: [
    'Cleared the paper fill from unique rebuild helper component 356:3248 so its preserved 600px swap-slot instance is visually transparent below the child Sidesheet.',
    'Left live Allergies Sidesheet I356:6236;114:1139;356:3249 unchanged at 550x447.',
    'Preserved shared Rebuild comparison master 35:332, frozen reference, change log, component links, paints, and all other comparison instances.'
  ],
  verification: {
    geometry: 'PASS — unique helper and live Sidesheet remain 550x447; the canonical nested swap-slot instance remains 550x600 without a visible surface below the child.',
    scope: 'PASS — only the unique Allergies rebuild helper fill changed.',
    components: 'PASS — comparison, helper, and Sidesheet remain linked instances.',
    wholePixels: 'PASS — all affected widths and heights are integer pixels.',
    visual: 'PASS — final comparison render was saved and inspected; the false white extension is gone.'
  },
  standingBatchRules: {
    '1_instancePaintVerification': 'PASS — no paint changed; the live linked Sidesheet was re-rendered in the comparison.',
    '2_unboundPaintAudit': 'PASS — the redundant token-bound paper fill was removed from the unique helper; the live Sidesheet retains its token-bound paper surface.',
    '3_referenceCounts': 'PASS — every affected instance still resolves to its main component.',
    '4_skipInvisibleFalse': 'PASS — figma.skipInvisibleInstanceChildren=false on audit and verification walks.',
    '5_opacityLast': 'PASS — opacity was not changed.',
    '6_enumerateDontRecall': 'PASS — wrapper and child dimensions were read live before and after mutation.',
    '7_fileIdentityFirst': 'PASS — NPVE Rebuild fdCQVFdvOByaOYIJYag0d6, Screens 27:2, comparison 356:6236.',
    '8_roundWithRecord': 'PASS — no geometry changed; all affected dimensions remain whole pixels.',
    '9_boundPaintAlpha': 'PASS — bound paint alpha was not changed.',
    '10_cloneDropsPropertyRefs': 'PASS — no clone or component-property mutation occurred.'
  },
  screenshots: [required[1].replace('./','')],
  findings: { GAP: 0, DEFECT: 1, DECISION: 0, resolvedDuringBatch: 1 },
  flagsAfter: Array.isArray(s.flags) ? s.flags.length : null,
  recoveryNotes: [
    'A direct nested-instance resize was rejected by the comparison component constraints and left no persisted mutation.',
    'The defect was presentation-only in the helper surface; product component geometry was already correct.',
    'Future comparison helpers must be surface-transparent when their content is shorter than the canonical 600px slot.'
  ],
  nextBatch: 'Not started — resume the approved low-oversight Sidesheet sequence after operator review.'
});

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('finalized', ID, 'flags', Array.isArray(s.flags) ? s.flags.length : 'n/a');
