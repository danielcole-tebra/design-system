figma.skipInvisibleInstanceChildren=false;await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('17:881'));
const s=await figma.getNodeByIdAsync('77:4774'),c=await figma.getNodeByIdAsync('73:3818'),a=await figma.getNodeByIdAsync('77:6265'),f=await figma.getNodeByIdAsync('77:6278'),u=await figma.getNodeByIdAsync('77:6342'),assertions=[];
function add(name,actual,expected){assertions.push({name,actual,expected});}function vis(n,r){for(let p=n;p&&p!==r;p=p.parent)if(!p.visible)return false;return true;}
function visibleText(n){return n.findAllWithCriteria({types:['TEXT']}).filter(t=>vis(t,n)).map(t=>t.characters);}
function rowData(r){return {props:r.componentProperties,main:r.mainComponent.id,width:r.width,height:r.height,text:visibleText(r),reactions:r.findOne(n=>n.name==='Toggle details').reactions};}
const dr=s.findOne(n=>n.name==='Medication table').children.filter(n=>n.visible&&n.type==='INSTANCE'),cr=c.findOne(n=>n.name==='Medication table').children.filter(n=>n.visible&&n.type==='INSTANCE');
add('ten rows',dr.length,10);for(let i=0;i<dr.length;i++)add('D row '+i+' equals C',rowData(dr[i]),rowData(cr[i]));
add('page action order',a.children.map(n=>n.name),['Import from Surescripts','Add to med list','Prescribe medications']);
add('page action labels',visibleText(a),['Import from Surescripts','Add to med list','Prescribe medications']);
add('filter contents',f.children.map(n=>n.name),['Show medications','Order status','Search drug or pharmacy']);
add('compact reconciliation height',u.height,47);add('reconciliation text',visibleText(u),['Reconciliation · 0 of 12 reviewed','Mark all as reviewed','Complete reconciliation']);
add('large reconciliation heading absent',visibleText(s).includes('Medication reconciliation'),false);
add('old helper hidden',visibleText(s).some(t=>t.startsWith('Review every current medication')),false);
add('D dimensions',[s.width,s.height],[1440,1184]);add('C dimensions',[c.width,c.height],[1440,1260]);
for(const root of [a,f,u]){
 add(root.name+' overflow matches native floating labels',root.findAll(n=>vis(n,root)&&'width'in n&&(n.x<-.1||n.y<-.1||n.x+n.width>n.parent.width+.1||n.y+n.height>n.parent.height+.1)).map(n=>n.name),root.id==='77:6278'?['Label / floating','Label / floating']:[]);
 add(root.name+' font',[...new Set(root.findAllWithCriteria({types:['TEXT']}).filter(n=>vis(n,root)).map(n=>n.fontName.family))],['Akkurat LL']);
}
const controls=[...a.children,...f.children,...u.findAllWithCriteria({types:['INSTANCE']}).filter(n=>['Mark all reviewed','Complete reconciliation'].includes(n.name))];
const all=s.findAll(()=>true);add('no image-filled nodes',all.filter(n=>Array.isArray(n.fills)&&n.fills.some(p=>p.type==='IMAGE')).length,0);
add('prescribing color',a.children[2].componentProperties.color.value,'secondary');
return await auditEvidence(controls,assertions);
