from pathlib import Path
from urllib.request import Request,urlopen
from concurrent.futures import ThreadPoolExecutor
from PIL import Image,ImageOps,ImageDraw
import json
root=Path(__file__).parent
assets=root/'assets'
items=[
 ('simplepractice-list','https://support.simplepractice.com/hc/article_attachments/42065530588301'),
 ('simplepractice-manage','https://support.simplepractice.com/hc/article_attachments/42065530588429'),
 ('therapynotes-actions','https://support.therapynotes.com/hc/article_attachments/53825960965019'),
 ('therapynotes-attestation','https://support.therapynotes.com/hc/article_attachments/53825960967323'),
 ('therapynotes-list','https://support.therapynotes.com/hc/article_attachments/53825937056667'),
 ('therapynotes-erx-panel','https://support.therapynotes.com/hc/article_attachments/37543629024411')
]
def get(item):
 name,url=item
 try:
  with urlopen(Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=45) as r:raw=r.read()
  path=assets/(name+'.png');path.write_bytes(raw)
  im=Image.open(path);im.load()
  return {'name':name,'width':im.width,'height':im.height,'bytes':len(raw)}
 except Exception as e:return {'name':name,'error':str(e)}
result=list(ThreadPoolExecutor(7).map(get,items))
print(json.dumps(result,indent=2))
(root/'image-downloads.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
imgs=list(assets.glob('*-page.png'))
sheet=Image.new('RGB',(1400,1000),'#dddddd');d=ImageDraw.Draw(sheet)
for i,p in enumerate(imgs):
 im=Image.open(p); im.thumbnail((680,450));x=(i%2)*700;y=(i//2)*500;sheet.paste(im,(x,y+28));d.text((x+8,y+8),p.name,fill='black')
sheet.save(root/'pdf-contact-sheet.png')
