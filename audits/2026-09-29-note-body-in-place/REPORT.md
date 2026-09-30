# Note body in place and Button-icon swaps, 2026-09-29

File `fdCQVFdvOByaOYIJYag0d6` (writes, additive only); library and source read only. `figma.skipInvisibleInstanceChildren = false` on every script. Nothing deleted; every replaced control is hidden and renamed `_Superseded · …`. Three parts done; no design question stopped the batch.

Rulings recorded as DECISION lines: Circle default; PlaylistAdd default (closes npveNoteBody_addSectionGlyphPick); accepted-as-is items kept flagged; row glyphs EditOutlined and NoteAddOutlined. The Sept 2 icon-button ring DEFECT is closed for NPVE; the library ask stays open under npveButtonIcon_libraryCandidateTokenGaps.

## Rulings applied to the sets
- **Button-icon `952:14989`:** the six Circle variants now sit in the first three columns, so the top-left variant is `size=medium, State=Default, Shape=Circle` (read back after the move). Rounded remains a value. `after-rulings-button-icon-set-952-14989.png`.
- **Note editor/Toolbar `955:15327`:** `Add Section glyph=PlaylistAdd` moved to the top; it is now the top-left variant (read back). None, Splitscreen, PostAdd stay. `after-rulings-toolbar-set-955-15327.png`.

## 1. Button-icon swaps
Built `Icon/MUI/EditOutlined` `958:15327` and `Icon/MUI/NoteAddOutlined` `958:15330` in section 32 (paths unedited, 5.15.12). Source glyph beside each MUI icon at 8x: `compare-row-glyphs-source-vs-mui-8x.png`. The MUI drawings are heavier than the source's, and NoteAddOutlined is a note page with a plus where the source draws a note page with text lines and a round plus. As ruled.

**Sources checked first** (ringed circles found by scanning the source sheets): Family history `129:7950` draws 40 circles r32 `#8CA7A2` around the two Add Note controls on the condition rows (`648:3265`, `648:3272`), but the Edit family member EditIcon `749:7559` has no ring. The Flowsheets sheets `939:9228`, `867:7460`, `909:12649` and `861:7047` draw bare 20 glyphs with no ring at all (Add Note, EditIcon, add).

**Swapped** (Button-icon `variant=outlined, Shape=Circle`, old control hidden and renamed):
| Site | Old | New | Size, glyph |
|---|---|---|---|
| Problem summary row 153:1186 › Edit problem | `190:12` | `958:15333` | medium 38, EditOutlined |
| Problem summary row › Add to note | `190:18` | `958:15337` | medium, NoteAddOutlined |
| Medication summary row 219:2068 › Add to note | `223:1725` | `958:15341` | medium, NoteAddOutlined |
| Problem row set 107:485, Action=Add, Favorite=Off | `107:419` | `958:15345` | small 30, Add |
| Problem row, Action=Add, Favorite=On | `107:453` | `958:15349` | small, Add |
| Family history condition row 346:3080 › Add condition to note | `346:3083` | `958:15353` | medium, NoteAddOutlined (source ring 40) |
| Vitals/Row 829:12510 › action slot | `829:12509` (was empty; now holds the button at 1,1) | `958:15357` | small, NoteAddOutlined |

GAP card `825:12492` is renamed `_Superseded · GAP marker — Icon button ring (Add note action)` and hidden.

**Not swapped, because the source draws no ring:** Family history Edit family member `346:3094`; Flowsheets measure row action areas `684:8274`, `684:8280`, `684:8285`, `684:8291`, `685:8309`, `685:8315`, `685:8320`, `685:8326`. Left as they are. Also left: Problem row Action=Selected (`107:430`, `107:465`), the green check.

**Heights read back:** no master changed height. Problem summary row 82, Medication summary row 84, Vitals/Row 36, Family history condition row 40, member card 184, Problem row variants 56; the Vitals, Problems, Medication, Family history and picker bodies are unchanged (Problems list body 1650 x 429, Medication list body 518 x 206, picker body 1682 x 449, Vitals/Body 518 x 352). The only size that moved is the Problem summary row's Actions frame, 88 x 40 to 84 x 38. In the Problem row the 30 small button gives the text 10 more width.
Screenshots (instances): `after-part1-problems-list-body-156-2426.png`, `after-part1-problem-summary-row-153-1186.png`, `after-part1-medication-list-body-236-1758.png`, `after-part1-picker-body-94-812.png`, `after-part1-vitals-body-846-13017.png`, `after-part1-vitals-sheet-851-14210.png`, `after-part1-family-history-body-346-3113.png`, `after-part1-section-32-icons-938-25769.png`.

## 2. Note body `958:25107` (Templates 34 · Note body)
Local component, 799 x 510 (the Note card body height 542 less its 16 padding). Editor band: fill `color/grey/300`, 1px `color/grey/400` (weight `border/hairline`), padding and gap `space/8`, corners `radius/md`. **Note card 424:4362 binds `radius/md` (8) for its own corners, so the band and the panel bind the same token; no literal.** Inside: Note editor/Toolbar (`Add Section glyph=PlaylistAdd`, 783 x 54) over the white editor panel (fill `color/background/paper`, 1px `color/grey/400`, `radius/md`), which fills the remaining height (432).
The panel is measured from Rec_Started 3159:20067 (Container 3159:20192: white, 1px #D6D6D6, r8, padding 12, gap 8). **Re-grid: padding 12 to 16**, per the cleanup mapping; gap 8 unchanged. Two Note section block instances fill its width (751): Family History (tag, long body) and Social History (tag, no body text). Social History's Body is a single space, because an empty text node collapses and the block needs its 24 line for the tag; the block is 65 tall.

## 3. Placement
In Note card 424:4362 the body frame `424:4389` now holds `Note body` `958:25193` at index 0, FILL width and height (799 x 510). The old Body content instance `424:4390` (the SCAFFOLDING placeholder) is hidden and renamed `_Superseded · Body content (SCAFFOLDING — Note body placeholder)`. The Note card is still 831 x 748. Page/Encounter follows through its instance (`I429:4542;958:25193`, 799 x 510) and both Encounter shell frames follow.
Screenshots: `after-part3-note-card-424-4362.png` and `compare-note-card-vs-source-1x.png` (Note card at 1x beside Rec_Started cropped to its note card, which is wider: 1397 against 831); `compare-family-history-block-2x.png` (2x: title, tag and the first two lines beside the source); `after-part3-page-encounter-429-4161.png`; both shell frames `after-part3-shell-frame-A-add-problem-943-14943.png` and `after-part3-shell-frame-B-ai-note-results-943-15819.png`.
Differences visible in the crops: the tag is the library's grey outlined chip against the source's purple; the title is 16 Bold against 18; the toolbar glyphs are smaller than the source's; the hairline under the title is a Divider here.

## FLAGS.md
Four DECISION lines (three ruled and struck, one accepted-as-is left open); GAP npveNoteBody_addSectionGlyphPick and DEFECT npveProblemsCorrections_iconButtonNoRingedVariant struck; the Button-icon DECISION annotated with what was placed and not placed; the grouped MUI icons GAP now lists 28 icons.
