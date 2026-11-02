import json, urllib.request, urllib.parse
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).parent
PAGES = {
 'clone': 'https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop',
 'projects': 'https://learn.chatgpt.com/docs/projects',
 'plugin': 'https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/',
 'file': 'https://help.figma.com/hc/en-us/articles/30926129986199-FD4B-Create-your-first-design-file',
 'library': 'https://help.figma.com/hc/en-us/articles/1500008731201-Add-or-remove-a-library-from-a-design-file',
}
class Images(HTMLParser):
 def __init__(self): super().__init__(); self.items=[]
 def handle_starttag(self,tag,attrs):
  if tag=='img':
   a=dict(attrs)
   if a.get('src'): self.items.append({k:a[k] for k in ['src','alt'] if k in a})

allitems={}
for key,url in PAGES.items():
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
  content=urllib.request.urlopen(req).read().decode()
  parser=Images(); parser.feed(content)
  items=[dict(i,src=urllib.parse.urljoin(url,i['src'])) for i in parser.items if not any(s in i['src'].lower() for s in ['logo','avatar','icon'])]
  allitems[key]={'page':url,'images':items}
  print(key,json.dumps(items,ensure_ascii=False))
 except Exception as e: print(key,type(e).__name__,str(e))
(ROOT/'image-candidates.json').write_text(json.dumps(allitems,indent=2),encoding='utf-8')
