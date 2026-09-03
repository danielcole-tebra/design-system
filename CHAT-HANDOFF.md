# Handoff — Tebra design system, for a planning session

Paste-in context for planning in Claude chat. No file access on the other side, so everything needed
to reason about the work is here. Nothing below is a decision; the decisions are at the bottom.

## What this is

A rebuild of Tebra's design system as a Figma library, derived from code rather than from design
intent. Source of truth is `packages/design-system` in the `web-app-v2` monorepo (published as
`@kareo-engineering/design-system`), riding `@mui/material` 5.15.12. There are almost no Tebra
components — `Button`, `Chip`, `Autocomplete` etc. are imported straight from MUI and the entire
Tebra design is `styleOverrides` on top. So "read the component" always means read the override *and*
the MUI substrate, then resolve which wins.

The governing rule: **values come from source, never from a rendered component.** A prior attempt
measured things in a browser and produced fractional widths.

## Precedence, when layers disagree

1. Code is authority on values.
2. Storybook is authority on render.
3. Production is evidence of behavior, never authority on values.
4. Figma is derived, not intent — where Figma diverges from code, Figma is wrong.

The fourth is stated explicitly because the usual assumption runs the other way. Consequence: nothing
is ever promoted into a value column from a production capture or from Figma.

## Three parallel streams

| Stream | Repo | Produces |
|---|---|---|
| Design system | `C:\Code\design system` | The Figma library + the two knowledge docs |
| Design agent | `C:\Code\design-agent` | Layout/pattern recipes and HTML builds, measured against the kit |
| Coordination | `C:\Code\design-coordination` | The shared ledger the other two read; holds no code |

### Design system — idle since Aug 11

- `TEBRA-DESIGN-SYSTEM.md` (87k) is the root knowledge file: architecture, tokens, a per-component
  truth table for ~34 components, system-level divergences, and a working-method section.
- `REFERENCE-KIT.md` joins the docs to the exported pixels. **Certified 2026-08-10** — 103 files
  (55 PNG + 48 SVG), all joins resolve in both directions, no open defects. Frozen; a four-point
  drift check re-validates it after any Figma change.
- The Figma file has **15 pages**, 34 variant sets carrying 444 variants, **505 component nodes**, 120
  variables, 0 unbound paints, 0 authored fractional dimensions. Six of the fifteen are board pages
  carrying instances and no masters (four exemplar sets, one proposal, one action row set).
  **505 against the 504 recorded here previously.** Enumerated 2026-08-18 as 444 variants + 13
  composites + 48 icon and illustration masters. The earlier 504 is not reproducible from the file
  today; the one-node difference is unexplained and is not resolved here.
- **The Cover blocker is cleared, 2026-08-18.** `cover-page-generator.js` was written and run. The
  inventory is now derived from the file on every run: page list, every set and variant count, every
  single component, icon and illustration counts, all totals, both style ramps and the variable
  counts per collection. Four stale numbers went with it — nine pages (15), 116 variables (120),
  31 icon masters (41), 105 schema flags (134) — and the Primary nav section appears on the Cover for
  the first time (`Nav/Icon button` 4, `Nav/Menu item` 2, `Nav/Search` 2, `Nav/Bar`, `Nav/Dropdown`,
  `Nav/Logo`). The generator goes red if a page appears that its classification lists do not know.
- One number in it is still authored because it lives on disk, not in Figma: `SCHEMA_FLAGS`. Refresh
  before each run with the one-liner in the generator header.
- **Published 2026-08-18**, after the file was moved into a project. Done by hand in the Figma UI;
  there is no publish method in the Plugin API, only `getPublishStatusAsync`. Verified from both
  sides: sets report `CURRENT`, and the proposals file imports both components and variables by key
  as remote references. The proposals file still needs the library **enabled** in its own library
  settings before a person sees anything in its Assets panel; import by key works without that, which
  is why the gap is easy to miss.
- Sequence from here: **bug list → Code Connect → drift check.** The kit certification is unaffected
  by publishing and by the Cover regeneration, since neither changes exported geometry, so the
  four-point drift check is not owed on either of those two changes alone.

### Design agent — active, last worked today

Seven HTML builds measured pixel-wise against the certified kit and against production captures.
Last pass swept all builds for exact-hex measurement error: every recorded number held. The finding
was instrument bias — exact-hex run-length understates curves by ~1px, so a naive re-check would
invent a uniform 1px regression. Box geometry is unaffected.

### Coordination — scaffolded today, one step from useful

`ledger.csv` (one row per component), `NOTES.md`, `patterns/`, `drift/`, `CHANGELOG.md`. Each stream
owns one directory, so writes can't collide. **Currently holds three open rows and nothing else** —
it was scaffolded without the settled component rows, which live in the audit in another repo.

## Open decisions — what a planning session should resolve

1. **Sequencing across three streams.** They were serial and are now parallel; only the coordination
   repo assumes that, and it is empty.
2. **The stale checkout: 0.18.3 vs 0.19.7.** Ground truth is a minor version behind shipped. Known to
   affect at least `ListItemButtonOverrides` (gained a focus-visible treatment) and the icon set (one
   new, five modified against the certified 41). Nobody has scoped what else moved.
3. **Cover regeneration, and whether publish is worth unblocking now** or after the version catch-up.
4. **Three ledger rows needing your call:** which token supplies badge ink; whether `FacesheetTotals`
   is a component or a composition; whether Card (D-32) is one component with props or several.
5. **Deferred and never scoped:** DataGrid + TreeView (licensed, no exports), Typography, the icon
   catalogue, Portal, Layout, Popover, ListItemDelete. Plus four patterns marked list-don't-build.

## Method rules worth carrying into planning

- Enumerate from the artefact, never from a previous report — including from this document.
- Pixels over property readbacks. A node's properties describe the node, not the render.
- Report disagreements; don't resolve them. Four list-row surfaces with different selection
  treatments, five interactive states, two warning hues — normalising any of it silently would
  destroy the most valuable output.
- Verify a correction before acting on it. Three plausible corrections have already failed source.
