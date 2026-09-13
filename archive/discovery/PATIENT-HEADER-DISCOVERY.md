# Patient header discovery

Discovery pass, 2026-08-17. **Nothing was built.** Enumerated from source in `C:\Code\web-app-v2`,
not from any previous report, including the design agent's B1 recipe and `PRODUCT-DRIFT.md`.

**Storybook is unreachable, and `clinical-system` has no stories at all** (`find -name "*.stories.*"`
returns nothing in the package). Every value below that depends on a render is marked **pinned** and
should not be promoted into a value column until a render exists to check it against.

The header does not call itself a patient header. In source it is `ClinicalPageHeader`.

---

## 1. How many there are

**Four surfaces render a patient identity header. A fifth renders the same content as a popover.**

| # | Path | Kind |
|---|---|---|
| 1 | `clinical-system/src/components/ClinicalPageHeader/` | **Shared component.** The one above a patient's chart |
| 2 | `clinical-system/src/components/ClinicalPageNav/ClinicalPageNav.tsx` (lines 88–134) | Inline in a page, same package as 1 |
| 3 | `notes-ui/src/components/AINote/NoteHeader/PatientInfo.tsx` | **A copy of 1**, see §3 |
| 4 | `portal-management-ui/src/components/SelectedPatientHeader/SelectedPatientHeader.tsx` | Independent shared component |
| 5 | `clinical-system/src/components/ClinicalPageHeader/PatientOverview/PatientCard.tsx` | Popover, not a header. Rendered by **both** 1 and 2 |

**Not a patient header, despite the name:** `documents-ui/src/components/MergeToChartHeader.tsx` is a
centred title and description above a reconciliation table column. It takes `title` and `description`
props and knows nothing about a patient. Name collision only.

**Header 1 is the most used by a wide margin.** It mounts through
`ClinicalPageProvider` → `HeaderNavFrame` → `ClinicalPageHeader`, and `ClinicalPageProvider` is
imported by **six packages**: `clinical-system`, `composition-ui`, `facesheet-ui`, `medications-ui`,
`patient-history-ui`, `treatment-plan-ui`. `facesheet-ui` has no header of its own, so the patient
band the design agent measured on the facesheet is this component.

### What distinguishes them

- **1 and 2 are the same package and the same era**, and 2 exists because 1 can be switched off.
  `HeaderNavFrame` takes `showPatientHeader` (default `true`); `composition-ui/src/App.tsx:118` is the
  only caller that passes `false`, together with `showFacesheetNav`. So on the compositions list the
  chart header disappears and the rail grows a patient block instead. **Two treatments of the same
  patient, chosen by a route.**
- **3 is a copy of 1.** Not "similar": it shares verbatim code, see §3.
- **4 is a different domain and visibly a later style.** It carries a docblock explaining its own
  composition, uses `useId` for the heading association, and is the only one of the four with named
  fallback constants for missing data. Nothing links it to 1.

No discernible reason accounts for 1 versus 3. They show overlapping fields about the same patient in
two packages with different type levels, different formatters, and different icons.

---

## 2. What each one shows

### Header 1, `ClinicalPageHeader`

Render order. Left column then right column, then a full-width row beneath.

| Order | Field | Present | Condition, and what renders when absent |
|---|---|---|---|
| 1 | Avatar | Always | Photo if the fetch returns 200. Otherwise `UserFilledIcon`, never initials |
| 2 | Patient name, `h2` | Always | `formatPatientName(patient, true)`. **No fallback:** a patient with no names renders an empty heading, see defect D-6 |
| 3 | Pronouns | Conditional | `patient.pronouns` truthy. Omitted silently |
| 4 | Chart access link | Always | Label is `Restricted` or `Unrestricted` |
| 5 | `DOB: <date> (<age>)` | Always | No guard. A missing dob formats whatever `formatISODateShort` returns |
| 6 | `Gender: <value>` | Always | No guard. Template literal, so `undefined` would print |
| 7 | `Phone: <value>` | Always | No guard |
| 8 | `Legal Name: <value>` | Conditional | Only when `patient.preferredName` is set, because the heading then shows the preferred name |
| 9 | `MRN: <value>` | Conditional | Only when `patient.mrn` is truthy. **Omitted entirely, no placeholder** |
| 10 | Insurance | Conditional | Only when primary or secondary exists. Secondary is separated by a vertical `Divider`; primary is suffixed `(primary)` only when a secondary exists |
| 11 | Allergies, right column | Always | Four states, see §5 |
| 12 | Patient alert chip | Conditional | `patient.alertMessage` truthy |
| 13 | Collect Payment + balance | Conditional | `practicePermissions.billingProductEnabled` |
| 14 | Print | Always | |
| 15 | More menu | Always | |
| 16 | AI note + Create note, or Create selector | Always | One or the other, by the `CLINICAL_NDE` feature flag |

