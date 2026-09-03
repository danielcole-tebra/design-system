# Patient header, proposal v1

**Status: BUILT 2026-08-19, revised twice the same day** in the proposals file
`zKT34LQogNjz3Z07fY4VQB`, page `Patient header`. **5 variants, 4 examples**, 0 authored fractional
dimensions, 0 unbound paints, 0 local variables, 0 local styles, 0 detached instances.

Revision 1: the `Balance` variant axis was dropped and balance now renders one way always, closing
PH-7. The patient is `Dana Whitfield` across the set and examples 1, 3 and 4; example 2 stays
`Aaron Foreman`. The avatar letter is recoloured by instance override, see PH-11.

Revision 2: the `Restriction` variant axis was dropped and replaced by a boolean. The set is now
`Allergies` alone, five variants in a single column. Examples rebuilt as four.

This is **prescriptive** work. Nothing in it was derived from the live product. It consumes the
certified kit as a published library and joins nothing to it. The kit stays at 103.

---

## 1. What it is

A proposed patient header band, 900 x **72**, built from `Design System Rebuild` as a library.

| Part | Resolves to |
|---|---|
| Band | 900 x 72. Padding 10 / 16, item spacing 16, bottom rule 1 |
| Identity | 52 tall. Line 1 at 32, line 2 at 20 |
| Safety | 52 tall. Allergy row 32, balance row 20 |
| Avatar | **40 x 40, native**. Not scaled |

72 = 10 + 52 + 10, exactly as specified, with no value adjusted to reach it.

**One axis:** `Allergies` (Severe, MildOnly, NoneKnown, NotDocumented, Error) = **5 variants**, a
single column, gap 24. Everything else is carried by boolean and text properties.

**Balance is not an axis.** It renders one way always: 14/20, weight 400, Secondary text, with the
amount carried by the `Balance amount` text property. Verified across all five variants as a single
treatment.

**Restriction is not an axis.** It is the boolean `Restricted`, default false. False renders nothing
at all and line one is name and pronouns only; true renders `Restricted` at 14/20 weight 700 in
Alert. **There is no unrestricted state and no `Unrestricted` string anywhere in the component** —
verified as zero occurrences across every text node.

**Why, so it is not reintroduced:** restriction flags VIP records and applies to a small fraction of
patients. The absence of the label is not ambiguous, because the restriction is enforced by the
system rather than communicated by the label, so a failure to render cannot cause harm. This is
deliberately **not** the same case as the allergy `Error` state, where absence genuinely is dangerous
and must stay explicit. Do not symmetrise these two.

## 2. Bindings

Every colour is bound to a published library variable. No hex was authored.

| Intent | Library path | Value |
|---|---|---|
| Primary text | `color/grey/900` | `#2B2B2B` |
| Secondary text | `color/text/secondary` | `#545454` |
| Tertiary | `color/text/disabled` | `#9A9A9A` |
| Divider | `color/divider` | `#D6D6D6` |
| Alert | `color/error/dark` | `#B51A2C` |
| Surface | `color/background/paper` | `#FFFFFF` |

Type is bound to three published text styles: **`h3`** 20/32 Bold, **`body2`** 14/20 Regular,
**`h5`** 14/20 Bold. All three match the spec sizes exactly. `Akkurat LL` resolved through the
library with Regular and Bold.

Library instances placed: `Avatar` (Content=Letter), `Icon/AttentionFilled`, `Link`.

## 3. Open findings

Recorded, not resolved.

