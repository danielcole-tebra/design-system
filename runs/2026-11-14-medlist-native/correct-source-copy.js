figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('0:1'));
await Promise.all([{family:'Akkurat LL',style:'Regular'},{family:'Akkurat LL',style:'Bold'}].map(f=>figma.loadFontAsync(f)));
const changed=[];
for(const id of ['2:2413','2:2509','2:2653','2:2698']){
 const n=await figma.getNodeByIdAsync(id);
 const key=Object.keys(n.componentProperties).find(k=>k.startsWith('Refills#'));
 n.setProperties({[key]:'1 refill'});changed.push(n.id);
}
const last=await figma.getNodeByIdAsync('2:2746');
const status=last.findOne(n=>n.type==='INSTANCE'&&n.name==='Order and pharmacy');
const p=status.componentProperties;
status.setProperties({[Object.keys(p).find(k=>k.startsWith('Pharmacy#'))]:'A&A Family Pharmacy',[Object.keys(p).find(k=>k.startsWith('Phone#'))]:'Phone: (850) 555-4706'});changed.push(status.id);
return {mutatedNodeIds:changed,reason:'Source-copy readback: restore four 1-refill values and acetaminophen pharmacy/phone.'};
