# Split drop button — P1.a branch resolution

2026-08-20. **Nothing built. Part 2 not started.** The branch does not resolve to A, B or C as
written, and the defect that motivates the whole prompt does not reproduce.

---

## 1. `Split Drop Buttons` is not in `YX2n4YLrEpBXNbcc73T6dw`

All **15 pages** of the Design System Rebuild file were loaded and searched for `split`, `drop
button` and `dropdown`. Pages: Cover, Tokens, Actions, Inputs, Data display, Feedback, Surfaces &
navigation, Icons & illustrations, Reference, Table exemplars, DataGrid exemplars, Page template
exemplars, Drawer exemplars, Drawer in page exemplars, Action row exemplars.

**Zero matches.** The only hits anywhere were `Nav/Dropdown` (a nav submenu component) and two
unrelated text nodes on the Reference page.

There is no board, no component, no exemplar and no artwork by that name in the library the prompt
names.

## 2. What does exist, and where

| | |
|---|---|
| Name | **`Drop Button`** |
| Type | **`COMPONENT_SET`**, 64 variants, 888 × 1568 |
| Node | `12459:164859`, page `Components`, inside `Group 1028` |
| File | **`ZPf0sJy83aPyrHjCVHomya` — `Tebra Working UI Kit`** |
| Publish key | `bda68b96436a9ceca3461e4bbef7ae9d727cd2ba`, updated 2025-10-29 |
| Published? | **Yes** |
| Importable into `zKT34LQogNjz3Z07fY4VQB`? | **Yes — verified by import, id `51:1707`, `remote: true`** |

`Tebra Working UI Kit` is the **legacy library the rebuild supersedes**. It is the file
`design-system-schema.json` rule 7 `fileIdentityFirst` exists to stop sessions reading by mistake:
*"Added 2026-08-03 after a session read the legacy team library (ZPf0sJy83aPyrHjCVHomya, 'Tebra
Working UI Kit') and produced a full reorganisation analysis against the wrong file."*

It is **not subscribed** to the proposals file — `get_libraries` returns it under
`libraries_available_to_add`, not `libraries_added_to_file`.

### Branch verdict

**Closest to C, but C as written does not describe it.** C says *"A component set exists and is
importable, and the row's builder did not find it."* A set exists and is importable — but from a
**different library**, one the project has deliberately superseded and which the row's builder was
correct not to search. Calling that a discovery failure would be wrong; searching only the rebuild
library is what the precedence rules require.

**Not A** — nothing exists-but-unreachable here, so this is **not** a second instance of the
`Icon/PrintOutlined` pattern. That pattern stands on its own: `Icon/PrintOutlined` at `575:26` in the
rebuild library exists and cannot be imported, and **71 of 76 icon masters are unreachable from
consuming files**. One occurrence, not two.

**Not B** — it is not artwork. It is a real component set.

---

## 3. The defect does not reproduce

The prompt: *"It stretches wrong: the caret segment absorbs the row's free space and the label
segment stays fixed."*

Measured on the built row, master and placed instance:

| | Master @ 900 | Placed instance @ 1184 |
|---|---:|---:|
| `New Note` total | **174** | **174** |
| `New Note / label` | **110** | **110** |
| `New Note / caret` | **64** | **64** |

**Identical at both widths. Nothing stretches.** Every node in the row is `layoutSizingHorizontal:
HUG` with `layoutGrow: 0`. The row is `SPACE_BETWEEN`, so free space is distributed *between* the
Actions cluster and More — it never enters a control. The 1010px of extra width at 1184 lands in the
gap, which is why `More` sits at x = 1089 and the Actions cluster stays 565.

## 4. And the caret's width is correct, not hand-authored

The caret half is 64 wide. That looked like the smoking gun and is not.

```
New Note / caret   minWidth: 64   padding 5/11   gap 8
  Label  ""        w 0      (empty, collapses)
  Icon/DownCaret   w 16
  content = 11 + 0 + 8 + 16 + 11 = 46  ->  minWidth 64 governs
```

`minWidth: 64` is carried by the **`Button group / Segment` master itself** (`68` wide at
Secondary·Small, `minWidth: 64`), which carries it from the Tebra theme's `size/button/minWidth`,
which carries it from MUI's `min-width: 64px` on every Button. Production's real caret button is a
`<Button size="small">` with a single icon child and gets the same 64px floor in the browser.

