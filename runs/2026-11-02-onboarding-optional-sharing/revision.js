figma.skipInvisibleInstanceChildren=false;
const board=await figma.getNodeByIdAsync("5:2");const ids=["5:43","5:91"];const cards=await Promise.all(ids.map(id=>figma.getNodeByIdAsync(id)));
const fonts=new Map();for(const p of cards)for(const n of p.children.filter(n=>n.type==="TEXT"))for(const s of n.getStyledTextSegments(["fontName"]))fonts.set(JSON.stringify(s.fontName),s.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const edited={
"5:50":"Create a Figma Design file in the team’s practice location. Name it Tebra first rebuild · Your name.\n\nCreate a page named First rebuild and copy the file link for Codex.\n\nOptional: if you’d like feedback, post the link in #uxhotline or share it with Daniel Cole.",
"5:54":"You can edit your new file and have its link ready for Codex. Sharing it for feedback is optional."
};
const changed=new Set([board.id]);const current=await figma.getNodeByIdAsync("5:97");edited["5:97"]=current.characters.replace("Daniel can access the file for review.\n","");
for(const p of cards){const texts=p.children.filter(n=>n.type==="TEXT"&&n.visible).sort((a,b)=>a.y-b.y);const gaps=texts.map((n,i)=>i+1<texts.length?texts[i+1].y-(n.y+n.height):48);let y=48;
for(let i=0;i<texts.length;i++){const n=texts[i];if(edited[n.id])n.characters=edited[n.id];n.textAutoResize="HEIGHT";n.resize(1104,n.height);n.y=y;y+=n.height+gaps[i];changed.add(n.id);}p.resize(p.width,Math.ceil(y/4)*4);changed.add(p.id);}
const panels=board.children.filter(n=>n.type==="SECTION").sort((a,b)=>a.y-b.y);let py=500;for(const p of panels){p.y=py;py+=p.height+96;changed.add(p.id);}board.resize(board.width,py-96+80);
const issues=[];for(const p of cards){const v=p.children.filter(n=>n.visible);for(const n of v)if(n.x<0||n.y<0||n.x+n.width>p.width||n.y+n.height>p.height)issues.push(n.id);}
return {createdNodeIds:[],mutatedNodeIds:[...changed],updatedText:Object.entries(edited).map(([id,text])=>({id,text})),overflow:issues,panelOrder:panels.map(p=>p.id),cardBounds:cards.map(p=>({id:p.id,width:p.width,height:p.height}))};
