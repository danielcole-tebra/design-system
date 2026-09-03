# Page templates — header and side rail

Companion to `page-template-generator.js`. Same shape as the table-set work: enumerate from the
artefact, build from instances, log every value that had no token.

**Status: BUILT 2026-08-17** on page `Page template exemplars` (489:2). Two exemplars, verified: 64
nodes, 43 paints, 0 fractional dimensions, 0 unbound paints, 3 instances, both markers intact. See
the Run record in §7.

**What was enumerated from.** This document was first written *blind* — no Figma connection — from
the certified reference kit and `design-system-schema.json`. It has since been checked against the
live file, and **the schema was stale in four places**; those corrections are marked ⚠ where they
appear and collected in §5.4. The enumeration in §1 now comes from the file itself.

---

## 1. Enumeration

### 1.1 Header components

There is **one** header component, and it is a composite that already carries everything.

| Node | What it is |
|---|---|
| `Nav/Bar` | 1440 × 65 composite. Ground `color/primary/main` `#004852`, bound. 16px gutters |
| `Nav/Icon button` | ⚠ **4** variants on one `State` axis — Default · Hover · Disabled · **Selected** (the schema says 3). 65 × 65, radius 0, glyph is an `INSTANCE_SWAP` with 31 preferred values |
| `Nav/Menu item` | 2 variants, `State` = Default · Hover. Set measures 288 × 160, `Label` text property |
| `Nav/Dropdown` | Submenu paper composite, 240 × 233, square corners, elevation 0, ground `#195b63`, white divider, `Title` text property |
| `Nav/Logo` | Tebra wordmark, 100 × 24 |
| `Nav/Search` | 2 variants (Default · Hover), closed field only. Set measures 448 × 194 |

Six nodes, matching `figma-export/Nav/` exactly (six PNGs). They sit in a **section** named
`Primary nav (partner theme)` on the *Surfaces & navigation* page, and everything inside that
section renders under `createPartnerTheme`, not the design-system theme (§1.8, §3.30).

**What `Nav/Bar` carries**, read off the export left to right: product logo · six icon-only nav
slots (Platform, Clinical, Billing, Engage, Tebra Payments, Analytics) · practice name · patient
search · mail with badge · help · account avatar.

Against the brief's checklist:

- **Product logo** — yes. `Nav/Logo`, left edge at the 32 keyline.
- **Search** — yes. `Nav/Search`, 368 × 45, magnifier **trailing** (`InputAdornment position="end"`);
  the review pass expected leading and source won (`flags.navSearchMagnifierIsTrailingNotLeading`).
- **Global actions** — yes, two: mail (canonical `Badge`, colour secondary, max 99) and help. Both
  are 65 × 65 utilities in the right cluster, not nav slots.
- **Account** — yes, but it is the **canonical `Avatar`** set at `Content=Letter`, 40 × 40 centred in
  a 65 × 65 button box. It is not a nav component. The kit shows initials; the product normally
  shows an illustrated persona SVG served from outside `packages/design-system`, so there is no
  asset to ship. §3.30 says hold both.
- **Practice switcher** — **no.** What the bar carries is a practice *name*: a plain
  `<Typography sx={{whiteSpace:"nowrap", px:2}}>` in navText white, rendered only when `isSmUp`. It
  has no menu, no caret, no component of its own. Nothing in the library or the source is a switcher.
- **Anything else** — nothing in the bar. Not in it: the six slots' submenus (`Nav/Dropdown`, a
  separate node), the search's Recent-patients panel (not built), the focused search state (not
  built), and the user-avatar menu (renders empty in the product —
  `flags.navUserMenuRendersEmpty`).

### 1.2 Primary nav components

The six `Nav/*` nodes above **are** the Primary nav section, in full. There is no seventh.

The brief is right that Cover omits the section; the schema's page record does not, and neither does
the kit. Two things worth knowing before trusting a name:

- The schema writes these as `Nav / Bar` with spaces around the slash. Node names were **normalised
  on 2026-08-10** so exports emit clean paths (`Icon / DownCaret` → `Icon/DownCaret`), which is why
  the kit paths are `Nav/Bar.png`. The schema strings are pre-rename and stale. The generator matches
  both forms rather than assuming either.
- `Nav/Icon button` is **not** the canonical `Icon button` set. The schema is explicit: do not reuse
  the canonical one here, it themes radius and grey[600] glyphs from the wrong theme.

