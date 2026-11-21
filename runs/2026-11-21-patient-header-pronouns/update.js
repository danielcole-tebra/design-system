figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("0:1"));
const variants=[{"id":"2:43","name":"Refresh state=Current","rows":[{"id":"2:47","name":"Identity","width":870,"height":52},{"id":"2:48","name":"Name and pronouns","width":206,"height":32}],"texts":[{"id":"2:50","name":"Pronouns","parent":"2:48","characters":"(she/her)","refs":{"visible":"Show pronouns#2:8","characters":"Pronouns#2:4"}},{"id":"2:51","name":"Demographics","parent":"2:47","characters":"Female  •  26 Aug 2002 (23 y/o)  •  (555) 555-2025  •  MRN: 08262025-01","refs":{"characters":"Demographics#2:12"}}]},{"id":"2:56","name":"Refresh state=Fetching","rows":[{"id":"2:60","name":"Identity","width":957,"height":52},{"id":"2:61","name":"Name and pronouns","width":206,"height":32}],"texts":[{"id":"2:63","name":"Pronouns","parent":"2:61","characters":"(she/her)","refs":{"visible":"Show pronouns#2:8","characters":"Pronouns#2:4"}},{"id":"2:64","name":"Demographics","parent":"2:60","characters":"Female  •  26 Aug 2002 (23 y/o)  •  (555) 555-2025  •  MRN: 08262025-01","refs":{"characters":"Demographics#2:12"}}]},{"id":"2:71","name":"Refresh state=Failed","rows":[{"id":"2:75","name":"Identity","width":886,"height":52},{"id":"2:76","name":"Name and pronouns","width":206,"height":32}],"texts":[{"id":"2:78","name":"Pronouns","parent":"2:76","characters":"(she/her)","refs":{"visible":"Show pronouns#2:8","characters":"Pronouns#2:4"}},{"id":"2:79","name":"Demographics","parent":"2:75","characters":"Female  •  26 Aug 2002 (23 y/o)  •  (555) 555-2025  •  MRN: 08262025-01","refs":{"characters":"Demographics#2:12"}}]},{"id":"11:161","name":"Refresh state=Cached","rows":[{"id":"11:165","name":"Identity","width":870,"height":52},{"id":"11:166","name":"Name and pronouns","width":206,"height":32}],"texts":[{"id":"11:168","name":"Pronouns","parent":"11:166","characters":"(she/her)","refs":{"visible":"Show pronouns#2:8","characters":"Pronouns#2:4"}},{"id":"11:169","name":"Demographics","parent":"11:165","characters":"Female  •  26 Aug 2002 (23 y/o)  •  (555) 555-2025  •  MRN: 08262025-01","refs":{"characters":"Demographics#2:12"}}]}];
const gap=$fig.getVar("183d5d946d268e8bd37735b8b0dc95111c46eddd");
const body=$fig.getStyle("cdb9fe68e6b5274b6e42be16d13bb3fb7834dccb");
const muted=$fig.getVar("0d503f1eb6c6f3e923310b2ad6e621cc940b6543");
const created=[],moved=[];
for(const v of variants){
 const identity=v.rows.find(n=>n.name==="Identity"),nameRow=v.rows.find(n=>n.name==="Name and pronouns");
 const pronoun=v.texts.find(n=>n.name==="Pronouns"),demo=v.texts.find(n=>n.name==="Demographics");
 const separator=$fig.text({name:"Pronoun separator",characters:"•",textStyle:body,fills:[{type:"SOLID",color:muted}],textAutoResize:"WIDTH_AND_HEIGHT"});
 const group=$fig.autoLayout({name:"Optional pronouns",itemSpacing:gap,counterAxisAlignItems:"CENTER",fills:[],componentPropertyReferences:{visible:"Show pronouns#2:8"}},[separator]);
 const lower=$fig.autoLayout({name:"Demographics and pronouns",itemSpacing:gap,counterAxisAlignItems:"CENTER",height:20,layoutSizingVertical:"FIXED",fills:[]},[$fig.get(demo.id),group]);
 $fig.get(pronoun.id).moveTo(group);
 $fig.get(identity.id).append(lower);
 $fig.get(nameRow.id).set({name:"Patient name row"});
 moved.push(pronoun.id,demo.id,nameRow.id);
 created.push({variant:v.id,lower,group,separator});
}
const tests=variants.map(v=>$fig.instance(v.id,{name:"900 px · Pronouns hidden / "+v.name,width:900,height:72,props:{"Show pronouns":false}}));
const label=$fig.text({name:"Inspection label",characters:"Pronouns hidden · separator also hidden · 900 px",textStyle:body,fills:[{type:"SOLID",color:muted}],textAutoResize:"WIDTH_AND_HEIGHT"});
const area=$fig.autoLayout({name:"Inspection · 2026-11-21 pronouns",x:1400,y:1500,layoutMode:"VERTICAL",itemSpacing:$fig.getVar("f377dae9eb274ba0c78c22fe147a6bab50271e78"),paddingLeft:$fig.getVar("f377dae9eb274ba0c78c22fe147a6bab50271e78"),paddingRight:$fig.getVar("f377dae9eb274ba0c78c22fe147a6bab50271e78"),paddingTop:$fig.getVar("f377dae9eb274ba0c78c22fe147a6bab50271e78"),paddingBottom:$fig.getVar("f377dae9eb274ba0c78c22fe147a6bab50271e78"),fills:[{type:"SOLID",color:$fig.getVar("4dbef7c8fc453422675312ab6708eeda7e45476b")}]},[label,...tests]);
await $fig.done();
return {moved,created:created.map(r=>({variant:r.variant,lower:r.lower.node.id,group:r.group.node.id,separator:r.separator.node.id})),inspection:{area:area.node.id,label:label.node.id,instances:tests.map(p=>p.node.id)},lowerRows:created.map(r=>({id:r.lower.node.id,width:r.lower.node.width,height:r.lower.node.height,children:r.lower.node.children.map(n=>({id:n.id,name:n.name})),groupRefs:r.group.node.componentPropertyReferences}))};