Fields 5 to 10 are one wrapping row of `Label: value` pairs joined by a bullet, rendered by mapping
an object whose `undefined` entries are filtered out. The bullet is emitted as `{i > 0 && " •  "}`
inside the same `Typography` as the label, so **the separator belongs to the field that follows it**.

### Header 2, `ClinicalPageNav`

Name `h3` · restriction link · avatar 70 · an info `IconButton` opening `PatientCard`. No DOB, no
MRN, no insurance, no allergies, no alert. When `patient` is falsy the name becomes a
`Skeleton variant="text"`, which is the only place any of these headers renders a per-field skeleton
rather than a whole-header one.

### Header 3, `notes-ui/PatientInfo`

Name `h3` · `(N y/o)` · dob · `MRN: value` · then a second column: sex with an icon, insurance with
an icon, phone with an icon. MRN and insurance conditional; sex, dob and phone unguarded.
**Age is conditional on `patient?.ageInYears` being truthy**, so an infant under one year old shows
no age at all, see defect D-4.

### Header 4, `SelectedPatientHeader`

Avatar · name `h5` · dob with age · email · phone. **The only header with declared fallbacks:**
`Unnamed patient`, `Email not provided`, `Phone not provided`, each rendered in `text.secondary` so
the absence is visibly an absence. No MRN, no allergies, no alert, no actions.

---

## 3. What each is built from

### Design system and MUI components actually instanced

Header 1 uses `Avatar`, `Box`, `CardMedia`, `Divider`, `Popover`, `Stack`, `Tooltip`, `Typography`,
`Skeleton`, `Chip`, `Button`, `Alert`, `Link`, and the design system's `AttentionFilledIcon`,
`UserFilledIcon`, `PrintOutlinedIcon`, `LockIcon`, `UnlockIcon`.

### Hand-rolled with raw markup

- **The `Label: value` pair.** Built from nested `Typography` with `component="strong"` and a
  literal `{": "}`. No component models this pair, and it is the header's most repeated unit.
- **The bullet separator**, a literal `" •  "` string with two trailing spaces.
- **`<br />` for vertical spacing** in `PatientCard`, twice (lines 97 and 136).
- **`LINE_CLAMP_STYLE`**, a four-property object implementing `-webkit-line-clamp`.

### Recreations of things that already exist. This is the §3 finding.

1. **`LINE_CLAMP_STYLE` is duplicated verbatim across two packages.** Identical object, identical
   name, in `clinical-system/.../PatientOverview.tsx:35-41` and
   `notes-ui/.../PatientInfo.tsx:9-15`. Not imported from anywhere.
2. **The insurance block is copied.** Both files render primary, a vertical `Divider flexItem`, then
   secondary, inside a box with the same `maxWidth="30vw"`. The structure, the divider and the magic
   viewport width all match.
3. **`getPatientAvatar` exists twice**, `clinical-system/src/services/header.ts` and
   `notes-ui/src/services/patient.ts`, and the consuming code duplicates the same
   `arrayBuffer` → `Blob` → `createObjectURL` sequence in both `PatientOverview.tsx` and
   `PatientPhoto.tsx`.
4. **`PatientCard` recreates the card header band.** It uses MUI `CardHeader` and then adds
   `borderBottom: 1px solid divider` by hand. `TEBRA-DESIGN-SYSTEM.md` §3.29 records the band as a
   48px fixed component and `flags.cardHeaderBandDividerDead` records two sites asking for a divider
   with invalid CSS. **This is a third variant: a divider that is asked for and is valid.**
