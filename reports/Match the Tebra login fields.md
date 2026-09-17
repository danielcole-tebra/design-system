# Match the Tebra login fields

2026-09-17 · `TP5KrQtY0T5IcMNqi375So` · `Account screens` 103:2319, `Components` 1:2, `Archive` 214:3026 · library `YX2n4YLrEpBXNbcc73T6dw`, read only

One ruling, five items, all five done. Three GAPs found in the library Text field, all of them load-bearing for this batch.

---

## What the enumeration found

### The three frames, and the answer to "component or frame content"

**Frame content.** There is no shared source: each frame owns its own `Login card`, and each card owns its own two field instances. **Six fields, and every change was made three times.**

| frame | card | Email field | Password field | reactions |
|---|---|---|---|---|
| `A S1 Login / default` 103:2320 | 103:2326, 282 tall | 103:2327 | 103:2328 | Forgot password → A S10, Sign in → schedule |
| `A S1 Login / error` 103:2330 | 103:2336, 366 tall | 103:2338 | 103:2339 | the same two |
| `A S1 Login / after sign out` 163:2938 | 163:2944, 282 tall | 163:2945 | 163:2946 | the same two |

Two reactions each, six in all, and **no frame-own reaction** on any of the three.

### The fields as they were

All six identical: library **`Text field` 34:633**, 310 × 56.

| property | value |
|---|---|
| `size` | medium |
| `State` | Default |
| `Value` | **Empty** |
| `Fill` | Paper |
| `Label#123:0` | **"Email" / "Password"** — already correct |
| `Value text#123:11` | "Default Value" (not rendered at `Value=Empty`) |
| `Show helper#123:33` | false |
| `required` / `select` / `multiline` | false |

With `Value=Empty` the label rendered as **`Label / resting`**, 16 / 24, sitting *inside* the field, and `Label slot` was hidden — so the outline's top edge ran unbroken. That is the thing the ruling changes.

### The password field's structure and end adornment

```
Password field (INSTANCE)
└ Input                       310 × 56, fill color/background/paper, padding 16 / 14
  ├ Outline
  │  ├ Cap left     9 wide,  strokes 1/0/1/1  ┐
  │  ├ Label slot   hidden,  strokes 0/0/1/0  ├ the notch, all bound color/substrate/inputOutline
  │  └ Body right   301,     strokes 1/1/1/0  ┘
  ├ Text → Value ("") + Multiline rows (hidden)
  ├ Select caret    hidden, 20 × 20 at x 278, bound color/grey/600
  ├ Label / floating  hidden, 12 / 16 at y -8
  └ Label / resting   visible, 16 / 24
└ Helper text        hidden
```

**There is no end adornment and no slot for one.** The only trailing affordance is the `select#123:55` boolean, which reveals a fixed `Select caret` — not swappable, and a caret rather than an adornment.

### There is no `variant=outlined` — reported before changing anything

The brief asked me to report if the fields were not the library Text field at `variant=outlined`. **They are the library Text field, and the set has no `variant` axis at all.** Its four axes are `size` (medium, small), `State` (Default, Hover, Focused, Disabled, Error), `Value` (Empty, Filled) and `Fill` (None, Paper) — 40 variants, **every one of them outlined**.

That matches code. TEBRA-DESIGN-SYSTEM §3.4 records the input layer as raw MUI with **no `MuiOutlinedInput`, `MuiInputBase`, `MuiInputLabel` or `MuiFormControl` override anywhere**, and the floating-label notch as a real `fieldset` whose `legend` interrupts the top border — which is exactly the `Cap left` / `Label slot` / `Body right` construction above. Outlined is the only form the library ships.

So nothing had to change about the variant; what changed is where the label sits.

---

## 1. Field labels

Both labels already read "Email" and "Password". What this batch changed is that they now sit **in the outline**.

The library expresses a shrunk label **only through `Value=Filled`**. So all six fields were set to `Value=Filled` and their **`Value text#123:11` blanked**, which floats the label without giving the field a value.

Probed on `103:2327` first and read back before applying to the rest:

| node | before | after |
|---|---|---|
| `Label / floating` | hidden | **visible**, 12 px, y **−8** |
| `Label slot` (the notch) | hidden | **visible** — the outline's top edge opens |
| `Label / resting` | visible, 16 / 24 | **hidden** |
| `Value` | "" | **""**, still empty |
| `Helper text` | hidden | hidden — **none was added** |

**Each field's state is untouched**: all six are still `State=Default`, and all six still render an empty value.

## 2. Show/hide icon

**The library cannot express it — GAP.** There is no end-adornment property on the Text field, in either direction.

**The glyph.** The library *does* ship eye icons — `Icon/EyeIconOpen` **575:16** and `Icon/EyeIconClosed` **575:15** — but both are **drawn Tebra glyphs, not `@mui/icons-material` paths**. §2's standing glyph ruling says glyphs match their MUI path exactly, and the drawn carets were already overridden for the same reason. So `Visit/Icon/Visibility (MUI)` was built instead.

**`Visit/Icon/Visibility (MUI)` 286:7411**, on `Components` at (3090, 1442), built to the icon recipe:

| recipe rule | what was done |
|---|---|
| keep the imported viewBox position | the single `Vector` sits at **(1, 4.5)**, 22 × 15 — not reset to 0 |
| constraints `SCALE` / `SCALE` on the master | set, read back |
| no `currentColor`; bind the fill | bound **`color/grey/600`**, the same ink the field gives its own Select caret |
| vector layers named "Vector" | yes |
| MUI-internal glyphs are `Icon/Name (MUI)` | `Visit/Icon/Visibility (MUI)`, matching the file's nine existing MUI masters |
| trap 31 — `createNodeFromSvg` adds a white wrapper fill | cleared |

