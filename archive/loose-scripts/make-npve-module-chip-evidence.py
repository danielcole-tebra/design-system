from pathlib import Path
from PIL import Image, ImageChops, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
OUT = ROOT / "figma-export" / "npve-module-chip-fix-2026-09-06"


def on_white(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    canvas = Image.new("RGBA", rgba.size, "white")
    canvas.alpha_composite(rgba)
    return canvas.convert("RGB")


source = Image.open(OUT / "source-module-strip-4841-17097-1x.png")
rebuild = Image.open(OUT / "rebuild-module-strip-426-4214-1x.png")
placed = Image.open(OUT / "placed-module-strip-from-comparison-1x.png")

# Both files are direct 1x exports. Composite their transparent pixels on the
# same white background before comparing anti-aliased edge pixels.
expected = on_white(rebuild)
placed_rgb = on_white(placed)
placed_rgb.save(OUT / "placed-module-strip-from-comparison-1x-white.png")
diff = ImageChops.difference(expected, placed_rgb)
diff.save(OUT / "pixel-diff-master-vs-placed-strip-1x.png")
pixels = diff.get_flattened_data()
different_pixels = sum(1 for px in pixels if px != (0, 0, 0))
max_delta = max(channel for px in pixels for channel in px)

# Reference/rebuild evidence on the repo-standard #E4E4E4 review background.
font = ImageFont.truetype("arial.ttf", 20)
pad = 24
label_h = 32
row_gap = 32
panel_w = max(source.width, rebuild.width)
canvas = Image.new("RGB", (panel_w + pad * 2, (label_h + 40) * 2 + row_gap + pad * 2), "#E4E4E4")
draw = ImageDraw.Draw(canvas)
draw.text((pad, pad), "Reference — source 4841:17097", fill="#545454", font=font)
canvas.paste(on_white(source), (pad, pad + label_h))
second_y = pad + label_h + 40 + row_gap
draw.text((pad, second_y), "Rebuild — target 426:4214", fill="#545454", font=font)
canvas.paste(on_white(rebuild), (pad, second_y + label_h))
canvas.save(OUT / "comparison-module-strip-reference-vs-rebuild.png")

print(f"master_vs_placed_different_pixels={different_pixels}")
print(f"master_vs_placed_max_channel_delta={max_delta}")