5. **Two loading skeletons are hand-built to mirror two different headers**, one inline in
   `ClinicalPageHeader.tsx`, one as its own file `PatientInfoSkeleton.tsx`. Neither shares code.

### Avatar treatment, specifically

**Four treatments, one component, no agreement.**

| Where | Size | Fallback |
|---|---|---|
| Header 1, `PatientOverview` | `sx` 70 × 70 | `UserFilledIcon fontSize="large"` inside the Avatar |
| Header 1 loading skeleton | circular 70 × 70 | matches, correctly |
| Header 2, `ClinicalPageNav` | `sx` 70 × 70 | **`UserFilledIcon` bare, not inside an Avatar**, so the 70px circle is replaced by a small icon |
| Header 3, `PatientPhoto` | `sx` 70 × 70 | `PatientAvatar.svg`, a local asset |
| Header 3 loading skeleton | **circular 40 × 40** | mismatched against its own 70px avatar |
| Header 4 | no override, so canonical **40** | `avatar.svg`, a different local asset |
| `PatientCard` popover | no override, so canonical **40** | `UserFilledIcon fontSize="small"` |

§3.31 records that `Avatar` has no `size` prop and ships 40. Every product override reaches 70 by
`sx`. **70 is not arbitrary:** the design system's own
`design-system/src/stories/Avatar/Avatar.stories.tsx:111-129` declares a size ramp of
**20, 40, 70, 120, 180**, and the same story file declares a `size` argType control for a prop the
component does not have. Per §1.9 the stories are the only declaration of what counts as part of the
design system, so 70 has a claim that 72 does not.

### Icons the header needs that are not in the certified kit

`UserFilledIcon`, `PrintOutlinedIcon`, `LockIcon`, `UnlockIcon` all exist in
`design-system/src/components/icons/` but are **not among the 41 that ship in the kit**. Only
`AttentionFilledIcon` is. Same shape as D-33.

Header 3 additionally uses three **MUI** icons that are in neither set: `AccountCircleOutlinedIcon`,
`CallOutlinedIcon`, `PaymentOutlinedIcon`.

**Count drift, pinned:** §3.33 records 66 source files in the icons folder. There are now **67**
`.tsx` files, of which 65 end in `Icon.tsx` and two break the convention, `EyeIconClosed.tsx` and
`EyeIconOpen.tsx`. Not investigated further in this pass.

---

## 4. Geometry of header 1

### Height, and the disagreement in it

```tsx
minHeight="104px"
maxHeight="152px" // allow flex to 152 if patient has preferred name and insurance - cannot exceed
                  // this height because what comes below needs to calculate off this - see HeaderNavFrame.tsx
```

**The header is not a fixed height. It is a range, 104 to 152, and the rendered value depends on
data.** It reaches 152 only when the patient has both a preferred name and insurance.

This is the same shape of error as the nav bar's `minHeight: 64`, which §3.30 records as a floor and
not a height, and it has produced the same result: a recorded band height that is really a bound.

### Insets and gaps

| Value | Source | Token? |
|---|---|---|
| Outer padding 16 | `Stack p={2}` in `HeaderContent` | theme spacing, on grid |
| Column gap 16 | `Box gap={2}` | theme spacing |
| Row gap 8 | `Stack gap={1}` | theme spacing |
| Avatar to text gap 16 | `Box gap={2}` | theme spacing |
| Name to pronouns gap 8 | `gap={1}` | theme spacing |
| Field pair gap 8 | `Stack gap={1}` | theme spacing |
| Border 1px `divider`, **all four sides** | `border={1} borderColor="divider"` | theme |
| Avatar 70 × 70 | `sx` literal | **hardcoded.** Nearest 8 multiple 72, off by 2 |
| Allergy icon right margin 12 | `mr="12px"` | **hardcoded.** `theme.spacing(1.5)` is 12, so on grid but bypassing the scale |
| Allergy "View all" left margin 35 | `ml="35px"` | **hardcoded and off grid.** Nearest 8 multiple 32, off by 3 |
| Alert chip left margin 80 | `marginLeft: "80px"` | **hardcoded.** 80 is 10 × 8, on grid, bypassing the scale |
| Alert chip max width | `calc(100% - 80px)` | derived from the same 80 |
| Allergy top margin 8 | `marginTop=".5rem"` | **rem in a px file.** 8 at root 16 |
| Cached-warning top margin 8 | `mt="8px"` | hardcoded, on grid |
| Insurance max width | `maxWidth="30vw"` | **viewport relative.** No token can express this |
| Right links gap | `spacing={{ md: 0.25, lg: 2 }}` | **2 at md, 16 at lg** |

