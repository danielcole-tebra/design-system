# Medlist native rebuild · batch 1

Owner/reviewer: Daniel Cole. Builder: Codex. Evidence date: 2026-11-14.
File: yh2F6OUgdI6K0risLtKLEQ (Tebra organization).

## Authorized scope

New file and a first reviewable Current medications screen, rebuilt with Design System Rebuild instances and tokens. Reusable project components remain local. The original eRx Concepts and SDE files are reference-only. Stop for Daniel's visual review after this batch.

## Assembly contract

- Desktop width 1440; library navigation 65 high; compact patient context; chart rail 192; page gutters 16; worklist 1216.
- Table columns: selection 44, medication 300, date/source 144, supply 136, order/pharmacy 300, reviewed 96, actions 156, overflow 40. All integer px.
- Native small fields (40), tabs (48), small switches (40 × 24), checkbox (42), small row buttons (30), small icon buttons (34), pagination (52).
- Body uses canonical text styles and ink. Medication title h5, details body2; page title h2. Parent ground grey/300; paper white; related gaps 8 and insets 16.
- Native Table/Cell headers retain current published internals, including their 14/24 label. This follows the live library for this proposal; it does not resolve the historical code line-height question.
- Search uses the native Text field without a leading icon. No adornment scaffold or detached component is introduced.
- Initial state: current count 12, history count 16, first ten medication records, zero reviewed, no selected rows.
- Local reusable parts: patient context, toolbar, reconciliation band, order/pharmacy status, medication row. Native library instances remain connected.

## Action outcomes and subsequent work

This first batch is a static review screen. No played-through prototype is claimed.

| Trigger | Intended outcome to build after review |
|---|---|
| Current/history tabs | Corresponding worklist |
| Show medications, order status, search | Filter the worklist and count |
| Add to med list | Manual medication entry |
| Prescribe medications | Prescribing workflow |
| Import from Surescripts | Import/reconcile external medication history |
| Row checkbox | Select row for bulk actions |
| Reviewed switch / Mark all as reviewed | Update reconciliation count for this session |
| Complete reconciliation | Validate every current medication reviewed, then complete |
| Edit | Open that medication's editing flow |
| Resend / View issue | Recover failed transmission / resolve required patient information |
| Timeline chevron | Expand medication timeline |
| Overflow | Medication-specific actions |
| Pagination | Change the displayed ten-record page |

Patient header and chart navigation retain the source's action intent. No patient workflow is newly specified here. Source reset behavior remains: reviewed switches reset on reopen/refresh.

## Current register

| ID | Kind / owner / scope | Status and impact | Evidence / workaround |
|---|---|---|---|
| MED-01 | DECISION · Daniel · current-medications composition | Proposed for visual review: compact patient context, 192 rail, 1216 table and body2 details | New build, 2026-11-14; no global SDE ruling implied |
| MED-02 | GAP · library maintainer · native search adornment | Nonblocking: native unadorned field preserves search input | Existing `text-field-adornments`; no scaffold used |
| MED-03 | DECISION · Daniel · table heading | Nonblocking library-first proposal; shipping line height still unresolved | Existing `table-head-line-height`; no library changes |
| MED-04 | Scope · builder · interaction coverage | Subsequent flows and prototype pending visual review | Current batch contains the starting state only |
