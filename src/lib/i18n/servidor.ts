import type { Metadata } from "next";
import { cache } from "react";
import { enServidor } from "@/lib/i18n/en-servidor";
import { esIdioma, rutaEnIdioma, traducir, type Idioma } from "@/lib/i18n/idiomas";

/**
 * El idioma de la petición, para componentes de servidor.
 *
 * `cache` de React da un objeto por petición (por página, al generar el sitio).
 * El layout y cada página llaman a `fijarIdioma` con su parámetro `lang` antes
 * de devolver su JSX, así que cualquier componente de servidor que cuelgue de
 * ellos puede llamar a `t()` sin recibir el idioma por props.
 *
 * Los componentes de cliente no pueden usar esto: van con `useT()`, de
 * `@/lib/i18n/cliente`.
 */
const almacen = cache((): { idioma: Idioma } => ({ idioma: "es" }));

export function fijarIdioma(valor: string): Idioma {
  const idioma: Idioma = esIdioma(valor) ? valor : "es";
  almacen().idioma = idioma;
  return idioma;
}

export function idiomaActual(): Idioma {
  return almacen().idioma;
}

export function t(texto: string): string {
  return traducir(almacen().idioma, texto, enServidor);
}

/** Como `t`, con el idioma dado: para metadatos, que corren fuera del render. */
export function traducirServidor(idioma: Idioma, texto: string): string {
  return traducir(idioma, texto, enServidor);
}

/**
 * Metadatos de una página en su idioma: traduce título y descripción (que se
 * escriben en español, como todo) y declara la pareja es/en de la ruta para
 * los buscadores. `ruta` es la española, sin prefijo.
 */
export function metadatos(lang: string, ruta: string, base: Metadata): Metadata {
  const idioma = fijarIdioma(lang);
  const tr = <T,>(valor: T): T => (typeof valor === "string" ? (traducirServidor(idioma, valor) as T) : valor);
  return {
    ...base,
    title: tr(base.title),
    description: tr(base.description),
    alternates: {
      canonical: rutaEnIdioma(idioma, ruta),
      languages: { es: ruta, en: rutaEnIdioma("en", ruta), "x-default": ruta },
    },
  };
}
