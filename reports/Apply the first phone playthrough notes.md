# Apply the first phone playthrough notes

2026-09-17 · `TP5KrQtY0T5IcMNqi375So` · `Account screens` 103:2319 and `Components` 1:2 · library `YX2n4YLrEpBXNbcc73T6dw` read only

Daniel played the prototype on a phone and gave five rulings and six pieces of work. Five of the six are built and verified in pixels. **The sixth, the divider above the Patient chart drawer, was not built, because the line it names is not in the file** — see *What was found*.

The wiring was not touched: 114 reactions across 110 owners, 32 destinations, two starting points, before and after.

---

## What was built

### 1. The app is Visit Companion, with the Tebra mark in front of it

The library has no standalone logo. `Nav/Logo` 2:882 is one lockup of **eight vectors** — the first three (2:883, 2:884, 2:885) draw the mark and occupy x 0–24.71, the last five draw the wordmark letters from x 32.61 to 100. Nothing else in the library matches `/tebra|logo|wordmark|brand|mark/`. Logged as **`mobileBrand_libraryHasNoStandaloneLogo`**.

So the mark was cut out locally. The three mark vectors were cloned from the in-file instance 103:2325, framed, and scaled to the title's cap height, which was **measured rather than assumed**: a throwaway "V" in Akkurat LL Regular 24 reports `absoluteRenderBounds.height` **17.0156**. New component **`Brand/Tebra logo` 238:7557**, on a new `Brand/` group on `Components` at (360, 3406), with the source node in its description.

Two numbers are worth the words:

- **The box is 18 x 18 and the ink is 17.64 x 17.** The extra pixel is not padding for its own sake. A 17-tall child centres on **23.5** in a 64-tall bar, and a half pixel is against rule 4; 18 centres on **23**, and with the mark inset 1 from the box top its ink top lands on **24** against a cap top of 23.98. Integer y, and the mark sits on the cap.
- **The aspect is 1.0374, the source's own.** The first cut was wrong and the read caught it: the vectors were given `SCALE` constraints before the frame was resized 17.636 → 18, so the resize stretched the mark **2.06 % horizontally**. Undone by dropping to `MIN` constraints, scaling the three vectors back by 17.636/18, then restoring `SCALE`. Re-read: 1.0374, matching 24.707/23.816 exactly.

The fill was re-bound. The source binds `color/hardcoded (no palette)/navLogoCream` **#F7F4EB**, hardcoded in the nav's `<style>` block rather than `currentColor`, which on the beige top bar would be all but invisible. All three vectors now bind **`color/primary/main` #004852**, read back as (0, 72, 82).

Then one edit reached everything: on the `Account/Top bar` `Config = Title with action` master 114:601, the `Title` was set to "Visit Companion" and a logo instance inserted as the row's first child. **All eight instances that show the title followed with no override** — `schedule`, `schedule, top`, `schedule, Marcus sent`, `schedule, both sent`, `empty day`, `searching`, `results`, `no results`. The title moves x 16 → **42**, 302 → **276** wide; "Visit Companion" is 182, so nothing truncates. The `Back with title` and `Back only` variants are untouched, so `Account`, `Microphone` and `Reset password` still read as screen titles with no mark.

### 2. The date header is real, and it is pinned

"Today" → **"Thursday, September 17"** on all four schedule frames.

**Figma's "fix position when scrolling" is not reachable from this plugin API build.** `scrollBehavior` is absent from the typings and throws on a FRAME on both read and write — `node.scrollBehavior: no such property 'scrollBehavior' on FRAME node`, probed twice. So the pin is structural, and it is what the existing scroll area allows without restructuring it:

| | before | after |
|---|---|---|
| `Content` stack | top bar 64, search 80, scroll **619** | top bar 64, search 80, **`Date header` 40**, scroll **579** |
| stack total | 763 | **763** |
| scroll bottom | 810 | **810** |

The heading was **moved, not rebuilt** — the same node, renamed `List heading` → `Date header` — out of the scrolling `Schedule content` and into `Content` as a sibling of the scroll frame. The list now passes under it and it cannot scroll away.

One consequence, and it is the peek cue: with the 40-tall heading gone from the stack, Renata Ilves's row moves from stack y 256 to **216**, so the offset that puts its midpoint on the container top moves **−292 → −252** on `/ schedule` and `/ schedule, Marcus sent`. The cue is unchanged in the render; it is now the date header rather than the search field that cuts the row in half. `/ schedule, top` and `/ schedule, both sent` stay at 0.

### 3. The list ends

