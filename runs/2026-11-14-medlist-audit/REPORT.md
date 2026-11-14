# Medlist audit — scope and flow inventory
Date: 2026-11-14. Read-only Figma audit. File: `fu7ncgAnIdjvxxxmQILFzK`; [combined page](https://www.figma.com/design/fu7ncgAnIdjvxxxmQILFzK/Tebra---eRx-Concepts?node-id=9901-57198). No Figma nodes, library assets, or prototype wiring changed.

## Identification and proposed boundary
The linked node is the page **eRx Med Mod - Med List + R4R**, not a medlist-only section. Its [coverage index](https://www.figma.com/design/fu7ncgAnIdjvxxxmQILFzK/Tebra---eRx-Concepts?node-id=11212-16733) identifies 120 editable wireframes across 12 groups, attributed to `Ordering-v2-Med-Review-Errors-2026-11-02.html`, build `70fb21ad30d1`. This is the index's attribution; the HTML was not inspected.

The best current medlist entry is [A01 / Current medications](https://www.figma.com/design/fu7ncgAnIdjvxxxmQILFzK/Tebra---eRx-Concepts?node-id=11198-3155). Treat the dated November 2 groups as the candidate audit baseline, based on the explicit “START HERE / All active prototype workflows” index. This is an evidence-based recommendation, not a new approval of that version.

| Scope | Frames | Documented states |
|---|---:|---|
| [A — Chart and medication lists](https://www.figma.com/design/fu7ncgAnIdjvxxxmQILFzK/Tebra---eRx-Concepts?node-id=11212-16597) | 12 | Current/history, selection, search-empty, send-failure filter, expanded timeline, pagination, facesheet, table settings, allergies, restricted information, overflow actions |
| [B — Reconciliation](https://www.figma.com/design/fu7ncgAnIdjvxxxmQILFzK/Tebra---eRx-Concepts?node-id=11212-16610) | 18 | Not started → partial → all reviewed; blocked completion; confirmation unchecked/checked; dated completion; reopening; exception reason and recorded result; empty vs explicitly confirmed no-known-medications; correction/clear; patient-reported use |
| [C — Records and actions](https://www.figma.com/design/fu7ncgAnIdjvxxxmQILFzK/Tebra---eRx-Concepts?node-id=11212-16629) | 13 | Signed Rx and audit history; add active/discontinued; single/bulk discontinue; pharmacy cancellation; mark error; reactivate; notes; print; coupon; encounter context |
| [D — Delivery and patient information](https://www.figma.com/design/fu7ncgAnIdjvxxxmQILFzK/Tebra---eRx-Concepts?node-id=11212-16643) | 9 | Filled/pending/failed send; requested information → verified → submitted → received, plus send failure; cancellation awaiting pharmacy |
| [E — Surescripts import](https://www.figma.com/design/fu7ncgAnIdjvxxxmQILFzK/Tebra---eRx-Concepts?node-id=11212-16653) | 5 | Consent acknowledgment/accepted/declined; external history; select medications and current/history destination |
| [G01–G09 — Edit and renew](https://www.figma.com/design/fu7ncgAnIdjvxxxmQILFzK/Tebra---eRx-Concepts?node-id=11212-16670) | 9 | Unchanged/changed edit, replacement review, chart-only/bulk edit, single/bulk/compound renewal, discard changes |
| [P — Mobile views](https://www.figma.com/design/fu7ncgAnIdjvxxxmQILFzK/Tebra---eRx-Concepts?node-id=11212-16726) | 2 | Current list and expanded clinical timeline; project-local references |
| **Working medlist boundary** | **68** | **66 desktop frames at 1440 px; 2 mobile frames at 390 px** |

These are screen-state counts, not 68 independent user journeys. The tight core is A–E (57 states); edit/renew and mobile extend it.

**Excluded review work:** [N — AI note and medications to review](https://www.figma.com/design/fu7ncgAnIdjvxxxmQILFzK/Tebra---eRx-Concepts?node-id=11212-16715), 10 states, including recording/transcribing, missing details, full edit, selected prescriptions, sent result, and pharmacy search. Also exclude the earlier AI Note Assist / Medications to Review reference and Akkurat-master frames. “Ready for review” is the user's scope description; the live section is named “AI note and medications to review.”

**Adjacent, inventoried only:** F prescribing/order review (10), H requests/PA (20), I practice settings (5), J Ordering v2 (5), and G10–G11 assistant/delegated renewal (2): 42 states. Their names and wiring counts were inventoried only to establish the boundary. They are not included in the medlist content audit.

Preserved generations remain distinct: eight REFERENCE/Akkurat frames, [Akkurat current-list master](https://www.figma.com/design/fu7ncgAnIdjvxxxmQILFzK/Tebra---eRx-Concepts?node-id=11100-2), [October 28 rebuild](https://www.figma.com/design/fu7ncgAnIdjvxxxmQILFzK/Tebra---eRx-Concepts?node-id=11133-1453) with four desktop screens, local source components, reference variants and construction archive. Do not merge their differences silently. The October 28 current-list copy differs from A01's explicit reset-on-reopen/refresh wording.

## What is documented versus demonstrated
Live enumeration found **120 frames**, **zero reaction-bearing nodes within those frames**, and **zero page flow starting points**. All descendants, including invisible instance children, were considered. This conclusion applies to the twelve indexed workflow groups, not every archived/reference node in the file. No prototype was played.

The frames provide substantial state coverage but do not verify transitions, guards, persistence or terminal outcomes. Representative copy was read for B05, B14, C07 and E05:
- B05 requires confirmation after all 12 current medications have been reviewed.
- B14 explicitly distinguishes “No known medications” from an unconfirmed empty list and includes dated provider attribution.
- C07 says the prescription remains active until the pharmacy confirms cancellation; D09 names the waiting state.
- E05 specifies a 48-hour acknowledgment, current/history destinations, and duplicate-review guidance.

Next flow tracing should connect triggers to outcomes, especially after import, discontinue/error/reactivate, resend and pharmacy response. Those terminal results are not separately established by the named state inventory; they may reuse a base list state. Do not call them missing functionality without inspecting the attributed prototype or specification.

## Initial design-system baseline
The file reports subscriptions to Tebra Brand Launch Kit, Old UI Kit and Tebra Working UI Kit. Design System Rebuild is available to add, not listed as subscribed. Subscription state alone does not prove an instance's origin or accepted-update state.

A01 has **101 nested instances**, **213 text nodes**, **147 text nodes with a style ID**, and **209 with at least one variable binding** (including hidden content). These are structural counts, not visible-text compliance percentages. The title is Akkurat LL Bold 32/48, matching LIBRARY.md's h1. Existing local definitions include desktop current/history medication rows, collapsed/expanded phone cards, and three status icons. This supports reusing the composition knowledge while verifying each published asset later.

Master provenance could not be completed: `getMainComponentAsync` was rejected as a modification in read-only mode. No import was attempted to bypass that restriction. The read continued using existing instance names, local definitions and text properties. No claim is made that those 101 instances all use Design System Rebuild.

Relevant system references read: LIBRARY.md Typography, Other controls and surfaces, Dialog and Drawer; COMPOSITIONS.md Rows and cards; OPEN-ISSUES.md table-head-line-height. The future mapping covers tables/rows, tabs, search/select, checkbox/switch, buttons/menus, pagination, dialog/form and status messaging. Published variant/content capabilities remain unverified; **no new library GAP or shipping DEFECT is established**.

## Project audit observations / provisional register
Owner for scope/design decisions: Daniel. Evidence date for all entries: 2026-11-14. Scope: this consuming page. Workarounds: none approved or applied. These are nonblocking for the audit.

| ID / status | Evidence and impact | Next disposition |
|---|---|---|
| ML-01 · DECISION · proposed | Multiple generations coexist; November 2 index claims active coverage. Selecting the wrong reference could restore older reconciliation semantics. | Use A01 and A–E/G01–09/P as the working baseline; settle canonical scope before rebuilding. |
| ML-02 · documentation observation · open | Zero stored reactions in indexed frames. End-to-end behavior is not demonstrated by this Figma page. | Trace the attributed prototype/spec; record action, guard, destination and resulting data state. |
| ML-03 · DECISION · open migration discrepancy | B05 title `11199:10175` is Akkurat Bold 24/36; documented DialogTitle is intended 20 Regular. | Verify the applicable Dialog and choose whether to adopt it; no silent screen correction. |
| ML-04 · visual/content observation · open | E05 screenshot splits “Select” across lines and shows concatenated option/instruction text above repeated “Value / Choose list” controls. | Preserve intended import behavior; identify source-copy/structure corrections before reconstruction. Not classified as a shipping defect. |
| ML-05 · verification limitation · open | Library subscription state, existing token bindings and read-only master-resolution rejection do not establish current published-component provenance. | Inspect selected existing definitions/keys and supported properties when migration work begins. |
| ML-06 · known library uncertainty · nonblocking | Table header line-height remains unresolved in OPEN-ISSUES.md (14/20 vs 14/24 evidence). | Verify applicable code/substrate before deriving new table geometry; do not reopen SDE history. |

## Evidence and limits
[inventory.json](inventory.json) retains exact IDs/names of all indexed states and the selected older rebuild. [evidence.json](evidence.json) contains frame dimensions, instance counts, wiring results, baseline text metrics and sampled flow copy. [record.json](record.json) records audit checkpoints/limitations. Screenshots were downloaded and visually inspected: [A01](a01-current.png), [B05](b05-reconciliation.png), [E05](e05-import.png).

This pass establishes scope and named state coverage, with representative content and visual checks. It is not a complete component parity, accessibility, responsive, clipping or behavioral audit of all 68 states. No new variants were instantiated; structural instance-to-master comparison was therefore not claimed. No source-code or shipping-screen comparison was performed.

This was not a benchmark or build. Start time was not instrumented; total elapsed time is unavailable. The builder recording helper requires construction timestamps and would misrepresent this read-only audit, so the audit record and one LOG entry are maintained directly.

