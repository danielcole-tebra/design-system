figma.skipInvisibleInstanceChildren=false;await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('17:881'));
const positions=[['52:2510',6462,80],['52:2451',6462,160],['52:2511',8062,160],['56:3026',8062,600]],changes=[];
for(const [id,x,y]of positions){const n=await figma.getNodeByIdAsync(id);changes.push({id,before:[n.x,n.y],after:[x,y]});n.x=x;n.y=y;}
const screen=await figma.getNodeByIdAsync('77:4774'),all=screen.findAll(()=>true),counts={};for(const n of all)counts[n.type]=(counts[n.type]||0)+1;
return{mutatedNodeIds:positions.map(p=>p[0]),changes,descendantCount:all.length,counts,imageNodes:all.filter(n=>Array.isArray(n.fills)&&n.fills.some(f=>f.type==='IMAGE')).map(n=>({id:n.id,name:n.name,type:n.type,width:n.width,height:n.height}))};
