figma.skipInvisibleInstanceChildren=false;await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('17:881'));
const cell=await figma.getNodeByIdAsync('85:6335'),source=cell.findOne(n=>n.type==='TEXT'),wrapper=cell.parent;
for(const s of source.getStyledTextSegments(['fontName']))await figma.loadFontAsync(s.fontName);
const text=source.clone();wrapper.appendChild(text);text.name='Last prescribed / modified · Token-bound heading';text.textAutoResize='HEIGHT';text.resize(96,40);text.layoutSizingHorizontal='FIXED';text.layoutSizingVertical='HUG';cell.visible=false;cell.name='Superseded single-line header cell · Retained hidden';
return{createdNodeIds:[text.id],mutatedNodeIds:[cell.id,wrapper.id],headingId:text.id,text:text.characters,size:[text.width,text.height],font:text.fontName,bindings:text.boundVariables};
