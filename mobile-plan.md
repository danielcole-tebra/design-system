# Mobile ambient capture: plan

What's next, what's open, and what's been done. The design itself is in `mobile-spec.md`.

## How batches are named

A batch name says what it does, in plain words: "Build the schedule row", "Wire the schedule". That name is:

- the first line of the prompt
- the LOG.md entry title
- the commit message

Older batches kept their letter codes in LOG.md. The history table below gives each one its plain name.

When a batch finishes:

1. Its row moves from Next to Done.
2. `mobile-spec.md` is updated to match the file.
3. Everything is committed.

One agent at a time.

---

## Next

| Batch | What it does |
|---|---|
| Tidy the Components page | Eight overlapping pairs remain there, including the Recording bar set over a proof frame. Hide the four superseded Visit components that are still visible. Add the footer band to COMPOSITIONS.md, and record the A4 band ids |

## Later

- Play the schedule on a phone. Check the scroll, the peeking row, and that Marcus Vance is the only row that goes anywhere.
- Play both pages on a phone. Check:
  - the unsent loop
  - the chart drill-in while recording
  - the microphone sheet
  - stop and cancel from a paused drawer
- Judge the 16 px pill triangle and the 40 avatar at arm's length.
- Port real sheets into the Patient chart, Medications first. Daniel supplies the sheet list and NPVE nodes.
- Library batch in YX2n4YLrEpBXNbcc73T6dw:
  - add the MUI glyphs and retire the drawn carets
  - add a trailing slot on List/Item
  - add a Divider component
- QR or desktop handoff sign-in.

## Open

- How yesterday's unsent rows sit beside today's schedule. For now they stay on their own unsent home.
- Search result fields should match desktop patient search. Daniel is checking.
- Known and accepted:
  - The Template pill opens nothing.
  - Pausing from Medications drops the drawer.
  - The empty 48 band under the puller in list mode stays.
- GAPs the library can't express yet:
  - no Divider component
  - the overlay background is a literal colour
  - no template picker

---

## Done

| Batch name | Old code | Commit |
|---|---|---|
| Set up the file | 0 | ed321b2 |
| Build sign in | 1 | ed321b2 |
| Build search, home and patient | 2 | ed321b2 |
| Build recording | 3 | ed321b2 |
| Build hand off | 4 | ed321b2 |
| Wire the first prototype | 5 | ed321b2 |
| Build the visit drawer and Patient summary | D0 to D4, fixes | 09a7b09 |
| Audit before account work | A0 | eeadd8f |
| Clone Visit screens into Account screens | A1 | 5e6be23 |
| Build the avatar, and fix it | A2a, A2a.1 | b8a82d8, 6e3168d |
| Build the account top bar, swap it in, build the device pill | A2b, A2c, A2d | d37716a, 668dd78, ea8dc07 |
| Backfill COMPOSITIONS.md | R1 | e4ab16d |
| Build the microphone sheet and 32 corners, then its frames | A3a, A3b | 8dc8f1e, 221430a |
| Build the account and unsent screens | A4a | 4d92b87 |
| Give every drawer one top, and correct the glyphs | D1, D1.1, D1.2 | 88e67e6, 7094be7, 9efd7a7 |
| Switch to MUI chevrons | P1 | 9b83c48 |
| Build the list row, divider and sign-out warning, and wire account | A4b | 55b6a6e |
| Build forgot password | A5 | 42eefc2 |
| Make stop confirmation an overlay | C1 | 6c1b3d2 |
| Turn the drawer into the Patient chart | N1 | e3bf665 |
| Audit the drawer | drawer audit | e3bf665 |
| Clean up the drawer | K1 | e3bf665 |
| Put the controls back on the timer line | K2 | e3bf665 |
| Audit the Start Recording band | band audit | e3bf665 |
| Check the specs against the file | spec check | e3bf665 |
| Audit home for the schedule, and verify it | S0, S0 check | e3bf665 |
| Build the schedule row | S2 | e3bf665 |
| Show the schedule row for review | — | 9214d43 |
| Add a chevron and white fill to the schedule row | — | a7f1cd9 |
| Build the not-sent alert on the patient screen | — | c8e9e22 |
| Build the schedule home screens | — | bf0178a |
| Change the telehealth marker to text and icon | — | e687475 |
| Fill out the schedule day and wire it | — | e434873 |
| Tidy the Account screens page | — | (this commit) |

Batches 0 to 5 all landed in one commit, `ed321b2`. A batch cannot carry its own hash, so the newest row names itself and the next batch fills it in.
