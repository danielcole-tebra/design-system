figma.skipInvisibleInstanceChildren=false;
const set=await figma.getNodeByIdAsync("145:21535");const screen=await figma.getNodeByIdAsync("145:22172");
const fonts=new Map();for(const t of set.findAllWithCriteria({types:["TEXT"]}))for(const s of t.getStyledTextSegments(["fontName"]))fonts.set(JSON.stringify(s.fontName),s.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
function f(n,name){return n.findOne(c=>c.name===name);}
function visible(n){let p=n;while(p&&p.type!=="PAGE"){if(p.visible===false)return false;p=p.parent;}return true;}
function text(n,name){return f(n,name).characters;}
const created=[],assertions=[];function check(name,actual,expected){assertions.push({name,actual,expected});}
const area=await figma.getNodeByIdAsync("145:35852");const variantIds=area.children.map(n=>n.id);const testArea=figma.createAutoLayout("VERTICAL");created.push(testArea);testArea.name="Inspection · Structured sig content roundtrips · 2026-11-16";testArea.fills=[];testArea.x=10560;testArea.y=3800;testArea.itemSpacing=16;
const rows=f(screen,"Medication table").children.filter(n=>n.visible&&n.type==="INSTANCE");
for(let i=0;i<rows.length;i++){
const src=rows[i];const r=src.clone();testArea.appendChild(r);
const props=Object.fromEntries(Object.entries(src.componentProperties).filter(([k,v])=>v.type==="TEXT"||v.type==="BOOLEAN").map(([k,v])=>[k,v.value]));
const expectedStatus=f(src,"Summary status").componentProperties.State.value;const expectedAction=f(src,"Edit").componentProperties["Label#83:165"].value;
for(const state of [{Disclosure:"Expanded",Mode:"List",Reviewed:"No"},{Disclosure:"Expanded",Mode:"Review",Reviewed:"Yes"},{Disclosure:"Collapsed",Mode:"Review",Reviewed:"No"},{Disclosure:"Collapsed",Mode:"List",Reviewed:"No"}]){
r.setProperties(state);const suffix=i+" "+state.Disclosure+" "+state.Mode+" "+state.Reviewed;
const actual=Object.fromEntries(Object.keys(props).map(k=>[k,r.componentProperties[k].value]));check("content "+suffix,actual,props);
check("directions visible "+suffix,visible(f(r,"Directions")),state.Disclosure==="Expanded");check("source visibility "+suffix,visible(f(r,"Source note")),props["Show source note#34:13"]&&state.Disclosure==="Expanded");
check("status "+suffix,f(r,"Summary status").componentProperties.State.value,expectedStatus);
check("action "+suffix,f(r,"Edit").componentProperties["Label#83:165"].value,expectedAction);
check("details "+suffix,visible(f(r,"Inline prescription details")),state.Disclosure==="Expanded");
check("width "+suffix,r.width,1216);
check("prescriber disclosed "+suffix,visible(f(r,"Prescriber / source")),state.Disclosure==="Expanded");
check("text Details "+suffix,f(r,"Toggle details").componentProperties.variant.value,"text");
check("contained primary "+suffix,f(r,"Edit").componentProperties.variant.value,"contained");
for(const field of ["Dose","Route","Timing","Start","Stop"])check(field+" visible "+suffix,visible(f(r,field)),true);
for(const field of ["Start","Stop"])check(field+" unavailable "+suffix,text(r,field),"—");
}
}
const roots=await Promise.all(["145:22172","145:26434","145:31634"].map(id=>figma.getNodeByIdAsync(id)));const census=[];
for(const root of roots){const all=[root,...root.findAll()];const vis=all.filter(visible);const images=all.filter(n=>Array.isArray(n.fills)&&n.fills.some(p=>p.type==="IMAGE")).map(n=>n.id);const types={};for(const n of all)types[n.type]=(types[n.type]||0)+1;
const badFont=vis.filter(n=>n.type==="TEXT"&&n.fontName.family!=="Akkurat LL").map(n=>({id:n.id,name:n.name,font:n.fontName}));
const table=f(root,"Medication table");check("table fonts "+root.id,table.findAll(n=>n.type==="TEXT"&&visible(n)&&n.fontName.family!=="Akkurat LL").length,0);
const overflow=table.findAll(n=>visible(n)&&n.parent.type!=="PAGE"&&(n.x<-.5||n.y<-.5||n.x+n.width>n.parent.width+.5||n.y+n.height>n.parent.height+.5)).map(n=>({id:n.id,name:n.name,w:n.width,parentW:n.parent.width}));
check("table overflow "+root.id,overflow.length,0);check("editable "+root.id,images.length,0);
census.push({id:root.id,width:root.width,height:root.height,types,images,badFont,overflow});
}
for(const root of roots){const h=f(root,"Structured sig headings");check("headers "+root.id,h.children.filter(n=>n.visible&&n.name.startsWith("Header column /")).map(n=>n.children.find(c=>c.type==="INSTANCE").componentProperties["Text#190:0"].value),["Medication","Dose","Route","Timing","Start","Stop","Actions"]);}
const reactionChecks=[];for(const root of [set,...roots])for(const n of [root,...root.findAll()])if(visible(n)&&n.reactions?.length)for(const r of n.reactions)for(const a of r.actions||[])if(a.destinationId){const dest=await figma.getNodeByIdAsync(a.destinationId);reactionChecks.push({from:n.id,to:a.destinationId,navigation:a.navigation,resolves:!!dest});}
check("reaction targets resolve",reactionChecks.every(r=>r.resolves),true);
function encodeIds(ids){const direct=[],groups={};for(const id of ids){const i=id.indexOf(';');if(i<0)direct.push(id);else(groups[id.slice(0,i)]??=[]).push(id.slice(i+1));}const profiles=[],lookup=new Map(),instances={};for(const [prefix,suffixes]of Object.entries(groups)){const key=JSON.stringify(suffixes);if(!lookup.has(key)){lookup.set(key,profiles.length);profiles.push(suffixes);}instances[prefix]=lookup.get(key);}return{encoding:'direct IDs; for each instances prefix, concatenate prefix + semicolon + each suffix in profiles[index]',count:ids.length,direct,profiles,instances};}
return {createdNodeIds:encodeIds(created.flatMap(n=>[n.id,...n.findAll().map(c=>c.id)])),mutatedNodeIds:[],areaId:area.id,roundtripAreaId:testArea.id,variantIds,assertions:{checked:assertions.length,failures:assertions.filter(a=>JSON.stringify(a.actual)!==JSON.stringify(a.expected))},census,reactionChecks,verifiedAt:new Date().toISOString()};
