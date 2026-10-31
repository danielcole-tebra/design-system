# Compositions

Current assembly guidance, distilled 2026-10-31. Read only the applicable pattern. Values for individual controls live in LIBRARY.md. IDs below are dated locators, not evidence of current publication or cross-file availability: confirm the referenced part before reuse. No Figma was changed for this document.

## Scope and reuse

The Composition System (`oNrOL9kQCpJHyK4rBCGqsq`) records canonical compositions and consumes the library. A composition plate can be a reference image rather than an importable component. Project-local masters stay local; use their anatomy as a recipe without claiming they are published library parts. Add a canonical pattern after it has been built twice. Keep each ruling's scope, decider, date and overrides with it.

Archived SDE and mobile records are evidence, not tasks to resume. Reusing a pattern in a new project does not authorize editing its source file. Do not transfer mobile-only dimensions, avatar treatments or navigation decisions to desktop.

## Rhythm

Default separation/inset 16; tight related pairs 8; sections within a body 24; first field in a body gets 8 top inset. Page gutter 16. These are composition rules, not a mandate to change library internal padding. Use existing spacing variables; LIBRARY.md lists only evidenced mappings. Source: pre-consolidation COMPOSITIONS.md introduction. Exceptions remain scoped and recorded.

## Sidesheet and body

Established SDE recipe: shell 550 wide, header 72, divider 1, body inset 16 giving 518 content, footer 71. A placed sheet follows its content height; do not pad a short body to the master's 600 height. Docked corners are square. Floating radius 8 was a local SDE value, not a verified global library radius token.

Add a body through the shell's `Body content` preferred values; do not fork the shell or change its default. A new body state belongs in its existing variant set. Preserve the library controls inside it. A fixed-height screen with scrolling is a separately specified composition.

Locators in SDE `fdCQVFdvOByaOYIJYag0d6`: Sidesheet `279:2446`, body example `412:3889`, Picker `94:812`, List with status menu `156:2426`, full-width footer action `732:9985`. These are local reference parts. Source: historical COMPOSITIONS.md Sheets and 2026-09-05 external-review repair record (sheet/comparison techniques). Existing historical fixed-height exceptions are not repair work.

## Edit forms on paper

Approved scope: Allergies, Family History and explicit derivatives. **Card and fields are white paper**, bound to `color/background/paper`; the field outline provides separation when both are white. Retain the library border and floating-label notch and verify that notch against its actual background. Preserve planned values and approved focus/resting states. Each form keeps its approved action mapping; the word Save alone does not determine colour.

Daniel, 2026-09-23; documented/applied 2026-09-29. Overrides the former local pale teal Form surface `#EEF7F9`. Reference bodies: `634:6808`, `636:3`, `586:6414`, `580:6017`, `389:3469` in SDE; MODEL TEST `642:7557` is historical and excluded. Evidence: archived APPEARANCE-NPVE-EDIT-FORMS.md and audits/2026-09-29-cleanup-batch/REPORT.md §1. This records a settled appearance; it does not reopen SDE repair work.

## Actions and section labels

A visually outlined secondary action uses the Button mapping in LIBRARY.md §Button: `variant=contained, color=primary`. This is backed by code and a library read, not solely a mobile ruling. Match the approved form's size and action order. Literal `color=secondary` is coral and is a different request.

Token-bound text is allowed for section labels; a missing section-label component does not block a label. Use the approved type/ink and rhythm. Daniel, 2026-09-14, recorded in LOG.md "Problems Edit · Links = yes variant": "Token-bound text is text, not invention." SDE's Type/Links example uses Bold 14/20, secondary ink, 8 before its rows; do not turn that example into a rule for every heading. Questionnaire example `732:8713`: h4 form heading, body1 Regular question labels.

## Rows and cards

Use a reusable row/card master, not repeated loose frames. Historical SDE examples: record card `346:3089` (title, metadata, actions; 16 inset, 8 related-line gap), summary row `153:1186` (status, content, actions, optional row-owned divider), section group `534:5805` (heading 8 above contiguous rows). Preserve source content and approved states. Choose width behavior before cloning; check long labels and optional actions on an instance.

Table heading band: 518 content with background extending 16 each side to the 550 sheet edge; this does not make every cell row 550 wide. Historical local `752:13439` and library `1107:148` are separate locators; publication/import status is unverified. Head line-height evidence conflicts; see OPEN-ISSUES.md `table-head-line-height` before deriving a new height.

## Search and other adornments

See LIBRARY.md §Text field before choosing a search field. The recorded library lacks start/end adornment slots. An established workaround is an outer frame containing a Text field instance plus an overlaid `Icon/Search` instance, labelled SCAFFOLDING. It is a workaround to propose when needed, not permission to silently change field internals or invent spacing. Confirm acceptance and text clearance for a new use. Navigation search is a different component, with its own theme and a trailing magnifier.

## Page patterns

Historical Proposals locators in `zKT34LQogNjz3Z07fY4VQB`: rail page `31:116` (Nav/Bar, 256 rail, 1184 content); chart page `168:249`; patient header `31:336` (900×72 reference); patient action row `46:196` (56 band); left rail `31:213` (48 row pitch); insight band `168:578`; ledger `168:582`; standing record row `168:2377`. These are reference compositions, not a claim that those widths fit every screen. SDE's local patient header became 900×68 by Daniel's 2026-09-29 ruling; it does not supersede the Proposals header globally.

## Comparison and verification

For a requested source comparison, preserve a frozen source at 1:1 beside the live rebuild and explain approved differences. Keep tall references at natural size; do not shrink them into a 600px slot. A short sheet's helper stays transparent below the sheet. Where a nested instance ignores resize, a hugging auto-layout helper can let the slot grow; read back and render it.

For normal new work, screenshot affected variants and the assembled section, not a new comparison apparatus for every minor edit. Check the actual target width and longest required state before copying into many screens. For interactive work, list action → destination → visible result; a stored reaction and a reachable frame do not prove the result state exists or that the prototype was played through. Historical recording overflows and unfinished SDE destinations remain history.

## Provenance

The original complete index is preserved at archive/builder-docs-2026-10-31/COMPOSITIONS.md. This file retains reusable recipes and scopes; mobile details remain in that history and the Visit Companion project. It does not normalize differences between source projects.