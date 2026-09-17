# Move the Tebra logo to the bottom of sign in

2026-09-17 · `TP5KrQtY0T5IcMNqi375So` · `Account screens` 103:2319 · library `YX2n4YLrEpBXNbcc73T6dw` read only · Daniel saved a named version before the batch

Two rulings, four pieces of work, all four done. Nothing was recreated and nothing was rewired: the logo is the same node it has always been, moved.

---

## Before and after

| | before | after |
|---|---|---|
| Children on `Account screens` | 48 | **48** |
| Frames | 40 | **40** |
| Reactions | 130 across 126 | **130 across 126** |
| Destinations | 36 | **36** |
| Off-page destinations | 0 | **0** |
| Starting points | `Account device` 103:2320, `Schedule` 204:4082 | **unchanged** |

Nothing was added or removed — this batch only moved things.

**The three frames that carry the logo**, enumerated from the file rather than assumed: `A S1 Login / default` 103:2320, `A S1 Login / error` 103:2330, `A S1 Login / after sign out` 163:2938. `A S10 Forgot password` and `A S11 Reset sent` carry no logo and were not touched.

---

## What was built

### 1. The logo is a bottom accent

Each `Nav/Logo` instance was **reparented out of the `App identity` lockup into its frame** — `appendChild`, not a clone — and the node id is unchanged on all three: 103:2325, 103:2335, 163:2943. Read back with `sameNode: true`.

**Trap 38 was checked before the move, not after.** Each logo carried **0 reactions of its own and 0 across its descendants**; all three read 0 again afterwards. There was nothing for a reparent to carry or drop, and that is now on the record rather than assumed.

| | value |
|---|---|
| position | **(145, 762)**, 100 × 24 |
| horizontally centred | 145 + 50 = 195 = 390 / 2 ✓ |
| bottom edge | **786** |
| safe-area line | 844 − 34 = 810 |
| gap to safe area | **24** |

It keeps its size and its fill: 8 vectors, **#F7F4EB**, bound `color/hardcoded (no palette)/navLogoCream`, read back on all three. Confirmed in pixels — logo ink occupies rows **762–785** on every frame.

### 2. The lockup now holds only the name

**Yes, the `App identity` frame holds only `App name` now**, and it was left in place as instructed. It hugs its height, so it collapsed **84 → 36**. Its `itemSpacing` is still 24 and still bound to `space/24`, but with one child there is nothing to space — noted in the plan's Known and accepted rather than removed, since the frame stays.

The name is unchanged in every respect that matters: Akkurat LL Regular **24 / 36**, `textAlignHorizontal CENTER`, FILLing 358, bound **`color/common/white`** and rendering (255, 255, 255). The **40** between it and the card is untouched.

### 3. The block sits above centre

The name and the card moved **as one block, exactly 10 px each** — the name 180 → **190**, the card 256 → **266** — so nothing moved relative to anything else inside the block.

The top was solved, not eyeballed. With `above` measured from the 47 status bar to the name, and `below` measured from the card bottom to the logo top at 762:

```
T − 47 = (2/3) × (762 − (T + 36 + 40 + 282))
5T = 949
T = 189.8  →  190
```

Measured back from the file:

| frame | block top | above (from 47) | card bottom | below (to logo top 762) | ratio |
|---|---|---|---|---|---|
| A S1 Login / default | **190** | **143** | 548 | **214** | **0.668** |
| A S1 Login / error | **190** | **143** | 632 | **130** | 1.100 |
| A S1 Login / after sign out | **190** | **143** | 548 | **214** | **0.668** |

0.668 against a target of 0.667 — the rounding to an integer costs 0.0015.

**The same top y on all three frames**, so the name and the card's top edge do not jump when the error appears.

### 4. Nothing overlaps the logo

Card bottoms are **548, 632, 548** against a logo top of **762**. The smallest clearance is 130. Confirmed in the renders as well as the tree.

---

## What was found

### The error frame's bottom gap is 130 where the others are 214

This is the trade-off the brief anticipated and set a floor for. The error card is **84 taller** (366 against 282), and holding the block top fixed at 190 across all three frames means that extra height comes out of the bottom gap.

**130 is above the 24 floor**, so the batch did not stop. Verified in pixels rather than derived: on the error render the card's last white row is 631 and the logo's first ink row is 762, giving 130 exactly.

The asymmetry is the cost of the instruction that matters more — the name and the card's top edge not jumping between states. It is recorded in `mobileAccount_signInContentSitsAboveCentre` and in §6.1 so nobody reads it later as a mistake.

### The cream-versus-white mismatch is no longer a lockup problem

`mobileAccount_signInShowsTheAppName` recorded that the wordmark renders the nav's hardcoded **#F7F4EB** while the name beside it is **#FFFFFF** — "two nearly-but-not-quite-matching inks". They are now **546 px apart** and no longer read as one object, so the mismatch has stopped mattering without anything being changed. That line was **amended rather than struck**, because the name and its binding survive the change; only the logo's half of it is superseded.

No DEFECT or GAP opened this batch.

---

## Verification

- **Counts** read before the first write and after the last: 48 children, 40 frames, 130 reactions across 126 owners, 36 destinations, zero off-page, two starting points — **all identical**, as they should be for a batch that moves and rewires nothing.
- **Node identity confirmed**, not inferred: each logo's id after the reparent equals its id before.
- **Reactions counted before and after the reparent** on each logo, own and descendant: 0 and 0.
- **Fill read back** on each logo's first vector: (247, 244, 235), bound `navLogoCream`.
- **Integer geometry** on all nine touched nodes — three logos, three lockups, three cards: **9 of 9 pass**.
- **Pixels, not only the tree**: logo ink at rows 762–785 on all three; card last-white rows 547, 631, 547; the error frame's 130 gap measured directly.
- **All three frames rendered at 1x and looked at** before this was written.

---

## What I believe but did not see

- **The prototype was not played.** No wiring was touched, and the reaction counts are unchanged, but the sign-in flow was not run.
- **Two thirds is the brief's ratio, applied to the two gaps as the brief defined them** — above from the 47 status bar, below to the top of the logo. A different reading (to the logo's baseline, or to the safe area) would give a different T.
- **The 24 above the safe area is a coordinate, not a bound token** — the frames have no auto-layout to bind it to, and 24 is `space/24`, the largest the library has. Same situation as the lockup gap before it.
- **The `App identity` frame's now-inert `space/24` gap was left**, as instructed; I did not test what happens if a second child is ever added back to it.

---

## Renders

- `figma-export/signin-logo-bottom-2026-09-17/` — the three sign-in frames at 1x
- `reports/Move the Tebra logo to the bottom of sign in.png` — the three side by side
