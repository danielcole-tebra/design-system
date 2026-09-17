# Clean up before the demo

2026-09-17 · `TP5KrQtY0T5IcMNqi375So` · `Account screens` 103:2319, `Components` 1:2 · library `YX2n4YLrEpBXNbcc73T6dw`, read only

Six rulings, six items, all six done. Four new reactions on the page and nothing else moved.

---

## What the enumeration found

### `A S3 Microphone` 103:2397 — the back action was already there

Four reactions on it, **all four already `{type: 'BACK'}`**: the top bar's back chevron `I103:2403;114:606` and the three device rows 103:2404, 103:2405, 103:2406. So the brief's fallback — wire it to `A4 Patient / landing` and note that the other three landings return there too — was never needed. **Figma's Back action is reachable through the plugin API**, and reads back as `BACK` from both `action` and `actions`.

**Fourteen reactions reached the picker, and only two were visible:**

| carrier | frame | visible? |
|---|---|---|
| `Account/List row · Microphone` 163:2780 | `A S9 Account` | **yes** |
| `Account/List row · Microphone` 163:2801 | `A S9 Account / unsent` | **yes** |
| `Input device pill` × 12 | the twelve open chart screens | **no** — all on hidden superseded recording bars |

### The microphone pill on the four landing pages

Each landing page carries **two** pill pairs: a hidden superseded pair left from the frame it replaced, and the live pair inside the `Visit/Patient header` instance. The live microphone pills carried **no reaction at all**:

| frame | live pill |
|---|---|
| `A4 Patient / landing` | `I287:10417;287:10353` |
| `A4 Colette / landing, after Marcus` | `I287:10526;287:10353` |
| `A4 Colette / landing, after Yusuf` | `I287:10637;287:10353` |
| `A4 Yusuf / landing, not sent` | `I298:11229;287:10353` |

### `Visit/Icon/Visibility (MUI)` 286:7411 and its three instances

24 × 24 component at (3090, 1442) on `Components`, one `Vector` 286:7410 at **(1, 4.5)**, 22 × 15, `SCALE`/`SCALE`, fill `#545454` bound `color/grey/700`.

| instance | frame | at | size |
|---|---|---|---|
| 286:7455 | `A S1 Login / default` | (298, 112) in `Login card` | 24 × 24 |
| 286:7497 | `A S1 Login / error` | (298, 196) | 24 × 24 |
| 286:7539 | `A S1 Login / after sign out` | (298, 112) | 24 × 24 |

All three named `Password visibility (SCAFFOLDING · the library Text field 34:633 has no end-adornment slot, so this sits over the field; not wired)`.

### "A4 Patient / placeholder" — four references, not the five the brief implied

| where | |
|---|---|
| the file | frame **103:3032** itself, one node |
| `mobile-spec.md` | §6 twice, §7 once |
| `mobile-plan.md` | **none** |
| `COMPOSITIONS.md` | **none** |

### The drawer, its Sheet list, and the schedule's closing line

`Visit/Drawer` `Mode=list` **48:814**, 390 × 621, inside set `Visit/Drawer` 48:897. Its `Sheet list` **48:823** is VERTICAL, **FIXED 543**, gap 0, **34 of bottom padding**, 42 children of which **nine visible** chart rows at 48 each — 432 of content.

`Schedule/End of list` **238:7558**: 390 × 64, **no fill**, one `Closing line` TEXT at (16, 22), 358 × 20, `textAlignHorizontal CENTER`, body2 **14 / 20** bound `color/text/secondary`, reading "That's everyone for today".

### Sarah Bennett — she is the signed-in provider

17 text nodes name her or carry `SB`. "Dr. Sarah Bennett" on `A S9 Account`, `/ unsent` and `/ sign-out warning` (plus a hidden superseded one on `A S10 Forgot password`), and `sbennett@windsorfm.com` in the `A S11 Reset sent` body.

**Twelve `Account/Avatar` 108:1212 instances, and every one of them is hers.** `Account/Avatar` is **local**, not a library part — a 40 × 40 salmon disc bound `color/primary/main` with an `Initials` TEXT reading `SB`.

| where | count | size |
|---|---|---|
| nested in `Account/Top bar` on the eight home and search frames | 8 | 40 × 40, `cornerRadius` 20 |
| standing alone in an identity block (`A S9 Account`, `/ unsent`, `/ sign-out warning`, `A S10 Forgot password`) | 4 | 40 × 40, `cornerRadius` 20 |

**One size, one radius** — so no avatar needed its own.

### `assets/`

