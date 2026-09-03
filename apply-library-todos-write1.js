// apply-library-todos-write1.js — records steps 1-3 of batch libraryTodos_write1_2026_09_03 (writes done in the library). Backup first. Additive.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-03-pre-library-todos-write1-closeout.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const B = s.libraryTodos_write1_2026_09_03;
if (!B || !B.step0_renderFindings) throw new Error('step 0 record missing');
if (B.step1_textFieldSmall) throw new Error('steps already recorded');
const DIR = 'figma-export/library-todos-write1-2026-09-03/';
const BATCH = 'libraryTodos_write1_2026_09_03';

B._status = 'DONE through step 3. Text field small resting label y 16 → 9 on ten masters and four hidden Label slots 56 → 40; Tabs/Tab label bound to four typography variables and set TITLE on four variants. Prompt was truncated after write 2; nothing beyond it was received. Library not published; consumers have not accepted updates.';
B.report = DIR + 'report.md';
B.promptTruncation = 'The batch prompt ended mid-sentence in write 2 ("…so geometry should"). Writes 1 and 2 done; any later write was not received.';
B.step1_textFieldSmall = {
  set: '121:350 Text field, ten size=small masters 130:140, 159, 178, 197, 216, 235, 254, 273, 292, 311',
  restingLabel: { nodes: ['130:154','130:173','130:192','130:211','130:230','130:249','130:268','130:287','130:306','130:325'], change: 'Label / resting absolute y 16 → 9 (24 tall in the 40 Input). Box centre offset +8 → +1; glyph centre +8.32 → +1.32 on the four visible resting labels.', source: 'MUI InputLabel.js:100 outlined small translate(14px, 9px); the todo\'s 8 was our error.' },
  labelSlot: { nodes: ['130:144','130:182','130:258','130:296'], change: 'Hidden Label slot height 56 → 40 (resize(95, 40), FIXED inside the HORIZONTAL Outline). The six visible slots were already 40 and were not touched.' },
  unchanged: 'Variant 300x60, Input 40, Outline 40 on all ten. Medium masters 121:230…121:338 read back at y 16 / slot 56 / Input 56, untouched.',
  consumer: '883:2105 on Compositions (small, Value=Filled) reads y 9, slot 40 after the write; its resting label is hidden.',
  pixels: '130:140 after: outline rows 0 and 39, label ink rows 15-27, centre 21.5 vs input centre 20 (before 22-34, centre 28.5). 130:159 after: 300x68, outline rows 8 and 47, notch closed.',
  screenshots: [DIR + 'after-textfield-small-default-empty-130-140-1x.png', DIR + 'after-textfield-small-default-empty-130-140-3x-marked.png', DIR + 'after-textfield-small-default-filled-130-159-1x.png', DIR + 'after-textfield-small-default-filled-130-159-3x.png']
};
B.step2_tabLabel = {
  variants: ['201:3','201:5','201:7','201:10'], texts: ['201:4','201:6','201:8','201:11'],
  bindings: { fontFamily: 'font/family/base VariableID:74:50 (Akkurat LL)', fontSize: 'font/size/body1 VariableID:74:57 (16)', lineHeight: 'font/lineHeight/body2 VariableID:74:62 (20)', fontWeight: 'font/weight/regular VariableID:74:51 (400)' },
  textCase: 'ORIGINAL → TITLE',
  method: 'Variables fetched by id and verified by name in-script (throws on mismatch); Akkurat LL Regular loaded; setBoundVariable for each of the four; boundVariables read back with names.',
  readBack: 'Akkurat LL Regular 16 / 20px, letterSpacing 0%, text 37x20 at y 14, variant 90x48, render height 11.808 — identical geometry to before; fills unchanged (color/text/secondary on selected=no, color/primary/main on selected=yes). componentPropertyReferences characters Label#201:0 intact on all four.',
  nested: 'Tabs 201:14 (COMPONENT, three nested Tab instances) reads TITLE with all five bindings on each label.',
  screenshots: [DIR + 'after-tab-set-201-13-1x.png', DIR + 'after-tab-set-201-13-3x.png', DIR + 'after-tabs-201-14-1x.png', DIR + 'after-tabs-201-14-3x.png']
};
B.step3_rule1 = {
  transient: ['993:2 (130:140 instance)', '993:24 (201:3 instance, Label#201:0 = "recent problems")', '993:30 (201:14 instance)'],
  textField: 'resting y 9, slot 40, box +1, glyph +1.32, label fill #545454 bound, opacity 1; instance capture pixel-identical to the master capture (diff bbox None).',
  tab: 'renders "Recent Problems" (TITLE from a lowercase property value), 16/20, five bindings, 160x48.',
  tabs: '270x48, three labels TITLE 16/20 with five bindings each.',
  cleanup: 'All three removed; by-id reads null; TRANSIENT-name scans on Cover and Compositions empty.',
  screenshots: [DIR + 'rule1-transient-textfield-small-130-140-1x.png', DIR + 'rule1-transient-textfield-small-130-140-3x.png', DIR + 'rule1-transient-tab-lowercase-label-1x.png', DIR + 'rule1-transient-tab-lowercase-label-3x.png']
};
B.rules = {
  '1_instancePaintVerification': 'PASS (step3_rule1). Paints untouched; bound fills read back on instances.',
  '2_unboundPaintAudit': 'Not re-run; no paint added or changed.',
  '3_referenceCounts': 'PASS. Label refs intact on 201:4/6/8/11 and on 130:155/130:152.',
  '4_skipInvisibleFalse': 'Set on every walk.',
  '5_opacityLast': 'No opacity touched.',
  '6_enumerateDontRecall': 'Variants enumerated from the sets.',
  '7_fileIdentityFirst': 'Pages read in libraryTodos_readOnly_2026_09_03 earlier the same day; sets confirmed on Inputs and Actions.',
  '8_roundWithRecord': 'PASS. y 9, height 40; variant sizes unchanged.',
  '9_boundPaintAlpha': 'No paint touched.',
  '10_cloneDropsPropertyRefs': 'n/a, no clone.',
  '14_15_changeLogAndComparison': 'n/a: library master edits, no rebuilt frame placed in a target.'
};
B.publishing = 'Manual: publish the library, then accept updates in Proposals zKT34LQogNjz3Z07fY4VQB and the NPVE target fdCQVFdvOByaOYIJYag0d6. Not done in this batch.';
B.screenshots = ['storybook-button-contained-primary-2026-09-03.png','storybook-tabs-2026-09-03.png','after-textfield-small-default-empty-130-140-1x.png','after-textfield-small-default-empty-130-140-3x-marked.png','after-textfield-small-default-filled-130-159-1x.png','after-textfield-small-default-filled-130-159-3x.png','after-tab-set-201-13-1x.png','after-tab-set-201-13-3x.png','after-tabs-201-14-1x.png','after-tabs-201-14-3x.png','rule1-transient-textfield-small-130-140-1x.png','rule1-transient-textfield-small-130-140-3x.png','rule1-transient-tab-lowercase-label-1x.png','rule1-transient-tab-lowercase-label-3x.png'].map(f => DIR + f);

