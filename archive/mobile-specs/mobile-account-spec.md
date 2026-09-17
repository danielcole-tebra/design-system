# Mobile ambient capture: account addendum

Second addendum to `mobile-ambient-capture-spec.md`, after `mobile-visit-drawer-spec.md`. Account screen, sign out with unsent warning, forgot password, microphone control on the recording screen, and the shared fixes made along the way. Built on page `Account screens` 103:2319 in file TP5KrQtY0T5IcMNqi375So.

Consumer: the Figma builder agent, and anyone reading what was decided. Section 1 is context. Section 2 onward records the build as it stands.

Revision 5, record of the build through K2. Changes from revision 4: no close button on any drawer or sheet; the patient drawer is the Patient chart (recorded in `mobile-visit-drawer-spec.md` revision 9); the microphone sheet closes by choice or scrim; the two overlay settings are done; counts and batch record through K2.

---

## 1. Intent and rulings

A provider hits account and sign out on day one. This addendum adds the smallest set that closes that gap, and moves the microphone control to the recording screen.

**Rulings from Daniel:**

- One account, one practice. The practice is shown as a fact, never a choice.
- Demo provider: Dr. Sarah Bennett, Windsor Family Medicine, sbennett@windsorfm.com, initials SB.
- The library and code are followed where they can be and overruled where their design is wrong. Overrides are logged as Daniel's decisions.
- The avatar is a local redraw, `Account/Avatar`: salmon disc, two initials, Akkurat LL Regular.
- **The microphone:**
  - It can change during a recording.
  - The device pill is the mic glyph and a selector triangle only, never a label.
  - Device names appear only in list rows.
- **Signing out is never blocked.** With an unsent recording, a warning offers Retry first and Sign out anyway.
- Unsent recordings stay on the phone for the next sign-in. An unsent row is retried by tapping the whole row.
- Library Buttons render Title Case. Button copy ships that way.
- **Glyphs.** Every glyph matches its `@mui/icons-material` path exactly.
  - Selectors, as in form controls, use `ArrowDropDown`.
  - Expand in place uses `ExpandMore`.
  - Navigation uses `ChevronLeft` / `ChevronRight`.
  - The library's drawn `DownCaret`, `LeftCaret` and `RightCaret` are not used. This overrides code, which uses `DownCaretIcon`.
- **Sheets and drawers:**
  - They have 32 top corners and one shared top (puller 30, title row 48) on every screen.
  - **No close (X) button on any drawer or sheet.** The patient drawer tucks away by dragging down. The microphone sheet closes by choosing a device or tapping the dimmed area.
- **The patient drawer is the Patient chart,** navigated by drilling in. Its rulings are in `mobile-visit-drawer-spec.md` section 1 and apply identically on this page.
- **The stop confirmation is an overlay.** Cancel returns the provider to the screen they were on.

**Not in scope:** QR or desktop handoff sign-in, biometric sign-in, multiple practices, profile editing, notification settings. The schedule on home is `mobile-schedule-spec.md`.

---

## 2. Conventions

All CLAUDE.md rules apply. Additionally:

- **Page.** `Account screens` holds clones of every Visit frame (`V S…` became `A S…`, `V4`/`V5` became `A4`/`A5`) plus the new frames. No reaction crosses pages.
- **Clones:**
  - Compare frame-own reactions of source and clone before re-applying (trap 35).
  - Replay reactions by layer name after a component swap (trap 42).
  - Read `flowStartingPoints` after cloning; a clone duplicates any starting point its source owns.
  - A resting field state needs visibility, stroke and label ink reset, checked in pixels (trap 44).
- **Components.** Shared components stay shared across pages. New ones are `Account/`-prefixed. Changes to shared components are made there only when Daniel rules they apply to both pages.
- **Optical edge.** Screen-edge ink at x 16 and x 374; tap targets may bleed to the screen edge.
- **Superseded nodes** are hidden and labeled, never deleted.
- **Record.** Composition decisions in COMPOSITIONS.md, open findings in FLAGS.md, history in LOG.md.

---

## 3. Shared components

