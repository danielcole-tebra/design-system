const fs=require('fs');
const {finalizeRecord}=require('../../../scripts/schema/lib');
const base='figma-export/npve-patient-summary-feedback-2026-09-10';
const evidence=JSON.parse(fs.readFileSync(base+'/publication-check-2026-09-11.json'));
finalizeRecord('npveRebuild_patientSummaryFeedback_2026-09-10',r=>({...r,_status:'IN PROGRESS — repaired library icons await publication; no NPVE mutation',publicationCheck:evidence,nextAction:evidence.nextAction}));
fs.appendFileSync(base+'/report.md','\n## Resumption check — 2026-09-11\n\nOperator: “Ok lets finish out the patient summary”. Target identity verified; exact-key import of the repaired ThumbUpAlt failed with “Component with key not found”. Stopped after the first failure; remaining three keys were not tested. No canvas mutations. Library publication remains required before the feedback build. Two Figma reads, zero screenshots. Current credit baseline is 143 after the suspected reset; no delta inferred. Evidence: publication-check-2026-09-11.json.\n');
