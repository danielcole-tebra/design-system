# Tebra library reference

Builder reference, consolidated 2026-10-31. Use the section for the component you need. This is **documented evidence, not a live library audit**. No code, Figma, publishing or consumer updates were performed for this draft.

## Evidence and availability

Code facts below come from the archived TEBRA-DESIGN-SYSTEM.md (design-system 0.18.3, MUI 5.15.12 at time of documentation). Figma facts name their dated read where available. A demonstrated code prop, a Storybook option, a Figma property, a published update and an accepted update in your file are distinct. Read current componentPropertyDefinitions from the actual set before setting properties; never infer supported axes from names or historical variant counts.

Source abbreviations used here:
- **T §n**: archive/builder-docs-2026-10-31/TEBRA-DESIGN-SYSTEM.md, section n.
- **F id**: archive/builder-docs-2026-10-31/FLAGS.md, named finding.
- **B**: figma-export/button-outlined-check-2026-09-02/report.md, live variable/property read recorded 2026-09-02.
- **C**: audits/2026-09-29-cleanup-batch/REPORT.md.
- **N**: audits/2026-09-29-note-body-units/REPORT.md.
- **P**: archived PLUGIN-NOTES.md, cited operation.
Read these only to resolve a specific missing fact. Historical records are not instructions to resume old work.

## Efficient execution

These tools reduce transport/reporting overhead; design rules and required verification still apply.

1. **Fit reads to the budget.** `node tools/builder/read.cjs FILE --index` gives the current heading map; `--section "Exact heading"` selects a reference section. Read a complete required skill in one call when it fits. The reader defaults to 16,000 characters, with `--chars 1000..24000` for available output capacity; allow about 6,000 output tokens for ordinary English prose at the default size, more for dense content. Follow MORE offsets until END, keeping the same options. Native bounded reads are also fine. No mandatory 6,000-character pagination or repeated reading of satisfied prerequisites.
2. **Search through the wrapper.** `node tools/builder/bundle.cjs search` emits the self-contained `createSearchRunner` for the orchestration runtime. Create it with the actual search tool plus `store`/`load`, then call `runner.search(args, "unique-cache-key")`; print only that return value. It retains the full response and automatically caps the entire output at 12,000 characters, including at most five candidate names/exact keys/types/library identities per query and omission counts. Batch only known needs; restrict to verified library keys when available. `runner.page(cacheKey, {queryIndex, offset})` reads omitted stored candidates; `runner.select(cacheKey, queryIndex, candidate.index)` returns the exact key without retyping it. Unknown schemas return needs-inspection with the cache key, never a false empty result. Inspect retained data narrowly; never dump it or rerun a successful query to recover keys.
3. **Import and use together.** Carry published keys between calls. Import/select/use remote components, variables and styles in the same construction call using returned objects; do not depend on imported node IDs resolving in a later call. Deduplicate only inside that call. Imports are writes: obey the tool's retry signal, never blindly replay a partially completed build.
4. **Return the complete audit wrapper.** `node tools/builder/bundle.cjs audit` emits all required functions for Figma. Set `figma.skipInvisibleInstanceChildren=false`, collect 1–20 actual library instances plus measured assertions `{name, actual, expected}`, and end with `return await auditEvidence(instances, assertions)`. Examples include actual panel width versus 550, actual visible copy versus required copy, actual token IDs versus resolved IDs, and observed clipping/reaction findings versus expected results. The wrapper compares values and internals, then automatically caps the **whole envelope**, preserving total checked/failed/omitted counts and bounded failure previews. Do not append raw text/style/binding trees around it. Save the assertion script with evidence; inspect omitted failures narrowly. Root INSTANCE/COMPONENT and root-name differences are expected; descendant structure, padding, paints and bindings still count. Scoped overrides need review, not a relaxed comparator.
5. **Verify the rest explicitly.** Structural equality does not check copy, effective visibility, size, clipping, reactions or pixels. Inspect required states and assembly, with separate crops when required by the brief or legibility. Recapture affected content after a correction; do not repeat unchanged passing checks.
6. **Record from a file.** Save screenshots, then use a file-edit tool to create `runs/UNIQUE/record.json` using [record.example.json](tools/builder/record.example.json). Replace placeholders with actual results; include compact evidence once. Never embed the JSON in a shell command. Run the short command below: it validates checkpoints/artifact paths, generates REPORT.md and appends one idempotent LOG entry. It does not commit, claim a pass, or verify screenshots for you. Commit/push individually named paths once; report actual push time in final chat. No timestamp-only second commit or duplicate delivery folder unless required.

