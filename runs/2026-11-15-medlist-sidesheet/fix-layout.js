figma.skipInvisibleInstanceChildren=false;await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('104:4346'));
const master=await figma.getNodeByIdAsync('104:7574');const fonts=new Map();for(const t of master.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const changed=[];
for(const name of ['Prescription fields','Supply fields']){const n=master.findOne(x=>x.name===name);n.primaryAxisSizingMode='FIXED';n.counterAxisSizingMode='AUTO';changed.push(n.id);}
const targets=[master,...figma.currentPage.findAllWithCriteria({types:['INSTANCE']}).filter(n=>n.name==='Medication details')];
for(const d of targets){const n=d.findOne(x=>x.name==='Order status');n.resize(518,20);n.primaryAxisSizingMode='AUTO';changed.push(n.id);}
// The hand-composed context instance has the inherited master name.
const context=await figma.getNodeByIdAsync('104:8366');const placed=context.children.find(n=>n.type==='INSTANCE'&&n.name==='Medication details');if(placed){const n=placed.findOne(x=>x.name==='Order status');n.resize(518,20);n.primaryAxisSizingMode='AUTO';changed.push(n.id);}
return {mutatedNodeIds:[...new Set(changed)],fields:['Prescription fields','Supply fields'].map(name=>{const n=master.findOne(x=>x.name===name);return {id:n.id,width:n.width,height:n.height}}),drawerHeight:master.height};
