# Medlist · Current provenance and remaining differences

Owner/reviewer: Daniel Cole. Builder: Codex. Evidence date: 2026-11-14.

## Running comparison · Established 2026-11-14

[Open the comparison page](https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=17-882). Per Daniel's page-location correction on 2026-11-14, working screen `2:1811` stays on original page `0:1` (01 Current medications). Comparison copy `23:881` lives on page `17:881`, beside the locked natural-size PNG reference of original A01 `11198:3155`. The original editable source and working screen are linked on the board. The original baseline is visual, not a native editable copy.

Daniel requested keeping this comparison current as the work proceeds. Future medlist batches must edit `2:1811` on its original page, refresh the separate comparison copy, update affected comparison rows and date, and append a dated history entry. The copy is not automatically synchronized. Keep the original baseline fixed; retain superseded evidence. Current node IDs and maintenance protocol: `../2026-11-14-medlist-comparison/state.json`. No remaining layout decision was approved by this comparison request.

History: the first comparison batch moved the working frame to page `17:881`; Daniel then directed that it remain on the original page. That earlier location/maintenance choice is superseded by the instructions above. Evidence: `../2026-11-14-medlist-page-correction/REPORT.md`.

This register supersedes the first-batch composition claims in `../2026-11-14-medlist-native/SPEC.md`. Primitive fidelity does not establish composition approval.

## Daniel's current decision

