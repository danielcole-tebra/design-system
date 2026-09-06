# Encounter shell: toolbar content and two shell corrections — 2026-09-06

Schema record: `npveRebuild_encounterToolbar_2026-09-06`. Backup: `design-system-schema.backup-2026-09-06-pre-npve-encounter-toolbar.json` (taken before any write). Apply script: `apply-npve-encounter-toolbar.js`.
Target `fdCQVFdvOByaOYIJYag0d6` written. Library and source read only; every component, variable and the h5 text style imported by key inside the script that used it. `figma.skipInvisibleInstanceChildren = false` on every walk. Record gate: `npveRebuild_encounterShell_2026-09-06` present — passed.

Read first: CLAUDE.md, the encounter-shell record and report, Workflows audit conventions rows 12–17 (pill dropdowns, mic pill, Start Transcribing pill, transcription status states, Print pill, Sign split button). Source read: 3456:11505 ButtonRow (the newest toolbar) and 4841:17077 (the placed state: Template: SOAP, Assigned To, radio-dot Start Transcribing, mic pill with the label collapsed; no Date, no Print).

Stop condition: any region needing a drawn stand-in beyond the module chips. Nothing was drawn; the Transcription status piece is a library radio glyph and a styled text in an auto-layout frame.

## Step 1 — Corrections on the shell masters

### Note card footer (424:4362)

| Item | Before | After |
|---|---|---|
| Sign control | Split button Size=Medium 141×38, nested label overridden to "Sign" | Button contained/secondary size=medium 464:5852, Label "Sign", End icon on, End icon swap Icon/DownCaret; 91×38; fill and stroke bound color/secondary/main #FF8D6E (rendered on the placed instance) |
| Split button 424:4417 | visible | hidden, renamed "SUPERSEDED 2026-09-06 — Sign (Split button); replaced by the Button beside it; listed for manual removal". Not deleted (rule 1). Its nested segments cannot be un-exposed through the API ("only primary instances expose"); they hide with the parent. |
| Spacer 424:4402 | FIXED 10, so the buttons sat beside Confidential | FILL, buttons at the right edge as in the source |
| Flag `npveEncounter_splitButtonLabelNotAProperty` | open | stays open as a library finding; a note added |

The header Spacer 424:4370 has the same FIXED 10 (the source puts expand/close at the right edge). Left for the note-body batch; flagged.

### Module strip (426:4214)

Source order in 4841:17077 `Modules_HFlex`: Modules · Note · Problems · AI Summary · Vitals · Care Team · Labs/Studies · Allergies · Timeline. The six unselected chips carry no close glyph in the source.

| Chip | Node | Label | Glyph | Width (source) |
|---|---|---|---|---|
| Chip 3 (existing) | 426:4247 | AI Summary | Icon/Lightbulb | 135 (127); Show close true → false to match the source |
| Chip 4 | 465:5473 | Vitals | Icon/Clinical — vitals glyph gap; the library glyph ships white, fill bound color/text/primary on the chip | 93 (85) |
| Chip 5 | 465:5481 | Care Team | Icon/UserGroupFilled — covers | 125 (117) |
| Chip 6 | 465:5492 | Labs/Studies | Icon/Reports — lab glyph gap; ships white, fill bound color/text/primary | 144 (136) |
| Chip 7 | 465:5505 | Allergies | Icon/AttentionOutlined — allergy glyph gap | 113 (105) |
| Chip 8 | 465:5517 | Timeline | Icon/Calendar — timeline glyph gap | 112 (104) |

Exposure: all five new chips exposed and given INSTANCE_SWAP properties Chip 4#465:0 … Chip 8#465:4. Eight of eight chips are exposable; no property limit was reached. Strip stays 1397×40; reference entries 17 → 35.

Chip 2 Problems had rendered a white glyph on the pale teal chip since the shell batch (Icon/Clinical binds its vector to color/common/white); its fill is now bound color/text/primary like chips 4 and 6. Reported as a library DEFECT (candidate 32).

First look fixes: Labs/Studies was placed with Icon/Survey (a chat bubble) and Timeline with Icon/Reports (invisible white glyph); swapped to Icon/Reports and Icon/Calendar. Renders: `master-module-strip-426-4214.png`.

## Step 2 — Toolbar

### Note toolbar (468:5582, local component, Templates section 15 at 80,1800)

799 wide, hug height (42), HORIZONTAL gap bound space/8, centre aligned, no fill. Left group 468:5583 FILL (534), gap space/16. Right group 468:5584 HUG (257), gap space/8, MAX aligned. The source draws two 352 FILL halves; HUG on the right avoids splitting 791 into 395.5 halves (rule 4).

