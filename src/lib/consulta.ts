/**
 * Lógica del formulario "Agenda tu consulta": validar lo que llega del
 * navegador y armar el JSON que espera el CRM del despacho (LeadConnector).
 *
 * Va aparte del manejador de la ruta (`app/api/consulta/route.ts`) y sin
 * dependencias, para poder probarla sola: `npm test`.
 *
 * El CRM recibe ocho campos, acordados con quien lo lleva el 2026-10-13:
 *
 *   full_name, phone, email, office, comments   → lo que escribe la persona
 *   source, platform, campaign                  → de dónde viene el contacto
 *
 * Lo que el sitio sabe y no tiene campo propio (idioma en el que se navegaba y
 * el momento en que se aceptó el aviso de SMS/WhatsApp) va al final de
 * `comments`, por indicación de Roberto. Ese momento es el registro del
 * consentimiento (TCPA): no se quita.
 */

/** Las opciones del desplegable, tal como las quiere ver el CRM. */
export const OFICINAS = ["Dallas", "Fort Worth", "Houston", "Austin", "San Antonio", "Oficina virtual"] as const;

/** Lo que manda el desplegable en inglés para la opción que no es una ciudad. */
const OFICINA_ALIAS: Record<string, string> = { "Virtual office": "Oficina virtual" };

export const LIMITES = { nombre: 120, correo: 254, comentarios: 2000, pagina: 200 } as const;

export type CampoConsulta = "nombre" | "telefono" | "correo" | "oficina" | "comentarios";

export type Consulta = {
  nombre: string;
  telefono: string;
  correo: string;
  oficina: string;
  comentarios: string;
  idioma: "es" | "en";
  /** Ruta de la página desde la que se envió, sin dominio ("/contacto"). */
  pagina: string;
};

export type ResultadoValidacion =
  | { ok: true; consulta: Consulta }
  | { ok: false; errores: CampoConsulta[] };

/** Texto de una línea: sin caracteres de control y con los espacios recogidos. */
function linea(valor: unknown): string {
  if (typeof valor !== "string") return "";
  return valor.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim();
}

