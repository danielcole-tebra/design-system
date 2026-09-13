# HANDOFF — Tebra Design System Figma build

For the next session. `design-system-schema.json` holds *what was decided* and survives on its
own — read it, don't re-derive it. This file holds *how the work is done*: the method, the traps,
and the queue.

Figma file key: `YX2n4YLrEpBXNbcc73T6dw` — pass it explicitly on every call, and verify the page
list against the schema inventory before acting on anything you read (standing rule 7, §5).

**There are now three Figma files, and `figma.root.name` returns `"Document"` for all of them.**

| Key | What it is |
|---|---|
| `YX2n4YLrEpBXNbcc73T6dw` | **The rebuild.** What ships. Everything in this document refers to it |
| `zKT34LQogNjz3Z07fY4VQB` | **Proposals**, created 2026-08-18. Work that is not yet built. Never a destination for a copy out of the rebuild: an accepted proposal is rebuilt from the kit |
| `ZPf0sJy83aPyrHjCVHomya` | Legacy team library, "Tebra Working UI Kit". **Not this project.** A session read it once and analysed the wrong file |

The proposals file holds no local variables and no local components by design. Forking the token set
into a second file is the one change that would make the two irreconcilable. It consumes the rebuild
as a library instead.

**The rebuild was moved into a project and published on 2026-08-18.** Verified from both sides: every
sampled component set reports `CURRENT`, and from the proposals file the Button set imports by key
with all 54 variants, instances at 86 x 38 with `remote: true` and its fill binding intact, and
`color/background/paper`, `color/primary/main` and `space/16` all import as remote variables.
Importing does not create local copies, so the no-local-tokens rule still holds.

**Enabled on the proposals file 2026-08-19.** `Design System Rebuild` is subscribed, and all three
collections are listable from that file — `Tebra/Color` 71, `Tebra/Dimension` 32,
`Tebra/Typography` 17.

Worth keeping, because the failure mode is silent and will recur on the next new file: before it was
enabled, `figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()` returned `[]` while
import-by-key kept working. Import by key bypasses the subscription; the Assets panel and the
variable pickers do not. **A file in that state looks empty rather than throwing**, so scripts build
happily while a designer opening the same file sees nothing. Enabling a library cannot be done from
the Plugin API — it is a manual step in Assets panel, Libraries. Do it before handing any new file to
a person.

Read-only reference checkout: `C:\Code\web-app-v2` — **never write, edit, or run its tooling.**

---

## 1. The one rule everything else serves

**Values come from source, never from a rendered component.** A previous attempt measured things
in a browser and produced fractional widths. Every number in this file is transcribed from
`packages/design-system/src` or from the installed `@mui/material` source. If you can't point at a
file and a line, don't build it.

The corollary that bites: *the theme is the component*. There are almost no Tebra wrapper
components. `Button`, `Chip`, `Autocomplete` etc. are imported straight from `@mui/material`, and
the entire Tebra design is the `styleOverrides` on top. So "read the component" always means
**read the override AND the MUI substrate it rides**, then resolve which wins.

---

## 2. Reading order when starting a component

Do these in order. Each step can invalidate assumptions from the previous one.

1. **`src/overrides/<Name>Overrides.ts(x)`** — does it exist at all? Many don't (Tooltip, Paper,
   Drawer, Divider, Link). Absence is itself the finding.
2. **Check the key is valid.** `MuiRadioButton` is registered and has *never executed*. Validate
   against the installed package's component list before trusting an override.
2b. **Then check the *selectors*.** A valid key is not enough. `ToggleButtonOverrides` uses
   `"&$disabled"` — JSS v4 ref syntax that emotion never compiles — so its plain-disabled rule is
   dead while `"&.Mui-selected.Mui-disabled"` two lines below it works. The coverage sweep's
   key-validity pass could not have caught this. Read every selector, not just every key.
3. **Classify the override**: `styleOverrides`, `defaultProps`, or both. `defaultProps`-only means
   the visual surface is pure substrate.
4. **`src/stories/<Name>/`** — the story's `argTypes` define the variant axes. Its `args` define
   defaults. Config files count: `Checkbox.config.ts` is an explicit variation matrix.
5. **MUI source from the yarn cache** (see §3) — resolve everything the override doesn't set.
6. **Resolve the cascade.** MUI's base `styled()` runs first; theme `styleOverrides` are appended
   after and usually win — *unless* the base rule has higher CSS specificity. The
   `overridesResolver` array order decides which override wins against another. Read it when two
   overrides touch the same property.

**Structure comes from stories, values come from overrides + substrate.** There are four
documented exceptions where something was built without story justification (Text field Size,
Chip Size, Form control label, Menu) — all recorded in the schema. Don't add a fifth silently.

---

## 3. Reading MUI source (there is no `node_modules`)

The checkout has no installed dependencies. Read from the yarn cache instead:

```bash
cd "C:/Code/web-app-v2/.yarn/cache"
Z="@mui-material-npm-5.15.12-07f50ebff6-adee362d83.zip"
unzip -p "$Z" "node_modules/@mui/material/Button/Button.js" | sed -n '60,200p'
```

`5.15.12` is what `design-system` resolves to (`^5.15.11` in `yarn.lock`). Other versions are in
the cache for other packages — use this one. MUI X lives in separate zips
(`@mui-x-data-grid-*`, `@mui-x-tree-view-*`).

Useful targets: `styles/shadows.js` (elevations), `styles/createTypography.js` (the `pxToRem`
coefficient), `styles/createPalette.js` (`getContrastText`, default opacities),
`internal/svg-icons/*` (MUI's own glyphs — several ship instead of Tebra's).

---

## 4. Greps that mislead

**Multi-line JSX.** `grep "<Menu[ >]"` returned zero and I reported Menu as unused. It appears
**twice** — both as `<Menu\n`. Always use `grep "<ComponentName"` with no trailing character
class. This produced a public correction; don't repeat it.

**Story titles collide with group headings.** Tabs has a story, titled
`Components/Navigation` — the same string as the Navigation group. A missing title in a
title-sweep doesn't mean a missing story. Cross-check against the folder listing.

**`argTypes` entries aren't always option lists.** Divider's `argTypes` exist purely to *hide*
`component`/`orientation`/`flexItem` from the controls table (`table: { disable: true }`). Read
the body, not just the key names.

**Reference-counting.** For "is this icon used", grep `overrides/` and `stories/` specifically —
`components/icons/index.ts` re-exports everything and will match every name.

---

## 5. Verifying a batch end-to-end

The eight standing rules are in `schema.standingBatchRules`. In practice:

1. **Instance paint verification.** Instantiate every new variant, read the *rendered* paint
   (colour + effective alpha + bound variable), compare against the master. **Master reads are not
   evidence.** Paint-level opacity renders correctly on a master and at 100% on an instance — that
   defect survived four batches because every audit read masters.
2. **Unbound-paint audit walks every top-level node on every page** — reference frames, notes
   frames, loose glyphs. Auditing only component sets hid 3 unbound paints for several batches.
3. **Reference counts per variant** after any clone or `combineAsVariants`.
4. **`figma.skipInvisibleInstanceChildren = false`** before any walk, or boolean-hidden slots are
   skipped silently.
5. **Any alpha lives in the variable's stored rgba**, never as paint-level opacity. If you truly
   can't avoid paint opacity, apply it last *and* verify on an instance.
6. **Enumerate from the file, never from a previous report.** The alpha remediation's "known
   affected" list was missing 18 of 48 paints.
7. **Verify the file before you trust anything you read from it.** Pass `fileKey`
   `YX2n4YLrEpBXNbcc73T6dw` explicitly on *every* Figma call — never rely on an ambient or
   last-used file. The first Figma action of every session lists the pages and compares them to
   `figmaBuild.pages._order`; if they don't match, stop and report before any read informs a
   decision or any write occurs.
   **Amended 2026-08-18: the comparison is against the library pages only.** `_order` holds the nine
   library pages and has never held the board pages, so a literal whole-list match has failed every
   session since `Table exemplars` was added, which trains the reader to ignore the check. The test
   is now: the nine names in `_order` must all be present, and every other page must appear in
   `boardPages` in `cover-page-generator.js`. Anything outside both lists is unrecognised, stop and
   report. The Cover generator applies the same two lists and renders a red "Needs a decision"
   section when a page falls outside them, so the file itself now carries the check.
   On 2026-08-03 a session read the legacy team library
   (`ZPf0sJy83aPyrHjCVHomya`, "Tebra Working UI Kit") and produced a complete reorganisation
   analysis of the wrong file. **`figma.root.name` returns `"Document"` for all three files** — the
   file name is not a usable identity check. The page list is.
8. **Round fractional dimensions, record the truth.** Never carry a fraction into Figma. Two cases,
   one treatment. (a) `pxToRem` inflation, where an intended integer exists: bind the integer, record
   `computedPx`. (b) **Authored-fractional sources**, where no intended integer exists — a fractional
   spacing multiplier, a viewBox ratio, a non-square viewBox in a square box: **round to the nearest
   integer**, record the true value as `computedPx` in both the component description and the schema,
   and label the rounding a design decision with its source and date. Added 2026-08-03 when the nav
   produced the first case-(b) values; Daniel ruled round-with-record as design authority.
   **Intrinsic geometry is out of scope** — `VECTOR` and `GROUP` bounds are path unions, are not
   authored, and are not rounded. Tier 6's illustrations already set that precedent.

Also worth doing every batch: screenshot the variant grid and *look* at it. Several real defects
(the black-rendering bound paints, the clipped notch label, the solid ripple halo) were caught by
eye and confirmed numerically afterwards — never the reverse.