// Flags: dated fix lines. Nothing resolved (targets must accept updates and be re-measured).
const fix = (id, text) => { const f = s.flags.find(x => x.id === id); if (!f) throw new Error('missing ' + id); f.detail += ' 2026-09-03 library fix (' + BATCH + '): ' + text; f.handling += ' Library edited 2026-09-03 (' + BATCH + '); awaiting publish + accept updates and re-measure in the target.'; };
fix('npveLabelDrift_smallRestingLabelInsetIsMedium', 'Label / resting y 16 → 9 on all ten size=small masters; box +1, glyph +1.32, matching MUI small translate y 9. Master 130:140 pixels: label ink centre 21.5 vs input centre 20.');
fix('npveProblemsBuild_textFieldSmallLabelSlotHeight', 'The four hidden 56-tall slots set to 40; all ten small slots now 40.');
fix('npveProblemsBuild_tabLabelTypeUnbound', 'Label on 201:3/5/7/10 bound to font/family/base, font/size/body1, font/lineHeight/body2, font/weight/regular; textCase TITLE. Geometry unchanged.');
fix('libraryRead_tabLabelLineHeightAndCase', 'Case half fixed: textCase TITLE on the four variants renders "Recent Problems" from a lowercase value. Line-height half was withdrawn at render (20 is correct).');
fix('libraryRead_smallRestingLabelCodeIs9', 'Applied: small resting label now rests at y 9.');

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote', BATCH, 'steps 1-3; flags', s.flags.length);
