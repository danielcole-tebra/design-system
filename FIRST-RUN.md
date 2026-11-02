# Your first rebuild

Turn a supplied contact-details **image** into an editable Tebra design-system composition using Codex. This exercise introduces rebuilding an existing design from a visual reference; the same approach can later use existing Figma layers as input.

**New here? Start with [Set up Codex and Figma](GETTING-STARTED.md).** It covers downloading the repository, creating a local Codex project, connecting Figma, creating your own file, and adding the published rebuild library.

**Draft for review — November 2, 2026.** The starter image is supplied in FigJam card 7 and [as a PNG](assets/onboarding/contact-details-starter.png). A verified reference rebuild and a new-designer walkthrough still need to be completed before the participant pilot. This image-based exercise supersedes the earlier editable-starter plan and patient-search example.

## What you will make

An **Edit contact details** card that lets a practice update how it contacts a patient. You will rebuild a supplied practice card into two visual states: **Empty** and **Filled**.

The card includes a heading, a short description, first name, last name, email and phone fields, a preferred contact method dropdown, a reminder checkbox, and Cancel and Save changes buttons. Practice content is fictional.

The starter is one flat, generated image labeled **Practice starter · Fictional data**. It contains no editable fields, auto layout or library instances. It is a generic practice reference, not a screenshot of a shipping Tebra screen. The rebuilt cards must contain editable library instances and text; placing the image in Figma alone does not complete the exercise.

The Filled state uses **Alex Morgan**, **alex.morgan@example.com**, **(202) 555-0148**, **Email** as the contact method, and a checked **Send appointment reminders** checkbox. The Empty state clears the fields, leaves the contact method unselected and the checkbox unchecked. Preserve the title, description, labels and actions. The instructional label outside the card is not part of the rebuild. Check both states at **640 px and 400 px card widths**, adapting the layout using supported library patterns.

Your output will show the untouched original alongside the two rebuilt states. Empty fields and unselected controls demonstrate the initial state; filled fields and selected controls demonstrate the completed form. These are visual states, not working form submission or persistence. The intended product actions are to discard edits with Cancel and save contact details with Save changes; neither outcome is implemented by this exercise alone.

## 1. Get ready

Complete [Set up Codex and Figma](GETTING-STARTED.md), then start a chat in your own local work project, with the separate design-system folder attached. Use your own practice file as the destination.