---

## 6. Figma Plugin API traps (the expensive ones)

All in `schema.figmaBuild.pluginApiNotes`; these are the ones that cost the most time:

- **`setBoundVariableForPaint` returns a NEW paint** and leaves the raw colour as passed. Figma
  renders the raw colour. Write the resolved value into the paint *and* bind it.
- **Paint-level opacity is discarded by `appendChild`, `resize` and `combineAsVariants`**, and
  never reaches instances at all. Put alpha in the variable.
- **Cloning a variant already inside a `COMPONENT_SET` drops every
  `componentPropertyReferences`** — silently. Nothing throws; overrides just stop working. Mirror
  them back by walking source and clone in lockstep.
- **`INSTANCE_SWAP` `defaultValue` needs a node id**, not a publish key. `preferredValues` needs
  keys. Setting a swap to its own default resets that layer's overrides *and* renames it.
- **An `INSTANCE_SWAP` property forces one default across every variant** — a variant cannot ship a
  different default control.
- **`editComponentProperty` cannot change a VARIANT default.** Order variant values with the code
  default first at creation time.
- **Naming a TEXT node `"Text"` is a no-op** (it's the default), so `characters` overwrites it. Set
  `name` *after* `characters`, and never to `"Text"`.
- **A TEXT node created empty collapses to width 0** and `FILL` won't recover it: set
  `textAutoResize='HEIGHT'` → `resize()` → `FILL`.
- **`constraints` can't be set on an instance** — only on the master.
- **Absolutely-positioned overhangs get clipped** by ancestor auto-layout frames (`clipsContent`
  defaults true). Floating notch labels and outside focus rings vanish in compositions.
- **`resize()` after setting `counterAxisSizingMode` locks the axis to FIXED.**
- **The variables API is `figma.variables.*`**, not on the `figma` global. `figma.getLocalVariablesAsync`
  throws "no such property".
- **Auto-layout frames take `minWidth`/`maxWidth`/`minHeight`** — use them for CSS min/max sizing
  instead of faking a fixed size (Tab: minWidth 90, maxWidth 360, minHeight 48).
- **An ELLIPSE's `arcData` expresses a stroke ring exactly**, and `innerRadius` is a 0–1 *ratio*, so a
  fractional ring thickness costs no fractional dimension. Angle 0 is 3 o'clock clockwise — the same
  origin an SVG `<circle>` path uses.
- **`translate(50%, -50%)` has no Figma equivalent.** A plain absolute child grows rightward. Use a
  centring anchor frame (twice the offset wide, auto-layout centred on the anchor point) so the
  child grows symmetrically — that's how Badge stays pinned to its corner.

Scripts are atomic — a failed `use_figma` changes nothing, so fix and retry freely.

---

## 7. The icon recipe (three rounds to converge — don't regress it)

1. Vectors sit at their **viewBox position** inside the 24×24 frame. Do not reset to 0,0.
2. Vector `constraints` = `SCALE`/`SCALE`, set **on the master**. `CENTER` centres but doesn't
   scale and renders oversized at 16px.
3. **Figma has no `currentColor`.** Clone the source text paint onto every icon vector per
   variant, carrying resolved colour *and* `boundVariables` together. Skip white knockout shapes.

Vector layers are named `Vector` — instance-swap overrides only survive across matching layer
names. Icons are `Icon / Name`; MUI-internal glyphs carry a `(MUI)` suffix.

**Several MUI glyphs ship instead of Tebra's** — check before assuming: Autocomplete's clear icon,
Chip's delete (Cancel), Radio's ring+dot, Pagination's chevrons.

---

## 8. Schema section map — what to update when

| Section | Update when |
|---|---|
| `components.<Name>` | Building a component: axes, props, resolved values, geometry derivation |
| `flags[]` | **Any** disagreement, defect, or judgement call. 77 entries; this is the real deliverable |
| `namingFreeze.components` | Every new component set — name, variants, axes, props |
| `figmaBuild.pluginApiNotes` | Any new API trap |
| `figmaBuild.pages` | New page, or page order change |
| `standingBatchRules` | Only if a new failure class needs a permanent guard |
| `overlayRecipe` | New floating surface — elevation, positioning, clipping |
| `iconRecipe` / `namingConventions` | Rarely; they're stable |
| `coverageSweep` | When the queue changes or a gap is reclassified |
| `openDecisionsFromCanonicalPage` | The five open product decisions — don't resolve unilaterally |

Validate after every edit: `node -e "require('./design-system-schema.json')"`. Editing a
64KB+ JSON by hand is easy to break.

---

## 9. Figma file conventions

**Consolidated 2026-08-03 from 37 pages to 9.** The file used to carry one page per component;
it is now nine family pages:

`Cover · Tokens · Actions · Inputs · Data display · Feedback · Surfaces & navigation ·
Icons & illustrations · Reference`

Full order and the contents of each page are in `figmaBuild.pages._order` / `figmaBuild.pages.*`.
The consolidation itself — method, before/after verification figures, and the 35 removed pages —
is in `figmaBuild.pages._consolidation`. Nothing was recreated: every node was **moved** with
`page.appendChild`, so node IDs, instance links, `componentPropertyReferences` and `INSTANCE_SWAP`
`preferredValues` all survive. If you add a component, put it on its family page and update
`figmaBuild.pages.<Family>`; don't add a page for it.

**Families are assigned by design semantics, not by Storybook's taxonomy** — and the two disagree
for five components. Storybook files Icon button, Toggle button and Read more under *Data Display*,
Link under *Navigation*, and Dialog under *Feedback*; here they sit on Actions, Inputs, Actions,
Actions and Surfaces & navigation. Storybook's *Data Display* is a catch-all (it also holds Divider,
Typography and the Icon catalogue), which is why it lost. Recorded as
`flags.pageFamiliesDivergeFromStorybook` — don't "fix" it silently in either direction.

