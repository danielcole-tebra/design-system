# Action row discovery

Discovery pass, 2026-08-18. **Nothing was built.** Enumerated from source in `C:\Code\web-app-v2`,
mechanically where possible (`action-row-scan.py` in this repo walks every `.tsx` under `packages/`
and parses each `<DialogActions>` block), not from `DRAWER-EXEMPLARS.md`, `PAGE-TEMPLATES.md` or any
other prior report in this repo.

**Scope.** A row of buttons anchored at the bottom of a container that has a body above it: dialogs,
drawers, side panels, confirmation prompts. Page-level toolbars and the patient header's action row
are out of scope and are named where the sweep caught them so the exclusion is visible.

**Storybook is unreachable.** There is no `node_modules` anywhere in the checkout, so Storybook
cannot be built and **the installed `@mui/material` source cannot be read**. Every MUI default below
is marked **pinned**: transcribed from knowledge of MUI v5, not from the installed package. Nothing
pinned should be promoted into a value column until a render or the installed source confirms it.

**Two version disagreements, both pinned, neither resolved here:**

| | Recorded in `CHAT-HANDOFF.md` | Found in the checkout today |
|---|---|---|
| `@kareo-engineering/design-system` | 0.18.3, "a minor version behind shipped" | **0.19.7**, `CHANGELOG.md` dated 07/31/2026 |
| `@mui/material` | 5.15.12 | **four** resolutions in `yarn.lock`: 5.15.12 (design-system), 5.13.3 (most product packages), 5.13.5, 5.14.11 |

The stale-checkout item in the handoff's open decisions may already be closed. Not verified — the
version string is evidence the checkout moved, not proof of what moved with it. The four MUI
resolutions matter because this report assumes `DialogActions` renders identically across all four;
that assumption cannot be checked without `node_modules`.

---

## 1. What the library provides

**Nothing. There is no Tebra wrapper for `Dialog`, `DialogActions`, or any container footer.**

`packages/design-system/src/index.ts` exports `cobranding`, `components`, `theme`, `utils`. The
component barrel (`components/index.ts`) exports `DataGridFilter`, `Feedback`, `avatars`, `ReadMore`,
`TrialFeatureGate`, `icons`, `illustrations`, `marketingIcons`. No dialog, no drawer, no footer.

Product therefore imports `Dialog`, `DialogActions`, `DialogContent` straight from `@mui/material` in
every case. **113 of 113 product action rows use MUI directly.**

### What the theme overrides

`overrides/index.ts` registers 37 override modules. `DialogOverrides.ts` is the whole of the dialog
opinion and it is six lines:

```ts
export default { MuiDialog: { defaultProps: { maxWidth: "sm" as any } } };
```

**There is no `MuiDialogActions`, `MuiDialogContent`, `MuiDialogTitle` or `MuiDrawer` entry.** The
action row is left at MUI defaults in their entirety.

The asymmetry worth recording: **`CardActionsOverrides.tsx` does exist**, and its single job is
`justifyContent: "flex-end"` on `MuiCardActions`. So the library has a stated opinion about where a
*card's* actions sit, and no stated opinion about where a *dialog's* actions sit — which lands in the
same place only because MUI's `DialogActions` already defaults to `flex-end` (pinned).

### What the Button overrides do to the vocabulary

`ButtonOverrides.ts` sets `defaultProps.variant = "contained"`, so a bare `<Button>` is contained.
The colour meanings are inverted relative to what the prop names suggest:

| Prop | `styleOverrides` key | Renders as |
|---|---|---|
| `<Button>` (default primary) | `containedPrimary` | **White fill**, 1px `core.main` border, `core.contrastText` ink — the quiet button |
| `color="secondary"` | `containedSecondary` | **Filled `secondary.main`** `#FF8D6E`, 1px same-colour border — the loud button |
| `color="error"` | `containedError` | Filled `error.main` `#D83B4D` |
| `variant="text"` | `text` | `primary.main` ink `#004852`, `primary[100]` hover |
| `variant="text" color="error"` | `textError` | `error.main` ink |

`theme.ts` narrows `ButtonPropsColorOverrides` to exactly four colours: `primary`, `secondary`,
`inherit`, `error` (`success`, `info`, `warning` are set `false`).

**The gap: `outlined` has no `styleOverrides` entry at all.** Of the 12 variant × colour combinations
the type allows, the library styles 5. Every `variant="outlined"` button in the product — including
the destructive `Delete` in the two most complete footers (§5) — falls through to MUI's default
outlined styling, disabled state included.

`@mui/lab` is a declared dependency (`^5.0.0-alpha.166`), so `LoadingButton` is available. No
`MuiLoadingButton` override exists, so its loading indicator slot is unstyled by Tebra.

### Drawer and panel footers in the library

**One exists.** `components/DataGridFilter/FilterGroupDrawer.tsx` ends with:

```tsx
<Divider sx={{ mx: -2 }} />
<Button color="primary" variant="outlined" fullWidth onClick={onReset}>Reset Filters</Button>
```

A full-bleed divider (negative margin cancelling the container's `p: 2`) and a single full-width
outlined button. It is the library's only container footer, it is a single-action row, and it uses
the one variant the library does not style. Its only consumer is
`documents-ui/src/components/DataGridActionsRow.tsx:111`. **It also does not stay pinned — see §7,
A-1.**

`DataGridFilter/FilterButton.tsx` is a second drawer in the library with no action row at all
(`<Button` count: 0).

### What the stories show

Per the file's own rule that stories declare membership: **five dialog stories and a drawer story
set, and they disagree with each other.**

`stories/Dialog/stories/` — `AlertDialog`, `ConfirmationDialog`, `DraggableDialog`, `FormDialog`,
`ScrollDialog`. Every one imports `Dialog`/`DialogActions` from `@mui/material`. Common to all five:

- **A `<Divider />` is hand-placed immediately before `<DialogActions>` in all five stories.** It is
  in no component and no override. The library's own canon includes a separator that the library
  does not ship.
- Cancel/dismiss is `variant="text"`; the committing action is `color="secondary"`; the destructive
  action ("Yes, Override") is `color="error"`.

Where they disagree: **four of the five wrap the buttons in `<Box m={1}>`; `ScrollDialog` does not.**
That wrapper is not cosmetic. MUI's `DialogActions` spacing rule targets sibling children (pinned:
`& > :not(style) ~ :not(style) { margin-left: 8px }` in 5.15, `& > :not(:first-of-type)` in earlier
5.x — the consequence is identical). With one `Box` child the rule matches nothing and **no gap is
produced**. `AlertDialog.example.tsx:63` patches around exactly this with an inline
`style={{ marginRight: 8 }}` on its middle button. So the stories contain both the bug and its
workaround, three lines apart. Recorded as **A-11**.

The `Box m={1}` also adds 8 to the row's own 8, making the story's effective padding 16 — the number
26 product rows reach by a different route (§8).

`stories/Drawer/Drawer.example.tsx` defines a **private, unexported** `DrawerFooter`:

| Property | Value | Note |
|---|---|---|
| position | `fixed`, `bottom: 8%` | `8` is commented `// taskbar height` but written as a percentage |
| width | `288px` | hardcoded; 320 drawer − 2 × 16 |
| padding | `2` → 16 | theme spacing |
| justifyContent | **`center`** | disagrees with `DialogActions` and `CardActions`, both `flex-end` |
| gap | none | `Cancel` and `Apply Controls` touch |
| divider / elevation | none | |

Its consumers reserve space for it by hand — `<Box marginBottom={7}>` (56px) inside the checkbox
group. Single-action variant present: `PersistentFilterDrawer` renders only `Apply Filters` at
`width: 280px`.

Aside, recorded because it is a source contradiction: `theme/theme.ts:1` reads
`// TODO: Add dialog stories`, above a theme whose file tree contains five of them.

---

## 2. How many action rows there are

**113 product `<DialogActions>` rows across 107 files in 21 packages**, plus 7 in design-system
stories (120 blocks total). Full paths grouped by package: **Appendix A**.

| Package | Rows | | Package | Rows |
|---|---:|---|---|---:|
| admin-ui | 22 | | patient-statements-ui | 2 |
| appointment-workflow-ui | 20 | | claim-denial-predictor-ui | 1 |
| messages-ui | 10 | | medications-ui | 1 |
| clinical-system | 7 | | patient-intake-admin-ui | 1 |
| documents-ui | 7 | | patient-intake-ui | 1 |
| notes-ui | 7 | | treatment-plan-ui | 1 |
| ordering-system | 7 | | worklist-ui | 1 |
| patient-history-ui | 7 | | billing-system | 4 |
| composition-ui | 2 | | patient-engagement-ui | 4 |
| electronic-case-reporting-ui | 2 | | payment-subscription-ui | 4 |
| facesheet-ui | 2 | | | |

