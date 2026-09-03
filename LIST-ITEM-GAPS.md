# List/Item — the two interface gaps

2026-08-20. Both closed in `YX2n4YLrEpBXNbcc73T6dw`, set `174:17`. **Two regressions were caused.
The `State` one is repaired (§6c). 28 instances on one board still need labels (§6). Read §6 first.**

---

## 0. Publish state

Neither prerequisite is published. Recorded and proceeded, as instructed — this work is in the
library and does not depend on them.

| | State |
|---|---|
| Segment `minWidth` 64 → 40 | **Not published.** Proposals file still reads `masterMinWidth: 64` |
| `Split button` `627:161` | **Not published.** `importComponentSetByKeyAsync` from the proposals file returns "key not found" |
| Action row caret bridge | Still in place, still named `[minWidth override — clear at publish]` |

---

## 1. Gap 1, enumerated before deciding

**The exemplar's override, exactly one:**

| Node | Property | Master | `1 Canonical in page` |
|---|---|---|---|
| `Text` (nested frame) | vertical padding | `6/0/6/0` | **`4/0/4/0`** |

Root padding is `8/16/8/16` in both. Nothing else differs.

**What the component produced unaided, measured at all eight combinations:**

| Show secondary | Show icon | Text | Root |
|---|---|---:|---:|
| true | true / false | 6+24+20+6 = 56 | **72** |
| false | true / false | 6+24+6 = 36 | **52** |

`Show icon` has **no** height effect at any combination. `Show secondary=false` gives 52, exactly as
filed.

## 2. Why 48 is real and 52 is not — re-derived from the artifact

`ButtonOverrides`-style theme overrides do not exist for List: `ListOverrides.ts` sets only
`disablePadding`, `ListItemOverrides.ts` only a hover colour, `ListItemButtonOverrides.ts` only focus
styling. **No padding, no margin, no height.** So the geometry is pure MUI substrate.

Re-read this session from the pinned zip
`.yarn/cache/@mui-material-npm-5.15.12-07f50ebff6-adee362d83.zip`, not from the prior report:

```js
// ListItemText.js
{ flex: '1 1 auto', minWidth: 0, marginTop: 4, marginBottom: 4 },
ownerState.primary && ownerState.secondary && { marginTop: 6, marginBottom: 6 }
// ListItemButton.js
paddingTop: 8, paddingBottom: 8      // unconditional
```

| State | Arithmetic | Height |
|---|---|---:|
| One line | 8 + 4 + 24 + 4 + 8 | **48** |
| Two lines | 8 + 6 + 24 + 20 + 6 + 8 | **72** |
| *Figma's old boolean* | 8 + **6** + 24 + **6** + 8 | **52 — no MUI path** |

**Storybook could not be used** — it bounced to GitHub auth twice. Recorded and not worked around;
the yarn zip is the better artifact anyway.

## 3. The fix chosen, and why not the other one

**A variant axis. `Lines = One | Two`, replacing the `Show secondary` boolean.**

The original filing proposed an axis and that turns out to be right, but the reasoning matters:

**A corrected default does not work.** Setting the margin to 4 globally makes the two-line case
`8 + 4 + 24 + 20 + 4 + 8 = 68` — **another height MUI has no path to.** It trades one unreachable
value for another. The 4-vs-6 is a *conditional*, and a boolean cannot carry a conditional. Same
shape as the Card `Show actions` case, resolved the same way.

`Show icon` **stays a boolean** — verified across all combinations that it changes no geometry.

**The test passes.** A fresh default instance, nothing overridden:

```
defaultVariant: Lines=One, State=Default
fresh:    h=48, textPad 4/4, secondary hidden
exemplar: h=48, textPad 4/4, secondary hidden
indistinguishable: true
```

Screenshotted side by side. Identical.

**V2:** 17-item rail, one item Selected, **zero internal overrides** — only the public `Primary` and
`Show icon` properties. Rail measures **256 × 816 = 17 × 48** exactly.

## 4. Existing instances

**No instance was ever at 52.** The census before the change: **67 at 48** — every one carrying the
identical hand-authored `4/0/4/0` override — and 9 at 72. The 52 never survived contact with a
consumer; it was routed around 67 times.

So nothing was *deliberately* 52, and nothing needed a way to stay 52.

After migration: **68 at 48, 8 at 72.** Only the two code-real heights remain. One instance moved
from the 72 group to 48 — it had been 72 while carrying `4/4` padding, arithmetic that matches
neither code height, so its previous value was itself anomalous.

## 5. Gap 2, selected

**Built: the fill only.** Bound to `color/computed (no palette)/rowSelected`, variable id
`VariableID:194:2`, **lifted off the exemplar's own binding** rather than looked up by name.