/** Texto de varias líneas: conserva los saltos, quita el resto de controles. */
function parrafo(valor: unknown): string {
  if (typeof valor !== "string") return "";
  return valor
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const CORREO = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/;

/**
 * El teléfono se guarda como lo escribió la persona, pero solo con los
 * caracteres propios de un teléfono, y tiene que traer entre 7 y 15 dígitos
 * (el máximo de la norma E.164).
 */
function telefono(valor: unknown): string | null {
  const texto = linea(valor);
  if (!/^[0-9+()\-. ]+$/.test(texto)) return null;
  const digitos = texto.replace(/\D/g, "");
  return digitos.length >= 7 && digitos.length <= 15 ? texto : null;
}

/** La ruta de la página: empieza por "/" y no trae nada raro. */
export function rutaLimpia(valor: unknown): string {
  const texto = linea(valor);
  if (!texto.startsWith("/") || texto.startsWith("//")) return "/";
  const ruta = texto.split(/[?#]/)[0];
  return /^\/[A-Za-z0-9\-._~/]*$/.test(ruta) ? ruta.slice(0, LIMITES.pagina) : "/";
}

export function validarConsulta(datos: Record<string, unknown>): ResultadoValidacion {
  const errores: CampoConsulta[] = [];

  const nombre = linea(datos.nombre);
  if (nombre.length < 2 || nombre.length > LIMITES.nombre) errores.push("nombre");

  const tel = telefono(datos.telefono);
  if (tel === null) errores.push("telefono");

  const correo = linea(datos.correo).toLowerCase();
  if (correo.length > LIMITES.correo || !CORREO.test(correo)) errores.push("correo");

  // La oficina es opcional; si viene, tiene que ser una de las del desplegable.
  const bruta = linea(datos.oficina);
  const oficina = OFICINA_ALIAS[bruta] ?? bruta;
  if (oficina !== "" && !(OFICINAS as readonly string[]).includes(oficina)) errores.push("oficina");

  const comentarios = parrafo(datos.comentarios);
  if (comentarios.length > LIMITES.comentarios) errores.push("comentarios");

  if (errores.length > 0 || tel === null) return { ok: false, errores };

  return {
    ok: true,
    consulta: {
      nombre,
      telefono: tel,
      correo,
      oficina,
      comentarios,
      idioma: datos.idioma === "en" ? "en" : "es",
      pagina: rutaLimpia(datos.pagina),
    },
  };
}

export type CargaCrm = {
  full_name: string;
  phone: string;
  email: string;
  office: string;
  comments: string;
  source: string;
  platform: string;
  campaign: string;
};

/**
 * El JSON para el CRM. `sitio` es el dominio público ("https://abogadovernal.com")
 * y `ahora` el momento del envío, que queda en los comentarios como registro
 * del consentimiento.
 */
export function cargaParaCrm(consulta: Consulta, sitio: string, ahora: Date): CargaCrm {
  const nota =
    `[Sitio web] Idioma: ${consulta.idioma === "en" ? "inglés" : "español"}. ` +
    `Aceptó el aviso de mensajes SMS/WhatsApp al enviar el formulario: ${ahora.toISOString()}.`;
  return {
    full_name: consulta.nombre,
    phone: consulta.telefono,
    email: consulta.correo,
    office: consulta.oficina,
    comments: consulta.comentarios ? `${consulta.comentarios}\n\n${nota}` : nota,
    source: "Sitio Web Abogado Vernal",
    platform: "Sitio Web",
    campaign: sitio.replace(/\/+$/, "") + consulta.pagina,
  };
}

/**
 * Lo que se puede escribir de un envío en los registros del servidor: lo justo
 * para saber que llegó y reconocerlo en el CRM, sin dejar el dato entero. Los
 * registros los puede leer quien tenga acceso al panel del alojamiento, que no
 * es el mismo público que el CRM; por eso el nombre va en iniciales, el correo
 * con el usuario recortado y el teléfono con solo sus cuatro últimos dígitos.
 * Los comentarios no se escriben: solo cuánto ocupan.
 */
export function resumenParaRegistro(consulta: Consulta) {
  const [usuario, dominio = ""] = consulta.correo.split("@");
  const digitos = consulta.telefono.replace(/\D/g, "");
  return {
    nombre: consulta.nombre
      .split(" ")
      .filter(Boolean)
      .map((parte) => `${Array.from(parte)[0].toUpperCase()}.`)
      .join(" "),
    correo: `${usuario.slice(0, 2)}***@${dominio}`,
    telefono: `***${digitos.slice(-4)}`,
    oficina: consulta.oficina || "(sin elegir)",
    idioma: consulta.idioma,
    pagina: consulta.pagina,
    comentarios: `${consulta.comentarios.length} caracteres`,
  };
}

/**
 * Registro en memoria con caducidad: sirve para no mandar dos veces el mismo
 * envío (idempotencia) y para limitar cuántos llegan desde una misma IP.
 *
 * Vive en el proceso: vale mientras el sitio corra en UNA instancia (Render,
 * hoy). Con varias, o si hay que sobrevivir a reinicios, esto pasa a una base
 * de datos con una restricción UNIQUE sobre la clave del envío.
 */
export class RegistroTemporal {
  private readonly entradas = new Map<string, { hasta: number; veces: number }>();
  private readonly duracionMs: number;
  private readonly maximo: number;

  constructor(duracionMs: number, maximo = 5000) {
    this.duracionMs = duracionMs;
    this.maximo = maximo;
  }

  private limpiar(ahora: number) {
    if (this.entradas.size < this.maximo) return;
    for (const [clave, e] of this.entradas) if (e.hasta <= ahora) this.entradas.delete(clave);
    // Si aun así no cabe, fuera las más antiguas (el Map conserva el orden).
    while (this.entradas.size >= this.maximo) {
      const primera = this.entradas.keys().next().value;
      if (primera === undefined) break;
      this.entradas.delete(primera);
    }
  }

  /** Suma una aparición de `clave` y devuelve cuántas lleva en la ventana. */
  contar(clave: string, ahora = Date.now()): number {
    const e = this.entradas.get(clave);
    if (e && e.hasta > ahora) {
      e.veces += 1;
      return e.veces;
    }
    this.limpiar(ahora);
    this.entradas.set(clave, { hasta: ahora + this.duracionMs, veces: 1 });
    return 1;
  }

  tiene(clave: string, ahora = Date.now()): boolean {
    const e = this.entradas.get(clave);
    return e !== undefined && e.hasta > ahora;
  }

  quitar(clave: string) {
    this.entradas.delete(clave);
  }
}