Zero use a library component, because there is none. Four reusable shells exist, each local to one
package:

| Shell | Consumers | Has a body scroll container |
|---|---|---|
| `billing-system/src/components/Dialogs/ConfirmationDialog.tsx` | 4 (`ConfirmCancelationDialog`, `ConfirmChangeDialog`, `ErrorDialog`, `RefreshDialog`) | **No** — see A-2 |
| `messages-ui/src/components/AttachmentDialog/AttachmentDialog.tsx` | 2 (`AttachDocument`, `AttachPatient`) | Yes |
| `messages-ui/src/components/NewMessageDialog/Wrapper/NewMessageDialogWrapper.tsx` | 1 | Yes |
| `messages-ui/.../Actions/{AttachDocument,NewMessageDialog,NewSurveyDialog}Actions.tsx` | 1 each | n/a — action rows extracted as components |

### Non-dialog rows: drawer, panel and modal footers

| File | Kind |
|---|---|
| `appointment-workflow-ui/src/components/CalendarEventDrawer/DrawerFormFooter.tsx` | Shared drawer footer, 3 consumers (`Schedule`, `Break`, `TimeOff` drawer forms) |
| `appointment-workflow-ui/src/components/CalendarEventDrawer/AppointmentDrawerForm.tsx:1960` | **Inline duplicate of the above** |
| `documents-ui/src/components/EditDialogActions.tsx` | Independent build of the same shape |
| `composition-ui/src/components/Composition/CompositionFooter/CompositionFooter.tsx` | Panel footer, split-button + menu |
| `notes-ui/src/components/AINote/NoteMainPanel/NoteFooter/NoteFooter.tsx` | Absolutely-positioned panel footer |
| `clinical-system/.../PhotoUpload/PhotoUploadFooter.tsx` | Footer rendered *into* a `DialogActions` |
| `messages-ui/src/components/PatientGroups/Footer/PatientGroupsFooter.tsx` | Form footer |
| `ordering-system/src/components/OrderSummary/OrderSummaryFooter.tsx` | Panel footer |
| `ordering-system/src/components/SuggestedMeds/SuggestedMedsFooter.tsx` | Panel footer |
| `design-system/src/components/DataGridFilter/FilterGroupDrawer.tsx` | The library's own, §1 |

### Recreated rather than instanced

1. **`AppointmentDrawerForm.tsx:1960`** reproduces `DrawerFormFooter`'s container `sx` property for
   property — `display`, `justifyContent: "space-between"`, `alignItems`, `gap: 1`, `p: 2`,
   `borderTop: 1`, `borderColor: "divider"`, `bgcolor: "background.paper"`, `flexShrink: 0` — and its
   `Delete` / `Cancel` / primary structure, without importing the component that sits **in the same
   directory**. Recorded as **A-8**.
2. **`MarginButton`** (`billing-system/.../PrintChargeDialog.tsx:27`) is a `styled(Button)` whose only
   purpose is to add a right margin. The margin does not work — **A-4**.
3. **`PhotoUploadFooter`** rebuilds a button row out of `Grid container direction="row-reverse"` and
   wraps every label in `<Typography component="div">` inside the `Button`.
4. **`EditDialogActions`** (documents-ui) is a fourth independent implementation of destructive-left
   / cancel-and-primary-right, with its own `centerContent` slot.

### Bounded candidate set outside dialogs

A sweep for `justifyContent` of `flex-end` / `end` / `space-between` followed within 1400 characters
by two or more buttons, in files with no `<DialogActions>`, returns **72 files** (Appendix B).
**That set is not classified.** It mixes container footers with page toolbars and table headers
(`CalendarControls.tsx`, `TitleBar.tsx`, `DocumentsDataGridToolbar.tsx`, `ApplicationNav.tsx`,
`CompositionHeader.tsx` are all in it and all out of scope). The named rows above are the ones read
and confirmed. A hand-rolled row that is neither named `*Footer` nor inside a `Drawer` file nor
right-aligned would be missed by every sweep run here.

---

## 3. Order and side

**MUI's default (pinned):** `DialogActions` is `display: flex; align-items: center; padding: 8px;
justify-content: flex-end; flex: 0 0 auto`. The row hugs the right edge, and source order is
left-to-right render order. Material's own guidance puts the confirming action rightmost.

### Side

| Alignment | Rows | |
|---|---:|---|
| Not set — inherits `flex-end` | 101 | |
| `justifyContent: "flex-end"` restated in `sx` | 4 | |
| `justifyContent: "space-between"` | 5 | |
| `justifyContent: "flex-start"` | 2 | |
| `justifyContent: "center"` | 1 | `patient-history-ui/.../CareTeamMemberForm.tsx:579`, a single `Okay` |

Two of the five `space-between` rows hold **only two buttons**, so cancel is pinned to the far left
edge of the dialog rather than sitting next to the primary:
`messages-ui/src/components/Conversation/Tags/Confirm/ConfirmDialog.tsx:53` and
`patient-engagement-ui/.../Reviews/ReviewRemovalAcknowledgement.tsx:49`. Same two-button semantics as
the other 80, different geometry.

### Order

Of the 94 multi-button rows:

| Cancel/dismiss position | Rows |
|---|---:|
| **First (leftmost)** | **85** |
| Last (rightmost) | 3 |
| Middle | 3 |
| No cancel-like label in the row | 5 |

**The primary action is rightmost in 108 of 113 rows.** Product is consistent, and the split is
85 / 3, not a contest. The three that invert:

- `admin-ui/.../A2PRegistration/OTPVerification/A2PRegistrationOTPVerification.tsx:399` — `Update and Resend Text`, then `Cancel`
- `clinical-system/.../MoreMenu/ExportModalCard.tsx:64` — `Export`, then `Cancel`
- `patient-intake-ui/.../StripePayments/StripeDeleteCardDialog.tsx:38` — `Confirm`, then `Cancel`, **and** `justifyContent: "flex-start"`. The only row that inverts both axes: primary on the left of the pair, and the pair on the left of the dialog.

---

## 4. Button variants

226 buttons across the 113 rows.

| Treatment | Count | Renders as |
|---|---:|---|
| `variant="text"` primary | 62 | text button, `#004852` ink |
| contained (default) `color="secondary"` | 53 | filled coral |
| contained (default) primary (default) | 37 | **white with a `core.main` border** |
| `variant="contained" color="secondary"` | 19 | filled coral, variant restated |
| `variant="contained" color="error"` | 11 | filled red |
| `variant="contained"` primary | 7 | white with border |
| contained (default) `color="error"` | 7 | filled red |
| `variant="contained" color="inherit"` | 5 | **no library treatment** |
| `variant="outlined"` primary | 5 | **no library treatment**, MUI default |
| contained `color="vitality"` | 2 | **not a palette colour** — A-5 |
| `variant="text" color="inherit"` | 2 | |
| `variant="outlined" color="primary"` | 2 | |

The committing (rightmost) action, 113 rows: **65 are contained + secondary** (51 relying on the
default variant, 14 restating it), 17 contained + error, 13 contained + primary — i.e. white — 4
`color="inherit"`, 2 `color="vitality"`, 1 `variant="text"`, and 3 chosen by a ternary at runtime.

### Cancel and dismiss

**Not consistent. Four treatments, and the top two are 57 / 22.**

| Cancel treatment | Rows |
|---|---:|
| `variant="text"` primary | 57 |
| **contained (default)** primary — the white bordered button | 22 |
| `variant="outlined"` | 5 |
| `variant="text"` with `inherit` / `secondary` / `vitality` | 4 |

The library's own stories are unanimous on `variant="text"` (§1). Product is 57/22 against that. Both
readings are defensible from the artefacts and neither is resolved here: the stories declare
membership, and 22 product rows declare something else.

---

## 5. Destructive actions

**17 rows contain a delete, remove, discard, void, revoke or override action.** 18 such buttons.

