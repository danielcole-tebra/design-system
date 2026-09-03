# Card discovery

Discovery pass, 2026-08-20. **Nothing was built and nothing was fixed.** Read against
`web-app-v2` at design-system `0.19.7`, the hosted Storybook, and the Figma rebuild file
`YX2n4YLrEpBXNbcc73T6dw`.

Every figure below was re-derived this session from the repo, the running Storybook, or the live
Figma file. Where a prior record disagrees with what was read today, both are given and the
disagreement is pinned rather than resolved.

## Sourcing and what could not be re-derived

| Source | State this session |
|---|---|
| `web-app-v2` | Read directly. **No `node_modules`** — see below |
| Storybook | Reachable at `https://fictional-adventure-rre6vjv.pages.github.io/master/`, but **only through the authenticated browser**. `curl` gets a 302 to a GitHub auth page. `index.json` read in-page: 141 entries |
| Figma | `YX2n4YLrEpBXNbcc73T6dw`, identity verified (see §3) |
| `design-system-schema.json` | `components.CardHeaderBand`, `flags.cardHeaderBandDividerDead` |
| `TEBRA-DESIGN-SYSTEM.md` | §3.21, §3.29 |
| `design-coordination/components/ledger.csv` | Row `Card (D-32)` |

**`web-app-v2` has no `node_modules`.** MUI's own source cannot be read this session, so every
substrate figure attributed to MUI below is either (a) observed live in the browser against the
running Storybook, which is marked **observed**, or (b) carried from the schema's 2026-08-03 reading
of `@mui/material` 5.15.12, which is marked **carried**. The two are never mixed in one figure.
`packages/design-system/package.json:40` pins `"@mui/material": "^5.15.11"`.

---

## 1. What the library provides

### Slot by slot

There are **three** Card-family override files out of 37 in `packages/design-system/src/overrides/`.
All three are reproduced in full because all three are short.

**`CardOverrides.ts`** — `defaultProps` only, no `styleOverrides`:

```ts
MuiCard: { defaultProps: { variant: "elevation", square: false, raised: false } }
```

Every one of those three restates MUI's own default. **The file changes nothing.** It is the same
shape as `DialogOverrides.ts`, which sets `maxWidth: "sm"` — also MUI's default, also a no-op.

**`CardActionsOverrides.ts`** — the only `styleOverrides` in the family:

```ts
MuiCardActions: { styleOverrides: { root: { justifyContent: "flex-end" } } }
```

MUI ships `flex-start`. **This is the one real Tebra decision in the whole Card family.**

**`CardActionAreaOverrides.ts`**:

```ts
MuiCardActionArea: { defaultProps: { disabled: true } }
```

The clickable surface ships globally disabled. **Observed** in Storybook: the rendered node is
`<button disabled class="MuiButtonBase-root Mui-disabled MuiCardActionArea-root">` with
`pointer-events: none` and `cursor: default`.

### What is left at MUI defaults

| Key | Override file | Status |
|---|---|---|
| `MuiCardHeader` | — | **Does not exist.** No file, no key, anywhere in the 37 override files |
| `MuiCardContent` | — | **Does not exist** |
| `MuiCardMedia` | — | **Does not exist** |
| `shape.borderRadius` | — | Not set in `theme/theme.ts`; MUI default 4 |
| `shadows` | — | Not set; MUI's 25-step ramp |
| `spacing` | — | Not set; MUI default 8. This matters — see §4 defect D3 |

`theme/theme.ts:80-84` is the whole theme: `createTheme({ palette, typography, components: {...overrides} })`.
There is no `shape`, no `shadows`, no `spacing`, no `MuiPaper`.

### The comparison against `MuiDialogActions`

The brief asks for it and it is worth stating precisely, because the surfaces look alike for
opposite reasons.

- `MuiCardActions` is right-aligned **because Tebra says so**. `CardActionsOverrides.ts` exists and
  overrides MUI's `flex-start`.
- `MuiDialogActions` **has no override file at all**. `grep -rn "MuiDialogActions"` over
  `packages/design-system/src` returns nothing. Dialog actions are right-aligned because **MUI**
  ships `justify-content: flex-end` on `DialogActions` (carried, MUI 5.15.12).

The consequence: if Tebra ever decides card actions should be left-aligned or centred, exactly one
of these two surfaces follows the decision. The other silently keeps MUI's opinion. A designer
reading the rendered app cannot tell them apart.

### Exports

**Card is not exported or re-exported by the design system. It is only reachable through MUI
directly.**

`src/index.ts` exports `./cobranding`, `./components`, `./theme`, `./utils`. `src/components/index.ts`
exports `DataGridFilter`, `Feedback`, `avatars`, `ReadMore`, `TrialFeatureGate`, `icons`,
`illustrations`, `marketingIcons`. No Card, no CardHeader, no CardContent, no CardActions, no
CardMedia, no CardActionArea.

Confirmed from the other end: an import scan across all 141 product render sites resolves **every**
Card-family symbol to `@mui/material`. Not one resolves to `@kareo-engineering/design-system`.

| Symbol | Files importing it | Source |
|---|---:|---|
| `Card` | 128 | `@mui/material` |
| `CardContent` | 108 | `@mui/material` |
| `CardHeader` | 40 | `@mui/material` |
| `CardActions` | 30 | `@mui/material` |
| `CardMedia` | 11 | `@mui/material` |
| `CardActionArea` | 1 | `@mui/material` |

The design system's relationship to Card is entirely one of theming, and the theming is three
defaults that change nothing plus one alignment rule.

---

## 2. The stories

### Every Card story

`index.json` on the hosted build carries **two** entries under `Components/Surfaces/Card`, both from
`./src/stories/Card/Card.stories.tsx`. **There is no docs page for the group** — no `.mdx`, no
autodocs entry.

| Story id | Name | What it demonstrates |
|---|---|---|
| `components-surfaces-card--card-example` | Card | One 400px-wide card: header with avatar, action icon, title, subheader → `CardActionArea` wrapping a 200px `CardMedia` and a `CardContent` → `CardActions` with two text buttons. The `variant` argType (outlined / elevation) is the only control |
| `components-surfaces-card--card-variations` | Card Variations | Two cards stacked: a 350px `outlined` card with `CardContent` + `CardActions`, and a 350px `square` elevation card with `CardActionArea` → `CardMedia` 140 → `CardContent`, then `CardActions` |

### Tebra content vs MUI sample content

**Both stories are close lifts of MUI's own Card demos. The content is MUI's, not Tebra's.**

| Story | Content | Verdict |
|---|---|---|
| `CardExample` | "Shrimp and Chorizo Paella" / "September 14, 2016" / "Yummy" / "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like." / Share / Learn More | **Lift.** MUI's `RecipeReviewCard` demo, verbatim |
| `CardVariations` card 1 | "Word of the Day" / "be•nev•o•lent" / "adjective" / "well meaning and kindly. / a benevolent smile" / Learn More | **Lift.** MUI's `OutlinedCard` demo, verbatim, bullet separators included |
| `CardVariations` card 2 | "Lizard" / "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" / Share / Learn More | **Lift.** MUI's `MediaCard` / `ActionAreaCard` demo, verbatim |

**What is actually Tebra in these files** — the complete list:

1. The image `src` swapped from MUI's `/static/images/cards/*` to a kareo.com banner URL. It is dead
   (§2 broken links).
2. `RightCaretIcon` from the Tebra barrel replaces MUI's `MoreVertIcon` in the header action.
3. Widths pinned — `sx={{ width: 400 }}` and `sx={{ width: 350 }}`.
4. `CardExample` wraps its whole body in `<Box padding={2}>`, which MUI's demo does not.
5. `CardExample.args = { variant: "elevation", square: true, raised: true }`.

Item 5 is the interesting one. **The story's default args contradict the library's defaults.**
`CardOverrides.ts` sets `square: false, raised: false`. The story opens with `square: true,
raised: true`. **Observed** in Storybook: the story renders `MuiPaper-elevation8` with
`border-radius: 0px`, not the `elevation1` / `4px` a consumer gets from the theme.

Under the rule that stories declare membership, these three stories declare almost nothing about
Tebra. A designer opening the Card group sees paella, a dictionary entry, a lizard, three broken
images, a card that does not use the theme's own defaults, and a click target that cannot be
clicked. Nothing there is a Tebra decision except the right-aligned actions, and that one is
invisible because MUI's demos happen to put two buttons in a row anyway.

**Two Tebra-authored card compositions do exist in the Storybook source, but not in the Card group:**

- `stories/Popover/PatientCard.example.tsx` — patient name, DOB, "Contact", phone/email/address,
  Close / Create Appointment. Real Tebra content. Filed under `Components/.../Popover`.
- `stories/Portal/AppointmentCard.example.tsx` — a `<table>` of Resources / Location / Visit Reason /
  Appt Note / Patient Intake / Balance, actions Create Clinical Note / More Options. Real Tebra
  content. Filed under `Components/.../Portal`.

Neither appears when a designer opens Card. Both are more informative about what a Tebra card holds
than all three Card stories combined.

### The broken links

**One dead URL, three occurrences, all in `Card.stories.tsx`. All three are image sources. All three
render broken.**

`https://www.kareo.com/sites/default/files/ck/webupload/images/banners/11/default-login-ad-card.jpg`

- `Card.stories.tsx:37` — `<CardMedia component="img" src=...>` inside an `Avatar`
- `Card.stories.tsx:53` — `<CardMedia component="img" height={200} src=...>`
- `Card.stories.tsx:120` — `<CardMedia component="img" height={140} image=...>` (note: `image=` here,
  `src=` at the other two — MUI treats them identically for an `img` component, but the file is
  inconsistent with itself)

**What it points at.** Not a dev resource. It is a marketing banner on the old kareo.com CMS. The
path 301s to `https://www.tebra.com` and returns `text/html`, 430KB, `200 OK`. The rebrand collapsed
the whole `/sites/default/files/...` tree onto the homepage.

**How it fails.** Not silently, and not loudly either. **Observed** in Storybook: both `<img>`
elements report `complete: true, naturalWidth: 0` — the browser received HTML where it expected a
JPEG and could not decode it. The rendered result is the browser's broken-image placeholder inside a
reserved 200px (or 140px) box. Screenshot of `CardVariations` confirms: a tall empty white box with
a broken-image glyph in the top-left corner, above the "Lizard" text. No console error, no network
failure, no red — the request succeeded, it just isn't an image. It reads as "the picture hasn't
loaded yet" rather than "this is broken", which is why it has survived.

`stories/Alert/AlertActions.example.tsx:18` also links `https://www.kareo.com/`, which 301s to
tebra.com and is a working link. The only *broken* URL in the whole `stories/` tree is the Card one.
`stories/Popover/PatientCard.example.tsx:39` uses an S3 avatar URL that returns `200 image/png`,
38KB — that one works.

---

## 3. Card in Figma

### File identity

Per `design-system-schema.json` rule 7 (`fileIdentityFirst`), the page list was checked before any
read informed anything.

**`get_metadata` with no `nodeId` returns exactly one page — `118:250 Cover`.** That is not the file.
Both Figma MCP servers return the same truncated list. This is a tool defect, not a wrong file:
reading the page list through the Plugin API returns all fifteen pages, and the nine recorded pages
appear in the recorded order.

```
118:250 Cover · 145:2 Tokens · 259:2873 Actions · 259:2874 Inputs · 259:2875 Data display ·
259:2876 Feedback · 259:2877 Surfaces & navigation · 259:2878 Icons & illustrations · 259:2879 Reference
+ 446:2 Table exemplars · 563:2 DataGrid exemplars · 489:2 Page template exemplars ·
  497:2 Drawer exemplars · 509:2 Drawer in page exemplars · 536:2 Action row exemplars
```