**So the 64 is production's geometry, faithfully inherited — not geometry standing in for a
component.** The only thing that is genuinely hand-composed is the *pairing* of two `Segment`
instances in an auto-layout row, and that is exactly what the Segment component is designed for. Its
own description: *"a Position axis (First / Middle / Last) on a segment, composed inside an
auto-layout row — chosen because MUI itself composes positionally … and because designers need to
add and remove segments freely."*

---

## 5. What the prompt did see, precisely

The description maps onto `Drop Button` exactly — so the observation is real, just in the other file
and of a different mechanism.

| Variant | Total | Label segment | Caret segment |
|---|---:|---|---|
| `Type=Primary, Size=Large, State=Default, Full Width=No` | 110 | 68, `HUG`, grow 0 | **42, `FIXED`** |
| `Type=Primary, Size=Large, State=Default, Full Width=Yes` | 240 | **198, `FILL`, grow 1** | **42, `FIXED`** |

Label grows 68 → 198; caret holds at 42. That is the behaviour described, and it is correctly
authored — at Large.

**The two widths are a `Full Width` variant axis, not one component being stretched.** The pair the
prompt says to derive stretch behaviour from is two different variants.

### The size question, answered from the artifact

The prompt asks whether the second size block is a size axis or a density axis. **Neither, cleanly.**
The set declares `Size = [Large, Medium, Small]` but the 64 variants are not evenly distributed:

| Size | Variants | Has `Full Width=Yes`? | Caret segment sizing |
|---|---:|---|---|
| **Large** | **32** | Yes | `FIXED` |
| **Medium** | **16** | **No** | **`HUG`** |
| **Small** | **16** | **No** | `FIXED` |

Two defects in the legacy component, recorded not fixed:

- **`Full Width=Yes` exists only at Large.** Medium and Small have no fill-capable variant at all, so
  the very behaviour this prompt wants is unavailable at the two smaller sizes.
- **At Medium the caret segment is `HUG`, not `FIXED`** — inconsistent with Large and Small. Medium's
  frame is also 40 tall over 36-tall children, a 4px misfit.

Also: radii are asymmetric — label cap `24/0/0/24`, caret cap `0/8/8/0`. A pill on the left end and
an 8px radius on the right. Recorded, not judged.

---

## 6. Why Part 2 did not start

Part 2 rebuilds the row against the real component. Three things block that, and none is mine to
decide:

1. **The stated reason for the rebuild is not present.** The row does not stretch wrong. Rebuilding a
   verified-correct control to fix a defect it does not have would replace working geometry with
   legacy geometry for no measured gain.
2. **`Drop Button` is from the superseded library.** Using it puts a `Tebra Working UI Kit` component
   inside a proposal whose own record states it *"consumes the certified kit as a published library
   and joins nothing to it."* That is a precedence decision, not a build detail.
3. **The geometry does not fit.** The row's New Note is Small/30 today, matching production's
   `size="small"`. `Drop Button` is 28 / 40 / 42. Adopting it changes the tallest-control
   calculation and therefore the row height, which the prompt correctly says must be re-derived
   rather than adjusted — but re-deriving against a legacy component is a different decision from
   re-deriving against a corrected one.

**Nothing was changed.** The row, the component `45:537` and the instance `46:196` are exactly as
built and verified.

---

## 7. Options

| | Option | Consequence |
|---|---|---|
| **1** | **Leave the row as built.** | No stretch defect exists. Costs nothing. `New Note` stays two `Segment` instances, which is the composition the Segment component is designed for |
| **2** | **Build a `Split button` component in the rebuild library** wrapping two `Segment` instances with caret `FIXED` and label `FILL`, so a fill-capable split exists at every size | Real gain: the rebuild library gains a composite it lacks, and the row gets a single instance instead of a hand-composed pair. This is P1.b as written, just against the correct library and without the false premise |
| **3** | **Adopt the legacy `Drop Button`.** | Fastest, but imports a superseded library into the proposal, brings 28/40/42 geometry, loses the coral Contained·Secondary treatment production uses, and inherits the two defects in §5 |

**Recommendation: option 2**, if the goal is a real split-button component. It is the only one that
leaves the rebuild library better and does not require adopting the legacy kit. Option 1 if the goal
was only to fix the stretch, because there is nothing to fix.

Not chosen here — the prompt's Part 1 branch instructions do not cover this case.