| File | Label | Treatment | Position |
|---|---|---|---|
| `admin-ui/.../VisitReasons/VisitReasonDeleteDialog.tsx:38` | Delete | contained error | last of 2 |
| `appointment-workflow-ui/src/components/DeleteDialog.tsx:262` | Delete | contained error | last of 2 |
| `appointment-workflow-ui/.../CalendarEventDrawer/DiscardChangesDialog.tsx:37` | Discard | contained error | last of 2 |
| `appointment-workflow-ui/.../Holidays/DeleteHolidayDialog.tsx:113` | Delete | contained error | last of 2 |
| `appointment-workflow-ui/.../Schedules/Dialogs/DeleteScheduleDialog.tsx:100` | Delete | contained error | last of 2 |
| `appointment-workflow-ui/.../SchedulingResources/ResourceDeleteDialog.tsx:107` | Delete | contained error | last of 2 |
| `documents-ui/src/components/DeleteDocumentDialog.tsx:41` | Delete | contained error | last of 2 |
| `medications-ui/.../ErxRequests/PendingOrdersDataGrid.tsx:300` | Remove | contained error | last of 2 |
| `messages-ui/.../PatientGroupsDeleteConfirmation.tsx:48` | Delete | contained error | last of 2 |
| `messages-ui/.../Template/TemplateEdit/TemplateEdit.tsx:150` | Delete | contained error | last of 2 |
| `patient-history-ui/.../CareTeam/CareTeamMemberForm.tsx:555` | Yes, delete member | contained error | last of 2 |
| `appointment-workflow-ui/.../TimeOff/DeleteTimeOffDialog.tsx:118` | Delete | **contained `color="inherit"`** | last of 2 |
| `admin-ui/.../DeleteTerminal/DeleteTerminalModal.tsx:65` | Remove Device | **contained secondary** | last of 2 |
| `documents-ui/src/components/EditDocumentDialog.tsx:978` | Discard | **contained secondary** | last of 2 |
| `documents-ui/src/components/EditDocumentDialog.tsx:1012` | Discard Changes | **contained secondary** | last of 2 |
| `patient-history-ui/.../SocialHistory/CustomItemsDialog.tsx:304` | Delete | **contained secondary** | last of 2 |
| `patient-history-ui/.../SocialHistory/CustomItemsDialog.tsx:240` | Delete | **contained secondary** | last of 3 |
| `patient-history-ui/.../SocialHistory/CustomItemsDialog.tsx:240` | Delete Unused items | **text error** | **first of 3** |

Plus two outside `DialogActions`: `DrawerFormFooter.tsx` and `EditDialogActions.tsx` both use
**`variant="outlined" color="error"`**, both positioned **leftmost**, both under a `space-between`
container.

**Does it differ from a normal primary?** In 11 of 18, yes — filled `error.main` `#D83B4D` instead of
filled `secondary.main` `#FF8D6E`, same position. In **5 of 18 it does not differ at all**: `Remove
Device`, two `Discard`es and two `Delete`s are `color="secondary"`, pixel-identical to a Save. One
more, `DeleteTimeOffDialog`, is `color="inherit"`, which the library does not style either — a delete
button styled as neither destructive nor primary (**A-6**).

**Position is settled where the treatment is not.** 16 of 18 sit rightmost in the primary slot. The
two that sit left are both *secondary* destructives — a bulk cleanup (`Delete Unused items`) and the
drawer footers' `Delete` — i.e. a delete that is not what the dialog is for.

**What the library provides for this:** the `containedError` and `textError` `styleOverrides` on
`MuiButton`, and nothing else. There is no destructive action row, no confirmation shell, and
crucially **no `outlinedError`** — the treatment the two most complete footers chose. The only
destructive *component* in the library is `components/ListItemDelete`, which tints a **list row** on
hover (`error.light` fill, `error.dark` border). It has nothing to do with an action row.

---

## 6. Three or more buttons

**14 rows declare three or more actions in source** (10 with three, 3 with four, 1 with six). The
source count overstates what renders: several are ternary branches that never coexist. Both numbers
are given.

### Genuinely three or more at once

| File | Actions, left to right | Arrangement |
|---|---|---|
| `admin-ui/.../IntakeFormNavConfirmDialog.tsx:32` | Close without saving (white) · Cancel (text) · Save and close (coral) | straight line, right |
| `patient-statements-ui/.../UnsavedChangesDialog.tsx:61` | Cancel (text) · Discard (contained) · Save (coral) | straight line, right |
| `notes-ui/.../RecordingDisruptedDialog.tsx:90` | Test Microphone · Start Over · Resume Listening · Finalize Note | straight line, four |
| `billing-system/.../PrintChargeDialog.tsx:104` | Close (text) · Download · Print | straight line, **no gap** (A-4) |
| `ordering-system/.../PrescriptionPreviewDialog.tsx:114` | Cancel (text) · Print · Send/EPCS (LoadingButton) | straight line, right |
| `messages-ui/.../NewSurveyDialogActions.tsx:39` | Cancel · Preview / Edit · Send | line; pairs swap by step |
| **`appointment-workflow-ui/.../ObservedHolidaysDialog.tsx:237`** | **Check All / Uncheck All** ← · Cancel · Save | **pushed to the opposite side** via a `Box` + `space-between` |
| **`documents-ui/src/components/MergeToChartTool.tsx:180`** | **Guide** (text + info icon) ← · Cancel · Merge Selected | **opposite side**, `space-between` |
| **`patient-history-ui/.../CustomItemsDialog.tsx:240`** | **Delete Unused items** (text error) ← · Cancel · Delete | **opposite side**, `space-between` |
| **`facesheet-ui/.../RecommendationsModal.tsx:556`** | **◀ ▶ IconButtons + "n of m"** ← · Done | **opposite side**; the left cluster is pagination, not an action |

### Collapses into a menu

- **`appointment-workflow-ui/.../AppointmentDrawerForm.tsx:1960`** — Delete (outlined error, left) ·
  Cancel (text) · **`AppointmentCardMenu`** (overflow menu) · Decline Appointment (text error) ·
  `AppointmentSaveActions` (Save and Collect Payment, outlined + Save, coral). Up to five affordances
  with the overflow menu sitting *between* Cancel and the primary, not at either end.
- **`composition-ui/.../CompositionFooter.tsx:422`** — `space-between`, `gap: 2`, `padding: 2`. The
  signing action is a **split `ButtonGroup`**: a main button plus a caret that opens a `Menu`. Its
  `borderRadius` is rebuilt from `theme.spacing(4)` = 32 against `ButtonOverrides`' 24, and its
  colours are `alpha(theme.palette.primary.main, 0.72)` and `…0.42)` — composed at the call site, not
  taken from the ramp.

### Three in source, never three on screen

`BreakDialog.tsx:447` and `TimeSlotDialog.tsx:528` each declare Cancel plus **two** Saves — one
`disabled` inside a `Tooltip`, one live — chosen by a ternary. `NewMessageDialogActions.tsx:38`
declares **six** buttons (Cancel, Next, Send, Preview Email, Edit, Send Email) and renders two at a
time by composer step. These are wizard states of a two-button row, not three-button rows.

---

## 7. Scroll behaviour

### Dialogs

**No product dialog sets the `scroll` prop.** A grep for `scroll="body"` across the monorepo returns
0; the only `scroll` usage in the checkout is the `ScrollDialog` story, which sets `"paper"` — the
default. So all 113 rows inherit MUI's `scroll="paper"` (pinned): the paper is a flex column capped
at `calc(100% - 64px)`, `DialogContent` carries `overflow-y: auto`, and `DialogActions` is
`flex: 0 0 auto` beneath it. **Under that structure the row stays pinned and the body scrolls.**

That structure holds in **100 of the 107 files**. Seven have `<DialogActions>` and no
`<DialogContent>`; three of those are action-row components (`AttachDocumentActions`,
`NewMessageDialogActions`, `NewSurveyDialogActions`) whose parent shells do provide one, and
`AttachPatient` renders inside `AttachmentDialog`, which does. That leaves three files, two of them
real:

**A-2 — `billing-system/src/components/Dialogs/ConfirmationDialog.tsx`.** Body and actions are both
children of one `<Box padding={2}>`, which is the paper's only child:

```tsx
<Dialog maxWidth="md" …>
  <Box padding={2}>
    <Box display="flex" paddingRight={4.5}>{icon}{body}</Box>
    <DialogActions>{actions}</DialogActions>
  </Box>
</Dialog>
```

There is no scroll container on the body, so the **paper** scrolls (pinned: `.MuiDialog-paper` sets
`overflow-y: auto`). `flex: 0 0 auto` does not pin anything inside a scrolling box — it scrolls with
its siblings. **Actions that become unreachable:** whatever the four consumers pass —
`ConfirmCancelationDialog` (confirm/cancel a cancellation), `ConfirmChangeDialog`, `ErrorDialog`, and
`RefreshDialog`'s refresh. The dialog is `maxWidth="md"` and the body is caller-supplied, so length
is unbounded.

**A-3 — `billing-system/src/components/PatientAlert/PatientAlert.tsx:120`.** Same shape without the
wrapper: `<Dialog>` → `<Box display="flex" p={3} pb={1} minWidth={400}>` → `<DialogActions>`. The
body renders the alert message with `whiteSpace="pre-wrap"` and no cap. The single `Got it!` action
scrolls out of reach on a long alert — and it is the only way to dismiss besides the backdrop.

`patient-history-ui/.../CareTeamMemberForm.tsx:555` and `:579` share the shape (title, then actions,
no `DialogContent`) but their bodies are one-line titles, so there is no practical overflow.

