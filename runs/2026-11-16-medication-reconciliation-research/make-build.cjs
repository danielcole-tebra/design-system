const fs=require('fs'),path=require('path');
const root=__dirname;
const content=JSON.parse(fs.readFileSync(path.join(root,'content.json'),'utf8'));
const uploads=JSON.parse(fs.readFileSync(path.join(root,'uploads.json'),'utf8'));
if(uploads.some(x=>!x.response?.success))throw new Error('Missing image upload');
const assets=Object.fromEntries(uploads.map(x=>[x.name,{id:x.response.placedOnNodeId,width:x.width,height:x.height,hash:x.response.imageHash}]));
const code=`
figma.skipInvisibleInstanceChildren=false;
const previous=await figma.getNodeByIdAsync('1:2');
const previousScope={id:previous.id,descendants:previous.findAll(()=>true).length,x:previous.x,y:previous.y,width:previous.width,height:previous.height};
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('4:2'));
await Promise.all(['Regular','Bold','Medium'].map(style=>figma.loadFontAsync({family:'Inter',style})));
const data=${JSON.stringify(content)};
const assets=${JSON.stringify(assets)};
const board=await figma.getNodeByIdAsync('6:2');
const created=[],mutated=[board.id],panels=[],figures=[],links=[];
const ink={r:30/255,g:30/255,b:30/255},grey={r:249/255,g:249/255,b:249/255},white={r:1,g:1,b:1};
const grid=n=>Math.ceil(n/4)*4;
function text(parent,copy,x,y,w,size=24,style='Regular'){
 const n=figma.createText();created.push(n.id);n.fontName={family:'Inter',style};n.fontSize=size;n.lineHeight={unit:'PIXELS',value:grid(size*1.35)};n.characters=copy;n.fills=[{type:'SOLID',color:ink}];n.textAutoResize='HEIGHT';n.resize(w,n.height);parent.appendChild(n);n.x=x;n.y=y;return n;
}
function section(parent,x,y,w,h,fill=grey){const s=figma.createSection();created.push(s.id);s.name='';parent.appendChild(s);s.x=x;s.y=y;s.resize(w,h);s.fills=[{type:'SOLID',color:fill}];return s;}
function link(parent,copy,url,x,y,w){const n=text(parent,copy,x,y,w,20,'Medium');n.setRangeHyperlink(0,n.characters.length,{type:'URL',value:url});n.textDecoration='UNDERLINE';links.push({id:n.id,url});return n;}
async function picture(parent,name,x,y,w){const a=assets[name],n=await figma.getNodeByIdAsync(a.id);parent.appendChild(n);const h=Math.round(w*a.height/a.width);n.resize(w,h);n.x=x;n.y=y;n.name=name+' · Source screenshot';mutated.push(n.id);figures.push({id:n.id,name,parent:parent.id,width:w,height:h,sourceWidth:a.width,sourceHeight:a.height,expectedHash:a.hash});return n;}
let y=64;
let n=text(board,data.title,80,y,5800,80,'Bold');y=grid(y+n.height+12);
n=text(board,data.subtitle,80,y,5800,36);y=grid(y+n.height+24);
n=text(board,data.date,80,y,5800,20,'Medium');y=grid(y+n.height+24);
n=text(board,data.intro,80,y,5800,28);y=grid(y+n.height+48);
const jobsY=y;let jobsH=0;
for(let i=0;i<data.jobs.length;i++){
 const job=data.jobs[i],c=section(board,80+i*2040,jobsY,1960,260);
 const h=text(c,job.title,32,28,1896,32,'Bold');const b=text(c,job.body,32,grid(h.y+h.height+20),1896,28);const height=grid(b.y+b.height+32);c.resize(1960,height);jobsH=Math.max(jobsH,height);
}
for(const c of board.children.filter(n=>n.type==='SECTION'&&n.y===jobsY))c.resize(c.width,jobsH);
y=jobsY+jobsH+100;
const rowY=y;let maxH=0;
for(let i=0;i<data.panels.length;i++){
 const d=data.panels[i],c=section(board,80+i*1520,rowY,1440,3200);let cy=40;
 const add=(copy,size=24,style='Regular',gap=24)=>{const t=text(c,copy,48,cy,1344,size,style);cy=grid(t.y+t.height+gap);return t;};
 add(d.title,48,'Bold',12);add(d.subtitle,28,'Regular',16);add(d.evidence,20,'Medium',32);add(d.summary,24,'Regular',36);
 for(const block of d.blocks){
  add(block.heading,28,'Bold',20);let x=48,rowBottom=cy;
  for(const img of block.images){const n=await picture(c,img.name,x,cy,img.width);x+=img.width+24;rowBottom=Math.max(rowBottom,n.y+n.height);}
  cy=grid(rowBottom+16);const cap=add(block.caption,20,'Regular',32);cap.setRangeHyperlink(0,cap.characters.length,{type:'URL',value:data.sources[block.source].url});links.push({id:cap.id,url:data.sources[block.source].url});
 }
 add(d.after,24,'Regular',28);add('Limits and interpretation',28,'Bold',12);add(d.limits,24,'Regular',32);
 add('Source links',28,'Bold',16);
 for(const id of d.links){const s=data.sources[id],l=link(c,id+' · '+s.label+' ↗',s.url,48,cy,1344);cy=grid(l.y+l.height+16);}
 const h=cy+32;c.resize(1440,h);maxH=Math.max(maxH,h);panels.push({id:c.id,title:d.title,height:h});
}
for(const p of panels)(await figma.getNodeByIdAsync(p.id)).resize(1440,maxH);
const lowerY=rowY+maxH+100;
const original=section(board,80,lowerY,2960,1800);let oy=40;
function ot(copy,size=24,style='Regular',gap=24){const n=text(original,copy,48,oy,2864,size,style);oy=grid(n.y+n.height+gap);return n;}
ot(data.original.title,48,'Bold',12);ot(data.original.subtitle,28,'Regular',24);ot(data.original.body,28,'Regular',40);
const imagesY=oy;let maxBottom=oy;
for(let i=0;i<2;i++){const d=data.original.screens[i],x=48+i*1456;const h=text(original,d.heading,x,imagesY,1408,28,'Bold');const img=await picture(original,d.name,x,grid(h.y+h.height+24),1408);const cap=text(original,d.caption,x,grid(img.y+img.height+16),1408,24);const l=link(original,'Open original '+(i===0?'completed':'reopened')+' state ↗',d.url,x,grid(cap.y+cap.height+20),1408);maxBottom=Math.max(maxBottom,l.y+l.height);}
oy=grid(maxBottom+40);ot(data.original.boundary,24,'Regular',40);
const originalH=oy;original.resize(2960,originalH);
const synthesis=section(board,3120,lowerY,2960,1800);let sy=40;
function st(copy,size=24,style='Regular',gap=24){const n=text(synthesis,copy,48,sy,2864,size,style);sy=grid(n.y+n.height+gap);return n;}
st(data.synthesis.title,48,'Bold',12);st(data.synthesis.subtitle,28,'Regular',32);
st('Patterns supported by the examples',32,'Bold',16);
for(let i=0;i<data.synthesis.supported.length;i++)st((i+1)+'. '+data.synthesis.supported[i],28,'Regular',16);
st(data.synthesis.proposal,28,'Regular',28);st(data.synthesis.caution,28,'Regular',32);
st('Questions to resolve before changing the design',32,'Bold',16);
for(let i=0;i<data.synthesis.questions.length;i++)st((i+1)+'. '+data.synthesis.questions[i],28,'Regular',16);
const lowerH=Math.max(originalH,sy+24);original.resize(2960,lowerH);synthesis.resize(2960,lowerH);
const footerY=lowerY+lowerH+64;
text(board,'Evidence policy: screenshots are source captures, not recreated interfaces. Historical guidance is labeled. No live-product walkthrough, clinical outcome claim or universal reset rule is inferred. Missing public documentation is not proof that a capability is absent.',80,footerY,6000,24);
const foot=text(board,'Research page added at Daniel’s request · 14 screenshot excerpts · 12 external source documents + 2 original design states · Awaiting design review',80,footerY+88,6000,20,'Medium');
board.name='';board.resize(6200,grid(foot.y+foot.height+80));
const overflow=[];
for(const p of [board,...board.findAll(n=>n.type==='SECTION')])for(const c of p.children)if(c.x<0||c.y<0||c.x+c.width>p.width+1||c.y+c.height>p.height+1)overflow.push({parent:p.id,id:c.id});
return {createdNodeIds:created,mutatedNodeIds:mutated,pageId:'4:2',boardId:board.id,panels,originalId:original.id,synthesisId:synthesis.id,figures,links,overflow,width:board.width,height:board.height,previousScope,finishedAt:new Date().toISOString()};
`;
fs.writeFileSync(path.join(root,'build.js'),code.trimStart());
console.log('Prepared build.js: '+code.length+' characters');
