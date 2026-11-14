// SOURCE constant is injected from header-capture.json. This is a structural transfer,
// not a new layout design. Preserve exact source names, tokens, layout and native parts.
figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('0:1'));
await Promise.all([{family:'Akkurat LL',style:'Regular'},{family:'Akkurat LL',style:'Bold'}].map(f=>figma.loadFontAsync(f)));
const screen=await figma.getNodeByIdAsync('2:1811'),old=await figma.getNodeByIdAsync('2:1928');
if(old.parent!==screen)throw new Error('Replacement already applied; inspect before retry.');
const V={},masters={},created=[],mutated=[],nodeMap={};
for(const v of SOURCE.variables)V[v.id]=await figma.variables.importVariableByKeyAsync(v.key);
const nativeSpecs=[];function collect(d){if(d.key)nativeSpecs.push(d);for(const c of d.children??[])collect(c);}collect(SOURCE.tree);
for(const d of nativeSpecs)if(!masters[d.key])masters[d.key]=await figma.importComponentByKeyAsync(d.key);
for(const m of Object.values(masters)){for(const t of m.findAllWithCriteria({types:['TEXT']}))for(const seg of t.getStyledTextSegments(['fontName']))await figma.loadFontAsync(seg.fontName);}
function remapPaint(p){let copy=JSON.parse(JSON.stringify(p));const id=copy.boundVariables?.color?.id;if(id&&V[id])copy=figma.variables.setBoundVariableForPaint(copy,'color',V[id]);return copy;}
function bind(n,bindings){for(const [key,value] of Object.entries(bindings??{})){if(key==='fills'||key==='strokes')continue;const alias=Array.isArray(value)?value[0]:value;if(alias?.id&&V[alias.id])n.setBoundVariable(key,V[alias.id]);}}
async function copy(d,parent,isRoot=false){
 let n;if(isRoot){n=figma.createComponent();n.layoutMode=d.props.layoutMode;}
 else if(d.type==='INSTANCE')n=masters[d.key].createInstance();
 else if(d.type==='TEXT')n=figma.createText();
 else if(d.type==='FRAME')n=figma.createAutoLayout(d.props.layoutMode);
 else throw new Error('Unmapped source type '+d.type);
 created.push(n.id);nodeMap[d.sourceId]=n.id;n.name=d.name;
 if(n.type==='TEXT'){n.fontName=d.props.fontName;n.characters=d.props.characters;}
 if(parent)parent.appendChild(n);else{figma.currentPage.appendChild(n);n.x=3400;n.y=160;}
 if(d.type==='INSTANCE'&&!isRoot){
  const properties={};for(const [key,value] of Object.entries(d.componentProperties??{})){if(n.componentProperties[key]?.type!=='INSTANCE_SWAP')properties[key]=value;}n.setProperties(properties);
  n.resize(d.props.width,d.props.height);n.visible=d.props.visible;
 }else{
  for(const field of ['layoutMode','paddingTop','paddingRight','paddingBottom','paddingLeft','itemSpacing','primaryAxisAlignItems','counterAxisAlignItems','clipsContent','opacity','cornerRadius','strokeAlign','strokeWeight','strokeTopWeight','strokeBottomWeight','strokeLeftWeight','strokeRightWeight','effects','fontName','fontSize','lineHeight','letterSpacing','textAlignHorizontal','textAlignVertical','textDecoration'])if(field in d.props && field in n)n[field]=d.props[field];
  for(const field of ['fills','strokes'])if(d.props[field])n[field]=d.props[field].map(remapPaint);
  if(n.type==='TEXT')n.textAutoResize=d.props.textAutoResize;
  n.resize(Math.max(d.props.width,0.01),Math.max(d.props.height,0.01));
  if(n.type==='TEXT')n.textAutoResize=d.props.textAutoResize;
  n.visible=d.props.visible;
  bind(n,d.props.boundVariables);
  for(const c of d.children??[])await copy(c,n);
  if('primaryAxisSizingMode'in n)n.primaryAxisSizingMode=d.props.primaryAxisSizingMode;
  if('counterAxisSizingMode'in n)n.counterAxisSizingMode=d.props.counterAxisSizingMode;
 }
 if(parent){
  n.layoutSizingHorizontal=d.props.layoutSizingHorizontal;
  n.layoutSizingVertical=d.props.layoutSizingVertical;
  n.layoutGrow=d.props.layoutGrow;
  n.layoutAlign=d.props.layoutAlign;
 }
 return n;
}
const master=await copy(SOURCE.tree,null,true);
master.name='Patient header/SDE Updated 11-13 mirror';
master.description='Exact editable structure mirrored from ViAWRVVtgkCXzItk0sQ5P0 / 1319:4655 / I1319:4659;974:16288 on 2026-11-14. Source master 06bddbc3ab5ce64fe2563d499652e204d6902115 is not cross-file importable. This is a local mirror, not a published library component. Geometry, typography and native descendants are source-derived. Source cross-file reactions are not copied.';
const propertyMap={};
for(const name of ['Preferred name','Pronouns','Legal name','Sex','DOB','Age','Phone','MRN','Severe allergens','Balance value']){
 const n=master.findOne(n=>n.type==='TEXT'&&n.name===name);const label=name==='Balance value'?'Balance amount':name;
 const key=master.addComponentProperty(label,'TEXT',n.characters);n.componentPropertyReferences={characters:key};propertyMap[label]=key;
}
for(const [label,name] of [['Show pronouns','Pronouns'],['Legal name differs','Legal name group'],['Restricted','Restriction wrap']]){
 const n=master.findOne(n=>n.name===name),key=master.addComponentProperty(label,'BOOLEAN',n.visible);n.componentPropertyReferences={...n.componentPropertyReferences,visible:key};propertyMap[label]=key;
}
const avatar=master.findOne(n=>n.type==='INSTANCE'&&n.name==='Avatar');avatar.isExposedInstance=true;
const header=master.createInstance();created.push(header.id);header.name='Patient header · SDE Updated 11/13';screen.insertChild(1,header);header.resize(1440,68);
const values={'Preferred name':'Jane Doe','Show pronouns':false,'Pronouns':'','Legal name differs':false,'Legal name':'Jane Doe','Restricted':true,'Sex':'Female','DOB':'02/04/1990','Age':'(36 y/o)','Phone':'—','MRN':'MRN: —','Severe allergens':'Penicillin (severe)','Balance amount':'—'};
header.setProperties(Object.fromEntries(Object.entries(values).map(([key,value])=>[propertyMap[key],value])));
const patientAvatar=header.findOne(n=>n.type==='INSTANCE'&&n.name==='Avatar');const letter=Object.keys(patientAvatar.componentProperties).find(k=>k.startsWith('Letter#'));patientAvatar.setProperties({[letter]:'JD'});mutated.push(patientAvatar.id);
const archive=figma.createAutoLayout('VERTICAL');created.push(archive.id);archive.name='SUPERSEDED · Invented patient header · retained 2026-11-14';archive.x=3400;archive.y=600;archive.resize(1440,1);archive.primaryAxisSizingMode='AUTO';archive.itemSpacing=16;archive.fills=[];archive.appendChild(old);mutated.push(old.id,screen.id);
const note=figma.createText();created.push(note.id);note.fontName={family:'Akkurat LL',style:'Regular'};note.fontSize=14;note.lineHeight={unit:'PIXELS',value:20};note.characters='Retained evidence only. This initial patient-header composition was invented during the first rebuild. Superseded by the faithful SDE 11/13 mirror above. Other first-batch composition differences remain documented for review; they are not approved patterns.';archive.appendChild(note);note.textAutoResize='HEIGHT';note.resize(1408,note.height);
figma.viewport.scrollAndZoomIntoView([screen]);
return {createdNodeIds:created,mutatedNodeIds:mutated,nodeMap,masterId:master.id,headerId:header.id,archiveId:archive.id,masterBounds:{width:master.width,height:master.height},headerBounds:{width:header.width,height:header.height},properties:propertyMap,nativeKeys:Object.keys(masters),sourceMasterImportable:false};
