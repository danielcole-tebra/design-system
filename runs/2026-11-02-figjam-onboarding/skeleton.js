figma.skipInvisibleInstanceChildren=false;
const fontNames=[{family:"Inter",style:"Regular"},{family:"Inter",style:"Bold"}];
await Promise.all(fontNames.map(f=>figma.loadFontAsync(f)));
const ids=[];
const board=figma.createSection(); ids.push(board.id); board.name=""; board.resize(3720,5580); board.x=200; board.y=200; board.fills=[{type:"SOLID",color:{r:1,g:1,b:1}}];
function txt(parent,text,x,y,w,size=24,bold=false){const t=figma.createText();ids.push(t.id);t.fontName=fontNames[bold?1:0];t.fontSize=size;t.lineHeight={unit:"PERCENT",value:140};t.fills=[{type:"SOLID",color:{r:30/255,g:30/255,b:30/255}}];t.characters=text;t.textAutoResize="HEIGHT";t.resize(w,10);parent.appendChild(t);t.x=x;t.y=y;return t;}
txt(board,"Get started with Codex + Figma",80,64,3500,80,true);
txt(board,"Tebra design system · A visual setup guide for designers",80,196,3500,36);
txt(board,"Follow 1–7 in reading order. Each step has instructions, a reference image and a checkpoint.\nReference images show official examples or guide excerpts, not a completed Tebra setup.",80,272,3500,24);
const link=txt(board,"Open the full setup guide ↗",80,376,2000,24,true);link.setRangeHyperlink(0,link.characters.length,{type:"URL",value:"https://github.com/danielcole-tebra/design-system/blob/master/GETTING-STARTED.md"});
const panels=[];
for(let i=0;i<8;i++){const p=figma.createSection();ids.push(p.id);p.name="";p.resize(1720,1120);board.appendChild(p);p.x=80+(i%2)*1840;p.y=500+Math.floor(i/2)*1220;p.fills=[{type:"SOLID",color:i%2?{r:248/255,g:245/255,b:255/255}:{r:245/255,g:251/255,b:1}}];panels.push(p.id);}
return {createdNodeIds:ids,boardId:board.id,panelIds:panels,pageId:figma.currentPage.id,bounds:{width:board.width,height:board.height},fonts:fontNames};