Identity confirmed. **Flagged for the next pass: `get_metadata`'s page listing cannot be used for
the identity check. Use `use_figma` with `figma.root.children`.**

### What exists today

`Card` is a `COMPONENT_SET` at **`176:59`** on `Surfaces & navigation`, 830×260, published to the
`Design System Rebuild` library, `updatedAt 2026-08-19T01:48:49Z`.

**One axis, two variants.** `Variant: VARIANT = ["Elevation", "Outlined"]`. Both 350×140.

Structure — identical in both variants:

```
Card (VERTICAL, radius 4 bound, fill white bound, pad 0)
├── Content   FRAME  VERTICAL  pad 16/16/24/16  gap 8   ← bound paddings
│   ├── Title  TEXT  "Card title"                 Akkurat LL Bold 14/20
│   └── Body   TEXT  "Supporting copy for the card."  Akkurat LL Regular 14/20
└── Actions   FRAME  HORIZONTAL  pad 8  gap 8  align MAX/CENTER   ← bound paddings
    ├── Button INSTANCE "Share"
    └── Button INSTANCE "Learn more"
```

- **Elevation** carries effect style `S:fd6437619397b55367b2b23ebd8e85a01a4eadf1` — three drop
  shadows at y2/r1, y1/r1, y1/r3, which is MUI's `shadows[1]`.
- **Outlined** carries a 1px stroke at `rgb(214,214,214)` = **`#D6D6D6`**, bound to a variable. That
  is `palette.divider` (Synapse 4). No shadow.

### Does it match the overrides?

Yes, and it is the one place where the `flex-end` decision is legible. `Actions` is
`primaryAxisAlignItems: MAX` — the Figma spelling of `justify-content: flex-end` — with padding 8,
which is exactly what `CardActionsOverrides.ts` plus MUI substrate produces. `Content` at
`16/16/24/16` models `CardContent`'s 16px box with the 24px last-child bottom. Radius 4 and the
elevation-1 shadow match a themed Card at its real defaults, **not** the `square + raised` the story
opens with.

The component description on the set is unusually complete and already records the
`CardActionArea` trap: *"CARDACTIONAREA IS NOT AN AXIS ... the ripple surface ships disabled and has
no reachable hover model — it is a state that does not exist rather than one to model."*

**What is not modelled:** no `CardHeader` band, no `CardMedia`, no `CardActionArea`, no hover, no
selected, no loading, no error, no empty. Two variants, one axis, no states.

### The header band in Figma

**The band is not part of the Card component.** It exists once, on the `Reference` page, as
`373:833 REFERENCE — Card header band (not a component)`, 900×404, on `background.default`.

It holds two example bands side by side inside white `Card` frames:

| | Frame | Geometry |
|---|---|---|
| **CORRECT — 48px fixed, title centred** | `373:840` | `HORIZONTAL`, `FIXED/FIXED`, `48` tall, pad `0/16/0/16`, `align MIN/CENTER` |
| **WRONG — 16px padding + hug = 68px** | `373:845` | `HORIZONTAL`, `FIXED/AUTO`, `68` tall, pad `16/16/16/16`, `align MIN/CENTER` |

**No divider is drawn on either.** That matches the schema's `handling` note on
`flags.cardHeaderBandDividerDead`: *"Do NOT draw a divider on the Figma band until Daniel decides."*

### D-32

The row, verbatim from `design-coordination/components/ledger.csv:4`:

```csv
Card (D-32),provisional,,unavailable,not-yet-rebuilt,"","",design-system,,"D-32 card fingerprinting
unresolved: audit could not establish whether the observed variants are one component with props or
distinct components."
```

`NOTES.md` expands it: *"a single component gets one row and one `code_value`, distinct components
get a row each ... Capture passes may add evidence to `production_observed`, but evidence does not
settle this — it's a modeling decision."*

**Does the row still hold? Three of its five filled cells are now wrong.**

| Cell | Ledger says | Repo says today | Verdict |
|---|---|---|---|
| `storybook_state` | `unavailable` | Two stories, live, reachable, read this session | **Stale.** Superseded by COVERAGE-SURVEY 2026-08-19 |
| `figma_state` | `not-yet-rebuilt` | Built. `176:59`, 2 variants, published 2026-08-19 | **Stale** |
| `code_value` | blank | Derivable: radius 4, elevation 1, `CardActions` `flex-end`, `CardContent` 16/24 | **Fillable** |
| `status` | `provisional` | — | Holds, but for a different reason than recorded |
| `open_question` | fingerprinting | — | **The question is now answerable, and the answer is not the one the row anticipates** |

The ledger's own rules say the repo wins and the ledger gets regenerated, so this is reported, not
edited.

**On the open question itself.** The audit asked whether "the observed variants" are one component
with props or distinct components. Evidence now says: for the **library**, one component with one
prop — Figma's single `Variant` axis is a faithful model of `MuiCard`, which really does have exactly
one meaningful axis. The fingerprinting problem was never in Card. It is in the **card header band**,
which is not a Card prop, is not themed, is not a component in any of the three sources, and has
seven distinct product implementations (§4). D-32 as written points at the wrong object. That is a
modelling call and is left to you.

---

## 4. The header band

This is the sharpest problem and the section has grown since the last pass.

### The flag, and where it now points

`flags.cardHeaderBandDividerDead` records two occurrences at
`facesheet-ui/src/components/Card/FacesheetCard.tsx:217` and
`facesheet-ui/src/components/Card/CardLayout.tsx:170`, and calls them *"the only two occurrences of
this pattern in the monorepo."*

**Both still exist. Both line numbers have drifted.**

| Flag says | Reads today |
|---|---|
| `FacesheetCard.tsx:217` | **`FacesheetCard.tsx:112`** |
| `CardLayout.tsx:170` | **`CardLayout.tsx:153`** |

The CSS at both, character for character:

```tsx
sx={{ borderBottom: "1px solid background.default", height: "3rem" }}
```

**Why it does not render.** In MUI's `sx`, theme-path resolution runs per *property*, and only for
properties in the style-function tables — `borderColor` resolves a palette path, `borderBottom` does
not. A full CSS shorthand string is passed through verbatim to emotion. The browser then parses
`border-bottom: 1px solid background.default`, finds `background.default` is not a valid CSS
`<color>`, and **discards the entire declaration** rather than falling back to `currentColor`. So
`border-bottom` is never set at all. The intended colour was `background.default` = **`#E8E5DF`**
(Backbone 3).

The `height: "3rem"` on the same line **does** apply — it is a plain property.

**The effect is worse than a missing line.** A rendered facesheet card is pixel-identical to one
that never asked for a divider. Nothing in a browser, a screenshot, or a Figma trace of a screenshot
can distinguish "we asked for a divider and lost it" from "we chose not to have one." It is findable
only in source. This is the exact failure the *never measure from a rendered component* rule exists
to catch.

### The third band — `PatientCard`

`clinical-system/src/components/ClinicalPageHeader/PatientOverview/PatientCard.tsx:70`:

```tsx
sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
```

**Correction to the brief.** This is not `borderBottom: 1px solid divider`. It is a **theme
callback**, which is one of the two spellings the flag itself names as the fix. It resolves before
emotion ever sees it, and it **renders**.

But it does not agree with the dead one:

| | Colour asked for | Renders? |
|---|---|---|
| `FacesheetCard` / `CardLayout` | `background.default` = **`#E8E5DF`** Backbone 3 | **No** |
| `PatientCard` | `divider` = **`#D6D6D6`** Synapse 4 | **Yes** |

**Two different tokens, two different greys.** The schema's `components.CardHeaderBand.resolved.divider`
records the intended divider as *"1px bottom in Backbone 3 #E8E5DF"* — which is true of the two dead
sites and false of every site that actually draws one. Pinned, not resolved: **if the divider is
revived, which grey is it?** The only evidence that survives contact with a browser says `#D6D6D6`.

`PatientCard` differs further: no `height`, so the band **hugs**; title is `variant="h3"`, not `h2`;
it carries an `avatar` slot and a `subheader`. It is a different band that happens to sit on a Card.

### The clinical-system band has moved, and the branch that draws it is unreachable

The schema records six clinical-system sites — `ProblemsCard.tsx:68`, `VitalsCard.tsx:66`,
`LabsCard.tsx:79`, `MedicationsCard.tsx:69`, `ImmunizationsCard.tsx:79`, `HistoryCard.tsx:92` — each
with `height: '3rem'` gated on `FULLSCREEN`.

**None of those six sites exists today.** The seven clinical-system facesheet cards render no
`<Card>` and no `<CardHeader>` at all now; they are bare content components. The band was refactored
into one place:

`clinical-system/src/components/Facesheet/Cards/LayoutAwareCard.tsx:44-56`

```tsx
case FacesheetLayout.FULLSCREEN:
  return (
    <Card sx={{ minHeight: "10rem" }} {...props}>
      {title && (
        <CardHeader
          title={<Typography variant="h2" color="primary" component="div">{title}</Typography>}
          sx={{ height: "3rem" }}
        />
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
```

Six per-site copies collapsed into one shared component. That is an improvement, and it is not
recorded anywhere. **But the branch is dead.**

`LayoutAwareCard`'s only consumer is `FacesheetDrawer.tsx`, at eight call sites. `FacesheetDrawer` is
rendered by `Facesheet.tsx:63` **only when `layout === FacesheetLayout.DRAWER`**. So every
`LayoutAwareCard` that ever mounts reads `DRAWER` from `LayoutContext` and takes the `Accordion`
branch. **The `FULLSCREEN` branch — the `<Card>`, the 48px band, the `CardContent` — cannot render
in product.** The other branch, `FacesheetPage`, does not use `LayoutAwareCard` and carries the
comment *"this page is unused, duplicated in facesheet-ui"* (`FacesheetPage.tsx:21`), echoed at
`Facesheet.tsx:71`.

### How many distinct treatments, how many render, which is correct

Across the 41 `<CardHeader>` sites in `web-app-v2`, **seven** distinct treatments:

| # | Treatment | Sites | Renders? |
|---|---|---:|---|
| 1 | `borderBottom: "1px solid background.default"` + `height: "3rem"` | 2 | **No — invalid CSS** |
| 2 | `height: "3rem"`, no divider | 1 | **Unreachable** — dead branch |
| 3 | `borderBottom: \`1px solid ${theme.palette.divider}\`` (useTheme callback) | 5 | Yes, `#D6D6D6` |
| 4 | `borderBottom: "1px solid"` + `borderColor: "divider"` (split properties) | 1 | Yes, `#D6D6D6` |
| 5 | A sibling `<Divider />` element instead of a border | 17 | Yes, `#D6D6D6`, but as a separate node |
| 6 | Padding-only bands, no rule of any kind | ~9 | Yes |
| 7 | Hand-rolled `styled.div`, not `CardHeader` at all | 5 | Yes |

**Treatment 1** — `facesheet-ui/.../FacesheetCard.tsx:112`, `CardLayout.tsx:153`.

**Treatment 2** — `clinical-system/.../LayoutAwareCard.tsx:52`.

**Treatment 3** — `admin-ui/.../A2PRegistration/Header/A2PRegistrationHeader.tsx:121`,
`admin-ui/.../ClinicalSettings/ErxEnrollment/EPCSCard.tsx:41`,
`admin-ui/.../ClinicalSettings/ErxEnrollment/ErxEnrollmentPracticeSettings.tsx:188`,
`admin-ui/.../ClinicalSettings/MessagesPage/MessagesPage.tsx:105`,
`clinical-system/.../PatientOverview/PatientCard.tsx:70`. All five use `useTheme()`.