The one file that gets this **more** right than the default:
`documents-ui/src/components/EditDocumentDialog.tsx` sets
`<DialogContent sx={{ display: "flex", minHeight: 0, overflow: "hidden", p: 0 }}>` — the explicit
`minHeight: 0` that a nested flex scroll container needs. Two other `DialogContent`s in the same file
restate `overflowY: "auto"`.

**Product has already hit this.** `NewMessageDialogWrapper.tsx` carries the comment: *"Below the `sm`
breakpoint MUI's default 32px-margin dialog leaves no room for the form fields, so the `Send` action
ends up clipped (the v1 → v2 regression product reported). Flip to fullScreen so narrow windows get a
usable composer instead of a cropped one."* `NewMessageDialog.tsx:300` carries a second comment about
avoiding *"pushing the Send action below the viewport fold."* Two independent notes in one feature
about the committing action going out of reach — with the structure correct. The failure mode is
real even where `DialogContent` is present.

### Drawers and panels — per implementation

| Implementation | Body scroll container | Row pinned |
|---|---|---|
| `ScheduleDrawerForm` / `BreakDrawerForm` / `TimeOffDrawerForm` + `DrawerFormFooter` | `<form style={{display:flex, flexDirection:"column", height:"100%"}}>` with `<Stack sx={{p:2, flex:1, overflowY:"auto"}}>` | **Yes** — footer is `flexShrink: 0` |
| `AppointmentDrawerForm` (inline copy) | `Stack sx={{p:2, flex:1, overflowY:"auto", overflowX:"hidden"}}` | **Yes** — `flexShrink: 0` |
| `CompositionContainer` + `CompositionFooter` | container `minHeight: 0, overflow: "hidden"`, body `flex={1}` | **Yes** — `<Divider flexItem />` then footer |
| `AttachmentDialog` / `NewMessageDialogWrapper` | `DialogContent` | **Yes** |
| **`design-system` `FilterGroupDrawer`** | **none — see A-1** | **No** |
| `notes-ui` `NoteFooter` | n/a | Pinned by `position: absolute`, but **overlaps** — see A-10 |
| Storybook `DrawerFooter` | n/a | `position: fixed`; consumers reserve space by hand (`marginBottom={7}`) |

**A-1 — `packages/design-system/src/components/DataGridFilter/FilterGroupDrawer.tsx`.** The library's
own drawer. Its content column is:

```tsx
<Box sx={{ width: 450, boxShadow: 5, p: 2, height: "100%",
           display: "flex", flexDirection: "column", overflowX: "auto", gap: 2 }}>
```

**`overflowX`, where `overflowY` is what a vertical column needs.** Per CSS overflow rules, when one
axis is not `visible` the other's `visible` computes to `auto`, so the box does scroll vertically —
but it scrolls **as a whole**, and the trailing `<Divider sx={{ mx: -2 }} />` and `Reset Filters`
button are the last two flex children. **`Reset Filters` becomes unreachable** once the filter groups
exceed the drawer height; there is nothing else in the drawer that clears filters. Consumer:
`documents-ui/src/components/DataGridActionsRow.tsx:111`. The same `overflowX: "auto"` appears at
`FilterButton.tsx:231` in the same folder, which has no action row to lose.

This is the one place where the defect is in the library rather than in a product package.

**A-10 — `notes-ui/.../NoteFooter/NoteFooter.tsx`.** `position="absolute" bottom={0}`,
`height="78px"`, `width` `75vw`/`100vw` by drawer state, `boxShadow="0px -1px 4px 0px #00000024"`.
The row is pinned, but nothing in the note body reserves 78px, so the last 78px of the body sits
under it. The storybook `DrawerFooter` has the same shape and *does* compensate — by hand, in each
consumer, at a value (56) that does not match this one.

---

## 8. Geometry of the most-used implementation

The most-used implementation is a bare `<DialogActions>` with `Button` children and no `sx`:
**73 of 113 rows leave the padding alone, 88 of 113 put the buttons as direct children.**

| Property | Value | Source | Bound? |
|---|---|---|---|
| Row padding | **8** all sides | MUI `DialogActions` default | **pinned** — cannot be read from the checkout |
| Alignment | `justify-content: flex-end`, `align-items: center` | MUI default | pinned |
| Flex | `flex: 0 0 auto` | MUI default | pinned |
| Gap between buttons | **8**, via `& > :not(style) ~ :not(style) { margin-left: 8px }` | MUI default | pinned; **applies only to direct children** |
| Divider above the row | **none** | | 4 of 113 add one |
| Elevation | **none** | | 1 in the whole sweep (A-10) |
| Button height | **38** contained / **36** text | computed, below | **pinned — needs Storybook** |
| Row height | **54** with a contained button; **52** with text only | 8 + 38 + 8 | **pinned** |

**Button height arithmetic, from source, not measured.** `typography.button` is `fontSize: "1rem"`,
`lineHeight: "1.5rem"` → a 24px line box. MUI's contained medium padding is `6px 16px` (pinned).
`ButtonOverrides.containedPrimary/Secondary/Error` each add `border: 1px solid`. So
24 + 6 + 6 + 1 + 1 = **38**. `variant="text"` gets no border from the overrides → 24 + 6 + 6 = **36**.
**A row holding one contained and one text button holds two button heights 2px apart.** That follows
from the source; it has not been seen rendered and must not be promoted until it has.

### Where the 8 is overridden

| Padding written | Rows | Resolves to | Bound? |
|---|---:|---|---|
| nothing | 73 | 8 | MUI default |
| `padding: 2` / `p: 2` | 26 | **16** | theme spacing — bound |
| `p: "1rem"` | 2 | **16** | **hardcoded**; exactly `spacing(2)`, written off-system |
| `padding: 1` / `p: 1` | 3 | 8 | bound; restates the default |
| `padding: 2.5` | 1 | **20** | on the spacing scale, **off the 8 grid by 4** |
| `px: 3, py: 1` | 1 | 24 / 8 | bound |
| `pb: 2, px: 3` | 2 | 16 / 24 | bound |
| `pb: "1rem", px: "1.5rem"` | 1 | 16 / 24 | **hardcoded**; both exact multiples of 8 written as rem |
| `pb: 2, pr: 2` | 1 | 16 | bound |
| `p: {xs: 2}, pt: 0` | 1 | 16 / 0 | bound, responsive |

So the padding disagreement is **8 versus 16**, 73 to 26, with every drawer footer and every story on
the 16 side. Not resolved here.

### Where the gap goes missing

22 rows nest their buttons inside a `Box`/`Stack`/`Grid`, which stops MUI's sibling rule from
matching (§1). Ten of those supply their own `gap`/`spacing`/margin. **Twelve do not**, of which at
least four are single-action rows where it does not matter. The clearest failure is
`PrintChargeDialog.tsx:104`: an inner `<Box display="flex">` with no gap, whose two `MarginButton`s
are supposed to supply it —

**A-4.** `const MarginButton = styled(Button)(({theme}) => ({ "&&": { marginRight: `${theme.spacing(1)}px` }}))`.
In MUI v5 `theme.spacing(1)` returns the **string `"8px"`**, so this emits `marginRight: "8pxpx"`,
which is invalid and is dropped. `Close`, `Download` and `Print` render flush against each other.
A v4→v5 migration artefact.

### Separator: four mechanisms for one line

| Mechanism | Where |
|---|---|
| Nothing | 109 of 113 rows |
| `sx={{ borderTop: … }}` | 4 rows |
| `<Divider />` element above the row | all 5 stories, `AttachmentDialog`, `NewMessageDialogWrapper`, `CompositionContainer`, `PrintChargeDialog` |
| `borderTop: 1, borderColor: "divider"` | `DrawerFormFooter`, `AppointmentDrawerForm` |
| `boxShadow` | `NoteFooter` only |

And the four `borderTop` rows do not agree on the colour:

| Written | Resolves to | Against the token |
|---|---|---|
| `borderColor: "divider"` | `#D6D6D6` | **is the token** |
| `borderTop: "1px solid #ddd"` (`admin-ui/.../MessagesPage.tsx:158`) | `#DDDDDD` | **hardcoded, 7 per channel off `#D6D6D6`** |
| `` borderTop: `1px solid ${theme.palette.grey[400]}` `` (`A2PRegistrationFormVerify.tsx:282`) | grey ramp | bound, but to a different ramp than `divider` |

**Nothing above has been snapped.** `#ddd` is reported at `#ddd`, 20 is reported at 20, 78 at 78.

Other hardcoded values in the footer family, recorded with their nearest token:

