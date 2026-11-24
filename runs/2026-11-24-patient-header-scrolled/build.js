figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('0:1'));
if(figma.currentPage.query('[name="Patient header / Scrolled review"]').length)throw Error('Scrolled review exists; inspect before rerun');
const original=await figma.getNodeByIdAsync('2:42');
const existing=[];
for(const c of original.children)for(const n of await c.getInstancesAsync())existing.push({id:n.id,width:n.width,height:n.height});
const clone=$fig.get('2:42').clone({name:'Patient header / Scrolled review',x:1400,y:2800,width:964,height:352,description:'48 px scrolled presentation; name, optional patient alert and allergy state remain visible. Static design review; scroll trigger and disclosure are not wired.'});
await $fig.done();
const copied=clone.node;
const definitions=copied.componentPropertyDefinitions;
const keyFor=k=>Object.keys(definitions).find(p=>p.split('#')[0]===k.split('#')[0]);
const s0=$fig.getVar('ce161dd8d210e94082abb2b2d1731fafc1a23767'),s8=$fig.getVar('183d5d946d268e8bd37735b8b0dc95111c46eddd'),s16=$fig.getVar('6016592c19254dd61e9de9e006459546eaece0bb'),s24=$fig.getVar('f377dae9eb274ba0c78c22fe147a6bab50271e78'),s32=$fig.getVar('0d62cb72fb8788eabda4d5fbada6804ed95063f6');
const muted=$fig.getVar('0d503f1eb6c6f3e923310b2ad6e621cc940b6543'),grey=$fig.getVar('4dbef7c8fc453422675312ab6708eeda7e45476b');
const body=$fig.getStyle('cdb9fe68e6b5274b6e42be16d13bb3fb7834dccb'),bold=$fig.getStyle('2ede1d5b604b7eacc72152b001bef5c2b7182c33'),heading=$fig.getStyle('d3d1857d99805de2943adf94e6697d84b6be4059');
const label=(name,text,style=body)=>$fig.text({name,characters:text,textStyle:style,fills:[{type:'SOLID',color:muted}],layoutSizingHorizontal:'FILL',textAutoResize:'HEIGHT'});
let refs=0;const variants=[];
for(let i=0;i<copied.children.length;i++){
 const c=copied.children[i],src=original.children[i],a=src.query('*').map(n=>n),b=c.query('*').map(n=>n);
 if(a.length!==b.length)throw Error('Clone structure mismatch');
 for(let j=0;j<a.length;j++){let parent=a[j].parent;let nested=false;while(parent&&parent.id!==src.id){if(parent.type==='INSTANCE'){nested=true;break;}parent=parent.parent;}if(!nested&&'componentPropertyReferences'in a[j]){const r=a[j].componentPropertyReferences;if(Object.keys(r).length){const mapped={};for(const [field,key]of Object.entries(r)){mapped[field]=keyFor(key)||key;} $fig.get(b[j].id).set({componentPropertyReferences:mapped});refs++;}}}
 $fig.get(c.id).set({x:32,y:32+i*80,width:900,height:48,layoutSizingHorizontal:'FIXED',layoutSizingVertical:'FIXED'});
 const content=c.query('FRAME[name="Header content"]').map(n=>n)[0];
 $fig.get(content.id).set({height:48,layoutSizingVertical:'FIXED',paddingTop:s0,paddingBottom:s0,counterAxisAlignItems:'CENTER'});
 for(const n of c.query('INSTANCE').filter(n=>n.name.startsWith('Avatar')).map(n=>n))$fig.get(n.id).set({visible:false});
 for(const n of c.query('FRAME[name="Demographics and pronouns"]').map(n=>n))$fig.get(n.id).set({visible:false});
 for(const n of c.query('TEXT[name="Balance"]').map(n=>n))$fig.get(n.id).set({visible:false});
 variants.push({id:c.id,name:c.name});
}
await $fig.done();
const patient='Alexandria Catherine Montgomery-Worthington';
const props={[keyFor('Patient name')]:patient,[keyFor('Show patient alert')]:true};
const cached=variants.find(v=>v.name==='Refresh state=Cached');
const review=$fig.autoLayout({name:'Patient header · 48 px scroll review',x:0,y:2100,width:964,layoutSizingHorizontal:'FIXED',layoutMode:'VERTICAL',paddingLeft:s32,paddingRight:s32,paddingTop:s32,paddingBottom:s32,itemSpacing:s24,fills:[{type:'SOLID',color:grey}]},[
 label('Review title','On scroll · 72 px → 48 px',heading),
 label('Review scope','900 px wide · same long name, patient alert and cached allergies'),
 label('Expanded label','At the top · 72 px',bold),
]);
const expanded=$fig.get('21:720').clone({name:'At the top · 900 × 72 px'});
review.append(expanded,label('Scrolled label','After the full header leaves view · 48 px',bold));
const scrolled=$fig.instance(cached.id,{name:'Scrolled · Long name + alert + cached allergies',width:900,layoutSizingHorizontal:'FIXED',props});
review.append(scrolled,label('Scroll behavior','Name and patient alert stay visible beside the allergy content and cache timestamp. Scrolling back to the top restores the full header.'),
 label('Prototype limits','Static comparison. Scroll activation, reserved page space, alert disclosure and keyboard behavior are specified, not wired.'));
const inspection=$fig.autoLayout({name:'Inspection · 2026-11-24 scrolled header',x:1400,y:3300,width:948,layoutSizingHorizontal:'FIXED',layoutMode:'VERTICAL',paddingLeft:s24,paddingRight:s24,paddingTop:s24,paddingBottom:s24,itemSpacing:s16,fills:[{type:'SOLID',color:grey}]});
const samples=[];
for(const v of variants.filter(v=>v.id!==cached.id)){
 inspection.append(label('State label','48 px · '+v.name,bold));
 const sample=$fig.instance(v.id,{name:'48 px · '+v.name,width:900,layoutSizingHorizontal:'FIXED',props});inspection.append(sample);samples.push({id:sample,name:v.name});
}
inspection.append(label('State label','48 px · Cached, no patient alert',bold));
const noAlert=$fig.instance(cached.id,{name:'48 px · Cached, no patient alert',width:900,layoutSizingHorizontal:'FIXED',props:{...props,[keyFor('Show patient alert')]:false}});
inspection.append(noAlert);
await $fig.done();
return {set:copied.id,variants,restoredReferenceNodes:refs,definitions:copied.componentPropertyDefinitions,existing,review:review.node.id,expanded:expanded.node.id,scrolled:scrolled.node.id,inspection:inspection.node.id,samples:samples.map(s=>({id:s.id.node.id,name:s.name})),noAlert:noAlert.node.id,patient,dimensions:{header:[scrolled.node.width,scrolled.node.height],name:scrolled.node.query('TEXT[name="Patient name"]').map(n=>({text:n.characters,width:n.width,height:n.height})),row:scrolled.node.query('FRAME[name="Patient name row"]').map(n=>({width:n.width,height:n.height})),allergies:scrolled.node.query('FRAME[name="Allergy summary"]').map(n=>({width:n.width,height:n.height}))}};
