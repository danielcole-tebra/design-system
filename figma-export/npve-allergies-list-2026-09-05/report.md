# NPVE Rebuild — Allergies list Sidesheet

Date: 2026-09-05  
Status: DONE

## Outcome

Rebuilt the visible Allergies list reference as a live, reusable NPVE Sidesheet composition. The target uses the shared Sidesheet, published Button, Tabs/Tab, Chip, Divider, and DownCaret assets. The source and library files remained read-only.

## Source and target

- Source file: `zVsuhYehoSLLq880qRBFkq`
- Source page: `21:321` (`⚙️ Components`)
- Source node: `129:7726` (`Page=Clin_Allergies`), 550×656
- Frozen source export: `source-allergies-129-7726-2x.png`, 1100×1312
- Target file: `fdCQVFdvOByaOYIJYag0d6`
- Templates page: `3:2`
- Screens page: `27:2`
- Shared Sidesheet: `279:2446`; Floating variant: `6:65`

## Created Figma objects

- Templates section `352:3205` — `11 · Allergies list`
- Severity selector `352:3206` — 70×32
- Allergy card `354:3206` — 518×152
- Allergies list body `355:3217` — 518×271
- Reference helper `356:6190`; frozen image slot `356:6191` — 550×600
- Rebuild helper `356:3248`; live Sidesheet `356:3249` — 550×447
- Change log `356:6192` with rows `356:6193`, `356:6199`, `356:6205`, `356:6211`, `356:6217`, `356:6223`, `356:6229`
- Screens section `356:6235` — `11 · Allergies list comparison`
- Comparison instance `356:6236`

## System-aligned differences

- Source 64px header → shared 72px header with 16px vertical padding.
- Source 12px card inset → canonical 16px card padding.
- Source irregular 9–10px metadata gaps → canonical 8px related-detail rhythm.
- Fixed source empty area → content-driven sheet height so the 71px footer follows active content.
- Source-local 175×42 create control → published medium Button, preserving the label and trailing plus.
- Overlapping edit/delete layers hidden by the rendered Mild control were omitted; the rebuild follows the visible source evidence.

## Verification

- File identity: PASS — exact source, target, Templates, and Screens nodes verified before mutation.
- Geometry: PASS — all authored SECTION, FRAME, COMPONENT, and RECTANGLE positions and dimensions are whole pixels.
- Spacing: PASS — body major gaps 16; card padding 16; metadata row and label/value gaps 8.
- Shell: PASS — Header 72, divider 1, Body 303, Footer 71; live sheet 550×447.
- Instances: PASS — 80 instances in the new Templates section; zero broken main-component references; no detach occurred.
- Defaults: PASS — Sidesheet body default remains `26:221`; comparison defaults remain `114:777`, `114:779`, and `114:880`.
- Paints: PASS — zero unbound authored product-content solid paints. The `#E4E4E4` Section chrome and frozen image are documented exceptions.
- Typography: PASS — all authored text uses Akkurat LL with token-bound family, size, line height, and color.
- Placeholders: PASS — none left active.
- Visual: PASS — severity selector, card, body, live Sidesheet, frozen source, and final comparison were rendered and inspected.

## Recovery notes

- The first source inspection script was rejected because an awaited call was inside a non-async helper. Atomic rejection; no mutation.
- The first card skeleton script attempted an unsupported nested text-property promotion. Atomic rejection; the nested severity instance remains live and editable through its own label property.
- A corrected card call contained a mistyped primary-text token ID. The dependency guard stopped it atomically before mutation.
- The first live Sidesheet lookup matched the body Button instead of the footer Button. The screenshot gate caught it; the body label was restored and the footer was resolved by `Footer → Actions` hierarchy.
- The final paint audit found six default white fills on structural auto-layout wrappers. They were cleared to transparent and the audit was rerun successfully.

## Evidence

- `component-severity-352-3206.png`
- `component-allergy-card-354-3206.png`
- `component-allergies-body-355-3217.png`
- `rebuild-allergies-356-3248.png`
- `comparison-allergies-356-6236-final.png`

No commit was created.

