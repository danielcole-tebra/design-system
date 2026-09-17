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
| Make Next Patient go to the next patient | Next Patient opens Colette Mwangi's patient screen (11:30, telehealth) on both demo paths. The Sent screen gets a secondary text action, "Back to schedule". Needs a new Colette patient screen, and a named version saved before the batch runs |
| Hide the superseded components | Six `Visit/` masters are labelled SUPERSEDED but still visible on `Components`: Sheet list row 48:137, Icon/Pause 51:983, Icon/Stop 51:986, Icon/PlayArrow 51:989, Quick switch 51:1091 and Icon/CancelOutlined 74:543. Sheet list row still has 128 instances, so check before hiding. Add the footer band to COMPOSITIONS.md, and record the A4 band ids |

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

- Yusuf’s 9:15 row is above the fold on `schedule, Marcus sent`, the frame the resend scenario starts from. The row is wired and the list scrolls, but the frame as drawn does not show the thing the demo asks you to tap next.
- ~~Where `A S2 Home / schedule, sent` should be scrolled.~~ **Closed 2026-09-17**: Marcus moved to the 11:00 appointment, which makes him the first full row at the unchanged -292 offset. Fixed by moving the row, not the offset, so the peek cue survives.
- ~~How yesterday's unsent rows sit beside today's schedule.~~ **Closed 2026-09-17**: there is no separate unsent home any more. `A S2 Home / unsent` is archived, and an unsent recording shows on the schedule itself — from 2026-09-17 that is Yusuf Bahri's 9:15 row reading Failed; the account screen's "1 recording not sent" row opens his chart.
- **The divider above the Patient chart drawer, from the playthrough note.** There is no line above the drawer on any recording or paused frame: the drawer's `Stroke` boolean is off on all five, and the 1x renders carry exactly one full-width grey line, the drawer's own title divider under "Patient chart". The only frames with a line at the drawer's top edge are the four A4 patient frames, where `Stroke` is deliberately **on** because the drawer docks under a light bar (`mobileVisit_sheetAndDrawerCorners`). Nothing was hidden. Daniel to say which line he meant.
- In Daniel's words: "The patient screen shows a drawer when a drawer isn't really needed before recording. Reconsider the patient screen. Not urgent."
- ~~Whether the scroll area should run to the screen bottom.~~ **Closed 2026-09-17**: Daniel ruled that the list ends and the beige page background begins, and that the end of the list gets a closing line, "That's everyone for today". Built as `Schedule/End of list` 238:7558 on all four schedule frames. (No item with this wording was in this list; it is recorded here as closed so the ruling is findable.)
- Search result fields should match desktop patient search. Daniel is checking.
- Known and accepted:
  - The Template pill opens nothing. It now reads "SOAP Note".
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
| Tidy the Account screens page | — | 548bd7d |
| Archive the dead frames and tidy Components | — | 9602cf9 |
| Make the schedule the only home | — | f4cf75e |
| Split the demo into Marcus's visit and Yusuf's resend | — | 8d2715a |
| Apply the first phone playthrough notes | — | (this commit) |

Batches 0 to 5 all landed in one commit, `ed321b2`. A batch cannot carry its own hash, so the newest row names itself and the next batch fills it in.
