# Medlist structured table with Open and latest drawer

Created a separate Structured table + drawer page. The structured sig table now has one Open button and a vertical kebab per row; Open targets each medication's reused latest Alpha-style drawer. Separate reconciliation preserved. Awaiting Daniel's visual review.

[Review section](https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=150-21601) · File: yh2F6OUgdI6K0risLtKLEQ

## Timing

Start: 2026-11-16T16:39:28Z. Ready to construct: 2026-11-16T16:42:00Z. Construction returned: 2026-11-16T16:42:21.717Z. First image: 2026-11-16T16:42:44Z. Verified: 2026-11-16T16:44:52Z.

Preparation/discovery: 152s; construction: 21.717s; verification after construction: 150.283s. First image elapsed: 196s; verified elapsed: 324s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- Four editable1440×1112 screens: list, reconciliation, completed fixture and drawer-open context. Table1216 wide with448/96/104/216/92/92/168 columns; review reserves44 px from Medication. All rows59 px. Reduced action width gives Medication108 additional pixels.
- All ten Open actions have medication-specific overlay destinations. Drawers retain their exact original medication properties and existing contextual actions. Each is550×1112, docked at890/0 with preserved bound50% black backdrop, scrolling body, bottom footer and working stored CLOSE reactions.
- Three new local row variants instantiated and rendered. Ten retained row clones pass content/Open-target checks through reviewed/unreviewed/list states; 562 assertions pass. All59 visible stored destination references resolve within the new page.
- Thirteen native component structure/token comparisons and four final measured assertions pass. No visible table overflow; table fonts Akkurat LL; no image-filled nodes in four screen wrappers.
- Viewed list, drawer-open context, review, all three row states, compound drawer and reported/send-failed drawer screenshots. No visual correction required.
- All15 source roots preserved at construction, including the structured table screens/master, latest drawer master and ten original overlay destinations. No library, prior drawer or comparison page edits.

## Findings and recovery

- DECISION — Daniel owns/reviews this new-page exploration, evidence2026-11-16; status requested combination built awaiting visual review. Reuses current structured sig columns and latest drawer per instruction. This supersedes separate row Edit/Details actions only on this new page.
- Reused drawer retains its existing Edit/Resend/View issue and kebab controls. Edit form, action outcomes and kebab menu remain unimplemented as in the source drawer. The task reuses that drawer for now; it does not establish a completed editing workflow.
- Reconciliation, completion and ten-of12 pagination remain prototype fixtures; no clinical completion threshold, backend persistence, keyboard handling or presentation playback is claimed. Stored wiring and screenshots are verified.
- Start/Stop remain em dashes because clinical dates were not supplied. Melatonin's patient-reported/failed-order ambiguity is preserved. Inherited Nav/Search Inter placeholder and locally mirrored patient header are unchanged documented limitations.
- New drawer instances continue linking to local master104:7574; geometry is resized to1112 to match this page. No source master forks or library edits. Earlier page titles and contents remain intact.
- Recovery: a read-only call contained a mistyped API property and was retried. First verification response exceeded48KB and rolled back its inspection clones; sorted semantic property comparisons and a compressed ledger returned successfully. No failed construction or visual fix.
- Timing starts at first recorded clock after initial pull/reference reads, not message arrival. Existing Figma skills, native asset discovery and structured-sig source evidence reused. No fresh component-code audit.

## Observable effort

Counts through visual and native verification: figmaCalls=unavailable; otherCalls=unavailable; searches=unavailable; technicalRetries=2; canvasCorrections=0; clarificationStops=0; tokens=unavailable.

## Reading

- Existing figma-use and figma-generate-design skills and API references from this task; createPage/combineAsVariants declarations checked.
- COMPOSITIONS Sidesheet and body; prior LIBRARY API checks/Button and Rows/cards rules retained. Latest Alpha hierarchy and correction records read for scope.
- Live structured table/variants; live latest drawer master; ten overlay destinations discovered through source-row reactions; source dimensions, properties and native control bindings inspected.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [list.png](list.png)
- [drawer-open.png](drawer-open.png)
- [review.png](review.png)
- [row-states.png](row-states.png)
- [compound-drawer.png](compound-drawer.png)
- [reported-drawer.png](reported-drawer.png)

One fixed-build run; not evidence of a general speedup.
