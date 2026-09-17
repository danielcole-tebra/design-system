# Mobile ambient capture: spec

The one spec for the mobile ambient capture prototype. It says what the app is, what Daniel has ruled, and how it is built. It replaces `mobile-ambient-capture-spec.md`, `mobile-visit-drawer-spec.md`, `mobile-account-spec.md` and `mobile-schedule-spec.md`, which are archived.

What's next, open questions and batch history live in `mobile-plan.md`. When a batch finishes, this file is updated to match the file, and the plan moves the batch to done.

File: Mobile ambient capture prototype, TP5KrQtY0T5IcMNqi375So. Library: YX2n4YLrEpBXNbcc73T6dw. Sheet source (read only): NPVE target fdCQVFdvOByaOYIJYag0d6.

Last updated after the page behind the open chart was dimmed.

---

## 1. What the app is

A phone app that lets a provider sign in, find the patient, read their chart, record the visit, and hand the audio to the existing pipeline. It ships as a standalone route, not a responsive view of the web app.

The phone is a visit device. The provider scans on it, carries it from room to room, and reads the chart without a laptop. Chart data is **read-only**. Prescribing, ordering, editing, note review and signing stay on the desktop, as does everything after the handoff.

**Not in scope, do not design:**

- Account: QR or desktop handoff sign-in, biometric sign-in, multiple practices, profile editing, notification settings, onboarding.
- Chart: search within the chart list, pinning sheets, any sheet that needs an action to be useful.
- Schedule: rooming, location, check-in or checkout, cancelled or rescheduled states, rebooking, calendar grid, day navigation, availability, note status, visit lifecycle, reconciling the schedule against what happened, launching telehealth.
- Recording: interrupted session recovery.

---

## 2. Rulings

Every design decision Daniel has made that still stands, grouped by area. Superseded rulings are gone; history is in `mobile-plan.md` and FLAGS.md.

**Overall**

- The app is named **Visit Companion**, with the Tebra logo in front of the name. Ruled 2026-09-17, replacing "Ambient capture". The mark is `Brand/Tebra logo`, cut from the library's nav lockup because the library has no standalone logo component, and sized to the title's cap height.
- The library and code are followed where they can be and overruled where their design is wrong. Overrides are logged as Daniel's decisions.
- Library Buttons render Title Case, and button copy ships that way. System strings such as device names are never Button labels.
- **Glyphs** match their `@mui/icons-material` path exactly:
  - Selectors use `ArrowDropDown`.
  - Expand in place uses `ExpandMore`.
  - Navigation uses `ChevronLeft` / `ChevronRight`.
  - Pause, stop and play use MUI's circle icons.
  - The library's drawn carets are not used, which overrides code's `DownCaretIcon`.
- One back chevron per screen.
- **Sheets and drawers** have 32 top corners and one shared top (puller 30, title row 48). No close (X) button on any of them.
- Body text is pure black, as the library has it.
- **Sent confirmation copy says the note will be in the desktop queue.** "Unsigned Notes" is too specific; use **"desktop queue"** going forward.
- **Sent confirmation copy leads with the patient's name, with each sentence on its own line**, so both Sent screens have the same two-line shape.
- Status language is Sending, Sent and Failed to send. Never "synced", "complete" or "ready". The phone reports only on the handoff. On schedule rows the pill shortens to one word — Sending, Sent, Failed — because the row leads to the patient, where the alert gives the full context.

**Account**

- The sign-in screen shows **"Visit Companion"**, centred, in the home top bar's title face.
- **The sign-in fields match the real Tebra login: outlined fields labelled "Email" and "Password", with the label in the outline, and a show/hide icon on the password field. Nothing else on the sign-in screen changes.** Ruled 2026-09-17.
- **The password field's show/hide icon is the MUI outlined eye.** Ruled 2026-09-17.
- **On sign in, the Tebra logo sits at the bottom of the screen as a small accent**, so it no longer competes with "Visit Companion". Ruled 2026-09-17, superseding the lockup that had it above the name. **The logo keeps its current size.**
- **The sign-in content sits higher than centre.** Dead-centre content doesn't read as centred on a plain field.
- One account, one practice. The practice is shown as a fact, never a choice.
- **Sarah Bennett's avatar uses her photo.** Ruled 2026-09-17, replacing the salmon disc with initials.
- **Avatars are lifted off the beige with a white ring and a shadow.** Ruled 2026-09-17, hand-applied by Daniel and read back off his node: a **1 px INSIDE stroke, `color/common/white`**, and a **drop shadow X 0, Y 1, blur 1, spread 0, black at 25%, not shown behind transparent areas**. It sits on the node that clips the circle, so the ring follows the circle, and it is **the same at 40 and at 48 — not scaled**. **The wrapper above it must not clip** (`clipsContent` false): a 48 wrapper around a 48 disc cuts the shadow off entirely, which is what made the bottom edge read as a flat clipped band. Fixed 2026-09-17 on Marcus's, Colette's and Yusuf's wrappers; Sarah's was already correct.
- Demo provider: Dr. Sarah Bennett, Windsor Family Medicine, sbennett@windsorfm.com, initials SB. **Her avatar is her photograph**; the salmon disc with two initials is superseded and survives only underneath the image.
- Signing out is never blocked. With an unsent recording, a warning offers Retry first and Sign out anyway.
- Unsent recordings stay on the phone for the next sign-in. An unsent row is retried by tapping the whole row.

**Home and schedule**

