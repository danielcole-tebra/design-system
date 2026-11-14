// Imported helpers are prepended by the runner. Additive construction only.
figma.skipInvisibleInstanceChildren = false;
const page = await figma.getNodeByIdAsync('0:1');
await figma.setCurrentPageAsync(page);
if (page.children.some(n => n.name === 'Current medications · Desktop 1440')) throw new Error('Build already exists; inspect before retry');
page.name = '01 Current medications';
const created = [], imported = [], local = {}, samples = [];
const mark = n => { created.push(n.id); return n; };
await Promise.all([{family:'Akkurat LL',style:'Regular'},{family:'Akkurat LL',style:'Bold'},{family:'Inter',style:'Regular'},{family:'Inter',style:'Medium'},{family:'Inter',style:'Bold'}].map(f=>figma.loadFontAsync(f)));
const manifest = [
 ['nav','a0ddf46b289a6aeb17ad295ca709af8c9afeb7ac'],
 ['button','8fc8f57f80196e40aff7b3b1116226ea0a925120'],
 ['coral','779c8020ce9c68c7eaea65eebf9f568357082060'],
 ['field','679a3842ec3982166e616a8f294684199e2e5c94'],
 ['checkbox','243efa248e3f876e935d48c3d9c9736add2f9ef2'],
 ['switch','45071770f83c39f8d313f2307d1d978542398cdd'],
 ['tabYes','eea2fd71083e80e919a40226f98850fac8090508'],
 ['tabNo','b5fadfbc89f4a8ab6a18606ab7228d0dd2b42d2e'],
 ['head','bdc0012548d36032b28e0beb73245adeb6792ef2'],
 ['pagination','02d8c82599fac8a9d07abb7586abbb87e88fbfe9'],
 ['iconButton','e073fb6fa591240262a53206f29e6343d81ca5e3'],
 ['plus','925d1c32ce73e949f4f67701add8eb5be3ed342f'],
 ['more','67478695fcdf236a2d455730901934c0c49eb9e6'],
 ['down','9014d3426e8bc55a4b28ef279f584134ae32f06f'],
 ['chip','e5db0e4b69da285f4e36a3278a38d84208cf2617']
].map(([alias,key])=>({alias,key,type:'COMPONENT'}));
const tokenKeys = {
 ink:'5c8867e0b6f174db9f69096580158df26e39baae', muted:'0d503f1eb6c6f3e923310b2ad6e621cc940b6543', primary:'172c5580bce6e949fd9eac7ffb766a5ab3151022', paper:'f1e85cc976b10ea275c03f5d7f21a0dc12cdfee0', ground:'4dbef7c8fc453422675312ab6708eeda7e45476b', divider:'ba1923abf373a9062e989ce3ac2068f54712d80b', error:'d36d6ccf95d9ca109c7a788d5c419b99abefa2fb', core:'f9545265b644c9c79e2deb92e852841880f84343', s0:'ce161dd8d210e94082abb2b2d1731fafc1a23767',s4:'169cfdc5f2a6aa55b951ef153aa0f5e9c778e362',s8:'183d5d946d268e8bd37735b8b0dc95111c46eddd',s16:'6016592c19254dd61e9de9e006459546eaece0bb',s24:'f377dae9eb274ba0c78c22fe147a6bab50271e78',radius:'82e6514ca37ad695ccb02d0deda9b23a80a8b2ee'
};
const styleKeys = {h2:'2e2ad3d421315383c8d117a1e34e4017666511d8',h4:'888b271ed38cdcfb86c35f9de8bff5ac9b81e8e3',h5:'2ede1d5b604b7eacc72152b001bef5c2b7182c33',body1:'c87aec6a94a2e25a8a25446f8d61716cb25abe73',body2:'cdb9fe68e6b5274b6e42be16d13bb3fb7834dccb',caption:'7d2c1e680e75d61c2bafaed604ad9014fef3e981'};
const V={}, S={};
for(const [k,key] of Object.entries(tokenKeys)) V[k]=await figma.variables.importVariableByKeyAsync(key);
for(const [k,key] of Object.entries(styleKeys)) S[k]=await figma.importStyleByKeyAsync(key);
function paint(n,key,property='fills') {
 const v=V[key], value=v.resolveForConsumer(n).value;
 if(typeof value !== 'object' || !('r' in value)) throw new Error('Not a resolved color: '+key);
 n[property]=[figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:value.r,g:value.g,b:value.b},opacity:value.a === undefined ? 1 : value.a},'color',v)];
}
function gap(n,p,key) {n[p]=V[key].resolveForConsumer(n).value;n.setBoundVariable(p,V[key]);}
function padding(n,key){for(const p of ['paddingTop','paddingRight','paddingBottom','paddingLeft'])gap(n,p,key);}
function layout(name,dir,width,parent,component=false) {
 const n=mark(component?figma.createComponent():figma.createAutoLayout(dir));
 n.name=name; if(component)n.layoutMode=dir;
 n.fills=[];n.clipsContent=false;
 n.resize(width,1);n.primaryAxisSizingMode=dir==='VERTICAL'?'AUTO':'FIXED';n.counterAxisSizingMode=dir==='VERTICAL'?'FIXED':'AUTO';
 if(parent)parent.appendChild(n);else{page.appendChild(n);n.x=1800;n.y=160;}
 gap(n,'itemSpacing','s0');padding(n,'s0');return n;
}
async function txt(parent,name,value,style='body2',color='ink',width) {
 const n=mark(figma.createText()); n.name=name; n.fontName={family:'Akkurat LL',style:'Regular'};
 await n.setTextStyleIdAsync(S[style].id);n.characters=value;paint(n,color);parent.appendChild(n);
 if(width!==undefined){n.textAutoResize='HEIGHT';n.resize(width,n.height);}else n.textAutoResize='WIDTH_AND_HEIGHT';
 return n;
}
function expose(component,node,label){const key=component.addComponentProperty(label,'TEXT',node.characters);node.componentPropertyReferences={characters:key};return key;}
function bool(component,node,label,value){const key=component.addComponentProperty(label,'BOOLEAN',value);node.componentPropertyReferences={visible:key};node.visible=value;return key;}
function setP(n,base,value){const key=Object.keys(n.componentProperties).find(k=>k===base||k.startsWith(base+'#'));if(!key)throw new Error('Missing '+base+' on '+n.name);n.setProperties({[key]:value});}
function separator(n){paint(n,'divider','strokes');n.strokeWeight=1;n.strokeAlign='INSIDE';n.strokeTopWeight=0;n.strokeLeftWeight=0;n.strokeRightWeight=0;n.strokeBottomWeight=1;}
return await importComponentsForBuild(figma,manifest,async A=>{
 imported.push(...Object.values(A).map(n=>n.id));
 const fonts=new Map(); for(const m of Object.values(A)) for(const t of m.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);
 await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
 function inst(key,parent,name){const n=mark(A[key].createInstance());if(name)n.name=name;parent.appendChild(n);return n;}
 function button(parent,label,coral=false,plus=false){const n=inst(coral?'coral':'button',parent,label);setP(n,'Label',label);if(plus){setP(n,'Start icon swap',A.plus.id);setP(n,'Start icon',true);}return n;}
 function icon(parent,key,name){const n=inst('iconButton',parent,name);setP(n,'Icon',A[key].id);return n;}
 function chip(parent,label){const n=inst('chip',parent,label);setP(n,'Label',label);return n;}
 const masters=layout('Local components · Medlist · Batch 1','VERTICAL',1440,null);masters.x=1800;masters.y=160;gap(masters,'itemSpacing','s24');
 const screen=layout('Current medications · Desktop 1440','VERTICAL',1440,null);screen.x=160;screen.y=160;screen.placeholder=true;paint(screen,'ground');
 local.screen=screen.id;local.masters=masters.id;
 const nav=inst('nav',screen,'Global navigation');samples.push(nav.id);nav.resize(1440,65);
 const navPractice=nav.findOne(n=>n.type==='TEXT'&&/practice|pediatric/i.test(n.characters));
 if(navPractice)navPractice.characters='Randalls Pediatrics';

 // Compact, reusable patient context; local composition of tokens and native controls.
 const patient=layout('Medlist/Patient context','VERTICAL',1440,masters,true);paint(patient,'paper');padding(patient,'s16');gap(patient,'itemSpacing','s8');separator(patient);
 patient.description='Compact patient context for this full-page medlist proposal. Native actions, linked text styles and tokens. Not a global SDE header ruling.';
 const patientTop=layout('Identity and actions','HORIZONTAL',1408,patient);patientTop.counterAxisAlignItems='CENTER';gap(patientTop,'itemSpacing','s8');
 const identity=layout('Identity','HORIZONTAL',400,patientTop);gap(identity,'itemSpacing','s8');identity.counterAxisAlignItems='CENTER';
 const patientName=await txt(identity,'Patient name','Jane Doe','h2');expose(patient,patientName,'Patient name');chip(identity,'Restricted');identity.layoutSizingHorizontal='FILL';
 for(const [label,c] of [['More',false],['Collect payment ($151)',false],['Print',false],['Prescribe',false],['AI Note Assist',false],['New note',true]])button(patientTop,label,c);
 const patientDetails=await txt(patient,'Patient details','Legal name Jane Doe   ·   Gender Female   ·   Sex assigned at birth Female   ·   DOB 02/04/1990 (36 y/o)','body2','muted',1408);expose(patient,patientDetails,'Patient details');
 const allergy=layout('Allergies and alert','HORIZONTAL',1408,patient);gap(allergy,'itemSpacing','s8');allergy.counterAxisAlignItems='CENTER';
 await txt(allergy,'Allergies label','ALLERGIES','h5','muted');await txt(allergy,'Allergy summary','Penicillin (severe), Zofran, Nutracort, Nutriltye II, Nutropin','body2','ink');button(allergy,'View all (8)');button(allergy,'Alert (1)');
 const patientInstance=mark(patient.createInstance());screen.appendChild(patientInstance);local.patient=patient.id;

 const shell=layout('Chart workspace','HORIZONTAL',1440,screen);shell.counterAxisAlignItems='MIN';
 const rail=layout('Chart navigation','VERTICAL',192,shell);paint(rail,'paper');gap(rail,'paddingTop','s16');gap(rail,'paddingBottom','s16');
 for(const title of ['Facesheet','History','Problems','Medications','Immunizations','Allergies','Vitals','Notes','Demographics','Labs / Studies','Recall']){
  const r=layout(title,'HORIZONTAL',192,rail);padding(r,'s16');gap(r,'paddingTop','s8');gap(r,'paddingBottom','s8');r.counterAxisAlignItems='CENTER';r.resize(192,48);r.primaryAxisSizingMode='FIXED';r.counterAxisSizingMode='FIXED';
  if(title==='Medications')paint(r,'core');await txt(r,'Label',title,title==='Medications'?'h5':'body2',title==='Medications'?'primary':'ink');
 }
 const content=layout('Medications workspace','VERTICAL',1248,shell);padding(content,'s16');gap(content,'itemSpacing','s16');
 const heading=layout('Title and import','HORIZONTAL',1216,content);heading.counterAxisAlignItems='CENTER';
 const h=await txt(heading,'Page title','Medications','h2');h.layoutSizingHorizontal='FILL';const importButton=button(heading,'Import from Surescripts');samples.push(importButton.id);
 const tabs=layout('Medication views','HORIZONTAL',1216,content);separator(tabs);
 const current=inst('tabYes',tabs,'Current medications');setP(current,'Label','Current medications (12)');const history=inst('tabNo',tabs,'Medication history');setP(history,'Label','Medication history (16)');samples.push(current.id,history.id);
 const paper=layout('Current medications worklist','VERTICAL',1216,content);paint(paper,'paper');gap(paper,'cornerRadius','radius');paper.clipsContent=false;

 const toolbar=layout('Medlist/Worklist toolbar','HORIZONTAL',1216,masters,true);paint(toolbar,'paper');padding(toolbar,'s16');gap(toolbar,'itemSpacing','s8');toolbar.counterAxisAlignItems='CENTER';separator(toolbar);
 toolbar.description='Native small fields and buttons; search intentionally has no leading adornment because the published Text field has no slot.';
 function field(label,value,width,select){const n=inst('field',toolbar,label);setP(n,'Label',label);setP(n,'Value text',value);setP(n,'Show helper',false);setP(n,'select',select);setP(n,'required',false);n.resize(width,n.height);return n;}
 field('Show medications','All medications',208,true);field('Order status','All statuses',184,true);const search=field('Search drug or pharmacy','',300,false);setP(search,'Value','Empty');search.layoutSizingHorizontal='FILL';
 button(toolbar,'Add to med list',false,true);button(toolbar,'Prescribe medications',true,true);
 const toolbarI=mark(toolbar.createInstance());paper.appendChild(toolbarI);local.toolbar=toolbar.id;
 samples.push(...toolbarI.children.filter(n=>n.type==='INSTANCE').map(n=>n.id));

 const recon=layout('Medlist/Reconciliation','VERTICAL',1216,masters,true);paint(recon,'paper');padding(recon,'s16');gap(recon,'itemSpacing','s8');separator(recon);
 recon.description='Starting reconciliation state. Source behavior resets reviewed switches on reopen or refresh. Interaction outcomes are documented in the run spec.';
 const reconTop=layout('Heading and progress','HORIZONTAL',1184,recon);const rt=await txt(reconTop,'Heading','Medication reconciliation','h4');rt.layoutSizingHorizontal='FILL';await txt(reconTop,'Progress','0 of 12 reviewed','body2','muted');
 await txt(recon,'Instructions','Review every current medication before completing. Reviewed switches reset when you reopen or refresh this page.','body2','muted',1184);
 const reconControls=layout('Reconciliation actions','HORIZONTAL',1184,recon);gap(reconControls,'itemSpacing','s8');reconControls.counterAxisAlignItems='CENTER';inst('switch',reconControls,'Mark all reviewed');const ml=await txt(reconControls,'Mark all label','Mark all as reviewed','body2');ml.layoutSizingHorizontal='FILL';button(reconControls,'Complete reconciliation');
 const reconI=mark(recon.createInstance());paper.appendChild(reconI);local.reconciliation=recon.id;

 const widths=[44,300,144,136,300,96,156,40];
 const table=layout('Medication table','VERTICAL',1216,paper);const tableHead=layout('Column headings','HORIZONTAL',1216,table);paint(tableHead,'core');
 const selectionHead=layout('Select all','HORIZONTAL',44,tableHead);selectionHead.resize(44,52);selectionHead.primaryAxisSizingMode='FIXED';selectionHead.counterAxisAlignItems='CENTER';selectionHead.primaryAxisAlignItems='CENTER';inst('checkbox',selectionHead,'Select all medications');
 for(const [index,label] of [[1,'Medication'],[2,'Date / source'],[3,'Supply'],[4,'Order / pharmacy'],[5,'Reviewed'],[6,'Actions']]){const n=inst('head',tableHead,label);setP(n,'Text',label);n.resize(widths[index],52);if(index===1)samples.push(n.id);}
 const endHead=layout('Overflow column','HORIZONTAL',40,tableHead);endHead.resize(40,52);endHead.primaryAxisSizingMode='FIXED';paint(endHead,'core');

 // One status composition, with four genuine semantic variants used in the screen.
 const statusVariants=[];
 for(const [index,state] of ['Filled','Pending fill','Send failed','Patient info required'].entries()){
  const c=layout('State='+state,'VERTICAL',268,masters,true);gap(c,'itemSpacing','s8');
  c.description='Order status and pharmacy information. Error ink is bound to color/error/dark; status always has a text label.';
  await txt(c,'Status',state,'h5',index>1?'error':'ink',268);
  await txt(c,'Pharmacy','CVS Pharmacy 1709 in Target','body2','ink',268);
  await txt(c,'Phone','Phone: (850) 555-0142','body2','muted',268);statusVariants.push(c);
 }
 const statusSet=mark(figma.combineAsVariants(statusVariants,masters));statusSet.name='Medlist/Order and pharmacy';statusSet.layoutMode='HORIZONTAL';gap(statusSet,'itemSpacing','s16');padding(statusSet,'s16');statusSet.primaryAxisSizingMode='AUTO';statusSet.counterAxisSizingMode='AUTO';statusSet.fills=[];
 const pharmacyProp=statusSet.addComponentProperty('Pharmacy','TEXT','CVS Pharmacy 1709 in Target'), phoneProp=statusSet.addComponentProperty('Phone','TEXT','Phone: (850) 555-0142');
 for(const c of statusVariants){c.findOne(n=>n.name==='Pharmacy').componentPropertyReferences={characters:pharmacyProp};c.findOne(n=>n.name==='Phone').componentPropertyReferences={characters:phoneProp};}
 local.status=statusSet.id;

 const row=layout('Medlist/Medication row','HORIZONTAL',1216,masters,true);paint(row,'paper');separator(row);row.counterAxisAlignItems='MIN';
 row.description='Eight-column current-medication row. Text/visibility properties and native nested controls. Width contract 1216; content grows vertically. Instances retain native controls.';
 const rowProps={};
 function cell(name,width,pad='s16'){const c=layout(name,'VERTICAL',width,row);padding(c,pad);gap(c,'itemSpacing','s8');return c;}
 const checkCell=cell('Selection',44,'s0');gap(checkCell,'paddingTop','s8');checkCell.counterAxisAlignItems='CENTER';inst('checkbox',checkCell,'Select medication');
 const medCell=cell('Medication',300);const medTitle=await txt(medCell,'Medication name','Alprazolam 0.25 mg tablet','h5','ink',268);rowProps.medication=expose(row,medTitle,'Medication name');
 const directions=await txt(medCell,'Directions','Take 1 tablet by mouth once daily as needed for anxiety','body2','ink',268);rowProps.directions=expose(row,directions,'Directions');
 const sourceNote=await txt(medCell,'Source note','Patient-reported supplement','caption','muted',268);rowProps.note=expose(row,sourceNote,'Source note');rowProps.showNote=bool(row,sourceNote,'Show source note',false);
 const compound=chip(medCell,'Compound');rowProps.compound=bool(row,compound,'Compound',false);
 const timeline=icon(medCell,'down','Expand medication timeline');rowProps.timeline=bool(row,timeline,'Show timeline',false);
 const dateCell=cell('Date and source',144);rowProps.date=expose(row,await txt(dateCell,'Date','Sep 5, 2024','body2','ink',112),'Date');await txt(dateCell,'Source','Prescribed','caption','muted',112);await txt(dateCell,'Prescriber','Olivia Chen, MD','body2','muted',112);
 const supplyCell=cell('Supply',136);rowProps.quantity=expose(row,await txt(supplyCell,'Quantity','15 tablets','body2','ink',104),'Quantity');rowProps.duration=expose(row,await txt(supplyCell,'Duration','15 days as needed','body2','muted',104),'Duration');rowProps.refills=expose(row,await txt(supplyCell,'Refills','No refills','body2','muted',104),'Refills');
 const orderCell=cell('Order and pharmacy',300);const order=mark(statusVariants[0].createInstance());orderCell.appendChild(order);order.name='Order and pharmacy';
 const reviewCell=cell('Reviewed',96);reviewCell.counterAxisAlignItems='CENTER';inst('switch',reviewCell,'Reviewed');
 const actionsCell=cell('Actions',156);button(actionsCell,'Edit');
 const overflowCell=cell('Overflow',40,'s0');gap(overflowCell,'paddingTop','s8');overflowCell.counterAxisAlignItems='CENTER';icon(overflowCell,'more','Medication actions');
 const rowData=[
 ['Alprazolam 0.25 mg tablet','Take 1 tablet by mouth once daily as needed for anxiety','Sep 5, 2024','15 tablets','15 days as needed','No refills',0,'CVS Pharmacy 1709 in Target','(850) 555-0142','Edit'],
 ['Cetirizine 10 mg tablet','Take 1 tablet by mouth once daily as needed for allergy symptoms','Sep 5, 2024','30 tablets','30 days','1 refill',1,'Rite Aid #6','(850) 555-8080','Edit'],
 ['Aspirin 81 mg delayed-release tablet','Take 1 tablet by mouth once daily','Jul 30, 2024','90 tablets','90 days','No refills',1,'A&A Family Pharmacy','(850) 555-4706','Edit'],
 ['Doxycycline hyclate 100 mg capsule','Take 1 capsule by mouth twice daily for 7 days','Jul 30, 2024','14 capsules','7 days','No refills',1,'Rite Aid #6','(850) 555-8080','Edit'],
 ['Furosemide 20 mg tablet','Take 1 tablet by mouth every morning','Jul 30, 2024','30 tablets','30 days','No refills',1,'Rite Aid #6','(850) 555-8080','Edit'],
 ['Hydrocortisone 1% compounded cream','Apply a thin layer to the affected area twice daily for up to 7 days','Mar 14, 2024','1 tube (30 g)','7 days','No refills',1,'Accord Specialty Pharmacy','(850) 555-2642','Edit'],
 ['Melatonin 3 mg tablet','Take 1 tablet by mouth at bedtime as needed','Jan 23, 2024','30 tablets','30 days','No refills',2,'A&A Family Pharmacy','(850) 555-4706','Resend'],
 ['Metformin 500 mg tablet','Take 1 tablet by mouth twice daily with meals','Nov 19, 2023','180 tablets','90 days','No refills',0,'A&A Family Pharmacy','(850) 555-4706','Edit'],
 ['Simvastatin 20 mg tablet','Take 1 tablet by mouth at bedtime','Nov 19, 2023','90 tablets','90 days','No refills',1,'A&A Family Pharmacy','(850) 555-4706','Edit'],
 ['Acetaminophen 500 mg tablet','Take 1 tablet by mouth every 6 hours as needed for pain','Nov 19, 2023','40 tablets','10 days as needed','No refills',3,'Rite Aid #6','(850) 555-8080','View issue']
 ];
 const rows=[];
 for(const [index,d] of rowData.entries()){
  const n=mark(row.createInstance());table.appendChild(n);n.name='Medication / '+d[0];n.setProperties({[rowProps.medication]:d[0],[rowProps.directions]:d[1],[rowProps.date]:d[2],[rowProps.quantity]:d[3],[rowProps.duration]:d[4],[rowProps.refills]:d[5],[rowProps.showNote]:index===6,[rowProps.compound]:index===5,[rowProps.timeline]:index===0});
  const status=n.findOne(c=>c.type==='INSTANCE'&&c.name==='Order and pharmacy');status.setProperties({State:['Filled','Pending fill','Send failed','Patient info required'][d[6]],[pharmacyProp]:d[7],[phoneProp]:'Phone: '+d[8]});
  const action=n.findOne(c=>c.type==='INSTANCE'&&c.name==='Edit');setP(action,'Label',d[9]);action.name=d[9];rows.push(n.id);
 }
 local.row=row.id;local.rows=rows;
 const pagination=inst('pagination',paper,'Medication pagination');pagination.resize(1216,52);const count=pagination.findOne(n=>n.type==='TEXT'&&n.characters==='1–10 of 100');if(!count)throw new Error('Pagination range label missing');count.characters='1–10 of 12';samples.push(pagination.id);
 // Exercise official binding helper on local composition; paint is seeded with resolved RGB/alpha.
 await bindVariablesToComponent(paper,{fills:V.paper.id,cornerRadius:V.radius.id});
 screen.placeholder=false;
 rail.resize(192,content.height);rail.primaryAxisSizingMode='FIXED';
 const readme=layout('README · Batch 1 · Review before more flows','VERTICAL',1216,null);readme.x=1800;readme.y=masters.y+masters.height+80;paint(readme,'ground');padding(readme,'s24');gap(readme,'itemSpacing','s16');
 await txt(readme,'Title','Current medications · Native rebuild','h2','ink',1168);
 await txt(readme,'Scope','First review batch: a 1440 px worklist and reusable local patient context, toolbar, reconciliation, order/pharmacy and medication-row components. Uses Design System Rebuild instances, variables and text styles. Local components are not published library assets.','body1','ink',1168);
 await txt(readme,'States','Ten of twelve medications are shown; none reviewed or selected. Four order statuses are represented. The first medication exposes its timeline action. Compound and patient-reported metadata remain visible.','body2','muted',1168);
 await txt(readme,'Boundaries','Static composition for Daniel’s review. Filtering, reconciliation, history, add/edit, prescribing, import and recovery flows are documented for subsequent batches; this screen is not a played-through prototype. Native search has no leading icon. Table headings retain published library formatting.','body2','muted',1168);
 await txt(readme,'References','Source: eRx Concepts A01 / Current medications · 11198:3155. Design System Rebuild: YX2n4YLrEpBXNbcc73T6dw. SDE informs compact context and spacing; this file does not change SDE. Evidence and action contract: runs/2026-11-14-medlist-native.','caption','muted',1168);
 local.readme=readme.id;
 figma.viewport.scrollAndZoomIntoView([screen]);
 return {createdNodeIds:created,importedMasterIds:imported,mutatedNodeIds:[page.id],local,samples,screen:{width:screen.width,height:screen.height},rowBounds:rows.map(id=>{const n=figma.getNodeById(id);return{id,width:n.width,height:n.height}}),tokenBindings:Object.fromEntries(Object.entries(V).map(([k,v])=>[k,{id:v.id,name:v.name,key:v.key}])),styles:Object.fromEntries(Object.entries(S).map(([k,v])=>[k,{id:v.id,name:v.name,key:v.key}]))};
});
