# NPVE rebuild — Social History

Status: IN PROGRESS  
Date: 2026-09-06

## Pre-write audit

The live 550 × 778 source contains five section groups, nine compact fields, two inline unit labels, one New Entry action, one multiline Comments field, and a two-action footer. Every control maps to a published Design System Rebuild component: small Text field instances for all fields and a small contained-primary Button for New Entry. Section headings and unit labels are the only free-standing text and will use bound Akkurat LL typography and colour tokens.

The target file still has the shared Sidesheet, Rebuild comparison, and Change log APIs intact. Social History will be added after the current section 15 Encounter page shell, without moving or modifying any existing section.

## Stop condition

Stop if a published Text field or Button cannot express the source in render, if file or dependency identity changes, if a hand-drawn control would be required, or if a new design decision appears. Otherwise stop after the reusable body, shared-shell sheet, frozen reference, change log, sole comparison, screenshots, standing-rule verification, and final record are complete.

## Planned spacing

- 16px Sidesheet body inset and general vertical element rhythm.
- 24px between semantic section groups.
- 8px only where a section heading's line box optically pairs with its first control row.
- Footer follows the final field; no fixed empty body height.
