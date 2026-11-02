import json,urllib.request,struct
from pathlib import Path
root=Path(__file__).parent
items=[
 ('clone-reference.png','https://docs.github.com/assets/cb-41736/images/help/desktop/choose-repository-location-url-tab-windows.png','https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop','GitHub official reference; sample repository differs.'),
 ('plugin-reference.png','https://help.figma.com/hc/article_attachments/39889902107415','https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/#codex','Figma official screenshot of the Codex Figma plugin.'),
 ('file-reference.png','https://help.figma.com/hc/article_attachments/33966617587607','https://help.figma.com/hc/en-us/articles/30926129986199-FD4B-Create-your-first-design-file','Figma official new Design file screenshot.'),
 ('library-reference.png','https://help.figma.com/hc/article_attachments/27999040559767','https://help.figma.com/hc/en-us/articles/1500008731201-Add-or-remove-a-library-from-a-design-file','Figma official reference showing Habitz; select Design System Rebuild instead.'),
 ('selection-reference.gif','https://help.figma.com/hc/article_attachments/35819041902231','https://help.figma.com/hc/en-us/articles/35281350665623-Figma-MCP-collection-How-to-set-up-the-Figma-remote-MCP-server','Figma official copy-selection animation; raw source, not uploaded to the board.')
]
manifest=[]
for name,url,page,caption in items:
 data=(root/name).read_bytes() if (root/name).exists() else urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})).read()
 (root/name).write_bytes(data)
 dims=list(struct.unpack('>II',data[16:24])) if data.startswith(b'\x89PNG') else list(struct.unpack('<HH',data[6:10])) if data.startswith(b'GIF') else None
 manifest.append(dict(file=name,url=url,source=page,caption=caption,dimensions=dims,bytes=len(data)))
 print(name,len(data),dims,data[:12].hex())
manifest.append(dict(file='projects-reference.jpg',source='https://learn.chatgpt.com/docs/projects#app-work-in-a-project',caption='Browser capture of the official OpenAI project-view illustration. Not a live participant setup.',dimensions=[712,346]))
manifest.append(dict(file='selection-reference.jpg',source=items[-1][2],caption='Browser capture of one frame of the official selection-link animation. Not the pending Tebra practice card.',dimensions=[1280,720]))
manifest.append(dict(file='prompt-reference.jpg',source='https://github.com/danielcole-tebra/design-system/blob/master/GETTING-STARTED.md#6-check-the-setup-with-codex',caption='Browser screenshot of setup-prompt.html, a guide excerpt. Not a Codex response or proof of completed setup.'))
(root/'image-sources.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
