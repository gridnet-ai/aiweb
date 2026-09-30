from PIL import Image
import os

src = r"C:\Users\later\.cursor\projects\c-aiweb\assets\c__Users_later_AppData_Roaming_Cursor_User_workspaceStorage_d6730a6a5ca44b915582237290c62353_images_IMG_9510-ad9e9592-d40b-4c20-9933-f324e74ad746.png"
out = r"c:\aiweb\public\images\promo\aiweb-phonebook-network.png"
preview = r"c:\aiweb\public\images\promo\aiweb-phonebook-network-preview.png"

img = Image.open(src).convert("RGBA")
w, h = img.size
px = img.load()

BG = (12, 16, 19)


def dist_bg(r, g, b):
    return max(abs(r - BG[0]), abs(g - BG[1]), abs(b - BG[2]))


def is_bg(r, g, b):
    return dist_bg(r, g, b) <= 16 and max(r, g, b) - min(r, g, b) <= 12 and not (
        r > g + 18 and r > b + 18
    )


# Content mask from non-field pixels (photos, white borders, orange lines)
mask = bytearray(w * h)  # 255 content, 0 field-like
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if not is_bg(r, g, b):
            mask[y * w + x] = 255

# Fill holes inside content (dark clothing) — exterior field stays 0
exterior = bytearray(w * h)
stack = []
for x in range(w):
    stack += [(x, 0), (x, h - 1)]
for y in range(h):
    stack += [(0, y), (w - 1, y)]
while stack:
    x, y = stack.pop()
    if not (0 <= x < w and 0 <= y < h):
        continue
    i = y * w + x
    if exterior[i] or mask[i]:
        continue
    exterior[i] = 1
    for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        stack.append((x + dx, y + dy))

# Holes = field-like pixels not reachable from image edge → protect as content
holes = 0
for i in range(w * h):
    if mask[i] == 0 and not exterior[i]:
        mask[i] = 255
        holes += 1

# Clear only exterior field
cleared = 0
for y in range(h):
    for x in range(w):
        i = y * w + x
        if mask[i]:
            continue
        r, g, b, a = px[x, y]
        px[x, y] = (r, g, b, 0)
        cleared += 1

img.save(out, "PNG", optimize=True)
print(f"holes_filled={holes} cleared={cleared} bytes={os.path.getsize(out)}")
bg = Image.new("RGBA", img.size, (200, 240, 220, 255))
Image.alpha_composite(bg, img).convert("RGB").save(preview)
print("preview ok")