```powershell
node tools/builder/read.cjs LIBRARY.md --section "Text field"
node tools/builder/bundle.cjs search
node tools/builder/bundle.cjs audit
node tools/builder/record.cjs runs/UNIQUE/record.json
```

Orchestration usage after loading the search bundle: `const runner = createSearchRunner(tools.mcp__codex_apps__figma_search_design_system, store, load); text(await runner.search(args, "assets-UNIQUE"));`. Use the current tool's validated args, including file/session keys. The bundle itself does not call any tool.

For discovery, read imported master definitions directly when enough. If an instance is necessary, create a uniquely named `Inspection · RUN` area outside the review section and use the `inspection` bundle's `retainInspectionInstance(component, area)`. Keep it even after a failed read; never use remove() or a finally-cleanup. Retained inspection IDs belong in the creation ledger. This does not replace the required instance/pixel checks for new variants.

For benchmarks, capture UTC ISO timestamps before preparation, when discovery is ready for construction, immediately after construction returns, after the first reviewable image returns, and after all verification. Record actual input wait separately; do not subtract it. Counts need a stated cutoff; unknown counts/tokens are null, never estimated. Completion after successful push goes in final chat.

Optional `summarizeMatches` and `importComponentsForBuild` remain in helpers.cjs: the first accepts normalized `{name,key,type,libraryKey}` assets; the second takes `(figma, [{alias,key,type}], async assets => { ... })` with COMPONENT/COMPONENT_SET imports. Copy only required functions; Figma cannot require local paths. Local tests exercise transport/recording behavior; live verification remains required.

## Token mappings

**Recorded** means the exact Figma name appears in a recorded read/build, with the value corroborated by T §2.1–2.3. It does not certify today's published/consumer state. **Plan only** means the name appears in foundation/figmaVariablePlan.json; it was a creation plan, not proof that the variable exists. Resolve the actual variable and its collection/scope before binding; never construct a name by replacing dots with slashes.

| Code token/value | Figma variable name | Evidence/status |
|---|---|---|
| action.hover = #CBDDE0, opaque | `color/action/hover` | Recorded B hover instances; 2026-09-29 Button-icon report |
| primary.main = #004852 | `color/primary/main` | Recorded N toolbar; T §2.1 |
| primary.dark = #004852 | `color/primary/dark` | Plan only; current existence/binding unverified |
| primary.100 = #CBDDE0 | `color/primary/100` | Recorded B disabled stroke/text hover |
| primary.200 = #8CB2B6 | `color/primary/200` | Recorded B disabled ink |
| common.white = #FFFFFF | `color/common/white` | Recorded B resting fill |
| core.main = #B3C6C4 | `color/core/main` | Recorded B resting stroke |
| core.contrastText = #004852 | `color/core/contrastText` | Recorded B label |
| secondary.main = #FF8D6E | `color/secondary/main` | Recorded B secondary fill/stroke |
| secondary.light = #FFAF95 | `color/secondary/light` | Recorded B secondary hover |
| secondary.100 = #FFE9E3 | `color/secondary/100` | Recorded B secondary disabled |
| secondary.contrastText = #004852 | `color/secondary/contrastText` | Recorded LOG.md 2026-09-16 Account/Avatar label-token read |
| warning.main = #FCDE73 | `color/warning/main` | Plan only; current existence/binding unverified |
| warning.dark = #F2BA2A | `color/warning/dark` | Recorded SDE Flowsheets row appearance, 2026-09-11 |
| error.main = #D83B4D | `color/error/main` | Recorded recording-controls report, 2026-09-29 |
| text.primary = #000000 | `color/text/primary` | Recorded C caret; N text |
| text.secondary / grey.600 = #545454 | `color/text/secondary` / `color/grey/600` | Recorded N; distinct semantics despite equal value |
| background.paper = #FFFFFF | `color/background/paper` | Recorded C §1 |
| divider / grey.400 = #D6D6D6 | `color/divider` / `color/grey/400` | Recorded C/N; choose by role, not hex equality |
| grey.300 = #F6F6F6 | `color/grey/300` | Recorded N toolbar band |
| substrate input outline = rgba(0,0,0,0.23) | `color/substrate/inputOutline` | Recorded LOG.md 2026-09-16 field-state check; T §3.4 |
| substrate Backdrop = rgba(0,0,0,0.5) | `color/computed (no palette)/alphaBlack50` | Recorded 2026-09-29 encounter-shell-complete report §2 |
| Composition spacing 0 / 8 / 16 / 32 px | `space/0`, `space/8`, `space/16`, `space/32` | Recorded N; 32 was missing in an earlier historical finding |
| Composition spacing 24 px | `space/24` | Recorded F mobileCapture_dialogActionPaddingIsMuiSubstrate (token observation only, not global dialog padding) |

