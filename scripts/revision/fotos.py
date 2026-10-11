import sys, re, base64, json, os
src, lo, hi, out = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), sys.argv[4]
s = open(src, encoding="utf-8", errors="replace").read()
pats = {}
for m in re.finditer(r'<pattern id="([^"]+)"[^>]*>\s*<use xlink:href="#([^"]+)"(?: transform="([^"]+)")?', s):
    pats[m.group(1)] = (m.group(2), m.group(3))
imgs = {}
for m in re.finditer(r'<image id="([^"]+)" width="(\d+)" height="(\d+)"[^>]*xlink:href="data:image/(\w+);base64,', s):
    imgs[m.group(1)] = (int(m.group(2)), int(m.group(3)), m.group(4), m.end())
res = []
for m in re.finditer(r'<(rect|path)\b([^>]*?)fill="url\(#(pattern[^)]+)\)"([^>]*)>', s):
    a = m.group(2) + m.group(4)
    g = lambda k: (re.search(r'\b%s="([-\d.]+)"' % k, a) or [None, None])[1]
    x, y, w, h = g("x"), g("y"), g("width"), g("height")
    if m.group(1) == "path" or y is None: 
        continue
    y = float(y)
    if not (lo <= y <= hi): continue
    pid = m.group(3); iid, tr = pats.get(pid, (None, None))
    if iid not in imgs: continue
    iw, ih, fmt, pos = imgs[iid]
    f = os.path.join(out, "%s.%s" % (iid, "jpg" if fmt == "jpeg" else fmt))
    if not os.path.exists(f):
        end = s.index('"', pos)
        open(f, "wb").write(base64.b64decode(s[pos:end]))
    op = re.search(r'opacity="([\d.]+)"', a); t2 = re.search(r'transform="([^"]+)"', a)
    res.append(dict(x=float(x or 0), y=y, w=float(w), h=float(h), img=os.path.basename(f), iw=iw, ih=ih, pat=tr, op=op and op.group(1), tr=t2 and t2.group(1)))
for r in sorted(res, key=lambda r: (r["y"], r["x"])): print(json.dumps(r))
