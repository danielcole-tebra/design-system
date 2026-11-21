figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("0:1"));
const ink=$fig.getVar("07b906321fb85c5dab66f45f352a17283bcbd857");
const changed=[];
for(const id of ["2:45","2:58","2:73"]){
 const avatar=await figma.getNodeByIdAsync(id);
 for(const text of avatar.query("TEXT")){
   $fig.get(text.id).set({fills:[{type:"SOLID",color:ink}]});changed.push(text.id);
 }
 $fig.get(id).set({name:"Avatar / SCAFFOLDING · Approved header contrast override"});changed.push(id);
}
await $fig.done();
await (await figma.getNodeByIdAsync("2:88")).screenshot({scale:1});
await (await figma.getNodeByIdAsync("2:192")).screenshot({scale:1});
return {changed,scope:"PH-11 approved header-only avatar contrast override; published component unchanged"};
