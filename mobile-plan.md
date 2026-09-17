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
| Hide the superseded components | Six `Visit/` masters are labelled SUPERSEDED but still visible on `Components`: Sheet list row 48:137, Icon/Pause 51:983, Icon/Stop 51:986, Icon/PlayArrow 51:989, Quick switch 51:1091 and Icon/CancelOutlined 74:543. Sheet list row still has 128 instances, so check before hiding. Add the footer band to COMPOSITIONS.md, and record the A4 band ids |

## Later

- ~~**Compare the two patient page experiments at arm's length** and pick one, or neither.~~ **Closed 2026-09-17**: Daniel took Experiment A and it is built as the real patient landing page. Experiment B stays on `scratchpad` for the record. `Visit/Recording bar` 48:918 still has no variant that puts the pills above the identity, which is why `Visit/Patient header` assembles its own top from that component's parts.
- ~~**Bring the chart list, summary, Medications, Vitals and Yusuf frames in line with the landing page.**~~ **Closed 2026-09-17 for the twelve A4 chart frames**; they now carry `Visit/Patient header`, the drawer at 265, and no footer. **Yusuf's frames are still on the old header**, as are every recording and paused frame — the recording screens deliberately, Yusuf's not yet.
- **Play the modal drawer on a phone.** Check that the scrim's tap wins over the header's buttons beneath it, that the tap and the drag feel like the same surface closing, and whether the drawer running 189 px past the chart list reads as restful or unfinished.
- **Bring Yusuf's frames in line.** `A4 Yusuf / list, not sent` still has the 201 recording bar, the 122 footer and the not-sent alert wedged between them; its drawer starts at 265 already, for a different reason.
- Settle where patient portraits live. They are in `assets/`; the brief expected `assets/patients/`.
- Play the schedule on a phone. Check the scroll, the peeking row, and that Marcus Vance is the only row that goes anywhere.
- Judge the now marker at arm's length: whether the half dot reads at the screen edge and whether the 2 px teal is heavy enough against the 1 px row dividers.
- Play both pages on a phone. Check:
  - the unsent loop
  - the chart drill-in while recording
  - the microphone sheet
  - stop and cancel from a paused drawer
- Judge the 16 px pill triangle and the 40 avatar at arm's length.
- Port more real sheets into the Patient chart. Medications and Vitals are done; Daniel supplies the next sheet and its NPVE node.
- Give Yusuf a patient summary, if his chart should open during the resend demo.
- Library batch in YX2n4YLrEpBXNbcc73T6dw:
  - **Avatar: an image slot and a size** — it is 40 x 40 with Fallback / Letter / Icon and no photo, so a 48 portrait needs three local overrides
  - add the MUI glyphs and retire the drawn carets and the drawn eye icons
  - add a trailing slot on List/Item
  - add a Divider component
  - **Text field: start and end adornment slots, and a `shrink` boolean independent of `Value`** — without the first the password eye has to sit over the field, and without the second an empty field cannot float its label without claiming to be filled
- QR or desktop handoff sign-in.

## Open