| Value | Where | Nearest token |
|---|---|---|
| `height: "78px"` | `NoteFooter` | none; `spacing(10)` = 80, **off by 2**, and off the 8 grid by 6 |
| `p: "8px 40px"` | `NoteFooter` | `spacing(1)` and `spacing(5)` exactly, written raw |
| `bgcolor: "#F6F2EC"` | `NoteFooter` | **no palette entry** |
| `boxShadow: "0px -1px 4px 0px #00000024"` | `NoteFooter` | not on the theme shadow ramp |
| `width: "288px"`, `"200px"`, `"280px"` | storybook `DrawerFooter` | none |
| `bottom: "8%"` | storybook `DrawerFooter` | percentage, commented as a pixel height |

---

## 9. What is missing

| State | Built? | What product does |
|---|---|---|
| **Disabled primary** | Partly | 52 of 113 rows pass `disabled` to the rightmost button; `ButtonOverrides` defines `Mui-disabled` for `text`, `textError`, `containedPrimary`, `containedSecondary`, `containedError`. **Not for `outlined`** — so the `outlined error` `Delete` in `DrawerFormFooter` and `EditDialogActions`, which is passed `disabled`, has no library disabled treatment at all. |
| **Pending / in-flight** | **No component. Five inventions.** | (1) `CircularProgress size={20}` **replacing** the label — `DrawerFormFooter`; (2) `CircularProgress size={16}` `ml: 1` **beside** the retained label — `AppointmentSaveActions`; (3) label swap only — `"Saving…"`, `"Deleting…"`, `"Attaching…"`, `"Updating…"`, several rows; (4) `LoadingButton` from `@mui/lab` — 3 rows; (5) the whole button cluster replaced by `CircularProgress size={25}` — `PhotoUploadFooter`. 27 rows contain a `CircularProgress`. |
| **Validation message in the row** | **Effectively no.** | 2 rows put a `Typography` between the buttons (`SendPaymentReceiptDialog.tsx:109`, `worklist-ui/.../TableActionsButton.tsx:280`); 1 puts a `Checkbox` (`ConfirmDialog.tsx:53`, a don't-ask-again); `EditDialogActions` has a `centerContent` slot with its own `Divider`. Everywhere else the message goes in the body and the row stays actions-only. Product mostly **ignores** it. |
| **Single-action row** | Exists, unsettled | 14 rows. A lone `Close`/`OK`/`Got it` is contained-primary-white ×5, contained-secondary-coral ×5, `outlined` ×1, `color="inherit"`, and `color="vitality"` ×1. Plus `Reset Filters` (outlined, `fullWidth`) in the library drawer and `Apply Filters` (`width: 280px`) in the story. **Six treatments of one button.** |
| **Responsive / stacked** | **No.** | Exactly one row of 113 stacks below `sm`: `A2PRegistrationOTPVerification.tsx:399` (`flexDirection: {xs:"column", sm:"row"}`). `NewMessageDialogWrapper` handles narrow viewports by going `fullScreen` instead. Nothing else adapts. |
| **`disableSpacing`** | Never used | 0 rows opt out of MUI's spacing; 22 defeat it accidentally by nesting (§8). |

---

## 10. Which one is canonical

**No single implementation is defensible on its own, and this is the one place the answer should not
be forced.** Two are defensible for different reasons, and they disagree about the two numbers that
matter most.

**The descriptive canon — bare `<DialogActions>` at MUI defaults.** 113 rows, 107 files, 21 packages,
88 of them with buttons as direct children and 73 with the padding untouched. Right-aligned, 8
padding, 8 gap, no divider, cancel-first in 85 of 94, primary rightmost in 108 of 113. This is what
ships, by an enormous margin. Its weakness is that almost none of it was decided: it is MUI's default
with a Tebra colour on the last button. The 26 rows that push padding to 16 are the visible edge of
that — a default being argued with, one file at a time.

**The prescriptive canon — `appointment-workflow-ui/.../CalendarEventDrawer/DrawerFormFooter.tsx`.**
The only implementation that is simultaneously shared (3 consumers, plus one verbatim duplicate),
complete (destructive + dismiss + commit, disabled, in-flight, and a `Tooltip`-wrapped disabled
submit with the `<span>` that keeps the tooltip reachable), correct on scroll (`flexShrink: 0`
against an explicit `flex: 1; overflow-y: auto` body in all three consumers), and token-bound
(`p: 2`, `gap: 1`, `borderColor: "divider"`, `bgcolor: "background.paper"`). It is also the newest of
the footer family. Its weakness is that it is a **drawer** footer: 16 padding, 8 gap, a top border,
`space-between` when a destructive is present. **113 dialog rows do not look like it.**

Building only the first puts a default into Figma and calls it a decision. Building only the second
puts a geometry into Figma that no dialog in the product uses.

**Recommendation, stated as a recommendation and not as a resolution:** build **two** action rows —
`Action row / dialog` at the descriptive numbers (8 padding, 8 gap, no divider, right-aligned) and
`Action row / drawer` at `DrawerFormFooter`'s (16 padding, 8 gap, 1px `divider` top border,
`space-between` with a leading destructive). Keep the 8-versus-16 disagreement visible **between the
two components** rather than averaging it into one. Do not build the storybook `DrawerFooter`
geometry (centre-aligned, no gap, fixed at `bottom: 8%`) as either; it is a story harness, and it is
the only centre-aligned action row in the entire artefact.

What that leaves undecided, deliberately: whether cancel is `text` (57 rows and all five stories) or
the white contained button (22 rows), and whether a destructive commit is `error` (11) or `secondary`
(5). Both are colour decisions on an existing Button component, not geometry, and both should be
carried into the build as variants rather than settled by count.

---

## 11. Defects, flagged and not fixed

| # | File | What |
|---|---|---|
| **A-1** | `design-system/src/components/DataGridFilter/FilterGroupDrawer.tsx` | `overflowX: "auto"` on a vertical flex column; the whole column scrolls, and **`Reset Filters` scrolls out of reach**. The one defect that lives in the library. |
| **A-2** | `billing-system/src/components/Dialogs/ConfirmationDialog.tsx` | Body and `DialogActions` share one `Box`; no `DialogContent`; the paper scrolls and takes the actions with it. 4 consumers. |
| **A-3** | `billing-system/src/components/PatientAlert/PatientAlert.tsx:120` | Same shape; unbounded `pre-wrap` body; the only dismiss action scrolls away. |
| **A-4** | `billing-system/.../PrintChargeDialog.tsx:27` | `` `${theme.spacing(1)}px` `` → `"8pxpx"`; invalid, dropped. `Close`/`Download`/`Print` render flush. v4→v5 artefact. |
| **A-5** | `billing-system` ×10, 2 of them in action rows (`PatientAlert.tsx:136`, `RefreshDialog.tsx:23`) | `color="vitality"` — **no `vitality` key exists in the palette**; `vitality` is the design name of the `secondary` ramp, present only in comments. `ButtonPropsColorOverrides` in `theme.ts` admits only `primary`, `secondary`, `inherit`, `error`. |
| **A-6** | `appointment-workflow-ui/.../DeleteTimeOffDialog.tsx:118` (+4 more rows) | `variant="contained" color="inherit"`; the library styles no `inherit` case, so a `Delete` renders as neither destructive nor primary. |
| **A-7** | `ButtonOverrides.ts` | `outlined` has no `styleOverrides` entry in any colour, including its disabled state — while `DrawerFormFooter` and `EditDialogActions` both use `outlined error` for the destructive action and both pass it `disabled`. |
| **A-8** | `appointment-workflow-ui/.../AppointmentDrawerForm.tsx:1960` | Reproduces `DrawerFormFooter`'s nine container `sx` properties verbatim instead of importing it from the same directory. |
| **A-9** | `admin-ui/.../ClinicalSettings/MessagesPage/MessagesPage.tsx:158` | `borderTop: "1px solid #ddd"` against the `divider` token `#D6D6D6`. |
| **A-10** | `notes-ui/.../NoteFooter/NoteFooter.tsx` | 78px absolutely-positioned footer with nothing reserving space in the body; raw hex fill and an off-ramp shadow. |
| **A-11** | `design-system/src/stories/Dialog/stories/` | Four of five stories wrap buttons in `<Box m={1}>`, defeating MUI's own 8px spacing rule; `AlertDialog.example.tsx:63` patches around it with an inline `marginRight: 8`; `ScrollDialog` does not wrap at all. The library's stories disagree with each other about the row's inner geometry. |

## 12. Disagreements, reported not resolved

