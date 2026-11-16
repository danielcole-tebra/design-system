figma.skipInvisibleInstanceChildren=false;
const page=figma.currentPage;
if(page.children.some(n=>n.name==='Trial · Five-column medication list'))throw new Error('Trial already exists; inspect before retry');
const source=await figma.getNodeByIdAsync('130:5881'),oldSet=await figma.getNodeByIdAsync('91:10288');
const fonts=new Map();for(const root of [source,oldSet])for(const t of root.findAllWithCriteria({types:['TEXT']}))for(const seg of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(seg.fontName),seg.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
function snapshot(n){return JSON.stringify([n,...n.findAll()].map(c=>({id:c.id,name:c.name,visible:c.visible,x:c.x,y:c.y,w:c.width,h:c.height,text:c.type==='TEXT'?c.characters:null,reactions:c.reactions})));}
const before=snapshot(source),beforeSet=snapshot(oldSet);
const ledger=[];function keep(n){ledger.push(n);return n;}
const tokens={};for(const [name,id] of Object.entries({zero:'VariableID:ce161dd8d210e94082abb2b2d1731fafc1a23767/997:34',four:'VariableID:169cfdc5f2a6aa55b951ef153aa0f5e9c778e362/997:8',eight:'VariableID:183d5d946d268e8bd37735b8b0dc95111c46eddd/997:15',sixteen:'VariableID:6016592c19254dd61e9de9e006459546eaece0bb/997:24'}))tokens[name]=await figma.variables.getVariableByIdAsync(id);
function spacing(n,p,t){n.setBoundVariable(p,tokens[t]);}
function find(n,name,type){return n.findOne(c=>c.name===name&&(!type||c.type===type));}
function width(n,w){n.resize(w,n.height);if(n.type==='TEXT'){n.textAutoResize='HEIGHT';n.textTruncation='DISABLED';n.maxLines=null;}else if(n.layoutMode==='VERTICAL')n.primaryAxisSizingMode='AUTO';}
function txt(n,w){n.textAutoResize='HEIGHT';n.resize(w,n.height);n.layoutSizingHorizontal='FIXED';n.layoutSizingVertical='HUG';n.textTruncation='DISABLED';n.maxLines=null;}
function label(n,v){const k=Object.keys(n.componentProperties).find(k=>k.split('#')[0]==='Label');n.setProperties({[k]:v});}
function wire(n,dest,navigation){return n.setReactionsAsync([{trigger:{type:'ON_CLICK'},actions:[{type:'NODE',destinationId:dest.id,navigation,transition:null}]}]);}
const set=keep(oldSet.clone());page.appendChild(set);set.name='Medlist/Five-column inline row';set.x=160;set.y=1880;
const keyMap={};for(const k of Object.keys(oldSet.componentPropertyDefinitions))keyMap[k]=Object.keys(set.componentPropertyDefinitions).find(x=>x.split('#')[0]===k.split('#')[0]);
function refs(a,b){if(a.componentPropertyReferences){const p={...a.componentPropertyReferences};for(const k of Object.keys(p))if(keyMap[p[k]])p[k]=keyMap[p[k]];b.componentPropertyReferences=p;}if(a.type!=='INSTANCE'&&'children'in a)a.children.forEach((c,i)=>refs(c,b.children[i]));}
oldSet.children.forEach((a,i)=>refs(a,set.children[i]));
const providerKey=set.addComponentProperty('Prescriber','TEXT','Olivia Chen, MD');
const variants=[];
for(const m of [...set.children]){
 const expanded=m.name==='Disclosure=Expanded';m.name='Disclosure='+(expanded?'Expanded':'Collapsed')+', Mode=List, Reviewed=No';
 const sum=find(m,'Summary'),med=find(m,'Medication','FRAME'),date=find(m,'Date and source','FRAME'),supply=find(m,'Supply','FRAME'),order=find(m,'Order and pharmacy','FRAME'),actions=find(m,'Actions','FRAME');
 find(m,'Selection','FRAME').visible=false;find(m,'Reviewed','FRAME').visible=false;
 width(med,420);const first=find(m,'Medication first line');width(first,404);first.minHeight=20;first.primaryAxisSizingMode='FIXED';first.counterAxisSizingMode='AUTO';txt(find(m,'Medication name'),404);
 const supporting=find(m,'Medication supporting details');supporting.visible=true;width(supporting,404);txt(find(m,'Directions'),404);
 const provider=keep(date.clone());sum.insertChild(2,provider);provider.name='Prescriber / source';for(const c of provider.children)c.visible=false;width(provider,160);
 const prescriber=find(date,'Prescriber');provider.appendChild(prescriber);prescriber.componentPropertyReferences={characters:providerKey};prescriber.visible=true;txt(prescriber,144);
 const sourceNote=find(m,'Source note');provider.appendChild(sourceNote);txt(sourceNote,144);
 width(date,160);date.name='Last activity column';find(date,'Date and source supporting details').visible=false;const df=find(date,'Date first line');width(df,144);df.minHeight=20;df.counterAxisSizingMode='AUTO';txt(find(date,'Last activity'),144);
 width(order,200);const of=find(order,'Order first line');width(of,184);of.minHeight=20;of.counterAxisSizingMode='AUTO';const status=find(order,'Summary status');width(status,184);status.layoutSizingHorizontal='FILL';
 const detail=keep(figma.createAutoLayout('HORIZONTAL'));m.appendChild(detail);detail.name='Inline prescription details';detail.fills=find(m,'Superseded detail panel · Retained wrappers').fills;detail.resize(1216,100);detail.primaryAxisSizingMode='FIXED';detail.counterAxisSizingMode='AUTO';spacing(detail,'itemSpacing','zero');detail.visible=expanded;
 detail.appendChild(supply);width(supply,420);find(supply,'Supply','TEXT').visible=true;txt(find(supply,'Supply','TEXT'),404);const qf=find(supply,'Quantity first line');width(qf,404);qf.minHeight=16;qf.counterAxisSizingMode='AUTO';txt(find(supply,'Quantity'),404);const sf=find(supply,'Supply supporting details');sf.visible=true;width(sf,404);for(const t of sf.children)if(t.type==='TEXT')txt(t,404);
 const compound=find(supporting,'Compound');supply.appendChild(compound);
 const pharm=keep(figma.createAutoLayout('VERTICAL'));detail.appendChild(pharm);pharm.name='Pharmacy detail column';pharm.fills=[];pharm.resize(520,60);pharm.primaryAxisSizingMode='AUTO';spacing(pharm,'itemSpacing','four');for(const p of ['paddingTop','paddingBottom','paddingLeft','paddingRight'])spacing(pharm,p,'eight');
 const heading=keep(find(m,'Pharmacy','TEXT').clone());pharm.appendChild(heading);heading.visible=true;txt(heading,504);
 const pf=find(order,'Order supporting details');pharm.appendChild(pf);pf.visible=true;width(pf,504);const fields=find(pf,'Pharmacy fields');width(fields,504);fields.layoutSizingHorizontal='FILL';
 sum.counterAxisSizingMode='AUTO';sum.minHeight=80;
 variants.push(m);
}
const baseVariants=[...variants];for(const base of baseVariants)for(const reviewed of ['No','Yes']){
 const m=keep(base.clone());set.appendChild(m);m.name=base.name.replace('Mode=List','Mode=Review').replace('Reviewed=No','Reviewed='+reviewed);refs(base,m);
 const sel=find(m,'Selection','FRAME');sel.visible=true;sel.name='Review checkbox';const checkbox=sel.children.find(n=>n.type==='INSTANCE');checkbox.name='Mark medication reviewed';checkbox.setProperties({checked:reviewed==='Yes'?'checked':'unchecked'});
 const med=find(m,'Medication','FRAME');width(med,376);for(const f of med.children)if(f.type==='FRAME'){width(f,360);for(const t of f.children)if(t.type==='TEXT')txt(t,360);}
 variants.push(m);
}
for(const m of variants){const expanded=m.name.includes('Disclosure=Expanded'),mode=m.name.includes('Mode=Review')?'Review':'List',reviewed=m.name.includes('Reviewed=Yes')?'Yes':'No';
 const counterpart=variants.find(n=>n.name===m.name.replace('Disclosure='+(expanded?'Expanded':'Collapsed'),'Disclosure='+(expanded?'Collapsed':'Expanded')));await wire(find(m,'Toggle details'),counterpart,'CHANGE_TO');
 if(mode==='Review'){const dest=variants.find(n=>n.name===m.name.replace('Reviewed='+reviewed,'Reviewed='+(reviewed==='Yes'?'No':'Yes')));await wire(find(m,'Mark medication reviewed'),dest,'CHANGE_TO');}
 m.x=24+(mode==='List'?0:reviewed==='No'?1280:2560);m.y=24+(expanded?300:0);
}
set.resizeWithoutConstraints(3840,600);set.description='Five-column non-drawer trial requested by Daniel 2026-11-16. Medication identity and directions always visible; prescriber/source separate; supply and pharmacy in inline Details. Dedicated Review mode uses one checkbox per medication. Native controls retained. Local composition only.';
const screen=keep(source.clone());page.appendChild(screen);screen.name='Trial · Five-column medication list';screen.x=1760;screen.y=160;
const table=find(screen,'Medication table');const sourceTable=await figma.getNodeByIdAsync('130:5931');const sourceRows=sourceTable.children.filter(n=>n.visible&&n.type==='INSTANCE');
for(const n of table.children)if(n.type==='INSTANCE')n.visible=false;
const header=table.children.find(n=>n.visible&&n.type==='FRAME');header.name='Five-column headings';const cols=header.children;
cols[0].visible=false;cols[5].visible=false;
const config=[[cols[1],420,'Medication'],[cols[3],160,'Prescriber / source'],[cols[2],160,'Last activity'],[cols[4],200,'Order status'],[cols[6],276,'Actions']];
for(const [c,w,title]of config){header.appendChild(c);c.name='Header column / '+title;width(c,w);const cell=c.children.find(n=>n.type==='INSTANCE');width(cell,w-16);cell.setProperties({'Text#190:0':title});}
const collapsed=variants.find(n=>n.name==='Disclosure=Collapsed, Mode=List, Reviewed=No');
const rows=[];
for(const src of sourceRows){const r=keep(collapsed.createInstance());table.appendChild(r);r.name=src.name.replace('/ Comparison F','/ Five-column');
 const props={};for(const [k,v]of Object.entries(src.componentProperties)){const nk=Object.keys(r.componentProperties).find(x=>x.split('#')[0]===k.split('#')[0]);if(nk&&k!=='Disclosure')props[nk]=v.value;}props[providerKey]=find(src,'Prescriber').characters;r.setProperties(props);
 for(const name of ['Summary status','Pharmacy fields']){const target=find(r,name),s=find(src,name);target.setProperties(Object.fromEntries(Object.entries(s.componentProperties).map(([k,v])=>[k,v.value])));for(const t of target.children)if(t.type==='TEXT'){const st=s.children.find(n=>n.name===t.name&&n.type==='TEXT');t.visible=st.visible;await t.setTextStyleIdAsync(st.textStyleId);t.fills=st.fills;}}
 label(find(r,'Edit'),find(src,'Edit').findOne(n=>n.type==='TEXT'&&n.name==='Label').characters);
 rows.push(r);
}
const workspace=find(screen,'Medications workspace'),worklist=find(screen,'Current medications worklist');const utility=find(screen,'Reconciliation utility row');workspace.insertChild(2,utility);utility.name='Review summary and entry';
 find(utility,'Mark all reviewed controls').visible=false;find(utility,'Reconciliation status').characters='Last reconciled Nov 2, 2026, 1:59 PM PST · Olivia Chen, MD';label(find(utility,'Complete reconciliation'),'Reconcile medications');find(utility,'Complete reconciliation').name='Enter reconciliation';
const rail=find(screen,'Chart navigation');rail.resize(192,workspace.height);rail.layoutSizingVertical='FIXED';
const review=keep(screen.clone());page.appendChild(review);review.name='Trial · Reconcile medications';review.x=3360;review.y=160;
const reviewTable=find(review,'Medication table'),reviewRows=reviewTable.children.filter(n=>n.visible&&n.type==='INSTANCE');for(const r of reviewRows)r.setProperties({Mode:'Review',Reviewed:'No'});
const rh=find(review,'Five-column headings');const select=rh.children.find(n=>n.name==='Select all');select.visible=true;rh.insertChild(0,select);const selectControl=select.children.find(n=>n.type==='INSTANCE');selectControl.visible=false;select.name='Review checkbox gutter';
const mh=rh.children.find(n=>n.name==='Header column / Medication');width(mh,376);width(mh.children.find(n=>n.type==='INSTANCE'),360);
const ru=find(review,'Review summary and entry');find(ru,'Reconciliation status').characters='Review current medications · Check each medication after review';const finish=find(ru,'Enter reconciliation');label(finish,'Complete reconciliation');finish.name='Complete reconciliation';const cancel=keep(finish.clone());ru.insertChild(ru.children.indexOf(finish),cancel);label(cancel,'Cancel');cancel.name='Cancel reconciliation';cancel.resize(72,30);
const completed=keep(screen.clone());page.appendChild(completed);completed.name='Trial · Reconciliation completed';completed.x=4960;completed.y=160;find(completed,'Reconciliation status').characters='Reconciliation completed · Olivia Chen, MD · Just now';
await wire(find(screen,'Enter reconciliation'),review,'NAVIGATE');await wire(find(completed,'Enter reconciliation'),review,'NAVIGATE');await wire(finish,completed,'NAVIGATE');await wire(cancel,screen,'NAVIGATE');
for(const s of [review,completed]){const ws=find(s,'Medications workspace');find(s,'Chart navigation').resize(192,ws.height);}
const detailExample=keep(rows[0].clone());page.appendChild(detailExample);detailExample.name='Inspection · Five-column expanded row';detailExample.x=1760;detailExample.y=1680;detailExample.setProperties({Disclosure:'Expanded'});
const note=keep(find(source,'Reconciliation status').clone());page.appendChild(note);note.name='README · Five-column trial';note.characters='16 Nov 2026 · Five-column non-drawer trial · Awaiting Daniel’s visual review\nMedication + directions / Prescriber or source / Last activity / Order status / Actions. Supply and pharmacy remain in inline Details.\nDedicated reconciliation entry, per-row checkboxes, Cancel and completion return are wired. Completion copy is a prototype fixture; validation, persistence and all 12 medications are not implemented.\nOriginal F is preserved at left. Drawer and running comparison remain unchanged. The patient-reported Melatonin fixture also contains a prescriber and failed order; retained for clarification.';note.textAutoResize='HEIGHT';note.resize(1440,150);note.x=1760;note.y=1480;
const starts=new Map(page.flowStartingPoints.map(s=>[s.nodeId,s]));starts.set(screen.id,{nodeId:screen.id,name:'Five-column non-drawer trial'});page.flowStartingPoints=[...starts.values()];
function encodeIds(ids){const direct=[],groups={};for(const id of ids){const i=id.indexOf(';');if(i<0)direct.push(id);else(groups[id.slice(0,i)]??=[]).push(id.slice(i+1));}const profiles=[],lookup=new Map(),instances={};for(const [prefix,suffixes]of Object.entries(groups)){const key=JSON.stringify(suffixes);if(!lookup.has(key)){lookup.set(key,profiles.length);profiles.push(suffixes);}instances[prefix]=lookup.get(key);}return{encoding:'direct IDs; for each instances prefix, concatenate prefix + semicolon + each suffix in profiles[index]',count:ids.length,direct,profiles,instances};}
const ids=[...new Set(ledger.flatMap(n=>[n.id,...('children'in n?n.findAll().map(c=>c.id):[])]))];
return {createdNodeIds:encodeIds(ids),mutatedNodeIds:[page.id],screenId:screen.id,reviewId:review.id,completedId:completed.id,setId:set.id,variants:variants.map(m=>({id:m.id,name:m.name,width:m.width,height:m.height})),headerId:header.id,rowIds:rows.map(r=>r.id),reviewRowIds:reviewRows.map(r=>r.id),detailExampleId:detailExample.id,noteId:note.id,providerKey,sourceUnchanged:before===snapshot(source),sourceSetUnchanged:beforeSet===snapshot(oldSet),dimensions:[screen.width,screen.height],builtAt:new Date().toISOString()};
