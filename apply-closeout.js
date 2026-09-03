// Batch close-out schema writes: metric replacement, audit retirement,
// code-defect register pointer, and the Nav structural finding.
const fs = require('fs');
const P = 'design-system-schema.json';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));

// --- Item 2: drop the instance ratio, replace with a binary check -----------
s.handDrawnCheck2026_08_31 = {
  _scope: 'Replaces the instance-ratio metric for every composition from this point on. Defined once here so the remaining compositions follow it.',
  supersedes: 'fourCompositions2026_08_31.instanceRatioMethodNote, and the 87.5% / 92% baselines the build prompt cited.',
  whyTheRatioWasDropped: 'The 87.5 and 92 figures came from a method that was never written down and could not be reproduced by any measure applied across six frames. A percentage that cannot be recomputed cannot be checked, and three different denominators (all authored nodes, excluding annotation, UI elements only) each gave a different answer with no principled way to choose. Do not re-baseline it and do not carry it forward.',
  theCheck: 'Binary, per frame: is any UI element drawn by hand where a published library component exists? Yes or no. Where yes, name the specific elements.',
  exemptions: [
    'SCAFFOLDING — an element drawn because a Figma instance cannot host children (a listbox that cannot be a Paper, a Menu past its four slots, a Table/Row that cannot take real cells).',
    'ANNOTATION — headers, legends, captions, markers, section labels, anything that describes the frame rather than being an example in it.',
    'INEXPRESSIBLE — a state, variant or content shape no published component can express (a selected ButtonGroup segment, a small-density table cell, a two-line Menu/Item).'
  ],
  reportingRule: 'Every hand-drawn UI element must be assigned to exactly one of the three exemption categories, or the answer is YES and it is a finding. Say which category each falls in.',
  whyThisIsBetter: 'It is what the ratio was a proxy for, it cannot drift, and a wrong answer is falsifiable by looking at the frame.'
};

// --- Item 6: audits retired -------------------------------------------------
s.auditsRetired2026_08_31 = {
  decision: 'library-parity-audit.html, compositions-to-build.md and old-kit-deprecation-audit.html are retired. design-system-schema.json is the only register. Do not consult the audits for counts; scan for the number with composition-scan.js.',
  movedTo: 'C:/Code/tebra-catalog/audits/archive/, with a README.md stating the reason and listing the known errors.',
  whyRetired: 'Wrong three times, each time with something downstream inheriting the error: Menu recorded as having no properties when it has 8; <Table> recorded as 15 files when 15 is the TableContainer count and <Table> is 21; Autocomplete recorded as 58 files when it is 88. A fourth figure from the same generation — MuiRadioButton affecting 52 files — is also wrong; verified 38.',
  rootCause: 'Line-based grep. It misses a call site whose props begin on the next line, and misses TSX generic call sites entirely. composition-scan.js reads balanced braces and resolves import source per file, which is why its counts and the audits diverge.',
  notMoved: {
    file: 'library-parity-gaps.md',
    status: 'Superseded by gap-list-sorted.md by that document own opening statement, but NOT named in the retirement decision, so left in place. Flagged in the archive README as a candidate.',
    forDecision: true
  },
  stillLive: ['audits/code-defects.md', 'audits/gap-list-sorted.md']
};

// --- Item 3: code defect register ------------------------------------------
s.codeDefectRegister2026_08_31 = {
  _scope: 'Defects in shipping code, as distinct from Figma GAPs. Collected once across all six built compositions rather than filed individually. No tickets, by decision.',
  document: 'C:/Code/tebra-catalog/audits/code-defects.md',
  rule: 'A GAP is something a Figma component cannot express and stays marked in the frame. A defect is something wrong in packages/design-system or its consumers and goes in the register. Compositions keep marking gaps; they do not gain defect prose.',
  entries: {
    D1: 'MuiRadioButton is not a MUI slot (MuiRadio is), so RadioButtonOverrides never applies. 38 files / 98 elements. The file carries only defaultProps, so what is lost is ripple suppression, not styling — radios are the only control in the system that ripple. One-line fix.',
    D2: 'outlined is unstyled at the theme layer in THREE components, not two. MuiButton (101 el / 71 files), MuiButtonGroup (4 / 4), MuiAlert (1 / 1). All 37 override files swept; these are the only three. Aggravated by containedPrimary already being a white button with a core.main border, so Tebra contained-primary and MUI stock outlined occupy the same visual niche without being the same thing. Button at 71 files is the widest-reaching defect found.',
    D3: 'AlertOverrides has no standardSuccess rule (3 el / 3 files take that path) AND no success key in iconMapping (affects all 5 success alerts). CheckmarkFilledIcon already exists and is exported. Both one-liners.',
    D4: 'Split button is published in Figma (627:161, 8 variants) but does not exist in code — no match for *split* anywhere in design-system/src. 8 production files hand-roll it, in 7 packages, with two different caret icons. This is a library-parity defect, not a misuse defect: those files had nothing to import. appointment-workflow-ui/src/components/SplitButton.tsx is a complete reusable implementation sitting in a feature package.',
    D5: 'The selected segment state is hand-rolled FIVE times in five packages, not twice. Three hardcode #ffffff, two use a token, a sixth copy is pasted into a .md. Four of the five have no hover rule, so ButtonOverrides.containedPrimary &:hover wins and hovering a selected segment discards its selected appearance — #004852/white flips to #CBDDE0/#004852. EventTypeSelector is the only one that pins hover.',
    D6: 'LOWER CONFIDENCE, needs an intent decision. standardWarning borders with secondary.main (#FF8D6E brand orange) rather than warning.main (#FCDE73). Looks deliberate — the yellow is near-invisible at 1px and warning.light equals warning.main, suggesting an unfinished ramp — but it is unmarked either way. 43 warning elements.'
  },
  countsCorrected: {
    radioFiles: '52 -> 38',
    splitButtonFiles: '7 -> 8',
    selectedStateDefinitions: '2 packages -> 5 definitions in 5 packages'
  },
  methodLimit: 'MUI slot names and MUI v5 stock appearance were validated from knowledge, not from @mui/material — the package is not installed in this checkout and installing it was out of scope. The claim that Tebra rules are ABSENT is read directly from source and is not an inference.'
};

// --- The Nav structural finding, which is not a composition -----------------
s.navComponentsOnCompositionsPage = {
  _status: 'OPEN — structural problem in a published library. Not a composition, and must not be lost in the composition queue.',
  problem: 'The entire Nav component family is defined inside a frame on the Compositions page that is labelled as a theme variant. Six components, fourteen with variants. These are the only component definitions anywhere on the Compositions page.',
  whyItMatters: 'Compositions are unpublished reference frames by decision (libraryRestructure2026_08_26c.settledDecisionsApplied.compositionsAreReferenceFrames). Component definitions living there means the Nav family is defined in a place the library treats as non-authoritative, and labelled as a variant of something rather than as itself.',
  consequence: 'Anyone building on nav is building on components whose home contradicts the page they sit on. Resolve before that happens.',
  nextStep: 'Determine where the Nav family should live and whether it is published, then move it. Verification to date is a count of what is there, not a plan for it.',
  relatedTo: 'fourCompositions2026_08_31.pageLayoutIntact — any move must preserve the hand-placed Compositions page layout.'
};

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('written. top-level keys now:', Object.keys(s).length);
console.log('new keys:', ['handDrawnCheck2026_08_31', 'auditsRetired2026_08_31', 'codeDefectRegister2026_08_31', 'navComponentsOnCompositionsPage'].filter(k => k in s).join(', '));
