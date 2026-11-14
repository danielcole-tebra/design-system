figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('0:1'));
await Promise.all([{family:'Akkurat LL',style:'Regular'},{family:'Akkurat LL',style:'Bold'},{family:'Inter',style:'Regular'}].map(f=>figma.loadFontAsync(f)));
const changed=[];
for(const id of ['2:1868','2:2028','2:2203','2:2273']){
 const root=await figma.getNodeByIdAsync(id);
 for(const n of root.findAllWithCriteria({types:['INSTANCE']})){
  let parent=n.parent,insideInstance=false;
  while(parent&&parent!==root){if(parent.type==='INSTANCE')insideInstance=true;parent=parent.parent;}
  if(!insideInstance){n.isExposedInstance=true;changed.push(n.id);}
 }
}
const row=await figma.getNodeByIdAsync('2:2320');
return {mutatedNodeIds:changed,rowExposedControls:row.exposedInstances.map(n=>({id:n.id,name:n.name}))};
