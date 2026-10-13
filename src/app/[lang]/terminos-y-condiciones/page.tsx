import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BlogResenas } from "@/components/sections/blog-resenas";
import { TerminosContenido } from "@/components/sections/terminos-contenido";

/**
 * Términos y condiciones — frame `809:1815` de Figma, 1920 × 2835 (2026-09-26).
 *
 * |    y | alto | bloque                                | estado |
 * |------|------|---------------------------------------|--------|
 * |    0 |  128 | cabecera                              | la de siempre |
 * |    0 | 1490 | titular, descargo y los 9 apartados   | propio |
 * | 1490 |  877 | "Mantente informado" + reseñas        | el de la home |
 * | 2367 |  468 | footer                                | el de siempre |
 *
 * Solo hay artboard de escritorio. El pie del sitio ya enlazaba aquí.
 */

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Términos y condiciones de uso del sitio de The Law Office of Vernal Farnum Mejia.",
};

export default function TerminosPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative">
        <TerminosContenido />
        <BlogResenas />
      </main>
      <SiteFooter />
    </>
  );
}
