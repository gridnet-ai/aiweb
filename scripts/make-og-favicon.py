from PIL import Image

WORDMARK = r"c:\aiweb\public\icons\aiweb-wordmark-white.png"
CLOUD = r"c:\aiweb\public\icons\aiweb-cloud.png"
OG_OUT = r"c:\aiweb\public\og-image.png"
FAV_OUT = r"c:\aiweb\public\icons\favicon-cloud.png"

og_w, og_h = 1200, 630
og = Image.new("RGB", (og_w, og_h), (0, 0, 0))
mark = Image.open(WORDMARK).convert("RGBA")
target_w = int(og_w * 0.62)
ratio = target_w / mark.width
target_h = max(1, int(mark.height * ratio))
mark = mark.resize((target_w, target_h), Image.Resampling.LANCZOS)
og.paste(mark, ((og_w - target_w) // 2, (og_h - target_h) // 2), mark)
og.save(OG_OUT, "PNG")
print("og", og.size)

cloud = Image.open(CLOUD).convert("RGBA")
w, h = cloud.size
px = cloud.load()
print("cloud", cloud.size, "corner", px[0, 0], "mid", px[w // 2, h // 2])
for yy in range(h):
    for xx in range(w):
        r, g, b, a = px[xx, yy]
        lum = (r + g + b) / 3.0
        if a < 16:
            continue
        if lum < 50:
            px[xx, yy] = (255, 255, 255, 255)
        elif lum > 210:
            px[xx, yy] = (0, 0, 0, 0)

size = 512
fav = Image.new("RGBA", (size, size), (0, 0, 0, 255))
pad = int(size * 0.16)
cw = size - pad * 2
ch = max(1, int(cloud.height * (cw / cloud.width)))
cloud_r = cloud.resize((cw, ch), Image.Resampling.LANCZOS)
fav.paste(cloud_r, ((size - cw) // 2, (size - ch) // 2), cloud_r)
fav.save(FAV_OUT, "PNG")
print("fav", fav.size)
