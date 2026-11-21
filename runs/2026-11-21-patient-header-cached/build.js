figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("0:1"));
const sourceIdentity=await figma.getNodeByIdAsync("2:47");
const sourceRefs=sourceIdentity.query("TEXT").map(n=>({name:n.name,refs:n.componentPropertyReferences}));
const sourceBalance=await figma.getNodeByIdAsync("2:55");
const v={paper:$fig.getVar("f1e85cc976b10ea275c03f5d7f21a0dc12cdfee0"),divider:$fig.getVar("ba1923abf373a9062e989ce3ac2068f54712d80b"),ink:$fig.getVar("07b906321fb85c5dab66f45f352a17283bcbd857"),muted:$fig.getVar("0d503f1eb6c6f3e923310b2ad6e621cc940b6543"),s0:$fig.getVar("ce161dd8d210e94082abb2b2d1731fafc1a23767"),s8:$fig.getVar("183d5d946d268e8bd37735b8b0dc95111c46eddd"),s16:$fig.getVar("6016592c19254dd61e9de9e006459546eaece0bb")};
const h5=$fig.getStyle("2ede1d5b604b7eacc72152b001bef5c2b7182c33"),body=$fig.getStyle("cdb9fe68e6b5274b6e42be16d13bb3fb7834dccb"),caption=$fig.getStyle("7d2c1e680e75d61c2bafaed604ad9014fef3e981");
function text(name,characters,style,color=v.muted){return $fig.text({name,characters,textStyle:style,fills:[{type:"SOLID",color}],textAutoResize:"WIDTH_AND_HEIGHT"});}
const avatar=$fig.get("2:45").clone();
const identity=$fig.get("2:47").clone({layoutSizingHorizontal:"FILL"});
const balance=$fig.get("2:55").clone();
const allergyText=text("Allergy information","Allergies: egg, poison ivy extract",h5,v.ink);
const cacheText=text("Cache provenance","Cached · Nov 20 at 10:30 AM",caption).textProp("Cache label");
const allergy=$fig.autoLayout({name:"Allergy summary",layoutMode:"VERTICAL",counterAxisAlignItems:"MAX",itemSpacing:v.s0,fills:[]},[allergyText,cacheText]);
const safety=$fig.autoLayout({name:"Allergies and balance",layoutMode:"VERTICAL",counterAxisAlignItems:"MAX",itemSpacing:v.s0,fills:[]},[allergy,balance]);
const row=$fig.autoLayout({name:"Header content",width:1184,height:72,layoutSizingHorizontal:"FILL",layoutSizingVertical:"FIXED",paddingLeft:v.s16,paddingRight:v.s16,paddingTop:v.s8,paddingBottom:v.s8,itemSpacing:v.s16,counterAxisAlignItems:"CENTER",fills:[]},[avatar,identity,safety]);
const cached=$fig.component({name:"Refresh state=Cached",x:32,y:416,width:1184,height:72,layoutMode:"VERTICAL",layoutSizingHorizontal:"FIXED",layoutSizingVertical:"FIXED",itemSpacing:v.s0,fills:[{type:"SOLID",color:v.paper}],strokes:[{type:"SOLID",color:v.divider}],strokeWeight:1,strokeAlign:"INSIDE",strokesIncludedInLayout:false,clipsContent:false,description:"Successful server-cached response: show returned allergy content and supplied cache date/time in the existing allergy area. Daniel approved2026-11-21. Sample timestamp is illustrative; production uses server provenance in clinical-page timezone. Local presentation, not a backend field. Caption12/16; allergy20 + cache16 + balance20 =56 px;8 px vertical insets retain72 px overall. Missing/invalid timestamp behavior and any refresh action remain open."},[row]);
$fig.get("2:42").append(cached).set({height:520,description:"Working header: Current, Fetching, Failed and Cached presentation variants. Existing allergy model with four content meanings. Cached denotes a successful response carrying cache provenance; display content with supplied date/time. All variants72 px. No inference of severity. Original Proposals and library unchanged."});
await $fig.done();
// Cloned identity/balance controls must retain exact set property references.
for(const n of identity.node.query("TEXT")){
 const source=sourceRefs.find(s=>s.name===n.name);
 if(source)$fig.get(n.id).set({componentPropertyReferences:source.refs});
}
balance.set({componentPropertyReferences:sourceBalance.componentPropertyReferences});
allergyText.set({componentPropertyReferences:{characters:"Allergy information#2:16"}});
await $fig.done();
const preview=$fig.instance(cached,{name:"08 · Cached allergy information",width:1184,height:72});
const note=text("Cache note","Illustrative cache timestamp. The actual label uses the supplied cache date/time in the clinical-page timezone.",body);
const card=$fig.autoLayout({name:"08 · Cached allergy information",layoutMode:"VERTICAL",itemSpacing:v.s8,fills:[]},[text("State label","08 · Cached allergy information",h5),preview,note]);
$fig.get("2:88").addAt(8,card);
const copies=["Allergies: egg, poison ivy extract","No known allergies","No known medication allergies","No allergy history documented"],checks=[];
for(let i=0;i<copies.length;i++){
 const n=$fig.instance(cached,{name:"900 px · Cached / "+copies[i],width:900,height:72,props:{"Allergy information":copies[i]}});
 $fig.get("2:192").addAt(5+i,n);checks.push(n);
}
$fig.get("2:92").set({characters:"All states: 72 px. Loading/failure replaces allergy content; cached responses show content with the cache date."});
$fig.get("2:190").set({characters:"Next: View All visibility and destination"});
$fig.get("2:191").set({characters:"Missing/invalid cache dates, refresh actions and conflicting flags/list remain open. Retry is a static affordance."});
await $fig.done();
const count={};const all=(await figma.getNodeByIdAsync("2:88")).query("*");
for(const n of all)count[n.type]=(count[n.type]||0)+1;
return {created:{variant:cached.node.id,row:row.node.id,avatar:avatar.node.id,identity:identity.node.id,balance:balance.node.id,allergy:allergy.node.id,allergyText:allergyText.node.id,cacheText:cacheText.node.id,card:card.node.id,preview:preview.node.id,checks:checks.map(p=>p.node.id)},changed:["2:42","2:88","2:192","2:92","2:190","2:191"],definitions:(await figma.getNodeByIdAsync("2:42")).componentPropertyDefinitions,bindings:identity.node.query("TEXT").map(n=>({id:n.id,name:n.name,refs:n.componentPropertyReferences})),dimensions:{header:[cached.node.width,cached.node.height],allergy:[allergy.node.width,allergy.node.height],safety:[safety.node.width,safety.node.height],caption:[cacheText.node.fontSize,cacheText.node.lineHeight]},counts:count,imageNodes:all.filter(n=>"fills" in n&&Array.isArray(n.fills)&&n.fills.some(p=>p.type==="IMAGE")).map(n=>({id:n.id,name:n.name,type:n.type,width:n.width,height:n.height}))};