| Component | Node | What it is |
|---|---|---|
| `Account/Avatar` | 108:1212 | 40 disc `color/secondary/main`, initials `color/secondary/contrastText` (4.53 : 1), Akkurat LL Regular 20/20 raw, property `Initials` default SB |
| `Account/Top bar` | 114:600 | Clone of `Visit/Top bar`. Title with action carries the avatar, ink 334 to 374, tap target 60 x 48 at x 330 flush to 390 |
| `Account/Microphone sheet` | 121:1793 | Drawer chrome (30 + 48), title "Microphone", close hidden, three `List/Item` rows (iPhone microphone selected, AirPods Pro, Wired headset), 34 safe area |
| `Account/List row` | 163:1444 | 390 x 72, exposed library `List/Item` (Lines=Two) filling 358, `ChevronRight` ink 366.59 to 374, `color/grey/600` |
| `Visit/Drawer`, `Visit/Drawer edge`, `Visit/Chart row`, `Visit/Recording bar` | shared | The Patient chart and recording bar. Recorded in `mobile-visit-drawer-spec.md` sections 4 to 6 |
| `Visit/Icon/ArrowDropDown (MUI)` | 59:493 | Selector triangle, exact MUI path |
| `Visit/Icon/ChevronLeft (MUI)` | 159:1103 | Exact MUI path. Top bar back buttons, the Patients link, sheet back |
| `Visit/Icon/ChevronRight (MUI)` | 159:1105 | Exact MUI path. Account list rows, chart rows |
| `Visit/Icon/ExpandMore (MUI)` | 159:1107 | Exact MUI path. Not placed; reserved for expand in place |

---

## 4. Microphone

- **Pill** on A S5 recording and paused, and on the patient ready bar:
  - Library Button, mic glyph and `ArrowDropDown` end icon, no label, 82 x 38. The end icon renders at the Button's 16 slot.
  - On A S5 it is centred at x 154, y 557 (recording) and 569 (paused).
- **Sheet frames** `A S5 Recording / microphone` and `A S5 Paused / microphone`:
  - Scrim, sheet pinned to the bottom, pill hidden underneath.
  - The pill opens them. A row or the scrim returns to the calling frame.
- **A S3 Microphone** stays the pre-recording control, with its back arrow. Its mid-recording footnote is hidden on this page only.

---

## 5. Account and sign out

- **A S9 Account:**
  - Back with title "Account".
  - Identity block, 60 tall: avatar at x 16, then "Dr. Sarah Bennett" Regular 16/24 and "Windsor Family Medicine" Regular 14/20 secondary at x 72.
  - A 1 px `color/divider` rectangle beneath (no library Divider; GAP).
  - Microphone as an `Account/List row`.
  - Sign Out: Button contained / primary (renders outlined), 358 wide, above the safe area.
- **A S9 Account / unsent.** Adds "1 recording not sent", "Marcus Vance · Yesterday, 4:30 PM" above Microphone.
- **A S9 Account / sign-out warning.** xs Dialog 326 x 238 over the scrim, as S6 was built.
  - Title: "1 recording not sent".
  - Body: "Marcus Vance, yesterday at 4:30 PM. It stays on this phone, and you can send it the next time you sign in."
  - Actions: Sign Out Anyway (text), Retry (contained / secondary).
- **A S2 Home / unsent.** Search at rest, heading "Yesterday", one failed Session row for Marcus Vance at 4:30 PM. The whole row taps to Sending.
- **A S1 Login / after sign out.** Visual clone of the login. Its Sign in goes to the unsent home, which is how the demo loop returns there.

---

## 6. Forgot password

