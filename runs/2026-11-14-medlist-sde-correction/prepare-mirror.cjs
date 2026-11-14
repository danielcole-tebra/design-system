// Produce the original transfer script with compact symbolic variable IDs.
// Never rerun against an already-corrected file; mirror-header.js has a guard.
const fs=require('node:fs');
const path=require('node:path');
const source=JSON.parse(fs.readFileSync(path.join(__dirname,'header-capture.json'),'utf8'));
const ids=new Map(source.variables.map((v,i)=>[v.id,'v'+i]));
const compact=JSON.stringify(source,(_key,value)=>typeof value==='string'&&ids.has(value)?ids.get(value):value);
process.stdout.write('const SOURCE='+compact+';\n'+fs.readFileSync(path.join(__dirname,'mirror-header.js'),'utf8'));
