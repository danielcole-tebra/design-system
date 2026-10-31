// Scoped construction. createComponentWithVariants helper is prepended at execution.
figma.skipInvisibleInstanceChildren = false;
const page = await figma.getNodeByIdAsync('0:1');
const suffix = 'run-174950';
if (page.children.some(n => n.name.endsWith(suffix))) throw new Error('Run already exists');
const x = Math.max(...page.children.map(n => n.x + n.width)) + 200;
await Promise.all([{family:'Akkurat LL',style:'Regular'},{family:'Akkurat LL',style:'Bold'}].map(f => figma.loadFontAsync(f)));
const [fieldMain,rowMain,dividerMain,paper,primary,secondary,space,h4,body1,body2] = await Promise.all([
  figma.importComponentByKeyAsync('520bec237baebaf1576b93a68ca936342fb41bbf'),
  figma.importComponentByKeyAsync('648b022efdf5f2b8fe120df786ac18a9af08c707'),
  figma.importComponentByKeyAsync('0143de7b0529ee6fed9d0c163eeab7571480bc67'),
  figma.variables.importVariableByKeyAsync('f1e85cc976b10ea275c03f5d7f21a0dc12cdfee0'),
  figma.variables.importVariableByKeyAsync('5c8867e0b6f174db9f69096580158df26e39baae'),
  figma.variables.importVariableByKeyAsync('0d503f1eb6c6f3e923310b2ad6e621cc940b6543'),
  figma.variables.importVariableByKeyAsync('6016592c19254dd61e9de9e006459546eaece0bb'),
  figma.importStyleByKeyAsync('888b271ed38cdcfb86c35f9de8bff5ac9b81e8e3'),
  figma.importStyleByKeyAsync('c87aec6a94a2e25a8a25446f8d61716cb25abe73'),
  figma.importStyleByKeyAsync('cdb9fe68e6b5274b6e42be16d13bb3fb7834dccb')
]);
function paint(variable,node) {
  const v=variable.resolveForConsumer(node).value;
  return figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:v.r,g:v.g,b:v.b},opacity:v.a===undefined?1:v.a},'color',variable);
}
const {componentSet,variants}=await createComponentWithVariants({name:'Benchmark/Patient search/'+suffix,description:'Static fictional patient-search Results and Empty states. 550px paper panels; published controls remain nested instances.',variantAxes:{State:['Results','Empty']},baseProps:{width:550,height:100,layoutMode:'VERTICAL',itemSpacing:16,padding:{top:16,bottom:16,left:16,right:16}},page});
componentSet.x=x; componentSet.y=500;
const controlIds=[];
async function text(parent,copy,style,color) {
  await figma.loadFontAsync(style.fontName);
  const n=figma.createText();
  await n.setTextStyleIdAsync(style.id);
  n.characters=copy; n.name=copy; n.textAutoResize='HEIGHT'; n.resize(518,n.height);
  n.fills=[paint(color,n)]; parent.appendChild(n); n.layoutSizingHorizontal='FILL';
  return n;
}
for (let i=0;i<variants.length;i++) {
  const c=variants[i]; c.counterAxisAlignItems='MIN'; c.primaryAxisAlignItems='MIN'; c.clipsContent=false;
  c.fills=[paint(paper,c)];
  for (const p of ['paddingTop','paddingBottom','paddingLeft','paddingRight','itemSpacing']) c.setBoundVariable(p,space);
  c.layoutSizingHorizontal='FIXED'; c.layoutSizingVertical='HUG';
  await text(c,'Find a patient',h4,primary);
  const field=fieldMain.createInstance(); c.appendChild(field);
  field.setProperties({'Label#123:0':'Search patients','Value text#123:11':i===0?'Morgan':'ZZZ','Show helper#123:33':false,'required#123:44':false,'select#123:55':false,'multiline#123:66':false});
  field.resize(518,field.height); field.layoutSizingHorizontal='FILL'; controlIds.push(field.id);
  if(i===0) {
    await text(c,'2 patients found',body2,secondary);
    const list=figma.createAutoLayout('VERTICAL',{name:'Patient results',itemSpacing:0}); list.fills=[]; list.clipsContent=false; c.appendChild(list); list.resize(518,100); list.layoutSizingHorizontal='FILL'; list.layoutSizingVertical='HUG';
    for (let j=0;j<2;j++) {
      if(j===1) {const d=dividerMain.createInstance(); list.appendChild(d); d.resize(518,d.height);d.layoutSizingHorizontal='FILL';controlIds.push(d.id);}
      const row=rowMain.createInstance(); list.appendChild(row);
      row.setProperties({'Primary#174:0':j===0?'Morgan Lee':'Morgan Patel','Secondary#174:3':j===0?'Patient ID: 10482':'Patient ID: 10517','Show icon#174:9':false});
      row.resize(518,row.height);row.layoutSizingHorizontal='FILL';controlIds.push(row.id);
    }
  } else {
    await text(c,'No patients found',body1,primary);
    await text(c,'Try a different name or patient ID.',body2,secondary);
  }
  c.x=16+i*566; c.y=16;
}
componentSet.resize(1148,Math.max(...variants.map(n=>n.height))+32);
const section=figma.createSection();section.name='BENCHMARK · Slim builder · Patient search · 2026-10-31 · '+suffix;section.x=x;section.y=0;
const review=figma.createAutoLayout('HORIZONTAL',{name:'Patient search states',itemSpacing:16}); review.fills=[];review.clipsContent=false;section.appendChild(review);review.x=16;review.y=16;review.counterAxisAlignItems='MIN';review.setBoundVariable('itemSpacing',space);
const instances=variants.map(c=>{const n=c.createInstance();review.appendChild(n);n.layoutSizingHorizontal='FIXED';n.layoutSizingVertical='HUG';return n;});
section.resizeWithoutConstraints(review.width+32,review.height+32);
const created=[componentSet,section,...componentSet.findAll(()=>true),...section.findAll(()=>true)];
return {createdNodeIds:created.map(n=>n.id),sectionId:section.id,reviewId:review.id,setId:componentSet.id,variantIds:variants.map(n=>n.id),instanceIds:instances.map(n=>n.id),controlIds,panels:instances.map(n=>({id:n.id,width:n.width,height:n.height})),tokens:[paper,primary,secondary,space].map(v=>({name:v.name,key:v.key,collection:v.variableCollectionId,scopes:v.scopes,resolved:v.resolveForConsumer(instances[0])})),styles:[h4,body1,body2].map(s=>({name:s.name,key:s.key,font:s.fontName,size:s.fontSize,lineHeight:s.lineHeight})),sectionBounds:{x:section.x,y:section.y,width:section.width,height:section.height}};
