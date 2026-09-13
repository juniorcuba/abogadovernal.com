/**
 * Consentimiento de cookies, guardado en el navegador del visitante.
 *
 * El sitio hoy no carga analítica ni píxeles de publicidad. Cuando se añadan,
 * TIENEN que pasar por `hayConsentimiento()` (o escuchar EVENTO_CONSENTIMIENTO)
 * y no cargar nada hasta que devuelva true. Rechazar o cerrar el aviso cuenta
 * como NO: sin una aceptación explícita solo funciona lo imprescindible.
 *
 * Se guarda la decisión con su fecha y la versión del texto del aviso. Si el
 * texto cambia de forma relevante, sube VERSION y el aviso vuelve a salir a
 * todos, porque lo aceptado antes ya no es lo mismo.
 */

const CLAVE = "vernal-consentimiento-cookies";
const VERSION = 1;

export const EVENTO_CONSENTIMIENTO = "vernal:consentimiento-cookies";

export type Decision = "aceptadas" | "rechazadas";

export type Consentimiento = {
  decision: Decision;
  /** ISO 8601, momento en que se tomó la decisión. */
  fecha: string;
  version: number;
  /** Qué hizo el visitante: pulsar un botón o cerrar el aviso con la X. */
  origen: "aceptar" | "rechazar" | "cerrar";
};

/** Lee la decisión guardada; null si no hay, si es de otra versión o si falla. */
export function leerConsentimiento(): Consentimiento | null {
  try {
    const crudo = window.localStorage.getItem(CLAVE);
    if (!crudo) return null;
    const c = JSON.parse(crudo) as Partial<Consentimiento>;
    if (
      c.version !== VERSION ||
      (c.decision !== "aceptadas" && c.decision !== "rechazadas") ||
      typeof c.fecha !== "string"
    ) {
      return null;
    }
    return c as Consentimiento;
  } catch {
    // Navegación privada o almacenamiento bloqueado: se trata como sin decidir.
    return null;
  }
}

export function guardarConsentimiento(origen: Consentimiento["origen"]): Consentimiento {
  const c: Consentimiento = {
    decision: origen === "aceptar" ? "aceptadas" : "rechazadas",
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

/** true solo si el visitante aceptó expresamente. */
export function hayConsentimiento(): boolean {
  return leerConsentimiento()?.decision === "aceptadas";
}
