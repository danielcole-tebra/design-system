# Mobile ambient capture: spec

The one spec for the mobile ambient capture prototype. It says what the app is, what Daniel has ruled, and how it is built. It replaces `mobile-ambient-capture-spec.md`, `mobile-visit-drawer-spec.md`, `mobile-account-spec.md` and `mobile-schedule-spec.md`, which are archived.

What's next, open questions and batch history live in `mobile-plan.md`. When a batch finishes, this file is updated to match the file, and the plan moves the batch to done.

File: Mobile ambient capture prototype, TP5KrQtY0T5IcMNqi375So. Library: YX2n4YLrEpBXNbcc73T6dw. Sheet source (read only): NPVE target fdCQVFdvOByaOYIJYag0d6.

Last updated after the schedule row was built.

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
- Status language is Sending, Sent and Failed to send. Never "synced", "complete" or "ready". The phone reports only on the handoff.

**Account**

- One account, one practice. The practice is shown as a fact, never a choice.
- Demo provider: Dr. Sarah Bennett, Windsor Family Medicine, sbennett@windsorfm.com, initials SB. The avatar is a salmon disc with two initials.
- Signing out is never blocked. With an unsent recording, a warning offers Retry first and Sign out anyway.
- Unsent recordings stay on the phone for the next sign-in. An unsent row is retried by tapping the whole row.

**Home and schedule**

- Search is the spine and stays unchanged. The schedule is a shortcut above the fallback, not a replacement for it.
- The schedule is a set of ways into a patient, not a record. It shows the schedule as it stands and never reasons about it.
- A row knows the patient, the time, whether the visit is telehealth, and whether a recording exists. A past row with no recording is quiet: no status, no explanation.
- The status is the only pill on a schedule row. Telehealth is shown as text with an icon, not a Chip: a separator, a 16 `VideocamOutlined` and the word "Telehealth", on the time line, in secondary ink.
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
- On the schedule, Marcus Vance's row is the Failed to send row. The next upcoming appointment belongs to another patient and, like every row except Marcus's, does nothing when tapped, because his is the only patient with a chart in the file.
- `A S2 Home / unsent` is unchanged. Its row still retries straight to Sending.

**Patient chart**

- The drawer is the Patient chart. It works by drilling in, the same on the patient screen and the recording screen: the list is home, a sheet opens from its row, and back returns to the list.
- Opening a patient lands on the chart list, with no row highlighted.
- The drawer tucks away by dragging down on the recording screen. Dragging up from the collapsed edge, which reads "Patient chart", opens the list.
- Titles have a divider under them in both states.
- Chart rows with no sheet yet, and the Template pill, stay in place and do nothing when tapped.
- Every sheet is reachable before recording.
- **Ported sheets** keep their content as is. Only identifying details change, to match Marcus Vance, DOB 03/14/1972. Every action is dropped.

**Recording**

- The microphone can change during a recording. The device pill is the mic glyph and a selector triangle only; device names appear only in list rows.
- Start Recording sits on its own white surface with a divider along its top edge.
- The pause and stop controls on the recording bar sit on the timer line.
- The stop confirmation is an overlay, and Cancel returns to the screen the provider was on. Cancelling from pause resumes recording. Pause has no confirmation.
- The Sending loader uses the library's teal, since the library loader has no grey.

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
| Scrim | `rgba(0, 0, 0, 0.5)` |

---

## 4. Pages

| Page | What it is |
|---|---|
| `Account screens` 103:2319 | **The full app.** 39 frames (35 screens, 4 proof scaffolds). All new work goes here. Starting points: Visit device, Account device, Unsent recording |
| `Visit screens` 43:705 | The Patient chart demo, without account or schedule. 26 frames. Starting point: Visit device |
| `Screens` 1:3 | The original four-job prototype. 18 frames. Never edited |
| `Components` | Local components, shared by all pages |
| `Foundations` | Frame template and colour table |

Frame names start with the page's letter: `A` for Account screens, `V` for Visit screens, none for Screens. No reaction crosses pages.

---

## 5. Components

Library components are used as they are: Button, Text field, Alert, Dialog, Circular progress, Icon button, Chip, List/Item, Tebra wordmark.

