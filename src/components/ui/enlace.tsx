"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useIdioma } from "@/lib/i18n/cliente";
import { rutaEnIdioma } from "@/lib/i18n/idiomas";

/**
 * El `Link` del sitio: el de Next, pero con la ruta en el idioma en el que se
 * está navegando ("/contacto" es "/en/contacto" en inglés). Todos los enlaces
 * internos pasan por aquí; los externos, `tel:` y `mailto:` salen tal cual.
 */
export default function Link({ href, ...resto }: ComponentProps<typeof NextLink>) {
  const idioma = useIdioma();
  return <NextLink href={typeof href === "string" ? rutaEnIdioma(idioma, href) : href} {...resto} />;
}