- The schedule is the only home. Everything that used to land on a home lands there.
- The schedule header shows the real date, **"Thursday, September 17"**, in place of "Today". If the schedule ever spans days, each day gets its own header in the same format.
- **The date header floats**: it stays pinned while the list scrolls. It sits above the scroll area, not inside it, so the list passes under it.
- **The scroll area runs to the bottom of the frame.** Ruled 2026-09-17 on the second playthrough, superseding the first playthrough's reading: the beige Daniel saw under the list was the scroll area stopping short at the safe area, not the page showing where the list ends.
- The end of the list still gets a closing line so it reads as the end: **"That's everyone for today"**, centred, in the secondary text style, on the beige, with 34 of padding below it so it clears the home indicator when the list is scrolled fully.
- **The pinned date header is separated from the list scrolling under it** by a 1 px bottom divider, the same `color/divider` the rows use.
- **An empty day still shows the date header.**
- **Main demo path:** schedule, tap Marcus Vance to his **landing page**, open the chart drawer, read the summary, tap the dimmed page or drag the puller down to close it, **Start Encounter** to record, stop, sent, then **Next Patient to Colette Mwangi**, read her summary, and "Patients" back to the schedule with Marcus marked Sent. Everything goes well. Back To Schedule on the Sent screen is the shortcut that skips Colette.
- **Second scenario:** Yusuf Bahri’s 9:15 recording failed. Tap his row to his **landing page**, where the not-sent alert sits under the header, tap the alert, sent, then **Next Patient to Colette Mwangi's landing page**, open her chart drawer, read her summary, and "Patients" back to the schedule with both marked Sent. His chart drawer opens from his landing page the same way Marcus's does; the resend never needs it.
- **Next Patient goes to the next patient.** On both demo paths that is **Colette Mwangi**, the 11:30 AM Telehealth appointment.
- **The microphone pill is live on every landing page**, so the picker can be shown from the patient screen mid-demo and returns to whichever screen opened it.
- The Sent screen has a **text link under Next Patient that returns to the schedule**.
- **Colette's schedule row opens her patient screen**, so the demo feels cohesive.
- **The schedule shows a current time marker**: a **2 px line across the full row width**, bound `color/primary/main`, with a **16 px dot centred on the left edge of the screen, so half of it shows**. It has **no time label**.
- **The marker sits on the boundary between rows, under the last appointment that has started**, not at a proportional position. The rows aren't time-scaled.
- On `schedule` and `schedule, top` it sits between **Renata Ilves (10:20)** and **Marcus Vance (11:00)**. On `schedule, Marcus sent` and `schedule, both sent` it sits between **Marcus Vance** and **Colette Mwangi (11:30)**.
- **It scrolls with the list and does not push rows apart.**
- **The empty day has no marker.**
- On the schedule, Marcus Vance is the 11:00 appointment and Yusuf Bahri the 9:15.
- Until Yusuf’s recording is sent, every avatar on a home screen goes to `A S9 Account / unsent`.
- Search stays. `searching`, `results` and `no results` remain, reached from the schedule’s own search field — the way to a patient who is not on today’s list.
- `A S2 Home / empty`, `/ sessions`, `/ after first capture`, `/ after failed capture` and `/ unsent` are superseded and archived.
- `Visit screens` and `Screens` are archived, as `Archive · Visit screens` and `Archive · Screens`.
- The schedule is a set of ways into a patient, not a record. It shows the schedule as it stands and never reasons about it.
- A row knows the patient, the time, whether the visit is telehealth, and whether a recording exists. A past row with no recording is quiet: no status, no explanation.
- The status is the only pill on a schedule row. Telehealth is shown as text with an icon, not a Chip: a separator, a 16 `VideocamOutlined` and the word "Telehealth", on the time line, in secondary ink.
- Status pills on schedule rows are one word: Sending, Sent, Failed. The row takes the provider to the patient, where the alert gives the full context.
- The schedule shows a full day, running to 5:00 PM, so the list overflows and scrolls.
- On `A S2 Home / schedule`, the last past row peeks halfway in under the search field, as a cue that there is more above.
- Schedule rows show a trailing `ChevronRight` to say they open the patient. It sits on the optical edge, and the status chip moves left to make room.
- Schedule rows sit on `color/background/paper`, not transparent over the page.
- A recording for a patient not on the schedule gets its own row, in time order by when it started.
- Several recordings against one appointment make one row, showing the latest status.
- The list is in strict time order and opens scrolled to the next upcoming appointment.
- An empty day reads "No appointments today".
- Placeholder rows use Marcus Vance, Dolores Okonkwo, Priya Raghunathan and five invented names.
- Every schedule row opens its patient. No row retries from the list.
- A recording that was not sent is retried from the patient screen, through an alert above the Patient chart.
- Retry on that alert uses the library's teal text-button style, `color=primary`, like every other text action in the app.
- The whole not-sent alert is the tap target for Retry, overriding the library Alert, which only makes its action tappable. It matches the unsent row, where tapping the whole row retries.
- On the schedule, Marcus Vance's row is the failed row. The next upcoming appointment belongs to another patient and, like every row except Marcus's, does nothing when tapped, because his is the only patient with a chart in the file.
- `A S2 Home / unsent` is unchanged. Its row still retries straight to Sending.

**Patient chart**

- The drawer is the Patient chart. It works by drilling in, the same on the patient screen and the recording screen: the list is home, a sheet opens from its row, and back returns to the list.
- **The chart list has no closing line.** Ruled 2026-09-17, superseding the closing line added earlier the same day. The schedule keeps its "That's everyone for today"; the chart list simply ends at Social history, because it never scrolls and so never needs to say it has finished.
- Opening a patient lands on the chart list, with no row highlighted.
- The drawer tucks away by dragging down on the recording screen. Dragging up from the collapsed edge, which reads "Patient chart", opens the list.
- Titles have a divider under them in both states.
- Chart rows with no sheet yet, and the Template pill, stay in place and do nothing when tapped.
- The Template pill reads **"SOAP Note"**, with no leading icon and no "Template:" prefix. The caret stays. This deliberately departs from, and supersedes, the earlier ruling that the pill matches the NPVE note toolbar (`visitDrawer_v4TopBarNoteToolbar`).
- Every sheet is reachable before recording.
- **Patient summaries can be invented for demo patients**, as long as they follow Marcus Vance's format: the AI disclaimer, then **Current Situation**, **Key Background**, **Active Care Plan** and **Progress & Next Steps**, each as bullets.
- **The AI disclaimer fits on one line with no hanging word.** Ruled 2026-09-17.
- **The gap between summary bullets is half the body line height, rounded to an integer px. Line spacing inside a wrapped bullet is unchanged.** Ruled 2026-09-17.
- **Every summary scrolls far enough that its last bullet clears the Start Recording footer.** Ruled 2026-09-17.
- **The Medications and Vitals sheets agree with the patient summary. Where they differ, the summary wins.** Ruled 2026-09-17.
- **Medications was the first real chart sheet.** It follows the rebuilt NPVE Medications sheet's content and hierarchy, adapted to the mobile drawer from library components.
- **Vitals is the second real chart sheet. It takes the row that read "Health status/observations" and is labelled "Vitals".** Ruled 2026-09-17.
- **The chart list ends at Social history. Rows 10 to 14 are hidden because they have no content.** Ruled 2026-09-17.
- **Rows reading "Sheet 5" through "Sheet 9" get real chart names and stay inert.**
- **Ported sheets** keep their content as is. Only identifying details change, to match Marcus Vance, DOB 03/14/1972. Every action is dropped.
- **Medications, built 2026-09-17.** `Visit/Sheet/Medications` **272:396**, 358 x 288: four library `List/Item` rows at `Lines=Two`, **72** each, name and dose on the primary line and form and frequency on the secondary, each over a 1 px INSIDE bottom stroke bound `color/divider`, the last row's stroke hidden per instance. From the rebuilt NPVE sheet it keeps the row order and the name-then-dose-then-detail hierarchy; it leaves out the **status control** and the **indication chip**, which the supplied rows do not carry, and drops **Add New Medication**, the per-row **Add to note** and the **Add Section to Note** footer, as every ported sheet drops actions. Marcus shows four rows, Colette three. **Corrected 2026-09-17 against the summaries**: Marcus's row 2 reads **Melatonin 5 mg / tablet, at bedtime as needed** (was 3 mg, nightly at bedtime), set on the master; Colette's row 1 reads **Metformin 1000 mg** (was 500 mg), set on both her frames.
- **Patient summary, polished 2026-09-17.** `Visit/Sheet/Patient summary` **50:969**, 358 x **1355** for Marcus and **1211** for Colette, is the single source all five summary frames instance, so all three rulings were set once on it. The disclaimer reads **"AI-generated summary. Verify before use."**, one line: it renders **267** against the Alert's **294** text column, where the old copy measured **362** and wrapped to two. The Alert drops 68 to **48**. The bullets are `UNORDERED` list items inside one TEXT node per section, so the gap between them is **`listSpacing` 12** — half the body1 24 line height — and `lineHeight` stays 24, which leaves wrapped lines untouched; each section grows 24. Heading spacing is unchanged: a heading is **8** above its own bullets and **16** below the section before it, so the new 12 never makes a heading read with the list above it. The sheet carries **50 of bottom padding** — the 34 home indicator plus 16. It was 138 while the patient screens had a 122 footer band; with the footer gone there is nothing left to clear but the indicator. Scrolled to the end the feedback block, the last thing in the sheet, lands on **794** and the last bullet on **705**, on a patient frame and on `A5 Recording / summary` alike.
- **Vitals, built 2026-09-17.** `Visit/Sheet/Vitals` **273:9321**, 358 x 432: six library `List/Item` rows at `Lines=Two`, **72** each, in the same FIXED 72 wrapper with a 1 px INSIDE bottom stroke bound `color/divider` that `Visit/Sheet/Medications` uses. Measure, value and unit on the primary line; the qualifier on the secondary. **Respiratory rate has no qualifier, so that row alone is `Lines=One`** and its single line centres in the 72; the row's `Secondary` string is blanked so nothing stale survives a switch back. The last row's divider is off **on the master**, because all six rows show on every instance. Row order is Daniel's supplied order — blood pressure, heart rate, temperature, respiratory rate, SpO2, weight — which **departs from the rebuilt NPVE sheet**, whose five rows run weight, BP, HR, temp, SpO2 and carry no respiratory rate at all. From NPVE it keeps the one-row-per-measure hierarchy and drops what the mobile rows do not carry: the **Quick Entry** field, the **"Or Use Editor"** disclosure, the **"recorded vitals 14 min ago" alert** and its **Pull New Data** action, and per row the **delta**, the **date**, the **sparkline** and the **action slot** — plus the **Add Section To Note** footer, as every ported sheet drops actions. Marcus and Colette each show six rows. **Corrected 2026-09-17 against the summaries**: Marcus's row 3 reads **Temperature 100.4 °F** (was 98.6), the low-grade fever his Current Situation states, set on the master. Colette's rows are all overridden, so hers is unaffected and still reads 98.4 °F.

