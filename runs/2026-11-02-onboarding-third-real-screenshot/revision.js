figma.skipInvisibleInstanceChildren=false;
const board=await figma.getNodeByIdAsync("5:2"),card=await figma.getNodeByIdAsync("5:31");
const tt=card.children.filter(n=>n.type==="TEXT");const fonts=new Map();for(const n of tt)for(const s of n.getStyledTextSegments(["fontName"]))fonts.set(JSON.stringify(s.fontName),s.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));const m=new Map(tt.map(n=>[n.id,n]));
const action=m.get("5:38"),head=m.get("5:36"),cap=m.get("5:35");
action.characters="Open Settings → Plugins in Codex and find Figma. If it is already installed, leave it enabled. Otherwise, install it and complete sign-in with your work Figma account.\n\nReturn to your project chat. Start a new chat if the tools have not appeared.";
head.characters="FIGMA ENABLED IN CODEX";cap.characters="Settings → Plugins shows Figma installed with its toggle enabled.";
for(const n of [action,head,cap]){n.textAutoResize="HEIGHT";n.resize(1104,n.height);n.x=48;}
head.y=action.y+action.height+28;
const img=figma.createRectangle();img.name="Screenshot · 03 · Daniel’s Figma plugin settings";card.appendChild(img);img.x=48;img.y=head.y+head.height+16;img.resize(1104,795);img.fills=[];cap.y=img.y+img.height+16;
const changed=[action.id,head.id,cap.id,card.id,board.id];let y=cap.y+cap.height+28;
for(const[id,gap]of [["5:39",20],["5:40",36],["5:41",12],["5:42",48]]){const n=m.get(id);n.y=y;y+=n.height+gap;changed.push(id);}
card.resize(1200,Math.ceil(y/4)*4);let py=500;const panels=board.children.filter(n=>n.type==="SECTION").sort((a,b)=>a.y-b.y);
for(const p of panels){p.y=py;py+=p.height+96;changed.push(p.id);}board.resize(1360,py-96+80);
return {createdNodeIds:[img.id],mutatedNodeIds:[...new Set(changed)],imageId:img.id,imageSize:{width:img.width,height:img.height},cardBounds:{width:card.width,height:card.height},boardBounds:{width:board.width,height:board.height}};
