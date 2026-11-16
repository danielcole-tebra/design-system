figma.skipInvisibleInstanceChildren=false;await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('104:4346'));
const n=await figma.getNodeByIdAsync('104:7574');n.strokesIncludedInLayout=false;
return {mutatedNodeIds:[n.id],width:n.width,height:n.height,children:n.children.map(c=>({id:c.id,name:c.name,x:c.x,width:c.width}))};
