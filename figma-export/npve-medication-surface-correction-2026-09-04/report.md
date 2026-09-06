# NPVE medication surface correction — 2026-09-04

## Outcome

The `Medication summary row` master (`219:2068`) now binds its surface to published `color/background/paper` (`f1e85cc976b10ea275c03f5d7f21a0dc12cdfee0`). All six existing instances inherited white automatically.

## Scope

- Target: NPVE Rebuild `fdCQVFdvOByaOYIJYag0d6`, Templates `3:2`
- Source remained read only: `zVsuhYehoSLLq880qRBFkq`
- Library remained read only: `YX2n4YLrEpBXNbcc73T6dw`
- Only the master fill binding changed.

## Validation

- Master and six instances: `518×76`, paper variable, RGB `1/1/1`
- Row property references: `7` on the master and every instance
- Component API unchanged: `Status`, `Name`, `Dose`, `Show divider`
- Medication list body and preview: `518×206`, `19` references each
- Typography: Akkurat LL only
- Templates unbound non-instance fills: known section chrome only
- Fractional authored dimensions outside VECTOR/GROUP exemptions: `0`

## Evidence

- `source-body-545-5572.png`
- `corrected-row-states-224-1730.png`
- `corrected-body-preview-238-1806.png`
- `corrected-body-instance-238-1809.png`
- `reference-vs-rebuilt.png`

The previous grey mapping remains visible in the historical build record; this corrective batch records the user-reviewed source interpretation without rewriting history.