### How it behaves as the page narrows

**It barely does.** There is no `useMediaQuery` anywhere in the header, no breakpoint-driven
restructure, and nothing is hidden. Only two responsive behaviours exist:

1. The right-hand action gap collapses from 16 to **2** below `lg`. Two pixels between adjacent
   buttons, against Material's 8 minimum separation for touch targets.
2. The demographics row is `flexWrap="wrap"`, so field pairs wrap to a second line, which is what
   pushes the header toward its 152 ceiling.

Everything else is a character-count proxy for a width, see §4 note below.

**Pinned, render dependent.** The actual rendered height for any given patient, the point at which
the demographics row wraps, and whether the 152 ceiling clips content are all render outcomes. No
story exists and Storybook is unreachable. **Do not build a fixed-height patient band from this
file.**

### Character counts standing in for pixel measurements

Three magic numbers decide layout by counting characters:

- `INSURANCE_MAX_LENGTH = 98`, commented "approximate max length of insurance names that can be
  displayed in header"
- `TRUNCATED_LENGTH = 41`, commented "max length minus (primary) string and added ellipses divided
  by two"
- `allergiesText.length > 65`, which decides whether a "View All" link appears

All three are proxies for a measurement nobody took, and all three break with a proportional font.

---

## 5. Alerts and status

**The library models status as icon plus text. This header agrees in one place and does something
different in three others, within the same component.**

| Indicator | Treatment |
|---|---|
| **Allergies present** | `AttentionFilledIcon fontSize="small"` + text, whole block `color="error"`. **Icon plus text. Agrees with the library model** |
| **No allergies** | Plain `body1`, no icon, default colour. Three different strings by state |
| **Allergy fetch error** | Same red icon-plus-text treatment, text "Error retrieving Allergy history" |
| **Patient alert** | **`Chip` variant filled color warning**, label prefixed "Patient Alert: ", label colour forced to `black` |
| **Chart access** | **Text `Button` color secondary** with `LockIcon` or `UnlockIcon`, label "Restricted" or "Unrestricted" |
| **Cached data** | `CachedDataWarning` component, a fourth treatment |

**The same datum gets two severities.** `patient.alertMessage` renders as a **warning** Chip in the
header and, in the `PatientCard` popover that the header's own hover opens, as
`<Alert severity="info">`. One message, warning in one surface and info in the other, three files
apart.

Header 3 does something different again: it uses **greyed MUI icons as field labels**
(`color="disabled"`) for sex, insurance and phone, which is icon plus text used for identification
rather than for status.

---

## 6. What is missing

| State | Handled? | Detail |
|---|---|---|
| **Loading** | **Handled**, twice, separately | Header 1 has an inline `LoadingSkeleton`, correctly sized to its 70 avatar. Header 3 has `PatientInfoSkeleton` plus a second skeleton inside `PatientPhoto`, **both circular 40 against a 70 avatar** |
| **Error** | **Handled**, thoroughly | Three `ErrorBoundary` wrappers, one per region, each with a `GeneralError` fallback. A separate no-patient branch. Allergies have their own error string |
| **Missing data, per field** | **Mostly ignored** | MRN, preferred name, pronouns and insurance simply vanish. Dob, gender and phone have no guard at all and interpolate whatever arrives |
| **No name** | **Breaks quietly** | `formatPatientName` joins a filtered array, so a patient with no names returns `""` and the `h2` renders empty. Header 4 is the only one that prints "Unnamed patient" |
| **Long names** | **Handled by truncation** | `WebkitLineClamp: 1` plus a hover `Popover` carrying the full record. Header 4 instead uses `wordBreak: "break-word"` and wraps. **Opposite answers to the same problem** |
| **Long insurance** | Handled by character count | See §4 |
| **No MRN** | Field omitted, no placeholder | A reader cannot tell "no MRN" from "MRN not shown here" |
| **Deceased** | **Not built, and not modelled** | `grep` for `deceased`, `isDeceased`, `dateOfDeath` across `clinical-system` and `notes-ui` returns nothing. The `Patient` type has no such field |
| **Inactive** | **Not built, and not modelled** | Same. The `Patient` type carries no status field of any kind |