### 1.3 Layout and Portal

Neither exists in any form, and both are recorded as deliberate rather than missed:

| | `coverageSweep` verdict |
|---|---|
| **Portal** | `"No visual surface."` |
| **Layout** | `"Box/Grid documentation, no component surface."` |

Stated plainly, because it is the load-bearing fact for this whole task: **there is no page-frame
component in the library.** There is no app shell, no rail, no side nav, no content region, no page
grid. ⚠ The file has **ten** pages, not the schema's nine — a `Table exemplars` page (446:2) was added by the table set and the schema's page record predates it. None of the component pages holds page-level structure.

The nearest node is **`Drawer`**, a composite measuring **320 × 560** off the 2x export — a panel
with a "Navigation Header" row, a close affordance and four `List/Item` instances. It is not a side
rail: §3.23 records its only product usage as `variant="persistent" anchor="right"`, the docked
right-hand path, and its 320 matches neither recipe rail width. Using it as a left rail would assert
an equivalence the source does not support, so the exemplars do not.

Consequence for the build: the page frame, the body row, the rail region and the content region are
**authored frames**, not instances. That is a deviation from "every element an instance" and it is
forced — there is nothing to instance. Everything that *is* a component in these exemplars is one:
`Nav/Bar` and `Divider`.

### 1.4 Layout values the recipes supply, and what they do not

From `C:\Code\design-agent\LAYOUT.md`. "Token" means a variable exists in the file's three
collections; the missing column is §4.

**Supplied, with a token:**

| Value | Number | Token | Recipe source |
|---|---|---|---|
| Page ground | `#E8E5DF` | `color/background/default` | Global |
| Surface ground | `#FFFFFF` | `color/background/paper` | Global |
| Region content inset | 16 | `space/16` | dashboard, measured-from-product |
| Content region inset (facesheet) | 24 | `space/24` | facesheet, Material-guideline L2/L5 |
| Card gutter within a rail | 16 | `space/16` | dashboard, L7 |
| Toolbar horizontal padding | 16 | `space/16` | app bar, `theme.spacing(2)` |
| Divider weight | 1 | `border/hairline` | rail edge, §3.23 |
| Divider colour | `#D6D6D6` | `color/divider` | rail edge |
| Card radius | 4 | `radius/sm` | dashboard |
| Spacing base | 8 | `space/8` | Global, `createSpacing(8)` |

**Supplied, with no token — the whole page-structure layer:** page width 1440 · header height 65 ·
logo keyline 32 · nav slot pitch 65 · search 368 × 45 · left rail 256 · right rail 288 · sub-nav rail
144 · sub-nav item pitch 48 · main column 896 · header band 72 (dashboard) and 152 (facesheet) ·
breakpoint 1100. Enumerated with sources in §4.

**Not supplied at all:**

- **Viewport / body height.** `LAYOUT.md` files it as `Body min-height: viewport-dependent,
  decided-and-flagged — nothing grounds a viewport height`, and the facesheet recipe retires it as a
  *pattern* (column flex) rather than settling a number. A Figma frame needs a height, so one was
  chosen and logged.
