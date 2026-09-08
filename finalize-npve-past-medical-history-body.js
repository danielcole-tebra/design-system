// Finalizes the medium-risk PMHx body/sidesheet pilot after the file-wide deterministic audit and visual inspection.
const fs = require('fs');

const P = './design-system-schema.json';
const ID = 'npveRebuild_pastMedicalHistoryBody_2026-09-08';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));
const r = s[ID];
if (!r || !String(r._status || '').startsWith('IN PROGRESS')) throw new Error(`${ID} is not IN PROGRESS`);

r._status = 'DONE. Medium-risk PMHx body and sidesheet pilot built by Codex through P4.d and finished by Claude from P4.e; four operator decisions reported, none resolved. Operator review of comparison.png required before further pilot work.';
r.executors = {
  build: 'Codex (OpenAI gpt-5.6-sol, xhigh): Phase 0 through P4.d, stopped 2026-09-08T19:46Z at the operator request.',
  finish: 'Claude (Anthropic claude-fable-5-1): P4.e file-wide audit, P4.f comparison inspection, evidence, record, finish gate, commit.'
};
r.outcome = [
  'Created Past medical history body 546:5871 (518x388): three live approved section instances plus the published multiline Text field, 16px between children, paper-bound fill.',
  'Appended the body to the shared Sidesheet Body content preferred values (12 to 13); default, 12 existing properties, and 550x600 variant geometry unchanged.',
  'Placed one content-driven sheet at 550x564 (header 72, divider 1, body region 420, footer 71) with source footer labels.',
  'Created the three _Rebuild comparison sub-components and the sole comparison instance 561:9877 on Screens; comparison slots now hold 16 preferred values each.',
  'Body proof 552:5930 and sheet proof 555:10031 remain on Templates beside the master, following the row and section pilot convention.'
];
r.findings = { GAP: 0, DEFECT: 0, DECISION: 4 };
r.decisionsForOperator = [
  'Footer label casing: source "Save & Add to Note" renders "Save & Add To Note" because the published Button applies TITLE case and code typography sets the button variant to textTransform capitalize. Library follows code. Add a change-log row or leave unlogged?',
  'Comments field state: source shows the focused state (teal outline); rebuild shows the resting state. Only the height change is logged. Log the state change, or switch to a focused variant?',
  'Reference resolution: frozen source is a 1x capture (582x616) where rule 15 asks for 2x; Health Status and Social History references are 2x. The row and section pilots also used 1x. Accept 1x for pilots, or schedule a 2x re-capture batch?',
  'Two live sheets on Templates: the Rebuild sub-component holds 559:6085 and the standalone proof 555:10031 duplicates it. Keep proofs as a pilot convention, or archive them after review?'
];
r.sourceBackedDifferences = [
  'Legacy 32px rows become approved 42px touch-target rows.',
  'Heading-to-row spacing becomes the approved 8px tight relationship.',
  'Header/body/footer geometry follows the canonical NPVE Sidesheet contract (72/16/71) instead of the legacy fixed 600px scaffold (64/8/60).',
  'Comments uses the published small multiline Text field at 88px instead of the detached 110px source field.'
];
r.corrections = [
  'Codex, P3.c: the empty body wrapper stayed at its 1px scaffold height so the first 16px gap rendered transparent; corrected to true vertical hug before later sections.',
  'Claude, P4.e: renamed wrapper frame 547:5870 to carry the SCAFFOLDING label required by standing rule 6 (it hosts the Comments column label beside a section instance).',
  'Claude, P4.e: renamed standalone sheet 555:10031 to "Past Medical History Sidesheet — proof" so the Rebuild sub-component 559:6084 is the single placement per rule 15.'
];
r.figmaMutations = [
  'Templates: created organizer section 546:5870 and body component 546:5871 with children 547:5870 (HEAD wrapper: section instance 547:5871 + Comments column label 547:5892), 548:5882 (EYES), 550:5902 (CUSTOM ITEMS), 551:5914 (Comments Text field).',
  'Templates: created body proof 552:5930 and sheet proof 555:10031 (Sidesheet 6:65, Body content 546:5871).',
  'Templates: appended 546:5871 to Sidesheet set 279:2446 Body content preferred values (12 to 13).',
  'Templates: created sub-components 558:6084 Reference (frozen image 558:6085), 559:6084 Rebuild (sheet 559:6085), 560:6172 Change log (four Change log/Row 18:103 instances).',
  'Templates: appended the three sub-components to Rebuild comparison 35:332 slot preferred values (now 16 each).',
  'Screens: created organizer section 561:9876 and sole comparison instance 561:9877 with slots swapped and captions set.',
  'Templates (finish): renamed 547:5870 and 555:10031; no geometry, paint, or property change.'
];
r.createdNodes = {
  templatesSection: '546:5870',
  bodyComponent: '546:5871',
  headWrapper: '547:5870',
  headSectionInstance: '547:5871',
  commentsColumnLabel: '547:5892',
  eyesSectionInstance: '548:5882',
  customItemsSectionInstance: '550:5902',
  commentsTextField: '551:5914',
  bodyProof: '552:5930',
  sheetProof: '555:10031',
  referenceHelper: '558:6084',
  frozenSourceImage: '558:6085',
  rebuildHelper: '559:6084',
  rebuildHelperSheet: '559:6085',
  changeHelper: '560:6172',
  screensSection: '561:9876',
  comparison: '561:9877'
};
r.verification = {
  fileIdentity: 'PASS — 0:1 Cover, 3:2 Templates, 27:2 Screens, 126:2 Archive.',
  pageWalk: 'PASS — all four pages walked with skipInvisibleInstanceChildren=false: Cover 8, Templates 8788, Screens 4034, Archive 1528 nodes.',
  unboundPaints: 'PASS — Cover 1, Templates 37, Screens 38, Archive 10; the only additions are the two organizer sections’ fill and stroke.',
  fractionalGeometry: 'PASS — zero authored fractions outside published instances on every page.',
  sharedApi: 'PASS — Sidesheet preferred values 13, default 26:221, three variants 550x600, 12 existing properties unchanged; comparison slots 16 preferred values each.',
  geometry: 'PASS — body 518x388 hug with 16px gap; sheet 550x564 = 72 + 1 + 420 + 71; Rebuild helper has no fill so nothing extends below the 564px sheet.',
  componentIdentity: 'PASS — sections resolve to 534:5805, rows to 518:5772/518:5785, field to 77:709, sheets to 6:65, comparison to 35:332, change rows to 18:103.',
  instancePaints: 'PASS — 40 visible solid paints, zero master/proof mismatches.',
  comparison: 'PASS — inspected comparison.png at 1x; Rebuild column matches the live sheet within 62 anti-aliasing pixels; live sheet unchanged since the Codex stop (47 px).',
  archiveCheck: 'PASS — Archive holds no node with id >= 538; the higher node count is a counting-method difference, not a move.'
};
r.standingBatchRules = {
  '1_instancePaintVerification': 'PASS — the body proof and the live sheet were placed and their rendered solid paints compared with the master: 40 paints, zero mismatches.',
  '2_unboundPaintAudit': 'PASS — every top-level node on every page was walked; only the two organizer sections add unbound paints.',
  '3_referenceCounts': 'PASS — body master carries 26 componentPropertyReferences entries; Sidesheet preferred values 13; comparison slots 16 each; one PMHx body comparison on Screens.',
  '4_skipInvisibleFalse': 'PASS — figma.skipInvisibleInstanceChildren was false for every audit walk.',
  '5_opacityLast': 'PASS — no paint-level opacity was authored or remediated.',
  '6_enumerateDontRecall': 'PASS — page trees, preferred values, slot contents, and Archive top-level nodes were enumerated from the live file.',
  '7_fileIdentityFirst': 'PASS — target key passed explicitly on every call; four-page inventory verified before any read informed a decision.',
  '8_roundWithRecord': 'PASS — no fractional authored geometry; all new layout values are integers.',
  '9_boundPaintAlpha': 'PASS — bound paper, text, and icon bindings were preserved; no bound alpha was overwritten.',
  '10_cloneDropsPropertyRefs': 'PASS — no variant was cloned; nested row, heading, field, and button references were counted and rendered values verified against stored properties.'
};
r.screenshots = [
  'figma-export/npve-past-medical-history-body-2026-09-08/source-sidesheet-129-9205.png',
  'figma-export/npve-past-medical-history-body-2026-09-08/body.png',
  'figma-export/npve-past-medical-history-body-2026-09-08/rebuild-sidesheet.png',
  'figma-export/npve-past-medical-history-body-2026-09-08/sidesheet-555-10031.png',
  'figma-export/npve-past-medical-history-body-2026-09-08/reference-helper.png',
  'figma-export/npve-past-medical-history-body-2026-09-08/comparison.png'
];
r.flagsAfter = s.flags.length;
r.flagsAdded = [];

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('finalized', ID, 'flags', s.flags.length);
