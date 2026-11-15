figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('17:881'));
const board=await figma.getNodeByIdAsync('17:882'),compare=await figma.getNodeByIdAsync('17:885'),b=await figma.getNodeByIdAsync('17:887');
if(compare.children.some(n=>n.name.startsWith('C ·')))throw new Error('Comparison C already exists; inspect before retry');
const template=await figma.getNodeByIdAsync('47:1685'),header=await figma.getNodeByIdAsync('60:2400');
const fonts=new Map();for(const root of [board,template,header])for(const t of root.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const before={a:(await figma.getNodeByIdAsync('17:890')).absoluteBoundingBox,b:(await figma.getNodeByIdAsync('23:881')).absoluteBoundingBox,working:(await figma.getNodeByIdAsync('2:1811')).absoluteBoundingBox};
const c=b.clone();compare.appendChild(c);c.name='C · Single-line rows · Expand details';
const title=c.children.find(n=>n.name==='Current label'),caption=c.children.find(n=>n.name==='Current provenance'),screen=c.children.find(n=>n.type==='FRAME');
title.characters='C · Single-line rows · Expand details';screen.name='Current medications · Comparison C · Single-line disclosure';
const table=screen.findOne(n=>n.name==='Medication table'),old=[...table.children];for(const n of old)n.visible=false;
const h=header.clone();table.appendChild(h);h.name='Column headings';
const sourceRows=(await figma.getNodeByIdAsync('23:918')).children.filter(n=>n.type==='INSTANCE');const rows=[];
function setLabel(n,label){const key=Object.keys(n.componentProperties).find(k=>k.split('#')[0]==='Label');n.setProperties({[key]:label});}
for(let i=0;i<sourceRows.length;i++){
 const src=sourceRows[i],r=template.clone();table.appendChild(r);r.name=src.name+' / Comparison C';const props={};
 for(const [k,v]of Object.entries(src.componentProperties)){const nk=Object.keys(r.componentProperties).find(x=>x.split('#')[0]===k.split('#')[0]);if(nk)props[nk]=v.value;}
 props['Show timeline#34:15']=false;props.Disclosure=(i===0||i===9)?'Expanded':'Collapsed';r.setProperties(props);
 const sourceOrder=src.findOne(n=>n.type==='INSTANCE'&&n.name==='Order and pharmacy');
 for(const name of ['Summary status','Pharmacy fields']){const target=r.findOne(n=>n.name===name);target.setProperties(Object.fromEntries(Object.entries(sourceOrder.componentProperties).map(([k,v])=>[k,v.value])));target.resize(192,target.height);target.layoutSizingHorizontal='FILL';for(const t of target.children)if(t.type==='TEXT'){t.visible=name==='Summary status'?t.name==='Status':t.name!=='Status';t.textAutoResize='HEIGHT';t.resize(192,t.height);t.layoutSizingHorizontal='FILL';}}
 for(const name of ['Source','Prescriber']){const st=src.findOne(n=>n.type==='TEXT'&&n.name===name),tt=r.findOne(n=>n.type==='TEXT'&&n.name===name);if(st&&tt)tt.characters=st.characters;}
 const sourceAction=src.findOne(n=>n.type==='INSTANCE'&&['Edit','Resend','View issue'].includes(n.name));const label=sourceAction.findOne(n=>n.type==='TEXT'&&n.name==='Label').characters;setLabel(r.findOne(n=>n.name==='Edit'),label);
 for(const n of r.findAll(n=>['Timeline access','Clinical timeline','Expand medication timeline','Actions supporting details'].includes(n.name)))n.visible=false;
 rows.push({sourceId:src.id,id:r.id,state:props.Disclosure});
}
const workspace=screen.findOne(n=>n.name==='Medications workspace'),rail=screen.findOne(n=>n.name==='Chart navigation');rail.resize(192,workspace.height);rail.layoutSizingVertical='FIXED';
caption.characters='Comparison C · Single-line scan with details under matching headers\nFirst and issue rows open; date and quantity always visible. Timeline access removed.';
const width=4518;compare.resize(width,compare.height);compare.primaryAxisSizingMode='FIXED';compare.counterAxisSizingMode='AUTO';board.resize(width+48,board.height);board.primaryAxisSizingMode='AUTO';
const rule=await figma.getNodeByIdAsync('17:884');rule.characters='Updated 14 Nov 2026 · A: original. B: spacing with full information. C: single-line rows with expandable details. Working screen remains on 01 Current medications.';
const history=await figma.getNodeByIdAsync('17:934');history.characters+='\n14 Nov 2026 · Daniel requested removing the timeline label/caret from the new row version and adding Comparison C. C reuses B’s page shell with ten single-line disclosure rows; first and issue rows start expanded. Dates and quantities remain visible. A, B and the original-page working screen are preserved. C links to row set47:1540; the page shell is a separate copy. Keep each comparison’s scope distinct when updating.';
return {createdNodeIds:[c.id,...c.findAll(()=>true).map(n=>n.id)],mutatedNodeIds:[board.id,compare.id,rule.id,history.id],cId:c.id,screenId:screen.id,tableId:table.id,headerId:h.id,rows,hiddenSupersededIds:old.map(n=>n.id),size:[screen.width,screen.height],before,after:{a:(await figma.getNodeByIdAsync('17:890')).absoluteBoundingBox,b:(await figma.getNodeByIdAsync('23:881')).absoluteBoundingBox,working:(await figma.getNodeByIdAsync('2:1811')).absoluteBoundingBox}};
