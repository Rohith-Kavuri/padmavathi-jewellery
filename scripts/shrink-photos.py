"""Make small copies of the photos the site uses (run by hand, once in a while).

Photos uploaded in the admin page are full-size phone or AI pictures, often
2-3 MB each. This makes light WebP copies of every photo the site currently
uses, in a few widths, in public/images/sized/, and lists them in
src/data/sized.json. The site then shows the copy that fits each spot
(src/data/media.js). The original uploads are not changed.

It also makes a square 800 x 800 JPEG of each product photo for the WhatsApp
preview of "Share this piece" (scripts/share-pages.js).

Photos uploaded later have no copies yet: the site shows the original for
those until this is run again. Copies of photos no longer used are removed.

    python3 scripts/shrink-photos.py        (needs Python 3 and Pillow)
"""
import glob
import hashlib
import json
import os
import re

from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")
OUT = os.path.join(PUBLIC, "images", "sized")
MANIFEST = os.path.join(ROOT, "src", "data", "sized.json")
WIDTHS = [400, 640, 960, 1280]
QUALITY = 80


def used_photos():
    found = set()
    for f in glob.glob(os.path.join(ROOT, "src", "content", "*.json")):
        found |= set(re.findall(r'/images/uploads/[^"]+?\.(?:jpe?g|png|webp)', open(f, encoding="utf-8").read(), re.I))
    products = json.load(open(os.path.join(ROOT, "src", "content", "products.json"), encoding="utf-8"))["products"]
    product_photos = {p["image"] for p in products if p.get("image")}
    return sorted(p for p in found if os.path.exists(PUBLIC + p)), product_photos


def name_for(src):
    # /images/uploads/ring.png -> ring-png (keeps ring.png and ring.jpg apart)
    base, ext = os.path.splitext(os.path.basename(src))
    return f"{base}-{ext[1:].lower()}"


def main():
    os.makedirs(OUT, exist_ok=True)
    photos, product_photos = used_photos()
    manifest, keep = {}, set()
    before = after = 0
    for src in photos:
        path = PUBLIC + src
        data = open(path, "rb").read()
        tag = hashlib.sha1(data).hexdigest()[:8]  # new copies if the photo is replaced
        im = ImageOps.exif_transpose(Image.open(path))
        alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
        im = im.convert("RGBA" if alpha else "RGB")
        widths = [w for w in WIDTHS if w < im.width * 0.92]
        if not widths or im.width > widths[-1] * 1.15:
            widths.append(im.width)  # the full size, as a light WebP
        name = f"{name_for(src)}-{tag}"
        entry = {"w": widths, "name": name}
        sizes = []
        for w in widths:
            out = os.path.join(OUT, f"{name}-{w}.webp")
            keep.add(out)
            if not os.path.exists(out):
                h = round(im.height * w / im.width)
                im.resize((w, h), Image.LANCZOS).save(out, "WEBP", quality=QUALITY, method=6)
            sizes.append(os.path.getsize(out))
        if src in product_photos:
            out = os.path.join(OUT, f"{name}-share.jpg")
            keep.add(out)
            if not os.path.exists(out):
                ImageOps.fit(im.convert("RGB"), (800, 800), Image.LANCZOS).save(out, "JPEG", quality=82, optimize=True, progressive=True)
            entry["share"] = True
        manifest[src] = entry
        before += len(data)
        after += sizes[min(2, len(sizes) - 1)]
    for f in glob.glob(os.path.join(OUT, "*")):
        if f not in keep:
            os.remove(f)
    with open(MANIFEST, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=1, sort_keys=True)
        f.write("\n")
    print(f"{len(manifest)} photos: originals {before / 1e6:.1f} MB, medium copies {after / 1e6:.1f} MB")


if __name__ == "__main__":
    main()
