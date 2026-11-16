figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('17:31'));
await Promise.all(['Regular','Bold','Medium'].map(style=>figma.loadFontAsync({family:'Inter',style})));
const board=await figma.getNodeByIdAsync('19:10'), created=[], mutated=['19:10'], cards=[];
const ink={r:0x1E/255,g:0x1E/255,b:0x1E/255}, gray={r:0xF9/255,g:0xF9/255,b:0xF9/255};
function text(parent,copy,x,y,w,size=28,style='Regular',url){
 const t=figma.createText(); created.push(t.id); t.fontName={family:'Inter',style};t.fontSize=size;t.lineHeight={unit:'PIXELS',value:Math.round(size*1.35)};t.fills=[{type:'SOLID',color:ink}];t.characters=copy;t.textAutoResize='HEIGHT';t.resize(w,10);parent.appendChild(t);t.x=x;t.y=y;
 if(url)t.setRangeHyperlink(0,t.characters.length,{type:'URL',value:url});return t;
}
function section(x,y,w,h){const s=figma.createSection();created.push(s.id);board.appendChild(s);s.name='';s.x=x;s.y=y;s.resize(w,h);s.fills=[{type:'SOLID',color:gray}];return s;}
const df='https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=';
text(board,'Medlist: how we arrived at the current prototype',80,64,5750,64,'Bold');
text(board,'Primary care + behavioral health · Six decisions · November 16, 2026',80,164,5750,32);
text(board,'Read left to right, then down. All eight screenshots are 2× exports of the actual designs. Zoom in for detail; source links open editable screens.',80,228,5750,24);
text(board,'Open current table and drawer ↗',80,292,1450,24,'Medium',df+'176-31968');
text(board,'Research and product examples ↗',1710,292,1450,24,'Medium','https://www.figma.com/board/9d3G2ipIFbZk4YSQLgukOE?node-id=4-2');
text(board,'Earlier A–F explorations ↗',3340,292,1450,24,'Medium','https://www.figma.com/board/9d3G2ipIFbZk4YSQLgukOE?node-id=1-2');
const data=[
{step:'01',title:'Reduce the work of scanning',body:'The original design put directions, prescribing, supply, pharmacy, review controls and actions into every row. Early passes standardized components and spacing, grouped actions, and tried inline disclosure to reduce the visible detail.',
img:'19:2',w:1446,h:1631,label:'Starting point · Original A01 design',caption:'The goal was a list that is easier to scan while preserving access to the supporting information.',url:'https://www.figma.com/design/fu7ncgAnIdjvxxxmQILFzK?node-id=11198-3155'},
{step:'02',title:'Make reconciliation a deliberate task',body:'Move reconciliation into its own flow, entered from a separate last-reconciled summary. We kept that separation. The five-column trial still gave narrative directions, prescriber and order activity too much space in the everyday list.',
img:'19:5',w:1440,h:1332,label:'Five-column exploration · Superseded',caption:'Keep the separate reconciliation entry. Reconsider the content and hierarchy of the table itself.',url:df+'137-25480'},
{step:'03',title:'Show the regimen in structured columns',body:'Break the SIG into Dose, Route and Timing. Keep the medication name, strength and form together. Add Start and Stop; move prescriber and order detail into Details. This follows the structured pattern that stood out in the research.',
img:'19:9',w:1440,h:1112,label:'Structured table · Inline Details exploration',caption:'Seven headers: Medication / Dose / Route / Timing / Start / Stop / Actions. Unknown dates stay blank; prescribed date is not assumed to be start date.',url:df+'145-22172'},
{step:'04',title:'Give each row one way in',body:'Replace separate Edit and Details controls with a single Open action plus the vertical kebab. The concise table becomes the stable overview; Open provides the medication workspace. The latest cleanup restores 16 px left padding for table text.',
img:'19:3',w:1440,h:1112,label:'Current prototype · Concise table',caption:'Keep clinical information visible for scanning. Put deeper detail and editing behind the same entry point.',url:df+'150-21601'},
{step:'05',title:'Keep details and actions in context',body:'Open a 550 px right-side drawer using the SDE interaction pattern. Include the full directions, prescriber, chart and order status, dates, supply, pharmacy contact and address, and prescription record. Keep the medication list visible behind it.',
img:'19:4',w:1440,h:1112,label:'Current prototype · Cetirizine details drawer',caption:'Details provide the context for Edit prescription and other medication actions. Missing source data is explicitly shown as Not recorded.',url:df+'160-46277'}
];
for(let i=0;i<data.length;i++){
 const d=data[i],row=i<3?0:1,col=i%3,s=section(80+col*1970,row===0?400:2780,1850,1);
 const title=text(s,d.step+' · '+d.title,48,40,1754,40,'Bold');
 const body=text(s,d.body,48,title.y+title.height+24,1754,28);
 const ly=Math.max(280,body.y+body.height+32);text(s,d.label,48,ly,1754,24,'Medium');
 const im=await figma.getNodeByIdAsync(d.img);s.appendChild(im);im.resize(d.w,d.h);im.x=Math.round((1850-d.w)/2);im.y=ly+56;im.name=d.step+' · '+d.label+' · 2x screenshot';mutated.push(im.id);
 const cap=text(s,d.caption,48,im.y+im.height+40,1754,28);
 text(s,'Open source screen ↗',48,cap.y+cap.height+28,1754,24,'Medium',d.url);
 s.resize(1850,Math.ceil((cap.y+cap.height+28+33+48)/4)*4);cards.push({step:d.step,id:s.id,imageIds:[im.id],width:s.width,height:s.height});
}
const six=section(4020,2780,1850,1);
const title=text(six,'06 · Make the editing outcome explicit',48,40,1754,40,'Bold');
const body=text(six,'Prescription edits create a new prescription after review and attestation. Chart-only edits save the chart entry without sending a prescription. The worked examples make that distinction visible inside the drawer.',48,title.y+title.height+24,1754,28);
const y=Math.max(280,body.y+body.height+32);
const panels=[
{id:'19:6',label:'Edit prescription',caption:'Cetirizine · Quantity 30 → 60',source:'160-43837'},
{id:'19:7',label:'Review and sign',caption:'Changes + clinical attestation',source:'160-45013'},
{id:'19:8',label:'Save chart details',caption:'Levothyroxine · Chart-only example',source:'160-44538'}
];
for(let i=0;i<panels.length;i++){
 const d=panels[i],x=48+i*582;
 text(six,d.label,x,y,550,24,'Bold');
 const im=await figma.getNodeByIdAsync(d.id);six.appendChild(im);im.resize(550,1112);im.x=x;im.y=y+56;im.name='06 · '+d.label+' · 2x screenshot';mutated.push(im.id);
 text(six,d.caption,x,im.y+1112+24,550,24);
 text(six,'Open source ↗',x,im.y+1112+100,550,24,'Medium',df+d.source);
}
const note=text(six,'The original signed Rx is retained. The alternative cancellation path requests cancellation; it remains pending until the pharmacy responds.',48,y+56+1112+176,1754,28);
six.resize(1850,Math.ceil((note.y+note.height+48)/4)*4);cards.push({step:'06',id:six.id,imageIds:panels.map(d=>d.id),width:six.width,height:six.height});
const bottom=Math.max(...cards.slice(3).map(d=>2780+d.height))+120;
text(board,'Where this leaves us',80,bottom,5750,40,'Bold');
const summary=text(board,'A concise clinical table, a separate reconciliation flow, and one drawer for details and editing. Representative paths are wired in Figma; they are not live prescribing or persistence. Full audit history, coupon and other action branches remain outside this pass.',80,bottom+72,5750,28);
text(board,'Snapshots captured November 16, 2026. Design evidence and intended behavior; not validated usability outcomes. Earlier work is retained in Medlist · Archive.',80,summary.y+summary.height+32,5750,24);
board.resize(5950,Math.ceil((summary.y+summary.height+32+65+64)/4)*4);board.placeholder=false;
const nodes=[board,...board.findAllWithCriteria({types:['SECTION']})],overflow=[];
for(const n of nodes)for(const c of n.children)if(c.x<0||c.y<0||c.x+c.width>n.width+1||c.y+c.height>n.height+1)overflow.push({parent:n.id,child:c.id});
const images=[];for(const id of mutated.slice(1)){const n=await figma.getNodeByIdAsync(id);const p=n.fills.find(p=>p.type==='IMAGE');images.push({id,imageHash:p?.imageHash,width:n.width,height:n.height,sourceSize:p?await figma.getImageByHash(p.imageHash).getSizeAsync():null});}
figma.viewport.scrollAndZoomIntoView([board]);
return {createdNodeIds:created,mutatedNodeIds:mutated,boardId:board.id,cards,images,overflow,width:board.width,height:board.height,textCount:created.length-6};

