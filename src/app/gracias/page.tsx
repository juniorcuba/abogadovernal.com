import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { GraciasHero } from "@/components/sections/gracias-hero";

/**
 * Gracias — frame `795:454` de Figma, 1920 × 1406 (2026-09-26).
 *
 * |   y | alto | bloque                                   | estado |
 * |-----|------|------------------------------------------|--------|
 * |   0 |  128 | cabecera                                 | la de siempre |
 * |   0 |  938 | confirmación, texto y tarjeta de redes   | propio |
 * | 938 |  468 | footer                                   | el de siempre |
 *
 * Es la página a la que llevará el formulario cuando tenga backend. Hasta
 * entonces no la enlaza nadie: se llega escribiendo la dirección.
 *
 * Solo hay artboard de escritorio.
 */

export const metadata: Metadata = {
  title: "Gracias por contactarnos",
  description:
    "Hemos recibido tu información. Un miembro del equipo del Abogado Vernal se pondrá en contacto contigo.",
  // No tiene sentido en buscadores: es la pantalla de después de enviar.
  robots: { index: false, follow: true },
};

export default function GraciasPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative">
        <GraciasHero />
      </main>
      <SiteFooter />
    </>
  );
}