Layout within a family page: one row at y=0, ordered as listed in the schema entry.
`Icons & illustrations` uses two rows — illustrations at y=0, icons at y=700.

- **Cover** — source-of-truth statement, inventory, and the restored *Known drift & decisions*
  record (five open product decisions, transcribed verbatim before the page holding them was
  deleted).
- **Tokens** — **generated by `tokens-page-generator.js`**. Clears and rebuilds from the live
  variable collections. Never hand-edit; regenerate when variables change. Its colour section
  groups by name prefix, and the `hardcoded (no palette)` and `computed (no palette)` groups render
  in red with a literal where every other token shows `var(--…)`. That styling is the point — red
  means "this value has no home in the palette / no CSS variable to point at", and the generator
  extends it to a dimension token with no code syntax (`no code syntax set`, also red). Four things
  in the generator are authored, not read: the group order, the two no-palette captions, the alias
  map, and the typography blurb. Anything it cannot place is reported in the return value, never
  dropped.
- **Icons & illustrations** — all 31 icon masters (17 through tier 4, plus 14 added with tier 5)
  and the 7 illustration masters, merged onto one page by the consolidation. Illustrations are
  `Illustration / Name`, built by `createNodeFromSvg` at the SVG's viewBox, every fill and stroke
  bound, SCALE constraints, root frame fill cleared. Recipe and the full colour map in
  `namingFreeze.illustrations`.
- **Reference** — every node deliberately excluded from publish, gathered here on 2026-08-03: the
  five `DO NOT USE` / `REFERENCE` frames plus all twelve `Read me — … provenance`, `Validation — …`
  and `Assembled examples` frames. Keep it that way — a non-component frame parked next to its
  component on a family page is the thing this page exists to prevent.

**Deliberately NOT components** (must be excluded from publish):
- The whole **Tokens** page
- The whole **Reference** page

That is now the entire list. It used to be eight per-frame entries; the Reference page replaced
them. Anything non-publishable goes there rather than being enumerated here again.

Naming: `Component / Part` for sub-components (`Autocomplete / Field`, `Menu / Item`). Variant
values are Title Case. Component descriptions carry full provenance — they're the primary
documentation surface and reviewers read them.

---

## 10. Queue (verbatim)

**Tier 5:** ✅ built 2026-08-02 — Tabs / Tab + Tabs, Toggle button, Stepper / Step + Stepper +
Mobile stepper, Avatar, Badge, Circular progress. 14 icon masters added with them.
Re-verified independently 2026-08-02 from the file, not from the build report
(`validation.tier5.independentVerification`): 0 unbound paints, 35 instances compared against
their masters with 0 mismatches, every geometry figure re-derived from source. One new finding,
outside tier 5 — `flags.coverInventoryStale`.
**Tier 6:** ✅ built 2026-08-02 — Read more (4 variants), Feedback message (12 variants), and all 7
illustrations as `Illustration / Name` masters. Four variables added: `illustrationTeal`,
`illustrationCream`, `uaDefaultLinkBlue`, `space/40`. Verified: 0 unbound paints, 16 instances
compared against masters with 0 mismatches, 0 fractional authored dimensions.
**Tokens page:** ✅ regenerated 2026-08-03. It had been reporting 62 colour / 31 dimension against
67 / 32 live. Rebuilt in full from the collections — 116 variables, 691 nodes, 569 paints, 0
unbound, 0 fractional. Five swatches recovered: `illustrationTeal`, `illustrationCream`,
`uaDefaultLinkBlue`, `alphaBlack04`, `alphaBlack12`. The `hardcoded (no palette)` caption still
claimed ChipOverrides.ts was the only source; corrected. **The generator now exists on disk** —
`tokens-page-generator.js`, five steps, one `use_figma` call each. Not carrying it forward is the
only reason the page ever went stale; don't repeat that.

