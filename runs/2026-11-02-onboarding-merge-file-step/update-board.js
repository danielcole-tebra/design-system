figma.skipInvisibleInstanceChildren=false;
const board=await figma.getNodeByIdAsync('5:2');
const archived=await figma.getNodeByIdAsync('5:43');
const card=await figma.getNodeByIdAsync('5:55');
const changes={
 '5:5':'Follow seven steps from setup to a reviewed rebuild. Use your own project and Figma file; the screenshots show examples.',
 '5:56':'4  Set up your Figma file',
 '5:57':'Start a new file, then add the library for easy browsing.',
 '5:62':'Create a new Figma Design file. Name it whatever you like and name its page First rebuild. Copy the file link from Share for the setup check in step 5.\n\nRecommended: add the rebuild library in this file.\n\n1. Open Assets → Libraries.\n\n2. Find Design System Rebuild. Confirm its source using the link below.\n\n3. Choose Add to file. If it is under Used in this file, it is already added. Close the dialog to browse its assets.',
 '5:66':'Your new file is editable and its link is ready for Codex. If you added the library, it appears under Used in this file. Codex checks library access and actual imports during the build.',
 '5:68':'5  Check the setup with Codex',
 '5:80':'6  Copy the image and request a rebuild',
 '5:92':'7  Review your rebuild',
 '5:90':'Wait for the editable Empty and Filled cards at 640 and 400 px, screenshots in chat, a Figma section link and a verified what-changed checklist. Then continue to step 7.'
};
const texts=[...card.children.filter(n=>n.type==='TEXT'),...(await Promise.all(Object.keys(changes).map(id=>figma.getNodeByIdAsync(id)))),await figma.getNodeByIdAsync('5:51')];
const fonts=new Map();for(const n of texts)for(const s of n.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const mutated=new Set(),created=[];
for(const[id,copy]of Object.entries(changes)){const n=await figma.getNodeByIdAsync(id);n.characters=copy;n.textAutoResize='HEIGHT';n.resize(id==='5:5'?1200:1104,n.height);mutated.add(id);}
const readme=(await figma.getNodeByIdAsync('5:51')).clone();archived.appendChild(readme);readme.name='README · Superseded file-creation card';readme.characters='Archived November 2, 2026 at Daniel’s request. Creating a file is now part of step 4 (5:55). The standalone card and its screenshot request are superseded; all original nodes are preserved.';readme.textAutoResize='HEIGHT';readme.resize(1104,10);readme.x=48;readme.y=archived.height+24;archived.resizeWithoutConstraints(1200,readme.y+readme.height+48);archived.name='Archived · Standalone file creation · 2026-11-02';archived.visible=false;created.push(readme.id);mutated.add(archived.id);
let y=48;for(const n of card.children.filter(n=>n.visible).sort((a,b)=>a.y-b.y)){n.x=48;n.y=y;mutated.add(n.id);y=Math.ceil((n.y+n.height)/4)*4+(n.type==='TEXT'&&n.fontSize===20?12:24);}
card.resizeWithoutConstraints(1200,y+24);
const cards=board.children.filter(n=>n.type==='SECTION'&&n.visible).sort((a,b)=>a.y-b.y);
let cy=500;const errors=[];
for(const c of cards){c.x=80;c.y=cy;cy+=c.height+96;mutated.add(c.id);const nodes=c.children.filter(n=>n.visible).sort((a,b)=>a.y-b.y);for(let i=0;i<nodes.length;i++){const n=nodes[i];if(n.x+n.width>c.width||n.y+n.height>c.height)errors.push({id:n.id,reason:'overflow'});if(i&&n.y<nodes[i-1].y+nodes[i-1].height)errors.push({id:n.id,reason:'overlap'});}}
board.resizeWithoutConstraints(1360,cy-96+80);mutated.add(board.id);
return {createdNodeIds:created,mutatedNodeIds:[...mutated],archivedId:archived.id,changes,errors,cards:cards.map(c=>({id:c.id,y:c.y,height:c.height})),boardHeight:board.height};

