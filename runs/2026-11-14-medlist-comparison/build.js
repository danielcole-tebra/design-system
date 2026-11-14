figma.skipInvisibleInstanceChildren = false;
const current = await figma.getNodeByIdAsync('2:1811');
const readme = await figma.getNodeByIdAsync('2:2808');
const heading = await figma.getNodeByIdAsync('2:2809');
const body = await figma.getNodeByIdAsync('2:2810');
const fonts = new Map();
for (const root of [current, readme]) for (const t of root.findAllWithCriteria({types:['TEXT']})) {
  for (const s of t.getStyledTextSegments(['fontName'])) fonts.set(JSON.stringify(s.fontName), s.fontName);
}
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const tracked = [current,...current.findAll(()=>true)];
function fingerprint(nodes) {
 const data=nodes.map((n,i)=>({id:n.id,type:n.type,name:n.name,width:n.width,height:n.height,x:i?n.x:null,y:i?n.y:null,visible:n.visible,fills:'fills'in n?n.fills:null,boundVariables:n.boundVariables,text:n.type==='TEXT'?n.characters:null,font:n.type==='TEXT'?n.getStyledTextSegments(['fontName','fontSize','lineHeight']):null,reactions:'reactions'in n?n.reactions:null}));
 const str=JSON.stringify(data);let hash=2166136261;for(let i=0;i<str.length;i++){hash^=str.charCodeAt(i);hash=Math.imul(hash,16777619);}return {hash:hash>>>0,length:str.length,count:nodes.length};
}
const before=fingerprint(tracked);
const created=[];
const page=figma.createPage();page.name='02 Medlist · Running comparison';created.push(page.id);
await figma.setCurrentPageAsync(page);
const gap16=await figma.variables.getVariableByIdAsync(readme.boundVariables.itemSpacing.id);
const pad=await figma.variables.getVariableByIdAsync(readme.boundVariables.paddingLeft.id);
function frame(name,direction,parent){const n=figma.createAutoLayout(direction);n.name=name;n.fills=[];n.clipsContent=false;n.setBoundVariable('itemSpacing',gap16);created.push(n.id);if(parent)parent.appendChild(n);return n;}
function txt(template,text,parent,width,name,url){const n=template.clone();created.push(n.id);parent.appendChild(n);n.name=name;n.characters=text;n.textAutoResize='HEIGHT';n.resize(width,24);n.layoutSizingHorizontal='FIXED';n.layoutSizingVertical='HUG';if(url)n.setRangeHyperlink(0,n.characters.length,{type:'URL',value:url});return n;}
const board=frame('Medlist · Original baseline and live rebuild','VERTICAL');board.x=160;board.y=160;board.fills=readme.fills;for(const p of ['paddingLeft','paddingRight','paddingTop','paddingBottom'])board.setBoundVariable(p,pad);
txt(heading,'Medlist · Running comparison',board,2982,'Comparison title');
txt(body,'Updated 14 Nov 2026 · Original A01 stays fixed. The right-hand screen is the live editable rebuild. Review differences below; unchanged items remain unapproved.',board,2982,'Update rule');
const pair=frame('Compare at natural size','HORIZONTAL',board);pair.itemSpacing=96;pair.counterAxisAlignItems='MIN';
const left=frame('A · Original source · Frozen visual reference','VERTICAL',pair);
const right=frame('B · Current rebuild · Live editable screen','VERTICAL',pair);
txt(heading,'A · Original A01',left,1446,'Original label');
txt(body,'Frozen visual reference · Captured 14 Nov 2026 · Source frame 1440 × 1631\nImage bounds 1446 × 1631 include the original shadow. Open editable source ↗',left,1446,'Original provenance','https://www.figma.com/design/fu7ncgAnIdjvxxxmQILFzK?node-id=11198-3155');
const baseline=figma.createRectangle();created.push(baseline.id);baseline.name='A01 · Frozen source image · Not editable UI';left.appendChild(baseline);baseline.resize(1446,1631);baseline.fills=[];
txt(heading,'B · Current rebuild',right,1440,'Current label');
txt(body,'Live editable screen · 1440 × 1766 · Header replaced with verified SDE mirror\nOther authored layout differences remain unapproved. SDE header source ↗',right,1440,'Current provenance','https://www.figma.com/design/ViAWRVVtgkCXzItk0sQ5P0?node-id=1319-4655');
right.appendChild(current);
const register=frame('Differences · Updated with each build','VERTICAL',board);
txt(heading,'Differences to review',register,2982,'Register title');
txt(body,'Owner: Daniel Cole · Evidence: 14 Nov 2026 · DECISION / unapproved unless marked corrected or verified. Native control fidelity does not approve a new arrangement.',register,2982,'Register status');
const rows=[
 ['Region / status','A · Original A01','B · Current rebuild'],
 ['Patient header · Corrected','Expanded demographics, actions, alerts and allergy details.','Verified SDE local mirror, 68 px high. Not a published header. Phone, MRN and balance are dashes; prior actions/alerts are absent.'],
 ['Chart rail · Unapproved','194 px wide; 52 px row pitch.','192 px wide; 48 px pitch; locally assembled spacing/type.'],
 ['Heading and surface · Unapproved','Medications List, h1 32/48; 22 px inset; paper elevation 1.','Medications, h2 24/36; Import repositioned; 16 px inset; paper elevation omitted.'],
 ['Toolbar · Unapproved layout','77 px high, gap 16; selects 220 / 200 px.','73 px high, gap 8; selects 208 / 184 px. Native 40 px fields; no leading search icon.'],
 ['Reconciliation · Unapproved','116 px; text left and controls right.','123 px; vertical stack, progress upper right, controls below.'],
 ['Columns · Unapproved','44 / 300 / 148 / 120 / 340 / 80 / 128 / 40 px.','44 / 300 / 144 / 136 / 300 / 96 / 156 / 40 px; headings rewritten.'],
 ['Rows and status · Unapproved','Compact metadata 12/16; status icon and destination group.','Metadata 14/20; 16 px inset, 8 px gaps; taller rows; text-only status; timeline moved to medication cell.'],
 ['Native controls · Verified primitives','Custom controls and pagination in original concept.','Library controls and 52 px pagination verified. Small Chip renders 12/18. Global nav does not exactly match SDE selected state/search copy.']
];
const table=frame('Difference register rows','VERTICAL',register);table.itemSpacing=16;
for(let i=0;i<rows.length;i++){const row=frame('Difference '+i,'HORIZONTAL',table);row.itemSpacing=32;[390,1040,1488].forEach((w,j)=>txt(body,rows[i][j],row,w,'Row '+i+' / '+j));}
txt(heading,'Change history and maintenance',register,2982,'History heading');
txt(body,'14 Nov 2026 · Comparison established after the SDE header correction. Remaining layouts are documented, unchanged and unapproved.\nFor each future build: edit the same right-hand screen; update the date and affected difference rows; append a dated history entry. Keep A01 fixed. Retain superseded evidence. This board is a visual comparison, not a played-through prototype.',register,2982,'History and update protocol');
const after=fingerprint([current,...current.findAll(()=>true)]);
const nodes=board.findAll(()=>true);const types={};for(const n of nodes)types[n.type]=(types[n.type]||0)+1;
return {createdNodeIds:created,mutatedNodeIds:[current.id],pageId:page.id,boardId:board.id,baselineId:baseline.id,currentId:current.id,registerId:register.id,sourceUrl:'https://www.figma.com/design/fu7ncgAnIdjvxxxmQILFzK?node-id=11198-3155',before,after,unchanged:JSON.stringify(before)===JSON.stringify(after),board:{width:board.width,height:board.height},screen:{width:current.width,height:current.height},types,imageNodes:nodes.filter(n=>Array.isArray(n.fills)&&n.fills.some(f=>f.type==='IMAGE')).map(n=>n.id),reactionCount:tracked.filter(n=>'reactions'in n&&n.reactions.length).length};
