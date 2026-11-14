figma.skipInvisibleInstanceChildren=false;
const masters=await Promise.all(['34:1260','34:1324'].map(id=>figma.getNodeByIdAsync(id)));
const keySet=new Set(masters.map(n=>n.id));
const affected=figma.currentPage.findAllWithCriteria({types:['INSTANCE']}).filter(n=>keySet.has(n.mainComponent?.id));
const gap=await figma.variables.getVariableByIdAsync('VariableID:183d5d946d268e8bd37735b8b0dc95111c46eddd/997:15');
const note=await figma.getNodeByIdAsync('34:1806');
const fonts=new Map();for(const m of [...masters,note]){const text=m.type==='TEXT'?[m]:m.findAllWithCriteria({types:['TEXT']});for(const t of text)for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);}
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
function visible(n,r){for(let p=n;p&&p!==r;p=p.parent)if(!p.visible)return false;return true;}
function state(n){const d=n.findOne(t=>t.name==='Toggle details'),o=n.findOne(t=>t.name==='Medication actions');return{id:n.id,height:n.height,text:n.findAllWithCriteria({types:['TEXT']}).filter(t=>visible(t,n)).map(t=>t.characters),gap:o.absoluteTransform[0][2]-d.absoluteTransform[0][2]-d.width,kebab:{width:o.width,height:o.height,master:o.mainComponent.key},reactions:d.reactions};}
const before=affected.map(state),mutated=[];
for(const master of masters){const summary=master.children.find(n=>n.name==='Summary');const actions=summary.children.find(n=>n.name==='Actions'),overflow=summary.children.find(n=>n.name==='Overflow');const kebab=overflow.children[0];actions.appendChild(kebab);actions.resize(288,actions.height);actions.primaryAxisSizingMode='FIXED';actions.counterAxisAlignItems='CENTER';actions.setBoundVariable('itemSpacing',gap);overflow.visible=false;overflow.name='Superseded overflow column · Empty and hidden';mutated.push(actions.id,kebab.id,overflow.id);
 for(const name of ['Selection','Reviewed','Actions']){const cell=summary.children.find(n=>n.name===name);if(name==='Selection')cell.setBoundVariable('paddingBottom',gap);cell.layoutSizingVertical='FILL';if(cell.layoutMode==='VERTICAL')cell.primaryAxisAlignItems='CENTER';else cell.counterAxisAlignItems='CENTER';mutated.push(cell.id);}
}
const set=await figma.getNodeByIdAsync('34:1388');set.description+=' Spacing correction 2026-11-14: overflow is grouped after Details with an 8 px bound gap. Empty former overflow frames are retained hidden. Review/action cells vertically fill the summary and center their controls.';mutated.push(set.id);
note.characters+=' Spacing: primary action, Details and overflow form one group with 8 px gaps; review and action controls are vertically centered.';mutated.push(note.id);
const after=affected.map(state);
return{createdNodeIds:[],mutatedNodeIds:[...new Set(mutated)],affectedIds:affected.map(n=>n.id),before,after,checks:after.map((a,i)=>({id:a.id,gap:a.gap,textUnchanged:JSON.stringify(a.text)===JSON.stringify(before[i].text),heightUnchanged:a.height===before[i].height,kebabUnchanged:JSON.stringify(a.kebab)===JSON.stringify(before[i].kebab),reactionsUnchanged:JSON.stringify(a.reactions)===JSON.stringify(before[i].reactions)}))};
