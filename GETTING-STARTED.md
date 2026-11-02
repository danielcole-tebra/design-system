# Set up Codex and Figma

[Open the FigJam walkthrough](https://www.figma.com/board/uKNQ26ndMmK3c58oIaaBdh?node-id=5-2). Follow its eight cards from top to bottom. All prompts are included where you need them.

You will copy Tebra’s building guidance to your computer, create a separate project for your work, connect Codex to Figma, and rebuild a supplied contact-details image as editable library-based cards.

## Before you begin

You need the desktop app with Codex, your work GitHub and Figma accounts, access to the [design-system repository](https://github.com/danielcole-tebra/design-system), and access to the published [Design System Rebuild library](https://www.figma.com/design/YX2n4YLrEpBXNbcc73T6dw). Ask Daniel or your workspace administrator about missing access.

Codex checks Git and Node.js during setup. If either is missing, follow your approved installation process. The library uses Akkurat LL; use the team’s licensed fonts or organization font access. Actual font loading is tested during the build.

Three things stay separate: the local **design-system folder** supplies guidance, your **work folder** holds project files, and your **Figma Design file** holds the editable designs. Downloading the repository does not connect Figma or add its library.

## 1. Copy the design-system files to your computer

Choose an easy-to-remember location, such as a folder called `Code`. Its name and location are your choice. Codex will save a local copy of the shared guidance in a separate `design-system` folder there. This is called **cloning the repository**. You will create your work folder in step 2.

In Codex, start a local chat with access to your chosen location and send:

```text
Clone https://github.com/danielcole-tebra/design-system.git into a separate design-system folder here. If a checkout already exists, inspect and reuse it without overwriting local work. Read AGENTS.md, check Git and Node.js, and tell me the full folder path and any access problems. Keep my new project work outside this repository.
```

Complete GitHub sign-in if prompted. Codex should identify any missing tools or access before you continue.

**Checkpoint:** Codex gives you the saved folder path, such as `Code/design-system`. Keep it for step 2. The card’s screenshot shows the request before sending; the written checkpoint covers completion.

## 2. Create a separate folder for your work

1. Create a folder beside `design-system` for your work. Name it anything, such as **Patient intake prototype**.
2. In Codex, choose **Choose project → New project**. Use your work folder as the primary folder.
3. Use **Edit project → Add folder** to attach the separate design-system folder as a reference.
4. Start a chat in your new project and send the prompt below. Use this work-project chat for the remaining Codex steps.

```text
My primary folder is for my project work. The separately attached design-system folder contains the shared guidance.

Read its AGENTS.md and use those build and verification rules for this project. Confirm both folder paths. Keep project files and screenshots in my work folder. Run the read-only LIBRARY.md index helper from the design-system checkout. Report missing tools, source-code access and unresolved evidence-recording setup. Do not build in Figma or change repository files yet.
```

These are real folders on your computer:

```text
Code/
  design-system/             Shared guidance from GitHub
  Patient intake prototype/  Your work; primary folder in Codex
```

Your work folder holds project files, notes and screenshots. Your designs stay in Figma. Later, you can ask Codex to publish your work folder as its own GitHub repository. The shared design-system clone already has its own repository connection.

The primary folder determines where chats start. Explicitly reading the reference folder’s AGENTS.md makes its rules available to the agent. See [OpenAI’s projects documentation](https://learn.chatgpt.com/docs/projects).

**Checkpoint:** Codex confirms both folder paths, reads the builder rules and can run the read helper. Resolve missing tools. Source access and evidence-recording questions should be reported explicitly; see the pilot notes below.

## 3. Connect Figma to Codex

1. Open **Settings → Plugins** in Codex.
2. Find **Figma**. Leave it enabled if installed; otherwise install it through **Browse directory**.
3. Complete any sign-in with your work Figma account.
4. Return to your work-project chat. Start a new chat there if the tools have not appeared.

Ask Codex: **“Which Figma tools are available here for inspecting files, editing the canvas, importing library assets and capturing screenshots?”**

**Checkpoint:** The connection uses your intended account and exposes the required capabilities. A toggle or tool list does not prove a successful build; actual execution is checked later. If editing is unavailable, resolve the connection before building.

See [Figma’s Codex setup instructions](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/#codex) and [OpenAI’s plugin documentation](https://learn.chatgpt.com/docs/plugins).

## 4. Create your own Figma file

1. Create a **Figma Design** file in your team’s practice location, using the same work account connected to Codex. [Create a Design file](https://figma.new).
2. Name it **Tebra first rebuild · Your name**.
3. Create a page named **First rebuild**.
4. Copy the file link from **Share**. Keep it for step 6.

**Checkpoint:** You can edit your new file and have its link ready. This is your destination; Design System Rebuild is the source library. Sharing your file for feedback is optional and comes at the end.

## 5. Add the rebuild library (recommended)

In your new file:

1. Open **Assets → Libraries**.
2. Find **Design System Rebuild**. Confirm it is [this source library](https://www.figma.com/design/YX2n4YLrEpBXNbcc73T6dw).
3. Choose **Add to file**. If it appears under **Used in this file**, it is already added.
4. Close the dialog to browse its assets.

This manual step is recommended for browsing and editing in Figma. Codex can import accessible published components without it; library access is still required. The reference test confirmed imports in a fresh file without manually adding the library first.

**Checkpoint:** If added, the library appears under **Used in this file**. If it is missing, check your account and source-file access, then ask Daniel about publication and availability. Codex checks actual imports during the build.

Card 5’s screenshot uses SDE Alpha Prototypes as an example; follow the steps in your own file. See [Figma’s library instructions](https://help.figma.com/hc/en-us/articles/1500008731201-Add-or-remove-a-library-from-a-design-file).

## 6. Check the setup with Codex

In your work-project chat, paste this prompt. Replace the destination placeholder with the file link from step 4, then send it.

```text
Check my Tebra Figma setup before building.
Destination: [paste my new Figma Design file link]
Source library: https://www.figma.com/design/YX2n4YLrEpBXNbcc73T6dw

Read AGENTS.md from the attached design-system folder. Inspect the destination and published library without changing either file. Confirm the exact files, available editing and screenshot tools, and discovery of the components, styles and variables needed for the contact-details exercise in FIRST-RUN.md.

Report font availability, missing access and next steps. Distinguish what you inspected from imports, font loading, editing and screenshot delivery that still need testing during the build. Keep the source library unchanged.
```

**Ready to rebuild?** Continue when Codex has read the guidance, identified your destination and the correct library, and reported the required tools. Resolve missing access or tools first. Keep any unverified build checks visible.

This check is read-only. Actual imports, font loading, editing and screenshot delivery are verified during the first build. Card 6’s screenshot shows an example request; use your own work project and the editable prompt above.

## 7. Copy the image and request a rebuild

1. In [FigJam card 7](https://www.figma.com/board/uKNQ26ndMmK3c58oIaaBdh?node-id=5-79), select **only the starter image** and copy it.
2. Paste it into the **First rebuild** page of your Design file. Rename it **Original · Practice image**. If copying fails, download the [PNG](assets/onboarding/contact-details-starter.png) and place it in the file.
3. Select the pasted image and copy a link to the selection.
4. Paste the full rebuild prompt from card 7 into your work-project chat. Replace **Starter image** with the selection link and **Destination** with your file link. Send it once. The same prompt is in [FIRST-RUN.md](FIRST-RUN.md#2-request-the-rebuild).

The starter is a generated, flat practice image with fictional data. Codex rebuilds its content as editable Empty and Filled cards using the library. Its generic colors and dimensions do not override the design system.

**Checkpoint:** Wait for Empty and Filled cards at 640 and 400 px, screenshots in chat, a Figma section link and a verified what-changed checklist. If Codex identifies a blocker, resolve its specific question before continuing.

## 8. Review your rebuild

1. Open the Figma section Codex links to. Compare the preserved original with Empty and Filled at both widths.
2. Inspect a field or button: it should be an editable library instance. Check spacing, wrapping and content.
3. Review the screenshots and the [what-changed checklist](FIRST-RUN.md#3-review-what-changed). Unverified items stay unchecked, with an explanation.
4. Tell Codex what needs changing. During the pilot, Daniel’s read is required before the next build batch.

Use the [tested reference result](https://www.figma.com/design/dZqYSxEj3scbmRP4IqJGLh?node-id=3-1630) for comparison. The library introduces floating-label fields and a coral save action. The result is a local editable form composition made from library controls. Save, Cancel and the dropdown remain static; this exercise does not implement their behavior.

**Optional feedback:** Post your link to **#uxhotline** or share it with **Daniel Cole**. Mention where you needed help and whether screenshots appeared in chat. The agent may draft feedback; it does not send messages on your behalf without your instruction.

**Done:** You can identify what became editable, what now follows the library, and what remains unimplemented. Codex retains the verification evidence and reports whether the required commit and push succeeded.

## Returning later

Reuse your work project and the separate guidance folder. Before a new batch, ask Codex to inspect local changes and pull the latest guidance without discarding work. Figma library publishing and accepting updates are separate manual actions.

For your next task, supply an existing section or describe a new one. Include its destination, content, widths, states and intended actions. Keep project work in your primary folder.

## Pilot notes for the exercise owner and agent

- The supplied reference build has structural checks and inspected screenshots. Daniel reviewed the result on November 2, 2026. A new-designer trial is still needed: the MCP test uploaded the PNG and did not test the designer’s clipboard flow or fresh-account setup.
- Cards 1–3, 5 and 6 use real supplied screenshots; card 7 contains the generated input image, and card 8 shows the actual reference result. Only the step 4 setup screenshot remains pending. See [the capture list](SCREENSHOT-CAPTURE-LIST.md).
- The full builder workflow references source in [web-app-v2](https://github.com/kareo-engineering/web-app-v2). If a check requires it and access is available, Codex can clone it beside design-system and attach it as another reference. It must report unavailable source checks. This exercise does not require running the web app.
- Agree the pilot’s evidence repository and write access before a recorded build. A successful clone proves read access, not push access. When a work folder is not yet a Git repository, do not silently use the shared design-system repository for personal project files. Retain evidence and report unresolved recording setup.
- The current builder rules require evidence, a LOG entry, a named-path commit and push on master. If pushing is unavailable, report the batch as not fully recorded. Do not silently fork or change branches. Wider reviewer ownership and participant access remain to be settled.
- Setup instructions were checked against official documentation on November 2, 2026. This editorial pass does not claim a new-user usability test. [AGENTS.md](AGENTS.md) remains authoritative.
