figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('104:4346'));
const m=await figma.getNodeByIdAsync('104:7574');
if(m.findOne(n=>n.name==='Medication summary'))throw new Error('Hierarchy already applied; inspect before retry');
const beforeIds=new Set([m.id,...m.findAll(()=>true).map(n=>n.id)]);
const instances=figma.currentPage.findAllWithCriteria({types:['INSTANCE']}).filter(n=>n.mainComponent?.id===m.id);
const fonts=new Map();for(const d of [m,...instances])for(const t of d.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const keys={zero:'ce161dd8d210e94082abb2b2d1731fafc1a23767',eight:'183d5d946d268e8bd37735b8b0dc95111c46eddd',sixteen:'6016592c19254dd61e9de9e006459546eaece0bb',twentyfour:'f377dae9eb274ba0c78c22fe147a6bab50271e78',grey:'4dbef7c8fc453422675312ab6708eeda7e45476b',divider:'ba1923abf373a9062e989ce3ac2068f54712d80b',muted:'0d503f1eb6c6f3e923310b2ad6e621cc940b6543'};
const vars=await Promise.all(Object.values(keys).map(k=>figma.variables.importVariableByKeyAsync(k))),v=Object.fromEntries(Object.keys(keys).map((k,i)=>[k,vars[i]]));
const styleKeys={h3:'d3d1857d99805de2943adf94e6697d84b6be4059',h4:'888b271ed38cdcfb86c35f9de8bff5ac9b81e8e3',body1:'c87aec6a94a2e25a8a25446f8d61716cb25abe73',body2:'cdb9fe68e6b5274b6e42be16d13bb3fb7834dccb'};
const sv=await Promise.all(Object.values(styleKeys).map(k=>figma.importStyleByKeyAsync(k))),s=Object.fromEntries(Object.keys(styleKeys).map((k,i)=>[k,sv[i]]));
function paint(token,n){const c=token.resolveForConsumer(n).value;return figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:c.r,g:c.g,b:c.b},opacity:c.a??1},'color',token);}
function spacing(n,p,key){n.setBoundVariable(p,v[key]);}
function pads(n,x,y){for(const p of ['paddingLeft','paddingRight'])spacing(n,p,x);for(const p of ['paddingTop','paddingBottom'])spacing(n,p,y);}
function frame(parent,name,w,gap){const n=figma.createAutoLayout('VERTICAL');parent.appendChild(n);n.name=name;n.fills=[];n.resize(w,1);n.primaryAxisSizingMode='AUTO';n.counterAxisSizingMode='FIXED';spacing(n,'itemSpacing',gap);return n;}
function divider(parent,name,w){const d=figma.createRectangle();parent.appendChild(d);d.name=name;d.resize(w,1);d.fills=[paint(v.divider,d)];return d;}
async function style(t,key,w){await t.setTextStyleIdAsync(s[key].id);t.textAutoResize='HEIGHT';t.resize(w,t.height);t.layoutSizingHorizontal='FIXED';t.textTruncation='DISABLED';}
const body=m.findOne(n=>n.name==='Body'),identity=m.findOne(n=>n.name==='Medication identity'),directions=m.findOne(n=>n.name==='Directions'),rx=m.findOne(n=>n.name==='Prescription'),supply=m.findOne(n=>n.name==='Supply'),pharmacy=await figma.getNodeByIdAsync('104:7619');
pads(body,'zero','zero');spacing(body,'itemSpacing','zero');
const summary=frame(body,'Medication summary',550,'twentyfour');body.insertChild(0,summary);pads(summary,'sixteen','twentyfour');summary.fills=[paint(v.grey,summary)];summary.appendChild(identity);summary.appendChild(directions);
await style(m.findOne(n=>n.name==='Medication name'),'h3',518);
await style(m.findOne(n=>n.name==='Directions value'),'body1',518);
const firstDivider=divider(body,'Summary divider',550);body.insertChild(1,firstDivider);
rx.resize(550,rx.height);rx.primaryAxisSizingMode='AUTO';pads(rx,'sixteen','twentyfour');spacing(rx,'itemSpacing','sixteen');
await style(m.findOne(n=>n.name==='Prescription heading'),'h4',518);
const pf=m.findOne(n=>n.name==='Prescription fields'),sf=m.findOne(n=>n.name==='Supply fields');pf.layoutMode='VERTICAL';sf.layoutMode='VERTICAL';pf.resize(518,1);sf.resize(518,1);pf.primaryAxisSizingMode='AUTO';sf.primaryAxisSizingMode='AUTO';spacing(pf,'itemSpacing','sixteen');spacing(sf,'itemSpacing','sixteen');
for(const fields of [pf,sf])for(const row of fields.children){row.layoutMode='HORIZONTAL';row.resize(518,20);row.primaryAxisSizingMode='FIXED';row.counterAxisSizingMode='AUTO';spacing(row,'itemSpacing','sixteen');const [label,value]=row.children;await style(label,'body2',148);label.fills=[paint(v.muted,label)];await style(value,'body2',354);}
divider(rx,'Prescription facts divider',518);rx.appendChild(sf);
supply.visible=false;supply.name='Superseded · Supply heading and wrapper';
const secondDivider=divider(body,'Pharmacy divider',550);body.insertChild(body.children.findIndex(n=>n.id===pharmacy.id),secondDivider);
pharmacy.resize(550,pharmacy.height);pharmacy.primaryAxisSizingMode='AUTO';pads(pharmacy,'sixteen','twentyfour');spacing(pharmacy,'itemSpacing','sixteen');
await style(m.findOne(n=>n.name==='Pharmacy heading'),'h4',518);
const contact=frame(pharmacy,'Pharmacy contact',518,'eight');contact.appendChild(m.findOne(n=>n.name==='Pharmacy name'));contact.appendChild(m.findOne(n=>n.name==='Pharmacy phone'));await style(m.findOne(n=>n.name==='Pharmacy name'),'body1',518);
m.description+=' Hierarchy revision 2026-11-15: shaded medication summary (h3 name/body1 directions), divided prescription facts with aligned labels and values, separate pharmacy contact. Full-height Alpha shell and actions unchanged. Superseded Supply heading/wrapper retained hidden.';
const after=[m,...m.findAll(()=>true)];
const allAffected=[...after.map(n=>n.id),...instances.flatMap(n=>[n.id,...n.findAll(()=>true).map(x=>x.id)])];
const counts={};for(const n of after.slice(1))counts[n.type]=(counts[n.type]||0)+1;
return {createdNodeIds:after.filter(n=>!beforeIds.has(n.id)).map(n=>n.id),mutatedNodeIds:allAffected,master:m.id,instances:instances.map(n=>n.id),bodySections:body.children.filter(n=>n.visible).map(n=>({id:n.id,name:n.name,w:n.width,h:n.height,y:n.y})),descendantCounts:counts,imageNodes:after.filter(n=>Array.isArray(n.fills)&&n.fills.some(p=>p.type==='IMAGE')).map(n=>({id:n.id,name:n.name,type:n.type,width:n.width,height:n.height})),tokens:Object.fromEntries(Object.entries(v).map(([k,t])=>[k,{id:t.id,key:t.key,name:t.name}]))};

