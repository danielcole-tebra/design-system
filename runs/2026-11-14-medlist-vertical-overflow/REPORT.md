# Medlist · Plain vertical overflow in Comparison B

Replaced Comparison B's filled circular overflow glyph with published Tebra Icon/LinearEllipsis, a plain vertical three-dot stack. Existing native button and compact spacing retained.

[Review section](https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=23-881) · File: yh2F6OUgdI6K0risLtKLEQ

## Timing

Start: 2026-11-15T01:28:43Z. Ready to construct: 2026-11-15T01:29:25Z. Construction returned: 2026-11-15T01:30:06Z. First image: 2026-11-15T01:30:35Z. Verified: 2026-11-15T01:30:46Z.

Preparation/discovery: 42s; construction: 41s; verification after construction: 40s. First image elapsed: 112s; verified elapsed: 123s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- Verified library source Icon/LinearEllipsis at109:4, key4b36995eeb808368112345235e670acfd187d920. Three vertical dot paths; no enclosing circle. Imported and applied through the native Icon instance-swap property.
- Ten affected Comparison B consumers enumerated live. Ten native Icon button structural/token checks and102 measured assertions passed.
- 34×34 control,18×18 slot, approximately3.43×15 visible dot stack. No resting background or border. Existing grey.600 token and8 px adjacent action gaps preserved.
- All ten rows retain exact visible text, height, button dimensions and ink. No progressive disclosure added; screen remains1440×1428.
- Full Comparison B screenshot viewed; plain vertical dots render correctly beside row actions. Working screen and earlier studies remain unchanged.

## Findings and recovery

- DECISION · Daniel,2026-11-14,scope Comparison B medication-row overflow: replace filled-circle glyph with plain vertical kebab. Status applied. Supersedes the previous under-review glyph selection; no size/color override authorized or needed.
- Used Tebra's verified equivalent of the requested vertical overflow pattern, not a newly drawn glyph or a claim of exact MUI SVG geometry. MUI names its corresponding icon MoreVert; the supplied m3.material.io page is Google's Material Design guidance.
- Previous local row master retained at56:3026 with archive description. Imported icon master56:3051. Source library not modified.
- Read-only audit initially compared Figma node object identity and could not find the preceding action. Corrected to stable ID comparison; final audit passes. No canvas correction needed.
- Icon replacement only. Existing popup menu contents and click-through behavior were not implemented in this batch.

## Observable effort

Counts through verification: figmaCalls=9; otherCalls=unavailable; searches=1; technicalRetries=1; canvasCorrections=0; clarificationStops=0; tokens=unavailable.

## Reading

- User Material3 menus URL (JavaScript-only content) and official MUI Material Icons catalog confirming MoreVert.
- Tebra published search result and live Icons & illustrations source109:4; existing Comparison B local row and all ten consumers.
- LIBRARY.md Icon button; previously loaded Figma use/generate-design guidance and API checks.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [comparison-b.png](comparison-b.png)

One fixed-build run; not evidence of a general speedup.
