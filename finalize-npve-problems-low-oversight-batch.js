// finalize-npve-problems-low-oversight-batch.js — closes the verified two-screen Problems batch.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_problemsLowOversightBatch_2026-09-04';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const r = s[ID];

if (!r || !String(r._status).startsWith('IN PROGRESS')) throw new Error('Batch record is not open');

const dir = 'figma-export/npve-problems-low-oversight-batch-2026-09-04/';
const files = [
  'source-empty-4704-17095-2x.png',
  'source-browse-129-10016-2x.png',
  'component-empty-304-2883.png',
  'component-browse-304-2910.png',
  'standalone-empty-309-4531.png',
  'standalone-browse-309-4772.png',
  'comparison-empty-309-5711.png',
  'comparison-browse-309-6116.png',
  'report.md'
];
for (const file of files) if (!fs.existsSync(dir + file)) throw new Error(`Missing artifact ${file}`);

r._status = 'DONE. Problems Empty and Browse/Search Sidesheets are built, compared, and verified; all new screens remain live Sidesheet instances.';
r.figmaMutations = [
  'Problems list body 156:2426: added State=Empty 304:2883; default remains Closed.',
  'Problems browse body 304:2910: standalone wrapper around live Active tab=All 94:639 with empty-search and Common Problems overrides.',
  'Sidesheet 279:2446: appended Problems browse body to Body content preferred values; default remains 26:221.',
  'Rebuild comparison 35:332: appended two reference, rebuild, and change-log helpers to preferred values; defaults unchanged.',
  'Templates: added section 309:4528 and six comparison helper components.',
  'Screens: added sections 309:4529 and 309:4530, standalone Sidesheets 309:4531 / 309:4772, and comparisons 309:5711 / 309:6116.',
  'Uploaded fresh 2x source exports to reference rectangles 309:5000 and 309:5357.',
  'Removed the inherited Cancel action from only the new Browse standalone and comparison Sidesheet instances.'
];
r.createdNodes = {
  components: {
    emptyVariant: '304:2883',
    browseBody: '304:2910',
    referenceEmpty: '309:4999',
    rebuildEmpty: '309:5001',
    changeLogEmpty: '309:5243',
    referenceBrowse: '309:5356',
    rebuildBrowse: '309:5358',
    changeLogBrowse: '309:5586'
  },
  screens: {
    empty: '309:4531',
    browse: '309:4772',
    comparisonEmpty: '309:5711',
    comparisonBrowse: '309:6116'
  },
  sections: {
    helpers: '309:4528',
    screens: '309:4529',
    comparisons: '309:4530'
  }
};
r.verification = {
  fileIdentity: 'PASS — target pages Cover 0:1, Templates 3:2, Screens 27:2, Archive 126:2; source nodes 4704:17095 and 129:10016 read live.',
  components: 'PASS — Empty is inside Problems list body with 35 reference nodes / 37 entries; Browse contains a live Active tab=All instance.',
  defaults: 'PASS — Problems list default Closed, Sidesheet Body content default 26:221, and all Rebuild comparison defaults unchanged.',
  sourceImages: 'PASS — 2x exports placed with image hashes 48fe4f1ece8cc7cc050a36aa77618acda168a8b2 and 9ae7d408cc5b7934a8f630b1e39737f9c21975b6.',
  screens: 'PASS — four new Sidesheet occurrences are live Placement=Floating instances; all are 550x600; Browse opacity is 0.4 only at screen level.',
  comparisons: 'PASS — each comparison resolves to its new reference, rebuild, and change-log helper.',
  footer: 'PASS — Browse secondary action is false on both new instances; Empty retains the disabled Save state.',
  existingUnchanged: 'PASS — 156:2428, 156:2707, 116:498, 116:1338, 160:3169, 160:3680, 250:3519, and 254:3707 retain actual property values and geometry.',
  detachment: 'PASS — no detached instance on Screens.',
  geometry: 'PASS — no fractional authored geometry in new Screens sections; 200px separation around each new section.',
  paints: 'PASS — no new local body paints; only the intentional copied #E4E4E4 section backdrop/outline is unbound.',
  visual: 'PASS — standalone and comparison renders inspected; Browse rerendered after Cancel removal.'
};
r.standingBatchRules = {
  '1_instancePaintVerification': 'PASS — live standalone and comparison Sidesheet renders match their component compositions; no unexpected local paint override.',
  '2_unboundPaintAudit': 'PASS with documented canvas exception — body components add no solid paints; copied section backdrop/outline remains intentionally unbound.',
  '3_referenceCounts': 'PASS — Empty retains 35 reference nodes / 37 entries; Browse remains attached to Active tab=All; every comparison link resolves.',
  '4_skipInvisibleFalse': 'PASS — figma.skipInvisibleInstanceChildren=false on every inventory and audit traversal.',
  '5_opacityLast': 'PASS — Browse opacity was applied after composition and verified at 0.4000000059604645 on only the two screen-level instances.',
  '6_enumerateDontRecall': 'PASS — source frames, live components, checkbox variant, sections, instances, properties, and screenshots were enumerated from current files.',
  '7_fileIdentityFirst': 'PASS — source and target file/page/node identities checked before every mutation.',
  '8_roundWithRecord': 'PASS — all authored geometry is whole-pixel and recorded; inherited glyph geometry remains untouched.',
  '9_boundPaintAlpha': 'PASS — no bound paint alpha was edited.',
  '10_cloneDropsPropertyRefs': 'PASS — Empty clone retained 37 reference entries; wrapper/helper clones have no exposed property references and preserve their live nested instances.'
};
r.screenshots = files.filter(file => file.endsWith('.png')).map(file => dir + file);
r.flagsAdded = [];
r.flagsBefore = 229;
r.flagsAfter = Array.isArray(s.flags) ? s.flags.length : 229;
r.knownExistingGaps = [
  'Text field has no leading-search adornment slot.',
  'Library Icon button has no ringed-plus style.',
  'Problem and Medication summary-row base-8 decisions remain open and unchanged.'
];
r.recoveryNotes = [
  'Read-only Page.visible query corrected with node-type narrowing; no mutation.',
  'Atomic wrapper reference-count assertion corrected to composition-specific live-instance validation; no mutation.',
  'State=Empty clone initially landed on the page; validation caught it and the intact component was inserted into 156:2426 before screen work.',
  'Atomic section-paint helper, float-equality, and inherited-preferred-values assertions were corrected before the successful screen composition.'
];
r.nextBatch = 'Not started.';

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('finalized', ID, 'flags', r.flagsAfter);