Its value is `rgba(0, 0.2824, 0.3216, 0.08)` = `alpha(#004852, 0.08)`, which is exactly MUI's
`&.Mui-selected: alpha(palette.primary.main, action.selectedOpacity)`. Tebra sets no
`selectedOpacity`, so MUI's 0.08 applies. The variable's own description already says so.

### What the captures could not settle

**Production has no selected state at all.** The catalog capture
`patient_history_rich01.png` is the History page, and in the rail **"History" renders identically to
every other item** — same weight, same colour, no background, no indicator bar. Verified directly
from the image this session.

So there was nothing to derive a **text weight change, text colour change or indicator bar** from,
and **none was added on inference**. What a Tebra selected row should do beyond the fill is
**undetermined**. This is the distinction the prompt asked to preserve: the rail has *no* selected
state, which is not the same as having a broken one.

### Remaining gap: Selected and Hover cannot co-occur

They are one axis, so there is no selected-and-hovered cell.

**In code they do co-occur.** MUI defines `&.Mui-selected:hover` as
`alpha(primary.main, selectedOpacity + hoverOpacity)` = `alpha(#004852, 0.12)`. So the value is
**derivable, not invented** — but no variable holds it. The collection has `alphaPrimary04` (0.04)
and `rowSelected` (0.08); there is no 0.12. Building it needs a new variable, which is a Tokens page
change, and the Tokens page is generated. **Recorded, not built.**

---

## 6. Regression caused, and what still needs fixing

**`clone()` drops `componentPropertyReferences` entirely.** Four of the six variants were built by
cloning and silently lost their `Icon.visible`, `Primary.characters` and `Secondary.characters`
bindings. Two consequences:

1. **`Show icon` did nothing on four variants.** Caught by screenshot, not by assertion. Repaired —
   all 12 references restored and re-verified visually.
2. **Instances that re-mapped onto clone variants lost their text overrides.** Every List/Item
   instance in the library now reads `"Primary text"` where it read `Schedule`, `Patients`, `Charts`
   and so on.

**Mitigation applied:** `Lines=One, State=Default` and `State=Hover` were re-pointed onto the
**original node ids `174:3` and `174:10`**. Since 68 of 76 instances are single-line, consuming files
will map onto original ids when this publishes and **keep their overrides**. The proposals file's
17-item control rail should therefore survive the update — unverified until publish.

### Restored

| Board | Labels |
|---|---|
| `1 Too few` | Schedule · Patients · Messages |
| `2 Canonical` | Schedule · Patients · Charts · Billing · Reports |
| `4 Selected and hover` | Schedule · Patients · Charts · Billing · Reports |

Restored from `DRAWER-EXEMPLARS.md` §3, which is a **report, not the artifact** — flagged as such.

### Still needs labels re-supplied — 28 items, not 56

> **Corrected 2026-08-20.** The earlier figure of 56 was wrong. I listed boards `3 Grouped`,
> `5 Long labels` and `6 Too many` as damaged because *I had no record to restore them from* — and
> conflated "I cannot restore this" with "this is damaged". A census of every item on the Drawer
> exemplars page shows **zero placeholder text on that page**. All six boards carry their real
> labels. Only the Drawer-in-page board was ever damaged.

| Page / board | Items | State |
|---|---:|---|
| Drawer exemplars · `1 Too few` | 3 | Schedule · Patients · Messages — **intact** |
| Drawer exemplars · `2 Canonical` | 5 | Schedule · Patients · Charts · Billing · Reports — **intact** |
| Drawer exemplars · `3 Grouped` | 9 | Calendar · Appointments · Waitlist · Patients · Charts · Prescriptions · Claims · Payments · Statements — **intact, never damaged** |
| Drawer exemplars · `4 Selected and hover` | 5 | **intact** |
| Drawer exemplars · `5 Long labels` | 5 | Claims · **Insurance eligibility and benefits** · Payments · **Remittance advice and adjustments** · Statements — **intact, and still demonstrating the wrap at 72** |
| Drawer exemplars · `6 Too many` | 14 | 14 real labels — **intact, never damaged** |
| **Drawer in page exemplars · `1 Canonical in page`** | **28** | **All reading `Primary text`. This is the only real damage.** |

The restore pass on boards 1, 2 and 4 was therefore also unnecessary — it rewrote labels that were
already correct with the same strings from the record. No harm done, but it was not a repair.

**Recovery options:** Figma version history predates this session's edits and would restore the
labels — but would also revert the component fix, so it would need to be a selective restore of the
exemplar boards only. Otherwise the 56 labels need retyping.

---

## 6b. Defect: two variants rendering black — diagnosed and repaired, 2026-08-20

Caught by visual review of the library board. **Fifth screenshot catch in this workstream.**

### Diagnosis, before any repair

