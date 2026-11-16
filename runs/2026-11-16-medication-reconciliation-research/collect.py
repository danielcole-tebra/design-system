from pathlib import Path
from urllib.request import Request, urlopen
from concurrent.futures import ThreadPoolExecutor
import json, subprocess, re
from html import unescape

ROOT=Path(__file__).parent
ASSETS=ROOT/'assets'
ASSETS.mkdir(exist_ok=True)
sources={
 'epic-cornell': 'https://practiceops.weillcornell.org/sites/default/files/weill_cornell_medicine_ecomp_manual_10-17.pdf',
 'epic-telepsychiatry': 'https://it.houstonmethodist.org/wp-content/uploads/2022/08/Telepsychiatry-Admission-Workflow-%E2%80%93-Telepsych-Providers_082222.pdf',
 'athena-review': 'https://www.dacconline.com/ebn/EBNMG/forms/MIPS/2020%20eCQM%20CMS68v9%20Documentation%20of%20current%20meds.pdf',
 'athena-reconcile': 'https://www.dacconline.com/ebn/EBNMG/forms/MIPS/Measure%20Satisfatction%20Guide_Med%20Rec.pdf',
 'simplepractice': 'https://support.simplepractice.com/hc/en-us/articles/42065448433037-Managing-client-prescriptions',
 'therapynotes': 'https://support.therapynotes.com/hc/en-us/articles/30661264631323-Complete-a-Psychiatry-Progress-Note',
 'therapynotes-erx': 'https://support.therapynotes.com/hc/en-us/articles/37246977484187-New-Overview-of-the-Patient-eRx-Tab',
}
def fetch(url):
 with urlopen(Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=50) as r: return r.read()
def get(item):
 name,url=item
 try:
  raw=fetch(url)
  ext='.pdf' if raw.startswith(b'%PDF') else '.html'
  path=ASSETS/(name+ext);path.write_bytes(raw)
  out={'name':name,'url':url,'file':path.name,'bytes':len(raw)}
  if ext=='.html':
   html=raw.decode('utf-8')
   imgs=[]
   for tag in re.findall(r'<img\b[^>]*>',html):
    attrs=dict(re.findall(r'([\w-]+)=["\']([^"\']*)["\']',tag))
    src=unescape(attrs.get('src',''))
    if 'article_attachments' in src:
     if src.startswith('/'): src='https://'+url.split('/')[2]+src
     imgs.append({'alt':unescape(attrs.get('alt','')),'url':src})
   out['images']=imgs
  return out
 except Exception as e:return {'name':name,'error':str(e)}
results=list(ThreadPoolExecutor(7).map(get,sources.items()))
(ROOT/'source-downloads.json').write_text(json.dumps(results,indent=2),encoding='utf-8')
print(json.dumps(results,indent=2))
