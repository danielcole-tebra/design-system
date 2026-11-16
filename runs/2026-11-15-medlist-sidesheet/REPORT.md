# Medlist · SDE-style details sidesheet exploration

Created page 03 Medlist · Sidesheet exploration from Comparison F. Ten 65 px rows retain medication identity, last activity, quantity, order status, selection and review, with one Details button. A 550 px SDE-derived drawer contains the supporting details and medication actions. The list and an open-drawer context are ready for Daniel's first-batch visual review.

[Review section](https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=104-8366) · File: yh2F6OUgdI6K0risLtKLEQ

## Timing

Start: 2026-11-16T01:08:10.242Z. Ready to construct: 2026-11-16T01:14:06.000Z. Construction returned: 2026-11-16T01:15:36.000Z. First image: 2026-11-16T01:15:48.000Z. Verified: 2026-11-16T01:19:43.000Z.

Preparation/discovery: 355.758s; construction: 90s; verification after construction: 247s. First image elapsed: 457.758s; verified elapsed: 692.758s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- Six actual native control/header structure-and-token comparisons and 399 measured assertions pass. The separately identified inherited navigation-font discrepancy remains documented below.
- Ten rows and ten medication-specific detail destinations. Both list/context screens are 1440×1156. Row grid44/420/176/136/224/96/120 totals1216; each row65 px. Native selection, review and Details controls are independent.
- All ten drawers preserve the source name, directions, prescribed date, prescriber, quantity, duration, refills, pharmacy, phone, status and applicable compound/source markers. Original action labels Edit/Resend/View issue are retained in the footer.
- Drawer width550; header72; body insets16 and usable width518; footer71. Content-driven heights592 for standard cases,624 compound,620 patient-reported. Authored integer geometry; no code-derived rem value rounded.
- No visible row/drawer clipping after targeted corrections. Every new drawer text uses Akkurat LL; library styles and colour/spacing bindings applied. Global navigation typography matches source F, including its existing Inter placeholder.
- List, final open context, compound, patient-reported/send-failed and patient-info-required screenshots saved and viewed. Final screen export1440×1156, without the earlier one-pixel border overflow.
- Stored ten Details→OVERLAY destinations and twenty close reactions resolve correctly. Context close buttons navigate to the list. Flow start points to104:4423. Full-viewport transparent wrappers position content at890,133; no backdrop. Presentation mode was not played through.
- New page has7088 editable descendants:2 components,2320 frames,1718 instances,784 vectors,2238 text nodes,26 rectangles; zero image fills. Counts include retained hidden source layers. Complete encoded7089-node ledger includes the page itself.
- F source dimensions and content checked; source masters, A–F and original working screen were not edited. New page request is the explicit scope exception to older automatic comparison-refresh guidance.

## Findings and recovery

- DECISION · Daniel · Scope G on new page104:4346 ·2026-11-15 · Requested exploration built, visual acceptance pending. First review batch complete; no second build batch before Daniel's read. Latest F remains the source, not superseded.
- Local source SDE docked-right shell279:2416 in fdCQVFdvOByaOYIJYag0d6 was read and rendered. Exact key98571022f217816aed456921d16501b60e515d99 cannot be imported. G uses a local composition of its550/72/16/71 anatomy with native Tebra controls, not a published SDE shell or a claimed exact mirror. The scoped whole-view library search returned no applicable composite; this is not proof of general absence.
- Actions move to the drawer while issue statuses remain visible in the list. This adds one click before Resend/View issue. Daniel owns acceptance of that tradeoff. Editing, resending, issue resolution and overflow menu flows are not implemented by this design study.
- Overlay is authored as a right-anchored, content-height sheet over the list, without reflow or scrim. It intentionally covers right-hand columns while open. Transparent full-viewport prototype wrapper is needed because overlay position properties are read-only; no presentation playback or persistent underlying-list interaction claimed.
- Inherited consumer Nav/Search placeholder and its actual imported State=Default master2:72 (key0878407fadd1f03e9b2075eadd3aed844ea5e16f) use Inter Regular, unlike the documented Akkurat LL product ramp. Present in F before this batch; preserved inside published internals. Nonblocking DECISION recorded in OPEN-ISSUES, not a confirmed shipping DEFECT. Source code path is absent, so no fresh code audit or Code Connect mapping was possible.
- Initial build failed on overlayRelativePosition for a non-MANUAL target; tool explicitly reported safeToRetryWithoutCanvasRead=true, edits uncommitted. Retried with full-viewport overlay wrappers. One earlier read typo also returned safe retry with no mutation.
- First visual check found horizontal field wrappers at1 px and inherited status instance at1 px. Corrected their root sizing. Measured checks then found a1 px stroke-in-layout overflow; disabled stroke inclusion on the local shell. All final checks pass for authored content. Earlier screenshots retained as evidence.
- Timing starts from the session timestamp in the local transcript; preparation includes required discovery/skills. This is a single run measurement, not a general benchmark.

## Observable effort

Counts through verification: figmaCalls=unavailable; otherCalls=unavailable; searches=2; technicalRetries=2; canvasCorrections=2; clarificationStops=0; tokens=unavailable.

## Reading

- AGENTS.md; LIBRARY Efficient execution, API checks, tokens, Typography, Button, Icon button, Dialog and Drawer, Navigation search; COMPOSITIONS Sidesheet/body, Rhythm, Rows/cards; current medlist SPEC and F construction/verification evidence.
- Figma use, generate-design and generate-library skills with relevant API/font/layout/prototype references; live F row/property/style/token discovery and SDE shell anatomy.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [list.png](list.png)
- [open-verified.png](open-verified.png)
- [compound.png](compound.png)
- [reported.png](reported.png)
- [issue.png](issue.png)
- [source-f.png](source-f.png)
- [open.png](open.png)
- [open-final.png](open-final.png)

One fixed-build run; not evidence of a general speedup.
