figma.skipInvisibleInstanceChildren=false;const page=await figma.getNodeByIdAsync('150:20569');await figma.setCurrentPageAsync(page);
if(page.children.some(n=>n.name==='01 · Current table and drawer'))throw Error('Cleanup already present; inspect before retry');
const roots=[...page.children],fonts=new Map();for(const root of roots)for(const t of (root.type==='TEXT'?[root]:root.findAllWithCriteria({types:['TEXT']})))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
function fingerprint(n){const a=[n,...('children'in n?n.findAll():[])].map((c,i)=>[c.id,c.type,i?c.name:null,i?c.x:null,i?c.y:null,c.width,c.height,c.visible,c.type==='TEXT'?c.characters:null,c.reactions]);const str=JSON.stringify(a);let h=2166136261;for(let i=0;i<str.length;i++)h=Math.imul(h^str.charCodeAt(i),16777619);return {hash:(h>>>0).toString(16),count:a.length};}
const before=roots.map(n=>({id:n.id,...fingerprint(n)})),created=[],mutated=[],groups=[];
function section(parent,name,x,y,nodes,cols=2,stepX=1600,stepY=1260){const s=figma.createSection();parent.appendChild(s);s.name=name;s.x=x;s.y=y;created.push(s.id);let bottom=0,right=0;for(let i=0;i<nodes.length;i++){const n=nodes[i];s.appendChild(n);n.x=64+(i%cols)*stepX;n.y=80+Math.floor(i/cols)*stepY;right=Math.max(right,n.x+n.width);bottom=Math.max(bottom,n.y+n.height);mutated.push(n.id);}s.resizeWithoutConstraints(right+64,bottom+64);groups.push({id:s.id,name:s.name,page:parent.id,children:nodes.map(n=>n.id)});return s;}
const find=id=>roots.find(n=>n.id===id);const archive=figma.createPage();archive.name='Archive · Initial Open drawer';created.push(archive.id);
const oldIds=['150:37223','150:20871','150:20944','150:21017','150:21090','150:21163','150:21236','150:21309','150:21382','150:21455','150:21528'];
const oldSec=section(archive,'Initial Open drawer · Superseded by current pass',160,160,oldIds.map(find),4);
const oldNote=find('150:37739');archive.appendChild(oldNote);oldNote.x=160;oldNote.y=oldSec.y+oldSec.height+80;mutated.push(oldNote.id);
const overview=section(page,'01 · Current table and drawer',160,160,['150:21601','160:46277','150:26805','150:32015'].map(find),2);
const note=find('160:46513');overview.appendChild(note);note.x=64;note.y=2600;overview.resizeWithoutConstraints(3168,2860);mutated.push(note.id);note.characters+='\n16 Nov cleanup: current table text/header left inset is16 px. Earlier non-drawer, drawer, comparison and initial Open versions are on Archive pages. Supporting components and inspection specimens are retained in their own section. Nothing deleted.';
const details=roots.filter(n=>n.name.startsWith('Pass 2 · Open drawer'));section(page,'02 · Current medication details · Prototype destinations',3600,160,details,5);
const rx=roots.filter(n=>n.name.startsWith('Rx ·'));section(page,'03 · Prescription editing · Prototype states',160,3260,rx,4);
const chart=roots.filter(n=>n.name.startsWith('Chart-only ·'));section(page,'04 · Chart-only editing · Prototype states',6700,3260,chart,2);
section(page,'05 · Supporting components and inspections',10200,3260,['150:20783','160:41715','150:37440','151:31571','157:8965'].map(find),2,1600,1300);
page.name='Medlist · Current table and drawer';mutated.push(page.id);
const names={'0:1':'Archive · Non-drawer explorations','104:4346':'Archive · Earlier drawer','17:881':'Archive · Comparisons','128:2573':'Archive · Components and studies'};for(const[id,name]of Object.entries(names)){const p=await figma.getNodeByIdAsync(id);p.name=name;mutated.push(id);}
figma.root.insertChild(0,page);
page.flowStartingPoints=[{nodeId:'150:21601',name:'Current medications · Open drawer'},{nodeId:'150:26805',name:'Reconcile medications'},{nodeId:'160:45646',name:'Chart-only editing example'}];archive.flowStartingPoints=[];
const preservation=roots.map((n,i)=>({id:n.id,before:before[i],after:fingerprint(n),unchanged:n.id===note.id?null:JSON.stringify(fingerprint(n))===JSON.stringify({hash:before[i].hash,count:before[i].count})}));
return {createdNodeIds:created,mutatedNodeIds:mutated,archiveId:archive.id,overviewId:overview.id,groups,preservation,unclassified:page.children.filter(n=>n.type!=='SECTION').map(n=>n.id),pages:figma.root.children.map(p=>({id:p.id,name:p.name})),builtAt:new Date().toISOString()};
