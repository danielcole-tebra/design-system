figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('0:1'));
await Promise.all(['Regular','Bold','Medium'].map(style=>figma.loadFontAsync({family:'Inter',style})));
const board=await figma.getNodeByIdAsync('1:2'), created=[], mutated=['1:2'], cards=[];
const color={r:0x24/255,g:0x24/255,b:0x24/255};
function text(parent,copy,x,y,width,size=24,style='Regular'){
 const t=figma.createText();created.push(t.id);t.fontName={family:'Inter',style};t.fontSize=size;t.lineHeight={unit:'PIXELS',value:Math.round(size*1.35)};t.fills=[{type:'SOLID',color}];t.characters=copy;t.textAutoResize='HEIGHT';t.resize(width,t.height);parent.appendChild(t);t.x=x;t.y=y;return t;
}
function section(parent,x,y,w,h,fill){
 const s=figma.createSection();created.push(s.id);s.name='';parent.appendChild(s);s.x=x;s.y=y;s.resize(w,h);s.fills=[{type:'SOLID',color:fill}];return s;
}
text(board,'Medlist evolution',80,64,5000,80,'Bold');
text(board,'Original screen to latest proposal · Team review',80,184,5000,36);
text(board,'Read A → F from left to right. Goals describe intent, not validated outcomes. Screens are 2× snapshots; use the source links for editable designs. Captured November 15, 2026.',80,248,7800,24);
const data=[{"letter":"A","imageId":"1:8","title":"Original medlist","subtitle":"A01 · Baseline","w":1446,"h":1631,"url":"https://www.figma.com/design/fu7ncgAnIdjvxxxmQILFzK?node-id=11198-3155","goals":["Manage current medications and review order status.","Keep medication, prescribing, supply and pharmacy information together.","Provide prescribing and reconciliation actions from the medication list."],"question":"What creates the most effort or distraction in the original?","label":"Baseline capabilities"},{"letter":"B","imageId":"1:6","title":"Consistent components and spacing","subtitle":"Comparison B · Full information visible","w":1440,"h":1428,"url":"https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=23-881","goals":["Use the verified SDE header and design-system controls.","Tighten row spacing and group related actions, including vertical overflow.","Improve consistency while keeping the detailed row information visible."],"question":"Does the spacing help scanning without making the information harder to read?"},{"letter":"C","imageId":"1:3","title":"Scan first, expand for details","subtitle":"Comparison C · Progressive disclosure","w":1440,"h":1260,"url":"https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=73-3818","goals":["Make collapsed rows easier to scan while keeping dates, quantities and issues visible.","Reveal directions and supporting information beneath their existing column headers.","Keep review and action controls aligned as individual rows expand."],"question":"Which information must stay visible to review medications confidently?"},{"letter":"D","imageId":"1:4","title":"Medication management first","subtitle":"Comparison D · Page hierarchy","w":1440,"h":1184,"url":"https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=77-4774","goals":["Make prescribing the primary page action, with add and import alongside it.","Reduce reconciliation to a compact supporting utility.","Keep C’s row disclosure while giving the medication list more prominence."],"question":"Does the page now read as medication management rather than a reconciliation workflow?"},{"letter":"E","imageId":"1:5","title":"Direct attention to issues","subtitle":"Comparison E · Status and label hierarchy","w":1440,"h":1184,"url":"https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=85-6258","goals":["Reduce the emphasis of routine Filled and Pending fill statuses.","Keep failed sends and required patient information visually prominent.","Explore clearer column headings without changing the medication data."],"question":"Are actionable issues easier to notice without losing routine status information?"},{"letter":"F","imageId":"1:7","title":"Clear activity, less row clutter","subtitle":"Comparison F · Latest proposal","w":1440,"h":1184,"url":"https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=91-10446","goals":["Show an explicit event and date under Last activity, such as Prescribed 09/05/24.","Move compound and patient-reported markers into expanded details.","Rebalance columns while retaining full medication names, strengths and forms."],"question":"Does hiding provenance reduce clutter or remove context needed for review?"}];
for(let i=0;i<data.length;i++){
 const d=data[i], card=section(board,80+i*1662,380,1542,2760,{r:0xF9/255,g:0xF9/255,b:0xF9/255});
 text(card,d.letter+' · '+d.title,48,40,1446,40,'Bold');
 text(card,d.subtitle,48,108,1446,24);
 const img=await figma.getNodeByIdAsync(d.imageId);card.appendChild(img);img.resize(d.w,d.h);img.x=48;img.y=188;img.name=d.letter+' · '+d.title+' · 2x source snapshot';mutated.push(img.id);
 const gy=img.y+img.height+44;
 text(card,d.label||'Top goals of this iteration',48,gy,1200,32,'Bold');
 const list=text(card,d.goals.join('\n'),48,gy+58,1360,24);
 let off=0;for(let j=0;j<d.goals.length;j++){const end=off+d.goals[j].length+(j<d.goals.length-1?1:0);list.setRangeListOptions(off,end,{type:'UNORDERED'});list.setRangeIndentation(off,end,1);off=end;}
 list.paragraphSpacing=12;
 const link=text(card,'Open source screen ↗',48,list.y+list.height+28,1400,24,'Medium');link.setRangeHyperlink(0,link.characters.length,{type:'URL',value:d.url});
 const q=text(card,'Review question: '+d.question,48,link.y+link.height+32,1360,24);
 const notes=section(card,48,2380,1446,332,{r:1,g:1,b:1});
 text(notes,'Team notes',32,28,1300,32,'Bold');text(notes,'Add observations, questions or stickies here.',32,88,1300,24);
 if(q.y+q.height>2340)throw new Error('Notes collision '+d.letter);
 cards.push({letter:d.letter,id:card.id,imageId:img.id,source:d.url,goalsId:list.id,width:card.width,height:card.height,imageWidth:img.width,imageHeight:img.height,goalsY:list.y});
}
board.resize(10080,3220);
const overflow=[];for(const n of [board,...board.findAll(n=>n.type==='SECTION')]) for(const c of n.children){if(c.x<0||c.y<0||c.x+c.width>n.width+1||c.y+c.height>n.height+1)overflow.push({parent:n.id,child:c.id});}
return {createdNodeIds:created,mutatedNodeIds:mutated,cards,boardId:board.id,width:board.width,height:board.height,overflow};

