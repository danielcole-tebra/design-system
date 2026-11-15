figma.skipInvisibleInstanceChildren=false;await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('17:881'));
const t=await figma.getNodeByIdAsync('85:7840'),r=await figma.getNodeByIdAsync('85:6345'),donor=r.findOne(n=>n.type==='TEXT'&&n.name==='Medication name');
await figma.loadFontAsync(t.fontName);await figma.loadFontAsync(donor.fontName);await t.setTextStyleIdAsync(donor.textStyleId);
t.characters='Prescribed /\nmodified';t.textAutoResize='HEIGHT';t.resize(96,40);t.layoutSizingVertical='HUG';
const line=await figma.variables.getVariableByIdAsync('VariableID:56fc0b1c2afa97eb33989c4001513966efafaf3e/74:235');t.setBoundVariable('lineHeight',line);
return{mutatedNodeIds:[t.id],text:t.characters,size:[t.width,t.height],lineHeight:t.lineHeight,style:t.textStyleId};
