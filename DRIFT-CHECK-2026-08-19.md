# Drift check, 2026-08-19

Run against the current Figma file and the current kit. **The kit is NOT recertified.** Two of the
four points fail and one file-wide invariant is broken. Nothing was fixed to make the check pass.

The 2026-08-10 certificate described **103 files**. The kit is **151**. That certificate no longer
describes what exists and is superseded by this document, not renewed by it.

---

## 1. Provenance

Added per file in `kit-provenance.json`, detected from content signature rather than asserted:
Figma's exporter always emits `width`/`height`/`viewBox`/`fill="none"` on the root, while
`icon-extract.py` emits `xmlns` first with no width or height.

| Provenance | Files | What they are |
|---|---:|---|
| **Figma export** | **103** | 55 PNG, 41 icon SVG, 7 illustration SVG. The original certified set |
| **Code source** | **48** | 39 icon SVG, 9 marketing SVG. Imported 2026-08-19 because `exportAsync` truncates at 20KB |
| **Unknown** | **0** | |

**One file needed an explicit override.** `Icon/Idea.svg` reads as a Figma export by signature and is
a code-source file by route: it entered the kit from `IdeaIcon.tsx`, whose markup is itself SVG that
was pasted out of Figma at some earlier point. The automatic test detects **origin**, not **route**.
Recorded as `code-source` with the reasoning in the file.

**Why this had to come first.** Points 2 and 3 compare names and paths, which is provenance-neutral.
Point 4 compares **pixels and hex**, which is not. A code-source SVG and a Figma-exported SVG of the
same glyph can differ in element order, clip ids and root attributes while being geometrically
identical, so any future point that diffs SVG bytes must filter on provenance or it will report
format as drift.

---

## 2. What the certificate actually asserts

Read from `REFERENCE-KIT.md` §"Drift check", not from the handoff's description.

| # | The assertion, verbatim in substance | Still evaluable? | Does 151 change its meaning? |
|---|---|---|---|
| **1** | `figma-export/` contains **103 files: 55 PNG, 48 SVG**, in **11 directories**, none with a trailing space | Yes | **Yes.** The numbers are the assertion. It cannot hold at any other count |
| **2** | Every PNG on disk is cited in the manifest or compositions table, and every cited path exists — both directions, zero unmatched | Yes | **No.** It is scoped to PNG, and no PNG changed |
| **3** | The **41** icon names match across disk, §3.33 and the icon index here; the **7** illustration names match across disk and §3.34 | Yes | **Yes.** "The 41" was both a count and a set. The set is intact; the count is not |
| **4** | Composed table selected row samples `#EBF1F2`; nav bar is 1440×65 at 1x; illustrations carry `#004952` with zero `#004852` | Yes | **No.** None of the three touches an icon |

---

## 3. Results, per point

### Point 1 — count and shape: **FAILS**

| | Certificate | Now |
|---|---:|---:|
| Total files | 103 | **151** |
| PNG | 55 | **55** |
| SVG | 48 | **96** |
| Directories | 11 | **12** |
| Trailing-space directories | 0 | **0** |
| Non-PNG/SVG files | 0 | **0** |

Fails on count and directory count. The new directory is `Marketing/`. **The shape assertions hold**:
no trailing spaces, no stray file types, PNG unchanged.

### Point 2 — PNG citation, both directions: **HOLDS**

**55 cited, 55 on disk, zero unmatched in either direction.** No PNG was added, removed or renamed.

### Point 3 — name matching: **FAILS at the new counts, with no regression in the old set**

| Check | Result |
|---|---|
| §3.33 index against the `REFERENCE-KIT.md` index | **Identical**, 41 = 41 |
| All 41 certified names still present on disk | **Yes**, zero missing |
| Icon files on disk | **80** |
| Icon names on disk in **neither** index | **38** |
| Marketing files on disk in **neither** index | **9** |
| Illustrations, disk against §3.34 | **7 = 7, holds** |

So the certified set is intact and the two indexes still agree with each other. What fails is
coverage: **47 kit files are described by no index**. Both indexes need extending before any
certificate can assert a name match.