**Treatment 4** — `notes-ui/src/components/Error/ErrorPage.tsx:50`. This is the only site that uses
the idiom the flag's own `fix` field recommends.

**Treatment 5** — two independently authored components, both named `SectionCard`, in two packages,
neither aware of the other, both `Card → CardHeader → Divider → children`:
`admin-ui/.../ProviderProfilePage/SectionCard.tsx:34` (13 instances) and
`treatment-plan-ui/src/components/wiley/SectionCard.tsx:31` (4 instances).

**Treatment 6** — `patient-history-ui` uses `padding: "16px 0 0 16px"` at three sites
(`HealthStatusPage.tsx:231`, `SocialHistoryCard.tsx:126`, `TravelHistoryPage.tsx:97`); elsewhere
`py: "8px"`, `py: "0.5rem"`, `pt: 0, px: 1, pb: 2`, `paddingBottom: 0`, `pt: "0px", pb: "2px", px: "1px"`.

**Treatment 7** — `ordering-system/src/components/customStyles.tsx:28`:

```ts
export const CardBodyHeader = styled.div`
  margin-bottom: 16px;
  div.MuiTypography-root { font-size: 20px; .MuiTypography-h4 { margin-right: 8px; } }
`;
```

Used at five prescription-preview card sites. A hand-rolled band that reimplements `CardHeader`
badly — `font-size: 20px` is a literal, not a typography variant, and it reaches into MUI's internal
class names to set it.

**So: seven treatments, six render, one does not, and one of the six that renders can never mount.**

**Which is correct.** Treatment 4 is correct **as CSS** — split properties are the only spelling that
both resolves the token and survives emotion. Treatment 3 is equally correct and more widely used.
**Neither is authoritative as a design decision**, because nothing above is a design decision — there
is no `MuiCardHeader` key anywhere, so the band is a product convention that eight teams invented
independently. The schema's `figmaBuildNote` already fixes the geometry (48px fixed, title centred,
16px horizontal) and explicitly defers the divider to you. That deferral still stands, and the new
evidence sharpens it: **the divider question is now also a token question**, `#E8E5DF` vs `#D6D6D6`.

### Defects flagged, not fixed

| | Defect | Where |
|---|---|---|
| **D1** | Divider declared as an sx shorthand with a theme path inside; entire declaration invalid, nothing renders | `facesheet-ui/.../FacesheetCard.tsx:112`, `CardLayout.tsx:153` |
| **D2** | `LayoutAwareCard`'s `FULLSCREEN` branch is unreachable — its only consumer renders inside the `DRAWER`-gated subtree | `clinical-system/.../LayoutAwareCard.tsx:42-57` vs `Facesheet.tsx:63` |
| **D3** | `<CardContent sx={{ paddingBottom: 16 }}>` — `paddingBottom` routes through the spacing transform and the base is MUI's default 8, so this is **128px**, not 16px | `facesheet-ui/.../FacesheetCard.tsx:122` |
| **D4** | `DRAWER_CARD_STYLE` is orphaned — declared at `types/facesheet.ts:203`, its only import commented out | `clinical-system/.../LayoutAwareCard.tsx:13` |
| **D5** | `FacesheetCards.test.tsx:43` mocks a `StyledCard` export that no longer exists anywhere in the package | `clinical-system/.../Cards/FacesheetCards.test.tsx` |
| **D6** | Two unrelated components both named `SectionCard`, same shape, no shared code | `admin-ui`, `treatment-plan-ui` |
| **D7** | `<Avatar sx={{ width: "40px", heightL: "40px" }}>` — typo, the height is never set | `design-system/src/stories/Popover/PatientCard.example.tsx:36` |

Two entries in `TEBRA-DESIGN-SYSTEM.md` §3.29 are **now stale and should not be carried forward**:
bug 3 (`ImmunizationsCard` hardcoding `DRAWER_CARD_STYLE`) no longer describes the code — the
clinical cards render no Card at all; and the claim that `FacesheetCard`'s twin writes
`padding: "0 16px 16px 16px"` no longer matches — that string does not appear in the monorepo.

---

## 5. How many cards are there

**141 `<Card>` render sites across 124 files in `web-app-v2`**, plus 6 more in `.test.tsx` /
`.stories.tsx`. 147 total across 128 files. Two of the 141 are in `packages/design-system`'s own
`.example.tsx` files, so **product proper is 139 sites across 122 files, in 22 packages.**

| Package | Sites | | Package | Sites |
|---|---:|---|---|---:|
| `admin-ui` | 41 | | `patient-intake-admin-ui` | 4 |
| `messages-ui` | 13 | | `payment-collection-ui` | 4 |
| `patient-engagement-ui` | 12 | | `clinical-system` | 3 |
| `appointment-workflow-ui` | 9 | | `notes-ui` | 3 |
| `customer-upgrade-ui` | 8 | | `payment-subscription-ui` | 3 |
| `patient-intake-ui` | 8 | | `facesheet-ui` | 2 |
| `patient-history-ui` | 7 | | `mfa-ui` | 2 |
| `telehealth-ui` | 5 | | `patient-appointment-actions-ui` | 2 |
| `medications-ui` | 4 | | `scheduling-settings-ui` | 2 |
| `ordering-system` | 4 | | `navigation-ui`, `not-found-ui`, `treatment-plan-ui` | 1 each |
| | | | `design-system` (`.example.tsx`) | 2 |

**Which implementation.** All 141 use **MUI's Card imported directly from `@mui/material`**. Zero
use a library Card, because there is no library Card (§1). There is exactly **one** `styled(Card)` in
the whole monorepo: `ordering-system/src/components/customStyles.tsx:11`, `PreviewCard`.

### Things recreating a Card rather than instancing one

`<Paper>` appears at 170 sites across 135 files, and Card *is* Paper, so most of those are not
recreations. Filtering to surfaces that assert **both** a radius and an edge (border or shadow)
gives 46 candidates; hand-reading those, the following are genuinely card-shaped containers built
without Card:

| File | Line | What it is |
|---|---:|---|
| `admin-ui/.../MessageRouting/MessageRoutingTable/MessageRoutingTable.tsx` | 87 | `Paper variant="outlined"` + `borderRadius: 2` + `boxShadow: 1` wrapping a table |
| `claim-denial-predictor-ui/.../Feedback/FeedbackBanner.tsx` | 25 | `Paper elevation={4}` + radius 2 + `border: "1px solid rgba(21,101,192,0.12)"` + a bespoke shadow + `backgroundColor: "#dcecef"` |
| `claim-denial-predictor-ui/.../LowRiskPage/LowRiskPage.tsx` | 20 | White `Box`, radius 2, `boxShadow={8}`, fixed 230×160 — a metric tile |
| `composition-ui/.../CompositionEditor/CompositionEditor.tsx` | 419 | `Paper elevation={0}` + `border: 1, borderColor: divider` + radius 1.5 |
| `composition-ui/.../CreateCompostion.tsx` | 82, 126, 139, 149 | Four `Paper` panels, radius 1.5–2, `grey.300`/`grey.400` borders |
| `multipractice-dashboard-ui/.../PracticePerformanceUnavailable.tsx` | 19 | `Paper elevation={0}`, radius 3, `divider` border, `maxWidth: 960` |
| `patient-history-ui/.../Common/CommonErrorPage.tsx` | 154 | `Paper`, radius 1, `divider` border, `boxShadow: shadows[0]` |
| `patient-history-ui/.../Sdoh/SdohPage.tsx` | 492 | Same recipe as above, same file family |
| `patient-history-ui/.../CareTeam/CareTeam.tsx` | 211 | `Box`, `background.paper`, radius 1, `divider` border |
| `payment-subscription-ui/.../WorklistStyleDataGrid.tsx` | 280 | `Box`, radius 1, `divider` border, wrapping a DataGrid |
| `payments-onboarding-ui/.../AboutYou/OnboardingStatus/CreateForm.tsx` | 188 | `Paper` used as a 236×236 selectable tile, `borderRadius: "5%"` |
| `self-signup-ui/.../TrialSignup/EmailVerification.tsx` | 270 | `Paper elevation={0}`, radius **4**, `border rgba(16,24,40,0.08)`, `boxShadow 0px 2px 10px rgba(16,24,40,0.08)` |
| `self-signup-ui/.../TrialSignup/TrialSignupAccountReady.tsx` | 47 | **Identical recipe, copy-pasted** |
| `self-signup-ui/.../TrialSignup/TrialSignupProvisioning.tsx` | 126 | **Identical recipe, copy-pasted** |
| `patient-appointment-actions-ui/.../RescheduleAppointment/RescheduleIframeOverlay.tsx` | 180 | `Box`, `background.paper`, responsive radius `{xs:0, sm:3}`, `shadows[3]` |
| `patient-appointment-actions-ui/.../PolicyBanner/PolicyBanner.tsx` | 18 | `Box`, radius 2, `grey.500` border, `grey.300` fill |
| `admin-ui/.../A2PRegistration/ApprovedMessage/...ApprovedMessage.tsx` | 35 | `Box`, radius 5, 2px border, `grey[50]` fill |
| `admin-ui/.../A2PRegistration/OTPVerification/...OTPVerification.tsx` | 246 | `Box`, responsive radius, `grey[300]` border, `core[100]` fill |

**Three of those — the `self-signup-ui` trio — are byte-identical surface recipes in three files,
using a colour (`rgba(16,24,40,0.08)`) that appears nowhere in the palette.** That is the clearest
case of recreating rather than instancing in the sweep.

`ordering-system`'s `PreviewCard` is the opposite case and worth naming for contrast: it *is* a Card,
extended by `styled()`, but it re-asserts a border as `rgba(214, 214, 214, 1)` — which is `#D6D6D6`,
which is `palette.divider` — spelled as an rgba literal, and a bespoke `0px 2px 4px 0px rgba(0,0,0,0.14)`
shadow that matches no elevation step.

---

## 6. What cards hold

### The grouping

| Group | Sites | Share |
|---|---:|---:|
| **Header plus text** — a title and prose, nothing else | 49 | 35% |
| **A form** | 28 | 20% |
| **A loading or skeleton state, standing alone** | 18 | 13% |
| **Media** — an image, illustration or avatar leading | 12 | 9% |
| **A list or accordion stack** | 4 | 3% |
| **A table or DataGrid** | 4 | 3% |
| **Something else** — layout wrappers, containers, empty shells | 26 | 18% |

Classified by what actually appears between `<Card>` and `</Card>`, non-test sites only.

**No card in `web-app-v2` holds a single number or metric.** The closest thing is
`claim-denial-predictor-ui/.../LowRiskPage.tsx:20`, a fixed 230×160 white tile with a shadow — and
it is a `Box`, not a Card. If a metric tile is wanted, it does not exist yet and would be a new
decision, not a rebuild.

### One line each, by what they hold

Rather than 141 lines, the recurring shapes, with counts and representative sites:

- **Settings section** — title, description paragraph, a rule, then either a read view or an edit
  form. 17 sites, all through the two `SectionCard` components.
- **Page shell** — a Card that is the page. Header, then the whole feature. `admin-ui`
  ProductSetup (5), `telehealth-ui` (5), `patient-intake-ui` Welcome / ThankYou / form container.
- **Modal body** — a Card standing in for a Dialog surface, absolutely positioned or in a portal.
  **8 sites**: `ReviewAllocationModal:107`, `ExternalWebsiteModal:69`, `GooglePlacesModal:49`, two
  separate `LeadsieModal:23`, `RecordingDialog:61`, `InsuranceModal:37`, `Modal.tsx:26`. All eight
  could have used Dialog and did not.
