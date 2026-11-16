from pathlib import Path
from urllib.request import Request,urlopen
from concurrent.futures import ThreadPoolExecutor
from PIL import Image
import json
root=Path(__file__).parent
jobs=json.loads(Path('C:/Users/coled/AppData/Local/Temp/medrec-upload.json').read_text())
def upload(job):
 name,token=job
 path=root/'assets'/(name+'.png')
 url='https://mcp.figma.com/mcp/upload/'+token+'/submit?scaleMode=FILL&currentPageId=4%3A2'
 try:
  with urlopen(Request(url,data=path.read_bytes(),method='POST',headers={'Content-Type':'image/png'}),timeout=90) as r:response=json.loads(r.read())
  im=Image.open(path)
  return {'name':name,'width':im.width,'height':im.height,'response':response}
 except Exception as e:return {'name':name,'error':str(e)}
result=list(ThreadPoolExecutor(4).map(upload,jobs))
(root/'uploads.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps(result,indent=2))
