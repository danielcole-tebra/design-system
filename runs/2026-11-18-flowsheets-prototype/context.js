figma.skipInvisibleInstanceChildren=false;const p=await figma.getNodeByIdAsync('2190:3121');await figma.setCurrentPageAsync(p);
const popupSource=(await figma.getNodeByIdAsync('2190:3842')).children.find(n=>n.name==='Blood pressure, 7/7/26');const fonts=new Map();for(const id of ['2190:3256','2190:3487','2190:3842'])for(const t of (await figma.getNodeByIdAsync(id)).findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));const paper=$fig.getVar('f1e85cc976b10ea275c03f5d7f21a0dc12cdfee0');const extra=[];
for(const [source,name,x]of[['2190:3256','05 · Vitals · Chart value detail',1440],['2190:3487','06 · Vitals · Expanded chart value detail',2720]]){
const base=$fig.get(source).clone({name:name+' · Content',x:0,y:0});const popup=$fig.get(popupSource.id).clone({name:'Blood pressure, 7/7/26',x:362,y:244});
const stage=$fig.frame({name,x,y:1482,width:1120,height:1042,clipsContent:true,fills:[{type:'SOLID',color:paper}]},[base,popup]);extra.push({stage,base,popup});}
await $fig.done();
for(const e of extra)for(const n of e.base.node.findAll(()=>true))if('reactions'in n&&n.reactions.length)await n.setReactionsAsync([]);
function t(n,s){return n.findAllWithCriteria({types:['TEXT']}).find(x=>x.characters===s);}
const links=[];async function nav(n,id,label){await n.setReactionsAsync([{trigger:{type:'ON_CLICK'},actions:[{type:'NODE',destinationId:id,navigation:'NAVIGATE',transition:null,resetScrollPosition:false}]}]);links.push({sourceId:n.id,destinationId:id,label});}
const compact=await figma.getNodeByIdAsync('2190:3256'),expanded=await figma.getNodeByIdAsync('2190:3487');
await nav(t(compact,'138/86'),extra[0].stage.node.id,'Open chart value in chart context');await nav(t(expanded,'138/86'),extra[1].stage.node.id,'Open expanded chart value in chart context');
for(let i=0;i<extra.length;i++){const e=extra[i];await nav(e.popup.node.children.find(n=>n.name.startsWith('Close · ')),i===0?'2190:3255':'2190:3486','Return to originating chart');await nav(t(e.base.node,'Table').parent,'2190:3122','Table');await nav(t(e.base.node,'Chart').parent,'2190:3255','Chart');}
$fig.get('2190:3841').set({x:160,y:1482});
const historyIds=['2190:3995','2190:4141','2190:4287','2190:4430'];const names=['07 · Corrected value · Table','08 · Corrected value · History','09 · Excluded value · Table','10 · Excluded value · History'];historyIds.forEach((id,i)=>$fig.get(id).set({name:names[i],x:160+i*1280,y:2724}));
await $fig.done();
figma.currentPage.selection=[await figma.getNodeByIdAsync('2190:3122'),...extra.map(e=>e.stage.node)];figma.viewport.scrollAndZoomIntoView(figma.currentPage.children.filter(n=>n.type==='FRAME'));
return {createdNodeIds:extra.flatMap(e=>[e.stage.node.id,e.base.node.id,e.popup.node.id]),extraFrames:extra.map(e=>({id:e.stage.node.id,name:e.stage.node.name})),links,allFrameIds:['2190:3122','2190:3255','2190:3486','2190:3841',...extra.map(e=>e.stage.node.id),...historyIds],reason:'Chart values retain compact or expanded chart context; closing returns to that same chart.'};
