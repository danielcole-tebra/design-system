# Alpha Problems module and sidesheets

[Review Updated 11/16](https://www.figma.com/design/ViAWRVVtgkCXzItk0sQ5P0/SDE-Alpha-Prototypes?node-id=1319-4656).

Integrated the Problems design into all seven encounter frames and all six module-order permutations; Add opens blank New Problem, each row Edit opens its populated full-height modal sidesheet. Renamed Updated 11/13 to Updated 11/16.

Uses the existing compact module header/close/collapse controls and variable-driven right rail. Replaced six Problems body permutations in each of seven existing encounter frames (42 bodies). Each uses the local DS-linked list/row compositions. Old body children remain hidden; existing module visibility, ordering and rail logic are retained. The encounter note and recorder design are unchanged.

New opens a blank form. Four Edit forms correspond to Low back pain, Depression unspecified, Hypertension and Anxiety unspecified. Each uses the existing Alpha docked Sidesheet shell and DS fields/chips/buttons, a full-viewport bound black50 backdrop, width550, height1033, x943. Five new boolean variables govern35 modal layers, all closed by default. Cancel, Close and backdrop dismiss; Edit Save dismisses. Source content and sample code discrepancies are preserved from the prior DS translation.

Verified all42 Add actions,168 Edit actions,70 Cancel/Close exits and28 Edit Save exits. All35 bindings/dimensions/default visibility values read back correctly. Six full-context images visually inspected: canvas, New, and four Edit forms. Temporary visibility overrides used for captures were restored. All inserted text uses Akkurat LL; no image-filled nodes in affected content. Primitive audit:14 of15 exact structural comparisons pass; the sole difference is an inherited hidden Back icon slot named Icon/LeftCaret instead of generic Icon. All4 measured assertions pass. See record.json for raw evidence.

The form controls are visual prototype states. New has disabled Save because the mock does not support live entry. Edit Save closes the modal without persisting data. No played-through prototype is claimed; stored wiring and screenshots were checked. Existing unrelated picker/note overlays and historical11/13 handoff artifacts remain.

Recovery: bounded oversized reads after read-only failures; construction safely rolled back once and was retried with stable field IDs. Same-node screenshot calls returned only the last capture, so each final state was captured separately. Transparent body-only captures were superseded by the six full-context images.

No SDE Rebuild or library masters changed. This is not a benchmark; checkpoint times were not captured. Build, verification, audit scripts and actual IDs are saved alongside screenshots.

