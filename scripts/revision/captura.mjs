// Capturas por seccion con Chrome sin ventana.
//
//   node scripts/revision/captura.mjs <dirSalida> <url> <ancho>:<texto>:<nombre> [...]
//
// <texto> es cualquier texto de la seccion a capturar (sin distinguir mayusculas), o
// "@pantalla" para lo que se ve al cargar. Un cuarto campo opcional es JS que se
// ejecuta antes de capturar (sin ":" dentro). En Git Bash, las rutas que empiezan
// por "/" se convierten solas: lanzar con MSYS_NO_PATHCONV=1 si la URL lleva ruta.
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import { tmpdir } from "node:os";

const [out, url, ...trabajos] = process.argv.slice(2);
// Puerto de depuracion propio por proceso: varias sesiones pueden capturar a la vez.
const PUERTO = 9400 + (process.pid % 500);
const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${PUERTO}`,
  `--user-data-dir=${tmpdir()}/vernal-chrome-${process.pid}`, "about:blank",
], { stdio: "ignore" });

const espera = (ms) => new Promise((r) => setTimeout(r, ms));
let ws, id = 0;
const pendientes = new Map();
const cdp = (method, params = {}) => new Promise((ok, mal) => {
  const n = ++id;
  pendientes.set(n, { ok, mal });
  ws.send(JSON.stringify({ id: n, method, params }));
});
const js = async (expression) => (await cdp("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result.value;

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
  let anchoActual = 0;
  for (const t of trabajos) {
    const [ancho, texto, nombre, accion] = t.split(":");
    if (+ancho !== anchoActual) {
      anchoActual = +ancho;
      await cdp("Emulation.setDeviceMetricsOverride", { width: +ancho, height: 1500, deviceScaleFactor: 1, mobile: false });
      await cdp("Page.navigate", { url });
      await espera(5000);
      // Recorre la página para que carguen las imágenes diferidas.
      await js(`(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } scrollTo(0, 0); })()`);
      await espera(1200);
    }
    if (accion) { const r = await js(accion); if (typeof r === "string") console.log("  →", r); await espera(900); }
    const sel = `[...document.querySelectorAll("main section, main > div, header")].find(e => e.textContent.toLowerCase().includes(${JSON.stringify(texto.toLowerCase())}))`;
    if (texto !== "@pantalla") {
      const hay = await js(`(() => { const s = ${sel}; if (!s) return false; scrollTo(0, s.getBoundingClientRect().top + scrollY); return true; })()`);
      if (!hay) { console.log("NO ENCONTRADA", t); continue; }
      await espera(700);
    }
    const r = await js(`(() => {
      if (${JSON.stringify(texto)} === "@pantalla") return { x: 0, y: scrollY, w: innerWidth, h: innerHeight };
      const b = (${sel}).getBoundingClientRect();
      return { x: 0, y: scrollY + Math.max(0, b.top), w: innerWidth, h: Math.min(b.height, innerHeight - Math.max(0, b.top)) };
    })()`);
    const { data } = await cdp("Page.captureScreenshot", { format: "png", clip: { x: r.x, y: r.y, width: r.w, height: r.h, scale: 1 } });
    writeFileSync(`${out}/${nombre}.png`, Buffer.from(data, "base64"));
    console.log("ok", nombre, `${r.w}x${Math.round(r.h)}`);
  }
} catch (e) {
  console.log("FALLO", e.message);
} finally {
  try { ws?.close(); } catch {}
  chrome.kill();
}
