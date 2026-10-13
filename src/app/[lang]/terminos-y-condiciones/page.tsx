import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BlogResenas } from "@/components/sections/blog-resenas";
import { TerminosContenido } from "@/components/sections/terminos-contenido";
import { fijarIdioma, metadatos } from "@/lib/i18n/servidor";

/**
 * Términos y condiciones — frame `809:1815` de Figma, 1920 × 2835 (2026-09-26).
 *
 * |    y | alto | bloque                                | estado |
 * |------|------|---------------------------------------|--------|
 * |    0 |  128 | cabecera                              | la de siempre |
 * |    0 | 1490 | titular, descargo y los 9 apartados   | propio |
 * | 1490 |  523 | reseñas (el boletín se quitó)           | el de la home |
 * | 2367 |  468 | footer                                | el de siempre |
 *
 * Solo hay artboard de escritorio. El pie del sitio ya enlazaba aquí.
 */

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return metadatos((await params).lang, "/terminos-y-condiciones", {
    // En inglés en los dos idiomas, como el texto legal.
    title: "Terms and Conditions",
    description:
      "Terms and conditions of use of the website of The Law Office of Vernal Farnum Mejia.",
  });
}

export default async function TerminosPage({ params }: { params: Promise<{ lang: string }> }) {
  fijarIdioma((await params).lang);
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
