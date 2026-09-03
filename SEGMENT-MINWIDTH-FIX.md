# Segment minimum width — Part 1

2026-08-20. **The library change is made and verified. The action row cannot show it yet, and that is
a blocker Part 2 shares.** Part 2 not started, per the prompt's sequencing rule.

---

## What changed

`Button group / Segment` (`160:996`) in `YX2n4YLrEpBXNbcc73T6dw`: **all 54 variants moved from
`minWidth: 64` to `minWidth: 40`.**

## Enumeration before editing, as instructed

Every node in the rebuild library carrying a minimum width — **153 across six component pages**:

| minWidth | Count | What |
|---:|---:|---|
| **64** | **141** | 54 `Button` masters, 54 `Button group / Segment` masters, 33 instances of those |
| 90 | 7 | `Tabs / Tab` masters and instances |
| 240 | 2 | `Nav / Dropdown` |
| 40 | 2 | `Icon` inside Badge |
| 20 | 1 | `Badge` |

Of the 141 at 64, exactly **two are master sets**:

| Set | Variants | Context | Verdict |
|---|---:|---|---|
| **`Button`** `79:2` | 54 | **standalone** — a `<Button>` not inside a `<ButtonGroup>` | **64 is correct. Not touched.** |
| **`Button group / Segment`** `160:996` | 54 | **grouped child** — every variant is a `ButtonGroup` member by definition, that is what the set is for | **Wrong. Changed to 40.** |

Everything else at 64 is an **instance** inheriting from one of those two. **No master was ambiguous
about its context**, so nothing was left on that ground.

Verified after the edit:

```
segmentMinWidths:              [40]     (54 variants)
buttonSetMinWidths_untouched:  [64]     (54 variants)
```

---

## Which instances changed

**In the library: none.** All 14 Segment instances live on the Reference page in `Assembled examples
— compose segments in an auto-layout row`, at widths 76 / 79 / 96 / 99 / 104 / 107 — every one
content-governed and already above 64. Their widths are byte-identical before and after.

**The change is latent.** It only bites where a segment's content falls under 64, which in the whole
library is nowhere. The one place it bites is the action row's caret half.

## The corrected geometry, measured

The proposals file could not show it (see below), so the pair was rebuilt against the corrected
master **inside the library**, measured, screenshotted, and removed:

| | Before | After | Governed by |
|---|---:|---:|---|
| Label half | 110 | **110** | content — unchanged |
| **Caret half** | **64** | **46** — *later corrected to 40* | content 46 — **but that content was wrong** |
| New Note total | 174 | **156** — *later corrected to 150* | |
| Height | 30 | **30** | unchanged |

The caret half narrows by **18px**, and the control by 18px.

### This contradicts the prompt's own expectation

| Source | Caret half | New Note total |
|---|---:|---:|
| **Part 1 of the prompt** | 40 | 150 |
| **Part 2 of the prompt** — *"Its content measures 46, so content governs and 40 is a floor it does not reach"* | 46 | 156 |
| **Measured** | **46** | **156** |

**Part 2 is right and Part 1 is wrong** — *on the evidence available at the time.* The caret's content
was measured as `11 + 0 + 8 + 16 + 11 = 46`, so 46 > 40 and the floor never engaged.

> **Both were wrong, and Part 1's number turned out right for the wrong reason.** The `8` in that sum
> is a spurious gap — the caret was modelled in the End icon slot beside an empty Label, where source
> has it as the Button's only child. With the gap removed the content is `11 + 16 + 11 = 38`, the 40
> floor **does** engage, and the caret is **40** with the control at **150**. See
> `SPLIT-BUTTON-BUILD.md` §3b, found by visual review of the built component.

---

## The blocker

**The action row still measures 174. The change has not propagated and cannot be made to from here.**

Measured in `zKT34LQogNjz3Z07fY4VQB` after the edit:

```
newNoteTotal: 174     caret: w 64, minWidth 64
masterMinWidth: 64    masterRemote: true    propagated: false
```

The proposals file consumes `Design System Rebuild` as a **published library**. It holds the master at
its last-published state. The edit is in the library file's working state and is **unpublished**.

**Publishing a library is not available in the Plugin API.** It is a manual step in the Figma UI —
the same class of limitation `PROPOSAL-PATIENT-HEADER-V1.md` PH-10 already recorded for *enabling* a
library: *"Enabling a library remains impossible from the Plugin API and is a manual step."*

So Part 1's stated verification — screenshot the action row before and after, caret visibly narrows —
**cannot be completed from this session.** Two manual steps stand between the edit and the row:

1. **Publish** `Design System Rebuild`.
2. **Accept the update** in `zKT34LQogNjz3Z07fY4VQB`.

**No instance override was applied to fake it** — *at the time this was written.* Overriding `minWidth`
on the row's caret instance would produce the right screenshot and then permanently mask the master
value. That was declined here.

