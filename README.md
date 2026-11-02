# Tebra design system for designers

Use Codex connected to Figma to assemble editable screens from Tebra's published library. This repository gives the agent composition guidance and verification rules; component source lives in the sibling `web-app-v2/packages/design-system` repository.

**Start with [Set up Codex and Figma](GETTING-STARTED.md).** Ask Codex to download the design-system repository into its own folder. Create a separate work folder with any name, make it primary in Codex, and attach design-system as a reference. Then connect Figma, create your own design file, and enable the published library.

Prefer a visual walkthrough? Open [Get started with Codex + Figma in FigJam](https://www.figma.com/board/uKNQ26ndMmK3c58oIaaBdh?node-id=5-2), with seven steps arranged top to bottom and one column of instructions per card. Cards 1 and 2 include Daniel's real screenshots; the [capture list](SCREENSHOT-CAPTURE-LIST.md) identifies the remaining views to supply. The practice card is also still pending.

Then follow [Your first rebuild](FIRST-RUN.md). The guided exercise converts a manually built contact-details card into library-based Empty and Filled states, with screenshots and a verified checklist of what changed.

The guide is a draft for review. The supplied starter Figma card, screenshot, and verified reference rebuild still need to be created before a designer pilot. Setup and image display also need to be checked in each participant's client.

## What you should receive

- An editable Figma composition using library instances and tokens.
- Screenshots of the result, shown in your chat for review.
- A link to the new Figma section, a brief verification summary, and any limitations.

The agent must explicitly capture, inspect, and display images. A saved screenshot or a successful tool call alone does not establish visual review.

## Where to go next

| Need | Start here |
|---|---|
| Set up the tools and your own Figma file | [Set up Codex and Figma](GETTING-STARTED.md) |
| Review the proposed first exercise | [Your first rebuild](FIRST-RUN.md) |
| Give an agent the building rules | [AGENTS.md](AGENTS.md) |
| Check supported components and tokens | Relevant entry in [LIBRARY.md](LIBRARY.md) |
| Reuse an assembly pattern | Relevant entry in [COMPOSITIONS.md](COMPOSITIONS.md) |
| Understand an unresolved library limitation | Linked entry in [OPEN-ISSUES.md](OPEN-ISSUES.md) |

Designers can start with the exercise; the agent reads the technical references it needs. The older long-form documents and archived screens are historical evidence, not onboarding prerequisites.