- **Product banner / announcement** — icon or illustration, headline, body, one action.
  `messages-ui` ProductBanner (4), `appointment-workflow-ui` panels (4), `CareConnectBanner`,
  `PublicReviewsToggleBanner`.
- **Error / dead-end page** — a centred Card with an apology and one button. **5 sites**:
  `clinical-system/Error/ErrorPage.tsx:25`, `notes-ui/Error/ErrorPage.tsx:49`, `not-found-ui/App.tsx:6`,
  and two `InvalidLink.tsx:14` in different packages with the same `sx={{ maxHeight: "200px", py: 4, px: 2 }}`.
- **Skeleton twin** — a Card whose whole job is to be the loading shape of another Card. **3 sites**:
  `ProviderProfilePageSkeleton.tsx:15`, `UserFormSkeleton.tsx:6`, `ConnectGoogleBusinessProfilesLoading.tsx:14`.
  Each is a hand-built parallel of a real card, maintained separately from it.
- **Data surface** — a Card wrapping a DataGrid or table and nothing else. 4 sites:
  `ErxRequestsDataGrid:335`, `PendingOrdersDataGrid:225`, `VisitReasonsListPage:357`,
  `TemplateCard:32`.
- **Facesheet clinical card** — the band, then a query-driven list. 2 sites (`facesheet-ui`), and the
  dead `LayoutAwareCard` branch.
- **Selectable plan tile** — 4 sites across `customer-upgrade-ui` and `payment-subscription-ui`.

### Is there a load ladder worth building?

**Yes, and it is unusually clean.** Grouping the 141 sites by how many Card slots they use:

| Slots used | Sites | Share |
|---:|---:|---:|
| **0** — bare `<Card>`, children laid out by hand in `Box` / `Stack` / `Grid` | **72** | 51% |
| **1** | 31 | 22% |
| **2** | 28 | 20% |
| **3** | 9 | 6% |
| **4** | 1 | <1% |

Broken out by which slots:

| Composition | Sites |
|---|---:|
| `Card` alone | 72 |
| `Card` + `CardContent` | 28 |
| `Card` + `CardHeader` + `CardContent` | 19 |
| `Card` + `CardContent` + `CardActions` | 8 |
| `Card` + `CardHeader` + `CardContent` + `CardActions` | 7 |
| `Card` + `CardHeader` alone | 3 |
| everything else (media-bearing) | 4 |

That is a ladder in the same sense the drawer had one: four rungs, each a strict superset of the
last, with real population at every rung and a heavy base.

**The headline finding for the build: the most common card in Tebra uses none of Card's slots.**
Half of all card sites are a bare `<Card>` with a padding `sx` and hand-arranged children. The Figma
component — Content + Actions, both slots filled — models rung 3, which describes 15 of 141 sites.
It does not model the rung that describes 72.

Whether the ladder should be built as a Card with hideable slots, or as separate components per
rung, is the D-32 modelling call and is not made here. The evidence says the axis worth modelling is
**which slots are present**, not `elevation` vs `outlined` — that axis is already built and covers a
7-to-1 split (`elevation` is the default at 134 sites, `outlined` is used at 7).

---

## 7. Actions

**34 `<CardActions>` sites.** That is 24% of the 141 Card sites — three quarters of Tebra's cards
have no actions inside the card at all.

**Where they sit.** All 34 are the last child of their Card, at the bottom. No card puts actions in
the header slot instead; the `action` prop of `CardHeader` is used at 13 sites, but that is a
different thing — a single icon or button beside a title, not an action row.

**Do they follow the override?**

| | Sites |
|---|---:|
| **Plain `<CardActions>`, inherits `justifyContent: flex-end`** | **23** |
| **Overrides the alignment** | **9** |
| Sets `sx` but not alignment | 2 |

So **23 of 34 follow the library's opinion, 9 contradict it, 2 are neutral.** Two-thirds compliance.

### Every card whose actions disagree with the override

| File | Line | What it sets | Effect |
|---|---:|---|---|
| `patient-appointment-actions-ui/.../AppointmentCardContainer.tsx` | 48 | `display: "block", px: 2, pb: 2, pt: 0` | **Cancels the flexbox.** `justify-content` has no meaning on a block container, so `flex-end` is inert. Each action stacks full-width |
| `patient-appointment-actions-ui/.../CancelAppointment.tsx` | 176 | same | same |
| `patient-appointment-actions-ui/.../CancelAppointment.tsx` | 189 | same | same |
| `patient-appointment-actions-ui/.../RescheduleAppointment.tsx` | 225 | same | same |
| `patient-appointment-actions-ui/.../RescheduleAppointment.tsx` | 238 | same | same |
| `patient-intake-ui/.../PatientIntake/Form/PatientIntakeFormContainer.tsx` | 168 | `justifyContent: "flex-start", gap: 1` | **Left-aligned.** Direct contradiction |
| `patient-intake-ui/.../Welcome/Welcome.tsx` | 61 | `justifyContent: "flex-start", p: 2` | **Left-aligned.** Direct contradiction |
| `appointment-workflow-ui/.../ProductAnnouncementPanelView.tsx` | 78 | `justifyContent: "center", pb: 2` | **Centred** |
| `mfa-ui/.../MfaConfirmationForm.tsx` | 197 | `justifyContent: "space-between"` + responsive column stack | **Split** — one action left, one right |

The disagreement is not random. It clusters:

- **`patient-appointment-actions-ui` — 5 of 5 sites** neutralise the override the same way, with the
  same `display: "block", px: 2, pb: 2, pt: 0` and a `<Divider sx={{ my: 2 }} />` above the actions.
  That package has its own card-footer convention and does not use the library's.
- **`patient-intake-ui` — both sites** left-align. That package has the opposite opinion.

The two remaining `sx`-but-not-alignment sites:
`appointment-workflow-ui/.../AppointmentCardV2.tsx:289` (`position: sticky, bottom: 0, backgroundColor:
background.paper` — a pinned footer that still right-aligns) and
`admin-ui/.../UploadAdditionalForm.tsx:172`, which writes `display: "flex", justifyContent: "flex-end"`
by hand — restating the override it already has.

**This is the value of having an opinion.** Because `CardActionsOverrides.ts` exists, disagreement is
legible: 9 sites are visibly arguing with the design system, and two whole packages have standing
counter-conventions. Compare `DialogActions`, which has no override — its sites cannot disagree with
anything, so nothing is measurable there.

---

## 8. Geometry

For the most-used implementation: **a bare `<Card>` (72 sites), and its nearest neighbour
`<Card><CardContent>` (28 sites).**

### Substrate — what a themed Card is before any `sx`

| Property | Value | Source |
|---|---|---|
| `border-radius` | **4px** | **Observed** — outlined Card in `CardVariations` computes `4px`. `theme.shape` is not overridden |
| `background-color` | **`#fff`** = `background.paper` | **Observed** `rgb(255,255,255)` |
| `box-shadow` (elevation, default) | MUI `shadows[1]` — `0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)` | **Observed** |
| `border` (outlined) | **1px solid `#D6D6D6`** = `palette.divider` | **Observed** |
| `overflow` | `hidden` | **Observed** |
| `CardContent` padding | **16px** all sides | **Observed** |
| `CardContent` last-child padding-bottom | **24px** | **Carried.** Neither story places `CardContent` last, so this could not be observed. The Figma build models it as `16/16/24/16` |
| `CardHeader` padding | **16px** | **Observed** |
| `CardHeader` `align-items` | `center` | **Observed** |
| `CardActions` padding | **8px** | **Observed** |
| `CardActions` `justify-content` | **`flex-end`** | **Observed** — the Tebra override is live |

### Header band height

**48px, fixed**, at the three sites that declare one — all write `height: "3rem"`.

The declared padding cannot be honoured, and this is not an opinion: 16 top + 36 line-height + 16
bottom = 68px of content in a 48px `border-box`. Because `CardHeader` root is `align-items: center`,
the title still centres, so the real result is a 48px band with **6px** of effective breathing room,
not 16. `((48 − 36) / 2 = 6)`. The Figma `Reference` frame already carries both the correct and the
wrong build side by side (§3).

### Gap between sections

**There is none in the substrate.** Card is not a flex or grid container; `CardHeader`, `CardContent`
and `CardActions` stack as blocks and their own paddings meet. Vertical rhythm between sections is
whatever the two adjacent paddings sum to — 16 + 16 between a header and content.

Figma authors an explicit `gap: 8` between the Content frame's Title and Body. **That gap does not
exist in code** — MUI's demo relies on `gutterBottom` and paragraph margins. Flagged as a Figma-side
authoring choice that has no code counterpart, not as a defect.

### Values from tokens vs hardcoded

**Padding.** 21 padding declarations on `<Card>` elements, in **eight different spellings**:

| Spelling | Count | Resolves to |
|---|---:|---|
| `p: 2` | 5 | 16px — token (spacing × 8) |
| `p: 3` | 4 | 24px — token |
| `py: 4` | 3 | 32px — token |
| `padding: 4` | 3 | 32px — token |
| `px: 2` / `px: 1` / `px: 3` / `py: 2` / `pt: 1.5` / `pb: 0` / `paddingX: 3` / `paddingY: 1` | 8 | token |
| `p: theme.spacing(4)` | 1 | 32px — token, long spelling |
| `p: "1rem"`, `padding: "1rem"`, `px: "1rem"` | 3 | **16px — hardcoded.** `p: 2` is the token spelling, distance **0** |
| `p: "1.5rem"` | 1 | **24px — hardcoded.** `p: 3` is the token spelling, distance **0** |
| `padding: "40px"` | 1 | **40px — hardcoded.** `p: 5` = 40px, distance **0** |
| `paddingBottom: 16` | 1 | **128px** — see defect D3 |
| `paddingBottom: 12` | 1 | 96px — probably also unintended, same mechanism, `payment-collection-ui/.../InsuranceRecordPage.tsx:32` |

Four hardcoded padding values, all at **distance 0** from a token — they are the same number written
the long way. **Not snapped. Reported.**

**Radius.** 7 `borderRadius` declarations on `<Card>`: six write `2` (= 16px? no — `borderRadius` in
`sx` multiplies `theme.shape.borderRadius`, so `2` = **8px**) and one writes `3` (= 12px). The
substrate is **4px**. So seven sites double or triple the radius, none of them agreeing on why.
`self-signup-ui`'s three hand-rolled surfaces write `borderRadius: 4` = **16px**.

**Shadow.** Four `boxShadow` declarations on `<Card>`, and only one uses the ramp
(`(theme) => theme.shadows[3]`). The others are bespoke: `0px 2px 12px alpha(black, 0.1)`
(`customer-upgrade-ui/.../PlanCard.tsx:79`), `boxShadow: 3` (a ramp index, fine), and `"none"`
(`patient-history-ui/.../SdohPage.tsx:541`). `ordering-system`'s `PreviewCard` writes
`0px 2px 4px 0px rgba(0,0,0,0.14)` — matches **no** elevation step.

**Border colour.** 5 sites write `borderColor: "divider"` — token. 1 writes
`` `1px solid ${theme.palette.core.light}` `` — token, `#D4E0DD`. `ordering-system`'s `PreviewCard`
writes `rgba(214, 214, 214, 1)` = **`#D6D6D6`** = `palette.divider`, **distance 0**, spelled as an
rgba literal. `ar-dashboard-ui/.../ButtonTabs.tsx:29` writes `#8CA7A2` = `core.dark`, **distance 0**.
`payment-subscription-ui/.../SubscriberActionDialog.tsx:399` writes `#8CAEB0`, which is **near but
not equal** to `core.dark` `#8CA7A2` (ΔG +7, ΔB +14), and `#D4E8EA`, near but not equal to
`primary.100` `#CBDDE0`. Those two are genuinely off-palette. **Not snapped. Reported.**

