# -*- coding: utf-8 -*-
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[1] / "public"
W, H = 1200, 630

deep = (61, 46, 26)
bronze = (138, 107, 31)
gold = (201, 168, 76)
cream = (255, 250, 240)
ivory = (247, 240, 228)

canvas = Image.new("RGB", (W, H), cream)
draw = ImageDraw.Draw(canvas)

for y in range(H):
    t = y / H
    r = int(cream[0] * (1 - t) + ivory[0] * t)
    g = int(cream[1] * (1 - t) + ivory[1] * t)
    b = int(cream[2] * (1 - t) + ivory[2] * t)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

draw.rectangle([0, 0, 14, H], fill=gold)
draw.rectangle([14, 0, 18, H], fill=bronze)

prod = Image.open(
    root / "products/putharekulu/bellam_dry_fruits_putharekhulu.png"
).convert("RGBA")
side = 480
prod = prod.resize((side, side), Image.Resampling.LANCZOS)
mask = Image.new("L", (side, side), 0)
ImageDraw.Draw(mask).ellipse([0, 0, side - 1, side - 1], fill=255)

plate = Image.new("RGBA", (side + 28, side + 28), (0, 0, 0, 0))
pd = ImageDraw.Draw(plate)
pd.ellipse([0, 0, side + 27, side + 27], fill=(*gold, 255))
pd.ellipse([8, 8, side + 19, side + 19], fill=(*cream, 255))
plate.paste(prod, (14, 14), mask)

px, py = W - side - 70, (H - side - 28) // 2
shadow = Image.new("RGBA", (side + 48, side + 48), (0, 0, 0, 0))
ImageDraw.Draw(shadow).ellipse([10, 18, side + 37, side + 45], fill=(61, 46, 26, 40))
canvas.paste(shadow, (px - 10, py - 2), shadow)
canvas.paste(plate, (px, py), plate)

logo = Image.open(root / "logo.png").convert("RGBA")
logo = logo.resize((110, 110), Image.Resampling.LANCZOS)
canvas.paste(logo, (56, 48), logo)


def load_font(size: int, bold: bool = False):
    names = (
        ["georgiab.ttf", "timesbd.ttf", "segoeuib.ttf"]
        if bold
        else ["georgia.ttf", "times.ttf", "segoeui.ttf"]
    )
    for name in names:
        path = Path(r"C:\Windows\Fonts") / name
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


title_f = load_font(58, bold=True)
sub_f = load_font(28)
tag_f = load_font(22)
small_f = load_font(20)

x, y = 56, 190
draw.text((x, y), "Swamy Putharekulu", font=title_f, fill=deep)
y += 78
draw.text((x, y), "Atreyapuram's Golden Leaf", font=sub_f, fill=bronze)
y += 40
draw.text((x, y), "Pootharekulu", font=sub_f, fill=bronze)
y += 56
draw.rectangle([x, y, x + 220, y + 3], fill=gold)
y += 28
draw.text((x, y), "15 varieties  ·  From Rs.20/piece", font=tag_f, fill=deep)
y += 36
draw.text((x, y), "Pure ghee  ·  Live hygienic prep", font=tag_f, fill=deep)
y += 36
draw.text((x, y), "Serving Andhra Pradesh and Telangana", font=small_f, fill=(92, 69, 40))

draw.rectangle([0, H - 54, W, H], fill=deep)
draw.text((56, H - 38), "swamyputharekulu.com", font=small_f, fill=cream)
draw.text((W - 320, H - 38), "+91 91771 65469", font=small_f, fill=gold)

out = root / "og-share.png"
canvas.convert("RGB").save(out, "PNG", optimize=True)
print("wrote", out, out.stat().st_size)
