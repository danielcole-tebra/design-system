# Current medications — design-system and SDE comparison

Date: 2026-11-14. Author: Daniel Cole; Agent: Codex. Read-only review; no Figma changes.

**A01 already uses genuine Design System Rebuild controls, but mixes them with resized control text, local prototype tokens and custom shell/table compositions. SDE is a useful composition reference, not a blanket replacement specification.** The clearest corrections are native field/tab fidelity, semantic token links and reusable control anatomy. Shell, density and action hierarchy require scoped design choices before rebuilding.

## Scope and evidence

- Target: [A01 / Current medications](https://www.figma.com/design/fu7ncgAnIdjvxxxmQILFzK?node-id=11198-3155), 1440 × 1631, in `fu7ncgAnIdjvxxxmQILFzK`.
- A: live [Design System Rebuild](https://www.figma.com/design/YX2n4YLrEpBXNbcc73T6dw), selected component definitions/variants and token values; LIBRARY.md's documented code transcription.
- B1: [SDE Alpha Main](https://www.figma.com/design/ViAWRVVtgkCXzItk0sQ5P0?node-id=530-74188), 1493 × 1033, as directed by the SDE AGENTS.md current-shell reference.
- B2: [SDE Medications catalogue example](https://www.figma.com/design/fdCQVFdvOByaOYIJYag0d6?node-id=1409-26150), 550 × 382, as directed by specs/templates/DEFAULTS.md.
- SDE standards: TYPE-HIERARCHY.md and applicable Main MODULE-CONSISTENCY.md decisions. Historical SDE findings are not reopened.

Inspected the full A01 render, its filter strip, all visible text typography, all ten row boundaries, component provenance, twelve representative controls, and stored reactions. Inspected both SDE renders and the library pagination render. Detailed data and exact node IDs are in [evidence.json](evidence.json).

No live shipping implementation screenshot or fresh source-code audit was available. The prescribed sibling web-app-v2 checkout was absent; a targeted Documents search did not locate its design-system package. Thus “library difference,” “documented code difference” and “SDE difference” remain separate claims. None is labelled a shipping DEFECT merely for differing from these references.

## A. Differences from the design system

| Area | A01 evidence | Design-system comparison / disposition |
|---|---|---|
| **Filter fields** | Show medications `11198:3277` and Order status `11198:3278` are linked small Text fields. Both are **36 px** high; value text **14/20**. | Live source `130:159` has a **40 px input** with value text **16/24**. Its root is 60 only because the source helper is shown. A01 correctly hides helper/required content, but overrides value size/line-height and removes their bindings. Restore native input anatomy unless a scoped exception is chosen. |
| **Tabs** | Both linked tab labels are **14/24**, without font-size/line-height bindings. Containers remain 48 high. | Live and consumed source are **16/20**, 48 high, with a 2 px selected indicator. Four structural/token differences per tab. Restore source bindings; do not substitute a generic body style by assumption. |
| **Small buttons** | Import, Add To Med List, Prescribe, Complete reconciliation and row Edit use native **30 px** small buttons, radius 24, 14/20 labels. | Sampled controls match consumed masters. White outlined-looking actions correctly use contained/primary; coral uses contained/secondary. Small is supported; it is not inherently an error. |
| **Plus icons** | Toolbar actions contain literal “+” in Label; native Start icon and End icon are false. | Native Button has a supported icon-swap slot. If a plus is retained, use that supported anatomy. Whether this page should have a plus is a separate choice; SDE's icon-free Add ruling is Main-specific. |
| **Checkboxes and switches** | Selection checkbox is 42 × 42; reviewed switches are 40 × 24 small/off. | Sampled structure, paints and bindings match consumed masters. Preserve them. The “reviewed” semantic model is product behavior, not defined by the primitive. |
| **Search field** | Drug/pharmacy search is an ordinary 347 × 40 frame with drawn search vectors; no control instance. Resting outline is hardcoded black at .23. | Geometry/outline broadly reflect the documented small input, but native state/property support is absent. Live Text field still exposes no start/end adornment slot. Existing `text-field-adornments` GAP applies: propose a native field plus external SCAFFOLDING icon, or a library extension; no new workaround approval implied. |
| **Overflow / expand controls** | Overflow is a custom 34 × 34 frame with vector dots; timeline chevron is a custom 20 × 20 frame. | Library Icon button supports 34/40 boxes and native states. The overflow matches the small outer size but does not consume its stateful component. The 20 px chevron is a glyph-sized custom control. Prefer a supported control where the action requires one. |
| **Pagination** | Custom frame, 52 high; plain-text “‹”/“›” and a separate tiny caret. No instances. | Live Table pagination is also 52 high, but contains a rows-per-page select and **40 × 40 Previous/Next instances**. Same outer height does not establish equivalent controls or states. |
| **Table heading** | Bound core.light **#D4E0DD**, Bold14/20; most horizontal cell padding is14. | Color and size/weight align. Live normal Table/Cell uses16 padding and head line-height24, although its stored text box is20 high. This corroborates the existing `table-head-line-height` uncertainty; it does not settle shipping line-height or authorize changing the library. |
| **Medication rows** | Ten instances of a local medication-row master; eight columns combine identity, instructions, supply, pharmacy, status and actions. | Legitimate reusable composition. The generic library Table/Row contains four simple Table/Cell instances and exposes State only; it is not a drop-in eight-column medication row. Preserve the richer data model while composing from supported parts. Custom composition itself is not a GAP. |
| **Typography roles** | Page title32/48 Bold; drug names14/20 Bold; instructions, prescriber, duration, refills and pharmacy mostly12/16. Header also uses18/28 name,13/18 allergy text,13/20 action text; navigation14/21. | Page title is a valid h1; drug-name treatment is a valid h5; caption12/16 exists. The 18/28,13/18,13/20 and14/21 shell treatments do not match the documented general ramp. Some component-specific sizes are legitimate, so role/context must be retained when replacing custom shell controls. |
| **Tokens and color** | Worklist uses library aliases. Shell samples use local “Prototype / source semantics” aliases resolving to local hex primitives. “Send failed” is unbound **#B51A2C**. | Sampled local colors match the palette numerically, but are disconnected duplicates. #B51A2C exactly matches live **color/error/dark**, so the difference is binding, not the hue. Move appropriate roles to canonical aliases rather than recoloring by eye. |
| **Compound label** | Local outlined frame, height24/radius12, text12/16; not a Chip instance. | Small Chip's outer geometry is24/12; documented code label target is13. Existing Figma variants must be checked before substitution. Similar geometry alone does not establish chip fidelity. |
| **Paper surface** | Ordinary frame, white token fill, divider border, radius4 and linked elevation effect style. | This is valid composition structure, not evidence of noncompliance merely because the node is FRAME. No need to replace a sound container solely to turn it into an instance. |
| **Global/patient navigation** | Global nav, patient header and left chart navigation contain **zero instances**. Medications and Problems menu items have identical resting treatment. | Live library contains Nav/Bar, Nav/Search and navigation controls. A01 resembles that appearance, but does not consume their anatomy. Current Medications selection has no distinct marker in the inspected render/properties. |

### Verified reuse and limits

A01 contains **101 nested instances: 81 remote and20 local**. The remote instances resolve to eight control variant keys and three icon keys present in the live library's variants/definitions. Local instances are ten medication rows and ten status icons. This resolves the earlier audit's origin uncertainty for A01; it does not certify publication/update acceptance or every source version.

The supplied audit wrapper checked twelve explicit instances against their **consumed** masters:
- Eight pass the structure/token comparator: sampled primary/secondary buttons, checkbox and switches.
- Four differ: two tabs and two filter fields, sixteen differences total.
- Five of six measured geometry assertions pass; the small-filter-height assertion fails36 versus40.

The comparator excludes copy, dimensions, effective visibility and pixels by design; those were checked separately where stated. [control-audit.js](control-audit.js) preserves the script. Its only helper adaptation uses the verified synchronous `mainComponent` getter because asynchronous master resolution attempted a write in this read-only file. No comparison criteria were removed.

## B. Differences from SDE

| Area | Current medications | Current SDE / catalogue evidence | Interpretation |
|---|---|---|---|
| **Screen model** | Full-page worklist, 194 px left chart rail, 1200 px table, current/history tabs. | Main is an encounter workspace with note/module columns and a right module rail. Medications catalogue is a550 px list sheet. | Different jobs and layouts. Do not force the full medication worklist into the old sheet or discard its operational columns. |
| **Patient context** | 142 px custom header with demographics, allergies, alert and a full action row. Patient name18/28. | Main uses a48 px patient-navigation strip plus68 px linked header; patient name20/32. | The header alone is74 px shorter in SDE, but its separate navigation strip uses48 px. Preserve safety context and required actions when assessing the total shell. |
| **Title hierarchy** | “Medications List” h1 32/48. | Main module titles and catalogue “Med List” are h4 Bold16/24. | A01 is library-valid; adopting the compact SDE title is a composition decision tied to the page/module role. |
| **Section headings** | “Medication reconciliation” Bold14/20, black, sentence case,0 tracking. | Study B internal headings are Bold14/20, secondary #545454, UPPER presentation,1 px tracking; verified in Main Summary. | Clear SDE treatment difference. Apply only if that composition convention is adopted; table labels and field labels are not automatically section headings. |
| **Clinical body / metadata** | Directions and much supporting clinical information use12/16; names14/20. | Current standard: main content16/24, metadata14/20. Individual record headings normally14/20. | A01 has materially greater density. Decide what is main content versus metadata before resizing. Main Problems' special16 px record-name ruling does not automatically apply to medication names. |
| **Fields and actions** | Filters36 high with14/20 values; small30 px toolbar actions. | Main select sample is40 high with16/24 values. Current Main Add actions are centered medium38 px, content-width, without a leading plus. | Field difference aligns with A's correction. Button size/placement is contextual; preserve toolbar grouping unless a new layout is chosen. |
| **Spacing and surfaces** | Content inset22; reconciliation gaps12; row text gaps4/2; medication cell horizontal padding14. Mostly white page plus elevated worklist. | Shared composition guidance uses page/body16, tight pairs8 and explicit section gaps. Main uses #F6F6F6 workspace, white cards and16 px outer gutters. | Reconcile rhythm intentionally. Do not impose Main Problems' exact row padding on an unrelated medication table; its rules are scoped. |
| **Medication content/actions** | Full instructions, supply, prescriber, pharmacy, fill/delivery issues, review switches, edit/resend/view issue, selection and timeline. | Catalogue rows show active/discontinued status, drug+dose, indication chip, Add New Medication, row Add to note and Add Section to Note. | Catalogue supplies note-oriented composition knowledge, not equivalent worklist coverage. Indication and note-insertion actions are not present in A01; their absence is a product-scope difference, not a primitive defect. |
| **SDE caveats** | A01 uses Akkurat in nav search. | Main's inherited Nav/Search still uses Inter16/AUTO. Catalogue drug/dose text is18 Regular/AUTO; indication12/18; its historical Add button has a trailing plus and full-width note footer. | Do not copy these inherited treatments as current universal rules. Preserve the distinction between live examples and current written standards. No SDE repair is assigned. |

## Layout, content and behavior verification

- The full render and filter crop were inspected. **181 effectively visible, painted text nodes** were checked against clipping-ancestor bounds, with a1 px tolerance: no text-bound clipping candidates. This is not a proof of glyph-level clipping, accessibility or all future content.
- Ten rows are fixed at1200 px wide. Cell widths are44 /300 /148 /120 /340 /80 /128 /40. Responsive behavior was not tested.
- Every row's eight cell containers remain105 px high. Six rows are89 high with cells at y=-8.5; the93 px row uses y=-6.5;105 px rows use y=-0.5; the117 px compound row uses y=5.5. Row clipping is enabled. Visible text currently fits, but apparent vertical padding is produced partly by clipping taller cells. Rework sizing around visible content before applying larger text or different widths.
- A01 has **zero stored reaction-bearing nodes**. Menus, sorting, search, reconciliation, pagination and row actions are depicted, not demonstrated here. No prototype was played. The “0 of12 reviewed” state and available Complete reconciliation button should be evaluated with the previously inventoried blocked-completion flow, not judged from appearance alone.
- Native colors, correct button variants, h1 title and base checkbox/switch geometry should be retained where appropriate. Clinical safety copy and data coverage are not to be reduced simply to imitate SDE density.

## Disposition and next build boundary

Owner for new medlist design choices: Daniel. All findings above apply to A01 as observed2026-11-14. No Figma workaround is approved/applied by this report.

1. **Confirmed control differences:** restore native field40/16/24 and native tab typography/bindings, retaining labels/state.
2. **Reuse opportunities:** replace custom pagination and action-control imitations with supported library anatomy; preserve legitimate row/surface compositions.
3. **Token differences:** reconnect duplicated shell semantics and unbound palette-equivalent values to the appropriate canonical roles.
4. **Decisions before assembly:** choose compact SDE shell/title treatment versus a full-page worklist treatment; choose clinical text density; decide which SDE section/action conventions apply here. Keep these scoped to medlist.
5. **Existing nonblocking limits:** leading search adornment requires an explicit composition choice; table-head line-height remains unresolved. No new library GAP or shipping DEFECT is asserted.
6. **Verification after an authorized rework:** check all ten current fixture rows, long labels,1200 px table sizing and any newly agreed target widths; render each batch and stop for Daniel's read.

## Evidence and execution record

Screenshots: [A01](a01-current.png), [filter strip](a01-filters.png), [library pagination](library-pagination.png), [SDE Main](sde-main.png), [SDE medications catalogue](sde-medications.png). All five were visually inspected.

[record.json](record.json) contains timing/coverage and limitations. [evidence.json](evidence.json) is the single detailed readback record. No library or SDE file was modified, no new variants were created, and no historical SDE backlog was reopened.

Two initial overbroad detail reads exceeded the transport limit; one subsequent geometry read hit its explicit size guard. They were replaced by bounded, targeted reads. Async remote resolution was rejected in read-only mode and replaced with synchronous existing-object reads. No canvas changes occurred in these attempts. The builder record generator requires construction timestamps, so this read-only audit is recorded directly without invented build checkpoints.

