figma.skipInvisibleInstanceChildren=false;
const pairs=[['2:2320','28:932',143,81],['2:2557','28:1022',133,109],['2:2605','28:1112',125,101],['2:2746','28:1202',129,81]];
const assertions=[],controls=[];
function visible(n,root){for(let p=n;p&&p!==root;p=p.parent)if(!p.visible)return false;return true;}
function copy(n){return n.findAllWithCriteria({types:['TEXT']}).filter(t=>visible(t,n)).map(t=>t.characters).sort();}
function add(name,actual,expected){assertions.push({name,actual,expected});}
for(const [sid,pid,oldH,newH]of pairs){
 const s=await figma.getNodeByIdAsync(sid),p=await figma.getNodeByIdAsync(pid);
 add(pid+' exact visible copy',copy(p),copy(s));
 add(pid+' source height unchanged',s.height,oldH);add(pid+' proposal height',p.height,newH);
 add(pid+' column widths',p.children.map(n=>n.width),s.children.map(n=>n.width));
 add(pid+' primary text sizes',p.findAllWithCriteria({types:['TEXT']}).filter(n=>['Medication name','Directions'].includes(n.name)).map(n=>n.fontSize),[14,14]);
 add(pid+' metadata size',p.findAllWithCriteria({types:['TEXT']}).filter(n=>['Prescriber','Duration','Refills','Pharmacy','Phone'].includes(n.name)).every(n=>n.fontSize===12&&n.lineHeight.value===16),true);
 add(pid+' timeline parent',p.findOne(n=>n.name==='Expand medication timeline').parent.name,'Actions');
 add(pid+' reactions',p.findAll(n=>'reactions'in n&&n.reactions.length).length,0);
 const excess=p.findAll(n=>visible(n,p)&&'width'in n&&n.parent&&n.parent.type!=='PAGE'&&(n.x<-.1||n.y<-.1||n.x+n.width>n.parent.width+.1||n.y+n.height>n.parent.height+.1)).map(n=>n.name);
 add(pid+' no visible overflow',excess,[]);
}
const first=await figma.getNodeByIdAsync('28:932');
for(const name of ['Select medication','Reviewed','Edit','Compound'])controls.push(first.findOne(n=>n.type==='INSTANCE'&&n.name===name));
const b=await figma.getNodeByIdAsync('28:882'),all=b.findAll(()=>true);
add('Review contains no raster UI',all.filter(n=>Array.isArray(n.fills)&&n.fills.some(f=>f.type==='IMAGE')).length,0);
add('Working screen remains on original page',(await figma.getNodeByIdAsync('2:1811')).parent.id,'0:1');
return await auditEvidence(controls,assertions);