**Recording**

- The microphone can change during a recording. The device pill is the mic glyph and a selector triangle only; device names appear only in list rows.
- Start Recording sits on its own white surface with a divider along its top edge.
- The pause and stop controls on the recording bar sit on the timer line.
- The stop confirmation is an overlay, and Cancel returns to the screen the provider was on. Cancelling from pause resumes recording. Pause has no confirmation.
- The Sending loader uses the library's teal, since the library loader has no grey.
- The line seen where the green recording field meets the drawer is a **rendering artifact of two adjacent fields, not geometry**. Ruled 2026-09-17; nothing was changed, and the divider question from the first playthrough is closed as that.

**Patient page**

Settled 2026-09-17, moved here from the open experiment that produced it.

- **The patient page follows Experiment A: header, then Start Encounter with the SOAP Note pill and microphone beneath it, then patient admin details, then the chart drawer, closed.**
- **The patient header carries a profile picture.**
- **Colette Mwangi is in her thirties, to match her portrait. Her DOB is 05/09/1990, and she is 36.** Ruled 2026-09-17.
- **The page's primary button reads "Start Encounter". The recording screen is unchanged.**
- The patient page's controls belong at the top, not over the drawer, matching where the recording controls sit on the recording screen.
- The template pill and the microphone control are co-located with Start Encounter, because they configure it.
- The drawer starts closed on the patient page and holds the chart. Patient admin details sit on the page behind it.
- "Start Encounter" comes from FHIR and may be temporary.
- Admin details put the **label on the primary line and the value on the secondary**, because a bare date does not name itself the way "Blood pressure 124/78 mmHg" does.
- **On the patient screens, the open chart is a modal drawer. The page behind it is dimmed. The drawer stops just below the patient's name, so the dimmed portrait and name stay visible. Start Encounter is reached by closing the drawer. The recording screen is unchanged.**
- **There is no Start Recording footer on the patient screens. Start Encounter in the header replaces it.**
- **Yusuf's patient page follows the same pattern as Marcus's and Colette's: a landing page with the chart drawer closed, and an open chart that dims the page.** Ruled 2026-09-17.
- **On Yusuf's landing page, the not-sent alert sits between the header and the admin details.** Ruled 2026-09-17, settled from Claude's default.
- **The microphone picker is reachable from the patient page's microphone pill.** Ruled 2026-09-17.
- **Yusuf keeps the initials avatar, and his disc takes a teal token.** Ruled 2026-09-17, **superseding the green ruling of earlier the same day**: the recording band is green, and a green disc on the patient whose recording failed reads wrong. **`color/primary/main` #004852 for the disc and `color/primary/contrastText` #FFFFFF for the `YB`, which measures 10.25:1** — Claude's default, **pending Daniel**. `mobileYusuf_noPortraitInTheRepo` stays open; `libraryAvatar_fallbackInitialsAreInvisible` is closed for this file, because no avatar in it now uses the library's grey fallback pairing.
- **With no footer, sheets only need to clear the home indicator.**

`EXPERIMENT B · Patient page, resting band` **282:7501** was not taken and stays on `scratchpad` for the record. `EXPERIMENT A` **282:7488** stays too, now carrying the real `Visit/Patient header`; its own header and control group are hidden and labelled SUPERSEDED under rule 1.

---

## 3. Foundations

- **Frame:** 390 x 844. Safe area 47 top, 34 bottom. Bottom-pinned content ends at y 794. No status bar and no keyboard drawn.
- **Spacing:** base 8, screen edge padding 16 (content 358 wide), minimum touch target 48, integer px only. Screen-edge ink sits at x 16 and x 374; tap targets may bleed to the edge.
- **Type:** Akkurat LL, fallback Helvetica. It has no Medium weight, so any 500 resolves to Regular or Bold. Body 16, screen titles 24, drawer titles h4.
- **Layout:** where the library says nothing about mobile composition, follow Material 3 for layout only. Appearance always follows Tebra.

**Colour.** The hex values are for identification. Nodes bind the library variable.

| Purpose | Value |
|---|---|
| Login field, paused recording field | `#004852` `color/primary/main` |
| Primary CTA | `#FF8D6E` `color/secondary/main` |
| CTA label | `#004852` |
| Live recording field, Sent | `#2B865A` `color/success/dark` |
| Sending, secondary text | `#545454` |
| Failed to send, stop confirm | `#D83B4D` |
| Page background | `#E8E5DF` `color/background/default` |
| Card and sheet surface | `#FFFFFF` `color/background/paper` |
| Text and meter on colour fields | `#FFFFFF` `color/common/white` |
| Body text | `#000000` `color/text/primary` |
| Dividers | `#D6D6D6` `color/divider` |
| Scrim | `rgba(0, 0, 0, 0.5)` `color/computed (no palette)/alphaBlack50` |

---

## 4. Pages

| Page | What it is |
|---|---|
| `Account screens` 103:2319 | **The whole app, and the only working screen page.** 49 screens, in eight labelled rows: Sign in, Home and schedule, Microphone, Patient, Recording, Stop, Hand off, Account. 80 between frames, 200 between rows, no overlaps. Starting points: **Account device, Schedule** |
| `Components` | Local components, shared by all pages, in five labelled groups: `Visit/` (27), `Account/` (4), `Schedule/` (3), Base components (9), `Brand/` (1). 80 between nodes, 200 between groups, no overlaps. No PROOF frames |
| `Archive` 214:3026 | **36** frames in one column, 200 apart: 17 PROOF and scaffolding, the two dead screens `A S4 Patient` and `A S6 Stop confirmation`, the five superseded homes, `PROOF Brand/Tebra logo and Schedule/End of list` 238:7561, `SCAFFOLDING · schedule scrolled to the end` 241:4998, `PROOF Schedule/Now marker` 257:7208, then the **five `SCAFFOLDING · … scrolled to the end` summary frames** 278:12272, 278:12506, 278:12740, 278:12949 and 278:13158, each a clone of a summary frame whose drawer is detached so the sheet can be held at the end of its scroll, `PROOF · Visit/Icon/Visibility (MUI) on paper` 286:8824, `PROOF · Visit/Patient header with each avatar` 287:10743, then the two rebuilt `SCAFFOLDING · … scrolled to the end` summary frames 292:10890 and 292:11160. Nothing here has a reaction |
| `Archive · Visit screens` 43:705 | The Patient chart demo, archived 2026-09-17. 26 frames, 84 reactions, starting point Visit device. Contents untouched |
| `Archive · Screens` 1:3 | The original four-job prototype, archived 2026-09-17. 18 frames, 42 reactions, starting point Happy path. Never edited |
| `Foundations` | Frame template and colour table |
| `scratchpad` 262:7760 | Working surface, outside the demo. A clone of `A S2 Home / schedule, top`, the `MEASUREMENT PROBE` 278:401 from the summary polish, and the two patient page experiments **282:7488** and **282:7501** with their labels. One reaction, on the cloned schedule frame; no starting point |

