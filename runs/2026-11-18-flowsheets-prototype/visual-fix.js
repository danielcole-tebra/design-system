await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('2190:3121'));
const paper=$fig.getVar('f1e85cc976b10ea275c03f5d7f21a0dc12cdfee0');
for(const [stage,base,popup]of[['2191:438','2191:439','2191:669'],['2191:690','2191:691','2191:1045']]){
$fig.get(popup).set({fills:[{type:'SOLID',color:paper}],blendMode:'NORMAL',isMask:false});
$fig.get(stage).reorderChildren([$fig.get(base),$fig.get(popup)]);
}
$fig.get('2191:911').set({visible:false});
await $fig.done();
$fig.get('2191:438').screenshot({scale:0.8});$fig.get('2191:690').screenshot({scale:0.8});
return {mutatedNodeIds:['2191:669','2191:1045','2191:438','2191:690','2191:911']};
