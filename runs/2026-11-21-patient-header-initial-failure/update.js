figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("0:1"));
const review=$fig.get("2:88"),inspection=$fig.get("2:192");
const body=$fig.getStyle("cdb9fe68e6b5274b6e42be16d13bb3fb7834dccb");
const h5=$fig.getStyle("2ede1d5b604b7eacc72152b001bef5c2b7182c33");
const muted=$fig.getVar("0d503f1eb6c6f3e923310b2ad6e621cc940b6543");
const gap=$fig.getVar("183d5d946d268e8bd37735b8b0dc95111c46eddd");
const note=(name,characters,style=body)=>$fig.text({name,characters,textStyle:style,fills:[{type:"SOLID",color:muted}],textAutoResize:"WIDTH_AND_HEIGHT"});
$fig.get("2:71").set({name:"Refresh state=Failed",description:"Shared allergy-request failure presentation, whether initial request without prior information or failed refresh. Message + Retry replaces allergy content inside the72 px header. Retry reloads only allergies; fetching replaces the message/link with loading; success displays one of four returned content outcomes; repeated failure returns here. Daniel approved2026-11-21. Static visual review, not a live refetch or played-through prototype."});
$fig.get("2:42").set({description:"Existing allergy data model; no inferred severity. Current, Fetching and Failed presentation variants. Both initial failure with no prior information and failed refresh reuse Failed. All remain72 px. Retry reloads only allergies. Server-cached response, View All and contradictory flags/list remain under discussion."});
const initial=$fig.instance("2:71",{name:"07 · Initial failure · No prior allergy information",width:1184,height:72,props:{"Allergy information":""}});
const workflow=note("Approved recovery workflow","Retry reloads only allergies → Loading → Returned allergy content on success, or this failure message again.");
const card=$fig.autoLayout({name:"07 · Initial failure · No prior allergy information",layoutMode:"VERTICAL",itemSpacing:gap,fills:[]},[
note("State label","07 · Initial failure · No prior allergy information",h5),initial,workflow
]);
review.addAt(7,card);
const narrow=$fig.instance("2:71",{name:"900 px · Initial failure · No prior information",width:900,height:72,props:{"Allergy information":""}});
inspection.addAt(4,narrow);
$fig.get("2:190").set({characters:"Next: successful response served from cached allergy data"});
$fig.get("2:191").set({characters:"Cache provenance/date, View All and conflicting flags/list remain open. Retry is a static visual affordance."});
await $fig.done();
const scope=await figma.getNodeByIdAsync("2:88"),counts={};
for(const n of scope.query("*"))counts[n.type]=(counts[n.type]||0)+1;
return {created:{card:card.node.id,initial:initial.node.id,narrow:narrow.node.id,workflow:workflow.node.id},changed:["2:71","2:42","2:190","2:191"],counts,imageNodes:scope.query("*").filter(n=>"fills" in n&&Array.isArray(n.fills)&&n.fills.some(p=>p.type==="IMAGE")).map(n=>({id:n.id,name:n.name,type:n.type,width:n.width,height:n.height})),properties:{initial:initial.node.componentProperties,narrow:narrow.node.componentProperties},measurements:[{id:initial.node.id,width:initial.node.width,height:initial.node.height},{id:narrow.node.id,width:narrow.node.width,height:narrow.node.height}]};
