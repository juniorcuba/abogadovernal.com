/**
 * Consentimiento de cookies, guardado en el navegador del visitante.
 *
 * El sitio hoy no carga analítica ni píxeles de publicidad. Cuando se añadan,
 * TIENEN que pasar por `hayConsentimiento("analitica")` o
 * `hayConsentimiento("marketing")` (o escuchar EVENTO_CONSENTIMIENTO) y no
 * cargar nada hasta que devuelva true. Rechazar o cerrar el aviso cuenta como
 * NO: sin una aceptación explícita solo funciona lo imprescindible.
 *
 * Se guarda qué categorías se aceptaron, con la fecha y la versión del texto
 * del aviso. Si el texto o las categorías cambian de forma relevante, sube
 * VERSION: el aviso vuelve a salir a todos, porque lo aceptado antes ya no es
 * lo mismo. La v2 es la que trae categorías; las decisiones de la v1 (un sí o
 * un no para todo) ya no valen y se vuelven a preguntar.
 */

const CLAVE = "vernal-consentimiento-cookies";
const VERSION = 2;

export const EVENTO_CONSENTIMIENTO = "vernal:consentimiento-cookies";
/** Lo lanza cualquier enlace de "Preferencias de cookies" para abrir el panel. */
export const EVENTO_ABRIR_PANEL = "vernal:abrir-panel-cookies";

export type Categoria = "necesarias" | "analitica" | "marketing";

/** Las necesarias no se listan: van siempre y no se pueden desactivar. */
export type Categorias = { analitica: boolean; marketing: boolean };

export type Consentimiento = {
  categorias: Categorias;
  /** ISO 8601, momento en que se tomó la decisión. */
  fecha: string;
  version: number;
  /** Qué hizo el visitante. "cerrar" es la X del aviso y equivale a rechazar. */
  origen: "aceptar" | "rechazar" | "cerrar" | "guardar";
};

export const TODAS: Categorias = { analitica: true, marketing: true };
export const NINGUNA: Categorias = { analitica: false, marketing: false };

/** Lo que se le enseña al visitante en el panel, en este orden. */
export const CATEGORIAS: {
  id: Categoria;
  titulo: string;
  texto: string;
  fija: boolean;
}[] = [
  {
    id: "necesarias",
    titulo: "Necesarias",
    texto:
      "Hacen que el sitio funcione: recordar esta misma decisión y poco más. Sin ellas no se puede navegar, así que no se pueden desactivar.",
    fija: true,
  },
  {
    id: "analitica",
    titulo: "Analítica",
    texto:
      "Nos dicen qué páginas se visitan y desde dónde, en conjunto y sin identificarte. Sirven para saber qué información hace falta mejorar.",
    fija: false,
  },
  {
    id: "marketing",
    titulo: "Marketing",
    texto:
      "Permiten medir los anuncios y mostrarte contenido relacionado con lo que ya has visto, aquí y en otras webs.",
    fija: false,
  },
];

function esBooleano(v: unknown): v is boolean {
  return typeof v === "boolean";
}

/** Lee la decisión guardada; null si no hay, si es de otra versión o si falla. */
export function leerConsentimiento(): Consentimiento | null {
  try {
    const crudo = window.localStorage.getItem(CLAVE);
    if (!crudo) return null;
    const c = JSON.parse(crudo) as Partial<Consentimiento>;
    if (
      c.version !== VERSION ||
      typeof c.fecha !== "string" ||
      !c.categorias ||
      !esBooleano(c.categorias.analitica) ||
      !esBooleano(c.categorias.marketing)
    ) {
      return null;
    }
    return c as Consentimiento;
  } catch {
    // Navegación privada o almacenamiento bloqueado: se trata como sin decidir.
    return null;
  }
}

export function guardarConsentimiento(
  origen: Consentimiento["origen"],
  categorias: Categorias = origen === "aceptar" ? TODAS : NINGUNA,
): Consentimiento {
  const c: Consentimiento = {
    categorias,
    fecha: new Date().toISOString(),
    version: VERSION,
    origen,
  };
  try {
    window.localStorage.setItem(CLAVE, JSON.stringify(c));
  } catch {
    // Si no se puede guardar, el aviso volverá a salir en la próxima visita:
    // es lo correcto, porque no hay constancia de la decisión.
  }
  window.dispatchEvent(new CustomEvent(EVENTO_CONSENTIMIENTO, { detail: c }));
  return c;
}

/** true solo si el visitante aceptó expresamente esa categoría. */
export function hayConsentimiento(categoria: Categoria): boolean {
  if (categoria === "necesarias") return true;
  return leerConsentimiento()?.categorias[categoria] === true;
}

/** Abre el panel de preferencias desde cualquier parte del sitio. */
export function abrirPanelCookies() {
  window.dispatchEvent(new Event(EVENTO_ABRIR_PANEL));
}