**Page consolidation:** ✅ done 2026-08-03. 37 pages → 9 family pages, by moves not recreates.
99 top-level nodes in, 99 out; 4940 paints / 0 unbound, 1778 property references, 484 masters,
31 sets, 926 instances, 50 `preferredValues` — every figure identical before and after, and all 31
variant counts unchanged. The 35 emptied pages were each verified at 0 children before removal.
See `figmaBuild.pages._consolidation`.

**Cover inventory refresh:** ✅ done 2026-08-03, immediately after the consolidation (which had made
the Cover staler still). Regenerated from the live file, not from any previous report. Inventory now
reads nine pages; 31 sets carrying 436 variants, 10 single-component composites, 38 icon and
illustration masters (484 total); 10 text styles; 7 effect styles; 116 variables; 105 flags. The
*Not yet rebuilt* section was rebuilt from `coverageSweep.classification.DEFER` and `.PATTERN`
instead of prose, and the false "ButtonGroup has no canonical component here" claim was dropped —
Button group / Segment ships 54 variants. Cover grew 1152 → 1512px and the Known drift frame moved
to y=1552, clearing a 32px overlap that predated the consolidation. `flags.coverInventoryStale` is
marked RESOLVED. **All five open decisions remain OPEN and verbatim** — only the build-status
annotations after them changed.

Two things were corrected in passing, both worth knowing: six schema strings pointed at pages the
consolidation had deleted, and `flags.chipRawHex`'s note contradicted the `DEAD` entry about whether
the hardcoded Chip hexes were promoted to variables. **Both `#C3E7C0` and `#FD919F` are Figma
variables** under `color/hardcoded (no palette)/`, settled by enumerating the live `Tebra/Color`
collection rather than believing either note. Neither has a home in `paletteValues.ts`, which is the
part that was always true and is what open decision 5 is actually about.

**Card header-band discovery:** ✅ done 2026-08-03. Spec in `components.CardHeaderBand`, five new
flags (110 total). Headline: **the band is not themed at all** — there is no `MuiCardHeader`,
`MuiCardContent` or `MuiCardMedia` key in any of the 38 override files, so all 9 facesheet card
sites decide it in per-site `sx`, and they disagree three ways. The buildable geometry is a **48px
fixed-height band, h2 (24/36, 700) in primary #004852, 16px horizontal padding, title vertically
centred** — *not* 16px padding + hug, which renders 68px. Three bugs found, all
`webAppV2BugListCandidate`: the header divider never renders (invalid `sx` shorthand),
`paddingBottom: 16` resolves to 128px not 16px, and ImmunizationsCard uses the drawer wrapper in
fullscreen. Do **not** draw the divider in Figma yet — 6 of 8 sites ship without one and which is
canonical is a product question.

**Nav-bar discovery:** ✅ done 2026-08-03. Spec in `components.PrimaryNavBar`, six new flags (116
total). **The headline is a scope finding, and it blocks building anything:** the primary nav never
renders under the canonical theme. `navigation-ui/src/root.component.tsx:37` mounts `CobrandedApp`,
which wraps the whole nav in `ThemeProvider theme={createPartnerTheme(partnerId)}` — defaulting to
`createPartnerTheme("tebra")`. So the nav is governed entirely by `src/cobranding`, which
`decisions.1_sourceOfTruth` already scopes **out**. Whether the nav belongs in the library at all is
a decision for Daniel; if the answer is no, say so on the Cover so it stops resurfacing.

**Read `components.PrimaryNavBar._nearMiss` before re-deriving any of this.** Reading
`Navigation.tsx` + `NavIconButton.tsx` alone yields a convincing accessibility defect — white glyph
forced on `action.hover`, which is `#CBDDE0` in the canonical theme, about 1.4:1. It is not real:
`createPartnerTheme` remaps `action.hover` to `#195b63`, giving ~7.7:1. The bug only exists if you
stop reading before the `ThemeProvider`. **"The theme is the component" applies one level further
out than usual here — the nav has its own theme.**

Tebra values if it is ever built: 64px bar (forced at every breakpoint), `#004852` ground, icon-only
`large` IconButtons at `borderRadius: 0` with white glyphs, hover ground `#195b63`, dropdown a
square elevation-0 `#195b63` paper with `#417E86` item hover. Three of those colours — `#195b63`,
`#002328`, `#003840` — have no home in `paletteValues.ts`. Two bugs for the list: the user avatar
opens a completely empty `Menu` over the real hover menu, and four `console.log`s ship in the nav
render path.