Frame names start with the page's letter: `A` for Account screens, `V` for the archived Visit screens, none for the archived Screens. No reaction crosses pages, and nothing on `Account screens` points at an archived frame.

---

## 5. Components

Library components are used as they are: Button, Text field, Alert, Dialog, Circular progress, Icon button, Chip, List/Item, Tebra wordmark.

| Local component | Node | What it is |
|---|---|---|
| `Brand/Tebra logo` | 238:7557 | 18 x 18 box holding the Tebra mark at 17.64 x 17, ink left-flush at x 0 and inset 1 from the top so the box centres on an integer in a 64 bar. Three vectors cloned from the library's `Nav/Logo` 2:882, bound `color/primary/main` |
| `Schedule/End of list` | 238:7558 | 390 x 64, transparent, one centred body2 14/20 on `color/text/secondary` reading "That's everyone for today" |
| `Schedule/Now marker` | 257:6162 | 390 x 16: a 2 px line across the full width at local y 7 and a 16 px dot at local x -8, both centred on the integer y 8, both bound `color/primary/main`. The dot overflows the box on the left and is clipped in half at the screen edge |
| `Account/Avatar` | 108:1212 | 40 disc `color/secondary/main`, initials `color/secondary/contrastText` (4.53 : 1), Akkurat LL Regular 20/20, `Initials` default SB |
| `Account/Top bar` | 114:600 | `Visit/Top bar` with the avatar as the action: ink 334 to 374, tap target 60 x 48 at x 330. `Title with action` carries a `Brand/Tebra logo` instance at (16, 23), 8 before the title, which moves to x 42 and 276 wide. The other two variants carry no mark |
| `Account/Microphone sheet` | 121:1793 | Drawer top, title "Microphone", three rows (iPhone microphone selected, AirPods Pro, Wired headset), 34 safe area |
| `Account/List row` | 163:1444 | 390 x 72, library `List/Item` (two lines) filling 358, `ChevronRight` in `color/grey/600` ending at 374 |
| `Visit/Top bar` | 93:2734 | `Config`: Title with action, Back with title, Back only. Each variant 390 x 64 |
| `Visit/Recording bar` | 48:918 | `State`: ready, recording, paused. Section 6.4 |
| `Visit/Drawer` | 48:897 | `Mode`: list, sheet. `Sheet` swap, `Stroke`, `Closable` (no visible effect). Section 6.4 |
| `Visit/Drawer edge` | 70:1480 | 390 x 112, label "Patient chart" |
| `Visit/Patient header` | 287:10323 | 390 x **265**. Safe area 47, back row 44, an identity row 56 with the **48 patient avatar** before the name and DOB, then the control group 118: Start Encounter 358 x 56 and a config row of the SOAP Note pill and the microphone control, **175 each**. Properties `Name`, `DOB`, `Avatar` (INSTANCE_SWAP, both portraits as preferred values). The DOB **hugs**, because Colette's is 109 against Marcus's 103 and a fixed box wrapped it. `Avatar` carries **all three** patient avatars as preferred values as of 2026-09-17 |
| `Visit/Avatar/Marcus Vance` | 287:7428 | 48 circle: the library Avatar at `Content=Letter`, resized to 48 with `cornerRadius` 24, initials hidden, fill replaced with `assets/marcus-vance.png` at `scaleMode FILL` so the portrait crops to the circle |
| `Visit/Avatar/Colette Mwangi` | 287:7431 | The same, from `assets/colette-mwangi.png` |
| `Visit/Avatar/Sarah Bennett` | 299:11361 | **40** circle, the provider not a patient: an `Account/Avatar` 108:1212 instance with the disc fill replaced by `assets/sarah-bennett.png` at `scaleMode FILL` and the `SB` initials hidden underneath, the same shell as the patient avatars at 40 rather than 48. Built 2026-09-17. Every avatar that represents her is an instance of it |
| `Visit/Icon/VisibilityOutlined (MUI)` | 299:8268 | 24 x 24, the MUI `VisibilityOutlined` path, vector at (1, 4) 22 x 15, `SCALE`/`SCALE`, ink bound the same `color/grey/700` the filled eye used. Built 2026-09-17; it is the sign-in password eye. `Visit/Icon/Visibility (MUI)` 286:7411 is SUPERSEDED |
| `Visit/Avatar/Yusuf Bahri` | 298:8127 | The same shell with **no portrait**: `assets/yusuf-bahri.png` does not exist, so the **initials "YB" show** instead of being hidden. Built 2026-09-17; the disc went from the library's grey to **`color/primary/main`** with the letters on **`color/primary/contrastText`** the same day. Swap the fill for an IMAGE the day a portrait lands |
| `Visit/Chart row` | 177:2858 | 390 x 48, library `List/Item` (one line) and `ChevronRight` ending at 374 |
| `Visit/Sheet/Patient summary` | 50:969 | 358 x **1267**, ported from NPVE 672:7906. A library Alert carrying the disclaimer, four section frames (heading + one `UNORDERED` `Bulleted content` TEXT node at `listSpacing` 12), a feedback block, and **50 of bottom padding** for scroll clearance. The feedback prompt reads "How would you rate the accuracy of this summary?" (corrected 2026-09-17). Every summary frame instances it; Colette's text overrides make her 1211 |
| `Visit/Sheet/Medications` | 272:396 | 358 x 288, four library `List/Item` rows at `Lines=Two`, 72 each, over a 1 px INSIDE bottom stroke bound `color/divider`. Follows the rebuilt NPVE Medication list 254:3707 |
| `Visit/Sheet/Vitals` | 273:9321 | 358 x 432, six rows on the same construction, cloned from `Visit/Sheet/Medications`. Row 4 (Respiratory rate) is `Lines=One`; row 6 carries no divider. Follows the rebuilt NPVE `Vitals/Body` fdCQVFdvOByaOYIJYag0d6 846:13017 |
| `Visit/Sheet/Placeholder` | 48:141 | Stand-in for sheets not yet ported |
| `Visit/Icon/…` | Components | Exact MUI paths: ArrowDropDown 59:493, ChevronLeft 159:1103, ChevronRight 159:1105, ExpandMore 159:1107 (reserved), PauseCircle 74:531, StopCircle 74:534, PlayCircle 74:537, Cancel 74:540, VideocamOutlined 206:830, **Visibility 286:7411** |
| `Session row` | 4:454 | 390 x 72. Name 16/24 and time 14/20 in a column, `Status chip` trailing, bottom divider. `State`: default, failed |
| `Status chip` | 4:395 | Library Chip, medium, outlined. `Status`: Sending, Sent, Failed to send |
| `Schedule/Row` | 196:777 | 390 x 72 on `color/background/paper`, like `Session row`. Time line: the time, then 8, then the Telehealth group — `·`, a 16 `VideocamOutlined` and the word, all body2 14/20 on `color/text/secondary`, 4 apart, 97 wide, driven by the `Telehealth` boolean. Trailing `ChevronRight` (159:1105, 24, `color/grey/600`, ink ending at 374, right padding 8). Status chip ends at 342; on `failed` its nested label is overridden to the one word **"Failed"**, 59 wide from x 283, leaving a 251 text column — `Status chip` 4:395 itself is untouched. `Name`, `Time`, `Telehealth`, `Status` (none, sending, sent, failed). The old Telehealth Chip is hidden and labelled SUPERSEDED |
| Search result row, Level meter, Field buttons | Components | From the original build |

