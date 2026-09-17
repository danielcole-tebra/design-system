# Polish the avatars and drop the chart's closing line

2026-09-17 · `TP5KrQtY0T5IcMNqi375So` · `Components` 1:2, `Account screens` 103:2319 · library `YX2n4YLrEpBXNbcc73T6dw`, read only

Three rulings, three items, **two done and one stopped for Daniel**. Zero reaction delta, as required.

---

## 1. Lift the avatars off the beige

### Where Daniel's edit actually is

Swept every page for a node carrying a drop shadow or a white stroke. It is **303:4213**, and it is not where the brief expected:

| | |
|---|---|
| node | **303:4213**, `Account/Avatar (local)` |
| type | **`FRAME`** — not an instance, not a component |
| where | `scratchpad` → `A S2 Home / schedule` **303:3993** → `Content` → `Account/Top bar` → `Action tap target 60 x 48` → `Account avatar` |
| ancestry | **every ancestor is a `FRAME`** |

**So it is neither a master nor an instance override — it is a detached copy.** Daniel detached a scratchpad copy of the schedule to try the treatment on. That answers the brief's question and explains why the values had to be re-applied at the masters rather than promoted: a detached frame inherits nothing and propagates nothing.

It has no `effectStyleId` and no `strokeStyleId`, so there was no style to reuse either.

### His values, read off his node

Not taken from the prompt:

| | read from 303:4213 |
|---|---|
| stroke | `SOLID` **#FFFFFF**, opacity 1, blendMode NORMAL, **unbound** |
| strokeWeight | **1** |
| strokeAlign | **INSIDE** |
| effect | `DROP_SHADOW`, visible, **radius 1**, offset **X 0 / Y 1**, **spread 0**, `rgba(0, 0, 0, 0.25)`, blendMode NORMAL |
| showShadowBehindNode | **false** |

They match the brief's screenshot exactly, which is worth saying because it means the screenshot and the file agree and neither had to be preferred.

### Where it went

**On the node that clips the circle**, in each of the four wrappers — never on the wrappers, which are square, `cornerRadius` 0 and `clipsContent` false, so a stroke there would have drawn a box around the disc:

| wrapper | clipping node | size | radius |
|---|---|---|---|
| `Visit/Avatar/Sarah Bennett` 299:11361 | **299:11362** `Account/Avatar (local)` | 40 | 20 |
| `Visit/Avatar/Marcus Vance` 287:7428 | **287:7429** `Avatar (library)` | 48 | 24 |
| `Visit/Avatar/Colette Mwangi` 287:7431 | **287:7432** `Avatar (library)` | 48 | 24 |
| `Visit/Avatar/Yusuf Bahri` 298:8127 | **298:8128** `Avatar (library)` | 48 | 24 |

**Identical values at 40 and 48, not scaled**, as the brief specified. A 1 px ring reads as a ring at both sizes; scaling it would make the larger avatar look heavier than the smaller one on the same screen.

### Tokens: the white binds, the black does not

The Tebra/Color collection has **58 colour variables**. (`figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()` returns nothing in this sandbox, so the collection was resolved through one of its variables instead — `getVariableCollectionByIdAsync` on a remote collection does return the full `variableIds` list.)

**Four tokens resolve to #FFFFFF:**

| token | means |
|---|---|
| **`color/common/white`** | **white — used** |
| `color/background/paper` | a surface |
| `color/primary/contrastText` | text on teal |
| `color/error/contrastText` | text on red |

The stroke is bound to **`color/common/white`**, read back on every instance.

**Nothing resolves to black at 25%.** Every black-ish alpha in the collection:

| token | value |
|---|---|
| `color/substrate/inputOutline` | #000000 @ **0.23** |
| `color/action/disabled` | #000000 @ 0.5 |
| `color/computed (no palette)/alphaBlack50` | #000000 @ 0.5 |
| `color/computed (no palette)/alertFilledWarningText` | #000000 @ 0.87 |
| `color/text/primary` | #000000 @ 1 |

`inputOutline` at 0.23 is the nearest, and it both misses the value and means an input outline. Per the brief — do not invent tokens — **the shadow colour is left raw** and filed as a GAP. `libraryColor_noBlack25ForShadows`.

### Read back on instances

**34 avatar instances across three pages**, every one carrying the bound stroke at weight 1 INSIDE and the 0 / 1 / 1 / 0 shadow at 25%:

