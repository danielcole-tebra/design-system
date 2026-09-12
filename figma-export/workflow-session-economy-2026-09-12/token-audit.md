# Token audit — build sessions in C:\Code\design system

Read-only audit, 2026-09-12. No Figma writes, no repo writes, no schema record. Source: the Claude Code transcripts under `~/.claude/projects/C--Code-design-system/`, parsed with scripts kept in this session's scratchpad. Token figures come from the `usage` field of every assistant message, de-duplicated by message id, which is the same source `ccusage` reads. `ccusage` is not installed and `/cost` is not available offline, so no third-party totals are quoted.

Scope note. The five most recent Claude Code sessions by activity end on 2026-09-09. The Patient Summary, Allergies edit, Family History edit and Flowsheets batches on 2026-09-10 and 2026-09-11 ran in Codex (`~/.codex/sessions`, logs of 24 MB to 246 MB) and are outside this audit. The session file `24a9f8bb…` has a 2026-09-08 mtime but its content is from 2026-08-03, so it was excluded in favour of `e7e2148b…` (2026-09-06). The current audit session is excluded.

## 1. Session start

### What the harness injects on every API call

Measured first-call window: 50,476 to 53,747 tokens in the five sessions (about 52k). It is made of the system prompt, the schemas of the loaded tools, the names of 136 deferred tools (9,555 chars: 41 Figma, 29 Gmail, 22 Chrome, 20 Google Drive/Calendar, 22 built-in, 2 Slack), the MCP instructions (3,241 chars), the skills listing (16,257 chars), the agent listing (2,785 chars), and these files:

| File | Bytes |
|---|---|
| CLAUDE.md | 11,126 |
| memory/MEMORY.md (index) | 1,995 |
| git status snapshot | ~600 |

The 12 memory notes total 23,377 bytes and are read on demand; `npve-lean-workflow-state.md` (4,627 bytes) was read at the start of 2 of the 5 sessions.

### What CLAUDE.md tells the agent to read (lean NPVE start)

| File | Bytes | Note |
|---|---|---|
| `node scripts/workflow/validate-workflow.js` output | ~200 | one line |
| workflow/npve-contract.generated.json | 72,982 | folds in rules.json and execution-policy |
| workflow/manifest.json, selected item | ~4,000 | whole file is 79,365 |
| indexes/current-state.json | 1,871 | names the last record per workstream |
| indexes/record-index.json | 60,597 | only needed for older records |
| last record, records/npve/2026-09-11/npveRebuild_flowsheetsFinish_2026-09-11.json | 8,302 | |
| workflow/execution-policy.md | 11,584 | optional, already in the contract |

Minimum lean set (CLAUDE.md, MEMORY.md, contract, manifest item, current-state, last record): **100,276 bytes, about 25k tokens.**

Lean set as it is read in practice (adds execution-policy, the whole manifest, record-index, the memory note, and rules.json 20,934): **273,383 bytes, about 68k tokens.**

The aggregate `design-system-schema.json` is 1,587,910 bytes (about 400k tokens if read whole). It is generated from `records/` (110 files, about 1.09 MB; largest `npveRebuild_enum_2026-09-02.json` 133,504), `foundation/` (14 files, 207,269 bytes), `flags/active.json` 223,509 and `flags/resolved.json` 69,475. Latest record per workstream: npve 8,302, library 7,186 (`libraryThumbIcons_2026-09-10.json`), workflow 2,556 (`workflow_npveRunner_2026-09-11.json`). None of the five sessions read the aggregate in full; every access was a `node -e` projection returning 2k to 20k chars. The legacy set (CLAUDE.md + AGENTS.md + OPERATORS.md + aggregate) would be 1,609,044 bytes, about 400k tokens.

### What was actually read before the first task action

"First task action" is the first Write, Edit, `use_figma`, or apply/finalize run.

