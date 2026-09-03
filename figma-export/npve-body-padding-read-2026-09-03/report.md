# Body padding read on screen 27:6 — 2026-09-03

Read-only. Target `fdCQVFdvOByaOYIJYag0d6`, pages Templates and Screens loaded with `loadAsync`, no writes, no schema record. All values are absolute bounding boxes in canvas px.

## 1. Boxes on screen instance 27:6 (screen at x 614, y 60, 550×600)

| Node | x | y | w | h | bottom |
|---|---|---|---|---|---|
| Header divider | 614 | 116 | 550 | 1 | 117 |
| Body frame | 614 | 117 | 550 | 488 | 605 |
| Body slot instance (Problems picker body) | 630 | 125 | 518 | 384 | 509 |
| Search field (Text field instance) | 630 | 125 | 518 | 40 | 165 |
| Input | 630 | 125 | 518 | 40 | 165 |
| Outline › Cap left (stroke INSIDE, top weight 1) | 630 | 125 | 9 | 40 | 165 |
| Outline › Body right (stroke INSIDE, top weight 1) | 809 | 125 | 339 | 40 | 165 |
| Label / floating (notch frame) | 639 | 117 | 170 | 16 | 133 |
| Label / floating › text | 644 | 117 | 160 | 16 | 133 |

Render bounds: the Text field's absoluteRenderBounds start at y 117 (h 48) because the notch label renders above the outline; Cap left's render bounds start at y 125 (h 40).

Distances from the divider's bottom edge (y 117):

- to Body frame top: **0**
- to Body slot top: **8**
- to Search field box top: **8**
- to the outline's painted top line: **8** (stroke INSIDE, so the line starts at the box top, y 125)
- to the notch label frame top: **0**
- to the notch label text top: **0**

The notch label sits 8px above the outline (y 117 to 133 over an outline starting at 125), so its top touches the divider.

## 2. Body frame padding as rendered on 27:6

paddingTop 8 (space/8), paddingRight 16 (space/16), paddingBottom 8 (space/8), paddingLeft 16 (space/16), itemSpacing 16 (space/16). VERTICAL, FIXED/FIXED.

## 3. Master 6:65 and Problems picker body 26:221

- Master 6:65 Body: paddingTop 8 (space/8), paddingRight 16 (space/16), paddingBottom 8 (space/8), paddingLeft 16 (space/16), itemSpacing 16 (space/16). Divider bottom to Body top 0; Body top to slot top 8 (slot at y 65 under a body at 57).
- Problems picker body 26:221: paddingTop 0 (space/0), paddingRight 0 (space/0), paddingBottom 0 (space/0), paddingLeft 0 (space/0), itemSpacing 16 (space/16). VERTICAL, AUTO/FIXED. First child Search field at the body's own top (y 1700 = frame y).
- Body slot instance on 27:6 reads the same as 26:221: 0/0/0/0 (space/0), gap 16.

Where they disagree: the template Body (instance and master) reads 8/16/8/16; the picker body reads 0/0/0/0. They do not disagree with each other, they nest: 8 from the template, 0 from the picker.

## 4. Is the rendered top padding 0 where the master says 8?

No. The rendered top padding is 8 on the instance and 8 on the master. Overrides on the instance chain for the Body and Body slot: only `name` on I27:6;6:80. The swap did not touch padding. The divider sits at the Body's top edge (distance 0), and the Body's 8 puts the search field outline at 8 below it. What reaches 0 is the Text field's floating notch label, which extends 8px above its own outline box inside the 40-tall field.
