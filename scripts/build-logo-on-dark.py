"""
Build a transparent PNG for dark backgrounds from assets/logo.png.
Preserves saturated reds; shifts dark ink / cool grays toward bone (#f5f2ec).
"""
from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "claude" / "assets" / "logo.png"
OUT_PNG = ROOT / "claude" / "assets" / "logo-on-dark.png"
MIRRORS = [
    ROOT / "next-app" / "public" / "images" / "logo-on-dark.png",
    ROOT / "svelte-app" / "static" / "images" / "logo-on-dark.png",
]
WEBP_MIRRORS = [
    ROOT / "next-app" / "public" / "images" / "logo-on-dark.webp",
    ROOT / "svelte-app" / "static" / "images" / "logo-on-dark.webp",
]
BONE = np.array([245.0, 242.0, 236.0], dtype=np.float32)


def build_on_dark(rgba: np.ndarray) -> np.ndarray:
    im = rgba.astype(np.float32)
    r, g, b, a = im[..., 0], im[..., 1], im[..., 2], im[..., 3]
    lum = 0.299 * r + 0.587 * g + 0.114 * b

    # Brand red: warm R-dominant (excludes light gray text where R≈G≈B)
    is_red = (r > g + 15.0) & (r > b + 15.0) & (r > 70.0)

    opaque = a > 15.0
    # Shift everything that is not red and not already light
    needs_shift = opaque & ~is_red & (lum < 198.0)

    # Stronger shift when darker; gentle on mid-tones (anti-alias)
    strength = np.clip((195.0 - lum) / 195.0, 0.0, 1.0)
    s = np.where(needs_shift, strength, 0.0)

    out = im.copy()
    for i, t in enumerate(BONE):
        ch = im[..., i]
        out[..., i] = ch + (t - ch) * s
    out[..., 3] = a
    return np.clip(np.round(out), 0, 255).astype(np.uint8)


def main() -> int:
    if not SRC.is_file():
        print(f"Missing source: {SRC}", file=sys.stderr)
        return 1
    rgba = np.array(Image.open(SRC).convert("RGBA"))
    out = build_on_dark(rgba)
    img = Image.fromarray(out, "RGBA")
    OUT_PNG.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT_PNG, optimize=True)
    print(f"Wrote {OUT_PNG}")
    for path in MIRRORS:
        path.parent.mkdir(parents=True, exist_ok=True)
        img.save(path, optimize=True)
        print(f"Wrote {path}")
    for path in WEBP_MIRRORS:
        path.parent.mkdir(parents=True, exist_ok=True)
        img.save(path, "WEBP", lossless=True, method=6)
        print(f"Wrote {path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
