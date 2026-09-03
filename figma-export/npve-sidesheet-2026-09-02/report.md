# NPVE rebuild — Sidesheetv3 (129:6647) read-only inventory

Batch `npveRebuild_sidesheet_inventory_2026_09_02`, 2026-09-02. Source zVsuhYehoSLLq880qRBFkq (NDE-2026), page ⚙️ Components (21:321). Library YX2n4YLrEpBXNbcc73T6dw read only. Target fdCQVFdvOByaOYIJYag0d6 not opened. No writes of any kind.

## Outcome

- READ-ONLY INVENTORY COMPLETE. Stopped after step 7. Nothing built; no writes to source or library; target not opened.
- Schema record: `npveRebuild_sidesheet_inventory_2026_09_02` written by apply-npve-sidesheet.js, backup design-system-schema.backup-2026-09-02-pre-npve-sidesheet.json. Flags added: 8 (npveSidesheet_*).
- Set property definitions unreadable: componentPropertyDefinitions and variantGroupProperties both throw "Component set has existing errors". Three children are named without the Page= property (Clin_Problems-Drop 4494:3240, Clin_Problems-Edit 4536:27605, Clin_Vitals2 2116:8944), which is the visible cause.
- Children: 54 (34 visible, 20 hidden). Instances: 4722 — DSR 15, Kit 2892, Other 1790, Local 25.
- Mapping: 29 rows, 11 GAP, 7 DEFECT.

## Method

- **walk.** page.loadAsync() then findAllWithCriteria; skipInvisibleInstanceChildren=false; no setCurrentPageAsync. Structure read to depth 3 below each variant without descending into instances; every INSTANCE at any depth resolved to its main component.
- **provenance.** Same 8-hex key-prefix match as npveRebuild_enum_2026-09-02 against the on-canvas inventories of Design System Rebuild and Tebra Working UI Kit.
- **paints.** Read from the rendered nodes under 129:6647 (hex + alpha + bound flag). Library Dialog paints read from instance 787:1457 on Compositions; library Drawer paints are master-level because no Drawer instance exists on any library page and this batch may not create one.
- **screenshots.** 129:6647 whole at 4096px; every VISIBLE child at 1x (34 images). The 20 hidden children render as 1x1 blank PNGs through get_screenshot; Figma does not rasterise an invisible node and making one visible would be a write. Saved under figma-export/npve-sidesheet-2026-09-02/.

## 1. Screenshots

Whole set: `set-129-6647-whole.png` (4096px long edge). Library references: `lib-749-239-Drawer-set.png`, `lib-787-1457-Dialog-instance.png`. Each visible child at 1x is named `<id>-<variant>.png`. Hidden children render as 1x1 blanks through get_screenshot and were not saved.

| Id | File |
|---|---|
| 129:6648 | hidden, not rasterisable |
| 129:6995 | hidden, not rasterisable |
| 129:7340 | `129-7340-PatientSummary.png` |
| 4079:15495 | hidden, not rasterisable |
| 2459:10180 | `2459-10180-Page41.png` |
| 2466:10562 | `2466-10562-Page42.png` |
| 939:9228 | `939-9228-Clin_Flowsheets.png` |
| 861:7047 | `861-7047-Clin_Flowsheets-Graph.png` |
| 867:7460 | `867-7460-Clin_Flowsheets-AddNew.png` |
| 909:12649 | `909-12649-Clin_Flowsheets-Edit.png` |
| 129:7364 | hidden, not rasterisable |
| 129:7431 | hidden, not rasterisable |
| 129:7467 | hidden, not rasterisable |
| 129:7494 | hidden, not rasterisable |
| 129:7546 | hidden, not rasterisable |
| 129:7580 | hidden, not rasterisable |
| 129:7614 | `129-7614-PsychotherapyNote.png` |
| 129:7726 | `129-7726-Clin_Allergies.png` |
| 129:7826 | `129-7826-Clin_Allergies-Edit.png` |
| 129:7950 | `129-7950-Clin_FHx.png` |
| 129:12486 | `129-12486-Clin_FHX-Editing.png` |
| 129:8130 | `129-8130-Clin_HealthStatus.png` |
| 129:8316 | `129-8316-Clin_ExternalCare-Hospitalizations.png` |
| 129:8401 | `129-8401-Clin_ExternalCare-HEdit.png` |
| 129:8517 | `129-8517-Clin_ExternalCare-FSEdit.png` |
| 648:1603 | `648-1603-Clin_ExternalCareFS.png` |
| 129:8651 | `129-8651-ClinProSH_Edit.png` |
| 648:3473 | `648-3473-Clin_ProSH.png` |
| 129:8774 | hidden, not rasterisable |
| 129:8843 | hidden, not rasterisable |
| 129:8928 | hidden, not rasterisable |
| 129:9040 | hidden, not rasterisable |
| 129:9205 | hidden, not rasterisable |
| 129:9392 | hidden, not rasterisable |
| 129:9614 | hidden, not rasterisable |
| 545:5239 | `545-5239-Clin_Problems-Main.png` |
| 4704:17095 | `4704-17095-Page54.png` |
| 4494:3240 | `4494-3240-Clin_Problems-Drop.png` |
| 4536:27605 | `4536-27605-Clin_Problems-Edit.png` |
| 129:10016 | `129-10016-Clin_Problems2-Edit.png` |
| 4618:4930 | `4618-4930-Clin_Problems-Recent.png` |
| 4618:5137 | `4618-5137-Clin_Problems-Favorites.png` |
| 545:5557 | `545-5557-Clin_MedList.png` |
| 129:10181 | `129-10181-Clin_SHx.png` |
| 129:10364 | hidden, not rasterisable |
| 129:10481 | `129-10481-Clin_Vitals-Default.png` |
| 3569:22346 | `3569-22346-Clin_Vitals-Default-Alert.png` |
| 3557:15328 | `3557-15328-Clin_Vitals-QuickEntried.png` |
| 3496:15197 | `3496-15197-Clin_Vitals-Expanded-Chart.png` |
| 3501:15528 | `3501-15528-Clin_Vitals-Expanded-Table.png` |
| 3496:14449 | `3496-14449-Clin_Vitals-Editor.png` |
| 3496:13859 | hidden, not rasterisable |
| 2116:8944 | hidden, not rasterisable |
| 129:11224 | hidden, not rasterisable |

## 2. Direct children

Fam: IX Index, PS Patient Summary, FS Flowsheets, HL hidden list pages, CL clinical pages, PR Problems and Med List, VT Vitals (441 wide).

