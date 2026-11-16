figma.skipInvisibleInstanceChildren=false;await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('1824:238490'));
const roots=await Promise.all(['1829:2012','1829:2035','1829:2162','1829:2321','1829:2590'].map(id=>figma.getNodeByIdAsync(id)));
// The list was resized before visual inspection to accommodate the native body height.
roots[3].resize(550,718);
const fonts=new Map();for(const n of roots)for(const t of n.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const changed=[];
for(const root of roots.slice(0,3))for(const n of [root,...root.findAllWithCriteria({types:['FRAME']})]){let p=n.parent;let library=false;while(p&&p!==root){if(p.type==='INSTANCE'){library=true;break;}p=p.parent;}if(!library&&'clipsContent'in n){n.clipsContent=false;changed.push(n.id);}}
const comments=await figma.getNodeByIdAsync('1829:2300');comments.setProperties({'Value text#123:11':'Insert comments here'});
const rows=comments.findAllWithCriteria({types:['TEXT']}).find(t=>t.name==='Multiline rows');rows.characters='\n';changed.push(comments.id,rows.id);
for(const root of roots.slice(3)){const title=root.children.find(n=>n.name==='Header').children.find(n=>n.type==='TEXT');title.characters=root.name.startsWith('Problem Details')?'Problem Details':'Problems';title.textAutoResize='HEIGHT';title.resize(478,32);changed.push(title.id);}
return {mutatedNodeIds:changed,commentsValue:'Insert comments here',multilineRows:'Two blank display rows, replacing library demo copy',commentHeight:comments.height,detailsBodyHeight:roots[2].height};
