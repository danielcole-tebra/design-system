figma.skipInvisibleInstanceChildren=false;
const board=await figma.getNodeByIdAsync("5:2"),card=await figma.getNodeByIdAsync("5:55"),ready=await figma.getNodeByIdAsync("5:91");
const fonts=new Map();for(const p of [card,ready])for(const n of p.children.filter(n=>n.type==="TEXT"))for(const s of n.getStyledTextSegments(["fontName"]))fonts.set(JSON.stringify(s.fontName),s.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const m=new Map(card.children.filter(n=>n.type==="TEXT").map(n=>[n.id,n]));
const edits={
"5:56":"5 Add the rebuild library (recommended)",
"5:57":"Make it easy to browse and use Tebra’s assets yourself.",
"5:62":"In your new file, open Assets → Libraries. Find Design System Rebuild and confirm the source using the link below.\n\nChoose Add to file. If it appears under Used in this file, it is already added. Close the dialog to browse its assets.",
"5:63":"Codex can import accessible published components through the Figma connection without this manual step. Adding the library is recommended for browsing and editing in Figma.",
"5:60":"LIBRARY ADDED TO A FILE",
"5:59":"Example from SDE Alpha Prototypes: Design System Rebuild appears under Used in this file. Follow these steps in your own new file.",
"5:66":"If added, Design System Rebuild appears under Used in this file. Codex still checks published-library access and reports any import problems."
};
const changed=new Set([board.id,card.id,ready.id]);
for(const[id,value]of Object.entries(edits)){const n=m.get(id);n.characters=value;n.textAutoResize="HEIGHT";n.resize(1104,n.height);changed.add(id);}
let y=48;for(const[id,gap]of [["5:56",12],["5:57",36],["5:61",12],["5:62",20],["5:63",20],["5:64",36],["5:65",12],["5:66",36],["5:60",16]]){const n=m.get(id);n.x=48;n.y=y;y+=n.height+gap;changed.add(id);}
const img=figma.createRectangle();img.name="Screenshot · 05 · Daniel’s rebuild library example";card.appendChild(img);img.x=48;img.y=y;img.resize(1104,694);img.fills=[];
const caption=m.get("5:59");caption.x=48;caption.y=img.y+img.height+16;card.resize(1200,Math.ceil((caption.y+caption.height+48)/4)*4);
const rt=ready.children.filter(n=>n.type==="TEXT"&&n.visible).sort((a,b)=>a.y-b.y);const gaps=rt.map((n,i)=>i+1<rt.length?rt[i+1].y-n.y-n.height:48);
const rb=await figma.getNodeByIdAsync("5:95");const previousReady=rb.characters;rb.characters=rb.characters.replace("Your new Design file has Design System Rebuild enabled.","Your new Design file is editable. Codex can discover the published rebuild library; adding it manually is recommended.");
if(rb.characters===previousReady)throw new Error("Readiness wording did not match; inspect before continuing");
let ry=48;for(let i=0;i<rt.length;i++){const n=rt[i];n.textAutoResize="HEIGHT";n.resize(1104,n.height);n.y=ry;ry+=n.height+gaps[i];changed.add(n.id);}ready.resize(1200,Math.ceil(ry/4)*4);
const panels=board.children.filter(n=>n.type==="SECTION").sort((a,b)=>a.y-b.y);let py=500;for(const p of panels){p.y=py;py+=p.height+96;changed.add(p.id);}board.resize(board.width,py-96+80);
return {createdNodeIds:[img.id],mutatedNodeIds:[...changed],imageId:img.id,editedText:edits,previousReady,currentReady:rb.characters,panelOrder:panels.map(p=>p.id)};
