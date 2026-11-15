figma.skipInvisibleInstanceChildren=false;await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('17:881'));
const table=await figma.getNodeByIdAsync('85:6308'),dtable=await figma.getNodeByIdAsync('77:4811'),header=await figma.getNodeByIdAsync('85:6329'),rows=table.children.filter(n=>n.visible&&n.type==='INSTANCE'),drows=dtable.children.filter(n=>n.visible&&n.type==='INSTANCE'),assertions=[],controls=[];
function add(name,actual,expected){assertions.push({name,actual,expected});}function vis(n,r){for(let p=n;p&&p!==r;p=p.parent)if(!p.visible)return false;return true;}
function texts(r){return r.findAllWithCriteria({types:['TEXT']}).filter(t=>vis(t,r)).map(t=>t.characters);}
function status(r){return r.findOne(n=>n.name==='Summary status').findOne(n=>n.type==='TEXT'&&n.name==='Status');}
function style(t){return{font:t.fontName,size:t.fontSize,line:t.lineHeight,fills:t.fills};}
function overflow(r){return r.findAll(n=>vis(n,r)&&'width'in n&&(n.x<-.1||n.y<-.1||n.x+n.width>n.parent.width+.1||n.y+n.height>n.parent.height+.1)).map(n=>n.name);}
for(let i=0;i<rows.length;i++){
 const r=rows[i],d=drows[i],t=status(r),original=r.componentProperties.Disclosure.value,quiet=['Filled','Pending fill'].includes(t.characters),before=style(t);
 add(r.id+' data',r.componentProperties,d.componentProperties);add(r.id+' visible content',texts(r),texts(d));add(r.id+' row height',r.height,d.height);
 add(r.id+' status font',t.fontName,{family:'Akkurat LL',style:quiet?'Regular':'Bold'});add(r.id+' status size',[t.fontSize,t.lineHeight.value],[14,20]);
 if(quiet)add(r.id+' secondary ink',t.fills[0].boundVariables.color.id,'VariableID:0d503f1eb6c6f3e923310b2ad6e621cc940b6543/74:139');else add(r.id+' issue styling unchanged',style(t),style(status(d)));
 const copy=texts(r);r.setProperties({Disclosure:original==='Expanded'?'Collapsed':'Expanded'});add(r.id+' status override through transition',style(status(r)),before);add(r.id+' opposite-state clipping',overflow(r),[]);
 r.setProperties({Disclosure:original});add(r.id+' copy roundtrip',texts(r),copy);add(r.id+' status roundtrip',style(status(r)),before);add(r.id+' clipping',overflow(r),[]);
 add(r.id+' disclosure wiring',r.findOne(n=>n.name==='Toggle details').reactions,d.findOne(n=>n.name==='Toggle details').reactions);
 if(i===0)controls.push(...['Edit','Toggle details','Medication actions'].map(name=>r.findOne(n=>n.name===name)));
}
add('date label',texts(header).filter(t=>/Prescribed/.test(t)),['Prescribed /\nmodified']);add('order label',texts(header).includes('Order status'),true);add('header height',header.height,52);add('header clipping',overflow(header),[]);add('date heading height',(await figma.getNodeByIdAsync('85:7840')).height,40);
controls.push(...header.findAllWithCriteria({types:['INSTANCE']}).filter(n=>vis(n,header)&&n.mainComponent?.id==='2:1408'));
const screen=await figma.getNodeByIdAsync('85:6258');add('E dimensions',[screen.width,screen.height],[1440,1184]);add('no complete-UI images',screen.findAll(n=>Array.isArray(n.fills)&&n.fills.some(p=>p.type==='IMAGE')).length,0);
return await auditEvidence(controls,assertions);