| Pill | Node | Built as | Source |
|---|---|---|---|
| Template | 468:5585 | Button contained/primary medium, Label "Template: SOAP", Start icon Icon/List, End icon Icon/DownCaret; 200×38 | 193×42, list_alt + caret_down |
| Assigned To | 468:5595 | Label "Assigned To", Start icon Icon/UserOutlined, End icon DownCaret; 171×38 | 168×42, person_heart |
| Date | 468:5604 | Label "Date", Start icon Icon/Calendar, End icon DownCaret; 118×38; boolean Show date#468:0 default false | 113×42 (3456 only) |
| Transcription status slot | 468:5612 | auto-layout hug frame holding 469:5832; INSTANCE_SWAP Transcription status#469:1 default 469:5827, exposed | 167×42 |
| Mic device | 468:5613 | Label "", Start icon Icon/Telehealth (GAP: no mic glyph), End icon DownCaret; 82×38 | 78×40, mic + caret, label collapsed |
| Print | 468:5622 | Label "Print", Start icon Icon/PrintOutlined, no caret; 95×38; boolean Show print#468:1 default false | 90×42 (3456 only) |

All five pills exposed, so Label and icons edit through the Button properties; the 3456 filled states (SOAP:Modified, Dr. Steven Strange, Appointment) are Label edits, not variants. Reference entries 19.

Deltas (library wins, in the change log): 38 tall vs 42 (40 on the mic pill); stroke color/primary/main vs the mockup #8CA7A2; label per the Button medium size.

### Transcription status/Start (469:5827, local component at 80,1950)

167×42 (source 167×42), HORIZONTAL gap space/8, padding left/right space/8, centre aligned, no fill. Radio dot = Icon/RadioChecked (MUI) 24 with its vector fill bound color/primary/light #417E86 (source radio_button_checked #417E86). Label "Start Transcribing" in h5 (Akkurat LL Bold 14/20, imported style) bound color/primary/light; TEXT property Label. Named as the audit's invention row 15. Other states (italic "Transcription in Progress" with Pause / Finish, the hidden "Ready to Record" salmon strip, the 3456 pill state with the transcribe glyph) are not built; they join as further Transcription status/<state> components swapped into the slot. Render: `master-transcription-status-469-5827.png`.

### Note card wiring

Toolbar slot 424:4388 renamed "Toolbar"; holds Toolbar content instance 469:9852 (FILL, 799×42, centred in the 58 slot). Note card property Toolbar content#469:2 INSTANCE_SWAP default 468:5582, exposed. The slot's Show toolbar#424:4 reference read identical before and after. Note card reference entries 32 → 47. Render: `master-note-card-424-4362-1x.png`.

### Glyph gaps

One shared marker 473:9782 "GAP marker — Toolbar glyphs" on Screens at (2120, 2230), cloned from 429:6887 with the example swapped to the Transcription status piece; cites candidates 27 (mic), 28 (transcribe), 29 (person-heart), 30 (template-list — Icon/List may be judged close enough). The Module chips marker 429:6878 Difference text gained the five chips, candidate 31 (vitals, lab, allergy, timeline glyphs) and candidate 32 (Icon/Clinical and Icon/Reports ship white glyphs). Renders: `gap-marker-toolbar-glyphs-473-9782.png`, `gap-marker-module-chips-429-6878.png`.

## Step 3 — Comparison, change log, region compares

Comparison 434:7474 unchanged at 2005×2154 (the Screens column is the taller one); the toolbar shows through the Page/Encounter → Note card → Toolbar content chain. Section 429:6859 grown 2600×2500 → 2600×3200 for the fifth marker (bottom 2712). Change log helper 434:4745: the Content card was fixed at 1198 and the rows overflowed after the additions; set to hug, now 480×1772 with 15 rows.

Change log rows (verbatim, What | From → to | Why):

Amended:
- Module chips | Drawn chips → local chips, marked; all nine modules present in the mockup order | The library chip cannot be 40 tall with a close; marked as a gap. Vitals, Labs/Studies, Allergies and Timeline wear stand-in glyphs
- Toolbar | Template, Assigned To and recording pills → library pills for Template and Assigned To, a Start Transcribing status, and a mic pill | Shared button; 38 tall instead of 42 and a teal outline instead of the mockup grey-green; Date and Print pills built but switched off in this state
- Footer | Drawn buttons and a checkbox → library buttons and checkbox; Sign is a single salmon button with a caret | The mockup Sign control is one button with a caret, not a split button; the more button shows a horizontal ellipsis