> **Superseded by the Addendum below.** On a later instruction the override WAS applied, as an
> explicitly temporary bridge with the layer renamed to carry its own removal instruction. The
> objection above still stands and is why it is marked for clearing at publish rather than left
> silent.

### Part 2 shares this blocker

Part 2 builds the split button **in the library file**. A new library component is subject to the
same publish step, so its final verification — *"swap the action row's hand-authored New Note for an
instance and screenshot the row alone and on the control screen"* — is blocked in exactly the same
way. Building it will work; instancing it in the proposals file will not, until publish.

---

## Height re-derived, not preserved

The prompt asked for a re-derivation rather than an assumption. Done:

**Row height stays 56 = 36 + 10 + 10.**

The tallest control in the row is still `Button Text Medium` at **36** — Print and More, which
production leaves unsized. New Note is 30 tall and remains 30; only its *width* changed. The 10 + 10
is still the header band's vertical padding. **Nothing in a width change reaches the height
derivation**, and the derivation was re-run rather than assumed.

---

## Correction to the record

`SPLIT-DROP-BUTTON-P1A.md` stated that production's caret button gets the same 64px floor in the
browser. **It does not** — `.MuiButtonGroup-grouped { min-width: 40px }` overrides it, measured live
across 12 groups in `SPLIT-BUTTON-DISCOVERY.md` D.c. That correction is what this change implements.
P1.a's other findings — that the row does not stretch, that caret and label are identical at 900 and
1184 — still hold and were re-measured here.

---

## Addendum, 2026-08-20 — the row was corrected without the publish

Asked to update the proposals file with the new design. **The component swap is still impossible; the
geometry correction was applied instead.**

### What is still blocked

`importComponentSetByKeyAsync('ba25a86eb8085c8a678c3736e90af75ecf466fba')` from
`zKT34LQogNjz3Z07fY4VQB` returns **"Component set with key … not found"**. `Split button` has a local
key but has never been published, so no other file can resolve it. The Segment correction has not
propagated either — the row's segments still report `masterMinWidth: 64`.

**So the row still holds two hand-composed `Segment` instances, not a `Split button` instance.**

### What was applied, and the two are not the same kind of change

| | Change | Kind |
|---|---|---|
| 1 | `itemSpacing: 8 → 0` on the caret instance | **Permanent correction.** The 8px gap was a modelling error made in the row — the caret was put in the End icon slot beside an empty Label. Source has the caret as the Button's only child. This is fixing my own mistake and is right regardless of publish state |
| 2 | `minWidth: 40` on the caret instance | **Temporary bridge.** The master still reads the stale 64 in this file. The override asserts the value the master already has in the library. The layer is renamed `New Note / caret  [minWidth override — clear at publish]` so it is findable |

**Change 2 must be cleared at publish.** Left in place it masks the master permanently, which is the
`List/Item` failure. The layer name carries the instruction. Change 1 stays.

Alone, change 1 would have moved nothing visible: content drops to 38, but the stale 64 floor still
governs. Both were needed to show true geometry today.

### Result

| | Before | After |
|---|---:|---:|
| Caret half | 64 | **40** |
| Caret content | 46 | **38** |
| New Note total | 174 | **150** |
| Actions cluster | 565 | **541** |
| Row | 900 × 56 | **900 × 56** |
| `More` x | 805 | **805** |

The 24px released goes into the row's `SPACE_BETWEEN` gap, so `More` does not move.

**Control screen re-verified:** header 72 + row 56 + page content 768 = **896**, row at `x = 0`,
`w = 1184`, edges matching the header exactly.

**Height re-derived rather than assumed:** tallest control **36** (`Print` and `More`, Text Medium)
+ 10 + 10 = **56**, which agrees with what is authored. A width change does not reach the height
derivation, and the derivation was re-run to confirm rather than asserted.

Both screenshots taken — the row alone and the full control screen.

### Still outstanding at publish

1. Publish `Design System Rebuild`, accept in `zKT34LQogNjz3Z07fY4VQB`.
2. **Clear the `minWidth` override** on the caret instance and restore the layer name.
3. Replace the two hand-composed `Segment` instances with one `Split button` instance.

Step 3 is the one that makes the row stop hand-authoring a composite. Steps 1 and 2 only make the
numbers honest.

---

## State

| | |
|---|---|
| `Button group / Segment` `160:996` | **54 variants at `minWidth: 40`** |
| `Button` `79:2` | **untouched, 54 variants at `minWidth: 64`** |
| Library Segment instances | 14, **none changed width** |
| Action row `45:537` / `46:196` | **unchanged at 174 — awaiting publish** |
| Probe node | created, measured, screenshotted, **removed** |
| Kit | not re-exported |
| Library | **not published — manual step required** |
