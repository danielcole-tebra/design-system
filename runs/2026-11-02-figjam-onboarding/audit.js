figma.skipInvisibleInstanceChildren=false;
const board=await figma.getNodeByIdAsync("2:2");
const nodes=board.findAll(()=>true), counts={};
for(const n of nodes) counts[n.type]=(counts[n.type]||0)+1;
const images=nodes.filter(n=>"fills" in n && Array.isArray(n.fills)&&n.fills.some(f=>f.type==="IMAGE")).map(n=>({id:n.id,name:n.name,w:n.width,h:n.height,hash:n.fills.find(f=>f.type==="IMAGE").imageHash}));
const texts=nodes.filter(n=>n.type==="TEXT");
const badFonts=texts.filter(n=>n.fontName.family!=="Inter").map(n=>n.id);
const overflow=nodes.filter(n=>n.parent.type==="SECTION"&&(n.x<0||n.y<0||n.x+n.width>n.parent.width+1||n.y+n.height>n.parent.height+1)).map(n=>({id:n.id,parent:n.parent.id}));
const overlaps=[];
for(const p of nodes.filter(n=>n.type==="SECTION")){const ts=p.children.filter(n=>n.type==="TEXT");for(let a=0;a<ts.length;a++)for(let b=a+1;b<ts.length;b++){const x=ts[a],y=ts[b];if(x.x<y.x+y.width&&y.x<x.x+x.width&&x.y<y.y+y.height&&y.y<x.y+x.height)overlaps.push([x.id,y.id]);}}
const links=texts.flatMap(n=>n.getStyledTextSegments(["hyperlink"]).filter(s=>s.hyperlink).map(s=>({nodeId:n.id,label:s.characters,target:s.hyperlink})));
return {boardId:board.id,counts,totalDescendants:nodes.length,images,badFonts,overflow,textOverlaps:overlaps,links};
