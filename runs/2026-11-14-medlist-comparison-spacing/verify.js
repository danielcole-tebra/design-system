figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('17:881'));
const screen=await figma.getNodeByIdAsync('23:881'),archive=await figma.getNodeByIdAsync('52:2451'),master=await figma.getNodeByIdAsync('52:2511');const rows=screen.findAll(n=>n.type==='INSTANCE'&&n.mainComponent?.id===master.id);const assertions=[];
function add(name,actual,expected){assertions.push({name,actual,expected});}function vis(n,r){for(let p=n;p&&p!==r;p=p.parent)if(!p.visible)return false;return true;}function texts(r){return r.findAllWithCriteria({types:['TEXT']}).filter(n=>vis(n,r)).map(n=>n.characters).sort();}
add('all ten rows use spacing master',rows.length,10);
for(const r of rows){const source=archive.findOne(n=>n.type==='INSTANCE'&&n.name===r.name),a=r.children.find(n=>n.name==='Actions'),controls=a.children.filter(n=>n.visible),k=r.findOne(n=>n.name==='Medication actions');add(r.id+' exact visible content',texts(r),texts(source));add(r.id+' columns',r.children.filter(n=>n.visible).map(n=>n.width),[44,300,144,136,300,96,196]);add(r.id+' actions grouped with 8 px gaps',controls.slice(1).map((n,i)=>n.x-controls[i].x-controls[i].width),controls.slice(1).map(()=>8));
 const center=n=>n.absoluteTransform[1][2]+n.height/2;const centered=[...controls,r.findOne(n=>n.type==='INSTANCE'&&n.name==='Reviewed'),r.findOne(n=>n.name==='Select medication')];add(r.id+' control centers',Math.max(...centered.map(center))-Math.min(...centered.map(center)),0);
 add(r.id+' full directions visible',vis(r.findOne(n=>n.name==='Directions'),r),true);add(r.id+' no disclosure added',r.findAll(n=>n.name==='Toggle details'||n.name==='Details content').length,0);add(r.id+' no interactions added',r.findAll(n=>n.reactions?.length>0).length,0);
 add(r.id+' metadata caption',r.findAll(n=>n.type==='TEXT'&&['Prescriber','Duration','Refills','Pharmacy','Phone'].includes(n.name)).every(t=>t.fontSize===12&&t.lineHeight.value===16),true);
 add(r.id+' spacing bound',r.children.filter(n=>n.visible).every(n=>n.paddingTop===8&&n.paddingBottom===8&&n.boundVariables.paddingTop?.id==='VariableID:183d5d946d268e8bd37735b8b0dc95111c46eddd/997:15'),true);
 add(r.id+' overflow unchanged',JSON.stringify(snapshotControl(k)),JSON.stringify(snapshotControl(source.findOne(n=>n.name==='Medication actions'))));
 add(r.id+' no visible overflow',r.findAll(n=>vis(n,r)&&'width'in n&&(n.x<-.1||n.y<-.1||n.x+n.width>n.parent.width+.1||n.y+n.height>n.parent.height+.1)).map(n=>n.name),[]);
 add(r.id+' Akkurat visible text',r.findAllWithCriteria({types:['TEXT']}).filter(t=>vis(t,r)).every(t=>t.fontName.family==='Akkurat LL'),true);
}
add('B height',screen.height,1428);add('working height unchanged',(await figma.getNodeByIdAsync('2:1811')).height,1766);add('archive height',archive.height,1766);add('original reference dimensions',[(await figma.getNodeByIdAsync('17:890')).width,(await figma.getNodeByIdAsync('17:890')).height],[1446,1631]);
const first=rows[0];return await auditEvidence(['Select medication','Reviewed','Edit','Compound'].map(name=>first.findOne(n=>n.type==='INSTANCE'&&n.name===name)),assertions);