**A name collision was introduced.** `Icon/RadioChecked.svg` and `Icon/RadioChecked (MUI).svg` are two
distinct files that reduce to one name once the marking convention is stripped — 80 files, 79 unique
names. §3.33 states the position explicitly: `RadioChecked` is marked `(MUI)` **"even though
`components/icons/RadioCheckedIcon.tsx` exists, because that file is referenced by nothing and MUI's
ring-and-dot is what renders"**. The icon import added the Tebra one anyway. Flagged, not fixed.

### Point 4 — pixel assertions: **HOLDS, all three**

| Assertion | Result |
|---|---|
| Composed table selected row samples `#EBF1F2` | **Present**, 37,568 sampled pixels. PNG decoded directly, no imaging library available |
| Nav bar 1440×65 at 1x | **2880×130 at 2x**, exactly 1440×65 |
| Illustrations carry `#004952`, zero `#004852` | **All 7**: counts 43, 50, 45, 122, 79, 64, 50 of `#004952`, and **0** of `#004852` in every one |

---

## 4. A broken invariant that is not a certificate point

The generators assert **zero unbound paints file-wide**. That is not one of the four points, so it
does not fail the certificate, but it is broken:

| Where | Unbound solid paints | Whose |
|---|---:|---|
| The 41 certified icons | **0** | — |
| The 7 illustrations | **0** | — |
| **The 48 newly imported icons** | **124** | **Introduced 2026-08-19 by the icon import** |
| `Reference` page | 17 | Pre-existing, `#E8E5DF` on REFERENCE frames |
| `Icon catalogue` | 6 | Introduced 2026-08-19, white label text on the nav cells |

Every one of the 48 new icon components carries an own frame fill of `#FFFFFF` at **`visible: false`**
— added by Figma's SVG importer. They paint nothing, and they are unbound paints. Flagged, not fixed.

---

## 5. Known items, disposed of

### The `Table exemplars` unbound fill — **does not exist**

The brief states the root frame carries an unbound fill against the invariant. **Read from the live
file, `Table exemplars` root has `fills: []` — no fill at all, bound or unbound.** The live file wins.

This is the third document to disagree about that frame. `DRAWER-EXEMPLARS.md` §1 says
`Table exemplars` "has a fill"; the DataGrid pass read it as empty; this check reads it as empty.
**The record is wrong in two places and the frame is clean.**

### The four nav icons — **sourced, not drift**

`Icon/Engage`, `Icon/Payments`, `Icon/Platform`, `Icon/Reports` have no file in
`packages/design-system/src/components/icons`. They came from the navigation config, which is a real
source outside the design system. **They read as sourced.** Their provenance is recorded as
Figma export, and the catalogue now shows all six nav glyphs on the nav ground so their context is
visible. Not drift, and not a finding.

### D-28 — **the disposition does not survive**

- The row claims system **144** and product **146**, dispositioned **product wrong**.
- The 144 is not a source value. It is `LAYOUT.md` B1's derivation — 16 + 60 + 8 + 38 + 16 = 138,
  snapped up to 144 by L1.
- `PATIENT-HEADER-DISCOVERY.md` establishes that **the source arithmetic produces 146** and the
  product renders 146.

**Source and product agree at 146. The number that disagrees is the derived one.** The disposition
was made against a derivation, before the source arithmetic existed. Whether that makes it "system
wrong" or simply closes the row is a decision, not a survey finding, and is not taken here.

### D-31 — **the disposition does not survive either**

- The row claims system **40**, product **~70**, dispositioned **product wrong on an off-rule value**,
  ruled 2026-08-14 with L1 supplying **72**.
- The ruling's stated premise is that 70 **"is off the 8 grid and matches no ramp in the system"**.
- **`Avatar.stories.tsx:121` declares `sx={{ width: 70, height: 70 }}`**, inside a ramp of
  20 / 40 / 70 / 120 / 180. Verified in the checkout today.

**Per the file's own rule that stories declare membership, 70 is a system value.** The premise that
it matches no ramp is false: it matches a ramp in the design system's own story. The 72 was supplied
to replace a number the system already declares. Reported, not resolved.

### Other "product wrong" rows called against something the stories support

**24 rows carry the disposition "product wrong"**, not the 33 a naive grep returns — the rest are
prose mentions.