- **Link** on all three login frames:
  - Text Button "Forgot Password?", right edge at 350, 16 above and below (the card's own spacing).
  - The card grows from 230 to 282, and from 314 to 366 on error.
- **A S10 Forgot password:**
  - Back with title "Reset password".
  - Body: "Enter your email and we'll send a link to reset your password."
  - Email field at rest, empty.
  - Send Link, contained / secondary, 358 wide.
- **A S11 Reset sent:**
  - A S8 Sent layout without its icon, readout centred 32 above the frame centre.
  - Heading: "Check your email".
  - Body: "We sent a reset link to sbennett@windsorfm.com. It expires in 30 minutes."
  - Action: Back To Sign In.

---

## 7. Stop confirmation

On both pages the stop confirmation is an overlay frame holding only the Dialog: `V S6 … / overlay` 166:5030 and `A S6 … / overlay` 166:5058. All seven callers per page open it as an overlay. Stop Recording goes to Sending; Cancel closes it. The old S6 frames are superseded and hidden, and nothing leads to them.

Both overlay frames close on click outside and have a 50% black background, set by hand and read back in K1. The background is a literal colour, not a variable (GAP).

---

## 8. Wiring and starting points

| From | Tap | To |
|---|---|---|
| Every A S2 Home frame except / unsent | avatar | A S9 Account |
| A S2 Home / unsent | avatar | A S9 Account / unsent |
| A S2 Home / unsent | Marcus Vance row | A S7 Sending |
| A S9 Account (both) | back | BACK |
| A S9 Account (both) | Microphone | A S3 Microphone |
| A S9 Account | Sign out | A S1 Login / default |
| A S9 Account / unsent | 1 recording not sent | A S2 Home / unsent |
| A S9 Account / unsent | Sign out | Sign-out warning |
| Warning | Retry | A S7 Sending |
| Warning | Sign out anyway | A S1 Login / after sign out |
| Warning | scrim | A S9 Account / unsent |
| A S1 Login / after sign out | Sign in | A S2 Home / unsent |
| Every login frame | Forgot password? | A S10 |
| A S10 | back / Send link | BACK / A S11 |
| A S11 | Back to sign in | A S1 Login / default |
| A S5 recording / paused | pill | matching microphone frame |
| Microphone frames | row, scrim | calling frame |
| Every Stop caller, both pages | Stop | S6 overlay |
| S6 overlay | Stop Recording / Cancel | Sending / close |

Patient chart wiring (search result to the chart list, drill-in, drag up and down) is identical to `mobile-visit-drawer-spec.md` section 9, on the A frames.

Starting points: **Visit device**, **Account device** on A S1 Login / default, **Unsent recording** on A S2 Home / unsent, each once.

State after K2:

| Page | Frames | Reactions | Text |
|---|---|---|---|
| Account screens | 35 | 114 across 111 (106 click, 7 drag, 1 timeout) | 707 / 12,767 |
| Visit screens | 26 | 84 across 81 | 524 / 10,169 |
| Screens | 18 | 42 across 41 | |

No cross-page edges.

---

## 9. Batch record

| Batch | Scope | Commit |
|---|---|---|
| A0 | Audit | eeadd8f |
| A1 | Page and clone | 5e6be23 |
| A2a, A2a.1 | Avatar | b8a82d8, 6e3168d |
| A2b, A2c, A2d | Top bar, swap, pill | d37716a, 668dd78, ea8dc07 |
| R1 | COMPOSITIONS.md backfill | e4ab16d |
| A3a, A3b | Microphone sheet, 32 corners, frames | 8dc8f1e, 221430a |
| A4a | Account and unsent frames | 4d92b87 |
| D1, D1.1, D1.2 | One drawer top; glyph correction | 88e67e6, 7094be7, 9efd7a7 |
| P1 | MUI chevrons, identity type | 9b83c48 |
| A4b | List row, divider, warning, wiring | 55b6a6e |
| A5 | Forgot password | 42eefc2 |
| C1 | Stop overlay, A S11 position | 6c1b3d2 |
| N1 | Patient chart drill-in, no close buttons | pending |
| Audit, K1, K2, band audit | Drawer audit and cleanup, both pages | pending |

---

## 10. Open

- **Play both pages on a phone:**
  - the unsent loop
  - the chart drill-in while recording
  - the microphone sheet
  - stop and cancel from a paused drawer
- Judge the 16 px pill triangle and the 40 avatar at arm's length.
- **Library batch:**
  - add the MUI glyphs and retire the drawn carets
  - `List/Item` has no trailing slot
  - there is no Divider component
- The A4 footer band ids are recorded nowhere (FLAGS.md GAP).

## 11. Questions for the build

- Can audio input change during a live recording without splitting the capture?
- Are unsent recordings tied to the account, so another provider on the same phone never sees them? The prototype assumes yes.
- Where does audio live between Stop and a confirmed send, and for how long?
- Reset link expiry (30 minutes is placeholder copy).
- Library Button capitalises every label. System strings such as device names must never be Button labels.
- Code uses `DownCaretIcon` for selectors; design direction is MUI `ArrowDropDown`.
- Code has no radius or keyline for sheets and drawers; 32 and the divider stroke are new values.
