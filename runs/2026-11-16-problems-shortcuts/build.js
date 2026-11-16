figma.skipInvisibleInstanceChildren = false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('1376:21590'));
const source = await figma.getNodeByIdAsync('1376:21591');
const sourceParts = source.children.filter(n => n.visible);
const fonts = new Map();
for(const f of await figma.listAvailableFontsAsync())if(f.fontName.family==='Akkurat LL')fonts.set(JSON.stringify(f.fontName),f.fontName);
for (const style of ['Regular','Bold']) fonts.set(style, { family: 'Akkurat LL', style });
await Promise.all([...fonts.values()].map(font => figma.loadFontAsync(font)));
const variableKeys = {"color/grey/300":"4dbef7c8fc453422675312ab6708eeda7e45476b","space/0":"ce161dd8d210e94082abb2b2d1731fafc1a23767","color/primary/main":"172c5580bce6e949fd9eac7ffb766a5ab3151022","color/hardcoded (no palette)/navLogoCream":"67057115b6776378efbfa83f5db8ca56e548dd67","color/common/white":"c8ba6328373a5250862153929995a6d7ea75cef4","color/hardcoded (no palette)/navIconHoverBackground":"6863bb36a765237b20b0c27803c94b423fe097d0","font/lineHeight/body1":"d61c8959859922bb0bae42b7e8efe6364f99417f","font/family/base":"f2712e7d49f013f57601f873b3dd400b6b1154d6","font/size/body1":"cb352f5690a1fb0c23ff84cbb012eed6ae77b39c","space/8":"183d5d946d268e8bd37735b8b0dc95111c46eddd","color/hardcoded (no palette)/navSearchInputBackground":"30c8a013e10f8ba50a4197ecd6ad1eb600940e9c","color/secondary/main":"06a24dc7bafd72b4f59ea540460010cc6061d5cd","color/secondary/contrastText":"fac67193612ef7c1bb90012c6e762245138dc2e4","color/grey/400":"3bacd025918a194da50ed8505bfacb72f1003a83","color/background/default":"b1c39ab0f2c30458084569b808990b1f3b827dac","space/16":"6016592c19254dd61e9de9e006459546eaece0bb","border/hairline":"e437afaf91519b9a70c82751deb7099cf1576369","color/background/paper":"f1e85cc976b10ea275c03f5d7f21a0dc12cdfee0","color/divider":"ba1923abf373a9062e989ce3ac2068f54712d80b","color/grey/900":"07b906321fb85c5dab66f45f352a17283bcbd857","font/size/h3":"4495658a412b17d7aa5cedbee6f4aad7e1488bf4","font/lineHeight/h3":"75b2eae3fea92bbf14d197e96cfe432fa1f111f5","font/weight/bold":"b999d55cf9455309069f4bc9e56b1461c0839bc4","color/text/secondary":"0d503f1eb6c6f3e923310b2ad6e621cc940b6543","font/size/body2":"f5e873cedaf2c5be3219920133cd0043d7b87ef9","font/lineHeight/body2":"56fc0b1c2afa97eb33989c4001513966efafaf3e","font/weight/regular":"c148c97556bca36fe085ac9b9a9a3f164e37fb14","color/text/disabled":"f049103cf79e9f26de7cda63a111adf87a200b9f","color/text/primary":"5c8867e0b6f174db9f69096580158df26e39baae","radius/pill":"7c5fd4b0a77adea8234877dc7933e4248a8c9063","size/button/minWidth":"24fed651f3aee52dadfb819717bf6313de07f682","color/core/main":"ddc436f08760ad9f11e24b48f4d6df2f0464654c","color/core/contrastText":"dedc1a77d282f7a6f23fed99e34e2d6e4d0ebd46","color/grey/600":"7df34eda2294a90929ac0ecd1eac04df08d5e89f","radius/md":"90d6487ce9be2aa9a84f2adb82c1d5bd90f3ae24","space/4":"169cfdc5f2a6aa55b951ef153aa0f5e9c778e362","Manual note empty":"8ad78df95e39f1ed2aac493e45bb02464efe2b1d","radius/sm":"82e6514ca37ad695ccb02d0deda9b23a80a8b2ee","color/substrate/inputOutline":"bc5cf722b70f96a81e934edb0caf38f5680b8167","font/size/caption":"d7219a38d00f8b524caf814c7e9450c87c807e64","font/lineHeight/caption":"3c9d83d2c49041a34665c239d76c70d894341990","Selected appointment date":"15504859f6b4cf1fce2c6681b70a94736f4ebe10","size/icon/medium":"d1c40c88c40cb3599bb65bd6aa991fb5dacccb85","color/action/selected":"644bf09a480c19da598b2984cbae00eb9c111dd7","space/12":"8cdd5203f42ec6894f870d18b0160d7a2e374192","space/11":"433c1891b654362a83faa2843b0fab431f31f886","space/5":"1058094920a1dade995460eb7fa3717f11669cc9","color/action/hover":"18ef3330ddea4aa764ebd41fa62a1aa19fef0df7"};
const variableNames = ['color/background/paper','color/grey/300','color/text/primary','color/text/secondary','color/primary/main','color/divider','space/0','space/4','space/8','space/16','radius/sm','font/family/base','font/size/body1','font/lineHeight/body1','font/size/body2','font/lineHeight/body2','font/weight/regular','font/weight/bold'];
const imported = await Promise.all(variableNames.map(async name => [name, await figma.variables.importVariableByKeyAsync(variableKeys[name])]));
const vars = Object.fromEntries(imported);
const menuSet = await figma.importComponentSetByKeyAsync('94668f17b9306ae22c9a0ded947e78fa1e747e5f');
const chipSource = await figma.getNodeByIdAsync('1381:10276');
const chipMaster = await chipSource.getMainComponentAsync();
const created = new Set(), mutated = new Set();
const track = n => { created.add(n.id); return n; };
const paint = name => {
  const variable = vars[name];
  const value = variable.resolveForConsumer(source).value;
  const p = { type:'SOLID', color:{r:value.r,g:value.g,b:value.b}, opacity:value.a === undefined ? 1 : value.a };
  return figma.variables.setBoundVariableForPaint(p,'color',variable);
};
function bind(n,field,name) { n.setBoundVariable(field,vars[name]); }
function stack(parent,name,direction,width) {
  const n = track(figma.createAutoLayout(direction)); parent.appendChild(n); n.name=name;
  n.fills=[]; n.resize(width,48); n.primaryAxisSizingMode='AUTO'; n.counterAxisSizingMode=direction==='HORIZONTAL'?'AUTO':'FIXED';
  bind(n,'itemSpacing','space/8'); return n;
}
const bodyStyle = await figma.importStyleByKeyAsync('c87aec6a94a2e25a8a25446f8d61716cb25abe73');
function text(parent,name,value,{small=false,bold=false,ink='color/text/primary',width=626}={}) {
  const n=track(figma.createText()); parent.appendChild(n); n.name=name;
  n.textStyleId=bodyStyle.id; n.fontName={family:'Akkurat LL',style:bold?'Bold':'Regular'}; n.characters=value;
  n.fills=[paint(ink)];
  bind(n,'fontFamily','font/family/base'); bind(n,'fontSize',small?'font/size/body2':'font/size/body1');
  bind(n,'lineHeight',small?'font/lineHeight/body2':'font/lineHeight/body1');
  bind(n,'fontWeight',bold?'font/weight/bold':'font/weight/regular');
  n.textAutoResize='HEIGHT';n.resize(width,n.height);return n;
}
const page=track(figma.createPage()); page.name='Study · Problems typing shortcuts';
const gallery=stack(page,'Problems typing shortcuts · Review board','VERTICAL',3034);
gallery.x=200;gallery.y=200;gallery.fills=[paint('color/grey/300')];
for(const p of ['paddingTop','paddingBottom','paddingLeft','paddingRight'])bind(gallery,p,'space/16');
bind(gallery,'itemSpacing','space/16');
text(gallery,'Study title','Problems, without leaving the note',{bold:true,width:3002});
text(gallery,'Study scope','/problems · Keyboard selection · Add all · Repeated entity chips · Empty state',{ink:'color/text/secondary',width:3002});
const masters=stack(page,'Local compositions · Problems shortcut menus','HORIZONTAL',2400);masters.x=200;masters.y=3900;
const problemLabels=['Other physical and mental strain related to work · Z56.6','Sleep disorder, unspecified · G47.9'];
function makeMenu(name,mode) {
  const c=track(figma.createComponent());masters.appendChild(c);c.name='SCAFFOLDING · '+name;
  c.layoutMode='VERTICAL';c.resize(560,200);c.primaryAxisSizingMode='AUTO';c.counterAxisSizingMode='FIXED';
  c.fills=[paint('color/background/paper')];c.strokes=[paint('color/divider')];c.strokeWeight=1;
  bind(c,'cornerRadius','radius/sm');for(const field of ['paddingTop','paddingBottom'])bind(c,field,'space/8');
  c.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:.16},offset:{x:0,y:4},radius:16,spread:0,visible:true,blendMode:'NORMAL'}];
  const heading=stack(c,'Menu heading','VERTICAL',560);for(const p of ['paddingLeft','paddingRight'])bind(heading,p,'space/16');
  text(heading,'Context',mode==='command'?'Insert from chart':mode==='empty'?'Active problems (0)':'Active problems (2)',{small:true,bold:true,ink:'color/text/secondary',width:528});
  function item(label,state='Default') {
    const m=menuSet.children.find(n=>n.type==='COMPONENT'&&n.name==='State='+state);if(!m)throw Error('Missing menu state '+state);
    const inst=track(m.createInstance());c.appendChild(inst);inst.setProperties({'Label#152:0':label});inst.resize(560,inst.height);return inst;
  }
  let options=[];
  if(mode==='command') options.push(item('/problems — Active patient problems','Focus visible'));
  else {
    if(mode==='empty') {
      const empty=stack(c,'Empty state','VERTICAL',560);bind(empty,'paddingLeft','space/16');bind(empty,'paddingRight','space/16');
      text(empty,'No active problems','No active problems',{width:528});
      text(empty,'Empty guidance','Only active patient problems appear here.',{small:true,ink:'color/text/secondary',width:528});
    } else problemLabels.forEach((label,i)=>options.push(item(label,mode==='active'&&i===0?'Focus visible':'Default')));
    options.push(item('Add all',mode==='empty'?'Disabled':mode==='all'?'Focus visible':'Default'));
  }
  const footer=stack(c,'Keyboard guidance','VERTICAL',560);for(const p of ['paddingLeft','paddingRight','paddingTop'])bind(footer,p,'space/16');
  text(footer,'Keyboard instructions',mode==='command'?'↑ ↓ Navigate    Enter Open    Esc Dismiss':'↑ ↓ Navigate    Enter Insert    Esc Dismiss',{small:true,ink:'color/text/secondary',width:528});
  c.description='Local shortcut-menu composition. Uses linked DS Menu/Item instances and DS-bound text, spacing, paper, border and radius. Keyboard labels illustrate intended behavior; these screens do not implement a live text editor.';
  return {master:c,options};
}
const menus={command:makeMenu('Problems command menu','command'),active:makeMenu('Active problems · first option focused','active'),all:makeMenu('Active problems · Add all focused','all'),empty:makeMenu('Active problems · empty','empty')};
const screenStates=[
  ['01 · Discover the shortcut','Type / in the note. Problems is highlighted; Enter opens the patient’s active problems.','command'],
  ['02 · Choose an active problem','Type /problems. Use ↑ and ↓ to move between problems, then Enter to insert.','active'],
  ['03 · Add all with the keyboard','Move the highlight to Add all. Enter inserts a chip for each active problem.','all'],
  ['04 · Insert the same problem again','A new chip can reference a problem already documented elsewhere in this note.','single'],
  ['05 · All active problems inserted','Add all inserts another chip for the work problem and a chip for the sleep problem.','inserted'],
  ['06 · No active problems','Show an empty state and disable Add all. Escape returns to writing.','empty']
];
const screens=[],menuInstances=[],chipInstances=[];
for(let row=0;row<3;row++) {
  const rowFrame=stack(gallery,'Flow row '+(row+1),'HORIZONTAL',3002);bind(rowFrame,'itemSpacing','space/16');
  for(let col=0;col<2;col++) {
    const [name,caption,mode]=screenStates[row*2+col];
    const cell=stack(rowFrame,name+' · review','VERTICAL',1493);
    text(cell,'State name',name,{bold:true,width:1493});text(cell,'Behavior',caption,{ink:'color/text/secondary',width:1493});
    const screen=track(figma.createFrame());cell.appendChild(screen);screen.name=name;screen.resize(1493,1033);screen.fills=source.fills;screen.clipsContent=true;
    let editor;
    for(const original of sourceParts) {
      let clone;
      if(original.id==='1381:10427') {
        // Reuse the visible Summary composition without duplicating all hidden module-order fixtures.
        clone=track(figma.createFrame());clone.name=original.name;clone.resize(original.width,original.height);clone.fills=[];clone.clipsContent=true;
        for(const order of original.children.filter(n=>n.visible))for(const section of order.children.filter(n=>n.visible)) {
          const copy=track(section.clone());clone.appendChild(copy);copy.x=section.x;copy.y=section.y;
        }
      } else clone=track(original.clone());
      screen.appendChild(clone);clone.x=original.x;clone.y=original.y;
      if(original.id==='1381:10264')editor=clone;
      // Automatic instance descendants are identified by their cloned root; report explicitly authored nodes below.
      for(const n of [clone,...clone.findAll(()=>true)])if('reactions'in n&&n.reactions.length){n.reactions=[];mutated.add(n.id);}
    }
    if(!editor)throw Error('Note editor missing');
    for(const child of editor.children){child.visible=false;mutated.add(child.id);}
    editor.layoutMode='VERTICAL';editor.primaryAxisSizingMode='FIXED';editor.counterAxisSizingMode='FIXED';
    const content=stack(editor,'Shortcut study · note content','VERTICAL',626);bind(content,'itemSpacing','space/8');
    text(content,'Subjective heading','Subjective',{small:true,bold:true,ink:'color/text/secondary'});
    text(content,'Subjective documentation','Discussed work-related stress, evening boundaries, and disrupted sleep.');
    function chips(parent,labels) {
      const column=stack(parent,'Problem entity chips','VERTICAL',626);bind(column,'itemSpacing','space/8');
      for(const label of labels){const i=track(chipMaster.createInstance());column.appendChild(i);i.setProperties({'Label#156:0':label,'Delete icon#156:43':false});chipInstances.push(i);}
      return column;
    }
    if(mode==='single'||mode==='inserted')chips(content,[problemLabels[0]]);
    text(content,'Assessment heading','Assessment',{small:true,bold:true,ink:'color/text/secondary'});
    if(mode==='single'||mode==='inserted') {
      chips(content,mode==='single'?[problemLabels[0]]:problemLabels);
      text(content,'Continue documenting','Continue reviewing progress toward the patient’s evening wind-down goals.');
      text(content,'Writing position','│',{ink:'color/primary/main'});
    } else {
      const command=text(content,'Typed shortcut',mode==='command'?'/│':'/problems│',{ink:'color/primary/main'});
      const inst=track(menus[mode].master.createInstance());screen.appendChild(inst);
      inst.x=49;inst.y=command.absoluteBoundingBox.y-screen.absoluteBoundingBox.y+32;
      menuInstances.push(inst);
    }
    screens.push(screen);
  }
}
const readme=text(gallery,'Study notes','Behavior proposal: Enter activates the highlighted command or problem; ↑ ↓ changes the highlight; Esc dismisses without inserting; Tab leaves the menu. Insertions replace the typed shortcut and return the caret after the new chips. Duplicate chips are allowed. Screens illustrate states; text entry and keyboard handling require implementation.',{small:true,ink:'color/text/secondary',width:3002});
page.flowStartingPoints=[];
const scope=[gallery,...gallery.findAll(()=>true)];const counts={};const images=[];let visibleFonts=new Set();
function effective(n){let p=n;while(p&&p.type!=='PAGE'){if(p.visible===false)return false;p=p.parent;}return true;}
for(const n of scope){counts[n.type]=(counts[n.type]||0)+1;if('fills'in n&&Array.isArray(n.fills)&&n.fills.some(p=>p.type==='IMAGE'))images.push({id:n.id,name:n.name,type:n.type,width:n.width,height:n.height});if(n.type==='TEXT'&&effective(n))for(const seg of n.getStyledTextSegments(['fontName']))visibleFonts.add(seg.fontName.family);}
return {createdNodeIds:[...created],mutatedNodeIds:[...mutated],pageId:page.id,boardId:gallery.id,mastersId:masters.id,screens:screens.map(s=>({id:s.id,name:s.name,width:s.width,height:s.height})),menuInstanceIds:menuInstances.map(n=>n.id),chipInstanceIds:chipInstances.map(n=>n.id),counts,imageFilledNodes:images,visibleFontFamilies:[...visibleFonts],menuMasters:Object.fromEntries(Object.entries(menus).map(([k,v])=>[k,v.master.id]))};
