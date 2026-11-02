figma.skipInvisibleInstanceChildren=false;
const board=await figma.getNodeByIdAsync("5:2"),img=await figma.getNodeByIdAsync("22:2");
const cards=board.children.filter(n=>n.type==="SECTION").sort((a,b)=>a.y-b.y);
const overflow=[],overlaps=[];
for(const p of cards){const v=p.children.filter(n=>n.visible);for(let i=0;i<v.length;i++){const a=v[i];if(a.x<0||a.y<0||a.x+a.width>p.width||a.y+a.height>p.height)overflow.push(a.id);for(let j=i+1;j<v.length;j++){const b=v[j];if(a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y)overlaps.push([a.id,b.id]);}}}
return {image:{id:img.id,width:img.width,height:img.height,fills:img.fills},overflow,overlaps,panelOrder:cards.map(n=>n.id),panelGaps:cards.slice(1).map((n,i)=>n.y-cards[i].y-cards[i].height),boardBounds:{width:board.width,height:board.height},updatedCards:cards.filter(n=>["5:55","5:91"].includes(n.id)).map(p=>({id:p.id,width:p.width,height:p.height,text:p.children.filter(n=>n.type==="TEXT"&&n.visible).map(n=>({id:n.id,text:n.characters}))}))};
