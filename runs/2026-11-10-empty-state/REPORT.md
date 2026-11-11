# Encounter empty state with suggested supporting modules

- Date: 2026-11-10.
- Requested by: Andrew Pennell.
- Figma file: SDE Rebuild, `fdCQVFdvOByaOYIJYag0d6`.
- New page: Empty State, `1806:2254`.
- Screen: `1806:2255`, 1429 × 985.
- Review: https://www.figma.com/design/fdCQVFdvOByaOYIJYag0d6?node-id=1806-2255
- Figma session: `a6d1b099-7fb8-4ff2-aed4-4ffbd66be5c0`.

## Result

Created an empty encounter workspace with the linked encounter note on the left (831 × 748) and a supporting-module suggestion area on the right (550 × 748). Reused the existing navigation, Elena patient header, Add modules/Note controls, note card and editor toolbar. Hid the note's sample section content, retained its blank editor surface, and added draft guidance.

The right side suggests AI Patient Summary, Problems, Medications and Vitals, with a short explanation and a linked library Open button for each. It also offers View all modules and explains that the note remains open when adding a module. These are static mock controls; no module-opening prototype destinations were requested or wired.

The four suggestion rows are instances of the screen-local reusable component `1806:2607`, with exposed title, description and icon-swap properties. It lives below the screen at (200,1400) and is not published. Existing official MUI module-icon instances were reused. New text uses library Akkurat LL text styles, and paints/spacing use imported library variables. Existing library masters and other pages were not edited.

## Verification

- First visual review caught a fixed-height suggestion list clipping the Vitals row. Changed the list to hug all four rows: 336 px total, four rows at 78 px and three 8 px gaps.
- Restored the empty editor's white panel while preserving the linked editor toolbar and hiding sample sections.
- Aligned module navigation to the 16 px workspace gutter.
- Final composition screenshot inspected: all four suggestions and the full note are visible, with no observed clipping or overlap.
- Suggestion content requires 594 px within the 748 px area.
- Read-back found 408 editable descendants and no image-filled nodes or flattened UI screenshots.
- New visible copy uses Akkurat LL. The inherited Nav/Search field retains its existing Inter font; no shared navigation internals were modified.
- No prototype playback or backend behavior is claimed.

## Evidence

- `first-review.png`: initial composition, including the clipped Vitals row.
- `final-review.png`: corrected full composition.
- `verification.json`: final structural checks, row bounds, image-node count and font exception.

Source discovery used current Figma component properties and the repository's LIBRARY.md and COMPOSITIONS.md guidance. The repository was clean and pull reported already up to date before the batch. Named-path commit and push follow this report; their outcome is reported in chat rather than a second timestamp-only commit.