| Resource | What you need |
|---|---|
| [Design System Rebuild](https://www.figma.com/design/YX2n4YLrEpBXNbcc73T6dw) | Access to the published Tebra library. |
| Your new Figma Design file | Edit access. Adding the rebuild library manually is recommended for browsing; Codex can import accessible published components through the connection. Keep the file link. Sharing for feedback in #uxhotline or with Daniel Cole is optional. |
| Supplied starter image | Copy the image in [FigJam card 7](https://www.figma.com/board/uKNQ26ndMmK3c58oIaaBdh?node-id=5-79), or use the [PNG](assets/onboarding/contact-details-starter.png). Paste it into your First rebuild page and copy a link to that selected image. |
| Fonts | The library's required fonts must load. |

Ask the agent to check repository access, its Figma connection, and access to both files. The build must also verify the actual component properties, tokens, and fonts available in the consuming file.

During the pilot, Daniel remains the reviewer required by the current builder rules. You can inspect the result yourself, but the agent pauses for Daniel's read before another build batch. Wider rollout review ownership remains unresolved.

## 2. Request the rebuild

Select only the starter image in FigJam card 7, copy it, and paste it into the **First rebuild** page of your own Design file. Rename it **Original · Practice image**. Copy a link to that selected image. Use it and your destination file link below. The same full prompt is included directly in FigJam card 7.

```text
Read AGENTS.md and FIRST-RUN.md in the separately attached design-system
folder. Use its Figma build and verification rules to rebuild the supplied
Edit contact details practice card. My primary folder holds my project
work; keep project files and screenshots there.

Starter image: [paste the link to the image in my Figma file]
Destination: [paste my new Figma Design file link]

Create a new, uniquely named “First run · Contact details” section.
Preserve the original image and all existing work. Inspect the image's
visible content; it has no editable fields or original component metadata.
Break the reference into a header, fields, controls and actions. Rebuild
these as editable nodes, not as an image fill or traced whole-screen graphic.

Build Empty and Filled states and check both at 640 and 400 px card widths.
Filled uses the image's fictional values and checked reminder checkbox.
Empty clears the fields, contact selection and checkbox. Preserve the
title, description, labels and buttons; omit the outside-card practice label.
State intended action outcomes before assembly. Reuse library instances, bound
tokens, text styles, and auto-layout compositions. Preserve published
component internals and keep the source library unchanged.

Keep the original content and intent. Report unsupported capabilities
or conflicting evidence, and ask Daniel about unresolved design choices.
These are static states; do not claim working submission or persistence.

Capture, open, and visually inspect the rebuilt section and any needed
detail crops. Display the actual screenshots in this chat and link to
my editable Figma section. If inline display fails, report that and
provide an accessible image link.

Return the “What changed” checklist from FIRST-RUN.md, checking only
verified items. List exceptions and unfinished work separately. Record
the batch using the pilot's agreed evidence repository and report any
unresolved recording setup. Stop for Daniel's read
before another build batch.
```

You should not need to supply internal component IDs or run builder scripts. The agent handles discovery, assembly, verification, and evidence. The starter link identifies the preserved image. If the agent cannot inspect it, attach the PNG to the chat as well. Image pixels do not establish original tokens, component properties or interactions; the agent must inspect the published library for those.

## 3. Review what changed

Compare your rebuild with the original, then inspect its layers in Figma. The agent returns this checklist with each verified change checked off. Unverified items stay unchecked and get an explanation.

- [ ] **Layout:** The card, field groups, and button row use auto layout with defined padding, spacing, and alignment.
- [ ] **Components:** Fields, dropdown, checkbox and buttons depicted in the image are now supported Tebra library instances.
- [ ] **Typography:** Headings, labels, and supporting text use library text styles.
- [ ] **Colors and spacing:** Supported values are bound to design-system tokens; exceptions are listed.
- [ ] **Resizing:** The card has been checked at the stated target widths, with no overlapping or clipped content. The report names the widths actually tested.
- [ ] **States:** Empty and Filled versions are included, with consistent structure and component usage.
- [ ] **Content:** Original labels, information, and intended actions are preserved; any changes are explained.
- [ ] **Editability:** The result remains editable, and library instances retain their component connections.
- [ ] **Original preserved:** The supplied practice image remains intact, with an intact comparison copy beside the rebuilt versions if a separate section is used.
- [ ] **Visual review:** Screenshots of the rebuild were inspected and shown in chat.

**Exceptions and unfinished work:** List every unsupported feature, workaround, or unverified item. Distinguish visual states, stored prototype wiring, and interactions actually played through.

“Uses auto layout” describes the authored layout containers; it does not require changing library internals or putting auto layout on every leaf node. A screenshot alone cannot prove instance relationships or token bindings: those require inspection of the Figma document.

Select a rebuilt field or button and inspect its instance relationship. Try a content change on your own output and observe how the layout responds. Keep library instances attached. You should be able to explain both what changed and what the exercise does not implement.

## If something gets in the way

| What you see | Next step |
|---|---|
| Copying the starter image does not work | Download the PNG linked above and place it in your Design file. Select it and copy its selection link; attach the PNG to Codex if needed. |
| The agent cannot read the guide | Open the repository as its project and check workspace access. |
| Figma cannot be reached or edited | Check the connection and access to the source library and your new destination file; see [setup](GETTING-STARTED.md). |
| Components, properties, tokens, or fonts are unavailable | Have the agent report the specific mismatch. Publishing and accepting library updates are manual. |
| A screenshot was saved but no image appeared | Ask for the image to be opened and displayed; record whether inline display or only a link worked. |
| The rebuilt result is a flat image | The editability requirement was not met. Only the preserved original should remain a flat image. |
| Save or Cancel does nothing | Expected for this static exercise; working interactions require a separate prototype task. |

## 4. Tell us how the first run went

If you'd like feedback after your attempt, optionally post in #uxhotline or share with Daniel Cole. Useful context includes which client you used, a link to your result, whether the image appeared in chat, where you needed help, rough time to a reviewable result, and which existing project you would try next. The agent may draft the note; this guide does not authorize it to send messages.

For the pilot, observe a few designers attempting the same supplied exercise. Record setup failures, missing images, assistance, completion, and later use on a real project. A successful reference build is not evidence that onboarding works without help.

For your next task, supply an existing section or describe a new one. Identify the destination, target widths, content, states, and action outcomes. The same library verification and visual review loop applies.

## Preparation before the pilot

The starter image, fictional copy and target widths are now supplied. The exercise owner still needs to build and verify reference Empty and Filled versions and observe a designer completing the copy/paste and rebuild flow. The generated starter is an input, not a verified example of the final library-based result.

[AGENTS.md](AGENTS.md), [LIBRARY.md](LIBRARY.md), [COMPOSITIONS.md](COMPOSITIONS.md), and [OPEN-ISSUES.md](OPEN-ISSUES.md) remain the authoritative builder guidance. This guide does not change component or composition rulings.
