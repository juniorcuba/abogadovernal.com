"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useIdioma } from "@/lib/i18n/cliente";
import { rutaEnIdioma, rutaSinIdioma } from "@/lib/i18n/idiomas";

/**
 * "ES EN": lleva a la misma página en el otro idioma. El archivo solo lo dibuja
 * en el móvil (x327 y24 de la cabecera), con el idioma activo en blanco y el
 * otro en #323B4C; en escritorio se añadió junto a las redes (2026-10-12),
 * porque si no ahí no habría forma de cambiar. El inactivo va algo más claro
 * que en el archivo: ahora es un enlace y tiene que leerse como tal.
 */
export function SelectorIdioma({ className = "" }: { className?: string }) {
  const idioma = useIdioma();
  const ruta = rutaSinIdioma(usePathname());
  const opciones = [
    { codigo: "es", rotulo: "ES", href: ruta, nombre: "Español" },
    { codigo: "en", rotulo: "EN", href: rutaEnIdioma("en", ruta), nombre: "English" },
  ] as const;
  return (
    <p className={className}>
      {opciones.map((o) => (
        <NextLink
          key={o.codigo}
          href={o.href}
          hrefLang={o.codigo}
          lang={o.codigo}
          aria-label={o.nombre}
          aria-current={o.codigo === idioma ? "true" : undefined}
          className={
            o.codigo === idioma
              ? "text-white"
              : "text-[#5C6B85] transition-colors hover:text-vernal-accent"
          }
        >
          {o.rotulo}
        </NextLink>
      ))}
    </p>
  );
}