### Does a card author a height, or hug?

**Overwhelmingly it hugs.** Of 141 sites, 30 declare any vertical dimension:

| Declaration | Count | Note |
|---|---:|---|
| `height: "100%"` | 11 | Fill the parent — a layout instruction, not a card height |
| `minHeight: "10rem"` | 3 | The facesheet floor, 160px |
| `minHeight: 0` | 3 | Flex-shrink enabler, not a height |
| `height: "calc(100vh - 190px)"` / `"calc(100vh - 170px)"` | 2 | Viewport-locked page shells |
| `maxHeight: "200px"` | 2 | The two `InvalidLink.tsx` twins |
| `height: 454`, `height: 96`, `height: "630px"` ×2, `minHeight: 280`, and 5 conditional expressions | 9 | Genuine authored heights |

So: **~7 of 141 sites author a real fixed height.** Everything else hugs its content or fills its
parent. **The Figma component should hug vertically**, which is what `176:23` / `176:42` do
(`primaryAxisSizingMode: AUTO`). The band is the exception and is already specified as 48 fixed.

---

## 9. States

Scanned across all 141 non-test Card sites for state handling inside the Card body.

| State | Sites handling it | Share |
|---|---:|---:|
| **Loading** | 45 | 32% |
| **Disabled** (any `disabled` in the subtree) | 31 | 22% |
| **Error** | 12 | 9% |
| **Selected** | 9 | 6% |
| **Hover** | 7 | 5% |
| **Empty** | 5 | 4% |
| **None of the above** | **74** | **52%** |

### Per state

**Loading — handled, three incompatible ways.**

1. *In place.* `facesheet-ui/.../FacesheetCard.tsx:116-120` swaps the content for a centred
   `<CircularProgress size={25} />` while the band stays. Card keeps its `minHeight: "10rem"` so it
   does not collapse.
2. *A placeholder Card.* `facesheet-ui/.../CardLayout.tsx:142-165` builds a whole second Card for the
   Supplements slot, with the same band, `minHeight: 10rem`, and a spinner box sized
   `calc(10rem - 3rem)` — the card height minus the band height, arithmetic done by hand.
3. *A skeleton twin.* Three separate files (`ProviderProfilePageSkeleton.tsx`, `UserFormSkeleton.tsx`,
   `ConnectGoogleBusinessProfilesLoading.tsx`) each hand-build a parallel Card of `<Skeleton>` shapes
   maintained separately from the real card.

None of the three knows about the others.

**Error — handled, narrowly.** 12 sites. The only reusable treatment is `CardContentError`
(`facesheet-ui/src/components/CardContent/CardContentError.tsx`): the sentence *"We're having
trouble loading this data."* and a small secondary Refresh button, right-aligned inside a
`Grid direction="row-reverse"`. `facesheet-ui` also wraps content in a `react-error-boundary` with
the same fallback, so a thrown render error and a failed fetch produce the same card. Everywhere
else, error is an `<Alert>` dropped into `CardContent`.

**Empty — mostly ignored.** 5 sites. The only real treatment is per-card prose in the facesheet
family: *"No known problems"*, *"No known medications"*. There is no shared empty state and no card
draws an empty frame — an empty card is a card with less text in it.

**Selected — 9 sites, and none of them is a Card state.** Every one is a `selected` variable inside
the card's children (a radio, a chip, a highlighted row). **No Card renders a selected appearance for
itself.** `payment-subscription-ui/.../PlanCard.tsx` is a selectable tile and still has no selected
style — it fires `onSelect` and nothing about the card changes.

**Disabled — 31 sites, and none of them is a Card state either.** Every one is a disabled button or
field inside. **No Card is disabled as a surface.**

**Hover — 7 sites, all hand-written.** `bgcolor: "action.hover"` (`#CBDDE0`, Growth 4) at
`FacesheetCard.tsx:79-81` and `StaffGroupCard.tsx:34`; `borderColor: "primary.main"` +
`boxShadow: 3` + a `150ms` transition at `PlanCard.tsx:29-33`. There is no shared hover.

### Is any card interactive as a whole?

**Three, and all three are built differently. None uses `CardActionArea`.**

| Site | How | Assessment |
|---|---|---|
| `facesheet-ui/.../FacesheetCard.tsx:152-158` | `<Box component="a" onClick={...} sx={{cursor:"pointer", textDecoration:"none"}}>` wrapping the Card. The handler does `window.location.href = url` | **Defect D8.** An `<a>` with **no `href`** is not focusable, gets no link role, and cannot be activated by keyboard. The Card also has `&:hover { bgcolor: action.hover }` at :79. The handler is named `handleCardActionAreaClick` — a fossil of a `CardActionArea` that was removed |
| `admin-ui/.../StaffGroupCard.tsx:34` | `<Card role="button" tabIndex={0} aria-label={...} onClick onKeyDown>` plus `:hover` and a `:focus-visible` 2px `primary.main` outline | **Correct.** The only accessible whole-card target in the monorepo |
| `payment-subscription-ui/.../PlanCard.tsx:20-34` | `<Card onClick={() => onSelect(plan)} sx={{cursor:"pointer", "&:hover":{...}}}>` | **Defect D9.** No `role`, no `tabIndex`, no `onKeyDown`. Mouse-only |

**`CardActionArea` is used at exactly 2 sites in the entire monorepo, both in `Card.stories.tsx`, and
both are disabled by the theme.** `CardActionAreaOverrides.ts` sets `defaultProps: { disabled: true }`
globally, so the story markup expects an interactive card and gets a `<button disabled>` with
`pointer-events: none`. **Observed.** Any consumer wanting the ripple would have to pass
`disabled={false}` explicitly, and none does.

That override is the reason the three real interactive cards each invented their own mechanism.

---

## 10. Which one is canonical

**No single product implementation is defensible as the thing to build, and I am not going to pick
one.** Here is why, plainly, and here is what *is* buildable.

### Why nothing in product qualifies

The obvious candidate is the facesheet card — it is the most specified, it has the header band, a
load ladder, an error state, and it is the one the schema already measured. It fails on three counts:

1. It is **2 sites out of 141**, in a package whose own page comments say the other implementation is
   the duplicate.
2. Its band **does not render** (D1) and its content padding is **128px** (D3). Building it faithfully
   means building two defects into Figma; building it corrected means Figma asserts a design
   decision — which grey the divider is — that nobody has made.
3. Its twin, `LayoutAwareCard`, **cannot mount** (D2).

The next candidate is `SectionCard` — 17 instances, the most-used *named* card pattern. It fails
because there are **two of them**, in two packages, independently authored (D6), and the pattern is
Card + CardHeader + `<Divider/>` + children, which is a **composition**, not a component. Building it
in Figma is the `FacesheetTotals` question over again.

The largest single population — **72 bare `<Card>` sites, 51%** — is the honest answer to "what is a
Tebra card", and it is precisely the thing that cannot be built as a component, because its defining
property is that it has no internal structure.

### What is defensible

Split the question, because the sources already do.

**The surface is settled and is already correctly built.** Figma `176:59` — two variants, radius 4,
elevation 1 / 1px `#D6D6D6`, Content 16/16/24/16, Actions padding 8 right-aligned — agrees with the
theme, agrees with the substrate, and agrees with what is **observed** in a browser. The one thing it
should gain is a way to express the bare rung: **51% of cards use no slots at all**, and the current
component cannot represent that. That is a boolean-slot change to an existing component, not a new
component.

**The band is not settled and should not be built.** Seven treatments, six render, one is
unreachable, two disagree on which grey, and the two that ask for a divider are the two that do not
draw one. The `Reference` frame at `373:833` is the right place for it and is already there.

**D-32 as written is asking about the wrong object.** The fingerprinting question — one component
with props, or several — has a clean answer for Card (**one**, one axis, already built) and no answer
at all for the band (**not a component in any of the three sources**). The decision actually waiting
on you is not Card's shape. It is:

- **(a)** Does the header band get a divider, and if so, `#E8E5DF` (Backbone 3, what the dead code
  asked for) or `#D6D6D6` (Synapse 4, what every rendering site uses)?
- **(b)** Is the load ladder — 0 / 1 / 2 / 3 slots — modelled as boolean props on the one Card, or as
  separate components?
- **(c)** Does `CardActionArea` stay globally disabled? Three teams have each hand-rolled a clickable
  card around it, one of the three is accessible, and the design system currently has no interactive
  card at all.

Those three, answered, close D-32. Card's own variants do not need another pass.

---

## Disagreements pinned, not resolved

| # | Source A | Source B | Status |
|---|---|---|---|
| 1 | Schema: intended divider is `background.default` **`#E8E5DF`** | Every rendering site uses `divider` **`#D6D6D6`** | Open. The only evidence that survives a browser says `#D6D6D6`, and it comes from sites the schema never counted |
| 2 | `flags.cardHeaderBandDividerDead`: `FacesheetCard.tsx:217`, `CardLayout.tsx:170` | Reads at **`:112`** and **`:153`** | Line drift. Pattern and file both correct |
| 3 | Schema: *"8 header bands ... 2 of 8 ask for a divider"* | 41 `CardHeader` sites, **7** treatments, **6** ask for a rule of some kind | The 8 was the facesheet family only. The monorepo-wide figure was never taken |
| 4 | Schema `treatmentsFound`: six clinical-system sites with per-card `height: "3rem"` | **Zero.** Refactored into `LayoutAwareCard.tsx:52`, one site, unreachable | Superseded by a refactor the record does not know about |
| 5 | §3.29 bug 3: `ImmunizationsCard` hardcodes `DRAWER_CARD_STYLE` | `DRAWER_CARD_STYLE` is orphaned; `ImmunizationsCard` renders no Card | Stale. Do not carry forward |
| 6 | §3.29: twin writes `padding: "0 16px 16px 16px"` | That string does not appear in the monorepo | Stale |
| 7 | Ledger `Card (D-32)`: `storybook_state = unavailable`, `figma_state = not-yet-rebuilt` | Two live stories; Figma set `176:59` published 2026-08-19 | Ledger stale on both. Repo wins per `LEDGER-RULES.md` |
| 8 | `CardOverrides.ts`: `square: false, raised: false` | `Card.stories.tsx` args: `square: true, raised: true` | The story shows a card the theme would never produce. **Observed**: `elevation8`, `radius 0px` |
| 9 | `CardActionsOverrides.ts`: `justifyContent: flex-end` | 9 of 34 sites override it; two packages have standing counter-conventions | Open. Two-thirds compliance |
| 10 | Figma Card Content frame: `gap: 8` between Title and Body | No gap exists in MUI or in any product card | Figma-side authoring choice with no code counterpart |

## Defects flagged, not fixed

