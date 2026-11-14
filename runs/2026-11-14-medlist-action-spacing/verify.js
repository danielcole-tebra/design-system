figma.skipInvisibleInstanceChildren=false;
const ids=['34:1396','34:1460','34:1530','34:1600','34:1671','34:1736','34:1808','34:1878'],heights=[61,89,81,61,157,157,185,177],assertions=[];
function add(name,actual,expected){assertions.push({name,actual,expected});}
function visible(n,r){for(let p=n;p&&p!==r;p=p.parent)if(!p.visible)return false;return true;}
for(let i=0;i<ids.length;i++){const r=await figma.getNodeByIdAsync(ids[i]);const summary=r.children.find(n=>n.name==='Summary'),a=summary.children.find(n=>n.name==='Actions'),d=a.children.find(n=>n.name==='Toggle details'),k=a.children.find(n=>n.name==='Medication actions'),p=a.children.find(n=>n.name==='Edit'),review=r.findOne(n=>n.type==='INSTANCE'&&n.name==='Reviewed');
add(r.id+' details-overflow gap',k.x-d.x-d.width,8);add(r.id+' primary-details gap',d.x-p.x-p.width,8);
add(r.id+' group width',a.width,288);add(r.id+' row height',r.height,heights[i]);
add(r.id+' active columns',summary.children.filter(n=>n.visible).map(n=>n.width),[44,548,192,144,288]);
const center=n=>n.absoluteTransform[1][2]+n.height/2;add(r.id+' controls share center',Math.max(center(p),center(d),center(k),center(review))-Math.min(center(p),center(d),center(k),center(review)),0);
add(r.id+' native overflow size',[k.width,k.height],[34,34]);
add(r.id+' no visible overflow',r.findAll(n=>visible(n,r)&&'width'in n&&(n.x<-.1||n.y<-.1||n.x+n.width>n.parent.width+.1||n.y+n.height>n.parent.height+.1)).length,0);
add(r.id+' disclosure destination',d.reactions[0].actions[0].destinationId,i<4?'34:1324':'34:1260');
}
const first=await figma.getNodeByIdAsync(ids[0]);const controls=['Select medication','Reviewed','Edit','Compound','Toggle details'].map(name=>first.findOne(n=>n.type==='INSTANCE'&&n.name===name));
const k=first.findOne(n=>n.name==='Medication actions');const source=(await figma.getNodeByIdAsync('2:2320')).findOne(n=>n.name==='Medication actions');add('Overflow retains original Icon button structure and contextual color',JSON.stringify(snapshotControl(k)),JSON.stringify(snapshotControl(source)));
add('Working screen unchanged height',(await figma.getNodeByIdAsync('2:1811')).height,1766);
return await auditEvidence(controls,assertions);
