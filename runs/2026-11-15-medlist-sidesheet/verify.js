figma.skipInvisibleInstanceChildren=false;await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('104:4346'));
const list=await figma.getNodeByIdAsync('104:4423'),open=await figma.getNodeByIdAsync('104:8366'),table=await figma.getNodeByIdAsync('104:4473'),header=await figma.getNodeByIdAsync('104:4494'),drawer=await figma.getNodeByIdAsync('104:7574');
const source=await figma.getNodeByIdAsync('91:10446'),sourceRows=source.findOne(n=>n.name==='Medication table').children.filter(n=>n.visible&&n.type==='INSTANCE');
const rows=table.children.filter(n=>n.visible&&n.type==='INSTANCE');
const frames=figma.currentPage.children.filter(n=>n.name.startsWith('Details overlay ·'));
const assertions=[],controls=[];function add(name,actual,expected){assertions.push({name,actual,expected});}
function vis(n,root){for(let p=n;p&&p!==root;p=p.parent)if(!p.visible)return false;return true;}
function values(n){return Object.fromEntries(Object.entries(n.componentProperties).map(([k,d])=>[k.split('#')[0],d.value]));}
function text(n){return n.findAllWithCriteria({types:['TEXT']}).filter(t=>vis(t,n)).map(t=>t.characters);}
function destination(n){return n.reactions.flatMap(r=>r.actions||[]).map(a=>({navigation:a.navigation||a.type,destination:a.destinationId||null}));}
function overflow(n){return n.findAll(x=>vis(x,n)&&'width'in x&&(x.x<-.1||x.y<-.1||x.x+x.width>x.parent.width+.1||x.y+x.height>x.parent.height+.1)).map(x=>({id:x.id,name:x.name}));}
add('Row count',rows.length,10);add('Detail destinations',frames.length,10);add('List dimensions',[list.width,list.height],[1440,1156]);add('Source F dimensions unchanged',[source.width,source.height],[1440,1184]);
const widths=[44,420,176,136,224,96,120];add('Header widths',header.children.filter(n=>n.visible).map(n=>n.width),widths);
for(let i=0;i<rows.length;i++){const r=rows[i],src=sourceRows[i],sv=values(src),frame=frames[i],d=frame.children[0],dv=values(d),rv=values(r),visible=text(d);
 add(i+' row identity',rv['Medication name'],sv['Medication name']);add(i+' row activity',rv['Last activity'],sv['Last activity']);add(i+' row quantity',rv.Quantity,sv.Quantity);add(i+' row height',r.height,65);
 add(i+' columns',r.findOne(n=>n.name==='Summary').children.filter(n=>n.visible).map(n=>n.width),widths);
 add(i+' one disclosure action',r.findAllWithCriteria({types:['INSTANCE']}).filter(n=>vis(n,r)&&['Open medication details','Edit','Medication actions'].includes(n.name)).map(n=>n.name),['Open medication details']);
 add(i+' open destination',destination(r.findOne(n=>n.name==='Open medication details')),[{navigation:'OVERLAY',destination:frame.id}]);
 add(i+' overlay viewport',[frame.width,frame.height,d.x,d.y,d.width],[1440,1156,890,133,550]);add(i+' no backdrop',frame.overlayBackground.type,'NONE');
 for(const key of ['Medication name','Directions','Date','Quantity','Duration','Refills','Compound','Show source note','Source note'])add(i+' drawer property '+key,dv[key],sv[key]);
 for(const key of ['Medication name','Directions','Date','Quantity','Duration','Refills'])add(i+' visible '+key,visible.includes(sv[key]),true);
 for(const name of ['Prescriber','Pharmacy','Phone']){const copy=src.findOne(n=>n.type==='TEXT'&&n.name===name).characters;add(i+' visible '+name,visible.includes(copy),true);}
 const ss=src.findOne(n=>n.name==='Summary status').findOne(n=>n.type==='TEXT'&&n.name==='Status');add(i+' visible status',visible.includes(ss.characters),true);
 add(i+' compound marker',visible.includes('Compound'),sv.Compound);add(i+' patient reported marker',visible.includes(sv['Source note']),sv['Show source note']);
 const action=src.findOne(n=>n.name==='Edit').findOne(n=>n.type==='TEXT'&&n.name==='Label').characters;add(i+' action label',d.findOne(n=>n.name==='Medication action').findOne(n=>n.type==='TEXT'&&n.name==='Label').characters,action);
 for(const name of ['Close','Close medication details'])add(i+' close '+name,destination(d.findOne(n=>n.name===name)),[{navigation:'CLOSE',destination:null}]);
 add(i+' drawer clipping',overflow(d),[]);add(i+' row clipping',overflow(r),[]);add(i+' fonts',[...new Set(d.findAllWithCriteria({types:['TEXT']}).filter(n=>vis(n,d)).map(t=>t.fontName.family))],['Akkurat LL']);
 add(i+' header height',d.findOne(n=>n.name==='Header').height,72);add(i+' body insets',((n)=>[n.paddingTop,n.paddingRight,n.paddingBottom,n.paddingLeft])(d.findOne(n=>n.name==='Body')),[16,16,16,16]);add(i+' footer height',d.findOne(n=>n.name==='Footer').height,71);
}
const first=rows[0],firstDrawer=frames[0].children[0];controls.push(first.findOne(n=>n.name==='Select medication'),first.findOne(n=>n.type==='INSTANCE'&&n.name==='Reviewed'),first.findOne(n=>n.name==='Open medication details'),firstDrawer.findOne(n=>n.name==='Close'),firstDrawer.findOne(n=>n.name==='Medication action'));
const headNative=header.findAllWithCriteria({types:['INSTANCE']}).find(n=>n.name==='Last activity');if(headNative)controls.push(headNative);
add('Source first row retains expanded state',values(sourceRows[0]).Disclosure,'Expanded');
const nodes=[list,...list.findAll(()=>true),open,...open.findAll(()=>true)];add('No rasterized UI',nodes.filter(n=>Array.isArray(n.fills)&&n.fills.some(p=>p.type==='IMAGE')).length,0);
add('Inherited shell font families match source',[...new Set(list.findAllWithCriteria({types:['TEXT']}).filter(n=>vis(n,list)).map(t=>t.fontName.family))],[...new Set(source.findAllWithCriteria({types:['TEXT']}).filter(n=>vis(n,source)).map(t=>t.fontName.family))]);
add('Placed context drawer width',open.children.find(n=>n.name==='Medication details').width,550);
return await auditEvidence(controls,assertions);
