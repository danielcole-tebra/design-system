# Drawer exemplars

A six rung ladder showing a navigation drawer at increasing content load. The subject is **limits,
not appearance**: how many destinations belong in a drawer, and what to do when there are too many.

**Status: BUILT 2026-08-17** on page `Drawer exemplars` (497:2). 163 nodes, 75 paints, 47 instances,
0 detached, 0 fractional dimensions, 0 unbound paints, 0 components created.

**This set is a proposal, not documentation.** The library has no drawer used this way. Every drawer
on the board is assembled from `List/Item` and `Divider` instances; there is no drawer component and
this board does not add one. The board carries that statement as its first element so nobody reads
the fourteen item rung as a rule that already exists.

Third in the exemplar series, after `Table exemplars` (446:2) and `Page template exemplars` (489:2),
and built to the same board conventions.

---

## 1. Board conventions

Inherited from `Table exemplars` and unchanged:

    Page > root FRAME, VERTICAL, itemSpacing 40 (space/40), padding 64
      "N Title", HORIZONTAL, itemSpacing 40 (space/40), top aligned
        "N Title example"    — the artefact
        "N Title (caption)"  — 400 wide, VERTICAL, itemSpacing 16 (space/16)

Caption metrics read off the table set: title Akkurat LL Bold 20/32 in `color/primary/main`; each
field a VERTICAL frame at gap 4 holding a Bold 12/16 label in `color/text/primary` and a Regular
14/20 body in `color/text/secondary`.

**No card and no ground.** The root frame and every example frame carry `fills = []`. Nothing sits
behind a drawer, so each example copies cleanly on its own. This is a deliberate departure from
`Table exemplars`, whose root frame has a fill, and from `Page template exemplars`, whose root binds
`background/paper`.

**Naming.** Called a drawer everywhere, matching MUI's own name for the mechanism and what the team
will search for. A scan of every text node and every node name on the page returns **zero** matches
for "rail" or "side rail".

---

## 2. Locked values, as built

| Value | Setting | Where it came from |
|---|---|---|
| Width | **256** | Matches `Page template exemplars` and the design agent's R1. The library `Drawer` is 320 and documented only as `variant="persistent" anchor="right"`, a different mechanism; noted in one caption line and otherwise left alone |
| Anchor / behaviour | left, permanent | No temporary or modal behaviour anywhere in this set |
| Drawer ground | `color/background/paper` | Bound |
| Trailing edge | `Divider` instance, `Orientation=Vertical`, 1 wide, inside the 256 | Matches the page template build |
| Drawer body | **255** | 256 minus the 1px rule |
| Item pitch | **48** | MUI's single-line pitch, confirmed against source. Reached by overriding the item's text-frame padding to 4/4, which is what MUI itself does when there is no secondary line. See finding 29 |
| Item inset | 16 | The component's own horizontal padding. Items run full bleed so a selected ground reaches both edges |
| Text column | 223 | 255 minus 2 × 16 |

---

## 3. The ladder

| # | Rung | Contents | Drawer size |
|---|---|---|---|
| 1 | Too few | Schedule · Patients · Messages | 256 × 144 |
| 2 | Canonical | Schedule · **Patients** · Charts · Billing · Reports | 256 × 240 |
| 3 | Grouped | 9 destinations under Scheduling / Clinical / Billing | 256 × 528 |
| 4 | Selected and hover | 5 destinations, Patients selected, Charts hovered | 256 × 240 |
| 5 | Long labels | 5 destinations, 2 of them wrap | 256 × 288 |
| 6 | Too many | 14 flat destinations | 256 × 672 |

**Rung 3's grouping is by relatedness, not alphabet.** Scheduling, clinical work and billing are
three different jobs, and a user arrives already knowing which one they are there to do. The caption
says so, and says that the three to seven range then applies *inside* each group rather than across
the whole drawer.

**Rung 5 wraps, and that is the real behaviour.** `List/Item`'s primary text has
`textTruncation: DISABLED` and `textAutoResize: HEIGHT`, so a label longer than 223 wraps to a
second line and the item grows to **72**. Two of the five do. The caption names the cost plainly:
the even beat of the list breaks wherever a long name falls. Nothing was widened to avoid it.

**Rung 6 omits its Use when field.** There is no case for fourteen flat destinations, so the field is
omitted rather than filled with a denial. Its `Not this when` reads "Always", and its `Source` gives
the two ways out: group them and check each group lands back inside three to seven, or accept the
section is too large for a drawer and give the overflow its own page.

