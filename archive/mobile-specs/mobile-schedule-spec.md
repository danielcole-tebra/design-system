# Mobile ambient capture: schedule addendum

Third addendum to `mobile-ambient-capture-spec.md`, after `mobile-visit-drawer-spec.md` and `mobile-account-spec.md`. Today's schedule on home, as a set of ways into a patient. File TP5KrQtY0T5IcMNqi375So.

Consumer: the Figma builder agent, and anyone reading what was decided. Sections 1 to 3 are context and rulings. Section 4 onward is build instruction.

Revision 2. Changes from revision 1: the five open questions are ruled; conventions, components, frames, wiring and batches added. Tapping a row now opens the Patient chart list, per drawer spec revision 9.

---

## 1. Intent

The device is something a provider scans on, then carries from room to room. It is not the desktop in a smaller window. A pared-down schedule on home lets the provider tap into the next patient instead of searching for them. Search stays, unchanged, for everyone else.

This reads the existing scheduling service. Nothing new is built on the back end beyond the hookup. The demo should say "this reads your day", not "we built scheduling".

## 2. Principles

- **The list is a set of doors, not a ledger.** A row is a way into a patient. It never records or claims what happened.
- **The list is what the device can see.** It renders the schedule as it stands right now and never reasons about it. If an appointment leaves the schedule, it leaves the list. If it is there, it is a row.
- **Search is the escape hatch.** When the list is wrong, or the patient in front of the provider is not on it, search is how they get there. No other recovery is designed.
- **Bookkeeping lives elsewhere.** When a visit actually happened, checkout, note status and rebooking belong to the platform, not this app. Recording timestamps are the evidence.

## 3. Rulings

**What a row knows.** From the schedule: patient name, scheduled time, telehealth or not. From the device: whether a recording exists for it. Everything else comes from the clock.

| Time passed | Recording | Row reads as |
|---|---|---|
| No | No | Upcoming |
| Yes | Yes | The existing session states: Sending, Sent, Failed to send |
| Yes | No | Quiet. No status, no explanation, still tappable |

The quiet row is not an error. The patient ran late, cancelled, no-showed, or someone else saw them, and the row does not say which. A 9:15 row is still the way in for a patient who arrives at 9:45.

**Rulings from Daniel:**

- **Telehealth.** A library Chip reading "Telehealth", on telehealth rows only. In-person rows show nothing.
- **Recording for a patient not on today's schedule.** It gets its own row, placed in time order by when the recording started. The row shows that time and the recording's status.
- **Several recordings against one appointment.** One row per appointment, showing the status of the most recent recording.
- **Order.** Strict time order, with past rows above upcoming ones. The list opens scrolled to the next upcoming appointment.
- **Empty day.** "No appointments today", under the search field.

**Tapping a row.** A Failed to send row retries, as the account addendum rules for unsent rows. Every other row opens that patient's Patient chart list.

**Not in scope, do not design:** rooming, location, check-in or checkout, cancelled or rescheduled states, holding or rebooking slots, calendar grid, day navigation, provider availability, note status, visit lifecycle of any kind, reconciling the schedule against what happened, launching telehealth from the device.

---

## 4. Conventions

All CLAUDE.md rules apply, and the conventions of `mobile-account-spec.md` section 2 carry over.

- **Page and prefix.** Decided at S0. Account screens is the fullest version of the app (sign in, avatar, unsent loop, Patient chart), so the schedule builds on it or on a clone of it. No reaction crosses pages.
- **Components.** New local components are `Schedule/`-prefixed. Shared components are not edited unless Daniel rules the change applies everywhere.
- **Placeholder data.** Reuse the patients already in the file (Marcus Vance and the search placeholders). Any new name or time is logged as DECISION per base spec 2.8.
- **Record.** Composition decisions in COMPOSITIONS.md, open findings in FLAGS.md, history in LOG.md.

---

## 5. Components

| Component | Source | Notes |
|---|---|---|
| `Schedule/Row` | Local | Built on the same construction as the existing Session row. Primary line: patient name. Secondary line: time, then the Telehealth Chip when set. Trailing: status chip when a recording exists. Properties: `Time` text, `Name` text, `Telehealth` boolean, `Status` variant (none, sending, sent, failed). Full-width tap target |
| `Schedule/Date header` | Local, only if the existing "Today" heading can't take a date | Reads "Today", with the date if S0 finds a pattern for it |
| Chip | Library | Telehealth marker, and the base for the status chip |
| Status chip, Session row | Local, existing | Reused as built |

The row's layout is proposed, not ruled. S2 stops for Daniel's read of the component sheet before any frame uses it.

---

## 6. Frames

Home frames, each a clone of the current home with search at rest:

- **Home / schedule.** Today's date header. Two past rows with recordings (Sent, Failed to send), one quiet past row, one off-schedule recording row, and four upcoming rows, one of them Telehealth. Drawn scrolled so the next upcoming row sits just below the search field, with past rows above it cut off at the top.
- **Home / schedule, top.** The same list scrolled to its start, so every past state is visible in one still.
- **Home / empty day.** Search, then "No appointments today" in secondary text.

The existing unsent home ("Yesterday", one failed row) is not changed. How yesterday's unsent rows sit beside today's schedule is open (section 9).

---

## 7. Wiring

| From | Tap | To |
|---|---|---|
| Upcoming, quiet, Sent, Sending or off-schedule row | row | that patient's Patient chart list (A4 Patient / list for Marcus Vance) |
| Failed to send row | row | Sending, as the unsent row does |
| Search | as today | unchanged |
| Avatar | as today | the matching Account frame |

A new starting point, **Schedule**, sits on the login that leads to Home / schedule, if S0 recommends a separate login frame for it.

---

## 8. Batches

One level per batch. Screenshot everything and stop for Daniel's read.

| Batch | Scope |
|---|---|
| S0 | Read-only audit. Home frames and their list region; Session row and status chip construction; library Chip; the "Today" heading; placeholder patients; how a scrolled still can be drawn. Recommend a page and prefix |
| S1 | Page and clone, if S0's recommendation is a new page. No design changes |
| S2 | `Schedule/Row`, every variant and the Telehealth combination, on a component sheet |
| S3 | The three home frames |
| S4 | Wiring and starting point |

---

## 9. Open

- **Yesterday's unsent rows beside today's schedule.** Placeholder: not shown on the schedule frames; the existing unsent home keeps its own loop.
- **Opening scrolled to now.** Figma can't set a starting scroll offset, so the scrolled still is drawn (section 6). S0 reports whether a better way exists.

## 10. Questions for the build, not the prototype

- The scheduling service call: which provider, which day, what refresh cadence.
- How a recording is matched to an appointment, and what happens when it can't be.
- Which appointment types the schedule returns, and whether any are filtered out for this device.
- Where "today" begins and ends across time zones.
- Whether "scrolled to now" re-anchors as the day moves, or only on opening.
