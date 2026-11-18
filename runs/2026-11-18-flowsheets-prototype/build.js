figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('2074:8246'));
if(figma.root.children.some(p=>p.name==='Flowsheets · Prototype'))throw new Error('Prototype page already exists; inspect before retry');
const sources=['2074:2019','2074:2413','2074:6422','2074:297','2074:654','2074:654','2074:1002','2074:1002'];
const sourceFonts=new Map();for(const id of [...new Set(sources)]){const n=await figma.getNodeByIdAsync(id);for(const t of n.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))sourceFonts.set(JSON.stringify(s.fontName),s.fontName);}await Promise.all([...sourceFonts.values()].map(f=>figma.loadFontAsync(f)));
const labels=['01 · Vitals · Table','02 · Vitals · Compact chart','03 · Vitals · Expanded charts','04 · Vitals · Saved value detail','05 · Corrected value · Table','06 · Corrected value · History','07 · Excluded value · Table','08 · Excluded value · History'];
const page=$fig.page({name:'Flowsheets · Prototype'});
const paper=$fig.getVar('f1e85cc976b10ea275c03f5d7f21a0dc12cdfee0');
const stages=[],contents=[];
for(let i=0;i<sources.length;i++){
 const content=$fig.get(sources[i]).clone({x:0,y:0,name:labels[i]+' · Content'});
 const stage=$fig.frame({name:labels[i],x:160+(i%4)*1280,y:240+Math.floor(i/4)*1242,width:1120,height:1042,clipsContent:true,fills:[{type:'SOLID',color:paper}]},[content]);
 page.append(stage);stages.push(stage);contents.push(content);
}
await $fig.done();
let cleared=0;for(const content of contents)for(const n of [content.node,...content.node.findAll(()=>true)])if('reactions'in n&&n.reactions.length){await n.setReactionsAsync([]);cleared++;}
const correctedPanel=contents[4].node.children.find(n=>n.name==='History, blood pressure, 7/7/26');
const excludedPanel=contents[6].node.children.find(n=>n.name==='Values entered in error');
$fig.get(correctedPanel.id).set({visible:false});
$fig.get(excludedPanel.id).set({visible:false});
const openExcluded=contents[7].node.children.find(n=>n.name==='Values entered in error');
const closeExcluded=$fig.get('2074:807').clone({name:'Close · Excluded value history',x:openExcluded.width-48,y:4});
$fig.get(openExcluded.id).append(closeExcluded);
await $fig.done();
const links=[];
async function nav(node,target,label){if(!node)throw new Error('Missing control '+label);let top=node;while(top.parent&&top.parent.type!=='PAGE')top=top.parent;if(top.id===target.id)return;await node.setReactionsAsync([{trigger:{type:'ON_CLICK'},actions:[{type:'NODE',destinationId:target.id,navigation:'NAVIGATE',transition:null,resetScrollPosition:false}]}]);links.push({sourceId:node.id,destinationId:target.id,label});}
function copyText(root,value){return root.findAllWithCriteria({types:['TEXT']}).find(n=>n.characters===value);}
for(let i=0;i<4;i++){
 const root=contents[i].node;
 await nav(copyText(root,'Table').parent,stages[0].node,'Table');
 await nav(copyText(root,'Chart').parent,stages[1].node,'Chart');
 if(i===1)await nav(copyText(root,'Expand All'),stages[2].node,'Expand all');
 if(i===2)await nav(copyText(root,'Collapse All'),stages[1].node,'Collapse all');
 if(i<3)await nav(copyText(root,'138/86'),stages[3].node,'Open saved blood-pressure value');
}
const detail=contents[3].node.children.find(n=>n.name==='Blood pressure, 7/7/26');
await nav(detail.children.find(n=>n.name.startsWith('Close · ')),stages[0].node,'Close saved value');
await nav(copyText(contents[4].node,'128/86'),stages[5].node,'Open correction history');
const history=contents[5].node.children.find(n=>n.name==='History, blood pressure, 7/7/26');
await nav(history.children.find(n=>n.name.startsWith('Close · ')),stages[4].node,'Close correction history');
await nav(contents[6].node.findAllWithCriteria({types:['INSTANCE']}).find(n=>n.name==='Action · View History'),stages[7].node,'View excluded value history');
await nav(closeExcluded.node,stages[6].node,'Close excluded history');
await nav(contents[7].node.findAllWithCriteria({types:['INSTANCE']}).find(n=>n.name==='Action · View History'),stages[6].node,'Toggle excluded history closed');
$fig.get(page.node.id).set({flowStartingPoints:[{nodeId:stages[0].node.id,name:'Vitals · Table to chart and saved values'},{nodeId:stages[4].node.id,name:'History example · Corrected value'},{nodeId:stages[6].node.id,name:'History example · Excluded value'}]});
await $fig.done();
return {pageId:page.node.id,pageName:page.node.name,frames:stages.map((s,i)=>({id:s.node.id,name:s.node.name,contentId:contents[i].node.id,sourceId:sources[i],x:s.node.x,y:s.node.y,w:s.node.width,h:s.node.height})),links,clearedInheritedReactionNodes:cleared,newCloseControlId:closeExcluded.node.id,sourcePagesPreserved:true,scope:'Initial read-only Phase 1 prototype; date presets, selector, row filtering and source error states are not wired in this pass.'};
