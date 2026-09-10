# Reliable execution across models and harnesses

Applies to every executor. Adopted by `workflow_executionReliability_2026-09-10` after the Allergies recovery. Read this once per session; it is also included in the generated contract. This clarifies how to execute approved work, without lowering its risk or replacing the ten standing batch checks.

The execution checkpoint is for Figma build runs. Repository-only work records canvas checks as not applicable; never fabricate component mappings or screenshots to satisfy a documentation batch.

## Talk to the operator as a UX designer

Lead with what changed on the screen. Use familiar design language and show saved screenshots for comparison. Keep code, property names, node IDs, schema details, command transcripts and diagnostic tables in the report unless the operator asks for them or needs a specific setup action. Provide a concise progress update about once a minute during active work: what is now visible, what remains, or the exact obstacle. Never describe an unverified edit as complete.

Planning and execution may happen in one session. The selected model can do both within the operator-approved scope. Do not require Claude, a second chat, a plugin stack, or manual message copying. A change of model or harness is a continuation of the same batch, not permission to restart or duplicate it.

## Establish a buildable plan once

Use the lean startup. Confirm the repository root, target file/page identity and current batch state. Inspect the actual authenticated tool list and make a read-only call against the target. A tool name, seat type or successful identity call does not alone prove canvas write permission. Verify writing through the first intended, authorized edit and its readback; do not create disposable probes solely to test it.

Before building, check the distinct controls needed for the next visible milestone against the actual published components: exact component identity, variant choices, exposed properties and dimensions. Repeated controls can cite the same evidence. Reuse verified mappings from the same session or a current precedent; do not rediscover the whole library. Revalidate a reused mapping if it fails or the library has changed.

Record the results in the batch's small `execution.json` checkpoint using `workflow/execution-template.json`. Cite saved readback evidence, rather than writing only “verified.” Control evidence uses the native property definitions in a JSON snapshot, as described in `workflow/README.md`; the validator checks the requested properties against it. This supports resumption and the start/finish gates; it is not another approval request or a second batch record. The IN PROGRESS record remains authoritative for scope, decisions and dispositions.

Treat a prompt's component names and estimated dimensions as hypotheses until checked. The Allergies plan called for an outlined 36px Add button; the published white bordered small button was named contained/primary and measured 30px. Resolve an unambiguous factual mistake from code, Storybook and library evidence, document original → correction, and continue within approved intent. Do not invent a missing variant, resize a library control to satisfy an estimate, or repeatedly try an unavailable value. An actual code/library divergence or multiple defensible design choices remains a finding for the operator; do not silently “repair” the library.

## Build visible milestones inside one batch

Use a short sequence such as form → complete sheet → comparison and closeout. A milestone is an internal checkpoint, not a new record or permission boundary. Continue through the authorized batch after it passes.

Make a small group of dependent edits, then check the affected nodes. After a meaningful visual milestone, save and inspect a screenshot before extending it. Check expected text, missing controls, clipping, layout overflow, selected states and default/sample content. Inspect actual instance rendering, not just stored properties or master nodes. Run the required full-page and ten-rule audits at batch completion; repeat broad audits only if subsequent changes invalidate them. The existing concurrency guard still runs before mutations.

Use documented APIs for the current tool. Load and await the actual fonts before changing text; set instance properties by their exact exposed names; append new nodes to the intended parent immediately; apply fill/hug sizing after fixed resizing. Import and use remote components in the same call. Never swallow an error or assume a generic helper changed a property: read back the affected node and inspect its rendered text. Prefer stable IDs and scoped searches over repeated whole-file scans. One discovery inventory is enough unless new evidence requires another.

## Recover without a retry loop

A failed or disconnected write may still have landed. Read the affected IDs and parent children before any retry. Classify the result as applied, not applied, or still uncertain. If applied, continue from that state; if not applied, make an evidence-based correction; if uncertain, perform read-only diagnosis. Never replay a creation blindly. Server hints such as `safeToRetryWithoutCanvasRead` are not proof of canvas state.

After two unsuccessful attempts at the same operation, stop that operation. Rephrasing the prompt or changing models does not reset this limit. Inspect the exact error and current state once, then use a materially different, evidence-supported approach. Record what changed and verify its result. If no supported correction is available, save the checkpoint and report the specific blocker. Work on independent authorized parts may continue. Do not reinstall servers, switch endpoints, change authentication or add plugins without evidence that the failure is in that layer.

If about five minutes pass without a verified visual change or a concrete diagnostic finding, checkpoint and diagnose the lack of progress instead of accepting another unbounded “Continue.” This is a progress signal, not a total task deadline: slow exports and worthwhile diagnosis can take longer. Do not keep a user waiting through identical retries.

Keep unresolved failures in `execution.json` until readback evidence establishes their resolution. Do not clear them merely to pass a validator. Log failed operation, exact error, known node IDs, whether a mutation landed, and the next different approach in a short batch note. Do not record tokens, credentials, signed asset URLs or guessed tool-call counts.

## Routine repairs and human decisions

Within the approved batch, the executor may correct labels and component properties, clipping and layout mistakes, empty generated placeholders, or a misplaced node it can identify as belonging to this batch. Record moves/conversions/supersession in the IN PROGRESS record **before** performing them, preserving IDs or recording old → new IDs. No second permission is needed for such a repair. Never delete: archive unused batch scaffolding with a README, and do not displace verified or unrelated work. An unrelated leftover does not block a separate, safe part of the form.

Ask the operator only when a real design choice, ownership ambiguity, scope/risk expansion, destructive action or explicit approval boundary remains. Present the visible consequence and a recommendation in plain language. Routine factual corrections are reported, not turned into taste questions. Do not weaken locked risk, oversight or file boundaries to get a gate to pass.

Preserve unrelated dirty files. New runs fingerprint them at startup; finish allows them only if unchanged. Do not hide, relocate, commit or expand the allowlist for unrelated work merely to make a finish gate green. For an older run without a baseline, report that limitation with the completed evidence rather than fabricating a baseline after the fact; it is a workflow limitation, not a reason to rebuild Figma.

## Resume and close

At a handoff, keep the IN PROGRESS record, saved control mappings and this checkpoint. List verified milestone renders, actual created/moved IDs, unresolved errors, and exactly one next action. Resume by checking those IDs once. Do not reread every historical record, rebuild a completed milestone, or retest authentication just because the model changed.

At close, every planned milestone must have a saved render inspected by the executor, all unresolved failures must have a recorded resolution, and all existing standing checks still apply. Show the comparison to the operator, save the report, finalize and commit. Record operator acceptance in the next appropriate record without editing a DONE record. A screenshot checkpoint does not silently grant approval for the next batch.

## What the local checks can and cannot guarantee

New workflow runs require `execution.json` at start, validate it before mutations, and require verified milestone renders at finish. The checker rejects missing mappings/evidence, unresolved failures and incomplete milestones. Historical runs are not retroactively invalidated. It checks the submitted evidence and local files; it cannot independently authenticate Figma, inspect pixels, count unreported retries or force a harness to call it. The executor must follow this policy honestly. Evaluate cheaper models on a clean bounded task by visible progress, corrections and total cost/time, not token price alone.
