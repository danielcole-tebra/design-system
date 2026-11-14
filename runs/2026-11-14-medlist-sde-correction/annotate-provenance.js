figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('0:1'));
await Promise.all([{family:'Akkurat LL',style:'Regular'},{family:'Akkurat LL',style:'Bold'}].map(f=>figma.loadFontAsync(f)));
const changed=[];
const panel=await figma.getNodeByIdAsync('2:1810');panel.name='First-batch local components · Compositions unapproved';changed.push(panel.id);
const old=await figma.getNodeByIdAsync('2:1868');old.name='SUPERSEDED/Medlist patient context · Do not reuse';old.description='Invented during first medlist rebuild; rejected by Daniel on 2026-11-14. Preserved as evidence only. Replaced by the verified SDE 11/13 mirror.';changed.push(old.id);
for(const id of ['2:2028','2:2203','2:2272','2:2273']){const n=await figma.getNodeByIdAsync(id);n.description='UNAPPROVED COMPOSITION — authored in the first medlist rebuild. Library primitives are verified; the assembly is not an approved source pattern. Daniel requested header replacement and documentation of remaining differences on 2026-11-14. See runs/2026-11-14-medlist-sde-correction/SPEC.md.';changed.push(n.id);}
const readme=await figma.getNodeByIdAsync('2:2808');readme.name='README · Provenance audit · Remaining differences unapproved';readme.x=3400;readme.y=900;changed.push(readme.id);
const copy={
 Title:'Medlist · Source provenance and remaining differences',
 Scope:'CURRENT HEADER: faithful local mirror of the Patient header on SDE Updated 11/13, page 1319:4655, instance I1319:4659;974:16288. The source master is not cross-file importable. All 34 transferred nodes match the source comparison. Its Avatar, Link and hidden Attention icon remain native library instances. This is a local mirror, not a published header.',
 States:'PATIENT DATA: Jane Doe, Female, DOB 02/04/1990, 36 y/o, Restricted and Penicillin (severe) come from A01. Phone, MRN and balance show dashes because A01 does not explicitly provide those fields. The new header replaces the prior action row and alert display; no new placement was invented for those omitted controls.',
 Boundaries:'UNAPPROVED REMAINDER: the first rebuild changed chart-rail dimensions, page title, toolbar geometry, reconciliation layout, table columns, row density, status presentation and timeline placement. These are documented, not validated by the primitive audit. Daniel requested leaving them for review while replacing the header. Medication content and native control verification remain separate findings.',
 References:'SOURCE: SDE Alpha Prototypes / Updated 11/13 / 1319:4656. MEDLIST INPUT: eRx Concepts / A01 / 11198:3155. CURRENT REGISTER: runs/2026-11-14-medlist-sde-correction/SPEC.md. Static screen: no played-through prototype. Prior header and inspection nodes are retained as evidence only.'
};
for(const [name,value] of Object.entries(copy)){const n=readme.findOne(n=>n.type==='TEXT'&&n.name===name);n.characters=value;changed.push(n.id);}
return {mutatedNodeIds:changed};