- Yusuf’s 9:15 row is above the fold on `schedule, Marcus sent`, the frame the resend scenario starts from. The row is wired and the list scrolls, but the frame as drawn does not show the thing the demo asks you to tap next.
- ~~Where `A S2 Home / schedule, sent` should be scrolled.~~ **Closed 2026-09-17**: Marcus moved to the 11:00 appointment, which makes him the first full row at the unchanged -292 offset. Fixed by moving the row, not the offset, so the peek cue survives.
- ~~How yesterday's unsent rows sit beside today's schedule.~~ **Closed 2026-09-17**: there is no separate unsent home any more. `A S2 Home / unsent` is archived, and an unsent recording shows on the schedule itself — from 2026-09-17 that is Yusuf Bahri's 9:15 row reading Failed; the account screen's "1 recording not sent" row opens his chart.
- ~~**The divider above the Patient chart drawer, from the playthrough note.**~~ **Closed 2026-09-17**: Daniel ruled that the line he saw where the green recording field meets the drawer is a **rendering artifact of two adjacent fields, not geometry**. Nothing was changed, and nothing needed to be: the first batch found no such line in the tree or in the pixels, and that finding stands as the evidence.
- **On `A4 Yusuf / list, not sent` the chart list ends at Vitals and Social history cannot be reached.** His drawer starts 64 lower to clear the not-sent alert, so the nine rows run past the `Footer band`, and with rows 10 to 14 hidden the list no longer scrolls (466 of content in a 501 area). Social history sits entirely behind the band. Nothing was changed — how a shortened drawer should end is a design question, and his chart is inert either way. Raised 2026-09-17, `mobileVitals_yusufListCannotReachSocialHistory`.
- ~~In Daniel's words: "The patient screen shows a drawer when a drawer isn't really needed before recording. Reconsider the patient screen. Not urgent."~~ **Taken up 2026-09-17, not closed**: two alternatives are built on `scratchpad` for a phone comparison — `EXPERIMENT A · Patient page, plain header` 282:7488 and `EXPERIMENT B · Patient page, resting band` 282:7501. Both move the controls to the top, rename the CTA **Start Encounter**, put the template pill and the microphone with it, and start the drawer closed with patient admin details on the page behind it. **Nothing in the demo follows them yet.** What to look at on the phone: whether the band earns its weight against the plain header; whether the controls at the top read as configuring the encounter; and the **175 / 159 of empty page** between the admin rows and the closed drawer.
- ~~Whether the scroll area should run to the screen bottom.~~ **Closed 2026-09-17, then reopened and closed the other way the same day.** The first playthrough read the beige under the list as the page showing where the list ends, and the closing line "That's everyone for today" was built for it. The second playthrough corrected the premise: **the beige was the scroll area stopping short at the safe area, not the page.** The scroll area now runs to the frame bottom on all four schedule frames and the 34 of clearance moved inside the scrolling stack. The closing line survives the correction and is unchanged.
- **`Sheet body`'s 122 of bottom padding does not buy scroll clearance**, so the summary carries its own 138 instead. Whether the 122 should come off `Sheet body` — and whether the chart list wants the same treatment — is open; it would touch every sheet frame. Raised 2026-09-17, `mobileSummary_scrollFramePaddingIsNotClearance`.
- **The Patient summary still carries a feedback action**, which §6.4 says ported sheets drop. It predates the rule. Whether it stays is Daniel's call. Its typo was fixed 2026-09-17; the block itself is still open, `mobileSummary_feedbackBlockSurvivesTheActionDrop`.
- **Three doses still disagree with the summaries, and Daniel has not ruled on two of them.** Marcus's **Sertraline 50 mg** and Colette's **Amlodipine 5 mg** are both the dose from before today's visit, which the summaries also state — so the question is whether a med list shows the chart as it stood or as the visit leaves it. Colette's **Chlorthalidone 25 mg** is not that: her plan adds it at **12.5 mg** and nothing supports 25. Raised 2026-09-17, `mobileChart_twoDosesArePreVisit` and `mobileChart_colettesChlorthalidoneHasNoSupport`.
- Search result fields should match desktop patient search. Daniel is checking.
- Known and accepted:
  - The Template pill opens nothing. It now reads "SOAP Note".
  - Start Recording on Colette opens nothing, on all six of her frames.
  - On Colette, Patient summary, Medications and Vitals are wired; every other chart row opens nothing.
  - The sign-in `App identity` frame now holds only the name; its bound `space/24` gap has nothing to space.
  - The Sent body's first line has 31 px of slack at "Marcus Vance"; a name about four characters longer would wrap it.
  - Rows 5 to 9 of the chart list carry real sheet names; row 8 is now Vitals and opens a sheet, the rest still open nothing. Rows 10 to 14 are hidden.
  - Colette's row is unwired on `schedule` and `schedule, top`; it only opens her screen on the two sent frames, which are the ones the demo reaches.
  - Pausing from Medications or Vitals drops the drawer.
  - `A5 Paused / drawer list` opens no sheet at all; Patient summary is its only wired row, as before.
  - The Vitals rows on `A4 Yusuf / list, not sent` are inert, like the rest of his chart.
  - The sign-in password eye is one glyph and is not wired; there is no revealed state and no `VisibilityOff`.
  - The sign-in fields read `Value=Filled` with a blank value, because that is the only way the library floats a label on an empty field.
  - The three landing pages leave 163 of page between the admin rows and the closed drawer.
  - Colette's DOB leaves **6** px of slack on the identity row, down from 7 when it was 05/09/1968; a longer name or date would wrap it.
  - `EXPERIMENT A` on `scratchpad` still carries its superseded header and control group, hidden, under rule 1.
  - 28 of the page's 195 reactions sit on hidden, superseded nodes and cannot be tapped.
  - The chart list no longer scrolls, and has no closing line the way the schedule does. With the drawer at 697 it now ends 189 px short of the drawer's bottom.
  - Start Encounter and Back to patients are still wired under the scrim; the scrim takes the tap.
  - The microphone pill is inert on every patient screen, so `A S3 Microphone` is reachable only from the account screen.
  - The empty 48 band under the puller in list mode stays.
  - The two recording summary frames end with 138 of blank they have no footer to clear, because the clearance is set once on the shared sheet.
  - The new disclaimer reads through to four archived frames, which instance the same summary component.
  - Colette's blood pressure row shows an office reading where her summary quotes a two-week home average; the row has no slot to say which.
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
| Apply the first phone playthrough notes | — | 254c1ac |
| Apply the second phone playthrough notes | — | 3712632 |
| Make Next Patient go to the next patient | — | f010350 |
| Give Colette her own summary and match the Sent copy | — | d37f787 |
| Move the Tebra logo to the bottom of sign in | — | d711368 |
| Add a current time marker to the schedule | — | 973feb3 |
| Lead the Sent copy with the patient's name | — | ca1ba31 |
| Enlarge the time marker dot | — | 46bb155 |
| Make the Medications sheet real | — | 85e1b5e |
| Make the Vitals sheet real | — | a28dc9f |
| Polish the patient summaries | — | 32a2158 |
| Correct the chart copy | — | 657563f |
| Try two patient page layouts | — | 1964084 |
| Match the Tebra login fields | — | 252d434 |
| Build the new patient landing page | — | a50722e |
| Put the new header on the open chart screens | — | 53a452a |
| Dim the page behind the open chart | — | 58d6085 |
| Make Colette younger | — | — |

Batches 0 to 5 all landed in one commit, `ed321b2`. A batch cannot carry its own hash, so the newest row names itself and the next batch fills it in.