| Variant | id | paint `color` | opacity | bound to |
|---|---|---|---|---|
| One/Default | `174:3` | *no fill* | — | — |
| **One/Hover** | `174:10` | **0,0,0** | **1** | `color/action/hover` — **present, resolvable** |
| One/Selected | `641:76` | 0,72,82 | 0.08 | `rowSelected` ✓ |
| Two/Default | `641:82` | *no fill* | — | — |
| Two/Hover | `641:88` | 203,221,224 | 1 | `color/action/hover` ✓ |
| **Two/Selected** | `641:70` | **0,0,0** | **1** | `rowSelected` — **present, resolvable** |

**1. What fill is applied.** Solid black, `rgb(0,0,0)` at opacity 1.

**2. Is the reference broken or absent?** **Neither.** Both black variants carry a *correct,
resolvable* variable reference — the right name and the right id. The binding metadata is intact.
What is wrong is the paint's **concrete `color` and `opacity`**, which stayed at the black seed value
the build script used as its base before calling `setBoundVariableForPaint`. On two of four calls the
returned paint never took the resolved value.

**So the fill carries a correct binding and a wrong colour at the same time.** That is why it looked
plausible to every structural check: the binding was all any assertion was reading.

**3. Is the text missing or invisible?** **Present and invisible.** On both black variants `Primary`
exists, `visible: true`, `characters: "Primary text"`, fill bound to `color/text/primary` = `0,0,0`.
Black on black. Confirmed **before** touching it, so no text change was made — and none was needed.

On Two/Selected the `Secondary` is bound to `color/text/secondary` `#545454`, which is exactly why
the reported symptom was *"secondary text faintly visible, primary text absent"*. The diagnosis
predicts the observed rendering precisely.

### The clone explanation does not hold, and was not forced

`One/Hover` is **`174:10` — an original, not a clone**. `Two/Selected` is a clone. The defect crosses
both groups, so "these are the cloned variants" does not explain it. What *is* confirmed is the
prompt's other hypothesis:

**The earlier repair was scoped to `componentPropertyReferences` only.** Fills bind through
`boundVariables` on the *paint object*, a different category entirely. A repair scoped to one could
not have touched the other, and did not. **Two separate binding categories were broken by the same
restructure; only one was repaired.**

### Repair

Both fills lifted off a correctly-rendering sibling — `Lines=One, State=Selected` for `rowSelected`,
`Lines=Two, State=Hover` for `action/hover` — rather than looked up by name.

### Sweep, every variant

Each paint compared against the resolved value of the variable it claims to be bound to:

| Variant | wanted | got | |
|---|---|---|---|
| One/Default | — | no fill | correct for Default |
| One/Hover | 203,221,224@1 | 203,221,224@1 | ✓ |
| One/Selected | 0,72,82@0.08 | 0,72,82@0.08 | ✓ |
| Two/Default | — | no fill | correct for Default |
| Two/Hover | 203,221,224@1 | 203,221,224@1 | ✓ |
| Two/Selected | 0,72,82@0.08 | 0,72,82@0.08 | ✓ |

**2 of 6 variants carried the defect** — 2 of the 4 that take a fill. Both repaired. **Zero
remaining.** Against the **12 property references** repaired in the earlier pass, this is a second,
smaller category: **2 paint bindings**, which that pass never looked at.

### Verified

Full board screenshotted: all six render their correct fill with all text visible. A fresh default
instance and a fresh selected instance placed side by side — 48 each, no fill and `0,72,82@0.08`
respectively, text visible, **neither requiring any override**.

### Why my own checks missed it

After the swap that introduced this, I verified three times — a 12-combination screenshot, a repeat
after the property repair, and the 17-item rail — **all of them screenshots of instances, never of
the master board.** The instances rendered the resolved binding and looked correct; the masters
rendered the raw paint and were black.

The mechanism is inferred from that pattern rather than proven, but the process failure is not: **a
master-level change was verified only through instances.** After editing variant masters, screenshot
the set.

---

## 6c. Second regression: `State` — found, and REPAIRED 2026-08-20

Found while checking the Long labels board. **I caused this and did not report it earlier because I
never censused `State` — only `Lines` and height.**

Census of the Drawer exemplars page:

| Board | Items | States |
|---|---:|---|
| `1 Too few` | 3 | **Selected ×3** |
| `2 Canonical` | 5 | **Selected ×5** |
| `3 Grouped` | 9 | **Selected ×9** |
| `4 Selected and hover` | 5 | Selected ×4, Default ×1 |
| `5 Long labels` | 5 | **Selected ×5** |
| `6 Too many` | 14 | **Selected ×14** |

**Every item on five of six boards renders as selected.** Board 4, whose entire subject is *one*
selected item and *one* hovered, has four selected and one default — the opposite of what it
documents.

**Cause.** The migration only ever set `Lines`. When `setProperties({Lines: …})` runs, Figma resolves
the target variant from the new value plus the instance's *current* other variant properties — and at
the moment those calls ran, the set was mid-rename with temporary names. `State` did not survive the
resolution and the instances landed on whichever variant matched first.