| # | Name | Id | x, y | w×h | Vis | Fam | Inst | DSR | Kit | Other | Local | Overlaps |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Page=Index | 129:6648 | 16, 0 | 550×1360 | hidden | IX | 89 | 0 | 13 | 76 | 0 | yes |
| 2 | Page=IndexV1 | 129:6995 | 16, 0 | 550×800 | hidden | IX | 89 | 0 | 13 | 76 | 0 | yes |
| 3 | Page=PatientSummary | 129:7340 | 16, 16 | 550×894 | yes | PS | 35 | 0 | 28 | 7 | 0 | yes |
| 4 | Page=Page49 | 4079:15495 | 582, 16 | 550×942 | hidden | PS | 29 | 0 | 24 | 5 | 0 | yes |
| 5 | Page=Page41 | 2459:10180 | 582, 16 | 550×1188 | yes | PS | 22 | 0 | 15 | 7 | 0 | yes |
| 6 | Page=Page42 | 2466:10562 | 1148, 16 | 550×932 | yes | PS | 7 | 0 | 4 | 3 | 0 | yes |
| 7 | Page=Clin_Flowsheets | 939:9228 | 1714, 16 | 550×360 | yes | FS | 39 | 0 | 21 | 17 | 1 |  |
| 8 | Page=Clin_Flowsheets-Graph | 861:7047 | 2280, 16 | 550×630 | yes | FS | 39 | 0 | 21 | 17 | 1 |  |
| 9 | Page=Clin_Flowsheets-AddNew | 867:7460 | 2846, 16 | 550×2404 | yes | FS | 43 | 0 | 24 | 18 | 1 |  |
| 10 | Page=Clin_Flowsheets-Edit | 909:12649 | 3412, 16 | 550×2388 | yes | FS | 43 | 0 | 24 | 18 | 1 |  |
| 11 | Page=CareCoordination | 129:7364 | 1148, 0 | 550×1104 | hidden | HL | 950 | 0 | 602 | 348 | 0 | yes |
| 12 | Page=Alerts | 129:7431 | 1148, 0 | 550×656 | hidden | HL | 16 | 0 | 4 | 12 | 0 | yes |
| 13 | Page=Notes | 129:7467 | 1148, 0 | 550×656 | hidden | HL | 28 | 0 | 13 | 15 | 0 | yes |
| 14 | Page=TreatmentPlan | 129:7494 | 1148, 0 | 550×656 | hidden | HL | 31 | 0 | 15 | 16 | 0 | yes |
| 15 | Page=Labs/Studies | 129:7546 | 1148, 0 | 550×656 | hidden | HL | 5 | 0 | 0 | 5 | 0 | yes |
| 16 | Page=Documents | 129:7580 | 1148, 0 | 550×656 | hidden | HL | 5 | 0 | 0 | 5 | 0 | yes |
| 17 | Page=PsychotherapyNote | 129:7614 | 3978, 16 | 550×458 | yes | CL | 32 | 0 | 13 | 19 | 0 | yes |
| 18 | Page=Clin_Allergies | 129:7726 | 4544, 16 | 550×656 | yes | CL | 64 | 0 | 43 | 21 | 0 |  |
| 19 | Page=Clin_Allergies-Edit | 129:7826 | 5110, 16 | 550×673 | yes | CL | 113 | 0 | 73 | 40 | 0 |  |
| 20 | Page=Clin_FHx | 129:7950 | 5676, 16 | 550×656 | yes | CL | 28 | 0 | 14 | 13 | 1 |  |
| 21 | Page=Clin_FHX-Editing | 129:12486 | 6242, 16 | 550×685 | yes | CL | 107 | 0 | 67 | 40 | 0 | yes |
| 22 | Page=Clin_HealthStatus | 129:8130 | 6808, 16 | 550×600 | yes | CL | 139 | 0 | 91 | 48 | 0 | yes |
| 23 | Page=Clin_ExternalCare-Hospitalizations | 129:8316 | 7374, 16 | 550×600 | yes | CL | 64 | 0 | 40 | 24 | 0 |  |
| 24 | Page=Clin_ExternalCare-HEdit | 129:8401 | 7940, 16 | 550×606 | yes | CL | 116 | 0 | 85 | 31 | 0 |  |
| 25 | Page=Clin_ExternalCare-FSEdit | 129:8517 | 8506, 16 | 550×592 | yes | CL | 63 | 0 | 38 | 25 | 0 |  |
| 26 | Page=Clin_ExternalCareFS | 648:1603 | 9072, 16 | 550×592 | yes | CL | 147 | 0 | 100 | 47 | 0 |  |
| 27 | Page=ClinProSH_Edit | 129:8651 | 9638, 16 | 550×498 | yes | CL | 103 | 0 | 73 | 30 | 0 |  |
| 28 | Page=Clin_ProSH | 648:3473 | 10204, 16 | 550×302 | yes | CL | 58 | 0 | 34 | 24 | 0 |  |
| 29 | Page=Clin_Immunizations | 129:8774 | 6808, 0 | 550×600 | hidden | CL | 70 | 0 | 42 | 28 | 0 | yes |
| 30 | Page=Clin_Immunizations-Edit | 129:8843 | 6808, 0 | 550×720 | hidden | CL | 132 | 0 | 85 | 47 | 0 | yes |
| 31 | Page=ImplantableDevices | 129:8928 | 6808, 0 | 550×600 | hidden | CL | 111 | 0 | 79 | 32 | 0 | yes |
| 32 | Page=Clin-ImplantableDevices-Edit | 129:9040 | 6808, 0 | 550×600 | hidden | CL | 140 | 0 | 106 | 34 | 0 | yes |
| 33 | Page=Clin_PMHx | 129:9205 | 6808, 0 | 550×600 | hidden | CL | 140 | 0 | 98 | 42 | 0 | yes |
| 34 | Page=Clin_PMHx-Comment | 129:9392 | 6808, 0 | 550×600 | hidden | CL | 160 | 0 | 112 | 48 | 0 | yes |
| 35 | Page=Clin_PSHx | 129:9614 | 3978, 0 | 550×600 | hidden | CL | 85 | 0 | 52 | 33 | 0 | yes |
| 36 | Page=Clin_Problems-Main | 545:5239 | 10770, 16 | 550×517 | yes | PR | 48 | 6 | 24 | 15 | 3 |  |
| 37 | Page=Page54 | 4704:17095 | 10770, 900 | 550×517 | yes | PR | 45 | 3 | 24 | 15 | 3 |  |
| 38 | Clin_Problems-Drop | 4494:3240 | 11336, 16 | 550×510 | yes | PR | 46 | 3 | 25 | 15 | 3 |  |
| 39 | Clin_Problems-Edit | 4536:27605 | 11902, 16 | 550×458 | yes | PR | 37 | 0 | 29 | 8 | 0 | yes |
| 40 | Page=Clin_Problems2-Edit | 129:10016 | 12468, 16 | 550×600 | yes | CL | 80 | 0 | 41 | 35 | 4 |  |
| 41 | Page=Clin_Problems-Recent | 4618:4930 | 13034, 16 | 550×600 | yes | CL | 83 | 3 | 41 | 36 | 3 |  |
| 42 | Page=Clin_Problems-Favorites | 4618:5137 | 13600, 16 | 550×600 | yes | CL | 80 | 0 | 41 | 35 | 4 |  |
| 43 | Page=Clin_MedList | 545:5557 | 14166, 16 | 550×380 | yes | PR | 16 | 0 | 10 | 6 | 0 | yes |
| 44 | Page=Clin_SHx | 129:10181 | 14732, 16 | 550×778 | yes | CL | 244 | 0 | 149 | 95 | 0 | yes |
| 45 | Page=Clin_THx | 129:10364 | 6242, 0 | 550×600 | hidden | CL | 150 | 0 | 79 | 71 | 0 | yes |
| 46 | Page=Clin_Vitals-Default | 129:10481 | 15298, 16 | 441×600 | yes | VT | 72 | 0 | 50 | 22 | 0 |  |
| 47 | Page=Clin_Vitals-Default-Alert | 3569:22346 | 15755, 16 | 441×600 | yes | VT | 72 | 0 | 50 | 22 | 0 |  |
| 48 | Page=Clin_Vitals-QuickEntried | 3557:15328 | 16212, 16 | 441×600 | yes | VT | 73 | 0 | 51 | 22 | 0 |  |
| 49 | Page=Clin_Vitals-Expanded-Chart | 3496:15197 | 16669, 16 | 441×600 | yes | VT | 59 | 0 | 41 | 18 | 0 |  |
| 50 | Page=Clin_Vitals-Expanded-Table | 3501:15528 | 17126, 16 | 441×600 | yes | VT | 59 | 0 | 41 | 18 | 0 |  |
| 51 | Page=Clin_Vitals-Editor | 3496:14449 | 17583, 16 | 441×600 | yes | VT | 59 | 0 | 39 | 20 | 0 |  |
| 52 | Page=Page43 | 3496:13859 | 14405, 16 | 550×600 | hidden | CL | 45 | 0 | 28 | 17 | 0 | yes |
| 53 | Clin_Vitals2 | 2116:8944 | 14405, 16 | 550×600 | hidden | CL | 55 | 0 | 29 | 26 | 0 | yes |
| 54 | Page=CareChecklist | 129:11224 | 11902, 0 | 550×600 | hidden | CL | 57 | 0 | 34 | 23 | 0 | yes |

Overlap groups (every one involves a hidden child; no two visible children overlap):

- at 16,0-16: 129:6648 (hidden), 129:6995 (hidden), 129:7340
- at 582,16: 4079:15495 (hidden), 2459:10180
- at 1148,0-16: 129:7364 (hidden), 129:7431 (hidden), 129:7467 (hidden), 129:7494 (hidden), 129:7546 (hidden), 129:7580 (hidden), 2466:10562
- at 3978,0-16: 129:9614 (hidden), 129:7614
- at 6242,0-16: 129:10364 (hidden), 129:12486
- at 6808,0-16: 129:8774 (hidden), 129:8843 (hidden), 129:8928 (hidden), 129:9040 (hidden), 129:9205 (hidden), 129:9392 (hidden), 129:8130
- at 11902,0-16: 129:11224 (hidden), 4536:27605
- at 14405,16: 3496:13859 (hidden), 2116:8944 (hidden), 545:5557, 129:10181

## 3. Structural inventory

Root of every child: VERTICAL, p0, g0, fill #FFFFFF@1.00, stroke #D6D6D6@1.00 w1 all sides. Header tuple: layer, height, padding, gap, bottom rule, back control, close control. Body: layer, layout, sizing, height. Footer: layer, height, layout, visible button widths.

