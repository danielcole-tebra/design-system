figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("0:1"));
for(const id of ["2:43","2:56","2:71"]) $fig.get(id).set({strokesIncludedInLayout:false});
await $fig.done();
await (await figma.getNodeByIdAsync("2:88")).screenshot({scale:1});
await (await figma.getNodeByIdAsync("2:192")).screenshot({scale:1});
return {changed:["2:43","2:56","2:71"],reason:"Keep 1 px inside border out of auto-layout arithmetic; retain intended 72/96 px heights without overflowing Retry label box."};
