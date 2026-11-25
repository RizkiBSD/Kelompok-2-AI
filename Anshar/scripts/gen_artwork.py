"""Generate procedural sketch-style SVG artworks for Bantugambar portfolio."""
import math, random, os

OUT = os.path.join(os.path.dirname(__file__), "public", "artwork")
os.makedirs(OUT, exist_ok=True)

PALETTES = [
    ("#e8d5c4", "#c97b63", "#7a8b6f"),
    ("#dfe4ea", "#5b7c99", "#c9a227"),
    ("#e9e3d3", "#8a6a4f", "#b5651d"),
    ("#e3e7e2", "#4a6b5d", "#d98c5f"),
    ("#ece0e6", "#8e5b7c", "#e0a458"),
    ("#e5e0d8", "#3f4a5a", "#a85751"),
    ("#e8ebe4", "#6b705c", "#cb997e"),
    ("#efe6dc", "#9c6644", "#7f9183"),
]

SIZES = [(800, 1000), (800, 1100), (900, 900), (800, 1200), (900, 1000)]


def hatch(x, y, w, h, angle, gap, color, opacity, sw, out):
    """Cross-hatching lines clipped to a rect."""
    cid = f"c{random.randint(100000,999999)}"
    out.append(f'<clipPath id="{cid}"><rect x="{x}" y="{y}" width="{w}" height="{h}"/></clipPath>')
    out.append(f'<g clip-path="url(#{cid})" stroke="{color}" stroke-width="{sw}" opacity="{opacity}">')
    diag = math.hypot(w, h)
    steps = int(diag / gap)
    for i in range(steps):
        off = i * gap - diag / 2
        a = math.radians(angle)
        cx, cy = x + w / 2, y + h / 2
        dx, dy = math.cos(a) * diag, math.sin(a) * diag
        px, py = -math.sin(a) * off, math.cos(a) * off
        out.append(
            f'<line x1="{cx+px-dx:.1f}" y1="{cy+py-dy:.1f}" x2="{cx+px+dx:.1f}" y2="{cy+py+dy:.1f}"/>'
        )
    out.append("</g>")


def artwork(idx, seed):
    random.seed(seed)
    W, H = SIZES[idx % len(SIZES)]
    paper, c1, c2 = PALETTES[idx % len(PALETTES)]
    ink = "#2f2a26"
    o = []
    o.append(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">'
    )
    o.append("<defs>")
    o.append(
        '<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4"/>'
        '<feColorMatrix type="saturate" values="0"/></filter>'
    )
    o.append(
        f'<radialGradient id="wash{idx}" cx="45%" cy="40%" r="65%">'
        f'<stop offset="0%" stop-color="{c1}" stop-opacity="0.55"/>'
        f'<stop offset="70%" stop-color="{c1}" stop-opacity="0.12"/>'
        f'<stop offset="100%" stop-color="{c1}" stop-opacity="0"/>'
        "</radialGradient>"
    )
    o.append("</defs>")

    # paper
    o.append(f'<rect width="{W}" height="{H}" fill="{paper}"/>')
    # color washes (soft watercolor blobs)
    for _ in range(3):
        cx, cy = random.uniform(0.25, 0.75) * W, random.uniform(0.2, 0.7) * H
        r = random.uniform(0.28, 0.5) * W
        col = c1 if random.random() > 0.35 else c2
        o.append(
            f'<ellipse cx="{cx:.0f}" cy="{cy:.0f}" rx="{r:.0f}" ry="{r*random.uniform(0.7,1.1):.0f}" '
            f'fill="{col}" opacity="{random.uniform(0.10,0.22):.2f}"/>'
        )
    o.append(f'<rect width="{W}" height="{H}" fill="url(#wash{idx})"/>')

    # main subject: layered contour "studies"
    cx, cy = W * 0.5, H * 0.46
    base_r = min(W, H) * 0.26
    n = random.randint(9, 14)
    for i in range(n):
        t = i / (n - 1)
        r = base_r * (0.35 + t * 1.05)
        wob = random.uniform(0.06, 0.16)
        pts = []
        for k in range(73):
            a = 2 * math.pi * k / 72
            rr = r * (1 + wob * math.sin(a * random.choice([3, 4, 5]) + i * 0.6))
            pts.append(f"{cx + rr*math.cos(a)*1.0:.1f},{cy + rr*math.sin(a)*0.92:.1f}")
        o.append(
            f'<polyline points="{" ".join(pts)}" fill="none" stroke="{ink}" '
            f'stroke-width="{random.choice([0.8,1.0,1.2,1.6])}" '
            f'stroke-linecap="round" opacity="{random.uniform(0.55,0.9):.2f}"/>'
        )

    # gesture / figure lines
    for _ in range(random.randint(4, 7)):
        x1, y1 = random.uniform(0.15, 0.85) * W, random.uniform(0.12, 0.8) * H
        x2, y2 = random.uniform(0.15, 0.85) * W, random.uniform(0.12, 0.9) * H
        mx, my = (x1 + x2) / 2 + random.uniform(-80, 80), (y1 + y2) / 2 + random.uniform(-80, 80)
        o.append(
            f'<path d="M{x1:.0f},{y1:.0f} Q{mx:.0f},{my:.0f} {x2:.0f},{y2:.0f}" fill="none" '
            f'stroke="{ink}" stroke-width="{random.uniform(0.6,1.4):.1f}" opacity="0.35" stroke-linecap="round"/>'
        )

    # hatch shading patches
    for _ in range(random.randint(2, 4)):
        hw = random.uniform(0.18, 0.34) * W
        hh = random.uniform(0.14, 0.3) * H
        hx = random.uniform(0.08, 0.9) * W - hw / 2
        hy = random.uniform(0.08, 0.9) * H - hh / 2
        hatch(hx, hy, hw, hh, random.choice([38, 45, 52, 128]), random.uniform(5, 9), ink,
              random.uniform(0.12, 0.26), random.uniform(0.5, 0.9), o)

    # construction marks
    o.append(
        f'<line x1="{W*0.1:.0f}" y1="{H*0.5:.0f}" x2="{W*0.9:.0f}" y2="{H*0.5:.0f}" '
        f'stroke="{ink}" stroke-width="0.5" opacity="0.18" stroke-dasharray="6 8"/>'
    )
    o.append(
        f'<line x1="{W*0.5:.0f}" y1="{H*0.08:.0f}" x2="{W*0.5:.0f}" y2="{H*0.92:.0f}" '
        f'stroke="{ink}" stroke-width="0.5" opacity="0.18" stroke-dasharray="6 8"/>'
    )
    # accent dot
    o.append(f'<circle cx="{cx:.0f}" cy="{cy:.0f}" r="3.5" fill="{c2}" opacity="0.85"/>')

    # grain overlay
    o.append(f'<rect width="{W}" height="{H}" filter="url(#grain)" opacity="0.05"/>')
    # vignette
    o.append(
        f'<rect width="{W}" height="{H}" fill="none" stroke="{ink}" stroke-width="10" opacity="0.05"/>'
    )
    o.append("</svg>")
    return "".join(o)


for i in range(1, 13):
    svg = artwork(i - 1, seed=i * 7919)
    with open(os.path.join(OUT, f"artwork-{i:02d}.svg"), "w", encoding="utf-8") as f:
        f.write(svg)
    print("wrote", f"artwork-{i:02d}.svg", len(svg), "bytes")