The `Patient` type is 22 fields of demographics, contact and insurance, plus `alertMessage`. There is
no lifecycle state in it.

---

## 7. Which one is canonical

**Header 1, `ClinicalPageHeader`, is the defensible choice**, on three grounds at once:

- **Most used.** Six packages reach it. Headers 2 and 3 serve one surface each; header 4 serves one
  domain.
- **Most complete.** It is the only one carrying allergies, alerts, chart access and chart actions.
- **The one the design system has already been measuring.** The facesheet band in B1, D-28 and D-31
  is this component.

It is not the most *correct*. Header 4 is better built, by some distance: declared fallbacks, an
accessible heading association, a docblock, no magic numbers, no copied code. But it shows five
fields in a domain that is not the chart, so it cannot stand in.

**One condition on building it, and it is not a small one.** It cannot be built in Figma as a
fixed-height band, because it is not one. Any Figma component has to model **104 and 152 as two
states of the same header**, driven by whether preferred name and insurance are present. Building a
single 152 frame would reproduce the error that B1 and D-28 already record, and would make the
library assert a height the code explicitly declares a maximum.

---

## 8. Disagreements. Both sides given, none resolved.

**1. The band height is three different numbers.**

| Source | Value |
|---|---|
| `LAYOUT.md` B1 | **152**, derived as 16 + 60 identity + 8 + 38 action + 16, snapped up by L1 |
| `PRODUCT-DRIFT.md` D-28 | **146**, measured from a capture |
| **This pass, from source** | **104 minimum, 152 maximum**, data dependent |

The derivation landing on the code's own maximum is either good corroboration or a coincidence. What
the source adds is that **none of these is a height**. Pinned.

**2. The avatar is four numbers.**

| Source | Value |
|---|---|
| §3.31, and the shipped component | **40** |
| `LAYOUT.md` B1 | **72**, decided-and-flagged |
| D-31 | product renders **~70**, disposition "product wrong" |
| **This pass, from source** | exactly **70**, hardcoded, in four places |
| **Design system's own Avatar story** | ramp of **20, 40, 70, 120, 180** |

The last row is new and it cuts against D-31's disposition. 70 appears in the design system's own
Storybook, which §1.9 treats as the declaration of what belongs to the system. Whether that promotes
70 from product drift to a system size is not a call this pass makes.

**3. The chart rail is three numbers.**

| Source | Value |
|---|---|
| `LAYOUT.md` R2 | **144**, derived from the widest of twelve labels |
| D-29 | **192** measured, disposition "product wrong" |
| **This pass, from source** | `HeaderNavFrame.tsx:52` sets `minWidth={200}` |

200 is a floor, not a width, so it does not directly contradict a measured 192 unless the content is
narrower. But nothing in the record mentions 200 at all. Pinned, and it may be a different surface
from the one D-29 measured.

**4. The 65px nav bar height is confirmed from a second, independent place.**
`HeaderNavFrame.tsx:44-46` sets `height: calc(100vh - 65px)` with the comment "65px is the height of
the Tebra nav". This agrees with §3.30 and the geometry ruling. Recorded as corroboration.

---

## 9. Flagged as defects, not fixed

