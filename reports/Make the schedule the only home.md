# Make the schedule the only home

2026-09-17 · File `TP5KrQtY0T5IcMNqi375So` · `figma.skipInvisibleInstanceChildren = false` on every read

> **STOPPED AT THE VERSION GATE. Nothing in Figma was changed.** The brief says a named version has been saved by hand and to stop and ask if LOG.md does not say so. **It does not.** Step 1's inventory was run anyway — it is read-only — and it is complete and clean. Steps 2 to 5 are not started.

---

## The gate

The only version recorded anywhere in LOG.md is **"Before tidy, 2026-09-17"**, and it belongs to the *Tidy the Account screens page* batch:

- `LOG.md:3552` — "**Daniel to save "Before tidy, 2026-09-17" by hand.**"
- `LOG.md:3580` — "Daniel saved **"Before tidy, 2026-09-17"** by hand and the batch continued from there."

**A whole batch has landed since.** `Archive the dead frames and tidy Components` (`9602cf9`) moved 15 nodes between pages, cut six reactions and relaid two pages. So the newest checkpoint is two batches old, and it predates a state this batch would build on.

That matters more here than it did last time. This batch archives **five frames and two entire pages**, rewires **ten reactions**, removes **fourteen more**, and drops a starting point. It is the most destructive batch so far, and `saveVersionHistoryAsync` is still unsupported, so the API cannot make the checkpoint itself.

**Daniel: please save a version by hand** — `File → Save to version history…`, named something like **"Before schedule-only home, 2026-09-17"** — then say continue.

---

## 1. Inventory — read-only, and it is clean

The five superseded frames: `A S2 Home / empty` 103:2341, `/ sessions` 103:2353, `/ after first capture` 103:2993, `/ after failed capture` 103:3010, `/ unsent` 140:1618.

### Reactions pointing *at* the five — 10, and every one is covered by step 3

| # | Source frame | Layer | Trigger | Currently to | Step 3 sends it to |
|---|---|---|---|---|---|
| 1 | `A S1 Login / default` 103:2320 | `Sign in CTA` 103:2329 | ON_CLICK | / empty | `A S2 Home / schedule` |
| 2 | `A S1 Login / error` 103:2330 | `Sign in CTA` 103:2340 | ON_CLICK | / empty | `A S2 Home / schedule` — by the "any reaction to / empty" rule, not the Sign In rule, which names only *default* and *after sign out* |
| 3 | `A S8 Sent / sent` 103:2473 | `Next patient CTA` 103:2483 | ON_CLICK | / after first capture | `A S2 Home / schedule, sent` |
| 4 | `A S8 Sent / failed` 103:2969 | `Back to patients` 103:2980 | ON_CLICK | / after failed capture | `A S2 Home / schedule` |
| 5 | `A4 Patient / list` 103:3027 | `Back to patients` `I103:3028;61:472` | ON_CLICK | / empty | `A S2 Home / schedule` |
| 6 | `A4 Patient / placeholder` 103:3032 | `Back to patients` `I103:3033;61:472` | ON_CLICK | / empty | `A S2 Home / schedule` |
| 7 | `A4 Patient / summary` 103:3037 | `Back to patients` `I103:3038;61:472` | ON_CLICK | / empty | `A S2 Home / schedule` |
| 8 | `A S9 Account / unsent` 140:1547 | `Account/List row · 1 recording not sent` 163:2791 | ON_CLICK | / unsent | `A4 Patient / list, not sent` 200:6707 |
| 9 | `A S1 Login / after sign out` 163:2938 | `Sign in CTA` 163:2947 | ON_CLICK | / unsent | `A S2 Home / schedule` |
| 10 | `A4 Patient / list, not sent` 200:6707 | `Back to patients` `I200:6708;61:472` | ON_CLICK | / empty | `A S2 Home / schedule` |

**No orphans.** Every reaction pointing at a doomed frame maps onto a rule in step 3, and every rule in step 3 has a source. Nothing to stop and ask about on this count.

Two things worth naming before they surprise anyone:

- **Row 2 is caught by the catch-all, not the Sign In rule.** Step 3 names `A S1 Login / default` and `/ after sign out` for Sign In, but `/ error` also has a live Sign In CTA pointing at `/ empty`. It goes to `schedule` under "any reaction to `A S2 Home / empty`". Worth confirming that is intended — the error frame has **zero inbound** and is unreachable in the prototype, so its Sign In is wiring nobody can reach today.
- **Row 9 changes what signing out leads to.** `after sign out` currently lands on `/ unsent`, the whole point of that frame being an unsent recording waiting. It will now land on `schedule`, where Marcus already reads Failed — so the unsent state is still represented, just on the schedule instead of its own home. That is the ruling working as intended; naming it because it is the one flow whose *meaning* changes rather than just its destination.

### Reactions *inside* the five — 14, to be removed at step 4

| Frame | Layer | Trigger | Goes to | Layer visible |
|---|---|---|---|---|
| `/ empty` 103:2341 | `Action tap target 60 x 48` | ON_CLICK | `A S9 Account` | yes |
| `/ empty` | `Search field (SCAFFOLDING…)` 103:2349 | ON_CLICK | `A S2 Home / searching` | yes |
| `/ sessions` 103:2353 | `Action tap target 60 x 48` | ON_CLICK | `A S9 Account` | yes |
| `/ sessions` | `Search field (SCAFFOLDING…)` 103:2361 | ON_CLICK | `A S2 Home / results` | yes |
| `/ sessions` | `Session row` 103:2368 | ON_CLICK | `A S8 Sent / failed` | yes |
| `/ after first capture` 103:2993 | `Action tap target 60 x 48` | ON_CLICK | `A S9 Account` | yes |
| `/ after first capture` | `Search field (SCAFFOLDING…)` 103:3001 | ON_CLICK | `A S2 Home / results` | yes |
| `/ after first capture` | `Session row` 103:3008 | ON_CLICK | `A S8 Sent / failed` | **no** |
| `/ after failed capture` 103:3010 | `Action tap target 60 x 48` | ON_CLICK | `A S9 Account` | yes |
| `/ after failed capture` | `Search field (SCAFFOLDING…)` 103:3018 | ON_CLICK | `A S2 Home / results` | yes |
| `/ after failed capture` | `Session row` 103:3024 | ON_CLICK | `A S8 Sent / failed` | yes |
| `/ unsent` 140:1618 | `Action tap target 60 x 48` | ON_CLICK | `A S9 Account / unsent` | yes |
| `/ unsent` | `Search field (SCAFFOLDING…)` 140:1626 | ON_CLICK | `A S2 Home / results` | yes |
| `/ unsent` | `Session row` 140:1632 | ON_CLICK | `A S7 Sending` | yes |

**Thirteen of the fourteen are live wiring on visible layers** — unlike the dead frames of the last batch, these five are reachable screens being retired by decision, not by decay. Removing their reactions is what makes them safe to archive; it is not tidying up something already broken.

One is already dead: `/ after first capture`'s `Session row` 103:3008 is inside a hidden subtree.

### Starting points today

`Account device` 103:2320, **`Unsent recording` 140:1618**, `Schedule` 204:4082. The middle one is on a doomed frame and step 4 removes it, leaving the two the brief asks to verify.

---

## Not started

Steps **2** (the `schedule, sent` frame), **3** (rewire), **4** (archive the five), **5** (rename and move the two pages), the three DECISIONs, the spec and plan edits, the flow traces and the screenshots. Resuming needs only the hand-saved version.