| # | Defect | Location |
|---|---|---|
| D1 | Header divider written as an sx shorthand with a theme path inside; whole declaration invalid, nothing renders | `facesheet-ui/.../FacesheetCard.tsx:112`, `CardLayout.tsx:153` |
| D2 | `LayoutAwareCard`'s `FULLSCREEN` branch is unreachable — only consumer sits inside the `DRAWER`-gated subtree | `clinical-system/.../LayoutAwareCard.tsx:42-57` |
| D3 | `sx={{ paddingBottom: 16 }}` on `CardContent` resolves to **128px** | `facesheet-ui/.../FacesheetCard.tsx:122` |
| D3b | Same mechanism, `paddingBottom: 12` → 96px | `payment-collection-ui/.../InsuranceRecordPage.tsx:32` |
| D4 | `DRAWER_CARD_STYLE` orphaned; declared at `types/facesheet.ts:203`, only import commented out | `clinical-system/.../LayoutAwareCard.tsx:13` |
| D5 | Test mocks a `StyledCard` export that no longer exists | `clinical-system/.../FacesheetCards.test.tsx:43` |
| D6 | Two unrelated `SectionCard` components, same name, same shape, no shared code | `admin-ui`, `treatment-plan-ui` |
| D7 | `sx={{ width: "40px", heightL: "40px" }}` — typo, height never set | `design-system/.../stories/Popover/PatientCard.example.tsx:36` |
| D8 | Whole-card link built as `<Box component="a">` with **no `href`** — not focusable, no role, keyboard-inaccessible. Handler still named `handleCardActionAreaClick` | `facesheet-ui/.../FacesheetCard.tsx:46, 152-158` |
| D9 | Clickable card with `onClick` but no `role`, `tabIndex` or `onKeyDown` — mouse-only | `payment-subscription-ui/.../PlanCard.tsx:20` |
| D10 | Dead image URL, 3 occurrences; 301s to `tebra.com` and returns HTML. Renders as a broken-image placeholder in a reserved 200px / 140px box | `design-system/src/stories/Card/Card.stories.tsx:37, 53, 120` |
| D11 | Same file spells the image prop two ways — `src=` twice, `image=` once | `Card.stories.tsx:37, 53` vs `:120` |
| D12 | `styled(Card)` re-asserts `palette.divider` as `rgba(214,214,214,1)` and a shadow matching no elevation step | `ordering-system/src/components/customStyles.tsx:11-26` |
| D13 | `CardBodyHeader` reimplements `CardHeader` as a `styled.div` reaching into MUI internal class names, with a literal `font-size: 20px` | `ordering-system/src/components/customStyles.tsx:28-36` |
| D14 | Three byte-identical hand-rolled card surfaces using an off-palette colour `rgba(16,24,40,0.08)` | `self-signup-ui/.../EmailVerification.tsx:270`, `TrialSignupAccountReady.tsx:47`, `TrialSignupProvisioning.tsx:126` |
| D15 | Off-palette colours near but not equal to `core.dark` / `primary.100` | `payment-subscription-ui/.../SubscriberActionDialog.tsx:399` |
| **T1** | **Tooling:** `get_metadata` with no `nodeId` returns **1** of the file's **15** pages. The `fileIdentityFirst` check cannot be run with it. Use `use_figma` → `figma.root.children` | Both Figma MCP servers |
| **T2** | **Tooling:** Storybook is unreachable from `curl` — 302 to GitHub auth. It is only readable through the authenticated browser | Hosted build |

---

## 11. Where to go and look

Routes below are the real URLs. `web-app-v2` mounts at **`/v2/`** and `root-config`'s
`microfrontend-layout.html` runs single-spa in **hash mode**, so every path is
`/v2/#/{app}/{...}`. Confirmed against `documents-ui/.../DocumentIdpPatientMatches.tsx:99`
(`/v2/#/facesheet/{patientId}`) and `usePracticeSettingsMenu.test.ts:383`
(`#/admin/practice-settings/scheduling-widget`).

Feature toggles are named where a route or a section is gated, because several of these screens do
not exist without one.

---

### T1 — Dead shorthand. The band that asks for a divider and does not draw one

**2 sites** · `facesheet-ui/.../FacesheetCard.tsx:112`, `CardLayout.tsx:153`

| | |
|---|---|
| **URL** | `/v2/#/facesheet/{patientId}` |
| **Click path** | Open any patient chart. The Facesheet is the default clinical page. From Documents, clicking a matched patient name goes straight here (`documents-ui/.../DocumentIdpPatientMatches.tsx:99`, `PatientTemplate.tsx:40`) |
| **Mount** | `facesheet-ui/src/App.tsx:12` → `ClinicalPageFacesheet` → `Facesheet.tsx:97` → `CardLayout` |

**What you will see.** Two columns of cards, split evenly by `CardLayout.tsx:252-257`: Medications,
Vitals, Labs, Problems, History, plus Supplements and Recommendations when enabled. Each card has a
48px title band, title in `h2` at `primary.main` `#004852`, and **no line under it**. The absence is
the defect — the code asks for `#E8E5DF` and gets nothing.

**To catch `CardLayout.tsx:153` specifically** you need the *Supplements placeholder*, which renders
only while `isSupplementsLoading` is true (`CardLayout.tsx:186-190`). Throttle the network, or block
the supplements request, and a seventh card appears at the top of the list titled "Supplements" with
a spinner in a `calc(10rem - 3rem)` box. Same dead divider.

**Also visible here:** defect D3. `FacesheetCard.tsx:122` writes `sx={{ paddingBottom: 16 }}`, which
is **128px**. Every one of these cards has 128px of empty space below its content.

**And D8.** The whole card is clickable — it navigates to `url` via `window.location.href`. Try
tabbing to it. You cannot: it is a `<Box component="a">` with no `href`.

---

### T2 — Height only, no divider. Nothing to click

**1 site** · `clinical-system/.../LayoutAwareCard.tsx:52` · **unreachable**

| | |
|---|---|
| **URL** | `/v2/#/notes/patient/{patientId}/note` |
| **Click path** | Open a patient chart → open or create an AI Note → click **"View Chart Details"** in the note header (`notes-ui/.../NoteHeader/NoteHeader.tsx:34`) |

**What you will see: accordions, not cards.** The drawer opens with Patient Summary, Medications,
Problems, History, Vitals, Allergies, Labs and Studies, Immunizations — each an `Accordion` with a
`Typography fontWeight={700}` summary and an expand caret.

**Why the Card branch never appears.** `LayoutAwareCard` switches on `LayoutContext`. Its only
consumer is `FacesheetDrawer`, and the only thing that mounts `FacesheetDrawer` is
`notes-ui/.../AINote/Note.tsx:135`, which passes:

```tsx
layout={1} // FacesheetLayout.DRAWER
```

`FacesheetLayout.DRAWER === 1` (`clinical-system/src/types/facesheet.ts:3-6`) — the literal is
correct. So the context is always `DRAWER`, always takes the `Accordion` branch, and the `<Card>` +
48px band at `LayoutAwareCard.tsx:44-56` cannot render. **This is defect D2, in a form you can
click:** open the drawer, see accordions, and know the Card code above them is dead.

---

### T3 — Theme callback. The five bands that actually draw a line

**5 sites** · renders `#D6D6D6` (`palette.divider`, Synapse 4)

#### T3a — A2P Registration

| | |
|---|---|
| **URL** | `/v2/#/admin/practice-settings/a2p-registration` |
| **Click path** | Platform → Practice Settings → **Messaging** → **A2P Registration** |
| **Gate** | System admin or provider (`usePracticeSettingsMenu.ts:114`) |
| **Site** | `admin-ui/.../A2PRegistration/Header/A2PRegistrationHeader.tsx:121` |

Band reads **"A2P Registration"** in `h2` with a status Chip inline beside it, and a subheader line
in `grey[500]` at `0.875rem` giving the last-modified date and user. Grey rule underneath. Note this
one uses `component="section"` on the `CardHeader`.

#### T3b + T3c — eRx Enrollment. **Two of the five on one screen**

| | |
|---|---|
| **URL** | `/v2/#/admin/practice-settings/clinical/erx-enrollment` |
| **Click path** | Platform → Practice Settings → **Clinical** → **eRx Enrollment** |
| **Gates** | `dark-feature.id.me` to see the menu item; `dark-feature.web-app-v2-erx-enrollments` to get the v2 page rather than the v1 redirect |
| **Sites** | `ErxEnrollmentPracticeSettings.tsx:188` (top card) and `EPCSCard.tsx:41` (below it) |

Top card band reads **"eRx Enrollment"**, `titleTypographyProps={{ variant: "h2" }}`, with a
"Verified" Chip in the action slot. It adds
`"& .MuiCardHeader-action": { margin: "auto" }` to vertically centre that chip — a fix the schema's
band spec does not carry, because `CardHeader`'s substrate `align-self: flex-start` otherwise pins
the action 12px from the top.

Second card band reads **"EPCS Enrollment"**, same `h2`, with a "Case Submitted" Chip. Same divider,
but **no** action-centring fix — so on this one screen you can see the action slot aligned two
different ways under two identical-looking bands.

#### T3d — Chart Messages

| | |
|---|---|
| **URL** | `/v2/#/admin/practice-settings/clinical/messages` |
| **Click path** | Platform → Practice Settings → **Clinical** → **Chart Messages** |
| **Gates** | `dark-feature.patient-messages-facesheet`, **system admin only**, plus `dark-feature.web-app-v2-erx-enrollments` |
| **Site** | `admin-ui/.../ClinicalSettings/MessagesPage/MessagesPage.tsx:105` |

Band reads **"Patient Messages Visible on Chart"** in `h2` with a **Switch** in the action slot, and
the same `margin: "auto"` centring fix as T3c.

#### T3e — Patient details popover

| | |
|---|---|
| **URL** | Any clinical page — facesheet, note, medication list, treatment plan, patient history |
| **Click path** | In the **left chart sidebar**, next to the 70px patient photo, click the **ⓘ icon button** labelled *"Open patient details"* (`clinical-system/.../ClinicalPageNav/ClinicalPageNav.tsx:110-113`) |
| **Site** | `clinical-system/.../PatientOverview/PatientCard.tsx:70` |

A Popover opens holding a Card. Band is avatar + patient name + pronouns in `h3` + DOB and age as a
subheader, with a grey rule under it. **This band has no `height`, so it hugs** — it is not 48px, and
its title is `h3`, not `h2`. It is the only rendering divider in the clinical shell and it agrees
with none of the others on geometry.

**Flagged, new — D16.** `ClinicalPageNav.tsx:129-133` mounts it as:

```tsx
<PatientCard insurance="test" address="test" patientImgSrc={patientPhotoUrl ?? ""} />
```

Both props are hardcoded placeholder strings. **You will see the literal word "test" beside
"Insurance:" and again as the address line.** This ships.

---

### T4 — Split properties. The only site using the idiom the flag recommends

**1 site** · `notes-ui/src/components/Error/ErrorPage.tsx:50`

| | |
|---|---|
| **URL** | `/v2/#/notes/patient/{patientId}/note` |
| **Click path** | Open an AI Note for a patient the current user is **not permitted to chart on** |
| **Trigger** | `notes-ui/.../AINote/Note.tsx:76-78` — renders only when `getDialogError()` returns a blocking `AccessControlError`. Popover-level errors do not reach it |

