# Tebra design system for designers

Use Codex connected to Figma to assemble editable screens from Tebra's published library. This repository gives the agent composition guidance and verification rules; component source lives in the sibling `web-app-v2/packages/design-system` repository.

**Start with [Set up Codex and Figma](GETTING-STARTED.md).** Ask Codex to download the design-system repository into its own folder. Create a separate work folder with any name, make it primary in Codex, and attach design-system as a reference. Then connect Figma, create your own design file, and check access to the published library. Adding the library manually is recommended for browsing and editing in Figma.

Prefer a visual walkthrough? Open [Get started with Codex + Figma in FigJam](https://www.figma.com/board/uKNQ26ndMmK3c58oIaaBdh?node-id=5-2), with eight steps arranged top to bottom and one column of instructions per card. Cards 1–3, 5 and 6 include Daniel's real screenshots. Step 7 supplies a copyable practice image; steps 1, 2, 6 and 7 include their full prompts. Step 8 covers reviewing the result and shows the actual reference rebuild. The [capture list](SCREENSHOT-CAPTURE-LIST.md) identifies the remaining setup view to supply.

Then follow [Your first rebuild](FIRST-RUN.md). Copy the supplied contact-details image into your Design file and ask Codex to rebuild it as editable library-based Empty and Filled states, with screenshots and a verified checklist of what changed.

The guide is a draft for review. The [starter PNG](assets/onboarding/contact-details-starter.png) and [reference rebuild test](https://www.figma.com/design/dZqYSxEj3scbmRP4IqJGLh?node-id=3-1630) are supplied. The reference has structural checks and inspected screenshots; Daniel reviewed the result on November 2, 2026; a designer pilot remains. Setup, image copying and result display still need to be checked in each participant's client.

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
