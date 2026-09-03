// Records the unified section-caption convention and resolves the open
// question left by tableAssembly2026_08_31.deliberateDeviation.
const fs = require('fs');
const P = 'design-system-schema.json';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));

s.captionConvention2026_08_31 = {
  _scope: 'The single convention for describing a composition and its sections. Settled across the six built frames; the remaining compositions follow it.',
  supersedes: 'tableAssembly2026_08_31.deliberateDeviation, which left "the frame carries BOTH conventions" as an open decision.',

  whatTheDivergenceActuallyWas: 'The two conventions were never in conflict — they operate at different levels. libraryRestructure2026_08_26c added a FRAME-level header (What it is / Uses / Varies) to 12 frames. Table assembly additionally carried a SECTION-level caption (Shows / Use when / Not this when / Source) on each of its 12 numbered sections. Comparing "four caption fields" against "three header fields" compared a section to a frame. The real divergence was that only 4 of 14 frames had section captions at all: Table assembly, Selection / bulk action bar, Drawer panel and Data grid toolbar. The five frames built in this batch had none.',

  theConvention: {
    frameLevel: 'A "Header — composition" block with What it is / Uses / Varies. Add "Reading this frame" when the frame uses defect or gap markers, per defectMarkerConvention2026_08_28. Add "Supersedes" or "Where to find this" only where they apply. The Varies line ends by naming the section-caption convention, so the frame is self-describing.',
    sectionLevel: 'Every VARIATION section carries a Caption with exactly four fields in this order: Shows / Use when / Not this when / Source. Anatomy and How to build one do NOT take a caption — they are template sections, not variations. This matches Table assembly, where 12 captions cover 12 numbered sections and neither template section has one.'
  },

  fieldMeanings: {
    Shows: 'What the section puts in front of the reader. Absorbs what an unstructured Intro line used to do.',
    'Use when': 'The condition under which this is the right choice.',
    'Not this when': 'The condition under which it is the wrong choice, and what to do instead. This is the field the old Intro form had nowhere to put, and it is the main gain from the change.',
    Source: 'Where the behaviour comes from — a theme override, a MUI rule, or a production count. Keeps every section traceable, which is the grounding discipline of the whole exercise.'
  },

  typography: 'Label: Akkurat LL Bold, fontSize bound to VariableID:74:53 (12), lineHeight 16px, fill bound to VariableID:74:36. Body: Akkurat LL Regular, fontSize bound to VariableID:74:55 (14), lineHeight 20px, fill bound to VariableID:74:37. Taken from Table assembly caption nodes and applied unchanged, so all 35 captions are typographically identical. No raw values introduced.',

  placementAdaptsToWidth: {
    rule: 'The convention is the four fields, their names, their order and their type — NOT their geometry. Placement follows the frame width.',
    sidebar: 'At 2240+ content width (Table assembly, 2368 frame): a 400px caption column beside the example, in a HORIZONTAL section with itemSpacing 40.',
    stackedRow: 'At 1536 content width (the five 1632-wide frames): a HORIZONTAL "Caption" auto-layout inserted directly under the Section heading, four FILL columns with itemSpacing 32, giving 360px per column.',
    whyNotOneGeometry: 'A 400px sidebar beside a 1536 example area needs 2072 of frame width. Widening five frames would change the Compositions page, which is hand-laid-out and grows in HEIGHT only. The stacked row keeps every frame at its existing width.'
  },

  applied: {
    date: '2026-08-31',
    newCaptions: 23,
    byFrame: {
      '371:780 Autocomplete open state': 6,
      '154:11 Select + Menu': 5,
      '161:110 Button group segment row': 5,
      '822:1649 Alert with actions': 4,
      '187:47 Dialog assembly': 3,
      '446:3 Table assembly': '12 already present, unchanged'
    },
    totalCaptionedSections: 35,
    nothingRemoved: 'Purely additive. Existing Intro and Note prose was left exactly where it was and now reads as detail below the caption. No text was deleted or rewritten to make room.',
    geometry: 'All six frames unchanged in width (five at 1632, Table assembly at 2368). Height only: Autocomplete 4442 to 5138, Select + Menu 4109 to 4609, Button group 2849 to 3429, Alert 4149 to 4573, Dialog 4890 to 5158.',
    pageIntact: 'All seven Compositions-page sections verified unmoved after the pass, zero section overlaps, zero COMPONENT or COMPONENT_SET nodes inside any composition frame.'
  },

  residual: 'Table assembly names its caption containers "N Section name (caption)" while the five new frames name theirs "Caption". The fields, order, labels and text styles are identical; only the container name and placement differ. Left as-is because the Table names encode the section number, which is useful. Noted so it is a recorded difference rather than a discovered one.',

  staleClaimsCorrectedInFrames: 'While applying the convention, three claims in 161:110 Button group segment row were found to be disproved by the code-defect verification and were rewritten: split buttons are 8 files not 7; "use the published Split button component instead" was wrong because Split button exists in Figma but NOT in packages/design-system, so those files had nothing to import; and the selected-state idiom is five definitions across five packages, not two identical ones, with four of the five losing the selection on hover. See codeDefectRegister2026_08_31 D4 and D5.'
};

// Resolve the open decision on the Table assembly entry
s.tableAssembly2026_08_31.deliberateDeviation =
  'This frame was NOT reshaped to the 1632-wide template. It is 2368 wide with twelve sections already built to 2240, and its own Shows / Use when / Not this when / Source caption convention is accurate and richer than the template note. Reshaping would have destroyed good work. Template-level additions were made instead: header with counts and marker legend, an Anatomy section with parts legend, three GAP markers, and How to build one with an explicit Not established paragraph. RESOLVED 2026-08-31 by captionConvention2026_08_31: the two conventions were at different levels and never in conflict. This frame keeps its width and its caption sidebar; the other five frames adopted the same four fields as a stacked row under each section heading.';

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('written. keys:', Object.keys(s).length);
