// Recorta una zona de un export SVG del diseno (o de una captura PNG) a PNG.
//
//   node scripts/revision/recorte.cjs <origen.svg|png> <salida.png> <x> <y> <ancho> <alto> [escala=2]
//
// Las coordenadas son las del artboard. Sirve para poner el diseno al lado de una
// captura de captura.mjs y comparar la misma zona.
const sharp = require("sharp");
const [src, out, x, y, w, h, k] = process.argv.slice(2);
(async () => {
  const s = +(k || 2);
  const svg = src.toLowerCase().endsWith(".svg");
  const img = svg ? sharp(src, { limitInputPixels: false, unlimited: true, density: 72 * s }) : sharp(src);
  const f = svg ? s : 1;
  let p = img.extract({ left: Math.round(+x * f), top: Math.round(+y * f), width: Math.round(+w * f), height: Math.round(+h * f) });
  if (!svg) p = p.resize({ width: Math.round(+w * s), kernel: "nearest" });
  await p.png().toFile(out);
  console.log("ok", out);
})().catch((e) => { console.log("FALLO", e.message); process.exit(1); });
