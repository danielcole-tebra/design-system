# Flowsheets row appearance

Scope: Basic PHQ-9 and With trend GAD-7 only. Operator: “build the row with substitute icons for now”.

- 518px local content width; white paper surface; 16px vertical padding. Live 40px Icon buttons sit centered in 42px local action areas. This preserves both published geometry and the NPVE minimum, without editing the shared master or global wording.
- Horizontal semantic gaps 16px, action gaps 8px. Fixed column allocations fit 518px and preserve the visible order; no list header is built. Basic retains its source Updated placement; With trend has the extra trend content.
- Akkurat LL Bold measure/score; Regular update/trend. Existing heading/body2 text styles and typography tokens. Operator clarified: “scores in the flowsheet are a different color depending on their severity. Those should be bound to a design token color.” Preserve severity meaning through token bindings. The earlier standard-text proposal is withdrawn. The exact severity-to-token mapping for these two examples remains to be verified; do not derive clinical severity from the numeric score or orange artwork alone. Source text remains exact.
- Temporary substitutions: AddPaymentNote for note-add; Reports for monitoring; EditOutlined for pencil; UpCaret for double-up trend. PlusOutlined for add. Glyph fills bind text/secondary in this consuming instance, including Reports' otherwise-white navigation paint. No detached or redrawn glyphs.
- A neutral 12px GAP label below each row identifies temporary icons. This is an explicit frame marker, not an application control. Severity color is a required token binding, not a temporary neutral-ink substitute.
- No focus/hover state invented. All actions remain Default. Compare live instances against masters and test text-property changes through a disposable proof before archive.
- Frozen source row PNG at 2x; dedicated Rebuild comparison instance per variant, a Change log/Row helper on the right. Master comparison and shared menus unchanged.

Evidence: fresh-source.json, fresh-library.json, target.json; design-system IconButtonOverrides.ts, typography/typography.ts and palette/paletteValues.ts. Precedence follows CLAUDE.md. Existing tokens are reused; no new library or NPVE token is created.

Operator color decision, 2026-09-11: use Neuron and First Aid for now. PHQ-9 15 binds existing color/error/main (First Aid); GAD-7 12 binds color/warning/dark (Neuron). This resolves the pending example-color choice above. No thresholds or automatic severity rules are introduced.

Final factual correction: source With trend has top/bottom1px #D6D6D6 borders. These are restored using color/divider on the content row; Basic has no strokes. Both final comparisons reinspected.
