// Finalize only from the saved, visually inspected live Figma evidence.
const fs = require('fs');
const cp = require('child_process');
const lib = require('./scripts/schema/lib');
const DIR = 'figma-export/npve-allergies-edit-2026-09-09';
const ID = 'npveRebuild_allergiesEdit_2026-09-09';
const raw = JSON.parse(fs.readFileSync(`${DIR}/live-audit.json`, 'utf8'));
const assert = (ok, message) => { if (!ok) throw new Error(message); };
assert(raw.pages.length === 4 && raw.pages.every(p => !p.fractional.length), 'page geometry audit failed');
assert(raw.instances.pairs.length === 6 && raw.instances.pairs.every(p => p.equal), 'instance paint audit failed');
assert(Object.values(raw.instances.counts).every(n => n === 1), 'comparison placement count failed');
assert(raw.controls.placements.length === 1, 'multiple comparisons');
assert(raw.instances.placeholderErrors.length === 0, 'visible placeholder errors');
assert(raw.instances.image.size.width === 1100 && raw.instances.image.size.height === 1346, 'reference size');
const button = raw.controls.controls.find(n => n.name === 'Add');
assert(button.props['Label#83:165'] === 'Add' && button.h === 30 && button.props.size === 'small', 'Add button mismatch');
for (const file of ['report.md', 'comparison-allergies-edit.png', 'comparison-with-markers.png', 'rebuilt-sheet.png']) assert(fs.existsSync(`${DIR}/${file}`), `Missing ${file}`);
const ids = {
  templatesSection: '634:6807', formComponent: '634:6808', bodyComponent: '634:6809', formInstance: '634:6810',
  rebuildHelper: '634:11955', sheet: '634:11956', referenceHelper: '634:12416', frozenSourceImage: '634:12417',
  changeHelper: '634:12418', screensSection: '634:12489', comparison: '634:12490',
  gapEndAction: '634:13016', gapDropdown: '634:13025', defectBack: '634:13034'
};
const pass = details => ({ pass: true, details });
const rules = {
  '1_instancePaintVerification': 'PASS — six actual comparison instances matched their masters: 191 solid paints, no color/alpha/binding mismatch.',
  '2_unboundPaintAudit': 'PASS — all four pages walked; only new unbound paints are organizer section fills/strokes; existing exceptions preserved in live-audit.json.',
  '3_referenceCounts': 'PASS — no variant clone; stored property values verified against rendered text. Body choices 15→16, comparison choices 18→19, defaults unchanged.',
  '4_skipInvisibleFalse': 'PASS — skipInvisibleInstanceChildren=false for every final page and instance audit.',
  '5_opacityLast': 'PASS — no paint-opacity override authored.',
  '6_enumerateDontRecall': 'PASS — live four-page trees enumerated; actual IDs and counts saved.',
  '7_fileIdentityFirst': 'PASS — explicit target fileKey and four-page identity verified; source/library read only, task-specific target deviation retained.',
  '8_roundWithRecord': 'PASS — zero fractional authored geometry on all four pages; no new rounding decisions.',
  '9_boundPaintAlpha': 'PASS — inherited bound paints retained; actual instance alpha and binding match master.',
  '10_cloneDropsPropertyRefs': 'PASS — no variants cloned; all eleven change rows and controls render supplied labels in the placed comparison.'
};
const audit = {
  format: 'tebra.design-batch-evidence', version: 1, itemId: 'npve-allergies-edit', capturedAt: new Date().toISOString(),
  executors: { build: 'Earlier VS Code sessions; completed by Codex takeover', finish: 'Codex' },
  fileIdentity: { fileKey: 'fdCQVFdvOByaOYIJYag0d6', pages: ['0:1 Cover', '3:2 Templates', '27:2 Screens', '126:2 Archive'] },
  auditConfiguration: { skipInvisibleInstanceChildren: false, scope: 'Every node on every page; actual comparison instances; shared defaults and geometry; visual inspection.' },
  checks: {
    unboundPaints: pass('Cover 1, Templates 43, Screens 42, Archive 20. Only the two new organizer sections add exceptions; detailed IDs in live-audit.json.'),
    fractionalAuthoredGeometry: pass('Zero on all four pages.'),
    referenceCounts: pass('One new comparison; form/body/helpers each occur once. Shell choices 16, comparison choices 19 each; defaults unchanged.'),
    componentIdentity: pass('Actual IDs, library keys, sizes and properties in live-audit.json; all controls preserve component connections.'),
    propertyReferences: pass('Allergen, Mild, radio labels, reactions, Add, Comments, footer and eleven change rows verified in rendered text and screenshot.'),
    instancePaintVerification: pass('Six master/instance pairs, 191 solid paints, no mismatches.'),
    sharedDefaultsAndGeometry: pass('13 shell properties, original defaults, three 550×600 master variants unchanged. Placed sheet 550×644 = 72+1+500+71.'),
    reference: pass('Frozen image hash 821b8e8d522caa54ca7b84156229d652d4bc7d12, 1100×1346, FIT at 550×673.'),
    sourceAndLibrary: pass('Read only. Every write targeted fdCQVFdvOByaOYIJYag0d6.')
  },
  createdNodes: ids, pageAudit: raw.pages, instanceAudit: raw.instances.pairs,
  corrections: ['Title and clipped Severity', 'Hidden helper text and clipped floating labels', 'Actual small bordered Add variant and text', 'Resting multiline Comments with sample text cleared', 'Plan Button variant/height corrected from code and published component'],
  visualReview: { comparisonRender: `${DIR}/comparison-allergies-edit.png`, inspectedByExecutor: true, operatorApproval: 'Pending; comparison shown, next item not started', observations: ['Full content order matches source; approved floating labels and canonical spacing applied.', 'No clipped controls or placeholder sample text; footer complete.', 'Known two GAPs and back DEFECT marked alongside comparison.', 'Original and rebuild are at natural size; helper backgrounds are transparent below the content.'] },
  standingBatchRules: rules,
  toolCalls: { figmaRead: null, figmaWrite: null, screenshot: 5, correctionCycles: 2, note: 'Full inherited session call totals not instrumented; null means unavailable.' }
};
fs.writeFileSync(`${DIR}/audit-allergies-edit.json`, JSON.stringify(audit, null, 2) + '\n');
lib.finalizeRecord(ID, r => {
  r.beforeTakeover = { status: r._status, fileIdentity: r.fileIdentity, figmaMutations: r.figmaMutations, findings: r.findings };
  r._status = 'DONE — Allergies edit built, verified and shown; awaiting operator visual review before Family History.';
  r.executor = 'Earlier Cline/VS Code sessions; completed and verified by Codex';
  r.fileIdentity = 'PASS — explicit target fdCQVFdvOByaOYIJYag0d6; Cover 0:1, Templates 3:2, Screens 27:2, Archive 126:2. Remote write tools authenticated and working. Earlier capability limitation superseded.';
  r.createdNodes = ids;
  r.figmaMutations = ['Repaired the inherited form; converted frame 614:11471 to reusable component 634:6808, preserving its children.', 'Created body, full sheet, frozen reference, eleven-row change log, and one comparison in section 22.', 'Appended preferred choices only; shared defaults and master geometry unchanged.', 'Reused two GAP markers and one DEFECT marker. No canvas node deleted during takeover.'];
  r.mappingCorrection = { original: r.systemMapping, resolvedAdd: 'Button contained/primary/small/Default, 64×30 with Label Add; published variant key 8fc8f57f80196e40aff7b3b1116226ea0a925120', evidence: ['packages/design-system/src/overrides/ButtonOverrides.ts:40', 'foundation/components.json Button.geometry.contained.small', 'Library 79:2 offers contained/text; 78:2 is the published small primary variant'], reason: 'Original outlined/36px mapping is factually unavailable; use published white bordered small control under code-first authority.' };
  r.findings = { GAP: 2, DEFECT: 1, DECISION: 0, note: 'Existing severity dropdown and end-adornment gaps plus known back-control defect. No new library convention.' };
  r.existingGapsReused = ['npveExtReview_allergySeveritySelectorUnmarked', 'npveProblemEdit_textFieldNoEndAdornment'];
  r.standingBatchRules = rules;
  r.verification = audit.checks;
  r.screenshots = ['reference-2x-129-7826.png', 'rebuilt-sheet.png', 'comparison-allergies-edit.png', 'comparison-with-markers.png'].map(f => `${DIR}/${f}`);
  r.report = `${DIR}/report.md`;
  r.outcome = 'Reusable 518×468 form and body; complete 550×644 sheet; frozen original and full comparison on Screens section 22. Executor checks passed; operator review pending.';
  r.diagnosis = 'Repeated broad searches, suppressed errors, ineffective property changes and a nonexistent planned Button variant caused wasted work. Prior transport root cause remains unverified; no transport error recurred during takeover.';
  r.probeDisposition = '614:11466 already absent at takeover verification; no PROBE nodes on any page. 614:11471 converted to 634:6808. Earlier session logs report PROBE7 removal; this takeover did not delete probes.';
  r.flagsAfter = lib.mergedFlags(lib.loadStore()).length;
  r.decisionsForOperator = ['Visual review of the completed comparison before starting Family History.'];
  // Restore the genuinely original wording accidentally overwritten by the earlier amendment.
  const original = JSON.parse(cp.execFileSync('git', ['show', `ef2952f:records/npve/2026-09-09/${ID}.json`], { encoding: 'utf8' })).record.expectedFinding;
  r.expectedFindingSuperseded_2026_09_09.originalVerbatim = original;
  r.expectedFindingSuperseded_2026_09_09.historyCorrection = 'Recovered exact original from ef2952f; previous amendment had accidentally copied corrected wording into originalVerbatim.';
  return r;
});
console.log('Finalized', ID);
