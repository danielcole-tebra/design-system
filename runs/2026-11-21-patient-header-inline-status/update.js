figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("0:1"));
const changed=[];
function edit(id,props){$fig.get(id).set(props);changed.push(id);}
const gap=$fig.getVar("183d5d946d268e8bd37735b8b0dc95111c46eddd");
edit("2:67",{visible:false});
edit("2:82",{visible:false});
$fig.get("2:70").moveTo($fig.get("2:66"));changed.push("2:70");
$fig.get("2:85").moveTo($fig.get("2:81"));changed.push("2:85");
$fig.get("2:86").moveTo($fig.get("2:81"));changed.push("2:86");
edit("2:70",{characters:"Loading allergies…",name:"Loading status"});
edit("2:85",{characters:"Allergies failed to load",name:"Failure status"});
edit("2:81",{itemSpacing:gap});
for(const id of ["2:69","2:84"]) edit(id,{visible:false,name:"Superseded / Extra status row · Retained hidden"});
edit("2:56",{name:"Refresh state=Fetching",height:72,description:"Fetching or refreshing replaces the allergy summary with Loading allergies… in the existing area. Identity and balance remain visible. No added row. Daniel, 2026-11-21; supersedes prior-information retention during requests."});
edit("2:71",{height:72,description:"Failed refresh replaces the allergy summary with failure message and Retry in the existing area. Daniel, 2026-11-21; supersedes retained-data display. Retry remains static review material."});
edit("2:42",{description:"Local working header using existing allergy data model. Four successful content meanings. Fetching/refreshing and failed refresh replace allergy content within the 72 px header. No severity inference. Superseded extra rows and prior-content text retained hidden in request variants. Initial-failure/recovery details and other workflows remain open."});
edit("2:43",{description:"Current allergy content using the existing model; four successful meanings. Shared 72 px header. Identity and balance retain their existing presentation."});
edit("2:92",{characters:"All states: 72 px. Loading and failed refresh replace the allergy summary in its existing area."});
edit("2:154",{characters:"05 · Fetching or refreshing allergies"});
edit("2:171",{characters:"06 · Failed refresh"});
for(const id of ["2:153","2:155"])edit(id,{name:"05 · Fetching or refreshing allergies"});
for(const id of ["2:170","2:172"])edit(id,{name:"06 · Failed refresh"});
edit("2:190",{characters:"Next: initial failure without prior allergy information"});
edit("2:191",{characters:"Retry is a visual affordance. Initial-failure and recovery details remain open. Loading/error wording is draft."});
const narrow=$fig.instance("2:56",{name:"900 px · Fetching",width:900,height:72});
$fig.get("2:192").append(narrow);
const readme=$fig.text({name:"README / Superseded status rows",characters:"README · The former extra status rows and prior-allergy text remain hidden in the request variants. Replaced by Daniel’s 21 Nov decision; no nodes deleted.",textStyle:$fig.getStyle("cdb9fe68e6b5274b6e42be16d13bb3fb7834dccb"),fills:[{type:"SOLID",color:$fig.getVar("0d503f1eb6c6f3e923310b2ad6e621cc940b6543")}],width:900,textAutoResize:"HEIGHT"});
$fig.get("2:192").append(readme);
await $fig.done();
const headers=[];
for(const id of ["2:155","2:172","2:207",narrow.node.id]){
 const n=await figma.getNodeByIdAsync(id);
 // Previously authored size overrides may persist; update only their height.
 if(n.height!==72){$fig.get(id).set({height:72});changed.push(id);}
}
await $fig.done();
const counts={};
for(const n of (await figma.getNodeByIdAsync("2:88")).query("*"))counts[n.type]=(counts[n.type]||0)+1;
return {changed,created:{narrow:narrow.node.id,readme:readme.node.id},counts,
imageNodes:(await figma.getNodeByIdAsync("2:88")).query("*").filter(n=>"fills" in n&&Array.isArray(n.fills)&&n.fills.some(p=>p.type==="IMAGE")).map(n=>({id:n.id,name:n.name,type:n.type,width:n.width,height:n.height})),
measurements:await Promise.all(["2:155","2:172","2:207",narrow.node.id].map(async id=>{const n=await figma.getNodeByIdAsync(id);return{id,width:n.width,height:n.height,properties:n.componentProperties};}))};
