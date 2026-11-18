figma.skipInvisibleInstanceChildren=false;await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('2074:8246'));
const page=figma.currentPage;
const groups=page.findAll(n=>n.type==='FRAME'&&n.children.some(c=>c.visible&&c.name==='Row · Measure'));
if(groups.some(g=>g.children.some(n=>n.name.startsWith('DS Flowsheet row · '))))throw new Error('A group was already converted; narrow before retry');
function visible(n,stop){let p=n;while(p&&p!==stop){if(!p.visible)return false;p=p.parent;}return true;}
function rx(n,row){return n.absoluteTransform[0][2]-row.absoluteTransform[0][2];}
function ry(n,row){return n.absoluteTransform[1][2]-row.absoluteTransform[1][2];}
const fonts=new Map();for(const g of groups)for(const t of g.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const paper=(await figma.getNodeByIdAsync('2197:1621')).fills;
const specs=[],templates=new Map();
for(const group of groups){const header=group.children.find(n=>n.visible&&n.name==='Row · Measure');const positions=[...new Set(header.findAllWithCriteria({types:['TEXT']}).filter(t=>visible(t,header)).map(t=>Math.round(rx(t,header))))].sort((a,b)=>a-b);if(positions[0]>10)positions.unshift(0);
for(const original of group.children.filter(n=>n.type==='FRAME'&&n.visible&&!n.name.startsWith('SUPERSEDED'))){const ts=original.findAllWithCriteria({types:['TEXT']}).filter(t=>visible(t,original));if(!ts.length)continue;const section=original.height<=36&&ts.length===1;const head=original===header||section;const anchors=section?[0]:positions;const cols=anchors.map((x,i)=>({x,width:(anchors[i+1]??Math.round(original.width))-x,fragments:[]}));
for(const t of ts){const x=rx(t,original),y=ry(t,original);let c=0;for(let i=0;i<anchors.length;i++)if(x>=anchors[i]-2)c=i;cols[c].fragments.push({sourceId:t.id,text:t.characters,x,y,segments:t.getStyledTextSegments(['fontName','fontSize','fills','lineHeight','letterSpacing'])});}
const fill=original.fills.length?original.fills:paper;const key=JSON.stringify({head,width:original.width,height:original.height,widths:cols.map(c=>c.width),fill});
let template=templates.get(key);if(!template){const i=templates.size;const cells=cols.map(c=>$fig.instance('b8942ef23ec9caa891d54b1ba66bbcc46fe666f4',{name:'Table/Cell · '+(head?'Head':'Body'),props:{variant:head?'head':'body',padding:'none',Text:''},width:c.width,height:original.height,layoutSizingHorizontal:'FIXED',layoutSizingVertical:'FIXED'}));const comp=$fig.component({name:'SCAFFOLDING · DS-cell flowsheet row / '+(head?'Header':'Body')+' / '+Math.round(original.width)+' / '+Math.round(original.height)+' / '+i,x:7000+(i%3)*1500,y:10000+Math.floor(i/3)*200,width:original.width,height:original.height,layoutMode:'HORIZONTAL',itemSpacing:0,primaryAxisSizingMode:'FIXED',counterAxisSizingMode:'FIXED',fills:fill,clipsContent:false},cells);template={comp,widths:cols.map(c=>c.width),height:original.height};templates.set(key,template);}
specs.push({group,original,index:group.children.indexOf(original),cols,template,head,sourceTextCount:ts.length});
}}
await $fig.done();
// Template masters are mutable; adjust native direct-cell dimensions after props apply.
for(const t of templates.values())for(let i=0;i<t.comp.node.children.length;i++)$fig.get(t.comp.node.children[i].id).set({width:t.widths[i],height:t.height,layoutSizingHorizontal:'FIXED',layoutSizingVertical:'FIXED'});
await $fig.done();
const rowJobs=[],extras=[];
for(const spec of [...specs].sort((a,b)=>a.group.id.localeCompare(b.group.id)||b.index-a.index)){
const inst=$fig.instance(spec.template.comp,{name:'DS-cell row content',width:spec.original.width,height:spec.original.height});
const wrapper=$fig.autoLayout({name:'DS Flowsheet row · '+spec.original.name,width:spec.original.width,height:spec.original.height,layoutMode:'HORIZONTAL',itemSpacing:0,primaryAxisSizingMode:'FIXED',counterAxisSizingMode:'FIXED',fills:[],clipsContent:false},[inst]);
$fig.get(spec.group.id).addAt(spec.index,wrapper);$fig.get(spec.original.id).set({visible:false});
for(const child of spec.original.children.filter(n=>n.type!=='TEXT'&&n.visible)){const extra=$fig.get(child.id).clone({name:'SCAFFOLDING · '+child.name,x:child.x,y:child.y,layoutPositioning:'ABSOLUTE'});wrapper.append(extra);extras.push(extra);}
rowJobs.push({...spec,inst,wrapper});
}
await $fig.done();
const formatJobs=[];
for(const extra of extras){if(extra.node.type==='FRAME')$fig.get(extra.node.id).set({fills:[]});for(const n of extra.node.findAll(()=>true)){if(n.type==='TEXT')$fig.get(n.id).set({visible:false});if(n.type==='FRAME')$fig.get(n.id).set({fills:[]});}}
for(const job of rowJobs){const cells=job.inst.node.children.filter(n=>n.type==='INSTANCE');for(let i=0;i<job.cols.length;i++){const col=job.cols[i];col.fragments.sort((a,b)=>a.y-b.y||a.x-b.x);let text='',ranges=[];for(let j=0;j<col.fragments.length;j++){const f=col.fragments[j];if(j)text+=Math.abs(f.y-col.fragments[j-1].y)>6?'\n':' ';const start=text.length;text+=f.text;ranges.push({start,end:text.length,source:f});}$fig.get(cells[i].id).set({props:{Text:text}});formatJobs.push({cellId:cells[i].id,ranges,indent:Math.max(0,(col.fragments[0]?.x??col.x)-col.x),width:col.width,height:job.original.height});}}
await $fig.done();
for(const job of formatJobs){const c=await figma.getNodeByIdAsync(job.cellId);const t=c.children.find(n=>n.type==='TEXT');$fig.get(t.id).set({textAutoResize:'HEIGHT',paragraphIndent:job.indent});}
await $fig.done();
for(const job of formatJobs){const c=await figma.getNodeByIdAsync(job.cellId),t=c.children.find(n=>n.type==='TEXT');for(const r of job.ranges)for(const s of r.source.segments){const a=r.start+s.start,b=r.start+s.end;if(b<=a)continue;t.setRangeFontName(a,b,s.fontName);t.setRangeFontSize(a,b,s.fontSize);t.setRangeFills(a,b,s.fills);t.setRangeLineHeight(a,b,s.lineHeight);t.setRangeLetterSpacing(a,b,s.letterSpacing);}}
return {groups:groups.map(g=>({id:g.id,parent:g.parent.name})),templateIds:[...templates.values()].map(t=>t.comp.node.id),rowWrappers:rowJobs.map(j=>({id:j.wrapper.node.id,sourceId:j.original.id,groupId:j.group.id,contentId:j.inst.node.id,templateId:j.template.comp.node.id,columns:j.cols.length,w:j.original.width,h:j.original.height})),nativeCells:formatJobs.length,mappedSourceTexts:specs.reduce((s,j)=>s+j.sourceTextCount,0),widthFailures:formatJobs.filter(j=>{const n=figma.getNodeById(j.cellId);return Math.abs(n.width-j.width)>0.1||Math.abs(n.height-j.height)>0.1;}).map(j=>j.cellId),sourceRowsHidden:true,note:'Local reusable row compositions, each built from linked DS Table/Cell head/body instances. Published fixed four-cell Table/Row cannot resize its nested cells; no library masters edited.'};