figma.skipInvisibleInstanceChildren=false;
const board=await figma.getNodeByIdAsync("5:2"),card=await figma.getNodeByIdAsync("5:19");
const text=card.children.filter(n=>n.type==="TEXT");const fonts=new Map();for(const n of text)for(const s of n.getStyledTextSegments(["fontName"]))fonts.set(JSON.stringify(s.fontName),s.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const m=new Map(text.map(n=>[n.id,n]));const head=m.get("5:24"),cap=m.get("5:23");
head.characters="CREATE YOUR CODEX PROJECT";cap.characters="Open Choose project, then select New project. Use your own project name and work folder.";
head.textAutoResize="HEIGHT";cap.textAutoResize="HEIGHT";head.resize(1104,head.height);cap.resize(1104,cap.height);head.x=48;cap.x=48;
head.y=m.get("5:26").y+m.get("5:26").height+28;
const img=figma.createRectangle();img.name="Screenshot · 02 · Daniel’s New project menu";card.appendChild(img);img.x=48;img.y=head.y+head.height+16;img.resize(1104,795);img.fills=[];cap.y=img.y+img.height+16;
const changed=[head.id,cap.id,card.id,board.id];let y=cap.y+cap.height+28;
for(const[id,gap]of [["5:27",20],["5:28",36],["5:29",12],["5:30",48]]){const n=m.get(id);n.y=y;y+=n.height+gap;changed.push(id);}
card.resize(1200,Math.ceil(y/4)*4);
let py=500;const panels=board.children.filter(n=>n.type==="SECTION").sort((a,b)=>a.y-b.y);for(const p of panels){p.y=py;py+=p.height+96;changed.push(p.id);}board.resize(1360,py-96+80);
return {createdNodeIds:[img.id],mutatedNodeIds:[...new Set(changed)],imageId:img.id,imageSize:{width:img.width,height:img.height},cardBounds:{width:card.width,height:card.height},boardBounds:{width:board.width,height:board.height}};
