# Encounter shell complete, 2026-09-29

File `fdCQVFdvOByaOYIJYag0d6` (writes, additive); source and library read only. `figma.skipInvisibleInstanceChildren = false` on every script. Nothing deleted. Parts 0 to 3 done; no design question stopped the batch. The three rulings are DECISION lines in FLAGS.md.

## 0. Carry-over
AI result section 969:16275: the title is bound to `color/text/primary` (black) on all three variants, read back. `p0-ai-result-section-set-969-16275.png`.

## 1. Page layout, set 974:16938
Page/Encounter 429:4161 is now a component set with a Figma-only VARIANT "Layout": Note and Problems (429:4161, default, the current page) and Note only (974:16283). The node id is kept; the three existing instances (two shell frames and the old comparison) still resolve. Note only hides LeftCol and Chips 2 to 8 of the Module strip, leaving Modules and Note; the Note card, its toolbar and the Note body were already FILL, so nothing needed fixing. The toolbar in Note only is 1365 wide.
Started, Note only: the toolbar (916 needed) fits with nothing clipped (`p3-03-started-source-left-1x.png`). Screenshots: `p1-page-encounter-note-only-974-16283.png`, `p1-page-encounter-note-and-problems-429-4161.png`. The superseded AI body placeholder 943:14940 moved to section 35 so the set does not sit on it.

## 2. Replace section dialog, 976:16644
Local component wrapping the library Dialog (maxWidth sm): title "Are you sure you want to replace this section?", body "This action will replace everything in the 'Objective' section.", Cancel a text Button, "Yes, replace section" a contained error Button. Differences from the source: 600x182 against 604x232, 20 regular black title against 24 Bold grey, no hairline above the actions, the Button title-cases the label (GAP npveReplaceDialog_vsSource). The library Dialog has no backdrop, so a local `Dialog backdrop` 976:16684 is bound to alphaBlack50; the source scrim is #454859 at 68% (GAP npveReplaceDialog_noBackdropInLibrary). `p2-replace-dialog-source-left-1x.png`.

## 3. Encounter shell page 943:14942
Eight frames at a 1145 pitch, workflow order, each an instance of Page/Encounter beside a 1:1 Reference (1429x1013, FIT; the two earlier references stay at 1442x1031 and 1441x1031) with a label naming the frame and source node.
| # | Frame | Node | Layout, state | Source |
|---|---|---|---|---|
| 1 | Encounter · Ready | 978:4048 | Note only, Ready (Print shown, SOAP and Otto Octavius labels) | 3124:12369 |
| 2 | Encounter · Ready · Add Problem | 943:14943 | Note and Problems | 4841:18039 |
| 3 | Encounter · Started | 978:4565 | Note only, Started | 3159:20067 |
| 4 | Encounter · Paused | 978:5177 | Note only, Paused | 4296:17197 |
| 5 | Encounter · Processing | 978:5787 | Note only, Processing | 4275:15285 |
| 6 | Encounter · Ready · AI Note Results | 943:15819 | Note only, sheet docked | 3159:21282 |
| 7 | Encounter · Replace section | 978:6363 | Note only, sheet docked, backdrop, dialog | 4439:16310 |
| 8 | Encounter · Closed | 978:7020 | Note only, Closed | 4294:15013 |
3124:12369 is already Note only, so frame 1 is Note only. In 4439 the Assessment section reads "Add Section", so frame 7 sets Action=Add on it. Only frames, labels and references are drawn. Screenshots: `p3-01` to `p3-08` (source left, rebuild right, 1x) and `p3-whole-page-943-14942.png`.

Differences visible in every frame: the nav bar's utilities and avatar, the patient header (library shows sex, MRN, allergies and balance, the source is a plain block), the Note card is the library's (lock and larger close), tag colour, the Button ink, and the page is 985 tall against 1013. Existing flags cover most of these.

## Open
1. Frames 3 to 5 and 8 show the sheet-less Note only page; the sheet in frames 6 and 7 is 550 wide against 483.
2. Library asks unchanged: Dialog backdrop and Replace dialog anatomy, grey H1 ink, light-primary Bold text Button.
