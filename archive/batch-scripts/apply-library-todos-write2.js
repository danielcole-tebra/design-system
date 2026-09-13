// apply-library-todos-write2.js — records batch libraryTodos_write2_2026_09_03 (variables + repo). Backup first. Additive.
// Schema corrections are dated annotations beside the original text; nothing original is edited or removed.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-03-pre-library-todos-write2.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s.libraryTodos_write2_2026_09_03) throw new Error('batch entry already exists');
const DIR = 'figma-export/library-todos-write2-2026-09-03/';
const BATCH = 'libraryTodos_write2_2026_09_03';
const D = '2026-09-03';

const UNRECORDED = ['space/2','space/3','space/5','space/6','space/7','space/9','space/11','space/13','space/14','space/17','space/19','space/23'];

s.libraryTodos_write2_2026_09_03 = {
  _status: 'DONE. Variables: space/32 added, 14 non-scale space/* described, WEB codeSyntax removed from all 19 that had it; six typography variables added (h4, h5, subtitle2 size + lineHeight); font/weight/bold already existed. Repo: standalone rule 8 walk with the GROUP/VECTOR exemption, re-run on the target Screens page with 0 hits. Schema: three dated annotations, one flag resolved, three annotated. No deletion, no rename.',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw, write batch 2 of 2. Variables only; no component master touched (write 1 masters re-read unchanged).',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6 Screens 27:2, read only (rule 8 re-run).',
  date: D,
  report: DIR + 'report.md',
  step1_dimension: {
    decision: 'Daniel, ' + D + ': the space scale is multiples of 8 with 4 as the half step (0, 4, 8, 16, 24, 32, 40 are scale; everything else is a component size token).',
    added: { name: 'space/32', id: 'VariableID:997:2', key: '0d62cb72fb8788eabda4d5fbada6804ed95063f6', value: 32, scopes: ['WIDTH_HEIGHT','GAP'], description: 'Scale step. Decision 2026-09-03 (Daniel): the space scale is multiples of 8 with 4 as the half step.' },
    described: {
      'space/12': 'Component size token, not scale: needed by Autocomplete (Value=Multiple vertical padding: MUI root padding 9 + chip margin 3)  [from figmaVariablePlan addedDuringBuild]',
      'space/18': 'Component size token, not scale: needed by Checkbox Flush=Left (derived 42 MUI SwitchBase target minus 24 SvgIcon medium; …)  [from the variable\'s own earlier description]',
      unrecorded: UNRECORDED.map(n => n + ' → "Component size token, not scale: origin unrecorded"')
    },
    untouchedDescriptions: 'space/0 (Checkbox Flush=Left note), space/40 (theme.spacing(5) note), space/4, 8, 16, 24 (empty) — all scale values, not in the write.',
    codeSyntaxRemoved: ['space/0','space/2','space/3','space/4','space/5','space/6','space/7','space/8','space/9','space/11','space/12','space/13','space/14','space/16','space/17','space/18','space/19','space/23','space/24'],
    codeSyntaxNote: 'space/40 had none; space/32 created without one. var(--tebra-space-N) exists nowhere in C:/Code/web-app-v2/packages (read batch A4, 0 matches).',
    readBack: '21 space/* variables, values 0,2,3,4,5,6,7,8,9,11,12,13,14,16,17,18,19,23,24,32,40; codeSyntax {} on all 21; scopes WIDTH_HEIGHT+GAP on all 21. Dimension collection 34 → 35.',
    planNote: 'figmaVariablePlan.collections[2] still lists the pre-batch codeSyntax on the plan entries; annotated below, not edited.'
  },
  step2_typography: {
    added: [
      { name: 'font/size/h4', id: 'VariableID:996:2', value: 16 }, { name: 'font/lineHeight/h4', id: 'VariableID:996:3', value: 24 },
      { name: 'font/size/h5', id: 'VariableID:996:4', value: 14 }, { name: 'font/lineHeight/h5', id: 'VariableID:996:5', value: 20 },
      { name: 'font/size/subtitle2', id: 'VariableID:996:6', value: 12 }, { name: 'font/lineHeight/subtitle2', id: 'VariableID:996:7', value: 16 }
    ],
    pattern: 'scopes copied from font/size/body1 (FONT_SIZE) and font/lineHeight/body1 (LINE_HEIGHT); codeSyntax WEB var(--tebra-font-size-<v>) and var(--tebra-font-line-height-<v>) — the corrected line-height pattern, not the --tebra-line-height-* that h2 and h3 carry; description "typography.ts <v> (weight 700 in code)".',
    source: 'ds/typography/typography.ts:31-45 (h4 1rem/1.5rem, h5 0.875rem/1.25rem, subtitle2 0.75rem/1rem, all fontWeight 700).',
    bold: 'font/weight/bold VariableID:74:52 = 700 already existed; not added.',
    readBack: 'Typography collection 17 → 23; all six read back with the values, scopes and codeSyntax above.',
    h2h3CodeSyntax: 'font/lineHeight/h2 and h3 in the library still read var(--tebra-line-height-h2) / -h3 (missing "font-"). Not changed: the write list names only the schema annotation (5b). One-line fix if wanted.'
  },
  step3_letterSpacingDecision: 'DECISION ' + D + ': no letter-spacing variable. Code authors none (typography.ts) and Button and Tab render letter-spacing normal in Storybook (libraryTodos_write1_2026_09_03.step0_renderFindings). The 0.5px on chip and slot labels is a source-file value until Chip is render-checked.',
  step4_rule8Script: {
    finding: 'No standing rule 8 audit script existed in the repo; every previous rule 8 walk was written inline in that batch\'s use_figma script (records: npveRebuild_cleanup, tabUnderlineFix, labelDriftAndUnderline, goldStarsAndCorrections). The inline walks listed GROUP/VECTOR bounds as hits although standingBatchRules.8 exempts them.',
    file: 'rule8-audit.figma.js (new, repo root): the walk as a use_figma body; header notes the 2026-09-03 change; VECTOR and GROUP are exempt and counted separately; INCLUDE_EXEMPT toggles listing them for comparison.',
    rerun: { file: 'fdCQVFdvOByaOYIJYag0d6', page: 'Screens 27:2', topLevel: 6, walked: 485, hits: 0, exempt: 39, group573_3583: 'four instances (rows 26:261, 26:272, 26:282, 26:292 under 27:6) now in the exempt bucket, not in hits', otherExempt: 'Icon/DownCaret 76:4 16.67x9.19, Icon 76:7 20x19.994, 200:34 11.026x20, 76:10 19.99998x20 and their siblings — all VECTOR' }
  },
  step5_schemaCorrections: {
    a_pagesOrder: 'figmaBuild.pages._order_2026_09_03 added beside _order (untouched).',
    b_h2h3CodeSyntax: 'figmaVariablePlan.collections[1].annotation_2026_09_03 added; the plan has no h2/h3 lineHeight entries (added to the library after the plan), so the defect is recorded there and in the read record\'s B4 line.',
    c_buttonUppercaseClaim: 'flag npveBuild_buttonLabelTitleCase: correction appended; original detail untouched.'
  },
  step6_flags: {
    resolved: ['npveBuild_buttonLabelTitleCase'],
    annotatedOpen: ['npveBuild_slotLetterSpacingUnbound', 'npveComparison_noSpace32Token', 'npveChangelog_noH4Token'],
    alsoAnnotated: ['libraryRead_spaceCodeSyntaxNamesMissingCssVar', 'libraryRead_letterSpacingInheritsMuiDefaults', 'libraryRead_iconGlyphGroupIsIntrinsicGeometry', 'libraryRead_pagesOrderStale']
  },
  verify: {
    write1Masters: '130:140 and 130:159: variant 300x60, Input 300x40, Label / resting y 9 h 24, Label slot 95x40 (hidden / visible). 201:3: 90x48, Label 37x20 at y 14, 16/20 TITLE, five bindings. Unchanged by this batch.',
    screenshots: 'None: variable-only writes; rule 1/3 instantiation applies to component edits only.'
  },
  rules: {
    '1_instancePaintVerification': 'n/a (variables only)', '2_unboundPaintAudit': 'n/a', '3_referenceCounts': 'n/a', '4_skipInvisibleFalse': 'set on the rule 8 walk and the master re-read', '5_opacityLast': 'n/a', '6_enumerateDontRecall': 'space/* and typography variables enumerated from the collections before and after', '7_fileIdentityFirst': 'library pages read earlier the same day (read batch); target walk addressed Screens 27:2 by name and id', '8_roundWithRecord': 'target Screens 0 hits with the exemption; library variables are integers', '9_boundPaintAlpha': 'n/a', '10_cloneDropsPropertyRefs': 'n/a', '14_15': 'n/a (no rebuilt frame)'
  },
  publishing: 'Manual: publish the library so the new variables reach consumers; then the NPVE target can rebind its literal 32s (35:332) and the Change log title to h4. Not done here.'
};

