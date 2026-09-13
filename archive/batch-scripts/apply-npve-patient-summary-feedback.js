const {openRecord,appendFlags}=require('./scripts/schema/lib');
const body={
  "_status": "IN PROGRESS — read-only preflight stopped for rating-icon mapping decision",
  "date": "2026-09-10",
  "workstream": "NPVE Rebuild / Sidesheets",
  "manifestItem": "npve-patient-summary-feedback",
  "report": "figma-export/npve-patient-summary-feedback-2026-09-10/report.md",
  "executor": "Codex (OpenAI gpt-6-astra, medium)",
  "scope": "Three Patient summary feedback states, as queued; no sidesheet or shared-master edits.",
  "operatorContinuationQuote": "Actually can you just pickup the work and let's track the cost, we're currently at 275 credits, we'll see where we end",
  "risk": {
    "tier": "medium",
    "status": "proposed; no mutation guard started"
  },
  "creditBaseline": {
    "reading": 275,
    "unit": "credits",
    "source": "operator-reported",
    "kind": "starting reading; counter direction not established",
    "endingReading": null,
    "delta": null
  },
  "preflight": {
    "target": "fdCQVFdvOByaOYIJYag0d6",
    "source": "zVsuhYehoSLLq880qRBFkq",
    "sourceNodes": [
      "2545:4855",
      "2459:10191",
      "2474:10628"
    ],
    "existingFeedbackNodes": [],
    "priorBuilderSavedRun": false,
    "figmaMutations": 0
  },
  "findings": [
    {
      "id": "npvePatientSummary_feedbackThumbMapping",
      "type": "GAP",
      "description": "Source Error/Entry shows selected filled thumbs-up; library has only Icon/ThumbUpOutlined (MUI) 919:4 and Icon/ThumbDownOutlined (MUI) 919:7. Production SummaryFeedback.tsx uses ThumbUpAlt/ThumbUpOffAlt and ThumbDownAlt/ThumbDownOffAlt. Library descriptions explicitly call out the unresolved mismatch.",
      "evidence": [
        "figma-export/npve-patient-summary-feedback-2026-09-10/source.json",
        "figma-export/npve-patient-summary-feedback-2026-09-10/thumb-mapping.json",
        "C:/Code/web-app-v2/packages/clinical-system/src/modules/components/AiPatientSummary/SummaryFeedback.tsx"
      ]
    }
  ],
  "nextAction": "Operator chooses library-icon repair first or explicitly permits an outlined stand-in with documented GAP. No Figma mutation until decision and workflow preflight gates.",
  "screenshots": [
    "figma-export/npve-patient-summary-feedback-2026-09-10/source-error-entry.png"
  ]
};
console.log(openRecord({id:'npveRebuild_patientSummaryFeedback_2026-09-10',previous:'npveRebuild_patientSummaryContent_2026-09-10',workstream:'npve',date:'2026-09-10',body,createdBy:'Codex (OpenAI)',script:'apply-npve-patient-summary-feedback.js'}));
appendFlags([{id:'npvePatientSummary_feedbackThumbMapping',severity:'medium',status:'OPEN',summary:body.findings[0].description,discoveredDuring:'npveRebuild_patientSummaryFeedback_2026-09-10',evidence:body.findings[0].evidence}]);