### Repaired — 41 items across all six boards

Boards 1, 2, 3, 5 and 6 set to `Default` on every item. Board 4 set to its record —
*"Patients selected, Charts hovered."* **No text was changed.**

**Both axes were set explicitly on every call.** Setting `Lines` alone is what lost `State` in the
first place, so each item's current `Lines` was read and passed back alongside the new `State`,
pinning the exact variant rather than letting Figma resolve one.

Verified **per item**, reading the resolved variant name back — not by censusing `Lines` and height,
which is precisely what let this through:

| Board | Items | Result |
|---|---:|---|
| `1 Too few` | 3 | all `Lines=One, State=Default`, 48 |
| `2 Canonical` | 5 | all `Lines=One, State=Default`, 48 |
| `3 Grouped` | 9 | all `Lines=One, State=Default`, 48 |
| `4 Selected and hover` | 5 | Schedule Default · **Patients Selected** · **Charts Hover** · Billing Default · Reports Default |
| `5 Long labels` | 5 | all `Default`; **wrap intact** — 2 items at 72, 3 at 48, labels untouched |
| `6 Too many` | 14 | all `Lines=One, State=Default`; 14 × 48 = 672 exactly |

All six screenshotted after. Board 4 now reads correctly: one pale selected row, one teal-grey
hovered row, three plain.

**Noted, not changed:** board 4's `Charts` is `Lines=Two` and carries the default string
`"Secondary text"` — the only placeholder text remaining on this page. It is why that row is 72. A
two-line item on a board about states is odd, but changing it is a text change and was out of
scope.

---

## 6d. Two method failures, recorded

**1. The 56-item figure was wrong. The real number was 28, on one board.**

I reported that 56 items needed labels re-supplied: 9 + 5 + 14 from the Drawer exemplars page plus 28
from Drawer-in-page. **The Drawer exemplars page was never damaged at all.** All six of its boards
carried their real labels throughout.

The error was in the inference, not the arithmetic: **I had no record to restore boards 3, 5 and 6
from, and treated that absence as evidence they were damaged.** A missing restore record says
something about the record, not about the artifact. One census of the boards themselves would have
shown all labels intact — the same census I ran later, which took one call.

**2. The restore pass on boards 1, 2 and 4 was not a repair.**

Those boards were already correct. The pass rewrote `Schedule · Patients · Messages` and
`Schedule · Patients · Charts · Billing · Reports` with the identical strings from
`DRAWER-EXEMPLARS.md`. No harm done and nothing changed, but it should not be read as a repair, and
it created a false impression that damage had been found and fixed there.

**3. Censusing the wrong properties is what let the `State` regression through.**

After the migration I censused `Lines` and height, confirmed 68 at 48 and 8 at 72, and called it
clean. `State` was never read. The heights were right and the states were wrong on 45 of 76
instances, and no height check could ever have caught it. **A census only covers what it reads.**

---

## 7. The pattern, now three occurrences

Three separate components could not express their own correct value through their public interface,
so every consumer hand-authored around it:

| # | Component | The value it could not express | How consumers coped |
|---|---|---|---|
| 1 | `Button group / Segment` | grouped `min-width` 40, not the standalone 64 | The action row's caret sat 24px too wide until measured |
| 2 | `List / Item` | canonical row height 48 | **67 of 76 instances** carried the identical `4/0/4/0` override |
| 3 | `List / Item` | selected state | Consumers authored a fill by hand; one exemplar layer is literally named **"Selected, authored for this board"** |

**The tell is repetition.** When the same override appears on 67 instances, it is not 67 decisions —
it is one missing property. That is a cheap thing to scan for and worth doing across the rest of the
library before the page builds start.

**Five screenshot catches now, and they run in both directions.** Structural assertions passed at
every step and still missed: the broken `Show icon`, the lost text, and two variants rendering solid
black while carrying a correct variable binding. In the opposite direction, one of my own assertions
reported a `Show icon` failure that the screenshot disproved. **Assertions have now produced both
false negatives and a false positive in this one component.** Pixels over property readbacks.

The black-fill case is the sharpest: the binding was correct and the colour was wrong *at the same
time*, so every check that read the binding passed. Only a rendered pixel disagreed.

## 8. The original filing is superseded

Gap 1 was filed as *"the boolean does not adjust margin, the fix is a variant axis."* That is true
but understates it in two ways, and the understated version should not be read again:

1. **Reaching 48 needed a second, nested override** — the `Text` padding — not just a different
   boolean value. The component could not reach its canonical height by any combination of its public
   properties.
2. **A corrected default was a live alternative and is wrong**, for a reason the original filing does
   not contain: it produces 68, which MUI cannot reach either.
