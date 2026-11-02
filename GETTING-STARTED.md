# Set up Codex and Figma

Start here if this is your first time using the Tebra design system with **Codex in the desktop app**. At the end, Codex will have the building guidance, you will have your own Figma Design file, and that file will have the published Tebra library available.

The setup is separate from the [first rebuild exercise](FIRST-RUN.md). You can complete setup now; the supplied practice card and verified reference rebuild are still being prepared. Instructions checked against official documentation on November 2, 2026; a new-designer walkthrough has not yet validated them end to end.

## Before you begin

Have these accounts and tools available. If access is missing, ask Daniel or your workspace administrator for the specific item.

| You need | Why |
|---|---|
| The desktop app with Codex, signed into your work account | Runs the design agent against your local project. [Official installation guidance](https://learn.chatgpt.com/docs/app). |
| Access to the [design-system GitHub repository](https://github.com/danielcole-tebra/design-system) | Supplies the building rules, composition references, and evidence helpers. Open the link while signed into GitHub to check access. |
| GitHub Desktop, or Git available to Codex | Downloads the repository and keeps it current. GitHub Desktop provides a visual clone flow. |
| Node.js available to Codex | Runs the repository's builder helpers. Use your approved installation process or the [Node.js download page](https://nodejs.org/en/download). |
| Your work Figma account with edit access to a destination file | Allows you and the connected agent to build editable designs. |
| View access to [Design System Rebuild](https://www.figma.com/design/YX2n4YLrEpBXNbcc73T6dw) and access to its published library | Provides Tebra components, styles, and variables. |
| The approved Tebra fonts | The recorded library uses Akkurat LL. Get the team's licensed font package or organization font access from Daniel; font loading must also work for the agent. |

The full builder workflow also references source code in the [web-app-v2 repository](https://github.com/kareo-engineering/web-app-v2). If you have access, clone it beside design-system as described below. If you do not, report that during the setup check: Codex can read the guidance, but must identify source-code checks it cannot complete.

This repository is guidance and evidence. Enabling the Figma library and connecting Codex to Figma are separate steps; cloning the repository does neither automatically.

## 1. Download the repository

Cloning creates a local copy that stays connected to GitHub. Keep one working copy of each repository on your computer.

Using **GitHub Desktop**:

1. Sign in with the account that can access the repository.
2. Choose **File → Clone Repository**, then the **URL** tab.
3. Enter `https://github.com/danielcole-tebra/design-system.git`.
4. Choose a local folder you can find again, such as a `Code` folder in your home directory, and click **Clone**.
5. Open the resulting `design-system` folder. You should see `AGENTS.md`, `LIBRARY.md`, `COMPOSITIONS.md`, `OPEN-ISSUES.md`, and this guide.

These menu steps follow [GitHub's cloning instructions](https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop). If you already have a clone, update that copy instead of making another one. If GitHub reports that the repository cannot be found, check your signed-in account and access with Daniel.

For source-code access, repeat the clone flow with `https://github.com/kareo-engineering/web-app-v2.git`. Put both folders under the same parent:

```text
Code/
  design-system/
    AGENTS.md
    GETTING-STARTED.md
    FIRST-RUN.md
  web-app-v2/
    packages/
      design-system/
```

Cloning the code repository provides files to inspect. This Figma exercise does not require starting the web app or installing its application dependencies.

If you prefer to ask Codex to clone, first give a local Codex chat access to the parent folder and specify the destination:

```text
Clone https://github.com/danielcole-tebra/design-system.git into a
design-system folder inside this project's local folder. If it already
exists, inspect and reuse it. Report the resulting absolute path.
```

Complete any GitHub sign-in through the normal authentication window. After cloning, make the cloned folder the project root in the next step; a GitHub URL in chat alone does not give Codex a local checkout.

**Checkpoint:** The folder exists on your computer and contains the four builder guidance files. Note its location for the next step.

## 2. Create your local Codex project

1. Open the desktop app and select **Codex**.
2. Create a local project for this work using the app's project/folder flow. Give it a recognizable name, such as **Tebra design system**.
3. In the project's menu, choose **Edit project**, then **Add folder** if needed. Select the cloned `design-system` folder itself.
4. Make `design-system` the **primary** folder. If you cloned `web-app-v2`, attach that folder too, keeping design-system primary.
5. Start a **New chat** in this project for the exercise. Use the local checkout and stay on master, as the repository requires.

The primary folder determines Codex's default working directory and automatic discovery of `AGENTS.md`. A project containing only uploaded files does not provide access to your local checkout. Exact project-creation entry labels can vary by desktop version; **Edit project → Add folder → Make primary** is the documented folder configuration. See [OpenAI's projects documentation](https://learn.chatgpt.com/docs/projects).

Send this first message:

```text
Read AGENTS.md in this project's primary folder. Confirm the repository
path, branch, remote, and whether there are local changes. Check that
Git and Node.js are available, and run the read-only LIBRARY.md index
helper. Check whether the sibling web-app-v2/packages/design-system
source is accessible. Summarize missing setup items. Do not build in
Figma or change repository files yet.
```

**Checkpoint:** Codex can read the actual files and run the helper. It should identify any missing code access rather than treating the written reference as a fresh code audit. If Git or Node.js cannot be found, install/configure it through your approved process, restart the app if necessary, and repeat this check.

## 3. Connect Figma to Codex

1. Open **Plugins** in the desktop app.
2. Find **Figma**, choose its install control, then **Install Figma**.
3. Complete the Figma sign-in and **Allow access** flow with the work account that has access to the Tebra library and your files.
4. Return to Codex and confirm the Figma connection is available. Start a new chat in the same local project if the installed tools have not appeared.

Use the official Figma plugin for this walkthrough. Figma recommends this installation path for Codex; the plugin supplies the integration and workflow skills. See [Figma's Codex setup steps](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/#codex) and [OpenAI's plugin documentation](https://learn.chatgpt.com/docs/plugins).

Ask Codex: **“Which Figma skills and tools are available here? Can you inspect a file, create editable Figma nodes, import published components and variables, and capture screenshots?”** Reading a design or generating code is not enough for this exercise; editing the Figma canvas must be available. This checks available capabilities, not successful execution of a write. [Figma documents how to check installed skills](https://help.figma.com/hc/en-us/articles/39287396773399-Use-skills-with-the-Figma-MCP-server).

**Checkpoint:** Codex reports the relevant skills and read/write/screenshot capabilities. If only reading is available, resolve the connection or workspace restriction before the rebuild. Signing into the Figma website alone does not establish the Codex connection.

## 4. Create your destination Figma file

1. In Figma, sign into the same work account used for the connection.
2. Create a **Figma Design** file. You can use [Create a new design file](https://figma.new) and then move it into your team's designated practice folder, or create it directly in that folder. Follow your team's file-location convention.
3. Rename it **Tebra first rebuild · Your name**.
4. Create a page called **First rebuild**. Keep the file editable by you, and share it with Daniel for review using the team's normal access settings.
5. Copy the file link from **Share** and keep it for the setup check and exercise prompt.

Figma distinguishes Design files from its other file types; this exercise needs editable Design layers. See [Figma's file-creation instructions](https://help.figma.com/hc/en-us/articles/360038511153-Create-a-new-file).

**Checkpoint:** You can open and edit your own named file, and Daniel can access it for review. This new file is the exercise destination; the library file is the source of components. The shared Proposals file is not the default destination for new participants.

## 5. Add the Tebra rebuild library

In **your new file**:

1. Open **Assets** in the left sidebar.
2. Open **Libraries**. The icon may instead show a tooltip about library updates.
3. Search for **Design System Rebuild**. Confirm its source is [this library file](https://www.figma.com/design/YX2n4YLrEpBXNbcc73T6dw), especially if names are duplicated.
4. Open the library's details and choose **Add to file**. If already enabled by your team, leave it enabled.
5. Close the dialog and confirm you can browse the library's assets, such as Button and Text field. Styles and variables are accessed through their respective property pickers.

A library must be published, and you need view access to its source plus edit access to your destination. Availability also depends on the team's Figma plan. See [Figma's library setup instructions](https://help.figma.com/hc/en-us/articles/1500008731201-Add-or-remove-a-library-from-a-design-file).

**Checkpoint:** The correct published library is available in your file. If it is missing, verify your account and source-file access, then ask Daniel to check publication and library availability. Opening or duplicating the library file does not replace adding the published library to your destination. The deprecated Tebra Working UI Kit is not the source for this exercise.

## 6. Check the setup with Codex

Paste this into the project chat, replacing the destination placeholder:

```text
Check my Tebra Figma setup before building.
Destination: [paste my new Figma Design file link]
Source library: https://www.figma.com/design/YX2n4YLrEpBXNbcc73T6dw

Read AGENTS.md. Inspect the destination and available published library
assets without changing either file. Confirm the exact file identities,
available editing/screenshot capabilities, and required component,
style, and variable discovery. Report available font evidence and
anything that still requires an actual import or render to verify.
Do not claim that permissions, imports, fonts, or screenshots have been
tested if you have only listed the available tools. Report missing
access and next steps. Keep the source library unchanged.
```

**Checkpoint:** Codex identifies your destination and the correct library and gives a specific result for each check. Actual import, font loading, editability, and screenshot display are verified during the first build. The repository requires any inspection instances created then to be retained in a named inspection area.

## 7. Bring in the practice card

**Pending asset:** The exercise owner must add the starter-card link and screenshot to [FIRST-RUN.md](FIRST-RUN.md). Until then, your setup can be checked, but the guided rebuild cannot be completed.

Once supplied, copy the entire editable starter card into the **First rebuild** page of your own file. Keep its text, shapes, and manual positioning intact. Label it **Original · Practice card** and retain it for comparison. Select that card and copy a link to the selection so Codex can inspect the exact source node. Use that selection link as **Starter card** and your file link as **Destination** in the exercise request.

**Checkpoint:** The starter is editable layers in your destination, its node-specific link opens the correct card, and the original remains available beside the rebuilt outputs. A pasted screenshot alone is a different input and does not meet this editable-starter exercise.

## Ready for the first rebuild

- [ ] Codex is working in the local design-system project and can read AGENTS.md.
- [ ] Git, Node.js, and the builder read helper work; source-code access is confirmed or explicitly recorded as missing.
- [ ] The Figma plugin is connected to the intended account and exposes the required capabilities.
- [ ] Your own Figma Design file is editable and shared for review.
- [ ] Design System Rebuild is enabled in that file.
- [ ] Font availability is checked as far as possible; loading will be verified during the build.
- [ ] The supplied manual starter has been copied into the file and has a node-specific link.

Continue with [Your first rebuild](FIRST-RUN.md). It contains the request, Empty/Filled requirements, and the checklist of verified changes.

## Returning later and recording work

Reuse this checkout and local project. Before a new batch, ask Codex to inspect local changes and pull the latest guidance; existing changes or conflicts must be handled without discarding work. Figma library publishing and accepting updates are separate manual actions, and Codex still checks the capabilities present in your file.

The current repository workflow records evidence, commits individually named batch files, and pushes to master. A successful clone proves read access, not push access. Confirm the pilot's repository write access with Daniel before a recorded build; if pushing is unavailable, the agent must retain the evidence and report the batch as not fully recorded. Do not silently fork, change branches, or omit the required record to work around missing access.

Daniel's review remains required before the next Figma build batch. The pilot still needs to settle wider reviewer ownership and participant access before independent rollout. These setup instructions do not change those repository rules.
