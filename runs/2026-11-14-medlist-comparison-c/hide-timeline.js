figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('0:1'));
const set=await figma.getNodeByIdAsync('47:1540');
const rows=figma.currentPage.findAllWithCriteria({types:['INSTANCE']}).filter(n=>['47:1541','47:1577'].includes(n.mainComponent?.id));
const mutated=[];
for(const root of [...set.children,...rows]){
 if(root.type==='INSTANCE')root.setProperties({'Show timeline#34:15':false});
 for(const n of root.findAll(n=>['Timeline access','Clinical timeline','Expand medication timeline','Actions supporting details'].includes(n.name))){n.visible=false;mutated.push(n.id);}
 mutated.push(root.id);
}
set.description+=' 2026-11-14 Daniel requested removing timeline access from the new version for now. Timeline label, caret and supporting wrapper are retained hidden in both variants and all current samples. Comparison C consumes these rows.';
mutated.push(set.id);
return {mutatedNodeIds:mutated,affectedRowIds:rows.map(n=>n.id),boardId:'47:1675'};
