from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
OUT = ROOT / "figma-export" / "npve-module-chip-relationship-spacing-2026-09-06"


def on_white(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    canvas = Image.new("RGBA", rgba.size, "white")
    canvas.alpha_composite(rgba)
    return canvas.convert("RGB")


source = Image.open(OUT / "source-module-strip-4841-17097-1x.png")
rebuild = Image.open(OUT / "rebuild-module-strip-426-4214-1x.png")
placed = Image.open(OUT / "placed-module-strip-from-comparison-1x.png")

expected = on_white(rebuild)
placed_rgb = on_white(placed)
placed_rgb.save(OUT / "placed-module-strip-from-comparison-1x-white.png")

diff = ImageChops.difference(expected, placed_rgb)
diff.save(OUT / "pixel-diff-master-vs-placed-strip-1x.png")
pixels = diff.get_flattened_data()
different_pixels = sum(1 for px in pixels if px != (0, 0, 0))
max_delta = max(channel for px in pixels for channel in px)

font = ImageFont.truetype("arial.ttf", 20)
pad = 24
label_h = 32
row_gap = 32

# Full-strip evidence on the repo-standard review background.
panel_w = max(source.width, rebuild.width)
canvas = Image.new(
    "RGB",
    (panel_w + pad * 2, (label_h + 40) * 2 + row_gap + pad * 2),
    "#E4E4E4",
)
draw = ImageDraw.Draw(canvas)
draw.text((pad, pad), "Reference — source 4841:17097", fill="#545454", font=font)
canvas.paste(on_white(source), (pad, pad + label_h))
second_y = pad + label_h + 40 + row_gap
draw.text((pad, second_y), "Rebuild — target 426:4214", fill="#545454", font=font)
canvas.paste(on_white(rebuild), (pad, second_y + label_h))
canvas.save(OUT / "comparison-module-strip-reference-vs-rebuild.png")

# Enlarged first-chip crop makes the 8px identity gap / 16px action gap legible.
crop_width = min(440, source.width, rebuild.width)
scale = 2
source_crop = on_white(source).crop((0, 0, crop_width, 40)).resize(
    (crop_width * scale, 80), Image.Resampling.NEAREST
)
rebuild_crop = on_white(rebuild).crop((0, 0, crop_width, 40)).resize(
    (crop_width * scale, 80), Image.Resampling.NEAREST
)
detail = Image.new(
    "RGB",
    (crop_width * scale + pad * 2, (label_h + 80) * 2 + row_gap + pad * 2),
    "#E4E4E4",
)
detail_draw = ImageDraw.Draw(detail)
detail_draw.text((pad, pad), "Reference — source 4841:17097", fill="#545454", font=font)
detail.paste(source_crop, (pad, pad + label_h))
detail_second_y = pad + label_h + 80 + row_gap
detail_draw.text(
    (pad, detail_second_y),
    "Rebuild — icon + label 8px; identity + close 16px",
    fill="#545454",
    font=font,
)
detail.paste(rebuild_crop, (pad, detail_second_y + label_h))
detail.save(OUT / "comparison-module-chip-spacing-detail.png")

print(f"master_vs_placed_different_pixels={different_pixels}")
print(f"master_vs_placed_max_channel_delta={max_delta}")
