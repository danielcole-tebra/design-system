const fs=require('fs');
const d='figma-export/npve-flowsheets-measure-row-2026-09-11/';
const read=f=>JSON.parse(fs.readFileSync(d+f,'utf8'));
const target=read('target.json'),source=read('fresh-source.json');
const identity=n=>Object.fromEntries(Object.entries({...n,definitions:n.definitions||n.componentPropertyDefinitions}).filter(([k,v])=>['id','name','type','parentId','width','height','key','definitions'].includes(k)&&v!==undefined));
const parent=read('basic-verify.json').section,row=identity(target.components.find(n=>n.id==='18:103'));
function plan(id,operation,nodes){return{itemId:'npve-flowsheets-measure-row',id,fileKey:target.fileKey,milestone:'Comparisons',requiresVisual:['Basic row','With trend row'],appearanceEvidence:d+'appearance.md',fonts:['Regular','Bold'].map(style=>({family:'Akkurat LL',style})),reads:[{fileKey:source.fileKey,pages:source.pages,nodes:source.rows.map(identity)},{fileKey:target.fileKey,pages:target.pages,nodes}],operation};}
for(const state of ['Basic','With trend']){
 const slug=state==='Basic'?'basic':'trend';
 const rows=[['Icons','Source → live substitutes','Temporary, approved'],['Score',state==='Basic'?'Orange → First Aid':'Orange → Neuron','Token-bound example'],['Row','Source 548 → content 518px','40px buttons in 42px areas']].map(([a,b,c])=>({'What#18:0':a,'From to#18:1':b,'Why#18:2':c}));
 const op={kind:'helpers',parent:parent.id,row:row.id,rows,referenceName:'_Rebuild comparison/Reference/Flowsheets row '+state,changeName:'_Rebuild comparison/Change log/Flowsheets row '+state,imageName:'Frozen source / Flowsheets '+state,width:548,height:64,logWidth:480,x:1200,y:slug==='basic'?64:400,logX:1800,paper:{key:'f1e85cc976b10ea275c03f5d7f21a0dc12cdfee0',name:'color/background/paper',valuesByMode:{'74:0':{r:1,g:1,b:1,a:1}}},spacing:{key:'6016592c19254dd61e9de9e006459546eaece0bb',name:'space/16'}};
 fs.writeFileSync(d+'plan-helpers-'+slug+'.json',JSON.stringify(plan('helpers-'+slug,op,[parent,row]),null,2)+'\n');
}
module.exports={d,read,identity,plan};
