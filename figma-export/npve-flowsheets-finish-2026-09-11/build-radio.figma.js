figma.skipInvisibleInstanceChildren=false;
if(figma.fileKey!=='fdCQVFdvOByaOYIJYag0d6')throw Error('Wrong target');
const page=await figma.getNodeByIdAsync('3:2');await figma.setCurrentPageAsync(page);
for(const style of ['Regular','Bold'])await figma.loadFontAsync({family:'Akkurat LL',style});
const label=await figma.importComponentByKeyAsync('9821b1c515db0ecc146dd21d2bcca3961aef1424');
const off=await figma.importComponentByKeyAsync('369b8196265a8e45d9ca5a857adf0f7990fb8a47');
const on=await figma.importComponentByKeyAsync('2435aadf855caef28ac82dbc1168dbdcc8e8ba64');
if(label.name!=='State=Default'||off.width!==42||on.width!==42)throw Error('Control drift');
const color=await figma.variables.importVariableByKeyAsync('5c8867e0b6f174db9f69096580158df26e39baae');
const paper=await figma.variables.importVariableByKeyAsync('f1e85cc976b10ea275c03f5d7f21a0dc12cdfee0');
const space=await figma.variables.importVariableByKeyAsync('183d5d946d268e8bd37735b8b0dc95111c46eddd');
const heading=await figma.importStyleByKeyAsync('888b271ed38cdcfb86c35f9de8bff5ac9b81e8e3');
const body=await figma.importStyleByKeyAsync('cdb9fe68e6b5274b6e42be16d13bb3fb7834dccb');
function paint(v){return figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',v);}
const section=figma.createSection();page.appendChild(section);section.name='29 · Flowsheets forms without graphs';section.x=0;section.y=62000;section.resizeWithoutConstraints(6000,11000);section.fills=[paint(paper)];section.strokes=[];
async function text(parent,name,value,width,style){const t=figma.createText();parent.appendChild(t);t.name=name;await t.setTextStyleIdAsync(style.id);t.characters=value;t.resize(width,24);t.textAutoResize='HEIGHT';t.fills=[paint(color)];return t;}
const variants=[],prompts=[];
for(const [index,state]of ['Unanswered','Several days'].entries()){
const c=figma.createComponent();section.appendChild(c);c.name='State='+state;c.layoutMode='VERTICAL';c.primaryAxisSizingMode='AUTO';c.counterAxisSizingMode='FIXED';c.resize(518,200);c.itemSpacing=8;c.setBoundVariable('itemSpacing',space);c.fills=[];c.clipsContent=false;c.x=32+index*550;c.y=64;
const t=await text(c,'Question','1. Little interest or pleasure in doing things?',518,heading);prompts.push(t);
const choices=figma.createFrame();c.appendChild(choices);choices.name='Answers';choices.layoutMode='VERTICAL';choices.primaryAxisSizingMode='AUTO';choices.counterAxisSizingMode='FIXED';choices.resize(518,168);choices.fills=[];
for(const [j,s] of ['Not at all','Several days','More than half the days','Nearly every day'].entries()){
const row=figma.createFrame();choices.appendChild(row);row.name=s;row.layoutMode='HORIZONTAL';row.primaryAxisSizingMode='FIXED';row.counterAxisSizingMode='FIXED';row.resize(518,42);row.counterAxisAlignItems='CENTER';row.itemSpacing=8;row.setBoundVariable('itemSpacing',space);row.fills=[];
const ctl=label.createInstance();row.appendChild(ctl);ctl.name='Radio answer';ctl.setProperties({'Label#140:0':s,'Control#140:3':index===1&&j===1?on.id:off.id});ctl.primaryAxisSizingMode='FIXED';ctl.resize(478,42);
const score=await text(row,'Score',['0','+1','+2','+3'][j],32,body);score.textAlignHorizontal='RIGHT';
}variants.push(c);}
const set=figma.combineAsVariants(variants,section);set.name='Flowsheets/Question';set.x=32;set.y=64;set.fills=[];set.strokes=[];const prop=set.addComponentProperty('Question','TEXT','1. Little interest or pleasure in doing things?');for(const t of prompts)t.componentPropertyReferences={characters:prop};
const proof=figma.createFrame();section.appendChild(proof);proof.name='PROOF · Flowsheets radio states';proof.layoutMode='VERTICAL';proof.resize(550,450);proof.primaryAxisSizingMode='AUTO';proof.counterAxisSizingMode='FIXED';proof.paddingTop=16;proof.paddingBottom=16;proof.paddingLeft=16;proof.paddingRight=16;proof.itemSpacing=24;proof.fills=[paint(paper)];proof.x=1200;proof.y=64;
const instances=variants.map(c=>{const x=c.createInstance();proof.appendChild(x);return {id:x.id,master:c.id};});
return {section:section.id,set:set.id,property:prop,variants:variants.map(c=>({id:c.id,name:c.name,key:c.key,width:c.width,height:c.height,componentPropertyDefinitions:set.componentPropertyDefinitions})),proof:proof.id,instances};
