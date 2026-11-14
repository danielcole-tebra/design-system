figma.skipInvisibleInstanceChildren=false;
const pairs=[['28:932','34:1396','34:1671'],['28:1022','34:1460','34:1808'],['28:1112','34:1530','34:1878'],['28:1202','34:1600','34:1736']];
const assertions=[];function add(name,actual,expected){assertions.push({name,actual,expected});}
function vis(n,r){for(let p=n;p&&p!==r;p=p.parent)if(!p.visible)return false;return true;}
function texts(r){return r.findAllWithCriteria({types:['TEXT']}).filter(t=>vis(t,r)).map(t=>t.characters);}
for(const [sid,cid,eid]of pairs){const s=await figma.getNodeByIdAsync(sid),c=await figma.getNodeByIdAsync(cid),e=await figma.getNodeByIdAsync(eid);const st=texts(s),ct=texts(c),et=texts(e);
add(cid+' expanded retains source text',st.every(t=>et.includes(t)),true);
const directions=s.findOne(n=>n.type==='TEXT'&&n.name==='Directions').characters;
add(cid+' full directions always visible',ct.includes(directions)&&et.includes(directions),true);
add(cid+' details hidden by default',c.children.find(n=>n.name==='Details content').visible,false);
add(eid+' details visible',e.children.find(n=>n.name==='Details content').visible,true);
add(cid+' supporting pharmacy phone hidden',ct.some(t=>t.startsWith('Phone:')),false);
add(cid+' status visible',ct.includes(s.findOne(n=>n.type==='TEXT'&&n.name==='Status').characters),true);
add(cid+' summary columns',c.children.find(n=>n.name==='Summary').children.map(n=>n.width),[44,548,192,144,248,40]);
add(eid+' no overflow',[c,e].flatMap(r=>r.findAll(n=>vis(n,r)&&'width'in n&&(n.x<-.1||n.y<-.1||n.x+n.width>n.parent.width+.1||n.y+n.height>n.parent.height+.1))).length,0);
add(cid+' typography',c.findAllWithCriteria({types:['TEXT']}).filter(t=>vis(t,c)&&['Medication name','Directions'].includes(t.name)).every(t=>t.fontName.family==='Akkurat LL'&&t.fontSize===14),true);
}
const set=await figma.getNodeByIdAsync('34:1388');add('Two disclosure variants',set.children.length,2);
for(const [id,dest]of [['34:1260','34:1324'],['34:1324','34:1260']]){const r=await figma.getNodeByIdAsync(id),control=r.findOne(n=>n.name==='Toggle details');add(id+' click destination',control.reactions[0].actions[0].destinationId,dest);add(id+' change variant action',control.reactions[0].actions[0].navigation,'CHANGE_TO');}
const c=await figma.getNodeByIdAsync('34:1396'),e=await figma.getNodeByIdAsync('34:1671');
const controls=['Select medication','Reviewed','Edit','Compound','Toggle details'].map(name=>c.findOne(n=>n.type==='INSTANCE'&&n.name===name));controls.push(e.findOne(n=>n.type==='INSTANCE'&&n.name==='Toggle details'));
add('Working screen untouched height',(await figma.getNodeByIdAsync('2:1811')).height,1766);
add('Working screen remains original page',(await figma.getNodeByIdAsync('2:1811')).parent.id,'0:1');
return await auditEvidence(controls,assertions);
