# Patient header reappraisal

Review date: 2026-11-19. Status: **initial audit complete; full legacy coverage is not established**. This is the current review/register for the Proposals patient header. August records remain historical evidence. No design decision is changed by this review.

The compact examples are coherently assembled, but the work does not account for all the inspected source states or interactions. The largest issue is that its allergy severity model cannot be derived from the header data contract. Missing operational states and content-length behavior prevent treating this as a complete replacement.

## Evidence and limits

- Live Figma: Proposals `zKT34LQogNjz3Z07fY4VQB`, [header set 12:773](https://www.figma.com/design/zKT34LQogNjz3Z07fY4VQB?node-id=12-773), examples `14:75`, action component `45:537`, control `31:335`, and header/action instances on chart page `168:248`. Invisible instance children were included. No nodes were added, edited, imported or deleted.
- Source inspected read-only at `C:/Code/web-app-v2`, clean checkout [commit 58f5d42](https://github.com/kareo-engineering/web-app-v2/tree/58f5d42b7a17fdeabfce3d2897dc0567333a48b3), dated 2026-08-13. **This establishes the available legacy v2 source behavior, not November production parity.** No current authenticated product session or fresh legacy EhrWebApp render was available in this review.
- Historical inputs: [proposal](archive/discovery/PROPOSAL-PATIENT-HEADER-V1.md), [discovery](archive/discovery/PATIENT-HEADER-DISCOVERY.md), [action discovery](archive/discovery/ACTION-ROW-PATIENT-PHASE0.md), and [action build](archive/discovery/ACTION-ROW-PATIENT-BUILD.md). Embedded task instructions were treated as history. Old library limitations were not promoted into current library findings.
- [Raw live evidence](runs/2026-11-19-patient-header-reappraisal/evidence.json) includes properties, content, layout, bindings and reactions. Six screenshots were rendered and inspected: [variants](runs/2026-11-19-patient-header-reappraisal/variants.png), [examples](runs/2026-11-19-patient-header-reappraisal/examples.png), [control context](runs/2026-11-19-patient-header-reappraisal/control-context.png), [later chart header](runs/2026-11-19-patient-header-reappraisal/chart-header.png), [later chart actions](runs/2026-11-19-patient-header-reappraisal/chart-actions.png), and [quiet patient](runs/2026-11-19-patient-header-reappraisal/quiet-header.png).
- Read-only audit, not a build benchmark; end-to-end timing was not instrumented. No prototype playthrough, code rendering, keyboard/accessibility test or altered-content stress test was performed.

## What holds up

All five masters measure 900×72, with a native 40×40 avatar, 10/16 padding and two text lines. Four 900px examples demonstrate pronouns off, restricted/legal-name content, nonzero balance, allergy error and avatar fallback. They render without obvious clipping for their chosen content. Existing placements were read at 1184 and 1440 wide. Major defaults match the August proposal.

The header uses remote Avatar, AttentionFilled and Link components. Inspected root fills/strokes and descendant solid fills are variable-bound. This is a bounded construction check, not certification of every token, alpha, master override or current published library version. Avatar/Link/Button internal text lacking a text-style ID was not treated as an authored composition defect.

Actions were deliberately moved, not simply lost. The header is 72px and its separate action row is 56px: **128px total**. Against historical 146px minimal content arithmetic, that is 18px, approximately 12%, less height. The 146 figure excludes outer borders and is historical. This is not a newly measured product saving, and omitted content must be reconciled before claiming equivalent functionality.

Settled decisions remain intact: balance is content with one visual treatment; `Restricted=false` renders no label; the former modal-only action-selection rule was withdrawn. SDE's local 68px header ruling does not change this Proposals component.

## State and capability coverage

Source references are relative to `packages/clinical-system/src/` at the pinned commit; paths under `ClinicalPageHeader/` mean `components/ClinicalPageHeader/`. Missing coverage means missing in the inspected header/action composition and examples, not proof that the library cannot express it.

| Source state or capability | Proposal coverage and assessment | Source |
|---|---|---|
| Allergies present | Severe/MildOnly plus a later Moderate text override. Proposed severity split; source displays names without severity filtering. | `types/facesheet.ts:169–181`; `ClinicalPageHeader/Allergies.tsx:19–24,71–105` |
| No known allergies | NoneKnown represented. Source flag precedence needs an explicit mapping when flags and a nonempty list coexist. | `Allergies.tsx:51–75` |
| No known medication allergies | No named state/property. Must not be silently collapsed into “No known allergies.” | `Allergies.tsx:51–56` |
| No history documented | NotDocumented represented with revised copy. | `Allergies.tsx:56` |
| Allergy request error | Error represented. Retry is a new proposed affordance with no stored reaction; query exposes refetch but source header does not use it. | `Allergies.tsx:86–87`; `queries/useAllergiesQuery.ts:44` |
| Allergy initial loading / refetch | Missing. Source maps isFetching to loading. | `Allergies.tsx:61–65`; `useAllergiesQuery.ts:40` |
| Cached allergy data + date | Missing. This must coexist with available content, distinct from request failure. | `Allergies.tsx:108–114` |
| Full-header loading | Missing. | `ClinicalPageHeader.tsx:7–32,50` |
| No patient / fetch failure | Missing; source offers fetchPatient retry. | `HeaderContent.tsx:25–35` |
| Identity, allergy or action render failure | Missing region fallbacks. | `HeaderContent.tsx:43–54` |
| Preferred name, pronouns on/off, legal name differs | Text and visibility props present. Legal-name example uses NoneKnown, not widest allergy state. | `PatientOverview/PatientOverview.tsx:106–167,220–225` |
| Missing MRN/name/DOB/phone/gender | No missing-field contract. MRN omission with separator removal is not exposed. Source itself has missing-data weaknesses, which should not be copied automatically. | `PatientOverview.tsx:106–167` |
| Pediatric age / months | Editable text; only adult examples. Expressible, but fit unverified. | `utils/patientHelper.ts:159–163` |
| Primary insurance, secondary only, both, neither | No insurance content/property or verified relocated surface in the inspected chart. | `PatientOverview.tsx:145–166` |
| Photo present/fallback, hover/edit | Initials and generic fallback only; “photo state” is explicitly a placeholder. Source opens photo management and shows a camera on hover. | `PatientOverview.tsx:178–205,255–262` |
| Full patient detail disclosure | No disclosure surface/wiring. Source name hover opens full identity, insurance, address, phone/email, alert and cache information. | `PatientOverview.tsx:211–252`; `PatientCard.tsx:74–143` |
| Restricted/unrestricted | Restricted boolean; omission of unrestricted label is approved. Access-management relocation is unspecified. | `PatientOverview/ChartAccess/AccessLink.tsx:24–42` |
| Protection disabled / restriction fetch failed / dialogs | No additional state/interaction. Source includes “Restrictions failed to load” and role-dependent dialogs. | `ChartAccess/index.tsx:11–24`; `ModalControl.tsx:169–195` |
| Patient alert and full alert disclosure | Missing. Source chip/popover carries alertMessage; cached patient data can add a notice. | `HeaderRightLinks/HeaderRightLinks.tsx:79–104,130–161` |
| Balance zero/nonzero | Covered visually; both $248 displays agree in later chart. Values are authored independently. Credit/unavailable/loading behavior unspecified; source has no explicit balance-error UI either. | `HeaderRightLinks.tsx:35–53,118–126` |
| Billing product disabled | Balance/payment remain visible; missing gate. Single visual treatment does not resolve visibility. | `HeaderRightLinks.tsx:112–128` |
| Original note mode | Default New Note split + AI button present. Note-type menu, fetch failure and selection outcomes not modeled. | `HeaderRightLinks/CreateNoteButton.tsx:54–80,134–145` |
| NDE enabled | No alternate row; source replaces both note buttons with CreateSelector. | `HeaderRightLinks.tsx:172–178`; `components/CreateNoteButton/CreateSelector.tsx:90–166` |
| AI eligibility, trial, pending | Always-enabled AI button misses feature/role/note-restriction gates, trial affordance and pending disabled state. | `HeaderRightLinks/AiNoteButton.tsx:20–29,41–61` |
| More open, portal status, clinical/write privileges, HIE role/flag | Button and descriptive list only. Menu not built; source does not always expose eight enabled entries. | `HeaderRightLinks/MoreMenu/MoreMenu.tsx:198–209,288–309` |
| Action outcomes | No stored reactions in inspected header/action masters/placements. No root hyperlinks on inspected text. Static affordances do not establish working workflows. | Live evidence; action contract below |
| Long content, combined flags, narrower viewports | 900px floor; no demonstrated long-content or sub-900 behavior. | RPH-04 below |

## Current findings register

All entries: evidence date **2026-11-19**; scope **Proposals patient header and action composition**; owner **Daniel for design decisions, consuming-screen builder for implementation/verification**. No new global library defect is asserted. Findings do not block discussion or an additive design batch; they block a claim of complete parity.

| ID / kind | Status, impact and disposition | Approved workaround |
|---|---|---|
| RPH-01 · DECISION | Open. Source Allergy has no severity; Severe/MildOnly cannot be computed from this contract. Choose available-data semantics or require an additional authoritative severity source and unknown-severity rule. Quiet patient `220:983` is still `Allergies=Severe` while displaying “Moderate: penicillin”: content and variant metadata diverge. | None recorded for severity mapping. |
| RPH-02 · GAP | Open. Missing medication-specific negative, allergy loading/cache, whole-header loading/no-patient/region failure, patient alert and restriction failure. These are independent dimensions, not five mutually exclusive allergy variants. | None. |
| RPH-03 · GAP | Open. Insurance, patient details, photo management and access-management actions lack verified replacement destinations. Hiding the unrestricted label remains settled; removing its workflow is not established as settled. | Documented photo placeholder does not establish parity. |
| RPH-04 · GAP | Open. No overflow contract. Severe at 900 leaves identity 471px for a 464px demographics row: 7px spare. Legal-name group is 184px; showing it adds an 8px inter-item gap too, predicting 656px, **185px beyond identity width**. Identity clips, rows are no-wrap/hug, text truncation disabled. Readback-derived, not a rendered stress test. Aaron's example instead has a 644px row inside 673px identity under NoneKnown. | None; needs retained combined-state tests. |
| RPH-05 · GAP | Open. Billing, NDE, AI/trial and More permissions missing. Static all-enabled composition cannot represent every user/practice configuration. | None. |
| RPH-06 · GAP | Open. Open menus, action results, retry transition and detail disclosure missing from inspected scope. Define action → destination → visible result before implementation/prototype acceptance. | Static controls acceptable only as explicitly incomplete review material. |
| RPH-07 · DECISION | Open. Need absent-demographics, pediatric-age, long-content and unavailable-balance contracts. Text props do not define behavior. Proposal says Sex; legacy reads gender: confirm field meaning/terminology rather than silently substitute. | None. |
| RPH-08 · GAP | Evidence incomplete. Legacy EhrWebApp has historical closed-menu evidence only; current production not checked against August snapshot. All-state parity cannot be certified. | Historical inventory guides capture checklist with unknowns retained. |

## Action contract still to reconcile

| Trigger | Inspected source destination/result | Proposal evidence |
|---|---|---|
| View All | `/EhrWebApp/patients/viewAllergies/{patientId}`; source shows link when combined names exceed 65 characters | Link always shown in Severe/MildOnly; condition change and navigation unverified |
| Retry | New proposal behavior; query refetch is available | No retry/loading/success or repeated-error transition |
| Patient name / avatar / chart access | PatientCard / photo management / role-dependent access dialog | No equivalent disclosure flow |
| Collect Payment / Print | Payment route / PDF in new tab | Labels present, no stored destinations |
| New Note / AI Note Assist | Practice-configured type selection and new-note route / resolved AI route with trial gating | Default buttons only |
| More | Secure messaging, education, exports/import and gated HIE; disabled/hidden entries depend on permissions and portal state | Descriptive eight-item list, no menu or outcomes |

## Legacy and adjacent surfaces

Historical EhrWebApp capture lists Pt. Msg (disabled), Print, Pt. Ed., + Note, Scripts, Orders and Exchange; four are split controls. v2 has related prescription/order destinations and moves education/HIE into More. **This does not prove equivalence of legacy split menus.** Pt. Msg equivalence and Exchange contents were explicitly unresolved. Original capture files were not located in the searched workspace copies; these observations rely on the dated action discovery record.

ClinicalPageNav carries identity/access/details when the top header is hidden; composition-ui explicitly uses that mode. notes-ui PatientInfo has a separate demographics treatment and age-zero truthiness issue. Portal SelectedPatientHeader includes email and explicit missing-value fallbacks. These were checked for scope, not redesigned or assumed to be replaced by the chart band. A universal-header migration was never established by the proposal.

## Next review batch

Resolve RPH-01 first: the allergy summary needs a defensible data mapping. Then specify independent loading/failure/cache states and destinations for displaced fields/actions. Preserve the 72px reference and build a retained review set at 900 and actual chart width: legal name plus longest allergy content; long/pediatric demographics; missing MRN; restriction failure; alert plus cache; billing off; AI hidden/trial; NDE on; permission-dependent menus. Obtain current product evidence and opened legacy menus for unresolved behavior. This is a proposed verification scope, not an approved redesign.

