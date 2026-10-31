// snapshotControl, compareControlSnapshots, auditControls prepended at execution.
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('0:1'));
figma.skipInvisibleInstanceChildren=false;
await Promise.all([{family:'Akkurat LL',style:'Regular'},{family:'Akkurat LL',style:'Bold'}].map(f=>figma.loadFontAsync(f)));
const set=await figma.getNodeByIdAsync('281:277');
const section=await figma.getNodeByIdAsync('281:343');
const panels=[await figma.getNodeByIdAsync('281:345'),await figma.getNodeByIdAsync('281:385')];
const actualLibraryInstances=[...set.findAllWithCriteria({types:['INSTANCE']}),...section.findAllWithCriteria({types:['INSTANCE']})].filter(n=>/Text field|List\/Item|Divider/.test(n.name));
const audit=await auditControls(actualLibraryInstances);
function visible(n) {let t=n;while(t&&t.type!=='DOCUMENT'){if('visible' in t&&!t.visible)return false;t=t.parent;}return true;}
function clipping(n) {const b=n.absoluteBoundingBox;const out=[];let t=n.parent;while(t&&t.type!=='DOCUMENT'){if('clipsContent' in t&&t.clipsContent){const p=t.absoluteBoundingBox;if(b.x<p.x-.1||b.y<p.y-.1||b.x+b.width>p.x+p.width+.1||b.y+b.height>p.y+p.height+.1)out.push(t.id);}t=t.parent;}return out;}
const panelEvidence=panels.map(p=>({id:p.id,properties:p.componentProperties,width:p.width,height:p.height,padding:[p.paddingTop,p.paddingRight,p.paddingBottom,p.paddingLeft],gap:p.itemSpacing,sizing:[p.layoutSizingHorizontal,p.layoutSizingVertical],bindings:p.boundVariables,blocks:p.children.map(n=>({id:n.id,name:n.name,type:n.type,x:n.x,y:n.y,width:n.width,height:n.height})),text:p.findAllWithCriteria({types:['TEXT']}).filter(visible).map(n=>({text:n.characters,font:n.fontName,size:n.fontSize,lineHeight:n.lineHeight,hasStyle:!!n.textStyleId,hasColorBinding:!!n.fills[0]?.boundVariables?.color,clippedBy:clipping(n)}))}));
const compositionText=[];
for (const p of panels) for(const t of p.children.filter(n=>n.type==='TEXT')) {
 const style=await figma.getStyleByIdAsync(t.textStyleId);
 const color=await figma.variables.getVariableByIdAsync(t.fills[0].boundVariables.color.id);
 compositionText.push({text:t.characters,style:style.name,color:color.name,resolved:color.resolveForConsumer(t).value});
}
const controls=[];
for(const c of actualLibraryInstances.filter(n=>!set.findOne(t=>t.id===n.id)))controls.push({id:c.id,name:c.name,properties:c.componentProperties,width:c.width,height:c.height,visible:visible(c)});
const all=section.findAll(()=>true),types={};for(const n of all)types[n.type]=(types[n.type]||0)+1;
const images=all.filter(n=>'fills' in n&&Array.isArray(n.fills)&&n.fills.some(f=>f.type==='IMAGE')).map(n=>({id:n.id,name:n.name,type:n.type,width:n.width,height:n.height}));
const reactions=all.filter(n=>'reactions' in n&&n.reactions.length>0).map(n=>({id:n.id,count:n.reactions.length}));
const result={audit,set:{id:set.id,name:set.name,properties:set.componentPropertyDefinitions,variants:set.children.map(n=>({id:n.id,name:n.name,width:n.width,height:n.height}))},panels:panelEvidence,compositionText,controls,editability:{descendants:all.length,types,imageNodes:images},reactions,allVisibleFontsAkkurat:panelEvidence.every(p=>p.text.every(t=>t.font.family==='Akkurat LL')),clipCount:panelEvidence.reduce((n,p)=>n+p.text.filter(t=>t.clippedBy.length).length,0)};
if(JSON.stringify(result).length>12000)throw new Error('Evidence envelope too large');
return result;