Superseded components are labeled and kept, never deleted. The list is in FLAGS.md.

---

## 6. Screens

Each part lists its frames on `Account screens`. Visit screens has the same Patient chart and recording frames with `V` in place of `A`.

### 6.1 Sign in

- **A S1 Login / default, / error, / after sign out.**
  - Full-bleed `#004852` field. **"Visit Companion"** alone at y **190**, centred, on the home top bar's face — Akkurat LL Regular 24/36 bound `color/common/white` — then the white card at y **266**, 40 below it, holding Email, Password and Sign In.
  - The name and the card move as one block; the block top is **190** on all three frames, so nothing jumps between them.
  - The reversed wordmark sits alone at the bottom, **(145, 762), 100 x 24**, centred, its bottom edge **24** above the 34 safe area. Same node, same size, same hardcoded cream — it was moved, not rebuilt.
  - The `App identity` frame stays in place and now holds only the name, so it is 358 x 36. Its `space/24` gap is inert with one child.
  - **Gaps:** 47 status bar to the name **143** on all three; card bottom to the logo **214** on `/ default` and `/ after sign out`, **130** on `/ error`, whose card is 84 taller.
  - The error state adds an error alert inside the card.
  - "Forgot Password?" is a text Button, centred horizontally in the card at x 120.5, with 16 above and below.
  - The card is 282 tall, 366 on error, so the error card's bottom gap to the logo is 130 where the others are 214.
  - **The fields, matched to the real Tebra login 2026-09-17.** Both are the library **`Text field` 34:633** at `size=medium, State=Default, Fill=Paper`, 310 x 56. The set has **no `variant` axis** — it is outlined by construction, a `Cap left` / `Label slot` / `Body right` outline whose notch opens for the label — so there was no `variant=outlined` to set. The label sits **in the outline** (`Label / floating` at 12 px, y -8, `Label slot` open, `Label / resting` hidden), which the library expresses only through **`Value=Filled`**; the `Value text` is blanked on all six fields so the field still reads empty. No helper text. **The password field carries a 24 `Visit/Icon/Visibility (MUI)` 286:7411** ending 12 from the field's right edge and centred in the 56 — an absolutely-positioned child of the `Login card`, labelled SCAFFOLDING because the library Text field has no end-adornment slot, and **not wired**. The form is **frame content, not a component**, so every change was made three times. **Nothing moved**: fields still 56, cards still 282 / 366 / 282, `App identity` still at y 190, the wordmark still at y 762, card-bottom-to-logo still 214 / 130 / 214.
  - The after-sign-out frame looks identical; its Sign In goes to the unsent home.
- **A S10 Forgot password.**
  - Back with title "Reset password".
  - Body: "Enter your email and we'll send a link to reset your password."
  - Empty email field, and Send Link (contained, secondary, 358 wide).
- **A S11 Reset sent.**
  - Readout centred 32 above the frame centre.
  - Heading: "Check your email".
  - Body: "We sent a reset link to sbennett@windsorfm.com. It expires in 30 minutes."
  - Back To Sign In.

### 6.2 Home and schedule

**Home.**

- Top bar with the title and the avatar.
- Search field with the placeholder "Search patients". A query replaces the list with results.
- Result rows show the name, with DOB and ID below.
- The home list is a plain vertical stack starting at y 191. Nothing on the existing home frames scrolls.

**A S2 Home frames.** Five former homes were archived 2026-09-17; what is left is the schedule and the search states.

| Frame | What it shows |
|---|---|
| / schedule | **The home.** The pinned date header and fourteen rows, drawn scrolled with the last past row peeking in halfway under the header |
| / schedule, top | The same fourteen rows at the list’s start |
| / schedule, Marcus sent | After the main path: Marcus reads Sent at 11:00 and is the first full row. Yusuf still Failed at 9:15 |
| / schedule, both sent | After the resend: Marcus and Yusuf both Sent, drawn at offset 0 so both are visible |
| / empty day | The date header, then "No appointments today" |
| / searching | Search in progress |
| / results | Search results |
| / no results | "No patients match" |

Archived: `/ empty`, `/ sessions`, `/ after first capture`, `/ after failed capture`, `/ unsent`.
**Schedule, built 2026-09-17.** All three clone `A S2 Home / empty`, so the top bar, avatar and search at rest carry over, and each keeps that frame's two reactions (avatar to Account, search to Searching).

- All four schedule frames hold a `Content` stack at y 47, **390 x 797**: the top bar (64), the search block (80), the **`Date header`** (40) and the `Schedule scroll` frame (**390 x 613**, clipping, `overflowDirection` VERTICAL), whose bottom lands on **844, the frame bottom**. The scroll area deliberately runs past the safe area; the clearance is carried inside the scrolling stack instead, so it moves with the list.
- **The date header is pinned by structure, not by a property.** It is a sibling of the scroll frame inside `Content`, not a child of the scrolling stack, so it holds while the list moves under it. Figma's "fix position when scrolling" is not reachable from the plugin API in this build (`scrollBehavior` throws on a FRAME), and this is what the structure allows. It sits on the beige, 390 x 40, the date on body2 14/20 at x 16, `color/text/secondary`, over a **1 px INSIDE bottom stroke bound `color/divider`** and 1 of top padding, which keeps the date on y 10 and the row on exactly 40.
- Inside the scroll frame a `Schedule content` stack, **390 x 1106**, holds **fourteen** `Schedule/Row` instances (72 each), a `Schedule/End of list` instance (64) at stack y 1008, and **34 of bottom padding** so the closing line clears the home indicator when the list is scrolled fully. A **`Schedule/Now marker`** instance is the stack's last child, `layoutPositioning ABSOLUTE` with constraints **STRETCH / MIN**, so it sits above the rows in layer order, scrolls with them and takes no space: the stack is 1106 with it and without it. Its line centre lands on a row boundary — stack y **288** on `/ schedule` and `/ schedule, top`, **360** on the two sent frames, which puts the instance at stack y 280 and 352. **`Schedule content` does the clipping** that halves the dot: it is the innermost ancestor with `clipsContent` true whose left edge is x 0. **All four frames overflow**: 1106 of content against a 613 container.
- **/ schedule, top** and **/ schedule, both sent** draw the stack at y 0. **/ schedule** and **/ schedule, Marcus sent** offset it to **y -252**, the midpoint of the Renata Ilves row, so the last past appointment peeks in halfway under the date header and Marcus Vance starts 36 below it, fully visible. The offset moved -292 to -252 when the 40-tall heading left the stack; the cue is unchanged, it is now the header rather than the search field that cuts the peeking row.
- **A S2 Home / empty day** 204:4172 shows the same pinned `Date header` **241:4990** and "No appointments today" below it, on the beige. Its `Content` stack is 390 x 224 and it has no scroll area.

The fourteen rows, in strict time order. Times place the present between 10:20 and 11:00 AM.

| Time | Name | Status | |
|---|---|---|---|
| 8:30 AM | Dolores Okonkwo | Sent | |
| 9:15 AM | **Yusuf Bahri** | Failed | opens `A4 Yusuf / list, not sent` |
| 9:45 AM | Priya Raghunathan | none | past and quiet |
| 10:20 AM | Renata Ilves | Sent | off schedule, placed by when it started; the row that peeks |
| 11:00 AM | **Marcus Vance** | none | first full row at the -292 offset; opens `A4 Patient / list` |
| 11:30 AM | Colette Mwangi | none | Telehealth |
| 1:15 PM | Ingrid Solheim | none | |
| 2:00 PM | Theo Abernathy | none | |
| 2:30 PM | Nadia Kowalczyk | none | |
| 3:00 PM | Emeka Balogun | none | Telehealth |
| 3:30 PM | Sofia Renteria | none | |
| 4:00 PM | Hamish Croft | none | |
| 4:30 PM | Lena Petrova | none | |
| 5:00 PM | Amara Dunbar | none | |

