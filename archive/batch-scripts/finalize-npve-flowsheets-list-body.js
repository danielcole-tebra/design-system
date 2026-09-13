const fs=require('fs');
// Batch-local compatibility with the existing runner/core missing export.
// Uses the same authoritative readers; no approval or finish checks removed.
const core=require('./scripts/workflow/runner/core');
const {readJson}=require('./scripts/workflow/lib');
const {executionPath}=require('./scripts/workflow/validate-execution');
if(!core.repositoryContext)core.repositoryContext=id=>{
 const items=readJson('workflow/manifest.json').items,item=items.find(i=>i.id===id);core.need(item,'Unknown item');
 const index=readJson('indexes/record-index.json').records.find(r=>r.id===item.expectedRecordId);core.need(index,'Missing record');
 return{item,run:readJson('.workflow-runs/'+id+'.json'),record:readJson(index.path).record,execution:readJson(executionPath(item)),dependencies:items};
};
const {closeout}=require('./scripts/workflow/runner/closeout');
const body=JSON.parse(fs.readFileSync('figma-export/npve-flowsheets-list-body-2026-09-11/final-body.json','utf8'));
console.log(JSON.stringify(closeout('npve-flowsheets-list-body',body,{dryRun:!process.argv.includes('--finalize')}),null,2));