| Session | Calls before first action | Result chars | ~Tokens | Largest items |
|---|---|---|---|---|
| 84ff42db (09-09) | 21 | 178,112 | 44.5k | all workflow scripts 22,884; rules.json 19,239; apply+finalize chip scripts 18,331; protocol+check-catalog 17,962; repo listing 11,434; schema key survey 9,783; Codex plan extraction 8,927 |
| fde5980a (09-08) | 15 | 154,153 | 38.5k | contract read three times (cat persisted 2,113 + Read 62,132 + Read of persisted middle 34,352 = 98,597 chars for a 72,982-byte file); validators+lib+apply script 25,386 |
| 9740bfa7 (09-08) | 35 | 249,800 | 62.5k | Codex log mining 29,611 + 26,668 + 19,512 + 16,101; all workflow scripts 26,129; AGENTS+OPERATORS+diffs 14,854; git status/tags/log 13,229 |
| 6a891562 (09-06) | 9 | 26,421 | 6.6k | encounter shell report.md 12,580 |
| e7e2148b (09-06) | 9 | 50,775 | 12.7k | report+scripts+schema diff 19,872; schema record via node -e 12,816 |

The three long sessions loaded 2.5 to 4 times the "lean set as read in practice" before touching anything, mostly by re-reading tooling (`scripts/workflow/*.js` is now 80,380 bytes) and prior scripts as templates.

## 2. Session logs

### Per-session totals

| Session | Date | Work | Tool calls | API calls | Cache write | Cache read | Output | Final window | Images |
|---|---|---|---|---|---|---|---|---|---|
| 84ff42db | 09-09 | Phase 8 schema split, backup policy B, tidy, proposals | 131 | 136 | 713,073 | 38,437,405 | 201,628 | 469,390 | 10 |
| fde5980a | 09-08/09 | lean pilot runs 2 and 3, module chip fix, merge | 143 | 65 | 713,436 | 15,422,109 | 178,569 | 458,566 | 10 |
| 9740bfa7 | 09-08 | verify Codex phases, PMHx body finalize, refactor closeout | 162 | 48 | 484,376 | 14,451,921 | 202,843 | 517,447 | 14 |
| 6a891562 | 09-06 | encounter toolbar | 86 | 54 | 460,059 | 7,855,593 | 100,225 | 268,033 | 24 |
| e7e2148b | 09-06 | encounter shell restart (short) | 14 | 14 | 69,839 | ~1,016,000 | 7,272 | 102,268 | 1 |
| **Total** | | | **536** | **317** | **2,440,783** | **77,183,028** | **690,537** | | **59** |

Uncached input is negligible (1,386 to 4,142 per session). Total input tokens across the five sessions: 79,632,957. The fixed ~52k base alone accounts for 16.7M of that (21%) because it is re-sent on all 317 calls.

