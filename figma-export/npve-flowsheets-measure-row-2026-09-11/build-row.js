// Unsupported row construction uses the established guarded workflow; comparisons use the runner.
// The caller supplies cfg only after the appearance decision is recorded.
figma.skipInvisibleInstanceChildren=false;
if(figma.fileKey!=='fdCQVFdvOByaOYIJYag0d6'||JSON.stringify(figma.root.children.map(p=>`${p.id} ${p.name}`))!==JSON.stringify(['0:1 Cover','3:2 Templates','27:2 Screens','126:2 Archive']))throw Error('Target identity');
const page=await figma.getNodeByIdAsync('3:2');await figma.setCurrentPageAsync(page);
for(const style of ['Regular','Bold'])await figma.loadFontAsync({family:'Akkurat LL',style});
const tokens={};for(const [name,key]of Object.entries({paper:'f1e85cc976b10ea275c03f5d7f21a0dc12cdfee0',ink:'0d503f1eb6c6f3e923310b2ad6e621cc940b6543',space8:'183d5d946d268e8bd37735b8b0dc95111c46eddd',space16:'6016592c19254dd61e9de9e006459546eaece0bb'})){tokens[name]=await figma.variables.importVariableByKeyAsync(key);if(!tokens[name])throw Error('Missing token');}
if(!cfg.scoreTokenKey)throw Error('Score token missing');
const scoreInk=await figma.variables.importVariableByKeyAsync(cfg.scoreTokenKey);
if(!scoreInk||scoreInk.name!==cfg.scoreTokenName)throw Error('Score token identity drift');
const styles={};for(const [name,key]of Object.entries({h4:'888b271ed38cdcfb86c35f9de8bff5ac9b81e8e3',body2:'cdb9fe68e6b5274b6e42be16d13bb3fb7834dccb',caption:'7d2c1e680e75d61c2bafaed604ad9014fef3e981'}))styles[name]=await figma.importStyleByKeyAsync(key);
const icons={};for(const [name,key]of Object.entries({note:'9fe47d27ed040f1d0e988074b7ea7ba27afcebef',chart:'db42927d9f67e0cd570251253ac74ad81941a783',edit:'ae295bfd62904c894356ffb63fa20fe2ef03b060',add:'925d1c32ce73e949f4f67701add8eb5be3ed342f',trend:'2b3c06250ebf83c4c467989941ade387c36b65e9'}))icons[name]=await figma.importComponentByKeyAsync(key);
const button=await figma.importComponentByKeyAsync('c417c9bd187d428a763cd7763de09f7f258a73b6');
if(button.width!==40||button.height!==40)throw Error('Icon button geometry drift');
const created=[];const remember=n=>{created.push(n.id);return n;};
const paint=v=>figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',v);
let section=cfg.section?await figma.getNodeByIdAsync(cfg.section):null;
if(!section){section=remember(figma.createSection());page.appendChild(section);section.name='27 · Flowsheets · Measure rows';section.x=0;section.y=Math.ceil(Math.max(...page.children.filter(n=>n.id!==section.id).map(n=>n.y+n.height))+200);section.resizeWithoutConstraints(2400,1500);section.fills=[paint(tokens.paper)];section.strokes=[];}
if(section.parent.id!==page.id||section.name!=='27 · Flowsheets · Measure rows')throw Error('Section mismatch');
if(section.findOne(n=>n.name==='State='+cfg.state))throw Error('Row already exists');
function frame(parent,name,width,direction='HORIZONTAL'){const n=remember(figma.createFrame());parent.appendChild(n);n.name=name;n.fills=[];n.strokes=[];n.layoutMode=direction;n.resize(width,42);n.primaryAxisSizingMode='FIXED';n.counterAxisSizingMode='AUTO';n.counterAxisAlignItems='CENTER';return n;}
async function text(parent,name,value,width,style='body2',ink=tokens.ink){const n=remember(figma.createText());parent.appendChild(n);n.name=name;await n.setTextStyleIdAsync(styles[style].id);n.characters=value;n.resize(width,20);n.textAutoResize='HEIGHT';n.fills=[paint(ink)];return n;}
function recolor(n){if(Array.isArray(n.fills)&&n.fills.some(p=>p.type==='SOLID'))n.fills=n.fills.map(p=>p.type==='SOLID'?figma.variables.setBoundVariableForPaint(p,'color',tokens.ink):p);if(Array.isArray(n.strokes)&&n.strokes.some(p=>p.type==='SOLID'))n.strokes=n.strokes.map(p=>p.type==='SOLID'?figma.variables.setBoundVariableForPaint(p,'color',tokens.ink):p);if('children'in n)for(const c of n.children)recolor(c);}
const master=remember(figma.createComponent());section.appendChild(master);master.name='State='+cfg.state;master.x=32;master.y=cfg.state==='Basic'?64:300;master.layoutMode='VERTICAL';master.resize(518,100);master.primaryAxisSizingMode='AUTO';master.counterAxisSizingMode='FIXED';master.fills=[paint(tokens.paper)];master.setBoundVariable('itemSpacing',tokens.space8);master.description='Flowsheets measure row. Temporary published icon substitutions approved 2026-09-11. 40px Icon buttons preserved inside 42px local areas. No clinical scoring or graph behavior implied.';
const line=frame(master,'Measure content',518);line.setBoundVariable('paddingTop',tokens.space16);line.setBoundVariable('paddingBottom',tokens.space16);line.setBoundVariable('itemSpacing',tokens.space16);
const measure=await text(line,'Measure',cfg.state==='Basic'?'PHQ-9':'GAD-7',64,'h4');
const latest=await text(line,'Latest',cfg.state==='Basic'?'15':'12',40,'h4',scoreInk);
let trendText=null;
if(cfg.state==='With trend'){const trend=frame(line,'Trend',64);trend.setBoundVariable('itemSpacing',tokens.space8);trendText=await text(trend,'Trend value','15%',32);const glyph=remember(icons.trend.createInstance());trend.appendChild(glyph);glyph.resize(24,24);recolor(glyph);}
const updated=await text(line,'Updated',cfg.state==='Basic'?'2/1/26':'2 days ago',94);
if(cfg.state==='Basic'){const spacer=frame(line,'Flexible space',64);spacer.resize(64,42);}
const actions=frame(line,'Actions',192);actions.setBoundVariable('itemSpacing',tokens.space8);
const actionIds=[];
for(const name of ['note','chart','edit','add']){const area=frame(actions,'Action area/'+name,42);area.resize(42,42);area.counterAxisSizingMode='FIXED';area.primaryAxisAlignItems='CENTER';const n=remember(button.createInstance());area.appendChild(n);n.name='Action/'+name;n.setProperties({'Icon#170:0':icons[name].id});recolor(n);actionIds.push(n.id);}
const marker=await text(master,'GAP marker',cfg.state==='Basic'?'GAP · Temporary note, chart and edit icons.':'GAP · Temporary note, chart, edit and trend icons.',518,'caption');
const props={};for(const [name,n]of [['Measure',measure],['Latest',latest],['Updated',updated]]){props[name]=master.addComponentProperty(name,'TEXT',n.characters);n.componentPropertyReferences={characters:props[name]};}
if(trendText){props.Trend=master.addComponentProperty('Trend','TEXT','15%');trendText.componentPropertyReferences={characters:props.Trend};}
const helper=remember(figma.createComponent());section.appendChild(helper);helper.name='_Rebuild comparison/Rebuild/Flowsheets row '+cfg.state;helper.x=620;helper.y=master.y;helper.layoutMode='VERTICAL';helper.resize(518,100);helper.primaryAxisSizingMode='AUTO';helper.counterAxisSizingMode='FIXED';helper.fills=[];helper.clipsContent=false;
const instance=remember(master.createInstance());helper.appendChild(instance);instance.setProperties(Object.fromEntries(Object.entries(props).map(([name,key])=>[key,name==='Measure'?(cfg.state==='Basic'?'PHQ-9':'GAD-7'):name==='Latest'?(cfg.state==='Basic'?'15':'12'):name==='Updated'?(cfg.state==='Basic'?'2/1/26':'2 days ago'):'15%'])));
return {complete:true,createdNodeIds:created,section:section.id,master:master.id,helper:helper.id,instance:instance.id,actions:actionIds,properties:props,state:cfg.state,width:master.width,height:master.height};
