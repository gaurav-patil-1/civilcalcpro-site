#!/usr/bin/env python3
"""Generate 1200x630 Open Graph / Google Discover banner for CivilCalc Pro."""

import os
from PIL import Image, ImageDraw, ImageFont

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
WIDTH, HEIGHT = 1200, 630


def load_font(candidates, size):
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()


def main():
    bg = Image.new("RGBA", (WIDTH, HEIGHT), (8, 19, 15, 255))
    grid_layer = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(grid_layer)

    # Subtle architectural grid
    for x in range(0, WIDTH, 48):
        draw.line([(x, 0), (x, HEIGHT)], fill=(242, 240, 232, 16), width=1)
    for y in range(0, HEIGHT, 48):
        draw.line([(0, y), (WIDTH, y)], fill=(242, 240, 232, 16), width=1)
    bg = Image.alpha_composite(bg, grid_layer)

    # Soft emerald glow on right stage
    glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    cx, cy = 945, 315
    for r in range(340, 20, -8):
        alpha = int(32 * (1 - r / 340) ** 2)
        gdraw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(41, 218, 152, alpha))
    bg = Image.alpha_composite(bg, glow)
    draw = ImageDraw.Draw(bg)

    # Architectural corner brackets
    accent = (41, 218, 152, 255)
    draw.line([(36, 84), (36, 36), (84, 36)], fill=accent, width=2)
    draw.line([(1164, 546), (1164, 594), (1116, 594)], fill=accent, width=2)

    # App icon
    icon_path = os.path.join(REPO_ROOT, "public/images/adaptive-icon.png")
    icon = Image.open(icon_path).convert("RGBA").resize((60, 60), Image.Resampling.LANCZOS)
    bg.alpha_composite(icon, (72, 74))

    # Phone showcase screenshot on right
    phone_path = os.path.join(REPO_ROOT, "public/images/showcase/Dark/home-calculators.png")
    phone = Image.open(phone_path).convert("RGBA")
    target_w = 262
    target_h = int(phone.height * (target_w / phone.width))
    phone = phone.resize((target_w, target_h), Image.Resampling.LANCZOS)
    bg.alpha_composite(phone, (846, 56))

    sans_bold = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/SFNS.ttf",
        "/Library/Fonts/Arial Bold.ttf",
    ]
    sans_reg = [
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/SFNS.ttf",
    ]
    serif_italic = [
        "/System/Library/Fonts/Supplemental/Georgia Italic.ttf",
        "/System/Library/Fonts/Supplemental/Times New Roman Italic.ttf",
    ]
    mono_bold = [
        "/System/Library/Fonts/Supplemental/Courier New Bold.ttf",
        "/System/Library/Fonts/Menlo.ttc",
    ]

    f_brand = load_font(sans_bold, 30)
    f_kicker = load_font(mono_bold, 14)
    f_h1 = load_font(sans_bold, 58)
    f_serif = load_font(serif_italic, 44)
    f_sub = load_font(sans_reg, 21)
    f_meta = load_font(mono_bold, 15)

    draw.text((148, 76), "CivilCalc Pro", font=f_brand, fill=(242, 240, 232, 255))
    draw.text(
        (148, 114),
        "ANDROID FIELD TOOLKIT  ·  320+ CALCULATORS",
        font=f_kicker,
        fill=accent,
    )

    draw.text((72, 198), "Civil Engineering", font=f_h1, fill=(242, 240, 232, 255))
    draw.text((72, 268), "Calculators & BOQs", font=f_h1, fill=(242, 240, 232, 255))
    draw.text((72, 344), "Built for real site work.", font=f_serif, fill=accent)

    draw.text(
        (72, 426),
        "Concrete · Steel & RCC · Masonry · Electrical · Area · Unit Converter",
        font=f_sub,
        fill=(170, 184, 177, 255),
    )

    draw.line([(72, 492), (760, 492)], fill=(52, 68, 60, 255), width=1)
    draw.text(
        (72, 516),
        "OFFLINE-FIRST  ·  PDF & CSV REPORTS  ·  GOOGLE PLAY",
        font=f_meta,
        fill=accent,
    )
    draw.text(
        (72, 548),
        "https://civilcalcpro.com",
        font=f_kicker,
        fill=(135, 148, 141, 255),
    )

    out_path = os.path.join(REPO_ROOT, "og-banner.png")
    bg.convert("RGB").save(out_path, format="PNG", optimize=True)
    print(f"Saved {out_path} ({WIDTH}x{HEIGHT}, {os.path.getsize(out_path)} bytes)")


if __name__ == "__main__":
    main()
