figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('1376:21590'));
const sourceIds=['1319:4659','1319:4663','1319:4733','1319:4734','1319:4752','1319:4847','1319:5548'];
const sources=await Promise.all(sourceIds.map(id=>figma.getNodeByIdAsync(id)));
const screens=await Promise.all(['1376:21591','1376:28101','1376:29198','1376:30295','1376:31392'].map(id=>figma.getNodeByIdAsync(id)));
const fonts=new Map();for(const n of sources)for(const t of n.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const created=[],mutated=[],evidence=[];
for(const screen of screens){
if(screen.children.some(n=>n.name==='11/13 · Note shell'))throw new Error('Already aligned; inspect before retry');
const fab=screen.children.find(n=>n.name.startsWith('Floating recorder · '));
for(const n of screen.children){if(n===fab)continue;if(n.visible){n.visible=false;mutated.push(n.id);}}
const clones=[];
for(let i=0;i<sources.length;i++){const n=sources[i].clone();screen.appendChild(n);created.push(n.id);n.visible=true;
for(const child of [n,...n.findAll(()=>true)])if('reactions'in child&&child.reactions.length)await child.setReactionsAsync([]);
if(i===1){n.name='11/13 · Note shell';n.y-=72;n.resize(n.width,n.height+72);}
if(i===2){n.name='11/13 · Note body and toolbar';n.y-=72;n.resize(n.width,n.height+72);}
if(i===3){n.name='11/13 · Note editor viewport';n.y-=72;n.resize(n.width,n.height+72-112);n.clipsContent=true;}
if(i===4)n.y-=72;
clones.push(n);
}
screen.appendChild(fab);fab.x=682-fab.width;fab.y=855;mutated.push(fab.id,screen.id);
const footer=clones[1].children.find(n=>n.name==='Footer');
const all=clones.flatMap(n=>[n,...n.findAll(()=>true)]);const counts={};const images=[];for(const n of all){counts[n.type]=(counts[n.type]||0)+1;if('fills'in n&&Array.isArray(n.fills)&&n.fills.some(p=>p.type==='IMAGE'))images.push({id:n.id,name:n.name});}
evidence.push({screenId:screen.id,sourceIds,clonedIds:clones.map(n=>n.id),note:{y:clones[1].y,h:clones[1].height},editor:{y:clones[3].y,h:clones[3].height,bottom:clones[3].y+clones[3].height},fab:{x:fab.x,y:fab.y,w:fab.width,h:fab.height},footerY:clones[1].y+footer.y,counts,images,fontFamilies:[...new Set(all.filter(n=>n.type==='TEXT').flatMap(n=>n.getStyledTextSegments(['fontName']).map(s=>s.fontName.family)))]});
}
return {createdNodeIds:created,mutatedNodeIds:mutated,evidence};
