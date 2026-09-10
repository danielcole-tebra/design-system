const fs=require('fs');const {openRecord}=require('./scripts/schema/lib');const d='figma-export/workflow-run-cost-tracking-2026-09-10/';const cost={
  "itemId": "npve-patient-summary-content",
  "buildCommit": "d25641d",
  "provider": "OpenAI",
  "model": "gpt-6-astra",
  "reasoning": "medium",
  "credits": {
    "amount": 179,
    "approximate": true,
    "source": "operator-reported",
    "quote": "I'd like to keep some count of the token cost of these runs, that last run cost about 179 credits all together",
    "scope": "Whole preceding Patient Summary content run, as reported by operator",
    "recordedDate": "2026-09-10"
  },
  "tokens": {
    "source": "Codex session token_usage_record.payload.usage, summed once per unique response_id for the two completed turns",
    "sessionId": "01a08d30-c73d-7811-b355-997a3eb49947",
    "turnIds": [
      "01a08d30-cf46-7c62-b363-b4f3f111afe1",
      "01a08d35-0fc6-7ce3-8e13-d6ee0f3ddd2c"
    ],
    "firstUsageAt": "2026-09-10T21:19:48.555Z",
    "lastUsageAt": "2026-09-10T21:38:33.102Z",
    "responses": 42,
    "input": 4857672,
    "cachedInput": 4693632,
    "uncachedInput": 164040,
    "cacheWriteInput": 0,
    "output": 22556,
    "reasoningOutput": 3232,
    "total": 4880228,
    "note": "Input includes cached input; output includes reasoning output. Repeated input across responses is included. Total is input + output, not unique context size. Excludes this cost-tracking follow-up."
  },
  "dollarCost": null,
  "note": "Credit amount is an approximate operator report, not an inferred token-to-credit conversion. This supplement supersedes the build report's unavailable-token statement; immutable DONE record and original prefix measurements are preserved."
};
openRecord({id:'workflow_runCostTracking_2026-09-10',previous:'workflow_npveQueueRefresh_2026-09-10',workstream:'workflow',date:'2026-09-10',createdBy:'Codex (OpenAI)',script:'apply-workflow-run-cost-tracking.js',body:{_status:'IN PROGRESS',date:'2026-09-10',workstream:'Workflow / run cost tracking',report:d+'report.md',scope:'Record operator-reported credits and observed token totals for completed Patient Summary content run; establish append-only cost observations for future runs. Repository-only; no Figma mutation.',approvalQuote:cost.credits.quote,supplements:'npveRebuild_patientSummaryContent_2026-09-10',costObservation:cost}});
const m=JSON.parse(fs.readFileSync('workflow/metrics.json'));m.costTracking={method:'Append costObservations per completed run; preserve earlier observations. Record credits separately from input, cached input and output tokens.',credits:'Record operator or billing evidence and whether approximate. Never convert tokens to credits without a verified applicable rate.',tokens:'Use completed-run session usage: sum per-response usage exactly once by response_id, bounded by selected turn IDs. Do not sum cumulative turn/thread totals. Input includes cached input; output includes reasoning output.',unavailable:'Use null with a reason when unavailable; no estimates.',reports:'Include cost observations and their scope in run reports. Late data supplements a completed record through a new record; do not rewrite DONE records.'};m.costObservations=m.costObservations||[];if(m.costObservations.some(x=>x.itemId===cost.itemId))throw new Error('Cost observation already exists');m.costObservations.push(cost);fs.writeFileSync('workflow/metrics.json',JSON.stringify(m,null,2)+'\n');fs.writeFileSync(d+'cost-observation.json',JSON.stringify(cost,null,2)+'\n');console.log('Cost observation recorded: approximately 179 credits; 42 response usage records.');
