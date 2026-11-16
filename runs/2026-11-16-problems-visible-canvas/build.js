figma.skipInvisibleInstanceChildren=false;
const page=await figma.getNodeByIdAsync('1319:4655');await figma.setCurrentPageAsync(page);
if(page.children.some(n=>n.name==='11/16 · Problems · 01 Canvas module'))throw new Error('Visible workflow frames already exist; inspect before retry');
const source=await figma.getNodeByIdAsync('1319:4656');
const names=['SCAFFOLDING · compact Note preserving intake','SCAFFOLDING · linked note body for outcomes','SCAFFOLDING · note outcome editor viewport','SCAFFOLDING · Note configuration only','SCAFFOLDING · Persistent encounter recorder','SCAFFOLDING · Module icon rail'];
const parts=source.children.filter(n=>(n.name==='Page/Encounter'&&n.visible)||names.includes(n.name));
const orderSource=await figma.getNodeByIdAsync('1319:5080');const viewportSource=await figma.getNodeByIdAsync('1319:4847');
const modalIds=['1389:14752','1389:15063','1389:15370','1389:15736','1389:16102'];const modals=await Promise.all(modalIds.map(id=>figma.getNodeByIdAsync(id)));
const fonts=new Map();for(const root of [...parts,orderSource,...modals])for(const t of root.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const created=[],mutated=[],frames=[],sheets=[],detailsNames=['Canvas module','New Problem','Edit Low back pain','Edit Depression','Edit Hypertension','Edit Anxiety'];
function own(n){created.push(n.id);return n;}
async function freeze(root){const all=[root,...root.findAll(()=>true)];for(const n of all){const b=n.boundVariables?.visible;if(b&&!b.id.includes('/')){const v=n.visible;n.setBoundVariable('visible',null);n.visible=v;}if('reactions'in n&&n.reactions.length)await n.setReactionsAsync([]);}}
function show(n,value){if(n.boundVariables?.visible)n.setBoundVariable('visible',null);n.visible=value;}
for(let i=0;i<6;i++){
 const f=own(figma.createFrame());page.appendChild(f);f.name='11/16 · Problems · '+String(i+1).padStart(2,'0')+' '+detailsNames[i];f.resize(source.width,source.height);f.fills=source.fills;f.clipsContent=true;f.x=4400+(i%3)*1653;f.y=800+Math.floor(i/3)*1280;
 for(const part of parts){const n=own(part.clone());f.appendChild(n);await freeze(n);}
 const vp=own(figma.createAutoLayout('VERTICAL'));f.appendChild(vp);vp.name='11/16 · Visible Problems and Summary';vp.x=viewportSource.x;vp.y=viewportSource.y;vp.resize(viewportSource.width,viewportSource.height);vp.primaryAxisSizingMode='FIXED';vp.counterAxisSizingMode='FIXED';vp.fills=[];vp.clipsContent=true;vp.overflowDirection='VERTICAL';
 const order=own(orderSource.clone());vp.appendChild(order);await freeze(order);show(order,true);order.layoutPositioning='AUTO';order.layoutSizingHorizontal='FILL';order.layoutSizingVertical='HUG';
 const body=order.findOne(n=>n.type==='FRAME'&&n.name==='SCAFFOLDING · Problems body · NDE Rebuild');let p=body;while(p&&p!==vp){show(p,true);p=p.parent;}
 const rail=f.children.find(n=>n.name==='SCAFFOLDING · Module icon rail');const toggle=rail.findOne(n=>n.name==='SCAFFOLDING · Toggle Problems');if(toggle){for(const n of toggle.children){if(n.name==='SCAFFOLDING · Current module indicator'||n.name==='SCAFFOLDING · borderless selected state P')show(n,true);if(n.name==='SCAFFOLDING · borderless off state P')show(n,false);}}
 let modal=null;if(i>0){modal=own(modals[i-1].clone());f.appendChild(modal);await freeze(modal);show(modal,true);modal.x=0;modal.y=0;const sheet=modal.children.find(n=>n.type==='INSTANCE');sheets.push({frameId:f.id,modalId:modal.id,sheetId:sheet.id,w:sheet.width,h:sheet.height});}
 frames.push(f);
}
async function nav(n,to){let root=n;while(root.parent&&root.parent.type!=='PAGE')root=root.parent;if(root===to)return;await n.setReactionsAsync([{trigger:{type:'ON_CLICK'},actions:[{type:'NODE',destinationId:to.id,navigation:'NAVIGATE',transition:null,resetScrollPosition:false}]}]);}
const rowNames=['Low back pain','Depression, unspecified','Hypertension','Anxiety, unspecified'];let links=0;
for(const f of frames){
 const content=f.findOne(n=>n.type==='INSTANCE'&&n.name==='11/16 · Problems on-canvas content');
 const add=content.findAllWithCriteria({types:['INSTANCE']}).find(n=>n.name==='Add');await nav(add,frames[1]);links++;
 for(let i=0;i<4;i++){const r=content.children.find(n=>n.type==='INSTANCE'&&n.name===rowNames[i]);const e=r.findAllWithCriteria({types:['INSTANCE']}).find(n=>n.name==='Edit');await nav(e,frames[i+2]);links++;}
 const modal=f.children.find(n=>n.name.startsWith('11/16 · ')&&n.name.endsWith(' · modal layer'));
 if(modal){const sheet=modal.children.find(n=>n.type==='INSTANCE');const descendants=sheet.findAllWithCriteria({types:['INSTANCE']});const cancel=descendants.find(n=>n.name==='Secondary action');const close=sheet.children.find(n=>n.name==='Header').children.find(n=>n.name==='Close');for(const n of [cancel,close,modal.children.find(n=>n.type==='RECTANGLE')]){await nav(n,frames[0]);links++;}if(f!==frames[1]){await nav(descendants.find(n=>n.name==='Primary action'),frames[0]);links++;}}
}
page.flowStartingPoints=[...new Map([...page.flowStartingPoints,{nodeId:frames[0].id,name:'11/16 · Visible Problems workflow'}].map(s=>[s.nodeId,s])).values()];mutated.push(page.id);
figma.currentPage.selection=frames;figma.viewport.scrollAndZoomIntoView(frames);
return {createdNodeIds:created,mutatedNodeIds:mutated,frames:frames.map(f=>({id:f.id,name:f.name,x:f.x,y:f.y,w:f.width,h:f.height,visible:f.visible})),sheets,localNavigationLinks:links,placement:'To the right of existing redline frames, starting at x4400 y800',sourcePrototypeUnchanged:true};
