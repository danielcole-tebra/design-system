# Fix the clipping at the bottom of the avatar photos, and make Yusuf's disc teal

2026-09-17 · `TP5KrQtY0T5IcMNqi375So` · `Components` 1:2, `Account screens` 103:2319 · library `YX2n4YLrEpBXNbcc73T6dw`, read only

Two items, both done. **Zero reaction delta.**

---

# Item 1 — the clipped band

## What the 8x render shows

Rendered from four fresh instances on beige. `download_assets` caps `defaultScale` at **4**, so the 8x came from `node.screenshot({ scale: 8 })` inline — a true 8x to look at — and a true 4x export for the measurements and the contact sheet.

At the bottom edge of each:

| | what is there |
|---|---|
| **Sarah** | the ring completes, and **a soft shadow sits below the circle** |
| **Marcus** | the ring completes, then **nothing — a hard flat cut straight into the beige** |
| **Colette** | the same hard cut |
| **Yusuf** | the same hard cut |

That is the band. It is not the photograph being cut: it is **the shadow being missing**, which leaves the antialiased bottom of the circle butting straight onto the page with no transition, and reads as a flat clipped edge.

## The measurements, before

Centre column of a 4x export, the first eight rows **below** the disc, as "darker than beige":

| | rows 0–7 below the disc | |
|---|---|---|
| **Sarah** | 57, 54, 45, 35, 23, 11, 4, 1 | shadow over 7 rows |
| **Marcus** | 0, 0, 0, 0, 0, 0, 0, 0 | **no shadow at all** |
| **Colette** | 0, 0, 0, 0, 0, 0, 0, 0 | **no shadow at all** |
| **Yusuf** | 0, 0, 0, 0, 0, 0, 0, 0 | **no shadow at all** |

## The four masters, read in full

**None of the four causes the brief listed is present.**

### Geometry — correct on all four

| | wrapper | clip node | square? | radius | radius = half? | clips | inset in wrapper |
|---|---|---|---|---|---|---|---|
| Sarah | 299:11361, 40 × 40 | **299:11362** 40 × 40 | **yes** | 20 | **yes** | true | 0 / 0 / 0 / 0 |
| Marcus | 287:7428, 48 × 48 | **287:7429** 48 × 48 | **yes** | 24 | **yes** | true | 0 / 0 / 0 / 0 |
| Colette | 287:7431, 48 × 48 | **287:7432** 48 × 48 | **yes** | 24 | **yes** | true | 0 / 0 / 0 / 0 |
| Yusuf | 298:8127, 48 × 48 | **298:8128** 48 × 48 | **yes** | 24 | **yes** | true | 0 / 0 / 0 / 0 |

So **cause 2 is out**.

### The image paint — correct on all three photos

| | scaleMode | imageTransform | rotation | opacity | visible | fills on the node |
|---|---|---|---|---|---|---|
| Sarah | **FILL** | identity `[[1,0,0],[0,1,0]]` | 0 | 1 | true | **1** |
| Marcus | **FILL** | identity | 0 | 1 | true | **1** |
| Colette | **FILL** | identity | 0 | 1 | true | **1** |

One fill each — nothing sitting under the image and nothing over it. Source images all **1254 × 1254**. So **cause 1 is out**.

### Stroke and shadow

| | strokeWeight | strokeAlign | on the same node as the image | shadow |
|---|---|---|---|---|
| all four | **1** | **INSIDE** | **yes** | radius 1, offset 0 / 1, spread 0, 25%, `showShadowBehindNode` **false** |

The ring measures exactly **4 rows at 4x** at the bottom centre — identical at the sides, and identical on Yusuf's solid-fill disc, which is the control. Nothing is off-centre, so **cause 4 is out**.

### Children of the clipping node

One each, and on the photos it is hidden: `Initials` "SB" (hidden), `Letter` "MV" (hidden), `Letter` "CM" (hidden), `Letter` "YB" (visible — Yusuf has no portrait). All sit at y 10, height 20, well inside the disc. Nothing can cover the bottom.

## The source PNGs

Read with Pillow. **All three are RGB with no alpha channel**, fully opaque:

| file | size | mode | alpha | bottom 20 rows, alpha range | bottom 20 rows, mean RGB | middle 20 rows, mean RGB |
|---|---|---|---|---|---|---|
| `marcus-vance.png` | 1254 × 1254 | RGB | **none** | 255–255 | (58.4, 71.4, 96.6) | (183.2, 160.0, 152.7) |
| `colette-mwangi.png` | 1254 × 1254 | RGB | **none** | 255–255 | (70.2, 71.3, 64.7) | (172.4, 152.8, 143.3) |
| `sarah-bennett.png` | 1254 × 1254 | RGB | **none** | 255–255 | (201.9, 204.9, 210.3) | (168.1, 147.5, 138.2) |

