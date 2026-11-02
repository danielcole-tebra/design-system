const SETUP_PROMPT="Check my Tebra Figma setup before building.\nDestination: [paste my new Figma Design file link]\nSource library: https://www.figma.com/design/YX2n4YLrEpBXNbcc73T6dw\n\nRead AGENTS.md from the attached design-system folder. Inspect the\ndestination and available published library\nassets without changing either file. Confirm the exact file identities,\navailable editing/screenshot capabilities, and required component,\nstyle, and variable discovery. Report available font evidence and\nanything that still requires an actual import or render to verify.\nDo not claim that permissions, imports, fonts, or screenshots have been\ntested if you have only listed the available tools. Report missing\naccess and next steps. Keep the source library unchanged.";
figma.skipInvisibleInstanceChildren=false;
const board=await figma.getNodeByIdAsync("5:2"),card=await figma.getNodeByIdAsync("5:67");
const texts=card.children.filter(n=>n.type==="TEXT"),fonts=new Map();for(const n of texts)for(const s of n.getStyledTextSegments(["fontName"]))fonts.set(JSON.stringify(s.fontName),s.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const m=new Map(texts.map(n=>[n.id,n]));const created=[],changed=new Set([board.id,card.id]);
const edits={
"5:74":"Copy the full prompt below into your own Codex work-project chat. Replace the destination placeholder with your new Figma Design file link, then send it.",
"5:72":"SETUP-CHECK PROMPT IN CODEX",
"5:71":"Example of the prompt entered in Codex. Use your own work project and replace the destination placeholder before sending. This screenshot shows the request, not completed checks."
};
for(const[id,value]of Object.entries(edits)){const n=m.get(id);n.characters=value;n.textAutoResize="HEIGHT";n.resize(1104,n.height);changed.add(id);}
const oldLink=m.get("5:76");oldLink.visible=false;oldLink.name="ARCHIVED · external prompt link · replaced by inline prompt";changed.add(oldLink.id);
const heading=m.get("5:73").clone();card.appendChild(heading);heading.characters="COPY THIS PROMPT";created.push(heading.id);
const body=m.get("5:74").clone();card.appendChild(body);body.name="Full setup-check prompt · copy into Codex";body.characters=SETUP_PROMPT;body.textAutoResize="HEIGHT";body.resize(1104,body.height);created.push(body.id);
let y=48;for(const[n,gap]of [[m.get("5:68"),12],[m.get("5:69"),36],[m.get("5:73"),12],[m.get("5:74"),28],[heading,16],[body,28],[m.get("5:75"),36],[m.get("5:77"),12],[m.get("5:78"),36],[m.get("5:72"),16]]){n.x=48;n.y=y;y+=n.height+gap;if(!created.includes(n.id))changed.add(n.id);}
const img=figma.createRectangle();card.appendChild(img);img.name="Screenshot · 06 · Daniel’s setup-check prompt";img.x=48;img.y=y;img.resize(1104,793);img.fills=[];created.push(img.id);
const caption=m.get("5:71");caption.x=48;caption.y=img.y+img.height+16;card.resize(1200,Math.ceil((caption.y+caption.height+48)/4)*4);
const panels=board.children.filter(n=>n.type==="SECTION").sort((a,b)=>a.y-b.y);let py=500;for(const p of panels){p.y=py;py+=p.height+96;changed.add(p.id);}board.resize(board.width,py-96+80);
return {createdNodeIds:created,mutatedNodeIds:[...changed],imageId:img.id,promptId:body.id,prompt:body.characters,archivedLinkId:oldLink.id,cardBounds:{width:card.width,height:card.height},panelOrder:panels.map(p=>p.id)};
