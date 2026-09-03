# Icon build

**BUILT 2026-08-19.** Closes the largest item on `COVERAGE-SURVEY.md`. Breaks the kit freeze
deliberately.

## Kit count

| | Before | After |
|---|---:|---:|
| PNG | 55 | 55 |
| SVG | 48 | **96** |
| **Total** | **103** | **151** |

`figma-export/Icon/` went from 41 to **80**. A new `figma-export/Marketing/` holds **9**.

**Certification has lapsed.** `REFERENCE-KIT.md` certifies 103 files as of 2026-08-10 with all joins
resolving in both directions. That certificate no longer describes the kit. **The four-point drift
check needs re-running** before anything depends on the kit again.

## Icons in Figma

| | Before | After |
|---|---:|---:|
| `Icon/` masters | 41 | **80** |
| `Marketing/` masters | 0 | **9** |
| `Illustration/` masters | 7 | 7 |
| **Total on the icons page** | **48** | **96** |

Of the 80 utility masters, **11 are MUI internal glyphs** carrying a `(MUI)` suffix and **69 are Tebra
icons**.

## What was built

**48 of the 50 targeted.** 39 new utility icons and 9 marketing icons.

Every glyph was extracted from its own `.tsx` source, converted from JSX to SVG, and imported through
Figma's asset upload as an editable vector tree. **Nothing was drawn by hand and nothing was traced.**
`icon-extract.py` in this repo does the extraction and is re-runnable.

Names follow the code exactly. Nothing was tidied, expanded or re-cased.

### The two that were not built

| Icon | Why |
|---|---|
| **`AINoteAssist`** | The source file is **265,349 bytes** in a single `createSvgIcon` call, with a `viewBox` of `0, 0, 400, 400`. It is a traced illustration filed among the icons, not an icon. It exceeds what the plugin call can carry, and the alternative was redrawing it, which the brief forbids |
| **`WileyTreatmentPlanner`** | Its source declares `viewBox="0 -960 960 960"`, a Material Symbols origin, while its artwork is 24 wide. Imported faithfully it renders **blank**, because the content lands outside the frame. Normalising it needs the path data rescaled, which is redrawing. **Attempted three ways and reverted each time** |

Both are reported as source defects below rather than worked around.

## Geometry and binding

Each icon is authored at its own viewBox size from source. **Two are not 24:**

- `Icon/Idea` is **48**, and is the only multicolour glyph in the utility set.
- Everything else is 24.

**Fills.** 36 monochrome icons bind to `color/text/primary`, following the precedent already set by
`Icon/DownCaret`, `Icon/TrashOutlined` and `Icon/Calendar`. The code uses `currentColor`, so any
binding is a Figma-side decision; this build follows the file rather than inventing.

**Three icons are deliberately unbound:** `Error`, `Phone` and `RadioChecked`. Each carries a white
knockout shape, and a single binding fills the knockout in — which is exactly what happened on the
first pass and was caught by eye, not by assertion. Their fills are left as authored.

**Ten are multicolour and unbound:** `Idea` plus all nine marketing icons, which use `#FF8D6E`.

**Inflation.** Every icon binds a whole number and renders larger. `SvgIconOverrides.ts` encodes
`fontSizeMedium: "1.7142857142857142rem"`, which is 24/14, against `htmlFontSize: 16` — so a 24
renders at **27.4286**. Each component description records the computed value. **No fraction is
authored anywhere.**

## The four with no code counterpart

`Icon/Engage`, `Icon/Payments`, `Icon/Platform`, `Icon/Reports` remain in place. They have no file in
`packages/design-system/src/components/icons`; they came in from the navigation config. Removing them
would break the nav work.

Their provenance is now visible on the catalogue: **those cells, and the two other nav glyphs
`Billing` and `Clinical`, sit on the nav ground rather than the page ground.** They are painted
`color/common/white` because they live on the `#004852` nav bar, so on a white catalogue they were
invisible until given their real ground.

## Catalogue

Page **`Icon catalogue`**, a reference surface with no four-field captions. 80 utility and 9
marketing, each at a consistent 24 with its code name beneath, grouped as the code groups them. One
red block at the top carries the totals, the Tebra against MUI split, and the inflation note.

## The open slots

| Board | Slot | Status |
|---|---|---|
| DataGrid exemplars | `CheckmarkFilled`, 4 status cells | **Filled** |
| DataGrid exemplars | `Unsorted`, 2 header cells | **Filled** |
| Action row exemplars | `Refresh` | **No slot existed.** The action row board never drew an empty placeholder; `Refresh` was a discovery finding (A-5), not a built slot. The icon now exists if that board is revised |
| Patient header proposal | `Lock`, `Unlock` | **Blocked.** Both icons are built, but that board is in the proposals file and the new icons report `UNPUBLISHED` |

The DataGrid board's marker paragraph was rewritten, since it said three icons were missing and two
of them are now in place.

