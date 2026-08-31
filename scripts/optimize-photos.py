#!/usr/bin/env python3
"""Produce the site's photo assets from two source headshots.

Usage:
    python3 scripts/optimize-photos.py <polo-charcoal-photo> <suit-white-photo>

Writes into images/:
    arya-hero.webp / .jpg      576x576   hero (2x the 288px box)
    arya-formal.webp / .jpg    480x640   about section
    arya-og.jpg                1200x630  og:image / twitter:image
"""
import sys
from pathlib import Path

from PIL import Image, ImageOps

OUT = Path(__file__).resolve().parent.parent / "images"
WEBP_Q, JPEG_Q = 82, 85


def load(path):
    # exif_transpose applies the phone's rotation flag so the pixels match how
    # the photo looks in Preview rather than how the sensor captured it.
    return ImageOps.exif_transpose(Image.open(path)).convert("RGB")


def cover(im, w, h, anchor_y=0.35):
    """Crop to w:h keeping the subject near the top (faces sit above center)."""
    src_ratio, dst_ratio = im.width / im.height, w / h
    if src_ratio > dst_ratio:  # too wide: trim sides
        new_w = round(im.height * dst_ratio)
        x0 = (im.width - new_w) // 2
        im = im.crop((x0, 0, x0 + new_w, im.height))
    else:  # too tall: trim top/bottom, biased upward
        new_h = round(im.width / dst_ratio)
        y0 = round((im.height - new_h) * anchor_y)
        im = im.crop((0, y0, im.width, y0 + new_h))
    return im.resize((w, h), Image.LANCZOS)


def write(im, stem, webp=True):
    if webp:
        p = OUT / f"{stem}.webp"
        im.save(p, "WEBP", quality=WEBP_Q, method=6)
        print(f"  {p.name:18} {p.stat().st_size // 1024:4d} KB  {im.width}x{im.height}")
    p = OUT / f"{stem}.jpg"
    im.save(p, "JPEG", quality=JPEG_Q, optimize=True, progressive=True)
    print(f"  {p.name:18} {p.stat().st_size // 1024:4d} KB  {im.width}x{im.height}")


def main(polo_path, suit_path):
    OUT.mkdir(exist_ok=True)
    polo, suit = load(polo_path), load(suit_path)

    print("hero (polo / charcoal):")
    write(cover(polo, 576, 576, anchor_y=0.30), "arya-hero")

    print("about (suit / white):")
    write(cover(suit, 480, 640, anchor_y=0.25), "arya-formal")

    print("social card (suit / white):")
    write(cover(suit, 1200, 630, anchor_y=0.15), "arya-og", webp=False)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