A 650px centred card. Band reads **"Oops, something went wrong!"** (or the error's own title) in
`h2`, with a grey rule under it, then an illustration and a link to the support centre.

This is the hardest of the seven to reach deliberately. The reliable route is chart-access
restriction — `dark-feature.clinical-protected-patient-chart` with a patient outside the user's
permitted set.

---

### T5 — A sibling `<Divider />` instead of a border. The most-instanced treatment

**17 sites across two independently authored components (defect D6)**

#### T5a — Provider Profiles. **13 of the 17 on one page**

| | |
|---|---|
| **URL** | `/v2/#/admin/practice-settings/provider-profiles/{providerGuid}` |
| **Click path** | Platform → Practice Settings → **Provider Profiles** → click a provider row |
| **Gate** | `hasVisibleArea("provider-profile")` |
| **Site** | `admin-ui/.../ProviderProfilePage/SectionCard.tsx:34` |

Thirteen stacked cards, titles from `admin-ui/src/constants/providers.ts`:

> Profile Details · Provider Bio · Categories · Conditions Treated · Insurances · Locations ·
> Online Booking · Other Information · Procedures · Review Profiles · Services · Social Media ·
> Care Connect Global Settings

Each: title in **`h3`**, an outlined **"Edit"** button in the action slot, then a `<Divider/>`, then
a description paragraph in `body1`, then a **second** `<Divider/>`, then the section body.

**This is the single best screen for seeing the header-band problem.** Scroll it and you are looking
at thirteen bands that agree with each other and with nothing else in the product.

#### T5b — Wiley treatment plan

| | |
|---|---|
| **URL** | `/v2/#/treatment-plans/wiley/{patientGuid}` (optionally `/{treatmentPlanId}`) |
| **Click path** | Patient chart → Treatment Plans → open or create a Wiley plan |
| **Site** | `treatment-plan-ui/src/components/wiley/SectionCard.tsx:31` |

Four cards: **① Clinical Context**, **② Goals**, **③ Objectives & Interventions**, **Plan Details**.
Differences from T5a: `variant="outlined"` rather than elevation; a numbered `Avatar` (32×32,
`primary.main`) in the avatar slot; a Chip badge in the action slot; **one** Divider, not two; and a
`locked` prop that drops the title to `text.disabled` when a prerequisite section is incomplete.
Lock ② and ③ by leaving ① empty to see that state.

**Open T5a and T5b side by side.** Same component name, same shape, two packages, no shared code —
and the divider is a full-bleed sibling node in both, where T3 and T4 inset it as a border on a
padded box.

---

### T6 — Padding only, no rule at all. **All three sites on one screen**

**3 sites** · all write `padding: "16px 0 0 16px"`

| | |
|---|---|
| **URL** | `/v2/#/patient-history-ui/{patientId}/social-history` |
| **Click path** | Patient chart → History → **Social History** |
| **Gate** | `dark-feature.clinical-travel-history` — without it the route does not exist (`patient-history-ui/src/App.tsx:15`) |
| **Mount** | `patient-history-ui/src/pages/SocialHistory.tsx:90-95` |

Three cards stacked top to bottom:

1. **"Social History"** — `SocialHistoryCard.tsx:126`
2. **"Health Status"** — `HealthStatusPage.tsx:231`, additionally gated `dark-feature.clinical-health-status`
3. **"Travel History"** — `TravelHistoryPage.tsx:97`

All three titles are `h3`, all three bands write `padding: "16px 0 0 16px"` — 16 top, 16 left,
**zero right, zero bottom**, no height, no rule. The title sits hard against the content below it
with no separation of any kind. Three cards, one screen, one spelling, and it disagrees with every
other treatment in the product.

`/v2/#/patient-history-ui/{patientId}/social-history/legacy` renders the same three inside a
full-viewport shell if you want them without the chart chrome.

---

### T7 — Hand-rolled `styled.div`. Not a CardHeader at all

**5 sites** · `ordering-system/src/components/customStyles.tsx:28` (`CardBodyHeader`)

| | |
|---|---|
| **URL** | `/v2/#/medications-ui/patient/{patientGuid}/prescription` |
| **Click path** | Patient chart → Medications → start a prescription → fill the required fields → click **"Send Medication"** (`ordering-system/.../PrescriptionActions.tsx:276`). The Prescription Preview dialog opens |
| **Note** | If an order is already open the button reads **"View Order Summary"** instead and you get a different screen. Clear the order queue first |

The dialog holds five cards, all `PreviewCard` (`styled(Card)`), each with a `CardBodyHeader` band:

> Patient · Prescriber · Pharmacy · Medication · Compound Medication

The band is a bare `<div>` with `margin-bottom: 16px`, styled by reaching into MUI's own class names
(`div.MuiTypography-root { font-size: 20px }`). **No `CardHeader`, no `h2`, no rule, no 48px, and the
type size is a literal that follows no typography variant.**

Also visible here: **defect D12** — `PreviewCard` draws its 1px border as `rgba(214, 214, 214, 1)`,
which is `#D6D6D6`, which is `palette.divider` spelled as an rgba literal, and a
`0px 2px 4px 0px rgba(0,0,0,0.14)` shadow that matches no elevation step.

---

### Fastest tour

Four URLs cover six of the seven, and three of them show multiple bands at once:

| Order | URL | Treatments seen |
|---:|---|---|
| 1 | `/v2/#/admin/practice-settings/provider-profiles/{guid}` | **T5a** ×13 — the agreed-on treatment |
| 2 | `/v2/#/admin/practice-settings/clinical/erx-enrollment` | **T3b + T3c** — two bands, two action alignments |
| 3 | `/v2/#/patient-history-ui/{patientId}/social-history` | **T6** ×3 — no rule at all |
| 4 | `/v2/#/facesheet/{patientId}` | **T1** ×6 — the dead divider, plus D3 and D8 |

Then the ⓘ button in the left sidebar of #4 gives you **T3e** without navigating away. **T7** needs a
prescription, **T4** needs an access error, and **T2** cannot be reached.

---

### Additional defect found while tracing

| # | Defect | Location |
|---|---|---|
| **D16** | `PatientCard` is mounted with `insurance="test" address="test"` — hardcoded placeholder strings render in production. The literal word "test" appears beside "Insurance:" and as the address | `clinical-system/.../ClinicalPageNav/ClinicalPageNav.tsx:129-133` |

---

## 12. Card properties — build pass, 2026-08-20

Boolean slot properties added to the Figma Card set `176:59`. The divider is out of scope by
instruction and was not touched, and none of the seven product header treatments (§4) was modified.

### How the geometry check was run

The check is the one Finding 29 requires: not *does MUI hide the element*, but *does MUI change any
padding or margin on anything else when the element is absent*. A Figma boolean can only flip
visibility; if code also moves padding, the boolean produces a state code cannot reach — the
`List/Item` 52px failure.

`web-app-v2` has no `node_modules`, so MUI's source could not be read. Instead the check was run
**live against the running Storybook**, two ways, and both agree:

1. **The theme-resolved stylesheet.** Walked `document.styleSheets`, resolved each Card node's emotion
   class, and dumped every rule targeting it. This is what the browser actually applies, after the
   Tebra theme, not what the docs claim.
2. **DOM composition probes.** Cloned the real MUI-classed nodes out of the story into an off-screen
   Card shell, assembled 12 different slot combinations, and read `getComputedStyle` on each. Because
   the CSS is live, sibling-dependent rules resolve for real.

The rules, read live:

```
.MuiCardContent-root  { padding: 16px }
.MuiCardContent-root:last-child { padding-bottom: 24px }      <-- the one that matters
.MuiCardHeader-root   { display:flex; align-items:center; padding:16px }
.MuiCardHeader-avatar { display:flex; flex:0 0 auto; margin-right:16px }
.MuiCardHeader-action { flex:0 0 auto; align-self:flex-start; margin-top:-4px; margin-right:-8px; margin-bottom:-4px }
.MuiCardHeader-content{ flex:1 1 auto }
.MuiCardActions-root  { display:flex; align-items:center; padding:8px; justify-content:flex-end }
.MuiCardActions-root > :not(style) ~ :not(style) { margin-left:8px }
.MuiCardMedia-root    { display:block; background-size:cover; width:100%; object-fit:cover }
```

### Result

| Boolean | Padding/margin change on absence? | Verdict |
|---|---|---|
| **Show header** | None. `CardHeader` is a flat `padding:16px`. No first/last rules anywhere in the family. Removing it left `CardContent` at `16/16` with actions present and `16/24` without, unchanged either way | **PASS** — built |
| **Show subheader** | None. Title and subheader are `display:block` spans in a `flex:1 1 auto` column. Removing the subheader shrinks the column, which is only "removing a child from auto-layout" | **PASS** — built |
| **Show avatar** | None on padding or margin. The avatar owns its `margin-right:16`, so removing it removes only its own space. Probed all four avatar/action combinations: header padding stayed `16px` and header height stayed identical in all four | **PASS** — built, with a typography caveat below |
| **Show header action** | None. The action owns its negative margins. Same four-way probe | **PASS** — built |
| **Show media** | None. `CardMedia` has zero padding and zero margin and no sibling rules | **PASS** — built |
| **Show actions** | **Yes.** `CardContent` has `&:last-child { padding-bottom: 24px }`. Removing `CardActions` makes `CardContent` the last child and its bottom padding goes **16 → 24** | **FAIL** — built as a variant axis |

Measured, not reasoned:

```
header+content+actions  ->  content 16px/16px
header+content          ->  content 16px/24px
content+actions         ->  content 16px/16px
content                 ->  content 16px/24px
header+media+content    ->  content 16px/24px
```

### What was built

**Five booleans** on the set: `Show header`, `Show avatar`, `Show subheader`, `Show header action`,
`Show media`.

**`Actions` is a variant axis, not a boolean** — `Actions=True|False`. The set is now
**2 × 2 = 4 variants**:

| Variant | Height | Content padding |
|---|---:|---|
| `Variant=Elevation, Actions=False` **(default)** | 88 | `16/16/24/16` |
| `Variant=Outlined, Actions=False` | 88 | `16/16/24/16` |
| `Variant=Elevation, Actions=True` | 132 | `16/16/16/16` |
| `Variant=Outlined, Actions=True` | 132 | `16/16/16/16` |

New anatomy, added identically to all four variants:

```
Card
├── Header            HORIZONTAL, pad 16 (space/16), gap 16 (space/16), align-items CENTER   [Show header]
│   ├── Avatar        instance of Avatar / Content=Fallback (208:3), 40x40                   [Show avatar]
│   ├── Header content  VERTICAL, gap 0, FILL
│   │   ├── Header title      h5   14/20 Bold,    color/text/primary
│   │   └── Header subheader  body1 16/24 Regular, color/text/secondary                      [Show subheader]
│   └── Header action instance of Icon button / Default·Medium·Default (170:5), 40x40        [Show header action]
├── Media             350x140, color/grey/300                                                [Show media]
├── Content           VERTICAL, pad 16/16/{16|24}/16, gap 8
└── Actions           HORIZONTAL, pad 8 (space/8), gap 8, align MAX                          [Actions axis]
```

The avatar and the header action are **instances of the existing Avatar and Icon button sets**, not
hand-rolled — the pass exists to stop hand-rolling, so it should not add any.

All new spacing is bound to `space/16` and `space/8`. Colours bound to `color/text/primary`,
`color/text/secondary`, `color/grey/300`.

### The default state

**`Variant=Elevation, Actions=False`, all five booleans off** — content in a bordered box, nothing
else.

From the §6 counts, grouping the 141 product render sites by which slots they use:

| Configuration | Sites | Share |
|---|---:|---:|
| **no slots at all** (72 bare `Card` + 28 `Card`+`CardContent`) | **100** | **71%** |
| header, no actions | 22 | 16% |
| actions, no header | 8 | 6% |
| header + actions | 7 | 5% |
| media-bearing | 4 | 3% |

The sub-slots default off too, from the 37 product `CardHeader` sites: avatar **3/37**, subheader
**5/37**, header action **12/37**. Not one of them is a majority, so all three default off.

### The no-slots rung, confirmed not assumed

Four instances were spawned, measured, screenshotted, and deleted:

| State | Size | Rows rendered |
|---|---|---|
| **no slots (default)** | **350 × 88** | `Content=88` |
| header only | 350 × 140 | `Header=52 \| Content=88` |
| header + subheader | 350 × 164 | `Header=76 \| Content=88` |
| everything on | 350 × 348 | `Header=76 \| Media=140 \| Content=80 \| Actions=52` |

**The no-slots state does not collapse.** It renders as a 350 × 88 bordered box holding only the
content block, which is `16 + 20 + 8 + 20 + 24 = 88`. Both Elevation and Outlined read correctly.

The header-only height of **52** is worth noting: `16 + 20 + 16`, which is exactly what MUI produces
for a single-line `CardHeader` with no avatar and no action. The build agrees with the substrate
without being told to.

**No fractional dimensions.** The whole set was walked for non-integer widths, heights, paddings and
gaps: zero found. Set is 830 × 340.

### Two deviations, both forced, both documented on the component

1. **The header action cannot be pulled.** MUI gives `.MuiCardHeader-action` `align-self: flex-start`
   with `margin-top: -4px` and `margin-right: -8px`, so the action sits **12px** from the band top and
   **8px** from the card's right edge. Figma sets counter-axis alignment **on the frame, not the
   child** — `MIN`/`CENTER`/`MAX` are deprecated values of `layoutAlign`, and the API rejects
   `counterAxisAlignSelf` on a child outright. The typings are explicit: *"all layers in an auto-layout
   frame must now have the same counter axis alignment."* So the action is centred at 16/16. It is
   **4px low and 8px in** from where MUI puts it. This is a platform limit, not a choice. Header
   height is unaffected.

2. **The avatar changes the header type ramp in code, and the boolean does not model it.** MUI wraps a
   raw-string title as `avatar ? 'body2' : 'h5'` and a raw-string subheader as `avatar ? 'body2' :
   'body1'`. In Tebra's ramp `h5` and `body2` are both 14/20 and differ only in weight (700 vs 400),
   but `body1` is **16/24** — so with an avatar the subheader loses 4px of line height. The build
   authors the **no-avatar** spelling (h5 + body1).

   **This does not fail the Finding 29 test**, and the reason is worth stating: the Figma state is
   reachable in code. The auto-wrap only fires when the title/subheader is a raw string; passing a
   `<Typography>` element bypasses it entirely, and **15 of 37 product `CardHeader` sites do exactly
   that**. More decisively, **no Tebra product site combines an avatar with a raw-string subheader** —
   all three product sites with an avatar (`PatientCard.tsx:42`, `AppointmentCardHeader.tsx:20`, and
   `Popover/PatientCard.example.tsx:34`) pass Typography elements. The only file in the monorepo that
   hits the geometry-changing path is `Card.stories.tsx:32` — the MUI lift.

   Verified live as far as it can be: the story's title and subheader both render
   `MuiTypography-body2` with an avatar present, confirming the `avatar → body2` branch. The
   no-avatar branch is **carried** from MUI 5.15 source, not observed, because no Storybook story
   renders a raw-string `CardHeader` without an avatar.

### Not done, deliberately

- **No divider.** Out of scope by instruction, and it would offer a state code cannot produce: MUI's
  `CardHeader` has no divider and there is no `MuiCardHeader` override in the theme. Theme change
  first, Figma second.
- **No new components.** Card was modified in place; the library gained nothing.
- **The seven product header treatments were not touched.**
- **Not published to the library.** The set is edited in the file but not re-published, and the kit
  was not re-exported.

### Kit status

**Kit count unchanged — nothing was exported.** The kit is **150 files** on disk.

`figma-export/Card.png` is dated 2026-08-10 and depicts the previous 2-variant build. **It is now
stale** — it shows a Card with actions present and a 24px content bottom padding, which this pass
established is wrong. It was deliberately not regenerated: the kit is mid-recertification per
`DRIFT-CHECK-2026-08-19.md`, and silently replacing a certified artefact during recertification is
the failure that document exists to prevent. Flagged for whoever runs the next export pass.

### Typography binding — raised during review

**The question:** are the button labels, header and subheader in Card linked to a typographic token?

**They are all bound. Three of the four are bound to a variable named for a different role**, and it
is not a Card mistake — the variable for the correct role does not exist.

| Node | Renders | Bound to | Semantic role | Match? |
|---|---|---|---|---|
| Actions button label (`Share`, `Learn More`) | 16/24 Regular, `textCase: TITLE` | `font/size/body1`, `font/lineHeight/body1`, `font/family/base`, fill `color/primary/main` | **button** | **No** — borrows `body1` |
| `Header title` | 14/20 Bold | `font/size/body2`, `font/lineHeight/body2` | **h5** | **No** — borrows `body2` |
| `Header subheader` | 16/24 Regular | `font/size/body1`, `font/lineHeight/body1` | **body1** | Yes |
| `Content / Title` (pre-existing) | 14/20 Bold | `font/size/body2`, `font/lineHeight/body2` | **h5** | **No** — borrows `body2` |
| `Content / Body` (pre-existing) | 14/20 Regular | `font/size/body2`, `font/lineHeight/body2` | **body2** | Yes |

**Why.** The file has **10 text styles** — `h1 h2 h3 h4 h5 subtitle2 body1 body2 button caption` —
but the `Tebra/Dimension` collection has size and line-height variables for only **six** of them.
Four roles exist as a text style and have **no variable of their own**:

| Role with no variable | Metrics | Must borrow |
|---|---|---|
| **h4** | 16/24 Bold | `font/size/body1`, `font/lineHeight/body1` |
| **h5** | 14/20 Bold | `font/size/body2`, `font/lineHeight/body2` |
| **subtitle2** | 12/16 Bold | `font/size/caption`, `font/lineHeight/caption` |
| **button** | 16/24 Regular, `textCase: TITLE` | `font/size/body1`, `font/lineHeight/body1` |

The collection was deduplicated **by value**. Each of those four roles is numerically identical to
another role, so it got no variable. But they are not identical — **h4/h5/subtitle2 differ from
their donors only in weight, and button differs only in `textCase`.**

**And weight is not tokenised at all.** `font/weight/regular = 400` and `font/weight/bold = 700`
exist as variables and are bound on **zero** text nodes anywhere in the library. Weight is carried as
a literal in `fontName.style`. So the one property that separates `h5` from `body2` is the one
property no variable controls, which is exactly why they collapsed onto the same token.

**The semantic layer exists and is mostly unused.** Each of the 10 text styles is itself correctly
bound to `font/family/base` + `font/size/*` + `font/lineHeight/*`, and the `button` style even
carries `textCase: TITLE`. Applying a style would give a node both the right name and the right
tokens. But across the five library pages, **50 text nodes use a text style and 607 do not** — 8%.
Card, Button and almost everything else bind variables directly and reference no style. Nothing here
is broken; the file simply has two parallel typography systems and uses the weaker one.

**What was changed.** One thing, additive and non-visual: Card's own text bound `fills`, `fontSize`
and `lineHeight` but **not** `fontFamily`, while Button's label does. All **16** text nodes across the
four variants now bind `fills`, `fontFamily`, `fontSize`, `lineHeight` consistently. `font/family/base`
resolves to `Akkurat LL`, which is what every node already used, so nothing moved and nothing
re-rendered.

**Text styles applied, on instruction (2026-08-20).** The `h5` and `button` styles were applied to the two roles that were lying about themselves. **12 applications, 0 failures.** `h5` -> `Header title` and `Content / Title` in all four variants (8 nodes). `button` -> the four action-row button labels in the two `Actions=True` variants. Both styles are metrically identical to what those nodes already rendered, so nothing moved: variant heights stayed 88 / 88 / 132 / 132 and every node kept 14/20 Bold or 16/24 Regular. Screenshotted before and after.

`Header subheader` and `Content / Body` were deliberately left on raw variables. They are already bound to the variable that matches their role - `body1` and `body2` - so a style would add a name they already have. Only the two mismatched roles were styled.

**Two things this does not fix, and one it introduces.**

1. **The styles still resolve through the borrowed variables.** `h5` is itself bound to `font/size/body2` + `font/lineHeight/body2`, and `button` to `font/size/body1` + `font/lineHeight/body1`. The node now carries the correct *name* at the style layer, but the token underneath is still the wrong one. The gain is real but indirect: when `font/size/button` and `font/size/h5` are eventually created, one style gets rebound instead of every node. Disagreements 15 and 16 stay open.

2. **The Button master is untouched.** `78:124` still carries the raw `body1` binding and no style, so every other Button instance in the library is unchanged.

3. **The button labels are now instance overrides.** Confirmed: the instance label has a text style set and the master does not. This is the only way to style them without editing the shared Button set `79:2`, which is certified and mid-recertification. The cost is that Card's buttons will read as modified against their master, and if Button is later fixed at the master, this override will survive and mask it. Flagged rather than worked around - the clean fix is at the master and is Button's call, not Card's.

**Still not done:** creating `font/size/button` / `font/lineHeight/button` / `font/size/h5` / `font/lineHeight/h5` variables. That is a Tokens page change and the Tokens page is generated - per `flags.tokensPageGenerated` it is regenerated with `tokens-page-generator.js` and never hand-edited.

**Not a Card defect.** The button labels come from the shared Button set `79:2`; its master label
(`78:124`) carries the same `body1` binding. Every Button instance in the library inherits it.

### Disagreements pinned, not resolved

| # | Source A | Source B | Status |
|---|---|---|---|
| 11 | Previous Figma build: `Content` padding `16/16/24/16` **with `Actions` present** | Measured MUI: `CardContent` is `16/16/16/16` unless it is `:last-child` | **Was a defect in the Figma build.** Corrected by this pass, because the Actions axis made the two cases separable. Recorded here because the old value shipped and is in `Card.png` |
| 12 | `Content` frame `itemSpacing: 8` between Title and Body | MUI has no gap — `CardContent` children are laid out by their own margins | **Pre-existing, unresolved.** Carried from discovery §10 disagreement 10. Left alone: binding it to `space/8` would entrench a value code does not produce. It is also the only unbound spacing left in the set, along with `Actions` `itemSpacing: 8` — which *does* have a code counterpart (`> :not(style) ~ :not(style) { margin-left: 8px }`) and could be bound |
| 13 | `DRIFT-CHECK-2026-08-19.md`: kit is **151** files (103 figma-export + 48 code-source, "39 icon SVG, 9 marketing SVG") | Disk and `kit-provenance.json` both say **150** (103 + 47, **38** icon SVG + 9 marketing SVG) | **Off by one on the icon count.** Found incidentally while confirming the kit count was unchanged. Not corrected — the kit is mid-recertification and the ledger rules say the repo wins and the record gets regenerated, not patched |
| 14 | Icon button's default instance-swap icon is `DownCaret` | MUI's card demo uses `MoreVert`; Tebra's story uses `RightCaretIcon` | Open. The header action arrives carrying a down-caret, which reads as a disclosure control rather than an overflow menu. Designers can swap it. Not changed here — it is the Icon button set's own default and changing it is that component's decision, not Card's |
| 15 | 10 text styles exist (`h1`-`h5`, `subtitle2`, `body1`, `body2`, `button`, `caption`) | `Tebra/Dimension` has size/lineHeight variables for only 6 of them — `h4`, `h5`, `subtitle2` and `button` have none | **Open.** Four semantic roles have no token of their own and must borrow a numerically-equal variable named for a different role. Collection appears deduplicated by value. Fixing it is a Tokens page change, and that page is generated |
| 16 | `font/weight/regular` and `font/weight/bold` exist as variables | Zero text nodes in the library bind `fontWeight`; weight is a literal in `fontName.style` | **Open.** This is the direct cause of row 15 — `h5` and `body2` differ only in weight, so with weight untokenised they are indistinguishable at the variable layer |
| 17 | The library has a semantic typography layer (10 text styles, each correctly variable-bound) | Across the five library pages, 50 text nodes used a style and 607 did not (8%) before this pass | **Partly acted on.** Card now uses `h5` and `button` on instruction, making it one of the few components that references styles at all. Whether the rest of the library follows is still an open file-wide convention call |

---

*Sections 1-11: discovery only. Nothing built, nothing fixed, nothing snapped.*

*Section 12: build pass, 2026-08-20. Five booleans and one variant axis added to the Figma Card set. No divider, no new components, no product code changed, nothing exported.*