Eleven of the fourteen names are invented placeholders, logged in FLAGS.md as `mobileSchedule_placeholderRowsAndTimes` and `mobileSchedule_sixMorePlaceholdersAndWiring`.
What a schedule row shows depends on the clock and on whether a recording exists:

| Time passed | Recording | Row shows |
|---|---|---|
| No | No | Upcoming, no status |
| Yes | Yes | Sending, Sent or Failed |
| Yes | No | Nothing extra |

### 6.3 Account

- **A S9 Account.**
  - Back with title "Account".
  - Identity block, 60 tall: avatar at x 16, then "Dr. Sarah Bennett" (16/24) and "Windsor Family Medicine" (14/20, secondary) at x 72.
  - A 1 px divider below it.
  - Microphone as an `Account/List row`.
  - Sign Out (contained, primary, 358 wide) above the safe area.
- **A S9 Account / unsent.** Adds a "1 recording not sent" row, "Marcus Vance · Yesterday, 4:30 PM", above Microphone.
- **A S9 Account / sign-out warning.**
  - Dialog 326 x 238 over the scrim.
  - Title: "1 recording not sent".
  - Body: "Marcus Vance, yesterday at 4:30 PM. It stays on this phone, and you can send it the next time you sign in."
  - Actions: Sign Out Anyway (text) and Retry (contained, secondary).
- **A S3 Microphone.**
  - Back with title "Microphone".
  - The three device rows, with the active one checked.
  - Used before recording and from Account.

### 6.4 Patient chart

**Patient screen, A4 Patient / list, / summary, / medications.** Page background, with the ready recording bar above the drawer. (`A4 Patient / placeholder` **103:3032** was renamed `A4 Patient / medications` on 2026-09-17; the node id is unchanged and so is every reaction on and into it.)

**Colette's Medications, A4 Colette / medications, after Marcus 272:3459 and A4 Colette / medications, after Yusuf 272:3602.** Two clones of Marcus's `A4 Patient / medications` 103:3032, one per demo path for the same reason her summary needs two: the drawer back chevron has to return to the list it came from. Her three medications override the sheet's rows and the fourth row is hidden. **Nothing on either frame reaches a Marcus frame** — back goes to her own list, "Patients" to that path's schedule, Start Recording is inert, and the device pill still opens `A S3 Microphone`, which names no patient.

**Vitals frames, A4 Patient / vitals 273:9376, A5 Recording / vitals 273:9519, A4 Colette / vitals, after Marcus 273:9637 and A4 Colette / vitals, after Yusuf 273:9780.** Four clones of the four Medications frames, with `Visit/Sheet/Vitals` swapped into the drawer's `Sheet#48:4` slot and the drawer title set to "Vitals". Each keeps every reaction its source had, so back already returns to the chart frame the Vitals row was tapped on. Marcus's two show his six vitals; Colette's two override all six rows with hers. `A4 Patient / vitals` keeps Start Recording; Colette's two have none, as her Medications frames have none.

**Colette's summary, A4 Colette / summary, after Marcus 249:10819 and A4 Colette / summary, after Yusuf 249:10824.** Two clones of `A4 Patient / summary`, one per demo path. Her summary is **invented for the demo** and follows Marcus's format exactly — the disclaimer, then Current Situation, Key Background, Active Care Plan and Progress & Next Steps, each an `UNORDERED` bulleted TEXT node at 16 / 24 on a 358 column. Her sheet is **1123** tall against Marcus's 1267, in the same 565 scroller, so it scrolls the same way and simply ends sooner. The drawer back chevron returns to her list, "Patients" returns to that path's schedule, and **Start Recording is inert**. Her Current Situation opens **"36-year-old female"** on both frames, set 2026-09-17 with the DOB; the sheet height did not change, because the edit is two characters for two.

**Colette's chart lists, A4 Colette / after Marcus 246:4990 and A4 Colette / after Yusuf 246:4995.** Two clones of `A4 Patient / list`, identical to it and to each other but for the identity: **Colette Mwangi, DOB 05/09/1990** (placeholder). One per demo path, because the only thing that differs is where "Patients" goes back to — `schedule, Marcus sent` and `schedule, both sent`. **Start Recording is unwired on both.** **Patient summary opens her own summary and Medications is inert** as of 2026-09-17; the device pill still opens `A S3 Microphone`, which is patient-agnostic.

**Not sent, A4 Yusuf / landing, not sent 298:11207 and A4 Yusuf / list, not sent 200:6707.** Yusuf Bahri, DOB 07/22/1985 (placeholder). Brought in line with the other patient screens 2026-09-17, so he is now a landing page and an open chart like Marcus and Colette, not one frame.

**The landing frame** is a clone of `A4 Patient / landing` at (7880, 3132). Top to bottom: `Visit/Patient header` **0–265**; the **not-sent alert 281–329**, 358 x 48 at x 16, with **16 of beige above and 16 below**; `Patient admin details` **345–633**; beige; `Visit/Drawer edge` closed at **732**. **99 of page** shows between the admin block and the closed drawer, against 163 on the other three, because the alert takes 64 of it. The alert is the library Alert at `variant=standard, severity=error`, reading "Recording from 9:15 AM not sent" with a text Button "Retry" in its action slot, and the **whole alert** is the tap target, not the button. His admin rows read Lower back pain follow-up, August 20, 2026, UnitedHealthcare Choice Plus and Dr. Alma Reyes; **no value wraps**, all four secondaries 20 tall.

**The open chart** is the old frame, rebuilt on the same pattern as the twelve: `Visit/Patient header` at 390 x 265, a `Scrim` 390 x 844 above the header and below the drawer, the drawer at **y 147** running **697** to the frame bottom, `Sheet list` **619** with **34** of bottom padding. The old `Visit/Recording bar`, the **not-sent alert**, the `Footer band` and the `Start recording CTA` are hidden and labelled SUPERSEDED beneath it — **the live alert is on the landing page only**, because on the open chart it would sit at 201, behind both the drawer and the scrim. **All nine chart rows show**, 432 in 619, so the list does not scroll and its last row ends on 657. **The chart rows stay inert**, as they were.

**The patient landing page, A4 Patient / landing 287:10395, A4 Colette / landing, after Marcus 287:10504, A4 Colette / landing, after Yusuf 287:10615 and A4 Yusuf / landing, not sent 298:11207.** Built 2026-09-17 from `EXPERIMENT A`, and **the frame a patient now lands on**. Top to bottom: `Visit/Patient header` 287:10323 at **390 x 265**; `Patient admin details` at y **281**, a 390-wide `color/background/paper` block of four 72 rows, the library `List/Item` at `Lines=Two` over a 1 px INSIDE bottom divider, label on the primary line and value on the secondary, last row's divider off; then beige; then `Visit/Drawer edge` closed at y **732**, 112, showing the puller and "Patient chart". **163 of page shows between the admin block and the closed drawer.** Each frame's Start Encounter goes where the frame it replaced sent Start Recording — Marcus to `A S5 Recording / recording`, Colette's two nowhere — and the closed drawer opens that patient's chart list on that path, by tap and by drag. The pills are inert. **The old chart-list frames were not changed and are still reachable**, from their own sheets' drawer back and now from these pages' closed drawers.

