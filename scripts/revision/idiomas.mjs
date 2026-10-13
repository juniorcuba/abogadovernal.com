// Compara la misma página en español y en inglés y lista los textos que en
// inglés ocupan otro alto (más o menos renglones) o se salen de su caja.
//
//   node scripts/revision/idiomas.mjs <base> <ruta> <ancho> [tolerancia=3]
//
//   node scripts/revision/idiomas.mjs http://localhost:3100 /nosotros 1440
//
// La maqueta coloca los textos a mano sobre el lienzo, así que un texto inglés
// que parte en más renglones que el español pisa lo que tiene debajo. Esto no
// ve si queda bonito: solo dónde mirar. En Git Bash, MSYS_NO_PATHCONV=1.
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";

const [base, ruta, anchoTxt, tolTxt] = process.argv.slice(2);
const ancho = +anchoTxt;
const tol = +(tolTxt || 3);
const PUERTO = 9800 + (process.pid % 150);
const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${PUERTO}`,
  `--user-data-dir=${tmpdir()}/vernal-idi-${process.pid}`, "about:blank",
], { stdio: "ignore" });
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
let ws, id = 0;
const pendientes = new Map();
const cdp = (method, params = {}) => new Promise((ok, mal) => {
  const n = ++id;
  pendientes.set(n, { ok, mal });
  ws.send(JSON.stringify({ id: n, method, params }));
});

const MEDIR = `(() => {
  const lienzo = document.querySelector('[class^="modo-"]');
  const z = +lienzo.style.zoom || 1;
  const out = [];
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
  for (let el = w.nextNode(); el; el = w.nextNode()) {
    if (el.closest("nextjs-portal, script, style, svg")) continue;
    const propio = [...el.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim().length > 1);
    if (!propio) continue;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden" || !el.getClientRects().length) continue;
    const r = el.getBoundingClientRect();
    out.push({
      tag: el.tagName.toLowerCase(),
      t: el.textContent.replace(/\\s+/g, " ").trim().slice(0, 46),
      x: Math.round(r.left / z), y: Math.round((r.top + scrollY) / z),
      w: Math.round(r.width / z), h: Math.round(r.height / z),
      sw: el.scrollWidth > el.clientWidth + 2 && cs.overflow !== "visible",
      der: Math.round(r.right / z),
    });
  }
  return JSON.stringify({ z, ancho: Math.round(document.documentElement.scrollWidth), out });
})()`;

async function medir(url) {
  await cdp("Page.navigate", { url });
  await espera(6500);
  const { result } = await cdp("Runtime.evaluate", { expression: MEDIR, returnByValue: true });
  return JSON.parse(result.value);
}

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
  const es = await medir(base + ruta);
  const en = await medir(base + "/en" + (ruta === "/" ? "" : ruta));
  const lienzo = ancho >= 1280 ? 1920 : ancho <= 560 ? 402 : ancho;
  console.log(`${ruta} @${ancho}  textos es ${es.out.length} / en ${en.out.length}  ancho de página es ${es.ancho} / en ${en.ancho}`);
  if (es.out.length !== en.out.length) console.log("  OJO: distinto número de textos; la comparación uno a uno puede descuadrarse");
  const n = Math.min(es.out.length, en.out.length);
  let avisos = 0;
  for (let i = 0; i < n; i++) {
    const a = es.out[i], b = en.out[i];
    const masAlto = b.h - a.h > tol;
    const masBajo = a.h - b.h > tol;
    const fuera = b.der > lienzo + 2 && a.der <= lienzo + 2;
    if (masAlto || fuera || b.sw) {
      avisos++;
      console.log(`  ${masAlto ? "MÁS ALTO" : fuera ? "SE SALE " : "DESBORDA"} y${b.y} x${b.x} ${a.w}x${a.h} → ${b.w}x${b.h} <${b.tag}> «${b.t}»`);
    } else if (masBajo && process.env.VER_BAJOS) {
      console.log(`  más bajo  y${b.y} x${b.x} ${a.w}x${a.h} → ${b.w}x${b.h} <${b.tag}> «${b.t}»`);
    }
  }
  console.log(`  ${avisos} a revisar`);
} catch (e) {
  console.log("FALLO", e.message);
} finally {
  try { ws?.close(); } catch {}
  chrome.kill();
}