| # | Finding |
|---|---|
| **PH-1** | **`color/text/primary` is `#000000`**, not the `#2B2B2B` the spec names as primary text. Primary text is bound to `color/grey/900` instead, on instruction. Nothing in this build binds to `color/text/primary`. The library's semantic text token and the proposal disagree about what primary text is |
| **PH-2** | **The allergy icon sits on `color/error/main` `#D83B4D` while the allergy text sits on `color/error/dark` `#B51A2C`.** Two reds in one 32px row. `Icon/AttentionFilled` exposes no colour property and was used as shipped |
| **PH-3** | **`Icon/WarningFilled` is bound to `color/secondary/main` `#FF8D6E`** — the CTA coral. A warning triangle rendered in the primary action colour is a probable derivation error in the kit. Not used here for that reason |
| **PH-4** | **No alert icon in the library exposes a colour property.** Recolouring any of them requires an instance override or a detach |
| **PH-5** | **The 41-icon catalogue has no lock, padlock, refresh, retry, sync or reload icon.** Restriction is therefore text-only in both states and the error retry uses the `Link` component labelled `Retry`. Nothing is built empty |
| **PH-6** | **Tabular figures cannot be applied.** `openTypeFeatures` is read-only in the Plugin API and there is no setter. DOB, phone and MRN are proportional. The row will shift between patients until this is set by hand |
| ~~**PH-7**~~ | ~~`Balance` is specified as both a variant axis and a text property.~~ **Closed 2026-08-19, in two steps.** First the text property was renamed to `Balance amount`, ending the name collision; the rename preserved the property id (`Balance#12:189` → `Balance amount#12:189`) so every reference followed. Then the `Balance` variant axis was dropped entirely, which removed the underlying conflict rather than working around it: a set-level text property has one default, so an axis that implied two different amounts could never be told the truth by the sheet. Balance now renders one way always and the amount is content, not a state. The set went from 20 variants to 10 |
| **PH-8** | **`Allergy total` and `Initials` cannot be parent text properties.** `componentPropertyReferences` accepts only `visible`, `characters` and `mainComponent`, so a nested instance's own text property cannot be driven from the parent. Both are delivered as exposed nested instance properties instead — 32 instances exposed |
| **PH-9** | **`Has photo` was not built. Two independent reasons, either one sufficient.** (a) The library Avatar has no photo path at all: its own description records that the image variant is not built and cannot be, since `createImageAsync` is unavailable to the plugin API. (b) **Even as a two-node toggle it is not expressible.** A Figma boolean binds only positively to `visible`; there is no negated binding, so one boolean cannot show a photo node and hide the initials node at the same time. It would need a variant axis, which this revision deliberately removed. The control that does exist is the Avatar instance's own `Content` property, exposed on every instance: `Letter` for initials, `Fallback` for the Person glyph. Examples 1 and 4 differ through that. Example 4 carries the placeholder and its layer name says so |
| **PH-11** | **The Avatar `Letter` variant ships unreadable.** The letter is `#E8E5DF` (`color/background/default`) on a `#D6D6D6` fill (`color/grey/400`), roughly 1.1:1, and the component exposes no colour control. Fixed here by an instance override on the nested text fill, bound to `color/grey/900`, applied to all 10 masters and every example. **The override is authorised for this one case because it is a functional failure, not an off-palette preference** — the same latitude was refused for the alert icon in PH-2 and PH-4. The underlying defect is in the kit and is not fixed by this build |
| ~~**PH-10**~~ | ~~The library is published but not enabled on the proposals file.~~ **Closed 2026-08-19.** `Design System Rebuild` is enabled on the file. All three collections are now listable from it — `Tebra/Color` 71, `Tebra/Dimension` 32, `Tebra/Typography` 17 — where the same call returned an empty list before. The build was re-verified after the change and is unaffected: 20 variants, 3 examples, 0 unbound paints, 0 detached instances, 0 local variables. Enabling a library remains impossible from the Plugin API and is a manual step |

## 4. Values authored, not taken from the spec or the library

| Value | Where | Why |
|---|---|---|
| Gap **4** | DOB / Age, Severe label / allergens, Balance label / value | Each pair reads as one phrase separated by a word space. 4 is the integer nearest a space at 14px. The spec does not specify it |
| Left padding **8** on the restriction group | Line 1 | The spec asks for a 16 gap between pronouns and restriction while keeping line 1 spacing at 8. 8 + 8 = 16, achieved with a nested group as the spec allows, without touching the parent |
| `•` bullet | Line 2 separators | The library ships no bullet or separator component. This is **the one authored glyph**, as permitted |
| Width **900** fixed on the master | Band | The spec asks for fill container with min width 900. A master cannot fill at the top level; `minWidth` is set to 900 and instances are set to fill when placed in a layout |

## 5. Fractional values, recorded not authored

**0 authored fractional dimensions.** Every frame, row and instance is an integer.

10 fractional vectors exist inside the icon instances: the vector inside `Icon/AttentionFilled` is
20 x 20 in a 24 x 24 component, so at 16 x 16 it lands at **13.3333 x 13.3333**. This is inherited
from the kit by scaling, not introduced here. The icon frame itself is exactly 16 x 16.

Separately, and pre-existing in the kit: the vector inside `Icon/WarningFilled` is authored at
**19.8455 x 17.4520**.