- **Gap between rail and content.** The recipes give no gap value because there is none: regions are
  flush and a 1px rule marks the seam (D1 — Material's 24 page margin is not used, product wins).
  The unanswered part is §4's L-04.
- **Vertical gap between header and body.** Same answer: zero, flush. Not stated as a value anywhere,
  only implied by the bar-then-body composition.
- **Any width other than 1440.** Every page-level number in the recipes is derived at 1440 or from a
  ≈694 / ≈1470 capture. There is no 1024 or 1280 column.

---

## 2. The exemplars

Two, not three. §3 says why.

⚠ **Not on the Reference page.** The blind draft put them there. The live file already had a
`Table exemplars` page with a settled convention, and exemplars belong in that shape on a page of
their own. Both are therefore on a new page, **`Page template exemplars` (489:2)**, built to the
table set's layout exactly:

    Page > root FRAME, VERTICAL, itemSpacing 40 (space/40), padding 64
      "N Title", HORIZONTAL, itemSpacing 40
        "N Title example"    — the artefact
        "N Title (caption)"  — 400 wide, VERTICAL

Caption metrics were read off the table set rather than invented: title Akkurat LL Bold 20/32 in
`color/primary/main`; each field a VERTICAL frame at gap 4 holding a Bold 12/16 label in
`color/text/primary` and a Regular 14/20 body in `color/text/secondary`.

This page joins Tokens and Reference on the publish exclusion list. It is not a component page and
nothing on it is a component.

### Exemplar 1 — `REFERENCE — Page template: header (not a component)`

    1440 × 961
    ├─ Nav/Bar          instance, 1440 × 65
    └─ Content region   authored frame, 1440 × 896, ground background/default, inset 16 (space/16)
       └─ placeholder   1408 × 864, dashed hairline, labelled

Header flush to the top and to both page edges. Content begins at y = 65, x = 16.

### Exemplar 2 — `REFERENCE — Page template: header + side rail (not a component)`

    1440 × 961
    ├─ Nav/Bar          instance, 1440 × 65
    └─ Body             authored row, 1440 × 896, gap 0
       ├─ Rail          256 wide
       │  ├─ rail body  255 × 896, ground background/paper, inset 16 (space/16)
       │  │  └─ placeholder 223 × 864
       │  └─ Divider    instance, Orientation=Vertical, 1 × 896
       └─ Content       1184 × 896, ground background/default, inset 16 (space/16)
          └─ placeholder 1152 × 864

Content width goes 1440 → 1184; the rail takes 256 and the gap between them is **zero**, the seam
being the rail's own 1px rule. 1184 is not a recipe number — it is L3 applied to this composition
(the main column takes what the permanent region leaves). The recipe's own 896 assumes a right rail
as well, which these exemplars do not have.

**Both content regions are empty by design.** No table, no cards. Each holds one dashed placeholder
frame with a label naming its own pixel size, so the region reads as a region rather than as an
unfinished screen. The placeholder is authored — there is no placeholder or skeleton component to
instance — and its dashed stroke is documentation decoration, not a page value.

### The two red markers

Both exemplars carry a red **DOES NOT RESOLVE** block in the 400 column, under the caption. This is
the **same red language as the Tokens page**, meaning the same thing: *this value has no home*. There
it was "no palette entry / no code syntax"; here it is "no component to instance / no source for this
number". A red block is closed by the library or the recipes gaining the missing thing — never by
making the frame look finished.

**Marker 1 — the rail is not an instance** (exemplar 2 only). Every other element in these frames is
a component instance; the rail is an authored frame with a `Divider` instance for its right edge.
That is the constraint in the brief breaking against the library, and it is the finding, not a build
defect. It is closed by building a rail component. It is **not** closed by tidying this frame, by
repurposing `Drawer`, or by quietly dropping the "every element an instance" line from the brief.

**Marker 2 — the 896 body height has no source** (both exemplars). Not a token, not a recipe value,
not measured. It is 112 × 8, chosen only so nothing came out fractional, standing in for a number
that does not exist. Because a made-up number normally escapes a template by being duplicated, the
marker is repeated in the **page frame's own name** — `Page — 1440 wide · height 896 UNSOURCED` — so
it travels with any copy, and in both placeholder labels, which say the 864 derives from it.

`STEP 4` asserts both markers are still present: three headings across the two red blocks, and
`UNSOURCED` still in both frame names at height 961. A deleted red block fails the verify step.

### Captions

Four fields, 400 column, designer-facing, in the table set's language.

**Exemplar 1**

> **Shows** — the header in place at the top of a 1440 page, and where content starts underneath it.
> The bar is 65 tall and runs edge to edge; the content region below it is the full 1440 wide with a
> 16 inset, so the first line of content sits 16 in from the page edge and 16 down from the bar.
>
> **Use when** — laying out any full-width screen that has no side rail: a list page, a form page, a
> single-column report.
>
> **Not this when** — the screen has a permanent side region. Use exemplar 2, which changes the
> content width. Also not below 1100, where the bar becomes a different composition — logo, the six
> slots and the practice name all disappear and a menu button replaces them.
>
> **Source** — bar and its contents are the `Nav/Bar` component, certified. Page width 1440, bar
> height 65 and the 16 inset are from the design agent's dashboard recipe. The page height is not
> from anywhere; see the log.

**Exemplar 2**

> **Shows** — the same header with a permanent side rail on the left. The rail is 256 wide including
> its own 1px right rule, there is no gap between rail and content, and the content region drops
> from 1440 to 1184.
>
> **Use when** — the screen has a region that is always present and never scrolls away with the
> content: a date picker, a filter set, a section list.
>
> **Not this when** — the region can be dismissed, or overlays the content. That is a Drawer, and
> the Drawer in this library is the right-anchored persistent one, not this. Also not when the rail
> holds a sub-navigation list — that rail is 144 in the facesheet recipe, a different number derived
> a different way.
>
> **Source** — `Nav/Bar` and `Divider` are components. The 256 is the design agent's R1, derived from
> the widest fixed content the rail holds and ruled closed by Daniel on 2026-08-14 against a product
> capture that measures 264. The content width is not a recipe value; it is what is left at 1440.

---

## 3. The third exemplar, and why it is not here

**Skipped. The rail has no collapsed state, in the library or anywhere upstream.** Four
independent checks, all negative:

1. **No rail component exists** to carry a state axis (§1.3). The two nodes with a `State` axis in
   the nav section are `Nav/Icon button` (Default · Hover · Disabled) and `Nav/Menu item`
   (Default · Hover). Neither is a rail.
2. **`List/Item` has two variants and neither is collapsed** — Default and Hover, read off the
   export. It has no Selected variant either, which matters separately: a rail built from
   `List/Item` instances cannot show the facesheet recipe's ruled selected treatment
   (`alpha(primary.main, 0.08)`) without detaching.
3. **The recipes say the rail does not collapse.** `LAYOUT.md` L3: permanent regions exist outside
   the grid and *cannot* collapse. The dashboard recipe's narrow-width row is explicit — *Left rail
   below 1100: **holds** at its width, full depth*, and N1's ≈694 capture shows it intact.
4. **The only collapse in the system is the app bar's**, N1: six nav slots become one menu button
   below 1100. That is header behaviour, and it already has a home in exemplar 1's caption.

Authoring a collapsed rail would mean inventing both a width and a state, from nothing. It is not
built.

**What would unblock it:** a product capture showing a collapsed rail, plus a ruling that the
resulting width is a system value rather than product drift — the same two steps F7 went through for
the 256.

---

## 4. Layout values with no token

The point of the exercise, and longer than the table set's, as expected. `Tebra/Dimension` holds
`space/` 2–9, 11–14, 16, 17, 19, 23, 24 · `radius/` 4, 16, 24 · `border/` 1, 2, 3 · `size/` 16, 20,
24, 40, 56, 64. **Every one of those was authored to satisfy a component.** Nothing in the collection
was authored for a page.

**Used by these exemplars.** Typed as literals in the generator, each with this log line as its
justification.

| # | Value | Number | Where it came from | Note |
|---|---|---|---|---|
| L-01 | Page width | 1440 | dashboard recipe, `Nav/Bar` at 1x | The single most-used number in the system and it is a component dimension, not a token |
| L-02 | Header height | 65 | `Nav/Bar`, certified; §3.30 | Comes in with the instance, so not typed — but there is no `size/appBar` to bind a page frame to |
| L-03 | Left rail width | 256 | R1, ruled closed 2026-08-14 | |
| L-04 | Rail body width | 255 | 256 − the 1px rule | **Not a decision the recipes support.** See the disagreement in §5 |
| L-05 | Content width | 1184 | 1440 − 256, by L3 | Derived here, not stated in any recipe |
| L-06 | Body height | 896 | **nothing** | No viewport height exists anywhere. Chosen as a multiple of 8 so no frame is fractional. Frame total 961 |
| L-07 | Placeholder dash | 8 / 8 | authored | Documentation decoration. `dashPattern` is not a bindable Figma field, so even `space/8` could not carry it |

**Not used here, but page-level and equally untokened.** Listed because the brief asks for the whole
missing set, not only what these two frames touched.

| # | Value | Number | Recipe |
|---|---|---|---|
| L-08 | Right rail width | 288 | R1 |
| L-09 | Main column at 1440 with both rails | 896 | L3 |
| L-10 | Sub-nav rail width | 144 | R2 |
| L-11 | Sub-nav item pitch | 48 | facesheet, `ListItemButton` composition |
| L-12 | Header band height, dashboard | 72 | 38 button + 2 × 16, snapped |
| L-13 | Patient band height, facesheet | 152 | B1 |
| L-14 | Band avatar | 72 | B1, decided-and-flagged; the `Avatar` component stays 40 |
| L-15 | Card min-height | 160 | facesheet, decided-and-flagged |
| L-16 | Logo left keyline | 32 | app bar, measured. ⚠ The `space/` scale runs 2–9, 11–14, 16, 17, 19, 23, 24, **40** — 32 falls in the gap between 24 and 40 |
| L-17 | Nav slot pitch | 65 | app bar |
| L-18 | Search field | 368 × 45 | app bar |
| L-19 | Screen breakpoint | 1100 | N1, adopted. Matches no theme breakpoint and no Material boundary |
| L-20 | Facesheet page ground | — | D-30: in no palette ramp at all |

**The shape of the list.** Sixteen of the twenty are whole multiples of 8 and would sit on the scale
without argument — 32, 48, 72, 144, 152, 160, 256, 288, 896, 1184, 1440. Four do not: 65, 45, 255 and
1100.

⚠ **The blind draft said the scale stops at 24. It stops at 40** — the live `space/` collection runs
2–9, 11–14, 16, 17, 19, 23, 24, 40, and `space/40` was added at some point after the Aug-1 plan. The
correction does not change the conclusion and slightly sharpens it: the scale reaches 40 but is
*gappy*, so 32 and 48 both fall between existing entries rather than above the ceiling. Every value
was still authored to satisfy a component; none was authored for a page. A page layer wants its own
collection, not more entries in `Tebra/Dimension`.

**Not proposed here.** Creating variables is a change to the file's token layer, which is Daniel's
call and is gated behind the same publish sequence as everything else.

---

## 5. Disagreements, reported not resolved

1. **The page gutter is 16 in one recipe and 24 in the other.** Dashboard: *Region content inset
   **16**, measured-from-product*, with L8 requiring all three regions to share it. Facesheet:
   *Content region inset **24**, Material-guideline L2/L5*. Both have tokens; they are simply
   different numbers for the same thing. The exemplars build **16**, because it is the rank-1
   measured value and because exemplar 1 is a dashboard-shaped page. The facesheet's 24 is not wrong
   and is not overwritten.

2. **The two rail recipes disagree about whether the 1px rule is inside the width.** R2 says it
   explicitly — *the 1px right edge is inside that 144* — and the product composes its own rail the
   same way, 191 of white plus a 1px rule at 191.0..192.0. R1 does not: its 256 is 224 of month-picker
   content plus 2 × 16 of padding, with no pixel spare. Put the rule inside and the content premise
   is 223, one short of the 224 the derivation rests on; put it outside and the rail occupies 257 and
   leaves the 8 grid. The exemplars build it **inside**, following R2's stated convention and the
   product's composition, and this line is the record that it costs R1 one pixel.

3. **The value that sets the rail width is derived from content the library cannot instance.** R1's
   256 is 7 day-columns × 32 + 32 of padding — a month picker. There is no month picker, calendar or
   date-picker component: DatePicker is on the deliberately-not-here list behind MUI X licensing. The
   number is sound and its premise is unbuildable, which is why the exemplar's rail holds a
   placeholder rather than the content that justifies its width.

4. **Node names in the schema are pre-rename.** `design-system-schema.json` writes `Nav / Bar`,
   `Icon / DownCaret`, `List / Item`. The 2026-08-10 normalisation removed the spaces so exports emit
   clean paths, which is what the kit records. The schema was last written 2026-08-04 and has not
   been swept for this. The generator matches both forms; the schema is stale, not wrong about which
   nodes exist.

5. **Product drift already logged against these values, carried here unchanged.** D-27 the content
   inset renders 48 left / 40 right / ≈24 top against a rule that gives one number · D-28 band 146
   against 144 · D-29 sub-nav rail 192 against 144 · D-38 nav search 33 tall against the kit's 45 ·
   F7 left rail 264 against 256. All five are dispositioned *product wrong* and all five stay that
   way; none of them moved a number in these exemplars.

---

## 6. Render dependency

Storybook is still unreachable, so nothing here was checked against a render. Two things are pinned
on that account and are labelled in the generator's own output rather than only here:

- **`Nav/Bar` is the file's one rendered-truth surface.** Its geometry was ruled from the product,
  not derived — the derivation chain went 64 → 65 → 76.8 → 65 and only the last matched. The
  exemplars instance it and do not touch it.
- **R1 and R2 both carry a standing test that can only be run in a render:** if a label wraps, the
  derivation was wrong, not the label. Neither exemplar contains a label, so neither runs the test.
  A rail carrying real section names still needs it.

---

## 7. Running the generator

`page-template-generator.js`, six `use_figma` calls, same idiom as `tokens-page-generator.js` —
self-contained scripts, helpers duplicated on purpose, each step idempotent (it removes the node it
is about to build). STEP 1 creates or clears the page; STEPS 2–5 build the two exemplars and their
captions; STEP 6 verifies and screenshots. Nothing calls `exportAsync` — the kit stays at 103.

### Run record

**2026-08-17 — RUN, and it built.** Authenticated as Daniel Cole (Tebra org, Full seat) through the
reinstalled Figma plugin's `use_figma`. Page `Page template exemplars` created at **489:2**.

| Check (from STEP 6, walking the built nodes) | Result |
|---|---|
| Nodes / paints on the page | 64 / 43 |
| **Fractional dimensions** | **0** |
| **Unbound paints** | **0** |
| Instances | **3** — `Nav/Bar` 1440 × 65 ×2, `Divider — rail edge` 1 × 896 |
| Exemplar 1 page frame | 1440 × 961 |
| Exemplar 1 content region | 1440 × 896, placeholder 1408 × 864 |
| Exemplar 2 rail | 256 × 896 = rail body 255 + Divider 1 — **closes** |
| Exemplar 2 rail + content | 256 + 1184 = **1440** |
| Gap between rail and content | **0** |
| `railRegionIsInstance` | **false** — the finding holds |
| Content / rail regions holding only a placeholder | **3 of 3** |
| Red blocks | **2**, carrying 3 headings |
| `UNSOURCED` frames still at 961 | 2 of 2 |
| Reference kit | **103 files** — untouched, no exports |

**Two failures on the way, both worth keeping.**

1. **The blind generator would not have run at all.** It called `figma.loadAllPagesAsync()` in every
   step — unsupported by `use_figma` — and walked every page to find components by name, which
   incremental page loading does not allow. It also targeted the wrong page and invented its caption
   metrics. Rewritten against the live file before anything was built.

2. **STEP 6 threw on its first run**, and the bug was in the verifier, not the build: `mkText` names
   a TEXT node after its own content, so the red block's heading text also matched
   `/^DOES NOT RESOLVE/` and had no `children` to slice. `use_figma` is atomic, so nothing was
   written. Guarded on `type === 'FRAME'` and re-run.

**One defect the numbers passed and the eye caught.** Every structural check was green on the first
verify, and the screenshot showed the rail placeholder's label spilling out of its 223-wide region
and being clipped — `…223 × 864 · this region is an auth`. The labels had `textAutoResize = 'HEIGHT'`
but no width and no `FILL`, so each kept its natural single-line width. At 1408 and 1152 the line
fits and nothing shows; at 223 it does not. Fixed with `FILL` + centre alignment, and the generator
now carries the fix with a comment naming why. **This is the case for looking at the render even when
the assertions are green**: no count in STEP 6 would ever have caught it.

### Reported, not fixed

The **`Table exemplars` root frame carries an unbound fill**, against the file-wide
0-unbound-paints invariant that `tokens-page-generator.js` STEP 5 and this generator's STEP 6 both
assert. It is the table set's node, not this one's, and it is left exactly as found. The two page
template frames bind theirs to `color/background/paper`.

---

## 8. Where the blind draft was wrong

Collected, because the pattern matters more than the individual corrections: **every one of these
came from trusting `design-system-schema.json` where the live file was available.** The schema was
last written 2026-08-04 and the file has moved since.

| # | Blind claim | Live file |
|---|---|---|
| 1 | The file has 9 pages | **10** — a `Table exemplars` page (446:2) exists |
| 2 | `Nav/Icon button` has 3 variants | **4** — a `Selected` state was added |
| 3 | The `space/` scale stops at 24 | Stops at **40**; 32 falls in a gap, not above a ceiling |
| 4 | Exemplars belong on the Reference page | The table set established a per-set exemplar page; matched instead |

Two further schema strings held up and are worth recording as *not* stale: `Nav/Bar` really is a
single 1440 × 65 `COMPONENT` carrying the whole bar, and `List/Item` really does have only
`State = Default \| Hover` — **no `Selected` variant** — which is the second leg of §3's case for
skipping the collapsed-rail exemplar.

The node-naming worry in §1.2 turned out to be moot: every component resolves as `Nav/Bar`,
`List/Item`, `Table/Cell` with no spaces, so the 2026-08-10 normalisation is complete and the
schema's spaced form is simply old. The generator now addresses components by **node id**, which
sidesteps the question entirely and is the more robust choice regardless.
