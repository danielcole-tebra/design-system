# NPVE edit-form appearance

Scope: Allergies and Family History edit forms and explicit derivatives. This is not a global change to every input or every screen.

- Card: white paper, `color/background/paper`. Ruled by Daniel on 2026-09-23: edit forms sit on white paper; the pale teal Form surface (#EEF7F9, a file-local variable, not a library token) is local to NPVE and is not approved. Supersedes the pale teal card line that stood here until 2026-09-29. Applied 2026-09-29 to `634:6808`, `636:3`, `586:6414`, `580:6017` and `389:3469`; the superseded MODEL TEST `642:7557` keeps Form surface.
- Fields: white surfaces, visibly distinct from the card, including autocomplete, Age, condition/reaction inputs, add-entry input and Comments. Keep the existing library borders and floating-label treatment; verify the label cutout against its intended surface.
- States: preserve the planned filled/empty values, selected radios and approved resting/focused treatment. A source focus state may differ only with a documented decision.
- Actions: follow each form's approved mapping; a shared pattern does not make every Save button the same appearance.

Authority: operator clarification on 2026-09-10, “The rebuild should contain white fields, they should not match the background. The same as the reference.” Source evidence: Family History `129:12486` and Allergies `129:7826` in read-only file `zVsuhYehoSLLq880qRBFkq`. This records visual intent, not a newly verified implementation token. Resolve the implementation from code, Storybook and published-library evidence. A conflict must be reported, never hidden by changing library defaults.

Tracked finding: `npveEditForms_fieldSurfaceInheritance_2026-09-10` in `flags/active.json` (or `flags/resolved.json` after all listed dispositions are verified). The reviewed Family History and Allergies screenshots showed the teal card through the fields. Family History was cloned from Allergies; the model-test form was cloned from Family History. Do not reuse their field-surface treatment without current repair evidence. The builder is correcting Family History separately; this document does not claim that correction or the Allergies repair is complete.

Reuse this specification by path. At final comparison, record a short whole-form review in the checkpoint; explain approved visual differences rather than copying this specification into every row.
