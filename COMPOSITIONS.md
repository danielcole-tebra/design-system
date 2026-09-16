# Compositions

Index of canonical compositions. Each has one plate in the Composition System file oNrOL9kQCpJHyK4rBCGqsq. Add a pattern only after it has been built twice.

Rhythm: 16 default separation and inset; 8 for tight pairs (heading and its list, identity pairs); 24 between sections of one body; first field in a body gets 8 top inset; published component internals are never overridden. Sheet: 550 wide, 72 header, 1px divider, 16 inset, 518 content, 71 footer, content height. Docked sheets: square corners. Page gutter 16. Overlays on paper.

## Sheets (NPVE fdCQVFdvOByaOYIJYag0d6)
- Sidesheet shell, 279:2446. Header, divider, body slot, footer. New bodies join through the Body content list; never fork the shell.
- Sheet body, 412:3889. 518-wide component owning its content and states, swapped into the shell.
- Edit form, 634:6808. Pale teal Form surface, white library fields with floating labels, Save footer.
- Record card, 346:3089. Title, metadata line, trailing actions, 16 inset, 8 between related lines.
- Summary row, 153:1186. Status control, text, trailing icon buttons, row-owned divider on a boolean. Open flags on padding.
- Section group, 534:5805. Uppercase heading 8 above a contiguous list of rows.
- Full-width footer action, 732:9985. One action spanning the sheet in place of the button trio.
- Table heading band, 752:13439. Head cells on a teal band bleeding 16 past the content column.
- Picker, 94:812. Search field, filter tabs, pick rows.
- List with status menu, 156:2426. Toolbar, status groups, menu as a body state.
- Questionnaire, 732:8713. Radio questions under an h4 heading, labels in form control label style.

## Pages (Proposals zKT34LQogNjz3Z07fY4VQB)
- Rail page shell, 31:116. Nav/Bar over 256 rail and 1184 content.
- Chart page shell, 168:249. Nav/Bar, patient header, action row, content.
- Patient header band, 31:336. 900x72, fills when placed.
- Patient action row, 46:196. 56 band directly under the header.
- Left rail drawer, 31:213. List/Item rows, 48 pitch, rule inside the rail.
- Content region, 78:307. Heading, action row, filter band, table at 48/48/16/48, gap 32.
- Insight band, 168:578. Three outlined Cards, thumbs bottom right, info bottom left.
- Ledger, 168:582. Head row over Table/Cell rows with chips and actions.
- Standing record row, 168:2377. Small text buttons in a subordinate row.
- Tooltip as detail, 205:773. Reasoning shown in a Tooltip on hover.

## Mobile (ambient capture TP5KrQtY0T5IcMNqi375So)

Provisional, not canonical. This file's rule is two builds and one plate in oNrOL9kQCpJHyK4rBCGqsq; these have one build and no plate. Recorded so the decisions are findable and so a second build has something to match. Everything here is local to the mobile file and never goes to the library (CLAUDE.md). Each line: the decision, the reason, what it overrides, decider and date.

- Account/Avatar, 108:1212. A 40 disc at radius 20, fill bound `color/secondary/main`, two initials bound `color/secondary/contrastText` - the token the filled secondary Button gives its own label - in Akkurat LL Regular 20 / line-height 20 set raw, with the initials carried on a TEXT property. Because the library's grey pairing scores **1.16:1** and vanishes at 40 on the page background where this scores **4.53:1**, and because the face is raw for the reason the library itself sets it raw: no published style is Akkurat LL Regular at or near 20 (every Regular style stops at 16, everything from 20 up is Bold). Overrides library Avatar 208:11 on three counts - grey disc, single letter, no text style. Daniel, 2026-09-16.
- Account/Top bar, Title with action, 114:600 (variant 114:601). The trailing library Icon button is hidden and superseded and an Account/Avatar instance takes the slot; **the disc is the ink**, so it ends on the optical edge at 374 (disc 334-374) and its tap target is 60 x 48 at x 330, running flush to 390. Because a filled disc's ink is its whole edge rather than a glyph floating inside a button, so the 48 square that centres on it leaves 12px of dead screen at the corner; `paddingLeft 4` / `paddingRight 16` with `MIN` alignment holds the disc where the optical rule wants it while the target still reaches the edge. The title is untouched at x 16, 302 wide, truncation off, because the target is `ABSOLUTE` and the variant padding is still 16/0/72/0. Overrides Visit/Top bar 93:2734, which is cloned and never edited. Daniel, 2026-09-16.
- Device pill, 116:2450 and 116:2458 on the A S5 frames, `I103:3038;61:490` and its two siblings on the A4 ready bars. Microphone glyph and drop-down caret only, 82 x 38, **never a label**. Because the library Button puts its label on the `button` typography variant, `textTransform: capitalize` in code, which mangles any lower-case-initial name - measured as "iPhone microphone" rendering **"IPhone Microphone"** - and because naming it grew it 82 to 227 and overflowed the A4 pills row by 61 into a clipped caret. **Device names belong in `List/Item` rows**, which carry no transform and render the same string correctly. Overrides addendum 4.1's "microphone icon, device name, dropdown triangle". Daniel, 2026-09-16.
- Outlined button is `Button variant=contained, color=primary`, library 78:14, imported here as 6:17. There is no `outlined` variant value and there should not be one: `containedPrimary` is `common.white` over a 1px `core.main` border with a `core.contrastText` label, and `grep outlined` across `packages/design-system` returns nothing. Because the hierarchy is inverted and the name is the trap - TEBRA-DESIGN-SYSTEM.md 3.1 Traps records it, and reading the axis values as the list of appearances is what made A0 report it missing. Wherever a spec asks for an outlined button, this is it. Daniel, 2026-09-16.
- Home session list, `List` 103:2364 on the A S2 Home frames. A plain vertical stack, spacing 0, padding 0, full width, holding a `List heading` frame and its `Session row` instances as **flat siblings** at a 72 pitch - no per-group container, so a second group is another heading plus rows appended to the same stack, and retitling is one text override. Rows are `Session row` 4:454, `State = default | failed`; the row has no action slot, so the whole row is the tap target and the status chip is the only state it carries. Because future schedule rows reuse it. Daniel, 2026-09-16 (R1 brief).