| file | |
|---|---|
| `marcus-vance.png` | 1254 × 1254 |
| `colette-mwangi.png` | 1254 × 1254 |
| **`sarah-bennett`** | 1254 × 1254 PNG, **no file extension** — hers |

Renamed `git mv assets/sarah-bennett assets/sarah-bennett.png`. It is the file that appeared mid-batch yesterday and was swept into `5e5832c`; the rename is the cleanup that report asked for.

---

## 1. Microphone

**The four live pills wired**, tap → `A S3 Microphone`. Each was checked for an existing reaction first and threw if it had one, so nothing was overwritten.

**The back chevron rebuilt fresh** per note 49 — `{trigger:{type:'ON_CLICK'}, actions:[{type:'BACK'}]}` — and read back as `BACK` from both representations. It was already `BACK`; rebuilding it makes that a fact of this batch rather than an inherited assumption.

**Every visible way into the picker, after:**

| # | from | control |
|---|---|---|
| 1 | `A S9 Account` | `Account/List row · Microphone` |
| 2 | `A S9 Account / unsent` | `Account/List row · Microphone` |
| 3 | `A4 Patient / landing` | microphone pill |
| 4 | `A4 Colette / landing, after Marcus` | microphone pill |
| 5 | `A4 Colette / landing, after Yusuf` | microphone pill |
| 6 | `A4 Yusuf / landing, not sent` | microphone pill |

Six visible, out of 18 reactions total. The account route still works, unchanged. **The open chart screens' pills were left as they are** — the twelve wired ones are hidden and the live ones are inert, and the scrim covers both.

## 2. Login eye

**`Visit/Icon/VisibilityOutlined (MUI)` 299:8268**, on `Components` at (3090, 1546).

Built from the `@mui/icons-material` `VisibilityOutlined` path, following the icon recipe:

| recipe | done |
|---|---|
| 1 — keep the imported viewBox position | vector at **(1, 4)**, never reset to 0; the filled eye's is (1, 4.5) |
| 2 — `SCALE`/`SCALE` constraints on the master | set and read back |
| 3 — no `currentColor`; clone the source paint | the filled eye's `fills` array cloned **whole**, so `#545454` and the `color/grey/700` binding travelled together |
| 4 — vector named `Vector`, master `Icon/Name (MUI)` | both |
| trap 31 — the SVG wrapper's uninvited white fill | cleared, and the wrapper removed after the vector was moved out |

Both glyphs are 22 × 15 in a 24 box, so the swap is a shape change and not a size change.

**Rendered at 4x beside the old one before placing** — filled left, outlined right. `get_screenshot` capped at the node's natural 104 × 56 (trap 40), so the 4x came from `download_assets` at `defaultScale: 4`, which returned a true **416 × 224**.

**Swapped into all three sign-in frames.** `swapComponent` renames the instance to the new master, so each name was captured and restored; x, y, width and height are identical before and after on all three, and each instance's `Vector` reads (1, 4), 22 × 15, with the bound ink intact.

`Visit/Icon/Visibility (MUI)` 286:7411 renamed **SUPERSEDED** under rule 1. **Zero instances remain on it** across `Account screens`; the one instance that exists is in the proof frame on `Components`, which is the point of the proof frame.

## 3. Rename

**`A4 Patient / placeholder` → `A4 Patient / medications`**, node **103:3032**.

A name and nothing else, confirmed by nodeId:

| | before | after |
|---|---|---|
| outbound reactions | 8 | **8** |
| inbound reactions | 1 — `Visit/Chart row · Medications` `I103:3029;177:4832` | **1, the same node** |
| starting points on the page | `Account device` 103:2320, `Schedule` 204:4082 | **the same two, by nodeId** (trap 46) |

Updated in `mobile-spec.md` §6 (twice) and §7 (once). `mobile-plan.md` and `COMPOSITIONS.md` never mentioned it.

## 4. Closing line

**`Chart/End of list` 299:11339**, an instance of `Schedule/End of list` 238:7558 with its text overridden to **"End of chart"**, set once on the `Mode=list` master 48:814.

Reused rather than rebuilt, so the schedule and the chart end the same way: 390 × 64, no fill, one centred body2 14 / 20 on `color/text/secondary` filling the 358 column.

**It went last in `Sheet list`, not directly after Social history.** The five hidden `Sheet 10`–`14` rows sit between, so today it renders in exactly the place the brief asked for — and if one of those rows is ever unhidden, the line stays last instead of being stranded mid-list.

**All six chart lists follow.** There are **six**, not the seven the brief asked for; the brief itself names six, and six is what the file has, counted by `getMainComponentAsync` rather than by name.

