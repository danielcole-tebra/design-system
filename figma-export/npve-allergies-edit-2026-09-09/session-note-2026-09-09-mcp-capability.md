# Session note — MCP capability boundary (2026-09-09, evening)

Record context: npveRebuild_allergiesEdit_2026-09-09 (IN PROGRESS, commit ef2952f). Steps 1-3 of the
resumeProcedure are complete (validator PASS, batch guard PASS, target identity verified live twice).
Nothing in Figma has been mutated; the batch folder was empty at resumption. This note records the
verified Figma tooling state so the write-capable session (resumeProcedure steps 4-8) starts informed.

## Verified findings (probed 2026-09-09)

1. **Remote Figma MCP is blocked by Figma's client allowlist, not by configuration.**
   - `POST https://api.figma.com/v1/oauth/mcp/register` (dynamic client registration) returns
     `403 application/json "Forbidden"` for a fully spec-compliant neutral client — before any
     user-facing OAuth screen. Identical for a VS Code-style redirect and a Cline-style redirect.
   - The `/mcp` endpoint itself is healthy (405 on GET, 401 text/plain on unauthenticated initialize).
   - Matches cline/cline discussion #10136 (same error string; reporter confirms Copilot and Claude
     Code connect to the same endpoint; no fix in thread, open since 2026-04).
   - The official MCP Catalog (figma.com/mcp-catalog) lists 22 approved clients (Claude, Claude Code,
     ChatGPT, Codex, Cursor, VS Code, Xcode, Kiro, Grok, Copilot CLI, Devin, Warp, Factory, Augment,
     Replit, Zed, ...). Cline is not listed. Admission = Figma-side review via the account team.
   - Consequence: no client-side fix exists. Tools use_figma / upload_assets / download_assets remain
     UNVERIFIED until authenticated tool discovery succeeds. Do not claim them available.

2. **The desktop endpoint (http://127.0.0.1:3845/mcp, "Figma MCP") is working and preserved.**
   - Returns 10 tools: get_design_context, get_metadata, get_screenshot, get_variable_defs,
     get_motion_context, get_figjam, get_code_connect_map, add_code_connect_map,
     get_code_connect_suggestions, send_code_connect_mappings.
   - Read + Code Connect only; none of these writes canvas content. Step 4's frozen 2x export
     (download_assets) is remote-only per Figma's tool table and is not available here.

3. **What the desktop CAN do for the next session:** identity verification, source/target reads,
   screenshots, variable reads — every read-only part of the loop. It cannot execute steps 4-8.

## Paths to unblock the build

- A. Run steps 4-8 in an approved catalog client (VS Code remote MCP, Claude Code, or Codex) with a
   Figma login that can write to fdCQVFdvOByaOYIJYag0d6 — the record already permits any
   write-capable MCP session; paste the builder's full reply back per OPERATORS.md.
- B. Enterprise route: request Cline's addition to the Figma MCP Catalog through the account team
   (the #10136 pointer); longer path, fixes it for good.

## Tooling state on this machine

- cline_mcp_settings.json (C:\Users\coled\.cline\data\settings\): "Figma MCP" (desktop, working,
  untouched) + "figma-remote" (https://mcp.figma.com/mcp, streamableHttp — inert until Figma approves
  the client). Backup: cline_mcp_settings.json.backup-before-figma-remote.
- A prior wipe (2026-09-09 ~10:52 local) emptied MCP settings and task histories; this note supersedes
  the record's "settings wipe" wording only in that the store files were recovered (record committed
  at ef2952f) and the desktop server was re-established by the operator.
