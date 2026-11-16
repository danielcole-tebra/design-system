figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('1319:4655'));
if(figma.currentPage.children.some(n=>n.name==='11/16 · Problems / List body'))throw new Error('Translation already exists; inspect before retry');
const setsKeys={buttons:'cfb726c79b456d52901243b7c33839efd0780a93',chips:'1c8149de35a3b84dbc41a7e5d726020dfb865db4',fields:'7c3c99bb9a9392d6571c0557b41d142b8987b566',labels:'77cfa2d6c7b4601fc5a311028da35f42fc8f3ebb',icons:'7ebea5d7ce6ecfdaef84d177efa64196f654717d',dividers:'e1a369ce1b663c8e203a59c18f522108c62c8e6e'};
const varKeys={paper:'f1e85cc976b10ea275c03f5d7f21a0dc12cdfee0',ink:'5c8867e0b6f174db9f69096580158df26e39baae',muted:'0d503f1eb6c6f3e923310b2ad6e621cc940b6543',primary:'172c5580bce6e949fd9eac7ffb766a5ab3151022',success:'8dd12ab4ede9eb9217b446539b6e9f76aad03285',divider:'ba1923abf373a9062e989ce3ac2068f54712d80b',hover:'18ef3330ddea4aa764ebd41fa62a1aa19fef0df7',s4:'169cfdc5f2a6aa55b951ef153aa0f5e9c778e362',s8:'183d5d946d268e8bd37735b8b0dc95111c46eddd',s16:'6016592c19254dd61e9de9e006459546eaece0bb',s24:'f377dae9eb274ba0c78c22fe147a6bab50271e78'};
const styleKeys={h4:'888b271ed38cdcfb86c35f9de8bff5ac9b81e8e3',body1:'c87aec6a94a2e25a8a25446f8d61716cb25abe73',body2:'cdb9fe68e6b5274b6e42be16d13bb3fb7834dccb',caption:'7d2c1e680e75d61c2bafaed604ad9014fef3e981',subtitle:'8045fb3d53b4cbb27ea59eaa89dc4eaeff14eaa7'};
const [sets,vars,styles,calendar,check,shell]=await Promise.all([
Promise.all(Object.entries(setsKeys).map(async([k,v])=>[k,await figma.importComponentSetByKeyAsync(v)])).then(Object.fromEntries),
Promise.all(Object.entries(varKeys).map(async([k,v])=>[k,await figma.variables.importVariableByKeyAsync(v)])).then(Object.fromEntries),
Promise.all(Object.entries(styleKeys).map(async([k,v])=>[k,await figma.importStyleByKeyAsync(v)])).then(Object.fromEntries),
figma.importComponentByKeyAsync('4b107655a1c634462518b1d88aec458f78e8d9b4'),figma.importComponentByKeyAsync('1d4c541ed110fd85da90bbf71b351ce72737ec95'),figma.getNodeByIdAsync('6:800')]);
const fonts=new Map();for(const n of [shell,...Object.values(sets)])for(const t of n.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);for(const s of Object.values(styles))fonts.set(JSON.stringify(s.fontName),s.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const created=[],mutated=[],controls=[],masters=[];
function paint(v,n){const c=v.resolveForConsumer(n).value;return figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:c.r,g:c.g,b:c.b},opacity:c.a??1},'color',v);}
function own(n){created.push(n.id);return n;}
function auto(name,parent,dir='HORIZONTAL',gap='s8'){const n=own(figma.createAutoLayout(dir));n.name=name;n.fills=[];if(parent)parent.appendChild(n);n.setBoundVariable('itemSpacing',vars[gap]);return n;}
function comp(name,width){const n=own(figma.createComponent());n.name=name;n.description='Page-local composition using Design System Rebuild controls; original designs are retained below.';n.layoutMode='VERTICAL';n.resize(width,10);n.primaryAxisSizingMode='AUTO';n.counterAxisSizingMode='FIXED';n.fills=[];masters.push(n);return n;}
function variant(set,props){const n=set.children.find(c=>c.type==='COMPONENT'&&Object.entries(props).every(([k,v])=>c.variantProperties[k]===v));if(!n)throw new Error('Missing variant '+set.name+JSON.stringify(props));return n;}
function inst(master,parent,name){const n=own(master.createInstance());if(parent)parent.appendChild(n);if(name)n.name=name;controls.push(n);return n;}
async function text(parent,value,style='body2',color='ink'){const n=own(figma.createText());parent.appendChild(n);await n.setTextStyleIdAsync(styles[style].id);n.characters=value;n.fills=[paint(vars[color],n)];return n;}
function pad(n,k){for(const p of ['paddingLeft','paddingRight','paddingTop','paddingBottom'])n.setBoundVariable(p,vars[k]);}
function fill(n){n.layoutSizingHorizontal='FILL';}
function button(parent,label,size='small',color='primary',kind='contained',plus=false){const n=inst(variant(sets.buttons,{size,color,variant:kind,State:'Default'}),parent,label);n.setProperties({'Label#83:165':label,'Start icon#83:220':plus});return n;}
function chip(parent,label,color='default',size='small',kind='filled'){const n=inst(variant(sets.chips,{size,color,variant:kind,State:'Default'}),parent,label);n.setProperties({'Label#156:0':label});return n;}
function line(parent,width){const n=inst(variant(sets.dividers,{orientation:'horizontal'}),parent);n.resize(width,1);fill(n);return n;}
function field(parent,label,value,width,select=false,multiline=false){const n=inst(variant(sets.fields,{size:'small',State:'Default',Value:'Filled',Fill:'Paper'}),parent,label);n.setProperties({'Label#123:0':label,'Value text#123:11':value,'Show helper#123:33':false,'select#123:55':select,'multiline#123:66':multiline});n.resize(width,n.height);n.layoutSizingVertical='HUG';return n;}
function icon(parent,master,name){const n=inst(variant(sets.icons,{color:'default',size:'medium',State:'Default'}),parent,name);n.setProperties({'Icon#170:0':master.id});return n;}
const row=comp('SCAFFOLDING · Problems / Row',518);row.layoutMode='HORIZONTAL';row.resize(518,80);row.primaryAxisSizingMode='FIXED';row.counterAxisSizingMode='FIXED';row.counterAxisAlignItems='CENTER';row.setBoundVariable('itemSpacing',vars.s8);
const stripe=own(figma.createRectangle());row.appendChild(stripe);stripe.name='Active indicator';stripe.resize(2,56);stripe.fills=[paint(vars.success,stripe)];const showStripe=row.addComponentProperty('Show active indicator','BOOLEAN',true);stripe.componentPropertyReferences={visible:showStripe};
const copy=auto('Problem identity',row,'VERTICAL','s8');fill(copy);
const titleRow=auto('Problem and status',copy);titleRow.counterAxisAlignItems='CENTER';fill(titleRow);
const title=await text(titleRow,'Low back pain','h4','primary');const titleProp=row.addComponentProperty('Problem','TEXT','Low back pain');title.componentPropertyReferences={characters:titleProp};
chip(titleRow,'Active','success');
const metadata=await text(copy,'M54.50  ·  onset March 2020  ·  Acute','caption','muted');const metadataProp=row.addComponentProperty('Metadata','TEXT',metadata.characters);metadata.componentPropertyReferences={characters:metadataProp};
const actions=auto('Problem actions',row);actions.counterAxisAlignItems='CENTER';button(actions,'Edit');button(actions,'Note','small','primary','contained',true);
const list=comp('SCAFFOLDING · Problems / List body',518);list.setBoundVariable('itemSpacing',vars.s8);
const top=auto('No known problems and Add',list);fill(top);top.counterAxisAlignItems='CENTER';top.primaryAxisAlignItems='SPACE_BETWEEN';
const checkLabel=inst(variant(sets.labels,{State:'Default'}),top,'No known problems');checkLabel.setProperties({'Label#140:0':'No known problems'});
button(top,'Add','medium','primary','contained',true);
async function section(label){const n=auto(label,list);fill(n);n.counterAxisAlignItems='CENTER';await text(n,label,'subtitle','muted');const d=line(n,300);const caret=inst(variant(sets.icons,{color:'default',size:'small',State:'Default'}),n,'Collapse section');return n;}
async function problem(name,status,meta,active,inNote){const n=inst(row,list,name);fill(n);n.setProperties({[titleProp]:name,[metadataProp]:meta,[showStripe]:active});const badge=n.findAllWithCriteria({types:['INSTANCE']}).find(c=>c.name==='Active');badge.setProperties({'Label#156:0':status,color:active?'success':'default'});if(inNote){const note=n.findAllWithCriteria({types:['INSTANCE']}).find(c=>c.name==='Note');note.setProperties({'Label#83:165':'In note','Start icon swap#83:331':check.id});}return n;}
await section('ACTIVE (2)');
const low=await problem('Low back pain','Active','M54.50  ·  onset March 2020  ·  Acute',true,true);
line(list,518);
await problem('Depression, unspecified','Recurrence','F32.A  ·  onset March 2020  ·  Chronic',true,false);
await section('INACTIVE / RESOLVED (2)');
await problem('Hypertension','Resolved','M54.50  ·  onset March 2020  ·  Acute',false,false);
line(list,518);
await problem('Anxiety, unspecified','Inactive','F32.A  ·  onset March 2020  ·  Chronic',false,false);
const details=comp('SCAFFOLDING · Problems / Details body',518);details.setBoundVariable('itemSpacing',vars.s16);
const summary=auto('Problem summary',details,'VERTICAL');fill(summary);const sr=auto('Problem and status',summary);sr.counterAxisAlignItems='CENTER';await text(sr,'Low back pain','h4');chip(sr,'Active','success');await text(summary,'M54.50  ·  onset March 2020  ·  Acute','caption','muted');
const editing=auto('Editing status',details);fill(editing);pad(editing,'s8');editing.fills=[paint(vars.hover,editing)];await text(editing,'Editing','body2','primary');
const codeField=field(details,'Problem or ICD-10 Code','Low back pain M540.50',518,true);fill(codeField);
const statusRow=auto('Status and duration',details);fill(statusRow);statusRow.counterAxisAlignItems='CENTER';statusRow.setBoundVariable('itemSpacing',vars.s16);const status=field(statusRow,'Status','Active',320,true);fill(status);chip(statusRow,'Acute','default','medium','outlined');chip(statusRow,'Chronic','info','medium');
const dates=auto('Dates',details);fill(dates);dates.setBoundVariable('itemSpacing',vars.s16);
for(const label of ['Onset','Abatement']){const pair=auto('SCAFFOLDING · '+label+' field and calendar',dates);pair.resize(251,40);pair.counterAxisAlignItems='CENTER';const f=field(pair,label,'11/21/24',203);fill(f);icon(pair,calendar,'Open '+label.toLowerCase()+' calendar');}
const certainty=auto('Certainty',details,'VERTICAL');fill(certainty);await text(certainty,'CERTAINTY','caption','muted');const options=auto('Certainty options',certainty);fill(options);
for(const label of ['Unconfirmed','Provisional','Confirmed','Differential','Refuted'])chip(options,label,label==='Provisional'?'info':'default','medium',label==='Provisional'?'filled':'outlined');
const comments=field(details,'Comments','Insert comments here\n\n',518,false,true);fill(comments);
list.x=0;list.y=1900;details.x=760;details.y=1900;row.x=1400;row.y=1900;

