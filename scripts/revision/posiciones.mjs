// Compara dónde cae cada texto en la página real con dónde lo pone el diseño.
//
//   node scripts/revision/posiciones.mjs <huellas.json> <clave del artboard> <url> <ancho> [tolerancia=3]
//
// Toma de la huella (huella.py) los textos del artboard que sirven de ancla
// (titulares, rótulos, botones: cuerpo ≥ 18 o cadenas únicas de 8+ letras), busca
// cada uno en el DOM y mide su caja con un Range. La línea base se estima como
// top + 1.05 × cuerpo, que es el ascendente de Poppins. Lista lo que no aparece
// en la página y lo que se aparta más que la tolerancia.
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { tmpdir } from "node:os";

const [rutaHuellas, clave, url, anchoTxt, tolTxt] = process.argv.slice(2);
const ancho = +anchoTxt;
const tol = +(tolTxt || 3);
const huellas = JSON.parse(readFileSync(rutaHuellas, "utf8"));
const k = Object.keys(huellas).find((x) => x.endsWith(clave));
if (!k) { console.log("No hay huella para", clave); process.exit(1); }
const norm = (s) => s.toLowerCase().replace(/\s+/g, " ").trim();
const veces = new Map();
for (const t of huellas[k].textos) veces.set(norm(t[5]), (veces.get(norm(t[5])) || 0) + 1);
// El botón flotante es fijo: su posición en el artboard no dice nada.
const FIJOS = new Set(["¡agenda tu consulta!", "chat en vivo"]);
const anclas = huellas[k].textos
  .filter((t) => !FIJOS.has(norm(t[5])))
  .filter((t) => norm(t[5]).length >= 3 && (t[2] >= 18 || (norm(t[5]).length >= 8 && veces.get(norm(t[5])) === 1)))
  .map((t) => ({ y: t[0], x: t[1], cuerpo: t[2], texto: norm(t[5]) }));

const PUERTO = 9600 + (process.pid % 300);
const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${PUERTO}`,
  `--user-data-dir=${tmpdir()}/vernal-pos-${process.pid}`, "about:blank",
], { stdio: "ignore" });
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
let ws, id = 0;
const pendientes = new Map();
const cdp = (method, params = {}) => new Promise((ok, mal) => {
  const n = ++id;
  pendientes.set(n, { ok, mal });
  ws.send(JSON.stringify({ id: n, method, params }));
});

try {
  let destino;
  for (let i = 0; i < 40 && !destino; i++) {
    await espera(250);
    try { destino = (await (await fetch(`http://127.0.0.1:${PUERTO}/json`)).json()).find((t) => t.type === "page"); } catch {}
  }
  ws = new WebSocket(destino.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    const p = pendientes.get(m.id);
    if (p) { pendientes.delete(m.id); m.error ? p.mal(new Error(m.error.message)) : p.ok(m.result); }
  };
  await cdp("Page.enable");
  await cdp("Runtime.enable");
  await cdp("Emulation.setDeviceMetricsOverride", { width: ancho, height: 1200, deviceScaleFactor: 1, mobile: false });
  await cdp("Page.navigate", { url });
  await espera(6000);
  const expr = `(() => {
    const norm = (s) => s.toLowerCase().replace(/\\s+/g, " ").trim();
    const lienzo = document.querySelector('[class^="modo-"]');
    const z = +lienzo.style.zoom || 1;
    const nodos = [];
    const w = document.createTreeWalker(document.querySelector("main") ? document.body : document.body, NodeFilter.SHOW_TEXT);
    for (let n = w.nextNode(); n; n = w.nextNode()) {
      if (!n.nodeValue.trim()) continue;
      const el = n.parentElement;
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.display === "none" || !el.getClientRects().length) continue;
      if (el.closest("[role=dialog], nextjs-portal")) continue;
      nodos.push(n);
    }
    const anclas = ${JSON.stringify(anclas)};
    const res = [];
    for (const a of anclas) {
      let mejor = null;
      for (const n of nodos) {
        const bruto = n.nodeValue;
        const plano = bruto.toLowerCase();
        // busca el ancla tolerando espacios múltiples en el DOM
        const patron = a.texto.replace(/[.*+?^\${}()|[\\]\\\\]/g, "\\\\$&").replace(/ /g, "\\\\s+");
        const m = new RegExp(patron).exec(plano);
        if (!m) continue;
        const r = document.createRange();
        r.setStart(n, m.index); r.setEnd(n, m.index + Math.min(m[0].length, 3));
        const c = r.getClientRects()[0];
        if (!c || !c.width) continue;
        const fs = parseFloat(getComputedStyle(n.parentElement).fontSize);
        const x = c.left / z, y = (c.top + scrollY) / z + 1.05 * fs;
        // Mismo texto en otro cuerpo es otro elemento (un párrafo que lo cita).
        if (Math.abs(fs / 1 - a.cuerpo) > 0.6) continue;
        const d = Math.abs(x - a.x) + Math.abs(y - a.y);
        if (!mejor || d < mejor.d) mejor = { d, x, y, fs };
      }
      res.push({ ...a, hallado: mejor });
    }
    return JSON.stringify({ z, res });
  })()`;
  const { result } = await cdp("Runtime.evaluate", { expression: expr, returnByValue: true });
  const { z, res } = JSON.parse(result.value);
  const faltan = res.filter((r) => !r.hallado);
  // En texto corrido la x de un trozo depende de cómo parta la línea: más margen.
  const fuera = res.filter((r) => r.hallado && (Math.abs(r.hallado.x - r.x) > (r.cuerpo <= 16 ? 60 : tol) || Math.abs(r.hallado.y - r.y) > tol));
  console.log(`${clave} @${ancho}  zoom ${z.toFixed(4)}  anclas ${res.length}  en su sitio ${res.length - faltan.length - fuera.length}  desplazadas ${fuera.length}  no encontradas ${faltan.length}`);
  for (const r of fuera) console.log(`  MOVIDA  y${r.y.toFixed(0)} x${r.x.toFixed(0)} c${r.cuerpo}  dx=${(r.hallado.x - r.x).toFixed(1)} dy=${(r.hallado.y - r.y).toFixed(1)} cuerpo=${r.hallado.fs}  «${r.texto.slice(0, 44)}»`);
  for (const r of faltan) console.log(`  FALTA   y${r.y.toFixed(0)} x${r.x.toFixed(0)} c${r.cuerpo}  «${r.texto.slice(0, 60)}»`);
} catch (e) {
  console.log("FALLO", e.message);
} finally {
  try { ws?.close(); } catch {}
  chrome.kill();
}