| page | instances |
|---|---|
| `Account screens` | **29** — 11 Sarah at 40 (one hidden), 5 Marcus, 10 Colette, 2 Yusuf, all at 48 |
| `scratchpad` | 2 Marcus |
| `Archive` | 2 Marcus, 1 Colette |

Plus the four fresh instances in the proof frame, instantiated from the masters and read back rather than trusted — Sarah 40 / radius 20, the other three 48 / radius 24, all four bound to `color/common/white` with the same shadow. The 4x render on beige is in the contact sheet.

**Daniel's own edit was left exactly as it is.** It now **duplicates the master values** — same stroke, same shadow — but on a detached frame, so nothing is overriding anything. Recorded, not cleared.

## 2. Yusuf's initials — **not applied, stopped for Daniel**

The brief authorised Claude's default only at **4.5:1 or better** against the paired contrast-text token, and said to stop and ask otherwise.

**The library's only green family is `success`.** Code files it under Status and pairs it as `error/warning/success/info.contrastText` = **#FFFFFF** (TEBRA-DESIGN-SYSTEM.md §Status). The library itself has **no `color/success/contrastText` variable** — only primary, secondary, core and error have one — so the pairing had to come from code. That is a GAP in its own right: `libraryColor_successHasNoContrastTextVariable`.

| green token | hex | vs its paired contrastText #FFFFFF | vs `color/text/primary` #000000 |
|---|---|---|---|
| `color/success/light` | #6FC691 | 2.07:1 | **10.16:1** |
| **`color/success/main`** | **#3FA266** | **3.20:1** ✗ | 6.57:1 |
| `color/success/dark` | #2B865A | **4.51:1** ✓ | 4.66:1 |

Other green-ish tokens, none of them a `main` in a green family: `alphaSuccess70` #3FA266 @ 70%, `alertStandardSuccessBg` #F1F9F4, `alertSuccessComputedText` #2C4F3A, `chipSuccessBackground` #C3E7C0.

For reference only: **`color/core/main` #B3C6C4** with `color/core/contrastText` #004852 reaches **5.76:1** — but code calls Core "a Tebra-only palette slot", a sage, not a green.

**There is exactly one green `main`, and it measures 3.20:1.** So no green pair reaches 4.5:1 and the item stops here.

**The question for Daniel** — three ways out, all within the ruling that the disc takes a green token:

1. **`success.dark` #2B865A with white — 4.51:1.** Passes, and it is the closest thing to "the green main with the highest contrast". But it is `dark`, not `main`.
2. **`success.main` #3FA266 with white — 3.20:1.** The token the brief named, at a ratio that fails AA for body text but passes AA Large (3:1) — and two initials at 16 px are arguably large text.
3. **`success.light` #6FC691 with `color/text/primary` — 10.16:1.** Inverts the pairing: dark ink on a pale green. Best contrast by far, and it departs from the library's own main/contrastText convention.

**Yusuf's disc is unchanged**, still rendering at 1.16:1. The 4x proof shows it beside the three photographs, which is the clearest statement of the problem this report can make.

## 3. Remove "End of chart"

`Chart/End of list` **299:11339** on `Visit/Drawer` `Mode=list` 48:814:

- `visible` → **false**
- renamed **`SUPERSEDED 2026-09-17 · Chart/End of list — Daniel dropped the chart's closing line; kept under rule 1`**
- **not deleted**, and still the last child of `Sheet list`, one flag from coming back

**All six chart lists re-measured, and none shows the line:**

| frame | `Sheet list` | content | slack | last row bottom | scrolls? | line visible? |
|---|---|---|---|---|---|---|
| `A4 Patient / list` | 619 | **432** | **153** | **657** | no | **no** |
| `A4 Colette / after Marcus` | 619 | 432 | 153 | 657 | no | no |
| `A4 Colette / after Yusuf` | 619 | 432 | 153 | 657 | no | no |
| `A4 Yusuf / list, not sent` | 619 | 432 | 153 | 657 | no | no |
| `A5 Recording / drawer list` | 647 | 432 | **181** | **629** | no | no |
| `A5 Paused / drawer list` | 647 | 432 | 181 | 629 | no | no |

Content is back to exactly where it was before the line was built — 496 → **432** — and every list is back to 9 visible rows.

## Counts

