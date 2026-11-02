const fs=require('node:fs'),path=require('node:path');
const {prompts}=JSON.parse(fs.readFileSync('runs/2026-11-02-onboarding-chronology/content.json','utf8'));
const docs=['README.md','GETTING-STARTED.md','FIRST-RUN.md','SCREENSHOT-CAPTURE-LIST.md'];
const errors=[];
const setup=fs.readFileSync('GETTING-STARTED.md','utf8'),first=fs.readFileSync('FIRST-RUN.md','utf8');
for(const key of ['clone','folders','setup'])if(!setup.includes(prompts[key]))errors.push('Prompt mismatch: '+key);
if(!first.includes(prompts.rebuild))errors.push('Prompt mismatch: rebuild');
for(const doc of docs){const text=fs.readFileSync(doc,'utf8');for(const m of text.matchAll(/\]\(([^)]+)\)/g)){const link=m[1];if(/^(https?:|#)/.test(link))continue;const target=link.split('#')[0];if(target&&!fs.existsSync(path.resolve(path.dirname(doc),target)))errors.push(doc+': missing '+target);}}
const result={documents:docs,inlinePromptsMatched:4,localLinksChecked:true,errors};fs.writeFileSync('runs/2026-11-02-onboarding-chronology/doc-check.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));if(errors.length)process.exitCode=1;
