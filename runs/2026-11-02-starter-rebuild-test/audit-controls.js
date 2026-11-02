figma.skipInvisibleInstanceChildren=false;
const selected=WIDTH===640?["3:1636","3:1769"]:["3:1904","3:2037"];
const checks=[],instances=[];const add=(name,actual,expected)=>checks.push({name,actual,expected});
const expectedValues={"First name":"Alex","Last name":"Morgan","Email":"alex.morgan@example.com","Phone":"(202) 555-0148","Preferred contact method":"Email"};
for(let k=0;k<selected.length;k++){
 const root=await figma.getNodeByIdAsync(selected[k]),filled=k===1,prefix=(filled?"Filled":"Empty")+" "+WIDTH;
 const all=[root,...root.findAll(()=>true)];const effective=n=>{let p=n;while(p&&p!==root.parent){if(!p.visible||p.opacity===0)return false;p=p.parent;}return true;};const visible=all.filter(effective);
 add(prefix+" width",root.width,WIDTH);add(prefix+" layout",root.layoutMode,"VERTICAL");add(prefix+" height",root.height,WIDTH===640?542:614);
 add(prefix+" raster nodes",all.filter(n=>"fills"in n&&Array.isArray(n.fills)&&n.fills.some(p=>p.type==="IMAGE")).length,0);
 add(prefix+" visible font families",[...new Set(visible.filter(n=>n.type==="TEXT").map(n=>n.fontName.family))],["Akkurat LL"]);
 add(prefix+" paper token",root.fills[0].boundVariables.color.id,"VariableID:f1e85cc976b10ea275c03f5d7f21a0dc12cdfee0/74:146");
 for(const p of ["paddingTop","paddingBottom","paddingLeft","paddingRight","itemSpacing"])add(prefix+" "+p+" token",root.boundVariables[p].id,"VariableID:6016592c19254dd61e9de9e006459546eaece0bb/997:24");
 const title=all.find(n=>n.type==="TEXT"&&n.name==="Title"),description=all.find(n=>n.type==="TEXT"&&n.name==="Description");
 add(prefix+" title",title.characters,"Edit contact details");add(prefix+" description",description.characters,"Update how we contact this patient.");
 add(prefix+" h2 style",title.textStyleId,"S:2e2ad3d421315383c8d117a1e34e4017666511d8,116:29");add(prefix+" body1 style",description.textStyleId,"S:c87aec6a94a2e25a8a25446f8d61716cb25abe73,116:83");
 const row=all.find(n=>n.type==="FRAME"&&n.name==="Name fields");add(prefix+" wrapping",row.layoutWrap,"WRAP");add(prefix+" name row height",row.height,WIDTH===640?56:128);
 for(const[label,value]of Object.entries(expectedValues)){
  const i=all.find(n=>n.type==="INSTANCE"&&n.name===label),p=i.componentProperties;instances.push(i);
  add(prefix+" "+label+" label",p["Label#123:0"].value,label);add(prefix+" "+label+" value",p["Value text#123:11"].value,filled?value:"");add(prefix+" "+label+" state",p.Value.value,filled?"Filled":"Empty");add(prefix+" "+label+" fill",p.Fill.value,"Paper");add(prefix+" "+label+" select",p["select#123:55"].value,label==="Preferred contact method");add(prefix+" "+label+" height",i.height,56);
  add(prefix+" "+label+" width",i.width,WIDTH===640&&(label==="First name"||label==="Last name")?296:WIDTH-32);
 }
 const reminder=all.find(n=>n.type==="INSTANCE"&&n.name==="Appointment reminders"),control=reminder.children.find(n=>n.type==="INSTANCE");instances.push(reminder,control);
 add(prefix+" reminder copy",reminder.componentProperties["Label#140:0"].value,"Send appointment reminders");add(prefix+" checkbox",control.componentProperties.checked.value,filled?"checked":"unchecked");
 for(const[label,color]of [["Cancel","primary"],["Save changes","secondary"]]){const i=all.find(n=>n.type==="INSTANCE"&&n.name===label);instances.push(i);add(prefix+" "+label+" text",i.componentProperties["Label#83:165"].value,label);add(prefix+" "+label+" color",i.componentProperties.color.value,color);add(prefix+" "+label+" reactions",i.reactions.length,0);}
 const outer=root.absoluteBoundingBox;add(prefix+" content outside card",visible.filter(n=>n.absoluteBoundingBox.x<outer.x-1||n.absoluteBoundingBox.x+n.width>outer.x+outer.width+1||n.absoluteBoundingBox.y+n.height>outer.y+outer.height+1).map(n=>n.id),[]);
 const dividers=all.filter(n=>n.type==="RECTANGLE"&&n.name==="Divider");add(prefix+" divider stroke bindings",dividers.map(n=>n.strokes[0].boundVariables.color.id),Array(2).fill("VariableID:ba1923abf373a9062e989ce3ac2068f54712d80b/74:173"));
}
const img=await figma.getNodeByIdAsync("3:2172");add("Original image hash",img.fills[0].imageHash,"6eb3b938adae0de3eaf134715037deb1135d1058");
return await auditEvidence(instances,checks);
