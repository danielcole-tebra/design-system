figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('1396:6797'));
await figma.loadFontAsync({family:'Akkurat LL',style:'Regular'});
const primary=await figma.variables.importVariableByKeyAsync('172c5580bce6e949fd9eac7ffb766a5ab3151022');
const spacing=await figma.variables.importVariableByKeyAsync('169cfdc5f2a6aa55b951ef153aa0f5e9c778e362');
const shadow=await figma.importStyleByKeyAsync('798c96881cd719827448bc6fc1f3235e0ca2f467');
const created=[],mutated=[];
for(const id of ['1396:6841','1396:9015','1396:11192','1396:6801']){const n=await figma.getNodeByIdAsync(id);n.counterAxisSizingMode='AUTO';mutated.push(id);}
for(const id of ['1396:6802','1396:6809','1396:6820','1396:6831']){const n=await figma.getNodeByIdAsync(id);n.effectStyleId=shadow.id;mutated.push(id);}
function caret(parent){const n=figma.createRectangle();parent.appendChild(n);n.name='Insertion caret';n.resize(1,24);n.fills=[figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',primary)];created.push(n.id);}
function row(parent,index,name){const r=figma.createAutoLayout('HORIZONTAL');parent.insertChild(index,r);r.name=name;r.fills=[];r.resize(626,32);r.primaryAxisSizingMode='AUTO';r.counterAxisSizingMode='AUTO';r.counterAxisAlignItems='CENTER';r.setBoundVariable('itemSpacing',spacing);created.push(r.id);return r;}
for(const id of ['1396:6845','1396:7930','1396:9019','1396:10107','1396:11196','1396:12288']){
  const screen=await figma.getNodeByIdAsync(id);
  const content=screen.findAllWithCriteria({types:['FRAME']}).find(n=>n.name==='Shortcut study · note content');
  const command=content.children.find(n=>n.type==='TEXT'&&n.name==='Typed shortcut');
  if(command){const r=row(content,content.children.indexOf(command),'Typed command and caret');r.appendChild(command);command.characters=command.characters.replace(/│$/,'');command.textAutoResize='WIDTH_AND_HEIGHT';mutated.push(command.id,content.id);caret(r);}
  else {
    const old=content.children.filter(n=>n.type==='TEXT'&&['Continue documenting','Writing position'].includes(n.name));
    for(const n of old){n.visible=false;mutated.push(n.id);}
    const chips=content.children.filter(n=>n.type==='FRAME'&&n.name==='Problem entity chips').pop();
    const last=chips.children[chips.children.length-1];const r=row(chips,chips.children.length-1,'Last inserted entity chip and caret');
    r.appendChild(last);mutated.push(last.id,chips.id);caret(r);
  }
}
return {createdNodeIds:created,mutatedNodeIds:mutated,caretCount:6};