New local component **`Schedule/End of list` 238:7558** on `Components` at (830, 2174), in the `Schedule/` group: 390 x 64, **no fill** so `color/background/default` runs under and past it, holding one centred body2 **14 / 20** on `color/text/secondary` reading "That's everyone for today". The text **FILLs** the row's 358 content width with `textAlignHorizontal CENTER` rather than hugging and centring — an odd-width string centred in an even box lands on a half pixel, which is the thing rule 4 exists to prevent, and filling puts the node at x 16 w 358 with the glyphs in the same place.

Instantiated as the last child of `Schedule content` on all four frames, at stack y **1008**. The stack goes 1008 → **1072** against a 579 container, so all four still overflow.

Recorded in COMPOSITIONS.md, with the brand mark and the pinned header.

### 4. The Template pill reads SOAP Note

Set once on the master `Template pill` 61:480 inside `Visit/Recording bar`'s `State=ready`: `Label#83:165` → "SOAP Note", and the **library Button's own `Start icon#83:220` boolean → false**, so the list glyph is hidden by the component's property rather than deleted. `End icon#83:275` untouched, so the `ArrowDropDown` caret stays.

**All four A4 instances followed with no override** — `A4 Patient / list`, `/ summary`, `/ placeholder` and `A4 Yusuf / list, not sent` — read back on each: label "SOAP Note", start icon `visible: false`, end icon `visible: true`.

Geometry: the pill goes **200 → 139** wide (17 + 81 label + 8 + 16 caret + 17), so the device pill beside it moves **x 224 → 163** and the pills row now ends at 245 against the 374 gutter.

Daniel named this as a deliberate departure, so it is filed as **superseding `visitDrawer_v4TopBarNoteToolbar`**, which built the pill "exactly as the NPVE Note toolbar builds it".

### 5. Yusuf's DOB

Marcus's and Yusuf's identity rows are now the same object, node for node.

The cause was the defect the previous batch introduced while fixing a different one. `Patient detail` on the master was **103 x 36 FIXED, `textAutoResize NONE`** — exactly the width of "DOB 03/14/1972" and 2 px short of "DOB 07/22/1985". The previous batch patched Yusuf's instance to HUG, which stopped the clip and moved the DOB **8 px down**, because a hugging box is 20 tall instead of 36 and the row is baseline-aligned.

**The instance could not be fixed.** `resize(120, 36)` on `I200:6708;48:908` is **silently ignored** — the width snapped back to the master's 103 on every one of four attempts, while `textAutoResize` and `layoutSizing*` read exactly as set. This is trap 18's shape on a TEXT node rather than an instance, and it is worth knowing: the sizing *modes* are overridable on an instance child, the *size* is not.

So the master was widened: **48:908 is now 120 x 36**, 15 px of slack on the longer string. Yusuf's node was returned to `NONE` / FIXED and inherits it. Read back on all four ready bars:

| frame | row | name | detail | DOB ink top |
|---|---|---|---|---|
| A4 Patient / list | y 91, h 44 | y 8, h 36 | y 20, w 120, h 36 | **115.88** |
| A4 Patient / placeholder | y 91, h 44 | y 8, h 36 | y 20, w 120, h 36 | **115.88** |
| A4 Patient / summary | y 91, h 44 | y 8, h 36 | y 20, w 120, h 36 | **115.88** |
| A4 Yusuf / list, not sent | y 91, h 44 | y 8, h 36 | y 20, w 120, h 36 | **115.88** |

Nothing moved for Marcus: the box is the last child of a MIN-aligned row and the text is left-aligned inside it.

---

## What was found

### 1. The divider named in item 5 is not in the file

Daniel: *"There is a divider line directly above the Patient chart drawer on the recording frames. Check the paused frames for the same line. Hide it, do not delete it."*

Enumerated from the file, not from the spec, with `skipInvisibleInstanceChildren = false`. Every drawer instance on `Account screens`:

| frames | drawer | `Stroke` |
|---|---|---|
| A5 Recording / drawer list, / summary, / medications | at y 119 | **off** |
| A5 Paused / drawer list, / summary | at y 119 | **off** |
| A S5 Recording / recording, / paused, and both microphone frames | drawer edge at y 732 | **off** |
| A4 Patient / list, / summary, / placeholder | at y 201 | **on** |
| A4 Yusuf / list, not sent | at y 265 | **on** |

And in pixels, not only in the tree. Scanning the 1x render of `A5 Recording / drawer list` for rows that are ≥ 80 % near-grey across the width returns **exactly one line, at y 196** — the drawer's own title divider, 1 px INSIDE the bottom of the 48 title row, which §6.4 requires in both modes. Above the drawer, the green field meets white at y 119 with no line between them. The same scan on `A S5 Recording / recording` returns **nothing at all** between y 730 and 844: the collapsed edge has no line either.

So there is no line above the drawer on any recording or paused frame. The only frames with a line at the drawer's top edge are the four **A4 patient** frames, where the `Stroke` boolean is deliberately **on** because the drawer docks under a light bar — `mobileVisit_sheetAndDrawerCorners`, "on for a drawer docked under a light bar, off over a field or a scrim".

