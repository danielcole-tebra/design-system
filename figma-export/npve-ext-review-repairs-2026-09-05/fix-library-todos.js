// Replaces the corrupted items 16 and 17 in LIBRARY-TODOS.md (backticks were expanded by the shell on the first write).
const fs = require('fs');
const P = 'figma-export/library-todos/LIBRARY-TODOS.md';
let t = fs.readFileSync(P, 'utf8');
const EOL = t.includes('\r\n') ? '\r\n' : '\n';
const start = t.indexOf('## 16. Chip has no dropdown style');
const end = t.indexOf('## Checked and left out');
if (start < 0 || end < 0 || end < start) throw new Error('anchors not found');
const items = [
  '## 16. Chip has no dropdown style',
  '',
  '**Wrong.** The Allergies source shows the severity as a green pill reading "Mild" with a caret, a chip that opens a menu. Chip (156:171) has color=success but only a Delete icon boolean; there is no caret or trailing-icon slot, so a consumer cannot express a dropdown chip.',
  '',
  '**Fix.** Add a trailing-icon slot or a Dropdown boolean to Chip (Figma-only affordance, Sentence case), defaulting to the DownCaret glyph, or publish a documented Chip + caret pattern. Then swap the NPVE stand-in.',
  '',
  '**Evidence.**',
  '- Source: NPVE NDE-2026 `Clin_Allergies` 129:7726, severity control I129:7816 (Akkurat LL Bold 14 label).',
  '- Target: `Allergy severity selector` 352:3206 (local stand-in; fill bound chipSuccessBackground, radius bound radius/chip, live DownCaret); GAP marker 404:7061 "Dropdown chip" beside the Allergies comparison 356:6236 on Screens.',
  '- Flags: `npveExtReview_allergySeveritySelectorUnmarked` (GAP, medium); marked 2026-09-05 by `npveRebuild_extReviewRepairs_2026-09-05`.',
  '- Screens: `figma-export/npve-external-review-2026-09-05/comparison-allergies-356-6236-1x.png`.',
  '',
  '## 17. Chip cannot carry a bold prefix',
  '',
  '**Wrong.** The Procedures/Surgical History source shows metadata pills that lead with a bold prefix ("CPT: 27427", "For: MCL Tear, Left Knee"). Chip has one Label at one weight, so the prefix cannot be emphasised inside a published Chip.',
  '',
  '**Fix.** Decide whether a two-part label (Prefix + Label, prefix bold) belongs on Chip as a Figma-only affordance, or whether the product should render the prefix at one weight. If the former, add a Prefix text property with an empty default; then swap the NPVE stand-in.',
  '',
  '**Evidence.**',
  '- Source: NPVE NDE-2026 `Clin_ProSH` 648:3473, event card pills.',
  '- Target: `Procedure history metadata` 337:3881 (local outlined badge with separate Prefix and Value text, all paints bound); GAP marker 404:7070 "Chip with bold prefix" beside the Procedures comparison 339:6481 on Screens.',
  '- Flags: `npveExtReview_procedureMetadataBadgeUnmarked` (GAP, medium); marked 2026-09-05 by `npveRebuild_extReviewRepairs_2026-09-05`.',
  '- Screens: `figma-export/npve-external-review-2026-09-05/comparison-procedures-339-6481-1x.png`.',
  ''
].join(EOL) + EOL;
t = t.slice(0, start) + items + t.slice(end);
fs.writeFileSync(P, t);
console.log('fixed items 16 and 17; EOL', JSON.stringify(EOL));
