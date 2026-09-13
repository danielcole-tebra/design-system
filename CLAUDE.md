# CLAUDE.md

Figma builder for Tebra's design system. Given a spec, a screenshot, or a node in another Figma file, build it from the library to specification and report what the library can't express. The library is the source of truth for screens; code is the source of truth for the library. Code lives in web-app-v2/packages/design-system. This folder holds docs and a log, no source.

## Files
- Library (Design System Rebuild): YX2n4YLrEpBXNbcc73T6dw
- Proposals: zKT34LQogNjz3Z07fY4VQB. Consumes the library, never defines it.
- NPVE target: fdCQVFdvOByaOYIJYag0d6
- NPVE legacy source: zVsuhYehoSLLq880qRBFkq
- Tebra Working UI Kit: deprecated, read only.

Pass the file key on every call. Figma reports every file as "Document".

## Truth
Code is authority on values. Storybook is authority on render; a screenshot outranks a derivation. Production is evidence of behavior only. Figma is derived; where it disagrees with code, Figma is wrong.

TEBRA-DESIGN-SYSTEM.md is the written form of the code: theme architecture, token derivations, and the per-component table of what Tebra overrides versus MUI substrate. Read the component's row before building it. REFERENCE-KIT.md is the manifest of the deprecated kit and holds the open "need Daniel" items.

APPEARANCE-NPVE-EDIT-FORMS.md is the approved appearance specification for NPVE edit forms. Check a rebuilt form against it before reporting.

## Rules
1. Additive only. Never delete nodes, pages, or files. Mark superseded, archive with a README.
2. Names. A property mirroring a code prop uses code's exact name and values, lowercase. Figma-only affordances use Sentence case. Sub-component paths use / with no spaces. Published names are locked.
3. Verify in pixels. Screenshot every batch and look at it before reporting. Instantiate every new variant and read the instance; master reads are not evidence. Enumerate from the file, never from a prior report.
4. Integer px only. pxToRem inflation is 14.29% and affects geometry. Bind the intended integer.
5. Alpha lives in the variable's stored rgba. Never set a bound paint to opacity 1.
6. Instances cannot host children. Workarounds are labeled SCAFFOLDING.
7. Set figma.skipInvisibleInstanceChildren = false before any audit.
8. Cloning a variant drops componentPropertyReferences. Rebind after cloning.
9. A variant set's default follows canvas position, not layer order.
10. Report, don't resolve. A disagreement between sources is a finding. Never silently correct a source.
11. Markers. DEFECT renders differently from what ships. GAP is something the component cannot express. Grey cards, no red, yellow, orange, or green.
12. Publishing is manual. The API cannot publish or accept updates.

Plugin API traps and the icon recipe are in PLUGIN-NOTES.md. Read it before writing to Figma, not before reading.

## Record
After every batch, append one entry to LOG.md: date, file key, what was built, what was found, path to the screenshot. Open findings go in FLAGS.md as one line each, tagged DEFECT, GAP, or DECISION, and get struck through when closed. These two files are the only record.

## Agents
Any agent may run a batch. One agent per batch. Read this file first, append to LOG.md before stopping. A batch with no log entry is treated as unverified and audited before the next one starts. Stop and ask Daniel on any design question. Otherwise proceed. Don't ask for approval sentences, don't assign risk, don't ask before reading.