Estimated image cost (PNG dimensions decoded from the transcript, Claude's 1.15 MP cap applied): 9,723 / 6,610 / 9,547 / 4,883 / 1,533 tokens. Images are bounded at about 1,533 tokens each regardless of file size; the 585,628-byte change-log crop cost about 800 tokens.

### Tool calls by name

- 84ff42db: Bash 56, Write 31, use_figma 19, Read 10, get_screenshot 8, get_metadata 5, Skill 1, ToolSearch 1
- fde5980a: Bash 50, use_figma 44, get_screenshot 15, Read 12, Write 11, Edit 3, get_metadata 2, download_assets 2, upload_assets 2, Skill 1, ToolSearch 1
- 9740bfa7: Bash 70, use_figma 31, Write 22, Read 15, get_screenshot 14, ToolSearch 3, download_assets 3, upload_assets 2, Skill 1, search_design_system 1
- 6a891562: use_figma 39, Bash 23, get_screenshot 12, Read 7, ToolSearch 2, Write 2, Skill 1
- e7e2148b: Bash 8, use_figma 2, Read 1, get_screenshot 1, Skill 1, ToolSearch 1

### Ten largest text results per session (chars)

84ff42db
1. 22,884 Bash: cat all remaining scripts/workflow/*.js
2. 20,004 Bash: dump schema meta and per-key date/status/workstream shape
3. 19,740 Bash: store dry-run and commit 1 of 3 (git output)
4. 19,239 Bash: cat workflow/rules.json
5. 18,331 Bash: cat apply + finalize module-chip scripts and apply-post-pilot-merge.js
6. 17,962 Bash: classify flags, read protocol.json and check-catalog.json
7. 12,361 Bash: manifest item shape and every record mentioning two source nodes
8. 12,073 use_figma: Templates page 3:2 descent with skipInvisible=false
9. 12,055 get_metadata: source file node 129:7826
10. 11,434 Bash: repo listing and grep for the refactor plan

fde5980a
1. 62,132 Read: workflow/npve-contract.generated.json (whole)
2. 34,352 Read: persisted tool-results file (the middle of the same contract)
3. 25,386 Bash: cat validate-record.js, lib, prior apply script, evidence example
4. 20,481 use_figma: page list + Templates 3:2 inventory with skipInvisible=false
5. 18,850 Bash: cat workflow/rules.json (first 20,000 bytes)
6. 17,413 Bash: re-extract module chip prompts from session logs
7. 15,744 Bash: cat workflow/metrics.json + record + finalize pattern
8. 12,316 get_metadata: source node 129:8401
9. 11,911 Bash: allergy severity precedent + Hospitalizations record + finalize example
10. 11,617 use_figma: source node 129:8401 paint/text audit

9740bfa7
1. 29,611 Bash: rest of the extracted Codex phase messages
2. 26,668 Bash: recover Codex's Phase 3.a candidate survey from its log
3. 26,129 Bash: cat all scripts/workflow/*.js
4. 19,970 use_figma: component set 129:6647 variants and children
5. 19,512 Bash: find how Codex wrote comparison PNGs (log mining)
6. 16,101 Bash: extract operator messages and the original plan from the Codex log
7. 14,854 Bash: cat AGENTS.md, OPERATORS.md and instruction-file diffs
8. 14,136 search_design_system: five component queries in the library
9. 13,421 Bash: read prior pilot batch evidence and revalidate
10. 13,346 Bash: Facility Stay baseline record, report and commit

6a891562
1. 20,500 use_figma: ancestry walk from 3456:11505 with skipInvisible=false
2. 14,729 use_figma: Templates page master inventory
3. 13,505 Bash: previous apply script record and flag format
4. 12,580 Bash: cat encounter shell report.md
5. 11,421 use_figma: Screens page comparison inventory
6. 7,530 Bash: encounter shell schema record via node -e
7. 7,181 Bash: grep record ids and locate report folder
8. 6,749 use_figma: ancestry walk 3456:11505
9. 6,546 use_figma: ancestry walk 4841:17077
10. 6,029 use_figma: icons page 259:2878 findAll

e7e2148b
1. 19,872 Bash: report.md + scripts + schema diff
2. 12,816 Bash: encounter shell schema record via node -e
3. 6,322 Bash: shell commit, LIBRARY-TODOS item and report
4. 5,569 Bash: section numbering and candidate queue
5. 3,712 Bash: schema state, recent records, backups
6. 2,167 Bash: git status, log, batch folder
7. 2,088 use_figma: Screens page verify
8. 1,933 use_figma: Templates page verify
9. 496 get_screenshot: 434:7474
10. 285 Bash: section numbering across two batches

Persisted outputs (results over ~30 KB saved to a file instead of shown): fde5980a 3 (131,789 bytes), 9740bfa7 2 (69,152 bytes). In fde5980a the agent then Read the persisted file in full, so the persistence saved nothing.

### Where the window goes

For the three long sessions the window grew by 416k / 406k / 467k tokens over the base. Comparing each call's growth with the previous call's output tokens and the intervening tool result shows the growth exceeds even "previous output in full + result", so reasoning and tool-call payloads stay in the window across tool calls within a turn. Composition of growth, three-session range:

| Class | Share of growth | Evidence |
|---|---|---|
| Model output retained (reasoning + Write bodies + use_figma code + Bash commands) | 43–48% | output tokens 178k–203k per session; tool-call payload chars 279k–306k |
| Tool result text | 24–30% | 355k–478k chars per session |
| Harness-injected text and tokenizer slack (skill bodies, tool schemas from ToolSearch, per-call reminders, file-state notes) | 20–23% | residual; single steps grew 3.7k–6.2k tokens with no result and no visible output |
| Images | 2% | 6.6k–9.7k tokens |
| Operator prompts | 2–3% | 36k–40k chars |

## 3. Scripts

Inventory: 93 `apply-*.js`, 47 `finalize-*.js`, 1 `propose-*.js`, `rule8-audit.figma.js` (2,261 bytes).

Read/print behaviour:

- Every pre-split script (through 2026-09-08) does `require('./design-system-schema.json')`, mutates the object, and `writeFileSync`s it back; 92 scripts write the aggregate this way. None prints it. Each prints one line: `wrote|recorded|finalized <id> flags <n>` (a few add `backup <path>`).
- Post-split scripts call `openRecord`/`finalizeRecord` from `scripts/schema/lib.js`, which return the record file path; the scripts print that path. The three Flowsheets scripts print a JSON summary of `closeout()` (checks and finish state, about 1 KB).
- No Node script reads or prints a Figma node tree; the `findAll`/`skipInvisibleInstanceChildren` strings inside 30 of them are quoted plugin snippets stored in record bodies.
- `rule8-audit.figma.js` is a plugin-side script for `use_figma`: it sets `skipInvisibleInstanceChildren = false`, walks one named page (`PAGE_NAME`, default Screens) and returns only the fractional-size hits plus a count of exempt nodes. It does not return the tree.

Last-run output sizes from the transcripts (chars):

| Script | Run | Output |
|---|---|---|
| rule8-audit.figma.js (standalone signature) | 2026-09-03 17:17, session 8d18d5db | 1,270 |
| inline rule-8 walks (same signature) | 2026-09-06 01:31–12:16, session cb2b33be, 8 runs | 515 to 12,436 (Templates page runs 8,239 / 9,713 / 10,152 / 11,171 / 12,436) |
| apply-schemasplit-phase8-2026-09-08.js | 2026-09-09, 3 runs | 2,447 / 10,040 / 3,984 (the 10k run includes a patch step and validator output) |
| finalize-schemasplit-phase8-2026-09-08.js | 2026-09-09 | 2,362 |
| apply + finalize backup-policy-b | 2026-09-09 | 2,188 |
| apply-npve-tidy / finalize-npve-tidy | 2026-09-09 | 313 / 1,936 |
| propose-npve-edit-forms-2026-09-09.js | 2026-09-09 | 267 |
| finalize-lean-pilot-run2-3.js | 2026-09-09 | 1,529 |
| apply-lean-pilot-run3.js / finalize-lean-pilot-run3.js | 2026-09-09 | 802 / 1,660 |
| apply-post-pilot-merge.js | 2026-09-09 | 518 / 1,158 |
| apply / finalize npve-module-chip-fix-2026-09-08 | 2026-09-09 | 1,158 / 1,940 |
| apply-workflow-refactor-closeout.js | 2026-09-08 | 3,944 |
| finalize-workflow-refactor-closeout(+evidence).js | 2026-09-08 | 1,273 |
| apply-workflow-tier-approval.js | 2026-09-08 | 85 / 1,877 |
| apply-lean-pilot-run2-3.js | 2026-09-08 | 1,172 |
| finalize-npve-past-medical-history-body.js | 2026-09-08 | 956 |
| apply-npve-encounter-toolbar.js | 2026-09-06 | 136 |
| largest on record: apply-npve-ext-review-repairs.js | 2026-09-06 | 14,485 |

The Flowsheets, Patient Summary, Allergies edit, Family History edit and thumb-icon scripts ran in Codex and have no Claude transcript. Script output is not a token sink; the cost of these scripts is the Write of the script body (8 KB to 20 KB each, 31 Writes in 84ff42db totalling 192,622 chars) and the reading of prior scripts as templates.

Aside: no rule-8 walk ran in any of the five audited sessions, although rule 12 asks for all ten standing batch rules each batch. That is a compliance note, not a token one.

## 4. Figma reads

- Node `0:0`: 0 reads in the five sessions and 0 in all 28 sessions on record. `get_metadata` was called 7 times, always on a specific node (12k chars each).
- Whole-file walks (`figma.root.findAll`): 0.
- `skipInvisibleInstanceChildren = false` set in a `use_figma` call: 84ff42db 10 calls (33,197 chars of results), fde5980a 26 (99,979), 9740bfa7 19 (44,650), 6a891562 31 (85,534), e7e2148b 2 (4,021).
- Of those, page-scoped `findAll` sweeps: 5 / 19 / 17 / 12 / 0, returning 8,369 / 59,002 / 32,355 / 44,494 / 0 chars. fde5980a swept the same four pages (3:2, 27:2, 126:2, 0:1) four separate times in one session.
- Largest single `use_figma` result per session: 12,073 / 20,481 / 19,970 / 20,500 / 2,088 chars. All `use_figma` results per session: 45,460 / 120,290 / 81,500 / 101,578 / 4,021 chars, about 2–6% of the final window.

## 5. Frozen files

HANDOFF.md and CHAT-HANDOFF.md were not read in any of the five sessions. The 4/3/2/1/1 raw mentions in those transcripts are the CLAUDE.md "Superseded" paragraph. The last reads were on 2026-09-02 (session d91b7c7c: HANDOFF.md in full in three slices, 2,148 + 18,663 + 19,636 chars, and CHAT-HANDOFF.md 6,763 chars) and on 2026-08-03 (HANDOFF.md, 19,729 chars).

## Ranking and proposals

Shares are of window growth in the three long sessions; the base is stated separately because it multiplies by call count.

1. **Model output retained in the window, 43–48%.** About half is reasoning, half is tool-call payloads: 31 hand-written apply/finalize/report bodies of 8–20 KB in one session, 115 KB of `use_figma` code in another, with the same `hex()`, `desc()` and walk helpers re-typed each time. Proposal: generate the boilerplate. A `node scripts/schema/record.js open|finalize <id> --body body.json` takes a 1–2 KB body, and a checked-in `figma-helpers.js` snippet is pasted by a one-line preamble rule instead of re-authored, so each batch emits a few KB of intent rather than tens of KB of scaffolding.

2. **Tool result text, 24–30%.** Between 36% and 52% of it is startup reading: all of `scripts/workflow/*.js` (now 80 KB) twice, rules.json twice, the contract three times in one session, protocol and check-catalog, prior scripts as templates. Proposal: one `node scripts/workflow/brief.js <item>` that prints a capped (≤10 KB) briefing: contract digest, manifest item, last record summary, the record-store API signatures, and the apply/finalize template, plus a contract line that says the workflow scripts and rules.json are not to be cat'd because their digests are already verified.

3. **Harness-injected text, 20–23%.** Skill bodies (figma-use is loaded every session), tool schemas pulled by ToolSearch, per-call reminders and file-state notes; single steps added 3.7k–6.2k tokens with no tool result. Proposal: trim what is enabled for this project: a project settings entry that keeps only the Figma MCP server (Gmail, Drive, Calendar, Chrome, computer-use and Slack contribute 95 of the 136 deferred tool names) and only the skills this repo uses (the skills listing is 16 KB per call), and load figma-use and the use_figma schema once per session rather than per batch.

4. **Fixed per-call base, 11% of the window but 21% of all input tokens (16.7M of 79.6M).** ~52k tokens re-sent on all 317 calls, and long sessions carry a 450–520k window for a hundred calls. Proposal: one batch per session, ending at the record finalize, so the window restarts at 52k instead of carrying earlier batches, and independent reads batched into one Bash call (56–70 Bash calls per session now) to cut call count.

5. **Recovery and re-walk reads, 5–8%.** 9740bfa7 spent 92 KB of results mining 246 MB Codex logs for a plan that lived nowhere else; fde5980a swept the same four Figma pages four times; 6a891562 walked the same ancestry three times. Proposal: make the artefacts durable: the Codex planner writes its phase checklist to `figma-export/<batch>/plan.md` (the memory note already records that checklists live only in Codex logs), and each batch saves its page inventory JSON to the batch folder on first walk and reads that file on later checks.

Not a sink: images. Fifty-nine images cost about 32k tokens across five sessions; PNG size does not matter because the API caps each image at roughly 1,533 tokens. Reading comparison renders is cheap and should continue.
