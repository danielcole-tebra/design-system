// Exact SDE master and observed 11/13 presentation. No new component or header layout.
figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('0:1'));
await Promise.all([{family:'Akkurat LL',style:'Regular'},{family:'Akkurat LL',style:'Bold'},{family:'Inter',style:'Regular'}].map(f=>figma.loadFontAsync(f)));
const screen=await figma.getNodeByIdAsync('2:1811');
const old=await figma.getNodeByIdAsync('2:1928');
if(old.parent!==screen)throw new Error('Header replacement already ran; inspect before retry.');
const master=await figma.importComponentByKeyAsync('06bddbc3ab5ce64fe2563d499652e204d6902115');
const header=master.createInstance();header.name='Patient header · SDE Updated 11/13';
screen.insertChild(1,header);header.resize(1440,68);
const props=header.componentProperties;
function prop(label,value){const key=Object.keys(props).find(k=>k.startsWith(label+'#'));if(!key)throw new Error('Missing SDE property '+label);header.setProperties({[key]:value});}
// Patient facts come from the existing A01. Missing phone/MRN/balance are not fabricated.
for(const [label,value] of Object.entries({'Preferred name':'Jane Doe','Show pronouns':false,'Pronouns':'','Legal name differs':false,'Legal name':'Jane Doe','Restricted':true,'Sex':'Female','DOB':'02/04/1990','Age':'(36 y/o)','Phone':'—','MRN':'MRN: —','Severe allergens':'Penicillin (severe)','Balance amount':'—'}))prop(label,value);
const avatar=header.findOne(n=>n.type==='INSTANCE'&&n.name==='Avatar');
const avatarProp=Object.keys(avatar.componentProperties).find(k=>k.startsWith('Letter#'));
avatar.setProperties({[avatarProp]:'JD'});
const primary=await figma.variables.importVariableByKeyAsync('172c5580bce6e949fd9eac7ffb766a5ab3151022');
const secondary=await figma.variables.importVariableByKeyAsync('0d503f1eb6c6f3e923310b2ad6e621cc940b6543');
const regular=await figma.variables.importVariableByKeyAsync('c148c97556bca36fe085ac9b9a9a3f164e37fb14');
const space8=await figma.variables.importVariableByKeyAsync('183d5d946d268e8bd37735b8b0dc95111c46eddd');
const changed=[screen.id,old.id,header.id,avatar.id];
function paint(n,v){const c=v.resolveForConsumer(n).value;n.fills=[figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:c.r,g:c.g,b:c.b},opacity:c.a===undefined?1:c.a},'color',v)];changed.push(n.id);}
const name=header.findOne(n=>n.type==='TEXT'&&n.name==='Preferred name');paint(name,primary);name.textDecoration='UNDERLINE';
const safety=header.findOne(n=>n.type==='FRAME'&&n.name==='Safety');safety.layoutAlign='STRETCH';safety.primaryAxisAlignItems='MAX';safety.primaryAxisSizingMode='FIXED';changed.push(safety.id);
const allergyRow=header.findOne(n=>n.type==='FRAME'&&n.name==='Allergy row');allergyRow.visible=true;allergyRow.counterAxisSizingMode='AUTO';allergyRow.itemSpacing=8;allergyRow.setBoundVariable('itemSpacing',space8);changed.push(allergyRow.id);
const allergyIcon=header.findOne(n=>n.name==='Allergy icon');allergyIcon.visible=false;changed.push(allergyIcon.id);
const severeGroup=header.findOne(n=>n.name==='Severe group');severeGroup.visible=true;changed.push(severeGroup.id);
const severeLabel=header.findOne(n=>n.type==='TEXT'&&n.name==='Severe label');severeLabel.characters='Allergies:';severeLabel.fontName={family:'Akkurat LL',style:'Regular'};severeLabel.setBoundVariable('fontWeight',regular);paint(severeLabel,secondary);
const allergens=header.findOne(n=>n.type==='TEXT'&&n.name==='Severe allergens');allergens.visible=true;allergens.fontName={family:'Akkurat LL',style:'Regular'};allergens.setBoundVariable('fontWeight',regular);paint(allergens,secondary);
const link=header.findOne(n=>n.type==='INSTANCE'&&n.name==='Allergy link');const linkKey=Object.keys(link.componentProperties).find(k=>k.startsWith('Label#'));link.setProperties({[linkKey]:'View all'});changed.push(link.id);
const linkLabel=link.findOne(n=>n.type==='TEXT');paint(linkLabel,primary);
// Cross-file prototype destinations are deliberately not copied into this static medlist.
const archive=figma.createAutoLayout('VERTICAL');archive.name='SUPERSEDED · Invented patient header · retained 2026-11-14';archive.x=3400;archive.y=160;archive.resize(1440,1);archive.primaryAxisSizingMode='AUTO';archive.itemSpacing=16;archive.fills=[];
archive.appendChild(old);
const note=figma.createText();note.fontName={family:'Akkurat LL',style:'Regular'};note.fontSize=14;note.lineHeight={unit:'PIXELS',value:20};note.characters='Superseded by the exact Patient header master used on SDE Updated 11/13. This local patient-header composition was invented during the initial medlist rebuild and is not an approved reusable pattern.';archive.appendChild(note);note.textAutoResize='HEIGHT';note.resize(1408,note.height);
figma.viewport.scrollAndZoomIntoView([screen]);
return {createdNodeIds:[header.id,archive.id,note.id],mutatedNodeIds:[...new Set(changed)],importedMaster:{id:master.id,key:master.key,name:master.name},headerId:header.id,archiveId:archive.id,width:header.width,height:header.height,source:'ViAWRVVtgkCXzItk0sQ5P0 / 1319:4655 / I1319:4659;974:16288',properties:Object.fromEntries(Object.entries(header.componentProperties).map(([k,v])=>[k,v.value]))};
