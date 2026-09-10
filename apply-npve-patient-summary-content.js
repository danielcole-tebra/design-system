const { openRecord } = require('./scripts/schema/lib');
const body = {
  "_status": "IN PROGRESS",
  "date": "2026-09-10",
  "workstream": "NPVE Rebuild / Sidesheets",
  "executor": "Codex (OpenAI)",
  "manifestItem": "npve-patient-summary-content",
  "report": "figma-export/npve-patient-summary-content-2026-09-10/report.md",
  "scope": "Build one reusable 518px Patient Summary content component containing the four visible rich-text sections (Current Situation, Key Background, Active Care Plan, Progress & Next Steps). Preserve the source hierarchy and copy while applying the canonical 16px default vertical rhythm and bound typography/color tokens. This item does not create a sidesheet, edit a shared master, or build feedback controls.",
  "source": {
    "fileKey": "zVsuhYehoSLLq880qRBFkq",
    "nodeId": "3028:16364",
    "label": "Summary_Wrap in Page=PatientSummary 129:7340, 534x708",
    "access": "read-only"
  },
  "target": {
    "fileKey": "fdCQVFdvOByaOYIJYag0d6",
    "pageId": "3:2",
    "name": "Patient summary content"
  },
  "risk": {
    "tier": "low",
    "reasons": [
      "One local reusable content component with no interactive controls",
      "No shared-master, token, preferred-value, or screen-placement mutation",
      "Canonical width and spacing behavior are already recorded"
    ],
    "proposedBy": "Codex (planner proposal), 2026-09-10, after the scoped read in figma-export/workflow-npve-queue-refresh-2026-09-10/report.md",
    "approval": {
      "status": "approved",
      "approvedBy": "Operator",
      "approvedAt": "2026-09-10T21:24:34.734Z",
      "quote": "I approve the `npve-patient-summary-content`, proceed",
      "history": []
    },
    "lockedAt": "2026-09-10T21:24:34.734Z",
    "lock": "98c1dcad56d9fcd5c565ee841be33be13a03c8801a9a1b6919cd2a030e61fbfc"
  },
  "approvalQuote": "I approve the `npve-patient-summary-content`, proceed",
  "recordGate": "Previous NPVE record npveRebuild_familyHistoryEdit_2026-09-09 is DONE; current operator confirms formal closure.",
  "stopCondition": "Stop before mutation on source or target identity mismatch, unavailable bound typography/color tokens, ambiguous mixed-text hierarchy, or any need to detach, rasterize, truncate, or invent clinical copy. Stop the family before the feedback item if deterministic or visual validation fails.",
  "planning": {
    "sourceFacts": [
      "The source content is 534x708 inside an 8px body inset; the target width is 518 inside the canonical 16px sidesheet inset.",
      "The four source blocks are separated by 12px. Rebuild with 16px between sections; preserve tight heading/body relationships within each section.",
      "Text reflow may change height. Height is content-driven and must not be forced to the source's 708px."
    ],
    "sections": [
      "Current Situation",
      "Key Background",
      "Active Care Plan",
      "Progress & Next Steps"
    ],
    "appearance": "figma-export/npve-patient-summary-content-2026-09-10/appearance.md"
  },
  "mutationsPlanned": [
    "Create one 518px content component with four heading/list stacks and bound tokens.",
    "Create reference, rebuild and change-log helper components with a frozen 2x reference; one comparison instance on Screens. No shared-master or preferred-value edits.",
    "Any required proof archive move will be recorded before it is performed."
  ],
  "findings": {
    "GAP": 0,
    "DEFECT": 0
  },
  "provenance": {
    "provider": "OpenAI",
    "model": "GPT-6 (system-reported; exact deployment ID unavailable)",
    "reasoning": null,
    "reasoningNote": "Configured reasoning level is not exposed in this session; unavailable, not inferred."
  }
};
console.log(openRecord({id:"npveRebuild_patientSummaryContent_2026-09-10",previous:'npveRebuild_familyHistoryEdit_2026-09-09',workstream:'npve',date:'2026-09-10',body,createdBy:'Codex (OpenAI)',script:'apply-npve-patient-summary-content.js'}));
