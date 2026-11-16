figma.skipInvisibleInstanceChildren=false;await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('0:1'));
if(figma.root.children.some(p=>p.name==='archives'))throw new Error('Archive page exists; inspect before retry');
const source=figma.currentPage,roots=[...source.children],fonts=new Map();for(const r of roots)for(const t of r.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const archive=figma.createPage();archive.name='archives';const created=[archive.id],moved=[];
const groups=[
{name:'Earlier screens and studies',ids:['2:1811','28:882','34:1391','47:1675'],x:160,y:160},
{name:'Local components · Retained dependencies',ids:['2:1810','9:784','28:837','34:1388','47:1540'],x:3600,y:160},
{name:'Superseded components and layouts',ids:['9:852','60:2301','63:2373','68:2509','68:2606'],x:3600,y:2300},
{name:'Inspections and provenance notes',ids:['2:2808','4:869','34:1807','47:1689'],x:160,y:3900}
];
for(const g of groups){const sec=figma.createSection();archive.appendChild(sec);sec.name=g.name;sec.x=g.x;sec.y=g.y;created.push(sec.id);let y=80,rowH=0;for(let i=0;i<g.ids.length;i++){const n=await figma.getNodeByIdAsync(g.ids[i]);sec.appendChild(n);if(i%2===0&&i>0){y+=rowH+120;rowH=0;}n.x=64+(i%2)*1630;n.y=y;rowH=Math.max(rowH,n.height);moved.push(n.id);}sec.resizeWithoutConstraints(3260,y+rowH+64);}
source.name='Medlist · Latest non-drawer';return{archiveId:archive.id,createdNodeIds:created,mutatedNodeIds:[source.id,...moved],movedNodeIds:moved,sections:archive.children.map(s=>({id:s.id,name:s.name,x:s.x,y:s.y,w:s.width,h:s.height,children:s.children.map(n=>n.id)}))};