| frame | `Sheet list` | content | slack | line bottom in frame | scrolls? |
|---|---|---|---|---|---|
| `A4 Patient / list` | 619 | **496** | 89 | **721** | **no** |
| `A4 Colette / after Marcus` | 619 | 496 | 89 | 721 | no |
| `A4 Colette / after Yusuf` | 619 | 496 | 89 | 721 | no |
| `A4 Yusuf / list, not sent` | 619 | 496 | 89 | 721 | no |
| `A5 Recording / drawer list` | 647 | 496 | **117** | **693** | **no** |
| `A5 Paused / drawer list` | 647 | 496 | 117 | 693 | no |

**The chart list still does not need to scroll on the patient screens, and the recording list does not overflow** — it has the most room of the six, because its drawer starts 28 higher. So the batch continued.

## 5. Sarah Bennett

She is the signed-in provider, so the item ran.

**`Visit/Avatar/Sarah Bennett` 299:11361**, on `Components` at (3506, 1442), **40 × 40** — the same shell as the patient avatars, at 40 rather than 48 and wrapping the local `Account/Avatar` rather than the library Avatar, because every avatar that represents her is a 40 `Account/Avatar`:

| | |
|---|---|
| disc fill | **IMAGE**, `assets/sarah-bennett.png`, `scaleMode FILL` |
| `cornerRadius` | **20** — the master's own, so nothing had to change to keep the circle |
| `Initials` `SB` | **hidden underneath**, as Marcus's `MV` and Colette's `CM` are |

**Uploaded through `upload_assets`**; the response carried `placedOnNodeId: 299:11362`, and the fill was **read back anyway** (trap 6): `IMAGE`, `scaleMode FILL`, hash `d50da0e904e27b5e…`, source **1254 × 1254** via `getImageByHash().getSizeAsync()`.

**All twelve reached by `swapComponent`** — the one move that works the same for the eight nested inside `Account/Top bar` and the four standing alone. Every one read back: 40 × 40, inner `cornerRadius` 20, IMAGE fill, the same hash.

**No avatar needed its own corner radius**, because all twelve are 40 × 40 with radius 20. Nothing was resized.

**Frames changed — twelve:**

| frame | avatar |
|---|---|
| `A S9 Account` | 140:1536 |
| `A S9 Account / unsent` | 140:1564 |
| `A S9 Account / sign-out warning` | 163:2829 |
| `A S10 Forgot password` | 164:1621 — **hidden**, on the superseded identity block |
| `A S2 Home / results` | `I103:2376;114:1719` |
| `A S2 Home / no results` | `I103:2389;114:1719` |
| `A S2 Home / searching` | `I103:2987;114:1719` |
| `A S2 Home / schedule` | `I204:4088;114:1719` |
| `A S2 Home / schedule, top` | `I204:4133;114:1719` |
| `A S2 Home / empty day` | `I204:4178;114:1719` |
| `A S2 Home / schedule, Marcus sent` | `I227:2426;114:1719` |
| `A S2 Home / schedule, both sent` | `I230:4683;114:1719` |

Eleven render; the twelfth is behind a hidden superseded block and was changed anyway, so nothing is left saying something different from the rest.

## 6. Counts, with the arithmetic

| `Account screens` 103:2319 | before | after | delta |
|---|---|---|---|
| Children | 58 | **58** | — |
| Frames | 50 | **50** | — |
| Nodes | 7913 | **7937** | +24 — six `Chart/End of list` instances at two nodes each, plus the swapped subtrees |
| Nodes with reactions | 206 | **210** | **+4** |
| Reactions | 214 | **218** | **+4** |
| Destinations | 206 | **210** | +4 |
| Unique destinations | 46 | **46** | — the picker was already one |
| Off-page destinations | 0 | **0** | — |
| Starting points | 2 | **2** | — |

**The four microphone pills are the whole delta.** The rename moves nothing; the eye swap moves nothing; the closing line carries no reaction; the avatar swap carries none either — the tap target on the home top bar is `Action tap target 60 x 48`, the avatar's parent, which was never touched.

**Starting points by nodeId** (trap 46): `Account device` 103:2320, `Schedule` 204:4082 — the same two, unchanged.

**`action` and `actions` agree on all 218 reactions on the page**, compared node by node, zero mismatches. Seven `BACK` actions in total, four of them the picker's.

---

## What was found

### The avatar swap emptied an exposed property on eight top bars — DEFECT