| Local component | Node | What it is |
|---|---|---|
| `Account/Avatar` | 108:1212 | 40 disc `color/secondary/main`, initials `color/secondary/contrastText` (4.53 : 1), Akkurat LL Regular 20/20, `Initials` default SB |
| `Account/Top bar` | 114:600 | `Visit/Top bar` with the avatar as the action: ink 334 to 374, tap target 60 x 48 at x 330 |
| `Account/Microphone sheet` | 121:1793 | Drawer top, title "Microphone", three rows (iPhone microphone selected, AirPods Pro, Wired headset), 34 safe area |
| `Account/List row` | 163:1444 | 390 x 72, library `List/Item` (two lines) filling 358, `ChevronRight` in `color/grey/600` ending at 374 |
| `Visit/Top bar` | 93:2734 | `Config`: Title with action, Back with title, Back only. Each variant 390 x 64 |
| `Visit/Recording bar` | 48:918 | `State`: ready, recording, paused. Section 6.4 |
| `Visit/Drawer` | 48:897 | `Mode`: list, sheet. `Sheet` swap, `Stroke`, `Closable` (no visible effect). Section 6.4 |
| `Visit/Drawer edge` | 70:1480 | 390 x 112, label "Patient chart" |
| `Visit/Chart row` | 177:2858 | 390 x 48, library `List/Item` (one line) and `ChevronRight` ending at 374 |
| `Visit/Sheet/Patient summary` | 50:969 | 358 x 1141, ported from NPVE 672:7906 |
| `Visit/Sheet/Placeholder` | 48:141 | Stand-in for sheets not yet ported |
| `Visit/Icon/…` | Components | Exact MUI paths: ArrowDropDown 59:493, ChevronLeft 159:1103, ChevronRight 159:1105, ExpandMore 159:1107 (reserved), PauseCircle 74:531, StopCircle 74:534, PlayCircle 74:537, Cancel 74:540, VideocamOutlined 206:830 |
| `Session row` | 4:454 | 390 x 72. Name 16/24 and time 14/20 in a column, `Status chip` trailing, bottom divider. `State`: default, failed |
| `Status chip` | 4:395 | Library Chip, medium, outlined. `Status`: Sending, Sent, Failed to send |
| `Schedule/Row` | 196:777 | 390 x 72 on `color/background/paper`, like `Session row`. Time line: the time, then 8, then the Telehealth group — `·`, a 16 `VideocamOutlined` and the word, all body2 14/20 on `color/text/secondary`, 4 apart, 97 wide, driven by the `Telehealth` boolean. Trailing `ChevronRight` (159:1105, 24, `color/grey/600`, ink ending at 374, right padding 8). Status chip ends at 342. `Name`, `Time`, `Telehealth`, `Status` (none, sending, sent, failed). The old Telehealth Chip is hidden and labelled SUPERSEDED |
| Search result row, Level meter, Field buttons | Components | From the original build |

Superseded components are labeled and kept, never deleted. The list is in FLAGS.md.

---

## 6. Screens

Each part lists its frames on `Account screens`. Visit screens has the same Patient chart and recording frames with `V` in place of `A`.

### 6.1 Sign in

- **A S1 Login / default, / error, / after sign out.**
  - Full-bleed `#004852` field, reversed wordmark, white card holding Email, Password and Sign In.
  - The error state adds an error alert inside the card.
  - "Forgot Password?" is a text Button, right edge at 350, with 16 above and below.
  - The card is 282 tall, 366 on error.
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

**A S2 Home frames.**

| Frame | What it shows |
|---|---|
| / empty | Nothing below search |
| / sessions | "Today" and three session rows, one Failed |
| / results | Search results |
| / no results | "No patients match" |
| / searching | Search in progress |
| / after first capture | The newest row reads Sent |
| / after failed capture | The newest row reads Failed to send |
| / unsent | "Yesterday", one failed Marcus Vance row at 4:30 PM. The whole row taps to Sending |
| / schedule | "Today" and eight rows, drawn scrolled to the first upcoming |
| / schedule, top | The same list at its start |
| / empty day | "No appointments today" |

**Schedule, built 2026-09-17.** All three clone `A S2 Home / empty`, so the top bar, avatar and search at rest carry over, and each keeps that frame's two reactions (avatar to Account, search to Searching).

- **A S2 Home / schedule** 204:4082 and **A S2 Home / schedule, top** 204:4127 hold a `Schedule scroll` frame at y 191, **390 x 619**, clipping, `overflowDirection` VERTICAL, reaching the 34 bottom safe area. Inside it a `Schedule content` stack, 390 x 616, holds the "Today" `List heading` (40) and eight `Schedule/Row` instances (72 each).
- **/ schedule, top** draws the stack at y 0. **/ schedule** offsets it to **y -328** so the first upcoming row, Yusuf Bahri at 11:00 AM, sits directly below the search block.
- **A S2 Home / empty day** 204:4172 shows "No appointments today", built as a clone of `No patients match` 103:2395.

The eight rows, in time order. Times place the present between 10:20 and 11:00 AM.

| Time | Name | Status | |
|---|---|---|---|
| 8:30 AM | Dolores Okonkwo | Sent | |
| 9:15 AM | Marcus Vance | Failed to send | the only row that will be wired |
| 9:45 AM | Priya Raghunathan | none | past and quiet |
| 10:20 AM | Renata Ilves | Sent | off schedule, placed by when it started |
| 11:00 AM | Yusuf Bahri | none | first upcoming |
| 11:30 AM | Colette Mwangi | none | Telehealth |
| 1:15 PM | Ingrid Solheim | none | |
| 2:00 PM | Theo Abernathy | none | |

Renata Ilves, Yusuf Bahri, Colette Mwangi, Ingrid Solheim and Theo Abernathy are invented placeholders, logged in FLAGS.md as `mobileSchedule_placeholderRowsAndTimes`.

