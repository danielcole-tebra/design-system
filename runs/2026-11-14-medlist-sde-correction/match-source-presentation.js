figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('0:1'));
await Promise.all([{family:'Akkurat LL',style:'Regular'},{family:'Akkurat LL',style:'Bold'}].map(f=>figma.loadFontAsync(f)));
const master=await figma.getNodeByIdAsync('9:784');const changed=[];
for(const n of [master,...master.findAllWithCriteria({types:['FRAME']})]){n.strokesIncludedInLayout=false;changed.push(n.id);}
const letter=master.findOne(n=>n.type==='INSTANCE'&&n.name==='Avatar').findOne(n=>n.type==='TEXT'&&n.name==='Letter');
const ink=await figma.variables.importVariableByKeyAsync('07b906321fb85c5dab66f45f352a17283bcbd857');
const c=ink.resolveForConsumer(letter).value;letter.fills=[figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:c.r,g:c.g,b:c.b},opacity:c.a===undefined?1:c.a},'color',ink)];changed.push(letter.id);
const label=master.findOne(n=>n.type==='INSTANCE'&&n.name==='Allergy link').findOne(n=>n.type==='TEXT');
label.fontName={family:'Akkurat LL',style:'Regular'};label.fontSize=14;label.lineHeight={unit:'PIXELS',value:20};
for(const [prop,key] of [['fontSize','f5e873cedaf2c5be3219920133cd0043d7b87ef9'],['fontFamily','f2712e7d49f013f57601f873b3dd400b6b1154d6'],['lineHeight','56fc0b1c2afa97eb33989c4001513966efafaf3e'],['fontWeight','c148c97556bca36fe085ac9b9a9a3f164e37fb14']])label.setBoundVariable(prop,await figma.variables.importVariableByKeyAsync(key));
changed.push(label.id);
return{mutatedNodeIds:changed,masterBounds:{width:master.width,height:master.height},source:'Exact SDE source stroke-layout flag, avatar text ink and 14/20 Link text overrides; no new visual decisions.'};