Added (after Toolbar):
- Toolbar glyphs | Material list, person-heart and mic glyphs → library list, outlined user and telehealth glyphs | The library has no template-list, person-heart or mic glyph; marked as one gap
- Start Transcribing | Drawn radio dot with bold teal text → library radio glyph with bold teal text, kept as a small local piece | Nothing in the library expresses an inline status toggle; marked as an invention
- Mic pill | Mic glyph with a caret, 78 wide → library pill with a stand-in glyph and a caret, 82 wide | Shared button; the glyph is a gap

Region compares (source 1x from the shell batch's 2x export, over the rebuild crop of the placed comparison; rebuild page origin 32,1133):

| Region | Source | Rebuild | Divergence |
|---|---|---|---|
| Module strip | (16,193) 1397×40 | (16,169) 1397×40 | same nine modules and order; chip widths differ with glyph and label; fills primary/100 vs #DFEAEC as recorded |
| Note toolbar | (582,314) 831×58 | (582,290) 831×58 | same composition left to right; pills 38 vs 42, teal vs grey-green outline, glyph stand-ins |
| Note footer | (582,927) 831×70 | 831×74 | Confidential left, buttons right in both; Sign single button with caret in both; mockup label bold, kebab vertical vs horizontal |

Pixel diffs, placed comparison vs master renders composited on white: Note card 0 of 621 588 px; Module strip 0 of 55 880 px. The standalone Note toolbar render carries the Templates section backdrop behind its transparent frame, so it was diffed through the Note card crop that contains it.

## Standing rules

1 PASS (rendered on the placed page: Sign #FF8D6E bound secondary/main; Chip 6 stroke bound divider, no fill; status text and radio #417E86 bound primary/light, text styled h5 14). 2 PASS (Templates 15: 1 524 nodes, 0 unbound; Screens 15: 504 nodes, 0 unbound). 3 PASS (Note card 47, Module strip 35, Module chip 6, Note toolbar 19, Transcription status 1, Page/Encounter 157, comparison master 208, change log helper 45). 4 PASS. 5 PASS. 6 PASS. 7 PASS with a finding: the library page list no longer matches figmaBuild.pages._order (Foundations, Compositions, Layouts vs Tokens); target identity confirmed against the shell record's node ids. 8 PASS (395.5 split removed; hidden Date and Print pills re-laid so no stale fractional x remains). 9 PASS. 10 PASS (the only clone is the marker frame; rows are createInstance; the placed Template pill's rendered characters agree with its property value).

## Findings

- Icon/Clinical and Icon/Reports ship with white glyphs (bound color/common/white); unusable on light surfaces without an override. DEFECT, candidate 32.
- The library lacks mic, transcribe, person-heart, template-list, vitals, lab, allergy and timeline glyphs. GAP, candidates 27–31.
- The inline transcription status toggle has no library pattern; built minimal and marked INVENTION.
- The shell batch's footer spacer was FIXED (buttons sat left); fixed. The header spacer has the same defect; open for the next batch.
- Split button 424:4417 hidden and superseded, not deleted; manual removal pass.
- Schema figmaBuild.pages._order is stale against the library; rule 7 cannot pass as written.
- Concurrent work: the Social History new-entry placement batch wrote to the schema and the working tree during this batch (record `npveRebuild_socialHistoryNewEntryPlacement_2026-09-06`, untracked apply and finalize scripts). This batch's commit carries the schema file with that record in it; the other batch's own scripts and export folder are left for its author to commit.

Counts: GAP markers 5 (one new), DEFECT 0 markers (two DEFECT flags in the register), change-log rows 15, new masters 2 (Note toolbar, Transcription status/Start), chips added 5, chips exposed 8 of 8. Flags +8.

## Screenshots (this folder)

comparison-encounter-shell-434-7474-1x.png, master-note-card-424-4362-1x.png, master-module-strip-426-4214.png, master-note-toolbar-468-5582.png, master-transcription-status-469-5827.png, gap-marker-toolbar-glyphs-473-9782.png, gap-marker-module-chips-429-6878.png, screens-section-15-429-6859.png, templates-section-15-424-4085-at3150.png, region-module-strip-source-over-rebuild.png, region-note-toolbar-source-over-rebuild.png, region-note-footer-source-over-rebuild.png, crop-comparison-note-header-toolbar.png, crop-comparison-change-log-column.png.