// 5a. pages order annotation
s.figmaBuild.pages._order_2026_09_03 = ['Cover','Foundations','Reference','Actions','Inputs','Data display','Feedback','Surfaces & navigation','Icons & illustrations','Compositions','Layouts'];
s.figmaBuild.pages._orderAnnotation_2026_09_03 = 'Read from the file in libraryTodos_readOnly_2026_09_03 (ids: Cover 118:250, Foundations 145:2, Reference 259:2879, Actions 259:2873, Inputs 259:2874, Data display 259:2875, Feedback 259:2876, Surfaces & navigation 259:2877, Icons & illustrations 259:2878, Compositions 446:2, Layouts 489:2). _order above is the pre-rename record and is left as written; rule 7 identity checks should use _order_2026_09_03.';

// 5b. h2/h3 lineHeight codeSyntax annotation on the plan collection
const typoPlan = s.figmaVariablePlan.collections[1];
typoPlan.annotation_2026_09_03 = 'font/lineHeight/h2 and font/lineHeight/h3 (added to the library after this plan; no plan entry) carry codeSyntax var(--tebra-line-height-h2) / -h3, missing the "font-" segment every other line height uses. Correct pattern: var(--tebra-font-line-height-h2) / -h3. The six variables added in ' + BATCH + ' use the correct pattern. The two library values were not changed in that batch.';
const dimPlan = s.figmaVariablePlan.collections[2];
dimPlan.annotation_2026_09_03 = 'space/* codeSyntax WEB values listed on these plan entries were removed from the library variables in ' + BATCH + ' (the CSS variable exists nowhere in the repo). Plan entries left as written. space/32 added; non-scale values described as component size tokens (decision: scale is multiples of 8 with 4 as the half step).';

