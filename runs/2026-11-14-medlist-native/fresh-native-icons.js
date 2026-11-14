figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('0:1'));
await Promise.all([{family:'Akkurat LL',style:'Regular'},{family:'Akkurat LL',style:'Bold'}].map(f=>figma.loadFontAsync(f)));
const created=[],mutated=[];
const area=figma.createAutoLayout('VERTICAL');area.name='Inspection · Medlist native · 2026-11-14 · Superseded icon swaps';area.x=1800;area.y=1250;area.itemSpacing=16;area.resize(800,1);area.primaryAxisSizingMode='AUTO';created.push(area.id);
const note=figma.createText();note.fontName={family:'Akkurat LL',style:'Regular'};note.characters='Retained inspection evidence: these instances had redundant icon swaps. Replaced in the local masters by fresh native instances; no nodes deleted.';note.fontSize=14;note.lineHeight={unit:'PIXELS',value:20};area.appendChild(note);note.textAutoResize='HEIGHT';note.resize(768,note.height);created.push(note.id);
for(const [id,key,label,isButton] of [
 ['2:2113','8fc8f57f80196e40aff7b3b1116226ea0a925120','Add to med list',true],
 ['2:2120','779c8020ce9c68c7eaea65eebf9f568357082060','Prescribe medications',true],
 ['2:2286','e073fb6fa591240262a53206f29e6343d81ca5e3','Expand medication timeline',false]
]){
 const old=await figma.getNodeByIdAsync(id);const parent=old.parent,index=parent.children.indexOf(old),refs=old.componentPropertyReferences;
 const master=await figma.importComponentByKeyAsync(key),n=master.createInstance();n.name=label;parent.insertChild(index,n);created.push(n.id);
 if(isButton){const p=n.componentProperties;n.setProperties({[Object.keys(p).find(k=>k.startsWith('Label#'))]:label,[Object.keys(p).find(k=>k.startsWith('Start icon#'))]:true});}
 else {n.componentPropertyReferences=refs;n.visible=false;}
 n.isExposedInstance=true;old.componentPropertyReferences={};area.appendChild(old);old.visible=true;mutated.push(old.id,parent.id);
}
return {createdNodeIds:created,mutatedNodeIds:mutated,inspectionId:area.id};
