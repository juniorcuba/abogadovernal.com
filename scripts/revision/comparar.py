# Compara las huellas (huella.py) de dos tandas de exports: la nueva y la que se
# usó para montar el sitio. Empareja cada artboard nuevo con el viejo que más se
# le parece y lista qué cambió.
#
#   python -I scripts/revision/comparar.py <nuevos.json> <viejos.json> [filtro]
#
# Por artboard: tamaño, textos añadidos/quitados/cambiados, textos que cambiaron
# de estilo, tramos que se movieron (agrupados por desplazamiento) y fotos que
# cambiaron de imagen, de caja o de encuadre.
import difflib
import json
import os
import sys

nuevos = json.load(open(sys.argv[1], encoding="utf-8"))
viejos = json.load(open(sys.argv[2], encoding="utf-8"))
filtro = sys.argv[3].lower() if len(sys.argv) > 3 else ""


def corto(r):
    return r.split("::")[-1].split("Downloads/")[-1]


def palabras(h):
    return [t[5] for t in h["textos"]]


def parecido(a, b):
    sa, sb = set(palabras(a)), set(palabras(b))
    return len(sa & sb) / max(1, len(sa | sb))


def fecha(r):
    try:
        return os.path.getmtime(r)
    except OSError:
        return 0


def sale(linea):
    sys.stdout.buffer.write((linea + "\n").encode("utf-8"))


for rn, n in sorted(nuevos.items(), key=lambda kv: corto(kv[0])):
    if filtro and filtro not in corto(rn).lower():
        continue
    candidatos = [(parecido(n, v), fecha(rv), rv) for rv, v in viejos.items() if v["ancho"] == n["ancho"]]
    candidatos.sort(reverse=True)
    sale("=" * 100)
    sale("NUEVO  %s  (%dx%d)" % (corto(rn), n["ancho"], n["alto"]))
    if not candidatos or candidatos[0][0] < 0.3:
        sale("   SIN PAREJA entre los exports anteriores (mejor parecido %.2f)" % (candidatos[0][0] if candidatos else 0))
        continue
    sim, _, rv = candidatos[0]
    v = viejos[rv]
    otros = ["%s %.2f" % (corto(c[2]), c[0]) for c in candidatos[1:3] if c[0] > 0.6]
    sale("VIEJO  %s  (%dx%d)  parecido %.2f%s" % (corto(rv), v["ancho"], v["alto"], sim, ("   [también: " + ", ".join(otros) + "]") if otros else ""))
    if n["alto"] != v["alto"]:
        sale("   ALTO: %d -> %d (%+d)" % (v["alto"], n["alto"], n["alto"] - v["alto"]))

    # --- textos: contenido
    tv, tn = v["textos"], n["textos"]
    sm = difflib.SequenceMatcher(None, [t[5] for t in tv], [t[5] for t in tn], autojunk=False)
    pares, cambios = [], 0
    for op, i1, i2, j1, j2 in sm.get_opcodes():
        if op == "equal":
            pares += [(tv[i1 + k], tn[j1 + k]) for k in range(i2 - i1)]
            continue
        cambios += 1
        if cambios <= 25:
            antes = " ".join(t[5] for t in tv[i1:i2])[:230]
            ahora = " ".join(t[5] for t in tn[j1:j2])[:230]
            y = (tn[j1][0] if j1 < len(tn) and j1 < j2 else (tv[i1][0] if i1 < len(tv) else 0))
            sale("   TEXTO y~%-6.0f  - %s" % (y, antes or "(nada)"))
            sale("   %s  + %s" % (" " * 12, ahora or "(nada)"))
    if cambios > 25:
        sale("   … y %d cambios de texto más" % (cambios - 25))
    if not cambios:
        sale("   textos: mismo contenido (%d trozos)" % len(tn))

    # --- textos: estilo y posición
    estilo = [(a, b) for a, b in pares if a[2:5] != b[2:5]]
    for a, b in estilo[:12]:
        sale("   ESTILO y%-6.0f %-28s  %s/%s/%s -> %s/%s/%s" % (b[0], b[5][:28], a[2], a[3], a[4], b[2], b[3], b[4]))
    if len(estilo) > 12:
        sale("   … y %d cambios de estilo más" % (len(estilo) - 12))
    tramos = []
    for a, b in pares:
        d = (round(b[1] - a[1], 1), round(b[0] - a[0], 1))
        if tramos and tramos[-1][0] == d:
            tramos[-1][2] = b[0]
            tramos[-1][3] += 1
        else:
            tramos.append([d, b[0], b[0], 1, b[5][:30]])
    movidos = [t for t in tramos if t[0] != (0.0, 0.0)]
    for d, y1, y2, cnt, txt in movidos[:30]:
        sale("   MOVIDO y%-6.0f..%-6.0f dx=%+.1f dy=%+.1f  (%d trozos, desde «%s»)" % (y1, y2, d[0], d[1], cnt, txt))
    if len(movidos) > 30:
        sale("   … y %d tramos movidos más" % (len(movidos) - 30))
    if pares and not movidos:
        sale("   posiciones de texto: iguales")

    # --- fotos
    def clave(u):
        return tuple(None if c is None else round(c) for c in u["caja"])

    uv = {}
    for u in v["usos"]:
        uv.setdefault(clave(u), []).append(u)
    vistos, dif = set(), 0
    for u in n["usos"]:
        k = clave(u)
        vistos.add(k)
        if k not in uv:
            sale("   FOTO NUEVA  caja %s  foto %s  op %s" % (list(k), u["foto"], u["op"]))
            dif += 1
            continue
        o = uv[k][0] if len(uv[k]) == 1 else next((x for x in uv[k] if x["medidas"][:2] == u["medidas"][:2]), uv[k][0])
        # Figma recomprime las fotos en cada export: mismas medidas y peso casi
        # igual es la misma foto aunque cambie el md5.
        misma = o["foto"] == u["foto"] or (
            o["medidas"][:2] == u["medidas"][:2] and abs(o["medidas"][2] - u["medidas"][2]) <= 0.02 * max(1, o["medidas"][2])
        )
        if not misma:
            sale("   FOTO CAMBIADA  caja %s  %sx%s -> %sx%s" % (list(k), o["medidas"][0], o["medidas"][1], u["medidas"][0], u["medidas"][1]))
            dif += 1
        elif o["matriz"] != u["matriz"] or o["op"] != u["op"] or o["transform"] != u["transform"]:
            sale("   FOTO REENCUADRADA  caja %s  op %s -> %s  matriz %s -> %s" % (list(k), o["op"], u["op"], o["matriz"][:60], u["matriz"][:60]))
            dif += 1
    for k in uv:
        if k not in vistos:
            sale("   FOTO QUITADA  caja %s  foto %s" % (list(k), uv[k][0]["foto"]))
            dif += 1
    if not dif:
        sale("   fotos: las mismas, en las mismas cajas (%d usos)" % len(n["usos"]))

    gv, gn = sorted(v["degradados"].values()), sorted(n["degradados"].values())
    if gv != gn:
        sale("   DEGRADADOS: %d distintos de %d (viejo tenía %d)" % (len(set(gn) - set(gv)), len(gn), len(gv)))
