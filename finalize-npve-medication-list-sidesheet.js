// finalize-npve-medication-list-sidesheet.js — closes the full-sheet integration batch after Figma validation.
const fs = require('fs');
const P = './design-system-schema.json';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const D = 'npveRebuild_medicationListSidesheet_2026-09-04';
const r = s[D];
if (!r) throw new Error('start record is missing');
if (!String(r._status).startsWith('IN PROGRESS')) throw new Error('record is not open');
const flagsBefore = s.flags.length;
Object.assign(r, {
  _status: 'DONE. Canonical 550x600 Medication List Sidesheet and comparison screen created; full-width footer action added through a backward-compatible shell API; existing Problems Sidesheets validated unchanged.',
  plannedApiChanges: [
    'Body content#6:5 now offers Medication list body 236:1758.',
    'Show primary action#252:0 defaults true.',
    'Show full-width action#252:1 defaults false.',
    'Full-width action#252:2 defaults to and curates Medication list footer action 248:1827.',
    'Ordinary Primary and Tertiary action preferred lists remain free of the full-width wrapper; all prior defaults are unchanged.'
  ],
  created: {
    footerActionComponent: '248:1827 Medication list footer action 534x38; published Button 248:1828 fills 518x38 inside bound 8px wrapper padding',
    sidesheetApiNode: '252:2211 Full-width action nested instance in Sidesheet 6:65',
    standaloneScreen: '250:3518 04 · Medication list; 250:3519 Sidesheet — Medication list',
    comparisonReference: '253:1838 with source image 253:1839',
    comparisonRebuild: '253:1840 with live Sidesheet 253:1841',
    comparisonChangeLog: '254:1895 with six Change log/Row instances',
    comparisonScreen: '254:3706 05 · Medication list comparisons; 254:3707 Rebuild comparison — Medication list'
  },
  geometry: {
    source: '550x380; Header 64 / MainWrap 240 / Footer 76',
    target: '550x600 canonical Sidesheet; Header 56 / Body 487 / Footer 56',
    body: 'Medication list body 518x206 fills the existing 518px content slot at a 16px inset',
    footer: 'Full-width action 534x38 at x8 in Actions; nested Button 518x38 at x8, for a total 16px sheet inset',
    comparison: '1708x1290 inside a 1868x1536 section'
  },
  decisions: [
    'Canonical target size wins over the shorter legacy 550x380 source because Sidesheets must remain fixed at 550x600.',
    'The legacy 64px header and 76px footer map to the established 56px / 56px shell.',
    'The full-width action is a dedicated optional Sidesheet slot because Figma preserves the geometry of ordinary instance-swap slots.',
    'New footer properties are backward-compatible: primary visible by default, full-width hidden by default.',
    'Medication rows remain bound to background/paper following user visual review.'
  ],
  verification: {
    medicationSheet: 'PASS 250:3519 is 550x600 and instances Sidesheet 6:65; body main is 236:1758; full-width action is visible at 534x38; ordinary primary is hidden',
    comparison: 'PASS 254:3707 is a live 35:332 instance with reference 253:1838, rebuild 253:1840, and change log 254:1895',
    references: 'PASS row master 7; body master 19; Medication Sidesheet 53; comparison 77',
    backwardCompatibility: 'PASS Problems Closed 156:2428 and Open 156:2707 remain 550x600 with original body swaps, primary visible, full-width hidden',
    typography: 'PASS Akkurat LL across new screen and comparison content',
    bindings: 'PASS zero unbound non-instance solid paints on changed Templates and Screens content; section chrome intentionally #E4E4E4',
    rule8: 'PASS zero non-exempt fractional authored dimensions on Templates and Screens'
  },
  recovery: 'Two atomic Figma rejections changed nothing: nested instance-swap geometry could not be resized inside a Sidesheet instance, which led to the dedicated full-width slot; one immediate post-set descendant selector ran before the nested tree resolved, so property application and validation were split into separate calls.',
  screenshots: fs.readdirSync('./figma-export/npve-medication-list-sidesheet-2026-09-04').filter(f => f.endsWith('.png')).map(f => 'figma-export/npve-medication-list-sidesheet-2026-09-04/' + f),
  flagsAdded: [],
  flagsBefore,
  flagsAfter: s.flags.length
});
fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('finalized', D, '; flags', flagsBefore, '->', s.flags.length);
