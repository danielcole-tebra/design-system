figma.skipInvisibleInstanceChildren=false;
for(const id of ["21:720","21:751","21:774","21:799"]){const n=await figma.getNodeByIdAsync(id);const avatar=n.query('INSTANCE').filter(c=>c.name.startsWith("Avatar")).map(c=>c)[0];$fig.get(avatar.id).set({props:{"Letter#208:0":"AM"}});}
await $fig.done();
$fig.get("21:716").screenshot({scale:1});
$fig.get("21:749").screenshot({scale:1});
$fig.get("2:88").screenshot({scale:1});
