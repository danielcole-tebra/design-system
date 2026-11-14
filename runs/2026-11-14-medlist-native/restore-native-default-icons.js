figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('0:1'));
await Promise.all([{family:'Akkurat LL',style:'Regular'},{family:'Akkurat LL',style:'Bold'}].map(f=>figma.loadFontAsync(f)));
const changed=[];
for(const [id,label] of [['2:2113','Add to med list'],['2:2120','Prescribe medications']]){
 const n=await figma.getNodeByIdAsync(id);n.resetOverrides();
 const props=n.componentProperties;
 n.setProperties({[Object.keys(props).find(k=>k.startsWith('Label#'))]:label,[Object.keys(props).find(k=>k.startsWith('Start icon#'))]:true});
 n.name=label;changed.push(n.id);
}
const timeline=await figma.getNodeByIdAsync('2:2286');
timeline.resetOverrides();timeline.name='Expand medication timeline';
// Preserve the local visibility property association when resetting the native instance.
const row=await figma.getNodeByIdAsync('2:2273');const key=Object.keys(row.componentPropertyDefinitions).find(k=>k.startsWith('Show timeline#'));
timeline.componentPropertyReferences={visible:key};timeline.visible=false;changed.push(timeline.id);
return {mutatedNodeIds:changed,reason:'The desired plus and down-caret are already native defaults. Reset redundant swaps, then use only supported label/visibility properties so native contextual ink survives.'};