**Nothing was hidden** (rule 10). Hiding the A4 stroke would overturn a standing composition ruling on four screens, on my reading of a note that names different screens. Raised in the plan's Open list; one line from Daniel closes it either way. Evidence renders are `14-a5-recording-drawer-list-103-3042-1x-evidence.png` and `15-as5-recording-103-2426-1x-evidence.png`.

### 2. No frame as drawn shows the closing line

1072 of content in a 579 window puts "That's everyone for today" below the fold on all four schedule frames. That is what a closing line is for — you reach it by scrolling — but it means the ruling is not visible in any still, and it will only be judged on the phone. The proof render shows the row itself against beige.

### 3. `empty day` has no date header

`A S2 Home / empty day` never carried a "Today" heading; it shows "No appointments today" alone. The ruling says the header shows the real date "in place of 'Today'", so there was nothing to replace and it was left. Whether an empty day should still be dated is a question, not a defect.

### 4. `\uXXXX` escapes break `use_figma`'s parser

Three scripts failed with a bare `SyntaxError: expecting ';'` and no line number. Bisected to the escape: a single-quoted string containing `'` fails, the same string with a literal apostrophe passes. The harness appears to unescape `\uXXXX` **before** parsing, so `'` becomes a real `'` and terminates the string. Use literal characters, or `String.fromCharCode`. Added to PLUGIN-NOTES.md.

---

## Verification

Every number below was read back from the file after the write, and every frame was looked at before this was written.

| | before | after |
|---|---|---|
| `Account screens` children | 44 (36 frames + 8 labels) | **44 (36 + 8)** |
| Reactions | 114 across 110 | **114 across 110** |
| Destinations | 32 | **32** |
| Starting points | `Account device`, `Schedule` | **unchanged** |
| `Components` groups | 4 | **5** (`Brand/` added at y 3406) |
| `Archive` frames | 24 | **25** (the proof frame) |

**Integer geometry.** All 27 nodes this batch created or moved were checked for integer `x`, `y`, `width`, `height`: **27 of 27 pass** — the four `Date header` frames (0, 144, 390, 40), the four `Schedule scroll` frames (0, 184, 390, 579), the four `Schedule content` stacks (390 x 1072 at y −252 or 0), the four end-of-list instances (0, 1008, 390, 64), `Brand/Tebra logo` (18 x 18), the `Brand mark` instance in the top bar (16, 23, 18, 18), `Template pill` (16, 12, 139, 38) and `Patient detail` (180, 20, 120, 36). The only fractional numbers in the batch are the three mark vectors' own bounds, which rule 24 excludes.

**Instances read, not masters** (rule 3). `Brand/Tebra logo` and `Schedule/End of list` were both instantiated into a paper-filled proof frame and rendered at 4x before either went near a screen; the logo instance reads 18 x 18 with its vector bound `color/primary/main`, the end-of-list instance reads 390 x 64 with its text bound `color/text/secondary`. The eight top-bar titles, the four template pills and the four identity rows were all read on the instance.

**Bound paints, not literals.** Every fill written this batch went through `setBoundVariableForPaint` with the resolved colour written into the paint first (paint rule 1) and the alpha re-applied last (paint rule 2), and every one was read back: three vectors on `color/primary/main`, one text on `color/text/secondary`, one proof frame on `color/background/default`.

**The proof frame did not stay on `Components`.** §4 says that page carries no PROOF frames, so it was moved to `Archive` at (0, 18556) as `PROOF Brand/Tebra logo and Schedule/End of list (SCAFFOLDING)` rather than deleted (rule 1).

---

## What I believe but did not see

- **The prototype was not played.** The pin is structural and should hold in the prototype because the header is outside the scrolling frame, but I did not run it on a phone.
- **The closing line was verified as a component instance against beige, not in place on a schedule frame** — in place it sits at frame y 987, outside the 844 frame, where a render would show it against the canvas rather than the page. Its geometry and binding were read in place on all four.
- **`scrollBehavior` is unavailable in this API build.** I did not confirm whether the Figma UI could still pin the header by hand; the claim is only that the plugin API cannot.
- **The cap height 17.0156 is Akkurat LL Regular's, measured through `absoluteRenderBounds` on one glyph.** A glyph with an overshoot would report slightly more.
- **The A5 recording and paused frames were not re-rendered after this batch**, because nothing in them was changed; the evidence renders for finding 1 were taken before any write.

---

## Renders

- `figma-export/phone-playthrough-notes-2026-09-17/` — the 13 changed frames at 1x, plus two evidence renders for the divider finding
- `reports/Apply the first phone playthrough notes.png` — the thirteen side by side