| # | Defect | Where |
|---|---|---|
| D-1 | **`insurance="test"` and `address="test"` are hardcoded literals shipped in production.** The rail's patient popover shows the word "test" for both fields | `ClinicalPageNav.tsx:129-131` |
| D-2 | Loading skeleton is a 40px circle against a 70px avatar, so the layout jumps 30px when the photo resolves | `PatientPhoto.tsx:41`, `PatientInfoSkeleton.tsx:10` |
| D-3 | `(noKnownAllergies && noKnownMedAllergies) \|\| noKnownAllergies` is redundant; it reduces to `noKnownAllergies`, so the "No known medication allergies" branch is reachable only when `noKnownMedAllergies` alone is true | `Allergies.tsx:52-56` |
| D-4 | `patient?.ageInYears &&` hides the age for any patient under one year old, because 0 is falsy | `PatientInfo.tsx:29` |
| D-5 | The `maxHeight="152px"` comment says the value cannot change "because what comes below needs to calculate off this, see HeaderNavFrame.tsx". **`HeaderNavFrame` contains no such calculation**; it uses `flex={1} minHeight={0}`. 152 appears exactly once in the package. The constraint is justified by something that is not there | `ClinicalPageHeader.tsx:46` |
| D-6 | A patient with no first, middle or last name renders an empty `h2`. `formatPatientName` filters and joins, returning `""` | `patientHelper.ts:66-73` |
| D-7 | `formatPatientAddress` interpolates city, state and zip unguarded, so a partial address produces stray commas | `patientHelper.ts:111-117` |
| D-8 | The alert Chip forces `color: "black"` on its label, a raw CSS keyword rather than any palette entry, overriding whatever contrast the warning Chip was built for | `HeaderRightLinks.tsx:96` |
| D-9 | One `alertMessage` renders as a **warning** Chip in the header and an **info** Alert in the popover the header opens | `HeaderRightLinks.tsx:81` vs `PatientCard.tsx:75` |
| D-10 | `getAgeView` returns "N yo" for adults but "N years old" and "M months old" for children. Three unit styles in one four-branch function | `patientHelper.ts:160-164` |
| D-11 | `ml="35px"` is off the 8 grid by 3 and off any token | `Allergies.tsx:97` |
| D-12 | Right-hand action gap collapses to **2px** below `lg`, against Material's 8 minimum between adjacent targets | `HeaderRightLinks.tsx:109` |

D-1 is the only one visible to a user as obviously broken. D-5 and D-9 are the two most likely to
mislead someone building from this file.

---

## 10. Built as an organism, 2026-08-17

Page `Patient header organism` (517:2). Two states of one header, built as it ships, no captions and
no corrections. 81 nodes, 18 instances, 0 detached, 0 fractional dimensions, 0 components created.

| State | Frame | Content comes to | Clips |
|---|---|---|---|
| Short, declared floor | 1440 × **104** | **146** | yes, by 44 |
| Tall, declared maximum | 1440 × **152** | **168** | yes, by 18 |

Frames are drawn at the two numbers the code declares. Clipping is left on so the gap between the
declared number and the content is visible rather than hidden. Instances: Avatar ×2, Button ×11,
Icon/AttentionFilled ×2, Divider ×1, Alert ×1, Chip ×1.

All four status treatments are present and distinct. The short state carries allergies as icon plus
text and chart access as a coral text button; the tall state adds the warning Chip with its label ink
forced to raw black and the borderless warning Alert for cached data. They are not unified.

Conditional fields carry `CONDITIONAL` in the layer name: pronouns, Legal Name, MRN, insurance,
cached-data warning, alert Chip, Collect Payment. All seven drop out of the short state.

**Built at the hardcoded value, with the near token recorded:** avatar 70 (no token, `space/` has no
70), allergy icon right margin 12 (near `space/12`, exact, but written as a raw `12px` in source),
alert chip left inset 80 (10 × 8, no token at that size), insurance max width 432 (30vw at 1440, no
token can express a viewport unit). Padding 16 and row gap 8 are theme spacing and are bound.

### The arithmetic, which is the main result

    short   16 + 70 + 8 + 36 + 16 = 146   + 2 border = 148
    tall    16 + 92 + 8 + 36 + 16 = 168   + 2 border = 170

Row 1 is 70 in the short state because the avatar sets it. In the tall state the demographics wrap to
a second line, the text column reaches 92, and the avatar stops being the tallest thing in the row.
Row 2 is 36 in both, a text Button at medium.