**Primary nav bar (Tebra-default partner theme):** ✅ built 2026-08-03 — the first differently-sourced
component. Section `Primary nav (partner theme)` on Surfaces & navigation (chosen over its own page:
12→13 top-level nodes is not crowded, and a section makes the different sourcing visible while
keeping nav components on the nav page). Four components — `Nav / Bar`, `Nav / Icon button` (3
variants), `Nav / Menu item` (2), `Nav / Dropdown` — plus a composed REFERENCE frame on the Reference
page. Every description carries the *renders under createPartnerTheme, not the design-system theme*
line. Verified: 0 paint mismatches across all 7 master/instance comparisons, 4987 paints / **0
unbound** file-wide, reference counts intact through `combineAsVariants`, 0 authored fractional
dimensions. Tokens page regenerated — 119 variables, 709 nodes, 587 paints, 0 unbound; the three nav
hexes render in the red `hardcoded (no palette)` group. **Publish still gated.**

**Two corrections to the nav discovery, both from re-reading source under rule 6 —** the extraction
was wrong and trusting it would have shipped a wrong bar:
- **The bar is 65px, not 64.** `createPartnerTheme.ts` sets `MuiIconButton.sizeLarge` to 65×65, and
  `minHeight: 64` is a *floor* — the 65px buttons expand the Toolbar. The legacy library's "65px bar"
  *and* "65×65 tap targets" were both right and describe the same 65. My earlier "treat 65 as a
  legacy value, not source" is retracted. `flags.navBarHeightIsSixtyFiveNotSixtyFour`.
- **The partner theme REPLACES two canonical roots, it does not merge with them.** `createTheme`
  deep-merges, but deepmerge can't merge functions, so the later function wins outright. The nav's
  IconButton loses canonical `grey[600]`/hover/disabled; the nav's MenuItem loses the canonical
  focus-visible treatment entirely. Sibling keys (`sizeSmall`, `colorPrimary`) are plain objects and
  merge normally, which is what makes it easy to miss — and it contradicts the file's own docstring.
  `flags.navReplacesCanonicalComponentOverrides`, on the bug list.

The generator gained a fix too: group captions now wrap. They never did, and the page root
`clipsContent`, so a long caption was silently truncated rather than visibly broken.

**Nav glyphs + bar rebuild:** ✅ done 2026-08-03. Eight glyphs transcribed (Platform, Clinical,
Billing, Engage, Payments, Reports, MailOutline (MUI), HelpOutline (MUI)) → 46 masters on
Icons & illustrations. Plus `Nav / Logo` (Tebra wordmark) and `Nav / Search`. Bar rebuilt from
source; full slot table in `components.PrimaryNavBar.slotTable`. Verified: 0 paint mismatches across
18 targets, 5080 paints / **0 unbound**, reference counts intact. Tokens regenerated — 120 variables,
715 nodes, 0 unbound, 9 entries in the red hardcoded group.

**Three things that matter more than the build:**
- **The bar is 76.8px, not 65px.** The inline patient search column is taller than the 65px icon
  buttons and sets the Toolbar height whenever it's visible (sm and up); below sm it falls back to
  65px. Derivation in `flags.navBarHeightDrivenBySearchNotButtons`. This **supersedes** last batch's
  64→65 correction — that fix was right as far as it went and still wrong for the desktop bar. Two
  passes read the Toolbar and the button and stopped; the height is set by a component in a
  different package folder neither pass opened.
- **The fractional-dimension question is settled.** The nav produced the build's first
  authored-fractional values — 76.8, 44.8, 16.4, 23.88, 18.24 — from a `padding: 0.3` spacing
  multiplier, the wordmark's viewBox ratio, and Payments' 25×19 viewBox in a 24×24 box. Unlike
  `pxToRem` inflation there was no intended integer behind them. **Daniel ruled round-with-record**
  (2026-08-03, as design authority): bar 77 / `computedPx` 76.8, search column 77 / 76.8, field
  45 / 44.8, inset 16 / 16.4, wordmark 24 / 23.88, Payments glyph 18 / 18.24 at y 3 / 2.88. This is
  a **designed decision, not a transcription** — the Figma values deliberately differ from the
  computed ones, and every departure is recorded in the component description and
  `components.PrimaryNavBar.roundingDecision`. `allDimensionsInteger` is **restored file-wide**
  (verified: 0 authored fractional dimensions across all 9 pages). The sub-sm 65px is exact and
  unrounded. Standing rule 8 carries the amendment. **The nav investigation is frozen — no further
  height or geometry archaeology.**
- **The 9 nav glyphs are bound white**, not to a canonical text colour — correct for the nav, wrong
  anywhere else. Recorded in the freeze addendum; don't reuse them on canonical surfaces.

**Review pass (Daniel, side-by-side vs product), 2026-08-03:** search field rebuilt as the dark
compact field with its magnifier; `Icon / SearchOutlined (MUI)` transcribed (47 masters now). Two
review notes did **not** survive source, and both are flagged rather than reconciled:
- **The magnifier is trailing, not leading.** `PatientSearch.tsx` puts `SearchOutlined` in an
  `InputAdornment position="end"`; there is no `startAdornment` in the component at all.
