// Prepend the recorded audit helper. The mirror is additionally compared to the SDE
// reference across all 34 nodes in evidence.json; a local-master check alone is insufficient.
figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('0:1'));
const h=await figma.getNodeByIdAsync('9:818'),m=await figma.getNodeByIdAsync('9:784'),s=await figma.getNodeByIdAsync('2:1811');
const checks=[];function check(name,actual,expected){checks.push({name,actual,expected});}
const visible=n=>{let p=n;while(p){if(p.visible===false)return false;p=p.parent;}return true;};
check('SDE mirror width at source width',m.width,1493);check('SDE mirror source height',m.height,68);
check('Patient header at medlist width',h.width,1440);check('Patient header at source height',h.height,68);check('Header directly below Nav/Bar',h.y,65);
check('Source structure child count',h.children.length,3);check('Source padding retained',[h.paddingTop,h.paddingRight,h.paddingBottom,h.paddingLeft],[8,16,8,16]);
const name=h.findOne(n=>n.type==='TEXT'&&n.name==='Preferred name');check('Patient context preserved',name.characters,'Jane Doe');check('Exact source name typography',[name.fontName,name.fontSize,name.lineHeight,name.textDecoration],[{family:'Akkurat LL',style:'Bold'},20,{unit:'PIXELS',value:32},'UNDERLINE']);
for(const [name,value] of [['DOB','02/04/1990'],['Age','(36 y/o)'],['Phone','—'],['MRN','MRN: —'],['Severe allergens','Penicillin (severe)'],['Balance value','—']])check('Header content '+name,h.findOne(n=>n.type==='TEXT'&&n.name===name).characters,value);
check('Restriction preserved',visible(h.findOne(n=>n.name==='Restriction wrap')),true);check('No inferred pronouns',visible(h.findOne(n=>n.name==='Pronouns')),false);
check('Old patient context archived',(await figma.getNodeByIdAsync('2:1928')).parent.id,'9:852');
const rest=await figma.getNodeByIdAsync('2:1988');check('Nonheader workspace geometry unchanged',[rest.width,rest.height],[1440,1633]);
check('No new reactions',h.findAll(n=>'reactions'in n&&n.reactions.length>0).length,0);
const overflow=h.findAll(n=>visible(n)&&n.parent&&n.width>0&&(n.x < -0.1||n.y < -0.1||n.x+n.width>n.parent.width+0.1||n.y+n.height>n.parent.height+0.1));
check('No header content exceeds parent bounds',overflow.map(n=>n.name),[]);
return await auditEvidence([h],checks);