**146 is exactly the number D-28 measured from a product capture.** The source arithmetic reproduces
the product to the pixel. See §11.

### Fidelity limits of the build, recorded

- **Figma auto-layout has no grow ratio.** Source is `flex={2}` and `flex={1}` over the 1392 available.
  Built as fixed 928 and 464, which is the correct result at 1440 and wrong at any other width.
- **The Avatar instance's inner glyph does not scale when the instance is resized to 70.** Product
  renders `UserFilledIcon fontSize="large"`, which the Tebra ramp sets to `2.5rem`: intended 35 under
  the 16/14 coefficient, computed 40 at root 16. The board's glyph reads smaller than either.
  New library finding, filed as **32** in the `REFERENCE-KIT.md` sequence.
- **Four glyphs are absent from the kit**, so those instances carry the component default and are
  named to say so: `UserFilled`, `PrintOutlined`, `Lock` / `Unlock`, `Book4SparkSharp`. Geometry is
  right, glyph is not.
- **The Create Note split button is not modelled.** Source is a `ButtonGroup` of two segments; the
  board shows the first segment only.
- `AttentionFilledIcon fontSize="small"` is built at its intended **20**. The Tebra ramp computes
  **22.857**, which is fractional and is reported rather than rounded.

## 11. New findings from building. Three, and one of them is large.

### 11.1 The declared floor of 104 cannot be reached. **New defect D-13.**

The content comes to **146** with every conditional field switched off. The avatar alone is 70, the
action row is 36, and the padding and gap account for 40. `minHeight="104px"` is 42 below the floor
the content actually has, so it can never bind. It is dead code.

### 11.2 The configuration the maximum exists for does not fit in the maximum. **New defect D-14.**

The source comment reads *"allow flex to 152 if patient has preferred name and insurance"*. Built
with exactly that configuration, the demographics row wraps to a second line, the text column reaches
92, and the content comes to **168**, or **170** with borders. That is **18 over the maximum the
comment says exists to accommodate it**, so `maxHeight` clips the thing it was written to allow.

**What gets clipped is the bottom of the action row**, which is where Print, More, AI Note Assist and
New Note live. Pinned: this depends on the demographics wrapping, which depends on string lengths
this board chose. With short enough values the row stays on one line and the header sits at 146.

**So the header has two plausible heights, 146 and 170, and 152 is neither.** It is between them and
reachable by neither. Pinned as arithmetic; Storybook is unreachable and there is no story.

### 11.3 D-28's disposition is now questionable. Reported, not resolved.

| Source | Value |
|---|---|
| `LAYOUT.md` B1, first derivation | 144 |
| `LAYOUT.md` B1, recomputed when the band avatar became 72 | 152 |
| **D-28, measured from a product capture** | **146**, dispositioned **product wrong** |
| **This build, from source arithmetic** | **146** of white, 148 with borders |

**The source reproduces the measured 146 exactly.** 16 + 70 + 8 + 36 + 16. If that holds, the product
is not wrong at 146; it is doing what the code says, and the system's 144 and 152 are both derivations
that no code path produces. B1's 152 matching the code's `maxHeight` is a coincidence of a bound, not
a confirmation of a height.

This bears directly on **D-31** as well, which dispositions the 70 avatar as product drift. §3 of this
document already records that 70 is a size in the design system's own Avatar story. Both dispositions
were made before either fact was available. **Neither is resolved here.**

### 11.4 New library finding, filed as 32 in the `REFERENCE-KIT.md` sequence

**The `Avatar` component's inner glyph does not scale with the instance.** Resizing an
`Avatar` instance to 70 leaves the icon at its authored size, where MUI's `AvatarFallback` scales to
75% of the box. Any composition that resizes an Avatar gets a glyph too small for its circle. Related
to but distinct from finding 29's shape: a code behaviour the Figma component does not carry.

## 12. Defect list, unchanged plus two

D-1 through D-12 in §9 stand as filed and none were fixed. Two added:

