// apply-library-todos-write1-prerecord.js — records the 2026-09-03 Storybook render findings VERBATIM before any library write
// (batch libraryTodos_write1_2026_09_03, step 0). Backup first. Additive. Annotates the read record, edits nothing in it.
const fs = require('fs');
const P = './design-system-schema.json';
fs.copyFileSync(P, './design-system-schema.backup-2026-09-03-pre-library-todos-write1.json');
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
if (s.libraryTodos_write1_2026_09_03) throw new Error('batch entry already exists');
const DIR = 'figma-export/library-todos-write1-2026-09-03/';
const BATCH = 'libraryTodos_write1_2026_09_03';

s.libraryTodos_write1_2026_09_03 = {
  _status: 'STEP 0 recorded: Storybook render findings written before any Figma write. Later steps append.',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw, write batch 1 of 2. Additive only; no deletions; no renames of published names.',
  date: '2026-09-03',
  step0_renderFindings: {
    source: 'Live Storybook read (master build) on 2026-09-03, supplied in the batch prompt. Outranks derivations per precedence 2.',
    verbatim: [
      'Tab renders Akkurat LL 16/20/400, text-transform capitalize, letter-spacing normal, min-height 48, selected #004852, unselected #545454, indicator 2 tall flush to strip bottom, no rule under the strip. The read batch\'s A2 derivation (16/24 from typography.button) was wrong: MUI Tab overrides line height after inheriting the button style. Annotate A2 in the read record, do not edit it.',
      'Button contained primary renders "Save & Add To Note" from label "Save & Add to Note": capitalize confirmed in browser, letter-spacing normal. The read batch\'s inference that MUI em letter-spacing defaults survive the theme is wrong at render for Button and Tab. Chip was not checked.',
      'Storybook renders no size=small TextField anywhere; small is code-read-only authority. Medium render-verified: 56 tall, resting label translate(14,16), centred.'
    ],
    evidence: {
      button: DIR + 'storybook-button-contained-primary-2026-09-03.png (copy of Temp screenshot-1788453538220-0.png, 1197x180, also kept under its original name)',
      tabs: DIR + 'storybook-tabs-2026-09-03.png (copy of Temp screenshot-1788453648698-2.png, 1197x180, also kept under its original name)',
      copied: '2026-09-03 before any write; both files were present.'
    }
  }
};

// Annotate the read record; the A2 text itself is left as written.
const r = s.libraryTodos_readOnly_2026_09_03;
if (!r) throw new Error('read record missing');
r.codeReads.A2_tab.annotation_2026_09_03 = 'SUPERSEDED AT RENDER by ' + BATCH + '.step0_renderFindings: Storybook renders Tab at 16/20, not 16/24. MUI Tab overrides line height after inheriting typography.button. The 16/24 derivation above is kept as written and is wrong.';
r.codeReads.A1_typography.annotation_2026_09_03 = 'SUPERSEDED AT RENDER for Button and Tab by ' + BATCH + '.step0_renderFindings: letter-spacing renders normal, so the deepmerge inference does not hold at render for those two. Chip not checked.';
r.libraryReads.B2_tabLabel.annotation_2026_09_03 = 'Verdict on line height withdrawn at render: Storybook Tab is 16/20, matching the library literal. Case verdict stands (capitalize vs ORIGINAL).';

// Flags touched by the render findings. Nothing resolved; dated lines appended.
const note = (id, text) => { const f = s.flags.find(x => x.id === id); if (!f) throw new Error('missing ' + id); f.detail += ' 2026-09-03 render (' + BATCH + '): ' + text; };
note('libraryRead_tabLabelLineHeightAndCase', 'Storybook renders Tab 16/20 capitalize. Line-height half of this flag withdrawn; case half stands. Library line height 20 is correct.');
note('libraryRead_letterSpacingInheritsMuiDefaults', 'Storybook renders letter-spacing normal on Button and Tab, so the inference is wrong at render for those two. Chip not checked.');
note('npveBuild_slotLetterSpacingUnbound', 'Button and Tab render letter-spacing normal in Storybook; the MUI-default inference from the read batch does not hold at render for them.');
note('npveProblemsBuild_tabLabelTypeUnbound', 'Render: 16/20/400 capitalize. Pairing to bind is font/family/base + font/size/body1 (16) + font/lineHeight/body2 (20) + font/weight/regular, textCase TITLE.');
note('npveBuild_buttonLabelTitleCase', 'Confirmed in browser: contained primary renders "Save & Add To Note". Library TITLE matches code.');
note('npveLabelDrift_smallRestingLabelInsetIsMedium', 'Storybook has no size=small TextField story; small is code-read-only authority (translate y 9). Medium render-verified 56 tall, translate(14,16), centred.');
note('npveCloseout_storybookUnreachable', 'A live Storybook master build was read on 2026-09-03 outside this repo checkout (evidence in ' + DIR + '); the checkout itself is still not runnable.');

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('wrote', BATCH, 'step0; flags', s.flags.length);
