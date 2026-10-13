import { createHash } from "node:crypto";
import { cargaParaCrm, RegistroTemporal, validarConsulta } from "@/lib/consulta";
import { site } from "@/lib/site";

/**
 * POST /api/consulta — recibe el formulario "Agenda tu consulta" y lo entrega
 * al CRM del despacho (LeadConnector) por su webhook.
 *
 * Es un punto de entrada público (no hay sesión que comprobar), así que las
 * defensas son otras:
 *
 *   origen       solo se aceptan envíos hechos desde este mismo sitio (cabecera
 *                Origin, o Referer si falta): corta el CSRF y los POST sueltos
 *   validación   todo se valida y se limpia aquí, diga lo que diga el navegador
 *   señuelo      un campo oculto que una persona no ve; si llega relleno es un
 *                bot y se responde "recibido" sin mandar nada
 *   límite       5 envíos por IP cada 10 minutos
 *   idempotencia cada formulario manda un `envio_id`; repetido en 10 minutos
 *                (doble clic, reintento, recarga) no vuelve a ir al CRM
 *
 * El límite y la idempotencia viven en memoria: valen con una sola instancia,
 * que es como corre el sitio. Ver `RegistroTemporal`.
 *
 * La URL del webhook es un secreto (quien la tenga puede meter contactos en el
 * CRM): va en la variable de entorno LEAD_WEBHOOK_URL, nunca en el código.
 *
 * En los registros no se escribe ningún dato de la persona: solo qué pasó.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DIEZ_MINUTOS = 10 * 60 * 1000;
const MAX_POR_IP = 5;
const MAX_BYTES = 20_000;
const ESPERA_CRM_MS = 10_000;

const porIp = new RegistroTemporal(DIEZ_MINUTOS);
const enviados = new RegistroTemporal(DIEZ_MINUTOS);

type Respuesta = { ok: true } | { ok: false; error: string; campos?: string[] };

function mismoSitio(peticion: Request): boolean {
  const anfitrion = (peticion.headers.get("x-forwarded-host") ?? peticion.headers.get("host") ?? "").toLowerCase();
  const procedencia = peticion.headers.get("origin") ?? peticion.headers.get("referer");
  if (!anfitrion || !procedencia) return false;
  try {
    return new URL(procedencia).host.toLowerCase() === anfitrion;
  } catch {
    return false;
  }
}

function ipDe(peticion: Request): string {
  const reenviada = peticion.headers.get("x-forwarded-for");
  return (reenviada ? reenviada.split(",")[0] : (peticion.headers.get("x-real-ip") ?? "desconocida")).trim();
}

/** Lee el cuerpo como JSON (envío con JavaScript) o como formulario (sin él). */
async function leerCuerpo(peticion: Request): Promise<{ datos: Record<string, unknown>; json: boolean } | null> {
  const tipo = peticion.headers.get("content-type") ?? "";
  const texto = await peticion.text();
  if (texto.length > MAX_BYTES) return null;
  if (tipo.includes("application/json")) {
    try {
      const datos: unknown = JSON.parse(texto);
      if (typeof datos !== "object" || datos === null || Array.isArray(datos)) return null;
      return { datos: datos as Record<string, unknown>, json: true };
    } catch {
      return null;
    }
  }
  if (tipo.includes("application/x-www-form-urlencoded")) {
    return { datos: Object.fromEntries(new URLSearchParams(texto)), json: false };
  }
  return null;
}

export async function POST(peticion: Request): Promise<Response> {
  if (!mismoSitio(peticion)) return responder({ ok: false, error: "origen" }, 403, true, "es");

  const grande = Number(peticion.headers.get("content-length") ?? 0) > MAX_BYTES;
  const cuerpo = grande ? null : await leerCuerpo(peticion);
  if (!cuerpo) return responder({ ok: false, error: "formato" }, 400, true, "es");
  const { datos, json } = cuerpo;
  const idioma = datos.idioma === "en" ? "en" : "es";

  // Señuelo: una persona no rellena este campo. Se contesta como si hubiera ido bien.
  if (typeof datos.sitio_web === "string" && datos.sitio_web.trim() !== "") {
    return responder({ ok: true }, 200, json, idioma);
  }

  if (porIp.contar(ipDe(peticion)) > MAX_POR_IP) {
    return responder({ ok: false, error: "limite" }, 429, json, idioma);
  }

  // Sin JavaScript no llega la página: se saca de dónde vino la petición.
  if (typeof datos.pagina !== "string" || datos.pagina === "") {
    try {
      datos.pagina = new URL(peticion.headers.get("referer") ?? "").pathname;
    } catch {
      datos.pagina = "/";
    }
  }

  const validacion = validarConsulta(datos);
  if (!validacion.ok) {
    return responder({ ok: false, error: "datos", campos: validacion.errores }, 400, json, idioma);
  }
  const { consulta } = validacion;

  // Clave del envío: la del formulario si es un UUID; si no, una huella de su
  // contenido, para que reenviar lo mismo tampoco duplique.
  const propia = typeof datos.envio_id === "string" ? datos.envio_id : "";
  const clave = /^[0-9a-f-]{36}$/i.test(propia)
    ? propia.toLowerCase()
    : createHash("sha256").update(`${consulta.correo}|${consulta.telefono}|${consulta.comentarios}`).digest("hex");
  if (enviados.tiene(clave)) return responder({ ok: true }, 200, json, idioma);

  const destino = process.env.LEAD_WEBHOOK_URL;
  if (!destino) {
    console.error("[consulta] falta LEAD_WEBHOOK_URL: el envío no se pudo entregar");
    return responder({ ok: false, error: "servicio" }, 503, json, idioma);
  }

  // Se apunta ANTES de mandar: un segundo clic mientras el primero sigue en
  // curso no dispara otro envío. Si el CRM falla, se borra para poder reintentar.
  enviados.contar(clave);
  try {
    const respuesta = await fetch(destino, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cargaParaCrm(consulta, site.url, new Date())),
      signal: AbortSignal.timeout(ESPERA_CRM_MS),
    });
    if (!respuesta.ok) {
      enviados.quitar(clave);
      console.error(`[consulta] el CRM respondió ${respuesta.status}`);
      return responder({ ok: false, error: "servicio" }, 502, json, idioma);
    }
  } catch (e) {
    enviados.quitar(clave);
    console.error(`[consulta] no se pudo contactar con el CRM: ${e instanceof Error ? e.name : "error"}`);
    return responder({ ok: false, error: "servicio" }, 502, json, idioma);
  }

  return responder({ ok: true }, 200, json, idioma);
}

/**
 * Con JavaScript el formulario espera JSON. Sin él, el navegador navega: si fue
 * bien se le lleva a la página de gracias, y si no, a un texto corto que diga
 * qué pasó.
 */
function responder(cuerpo: Respuesta, estado: number, json: boolean, idioma: "es" | "en"): Response {
  if (json) return Response.json(cuerpo, { status: estado, headers: { "Cache-Control": "no-store" } });
  if (cuerpo.ok) {
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    return new Response(null, {
      status: 303,
      headers: { Location: `${base}${idioma === "en" ? "/en" : ""}/gracias`, "Cache-Control": "no-store" },
    });
  }
  const mensaje =
    idioma === "en"
      ? `We could not send your message. Please go back and try again, or call us at ${site.phone}.`
      : `No pudimos enviar tu mensaje. Vuelve atrás e inténtalo de nuevo, o llámanos al ${site.phone}.`;
  return new Response(mensaje, {
    status: estado,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
