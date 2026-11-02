# Your first rebuild

Turn a supplied contact-details **image** into an editable Tebra design-system composition using Codex. This exercise introduces rebuilding an existing design from a visual reference; the same approach can later use existing Figma layers as input.

**New here? Start with [Set up Codex and Figma](GETTING-STARTED.md).** It covers downloading the repository, creating a local Codex project, connecting Figma, creating your own file, and adding the published rebuild library.

**Draft for review — November 2, 2026.** The starter image is supplied in FigJam card 6 and [as a PNG](assets/onboarding/contact-details-starter.png). A [reference test build](https://www.figma.com/design/dZqYSxEj3scbmRP4IqJGLh?node-id=3-1630) now contains editable Empty and Filled versions at 640 and 400 px, with inspected screenshots and structural evidence. Daniel reviewed the result on November 2, 2026; a new-designer walkthrough remains before the participant pilot. This image-based exercise supersedes the earlier editable-starter plan and patient-search example.

## What you will make

An **Edit contact details** card that lets a practice update how it contacts a patient. You will rebuild a supplied practice card into two visual states: **Empty** and **Filled**.

The card includes a heading, a short description, first name, last name, email and phone fields, a preferred contact method dropdown, a reminder checkbox, and Cancel and Save changes buttons. Practice content is fictional.

The starter is one flat, generated image labeled **Practice starter · Fictional data**. It contains no editable fields, auto layout or library instances. It is a generic practice reference, not a screenshot of a shipping Tebra screen. The rebuilt cards must contain editable library instances and text; placing the image in Figma alone does not complete the exercise.

The Filled state uses **Alex Morgan**, **alex.morgan@example.com**, **(202) 555-0148**, **Email** as the contact method, and a checked **Send appointment reminders** checkbox. The Empty state clears the fields, leaves the contact method unselected and the checkbox unchecked. Preserve the title, description, labels and actions. The instructional label outside the card is not part of the rebuild. Check both states at **640 px and 400 px card widths**, adapting the layout using supported library patterns.

Your output will show the untouched original alongside the two rebuilt states. Empty fields and unselected controls demonstrate the initial state; filled fields and selected controls demonstrate the completed form. These are visual states, not working form submission or persistence. The intended product actions are to discard edits with Cancel and save contact details with Save changes; neither outcome is implemented by this exercise alone.

## 1. Get ready

Complete steps 1–5 of [Set up Codex and Figma](GETTING-STARTED.md), then continue in your own local work project, with the separate design-system folder attached. Use your own practice file as the destination.

| Resource | What you need |
|---|---|
| [Design System Rebuild](https://www.figma.com/design/YX2n4YLrEpBXNbcc73T6dw) | Access to the published Tebra library. |
| Your new Figma Design file | Edit access. Adding the rebuild library manually is recommended for browsing; Codex can import accessible published components through the connection. Keep the file link. Sharing for feedback in #uxhotline or with Daniel Cole is optional. |
| Supplied starter image | Copy the image in [FigJam card 6](https://www.figma.com/board/uKNQ26ndMmK3c58oIaaBdh?node-id=5-79), or use the [PNG](assets/onboarding/contact-details-starter.png). Paste it into your First rebuild page and copy a link to that selected image. |
| Fonts | The library's required fonts must load. |

Ask the agent to check repository access, its Figma connection, and access to both files. The build must also verify the actual component properties, tokens, and fonts available in the consuming file.

During the pilot, Daniel remains the reviewer required by the current builder rules. You can inspect the result yourself, but the agent pauses for Daniel's read before another build batch. Wider rollout review ownership remains unresolved.

## 2. Request the rebuild

Select only the starter image in FigJam card 6, copy it, and paste it into the **First rebuild** page of your own Design file. Rename it **Original · Practice image**. Copy a link to that selected image. Use it and your destination file link below. The same full prompt is included directly in FigJam card 6.

```text
Read AGENTS.md and FIRST-RUN.md from the attached design-system folder. Follow its build and verification rules. Keep project files and screenshots in my primary work folder.

Starter image: [paste the link to the image in my Figma file]
Destination: [paste my new Figma Design file link]

Inspect the image and rebuild its Edit contact details card in a new, uniquely named “First run · Contact details” section. Preserve the original image and all existing work. Assemble the header, fields, controls and actions as editable library instances and layout frames, using supported properties, bound tokens, library typography and auto layout. Keep published component internals and the source library unchanged.

Build Empty and Filled states, each at 640 and 400 px card widths. Filled uses the image’s fictional values and checked reminder checkbox. Empty clears the fields, contact selection and checkbox. Preserve the title, description, labels and actions; omit the outside-card practice label. State intended action outcomes before assembly. These are static states, not working submission or persistence.

Verify the actual instances, typography, tokens, content and resizing. Report limitations and ask Daniel about unresolved design choices. Capture and inspect the result, display the screenshots in this chat, and link to my editable section. If inline display fails, report it and provide an accessible image link.

Return the “What changed” checklist from FIRST-RUN.md, checking only verified items and listing exceptions separately. Record the batch in the pilot’s agreed evidence repository; report unresolved recording setup. Stop for Daniel’s read before another build batch.
```

You should not need to supply internal component IDs or run builder scripts. The agent handles discovery, assembly, verification, and evidence. The starter link identifies the preserved image. If the agent cannot inspect it, attach the PNG to the chat as well. Image pixels do not establish original tokens, component properties or interactions; the agent must inspect the published library for those.

## 3. Review what changed

See the [tested reference result](https://www.figma.com/design/dZqYSxEj3scbmRP4IqJGLh?node-id=3-1630), its [screenshot](runs/2026-11-02-starter-rebuild-test/final-review.png), and [verification report](runs/2026-11-02-starter-rebuild-test/REPORT.md). The test uses a local reusable form composition because the published Card has no arbitrary form-content slot. Headings/supporting copy use library text styles; the controls preserve their published typography bindings, which do not all have text-style IDs. The image's blue button and separate labels become the library's filled coral action and floating-label fields. These are explained standardization changes, not a pixel-for-pixel reproduction.

Compare your rebuild with the original, then inspect its layers in Figma. The agent returns this checklist with each verified change checked off. Unverified items stay unchecked and get an explanation.

- [ ] **Layout:** The card, field groups, and button row use auto layout with defined padding, spacing, and alignment.
- [ ] **Components:** Fields, dropdown, checkbox and buttons depicted in the image are now supported Tebra library instances.
- [ ] **Typography:** Headings and supporting copy use library text styles; controls retain their published typography bindings.
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
| The agent cannot read the guide | Keep your work folder primary; attach design-system as a reference and explicitly ask Codex to read its AGENTS.md. |
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

The starter image, fictional copy, target widths and technically verified reference build are supplied. Daniel reviewed the result on November 2, 2026. The exercise owner still needs to observe a designer completing the copy/paste and rebuild flow. The MCP test uploaded the existing PNG; it did not play through the designer's clipboard steps. The generated starter is an input, not the final library-based result.

[AGENTS.md](AGENTS.md), [LIBRARY.md](LIBRARY.md), [COMPOSITIONS.md](COMPOSITIONS.md), and [OPEN-ISSUES.md](OPEN-ISSUES.md) remain the authoritative builder guidance. This guide does not change component or composition rulings.