Checked against the 50 Storybook groups: **1 more is story-contradicted, D-31, and it is already
above.** Most of the 24 are page, layout or navigation matters with no component story to appeal to —
`D-01` rail width, `D-02` calendar pitch, `D-04` to `D-10` layout and overflow, `D-27` insets,
`D-29` sub-nav width, `D-34` sub-nav state, `D-36` copy, `D-40` legacy chrome. `D-19` MenuItem,
`D-37` nav avatar and `D-38` nav search have no story group at all.

**So the count of additional story-contradicted rows is zero.** One row, **D-03**, is contradicted on
different grounds and is flagged rather than counted: it dispositions the product wrong for rendering
`pxToRem` call sites 14.29% large, while **the design system's own `SvgIconOverrides.ts` encodes
against the same 14px root** (`fontSizeMedium: "1.7142857142857142rem"`, which is 24/14). The row's
own text acknowledges the coefficient is a documented code defect. Not a story matter, so not in the
count.

---

## 6. The 53

**The brief's premise — that 53 "was never measured" — is false.** The design agent measured it.

`STORYBOOK-TABLE-READ.md` reads Table's own stories at **head 59.414** and **body 52.240 / 52.491**,
and records the body as **"≈53"**. Line 87 states it explicitly: *body 52.49 + 0.5 border ≈ 53
against the cited 53*. So 53 is a **rounding of a measurement**, not an unmeasured number.

**And a story authors a literal 53.** `TablePaginationClientSideControlled.stories.tsx:87` sizes its
filler rows `height: 53 * emptyRows`. Per the membership rule, that makes 53 a declared system value
in exactly the way `Avatar`'s 70 is.

**This cuts against my own DataGrid pass**, which wrote that "the 53 in the Table pass is not
reproducible against the live render". It is reproducible, as 52.49 plus border rounding, and it is
corroborated by an authored 53 in a story. Both readings are recorded below and neither is corrected
here, per the instruction.

### Every occurrence

**Code — the only authored 53**

| Location | What |
|---|---|
| `TablePaginationClientSideControlled.stories.tsx:87` | `height: 53 * emptyRows` |

**`C:\Code\design-agent`**

| Location | What |
|---|---|
| `TABLE-DISCOVERY.md:314` | Arithmetic: `20 (body2) + 16 + 16 + 1 (border)` = **53** |
| `TABLE-DISCOVERY.md:319–321` | "53 is corroborated inside the library's own stories", citing the filler row |
| `TABLE-DISCOVERY.md:355` | "kit 51 + 1 = 52; source arithmetic 52 + 1 = 53. One pixel, unexplained" |
| `TABLE-DISCOVERY.md:403` | Distinguishes a 84 multi-line cell from "the substrate's 53" |
| `TABLE-DISCOVERY.md:586` | Filler rows at 53 |
| `STORYBOOK-TABLE-READ.md:43` | `--basic-table`, measured 52.240 / 52.491, recorded ≈53 |
| `STORYBOOK-TABLE-READ.md:44,45,46` | `--table-customization` T0, T1, T2, same |
| `STORYBOOK-TABLE-READ.md:47` | `--scrollable-table`, 72.49 and 52.49, ≈73 / ≈53 |
| `STORYBOOK-TABLE-READ.md:76` | Summary row, Storybook medium ≈53 |
| `STORYBOOK-TABLE-READ.md:87` | "body 52.49 + 0.5 border ≈ 53 against the cited 53" |

**`C:\Code\design system`**

| Location | What |
|---|---|
| `DATAGRID-DISCOVERY.md:186` | "Table's body row resolved to 53 at medium as a consequence" |
| `DATAGRID-DISCOVERY.md:231` | "none of them equal to Table's 53" |
| `DATAGRID-DISCOVERY.md:503` | "Table does not measure 53" |
| `DATAGRID-DISCOVERY.md:505` | "The 53 in the Table pass is not reproducible" |
| `DATAGRID-DISCOVERY.md:574` | "Table 53, padding-driven, not authored" |

**Figma — one caption**

| Location | What |
|---|---|
| `DataGrid exemplars`, marker block | "Table reaches 53 as a consequence of its padding and authors nothing" |

**Absent:** `TEBRA-DESIGN-SYSTEM.md` contains no 53. `design-system-schema.json` has no flag
mentioning 53. So the number lives entirely in the drift and discovery records and in one story, and
**never entered the knowledge file** — which is why it was never reconciled.

