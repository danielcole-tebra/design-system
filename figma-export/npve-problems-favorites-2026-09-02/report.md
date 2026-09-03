# Problems picker — Favorites, 2026-09-02

Batch `npveRebuild_problemsFavorites_2026-09-02`. Target `fdCQVFdvOByaOYIJYag0d6`: component edits on Templates `3:2`, new screen, change log and comparison on Screens `27:2`. Library read only, imports by key in-script. Source read only, `4618:5137` exported at 2x via `download_assets`. Record written by `apply-npve-problems-favorites.js` after backup `design-system-schema.backup-2026-09-02-pre-npve-problems-favorites.json`. Flags now 181 (3 added). Main not built.

## Step 1. How selection is exposed

- Tabs 201:14 (target import 26:199) exposes nothing at the set level: no property definitions, no instance properties on 26:244.
- Each nested Tabs/Tab child carries `selected` (no | yes) and `State` as variant properties plus `Label#201:0`. `isExposedInstance` exists on them (false).
- A nested variant **cannot be lifted** to a parent property: `componentPropertyReferences` takes only characters, visible and mainComponent, and nodes inside a nested instance carry no references from the parent (probe on Tab 1 returned `{}`).
- **A single Active tab property is not expressible.** Fallback built: three booleans on the body, each showing its own Tabs instance. Finding (`npveFavorites_activeTabNotExpressible`): exclusivity is not enforced.
- The nested Text field exposes Value text and Label on the instance but they cannot be lifted either. It was marked `isExposedInstance = true` so both surface on body instances. Finding (`npveFavorites_searchPropsExposedNotLifted`).

## Step 2. Extensions (additive, references verified after each edit)

| Component | Added | References |
|---|---|---|
| Problem row 26:208 | `Star#39:0` INSTANCE_SWAP, default Icon button 170:5, preferred Icon button, wired to Favorite.mainComponent | 6 after (5 before); size 518×56 unchanged |
| Problems picker body 26:221 | `Section title#39:1` TEXT "Recent Problems" → title characters; `Active All#39:2` false → new Tabs instance 39:355 (All selected, hidden); `Active Recent#39:3` true → existing Filter tabs 26:244; `Active Favorites#39:4` false → new Tabs instance 39:369 (Favorites selected, hidden); Search field 26:222 exposed | 48 after (44 before); size 518×384 unchanged, hidden tabs take no layout space |

Both descriptions appended. Nothing renamed, nothing removed.

## Step 3. Regression check on 27:6

Screenshot at 1x after the edits (`step3-screen-27-6-after-edits.png`) diffed with PIL against `npve-problems-recent-build-2026-09-02/step5-screen-27-6.png`: **identical, 0 differing pixels** at 550×600. Instance properties read Section title "Recent Problems", Active Recent true, the other two false. Proceeded.

## Step 4. Favorites screen 40:252

Sidesheet 6:65 instance, Title "Add Problem to Chart", Show back off, footer, secondary and tertiary on, tertiary label "Save & Add to Note" (renders "Save & Add To Note"), Body swapped to Problems picker body. Overrides on the body instance: Section title "Favorites"; Active Recent off, Active Favorites on; nested Text field variant Value=Empty, so the resting label "Search for problem or ICD-10" reads as the placeholder and no typed value shows (the Empty variant's Value node is empty text); all four Favorite icon buttons swapped to **Icon/FavoritesFilled 200:4**, the library's filled favourites icon (key 0c091842…), glyph #545454 bound color/grey/600; all four trailing actions Icon/PlusOutlined. Row 1 needed `resetOverrides` on its trailing action and a rebind of the glyph to color/grey/600, because the body master carries the CheckCircle swap and success/dark fill as overrides on row 1 (finding `npveFavorites_row1OverridesInBodyMaster`).

Star glyph used: **Icon/FavoritesFilled**. No GAP, nothing drawn.

Regions: Header 56, divider 1, Body 488, Footer 55; body content 384. Screenshot `step4-favorites-screen-40-252.png`, looked at: empty search with placeholder, Favorites underlined, "Favorites" heading, four rows with filled grey stars and plus glyphs.

## Step 5. Favorites change log 40:454

"Changes: Problems picker — Favorites", ten rows verbatim (Filter tabs, Search field, Problem rows, Star icon, Add button, Row background, Hidden layers, Body padding, Colours without a token, Density). Detached frame per rule 14.

## Step 6. Density row on 27:222

Appended row 40:518: Density | Tighter throughout → library heights | Library. Rows, tabs and buttons are all taller. The Problems picker log is now 11 rows, 480×824.

## Step 7. Comparison 40:534

"Rebuild comparison — Problems picker Favorites (detached: instances cannot host children)" at (0, 1000), 1708×919, 84px below the first comparison. Reference rectangle 40:537 at 550×600 holds the 2x export (`step7-source-export-4618-5137-2x.png`, 1100×1200, 62,392 bytes, hash e2becad1…) at FIT, uploaded with `upload_assets`. Caption "Source: zVsuhYehoSLLq880qRBFkq 4618:5137, exported 2026-09-02". Columns Reference 550×628 at (32, 32), Rebuild 550×628 at (614, 32), Change log 480×855 at (1196, 32); captions on one line at y 1032; no node outside the frame.

## Step 8. Screenshot and all ten rules

Screenshot `step8-rebuild-comparison-favorites-40-534.png` (1024×551 render of 1708×919), looked at: source left with gold filled stars, teal search field and compact tabs; rebuild right with grey filled stars, placeholder search and library tabs; ten-row change log; captions aligned; nothing clips.

- Rule 1 PASS. Problem row master vs Favorites row 2: 0 paint differences. All Favorites glyphs #545454 color/grey/600; Favorites tab label and indicator #004852 color/primary/main.
- Rule 2. Templates 164 visible solid paints, 0 unbound, 1 image. Screens 202 visible solid paints, 0 unbound, 2 images. Cover unchanged (pre-existing flag).
- Rule 3 PASS. Row 6 references / 4 definitions; body 48 / 4. Favorites body renders its title, tabs and four rows from property values.
- Rules 4, 6, 7 observed. Rule 5 PASS (0 unbound below opacity 1). Rule 8 PASS (0 fractional). Rule 9 PASS (bound alpha only on the Text field outline, untouched). Rule 10 not applicable; references re-verified after every edit.

## Flags

Added `npveFavorites_activeTabNotExpressible` GAP (medium), `npveFavorites_searchPropsExposedNotLifted` GAP (low), `npveFavorites_row1OverridesInBodyMaster` DEFECT (low).

## Files

- `C:\Code\design system\figma-export\npve-problems-favorites-2026-09-02\` (4 PNGs, this report)
- `C:\Code\design system\apply-npve-problems-favorites.js`
- `C:\Code\design system\design-system-schema.backup-2026-09-02-pre-npve-problems-favorites.json`

## Observation

The source Favorites footer has no Cancel button (only Save & Add to Note and Save); Clin_Problems-Recent has one. The rebuild shows Cancel because the prompt asked for the same footer settings as 27:6. Reported in the record as `observation_footer`, not changed.