| Question | One source | The other |
|---|---|---|
| Row padding | **8** — MUI default, 73 rows | **16** — 26 rows, every drawer footer, and all five stories via `Box m={1}` |
| Cancel treatment | **`variant="text"`** — 57 rows, unanimous in the stories | **contained primary (white)** — 22 rows |
| Destructive commit | **`color="error"`** — 11 | **`color="secondary"`**, identical to a Save — 5 |
| Destructive in a footer | **`outlined error`, leftmost** — `DrawerFormFooter`, `EditDialogActions` | **contained error, rightmost** — 11 dialog rows |
| The separator | **none** — 109 rows | `<Divider/>` element / `borderTop` sx / `boxShadow` — four mechanisms |
| Alignment | **`flex-end`** — 105 rows | `space-between` 5, `flex-start` 2, `center` 1, and `center` again in the story footer |
| In-flight | five treatments, none shared | — |
| design-system version | 0.18.3 (`CHAT-HANDOFF.md`) | **0.19.7** (checkout, dated 07/31/2026) |
| `@mui/material` version | 5.15.12 (handoff) | 5.15.12 / 5.14.11 / 5.13.5 / 5.13.3 all resolved in `yarn.lock` |

---

## 13. Built, 2026-08-18

Page `Action row exemplars` (536:2), to the `Table exemplars` board convention. 132 nodes, 12
instances, 0 detached, 0 components created, 0 fractional dimensions, 0 unbound paints. Kit unchanged
at 103.

**Two canonical rows, adjacent.** Both 600 wide, the width the theme's one dialog setting implies
(`maxWidth: "sm"`), both holding Cancel and Save so geometry is the only variable between them.

| Row | Inset | Gap | Separator | Height |
|---|---|---|---|---|
| Dialog actions | 8 | 8 | none | **54** |
| Drawer footer | 16 | 8 | 1px top, `color/divider` | **70** |

54 = 8 + 38 + 8 and 70 = 16 + 38 + 16, which is the §8 arithmetic reaching the canvas unchanged.
**The kit's Button is already 38 contained and 36 text**, so the computed heights needed no
adjustment. The kit reaches 38 by padding 7/17 with a 1px inside stroke where the source reaches it
by padding 6/16 plus a 1px border. Same total, different decomposition, nothing snapped.

**Four variations:** Destructive (filled red, rightmost), Three or more actions (three in a line,
right), Single action (one filled coral), Pending (authored, label swap plus both buttons off).

**One panel, not a component:** `6 Scroll behaviour`, 840 wide, naming `FilterGroupDrawer.tsx`,
`billing-system` `ConfirmationDialog.tsx` and `PatientAlert.tsx`, and quoting the two `messages-ui`
comments. It carries the rule as a sentence: the body scrolls, the row does not.

### What could not be built, and why

**The outlined red delete.** `DrawerFormFooter` and `EditDialogActions` both use `outlined error`,
and **neither the theme nor the kit has an outlined button** (the kit's Button set offers Contained
and Text only, 54 variants, no Outlined). This is A-7 arriving in the library as a missing variant
rather than a missing style. The destructive row is drawn at the dialog treatment instead, 11 of 18,
and the caption says what is missing.

**The spinner inside the button.** Three of the five in-flight treatments put a `CircularProgress`
inside the Button. A kit Button instance has no slot for one, and adding it would mean detaching. The
pending row is drawn as the label swap, which is the one treatment the kit can express, and is marked
authored.

### Noted while building

- **`DRAWER-EXEMPLARS.md` §1 says `Table exemplars` "has a fill" on its root frame. It does not**
  (`fills: []`, read from the artefact today). Both boards and this one are groundless. The claim is
  wrong in the doc, not in the file; not corrected here.
- Labels render capitalised per word: "Save And Close", "Close Without Saving". That is the theme's
  own `textTransform: capitalize` on button typography, so the board is showing what the browser
  shows. Recorded because it looks like a Figma mistake and is not one.
- The board root carries no fill, so each row reads as a white surface against the canvas. The 8
  versus 16 difference is legible through the inset and the 54 versus 70 height, not through a box
  edge, because the dialog row has no edge to draw.

---

## Appendix A — the 113 product `DialogActions` rows

**admin-ui** (22)
- `admin-ui/src/components/A2PRegistration/Form/Verify/A2PRegistrationFormVerify.tsx:282` — 2 actions
- `admin-ui/src/components/A2PRegistration/FormSubmissionList/A2PRegistrationFormSubmissionList.tsx:93` — 1 action
- `admin-ui/src/components/A2PRegistration/OTPVerification/A2PRegistrationOTPVerification.tsx:399` — 2 actions
- `admin-ui/src/components/ClinicalSettings/MessagesPage/MessagesPage.tsx:158` — 2 actions
- `admin-ui/src/components/MessageRouting/StaffGroupsTab/EditGroupDialog/EditGroupDialog.tsx:451` — 2 actions
- `admin-ui/src/components/MessageRouting/StaffGroupsTab/ViewGroupDialog/ViewGroupDialog.tsx:101` — 1 action
- `admin-ui/src/components/PatientIntake/CustomIntakeFormEditor/IntakeFormDisclaimerDialog/IntakeFormDisclaimerDialog.tsx:58` — 2 actions
- `admin-ui/src/components/PatientIntake/IntakeFormNameDialog/IntakeFormNameDialog.tsx:79` — 2 actions
- `admin-ui/src/components/PatientIntake/IntakeFormNavConfirmDialog/IntakeFormNavConfirmDialog.tsx:32` — 3 actions
- `admin-ui/src/components/TerminalSettings/DeleteTerminal/DeleteTerminalModal.tsx:65` — 2 actions
- `admin-ui/src/components/TerminalSettings/NewTerminal/ActivationCodeSection.tsx:113` — 2 actions
- `admin-ui/src/components/TerminalSettings/NewTerminal/ConfirmationSection.tsx:59` — 1 action
- `admin-ui/src/components/TerminalSettings/NewTerminal/DeviceNameSection.tsx:75` — 2 actions
- `admin-ui/src/components/UserSettings/UserList/ProviderUnsyncedDialog.tsx:29` — 2 actions
- `admin-ui/src/components/UserSettings/UserList/UnlockUserDialog.tsx:40` — 2 actions
- `admin-ui/src/components/UserSettings/UserPage/Modals/AddPracticeDialog.tsx:73` — 2 actions
- `admin-ui/src/components/UserSettings/UserPage/Modals/AddProductDialog.tsx:92` — 2 actions
- `admin-ui/src/components/UserSettings/UserPage/Modals/LockUserDialog.tsx:104` — 2 actions
- `admin-ui/src/components/UserSettings/UserPage/Modals/ReactivateProviderDialog.tsx:36` — 2 actions
- `admin-ui/src/components/UserSettings/UserPage/Modals/UnassignUserDialog.tsx:40` — 2 actions
- `admin-ui/src/components/VisitReasons/VisitReasonDeleteDialog.tsx:38` — 2 actions
- `admin-ui/src/components/VisitReasons/VisitReasonsToggle.tsx:90` — 2 actions

**appointment-workflow-ui** (20)
- `appointment-workflow-ui/src/components/AppointmentEdit/AppointmentRecurrenceUpdateDialog.tsx:90` — 2 actions
- `appointment-workflow-ui/src/components/AppointmentEdit/Recurrence/CustomRecurrenceDialog.tsx:272` — 2 actions
- `appointment-workflow-ui/src/components/CalendarEventDrawer/DiscardChangesDialog.tsx:37` — 2 actions
- `appointment-workflow-ui/src/components/CalendarSettings/CalendarIncrementSettings.tsx:231` — 2 actions
- `appointment-workflow-ui/src/components/CalendarSettings/Holidays/AddCustomHolidayDialog.tsx:167` — 2 actions
- `appointment-workflow-ui/src/components/CalendarSettings/Holidays/DeleteHolidayDialog.tsx:113` — 2 actions
- `appointment-workflow-ui/src/components/CalendarSettings/Holidays/ObservedHolidaysDialog.tsx:237` — 3 actions
- `appointment-workflow-ui/src/components/CalendarSettings/OfficeHours/OfficeHoursSetup.tsx:601` — 2 actions
- `appointment-workflow-ui/src/components/CalendarSettings/Schedules/Dialogs/BreakDialog.tsx:447` — 3 actions
- `appointment-workflow-ui/src/components/CalendarSettings/Schedules/Dialogs/DeleteScheduleDialog.tsx:100` — 2 actions
- `appointment-workflow-ui/src/components/CalendarSettings/Schedules/Dialogs/TimeSlotDialog.tsx:528` — 3 actions
- `appointment-workflow-ui/src/components/CalendarSettings/Schedules/Recurrence/ScheduleCustomRecurrenceDialog.tsx:291` — 2 actions
- `appointment-workflow-ui/src/components/CalendarSettings/SchedulingResources/ResourceDeleteDialog.tsx:107` — 2 actions
- `appointment-workflow-ui/src/components/CalendarSettings/SchedulingResources/ResourceEditDialog.tsx:244` — 2 actions
- `appointment-workflow-ui/src/components/CalendarSettings/TimeOff/AddEditTimeOffDialog.tsx:449` — 2 actions
- `appointment-workflow-ui/src/components/CalendarSettings/TimeOff/DeleteTimeOffDialog.tsx:118` — 2 actions
- `appointment-workflow-ui/src/components/CalendarSettings/VisibleHoursAndDaysSettings.tsx:319` — 2 actions
- `appointment-workflow-ui/src/components/DeclineDialog.tsx:101` — 2 actions
- `appointment-workflow-ui/src/components/DeleteDialog.tsx:262` — 2 actions
- `appointment-workflow-ui/src/components/MobiScrollScheduler/AppointmentUpdateDialog.tsx:234` — 2 actions