| Id | Header | Body | Footer | Hidden scaffold | Extras |
|---|---|---|---|---|---|
| 129:6648 Page=Index | Breadcrumbs 64 p16/16/16/16 g16 rule:no back:hidden Breadcrumb Buttons in Frame 758531787 close:icon 24 in Frame 758531486 | Main Wrap · V p0/8/8/8 g16 · AF · 1296 | none | Frame 758531776 (breadcrumb row 239x32); Frame 758531780 (Tab Set + Selector 550x52); Frame 758531486 (24x24); Tabs (segmented 550x52) | Top3 tile row 518x104 with GRADIENT_LINEAR fills and #FBCBD1/#D4E0DD strokes; Sections Clinical 712 / History 432 |
| 129:6995 Page=IndexV1 | Breadcrumbs 64 p16/16/16/16 g16 rule:no back:hidden close:icon 24 in wrapper | Main Wrap · V p0/8/8/8 g16 · AF · 736 | none | Frame 758531776; Frame 758531780; Frame 758531486; Tabs | Top3 tiles (Alerts and Care Coordination hidden); Sections 264/320 |
| 129:7340 Page=PatientSummary | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:yes back:none close:icon 24 in wrapper | Main Wrap · V p8/8/8/8 g16 · AF · 830 | none | (inside body) Tab Set 534x56; Contextual Alert x2 534x40; Frame 758532108 170 | Summary_Wrap 534x708 four rich-text blocks 16/150%; feedback row Frame 758531795 534x90 V p8 g8 top rule, thumbs up/down |
| 4079:15495 Page=Page49 | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:yes back:none close:icon 24 in wrapper | Main Wrap · V p8/8/8/8 g16 · AF · 878 | none | Frame 758532108 | Tab Set visible; Contextual Alert visible; two Summary_Wrap cards 534x306 fill #F9F9F9 stroke #D6D6D6 p16 g12 with three hand-drawn Badges 22 tall #D0ECF1/#83CDD9; feedback row 90 |
| 2459:10180 Page=Page41 | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:yes back:none close:icon 24 in wrapper | Main Wrap · V p8/8/8/8 g16 · AF · 1124 | none | none | Contextual Alert 534x40 visible; Summary_Wrap 708; feedback block Frame 758531795 534x328 V p8 g16 top rule: Contextual Alert, thumbs row, Text Field 120, Button 161 |
| 2466:10562 Page=Page42 | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:yes back:none close:icon 24 in wrapper | Main Wrap · V p8/8/8/8 g16 · AF · 868 | none | none | Contextual Alert visible; Summary_Wrap 708; thank-you band Frame 758532110 534x72 H p16/8/8/8 g16 top rule with #EEF7F9 inner 518x48 |
| 939:9228 Page=Clin_Flowsheets | HEADER 64 p16/16/16/16 g16 rule:no back:none close:icon 24 in wrapper | BODY · V p0/1/0/1 g0 · AF · 236 | FOOTER · 60 · H p8/8/8/8 g21 FF · buttons [123] | (footer) Frame 758531555 354x36 with _button template; Text Button x2; (body) 1STMEASURE 270; Chips 99x52 | SUBHEADER 548x74 H p16/12/16/12 g16 fill #F5F5F5 bottom rule: Field 310x40 (#FFFFFF, stroke #004852) + _button template 198 outlined; column header row Frame 758532067 548x34 H p8/16 g24 fill #D4E0DD, Akkurat LL Bold 14/18 #000000; Main Wrap row 548x64 p16 g34; 2NDMEASURE 548x64 p16 g24 top rule |
| 861:7047 Page=Clin_Flowsheets-Graph | HEADER 64 p16/16/16/16 g16 rule:no back:none close:icon 24 in wrapper | BODY · V p0/1/0/1 g0 · AF · 506 | FOOTER · 60 · H p8/8/8/8 g21 FF · buttons [123] | Frame 758531555; Text Button x2; Chips | as 939:9228 with 1STMEASURE 548x270 visible (#EEF7F9 band, BarLineChart 548x220) |
| 867:7460 Page=Clin_Flowsheets-AddNew | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:no back:none close:icon 24 in wrapper | Frame 758532096 · V p0/1/0/1 g0 · AF · 2280 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [87] | Frame 758531555; Text Button x2; Chips | 2NDROW 548x74 #F5F5F5; column row 34 #D4E0DD; Summary_Wrap 64; questionnaire Frame 758532074 548x2044 p16 g16 (date row, prompt 16/20, Frame 758532084 516x1900 g24); Main Wrap 64 top rule |
| 909:12649 Page=Clin_Flowsheets-Edit | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:no back:none close:icon 24 in wrapper | Frame 758532096 · V p0/1/0/1 g0 · AF · 2264 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [87] | Frame 758531555; Text Button x2; Chips | 2NDROW 548x58 H p8/12/8/12 (16px shorter than AddNew); otherwise as 867:7460 |
| 129:7364 Page=CareCoordination | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:no back:hidden Frame 143725286 breadcrumb trail close:icon 24 in wrapper | Main Wrap · V p8/16/8/16 g16 · AF · 1040 | Frame 758531478 (inside body, 518 wide) · 60 · H p8/8/8/8 g21 FF · buttons [132,105,69] | Frame 143725286 | tab bar Frame 758531835 518x52 fill #004852 with pill 255x44 #F6F2EC; Toggle Button hand-drawn 518x48 (#F0EEE8 / #FFFFFF, stroke #8CA7A2); two Text Field - Tablet + Mobile 251x56; Autocomplete 518x60; Text Field 518x192; Data Grid 502x396 (kit) with 60 table rows |
| 129:7431 Page=Alerts | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:no back:hidden Frame 143725286 close:icon 24 in wrapper | Main Wrap · V p8/8/8/8 g16 · AF · 274 | none | Frame 143725286 | Add row 534x40 #FFFFFF stroke #8CA7A2 "Add Alert" #417E86 16/20; Alert1 card 534x102 fill #FEF5D5 stroke #D6D6D6 p12 g8; Alert1 card 534x84 #FFFFFF; root fixed 656 |
| 129:7467 Page=Notes | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:no back:hidden Frame 143725286 close:icon 24 in wrapper | Main Wrap · V p8/8/8/8 g16 · AF · 200 | none | Frame 143725286 | Autocomplete Select Field 534x40; two Alert1 rows 534x56 H p12 g16 stroke #D6D6D6: date 16/20 + Chip - Status + open_in_new icon frame; root fixed 656 |
| 129:7494 Page=TreatmentPlan | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:no back:hidden Frame 143725286 close:icon 24 in wrapper | Main Wrap · V p8/8/8/8 g16 · AF · 272 | none | Frame 143725286; Assistive Text | Autocomplete 534x40 (detached template frames); three Alert1 rows 56; root fixed 656 |
| 129:7546 Page=Labs/Studies | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:no back:hidden Frame 143725286 close:icon 24 in wrapper | Main Wrap · V p8/8/8/8 g16 · AF · 270 | none | Frame 143725286 | three Alert1 rows 534x74 with hand-drawn Badge 67x22 #F7F7F7/#DEDEDE; title text reads "Documents" although the variant is Labs/Studies |
| 129:7580 Page=Documents | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:no back:hidden Frame 143725286 close:icon 24 in wrapper | Main Wrap · V p8/8/8/8 g16 · AF · 270 | none | Frame 143725286 | three Alert1 rows 74; title text reads "Labs/Studies" although the variant is Documents |
| 129:7614 Page=PsychotherapyNote | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:yes back:hidden close:icon 24 in wrapper | Main Wrap · V p8/8/8/8 g16 · AF · 344 | none | Frame 758531776; Frame 758531780; Frame 758531486; Tabs; (toolbar) Headings, table, Flowsheets, Frame 758531777 attach/vitals/labs/images | toolbar Frame 758531778 550x50 H p9/8/9/8 g8 bottom rule: UndoRedo 2x32, TextEdit 232 (bold/italic/strike/underline/lists) hand-drawn 32x32 buttons; Summary_Wrap 534x328 V p0/8/60/8 g4 rich text 16/150% |
| 129:7726 Page=Clin_Allergies | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:yes back:hidden close:icon 24 in wrapper | Main Wrap · V p0/16/8/16 g8 · FF · 592 | Frame 758531478 (inside body, 518 wide) · 60 · H p8/8/8/8 g21 FF · buttons [180] | Frame 758531776; Frame 758531780; Frame 758531486; Tabs; (body) Toggle Button; Add Family Member row; (footer) Frame 758531555; Text Button x2 | Summary_Wrap V p8/0/8/0 g16 FF 516; FilterSet 518x28 V g6 bottom rule; _button template 175 outlined; Father card 518x138 H p12 g8 stroke #D6D6D6; root fixed 656 |
| 129:7826 Page=Clin_Allergies-Edit | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:yes back:VISIBLE Breadcrumb Buttons 32x32 fill #E9EFEE close:icon 24 in wrapper | Main Wrap · V p0/16/8/16 g8 · AF · 609 | Frame 758531478 (inside body, 518 wide) · 60 · H p8/8/8/8 g21 FF · buttons [72,171,66] | Frame 758531776; Frame 758531780; Frame 758531486; Tabs; (body) Toggle Button; Add Family Member; Frame 758531844 action row | form card Frame 758531490 518x517 V p12 g16 fill #EEF7F9 stroke #D6D6D6 (autocomplete, chip dropdown, radio pair, reaction chips, comments) |
| 129:7950 Page=Clin_FHx | NoteHeader 65 p16/16/16/16 g8 rule:yes back:none close:icon 24 direct child | Main Wrap · V p8/16/8/16 g8 · FF · 591 | Frame 758531478 (inside body, 518 wide) · 60 · H p8/8/8/8 g21 FF · buttons [202] | (body) Toggle Button; (footer) Frame 758531555; Text Button x2 | title fills 486; _button template 230 outlined; Father card 518x184 |
| 129:12486 Page=Clin_FHX-Editing | NoteHeader 65 p16/16/16/16 g8 rule:yes back:VISIBLE Breadcrumb Buttons 32x32 #E9EFEE close:icon 24 direct child | Main Wrap · V p8/16/8/16 g8 · AF · 620 | Frame 758531478 (inside body, 518 wide) · 60 · H p8/8/8/8 g21 FF · buttons [72,66] | Frame 758531776; Frame 758531780; Frame 758531486; Tabs; (body) Frame 758531844 | form card Frame 758531490 518x520 #EEF7F9 |
| 129:8130 Page=Clin_HealthStatus | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:yes back:hidden close:icon 24 in wrapper | Summary_Wrap · V p8/16/8/16 g24 · FF · 476 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [171,66] | Frame 758531776; Frame 758531780; Frame 758531486; Tabs; (body) Breadcrumb Buttons x2, _text button template x2; (footer) Frame 758531555; Text Button x2 | section heading rows 518x24 Akkurat LL Bold 16/24 #545454; Card 518x171 #FFFFFF with checkbox rows; Autocomplete Select Field 518x40 |
| 129:8316 Page=Clin_ExternalCare-Hospitalizations | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:yes back:hidden close:icon 24 in wrapper | Summary_Wrap · V p8/16/8/16 g12 · FF · 476 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [171,66] | scaffold x4; (body) Tabs 519x40 duplicate; Button 127 x2; (footer) Frame 758531555; Text Button x2 | Tabs/FilterSet 518x40 (segmented filter, bottom rule); Button 518x42 full-width outlined (kit Type=Default Icon=Right); MainWrap Father card 74 |
| 129:8401 Page=Clin_ExternalCare-HEdit | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:yes back:hidden close:icon 24 in wrapper | Summary_Wrap · V p8/16/8/16 g12 · AF · 482 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [72,171,66] | scaffold x4; (body) Button 127; Add Family Member; (footer) Frame 758531555 342; Text Button 56 | FilterSet 40; form card 518x414 #EEF7F9 |
| 129:8517 Page=Clin_ExternalCare-FSEdit | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:yes back:hidden close:icon 24 in wrapper | Summary_Wrap · V p8/16/8/16 g12 · FF · 468 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [72,171,66] | scaffold x4; (body) Button 127; (footer) Frame 758531555; Text Button 166 x2 | FilterSet 40; Button 518x42 outlined; MainWrap 74 |
| 648:1603 Page=Clin_ExternalCareFS | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:yes back:hidden close:icon 24 in wrapper | Summary_Wrap · V p8/16/8/16 g12 · FF · 468 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [72,171,66] | scaffold x4; (body) Button 127; Add Family Member; (footer) Frame 758531555; Text Button 166 x2 | FilterSet 40; form card 518x556 #EEF7F9 (overflows the fixed 468 body) |
| 129:8651 Page=ClinProSH_Edit | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:yes back:hidden close:icon 24 in wrapper | Summary_Wrap · V p8/16/8/16 g12 · AF · 374 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [72,171,66] | scaffold x4; (body) Add Family Member; (footer) Frame 758531555; Text Button 166 x2 | form card 518x358 #EEF7F9 |
| 648:3473 Page=Clin_ProSH | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:yes back:hidden close:icon 24 in wrapper | Summary_Wrap · V p8/16/8/16 g12 · AF · 178 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [72,171,66] | scaffold x4; (footer) Frame 758531555; Text Button 166 x2 | Button 518x42 outlined; MainWrap 104 |
| 129:8774 Page=Clin_Immunizations | Breadcrumbs 64 p16/16/16/16 g16 rule:no back:hidden close:icon 24 in wrapper | Summary_Wrap · V p8/16/8/16 g12 · FF · 476 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [205,80,67,119] | Frame 758531776 (239x1); Frame 758531780; Frame 758531486; Tabs; (body) Breadcrumb Buttons, _text button template; (footer) Frame 758531555; Text Button x2 | Button 518x42 outlined; section heading row 24; Father card 74; contains one REMOTE Sidesheetv3 variant instance (key 7b78051e…) nested inside this local set |
| 129:8843 Page=Clin_Immunizations-Edit | Breadcrumbs 64 p16/16/16/16 g16 rule:no back:hidden close:icon 24 in wrapper | Summary_Wrap · V p8/16/8/16 g12 · AF · 596 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [72,171,66] | scaffold x4; (body) Add Family Member; Frame 758531845; (footer) Frame 758531555; Text Button 166 x2 | form card 518x580 #EEF7F9 |
| 129:8928 Page=ImplantableDevices | Breadcrumbs 64 p16/16/16/16 g16 rule:no back:hidden close:icon 24 in wrapper | Summary_Wrap · V p8/16/8/16 g12 · FF · 476 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [119,66] | scaffold x4; (body) Frame 143727238 search 58; Frame 758531534 40; Frame 758531536 divider 16; Frame 758531538 286; (footer) Frame 758531555; Text Button x2 | Button 518x42 outlined; Frame 758531537 74 |
| 129:9040 Page=Clin-ImplantableDevices-Edit | Breadcrumbs 64 p16/16/16/16 g16 rule:no back:hidden close:icon 24 in wrapper | Summary_Wrap · V p8/16/8/16 g12 · FF · 476 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [171,66] | scaffold x4; (body) Frame 143727238; Frame 758531534; Add Family Member 48; Frame 758531536; Frame 758531538; (footer) Frame 758531555; Text Button x2 | Frame 758531537 518x476 form |
| 129:9205 Page=Clin_PMHx | Breadcrumbs 64 p16/16/16/16 g16 rule:no back:hidden close:icon 24 in wrapper | Summary_Wrap · V p8/16/8/16 g12 · FF · 476 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [171,66] | scaffold x4; (body) Frame 143727238 x2; Frame 758531534; Frame 758531536; Frame 758531538; (footer) Frame 758531555; Text Button x2 | three checklist sections 52/84/52 (Header 20 + Items); Comments 118 |
| 129:9392 Page=Clin_PMHx-Comment | Breadcrumbs 64 p16/16/16/16 g16 rule:no back:hidden close:icon 24 in wrapper | Summary_Wrap · V p8/16/8/16 g12 · FF · 476 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [171,66] | scaffold x4; (body) Frame 143727238 x2; Frame 758531534; Frame 758531536; Frame 758531538; Autocomplete dropdown 270x276; (footer) Frame 758531555; Text Button x2 | sections 52/149/52; Comments 118 with Autocomplete Select Field 110 |
| 129:9614 Page=Clin_PSHx | Breadcrumbs 64 p16/16/16/16 g16 rule:no back:hidden close:icon 24 in wrapper | Summary_Wrap · V p8/16/8/16 g12 · FF · 476 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [171,66] | scaffold x4; (footer) Frame 758531555; Text Button x2 | Present list 518x320 (8 checkbox rows); title text reads "Past Medical History" although the variant is Clin_PSHx |
| 545:5239 Page=Clin_Problems-Main | Header 64 p16/16/16/16 g16 rule:yes back:none close:icon 24 direct child; title fills 478 | MainWrap · V p16/20/16/20 g8 · AF · 377 | Footer · 76 · H p20/20/20/20 g12 FA · buttons [243,66] | (body) diversity icon frames x3 | toolbar row 510x42: _button template 185 outlined + Autocomplete 274; checkbox row: two DSR Form control label; Item rows 510x71 H p12/4 g8 with 40x40 outlined icon buttons; Divider (kit) between |
| 4704:17095 Page=Page54 | Header 64 p16/16/16/16 g16 rule:yes back:none close:icon 24 direct child | MainWrap · V p16/20/16/20 g8 · FF · 377 | Footer · 76 · H p20/20/20/20 g12 FA · buttons [243,66] | (body) Item1, Item3 x2, Divider x2 | empty state: only toolbar + one Form control label (checked) |
| 4494:3240 Clin_Problems-Drop | Header 64 p16/16/16/16 g16 rule:yes back:none close:icon 24 direct child | MainWrap · V p16/20/16/20 g8 · AF · 370 | Footer · 76 · H p20/20/20/20 g12 FA · buttons [243,66] | (body) diversity icon frames x3 | Item2 64 (single-line); ROOT-LEVEL OVERLAY: Autocomplete dropdown instance 344x132 and "image 31" RECTANGLE 23x30 (IMAGE fill) sitting outside the auto-layout flow |
| 4536:27605 Clin_Problems-Edit | Header 64 p16/16/16/16 g16 rule:yes back:none close:icon 24 direct child | MainWrap · V p16/20/16/20 g16 · AF · 318 | Footer · 76 · H p20/20/20/20 g12 FA · buttons [348,72,66] | none | Text Field 510x40; row 54: Text Field 332 + Type toggle 162; row 40: two date fields 251 (detached templates); Text Field 510x104 multiline (detached); footer leading Text Button 348 "Mark as error" in red |
| 129:10016 Page=Clin_Problems2-Edit | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:yes back:hidden Breadcrumb Buttons 648:1596 close:icon 24 in wrapper | Summary_Wrap · V p16/16/16/16 g12 · FF · 476 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [171,66] | scaffold x4; (body) Tab Set Meta 518x56; (footer) Frame 758531555; Text Button x2 | search row 40; result list 518x284 |
| 4618:4930 Page=Clin_Problems-Recent | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:yes back:hidden Breadcrumb Buttons close:icon 24 in wrapper | Summary_Wrap · V p16/16/16/16 g12 · FF · 476 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [68,171,66] | scaffold x4; (body) Tab Set Meta; (footer) Frame 758531555; Text Button x2 | footer leading 68x36 is a DSR Button variant=text (the only DSR button in the set) |
| 4618:5137 Page=Clin_Problems-Favorites | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:yes back:hidden Breadcrumb Buttons close:icon 24 in wrapper | Summary_Wrap · V p16/16/16/16 g12 · FF · 476 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [171,66] | scaffold x4; (body) Tab Set Meta; (footer) Frame 758531555; Text Button x2 | star icons instead of star_border |
| 545:5557 Page=Clin_MedList | Header 64 p16/16/16/16 g16 rule:yes back:none close:icon 24 direct child; hidden Button 51x28 in header | MainWrap · V p16/20/16/20 g8 · AF · 240 | Footer · 76 · V p20/20/20/20 g12 AF · buttons [510] | (header) Button 51x28; (body) diversity icon | _button template 185 outlined; Item1 71 / Divider / Item3 71 (V); footer single full-width kit Button Full Width=True |
| 129:10181 Page=Clin_SHx | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:yes back:hidden close:icon 24 in wrapper | Summary_Wrap · V p8/16/8/16 g24 · AF · 654 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [171,66] | scaffold x4; (body) Autocomplete dropdown 270x276; (footer) Frame 758531555; Text Button x2 | five sections (Alcohol, Tobacco x2, LivingEnvironment x2): Header 28/36 + chip row 40/92 with 22 Chip - Input; Comments 118 |
| 129:10364 Page=Clin_THx | Breadcrumbs 64 p16/16/16/16 g16 rule:no back:hidden close:icon 24 in wrapper | Summary_Wrap · V p8/16/8/16 g24 · FF · 476 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [171,66] | scaffold x4; (footer) Frame 758531555; Text Button x2 | Button 518x42 outlined; Frame 758531884 138: Item 1 49, divider, Item 2 49 |
| 129:10481 Page=Clin_Vitals-Default | Breadcrumbs (441 wide) 64 p16/16/16/16 g16.022226333618164 rule:yes back:hidden close:icon 24 in wrapper; title in Frame 758531830 | Summary_Wrap (441) · V p8/16/8/16 g16 · FF · 476 | Frame 758531478 (441) · 60 · H p8/8/8/8 g21 FF · buttons [425] | Frame 758531776; Frame 758531780 (550 wide, wider than root); Frame 758531486; Tabs (550 wide); (body) Contextual Alert x2; View change log 12/18 #1B75D0 (bound); Frame 758532125; Frame 758532144 SECONDARY; (footer) Frame 758531555; Text Button 72, 56; Button 171, 66 | Quick Entry field Frame 758532138 409x48; Or use editor row 409x24 14/150% #004852; DataRows 409x244 five rows 36 g16 with sparkline + 40x40 outlined icon button; footer single full-width Button 425 (kit Full Width=True) |
| 3569:22346 Page=Clin_Vitals-Default-Alert | Breadcrumbs (441) 64 p16/16/16/16 g16.022226333618164 rule:yes back:hidden close:icon 24 in wrapper | Summary_Wrap (441) · V p8/16/8/16 g16 · FF · 476 | Frame 758531478 (441) · 60 · H p8/8/8/8 g21 FF · buttons [425] | scaffold x4 (550 wide); (body) View change log; Frame 758532125; Contextual Alert (second); SECONDARY; (footer) Text Button x2, Button x2 | Contextual Alert Info 409x40 VISIBLE; DataRows 256 (Row_BP 48) |
| 3557:15328 Page=Clin_Vitals-QuickEntried | Breadcrumbs (441) 64 p16/16/16/16 g16.022226333618164 rule:yes back:hidden close:icon 24 in wrapper | Summary_Wrap (441) · V p8/16/8/16 g16 · FF · 476 | Frame 758531478 (441) · 60 · H p8/8/8/8 g21 FF · buttons [425] | scaffold x4; (body) View change log; Frame 758532125; Contextual Alert; Supporting Text; SECONDARY; (footer) Text Button x2, Button x2 | Quick Entry expanded: Field 409x156 stroke #000000 (detached text field template); DataRows 256 |
| 3496:15197 Page=Clin_Vitals-Expanded-Chart | Breadcrumbs (441) 64 p16/16/16/16 g16.022226333618164 rule:yes back:hidden close:icon 24 in wrapper | Frame 758532146 > Summary_Wrap (441) · H g8 FF > V p8/16/8/16 g16 · FF · 476 | Frame 758531478 (441) · 60 · H p8/8/8/8 g21 FF · buttons ["_button template 425 (kit template, not a Button)"] | scaffold x4; (body) View change log; Frame 758532125; (footer) Text Button x2, Button x2 | DataRows 409x516 (expanded charts) overflows the fixed 476 body; "Or use editor" #417E86 here vs #004852 elsewhere |
| 3501:15528 Page=Clin_Vitals-Expanded-Table | Breadcrumbs (441) 64 p16/16/16/16 g16.022226333618164 rule:yes back:hidden close:icon 24 in wrapper | Summary_Wrap (441) · V p8/16/8/16 g16 · FF · 476 | Frame 758531478 (441) · 60 · H p8/8/8/8 g21 FF · buttons ["_button template 425"] | scaffold x4; (body) View change log; Frame 758532125; (footer) Text Button x2, Button x2 | DataRows 409x558 with Frame 758532134 338 fill #F6F2EC (expanded table) overflows 476 |
| 3496:14449 Page=Clin_Vitals-Editor | Breadcrumbs (441) 64 p16/16/16/16 g16.022226333618164 rule:yes back:hidden close:icon 24 in wrapper; title "Vitals: New" | Summary_Wrap (441) · V p8/16/8/16 g12 · FF · 476 | Frame 758531478 (441) · 60 · H p8/8/8/8 g21 FF · buttons [72,66,127] | scaffold x4; (body) View change log; Button 409x36; SECONDARY; (footer) Frame 758531555; Text Button 166 x2 | Hide editor row; editor card Frame 758532127 409x284 stroke #D6D6D6: Heading 44 #F6F6F6 + three rows 80 |
| 3496:13859 Page=Page43 | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:yes back:hidden close:icon 24 in wrapper | Summary_Wrap · V p8/16/8/16 g16 · FF · 476 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [171,66] | scaffold x4; (footer) Frame 758531555; Text Button x2 | View change log VISIBLE 518x18; two Cards rows of three tiles 162x155 fill #8657AC@0.06 stroke #8657AC |
| 2116:8944 Clin_Vitals2 | Breadcrumbs 64 p16/16/16/16 g16.022226333618164 rule:yes back:hidden close:icon 24 in wrapper | Summary_Wrap · V p8/16/8/16 g12 · FF · 476 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [171,66] | scaffold x4; (body) column "1" 108x414; (footer) Frame 758531555; Text Button x2 | five-column table Frame 758531441 518x268; View change log visible |
| 129:11224 Page=CareChecklist | Breadcrumbs 64 p16/16/16/16 g16 rule:no back:hidden close:icon 24 in wrapper | Summary_Wrap · V p8/16/8/16 g12 · FF · 476 | Frame 758531478 · 60 · H p8/8/8/8 g21 FF · buttons [171,66] | scaffold x4; (footer) Frame 758531555; Text Button x2 | Add row 518x48 VISIBLE #FFFFFF stroke #8CA7A2 "Add New Care Checklist Item" #417E86; two Father cards 74 |

### Paint summary

- **boundPaints.** One. "View change log" text #1B75D0 carries a bound colour variable on 9 Vitals/Page43/Vitals2 children. Every other paint read under 129:6647 is unbound (raw hex).
- **root.** fill #FFFFFF@1.00, stroke #D6D6D6@1.00 w1 all sides, cornerRadius not read
- **header.** no fill; bottom stroke #D6D6D6@1.00 (strokeWeight mixed = single edge) on 32 children, none on 20; title #545454@1.00
- **subheaderFlowsheets.** #F5F5F5@1.00, bottom stroke #D6D6D6; column row #D4E0DD@1.00
- **formCard.** #EEF7F9@1.00 fill, stroke #D6D6D6@1.00 w1 (Allergies-Edit, FHX-Editing, HEdit, ExternalCareFS, ProSH_Edit, Immunizations-Edit)
- **outlinedControls.** stroke #8CA7A2@1.00 w1 on kit _button template outlines, hand-drawn Add rows, 40x40 icon buttons
- **brand.** #004852 (tab bar fill, field focus stroke, "Or use editor"), #417E86 (Add-row link text), #B54E1A (flowsheet latest value)
- **misc.** #F0F0F0 / #ECECEC segmented-control grounds, #F6F2EC / #F0EEE8 selected pills, #FEF5D5 warning card, #F9F9F9 summary card, #8657AC@0.06 tiles, #D0ECF1/#83CDD9 and #F7F7F7/#DEDEDE hand-drawn badges, GRADIENT_LINEAR on Index tiles

### Type summary

- **title.** Akkurat LL Bold 20/32 #545454 (all 54 headers)
- **sectionHeading.** Akkurat LL Bold 16/24 #545454 (HealthStatus, Immunizations); Bold 16/20 #004852/#FFFFFF in tab bars
- **body.** mixed-style rich text 16/150% #000000 (summaries, notes)
- **columnHeader.** Akkurat LL Bold 14/18 #000000 (flowsheet table)
- **tabLabel.** Akkurat LL Bold 14/20 #545454 (hidden segmented control)
- **link.** Akkurat LL Regular 12/18 #1B75D0 (bound) "View change log"; Regular 14/150% #004852 "Or use editor"; Regular 16/20 #417E86 "Add …"
- **rowText.** Akkurat LL Regular 16/20 #000000 / #545454; Regular 14/18 #545454 dates
- **metric.** Akkurat LL Bold 16/20 #B54E1A (flowsheet latest)
- **eyebrow.** Akkurat LL Bold 16/20 #6E6E6E "SECONDARY" (hidden)

### Set-level findings

- **propertyDefinitionsUnreadable.** componentPropertyDefinitions and variantGroupProperties both throw "Component set has existing errors". Three children are named without the Page= property (Clin_Problems-Drop 4494:3240, Clin_Problems-Edit 4536:27605, Clin_Vitals2 2116:8944), which is the visible cause.
- **overlapReading.** Every overlap involves at least one hidden child; no two visible children overlap. 20 hidden variants are parked on top of, or under, visible ones.
- **fractionalGap.** Header itemSpacing 16.022226333618164 on 30 children (every "Breadcrumbs" header from 129:7340 onward except the hidden Clinical ones). Fractional geometry per CLAUDE.md rule 4.
- **swappedVariants.** 129:7546 is named Page=Labs/Studies but its title reads "Documents"; 129:7580 is named Page=Documents but its title reads "Labs/Studies". 129:9614 Page=Clin_PSHx carries the title "Past Medical History".
- **remoteSelfReference.** 129:8774 contains an instance of a REMOTE Sidesheetv3 variant (key 7b78051e…, "Sidesheetv3/Page=Page=Interface, Essential, Property 2=Calendar, Sched"), so a copy of this set is published from another file and nested back inside it.
- **scaffoldWiderThanRoot.** On the six 441-wide Vitals children the hidden Frame 758531780 (550x60) and Tabs (550x52) still measure 550, wider than their 441 parent.
- **overflow.** Three children have body content taller than their fixed 476 body: 648:1603 (556), 3496:15197 (516), 3501:15528 (558).
- **rootOverlay.** 4494:3240 holds an Autocomplete dropdown instance and an image rectangle at variant root level outside the auto-layout flow.

## 4. Instance provenance

Totals: {"instances":4722,"DSR":15,"Kit":2892,"Other":1790,"Local":25}. Of 4722 instances under 129:6647: DSR 15, Kit 2892, Other 1790, Local 25. The 15 DSR instances are all on the four Problems children (Form control label, Checkbox, Icon/CheckboxUnchecked, one Button variant=text with PlusOutlined and DownCaret). Enum batch counted 4722 for this node with the same method.

Per child (instances / DSR / Kit / Other / Local) is in the children table. Every instance by component, set-wide:

| Instances | Class | Component |
|---|---|---|
| 277 | Kit | caret_down |
| 266 | Other | plus |
| 205 | Kit | close_outlined |
| 205 | Other | close |
| 179 | Kit | plus_outline |
| 178 | Kit | Checkbox/State=Unchecked |
| 174 | Kit | Caption |
| 170 | Other | _icon button template |
| 168 | Kit | _tab template |
| 168 | Kit | _tab indicator |
| 145 | Other | Icon Button/Default/Small/False/False |
| 136 | Other | Interface, Essential/Delete, Disabled (close X icon) |
| 126 | Kit | _button template/Size=Medium |
| 98 | Kit | close_filled |
| 98 | Other | close-alt |
| 94 | Kit | Chip - Input (Filter) |
| 87 | Kit | Tab/State=Inactive |
| 84 | Other | Icons / Interface / 12px/Icon=forward |
| 84 | Kit | Text Button/Type=Default |
| 71 | Kit | _chip template |
| 70 | Kit | menu |
| 68 | Other | Interface, Essential/Lock |
| 65 | Kit | ellipsis_linear |
| 60 | Other | _table row template |
| 60 | Kit | drag-drop |
| 58 | Kit | check_filled |
| 58 | Other | check-alt |
| 56 | Kit | _input field desktop template |
| 54 | Other | Interface, Essential/Arrow |
| 49 | Kit | Button/Type=Default, Size=Medium |
| 44 | Other | Breadcrumb Buttons/Type=Back Button |
| 44 | Other | Icons / Interface / 16px/Icon=backward |
| 42 | Other | Breadcrumbs/Stste=Default |
| 42 | Other | Breadcrumbs/Stste=Link |
| 42 | Kit | Tab Set |
| 42 | Kit | Tab/State=Active |
| 40 | Kit | Text Field - Desktop/State=Select Input |
| 39 | Kit | Tab/State=Disabled |
| 32 | Kit | Chip - Status/Type=Info |
| 31 | Kit | Chip - Status/Type=Success |
| 30 | Kit | Button/Type=Primary, Size=Medium |
| 27 | Kit | calendar_outline |
| 27 | Other | calendar |
| 24 | Kit | _button template/Size=Small |
| 22 | Kit | caret_up |
| 20 | Kit | Cell - Tabular Data (White) |
| 20 | Kit | Cell - Tabular Data (Gray) |
| 19 | Other | Interface, Essential/Trash, Delete, Bin |
| 18 | Other | Edit_light |
| 17 | Other | Arrows, Diagrams/Arrow |
| 17 | Kit | Checkbox/State=Checked |
| 16 | Other | Checkbox/Checked=Yes |
| 16 | Kit | chat1 |
| 16 | Other | outline/chat-bubble-left |
| 13 | Kit | _autocomplete field template |
| 12 | Kit | Body/Size=Body 1 |
| 12 | Kit | Divider/Color=Light |
| 11 | Kit | _alerts template |
| 11 | Other | Content, Edit/Pen, Edit |
| 11 | Kit | Radio Option/Count=Single |
| 11 | Other | _radio structure |
| 11 | Other | 2. Radio/1. Selected/1. Enabled |
| 11 | Local | Check-Circle/Mode=NotSelected (local) |
| 10 | Kit | sort |
| 10 | Kit | Cell - Tabular Data |
| 10 | Local | EditIcon/State=Default (local) |
| 10 | Kit | Button/Type=Default, Size=Small |
| 9 | Kit | Radio Button/Selected=False |
| 9 | Other | Interface, Essential/Search |
| 8 | Kit | _button template/Size=Large |
| 8 | Kit | Autocomplete Select Field/State=Inactive |
| 8 | Other | star_border/Style=Outlined |
| 8 | Other | Interface, Essential/dots |
| 6 | Kit | Column - Tabular Data |
| 6 | Other | _table header template |
| 6 | Kit | Button/Type=Default, Icon=Right |
| 6 | Other | menu (second library) |
| 5 | Kit | Button/Type=Default, Size=Large |
| 5 | Kit | Cell - Tabular Data (White, Checkbox) |
| 5 | Kit | Cell - Tabular Data (Gray, Checkbox) |
| 5 | Kit | Chip - Status/Type=Info, Drop Chip=True |
| 5 | Kit | Autocomplete/Multi-select=None |
| 5 | Kit | Contextual Alert/Type=Info, Dismissible=True |
| 5 | Kit | info_filled |
| 5 | Other | info-alt |
| 5 | Kit | Text Field - Desktop/State=Input Selected, Helper Text=True |
| 5 | Kit | Text Field - Desktop/State=Input Selected, Helper Text=False |
| 4 | Other | Interface, Essential/Send message |
| 4 | Other | Health, Medicine/hospital-center-2 |
| 4 | Kit | Contextual Alert/Type=Warning, Dismissible=False |
| 4 | Kit | warning_filled |
| 4 | Local | ConfigAndData-Line-Don't remove! (local chart config) |
| 4 | Kit | Header - Tabular Data/Checkbox=False |
| 4 | DSR | Form control label/State=Default (DSR) |
| 4 | Other | star/Style=Outlined |
| 4 | Kit | Button/Type=Default, Size=Medium, Full Width=True |
| 3 | Other | Interface, Essential/Chart, Square |
| 3 | Other | Science/lab-tube |
| 3 | Other | Health, Medicine/Heartbeat, Heart |
| 3 | Kit | attention_filled |
| 3 | Other | attention-alt |
| 3 | Other | ThumbsDown/State=Default |
| 3 | Kit | Button/Type=Default, Icon=Right, Size=Medium |
| 3 | Other | caret |
| 3 | Other | Icon Button/Default/Small/False/True |
| 3 | Kit | Chip - Status/Type=Success, Drop Chip=True |
| 3 | Kit | _text button template |
| 3 | DSR | Checkbox/Checked=Unchecked, State=Default (DSR) |
| 3 | DSR | Icon/CheckboxUnchecked (DSR) |
| 3 | Kit | Button/Type=Primary, State=Disabled |
| 3 | Other | Check-Circle/Mode=Selected |
| 2 | Other | Health, Medicine/Syringe |
| 2 | Other | Interface, Essential/bulb-light-gloss |
| 2 | Other | Interface, Essential/Flag |
| 2 | Other | brain_02 |
| 2 | Other | Health, Medicine/virus |
| 2 | Other | Interface, Essential/Emails, Letter, Mail |
| 2 | Other | User/User,Profile |
| 2 | Other | Health, Medicine/checklist-heart-square |
| 2 | Other | Interface, Essential/Note, Document, Clip |
| 2 | Other | Health, Medicine/prescription-square |
| 2 | Other | Content, Edit/Notes,Planner |
| 2 | Other | Health, Medicine/bandage-shoulder |
| 2 | Other | User/Group, User |
| 2 | Other | Interface, Essential/Status, Menu |
| 2 | Other | Health, Medicine/medical-cross-refresh |
| 2 | Other | Interface, Essential/Ticket, Group, Circle |
| 2 | Other | Health, Medicine/crutches |
| 2 | Other | Travel/Airplane |
| 2 | Other | ThumbsUp/State=Default |
| 2 | Kit | Text Field - Tablet + Mobile/State=Provide Input |
| 2 | Kit | _input field tablet mobile template |
| 2 | Kit | Radio Button/Selected=True |
| 2 | Other | solid/chat-bubble-left |
| 2 | Kit | Text Field - Desktop/State=Input Provided |
| 2 | Other | Autocomplete Select Field/State=Inactive (variant 2) |
| 2 | Kit | chat-fill |
| 1 | Kit | Contextual Alert/Type=Error, Dismissible=False |
| 1 | Kit | Contextual Alert/Type=Error, Dismissible=True |
| 1 | Other | ThumbsUp/State=Selected |
| 1 | Kit | Data Grid/Header Color=True, Alt Rows=True |
| 1 | Kit | Header - Tabular Data/Checkbox=True |
| 1 | Kit | Header - Tabular Data |
| 1 | Kit | ellipsis_filled |
| 1 | Other | ellipsis-alt |
| 1 | Kit | Autocomplete Select Field/State=Multi Select |
| 1 | Other | Interface, Essential/Strike |
| 1 | Other | Interface, Essential/Underline |
| 1 | Other | Interface, Essential/Clip, Attachment |
| 1 | Other | Interface, Essential/Photo, Image, Square |
| 1 | Other | Sidesheetv3/Page=… (REMOTE variant of a Sidesheetv3 set in another file) |
| 1 | Kit | Text Field - Desktop/State=Select Input (variant 2) |
| 1 | Kit | Checkbox Item/Property 1=Single |
| 1 | DSR | Checkbox/Checked=Checked, State=Default (DSR) |
| 1 | DSR | Icon/CheckboxChecked (DSR) |
| 1 | Other | check_circle/Style=Filled |
| 1 | DSR | Button/variant=text, color=primary, size=medium (DSR) |
| 1 | DSR | Icon/PlusOutlined (DSR) |
| 1 | DSR | Icon/DownCaret (DSR) |
| 1 | Kit | Dropdown - Open |
| 1 | Kit | Button/Type=Default, Icon=Left |

Per-child instance maps (key prefix:count) are in `inventory-data.js` under `inst`, with the prefix→name dictionary under `names`.

## 5. Mapping to the library

Verdicts per the batch instruction: DSR = a library component replaces it; GAP = none exists; DEFECT = one exists but renders differently. Library node ids cited.

| Region or instance | Source | DSR candidate | Verdict | Note |
|---|---|---|---|---|
| Container (paper, 550 or 441 wide, #FFFFFF, 1px #D6D6D6 all sides, no shadow) | variant root frame | Drawer 749:239, variant anchor=right, variant=persistent 749:230 | DEFECT | Library Drawer is 320 wide with a single-edge stroke (persistent) or a shadow (temporary); source is 550/441 with a full 1px border. Width is an instance override; edge treatment is not. |
| Body slot (free content under the header) | Main Wrap / Summary_Wrap / MainWrap / BODY | none | GAP | Drawer 749:239 ships four fixed List/Item children and no slot; an instance cannot host arbitrary children (CLAUDE.md rule 6). The body must be a sibling frame or SCAFFOLDING. |
| Header bar (64 tall, p16, title Akkurat LL Bold 20/32 #545454, bottom rule) | Breadcrumbs / Header / HEADER / NoteHeader | Drawer Header 749:231 + Divider 749:234 (inside 749:230) | DEFECT | Library header is 56 tall, p8/8/8/16 g8, title #000000 (bound text primary). Source is 64 tall, p16, title #545454, gap 16 (fractional 16.022 on 30 children). Dialog Title 186:5 is Regular weight and p16/24, further away. |
| Close control | Interface, Essential/Delete, Disabled 24x24 icon, no hit area (all 54) | Icon button 170:77 (color=default, size=medium) with Icon/CloseOutlined 76:11 or Icon/Close (MUI) 106:4 | DEFECT | Source renders a bare 24px icon-pack glyph; library renders a 40x40 button. The Drawer header already carries this pairing. |
| Back control (edit pages) | Breadcrumb Buttons 32x32 fill #E9EFEE (129:7826, 129:12486; hidden on 4 others) | Icon button 170:77 with Icon/ArrowLeft 575:3 | DEFECT | Source has a tinted 32px square; library icon button has no fill. |
| Header divider | bottom stroke #D6D6D6 on the header frame (32 children) | Divider 171:31 (Orientation=Horizontal) | DSR | Same 1px #D6D6D6; library binds it, source does not. |
| Footer action row (60 tall, p8, gap 21, top rule, right-aligned) | Frame 758531478 / FOOTER (39 children); Footer 76 tall p20 g12 (5 Problems children) | none as a component; Dialog Actions 186:9 (54 tall, p8 g8, no rule) is the nearest pattern | GAP | No footer/actions component exists outside Dialog, and Dialog Actions is not separable. Two footer heights and two paddings coexist in the source. |
| Footer buttons: Cancel / Save & Add to Note / Save | kit Text Button 72, kit Button outlined 171, kit Button Primary 66 (36 tall) | Button 79:2 variant=text; Button 79:2 variant=contained color=primary | GAP | The outlined middle button ("Save & Add to Note", "Create New Flowsheet", "Add Active Problems to Note", 518-wide "Add …" rows) has no library variant: Button 79:2 offers contained and text only, and ButtonOverrides.ts has no outlined rule. Dialog instance 787:1457 renders contained at 94x38 where the kit renders 36. |
| Full-width footer button (Vitals 425, Med List 510) | kit Button Full Width=True / _button template | Button 79:2 resized | GAP | No fullWidth axis on the library Button; MUI has one. |
| Contextual alert | kit Contextual Alert 534x40 (Warning/Error/Info) | Alert 165:57 | DSR (paint not compared this batch) | Library Alert paint was not read against the kit alert in this batch. |
| Text fields | kit Text Field - Desktop / - Tablet + Mobile, plus 9 detached _input field templates | Text field 121:350 | DSR |  |
| Autocomplete / select | kit Autocomplete Select Field, Autocomplete dropdown, Dropdown - Open | Autocomplete/Field 86:95, Autocomplete/Option 88:175, Autocomplete/Tag 103:100 | DSR |  |
| Chips (status, filter) | kit Chip - Status, Chip - Input (Filter) | Chip 156:171 | DSR |  |
| Hand-drawn badges (22 tall pills #D0ECF1/#83CDD9, #F7F7F7/#DEDEDE) | Frame "Badge" on Page49, Labs, Documents | Chip 156:171 size=small | DEFECT | Library Badge 208:955 is the MUI count badge, not a label pill. Chip is the nearest and renders at a different height. |
| Checkbox / radio rows | kit Checkbox, Radio Option; 15 DSR Form control label + Checkbox on the Problems children | Checkbox 136:47, Radio 137:31, Form control label 140:15 | DSR | The Problems children already use the library. |
| Segmented control / tabs (hidden scaffold) | kit Tab Set; hand-drawn Selector and Tabs frames (#F0F0F0 / #ECECEC grounds) | Tabs 201:14 with Tabs/Tab 201:13; Button group/Segment 160:996 or Toggle button 202:95 for the segmented style | DSR | Hidden in every child; not part of the visible template. |
| Flowsheet sub-header band (#F5F5F5, 74 tall, field + outlined button) | SUBHEADER / 2NDROW | none | GAP | Composition-level pattern, no component. |
| Flowsheet column header row (#D4E0DD, Bold 14/18) | Frame 758532067 | Table/Row 190:49 header, Table/Cell 190:21 | DSR (paint not compared this batch) |  |
| Data grid (CareCoordination) | kit Data Grid 502x396 | none | GAP | The library has Table/Row and Table/Cell only; DataGrid is a separate mechanism (CLAUDE.md rule 7). |
| Section heading (Bold 16/24 #545454) | text nodes | text style only | GAP | No heading component; typography variables exist. |
| Rich text summary (16/150%) | mixed-style TEXT nodes | text style only | GAP |  |
| Form card (#EEF7F9, stroke #D6D6D6, p12/p16) | Frame 758531490 on six edit children | Card 176:59 / Paper 171:27 | DEFECT | Source fill is a tint; library Card/Paper fill was not read this batch, but the library paper is color/background/paper (white) by convention. |
| Row action icon buttons (40x40 outlined circle, stroke #8CA7A2) | hand-drawn frames on Problems, Vitals, Med List | Icon button 170:77 with Icon/EditOutlined 575:13 / Icon/AddPaymentNote 575:2 | DEFECT | Library icon button has no outline ring. |
| List dividers | kit Divider/Color=Light | Divider 171:31 | DSR |  |
| Thumbs feedback | kit ThumbsUp / ThumbsDown | Icon button 170:77 with Icon/ThumbUpOutlined (MUI) 919:4 / ThumbDownOutlined 919:7 | DSR |  |
| Rich-text toolbar (PsychotherapyNote) | hand-drawn 32x32 buttons with icon-pack glyphs | Icon button 170:77 with Icon/FormatBold 200:19, FormatItalic 200:22, FormatUnderline 200:26, Icon/List 200:7 | GAP | Strikethrough, undo and redo have no library icon. |
| Icon-pack glyphs with a library equivalent | trash, pen, lock, search, calendar, caret up/down, plus, close, check, arrow-left, ellipsis, chat, star, print, drag, sort, info/warning/attention | Icon/TrashOutlined 76:14, Icon/EditOutlined 575:13, Icon/Lock 575:21, Icon/Search 575:30, Icon/Calendar 200:32, Icon/UpCaret 575:37, Icon/DownCaret 76:5, Icon/PlusOutlined 76:8, Icon/CloseOutlined 76:11, Icon/CheckmarkFilled 575:7, Icon/ArrowLeft 575:3, Icon/LinearEllipsis 109:4, Icon/ChatOutlined 575:6, Icon/FavoritesOutlined 575:17, Icon/PrintOutlined 575:26, Icon/DragAndDrop 575:12, Icon/Unsorted 575:36, Icon/InfoFilled 164:10, Icon/WarningFilled 164:13, Icon/AttentionFilled 164:7 | DSR | Glyph shapes differ between icon packs; match is by meaning. |
| Icon-pack glyphs with no library equivalent | Syringe, virus, Flag, Send, Mail, Strike, Photo, Clip, Chart Square, lab-tube, prescription, bandage, heartbeat, crutches, airplane, bulb, brain_02, hospital, dots, Notes, User group, Ticket, Status menu, medical-cross-refresh, undo/redo arrows, open_in_new, diversity | none | GAP | Mostly on the two hidden Index children and the toolbar. |
| Chart config and sparklines | local ConfigAndData-Line component, BarLineChart frames | none | GAP |  |

### Library reads

- **readMethod.** Design System Rebuild read with loadAsync only. No node was created, so no instance was placed for paint reads. Paints below come from (a) the Drawer masters, which have no on-canvas instance anywhere in the library, and (b) Dialog instance 787:1457 on Compositions. Drawer paint is therefore master-level and NOT yet instance-verified per standingBatchRules 1.
- **drawer.** {"set":"749:239","variants":{"anchor=left, variant=temporary":"187:3","anchor=right, variant=temporary":"749:212","anchor=left, variant=persistent":"749:221","anchor=right, variant=persistent":"749:230"},"size":"320x560","root":"V p0 g0 FF, fill #FFFFFF bound, stroke #D6D6D6 bound (w0 on temporary = shadow only; single edge on persistent)","header":"Header 749:231 320x56 H p8/8/8/16 g8: Title Akkurat LL Bold 20/32 #000000 bound; Icon button 40x40 with Icon/Close (MUI)","divider":"Divider 749:234 320x1 #D6D6D6 bound","body":"four List/Item 320x72 instances; no free content slot"}
- **dialog.** {"set":"747:185","variantSm":"186:4","size":"600x182","root":"V p0 g0 AF #FFFFFF bound, cornerRadius 4","title":"Title 186:5 600x64 H p16/24/16/24 g8; Text Akkurat LL Regular 20/32 #000000 bound","content":"Content 186:7 H p20/24/20/24; Text Regular 16/24 #545454 bound","actions":"Actions 186:9 600x54 H p8/8/8/8 g8 right-aligned: Button text 68x36, Button contained 94x38 #FF8D6E bound","instanceRead":"787:1457 on Compositions renders identically: title #000000*, body #545454*, contained button #FF8D6E*, labels #004852*"}
- **buttonVariantAxes.** Button 79:2 has 54 variants = variant(contained|text) x color(primary|secondary|error|inherit…) x size x State. No outlined variant, no fullWidth axis. Code: overrides/ButtonOverrides.ts defines no outlined rule; MUI base still accepts variant="outlined".
- **codeEquivalent.** No Drawer, Sidesheet or Panel component exists in packages/design-system/src/components. overrides/DialogOverrides.ts sets MuiDialog defaultProps maxWidth "sm" only. Product code (components/DataGridFilter/FilterGroupDrawer.tsx, FilterButton.tsx) uses MUI <Drawer anchor="right"> with a Box column (p:2, gap:2, boxShadow 5) and a hand-built close row. cobranding/createPartnerTheme.ts styles MuiDrawer paper for the mobile navigation drawer only.

Library node ids used: Button 79:2; Button group/Segment 160:996; Icon button 170:77; Link 171:33; Split button 627:161; Text field 121:350; Checkbox 136:47; Radio 137:31; Switch 139:67; Form control label 140:15; Autocomplete/Field 86:95; Autocomplete/Option 88:175; Autocomplete/Tag 103:100; Toggle button 202:95; Chip 156:171; List/Item 174:17; List 174:18; Table/Cell 190:21; Table/Row 190:49; Avatar 208:11; Badge 208:955; Divider 171:31; Alert 165:57; Tooltip 167:15; Paper 171:27; Card 176:59; Accordion 176:85; Menu/Item 152:15; Tabs/Tab 201:13; Tabs 201:14; Dialog 747:185; Drawer 749:239; Menu 749:323; Icon/DownCaret 76:5; Icon/PlusOutlined 76:8; Icon/CloseOutlined 76:11; Icon/TrashOutlined 76:14; Icon/Close (MUI) 106:4; Icon/LinearEllipsis 109:4; Icon/AttentionFilled 164:7; Icon/InfoFilled 164:10; Icon/WarningFilled 164:13; Icon/List 200:7; Icon/FormatBold 200:19; Icon/FormatItalic 200:22; Icon/FormatUnderline 200:26; Icon/Calendar 200:32; Icon/CheckCircle (MUI) 200:41; Icon/SearchOutlined (MUI) 312:4; Icon/EllipsisFilled 368:4; Icon/ArrowLeft 575:3; Icon/ChatOutlined 575:6; Icon/CheckmarkFilled 575:7; Icon/Delete 575:10; Icon/Document 575:11; Icon/DragAndDrop 575:12; Icon/EditOutlined 575:13; Icon/FavoritesOutlined 575:17; Icon/Lock 575:21; Icon/PrintOutlined 575:26; Icon/Refresh 575:29; Icon/Search 575:30; Icon/Unsorted 575:36; Icon/UpCaret 575:37; Icon/ThumbUpOutlined (MUI) 919:4; Icon/ThumbDownOutlined (MUI) 919:7

## 6. Variation matrix

Rows are structural axes (a region present or absent, or a different width). Anything not listed varies by content only: title text, body content, item count, alert text, which buttons are shown.

| Axis | Values |
|---|---|
| width | {"550":48,"441 (Vitals)":6} |
| headerLayer | {"Breadcrumbs (title in wrapper, close in a right-aligned frame)":41,"Header (title fills, close direct; Problems/Med List)":5,"HEADER (Flowsheets 939:9228, 861:7047)":2,"NoteHeader 65 tall gap 8 (129:7950, 129:12486)":2,"Breadcrumbs with title in Frame 758531830 (Vitals)":6} |
| headerBottomRule | {"present":32,"absent":22} |
| backButtonVisible | {"yes":["129:7826","129:12486"],"hiddenInstancePresent":["129:10016","4618:4930","4618:5137","129:8130"]} |
| hiddenNavScaffold | {"Frame 758531776 + Frame 758531780 + Frame 758531486 + Tabs":38,"Frame 143725286 only":6,"none":10} |
| subHeaderBand | ["939:9228","861:7047","867:7460","909:12649"] |
| toolbar | ["129:7614"] |
| bodyPadding | {"p8/8/8/8":["129:7340","4079:15495","2459:10180","2466:10562","129:7431","129:7467","129:7494","129:7546","129:7580","129:7614"],"p8/16/8/16":"most Clinical and all Vitals (30)","p0/16/8/16":["129:7726","129:7826"],"p16/20/16/20":["545:5239","4704:17095","4494:3240","4536:27605","545:5557"],"p16/16/16/16":["129:10016","4618:4930","4618:5137"],"p0/8/8/8":["129:6648","129:6995"],"p0/1/0/1":["939:9228","861:7047","867:7460","909:12649"]} |
| bodyGap | {"0":4,"8":8,"12":22,"16":17,"24":3} |
| bodyHeightMode | {"fixed 476 (root 600)":27,"hug":27} |
| footer | {"Frame 758531478 / FOOTER 60 tall p8 g21 top-level":33,"Frame 758531478 60 tall INSIDE the body (518 wide)":["129:7364","129:7726","129:7826","129:7950","129:12486"],"Footer 76 tall p20 g12 (Problems)":["545:5239","4704:17095","4494:3240","4536:27605","545:5557"],"none":["129:6648","129:6995","129:7340","4079:15495","2459:10180","2466:10562","129:7431","129:7467","129:7494","129:7546","129:7580","129:7614"]} |
| footerButtonPattern | {"Cancel + Save & Add to Note + Save (72,171,66)":9,"Save & Add to Note + Save (171,66)":17,"single full-width":["129:10481","3569:22346","3557:15328","3496:15197","3501:15528","545:5557"],"single outlined/primary":["939:9228","861:7047","867:7460","909:12649","129:7726","129:7950"],"two (243,66)":["545:5239","4704:17095","4494:3240"],"three with leading destructive text button":["4536:27605"],"three (72,66,127)":["3496:14449"],"four (205,80,67,119)":["129:8774"],"three inside body (132,105,69)":["129:7364"],"DSR text button + two (68,171,66)":["4618:4930"]} |
| rootOverlayOutsideFlow | ["4494:3240 (Autocomplete dropdown 344x132 + image rectangle 23x30)"] |
| contentOverflowsFixedBody | ["648:1603","3496:15197","3501:15528"] |

Content-only groups (same structure):

- 129:8517, 648:1603: form card present vs empty MainWrap
- 129:10016, 4618:4930, 4618:5137: search results vs recent vs favourites; star glyph
- 545:5239, 4704:17095: items shown vs hidden (empty state)
- 129:10481, 3569:22346, 3557:15328: alert shown; quick-entry field expanded
- 939:9228, 861:7047: chart band hidden vs shown
- 867:7460, 909:12649: sub-header 74 vs 58 tall only
- 129:8774, 129:8843: view vs edit form
- 129:9205, 129:9392: comment field open
- 129:8316, 129:8401, 129:8517, 648:1603, 129:8651, 648:3473: External Care / Procedures view vs edit
- 129:7546, 129:7580: identical structure; variant names and title texts are swapped
- 129:6648, 129:6995: tile widths 167 vs 255

## 7. Template proposal

**PROPOSAL, NOT A FINDING. Nothing was built. Property names below are Figma-only affordances in Sentence case (CLAUDE.md rule 2); none mirrors a code prop because no sidesheet component exists in packages/design-system.**

- **Sheet.** VERTICAL, p0, g0, width 550 (Vitals variants would use 441), fill color/background/paper, stroke 1px color/grey/400 all sides. Built as a frame, not a Drawer instance, because the Drawer instance cannot host the body (rule 6).
- **Header.** HORIZONTAL, 64 tall, p16, g16, fill none, bottom Divider 171:31. Children: optional back Icon button 170:77 with Icon/ArrowLeft 575:3; Title Akkurat LL Bold 20/32 bound to text secondary (#545454 as drawn) filling; close Icon button 170:77 with Icon/CloseOutlined 76:11.
- **Sub-header.** Optional HORIZONTAL band, fill color/grey/300, bottom Divider; holds a Text field or Autocomplete/Field and one Button. Off by default.
- **Body.** VERTICAL, p8/16/8/16, g16, fill none, FILL height between Header and Footer, clipsContent (scroll area). Content is placed by the consumer; the template ships it empty.
- **Footer.** Optional HORIZONTAL, 60 tall, p8, g8, top Divider, right-aligned. Two Button 79:2 slots: variant=text (Cancel) and variant=contained color=primary (Save). A third outlined slot cannot be expressed until the library has an outlined Button.

| Property | Type | Default | Toggles |
|---|---|---|---|
| Show back | BOOLEAN | false | back Icon button in Header |
| Show sub-header | BOOLEAN | false | Sub-header band |
| Show footer | BOOLEAN | true | Footer |
| Show secondary action | BOOLEAN | true | the text Button in Footer |
| Full-width action | BOOLEAN | false | single Button stretched across Footer (Vitals, Med List pattern); mutually exclusive with Show secondary action |
| Title | TEXT | Title | header title characters |
| Primary action | INSTANCE_SWAP | Button variant=contained color=primary | trailing footer button |
| Secondary action | INSTANCE_SWAP | Button variant=text color=primary | leading footer button |

Every one of the 54 children resolves to Sheet + Header + Body with at most Sub-header, Footer and back-button toggles; the two footer heights (60 and 76) and three body paddings collapse to one value each. What the template does not carry: the Flowsheets column header row, the PsychotherapyNote toolbar, the Patient Summary feedback row, and the hidden navigation scaffold, all of which are body content or dead layers.

Decisions needed:

- Width: 550 vs the library Drawer 320 vs code drawerWidth (set per use in FilterGroupDrawer).
- Title colour: source #545454 vs library Drawer header #000000.
- Outlined Button variant: needed for the middle footer action on 26 children; absent from library and code overrides.
- Footer height: 60 (39 children) vs 76 (5 Problems children).

## Schema record summary

Key `npveRebuild_sidesheet_inventory_2026_09_02` holds: _status, method, setLevelFindings, children[54] (geometry, provenance, structure), provenanceTotals, componentRollup, paintSummary, typeSummary, library, mapping[29], variationMatrix, templateProposal, caveats. Flags: npveSidesheet_noBodySlotInLibraryDrawer, npveSidesheet_headerDiffersFromDrawerHeader, npveSidesheet_noOutlinedButton, npveSidesheet_noFooterActionsComponent, npveSidesheet_noFullWidthButtonAxis, npveSidesheet_closeIsBareIconInSource, npveSidesheet_drawerPaintMasterOnly, npveSidesheet_sourceSetHasErrors.

Caveats:

- Structure was read to depth 3 and instances were not entered, so regions nested deeper (e.g. individual form fields inside form cards) are summarised, not itemised.
- Library candidate paints other than Dialog were not compared in pixels; those rows say so.
- The variant property list of 129:6647 could not be read; the Page= axis is inferred from child names.