The bottom rows differ from the middle because the bottom of a portrait is clothing and the middle is a face — Marcus's navy shirt, Colette's olive top, Sarah's white coat. Per-row means over the last eight rows are flat to within a couple of units in each file, so there is no band of anything. **Cause 3 is out.**

## The actual cause

**The wrapper was clipping its own drop shadow.**

Marcus's, Colette's and Yusuf's wrappers are 48 × 48 frames whose only child — the clipping disc — is also 48 × 48 at (0, 0). All three carried **`clipsContent: true`**. The shadow is offset **Y +1** with radius 1, so it lands entirely outside the wrapper's bottom edge and is cut away.

**Sarah's wrapper had `clipsContent: false`** and rendered correctly. It was built in a different batch, which is the only reason it differs.

This is **PLUGIN-NOTES trap 21** — "Frames default clipsContent true, so overhanging absolute children vanish; clear it on the component and every wrapper" — showing up on a wrapper rather than on a component, and with a shadow rather than a child.

## The fix, and why it was applied

**None of the brief's four causes matched, and the brief's stop case — "the photographs are simply framed with the chin or shoulders near the bottom" — is not it either.** So this is a judgement the brief did not cover, and here is the reasoning:

- The heading says **"fix it only if the fix is mechanical."** Setting one boolean on three nodes is as mechanical as a fix gets.
- **There is a correct sibling already in the file.** Sarah's wrapper is `false` and renders right; the change makes the other three match it rather than inventing anything.
- **It restores Daniel's own ruling.** He specified the 0 / 1 / 1 / 0 shadow at 25% yesterday, and on three of the four avatars it has never once rendered.
- **Nothing else can be affected.** The wrapper's only child exactly fills it, and that child does its own clipping, so the only thing that becomes visible is the shadow.

Applied: `clipsContent = false` on **287:7428**, **287:7431** and **298:8127**.

**If that was the wrong call, it is one flag back on three nodes.**

## After

| | rows 0–7 below the disc |
|---|---|
| Sarah | 57, 54, 45, 35, 23, 11, 4, 1 |
| **Marcus** | **58, 54, 47, 35, 23, 11, 4, 1** |
| **Colette** | **58, 54, 47, 35, 23, 11, 4, 1** |
| **Yusuf** | **58, 54, 47, 35, 23, 11, 4, 1** |

All four now match. The one-unit differences against Sarah's are the 40 versus 48 size.

---

# Item 2 — Yusuf's disc goes teal

Superseding the green ruling: the recording band is green, and a green disc on the patient whose recording failed reads wrong.

## Every teal token, with its paired contrast text

| teal token | hex | paired contrast text | hex | ratio | |
|---|---|---|---|---|---|
| **`color/primary/main`** | **#004852** | **`color/primary/contrastText`** | **#FFFFFF** | **10.25:1** | **used** |
| `color/primary/dark` | #004852 | `color/primary/contrastText` | #FFFFFF | 10.25:1 | same value as main |
| `color/primary/200` | #8CB2B6 | `color/primary/contrastText` | #FFFFFF | 2.29:1 | fails |
| `color/primary/100` | #CBDDE0 | `color/primary/contrastText` | #FFFFFF | 1.40:1 | fails |
| `color/info/light` | #067889 | code: `info.contrastText` | #FFFFFF | 5.18:1 | passes |
| `color/info/main` | #4678CC | code: `info.contrastText` | #FFFFFF | 4.36:1 | fails |
| `color/core/main` | #B3C6C4 | `color/core/contrastText` | #004852 | 5.76:1 | passes, but sage |
| `color/core/light` | #D4E0DD | `color/core/contrastText` | #004852 | 7.57:1 | passes, but sage |
| `color/action/active` | #004852 | — | — | — | no paired contrast text |
| `color/action/hover` | #CBDDE0 | — | — | — | no paired contrast text |
| `color/computed (no palette)/alertOutlinedInfoText` | #023037 | — | — | — | a text colour, not a surface |

**Claude's default was available.** `color/primary/main` with `color/primary/contrastText` reaches **10.25:1**, well over the 4.5:1 the brief required, so no fallback was needed. **Pending Daniel.**

## Applied

| | before | after |
|---|---|---|
| disc **298:8128** fill | `color/grey/400` #D6D6D6 | **`color/primary/main` #004852** |
| `YB` letters fill | `color/background/default` #E8E5DF | **`color/primary/contrastText` #FFFFFF** |
| contrast | **1.16:1** | **10.25:1** |

As instance overrides inside the local master `Visit/Avatar/Yusuf Bahri` 298:8127 — never on the read-only library Avatar — with the resolved colour written into the paint before binding (Paints rule 1).