**billing-system** (4)
- `billing-system/src/components/Dialogs/ConfirmationDialog.tsx:41` — 0 actions
- `billing-system/src/components/PatientAlert/PatientAlert.tsx:135` — 1 action
- `billing-system/src/components/PrintCharge/PrintChargeDialog.tsx:104` — 3 actions
- `billing-system/src/components/PrintCharge/SendPaymentReceiptDialog.tsx:109` — 2 actions

**claim-denial-predictor-ui** (1)
- `claim-denial-predictor-ui/src/components/DisplayPrediction/Feedback/FeedbackDialog.tsx:59` — 1 action

**clinical-system** (7)
- `clinical-system/src/components/ClinicalPageHeader/HeaderRightLinks/MoreMenu/ExportModalCard.tsx:64` — 2 actions
- `clinical-system/src/components/ClinicalPageHeader/HeaderRightLinks/MoreMenu/ImportSummaryOfCare.tsx:153` — 2 actions
- `clinical-system/src/components/ClinicalPageHeader/PatientOverview/ChartAccess/AssignModal.tsx:305` — 2 actions
- `clinical-system/src/components/ClinicalPageHeader/PatientOverview/ChartAccess/NoAssignModal.tsx:88` — 1 action
- `clinical-system/src/components/ClinicalPageHeader/PatientOverview/ChartAccess/UnrestrictedModal.tsx:60` — 1 action
- `clinical-system/src/components/ClinicalPageHeader/PatientOverview/PhotoUpload/PatientPhotoUpload.tsx:214` — 0 actions
- `clinical-system/src/modules/components/SocialHistory/ItemCommentDialog.tsx:52` — 2 actions

**composition-ui** (2)
- `composition-ui/src/components/Composition/CompositionFooter/MarkAsErrorDialog.tsx:47` — 2 actions
- `composition-ui/src/components/CompositionsList/PsychNote.tsx:174` — 2 actions

**documents-ui** (7)
- `documents-ui/src/components/DeleteDocumentDialog.tsx:41` — 2 actions
- `documents-ui/src/components/EditDocumentDialog.tsx:978` — 2 actions
- `documents-ui/src/components/EditDocumentDialog.tsx:1012` — 2 actions
- `documents-ui/src/components/MergeIssues.tsx:181` — 1 action
- `documents-ui/src/components/MergeToChartGuide.tsx:63` — 2 actions
- `documents-ui/src/components/MergeToChartTool.tsx:180` — 3 actions
- `documents-ui/src/components/OutboundFaxDrawer.tsx:325` — 1 action

**electronic-case-reporting-ui** (2)
- `electronic-case-reporting-ui/src/components/comments/ViewComments.tsx:142` — 2 actions
- `electronic-case-reporting-ui/src/components/report/ViewReport.tsx:98` — 2 actions

**facesheet-ui** (2)
- `facesheet-ui/src/components/CardContent/ClinicalRecommendations/RecommendationsModal.tsx:556` — 3 actions
- `facesheet-ui/src/components/FacesheetCustomization/FacesheetCustomizationModal.tsx:83` — 2 actions

**medications-ui** (1)
- `medications-ui/src/components/ErxRequests/PendingOrdersDataGrid.tsx:300` — 2 actions

**messages-ui** (10)
- `messages-ui/src/components/AttachDocument/Actions/AttachDocumentActions.tsx:20` — 3 actions
- `messages-ui/src/components/AttachPatient/AttachPatient.tsx:59` — 2 actions
- `messages-ui/src/components/Conversation/ProviderSelect/Upgrade/ProviderSelectUpgradeDialog.tsx:34` — 2 actions
- `messages-ui/src/components/Conversation/Tags/Confirm/ConfirmDialog.tsx:53` — 2 actions
- `messages-ui/src/components/NewMessageDialog/Actions/NewMessageDialogActions.tsx:38` — 6 actions
- `messages-ui/src/components/NewSurveyDialog/Actions/NewSurveyDialogActions.tsx:30` — 1 action
- `messages-ui/src/components/NewSurveyDialog/Actions/NewSurveyDialogActions.tsx:39` — 4 actions
- `messages-ui/src/components/PatientGroups/DeleteConfirmation/PatientGroupsDeleteConfirmation.tsx:48` — 2 actions
- `messages-ui/src/components/SettingsDialog/SettingsDialog.tsx:256` — 2 actions
- `messages-ui/src/components/Template/TemplateEdit/TemplateEdit.tsx:150` — 2 actions

**notes-ui** (7)
- `notes-ui/src/components/AINote/NoteMainPanel/NoteFooter/ReviewDialog.tsx:63` — 2 actions
- `notes-ui/src/components/AINote/NoteMainPanel/RecordingDisruptedDialog.tsx:90` — 4 actions
- `notes-ui/src/components/NoteRetryScheduledDialog.tsx:41` — 1 action
- `notes-ui/src/components/PremiumServiceDialog.tsx:66` — 2 actions
- `notes-ui/src/components/Warning/LeavePageDialog.tsx:37` — 2 actions
- `notes-ui/src/components/Warning/RestartWarningDialog.tsx:33` — 2 actions
- `notes-ui/src/components/Warning/WarningDialog.tsx:46` — 2 actions

**ordering-system** (7)
- `ordering-system/src/components/DrugInfo/DrugInteractions/DualTherapyWarning.tsx:149` — 2 actions
- `ordering-system/src/components/DrugInfo/DrugInteractions/InteractionWarningDialog/InteractionWarningDialog.tsx:105` — 2 actions
- `ordering-system/src/components/DrugInfo/DrugSearch/DrugSearch.tsx:375` — 2 actions
- `ordering-system/src/components/DrugInfo/ReasonForRx/IcdBrowserDialog/IcdBrowserDialog.tsx:158` — 2 actions
- `ordering-system/src/components/PatientCost/AlternativeMedications.tsx:131` — 2 actions
- `ordering-system/src/components/PharmacyInfo/PharmacySearchDialog.tsx:79` — 2 actions
- `ordering-system/src/components/PrescriptionActions/PrescriptionPreviewDialog/PrescriptionPreviewDialog.tsx:114` — 4 actions

**patient-engagement-ui** (4)
- `patient-engagement-ui/src/components/ChangeServiceLocationDialog/ChangeServiceLocationDialog.tsx:133` — 2 actions
- `patient-engagement-ui/src/components/SurveysReviews/AiSentimentAnalysisDialog.tsx:238` — 0 actions
- `patient-engagement-ui/src/components/SurveysReviews/Reviews/AiTermsConsentDialog.tsx:45` — 1 action
- `patient-engagement-ui/src/components/SurveysReviews/Reviews/ReviewRemovalAcknowledgement.tsx:49` — 2 actions

**patient-history-ui** (7)
- `patient-history-ui/src/components/CareTeam/CareTeamMemberForm.tsx:555` — 2 actions
- `patient-history-ui/src/components/CareTeam/CareTeamMemberForm.tsx:579` — 1 action
- `patient-history-ui/src/components/SocialHistory/CustomItemsDialog.tsx:240` — 3 actions
- `patient-history-ui/src/components/SocialHistory/CustomItemsDialog.tsx:281` — 2 actions
- `patient-history-ui/src/components/SocialHistory/CustomItemsDialog.tsx:304` — 2 actions
- `patient-history-ui/src/components/SocialHistory/HistoryItem.tsx:112` — 2 actions
- `patient-history-ui/src/components/TravelHistory/TravelComments.tsx:65` — 2 actions

**patient-intake-admin-ui** (1)
- `patient-intake-admin-ui/src/components/EngageUpsellDialog.tsx:51` — 2 actions

**patient-intake-ui** (1)
- `patient-intake-ui/src/components/PatientIntake/Payment/components/StripePayments/StripeDeleteCardDialog.tsx:38` — 2 actions

**patient-statements-ui** (2)
- `patient-statements-ui/src/components/SettingsPage/components/ConfirmDialogs/SettingsDialog.tsx:35` — 2 actions
- `patient-statements-ui/src/components/UnsavedChangesGuard/UnsavedChangesDialog.tsx:61` — 3 actions

