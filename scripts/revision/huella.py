# Huella de un export SVG del diseño, para comparar dos versiones de un artboard.
#
#   python -I scripts/revision/huella.py <salida.json> <archivo.svg | archivo.zip::miembro.svg> [...]
#   python -I scripts/revision/huella.py <salida.json> @lista.txt
#
# De cada SVG guarda: tamaño, textos (posición, cuerpo, peso, color), fotos
# incrustadas (tamaño, md5 y peso: Figma recomprime al exportar, así que el md5
# cambia aunque la foto sea la misma), dónde se usa cada foto (caja, opacidad y matriz del
# patrón) y los degradados. Acepta miembros de un zip sin extraerlo.
import hashlib
import html
import json
import re
import sys
import zipfile


def leer(ruta):
    if "::" in ruta:
        z, miembro = ruta.split("::", 1)
        with zipfile.ZipFile(z) as f:
            return f.read(miembro).decode("utf-8", "replace")
    return open(ruta, encoding="utf-8", errors="replace").read()


def num(a, k):
    m = re.search(r'\b%s="([-\d.]+)"' % k, a)
    return float(m.group(1)) if m else None


def huella(s):
    cab = re.search(r"<svg[^>]*>", s).group(0)
    h = {"ancho": num(cab, "width"), "alto": num(cab, "height"), "textos": [], "fotos": {}, "usos": [], "degradados": {}}

    for m in re.finditer(r"<text([^>]*)>(.*?)</text>", s, flags=re.S):
        attrs, cuerpo = m.groups()
        fs = num(attrs, "font-size")
        fw = re.search(r'font-weight="(\w+)"', attrs)
        fill = re.search(r'fill="([^"]+)"', attrs)
        for t in re.finditer(r'<tspan x="([-\d.]+)" y="([-\d.]+)"[^>]*>(.*?)</tspan>', cuerpo, flags=re.S):
            txt = html.unescape(re.sub(r"<[^>]+>", "", t.group(3))).strip()
            if txt:
                h["textos"].append([float(t.group(2)), float(t.group(1)), fs, fw.group(1) if fw else "", fill.group(1) if fill else "", txt])
    h["textos"].sort()

    for m in re.finditer(r'<image id="([^"]+)" width="(\d+)" height="(\d+)"[^>]*xlink:href="data:image/(\w+);base64,', s):
        fin = s.index('"', m.end())
        h["fotos"][m.group(1)] = [int(m.group(2)), int(m.group(3)), hashlib.md5(s[m.end():fin].encode("ascii", "ignore")).hexdigest()[:10], fin - m.end()]

    patrones = {}
    for m in re.finditer(r'<pattern id="([^"]+)"[^>]*>\s*<use xlink:href="#([^"]+)"(?: transform="([^"]+)")?', s):
        patrones[m.group(1)] = (m.group(2), m.group(3) or "")
    for m in re.finditer(r'<(rect|path|circle|ellipse)\b([^>]*?fill="url\(#(pattern[^)]+)\)"[^>]*)>', s):
        a = m.group(2)
        img, tr = patrones.get(m.group(3), ("", ""))
        if m.group(1) == "rect":
            caja = [num(a, "x") or 0, num(a, "y") or 0, num(a, "width"), num(a, "height")]
        else:
            d = re.search(r' d="M([-\d.]+) ([-\d.]+)', a)
            caja = [float(d.group(1)), float(d.group(2)), None, None] if d else [num(a, "cx"), num(a, "cy"), num(a, "r"), None]
        op = re.search(r'(?:fill-)?opacity="([\d.]+)"', a)
        h["usos"].append({"caja": caja, "foto": h["fotos"].get(img, [0, 0, "?", 0])[2], "medidas": h["fotos"].get(img, [0, 0, "?", 0])[:2] + h["fotos"].get(img, [0, 0, "?", 0])[3:], "op": op.group(1) if op else "1", "matriz": tr, "transform": (re.search(r'transform="([^"]+)"', a) or [0, ""])[1]})
    h["usos"].sort(key=lambda u: (u["caja"][1] or 0, u["caja"][0] or 0))

    for m in re.finditer(r'<(linear|radial)Gradient id="([^"]+)"(.*?)</(?:linear|radial)Gradient>', s, flags=re.S):
        h["degradados"][m.group(2)] = re.sub(r"\s+", " ", m.group(3))[:400]
    return h


if __name__ == "__main__":
    salida, rutas = sys.argv[1], sys.argv[2:]
    # "@lista.txt" = una ruta por línea (cómodo cuando son muchas o llevan espacios).
    if len(rutas) == 1 and rutas[0].startswith("@"):
        rutas = [l.strip() for l in open(rutas[0][1:], encoding="utf-8") if l.strip()]
    try:
        datos = json.load(open(salida, encoding="utf-8"))
    except (OSError, ValueError):
        datos = {}
    for r in rutas:
        if r in datos:
            continue
        try:
            datos[r] = huella(leer(r))
            print("ok", len(datos[r]["textos"]), "textos", len(datos[r]["fotos"]), "fotos", r.encode("ascii", "replace").decode()[-70:])
        except Exception as e:  # un export roto no debe parar la tanda
            print("FALLO", r.encode("ascii", "replace").decode()[-70:], e)
        json.dump(datos, open(salida, "w", encoding="utf-8"))
