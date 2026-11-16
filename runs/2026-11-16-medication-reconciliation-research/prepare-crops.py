from pathlib import Path
from PIL import Image,ImageDraw
import json
root=Path(__file__).parent
a=root/'assets'
specs=[
 ('epic-cornell-hires','epic-ambulatory-ui',(.11,.69,.90,.805)),
 ('epic-telepsychiatry-page','epic-psychiatry-ui',(.055,.30,.965,.69)),
 ('athena-review-hires','athena-reviewed-ui',(.32,.267,.586,.52)),
 ('athena-review-hires','athena-reason-ui',(.32,.545,.50,.646)),
 ('athena-review-hires','athena-status-ui',(.32,.67,.667,.811)),
 ('athena-reconcile-detail-page','athena-comparison-ui',(.16,.13,.835,.36)),
 ('original-completed','original-completed-detail',(.13,.20,.99,.433)),
 ('original-reopened','original-reopened-detail',(.13,.19,.99,.464)),
]
manifest=[]
for src,dst,box in specs:
 im=Image.open(a/(src+'.png'))
 rect=tuple(round(v*(im.width if i%2==0 else im.height)) for i,v in enumerate(box))
 crop=im.crop(rect);crop.save(a/(dst+'.png'))
 manifest.append({'source':src+'.png','output':dst+'.png','cropPx':rect,'width':crop.width,'height':crop.height})
(root/'crops.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
files=[a/(m['output']) for m in manifest]+[a/'simplepractice-manage.png',a/'therapynotes-list.png']
sheet=Image.new('RGB',(1600,1600),'#dddddd');d=ImageDraw.Draw(sheet)
for i,p in enumerate(files):
 im=Image.open(p);im.thumbnail((770,350));x=i%2*800;y=i//2*400;sheet.paste(im,(x,y+32));d.text((x+8,y+8),p.name,fill='black')
sheet.save(root/'crop-contact-sheet.png')
print(json.dumps(manifest,indent=2))
