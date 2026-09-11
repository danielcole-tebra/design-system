const fs = require('fs');
const {execFileSync} = require('child_process');
const {appendFlags, finalizeRecord, readJson, writeJson, sha256} = require('./scripts/schema/lib');
const id = 'npveRebuild_flowsheetsAudit_2026-09-11';
const folder = 'figma-export/npve-flowsheets-audit-2026-09-11';
const itemId = 'npve-flowsheets-measure-row';
const buildFolder = 'figma-export/npve-flowsheets-measure-row-2026-09-11';
const expectedRecordId = 'npveRebuild_flowsheetsMeasureRow_2026-09-11';
const flags = [
  {id:'npveFlowsheets_rowIconMappings_2026-09-11',severity:'medium',kind:'GAP',summary:'Flowsheets rows require monitoring and double-up trend glyphs absent from the 101-master icon-page inventory. AddPaymentNote/EditOutlined exist but differ from source note-add/pencil artwork; substitutions are not approved.'},
  {id:'npveFlowsheets_chartMapping_2026-09-11',severity:'medium',kind:'GAP',summary:'No chart component found in authenticated Data display inventory/Chart search or scoped design-system source. Source curve and axis labels are not an authoritative implementation or dataset; chart work awaits a pattern decision.'},
  {id:'npveFlowsheets_questionnairePattern_2026-09-11',severity:'medium',kind:'GAP',summary:'Add/Edit source depicts nine four-option questions, selected response, inline graph, date control and Save caret without scoped prototype behavior except Close. No corresponding implementation found in the scoped TypeScript search; do not invent behavior or rasterize the UI.'},
  {id:'npveFlowsheets_iconButtonTargetDisagreement_2026-09-11',severity:'medium',kind:'RULE DISAGREEMENT',summary:'NPVE touch-target wording says Icon button is 42px; fresh library masters measure 34px small and 40px medium. The cited PMHx record specifically attributes its 42px row to Checkbox. Operator/planner clarification needed before Flowsheets chooses geometry; shared masters unchanged.'}
].map(f=>({...f,status:'OPEN',discoveredDuring:id,report:`${folder}/report.md`}));
const proposal = {
  id:itemId,title:'Flowsheets · Measure row variants',workstream:'NPVE Rebuild / Sidesheets',status:'proposed',dependsOn:[],
  source:{fileKey:'zVsuhYehoSLLq880qRBFkq',nodeId:'939:9251',label:'PHQ-9 row; related GAD-7 row 939:9353 in Flowsheets 939:9228',access:'read-only'},
  target:{fileKey:'fdCQVFdvOByaOYIJYag0d6',pageId:'3:2',name:'Flowsheets measure row'},expectedRecordId,
  scope:'After explicit mapping and geometry decisions, build one 518px local row set with Basic (PHQ-9) and With trend (GAD-7) variants, source copy, bound values and live library actions. Dedicated comparison for both. No body/sheet, charts, questionnaire, library writes or shared preferred-value changes.',
  plannerNotes:{auditRecord:id,audit:`${folder}/report.md`,decisionFlags:flags.filter(f=>f.kind!=='GAP'||f.id.includes('rowIcon')).map(f=>f.id),previousRecordAtProposal:id,recordGate:'Audit record must be DONE; no build record exists. Open a new record after operator decisions, re-tiering and per-item approval, then generate its task-specific runner handoff.',futureDependencies:'No local Flowsheets dependency exists. Selected published glyphs must be verified before start; exact missing glyphs require separately authorized library work and publication.',sourceRows:['939:9251','939:9353'],sourceCopy:{basic:['PHQ-9','15','2/1/26'],withTrend:['GAD-7','12','15%','2 days ago']},deferred:['Graph','Add readings questionnaire','Edit readings questionnaire','Selector/header/body/sheet']},
  risk:{tier:'human-decision',reasons:['Missing exact monitoring/trend glyphs and unapproved note/edit substitutions','Recorded target-size wording disagrees with live Icon button geometry'],proposedBy:'Codex (planner), read-only Flowsheets audit 2026-09-11',approval:{status:'unapproved',approvedBy:null,approvedAt:null,quote:null,history:[]}},
  oversight:['Operator resolves icon mappings and size disagreement, then re-tiers and explicitly approves this item before start','Executor inspects dedicated reference/rebuild/change comparisons for both row variants and shows operator before a dependent item'],
  stopCondition:'Do not start while human-decision. Stop before mutation on missing published mapping without an approved GAP treatment, unresolved 34/40/42px disagreement, identity drift, unsupported property, invented copy/state, need to detach/redraw/rasterize UI, or shared-master change. Stop on deterministic or visual failure before extending the batch.',
  allowedFiles:[`records/npve/**/${expectedRecordId}.json`,'flags/active.json','flags/resolved.json','indexes/**','design-system-schema.json','apply-npve-flowsheets-measure-row.js','finalize-npve-flowsheets-measure-row.js',`${buildFolder}/**`,'workflow/npve-contract.generated.json','workflow/manifest.json','workflow/metrics.json'],
  requiredEvidence:{audit:`${buildFolder}/audit.json`,report:`${buildFolder}/report.md`,comparisonRender:`${buildFolder}/comparison.png`}
};
const standingBatchRules = Object.fromEntries(Object.keys(readJson('foundation/standingBatchRules.json')).filter(k=>/^\d+_/.test(k)).map(k=>[k,'N/A — read-only audit; no component/paint/property mutation or new live instance.']));
standingBatchRules['2_unboundPaintAudit']='N/A — no Figma mutation; scoped source/mapping audit, not a full-file paint certification.';
standingBatchRules['4_skipInvisibleFalse']='PASS — scoped traversal scripts explicitly set false; visible state summaries propagate ancestor visibility.';
standingBatchRules['6_enumerateDontRecall']='PASS — source siblings, target Templates, 101 icon-page masters, actions and Data display enumerated freshly.';
standingBatchRules['7_fileIdentityFirst']='PASS — explicit source/target/library file keys; complete inventories matched repository baselines before scoped reads.';
for(const name of ['source-list','source-graph','source-add','source-edit']) {
  const b=fs.readFileSync(`${folder}/${name}.png`);
  if(b.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw Error(`Invalid PNG ${name}`);
}
const codePaths = ['src/overrides/IconButtonOverrides.ts','src/components/icons/AddPaymentNoteIcon.tsx','src/components/icons/EditOutlinedIcon.tsx','src/components/icons/PlusOutlinedIcon.tsx'];
writeJson(`${folder}/code-evidence.json`,{files:codePaths.map(p=>{const path=`C:/Code/web-app-v2/packages/design-system/${p}`;return {path,sha256:sha256(fs.readFileSync(path))};}),searches:[{root:'C:/Code/web-app-v2/packages/design-system/src',pattern:'flowsheet|chart',result:'No relevant chart or flowsheet implementation; incidental cobranding/story prose matches.'},{root:'C:/Code/web-app-v2/packages',extensions:['ts','tsx'],pattern:'flowsheet',result:'Navigation/permissions, beta-card and tests; no matching source questionnaire identified.'}],storybookRender:null});
writeJson(`${folder}/proposal.json`,proposal);
writeJson(`${folder}/audit.json`,{recordId:id,figmaMutations:[],standingBatchRules,visualReview:{inspectedBy:'Codex',screenshots:['source-list.png','source-graph.png','source-add.png','source-edit.png'],observations:'Four distinct states confirmed, GAD-7 trend shifts columns, graph and questionnaire patterns unresolved; see report.'},findings:flags,scopeLimits:['No new component or instance verification','No Storybook render','No whole-file paint audit'],recovery:[{operation:'verbose source read',failure:'Tool output truncated at 20KB',resolution:'Discarded; compact visible hierarchy and scoped state readbacks obtained.'},{operation:'multi-query search',failure:'Server processed one of six queries',resolution:'Skipped queries not counted as evidence; exact icon inventory and separate chart search obtained.'}]});
writeJson(`${folder}/checkpoint.json`,{kind:'read-only-audit-checkpoint',recordId:id,completed:['Source/target/library identity','Four source state readbacks and inspected PNGs','Fresh row control/icon definitions','Code evidence','Bounded proposal'],unresolved:flags.map(f=>f.id),nextAction:'Operator chooses row glyph treatment and clarifies Icon button geometry; planner re-tiers proposal before any build record opens.',figmaMutations:[],buildExecutionCheckpoint:'N/A'});
const manifest=readJson('workflow/manifest.json');
if(manifest.items.some(x=>x.id===itemId))throw Error('Proposal already exists');
manifest.items.push(proposal);fs.writeFileSync('workflow/manifest.json',JSON.stringify(manifest,null,2)+'\n');
appendFlags(flags);
const metrics=readJson('workflow/metrics.json');
const cost={recordId:id,itemId:'npve-flowsheets-audit',provider:'OpenAI',model:null,reasoning:null,input:null,cachedInput:null,output:null,credits:null,source:'No measured per-response usage or billing counters available through tools for this run.',approximate:false,coverage:'completed audit; usage unavailable'};
metrics.costObservations.push(cost);fs.writeFileSync('workflow/metrics.json',JSON.stringify(metrics,null,2)+'\n');
execFileSync(process.execPath,['scripts/workflow/generate-contract.js'],{stdio:'inherit'});
execFileSync(process.execPath,['scripts/workflow/validate-workflow.js'],{stdio:'inherit'});
finalizeRecord(id,r=>({...r,_status:'DONE — four Flowsheets states audited; row proposal awaits icon and geometry decisions',outcome:'Read-only source/mapping audit complete; one human-decision row item proposed, no construction authorized.',findings:flags,proposedItems:[itemId],standingBatchRules,costObservation:cost,screenshots:['source-list.png','source-graph.png','source-add.png','source-edit.png'].map(f=>`${folder}/${f}`),operatorPresentationEvidence:`${folder}/operator-presentation.md`,proofDisposition:'N/A — no Figma proofs created',checkpoint:`${folder}/checkpoint.json`,validation:{workflow:'PASS before finalization; repeated after generated contract refresh',canvas:'N/A — source-only screenshots inspected, no rebuilt UI'},nextAction:'Resolve row icon treatment and target-size disagreement, re-tier and approve npve-flowsheets-measure-row. Generate its handoff only after its new build record exists.'}));
execFileSync(process.execPath,['scripts/workflow/generate-contract.js'],{stdio:'inherit'});