| `Account screens` 103:2319 | before | after |
|---|---|---|
| Children | 58 | **58** |
| Frames | 50 | **50** |
| Nodes | 7937 | **7937** |
| Nodes with reactions | 210 | **210** |
| **Reactions** | **218** | **218** |
| Destinations | 210 | **210** |
| Unique destinations | 46 | **46** |
| Off-page destinations | 0 | **0** |
| Starting points | 2 | **2**, by nodeId |

**Zero reaction delta**, as the brief required — and zero node delta, because nothing was created on this page. Every change was a property on an existing node, plus one node hidden and renamed. `action` and `actions` agree on all 218.

The only node added anywhere in the file is the proof frame **317:12984** on `Components`, which carries no reaction.

---

## What was found

### No library token resolves to black at 25% — GAP

So half of Daniel's treatment binds and half does not: the ring is `color/common/white`, the shadow is a raw `rgba(0,0,0,0.25)`. The collection has `alphaBlack50` but no `alphaBlack25`, and the nearest black alpha — `color/substrate/inputOutline` at 0.23 — is both the wrong value and the wrong meaning. Left raw rather than bent onto a near miss. `libraryColor_noBlack25ForShadows`.

### The library has no `color/success/contrastText` — GAP

Code defines `error/warning/success/info.contrastText` as #FFFFFF, but only primary, secondary, core and error have a contrastText variable in Tebra/Color. So a contrast check on a green surface has to be done against a hex read out of the code doc. Found while answering the green ruling, and it is the reason the pairing is cited from code rather than from a token. `libraryColor_successHasNoContrastTextVariable`.

### The closing line lasted one day

It was built on Daniel's ruling in the previous batch and dropped on his ruling in this one. Worth noting only because of how it was built: one instance of an existing component, on one master, with a text override. Undoing it was **one visibility flag and one rename** — no measurement to redo, nothing to rebuild, and the construction is still in the file if a scrolling sheet ever needs it. The cheap version was the right version to build first.

### The brief's expectation about where Daniel's edit lived

The brief asked whether his node is "a master or an instance override". It is neither. Reported rather than forced into one of the two answers, because the distinction matters: a detached frame is exactly the case where nothing propagates, which is why the treatment had to be re-applied four times at the masters.

---

## Verification

- **Swept every page** for the shadow and the white stroke, rather than assuming the edit was on a named avatar node — which is the only reason it was found on `scratchpad` at all. The first, narrower sweep over avatar-named nodes on `Account screens` and `Components` returned **zero**.
- **Daniel's values read off his node**, never typed from the brief; the brief's screenshot is quoted in this report as corroboration, not as the source.
- **`figma.skipInvisibleInstanceChildren = false`** on every read, with effective visibility computed by walking to the page — which is how the hidden Sarah avatar on `A S10 Forgot password` stayed in the count of 29 while being marked as not rendering.
- **The clipping node checked before writing**: the script threw if `clipsContent` was false, so the stroke could not land on a square wrapper.
- **`setBoundVariableForPaint` result read back** (trap 2) — the bound variable id is confirmed on all four masters and on every instance.
- **Instantiated from the masters into a beige proof frame and read the instances back**, per the brief; master reads are not the evidence here.
- **All six chart lists measured individually** after the change, not inferred from the master.
- **Counts before the first write and after the last**, and the zero delta is the check that nothing structural moved.
- **The 4x render came from `download_assets` at `defaultScale: 4`** — `get_screenshot` caps at natural size (trap 40), so it cannot produce a true 4x.

---

## What I believe but did not see

- **The prototype was not played.** Nothing about wiring changed, and the counts say so, but no tap was executed.
- **The ring reads as a ring on a phone** is a judgement from a 4x render on beige, not from a device. It is the thing to check at arm's length, along with whether the 25% shadow survives a real screen.
- **Yusuf's disc is unchanged and still measures 1.16:1.** That figure is carried over from the previous batch's measurement of the same two tokens; it was not re-sampled here because neither token moved.
- **`color/core/main` is listed as "not a green" on the code doc's authority**, which calls Core a Tebra-only palette slot. That is a naming judgement, and Daniel may read #B3C6C4 as green enough.
- **The proof frame 317:12984 is kept** on `Components` as SCAFFOLDING under rule 1. It is the only node this batch added anywhere.

---

## Renders

- `reports/avatar-polish/` — eight files: the 4x avatar proof on beige, three landing pages, two chart lists, the account screen and the schedule
- `reports/Polish the avatars and drop the chart's closing line.png` — the contact sheet: five screens, two chart lists, the four avatars at 4x, and the green table that stops item 2
