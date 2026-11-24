figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('0:1'));
if(figma.currentPage.query('[name="Patient alert · 900 px stress review"]').length)throw Error('Review already exists; inspect before rerunning');
const set=await figma.getNodeByIdAsync('2:42');
const before=[];
for(const variant of set.children){for(const n of await variant.getInstancesAsync())before.push({id:n.id,width:n.width,height:n.height});}
const s8=$fig.getVar('183d5d946d268e8bd37735b8b0dc95111c46eddd'),s16=$fig.getVar('6016592c19254dd61e9de9e006459546eaece0bb'),s24=$fig.getVar('f377dae9eb274ba0c78c22fe147a6bab50271e78'),s32=$fig.getVar('0d62cb72fb8788eabda4d5fbada6804ed95063f6');
const ink=$fig.getVar('07b906321fb85c5dab66f45f352a17283bcbd857'),muted=$fig.getVar('0d503f1eb6c6f3e923310b2ad6e621cc940b6543'),paper=$fig.getVar('f1e85cc976b10ea275c03f5d7f21a0dc12cdfee0'),grey=$fig.getVar('4dbef7c8fc453422675312ab6708eeda7e45476b'),divider=$fig.getVar('ba1923abf373a9062e989ce3ac2068f54712d80b');
const heading=$fig.getStyle('d3d1857d99805de2943adf94e6697d84b6be4059'),body=$fig.getStyle('cdb9fe68e6b5274b6e42be16d13bb3fb7834dccb'),bold=$fig.getStyle('2ede1d5b604b7eacc72152b001bef5c2b7182c33');
const paint=v=>[{type:'SOLID',color:v}];
const label=(name,text,style=body)=>$fig.text({name,characters:text,textStyle:style,fills:paint(muted),textAutoResize:'HEIGHT',layoutSizingHorizontal:'FILL'});
const chips=[];
for(const variant of set.children){
 const row=variant.query('FRAME[name="Patient name row"]').map(n=>n)[0];
 const chip=$fig.instance('13f8980252f76027e72fbd48e4bdaa21558082f4',{name:'Patient alert trigger',props:{'Label#156:0':'Patient alert','Delete icon#156:43':false}});
 const optional=$fig.autoLayout({name:'Optional patient alert',visible:false,fills:[],counterAxisAlignItems:'CENTER'},[chip]).booleanProp('Show patient alert');
 $fig.get(row.id).set({layoutSizingHorizontal:'FILL',counterAxisAlignItems:'CENTER',itemSpacing:s8}).append(optional);
 chips.push({variant:variant.id,chip,optional});
}
await $fig.done();
const show=Object.keys(set.componentPropertyDefinitions).find(k=>k.startsWith('Show patient alert#'));
if(!show)throw Error('Missing alert visibility control');
const patient='Alexandria Catherine Montgomery-Worthington';
const message='Patient requests a Spanish interpreter for visits. Please confirm interpreter availability before the appointment and use the preferred phone number for scheduling.';
const props={'Patient name#2:0':patient,[show]:true};
const review=$fig.autoLayout({name:'Patient alert · 900 px stress review',x:0,y:1400,width:964,layoutSizingHorizontal:'FIXED',layoutMode:'VERTICAL',paddingLeft:s32,paddingRight:s32,paddingTop:s32,paddingBottom:s32,itemSpacing:s24,fills:paint(grey)},[
 label('Review title','Patient alert · 900 px stress test',heading),
 label('Review scope','Long patient name + long alert + cached allergies. Header target: 900 × 72 px. Fictional content; historical demographics retained.'),
]);
const closed=$fig.instance('11:161',{name:'09 · Long name + patient alert + cached allergies · 900 px',width:900,layoutSizingHorizontal:'FIXED',props});
review.append(label('Closed label','Compact header · alert message collapsed',bold),closed);
review.append(label('Disclosure label','Expanded message · static disclosure preview',bold));
const disclosure=$fig.autoLayout({name:'Patient alert disclosure',width:440,layoutSizingHorizontal:'FIXED',layoutMode:'VERTICAL',itemSpacing:s8,paddingLeft:s16,paddingRight:s16,paddingTop:s16,paddingBottom:s16,fills:paint(paper),strokes:paint(divider),strokeWeight:1,strokeAlign:'INSIDE',strokesIncludedInLayout:false},[
 label('Disclosure title','Patient alert',bold),label('Full patient alert message',message),
]);
const disclosureRow=$fig.autoLayout({name:'Disclosure alignment',width:900,layoutSizingHorizontal:'FIXED',paddingLeft:72,layoutMode:'HORIZONTAL',fills:[]},[disclosure]);
review.append(disclosureRow,label('Behavior note','Click or keyboard activation should open the full message; Escape or outside click should close it. This review is static. Allergy fetching, failure and cache status remain independent.'));
const inspection=$fig.autoLayout({name:'Inspection · 2026-11-24 patient alert',x:1400,y:2100,width:948,layoutSizingHorizontal:'FIXED',layoutMode:'VERTICAL',paddingLeft:s24,paddingRight:s24,paddingTop:s24,paddingBottom:s24,itemSpacing:s16,fills:paint(grey)});
const samples=[];
for(const id of ['2:43','2:56','2:71']){
 const c=await figma.getNodeByIdAsync(id);
 inspection.append(label('Inspection label','900 px · Patient alert + '+c.name,bold));
 const sample=$fig.instance(id,{name:'900 px · Patient alert + '+c.name,width:900,layoutSizingHorizontal:'FIXED',props});
 inspection.append(sample);samples.push(sample);
}
$fig.get('2:190').set({characters:'Current review: Patient alert at 900 px'});
$fig.get('2:191').set({characters:'See the patient-alert stress review below. Full disclosure interaction and broader overflow rules still need validation; Retry remains static.'});
await $fig.done();
return{before,review:review.node.id,header:closed.node.id,disclosure:disclosure.node.id,inspection:inspection.node.id,samples:samples.map(p=>p.node.id),chips:chips.map(p=>({variant:p.variant,chip:p.chip.node.id,optional:p.optional.node.id})),showProperty:show,patient,message,dimensions:{header:[closed.node.width,closed.node.height],name:closed.node.query('TEXT[name="Patient name"]').map(n=>({width:n.width,height:n.height,text:n.characters})),row:closed.node.query('FRAME[name="Patient name row"]').map(n=>({width:n.width,height:n.height,children:n.children.map(c=>({name:c.name,width:c.width,x:c.x,visible:c.visible}))}))}};
