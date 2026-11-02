figma.skipInvisibleInstanceChildren=false;
const page=figma.currentPage;
if(page.children.some(n=>n.name==="First run · Contact details · Review"))throw new Error("Existing run: inspect before retry");
const C={},V={},S={};
await Promise.all(ASSETS.components.map(async a=>{C[a.name]=await figma.importComponentSetByKeyAsync(a.key);}));
await Promise.all(ASSETS.variables.map(async a=>{V[a.name]=await figma.variables.importVariableByKeyAsync(a.key);}));
await Promise.all(ASSETS.styles.map(async a=>{S[a.name]=await figma.importStyleByKeyAsync(a.key);}));
const val=(name,n)=>V[name].resolveForConsumer(n).value;
if(val("radius/sm",C.Card.defaultVariant)!==4)throw new Error("Unexpected library card radius");
const pick=(name,props)=>{const c=C[name].children.find(n=>n.type==="COMPONENT"&&Object.entries(props).every(([k,v])=>n.variantProperties[k]===v));if(!c)throw new Error("Missing variant "+name+JSON.stringify(props));return c;};
const fieldEmpty=pick("Text field",{size:"medium",State:"Default",Value:"Empty",Fill:"Paper"}),fieldFilled=pick("Text field",{size:"medium",State:"Default",Value:"Filled",Fill:"Paper"});
const cancelMaster=pick("Button",{variant:"contained",color:"primary",size:"medium",State:"Default"}),saveMaster=pick("Button",{variant:"contained",color:"secondary",size:"medium",State:"Default"});
const formMaster=pick("Form control label",{State:"Default"});
const checkOff=pick("Checkbox",{checked:"unchecked",State:"Default",Flush:"None"}),checkOn=pick("Checkbox",{checked:"checked",State:"Default",Flush:"None"});
const fonts=new Map();for(const c of [fieldEmpty,fieldFilled,cancelMaster,saveMaster,formMaster,checkOff,checkOn])for(const t of c.findAllWithCriteria({types:["TEXT"]}))for(const seg of t.getStyledTextSegments(["fontName"]))fonts.set(JSON.stringify(seg.fontName),seg.fontName);
for(const s of Object.values(S))if(s.type==="TEXT")fonts.set(JSON.stringify(s.fontName),s.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const created=[],libraryInstances=[],ownText=[],frames=[];
const reg=n=>{created.push(n.id);return n;};
const paint=(name,n)=>{const c=val(name,n);const p=figma.variables.setBoundVariableForPaint({type:"SOLID",color:{r:c.r,g:c.g,b:c.b},opacity:c.a===undefined?1:c.a},"color",V[name]);return {...p,color:{r:c.r,g:c.g,b:c.b},opacity:c.a===undefined?1:c.a};};
const bind=(n,key,name)=>{n[key]=val(name,n);n.setBoundVariable(key,V[name]);};
function frame(parent,name,width,mode="VERTICAL",gap="space/16"){
 const n=reg(figma.createAutoLayout(mode));parent.appendChild(n);n.name=name;n.resize(width,1);n.primaryAxisSizingMode=mode==="VERTICAL"?"AUTO":"FIXED";n.counterAxisSizingMode=mode==="VERTICAL"?"FIXED":"AUTO";n.fills=[];n.clipsContent=false;
 bind(n,"itemSpacing",gap);for(const p of ["paddingLeft","paddingRight","paddingTop","paddingBottom"])bind(n,p,"space/0");frames.push(n.id);return n;
}
async function textNode(parent,name,copy,style,width,ink="color/text/primary"){
 const t=reg(figma.createText());parent.appendChild(t);t.name=name;await t.setTextStyleIdAsync(S[style].id);t.characters=copy;t.textAutoResize="HEIGHT";t.resize(width,t.height);t.fills=[paint(ink,t)];t.layoutSizingHorizontal="FILL";ownText.push(t.id);return t;
}
function divider(parent,width){const d=reg(figma.createRectangle());parent.appendChild(d);d.name="Divider";d.resize(width,1);d.fills=[paint("color/divider",d)];d.layoutSizingHorizontal="FILL";return d;}
function field(parent,label,value,width,filled,select=false){const i=reg((filled?fieldFilled:fieldEmpty).createInstance());parent.appendChild(i);i.name=label;i.setProperties({"Label#123:0":label,"Value text#123:11":value,"Show helper#123:33":false,"select#123:55":select,"required#123:44":false,"multiline#123:66":false});i.resize(width,i.height);i.layoutSizingHorizontal="FILL";i.layoutSizingVertical="HUG";libraryInstances.push(i.id);return i;}
const built=await createComponentWithVariants({name:"Contact details/Practice rebuild",description:"Local onboarding composition. Published library controls remain attached. Content states are visual only; resize to check 640 and 400 px. Not a published library asset.",variantAxes:{Content:["Empty","Filled"]},baseProps:{width:640,height:1,layoutMode:"VERTICAL"},page});
const set=reg(built.componentSet);set.x=2200;set.y=80;set.fills=[];set.strokes=[];
for(const comp of built.variants){reg(comp);comp.primaryAxisSizingMode="AUTO";comp.counterAxisSizingMode="FIXED";comp.primaryAxisAlignItems="MIN";comp.counterAxisAlignItems="MIN";comp.clipsContent=false;comp.fills=[paint("color/background/paper",comp)];bind(comp,"itemSpacing","space/16");for(const p of ["paddingLeft","paddingRight","paddingTop","paddingBottom"])bind(comp,p,"space/16");for(const p of ["topLeftRadius","topRightRadius","bottomLeftRadius","bottomRightRadius"])bind(comp,p,"radius/sm");await comp.setEffectStyleIdAsync(S["Elevation / 1"].id);frames.push(comp.id);
 const filled=comp.variantProperties.Content==="Filled";
 const header=frame(comp,"Header",608,"VERTICAL","space/8");header.layoutSizingHorizontal="FILL";
 await textNode(header,"Title","Edit contact details","h2",608);await textNode(header,"Description","Update how we contact this patient.","body1",608,"color/text/secondary");
 divider(comp,608);
 const form=frame(comp,"Fields and reminder",608);form.layoutSizingHorizontal="FILL";bind(form,"paddingTop","space/8");
 const names=frame(form,"Name fields",608,"HORIZONTAL");names.layoutSizingHorizontal="FILL";names.layoutWrap="WRAP";bind(names,"counterAxisSpacing","space/16");
 for(const[label,value]of [["First name","Alex"],["Last name","Morgan"]]){const i=field(names,label,filled?value:"",296,filled);i.minWidth=200;}
 field(form,"Email",filled?"alex.morgan@example.com":"",608,filled);
 field(form,"Phone",filled?"(202) 555-0148":"",608,filled);
 field(form,"Preferred contact method",filled?"Email":"",608,filled,true);
 const reminder=reg(formMaster.createInstance());form.appendChild(reminder);reminder.name="Appointment reminders";reminder.setProperties({"Label#140:0":"Send appointment reminders","Control#140:3":filled?checkOn.id:checkOff.id});libraryInstances.push(reminder.id);
 divider(comp,608);
 const actions=frame(comp,"Actions",608,"HORIZONTAL","space/8");actions.layoutSizingHorizontal="FILL";actions.primaryAxisAlignItems="MAX";actions.counterAxisAlignItems="CENTER";
 for(const[master,label]of [[cancelMaster,"Cancel"],[saveMaster,"Save changes"]]){const i=reg(master.createInstance());actions.appendChild(i);i.name=label;i.setProperties({"Label#83:165":label});libraryInstances.push(i.id);}
}
set.children.forEach((c,i)=>{c.x=40+i*680;c.y=40;});set.resize(1400,Math.max(...set.children.map(c=>c.height))+80);
const review=frame(page,"First run · Contact details · Review",1360);review.x=80;review.y=80;for(const p of ["paddingLeft","paddingRight","paddingTop","paddingBottom"])bind(review,p,"space/24");bind(review,"itemSpacing","space/24");review.fills=[paint("color/background/paper",review)];
await textNode(review,"Review title","Contact details · Image rebuild test","h2",1312);
await textNode(review,"Review explanation","Editable Empty and Filled states • Library instances, tokens and auto layout • Static visual exercise","body1",1312,"color/text/secondary");
const outputs=[];
for(const width of [640,400]){const row=frame(review,width+" px comparison",1312,"HORIZONTAL","space/24");row.layoutSizingHorizontal="FILL";for(const state of ["Empty","Filled"]){const cell=frame(row,state+" · "+width+" px",width,"VERTICAL","space/16");await textNode(cell,"State label",state+" · "+width+" px","body2",width,"color/text/secondary");const master=set.children.find(n=>n.type==="COMPONENT"&&n.variantProperties.Content===state);const i=reg(master.createInstance());cell.appendChild(i);i.name=state+" · "+width+" px";i.resize(width,i.height);i.layoutSizingVertical="HUG";outputs.push({id:i.id,state,width});}}
await textNode(review,"Scope note","Save and Cancel show intended actions only. No submission, persistence or interactive dropdown is implemented.","body2",1312,"color/text/secondary");
const reference=frame(page,"Original · Practice image · Reference",688);reference.x=-800;reference.y=80;for(const p of ["paddingLeft","paddingRight","paddingTop","paddingBottom"])bind(reference,p,"space/24");reference.fills=[paint("color/background/paper",reference)];await textNode(reference,"Reference title","Original · Practice image","h2",640);const img=reg(figma.createRectangle());reference.appendChild(img);img.name="Original starter PNG · unchanged";img.resize(640,640);img.fills=[];await textNode(reference,"Reference note","Fictional input image. Its pixels are preserved; the editable rebuild is shown to the right.","body2",640,"color/text/secondary");
page.name="First rebuild";
return {createdNodeIds:created,mutatedNodeIds:[page.id],reviewId:review.id,referenceId:reference.id,imageId:img.id,componentSetId:set.id,masters:set.children.map(n=>({id:n.id,name:n.name,width:n.width,height:n.height})),outputs,libraryInstances,ownText,frames,fonts:[...fonts.values()],variables:Object.entries(V).map(([name,v])=>({name,id:v.id,key:v.key,value:v.resolveForConsumer(review).value,scopes:v.scopes})),styles:Object.entries(S).map(([name,s])=>({name,id:s.id,key:s.key,type:s.type})),reviewBounds:{width:review.width,height:review.height}};
