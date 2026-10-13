import { en } from "@/lib/i18n/en";

/**
 * Idiomas del sitio (2026-10-12). El español es el original y vive en la raíz
 * (/nosotros); el inglés cuelga de /en (/en/nosotros). Por dentro las dos son
 * la misma ruta, `app/[lang]/...`: next.config.ts reescribe la raíz a /es.
 *
 * No hay claves: el texto en español ES la clave. `traducir` busca esa cadena
 * en el diccionario inglés y, si no está, devuelve el español. Hay dos
 * diccionarios: `en.ts`, que viaja al navegador porque lo usan los componentes
 * de cliente, y `en-servidor.ts`, con los textos que solo pinta el servidor
 * (artículos, sedes, párrafos largos), que entra por `extra` y no pesa. Así
 * el código se sigue leyendo en el idioma del diseño y una cadena sin traducir
 * nunca rompe nada: solo sale en español.
 */
export const idiomas = ["es", "en"] as const;
export type Idioma = (typeof idiomas)[number];

export function esIdioma(valor: string): valor is Idioma {
  return (idiomas as readonly string[]).includes(valor);
}

/**
 * Los espacios de los extremos no forman parte de la clave: en JSX un mismo
 * texto lleva o no espacio según lo que tenga al lado (" aprobada", "Residencia ").
 */
export function traducir(idioma: Idioma, texto: string, extra?: Record<string, string>): string {
  if (idioma === "es") return texto;
  const clave = texto.trim();
  const traducido = en[clave] ?? extra?.[clave];
  if (traducido === undefined) return texto;
  const inicio = texto.slice(0, texto.length - texto.trimStart().length);
  const fin = texto.slice(texto.trimEnd().length);
  return inicio + traducido + fin;
}

/** Antepone /en a una ruta interna cuando toca. Las externas no se tocan. */
export function rutaEnIdioma(idioma: Idioma, href: string): string {
  if (idioma === "es" || !href.startsWith("/") || href.startsWith("//")) return href;
  if (href === "/en" || href.startsWith("/en/")) return href;
  return href === "/" ? "/en" : `/en${href}`;
}

/** La ruta sin su prefijo de idioma: "/en/nosotros" → "/nosotros". */
export function rutaSinIdioma(ruta: string): string {
  for (const i of idiomas) {
    if (ruta === `/${i}`) return "/";
    if (ruta.startsWith(`/${i}/`)) return ruta.slice(i.length + 1);
  }
  return ruta;
}
