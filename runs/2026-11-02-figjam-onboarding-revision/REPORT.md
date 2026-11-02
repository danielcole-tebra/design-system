# Single-column Codex-first onboarding — 2026-11-02

Updated [Daniel's vertically reordered walkthrough](https://www.figma.com/board/uKNQ26ndMmK3c58oIaaBdh?node-id=5-2), file `uKNQ26ndMmK3c58oIaaBdh`, section `5:2`.

## Changes

- Preserved Daniel's eight-card top-to-bottom order and edited his copy in place. The earlier two-column section 2:2 remains intact.
- Step 1 now starts in a local Codex project and supplies a request for Codex to clone or reuse the design-system checkout. Step 2 makes that checkout primary and starts a repository-aware chat. The written setup guide uses the same sequence.
- Reflowed every card into one left-aligned text column: title, instructions, prompt or resource link, checkpoint, capture notes. Sized cards to their content and corrected the overflowing board header.
- Hid the seven previous reference images, preserving their nodes and adding a hidden archive README (8:2). No nodes deleted. Real screenshots remain pending from Daniel.
- Added SCREENSHOT-CAPTURE-LIST.md with nine current setup capture targets and a later starter-card capture, filenames and required visible content. Updated README and guide links to section 5:2.

## Verification

The write returned all affected IDs and readback checks in verification.json. The updated section has 87 text nodes (including one hidden archive README), eight child sections and seven hidden image rectangles. Visible text uses Inter. No visible overflow or text overlap was found; zero reference images remain visible in the revised walkthrough.

The additional targeted read in links-and-alignment.json confirms each card's text has x=48 and width=1104, the preserved panel order, all ten hyperlink targets and preservation of section 2:2. No prototype interactions were added.

Exported and visually inspected board.png and step-1.png through step-8.png. The complete board establishes the vertical sequence; panel images verify readable text, consistent order and no clipping or overlap. Git whitespace and local Markdown-link checks completed before commit.

The local-project guidance remains supported by [official OpenAI documentation](https://learn.chatgpt.com/docs/projects), retrieved November 2, 2026. No fresh-user setup was performed. Screenshot capture, starter creation and the verified reference rebuild remain pending; these are explicit in the guide and board.

Ready for Daniel's review before the next Figma build batch.