// 5c + 6. flags
const find = id => { const f = s.flags.find(x => x.id === id); if (!f) throw new Error('missing ' + id); return f; };
const b = find('npveBuild_buttonLabelTitleCase');
b.detailAnnotation_2026_09_03 = 'The sentence "MUI\'s default is uppercase; Title case in the Figma master matches neither" is wrong: typography.ts:65 sets button.textTransform capitalize, and Storybook renders "Save & Add To Note" (libraryTodos_write1_2026_09_03.step0_renderFindings). Original detail left as written.';
b.handling = 'Resolved; kept for the record.';
b.superseded = 'RESOLVED ' + D + ' by ' + BATCH + ': library TITLE matches code capitalize, render-confirmed in Storybook ' + D + '. No write needed.';

const ls = find('npveBuild_slotLetterSpacingUnbound');
ls.detail += ' ' + D + ' (' + BATCH + '): Render evidence — Button and Tab render letter-spacing normal in Storybook (write 1 step 0, ' + 'figma-export/library-todos-write1-2026-09-03/storybook-button-contained-primary-2026-09-03.png and storybook-tabs-2026-09-03.png). Chip unchecked. Decision: no letter-spacing variable; the 0.5px is a source-file value until Chip is render-checked.';
ls.handling += ' Open pending a Chip render check.';

const sp = find('npveComparison_noSpace32Token');
sp.detail += ' ' + D + ' (' + BATCH + '): token added, target rebind pending — space/32 VariableID:997:2 in Tebra/Dimension; 35:332 still carries literal 32 until the library is published and the target rebinds.';
sp.handling += ' Token added ' + D + '; target rebind pending.';

const h4 = find('npveChangelog_noH4Token');
h4.detail += ' ' + D + ' (' + BATCH + '): token added, target rebind pending — font/size/h4 VariableID:996:2 (16) and font/lineHeight/h4 VariableID:996:3 (24), with h5 and subtitle2 pairs; the Change log title 18:110 stays on body1 + bold until the target rebinds.';
h4.handling += ' Token added ' + D + '; target rebind pending.';

const cs = find('libraryRead_spaceCodeSyntaxNamesMissingCssVar');
cs.detail += ' ' + D + ' (' + BATCH + '): space/* codeSyntax removed on all 19 that had it. The h2/h3 line-height codeSyntax half is still open (not in the write list).';
cs.handling += ' Space half fixed ' + D + '.';
find('libraryRead_letterSpacingInheritsMuiDefaults').handling += ' Decision ' + D + ': no letter-spacing variable (' + BATCH + '.step3).';
find('libraryRead_iconGlyphGroupIsIntrinsicGeometry').detail += ' ' + D + ' (' + BATCH + '): rule8-audit.figma.js now honours the exemption; target Screens re-run 0 hits, 39 exempt including the four 573:3583 groups. The walk side is settled; whether the icon gets an integer wrapper stays a decision.';
find('libraryRead_pagesOrderStale').detail += ' ' + D + ' (' + BATCH + '): _order_2026_09_03 added beside _order.';
find('libraryRead_pagesOrderStale').handling = 'Annotated ' + D + '; original _order left as written.';

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote', BATCH, '; flags', s.flags.length);