Other needed values require a targeted lookup; see OPEN-ISSUES.md `token-map-unverified`. Do not substitute a same-hex token with a different meaning. In particular, action.hover and primary.100 are equal today but not interchangeable. Filled warning text rgba(0,0,0,0.87) is computed substrate; its Figma mapping is unverified, not Tebra text.primary.

The theme is light-only. Tebra supplies palette, typography and components; default spacing multiplier 8 and shape radius 4 are MUI substrate. Bare numeric sx spacing is multiplied by 8. The palette does not guarantee every code token has a Figma variable. (T §§1.2, 2.1–2.3.)

## Typography

Akkurat LL; fallback stack Helvetica - Neue, Helvetica, Arial. Normal letter spacing (0). No Medium face: requested 500 renders Regular. Use bound library text styles where they exist; token-bound text is allowed where an approved composition has no component. This table gives values, not unverified style IDs. (T §2.5.)

| Style | Size / line-height px | Weight |
|---|---|---|
| h1 | 32 / 48 | Bold 700 |
| h2 | 24 / 36 | Bold 700 |
| h3 | 20 / 32 | Bold 700 |
| h4 | 16 / 24 | Bold 700 |
| h5 | 14 / 20 | Bold 700 |
| subtitle2 | 12 / 16 | Bold 700 |
| body1 | 16 / 24 | Regular 400 |
| body2 | 14 / 20 | Regular 400 |
| caption | 12 / 16 | Regular 400 |
| button | 16 / 24 | Regular 400; capitalize |

The authored ramp has no h6, subtitle1 or overline. They fall through to substrate. With fontSize=16/htmlFontSize=16, pxToRem(n) renders n × 16/14: 14.29% inflation. Use the intended integer in Figma and record the computed value; explicit rem ramp values above do not inflate. Do not round away an authored fractional value without recording a decision.

## Button

**Appearance → Figma props:** visually outlined = `variant=contained, color=primary`; filled coral = `variant=contained, color=secondary`. The former has white common.white fill, 1px core.main border, core.contrastText label and action.hover hover ground. "Secondary action" is hierarchy, not necessarily color=secondary. Clarify if the request explicitly intends the colour prop; do not silently substitute it. (T §3.1; B.)

Recorded Figma axes: variant contained/text; color primary/secondary/error/inherit; size small/medium/large; State Default/Hover/Disabled. Exact IDs/property suffixes must be read locally. There is no recorded outlined variant value, despite an outlined appearance. Raw MUI outlined support is not a claim of a themed or published Figma variant.

Contained heights small/medium/large 30/38/42; text 28/36/40; radius 24, no shadow. Small label body2; generic text override makes primary and secondary both primary.main. Labels capitalize. Inherit depends on context in code; historical Figma text/inherit is white, so do not assume arbitrary inherited ink. Code permits four colours, not success/info/warning. Source and Figma coverage can differ (the earlier reference grid omitted inherit). (T §§1.3, 3.1; B.)

## Icon button

