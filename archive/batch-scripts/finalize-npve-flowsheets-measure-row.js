const fs=require('fs');
// runner/core defines repositoryContext but does not export it. Supply the same
// authoritative reader locally; closeout's approval, evidence and finish gates stay intact.
const core=require('./scripts/workflow/runner/core');
const {readJson}=require('./scripts/workflow/lib');
const {executionPath}=require('./scripts/workflow/validate-execution');
if(!core.repositoryContext)core.repositoryContext=id=>{
 const items=readJson('workflow/manifest.json').items;
 const item=items.find(i=>i.id===id);core.need(item,'Unknown item');
 const index=readJson('indexes/record-index.json').records.find(r=>r.id===item.expectedRecordId);
 core.need(index,'Missing authoritative record');
 return{item,run:readJson(`.workflow-runs/${id}.json`),record:readJson(index.path).record,
  execution:readJson(executionPath(item)),dependencies:items};
};
const {closeout}=require('./scripts/workflow/runner/closeout');
const body=JSON.parse(fs.readFileSync('figma-export/npve-flowsheets-measure-row-2026-09-11/final-body.json','utf8'));
console.log(JSON.stringify(closeout('npve-flowsheets-measure-row',body,{dryRun:!process.argv.includes('--finalize')}),null,2));
