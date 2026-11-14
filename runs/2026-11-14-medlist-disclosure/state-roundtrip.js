figma.skipInvisibleInstanceChildren=false;
const pairs=[['28:932','34:1396','34:1671'],['28:1022','34:1460','34:1808'],['28:1112','34:1530','34:1878'],['28:1202','34:1600','34:1736']];
const results=[];
function vis(n,r){for(let p=n;p&&p!==r;p=p.parent)if(!p.visible)return false;return true;}
function texts(n){return n.findAllWithCriteria({types:['TEXT']}).filter(t=>vis(t,n)).map(t=>t.characters);}
for(const [sid,cid,eid]of pairs){const s=await figma.getNodeByIdAsync(sid),c=await figma.getNodeByIdAsync(cid),e=await figma.getNodeByIdAsync(eid);
 const expected=texts(s);const before=texts(c);
 c.setProperties({Disclosure:'Expanded'});const during=texts(c);
 c.setProperties({Disclosure:'Collapsed'});const after=texts(c);
 results.push({sourceId:sid,collapsedId:cid,expandedId:eid,collapsedHeight:c.height,expandedHeight:e.height,originalVisibleText:expected,collapsedText:after,expandedText:texts(e),allOriginalTextInExpanded:expected.every(t=>texts(e).includes(t)),allOriginalTextAfterInteraction:expected.every(t=>during.includes(t)),roundtripStable:JSON.stringify(before)===JSON.stringify(after),overflow:[c,e].flatMap(r=>r.findAll(n=>vis(n,r)&&'width'in n&&(n.x<-.1||n.y<-.1||n.x+n.width>n.parent.width+.1||n.y+n.height>n.parent.height+.1)).map(n=>({id:n.id,name:n.name,width:n.width,parentWidth:n.parent.width})))});
}
const board=await figma.getNodeByIdAsync('34:1391');const all=board.findAll(()=>true);
return{mutatedNodeIds:pairs.map(p=>p[1]),results,counts:all.reduce((a,n)=>(a[n.type]=(a[n.type]||0)+1,a),{}),images:all.filter(n=>Array.isArray(n.fills)&&n.fills.some(p=>p.type==='IMAGE')).map(n=>n.id),wiring:await Promise.all(['34:1260','34:1324'].map(async id=>{const m=await figma.getNodeByIdAsync(id);const n=m.findOne(n=>n.name==='Toggle details');return{variantId:id,controlId:n.id,reactions:n.reactions}}))};