---

## 7. Certification

**The kit is NOT recertified. It is uncertified as of 2026-08-19.**

| Point | Result |
|---|---|
| 1 — count and shape | **FAILS** on count and directory count; shape assertions hold |
| 2 — PNG citation both ways | **HOLDS** |
| 3 — name matching | **FAILS** on coverage; the certified 41 are intact and the two indexes still agree |
| 4 — pixel assertions | **HOLDS**, all three |

**What blocks a new certificate at 151.** Not the count — a new certificate can assert any count. The
blockers are:

1. **47 kit files are in no index.** Point 3 cannot be restated at the new counts until §3.33 and the
   `REFERENCE-KIT.md` icon index are extended to cover the 38 new icons and the 9 marketing icons, and
   until the marketing set has an index at all.
2. **124 unbound paints** on the 48 new icon components, against a stated file-wide invariant of zero.
3. **The `RadioChecked` name collision**, which §3.33 explicitly rules against.
4. **Mixed provenance is now a property of the kit**, and the certificate has no language for it. A
   certificate that asserts joins without saying which artefact each file is asserts less than the
   2026-08-10 one did.

None of these was fixed in this pass.

---

## Recertification, same day

The three blockers were worked in order, then the check was re-run once.

### Fix 1 — unbound paints: 124 → 74, **did not reach zero**

| | Count |
|---|---:|
| Before | **124** |
| Invisible importer frame fills removed | **48** |
| After | **74** |

**The brief's premise was wrong for 76 of the 124.** Only 48 were importer artefacts — one invisible
white frame fill per new component. The other 76 are **authored source colours** on the ten
multicolour icons and the three knockout icons. Removing them destroys the glyph.

They could only be cleared by binding `#FF8D6E` to `color/secondary/main` and `#1E4951` to something,
which is **IC-6 and IC-3** — explicitly excluded from this pass. So the count stops at 74, and two of
those left with `Icon/RadioChecked`. **The zero-unbound invariant is still broken and is not part of
the certificate.**

### Fix 2 — RadioChecked: withdrawn

Verified independently at 0.19.7, not taken from §3.33: `RadioCheckedIcon.tsx` **is** exported from
the icons barrel at `index.ts:50` and is **referenced by nothing else anywhere in `packages/`** — no
override, no story, no product file. Its only use in Figma was its own catalogue cell.

`Icon/RadioChecked` was removed from the file and `figma-export/Icon/RadioChecked.svg` from the kit.
`Icon/RadioChecked (MUI)` stays. **Nothing was renamed.** Kit 151 → 150, icons 80 → 79.

### Fix 3 — index: extended to every file

| | Before | After |
|---|---:|---:|
| Files described by the index | 41 | **150** |
| Icon names in the `REFERENCE-KIT.md` index | 41 | **79** |
| Icon names in §3.33 | 41 | **79** |
| Marketing index | none | **9** |
| Full per-file index with provenance | none | **150 rows** |

§3.33 had to be updated too, because point 3 checks three ways and its "41 of them ship" claim had
become false. Its marking convention and reasoning are preserved verbatim.

**One defect I introduced and caught:** the first index build wrapped long name lists across lines
without carrying the `·` separator, which silently merged `Calendar ChatFilled` and
`OperatingSystem PatientExperience` into single tokens. It made point 3 look like a data failure when
it was a formatting one. Fixed by keeping the separator at line ends.

### Re-run

| Point | Result | At |
|---|---|---|
| 1 — count and shape | **HOLDS** | 150 files, 55 PNG + 95 SVG, 12 directories, 0 trailing-space |
| 2 — PNG citation both ways | **HOLDS** | 55 / 55, zero unmatched |
| 3 — name matching | **HOLDS** | icons 79/79/79, marketing 9/9/9, illustrations 7/7, index 150/150, provenance 150/150 |
| 4 — pixel assertions | **HOLDS** | `#EBF1F2` present, nav 1440×65, 7/7 illustrations `#004952` with zero `#004852` |

**Certificate issued 2026-08-19** at 150 files. Its assertions are written into `REFERENCE-KIT.md` and
deliberately exclude the unbound-paints invariant, which is not a drift-check point and is not
satisfied.