**The open chart screens, all twelve.** Rebuilt 2026-09-17 on the same header as the landing page, then made modal the same day. `Visit/Patient header` 287:10323 at **390 x 265**, the old `Visit/Recording bar` at `State=ready` hidden and labelled SUPERSEDED beneath it. A **`Scrim`** rectangle, 390 x 844, sits **above the header and below the drawer**, bound `color/computed (no palette)/alphaBlack50` — the same node the microphone sheet and the sign-out warning already use. The **drawer starts at y 147**, the bottom of the header's identity row, and runs to the frame bottom: **697** tall, `Sheet body` / `Sheet list` **619**. So the dimmed portrait, name and DOB show above it and everything below — Start Encounter, both pills, the admin rows — is behind the drawer until it is closed. **No footer**: the `Footer band` and the `Start recording CTA` are hidden and labelled SUPERSEDED, and `Sheet body` bottom padding drops **122 to 34**, the home indicator alone. The chart list holds all nine rows in 466 against **619**, so it **does not scroll**, and its last row ends on **657**. Medications (330, last row 521) and Vitals (474, last row 665) do not scroll either. Only the summary does, at 1309; scrolled to the end its feedback block lands on **794**. Each frame's Start Encounter goes where its Start Recording went — Marcus to `A S5 Recording / recording`, Colette's eight nowhere — back goes where it went before, the drawer back and every chart row are untouched, and **both the scrim on tap and the puller zone on a drag down return to that patient's landing frame** on `SMART_ANIMATE / EASE_OUT / 0.225`. The pills are inert, and the header's own Start Encounter and back are under the scrim.

**Ready bar**, 390 x 201:

- Top safe area 47.
- "Patients" link with a 16 `ChevronLeft`, 103 x 36 at x 4.017.
- "Marcus Vance" with "DOB 03/14/1972" beside it in secondary, on one line at y 91. The `Patient detail` box is **120 x 36** on the master, widened from 103 so a longer DOB cannot wrap; every ready bar in the file now sets the DOB ink top at 115.88.
- Pills row at y 135:
  - Template pill, **139 x 38 at x 16**: "SOAP Note" and `ArrowDropDown`. The Button's `Start icon` boolean is off, so the list glyph is hidden, not deleted.
  - Device pill, 82 x 38 at **x 163**: mic glyph and `ArrowDropDown`, no label.

**Drawer**, both modes 390 x 621, white, 32 top corners.

- **Shared top.** A 30 x 6 `color/grey/400` puller at (180, 8), then a 48 title row with a 1 px divider below.
- **List mode.**
  - "Patient chart" at (16, 12).
  - **Nine** chart rows, none selected: Patient summary, Allergies, Medications, Problems, **Procedures & surgical history, Family history, External care history, Vitals and Social history**. **The list ends at Social history**; the closing line is gone as of 2026-09-17. Rows 10 to 14 are still there, hidden, under rule 1. **The eighth row was "Health status/observations" and is now Vitals, in the same position.** Of the nine, Patient summary, Medications and Vitals open a sheet; the rest are inert.
  - The nine rows run **432**. On the open chart screens, where the drawer runs 147 to 844 and `Sheet list` is **619** with 34 of bottom padding, that leaves **153** of slack, so **the list does not scroll** and its last row ends on **657**. On the recording and paused lists, where `Sheet list` is **647**, the slack is **181** and the last row ends on **629**. **`A4 Yusuf / list, not sent` shows all nine too**, as of 2026-09-17: its drawer no longer starts low to clear the alert, because the alert moved to his landing page.
  - **`Chart/End of list` 299:11339 is hidden and labelled SUPERSEDED** on the `Visit/Drawer` `Mode=list` master 48:814, under rule 1. It is still the last child of `Sheet list` and can be brought back with one flag.
- **Sheet mode.**
  - Back button at x -1.97, ink from 18.03, matching the top bar's back.
  - Sheet name at x 72.
  - Content with padding 8 / 16 / 34 / 16. It scrolls.
- **`Stroke`.** On over the light page, off over the colour field.

**Footer band.** A white rectangle, 390 x 122 at y 722, with a 1 px divider on top.

- Start Recording (contained, secondary, medium), 358 x 56 at (16, 738).
- The drawer content is padded 122 at the bottom so its last row clears the divider.

**Porting a sheet.**

- One column, 358 wide.
- Tables become stacked rows: primary value first, supporting values below, dividers between.
- The desktop header and close are dropped.
- Every action is dropped and logged.
- Library components are used as desktop uses them. Anything without a mobile fit is flagged.
- Long text wraps.
- Content is unchanged apart from identifying details.
- Each port adds a `Visit/Sheet/<name>` component and its frames.

### 6.5 Recording

**A S5 Recording / recording.**

- Full-bleed `#2B865A` with white content.
- The name, the timer at 64 (`04:32`), and the level meter:
  - 24 segments, 6 wide with 4 between, 236 overall, heights 4 to 48, radius 3.
- The device pill, 82 x 38, centred at x 154, y 557.
- Field buttons, 175 x 56 each and 8 apart: Pause (text) and Stop (contained).
- The collapsed drawer edge at y 732.

**A S5 Recording / paused.**

- `#004852`.
- "Paused" above the timer, which holds its value.
- The meter becomes a single 236 x 2 line.
- Pause becomes Resume.
- The pill sits at y 569.

**Microphone sheet frames, A S5 Recording / microphone and A S5 Paused / microphone.** The scrim, with the microphone sheet pinned to the bottom and the pill hidden.

**A5 Recording / drawer list, / summary, / medications, and A5 Paused / drawer list, / summary.**

- The recording bar sits above the drawer.
- **Recording bar**, 390 x 119, in the field colour:
  - The name and timer at (16, 6) in white.
  - Controls, 76 x 40, at x 308, y 28 in the 72 row, centred on the timer line.
- The bar's fill runs 32 behind the drawer's corners.

**A S6 Stop confirmation / overlay.**

- A Dialog only, 326 x 238, over a 50% black background that closes on click outside.
- Title: "Stop recording?".
- Body: "This ends the session and sends the recording for processing. You can't restart it."
- Actions: Cancel (text) and Stop Recording (contained, error).

### 6.6 Hand off

- **A S7 Sending.**
  - Centred circular progress.
  - Heading: "Sending recording".
  - Body: "Keep this screen open until the recording is sent."
  - No actions. It moves on after 2 seconds.
- **A S8 Sent / sent.**
  - Success icon.
  - Heading: "Sent for processing".
  - Body, two sentences on their own lines: "Marcus Vance's note is being generated." / "You'll find it in your desktop queue." The break is authored, not a wrap: in the 326 column each sentence is one line, so the block is **2 lines, 48 tall**.
  - An `Actions` stack at (16, 674), 358 x 120, `itemSpacing` bound `space/8`: **Next Patient** (contained, secondary) then **Back To Schedule** (text, primary), both 358 x 56, the stack ending on 794. The confirmation content does not move.
- **A S8 Sent / Yusuf 230:5044.** The same screen for the resend leg, body "Yusuf Bahri's note is being generated." / "You'll find it in your desktop queue.", with the same `Actions` stack. **The two Sent screens are now the same shape**: heading 36, body 48, `Sent readout` 164 at y 296 on both.
- **A S8 Sent / failed.** **It has no Next Patient**; its two actions are Back To Patients and Retry, and it was left alone this batch.
  - Error alert.
  - Heading: "Couldn't send recording".
  - Body: "Your recording is saved on this device. The note hasn't reached your desktop yet."
  - Back To Patients (text), above Retry.

---

## 7. Wiring

**Sign in and account**