- **There is no history/clock slot.** Confirmed by positive evidence, not a failed grep — six config
  items, no seventh; one `AppBar` in the whole monorepo; no injection mechanism; and
  `useRecentChartsQuery` is consumed *only* by PatientSearch, where it renders a **"Recent patients"**
  panel inside the search dropdown. That panel is the history-shaped element, and it isn't built.

Also recorded: the avatar's typical fill is an **illustrated persona SVG** (`provider-tebra-bg.svg` /
`staff-tebra-bg.svg` by role) — the built initials are the *fallback*. And the nav has **no distinct
Selected state**: hover, focus and menu-open are one flag and one paint, so the REFERENCE frame names
it with a callout rather than implying a variant that doesn't exist.

**Size drag:** ✅ done 2026-08-03 — but not by the hand drag. That attempt reordered `children[]`
without moving anything on canvas, so the default never changed and an instance still came out Small.
Fixed programmatically by swapping the Small and Medium column blocks (Button delta 630, Button group
delta 450, 36 nodes each); both now resolve to Medium by instance read. Widening the check to all ten
Size-bearing sets found **Button group / Segment had the same inversion, unflagged** — the other eight
were already correct. `figmaBuild.validation.sizeDrag`.

**Nav geometry ruling (Daniel, 2026-08-03) — the nav surface is CLOSED.** The bar is **65px**. The
76.8 derivation was arithmetically sound and described something that never renders: it summed the
search wrapper's `p: 2` onto the 44.8px field as if the toolbar stacked child box heights, but a flex
toolbar with `align-items: center` **centres** its children. `flags.navBarHeightDrivenBySearchNotButtons`
is **RETRACTED**. Rendered product is the source of truth for this surface; the chain 64→65→76.8→65 is
recorded as why arithmetic isn't trusted here. Also ruled: a **Selected** state ships on
`Nav / Icon button` even though source has no distinct one — designers must mock active nav, and the
code conflating hover/active is a finding to record, not a reason to omit. **No further nav passes
without a new product screenshot showing a delta.** `components.PrimaryNavBar.geometryRuling`.

**Capture-and-execute batch:** ✅ done 2026-08-03. Focus enumeration captured
(`coverageSweep.focusStateEnumeration`) — **9 gaps**, and the key finding is that focus is styled
**globally** by `CssBaselineOverrides` (`*:focus-visible { outline: 3px solid primary.main }`), so a
missing Focus visible variant is a Figma gap, not a code one. Chip Common-configurations strip built
as labelled **instances** on Data display. "Deliberately not here" frame built on Reference (13
entries) and linked from the Cover. Scrollbars and Text Reveal classified
**OUT_OF_SCOPE_LEGACY_ONLY** — Text Reveal is absent from web-app-v2 entirely; Scrollbars' only trace
is the MUI X internal class `.MuiDataGrid-scrollbarFiller`.

**Designer-feedback closure batch:** ✅ done 2026-08-04. Checked-before-building, and **three of the five
items had already landed** — the focus enumeration (`coverageSweep.focusStateEnumeration`, 9 gaps), the
*Deliberately not here* frame (13 entries, linked from the Cover) and the Chip Common-configurations
strip were all present and complete. Built this batch: usage annotations on Chip and Switch
(`figmaBuild.usageAnnotations`), and the Tooltip pending-clarification marker
(`coverageSweep.pendingClarification`). Button Size default = Medium **confirmed and closed** — both
Button and Button group / Segment read Medium from `defaultVariant`.

Three things worth knowing:
- **"Unused chip colours" does not survive source.** All seven are reachable in shipped product. A
  context-window grep gets this wrong because a Chip's 8-line window catches sibling elements'
  `color` props; attributing each prop to its own balanced JSX tag gives success 13 / info 11 /
  warning 9 / primary 9 literal, error 1 authored plus 6 data-driven, secondary 2 in the whole
  monorepo, default 0 literal but 19 by omission. The defensible version is narrower — *secondary is
  rare, error is data-driven not authored*. `flags.chipColoursAllReachableButSkewed`.
- **Switch points the other way from the note.** Product uses Medium exclusively: all 13 `<Switch>`
  tags omit `size`, so **Small** is the story-only variant, not Medium. `flags.switchSmallIsStoryOnly`.
- **The Chip description still said "NO SIZE AXIS"** long after the axis was added — corrected in
  place with the prior wording retained. Nothing sweeps descriptions for staleness and this was found
  by accident. `flags.chipDescriptionSaidNoSizeAxis`.

**Freeze audit for the publish gate:** ✅ 2026-08-04, enumerated from the file per rule 6, not quoted
from the last report. `figmaBuild.validation.freezeAudit`. 9 pages, 6862 nodes, 34 sets carrying 444
variants, 60 single masters (504 component nodes), 988 instances, 5139 solid paints, **0 unbound**,
**0 authored fractional dimensions**, 120 variables, 10 text styles, 7 effect styles, 134 flags.