For `color=default`, hover/active background is **action.hover #CBDDE0 opaque**, mapped to **color/action/hover**; glyph grey.600, disabled grey.500. Primary glyph primary.main with action.hover; error glyph error.main with error.light hover. This is not the 4% Checkbox/Radio ripple. (T §3.3; token table.)

Recorded Figma supports small/medium, with 18/24 glyph slots and 34/40 boxes; padding 8 both. No large or resting-ring path was available in the 2026-09-16 read. Do not resize a nested glyph and assume it took. SDE's local Button-icon was a scoped workaround, not a new published Icon button variant. (F visitDrawer_iconButtonHasNoLargeSize; npveButtonIcon_ruling_buttonIconLocalComponent.)

## Chip

Code default size medium; intended height/radius 32/16, small 24/12. Root pxToRem(13) renders 14.86; intended integer 13 must not be confused with every existing Figma size/style. Read the chosen instance. (T §3.9.)

**Filled primary clickable hover uses primary.dark #004852, identical to primary.main: no visible colour change.** No alternative is approved here. A requested visible change needs a DECISION, not a silent darkening or DEFECT against faithful code. See `primary-chip-visible-hover`.

Outlined primary is white with full-strength primary.main border. Outlined success/info/error retain fills (#C3E7C0 hardcoded / core.light / error.light); warning is transparent. Filled warning hover falls through to warning.dark #F2BA2A. Default clickable hover is alpha(action.selected, 0.12), a faint cream. Hover is documented on the clickable path when onClick is present; do not invent a Figma clickable axis from that. Delete glyph is MUI Cancel with full-strength primary.main. Existing records demonstrate filled/outlined colours and small/medium, not a freshly enumerated current state matrix. (T §3.9.)

## Dialog and Drawer

**DialogTitle uses substrate Typography h6**, off the Tebra ramp: pxToRem(20) renders about 22.86px, requested weight 500 renders Akkurat Regular. Intended Figma size **20px Regular**, not h3 Bold. A 2026-09-29 library use records 20 Regular black; the resolved line-height and published text-style name are not established here. Do not invent either. (T §2.5; F npveReplaceDialog_vsSource.)

Dialog default maxWidth sm changes nothing from MUI; elevation 24, radius 4, runtime Backdrop black at 50%. Historical Figma Dialog lacked a backdrop: use a separate wrapper scrim when appropriate, bound to the evidenced alphaBlack50 variable, not an inserted instance child. This is composition, not a new library variant. (T §3.23; encounter-shell-complete report §2.)

Drawer has no Tebra override. Documented product usage is persistent/right: no scrim/elevation, divider on content-facing side. Do not import mobile sheet radius 32 or its modal behavior as a universal Drawer rule. (T §3.23.)

## Alert

Set severity explicitly; code defaults to info. **Warning colour depends on variant:**

| Variant | Ground | Border/icon and text |
|---|---|---|
| filled warning (banner) | warning.main #FCDE73 yellow | Text rgba(0,0,0,0.87), computed by getContrastText |
| standard warning | background.paper #FFFFFF | 1px secondary.main #FF8D6E coral border and coral icon; text.primary #000000 text |

A top-of-page location alone does not settle the variant; confirm if the brief leaves it ambiguous. Standard info/warning/error are white with coloured borders, not MUI's computed tinted backgrounds. Filled uses elevation 3. (T §3.13, §4.4.)

**Code / Storybook / Figma differ:** Storybook offers severity error/info/warning and variants filled/standard. MUI substrate includes outlined and success; omission from Storybook is not absence from code. A 2026-09-29 Figma use demonstrates outlined/warning with yellow border/icon and coral dismiss cross; a historical feedback spec also uses success. Do not infer the whole variant matrix from either example. Figma's recorded action and dismiss share one trailing slot: two simultaneous affordances require a capability check. (T §3.13; F npveAIResults_alertOutlinedWarningColours, npveVitalsBody_alertActionAndDismissShareOneSlot.)

## Text field

Recorded Figma set: `size=small|medium`, `State=Default|Hover|Focused|Disabled|Error`, `Value=Empty|Filled`, `Fill=None|Paper`; all outlined, with **no variant axis**. A select boolean exposes a fixed caret, not an adornment swap slot. Reads on 2026-09-17 found no start/end adornment slot. A patient search with a leading icon therefore needs the COMPOSITIONS.md workaround or a library change; see `text-field-adornments`. (F libraryTextField_hasNoVariantAxis, libraryTextField_noEndAdornmentSlot.)

Small/medium code heights 40/56; input is otherwise unthemed and transparent. Resting outline rgba(0,0,0,0.23); focused notch 2px primary.main, **no extra global ring** because the inner input resets it. Disabled outline action.disabled rgba(0,0,0,0.5). Select caret does not rotate in this code path. White fields are a scoped appearance choice, not a universal input default. The Fill axis existed in the library but was missing in SDE's imports on 2026-09-29; verify your own consumer. (T §§1.7, 3.4; `consumer-capabilities`.)

## Autocomplete

Field layer follows Text field; 40/56 single-row heights, multiple selections wrap and grow. Code default tags outlined/primary; popup DownCaret, clear MUI Close (not Tebra CloseOutlined); empty copy "No results found". Desktop option height 36, checkbox option 54. Listbox keeps 8px vertical padding despite Menu/List having none. Group label asks 500 but renders Regular. (T §3.20.)

Recorded family parts: Autocomplete/Field, /Option, /Tag; current properties must be read. Old kit popper offset/elevation and popup-indicator rotation were not fully verified; do not copy those guesses. Targeted evidence: REFERENCE-KIT.md Open—need Daniel 24/25. A Text field select caret's nonrotation does not prove Autocomplete's indicator does not rotate.

## Navigation search

Primary navigation uses a separate cobranding theme. In tebraDefault its ground is #004852; nav hover #195b63, not canonical action.hover #CBDDE0. **PatientSearch places MUI SearchOutlined in an end adornment: the magnifier is trailing.** Tebra Icon/Search exists but is not the code's nav glyph. This fact comes from code transcription, not a mobile ruling. A requested leading nav icon is a design departure. Library Nav/Search is distinct from a normal patient search field. (T §§1.8, 3.30; REFERENCE-KIT.md finding 10.)

## Other controls and surfaces

These are documented code behavior, not a promise of complete Figma axes. Read current set properties only for the part being used.

| Component | Essential fact / trap | Source |
|---|---|---|
| Button group / Segment | Default contained/secondary; child primary border/hover can differ from standalone Button; do not add independent button gaps | T §3.2 |
| Checkbox | Tebra glyphs; hover alpha(primary.main, .04); disabled unchecked grey.400, checked/indeterminate primary.100 | T §3.5 |
| Radio | MuiRadioButton override key is invalid; shipping MUI ring/dot and action.disabled .5 remain | T §3.6 |
| Switch | ON primary.light thumb/primary.200 track; OFF grey.400/grey.500; opaque tracks. Medium 58×38, small 40×24 | T §3.7 |
| Form control label | End label; control carries focus. Use its actual typography, not a heading because it labels a question | T §3.8; COMPOSITIONS Actions |
| Paper / Divider / Link | Paper radius 4 substrate; Divider no override; Link primary.main, underline always at alpha(primary.main,.4) | T §§3.10–12 |
| Snackbar | Ground info.dark #004852, or success.dark #2B865A via custom type; body2 white. Not grey.900 | T §3.14 |
| Tooltip | rgba(97,97,97,.92), radius 4, no arrow; pxToRem(11) →12.57, intended 11; 500 renders Regular | T §3.14 |
| Table | Header core.light; head size/weight 14/700; body paper, selected alpha(primary.main,.08), hover action.hover. Line-height unresolved: see issue | T §3.15 |
| Tabs | 48 min-height, 2px primary.main indicator; hover action.hover; no selected ground | T §3.16 |
| Toggle button | Selected action.selected; selected-hover rgba(0,0,0,.12). Plain disabled override selector is dead | T §3.17 |
| List / Menu | List padding 0. Menu elevation 8/radius 4; selected action.selected, selected-hover action.hover; focus white plus 3px primary border | T §§3.18–19 |
| Card | Elevation 1; actions right aligned; CardActionArea disabled by default—clickable code must explicitly enable it | T §3.21 |
| Accordion | Summary 48 collapsed/64 expanded, rotating DownCaret; black glyph bypasses palette | T §3.22 |
| Read more | Separate Tebra composition on text Button; consult T §3.25 for requested inline behavior; story isInline differs from actual $isInline | T §§3.25, 5 |
| Pagination | Selected primary.dark/white, selected-hover #003239; MUI chevrons. Old kit gap 6 was memory-derived, not verified | T §3.26; kit finding 26 |
| Table pagination | Standard Select rows-per-page, not an outlined Text field; toolbar 52 | T §3.27 |
| Stepper | Completed step success.main; disabled does not supply a separate visual state | T §3.28 |
| Avatar / Badge / Circular progress | Substrate/default-driven. Do not transfer a mobile avatar override into the library | T §3.31 |
| DataGrid / TreeView / TreeItem | Separate MUI X packages; documented overrides do not establish Figma coverage; old kit has no exports | T §3.32; kit Accepted 2 |

Card header band is a composition with per-site decisions, not a design-system component (T §3.29). Feedback messages, illustrations and icons have dedicated source entries T §§3.24, 3.33–34; use those only for the specific asset, preserving source SVG paths rather than inventing replacements.

## Uncovered requests

**Slider:** these docs establish no Slider implementation, palette, geometry, Figma variants or state behavior. A 0–10 range supplied by a brief does not establish step, initial value, labels or styling. State that coverage is unknown, ask Daniel for design/source direction, and see `slider-coverage`. Do not assert absence from the live library based on a failed search.

For any other uncovered component, use the same rule: identify what is unknown and make a targeted source/library check if authorized. Do not substitute generic MUI knowledge without labeling it or treat missing documentation as permission to invent.

## API checks by operation

Use the currently installed Figma tool instructions for calling syntax. The following are recorded traps, not a replacement API specification. Read only relevant rows; consult historical PLUGIN-NOTES.md if that operation fails.

| Operation | Required check |
|---|---|
| Read/audit | skipInvisibleInstanceChildren=false; node.visible alone is not effective visibility—check ancestors. Load the same relevant pages for before/after counts; getInstancesAsync can undercount unloaded pages. |
| Import | Carry verified published keys, not remote-copy IDs. Import/select/use in the same call; never assume an imported node will resolve in the next call. |
| Bind paint | Write the resolved colour and preserve the binding object; null binding can silently unbind. Alpha belongs in stored rgba. Never force bound paint opacity to 1 or infer that two alpha readings multiply; sample the render. |
| Clone variant | Descendant componentPropertyReferences can drop; rebind/count them. Cloning a whole set is different; inspect rather than assume loss. |
| Set properties / swap | Read text, visibility and reactions after switching; defaults/overrides can transfer or disappear. A clone-related swap can retain old text despite renamed layers. |
| Expose nested controls | Use exposedInstances for nested properties; parent.componentProperties alone is incomplete. Instances cannot receive new children. |
| Resize/layout | Nested instance/text resize can be ignored; read sizes back. HUG/fixed mode order matters. Check render bounds for label overhang and clipsContent through wrappers. |
| Variant default | Default follows top-left canvas position, not layer order. Code axes/values retain code casing. |
| Wire | Build actions arrays explicitly; changing only deprecated action can be a silent no-op. Read destination IDs, not just reaction counts. Check flowStartingPoints after cloning a start frame. |
| Export/upload | Export actual instances against intended background. get_screenshot may cap at native size; verify export dimensions for 2x. Upload success does not prove node placement—read IMAGE hash. |

Icon construction, only when authorized: preserve SVG viewBox position in its 24×24 frame; SCALE vector constraints; resolve currentColor from the intended token paint; preserve white knockout paths. Name vector layers consistently for swap overrides. Import may add a white wrapper fill: inspect/remove unintended fill. Never modify source glyph geometry to solve a nested-size problem without a scoped design decision. (P Icon recipe, SVG import, traps 18/39/40/41/42/45/46/48/49/50.)