Proof instance kept on `Archive` as **`PROOF · Visit/Icon/Visibility (MUI) on paper` 286:8824**, on its own paper fill (trap 5).

**Placement, labelled SCAFFOLDING.** On each of the three password fields, an instance is an **absolutely-positioned child of the `Login card`**, at card x **298**, ending **12** from the field's right edge — the same inset the field gives its own Select caret — and vertically centred in the 56. Absolute frame positions: (314, 378), (314, 462), (314, 378).

The layer name carries the reason: *"Password visibility (SCAFFOLDING · the library Text field 34:633 has no end-adornment slot, so this sits over the field; not wired)"*.

**The icon is not wired.** Read back: 0 reactions on all three.

## 3. Nothing else changed

Item 3 asked for before and after positions if the new labels changed the fields' height. **They did not** — `Value=Empty` and `Value=Filled` are both 56.

| | before | after |
|---|---|---|
| Field height, all six | 56 | **56** |
| `App identity` y | 190 | **190** |
| `Login card` y | 266 | **266** |
| `Login card` height, default / error / after sign out | 282 / 366 / 282 | **282 / 366 / 282** |
| Wordmark y | 762 | **762** |
| Card bottom to logo | 214 / 130 / 214 | **214 / 130 / 214** |

The header, the "Visit Companion" name, the logo, the Sign In button and the layout are as they were.

## 4. One shared source?

There is none — the form is frame content. So each change was made on each frame: **six field edits and three icon placements**.

## 5. Wiring

| | before | after |
|---|---|---|
| Children on `Account screens` | 54 | **54** |
| Frames | 46 | **46** |
| Reactions | 157 across 153 nodes | **157 across 153** |
| Destinations | 42 | **42** |
| Off-page destinations | 0 | **0** |
| Starting points | 2 | **2** |

`Archive` went 32 → 33 children and still reads **0 reactions** and no starting point.

---

## What was found

### The library Text field has no `variant` axis — GAP

Outlined is the only form it ships; filled and standard MUI inputs are unreachable from this library. It matches code, which has no input-layer override at all. `libraryTextField_hasNoVariantAxis`.

### `Value` conflates "has a value" with "the label has shrunk" — GAP

An empty field cannot float its label without claiming to be filled. In MUI these are independent: `InputLabelProps={{shrink: true}}` floats the label whatever the value is, which is what the real Tebra login does on an empty form. Worked around here with `Value=Filled` and a blank value string, which renders correctly but makes the variant read wrong in the layers panel. **The library needs a `shrink` boolean independent of `Value`.** `libraryTextField_valueAxisConflatesShrink`.

### No end-adornment slot — GAP

No start or end adornment property, only the fixed Select caret behind the `select` boolean. That is why the eye sits *over* the field rather than *in* it, and why it is SCAFFOLDING on all three frames. **The library needs adornment slots on the Text field.** `libraryTextField_noEndAdornmentSlot`.

### The library's eye icons exist and were deliberately not used

`Icon/EyeIconOpen` 575:16 and `Icon/EyeIconClosed` 575:15 are drawn, not MUI. The standing ruling overrides drawn glyphs with their MUI paths, as it already did for the carets, so the MUI Visibility path was built. Recorded so the choice is not read later as an oversight. `mobileLogin_visibilityGlyphIsMuiNotTheLibraryEye`.

**Only the "show" glyph exists.** There is no `VisibilityOff` and no revealed state, because the icon is not wired and the field has no second state to draw. If the toggle is ever built it needs the pair and a revealed variant of the field.

---

## Verification

- **`figma.skipInvisibleInstanceChildren = false`** at the top of every read, and effective visibility computed by walking to the page rather than trusting `node.visible` (trap 39) — which matters here, since the whole change is about which of four label nodes renders.
- **Read back from the six instances, not the masters** (rule 3): variant values, `Label / floating` visibility, position and size, `Label slot` visibility, `Label / resting` hidden, the `Value` node's characters, and `Helper text` hidden.
- **The new icon master instantiated and the instance read** (rule 3): vector name, bound variable, constraints — and rendered at 4x before it went anywhere near a screen.
- **Geometry read before and after** on all three frames: field heights, card y and height, identity y, wordmark y, card-to-logo gap.
- **Counts read before the first write and after the last**, on `Account screens` and on `Archive`.
- **Four renders looked at**: the three sign-in frames at 1x and the icon on paper.

---

## What I believe but did not see

- **The prototype was not played.** No wiring changed and the eye is deliberately inert.
- **The real Tebra login was not opened.** "Matches the real Tebra login" is Daniel's description of the target; this batch built to his words — outlined, labels in the outline, an eye on the password field — not to a screenshot of production.
- **The MUI Visibility path was written from `@mui/icons-material`**, not copied out of the library, because the library has no MUI eye. It renders as the familiar filled eye and was checked at 4x.
- **`Value=Filled` with a blank value is a workaround, not a state the library intends.** It renders correctly today; a future library update that keys anything else off `Value` would surface it.
- **The `Login card` is auto-layout and the icon is an absolute child of it**, so it travels with the card but does not take part in its stacking. If the card's contents ever reflow, the icon's y needs revisiting.

---

## Renders

- `figma-export/login-fields-2026-09-17/` — the three sign-in frames and the icon on paper, four files
- `reports/Match the Tebra login fields.png` — the contact sheet: the three frames, then the two fields at 2x with the glyph beside them