Trap 41 recorded that `Account/Top bar` exposes its nested avatar, so instances carry `Initials#108:0` through `exposedInstances` rather than through `componentProperties`. Read before the swap, each of the eight top bars showed `props: ["Initials#108:0"]`. Read after, the same entry shows **`props: []`**, because `Visit/Avatar/Sarah Bennett` has no `Initials` property of its own — the initials are one level deeper now, inside its nested `Account/Avatar`.

**Nothing renders differently**, and the top bar's own `Config` property is untouched. But a top bar can no longer be re-lettered from outside, so the day a second provider appears the exposure has to be rebuilt on the wrapper. Read back on all eight. `mobileAccount_avatarSwapEmptiedTheExposedInitials`.

### Sarah's photograph had no file extension — DEFECT

`assets/sarah-bennett` appeared in the working tree at 11:57 yesterday, mid-batch, and `git add -A` swept it into `5e5832c`. It is a PNG, 1254 × 1254, the same shape as the two patient portraits. **Renamed with `git mv` to `assets/sarah-bennett.png`** — a rename, not a delete, so the history follows it.

Recorded rather than done silently because the file was not created by any batch and nothing in the plan called for it. If it came from somewhere with a canonical name, that name should win over this one. `mobileAssets_sarahsPhotoHadNoExtension`.

### The brief's "seven chart lists" is six

The brief asked to check seven and then named six — Marcus, Colette's two, Yusuf's, and the recording and paused lists. The file has exactly **six** instances of `Visit/Drawer` `Mode=list`, enumerated by resolving every instance's main component rather than by matching names. There is no seventh. All six were checked and all six follow.

### `BACK` works through the plugin API

The brief allowed for it not being available. It is: `{type: 'BACK'}` is accepted by `setReactionsAsync`, survives a read, and appears in both `action` and `actions`. So the picker genuinely returns to whichever screen opened it, and the fallback — wiring it to `A4 Patient / landing` and noting that the other three landings return there too — was not needed and was not done. Worth knowing for any other overlay that should return to its caller.

### The closing line went last, not directly after Social history

The brief said "at the end of the Sheet list … after Social history", which are the same place today and different places the moment a hidden row is shown. It went at the very end. Today it renders directly after Social history, exactly as asked; if `Sheet 10` is ever unhidden, the line stays last instead of being stranded above it.

---

## Verification

- **Enumerated from the file, not from the spec** — which is how "all four picker reactions are already `BACK`" and "there are six chart lists, not seven" both turned out to be facts rather than assumptions.
- **`figma.skipInvisibleInstanceChildren = false`** on every read, with effective visibility computed by walking to the page — the only reason the twelve hidden routes into the picker are distinguishable from the two real ones.
- **Every reaction built fresh** per note 49, and every destination read back by frame name from **both** `action` and `actions`, across all 218 on the page.
- **Each pill checked for an existing reaction before writing**, so nothing was silently overwritten.
- **The new glyph rendered at 4x and looked at before it was placed**, not after.
- **`swapComponent` results read back per node** — main component, name, x, y, size, and the nested vector's position and bound fill — because trap 42 says a swap keeps what the names match and drops what they don't.
- **The uploaded fill read back despite `placedOnNodeId` being returned** (trap 6), including the source image's stored size.
- **All six chart lists measured individually** rather than inferred from the master.
- **Counts before the first write and after the last**, with the +4 traced to the four pills and nothing else.

---

## What I believe but did not see

- **The prototype was not played.** That the picker's `BACK` returns to the landing page the pill was tapped on is what `BACK` means, not something executed here.
- **The MUI path is transcribed, not imported from the package.** It renders as the outlined eye at 4x and its bounding box lands at (1, 4) 22 × 15 against the filled eye's (1, 4.5) 22 × 15, which is the check that it is the right glyph at the right size — but `@mui/icons-material` was not read from disk.
- **The eight top bars' `Config` property was read as present, not exercised.** Whether the top bar still switches configurations correctly after the avatar swap is unplayed.
- **`A S11 Reset sent` names her email and was not touched**; nothing about it changes with the photograph.
- **The twelfth avatar is hidden** on `A S10 Forgot password`'s superseded identity block. It carries the photo and reads back correctly, but it does not render anywhere.

---

## Renders

- `reports/demo-cleanup/` — sixteen files: the four landing pages, the picker, the three sign-in frames, two chart lists, six Sarah frames, and the 4x eye proof
- `reports/Clean up before the demo.png` — the contact sheet: ten screens across two rows, with the two eyes at 4x, Sarah at 2x and the closing line at 1.4x beneath