const page=figma.currentPage;page.name='Updated 11/16';mutated.push(page.id);
row.name='11/16 · Problems / Row';list.name='11/16 · Problems / List body';details.name='11/16 · Problems / Edit Low back pain';
for(const root of [row,list,details])for(const n of [root,...root.findAllWithCriteria({types:['FRAME']})]){let p=n.parent,library=false;while(p&&p!==root){if(p.type==='INSTANCE'){library=true;break;}p=p.parent;}if(!library&&'clipsContent'in n)n.clipsContent=false;}
comments.setProperties({'Value text#123:11':'Insert comments here'});comments.findAllWithCriteria({types:['TEXT']}).find(n=>n.name==='Multiline rows').characters='\n';
const bodyCopies=[details];
const editData=[
{title:'Low back pain',status:'Active',metadata:'M54.50  ·  onset March 2020  ·  Acute',code:'Low back pain M540.50'},
{title:'Depression, unspecified',status:'Recurrence',metadata:'F32.A  ·  onset March 2020  ·  Chronic',code:'Depression, unspecified F32.A'},
{title:'Hypertension',status:'Resolved',metadata:'M54.50  ·  onset March 2020  ·  Acute',code:'Hypertension M54.50'},
{title:'Anxiety, unspecified',status:'Inactive',metadata:'F32.A  ·  onset March 2020  ·  Chronic',code:'Anxiety, unspecified F32.A'}
];
for(let i=1;i<4;i++){const c=own(details.clone());page.appendChild(c);c.name='11/16 · Problems / Edit '+editData[i].title;const sum=c.children.find(n=>n.name==='Problem summary');const texts=sum.findAllWithCriteria({types:['TEXT']}).filter(n=>!n.id.includes(';'));texts[0].characters=editData[i].title;texts[1].characters=editData[i].metadata;sum.findAllWithCriteria({types:['INSTANCE']}).find(n=>n.name==='Active').setProperties({'Label#156:0':editData[i].status,color:i===1?'success':'default'});c.children.find(n=>n.name==='Problem or ICD-10 Code').setProperties({'Value text#123:11':editData[i].code});c.children.find(n=>n.name==='Status and duration').children.find(n=>n.type==='INSTANCE'&&n.name==='Status').setProperties({'Value text#123:11':editData[i].status});bodyCopies.push(c);}
const blank=own(details.clone());page.appendChild(blank);blank.name='11/16 · Problems / New body';blank.children.find(n=>n.name==='Problem summary').visible=false;blank.children.find(n=>n.name==='Editing status').children.find(n=>n.type==='TEXT').characters='New problem';
const blankFields=blank.findAllWithCriteria({types:['INSTANCE']}).filter(n=>['Problem or ICD-10 Code','Onset','Abatement','Comments'].includes(n.name)).map(n=>n.id);for(const id of blankFields){const n=await figma.getNodeByIdAsync(id);n.setProperties({Value:'Empty','Value text#123:11':''});}
const newBodies=[blank,...bodyCopies];const col=figma.variables.createVariableCollection('11/16 · Problems sidesheet workflow');const visVars=[];
for(let i=0;i<5;i++){const v=figma.variables.createVariable(['new','edit-low-back-pain','edit-depression','edit-hypertension','edit-anxiety'][i],col,'BOOLEAN');v.scopes=['ALL_SCOPES'];v.setValueForMode(col.modes[0].modeId,false);visVars.push(v);}
function setBool(v,value){return {type:'SET_VARIABLE',variableId:v.id,variableValue:{type:'BOOLEAN',resolvedType:'BOOLEAN',value}};}
const closeActions=visVars.map(v=>setBool(v,false));
async function click(n,actions){await n.setReactionsAsync([{trigger:{type:'ON_CLICK'},actions}]);}
async function open(n,index){await click(n,visVars.map((v,i)=>setBool(v,i===index)));}
const frameIds=['1319:4656','1319:5753','1319:6853','1319:7973','1319:9096','1319:10195','1319:11323'];
const changedBodies=[],overlays=[],proof=[];
for(const frameId of frameIds){
 const frame=await figma.getNodeByIdAsync(frameId);
 const bodies=frame.findAll(n=>n.type==='FRAME'&&n.name==='SCAFFOLDING · Problems body · NDE Rebuild');
 for(const body of bodies){
  for(const child of body.children){if(child.boundVariables?.visible)child.setBoundVariable('visible',null);child.visible=false;mutated.push(child.id);}
  const content=inst(list,body,'11/16 · Problems on-canvas content');content.resize(body.width-body.paddingLeft-body.paddingRight,content.height);fill(content);content.layoutSizingVertical='HUG';
  const rows=content.children.filter(n=>n.type==='INSTANCE'&&editData.some(d=>d.title===n.name));
  const add=content.findAllWithCriteria({types:['INSTANCE']}).find(n=>n.name==='Add');await open(add,0);
  for(let i=0;i<rows.length;i++){const edit=rows[i].findAllWithCriteria({types:['INSTANCE']}).find(n=>n.name==='Edit');await open(edit,i+1);}
  changedBodies.push(body.id);mutated.push(body.id);
 }
 const backdropSource=frame.children.find(n=>n.name==='SCAFFOLDING · Alpha Problem Details · work').children.find(n=>n.type==='RECTANGLE');
 for(let i=0;i<5;i++){
  const layer=own(figma.createFrame());frame.appendChild(layer);layer.name='11/16 · '+(i===0?'New Problem':'Edit '+editData[i-1].title)+' · modal layer';layer.resize(frame.width,frame.height);layer.x=0;layer.y=0;layer.fills=[];layer.setBoundVariable('visible',visVars[i]);layer.visible=false;layer.clipsContent=true;
  const backdrop=own(backdropSource.clone());layer.appendChild(backdrop);backdrop.x=0;backdrop.y=0;backdrop.resize(frame.width,frame.height);await click(backdrop,closeActions);
  const sheet=inst(shell,layer,i===0?'Sidesheet · New Problem':'Sidesheet · Problem Details');sheet.setProperties({'Title#279:0':i===0?'New Problem':'Problem Details','Body content#279:5':newBodies[i].id});sheet.resize(550,frame.height);sheet.x=frame.width-550;sheet.y=0;
  const title=sheet.children.find(n=>n.name==='Header').children.find(n=>n.type==='TEXT');title.characters=i===0?'New Problem':'Problem Details';title.textAutoResize='HEIGHT';title.resize(title.width,32);
  const cancel=sheet.findAllWithCriteria({types:['INSTANCE']}).find(n=>n.name==='Secondary action'),save=sheet.findAllWithCriteria({types:['INSTANCE']}).find(n=>n.name==='Primary action'),close=sheet.children.find(n=>n.name==='Header').children.find(n=>n.name==='Close');
  await click(cancel,closeActions);await click(close,closeActions);
  if(i===0)save.setProperties({State:'Disabled'});else await click(save,closeActions);
  overlays.push({frameId,layerId:layer.id,sheetId:sheet.id,bodyId:newBodies[i].id,state:i===0?'New':editData[i-1].title});
 }
 proof.push({frameId,moduleBodies:bodies.length,newLayerCount:5});
}
let minY=Math.max(...page.children.filter(n=>!masters.includes(n)&&!bodyCopies.includes(n)&&n!==blank).map(n=>n.y+('height'in n?n.height:0)))+240;
for(let i=0;i<[row,list,...newBodies].length;i++){const n=[row,list,...newBodies][i];n.x=160+i*760;n.y=minY;}
return {createdNodeIds:created,mutatedNodeIds:mutated,pageId:page.id,pageName:page.name,changedBodyIds:changedBodies,overlays,proof,masterIds:[row,list,...newBodies].map(n=>n.id),visibilityVariableIds:visVars.map(v=>v.id),visibilityCollectionId:col.id,newForm:'Blank; Save disabled until data entry; static mock inputs',editForms:'Prefilled by row; Save, Cancel, Close and backdrop return to canvas',existingRailAndRecorderPreserved:true};
