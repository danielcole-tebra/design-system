figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('1824:238490'));
if(figma.currentPage.children.some(n=>n.name==='Problems · DS translation'))throw new Error('Translation already exists; inspect before retry');
const setsKeys={buttons:'cfb726c79b456d52901243b7c33839efd0780a93',chips:'1c8149de35a3b84dbc41a7e5d726020dfb865db4',fields:'7c3c99bb9a9392d6571c0557b41d142b8987b566',labels:'77cfa2d6c7b4601fc5a311028da35f42fc8f3ebb',icons:'7ebea5d7ce6ecfdaef84d177efa64196f654717d',dividers:'e1a369ce1b663c8e203a59c18f522108c62c8e6e'};
const varKeys={paper:'f1e85cc976b10ea275c03f5d7f21a0dc12cdfee0',ink:'5c8867e0b6f174db9f69096580158df26e39baae',muted:'0d503f1eb6c6f3e923310b2ad6e621cc940b6543',primary:'172c5580bce6e949fd9eac7ffb766a5ab3151022',success:'8dd12ab4ede9eb9217b446539b6e9f76aad03285',divider:'ba1923abf373a9062e989ce3ac2068f54712d80b',hover:'18ef3330ddea4aa764ebd41fa62a1aa19fef0df7',s4:'169cfdc5f2a6aa55b951ef153aa0f5e9c778e362',s8:'183d5d946d268e8bd37735b8b0dc95111c46eddd',s16:'6016592c19254dd61e9de9e006459546eaece0bb',s24:'f377dae9eb274ba0c78c22fe147a6bab50271e78'};
const styleKeys={h4:'888b271ed38cdcfb86c35f9de8bff5ac9b81e8e3',body1:'c87aec6a94a2e25a8a25446f8d61716cb25abe73',body2:'cdb9fe68e6b5274b6e42be16d13bb3fb7834dccb',caption:'7d2c1e680e75d61c2bafaed604ad9014fef3e981',subtitle:'8045fb3d53b4cbb27ea59eaa89dc4eaeff14eaa7'};
const [sets,vars,styles,calendar,check,shell]=await Promise.all([
Promise.all(Object.entries(setsKeys).map(async([k,v])=>[k,await figma.importComponentSetByKeyAsync(v)])).then(Object.fromEntries),
Promise.all(Object.entries(varKeys).map(async([k,v])=>[k,await figma.variables.importVariableByKeyAsync(v)])).then(Object.fromEntries),
Promise.all(Object.entries(styleKeys).map(async([k,v])=>[k,await figma.importStyleByKeyAsync(v)])).then(Object.fromEntries),
figma.importComponentByKeyAsync('4b107655a1c634462518b1d88aec458f78e8d9b4'),figma.importComponentByKeyAsync('1d4c541ed110fd85da90bbf71b351ce72737ec95'),figma.getNodeByIdAsync('6:65')]);
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
const translated=[];
for(const [body,label,x,height] of [[list,'Problems',0,650],[details,'Problem Details',760,718]]){
const s=inst(shell,null,label==='Problems'?'Problems · DS translation':'Problem Details · DS translation');s.x=x;s.y=0;s.setProperties({'Title#279:0':label,'Body content#279:5':body.id,'Show secondary action#279:3':label!=='Problems'});s.resize(550,height);
const primary=s.findAllWithCriteria({types:['INSTANCE']}).find(n=>n.name==='Primary action');
if(label==='Problems'){primary.swapComponent(variant(sets.buttons,{size:'medium',color:'primary',variant:'contained',State:'Default'}));primary.setProperties({'Label#83:165':'Add Active Problems to Note'});}
const bodySlot=s.findAllWithCriteria({types:['INSTANCE']}).find(n=>n.name==='Body content');
translated.push({id:s.id,name:s.name,bodyId:bodySlot.id,w:s.width,h:s.height,bodyHeight:bodySlot.height,footer:s.children.find(n=>n.name==='Footer').y});
}
for(const id of ['1824:238628','1824:238770']){const n=await figma.getNodeByIdAsync(id);n.y=950;n.name='Original · '+(id==='1824:238628'?'Problems':'Problem Details');mutated.push(n.id);}
figma.currentPage.selection=await Promise.all(translated.map(n=>figma.getNodeByIdAsync(n.id)));figma.viewport.scrollAndZoomIntoView(figma.currentPage.selection);
return {createdNodeIds:created,mutatedNodeIds:mutated,translated,masterIds:masters.map(n=>n.id),listHeight:list.height,detailsHeight:details.height,controls:controls.filter(n=>n.type==='INSTANCE').slice(0,18).map(n=>({id:n.id,name:n.name})),dateComposition:'Native Text field alongside Icon button; no field internals altered',sourceDataPreserved:true};
