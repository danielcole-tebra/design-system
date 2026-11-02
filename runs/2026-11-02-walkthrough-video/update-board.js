figma.skipInvisibleInstanceChildren=false;
const b=await figma.getNodeByIdAsync('5:2');const children=b.children.filter(n=>n.visible);
for(const n of children.filter(n=>n.type==='TEXT'))for(const s of n.getStyledTextSegments(['fontName']))await figma.loadFontAsync(s.fontName);
const mutated=[];for(const n of children){n.y+=760;mutated.push(n.id);}
const link=await figma.getNodeByIdAsync('5:6');const intro=await figma.getNodeByIdAsync('5:5');link.y=intro.y+intro.height+20;
const title=figma.createRectangle();b.appendChild(title);title.name='Video title · LET’S BUILD';title.resize(1200,675);title.x=80;title.y=64;title.fills=[];
const summary=figma.createRectangle();b.appendChild(summary);summary.name='Video summary · YOUR TURN';summary.resize(1200,675);summary.x=80;summary.y=Math.max(...children.map(n=>n.y+n.height))+96;summary.fills=[];
b.resizeWithoutConstraints(1360,summary.y+summary.height+80);mutated.push(b.id);
return {createdNodeIds:[title.id,summary.id],mutatedNodeIds:mutated,titleId:title.id,summaryId:summary.id,boardHeight:b.height,preservedOrder:children.filter(n=>n.type==='SECTION').sort((a,b)=>a.y-b.y).map(n=>n.id)};
