# Separate design-system and work folders — 2026-11-02

Updated [the onboarding walkthrough](https://www.figma.com/board/uKNQ26ndMmK3c58oIaaBdh?node-id=5-2), file uKNQ26ndMmK3c58oIaaBdh, section 5:2, following Daniel's clarification.

Step 1 downloads shared guidance into its own local design-system folder. Step 2 creates a separate, freely named work folder, makes that primary in Codex and attaches design-system for reference. Text explains that these are real computer folders, project files/notes/screenshots live in the work folder, Figma designs stay in Figma, and the work folder can later become its own GitHub repository.

The setup and rebuild prompts explicitly read AGENTS.md from the reference checkout instead of assuming primary-folder discovery. Updated README, GETTING-STARTED, FIRST-RUN and screenshot capture 02 consistently. The guide identifies the pilot's evidence-recording destination as unresolved when the new work folder is not a Git repository; this does not waive recording or review requirements.

## Verification

- Inspected the current FigJam scope before editing.
- Updated text in the first two cards and readiness panel; preserved the vertical order and all nodes.
- Returned complete affected IDs, panel bounds, updated text, updated prompt-link target, and passing overflow/overlap checks in verification.json.
- Inspected board.png, step-1.png, step-2.png and readiness.png. Text is readable with one column, no clipping or overlap. The full board preserves the section context and sequence.
- Reviewed documentation for stale primary-folder instructions and checked git diff whitespace before commit.

No source-library changes, new participant folders or GitHub repositories were made. Actual setup screenshots and starter assets remain pending. Ready for Daniel's read.