**One blocker, and it is the Cover again.** `flags.coverInventoryStale` is **REOPENED** — it reads 31
sets / 436 variants / 484 masters / 116 variables / 105 flags against 34 / 444 / 504 / 120 / 134 live,
and its *Surfaces & navigation* line omits the **entire Primary nav (partner theme) section**. Three
batches landed after the 2026-08-03 refresh and none regenerated it. Same failure mode the Tokens page
had before it got a generator: **write `cover-page-generator.js`** rather than hand-fixing it a third
time. Not rewritten here — out of this batch's scope, and Daniel sequences the work.

Then: **Cover regeneration (blocker)** → **publish** → **bug list** → **Code Connect** → **drift check**

Deferred with blockers named in `coverageSweep`: DataGrid (+DataGridFilter), TreeView/TreeItem,
Typography, Icon catalogue, Portal, Layout, Popover, marketingIcons, ListItemDelete.

Patterns — list, don't build: Drop Chip, Prepopulate Form Fields, Task Bar, RadioGroup.

---

## 11. Things I'd want told to me on day one

- **Daniel sequences the work.** Build the batch asked for, stop, report. Don't roll ahead.
- **Report disagreements, don't resolve them.** The recurring-table findings — four list-row
  surfaces, five interactive states, three disabled greys — are the most valued output. When two
  components disagree, that's the deliverable, not a bug to normalise.
- **Two review notes turned out to be wrong** (the Chip success-hover token, "Snackbar is
  grey[900]", "Tooltip has an override"). Verify against source before acting on a correction —
  including corrections from me in this file.
- **I made errors worth knowing about:** the multi-line-JSX grep that produced a false "Menu is
  unused"; an incomplete known-affected list during remediation; auditing masters instead of
  instances for four batches; auditing component sets but not reference frames. All four were
  caught by *widening scope and re-enumerating*. When something feels verified, check what your
  check didn't look at.
- **The `pxToRem` inflation is everywhere.** `typography.fontSize: 16` sets MUI's coef to 16/14, so
  every `pxToRem` renders 14.29% larger than it encodes. Bind the *intended* integer, record
  `computedPx` alongside. Never put a fractional value in Figma. Tier 5 found the smoking gun:
  `SvgIconOverrides`'s `fontSizeSmall/Medium/Large` are *exact rem restatements of MUI's already-
  inflated values* (`1.4285714285714284rem` = `pxToRem(20)`), i.e. someone read them out of a
  browser and pasted them back. All three are no-ops; only the added xxsmall/xsmall/smaller are real.
- **An override file existing is not evidence a component is themed.** `AvatarOverrides` is an empty
  shell, `TabsOverrides` restates MUI's own default, `MobileStepperOverrides.dotActive` restates
  `primary.main`. Open the file before believing the coverage sweep's `expect` column.
- **Akkurat LL has no Medium (500).** Anything asking for `fontWeightMedium` ships Regular.
- **`var(--tebra-*)` doesn't exist.** The code syntax on ~112 variables matches nothing in
  web-app-v2 — grep `--tebra` across the checkout returns zero files, and the theme is built with
  `createTheme`, which emits no CSS variables at all. It's a Figma-side convention invented during
  this build. Reported as `flags.tebraCssVarsDoNotExist`, not changed; it's a real code↔design
  disagreement, which is the deliverable. Don't quietly strip 112 entries.
- **`Canonical components` was deleted deliberately** — don't hunt for it. Its decisions live on
  the Cover and in the schema.
- **Button's Size default is fixed** (2026-08-03) — it now resolves to Medium, matching code. So did
  **Button group / Segment**, which had the same inversion and had never been flagged. The lesson is
  the trap, not the fix: **a variant default is held by CANVAS POSITION — the top-left variant wins —
  not by child order.** A layers-panel drag reorders `children[]`, leaves x/y alone, changes nothing
  visible, and does not move the default; `editComponentProperty` can't change it either. Position is
  the only lever. Don't "tidy" either grid by moving the Small block back to the left — that silently
  reverts the default.
- **A set-level TEXT property forces one default across every variant** — the same trap as
  `INSTANCE_SWAP`, and it cost a rebuild in tier 6. Adding `Title`/`Body` properties to a set whose
  variants carry *different* copy silently overwrites all of it. If the variants differ by their
  text, don't expose that text as a property; instance text is editable without one. It was caught
  only because post-combine heights differed from pre-combine ones — so compare them.
- **When Figma can't express something, say so and build the honest thing.** Established
  precedents: Button's icon padding pull, the Autocomplete indicators, TablePagination's
  standard-variant select, Link's underline tint. Never force nominal reuse that changes rendered
  geometry — measure, and if it moves, stop and report.
