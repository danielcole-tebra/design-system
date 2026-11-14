figma.skipInvisibleInstanceChildren=false;
const master=await figma.getNodeByIdAsync('2:2273');
const samples=await Promise.all(['2:2320','2:2557','2:2605','2:2746'].map(id=>figma.getNodeByIdAsync(id)));
const readme=await figma.getNodeByIdAsync('2:2808'),heading=await figma.getNodeByIdAsync('2:2809'),body=await figma.getNodeByIdAsync('2:2810'),caption=await figma.getNodeByIdAsync('2:2281');
const fonts=new Map();for(const r of [master,...samples,readme])for(const t of r.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const [s4,s8,capSize,capHeight]=await Promise.all(['VariableID:169cfdc5f2a6aa55b951ef153aa0f5e9c778e362/997:8','VariableID:183d5d946d268e8bd37735b8b0dc95111c46eddd/997:15','VariableID:d7219a38d00f8b524caf814c7e9450c87c807e64/74:199','VariableID:3c9d83d2c49041a34665c239d76c70d894341990/74:231'].map(id=>figma.variables.getVariableByIdAsync(id)));
const roots=[],created=[];
const m=master.clone();figma.currentPage.appendChild(m);m.x=1800;m.y=1700;m.name='Medlist/Medication row compact proposal';m.description='PROPOSAL · 2026-11-14 · Not approved or applied. Reuses local row and verified native controls. 8 px vertical inset, 4 px related gaps, caption metadata, timeline alongside actions. Directions and all source copy retained. Widths unchanged.';roots.push(m);
const oldDefs=master.componentPropertyDefinitions,newDefs=m.componentPropertyDefinitions;const keyMap={};for(const [key,def] of Object.entries(oldDefs)){const target=Object.keys(newDefs).find(k=>k.split('#')[0]===key.split('#')[0]);keyMap[key]=target||m.addComponentProperty(key.split('#')[0],def.type,def.defaultValue);}
function restoreRefs(a,b){if(a.componentPropertyReferences&&Object.values(a.componentPropertyReferences).some(v=>keyMap[v])){const refs={...a.componentPropertyReferences};for(const k of Object.keys(refs))if(keyMap[refs[k]])refs[k]=keyMap[refs[k]];b.componentPropertyReferences=refs;}if(a.type!=='INSTANCE'&&'children'in a&&'children'in b)a.children.forEach((c,i)=>restoreRefs(c,b.children[i]));}
restoreRefs(master,m);
for(const cell of m.children){cell.setBoundVariable('itemSpacing',s4);cell.setBoundVariable('paddingTop',s8);if(!['Selection','Overflow'].includes(cell.name))cell.setBoundVariable('paddingBottom',s8);}
const actions=m.children.find(n=>n.name==='Actions');actions.layoutMode='HORIZONTAL';actions.resize(156,50);actions.primaryAxisSizingMode='FIXED';actions.counterAxisSizingMode='AUTO';actions.counterAxisAlignItems='CENTER';actions.setBoundVariable('itemSpacing',s8);
const timeline=m.findOne(n=>n.name==='Expand medication timeline');actions.appendChild(timeline);
const metadata=new Set(['Prescriber','Duration','Refills','Pharmacy','Phone']);
for(const t of m.findAllWithCriteria({types:['TEXT']}))if(metadata.has(t.name)){t.textStyleId=caption.textStyleId;t.setBoundVariable('fontSize',capSize);t.setBoundVariable('lineHeight',capHeight);t.fills=caption.fills;}
const status=m.findOne(n=>n.type==='INSTANCE'&&n.name==='Order and pharmacy');status.setBoundVariable('itemSpacing',s4);
const board=figma.createAutoLayout('VERTICAL');board.name='Row review · Density proposal · Not applied';board.x=160;board.y=2200;board.fills=readme.fills;board.clipsContent=false;roots.push(board);
for(const prop of ['paddingTop','paddingRight','paddingBottom','paddingLeft','itemSpacing']){const v=await figma.variables.getVariableByIdAsync(readme.boundVariables[prop].id);board.setBoundVariable(prop,v);}
function text(template,value,name){const n=template.clone();board.appendChild(n);n.name=name;n.characters=value;n.textAutoResize='HEIGHT';n.resize(1216,24);n.layoutSizingHorizontal='FIXED';n.layoutSizingVertical='HUG';return n;}
text(heading,'Medication rows · Density review','Review title');
text(body,'PROPOSAL · 14 Nov 2026 · Working screen and full-page comparison remain unchanged.\nKeep names and directions readable at 14/20. Use 12/16 for secondary metadata; reduce vertical inset 16 → 8 and related gaps 8 → 4. Move the existing timeline control alongside actions. All medication text and current column widths stay unchanged.','Review scope');
text(heading,'Before · Current first row · 143 px','Before label');const before=samples[0].clone();board.appendChild(before);
const afters=[];
for(let i=0;i<samples.length;i++){
 text(heading,i===0?'After · Compact proposal':'Check · '+samples[i].name.replace('Medication / ',''),'Sample label '+i);
 const n=samples[i].clone();board.appendChild(n);n.swapComponent(m);n.name='PROPOSAL / '+samples[i].name;afters.push(n);
 // Preserve exact source values through the new local component property keys.
 const props={};for(const [key,p]of Object.entries(samples[i].componentProperties))if(keyMap[key])props[keyMap[key]]=p.value;n.setProperties(props);
}
text(body,'Decision still needed: should pharmacy phone and prescribing-source details stay visible in every row, or move into a defined expanded-details view? This proposal preserves them. Hiding them would need an explicit disclosure interaction and destination.','Content decision');
function visible(n,root){for(let p=n;p&&p!==root;p=p.parent)if(!p.visible)return false;return true;}
function copy(n){return n.findAllWithCriteria({types:['TEXT']}).filter(t=>visible(t,n)).map(t=>t.characters).sort();}
const checks=afters.map((n,i)=>({sourceId:samples[i].id,proposalId:n.id,before:samples[i].height,after:n.height,width:n.width,textMatches:JSON.stringify(copy(n))===JSON.stringify(copy(samples[i])),properties:n.componentProperties,columns:n.children.map(c=>({name:c.name,width:c.width,height:c.height})),timelineParent:n.findOne(t=>t.name==='Expand medication timeline').parent.name}));
for(const root of roots)created.push(root.id,...root.findAll(()=>true).map(n=>n.id));
return{createdNodeIds:created,mutatedNodeIds:[],masterId:m.id,boardId:board.id,beforeId:before.id,proposalIds:afters.map(n=>n.id),checks,boardBounds:{width:board.width,height:board.height},propertyMap:keyMap,workingRows:samples.map(n=>({id:n.id,height:n.height})),newVariantCount:0};