| # | Defect | Where |
|---|---|---|
| D-13 | `minHeight="104px"` is unreachable. The content floor is 146 with every conditional off | `ClinicalPageHeader.tsx:45` |
| D-14 | The preferred-name-plus-insurance configuration needs 170 and is clipped by the 152 maximum written to allow it. The clipped region is the action row | `ClinicalPageHeader.tsx:46` |

D-14 and D-5 compound: the maximum is justified by a calculation that does not exist **and** it cuts
off the configuration it names. Both live on the same two lines of source.

---

## 13. Authored-height proposal board, and what the original Figma file turned out to say

Page `Patient header, authored height (proposal)` (526:2). One header, shown at two content
configurations, padding 16 on all four sides, height hugging, no `minHeight` and no `maxHeight`.

| Configuration | Height |
|---|---|
| Minimal, every conditional off | **146** |
| Preferred name and insurance present | **168** |

Both are results rather than choices. Figma frame heights exclude the 1px stroke, so the CSS
border-box equivalents are **148** and **170**, matching §11's arithmetic exactly. Nothing clips.

### 13.1 The original Figma file already hugged, with 16 on all four sides

Read from the legacy team library `ZPf0sJy83aPyrHjCVHomya`, "Tebra Working UI Kit", Patterns page,
node **26675:103874** `Patient Header`:

    1440 x 149, layoutMode VERTICAL, primaryAxisSizingMode AUTO, padding [16, 16, 16, 16], gap 5

**AUTO on the primary axis means the height hugged its content.** So the design that predates the
code was already doing what the proposal board does, and the `minHeight` / `maxHeight` pair in
`ClinicalPageHeader.tsx` was added on top of a design that did not have them. By the test set for
this pass, **this stops being a proposal and becomes a drift row.** The board was still built and
named as a proposal, because the instruction was not to change the build on this finding. The board's
own red marker records it.

It lands at **149** against the code's 146. Four numbers now exist for one band, and the two that were
authored independently are 3 apart:

| Source | Value | Kind |
|---|---|---|
| Legacy Figma `Patient Header` | **149** | authored, hugging |
| Source arithmetic, minimal | **146** | computed, this pass |
| D-28 product capture | **146** | measured |
| `LAYOUT.md` B1 | 144, then 152 | derived |

### 13.2 The 10 is not where it was expected

The brief for this board expected the original file to carry a horizontal inset of 10. **It does not.**
The header frame's own horizontal padding is 16, the same as the vertical. Every 10 in the subtree
belongs to a component's internal padding, not to the header:

| Node | Padding | Gap |
|---|---|---|
| `Avatar` instance | 10 / 10 / 10 / 10 | 10 |
| `Text Button / Low Emphasis` | 6 / 10 / 6 / 10 | 5 |
| `Chip - Status / _chip template` | 5 / 10 / 5 / 10 | 5 |
| `Frame 143727048` | 0 | 10 |

So there was nothing at header level for a 10 to compensate for, and the horizontal 16 on the new
board is not a change from the original. Reported, not adjusted.

### 13.3 Other things the legacy header carries that the shipped one does not

- A **title row**, `Patient Information`, 36 tall, above the identity row. The shipped header has no
  such row.
- **Gap 5** between its three rows. 5 is off the 8 grid and matches no token. The shipped header uses
  8.
- A third row inset by **paddingLeft 94**, a number with no evident derivation.
- **Avatar 70**, an `INSTANCE` at exactly 70 x 70.

### 13.4 Avatar 70 now has three independent sources

| Source | |
|---|---|
| Product code | `sx width 70, height 70`, four call sites |
| Design system Storybook | `Avatar.stories.tsx` size ramp 20, 40, **70**, 120, 180 |
| Legacy Figma library | `Patient Header` avatar instance at **70 x 70** |

**D-31 dispositions the 70 as product drift against a system value of 40.** Three independent
authorings now say 70, one of them in the design system's own story file and one predating the code.
Not resolved here. Reported for D-31 to be re-read.

### 13.5 Board separation

The organism board is untouched: both states still at 104 and 152, clipping still on, content still
146 and 168, marker still present, 81 nodes. It remains the evidence that the shipped header clips.
The proposal board is named `Patient header, authored height (proposal)` and its first on-canvas line
reads `PROPOSAL, not what ships. The organism board is what ships.`