**Captions** are four fields in order — Shows, Use when, Not this when, Source — in plain designer
language, sentence case, no em dashes, no prop or class names, no derivations. Material backs the
counts where it applies: three to seven destinations, group related destinations, most frequent at
the top.

---

## 4. Findings, and where they are filed

**These are not web-app-v2 bug list items, and the distinction is the point.** The bug list tracks
defects in the *code* (`webAppV2BugListItem` 4 and 5 are the two logged so far). All three findings
below are defects in the *Figma library*, where the code is right and the artefact disagrees with it.
Their home is `REFERENCE-KIT.md` "Findings and dispositions", which runs to 28, so these are **29, 30
and 31**. Filing a Figma defect on the code bug list would send someone to change working code.

**29 is closed.** It was resolved by reading `@mui/material` 5.15.12 in the pinned checkout, and the
answer was not either of the two candidates originally offered. 30 and 31 remain open.

### 29. `List/Item` renders 52 when the secondary line is switched off, a height MUI never produces. CLOSED 2026-08-17.

**Neither candidate was right. Both numbers are correct, for different states, and the defect is that
Figma cannot express the condition that switches between them.**

Read from `@mui/material` 5.15.12 in the pinned checkout, `.yarn/cache`,
`@mui-material-npm-5.15.12-07f50ebff6-adee362d83.zip`,
`node_modules/@mui/material/ListItemText/ListItemText.js` lines 47–56:

```js
})(({ ownerState }) => _extends({
  flex: '1 1 auto',
  minWidth: 0,
  marginTop: 4,
  marginBottom: 4
}, ownerState.primary && ownerState.secondary && {
  marginTop: 6,
  marginBottom: 6
}, ownerState.inset && {
  paddingLeft: 56
}));
```

And from `ListItemButton/ListItemButton.js`: `paddingTop: 8, paddingBottom: 8` unconditional (lines
59–60), `paddingLeft: 16, paddingRight: 16` unless `disableGutters` (lines 96–98), and 4/4 only under
`dense` (lines 99–101).

**So the margin is 4 normally and 6 only when a secondary line is present.** That gives exactly two
heights:

| State | Arithmetic | Height |
|---|---|---|
| Single line, primary only | 8 + 4 + 24 + 4 + 8 | **48** |
| Two lines, primary and secondary | 8 + 6 + 24 + 20 + 6 + 8 | **72** |

**Both sides of the finding were right about their own state.** `LAYOUT.md`'s 48 is the correct
single-line pitch. The Figma component's 6/6 is the correct two-line margin, and the component is
authored in its two-line form at 72, which matches MUI exactly. Neither is a transcription error.

**The defect is the `Show secondary` boolean.** In MUI, hiding the secondary line also changes the
margin, because both are driven by the same `ownerState`. In Figma a BOOLEAN component property
controls `visible` and nothing else, so switching `Show secondary` off hides the text and leaves the
padding at 6/6. The result is 8 + 6 + 24 + 6 + 8 = **52** — a height MUI cannot produce in any state.
It is not a rounding difference or a stale value. It is a state the code has no path to.

- **Severity**: `cosmetic` per item, **structural in aggregate**, and worse than it first looked
  because it is silent. Nothing in the file marks the single-line form as wrong, and a twelve item
  sub-nav built that way is 48 out, a whole item of height.
- **Disposition**: **component defect, confirmed against source.** Not a values question and no
  longer needs a ruling on which number is right.
- **The fix, and its constraint.** The condition cannot be carried by a boolean, because Figma
  booleans only toggle visibility. It has to become a **variant axis**: `Lines = One | Two` crossed
  with the existing `State = Default | Hover`, giving 4 variants, each carrying its own text-frame
  padding — 4/4 on the One variants, 6/6 on the Two variants. `Show secondary` then retires, since
  the axis replaces it.
- **Blast radius**: the set gains an axis and re-exports, so `List/Item.png` and `List.png` change and
  the **reference kit loses certification** until a drift check re-runs. Still filed rather than
  fixed, but now with a known fix rather than an open question.
- **Related**: `Menu/Item` and `Table/Cell` were not checked for the same shape of defect. Any Figma
  boolean standing in for a code conditional that changes geometry, rather than only visibility, will
  fail the same way. Worth one sweep.

