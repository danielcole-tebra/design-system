figma.skipInvisibleInstanceChildren = false;
if(figma.fileKey !== 'YX2n4YLrEpBXNbcc73T6dw') throw new Error('Wrong file');
const sources = SOURCES;
const icons = await figma.getNodeByIdAsync('259:2878');
const reference = await figma.getNodeByIdAsync('259:2879');
if(icons.name !== 'Icons & illustrations' || reference.name !== 'Reference') throw new Error('Wrong pages');
if(icons.children.some(n=>sources.some(s=>n.name==='Icon/'+s.name+' (MUI)'))) throw new Error('Duplicate component');
const primary=await figma.variables.getVariableByIdAsync('VariableID:74:3');
const textColor=await figma.variables.getVariableByIdAsync('VariableID:74:36');
const paper=await figma.variables.getVariableByIdAsync('VariableID:74:39');
const variables=await figma.variables.getLocalVariablesAsync();
const byKey=key=>variables.find(v=>v.key===key);
const family=byKey('f2712e7d49f013f57601f873b3dd400b6b1154d6');
const weight=byKey('c148c97556bca36fe085ac9b9a9a3f164e37fb14');
const size=byKey('f5e873cedaf2c5be3219920133cd0043d7b87ef9');
const line=byKey('56fc0b1c2afa97eb33989c4001513966efafaf3e');
if(![primary,textColor,paper,family,weight,size,line].every(Boolean))throw new Error('Missing token');
await figma.loadFontAsync({family:'Akkurat LL',style:'Regular'});
await figma.setCurrentPageAsync(icons);
const paint=v=>figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',v);
const board=figma.createFrame();reference.appendChild(board);board.name='Thumb icons — Source / Rebuild / Change';board.x=0;board.y=5248;board.resize(1000,688);board.fills=[paint(paper)];board.clipsContent=false;
function label(content,x,y,width){const t=figma.createText();board.appendChild(t);t.fontName={family:'Akkurat LL',style:'Regular'};t.characters=content;t.fontSize=14;t.lineHeight={unit:'PIXELS',value:20};t.setBoundVariable('fontFamily',family);t.setBoundVariable('fontWeight',weight);t.setBoundVariable('fontSize',size);t.setBoundVariable('lineHeight',line);t.fills=[paint(textColor)];t.resize(width,20);t.textAutoResize='HEIGHT';t.x=x;t.y=y;return t;}
label('Patient Summary · thumb icon repair',32,24,920);
label('Source: MUI 5.15.12 · frozen PNG at 2× · 2026-09-10',32,48,920);
label('Component',32,96,220);label('Source',272,96,160);label('Rebuild · live instances',472,96,240);label('Change',728,96,240);
const created=[];
for(let i=0;i<sources.length;i++){
 const s=sources[i];const frame=figma.createNodeFromSvg(s.svg);icons.appendChild(frame);frame.fills=[];frame.clipsContent=false;
 const vectors=frame.findAll(n=>n.type==='VECTOR');if(vectors.length!==1)throw new Error('Unexpected SVG hierarchy');
 for(const v of vectors){v.fills=[paint(primary)];v.constraints={horizontal:'SCALE',vertical:'SCALE'};if(v.vectorPaths.some(p=>p.windingRule!=='NONZERO'))throw new Error('Unexpected winding');}
 const c=figma.createComponentFromNode(frame);c.name='Icon/'+s.name+' (MUI)';c.x=1088+i*64;c.y=844;
 c.description='Source: @mui/icons-material/'+s.name+'.js (5.15.12), design-system yarn.lock. Exact SVG path, 24px viewBox, NONZERO winding, scalable vector, color/primary/main binding. Patient Summary uses this named export; source package 5.11.16 is retained in the batch evidence. Intrinsic vector bounds are not rounded. Added 2026-09-10; publish after review.';
 const y=144+i*128;label(s.name,32,y+24,220);
 const img=figma.createImage(new Uint8Array(s.png));const r=figma.createRectangle();board.appendChild(r);r.name='Frozen source/'+s.name;r.resize(96,96);r.x=272;r.y=y;r.fills=[{type:'IMAGE',imageHash:img.hash,scaleMode:'FIT'}];
 const large=c.createInstance();board.appendChild(large);large.rescale(4);large.x=472;large.y=y;
 const actual=c.createInstance();board.appendChild(actual);actual.x=600;actual.y=y+36;
 label('Added missing '+(s.name.includes('Off')?'unselected':'selected')+' icon.\n24px component; 4× detail shown.\nEditable vector; bound color.',728,y+12,240);
 created.push({name:c.name,id:c.id,key:c.key,largeInstance:large.id,actualInstance:actual.id,source:r.id});
}
return {board:board.id,created};
