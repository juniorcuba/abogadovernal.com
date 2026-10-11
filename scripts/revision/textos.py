import sys, re, html
s = open(sys.argv[1], encoding="utf-8", errors="replace").read()
lo, hi = float(sys.argv[2]), float(sys.argv[3])
out = []
for m in re.finditer(r"<text([^>]*)>(.*?)</text>", s, flags=re.S):
    attrs, body = m.groups()
    fs = re.search(r'font-size="([\d.]+)"', attrs); fw = re.search(r'font-weight="(\w+)"', attrs); fill = re.search(r'fill="([^"]+)"', attrs)
    for t in re.finditer(r'<tspan x="([-\d.]+)" y="([-\d.]+)"[^>]*>(.*?)</tspan>', body, flags=re.S):
        x, y, txt = float(t.group(1)), float(t.group(2)), html.unescape(re.sub(r"<[^>]+>", "", t.group(3)))
        if lo <= y <= hi:
            out.append((y, x, fs and fs.group(1), fw and fw.group(1), fill and fill.group(1), txt))
for y, x, fs, fw, fill, txt in sorted(out):
    sys.stdout.buffer.write(("%7.1f %6.1f %4s %4s %-8s %s\n" % (y, x, fs, fw or "", fill or "", txt)).encode("utf-8"))
