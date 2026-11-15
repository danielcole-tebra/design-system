figma.skipInvisibleInstanceChildren=false;await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('17:881'));
const table=await figma.getNodeByIdAsync('73:3855'),screen=await figma.getNodeByIdAsync('73:3818');
const rows=table.children.filter(n=>n.visible&&n.type==='INSTANCE'),source=(await figma.getNodeByIdAsync('23:918')).children.filter(n=>n.type==='INSTANCE');
const assertions=[],controls=[];function add(name,actual,expected){assertions.push({name,actual,expected});}
function vis(n,r){for(let p=n;p&&p!==r;p=p.parent)if(!p.visible)return false;return true;}
function copy(r){return r.findAllWithCriteria({types:['TEXT']}).filter(n=>vis(n,r)).map(n=>n.characters).sort();}
function bounds(r){return r.findAll(n=>vis(n,r)&&'width'in n&&(n.x<-.1||n.y<-.1||n.x+n.width>n.parent.width+.1||n.y+n.height>n.parent.height+.1)).map(n=>n.name);}
const grid=[[0,44],[44,360],[404,112],[516,136],[652,208],[860,80],[940,276]];
add('ten medications',rows.length,10);
for(let i=0;i<rows.length;i++){
 const r=rows[i],src=source[i],initial=r.componentProperties.Disclosure.value,fonts=new Set(r.findAllWithCriteria({types:['TEXT']}).filter(n=>vis(n,r)).map(n=>n.fontName.family));
 add(r.id+' font',[...fonts],['Akkurat LL']);
 add(r.id+' grid',r.children.find(n=>n.name==='Summary').children.filter(n=>n.visible).map(n=>[n.x,n.width]),grid);
 add(r.id+' collapsed/open placement',initial,(i===0||i===9)?'Expanded':'Collapsed');
 add(r.id+' timeline hidden',r.findAll(n=>n.name==='Clinical timeline'||n.name==='Expand medication timeline').filter(n=>vis(n,r)).length,0);
 const before=copy(r);r.setProperties({Disclosure:'Expanded'});
 const expanded=copy(r).filter(t=>t!=='Hide details');add(r.id+' exact complete content',expanded,copy(src));
 add(r.id+' expanded no overflow',bounds(r),[]);
 add(r.id+' actions', ['Edit','Toggle details','Medication actions'].map(name=>{const n=r.findOne(n=>n.name===name);return Math.round(n.absoluteTransform[0][2]-r.absoluteTransform[0][2]);}),[948,1052,1164]);
 add(r.id+' timeline remains hidden when expanded',r.findAll(n=>n.name==='Clinical timeline'||n.name==='Expand medication timeline').filter(n=>vis(n,r)).length,0);
 add(r.id+' supporting lines',r.findAllWithCriteria({types:['TEXT']}).filter(n=>vis(n,r)&&['Duration','Pharmacy','Phone'].includes(n.name)).map(n=>n.height),[16,16,16]);
 r.setProperties({Disclosure:'Collapsed'});add(r.id+' collapsed height',r.height,59);add(r.id+' collapsed no overflow',bounds(r),[]);
 for(const name of ['Date','Quantity'])add(r.id+' visible '+name,vis(r.findOne(n=>n.name===name),r),true);
 add(r.id+' directions hidden',vis(r.findOne(n=>n.name==='Directions'),r),false);
 const d=r.findOne(n=>n.name==='Toggle details');add(r.id+' expand target',d.reactions.flatMap(x=>(x.actions||[]).map(a=>a.destinationId)).filter(Boolean),['47:1577']);
 r.setProperties({Disclosure:initial});add(r.id+' copy roundtrip',copy(r),before);
 if(i===0)controls.push(...['Edit','Toggle details','Medication actions','Select medication'].map(name=>r.findOne(n=>n.name===name)).filter(Boolean));
}
const h=await figma.getNodeByIdAsync('73:4525');add('header grid',h.children.filter(n=>n.visible).map(n=>[n.x,n.width]),grid);add('header bounds',bounds(h),[]);
controls.push(...h.findAllWithCriteria({types:['INSTANCE']}).filter(n=>n.mainComponent?.id==='2:1408'));
const all=screen.findAll(()=>true);add('image-filled nodes',all.filter(n=>Array.isArray(n.fills)&&n.fills.some(f=>f.type==='IMAGE')).length,0);
add('B dimensions',[(await figma.getNodeByIdAsync('23:881')).width,(await figma.getNodeByIdAsync('23:881')).height],[1440,1428]);add('working height',(await figma.getNodeByIdAsync('2:1811')).height,1766);
return await auditEvidence(controls,assertions);
