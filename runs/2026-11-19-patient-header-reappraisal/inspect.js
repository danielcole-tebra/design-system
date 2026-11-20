figma.skipInvisibleInstanceChildren=false;
const ids=['12:755','12:759','12:763','12:767','12:771','27:12','27:73','27:128','27:184','31:336','46:196'];
const result=[];
for(const id of ids){
 const n=await figma.getNodeByIdAsync(id); if(!n){result.push({id,missing:true});continue;}
 const nodes=n.query('*').toArray();
 const visible=(v)=>{let p=v;while(p&&p.id!==n.id){if('visible' in p&&!p.visible)return false;p=p.parent;}return true;};
 result.push({id,name:n.name,type:n.type,parent:{id:n.parent.id,name:n.parent.name},width:n.width,height:n.height,minWidth:n.minWidth,clipsContent:n.clipsContent,layoutMode:n.layoutMode,layoutSizingHorizontal:n.layoutSizingHorizontal,layoutSizingVertical:n.layoutSizingVertical,children:n.children.map(c=>({id:c.id,name:c.name,type:c.type,x:c.x,y:c.y,width:c.width,height:c.height,visible:c.visible})),props:n.type==='INSTANCE'?n.componentProperties:undefined,
 texts:nodes.filter(c=>c.type==='TEXT').map(c=>({id:c.id,name:c.name,text:c.characters,visible:visible(c),w:c.width,h:c.height,truncation:c.textTruncation,maxLines:c.maxLines})),
 reactions:nodes.filter(c=>'reactions'in c&&c.reactions.length).map(c=>({id:c.id,name:c.name,reactions:c.reactions})),
 hyperlinks:nodes.filter(c=>c.type==='TEXT'&&c.hyperlink).map(c=>({id:c.id,link:c.hyperlink}))});
}
const out=JSON.stringify(result); if(out.length>48000)throw new Error('return budget '+out.length);return result;
