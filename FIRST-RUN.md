# Your first rebuild

Turn a manually built contact-details card into an editable Tebra design-system composition. This exercise is for designers who want to bring existing Figma work onto the library, as well as start new projects.

**Draft for review — November 2, 2026.** The guide reflects the agreed exercise. The supplied starter Figma card, its screenshot, and a verified reference rebuild still need to be created. There is no starter link yet, and the exercise is not ready for a participant pilot. The earlier patient-search example is superseded as the onboarding exercise; its evidence remains in repository history.

## What you will make

An **Edit contact details** card that lets a practice update how it contacts a patient. You will rebuild a supplied practice card into two visual states: **Empty** and **Filled**.

The card includes a heading, a short description, first name, last name, email and phone fields, a preferred contact method dropdown, a reminder checkbox, and Cancel and Save changes buttons. Practice content is fictional.

The starter will be an editable Figma card made from ordinary text, rectangles, and manually positioned groups. It will deliberately have no auto layout or library instances and will be labeled as a practice example. A screenshot will accompany it. It should look plausible, so the exercise demonstrates conversion of existing design work rather than correction of an obviously broken mockup.

Your output will show the untouched original alongside the two rebuilt states. Empty fields and unselected controls demonstrate the initial state; filled fields and selected controls demonstrate the completed form. These are visual states, not working form submission or persistence. The intended product actions are to discard edits with Cancel and save contact details with Save changes; neither outcome is implemented by this exercise alone.

## 1. Get ready

Open this repository as your agent's project. Your client needs a Figma connection that can inspect components, create editable nodes, and capture images. Connection and permission screens differ between clients.

| Resource | What you need |
|---|---|
| [Design System Rebuild](https://www.figma.com/design/YX2n4YLrEpBXNbcc73T6dw) | Access to the published Tebra library. |
| [Proposals](https://www.figma.com/design/zKT34LQogNjz3Z07fY4VQB) | Edit access for your new practice section. |
| Supplied starter card | Pending creation. The exercise owner will add a node-specific link and reference screenshot here. |
| Fonts | The library's required fonts must load. |

Ask the agent to check repository access, its Figma connection, and access to both files. The build must also verify the actual component properties, tokens, and fonts available in the consuming file.

During the pilot, Daniel remains the reviewer required by the current builder rules. You can inspect the result yourself, but the agent pauses for Daniel's read before another build batch. Wider rollout review ownership remains unresolved.

## 2. Request the rebuild

Once the starter is supplied, open it and include its node-specific link with this request:

```text
Use AGENTS.md and FIRST-RUN.md in this repository to rebuild the supplied
Edit contact details practice card using the Tebra design system.

Starter card: [paste the supplied card's Figma link]
Destination: https://www.figma.com/design/zKT34LQogNjz3Z07fY4VQB

Create a new, uniquely named “First run · Contact details” section.
Preserve the source card and all existing work. Inspect its actual
layers, content, and dimensions. Break it into a header, field groups,
controls, and actions; use the screenshot as a visual reference.

State the target widths, Empty and Filled states, and intended action
outcomes before assembly. Reuse supported library instances, bound
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
the batch using the repository workflow and stop for Daniel's read
before another build batch.
```

You should not need to supply internal component IDs or run builder scripts. The agent handles discovery, assembly, verification, and evidence. The starter link identifies the source to rebuild; it does not authorize editing that source.

## 3. Review what changed

Compare your rebuild with the original, then inspect its layers in Figma. The agent returns this checklist with each verified change checked off. Unverified items stay unchecked and get an explanation.

- [ ] **Layout:** The card, field groups, and button row use auto layout with defined padding, spacing, and alignment.
- [ ] **Components:** Hand-built fields, dropdown, checkbox, and buttons have been replaced with supported Tebra library instances.
- [ ] **Typography:** Headings, labels, and supporting text use library text styles.
- [ ] **Colors and spacing:** Supported values are bound to design-system tokens; exceptions are listed.
- [ ] **Resizing:** The card has been checked at the stated target widths, with no overlapping or clipped content. The report names the widths actually tested.
- [ ] **States:** Empty and Filled versions are included, with consistent structure and component usage.
- [ ] **Content:** Original labels, information, and intended actions are preserved; any changes are explained.
- [ ] **Editability:** The result remains editable, and library instances retain their component connections.
- [ ] **Original preserved:** The supplied practice card remains intact, with an intact comparison copy beside the rebuilt versions if a separate section is used.
- [ ] **Visual review:** Screenshots of the rebuild were inspected and shown in chat.

**Exceptions and unfinished work:** List every unsupported feature, workaround, or unverified item. Distinguish visual states, stored prototype wiring, and interactions actually played through.

“Uses auto layout” describes the authored layout containers; it does not require changing library internals or putting auto layout on every leaf node. A screenshot alone cannot prove instance relationships or token bindings: those require inspection of the Figma document.

Select a rebuilt field or button and inspect its instance relationship. Try a content change on your own output and observe how the layout responds. Keep library instances attached. You should be able to explain both what changed and what the exercise does not implement.

## If something gets in the way

| What you see | Next step |
|---|---|
| The starter link is missing | The exercise is not ready to run. The exercise owner must supply the practice asset first. |
| The agent cannot read the guide | Open the repository as its project and check workspace access. |
| Figma cannot be reached or edited | Check the connection and access to the source library and destination. |
| Components, properties, tokens, or fonts are unavailable | Have the agent report the specific mismatch. Publishing and accepting library updates are manual. |
| A screenshot was saved but no image appeared | Ask for the image to be opened and displayed; record whether inline display or only a link worked. |
| The Figma result is a flat image | The editability requirement was not met. |
| Save or Cancel does nothing | Expected for this static exercise; working interactions require a separate prototype task. |

## 4. Tell us how the first run went

After your attempt, send Daniel a short note through your normal team channel: which client you used, a link to your result, whether the image appeared in chat, where you needed help, rough time to a reviewable result, and which existing project you would try next. The agent may draft the note; this guide does not authorize it to send messages.

For the pilot, observe a few designers attempting the same supplied exercise. Record setup failures, missing images, assistance, completion, and later use on a real project. A successful reference build is not evidence that onboarding works without help.

For your next task, supply an existing section or describe a new one. Identify the destination, target widths, content, states, and action outcomes. The same library verification and visual review loop applies.

## Preparation before the pilot

The exercise owner still needs to supply the manual starter card and its screenshot, settle its exact fictional copy and target widths, and build and verify the reference Empty and Filled versions. Those assets establish a concrete expected result. Current documentation is a reviewable exercise brief, not a claim those assets exist.

[AGENTS.md](AGENTS.md), [LIBRARY.md](LIBRARY.md), [COMPOSITIONS.md](COMPOSITIONS.md), and [OPEN-ISSUES.md](OPEN-ISSUES.md) remain the authoritative builder guidance. This guide does not change component or composition rulings.