**At eight rows the list does not overflow.** The stack is 616 in a 619 viewport, so nothing can scroll and `/ schedule` shows four rows above 331 px of empty page. See the LOG entry for the batch.

What a schedule row shows depends on the clock and on whether a recording exists:

| Time passed | Recording | Row shows |
|---|---|---|
| No | No | Upcoming, no status |
| Yes | Yes | Sending, Sent or Failed to send |
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

**Patient screen, A4 Patient / list, / summary, / placeholder.** Page background, with the ready recording bar above the drawer.

**Not sent, A4 Patient / list, not sent 200:6707.** The same screen with a library Alert between the pills row and the drawer, for a recording that failed to send. Alert `variant=standard, severity=error`, 358 x 48 at (16, 201), reading "Recording from 9:15 AM not sent", with a text Button "Retry" (`color=primary, size=small`) in the Alert's own action slot. The **whole alert** is the tap target, not the button. 16 of beige above it and 16 below, the same gap the pills row already had to the drawer. The drawer moves to y 265 and shortens to 579 so its bottom stays at 844; the footer band and the 122 bottom padding do not move. One fewer chart row shows before the list scrolls.

**Ready bar**, 390 x 201:

- Top safe area 47.
- "Patients" link with a 16 `ChevronLeft`, 103 x 36 at x 4.017.
- "Marcus Vance" with "DOB 03/14/1972" beside it in secondary, on one line at y 91.
- Pills row at y 135:
  - Template pill, 200 x 38 at x 16: list icon, "Template: SOAP", `ArrowDropDown`.
  - Device pill, 82 x 38 at x 224: mic glyph and `ArrowDropDown`, no label.

**Drawer**, both modes 390 x 621, white, 32 top corners.

- **Shared top.** A 30 x 6 `color/grey/400` puller at (180, 8), then a 48 title row with a 1 px divider below.
- **List mode.**
  - "Patient chart" at (16, 12).
  - Fourteen chart rows, none selected: Patient summary, Allergies, Medications, Problems, and Sheet 5 to 14 as placeholders.
  - The list scrolls.
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
  - Body: "The note for Marcus Vance is being generated. You'll find it in your desktop queue."
  - Next Patient.
- **A S8 Sent / failed.**
  - Error alert.
  - Heading: "Couldn't send recording".
  - Body: "Your recording is saved on this device. The note hasn't reached your desktop yet."
  - Back To Patients (text), above Retry.

---

## 7. Wiring

**Sign in and account**

| From | Tap | To |
|---|---|---|
| Login | Sign In | A S2 Home / sessions (after sign out: / unsent) |
| Any login | Forgot Password? | A S10 |
| A S10 | back / Send Link | back / A S11 |
| A S11 | Back To Sign In | A S1 Login / default |
| A S2 Home frames | avatar | A S9 Account (from / unsent: A S9 Account / unsent) |
| A S2 Home / unsent | Marcus Vance row | A S7 Sending |
| A S9 Account, both | back / Microphone | back / A S3 Microphone |
| A S9 Account | Sign Out | A S1 Login / default |
| A S9 Account / unsent | unsent row / Sign Out | A S2 Home / unsent / sign-out warning |
| Warning | Retry / Sign Out Anyway / scrim | A S7 Sending / A S1 Login / after sign out / A S9 Account / unsent |

**Home, chart and recording**

| From | Action | To |
|---|---|---|
| Search result | tap | A4 Patient / list |
| A4 "Patients" | tap | home |
| A4 device pill | tap | A S3 Microphone |
| A4 Template pill | tap | nothing |
| A4 Start Recording | tap | A S5 Recording / recording |
| A4 Patient / list, not sent — the whole not-sent alert | tap | A S7 Sending |
| Chart row, Patient summary | tap | the summary frame of the same screen and state |
| Chart row, Medications | tap | A4 Patient / placeholder or A5 Recording / medications. Inert on the paused list |
| Other chart rows | tap | nothing |
| Sheet back | tap | the list of the same screen and state |
| A S5 drawer edge | tap or drag up | A5 Recording or Paused / drawer list |
| A5 puller | drag down | A S5 in the matching state |
| Bar pause / play | tap | the same frame in the other state (from / medications: A S5 Recording / paused) |
| A S5 device pill | tap | the matching microphone frame |
| Microphone frame | row or scrim | back to the calling frame |
| Every Stop | tap | the stop overlay |
| Stop overlay | Stop Recording / Cancel | A S7 Sending / close |
| A S8 sent | Next Patient | home |
| A S8 failed | Retry / Back To Patients | A S7 Sending / home |

**Schedule, to be wired**

| From | Tap | To |
|---|---|---|
| Marcus Vance row, which is the Failed to send row | tap | A4 Patient / list, not sent |
| Every other row, the next upcoming included | tap | nothing |

**Counts now:**

| Page | Frames | Reactions |
|---|---|---|
| Account screens | 43 (39 screens, 4 proof scaffolds) | 126 across 123 |
| Visit screens | 26 | 84 across 81 |
| Screens | 18 | 42 across 41 |

No cross-page edges.

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