Use the Patient header from [SDE Updated 11/13](https://www.figma.com/design/ViAWRVVtgkCXzItk0sQ5P0?node-id=1319-4655). After the additional authored compositions were identified, Daniel selected: **“Replace the header and document the remaining differences.”** Thus the worklist and chart rail are left in place for review; they are not retrospectively approved.

## Corrected header provenance

- Exact source: frame `1319:4656`, visible shell `1319:4659`, header `I1319:4659;974:16288`.
- Source master: `Patient header`, key `06bddbc3ab5ce64fe2563d499652e204d6902115`. Cross-file import returned “Component … not found.” No source file or library was modified.
- Replacement: a faithful **local mirror**, master `9:784`, placed instance `9:818`. This is not a published header or a live cross-file connection to SDE.
- All 34 nodes match the source comparison for hierarchy, type, names, visible dimensions, layout, typography, paints and canonical bindings. Root identity and stale geometry under hidden ancestors are excluded explicitly. Source-specific Avatar ink and 14/20 Link typography were copied, not inferred.
- Native descendants remain Avatar, Link and the hidden Attention icon from Design System Rebuild. No new glyphs or foundation tokens.
- Source is 1493 × 68; the placed header is 1440 × 68 using the captured layout behavior. The actual instance passed 21 measured assertions and a master comparison, with no content exceeding parent bounds.
- Jane Doe's name, sex, DOB, age, restricted status and severe penicillin allergy come from A01. Phone, MRN and balance are dashes; a “Collect Payment ($151)” action is not treated as proof of account balance.
- The SDE header does not have the old action row, separate gender/sex-at-birth fields or patient-alert count. Those were not moved into a newly invented arrangement. The old header remains in archive `9:852` and its local master is marked superseded.
- Original allergy details and the old action/alert context remain in the archived original and source evidence. “View all” is static; no functional allergy flow or cross-file prototype destination is claimed.

## Full-screen provenance register

All unresolved rows below are **DECISION**, owned by Daniel, scoped to this medlist, status **unapproved; documented for review**, evidence date 2026-11-14. They do not block the requested header correction. Builder owns faithful execution after a decision. No new workaround is approved.

| Region | Verified input | First-batch change / remaining difference |
|---|---|---|
| Global navigation | Published `Nav/Bar`, key `a0ddf46b289a6aeb17ad295ca709af8c9afeb7ac` | Verified library component, with A01 practice text. Its clinical selected state/search wording is not an exact copy of the new SDE shell. Only the patient header was replaced in this correction. |
| Patient header | Exact SDE instance above | Corrected. Explicit local mirror; source fidelity verified, distinct from library publication. |
| Chart rail | A01 `11198:3244`, 194 wide, 52 row pitch | First build locally assembled a 192-wide, 48-pitch rail with different spacing/type treatment. This is not a verified SDE navigation component. |
| Page heading | A01 `11198:3268` and h1 “Medications List” | First build changed copy to “Medications”, h1 32/48 to h2 24/36, and placed Import beside the title in a different heading/tabs assembly. Native button/tab fidelity does not approve these changes. |
| Content gutter and worklist | A01 content 1246 with 22 insets; paper 1202 / table 1200 | First build chose content 1248 with 16 insets and table 1216. It also omitted the source paper's elevation-1 effect. Those are authored layout/surface choices. |
| Toolbar | A01 filters/actions `11198:3276`, 77 high, gap16, select widths220/200 | First build uses a 73-high local toolbar, gap8, select widths208/184 and flexible search. Native fields at40 and native plus slots are verified component corrections; toolbar proportions were authored. Search has no leading icon because the native field has no adornment slot. |
| Reconciliation | A01 `11198:3897`, 116 high; left text group and right controls | First build made a 123-high vertical composition: progress at upper right, instruction across width, switch left/button right below. This was a redesign of the source arrangement. |
| Table columns | A01 `[44,300,148,120,340,80,128,40]` | First build chose `[44,300,144,136,300,96,156,40]`, and shortened/reworded column headings. Native Table/Cell internals are verified; column design is unapproved. |
| Medication row density | A01 reusable row master `11144:1181`; caption12/16 for much metadata | First build created a new local row with 16 inset, 8 gaps, top alignment and body2 14/20 directions/metadata. It is taller and less dense. Correct data and library controls do not establish row-composition fidelity. |
| Status/pharmacy | A01 `11144:1158`: status icon plus text/destination group | First build created four local text-only status variants with bold status, stacked pharmacy/phone and error ink. Status values match source, but icon removal and presentation were authored. |
| Timeline / overflow | A01 has custom compact controls | First build uses verified native Icon buttons, but moved the timeline affordance into the medication cell. Component substitution and placement are separate decisions. |
| Compound label | A01 local outlined label | First build uses native small Chip. The component is verified; the label renders as published (12/18), differing from documented intended code size13. No library correction is authorized here. |
| Pagination | Published `Table pagination`, 52 high | Verified native component replacing A01's custom pagination. Copy remains “1–10 of 12”. |

## What the audit can and cannot claim

### Individual row review · 2026-11-14

Daniel identified odd spacing and text volume. [Isolated row study](https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=28-882) on the original page compares the current first row with a compact proposal, plus compound, patient-reported/send-failed and patient-info-required cases. Owner: Daniel; scope: medlist rows; type: DECISION; status: proposal, not approved or applied. Evidence: `../2026-11-14-medlist-row-review/REPORT.md`.

Proposed changes: vertical cell inset 16 → 8, related gaps 8 → 4, supporting metadata 12/16, and existing timeline control alongside actions. Names and directions stay 14/20. Exact visible copy and existing column widths are preserved. First row falls from 143 to 81 px; original A01 was 105 px with smaller directions text. Compound case is 109 px, patient-reported case 101 px, and patient-info-required case 81 px. No disclosure flow was created; deciding whether phone/prescribing-source details should move into expanded details remains open. Working screen and full-page comparison remain unchanged. This proposal does not approve other recorded composition changes.

The live screen inventory contains 706 editable descendants, including 203 instances, 185 frames, 96 vectors, 221 text nodes and one rectangle; zero image-filled nodes and zero unresolved instance masters. Native descendants are distinguishable from the local header mirror and the four unapproved local composition families (toolbar, reconciliation, row, order/pharmacy). Source medication copy was verified in the preceding batch and was not changed here.

The initial statement that a fully verified screen was ready overstated a primitive audit. The current conclusion is: **the requested header is now source-derived and verified; additional authored compositions remain explicitly unapproved and documented, per Daniel's instruction.**

No remaining workflow or interaction is declared implemented. No SDE historical backlog or source-library changes are included.
