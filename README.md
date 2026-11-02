# Tebra design system for designers

Use an AI design agent connected to Figma to assemble editable screens from Tebra's published library. This repository gives the agent composition guidance and verification rules; component source lives in the sibling `web-app-v2/packages/design-system` repository.

**Start with [Your first screen](FIRST-RUN.md).** The guided exercise builds a patient-search panel with results and empty states, shows the result in chat, and explains how to review it.

The first-run guide is ready for a designer pilot. Its reference was built and verified on October 31, 2026; a new designer has not yet completed the onboarding pilot. Setup and image display need to be checked in each participant's client.

## What you should receive

- An editable Figma composition using library instances and tokens.
- Screenshots of the result, shown in your chat for review.
- A link to the new Figma section, a brief verification summary, and any limitations.

The agent must explicitly capture, inspect, and display images. A saved screenshot or a successful tool call alone does not establish visual review.

## Where to go next

| Need | Start here |
|---|---|
| Try the system for the first time | [Your first screen](FIRST-RUN.md) |
| Give an agent the building rules | [AGENTS.md](AGENTS.md) |
| Check supported components and tokens | Relevant entry in [LIBRARY.md](LIBRARY.md) |
| Reuse an assembly pattern | Relevant entry in [COMPOSITIONS.md](COMPOSITIONS.md) |
| Understand an unresolved library limitation | Linked entry in [OPEN-ISSUES.md](OPEN-ISSUES.md) |

Designers can start with the exercise; the agent reads the technical references it needs. The older long-form documents and archived screens are historical evidence, not onboarding prerequisites.