**PH-5 is closed as a finding** — the padlock was a kit gap, not a code gap, and the kit now has it —
**but the patient header cannot pick it up until the library is republished.**

## Defects, flagged and not fixed

| # | Where | What |
|---|---|---|
| **IC-1** | `icons/AINoteAssistIcon.tsx` | 265KB of traced path data with a `0, 0, 400, 400` viewBox, filed as an icon. The comma-separated viewBox is also not valid SVG syntax, though browsers tolerate it |
| **IC-2** | `icons/WileyTreatmentPlannerIcon.tsx` | Declares `viewBox="0 -960 960 960"` while its artwork is 24 wide. Renders blank when imported faithfully. A Material Symbols paste that was never normalised |
| **IC-3** | `icons/IdeaIcon.tsx` | Not a `createSvgIcon` like every other icon; it wraps a raw 48 SVG with **hardcoded hexes** `#FF8D6E` and `#1E4951`. `#1E4951` **is not in the palette at all** — the nearest is `primary.main` `#004852` |
| **IC-4** | `icons/` generally | Four files use JSX fragments `<>` rather than `<g>`, which is not valid SVG and silently produced malformed output until caught: `Error`, `Menu`, `Phone`, `TrashFilled` |
| **IC-5** | The kit, pre-existing | `Icon/Platform` has **four vectors with no fills, only white strokes**. On any ground but the nav bar it is invisible. The other five nav glyphs are white fills, which is correct for their context but makes all six unusable elsewhere |
| **IC-6** | The nine marketing icons | All use the raw hex `#FF8D6E` rather than binding `color/secondary/main`, which holds that exact value |

## Disagreements

| Question | One source | The other |
|---|---|---|
| How the 48 kit files were produced | The existing 41 icons in the kit are **Figma exports** | These 48 are the **code source SVGs**, copied after the Figma masters were imported from them and verified by rendering. `exportAsync` truncates at 20KB per response, so a full round-trip was not reliable. **The geometry is the same; the provenance is not.** The drift check should reconcile this |
| Icon count in code | `COVERAGE-SURVEY.md` says 67 | Still 67. 39 built, 2 unbuildable, and 26 were already in the kit |
| Icon colour | Code uses `currentColor`, so icons have no intrinsic colour | Figma binds `color/text/primary` for monochrome glyphs, following the file's own precedent. This is a Figma-side decision, not a transcription |

---

## Page reconciliation, 2026-08-19

Icons lived on two pages. **They were two views of one set, not two sets.**

**All 89 glyphs on the catalogue page were instances of components on the icons page.** Zero separate
components, zero detached nodes, zero loose vector or group geometry. Nothing was duplicated, so
merging was a layout change and no component was touched.

**The true distinct count is 96** — counting each component once regardless of where it appears, and
all 96 masters were already on a single page.

### Every number accounted for

| Number | Source | Value | What it is |
|---|---|---:|---|
| Distinct glyph components | Figma, counted once each | **96** | 80 `Icon/` + 9 `Marketing/` + 7 `Illustration/` |
| Components on the icons page | Figma | **96** | the same 96. None lived anywhere else |
| Catalogue instances | Figma | **96** | one per component. Was 89 before this pass, because illustrations had no group |
| Kit export files, glyphs only | disk | **96** | `Icon/` 80 + `Marketing/` 9 + `Illustration/` 7 |
| Icon source files | `components/icons` | **67** | |
| Marketing source files | `components/marketingIcons` | **9** | all 9 built |

**The 80 against the 67 resolves exactly:**

| | Count |
|---|---:|
| Built from `components/icons` | **65** |
| MUI internal glyphs, not Tebra icons | **11** |
| Sourced from the navigation config, not `packages/design-system` | **4** |
| **Total `Icon/`** | **80** |

And 67 source files = **65 built + 2 unbuildable** (`AINoteAssist`, `WileyTreatmentPlanner`, both
recorded above as IC-1 and IC-2).

**The 89 against the 96** is the 7 illustrations, which the catalogue did not show until this pass.
**The 96 against the 89** is the same 7. Illustrations are not icons and are grouped separately.

**Six glyphs are painted white**, not four. The four with no code counterpart — `Engage`, `Payments`,
`Platform`, `Reports` — plus `Billing` and `Clinical`, which **do** exist in code and are also painted
for the nav bar. All six keep the dark ground in the catalogue and their provenance note stands.

### One name, two components

`Icon/RadioChecked` and `Icon/RadioChecked (MUI)` both exist and hold different glyphs — a Tebra ring
and MUI's ring-and-dot. **Both were left in place.** The duplication is real but unconfirmed as
unwanted, and resolving it belongs to the recertification job, not here.

### Result

**One page.** `Icons & illustrations` holds the 96 component masters and, below them, the catalogue
frame as a labelled layout of 96 instances grouped Utility, Marketing, Illustrations. The `Icon
catalogue` page was emptied and deleted; the file is back to 15 pages. Nothing renamed, no component
deleted, and the 124 unbound paints and the `RadioChecked` collision were left untouched.