**payment-subscription-ui** (4)
- `payment-subscription-ui/src/components/PlanFormDialog/PlanFormDialog.tsx:620` — 2 actions
- `payment-subscription-ui/src/components/PlanFormDialog/PlanFormDialog.tsx:683` — 1 action
- `payment-subscription-ui/src/pages/SubscriptionManagement/views/RetryPaymentDialog.tsx:59` — 2 actions
- `payment-subscription-ui/src/pages/SubscriptionManagement/views/SubscriberActionDialog.tsx:665` — 2 actions

**treatment-plan-ui** (1)
- `treatment-plan-ui/src/components/wiley/DocumentOptionsDialog.tsx:84` — 2 actions

**worklist-ui** (1)
- `worklist-ui/src/components/Worklist/Header/TableActionsButton.tsx:280` — 2 actions

---

## Appendix B — 72 unclassified candidates outside dialogs

Files with no `<DialogActions>` where a `flex-end` / `space-between` container is followed within
1400 characters by two or more buttons. **This set mixes container footers with page toolbars and
table headers and has not been classified** — it is published as the bound on what the sweep could
see, not as a count of action rows.

- `admin-ui/src/components/MessageRouting/RoutingTab/EditRoutingDrawer/EditRoutingDrawer.tsx:412`
- `admin-ui/src/components/PatientIntake/IntakeFormListHeader/IntakeFormListHeader.tsx:59`
- `admin-ui/src/components/PatientIntake/IntakeFormsList/UploadAdditionalForm/UploadAdditionalForm.tsx:150`
- `admin-ui/src/components/PatientSurveysReviews/PatientSurveysReviewsPage/Sections/ReviewAllocationModal.tsx:338`
- `admin-ui/src/components/ProductSetup/A2PRegistration/A2PRegistration.tsx:94`
- `admin-ui/src/components/ProviderProfiles/ProviderProfilePage/Sections/Locations/LocationItemForm.tsx:196`
- `admin-ui/src/components/ProviderProfiles/ProviderProfilePage/Sections/ReviewProfiles/ExternalWebsiteModal.tsx:126`
- `admin-ui/src/components/ProviderProfiles/ProviderProfilePage/Sections/ReviewProfiles/GoogleBusinessProfileConnect.tsx:220`
- `admin-ui/src/components/ProviderProfiles/ProviderProfilePage/Sections/ReviewProfiles/ReviewProfilesForm.tsx:290`
- `admin-ui/src/components/UserSettings/UserPage/UserForm.tsx:612`
- `admin-ui/src/components/VisitReasons/VisitReasonFormPage.tsx:654`
- `appointment-workflow-ui/src/components/ApplicationNav.tsx:74`
- `appointment-workflow-ui/src/components/AppointmentCardV2/InsuranceCaseDetails.tsx:472`
- `appointment-workflow-ui/src/components/AppointmentCardV2/NonPatientAppointmentFooter.tsx:38`
- `appointment-workflow-ui/src/components/AppointmentEdit/PatientIntake/IntakeContactMethod.tsx:163`
- `appointment-workflow-ui/src/components/Calendar/CalendarControls.tsx:39`
- `appointment-workflow-ui/src/components/CalendarEventDrawer/AppointmentDrawerForm.tsx:1489`
- `appointment-workflow-ui/src/components/CalendarSettings/Holidays/HolidaysList.tsx:75`
- `appointment-workflow-ui/src/components/CalendarSettings/SchedulingResources/SchedulingResources.tsx:205`
- `appointment-workflow-ui/src/components/ContactSalesDrawer/ContactSalesDrawer.tsx:77`
- `appointment-workflow-ui/src/components/ContactSalesProcessingDialog/ContactSalesProcessingDialog.tsx:166`
- `appointment-workflow-ui/src/components/FinancialCard/index.tsx:220`
- `appointment-workflow-ui/src/features/FindAvailableAppointment/AppointmentActionBar.tsx:67`
- `appointment-workflow-ui/src/features/FindAvailableAppointment/FindAvailableAppointment.tsx:1116`
- `appointment-workflow-ui/src/features/FindAvailableAppointment/FindAvailableAppointmentFilters.tsx:784`
- `ar-dashboard-ui/src/components/TitleBar/TitleBar.tsx:91`
- `billing-system/src/components/PaymentCollection/PaymentControls/PaymentControls.tsx:34`
- `clinical-system/src/modules/components/FamilyHistory/HistoryModule.tsx:113`
- `clinical-system/src/modules/components/PregnancyHistory/PregnancyHistory.tsx:92`
- `clinical-system/src/modules/components/SocialHistory/EditSocialHistory.tsx:424`
- `clinical-system/src/modules/components/SocialHistory/HistoryModule.tsx:42`
- `composition-ui/src/components/Composition/CompositionEditor/AppointmentControls.tsx:127`
- `composition-ui/src/components/Composition/CompositionEditor/TemplateItem.tsx:99`
- `composition-ui/src/components/Composition/CompositionHeader/CompositionHeader.tsx:67`
- `composition-ui/src/components/CompositionsList/index.tsx:40`
- `customer-upgrade-ui/src/components/ContactSalesProcessingDialog/ContactSalesProcessingDialog.tsx:166`
- `documents-ui/src/components/DeleteLabel.tsx:39`
- `documents-ui/src/components/DocumentsDataGridToolbar.tsx:54`
- `documents-ui/src/components/EditDialogActions.tsx:122`
- `documents-ui/src/components/Filters/DateRangeFilter/DateRangeCalendarHeader.tsx:26`
- `documents-ui/src/components/OutboundFaxForm.tsx:613`
- `facesheet-ui/src/components/CardContent/ClinicalRecommendations/SourceAttributes.tsx:255`
- `messages-ui/src/components/Conversation/MessageInput/ConversationMessageInput.tsx:702`
- `messages-ui/src/components/Header/Header.tsx:72`
- `messages-ui/src/components/Preview/Header/PreviewHeader.tsx:88`
- `messages-ui/src/components/Template/TemplateEditCreateForm/TemplateEditCreateForm.tsx:213`
- `mfa-ui/src/components/MfaConfirmationForm.tsx:201`
- `multipractice-dashboard-ui/src/features/practicePerformance/PracticePerformancePage.tsx:43`
- `notes-ui/src/components/AINote/NoteMainPanel/MicrophoneSettingsDialog.tsx:150`
- `ordering-system/src/components/OrderSummary/OrderSummaryDataGrid.tsx:143`
- `ordering-system/src/components/OrderSummary/OrderSummaryFooter.tsx:139`
- `ordering-system/src/components/PrescriptionActions/PrescriptionActions.tsx:199`
- `ordering-system/src/components/SuggestedMeds/SuggestedMedActions.tsx:42`
- `ordering-system/src/components/SuggestedMeds/SuggestedMedEditForm.tsx:143`
- `patient-engagement-ui/src/components/SurveysReviews/Reviews/ReviewItem.tsx:562`
- `patient-history-ui/src/components/HistoryPageFooter.tsx:30`
- `patient-history-ui/src/components/Sdoh/SdohPage.tsx:622`
- `patient-intake-admin-ui/src/components/InsuranceModal.tsx:59`
- `patient-intake-admin-ui/src/components/PatientIntakeAdmin.tsx:93`
- `patient-intake-admin-ui/src/components/ReviewIntake/ReviewActions.tsx:50`
- `patient-intake-ui/src/components/SelectPharmacy/PharmacySearch.tsx:137`
- `patient-intake-ui/src/components/SelectPharmacy/SelectPharmacy.tsx:65`
- `payment-collection-ui/src/VirtualCard/components/ReceiptPage.tsx:252`
- `payment-subscription-ui/src/components/WorklistStyleDataGrid/WorklistStyleDataGrid.tsx:104`
- `payment-subscription-ui/src/pages/SubscriptionManagement/views/EnrollPatientsGridView.tsx:508`
- `payments-onboarding-ui/src/components/SubmerchantWizard/OwnerInfoStep/OwnerInfoStep.tsx:92`
- `payments-onboarding-ui/src/components/SubmerchantWizard/SubmerchantWizard.tsx:446`
- `scheduling-settings-ui/src/components/AppointmentManagement/PolicySection.tsx:168`
- `treatment-plan-ui/src/components/wiley/ActionBar.tsx:144`
- `worklist-ui/src/components/ConfirmDialog/ConfirmDialog.tsx:38`
- `worklist-ui/src/components/NewWorklist/NewWorklistFooter.tsx:23`
- `worklist-ui/src/components/Worklist/Header/Header.tsx:117`

---

*Scan tool: `action-row-scan.py` in this repo. Re-run with `python action-row-scan.py > rows.json`.
It parses source text; it does not run the app, and it does not measure a render.*