**What this means for the board.** The override on every item sets the text frame to 4/4 when the
secondary line is off, which is **exactly what MUI does in that state**. The board was already
building the correct single-line item; what looked like a workaround turns out to be the right
geometry. No rebuild is needed and nothing on the board changes. The residual cost is unchanged and
now precisely stated: a designer who drags a fresh `List/Item` in and switches the secondary line off
gets 52, and will keep getting 52 until the axis lands.

### 30. The library has no list subhead. Open, low priority.

Rung 3 needs subheads and there is no component for one: the *Data display* page holds `List` and
`List/Item` and nothing else list-shaped. The subheads are authored frames, 255 × 32, Bold 12/16 in
`color/text/secondary`, `space/16` horizontal and `space/8` vertical padding.

MUI's `ListSubheader` exists in the substrate; §3.20 notes it surfaces as the Autocomplete group label
at `fontWeightMedium` 500, built at Regular because Akkurat LL has no Medium face. Whether a drawer
subhead should be that component or something else is a design question. Worth deciding only if
grouped drawers ship.

### 31. `List/Item` has no selected state. Open, and already has a ruling waiting on it.

Known from the page template work, restated because rung 4 is where it becomes visible. The set ships
`State = Default | Hover` and nothing else. The facesheet recipe's R2a already ruled that a sub-nav
must show the current item, so the gap has a decision attached and no component to carry it.

Rung 4 authors the state as an instance-level fill override bound to
`color/computed (no palette)/rowSelected` (`#004852` at 8%), the same value the tables already use for
a selected row. **It introduces no new colour, creates no component and does not touch the library.**
Verified after the build: `List/Item` still reports `State = Default | Hover`, 2 variants, default
variant fills 0, `Text` padding 6/6, height 72.

---

## 5. Build decisions not specified in the brief

Both are reversible and both are recorded because a reader would otherwise take them as given.

1. **Icons are off.** `List/Item` has an icon slot whose default glyph is a caret, which is wrong for
   a destination. Mapping fourteen clinical destinations onto the 41 shipped glyphs would need icons
   the set may not contain — D-33 already records three the facesheet needs and does not have. Text
   only also matches the facesheet's own text-link sub-nav. One boolean per item reverses it.
2. **Drawers hug their content rather than running a full page height.** A permanent drawer runs the
   height of the page, but the page height is exactly the unsourced number `Page template exemplars`
   is already marked about. Hugging keeps this set about counts and avoids inventing a viewport
   height a second time.

---

## 6. Verification

Run on the built nodes 2026-08-17, not on a script.

| Check | Result |
|---|---|
| Nodes / paints | 163 / 75 |
| **Fractional dimensions** | **0** |
| **Unbound paints** | **0** |
| Instances / detached | 47 / **0** |
| **Components created** | **0** — the page holds no `COMPONENT` or `COMPONENT_SET` |
| Item heights, rungs 1–4 and 6 | 48 throughout |
| Item heights, rung 5 | 48 · 72 · 48 · 72 · 48 |
| Drawer bodies | 255 wide, all six |
| Em dashes in any text node | **0** |
| "rail" in any text node or node name | **0** |
| `List/Item` after the build | `State = Default \| Hover`, 2 variants, default fills 0, `Text` padding 6/6, height 72 — unchanged |
| Reference kit | **103 files**, 55 PNG / 48 SVG, 0 modified, no exports |

47 instances = 41 items + 6 dividers.

**Read by eye as well as counted.** The screenshot confirms what no count covers: the selected and
hover grounds are distinguishable from each other and from default, the subheads read as subheads
rather than as items, the wrap in rung 5 is visibly a wrap and not a clip, and the trailing rule sits
on the drawer edge in all six.

---

## 7. Disagreements, reported not resolved

1. **The 52 against 48. Closed, not outstanding.** Read from source the same day it was raised.
   Both numbers were correct for their own state and the defect turned out to be the `Show secondary`
   boolean, which cannot carry MUI's conditional margin. Finding 29 has the detail and the fix. The
   one thing it leaves open is the sweep: no other component was checked for a Figma boolean standing
   in for a code conditional that changes geometry.
2. **256 against the library `Drawer`'s 320.** Already known, noted in one caption line, nothing new
   turned up. The 320 node is `variant="persistent" anchor="right"` and is a different mechanism.
3. **The board carries no ground where its two siblings do.** `Table exemplars` has an unbound fill
   on its root (itself a defect, reported in `PAGE-TEMPLATES.md` §7 and still unfixed);
   `Page template exemplars` binds `background/paper`; this board is transparent by instruction so
   examples copy cleanly. Three boards, three treatments. Worth one decision if the exemplar series
   continues.