| From | Tap | To |
|---|---|---|
| Any login, all three | Sign In | A S2 Home / schedule |
| Any login | Forgot Password? | A S10 |
| A S10 | back / Send Link | back / A S11 |
| A S11 | Back To Sign In | A S1 Login / default |
| / schedule, / schedule, top, / schedule, Marcus sent and the three search screens | avatar | A S9 Account / unsent |
| / schedule, both sent | avatar | A S9 Account |
| A S9 Account / unsent | 1 recording not sent row | **A4 Yusuf / landing, not sent** |
| A S9 Account, both | back / Microphone | back / A S3 Microphone. **Six visible ways into the picker now**: these two rows and the four landing pages' microphone pills |
| A S9 Account | Sign Out | A S1 Login / default |
| A S9 Account / unsent | Sign Out | A S9 Account / sign-out warning |
| Warning | Retry / Sign Out Anyway / scrim | A S7 Sending / Yusuf · A S1 Login / after sign out · A S9 Account / unsent |

**Home, chart and recording**

| From | Action | To |
|---|---|---|
| Search result | tap | **A4 Patient / landing** |
| A4 "Patients", on Marcus's three and on A4 Patient / landing | tap | A S2 Home / schedule |
| **A4 landing, all three** | closed drawer, tap or drag | that patient's chart list on that path |
| **A4 open chart, all twelve** | scrim | tap to that patient's landing frame on that path |
| **A4 open chart, all twelve** | drawer puller | drag down to the same landing frame |
| **A4 open chart, Marcus's four** | Start Encounter | A S5 Recording / recording — **under the scrim**, so the scrim's tap wins |
| **A4 open chart, Colette's eight** | Start Encounter / SOAP Note / microphone | nothing |
| **A4 Patient / landing** | Start Encounter | A S5 Recording / recording |
| **A4 Colette / landing, both** | Start Encounter / SOAP Note / microphone | nothing |
| A4 device pill, on the four **landing pages** | tap | **A S3 Microphone** (wired 2026-09-17) |
| A4 device pill, on the open chart screens | tap | **nothing reachable** — the live pills are inert and the twelve wired ones are on hidden superseded bars, under the scrim |
| **A S3 Microphone**, back chevron and all three device rows | tap | **Figma `BACK`** — returns to whichever screen opened the picker |
| A4 Template pill | tap | nothing |
| A4 Start Encounter, Marcus | tap | A S5 Recording / recording |
| **A4 Yusuf / landing, not sent** — the whole not-sent alert | tap | A S7 Sending / Yusuf |
| **A4 Yusuf / landing, not sent** | Back to patients / Start Encounter / pills | A S2 Home / schedule, Marcus sent / nothing / nothing |
| **A4 Yusuf / landing, not sent** | closed drawer, tap and drag | **A4 Yusuf / list, not sent**, `SMART_ANIMATE / EASE_OUT / 0.225` |
| **A4 Yusuf / list, not sent** | scrim tap and puller drag | **A4 Yusuf / landing, not sent**, the same transition |
| **A4 Yusuf / list, not sent** | every chart row | nothing |
| Chart row, Patient summary | tap | the summary frame of the same screen, state and patient |
| Chart row, Medications, Marcus | tap | **A4 Patient / medications** or A5 Recording / medications. Inert on the paused list |
| Chart row, Medications, Colette | tap | that path's **A4 Colette / medications** |
| A4 Colette / medications, both | drawer back / "Patients" / Start Recording | that path's Colette list / that path's schedule / nothing |
| Chart row, Vitals, Marcus | tap | A4 Patient / vitals or A5 Recording / vitals. Inert on the paused list and on Yusuf's |
| Chart row, Vitals, Colette | tap | that path's **A4 Colette / vitals** |
| A4 Colette / vitals, both | drawer back / "Patients" / Start Recording | that path's Colette list / that path's schedule / nothing |
| A5 Recording / vitals | bar / pause / stop / puller drag / drawer back | A S5 Recording / recording · / paused · stop overlay · / recording · A5 Recording / drawer list |
| Other chart rows | tap | nothing |
| Sheet back | tap | the list of the same screen and state |
| A S5 drawer edge | tap or drag up | A5 Recording or Paused / drawer list |
| A5 puller | drag down | A S5 in the matching state |
| Bar pause / play | tap | the same frame in the other state (from / medications: A S5 Recording / paused) |
| A S5 device pill | tap | the matching microphone frame |
| Microphone frame | row or scrim | back to the calling frame |
| Every Stop | tap | the stop overlay |
| Stop overlay | Stop Recording / Cancel | A S7 Sending / close |
| A S8 Sent / sent | Next Patient | **A4 Colette / landing, after Marcus** |
| A S8 Sent / sent | Back To Schedule | A S2 Home / schedule, Marcus sent |
| A S8 Sent / Yusuf | Next Patient | **A4 Colette / landing, after Yusuf** |
| A S8 Sent / Yusuf | Back To Schedule | A S2 Home / schedule, both sent |
| A4 Colette list, both | "Patients" | the schedule frame of its own path |
| A4 Colette list, both | Patient summary row | **that path's A4 Colette / summary** |
| A4 Colette list, both | Medications row | nothing |
| A4 Colette summary, both | drawer back chevron | that path's A4 Colette list |
| A4 Colette summary, both | "Patients" | the schedule frame of its own path |
| A4 Colette, all four | Start Recording | nothing |
| A4 Colette, all four | device pill | A S3 Microphone |
| A S8 failed | Retry / Back To Patients | A S7 Sending / A S2 Home / schedule |

**Schedule**

| From | Tap | To |
|---|---|---|
| Yusuf Bahri row 9:15, on / schedule, / schedule, top and / schedule, Marcus sent | tap | **A4 Yusuf / landing, not sent** |
| Marcus Vance row 11:00, on / schedule and / schedule, top | tap | **A4 Patient / landing** |
| Marcus Vance row 11:00, on / schedule, Marcus sent | tap | nothing, it reads Sent |
| Yusuf Bahri row 9:15, on / schedule, both sent | tap | nothing, it reads Sent |
| **Colette Mwangi row 11:30, on / schedule, Marcus sent** | tap | **A4 Colette / landing, after Marcus** |
| **Colette Mwangi row 11:30, on / schedule, both sent** | tap | **A4 Colette / landing, after Yusuf** |
| Colette Mwangi row 11:30, on / schedule and / schedule, top | tap | nothing |
| Every other row, on all four | tap | nothing |
| Schedule search field | tap | A S2 Home / searching |

**Counts now:**

| Page | Frames | Reactions |
|---|---|---|
| Account screens | 49 screens | 207 across 200 |
| Archive · Visit screens | 26 | 84 across 81 |
| Archive · Screens | 18 | 42 across 41 |

No cross-page edges, and nothing on `Account screens` points at an archived frame. 45 destinations. Starting points: `Account device` 103:2320 and `Schedule` 204:4082.

---

## 8. Questions for the real build

- Can audio input change during a live recording without splitting the capture?
- Are unsent recordings tied to the account? The prototype assumes yes.
- Where does audio live between Stop and a confirmed send, and for how long?
- What happens if the app dies mid-recording?
- **Schedule:**
  - which provider and day, and how often it refreshes
  - how a recording is matched to an appointment, and what happens when it can't be
  - which appointment types come through
  - where "today" begins and ends across time zones
  - whether "scrolled to now" re-anchors during the day
- **Chart:**
  - which desktop sheets come to mobile
  - whether chart data is fetched once or live
  - whether generated summaries keep desktop's feedback path
- Do search results match what desktop patient search shows?
- Do note types come from the provider's desktop setup?
- Reset link expiry (30 minutes is placeholder copy).
- **Values that code doesn't have yet:**
  - `ArrowDropDown` for selectors
  - 32 px sheet corners
  - the sheet keyline
