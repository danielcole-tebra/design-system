# Open issues for new builds

Active register from 2026-10-31. FLAGS.md is historical. SDE is settled for now: none of its residual work is assigned here. These entries identify uncertainty or capability limits relevant to future tasks, based on dated records, not a fresh Figma audit. Recheck only what a task depends on.

GAP = required capability not expressible (or explicitly qualified documentation gap). DEFECT = confirmed render differs from shipping behavior. DECISION = choice needed. Owners identify the role that must act, not a new assignment to complete work now. A documented workaround can make a GAP nonblocking.

| ID / marker | Scope and evidence | Status / consequence | Next step / owner |
|---|---|---|---|
| `consumer-capabilities` · GAP | Publication/consumer update status. 2026-09-29 audit §3.9 found SDE's imported Text field lacked Fill across 231 instances. | Current publication and consumer acceptance unknown. Does not reopen those instances. | Builder reads actual consumer properties when needed. Library maintainer/designer handles manual publishing/update acceptance. |
| `text-field-adornments` · GAP | Historical reads 2026-09-02/17 found no start/end swap slots. Old IDs: npveProblemsRecent_textFieldNoStartAdornment, libraryTextField_noEndAdornmentSlot. | Documented capability limit; recheck when needed. Outer-frame icon overlay is an established SCAFFOLDING technique, not a native slot. | Daniel chooses the workaround or a library extension for a new request. No children inside an instance. |
| `token-map-unverified` · GAP | Some code tokens have no verified Figma-name evidence in this reference; LIBRARY.md marks them. | Documentation coverage gap, not proof variables are absent. | Builder/library maintainer reads required name, value, scope and collection; updates the row with dated evidence. |
| `table-head-line-height` · DECISION | Historical Flowsheets spec says 14/20; 2026-09-13 instance record says 14/24. Source transcription §3.15 establishes size/weight, not resolved line-height. | Unresolved discrepancy for new geometry; no SDE repair requested. | Verify applicable code/substrate and instance before deriving height. Daniel decides any design departure. |
| `primary-chip-visible-hover` · DECISION | Source transcription §3.9: filled primary clickable hover uses primary.dark = primary.main #004852. | No visible colour change; no replacement colour approved. Matching code is not a DEFECT. | If a new brief needs visible hover, Daniel chooses the departure; then check library capability. |
| `slider-coverage` · GAP | No Slider entry or values found in the former nine-file reference set. | Documentation gap only; live library/code availability unverified. | Ask for intended design/source and behavior (range, step, default, labels); investigate within authorized scope. Never invent MUI values. |

## Adding and closing entries

Keep one entry per capability/problem, with component, owner, status, evidence date, impact and accepted workaround. Add task-specific evidence rather than duplicate the same GAP per screen. Unknown, unsupported and historically observed are different statuses. On resolution update LIBRARY.md or COMPOSITIONS.md, preserve the finding in that batch's report, and remove it from this active view. Screen-only choices belong in the project's spec/register.

## Historical findings not carried forward

The old FLAGS register and SDE register remain historical evidence. Their open counts do not define this register. Missing SDE result screens, compact recording overflow, old glyph substitutions and unfinished prototype paths are not new library assignments. Mobile-only rulings are not global defaults.