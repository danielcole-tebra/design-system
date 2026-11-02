figma.skipInvisibleInstanceChildren=false;
const board=await figma.getNodeByIdAsync("5:2");const card=await figma.getNodeByIdAsync("5:7");
const tt=card.children.filter(n=>n.type==="TEXT"&&n.visible).sort((a,b)=>a.y-b.y);
const fonts=new Map();for(const n of tt)for(const s of n.getStyledTextSegments(["fontName"]))fonts.set(JSON.stringify(s.fontName),s.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const edits={"5:8":"1  Copy the design-system files to your computer","5:9":"Codex will download and save a local copy for you.","5:14":"You’ll need to copy the design-system files onto your computer and save them in a folder. This is called cloning the repository.\n\nChoose somewhere easy to remember, such as a folder called Code. Codex will save the files in a design-system folder inside it: Code/design-system.\n\nYou won’t do your project work in this folder. We’ll create a separate folder for that in the next step.\n\nIn Codex, start a local chat with access to your chosen location and paste this request:","5:18":"Codex confirms where it saved the design-system files and reports any missing tools or access. Keep that folder location handy for the next step."};
const changed=[];let y=48;for(const n of tt){if(edits[n.id])n.characters=edits[n.id];n.textAutoResize="HEIGHT";n.resize(1104,n.height);n.x=48;n.y=y;const gap=n.id==="5:8"||n.fontSize===20?12:["5:9","5:16","5:18"].includes(n.id)?36:20;y+=n.height+gap;changed.push(n.id);}
card.resize(1200,Math.ceil((y+28)/4)*4);
const panels=board.children.filter(n=>n.type==="SECTION").sort((a,b)=>a.y-b.y);let py=card.y;
for(const p of panels){p.y=py;py+=p.height+96;changed.push(p.id);}board.resize(board.width,py-96+80);changed.push(board.id);
const overflow=tt.filter(n=>n.x+n.width>card.width||n.y+n.height>card.height).map(n=>n.id);
const overlap=tt.slice(1).filter((n,i)=>n.y<tt[i].y+tt[i].height).map(n=>n.id);
return {createdNodeIds:[],mutatedNodeIds:changed,cardBounds:{width:card.width,height:card.height},boardBounds:{width:board.width,height:board.height},overflow,textOverlaps:overlap,copy:tt.filter(n=>edits[n.id]).map(n=>({id:n.id,text:n.characters})),panelOrder:panels.map(p=>p.id)};