**Untouched, and read back to prove it:** 48 × 48, `cornerRadius` 24, `strokeWeight` 1 INSIDE bound `color/common/white`, drop shadow 1 / 0,1 / 0 at 25% with `showShadowBehindNode` false. **The three photograph avatars were not touched.**

---

## Verification

**Four fresh instances into a beige proof frame, read back** — not the masters:

| | wrapper clips | size | radius | fill | ring | shadow | letters |
|---|---|---|---|---|---|---|---|
| Sarah | **false** | 40 | 20 | IMAGE FILL | bound, 1 INSIDE | 1 / 1 / 0.25 | SB hidden |
| Marcus | **false** | 48 | 24 | IMAGE FILL | bound, 1 INSIDE | 1 / 1 / 0.25 | MV hidden |
| Colette | **false** | 48 | 24 | IMAGE FILL | bound, 1 INSIDE | 1 / 1 / 0.25 | CM hidden |
| Yusuf | **false** | 48 | 24 | **SOLID `primary/main`** | bound, 1 INSIDE | 1 / 1 / 0.25 | **YB on `primary/contrastText`** |

**All 29 avatar instances on `Account screens`** read back afterwards: **zero wrappers still clipping**, ring and shadow on every one, **both Yusufs teal**.

### Counts

| `Account screens` 103:2319 | before | after |
|---|---|---|
| Children | 58 | **58** |
| Frames | 50 | **50** |
| Nodes | 7937 | **7937** |
| Nodes with reactions | 210 | **210** |
| **Reactions** | **218** | **218** |
| Destinations | 210 | **210** |
| Unique destinations | 46 | **46** |
| Off-page | 0 | **0** |
| Starting points | 2 | **2**, by nodeId |

**Zero reaction delta** and zero node delta — every change was a property on an existing node. `action` and `actions` agree on all 218. The only nodes added anywhere are the two proof frames on `Components`, **328:747** (before) and **329:6752** (after), kept as SCAFFOLDING under rule 1.

---

## What was found

### A wrapper the same size as its child silently eats that child's shadow — DEFECT, fixed same batch

The three 48 × 48 wrappers had been clipping the shadow since it was added yesterday, and it was invisible as a bug because **what was missing was a soft edge, not a hard element**. A missing shadow does not look like a missing shadow; it looks like the photograph has been cut. That is exactly how Daniel described it.

Worth generalising: a wrapper sized exactly to its child, with `clipsContent` on, will clip **anything that renders outside the child's box** — shadows, glows, focus rings, overhang. Trap 21 says to clear it on the component and every wrapper; this is the case where the wrapper looks harmless because it fits perfectly. `mobileAvatar_wrapperWasClippingItsOwnShadow`.

### `libraryAvatar_fallbackInitialsAreInvisible` is closed for this file, not in the library

No avatar in the prototype uses the library's #E8E5DF-on-#D6D6D6 pairing any more — Yusuf's was the last, at 1.16:1, and it is now 10.25:1. **The library defect itself stands**: `Content=Letter` 108:1220 still ships that pairing, and the next consumer will hit it. Struck in FLAGS with that distinction written out.

### `download_assets` caps `defaultScale` at 4

The brief asked for 8x. `defaultScale: 8` is rejected — "expected number to be <=4". A true 8x is available inline through `node.screenshot({ scale: 8 })`, which is what was used to look at the edge; it cannot be saved to disk, so every measurement and the contact sheet come from a true 4x export, magnified with nearest-neighbour where the report shows a crop. Worth adding to trap 40, which currently records the `get_screenshot` cap but not this one.

---

## What I believe but did not see

- **The prototype was not played.** Nothing about wiring changed and the counts say so, but no tap was executed.
- **The 8x inline render is what I judged the band from**; the numbers in this report are all from the 4x export, which is the one I could measure and keep.
- **`color/primary/dark` is identical to `color/primary/main`** (#004852) — that comes from the code doc, and both measure the same 10.25:1, so the choice between them is naming rather than colour.
- **Yusuf's teal is Claude's default awaiting Daniel.** It is applied, not merely proposed, because the brief said to apply the default if it reached 4.5:1; if he wants `info/light` or a `dark`, it is two paints on one master.
- **Sarah's wrapper was already correct and was not touched**, so her avatar is unchanged in every respect this batch.

---

## Renders

- `reports/avatar-clip/` — seven files: the 4x before and after on beige, the bottom-edge zoom, and four 1x screens
- `reports/Fix the clipping at the bottom of the avatar photos.png` — the contact sheet: before and after at 4x, Marcus's bottom edge at 16x either side of the fix, four 1x screens, and the teal table
