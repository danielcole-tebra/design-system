figma.skipInvisibleInstanceChildren=false;
const board=await figma.getNodeByIdAsync("5:2"),card=await figma.getNodeByIdAsync("5:7");
const text=card.children.filter(n=>n.type==="TEXT");const fonts=new Map();for(const n of text)for(const s of n.getStyledTextSegments(["fontName"]))fonts.set(JSON.stringify(s.fontName),s.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const byId=new Map(text.map(n=>[n.id,n]));const header=byId.get("5:12"),caption=byId.get("5:11");header.characters="ENTER THE REQUEST IN CODEX";caption.characters="The clone request entered in Codex. Send it, then check where Codex saved the files.";
header.textAutoResize="HEIGHT";caption.textAutoResize="HEIGHT";header.resize(1104,header.height);caption.resize(1104,caption.height);header.x=48;caption.x=48;
header.y=byId.get("5:15").y+byId.get("5:15").height+28;
const img=figma.createRectangle();img.name="Screenshot · 01 · Daniel’s Codex clone request";card.appendChild(img);img.x=48;img.y=header.y+header.height+16;img.resize(1104,797);img.fills=[];
caption.y=img.y+img.height+16;
const changed=[header.id,caption.id,card.id,board.id];let y=caption.y+caption.height+28;
for(const[id,gap]of [["5:16",36],["5:17",12],["5:18",48]]){const n=byId.get(id);n.y=y;y+=n.height+gap;changed.push(id);}
card.resize(1200,Math.ceil(y/4)*4);
let py=500;const panels=board.children.filter(n=>n.type==="SECTION").sort((a,b)=>a.y-b.y);for(const p of panels){p.y=py;py+=p.height+96;changed.push(p.id);}board.resize(1360,py-96+80);
return {createdNodeIds:[img.id],mutatedNodeIds:[...new Set(changed)],imageId:img.id,imageSize:{width:img.width,height:img.height},cardBounds:{width:card.width,height:card.height},boardBounds:{width:board.width,height:board.height}};
