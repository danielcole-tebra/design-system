figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("0:1"));
const v = {
paper:$fig.getVar("f1e85cc976b10ea275c03f5d7f21a0dc12cdfee0"),
divider:$fig.getVar("ba1923abf373a9062e989ce3ac2068f54712d80b"),
ink:$fig.getVar("07b906321fb85c5dab66f45f352a17283bcbd857"),
muted:$fig.getVar("0d503f1eb6c6f3e923310b2ad6e621cc940b6543"),
canvas:$fig.getVar("4dbef7c8fc453422675312ab6708eeda7e45476b"),
s0:$fig.getVar("ce161dd8d210e94082abb2b2d1731fafc1a23767"),
s8:$fig.getVar("183d5d946d268e8bd37735b8b0dc95111c46eddd"),
s16:$fig.getVar("6016592c19254dd61e9de9e006459546eaece0bb"),
s24:$fig.getVar("f377dae9eb274ba0c78c22fe147a6bab50271e78"),
s32:$fig.getVar("0d62cb72fb8788eabda4d5fbada6804ed95063f6")
};
const h3=$fig.getStyle("d3d1857d99805de2943adf94e6697d84b6be4059");
const body=$fig.getStyle("cdb9fe68e6b5274b6e42be16d13bb3fb7834dccb");
const h5=$fig.getStyle("2ede1d5b604b7eacc72152b001bef5c2b7182c33");
const avatarKey="e4c9d847a4bbf52a5ddfa6df8c918a57303c0a43",linkKey="31c895128ccc0a076b3b327be980679c5a169045";
const avatarMaster=$fig.get(avatarKey),linkMaster=$fig.get(linkKey);
await $fig.done();
const avatarDefs=avatarMaster.node.parent.type==="COMPONENT_SET"?avatarMaster.node.parent.componentPropertyDefinitions:avatarMaster.node.componentPropertyDefinitions;
const linkDefs=linkMaster.node.componentPropertyDefinitions;
const letterProp=Object.keys(avatarDefs).find(k=>k.startsWith("Letter#"));
const labelProp=Object.keys(linkDefs).find(k=>k.startsWith("Label#"));
if(!letterProp || !labelProp) throw Error("Expected published text properties missing");
const paint=c=>[{type:"SOLID",color:c}];
function txt(name,characters,style=body,color=v.ink){
 return $fig.text({name,characters,textStyle:style,fills:paint(color),textAutoResize:"WIDTH_AND_HEIGHT"});
}
const variants=[],avatarPlans=[],retryPlans=[];
for(const state of ["Current","Updating","Refresh failed"]){
 const avatar=$fig.instance(avatarKey,{name:"Avatar",props:{[letterProp]:"DW"}});
 avatarPlans.push(avatar);
 const nameRow=$fig.autoLayout({name:"Name and pronouns",itemSpacing:v.s8,height:32,layoutSizingVertical:"FIXED",counterAxisAlignItems:"CENTER",fills:[]},[
 txt("Patient name","Dana Whitfield",h3).textProp("Patient name"),
 txt("Pronouns","(she/her)",body,v.muted).textProp("Pronouns").booleanProp("Show pronouns")
 ]);
 const identity=$fig.autoLayout({name:"Identity",layoutMode:"VERTICAL",itemSpacing:v.s0,layoutSizingHorizontal:"FILL",fills:[]},[
 nameRow,
 txt("Demographics","Female  •  26 Aug 2002 (23 y/o)  •  (555) 555-2025  •  MRN: 08262025-01",body,v.muted).textProp("Demographics")
 ]);
 const allergy=$fig.autoLayout({name:"Allergy summary",height:32,layoutSizingVertical:"FIXED",counterAxisAlignItems:"CENTER",fills:[]},[
 txt("Allergy information","Allergies: egg, poison ivy extract",h5).textProp("Allergy information")
 ]);
 const safety=$fig.autoLayout({name:"Allergies and balance",layoutMode:"VERTICAL",counterAxisAlignItems:"MAX",itemSpacing:v.s0,fills:[]},[
 allergy,txt("Balance","Balance $0.00",body,v.muted).textProp("Balance")
 ]);
 const row=$fig.autoLayout({name:"Header content",width:1184,height:72,layoutSizingHorizontal:"FILL",layoutSizingVertical:"FIXED",paddingLeft:v.s16,paddingRight:v.s16,paddingTop:10,paddingBottom:10,itemSpacing:v.s16,counterAxisAlignItems:"CENTER",fills:[]},[avatar,identity,safety]);
 const children=[row];
 if(state!=="Current"){
   const parts=[txt("Refresh status",state==="Updating"?"Updating allergies · Last available information shown":"Allergy refresh failed · Last available information shown",body,v.muted)];
   if(state==="Refresh failed"){
     const retry=$fig.instance(linkKey,{name:"Retry",props:{[labelProp]:"Retry"}});
     retryPlans.push(retry);parts.push(retry);
   }
   children.push($fig.autoLayout({name:"Refresh status row",height:24,layoutSizingVertical:"FIXED",layoutSizingHorizontal:"FILL",itemSpacing:v.s8,paddingLeft:v.s16,paddingRight:v.s16,primaryAxisAlignItems:"MAX",counterAxisAlignItems:"CENTER",fills:[]},parts));
 }
 const component=$fig.component({name:"Refresh state="+state,width:1184,height:state==="Current"?72:96,layoutMode:"VERTICAL",layoutSizingHorizontal:"FIXED",layoutSizingVertical:"FIXED",itemSpacing:v.s0,fills:paint(v.paper),strokes:paint(v.divider),strokeWeight:1,strokeAlign:"INSIDE",clipsContent:false,description:"Working patient-header presentation. Existing allergy data model; no severity inference. Same-patient prior content remains visible during refresh/failure. Retry is shown as a visual affordance; no live request or prototype transition is implemented. 72 px current / 96 px refresh are draft geometry."},children);
 variants.push(component);
}
const set=$fig.variants({name:"Patient header / Working review",x:1400,y:0,description:"Local project component. Refresh state is a Figma presentation axis, not a new data-model field. Allergy information is editable in all three variants. See review canvas for the four successful content meanings. Pending: initial loading/no-data failure, server-cache provenance and other workflows."},variants);
await $fig.done();
variants.forEach((p,i)=>p.set({x:32,y:32+i*128}));
set.set({width:1248,height:416});
const examples=[
 ["01 · Allergy names present","Allergies: egg, poison ivy extract",0],
 ["02 · No known allergies","No known allergies",0],
 ["03 · No known medication allergies","No known medication allergies",0],
 ["04 · No allergy history documented","No allergy history documented",0],
 ["05 · Updating with prior information","Allergies: egg, poison ivy extract",1],
 ["06 · Failed refresh with prior information","Allergies: egg, poison ivy extract",2]
];
const instancePlans=[],cards=[];
for(const [label,copy,index] of examples){
 const inst=$fig.instance(variants[index],{name:label,props:{"Allergy information":copy}});
 instancePlans.push(inst);
 cards.push($fig.autoLayout({name:label,layoutMode:"VERTICAL",itemSpacing:v.s8,fills:[]},[
 txt("State label",label,h5,v.muted),inst
 ]));
}
const review=$fig.autoLayout({name:"Patient header · Agreed states",x:0,y:0,width:1248,layoutSizingHorizontal:"FIXED",layoutMode:"VERTICAL",paddingTop:v.s32,paddingBottom:v.s32,paddingLeft:v.s32,paddingRight:v.s32,itemSpacing:v.s24,fills:paint(v.canvas),clipsContent:false},[
 $fig.autoLayout({name:"Review context",layoutMode:"VERTICAL",itemSpacing:v.s8,fills:[]},[
 txt("Title","Patient header · Working review",h3),
 txt("Scope","Agreed content and refresh behavior · 21 Nov 2026",body,v.muted),
 txt("Presentation note","Four content states: 72 px. Retained-data refresh states: 96 px. Status wording and layout are drafts.",body,v.muted)
 ]),...cards,
 $fig.autoLayout({name:"Next discussion",layoutMode:"VERTICAL",itemSpacing:v.s8,paddingTop:v.s16,fills:[]},[
 txt("Next state","Next: initial loading and failure without prior allergy information",h5),
 txt("Limits","Those states are not designed yet. Retry is a visual affordance. Original proposal and Tebra library are unchanged.",body,v.muted)
 ])
]);
const narrowA=$fig.instance(variants[0],{name:"900 px · Current",width:900});
const narrowB=$fig.instance(variants[2],{name:"900 px · Refresh failed",width:900});
const inspection=$fig.autoLayout({name:"Inspection · 2026-11-21 working header",x:1400,y:480,layoutMode:"VERTICAL",itemSpacing:v.s24,paddingTop:v.s24,paddingBottom:v.s24,paddingLeft:v.s24,paddingRight:v.s24,fills:paint(v.canvas)},[
 txt("Inspection note","900 px reference width · retained verification instances",h5),narrowA,narrowB
]);
$fig.get("0:1").set({name:"Patient header"});
await $fig.done();
return {
 ids:{review:review.node.id,set:set.node.id,variants:variants.map(p=>p.node.id),instances:instancePlans.map(p=>p.node.id),avatars:avatarPlans.map(p=>p.node.id),retries:retryPlans.map(p=>p.node.id),inspection:inspection.node.id,narrow:[narrowA.node.id,narrowB.node.id]},
 definitions:{avatar:avatarDefs,link:linkDefs,header:set.node.componentPropertyDefinitions},
 measurements:instancePlans.map(p=>({id:p.node.id,width:p.node.width,height:p.node.height,properties:p.node.componentProperties})),
 createdNodes:figma.currentPage.query("*").map(n=>({id:n.id,name:n.name,type:n.type}))
};
